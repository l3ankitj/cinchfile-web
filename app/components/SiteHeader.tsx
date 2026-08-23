"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/calculator", label: "Calculator" },
  { href: "/blog", label: "Guides" },
  { href: "/track", label: "Track Order" },
  { href: "/my-orders", label: "My Orders" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <nav
        className="bg-surface/70 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(18,22,42,0.06)] rounded-[2rem] px-6 py-4 flex items-center justify-between gap-4"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 transition-transform group-hover:scale-110">
            <Image src="/logo.png" alt="" fill sizes="36px" className="object-contain" priority />
          </div>
          <span className="font-black text-2xl tracking-tighter text-foreground hidden sm:inline">
            Cinchfile<span className="text-accent-text">.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-muted">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <Link
            href="/login"
            className="hidden sm:inline text-sm font-bold text-muted hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded"
          >
            Sign in
          </Link>

          <Link
            href="/upload"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-hover transition-colors shadow-md focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
            Print Now
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border text-foreground hover:bg-surface-muted transition-colors focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden mt-3 bg-surface border border-border shadow-float rounded-2xl px-4 py-3 flex flex-col"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 rounded-lg text-sm font-bold text-foreground hover:bg-surface-muted transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-3 rounded-lg text-sm font-bold text-muted hover:bg-surface-muted transition-colors"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
