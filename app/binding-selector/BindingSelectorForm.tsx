"use client";

import { useState } from "react";
import Link from "next/link";
import { BINDING_OPTIONS, BINDING_COST_PAISE, formatPaise, type BindingType } from "@/lib/pricing";

type Purpose = "draft" | "notes" | "report" | "thesis" | "resume";

const PURPOSES: { value: Purpose; label: string }[] = [
  { value: "draft", label: "Draft pages / personal reference" },
  { value: "notes", label: "Notes / coaching material" },
  { value: "report", label: "Project or assignment report" },
  { value: "thesis", label: "Thesis / dissertation" },
  { value: "resume", label: "Resume / application document" },
];

function recommend(purpose: Purpose, pages: number): { binding: BindingType; reason: string } {
  if (purpose === "thesis") {
    return {
      binding: "thesis_hard",
      reason: "Thesis and dissertation submissions typically require hard binding with a formal cover — most university guidelines expect this.",
    };
  }
  if (purpose === "resume") {
    return {
      binding: pages > 2 ? "staple" : "none",
      reason: pages > 2
        ? "A multi-page resume or application document just needs a staple to stay together."
        : "A one or two page resume doesn't need binding at all — loose sheets work fine.",
    };
  }
  if (purpose === "notes") {
    return {
      binding: "spiral",
      reason: "Spiral binding lets pages lie flat when open, which is ideal for notes you'll flip through repeatedly.",
    };
  }
  if (purpose === "report") {
    return pages >= 40
      ? { binding: "hard", reason: "Longer reports hold together better with hard binding and look more polished for submission." }
      : { binding: "soft", reason: "Soft binding gives a clean, submission-ready look for a report of this length without the cost of hard binding." };
  }
  return {
    binding: pages > 20 ? "staple" : "none",
    reason: pages > 20
      ? "A staple keeps a longer draft stack together without the cost of formal binding."
      : "A short draft doesn't need binding — loose pages are simplest.",
  };
}

export default function BindingSelectorForm() {
  const [purpose, setPurpose] = useState<Purpose>("notes");
  const [pages, setPages] = useState("50");
  const [result, setResult] = useState<{ binding: BindingType; reason: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = Math.max(1, parseInt(pages, 10) || 1);
    setResult(recommend(purpose, p));
  }

  const bindingLabel = result
    ? BINDING_OPTIONS.find((b) => b.value === result.binding)?.label
    : null;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface shadow-card p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            What are you printing?
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as Purpose)}
            className="input"
          >
            {PURPOSES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">
            Roughly how many pages?
          </label>
          <input
            type="number"
            min={1}
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Recommend a Binding
        </button>
      </form>

      {result && bindingLabel && (
        <div className="mt-6 rounded-2xl bg-primary text-primary-foreground p-6">
          <p className="text-sm text-white/70 font-bold uppercase tracking-wide mb-1">
            Recommended
          </p>
          <h2 className="text-2xl font-black mb-2">{bindingLabel}</h2>
          <p className="text-white/80 mb-4">{result.reason}</p>
          <p className="text-sm text-white/70 mb-4">
            {BINDING_COST_PAISE[result.binding] > 0
              ? `${formatPaise(BINDING_COST_PAISE[result.binding])}/copy`
              : "No extra charge"}
          </p>
          <Link href="/upload" className="btn-accent w-full">
            Start Printing Now
          </Link>
        </div>
      )}
    </div>
  );
}
