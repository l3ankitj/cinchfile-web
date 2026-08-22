import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { markOrderPaid } from "@/lib/orderFulfillment";

/**
 * Fast UX path: verifies the signature Razorpay's checkout widget hands back
 * on success, so we can redirect the customer immediately. The webhook
 * route is the authoritative source of truth for cases where this call
 * never completes (e.g. the tab closes right after payment).
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: orderId } = await context.params;

  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const svc = createServiceClient();
  const { data: order } = await svc
    .from("orders")
    .select("id, razorpay_order_id")
    .eq("id", orderId)
    .single();

  if (!order || order.razorpay_order_id !== razorpay_order_id) {
    return NextResponse.json({ error: "Order mismatch" }, { status: 400 });
  }

  const valid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  await markOrderPaid(svc, orderId, razorpay_payment_id, razorpay_signature);

  return NextResponse.json({ ok: true });
}
