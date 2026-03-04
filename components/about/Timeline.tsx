"use client"

import { motion } from 'framer-motion';

const milestones = [
  { year: '1978', title: 'The Beginning', desc: 'Started in a small kitchen hand-pounding spices for the local neighborhood.' },
  { year: '1995', title: 'First Retail Store', desc: 'Opened our first dedicated masala boutique in the historic spices market.' },
  { year: '2010', title: 'State-of-the-Art Mill', desc: 'Upgraded to a hygienic stone-grinding facility while preserving our traditional methods.' },
  { year: '2024', title: 'Going Direct-to-Consumer', desc: 'Launched our WhatsApp delivery service, reaching kitchens nationwide.' },
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
