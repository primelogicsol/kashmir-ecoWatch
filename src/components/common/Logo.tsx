import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { KEW_OFFICIAL_LOGO_PATH } from '@/lib/seo/entity-identity';

export { KEW_OFFICIAL_LOGO_PATH };

interface LogoProps {
  variant?: 'expanded' | 'sticky' | 'compact' | 'mobile';
  className?: string;
}

/**
 * Reusable Institutional Logo Mark for Scientific Publications, Covers, Headers & Print.
 * Preserves original aspect ratio, high-resolution transparency, and guaranteed contrast
 * across both dark Premiere Obsidian (#080a12) and light Archival Parchment / Print layouts.
 */
export function KewOfficialPublicationLogo({
  size = 'md',
  className,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const dims = {
    xs: 'h-7 w-7 p-0.5',
    sm: 'h-9 w-9 p-1',
    md: 'h-12 w-12 p-1',
    lg: 'h-14 w-14 sm:h-16 sm:w-16 p-1.5',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-sm border select-none',
        dims,
        className
      )}
      style={{
        backgroundColor: '#080a12',
        borderColor: '#40382e',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      <img
        src={KEW_OFFICIAL_LOGO_PATH}
        alt="Kashmir EcoWatch"
        className="h-full w-full object-contain"
        loading="eager"
        decoding="sync"
      />
    </span>
  );
}

/**
 * Global Header Logo Component for Kashmir EcoWatch.
 * Uses ONLY the single locked original logo asset (`/kew_LOGO.png`) without artwork modification.
 *
 * Variants:
 * - expanded: Large standalone original KEW logo for the Expanded Institutional Masthead (no separate text)
 * - sticky / compact: Small original KEW logo + compact white "Kashmir EcoWatch" text for Sticky Mode
 * - mobile: Small original KEW logo + compact white "Kashmir EcoWatch" text for the Explore drawer header
 */
export function Logo({ variant = 'expanded', className }: LogoProps) {
  const isExpanded = variant === 'expanded';
  const isSticky = variant === 'sticky' || variant === 'compact';
  const isMobileDrawer = variant === 'mobile';

  return (
    <Link
      href="/"
      aria-label="Kashmir EcoWatch — Home"
      className={cn(
        'kew-brand-link group relative inline-flex items-center shrink-0 transition-opacity duration-200 hover:opacity-95',
        isExpanded && 'kew-brand-link--expanded',
        isSticky && 'kew-brand-link--sticky',
        isMobileDrawer && 'kew-brand-link--drawer gap-2.5',
        className
      )}
    >
      <img
        src={KEW_OFFICIAL_LOGO_PATH}
        alt="Kashmir EcoWatch"
        decoding="async"
        className={cn(
          'object-contain shrink-0 select-none transition-transform duration-300 group-hover:scale-[1.03]',
          isExpanded && 'kew-logo-img--expanded drop-shadow-lg',
          isSticky && 'kew-logo-img--sticky drop-shadow-md',
          isMobileDrawer && 'w-9 h-9 drop-shadow-md'
        )}
      />

      {isSticky && (
        <span className="kew-sticky-wordmark select-none">
          <span className="kew-sticky-wordmark-title">Kashmir EcoWatch</span>
        </span>
      )}

      {isMobileDrawer && (
        <span className="text-sm font-bold text-white tracking-tight whitespace-nowrap select-none">
          Kashmir EcoWatch
        </span>
      )}
    </Link>
  );
}
