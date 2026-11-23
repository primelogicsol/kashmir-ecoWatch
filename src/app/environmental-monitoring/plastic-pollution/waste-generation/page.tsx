'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { DISTRICT_PLASTIC_PROFILES, REGIONAL_PLASTIC_SUMMARIES, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  Trash2,
  BarChart,
  ArrowUpDown,
  Filter,
  Info,
  Layers,
  MapPin,
  TrendingUp,
  Download
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function WasteGenerationPage() {
  const [selectedRegion, setSelectedRegion] = useState<PlasticPollutionRegion | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'plasticTPD' | 'perCapita' | 'fraction'>('plasticTPD');

  const filteredDistricts = DISTRICT_PLASTIC_PROFILES.filter((d) => {
    if (selectedRegion !== 'ALL' && d.region !== selectedRegion) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'plasticTPD') return b.plasticWasteTPD - a.plasticWasteTPD;
    if (sortBy === 'perCapita') return b.perCapitaPlasticWasteKgYr - a.perCapitaPlasticWasteKgYr;
    return b.plasticFractionPct - a.plasticFractionPct;
  });

  const totalBasinPlasticTPD = DISTRICT_PLASTIC_PROFILES.reduce((sum, d) => sum + d.plasticWasteTPD, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 02 · PLASTIC LIFECYCLE & FLOWS · WASTE GENERATION"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Municipal' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Municipal & Rural Plastic Generation Quantities
            </span>
          </>
        }
        subtitle="Per capita generation factors, daily tonnage metrics, seasonal apple harvest packaging surges, and rural vs urban generation ratios."
        icon={<Trash2 className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Basin Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Basin Plastic Waste</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">
              {totalBasinPlasticTPD.toFixed(1)} TPD
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Tonnes per day generated</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Mean Plastic Fraction</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">9.4%</div>
            <span className="text-[10px] text-slate-400 font-mono">Of municipal solid waste mass</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Highest Generation District</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">Jammu (71.5 TPD)</div>
            <span className="text-[10px] text-slate-400 font-mono">Followed by Srinagar (62.4 TPD)</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Data Transparency</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">42 Districts</div>
            <span className="text-[10px] text-slate-400 font-mono">Evidence-classified tracking</span>
          </div>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-white">Filter &amp; Sort Generation:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All 5 Regions (42 Districts)</option>
              <option value="Kashmir Valley">Kashmir Valley (10)</option>
              <option value="Jammu">Jammu (10)</option>
              <option value="Ladakh">Ladakh (2)</option>
              <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir (10)</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan (10)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="plasticTPD">Sort: Daily Plastic Waste (TPD)</option>
              <option value="perCapita">Sort: Per-Capita (kg/person/yr)</option>
              <option value="fraction">Sort: Plastic Fraction (%)</option>
            </select>
          </div>
        </div>

        {/* 42-District Waste Generation Table */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-400" />
                Empirical Plastic Waste Generation Register ({filteredDistricts.length} Districts)
              </h2>
              <p className="text-xs text-slate-400">
                Data strictly categorized by scientific evidence tier. Unmonitored districts transparently designated.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/70 font-mono text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3 text-right">Population (2026)</th>
                  <th className="py-2.5 px-3 text-right">Total MSW (TPD)</th>
                  <th className="py-2.5 px-3 text-right">Plastic (TPD)</th>
                  <th className="py-2.5 px-3 text-right">Fraction (%)</th>
                  <th className="py-2.5 px-3 text-right">Per Capita (kg/yr)</th>
                  <th className="py-2.5 px-3 text-center">Evidence Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDistricts.map((d) => (
                  <tr key={d.district} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {d.district}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                      {d.population2026Est.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                      {d.evidenceClass === 'UNAVAILABLE' ? '—' : d.totalSolidWasteTPD.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-400">
                      {d.evidenceClass === 'UNAVAILABLE' ? '—' : d.plasticWasteTPD.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-300">
                      {d.evidenceClass === 'UNAVAILABLE' ? '—' : `${d.plasticFractionPct.toFixed(1)}%`}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                      {d.evidenceClass === 'UNAVAILABLE' ? '—' : d.perCapitaPlasticWasteKgYr.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border ${
                        d.evidenceClass === 'OBSERVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : d.evidenceClass === 'OFFICIALLY_REPORTED'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : d.evidenceClass === 'MODELED'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {d.evidenceClass}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
