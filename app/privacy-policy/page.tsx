export const metadata = {
  title: 'Privacy Policy | Gravitate',
  description: 'Privacy Policy for Gravitate.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-cream/40 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-6">Privacy Policy</h1>
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-8"></div>
          <div className="prose prose-lg text-gray-600 font-body max-w-none space-y-6">
            <p>
              At <strong>Gravitate</strong>, we value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how we collect, use, share, and protect personal information when you use our website.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect personally identifiable information (such as your name, email address, phone number, and delivery address) when you place an order via our WhatsApp integration or contact us through our website. We do not store any sensitive financial data on our servers.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">2. Use of Demographic / Profile Data</h2>
            <p>
              We use your personal information to process orders, fulfill delivery requests, provide customer support, and communicate important updates regarding your purchases. We may also use this information to improve our services and customize your experience.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">3. Security Precautions</h2>
            <p>
              Our website has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. 
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">4. Your Consent</h2>
            <p>
              By using our website or by providing your information, you consent to the collection and use of the information you disclose on our website in accordance with this Privacy Policy.
            </p>
            
            <hr className="my-8 border-gray-100" />
            
            <p className="text-sm">
              If you have any questions about this Privacy Policy, please contact us at <strong>gravitatespices01@gmail.com</strong> or call <strong>+91 9271580900</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
