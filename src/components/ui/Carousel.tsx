'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  itemWidth?: {
    mobile: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  snapAlign?: 'start' | 'center' | 'end';
  ariaLabel?: string;
}

export function Carousel({
  children,
  className,
  itemWidth = { mobile: 280, tablet: 300, desktop: 320 },
  gap = 'gap-3 sm:gap-4 md:gap-6',
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  snapAlign = 'start',
  ariaLabel = 'Carousel',
}: CarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const getScrollAmount = useCallback(() => {
    if (!containerRef.current) return itemWidth.mobile;
    const firstChild = containerRef.current.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const gapPx = parseFloat(window.getComputedStyle(containerRef.current).columnGap || '16') || 16;
      return firstChild.getBoundingClientRect().width + gapPx;
    }
    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth >= 1024) return itemWidth.desktop || itemWidth.tablet || itemWidth.mobile;
    if (containerWidth >= 768) return itemWidth.tablet || itemWidth.mobile;
    return Math.min(itemWidth.mobile, containerWidth);
  }, [itemWidth]);

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (typeof window === 'undefined') return;
      const availableWidth = containerRef.current?.clientWidth || window.innerWidth;
      const gapToken = parseInt(gap.split(' ')[0]?.replace('gap-', '') || '3', 10);
      const gapPx = Number.isFinite(gapToken) ? gapToken * 4 : 12;
      const baseWidth = Math.max(180, Math.min(itemWidth.mobile, availableWidth));
      const itemWidthTotal = Math.max(1, baseWidth + gapPx);
      setVisibleItems(Math.max(1, Math.floor(availableWidth / itemWidthTotal)));
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, [itemWidth.mobile, gap]);

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = containerRef.current;
    setScrollPosition(sl);
    setIsAtStart(sl <= 8);
    setIsAtEnd(sl + clientWidth >= scrollWidth - 8);
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition, { passive: true });
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [checkScrollPosition, children]);

  useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        if (!containerRef.current) return;
        const { scrollLeft: sl, scrollWidth, clientWidth } = containerRef.current;
        if (sl + clientWidth >= scrollWidth - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, isDragging, getScrollAmount]);

  const scrollPrev = useCallback(() => {
    containerRef.current?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  }, [getScrollAmount]);

  const scrollNext = useCallback(() => {
    containerRef.current?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  }, [getScrollAmount]);

  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 1.25;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Do not hijack clicks on interactive buttons or links inside cards
    const target = e.target as HTMLElement | null;
    if (target?.closest('a, button, input, select, textarea')) return;

    setIsDragging(true);
    setStartX(e.clientX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
      containerRef.current.style.setProperty('cursor', 'grabbing');
    }
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 1.25;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current?.style.setProperty('cursor', 'grab');
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  const totalCount = React.Children.count(children);
  const safeVisible = Math.max(1, visibleItems);
  const dotCount = Math.max(1, Math.ceil(totalCount / safeVisible));

  return (
    <div className={cn('relative group/carousel w-full max-w-full', className)}>
      {/* Accessible Non-Overlapping Control Bar (visible on tablet/desktop & keyboard focus) */}
      {showArrows && totalCount > 1 && (
        <div className="hidden sm:flex items-center justify-end gap-2 mb-3">
          <button
            onClick={scrollPrev}
            disabled={isAtStart}
            className={cn(
              'w-9 h-9 rounded-md bg-slate-900 border border-white/15 flex items-center justify-center text-white transition-all',
              'hover:bg-emerald-600 hover:border-emerald-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
              isAtStart && 'opacity-40 cursor-not-allowed hover:bg-slate-900 hover:border-white/15'
            )}
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            disabled={isAtEnd}
            className={cn(
              'w-9 h-9 rounded-md bg-slate-900 border border-white/15 flex items-center justify-center text-white transition-all',
              'hover:bg-emerald-600 hover:border-emerald-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
              isAtEnd && 'opacity-40 cursor-not-allowed hover:bg-slate-900 hover:border-white/15'
            )}
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Carousel Track — equal-height stretch, zero edge clipping */}
      <div
        ref={containerRef}
        className={cn(
          'flex items-stretch overflow-x-auto scrollbar-hide px-0.5 py-1',
          gap,
          snapAlign === 'center' && 'snap-center',
          snapAlign === 'end' && 'snap-end',
          snapAlign === 'start' && 'snap-start',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg'
        )}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleContainerKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {/* Accessible Mobile Pagination Dots (44x44 touch targets) */}
      {dotCount > 1 && (
        <div
          className="flex flex-wrap justify-center items-center gap-1 mt-3 sm:hidden"
          role="tablist"
          aria-label="Carousel slide indicators"
        >
          {Array.from({ length: dotCount }, (_, index) => {
            const stepPx = Math.max(200, itemWidth.mobile);
            const activeIdx = Math.min(dotCount - 1, Math.max(0, Math.round(scrollPosition / stepPx)));
            const isActive = activeIdx === index;
            return (
              <button
                key={index}
                onClick={() =>
                  containerRef.current?.scrollTo({
                    left: index * getScrollAmount(),
                    behavior: 'smooth',
                  })
                }
                className="carousel-touch-target"
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={isActive}
                role="tab"
                type="button"
              >
                <span
                  className={cn(
                    'carousel-dot transition-all duration-300',
                    isActive
                      ? 'bg-emerald-400 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                      : 'bg-slate-600 hover:bg-slate-500'
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
