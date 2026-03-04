import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
];

const policies = [
  { title: 'Privacy Policy', href: '#' },
  { title: 'Terms of Service', href: '#' },
  { title: 'Return Policy', href: '#' },
  { title: 'Shipping Info', href: '#' },
  { title: 'FSSAI Compliance', href: '#' },
];

const social = [
  { icon: <Facebook className="size-4" />, href: '#', label: 'Facebook' },
  { icon: <Instagram className="size-4" />, href: '#', label: 'Instagram' },
  { icon: <Twitter className="size-4" />, href: '#', label: 'Twitter' },
  { icon: <Youtube className="size-4" />, href: '#', label: 'Youtube' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Newsletter Banner */}
      <div
        className="relative overflow-hidden py-14 px-4"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-brand-dark/85" />
        <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl">
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">Stay Updated</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              Get Recipes & Seasonal Offers
            </h3>
            <p className="text-brand-cream/60 text-sm font-body">Join 8,000+ spice lovers who get early access to new arrivals.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2 flex-shrink-0">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-brand-orange"
            />
            <button className="px-5 py-3 bg-brand-orange hover:bg-orange-600 text-white text-sm font-bold rounded-full transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-brand-dark text-brand-white px-4 pt-14 pb-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">

            {/* Brand */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <Link href="/" className="inline-block">
                <span className="font-display text-3xl font-bold text-white">
                  Masala<span className="text-brand-gold">Brand</span>
                </span>
              </Link>
              <p className="text-brand-cream/60 text-sm leading-relaxed max-w-xs font-body">
                Pure, fresh, single-origin masalas sourced directly from farms across India since 1978.
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-brand-cream/50">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Spices Market, Old City, Maharashtra 411002</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span>+91 123 456 7890</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span>hello@masalabrand.com</span>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                {social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-brand-cream/50 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5">Quick Links</h4>
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ href, title }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="flex items-center gap-1 text-brand-cream/60 hover:text-white text-sm py-1.5 transition-all group"
                    >
                      <ChevronRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className="lg:col-span-2">
              <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5">Legal</h4>
              <ul className="flex flex-col gap-1">
                {policies.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="flex items-center gap-1 text-brand-cream/60 hover:text-white text-sm py-1.5 transition-all group"
                    >
                      <ChevronRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="lg:col-span-3 lg:col-start-10">
              <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5">Certifications</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '100%\nPure', emoji: '🌿' },
                  { label: 'FSSAI\nCertified', emoji: '✅' },
                  { label: 'No\nAdditives', emoji: '🚫' },
                  { label: 'Farm\nDirect', emoji: '🌾' },
                ].map(({ label, emoji }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-1 text-center">
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-white/60 text-[10px] leading-tight font-medium whitespace-pre-line">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
          <p>© {new Date().getFullYear()} MasalaBrand. All rights reserved.</p>
          <div className="flex items-center gap-4">
             <span>FSSAI Lic. No. 10012012000213</span>
             <span>|</span>
             <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
