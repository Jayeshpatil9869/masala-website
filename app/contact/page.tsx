import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Clock, ChevronRight, PhoneCall } from "lucide-react";

export const metadata = {
  title: 'Contact Us | Gurukrupa Gruh Udyog',
  description: 'Get in touch with us for orders, wholesale inquiries, or just to say hello.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-24">
      {/* Contact Hero */}
      <section className="relative h-[65vh] min-h-[450px] w-full flex items-center justify-center overflow-hidden -mt-16 pt-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1210]/90 via-[#3d1911]/80 to-[#1a1210]/90" />
        </div>

        {/* Decorative noise/texture overlay optional */}
        <div className="absolute inset-0 z-[1] opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="container relative z-10 px-4 text-center text-brand-white flex flex-col items-center">
          <div className="inline-block border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Gurukrupa Gruh Udyog
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight drop-shadow-2xl">
            Get in Touch
          </h1>
          <p className="font-sans text-lg md:text-xl text-brand-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            We're just a message away. Reach out to us for orders, wholesale inquiries, or just to say hello.
          </p>
        </div>
        
        {/* Soft bottom fade to match background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f9fa] to-transparent z-10" />
      </section>

      <section className="relative z-20">
        <div className="container mx-auto px-4 pt-16 lg:px-8 max-w-7xl">

          <ContactCards />

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-8">

            {/* Left — Form */}
            <div className="w-full lg:w-[58%]">
              <ContactForm />
            </div>

            {/* Right — Info Panels */}
            <div className="w-full lg:w-[42%] flex flex-col gap-6">

              {/* Visit Us */}
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 sm:p-10 relative overflow-hidden group">
                {/* Decorative blob corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <h4 className="font-display font-bold text-2xl text-gray-900 mb-8 flex items-center gap-3 relative z-10">
                  <span className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 text-brand-orange">
                    <MapPin className="w-5 h-5" />
                  </span>
                  Visit Us
                </h4>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <MapPin className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-gray-900 text-sm mb-1 tracking-wide">GURUKRUPA GRUH UDYOG</p>
                      <p className="text-gray-500 leading-relaxed text-sm">S.No. 182/2, Plot No. 111,<br/>Nr. Jajuvadi, B/h., Sant Nirankari Kendra,<br/>Bhaygaon Shiwar, Malegaon<br/>Dist. Nashik - 423203 (M.S)</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent" />
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-gray-900 text-sm mb-1 tracking-wide">HOURS OF OPERATION</p>
                      <p className="text-gray-500 text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
                      <p className="text-red-400/80 font-medium text-xs mt-1 bg-red-50 inline-block px-2 py-0.5 rounded-md">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Static map placeholder */}
                <div
                  className="mt-8 rounded-2xl overflow-hidden h-36 bg-cover bg-center border border-gray-100 shadow-inner group-hover:shadow-lg transition-shadow duration-500 relative"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604357209793-fca5dca89f97?auto=format&fit=crop&q=80&w=600')" }}
                >
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-colors duration-500" />
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    <span className="text-white text-xs font-bold bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                      <MapPin className="w-3 h-3 text-brand-orange" />
                      Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Wholesale Card */}
              <div className="bg-[#1a1210] rounded-[2rem] p-8 sm:p-10 text-white relative overflow-hidden group shadow-[0_20px_40px_rgb(0,0,0,0.2)]">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-orange/30 transition-colors duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-red/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 text-xl border border-white/10 group-hover:-translate-y-1 transition-transform duration-500 shadow-xl">
                    <PhoneCall className="w-5 h-5 text-brand-orange" />
                  </div>
                  
                  <h4 className="font-display font-bold text-2xl text-white mb-3">Wholesale Inquiries</h4>
                  
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                    Interested in distributing our premium products? We offer competitive margins, priority shipping, and bespoke marketing support for verified dealers.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <a
                      href="mailto:gravitatespices01@gmail.com"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-cream text-brand-dark font-bold text-sm px-6 h-12 rounded-full transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex-1"
                    >
                      Apply to be a Dealer 
                      <ChevronRight className="w-4 h-4 text-brand-orange" />
                    </a>
                    
                    <a
                      href="tel:+919271580900"
                      className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold text-sm px-6 h-12 rounded-full border border-white/20 transition-all duration-300 flex-1"
                    >
                      Call Inquiries
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
