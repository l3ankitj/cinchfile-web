"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { logSignOutEvent } from "@/app/actions/audit";
import { IDLE_TIMEOUT_MS, IDLE_WARNING_MS } from "@/lib/constants";

const ACTIVITY_EVENTS = ["mousemove", "keydown", "click", "scroll", "touchstart"];

export default function IdleGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const lastActivity = useRef(0);
  const [showWarning, setShowWarning] = useState(false);

  const bumpActivity = useCallback(() => {
    lastActivity.current = Date.now();
    setShowWarning(false);
  }, []);

  const handleForcedSignOut = useCallback(async () => {
    const supabase = createBrowserSupabase();
    await logSignOutEvent();
    await supabase.auth.signOut();
    router.push("/login");
  }, [router]);

  useEffect(() => {
    lastActivity.current = Date.now();
    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, bumpActivity));

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivity.current;
      if (elapsed >= IDLE_TIMEOUT_MS) {
        void handleForcedSignOut();
      } else if (elapsed >= IDLE_WARNING_MS) {
        setShowWarning(true);
      }
    }, 5000);

    return () => {
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, bumpActivity));
      clearInterval(interval);
    };
  }, [bumpActivity, handleForcedSignOut]);

  return (
    <>
      {children}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-sm w-full rounded-2xl bg-surface p-6 shadow-float">
            <h2 className="font-bold text-foreground mb-2">Still there?</h2>
            <p className="text-sm text-muted mb-5">
              You&apos;ll be signed out soon due to inactivity.
            </p>
            <button onClick={bumpActivity} className="btn-primary w-full">
              Stay Signed In
            </button>
          </div>
        </div>
      )}
    </>
  );
}
