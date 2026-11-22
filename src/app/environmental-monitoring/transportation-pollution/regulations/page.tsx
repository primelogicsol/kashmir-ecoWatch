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
        label="KEW · TRANSPORTATION POLLUTION · BS-VI"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Vehicle Emissions Standards, Regulations & Compliance' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                BS-VI
              </span>
              <span>Vehicle Emissions Standards, Regulations & Compliance</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="BS-VI vs Euro II/III/IV Norms, Automated PUC Telemetry & Age Limits across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              BS-VI Fleet Share
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              38.5%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Modern ultra-low sulfur compliance
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              BS-IV Fleet Share
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              44.2%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Intermediate national standard
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Pre-BS-IV Legacy Fleet
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              17.3%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              High emission legacy commercial vehicles
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Automated Testing Centers
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              28 ATS
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Mandatory automated fitness inspection
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Statutory Emission Standards & Compliance Inspection Framework</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Comparison of legal emission limits across Indian Motor Vehicles Act (BS-VI) and Pakistan NEQS norms applied in AJK and GB.
              </p>
            </div>
          </div>

          
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>India-Administered Jurisdictions (BS-VI Standard)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enforced across Kashmir Valley, Jammu, and Ladakh. Mandates 10 ppm ultra-low sulfur fuel, on-board diagnostics (OBD-II), diesel particulate filters (DPF), and selective catalytic reduction (SCR) reducing diesel NOx by 70% and PM by 82% compared to BS-IV.
            </p>
          </div>
          <div className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Pakistan-Administered Jurisdictions (NEQS Standard)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enforced in Azad Jammu &amp; Kashmir and Gilgit-Baltistan under NEQS 2010. Limits smoke opacity to 40% Ringelmann scale or 2.0 m⁻¹ smoke absorption coefficient for diesel vehicles, and 4.5% CO concentration for petrol engines.
            </p>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
