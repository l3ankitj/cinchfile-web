import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Cinchfile",
  description: "Terms for using the Cinchfile application.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-8 pb-24">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-blue-600 font-bold text-xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 rounded"
        >
          <ShieldCheck className="w-8 h-8" aria-hidden />
          Cinchfile
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-slate-900">Terms of Service</h1>
        <div className="text-slate-600 leading-relaxed space-y-4 text-sm md:text-base">
          <p>Last updated: April 2026</p>
          <p>
            By using Cinchfile you agree not to use the service for unlawful
            file sharing, malware distribution, or other abusive activity.
          </p>
          <p>
            The software is provided &quot;as is&quot; without warranties. You
            are responsible for your professional obligations, client
            agreements, and compliance with applicable laws.
          </p>
          <p>
            These terms are not a substitute for advice from a qualified
            attorney. Update them when you form a legal entity or change how
            you operate the product.
          </p>
        </div>
      </div>
    </div>
  );
}
