"use client"

import { Product, products } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const relatedProductsList = currentProduct.pairs_with 
    ? products.filter(p => currentProduct.pairs_with?.includes(p.id))
    : products.filter(p => p.id !== currentProduct.id).slice(0, 4);

  if (relatedProductsList.length === 0) return null;

  return (
    <section className="bg-brand-cream py-20 border-b border-brand-orange/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-2">Pairs Well With</h2>
            <p className="font-body text-gray-500">Curated companions for your pantry.</p>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 border border-brand-orange/40 text-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 border border-brand-orange/40 text-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProductsList.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
