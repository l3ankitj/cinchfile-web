import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data/blog-posts";

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
  return { title: `${post.title} | Cinchfile`, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/blog" className="text-sm font-bold text-muted hover:text-foreground">
        ← Guides
      </Link>
      <p className="text-xs font-bold text-accent uppercase tracking-wide mt-4 mb-2">
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
