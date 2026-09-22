import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import HowToOrder from "@/components/home/HowToOrder";
import Testimonials from "@/components/home/Testimonials";
import { fetchAllCategories, fetchAllProducts } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gravitate Masala | Best Masala Brand in Nashik & Malegaon",
  description: "Buy pure, fresh ground masala online in Malegaon & Nashik. We are an FSSAI certified masala manufacturer offering pooja special masala, turmeric powder, and wholesale spice powders.",
};

export default async function Home() {
  let categories: any[] = [];
  let products: any[] = [];

  try {
    const [fetchedCategories, fetchedProducts] = await Promise.all([
      fetchAllCategories(),
      fetchAllProducts(),
    ]);

    categories = fetchedCategories || [];
    products = fetchedProducts || [];
  } catch (err) {
    console.error("Failed to fetch homepage data:", err);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gravitate Masala Home",
    "description": "Premium masala manufacturer in Malegaon and Nashik, supplying pure spice powders and wholesale masalas.",
    "publisher": {
      "@id": "https://gravitatee.com/#organization",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroBanner />
      <CategoryGrid categories={categories} />
      <FeaturedProducts featured={products.slice(0, 8)} />
      <BrandStory />
      <HowToOrder />
      <Testimonials />
    </>
  );
}
