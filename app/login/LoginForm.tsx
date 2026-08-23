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
      <div className="max-w-md mx-auto px-6 py-24 text-center text-muted">Loading…</div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="rounded-2xl border border-border bg-surface shadow-card p-8 md:p-10">
        <h1 className="text-2xl font-black text-foreground mb-2">Staff sign in</h1>
        <p className="text-muted text-sm mb-8">
          Access the Cinchfile fulfillment dashboard.
        </p>
        <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-foreground mb-1.5">
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
              className="input"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-foreground mb-1.5">
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
              className="input"
            />
          </div>
          {error && (
            <p className="text-sm text-danger font-medium" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm">
          <Link
            href="/"
            className="text-primary font-bold hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
