"use client"

import { testimonials } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

export default function Testimonials() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden text-brand-white">
      {/* Decorative Texture Pattern could go here */}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by Kitchens
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6"></div>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((test, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1 h-full">
                    <div className="bg-[#2A1A0F] rounded-2xl p-8 h-full flex flex-col border border-white/5 relative">
                      
                      {/* Quote Mark Decoration */}
                      <span className="absolute top-4 right-6 text-6xl text-brand-orange/20 font-display leading-none">"</span>
                      
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < test.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      
                      <p className="text-brand-cream/90 font-body mb-6 flex-1 italic relative z-10 text-sm md:text-base leading-relaxed">
                        "{test.review}"
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <h4 className="font-bold text-white text-lg">{test.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-brand-cream/60 text-sm">{test.city}</p>
                          <span className="text-xs bg-brand-orange/20 text-brand-orange px-2 py-1 rounded-sm">{test.product}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-4 mt-8 relative">
              <CarouselPrevious className="relative bg-white/10 hover:bg-brand-orange border-0 text-white left-0 right-0 translate-y-0" />
              <CarouselNext className="relative bg-white/10 hover:bg-brand-orange border-0 text-white left-0 right-0 translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
