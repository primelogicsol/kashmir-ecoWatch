import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

export default function HimalayanDispatchNotFound() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-20 sm:py-28">
      <div
        className="max-w-[920px] mx-auto p-8 sm:p-14 border space-y-6"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <p className="hd-kicker">HTTP 404 · FOLIO NOT FOUND ON HIMALAYAN DISPATCH</p>
        <h1
          className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
          style={{ color: 'var(--hd-fg)' }}
        >
          This Address Is Not Part of the Periodical Archive
        </h1>
        <p
          className="hd-font-body text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--hd-fg-secondary)' }}
        >
          The page you requested does not exist within{' '}
          <strong>Himalayan Dispatch</strong> (<code>dispatch.kashmir-ecowatch.com</code>) or
          belongs to a separate scientific observatory module hosted on the main{' '}
          <strong>Kashmir EcoWatch</strong> platform.
        </p>

        <div
          className="pt-4 border-t flex flex-wrap items-center gap-4"
          style={{ borderColor: 'var(--hd-rule)' }}
        >
          <Link
            href={HD_ROUTES.root}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
            style={{ backgroundColor: 'var(--hd-copper-solid)' }}
          >
            <span>Himalayan Dispatch Front Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={HD_ROUTES.dailyDispatch}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              color: 'var(--hd-fg)',
              backgroundColor: 'var(--hd-bg)',
            }}
          >
            <Compass className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
            <span>The Daily Dispatch</span>
          </Link>

          <a
            href={toKewPlatformUrl('/')}
            className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 text-xs font-medium tracking-[0.16em] uppercase hover:underline"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
            <span>Kashmir EcoWatch Main Platform</span>
          </a>
        </div>
      </div>
    </div>
  );
}
