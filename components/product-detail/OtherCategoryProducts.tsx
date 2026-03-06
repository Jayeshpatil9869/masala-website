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
    <section className="bg-brand-white py-16 border-b border-brand-orange/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-10">
          <h2 className="font-sans font-bold text-xl md:text-2xl text-brand-dark mb-1">Explore Other Categories</h2>
          <p className="font-body text-gray-500 text-sm">Customers who bought this item also bought</p>
        </div>

        {loading ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[75vw] sm:min-w-0 snap-start shrink-0 h-72 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {otherProducts.map((product) => (
              <div key={product.id} className="min-w-[75vw] sm:min-w-0 snap-start shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
