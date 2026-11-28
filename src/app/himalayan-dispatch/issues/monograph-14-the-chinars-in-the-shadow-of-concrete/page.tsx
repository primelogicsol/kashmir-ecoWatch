import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, ShieldAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { NaseemBaghChinarWorkbench } from '@/components/himalayan-dispatch/NaseemBaghChinarWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5,
  NASEEM_BAGH_CHINARS_SPEC,
  NASEEM_BAGH_MONOGRAPH_CHAPTERS_72,
  NASEEM_BAGH_MONOGRAPH_VOLUMES_12,
  NASEEM_BAGH_PRIMARY_SOURCES_10,
} from '@/data/himalayan-dispatch-naseem-bagh-chinars-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 14 — The Chinars in the Shadow of Concrete (12 Volumes · 72 Chapters) | Himalayan Dispatch',
  description: `${NASEEM_BAGH_CHINARS_SPEC.subtitle} — ${NASEEM_BAGH_CHINARS_SPEC.italicDeck}`,
  canonicalPath: '/himalayan-dispatch/issues/monograph-14-the-chinars-in-the-shadow-of-concrete',
  imagePath: '/images/env-monitoring/naseem-bagh-chinar-gis.jpg',
});

export default function Monograph14NaseemBaghChinarsPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-14-the-chinars-in-the-shadow-of-concrete';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: NASEEM_BAGH_CHINARS_SPEC.monographCode,
    name: `${NASEEM_BAGH_CHINARS_SPEC.title}: ${NASEEM_BAGH_CHINARS_SPEC.subtitle}`,
    description: NASEEM_BAGH_CHINARS_SPEC.italicDeck,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: NASEEM_BAGH_CHINARS_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-14-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 14 · The Chinars in the Shadow of Concrete' },
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
              {NASEEM_BAGH_CHINARS_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH 11 OF 33
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {NASEEM_BAGH_CHINARS_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {NASEEM_BAGH_CHINARS_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {NASEEM_BAGH_CHINARS_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg italic text-[#F2EFE7]/85 max-w-4xl leading-relaxed">
              {NASEEM_BAGH_CHINARS_SPEC.leadQuestions}
            </p>
          </div>

          {/* Four Evidence Baseline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#F2EFE7]/15">
            {NASEEM_BAGH_CHINARS_SPEC.incidentCards4.map((card) => (
              <div
                key={card.kicker}
                className="p-4 border border-[#F2EFE7]/15 bg-[#201F1D] space-y-1"
              >
                <p className="hd-font-sans text-[10px] tracking-[0.18em] uppercase text-[#D8C3A5]">
                  {card.kicker}
                </p>
                <div className="hd-font-display text-4xl font-semibold text-[#F2EFE7]">
                  {card.figure}
                </div>
                <p className="hd-font-body text-xs text-[#F2EFE7]/80 leading-relaxed">
                  {card.caption}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  NASEEM_BAGH_CHINARS_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 11 Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(
                  '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Naseem Bagh Observatory (12 Registries)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <KewContentShare
              variant="editorial-button"
              surfaceTone="darkplate"
              label="Share Monograph 14"
              title={`${NASEEM_BAGH_CHINARS_SPEC.title} — Monograph 14 (12 Volumes · 72 Chapters)`}
              description={NASEEM_BAGH_CHINARS_SPEC.italicDeck}
              canonicalPath={canonicalPath}
              isPublished
            />
          </div>
        </header>

        {/* Evidentiary & Right-of-Response Safeguard */}
        <section
          className="p-6 sm:p-8 border-l-4 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <p className="hd-kicker">
              PROPOSED MONOGRAPH PROTOCOL · NON-SUBTRACTION, NON-ADDITION &amp; RIGHT OF RESPONSE
            </p>
          </div>
          <p
            className="hd-font-body text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {NASEEM_BAGH_CHINARS_SPEC.researchLimitationsNote} These 12 thematic volumes and 72
            chapters define a structured research programme awaiting authenticated permit inspection,
            independent arboricultural fieldwork, and formal responses from the University of
            Kashmir.
          </p>
        </section>

        {/* Interactive Scientific Arboriculture & Accountability Workbench */}
        <NaseemBaghChinarWorkbench variant="editorial" />

        {/* 12 Thematic Volumes & 72 Proposed Research Chapters */}
        <section className="space-y-10">
          <div className="space-y-2 border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">
              COMPLETE RESEARCH ARCHITECTURE · 12 THEMATIC VOLUMES · 72 PROPOSED CHAPTERS
            </p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Volume-by-Volume Forensic &amp; Botanical Programme
            </h2>
          </div>

          <div className="space-y-10">
            {NASEEM_BAGH_MONOGRAPH_VOLUMES_12.map((vol) => {
              const volChapters = NASEEM_BAGH_MONOGRAPH_CHAPTERS_72.filter(
                (ch) => ch.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="p-6 sm:p-8 border space-y-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div>
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} &nbsp;·&nbsp; {vol.chapterRange}
                      </span>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {vol.investigationTitle}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="hd-font-body text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.analyticalScope}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {volChapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.monographNaseemBaghChinarsChapter(ch.slug)}
                        className="p-4 border group flex flex-col justify-between space-y-3 transition-colors hover:border-[#8C3125]"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1.5">
                          <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                            CHAPTER {ch.number}
                          </span>
                          <h4
                            className="hd-font-display text-lg font-semibold leading-snug group-hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                          <p
                            className="hd-font-body text-xs leading-relaxed"
                            style={{ color: 'var(--hd-fg-secondary)' }}
                          >
                            {ch.scientificAndHistoricalFocus}
                          </p>
                        </div>
                        <span className="hd-kicker inline-flex items-center gap-1 pt-1">
                          <span>Open Protocol</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Five-Investigation Institutional Pentad + Primary Documentary Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">INSTITUTIONAL ENVIRONMENTAL HISTORY PENTAD</p>
            <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Five Public Assets Under Independent Scrutiny
            </h3>
            <div className="space-y-2.5">
              {KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5.map((item) => (
                <Link
                  key={item.investigation}
                  href={item.href}
                  className="p-4 border block hover:border-[#8C3125] transition-colors space-y-1"
                  style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
                >
                  <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                    {item.dispatchRef}
                  </span>
                  <div className="hd-font-display text-xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {item.investigation}
                  </div>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {item.publicAssetExamined}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">PRIMARY DOCUMENTARY &amp; STATUTORY SOURCES</p>
            <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Core Archival, Institutional &amp; Reporting Dossier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NASEEM_BAGH_PRIMARY_SOURCES_10.map((src) => (
                <a
                  key={src.source}
                  href={src.url.startsWith('/') ? toKewPlatformUrl(src.url) : src.url}
                  target={src.url.startsWith('http') ? '_blank' : undefined}
                  rel={src.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-4 border space-y-1.5 hover:border-[#8C3125] transition-colors block"
                  style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="hd-font-body text-xs font-bold" style={{ color: 'var(--hd-fg)' }}>
                      {src.source}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                  </div>
                  <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {src.significance}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
