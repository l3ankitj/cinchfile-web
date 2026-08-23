import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Truck, GraduationCap } from "lucide-react";
import { CITIES, getCityBySlug } from "@/lib/data/cities";
import { CITY_SERVICES } from "@/lib/data/cityServices";
import { generateCityBody, generateCityIntro } from "@/lib/cityContent";
import { buildBreadcrumbJsonLd, JsonLdScript } from "@/lib/jsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return {};
  return {
    title: `Online Printing in ${data.name} | Cinchfile`,
    description: data.intro ?? generateCityIntro(data),
    alternates: { canonical: `/print/${data.slug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const intro = data.intro ?? generateCityIntro(data);
  const body = data.body ?? generateCityBody(data);
  const universities = data.universities ?? [];
  const localities = data.localities ?? [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cities We Deliver To", path: "/print" },
          { name: data.name },
        ])}
      />
      <p className="text-sm font-bold text-accent-text uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <MapPin size={14} /> {data.state}
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        Online Printing in {data.name}
      </h1>
      <p className="text-lg text-muted mb-10">{intro}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <InfoCard
          icon={<Truck size={18} />}
          label="Delivery Estimate"
          value={`${data.etaMinDays}–${data.etaMaxDays} business days`}
        />
        <InfoCard icon={<MapPin size={18} />} label="Dispatch Hub" value={data.dispatchHub} />
      </div>

      <div className="prose-body space-y-4 mb-12">
        {body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {universities.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <GraduationCap size={20} className="text-accent-text" /> Colleges &amp; Universities Served
          </h2>
          <div className="flex flex-wrap gap-2">
            {universities.map((u) => (
              <span
                key={u}
                className="px-3 py-1.5 rounded-full bg-surface-muted text-sm font-medium text-foreground"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      )}

      {localities.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-3">Areas We Deliver To</h2>
          <p className="text-muted">{localities.join(", ")}, and nearby areas.</p>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-3">
          Printing Services in {data.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {CITY_SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/print/${data.slug}/${s.slug}`}
              className="px-3 py-1.5 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to print in {data.name}?</h2>
        <p className="text-white/80 mb-6">
          Upload your files and see your exact price before you pay.
        </p>
        <Link href="/upload" className="btn-accent px-10 inline-flex">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-5 py-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent-hover flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted font-bold uppercase tracking-wide">{label}</p>
        <p className="font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
