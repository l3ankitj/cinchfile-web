import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Cinchfile",
  description:
    "How Cinchfile handles data when you use the service with Supabase and Vercel.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
        <div className="text-slate-600 leading-relaxed space-y-4 text-sm md:text-base">
          <p>Last updated: April 2026</p>
          <p>
            Cinchfile helps you collect files from clients using upload links.
            The application runs on Vercel and stores data in your Supabase
            project. Traffic between browsers and the app uses HTTPS (TLS).
            Storage encryption and backups depend on your Supabase plan and
            configuration—review Supabase documentation for details.
          </p>
          <p>
            Access to uploaded files is limited to your signed-in firm account
            in the admin dashboard. Clients do not create accounts; they use a
            link you generate.
          </p>
          <p>
            This policy is not legal advice. Before handling regulated personal
            data at scale, consult qualified counsel and configure retention and
            agreements to match your practice.
          </p>
        </div>
      </div>
    </div>
  );
}
