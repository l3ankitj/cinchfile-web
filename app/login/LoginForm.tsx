"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { logSignInEvent } from "@/app/actions/audit";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const errParam = searchParams.get("error");

  const [supabase, setSupabase] = useState<ReturnType<
    typeof createBrowserSupabase
  > | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    errParam === "auth" ? "Authentication failed. Try again." : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSupabase(createBrowserSupabase());
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const { error: signErr } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    await logSignInEvent();
    router.push(next);
    router.refresh();
  };

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Firm sign in</h1>
        <p className="text-slate-500 text-sm mb-8">
          Access your Cinchfile dashboard. Client upload links stay passwordless
          for your clients.
        </p>
        <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-blue-500/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-blue-500/30"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm">
          <Link
            href="/"
            className="text-blue-600 font-semibold hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 rounded"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
