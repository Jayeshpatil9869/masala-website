import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: 'Contact Us | MasalaBrand',
  description: 'Get in touch with us for orders, wholesale inquiries, or just to say hello.',
};

export default function ContactPage() {
  return (
    <>
      {/* Contact Hero */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-red to-brand-orange">
          {/* Subtle pattern could go here */}
        </div>

        <div className="container relative z-10 px-4 text-center text-brand-white">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="font-body text-lg text-brand-cream/90 max-w-xl mx-auto">
            We're just a message away. Reach out to us for orders, bulk inquiries, or any feedback.
          </p>
        </div>
      </section>

      <section className="bg-brand-white pb-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          
          <ContactCards />

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Left side Form */}
            <div className="w-full lg:w-[60%]">
              <ContactForm />
            </div>

            {/* Right side Info */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">
              <div className="bg-brand-cream p-8 rounded-3xl border border-brand-orange/20">
                <h4 className="font-display font-bold text-2xl text-brand-dark mb-6">Our Location</h4>
                <div className="space-y-4 text-gray-700 font-body">
                  <p>
                    <strong>MasalaBrand H.Q.</strong><br/>
                    123 Spices Market, Old City Route<br/>
                    Maharashtra, India 411002
                  </p>
                  <p>
                    <strong>Hours of Operation:</strong><br/>
                    Mon - Sat: 9:00 AM - 7:00 PM<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="bg-[#2A1A0F] p-8 rounded-3xl text-brand-white shadow-xl">
                <h4 className="font-display font-bold text-2xl text-white mb-4">Wholesale Enquiries</h4>
                <p className="text-brand-cream/80 text-sm mb-6 leading-relaxed">
                  Interested in distributing our products? We offer competitive margins, priority shipping, and marketing support for our authorized retail partners.
                </p>
                <a 
                  href="mailto:wholesale@masalabrand.com"
                  className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Apply to be a Dealer
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
