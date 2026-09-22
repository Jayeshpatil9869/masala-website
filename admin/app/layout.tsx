import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gravitate Admin — Catalog & Store Management",
  description: "Official Admin Dashboard for Gravitate Spices & Masala",
  robots: "noindex, nofollow",
  icons: {
    icon: "/Gravitate_logo.png",
    apple: "/Gravitate_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans bg-[#FAFAFA] text-[#111111] antialiased min-h-screen selection:bg-[#111111] selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
