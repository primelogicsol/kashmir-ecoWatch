import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, ShieldAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HydropowerEnergyJusticeWorkbench } from '@/components/himalayan-dispatch/HydropowerEnergyJusticeWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  HYDROPOWER_MONOGRAPH_CHAPTERS_120,
  HYDROPOWER_MONOGRAPH_VOLUMES_20,
  PRICE_OF_POWER_MONOGRAPH_SPEC,
  PROPOSED_HYDROPOWER_DATA_SOURCES_16,
} from '@/data/himalayan-dispatch-price-of-power-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 12 — The Price of Power (20 Volumes · 120 Chapters) | Himalayan Dispatch',
  description: PRICE_OF_POWER_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-12-the-price-of-power',
  imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

export default function Monograph12PriceOfPowerPage() {
  const canonicalPath = '/himalayan-dispatch/issues/monograph-12-the-price-of-power';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: PRICE_OF_POWER_MONOGRAPH_SPEC.monographCode,
    name: `${PRICE_OF_POWER_MONOGRAPH_SPEC.title}: ${PRICE_OF_POWER_MONOGRAPH_SPEC.subtitle}`,
    description: PRICE_OF_POWER_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: PRICE_OF_POWER_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-12-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 12 · The Price of Power' },
          ]}
        />

        {/* Cover Header */}
        <header
          className="p-8 sm:p-12 lg:p-16 border space-y-8"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EFE7]/15 pb-4">
            <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
              {PRICE_OF_POWER_MONOGRAPH_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · HYDROPOWER &amp; ENERGY JUSTICE FLAGSHIP
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {PRICE_OF_POWER_MONOGRAPH_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {PRICE_OF_POWER_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {PRICE_OF_POWER_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {PRICE_OF_POWER_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {PRICE_OF_POWER_MONOGRAPH_SPEC.heroStats.map((st) => (
              <div key={st.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {st.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BYLINE: {PRICE_OF_POWER_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#A39B8B]">
                SCOPE: {PRICE_OF_POWER_MONOGRAPH_SPEC.geographicScope}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  PRICE_OF_POWER_MONOGRAPH_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Edition Flagship Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={toKewPlatformUrl(
                  '/earth-human-impact/hydropower-energy-justice-observatory'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Hydropower Observatory (16 Registries)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share This Monograph"
                title={`${PRICE_OF_POWER_MONOGRAPH_SPEC.title} | Himalayan Dispatch Monograph 12`}
                description={PRICE_OF_POWER_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Central Mandate & Limitations */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-7 p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">CENTRAL INVESTIGATIVE MANDATE</p>
            <h2
              className="hd-font-display text-2xl sm:text-4xl font-semibold leading-snug"
              style={{ color: 'var(--hd-fg)' }}
            >
              {PRICE_OF_POWER_MONOGRAPH_SPEC.centralMandate}
            </h2>
          </div>

          <aside
            className="lg:col-span-5 p-6 sm:p-8 border space-y-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">SECTION XXX · RESEARCH LIMITATIONS &amp; NON-AGGREGATION</span>
            </div>
            <p
              className="hd-font-body text-xs sm:text-sm leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {PRICE_OF_POWER_MONOGRAPH_SPEC.researchLimitationsNote}
            </p>
          </aside>
        </section>

        {/* Interactive Workbench */}
        <HydropowerEnergyJusticeWorkbench variant="editorial" />

        {/* Complete 20-Volume, 120-Chapter Architecture */}
        <section className="space-y-8">
          <div
            className="border-b pb-4 flex flex-wrap items-baseline justify-between gap-4"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <div>
              <p className="hd-kicker">PART XXVIII · PROPOSED RESEARCH ARCHITECTURE</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                20 Thematic Volumes &amp; 120 Proposed Chapters
              </h2>
            </div>
            <span className="hd-folio-meta">VOLUMES I–XX · CHAPTERS 01–120</span>
          </div>

          <div className="space-y-8">
            {HYDROPOWER_MONOGRAPH_VOLUMES_20.map((vol) => {
              const volChapters = HYDROPOWER_MONOGRAPH_CHAPTERS_120.filter(
                (c) => c.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="p-6 sm:p-8 border space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-3"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div>
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} · CHAPTERS {vol.chapterRange}
                      </span>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold mt-0.5"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {vol.investigationTitle}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.analyticalScope}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {volChapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.monographPriceOfPowerChapter(ch.slug)}
                        className="p-3.5 border flex flex-col justify-between gap-2 group hover:opacity-90"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1">
                          <span
                            className="hd-folio-meta block"
                            style={{ color: 'var(--hd-copper)' }}
                          >
                            CHAPTER {ch.number}
                          </span>
                          <h4
                            className="hd-font-display text-base font-semibold leading-snug group-hover:underline"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                        </div>
                        <span className="hd-folio-meta text-[10px]">
                          Open Research Protocol →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 16 Proposed Data Sources */}
        <section className="space-y-6">
          <div className="border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">PART XXVII · 16 PROPOSED POWER, CLEARANCE, SEISMIC &amp; SATELLITE SOURCES</p>
            <h2
              className="hd-font-display text-2xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Primary Data Repositories Under Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROPOSED_HYDROPOWER_DATA_SOURCES_16.map((ds) => (
              <a
                key={ds.source}
                href={ds.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border flex items-start justify-between gap-2 hover:opacity-85"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-1">
                  <div
                    className="hd-font-display text-base font-semibold leading-snug"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {ds.source}
                  </div>
                  <div className="text-xs hd-font-body" style={{ color: 'var(--hd-fg-muted)' }}>
                    {ds.application}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 opacity-60" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
