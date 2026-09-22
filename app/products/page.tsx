import ProductGrid from "@/components/products/ProductGrid";
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'All Products & Spices | Gravitate',
  description: 'Buy pure masala without preservatives online. Explore our authentic handpicked spice powder, garam masala, chilli powder, and box masala products safely delivered across Maharashtra.',
};

export default function ProductsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Gravitate Spice Powder Collection",
    "description": "Buy wholesale masala and pure spice powders online from Malegaon's leading masala manufacturer.",
    "url": "https://gravitatee.com/products",
    "publisher": {
      "@id": "https://gravitatee.com/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      
      {/* Editorial Catalog Header with Background Image & Gradient Overlay */}
      <div className="relative bg-[#1a0808] border-b border-[#e5e5e5] py-10 sm:py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
            alt="The Masala Catalog"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Rich warm reddish/black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#380b0b]/90 via-[#260808]/20 to-[#140505]/10" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-white/70 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">All Spices & Masalas</span>
          </nav>

          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none mb-2 drop-shadow-sm">
            The Masala Catalog
          </h1>
          <p className="text-xs sm:text-sm text-white/85 max-w-2xl">
            Single-origin whole spices, cold stone-milled powders, and authentic festival blends crafted with 45 years of purity.
          </p>
        </div>
      </div>

      {/* Main Grid area with Suspense */}
      <div className="bg-white min-h-screen">
        <Suspense fallback={<div className="max-w-[1440px] mx-auto py-24 text-center text-xs text-[#707072]">Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </>
  );
}
