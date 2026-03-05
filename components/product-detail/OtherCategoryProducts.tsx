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
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-brand-dark mb-1">Explore Other Categories</h2>
          <p className="font-body text-gray-500 text-sm">Discover more from our wide variety of premium spices.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
