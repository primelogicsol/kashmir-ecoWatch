'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import {
  Wind, CloudRain, Compass, BarChart3, Waves, Mountain,
  Snowflake, Droplets, ArrowRight, CheckCircle2, Layers
} from 'lucide-react';

const ATMOSPHERIC_MODULES = [
  {
    number: '01',
    title: 'Western Disturbances',
    href: '/hazard-intelligence/atmospheric-systems/western-disturbances',
    dashboardHref: '/hazard-intelligence/atmospheric-systems/western-disturbances/dashboard',
    icon: Wind,
    gradient: 'from-sky-500 to-cyan-600',
    accentBorder: 'border-sky-500/30 hover:border-sky-400/60',
    badge: '31 Corridors · 8-Tab Dashboard',
    summary:
      'WD tracking, atmospheric movement, approaching systems, snowfall and rainfall forecasts, and regional multi-hazard impacts across all 6 sub-regions.',
    parameters: ['500 hPa Trough Track', '0°C Freezing Level', '7d Rain & Snow NWP', 'RainViewer Live Radar'],
    coupledHazards: [
      { label: 'Floods', href: '/hazard-intelligence/floods' },
      { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods' },
      { label: 'Landslides', href: '/hazard-intelligence/landslides' },
      { label: 'Avalanches', href: '/hazard-intelligence/avalanches' },
    ],
  },
  {
    number: '02',
    title: 'Monsoon Dynamics',
    href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics',
    icon: CloudRain,
    gradient: 'from-teal-500 to-emerald-600',
    accentBorder: 'border-teal-500/30 hover:border-teal-400/60',
    badge: '24 Corridors · 4 Moisture Gates',
    summary:
      'Monsoon progression, Arabian Sea & Bay of Bengal 850 hPa moisture transport, orographic precipitation, observed rainfall anomalies, and regional influence.',
    parameters: ['850 hPa Moisture Flux', '7d Rainfall Anomaly (%)', 'Convective CAPE (J/kg)', 'Pir Panjal Spillover'],
    coupledHazards: [
      { label: 'Floods', href: '/hazard-intelligence/floods' },
      { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods' },
      { label: 'Landslides', href: '/hazard-intelligence/landslides' },
      { label: 'GLOFs', href: '/hazard-intelligence/glofs' },
    ],
  },
  {
    number: '03',
    title: 'Jet Stream & Atmospheric Circulation',
    href: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation',
    icon: Compass,
    gradient: 'from-indigo-500 to-violet-600',
    accentBorder: 'border-indigo-500/30 hover:border-indigo-400/60',
    badge: '24 Sectors · 26°N–38°N Transect',
    summary:
      'Subtropical westerly jet core positioning, upper-level 500 hPa troughs and blocking ridges, vertical wind shear, and seasonal circulation shifts.',
    parameters: ['250/300 hPa Jet Core', '500 hPa Height & 24h ΔZ', 'Meridional Jet Transect', 'Ridge Inversion Locking'],
    coupledHazards: [
      { label: 'Western Disturbances', href: '/hazard-intelligence/atmospheric-systems/western-disturbances' },
      { label: 'Monsoon Dynamics', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics' },
      { label: 'Avalanches', href: '/hazard-intelligence/avalanches' },
      { label: 'Air Quality', href: '/environmental-monitoring/air-pollution' },
    ],
  },
];

export default function AtmosphericSystemsHubPage() {
  const router = useRouter();
  const [activeTypology, setActiveTypology] = React.useState('all');

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Upstream Synoptic Drivers"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Atmospheric Systems' },
        ]}
        title={
          <>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span
                className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1"
                style={{ fontSize: '0.58em' }}
              >
                KEW
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Atmospheric Systems
            </span>
          </>
        }
        subtitle="Dedicated synoptic and upper-tropospheric monitoring network tracking Western Disturbances, Monsoon Dynamics, and the Subtropical Westerly Jet across Kashmir, Jammu, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<Wind className="w-6 h-6 text-sky-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-sky-600 to-cyan-600 font-bold text-white"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/western-disturbances/dashboard')}
            >
              WD Monitoring Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Layers className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence')}
            >
              All Hazard Systems
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Atmospheric Modules', value: 3, icon: 'Layers', color: 'text-sky-400' },
          { label: 'Telemetry Nodes', value: 79, icon: 'MapPin', color: 'text-cyan-400' },
          { label: 'Sub-Regions Covered', value: 6, icon: 'Globe', color: 'text-emerald-400' },
          { label: 'Pressure Levels', value: '850–250 hPa', icon: 'Gauge', color: 'text-indigo-400' },
          { label: 'Jet Transect', value: '26°N–38°N', icon: 'Compass', color: 'text-violet-400' },
          { label: 'Coupled Hazards', value: 6, icon: 'AlertTriangle', color: 'text-amber-400' },
          { label: 'Data Provenance', value: '4 Tiers', icon: 'Shield', color: 'text-teal-400' },
          { label: 'Telemetry Cycle', value: 'Live UTC', icon: 'Clock', color: 'text-sky-300' },
        ]}
        iconColor="text-sky-400"
      />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-6 space-y-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 font-mono block mb-1">
              Atmospheric Hazard Intelligence Architecture
            </span>
            <h2 className="text-2xl font-bold text-white">Three Interconnected Synoptic Systems</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Unlike localized ground hazards, atmospheric circulation regimes operate across the entire Hindu Kush–Karakoram–Western Himalaya arc and govern when and where floods, flash floods, landslides, avalanches, and GLOFs initiate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ATMOSPHERIC_MODULES.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="flex"
                >
                  <Card className={`glass-intense ${mod.accentBorder} p-6 flex flex-col justify-between gap-5 w-full transition-all`}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="info" size="sm" className="text-[10px] font-mono">
                          {mod.badge}
                        </Badge>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          Submodule {mod.number}
                        </div>
                        <h3 className="text-xl font-bold text-white mt-0.5">{mod.title}</h3>
                        <p className="text-xs text-slate-300 leading-relaxed mt-2">{mod.summary}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {mod.parameters.map((p) => (
                          <span
                            key={p}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
                          Coupled Downstream Systems
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.coupledHazards.map((ch) => (
                            <Link
                              key={ch.label}
                              href={ch.href}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 text-sky-300 hover:text-white transition-colors"
                            >
                              {ch.label} →
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
                      <Button
                        size="sm"
                        className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex-1"
                        onClick={() => router.push(mod.href)}
                      >
                        Open {mod.title} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                      {mod.dashboardHref && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/15 text-xs text-slate-200"
                          onClick={() => router.push(mod.dashboardHref!)}
                        >
                          8-Tab Dashboard
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="glass-intense border-emerald-500/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Unified Scientific Provenance Across All 3 Atmospheric Modules</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
                <span>1. Live Observation / UTC Analysis</span>
                <span>•</span>
                <span>2. 7-Day NWP Forecasts (ECMWF/GFS)</span>
                <span>•</span>
                <span>3. Statutory Agency Advisories (IMD/PMD)</span>
                <span>•</span>
                <span>4. Verified Historical Benchmarks</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-8">
        <EnvironmentalObserveSpotlight
          typologyTitle="Western Himalayan Atmospheric Regimes & Seasonal Interactions"
          typologySubtitle="Explore how winter extratropical waves, summer monsoonal surges, and upper-tropospheric jet shifts interact across 6 Himalayan sub-regions."
          typologyIcon={Wind}
          typologies={[
            { id: 'all', label: 'All Atmospheric Drivers', count: 79, icon: Layers, color: 'sky' },
            { id: 'wd', label: 'Western Disturbances (31)', count: 31, icon: Snowflake, color: 'cyan' },
            { id: 'monsoon', label: 'Monsoon Corridors (24)', count: 24, icon: CloudRain, color: 'teal' },
            { id: 'jet', label: 'Jet & Upper-Air Sectors (24)', count: 24, icon: Compass, color: 'indigo' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => {
            setActiveTypology(id);
            if (id === 'wd') router.push('/hazard-intelligence/atmospheric-systems/western-disturbances');
            if (id === 'monsoon') router.push('/hazard-intelligence/atmospheric-systems/monsoon-dynamics');
            if (id === 'jet') router.push('/hazard-intelligence/atmospheric-systems/jet-stream-circulation');
          }}
          showingCount={79}
          totalCount={79}
          entityLabel="atmospheric telemetry nodes"
          spotlightTitle="Compound Synoptic Phase-Locking in the Western Himalayas"
          spotlightSubtitle="Catastrophic Himalayan hydrometeorological disasters (2010 Ladakh/Indus, 2014 Kashmir, 2022 Karakoram) occur when upper-level Westerly Jet troughs phase-lock with lower-tropospheric Monsoon moisture."
          tabs={[
            {
              id: 'phase-lock',
              label: 'WD × Monsoon × Jet Stream Coupling',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <span className="text-xs font-bold text-sky-400 block mb-1">Winter–Spring Regime</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Westerly Wave Cryosphere Recharge</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      From November to April, the Subtropical Westerly Jet sits south of the Himalayas (~28°N–32°N), steering Mediterranean–Caspian troughs across Kashmir, Gilgit-Baltistan, and Ladakh.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Summer Monsoon Regime</span>
                    <h5 className="text-sm font-semibold text-white mb-2">850 hPa Moisture &amp; Orographic Lift</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      From June to September, Shivalik and Pir Panjal windward slopes intercept intense Arabian Sea and Bay of Bengal moisture fluxes, while episodic surges breach the Great Himalaya into Ladakh and Baltistan.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-400 block mb-1">Compound Phase-Lock</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Upper Trough + Low-Level Moisture</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      When an amplified 500 hPa westerly trough digs southward during active monsoon flow, upper-level divergence couples with warm moist air to trigger basin-scale extreme rainfall and GLOFs.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Synoptic & Mountain Weather Sentinel Network"
          observeSubtitle="Submit ground-truth observations of snowline shifts, cloudburst intensity, mountain-wave gales, and valley haze stagnation."
          observeBadge="WMO / IMD / PMD Field Protocol"
          protocols={[
            {
              number: '1',
              title: 'Rain–Snow Transition Altitude Spotting',
              desc: 'Record elevation where winter WD precipitation shifts between liquid rain and snowfall.',
              benchmark: '0°C Isotherm Ground Validation',
              icon: Snowflake,
              color: 'sky',
            },
            {
              number: '2',
              title: 'Orographic Downpour & Torrent Surge Log',
              desc: 'Document localized cloudburst downpours and rapid stream turbidity spikes on Shivalik and Pir Panjal slopes.',
              benchmark: 'Monsoon Flash-Flood Trigger Log',
              icon: Waves,
              color: 'teal',
            },
            {
              number: '3',
              title: 'Pass Gap-Wind & Ridge Plume Observation',
              desc: 'Log snow-plume banners on high peaks and severe pass gales indicating descending jet momentum.',
              benchmark: 'Upper-Tropospheric Shear Indicator',
              icon: Compass,
              color: 'indigo',
            },
            {
              number: '4',
              title: 'Glacial Meltwater & Moraine Seepage Watch',
              desc: 'Flag anomalously warm high-altitude rain events over glaciated catchments in Kashmir, Ladakh, and GB.',
              benchmark: 'Cryospheric GLOF Watch Protocol',
              icon: Droplets,
              color: 'cyan',
            },
          ]}
        />
      </div>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="atmospheric-systems" />
      </div>
    </main>
  );
}
