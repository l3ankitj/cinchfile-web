import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Cinchfile | Secure document collection for CPAs",
  description:
    "Collect client files with passwordless upload links. TLS in transit; storage encryption depends on your cloud provider (e.g. Supabase). Built for solo CPAs and small firms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[#f8fafc] text-slate-900 flex flex-col font-sans`}
      >
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
          <nav
            className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2rem] px-6 py-4 flex items-center justify-between gap-4"
            aria-label="Primary"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 transition-transform group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900">
                Cinchfile<span className="text-blue-600">.</span>
              </span>
            </Link>

            <div className="flex items-center gap-4 md:gap-8 shrink-0">
              <Link
                href="/login"
                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 rounded"
              >
                Sign in
              </Link>

              <Link
                href="mailto:ankit@cinchfile.com?subject=Interested%20in%20Cinchfile%20Early%20Access"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-800"
              >
                Try Cinchfile
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow pt-24">{children}</main>

        <footer className="py-12 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative opacity-50">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  className="object-contain grayscale"
                />
              </div>
              <span className="text-sm font-bold text-slate-400">
                © 2026 Cinchfile. All rights reserved.
              </span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <Link
                href="/privacy"
                className="hover:text-slate-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-slate-400 rounded"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-slate-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-slate-400 rounded"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
