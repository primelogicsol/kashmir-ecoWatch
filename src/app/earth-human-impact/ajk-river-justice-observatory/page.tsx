import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Droplets,
  Scale,
  Waves,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { AjkRiverJusticeWorkbench } from '@/components/himalayan-dispatch/AjkRiverJusticeWorkbench';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';
import {
  AJK_EDITORIAL_PRIORITIES_6,
  AJK_RIVERS_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-ajk-rivers-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'AJ&K River Diversion, Reservoir Displacement & Resource Justice Observatory | Kashmir EcoWatch',
  description:
    'Permanent 10-registry Kashmir EcoWatch observatory examining Muzaffarabad’s Neelum–Jhelum river diversion, Mangla Dam submergence and compensation, drinking-water replacement costs, forest stress, and mining concessions across all 10 districts of Azad Jammu & Kashmir.',
  canonicalPath: '/earth-human-impact/ajk-river-justice-observatory',
  imagePath:
    '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

const TEN_OBSERVATORY_REGISTRIES = [
  { no: '01', name: 'Nauseri–Muzaffarabad Flow & E-Flow Ledger', desc: 'Tracking design diversion (280 m³/s) vs. verified upstream/downstream gauges and minimum environmental-flow releases.' },
  { no: '02', name: 'Municipal Dilution & Sewage Load Tracker', desc: 'Monitoring dissolved oxygen, coliforms, and untreated urban wastewater entering dewatered Neelum reaches.' },
  { no: '03', name: 'Replacement Infrastructure Cost Account', desc: 'Auditing public capital outlays (>PKR 1.6B 2025 water scheme for 450,000 residents) triggered by lost river ecosystem services.' },
  { no: '04', name: 'Mangla Submergence & Raising Arrears Registry', desc: 'Separating 1960s legacy submergence from the 2003 Raising Project (15,780 acres; 118 villages; PKR 26B; May 2026 MoD concerns).' },
  { no: '05', name: 'Water Usage Charges & Hydel Parity Ledger', desc: 'Auditing AJ&K 2024–25 financial statements, royalty entitlements, and local winter/summer power reliability.' },
  { no: '06', name: 'Mirpur & 10-District Drinking-Water Security', desc: 'Tracking 2003 Mangla drinking-water commitments, spring (chashma) discharge, and rural aquifer recharge.' },
  { no: '07', name: 'Ten-District Canopy & Fuelwood-Energy Audit', desc: 'Landsat forest trends (1970s–2026), Sudhnoti FAO stress indicators, and empirical electricity-outage vs. fuelwood testing.' },
  { no: '08', name: 'Mining & Forest-Herbal Concession Watch', desc: 'Tracking the March 17, 2026 retrospective withdrawal of March 2024 restrictions across leases and protected forests.' },
  { no: '09', name: 'Post-2005 Seismic Reconstruction Survivability', desc: 'Evaluating structural safety of schools, hospitals, and fault-margin settlements built from 2005 to 2026.' },
  { no: '10', name: 'Institutional Right-of-Reply & Community Dockets', desc: 'Publishing verbatim responses from federal/AJ&K agencies alongside verified community water and displacement filings.' },
];

export default function AjkRiverJusticeObservatoryPage() {
  const dispatchUrl = getKewToDispatchUrl(
    `/issues/volume-01-issue-01/${AJK_RIVERS_MONOGRAPH_SPEC.storySlug}`
  );
  const monographUrl = getKewToDispatchUrl(
    `/issues/${AJK_RIVERS_MONOGRAPH_SPEC.monographSlug}`
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW · Earth-Human Impact & Resource Justice"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth-Human Impact', href: '/earth-human-impact' },
          { label: 'AJ&K River Diversion & Resource Justice Observatory' },
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block whitespace-normal break-words leading-[1.12] bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              AJ&amp;K River Diversion, Reservoir Displacement &amp; Resource Justice Observatory
            </span>
          </>
        }
        subtitle="Tracking river diversion hydrology in Muzaffarabad, six decades of Mangla submergence and compensation, spring water security, forest-energy pressures, and extractive concessions across all ten districts of Azad Jammu & Kashmir"
        icon={<Waves className="w-6 h-6 text-cyan-400" />}
        images={[
          '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
          '/images/publications/wular-ramsar-wetland-floodplain.jpg',
          '/images/environmental-pil/forest-moratorium-river-basin.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/90 via-[#0a1628]/75 to-slate-950"
      />

      <div className="container mx-auto px-6 -mt-4 relative z-20 space-y-14">
        <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { value: '969 MW', label: 'NJHP Diversion' },
              { value: '>84.6%', label: 'WB Flow Scenario*' },
              { value: 'PKR 1.6B+', label: '2025 Water Scheme' },
              { value: '15,780 ac', label: 'Mangla Raising*' },
              { value: '118', label: 'Raising Villages*' },
              { value: '10', label: 'AJ&K Districts' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-center"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">
                  {kpi.value}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              *Methodological Scope: &gt;84.6% (650 m³/s → &lt;100 m³/s) is a projected World Bank
              cumulative-development scenario, not a verified present-day river measurement;
              15,780 acres and 118 villages apply specifically to the 2003 Mangla Dam Raising
              Project rather than cumulative 1960s-plus-raising totals.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={dispatchUrl}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold uppercase tracking-wider text-white"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read AJ&amp;K Flagship Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={monographUrl}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-400/50 bg-amber-500/15 hover:bg-amber-500/25 text-xs font-bold uppercase tracking-wider text-amber-200"
              >
                <span>Monograph 17 (12 Vols · 72 Chs)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 10 Permanent Accountability Registries */}
        <section className="space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              PERMANENT ACCOUNTABILITY INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Ten AJ&amp;K Hydrological, Displacement &amp; Resource Justice Registries
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TEN_OBSERVATORY_REGISTRIES.map((reg) => (
              <div
                key={reg.no}
                className="rounded-xl border border-slate-800 bg-slate-900/75 p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    REGISTRY {reg.no}
                  </span>
                  <Scale className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h3 className="text-sm font-bold text-white">{reg.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {reg.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive AJ&K Workbench */}
        <AjkRiverJusticeWorkbench variant="observatory" />

        {/* Companion KEW Observatories */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 inline-flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              <span>Connected Western Himalayan Observatories</span>
            </div>
            <p className="text-sm text-slate-300">
              Compare AJ&amp;K river-diversion and displacement findings with the 5-region KEW
              Hydropower Observatory and Multi-Hazard Resilience Command Center.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/earth-human-impact/hydropower-energy-justice-observatory"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-950 text-xs font-semibold text-slate-200 hover:border-cyan-400"
            >
              <span>5-Region Hydropower Observatory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/hazard-intelligence/multi-hazard-resilience-command-center"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-950 text-xs font-semibold text-slate-200 hover:border-amber-400"
            >
              <span>Multi-Hazard Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
