import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { DRAFT_ORDER_TTL_HOURS, STORAGE_BUCKET } from "@/lib/constants";

/** Deletes draft orders (never checked out) older than the TTL, along with
 * their uploaded files — Postgres cascade removes DB rows but not Storage
 * objects, so those are deleted explicitly first. */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const svc = createServiceClient();
  const cutoff = new Date(
    Date.now() - DRAFT_ORDER_TTL_HOURS * 60 * 60 * 1000
  ).toISOString();

  const { data: staleOrders } = await svc
    .from("orders")
    .select("id")
    .eq("status", "draft")
    .lt("created_at", cutoff);

  if (!staleOrders || staleOrders.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  const orderIds = staleOrders.map((o) => o.id);

  const { data: files } = await svc
    .from("order_files")
    .select("storage_path")
    .in("order_id", orderIds);

  if (files && files.length > 0) {
    await svc.storage.from(STORAGE_BUCKET).remove(files.map((f) => f.storage_path));
  }

  await svc.from("orders").delete().in("id", orderIds);

  return NextResponse.json({ deleted: orderIds.length });
}
