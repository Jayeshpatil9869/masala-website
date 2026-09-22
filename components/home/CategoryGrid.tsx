"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const defaultCategoryList = [
  {
    id: "1",
    name: "Pooja Special",
    slug: "pooja-special",
    image_url:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "2",
    name: "Powder Range",
    slug: "powder-special",
    image_url:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "3",
    name: "Authentic Blends",
    slug: "blends",
    image_url:
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "4",
    name: "Box Masalas",
    slug: "box-products",
    image_url:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "5",
    name: "Whole Spices",
    slug: "whole-spices",
    image_url:
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "6",
    name: "Tea Masala",
    slug: "tea-masala",
    image_url:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "7",
    name: "Pure Turmeric",
    slug: "turmeric",
    image_url:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "8",
    name: "Chili Powder",
    slug: "chili-powder",
    image_url:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=500",
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
        <div className="hidden lg:flex items-start justify-between gap-6 pb-3 pt-1">
          {displayCats.map((cat, idx) => (
            <div key={cat.id || idx} className="flex-1 text-center">
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
                <span className="text-xs md:text-sm font-medium text-[#111111] group-hover:text-black transition-colors max-w-[115px] line-clamp-2 leading-tight">
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
