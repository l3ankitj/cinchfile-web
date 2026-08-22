"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPaise } from "@/lib/pricing";
import StatusBadge from "@/app/admin/StatusBadge";

interface OrderRow {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalPaise: number;
  createdAt: string;
}

export default function MyOrdersForm() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrders(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders/my-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface shadow-card p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Mobile Number
          </label>
          <input
            required
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="input"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-danger font-medium">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Searching…" : "Find My Orders"}
        </button>
      </form>

      {orders && (
        <div className="mt-6 space-y-3">
          {orders.length === 0 ? (
            <p className="text-center text-sm text-muted">No orders found for that number.</p>
          ) : (
            orders.map((o) => (
              <div
                key={o.orderNumber}
                className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-foreground">{o.orderNumber}</p>
                  <p className="text-xs text-muted">
                    {new Date(o.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{formatPaise(o.totalPaise)}</p>
                  <StatusBadge value={o.status} />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <p className="text-center text-sm text-muted mt-6">
        <Link href="/" className="hover:text-foreground font-bold">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
}
