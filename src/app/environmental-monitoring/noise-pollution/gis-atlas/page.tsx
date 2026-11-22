'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Layers,
  MapPin,
  Volume2,
  VolumeX,
  Radio,
  Car,
  Factory,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import {
  NOISE_MONITORING_STATIONS,
  SENSITIVE_RECEPTORS,
  WILDLIFE_ACOUSTIC_ZONES
} from '@/data/noise-pollution';

export default function NoiseGisAtlasPage() {
  const [activeLayer, setActiveLayer] = useState<string>('ALL');

  const HIGHWAY_CORRIDORS = [
    {
      name: 'NH-44 Batamaloo - Jahangir Chowk Axis',
      region: 'Kashmir Valley',
      dayDb: 74.2,
      nightDb: 56.4,
      peakEvents: '280 horns/hr',
      buffer: '50m dense urban',
      inversionRisk: 'Severe (Winter)',
      status: 'Critical Exceedance'
    },
    {
      name: 'NH-44 Bypass / Wave Mall Junction',
      region: 'Jammu',
      dayDb: 76.5,
      nightDb: 62.1,
      peakEvents: '310 horns/hr',
      buffer: '75m commercial',
      inversionRisk: 'Moderate',
      status: 'Critical Exceedance'
    },
    {
      name: 'Karakoram Highway (KKH) Chinar Bagh',
      region: 'Gilgit-Baltistan',
      dayDb: 68.2,
      nightDb: 51.5,
      peakEvents: '140 horns/hr',
      buffer: '100m gorge canyon',
      inversionRisk: 'High (Mountain Echo)',
      status: 'Moderate Exceedance'
    },
    {
      name: 'Leh Main Bazaar - Airport Transect',
      region: 'Ladakh',
      dayDb: 63.5,
      nightDb: 44.8,
      peakEvents: '65 horns/hr',
      buffer: '30m high altitude',
      inversionRisk: 'Low',
      status: 'Controlled'
    },
    {
      name: 'Muzaffarabad Domel River Confluence',
      region: 'Azad Jammu & Kashmir',
      dayDb: 71.8,
      nightDb: 54.2,
      peakEvents: '190 horns/hr',
      buffer: '50m valley wall',
      inversionRisk: 'Severe (River Gorge)',
      status: 'High Concern'
    },
    {
      name: 'Sopore Fruit Mandi Bund - NH-1A',
      region: 'Kashmir Valley',
      dayDb: 72.4,
      nightDb: 53.8,
      peakEvents: '220 horns/hr',
      buffer: '60m agricultural',
      inversionRisk: 'High',
      status: 'High Concern'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION A · MONITORING & GEOGRAPHIC INTELLIGENCE"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution' },
          { label: 'Noise GIS Atlas' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SPATIAL ACOUSTICS
              </span>
              <span>Noise GIS Atlas</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Georeferenced Acoustic Terrain
            </span>
          </>
        }
        subtitle="Geospatial mapping of acoustic propagation contours, 100m statutory silence zone buffers, high-intensity transit corridors, and calibrated continuous monitoring station coordinates across 42 Western Himalayan districts."
        icon={<Compass className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/monitoring-stations"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Monitoring Stations</span>
            </Link>
          </div>
        }
      />

      <NoisePollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 4 KPI CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Mapped Receptors
              </span>
              <VolumeX className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              340 <span className="text-sm font-normal text-slate-400">Sites</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Hospitals, colleges &amp; courts in GIS
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              31 officially notified silence zones
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Transit Corridors
              </span>
              <Car className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              1,280 <span className="text-sm font-normal text-slate-400">km</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Arterial highways with acoustic buffers
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              NH-44, NH-1A, KKH &amp; Mughal Road
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Georeferenced Stations
              </span>
              <Radio className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              {NOISE_MONITORING_STATIONS.length} <span className="text-sm font-normal text-slate-400">Points</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              WGS-84 precision coordinate registry
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              11 Continuous + 11 Periodic Nodes
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Bioacoustic Sanctuaries
              </span>
              <ShieldCheck className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              {WILDLIFE_ACOUSTIC_ZONES.length} <span className="text-sm font-normal text-slate-400">Habitats</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              High-value wildlife soundscapes mapped
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Dachigam, Hemis, Hokersar &amp; Khunjerab
            </div>
          </Card>
        </div>

        {/* ── INTERACTIVE GIS SPATIAL LAYERS CONTROLLER ─── */}
        <div className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Spatial Layer Controller
              </span>
              <h3 className="text-lg font-bold text-white">Geospatial Acoustic Layers</h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {['ALL', 'STATIONS', 'SILENCE_BUFFERS', 'CORRIDORS', 'SANCTUARIES'].map((lyr) => (
                <button
                  key={lyr}
                  onClick={() => setActiveLayer(lyr)}
                  className={`px-3 py-1 rounded-[6px] text-xs font-mono transition-all ${
                    activeLayer === lyr
                      ? 'bg-amber-600 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {lyr}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-[8px] bg-slate-950 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
            <Compass className="w-12 h-12 text-amber-400/40 animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">GIS Vector Overlay: {activeLayer} Layer Active</h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Rendering CNOSSOS-EU acoustic propagation models calibrated for Western Himalayan topography.
                Terrain includes steep valley wall reflections, atmospheric sound refraction during winter temperature inversions,
                and 100m radial buffers around sensitive public receptors.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> &gt;75 dB(A) Critical Red
              </span>
              <span className="inline-flex items-center gap-1.5 text-orange-300">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> 65–75 dB(A) Commercial Orange
              </span>
              <span className="inline-flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> &lt;50 dB(A) Silence Blue
              </span>
            </div>
          </div>
        </div>

        {/* ── HIGHWAY CORRIDORS ACOUSTIC TRANSECTS ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Arterial Propagation
              </span>
              <h3 className="text-xl font-bold text-white">Critical Highway Acoustic Transects</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Calibrated field measurements along high-density transport spines
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Highway Corridor</th>
                  <th className="py-3 px-3">Region</th>
                  <th className="py-3 px-3 text-right">Day LAeq</th>
                  <th className="py-3 px-3 text-right">Night LAeq</th>
                  <th className="py-3 px-3 text-center">Peak Horn Frequency</th>
                  <th className="py-3 px-3">Impact Buffer</th>
                  <th className="py-3 px-3">Inversion Trapping</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {HIGHWAY_CORRIDORS.map((c) => (
                  <tr key={c.name} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{c.name}</td>
                    <td className="py-3 px-3 text-slate-400">{c.region}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">{c.dayDb} dB</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{c.nightDb} dB</td>
                    <td className="py-3 px-3 text-center font-mono text-orange-400">{c.peakEvents}</td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{c.buffer}</td>
                    <td className="py-3 px-3 text-slate-400">{c.inversionRisk}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase ${
                          c.status === 'Critical Exceedance'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : c.status === 'High Concern'
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── GEOREFERENCED SENSITIVE RECEPTORS MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Statutory Silence Registry
              </span>
              <h3 className="text-xl font-bold text-white">Georeferenced High-Priority Sensitive Receptors</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Audited against 100m radial silence zone statutory limit (50 dB Day / 40 dB Night)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SENSITIVE_RECEPTORS.slice(0, 6).map((r) => (
              <Card key={r.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase font-bold">
                      {r.category.replace(/_/g, ' ')}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{r.name}</h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{r.district}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-[6px] border border-white/5">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Silence Buffer / Distance</span>
                    <span className="text-amber-400 font-bold">{r.distanceToArterialMeters ?? r.statutoryBufferMeters}m</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Day Leq Measured</span>
                    <span className="text-rose-400 font-bold">{r.measuredDayLeq !== undefined ? `${r.measuredDayLeq} dB(A)` : 'Unmonitored'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Statutory 50 dB Limit:</span>
                  <span
                    className={`font-mono font-bold ${
                      (r.statutoryViolation ?? ((r.measuredDayLeq ?? 0) > 50)) ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {(r.statutoryViolation ?? ((r.measuredDayLeq ?? 0) > 50)) && r.measuredDayLeq !== undefined
                      ? `+${(r.measuredDayLeq - 50).toFixed(1)} dB Exceedance`
                      : 'Compliant / Baseline'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
