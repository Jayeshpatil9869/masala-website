"use client"

import { Product } from '@/lib/data';
import Image from 'next/image';
import { FileText, Leaf } from 'lucide-react';

export default function ProductSpecs({ product }: { product: Product }) {
  if (!product.specs) return null;

  return (
    <section className="bg-[#fcfaf7] pt-20 pb-24 border-y border-[#e6e2d3]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Specs List */}
          <div className="md:col-span-3">
             <div className="flex items-center gap-2 font-display font-bold text-xl text-brand-dark mb-6 border-b border-[#e6e2d3] pb-4">
                <FileText className="w-5 h-5" />
                The Specs
             </div>
             <div className="space-y-6">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Region</div>
                  <div className="font-mono text-sm font-semibold text-brand-dark">{product.specs.region}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Harvest Date</div>
                  <div className="font-mono text-sm font-semibold text-brand-dark">{product.specs.harvest_date}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Key Feature</div>
                  <div className="font-mono text-sm font-semibold text-brand-dark">{product.specs.key_feature}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Process</div>
                  <div className="font-mono text-sm font-semibold text-brand-dark">{product.specs.process}</div>
                </div>
             </div>
          </div>

          {/* Column 2: Origin Story */}
          <div className="md:col-span-5">
             <div className="flex items-center gap-2 font-display font-bold text-xl text-brand-dark mb-6 border-b border-[#e6e2d3] pb-4">
                <Leaf className="w-5 h-5" />
                Origin Story
             </div>
             
             {product.origin_story && (
               <div className="relative">
                 <p className="font-body text-gray-700 leading-relaxed mb-4 text-justify">
                   <span className="float-left text-7xl font-display font-bold text-brand-orange leading-[0.8] pr-3 pt-2">
                     {product.origin_story.text[0].charAt(0)}
                   </span>
                   {product.origin_story.text[0].substring(1)}
                 </p>
                 {product.origin_story.text.slice(1).map((para, i) => (
                    <p key={i} className="font-body text-gray-700 leading-relaxed mb-6 text-justify">
                      {para}
                    </p>
                 ))}

                 <div className="border border-dashed border-[#c8982a]/50 p-4 bg-[#f8f6ec] flex items-center gap-4 mt-8">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                       <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" alt="Farmer" width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-display italic font-bold text-brand-dark">"{product.origin_story.quote.text}"</p>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-1">- {product.origin_story.quote.author}</p>
                    </div>
                 </div>
               </div>
             )}
          </div>

          {/* Column 3: Sensory Profile (CSS Radar Chart approximation) */}
          <div className="md:col-span-4">
            <div className="bg-[#f8f6ec] border-2 border-brand-dark p-8 h-full flex flex-col justify-between">
              <h3 className="font-display font-bold text-2xl text-center text-brand-dark mb-8">Sensory Profile</h3>
              
              {product.sensory_profile && (
                <>
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-8">
                    {/* Simplified CSS representation of a radar chart */}
                    <div className="absolute inset-0 border border-[#e6e2d3] rounded-full"></div>
                    <div className="absolute inset-4 border border-[#e6e2d3] rounded-full hidden sm:block"></div>
                    <div className="absolute inset-8 border border-[#e6e2d3] rounded-full hidden sm:block"></div>
                    <div className="absolute w-full h-[1px] bg-[#e6e2d3]"></div>
                    <div className="absolute w-[1px] h-full bg-[#e6e2d3]"></div>
                    
                    {/* The "Shape" - just a decorative polygon representing the profile */}
                    <svg className="absolute inset-0 w-full h-full text-[#c8982a]/60" viewBox="0 0 100 100">
                       <polygon 
                         points="50,15 80,50 50,90 20,50" 
                         fill="currentColor" 
                         stroke="#8a610f" 
                         strokeWidth="2" 
                       />
                    </svg>

                    {/* Labels */}
                    <span className="absolute -top-6 text-[9px] uppercase tracking-widest text-gray-500 font-mono">Earthy</span>
                    <span className="absolute -bottom-6 text-[9px] uppercase tracking-widest text-gray-500 font-mono">Floral</span>
                    <span className="absolute -left-10 text-[9px] uppercase tracking-widest text-gray-500 font-mono">Bitter</span>
                    <span className="absolute -right-8 text-[9px] uppercase tracking-widest text-gray-500 font-mono">Heat</span>
                  </div>

                  <p className="font-mono text-xs text-gray-600 text-center leading-relaxed px-4">
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
