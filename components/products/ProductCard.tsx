"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildProductOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { useCartStore } from '@/lib/store/cartStore';
import { toast } from 'sonner';

// Need to match data structure
type ProductProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    weights: string[];
    prices: Record<string, number>;
    image_url: string;
    is_bestseller: boolean;
  }
};

export default function ProductCard({ product }: ProductProps) {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const currentPrice = product.prices[selectedWeight];

  const waMessage = buildProductOrderMessage(product.name, selectedWeight);
  const waLink = buildWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890', waMessage);

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
    <motion.div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group"
      whileHover={{ y: -8 }}
    >
      {/* Upper Area - Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-6 block">
        {product.is_bestseller && (
          <Badge className="absolute top-4 left-4 z-10 bg-brand-red hover:bg-red-700 text-white border-0">
            Best Seller
          </Badge>
        )}
        <Image 
          src={product.image_url} 
          alt={product.name} 
          width={300} 
          height={300} 
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`} className="hover:text-brand-orange transition-colors">
          <h3 className="font-sans font-semibold text-xl text-brand-dark mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
        
        {/* Weight Selector */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {product.weights.map(weight => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                selectedWeight === weight 
                  ? 'bg-brand-orange border-brand-orange text-white' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-brand-orange'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-brand-gold font-medium block">Price</span>
            <span className="font-sans font-bold text-xl text-brand-dark">₹{currentPrice}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-brand-green hover:bg-green-700 text-white rounded-xl">
            <a href={waLink} target="_blank" rel="noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Order Fast
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="px-3 rounded-xl border-gray-200 hover:bg-brand-orange hover:text-white hover:border-brand-orange text-gray-600 transition-colors group/cartbtn"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 group-hover/cartbtn:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
