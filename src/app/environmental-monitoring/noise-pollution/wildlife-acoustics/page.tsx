'use client';

import React from 'react';
import Link from 'next/link';
import {
  PawPrint,
  Layers,
  Compass,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  TreePine,
  Volume2,
  Activity
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { WILDLIFE_ACOUSTIC_ZONES, WildlifeAcousticZone } from '@/data/noise-pollution';

export default function NoiseWildlifeAcousticsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION C · EXPOSURE & ECOLOGICAL IMPACTS"
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
          { label: 'Wildlife & Acoustic Ecology' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                EXPOSURE SECTOR 03
              </span>
              <span>Wildlife &amp; Bioacoustics</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Fauna Soundscapes, Acoustic Masking &amp; Protected Sanctuaries
            </span>
          </>
        }
        subtitle="Bioacoustic monitoring across critical Western Himalayan protected areas. Auditing acoustic masking of Hangul rutting calls in Dachigam, Snow Leopard acoustic hunting corridors in Hemis, and waterfowl flight disturbance in Hokersar Ramsar wetland."
        icon={<PawPrint className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/hotspots"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Acoustic Hotspots</span>
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
                Audited Sanctuaries
              </span>
              <TreePine className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              {WILDLIFE_ACOUSTIC_ZONES.length} <span className="text-sm font-normal text-slate-400">Sanctuaries</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              National parks &amp; Ramsar sites
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Dachigam, Hemis, Hokersar &amp; Khunjerab
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Hangul Roar Frequency
              </span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              125–500 <span className="text-sm font-normal text-slate-400">Hz</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Kashmir Stag rutting vocalization
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Directly overlapped by diesel truck rumble
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Hokersar Wetland Noise
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              56.4 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Measured Leq from NH-1A corridor
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              18.4 dB above natural background (38 dB)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Fauna Tolerance Limit
              </span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              &lt; 40 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Recommended maximum buffer sound
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              IUCN &amp; Wildlife Institute of India criteria
            </div>
          </Card>
        </div>

        {/* ── BIOACOUSTIC SANCTUARIES DETAILED CARDS ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Ecosystem Soundscapes
              </span>
              <h3 className="text-xl font-bold text-white">Audited Wildlife Sanctuaries &amp; Bioacoustic Threat Profiles</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Empirical comparisons of natural baseline vs current measured anthropogenic decibels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WILDLIFE_ACOUSTIC_ZONES.map((zone) => (
              <Card key={zone.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase font-bold">
                      {zone.ecologicalSensitivity} Sensitivity
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{zone.name}</h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{zone.district}</span>
                </div>

                <div className="text-xs text-slate-300">
                  <strong className="text-slate-400 font-mono">Target Species:</strong> {zone.targetSpecies.join(', ')}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-[6px] border border-white/5 text-center">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Natural Baseline</span>
                    <span className="text-emerald-400 font-bold">{zone.naturalBackgroundLeqDb} dB</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Current Measured</span>
                    <span className="text-rose-400 font-bold">{zone.currentMeasuredLeqDb} dB</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Recommended Max</span>
                    <span className="text-cyan-400 font-bold">{zone.recommendedMaxLeqDb} dB</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <div>
                    <strong className="text-slate-300">Anthropogenic Noise Sources:</strong> {zone.anthropogenicSources.join(' · ')}
                  </div>
                  <div className="text-[11px] text-amber-300/80 pt-1.5 border-t border-white/5 leading-relaxed">
                    <strong>Biological Impact:</strong> {zone.biologicalImpactRisk}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
