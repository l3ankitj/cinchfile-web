import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { CITIES, getCityBySlug } from "@/lib/data/cities";
import { CITY_SERVICES, getCityServiceBySlug } from "@/lib/data/cityServices";
import { generateCityServiceBody, generateCityServiceIntro } from "@/lib/cityContent";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const c of CITIES) {
    for (const s of CITY_SERVICES) {
      params.push({ city: c.slug, service: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city, service } = await params;
  const cityData = getCityBySlug(city);
  const serviceData = getCityServiceBySlug(service);
  if (!cityData || !serviceData) return {};
  return {
    title: `${serviceData.label} in ${cityData.name} | Cinchfile`,
    description: generateCityServiceIntro(cityData, serviceData),
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city, service } = await params;
  const cityData = getCityBySlug(city);
  const serviceData = getCityServiceBySlug(service);
  if (!cityData || !serviceData) notFound();

  const intro = generateCityServiceIntro(cityData, serviceData);
  const body = generateCityServiceBody(cityData, serviceData);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm font-bold text-accent-text uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <MapPin size={14} /> {cityData.name}, {cityData.state}
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        {serviceData.label} in {cityData.name}
      </h1>
      <p className="text-lg text-muted mb-10">{intro}</p>

      <div className="space-y-4 mb-12">
        {body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-3">
          Other services in {cityData.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {CITY_SERVICES.filter((s) => s.slug !== serviceData.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/print/${cityData.slug}/${s.slug}`}
              className="px-3 py-1.5 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Order {serviceData.shortLabel} in {cityData.name}
        </h2>
        <Link href="/upload" className="btn-accent px-10 inline-flex mt-4">
          Start Printing Now
        </Link>
      </div>

      <p className="text-center text-sm text-muted mt-6">
        <Link href={`/print/${cityData.slug}`} className="text-primary font-bold hover:underline">
          ← Full {cityData.name} delivery guide
        </Link>
      </p>
    </div>
  );
}
