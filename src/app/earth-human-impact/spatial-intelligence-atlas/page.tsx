'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Crosshair,
  Eye,
  Globe2,
  Layers,
  Map,
  Maximize2,
  Radar,
  Satellite,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { SATELLITE_OBSERVATORY_STREAMS } from '@/data/earth-human-impact';
import { cn } from '@/lib/utils';

export default function SpatialIntelligenceAtlasPage() {
  const [selectedStream, setSelectedStream] = useState<string>('stream-deforestation');

  const activeStreamData = SATELLITE_OBSERVATORY_STREAMS.find(s => s.id === selectedStream) || SATELLITE_OBSERVATORY_STREAMS[0];

  const changeHotspots = [
    { name: 'Ompora Karewa Excavation Face', district: 'Budgam', lat: '33.982°N', lon: '74.781°E', sensor: 'PlanetScope 3m', change: '84 ha sliced in past 18 months', severity: 'Critical' },
    { name: 'Hokersar Northern Embankment', district: 'Srinagar/Budgam', lat: '34.089°N', lon: '74.708°E', sensor: 'Sentinel-2 10m', change: '142 ha encroached fill & settlements', severity: 'Severe' },
    { name: 'Rambiara Riverbed Dredging Reach', district: 'Shopian/Pulwama', lat: '33.725°N', lon: '74.842°E', sensor: 'Sentinel-1 InSAR / Sonar', change: '34 km channel incision depth 3.2m', severity: 'Critical' },
    { name: 'Khrew-Khanmoh Limestone Quarry Cluster', district: 'Pulwama', lat: '34.021°N', lon: '74.965°E', sensor: 'Landsat-9 / Sentinel-2', change: '210 ha rockface blast expansion', severity: 'Severe' },
    { name: 'Zojila Tunnel Western Portal Muck Dump', district: 'Ganderbal', lat: '34.288°N', lon: '75.241°E', sensor: 'UAV / InSAR', change: '5.1M m³ unreinforced spoil terrace', severity: 'High' },
    { name: 'Dachigam Lower Buffer Orchard Creep', district: 'Srinagar', lat: '34.135°N', lon: '74.938°E', sensor: 'Sentinel-2 NDVI', change: '38 ha canopy thinning for fruit crop', severity: 'Moderate' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Interactive Geospatial Layer • Multi-Decadal Evidence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Spatial Intelligence & Land Use Change Atlas' }
        ]}
        icon={<Map className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-ATLAS
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Spatial Intelligence & Land Use Change Atlas
              </span>
            </div>
          </div>
        }
        subtitle="Kashmir EcoWatch's centralized spaceborne telemetry hub. Continuously processing optical, thermal, radar, and laser altimetry feeds to identify landscape conversions, illegal extractions, and cryogenic shifts before irreversible ecological collapse."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['spatial-intelligence-atlas'].tag}
            badge={EHII_HERO_CONFIGS['spatial-intelligence-atlas'].badge}
            items={EHII_HERO_CONFIGS['spatial-intelligence-atlas'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['spatial-intelligence-atlas'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Stream Selector Strip */}
        <section>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Radar className="w-4 h-4 text-teal-400 animate-pulse" />
            Active Satellite Feeds & Sensor Constellation:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SATELLITE_OBSERVATORY_STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStream(s.id)}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  selectedStream === s.id
                    ? 'bg-teal-500/10 border-teal-500 text-white shadow-lg shadow-teal-500/10'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900'
                )}
              >
                <div className="text-[10px] font-mono uppercase text-teal-400 truncate">{s.targetSignal}</div>
                <div className="text-xs font-bold text-white mt-1 truncate">{s.sensorConstellation.split('+')[0].trim()}</div>
                <div className="text-[10px] text-slate-500 mt-1">{s.resolutionMeters}m resolution</div>
              </button>
            ))}
          </div>
        </section>

        {/* Active Stream Technical Viewport */}
        <section className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
                Active Telemetry Pipeline: {activeStreamData.targetSignal}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{activeStreamData.sensorConstellation}</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Cadence: {activeStreamData.detectionCadence} • Ground Sample Distance: {activeStreamData.resolutionMeters}m</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs">
                <span className="text-slate-500 block text-[9px] uppercase">Alert Trigger Threshold</span>
                <span className="text-rose-400 font-bold font-mono">{activeStreamData.alertTriggerCriteria}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Automated Environmental Protocol:</h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
                {activeStreamData.actionProtocol}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Platform Action Dispatched:</h3>
              <p className="text-sm text-teal-200/90 leading-relaxed bg-teal-950/20 p-4 rounded-xl border border-teal-500/20">
                Directly connected to Kashmir EcoWatch Alert Registry and Sectoral EIA Spatial Monitoring Engine.
              </p>
            </div>
          </div>
        </section>

        {/* Change Hotspot Registry */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Active Disturbance Hotspots Detected</h3>
              <p className="text-xs text-slate-400">High-confidence automated alerts flagged across the Kashmir basin.</p>
            </div>
            <span className="text-xs font-mono text-teal-400">Live Cadastral Overlay</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {changeHotspots.map((h, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-white">{h.name}</span>
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                      h.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      h.severity === 'Severe' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    )}>
                      {h.severity}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono mb-2">
                    {h.district} • {h.lat}, {h.lon}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {h.change}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Detected by: {h.sensor}</span>
                  <span className="text-teal-400 flex items-center gap-1">
                    <Crosshair className="w-3 h-3" /> Pin Geo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
