import { Leaf, Award, Truck, ShieldCheck } from 'lucide-react';

const badges = [
  { icon: Leaf, text: '100% Natural' },
  { icon: Award, text: 'FSSAI Certified' },
  { icon: Truck, text: 'Free Delivery on ₹499+' },
  { icon: ShieldCheck, text: '10,000+ Happy Customers' }
];

export default function TrustBadges() {
  return (
    <div className="bg-brand-dark text-brand-gold py-6 border-b-2 border-brand-orange overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:justify-between">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <badge.icon className="w-6 h-6 shrink-0" />
              <span className="font-sans font-medium text-sm md:text-base tracking-wide whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
