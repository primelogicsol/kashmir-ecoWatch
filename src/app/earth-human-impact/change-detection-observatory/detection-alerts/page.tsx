'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  BellRing,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Satellite,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { SATELLITE_CHANGE_ALERTS, AlertTier, AlertStatus } from '@/data/change-detection-observatory';
import { cn } from '@/lib/utils';

export default function DetectionAlertsPage() {
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredAlerts = SATELLITE_CHANGE_ALERTS.filter(alert => {
    const tierMatch = selectedTier === 'All' || alert.tier.includes(selectedTier);
    const statusMatch = selectedStatus === 'All' || alert.status === selectedStatus;
    return tierMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Alert Registry • Automated Sentinel & SAR Feed"
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
    label: "Change Observatory",
    href: "/earth-human-impact/change-detection-observatory"
  },
  {
    label: "Detection Alerts"
  }
]}
        icon={<BellRing className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-ALERTS
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Two-Tier Environmental Alert System
              </span>
            </div>
          </div>
        }
        subtitle="Automated satellite change alerts categorizing candidate anomalies and specialist-verified violations with spatial coordinates."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory/detection-alerts'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory/detection-alerts'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory/detection-alerts'].showcaseItems}
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
                Observatory Core
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory/detection-alerts'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Filter Controls Bar */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Alert Tier:</span>
            {['All', 'Tier 1', 'Tier 2'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                  selectedTier === t
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                )}
              >
                {t === 'All' ? 'All Tiers' : t === 'Tier 1' ? 'Tier 1: Preliminary' : 'Tier 2: Verified'}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Status:</span>
            {['All', 'Preliminary', 'Under Scientific Review', 'Verified', 'Rejected / Corrected'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                  selectedStatus === st
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Stream List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.alertId}
              className={cn(
                'p-6 rounded-2xl border transition-all',
                alert.status === 'Verified' ? 'bg-slate-900/80 border-teal-500/30' :
                alert.status === 'Rejected / Corrected' ? 'bg-slate-950/60 border-rose-500/20 opacity-80' :
                'bg-slate-900/60 border-amber-500/30'
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn(
                      'px-2.5 py-0.5 rounded text-[10px] font-bold uppercase',
                      alert.tier === 'Tier 2: Scientifically Verified Finding'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    )}>
                      {alert.tier}
                    </span>

                    <span className={cn(
                      'px-2.5 py-0.5 rounded text-[10px] font-semibold border',
                      alert.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      alert.status === 'Rejected / Corrected' ? 'bg-slate-500/20 text-slate-300 border-slate-500/30' :
                      alert.status === 'Under Scientific Review' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    )}>
                      Status: {alert.status}
                    </span>

                    <span className="text-xs font-mono text-slate-500">{alert.alertId}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">{alert.title}</h2>
                  <div className="text-xs font-mono text-teal-400">
                    {alert.locationName} • {alert.district} District ({alert.coordinates.lat}°N, {alert.coordinates.lng}°E)
                  </div>
                </div>

                {/* Quantitative Metric Pill */}
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold font-mono text-white">{alert.affectedAreaHectares} ha</div>
                  <div className="text-xs text-slate-400 font-mono">Confidence: {alert.confidenceScorePct}% ({alert.uncertaintyMargin})</div>
                </div>
              </div>

              {/* Physical Observation & Review Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-slate-950/70 border border-white/5 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Candidate Observation Description:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{alert.candidateChangeDescription}</p>
                  <div className="mt-2 text-[11px] text-slate-500 font-mono">
                    Before: {alert.beforeAcquisitionDate} | After: {alert.afterAcquisitionDate}
                  </div>
                </div>

                <div>
                  {alert.status === 'Rejected / Corrected' ? (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                        Correction / Rejection Rationale:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{alert.scientificReviewNotes}</p>
                      <div className="mt-2 text-[11px] text-slate-500">Sign-off: {alert.leadScientistReviewer}</div>
                    </div>
                  ) : alert.status === 'Verified' ? (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                        Verified Scientific Finding:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{alert.verifiedFindingSummary}</p>
                      <div className="mt-2 text-[11px] text-teal-400 font-semibold">Lead Scientist: {alert.leadScientistReviewer}</div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        Peer Review Queue Status:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Under multi-spectral quality review. Awaiting ground-truth validation or high-resolution cadastral verification.
                      </p>
                      <div className="mt-2 text-[11px] text-slate-500 font-mono">Detection Sensor: {alert.satelliteSensor}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cross-Module Integration Badges & Dossier Link */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Interlinked:</span>
                  {alert.crossModuleImpacts.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.route}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-teal-300 border border-white/10 text-[11px] transition-colors"
                    >
                      {link.moduleName}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-500">Dossier: {alert.permanentDossierRef}</span>
                  <Link
                    href={`/earth-human-impact/change-detection-observatory/verification-queue?alert=${alert.alertId}`}
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                  >
                    Review Queue &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
