import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Clock, ChevronRight } from "lucide-react";

export const metadata = {
  title: 'Contact Us | MasalaBrand',
  description: 'Get in touch with us for orders, wholesale inquiries, or just to say hello.',
};

export default function ContactPage() {
  return (
    <>
      {/* Contact Hero */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden -mt-16 pt-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/80 to-brand-dark/70" />
        </div>

        <div className="container relative z-10 px-4 text-center text-brand-white pb-12 md:pb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="font-body text-lg text-brand-cream/90 max-w-xl mx-auto">
            We're just a message away. Reach out to us for orders, bulk inquiries, or any feedback.
          </p>
        </div>
      </section>

      <section className="bg-brand-white pb-24 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

          <ContactCards />

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

            {/* Left — Form */}
            <div className="w-full lg:w-[58%]">
              <ContactForm />
            </div>

            {/* Right — Info Panels */}
            <div className="w-full lg:w-[42%] flex flex-col gap-5">

              {/* Visit Us */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h4 className="font-display font-bold text-xl text-brand-dark mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand-cream rounded-lg flex items-center justify-center text-brand-orange">📍</span>
                  Visit Us
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-brand-dark">GURUKRUPA GRUH UDYOG</p>
                      <p className="text-gray-500 leading-relaxed">S.No. 182/2, Plot No. 111,<br/>Nr. Jajuvadi, B/h., Sant Nirankari Kendra,<br/>Bhaygaon Shiwar, Malegaon<br/>Dist. Nashik - 423203 (M.S)</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Clock className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-brand-dark">Hours of Operation</p>
                      <p className="text-gray-500">Mon – Sat: 9:00 AM – 7:00 PM</p>
                      <p className="text-gray-400 text-xs mt-0.5">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Static map placeholder */}
                <div
                  className="mt-5 rounded-xl overflow-hidden h-32 bg-cover bg-center border border-gray-100"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604357209793-fca5dca89f97?auto=format&fit=crop&q=80&w=600')" }}
                >
                  <div className="w-full h-full bg-brand-dark/30 flex items-center justify-center">
                    <span className="text-white text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full">📍 Maharashtra, India</span>
                  </div>
                </div>
              </div>

              {/* Wholesale Card */}
              <div className="bg-brand-dark rounded-2xl p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full -translate-x-4 -translate-y-8" />
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-4 text-xl">🤝</div>
                  <h4 className="font-display font-bold text-xl text-white mb-2">Wholesale Enquiries</h4>
                  <p className="text-brand-cream/60 text-sm mb-5 leading-relaxed">
                    Interested in distributing our products? Competitive margins, priority shipping, and full marketing support.
                  </p>
                  <a
                    href="mailto:gravitatespices01@gmail.com"
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                  >
                    Apply to be a Dealer <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}
