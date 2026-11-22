'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  Wrench,
  CheckCircle2,
  Shield,
  Zap,
  Lightbulb,
  Coins,
  Trash2,
  Bell,
  Scale
} from 'lucide-react';
import { MITIGATION_STRATEGIES } from '@/data/human-wildlife-conflict';

export default function HwcMitigationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Mitigation' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                COEXISTENCE TOOLKIT
              </span>
              <span>Evidence-Based Solutions</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Prevention, Protection & Non-Lethal Deterrence
            </span>
          </>
        }
        subtitle="Catalog of field-tested technical, structural, and community-led interventions evaluated under the IUCN SSC Guidelines on Human-Wildlife Conflict and Coexistence."
        icon={<Wrench className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="space-y-6">
          {MITIGATION_STRATEGIES.map((strategy, idx) => (
            <Card key={strategy.id} className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                    INTERVENTION #{idx + 1} · {strategy.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{strategy.title}</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
                  {strategy.effectivenessRating}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-1 font-mono">
                      Technical Specification & Mechanism
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                      {strategy.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                    <span className="bg-white/5 px-2.5 py-1 rounded-[4px]">
                      <strong className="text-slate-300">Cost:</strong> {strategy.deploymentCost}
                    </span>
                    <span className="bg-white/5 px-2.5 py-1 rounded-[4px]">
                      <strong className="text-slate-300">Target Wildlife:</strong> {strategy.targetSpecies.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-cyan-400 text-[10px] mb-1 font-mono">
                      Himalayan Field Trial Provenance
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                      {strategy.fieldTestedIn}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-emerald-400 text-[10px] mb-1 font-mono">
                      IUCN SSC Principle Alignment
                    </h4>
                    <p className="text-emerald-200 leading-relaxed bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-500/20">
                      {strategy.iucnPrinciple}
                    </p>
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
