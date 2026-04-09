"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { logAudit } from "@/lib/audit";
import { LINK_EXPIRY_DAYS, STORAGE_BUCKET } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export type UploadRequestRow = {
  id: string;
  client_name: string;
  firm_name: string;
  status: string;
  created_at: string;
  expires_at: string;
  completed_at: string | null;
  upload_request_files: {
    id: string;
    storage_path: string;
    original_name: string;
    byte_size: number;
    created_at: string;
  }[];
};

export async function createUploadRequest(clientName: string, firmName: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const expires = new Date();
  expires.setDate(expires.getDate() + LINK_EXPIRY_DAYS);

  const { data, error } = await supabase
    .from("upload_requests")
    .insert({
      user_id: user.id,
      client_name: clientName.trim(),
      firm_name: firmName.trim(),
      expires_at: expires.toISOString(),
    })
    .select("id")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Insert failed");

  await logAudit(user.id, "upload_request_created", { request_id: data.id });

  revalidatePath("/admin");
  return data.id as string;
}

export async function listUploadRequests(): Promise<UploadRequestRow[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("upload_requests")
    .select(
      `
      id,
      client_name,
      firm_name,
      status,
      created_at,
      expires_at,
      completed_at,
      upload_request_files (
        id,
        storage_path,
        original_name,
        byte_size,
        created_at
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as UploadRequestRow[];
  return rows.map((row) => ({
    ...row,
    upload_request_files: row.upload_request_files ?? [],
  }));
}

export async function getSignedFileUrl(fileId: string): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: fileRow, error: fileErr } = await supabase
    .from("upload_request_files")
    .select("id, storage_path, request_id")
    .eq("id", fileId)
    .maybeSingle();

  if (fileErr || !fileRow) throw new Error("File not found");

  const { data: reqRow, error: reqErr } = await supabase
    .from("upload_requests")
    .select("user_id")
    .eq("id", fileRow.request_id)
    .maybeSingle();

  if (reqErr || !reqRow || reqRow.user_id !== user.id) {
    throw new Error("Forbidden");
  }

  const svc = createServiceClient();
  const { data: signed, error: signErr } = await svc.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(fileRow.storage_path, 120);

  if (signErr || !signed?.signedUrl) throw new Error("Could not create link");

  await logAudit(user.id, "file_download", { file_id: fileId });

  return signed.signedUrl;
}

export async function exportRequestsCsv(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const rows = await listUploadRequests();

  await logAudit(user.id, "csv_export", { row_count: rows.length });

  const headers = [
    "id",
    "client_name",
    "firm_name",
    "status",
    "created_at",
    "expires_at",
    "completed_at",
    "file_count",
  ];
  const lines = [headers.join(",")];
  for (const r of rows) {
    const fileCount = r.upload_request_files?.length ?? 0;
    lines.push(
      [
        r.id,
        csvEscape(r.client_name),
        csvEscape(r.firm_name),
        r.status,
        r.created_at,
        r.expires_at,
        r.completed_at ?? "",
        String(fileCount),
      ].join(",")
    );
  }
  return lines.join("\n");
}

function csvEscape(s: string): string {
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function logClientSignOut() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) await logAudit(user.id, "sign_out", {});
}
