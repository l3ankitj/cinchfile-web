'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'; // Optional: npm install lucide-react

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const { error } = await supabase.from('waitlist').insert([{ email }]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. HERO SECTION */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-8 border border-emerald-100">
          <ShieldCheck size={16} />
          <span>April Beta Now Open</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Cinch<span className="text-emerald-500">file</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed mb-10">
          The "No-Login" document collector for modern bookkeepers. 
          Secure, private, and effortlessly simple for your clients.
        </p>

        {/* 2. WAITLIST FORM */}
        <div className="w-full max-w-md">
          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={24} />
              <span className="font-semibold">Success! We'll be in touch soon.</span>
            </div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your professional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? 'Processing...' : 'Join the Waitlist'}
                <ArrowRight size={18} />
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>
          )}
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="py-8 text-center text-sm text-slate-400 font-medium border-t border-slate-50">
        <div className="flex justify-center gap-6 mb-2">
          <a href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-emerald-500 transition-colors">Terms</a>
        </div>
        <p>&copy; 2026 Cinchfile. All rights reserved.</p>
      </footer>
    </div>
  );
}