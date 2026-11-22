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
        label="KEW · TRANSPORTATION POLLUTION · TPBS"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'TPBS Dashboards & District Scores' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                TPBS
              </span>
              <span>TPBS Dashboards & District Scores</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="Transport Pollution Burden Score (TPBS · 0–100) Multi-Regional Analytics across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Basin Mean TPBS
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              52.4 / 100
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Composite pollution burden
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Critical Burden Districts
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              6 Districts
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              TPBS &gt; 70 (Urgent intervention)
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              High Exceedance Corridors
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              14 Corridors
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Exceeding NAAQS & CPCB limits
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Top Burden Hotspot
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              Jammu (92)
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Srinagar (84), Ramban (72)
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>TPBS Scoring Formulation & Regional Breakdown</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Calculated from Traffic Volume (30%), Fleet Age & Diesel Share (25%), Exhaust PM/NOx Load (20%), Roadside Noise (15%), and Sensitive Receptors Vulnerability (10%).
              </p>
            </div>
          </div>

          
        <section className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono uppercase">
            <Sliders className="w-4 h-4" />
            <span>TPBS Multi-Factor Scoring Methodology</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3 rounded-[6px] bg-slate-950 border border-white/5">
              <div className="text-xs text-slate-400">Traffic Volume (VKT)</div>
              <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">30% Weight</div>
              <p className="text-[11px] text-slate-500 mt-1">Daily vehicle-km travelled and congestion</p>
            </div>
            <div className="p-3 rounded-[6px] bg-slate-950 border border-white/5">
              <div className="text-xs text-slate-400">Diesel Fleet Share</div>
              <div className="text-lg font-bold text-orange-400 font-mono mt-0.5">25% Weight</div>
              <p className="text-[11px] text-slate-500 mt-1">Heavy commercial and pre-BS4 diesel vehicles</p>
            </div>
            <div className="p-3 rounded-[6px] bg-slate-950 border border-white/5">
              <div className="text-xs text-slate-400">Exhaust PM &amp; NOx</div>
              <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">20% Weight</div>
              <p className="text-[11px] text-slate-500 mt-1">COPERT Tier 3 annual pollutant load</p>
            </div>
            <div className="p-3 rounded-[6px] bg-slate-950 border border-white/5">
              <div className="text-xs text-slate-400">Roadside Noise</div>
              <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">15% Weight</div>
              <p className="text-[11px] text-slate-500 mt-1">Day/Night LAeq and horn frequency</p>
            </div>
            <div className="p-3 rounded-[6px] bg-slate-950 border border-white/5">
              <div className="text-xs text-slate-400">Receptor Exposure</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">10% Weight</div>
              <p className="text-[11px] text-slate-500 mt-1">Hospitals, schools, and residences in 50m</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { region: 'Jammu', avgTpbs: 61.2, top: 'Jammu (92)', color: 'text-rose-400' },
            { region: 'Kashmir Valley', avgTpbs: 56.4, top: 'Srinagar (84)', color: 'text-amber-400' },
            { region: 'Ladakh', avgTpbs: 50.0, top: 'Leh (54)', color: 'text-cyan-400' },
            { region: 'Azad Jammu & Kashmir', avgTpbs: 45.1, top: 'Muzaffarabad (67)', color: 'text-orange-400' },
            { region: 'Gilgit-Baltistan', avgTpbs: 41.0, top: 'Gilgit (63)', color: 'text-emerald-400' }
          ].map((r) => (
            <div key={r.region} className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">{r.region}</span>
              <div className={`text-2xl font-bold font-mono ${r.color}`}>{r.avgTpbs} <span className="text-xs text-slate-500">avg</span></div>
              <div className="text-[11px] text-slate-400">Max: {r.top}</div>
            </div>
          ))}
        </section>

        <section className="p-5 rounded-[8px] bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            42-District TPBS Rankings &amp; Vulnerability Matrix
          </h3>
          <div className="overflow-x-auto rounded-[6px] border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3 text-right">TPBS Burden</th>
                  <th className="py-2.5 px-3 text-right">Exhaust PM₂.₅</th>
                  <th className="py-2.5 px-3 text-right">Day Noise</th>
                  <th className="py-2.5 px-3">Primary Highway Corridor</th>
                  <th className="py-2.5 px-3 text-center">Fidelity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {DISTRICT_TRANSPORT_DATA.slice().sort((a, b) => b.tpbsScore - a.tpbsScore).map((d) => (
                  <tr key={d.district} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white font-sans">{d.district}</td>
                    <td className="py-2.5 px-3 text-slate-400">{d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">{d.tpbsScore} / 100</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-400">{d.emissions.pm25} T/yr</td>
                    <td className="py-2.5 px-3 text-right font-mono text-cyan-300">{d.noise.dayLaeqDbA} dB(A)</td>
                    <td className="py-2.5 px-3 text-slate-300 truncate max-w-xs">{d.primaryCorridor}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-[10px] text-emerald-400">{d.dataConfidencePct}%</td>
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
