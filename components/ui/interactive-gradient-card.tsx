"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { useMousePositionRef } from "@/components/hooks/use-mouse-position-ref";

interface InteractiveGradientCardProps {
  children: ReactNode;
  className?: string;
  gradientColor?: string;
}

export function InteractiveGradientCard({
  children,
  className = "",
  gradientColor = "rgba(255, 138, 0, 0.08)", // Default brand orange, low opacity
}: InteractiveGradientCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useMousePositionRef(containerRef);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      if (isHovered) {
        setPosition({ ...positionRef.current });
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    if (isHovered) {
      updatePosition();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, positionRef]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 60%)`,
        }}
      />
      {/* We need the children to be above the background hover layer */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
