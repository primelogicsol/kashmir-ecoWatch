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

export default function EnvironmentalRestorationHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Remediation Accountability • Satellite Auditing"
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
    label: "Restoration Registry"
  }
]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-RESTORE
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Environmental Restoration Registry
              </span>
            </div>
          </div>
        }
        subtitle="Connecting land transformation detection with remediation accountability. Using spaceborne optical and radar time-series to independently verify re-vegetation and wetland restoration."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['environmental-restoration'].tag}
            badge={EHII_HERO_CONFIGS['environmental-restoration'].badge}
            items={EHII_HERO_CONFIGS['environmental-restoration'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['environmental-restoration'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESTORATION_TRACKER_DATA.map((proj) => (
            <div key={proj.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-teal-500/30 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    {proj.domain}
                  </span>
                  <span className={cn(
                    'text-[10px] font-semibold px-2 py-0.5 rounded border',
                    proj.verificationStatus === 'Verified by Telemetry'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  )}>
                    {proj.verificationStatus}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white mb-2">{proj.projectTitle}</h2>
                <div className="text-xs text-slate-300 mb-1">
                  <strong className="text-teal-400 font-normal">Target Objective:</strong> {proj.targetMetric}
                </div>
                <div className="text-xs text-slate-400 mb-4">
                  <strong className="text-slate-300 font-normal">Milestone:</strong> {proj.quantitativeMilestone}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span>Agency: {proj.implementingBody}</span>
                <span className="font-mono text-slate-400">Target Year: {proj.completionYear}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
