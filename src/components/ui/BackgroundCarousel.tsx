'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { resolveWebinarSlideAssetMeta } from '@/data/webinar-hero-carousel';
import {
  CinematicCarouselController,
  type CinematicSlideMeta,
} from '@/components/ui/CinematicCarouselController';

function computeTextZoneLuminance(img: HTMLImageElement): number | null {
  try {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return null;
    const canvas = document.createElement('canvas');
    const sw = 24;
    const sh = 16;
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    // Sample left-to-center text zone (0%..68% width, 8%..88% height) where hero copy sits
    ctx.drawImage(img, 0, nh * 0.08, nw * 0.68, nh * 0.8, 0, 0, sw, sh);
    const { data } = ctx.getImageData(0, 0, sw, sh);
    const lums: number[] = [];
    for (let k = 0; k < data.length; k += 4) {
      const toLin = (c: number) => {
        const v = c / 255;
        return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      lums.push(0.2126 * toLin(data[k]) + 0.7152 * toLin(data[k + 1]) + 0.0722 * toLin(data[k + 2]));
    }
    if (lums.length === 0) return null;
    lums.sort((a, b) => a - b);
    // Use 82nd-percentile bright patch in text zone so bright water/snow/sky bands trigger adaptive protection
    return lums[Math.min(lums.length - 1, Math.floor(lums.length * 0.82))];
  } catch {
    return null;
  }
}

interface BackgroundCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  overlayClassName?: string;
  /** Optional controlled active slide index for synchronized hero content */
  activeIndex?: number;
  /** Callback fired when active slide changes via timer or user pagination */
  onActiveIndexChange?: (index: number) => void;
  /** External interaction pause flag (e.g. while hovering or focusing foreground CTAs) */
  externalPaused?: boolean;
  /** Optional per-slide metadata for accessible indicator labels & tooltips */
  slidesMeta?: readonly CinematicSlideMeta[];
  /** Show compact accessible Pause/Resume control (enabled globally across KEW hero carousels) */
  showPauseControl?: boolean;
}

export function BackgroundCarousel({
  images,
  interval = 5000,
  className,
  overlayClassName,
  activeIndex,
  onActiveIndexChange,
  externalPaused = false,
  slidesMeta,
}: BackgroundCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [explicitResumeInReducedMotion, setExplicitResumeInReducedMotion] = useState(false);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(() => new Set([0]));
  const [slideLuminances, setSlideLuminances] = useState<Record<number, number>>({});
  const [transitionPrevIndex, setTransitionPrevIndex] = useState<number | null>(null);
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});

  const uniqueImages = React.useMemo(() => {
    const valid = (images || []).filter(Boolean);
    return Array.from(new Set(valid));
  }, [images]);

  const slideCount = uniqueImages.length;
  const currentIndex =
    typeof activeIndex === 'number'
      ? ((activeIndex % (slideCount || 1)) + (slideCount || 1)) % (slideCount || 1)
      : ((internalIndex % (slideCount || 1)) + (slideCount || 1)) % (slideCount || 1);

  const prevIndexTracker = useRef<number>(currentIndex);

  useEffect(() => {
    if (prevIndexTracker.current !== currentIndex) {
      setTransitionPrevIndex(prevIndexTracker.current);
      prevIndexTracker.current = currentIndex;
      const t = window.setTimeout(() => setTransitionPrevIndex(null), 1050);
      return () => window.clearTimeout(t);
    }
  }, [currentIndex]);

  const recordImageLuminance = useCallback((idx: number, img: HTMLImageElement | null) => {
    if (!img) return;
    const lum = computeTextZoneLuminance(img);
    if (lum === null) return;
    setSlideLuminances((prev) => {
      if (prev[idx] !== undefined && Math.abs(prev[idx] - lum) < 0.005) return prev;
      return { ...prev, [idx]: lum };
    });
  }, []);

  useEffect(() => {
    Object.entries(imgRefs.current).forEach(([idxStr, el]) => {
      const idx = Number(idxStr);
      if (el && el.complete && el.naturalWidth > 0 && slideLuminances[idx] === undefined) {
        recordImageLuminance(idx, el);
      }
    });
  }, [loadedIndices, uniqueImages, slideLuminances, recordImageLuminance]);

  // Detect OS / browser prefers-reduced-motion setting
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const isAutoPaused =
    userPaused ||
    externalPaused ||
    (prefersReducedMotion && !explicitResumeInReducedMotion);

  const setSlide = useCallback(
    (nextIdx: number) => {
      if (slideCount <= 0) return;
      const bounded = ((nextIdx % slideCount) + slideCount) % slideCount;
      setLoadedIndices((prev) => {
        if (prev.has(bounded)) return prev;
        const copy = new Set(prev);
        copy.add(bounded);
        return copy;
      });
      if (typeof activeIndex !== 'number') {
        setInternalIndex(bounded);
      }
      onActiveIndexChange?.(bounded);
    },
    [slideCount, activeIndex, onActiveIndexChange]
  );

  const goTo = useCallback(
    (index: number) => {
      setSlide(index);
    },
    [setSlide]
  );

  const next = useCallback(() => {
    if (slideCount <= 1) return;
    setSlide((currentIndex + 1) % slideCount);
  }, [currentIndex, slideCount, setSlide]);

  // Preload active slide immediately and warm the upcoming next slide ahead of transition
  useEffect(() => {
    if (slideCount <= 0) return;
    setLoadedIndices((prev) => {
      if (prev.has(currentIndex)) return prev;
      const copy = new Set(prev);
      copy.add(currentIndex);
      return copy;
    });
    if (slideCount <= 1) return;
    const nextIdx = (currentIndex + 1) % slideCount;
    const warmupTimer = window.setTimeout(() => {
      setLoadedIndices((prev) => {
        if (prev.has(nextIdx)) return prev;
        const copy = new Set(prev);
        copy.add(nextIdx);
        return copy;
      });
    }, 1100);
    return () => window.clearTimeout(warmupTimer);
  }, [currentIndex, slideCount]);

  // Auto-advance timer (pauses on user pause, CTA hover/focus, or reduced-motion preference)
  useEffect(() => {
    if (slideCount <= 1 || isAutoPaused) return;
    const timer = window.setInterval(next, interval);
    return () => window.clearInterval(timer);
  }, [next, interval, slideCount, isAutoPaused]);

  const handleTogglePause = useCallback(() => {
    if (prefersReducedMotion && !explicitResumeInReducedMotion && !userPaused) {
      setExplicitResumeInReducedMotion(true);
      setUserPaused(false);
      return;
    }
    setUserPaused((prev) => {
      const nextPaused = !prev;
      if (nextPaused && prefersReducedMotion) {
        setExplicitResumeInReducedMotion(false);
      }
      return nextPaused;
    });
  }, [prefersReducedMotion, explicitResumeInReducedMotion, userPaused]);

  const isManuallyOrReducedPaused =
    userPaused || (prefersReducedMotion && !explicitResumeInReducedMotion);

  const activeLum = slideLuminances[currentIndex];
  const prevLum = transitionPrevIndex !== null ? slideLuminances[transitionPrevIndex] : undefined;
  const effectiveLum =
    activeLum !== undefined && prevLum !== undefined
      ? Math.max(activeLum, prevLum)
      : activeLum ?? prevLum ?? 0.36;

  const scrimTier: 'dark' | 'balanced' | 'bright' =
    effectiveLum >= 0.44 ? 'bright' : effectiveLum < 0.18 ? 'dark' : 'balanced';

  const scrimVars = (
    scrimTier === 'bright'
      ? {
          '--kew-scrim-strong': '0.90',
          '--kew-scrim-mid': '0.80',
          '--kew-scrim-soft': '0.38',
          '--kew-scrim-edge': '0.22',
        }
      : scrimTier === 'dark'
      ? {
          '--kew-scrim-strong': '0.80',
          '--kew-scrim-mid': '0.68',
          '--kew-scrim-soft': '0.24',
          '--kew-scrim-edge': '0.14',
        }
      : {
          '--kew-scrim-strong': '0.86',
          '--kew-scrim-mid': '0.75',
          '--kew-scrim-soft': '0.34',
          '--kew-scrim-edge': '0.20',
        }
  ) as React.CSSProperties;

  return (
    <>
      {uniqueImages.map((rawSrc, i) => {
        const isActive = i === currentIndex;
        const shouldMountImage = i === 0 || isActive || loadedIndices.has(i);
        const meta = resolveWebinarSlideAssetMeta(rawSrc);
        const focalStyle = {
          '--kew-focal-mobile': meta.focalMobile || '50% 40%',
          '--kew-focal-desktop': meta.focalDesktop || '50% 40%',
        } as React.CSSProperties;

        return (
          <div
            key={`${rawSrc}-${i}`}
            data-carousel-slide-index={i}
            data-carousel-slide-active={isActive ? 'true' : 'false'}
            aria-hidden="true"
            className={cn(
              'absolute inset-0 overflow-hidden pointer-events-none select-none',
              prefersReducedMotion
                ? 'transition-none'
                : 'transition-opacity duration-1000 ease-in-out'
            )}
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {shouldMountImage &&
              (meta.fallbackSrc && meta.src.endsWith('.webp') ? (
                <picture className="block w-full h-full">
                  <source srcSet={meta.src} type="image/webp" />
                  <img
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    onLoad={(e) => recordImageLuminance(i, e.currentTarget)}
                    src={meta.fallbackSrc}
                    alt=""
                    decoding={i === 0 ? 'sync' : 'async'}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    style={focalStyle}
                    className="w-full h-full kew-carousel-media"
                  />
                </picture>
              ) : (
                <img
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  onLoad={(e) => recordImageLuminance(i, e.currentTarget)}
                  src={meta.src}
                  alt=""
                  decoding={i === 0 ? 'sync' : 'async'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  style={focalStyle}
                  className="w-full h-full kew-carousel-media"
                />
              ))}
          </div>
        );
      })}

      <div
        aria-hidden="true"
        data-kew-scrim-tier={scrimTier}
        style={scrimVars}
        className="kew-hero-directional-scrim"
      />
      {overlayClassName && (
        <div
          aria-hidden="true"
          className={cn('absolute inset-0 pointer-events-none', overlayClassName)}
        />
      )}

      {slideCount > 1 && (
        <CinematicCarouselController
          slideCount={slideCount}
          currentIndex={currentIndex}
          onSelectSlide={goTo}
          isPaused={isManuallyOrReducedPaused}
          onTogglePause={handleTogglePause}
          slidesMeta={slidesMeta}
          ariaLabel="Cinematic hero pagination"
          mobilePlacement="overlay"
          className={className}
        />
      )}
    </>
  );
}
