"use client"

import { motion } from 'framer-motion';

const milestones = [
  { year: '2004', title: 'The Bicycle Journey', desc: 'Started selling pure masalas door-to-door on a bicycle in the local neighborhood.' },
  { year: '2009', title: 'Wholesale & Retail Expansion', desc: 'Expanded operations, shifting from a bicycle to a dedicated manufacturing setup for wholesale.' },
  { year: '2017', title: 'Building the Empire', desc: 'Scaled our manufacturing facility to supply retailers and bulk buyers directly across the market.' },
  { year: '2025', title: 'The Signature Categories', desc: 'Cemented our legacy with dedicated Pooja, Powder, Box, Pouch, Upwas, and Winter Specials.' },
];

export default function Timeline() {
  return (
    <div className="relative mt-8">
      {/* Central Thin Line */}
      <div className="absolute left-[11.5px] top-3 bottom-0 w-[1px] bg-[#cebfae]"></div>
      
      {milestones.map((m, idx) => (
        <motion.div 
          key={idx} 
          className="mb-10 relative group pl-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
        >
          {/* Timeline Thick Circle Dot */}
          <div className="absolute left-0 top-[2px] w-[24px] h-[24px] rounded-full bg-[#FCF8F3] border-[3.5px] border-[#E06738] z-10 transition-colors duration-300"></div>
          
          <h4 className="font-display font-bold text-[17px] text-[#E06738] mb-1.5 leading-none">{m.year}</h4>
          <h5 className="font-sans font-bold text-[16px] text-brand-dark mb-2 tracking-tight">{m.title}</h5>
          <p className="text-[#5e6977] font-body text-[14.5px] leading-[1.65] max-w-[360px]">{m.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
