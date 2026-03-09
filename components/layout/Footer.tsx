'use client'

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#2b0e02] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* COMPANY INFO */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-5">

            <Image
              src="/Gravitate_logo.png"
              alt="Gravitate Masala"
              width={160}
              height={60}
              className="rounded-lg"
            />

            <p className="text-sm text-white/70">
              Manufacture Repeated & Marketed By: GURUKRUPA GRUH UDYOG
            </p>

            {/* ADDRESS */}
            <div className="flex items-start gap-3 text-sm text-white/70 max-w-sm">
              <MapPin
                size={20}
                className="text-brand-orange mt-1 flex-shrink-0"
              />
              <p>
                S.No. 182/2, Plot No. 111, Nr. Jajuvadi, Sant Nirankari Kendra,
                Bhaygaon Shiwar, Malegaon Dist. Nashik - 423203 (M.S)
              </p>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Phone
                size={20}
                className="text-brand-orange flex-shrink-0"
              />
              <p>+91 92715 80900 / 9657586213</p>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Mail
                size={20}
                className="text-brand-orange flex-shrink-0"
              />
              <p>gravitatespices01@gmail.com</p>
            </div>

          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col items-center text-center">

            <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5">
              QUICK LINKS
            </h4>

            <ul className="space-y-3 text-sm text-white/70">

              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* LEGAL */}
          <div className="flex flex-col items-center text-center">

            <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-5">
              LEGAL
            </h4>

            <ul className="space-y-3 text-sm text-white/70">

              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/return-policy" className="hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>

              <li>
                <Link href="/shipping-info" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link href="/fssai" className="hover:text-white transition-colors">
                  FSSAI Compliance
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60 gap-3 text-center md:text-left">

          <p>© 2026 Gravitate. All rights reserved.</p>

          <p>
            FSSAI Lic. No. 11521023000342 | Made with ❤️ in India
          </p>

        </div>

        {/* CREDIT */}
        <div className="mt-4 text-center text-xs text-white/50">
          Created & Maintained by{" "}
          <a
            href="https://mahendranagpure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange hover:underline"
          >
            Mahendra Nagpure
          </a>
        </div>

      </div>
    </footer>
  )
}