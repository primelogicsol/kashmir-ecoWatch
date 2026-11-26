'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { PremiumStickyHeader } from '@/components/sections/PremiumStickyHeader';
import { KEW_OFFICIAL_LOGO_PATH } from '@/lib/seo/entity-identity';
import Link from 'next/link';

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 h-14 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 flex items-center px-4">
      <Link href="/" className="inline-flex items-center gap-2.5">
        <img
          src={KEW_OFFICIAL_LOGO_PATH}
          alt="Kashmir EcoWatch"
          className="w-10 h-10 object-contain shrink-0"
        />
        <span className="text-white font-bold text-sm whitespace-nowrap">Kashmir EcoWatch</span>
      </Link>
    </header>
  );
}

/**
 * Wraps PremiumStickyHeader in an error boundary so a navigation crash
 * doesn't take down the entire application.
 * Omitted inside Himalayan Dispatch (both on dispatch.kashmir-ecowatch.com
 * via rewritten App Router segment and on /himalayan-dispatch) and the
 * Virtual Scientific Hall live room interface so excluded modules remain untouched.
 */
export function SafeHeader() {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const isVirtualHallApp =
    pathname?.startsWith('/webinars/room/') ||
    (pathname?.startsWith('/webinars/sessions/') && pathname?.endsWith('/live'));
  if (
    segment === 'himalayan-dispatch' ||
    pathname?.startsWith('/himalayan-dispatch') ||
    isVirtualHallApp
  ) {
    return null;
  }
  return (
    <ErrorBoundary sectionName="Navigation" fallback={<HeaderFallback />}>
      <PremiumStickyHeader />
    </ErrorBoundary>
  );
}
