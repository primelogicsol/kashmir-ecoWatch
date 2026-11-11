'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  CloudRain,
  Globe2,
  Layers,
  Satellite,
  Snowflake,
  Thermometer,
  TrendingUp,
  Wind
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function ClimateAtmosphereSubmodulePage() {
  const climatePillars = [
    {
      id: 'temp-precip',
      title: 'Temperature & Precipitation Trajectories',
      metrics: '+1.42°C Valley Anomaly | -12% Winter Precipitation',
      description: 'Long-term decadal warming exceeds the global northern hemisphere mean, characterized by warmer winters, earlier spring green-up, and concentrated monsoonal rain bursts replacing sustained gentle precipitation.',
      telemetry: 'IMD Rambagh Srinagar AWS & ERA5-Land Reanalysis 0.1° grid'
    },
    {
      id: 'snow-cryosphere',
      title: 'Snowpack Dynamics & Cryosphere Deficit',
      metrics: '265 mm SWE vs 380 mm Normal | 3.2x Snow Drought Frequency',
      description: 'Severe winter snow drought (Chillai Kalan dry spells) causing premature ablation of high-altitude firn and seasonal snowpacks across Kolahoi, Thajwas, and Apharwat watersheds.',
      telemetry: 'MODIS Terra/Aqua Snow Covered Area (SCA) & Sentinel-3 SLSTR'
    },
    {
      id: 'atmospheric-extremes',
      title: 'Localized Convective Cloudburst Extremes',
      metrics: '42 Cloudburst Events (2020–2025) | +35% Peak Intensity',
      description: 'Orographic lifting of moisture-laden air masses encountering colder upper-level tropospheric air along the Pir Panjal scarp, triggering intense meso-scale convective cloudbursts.',
      telemetry: 'Doppler Weather Radar (DWR) Srinagar & INSAT-3D Rapid Scan'
    },
    {
      id: 'airshed-dynamics',
      title: 'Valley Airshed Dynamics & Winter Inversion',
      metrics: '82 Days Severe Winter Inversion | PM2.5 Peak 240 µg/m³',
      description: 'Bowl-shaped topography traps biomass smoke, vehicular emissions, and brick-kiln plumes under low boundary layer thermal inversions from November through February.',
      telemetry: 'CPCB / JKPCC Continuous Ambient Air Quality Monitoring Stations (CAAQMS)'
    }
  ];

  const stationReadings = [
    { station: 'Srinagar (Rambagh)', elevation: '1,587 m', maxTemp: '+34.2°C', minTemp: '-5.4°C', precipDeficit: '-14%', snowCoverDays: '12 days' },
    { station: 'Gulmarg (Observatory)', elevation: '2,650 m', maxTemp: '+25.8°C', minTemp: '-11.2°C', precipDeficit: '-21%', snowCoverDays: '74 days' },
    { station: 'Pahalgam (Lidder Valley)', elevation: '2,130 m', maxTemp: '+28.4°C', minTemp: '-8.6°C', precipDeficit: '-18%', snowCoverDays: '48 days' },
    { station: 'Qazigund (South Gateway)', elevation: '1,690 m', maxTemp: '+33.1°C', minTemp: '-6.2°C', precipDeficit: '-9%', snowCoverDays: '18 days' },
    { station: 'Kupwara (North Frontier)', elevation: '1,609 m', maxTemp: '+33.8°C', minTemp: '-5.8°C', precipDeficit: '-16%', snowCoverDays: '15 days' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Climate & Atmosphere Observatory • IMD Baseline"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Climate & Atmosphere Intelligence' }
        ]}
        icon={<Thermometer className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-CLIM
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Climate & Atmosphere Intelligence
              </span>
            </div>
          </div>
        }
        subtitle="Continuous empirical surveillance of Western Himalayan microclimate alteration, cryospheric ablation, precipitation regimes, and atmospheric inversion layers governing Kashmir's hydrological baseline."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['climate-atmosphere'].tag}
            badge={EHII_HERO_CONFIGS['climate-atmosphere'].badge}
            items={EHII_HERO_CONFIGS['climate-atmosphere'].showcaseItems}
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
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['climate-atmosphere'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Mean Temp Anomaly</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">+1.42°C</div>
            <div className="text-[11px] text-slate-500">Above 1981–2010 normal</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Snow-Water Equivalent</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">265 mm</div>
            <div className="text-[11px] text-slate-500">Deficit vs 380 mm normal</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Winter Chill Hours</div>
            <div className="text-2xl font-bold text-orange-400 mt-1">-18%</div>
            <div className="text-[11px] text-slate-500">Critical for apple dormancy</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Zero-Degree Isotherm</div>
            <div className="text-2xl font-bold text-sky-400 mt-1">+280 m</div>
            <div className="text-[11px] text-slate-500">Elevation displacement</div>
          </div>
        </div>

        {/* Four Scientific Sub-Domains */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Four Atmospheric Science Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {climatePillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-teal-400 mb-2">{p.metrics}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Sensor Feeds:</span>
                  <span className="text-slate-400">{p.telemetry}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Synoptic Station Ledger */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">IMD Climatological Weather Station Network</h3>
          <p className="text-xs text-slate-400 mb-4">Official station readings comparing valley floor vs high altitude mountain observatories.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Elevation</th>
                  <th className="py-2.5 px-3">Max Summer Temp</th>
                  <th className="py-2.5 px-3">Min Winter Temp</th>
                  <th className="py-2.5 px-3">Precipitation Deficit</th>
                  <th className="py-2.5 px-3">Snow Cover Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stationReadings.map((s) => (
                  <tr key={s.station} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-white">{s.station}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{s.elevation}</td>
                    <td className="py-2.5 px-3 font-mono text-amber-400">{s.maxTemp}</td>
                    <td className="py-2.5 px-3 font-mono text-sky-400">{s.minTemp}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-400">{s.precipDeficit}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">{s.snowCoverDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross-Module Linkages CTA */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">Systemic Feedback Linkage</div>
            <h4 className="text-base font-bold text-white">How Atmospheric Changes Impact Kashmir Sectoral Systems</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Decreased chill hours directly reduce Apple fruit set (Horticulture EIA), while premature ablation alters Jhelum summer discharge profiles (Water Systems) and heightens downstream flash flood exposure (Hazard Intelligence).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/sectoral-eia/sectors/horticulture"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              Horticulture EIA
            </Link>
            <Link
              href="/water-systems"
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              Water Systems
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
