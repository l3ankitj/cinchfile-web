import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { markOrderPaid } from "@/lib/orderFulfillment";

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: {
        id: string;
        order_id: string;
        status: string;
      };
    };
  };
}

/**
 * Authoritative payment-confirmation path. Verifies the signature over the
 * RAW request body (before any JSON parsing) against a webhook-specific
 * secret configured separately in the Razorpay Dashboard.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: RazorpayWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.event !== "payment.captured" && payload.event !== "order.paid") {
    // Ack unhandled event types so Razorpay doesn't keep retrying them.
    return NextResponse.json({ ok: true });
  }

  const payment = payload.payload.payment?.entity;
  if (!payment) {
    return NextResponse.json({ ok: true });
  }

  const svc = createServiceClient();
  const { data: order } = await svc
    .from("orders")
    .select("id")
    .eq("razorpay_order_id", payment.order_id)
    .single();

  if (!order) {
    // Nothing to reconcile against — ack so Razorpay stops retrying.
    return NextResponse.json({ ok: true });
  }

  await markOrderPaid(svc, order.id, payment.id, null);

  return NextResponse.json({ ok: true });
}
