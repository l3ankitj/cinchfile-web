"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Truck, Package } from "lucide-react";
import {
  BINDING_OPTIONS,
  PAPER_OPTIONS,
  type BindingType,
  type PaperGsm,
  type PrintType,
  calculateOrderTotal,
  formatPaise,
  InvalidPricingCombinationError,
  type OrderPricingResult,
} from "@/lib/pricing";

export default function CalculatorForm() {
  const [pageCount, setPageCount] = useState("100");
  const [pincode, setPincode] = useState("");
  const [printType, setPrintType] = useState<PrintType>("bw");
  const [paperGsm, setPaperGsm] = useState<PaperGsm>(75);
  const [binding, setBinding] = useState<BindingType>("none");
  const [copies, setCopies] = useState(1);
  const [twoSided, setTwoSided] = useState(true);
  const [result, setResult] = useState<OrderPricingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableGsm = PAPER_OPTIONS.filter(
    (p) => printType !== "color" || p.gsm !== 65
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const pages = parseInt(pageCount, 10);
    if (!pages || pages < 1) {
      setError("Enter a total page count of at least 1.");
      setResult(null);
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setError("Enter a valid 6-digit delivery pincode.");
      setResult(null);
      return;
    }

    try {
      const total = calculateOrderTotal(
        [
          {
            printType,
            paperGsm,
            sides: twoSided ? "double" : "single",
            binding,
            copies,
            pageCount: pages,
          },
        ],
        pincode
      );
      setResult(total);
    } catch (err) {
      if (err instanceof InvalidPricingCombinationError) {
        setError(err.message);
      } else {
        setError("Couldn't calculate a price for that combination.");
      }
      setResult(null);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface shadow-card p-6 space-y-5"
      >
        <h2 className="text-lg font-bold text-foreground">Order Setup</h2>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Total Pages
          </label>
          <input
            type="number"
            min={1}
            placeholder="e.g. 100"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 focus:outline focus:outline-2 focus:outline-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Delivery Pincode
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 411030"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full rounded-lg border border-border px-3 py-2.5 focus:outline focus:outline-2 focus:outline-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Print Type
          </label>
          <select
            value={printType}
            onChange={(e) => {
              const val = e.target.value as PrintType;
              setPrintType(val);
              if (val === "color" && paperGsm === 65) setPaperGsm(75);
            }}
            className="w-full rounded-lg border border-border px-3 py-2.5 bg-surface focus:outline focus:outline-2 focus:outline-primary"
          >
            <option value="bw">Black &amp; White</option>
            <option value="color">Color</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Paper GSM
          </label>
          <select
            value={paperGsm}
            onChange={(e) => setPaperGsm(Number(e.target.value) as PaperGsm)}
            className="w-full rounded-lg border border-border px-3 py-2.5 bg-surface focus:outline focus:outline-2 focus:outline-primary"
          >
            {availableGsm.map((p) => (
              <option key={p.gsm} value={p.gsm}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Binding Type
          </label>
          <select
            value={binding}
            onChange={(e) => setBinding(e.target.value as BindingType)}
            className="w-full rounded-lg border border-border px-3 py-2.5 bg-surface focus:outline focus:outline-2 focus:outline-primary"
          >
            {BINDING_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Copies
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease copies"
              onClick={() => setCopies((c) => Math.max(1, c - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-surface-muted"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{copies}</span>
            <button
              type="button"
              aria-label="Increase copies"
              onClick={() => setCopies((c) => c + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-surface-muted"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={twoSided}
            onChange={(e) => setTwoSided(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary"
          />
          <span>
            <span className="block font-bold text-foreground text-sm">
              Two-Sided Printing
            </span>
            <span className="block text-xs text-muted">
              Turn off for single-sided pages.
            </span>
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-danger font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-primary text-primary-foreground font-bold py-3 hover:bg-primary-hover transition-colors"
        >
          Calculate Price
        </button>
      </form>

      <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
        <h2 className="text-lg font-bold text-foreground mb-1">
          Quotation Breakdown
        </h2>
        <p className="text-sm text-muted mb-6">
          A clean estimate before you move into checkout.
        </p>

        {!result ? (
          <p className="text-sm text-muted">
            Fill in the form and calculate to see your price.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Printing Subtotal (incl. binding)</span>
              <span className="font-bold text-foreground">
                {formatPaise(result.subtotalPaise)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted flex items-center gap-1.5">
                <Package size={14} /> Shipping ({(result.shipping.weightGrams / 1000).toFixed(2)} kg)
              </span>
              <span className="font-bold text-foreground">
                {formatPaise(result.shipping.shippingPaise)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Handling Fee</span>
              <span className="font-bold text-foreground">
                {formatPaise(result.handlingPaise)}
              </span>
            </div>
            <div className="border-t border-border pt-4 flex justify-between items-baseline">
              <span className="font-bold text-foreground">Estimated Total</span>
              <span className="text-2xl font-black text-primary">
                {formatPaise(result.totalPaise)}
              </span>
            </div>
            <div className="rounded-xl bg-surface-muted px-4 py-3 flex items-center gap-2 text-sm text-muted">
              <Truck size={16} className="text-accent shrink-0" />
              Delivery to {result.shipping.zoneName} in {result.shipping.etaMinDays}–
              {result.shipping.etaMaxDays} days
            </div>
            <Link
              href="/upload"
              className="block text-center w-full rounded-xl bg-accent text-accent-foreground font-bold py-3 hover:bg-accent-hover transition-colors"
            >
              Order Now
            </Link>
          </div>
        )}

        <p className="text-xs text-muted mt-6">
          This is an approximate quote. Final pricing is confirmed at
          checkout.
        </p>
      </div>
    </div>
  );
}
