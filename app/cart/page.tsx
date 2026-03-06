"use client"

import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
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
      <div className="min-h-screen bg-brand-cream pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const waPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900';
  const checkoutMessage = buildCartOrderMessage(items, cartTotal);
  const checkoutLink = buildWhatsAppLink(waPhone, checkoutMessage);

  return (
    <div className="min-h-screen bg-brand-cream/40 pt-20">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 mb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-dark">Your Cart</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? 's' : ''} ready to order` : 'No items in cart yet'}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-orange transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center max-w-lg mx-auto mt-8">
            <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-brand-orange/40" />
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Discover our premium masalas and spices and add them to your cart.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-full px-8 py-3 transition-colors shadow shadow-orange-500/20"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Cart Items — Left Column */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-sans font-semibold text-base text-brand-dark">Items ({totalItems})</h2>
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-brand-red transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear all
                </button>
              </div>

              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60, height: 0, marginTop: 0, padding: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Product Image */}
                      <Link href={`/products/${item.slug}`} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-brand-cream/50 flex-shrink-0 border border-gray-100">
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-gray-200" />
                          </div>
                        )}
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <Link href={`/products/${item.slug}`} className="hover:text-brand-orange transition-colors">
                            <h3 className="font-sans font-semibold text-sm sm:text-base text-brand-dark leading-tight">{item.name}</h3>
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-brand-red transition-colors flex-shrink-0 p-1 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.weight && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg mb-3">
                            <Tag className="w-3 h-3" />
                            {item.weight}
                          </span>
                        )}

                        <div className="flex items-center justify-between">
                          {/* Qty Controls */}
                          <div className="flex items-center bg-brand-cream/60 rounded-xl border border-gray-200 overflow-hidden">
                            <button 
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-red-50 transition-colors disabled:opacity-30"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm text-brand-dark">{item.quantity}</span>
                            <button 
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-orange-50 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right">
                            <p className="font-bold text-base text-brand-dark">₹{item.price * item.quantity}</p>
                            {item.quantity > 1 && (
                              <p className="text-[11px] text-gray-400">₹{item.price} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary — Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
                <div className="p-5 border-b border-gray-100 bg-brand-cream/30">
                  <h2 className="font-sans font-bold text-base text-brand-dark">Order Summary</h2>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                    <span className="font-semibold text-brand-dark">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className="text-green-600 font-medium text-xs">Confirmed via WhatsApp</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-brand-dark">Total</span>
                    <span className="font-bold text-2xl text-brand-orange">₹{cartTotal}</span>
                  </div>
                </div>

                <div className="px-5 pb-5 space-y-2.5">
                  <a 
                    href={checkoutLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-green-600 text-white font-bold rounded-full h-12 text-sm transition-colors shadow-lg shadow-green-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </a>
                  <p className="text-center text-[10px] text-gray-400 leading-normal">
                    We'll confirm prices & delivery details via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
