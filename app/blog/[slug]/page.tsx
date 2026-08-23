import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data/blog-posts";
import { buildBreadcrumbJsonLd, JsonLdScript } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Cinchfile`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Cinchfile" },
    publisher: { "@type": "Organization", name: "Cinchfile", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/blog" },
          { name: post.title },
        ])}
      />
      <Link href="/blog" className="text-sm font-bold text-muted hover:text-foreground">
        ← Guides
      </Link>
      <p className="text-xs font-bold text-accent-text uppercase tracking-wide mt-4 mb-2">
        {post.category}
      </p>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
        {post.title}
      </h1>
      <p className="text-sm text-muted mb-10">
        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="space-y-4">
        {post.body.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
