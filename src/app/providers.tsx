'use client';

import { GlobalFilterProvider } from '@/context/GlobalFilterContext';

/**
 * Wraps the app in the GlobalFilterProvider so that any page can consume
 * useGlobalFilter(). The actual GlobalFilterBar UI is rendered inline inside
 * each page component (e.g. ProtectedCategoryPage) at the right position.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalFilterProvider>
      {children}
    </GlobalFilterProvider>
  );
}
