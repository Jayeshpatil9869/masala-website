"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, WashingMachine, ArchiveRestore, ShieldCheck, Package, ArrowRight } from 'lucide-react';

const steps = [
  { 
    id: 'sourcing',
    icon: Sprout, 
    title: '1. Sourcing', 
    shortDesc: 'Handpicked partner farms',
    desc: 'We procure our raw spices directly from partner farms across India. By skipping middlemen, we ensure absolute freshness and fair compensation to the farmers who nurture these crops.' 
  },
  { 
    id: 'cleaning',
    icon: WashingMachine, 
    title: '2. Cleaning', 
    shortDesc: 'Multi-stage purification',
    desc: 'Each batch undergoes a rigorous multi-stage sorting and cleaning process. We use advanced techniques to remove all impurities, dust, and stones, ensuring 100% safe consumption.' 
  },
  { 
    id: 'grinding',
    icon: ArchiveRestore, 
    title: '3. Stone Grinding', 
    shortDesc: 'Cold-temperature milling',
    desc: 'We strictly avoid high-speed machine grinding. Our low-temperature stone grinding method prevents heat build-up, preserving the volatile oils and original aroma of the spices.' 
  },
  { 
    id: 'quality',
    icon: ShieldCheck, 
    title: '4. Quality Check', 
    shortDesc: 'Rigorous lab testing',
    desc: 'Every batch is tested in FSSAI certified laboratories. We check for flavor profiles, color authenticity, and strictly ensure zero pesticide residue or artificial adulterations.' 
  },
  { 
    id: 'packaging',
    icon: Package, 
    title: '5. Packaging', 
    shortDesc: 'Aroma-lock sealing',
    desc: 'Our spices are packed in aroma-lock, moisture-proof foil packaging within hours of grinding. This seals in the freshness, ensuring the spices stay vibrant until they reach your kitchen.' 
  }
];

export default function QualityProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="py-20 bg-[#1A110B] rounded-[2.5rem] text-white overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] mx-auto">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d38b55]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center md:text-left mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl leading-tight md:text-[3rem] font-bold mb-4 text-brand-cream">
              The <span className="text-[#d38b55] italic pr-2">Gravitate</span> Standard
            </h2>
            <p className="text-white/60 font-body max-w-xl text-[15px] md:text-[17px] leading-relaxed">
              Discover the meticulous 5-step journey our spices take from lush farms straight to your kitchen shelf.
            </p>
          </motion.div>
        </div>

        {/* Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
          
          {/* Left Side: Interactive Step List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`group flex items-center gap-5 p-4 md:p-5 rounded-2xl text-left transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 border border-white/10 shadow-lg translate-x-2' 
                      : 'bg-transparent border border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'bg-[#d38b55] text-white shadow-[0_0_20px_rgba(211,139,85,0.4)]' : 'bg-[#2A1A0F] text-white/50 border border-white/5 group-hover:text-white/80'
                  }`}>
                    <step.icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-sans font-bold text-[16px] mb-1 transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>{step.title}</h4>
                    <p className={`font-body text-[13px] transition-colors ${isActive ? 'text-[#d38b55]' : 'text-white/40'}`}>{step.shortDesc}</p>
                  </div>
                  <div className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-[#d38b55]' : 'opacity-0 -translate-x-4'}`}>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Active Step Details */}
          <div className="w-full lg:w-7/12 relative min-h-[350px] lg:min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-center backdrop-blur-md"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#d38b55]/10 border border-[#d38b55]/20 flex items-center justify-center text-[#d38b55] mb-8">
                  {(() => {
                    const ActiveIcon = steps[activeStep].icon;
                    return <ActiveIcon className="w-10 h-10 stroke-[1.5]" />;
                  })()}
                </div>
                
                <h3 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-white mb-6 leading-tight">
                  {steps[activeStep].title.split('. ')[1]}
                </h3>
                
                <p className="font-body text-[16px] md:text-[18px] text-white/70 leading-[1.8]">
                  {steps[activeStep].desc}
                </p>
                
                {/* Progress indicator */}
                <div className="mt-12 flex gap-2">
                   {steps.map((_, i) => (
                     <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeStep ? 'w-12 bg-[#d38b55]' : 'w-4 bg-white/10'}`} />
                   ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
