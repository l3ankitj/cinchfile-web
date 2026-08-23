import { SITE_URL } from "@/lib/siteConfig";

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbSegment {
  name: string;
  /** Path relative to the site root, e.g. "/print/pune". Omit on the final (current-page) segment. */
  path?: string;
}

export function buildBreadcrumbJsonLd(segments: BreadcrumbSegment[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: segment.name,
      ...(segment.path ? { item: `${SITE_URL}${segment.path}` } : {}),
    })),
  };
}

/** Renders a JSON-LD <script> tag. Data is always our own generated object, never user input. */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
