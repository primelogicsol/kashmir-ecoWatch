import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HimalayanTimeBombWorkbench } from '@/components/himalayan-dispatch/HimalayanTimeBombWorkbench';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  ALL_150_TIME_BOMB_CHAPTERS,
  CRYOSPHERE_HKH_METRICS,
  CRYOSPHERE_SCOPE_NOTE,
  DISASTER_LOSS_PAIRS_10,
  FOUR_STAGE_DEVELOPMENT_PROGRESSION,
  HISTORICAL_WARNING_DISASTERS_13,
  JK_GLACIAL_LAKE_METRICS_2026,
  KEW_COMMAND_CENTER_PILLARS_20,
  LANDSLIDE_AGGRAVATION_PAIRS_10,
  PERMAFROST_CHANGES_7,
  REVISED_EDITION_32_DISPATCHES,
  SCIENTIFIC_DATA_INTEGRATION_CAVEAT,
  SCIENTIFIC_DATA_SOURCES_17,
  THE_TIME_BOMB_SPEC,
  TIME_BOMB_VOLUMES_25,
} from '@/data/himalayan-dispatch-time-bomb-monograph';

export const metadata: Metadata = buildPageMetadata({
  title: `${THE_TIME_BOMB_SPEC.title} — ${THE_TIME_BOMB_SPEC.monographLabel} | Himalayan Dispatch`,
  description:
    'Monograph 13 research architecture (25 Thematic Volumes · 150 Proposed Chapters · 80 Hazard Categories) investigating tectonic instability, the Kashmir seismic gap, cryospheric change, GLOFs, floodplain loss, landslides, permafrost, urban liquefaction, and 12 critical lifelines across the Western Himalayas.',
  canonicalPath: `/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}`,
  publication: 'himalayan-dispatch',
  imagePath: '/images/hazard-intelligence/hazard-command-center.jpg',
});

export default function Monograph13TimeBombPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label:
                'Monograph 13 · The Western Himalayas Are Sitting on a Time Bomb',
            },
          ]}
        />

        {/* Monumental Monograph Header */}
        <header
          className="border-b pb-12 space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="hd-kicker">
              {THE_TIME_BOMB_SPEC.monographLabel} &nbsp;·&nbsp; COMPANION TO FLAGSHIP DISPATCH 22
            </span>
            <span className="hd-folio-meta">
              25 VOLUMES · 150 PROPOSED CHAPTERS · 80 HAZARD CATEGORIES
            </span>
          </div>

          <h1
            className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98]"
            style={{ color: 'var(--hd-fg)' }}
          >
            {THE_TIME_BOMB_SPEC.title}
          </h1>

          <p
            className="hd-font-display text-2xl sm:text-3xl italic max-w-5xl leading-snug"
            style={{ color: 'var(--hd-copper)' }}
          >
            {THE_TIME_BOMB_SPEC.subtitle}
          </p>

          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed max-w-4xl"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {THE_TIME_BOMB_SPEC.standfirst}
          </p>

          {/* 25 / 150 / 80 / 6 Hero Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            {THE_TIME_BOMB_SPEC.heroStats.map((st) => (
              <div key={st.label} className="space-y-1">
                <div
                  className="hd-font-display text-4xl sm:text-5xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {st.value}
                </div>
                <div className="hd-folio-meta">{st.label}</div>
              </div>
            ))}
          </div>

          {/* Non-Prediction & Research Limitations Notice */}
          <div
            className="p-5 border-l-2 space-y-2 text-xs sm:text-sm hd-font-body leading-relaxed"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
              color: 'var(--hd-fg-secondary)',
            }}
          >
            <p>{THE_TIME_BOMB_SPEC.editorialMetaphorDisclosure}</p>
            <p>{THE_TIME_BOMB_SPEC.researchLimitationsDisclosure}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <p className="hd-folio-meta">BY {THE_TIME_BOMB_SPEC.proposedByline}</p>
              <p className="hd-folio-meta">{THE_TIME_BOMB_SPEC.extendedGeography}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  THE_TIME_BOMB_SPEC.storySlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Flagship Dispatch 22</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={toKewPlatformUrl(
                  '/hazard-intelligence/multi-hazard-resilience-command-center'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase"
                style={{
                  borderColor: 'var(--hd-copper)',
                  color: 'var(--hd-copper)',
                }}
              >
                <span>Open KEW Multi-Hazard Command Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Four-Stage Progression (Dispatches 19–22) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="hd-kicker">
              EDITORIAL PROGRESSION IN VOL. 01 / NO. 01 · DISPATCHES 19 TO 22
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Four Stages of Mountain Limits &amp; Compound Consequences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOUR_STAGE_DEVELOPMENT_PROGRESSION.map((item) => {
              const isCurrent = item.dispatchNumber === '22';
              return (
                <Link
                  key={item.dispatchNumber}
                  href={HD_ROUTES.issueArticle('volume-01-issue-01', item.slug)}
                  className="p-5 border flex flex-col justify-between space-y-3 group"
                  style={{
                    borderColor: isCurrent
                      ? 'var(--hd-copper)'
                      : 'var(--hd-rule)',
                    backgroundColor: isCurrent
                      ? 'var(--hd-bg-elevated)'
                      : 'var(--hd-bg)',
                  }}
                >
                  <div className="space-y-2">
                    <span className="hd-kicker">
                      DISPATCH {item.dispatchNumber} · {item.domain}
                    </span>
                    <h3
                      className="hd-font-display text-2xl font-semibold group-hover:underline"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.investigativeStage}
                    </p>
                  </div>
                  <span className="hd-folio-meta inline-flex items-center gap-1">
                    <span>Read Dispatch {item.dispatchNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Interactive Multi-Hazard Workbench */}
        <HimalayanTimeBombWorkbench variant="editorial" />

        {/* Cryosphere, Glacial Lakes, Landslides, Permafrost & Disaster Economics Baselines */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <span className="hd-kicker">
              CRYOSPHERE (HKH 2026) &amp; J&amp;K GLACIAL LAKES (SEPT 2026)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CRYOSPHERE_HKH_METRICS.map((c) => (
                <div
                  key={c.label}
                  className="p-3 border"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div
                    className="hd-font-display text-2xl font-semibold"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {c.value}
                  </div>
                  <div className="hd-folio-meta">{c.label}</div>
                  <p className="text-[11px] hd-font-body mt-1">{c.period}</p>
                </div>
              ))}
            </div>
            <p
              className="text-xs italic hd-font-body"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              {CRYOSPHERE_SCOPE_NOTE}
            </p>
            <div
              className="pt-3 border-t space-y-2"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <p className="hd-folio-meta">
                {JK_GLACIAL_LAKE_METRICS_2026.jurisdictionBadge}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {JK_GLACIAL_LAKE_METRICS_2026.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 border"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="hd-font-display text-2xl font-semibold">
                      {m.value}
                    </div>
                    <div className="hd-folio-meta">{m.label}</div>
                  </div>
                ))}
              </div>
              <p
                className="text-xs italic hd-font-body"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                {JK_GLACIAL_LAKE_METRICS_2026.scopeWarning}
              </p>
            </div>
          </div>

          <div
            className="p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <span className="hd-kicker">
              SLOPE AGGRAVATION (10 PAIRS), PERMAFROST (7) &amp; NON-SPECULATIVE ECONOMICS (10)
            </span>
            <div className="max-h-[210px] overflow-y-auto divide-y text-xs pr-1" style={{ borderColor: 'var(--hd-rule)' }}>
              {LANDSLIDE_AGGRAVATION_PAIRS_10.map((p) => (
                <div key={p.naturalVulnerability} className="py-2 flex justify-between gap-4">
                  <span>
                    <strong>Natural:</strong> {p.naturalVulnerability}
                  </span>
                  <span style={{ color: 'var(--hd-copper)' }}>
                    <strong>Human:</strong> {p.humanAggravation}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="pt-3 border-t max-h-[160px] overflow-y-auto divide-y text-xs pr-1"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              {DISASTER_LOSS_PAIRS_10.map((l) => (
                <div key={l.directLoss} className="py-1.5">
                  <strong>{l.directLoss}</strong> → {l.indirectLongTermLoss}
                </div>
              ))}
            </div>
            <p
              className="text-xs italic hd-font-body"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              Permafrost pathways tracked across Ladakh &amp; Karakoram:{' '}
              {PERMAFROST_CHANGES_7.length}. Without verified building and asset exposure
              datasets, no speculative regional monetary loss figure is assigned.
            </p>
          </div>
        </section>

        {/* Complete 25 Thematic Volumes & 150 Proposed Chapters */}
        <section className="space-y-8">
          <div className="border-b pb-4 space-y-2" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <span className="hd-kicker">
              PROPOSED MONOGRAPH ARCHITECTURE · 25 VOLUMES · 150 CHAPTERS (NOT A COMPLETED MONOGRAPH)
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Complete 25-Volume &amp; 150-Chapter Scientific Blueprint
            </h2>
          </div>

          <div className="space-y-8">
            {TIME_BOMB_VOLUMES_25.map((vol) => (
              <div
                key={vol.roman}
                className="p-6 border space-y-5"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div>
                    <span className="hd-kicker">
                      VOLUME {vol.roman} · CHAPTERS {vol.chapterRange}
                    </span>
                    <h3
                      className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {vol.title}
                    </h3>
                  </div>
                  <p
                    className="hd-font-body text-xs max-w-xl"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.scopeSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vol.chapters.map((ch) => {
                    const full = ALL_150_TIME_BOMB_CHAPTERS.find(
                      (c) => c.number === ch.number
                    );
                    const href = full
                      ? `/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}/chapters/${full.slug}`
                      : '#';
                    return (
                      <Link
                        key={ch.number}
                        href={href}
                        className="p-4 border flex flex-col justify-between space-y-2 group"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1">
                          <span className="hd-folio-meta">CHAPTER {ch.number}</span>
                          <h4
                            className="hd-font-display text-lg font-semibold leading-snug group-hover:underline"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                        </div>
                        <span
                          className="hd-kicker inline-flex items-center gap-1 pt-1"
                        >
                          <span>Open Protocol</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13 Warning Disasters + 20 Command Center Pillars + 17 Data Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className="lg:col-span-5 p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <span className="hd-kicker">
              13 HISTORICAL WARNING DISASTERS (1555–2026)
            </span>
            <div className="divide-y text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
              {HISTORICAL_WARNING_DISASTERS_13.map((ev) => (
                <div key={`${ev.year}-${ev.event}`} className="py-2.5 space-y-0.5">
                  <div className="font-semibold">
                    <span style={{ color: 'var(--hd-copper)' }}>{ev.year}</span> —{' '}
                    {ev.event}
                  </div>
                  <p style={{ color: 'var(--hd-fg-secondary)' }}>{ev.lesson}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-7 p-6 border space-y-5"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <span className="hd-kicker">
              KEW COMMAND CENTER (20 PILLARS) &amp; 17 SCIENTIFIC DATA SOURCES
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {KEW_COMMAND_CENTER_PILLARS_20.map((p) => (
                <div
                  key={p.no}
                  className="p-2.5 border"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="font-semibold">
                    {p.no}. {p.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-folio-meta">17 SCIENTIFIC &amp; INSTITUTIONAL DATA SOURCES</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {SCIENTIFIC_DATA_SOURCES_17.map((s) => (
                  <div key={s.source}>
                    <strong>{s.source}:</strong>{' '}
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>
                      {s.application}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="text-xs italic pt-1"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                {SCIENTIFIC_DATA_INTEGRATION_CAVEAT}
              </p>
            </div>
          </div>
        </section>

        {/* Complete 32-Dispatch Inaugural Sequence */}
        <section
          className="p-6 sm:p-8 border space-y-5"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="hd-kicker">
              REVISED COMPLETE EDITION · VOL. 01 / NO. 01 · 32 DISPATCHES
            </span>
            <span className="hd-folio-meta">
              DISPATCH 22 POSITIONED IMMEDIATELY AFTER THE PRICE OF POWER
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {REVISED_EDITION_32_DISPATCHES.map((d) => {
              const is22 = d.no === '22';
              return (
                <Link
                  key={d.no}
                  href={HD_ROUTES.issueArticle('volume-01-issue-01', d.slug)}
                  className="p-3 border hover:underline"
                  style={{
                    borderColor: is22 ? 'var(--hd-copper)' : 'var(--hd-rule)',
                    backgroundColor: is22 ? 'var(--hd-bg)' : 'transparent',
                    fontWeight: is22 ? 700 : 400,
                  }}
                >
                  <span style={{ color: 'var(--hd-copper)' }}>{d.no}</span> —{' '}
                  {d.title}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
