"use client"

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createClient } from '@supabase/supabase-js';

// Delay Supabase initialization until runtime
// so NextJS static generation doesn't crash if env vars are missing

type ProductFilterProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
};

export default function ProductFilter({ 
  activeCategory, 
  onCategoryChange, 
  onSearchChange,
  maxPrice,
  onMaxPriceChange
}: ProductFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
      if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase credentials missing.');
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data } = await supabase.from('categories').select('id, name, slug').order('name');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue, onSearchChange]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search Bar */}
      <div>
        <h3 className="font-semibold text-lg text-brand-dark mb-4">Search</h3>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            type="text"
            placeholder="Search products..."
            className="pl-10 h-11 w-full rounded-lg text-sm border-gray-200 focus-visible:ring-brand-orange bg-white shadow-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-lg text-brand-dark mb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'all' 
                ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20' 
                : 'text-gray-600 hover:bg-gray-50 border border-transparent'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.slug 
                  ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20' 
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-lg text-brand-dark mb-4">Price Range</h3>
        <div className="px-2">
          <Input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-brand-orange"
          />
          <div className="flex justify-between items-center mt-3 text-sm text-gray-600 font-medium">
            <span>₹0</span>
            <span>Up to ₹{maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
