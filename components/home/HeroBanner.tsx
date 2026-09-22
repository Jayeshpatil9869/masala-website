"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroBanner() {
  const waLink = `https://wa.me/919271580900?text=${encodeURIComponent(
    "Hi Gravitate Spices! I would like to explore your masala collection and place an order."
  )}`

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[760px] bg-[#111111] overflow-hidden flex items-center">
      {/* BACKGROUND CAMPAIGN PHOTOGRAPHY */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/hero-spice-bg.jpg"
          alt="Gravitate Pure Spices and Masalas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-center select-none brightness-95"
        />
        
        {/* MULTI-LAYER DIRECTIONAL SCRIM OVERLAY FOR PERFECT LEGIBILITY */}
        {/* Horizontal dark scrim for left-side text column */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/2 via-45% to-black/10 sm:to-transparent" />
        
        {/* Subtle vertical gradient for bottom grounding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      {/* EDITORIAL CONTENT LOCKUP */}
      <div className="container relative z-10 mx-auto px-6 sm:px-10 lg:px-14 max-w-[1440px] py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-6 sm:space-y-7">
          
          {/* Main Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-normal leading-[0.95] drop-shadow-md">
              Pure Ground Spices.<br />
              <span className="text-white/90">Uncompromised Aroma.</span>
            </h1>
          </motion.div>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/90 text-sm sm:text-base md:text-lg max-w-lg font-normal leading-relaxed text-balance"
          >
            Single-origin handpicked spices, stone-ground with traditional patience in Malegaon & Nashik. No preservatives, zero artificial colors, 100% authentic flavor.
          </motion.p>

          {/* CTA Buttons Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 bg-white text-[#111111] hover:bg-[#f5f5f5] active:scale-95 font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-150 shadow-md hover:shadow-lg"
            >
              <span>Shop All Masalas</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white backdrop-blur-md border border-white/25 font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-150"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Order on WhatsApp</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
