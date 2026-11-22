'use client';

import React from 'react';
import Link from 'next/link';
import {
  Car,
  Layers,
  Compass,
  AlertTriangle,
  Volume2,
  TrendingUp,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { NOISE_SOURCE_SECTORS } from '@/data/noise-pollution';

export default function NoiseTransportNoisePage() {
  const transportSector = NOISE_SOURCE_SECTORS.find((s) => s.category === 'TRANSPORTATION');

  const VEHICLE_ACOUSTIC_PROFILES = [
    {
      type: 'Heavy Commercial Trucks (HCV)',
      engineDb: '78–82 dB',
      tyreDb: '80–86 dB',
      totalPassBy: '84.5 dB(A)',
      hornPeak: '104–108 dB(A)',
      shareOfBurden: '48% of Transit Noise',
      notes: 'Dominates NH-44 freight corridor; exhaust engine braking on mountain slopes.'
    },
    {
      type: 'Commercial Passenger Buses',
      engineDb: '75–78 dB',
      tyreDb: '76–82 dB',
      totalPassBy: '80.2 dB(A)',
      hornPeak: '102–106 dB(A)',
      shareOfBurden: '22% of Transit Noise',
      notes: 'Frequent stop-and-go acceleration, compressed air brake release.'
    },
    {
      type: 'Private Cars & SUVs (4W)',
      engineDb: '62–66 dB',
      tyreDb: '68–74 dB',
      totalPassBy: '71.4 dB(A)',
      hornPeak: '94–98 dB(A)',
      shareOfBurden: '18% of Transit Noise',
      notes: 'Tyre rolling sound dominates above 45 km/h over engine combustion.'
    },
    {
      type: 'Motorcycles & Two-Wheelers (2W)',
      engineDb: '74–82 dB',
      tyreDb: '62–68 dB',
      totalPassBy: '76.8 dB(A)',
      hornPeak: '96–100 dB(A)',
      shareOfBurden: '11% of Transit Noise',
      notes: 'High high-frequency exhaust noise; modified unbaffled silencers.'
    },
    {
      type: 'Electric Smart City Buses (EV)',
      engineDb: '52–56 dB',
      tyreDb: '64–70 dB',
      totalPassBy: '66.2 dB(A)',
      hornPeak: '92–94 dB(A)',
      shareOfBurden: '<1% (Clean Mobility)',
      notes: 'Zero combustion rumble; eliminates low-frequency urban throb.'
    }
  ];

  const PAVEMENT_ACOUSTICS = [
    { surface: 'Porous Elastic Asphalt (PERS)', reduction: '-4.5 to -6.0 dB', durability: 'Specialist', alpineSuitability: 'Moderate (Frost freeze-thaw caution)' },
    { surface: 'Stone Mastic Asphalt (SMA 8/11)', reduction: '-2.5 to -3.5 dB', durability: 'High', alpineSuitability: 'High (Standard highway recommendation)' },
    { surface: 'Dense Bituminous Concrete (Standard)', reduction: '0 dB (Reference Baseline)', durability: 'Standard', alpineSuitability: 'High' },
    { surface: 'Interlocking Concrete Paver Blocks', reduction: '+3.5 to +5.0 dB', durability: 'Moderate', alpineSuitability: 'High tyre vibration; noisy' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION B · NOISE SOURCES"
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
          { label: 'Transportation Noise' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SOURCE SECTOR 01
              </span>
              <span>Transportation Noise</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Road Traffic, Tyre Friction, Horns &amp; Aviation Sound Cones
            </span>
          </>
        }
        subtitle="Empirical vehicle class emission models, tyre-pavement acoustic friction, pneumatic horn event rates, and high-intensity freight highway noise propagation across Western Himalayan transport arteries."
        icon={<Car className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/industrial-construction"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Industrial Noise</span>
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
                Peak Horn Shock
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              108 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Dual-tone pneumatic air horn
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Legal limit: 93 dB(A) at 2m (CMVR Rule 119)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Freight Pass-by Level
              </span>
              <Car className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              84.5 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Multi-axle truck at 50 km/h
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Tyre rolling sound + engine combustion
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Horn Blowing Frequency
              </span>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-orange-400">
              310 <span className="text-sm font-normal text-slate-400">events/hr</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Jammu Wave Mall &amp; Batamaloo intersections
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Average 1 horn every 11.6 seconds
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Electric Fleet Influx
              </span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              -14 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Noise reduction of E-buses vs Diesel
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Smart City E-bus deployment in SXR &amp; JMU
            </div>
          </Card>
        </div>

        {/* ── VEHICLE CLASS ACOUSTIC EMISSION TABLE ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Fleet Breakdown
              </span>
              <h3 className="text-xl font-bold text-white">Vehicle Class Sound Emission Profiles</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Calibrated pass-by measurements under ISO 362 acoustic test standards
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Vehicle Category</th>
                  <th className="py-3 px-3 text-right">Engine Noise</th>
                  <th className="py-3 px-3 text-right">Tyre-Road Noise</th>
                  <th className="py-3 px-4 text-right">Total Pass-By Level</th>
                  <th className="py-3 px-3 text-right">Horn Peak</th>
                  <th className="py-3 px-3 text-center">Share of Noise Burden</th>
                  <th className="py-3 px-4">Acoustic Characteristics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {VEHICLE_ACOUSTIC_PROFILES.map((v) => (
                  <tr key={v.type} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{v.type}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{v.engineDb}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{v.tyreDb}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-amber-400 text-sm">{v.totalPassBy}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-rose-400">{v.hornPeak}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        {v.shareOfBurden}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{v.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ROAD PAVEMENT SURFACE NOISE FACTORS ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Infrastructure Engineering
              </span>
              <h3 className="text-xl font-bold text-white">Pavement Surface Tyre-Friction Acoustic Multipliers</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Evaluated for Western Himalayan winter climate and freeze-thaw cycles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAVEMENT_ACOUSTICS.map((p) => (
              <Card key={p.surface} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <h4 className="text-sm font-bold text-white">{p.surface}</h4>
                <div className="p-2.5 rounded-[6px] bg-slate-950 border border-white/5">
                  <div className="text-[10px] uppercase font-mono text-slate-500">Noise Delta</div>
                  <div
                    className={`text-lg font-black font-mono ${
                      p.reduction.startsWith('-') ? 'text-emerald-400' : p.reduction.startsWith('+') ? 'text-rose-400' : 'text-slate-300'
                    }`}
                  >
                    {p.reduction}
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Durability:</span>
                    <span className="text-white font-medium">{p.durability}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
                    {p.alpineSuitability}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── REGIONAL TRANSPORT NOISE SITES ─── */}
        {transportSector && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Audited High-Intensity Regional Transit Nodes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {transportSector.keyRegionalExamples.map((ex, i) => (
                <Card key={i} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-mono text-[10px] font-bold uppercase">{ex.region}</span>
                    <span className="text-slate-400">{ex.district}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{ex.location}</h4>
                  <div className="flex items-center justify-between p-2 rounded-[6px] bg-slate-950 border border-white/5">
                    <span className="text-xs text-slate-400">Measured Peak Leq:</span>
                    <span className="text-base font-bold font-mono text-rose-400">{ex.peakLeqDb} dB(A)</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ex.mitigationStatus}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
