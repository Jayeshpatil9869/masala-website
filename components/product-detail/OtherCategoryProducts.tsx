"use client"

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';

export default function OtherCategoryProducts({ currentCategory }: { currentCategory: string }) {
  const [otherProducts, setOtherProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOthers() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/products`);
        if (!res.ok) return;
        const allProducts = await res.json();
        
        const others = allProducts
          .filter((p: any) => p.category?.toLowerCase() !== currentCategory?.toLowerCase())
          .slice(0, 8);
          
        setOtherProducts(others);
      } catch (e) {
        console.error("Failed to load other products", e);
      } finally {
        setLoading(false);
      }
    }
    fetchOthers();
  }, [currentCategory]);

  if (!loading && otherProducts.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16 border-t border-[#e5e5e5]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-[1440px]">
        <div className="mb-8 pb-3 border-b border-[#cacacb] flex items-baseline justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium uppercase tracking-tight text-[#111111]">
              Explore Other Spice Collections
            </h2>
            <p className="text-xs text-[#707072] mt-0.5">Diverse formulations from our 45-year catalog</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-none bg-[#f5f5f5] animate-pulse aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {otherProducts.slice(0, 4).map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
