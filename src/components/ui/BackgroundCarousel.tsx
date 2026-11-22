'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BackgroundCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  overlayClassName?: string;
}

export function BackgroundCarousel({
  images,
  interval = 5000,
  className,
  overlayClassName,
}: BackgroundCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const uniqueImages = React.useMemo(() => {
    const valid = (images || []).filter(Boolean);
    return Array.from(new Set(valid));
  }, [images]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % (uniqueImages.length || 1));
  }, [uniqueImages.length]);

  useEffect(() => {
    if (uniqueImages.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, uniqueImages.length]);

  return (
    <>
      {uniqueImages.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <div className={cn("absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/90", overlayClassName)} />

      {uniqueImages.length > 1 && (
        <div
          className={cn(
            'absolute z-30 flex items-center justify-center gap-1 left-1/2 -translate-x-1/2 bottom-5 sm:bottom-6 pointer-events-auto overflow-visible',
            className
          )}
          role="tablist"
          aria-label="Carousel pagination"
        >
          {uniqueImages.map((_, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="carousel-touch-target"
                aria-label={`Slide ${i + 1}`}
                aria-selected={isActive}
                role="tab"
                type="button"
              >
                <span
                  className={cn(
                    'carousel-dot transition-all duration-300',
                    isActive
                      ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.85)] ring-2 ring-emerald-400/90'
                      : 'bg-white/40 hover:bg-white/75 hover:scale-110'
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
