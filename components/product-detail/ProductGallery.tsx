"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function ProductGallery({ images }: { images: string[] }) {
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-brand-cream border border-brand-orange/20 overflow-hidden group rounded-2xl">
        <Image 
          src={activeImg} 
          alt="Product details" 
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-brand-gold text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-full">
          Harvest 2023
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveImg(img)}
            className={`relative w-24 h-24 flex-shrink-0 border-2 transition-all rounded-xl overflow-hidden ${
              activeImg === img ? 'border-brand-red shadow-md' : 'border-gray-200 hover:border-brand-orange'
            } bg-brand-cream p-1`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover rounded-lg" />
          </button>
        ))}
        {/* Mock Video button */}
        <button className="relative w-24 h-24 flex-shrink-0 border border-gray-200 bg-brand-cream rounded-xl flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-colors">
           <Play className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}
