import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Printing Services | Cinchfile",
  description: "Every print and binding service offered on Cinchfile, from thesis binding to bulk printing.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">Services</h1>
      <p className="text-lg text-muted mb-10">
        Every print and binding option available at checkout, explained.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary transition-colors"
          >
            <h2 className="font-bold text-foreground mb-1">{s.name}</h2>
            <p className="text-sm text-muted mb-2">{s.shortDescription}</p>
            <p className="text-sm font-bold text-accent-hover">{s.priceNote}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
