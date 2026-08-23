import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Staff Sign In | Cinchfile",
  description: "Sign in to the Cinchfile fulfillment dashboard.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="max-w-md mx-auto px-6 py-24 text-center text-muted">Loading…</div>}
    >
      <LoginForm />
    </Suspense>
  );
}
