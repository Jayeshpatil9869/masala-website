"use client"

import { motion } from 'framer-motion';

const milestones = [
  { year: '1979', title: 'The Bicycle Roots', desc: 'Our founder initiated direct door-to-door distribution of hand-ground spices across Malegaon neighborhoods on a bicycle.' },
  { year: '2004', title: 'Commercial Mill Establishment', desc: 'Formal incorporation of Gurukrupa Gruh Udyog and transition to dedicated low-heat stone milling facilities.' },
  { year: '2017', title: 'Wholesale & Retail Network', desc: 'Expanded production to cater to retail chains, caterers, and wholesale distributors across Maharashtra.' },
  { year: '2026', title: 'Signature Product Lines', desc: 'Modernized nationwide delivery with dedicated Pooja Special, Powder Special, and fast WhatsApp commerce.' },
];

export default function Timeline() {
  return (
    <div className="relative mt-6 select-none">
      <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[#cacacb]" />
      
      <div className="space-y-8">
        {milestones.map((m, idx) => (
          <motion.div 
            key={idx} 
            className="relative pl-8"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            {/* Timeline Dot (Concentric ring) */}
            <div className="absolute left-0 top-[3px] w-4 h-4 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            </div>
            
            <span className="font-display text-2xl text-[#111111] leading-none block mb-1">
              {m.year}
            </span>
            <h4 className="font-sans font-medium text-sm text-[#111111] mb-1">
              {m.title}
            </h4>
            <p className="text-xs text-[#707072] leading-relaxed max-w-md">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
