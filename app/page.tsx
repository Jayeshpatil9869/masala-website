import HeroBanner from "@/components/home/HeroBanner";
// import TrustBadges from "@/components/home/TrustBadges";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import HowToOrder from "@/components/home/HowToOrder";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "Gravitate Masala | Best Masala Brand in Nashik & Malegaon",
  description: "Buy pure, fresh ground masala online in Malegaon & Nashik. We are an FSSAI certified masala manufacturer offering pooja special masala, turmeric powder, and wholesale spice powders.",
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gravitate Masala Home",
    "description": "Premium masala manufacturer in Malegaon and Nashik, supplying pure spice powders and wholesale masalas.",
    "publisher": {
      "@id": "https://gravitatee.com/#organization"
    }
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroBanner />
      {/* <TrustBadges /> */}
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStory />
      <HowToOrder />
      <Testimonials />
    </>
  );
}
