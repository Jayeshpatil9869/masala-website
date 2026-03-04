# Gravitatee Admin Panel

A standalone Next.js admin panel for the **Gravitatee** spice brand e-commerce platform.

## Architecture

This is a **microservice** deployed separately from the public website (masala-website).
It connects to the same Supabase project for shared data.

```
masala-website/       ← Public website (deployed as main Vercel project)
  admin/              ← Admin panel (deployed as a SEPARATE Vercel project)
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage (`product-images` bucket)

## Pages

| Route                 | Description                                     |
| --------------------- | ----------------------------------------------- |
| `/login`              | Admin login (email + password)                  |
| `/dashboard`          | Stats overview + recent data                    |
| `/categories`         | CRUD for product categories                     |
| `/products`           | Product catalog management                      |
| `/products/new`       | Create new product with image upload + variants |
| `/products/[id]/edit` | Edit existing product                           |
| `/queries`            | View + manage contact form submissions          |

## Environment Variables

Copy `.env.local.example` and fill in your Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Run Locally

```bash
cd admin
npm install
npm run dev
# runs on http://localhost:3001
```

## Vercel Deployment

When deploying to Vercel:

1. Create a **new Vercel project**
2. Connect the same GitHub repo
3. Set **Root Directory** to `admin`
4. Add environment variables in Vercel settings
5. Deploy!

## First-Time Admin Setup

Go to your Supabase project → Authentication → Add a new user with email & password.
That user will be your admin.
