import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UNIVERSITIES, getUniversityBySlug } from "@/lib/data/universities";
import { generateUniversityBody, generateUniversityIntro } from "@/lib/universityContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return UNIVERSITIES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getUniversityBySlug(slug);
  if (!data) return {};
  return {
    title: `Printing for ${data.name} Students | Cinchfile`,
    description: data.intro ?? generateUniversityIntro(data),
  };
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getUniversityBySlug(slug);
  if (!data) notFound();

  const intro = data.intro ?? generateUniversityIntro(data);
  const body = data.body ?? generateUniversityBody(data);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Printing for {data.name} Students
      </h1>
      <p className="text-lg text-muted mb-10">{intro}</p>

      <div className="space-y-4 mb-12">
        {body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {data.citySlug && (
        <p className="text-sm text-muted mb-8">
          Want more coverage details for {data.city}?{" "}
          <Link href={`/print/${data.citySlug}`} className="text-primary font-bold hover:underline">
            See the {data.city} delivery page →
          </Link>
        </p>
      )}

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <Link href="/upload" className="btn-accent px-10 inline-flex">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}
