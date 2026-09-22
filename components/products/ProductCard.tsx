"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, MessageSquare } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { buildProductOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';

type ProductProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category?: string;
    variants?: { size: string; price: number; originalPrice?: number }[];
    price?: number;
    originalPrice?: number;
    image_url?: string;
    is_bestseller?: boolean;
    is_sale?: boolean;
  };
  priority?: boolean;
};

const formatCategory = (cat?: string) => {
  if (!cat) return 'Pure Ground Masala';
  return cat
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default function ProductCard({ product, priority = false }: ProductProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  const initialVariant = hasVariants ? product.variants![0] : null;

  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = selectedVariant?.price || product.price || 0;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice || Math.round(currentPrice * 1.15);
  const isSale = product.is_sale || originalPrice > currentPrice;
  const currentSize = selectedVariant?.size || (hasVariants ? product.variants![0].size : '');

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
    <div className="group flex flex-col bg-white text-[#111111] rounded-none select-none h-full">
      {/* 1:1 SQUARE OR 4:5 IMAGE STAGED ON SOFT CLOUD (#f5f5f5) */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square sm:aspect-[4/5] w-full bg-[#f5f5f5] overflow-hidden flex items-center justify-center rounded-none block"
      >
        {/* Promo Badge */}
        {product.is_bestseller && (
          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 bg-white text-[#111111] text-[9px] sm:text-[11px] font-medium tracking-wide border border-[#cacacb] px-2 py-0.5 rounded-full shadow-none">
            Best Seller
          </span>
        )}

        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'}
          alt={product.name}
          width={400}
          height={400}
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain w-full h-full p-2 sm:p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      {/* METADATA SECTION */}
      <div className="pt-2 sm:pt-3 pb-1 flex flex-col flex-1 bg-white">
        {/* Swatch Pill / Weight Selector */}
        {hasVariants && (
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
            {product.variants!.map((v) => {
              const isSelected = selectedVariant?.size === v.size;
              return (
                <button
                  key={v.size}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(v);
                  }}
                  className={`text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all min-h-[22px] sm:min-h-[26px] flex items-center justify-center active:scale-95 ${
                    isSelected
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'bg-[#f5f5f5] text-[#707072] hover:text-[#111111] hover:bg-[#e5e5e5]'
                  }`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        )}

        {/* Product Name (Nike typography.body-strong) */}
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="font-sans font-medium text-xs sm:text-sm text-[#111111] leading-tight line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Formatted Category / Subtitle */}
        <p className="text-[10px] sm:text-xs text-[#707072] mt-0.5 line-clamp-1">
          {formatCategory(product.category)}
        </p>

        {/* Price Row (Sale color #d30005 + strike-through) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
          <span className={`text-xs sm:text-sm font-semibold ${isSale ? 'text-[#d30005]' : 'text-[#111111]'}`}>
            ₹{currentPrice}
          </span>
          {isSale && (
            <span className="text-[10px] sm:text-[11px] text-[#707072] line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Action Button Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-auto pt-2.5 sm:pt-3">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 bg-[#111111] hover:bg-black active:scale-95 text-white text-[11px] sm:text-xs font-medium h-8 sm:h-9.5 px-2 sm:px-3 rounded-full transition-all duration-150"
          >
            <MessageSquare className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>Order</span>
          </a>

          <button
            onClick={handleAddToCart}
            className={`w-8 h-8 sm:w-9.5 sm:h-9.5 flex-shrink-0 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-95 ${
              addedToCart
                ? 'bg-[#007d48] border-[#007d48] text-white scale-105'
                : 'border-[#cacacb] bg-white text-[#111111] hover:border-[#111111] hover:bg-[#f5f5f5]'
            }`}
            title="Add to cart"
            aria-label="Add to cart"
          >
            {addedToCart ? <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
