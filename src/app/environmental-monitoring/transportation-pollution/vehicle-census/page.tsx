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
        label="KEW · TRANSPORTATION POLLUTION · VAHAN"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Vehicle Census & Fleet Intelligence (VAHAN 4.0)' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                VAHAN
              </span>
              <span>Vehicle Census & Fleet Intelligence (VAHAN 4.0)</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="Cumulative Registered Fleet vs Active Operating Vehicles across 42 Jurisdictions across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Cumulative Registered Fleet
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              3.29M
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              All-time official registrations
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Active Operating Fleet
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              2.50M
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Filtered for scrappage &amp; 15-yr decay
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Scrapped / Retired
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              ~790,000
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Non-operational or deregistrations
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Motorization Index
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              184 / 1,000
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Vehicles per 1,000 residents
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>VAHAN 4.0 Fleet Census & Survival Probability Ledger</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Official RTO telemetry calibrated against scrappage policy and survival decay functions to differentiate on-paper registrations from active tailpipe emissions.
              </p>
            </div>
          </div>

          
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400">Private Vehicle Fleet</div>
            <div className="text-2xl font-bold text-white font-mono">2.12M Vehicles</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprising personal two-wheelers, four-wheeler sedans, hatchbacks, and SUVs across all five regions.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-amber-400 font-mono">380,000 Vehicles</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-axle heavy trucks, light commercial carriers, public transport buses, and tourist maxicabs.
            </p>
          </div>
          <div className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400">Fleet Age Decay Rate</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">24.0% Inactive</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard Weibull decay model removes scrapped vehicles &gt;15 years old from active emission calculations.
            </p>
          </div>
        </section>

        <section className="p-5 rounded-[8px] bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            District-by-District VAHAN 4.0 Fleet Registry
          </h3>
          <div className="overflow-x-auto rounded-[6px] border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">RTO Code</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3 text-right">Cumulative Registered</th>
                  <th className="py-2.5 px-3 text-right">Active Fleet Est.</th>
                  <th className="py-2.5 px-3 text-right">Survival %</th>
                  <th className="py-2.5 px-3">Primary Evidence Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {DISTRICT_TRANSPORT_DATA.map((d) => {
                  const survivalPct = ((d.activeOperatingFleetEst / d.cumulativeRegisteredVehicles) * 100).toFixed(1);
                  return (
                    <tr key={d.district} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-semibold text-white">{d.district}</td>
                      <td className="py-2.5 px-3 font-mono text-amber-300">{d.rtoCode}</td>
                      <td className="py-2.5 px-3 text-slate-400">{d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-white font-bold">{d.cumulativeRegisteredVehicles.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400">{d.activeOperatingFleetEst.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-300">{survivalPct}%</td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">{d.evidenceTier.replace('_', ' ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
