"use client"

import { motion } from 'framer-motion';
import { Leaf, Flame, Droplets, HeartHandshake, ShieldCheck, CheckCircle } from 'lucide-react';

const usps = [
  { icon: Leaf, title: '100% Natural', desc: 'Sourced directly from partner farms with zero additives.' },
  { icon: Droplets, title: 'Cold Stone Ground', desc: 'Grinding at low temperatures preserves volatile spice oils.' },
  { icon: CheckCircle, title: 'Authentic Recipes', desc: 'Blends perfected over 45 years passed through generations.' },
  { icon: Flame, title: 'Freshly Roasted', desc: 'Spices are slow-roasted in small batches for peak aroma.' },
  { icon: ShieldCheck, title: 'FSSAI Certified', desc: 'Stringent lab testing for pesticides and impurities.' },
  { icon: HeartHandshake, title: 'Ethical Sourcing', desc: 'Fair prices paid directly to spice-growing communities.' },
];

export default function USPCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {usps.map((usp, idx) => (
        <motion.div 
          key={idx}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="w-12 h-12 bg-brand-cream rounded-xl flex items-center justify-center text-brand-orange mb-4">
            <usp.icon className="w-6 h-6" />
          </div>
          <h4 className="font-sans font-bold text-lg text-brand-dark mb-2">{usp.title}</h4>
          <p className="text-gray-600 font-body text-sm leading-relaxed">{usp.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
