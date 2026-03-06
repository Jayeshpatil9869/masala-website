import Image from "next/image";

export const metadata = {
  title: 'FSSAI Compliance | Gurukrupa Gruh Udyog',
  description: 'FSSAI Compliance and Certification Details for Gurukrupa Gruh Udyog.',
};

export default function FSSAICompliancePage() {
  return (
    <div className="min-h-screen bg-brand-cream/40 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4">FSSAI Compliance</h1>
              <div className="w-16 h-1 bg-brand-orange rounded-full"></div>
            </div>
            
            {/* Optional Logo Block */}
            <div className="hidden md:flex flex-shrink-0 items-center justify-center p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
               {/* Note: since there's no guaranteed FSSAI logo asset, we will use text, or a generic badge. We're keeping it simple for now, representing the license strictly in text as well. */}
               <span className="font-bold text-brand-orange text-lg">FSSAI</span>
            </div>
          </div>

          <div className="prose prose-lg text-gray-600 font-body max-w-none space-y-6 mt-8">
            <p className="text-xl font-medium text-brand-dark">
              License Number: <strong className="text-brand-orange">11521023000342</strong>
            </p>
            <p>
              <strong>Gurukrupa Gruh Udyog</strong> takes the safety and purity of our spices seriously. Our manufacturing unit in Malegaon, Nashik operates strictly under the rigorous guidelines and continuous scrutiny enforced by the <strong>Food Safety and Standards Authority of India (FSSAI)</strong>.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">Our Commitment to Safety</h2>
            <p>
              Holding a valid FSSAI license is not merely a legal checkbox for us—it validates our generational 45-year promise. From sourcing whole raw spices directly from vetted Indian farms to the complex process of sun-drying, roasting, grinding, and sealing—every batch is monitored for complete adulteration prevention.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Absolute ban on synthetic food colors and arbitrary bulk fillers.</li>
              <li>Immaculate facility hygiene preventing contamination.</li>
              <li>Stringent packaging norms guaranteeing freshness and prolonged shelf-life without the need for artificial preservatives.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">Public Inquiry</h2>
            <p>
              Consumers, wholesale partners, and regulatory bodies can verify our license validity anytime via the official FSSAI portal. Our registration asserts our legal operational compliance to manufacture and market ground spices, whole spice mixes, and proprietary masala formulas across India.
            </p>
            
            <hr className="my-8 border-gray-100" />
            
            <p className="text-sm">
              If you have any safety-related questions, our compliance officer is available via email at <strong>gravitatespices01@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
