import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
  title: "Cinchfile | Secure, No-Login Document Collection for CPAs",
  description: "Eliminate portal fatigue. Collect sensitive client documents via secure magic links. Bank-grade AES-256 encryption for US & UK accounting firms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[#f8fafc] text-slate-900 flex flex-col`}
      >
        {/* --- MODERN FLOATING HEADER --- */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
          <nav className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2rem] px-6 py-4 flex items-center justify-between">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 transition-transform group-hover:scale-110">
                <Image 
                  src="/logo.png" 
                  alt="Cinchfile Logo" 
                  fill
                  className="object-contain rounded-lg"
                  priority 
                />
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900">
                Cinchfile<span className="text-blue-600">.</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4 md:gap-8">
              <Link 
                href="/login" 
                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              
              <Link 
                href="mailto:ankit@cinchfile.com" 
                className="hidden sm:block px-6 py-2.5 bg-slate-900 text-white text-sm font-black rounded-2xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
              >
                Try Cinchfile
              </Link>
            </div>
          </nav>
        </header>

        {/* --- MAIN CONTENT WRAPPER --- */}
        <main className="flex-grow pt-24">
          {children}
        </main>

        {/* --- MINIMAL FOOTER --- */}
        <footer className="py-12 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative opacity-50">
                <Image src="/logo.png" alt="Cinchfile" fill className="object-contain grayscale" />
              </div>
              <span className="text-sm font-bold text-slate-400">© 2026 Cinchfile. All rights reserved.</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-600">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}