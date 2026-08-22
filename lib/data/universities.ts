/**
 * Delivery-targeting content for students near specific campuses — not an
 * official partnership or endorsement claim, just geographic SEO content
 * similar to the city pages. A handful of flagship entries keep hand-written
 * intro/body; the rest generate from lib/universityContent.ts.
 */
export interface UniversityData {
  slug: string;
  name: string;
  city: string;
  /** Only set when a matching /print/[city] page exists. */
  citySlug?: string;
  intro?: string;
  body?: string[];
}

export const UNIVERSITIES: UniversityData[] = [
  {
    slug: "iit-bombay",
    name: "IIT Bombay",
    city: "Mumbai",
    citySlug: "mumbai",
    intro:
      "Doorstep printing for IIT Bombay students — project reports, lab manuals, and thesis submissions delivered to hostels and PGs around Powai.",
    body: [
      "Engineering coursework at IIT Bombay tends to mix dense technical diagrams with long text sections, which is exactly where choosing the right paper and print settings per document matters. Upload each file, set B&W for text-heavy sections and color for diagram-heavy ones, and pay one combined total.",
      "Deliveries route to hostels, PGs, and off-campus housing around Powai without needing a campus pickup point, which matters most during deadline weeks when a trip off campus isn't practical.",
    ],
  },
  {
    slug: "aiims-delhi",
    name: "AIIMS Delhi",
    city: "Delhi",
    citySlug: "delhi",
    intro:
      "Print delivery for AIIMS Delhi students and residents — thesis submissions, case study reports, and coaching notes on request.",
    body: [
      "Medical coursework often means longer documents with strict formatting and binding requirements for thesis and dissertation submissions. Thesis hard binding with the correct cover format is available as a standard checkout option, alongside standard B&W printing for case study reports and rotations documentation.",
      "Delivery covers hostels and nearby residential areas serving AIIMS students, with the same 2–7 business day estimate shown for any Delhi-area pincode.",
    ],
  },
  { slug: "iit-delhi", name: "IIT Delhi", city: "Delhi", citySlug: "delhi" },
  { slug: "iit-madras", name: "IIT Madras", city: "Chennai", citySlug: "chennai" },
  { slug: "iit-kanpur", name: "IIT Kanpur", city: "Kanpur" },
  { slug: "iit-kharagpur", name: "IIT Kharagpur", city: "Kharagpur" },
  { slug: "iit-roorkee", name: "IIT Roorkee", city: "Roorkee" },
  { slug: "iit-guwahati", name: "IIT Guwahati", city: "Guwahati" },
  { slug: "iit-hyderabad", name: "IIT Hyderabad", city: "Hyderabad", citySlug: "hyderabad" },
  { slug: "iit-bhu-varanasi", name: "IIT (BHU) Varanasi", city: "Varanasi" },
  { slug: "delhi-university", name: "University of Delhi", city: "Delhi", citySlug: "delhi" },
  { slug: "jnu", name: "Jawaharlal Nehru University", city: "Delhi", citySlug: "delhi" },
  { slug: "jamia-millia-islamia", name: "Jamia Millia Islamia", city: "Delhi", citySlug: "delhi" },
  { slug: "university-of-mumbai", name: "University of Mumbai", city: "Mumbai", citySlug: "mumbai" },
  { slug: "university-of-calcutta", name: "University of Calcutta", city: "Kolkata", citySlug: "kolkata" },
  { slug: "jadavpur-university", name: "Jadavpur University", city: "Kolkata", citySlug: "kolkata" },
  { slug: "anna-university", name: "Anna University", city: "Chennai", citySlug: "chennai" },
  { slug: "osmania-university", name: "Osmania University", city: "Hyderabad", citySlug: "hyderabad" },
  { slug: "savitribai-phule-pune-university", name: "Savitribai Phule Pune University", city: "Pune", citySlug: "pune" },
  { slug: "bits-pilani", name: "BITS Pilani", city: "Pilani" },
  { slug: "nit-trichy", name: "NIT Tiruchirappalli", city: "Tiruchirappalli" },
  { slug: "nit-warangal", name: "NIT Warangal", city: "Warangal" },
  { slug: "vit-vellore", name: "VIT Vellore", city: "Vellore" },
  { slug: "manipal-academy", name: "Manipal Academy of Higher Education", city: "Manipal" },
  { slug: "aiims-rishikesh", name: "AIIMS Rishikesh", city: "Rishikesh" },
  { slug: "cmc-vellore", name: "Christian Medical College, Vellore", city: "Vellore" },
  { slug: "panjab-university", name: "Panjab University", city: "Chandigarh" },
  { slug: "aligarh-muslim-university", name: "Aligarh Muslim University", city: "Aligarh" },
  { slug: "banaras-hindu-university", name: "Banaras Hindu University", city: "Varanasi" },
  { slug: "amity-university-noida", name: "Amity University", city: "Noida" },
  { slug: "symbiosis-pune", name: "Symbiosis International University", city: "Pune", citySlug: "pune" },
];

export function getUniversityBySlug(slug: string): UniversityData | undefined {
  return UNIVERSITIES.find((u) => u.slug === slug);
}
