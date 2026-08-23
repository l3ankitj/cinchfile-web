import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const data = getServiceBySlug(service);
  if (!data) return {};
  return {
    title: `${data.name} | Cinchfile`,
    description: data.shortDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = getServiceBySlug(service);
  if (!data) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm font-bold text-accent-text uppercase tracking-wide mb-3">
        {data.priceNote}
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        {data.name}
      </h1>
      <p className="text-lg text-muted mb-10">{data.intro}</p>

      <ul className="grid sm:grid-cols-2 gap-3 mb-10">
        {data.bulletPoints.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <CheckCircle2 size={16} className="text-accent-text shrink-0 mt-0.5" />
            <span className="text-foreground">{b}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-4 mb-12">
        {data.body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Order {data.name.toLowerCase()}</h2>
        <Link href="/upload" className="btn-accent px-10 inline-flex mt-4">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}
