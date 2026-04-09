# Cinchfile

Next.js app for solo CPAs and small firms: create **upload requests**, share a **passwordless client link** (`/u/[id]`), receive **multi-file uploads**, and **download** from the admin dashboard only.

## Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- **Supabase** (Postgres + Auth + Storage)
- **Resend** (optional transactional email on upload complete)
- **Vercel** (recommended hosting; **@vercel/analytics** included)

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Supabase**

   - Create a project at [supabase.com](https://supabase.com).
   - In **SQL Editor**, run the migration in [`supabase/migrations/001_cinchfile_schema.sql`](supabase/migrations/001_cinchfile_schema.sql).
   - Create a **private** storage bucket named `client-uploads` (no public access). Uploads are performed with the service role from API routes only.
   - Under **Authentication → Users**, create your founder user (email + password), or use sign-up if you enable it in the Supabase dashboard.

3. **Environment variables**

   Copy `.env.example` to `.env.local` and fill in:

   | Variable | Notes |
   |----------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (browser) |
   | `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — portal upload API and signed URLs |
   | `RESEND_API_KEY` | Optional; omit locally to skip email |
   | `NOTIFICATION_TO` | Your inbox for “upload complete” mail |
   | `NOTIFICATION_FROM` | Verified sender in Resend (use `onboarding@resend.dev` for tests) |

4. **Logo**

   Replace [`public/logo.png`](public/logo.png) with your final asset (same path/name).

5. **Run**

   ```bash
   npm run dev
   ```

   - Marketing site: `/`
   - Firm login: `/login`
   - Admin: `/admin` (requires session)

## Deploying on Vercel

1. Push the repo to GitHub/GitLab/Bitbucket and **Import** the project in [Vercel](https://vercel.com).
2. Add the same env vars in **Project → Settings → Environment Variables** (use **Production** and **Preview** as needed). **Do not** expose `SUPABASE_SERVICE_ROLE_KEY` to the client.
3. Deploy. Default URL will be `https://<project>.vercel.app`.

### Custom domain and DNS

1. Buy a domain from any registrar (Namecheap, Google Domains, etc.).
2. In Vercel: **Project → Settings → Domains → Add**. Vercel shows **DNS records** (usually `A` / `CNAME`).
3. At your registrar, create those records. SSL certificates are issued automatically once DNS propagates (often minutes to a few hours).

### Analytics

[@vercel/analytics](https://vercel.com/docs/analytics) is wired in [`app/layout.tsx`](app/layout.tsx). It is active when deployed on Vercel. For a privacy-first alternative (e.g. Plausible), swap or add it per their docs.

## Security notes

- **Never** commit `.env.local` or the service role key.
- Rotate keys immediately if they leak.
- RLS policies in the migration scope firm data to `auth.uid()`. Portal traffic uses **server-side** routes with the **service role** after validation (no public password in the client bundle).

## Accessibility and browsers (release checklist)

- Keyboard: tab through header, login form, admin table actions, and client upload control.
- Focus: visible focus styles on interactive elements.
- Color: do not rely on color alone for errors (copy + `role="alert"` where used).
- Browsers: smoke-test current **Chrome, Edge, Firefox, Safari** (last two major versions).

## Scripts

```bash
npm run dev    # development
npm run build  # production build
npm run start  # run production build locally
npm run lint   # ESLint
```

## Legal

Privacy and terms pages are **starter copy**, not legal advice. Have them reviewed before broad launch or regulated data at scale.
