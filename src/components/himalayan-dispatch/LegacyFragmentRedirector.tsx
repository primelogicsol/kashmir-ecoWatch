'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LEGACY_FRAGMENT_REDIRECTS } from '@/lib/himalayan-dispatch-routes';

/**
 * Upgrades legacy fragment-based institutional URLs (e.g., `/bureaus#kashmir-bureau`,
 * `/editorial-board#publication-imprint`, `/join-newsroom#editorial-appointments`)
 * to their dedicated canonical pages, while leaving ordinary within-page TOC anchors intact.
 */
export function LegacyFragmentRedirector() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return;
    const hash = window.location.hash.toLowerCase();
    if (!hash) return;

    const mapForPath = LEGACY_FRAGMENT_REDIRECTS[pathname];
    if (mapForPath && mapForPath[hash]) {
      router.replace(mapForPath[hash]);
    }
  }, [pathname, router]);

  return null;
}
