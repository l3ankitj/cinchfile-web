import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { createServiceClient } from "@/lib/supabase/service";
import { sanitizeFilename } from "@/lib/sanitize";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import {
  ACCEPTED_UPLOAD_EXTENSIONS,
  MAX_FILE_BYTES,
  MAX_FILES_PER_ORDER,
  MAX_TOTAL_BYTES,
  STORAGE_BUCKET,
} from "@/lib/constants";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: orderId } = await context.params;

  const ip = getClientIp(request.headers);
  if (!checkRateLimit(`files-sign:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { fileName?: string; byteSize?: number; mimeType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { fileName, byteSize, mimeType } = body;
  if (!fileName || typeof byteSize !== "number" || byteSize <= 0) {
    return NextResponse.json({ error: "Missing fileName or byteSize" }, { status: 400 });
  }

  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (!ACCEPTED_UPLOAD_EXTENSIONS.includes(extension as never)) {
    return NextResponse.json(
      { error: `.${extension} files are not supported` },
      { status: 400 }
    );
  }

  if (byteSize > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: `File exceeds the ${MAX_FILE_BYTES / (1024 * 1024)}MB per-file limit` },
      { status: 400 }
    );
  }

  const svc = createServiceClient();

  const { data: order } = await svc
    .from("orders")
    .select("id, status")
    .eq("id", orderId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (order.status !== "draft") {
    return NextResponse.json({ error: "This order can no longer be edited" }, { status: 410 });
  }

  const { data: existingFiles } = await svc
    .from("order_files")
    .select("byte_size")
    .eq("order_id", orderId)
    .in("status", ["pending", "uploaded"]);

  const existingCount = existingFiles?.length ?? 0;
  const existingTotalBytes = (existingFiles ?? []).reduce((sum, f) => sum + f.byte_size, 0);

  if (existingCount + 1 > MAX_FILES_PER_ORDER) {
    return NextResponse.json(
      { error: `Orders are limited to ${MAX_FILES_PER_ORDER} files` },
      { status: 400 }
    );
  }
  if (existingTotalBytes + byteSize > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: `Orders are limited to ${MAX_TOTAL_BYTES / (1024 * 1024 * 1024)}GB total` },
      { status: 400 }
    );
  }

  const safeName = sanitizeFilename(fileName);
  const storagePath = `${orderId}/${randomUUID()}_${safeName}`;

  const { data: signed, error: signError } = await svc.storage
    .from(STORAGE_BUCKET)
    .createSignedUploadUrl(storagePath);

  if (signError || !signed) {
    return NextResponse.json({ error: "Could not create upload URL" }, { status: 500 });
  }

  const { data: fileRow, error: insertError } = await svc
    .from("order_files")
    .insert({
      order_id: orderId,
      storage_path: storagePath,
      original_name: fileName,
      byte_size: byteSize,
      mime_type: mimeType ?? null,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertError || !fileRow) {
    return NextResponse.json({ error: "Could not register file" }, { status: 500 });
  }

  return NextResponse.json({
    fileId: fileRow.id,
    path: signed.path,
    token: signed.token,
  });
}
