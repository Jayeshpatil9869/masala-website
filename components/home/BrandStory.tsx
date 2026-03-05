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
          
          {/* Image Side */}
          <motion.div 
            className="w-full lg:w-1/2 relative min-h-[260px] sm:min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000" 
              alt="Masala Grinding Process" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply"></div>
            <div className="absolute bottom-8 left-8 bg-brand-cream p-6 rounded-2xl max-w-xs shadow-xl hidden sm:block">
              <span className="font-display text-4xl font-bold text-brand-red block mb-2">1978</span>
              <p className="text-brand-dark font-medium text-sm">The year our grandfather started hand-pounding spices in a small alleyway.</p>
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
              For over four decades, MasalaBrand has believed in one simple truth: pure ingredients create unforgettable meals. We source the finest spices directly from farmers across India, sun-dry them traditionally, and stone-grind them to preserve their essential oils.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-body mb-8 md:mb-10">
              No artificial colors. No fillers. Just 100% authentic masala that brings the true flavor of Indian heritage straight to your kitchen.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col border-l-2 border-brand-orange pl-3 sm:pl-4 py-1.5 sm:py-2">
                  <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-red leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-brand-dark mt-0.5 sm:mt-1 leading-snug">
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
