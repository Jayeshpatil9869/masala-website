import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Contact & Orders | Gravitate Spice Mill',
  description: 'Get in touch with Gravitate for retail orders, catering bulk supply, or wholesale distribution across Nashik and Maharashtra.',
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://gravitatee.com/#organization"
    },
    "name": "Contact Gravitate Masala",
    "description": "Contact Gravitate Masala for pure spice powder orders, wholesale inquiries, and home delivery in Nashik and Malegaon.",
    "url": "https://gravitatee.com/contact"
  };

  return (
    <div className="bg-white min-h-screen pb-24 select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Editorial Header with Background Image & Gradient */}
      <section className="relative bg-[#1a0808] border-b border-[#e5e5e5] py-12 sm:py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
            alt="Gravitate Spice Dispatch Desk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Rich warm gradient overlay allowing photography to shine on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#380b0b]/90 via-[#260808]/20 to-[#140505]/10" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="text-xs text-white/70 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Contact & Orders</span>
          </nav>

          <span className="text-xs uppercase font-semibold tracking-widest text-[#007d48] bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 inline-block mb-3">
            Direct Mill Desk
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none max-w-4xl drop-shadow-md">
            Get in Touch with Our Dispatch Team.
          </h1>
          <p className="text-xs sm:text-sm text-white/85 mt-2 max-w-xl">
            We reply within 15 minutes for order confirmation, catering requirements, and retail distribution inquiries.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Contact Cards Row */}
        <div className="mb-12">
          <ContactCards />
        </div>

        {/* 2-Column Split: Form (Left) & Unit Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Manufacturing Unit Details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-[#f5f5f5] p-6 sm:p-8 border border-[#e5e5e5]">
              <h3 className="font-sans font-medium text-base uppercase tracking-tight text-[#111111] mb-6 pb-3 border-b border-[#cacacb]">
                Manufacturing & Registered Office
              </h3>

              <div className="space-y-6 text-xs text-[#39393b]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#111111] mb-1">GURUKRUPA GRUH UDYOG</p>
                    <p className="text-[#707072] leading-relaxed">
                      S.No. 182/2, Plot No. 111, Nr. Jajuvadi,<br />
                      B/h., Sant Nirankari Kendra, Bhaygaon Shiwar,<br />
                      Malegaon, Dist. Nashik - 423203 (Maharashtra)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#111111] mb-1">Operating Hours</p>
                    <p className="text-[#707072]">
                      Monday – Saturday: 9:00 AM – 7:00 PM IST<br />
                      Sunday: Closed (WhatsApp orders queued)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#111111] mb-1">Phone Dispatch</p>
                    <p className="text-[#707072]">+91 92715 80900 / +91 96575 86213</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#111111] mb-1">Email</p>
                    <p className="text-[#707072]">gravitatespices01@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] text-white p-6 sm:p-8 border border-[#39393b]">
              <span className="text-[10px] uppercase tracking-widest text-[#9e9ea0] font-semibold block mb-2">
                FSSAI License
              </span>
              <p className="font-display text-2xl tracking-tight text-white mb-1">
                Lic. No. 11521023000342
              </p>
              <p className="text-xs text-[#cacacb] leading-relaxed">
                Standard quality compliance certified for manufacturing, blending, packing, and wholesale distribution of pure spice powders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
