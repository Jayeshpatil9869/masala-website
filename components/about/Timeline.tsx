"use client"

import { motion } from 'framer-motion';

const milestones = [
  { year: '1978', title: 'The Bicycle Journey', desc: 'Started selling pure masalas door-to-door on a bicycle in the local neighborhood.' },
  { year: '1995', title: 'Wholesale & Retail Expansion', desc: 'Expanded operations, shifting from a bicycle to a dedicated manufacturing setup for wholesale.' },
  { year: '2010', title: 'Building the Empire', desc: 'Scaled our manufacturing facility to supply retailers and bulk buyers directly across the market.' },
  { year: '2024', title: 'The Signature Categories', desc: 'Cemented our legacy with dedicated Pooja, Powder, Box, Pouch, Upwas, and Winter Specials.' },
];

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-brand-orange/30 pl-8 ml-4 mt-10 md:ml-0 md:pl-10">
      {milestones.map((m, idx) => (
        <motion.div 
          key={idx} 
          className="mb-10 relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[45px] top-1 md:-left-[53px] w-6 h-6 rounded-full bg-brand-cream border-4 border-brand-orange"></div>
          
          <h4 className="font-display font-bold text-2xl text-brand-red mb-1">{m.year}</h4>
          <h5 className="font-sans font-bold text-lg text-brand-dark mb-2">{m.title}</h5>
          <p className="text-gray-600 font-body leading-relaxed max-w-sm">{m.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
