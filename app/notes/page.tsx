import type { Metadata } from "next";
import Link from "next/link";
import { EXAM_NOTES } from "@/lib/data/examNotes";

export const metadata: Metadata = {
  title: "Competitive Exam Notes Printing | Cinchfile",
  description: "Bulk notes printing for UPSC, SSC, banking, NEET, JEE, GATE, and other competitive exam preparation.",
};

export default function NotesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
        Competitive Exam Notes Printing
      </h1>
      <p className="text-lg text-muted mb-10">
        Bulk printing for every major competitive exam — pick yours below.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {EXAM_NOTES.map((e) => (
          <Link
            key={e.slug}
            href={`/notes/${e.slug}`}
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary transition-colors"
          >
            <h2 className="font-bold text-foreground mb-1">{e.examName}</h2>
            <p className="text-sm text-muted">{e.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
