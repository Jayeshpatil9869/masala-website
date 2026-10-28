# How this site was built

This repo is a small monorepo: a public storefront, a staff admin app, and an optional Express API — all talking to the same Supabase project.

---

## Stack

| Layer | Choice |
| --- | --- |
| Storefront & admin UI | **Next.js 16** (App Router), **React 19**, **TypeScript** |
| Styling | **Tailwind CSS** (v4 on storefront, v3 on admin), **Shadcn / Radix** |
| Database & auth | **Supabase** (Postgres, Auth, Storage) |
| SSR auth cookies | **`@supabase/ssr`** + Next middleware |
| Client cart | **Zustand** |
| Forms / validation | **React Hook Form** + **Zod** |
| Motion | **Framer Motion** |
| Carousel | **Embla** |
| Icons | **Lucide** / **react-icons** |
| API (optional) | **Express** under `backend/` |
| Dev | `concurrently` to run storefront + admin together |

---

## How we structured it

```
masala-website/          → Next.js storefront (port 3000)
├── app/                 → routes, layouts, route handlers
├── components/          → UI by feature
├── lib/                 → Supabase clients, cart, helpers
├── admin/               → separate Next.js app (port 3001)
├── backend/             → Express API (port 3002)
└── supabase/migrations/ → SQL for auth profiles & logs
```

**Storefront** reads catalog data from Supabase (and/or the Express API), keeps the cart in the browser, and opens a WhatsApp deep link for order confirmation.

**Admin** is its own Next app with service-role access for catalog CRUD, contact queries, and login-activity reads.

**Auth** uses Supabase email/password + Google OAuth; profiles and login events live in Postgres with RLS (see `docs/CUSTOMER_AUTH_SETUP.md`).

---

## How we built it (flow)

1. **Scaffold** Next App Router apps for web + admin; share the same Supabase project keys.  
2. **Schema** — categories, products, variants, contact queries; later customer `profiles` + `login_logs` via SQL migrations.  
3. **Storefront UI** — pages under `app/`, feature folders under `components/`, tokens in `globals.css`.  
4. **Cart** — Zustand store → WhatsApp message builder (no in-site payment gateway).  
5. **Auth** — browser + server Supabase clients (`lib/supabase/`), middleware session refresh, `/login` `/signup` `/auth/callback`.  
6. **Admin** — staff session, product/category managers, login-logs view over service role.  
7. **Optional API** — Express in `backend/` for the same Supabase data if you prefer a separate HTTP layer.

---

## Run locally

```bash
npm install
npm run dev          # storefront → http://localhost:3000
npm run dev:admin    # admin → http://localhost:3001
npm run dev:all      # both

cd backend && npm install && npm run dev   # API → :3002
```

**Env (names only):**  
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_SITE_URL`  
Admin also needs `SUPABASE_SERVICE_ROLE_KEY`. Backend uses `SUPABASE_URL` / `SUPABASE_ANON_KEY` (+ CORS origins).

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Storefront only |
| `npm run dev:admin` | Admin only |
| `npm run dev:all` | Storefront + admin |
| `npm run build` / `start` | Production storefront |

Built as a practical TypeScript commerce shell: Next for UI, Supabase for data/auth, Zustand for cart, WhatsApp for checkout handoff.
