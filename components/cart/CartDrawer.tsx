"use client"

import { useCartStore } from '@/lib/store/cartStore';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { ShoppingBag, Minus, Plus, Trash2, MessageSquare, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buildWhatsAppLink, buildCartOrderMessage } from '@/lib/whatsapp';
import { useEffect, useState } from 'react';

export default function CartDrawer({ transparent = false }: { transparent?: boolean }) {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getCartTotal } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button className="relative p-2.5 rounded-full text-[#111111] hover:bg-[#f5f5f5] transition-colors" aria-label="Cart">
        <ShoppingBag className="h-5 w-5" />
      </button>
    );
  }

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const waPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900';
  const checkoutMessage = buildCartOrderMessage(items, cartTotal);
  const checkoutLink = buildWhatsAppLink(waPhone, checkoutMessage);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative p-2.5 rounded-full text-[#111111] hover:bg-[#f5f5f5] transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#111111] text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-[420px] bg-white flex flex-col p-0 border-l border-[#cacacb] shadow-2xl rounded-none">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#e5e5e5] flex-shrink-0 text-left">
          <SheetTitle className="text-base font-medium uppercase tracking-tight text-[#111111] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              <span>Your Bag</span>
            </div>
            {totalItems > 0 && (
              <span className="text-xs font-normal text-[#707072] bg-[#f5f5f5] px-3 py-1 rounded-full">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-[#707072]" />
            </div>
            <h3 className="text-base font-medium text-[#111111] mb-1">Your bag is empty.</h3>
            <p className="text-xs text-[#707072] mb-6 max-w-[220px]">
              Explore our single-origin masalas and powders to begin.
            </p>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white font-medium text-xs rounded-full px-6 py-3 transition-all active:scale-95"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </SheetTrigger>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#e5e5e5]">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Image on Soft Cloud */}
                  <div className="relative w-16 h-16 bg-[#f5f5f5] overflow-hidden flex-shrink-0 border border-[#e5e5e5]">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-[#707072]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans font-medium text-xs text-[#111111] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="font-medium text-xs text-[#111111] flex-shrink-0">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {item.weight && (
                      <p className="text-[11px] text-[#707072] mt-0.5">
                        Size: {item.weight}
                      </p>
                    )}

                    {/* Quantity Selector + Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-[#f5f5f5] rounded-full px-1.5 py-0.5">
                        <button 
                          className="w-6 h-6 flex items-center justify-center text-[#111111] hover:bg-white rounded-full transition-colors disabled:opacity-30"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-medium text-xs text-[#111111]">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center text-[#111111] hover:bg-white rounded-full transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] text-[#707072] hover:text-[#d30005] transition-colors flex items-center gap-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary & Checkout Button */}
            <div className="p-6 border-t border-[#cacacb] bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#707072]">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[#707072]">
                  <span>Estimated Delivery</span>
                  <span className="text-[#007d48]">Calculated on WhatsApp</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#111111] pt-2 border-t border-[#e5e5e5]">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <a
                href={checkoutLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-medium h-12 rounded-full transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Checkout via WhatsApp (₹{cartTotal})</span>
              </a>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
