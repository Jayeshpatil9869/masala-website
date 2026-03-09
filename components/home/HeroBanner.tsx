"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const BACKGROUND_IMAGES = [
  "/img (1).jpg",
  "/img (2).jpg",
  "/img (3).jpg",
  "/img (4).jpg",
]

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1
    };
  }
};

export default function HeroBanner() {
  const [[page, direction], setPage] = useState([0, 0])

  const currentImageIndex = Math.abs(page % BACKGROUND_IMAGES.length)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [page])

  return (
    <section className="relative w-full bg-brand-cream overflow-hidden aspect-[4/3] md:aspect-[1920/1081] flex items-center justify-center mt-[72px] md:mt-0">

      {/* SLIDER IMAGE */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={BACKGROUND_IMAGES[currentImageIndex]}
          alt={`Hero ${currentImageIndex}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

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
