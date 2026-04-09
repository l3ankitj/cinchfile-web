-- Cinchfile schema, RLS, and storage notes.
-- Apply in Supabase SQL Editor or via CLI. Requires pgcrypto for gen_random_uuid().

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- upload_requests
-- ---------------------------------------------------------------------------
create table if not exists public.upload_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  client_name text not null,
  firm_name text not null,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  completed_at timestamptz,
  file_path text
);

create index if not exists upload_requests_user_id_idx on public.upload_requests (user_id);
create index if not exists upload_requests_created_at_idx on public.upload_requests (created_at desc);

alter table public.upload_requests enable row level security;

drop policy if exists "Users see own requests" on public.upload_requests;
create policy "Users see own requests"
  on public.upload_requests for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users insert own requests" on public.upload_requests;
create policy "Users insert own requests"
  on public.upload_requests for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users update own requests" on public.upload_requests;
create policy "Users update own requests"
  on public.upload_requests for update
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- upload_request_files (multi-file; paths are opaque to clients)
-- ---------------------------------------------------------------------------
create table if not exists public.upload_request_files (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.upload_requests (id) on delete cascade,
  storage_path text not null,
  original_name text not null,
  byte_size bigint not null check (byte_size >= 0),
  created_at timestamptz not null default now()
);

create index if not exists upload_request_files_request_id_idx on public.upload_request_files (request_id);

alter table public.upload_request_files enable row level security;

drop policy if exists "Users see files for own requests" on public.upload_request_files;
create policy "Users see files for own requests"
  on public.upload_request_files for select
  to authenticated
  using (
    exists (
      select 1 from public.upload_requests ur
      where ur.id = upload_request_files.request_id
        and ur.user_id = auth.uid()
    )
  );

-- Inserts from the app use the service role (portal upload API), not end-user JWT.

-- ---------------------------------------------------------------------------
-- audit_logs
-- ---------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  action text not null,
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_user_id_idx on public.audit_logs (user_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);

alter table public.audit_logs enable row level security;

drop policy if exists "Users see own audit logs" on public.audit_logs;
create policy "Users see own audit logs"
  on public.audit_logs for select
  to authenticated
  using (user_id is null or auth.uid() = user_id);

drop policy if exists "Users insert own audit logs" on public.audit_logs;
create policy "Users insert own audit logs"
  on public.audit_logs for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Storage bucket (create in Dashboard if missing): name = client-uploads, private.
-- Portal uploads use the service role from Next.js API routes only.
-- ---------------------------------------------------------------------------
