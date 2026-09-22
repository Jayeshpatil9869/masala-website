import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Gravitate',
  description: 'Privacy Policy and data security terms for Gravitate.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pb-24 select-none">
      {/* Editorial Header */}
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] py-12 sm:py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="text-xs text-[#707072] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">Privacy Policy</span>
          </nav>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#707072] block mb-2">
            Legal & Compliance
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] leading-none">
            Privacy Policy
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-[#cacacb] p-8 sm:p-12 text-xs sm:text-sm text-[#39393b] leading-relaxed space-y-6">
          <p>
            At <strong className="text-[#111111]">Gravitate (Gurukrupa Gruh Udyog)</strong>, we value the trust you place in us and recognize the paramount importance of customer information privacy. This policy outlines how we handle and protect customer contact details.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            1. Information Collection
          </h2>
          <p>
            We only collect basic identification and contact info (such as your name, phone number, delivery address, and optional email) necessary to fulfill WhatsApp order dispatches and customer inquiries. We do not store or process sensitive banking passwords or credit card data on our servers.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            2. Utilization of Information
          </h2>
          <p>
            Your details are used strictly to coordinate spice packaging, calculate courier charges, generate invoice receipts, and provide dispatch tracking updates.
          </p>

          <h2 className="text-base font-semibold uppercase tracking-tight text-[#111111]">
            3. Third-Party Sharing
          </h2>
          <p>
            We never sell, rent, or trade your personal information. Delivery addresses are shared exclusively with certified courier partners for physical delivery fulfillment.
          </p>

          <div className="h-[1px] bg-[#e5e5e5]" />

          <p className="text-xs text-[#707072]">
            For questions regarding privacy, reach out to our desk at <strong>gravitatespices01@gmail.com</strong> or WhatsApp <strong>+91 9271580900</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
