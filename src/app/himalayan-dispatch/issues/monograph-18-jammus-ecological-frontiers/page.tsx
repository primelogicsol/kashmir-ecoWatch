import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { JammuEcologicalFrontiersWorkbench } from '@/components/himalayan-dispatch/JammuEcologicalFrontiersWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  getJammuChaptersByInvestigation,
  JAMMU_COMMON_DATA_INFRASTRUCTURE,
  JAMMU_FLAGSHIP_INVESTIGATIONS,
  JAMMU_FRONTIERS_ISSUE_IDENTITY,
  JAMMU_PUBLICATION_STANDARD_10,
} from '@/data/himalayan-dispatch-jammu-frontiers-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    "Jammu's Ecological Frontiers — Three Jammu Division Scientific Investigations (45 Chapters · 20 Experiments) | Himalayan Dispatch",
  description: JAMMU_FRONTIERS_ISSUE_IDENTITY.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers',
  publication: 'himalayan-dispatch',
  imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

export default function Monograph18JammuEcologicalFrontiersPage() {
  const canonicalPath = JAMMU_FRONTIERS_ISSUE_IDENTITY.canonicalIssuePath;

  const issueSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: JAMMU_FRONTIERS_ISSUE_IDENTITY.volumeLabel,
    name: `${JAMMU_FRONTIERS_ISSUE_IDENTITY.title}: ${JAMMU_FRONTIERS_ISSUE_IDENTITY.subtitle}`,
    description: JAMMU_FRONTIERS_ISSUE_IDENTITY.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: JAMMU_FRONTIERS_ISSUE_IDENTITY.bylineDisplay,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-18-jammu-frontiers-jsonld" data={issueSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Jammu Bureau', href: HD_ROUTES.bureau('jammu') },
            { label: "Monograph 18 · Jammu's Ecological Frontiers" },
          ]}
        />

        {/* Monumental Thematic Issue Cover Identity (Modeled on Monograph 01) */}
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
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              ARCHITECTURE MODELLED ON MONOGRAPH 01 · THE ATMOSPHERE HAS NO BORDERS
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                'RIVER BASIN HYDROLOGY',
                'HIMALAYAN TECTONICS & INSAR',
                'FLUVIAL GEOMORPHOLOGY & MINING',
                'RAMSAR & FLOODPLAIN WETLANDS',
                'ENVIRONMENTAL GOVERNANCE',
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.extendedSubtitle}
            </p>
          </div>

          {/* 3 / 45 / 20 / 41 Years Common Research Infrastructure Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl gap-6 py-6 border-y border-[#F2EFE7]/20">
            {JAMMU_FRONTIERS_ISSUE_IDENTITY.heroMetrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {m.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                  {m.label}
                </div>
                <p className="hd-font-body text-xs text-[#F2EFE7]/65">{m.note}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-2 text-xs sm:text-sm text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BYLINE: {JAMMU_FRONTIERS_ISSUE_IDENTITY.bylineDisplay}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {JAMMU_FRONTIERS_ISSUE_IDENTITY.geographicScope}
              </p>
              <p className="hd-font-body italic text-[#D8C3A5]/90">
                Editorial &amp; Scientific Oversight: {JAMMU_FRONTIERS_ISSUE_IDENTITY.editorialOversight}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Link
                href="#three-investigations"
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Explore Investigations 01–03</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Thematic Issue"
                title={`${JAMMU_FRONTIERS_ISSUE_IDENTITY.title} | Himalayan Dispatch`}
                description={JAMMU_FRONTIERS_ISSUE_IDENTITY.subtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Mandatory Ongoing Investigation & Evidentiary Guardrail */}
        <section
          className="p-6 sm:p-8 border-l-2 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>PROPOSED RESEARCH TARGETS · EVIDENTIARY INTEGRITY DISCLOSURE</span>
          </p>
          <p
            className="hd-font-body text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {JAMMU_FRONTIERS_ISSUE_IDENTITY.researchStatusDisclosure}
          </p>
        </section>

        {/* Three-Level Publication Hierarchy */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JAMMU_FRONTIERS_ISSUE_IDENTITY.publicationHierarchy.map((tier) => {
            const isKew = tier.routePath.startsWith('/earth-human-impact');
            const href =
              tier.routePath === canonicalPath
                ? '#forty-five-chapters'
                : isKew
                ? toKewPlatformUrl(tier.routePath)
                : HD_ROUTES.bureau('jammu');
            return (
              <div
                key={tier.levelCode}
                className="p-6 border flex flex-col justify-between space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-2">
                  <p className="hd-kicker">
                    {tier.levelCode} · {tier.tierLabel}
                  </p>
                  <h2
                    className="hd-font-display text-2xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {tier.title}
                  </h2>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {tier.summary}
                  </p>
                </div>
                {isKew ? (
                  <a href={href} className="hd-kicker inline-flex items-center gap-1.5 hover:underline">
                    <span>Open KEW Companion</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>
                      {tier.routePath === canonicalPath ? 'Jump to 45 Chapters' : 'Open Jammu Bureau'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })}
        </section>

        {/* Foundational Basin Interconnection & Defining Principle */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">INTERCONNECTED EARTH-SYSTEM ARCHITECTURE</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              One Coupled Landscape: Gorge, Piedmont &amp; Wetland Shield
            </h2>
            <div className="hd-prose">
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.interconnectionStatement.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside
            className="lg:col-span-5 border p-6 sm:p-8 space-y-5"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">THE DEFINING EDITORIAL &amp; SCIENTIFIC PRINCIPLE</p>
            <h3
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.definingPrincipleHeading}
            </h3>
            <blockquote
              className="p-5 border-l-2 hd-font-display text-xl italic leading-snug"
              style={{
                borderColor: 'var(--hd-copper)',
                color: 'var(--hd-fg)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              “{JAMMU_FRONTIERS_ISSUE_IDENTITY.definingPrincipleStatement}”
            </blockquote>
            <p
              className="hd-font-body text-xs sm:text-sm leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Mirroring Monograph 01 (<em>The Atmosphere Has No Borders</em>), every investigation
              below formulates explicit physical equations, 1985–2026 remote-sensing baselines, and
              independent validation requirements before editorial verdicts are drawn.
            </p>
          </aside>
        </section>

        {/* THE THREE FLAGSHIP INVESTIGATIONS (01, 02 & 03) */}
        <section id="three-investigations" className="space-y-14">
          <div
            className="pb-4 border-b space-y-2"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <span className="hd-kicker">
              FLAGSHIP INVESTIGATIONS 01, 02 &amp; 03 · JAMMU DIVISION
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Three Interconnected Scientific Investigations
            </h2>
          </div>

          <div className="space-y-12">
            {JAMMU_FLAGSHIP_INVESTIGATIONS.map((inv) => {
              const dispatchHref = HD_ROUTES.issueArticle(
                JAMMU_FRONTIERS_ISSUE_IDENTITY.editionSlug,
                inv.storySlug
              );
              return (
                <article
                  key={inv.number}
                  id={`investigation-${inv.number}`}
                  className="border p-6 sm:p-10 space-y-8"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-3">
                      <Link href={dispatchHref} className="hd-plate-group block">
                        <div className="hd-plate-frame aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={inv.heroImage}
                            alt={inv.heroCaption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <p
                        className="hd-font-body text-xs italic leading-relaxed"
                        style={{ color: 'var(--hd-fg-muted)' }}
                      >
                        {inv.heroCaption}
                      </p>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="hd-kicker">{inv.kicker}</span>
                        <span className="hd-folio-meta">
                          {inv.chapterCount} CHAPTERS · {inv.experimentCount} EXPERIMENTS
                        </span>
                      </div>

                      <Link href={dispatchHref} className="block group">
                        <h3
                          className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.02] group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {inv.title}
                        </h3>
                      </Link>

                      <p
                        className="hd-font-display text-xl sm:text-2xl italic leading-snug"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        {inv.subtitle}
                      </p>

                      <div
                        className="p-4 border-l-2 space-y-2"
                        style={{
                          borderColor: 'var(--hd-copper)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <p className="hd-kicker">CENTRAL SCIENTIFIC QUESTION</p>
                        <p
                          className="hd-font-body text-sm sm:text-base font-medium leading-relaxed"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {inv.centralScientificQuestion}
                        </p>
                      </div>

                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {inv.documentedContextSummary}
                      </p>

                      <div
                        className="p-4 border space-y-1.5"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <p className="hd-kicker">PRIMARY RESEARCH HYPOTHESIS</p>
                        <p
                          className="hd-font-body text-xs sm:text-sm italic leading-relaxed"
                          style={{ color: 'var(--hd-fg-secondary)' }}
                        >
                          {inv.primaryResearchHypothesis}
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={dispatchHref}
                          className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                          style={{ backgroundColor: '#8C3125' }}
                        >
                          <span>Read Investigation {inv.number} Dispatch</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                          href={`#chapters-inv-${inv.number}`}
                          className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border text-xs font-semibold tracking-[0.16em] uppercase"
                          style={{
                            borderColor: 'var(--hd-rule-strong)',
                            color: 'var(--hd-fg)',
                          }}
                        >
                          <span>View 15 Chapter Protocols</span>
                        </a>
                        <a
                          href={toKewPlatformUrl(inv.kewCompanionHref)}
                          className="hd-kicker inline-flex items-center gap-1 hover:underline"
                        >
                          <span>{inv.kewCompanionLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Governing Protocol Equation + Proposed Experiments Grid */}
                  <div
                    className="pt-6 border-t grid grid-cols-1 lg:grid-cols-12 gap-6"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div
                      className="lg:col-span-5 p-5 border space-y-3"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg)',
                      }}
                    >
                      <p className="hd-kicker">GOVERNING PHYSICAL PROTOCOL FRAMEWORK</p>
                      <h4
                        className="hd-font-display text-xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {inv.conceptualEquation.title}
                      </h4>
                      <pre
                        className="p-3 text-xs font-mono overflow-x-auto border"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg-elevated)',
                          color: 'var(--hd-copper)',
                        }}
                      >
                        {inv.conceptualEquation.formulaText}
                      </pre>
                      <ul className="space-y-1.5 text-xs hd-font-body">
                        {inv.conceptualEquation.variables.map((v) => (
                          <li key={v.symbol} style={{ color: 'var(--hd-fg-secondary)' }}>
                            <strong style={{ color: 'var(--hd-fg)' }}>{v.symbol}</strong> (
                            {v.unit}): {v.definition}
                          </li>
                        ))}
                      </ul>
                      <p
                        className="text-[11px] hd-font-body italic pt-1"
                        style={{ color: 'var(--hd-fg-muted)' }}
                      >
                        {inv.conceptualEquation.protocolCaveat}
                      </p>
                    </div>

                    <div className="lg:col-span-7 space-y-3">
                      <p className="hd-kicker">
                        PROPOSED ORIGINAL SCIENTIFIC EXPERIMENTS ({inv.experiments.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {inv.experiments.map((exp) => (
                          <div
                            key={exp.code}
                            className="p-4 border space-y-1.5"
                            style={{
                              borderColor: 'var(--hd-rule)',
                              backgroundColor: 'var(--hd-bg)',
                            }}
                          >
                            <span className="hd-kicker">{exp.code}</span>
                            <h5
                              className="hd-font-display text-lg font-semibold leading-snug"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {exp.title}
                            </h5>
                            <p
                              className="hd-font-body text-xs leading-relaxed"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {exp.analyticalProtocol}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Interactive Geographical Coverage, Sandbox & Protocol Workbench */}
        <JammuEcologicalFrontiersWorkbench defaultInvestigation="all" />

        {/* ALL 45 PROPOSED RESEARCH CHAPTERS (15 + 15 + 15) */}
        <section id="forty-five-chapters" className="space-y-12">
          <div
            className="pb-4 border-b space-y-2"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <span className="hd-kicker">
              COMPLETE CHAPTER ARCHITECTURE · 45 PROPOSED RESEARCH CHAPTERS
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Scientific Investigation Frameworks (Chapters 01–15 × 3)
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-3xl"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Select any chapter below to inspect its dedicated research protocol, principal
              scientific questions, observational datasets, and methodological validation rules.
            </p>
          </div>

          {JAMMU_FLAGSHIP_INVESTIGATIONS.map((inv) => {
            const chapters = getJammuChaptersByInvestigation(inv.number);
            return (
              <div
                key={inv.number}
                id={`chapters-inv-${inv.number}`}
                className="border p-6 sm:p-8 space-y-6"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div
                  className="pb-4 border-b flex flex-wrap items-end justify-between gap-4"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="space-y-1">
                    <span className="hd-kicker">
                      INVESTIGATION {inv.number} · 15 PROPOSED CHAPTER PROTOCOLS
                    </span>
                    <h3
                      className="hd-font-display text-2xl sm:text-4xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {inv.title}
                    </h3>
                  </div>
                  <Link
                    href={HD_ROUTES.issueArticle(
                      JAMMU_FRONTIERS_ISSUE_IDENTITY.editionSlug,
                      inv.storySlug
                    )}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>Open Full Investigation {inv.number} Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapters.map((ch) => (
                    <Link
                      key={ch.slug}
                      href={HD_ROUTES.monograph18Chapter(ch.slug)}
                      className="p-4 border space-y-2 group transition-colors block"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="hd-kicker">CHAPTER {ch.chapterNumber}</span>
                        <span className="hd-folio-meta">FOLIO #{ch.globalIndex}</span>
                      </div>
                      <h4
                        className="hd-font-display text-xl font-semibold leading-snug group-hover:underline"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {ch.researchDomain}
                      </h4>
                      <p
                        className="hd-font-body text-xs leading-relaxed line-clamp-3"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {ch.executiveSummary[0]}
                      </p>
                      <span className="hd-kicker inline-flex items-center gap-1 pt-1">
                        <span>Inspect Protocol</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* COMMON DATA INFRASTRUCTURE & 10-STAGE PUBLICATION STANDARD SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <span className="hd-kicker">COMMON RESEARCH INFRASTRUCTURE (12 ARCHIVES)</span>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Shared Satellite, Hydrological &amp; Statutory Data Backbone
            </h2>
            <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="border-b hd-font-sans text-[10px] tracking-[0.16em] uppercase"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                      color: 'var(--hd-copper)',
                    }}
                  >
                    <th className="py-3 px-4">Data Infrastructure</th>
                    <th className="py-3 px-4">Application</th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y hd-font-body text-xs sm:text-sm"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  {JAMMU_COMMON_DATA_INFRASTRUCTURE.map((item) => (
                    <tr key={item.source}>
                      <td className="py-3 px-4 font-semibold" style={{ color: 'var(--hd-fg)' }}>
                        {item.source}
                      </td>
                      <td className="py-3 px-4" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {item.application}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="hd-kicker">HIMALAYAN DISPATCH PUBLICATION STANDARD</span>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              10-Stage Research &amp; Editorial Workflow
            </h2>
            <div className="border divide-y" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              {JAMMU_PUBLICATION_STANDARD_10.map((row) => (
                <div
                  key={row.stage}
                  className="py-3 px-4 flex items-center justify-between gap-3"
                  style={{
                    backgroundColor: 'var(--hd-bg-elevated)',
                    borderColor: 'var(--hd-rule)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="hd-kicker">{row.stage}</span>
                    <span
                      className="hd-font-body text-sm font-medium"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.requirement}
                    </span>
                  </div>
                  <span className="hd-folio-meta shrink-0">
                    {row.currentStatus === 'Active Protocol Scoping' ? 'SCOPED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
