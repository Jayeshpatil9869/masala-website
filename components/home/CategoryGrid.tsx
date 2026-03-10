"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryGrid({ categories }: { categories: any[] }) {

  const featured = categories[0];
  const rest = categories.slice(1, 5);

  return (
    <section className="py-16 sm:py-24 bg-[#FDF3E7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section Header */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Flame className="w-3.5 h-3.5 fill-brand-orange" />
            Browse by Category
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-brand-dark leading-tight">
              Explore Our{' '}
              <span className="relative inline-block">
                <span className="text-brand-red">Masala Range</span>
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-brand-orange/40 rounded-full" />
              </span>
            </h2>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-red transition-colors whitespace-nowrap"
            >
              View all
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-[auto] gap-3 sm:gap-4">

          {/* Featured large card — takes 2 cols + 2 rows on desktop */}
          {featured && (
            <motion.div
              className="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={`/products?category=${featured.slug}`}
                className="group relative flex h-full min-h-[240px] sm:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden"
              >
                <Image
                  src={featured.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) calc(100vw - 32px), 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex items-end justify-between">
                  <div>
                    <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-1 block">Featured</span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">{featured.name}</h3>
                  </div>
                  <span className="flex-shrink-0 ml-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Smaller cards */}
          {rest.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.06 + 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative flex min-h-[110px] sm:min-h-[180px] rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <Image
                  src={cat.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) calc(50vw - 20px), 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-end justify-between">
                  <h3 className="font-sans font-semibold text-[11px] sm:text-sm text-white leading-tight line-clamp-1 pr-1">
                    {cat.name}
                  </h3>
                  <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
