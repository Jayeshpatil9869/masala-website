"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, MessageCircle, Truck, Award } from 'lucide-react';

export default function ProductInfo({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const currentPrice = selectedVariant?.price || product.price || 0;
  
  const totalPrice = currentPrice * quantity;

  const waMessage = encodeURIComponent(
    `Hi, I would like to order the following:\n\n` +
    `*Product:* ${product.name}\n` +
    `*Size:* ${selectedVariant?.size || 'Default'}\n` +
    `*Quantity:* ${quantity}\n` +
    `*Total Price:* ₹${totalPrice}\n\n` +
    `Is this product available?`
  );
  const waLink = `https://wa.me/919271580900?text=${waMessage}`;

  return (
    <div className="flex flex-col h-full pt-4 md:pt-0">

      <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4 leading-tight">
        {product.name}
      </h1>
      
      <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
        {product.longDescription || product.description}
      </p>

      {/* Select Weight */}
      {product.variants && product.variants.length > 0 && (
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-medium">
            Select Weight
          </div>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v: any) => (
              <button
                key={v.size}
                onClick={() => setSelectedVariant(v)}
                className={`h-10 px-5 rounded-full border text-sm font-medium transition-all ${
                  selectedVariant?.size === v.size 
                    ? 'bg-brand-dark border-brand-dark text-white shadow-md' 
                    : 'bg-transparent border-gray-300 text-brand-dark hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-100 mb-6" />

      {/* Price */}
      <div className="font-sans font-bold text-4xl text-brand-dark mb-6">
        ₹{totalPrice > currentPrice ? totalPrice : currentPrice}
        {quantity > 1 && (
          <span className="text-sm font-normal text-gray-400 ml-2">(₹{currentPrice} × {quantity})</span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-medium">Quantity</div>
        <div className="flex items-center gap-0 border border-gray-200 rounded-full w-fit overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-brand-dark hover:bg-brand-cream transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-semibold text-brand-dark text-sm select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-brand-dark hover:bg-brand-cream transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Buy Button */}
      <Button 
        asChild
        className="w-full sm:w-auto bg-brand-green hover:bg-green-700 text-white rounded-full h-14 text-sm font-bold tracking-wide flex items-center justify-center gap-3 px-8 shadow-lg shadow-green-500/25 transition-all mb-8"
      >
        <a href={waLink} target="_blank" rel="noreferrer">
          <MessageCircle className="w-5 h-5" />
          <span>Buy with WhatsApp</span>
        </a>
      </Button>

      {/* Guarantees */}
      <div className="flex flex-col sm:flex-row gap-6 text-xs text-gray-500 tracking-wide">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center">
            <Truck className="w-4 h-4 text-brand-orange" />
          </div>
          <span>Free shipping over ₹999</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center">
            <Award className="w-4 h-4 text-brand-red" />
          </div>
          <span>Single-origin guarantee</span>
        </div>
      </div>
    </div>
  );
}
