import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-white pt-16 pb-8 border-t-4 border-brand-orange mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl font-bold text-white">
              Masala<span className="text-brand-gold">Brand</span>
            </span>
            <p className="text-brand-cream/80 text-sm leading-relaxed">
              Crafting pure, fresh, and authentic masala blends for India's kitchens. From our family to yours, bringing true flavor to every meal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-semibold text-lg text-brand-gold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-brand-cream/80 hover:text-white transition-colors">Home</Link>
              <Link href="/products" className="text-sm text-brand-cream/80 hover:text-white transition-colors">Products</Link>
              <Link href="/about" className="text-sm text-brand-cream/80 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="text-sm text-brand-cream/80 hover:text-white transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-semibold text-lg text-brand-gold">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-brand-cream/80">
              <p>📍 Spices Market, Old City, India</p>
              <p>📞 +91 123 456 7890</p>
              <p>✉️ hello@masalabrand.com</p>
            </div>
            <p className="mt-2 text-brand-gold font-medium">Order easily via WhatsApp!</p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-semibold text-lg text-brand-gold">Follow Us</h4>
            <div className="flex gap-4">
              {/* Using simple div placeholders for social icons to avoid extra dependencies, can be replaced with lucide/fa icons */}
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">f</a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">ig</a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">tw</a>
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
