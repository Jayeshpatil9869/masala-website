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
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
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
      <Button variant="ghost" size="icon" className={`relative ${transparent ? 'text-white hover:bg-white/10' : 'text-brand-dark hover:text-brand-red hover:bg-red-50'}`}>
        <ShoppingBag className="h-6 w-6" />
      </Button>
    );
  }

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const waPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890';
  const checkoutMessage = buildCartOrderMessage(items, cartTotal);
  const checkoutLink = buildWhatsAppLink(waPhone, checkoutMessage);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-brand-dark hover:text-brand-red hover:bg-red-50'}`}>
          <ShoppingBag className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-sm bg-brand-dark text-white flex flex-col p-0 border-l border-white/10">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-white/10 flex-shrink-0">
          <SheetTitle className="font-display text-xl text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-orange/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-brand-orange" />
              </div>
              Your Pantry
            </div>
            {totalItems > 0 && (
              <span className="text-xs font-sans font-normal text-white/50 bg-white/10 px-3 py-1 rounded-full">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Package className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">Pantry is empty</h3>
            <p className="text-white/40 font-body text-sm mb-8 leading-relaxed">
              Add some masalas to your pantry and we'll prepare your order.
            </p>
            <SheetTrigger asChild>
              <Button className="bg-brand-orange hover:bg-orange-600 text-white rounded-full px-8 h-11">
                Browse Spices
              </Button>
            </SheetTrigger>
          </div>
        ) : (
          <>
            {/* Items */}
            <ScrollArea className="flex-1 max-h-[calc(100dvh-280px)]">
              <div className="p-5 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-4 bg-white/5 rounded-2xl border border-white/8 group hover:border-white/15 transition-colors">
                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h4 className="font-sans font-semibold text-sm text-white leading-tight truncate">{item.name}</h4>
                        <p className="font-bold text-brand-orange text-sm flex-shrink-0">₹{item.price * item.quantity}</p>
                      </div>
                      <span className="text-[11px] text-white/40 bg-white/8 px-2 py-0.5 rounded-md inline-block mb-2">
                        {item.weight}
                      </span>

                      <div className="flex items-center justify-between">
                        {/* Qty stepper */}
                        <div className="flex items-center bg-white/8 border border-white/10 rounded-lg overflow-hidden">
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-semibold text-sm text-white">{item.quantity}</span>
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-white/20 hover:text-red-400 p-1.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer: Order Summary + Checkout */}
            <div className="p-5 border-t border-white/10 flex-shrink-0 bg-brand-dark">
              {/* Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-white/50">
                  <span>Subtotal</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>Shipping</span>
                  <span className="text-green-400 text-xs">Confirmed via WhatsApp</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-display font-bold text-2xl text-brand-orange">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <a 
                href={checkoutLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between gap-2 bg-[#25D366] hover:bg-green-600 text-white font-bold text-sm rounded-full h-12 px-6 transition-colors shadow-lg shadow-green-500/20"
              >
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-center text-[11px] text-white/25 mt-3 leading-normal">
                We'll confirm prices, weight & delivery via WhatsApp
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
