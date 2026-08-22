import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { STATES, getStateBySlug } from "@/lib/data/states";
import { generateStateBody, generateStateIntro } from "@/lib/stateContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const data = getStateBySlug(state);
  if (!data) return {};
  return {
    title: `Online Printing in ${data.name} | Cinchfile`,
    description: data.intro ?? generateStateIntro(data),
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const data = getStateBySlug(state);
  if (!data) notFound();

  const intro = data.intro ?? generateStateIntro(data);
  const body = data.body ?? generateStateBody(data);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Online Printing in {data.name}
      </h1>
      <p className="text-lg text-muted mb-8">{intro}</p>

      <div className="flex flex-wrap gap-2 mb-10">
        {data.majorCities.map((c) => (
          <span
            key={c}
            className="px-3 py-1.5 rounded-full bg-surface-muted text-sm font-bold text-foreground flex items-center gap-1"
          >
            <MapPin size={12} className="text-accent" /> {c}
          </span>
        ))}
      </div>

      <div className="space-y-4 mb-12">
        {body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to print in {data.name}?</h2>
        <Link href="/upload" className="btn-accent px-10 inline-flex mt-4">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}
