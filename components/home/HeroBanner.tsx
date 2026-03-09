"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BACKGROUND_IMAGES = [
  '/img (1).jpg',
  '/img (2).jpg',
  '/img (3).jpg',
  '/img (4).jpg',
];

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-brand-cream overflow-hidden aspect-[1/1] sm:aspect-[4/3] md:aspect-auto md:h-[100vh] flex items-center justify-center mt-[72px] md:mt-0">
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={BACKGROUND_IMAGES[currentImageIndex]}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
      </div>
    </section>
  );
}
