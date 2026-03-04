# MasalaBrand E-commerce Platform

## Project Overview

This is a modern, responsive Direct-to-Consumer (D2C) e-commerce website for "MasalaBrand", a premium spices company selling blended and pure authentic Indian spices. The platform allows users to browse products, view detailed spice profiles (sensory profiles, origin stories), add items to their cart, and currently supports WhatsApp-based or direct checkout systems.

This document serves as a comprehensive guide to the current project state, designed to help AI assistants (like ChatGPT) understand the architecture, tech stack, and future development plans.

## Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)
- **State Management**: Zustand (used for `cartStore`)
- **Animations**: Framer Motion & GSAP
- **Forms & Validation**: React Hook Form + Zod
- **Backend / Database**: Supabase (Client installed, transitioning from mock data)

## Folder Structure

- `/app`: Next.js App Router pages (`/`, `/about`, `/contact`, `/products`).
- `/components`: Modular React components grouped by logical features:
  - `/home`: Sections of the homepage (HeroBanner, TrustBadges, CategoryGrid, FeaturedProducts, etc.)
  - `/products`: Product listing and detail components.
  - `/cart`: Cart UI components.
  - `/ui`: Reusable Shadcn UI base components (buttons, inputs, dialogs, etc.)
- `/lib`: Helper functions and configuration.
  - `data.ts`: Currently holds **mock data** for products, categories, and testimonials.
  - `cartStore.ts`: Zustand store managing the shopping cart state.
  - `utils.ts`: Utility functions (e.g., Tailwind class merging).
  - `whatsapp.ts`: WhatsApp ordering integration utility.

## Key Features & Current State

1. **Dynamic Product Pages**: Includes detailed specs, origin stories, and sensory profiles for spices.
2. **Shopping Cart**: Client-side cart managed by Zustand.
3. **SEO Optimized**: Pre-configured `robots.txt`, `sitemap.xml`, and metadata.
4. **Mock Data Reliance**: The app currently relies heavily on `lib/data.ts`. The next major phase is migrating this to a real database (Supabase) and building an Admin Panel.

## Next Steps

The immediate next step is to design and implement a secure Admin Panel and migrate the mock categories/products to Supabase. Please refer to `admin_panel_planning.md` for the complete architecture and roadmap of the administrative features.
