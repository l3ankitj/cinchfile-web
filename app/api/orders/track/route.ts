import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { getShippingZone } from "@/lib/data/shipping-zones";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  if (!checkRateLimit(`track:${ip}`, 15, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  let body: { orderNumber?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const orderNumber = body.orderNumber?.trim().toUpperCase();
  const phone = body.phone?.replace(/\D/g, "");

  if (!orderNumber || !phone || phone.length !== 10) {
    return NextResponse.json(
      { error: "Enter a valid order number and 10-digit mobile number" },
      { status: 400 }
    );
  }

  const svc = createServiceClient();
  const { data: order } = await svc
    .from("orders")
    .select(
      "id, order_number, status, payment_status, total_paise, shipping_pincode, tracking_number, courier_name, created_at, customer_phone"
    )
    .eq("order_number", orderNumber)
    .single();

  // Generic not-found for both "no such order" and "phone mismatch" — never
  // reveal which one it was.
  if (!order || order.customer_phone !== phone) {
    return NextResponse.json({ error: "No order found for those details" }, { status: 404 });
  }

  const { data: events } = await svc
    .from("order_status_events")
    .select("status, note, created_at")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  const zone = getShippingZone(order.shipping_pincode);

  return NextResponse.json({
    orderNumber: order.order_number,
    status: order.status,
    paymentStatus: order.payment_status,
    totalPaise: order.total_paise,
    trackingNumber: order.tracking_number,
    courierName: order.courier_name,
    createdAt: order.created_at,
    etaMinDays: zone.etaMinDays,
    etaMaxDays: zone.etaMaxDays,
    events: (events ?? []).map((e) => ({
      status: e.status,
      note: e.note,
      createdAt: e.created_at,
    })),
  });
}
