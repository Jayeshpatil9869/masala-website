'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  const waLink = `https://wa.me/919271580900?text=${encodeURIComponent(
    'Hi! I visited your website and would like to inquire about Gravitate spices.'
  )}`;

  return (
    <footer className="bg-white text-[#111111] border-t border-[#cacacb] mt-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* 4-COLUMN CATALOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#e5e5e5] text-center sm:text-left">
          {/* COL 1 — Masala Ranges */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold tracking-tight uppercase text-[#111111]">
              Masala Ranges
            </h4>
            <ul className="space-y-2.5 text-xs text-[#707072] flex flex-col items-center sm:items-start">
              <li>
                <Link href="/products" className="hover:text-[#111111] transition-colors">
                  All Spices & Powders
                </Link>
              </li>
              <li>
                <Link href="/products?category=pooja-special" className="hover:text-[#111111] transition-colors">
                  Pooja Special Masala
                </Link>
              </li>
              <li>
                <Link href="/products?category=powder-special" className="hover:text-[#111111] transition-colors">
                  Pure Spice Powders
                </Link>
              </li>
              <li>
                <Link href="/products?category=blends" className="hover:text-[#111111] transition-colors">
                  Authentic Garam & Curry Blends
                </Link>
              </li>
              <li>
                <Link href="/products?category=upwas-special" className="hover:text-[#111111] transition-colors">
                  Upwas & Fasting Special
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 2 — Orders & Help */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold tracking-tight uppercase text-[#111111]">
              Orders & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#707072] flex flex-col items-center sm:items-start">
              <li>
                <a href={waLink} target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors flex items-center justify-center sm:justify-start gap-1.5 font-medium text-[#111111]">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#111111] transition-colors">
                  Wholesale & Catering Inquiries
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="hover:text-[#111111] transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#111111] transition-colors">
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#111111] transition-colors">
                  Customer Care & Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3 — Company & Heritage */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold tracking-tight uppercase text-[#111111]">
              About Gravitate
            </h4>
            <ul className="space-y-2.5 text-xs text-[#707072] flex flex-col items-center sm:items-start">
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  Our 45-Year Legacy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  Traditional Cold-Stone Process
                </Link>
              </li>
              <li>
                <Link href="/fssai-compliance" className="hover:text-[#111111] transition-colors">
                  FSSAI Quality Certification
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#111111] transition-colors">
                  Malegaon & Nashik Units
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4 — Contact & Manufacturer */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <Image
              src="/Gravitate_logo.png"
              alt="Gravitate Masala"
              width={110}
              height={36}
              className="h-7 w-auto object-contain mb-2 mx-auto sm:mx-0"
            />
            <p className="text-xs text-[#707072] font-medium leading-relaxed">
              GURUKRUPA GRUH UDYOG
            </p>
            <div className="space-y-2 text-xs text-[#707072] flex flex-col items-center sm:items-start">
              <div className="flex items-center sm:items-start justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                <span className="max-w-xs sm:max-w-none">S.No. 182/2, Plot 111, Bhaygaon Shiwar, Malegaon, Nashik - 423203</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4 text-[#111111] flex-shrink-0" />
                <span>+91 92715 80900 / 96575 86213</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-[#111111] flex-shrink-0" />
                <span>gravitatespices01@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM UTILITY & LEGAL ROW (Nike typography.utility-xs) */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 text-[10px] text-[#707072] text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap">
            <span className="font-semibold text-[#111111]">India (English)</span>
            <span>© 2026 Gravitate / Gurukrupa Gruh Udyog. All Rights Reserved.</span>
            <span>FSSAI Lic. No. 11521023000342</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap text-[10px]">
            <Link href="/privacy-policy" className="hover:text-[#111111] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#111111] transition-colors">
              Terms of Sale
            </Link>
            <Link href="/shipping-info" className="hover:text-[#111111] transition-colors">
              Delivery Terms
            </Link>
            <Link href="/fssai-compliance" className="hover:text-[#111111] transition-colors">
              FSSAI Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}