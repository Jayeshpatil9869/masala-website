"use client"

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type ProductFilterProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
};

const defaultCategories = [
  { id: '1', name: 'All Masalas & Spices', slug: 'all' },
  { id: '2', name: 'Pooja Special Masala', slug: 'pooja-special' },
  { id: '3', name: 'Powder Special Range', slug: 'powder-special' },
  { id: '4', name: 'Authentic Blends & Garam', slug: 'blends' },
  { id: '5', name: 'Box Products & Bulk', slug: 'box-products' },
  { id: '6', name: 'Upwas & Winter Special', slug: 'upwas-special' },
];

export default function ProductFilter({ 
  activeCategory, 
  onCategoryChange, 
  onSearchChange,
  maxPrice,
  onMaxPriceChange
}: ProductFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<any[]>(defaultCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'}/api/v1/categories`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCategories([{ id: 'all', name: 'All Masalas & Spices', slug: 'all' }, ...data]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchValue);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchValue, onSearchChange]);

  return (
    <div className="flex flex-col gap-6 w-full text-[#111111] select-none">
      {/* Search Filter Pill */}
      <div>
        <h4 className="text-xs uppercase font-semibold tracking-wider text-[#111111] mb-3">
          Search Catalog
        </h4>
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707072] w-4 h-4 pointer-events-none" />
          <input 
            type="text"
            placeholder="Search spice name..."
            className="h-11 sm:h-10 pl-10 pr-4 w-full bg-[#f5f5f5] text-base sm:text-xs text-[#111111] placeholder:text-[#707072] rounded-full border border-transparent focus:border-[#111111] focus:bg-white focus:ring-4 focus:ring-[#f5f5f5] outline-none transition-all"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[1px] bg-[#e5e5e5]" />

      {/* Category List with Nike Active Underline */}
      <div>
        <h4 className="text-xs uppercase font-semibold tracking-wider text-[#111111] mb-3">
          Categories
        </h4>
        <div className="flex flex-col space-y-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug || (cat.slug === 'all' && (!activeCategory || activeCategory === 'all'));
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                className={`w-full text-left py-2.5 sm:py-2 px-1 text-xs sm:text-xs font-medium transition-colors flex items-center justify-between active:scale-[0.99] ${
                  isSelected 
                    ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-2 decoration-[#111111]' 
                    : 'text-[#707072] hover:text-[#111111]'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-[#e5e5e5]" />

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs uppercase font-semibold tracking-wider text-[#111111]">
            Max Price
          </h4>
          <span className="text-xs font-semibold text-[#111111]">
            ₹{maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="25"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-[#111111] cursor-pointer"
        />
        <div className="flex justify-between items-center mt-2 text-[10px] text-[#707072]">
          <span>₹50</span>
          <span>₹2,000</span>
        </div>
      </div>
    </div>
  );
}
