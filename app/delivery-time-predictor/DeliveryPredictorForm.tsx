"use client";

import { useState } from "react";
import Link from "next/link";
import { Truck } from "lucide-react";
import { getShippingZone } from "@/lib/data/shipping-zones";

export default function DeliveryPredictorForm() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<ReturnType<typeof getShippingZone> | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setError("Enter a valid 6-digit pincode.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(getShippingZone(pincode));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface shadow-card p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">Pincode</label>
          <input
            inputMode="numeric"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="e.g. 411030"
            className="input"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-danger font-medium">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary w-full">
          Check Delivery Time
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-2xl bg-primary text-primary-foreground p-6 flex items-center gap-4">
          <Truck size={28} className="shrink-0" />
          <div>
            <p className="text-sm text-white/70 font-bold uppercase tracking-wide">
              {result.name}
            </p>
            <p className="text-2xl font-black">
              {result.etaMinDays}–{result.etaMaxDays} business days
            </p>
          </div>
        </div>
      )}

      <p className="text-center text-sm text-muted mt-6">
        <Link href="/upload" className="text-primary font-bold hover:underline">
          Start your order →
        </Link>
      </p>
    </div>
  );
}
