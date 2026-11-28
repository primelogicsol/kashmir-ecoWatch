import { buildPageMetadata } from '@/lib/seo/route-metadata';
import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  FileSpreadsheet,
  Globe2,
  Layers,
  Satellite,
  Scale,
  Waves,
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { DalLakeEncroachmentWorkbench } from '@/components/himalayan-dispatch/DalLakeEncroachmentWorkbench';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Lake Encroachment & Dal Lake Administrative Accountability Observatory | Kashmir EcoWatch',
  description:
    'Multi-decadal satellite detection of open-water loss, shoreline hardening, and the permanent 12-module Dal Lake Encroachment & Administrative Accountability Observatory (1859–2026).',
  canonicalPath: '/earth-human-impact/aquatic-cryosphere/lake-encroachment',
});

const DAL_FORENSIC_MODULES_12 = [
  {
    code: 'DLEO-01',
    title: 'Historical Boundary Registry',
    detail:
      'Reconciles 1859 survey baselines (31.84 km² total / 20.59 km² open water) through 2013 academic series (24.04 km² / 10.50 km²) and 2020 CAG/EE&RSD constant-boundary polygons (2,460.5 ha).',
  },
  {
    code: 'DLEO-02',
    title: 'Satellite Change Detection',
    detail:
      'Matched-season, water-level-calibrated CORONA (1960–1972), Landsat MSS/TM/ETM+/OLI, Sentinel-1 SAR, and Sentinel-2 MSI classification across 15 land-cover classes (OW–UL).',
  },
  {
    code: 'DLEO-03',
    title: 'Conflict-Era Land Analysis',
    detail:
      'Examines 1989–1996 conservation discontinuity, 1992–2001 open-water reduction (−242 ha / −18.5%), and 2008, 2010, 2014, 2016, and 2020–2021 enforcement disruption intervals.',
  },
  {
    code: 'DLEO-04',
    title: 'Water-to-Land Transition',
    detail:
      'Tracks internal conversion of open water into floating vegetation, floating gardens, cropland/plantation (+55.9 ha in 2007–2020), and permanent built-up land (+28.2 ha).',
  },
  {
    code: 'DLEO-05',
    title: 'Parcel Accountability',
    detail:
      '17-field parcel dossier protocol linking geospatial coordinates and earliest transformation dates with revenue records, sanctions, notices, and recorded right of response.',
  },
  {
    code: 'DLEO-06',
    title: 'Construction Permissions',
    detail:
      'Audits post-June 1986 moratorium exemptions, LCMA Planning Division sanctions, and master-plan conformity across all eight basins and connecting waterways.',
  },
  {
    code: 'DLEO-07',
    title: 'Enforcement Intelligence',
    detail:
      'Evaluates the 14+ year archive gap (2000–Sept 2014 flood-damaged LCMA records), 2,916 post-2014 removals, 632 Oct 2024–Feb 2026 demolitions, and CCTV network gaps (19/40 km cable, 9/20 poles).',
  },
  {
    code: 'DLEO-08',
    title: 'Judicial Case Archive',
    detail:
      'Indexes J&K High Court PIL orders (2002–2024), the March 2009 Divisional Commissioner inquiry naming 8 LAWDA officials, and ACB FIR No. 48/2015 charge-sheet proceedings.',
  },
  {
    code: 'DLEO-09',
    title: 'Public Asset Valuation',
    detail:
      'Differentiates generational lake-dweller livelihoods from commercial, tourism, and speculative land appropriation using circle rates and registered deeds.',
  },
  {
    code: 'DLEO-10',
    title: 'Hydrological Obstruction',
    detail:
      'Tracks public-sector and private narrowing of lake arteries documented by CAG (Chatterhama Nallah 60–70 ft to 3–4 ft; Saidnar Nallah 100–150 ft to 25–30 ft; R&B road blockages).',
  },
  {
    code: 'DLEO-11',
    title: 'Rehabilitation Monitoring',
    detail:
      'Audits the ₹356 Cr 2012 Special Plan Assistance programme (2,299/14,992 kanals and 319/1,994 structures acquired by Dec 2019; ₹63.73 Cr spent; unreclaimed dredging gap) and household equity.',
  },
  {
    code: 'DLEO-12',
    title: 'Ecological Recovery',
    detail:
      'Measures Net Aquatic Area Recovered (A_net_recovery = A_ecologically_restored − A_newly_converted) rather than raw notice or demolition counts.',
  },
];

const PRINCIPAL_PUBLIC_INDICATORS_7 = [
  {
    indicator: 'Historical lake extent (1859)',
    value: '31.84 km² total · 20.59 km² open water',
    sourceAndStatus: 'Dated peer-reviewed reconstruction (Rashid et al., 2017; Frontiers, 2019)',
  },
  {
    indicator: 'CAG / EE&RSD constant-boundary water extent (2007 → 2020)',
    value: '1,540.5 ha → 1,290.7 ha (−249.8 ha / −16.22%)',
    sourceAndStatus: 'Dated official audit dataset across 2,460.5 ha mapped boundary (CAG Report No. 4 of 2025)',
  },
  {
    indicator: 'Current verified water extent (2026)',
    value: 'Pending Reproducible Satellite Verification',
    sourceAndStatus:
      '2026 Govt statements report >20.3 km² vs. KEW preliminary estimate 13.95 km² (6.35 km² boundary/class discrepancy under audit)',
  },
  {
    indicator: 'Permanent land conversion (2007–2020 built-up + cropland/plantation)',
    value: '+84.1 ha (+1,663 kanals)',
    sourceAndStatus: 'CAG/EE&RSD net expansion (+55.9 ha cropland/plantation, +28.2 ha built-up); parcel origin pending',
  },
  {
    indicator: 'New construction footprint (post-2020)',
    value: 'Unverified — Matched-Season EO Processing Required',
    sourceAndStatus: 'Not extrapolated from historical 19.2 ha/yr average; requires object-based Sentinel/high-res audit',
  },
  {
    indicator: 'Legally established encroachment',
    value: 'Pending Parcel-Level Judicial & Revenue Verification',
    sourceAndStatus: 'Strictly separated from suspected violations, allegations, and traditional lake-dweller settlements',
  },
  {
    indicator: 'Area recovered & Net annual aquatic recovery',
    value: 'Awaiting Annual A_restored & A_newly_converted Disclosure',
    sourceAndStatus: '2,299 kanals (~116 ha) acquired under 2012 SPA reported undredged by Dec 2019; 2026 status sought',
  },
];

export default function LakeEncroachmentPage() {
  const lakeData = [
    {
      name: 'Dal Lake',
      district: 'Srinagar',
      baselineWater1990: '1,310 ha (1992 open water)',
      water2026: '1,395 ha (KEW est. · under audit vs >2,030 ha Govt report)',
      netChange: '−249.8 ha (2007–2020 CAG)',
      hardenedShorelineKm: '18.4 km (est.)',
      primaryThreat: 'Internal water-to-land conversion, tributary narrowing & shoreline infilling',
      sensors: 'CORONA, Landsat MSS/TM/OLI, Sentinel-1/2 (Reconciliation Active)',
      status: 'Forensic Satellite & Cadastral Audit Active',
    },
    {
      name: 'Nigeen Lake',
      district: 'Srinagar',
      baselineWater1990: '290 ha (est.)',
      water2026: '235 ha (est.)',
      netChange: '−55 ha (−19.0% est.)',
      hardenedShorelineKm: '6.8 km',
      primaryThreat: 'Residential/commercial shoreline conversion & sanitation discharges',
      sensors: 'Sentinel-2 MSI (10m), PlanetScope (3m)',
      status: 'High Vigilance · Linked to Dal Dossier',
    },
    {
      name: 'Wular Lake Basin',
      district: 'Bandipora / Baramulla',
      baselineWater1990: '6,150 ha (est.)',
      water2026: '4,410 ha (est.)',
      netChange: '−1,740 ha (−28.3% est.)',
      hardenedShorelineKm: '28.2 km',
      primaryThreat: 'Upstream catchment erosion deltas & artificial willow monoculture bunds',
      sensors: 'Landsat Series, Sentinel-1 SAR VV/VH, Cartosat DEM',
      status: 'Desiltation & Boundary Audit',
    },
    {
      name: 'Anchar Lake',
      district: 'Srinagar Outskirts',
      baselineWater1990: '1,420 ha (est.)',
      water2026: '510 ha (est.)',
      netChange: '−910 ha (−64.1% est.)',
      hardenedShorelineKm: '14.5 km',
      primaryThreat: 'Residential sewage siltation, solid waste dumping & Nallah Amir Khan severance',
      sensors: 'Landsat MSS/TM to Sentinel-2 L2A',
      status: 'Critical Degradation',
    },
    {
      name: 'Manasbal Lake',
      district: 'Ganderbal',
      baselineWater1990: '280 ha (est.)',
      water2026: '228 ha (est.)',
      netChange: '−52 ha (−18.6% est.)',
      hardenedShorelineKm: '4.2 km',
      primaryThreat: 'Limestone quarrying runoff, shoreline encroachment & macrophyte growth',
      sensors: 'Sentinel-2 MSI',
      status: 'Moderate Stress',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="Lacustrine Telemetry • Open Water Loss, Land Governance & Accountability"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Aquatic & Cryosphere', href: '/earth-human-impact/aquatic-cryosphere' },
          { label: 'Lake Encroachment' },
        ]}
        icon={<Waves className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <KewBrandIdentity />
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Lake Encroachment &amp; Shoreline Change Observatory
              </span>
            </div>
          </div>
        }
        subtitle="Historical and satellite reconstruction of open-water loss, internal water-to-land conversion, tributary narrowing, and administrative accountability across Kashmir’s lakes—featuring the permanent Dal Lake Encroachment & Administrative Accountability Observatory."
        images={[
          '/images/publications/dal-lake-lacustrine-houseboats.jpg',
          '/images/environmental-pil/kashmir-high-court-wetland.jpg',
          '/images/protected-network.png',
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/lake-encroachment'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/lake-encroachment'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/lake-encroachment'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/himalayan-dispatch/issues/volume-01-issue-01/the-art-of-encroachment">
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-500 font-bold text-white shadow-md"
              >
                <span>Read Dispatch 06: The Art of Encroachment</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment">
              <Button
                size="sm"
                variant="outline"
                className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold"
              >
                <Satellite className="w-4 h-4 mr-1.5" />
                <span>Monograph 11 (15 Vols · 100 Chapters)</span>
              </Button>
            </Link>
          </div>
        }
      />

      <ModuleKpiStrip
        kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/lake-encroachment'].kpis}
        iconColor="text-teal-400"
      />

      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Scientific Self-Scrutiny & Non-Simulation Standard Notice */}
        <section className="p-5 sm:p-6 rounded-2xl bg-amber-950/30 border border-amber-500/35 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <p className="font-bold text-amber-300 uppercase tracking-wider text-xs">
              Data Integrity &amp; Self-Verification Standard (No Simulated Figures Labelled as Live Measurements)
            </p>
            <p>
              All counters distinguish dated peer-reviewed or statutory audit series (Rashid et al.
              1859–2013; CAG/EE&amp;RSD 2007–2020 across 2,460.5 ha) from preliminary platform
              estimates. In 2026, government restoration statements report <strong>&gt;20.3 km²</strong>{' '}
              open water following ~6.5 km² vegetation clearance, whereas KEW&apos;s published
              contemporary estimate lists <strong>13.95 km² (1,395 ha)</strong>—a{' '}
              <strong>6.35 km² (635 ha) discrepancy</strong> reflecting boundary, vegetation-class,
              and seasonal water-level differences that KEW is subjecting to reproducible Sentinel-1/2
              verification.
            </p>
          </div>
        </section>

        {/* Core Regional Lake Table */}
        <section className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Valley Lakes Temporal Loss &amp; Boundary Status Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Comparative overview across five major Kashmir Valley lakes; preliminary estimates are
              explicitly marked pending matched-season satellite re-certification.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Lake Name</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Historical Reference</th>
                  <th className="py-2.5 px-3">2026 Published Estimate</th>
                  <th className="py-2.5 px-3">Documented Change</th>
                  <th className="py-2.5 px-3">Hardened Shoreline</th>
                  <th className="py-2.5 px-3">Primary Threat Vector</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {lakeData.map((lake) => (
                  <tr key={lake.name} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{lake.name}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{lake.district}</td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">{lake.baselineWater1990}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300 font-bold">{lake.water2026}</td>
                    <td className="py-3 px-3 font-mono text-rose-400 font-bold whitespace-nowrap">
                      {lake.netChange}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-300 whitespace-nowrap">
                      {lake.hardenedShorelineKm}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-300 max-w-[240px]">
                      {lake.primaryThreat}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                        {lake.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Dedicated Forensic Module: Dal Lake Encroachment & Administrative Accountability Observatory */}
        <section
          id="dal-lake-forensic-observatory"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-teal-950/35 via-slate-900/80 to-slate-900 border border-teal-500/35 space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-2 max-w-4xl">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                KEW · Aquatic Environmental Intelligence · Dedicated Forensic Expansion
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Dal Lake Encroachment &amp; Administrative Accountability Observatory
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Companion scientific and legal observatory for Himalayan Dispatch{' '}
                <strong>Dispatch 06 (The Art of Encroachment)</strong> and{' '}
                <strong>Monograph 11 (15 Volumes · 100 Chapters)</strong>—connecting 1859–2026
                water-to-land transitions, tributary narrowing, lost enforcement archives, judicial
                inquiries, and traditional community safeguards.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href="/api/himalayan-dispatch/datasets/dal-encroachment-monograph-framework?format=csv"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-teal-500/35 text-teal-300 text-xs font-semibold transition"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Download 100-Chapter Framework (CSV)</span>
              </a>
            </div>
          </div>

          {/* 7 Principal Public Indicators */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>Seven Principal Public Indicators &amp; Evidentiary Basis</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/60">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900 text-[11px] uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Public Indicator</th>
                    <th className="py-3 px-4">Dated Value / Verification State</th>
                    <th className="py-3 px-4">Dataset, Boundary &amp; Methodological Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PRINCIPAL_PUBLIC_INDICATORS_7.map((row) => (
                    <tr key={row.indicator}>
                      <td className="py-3 px-4 font-semibold text-white align-top">
                        {row.indicator}
                      </td>
                      <td className="py-3 px-4 font-mono text-teal-300 font-bold align-top">
                        {row.value}
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-xs leading-relaxed align-top">
                        {row.sourceAndStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 12 Permanent Forensic Modules */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
              Twelve Permanent Dal Lake Forensic Modules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DAL_FORENSIC_MODULES_12.map((mod) => (
                <div
                  key={mod.code}
                  className="p-4 rounded-xl bg-slate-950/75 border border-white/10 space-y-1.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                    {mod.code}
                  </span>
                  <h4 className="text-base font-bold text-white">{mod.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{mod.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Interactive Land-Value & Net Aquatic Recovery Workbench */}
          <div
            style={
              {
                '--hd-bg': '#020617',
                '--hd-bg-elevated': '#0f172a',
                '--hd-fg': '#f8fafc',
                '--hd-fg-secondary': '#cbd5e1',
                '--hd-fg-muted': '#94a3b8',
                '--hd-rule': 'rgba(255,255,255,0.12)',
                '--hd-rule-strong': 'rgba(45,212,191,0.35)',
                '--hd-copper': '#2dd4bf',
              } as React.CSSProperties
            }
          >
            <DalLakeEncroachmentWorkbench />
          </div>
        </section>

        {/* Connected Lakeside Contradictions Cross-Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake"
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-teal-500/40 transition space-y-1.5 block"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
              Dispatch 04 · Companion Inquiry
            </span>
            <h3 className="text-base font-bold text-white">The Mathematics of a Dying Lake</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conservation expenditure, STP mass balances, and engineering accountability across Dal
              Lake.
            </p>
          </Link>

          <Link
            href="/himalayan-dispatch/issues/volume-01-issue-01/the-art-of-encroachment"
            className="p-5 rounded-xl bg-slate-900/60 border border-amber-500/30 hover:border-amber-400/60 transition space-y-1.5 block"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
              Dispatch 06 · Primary Investigation
            </span>
            <h3 className="text-base font-bold text-white">The Art of Encroachment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              How Dal Lake is being turned into real estate: 1859–2026 land conversion, ACB FIR
              48/2015, and Net Aquatic Area Recovered.
            </p>
          </Link>

          <Link
            href="/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course"
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition space-y-1.5 block"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Dispatch 10 · Foothill Counterpart
            </span>
            <h3 className="text-base font-bold text-white">
              The National Park That Became a Golf Course
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sálim Ali National Park conversion on the Dal Lake foothills and 2003–2005 NBWL
              proceedings.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
