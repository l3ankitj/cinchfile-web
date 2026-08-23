import type { SupabaseClient } from "@supabase/supabase-js";
import { logAudit } from "@/lib/audit";
import { sendOrderConfirmationEmail, sendStaffOrderNotificationEmail } from "@/lib/email";
import { getShippingZone } from "@/lib/data/shipping-zones";

/**
 * Idempotently marks an order as paid. Called from both the client-side
 * verify route (fast UX path) and the Razorpay webhook (authoritative path,
 * which can redeliver) — safe to call more than once for the same order.
 */
export async function markOrderPaid(
  svc: SupabaseClient,
  orderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string | null
): Promise<{ alreadyProcessed: boolean }> {
  const { data: order } = await svc
    .from("orders")
    .select(
      "id, order_number, payment_status, customer_name, customer_email, shipping_pincode, total_paise"
    )
    .eq("id", orderId)
    .single();

  if (!order) throw new Error("Order not found");

  if (order.payment_status === "paid") {
    return { alreadyProcessed: true };
  }

  // Conditional update guards against the client-verify call and the webhook
  // racing each other for the same payment: only the caller whose update
  // actually matches a still-unpaid row proceeds past this point, so the
  // status event / audit log / emails below never fire twice.
  const { data: updated } = await svc
    .from("orders")
    .update({
      payment_status: "paid",
      status: "processing",
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
      paid_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .eq("payment_status", "unpaid")
    .select("id");

  if (!updated || updated.length === 0) {
    return { alreadyProcessed: true };
  }

  await svc.from("order_status_events").insert({
    order_id: orderId,
    status: "processing",
    note: "Payment confirmed",
  });

  await logAudit(null, "order_payment_confirmed", { orderId, razorpayPaymentId });

  const { data: files } = await svc
    .from("order_files")
    .select("id")
    .eq("order_id", orderId)
    .eq("status", "uploaded");

  const zone = getShippingZone(order.shipping_pincode);

  try {
    if (order.customer_email) {
      await sendOrderConfirmationEmail({
        toEmail: order.customer_email,
        customerName: order.customer_name,
        orderNumber: order.order_number,
        totalPaise: order.total_paise,
        etaMinDays: zone.etaMinDays,
        etaMaxDays: zone.etaMaxDays,
      });
    }
    await sendStaffOrderNotificationEmail({
      orderNumber: order.order_number,
      customerName: order.customer_name,
      totalPaise: order.total_paise,
      fileCount: files?.length ?? 0,
    });
  } catch {
    // Email failures must never block payment confirmation.
  }

  return { alreadyProcessed: false };
}
