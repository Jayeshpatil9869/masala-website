"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const BACKGROUND_IMAGES = [
  "/img (1).jpg",
  "/img (2).jpg",
  "/img (3).jpg",
  "/img (4).jpg",
]

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length)
  }

  const prevSlide = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? BACKGROUND_IMAGES.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full bg-brand-cream overflow-hidden aspect-[4/3] md:aspect-[1920/1081] flex items-center justify-center mt-[72px] md:mt-0">

      {/* SLIDER TRACK */}
      <motion.div
        className="flex absolute inset-0 w-full h-full"
        animate={{ x: `-${currentImageIndex * 100}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {BACKGROUND_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Hero ${i}`}
            className="w-full h-full object-cover object-center flex-shrink-0"
          />
        ))}
      </motion.div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full p-2 md:p-3 transition"
      >
        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full p-2 md:p-3 transition"
      >
        <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
      </button>

    </section>
  )
}