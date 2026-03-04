"use client"

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function ContactCards() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890';
  const waLink = buildWhatsAppLink(phone, "Hi MasalaBrand! I have a query.");

  const cards = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Us',
      desc: "Fastest way to reach us.",
      action: 'Chat Now',
      href: waLink,
      color: 'bg-[#25D366] text-white',
      hover: 'hover:bg-green-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      desc: "Mon-Sat, 9AM to 7PM",
      action: 'Call Now',
      href: `tel:+${phone}`,
      color: 'bg-brand-dark text-white',
      hover: 'hover:bg-gray-800'
    },
    {
      icon: Mail,
      title: 'Email Us',
      desc: "For bulk and wholesale inquiries.",
      action: 'Send Email',
      href: 'mailto:hello@masalabrand.com',
      color: 'bg-brand-orange text-white',
      hover: 'hover:bg-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative -mt-16 z-20">
      {cards.map((card, idx) => (
        <motion.a 
          key={idx}
          href={card.href}
          target={card.icon === MessageCircle ? "_blank" : "_self"}
          rel="noreferrer"
          className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${card.color} ${card.hover}`}>
            <card.icon className="w-8 h-8" />
          </div>
          <h3 className="font-sans font-bold text-xl text-brand-dark mb-2">{card.title}</h3>
          <p className="font-body text-gray-500 text-sm mb-6">{card.desc}</p>
          <span className="font-medium text-brand-orange group-hover:underline mt-auto">
            {card.action} &rarr;
          </span>
        </motion.a>
      ))}
    </div>
  );
}
