"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const defaultCategoryList = [
  {
    id: '1',
    name: 'Pooja Special',
    slug: 'pooja-special',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '2',
    name: 'Powder Range',
    slug: 'powder-special',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '3',
    name: 'Authentic Blends',
    slug: 'blends',
    image_url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '4',
    name: 'Box Masalas',
    slug: 'box-products',
    image_url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '5',
    name: 'Whole Spices',
    slug: 'whole-spices',
    image_url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '6',
    name: 'Tea Masala',
    slug: 'tea-masala',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '7',
    name: 'Pure Turmeric',
    slug: 'turmeric',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '8',
    name: 'Chili Powder',
    slug: 'chili-powder',
    image_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=500',
  },
];

export default function CategoryGrid({ categories }: { categories: any[] }) {
  const displayCats = categories && categories.length > 0 ? categories : defaultCategoryList;

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#e5e5e5] select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1440px]">
        {/* HEADER: Left-aligned Category Title */}
        <div className="text-left mb-5 sm:mb-8 pb-3 border-b border-[#cacacb]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight uppercase text-[#111111]">
            Category
          </h2>
        </div>

        {/* 1-ROW CATEGORY LIST (Single line on desktop, smooth touch-snap scroll on mobile) */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-3 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
          {displayCats.map((cat, idx) => (
            <motion.div
              key={cat.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
              className="flex-shrink-0 flex-1 min-w-[70px] xs:min-w-[76px] sm:min-w-[95px] lg:min-w-0 snap-start"
            >
              <Link
                href={`/products?category=${cat.slug || 'all'}`}
                className="group flex flex-col items-center gap-2 sm:gap-2.5 text-center cursor-pointer mx-auto active:scale-95 transition-transform"
              >
                {/* Circular Image Container (One-Line Proportions) */}
                <div className="relative w-[68px] h-[68px] xs:w-[72px] xs:h-[72px] sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full overflow-hidden bg-[#f1f5f9] ring-2 ring-transparent group-hover:ring-[#111111] transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Image
                    src={cat.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 72px, (max-width: 1024px) 104px, 128px"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Category Label */}
                <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-[#111111] group-hover:text-black transition-colors max-w-[76px] sm:max-w-[100px] md:max-w-[115px] line-clamp-2 leading-tight">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
