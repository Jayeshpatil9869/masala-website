"use client"

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import Link from 'next/link';

export default function HeroBanner() {
  const waLink = buildWhatsAppLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890',
    "Hi! I'd like to order some Masala."
  );

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-[#1A0A00]/70"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mt-20 text-center text-brand-white flex flex-col items-center">
        <motion.h1 
          className="font-display text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Soul of, <span className="text-brand-orange">Indian Kitchen</span>
        </motion.h1>
        
        <motion.p 
          className="font-body text-lg md:text-xl text-brand-cream/90 max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Crafted from handpicked spices, ground fresh for your kitchen. Experience the authentic taste of tradition.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Button asChild size="lg" className="bg-[#25D366] hover:bg-green-700 text-white rounded-full text-base h-14 px-8">
            <a href={waLink} target="_blank" rel="noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Order on WhatsApp
            </a>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-full text-base h-14 px-8">
            <Link href="/products">
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
