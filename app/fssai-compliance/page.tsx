import Link from 'next/link';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'FSSAI Compliance & Food Safety | Gravitate',
  description: 'FSSAI License 11521023000342 certification details for Gravitate Masala manufacturing unit.',
};

export default function FSSAICompliancePage() {
  return (
    <div className="min-h-screen bg-white pb-24 select-none">
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] py-12 sm:py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="text-xs text-[#707072] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">FSSAI Compliance</span>
          </nav>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#707072] block mb-2">
            Quality Certification
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] leading-none">
            FSSAI Compliance & Standards
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-[#cacacb] p-8 sm:p-12 text-xs sm:text-sm text-[#39393b] leading-relaxed space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#f5f5f5] border border-[#e5e5e5] gap-4">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#707072] tracking-wider block">
                Official FSSAI Registration
              </span>
              <p className="font-display text-3xl uppercase text-[#111111] leading-tight">
                Lic. No. 11521023000342
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#007d48] bg-[#007d48]/10 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Active & Compliant</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            1. Manufacturing & Processing Protocol
          </h2>
          <p>
            <strong className="text-[#111111]">Gravitate (Gurukrupa Gruh Udyog)</strong> operates under strict manufacturing guidelines prescribed by the Food Safety and Standards Authority of India (FSSAI). Our plant facility in Bhaygaon Shiwar, Malegaon implements hygienic air separation, zero-contaminant sorting, and temperature-regulated grinding.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            2. Purity & Adulteration Safeguards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 bg-[#f5f5f5] p-3 text-xs text-[#111111]">
              <CheckCircle2 className="w-4 h-4 text-[#007d48] flex-shrink-0" />
              <span>Zero Artificial Coloring Agents</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f5f5f5] p-3 text-xs text-[#111111]">
              <CheckCircle2 className="w-4 h-4 text-[#007d48] flex-shrink-0" />
              <span>Zero Starch or Powder Bulkers</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f5f5f5] p-3 text-xs text-[#111111]">
              <CheckCircle2 className="w-4 h-4 text-[#007d48] flex-shrink-0" />
              <span>Moisture-Locked Barrier Packaging</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f5f5f5] p-3 text-xs text-[#111111]">
              <CheckCircle2 className="w-4 h-4 text-[#007d48] flex-shrink-0" />
              <span>Lab-Tested Curcumin & Volatile Oils</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <p className="text-xs text-[#707072]">
            For regulatory or compliance inquiries: <strong>gravitatespices01@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
