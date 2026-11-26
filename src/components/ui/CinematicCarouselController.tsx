'use client';

import React, { useRef } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CinematicSlideMeta {
  id?: string;
  /** Accessible aria-label & descriptive tooltip for this slide */
  label?: string;
  /** Optional target panel DOM id for aria-controls */
  controlsId?: string;
}

export interface CinematicCarouselControllerProps {
  /** Total number of slides in this carousel's registry */
  slideCount: number;
  /** Zero-based active slide index */
  currentIndex: number;
  /** Select a specific zero-based slide index */
  onSelectSlide: (index: number) => void;
  /** Whether automatic rotation is currently paused */
  isPaused: boolean;
  /** Toggle Pause / Play state */
  onTogglePause: () => void;
  /** Optional per-slide accessible labels & tooltips */
  slidesMeta?: readonly CinematicSlideMeta[];
  /** Accessible label for the tablist */
  ariaLabel?: string;
  /** Placement mode on <768px mobile: 'overlay' (bottom-left of hero) or 'inline' (flow child in stage) */
  mobilePlacement?: 'overlay' | 'inline';
  className?: string;
}

/**
 * Centralized Kashmir EcoWatch Cinematic Carousel Controller.
 *
 * - Desktop / 4K / Ultrawide / Vertical Desktop / Tablet (>= 768px):
 *   Frameless right-side vertical progress rail, vertically centered within the hero section.
 *   Displays 01-padded current index at top, minimal vertical slate/emerald indicators,
 *   01-padded total slide count beneath, and compact Pause/Play toggle at bottom.
 * - Mobile (< 768px):
 *   Frameless compact horizontal controller with integrated Pause/Play control.
 */
export function CinematicCarouselController({
  slideCount,
  currentIndex,
  onSelectSlide,
  isPaused,
  onTogglePause,
  slidesMeta,
  ariaLabel = 'Cinematic hero slides',
  mobilePlacement = 'overlay',
  className,
}: CinematicCarouselControllerProps) {
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (slideCount <= 1) return null;

  const safeIndex = ((currentIndex % slideCount) + slideCount) % slideCount;
  const formattedCurrent = String(safeIndex + 1).padStart(2, '0');
  const formattedTotal = String(slideCount).padStart(2, '0');

  const focusAndSelect = (targetIdx: number) => {
    const bounded = ((targetIdx % slideCount) + slideCount) % slideCount;
    onSelectSlide(bounded);
    stepRefs.current[bounded]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      focusAndSelect(idx + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      focusAndSelect(idx - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusAndSelect(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusAndSelect(slideCount - 1);
    }
  };

  const pauseActionLabel = isPaused
    ? 'Resume slide rotation'
    : 'Pause slide rotation';

  return (
    <div
      data-kew-carousel-controller="true"
      data-mobile-placement={mobilePlacement}
      data-slide-count={slideCount}
      data-dense={slideCount > 7 ? 'true' : 'false'}
      data-ultra-dense={slideCount > 10 ? 'true' : 'false'}
      className={cn(
        'kew-cinematic-controller pointer-events-auto select-none',
        mobilePlacement === 'inline'
          ? 'kew-cinematic-controller--mobile-inline'
          : 'kew-cinematic-controller--mobile-overlay',
        className
      )}
    >
      {/* 1. Current Slide Number (Top on Desktop Vertical Rail / Leading on Mobile) */}
      <span
        data-kew-cc-current="true"
        aria-hidden="true"
        className="kew-cc-count kew-cc-current"
      >
        {formattedCurrent}
      </span>

      {/* 2. Dynamic Progress Indicators */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="kew-cc-track"
      >
        {Array.from({ length: slideCount }, (_, idx) => {
          const isActive = idx === safeIndex;
          const meta = slidesMeta?.[idx];
          const numStr = String(idx + 1).padStart(2, '0');
          const label =
            meta?.label || `Slide ${numStr} of ${formattedTotal}`;

          return (
            <button
              key={meta?.id || idx}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              id={meta?.id ? `kew-cc-tab-${meta.id}` : undefined}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={meta?.controlsId}
              aria-label={label}
              title={label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectSlide(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="kew-cc-step"
            >
              <span className="kew-cc-bar" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {/* 3. Total Slide Count (Beneath Indicators on Desktop / Trailing on Mobile) */}
      <span
        data-kew-cc-total="true"
        aria-hidden="true"
        className="kew-cc-count kew-cc-total"
      >
        {formattedTotal}
      </span>

      {/* 4. Compact Frameless Pause / Play Control */}
      <button
        type="button"
        onClick={onTogglePause}
        aria-pressed={isPaused}
        aria-label={pauseActionLabel}
        title={pauseActionLabel}
        data-carousel-pause-toggle="true"
        className="kew-cc-pause"
      >
        {isPaused ? (
          <Play className="kew-cc-pause-icon kew-cc-pause-icon--paused" aria-hidden="true" />
        ) : (
          <Pause className="kew-cc-pause-icon" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
