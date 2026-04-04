import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#333] font-sans p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mb-8 text-[#00a86b] font-bold text-xl">
          <ShieldCheck className="w-8 h-8" /> Cinchfile
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-[#1a1a1a]">Terms of Service</h1>
        <div className="prose text-[#666] leading-relaxed">
          <p className="mb-4">By using Cinchfile, you agree to not use the service for illegal file sharing or malicious activities.</p>
          <p>We provide the tool "as-is" to help you streamline your bookkeeping workflow.</p>
        </div>
      </div>
    </div>
  );
}