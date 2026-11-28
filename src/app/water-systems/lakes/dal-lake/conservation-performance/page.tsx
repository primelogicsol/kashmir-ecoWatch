import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Database,
  FileSearch,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { getMasterLakeBySlugOrId } from '@/data/hydrology/master-lake-registry';
import { algalBloomData } from '@/data/algal-bloom';
import { PRIORITY_DETECTION_CAPABILITIES } from '@/data/change-detection-observatory';
import { lakesData } from '@/data/water-systems';
import { LinkedInvestigationsModulePanel } from '@/components/environmental-investigations/LinkedInvestigationsModulePanel';
import { DalLakeMathematicsWorkbench } from '@/components/himalayan-dispatch/DalLakeMathematicsWorkbench';
import {
  DAL_LAKE_OBSERVATORY_MODULES_12,
  DAL_LAKE_STP_DOSSIERS_6,
  DAL_OBSERVATORY_SCIENTIFIC_OUTPUTS,
  EIGHT_INTERCONNECTED_SCIENTIFIC_BUDGETS,
  PERFORMANCE_ACCOUNTING_INDICATORS_9,
  REQUIRED_ENGINEERING_DOCUMENTS_23,
} from '@/data/himalayan-dispatch-dying-lake-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Dal Lake Conservation Performance Observatory | KEW Water Systems Scientific Companion',
  description:
    'Permanent 12-module Kashmir EcoWatch scientific assessment system evaluating Dal–Nigeen settling basins, peripheral STPs, nutrient budgets, dredging, de-weeding, catchment erosion, bathymetry, and public expenditure accountability—integrated with KEW Water Systems, Algal Bloom Intelligence, and Change Detection.',
  canonicalPath: '/water-systems/lakes/dal-lake/conservation-performance',
  imagePath: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
});

export default function DalLakeConservationPerformanceObservatoryPage() {
  const dalMaster = getMasterLakeBySlugOrId('dal-lake');
  const nigeenMaster = getMasterLakeBySlugOrId('nigeen-lake');
  const dalWaterEntity = lakesData.find((l) => l.slug === 'dal-lake');
  const dalAlgalBloom = algalBloomData.find((b) => b.id === 'AB-DAL-001');
  const nigeenAlgalBloom = algalBloomData.find((b) => b.id === 'AB-NIG-002');
  const reusedScdoCapabilities = PRIORITY_DETECTION_CAPABILITIES.filter((c) =>
    ['wetland_encroachment', 'river_lake_change', 'forest_loss', 'urban_development'].includes(
      c.id
    )
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Water Systems', href: '/water-systems' },
      { label: 'Lakes Directory', href: '/water-systems/lakes' },
      { label: 'Dal Lake', href: '/water-systems/lakes/dal-lake' },
      {
        label: 'Conservation Performance Observatory',
        href: '/water-systems/lakes/dal-lake/conservation-performance',
      },
    ],
    '/water-systems/lakes/dal-lake/conservation-performance'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="dal-conservation-obs-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/water-systems/lakes/dal-lake"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dal Lake Master Dossier ({dalMaster?.kewLakeId || 'KEW-LK-0001'})</span>
            </Link>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              KEW · PROPOSED SCIENTIFIC INTELLIGENCE SYSTEM · PART XVI COMPANION
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Dal Lake Conservation Performance Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            Integrated directly into Kashmir EcoWatch’s Water Systems hierarchy rather than built as
            a disconnected dashboard, this permanent scientific assessment architecture connects
            KEW’s Master Lake Registry, Algal Bloom Intelligence, Satellite Change Detection
            Observatory, and Canonical Investigations to evaluate Dal–Nigeen conservation against
            eight coupled physical, chemical, biological, and fiscal balances.
          </p>

          {/* Scientific Outputs Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-1">
              Scientific outputs:
            </span>
            {DAL_OBSERVATORY_SCIENTIFIC_OUTPUTS.map((out) => (
              <span
                key={out}
                className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-medium text-cyan-200"
              >
                {out}
              </span>
            ))}
          </div>

          {/* Integrity & Non-Fabrication Notice */}
          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Scientific Provenance &amp; Proposed Assessment Architecture Notice:
              </strong>{' '}
              Kashmir EcoWatch operates zero proprietary physical in-lake sensors in Dal Lake. The
              twelve assessment modules below transparently distinguish active KEW satellite,
              trophic, and statutory audit syntheses (CAG Report No. 4 of 2025; September 2026
              legislative records) from proposed engineering assessment modules awaiting retrieval
              of outstanding Part XV Detailed Project Reports and continuous inlet/outlet datasets.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Dispatch 04: The Mathematics of a Dying Lake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 03 (10 Volumes · 62 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reused Live KEW Baseline Connectors (Water Systems + Algal Bloom + SCDO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            REUSED KEW SCIENTIFIC INFRASTRUCTURE · ZERO DUPLICATE DATA SILOS
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Connected Dal–Nigeen Baselines Across Existing KEW Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Master Lake Registry Connector */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>MASTER LAKE REGISTRY</span>
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {dalMaster?.officialName || 'Dal Lake'} ({dalMaster?.kewLakeId || 'KEW-LK-0001'})
              </h3>
              <p className="text-xs text-slate-300">
                Trophic State: <strong>{dalMaster?.trophicStatus || 'Eutrophic'}</strong> ·
                Elevation: {dalMaster?.elevationM || dalWaterEntity?.elevation || 1583} m · Nigeen
                Companion: {nigeenMaster?.kewLakeId || 'Linked'}
              </p>
              <p className="text-[11px] text-slate-400">
                Carlson TSI — SD: {dalMaster?.carlsonTsi.tsiSecchi ?? 'N/A'} · Chl-a:{' '}
                {dalMaster?.carlsonTsi.tsiChlorophyllA ?? 'N/A'} · TP:{' '}
                {dalMaster?.carlsonTsi.tsiTotalPhosphorus ?? 'N/A'}
              </p>
            </div>
            <Link
              href="/water-systems/lakes/dal-lake"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline pt-2"
            >
              <span>Inspect Master Lake Record</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Algal Bloom Intelligence Connector */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span>ALGAL BLOOM INTELLIGENCE</span>
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {dalAlgalBloom?.id || 'AB-DAL-001'} · Risk: {dalAlgalBloom?.riskLevel || 'Critical'}
              </h3>
              <p className="text-xs text-slate-300">
                Dominant Taxa: <strong>{dalAlgalBloom?.dominantTaxa || 'Microcystis'}</strong> ·
                Chl-a: {dalAlgalBloom?.chlorophyllA ?? '—'} µg/L · Secchi:{' '}
                {dalAlgalBloom?.secchiDepth ?? '—'} m
              </p>
              <p className="text-[11px] text-slate-400">
                Sensor: {dalAlgalBloom?.satelliteSource || 'Sentinel-2 MSI, NDCI'} (Nigeen:{' '}
                {nigeenAlgalBloom?.id || 'AB-NIG-002'})
              </p>
            </div>
            <Link
              href="/hazard-intelligence/algal-bloom-intelligence"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:underline pt-2"
            >
              <span>Open Algal Bloom Intelligence</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Satellite Change Detection Connector */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>CHANGE DETECTION (SCDO)</span>
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {reusedScdoCapabilities.length} Active Spectral &amp; SAR Workflows
              </h3>
              <p className="text-xs text-slate-300">
                Reuses Sentinel-1 C-SAR, Sentinel-2 MSI (MNDWI/NDCI), Landsat C2 (1982–2026) &amp;
                Srinagar Urban Pilot for 10-class stage-normalized mapping.
              </p>
            </div>
            <Link
              href="/earth-human-impact/change-detection-observatory"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline pt-2"
            >
              <span>Open Change Detection Observatory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Statutory Audit & Accountability Connector */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                <span>STATUTORY &amp; FISCAL AUDIT</span>
                <FileSearch className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">
                CAG Report 4 of 2025 &amp; Sept 2026 Ring
              </h3>
              <p className="text-xs text-slate-300">
                36.70 MLD across 5 operational STPs (+30 MLD Gupt Ganga u/c) vs. ~48 MLD load;
                Telbal 7–57% historical efficiency; 23 P0–P2 dockets tracked.
              </p>
            </div>
            <Link
              href="/governance/environmental-accountability-observatory"
              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:underline pt-2"
            >
              <span>Open Accountability Observatory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Twelve Proposed Assessment Modules (Part XVI) */}
      <section className="border-t border-slate-800 bg-slate-900/30 px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              PART XVI ARCHITECTURE · 12 PROPOSED SCIENTIFIC ASSESSMENT MODULES
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Dal Lake Conservation Performance Intelligence Grid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DAL_LAKE_OBSERVATORY_MODULES_12.map((mod, idx) => (
              <div
                key={mod.id}
                className="p-5 rounded-xl border border-slate-800 bg-slate-950/90 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-cyan-400">
                      MODULE {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border border-amber-500/40 bg-amber-950/30 text-amber-300">
                      {mod.statusBadge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                  <code className="block text-[11px] font-mono text-emerald-300 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800">
                    {mod.governingMathematics}
                  </code>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {mod.scientificPurpose}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <Link
                    href={mod.reusedKewCapabilityHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    <span>Reuses: {mod.reusedKewCapabilityLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Mathematical & Mass-Balance Workbench */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <DalLakeMathematicsWorkbench variant="observatory" />
      </section>

      {/* Eight Interconnected Budgets + STP Ring & Outcome Accounting */}
      <section className="border-t border-slate-800 bg-slate-900/25 px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Eight Interconnected Scientific Budgets
              </h2>
              <div className="space-y-3">
                {EIGHT_INTERCONNECTED_SCIENTIFIC_BUDGETS.map((b) => (
                  <div
                    key={b.code}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <strong className="text-white">
                        {b.code} · {b.budgetName}
                      </strong>
                      <span className="font-mono text-xs text-cyan-300">{b.units}</span>
                    </div>
                    <code className="block text-xs font-mono text-emerald-300">
                      {b.governingEquation}
                    </code>
                    <p className="text-xs text-slate-400">{b.principalQuestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                STP Engineering &amp; Outcome Cost-Effectiveness Ledger
              </h2>
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Plant</th>
                      <th className="py-2.5 px-3">MLD</th>
                      <th className="py-2.5 px-3">CAG 2016–18 NH₄-N / P</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {DAL_LAKE_STP_DOSSIERS_6.map((s) => (
                      <tr key={s.id}>
                        <td className="py-2.5 px-3 font-semibold text-white">{s.name}</td>
                        <td className="py-2.5 px-3 font-mono text-cyan-300">
                          {s.reportedCapacityMld.toFixed(1)}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {s.cagHistoricalNh4RemovalPct} / {s.cagHistoricalPhosphorusRemovalPct}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          {s.operationalClassification}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Intervention</th>
                      <th className="py-2.5 px-3">Scientific Financial Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {PERFORMANCE_ACCOUNTING_INDICATORS_9.map((r) => (
                      <tr key={r.intervention}>
                        <td className="py-2 px-3 font-semibold text-emerald-300">
                          {r.intervention}
                        </td>
                        <td className="py-2 px-3 text-slate-300">
                          {r.scientificFinancialIndicator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* P0 Documentary Retrieval Priority Strip */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  PART XV · FOUNDATIONAL DOCUMENTARY RETRIEVAL REGISTER
                </p>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  8 P0 Engineering Dockets Required Before Definitive Design Verdicts
                </h3>
              </div>
              <Link
                href="/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake"
                className="text-xs font-semibold text-cyan-400 hover:underline"
              >
                View All 23 P0–P2 Documentary Requests →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {REQUIRED_ENGINEERING_DOCUMENTS_23.filter((d) => d.priority === 'P0').map((doc) => (
                <div
                  key={doc.code}
                  className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 space-y-1"
                >
                  <div className="font-mono text-amber-300 font-semibold">{doc.code}</div>
                  <div className="font-semibold text-white">{doc.documentTitle}</div>
                  <div className="text-slate-400 text-[11px]">
                    {doc.engineeringVerificationPurpose}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reused Canonical KEW Investigations Panel */}
          <LinkedInvestigationsModulePanel
            title="Reused Canonical Dal–Telbal Environmental Investigations (KEW-INV Series)"
            subtitle="Cross-linking the Conservation Performance Observatory directly to KEW’s existing desk-verified Dal Lake dredging, Telbal sediment, sewage, and fiscal investigation dossiers."
            routeMatch="/water-systems/lakes/dal-lake"
            investigationCodes={[
              'KEW-INV-0001',
              'KEW-INV-0003',
              'KEW-INV-0009',
              'KEW-INV-0010',
              'KEW-INV-0011',
              'KEW-INV-0012',
            ]}
          />
        </div>
      </section>
    </main>
  );
}
