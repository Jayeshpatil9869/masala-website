"use client"

import { useState } from 'react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Award, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductInfo({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const currentPrice = product.prices[selectedWeight];
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      weight: selectedWeight,
      price: currentPrice,
      image: product.image_url,
    });
    toast.success(`${product.name} (${selectedWeight}) added to cart!`);
  };

  return (
    <div className="flex flex-col h-full pt-4 md:pt-0">
      {/* Reviews */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-[#c8982a]">
          {[1,2,3,4,5].map(i => (
             <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="text-gray-500 text-sm font-medium">{product.reviewCount || 0} Reviews</span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4 leading-tight">
        {product.name}
      </h1>
      
      <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
        {product.long_description || product.description}
      </p>

      {/* Select Weight */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-medium">
          Select Weight
        </div>
        <div className="flex gap-3">
          {product.weights.map(weight => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`h-10 px-5 rounded-full border border-[#2a1a0f] text-sm font-medium transition-colors ${
                selectedWeight === weight 
                  ? 'bg-[#2a1a0f] text-white' 
                  : 'bg-transparent text-[#2a1a0f] hover:bg-gray-100'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-[#e6e2d3] mb-8" />

      {/* Price & Add to Cart */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <div className="font-display font-bold text-4xl text-brand-dark">
          ₹{currentPrice}
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="flex-1 bg-brand-orange hover:bg-orange-700 text-white rounded-none h-14 text-sm font-bold tracking-widest uppercase flex items-center justify-between px-6"
        >
          <span>Add to Pantry</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Guarantees */}
      <div className="flex flex-col sm:flex-row gap-6 text-xs text-gray-500 tracking-wide mt-auto">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-brand-dark" />
          <span>Free shipping over ₹999</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-dark" />
          <span>Single-origin guarantee</span>
        </div>
      </div>
    </div>
  );
}
