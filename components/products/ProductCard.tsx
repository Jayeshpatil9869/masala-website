"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ShoppingCart, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildProductOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { useCartStore } from '@/lib/store/cartStore';

type ProductProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    variants?: { size: string; price: number }[];
    price?: number;
    image_url?: string;
    is_bestseller?: boolean;
  };
  priority?: boolean;
};

export default function ProductCard({ product, priority = false }: ProductProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  const initialVariant = hasVariants ? product.variants![0] : null;
  
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const currentPrice = selectedVariant?.price || product.price || 0;
  const currentSize = selectedVariant?.size || '';

  const waMessage = buildProductOrderMessage(product.name, currentSize);
  const waLink = buildWhatsAppLink('919271580900', waMessage);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      weight: currentSize,
      price: currentPrice,
      image: product.image_url || '',
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div 
      className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group h-full"
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-brand-cream/50 flex items-center justify-center block">
        {product.is_bestseller && (
          <Badge className="absolute top-2 left-2 z-10 bg-brand-red hover:bg-red-700 text-white text-[9px] sm:text-[10px] border-0 px-1.5 sm:px-2 py-0.5">
            Best Seller
          </Badge>
        )}
        <Image 
          src={product.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
          alt={product.name} 
          width={240} 
          height={240} 
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain w-full h-full p-2 sm:p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-2.5 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-1">
        <div>
          <Link href={`/products/${product.slug}`} className="hover:text-brand-orange transition-colors">
            <h3 className="font-sans font-semibold text-xs sm:text-sm text-brand-dark line-clamp-2 sm:line-clamp-1 leading-tight">{product.name}</h3>
          </Link>
        </div>
        
        {/* Weight Selector */}
        {hasVariants && (
          <div className="flex flex-wrap gap-1">
            {product.variants!.map(v => (
              <button
                key={v.size}
                onClick={() => setSelectedVariant(v)}
                className={`text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border transition-all ${
                  selectedVariant?.size === v.size 
                    ? 'bg-brand-orange border-brand-orange text-white' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}

        {/* Price + Cart icon */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-sans font-bold text-sm sm:text-lg text-brand-dark">₹{currentPrice}</span>
          <button
            onClick={handleAddToCart}
            className={`rounded-full w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border transition-all duration-200 ${
              addedToCart
                ? 'bg-green-500 border-green-500 text-white scale-110'
                : 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
            }`}
            title="Add to cart"
            aria-label="Add to cart"
          >
            {addedToCart ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>
        </div>
        
        {/* CTA — WhatsApp button */}
        <Button asChild className="w-full bg-brand-green hover:bg-green-700 text-white rounded-lg h-7 sm:h-9 text-[10px] sm:text-[11px] font-semibold gap-1 sm:gap-1.5 px-2">
          <a href={waLink} target="_blank" rel="noreferrer">
            <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="hidden xs:inline sm:inline">Buy on WhatsApp</span>
            <span className="xs:hidden sm:hidden">WhatsApp</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
