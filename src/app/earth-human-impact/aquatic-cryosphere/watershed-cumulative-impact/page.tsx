import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  Activity,
  ArrowRight,
  Globe2,
  Layers,
  Mountain,
  Satellite,
  ShieldAlert,
  Waves
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Watershed Cumulative Impact & Basin Integration | Kashmir EcoWatch',
  description: 'Cumulative impact modeling connecting headwater glacier retreat, river corridor disturbance, wetland shrinkage, and springshed stress across the Jhelum Basin.',
};

export default function WatershedCumulativeImpactPage() {
  const basins = [
    {
      name: 'Upper Jhelum & Lidder Basin',
      areaKm2: '3,240 km²',
      cryosphereStress: 'Critical / Kolahoi recession (-29.1% area)',
      riparianStatus: 'Moderate / Hospitality expansion along Lidder banks',
      springshedTrend: '-22.4% dry-season discharge reduction',
      cumulativeScore: '78.5 / 100 (Severe Vulnerability)',
      riskVector: 'Late-summer irrigation deficit & tourist wastewater loading'
    },
    {
      name: 'Central Floodplain & Wetland Sink (Srinagar–Budgam)',
      areaKm2: '2,890 km²',
      cryosphereStress: 'Indirect / Meltwater dependency from Sind & Lidder',
      riparianStatus: 'Severe / 18.5% urban floodplain constriction',
      springshedTrend: '-38.5% Karewa spring depletion from clay extraction',
      cumulativeScore: '86.2 / 100 (Critical Vulnerability)',
      riskVector: 'Catastrophic urban flash-flood vulnerability & Ramsar wetland conversion'
    },
    {
      name: 'Sind & Northern Catchment',
      areaKm2: '2,150 km²',
      cryosphereStress: 'High / Thajiwas & Harmukh glacier thinning',
      riparianStatus: 'Moderate / Hydropower diversions along lower Sind',
      springshedTrend: '-19.8% seasonal variability',
      cumulativeScore: '64.0 / 100 (Moderate Vulnerability)',
      riskVector: 'Sediment discharge into Shallabugh wetland reserve'
    },
    {
      name: 'Wular & Lower Jhelum Basin (Bandipora–Baramulla)',
      areaKm2: '4,120 km²',
      cryosphereStress: 'Moderate / Trans-Himalayan high-altitude snowpack shift',
      riparianStatus: 'High / Riverbed gravel mining in Pohru & Erin nallahs',
      springshedTrend: '-21.0% foothill spring drying',
      cumulativeScore: '81.4 / 100 (Severe Vulnerability)',
      riskVector: 'Lake siltation, flood choking at Khadanyar gorge outfall'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Basin Integration • Hydro-Ecological Modeling"
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
    label: "Watershed Cumulative Impact"
  }
]}
        icon={<Activity className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-BASIN
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Watershed Cumulative Impact Assessment
              </span>
            </div>
          </div>
        }
        subtitle="Cumulative impact modeling connecting headwater glacier retreat, river corridor disturbance, wetland shrinkage, and springshed stress across the Jhelum Basin."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/watershed-cumulative-impact'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/watershed-cumulative-impact'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/watershed-cumulative-impact'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/watershed-cumulative-impact'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* Basin Cumulative Table */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Jhelum Sub-Basin Cumulative Environmental Stress Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Multi-tiered assessment integrating cryosphere, fluvial, wetland, and springshed telemetry.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Sub-Basin</th>
                  <th className="py-2.5 px-3">Area</th>
                  <th className="py-2.5 px-3">Cryosphere Stress</th>
                  <th className="py-2.5 px-3">Riparian / Fluvial State</th>
                  <th className="py-2.5 px-3">Springshed Aquifer Trend</th>
                  <th className="py-2.5 px-3">Cumulative Score</th>
                  <th className="py-2.5 px-3">Primary Risk Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {basins.map((b) => (
                  <tr key={b.name} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{b.name}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">{b.areaKm2}</td>
                    <td className="py-3 px-3 text-[11px] text-cyan-300 break-words max-w-[180px]">{b.cryosphereStress}</td>
                    <td className="py-3 px-3 text-[11px] text-amber-300 break-words max-w-[180px]">{b.riparianStatus}</td>
                    <td className="py-3 px-3 text-[11px] text-rose-300 font-mono break-words max-w-[160px]">{b.springshedTrend}</td>
                    <td className="py-3 px-3 font-mono font-bold text-white whitespace-nowrap">{b.cumulativeScore}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-300 break-words max-w-[220px]">{b.riskVector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Source-to-Sink Cascading Model */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <h3 className="text-base font-bold text-white mb-3">The Source-to-Sink Cascading Impact Pathway</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
              <span className="font-mono text-cyan-400 font-bold block mb-1">01 HEADWATERS</span>
              <h4 className="font-bold text-white mb-1">Glacier Thinning & Snowpack Loss</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Accelerated downwasting of Kolahoi and tributary icefields causes flashier spring melt pulses and diminished August baseflows.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
              <span className="font-mono text-amber-400 font-bold block mb-1">02 FOOTHILLS</span>
              <h4 className="font-bold text-white mb-1">Karewa Mining & Riverbed Extraction</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Excavation along Rambiara and Karewa slopes releases massive sediment bedloads and decapitates local drinking springs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
              <span className="font-mono text-rose-400 font-bold block mb-1">03 VALLEY REACH</span>
              <h4 className="font-bold text-white mb-1">Floodplain Constriction & Silt Spills</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Narrowed urban Jhelum bunds force floodwaters into Hokersar and bypass channels, depositing millions of tons of smothering silt.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
              <span className="font-mono text-teal-400 font-bold block mb-1">04 TERMINAL SINK</span>
              <h4 className="font-bold text-white mb-1">Wular Lake Silt Delta Accumulation</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Terminal lake basin loses open-water volume, diminishing Kashmir’s ultimate flood safety sponge before the Baramulla gorge outfall.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
