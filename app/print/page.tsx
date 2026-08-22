import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CITIES } from "@/lib/data/cities";
import { STATES } from "@/lib/data/states";

export const metadata: Metadata = {
  title: "Cities We Deliver To | Cinchfile",
  description: "Doorstep print delivery across Indian cities and states.",
};

export default function PrintCitiesIndexPage() {
  const byState = new Map<string, typeof CITIES>();
  for (const c of CITIES) {
    const list = byState.get(c.state) ?? [];
    list.push(c);
    byState.set(c.state, list);
  }
  const stateGroups = Array.from(byState.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
        Cities We Deliver To
      </h1>
      <p className="text-lg text-muted mb-2">
        Doorstep print delivery is available pan-India — {CITIES.length} cities
        have a dedicated local guide below, grouped by state.
      </p>
      <p className="text-sm text-muted mb-10">
        Don&apos;t see your city? Delivery still reaches your pincode — check
        the{" "}
        <Link href="/delivery-time-predictor" className="text-primary font-bold hover:underline">
          delivery time predictor
        </Link>
        .
      </p>

      <div className="space-y-8 mb-12">
        {stateGroups.map(([state, cities]) => (
          <div key={state}>
            <h2 className="text-sm font-bold text-muted uppercase tracking-wide mb-3">
              {state}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/print/${c.slug}`}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <MapPin size={12} className="text-accent" /> {c.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-foreground mb-3">All States</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {STATES.map((s) => (
          <Link
            key={s.slug}
            href={`/print/state/${s.slug}`}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 font-bold text-foreground hover:border-primary transition-colors"
          >
            <MapPin size={16} className="text-accent" /> {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
