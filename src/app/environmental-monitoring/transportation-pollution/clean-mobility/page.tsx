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
        label="KEW · TRANSPORTATION POLLUTION · EV Transition"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Clean Mobility, EV Transition & Fleet Decarbonization' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                EV Transition
              </span>
              <span>Clean Mobility, EV Transition & Fleet Decarbonization</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="E-Bus Deployment, Public Charging Networks & 15-Year Scrappage Policy across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Fleet EV Penetration
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              1.8%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Nascent but accelerating transition
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Active Electric Buses
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              200 E-Buses
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              100 Srinagar Smart City + 100 Jammu
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Public Fast Chargers
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              48 Stations
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Operational CCS2 charging points
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Commercial Scrapped
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              18,500 Veh
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Mandatory &gt;15-yr commercial vehicle retirement
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Zero-Emission Transition Milestones & Infrastructure</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Progress tracking on municipal e-bus operations, public fast-charging corridors, and fiscal incentives under FAME-II and state EV policies.
              </p>
            </div>
          </div>

          
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-emerald-400 font-bold">Srinagar Smart City E-Bus Fleet</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              100 zero-emission 9-meter and 12-meter electric air-conditioned buses operating on 14 routes have avoided an estimated 2,400 tonnes of urban tailpipe CO2 in their first 18 months of operation.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-cyan-400 font-bold">Green Highway Fast-Charging Corridor</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              DC fast chargers installed at Lakhanpur, Jammu, Udhampur, Ramban, Banihal, and Qazigund along NH-44 enable inter-city electric vehicle transit across the Pir Panjal range.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">15-Year Fleet Scrappage Enforcement</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated vehicle fitness testing centers (ATS) in Jammu and Srinagar enforce mandatory retirement of commercial vehicles exceeding 15 years, targeting the highest-emitting 6% of the fleet.
            </p>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
