'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  CHINAR_BASIN_TOTALS,
  DISTRICT_CHINAR_CENSUS,
  DISTRICT_CONSERVATION_SCORES,
  KashmirDistrict
} from '@/data/chinar-monitoring';
import {
  BarChart3,
  TrendingDown,
  Layers,
  Filter,
  Activity,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Building,
  Trees
} from 'lucide-react';

export default function ChinarDashboardsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<KashmirDistrict | 'ALL'>('ALL');

  const filteredDistricts = selectedDistrict === 'ALL'
    ? DISTRICT_CHINAR_CENSUS
    : DISTRICT_CHINAR_CENSUS.filter(d => d.district === selectedDistrict);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="01 · MONITORING & GIS INTELLIGENCE"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Chinar Population & Health Dashboards' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                ANALYTICS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
              Chinar Population & Health Dashboards
            </span>
          </>
        }
        subtitle="Multi-parametric visual analytics detailing district comparisons, health tier breakdowns, QR-tagging operational progress, and decadal mortality trends."
        icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/census"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Census Ledger</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chinar Overview Hub</span>
            </Link>
          </div>
        }
      />
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Chinar Census</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
              ~{CHINAR_BASIN_TOTALS.totalEstimatedChinars2026.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">10 Valley Districts</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">QR Aadhaar Tags</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              {((CHINAR_BASIN_TOTALS.totalQRTaggedAadhaar2026 / CHINAR_BASIN_TOTALS.totalEstimatedChinars2026) * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{CHINAR_BASIN_TOTALS.totalQRTaggedAadhaar2026.toLocaleString()} tagged</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Mean DCCS Score</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">
              64.1 <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">Moderate Concern</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Data Confidence</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">
              79.6%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Survey Fidelity</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Decadal Loss</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">
              {CHINAR_BASIN_TOTALS.netHistoricalDeclinePct}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">vs ESRO baseline</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Healthy Crown</span>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 mt-1">
              {CHINAR_BASIN_TOTALS.averageHealthyPct}%
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Vigorous canopy</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Filter District Dashboard:</span>
          </div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All 10 Districts Combined</option>
            {DISTRICT_CHINAR_CENSUS.map(d => (
              <option key={d.district} value={d.district}>{d.district}</option>
            ))}
          </select>
        </div>

        {/* District Comparative Health Breakdown */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Arboricultural Health Distribution Across Monitored Districts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDistricts.map((d) => (
              <Card key={d.district} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{d.district}</h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Census: {d.totalChinar2026Est.toLocaleString()} trees · Geotagged: {d.geotaggedCount2026.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-rose-400">
                      {d.netDecadalChangePct}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">vs 1980s</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-emerald-300 font-medium">Vigorous / Healthy:</span>
                      <span className="font-mono text-emerald-400">{d.healthyTreePct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.healthyTreePct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-amber-300 font-medium">Moderate Stress:</span>
                      <span className="font-mono text-amber-400">{d.moderateStressPct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${d.moderateStressPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-rose-400 font-medium">Trunk Cavity / Decay:</span>
                      <span className="font-mono text-rose-400">{d.decayHollowPct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${d.decayHollowPct}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Dead Stumps Logged: <strong className="text-slate-300 font-mono">{d.deadStumpCount}</strong></span>
                  <span>Heritage Groves: <strong className="text-emerald-400 font-mono">{d.heritageGrovesCount}</strong></span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
