"use client"

import { Star } from 'lucide-react';

export default function ProductReviews() {
  const reviews = [
    {
      stars: 5,
      text: "The difference in color alone is staggering. My curries have never looked or tasted this vibrant. It's like I was cooking in black and white before.",
      name: "Ananya R.",
      badge: "VERIFIED BUYER",
      initials: "AR"
    },
    {
      stars: 5,
      text: "Absolutely essential for golden milk lattes. The earthy flavor is profound but smooth. Will never buy from a supermarket again.",
      name: "Sarah K.",
      badge: "HOME COOK",
      initials: "SK"
    },
    {
      stars: 4,
      text: "High quality packaging and swift delivery. The aroma hit me as soon as I opened the box. Highly recommend for home cooks.",
      name: "David V.",
      badge: "VERIFIED BUYER",
      initials: "DV"
    }
  ];

  return (
    <section className="bg-brand-white py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-3">
            From the Community
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div>
                <div className="flex text-brand-gold mb-5">
                  {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`w-4 h-4 ${i < review.stars ? 'fill-current' : 'text-gray-200 fill-current'}`} />
                  ))}
                </div>
                <p className="font-body text-gray-700 leading-relaxed mb-8 text-sm">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-cream text-brand-dark font-bold text-xs flex items-center justify-center border border-brand-orange/20">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-dark">{review.name}</h4>
                  <p className="text-[10px] font-sans uppercase tracking-widest text-brand-orange mt-0.5">{review.badge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
