import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  AlertTriangle,
  Globe2,
  Mountain,
  Satellite,
  Scale,
  ShieldAlert,
  Thermometer
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Glacier Recession & Cryosphere Change Observatory | Kashmir EcoWatch',
  description: 'Geodetic mass balance differencing, terminus retreat tracking, and supraglacial debris dynamics across Western Himalayan glaciers.',
};

export default function GlacierRecessionPage() {
  const glaciers = [
    {
      name: 'Kolahoi Glacier (Gwash Brari)',
      basin: 'Lidder Catchment, Jhelum Basin',
      area1980: '13.9 km²',
      area2026: '9.85 km²',
      areaContraction: '-29.1%',
      terminusRetreat: '-16.2 m/year (Snout retreated 664m since 1985)',
      geodeticThinningRate: '-0.52 m w.e./year (Ablation zone: -1.8 m/yr)',
      debrisCoverPct: '38.2% (Up from 11.5% in 1985)',
      glofRisk: 'Moderate / Proglacial pond expansion monitored',
      status: 'Severe Downwasting'
    },
    {
      name: 'Thajiwas Glacier Complex',
      basin: 'Sind Catchment, Sonamarg',
      area1980: '4.8 km²',
      area2026: '3.62 km²',
      areaContraction: '-24.6%',
      terminusRetreat: '-9.4 m/year',
      geodeticThinningRate: '-0.44 m w.e./year',
      debrisCoverPct: '26.4%',
      glofRisk: 'Low / Rapid bedrock exposure',
      status: 'High Ablation'
    },
    {
      name: 'Harmukh Glacier System',
      basin: 'Wangath / Sind Catchment',
      area1980: '3.2 km²',
      area2026: '2.48 km²',
      areaContraction: '-22.5%',
      terminusRetreat: '-8.1 m/year',
      geodeticThinningRate: '-0.38 m w.e./year',
      debrisCoverPct: '31.0%',
      glofRisk: 'Moderate / Gangabal moraine stability monitored',
      status: 'High Vigilance'
    },
    {
      name: 'Machoi Glacier',
      basin: 'Drass / Zojila Corridor',
      area1980: '5.6 km²',
      area2026: '4.15 km²',
      areaContraction: '-25.9%',
      terminusRetreat: '-11.8 m/year',
      geodeticThinningRate: '-0.48 m w.e./year',
      debrisCoverPct: '42.5%',
      glofRisk: 'Low / Highway corridor debris flow',
      status: 'Severe Fragmentation'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Cryosphere Telemetry • Snout Retreat & Mass Balance"
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
    label: "Glacier Recession"
  }
]}
        icon={<Mountain className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-GLACIER
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Glacier Recession & Cryosphere Observatory
              </span>
            </div>
          </div>
        }
        subtitle="Satellite geodetic DEM differencing, dGPS terminus survey records, supraglacial debris mapping, and glacier-lake outburst flood (GLOF) monitoring across Kashmir catchments."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/glacier-recession'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/glacier-recession'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/glacier-recession'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/glacier-recession'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* Core Glacier Table */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              Glacier Surface Area vs Geodetic Mass Balance Balance Sheet
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Multi-decadal records integrating Survey of India 1980 baseline with 2026 Sentinel-2 & TanDEM-X observations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Glacier Name</th>
                  <th className="py-2.5 px-3">Basin</th>
                  <th className="py-2.5 px-3">1980 Area</th>
                  <th className="py-2.5 px-3">2026 Area</th>
                  <th className="py-2.5 px-3">Planimetric Loss</th>
                  <th className="py-2.5 px-3">Terminus Retreat</th>
                  <th className="py-2.5 px-3">Geodetic Mass Balance</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {glaciers.map((g) => (
                  <tr key={g.name} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{g.name}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{g.basin}</td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">{g.area1980}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300 font-bold whitespace-nowrap">{g.area2026}</td>
                    <td className="py-3 px-3 font-mono text-rose-400 font-bold whitespace-nowrap">{g.areaContraction}</td>
                    <td className="py-3 px-3 font-mono text-amber-300 break-words max-w-[160px]">{g.terminusRetreat}</td>
                    <td className="py-3 px-3 font-mono text-purple-300 break-words max-w-[160px]">{g.geodeticThinningRate}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Kolahoi Deep Dive Card */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-xs font-semibold">
              <span>Focal Cryosphere Study &bull; Kolahoi (Gwash Brari)</span>
            </div>
            <h3 className="text-xl font-bold text-white">The Changing Geometry of Kashmir's Primary Water Tower</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Between 1985 and 2026, Kolahoi contracted from 13.9 km² to 9.85 km² (29.1% area loss). The snout retreated 
              664 meters upslope. Crucially, radar and optical DEM differencing (SRTM 2000 vs Cartosat-1 2026) demonstrates 
              that the lower ablation tongue is thinning at over 1.8 meters per year. 
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Supraglacial debris cover has expanded from 11.5% to 38.2%. While thick continuous debris blankets can insulate ice, 
              discontinuous patchy debris accelerates melt by reducing surface albedo. Multiple supraglacial melt ponds are now coalescing 
              near the 4,050m ASL contour, generating localized glacial lake outburst flood hazards for downstream Lidder Valley communities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Key Downstream Consequences</h4>
            <div className="space-y-2 text-slate-300 text-[11px]">
              <div>
                <strong className="text-amber-300 block">Late-Summer Streamflow Decline:</strong>
                Lidder river baseflow in August–September relies up to 45% on glacier melt. Loss of ice volume threatens irrigation for South Kashmir apple orchards and paddy fields.
              </div>
              <div className="pt-2 border-t border-white/5">
                <strong className="text-rose-400 block">Black Carbon Acceleration:</strong>
                Aerosol measurements show significant particulate soot deposits on Kolahoi lower reaches transported from valley brick kilns and vehicular emissions.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
