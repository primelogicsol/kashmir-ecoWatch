'use client';

import React from 'react';
import Link from 'next/link';
import {
  Volume2,
  Layers,
  Compass,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { NOISE_SOURCE_SECTORS } from '@/data/noise-pollution';

export default function NoiseCommunityTourismPage() {
  const communitySector = NOISE_SOURCE_SECTORS.find((s) => s.category === 'COMMUNITY_TOURISM');

  const TOURISM_HOTSPOTS = [
    {
      destination: 'Dal Lake Boulevard & Ghats',
      district: 'Srinagar',
      region: 'Kashmir Valley',
      baselineLeq: '64.5 dB(A)',
      peakSeasonLeq: '76.5 dB(A)',
      dominantSources: 'Motorized shikaras, road traffic & commercial soundbars',
      regulatoryIssue: 'Water reflection amplifies acoustic pressure across houseboats.'
    },
    {
      destination: 'Gulmarg Gondola Base & Meadows',
      district: 'Baramulla',
      region: 'Kashmir Valley',
      baselineLeq: '46.2 dB(A)',
      peakSeasonLeq: '74.2 dB(A)',
      dominantSources: 'Snowmobile exhausts, all-terrain vehicles (ATVs) & DG sets',
      regulatoryIssue: 'Disturbs subalpine forest soundscape and musk deer habitat.'
    },
    {
      destination: 'Pahalgam Betaab Valley & Market',
      district: 'Anantnag',
      region: 'Kashmir Valley',
      baselineLeq: '48.5 dB(A)',
      peakSeasonLeq: '75.8 dB(A)',
      dominantSources: 'Campground sound systems, tourist transport & DG sets',
      regulatoryIssue: '10 PM night curfew frequently breached during Amarnath / summer surge.'
    },
    {
      destination: 'Karimabad Bazaar Tourist Strip',
      district: 'Hunza',
      region: 'Gilgit-Baltistan',
      baselineLeq: '44.0 dB(A)',
      peakSeasonLeq: '71.0 dB(A)',
      dominantSources: 'Tourist jeeps, music cafes & souvenir bazaar hubbub',
      regulatoryIssue: 'Mountain amphitheater topography causes reverberation echoes.'
    }
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
          { label: 'Community & Tourism Noise' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SOURCE SECTOR 03
              </span>
              <span>Community &amp; Tourism Noise</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Weddings, Public Address Systems, Alpine Resorts &amp; Festive Surges
            </span>
          </>
        }
        subtitle="Empirical surveillance of amplified public address systems, nocturnal wedding celebrations, seasonal tourism influxes in fragile high-altitude meadows, and lake acoustic reflection dynamics."
        icon={<Volume2 className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/infrastructure-noise"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Generator Noise</span>
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
                Peak Wedding DJ / Sound
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              98.4 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Amplified wedding banquet marquees
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Statutory night limit: 45 dB(A) in residential
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Nocturnal Curfew
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              22:00 – 06:00
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Statutory blanket ban on loudspeakers
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Supreme Court &amp; Noise Rules 2000 Rule 5(2)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Tourism Decibel Delta
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              +28 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Peak tourist season increase in Gulmarg
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              From 46.2 dB baseline to 74.2 dB peak
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Water Reflection
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              Zero Absorption
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Acoustic mirror effect across Dal Lake
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Sound travels up to 3x further over water
            </div>
          </Card>
        </div>

        {/* ── ALPINE TOURISM NOISE IMPACTS ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Eco-Fragile Zones
              </span>
              <h3 className="text-xl font-bold text-white">Tourism Hotspot Acoustic Impact Audits</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Comparing baseline off-season tranquility with peak summer / winter sports surges
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOURISM_HOTSPOTS.map((t) => (
              <Card key={t.destination} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                      {t.region}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{t.destination}</h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{t.district}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-[6px] border border-white/5">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Off-Season Baseline</span>
                    <span className="text-emerald-400 font-bold">{t.baselineLeq}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Peak Season Leq</span>
                    <span className="text-rose-400 font-bold">{t.peakSeasonLeq}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-400">
                  <div><strong className="text-slate-300">Sources:</strong> {t.dominantSources}</div>
                  <div className="text-[11px] text-amber-300/80 pt-1 border-t border-white/5">{t.regulatoryIssue}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── REGIONAL COMMUNITY NOISE SITES ─── */}
        {communitySector && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Audited Community &amp; Tourism Venues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {communitySector.keyRegionalExamples.map((ex, i) => (
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
