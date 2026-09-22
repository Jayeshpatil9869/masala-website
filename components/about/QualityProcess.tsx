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
    desc: 'Each batch undergoes a rigorous multi-stage sorting and cleaning process. We use advanced mechanical air separation to remove all dust and stones, guaranteeing 100% pure raw ingredients.' 
  },
  { 
    id: 'grinding',
    icon: ArchiveRestore, 
    title: '3. Stone Grinding', 
    shortDesc: 'Cold-temperature milling',
    desc: 'We strictly avoid high-speed commercial steel pulverizers. Our low-temperature stone grinding method prevents heat build-up, preserving the volatile oils and original aroma of the spices.' 
  },
  { 
    id: 'quality',
    icon: ShieldCheck, 
    title: '4. Quality Check', 
    shortDesc: 'Rigorous lab testing',
    desc: 'Every batch is tested in FSSAI certified laboratories. We verify curcumin content, moisture levels, and strictly ensure zero pesticide residue or artificial adulterants.' 
  },
  { 
    id: 'packaging',
    icon: Package, 
    title: '5. Packaging', 
    shortDesc: 'Aroma-lock sealing',
    desc: 'Our spices are hermetically sealed in multi-layer barrier foil pouches within hours of milling, locking in pungent volatile notes until opened in your kitchen.' 
  }
];

export default function QualityProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#111111] text-white p-6 sm:p-10 lg:p-16 border border-[#39393b] rounded-none select-none">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-[#39393b]">
          <span className="text-xs uppercase tracking-widest text-[#9e9ea0] font-medium block mb-2">
            Manufacturing Standard
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-none">
            The 5-Step Purity Method
          </h2>
        </div>

        {/* 2-Column Process Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Step Selectors (Horizontal scroll on mobile, stacked on lg) */}
          <div className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar snap-x">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center justify-between p-3.5 sm:p-4 text-left transition-all rounded-none flex-shrink-0 min-w-[170px] lg:min-w-0 snap-start active:scale-95 ${
                    isActive 
                      ? 'bg-white text-[#111111] font-semibold shadow-sm' 
                      : 'bg-[#191919] lg:bg-transparent text-[#9e9ea0] hover:text-white hover:bg-white/5 border border-[#39393b] lg:border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <step.icon className={`w-4 h-4 ${isActive ? 'text-[#111111]' : 'text-[#9e9ea0]'}`} />
                    <span className="text-xs sm:text-sm tracking-tight">{step.title}</span>
                  </div>
                  <ArrowRight className={`hidden lg:block w-4 h-4 ${isActive ? 'opacity-100 text-[#111111]' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Active Step Detail Card */}
          <div className="lg:col-span-7 bg-[#191919] p-6 sm:p-8 lg:p-10 border border-[#39393b] min-h-[260px] sm:min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#9e9ea0]">
                    {steps[activeStep].shortDesc}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-none">
                  {steps[activeStep].title.split('. ')[1]}
                </h3>

                <p className="text-xs sm:text-sm text-[#cacacb] leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step Progress Ticks */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-[#39393b] flex gap-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 transition-all ${
                    i === activeStep ? 'bg-white' : 'bg-white/20'
                  }`} 
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
