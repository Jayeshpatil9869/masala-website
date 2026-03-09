"use client"

import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Minus, Plus, Trash2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
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
      <button className={`relative p-2 rounded-full transition-colors ${transparent ? 'text-gray-700 hover:bg-gray-100 md:text-white md:hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}>
        <ShoppingCart className="h-5 w-5" />
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
          className={`relative p-2 rounded-full transition-colors ${
            transparent ? 'text-gray-700 hover:bg-gray-100 md:text-white md:hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-[400px] bg-white flex flex-col p-0 border-l border-gray-100 shadow-2xl">
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="font-sans text-lg font-bold text-brand-dark flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-brand-orange" />
              </div>
              <span>Cart</span>
            </div>
            {totalItems > 0 && (
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mb-5 border border-brand-cream/80">
              <ShoppingBag className="w-9 h-9 text-brand-orange/40" />
            </div>
            <h3 className="font-sans font-bold text-lg text-brand-dark mb-2">Your cart is empty</h3>
            <p className="text-gray-400 text-sm mb-7 leading-relaxed max-w-[200px]">
              Add your favourite masalas and spices to get started
            </p>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-full px-6 py-2.5 text-sm transition-colors"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SheetTrigger>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-brand-cream/40 rounded-2xl border border-brand-cream hover:border-brand-orange/20 transition-colors group">
                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100 shadow-sm">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Name + Price */}
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="font-sans font-semibold text-sm text-brand-dark leading-tight line-clamp-1">{item.name}</h4>
                        <p className="font-bold text-brand-dark text-sm flex-shrink-0">₹{item.price * item.quantity}</p>
                      </div>
                      {/* Weight tag */}
                      {item.weight && (
                        <span className="text-[10px] text-gray-400 font-medium bg-white border border-gray-100 px-2 py-0.5 rounded-md inline-block mb-2">
                          {item.weight}
                        </span>
                      )}
                      {/* Qty controls + Delete */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-red-50 transition-colors disabled:opacity-30"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-sm text-brand-dark">{item.quantity}</span>
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-orange-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-300 hover:text-brand-red transition-colors rounded-lg hover:bg-red-50"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Order Summary + CTA */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0 bg-white space-y-3">
              {/* Summary rows */}
              <div className="bg-brand-cream/60 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                  <span className="font-semibold text-brand-dark">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium text-xs">Confirmed via WhatsApp</span>
                </div>
                <div className="pt-2 border-t border-brand-cream flex justify-between items-center">
                  <span className="font-bold text-brand-dark">Total</span>
                  <span className="font-bold text-xl text-brand-orange">₹{cartTotal}</span>
                </div>
              </div>

              {/* View Cart link */}
              <SheetTrigger asChild>
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 w-full border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-semibold rounded-full h-11 text-sm transition-colors"
                >
                  View Cart
                </Link>
              </SheetTrigger>

              {/* WhatsApp Checkout */}
              <a 
                href={checkoutLink}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-center w-full bg-[#25D366] hover:bg-green-600 text-white font-bold rounded-full h-12 text-[15px] transition-all duration-300 shadow-[0_8px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_25px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 group px-6"
              >
                <MessageCircle className="w-5 h-5 absolute left-5" />
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4 absolute right-5 transition-transform group-hover:translate-x-1" />
              </a>

              <p className="text-center text-[10px] text-gray-400 leading-normal">
                Prices, weight & delivery confirmed via WhatsApp
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
