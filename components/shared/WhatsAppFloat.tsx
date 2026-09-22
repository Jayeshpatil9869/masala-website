"use client"

import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900';
  const message = encodeURIComponent(
    "Hi Gravitate! I visited your website and would like to order pure masalas."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#111111] text-white hover:bg-black rounded-full shadow-xl border border-white/20 active:scale-95 transition-all select-none group"
      aria-label="Order on WhatsApp"
    >
      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#25D366] animate-pulse" />
      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
      <span className="text-xs font-medium tracking-tight">Order Help</span>
    </a>
  );
}
