"use client"

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function ContactCards() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890';
  const waLink = buildWhatsAppLink(phone, "Hi MasalaBrand! I have a query.");

  const cards = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Us',
      desc: "Fastest response — typically under 15 minutes.",
      action: 'Chat Now',
      href: waLink,
      bg: 'bg-[#25D366]',
      badge: 'Recommended',
    },
    {
      icon: Phone,
      title: 'Call Us',
      desc: "Mon–Sat, 9:00 AM – 7:00 PM IST",
      action: 'Call Now',
      href: `tel:+${phone}`,
      bg: 'bg-brand-dark',
      badge: null,
    },
    {
      icon: Mail,
      title: 'Email Us',
      desc: "For bulk orders and wholesale inquiries.",
      action: 'Send Email',
      href: 'mailto:hello@masalabrand.com',
      bg: 'bg-brand-orange',
      badge: null,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 relative -mt-14 z-20">
      {cards.map((card, idx) => (
        <motion.a 
          key={idx}
          href={card.href}
          target={card.icon === MessageCircle ? "_blank" : "_self"}
          rel="noreferrer"
          className="bg-white rounded-2xl p-7 shadow-xl shadow-black/8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 flex flex-col group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-start justify-between mb-5">
            <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center shadow-lg transition-transform group-hover:scale-105`}>
              <card.icon className="w-7 h-7 text-white" />
            </div>
            {card.badge && (
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {card.badge}
              </span>
            )}
          </div>
          <h3 className="font-sans font-bold text-lg text-brand-dark mb-1.5">{card.title}</h3>
          <p className="font-body text-gray-500 text-sm mb-5 flex-1">{card.desc}</p>
          <span className="font-semibold text-brand-orange text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            {card.action} <ChevronRight className="w-4 h-4" />
          </span>
        </motion.a>
      ))}
    </div>
  );
}
