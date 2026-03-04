'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

import CartDrawer from '@/components/cart/CartDrawer';
import { Phone, Search } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const pathname = usePathname();

  // Pages without a dark hero image need the navbar to always look "scrolled"
  // (dark text/icons) so they remain visible over the light background
  const isLightBgPage = !!(pathname && pathname !== '/products' && pathname.startsWith('/products/'));
  const effectiveScrolled = scrolled || isLightBgPage;

  const waPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890';
  const waMessage = encodeURIComponent('Hi! I visited your website and would like to know more about your masala products.');
  const waLink = `https://wa.me/${waPhone}?text=${waMessage}`;

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile menu on route change
  React.useEffect(() => { setOpen(false); }, [pathname]);

  return (
    // Outer wrapper: sticky, centered, transitions to floating pill on scroll
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full border-b border-transparent transition-all ease-out duration-300',
        'md:rounded-xl md:border md:transition-all md:ease-out',
        {
          // When scrolled: becomes a glass floating pill with max-width shrink + shadow
          'bg-white/95 supports-[backdrop-filter]:bg-white/60 border-gray-200/80 backdrop-blur-xl md:top-4 md:max-w-5xl md:shadow-lg md:shadow-black/5':
            effectiveScrolled && !open,
          // When not scrolled: full-width transparent
          'bg-transparent md:max-w-full': !effectiveScrolled && !open,
          // When mobile open: white header
          'bg-white': open,
        },
      )}
    >
      <nav
        className={cn(
          'flex h-16 w-full items-center justify-between px-4 lg:px-6',
          'md:h-14 md:transition-all md:ease-out',
          { 'md:px-4': effectiveScrolled },
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-50">
          <span className={cn(
            'font-display text-2xl font-bold transition-colors',
            effectiveScrolled || open ? 'text-brand-red' : 'text-white',
          )}>
            Masala<span className={cn(effectiveScrolled || open ? 'text-brand-gold' : 'text-brand-gold')}>Brand</span>
          </span>
        </Link>

        {/* Desktop Nav Links — center */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'text-sm font-medium rounded-full transition-colors px-4',
                pathname === link.href
                  ? 'text-brand-red bg-red-50'
                  : effectiveScrolled
                    ? 'text-gray-700 hover:text-brand-orange hover:bg-orange-50'
                    : 'text-white hover:text-brand-orange hover:bg-white/10',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'rounded-full h-9 w-9 transition-colors',
              effectiveScrolled
                ? 'text-gray-600 hover:text-brand-orange hover:bg-orange-50'
                : 'text-white hover:text-white/80 hover:bg-white/10',
            )}
          >
            <Search className="h-4 w-4" />
          </Button>

          <CartDrawer transparent={!effectiveScrolled} />

          <Button
            asChild
            className="bg-[#25D366] hover:bg-green-600 text-white rounded-full px-4 h-9 text-sm font-semibold shadow-sm shadow-green-500/20 transition-colors"
          >
            <a href={waLink} target="_blank" rel="noreferrer">
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              Order on WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile: Cart + Animated Hamburger */}
        <div className="flex md:hidden items-center gap-2 z-50">
          <CartDrawer transparent={!effectiveScrolled && !open} />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className={cn(
              'rounded-full h-9 w-9 transition-colors',
              effectiveScrolled || open ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10',
            )}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu: full-screen slide-in with zoom animation */}
      <div
        className={cn(
          'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-gray-100 md:hidden',
          'bg-white/95 supports-[backdrop-filter]:bg-white/90 backdrop-blur-xl',
          open ? 'block' : 'hidden',
        )}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95',
            'data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95',
            'duration-200 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-5',
          )}
        >
          {/* Nav Links */}
          <div className="grid gap-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: 'ghost', className: 'justify-start text-base h-12 px-4 rounded-xl' }),
                  pathname === link.href
                    ? 'text-brand-red bg-red-50'
                    : 'text-gray-800 hover:text-brand-orange hover:bg-orange-50',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="flex flex-col gap-3 pb-8">
            <div className="h-px bg-gray-100" />
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-base transition-colors shadow-lg shadow-green-500/20"
            >
              <Phone className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
