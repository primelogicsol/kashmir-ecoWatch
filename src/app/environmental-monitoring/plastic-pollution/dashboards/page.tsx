'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import {
  HISTORICAL_PLASTIC_TRENDS,
  REGIONAL_PLASTIC_SUMMARIES,
  DISTRICT_PLASTIC_PROFILES,
  PlasticPollutionRegion
} from '@/data/plastic-pollution';
import {
  BarChart3,
  TrendingUp,
  Layers,
  ArrowRight,
  Filter,
  ShieldAlert,
  Info,
  Calendar,
  PieChart,
  Activity
} from 'lucide-react';

export default function PlasticDashboardsPage() {
  const [selectedRegion, setSelectedRegion] = useState<PlasticPollutionRegion | 'ALL'>('ALL');
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const filteredTrends = HISTORICAL_PLASTIC_TRENDS.filter((t) => {
    if (selectedRegion !== 'ALL' && t.region !== selectedRegion) return false;
    return true;
  });

  const years = [2006, 2010, 2014, 2018, 2022, 2026];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 01 · MONITORING & INTELLIGENCE · ANALYTICS SUITE"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Macro' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-rose-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PLASTIC INTELLIGENCE
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Macro Analytics & Multi-Decadal Flow Trends
            </span>
          </>
        }
        subtitle="Cross-district comparative time-series, polymer fraction trends, municipal collection disparities, and high-altitude seasonal tourist influx spikes."
        icon={<BarChart3 className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-white">Filter Dashboard Slices:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="ALL">All 5 Regions Combined</option>
              <option value="Kashmir Valley">Kashmir Valley</option>
              <option value="Jammu">Jammu</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>
          </div>
        </div>

        {/* Historical Progression Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              <span>Historical Decadal Trajectory (2006–2026)</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              Source: CPCB, State Pollution Control Committees, World Bank &amp; KEW MFA
            </span>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-lg bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Region</th>
                  <th className="p-3">Plastic Waste (TPD)</th>
                  <th className="p-3">Per Capita (kg/yr)</th>
                  <th className="p-3">Collection Rate %</th>
                  <th className="p-3">Recycling Rate %</th>
                  <th className="p-3">Unmanaged Leakage (TPD)</th>
                  <th className="p-3">Evidence Class</th>
                  <th className="p-3">Source Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredTrends.map((t, idx) => (
                  <tr key={`${t.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : t.region}-${t.year}-${idx}`} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-rose-300">{t.year}</td>
                    <td className="p-3 text-white font-sans">{t.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : t.region}</td>
                    <td className="p-3 text-white font-bold">{t.totalPlasticWasteTPD}</td>
                    <td className="p-3 text-slate-300">{t.perCapitaKgYr}</td>
                    <td className="p-3 text-cyan-300">{t.collectionRatePct}%</td>
                    <td className="p-3 text-emerald-300">{t.recyclingRatePct}%</td>
                    <td className="p-3 text-rose-400 font-bold">{t.openDumpingLeakageTPD}</td>
                    <td className="p-3">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-[4px] bg-white/5 border border-white/10 text-slate-400">
                        {t.evidenceClass}
                      </span>
                    </td>
                    <td className="p-3 text-[10px] font-sans text-slate-500 truncate max-w-[200px]" title={t.sourceAuthority}>
                      {t.sourceAuthority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regional Comparison Grid */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Five-Region Comparative Synthesis (2026 Projected Baseline)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {REGIONAL_PLASTIC_SUMMARIES.map((r) => (
              <div key={r.region} className="bg-slate-900 border border-white/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-white truncate">{r.region}</h3>
                  <span className="text-[9px] font-mono px-1 rounded bg-white/5 text-slate-400">{r.districtsCount} Dist</span>
                </div>
                <div className="text-xl font-bold font-mono text-rose-300">
                  {r.totalPlasticWasteTPD} <span className="text-[10px] font-normal text-slate-400">TPD</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-400 border-t border-white/5 pt-2">
                  <div className="flex justify-between">
                    <span>Per Capita:</span>
                    <strong className="text-slate-200 font-mono">{r.avgPerCapitaKgYr} kg/yr</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Collection:</span>
                    <strong className="text-cyan-300 font-mono">{r.overallCollectionPct}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Unmanaged:</span>
                    <strong className="text-rose-400 font-mono">{r.totalUnmanagedLeakageTPD} TPD</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Readiness:</span>
                    <strong className={r.dataReadinessLevel === 'High' ? 'text-emerald-400' : 'text-amber-400'}>{r.dataReadinessLevel}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
