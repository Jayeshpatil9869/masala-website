'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import CartDrawer from '@/components/cart/CartDrawer';
import { Phone } from 'lucide-react';

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

  const isLightBgPage = !!(pathname && pathname !== '/products' && pathname.startsWith('/products/'));
  const effectiveScrolled = scrolled || isLightBgPage;

  const waLink = `https://wa.me/919271580900?text=${encodeURIComponent('Hi! I visited your website and would like to know more about your masala products.')}`;

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  React.useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'fixed z-50 transition-all ease-out duration-500 left-1/2 -translate-x-1/2 w-full',
        {
          // When scrolled on desktop: floating pill shape centered
          'top-0 md:top-4 md:w-[calc(100%-2rem)] md:max-w-5xl md:rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]':
            effectiveScrolled && !open,
          // When at the top (not scrolled): transparent full width
          'top-0 max-w-full bg-transparent border-b border-transparent': !effectiveScrolled && !open,
          // When mobile menu is open
          'top-0 max-w-full bg-white': open,
        },
      )}
    >
      <div className={cn("mx-auto transition-all duration-500", effectiveScrolled ? "max-w-5xl px-4 sm:px-6" : "max-w-7xl px-4 sm:px-6 lg:px-8")}>
        <nav className={cn("flex items-center justify-between gap-4 transition-all duration-500", effectiveScrolled ? "h-14" : "h-16")}>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 z-50">
            <Image
              src="/gurukrupa-logo.jpg"
              alt="Gurukrupa Masala"
              width={120}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Links — center */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'text-sm font-medium rounded-full transition-colors px-4',
                  pathname === link.href
                    ? effectiveScrolled
                      ? 'bg-white text-brand-orange shadow-sm'
                      : 'text-brand-red bg-red-50'
                    : effectiveScrolled
                      ? 'text-black hover:text-brand-orange hover:bg-white/60'
                      : 'text-white hover:text-brand-orange hover:bg-white/10',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <CartDrawer transparent={!effectiveScrolled} />
            <Button
              asChild
              className="bg-[#25D366] hover:bg-green-600 text-white rounded-full px-4 h-9 text-sm font-semibold shadow-sm shadow-green-500/20 transition-colors whitespace-nowrap"
            >
              <a href={waLink} target="_blank" rel="noreferrer">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Order on WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile: Cart + Hamburger */}
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
      </div>

      {/* Mobile Menu */}
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
