'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Globe2,
  Mountain,
  Satellite,
  ShieldCheck,
  Trees,
  Waves
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { RESTORATION_TRACKER_DATA } from '@/data/earth-human-impact';
import { cn } from '@/lib/utils';

export default function MitigationRestorationTrackerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Restoration & Mitigation • Compliance Tracking"
        breadcrumbs={[
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Earth & Human Impact",
    href: "/earth-human-impact"
  },
  {
    label: "Mitigation Tracker"
  }
]}
        icon={<CheckCircle2 className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-MITIGATE
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Ecological Restoration & Mitigation Tracker
              </span>
            </div>
          </div>
        }
        subtitle="Independent verification of state and community-led restoration interventions. Auditing target milestones, replantation survival rates, and check dams against telemetry."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['mitigation-restoration'].tag}
            badge={EHII_HERO_CONFIGS['mitigation-restoration'].badge}
            items={EHII_HERO_CONFIGS['mitigation-restoration'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['mitigation-restoration'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Verification Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Active Restoration Projects</div>
            <div className="text-2xl font-bold text-white mt-1">12 Projects</div>
            <div className="text-[11px] text-slate-500">Across 10 Kashmir districts</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Telemetry Verified</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">68.4%</div>
            <div className="text-[11px] text-slate-500">Confirmed via Sentinel NDVI & InSAR</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Under Statutory Audit</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">31.6%</div>
            <div className="text-[11px] text-slate-500">Awaiting ground inspection verification</div>
          </div>
        </div>

        {/* Restoration Projects Table */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">State & Community Ecological Interventions</h2>
          <p className="text-xs text-slate-400 mb-6">Empirical tracking of progress milestones and remote-sensing verification status.</p>

          <div className="space-y-4">
            {RESTORATION_TRACKER_DATA.map((proj) => (
              <div key={proj.id} className="p-5 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-teal-400">
                      {proj.domain}
                    </span>
                    <h3 className="text-base font-bold text-white">{proj.projectTitle}</h3>
                  </div>

                  <p className="text-xs text-slate-300">
                    <strong className="text-teal-400 font-normal">Target:</strong> {proj.targetMetric}
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-300 font-normal">Milestone:</strong> {proj.quantitativeMilestone}
                  </p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1">
                    <span>Landscape: {proj.targetLandscape}</span>
                    <span>Agency: {proj.implementingBody}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 flex flex-col md:items-end justify-between">
                  <span className={cn(
                    'px-2.5 py-0.5 rounded text-[10px] font-semibold border inline-block mb-2',
                    proj.verificationStatus === 'Verified by Telemetry' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  )}>
                    {proj.verificationStatus}
                  </span>
                  <div className="text-[11px] font-mono text-slate-400">Target Year: {proj.completionYear}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
