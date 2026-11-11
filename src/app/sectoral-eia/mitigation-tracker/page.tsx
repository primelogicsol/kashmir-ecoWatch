'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { MITIGATION_TRACKER_ITEMS } from '@/data/sectoral-eia';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Activity,
  Layers,
  Building2,
  TrendingDown
} from 'lucide-react';

export default function MitigationTrackerPage() {
  const [hierarchyFilter, setHierarchyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredItems = MITIGATION_TRACKER_ITEMS.filter((item) => {
    if (hierarchyFilter !== 'all' && item.hierarchyType.toLowerCase() !== hierarchyFilter.toLowerCase()) return false;
    if (statusFilter !== 'all' && item.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Process 08 • Actionable Intervention Ledger"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Mitigation Tracker' }
        ]}
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mitigation & Adaptation Tracker
          </span>
        }
        subtitle="Tracking the execution, field verification, and real-world efficacy of environmental mitigation plans across Kashmir's major economic sectors."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-10 max-w-6xl">
        {/* HIERARCHY OVERVIEW BANNER */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-400 text-emerald-300 bg-emerald-500/10 text-xs">
              Process 08
            </Badge>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              The Mitigation Hierarchy
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            From Assessment to Measurable Reduction
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            A sectoral EIA achieves impact only when recommendations translate into verified physical actions. Every intervention tracked here is audited against four sequential hierarchical steps:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">01. Avoidance</span>
              <p className="text-xs text-slate-300">Preventing the impact altogether (e.g. banning ATVs on alpine sod, strict zero-discharge mandates).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-xs font-mono font-bold text-teal-400 block mb-1">02. Reduction</span>
              <p className="text-xs text-slate-300">Minimizing intensity at source (e.g. micro-CETPs for artisanal dye baths, drip irrigation quotas).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">03. Restoration</span>
              <p className="text-xs text-slate-300">Rehabilitating degraded habitats (e.g. re-vegetating Karewa slopes, native pollinator flower corridors).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-1">04. Adaptation</span>
              <p className="text-xs text-slate-300">Adjusting operational regimes to irreversible climate changes (e.g. drought-resilient apple rootstocks).</p>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-white/10 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Hierarchy Level:</span>
            {['all', 'avoidance', 'reduction', 'restoration', 'adaptation'].map((h) => (
              <button
                key={h}
                onClick={() => setHierarchyFilter(h)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                  hierarchyFilter === h
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Status:</span>
            {['all', 'under implementation', 'proposed', 'verified effective'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* MITIGATION LEDGER CARDS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              Tracked Mitigation Action Items ({filteredItems.length})
            </h3>
            <span className="text-xs text-slate-400">Quarterly Sensor Verified</span>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-xs">
                      {item.hierarchyType}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        item.status === 'Under Implementation'
                          ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                          : 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">ID: {item.id}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{item.action}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Target Environmental Indicator:</span>
                      <span className="text-slate-200 font-medium">{item.targetIndicator}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Projected Ecological Reduction:</span>
                      <span className="text-emerald-400 font-semibold">{item.projectedReduction}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                  <div>
                    <span className="font-semibold text-slate-300">Responsible Lead: </span>
                    {item.responsibleLead}
                  </div>
                  <div className="text-[11px] text-teal-300/90">
                    <span className="font-semibold">Milestone: </span>
                    {item.verificationMilestone}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
