"use client"

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppFloat() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919271580900';
  const message = encodeURIComponent(
    "Hi! I visited your website and would like to know more about your masala products."
  );

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
                 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/40
                 hover:bg-green-600 transition-colors"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </motion.a>
  );
}
