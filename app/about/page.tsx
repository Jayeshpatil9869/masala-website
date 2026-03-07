import Timeline from "@/components/about/Timeline";
import USPCards from "@/components/about/USPCards";
import QualityProcess from "@/components/about/QualityProcess";

export const metadata = {
  title: 'Our Story | Gurukrupa Gruh Udyog',
  description: 'Learn about our 45-year legacy from a humble bicycle to a sprawling masala empire.',
};

export default function AboutPage() {
  return (
    <>
      {/* Brand Heritage Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden -mt-16 pt-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          {/* Warm Dark Overlay for vintage feel */}
          <div className="absolute inset-0 bg-[#2A1A0F]/80 mix-blend-multiply"></div>
        </div>

        <div className="container relative z-10 px-4 text-center text-brand-white">
          <div className="text-brand-orange text-sm font-medium tracking-widest uppercase mb-4">
            Since 2004
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 max-w-4xl mx-auto leading-tight">
            Crafting Pure Masala for India's Kitchens
          </h1>
        </div>
      </section>

      {/* Our Story Long Form & Timeline */}
      <section className="py-24 bg-brand-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="font-display text-4xl font-bold text-brand-dark mb-6">
                Our Roots
              </h2>
              <div className="w-16 h-1 bg-brand-orange rounded-full mb-8"></div>
              <div className="prose prose-lg text-gray-600 font-body">
                <p>
                  It started with a humble bicycle. Our founder pedaled through local neighborhoods, believing that the secret to a perfect meal wasn't just the recipe, but the absolute purity of the spices.
                </p>
                <p>
                  For over four decades, <strong className="text-brand-dark">Gurukrupa Gruh Udyog</strong> has held onto that single belief. We don't believe in shortcuts, artificial colors, or fillers. Every pinch of our masala is a testament to traditional Indian culinary heritage.
                </p>
                <p>
                  Today, that single bicycle has transformed into a vast masala manufacturing empire. We proudly supply wholesalers and retailers with our expansive ranges, including <span className="font-medium text-brand-red">Pooja Special, Powder Special, Box Products, Pouches, Upwas Special,</span> and <span className="font-medium">Winter Special</span>, ensuring our process and devotion remains unchanged.
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 bg-brand-cream p-8 md:p-12 rounded-3xl">
              <h3 className="font-display text-3xl font-bold text-brand-dark mb-2">The Journey</h3>
              <Timeline />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-brand-dark mb-4">
              Why Choose Us
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </div>
          <USPCards />
        </div>
      </section>

      {/* Quality Process */}
      <section className="pb-24 bg-gray-50 relative">
         <div className="container mx-auto px-4 lg:px-8">
          <QualityProcess />
         </div>
      </section>
    </>
  );
}
