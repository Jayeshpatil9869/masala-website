"use client"

import { motion } from 'framer-motion';
import { Leaf, Droplets, CheckCircle, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

const usps = [
  { 
    icon: Leaf, 
    title: '100% Natural Purity', 
    desc: 'Sourced directly from partner farms with zero fillers, starch additives, or synthetic food colors.' 
  },
  { 
    icon: Droplets, 
    title: 'Cold Stone Ground', 
    desc: 'Low-heat traditional stone milling prevents delicate essential oils from evaporating.' 
  },
  { 
    icon: CheckCircle, 
    title: 'Heirloom Formulations', 
    desc: 'Authentic 45-year heritage blends perfected across generations of spice artisans.' 
  },
  { 
    icon: Flame, 
    title: 'Slow Batch Roasting', 
    desc: 'Whole spices slow-roasted in small batches to awaken peak flavor before milling.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'FSSAI Certified', 
    desc: 'Rigorous laboratory compliance verifying zero pesticide residue or adulteration.' 
  },
  { 
    icon: HeartHandshake, 
    title: 'Direct Sourcing', 
    desc: 'Fair agricultural partnerships that compensate farming communities with dignity.' 
  },
];

export default function USPCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto select-none">
      {usps.map((usp, idx) => (
        <motion.div 
          key={idx}
          className="p-6 sm:p-8 bg-[#f5f5f5] border border-[#e5e5e5] rounded-none flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.06, duration: 0.4 }}
        >
          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-white border border-[#cacacb] flex items-center justify-center text-[#111111] mb-6">
              <usp.icon className="w-5 h-5" />
            </div>
            
            <h3 className="font-sans font-medium text-base text-[#111111] mb-2">
              {usp.title}
            </h3>
            <p className="text-xs text-[#707072] leading-relaxed">
              {usp.desc}
            </p>
          </div>

          <div className="h-[1px] bg-[#cacacb] w-full" />
        </motion.div>
      ))}
    </div>
  );
}
