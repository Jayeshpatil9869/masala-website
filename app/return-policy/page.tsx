export const metadata = {
  title: 'Return Policy | Gurukrupa Gruh Udyog',
  description: 'Return Policy for Gurukrupa Gruh Udyog.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-cream/40 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-6">Return Policy</h1>
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-8"></div>
          <div className="prose prose-lg text-gray-600 font-body max-w-none space-y-6">
            <p>
              At <strong>Gurukrupa Gruh Udyog</strong>, we take immense pride in the quality and purity of our spices. Because our products are consumable food items, our return policy is strictly defined to ensure health and safety standards.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">1. Eligibility for Returns</h2>
            <p>
              We only accept returns or exchanges under the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product delivered is completely different from what was ordered.</li>
              <li>The packaging is severely damaged or tampered with upon arrival.</li>
              <li>The product has expired prior to the delivery date.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">2. Non-Returnable Items</h2>
            <p>
              Once a sealed masala packet has been opened, we cannot accept a return or issue a refund under any circumstances due to hygiene and food safety regulations.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">3. Reporting an Issue</h2>
            <p>
              If your order qualifies for a return, you must report the issue within <strong>48 hours</strong> of receiving your delivery. Please contact us via WhatsApp or email with your order details and photographic evidence of the issue. Our team will review the request and guide you through the replacement or refund process.
            </p>

            <hr className="my-8 border-gray-100" />
            
            <p className="text-sm">
              To initiate a return request, please message us on WhatsApp at <strong>+91 9271580900</strong> or email <strong>gravitatespices01@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
