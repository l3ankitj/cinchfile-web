"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPaise } from "@/lib/pricing";

interface TrackResult {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalPaise: number;
  trackingNumber: string | null;
  courierName: string | null;
  createdAt: string;
  etaMinDays: number;
  etaMaxDays: number;
  events: { status: string; note: string | null; createdAt: string }[];
}

export default function TrackForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not find that order");
      setResult(data);
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
            Order Number
          </label>
          <input
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. CF260822-00001"
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Mobile Number
          </label>
          <input
            required
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit number used at checkout"
            className="input"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-danger font-medium">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Searching…" : "Track Order"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-2xl border border-border bg-surface shadow-card p-6">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="font-black text-foreground">{result.orderNumber}</h2>
            <span className="font-bold text-primary">{formatPaise(result.totalPaise)}</span>
          </div>
          <p className="text-sm text-muted mb-4">
            Estimated delivery: {result.etaMinDays}–{result.etaMaxDays} business days
            {result.courierName && result.trackingNumber && (
              <> · {result.courierName} #{result.trackingNumber}</>
            )}
          </p>
          <ul className="space-y-3">
            {result.events.length === 0 ? (
              <li className="text-sm text-muted">Order received — updates will appear here.</li>
            ) : (
              result.events.map((e, i) => (
                <li key={i} className="text-sm">
                  <span className="font-bold text-foreground capitalize">
                    {e.status.replace("_", " ")}
                  </span>
                  {e.note && <span className="text-muted"> — {e.note}</span>}
                  <span className="block text-xs text-muted">
                    {new Date(e.createdAt).toLocaleString("en-IN")}
                  </span>
                </li>
              ))
            )}
          </ul>
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
