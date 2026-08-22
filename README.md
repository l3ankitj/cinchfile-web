# Cinchfile

Print-on-demand ordering platform for students: upload PDFs (or Word/PowerPoint/Excel/images), configure paper and binding, pay with **Razorpay**, and get **doorstep delivery** across India. Includes a live pricing calculator, order tracking, and a staff fulfillment dashboard.

## Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS v4**
- **Supabase** (Postgres + Auth + Storage)
- **Razorpay** (checkout + webhook payment verification)
- **Resend** (order confirmation / staff notification / contact-form email)
- **Vercel** (recommended hosting; `@vercel/analytics` included, plus a Cron job for draft-order cleanup)

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Supabase**

   - Create a project at [supabase.com](https://supabase.com).
   - In **SQL Editor**, run the migrations in order:
     1. [`supabase/migrations/001_cinchfile_schema.sql`](supabase/migrations/001_cinchfile_schema.sql) (legacy tables — only needed if you're migrating from an older checkout)
     2. [`supabase/migrations/002_orders_schema.sql`](supabase/migrations/002_orders_schema.sql) — **required**: creates `orders`, `order_items`, `order_files`, `order_status_events`, and their RLS policies.
     3. [`supabase/migrations/003_drop_legacy_tables.sql`](supabase/migrations/003_drop_legacy_tables.sql) — drops the old `upload_requests`/`upload_request_files` tables.
   - Create a **private** storage bucket named `order-files` (no public access). All uploads go through signed URLs minted server-side with the service role.
   - Under **Authentication → Users**, create a staff account (email + password) for the admin/fulfillment dashboard. Any authenticated user can see and manage all orders — this is a shared internal dashboard, not a multi-tenant one.

3. **Razorpay**

   - Create an account at [razorpay.com](https://razorpay.com) and grab your **test mode** API key/secret to start.
   - In the Razorpay Dashboard, register a webhook pointed at `https://<your-domain>/api/webhooks/razorpay` subscribed to `payment.captured` and `order.paid`, and copy the **webhook secret** (separate from your API key secret).

4. **Environment variables**

   Copy `.env.example` to `.env.local` and fill in:

   | Variable | Notes |
   |----------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (browser) |
   | `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — used by every order/payment/admin route |
   | `NEXT_PUBLIC_RAZORPAY_KEY_ID` / `RAZORPAY_KEY_ID` | Razorpay key id (same value, public + server copies) |
   | `RAZORPAY_KEY_SECRET` | **Server only** |
   | `RAZORPAY_WEBHOOK_SECRET` | **Server only** — from the Razorpay webhook setup above |
   | `CRON_SECRET` | Any random string — protects `/api/cron/cleanup-drafts` |
   | `RESEND_API_KEY` | Optional; omit locally to skip email |
   | `NOTIFICATION_TO` / `NOTIFICATION_FROM` | Staff inbox for new-order and contact-form notifications |

5. **Logo**

   `public/logo.png` holds the Cinchfile mark. Swap it for a different asset if needed (same path/name).

6. **Run**

   ```bash
   npm run dev
   ```

   - Marketing site & ordering flow: `/`, `/upload`
   - Staff login: `/login`
   - Admin / fulfillment dashboard: `/admin` (requires session)

## Deploying on Vercel

1. Push the repo to GitHub/GitLab/Bitbucket and **Import** the project in [Vercel](https://vercel.com).
2. Add the same env vars in **Project → Settings → Environment Variables**. **Do not** expose `SUPABASE_SERVICE_ROLE_KEY` or `RAZORPAY_KEY_SECRET`/`RAZORPAY_WEBHOOK_SECRET` to the client.
3. Deploy. `vercel.json` already declares the `cleanup-drafts` Cron job (runs every 6 hours) — no extra setup needed on Vercel's side.
4. Switch Razorpay from test mode to live keys once you're ready to accept real payments, and update the webhook URL/secret accordingly.

### Custom domain and DNS

1. Buy a domain from any registrar.
2. In Vercel: **Project → Settings → Domains → Add**. Vercel shows **DNS records** (usually `A` / `CNAME`).
3. At your registrar, create those records. SSL certificates are issued automatically once DNS propagates.

### Analytics

[@vercel/analytics](https://vercel.com/docs/analytics) is wired in [`app/layout.tsx`](app/layout.tsx) and active when deployed on Vercel.

## Architecture notes

- **File uploads bypass Vercel Functions.** Orders can total up to 2GB across 50 files, well past a serverless Function's request-body limit — uploads go directly from the browser to Supabase Storage via signed upload URLs (`app/api/orders/[id]/files/sign`).
- **Pricing has one source of truth.** [`lib/pricing.ts`](lib/pricing.ts) is a pure, dependency-free module used by both the `/calculator` preview and the real checkout flow. Checkout always recomputes the total server-side from persisted `order_items` — it never trusts a client-submitted amount.
- **Payment confirmation is dual-path.** The client-side Razorpay success callback verifies immediately for a fast redirect; the webhook (`app/api/webhooks/razorpay`) is the authoritative, idempotent source of truth in case the browser tab closes before the client call completes.
- **Programmatic SEO pages are data-driven, at scale.** City/state/service/comparison/university/blog/exam-notes content lives in `lib/data/*.ts` and renders through a small set of route templates (`app/print/[city]`, `app/print/[city]/[service]`, `app/services/[service]`, `app/notes/[slug]`, etc.) with `generateStaticParams`. Add an entry to the relevant data file to add a page — no new route code needed. The site currently builds ~3,600 static pages, including a city × service cross-product (382 cities × 8 services) at `/print/[city]/[service]`. A handful of flagship entries (the 7 original cities, 5 states, 2 universities) carry hand-written `intro`/`body` copy; everything else generates its prose from factual fields (name, state, ETA, universities, localities) via `lib/cityContent.ts` / `lib/stateContent.ts` / `lib/universityContent.ts` — deterministic per-slug phrase-bank templates, not per-page hand-written paragraphs, since hand-writing unique prose at this volume isn't practical.

## Security notes

- **Never** commit `.env.local` or any service-role/secret key.
- Rotate keys immediately if they leak.
- Public routes (order tracking, file-upload signing, contact form) use simple in-process rate limiting (`lib/rateLimit.ts`) — best-effort, not distributed. Consider Upstash Redis via the Vercel Marketplace if abuse becomes a real problem at scale.
- RLS on `orders`/`order_items`/`order_files`/`order_status_events` allows any **authenticated** user to read/update everything (shared staff dashboard model, not per-owner). Public/customer-facing access goes exclusively through service-role Route Handlers that enforce authorization in application code (e.g. order number + phone match).

## Scripts

```bash
npm run dev    # development
npm run build  # production build
npm run start  # run production build locally
npm run lint   # ESLint
```

## Legal

Privacy and terms pages are **starter copy**, not legal advice — especially the refund/cancellation and payment-data sections. Have them reviewed before broad launch.
