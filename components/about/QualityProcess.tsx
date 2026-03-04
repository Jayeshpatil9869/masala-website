"use client"

import { motion } from 'framer-motion';
import { Sprout, WashingMachine, ArchiveRestore, ShieldCheck, Package, Truck } from 'lucide-react';

const steps = [
  { icon: Sprout, title: 'Sourcing', desc: 'Direct from partnered spice farms' },
  { icon: WashingMachine, title: 'Cleaning', desc: 'Multi-stage sorting & washing' },
  { icon: ArchiveRestore, title: 'Stone Grinding', desc: 'Slow, cold-temperature milling' },
  { icon: ShieldCheck, title: 'Quality Check', desc: 'Stringent lab verification' },
  { icon: Package, title: 'Packaging', desc: 'Aroma-lock foil sealed' },
  { icon: Truck, title: 'Delivery', desc: 'Direct to your kitchen' },
];

export default function QualityProcess() {
  return (
    <div className="py-20 bg-brand-dark rounded-3xl mt-24 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our Process
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center position-relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-brand-orange/30 -z-10"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring' }}
            >
              <div className="w-20 h-20 rounded-2xl bg-[#2A1A0F] border border-white/10 flex items-center justify-center text-brand-orange mb-4 shadow-xl">
                <step.icon className="w-8 h-8" />
              </div>
              <h4 className="font-sans font-bold text-lg mb-1">{step.title}</h4>
              <p className="font-body text-sm text-brand-cream/60 max-w-[140px] mx-auto leading-tight">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
