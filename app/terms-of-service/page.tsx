import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Gravitate',
  description: 'Terms of Service and commercial conditions for Gravitate.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white pb-24 select-none">
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] py-12 sm:py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="text-xs text-[#707072] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">Terms of Service</span>
          </nav>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#707072] block mb-2">
            Legal & Compliance
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] leading-none">
            Terms of Service
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-[#cacacb] p-8 sm:p-12 text-xs sm:text-sm text-[#39393b] leading-relaxed space-y-6">
          <p>
            Welcome to <strong className="text-[#111111]">Gravitate</strong>. By browsing our product range or initiating orders via our WhatsApp channel, you agree to these operational terms.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            1. Ordering & Dispatch Confirmation
          </h2>
          <p>
            Catalog product displays represent available inventory and formulations. Final order pricing, applicable taxes, shipping quotes, and batch dispatch dates are confirmed directly via our sales desk on WhatsApp.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            2. Product Quality & Variations
          </h2>
          <p>
            Because our spices are 100% natural and stone-ground without synthetic dye agents, natural slight variations in color tone and aroma intensity may occur between agricultural harvests.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            3. Wholesale Commercial Terms
          </h2>
          <p>
            Bulk commercial orders (50kg+) are fulfilled under Ex-Works (EXW) or mutually agreed freight delivery terms from our Malegaon facility.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <p className="text-xs text-[#707072]">
            For legal and contract inquiries: <strong>gravitatespices01@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
