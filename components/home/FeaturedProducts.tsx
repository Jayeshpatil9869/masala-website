"use client"

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/products`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFeatured(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold uppercase tracking-widest mb-3">
            <Star className="w-4 h-4 fill-brand-orange" />
            Most Loved
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
            Our <span className="text-brand-red">Bestsellers</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full mt-4 mb-5" />
          <p className="text-gray-500 font-body max-w-xl mx-auto text-base">
            Handpicked by our chef, loved by thousands of kitchens across India.
          </p>
        </motion.div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-brand-red transition-colors group text-base"
          >
            Shop All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
