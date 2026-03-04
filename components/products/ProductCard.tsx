"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildProductOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';

// Need to match data structure
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
  }
};

export default function ProductCard({ product }: ProductProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  const initialVariant = hasVariants ? product.variants![0] : null;
  
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  
  const currentPrice = selectedVariant?.price || product.price || 0;
  const currentSize = selectedVariant?.size || '';

  const waMessage = buildProductOrderMessage(product.name, currentSize);
  const waLink = buildWhatsAppLink('919271580900', waMessage);

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-brand-cream/50 flex items-center justify-center block">
        {product.is_bestseller && (
          <Badge className="absolute top-3 left-3 z-10 bg-brand-red hover:bg-red-700 text-white text-[10px] border-0 px-2 py-0.5">
            Best Seller
          </Badge>
        )}
        <Image 
          src={product.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
          alt={product.name} 
          width={240} 
          height={240} 
          className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <Link href={`/products/${product.slug}`} className="hover:text-brand-orange transition-colors">
            <h3 className="font-sans font-semibold text-sm text-brand-dark line-clamp-1">{product.name}</h3>
          </Link>
          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{product.description}</p>
        </div>
        
        {/* Weight Selector — only show if variants exist */}
        {hasVariants && (
          <div className="flex flex-wrap gap-1.5">
            {product.variants!.map(v => (
              <button
                key={v.size}
                onClick={() => setSelectedVariant(v)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
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

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-sans font-bold text-lg text-brand-dark">₹{currentPrice}</span>
        </div>
        
        {/* CTA */}
        <Button asChild className="w-full bg-brand-green hover:bg-green-700 text-white rounded-lg h-9 text-[11px] font-semibold gap-1.5">
          <a href={waLink} target="_blank" rel="noreferrer">
            <MessageCircle className="w-3.5 h-3.5" />
            Buy on WhatsApp
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
