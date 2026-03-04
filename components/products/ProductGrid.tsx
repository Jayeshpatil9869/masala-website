"use client"

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://gravitatee.com'}/api/v1/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
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
    let filtered = products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPrice = product.price <= maxPrice;
      
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [products, activeCategory, searchTerm, maxPrice, sortOrder]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-1/4 lg:flex-shrink-0 bg-[#FAFAF7] p-6 rounded-2xl border border-gray-100 h-fit sticky top-24">
          <ProductFilter 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
            onSearchChange={setSearchTerm}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200 gap-4">
            <div className="text-gray-600 font-medium">
              Showing <span className="font-bold text-brand-dark">{filteredProducts.length}</span> Products
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Sort by:</span>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-brand-dark cursor-pointer min-w-[150px]"
              >
                <option value="none">Featured</option>
                <option value="asc">Alphabetically, A-Z</option>
                <option value="desc">Alphabetically, Z-A</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="text-center py-20">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <h3 className="text-2xl font-display text-gray-500 mb-2">No products found for your search.</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search term.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); setMaxPrice(2000); }}
                className="bg-brand-red text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
