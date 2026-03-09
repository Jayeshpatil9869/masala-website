import Timeline from "@/components/about/Timeline";
import USPCards from "@/components/about/USPCards";
import QualityProcess from "@/components/about/QualityProcess";
import Image from "next/image";

export const metadata = {
  title: 'Our Story | Gravitate - 22 Year Old Masala Company Nashik',
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
    "description": "Learn about Gravitate, a 22-year old masala manufacturer in Malegaon. Discover our heritage, pure spice powders, and quality manufacturing process.",
    "url": "https://gravitatee.com/about"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Brand Heritage Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          {/* Warm Dark Overlay for vintage feel */}
          <div className="absolute inset-0 bg-[#2A1A0F]/80 mix-blend-multiply"></div>
        </div>

        <div className="container relative z-10 px-4 text-center text-brand-white">
          <div className="text-brand-orange text-[13px] font-bold tracking-[0.2em] uppercase mb-4 mt-12">
            Since 2004
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-4 max-w-4xl mx-auto leading-[1.15]">
            Crafting Pure Masala for India's Kitchens
          </h1>
        </div>
      </section>

      {/* Our Story Long Form & Timeline */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* Left side text */}
            <div className="w-full lg:w-[45%] mt-4">
              <h2 className="font-display text-[2.5rem] font-bold text-brand-dark mb-2 tracking-tight">
                Our Roots
              </h2>
              <div className="w-14 h-[3px] bg-[#E06738] mb-8"></div>
              
              <div className="prose prose-lg text-gray-600 font-body">
                <p className="text-[14.5px] leading-[1.7] mb-4 text-[#5e6977]">
                  It started with a humble bicycle. Our founder pedaled through local neighborhoods, believing that the secret to a perfect meal wasn't just the recipe, but the absolute purity of the spices.
                </p>
                <p className="text-[14.5px] leading-[1.7] mb-4 text-[#5e6977]">
                  For over four decades, <strong className="text-brand-dark font-semibold">Gravitate</strong> has held onto that single belief. We don't believe in shortcuts, artificial colors, or fillers. Every pinch of our masala is a testament to traditional Indian culinary heritage.
                </p>
                <p className="text-[14.5px] leading-[1.7] text-[#5e6977]">
                  Today, that single bicycle has transformed into a vast masala manufacturing empire. We proudly supply wholesalers and retailers with our expansive ranges, including <span className="text-[#E06738]">Pooja Special, Powder Special, Box Products, Pouches, Upwas Special,</span> and <span className="text-[#5e6977] font-semibold">Winter Special</span>, ensuring our process and devotion remains unchanged.
                </p>
              </div>
            </div>
            
            {/* Right side journey */}
            <div className="w-full lg:w-[55%] bg-[#FCF8F3] p-8 md:p-12 rounded-[2rem]">
              <h3 className="font-display text-[26px] font-bold text-brand-dark mb-4">The Journey</h3>
              <Timeline />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-[#fafafa] relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="font-display text-[2.5rem] font-bold text-brand-dark tracking-tight bg-white px-2 mb-2 relative z-10 w-fit mx-auto">
              {/* Added a subtle decorative icon near the title to perfectly mimic image */}
              Why Choose Us
            </h2>
            <div className="flex items-center justify-center opacity-80 z-0 -mt-2">
               {/* Faint leaf graphic below title using SVG */}
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,1 L18,5 C18,5 12,8 10,14 C15,14 18,10 20,6 C22,10 25,14 30,14 C28,8 22,5 22,5 L20,1 Z" fill="#d38b55" opacity="0.8"/>
               </svg>
            </div>
          </div>
          <USPCards />
        </div>
      </section>

      {/* Quality Process */}
      <section className="pb-32 bg-[#fafafa] relative">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <QualityProcess />
         </div>
      </section>
    </>
  );
}
