"use client"

import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      router.push('/products', { scroll: false });
    } else {
      router.push(`/products?category=${category}`, { scroll: false });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      
      <ProductFilter 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
        onSearchChange={setSearchTerm} 
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-display text-gray-500">No products found for your search.</h3>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            className="mt-4 text-brand-orange font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Combo Packs Section Placeholder */}
      <div className="mt-24 bg-[#FAFAF7] rounded-3xl p-8 lg:p-12 border border-brand-orange/20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-brand-dark mb-2">Value Combo Deals</h2>
          <p className="text-gray-600">Perfect for gifting or stocking up your kitchen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mock combo cards */}
          {[1,2,3].map((i) => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-orange/10 text-center">
              <div className="w-full h-40 bg-brand-cream rounded-xl mb-4 flex items-center justify-center">
                <span className="text-brand-orange font-bold text-lg">Combo Pack {i}</span>
              </div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Essential Spices Box</h4>
              <p className="text-sm text-gray-500 mb-4">Save ₹50 on this bundle</p>
              <button className="w-full bg-brand-orange text-white py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors">
                Order combo
              </button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
