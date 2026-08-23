/**
 * Templated content generation for the long tail of city (and city×service)
 * pages. At a few hundred cities, hand-writing bespoke prose per page isn't
 * practical — this fills a handful of "slots" from small phrase banks,
 * selected deterministically per city (so builds are stable) and combined
 * with real per-city facts (state, dispatch hub, ETA, universities,
 * localities). A handful of flagship cities keep fully hand-written
 * `intro`/`body` in lib/data/cities.ts instead — those are used as-is and
 * never pass through this generator.
 */
import type { CityData } from "./data/cities";
import type { CityServiceInfo } from "./data/cityServices";
import { pick, joinList } from "./contentTemplating";

const HUB_LEAD_TEMPLATES = [
  (c: CityData) =>
    `Orders to ${c.name} are printed at our ${c.dispatchHub} facility and typically arrive in ${c.etaMinDays}–${c.etaMaxDays} business days.`,
  (c: CityData) =>
    `${c.name} is served from our ${c.dispatchHub} dispatch hub, with delivery usually taking ${c.etaMinDays}–${c.etaMaxDays} business days.`,
  (c: CityData) =>
    `Print jobs for ${c.name} route through ${c.dispatchHub}, landing in ${c.etaMinDays}–${c.etaMaxDays} business days for most addresses.`,
];

const HUB_CLOSE_FAST = [
  "That's one of the shorter delivery windows on the platform, thanks to the short transit leg.",
  "Being close to the dispatch hub keeps the timeline tight compared to more distant cities.",
  "The short route from the hub is what keeps that estimate on the faster end.",
];

const HUB_CLOSE_MODERATE = [
  "It's a reasonable window that accounts honestly for the distance from the hub, rather than promising a same-city turnaround it can't consistently hit.",
  "The estimate reflects the real distance involved — still faster than most students expect once printing and binding time is factored in.",
  "That timeline builds in the transit leg rather than glossing over it, so it's a number worth planning around rather than treating as a best case.",
];

const STUDENT_CONTEXT_WITH_UNIS = [
  (c: CityData) =>
    `${c.name}'s student population includes ${joinList(c.universities ?? [])}, each generating a steady stream of assignments, project reports, and — depending on the program — thesis or dissertation submissions through the academic year.`,
  (c: CityData) =>
    `Institutions like ${joinList(c.universities ?? [])} keep printing demand in ${c.name} fairly constant, from semester-end reports to final-year thesis copies.`,
  (c: CityData) =>
    `With ${joinList(c.universities ?? [])} based in ${c.name}, the city sees a regular flow of academic printing — coursework, lab reports, and submission-ready thesis copies alike.`,
];

const STUDENT_CONTEXT_GENERIC = [
  (c: CityData) =>
    `Students and working professionals across ${c.name}, ${c.state} use online printing for everything from coaching notes to project reports, without needing to track down a reliable local shop.`,
  (c: CityData) =>
    `${c.name} has a steady base of students and exam aspirants who need documents printed and bound properly, whether that's assignments, notes, or a final report.`,
];

const LOCALITY_CLOSE = [
  (c: CityData) =>
    `Delivery reaches hostels, PGs, and home addresses across ${joinList(c.localities ?? [])} without needing a campus pickup point.`,
  (c: CityData) =>
    `Orders ship directly to addresses in ${joinList(c.localities ?? [])} and nearby areas, skipping the trip to a local shop entirely.`,
];

const LOCALITY_CLOSE_GENERIC = [
  (c: CityData) =>
    `Orders ship directly to hostels, PGs, and home addresses anywhere in ${c.name}, skipping the trip to a local shop entirely.`,
  (c: CityData) =>
    `Delivery covers ${c.name} pan-city, so there's no need to track down a print shop near your specific address.`,
];

export function generateCityIntro(city: CityData): string {
  return pick(HUB_LEAD_TEMPLATES, city.slug, "intro")(city);
}

export function generateCityBody(city: CityData): string[] {
  const paragraphs: string[] = [];

  const hubClose =
    city.etaMinDays <= 2
      ? pick(HUB_CLOSE_FAST, city.slug, "hubclose")
      : pick(HUB_CLOSE_MODERATE, city.slug, "hubclose");
  paragraphs.push(`${generateCityIntro(city)} ${hubClose}`);

  const studentPara =
    city.universities && city.universities.length > 0
      ? pick(STUDENT_CONTEXT_WITH_UNIS, city.slug, "student")(city)
      : pick(STUDENT_CONTEXT_GENERIC, city.slug, "student")(city);
  paragraphs.push(studentPara);

  const localityPara =
    city.localities && city.localities.length > 0
      ? pick(LOCALITY_CLOSE, city.slug, "locality")(city)
      : pick(LOCALITY_CLOSE_GENERIC, city.slug, "locality")(city);
  paragraphs.push(
    `${localityPara} It's a straightforward way to skip local shop queues and per-visit price haggling — the same published rate card applies here as everywhere else on the platform.`
  );

  return paragraphs;
}

const SERVICE_CITY_OPENERS = [
  (c: CityData, s: CityServiceInfo) =>
    `Looking for ${s.shortLabel} in ${c.name}? Upload your file, confirm the price, and get it delivered — no shop visit required.`,
  (c: CityData, s: CityServiceInfo) =>
    `${s.label} is available for doorstep delivery anywhere in ${c.name}, priced from the same published rate card used across the platform.`,
  (c: CityData, s: CityServiceInfo) =>
    `${c.name} students and professionals use Cinchfile for ${s.shortLabel} instead of visiting a shop in person.`,
];

export function generateCityServiceIntro(city: CityData, service: CityServiceInfo): string {
  return pick(SERVICE_CITY_OPENERS, city.slug, service.slug, "opener")(city, service);
}

export function generateCityServiceBody(city: CityData, service: CityServiceInfo): string[] {
  const deliveryLine =
    city.etaMinDays <= 2
      ? `Orders from ${city.name} route through our ${city.dispatchHub} hub and typically arrive in ${city.etaMinDays}–${city.etaMaxDays} business days — one of the faster windows on the platform.`
      : `Orders from ${city.name} route through our ${city.dispatchHub} hub, with delivery typically taking ${city.etaMinDays}–${city.etaMaxDays} business days.`;

  return [
    service.description,
    `${deliveryLine} The exact price is calculated from your page count, paper weight, and print settings before you pay — there's no per-visit haggling and no minimum order size.`,
  ];
}
