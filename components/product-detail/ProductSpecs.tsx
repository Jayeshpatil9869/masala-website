"use client"

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductSpecs({ product }: { product: any }) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    details: true,
    origin: false,
    sensory: false,
    shipping: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <section className="bg-white py-12 border-t border-[#cacacb] select-none">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-4xl">
        
        <h2 className="text-xl font-medium uppercase tracking-tight text-[#111111] mb-6">
          Product Specifications & Information
        </h2>

        {/* STACKED PDP DISCLOSURE ROWS (Nike pdp-disclosure-row) */}
        <div className="divide-y divide-[#cacacb] border-t border-b border-[#cacacb]">
          
          {/* ROW 1: Product Details */}
          <div className="py-5">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-[#111111]"
            >
              <span>View Product Details & Ingredients</span>
              {openSections.details ? <ChevronUp className="w-4 h-4 text-[#111111]" /> : <ChevronDown className="w-4 h-4 text-[#111111]" />}
            </button>
            {openSections.details && (
              <div className="pt-4 text-xs text-[#39393b] leading-relaxed space-y-3">
                <p>
                  100% natural spices without added preservatives, starch fillers, MSG, artificial flavors, or synthetic colors.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2">
                  <div className="bg-[#f5f5f5] p-2.5 sm:p-3">
                    <span className="text-[10px] uppercase font-semibold text-[#707072] block">Form</span>
                    <span className="font-medium text-xs sm:text-sm text-[#111111]">Fresh Ground Powder</span>
                  </div>
                  <div className="bg-[#f5f5f5] p-2.5 sm:p-3">
                    <span className="text-[10px] uppercase font-semibold text-[#707072] block">Storage</span>
                    <span className="font-medium text-xs sm:text-sm text-[#111111]">Cool, Dry Airtight</span>
                  </div>
                  <div className="bg-[#f5f5f5] p-2.5 sm:p-3">
                    <span className="text-[10px] uppercase font-semibold text-[#707072] block">Shelf Life</span>
                    <span className="font-medium text-xs sm:text-sm text-[#111111]">12 Months Batch</span>
                  </div>
                  <div className="bg-[#f5f5f5] p-2.5 sm:p-3">
                    <span className="text-[10px] uppercase font-semibold text-[#707072] block">Certification</span>
                    <span className="font-medium text-xs sm:text-sm text-[#111111]">FSSAI Approved</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ROW 2: Origin & Process */}
          <div className="py-5">
            <button
              onClick={() => toggleSection('origin')}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-[#111111]"
            >
              <span>Origin, Sourcing & Milling Process</span>
              {openSections.origin ? <ChevronUp className="w-4 h-4 text-[#111111]" /> : <ChevronDown className="w-4 h-4 text-[#111111]" />}
            </button>
            {openSections.origin && (
              <div className="pt-4 text-xs text-[#39393b] leading-relaxed space-y-3">
                <p>
                  Sourced directly from certified spice-growing agricultural regions across Maharashtra, Karnataka, and Kerala. Ground in small batches at our Malegaon manufacturing facility using low-heat stone mills to ensure that the delicate essential oils do not evaporate during the grinding cycle.
                </p>
                <p className="text-[#707072]">
                  Manufactured & Marketed by: GURUKRUPA GRUH UDYOG, Malegaon Dist. Nashik - 423203.
                </p>
              </div>
            )}
          </div>

          {/* ROW 3: Sensory Profile */}
          <div className="py-5">
            <button
              onClick={() => toggleSection('sensory')}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-[#111111]"
            >
              <span>Sensory & Aroma Profile</span>
              {openSections.sensory ? <ChevronUp className="w-4 h-4 text-[#111111]" /> : <ChevronDown className="w-4 h-4 text-[#111111]" />}
            </button>
            {openSections.sensory && (
              <div className="pt-4 text-xs text-[#39393b] leading-relaxed">
                <p className="mb-3">
                  Delivers robust aromatic warmth, clean culinary depth, and natural golden/ruby pigmentation that blooms immediately upon heating with oil or ghee.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#f5f5f5] text-[#111111] text-[11px] font-medium rounded-full">Pungent & Warm</span>
                  <span className="px-3 py-1 bg-[#f5f5f5] text-[#111111] text-[11px] font-medium rounded-full">High Volatile Oil</span>
                  <span className="px-3 py-1 bg-[#f5f5f5] text-[#111111] text-[11px] font-medium rounded-full">Rich Color Bloom</span>
                </div>
              </div>
            )}
          </div>

          {/* ROW 4: Shipping & Returns */}
          <div className="py-5">
            <button
              onClick={() => toggleSection('shipping')}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-[#111111]"
            >
              <span>Shipping, Delivery & Quality Guarantee</span>
              {openSections.shipping ? <ChevronUp className="w-4 h-4 text-[#111111]" /> : <ChevronDown className="w-4 h-4 text-[#111111]" />}
            </button>
            {openSections.shipping && (
              <div className="pt-4 text-xs text-[#39393b] leading-relaxed space-y-2">
                <p>
                  Orders placed through WhatsApp or website are confirmed within 15 minutes and dispatched within 24 hours. We offer fast courier delivery across Maharashtra and pan-India.
                </p>
                <p className="text-[#707072]">
                  Freshness Guarantee: If you receive a damaged pouch or seal defect, contact our support on WhatsApp for an immediate free replacement.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
