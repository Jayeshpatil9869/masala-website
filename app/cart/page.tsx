"use client"

import { useCartStore } from '@/lib/store/cartStore';
import { Minus, Plus, Trash2, MessageSquare, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buildWhatsAppLink, buildCartOrderMessage } from '@/lib/whatsapp';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getCartTotal } = useCartStore();

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const waPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900';
  const checkoutMessage = buildCartOrderMessage(items, cartTotal);
  const checkoutLink = buildWhatsAppLink(waPhone, checkoutMessage);

  return (
    <div className="min-h-screen bg-white pt-6 pb-20 select-none">
      {/* Page Header */}
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] mb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[#111111] leading-none">
              Your Bag ({totalItems})
            </h1>
            <p className="text-xs text-[#707072] mt-1.5">
              Review your selected spice packs before confirming via direct WhatsApp dispatch.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {items.length === 0 ? (
          /* Empty State */
          <div className="border border-[#cacacb] p-12 sm:p-16 text-center max-w-lg mx-auto mt-8 rounded-none">
            <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-[#707072]" />
            </div>
            <h2 className="font-display text-3xl uppercase text-[#111111] mb-2">Your Bag is Empty</h2>
            <p className="text-xs text-[#707072] mb-6 leading-relaxed">
              Discover our fresh-milled masalas and single-origin powders to start your order.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white font-medium text-xs rounded-full px-8 py-3.5 transition-all active:scale-95"
            >
              <span>Explore Masalas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Cart Items List — Left Column */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#cacacb] mb-4">
                <span className="text-xs uppercase font-semibold text-[#111111] tracking-wider">
                  Product Details
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#707072] hover:text-[#d30005] transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Bag</span>
                </button>
              </div>

              <div className="divide-y divide-[#e5e5e5]">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      className="py-6 flex gap-4 sm:gap-6 items-start"
                    >
                      {/* Product Image on Soft Cloud */}
                      <Link href={`/products/${item.slug}`} className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#f5f5f5] flex-shrink-0 border border-[#e5e5e5]">
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-[#707072]" />
                          </div>
                        )}
                      </Link>

                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <Link href={`/products/${item.slug}`} className="hover:underline">
                            <h3 className="font-sans font-medium text-sm sm:text-base text-[#111111] leading-snug">
                              {item.name}
                            </h3>
                          </Link>
                          <span className="font-medium text-sm sm:text-base text-[#111111] flex-shrink-0">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>

                        {item.weight && (
                          <p className="text-xs text-[#707072] mt-1">
                            Size: <span className="font-medium text-[#111111]">{item.weight}</span>
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Pill */}
                          <div className="flex items-center bg-[#f5f5f5] rounded-full px-2 py-1">
                            <button 
                              className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-white rounded-full transition-colors disabled:opacity-30"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium text-xs text-[#111111]">
                              {item.quantity}
                            </span>
                            <button 
                              className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-white rounded-full transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-[#707072] hover:text-[#d30005] transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary — Right Column */}
            <div className="lg:col-span-4">
              <div className="bg-[#f5f5f5] p-6 sm:p-8 border border-[#e5e5e5] space-y-6">
                <h3 className="font-sans font-medium text-base uppercase tracking-tight text-[#111111]">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs border-b border-[#cacacb] pb-4">
                  <div className="flex justify-between text-[#707072]">
                    <span>Items Subtotal ({totalItems})</span>
                    <span className="text-[#111111] font-medium">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#707072]">
                    <span>Estimated Shipping</span>
                    <span className="text-[#007d48] font-medium">Calculated on WhatsApp</span>
                  </div>
                  <div className="flex justify-between text-[#707072]">
                    <span>Packaging & Quality Seal</span>
                    <span className="text-[#111111] font-medium">Complimentary</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline text-base font-medium text-[#111111]">
                  <span>Total</span>
                  <span className="text-xl font-semibold">₹{cartTotal}</span>
                </div>

                <a
                  href={checkoutLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-black active:scale-95 text-white font-medium text-sm h-14 rounded-full transition-all duration-150"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Proceed to WhatsApp Checkout</span>
                </a>

                <p className="text-[11px] text-center text-[#707072] leading-relaxed">
                  Our dispatch manager will verify availability, apply any active promotions, and confirm delivery details.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
