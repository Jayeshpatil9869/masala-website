import ProductGrid from "@/components/products/ProductGrid";
import { Suspense } from 'react';

export const metadata = {
  title: 'Our Products | MasalaBrand',
  description: 'Explore our complete range of premium blended masalas and pure spices.',
};

export default function ProductsPage() {
  return (
    <>
      {/* Minimal Hero */}
      <section className="relative h-[300px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/90 to-brand-dark/80 mix-blend-multiply"></div>
        </div>

        <div className="container relative z-10 px-4 text-center text-brand-white">
          <div className="text-brand-orange/80 text-sm font-medium tracking-widest uppercase mb-4">
            Home <span className="mx-2">&gt;</span> Products
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Masala Collection
          </h1>
          <p className="font-body text-lg text-brand-cream/90 max-w-2xl mx-auto">
            Pure, Fresh & Authentic — Straight from the Source
          </p>
        </div>
      </section>

      {/* Main Grid area with Suspense for useSearchParams */}
      <div className="bg-brand-white min-h-screen">
        <Suspense fallback={<div className="container mx-auto py-20 text-center">Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </>
  );
}
