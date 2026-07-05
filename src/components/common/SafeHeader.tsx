'use client';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { PremiumStickyHeader } from '@/components/sections/PremiumStickyHeader';
import Link from 'next/link';

function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 flex items-center px-4">
      <Link href="/" className="flex items-center gap-3">
        <img src="/kew_LOGO.png" alt="Kashmir EcoWatch" className="w-10 h-10 object-contain" />
        <span className="text-white font-bold text-sm">Kashmir EcoWatch</span>
      </Link>
    </header>
  );
}

/**
 * Wraps PremiumStickyHeader in an error boundary so a navigation crash
 * doesn't take down the entire application.
 */
export function SafeHeader() {
  return (
    <ErrorBoundary sectionName="Navigation" fallback={<HeaderFallback />}>
      <PremiumStickyHeader />
    </ErrorBoundary>
  );
}
