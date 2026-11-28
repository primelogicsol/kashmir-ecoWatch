'use client';

import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_PREFIX = 'kew:hero-overlay-dismissed:';

function deriveDefaultRestoreLabel(pathname: string | null): string {
  if (!pathname) return 'Show Panel Details';
  if (pathname === '/webinars') return 'Show Program Details';
  if (pathname.startsWith('/webinars')) return 'Show Session Details';
  if (pathname.startsWith('/earth-human-impact')) return 'Show Telemetry Panel';
  if (pathname.startsWith('/protected-network')) return 'Show Conservation Panel';
  if (pathname.startsWith('/biodiversity')) return 'Show Species Showcase';
  if (pathname.startsWith('/sectoral-eia')) return 'Show Sectoral Showcase';
  if (pathname.startsWith('/environmental-investigations')) return 'Show Dossier Showcase';
  if (pathname.startsWith('/environmental-calendar')) return 'Show Student Action Showcase';
  if (pathname.startsWith('/water-systems')) return 'Show Hydrology Stats';
  return 'Show Panel Details';
}

export interface DismissibleHeroOverlayProps {
  children: React.ReactNode;
  /** Optional unique key per hero panel; defaults to current route pathname for independent session persistence */
  panelId?: string;
  /** Accessible label shown on the unobtrusive reopen pill button */
  restoreLabel?: string;
  /** Accessible aria-label for the upper-right X close control */
  closeLabel?: string;
  /** Wrapper layout classes (e.g. width / responsive visibility) */
  className?: string;
}

export function DismissibleHeroOverlay({
  children,
  panelId,
  restoreLabel,
  closeLabel,
  className,
}: DismissibleHeroOverlayProps) {
  const pathname = usePathname();
  const reactId = useId();
  const panelDomId = `kew-hero-overlay-${reactId.replace(/:/g, '')}`;

  const resolvedKey = panelId || pathname || 'root';
  const storageKey = `${STORAGE_PREFIX}${resolvedKey}`;
  const resolvedRestoreLabel = restoreLabel || deriveDefaultRestoreLabel(pathname);
  const resolvedCloseLabel =
    closeLabel ||
    `Close ${resolvedRestoreLabel.replace(/^Show\s+/i, '').trim().toLowerCase()}`;

  const [isDismissed, setIsDismissed] = useState(false);
  const [enableTransitions, setEnableTransitions] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreBtnRef = useRef<HTMLButtonElement>(null);

  // Restore visitor preference for this specific hero panel across the current browsing session
  useEffect(() => {
    setEnableTransitions(false);
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      setIsDismissed(saved === '1');
    } catch {
      setIsDismissed(false);
    }
    const raf = window.requestAnimationFrame(() => {
      setEnableTransitions(true);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [storageKey]);

  const handleDismiss = useCallback(
    (focusRestore = false) => {
      setEnableTransitions(true);
      setIsDismissed(true);
      try {
        window.sessionStorage.setItem(storageKey, '1');
      } catch {
        // Ignore storage quota / privacy mode errors
      }
      if (focusRestore) {
        window.setTimeout(() => {
          restoreBtnRef.current?.focus({ preventScroll: true });
        }, 35);
      }
    },
    [storageKey]
  );

  const handleRestore = useCallback(
    (focusClose = false) => {
      setEnableTransitions(true);
      setIsDismissed(false);
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        // Ignore storage errors
      }
      if (focusClose) {
        window.setTimeout(() => {
          closeBtnRef.current?.focus({ preventScroll: true });
        }, 35);
      }
    },
    [storageKey]
  );

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && !isDismissed) {
        e.stopPropagation();
        handleDismiss(true);
      }
    },
    [isDismissed, handleDismiss]
  );

  return (
    <div
      data-kew-dark-surface="true"
      data-kew-hero-overlay="true"
      data-overlay-dismissed={isDismissed ? 'true' : 'false'}
      className={cn('grid grid-cols-1 items-start relative', className)}
    >
      {/* Layer 1: Floating Panel Slot (remains in grid track when hidden so hero height, background, and left content shift 0px) */}
      <div
        id={panelDomId}
        onKeyDown={handlePanelKeyDown}
        aria-hidden={isDismissed ? true : undefined}
        inert={isDismissed ? true : undefined}
        className={cn(
          'col-start-1 row-start-1 relative min-w-0',
          enableTransitions && 'transition-[opacity,transform] duration-250 ease-out',
          isDismissed
            ? 'opacity-0 invisible -translate-y-1 scale-[0.985] pointer-events-none select-none'
            : 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto'
        )}
      >
        {children}

        <button
          ref={closeBtnRef}
          type="button"
          onClick={(e) => handleDismiss(e.detail === 0)}
          aria-label={resolvedCloseLabel}
          aria-controls={panelDomId}
          aria-expanded={!isDismissed}
          title={resolvedCloseLabel}
          data-kew-hero-overlay-close="true"
          className="absolute -top-2.5 right-1 sm:-right-2 z-40 w-7 h-7 inline-flex items-center justify-center rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/25 hover:border-emerald-400/70 shadow-lg backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 before:content-[''] before:absolute before:-inset-2"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Layer 2: Unobtrusive Reopen Pill Control */}
      <div
        aria-hidden={!isDismissed ? true : undefined}
        className={cn(
          'col-start-1 row-start-1 justify-self-end self-start z-30',
          enableTransitions && 'transition-[opacity,transform] duration-250 ease-out',
          isDismissed
            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
            : 'opacity-0 invisible translate-y-1 pointer-events-none select-none'
        )}
      >
        <button
          ref={restoreBtnRef}
          type="button"
          tabIndex={isDismissed ? 0 : -1}
          onClick={(e) => handleRestore(e.detail === 0)}
          aria-expanded={!isDismissed}
          aria-controls={panelDomId}
          data-kew-hero-overlay-restore="true"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-slate-950/80 hover:bg-slate-900/95 text-slate-200 hover:text-emerald-300 border border-white/15 hover:border-emerald-400/55 shadow-lg backdrop-blur-md text-xs font-semibold tracking-wide transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{resolvedRestoreLabel}</span>
        </button>
      </div>
    </div>
  );
}
