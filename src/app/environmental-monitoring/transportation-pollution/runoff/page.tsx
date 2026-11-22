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
        label="KEW · TRANSPORTATION POLLUTION · PAHs"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Road Runoff, Stormwater & Aquatic Contamination' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PAHs
              </span>
              <span>Road Runoff, Stormwater & Aquatic Contamination</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="PAHs, Heavy Metals (Zinc/Copper) and Micro-Rubber Discharge into River Basins across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Annual Washed PAHs
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              14.2 Tonnes
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Polycyclic aromatic hydrocarbons in runoff
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Heavy Metal Leaching
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              60 Tonnes
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Zinc (42T), Copper (18T) from wear
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Impacted River Basins
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              3 Major
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Jhelum, Chenab, and Upper Indus
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Direct Lake Outfalls
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              38 Outfalls
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Dal Lake &amp; Wular shoreline culverts
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Aquatic Ecotoxicity & Roadway Drainage Analysis</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Highway stormwater flushing deposits tyre degradation compounds and motor crankcase residues directly into fragile Himalayan freshwater habitats.
              </p>
            </div>
          </div>

          
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-rose-400 font-bold">Dal Lake Shoreline Corridor</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Boulevard Road carries 28,000 vehicles/day directly adjacent to Dal Lake. Unfiltered stormwater runoff injects oil slicks and tyre wear micro-rubbers into littoral macrophyte beds.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">Jhelum River Highway Crossings</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              NH-44 bridges at Pantha Chowk, Khanabal, and Sangam discharge unretreated stormwater laden with heavy metals directly into the prime spawning gravels of Schizothorax trout.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-cyan-400 font-bold">Bioretention Mitigation Standards</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              KEW recommends vegetated bioswales and roadside hydrodynamic oil-grit separators along all mountain highway widenings to trap 85% of suspended sediment before discharge.
            </p>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
