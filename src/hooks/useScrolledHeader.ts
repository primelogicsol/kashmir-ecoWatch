'use client';

import { useState, useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

interface UseScrolledHeaderOptions {
  /** Scroll threshold in pixels to trigger compact state (default: 50) */
  threshold?: number;
  /** Enable smooth transition delay on scroll up (default: true) */
  smoothTransition?: boolean;
}

/**
 * Masthead visibility observer that identifies the exact moment the Expanded Institutional Masthead
 * scrolls completely out of the viewport so ONE Compact Sticky Navigation bar activates cleanly
 * without duplicate logos, flickering, or layout shifts.
 */
export function useMastheadStickyObserver(mastheadRef: RefObject<HTMLElement | null>): boolean {
  const [isStickyActive, setIsStickyActive] = useState(false);
  const activeRef = useRef(false);

  useLayoutEffect(() => {
    const node = mastheadRef.current;
    if (!node || typeof window === 'undefined') return;
    const rect = node.getBoundingClientRect();
    if (rect.height > 0) {
      const next = rect.bottom <= 1;
      activeRef.current = next;
      setIsStickyActive(next);
    }
  }, [mastheadRef]);

  useEffect(() => {
    const node = mastheadRef.current;
    if (!node || typeof window === 'undefined') return;

    let rafId: number | null = null;

    const evaluate = () => {
      rafId = null;
      const el = mastheadRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.height <= 0) return;
      const next = rect.bottom <= 1;
      if (next !== activeRef.current) {
        activeRef.current = next;
        setIsStickyActive(next);
      }
    };

    const scheduleEvaluate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(evaluate);
      }
    };

    const onScroll = () => {
      // Zero-reflow instant restoration when returning to the very top of the document
      if (activeRef.current && window.scrollY <= 4) {
        activeRef.current = false;
        setIsStickyActive(false);
        return;
      }
      scheduleEvaluate();
    };

    evaluate();

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              if (!entry) return;
              const outOfView = !entry.isIntersecting && entry.boundingClientRect.bottom <= 2;
              if (outOfView !== activeRef.current) {
                activeRef.current = outOfView;
                setIsStickyActive(outOfView);
              }
            },
            {
              root: null,
              threshold: [0, 0.01],
            }
          )
        : null;

    observer?.observe(node);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });
    window.visualViewport?.addEventListener('resize', scheduleEvaluate, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', scheduleEvaluate);
      window.visualViewport?.removeEventListener('resize', scheduleEvaluate);
    };
  }, [mastheadRef]);

  return isStickyActive;
}

/**
 * Legacy compatibility export preserved for external consumers, if any.
 */
export function useScrolledHeader(options: UseScrolledHeaderOptions = {}) {
  const { threshold = 50 } = options;
  const [isScrolled, setIsScrolled] = useState(false);
  const lastStateRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId: number | null = null;
    const check = () => {
      rafId = null;
      const next = window.scrollY > threshold;
      if (next !== lastStateRef.current) {
        lastStateRef.current = next;
        setIsScrolled(next);
      }
    };
    check();
    const onScroll = () => {
      if (rafId === null) rafId = window.requestAnimationFrame(check);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return {
    isScrolled,
    isCompact: isScrolled,
    scrollDirection: 'down' as const,
    headerState: isScrolled ? ('compact' as const) : ('expanded' as const),
  };
}
