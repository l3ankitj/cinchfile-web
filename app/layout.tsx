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
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-white text-slate-900`}>
        {/* Header Section */}
        <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" // Ensure your logo is named logo.png inside the 'public' folder
                alt="Cinchfile" 
                width={32} 
                height={32} 
                priority 
              />
              <span className="font-bold text-xl tracking-tight">Cinchfile</span>
            </div>
            
            <nav>
               <a href="https://app.cinchfile.com" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Sign In
              </a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
