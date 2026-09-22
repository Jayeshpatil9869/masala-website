# 🌶 MASALA BRAND — Website Design \& Development Blueprint

> \\\*\\\*A Comprehensive Guide for Designers \\\& Developers\\\*\\\*
> 4 Pages • Next.js + Node.js + Supabase • WhatsApp Ordering • Premium UI

\---

## 📋 TABLE OF CONTENTS

1. [Competitor Website Analysis](#1-competitor-website-analysis)
2. [Design Strategy \& Brand Identity](#2-design-strategy--brand-identity)
3. [Color Palette \& Typography](#3-color-palette--typography)
4. [Page-by-Page Blueprint](#4-page-by-page-blueprint)

   * 4.1 [HOME Page](#41-home-page)
   * 4.2 [PRODUCTS Page](#42-products-page)
   * 4.3 [ABOUT Page](#43-about-page)
   * 4.4 [CONTACT US Page](#44-contact-us-page)
5. [WhatsApp Integration Strategy](#5-whatsapp-integration-strategy)
6. [Tech Stack \& Component Library](#6-tech-stack--component-library)
7. [Navigation \& UX Best Practices](#7-navigation--ux-best-practices)
8. [Developer Checklist](#8-developer-checklist)

\---

## 1\. COMPETITOR WEBSITE ANALYSIS

An in-depth review of seven leading Indian masala brand websites reveals common patterns, standout features, and key opportunities for differentiation. Each site was analyzed for design, layout, product presentation, UX, and ordering flows.

\---

### 1.1 Zoff Foods (`zofffoods.com`) — Modern D2C Leader

|Strengths|Weaknesses|
|-|-|
|Clean, Shopify-powered D2C layout with bright category tiles|Slightly cluttered navigation with too many sub-categories|
|Sticky trust-badge bar (100% Satisfaction, Free Shipping)|No WhatsApp quick-order option for regional customers|
|Excellent product category grid with visual icons per category|Homepage feels product-heavy; lacks brand storytelling|
|Membership discount program ('ZING' — 40% off) drives loyalty|—|
|International order support and multi-social media integration|—|

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* Adopt the trust-badge strip and category grid from Zoff, but add a strong brand story section that Zoff lacks.

\---

### 1.2 Suhana Masale (`suhana.com`) — Category Depth Champion

Suhana has an extensive multi-level navigation structure with sub-categories like *Maharashtrian Masala Range*, *No Onion No Garlic*, and *Mughlai Special Blends*. Their mega-menu approach works well for a large catalog. The red-and-white color scheme reinforces trust and tradition. Key strength: regional product categorization tailored to specific cuisine identities.

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* For regional masala brands, label products with regional context (Kolhapuri, Malvani, etc.) to drive emotional connection.

\---

### 1.3 Baba Jadhav (`babajadhav.com`) — Heritage Positioning Done Right

Baba Jadhav uses **"8-Decade Masala Legacy"** as its core tagline — a powerful storytelling hook. Product categories are organized around regional Maharashtrian masala types (Kolhapuri, Khandeshi, Malvani, Saoji, Solapuri, Mumbai, Marathwada). Large hero banners with product imagery, a sticky discount alert bar, and star-product highlights all work effectively.

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* Heritage and legacy messaging outperforms generic "quality" claims. Lead with your story years, founder, or tradition.

\---

### 1.4 Everest Spices — National Premium Brand Benchmark

As one of India's largest spice brands, Everest uses a clean, white-dominant layout with bold red accents. Strong product imagery with individual spice characteristics is highlighted. Recipe integration is a major engagement driver. Their use of quality certification badges (FSSAI, ISO) builds institutional trust. Animations and scroll-triggered effects give the site a premium feel.

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* Use quality certifications, recipe inspiration sections, and FSSAI badge prominently to build credibility.

\---

### 1.5 Badshah Masala — Bold \& Colorful Visual Identity

Badshah uses vibrant, high-saturation colors — deep reds, ambers, and golds — in a layout that feels festive and authentic. Product photography is shot against textured backgrounds, evoking kitchen authenticity. The brand mascot *Badshah* (king) is used consistently. Navigation is minimal — a deliberate choice to keep focus on products.

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* A strong brand persona and textured/authentic photography style creates a "desi premium" feel that resonates emotionally.

\---

### 1.6 Vasant Masala (`vasantmasala.com`) — Clean \& Functional

Vasant's site prioritizes clarity over flair. Product listings are well-organized, prices visible, and filtering works well. However, the design lacks emotional depth. The footer is information-rich with dealer locators and helpline numbers — a useful feature for B2B and distributor audiences.

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* Add a dealer/distributor enquiry section to serve both B2C and B2B customers. Clean product pages convert better.

\---

### 1.7 Mangal Masala (`mangalmasala.com`) — Regional Appeal

Mangal Masala uses a traditional layout with warm oranges and spice imagery. Minimal in animations but strong in product variety messaging. The *About Us* section effectively uses founder photographs and a factory/quality story. Contact form with WhatsApp redirect is a notable feature.

> 💡 \\\*\\\*Key Takeaway:\\\*\\\* Founder photos and factory/process imagery in the About section significantly boost brand authenticity and trust.

\---

### 1.8 Cross-Site Feature Comparison Matrix

|Feature|Zoff|Baba Jadhav|Suhana|✅ Recommended|
|-|-|-|-|-|
|Hero Video / Animation|❌|❌|✅|✅ Yes|
|WhatsApp Order Button|❌|❌|❌|✅ Yes|
|Category Grid (Visual)|✅|✅|✅|✅ Yes|
|Trust Badge Strip|✅|Partial|❌|✅ Yes|
|Founder Story Section|❌|✅|❌|✅ Yes|
|FSSAI / Quality Badges|❌|Partial|✅|✅ Yes|
|Sticky Header + CTA|Partial|✅|✅|✅ Yes|
|Recipe / Usage Tips|❌|❌|❌|✅ Yes|
|Mobile First Design|✅|✅|✅|✅ Yes|

\---

## 2\. DESIGN STRATEGY \& BRAND IDENTITY

### 2.1 Overall Design Philosophy

The website must communicate three core brand values simultaneously:

* **Authenticity** — rooted in Indian culinary tradition
* **Quality** — pure, fresh, premium ingredients
* **Modernity** — contemporary presentation worthy of gifting and pride

The design style should be **"Desi Premium"** — a blend of ethnic warmth with clean, contemporary UI principles.

\---

### 2.2 Design Style Direction

|Style Element|Recommendation|
|-|-|
|Visual Theme|Warm, earthy tones elevated by modern layout — think "spice market meets luxury packaging"|
|Mood|Vibrant, aromatic, family-oriented, authentic. Evoke the smell of freshly ground masala.|
|Layout Grid|12-column responsive grid. Full-bleed hero sections, constrained content (max 1280px)|
|Photography Style|Flat-lay product shots, rustic wooden/stone backgrounds, spice ingredients scattered around packs|
|Motion \& Animation|Subtle scroll-triggered fade-ins, smooth hover effects on product cards, floating WhatsApp button pulse|
|Iconography|Custom icons: mortar \& pestle, spice leaves, flame, pot. Outlined style with warm orange fill|
|Border / Divider Style|Gold/saffron thin lines as section dividers; avoid heavy hard lines|

\---

## 3\. COLOR PALETTE \& TYPOGRAPHY

### 3.1 Primary Brand Color Palette

> The palette is built on the visual language of Indian spices — saffron, turmeric, chili, and coriander — elevated to a premium, modern context.

|Swatch|Color Name|Hex Code|Usage|
|-|-|-|-|
|🔴|Chili Red|`#C0392B`|Primary brand color — CTAs, logo, nav highlights, headings|
|🟠|Saffron Orange|`#E67E22`|Secondary accent — button hover, section dividers, icons|
|🟡|Turmeric Gold|`#F39C12`|Tertiary accent — badges, stars, highlights, decorative lines|
|🟫|Masala Brown|`#7D4B12`|Subheadings, body text accents, sidebar labels|
|🟨|Spice Cream|`#FDF3E7`|Section backgrounds — warm alternative to white|
|⬛|Dark Masala|`#1A0A00`|Dark backgrounds, footer, hero overlay|
|⬜|Off White|`#FAFAF7`|Main page background — warmer than pure white|
|🟢|Deep Green|`#1B5E20`|Accents for "organic", "fresh", "pure" labels|

\---

### 3.2 Typography System

|Role|Font Family|Weight / Size|Usage|
|-|-|-|-|
|Display / Hero|Playfair Display|Bold 700 / 56–72px|Hero headlines, brand name|
|Section Headings|Poppins|SemiBold 600 / 32–40px|H1, H2 section titles|
|Sub-Headings|Poppins|Medium 500 / 20–24px|Card titles, product names|
|Body Text|Inter|Regular 400 / 16px|Paragraphs, descriptions|
|Labels \& Tags|Inter|Medium 500 / 12–14px|Badges, tags, captions|
|CTA Buttons|Poppins|Bold 700 / 14–16px|WhatsApp CTA, Buy Now|
|Hindi / Marathi Text|Noto Sans Devanagari|Regular / Bold|Regional language taglines|

\---

## 4\. PAGE-BY-PAGE BLUEPRINT

\---

## 4.1 HOME PAGE

> The Home page is the brand's first impression. It must: \\\*\\\*captivate emotionally → establish trust → showcase products → drive action.\\\*\\\*

\---

### 🔹 Section 1: Navigation Bar (Sticky)

|Element|Details|
|-|-|
|Left Zone|Logo + Brand Name (SVG logo with tagline below)|
|Center Zone|Nav links: Home \| Products \| About \| Contact Us|
|Right Zone|Search icon + **WhatsApp Order** button (green pill button)|
|Scroll Behavior|Transparent on page top → white/dark solid with backdrop-blur on scroll|

\---

### 🔹 Section 2: Hero Banner (Full Viewport Height)

* Full-width background image **or** looping video of masala being ground / spices pouring
* Dark overlay gradient `rgba(26, 10, 0, 0.6)` for text readability
* **Headline:** Large serif font (Playfair Display) — e.g., *"Pure Masala, True Flavor"*
* **Subheading:** *"Crafted from handpicked spices, ground fresh for your kitchen"*
* Two CTA buttons: `\\\[Order on WhatsApp 🟢]` and `\\\[Explore Products →]`
* Scroll indicator arrow at bottom of hero
* Floating spice particle animations (subtle CSS keyframe: coriander, chili SVGs)

\---

### 🔹 Section 3: Trust Badge Strip

* Horizontal marquee-style scrolling bar (or 4-column grid on desktop)
* Badges: `🌿 100% Natural` | `🏭 FSSAI Certified` | `🚚 Free Delivery on ₹499+` | `⭐ 10,000+ Happy Customers`
* Background: Dark masala (`#1A0A00`) with saffron-colored text — maximum contrast
* Subtle `border-bottom` in turmeric gold

\---

### 🔹 Section 4: Product Category Grid

* Heading: **"Explore Our Masala Range"** with a chili decorative divider
* 6–8 category cards in responsive CSS grid (3 cols desktop / 2 cols tablet / 1 col mobile)
* Each card: Category image + category name + "Shop Now" link
* Example categories: Blended Masala | Pure Spices | Special Blends | Combo Packs
* **Hover effect:** Scale-up image + reveal "Explore" button with slide-up animation

\---

### 🔹 Section 5: Best Sellers / Featured Products

* Horizontal scroll on mobile, 4-column grid on desktop
* Each product card: Product image, name, weight options, price, WhatsApp CTA
* **"Best Seller"** badge on top 3 products (red diagonal ribbon)
* Add to Enquiry cart with WhatsApp checkout flow

\---

### 🔹 Section 6: Brand Story / USP Section

* **Split layout:** Left = full-height image (factory, founder, or spice fields) | Right = text
* Headline: *"Our Story"* or *"XX Years of Pure Masala Tradition"*
* Content: 3–4 lines about brand heritage, sourcing philosophy, quality commitment
* 3 icon-stat cards below: **Years in Business** | **Tonnes Sold** | **Products Available**

\---

### 🔹 Section 7: How to Order (WhatsApp Flow)

* **3-step visual:** Step 1 — Browse Products → Step 2 — Click WhatsApp CTA → Step 3 — Receive at your door
* Each step has a numbered circle, icon, and short description
* Background: Warm spice cream (`#FDF3E7`)
* End with a large **"Order Now on WhatsApp"** button (green gradient)

\---

### 🔹 Section 8: Testimonials / Customer Reviews

* Auto-rotating carousel with 3 testimonials visible at once (desktop)
* Each card: Customer name, city, star rating, quote (2–3 sentences), product purchased
* Background: Subtle texture (jute/burlap pattern at 5% opacity)

\---

### 🔹 Section 9: Footer

* 4-column layout: Brand info + logo | Quick links | Contact info | Social media
* WhatsApp number prominently displayed in footer contact section
* Copyright line + FSSAI number + *"Made with ❤️ in India"*

\---

## 4.2 PRODUCTS PAGE

> The Products page is the core conversion page. It should feel like a well-organized spice market — easy to browse, visually rich, and with clear ordering pathways.

\---

### 🔹 Section 1: Page Hero (Short — \~300px height)

* Background: Spice photography with red overlay gradient
* Breadcrumb: `Home > Products`
* Page title: **"Our Masala Collection"** in Playfair Display, white
* Short tagline: *"Pure, Fresh \& Authentic — Straight from the Source"*

\---

### 🔹 Section 2: Category Filter Navigation

* Horizontal pill buttons / tab row: `All` | `Blended Masala` | `Pure Spices` | `Special Blends` | `Combo Packs`
* Active state: Filled red pill with white text
* Mobile: Horizontally scrollable pill row (no wrapping)
* Filter persists in URL `?category=blended-masala` for shareability

\---

### 🔹 Section 3: Search Bar

* Full-width search bar: *"Search for masala..."* with search icon
* Real-time filtering as user types (client-side filter on product name/tags)

\---

### 🔹 Section 4: Product Grid

* 3 columns desktop / 2 columns tablet / 1 column mobile
* **Each product card contains:**

  * Product image (square ratio, white/spice background)
  * Product name (bold, 16px, Poppins)
  * Short description (2 lines max)
  * Weight/size options (pill selectors: `100g` | `200g` | `500g` | `1kg`)
  * Price (`₹XX`)
  * **"Order on WhatsApp"** button (green, WhatsApp icon)
  * "Add to Enquiry" secondary link
* **Hover effect:** Card lifts with subtle shadow; image zoom 1.05x

\---

### 🔹 Section 5: Product Detail Modal / Page

* Clicking product opens a modal or dedicated product detail page
* **Detail view:** Large image gallery | Full description | Ingredients list | Usage tips
* Size selector + WhatsApp deeplink (pre-filled message with product name, size, price)

**WhatsApp message template:**

```
Hi! I'd like to order \\\*Garam Masala 200g\\\* from \\\[Brand Name].
Please share payment details and confirm availability.
```

\---

### 🔹 Section 6: Combo Packs Section

* Special horizontal section below main grid: **"Value Combo Deals"**
* 3 combo cards with total saving callout: *"Save ₹50"*
* Larger format cards with product stack imagery

\---

## 4.3 ABOUT PAGE

> The About page builds deep trust and emotional connection. It is where potential wholesale buyers, first-time customers, and premium shoppers verify whether this brand is worth investing in.

\---

### 🔹 Section 1: Brand Heritage Hero

* Full-width image: Founder photograph or old-era kitchen photo
* Overlay headline: **"Since \[Year] — Crafting Pure Masala for India's Kitchens"**
* Warm dark overlay for vintage, nostalgic feel

\---

### 🔹 Section 2: Our Story (Long Form)

* **Left column:** Photo gallery (factory, spice processing, founder)
* **Right column:** Brand story in 3–4 paragraphs — founding, values, growth, mission
* **Timeline component:** Key milestones — Year founded | First product | Expansion | Awards

\---

### 🔹 Section 3: Why Choose Us — USP Cards

* 4–6 cards in grid, each with icon + headline + 2 lines description
* Examples:

  * `🌿` 100% Natural Ingredients
  * `🪨` Stone-Ground Freshness
  * `🚫` No Artificial Colors
  * `📜` Traditional Recipes
  * `✅` FSSAI Certified
  * `👨‍👩‍👧` Family-Owned Since \[Year]

\---

### 🔹 Section 4: Quality Process

Horizontal step flow:

```
Sourcing → Cleaning → Stone Grinding → Quality Check → Packaging → Delivery
```

Each step has an icon, number, and brief description. This answers the buyer's core question: *"Is this actually pure?"*

\---

### 🔹 Section 5: Certifications \& Awards

* Logo grid of certifications: FSSAI | ISO | Organic | Local Awards
* Award cards with year and issuing authority

\---

### 🔹 Section 6: Meet the Team

* Founder card with photo, name, and brief bio
* *"From our kitchen to yours"* — personal connection messaging

\---

## 4.4 CONTACT US PAGE

> The Contact page must make it effortless to reach the brand — whether to order, inquire about wholesale, or ask a question. WhatsApp is the \\\*\\\*primary contact channel.\\\*\\\*

\---

### 🔹 Section 1: Contact Hero

* Short hero with heading: **"Get in Touch"**
* Subline: *"We're just a WhatsApp message away"*
* Warm red-to-orange gradient background with spice motif

\---

### 🔹 Section 2: Primary Contact Cards (3-Column Grid)

|Card|Icon|Action|
|-|-|-|
|WhatsApp|🟢 Large WhatsApp icon|**"Chat Now"** → direct `wa.me` link|
|Phone|📞 Call icon|**"Call Now"** → `tel:` link|
|Email|📧 Email icon|**"Send Email"** → `mailto:` link|

\---

### 🔹 Section 3: Contact Form

* **Fields:** Name | Phone Number | Email | Subject (dropdown) | Message
* **Subject options:** Order Enquiry / Wholesale / Feedback / Other
* **On submit:** Trigger WhatsApp redirect OR email via Nodemailer
* Form validation with real-time inline error messages
* Success state: Friendly confirmation message with brand illustration

\---

### 🔹 Section 4: Store / Office Location

* Embedded Google Maps iframe (or Leaflet.js for custom styling)
* Location address card beside the map
* Business hours table: Mon–Sat | \[Time] | Sunday: Closed

\---

### 🔹 Section 5: Wholesale / Distributor Enquiry

* Separate CTA block: *"Interested in distributing our products?"*
* **"Enquire for Wholesale"** button → opens dedicated form or WhatsApp with pre-filled wholesale message

\---

## 5\. WHATSAPP INTEGRATION STRATEGY

### 5.1 WhatsApp Ordering Architecture

Since the client does not want a shopping cart or payment gateway, all orders flow through WhatsApp. The integration must be seamless, pre-filling messages so the customer doesn't have to type manually.

\---

### 5.2 Integration Points

#### A. Floating WhatsApp Button (All Pages)

A fixed-position button at the bottom-right corner of all pages. It pulses gently to draw attention. Clicking opens WhatsApp with a generic greeting message. Implemented in the root `layout.tsx` so it appears on every page.

#### B. Product-Specific WhatsApp CTA

Each product card has an **"Order on WhatsApp"** button using the `wa.me` URL format:

```
https://wa.me/91XXXXXXXXXX?text=Hi%2C+I+would+like+to+order+\\\*Garam+Masala+200g\\\*+from+\\\[Brand+Name].+Please+confirm+availability+and+price.
```

#### C. Dynamic Message Builder (Utility Function)

```typescript
// lib/whatsapp.ts
export function buildWhatsAppLink(
  phone: string,
  productName: string,
  weight: string,
  brandName: string
): string {
  const message = `Hi! I'd like to order \\\*${productName} ${weight}\\\* from ${brandName}. Please confirm availability and price.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

\---

### 5.3 WhatsApp Message Templates by Context

|Context|Pre-filled Message|
|-|-|
|Product Card Order|Hi! I want to order \[Product Name] \[Weight] from \[Brand]. Please confirm availability.|
|Combo Pack Order|Hi! I am interested in the \[Combo Name] pack. Please share details and confirm delivery.|
|Wholesale Enquiry|Hi! I am a retailer/distributor interested in bulk purchase. Please share wholesale pricing.|
|General Contact|Hi \[Brand Name]! I have a query about your masala products. Can you help me?|
|Floating Button|Hi! I visited your website and would like to know more about your masala products.|

\---

## 6\. TECH STACK \& COMPONENT LIBRARY

### 6.1 Full Recommended Technology Stack

|Layer|Technology|Purpose|
|-|-|-|
|Frontend Framework|**Next.js 14** (App Router)|SSR/SSG, SEO, image optimization, routing|
|UI Component Library|**shadcn/ui + Tailwind CSS**|Best-in-class components, fully customizable|
|Animation Library|**Framer Motion**|Scroll animations, page transitions, hero effects|
|Icon Library|**Lucide React + React Icons**|Clean icon system; WhatsApp icon from react-icons|
|Image Optimization|**Next/Image** component|Automatic WebP, lazy loading, blur placeholders|
|Font Loading|**Next/Font** (Google Fonts)|Playfair Display, Poppins, Inter — zero layout shift|
|State Management|**Zustand**|Cart/enquiry state, filter state — lightweight|
|Backend Framework|**Node.js + Express.js**|REST API for admin routes, contact form, custom logic|
|Database|**Supabase** (PostgreSQL)|Product catalog, testimonials, contact submissions|
|Supabase Client|**@supabase/supabase-js**|Real-time queries, Row Level Security, Auth (optional)|
|Supabase Storage|**Supabase Storage Buckets**|Product image uploads with CDN delivery|
|Form Handling|**React Hook Form + Zod**|Contact form with validation and schema typing|
|Email Notifications|**Nodemailer + Gmail SMTP**|Email alerts when contact form is submitted|
|Deployment|**Vercel** (frontend + API routes)|One-click deploy, global CDN, CI/CD pipeline|
|Image Storage|**Supabase Storage Buckets**|Product images stored in public buckets with CDN URLs|

\---

### 6.2 Why shadcn/ui + Tailwind CSS is the Right Choice

Unlike traditional UI libraries that install as black-box npm packages, **shadcn/ui** provides component source code directly into your project — giving full control over styling, theming, and customization.

* Radix UI primitives underneath — fully accessible (WCAG 2.1 AA)
* Tailwind CSS for all styling — no CSS-in-JS overhead, ultra-fast builds
* Dark mode and theming out of the box via CSS variables
* Works perfectly with Next.js App Router and Server Components
* **Components used in this project:** Button, Card, Dialog, Dropdown, Badge, Carousel, Input, Form, Sheet (mobile drawer), Tabs, Skeleton loader, Toast notifications

\---

### 6.3 Why Supabase is the Right Database Choice

**Supabase** is an open-source Firebase alternative built on top of **PostgreSQL** — a battle-tested relational database. It gives this project a powerful, scalable backend without the complexity of managing a separate database server.

**Key advantages for this project:**

* **Hosted PostgreSQL** — fully managed, no server setup, free tier is generous
* **Auto-generated REST \& GraphQL API** — query your database directly from Next.js without writing backend routes for simple CRUD
* **Supabase Storage** — built-in file/image storage with public CDN URLs, no third-party service needed
* **Row Level Security (RLS)** — fine-grained access control at the database level
* **Real-time subscriptions** — useful if you add live order notifications later
* **Supabase Dashboard** — a clean UI to manage your product catalog, view contact submissions, and upload images without touching code
* **Works natively with Next.js** — use the Supabase client in both Server Components and API routes

\---

### 6.4 Supabase Database Schema

```sql
-- Products table
CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen\\\_random\\\_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  category      TEXT NOT NULL,         -- e.g. 'blended', 'pure', 'combo'
  weights       TEXT\\\[],                -- e.g. \\\['100g', '200g', '500g']
  prices        JSONB,                 -- e.g. {"100g": 45, "200g": 85}
  image\\\_url     TEXT,
  is\\\_bestseller BOOLEAN DEFAULT FALSE,
  is\\\_active     BOOLEAN DEFAULT TRUE,
  created\\\_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id          UUID PRIMARY KEY DEFAULT gen\\\_random\\\_uuid(),
  name        TEXT NOT NULL,
  city        TEXT,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  review      TEXT NOT NULL,
  product     TEXT,
  is\\\_active   BOOLEAN DEFAULT TRUE,
  created\\\_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact\\\_submissions (
  id         UUID PRIMARY KEY DEFAULT gen\\\_random\\\_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT,
  email      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  created\\\_at TIMESTAMPTZ DEFAULT NOW()
);
```

\---

### 6.5 Supabase Client Setup (Next.js)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT\\\_PUBLIC\\\_SUPABASE\\\_URL!;
const supabaseKey  = process.env.NEXT\\\_PUBLIC\\\_SUPABASE\\\_ANON\\\_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Fetching products in a Server Component:**

```typescript
// app/products/page.tsx
import { supabase } from '@/lib/supabase';

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('\\\*')
    .eq('is\\\_active', true)
    .order('created\\\_at', { ascending: false });

  if (error) console.error(error);
  return <ProductGrid products={products ?? \\\[]} />;
}
```

**Saving a contact form submission:**

```typescript
// app/api/contact/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { error } = await supabase
    .from('contact\\\_submissions')
    .insert(\\\[body]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

\---

### 6.6 Tailwind CSS Theme Configuration

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          red:    '#C0392B',
          orange: '#E67E22',
          gold:   '#F39C12',
          brown:  '#7D4B12',
          cream:  '#FDF3E7',
          dark:   '#1A0A00',
        }
      },
      fontFamily: {
        display: \\\['Playfair Display', 'serif'],
        sans:    \\\['Poppins', 'sans-serif'],
        body:    \\\['Inter', 'sans-serif'],
      }
    }
  }
}
```

\---

### 6.7 Project Folder Structure (Next.js App Router)

```
masala-website/
├── app/
│   ├── page.tsx                  ← Home
│   ├── products/
│   │   └── page.tsx              ← Products listing
│   ├── about/
│   │   └── page.tsx              ← About Us
│   ├── contact/
│   │   └── page.tsx              ← Contact Us
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          ← POST: save submission + send email
│   │   └── products/
│   │       └── route.ts          ← GET: fetch products (server-side)
│   ├── layout.tsx                ← Root layout (Navbar + Footer + WhatsApp Float)
│   └── globals.css               ← Tailwind + CSS variables
│
├── components/
│   ├── ui/                       ← shadcn/ui generated components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── BrandStory.tsx
│   │   ├── HowToOrder.tsx
│   │   └── Testimonials.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilter.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductModal.tsx
│   ├── about/
│   │   ├── Timeline.tsx
│   │   ├── USPCards.tsx
│   │   └── QualityProcess.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── ContactCards.tsx
│   └── shared/
│       └── WhatsAppFloat.tsx     ← Appears on ALL pages
│
├── lib/
│   ├── supabase.ts               ← Supabase client (replaces mongodb.ts)
│   ├── utils.ts
│   └── whatsapp.ts               ← Deeplink builder utility
│
├── types/
│   ├── product.ts                ← TypeScript types matching Supabase schema
│   └── contact.ts
│
└── public/
    └── images/
        ├── products/             ← Or use Supabase Storage bucket URLs
        ├── categories/
        └── brand/
```

\---

## 7\. NAVIGATION \& UX BEST PRACTICES

### 7.1 Navigation Architecture

Keep navigation minimal and purposeful. Four pages means four primary nav items — no dropdowns needed on the main nav. This reduces cognitive load and speeds up decision making.

|Rule|Details|
|-|-|
|Desktop Nav|Logo (left) \| Home \| Products \| About \| Contact Us \| **\[WhatsApp Order]** pill button (right)|
|Mobile Nav|Hamburger menu → slide-in drawer from right with all 4 links + WhatsApp CTA|
|Active State|Current page link underlined with saffron orange color|
|CTA Placement|WhatsApp button in BOTH navbar AND floating corner — always accessible|
|Scroll Behavior|Header becomes solid (white + shadow) after 80px scroll — smooth CSS transition|

\---

### 7.2 Mobile-First UX Rules

* Touch targets minimum **44×44px** (WhatsApp button must be 56×56px+)
* Product cards in 1-column grid on mobile with full-width WhatsApp CTA button
* No horizontal overflow — test all sections on 375px viewport
* Category filters as a horizontally scrollable pill row on mobile
* Lazy load all images below the fold (`Next/Image` handles this automatically)
* Compress all product images to **WebP under 100KB**

\---

### 7.3 Page Transition \& Animation Guidelines

```typescript
// Recommended Framer Motion page transition wrapper
const pageVariants = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -20 }
};

// Section reveal on scroll
const sectionVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
```

\---

### 7.4 SEO \& Performance Guidelines

* Each page must have unique `<title>`, `meta description`, and `og:image` tags
* Use Next.js **Metadata API** for automatic SEO tag management

```typescript
// app/page.tsx
export const metadata = {
  title: '\\\[Brand Name] — Premium Masala \\\& Spices | Order on WhatsApp',
  description: 'Buy pure, fresh masala and spices online. Crafted from handpicked ingredients. Order directly on WhatsApp — fast delivery across India.',
  openGraph: {
    images: \\\['/images/brand/og-image.jpg']
  }
}
```

* Add JSON-LD schema markup for `Organization` and `Product` types
* Enable Next.js **Partial Prerendering (PPR)** for sub-1-second page loads
* **Google PageSpeed target:** 90+ mobile, 95+ desktop

\---

## 8\. DEVELOPER CHECKLIST

### 8.1 Setup \& Configuration

* \[ ] Initialize Next.js 14 project with TypeScript

```bash
  npx create-next-app@latest masala-website --typescript --tailwind --app
  ```

* \[ ] Install and configure Tailwind CSS with custom brand color tokens
* \[ ] Initialize shadcn/ui

```bash
  npx shadcn-ui@latest init
  ```

* \[ ] Install dependencies:

```bash
  npm install framer-motion lucide-react react-icons zustand react-hook-form zod @supabase/supabase-js
  ```

* \[ ] Configure `Next/Font` with Playfair Display, Poppins, Inter
* \[ ] Create a Supabase project at [supabase.com](https://supabase.com) and run the SQL schema (Section 6.4)
* \[ ] Enable Row Level Security (RLS) on all Supabase tables
* \[ ] Create Supabase Storage bucket named `product-images` and set it to **public**
* \[ ] Set up `.env.local` with all API keys:

```
  NEXT\\\_PUBLIC\\\_SUPABASE\\\_URL=https://your-project.supabase.co
  NEXT\\\_PUBLIC\\\_SUPABASE\\\_ANON\\\_KEY=your-anon-key
  SUPABASE\\\_SERVICE\\\_ROLE\\\_KEY=your-service-role-key
  EMAIL\\\_USER=
  EMAIL\\\_PASS=
  WHATSAPP\\\_NUMBER=91XXXXXXXXXX
  NEXT\\\_PUBLIC\\\_WHATSAPP\\\_NUMBER=91XXXXXXXXXX
  ```

\---

### 8.2 Component Development Order

1. \[ ] Build `Navbar` component with scroll behavior and mobile drawer
2. \[ ] Build `Footer` component with 4-column layout
3. \[ ] Create `WhatsAppFloat` component — add to root `layout.tsx`
4. \[ ] Build `HeroBanner` with video/image background and CTA buttons
5. \[ ] Create `TrustBadges` marquee strip component
6. \[ ] Build `CategoryGrid` with hover animations
7. \[ ] Create `ProductCard` component with WhatsApp deeplink builder
8. \[ ] Build `ProductGrid` with filter/search state (Zustand)
9. \[ ] Create `ProductModal` with full product detail view
10. \[ ] Build About page `Timeline` component
11. \[ ] Create `QualityProcess` horizontal step flow
12. \[ ] Build `ContactForm` with React Hook Form + Zod validation
13. \[ ] Implement contact form submission with Nodemailer backend
14. \[ ] Add Framer Motion scroll animations to all sections
15. \[ ] SEO: Configure Metadata API for all 4 pages
16. \[ ] Performance: Run Lighthouse audit, fix LCP/CLS issues
17. \[ ] Cross-browser: Test Chrome, Firefox, Safari, Samsung Internet
18. \[ ] Mobile: Test all pages on 375px, 390px, 414px, 768px
19. \[ ] Deploy to **Vercel** — connect GitHub repo, add all env vars in Vercel dashboard
20. \[ ] Configure custom domain + SSL certificate

\---

### 8.3 WhatsApp Button Implementation

```tsx
// components/shared/WhatsAppFloat.tsx
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppFloat() {
  const phone = process.env.NEXT\\\_PUBLIC\\\_WHATSAPP\\\_NUMBER;
  const message = encodeURIComponent(
    "Hi! I visited your website and would like to know more about your masala products."
  );

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="\\\_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
                 w-14 h-14 rounded-full bg-green-500 shadow-lg shadow-green-500/40
                 hover:bg-green-600 transition-colors"
      animate={{ scale: \\\[1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </motion.a>
  );
}
```

\---

*🌶 End of Document — Masala Brand Website Blueprint*

*Built with research from Zoff Foods, Baba Jadhav, Suhana, Everest, Badshah, Vasant \& Mangal Masala
admin@gravitate.com*



