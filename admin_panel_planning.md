    # Admin Panel & Database Planning

    This document outlines the roadmap and architecture for building the Admin Panel and migrating the "MasalaBrand" platform from mock data (`lib/data.ts`) to a production-ready Supabase backend. Take this as the foundational context for generating code with ChatGPT.

    ## 1. Objectives

    - Replace static mock data with a real-time PostgreSQL database (Supabase).
    - Build a secure, internal-facing Admin Dashboard to manage inventory, catalog, and orders.
    - Establish a scalable categories taxonomy.

    ## 2. Tech Stack for Admin Panel

    - **Frontend**: Next.js (under a protected `/admin` route group).
    - **Authentication**: Supabase Auth (Email/Password strict access for administrators).
    - **Database**: Supabase PostgreSQL.
    - **UI/UX**: Shadcn UI (Data Tables, Forms, Modals, Toasts for notifications).

    ## 3. Categories Planning

    The categories need to be normalized. Currently, the mock data defines:

    - **Blended Masala** (`blended-masala`)
    - **Pure Spices** (`pure-spices`)
    - **Special Blends** (`special-blends`)
    - **Combo Packs** (`combo-packs`)

    ### Action Items for Categories:

    1. Create a `categories` table in Supabase.
    2. Build an Admin page `/admin/categories` to support CRUD (Create, Read, Update, Delete) operations.
    3. Allow assigning images and descriptions to categories dynamically.

    ## 4. Proposed Supabase Database Schema

    ### `categories`

    - `id` (uuid, primary key)
    - `name` (text, e.g., "Pure Spices")
    - `slug` (text, unique)
    - `image_url` (text)
    - `created_at` (timestamp)

    ### `products`

    - `id` (uuid, primary key)
    - `name` (text)
    - `slug` (text, unique)
    - `description` (text)
    - `long_description` (text, optional)
    - `category_id` (uuid, foreign key to `categories`)
    - `image_url` (text)
    - `images` (jsonb array)
    - `is_bestseller` (boolean, default false)
    - `rating` (numeric)
    - `review_count` (integer)
    - `specs` (jsonb - stores region, harvest_date, etc.)
    - `origin_story` (jsonb - stores text array and quote)
    - `sensory_profile` (jsonb - stores bitter, heat, floral, earthy values)
    - `created_at` (timestamp)

    ### `product_variants` (Handling Weights & Pricing)

    Since spices are sold in multiple weights (100g, 250g, 500g):

    - `id` (uuid, primary key)
    - `product_id` (uuid, foreign key to `products`)
    - `weight_label` (text, e.g., "100g")
    - `price` (numeric)
    - `inventory_stock` (integer)

    ### `orders`

    - `id` (uuid, primary key)
    - `customer_info` (jsonb)
    - `items` (jsonb)
    - `total_amount` (numeric)
    - `status` (text - pending, confirmed, shipped, delivered)
    - `payment_method` (text)
    - `created_at` (timestamp)

    ## 5. Admin Panel Routing Structure

    The admin interface will be situated under the `/app/admin/` directory.

    - `/admin/login` - Secure login page for authorized personnel.
    - `/admin/dashboard` - High-level metrics: Sales overview, low stock alerts, recent orders.
    - `/admin/products` - Data table of all products with filters. Includes a "Create Product" multi-step form.
    - `/admin/categories` - Form and table to manage product categories.
    - `/admin/orders` - Order management interface to update fulfillment statuses.

    ## 6. Migration Strategy

    1. **Phase 1: Database Provisioning**: Create the above tables in Supabase and configure Row Level Security (RLS) policies. Only authenticated admins should have WRITE access; public users get READ access to products and categories.
    2. **Phase 2: Seed Data**: Write a script to migrate items from `lib/data.ts` into the new Supabase tables.
    3. **Phase 3: Admin UI Construction**: Build the protected Next.js routes using Shadcn UI.
    4. **Phase 4: Frontend Integration**: Update `/app/products` and `ProductGrid` components to fetch from the Supabase client instead of `lib/data.ts`.
