import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXAM_NOTES, getExamNotesBySlug } from "@/lib/data/examNotes";

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAM_NOTES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getExamNotesBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.examName} Notes Printing | Cinchfile`,
    description: data.intro,
  };
}

export default async function ExamNotesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getExamNotesBySlug(slug);
  if (!data) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm font-bold text-accent uppercase tracking-wide mb-3">
        Competitive Exams
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        {data.examName} Notes Printing
      </h1>
      <p className="text-lg text-muted mb-10">{data.intro}</p>

      <div className="space-y-4 mb-12">
        {data.body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Print your {data.examName} notes</h2>
        <Link href="/upload" className="btn-accent px-10 inline-flex mt-4">
          Start Printing Now
        </Link>
      </div>

      <p className="text-center text-sm text-muted mt-6">
        <Link href="/notes" className="text-primary font-bold hover:underline">
          ← All exam categories
        </Link>
      </p>
    </div>
  );
}
