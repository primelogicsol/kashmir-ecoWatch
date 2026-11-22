'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { DISTRICT_PLASTIC_PROFILES, REGIONAL_PLASTIC_SUMMARIES, PlasticPollutionRegion } from '@/data/plastic-pollution';
import { MapPin, Search, Filter, ShieldAlert, Building2, CheckCircle2 } from 'lucide-react';

export default function RegionalProfilesPage() {
  const [selectedRegion, setSelectedRegion] = useState<PlasticPollutionRegion | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = DISTRICT_PLASTIC_PROFILES.filter((d) => {
    if (selectedRegion !== 'ALL' && d.region !== selectedRegion) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return d.district.toLowerCase().includes(q) || d.headquarters.toLowerCase().includes(q) || d.primaryDumpingSite.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · 01 · MONITORING & INTELLIGENCE · DISTRICT REGISTRY"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Forty-Two' }
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
              Forty-Two District Plastic Waste Profiles
            </span>
          </>
        }
        subtitle="District-by-district solid waste ledgers, daily plastic waste generation (TPD), collection deficits, and active primary dumping sites."
        icon={<MapPin className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">Filter Profiles:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="ALL">All 5 Regions ({DISTRICT_PLASTIC_PROFILES.length} Districts)</option>
              <option value="Kashmir Valley">Kashmir Valley (10 Districts)</option>
              <option value="Jammu">Jammu (10 Districts)</option>
              <option value="Ladakh">Ladakh (2 Districts)</option>
              <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir (10 Districts)</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan (10 Districts)</option>
            </select>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search district, headquarters, dumpsite..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-64"
            />
          </div>
        </div>

        {/* 42 District Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDistricts.map((d) => (
            <div key={d.district} className="bg-slate-900 border border-white/10 rounded-lg p-5 space-y-3 hover:border-rose-500/30 transition-all shadow-md">
              <div className="flex items-start justify-between border-b border-white/10 pb-2.5">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{d.district}</h3>
                  <div className="text-[11px] font-mono text-slate-400">{d.region} · HQ: {d.headquarters}</div>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border ${
                  d.evidenceClass === 'OFFICIALLY_REPORTED'
                    ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    : d.evidenceClass === 'OBSERVED'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : d.evidenceClass === 'MODELED'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border-white/10'
                }`}>
                  {d.evidenceClass}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-[6px] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Plastic Waste</span>
                  <span className="text-sm font-bold font-mono text-white">{d.plasticWasteTPD} TPD</span>
                  <span className="text-[10px] text-slate-500 block">({d.plasticFractionPct}% of MSW)</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-[6px] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Per Capita</span>
                  <span className="text-sm font-bold font-mono text-rose-300">{d.perCapitaPlasticWasteKgYr} kg/yr</span>
                  <span className="text-[10px] text-slate-500 block">Pop: {(d.population2026Est / 1000).toFixed(0)}k</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Collection Coverage:</span>
                  <strong className="font-mono text-cyan-300">{d.collectionEfficiencyPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Source Segregation:</span>
                  <strong className="font-mono text-slate-200">{d.segregationAtSourcePct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recycling Capacity:</span>
                  <strong className="font-mono text-emerald-400">{d.recyclingCapacityTPD} TPD</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unmanaged Discard:</span>
                  <strong className="font-mono text-rose-400 font-bold">{d.unmanagedDisposalTPD} TPD</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
                <span className="text-slate-500 block">Primary Disposal / Landfill Node:</span>
                <span className="text-slate-300 font-medium truncate block" title={d.primaryDumpingSite}>{d.primaryDumpingSite}</span>
                <span className="text-[9px] text-slate-500 block mt-1">Source: {d.dataSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
