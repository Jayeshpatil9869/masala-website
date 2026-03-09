'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
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

  // Only the home page hero has a dark background — all others need solid white navbar
  const isHeroPage = pathname === '/';
  const solidBg = scrolled || open || !isHeroPage;

  const waLink = `https://wa.me/919271580900?text=${encodeURIComponent('Hi! I visited your website and would like to know more about your masala products.')}`;

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  React.useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300 ease-out',
          // When scrolled on desktop: becomes a floating pill centered in viewport
          scrolled && !open
            ? 'md:top-3'
            : 'top-0',
        )}
      >
        <div
          className={cn(
            'mx-auto transition-all duration-300 ease-out',
            scrolled && !open
              ? 'max-w-5xl md:rounded-2xl md:border md:border-gray-200/80 md:shadow-lg md:shadow-black/5'
              : 'max-w-full',
            solidBg
              ? 'bg-white/95 supports-[backdrop-filter]:bg-white/85 backdrop-blur-lg'
              : 'bg-transparent'
          )}
        >
          <nav
            className={cn(
              'flex items-center justify-between px-6 sm:px-10 md:px-12 lg:px-14 transition-all duration-300',
              scrolled ? 'h-13 py-1.5' : (solidBg ? 'h-16' : 'h-20')
            )}
          >
            {/* LEFT — Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center z-10">
              <Image
                src="/Gravitate_logo.png"
                alt="Gravitate Masala"
                width={130}
                height={50}
                className={cn(
                  'w-auto object-contain rounded-lg transition-all duration-300',
                  scrolled ? 'h-9' : 'h-11'
                )}
                priority
              />
            </Link>

            {/* CENTER — Desktop Nav Links (absolutely centered) */}
            <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'rounded-full px-4 text-[14px] font-medium h-9 transition-colors',
                    pathname === link.href
                      ? 'bg-brand-orange/10 text-brand-orange font-semibold'
                      : solidBg
                        ? 'text-gray-700 hover:text-brand-orange hover:bg-orange-50'
                        : 'text-white hover:text-brand-orange hover:bg-white/10',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* RIGHT — Cart + WhatsApp */}
            <div className="flex items-center gap-2 flex-shrink-0 z-10">
              <CartDrawer transparent={!solidBg} />

              {/* WhatsApp button — desktop only */}
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-green-600 text-white font-semibold text-sm px-5 h-10 shadow-sm shadow-green-500/20 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                Order on WhatsApp
              </a>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setOpen(!open)}
                className={cn(
                  'md:hidden flex items-center justify-center rounded-full w-9 h-9 transition-colors',
                  solidBg
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                )}
                aria-label="Toggle menu"
              >
                <MenuToggleIcon open={open} className="size-5" duration={300} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu — rendered outside the floating header */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-[49] bg-white md:hidden flex flex-col"
          style={{ overflowY: 'auto' }}
        >
          <div className="flex flex-col h-full justify-between px-5 py-6">
            <nav className="grid gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center text-xl font-medium py-3.5 px-4 rounded-2xl transition-colors',
                    pathname === link.href
                      ? 'bg-orange-50 text-brand-orange font-semibold'
                      : 'text-gray-800 hover:bg-orange-50 hover:text-brand-orange'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pb-8 pt-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-xl shadow-green-500/20"
              >
                <Phone className="w-5 h-5" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
