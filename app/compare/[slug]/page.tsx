import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISONS, getComparisonBySlug } from "@/lib/data/comparisons";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparisonBySlug(slug);
  if (!data) return {};
  return { title: `${data.title} | Cinchfile`, description: data.intro };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getComparisonBySlug(slug);
  if (!data) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        {data.title}
      </h1>
      <p className="text-lg text-muted mb-10">{data.intro}</p>

      <div className="overflow-x-auto rounded-xl border border-border shadow-card mb-10">
        <table className="w-full text-left border-collapse min-w-[480px]">
          <thead>
            <tr className="bg-surface-muted text-sm text-muted">
              <th className="px-5 py-3 font-bold"></th>
              <th className="px-5 py-3 font-bold text-primary">Cinchfile</th>
              <th className="px-5 py-3 font-bold">Alternative</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {data.rows.map((r) => (
              <tr key={r.feature} className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">{r.feature}</td>
                <td className="px-5 py-3 text-accent-hover font-bold">{r.cinchfile}</td>
                <td className="px-5 py-3 text-muted">{r.alternative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 mb-12">
        {data.body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
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
