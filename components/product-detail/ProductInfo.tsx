"use client"

import { useState } from 'react';
import { Minus, Plus, MessageSquare, ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { buildProductOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';

export default function ProductInfo({ product }: { product: any }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? product.variants[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = selectedVariant?.price || product.price || 0;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice || Math.round(currentPrice * 1.15);
  const currentSize = selectedVariant?.size || (hasVariants ? product.variants[0].size : 'Standard');
  const totalPrice = currentPrice * quantity;

  const waMessage = buildProductOrderMessage(`${product.name} (Qty: ${quantity})`, currentSize);
  const waLink = buildWhatsAppLink('919271580900', waMessage);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      weight: currentSize,
      price: currentPrice,
      image: product.image_url || (product.images && product.images[0]) || '',
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const formatCategory = (cat?: string) => {
    if (!cat) return 'Pure Ground Masala';
    return cat.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="flex flex-col h-full select-none">
      {/* Category / Collection Tag (Nike typography.caption-md #707072) */}
      <span className="text-xs uppercase font-semibold tracking-wider text-[#707072] mb-1">
        {formatCategory(product.category)}
      </span>

      {/* Product Title (Nike typography.heading-xl) */}
      <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#111111] leading-[0.95] mb-3">
        {product.name}
      </h1>

      {/* Price Row (Sale color #d30005) */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-2xl sm:text-3xl font-medium text-[#111111]">
          ₹{totalPrice}
        </span>
        {originalPrice > currentPrice && (
          <span className="text-sm text-[#707072] line-through">
            ₹{originalPrice * quantity}
          </span>
        )}
        <span className="text-[11px] sm:text-xs text-[#007d48] font-semibold bg-[#007d48]/10 px-2.5 py-0.5 rounded-full">
          In Stock · Fresh Batch
        </span>
      </div>

      <div className="h-[1px] bg-[#e5e5e5] mb-6" />

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#39393b] leading-relaxed mb-6 font-normal">
        {product.longDescription || product.description || 'Authentic formulation ground using low-heat stone mills to preserve volatile aroma and flavor.'}
      </p>

      {/* Size / Weight Selector (Nike pill chips) */}
      {hasVariants && (
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
            Select Size / Weight
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {product.variants.map((v: any) => {
              const isSelected = selectedVariant?.size === v.size;
              return (
                <button
                  key={v.size}
                  onClick={() => setSelectedVariant(v)}
                  className={`h-10 sm:h-11 px-4 sm:px-6 rounded-full text-xs font-medium transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#111111] text-white shadow-none'
                      : 'bg-[#f5f5f5] text-[#111111] hover:bg-[#e5e5e5] border border-transparent'
                  }`}
                >
                  {v.size} — ₹{v.price}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Pill Selector */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
          Quantity
        </div>
        <div className="flex items-center bg-[#f5f5f5] rounded-full w-fit px-2 py-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111] hover:bg-white active:scale-90 transition-all"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-medium text-sm text-[#111111]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111] hover:bg-white active:scale-90 transition-all"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Action Buttons (Nike button-primary and button-secondary) */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex-1 w-full inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-black active:scale-95 text-white font-medium text-sm h-12 px-6 sm:px-8 rounded-full transition-all duration-150 shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Order via WhatsApp</span>
        </a>

        <button
          onClick={handleAddToCart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f5f5f5] hover:bg-[#e5e5e5] active:scale-95 text-[#111111] font-medium text-sm h-12 px-6 sm:px-8 rounded-full transition-all duration-150"
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4 text-[#007d48]" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
