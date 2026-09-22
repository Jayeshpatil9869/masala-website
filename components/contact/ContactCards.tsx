"use client"

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function ContactCards() {
  const phone1 = '9271580900';
  const waLink = buildWhatsAppLink(phone1, "Hi Gravitate! I have a question regarding an order / wholesale.");

  const cards = [
    {
      icon: MessageSquare,
      title: 'WhatsApp Support',
      desc: "Fastest response — average response within 15 minutes.",
      action: 'Chat on WhatsApp',
      href: waLink,
      badge: 'Immediate',
    },
    {
      icon: Phone,
      title: 'Direct Call Support',
      desc: "+91 92715 80900 / 96575 86213",
      action: 'Call Now',
      href: `tel:+91${phone1}`,
      badge: null,
    },
    {
      icon: Mail,
      title: 'Email & Wholesale',
      desc: "For bulk commercial supplies, exports, and partnerships.",
      action: 'Send an Email',
      href: 'mailto:gravitatespices01@gmail.com',
      badge: null,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
      {cards.map((card, idx) => (
        <motion.a 
          key={idx}
          href={card.href}
          target={card.icon === MessageSquare ? "_blank" : "_self"}
          rel="noreferrer"
          className="group p-6 sm:p-8 bg-[#f5f5f5] border border-[#e5e5e5] rounded-none flex flex-col justify-between hover:border-[#111111] transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.4 }}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-full bg-white border border-[#cacacb] flex items-center justify-center text-[#111111]">
                <card.icon className="w-4 h-4" />
              </div>
              {card.badge && (
                <span className="text-[10px] font-semibold text-[#007d48] bg-[#007d48]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {card.badge}
                </span>
              )}
            </div>

            <h3 className="font-sans font-medium text-base text-[#111111] mb-1">
              {card.title}
            </h3>
            <p className="text-xs text-[#707072] leading-relaxed mb-6">
              {card.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-[#cacacb] flex items-center justify-between text-xs font-semibold text-[#111111]">
            <span>{card.action}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
