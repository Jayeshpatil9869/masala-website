import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Delivery Info | Gravitate',
  description: 'Shipping and delivery guidelines for Gravitate Spices.',
};

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-white pb-24 select-none">
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] py-12 sm:py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="text-xs text-[#707072] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">Shipping Info</span>
          </nav>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#707072] block mb-2">
            Logistics & Delivery
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] leading-none">
            Shipping & Delivery
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-[#cacacb] p-8 sm:p-12 text-xs sm:text-sm text-[#39393b] leading-relaxed space-y-6">
          <p>
            <strong className="text-[#111111]">Gravitate</strong> operates as a primary spice manufacturer and supplier based out of Malegaon, Nashik, serving retail homes, caterers, and bulk distributors across India.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            1. Retail & Household Orders
          </h2>
          <p>
            For individual retail orders confirmed through WhatsApp, we dispatch via leading courier services within 24–48 hours of milling. Delivery timelines range between <strong>2 to 4 business days</strong> for Maharashtra, and <strong>4 to 7 business days</strong> for other Indian states.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            2. Wholesale & Commercial Freight
          </h2>
          <p>
            Bulk commercial orders (Pouches / Carton boxes / 50kg bags) are packed in moisture-proof barrier materials and dispatched via regional transport carriers. Lead time is <strong>3 to 5 business days</strong> to ensure fresh milling.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            3. Tracking & Confirmation
          </h2>
          <p>
            Tracking numbers and carrier receipts are immediately shared via WhatsApp upon carrier pickup.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <p className="text-xs text-[#707072]">
            For dispatch tracking: <strong>+91 96575 86213</strong> / <strong>+91 92715 80900</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
