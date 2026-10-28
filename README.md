# Gravitate — Pure Spices, Honest Craft

**Gravitate** (Gurukrupa Gruh Udyog) is a family spice mill from Malegaon, Nashik — nearly forty-five years of grinding masala the way kitchens deserve: clean ingredients, careful process, no shortcuts.

This repository is the online home for that story: a storefront where people can browse the range, learn what goes into each tin, and order over WhatsApp — plus a small admin panel so the team can keep the catalog honest and up to date.

**Live site:** [gravitatee.com](https://gravitatee.com)

---

## Why safety sits at the centre

Spices end up in everyday meals. That is not a marketing line for us — it is why the product pages, About story, and compliance content keep returning to the same promises:

- **FSSAI-licensed manufacturing** — Licence No. **11521023000342**, documented on the site’s [FSSAI Compliance](/fssai-compliance) page  
- **No artificial colours, starch, bulkers, or preservatives** called out on product specs and brand USPs  
- **Lab-minded quality process** — screening for adulterants and pesticide concerns as part of how the mill talks about purity  
- **Clear policies** for privacy, shipping, and returns (including sealed-pack expectations aligned with food hygiene practice)

If you are reading this as a developer: the “safety” of this project is not only code. It is also how the brand explains what customers are putting on their plates — and the site is built to keep that story visible, not buried.

| Topic | Where to look |
| --- | --- |
| FSSAI licence & purity safeguards | `app/fssai-compliance/page.tsx` |
| Quality process | `components/about/QualityProcess.tsx` |
| Natural / zero-filler USPs | `components/about/USPCards.tsx` |
| Product purity copy | `components/product-detail/ProductSpecs.tsx` |
| Privacy (WhatsApp orders; no card vault on site) | `app/privacy-policy/page.tsx` |
| Returns & sealed packaging | `app/return-policy/page.tsx` |

---

## What’s in this monorepo

| App | Role | Default port |
| --- | --- | --- |
| **Storefront** (repo root) | Catalog, cart, WhatsApp order flow, customer login/signup | `3000` |
| **Admin** (`admin/`) | Categories, products, contact queries, customer login logs | `3001` |
| **Backend** (`backend/`) | Express API for categories/products/contact (Supabase-backed) | `3002` |

### Storefront highlights

- Browse categories and products with variants and pricing from Supabase  
- Cart in the browser (Zustand); checkout continues on **WhatsApp** — simple for customers, practical for a mill that confirms weight and delivery by chat  
- Customer accounts: email/password and Google sign-in (`/login`, `/signup`)  
- About, contact, and the legal/compliance pages listed above  
- SEO basics: metadata, sitemap, robots, structured data

### Admin highlights

- Secure staff login (Supabase Auth)  
- Manage categories and products (including images and variants)  
- Review contact form queries  
- View customer **login logs** (signup / login / logout activity)

---

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**  
- **Tailwind CSS** + Shadcn/Radix UI  
- **Supabase** — Postgres, Auth, Storage  
- **Zustand** for cart; **Framer Motion** for light motion  
- **Express** service under `backend/` for API access alongside Next route handlers

---

## Getting started

### Prerequisites

- Node.js 20+  
- Supabase project (URL + anon key; service role for admin only)  
- WhatsApp business number for order links  

### Install & run

```bash
# Storefront
npm install
npm run dev

# Admin (separate terminal)
npm run dev:admin

# Or both together
npm run dev:all

# Optional Express API
cd backend && npm install && npm run dev
```

### Environment variables (names only)

**Storefront:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_SITE_URL`  

**Admin:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`  

**Backend:** `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`, `FRONTEND_URL`, `ADMIN_URL`

Customer auth migration and Google OAuth setup: see [`docs/CUSTOMER_AUTH_SETUP.md`](docs/CUSTOMER_AUTH_SETUP.md).  
Admin-specific notes: see [`admin/README.md`](admin/README.md).

---

## Project layout

```
masala-website/
├── app/                 # Storefront pages + API routes
├── components/          # UI by feature (home, products, cart, about, auth…)
├── lib/                 # Supabase clients, WhatsApp helpers, cart store
├── admin/               # Admin Next.js app
├── backend/             # Express API
├── supabase/migrations/ # SQL (e.g. customer profiles & login logs)
├── docs/                # Setup guides
└── public/              # Static assets & brand logo
```

---

## A note on trust

We do not claim “guaranteed rankings,” miracle health outcomes, or payment processing we do not operate. Orders are confirmed on WhatsApp; the website’s job is to show the spices clearly, keep catalogue and compliance pages accurate, and give the team tools that respect customer data.

If you improve this codebase, keep that same bar: **useful to the kitchen, careful with claims, clear about how an order actually happens.**

---

## Contact

- **WhatsApp / phone:** +91 92715 80900 · +91 96575 86213  
- **Email:** gravitatespices01@gmail.com  
- **Mill:** Bhaygaon Shiwar, Malegaon, Dist. Nashik — 423203 (Maharashtra)

---

*Gurukrupa Gruh Udyog · FSSAI Lic. No. 11521023000342 · Made with care in India*
