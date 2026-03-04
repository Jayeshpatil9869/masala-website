import HeroBanner from "@/components/home/HeroBanner";
import TrustBadges from "@/components/home/TrustBadges";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import HowToOrder from "@/components/home/HowToOrder";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStory />
      <HowToOrder />
      <Testimonials />
    </>
  );
}
