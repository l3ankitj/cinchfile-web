import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { formatPaise } from "@/lib/pricing";
import { getShippingZone } from "@/lib/data/shipping-zones";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const svc = createServiceClient();

  const { data: order } = await svc
    .from("orders")
    .select("order_number, payment_status, customer_name, total_paise, shipping_pincode")
    .eq("id", id)
    .single();

  if (!order) notFound();

  const zone = getShippingZone(order.shipping_pincode);
  const isPaid = order.payment_status === "paid";

  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center">
      <div
        className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
          isPaid ? "bg-success/10" : "bg-surface-muted"
        }`}
      >
        <CheckCircle2 size={32} className={isPaid ? "text-success" : "text-muted"} />
      </div>
      <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
        {isPaid ? "Order confirmed" : "Payment processing"}
      </h1>
      <p className="text-muted mb-8">
        {isPaid
          ? "Thanks, " + order.customer_name + " — we've got your files and your order is in the queue."
          : "We're confirming your payment. This page will update shortly — you can also check via Track Order."}
      </p>

      <div className="rounded-2xl border border-border bg-surface shadow-card p-6 text-left space-y-3 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Order Number</span>
          <span className="font-black text-foreground">{order.order_number}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Amount</span>
          <span className="font-bold text-foreground">{formatPaise(order.total_paise)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Estimated Delivery</span>
          <span className="font-bold text-foreground">
            {zone.etaMinDays}–{zone.etaMaxDays} business days
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/track" className="btn-primary px-8">
          Track This Order
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-surface-muted transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
