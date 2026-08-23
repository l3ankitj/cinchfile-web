import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "Guides | Cinchfile",
  description: "Printing, binding, and paper guides for students.",
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">Guides</h1>
      <p className="text-lg text-muted mb-10">
        Practical guides on paper, binding, and getting your documents print-ready.
      </p>
      <div className="space-y-4">
        {BLOG_POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-xl border border-border bg-surface p-5 hover:border-primary transition-colors"
          >
            <p className="text-xs font-bold text-accent-text uppercase tracking-wide mb-1">
              {p.category}
            </p>
            <h2 className="font-bold text-foreground mb-1">{p.title}</h2>
            <p className="text-sm text-muted">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
