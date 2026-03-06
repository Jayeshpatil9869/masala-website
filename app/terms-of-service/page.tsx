export const metadata = {
  title: 'Terms of Service | Gurukrupa Gruh Udyog',
  description: 'Terms of Service for Gurukrupa Gruh Udyog.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-brand-cream/40 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-6">Terms of Service</h1>
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-8"></div>
          <div className="prose prose-lg text-gray-600 font-body max-w-none space-y-6">
            <p>
              Welcome to <strong>Gurukrupa Gruh Udyog</strong>. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing this website and placing orders through our integrated WhatsApp channel, we assume you accept these terms and conditions in full. Do not continue to use our services if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">2. Product Information and Pricing</h2>
            <p>
              We strive to ensure that all details, descriptions, and prices of products appearing on the website are accurate. However, errors may occur. In the event of an error in the pricing or description of a product, we will inform you via WhatsApp before confirming your order.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">3. Ordering via WhatsApp</h2>
            <p>
              Our primary method of ordering is securely routed through WhatsApp. Final order confirmation, shipping quotes, and payment details will be finalized through direct communication with our sales representative on WhatsApp.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              Unless otherwise stated, Gurukrupa Gruh Udyog and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may view and/or print pages for your own personal use subject to restrictions set in these terms and conditions.
            </p>
            
            <hr className="my-8 border-gray-100" />
            
            <p className="text-sm">
              For any legal or service inquiries, please contact <strong>gravitatespices01@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
