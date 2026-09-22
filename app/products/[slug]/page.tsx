import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Components
import ProductGallery from '@/components/product-detail/ProductGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductSpecs from '@/components/product-detail/ProductSpecs';
import RelatedProducts from '@/components/product-detail/RelatedProducts';
import OtherCategoryProducts from '@/components/product-detail/OtherCategoryProducts';

// Helper function to fetch product
async function getProduct(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Gravitate Masala',
    };
  }

  return {
    title: `${product.name} | Buy Fresh Masala Online | Gravitate`,
    description: product.description || `Buy pure and authentic ${product.name} online from Gravitate. Freshly ground masala in Malegaon, delivered pan-India.`,
    openGraph: {
      title: `${product.name} | Gravitate Masala`,
      description: product.description || `Buy pure and authentic ${product.name} online.`,
      images: [product.images?.[0] || product.image_url || '/Gravitate_logo.png'],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const product = await getProduct(slug);
  if (!product) return notFound();

  // Fallback images if not defined in data
  const images = product.images?.length > 0 ? product.images : [product.image_url];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": images,
    "description": product.description || `Buy pure and authentic ${product.name} online from Gravitate.`,
    "sku": product.slug,
    "brand": {
      "@type": "Brand",
      "name": "Gravitate"
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://gravitatee.com/products/${product.slug}`,
      "priceCurrency": "INR",
      "lowPrice": product.prices ? Math.min(...product.prices.map((p: any) => p.price)) : (product.price || 0),
      "highPrice": product.prices ? Math.max(...product.prices.map((p: any) => p.price)) : (product.price || 0),
      "offerCount": product.prices ? product.prices.length : 1,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Gravitate Masala"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Top Split Section - Hero */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-[#707072] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#111111] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#111111] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={images} />
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-6">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Middle Split Section - Detailed Info / Disclosure Rows */}
      <ProductSpecs product={product} />
      
      {/* Bottom Section - Same Category Selling */}
      <RelatedProducts currentProduct={product} />

      {/* Bottom Section - Other Categories Selling */}
      <OtherCategoryProducts currentCategory={product.category} />
      
    </div>
  );
}
