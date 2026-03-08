"use client"

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function ContactCards() {
  const phone1 = '9271580900';
  const waLink = buildWhatsAppLink(phone1, "Hi! I have a query about Gravitate.");

  const cards = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Us',
      desc: "Fastest response — typically under 15 minutes.",
      action: 'Chat on WhatsApp',
      href: waLink,
      bg: 'bg-[#25D366]',
      lightBg: 'bg-[#25D366]/10',
      textColor: 'text-[#25D366]',
      badge: 'Recommended',
    },
    {
      icon: Phone,
      title: 'Call Us',
      desc: "9271580900 / 9657586213",
      action: 'Call Now',
      href: `tel:+91${phone1}`,
      bg: 'bg-brand-orange',
      lightBg: 'bg-brand-orange/10',
      textColor: 'text-brand-orange',
      badge: null,
    },
    {
      icon: Mail,
      title: 'Email Us',
      desc: "For bulk orders and wholesale inquiries.",
      action: 'Send an Email',
      href: 'mailto:gravitatespices01@gmail.com',
      bg: 'bg-brand-dark',
      lightBg: 'bg-brand-dark/5',
      textColor: 'text-brand-dark',
      badge: null,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 -mt-24 sm:-mt-28 mb-16 px-4">
      {cards.map((card, idx) => (
        <motion.a 
          key={idx}
          href={card.href}
          target={card.icon === MessageCircle ? "_blank" : "_self"}
          rel="noreferrer"
          className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-white flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle gradient glow behind the card on hover */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${card.bg} opacity-0 group-hover:opacity-5 blur-3xl rounded-full transition-opacity duration-500`} />

          <div className="flex items-start justify-between mb-8 relative z-10">
            <div className={`w-14 h-14 rounded-2xl ${card.lightBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              <card.icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
            {card.badge && (
              <span className="text-[10px] font-bold text-green-700 bg-green-100/80 px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm border border-green-200">
                {card.badge}
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-3 relative z-10">{card.title}</h3>
          <p className="font-sans text-gray-500 text-sm mb-8 flex-1 leading-relaxed relative z-10">{card.desc}</p>
          
          <div className="mt-auto relative z-10">
            <span className={`inline-flex items-center gap-2 font-semibold text-sm ${card.textColor} group-hover:gap-3 transition-all duration-300`}>
              {card.action} 
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
