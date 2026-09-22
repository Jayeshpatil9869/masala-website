"use client"

import { motion } from 'framer-motion';
import { Search, ShoppingBag, MessageSquare, Truck, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Select Your Masalas',
    desc: 'Browse our signature single-origin spices, festival blends, and ground powders.',
  },
  {
    step: '02',
    icon: ShoppingBag,
    title: 'Pick Weight & Packs',
    desc: 'Select preferred quantities from retail 100g pouches up to 1kg wholesale cartons.',
  },
  {
    step: '03',
    icon: MessageSquare,
    title: 'One-Tap WhatsApp Order',
    desc: 'Click order on any item or your cart to connect directly with our dispatch team.',
  },
  {
    step: '04',
    icon: Truck,
    title: 'Direct Mill Delivery',
    desc: 'Freshly milled and shipped directly from our Nashik facility to your address.',
  }
];

export default function HowToOrder() {
  const waLink = buildWhatsAppLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900',
    "Hi Gravitate! I would like to place a spice order."
  );
  
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#e5e5e5]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-[1440px]">
        
        {/* Section Header (Nike heading-xl) */}
        <div className="mb-8 pb-4 border-b border-[#cacacb]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight uppercase text-[#111111]">
            How Ordering Works
          </h2>
          <p className="text-xs text-[#707072] mt-1">
            Streamlined WhatsApp commerce directly from manufacturer to consumer
          </p>
        </div>

        {/* 4-Step Flat Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {steps.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-[#f5f5f5] p-5 sm:p-7 lg:p-8 flex flex-col justify-between rounded-none border border-[#e5e5e5]"
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="font-display text-2xl text-[#111111] font-semibold">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white border border-[#cacacb] flex items-center justify-center text-[#111111]">
                    <item.icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-sans font-medium text-sm sm:text-base text-[#111111] mb-1.5 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#707072] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Primary Black Pill Action */}
        <div className="text-center">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-black active:scale-95 text-white font-medium text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-full transition-all duration-150"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Start WhatsApp Order Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
