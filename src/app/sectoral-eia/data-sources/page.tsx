'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { 
  EXTERNAL_DATA_ACQUISITION_REGISTRY, 
  INGESTION_WORK_QUEUE, 
  RESEARCH_GAPS_LEDGER, 
  VERIFIED_BASELINE_CASES,
  EVIDENCE_CLASSES_METADATA,
  ExternalDataSource,
  IngestionPriority
} from '@/data/seiae-data-registry';
import { 
  Database, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  Layers, 
  FileText, 
  Compass, 
  TreePine, 
  Hammer, 
  Wheat,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function SeiaeDataSourcesPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredSources = EXTERNAL_DATA_ACQUISITION_REGISTRY.filter((s) => {
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && s.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Scientific Evidence Infrastructure"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Data Sources & Ingestion' }
        ]}
        icon={<Database className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Scientific Data Mining & Provenance Registry
          </span>
        }
        subtitle="A transparent, 3-tier external data acquisition architecture connecting government repositories, Copernicus satellites, and field evidence into a shared environmental evidence warehouse."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-12 max-w-6xl">
        {/* EXECUTIVE MANDATE & 3 ACQUISITION TIERS */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-400 text-emerald-300 bg-emerald-500/10 text-xs">
              Scientific Architecture
            </Badge>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Evidence Over Assumption
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            3-Tier Data Mining & Acquisition Pipeline
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            The research confirms that SEIAE can build upon substantial existing scientific and government archives. 
            However, credible environmental assessments require combining those datasets with facility-level records, targeted field investigations, and peer-reviewed impact equations across one integrated evidence infrastructure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 block">Tier 1: Open Data & Archives</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                IMD Gridded Rainfall (124 yrs), Copernicus Sentinel-2 (10m), ERA5-Land reanalysis, and DES J&K statistical digests.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-teal-400 block">Tier 2: Institutional Disclosures</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                CGWB groundwater yearbooks, Tourism Department footfall counts, EPCH export figures, and Soil Health Card logs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 block">Tier 3: Targeted Field Evidence</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct in-situ sensor buoys, accredited laboratory spectrometry (azo dyes, fungicides), and farm-level spray diaries.
              </p>
            </div>
          </div>
        </div>

        {/* CRITICAL TIMESTAMP INTEGRITY BANNER */}
        <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              Critical Provenance Standard: Resolving the Timestamp Ambiguity
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-4xl">
            A critical weakness in conventional environmental dashboards is displaying recent page-refresh timestamps alongside observations that are hundreds of days old. 
            The SEIAE engine enforces a strict technical separation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-white/10">
              <span className="font-bold text-emerald-400 block mb-1">
                <code>collected_at</code> (Evidence Observation Timestamp)
              </span>
              <p className="text-slate-400">
                The exact physical date and hour when telemetry was captured by a sensor, sampled in a stream, or recorded in an official census.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-white/10">
              <span className="font-bold text-slate-300 block mb-1">
                <code>refreshed_at</code> (Dashboard Rendering Timestamp)
              </span>
              <p className="text-slate-400">
                The cache invalidation or server render time. Stale observations are never presented as real-time intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* 5 EVIDENCE CLASSES FRAMEWORK */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>The 5 Rigorous Evidence Classes</span>
          </h3>
          <p className="text-xs text-slate-400">
            Every indicator in the SEIAE database is tagged with its evidence class. Missing data is never silently set to zero.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(EVIDENCE_CLASSES_METADATA).map(([key, meta]) => (
              <div key={key} className={`p-4 rounded-xl border ${meta.badgeColor} flex flex-col justify-between`}>
                <div>
                  <span className="font-bold text-xs block text-white mb-1">{meta.label}</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-3">{meta.description}</p>
                </div>
                <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">Confidence Cap: </span>
                  {meta.confidenceCap}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VERIFIED BASELINE EVIDENCE DOSSIERS */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Actual Scientific Evidence Already Ingested</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERIFIED_BASELINE_CASES.map((vb) => (
              <Card key={vb.id} className="p-5 bg-slate-900 border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                    {vb.yearSpan}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{vb.publisher}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{vb.name}</h4>
                  <p className="text-xs text-emerald-300 font-semibold">{vb.verifiedFigureOrCoverage}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{vb.seiaeApplication}</p>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-white/5 text-[11px] text-slate-400">
                  <span className="font-bold text-amber-400 block mb-0.5">Scientific Qualification:</span>
                  {vb.qualificationNote}
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[10px]">Scope: {vb.geographicScope}</span>
                  <a
                    href={vb.openSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                  >
                    <span>Source Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* EXTERNAL DATA ACQUISITION REGISTRY TABLE */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">External Acquisition Registry ({filteredSources.length})</h3>
              <p className="text-xs text-slate-400">
                Authoritative external data repositories identified and checked for ingestion into SEIAE.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Priority:</span>
              {['all', 'P0', 'P1'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    priorityFilter === p ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs bg-slate-900/80">
              <thead className="bg-slate-950 text-slate-300 border-b border-white/10">
                <tr>
                  <th className="p-3 font-bold">Source & Access Point</th>
                  <th className="p-3 font-bold">Publisher</th>
                  <th className="p-3 font-bold">Priority</th>
                  <th className="p-3 font-bold">Primary SEIAE Use</th>
                  <th className="p-3 font-bold">Method</th>
                  <th className="p-3 font-bold">Cadence</th>
                  <th className="p-3 font-bold">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSources.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3">
                      <span className="font-semibold text-white block">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.coverage}</span>
                    </td>
                    <td className="p-3 text-slate-300">{s.publisher}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        s.priority === 'P0' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}>
                        {s.priority}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300 max-w-xs">{s.primaryUse}</td>
                    <td className="p-3 text-slate-400 font-mono text-[11px]">{s.method}</td>
                    <td className="p-3 text-slate-400">{s.updateCadence}</td>
                    <td className="p-3">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DECISIVE RESEARCH GAPS LEDGER */}
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-xl font-bold text-white">The Decisive Research Gaps</h3>
          </div>
          <p className="text-xs text-slate-300">
            These datasets cannot be mined from online platforms alone and require targeted field investigations and facility audits:
          </p>

          <div className="divide-y divide-white/5 text-xs">
            {RESEARCH_GAPS_LEDGER.map((gap) => (
              <div key={gap.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{gap.gapName}</span>
                    <Badge variant="outline" className="border-rose-500/40 text-rose-300 text-[10px]">
                      {gap.priority}
                    </Badge>
                    <span className="text-[10px] text-slate-500 uppercase">Sector: {gap.sector}</span>
                  </div>
                  <p className="text-slate-300">Required: {gap.requiredProcess}</p>
                  <p className="text-rose-400/90 text-[11px] font-medium">Risk of Omission: {gap.riskOfOmission}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
