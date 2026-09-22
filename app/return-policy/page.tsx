import Link from 'next/link';

export const metadata = {
  title: 'Return & Replacement Policy | Gravitate',
  description: 'Return and replacement policy for Gravitate consumable food products.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white pb-24 select-none">
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] py-12 sm:py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="text-xs text-[#707072] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">Return Policy</span>
          </nav>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#707072] block mb-2">
            Quality Assurance
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] leading-none">
            Returns & Replacements
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-[#cacacb] p-8 sm:p-12 text-xs sm:text-sm text-[#39393b] leading-relaxed space-y-6">
          <p>
            Because spices are consumable, aroma-sealed food items, returns are regulated to ensure absolute safety and food hygiene standards.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            1. Defective or Damaged In-Transit Items
          </h2>
          <p>
            If your parcel arrives with physical seal damage, torn outer foil, or incorrect product variants, please report the issue within <strong>48 hours</strong> of delivery.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            2. Immediate Free Replacement
          </h2>
          <p>
            Upon verifying a photo of the damaged seal on WhatsApp, our team will dispatch an immediate free replacement batch with zero return freight hassle.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            3. Opened Consumables
          </h2>
          <p>
            Unsealed packages cannot be returned once opened due to FSSAI food safety regulations.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <p className="text-xs text-[#707072]">
            To request replacement assistance: WhatsApp <strong>+91 9271580900</strong> with your invoice photo.
          </p>
        </div>
      </div>
    </div>
  );
}
