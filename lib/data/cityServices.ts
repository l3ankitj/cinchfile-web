/**
 * The 8 service-specific city landing pages (city × service cross-product),
 * e.g. /print/agra/thesis-printing. Content for these is generated from the
 * templates in lib/cityContent.ts combined with a CityData entry — there's
 * no per-city-per-service hand-written copy at this scale.
 */
export interface CityServiceInfo {
  slug: string;
  label: string;
  /** Generic, city-agnostic description of what this service is, 2 sentences. */
  description: string;
  /** Short phrase used in headings, e.g. "thesis printing" */
  shortLabel: string;
}

export const CITY_SERVICES: CityServiceInfo[] = [
  {
    slug: "thesis-printing",
    label: "Thesis Printing",
    shortLabel: "thesis printing",
    description:
      "Thesis and dissertation copies printed on thesis-grade 100 GSM paper with hard binding and gold-embossed cover text, matching standard university submission formats.",
  },
  {
    slug: "hard-binding",
    label: "Hard Binding",
    shortLabel: "hard binding",
    description:
      "Rigid, laminated hardcover binding for final reports, portfolios, and submissions that need to survive years of handling without fraying at the edges.",
  },
  {
    slug: "spiral-binding",
    label: "Spiral Binding",
    shortLabel: "spiral binding",
    description:
      "Flat-lying spiral binding for notes and reference material you'll flip through repeatedly, at a fraction of the cost of hard binding.",
  },
  {
    slug: "notes-printing",
    label: "Notes Printing",
    shortLabel: "notes printing",
    description:
      "Bulk printing for coaching notes, handwritten material converted to PDF, and exam-prep study packs, priced per page with no minimum order.",
  },
  {
    slug: "dissertation-printing",
    label: "Dissertation Printing",
    shortLabel: "dissertation printing",
    description:
      "Dissertation-grade printing and binding for postgraduate and research submissions, with multiple identical copies in a single order for supervisors and examiners.",
  },
  {
    slug: "project-report-printing",
    label: "Project Report Printing",
    shortLabel: "project report printing",
    description:
      "Semester-end project reports printed with color cover pages and B&W body text, bound with staple, spiral, or soft binding depending on submission requirements.",
  },
  {
    slug: "print-shop",
    label: "Print Shop Alternative",
    shortLabel: "printing",
    description:
      "A doorstep alternative to visiting a local print shop in person — upload your file, confirm the price, and skip the queue entirely.",
  },
  {
    slug: "xerox",
    label: "Xerox & Photocopy",
    shortLabel: "xerox and photocopy",
    description:
      "Document photocopying and printing delivered to your address, for anyone searching for a nearby xerox shop who'd rather not make the trip.",
  },
];

export function getCityServiceBySlug(slug: string): CityServiceInfo | undefined {
  return CITY_SERVICES.find((s) => s.slug === slug);
}
