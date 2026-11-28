import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { MediaFinancialDependencyWorkbench } from '@/components/himalayan-dispatch/MediaFinancialDependencyWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  ALTERNATIVE_FINANCIAL_MODELS_12,
  FIVE_REGION_ACCOUNTABILITY_5,
  FIVE_REGION_JOURNALISM_CENSUS_15,
  HIMALAYAN_DISPATCH_SELF_SCRUTINY_STANDARD_14,
  IMPLEMENTATION_PHASES_4,
  INTERNAL_JOURNALIST_SAFEGUARDS_14,
  JOURNALISM_CROSSROADS_MONOGRAPH_SPEC,
  JOURNALISM_DEVELOPMENT_PROGRAMMES_15,
  JOURNALISM_INTEGRITY_CHARTER_20,
  MEDIA_TRANSPARENCY_OBSERVATORY_MODULES_16,
  OBSERVATORY_RESEARCH_DATASETS_12,
  PRIMARY_DOCUMENTARY_SOURCES_9,
  RESEARCH_LIMITATIONS_7,
  SELECTIVE_ATTENTION_INDICATORS_10,
  SPECIALIZED_JOURNALISTIC_DESKS_20,
} from '@/data/himalayan-dispatch-journalism-crossroads-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Western Himalayan Media Transparency & Editorial Independence Observatory | Himalayan Dispatch',
  description:
    'Proposed 16-module public-interest research architecture documenting media ownership, government advertising dependency, editorial independence safeguards, 15-indicator journalism census protocols, and the 20-principle Integrity Charter across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan.',
  canonicalPath: '/himalayan-dispatch/media-transparency-observatory',
  imagePath: '/images/himalayan-dispatch/journalism-at-a-crossroads-hero.jpg',
});

export default function MediaTransparencyObservatoryPage() {
  const canonicalPath = '/himalayan-dispatch/media-transparency-observatory';

  const observatorySchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
    name: 'Western Himalayan Media Transparency & Editorial Independence Observatory',
    description:
      'Proposed public-interest research architecture paired with Himalayan Dispatch Dispatch 17 and Monograph 15 (Journalism at a Crossroads) across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan.',
    datePublished: '2026-11-28',
    parentOrganization: {
      '@type': 'NewsMediaOrganization',
      name: 'Himalayan Dispatch · Kashmir EcoWatch',
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-media-transparency-observatory-jsonld" data={observatorySchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.editorialCharter },
            { label: 'Media Transparency & Editorial Independence Observatory' },
          ]}
        />

        {/* Monumental Hero */}
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
              PROPOSED PUBLIC-INTEREST RESEARCH ARCHITECTURE · FIVE WESTERN HIMALAYAN REGIONS
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO DISPATCH 17 &amp; MONOGRAPH 15
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="inline-block px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
              Research Architecture &amp; Voluntary Charter · Not an Existing Regulatory Authority
            </div>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              Western Himalayan Media Transparency &amp; Editorial Independence Observatory
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              Documenting Ownership, Government Advertising Dependency, Internal Journalist
              Safeguards, Scientific Specialization, and Universal Self-Scrutiny
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              Designed to operate strictly through publicly accessible records, voluntary
              disclosures, ethically conducted interviews, and authenticated documentary evidence
              across Kashmir, Jammu, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan—never as
              a mechanism for assigning presumed political loyalties or publishing unsubstantiated
              allegations as institutional fact.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 py-6 border-y border-[#F2EFE7]/20">
            {[
              { value: '16', label: 'Observatory modules' },
              { value: '12', label: 'Proposed datasets' },
              { value: '15', label: 'Census indicators' },
              { value: '20', label: 'Specialized desks' },
              { value: '20', label: 'Charter principles' },
              { value: '14', label: 'Self-scrutiny rules' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {stat.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#D8C3A5]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-1.5 text-xs sm:text-sm text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BY {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.geographicScope}
              </p>
              <p className="hd-folio-meta text-[#A39B8B]">
                EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 24 MIN READ
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle('volume-01-issue-01', 'journalism-at-a-crossroads')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 17</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={HD_ROUTES.monograph15}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border border-[#D8C3A5]/45 text-xs font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]"
              >
                <span>90-Chapter Monograph 15</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Observatory"
                title="Western Himalayan Media Transparency & Editorial Independence Observatory | Himalayan Dispatch"
                description={JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* 16 Observatory Modules */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <p className="hd-kicker">SECTION I · SIXTEEN PROPOSED OBSERVATORY MODULES</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold">
              Institutional Architecture for Media Transparency &amp; Independence
            </h2>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Each module documents structural conditions through verifiable public filings,
              voluntary disclosures, and protected testimony while strictly distinguishing
              hypotheses from proven misconduct.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MEDIA_TRANSPARENCY_OBSERVATORY_MODULES_16.map((mod) => (
              <div
                key={mod.moduleCode}
                className="p-5 border space-y-2.5 flex flex-col justify-between"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="hd-kicker">{mod.moduleCode}</span>
                    <span className="hd-folio-meta">PROPOSED</span>
                  </div>
                  <h3 className="hd-font-display text-xl font-semibold leading-snug">{mod.title}</h3>
                  <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {mod.scopeSummary}
                  </p>
                </div>
                <p
                  className="pt-2.5 border-t hd-font-body text-[11px] italic"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  Guardrail: {mod.evidentiaryGuardrail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Financial Dependency & Revenue Diversification Workbench */}
        <section className="space-y-4">
          <div className="max-w-3xl space-y-2">
            <p className="hd-kicker">SECTION II · FINANCIAL DEPENDENCY &amp; SAFEGUARD SIMULATOR</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold">
              The Mathematics of Single-Source Revenue Vulnerability
            </h2>
          </div>
          <MediaFinancialDependencyWorkbench variant="observatory" />
        </section>

        {/* 12 Proposed Research Datasets & 5-Region Accountability Framework */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SECTION III · TWELVE PROPOSED RESEARCH DATASETS</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Documentary Registries to Establish Across Five Regions
            </h2>
            <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                    <th className="py-3 px-4 hd-folio-meta">Registry Component</th>
                    <th className="py-3 px-4 hd-folio-meta">Information to Establish</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {OBSERVATORY_RESEARCH_DATASETS_12.map((ds) => (
                    <tr key={ds.registryComponent}>
                      <td className="py-3 px-4 hd-font-body font-semibold">{ds.registryComponent}</td>
                      <td className="py-3 px-4 hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {ds.informationToEstablish}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">SECTION IV · CROSS-BOUNDARY SYMMETRY</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Five-Region Media Accountability Framework
            </h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Equivalent evidentiary and ethical standards apply across both sides of the political
              boundary—recognizing distinct legal, economic, and administrative environments without
              assuming journalism is automatically independent under any administration.
            </p>
            <div className="space-y-3">
              {FIVE_REGION_ACCOUNTABILITY_5.map((reg) => (
                <div
                  key={reg.region}
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-font-display text-xl font-semibold" style={{ color: 'var(--hd-copper)' }}>
                    {reg.region}
                  </p>
                  <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {reg.principalInvestigation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15-Indicator Five-Region Journalism Census & 10 Selective-Attention Indicators */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SECTION V · LONGITUDINAL EMPIRICAL PROTOCOL</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Proposed 15-Indicator Five-Region Journalism Census
            </h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Uses representative sampling, transparent coding rules, and independent reviewers to
              measure observable journalistic practices—never assigning arbitrary political
              &ldquo;integrity scores.&rdquo;
            </p>
            <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                    <th className="py-2.5 px-4 hd-folio-meta">#</th>
                    <th className="py-2.5 px-4 hd-folio-meta">Research Indicator</th>
                    <th className="py-2.5 px-4 hd-folio-meta">Measurement</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {FIVE_REGION_JOURNALISM_CENSUS_15.map((row) => (
                    <tr key={row.indicatorCode}>
                      <td className="py-2.5 px-4 hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                        {row.indicatorCode}
                      </td>
                      <td className="py-2.5 px-4 hd-font-body font-semibold">{row.researchIndicator}</td>
                      <td className="py-2.5 px-4 hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.measurement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">SECTION VI · ENVIRONMENTAL SELECTIVITY DIAGNOSTIC</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Ten Content-Analysis Indicators of Selective Attention
            </h2>
            <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                    <th className="py-2.5 px-4 hd-folio-meta">Indicator</th>
                    <th className="py-2.5 px-4 hd-folio-meta">Investigative Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {SELECTIVE_ATTENTION_INDICATORS_10.map((row) => (
                    <tr key={row.indicator}>
                      <td className="py-2.5 px-4 hd-font-body font-semibold">{row.indicator}</td>
                      <td className="py-2.5 px-4 hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.investigativePurpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 20 Specialized Journalistic Desks */}
        <section className="space-y-6 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="max-w-3xl space-y-2">
            <p className="hd-kicker">SECTION VII · TWENTY PROPOSED SPECIALIZED JOURNALISTIC DESKS</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold">
              Scientific, Geospatial, Legal &amp; Political-Economy Specialization
            </h2>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Areas of progressive professional specialization—not a claim that twenty operational
              teams currently exist—built through partnerships connecting reporters with scientists,
              engineers, jurists, and economists.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPECIALIZED_JOURNALISTIC_DESKS_20.map((desk) => (
              <div
                key={desk.code}
                className="p-4 border space-y-1.5"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                  {desk.code}
                </span>
                <h3 className="hd-font-display text-lg font-semibold">{desk.desk}</h3>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {desk.principalReportingDomain}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 20-Principle Integrity Charter & 14-Point Himalayan Dispatch Self-Scrutiny Standard */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SECTION VIII · VOLUNTARY PROFESSIONAL CHARTER</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold">
              The Western Himalayan Journalism Integrity Charter (20 Principles)
            </h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              A proposed voluntary charter—not an accredited or legally binding international
              instrument—adopted first by Himalayan Dispatch before advocating wider regional
              adoption.
            </p>
            <div className="border divide-y" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              {JOURNALISM_INTEGRITY_CHARTER_20.map((p) => (
                <div key={p.number} className="p-3.5 grid grid-cols-12 gap-3 items-baseline">
                  <span className="col-span-2 sm:col-span-1 hd-font-display text-lg font-semibold" style={{ color: 'var(--hd-copper)' }}>
                    {p.number}
                  </span>
                  <div className="col-span-10 sm:col-span-11">
                    <span className="hd-font-body text-sm font-semibold mr-2">{p.principle}:</span>
                    <span className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {p.commitment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div
              className="p-6 border space-y-4"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">SECTION IX · UNIVERSAL SELF-SCRUTINY</span>
              </div>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
                The Himalayan Dispatch Self-Scrutiny Publication Standard (14 Requirements)
              </h2>
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                The first institution examined under the principles proposed by Himalayan Dispatch
                must be Himalayan Dispatch itself—including full transparency regarding its
                institutional relationship with Kashmir EcoWatch (KEW) and editorial independence to
                critically examine KEW assessments when warranted.
              </p>
              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {HIMALAYAN_DISPATCH_SELF_SCRUTINY_STANDARD_14.map((req) => (
                  <div key={req.requirement} className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1 text-xs sm:text-sm">
                    <span className="hd-font-body font-semibold">{req.requirement}</span>
                    <span className="hd-font-body sm:text-right" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {req.editorialCommitment}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 14 Internal Safeguards Summary */}
            <div className="p-5 border space-y-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <p className="hd-kicker">PROTECTING REPORTERS INSIDE MEDIA HOUSES</p>
              <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                Includes all {INTERNAL_JOURNALIST_SAFEGUARDS_14.length} internal newsroom safeguards
                and {ALTERNATIVE_FINANCIAL_MODELS_12.length} diversified revenue models modeled in
                the interactive workbench above.
              </p>
            </div>
          </div>
        </section>

        {/* 2027–2035 Development Initiative */}
        <section className="space-y-6 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="max-w-3xl space-y-2">
            <p className="hd-kicker">SECTION X · ROADMAP 2027–2035</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold">
              Western Himalayan Journalism Development Initiative (15 Programmes · 4 Phases)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPLEMENTATION_PHASES_4.map((ph) => (
              <div
                key={ph.phaseNumber}
                className="p-5 border space-y-2"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <span className="hd-kicker">{ph.window}</span>
                <h3 className="hd-font-display text-xl font-semibold">{ph.title}</h3>
                <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {ph.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOURNALISM_DEVELOPMENT_PROGRAMMES_15.map((prog) => (
              <div
                key={prog.code}
                className="p-4 border space-y-1"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                  {prog.code}
                </span>
                <h4 className="hd-font-display text-lg font-semibold">{prog.proposedProgramme}</h4>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {prog.principalObjective}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 9 Primary Documentary Sources & 7 Research Limitations */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SECTION XI · VERIFIED PRIMARY DOCUMENTARY SOURCES (9)</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Press Freedom, Official Fact-Finding &amp; Regional Media Assessments
            </h2>
            <div className="border divide-y" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              {PRIMARY_DOCUMENTARY_SOURCES_9.map((src) => (
                <div key={src.url} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hd-font-body text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1.5"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      <span>{src.source}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {src.investigativeSignificance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">SECTION XII · EXPLICIT RESEARCH LIMITATIONS</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              What Current Documentary Evidence Does Not Yet Establish
            </h2>
            <div
              className="p-6 border space-y-3"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                Available records establish credible concerns regarding political pressure,
                advertising dependency, professional restrictions, and institutional vulnerability,
                but do not yet establish:
              </p>
              <ul className="space-y-2">
                {RESEARCH_LIMITATIONS_7.map((lim) => (
                  <li key={lim} className="hd-font-body text-xs sm:text-sm flex items-start gap-2" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <span style={{ color: 'var(--hd-copper)' }}>•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t flex flex-wrap gap-3" style={{ borderColor: 'var(--hd-rule)' }}>
                <a
                  href={`${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.datasetApiPath}?format=json`}
                  className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                  style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>JSON Framework</span>
                </a>
                <a
                  href={`${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.datasetApiPath}?format=csv`}
                  className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                  style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>90-Chapter CSV</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
