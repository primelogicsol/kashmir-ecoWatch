'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  TrendingDown,
  Layers,
  Apple,
  Trash2,
  GitBranch,
  Snowflake,
  Mountain,
  Wrench,
  BookOpen
} from 'lucide-react';
import { CONFLICT_DRIVERS } from '@/data/human-wildlife-conflict';

export default function HwcDriversPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Conflict Drivers' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                LANDSCAPE ECOLOGY
              </span>
              <span>Root Cause Analysis</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">
              Ecological & Anthropogenic Drivers of Conflict
            </span>
          </>
        }
        subtitle="Analytical synthesis of land-use change, commercial orchard expansion, waste management deficits, linear infrastructure severance, and climate-induced cryospheric shifts."
        icon={<TrendingDown className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="space-y-6">
          {CONFLICT_DRIVERS.map((driver, idx) => (
            <Card key={driver.id} className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">{driver.title}</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-[4px] bg-white/5 border border-white/10 text-amber-300 self-start sm:self-auto">
                  {driver.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-1 font-mono">
                      Observed Landscape Mechanism
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                      {driver.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-cyan-400 text-[10px] mb-1 font-mono">
                      Biological & Behavioral Cascade
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                      {driver.mechanism}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-amber-400 text-[10px] mb-1 font-mono">
                      Scientific Evidence Base
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                      {driver.scientificEvidence}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-emerald-400 text-[10px] mb-1 font-mono">
                      Targeted Policy & Field Intervention
                    </h4>
                    <p className="text-emerald-200 leading-relaxed bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-500/20">
                      {driver.recommendedIntervention}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-500">Affected Regions:</strong> {driver.affectedRegions.join(', ')}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
