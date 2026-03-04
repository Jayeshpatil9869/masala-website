"use client"

import { useState, useEffect, useRef } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RelatedProducts({ currentProduct }: { currentProduct: any }) {
  const [relatedProductsList, setRelatedProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const amount = 340;
      sliderRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function fetchRelated() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002'}/api/v1/products`);
        if (!res.ok) return;
        const allProducts = await res.json();
        
        const currentCategory = currentProduct.category?.toLowerCase();

        // Filter products from the SAME category (case-insensitive), excluding the current product
        let related = allProducts.filter(
          (p: any) => p.category?.toLowerCase() === currentCategory && p.id !== currentProduct.id
        );

        // Fallback: show any other products if none in same category
        if (related.length === 0) {
          related = allProducts.filter((p: any) => p.id !== currentProduct.id).slice(0, 9);
        }

        setRelatedProductsList(related);
      } catch (e) {
        console.error("Failed to load related products", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [currentProduct.id, currentProduct.category]);

  return (
    <section className="bg-brand-cream py-16 border-b border-brand-orange/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-brand-dark mb-1 capitalize">
              You May Also Like — {currentProduct.category}
            </h2>
            <p className="font-body text-gray-500 text-sm">More from this category.</p>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-brand-orange/40 text-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-brand-orange/40 text-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[300px] h-72 bg-gray-200 rounded-2xl animate-pulse shrink-0" />
            ))}
          </div>
        ) : (
          <div ref={sliderRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-1">
            {relatedProductsList.map((product) => (
              <div key={product.id} className="min-w-[260px] md:min-w-[300px] snap-start shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
