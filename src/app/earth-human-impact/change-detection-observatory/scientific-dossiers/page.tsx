'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers,
  Map,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { GEOGRAPHIC_PILOT_STUDIES } from '@/data/change-detection-observatory';

export default function ScientificDossiersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Evidence Archive • Auditable Assessment Packages"
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
    label: "Scientific Dossiers"
  }
]}
        icon={<FileText className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-DOSSIER
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Scientific Evidence Dossiers
              </span>
            </div>
          </div>
        }
        subtitle="Permanent, peer-auditable scientific dossiers compiling multi-temporal imagery, spatial shapefiles, and statutory ground validation data."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory/scientific-dossiers'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory/scientific-dossiers'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory/scientific-dossiers'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory/scientific-dossiers'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        <div className="grid grid-cols-1 gap-6">
          {GEOGRAPHIC_PILOT_STUDIES.map((pilot) => (
            <div 
              key={pilot.id}
              className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-teal-500/30 hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
                    Dossier ID: {pilot.permanentEvidenceDossierId}
                  </span>
                  <span className="text-xs font-mono text-slate-400">District: {pilot.district} • J&K UT</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">{pilot.title}</h2>
                <div className="text-xs text-teal-400 font-mono mb-4">{pilot.subtitle}</div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">{pilot.dossierSummary}</p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-white/5 mb-6 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">2015 Baseline Area:</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {pilot.timeSeriesMetrics[0].primaryClassHectares.toLocaleString()} ha
                    </span>
                    <span className="text-[10px] text-slate-500 block font-sans">{pilot.timeSeriesMetrics[0].primaryClassLabel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">2026 Assessed Area:</span>
                    <span className="text-teal-300 font-bold text-sm">
                      {pilot.timeSeriesMetrics[2].primaryClassHectares.toLocaleString()} ha
                    </span>
                    <span className="text-[10px] text-slate-500 block font-sans">{pilot.timeSeriesMetrics[2].primaryClassLabel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">Net Cumulative Transformation:</span>
                    <span className="text-rose-400 font-bold text-sm">
                      +{pilot.timeSeriesMetrics[2].transformedHectares.toLocaleString()} ha
                    </span>
                    <span className="text-[10px] text-slate-500 block font-sans">{pilot.timeSeriesMetrics[2].transformedLabel}</span>
                  </div>
                </div>

                {/* Dataset Identifiers */}
                <div className="space-y-1.5 text-xs mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Spaceborne Layers:</div>
                  {pilot.availableLayers.map((l) => (
                    <div key={l.year} className="flex items-center justify-between text-[11px] p-2 bg-white/5 rounded border border-white/5">
                      <span className="font-mono text-slate-300">{l.year} Epoch • {l.sensor}</span>
                      <span className="text-slate-400 font-mono">Cloud: {l.cloudCoverPct}% • Date: {l.acquisitionDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Peer-Reviewed & Digitally Certified
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Downloading complete dossier archive for ${pilot.permanentEvidenceDossierId}...`)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Dossier (PDF + GeoJSON)
                  </button>
                  <Link
                    href={`/earth-human-impact/change-detection-observatory/historical-comparison?pilot=${pilot.id}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors"
                  >
                    Interactive Timeline
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
