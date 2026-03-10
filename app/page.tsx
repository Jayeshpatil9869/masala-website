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

export default async function Home() {
  let categories = [];
  let products = [];
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com';
    const [catRes, prodRes] = await Promise.all([
      fetch(`${backendUrl}/api/v1/categories`, { next: { revalidate: 3600 } }),
      fetch(`${backendUrl}/api/v1/products`, { next: { revalidate: 3600 } })
    ]);
    
    if (catRes.ok) categories = await catRes.json();
    if (prodRes.ok) products = await prodRes.json();
  } catch (err) {
    console.error("Failed to fetch homepage data", err);
  }
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
      <CategoryGrid categories={categories} />
      <FeaturedProducts featured={products.slice(0, 4)} />
      <BrandStory />
      <HowToOrder />
      <Testimonials />
    </>
  );
}
