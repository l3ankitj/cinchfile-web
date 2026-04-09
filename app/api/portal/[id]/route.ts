import { createServiceClient } from "@/lib/supabase/service";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("upload_requests")
    .select("id, client_name, firm_name, status, expires_at")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const exp = new Date(data.expires_at);
  if (data.status !== "pending" || exp.getTime() < Date.now()) {
    return NextResponse.json({ error: "unavailable" }, { status: 410 });
  }

  return NextResponse.json({
    id: data.id,
    client_name: data.client_name,
    firm_name: data.firm_name,
  });
}
