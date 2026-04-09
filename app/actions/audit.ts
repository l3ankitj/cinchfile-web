"use server";

import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit";

export async function logSignInEvent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) await logAudit(user.id, "sign_in", {});
}
