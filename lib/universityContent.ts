/**
 * Templated content for the long tail of university pages, mirroring
 * lib/cityContent.ts / lib/stateContent.ts.
 */
import type { UniversityData } from "./data/universities";
import { pick } from "./contentTemplating";

const INTRO_TEMPLATES = [
  (u: UniversityData) =>
    `Doorstep printing for ${u.name} students in ${u.city} — thesis submissions, project reports, and coaching notes delivered directly to hostels and PGs.`,
  (u: UniversityData) =>
    `Students near ${u.name} can skip the local print shop entirely — upload a file and get it printed, bound, and delivered around ${u.city}.`,
];

const BODY_TEMPLATES = [
  (u: UniversityData) =>
    `Coursework around ${u.name} typically means a mix of assignments, lab reports, and — depending on the program — a final thesis or dissertation that needs to meet a specific paper weight and binding standard. The same rate card and paper options used across the platform apply here, with binding choices ranging from a simple staple to full thesis hard binding with gold-embossed lettering.`,
  (u: UniversityData) =>
    `Whether it's a semester project report, a lab manual, or a final submission copy, students around ${u.name} can configure paper weight, color, and binding in one checkout rather than negotiating each separately at a local shop.`,
];

const CLOSING_TEMPLATES = [
  (u: UniversityData) =>
    `Orders are delivered to hostels, PGs, and shared housing around ${u.city} without needing a campus pickup point — useful during deadline weeks when a shop trip isn't practical.`,
  (u: UniversityData) =>
    `Delivery covers student housing across ${u.city}, so there's no need to carry a finished document back from a print shop across town.`,
];

export function generateUniversityIntro(u: UniversityData): string {
  return pick(INTRO_TEMPLATES, u.slug, "intro")(u);
}

export function generateUniversityBody(u: UniversityData): string[] {
  return [
    pick(BODY_TEMPLATES, u.slug, "body1")(u),
    pick(CLOSING_TEMPLATES, u.slug, "body2")(u),
  ];
}
