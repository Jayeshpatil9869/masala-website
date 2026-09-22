"use client"

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, ChevronDown, RefreshCw } from 'lucide-react';

const fallbackProducts = [
  {
    id: 'p1',
    name: 'Pure Ground Turmeric Powder',
    slug: 'pure-turmeric-powder',
    description: 'High curcumin single-origin Salem turmeric powder, cold-stone milled.',
    category: 'Powder Special · Salem Origin',
    price: 180,
    originalPrice: 210,
    is_bestseller: true,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '250g', price: 180 }, { size: '500g', price: 340 }, { size: '1kg', price: 650 }]
  },
  {
    id: 'p2',
    name: 'Pooja Special Masala Blend',
    slug: 'pooja-special-masala',
    description: 'Authentic 45-year heirloom formulation for festive and religious rituals.',
    category: 'Pooja Special · Traditional',
    price: 240,
    originalPrice: 280,
    is_bestseller: true,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '200g', price: 240 }, { size: '500g', price: 550 }]
  },
  {
    id: 'p3',
    name: 'Royal Garam Masala',
    slug: 'royal-garam-masala',
    description: 'Slow-roasted whole spices hand-ground for rich curry aromatics.',
    category: 'Blends · Slow Roasted',
    price: 220,
    originalPrice: 250,
    is_bestseller: true,
    is_sale: false,
    image_url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '100g', price: 120 }, { size: '250g', price: 220 }, { size: '500g', price: 420 }]
  },
  {
    id: 'p4',
    name: 'Kashmiri Red Chilli Powder',
    slug: 'kashmiri-chilli-powder',
    description: 'Vibrant natural ruby color with mild, aromatic warmth.',
    category: 'Powder Special · Natural Color',
    price: 210,
    originalPrice: 240,
    is_bestseller: true,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '250g', price: 210 }, { size: '500g', price: 390 }, { size: '1kg', price: 740 }]
  },
  {
    id: 'p5',
    name: 'Fresh Ground Coriander Powder (Dhana)',
    slug: 'coriander-powder',
    description: 'Crisp green-seed coriander ground at low milling temperatures.',
    category: 'Powder Special · 100% Pure',
    price: 160,
    originalPrice: 190,
    is_bestseller: false,
    is_sale: true,
    image_url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '250g', price: 160 }, { size: '500g', price: 300 }]
  },
  {
    id: 'p6',
    name: 'Upwas Special Fasting Masala',
    slug: 'upwas-special',
    description: 'Crafted with sendha namak and fasting-permitted spices for sacred fasts.',
    category: 'Upwas Special · Fasting Safe',
    price: 190,
    originalPrice: 220,
    is_bestseller: false,
    is_sale: false,
    image_url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=600',
    variants: [{ size: '200g', price: 190 }, { size: '500g', price: 440 }]
  }
];

export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-low' | 'price-high' | 'name-asc'>('featured');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/v1/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
        }
      } catch {
        setProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      router.push('/products', { scroll: false });
    } else {
      router.push(`/products?category=${category}`, { scroll: false });
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category?.toLowerCase().includes(activeCategory.toLowerCase()) || p.slug?.includes(activeCategory));
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((p) => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }

    list = list.filter((p) => (p.price || 0) <= maxPrice);

    if (sortOrder === 'price-low') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === 'price-high') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortOrder === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeCategory, searchTerm, maxPrice, sortOrder]);

  return (
    <div className="bg-white min-h-screen">
      {/* SUB-NAV STRIP (Nike PLP Sub-Nav) */}
      <div className="border-b border-[#e5e5e5] bg-white sticky top-16 sm:top-18 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-0 sm:h-14 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base md:text-lg font-medium text-[#111111] uppercase tracking-tight">
              All Products ({filteredProducts.length})
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
            {/* Hide/Show Filters Toggle Pill */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-[#111111] px-3 sm:px-4 py-2 rounded-full border border-[#cacacb] hover:border-[#111111] active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFilters ? 'Hide Filters' : 'Filters'}</span>
            </button>

            {/* Sort Dropdown Pill */}
            <div className="relative inline-flex items-center">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="appearance-none bg-[#f5f5f5] text-xs font-medium text-[#111111] pl-3 sm:pl-4 pr-7 sm:pr-8 py-2 rounded-full border border-transparent hover:bg-[#e5e5e5] cursor-pointer outline-none transition-colors"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low-High</option>
                <option value="price-high">Price: High-Low</option>
                <option value="name-asc">A-Z Name</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#111111] absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* PLP LAYOUT CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          
          {/* Left Rail Filter Sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-64 flex-shrink-0 bg-[#fbfbfb] lg:bg-transparent p-4 sm:p-5 lg:p-0 border lg:border-0 border-[#e5e5e5]">
              <div className="lg:sticky lg:top-36">
                <ProductFilter
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  onSearchChange={setSearchTerm}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                />
              </div>
            </aside>
          )}

          {/* Product Grid Area */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className="py-24 text-center text-xs text-[#707072] uppercase tracking-widest flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#111111]" />
                <span>Loading Gravitate Catalog...</span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 sm:py-24 text-center border border-[#cacacb] p-6 sm:p-8 rounded-none">
                <h3 className="font-display text-2xl sm:text-3xl uppercase text-[#111111] mb-2">
                  No Products Found
                </h3>
                <p className="text-xs text-[#707072] mb-6">
                  We couldn't find any masalas matching your selected criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                    setMaxPrice(2000);
                  }}
                  className="bg-[#111111] text-white text-xs font-medium px-6 py-3 rounded-full hover:bg-black active:scale-95 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-2 ${showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10`}>
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id || idx} product={product} priority={idx < 6} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
