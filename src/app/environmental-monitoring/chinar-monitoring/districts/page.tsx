'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { DISTRICT_CHINAR_CENSUS,
  DISTRICT_CONSERVATION_SCORES,
  KashmirDistrict } from '@/data/chinar-monitoring';
import {
  Building,
  MapPin,
  Trees,
  ShieldAlert,
  Compass,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function ChinarDistrictsPage() {
  const [districtFilter, setDistrictFilter] = useState<KashmirDistrict | 'ALL'>('ALL');

  const filtered = districtFilter === 'ALL'
    ? DISTRICT_CHINAR_CENSUS
    : DISTRICT_CHINAR_CENSUS.filter(d => d.district === districtFilter);

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
          { label: 'District Profiles & Tehsil Inventories' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                DISTRICTS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              District Profiles & Tehsil Inventories
            </span>
          </>
        }
        subtitle="Granular breakdown of Chinar population density, municipal tag penetration, high-risk highway corridors, and local conservation authorities across all 10 districts."
        icon={<Building className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/census"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Valley Census</span>
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
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Select District Profile:</span>
          </div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All 10 Districts</option>
            {DISTRICT_CHINAR_CENSUS.map(d => (
              <option key={d.district} value={d.district}>{d.district}</option>
            ))}
          </select>
        </div>

        {/* 10 District Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => {
            const scoreObj = DISTRICT_CONSERVATION_SCORES.find(s => s.district === d.district);

            return (
              <Card key={d.district} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      District Headquarters: {d.headquarters}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{d.district}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-black text-emerald-400">
                      {d.totalChinar2026Est.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">2026 Census</span>
                  </div>
                </div>

                {/* DCCS Conservation Score & Data Confidence strip */}
                {scoreObj && (
                  <div className="p-3 bg-slate-950/70 rounded-[6px] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Conservation Score (DCCS)</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-base font-mono font-bold text-emerald-300">{scoreObj.overallScore} / 100</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {scoreObj.classification.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Data Confidence</span>
                      <span className="text-xs font-mono font-bold text-indigo-300">{scoreObj.dataConfidencePct}%</span>
                    </div>
                  </div>
                )}

              <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block font-medium mb-1">Notable Heritage Sites &amp; Groves:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {d.notableHeritageSites.map((site, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-[4px] bg-slate-950 border border-white/5 text-[11px] text-slate-300">
                        {site}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] block font-medium mb-1">Identified Developmental Threats:</span>
                  <ul className="space-y-0.5 text-slate-300 text-[11px]">
                    {d.primaryThreats.map((thrt, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>{thrt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Custodian: <strong className="text-slate-300">{d.censusCustodian}</strong></span>
                <span className="font-mono text-rose-400">{d.netDecadalChangePct}% net decadal delta</span>
              </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
