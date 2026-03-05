"use client"

import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle, Truck } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: ShoppingBag,
    title: 'Browse Products',
    desc: 'Explore our range of premium blened masalas and pure spices.',
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
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890',
    "Hi! I'd like to place an order."
  );

  return (
    <section className="py-16 md:py-24 bg-brand-white relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              How to Order
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 font-body max-w-2xl mx-auto text-lg">
              We've made ordering as simple as sending a text.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative max-w-5xl mx-auto mb-16">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gray-200 border-dashed border-2 -z-10"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-inner">
                <step.icon className="w-8 h-8" />
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-dark text-white font-bold flex items-center justify-center absolute -top-4 border-4 border-white shadow-sm">
                {idx + 1}
              </div>
              
              <h3 className="font-sans font-bold text-xl text-brand-dark mb-3">{step.title}</h3>
              <p className="text-gray-600 font-body">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-brand-green hover:bg-green-700 text-white rounded-full text-base md:text-lg h-14 md:h-16 px-7 md:px-10 shadow-lg shadow-green-600/30">
              <a href={waLink} target="_blank" rel="noreferrer">
                <MessageCircle className="w-6 h-6 mr-3" />
                Start Ordering on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
