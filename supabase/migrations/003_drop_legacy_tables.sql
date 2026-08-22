-- Drops the CPA-era upload-request tables. Cinchfile has pivoted from a
-- document upload-request tool into a print-order platform (see
-- 002_orders_schema.sql); there is no production data to preserve.

drop table if exists public.upload_request_files;
drop table if exists public.upload_requests;

-- Note: the `client-uploads` storage bucket is not dropped automatically —
-- delete it manually in the Supabase Dashboard once you've confirmed no
-- files need to be retrieved from it. The new `order-files` bucket
-- (see 002_orders_schema.sql) replaces it.
