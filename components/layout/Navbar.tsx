'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import CartDrawer from '@/components/cart/CartDrawer';
import { Search, MessageSquare, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Masalas & Spices', href: '/products' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact & Orders', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const scrolled = useScroll(15);
  const pathname = usePathname();
  const router = useRouter();

  const waLink = `https://wa.me/919271580900?text=${encodeURIComponent(
    'Hi! I visited your website and would like to order pure masalas.'
  )}`;

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-200 select-none">
        {/* PRIMARY NAVIGATION BAR */}
        <div
          className={cn(
            'bg-white border-b border-[#e5e5e5] transition-all duration-200',
            scrolled ? 'shadow-[0_1px_0_0_#e5e5e5]' : ''
          )}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-18 flex items-center justify-between gap-4">
            {/* LEFT — Brand Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image
                src="/Gravitate_logo.png"
                alt="Gravitate Masala"
                width={120}
                height={42}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* CENTER — Navigation Links (Desktop with 2px bottom underline indicator) */}
            <nav className="hidden lg:flex items-center gap-8 h-full">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'relative h-full flex items-center text-xs font-semibold uppercase tracking-wider transition-colors',
                      isActive
                        ? 'text-[#111111]'
                        : 'text-[#707072] hover:text-[#111111]'
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT — Cart, Order Action, Hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Cart Drawer Icon Button */}
              <CartDrawer />

              {/* Primary Pill Button — WhatsApp Order */}
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-medium px-5 h-10 rounded-full transition-all active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>

              {/* Hamburger Button (Mobile) */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden flex items-center justify-center rounded-full w-10 h-10 text-[#111111] hover:bg-[#f5f5f5] transition-colors"
                aria-label="Toggle menu"
              >
                <MenuToggleIcon open={open} className="size-5" duration={250} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed navbar height */}
      <div className="h-16 sm:h-18" />

      {/* MOBILE DRAWER NAVIGATION */}
      {open && (
        <div className="fixed inset-0 top-16 sm:top-18 z-40 bg-white lg:hidden flex flex-col justify-between overflow-y-auto border-t border-[#e5e5e5]">
          <div className="p-6 space-y-6">
            {/* Mobile Search Pill */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707072]" />
              <input
                type="text"
                placeholder="Search masalas and spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-[#f5f5f5] text-base sm:text-sm text-[#111111] rounded-full outline-none border border-transparent focus:border-[#111111] transition-all"
              />
            </form>

            <nav className="flex flex-col divide-y divide-[#e5e5e5]">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'py-4 flex items-center justify-between text-lg font-medium text-[#111111]',
                      isActive ? 'font-semibold' : 'text-[#39393b]'
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#707072]" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-6 border-t border-[#e5e5e5] bg-[#f5f5f5] space-y-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full bg-[#111111] text-white font-medium py-3.5 rounded-full text-sm active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order via WhatsApp (+91 9271580900)</span>
            </a>
            <p className="text-center text-[11px] text-[#707072]">
              GURUKRUPA GRUH UDYOG · FSSAI Certified Spice Mill
            </p>
          </div>
        </div>
      )}
    </>
  );
}
