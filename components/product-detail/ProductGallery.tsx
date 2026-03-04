"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function ProductGallery({ images }: { images: string[] }) {
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-[#f8f6ec] border border-[#e6e2d3] overflow-hidden group">
        <Image 
          src={activeImg} 
          alt="Product details" 
          fill
          className="object-contain p-8 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-[#c8982a] text-[#2a1a0f] text-xs font-bold px-2 py-1 uppercase tracking-wider">
          Harvest 2023
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveImg(img)}
            className={`relative w-24 h-24 flex-shrink-0 border-2 transition-all ${
              activeImg === img ? 'border-brand-red' : 'border-[#e6e2d3] hover:border-brand-orange'
            } bg-[#f8f6ec] p-2`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover mix-blend-multiply" />
          </button>
        ))}
        {/* Mock Video button */}
        <button className="relative w-24 h-24 flex-shrink-0 border border-[#e6e2d3] bg-[#f0eee4] flex items-center justify-center text-gray-400 hover:text-brand-orange transition-colors">
           <Play className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}
