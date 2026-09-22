"use client"

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';

export default function ProductGallery({ images }: { images: string[] }) {
  const validImages = images && images.length > 0 ? images.filter(Boolean) : ['/hero-spice-bg.jpg'];
  const [activeImg, setActiveImg] = useState(validImages[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 select-none max-w-[540px] w-full mx-auto lg:mx-0">
      {/* PRIMARY IMAGE STAGE (Amazon/Flipkart Magnifying Glass Zoom on Desktop) */}
      <div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group/stage relative aspect-square w-full bg-[#f5f5f5] overflow-hidden rounded-none border border-[#e5e5e5] flex items-center justify-center cursor-crosshair touch-manipulation"
      >
        {/* Zoom Hint Badge (hidden on mobile touch or when zoomed) */}
        <div className={`hidden sm:flex absolute top-3 right-3 z-20 pointer-events-none transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#cacacb] text-[11px] font-medium text-[#111111] px-2.5 py-1 rounded-full shadow-sm">
            <ZoomIn className="w-3.5 h-3.5 text-[#707072]" />
            <span>Hover to zoom</span>
          </div>
        </div>

        {/* 2.5x Magnification Zoom Image */}
        <div 
          className="relative w-full h-full will-change-transform"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
            transition: isZoomed ? 'transform 0.05s ease-out' : 'transform 0.3s ease-out',
          }}
        >
          <Image 
            src={activeImg || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
            alt="Product stage" 
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
            className="object-contain p-4 sm:p-6 md:p-8 pointer-events-none select-none"
          />
        </div>
      </div>

      {/* THUMBNAIL SELECTOR ROW */}
      {validImages.length > 1 && (
        <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
          {validImages.map((img, idx) => {
            const isActive = activeImg === img;
            return (
              <button 
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-[#f5f5f5] rounded-none overflow-hidden snap-start transition-all ${
                  isActive 
                    ? 'border-2 border-[#111111]' 
                    : 'border border-[#cacacb] hover:border-[#111111] opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-2" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
