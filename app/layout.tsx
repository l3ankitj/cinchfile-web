import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { CITIES } from "@/lib/data/cities";
import { STATES } from "@/lib/data/states";
import { SERVICES } from "@/lib/data/services";
import SiteHeader from "@/app/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinchfile | Online Printing for Students",
  description:
    "Upload your PDFs, choose paper and binding, and get doorstep delivery across India. Transparent per-page pricing, no shop visits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-background text-foreground flex flex-col font-sans`}
      >
        <SiteHeader />

        <main className="flex-grow pt-24">{children}</main>

        <footer className="border-t border-border bg-surface">
          <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div className="md:col-span-1 col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 relative">
                  <Image src="/logo.png" alt="" fill sizes="28px" className="object-contain" />
                </div>
                <span className="font-black text-lg text-foreground">Cinchfile</span>
              </Link>
              <p className="text-sm text-muted leading-relaxed max-w-xs">
                Premium document printing for students. Transparent pricing, fast
                delivery, straight to your door.
              </p>
            </div>

            <FooterColumn
              title="Services"
              links={[
                ...SERVICES.slice(0, 5).map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
                { href: "/notes", label: "Exam Notes Printing" },
                { href: "/pricing", label: "Pricing Rate Card" },
                { href: "/calculator", label: "Price Calculator" },
              ]}
            />

            <FooterColumn
              title="Cities & States"
              links={[
                ...CITIES.slice(0, 7).map((c) => ({ href: `/print/${c.slug}`, label: c.name })),
                ...STATES.slice(0, 3).map((s) => ({ href: `/print/state/${s.slug}`, label: s.name })),
                { href: "/print", label: "All Locations" },
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                { href: "/about", label: "About" },
                { href: "/why-cinchfile", label: "Why Cinchfile" },
                { href: "/reviews", label: "Quality & Trust" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact Support" },
                { href: "/compare", label: "Compare Options" },
                { href: "/student-success-stories", label: "What Students Print" },
                { href: "/delivery-times", label: "Delivery Times" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ]}
            />
          </div>

          <div className="border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
              <span>© 2026 Cinchfile. All rights reserved.</span>
              <Link href="/login" className="hover:text-foreground font-medium">
                Staff Sign In
              </Link>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-muted uppercase tracking-wide mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
