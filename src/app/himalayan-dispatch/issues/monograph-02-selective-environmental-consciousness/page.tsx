import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EnvironmentalConsistencyExperiment } from '@/components/himalayan-dispatch/EnvironmentalConsistencyExperiment';
import { KewContentShare } from '@/components/common/KewContentShare';
import {
  HD_ROUTES,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  CAG_LAKE_SEWAGE_AUDIT_LEDGER,
  CONSCIOUSNESS_SURVEY_PARAMETERS_8,
  ECOLOGICAL_ACCOUNTABILITY_REGISTER_20,
  HIMALAYAN_DISPATCH_THREE_FLAGSHIP_INVESTIGATIONS,
  LONGITUDINAL_MOVEMENT_PARAMETERS_10,
  SATELLITE_CHANGE_DETECTION_10,
  SELECTIVE_CONSCIOUSNESS_CHAPTERS_50,
  SELECTIVE_CONSCIOUSNESS_HISTORICAL_EPISODES,
  SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC,
  SELECTIVE_CONSCIOUSNESS_VOLUMES_9,
  WESTERN_HIMALAYAN_ACCOUNTABILITY_OBSERVATORY_REGISTRIES_10,
} from '@/data/himalayan-dispatch-selective-consciousness-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 02 — Selective Environmental Consciousness (9 Parts · 50 Chapters) | Himalayan Dispatch',
  description: SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath:
    '/himalayan-dispatch/issues/monograph-02-selective-environmental-consciousness',
  imagePath: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
});

export default function Monograph02SelectiveConsciousnessPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-02-selective-environmental-consciousness';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.monographCode,
    name: `${SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.title}: ${SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.subtitle}`,
    description: SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-02-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 02 · Selective Environmental Consciousness' },
          ]}
        />

        {/* Monumental Monograph 02 Cover Header */}
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
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH 24
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
            <p className="hd-font-body text-sm italic text-[#D8C3A5]/90 pt-1">
              Retaining Introductory Cover Essay:{' '}
              <strong>
                “{SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.introductoryCoverEssayTitle}”
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.heroStats.map((st) => (
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
                PROPOSED BYLINE: {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#A39B8B]">
                SCOPE: {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.geographicScope}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 24 Flagship Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl('/governance/environmental-accountability-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Accountability Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Monograph 02"
                title={`${SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.title} — Monograph 02 | Himalayan Dispatch`}
                description={SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>

          <p className="hd-font-body text-xs italic text-[#F2EFE7]/72 pt-3 border-t border-[#F2EFE7]/15">
            {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.evidentiaryNotice}
          </p>
        </header>

        {/* Foundational Editorial Statement */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">FOUNDATIONAL EDITORIAL STATEMENT</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.introductoryCoverEssayTitle}
            </h2>
            <blockquote
              className="p-6 border-l-2 space-y-2"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p
                className="hd-font-display text-2xl italic font-medium leading-snug"
                style={{ color: 'var(--hd-fg)' }}
              >
                “{SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.centralThesis}”
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-7 hd-prose space-y-4">
            {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.foundationalEditorialStatement.map(
              (para, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {para}
                </p>
              )
            )}
          </div>
        </section>

        {/* Part I: Three Historical Moments Comparative Dossiers */}
        <section
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">PART I · COMPARATIVE HISTORICAL &amp; SCIENTIFIC DOSSIERS</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Three Historical Moments That Demand Comparative Investigation (2008–2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SELECTIVE_CONSCIOUSNESS_HISTORICAL_EPISODES.map((ep, idx) => (
              <article
                key={ep.id}
                className="p-6 sm:p-7 border space-y-5 flex flex-col justify-between"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-kicker">EPISODE 0{idx + 1} · {ep.period}</span>
                    <span className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-copper)' }}>
                      {ep.headlineFigure}
                    </span>
                  </div>
                  <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug" style={{ color: 'var(--hd-fg)' }}>
                    {ep.title}
                  </h3>
                  <p className="hd-folio-meta">{ep.headlineCaption}</p>
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {ep.summary}
                  </p>

                  {'timeline' in ep && (
                    <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
                      <p className="hd-folio-meta">DOCUMENTED 2008 TIMELINE</p>
                      <ul className="space-y-1.5 text-xs hd-font-body">
                        {ep.timeline.map((t) => (
                          <li key={t.date} style={{ color: 'var(--hd-fg-secondary)' }}>
                            <strong style={{ color: 'var(--hd-fg)' }}>{t.date}:</strong> {t.event} — {t.detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {'ladakhDimensions' in ep && (
                    <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
                      <p className="hd-folio-meta">10 SCIENTIFIC DIMENSIONS TO INVESTIGATE</p>
                      <ul className="space-y-1 text-xs hd-font-body">
                        {ep.ladakhDimensions.map(([dim, req]) => (
                          <li key={dim} style={{ color: 'var(--hd-fg-secondary)' }}>
                            <strong style={{ color: 'var(--hd-fg)' }}>{dim}:</strong> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {'requiredDocuments' in ep && (
                    <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
                      <p className="hd-folio-meta">12-DOCUMENT SHESHNAG ACCOUNTABILITY DOSSIER</p>
                      <ul className="space-y-1 text-xs hd-font-body">
                        {ep.requiredDocuments.map(([doc, purpose]) => (
                          <li key={doc} style={{ color: 'var(--hd-fg-secondary)' }}>
                            <strong style={{ color: 'var(--hd-fg)' }}>{doc}:</strong> {purpose}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Part II: CAG 44-Lake Sewage Crisis & Complete 20-System Ecological Accountability Register */}
        <section
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="p-6 sm:p-8 border space-y-6" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <div className="space-y-1">
              <p className="hd-kicker">{CAG_LAKE_SEWAGE_AUDIT_LEDGER.heading}</p>
              <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                The 44-Lake Sewage Crisis &amp; Normalized Ecological Destruction
              </h2>
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                {CAG_LAKE_SEWAGE_AUDIT_LEDGER.auditScopeSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
              {CAG_LAKE_SEWAGE_AUDIT_LEDGER.metrics.map((m) => (
                <div key={m.label} className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
                  <div className="hd-folio-meta">{m.label}</div>
                  <div className="hd-font-display text-4xl sm:text-5xl font-semibold tabular-nums" style={{ color: 'var(--hd-fg)' }}>
                    {m.figure}
                  </div>
                </div>
              ))}
              <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                <div className="hd-folio-meta">Other Examined Lakes</div>
                <div className="hd-font-display text-4xl sm:text-5xl font-semibold tabular-nums" style={{ color: 'var(--hd-fg)' }}>
                  {CAG_LAKE_SEWAGE_AUDIT_LEDGER.otherExaminedLakes}
                </div>
              </div>
            </div>

            <p className="hd-font-body text-xs sm:text-sm italic pt-3 border-t" style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}>
              {CAG_LAKE_SEWAGE_AUDIT_LEDGER.methodologicalNote}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                The Complete 20-System Ecological Accountability Register
              </h3>
              <span className="hd-folio-meta">DOCUMENTED PRESSURES · RESPONSIBLE INSTITUTIONS · MEASURABLE INDICATORS</span>
            </div>

            <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                    <th className="py-3 px-4 hd-folio-meta">System</th>
                    <th className="py-3 px-4 hd-folio-meta">Environmental Pressures</th>
                    <th className="py-3 px-4 hd-folio-meta">Responsible Institutions &amp; Law</th>
                    <th className="py-3 px-4 hd-folio-meta">Measurable Indicators</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {ECOLOGICAL_ACCOUNTABILITY_REGISTER_20.map((row) => (
                    <tr key={row.code}>
                      <td className="py-3 px-4 text-sm hd-font-body font-semibold align-top whitespace-nowrap" style={{ color: 'var(--hd-fg)' }}>
                        <a
                          href={toKewPlatformUrl(row.kewModuleHref)}
                          className="inline-flex items-center gap-1 underline underline-offset-4"
                          style={{ color: 'var(--hd-copper)' }}
                        >
                          <span>{row.code} · {row.system}</span>
                          <ArrowUpRight className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                      <td className="py-3 px-4 text-xs sm:text-sm hd-font-body align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.documentedPressures}
                      </td>
                      <td className="py-3 px-4 text-xs hd-font-body align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                        <strong>{row.responsibleInstitutions}</strong>
                        <span className="block mt-0.5 italic" style={{ color: 'var(--hd-fg-muted)' }}>
                          {row.regulatoryProvisions}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs hd-font-body align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.measurableIndicators}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Part VIII: Interactive Consistency Experiment + Survey & Satellite Protocols */}
        <section
          className="pt-12 border-t space-y-8"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">PART VIII · ORIGINAL SCIENTIFIC &amp; SOCIOLOGICAL RESEARCH PROTOCOLS</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Testing Selective Consciousness Empirically (Proposed Instruments)
            </h2>
          </div>

          <EnvironmentalConsistencyExperiment />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="border p-6 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">PROPOSED SURVEY (N = 3,000–5,000)</p>
              <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Kashmir Environmental Consciousness Survey
              </h3>
              <ul className="space-y-2 text-xs hd-font-body">
                {CONSCIOUSNESS_SURVEY_PARAMETERS_8.map(([comp, design]) => (
                  <li key={comp} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{comp}:</strong> {design}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">LONGITUDINAL MOVEMENT EVALUATION</p>
              <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                10-Parameter Movement Outcome Matrix
              </h3>
              <ul className="space-y-2 text-xs hd-font-body">
                {LONGITUDINAL_MOVEMENT_PARAMETERS_10.map(([dim, ev]) => (
                  <li key={dim} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{dim}:</strong> {ev}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">EARTH OBSERVATION (2000–2026)</p>
              <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                10-Process Satellite Change Detection
              </h3>
              <ul className="space-y-2 text-xs hd-font-body">
                {SATELLITE_CHANGE_DETECTION_10.map(([proc, method]) => (
                  <li key={proc} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{proc}:</strong> {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Complete 9-Volume, 50-Chapter Monograph Structure */}
        <section
          id="fifty-chapters"
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="hd-kicker">COMPLETE MONOGRAPH ARCHITECTURE · 9 THEMATIC PARTS · 50 CHAPTERS</p>
              <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Volumes I–IX &amp; Proposed Chapters 01–50
              </h2>
            </div>
            <span className="hd-folio-meta">RESEARCH PROTOCOLS · ONGOING INVESTIGATION</span>
          </div>

          <div className="space-y-10">
            {SELECTIVE_CONSCIOUSNESS_VOLUMES_9.map((vol) => {
              const volChapters = SELECTIVE_CONSCIOUSNESS_CHAPTERS_50.filter(
                (c) => c.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="border p-6 sm:p-8 space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div>
                      <span className="hd-kicker">{vol.volumeRoman} · {vol.chapterRange}</span>
                      <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1" style={{ color: 'var(--hd-fg)' }}>
                        {vol.volumeTitle}
                      </h3>
                    </div>
                    <p className="hd-font-body text-xs sm:text-sm max-w-xl" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {vol.thematicMandate}
                    </p>
                  </div>

                  <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                    {volChapters.map((ch) => (
                      <div key={ch.number} className="py-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3 items-baseline">
                        <div className="lg:col-span-5">
                          <Link
                            href={`${HD_ROUTES.issue('monograph-02-selective-environmental-consciousness')}/chapters/${ch.slug}`}
                            className="hd-font-display text-xl font-semibold hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            <span className="mr-2" style={{ color: 'var(--hd-copper)' }}>
                              {ch.number}.
                            </span>
                            {ch.title}
                          </Link>
                        </div>
                        <p className="lg:col-span-5 hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                          {ch.analyticalFocus}
                        </p>
                        <div className="lg:col-span-2 lg:text-right">
                          <Link
                            href={`${HD_ROUTES.issue('monograph-02-selective-environmental-consciousness')}/chapters/${ch.slug}`}
                            className="hd-kicker hover:underline"
                          >
                            Protocol →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Master Publication Specifications + KEW Companion + Three Flagships */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-6 border p-6 sm:p-8 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">PUBLICATION MASTER SPECIFICATIONS (PROPOSED TARGETS)</p>
            <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Monograph 02 Research Scope &amp; Guardrails
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.masterSpecifications.map((row) => (
                    <tr key={row.component}>
                      <td className="py-2.5 pr-4 text-xs sm:text-sm hd-font-body font-semibold whitespace-nowrap" style={{ color: 'var(--hd-fg)' }}>
                        {row.component}
                      </td>
                      <td className="py-2.5 pl-4 text-xs sm:text-sm hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.target}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hd-font-body text-xs italic pt-2 border-t" style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}>
              Note: These are research and publication targets. The surveys, longitudinal
              assessments, satellite investigations, and institutional evaluations have not yet been
              conducted.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="border p-6 sm:p-8 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">PERMANENT KEW SCIENTIFIC COMPANION</p>
              <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Western Himalayan Environmental Accountability Observatory (10 Registries)
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm hd-font-body">
                {WESTERN_HIMALAYAN_ACCOUNTABILITY_OBSERVATORY_REGISTRIES_10.map((r) => (
                  <li key={r.code} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{r.name}:</strong> {r.permanentFunction}
                  </li>
                ))}
              </ul>
              <a
                href={toKewPlatformUrl('/governance/environmental-accountability-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <span>Open KEW Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="border p-6 sm:p-8 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">HIMALAYAN DISPATCH&apos;S THREE FLAGSHIP INVESTIGATIONS</p>
              <div className="space-y-3">
                {HIMALAYAN_DISPATCH_THREE_FLAGSHIP_INVESTIGATIONS.map((fl) => (
                  <div key={fl.dispatchLabel} className="p-4 border space-y-1" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}>
                    <p className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                      {fl.dispatchLabel} &nbsp;·&nbsp; {fl.foundationPillar}
                    </p>
                    <Link href={fl.href} className="hd-font-display text-xl font-semibold block hover:underline" style={{ color: 'var(--hd-fg)' }}>
                      {fl.title}
                    </Link>
                    <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {fl.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Epilogue Banner */}
        <section
          className="p-8 sm:p-12 border-t-2 border-b-2 text-center space-y-4"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">EPILOGUE · BEFORE WE POINT OUR FINGERS</p>
          <p
            className="hd-font-display text-2xl sm:text-4xl italic font-semibold max-w-4xl mx-auto leading-snug"
            style={{ color: 'var(--hd-fg)' }}
          >
            “{SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.epilogueClosingQuestion}”
          </p>
          <div className="pt-2">
            <Link href={HD_ROUTES.inauguralIssue} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Vol. 01 / No. 01 Inaugural Edition (22 Dispatches)</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
