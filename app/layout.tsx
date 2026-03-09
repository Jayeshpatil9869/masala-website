import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppFloat from "../components/shared/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gravitatee.com'),
  title: "Gravitate — Premium Masala & Spices | Order on WhatsApp",
  description: "Buy pure, fresh masala and spices online. Crafted from handpicked ingredients. Best masala brand in Nashik. Order directly on WhatsApp — fast delivery across India.",
  keywords: [
    "masala manufacturer in malegaon", "masala supplier in malegaon", "spice powder supplier malegaon",
    "buy masala online malegaon", "gurukrupa masala malegaon", "masala home delivery malegaon",
    "wholesale masala dealer malegaon", "pure spice powder malegaon", "masala manufacturer bhaygaon shiwar",
    "fresh ground masala malegaon", "masala manufacturer in nashik", "spice supplier nashik district",
    "masala powder manufacturer nashik", "wholesale masala supplier nashik", "best masala brand in nashik",
    "turmeric powder supplier nashik", "garam masala manufacturer nashik", "chilli powder supplier nashik",
    "masala manufacturer malegaon nashik maharashtra", "spice manufacturer nashik maharashtra",
    "pure masala supplier maharashtra", "masala home delivery nashik", "masala distributor nashik maharashtra",
    "pooja special masala", "upwas masala powder", "winter special masala blend",
    "powder special masala", "box masala products india", "pure turmeric powder without colour",
    "chemical free masala powder", "handpicked spice powder india", "fresh ground garam masala india",
    "masala pouch manufacturer nashik", "masala wholesale dealer nashik", "spice supplier for small restaurants nashik",
    "masala supplier for caterers malegaon", "bulk masala powder nashik", "spice supplier for hotels nashik",
    "masala manufacturer for retailers maharashtra", "wholesale spice powder supplier nashik district",
    "gurukrupa gruh udyog products", "fssai certified masala manufacturer malegaon",
    "45 year old masala company nashik", "pure masala without preservatives nashik", "gravitate masala malegaon"
  ],
  icons: {
    icon: '/Gravitate_logo.png',
    apple: '/Gravitate_logo.png',
  },
  openGraph: {
    images: ['/Gravitate_logo.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify([
               {
                 "@context": "https://schema.org",
                 "@type": ["Organization", "LocalBusiness"],
                 "name": "Gravitate",
                 "alternateName": ["Gurukrupa Gruh Udyog", "Gurukrupa Masala"],
                 "url": "https://gravitatee.com",
                 "logo": "https://gravitatee.com/Gravitate_logo.png",
                 "image": "https://gravitatee.com/Gravitate_logo.png",
                 "description": "Gravitate (Gurukrupa Gruh Udyog) is a premium masala manufacturer and spice supplier based in Malegaon, Nashik, Maharashtra. A 45-year-old company providing pure spice powder, pooja special masala, winter special masala blend, and wholesale masala delivery without preservatives.",
                 "foundingDate": "1979",
                 "slogan": "Pure, Fresh, Handpicked Spices",
                 "address": {
                   "@type": "PostalAddress",
                   "streetAddress": "S.No. 182/2, Plot No. 111, Nr. Jajuvadi, B/h., Sant Nirankari Kendra, Bhaygaon Shiwar",
                   "addressLocality": "Malegaon",
                   "addressRegion": "Maharashtra",
                   "postalCode": "423203",
                   "addressCountry": "IN"
                 },
                 "geo": {
                   "@type": "GeoCoordinates",
                   "latitude": "20.5539",
                   "longitude": "74.5298"
                 },
                 "areaServed": {
                   "@type": "GeoCircle",
                   "geoMidpoint": {
                     "@type": "GeoCoordinates",
                     "latitude": "20.5539",
                     "longitude": "74.5298"
                   },
                   "geoRadius": "500000"
                 },
                 "telephone": ["+91 9271580900", "+91 9657586213"],
                 "priceRange": "₹",
                 "sameAs": [
                   "https://instagram.com/gravitate_Masala",
                   "https://facebook.com/Gravitate_Masala",
                   "https://www.indiamart.com/gurukrupaguruhoudyog/"
                 ],
                 "hasOfferCatalog": {
                   "@type": "OfferCatalog",
                   "name": "Spices and Masalas",
                   "itemListElement": [
                     {
                       "@type": "OfferCatalog",
                       "name": "Pooja Special Masala"
                     },
                     {
                       "@type": "OfferCatalog",
                       "name": "Winter Special Masala Blend"
                     },
                     {
                       "@type": "OfferCatalog",
                       "name": "Pure Turmeric Powder"
                     }
                   ]
                 }
               },
               {
                 "@context": "https://schema.org",
                 "@type": "WebSite",
                 "name": "Gravitate Masala",
                 "url": "https://gravitatee.com",
                 "description": "Best masala brand in Nashik offering online masala order delivery.",
                 "publisher": {
                   "@id": "https://gravitatee.com/#organization"
                 }
               }
             ])
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
