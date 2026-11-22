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
        label="KEW · TRANSPORTATION POLLUTION · COPERT"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Research Methodology, COPERT Algorithms & Open Data' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                COPERT
              </span>
              <span>Research Methodology, COPERT Algorithms & Open Data</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="COPERT Tier 3 Speed Modeling Equations, VKT Estimations & Open GeoJSON/CSV across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Modeling Standard
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              EEA COPERT Tier 3
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Speed-dependent emission factors
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              VKT Precision
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              ±4.2% Margin
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Odometer audits &amp; FASTag validation
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Uncertainty Interval
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              95% CI
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Monte Carlo bootstrap simulation
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Open Data Formats
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              GeoJSON / CSV
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Public domain CC-BY-4.0 licensing
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>COPERT Tier 3 Mathematical Modeling Formulation</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Algorithmic framework calculating emission totals based on vehicular activity (VKT), base emission factors, and average trip velocity.
              </p>
            </div>
          </div>

          
        <section className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Mathematical Emission Formulation</span>
          </div>
          <div className="p-4 rounded-[6px] bg-slate-950 font-mono text-xs text-amber-300 border border-white/10 overflow-x-auto space-y-2">
            <div>Total_Emissions(j) = ∑ [ Active_Fleet(c, f, n) · Annual_VKT(c) · EF_hot(c, f, n, V, j) ] + E_cold(j)</div>
            <div className="text-[11px] text-slate-400 font-sans">
              Where c = vehicle class, f = fuel type, n = emission norm, V = average corridor velocity, and E_cold = high-altitude cold start correction penalty.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-[6px] bg-slate-950 border border-white/5 space-y-1">
              <span className="font-bold text-white text-xs">High-Altitude Cold Start Penalty (E_cold)</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sub-zero winter ambient temperatures in Kashmir and Ladakh increase cold-start particulate emissions by 3.2x for the first 4.5 km of driving due to catalyst thermal lag.
              </p>
            </div>
            <div className="p-3.5 rounded-[6px] bg-slate-950 border border-white/5 space-y-1">
              <span className="font-bold text-white text-xs">Gradient Load Multiplier</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mountain highway climbs exceeding 4% slope (e.g. Banihal ascent, Zojila descent) apply a 1.45x fuel enrichment multiplier to COPERT Tier 3 base emission factors.
              </p>
            </div>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
