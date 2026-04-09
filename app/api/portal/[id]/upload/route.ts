import { createServiceClient } from "@/lib/supabase/service";
import { logAudit } from "@/lib/audit";
import { sendUploadNotificationEmail } from "@/lib/email";
import { MAX_FILE_BYTES, MAX_TOTAL_BYTES, STORAGE_BUCKET } from "@/lib/constants";
import { sanitizeFilename } from "@/lib/sanitize";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: requestId } = await context.params;
  const supabase = createServiceClient();

  const { data: row, error: fetchErr } = await supabase
    .from("upload_requests")
    .select("id, client_name, firm_name, status, expires_at")
    .eq("id", requestId)
    .maybeSingle();

  if (fetchErr || !row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const exp = new Date(row.expires_at);
  if (row.status !== "pending" || exp.getTime() < Date.now()) {
    return NextResponse.json({ error: "unavailable" }, { status: 410 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const files = formData.getAll("files").filter((v): v is File => v instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "no_files" }, { status: 400 });
  }

  const allowedTypes = new Set([
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);

  function fileAllowed(f: File): boolean {
    const t = (f.type || "").toLowerCase();
    if (allowedTypes.has(t)) return true;
    if (t === "") {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return ["pdf", "jpg", "jpeg", "png", "webp"].includes(ext ?? "");
    }
    return false;
  }

  let total = 0;
  for (const f of files) {
    if (f.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "file_too_large", maxBytes: MAX_FILE_BYTES },
        { status: 400 }
      );
    }
    if (!fileAllowed(f)) {
      return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
    }
    total += f.size;
  }
  if (total > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "batch_too_large", maxBytes: MAX_TOTAL_BYTES },
      { status: 400 }
    );
  }

  const uploadedPaths: { path: string; name: string; size: number }[] = [];

  for (const file of files) {
    const safe = sanitizeFilename(file.name);
    const objectPath = `${requestId}/${randomUUID()}_${safe}`;
    const buf = Buffer.from(await file.arrayBuffer());

    const { error: upErr } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(objectPath, buf, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (upErr) {
      return NextResponse.json({ error: "upload_failed", detail: upErr.message }, { status: 500 });
    }

    uploadedPaths.push({ path: objectPath, name: file.name, size: file.size });
  }

  for (const u of uploadedPaths) {
    const { error: insErr } = await supabase.from("upload_request_files").insert({
      request_id: requestId,
      storage_path: u.path,
      original_name: u.name,
      byte_size: u.size,
    });
    if (insErr) {
      return NextResponse.json({ error: "db_failed", detail: insErr.message }, { status: 500 });
    }
  }

  const { error: updErr } = await supabase
    .from("upload_requests")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
      file_path: uploadedPaths[0]?.path ?? null,
    })
    .eq("id", requestId);

  if (updErr) {
    return NextResponse.json({ error: "complete_failed" }, { status: 500 });
  }

  await logAudit(null, "portal_upload_completed", {
    request_id: requestId,
    file_count: uploadedPaths.length,
  });

  await sendUploadNotificationEmail({
    firmName: row.firm_name,
    clientName: row.client_name,
    fileCount: uploadedPaths.length,
    requestId,
  });

  return NextResponse.json({ ok: true, fileCount: uploadedPaths.length });
}
