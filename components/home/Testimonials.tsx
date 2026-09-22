"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The turmeric aroma and deep golden hue is unlike anything from commercial retail brands. Curries have an authentic restaurant-grade fragrance.",
    name: "Ananya Rathi",
    role: "Home Chef, Mumbai",
  },
  {
    text: "The Royal Garam Masala blend has extraordinary depth. You only need half a teaspoon and the whole kitchen smells divine.",
    name: "Rajesh Kumar",
    role: "Culinary Enthusiast, Delhi",
  },
  {
    text: "Fast WhatsApp response and prompt delivery. Kashmiri chili gives our gravies that signature rich ruby color without artificial food coloring.",
    name: "Priya Sharma",
    role: "Restaurant Owner, Pune",
  },
  {
    text: "Single-origin sourcing makes such an obvious difference. You can genuinely taste the purity and care that goes into slow cold-stone milling.",
    name: "Arjun Mehta",
    role: "Food Connoisseur, Bengaluru",
  },
  {
    text: "The Pooja Special Masala was ordered for Diwali and our guests could not stop praising the authenticity. Will never use any other brand.",
    name: "Deepa Nair",
    role: "Verified Buyer, Nashik",
  },
  {
    text: "Finally a spice brand from Maharashtra that takes raw ingredient purity seriously. The coriander powder is freshly ground and noticeably fragrant.",
    name: "Vikram Singh",
    role: "Catering Chef, Malegaon",
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#e5e5e5]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-[#cacacb] flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight uppercase text-[#111111]">
              Customer Reviews & Feedback
            </h2>
            <p className="text-xs text-[#707072] mt-1">
              Genuine testimonials from home cooks, caterers, and food enthusiasts across India
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#111111] font-semibold">
            <div className="flex text-[#111111]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 Rating</span>
          </div>
        </div>

        {/* Flat 3-Column Editorial Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="bg-[#f5f5f5] p-5 sm:p-7 flex flex-col justify-between rounded-none border border-[#e5e5e5]"
            >
              <div>
                {/* 5-Star Row */}
                <div className="flex text-[#111111] mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#39393b] leading-relaxed mb-6 font-normal">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#cacacb]">
                <p className="text-xs font-semibold text-[#111111] leading-tight">
                  {item.name}
                </p>
                <p className="text-[11px] text-[#707072] mt-0.5">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
