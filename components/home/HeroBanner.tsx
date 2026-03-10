"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const BACKGROUND_IMAGES = [
  "/img (1).jpg",
  "/img (2).jpg",
  "/img (3).jpg",
  "/img (4).jpg",
]

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [prevImageIndex, setPrevImageIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setPrevImageIndex(currentImageIndex)
    setCurrentImageIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = BACKGROUND_IMAGES.length - 1;
      if (nextIndex >= BACKGROUND_IMAGES.length) nextIndex = 0;
      return nextIndex;
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentImageIndex]) // Restart timer on manual click

  return (
    <section className="relative w-full bg-brand-cream overflow-hidden aspect-[4/3] md:aspect-[1920/1081] flex items-center justify-center mt-[72px] md:mt-0">

      {/* SLIDER IMAGES (All Rendered Simultaneously) */}
      {BACKGROUND_IMAGES.map((src, idx) => {
        const isActive = idx === currentImageIndex;
        const isPrev = idx === prevImageIndex;
        const isInitialRender = currentImageIndex === prevImageIndex;

        let x = "0%";
        let zIndex = 0;
        let opacity = 0;
        let transitionDuration = 0.8;

        if (isActive) {
          x = "0%";
          zIndex = 20;
          opacity = 1;
        } else if (isPrev && !isInitialRender) {
          x = direction > 0 ? "-100%" : "100%";
          zIndex = 10;
          opacity = 1;
        } else {
          // Idle state - instantly position off-screen ready to slide in next
          x = direction > 0 ? "100%" : "-100%";
          zIndex = 0;
          opacity = 0;
          transitionDuration = 0; // Instant jump
        }

        return (
          <motion.div
            key={src}
            initial={false}
            animate={{
              opacity,
              zIndex,
              x,
            }}
            transition={{ duration: transitionDuration, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            <Image
              src={src}
              alt={`Hero image ${idx + 1}`}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center md:pb-18"
            />
          </motion.div>
        )
      })}

      {/* LEFT ARROW */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full p-2 md:p-3 transition"
      >
        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full p-2 md:p-3 transition"
      >
        <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
      </button>

    </section>
  )
}
