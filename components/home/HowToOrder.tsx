"use client"

import { motion } from 'framer-motion';
import { ShoppingBag, Search, MessageCircle, Truck } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { InteractiveGradientCard } from '@/components/ui/interactive-gradient-card';

const steps = [
  {
    icon: Search,
    title: 'Browse Products',
    desc: 'Explore our range of premium blened masalas and pure spices.',
  },
  {
    icon: ShoppingBag,
    title: 'Choose Quantity',
    desc: 'Select the perfect size and variant for your kitchen needs.',
  },
  {
    icon: MessageCircle,
    title: 'Click to WhatsApp',
    desc: 'Hit the green button on any product to send us a message instantly.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Confirm your order and we’ll ship it fresh to your doorstep.',
  }
];

export default function HowToOrder() {
  const waLink = buildWhatsAppLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900',
    "Hi! I'd like to place an order."
  );
  
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block border border-brand-orange/20 rounded-full px-4 py-1.5 text-brand-orange text-xs font-semibold uppercase tracking-widest mb-6">
              Quick & Easy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              How Our <span className="text-brand-orange">Ordering</span> Works
            </h2>
            <p className="text-gray-500 font-body max-w-xl mx-auto text-base">
              Our ordering process is simple, fast, and brings our premium spices right to your kitchen in just a few easy steps.
            </p>
          </motion.div>
        </div>

        {/* 4-Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <InteractiveGradientCard className="bg-white rounded-2xl p-8 pt-12 border border-gray-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-8px_rgba(240,111,36,0.15)] transition-all duration-300 group flex flex-col h-full">
              
              {/* Animated Icon Container (Reference image style) */}
              <div className="relative w-full flex justify-center mb-10 mt-2">
                {/* Outer Ripple 1 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-brand-orange/10 group-hover:scale-110 transition-transform duration-500"></div>
                {/* Outer Ripple 2 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-brand-orange/20 group-hover:scale-125 transition-transform duration-700"></div>
                
                {/* Center Glowing Icon Background */}
                <div className="relative z-10 w-[52px] h-[52px] rounded-full bg-gradient-to-tr from-[#FF8A00] to-[#FFB800] text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,138,0,0.6)] group-hover:scale-105 transition-all duration-300">
                  <step.icon className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                </div>
              </div>

              {/* Text Content Area */}
              <div className="mt-auto">
                <span className="text-[#FF8A00] text-xs font-bold uppercase tracking-wide block mb-2">
                  Step {idx + 1}
                </span>
                <h3 className="font-sans font-bold text-lg text-brand-dark mb-3 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 font-body text-[13px] leading-relaxed tracking-wide">{step.desc}</p>
              </div>
              
              </InteractiveGradientCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-[#128C7E] hover:bg-[#075E54] text-white rounded-full text-base h-14 px-8 shadow-lg shadow-[#128C7E]/20 transition-all duration-300 hover:-translate-y-1">
              <a href={waLink} target="_blank" rel="noreferrer">
                <MessageCircle className="w-5 h-5 mr-3" />
                Start Ordering on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
