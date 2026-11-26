'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';

function FooterFallback() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-8 px-4 text-center">
      <p className="text-slate-400 text-sm">
        © {new Date().getFullYear()} Kashmir EcoWatch — Environmental Intelligence Platform
      </p>
    </footer>
  );
}

/**
 * Wraps AdvancedFooter in an error boundary so a footer crash
 * doesn't take down the entire application.
 * Omitted inside Himalayan Dispatch (both on dispatch.kashmir-ecowatch.com
 * and /himalayan-dispatch) so the magazine uses its exclusive colophon.
 */
export function SafeFooter() {
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
    <ErrorBoundary sectionName="Footer" fallback={<FooterFallback />}>
      <AdvancedFooter />
    </ErrorBoundary>
  );
}
