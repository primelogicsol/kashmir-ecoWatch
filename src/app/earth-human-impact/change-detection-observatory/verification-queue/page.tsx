'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  Globe2,
  Layers,
  Satellite,
  ShieldCheck,
  UserCheck,
  XCircle
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { SATELLITE_CHANGE_ALERTS } from '@/data/change-detection-observatory';
import { cn } from '@/lib/utils';

export default function VerificationQueuePage() {
  const pendingQueue = SATELLITE_CHANGE_ALERTS.filter(a => a.status === 'Under Scientific Review' || a.status === 'Preliminary');
  const verifiedList = SATELLITE_CHANGE_ALERTS.filter(a => a.status === 'Verified');
  const rejectedList = SATELLITE_CHANGE_ALERTS.filter(a => a.status === 'Rejected / Corrected');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Peer Workbench • Two-Specialist Protocol"
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
    label: "Verification Queue"
  }
]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-VERIFY
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Step-7 Verification & Review Queue
              </span>
            </div>
          </div>
        }
        subtitle="Two-specialist peer verification protocol combining remote sensing analysis, drone orthomosaics, and ground cadastral cross-checks."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory/verification-queue'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory/verification-queue'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory/verification-queue'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory/verification-queue'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Verification Rules Card */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="text-xs font-bold text-teal-400 uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> 1. Multi-Sensor Cross-Check
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Candidate anomaly on 10m Sentinel-2 must be corroborated by PlanetScope 3m high-resolution or Sentinel-1 SAR radar coherence.
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 2. Phenological Isolation
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seasonal agricultural fallow periods, snow ablation, and autumn leaf browning must be mathematically eliminated using harmonic models.
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" /> 3. Two-Analyst Sign-Off
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Promotion to Tier 2 Verified Finding requires digital sign-off from two independent environmental scientists with permanent evidence archival.
            </p>
          </div>
        </div>

        {/* Section 1: Active Review Queue */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Candidate Alerts Pending Verification ({pendingQueue.length})
            </h2>
            <span className="text-xs font-mono text-slate-500">Awaiting Peer Confirmation</span>
          </div>

          <div className="space-y-3">
            {pendingQueue.map((item) => (
              <div key={item.alertId} className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="text-xs text-slate-300">
                    Location: {item.locationName} ({item.district}) • Area: {item.affectedAreaHectares} ha
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.candidateChangeDescription}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold block mb-1">
                    {item.confidenceScorePct}% Confidence
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono">Logged: {item.detectionDate}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Verified Findings (Promoted) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Promoted & Scientifically Verified Findings ({verifiedList.length})
            </h2>
            <span className="text-xs font-mono text-emerald-400">Formal Evidence Dossiers Available</span>
          </div>

          <div className="space-y-3">
            {verifiedList.map((item) => (
              <div key={item.alertId} className="p-5 rounded-xl bg-slate-900/80 border border-teal-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="text-xs text-teal-400 font-medium">
                    Verified By: {item.leadScientistReviewer}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.verifiedFindingSummary}</p>
                </div>

                <div className="text-right shrink-0">
                  <Link
                    href={`/earth-human-impact/change-detection-observatory/scientific-dossiers`}
                    className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Dossier {item.permanentDossierRef.split('#')[0]}
                  </Link>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Verified: {item.afterAcquisitionDate}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Auditable Rejected / Corrected Cases */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-slate-400" />
                Auditable History of Rejected / Corrected Candidate Alerts
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Retaining permanent transparent audit logs when candidate anomalies are proven to be non-damaging phenological or shadow effects.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">Zero Silent Deletions</span>
          </div>

          <div className="space-y-3">
            {rejectedList.map((item) => (
              <div key={item.alertId} className="p-5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                      False Positive Screened
                    </span>
                    <h3 className="text-sm font-bold text-slate-300">{item.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{item.alertId}</span>
                </div>

                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Published Rejection Rationale:</strong> {item.rejectionOrCorrectionReason}
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1 border-t border-white/5">
                  <span>Sign-off: {item.leadScientistReviewer}</span>
                  <span>Archive Record: {item.permanentDossierRef}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
