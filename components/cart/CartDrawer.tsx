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
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { buildWhatsAppLink, buildCartOrderMessage } from '@/lib/whatsapp';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  // Fix hydration issues with zustand persist
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getCartTotal, clearCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="relative text-brand-dark hover:text-brand-red hover:bg-red-50">
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
        <Button variant="ghost" size="icon" className="relative text-brand-dark hover:text-brand-red hover:bg-red-50 transition-colors">
          <ShoppingBag className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-white flex flex-col p-0 border-l border-gray-100">
        <SheetHeader className="p-6 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="font-display text-2xl text-brand-dark flex items-center justify-between">
            Your Cart
            {totalItems > 0 && (
              <span className="text-sm font-sans font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-brand-orange border border-orange-100">
                <ShoppingBag className="w-10 h-10 opacity-50" />
             </div>
             <h3 className="font-sans font-bold text-xl text-gray-800 mb-2">Your cart is empty</h3>
             <p className="text-gray-500 font-body mb-8">Looks like you haven't added any spices yet.</p>
             <SheetTrigger asChild>
                <Button className="bg-brand-red hover:bg-red-800 text-white rounded-xl px-8">
                  Browse Products
                </Button>
             </SheetTrigger>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-sans font-bold text-brand-dark leading-tight mb-1">{item.name}</h4>
                          <span className="text-xs font-medium text-gray-500 bg-gray-200/50 px-2 py-0.5 rounded-md">
                            {item.weight}
                          </span>
                        </div>
                        <p className="font-bold text-brand-orange">₹{item.price * item.quantity}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-brand-red transition-colors disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-brand-red p-2 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-600">Total Amount</span>
                <span className="font-display font-bold text-2xl text-brand-dark">₹{cartTotal}</span>
              </div>
              <a 
                href={checkoutLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 text-white font-bold text-lg rounded-xl h-14 transition-colors shadow-lg shadow-green-500/20"
                onClick={() => {
                  // Optional: clear cart after successful order initialization
                  // setTimeout(clearCart, 1000); 
                }}
              >
                Checkout on WhatsApp
              </a>
              <p className="text-center text-xs text-gray-400 mt-4 leading-normal px-4">
                Shipping will be calculated and confirmed via WhatsApp by our team.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
