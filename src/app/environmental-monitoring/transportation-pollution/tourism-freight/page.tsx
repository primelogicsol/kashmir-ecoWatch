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
        label="KEW · TRANSPORTATION POLLUTION · NH-44/KKH"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Tourism Influx & Heavy Freight Transport Logistics' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                NH-44/KKH
              </span>
              <span>Tourism Influx & Heavy Freight Transport Logistics</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="NH-44 Freight Corridor, KKH Transit Logistics & Seasonal Tourism Influx across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              NH-44 Heavy Trucks
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              8,500 / day
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Essential freight, fuel &amp; fruit transit
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Peak Tourist Vehicles
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              45,000 / day
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Summer influx across Gulmarg/Pahalgam/Leh
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Tunnel Bottlenecks
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              24,000 / day
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Banihal-Qazigund Navyug transit volume
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Seasonal PM₂.₅ Spike
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              +42% Surge
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              July–October apple harvest &amp; tourist peak
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>High-Altitude Freight & Tourist Corridor Pressures</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Critical trans-Himalayan supply arteries experiencing severe particulate and noise surges due to heavily loaded diesel carriers and tourist convoys.
              </p>
            </div>
          </div>

          
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-white">NH-44 Banihal–Qazigund Transit Spine</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The lifeline linking Jammu to Kashmir Valley carries multi-axle heavy trucks climbing steep 6% gradients. High-load low-gear operation causes continuous PM2.5 and black carbon emission spikes inside mountain valleys.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-white">Alpine Tourist Sanctuary Disturbance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unregulated tourist diesel taxis in Gulmarg, Pahalgam, and Pangong Tso elevate local daytime sound levels past 75 dB(A) and deposit black carbon onto adjacent glacier tongues and high-altitude meadows.
            </p>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
