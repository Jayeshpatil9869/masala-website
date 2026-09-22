"use client"

import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const sampleFeatured = [
  {
    id: 'f1',
    name: 'Pure Ground Turmeric Powder',
    slug: 'pure-turmeric-powder',
    description: 'High curcumin single-origin Salem turmeric powder, cold-stone milled.',
    category: 'Powder Special · Salem Origin',
    price: 180,
    originalPrice: 210,
    is_bestseller: true,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '250g', price: 180 }, { size: '500g', price: 340 }, { size: '1kg', price: 650 }]
  },
  {
    id: 'f2',
    name: 'Pooja Special Masala Blend',
    slug: 'pooja-special-masala',
    description: 'Authentic 45-year heirloom formulation for festive and religious rituals.',
    category: 'Pooja Special · Traditional',
    price: 240,
    originalPrice: 280,
    is_bestseller: true,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '200g', price: 240 }, { size: '500g', price: 550 }]
  },
  {
    id: 'f3',
    name: 'Royal Garam Masala',
    slug: 'royal-garam-masala',
    description: 'Slow-roasted whole spices hand-ground for rich curry aromatics.',
    category: 'Blends · Slow Roasted',
    price: 220,
    originalPrice: 250,
    is_bestseller: true,
    is_sale: false,
    image_url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '100g', price: 120 }, { size: '250g', price: 220 }, { size: '500g', price: 420 }]
  },
  {
    id: 'f4',
    name: 'Kashmiri Red Chilli Powder',
    slug: 'kashmiri-chilli-powder',
    description: 'Vibrant natural ruby color with mild, aromatic warmth.',
    category: 'Powder Special · Natural Color',
    price: 210,
    originalPrice: 240,
    is_bestseller: true,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '250g', price: 210 }, { size: '500g', price: 390 }, { size: '1kg', price: 740 }]
  }
];

export default function FeaturedProducts({ featured }: { featured: any[] }) {
  const products = featured && featured.length > 0 ? featured : sampleFeatured;

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#e5e5e5]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-[1440px]">
        {/* Section Header (Nike heading-xl) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 pb-4 border-b border-[#cacacb] gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-[#111111]">
              Featured Footprint & Bestsellers
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-tight text-[#111111] hover:underline"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Up Flat Catalog Grid (2 columns on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Catalog Action */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-black active:scale-95 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-150"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
