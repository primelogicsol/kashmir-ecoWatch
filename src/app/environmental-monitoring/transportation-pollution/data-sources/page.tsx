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
        label="KEW · TRANSPORTATION POLLUTION · 7 APIs"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Data Sources, Telemetry Integrations & 7 Public APIs' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                7 APIs
              </span>
              <span>Data Sources, Telemetry Integrations & 7 Public APIs</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="Institutional API Connectivity, Refresh Intervals & License Matrix across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Integrated Public APIs
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              7 Providers
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              VAHAN, FASTag, CPCB, TomTom, MoRTH
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Telemetry Sync Rate
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              Hourly / Daily
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Continuous batch and live polling
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Geocoded RTO Precision
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              100% Verified
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              All 42 district headquarters mapped
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Historical Baseline
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              2018–2026
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              8-year empirical fleet trend series
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Institutional Telemetry Architecture & API Availability Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Complete transparency ledger tracking live endpoints, institutional access licenses, update frequencies, and data latencies.
              </p>
            </div>
          </div>

          
        <section className="p-5 rounded-[8px] bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Connected Telemetry Providers &amp; Technical Integration Matrix
          </h3>
          <div className="overflow-x-auto rounded-[6px] border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">Provider System</th>
                  <th className="py-2.5 px-3">Operating Agency</th>
                  <th className="py-2.5 px-3">Jurisdiction</th>
                  <th className="py-2.5 px-3">Frequency</th>
                  <th className="py-2.5 px-3 text-center">API Status</th>
                  <th className="py-2.5 px-3">Data License</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {TRANSPORT_DATA_PROVIDERS.map((p, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white font-sans">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-sans">{p.agency}</td>
                    <td className="py-2.5 px-3 text-amber-300 font-sans">{p.jurisdiction === 'Azad Jammu & Kashmir' ? 'AJ&K' : p.jurisdiction}</td>
                    <td className="py-2.5 px-3 text-slate-300">{p.updateFrequency}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px]">{p.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
