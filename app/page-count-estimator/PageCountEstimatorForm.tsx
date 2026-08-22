"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

const WORDS_PER_PAGE = 500;

export default function PageCountEstimatorForm() {
  const [mode, setMode] = useState<"typed" | "handwritten">("typed");
  const [wordCount, setWordCount] = useState("2500");
  const [photoCount, setPhotoCount] = useState("20");

  const estimatedPages =
    mode === "typed"
      ? Math.max(1, Math.ceil((parseInt(wordCount, 10) || 0) / WORDS_PER_PAGE))
      : Math.max(1, parseInt(photoCount, 10) || 0);

  return (
    <div>
      <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
        <div className="flex rounded-xl bg-surface-muted p-1 mb-5">
          <button
            type="button"
            onClick={() => setMode("typed")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
              mode === "typed" ? "bg-primary text-primary-foreground" : "text-muted"
            }`}
          >
            Typed Document
          </button>
          <button
            type="button"
            onClick={() => setMode("handwritten")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
              mode === "handwritten" ? "bg-primary text-primary-foreground" : "text-muted"
            }`}
          >
            Handwritten / Scanned
          </button>
        </div>

        {mode === "typed" ? (
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">
              Approximate word count
            </label>
            <input
              type="number"
              min={0}
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              className="input"
            />
            <p className="text-xs text-muted mt-2">
              Based on ~{WORDS_PER_PAGE} words per A4 page at standard font size and spacing.
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">
              Number of photos / sheets
            </label>
            <input
              type="number"
              min={0}
              value={photoCount}
              onChange={(e) => setPhotoCount(e.target.value)}
              className="input"
            />
            <p className="text-xs text-muted mt-2">
              Each photographed or scanned page counts as one printed page.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-primary text-primary-foreground p-6 flex items-center gap-4">
        <FileText size={28} className="shrink-0" />
        <div>
          <p className="text-sm text-white/70 font-bold uppercase tracking-wide">
            Estimated Pages
          </p>
          <p className="text-2xl font-black">{estimatedPages} pages</p>
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-6">
        <Link href="/calculator" className="text-primary font-bold hover:underline">
          Get a price estimate →
        </Link>
      </p>
    </div>
  );
}
