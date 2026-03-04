"use client"

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { categories } from '@/lib/data';
import { Input } from '@/components/ui/input';

type ProductFilterProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
};

export default function ProductFilter({ activeCategory, onCategoryChange, onSearchChange }: ProductFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue, onSearchChange]);

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input 
          type="text"
          placeholder="Search for masala..."
          className="pl-12 h-14 rounded-full text-lg border-gray-200 focus-visible:ring-brand-orange bg-white shadow-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto pb-4 hide-scrollbar justify-start md:justify-center gap-3 px-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-colors ${
            activeCategory === 'all' 
              ? 'bg-brand-red text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All Masalas
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-colors ${
              activeCategory === cat.slug 
                ? 'bg-brand-red text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
