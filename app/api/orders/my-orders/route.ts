import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  if (!checkRateLimit(`my-orders:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  let body: { phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const phone = body.phone?.replace(/\D/g, "");
  if (!phone || phone.length !== 10) {
    return NextResponse.json({ error: "Enter a valid 10-digit mobile number" }, { status: 400 });
  }

  const svc = createServiceClient();
  const { data: orders } = await svc
    .from("orders")
    .select("order_number, status, payment_status, total_paise, created_at")
    .eq("customer_phone", phone)
    .neq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({
    orders: (orders ?? []).map((o) => ({
      orderNumber: o.order_number,
      status: o.status,
      paymentStatus: o.payment_status,
      totalPaise: o.total_paise,
      createdAt: o.created_at,
    })),
  });
}
