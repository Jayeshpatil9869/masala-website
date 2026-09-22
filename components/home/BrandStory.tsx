"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '45+', label: 'Years of Heritage' },
  { value: '100%', label: 'Pure Single-Origin' },
  { value: '0%', label: 'Preservatives or Color' },
  { value: '50k+', label: 'Kitchens Supplied' },
];

export default function BrandStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#f5f5f5] border-b border-[#e5e5e5]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Image Side — Flat 0px Radius Editorial Photo */}
          <motion.div
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] bg-white overflow-hidden rounded-none border border-[#e5e5e5]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/image.png"
              alt="Traditional Spice Milling Heritage"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Subtle Editorial Tag */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 border border-[#cacacb] text-xs font-semibold text-[#111111] uppercase tracking-wider">
              Est. 1979 · Malegaon & Nashik
            </div>
          </motion.div>

          {/* Editorial Text Side */}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold tracking-widest text-[#707072] block">
                The Heritage Story
              </span>
              <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111] leading-[0.92]">
                Four Decades of Pure Devotion.
              </h2>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-[#39393b] leading-relaxed">
              What began with our founder delivering freshly milled spice formulations door-to-door on a bicycle has grown into an enduring legacy of culinary trust across Maharashtra and India.
            </p>

            <p className="text-xs sm:text-sm md:text-base text-[#707072] leading-relaxed">
              At Gravitate, we preserve time-honored cold stone grinding traditions that lock in volatile aromatic oils. From our revered <strong className="text-[#111111]">Pooja Special Masala</strong> and pure single-origin turmeric to slow-roasted garam blends, our commitment is absolute purity.
            </p>

            {/* Clean 4-Up Monochrome Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-[#cacacb]">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#111111] leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#707072] font-medium leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Editorial Action */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black active:scale-95 text-white text-xs font-medium px-6 py-3.5 rounded-full transition-all duration-150"
              >
                <span>Read Full Brand Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
