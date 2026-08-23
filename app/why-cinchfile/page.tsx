import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, ShieldCheck, Truck, Layers, Clock, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Cinchfile",
  description: "Transparent pricing, quality paper, and doorstep delivery — why students choose Cinchfile over a local print shop.",
  alternates: { canonical: "/why-cinchfile" },
};

const REASONS = [
  {
    icon: <Wallet size={22} />,
    title: "Rates you can see upfront",
    body: "The full rate card is published — no per-visit haggling, no surprise charges added after you've already committed to an order.",
  },
  {
    icon: <Layers size={22} />,
    title: "Four paper weights, done right",
    body: "From economy 65 GSM notes to thesis-grade 100 GSM, each weight is printed on the same high-speed laser equipment for consistent, smudge-free output.",
  },
  {
    icon: <Truck size={22} />,
    title: "No shop visit required",
    body: "Upload from your phone or laptop, and your order ships to your hostel, PG, or home address — no queueing, no pickup trip.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Your files stay private",
    body: "Uploads are transferred over an encrypted connection and automatically removed from storage 24 hours after your order ships.",
  },
  {
    icon: <Clock size={22} />,
    title: "Delivery estimates before you pay",
    body: "Enter your pincode and see an estimated delivery window before checkout — not a vague 'a few days' promise.",
  },
  {
    icon: <BadgeCheck size={22} />,
    title: "Built for submission formats",
    body: "Binding options — spiral, soft, hard, and thesis hard binding — are built to match standard university and coaching-institute submission requirements.",
  },
];

export default function WhyCinchfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Why Cinchfile
      </h1>
      <p className="text-lg text-muted mb-12">
        A handful of reasons students pick us over the shop down the road.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {REASONS.map((r) => (
          <div key={r.title} className="rounded-xl border border-border bg-surface p-5">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent-hover flex items-center justify-center mb-3">
              {r.icon}
            </div>
            <h2 className="font-bold text-foreground mb-1">{r.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <Link href="/upload" className="btn-accent px-10 inline-flex">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}
