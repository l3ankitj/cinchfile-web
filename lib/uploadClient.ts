"use client";

import { createBrowserSupabase } from "@/lib/supabase/browser";
import { STORAGE_BUCKET } from "@/lib/constants";

/**
 * Uploads a file directly to Supabase Storage using a signed-upload token
 * minted by our own API (see app/api/orders/[id]/files/sign). This bypasses
 * Vercel Functions entirely for the file bytes, so large files never touch a
 * serverless request-body limit. Uses the official Supabase SDK method
 * (`uploadToSignedUrl`) rather than a hand-rolled request, since Supabase's
 * signed-upload endpoint expects a specific multipart contract.
 */
export async function uploadToSignedUrl(
  file: File,
  path: string,
  token: string
): Promise<void> {
  const supabase = createBrowserSupabase();
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .uploadToSignedUrl(path, token, file);

  if (error) {
    throw new Error(error.message);
  }
}
