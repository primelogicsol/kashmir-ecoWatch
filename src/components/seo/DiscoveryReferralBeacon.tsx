'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Privacy-safe, first-party discovery & AI referral observer.
 * Records only external search-engine, AI-assistant, and scholarly referrers
 * (never tracks PII, cookies, or keystrokes) so the KEW Admin Discovery
 * Command Center displays verified live referral attribution.
 */
export function DiscoveryReferralBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (
      !pathname ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/newsroom') ||
      pathname.startsWith('/editorial-cms') ||
      pathname.startsWith('/journalist-sign-in') ||
      pathname.startsWith('/himalayan-dispatch/newsroom') ||
      pathname.startsWith('/himalayan-dispatch/editorial-cms') ||
      pathname.startsWith('/himalayan-dispatch/journalist-sign-in')
    ) {
      return;
    }

    const referrer = document.referrer || '';
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || '';
    const utmMedium = params.get('utm_medium') || '';
    const utmCampaign = params.get('utm_campaign') || '';

    const isExternalReferrer =
      referrer.length > 0 && !referrer.includes(window.location.host);

    if (!isExternalReferrer && !utmSource) return;

    const dedupeKey = `kew_disc_${pathname}_${referrer}_${utmSource}`;
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, '1');

    const payload = JSON.stringify({
      pathname,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/discovery/telemetry', blob);
      } else {
        fetch('/api/discovery/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Never block UI rendering on telemetry
    }
  }, [pathname]);

  return null;
}
