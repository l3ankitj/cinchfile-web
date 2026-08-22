/**
 * Deliberately general "print method" comparisons rather than named
 * competitor businesses — we don't have verified, current pricing data for
 * specific third-party companies, and publishing comparative claims about a
 * real named competitor without that verification is a real legal and
 * reputational risk. This pattern still lets a student decide how Cinchfile
 * stacks up against their alternatives, without singling anyone out.
 */
export interface ComparisonData {
  slug: string;
  title: string;
  intro: string;
  body: string[];
  rows: { feature: string; cinchfile: string; alternative: string }[];
}

export const COMPARISONS: ComparisonData[] = [
  {
    slug: "local-xerox-shop",
    title: "Cinchfile vs. Your Local Xerox Shop",
    intro:
      "Local print shops are convenient for a single page, but per-page costs and inconsistent quality add up fast for thesis-length or bulk orders.",
    body: [
      "A local shop's price is negotiated per visit and varies by store, footfall, and how busy they are that day. Wholesale online printing works differently — the rate card is fixed and published, so a 100-page order costs the same per page as a 10-page order.",
      "Paper quality is also inconsistent at most local shops, since they often stock a single generic paper stock. Cinchfile offers four defined GSM weights so you can match the paper to the submission — economy for draft notes, premium for a final thesis copy.",
    ],
    rows: [
      { feature: "Pricing", cinchfile: "Fixed, published rate card", alternative: "Varies by shop and day" },
      { feature: "Paper options", cinchfile: "4 GSM weights", alternative: "Usually one generic stock" },
      { feature: "Ordering", cinchfile: "Upload from anywhere", alternative: "In-person visit required" },
      { feature: "Delivery", cinchfile: "Doorstep, pan-India", alternative: "Pickup only" },
    ],
  },
  {
    slug: "college-print-center",
    title: "Cinchfile vs. Campus Print Centers",
    intro:
      "Campus print centers are handy between classes, but queues, limited hours, and binding options are common pain points during deadline weeks.",
    body: [
      "Campus centers are built for walk-in convenience, not volume — which means during submission season, queues can stretch for hours right when you need a fast turnaround. Ordering online removes the queue entirely: upload once, and the print runs in the background while you keep working.",
      "Binding is often the bigger gap. Most campus centers offer basic spiral binding only, while thesis and dissertation submissions frequently require hard binding with a specific cover format that a walk-in counter can't always produce.",
    ],
    rows: [
      { feature: "Peak-season wait", cinchfile: "None — upload and go", alternative: "Long queues before deadlines" },
      { feature: "Binding options", cinchfile: "Staple to thesis hard binding", alternative: "Usually spiral only" },
      { feature: "Hours", cinchfile: "24/7 ordering", alternative: "Limited campus hours" },
    ],
  },
  {
    slug: "diy-home-printing",
    title: "Cinchfile vs. Printing at Home",
    intro:
      "A home inkjet printer works for a handful of pages, but ink cartridges and paper add up quickly for anything longer than a short assignment.",
    body: [
      "Inkjet cartridges are one of the most expensive consumables per page — often several times the cost of commercial laser printing once you account for cartridge replacement. For anything beyond a few dozen pages, wholesale laser printing is both cheaper and more consistent, with no smudging or banding.",
      "Binding is also effectively unavailable at home — spiral, soft, and hard binding all require equipment most students don't own, whereas it's a checkbox at checkout with Cinchfile.",
    ],
    rows: [
      { feature: "Cost per page (color)", cinchfile: "From ₹1", alternative: "Often ₹5+ in ink alone" },
      { feature: "Binding", cinchfile: "Built into checkout", alternative: "Not available" },
      { feature: "Consistency", cinchfile: "Laser printed, no smudging", alternative: "Varies with cartridge levels" },
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonData | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
