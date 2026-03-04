import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Components
import ProductGallery from '@/components/product-detail/ProductGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductSpecs from '@/components/product-detail/ProductSpecs';
import RelatedProducts from '@/components/product-detail/RelatedProducts';
import ProductReviews from '@/components/product-detail/ProductReviews';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Fallback images if not defined in data
  const images = product.images || [product.image_url];

  return (
    <div className="min-h-screen bg-[#f8f6ec] pt-24">
      {/* Top Split Section - Hero */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl pb-16">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8 pt-4">
          <Link href="/products" className="hover:text-brand-orange transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-dark">Pantry</span>
          <span className="mx-2">/</span>
          <span className="text-brand-dark font-bold">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={images} />
          </div>

          {/* Right Column - Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Middle Split Section - Detailed Info */}
      <ProductSpecs product={product} />
      
      {/* Bottom Section - Cross Selling */}
      <RelatedProducts currentProduct={product} />

      {/* Bottom Section - Community */}
      <ProductReviews />
      
    </div>
  );
}
