'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  CHINAR_BASIN_TOTALS,
  DISTRICT_CHINAR_CENSUS
} from '@/data/chinar-monitoring';
import {
  FileSpreadsheet,
  AlertTriangle,
  ShieldCheck,
  Building,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Trees
} from 'lucide-react';

export default function ChinarCensusPage() {
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
          { label: '2026 Valley Chinar Census & Ledger' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                2026 CENSUS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              2026 Valley Chinar Census & Ledger
            </span>
          </>
        }
        subtitle="Official district-level census figures, JKFRI geotagged survey aggregates, QR Aadhaar status, and historical decadal reconciliation across 10 Kashmir Valley districts."
        icon={<FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/districts"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>District Profiles</span>
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
        {/* Core Census Comparison Banner */}
        <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">The 2026 Census Reality: ~30,270 Trees Recorded vs ~41,950 Historical Baseline</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
            In the 1970s and 1980s, the Environment and Sericulture Research Organization (ESRO) and J&amp;K Forest Department estimated over 42,000 mature Chinars across the Kashmir Valley. The 2025-2026 JKFRI Digital Tree Aadhaar enumeration reveals a net decadal contraction of <strong>-27.8%</strong>, driven by road widening (NH-44 and rural arteries), civil excavation, urban commercial paving, and natural senescence.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-[4px] bg-slate-950 border border-white/10 text-emerald-300">
              2026 Total: ~30,270 Trees
            </span>
            <span className="px-2.5 py-1 rounded-[4px] bg-slate-950 border border-white/10 text-amber-300">
              Geotagged: ~24,640 (81.4%)
            </span>
            <span className="px-2.5 py-1 rounded-[4px] bg-slate-950 border border-white/10 text-indigo-300">
              QR Aadhaar Tagged: ~8,800 (29.1%)
            </span>
            <span className="px-2.5 py-1 rounded-[4px] bg-slate-950 border border-white/10 text-rose-300">
              Historical Deficit: -11,680 Trees
            </span>
          </div>
        </div>

        {/* 10-District Master Table */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              Kashmir Valley 10-District Census &amp; Data Availability Ledger
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Survey Year: 2025-2026</span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/70 font-mono text-slate-400 text-[11px]">
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3 text-right">2026 JKFRI Total</th>
                  <th className="py-3 px-3 text-right">Geotagged Points</th>
                  <th className="py-3 px-3 text-right">QR Aadhaar Plates</th>
                  <th className="py-3 px-3 text-right">1980s Baseline</th>
                  <th className="py-3 px-3 text-right">Net Change (%)</th>
                  <th className="py-3 px-3 text-right">Healthy (%)</th>
                  <th className="py-3 px-3 text-left">Primary Custodian</th>
                  <th className="py-3 px-3 text-center">Data Acquisition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DISTRICT_CHINAR_CENSUS.map((d) => (
                  <tr key={d.district} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">
                      {d.district}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      {d.totalChinar2026Est.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {d.geotaggedCount2026.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-amber-300">
                      {d.qrTaggedCount2026.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      {d.historicalESROCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-rose-400">
                      {d.netDecadalChangePct}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-300">
                      {d.healthyTreePct}%
                    </td>
                    <td className="py-3 px-3 text-slate-300 text-[11px]">
                      {d.censusCustodian}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40 whitespace-nowrap">
                        Summary Released
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="block md:hidden divide-y divide-white/5">
            {DISTRICT_CHINAR_CENSUS.map((d) => (
              <div key={d.district} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{d.district}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Summary Released
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950/60 p-2 rounded-[4px] border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-mono">2026 JKFRI Count</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {d.totalChinar2026Est.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-[4px] border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-mono">QR Tagged</span>
                    <span className="text-sm font-bold font-mono text-amber-300">
                      {d.qrTaggedCount2026.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                  <div className="flex justify-between">
                    <span>Geotagged Points:</span>
                    <span className="text-slate-200">{d.geotaggedCount2026.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESRO Baseline Delta:</span>
                    <span className="text-rose-400 font-bold">{d.netDecadalChangePct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Healthy Foliage:</span>
                    <span className="text-emerald-400 font-bold">{d.healthyTreePct}%</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                    <span>Custodian:</span>
                    <span className="truncate max-w-[180px]">{d.censusCustodian}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Status & Negotiation Note */}
        <div className="bg-slate-900/60 border border-white/10 p-5 rounded-lg space-y-2 text-xs">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400" />
            Institutional Data Exchange Status: Individual Geotagged Records
          </h4>
          <p className="text-slate-300 leading-relaxed">
            While JKFRI and district forestry offices have released district-level totals and sample coordinates, the complete 30,000-point individual GIS dataset remains held in internal state forestry databases. KEW has submitted an institutional data collaboration proposal to ingest the complete Digital Tree Aadhaar ledger under Creative Commons open scientific governance.
          </p>
        </div>
      </div>
    </div>
  );
}
