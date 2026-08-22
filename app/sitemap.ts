import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/data/cities";
import { CITY_SERVICES } from "@/lib/data/cityServices";
import { STATES } from "@/lib/data/states";
import { SERVICES } from "@/lib/data/services";
import { COMPARISONS } from "@/lib/data/comparisons";
import { UNIVERSITIES } from "@/lib/data/universities";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { EXAM_NOTES } from "@/lib/data/examNotes";

const STATIC_PATHS = [
  "",
  "/pricing",
  "/calculator",
  "/upload",
  "/track",
  "/my-orders",
  "/blog",
  "/print",
  "/services",
  "/compare",
  "/universities",
  "/notes",
  "/about",
  "/why-cinchfile",
  "/faq",
  "/contact",
  "/delivery-times",
  "/delivery-time-predictor",
  "/page-count-estimator",
  "/binding-selector",
  "/reviews",
  "/student-success-stories",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cinchfile.com";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  for (const c of CITIES) {
    entries.push({ url: `${base}/print/${c.slug}`, lastModified: now });
    for (const s of CITY_SERVICES) {
      entries.push({ url: `${base}/print/${c.slug}/${s.slug}`, lastModified: now });
    }
  }
  for (const s of STATES) entries.push({ url: `${base}/print/state/${s.slug}`, lastModified: now });
  for (const s of SERVICES) entries.push({ url: `${base}/services/${s.slug}`, lastModified: now });
  for (const c of COMPARISONS) entries.push({ url: `${base}/compare/${c.slug}`, lastModified: now });
  for (const u of UNIVERSITIES) entries.push({ url: `${base}/universities/${u.slug}`, lastModified: now });
  for (const e of EXAM_NOTES) entries.push({ url: `${base}/notes/${e.slug}`, lastModified: now });
  for (const p of BLOG_POSTS)
    entries.push({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.publishedAt) });

  return entries;
}
