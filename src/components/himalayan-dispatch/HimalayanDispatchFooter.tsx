'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import {
  FOOTER_BUREAU_LINKS,
  FOOTER_DEPARTMENT_LINKS,
  FOOTER_EDITORIAL_AFFAIRS_LINKS,
  FOOTER_GOVERNANCE_LINKS,
  FOOTER_PERIODICAL_LINKS,
  FOOTER_RECRUITMENT_LINKS,
  FOOTER_SUPPORTING_LINKS,
  HD_ROUTES,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';

export function HimalayanDispatchFooter() {
  return (
    <footer
      className="w-full border-t mt-20 sm:mt-28 px-4 sm:px-8 lg:px-14 pt-16 pb-14"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-recessed)',
        color: 'var(--hd-fg)',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Tier 1: Masthead Identity, Fairfax Publishing Imprint & Source Protection Charter */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b"
          style={{ borderColor: 'var(--hd-rule)' }}
        >
          {/* Left 5 Cols: Masthead Lockup, Mandate & Return to KEW */}
          <div className="lg:col-span-5 space-y-5">
            <p className="hd-kicker">EST. 2026 · KEW WESTERN HIMALAYAS</p>
            <div>
              <Link href={HD_ROUTES.root} className="inline-block group">
                <span className="hd-font-display block text-3xl sm:text-4xl font-semibold tracking-[0.12em] uppercase leading-none group-hover:opacity-90">
                  HIMALAYAN
                </span>
                <span
                  className="hd-font-display block text-base sm:text-lg tracking-[0.45em] uppercase mt-1.5"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  DISPATCH
                </span>
              </Link>
            </div>
            <p
              className="hd-font-body text-base leading-relaxed max-w-lg"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              An independent digital environmental periodical dedicated to longform narrative
              reporting, cinematic documentary photography, investigative accountability and
              scientific truth across the Western Himalayas.
            </p>
            <div>
              <Link
                href={HD_ROUTES.ourStory}
                className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase hover:underline"
                style={{ color: 'var(--hd-copper)' }}
              >
                <span>Our Founding Story: When Silence Became the Reason to Speak</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href={toKewPlatformUrl('/')}
                className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-85"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  color: 'var(--hd-fg)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                <span>Return to Kashmir EcoWatch</span>
              </a>

              <Link
                href={HD_ROUTES.joinNewsroom}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-90"
                style={{
                  borderColor: 'var(--hd-copper)',
                  color: '#F2EFE7',
                  backgroundColor: 'var(--hd-copper-solid)',
                }}
              >
                <span>Join the Newsroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Middle 3 Cols: Editorial Headquarters & Publishing Office + Positioning */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="hd-kicker">Editorial Headquarters &amp; Publishing Office</h3>
            <address
              className="not-italic hd-font-body text-[15px] leading-relaxed space-y-0.5"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              <p className="font-semibold text-base" style={{ color: 'var(--hd-fg)' }}>
                Fairfax, Virginia · United States of America
              </p>
              <p>Fairfax, VA 22031 · Greater Washington Metropolitan Area</p>
            </address>

            <div
              className="pt-3 border-t hd-font-body text-sm italic leading-relaxed space-y-0.5"
              style={{
                borderColor: 'var(--hd-rule)',
                color: 'var(--hd-fg-muted)',
              }}
            >
              <p>Published in the United States.</p>
              <p>Reporting from the Western Himalayas.</p>
              <p>Written for the world.</p>
            </div>
          </div>

          {/* Right 4 Cols: Source Protection & Verification Panel */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="hd-kicker">Source Protection &amp; Verification</h3>
            <div
              className="p-5 sm:p-6 border space-y-3.5"
              style={{
                borderColor: 'var(--hd-rule)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.14em] uppercase">
                  Source Protection &amp; Verification
                </span>
              </div>
              <p
                className="hd-font-body text-sm leading-relaxed"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                Our editorial standards require fact-checking, scientific review where applicable,
                methodological transparency and the protection of confidential sources and
                unpublished investigations.
              </p>
              <div className="pt-0.5">
                <Link
                  href={HD_ROUTES.sourceProtection}
                  className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase hover:underline"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  <span>Read Source Charter &amp; Verification Standards</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Six-Column Canonical Editorial Information Architecture */}
        <div
          className="py-12 sm:py-14 border-b grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-10"
          style={{ borderColor: 'var(--hd-rule)' }}
        >
          {/* 1. THE PERIODICAL */}
          <div className="space-y-3">
            <h3 className="hd-kicker">The Periodical</h3>
            <ul className="space-y-2.5 pt-1">
              {FOOTER_PERIODICAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hd-font-body text-[15px] leading-snug hover:underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. DEPARTMENTS */}
          <div className="space-y-3">
            <h3 className="hd-kicker">Departments</h3>
            <ul className="space-y-2.5 pt-1">
              {FOOTER_DEPARTMENT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hd-font-body text-[15px] leading-snug hover:underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. REGIONAL BUREAUS */}
          <div className="space-y-3">
            <h3 className="hd-kicker">Regional Bureaus</h3>
            <ul className="space-y-2.5 pt-1">
              {FOOTER_BUREAU_LINKS.map((l) => (
                <li key={l.href} className="flex items-baseline justify-between gap-2">
                  <Link
                    href={l.href}
                    className="hd-font-body text-[15px] leading-snug hover:underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {l.label}
                  </Link>
                  {l.establishing && (
                    <span
                      className="hd-font-sans text-[9px] tracking-[0.14em] uppercase shrink-0"
                      style={{ color: 'var(--hd-fg-muted)' }}
                      title="Distributed reporting desk currently being established — not a physical office"
                    >
                      Est.
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p
              className="hd-font-body text-xs italic leading-snug pt-1"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              Est. denotes distributed reporting desks currently being established, not physical offices.
            </p>
          </div>

          {/* 4. EDITORIAL RECRUITMENT */}
          <div className="space-y-3">
            <h3 className="hd-kicker">Editorial Recruitment</h3>
            <ul className="space-y-2.5 pt-1">
              {FOOTER_RECRUITMENT_LINKS.map((l) => (
                <li key={l.href}>
                  {l.featured ? (
                    <Link
                      href={l.href}
                      className="hd-font-body text-[15.5px] font-semibold inline-flex items-center gap-1.5 pb-0.5 border-b transition-opacity hover:opacity-80"
                      style={{
                        color: 'var(--hd-copper)',
                        borderColor: 'var(--hd-copper)',
                      }}
                    >
                      <span>{l.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  ) : (
                    <Link
                      href={l.href}
                      className="hd-font-body text-[15px] leading-snug hover:underline underline-offset-4 transition-colors"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 5. EDITORIAL AFFAIRS */}
          <div className="space-y-3">
            <h3 className="hd-kicker">Editorial Affairs</h3>
            <ul className="space-y-2.5 pt-1">
              {FOOTER_EDITORIAL_AFFAIRS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hd-font-body text-[15px] leading-snug hover:underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. PUBLISHING & GOVERNANCE */}
          <div className="space-y-3">
            <h3 className="hd-kicker">Publishing &amp; Governance</h3>
            <ul className="space-y-2.5 pt-1">
              {FOOTER_GOVERNANCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hd-font-body text-[15px] leading-snug hover:underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tier 3: Supporting Reader Services, RSS Feed & Copyright Colophon */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {FOOTER_SUPPORTING_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="hd-folio-meta hover:underline underline-offset-4"
                >
                  {s.label}
                </Link>
              ))}
              <a
                href={HD_ROUTES.feedXml}
                className="hd-folio-meta hover:underline underline-offset-4"
              >
                RSS Syndication Feed
              </a>
            </div>
            <p className="hd-folio-meta">
              EDITORIAL HEADQUARTERS &amp; PUBLISHING OFFICE · FAIRFAX, VIRGINIA · USA
            </p>
          </div>

          <div
            className="pt-5 border-t flex items-center justify-center text-center"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <p className="hd-font-sans text-[9.5px] sm:text-[10px] 2xl:text-[11px] font-semibold tracking-[0.11em] xl:tracking-[0.125em] 2xl:tracking-[0.15em] uppercase leading-relaxed">
              <span style={{ color: 'var(--hd-fg)' }}>
                © 2026 HIMALAYAN DISPATCH &nbsp;·&nbsp; A PUBLICATION OF KASHMIR ECOWATCH (KEW) WESTERN HIMALAYAN
              </span>
              <span style={{ color: 'var(--hd-fg-muted)' }}> &nbsp;·&nbsp; </span>
              <span style={{ color: 'var(--hd-copper)' }}>
                PUBLISHED IN THE USA &nbsp;·&nbsp; REPORTING BEYOND BORDERS.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
