import Image from 'next/image';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Cinchfile | Secure, No-Login Document Collection",
  description: "Streamlined, bank-grade document collection for CPAs and accounting firms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[#fcfcfd] text-slate-900`}>
        
        {/* --- PROFESSIONAL HEADER START --- */}
        <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Cinchfile Logo" 
                width={45} 
                height={45} 
                className="object-contain"
                priority 
              />
              <span className="font-bold text-2xl tracking-tighter text-slate-900">
                Cinchfile
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8">
              <a href="https://app.cinchfile.com" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Log In
              </a>
              <a href="mailto:ankit@cinchfile.com" 
                 className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                Get Early Access
              </a>
            </nav>

          </div>
        </header>
        {/* --- PROFESSIONAL HEADER END --- */}

        {/* Main Page Content */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}