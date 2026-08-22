"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { formatPaise } from "@/lib/pricing";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

function loadRazorpayScript(): Promise<void> {
  if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load payment widget"));
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckoutButton({
  orderId,
  totalPaise,
}: {
  orderId: string;
  totalPaise: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setError(null);
    setLoading(true);
    try {
      await loadRazorpayScript();

      const orderRes = await fetch(`/api/orders/${orderId}/razorpay-order`, {
        method: "POST",
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error ?? "Could not start payment");

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amountPaise,
        currency: orderData.currency,
        order_id: orderData.razorpayOrderId,
        name: "Cinchfile",
        description: "Print order payment",
        theme: { color: "#1e2a5e" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch(`/api/orders/${orderId}/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            if (!verifyRes.ok) throw new Error("Payment could not be verified");
            router.push(`/orders/${orderId}/confirmation`);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start payment");
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <p role="alert" className="text-sm text-danger font-medium mb-3">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className="btn-accent w-full disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Opening payment…
          </span>
        ) : (
          `Pay ${formatPaise(totalPaise)}`
        )}
      </button>
    </div>
  );
}
