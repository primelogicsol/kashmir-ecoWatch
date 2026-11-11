import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  Activity,
  ArrowRight,
  Globe2,
  Layers,
  Satellite,
  ShieldCheck,
  TrendingDown,
  Waves
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Lake Encroachment & Shoreline Change Observatory | Kashmir EcoWatch',
  description: 'Multi-decadal satellite detection of open-water loss, shoreline hardening, floating garden consolidation, and sedimentation across Kashmir lakes.',
};

export default function LakeEncroachmentPage() {
  const lakeData = [
    {
      name: 'Dal Lake',
      district: 'Srinagar',
      baselineWater1990: '1,980 ha',
      water2026: '1,395 ha',
      netChange: '-585 ha (-29.5%)',
      hardenedShorelineKm: '18.4 km',
      primaryThreat: 'Peripheral floating garden consolidation & Telbal delta sedimentation',
      sensors: 'Landsat 5 TM, Sentinel-2 MSI, Cartosat-2 PAN',
      status: 'Restabilizing in Center / Peripheral Risk'
    },
    {
      name: 'Nigeen Lake',
      district: 'Srinagar',
      baselineWater1990: '290 ha',
      water2026: '235 ha',
      netChange: '-55 ha (-19.0%)',
      hardenedShorelineKm: '6.8 km',
      primaryThreat: 'Houseboat sanitation discharges & urban embankment hardening',
      sensors: 'Sentinel-2 MSI (10m), PlanetScope (3m)',
      status: 'High Vigilance'
    },
    {
      name: 'Wular Lake Basin',
      district: 'Bandipora / Baramulla',
      baselineWater1990: '6,150 ha',
      water2026: '4,410 ha',
      netChange: '-1,740 ha (-28.3%)',
      hardenedShorelineKm: '28.2 km',
      primaryThreat: 'Upstream catchment erosion deltas & artificial willow monoculture bunds',
      sensors: 'Landsat Series, Sentinel-1 SAR VV/VH, Cartosat DEM',
      status: 'Active Desiltation Recovery (590 ha restored)'
    },
    {
      name: 'Anchar Lake',
      district: 'Srinagar Outskirts',
      baselineWater1990: '1,420 ha',
      water2026: '510 ha',
      netChange: '-910 ha (-64.1%)',
      hardenedShorelineKm: '14.5 km',
      primaryThreat: 'Severe residential sewage siltation, solid waste dumping, and SKIMS road cutoff',
      sensors: 'Landsat MSS/TM to Sentinel-2 L2A',
      status: 'Critical Degradation'
    },
    {
      name: 'Manasbal Lake',
      district: 'Ganderbal',
      baselineWater1990: '280 ha',
      water2026: '228 ha',
      netChange: '-52 ha (-18.6%)',
      hardenedShorelineKm: '4.2 km',
      primaryThreat: 'Limestone quarrying runoff, tourist shoreline encroachment & macrophyte choking',
      sensors: 'Sentinel-2 MSI, High-Res Drone Imagery',
      status: 'Moderate Stress / Deep Basin Protected'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Lacustrine Telemetry • Open Water Loss & Hardening"
        breadcrumbs={[
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Earth & Human Impact",
    href: "/earth-human-impact"
  },
  {
    label: "Aquatic & Cryosphere",
    href: "/earth-human-impact/aquatic-cryosphere"
  },
  {
    label: "Lake Encroachment"
  }
]}
        icon={<Waves className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-LAKE
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Lake Encroachment & Shoreline Change
              </span>
            </div>
          </div>
        }
        subtitle="Multi-decadal satellite detection of open-water loss, shoreline hardening, floating garden consolidation, and sedimentation across Kashmir lakes."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
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
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/aquatic-cryosphere">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Aquatic Core
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/lake-encroachment'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* Core Findings Table */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Valley Lakes Temporal Loss & Hardening Balance
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Comparison between historical 1990 Landsat baseline and 2026 Sentinel-2 L2A observations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Lake Name</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">1990 Baseline</th>
                  <th className="py-2.5 px-3">2026 Area</th>
                  <th className="py-2.5 px-3">Net Area Change</th>
                  <th className="py-2.5 px-3">Hardened Shoreline</th>
                  <th className="py-2.5 px-3">Primary Threat Vector</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {lakeData.map((lake) => (
                  <tr key={lake.name} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{lake.name}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{lake.district}</td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">{lake.baselineWater1990}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300 font-bold whitespace-nowrap">{lake.water2026}</td>
                    <td className="py-3 px-3 font-mono text-rose-400 font-bold whitespace-nowrap">{lake.netChange}</td>
                    <td className="py-3 px-3 font-mono text-amber-300 whitespace-nowrap">{lake.hardenedShorelineKm}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-300 break-words max-w-[220px]">{lake.primaryThreat}</td>
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

        {/* Deep Dive into Dal Lake vs Anchar Lake */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">Dal Lake: Siltation & Floating Garden Dynamics</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                1,395 ha Active
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Historical conversion of floating rafts (Raadh) into consolidated residential land has been largely halted 
              within central water expanses through strict LCMA enforcement. However, satellite NIR-SWIR time-series reveal 
              subtle ongoing infilling along the Telbal Nallah outfall delta, where 14.2 ha of sediment shoals have sprouted 
              invasive willow shrubs since 2018.
            </p>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Dredged Debris 2020–26: <strong className="text-white">1.82M m³</strong></span>
              <Link href="/earth-human-impact/change-detection-observatory/historical-comparison" className="text-cyan-400 hover:text-white font-medium flex items-center gap-1">
                <span>View Comparison</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">Anchar Lake: The Crisis of Disconnection</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                -64.1% Loss
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Anchar represents Kashmir’s most acute lacustrine collapse. Construction of urban bypass highways and hospital 
              complexes severed vital freshwater channels connecting Dal via Nallah Amir Khan. Deprived of regular flushing, 
              the remaining 510 ha waterbody functions largely as a hypertrophic stabilization basin for urban untreated runoff.
            </p>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Channel Connectivity: <strong className="text-rose-400">Severely Constricted</strong></span>
              <Link href="/earth-human-impact/change-detection-observatory/detection-alerts" className="text-cyan-400 hover:text-white font-medium flex items-center gap-1">
                <span>View Alert Dossier</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
