import { createServiceClient } from "@/lib/supabase/service";

export async function logAudit(
  userId: string | null,
  action: string,
  meta: Record<string, unknown> = {}
) {
  const svc = createServiceClient();
  await svc.from("audit_logs").insert({
    user_id: userId,
    action,
    meta,
  });
}
