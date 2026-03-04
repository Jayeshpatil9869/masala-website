"use client"

import { Leaf, Award, ThermometerSnowflake, Scale, FileText } from 'lucide-react';
import Image from 'next/image';

export default function ProductSpecs({ product }: { product: any }) {
  if (!product.specs) return null;

  return (
    <section className="bg-brand-cream/40 pt-20 pb-24 border-y border-brand-orange/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Specs List */}
          <div className="md:col-span-3">
             <div className="flex items-center gap-2 font-display font-bold text-xl text-brand-dark mb-6 border-b border-brand-orange/20 pb-4">
                <FileText className="w-5 h-5 text-brand-orange" />
                The Specs
             </div>
             <div className="space-y-6">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Region</div>
                  <div className="font-sans text-sm font-semibold text-brand-dark">{product.specs.region}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Harvest Date</div>
                  <div className="font-sans text-sm font-semibold text-brand-dark">{product.specs.harvest_date}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Key Feature</div>
                  <div className="font-sans text-sm font-semibold text-brand-orange">{product.specs.key_feature}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Process</div>
                  <div className="font-sans text-sm font-semibold text-brand-dark">{product.specs.process}</div>
                </div>
             </div>
          </div>

          {/* Column 2: Origin Story */}
          <div className="md:col-span-5">
             <div className="flex items-center gap-2 font-display font-bold text-xl text-brand-dark mb-6 border-b border-brand-orange/20 pb-4">
                <Leaf className="w-5 h-5 text-brand-green" />
                Origin Story
             </div>
             
             {product.origin_story && (
               <div className="relative">
                 <p className="font-body text-gray-700 leading-relaxed mb-4 text-justify">
                   <span className="float-left text-7xl font-display font-bold text-brand-red leading-[0.8] pr-3 pt-2">
                     {product.origin_story.text[0].charAt(0)}
                   </span>
                   {product.origin_story.text[0].substring(1)}
                 </p>
                 {product.origin_story.text.slice(1).map((para: string, i: number) => (
                    <p key={i} className="font-body text-gray-700 leading-relaxed mb-6 text-justify">
                      {para}
                    </p>
                 ))}

                 <div className="border border-dashed border-brand-orange/40 p-4 bg-brand-cream flex items-center gap-4 mt-8 rounded-xl">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-brown/20 flex-shrink-0">
                       <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" alt="Farmer" width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-display italic font-bold text-brand-dark text-sm">"{product.origin_story.quote.text}"</p>
                      <p className="text-[10px] font-sans text-brand-orange uppercase tracking-wider mt-1">- {product.origin_story.quote.author}</p>
                    </div>
                 </div>
               </div>
             )}
          </div>

          {/* Column 3: Sensory Profile */}
          <div className="md:col-span-4">
            <div className="bg-brand-dark p-8 h-full flex flex-col justify-between rounded-2xl shadow-xl">
              <h3 className="font-display font-bold text-2xl text-center text-white mb-8">Sensory Profile</h3>
              
              {product.sensory_profile && (
                <>
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-8">
                    <div className="absolute inset-0 border border-white/20 rounded-full"></div>
                    <div className="absolute inset-4 border border-white/15 rounded-full hidden sm:block"></div>
                    <div className="absolute inset-8 border border-white/10 rounded-full hidden sm:block"></div>
                    <div className="absolute w-full h-[1px] bg-white/10"></div>
                    <div className="absolute w-[1px] h-full bg-white/10"></div>
                    
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                       <polygon 
                         points="50,12 82,50 50,88 18,50" 
                         fill="rgba(230, 126, 34, 0.4)" 
                         stroke="#E67E22" 
                         strokeWidth="2" 
                       />
                    </svg>

                    <span className="absolute -top-6 text-[9px] uppercase tracking-widest text-white/60 font-sans">Earthy</span>
                    <span className="absolute -bottom-6 text-[9px] uppercase tracking-widest text-white/60 font-sans">Floral</span>
                    <span className="absolute -left-10 text-[9px] uppercase tracking-widest text-white/60 font-sans">Bitter</span>
                    <span className="absolute -right-8 text-[9px] uppercase tracking-widest text-white/60 font-sans">Heat</span>
                  </div>

                  <p className="font-sans text-xs text-white/60 text-center leading-relaxed px-4">
                    {product.sensory_profile.description}
                  </p>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
