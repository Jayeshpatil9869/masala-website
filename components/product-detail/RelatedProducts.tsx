"use client"

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';

export default function RelatedProducts({ currentProduct }: { currentProduct: any }) {
  const [relatedProductsList, setRelatedProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/products`);
        if (!res.ok) return;
        const allProducts = await res.json();
        
        const currentCategory = currentProduct.category?.toLowerCase();

        let related = allProducts.filter(
          (p: any) => p.category?.toLowerCase() === currentCategory && p.id !== currentProduct.id
        );

        if (related.length === 0) {
          related = allProducts.filter((p: any) => p.id !== currentProduct.id).slice(0, 8);
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

  if (!loading && relatedProductsList.length === 0) return null;

  return (
    <section className="bg-brand-cream py-16 border-b border-brand-orange/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-10">
          <h2 className="font-sans font-bold text-xl md:text-2xl text-brand-dark mb-1 capitalize">
            Explore more
          </h2>
          <p className="font-body text-gray-500 text-sm">Customers who bought this item also bought</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-200 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProductsList.slice(0, 4).map((product) => (
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
