import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { WhempManifestoWorkbench } from '@/components/himalayan-dispatch/WhempManifestoWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  AJK_2021_MANIFESTO_BASELINE,
  BUDGET_EXPENDITURE_CATEGORIES_11,
  DEVELOPMENT_CONSERVATION_CONTRADICTIONS_12,
  FIVE_REGION_ENVIRONMENTAL_MATRIX,
  GB_2026_CAMPAIGN_EMPHASIS,
  JK_2024_MANIFESTO_COMMITMENTS,
  JURISDICTION_RESPONSIBILITY_MATRIX_11,
  LADAKH_ENVIRONMENTAL_EVIDENCE_QUESTIONS,
  MONOGRAPH_04_CHAPTERS_75,
  MONOGRAPH_04_VOLUMES_15,
  PRIMARY_CONTINUED_INVESTIGATION_SOURCES_13,
  REGIONAL_PARTY_SCOPE_REGISTRIES,
  REQUIRED_INVESTIGATIVE_DELIVERABLES_13,
  THREE_ANCHOR_EMPIRICAL_CASES,
  THIRTY_MANIFESTO_SUBJECTS,
  WHEN_POLITICS_PROMISES_GREEN_SPEC,
} from '@/data/himalayan-dispatch-when-politics-promises-green-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 06 — When Politics Promises Green (15 Volumes · 75 Chapters) | Himalayan Dispatch',
  description: `${WHEN_POLITICS_PROMISES_GREEN_SPEC.subtitle} (${WHEN_POLITICS_PROMISES_GREEN_SPEC.geographicalCoverage} · ${WHEN_POLITICS_PROMISES_GREEN_SPEC.investigationPeriod}).`,
  canonicalPath: '/himalayan-dispatch/issues/monograph-06-when-politics-promises-green',
  imagePath: '/images/environmental-pil/kashmir-high-court-wetland.jpg',
});

export default function Monograph06WhenPoliticsPromisesGreenPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-06-when-politics-promises-green';

  const monographJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: WHEN_POLITICS_PROMISES_GREEN_SPEC.monographCode,
    name: `${WHEN_POLITICS_PROMISES_GREEN_SPEC.title}: ${WHEN_POLITICS_PROMISES_GREEN_SPEC.subtitle}`,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: WHEN_POLITICS_PROMISES_GREEN_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-06-jsonld" data={monographJsonLd} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 06 · When Politics Promises Green' },
          ]}
        />

        {/* Monumental Monograph Header */}
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
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.investigationPeriod} · FIVE REGIONS
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.extendedRubric}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-sm sm:text-base text-[#F2EFE7]/85 max-w-4xl">
              <strong>Geographical coverage:</strong>{' '}
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.geographicalCoverage} &nbsp;·&nbsp;{' '}
              <strong>Standard:</strong> {WHEN_POLITICS_PROMISES_GREEN_SPEC.nonPartisanStandard}
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {WHEN_POLITICS_PROMISES_GREEN_SPEC.heroStats.map((st) => (
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
            <p className="hd-font-sans text-xs tracking-[0.16em] uppercase text-[#D8C3A5]">
              BY {WHEN_POLITICS_PROMISES_GREEN_SPEC.proposedByline}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  WHEN_POLITICS_PROMISES_GREEN_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Flagship Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl('/governance/environmental-manifesto-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Manifesto Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Monograph 06"
                title={`${WHEN_POLITICS_PROMISES_GREEN_SPEC.title} — Monograph 06 | Himalayan Dispatch`}
                description={WHEN_POLITICS_PROMISES_GREEN_SPEC.subtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>

          <p className="hd-font-body text-xs italic text-[#F2EFE7]/75 pt-3 border-t border-[#F2EFE7]/15">
            {WHEN_POLITICS_PROMISES_GREEN_SPEC.researchStatusDisclosure}
          </p>
        </header>

        {/* Part I: Regional Manifesto Evidence (J&K 2024, Ladakh, AJ&K 2021/26, GB 2026) */}
        <section className="space-y-10">
          <div className="space-y-2">
            <p className="hd-kicker">PART I · INITIAL DOCUMENTARY MANIFESTO REVIEW</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              What Political Parties Promised Across the Five Regions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">01 · KASHMIR &amp; JAMMU (2024 ASSEMBLY ELECTIONS)</p>
              <ul className="space-y-3 text-xs sm:text-sm hd-font-body">
                {JK_2024_MANIFESTO_COMMITMENTS.map((row) => (
                  <li key={row.party} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{row.party}:</strong>{' '}
                    {row.documentedCommitmentsOrStatus}{' '}
                    <span className="italic" style={{ color: 'var(--hd-copper)' }}>
                      ({row.extractionStatus})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">02 · LADAKH (EIGHT ENVIRONMENTAL QUESTIONS)</p>
              <ul className="space-y-2.5 text-xs sm:text-sm hd-font-body">
                {LADAKH_ENVIRONMENTAL_EVIDENCE_QUESTIONS.map(([subj, ev]) => (
                  <li key={subj} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{subj}:</strong> {ev}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">03 · AZAD JAMMU &amp; KASHMIR (2021 PU STUDY &amp; 2026 CYCLE)</p>
              <ul className="space-y-2.5 text-xs sm:text-sm hd-font-body">
                {AJK_2021_MANIFESTO_BASELINE.map((row) => (
                  <li key={row.party} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{row.party}:</strong>{' '}
                    {row.documentedCommitmentsOrStatus}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">04 · GILGIT-BALTISTAN (JUNE 7, 2026 SDPI ANALYSIS)</p>
              <ul className="space-y-2.5 text-xs sm:text-sm hd-font-body">
                {GB_2026_CAMPAIGN_EMPHASIS.map((row) => (
                  <li key={row.party} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{row.party}:</strong>{' '}
                    {row.documentedCommitmentsOrStatus}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Part II & III: Party Scope Registries + 30 Environmental Subjects */}
        <section className="pt-12 border-t space-y-10" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="space-y-2">
            <p className="hd-kicker">PART II · INITIAL POLITICAL PARTY &amp; COALITION COVERAGE</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              All Verifiable Electoral Participants &amp; Civic Coalitions (2000–2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(REGIONAL_PARTY_SCOPE_REGISTRIES).map((reg) => (
              <div key={reg.regionLabel} className="border p-5 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                <p className="hd-kicker">{reg.regionLabel}</p>
                <ol className="space-y-1.5 text-xs hd-font-body">
                  {reg.entries.map((e) => (
                    <li key={e.no} style={{ color: 'var(--hd-fg-secondary)' }}>
                      <strong style={{ color: 'var(--hd-copper)' }}>{e.no}.</strong> {e.name}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Part III — Thirty Environmental Subjects Every Political Manifesto Should Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {THIRTY_MANIFESTO_SUBJECTS.map((subj) => (
                <div key={subj.no} className="p-3.5 border space-y-1" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                  <p className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                    {subj.no} · {subj.domain}
                  </p>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {subj.expectedEvidence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Part IV: Five-Region Comparative Matrix & Three Anchor Cases */}
        <section className="pt-12 border-t space-y-8" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="space-y-2">
            <p className="hd-kicker">PART IV · PROPOSED COMPARATIVE ENVIRONMENTAL BASELINE MATRIX</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Regional Ecological Realities &amp; Three Documented Anchor Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {THREE_ANCHOR_EMPIRICAL_CASES.map((c) => (
              <div key={c.region} className="p-6 border space-y-2" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                <p className="hd-kicker">{c.region}</p>
                <div className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-copper)' }}>
                  {c.headlineFigure}
                </div>
                <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  {c.title}
                </h3>
                <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {c.summary}
                </p>
                <p className="hd-folio-meta pt-1">{c.sourceLabel}</p>
              </div>
            ))}
          </div>

          <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <th className="py-3 px-4 hd-folio-meta">System</th>
                  <th className="py-3 px-4 hd-folio-meta">Kashmir</th>
                  <th className="py-3 px-4 hd-folio-meta">Jammu</th>
                  <th className="py-3 px-4 hd-folio-meta">Ladakh</th>
                  <th className="py-3 px-4 hd-folio-meta">AJ&amp;K</th>
                  <th className="py-3 px-4 hd-folio-meta">Gilgit-Baltistan</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs hd-font-body" style={{ borderColor: 'var(--hd-rule)' }}>
                {FIVE_REGION_ENVIRONMENTAL_MATRIX.map((r) => (
                  <tr key={r.system}>
                    <td className="py-3 px-4 font-semibold whitespace-nowrap align-top" style={{ color: 'var(--hd-fg)' }}>{r.system}</td>
                    <td className="py-3 px-4 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>{r.kashmir}</td>
                    <td className="py-3 px-4 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>{r.jammu}</td>
                    <td className="py-3 px-4 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>{r.ladakh}</td>
                    <td className="py-3 px-4 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>{r.ajk}</td>
                    <td className="py-3 px-4 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>{r.gilgitBaltistan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
            Note: Proposed comparative research matrix, not a completed regional environmental condition assessment.
          </p>
        </section>

        {/* Parts V, VI, VII & IX: Contradictions, Jurisdiction, Budgets & Interactive WHEMP */}
        <section className="pt-12 border-t space-y-10" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <WhempManifestoWorkbench />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="border p-6 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">PART V · 12 MANIFESTO CONTRADICTIONS</p>
              <ul className="space-y-2 text-xs hd-font-body">
                {DEVELOPMENT_CONSERVATION_CONTRADICTIONS_12.map(([d, e, q]) => (
                  <li key={d} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{d} vs. {e}:</strong> {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">PART VI · 11 JURISDICTIONAL TIERS</p>
              <ul className="space-y-2 text-xs hd-font-body">
                {JURISDICTION_RESPONSIBILITY_MATRIX_11.map(([actor, ev]) => (
                  <li key={actor} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{actor}:</strong> {ev}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">PART VII · 11 BUDGET LINES (INR &amp; PKR)</p>
              <ul className="space-y-2 text-xs hd-font-body">
                {BUDGET_EXPENDITURE_CATEGORIES_11.map(([cat, ev]) => (
                  <li key={cat} style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{cat}:</strong> {ev}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Part XI: Complete 15-Volume, 75-Chapter Monograph Structure */}
        <section id="seventy-five-chapters" className="pt-12 border-t space-y-10" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="hd-kicker">PART XI · COMPLETE MONOGRAPH ARCHITECTURE · 15 VOLUMES · 75 CHAPTERS</p>
              <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Volumes I–XV &amp; Proposed Chapters 01–75
              </h2>
            </div>
            <span className="hd-folio-meta">FIVE REGIONS · 2000–2026</span>
          </div>

          <div className="space-y-8">
            {MONOGRAPH_04_VOLUMES_15.map((vol) => {
              const chs = MONOGRAPH_04_CHAPTERS_75.filter((c) => c.volumeRoman === vol.volumeRoman);
              return (
                <div key={vol.volumeRoman} className="border p-6 sm:p-8 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                  <div className="border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-kicker">{vol.volumeRoman} · {vol.chapterRange}</span>
                    <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1" style={{ color: 'var(--hd-fg)' }}>
                      {vol.investigation}
                    </h3>
                  </div>

                  <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                    {chs.map((ch) => (
                      <div key={ch.number} className="py-3 grid grid-cols-1 lg:grid-cols-12 gap-3 items-baseline">
                        <div className="lg:col-span-5">
                          <Link
                            href={`${HD_ROUTES.issue('monograph-06-when-politics-promises-green')}/chapters/${ch.slug}`}
                            className="hd-font-display text-xl font-semibold hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            <span className="mr-2" style={{ color: 'var(--hd-copper)' }}>{ch.number}.</span>
                            {ch.title}
                          </Link>
                        </div>
                        <p className="lg:col-span-5 hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                          {ch.investigativeScope}
                        </p>
                        <div className="lg:col-span-2 lg:text-right">
                          <Link
                            href={`${HD_ROUTES.issue('monograph-06-when-politics-promises-green')}/chapters/${ch.slug}`}
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

        {/* Deliverables & Primary Sources */}
        <section className="pt-12 border-t grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">REQUIRED INVESTIGATIVE DELIVERABLES</p>
            <ul className="space-y-2 text-xs sm:text-sm hd-font-body">
              {REQUIRED_INVESTIGATIVE_DELIVERABLES_13.map(([comp, scope]) => (
                <li key={comp} style={{ color: 'var(--hd-fg-secondary)' }}>
                  <strong style={{ color: 'var(--hd-fg)' }}>{comp}:</strong> {scope}
                </li>
              ))}
            </ul>
          </div>

          <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">PRIMARY DOCUMENTARY SOURCES FOR CONTINUED INVESTIGATION</p>
            <ul className="space-y-2 text-xs sm:text-sm hd-font-body">
              {PRIMARY_CONTINUED_INVESTIGATION_SOURCES_13.map((src) => (
                <li key={src.label} style={{ color: 'var(--hd-fg-secondary)' }}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-4"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {src.label}
                  </a>
                  : {src.purpose}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Defining Question Closing Banner */}
        <section
          className="p-8 sm:p-12 border-t-2 border-b-2 text-center space-y-4"
          style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg-elevated)' }}
        >
          <p className="hd-kicker">THE DEFINING EDITORIAL QUESTION</p>
          <p className="hd-font-display text-2xl sm:text-4xl italic font-semibold max-w-4xl mx-auto leading-snug" style={{ color: 'var(--hd-fg)' }}>
            “{WHEN_POLITICS_PROMISES_GREEN_SPEC.definingQuestion}”
          </p>
          <div className="pt-2">
            <Link href={HD_ROUTES.inauguralIssue} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Vol. 01 / No. 01 Inaugural Edition</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
