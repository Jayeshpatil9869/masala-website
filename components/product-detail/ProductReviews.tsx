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
      text: "Absolutely essential for golden milk lattes. The earthy flavor is profound but smooth.",
      name: "Sarah K.",
      badge: "HOME COOK",
      initials: "SK"
    },
    {
      stars: 4,
      text: "High quality packaging and swift delivery. The aroma hit me as soon as I opened the box.",
      name: "David V.",
      badge: "VERIFIED BUYER",
      initials: "DV"
    }
  ];

  return (
    <section className="bg-[#f2ede4] py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-12 text-center">
          From the Community
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-[#f8f6ec] border border-[#e6e2d3] p-8 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex text-[#c8982a] mb-6">
                  {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`w-4 h-4 ${i < review.stars ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="font-body text-gray-700 leading-relaxed mb-8 text-sm">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e6e2d3] text-gray-600 font-bold text-xs flex items-center justify-center font-mono">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-dark">{review.name}</h4>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">{review.badge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
