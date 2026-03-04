import { notFound } from 'next/navigation';
import Link from 'next/link';

// Components
import ProductGallery from '@/components/product-detail/ProductGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductSpecs from '@/components/product-detail/ProductSpecs';
import RelatedProducts from '@/components/product-detail/RelatedProducts';
import OtherCategoryProducts from '@/components/product-detail/OtherCategoryProducts';
import CategoryGrid from '@/components/home/CategoryGrid';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch product from new backend
  let product = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return notFound();
      throw new Error('Failed to fetch product');
    }
    product = await res.json();
  } catch (error) {
    console.error(error);
    return notFound();
  }

  // Fallback images if not defined in data
  const images = product.images?.length > 0 ? product.images : [product.image_url];

  return (
    <div className="min-h-screen bg-brand-white pt-6">
      {/* Top Split Section - Hero */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl pb-16">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8 pt-4">
          <Link href="/products" className="hover:text-brand-orange transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          {/* <span className="text-brand-dark">Pantry</span>
          <span className="mx-2">/</span> */}
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
      
      {/* Bottom Section - Same Category Selling */}
      <RelatedProducts currentProduct={product} />

      {/* Bottom Section - Other Categories Selling */}
      <OtherCategoryProducts currentCategory={product.category} />
      
    </div>
  );
}
