import Image from 'next/image';
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

      {/* Main Footer */}
      <div className="bg-brand-dark text-brand-white px-4 pt-14 pb-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">

            {/* Brand */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left gap-5">
              <Link href="/" className="">
                <Image
                  src="/gurukrupa-logo.jpg"
                  alt="Gurukrupa Masala"
                  width={160}
                  height={64}
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </Link>
              <p className="text-brand-cream/60 text-sm leading-relaxed max-w-sm font-body">
                Manufacture Repeated & Marketed By: GURUKRUPA GRUH UDYOG
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-brand-cream/50">
                <div className="flex items-start justify-center lg:justify-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-xs">S.No. 182/2, Plot No. 111, Nr. Jajuvadi, B/h., Sant Nirankari Kendra, Bhaygaon Shiwar, Malegaon Dist. Nashik - 423203 (M.S)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span>9271580900 / 9657586213</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span>gravitatespices01@gmail.com</span>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start gap-2 pt-1">
                {social.map((item) => (
                  <a
                    key={item.label}
                    href={item.label === 'Instagram' ? 'https://instagram.com/gravitate_Masala' : item.label === 'Facebook' ? 'https://facebook.com/Gravitate_Masala' : item.href}
                    aria-label={item.label}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-brand-cream/50 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 lg:col-start-7 flex flex-col items-center lg:items-start">
              <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5 text-center lg:text-left">Quick Links</h4>
              <ul className="flex flex-col items-center lg:items-start gap-1">
                {navLinks.map(({ href, title }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="flex items-center gap-1 text-brand-cream/60 hover:text-white text-sm py-1.5 transition-all group"
                    >
                      <ChevronRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 -ml-1 transition-opacity hidden lg:block" />
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
              <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5 text-center lg:text-left">Legal</h4>
              <ul className="flex flex-col items-center lg:items-start gap-1">
                {policies.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="flex items-center gap-1 text-brand-cream/60 hover:text-white text-sm py-1.5 transition-all group"
                    >
                      <ChevronRight className="w-3 h-3 text-brand-orange opacity-0 group-hover:opacity-100 -ml-1 transition-opacity hidden lg:block" />
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2">
             <p>© {new Date().getFullYear()} MasalaBrand. All rights reserved.</p>
             <span className="hidden md:inline text-white/20">|</span>
             <p>Created by <a href="https://mahendranagpure.com" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:text-brand-gold transition-colors font-medium">Westford. Pvt. Ltd</a></p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
             <span>FSSAI Lic. No. 11521023000342</span>
             <span className="hidden sm:inline text-white/20">|</span>
             <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
