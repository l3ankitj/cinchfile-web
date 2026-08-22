import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISONS } from "@/lib/data/comparisons";

export const metadata: Metadata = {
  title: "Compare Printing Options | Cinchfile",
  description: "How Cinchfile compares to local shops, campus print centers, and printing at home.",
};

export default function CompareIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
        Compare Your Options
      </h1>
      <p className="text-lg text-muted mb-10">
        See how online printing stacks up against the alternatives.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {COMPARISONS.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary transition-colors"
          >
            <h2 className="font-bold text-foreground mb-1">{c.title}</h2>
            <p className="text-sm text-muted">{c.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
