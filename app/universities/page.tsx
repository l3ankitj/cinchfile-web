import type { Metadata } from "next";
import Link from "next/link";
import { UNIVERSITIES } from "@/lib/data/universities";

export const metadata: Metadata = {
  title: "University Printing | Cinchfile",
  description: "Doorstep print delivery for students near major Indian universities.",
  alternates: { canonical: "/universities" },
};

export default function UniversitiesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
        University Printing
      </h1>
      <p className="text-lg text-muted mb-10">
        Doorstep delivery for students near major campuses.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {UNIVERSITIES.map((u) => (
          <Link
            key={u.slug}
            href={`/universities/${u.slug}`}
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary transition-colors"
          >
            <h2 className="font-bold text-foreground mb-1">{u.name}</h2>
            <p className="text-sm text-muted">{u.city}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
