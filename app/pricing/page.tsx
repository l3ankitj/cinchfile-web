import type { Metadata } from "next";
import Link from "next/link";
import {
  BINDING_COST_PAISE,
  HANDLING_FEE_PAISE,
  PAPER_OPTIONS,
  RATE_TABLE_PAISE,
  formatPaise,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing & Rate Card | Cinchfile",
  description:
    "Transparent per-page printing rates by paper weight, plus binding add-ons and delivery. No hidden charges — see the full rate card before you order.",
  alternates: { canonical: "/pricing" },
};

const BINDING_LABELS: Record<string, string> = {
  spiral: "Spiral Binding",
  soft: "Soft Binding",
  hard: "Hard Binding",
  thesis_hard: "Thesis Hard Binding",
};

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-sm font-bold text-accent-text uppercase tracking-wide mb-3">
        Transparent Rates
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Pricing &amp; Rate Card
      </h1>
      <p className="text-lg text-muted max-w-2xl mb-12">
        Every rate you&apos;ll see at checkout is listed here first. Pick a
        paper weight, add binding if you need it, and the total is yours to
        check before you pay a rupee.
      </p>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Printing cost per page
        </h2>
        <p className="text-muted mb-6">
          &ldquo;Both sides&rdquo; is duplex printing; &ldquo;one side&rdquo; is
          single-sided.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border shadow-card">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-surface-muted text-sm text-muted">
                <th className="px-5 py-3 font-bold">Paper</th>
                <th className="px-5 py-3 font-bold">B&amp;W both sides</th>
                <th className="px-5 py-3 font-bold">B&amp;W one side</th>
                <th className="px-5 py-3 font-bold">Color both sides</th>
                <th className="px-5 py-3 font-bold">Color one side</th>
              </tr>
            </thead>
            <tbody className="bg-surface">
              {PAPER_OPTIONS.map(({ gsm, label }) => {
                const row = RATE_TABLE_PAISE[gsm];
                return (
                  <tr key={gsm} className="border-t border-border">
                    <td className="px-5 py-3 font-bold text-foreground">
                      {label}
                    </td>
                    <td className="px-5 py-3">
                      {formatPaise(row.bw.double!)}
                    </td>
                    <td className="px-5 py-3">
                      {formatPaise(row.bw.single!)}
                    </td>
                    <td className="px-5 py-3">
                      {row.color.double !== null
                        ? formatPaise(row.color.double)
                        : "Not available"}
                    </td>
                    <td className="px-5 py-3">
                      {row.color.single !== null
                        ? formatPaise(row.color.single)
                        : "Not available"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Binding &amp; add-ons
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(BINDING_LABELS).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 shadow-card"
            >
              <span className="font-bold text-foreground">{label}</span>
              <span className="text-accent-text font-black">
                {formatPaise(BINDING_COST_PAISE[key as keyof typeof BINDING_COST_PAISE])}
                <span className="text-muted font-medium text-sm">/copy</span>
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 shadow-card">
            <span className="font-bold text-foreground">Handling fee</span>
            <span className="text-accent-text font-black">
              {formatPaise(HANDLING_FEE_PAISE)}
              <span className="text-muted font-medium text-sm">/order</span>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Delivery
        </h2>
        <p className="text-muted max-w-2xl">
          Shipping is estimated from your pincode and the weight of your
          order, and shown in full before checkout — no surprise charges at
          the door.
        </p>
      </section>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Want an exact quote?</h2>
          <p className="text-white/80">
            Upload your files and configure your order to see the exact
            total, or use the calculator to estimate first.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white text-sm font-bold hover:bg-white/20 transition-colors"
          >
            Open Calculator
          </Link>
          <Link
            href="/upload"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-bold hover:bg-accent-hover transition-colors"
          >
            Start Printing
          </Link>
        </div>
      </div>
    </div>
  );
}
