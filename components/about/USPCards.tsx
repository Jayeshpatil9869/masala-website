"use client"

import { motion } from 'framer-motion';
import { Leaf, Flame, Droplets, HeartHandshake, ShieldCheck, CheckCircle } from 'lucide-react';

const usps = [
  { 
    icon: Leaf, 
    title: '100% Natural Purity', 
    desc: 'Sourced directly from our trusted partner farms with absolutely zero additives, fillers, or artificial colors. We believe in delivering the absolute unadulterated essence of nature straight to your kitchen, preserving the rich traditions of Indian spices.',
    className: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-orange-50 border-orange-100 flex-col md:flex-row items-start md:items-center gap-6 md:gap-10',
    iconClass: 'w-16 h-16 bg-white',
    titleClass: 'text-2xl',
    large: true
  },
  { 
    icon: Droplets, 
    title: 'Cold Stone Ground', 
    desc: 'Milled at low temperatures to lock in volatile oils and flavors.',
    className: 'md:col-span-1 bg-white flex-col items-start gap-4',
    iconClass: 'w-12 h-12 bg-orange-50/50',
    titleClass: 'text-[16px]',
    large: false
  },
  { 
    icon: CheckCircle, 
    title: 'Authentic Recipes', 
    desc: 'Heritage blends perfected over 45 years across generations.',
    className: 'md:col-span-1 bg-white flex-col items-start gap-4',
    iconClass: 'w-12 h-12 bg-orange-50/50',
    titleClass: 'text-[16px]',
    large: false
  },
  { 
    icon: Flame, 
    title: 'Freshly Roasted', 
    desc: 'Slow-roasted in small batches to awaken the peak aroma before grinding.',
    className: 'md:col-span-1 bg-white flex-col items-start gap-4',
    iconClass: 'w-12 h-12 bg-orange-50/50',
    titleClass: 'text-[16px]',
    large: false
  },
  { 
    icon: ShieldCheck, 
    title: 'FSSAI Certified', 
    desc: 'Stringent laboratory testing for pesticides and impurities.',
    className: 'md:col-span-1 bg-white flex-col items-start gap-4',
    iconClass: 'w-12 h-12 bg-orange-50/50',
    titleClass: 'text-[16px]',
    large: false
  },
  { 
    icon: HeartHandshake, 
    title: 'Ethical Sourcing', 
    desc: 'Fair prices paid directly to spice-growing communities across India.',
    className: 'md:col-span-1 bg-white flex-col items-start gap-4',
    iconClass: 'w-12 h-12 bg-orange-50/50',
    titleClass: 'text-[16px]',
    large: false
  },
];

export default function USPCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto md:auto-rows-[1fr]">
      {usps.map((usp, idx) => (
        <motion.div 
          key={idx}
          className={`relative p-8 rounded-[2rem] border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 hover:border-[#d38b55]/30 transition-all duration-500 overflow-hidden flex ${usp.className}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle decorative background icon */}
          <usp.icon className={`absolute -bottom-6 -right-6 w-32 h-32 text-gray-50/50 transform rotate-[-15deg] pointer-events-none ${usp.large ? 'opacity-20 text-brand-orange/10' : ''}`} />
          
          <div className={`rounded-2xl border border-brand-orange/10 flex items-center justify-center text-[#d38b55] flex-shrink-0 z-10 ${usp.iconClass} shadow-sm`}>
            <usp.icon className={`${usp.large ? 'w-8 h-8' : 'w-5 h-5'} stroke-[1.5]`} />
          </div>
          
          <div className="z-10 flex-1">
            <h4 className={`font-sans font-bold text-brand-dark mb-3 tracking-tight ${usp.titleClass}`}>{usp.title}</h4>
            <p className={`text-gray-500 font-body leading-[1.7] ${usp.large ? 'text-[15px] md:text-[16px] max-w-md' : 'text-[13px]'}`}>{usp.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
