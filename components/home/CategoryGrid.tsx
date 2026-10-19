"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const defaultCategoryList = [
  {
    id: "1",
    name: "Special Box Product",
    slug: "special-box-product",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/categories/special-box-product-1773036284987.jpg",
  },
  {
    id: "2",
    name: "Powder Special",
    slug: "powder-special",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/categories/powder-special-1773036337281.jpg",
  },
  {
    id: "3",
    name: "Special Gravitate Masala",
    slug: "special-gravitatee-masala",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/categories/special-gravitatee-masala-1773035732452.jpeg",
  },
  {
    id: "4",
    name: "Winter Special",
    slug: "winter-special",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/categories/winter-special-1773036361561.jpg",
  },
  {
    id: "5",
    name: "Pooja Special",
    slug: "pooja-special",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/categories/pooja-special-1773036380656.jpg",
  },
  {
    id: "6",
    name: "Upwas Special",
    slug: "upwas-special",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/products/shri-vrat-atta/1792421392466-vahuzab2owa.jpg",
  },
  {
    id: "7",
    name: "Special Pouch",
    slug: "special-pouch",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/products/shahi-doodh-masala/1773065223441-9wqv68ahzrc.png",
  },
  {
    id: "8",
    name: "Ayurvedic Special",
    slug: "gravitate-ayurvedic-products",
    image_url:
      "https://oknqceysltwcahhmaygx.supabase.co/storage/v1/object/public/product-images/products/gaikahtbol/1773066605678-n6hhx3wwux9.png",
  },
];

export default function CategoryGrid({ categories }: { categories: any[] }) {
  const displayCats =
    categories && categories.length > 0 ? categories : defaultCategoryList;
  const [isPaused, setIsPaused] = useState(false);

  // Repeat the list to create a seamless infinite loop
  const marqueeList = [...displayCats, ...displayCats, ...displayCats];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#e5e5e5] select-none overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1440px]">
        {/* HEADER: Left-aligned Category Title */}
        <div className="text-left mb-5 sm:mb-8 pb-3 border-b border-[#cacacb]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight uppercase text-[#111111]">
            Category
          </h2>
        </div>

        {/* ── DESKTOP VIEW (>= lg): Clean static single-row layout ── */}
        <div className="hidden lg:flex items-start justify-between gap-4 xl:gap-6 pb-3 pt-1">
          {displayCats.map((cat, idx) => (
            <div key={cat.id || idx} className="flex-1 text-center min-w-0">
              <Link
                href={`/products?category=${cat.slug || "all"}`}
                className="group flex flex-col items-center gap-2.5 text-center cursor-pointer mx-auto active:scale-95 transition-transform"
              >
                <div className="relative w-28 h-28 xl:w-32 xl:h-32 rounded-full overflow-hidden bg-[#f1f5f9] ring-2 ring-transparent group-hover:ring-[#111111] transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Image
                    src={
                      cat.image_url ||
                      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
                    }
                    alt={cat.name}
                    fill
                    sizes="128px"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-[#111111] group-hover:text-black transition-colors w-full max-w-[130px] line-clamp-2 leading-snug">
                  {cat.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE / TABLET VIEW (< lg): 100% Full-Width Edge-to-Edge Loop (No white shadows) ── */}
      <div
        className="lg:hidden relative w-full overflow-hidden"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex items-start gap-4 sm:gap-5 py-2 w-max"
          animate={
            isPaused
              ? {}
              : {
                  x: ["-50%", "0%"],
                }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
        >
          {marqueeList.map((cat, idx) => (
            <div
              key={`${cat.id || idx}-${idx}`}
              className="flex-shrink-0 w-[82px] xs:w-[88px] text-center"
            >
              <Link
                href={`/products?category=${cat.slug || "all"}`}
                className="group flex flex-col items-center gap-2 text-center cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative w-[72px] h-[72px] xs:w-[76px] xs:h-[76px] rounded-full overflow-hidden bg-[#f1f5f9] ring-2 ring-transparent group-hover:ring-[#111111] transition-all duration-300 shadow-sm">
                  <Image
                    src={
                      cat.image_url ||
                      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
                    }
                    alt={cat.name}
                    fill
                    sizes="76px"
                    className="object-cover object-center"
                  />
                </div>
                <span className="text-[11px] font-medium text-[#111111] line-clamp-2 leading-tight px-0.5">
                  {cat.name}
                </span>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
