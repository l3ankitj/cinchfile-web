import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#333] font-sans p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mb-8 text-[#00a86b] font-bold text-xl">
          <ShieldCheck className="w-8 h-8" /> Cinchfile
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-[#1a1a1a]">Privacy Policy</h1>
        <div className="prose text-[#666] leading-relaxed">
          <p className="mb-4">Last Updated: April 2026</p>
          <p className="mb-4">Your data is yours. We use Supabase with AES-256 encryption to ensure that the documents you collect are only accessible by you and the person you authorize.</p>
          <p>We do not sell data. We do not track you. We just collect files, cinched.</p>
        </div>
      </div>
    </div>
  );
}