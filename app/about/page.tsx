import Timeline from "@/components/about/Timeline";
import USPCards from "@/components/about/USPCards";
import QualityProcess from "@/components/about/QualityProcess";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Our Heritage & Story | Gravitate Spice Mill',
  description: 'Learn about Gravitate, an FSSAI certified masala manufacturer in Malegaon. We supply pure, chemical-free masala powder directly from our Nashik facility.',
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://gravitatee.com/#organization"
    },
    "name": "About Gravitate Masala",
    "description": "Learn about Gravitate, a 45-year old masala manufacturer in Malegaon. Discover our heritage, pure spice powders, and quality manufacturing process.",
    "url": "https://gravitatee.com/about"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Editorial Header with Authentic Spice Background Image & Gradient */}
      <section className="relative bg-[#1a0808] border-b border-[#e5e5e5] py-12 sm:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=2000"
            alt="Gravitate 45-Year Spice Heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90"
          />
          {/* Rich dark warm gradient overlay matching catalog theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a0808]/95 via-[#1a0606]/15 via-45% to-black/30 sm:to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-white/70 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Our Story</span>
          </nav>

          <span className="text-xs uppercase font-semibold tracking-widest text-[#007d48] bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 inline-block mb-3">
            Established 1979 · Malegaon & Nashik
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none max-w-4xl drop-shadow-md">
            Four Decades of Raw Purity & Spice Craft.
          </h1>
        </div>
      </section>

      {/* Story & Timeline 2-Column Split */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="pb-3 border-b border-[#cacacb]">
                <h2 className="text-xl sm:text-2xl font-medium uppercase tracking-tight text-[#111111]">
                  The Foundation
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#39393b] leading-relaxed">
                <p>
                  It started with a single bicycle. Our founder believed that the true soul of Indian food does not come from culinary complexity, but from the unadulterated purity of the spice harvest.
                </p>
                <p>
                  For over 45 years, <strong className="text-[#111111]">Gravitate (Gurukrupa Gruh Udyog)</strong> has preserved that singular conviction. We never add starch bulkers, artificial colorants, synthetic aromas, or chemical stabilizers. Every grain of our spice is a direct reflection of authentic farming origins.
                </p>
                <p>
                  Today, from our manufacturing facility in Bhaygaon Shiwar, Malegaon, we supply thousands of home kitchens, restaurants, caterers, and retail partners across Maharashtra with signature collections including Pooja Special, Powder Special, and Winter Blends.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white font-medium text-xs px-6 py-3.5 rounded-full transition-all active:scale-95"
                >
                  <span>Explore Our Masala Range</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Timeline */}
            <div className="lg:col-span-6 bg-[#f5f5f5] p-6 sm:p-8 border border-[#e5e5e5]">
              <div className="pb-3 border-b border-[#cacacb] mb-4">
                <h3 className="text-base font-medium uppercase tracking-tight text-[#111111]">
                  Historical Milestones
                </h3>
              </div>
              <Timeline />
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mb-10 pb-3 border-b border-[#cacacb]">
            <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-tight text-[#111111]">
              Why Choose Gravitate
            </h2>
            <p className="text-xs text-[#707072] mt-0.5">Core principles behind every batch milled at our facility</p>
          </div>
          <USPCards />
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <QualityProcess />
        </div>
      </section>
    </>
  );
}
