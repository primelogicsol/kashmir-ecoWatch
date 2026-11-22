'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { TransportSubNav } from '@/components/transportation-pollution/TransportSubNav';
import {
  DISTRICT_TRANSPORT_DATA,
  REGION_TRANSPORT_SUMMARIES,
  BASIN_TRANSPORT_TOTALS,
  TRAFFIC_POLLUTION_HOTSPOTS,
  TRANSPORT_DATA_PROVIDERS,
  SCIENTIFIC_EMISSION_FACTORS,
  COMPLETENESS_MATRIX
} from '@/data/transportation-pollution';
import {
  Car,
  BarChart3,
  FileSpreadsheet,
  Fuel,
  Compass,
  Wind,
  Gauge,
  Volume2,
  Layers,
  CloudSun,
  Droplets,
  HeartPulse,
  Bus,
  Zap,
  Flame,
  ShieldCheck,
  Radio,
  BookOpen,
  Filter,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Building,
  Activity,
  Search,
  Sliders
} from 'lucide-react';

export default function SpecializedTransportSubmodulePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · TRANSPORTATION POLLUTION · Corridors"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Traffic Pollution Hotspots & Mitigation Corridors' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                Corridors
              </span>
              <span>Traffic Pollution Hotspots & Mitigation Corridors</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="Deep-Dive Case Studies of Critical Regional Traffic Choke Points across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/environmental-monitoring/transportation-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/10 transition-all flex items-center gap-1.5"
            >
              <span>← Transport Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/transportation-pollution/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>TPBS Scores</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION ─── */}
      <TransportSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── 3. FOUR SPECIALIZED DOMAIN KPI METRICS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Critical Choke Points
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              10 Corridors
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Identified high-impact congestion bottlenecks
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Average Delay Factor
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              2.6x Normal
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Peak delay vs free-flow conditions
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Peak Hotspot PM₂.₅
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              194 µg/m³
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Pantha Chowk / Jewel Chowk readings
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Average Peak Noise
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              79.2 dB(A)
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Sustained intersection acoustic pressure
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Critical Regional Traffic Choke Points & Engineering Remediation</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Detailed diagnostic profiles for all primary congestion bottlenecks spanning Kashmir Valley, Jammu, Ladakh, AJK and Gilgit-Baltistan.
              </p>
            </div>
          </div>

          
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRAFFIC_POLLUTION_HOTSPOTS.map((h, i) => (
            <div key={i} className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    {h.region}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{h.name}</h4>
                </div>
                <span className="text-sm font-bold text-rose-400 font-mono">{h.delayIndex}x Delay</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{h.primaryPollutionSource}</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/5">
                <div>
                  <span className="text-slate-500 text-[10px] block">PEAK PM₂.₅</span>
                  <span className="text-rose-400 font-bold">{h.roadsidePm25AvgUgM3} µg/m³</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PEAK NOISE</span>
                  <span className="text-amber-400 font-bold">{h.roadsideDbA} dB(A)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <span className="text-amber-400 font-semibold">Remediation:</span> {h.recommendedIntervention}
              </div>
            </div>
          ))}
        </section>
    
        </div>
      </div>
    </div>
  );
}
