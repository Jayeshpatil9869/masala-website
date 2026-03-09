"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '45+', label: 'Years of Legacy' },
  { value: '10k+', label: 'Happy Families' },
  { value: '100%', label: 'Pure Ingredients' },
];

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-brand-cream relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Image Side — explicit aspect ratio so Next.js Image fill renders */}
          <motion.div
  className="w-full lg:w-1/2 relative h-[300px] sm:h-[420px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0"
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <Image
    src="/image.png"
    alt="Masala Grinding Process"
    fill
    className="w-full h-full object-cover"
    sizes="(max-width: 1024px) 100vw, 50vw"
  />

  <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply"></div>

  <div className="absolute bottom-8 left-8 bg-brand-cream p-5 rounded-2xl max-w-xs shadow-xl hidden sm:block">
    <span className="font-display text-4xl font-bold text-brand-red block mb-2">2004</span>
    <p className="text-brand-dark font-medium text-sm">
      The year our founder started selling pure masalas door-to-door on a bicycle.
    </p>
  </div>
</motion.div>

          {/* Text Side */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-4 md:mb-6">
              Our Legacy of <span className="text-brand-orange">Purity</span>
            </h2>
            <div className="w-16 h-1 bg-brand-gold rounded-full mb-6 md:mb-8"></div>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-body mb-5 md:mb-6">
              What started on a humble bicycle has now grown into a vast manufacturing empire. For over four decades, <strong className="text-brand-dark">Gravitate</strong> has supplied premium masalas to wholesalers and retailers nationwide, believing in one simple truth: pure ingredients create unforgettable meals.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-body mb-8 md:mb-10">
              From our signature <span className="font-medium text-brand-red">Pooja Special</span> and <span className="font-medium text-brand-orange">Powder Special</span> to <span className="font-medium">Box Products, Pouches, Upwas Special,</span> and <span className="font-medium">Winter Special</span>, we deliver 100% authentic flavors crafted from handpicked spices.
            </p>

            {/* Stats Grid — flex-wrap so numbers never overlap on narrow screens */}
            <div className="flex flex-wrap gap-x-8 gap-y-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col border-l-4 border-brand-orange pl-4 py-1 min-w-[90px]">
                  <span className="font-display text-3xl md:text-4xl font-bold text-brand-red leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-brand-dark leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
