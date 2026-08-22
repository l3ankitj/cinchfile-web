import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Cinchfile",
  description: "Cinchfile is a print-on-demand platform built for students — transparent pricing, quality paper, and doorstep delivery across India.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-6">About Cinchfile</h1>
      <div className="space-y-4 text-foreground/90 leading-relaxed mb-12">
        <p>
          Cinchfile exists to fix a specific, familiar annoyance: needing a document
          printed and bound properly, without a trip to a local shop, a queue, or
          a per-visit haggle over price.
        </p>
        <p>
          We built a straightforward flow — upload a file, choose your paper and
          binding, see the exact price, pay, and get it delivered — with the same
          published rate card for every order, whether it&apos;s five pages or five
          hundred.
        </p>
        <p>
          The platform is designed around the documents students actually print
          most: assignments, coaching notes, project reports, and thesis
          submissions that need to meet a specific paper weight and binding
          standard.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <ValueCard icon={<Wallet size={20} />} label="Transparent, published rates" />
        <ValueCard icon={<ShieldCheck size={20} />} label="Encrypted uploads, auto-deleted files" />
        <ValueCard icon={<Truck size={20} />} label="Doorstep delivery, pan-India" />
      </div>

      <div className="text-center">
        <Link href="/upload" className="btn-accent px-10 inline-flex">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}

function ValueCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent-hover flex items-center justify-center mx-auto mb-2">
        {icon}
      </div>
      <p className="text-sm font-bold text-foreground">{label}</p>
    </div>
  );
}
