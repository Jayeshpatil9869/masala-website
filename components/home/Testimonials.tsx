"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The turmeric color and aroma is unlike anything from a supermarket store. My curries have never looked this vibrant before.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Ananya Rathi",
    role: "Home Chef, Mumbai",
  },
  {
    text: "Absolutely the best garam masala blend I have ever used. The depth of flavor is outstanding — I will never go back to store brands.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Rajesh Kumar",
    role: "Food Blogger, Delhi",
  },
  {
    text: "Fast delivery and beautiful packaging. The kashmiri red chili gave my dishes the perfect authentic color without too much heat.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Priya Sharma",
    role: "Restaurant Owner, Pune",
  },
  {
    text: "Single-origin sourcing makes such a difference. You can actually taste the region and the care that went into growing these spices.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    name: "Arjun Mehta",
    role: "Culinary Enthusiast, Bangalore",
  },
  {
    text: "I ordered the biryani masala and my entire family was blown away. It smells incredible and the rice came out perfect every time.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Deepa Nair",
    role: "Home Cook, Chennai",
  },
  {
    text: "Finally a brand that takes spice quality seriously. The coriander powder was so fresh it was almost green. Extraordinary.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Vikram Singh",
    role: "Chef, Hyderabad",
  },
  {
    text: "Gifted the combo pack to my mother and she called me immediately to ask where I found such good quality masalas. A hit!",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Sonal Gupta",
    role: "Verified Buyer",
  },
  {
    text: "The WhatsApp ordering process is brilliant — so easy and the team responded within minutes. Great customer experience.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Manish Iyer",
    role: "Tech Professional, Gurgaon",
  },
  {
    text: "Used the sambhar powder to make the most authentic sambhar I've ever made at home. My Tamil grandmother approved — that says it all.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Meera Krishnan",
    role: "Food Enthusiast, Kochi",
  },
];

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = ({
  className,
  testimonials: items,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {items.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-brand-orange/15 bg-white shadow-sm shadow-brand-orange/5 max-w-xs w-full"
              >
                <div className="flex text-brand-gold mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 font-body text-sm leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-brand-orange/20"
                  />
                  <div>
                    <div className="font-semibold text-brand-dark text-sm leading-5">{name}</div>
                    <div className="text-xs text-brand-orange leading-5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="bg-brand-white py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,126,34,0.05),transparent_60%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-brand-orange/30 bg-brand-cream text-brand-orange text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark tracking-tight mb-4">
            What our customers say
          </h2>
          <p className="text-gray-500 font-body">
            Real spice lovers sharing their genuine experience with Gravitate.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={16} />
        </div>
      </div>
    </section>
  );
}
