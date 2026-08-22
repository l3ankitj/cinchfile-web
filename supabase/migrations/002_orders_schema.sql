-- Print-order schema, RLS, and storage notes.
-- Apply in Supabase SQL Editor or via CLI. Requires pgcrypto for gen_random_uuid().

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- order_number sequence + generator
-- ---------------------------------------------------------------------------
create sequence if not exists public.order_number_seq;

create or replace function public.generate_order_number()
returns text
language sql
as $$
  select 'CF' || to_char(now(), 'YYMMDD') || '-' || lpad(nextval('public.order_number_seq')::text, 5, '0');
$$;

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default public.generate_order_number(),
  status text not null default 'draft'
    check (status in ('draft', 'pending_payment', 'processing', 'printed', 'shipped', 'delivered', 'cancelled')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'paid', 'failed', 'refunded')),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address_line1 text not null,
  shipping_address_line2 text,
  shipping_city text not null,
  shipping_state text not null,
  shipping_pincode text not null,
  subtotal_paise integer not null default 0,
  shipping_paise integer not null default 0,
  handling_paise integer not null default 500,
  total_paise integer not null default 0,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  tracking_number text,
  courier_name text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_phone_idx on public.orders (customer_phone);

alter table public.orders enable row level security;

drop policy if exists "Staff read all orders" on public.orders;
create policy "Staff read all orders"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "Staff update all orders" on public.orders;
create policy "Staff update all orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

-- No insert/select/update policy for `anon`. Draft creation, file-upload signing,
-- payment verification, and public order tracking all go through service-role
-- Route Handlers, which enforce authorization in application code
-- (order_number + customer_phone match) rather than via RLS.

-- ---------------------------------------------------------------------------
-- order_items (print spec per line item within an order)
-- ---------------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  label text,
  print_type text not null check (print_type in ('bw', 'color')),
  paper_gsm integer not null check (paper_gsm in (65, 75, 85, 100)),
  sides text not null check (sides in ('single', 'double')),
  binding text not null default 'none'
    check (binding in ('none', 'staple', 'spiral', 'soft', 'hard', 'thesis_hard')),
  copies integer not null default 1 check (copies > 0),
  page_count integer not null check (page_count > 0),
  page_count_source text not null default 'manual' check (page_count_source in ('manual', 'pdf_extracted')),
  item_subtotal_paise integer not null default 0,
  created_at timestamptz not null default now(),
  constraint order_items_no_color_65gsm check (not (print_type = 'color' and paper_gsm = 65))
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.order_items enable row level security;

drop policy if exists "Staff read all order items" on public.order_items;
create policy "Staff read all order items"
  on public.order_items for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- order_files
-- ---------------------------------------------------------------------------
create table if not exists public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  order_item_id uuid references public.order_items (id) on delete set null,
  storage_path text not null,
  original_name text not null,
  byte_size bigint not null check (byte_size >= 0),
  mime_type text,
  status text not null default 'pending' check (status in ('pending', 'uploaded', 'failed')),
  created_at timestamptz not null default now()
);

create index if not exists order_files_order_id_idx on public.order_files (order_id);

alter table public.order_files enable row level security;

drop policy if exists "Staff read all order files" on public.order_files;
create policy "Staff read all order files"
  on public.order_files for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- order_status_events (customer-visible timeline; separate from audit_logs,
-- which stays an internal-only staff audit trail)
-- ---------------------------------------------------------------------------
create table if not exists public.order_status_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  status text not null,
  note text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index if not exists order_status_events_order_id_idx on public.order_status_events (order_id);

alter table public.order_status_events enable row level security;

drop policy if exists "Staff read all status events" on public.order_status_events;
create policy "Staff read all status events"
  on public.order_status_events for select
  to authenticated
  using (true);

drop policy if exists "Staff insert status events" on public.order_status_events;
create policy "Staff insert status events"
  on public.order_status_events for insert
  to authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- updated_at trigger for orders
-- ---------------------------------------------------------------------------
create or replace function public.set_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row
  execute function public.set_orders_updated_at();

-- ---------------------------------------------------------------------------
-- Storage bucket (create in Dashboard if missing): name = order-files, private.
-- All access (signed upload URLs, staff downloads) uses the service role from
-- Next.js API routes / Server Actions only, same posture as client-uploads was.
-- ---------------------------------------------------------------------------
