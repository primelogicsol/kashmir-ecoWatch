'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  Trees,
  Database,
  ShieldCheck,
  Terminal,
  Download,
  ExternalLink,
  Info,
  CheckCircle2,
  FileCode2
} from 'lucide-react';

export default function ChinarMethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="05 · RESEARCH, DATA SOURCES & METHODOLOGY"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Methodology, Data Provenance & Open Data' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                OPEN DATA
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-cyan-400 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
              Methodology, Data Provenance & Open Data
            </span>
          </>
        }
        subtitle="Data governance protocols, zero-fabrication GPS coordinate policy, CC BY-NC 4.0 open research downloads, REST API documentation, and audit standards."
        icon={<Database className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/research"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Research Papers</span>
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
        {/* Evidence Tiers Banner */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Scientific Separation of Data Sources
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            To prevent statistical fabrication or misleading spatial claims, KEW maintains rigorous separation across data tiers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 bg-slate-950/70 border border-emerald-500/30 rounded-lg space-y-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                OFFICIALLY_REPORTED
              </span>
              <h3 className="font-bold text-white text-xs">District Census Aggregates</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Official totals released by JKFRI and J&amp;K Forest Department. Stored and displayed purely as administrative district aggregates.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-blue-500/30 rounded-lg space-y-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-blue-500/20 text-blue-300 border border-blue-500/40">
                VERIFIED_FIELD_RECORD
              </span>
              <h3 className="font-bold text-white text-xs">Ground-Truth Tree Coordinates</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Actual GPS-located tree records measured by university surveys, heritage audits, and field botanists. Never synthesized from district numbers.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-amber-500/30 rounded-lg space-y-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ENVIRONMENTAL_TELEMETRY
              </span>
              <h3 className="font-bold text-white text-xs">Modelled Climate &amp; Satellite</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                External feeds from IMD, Copernicus, and Open-Meteo representing ambient context. Never equated to individual tree clinical diagnoses.
              </p>
            </div>
          </div>
        </div>

        {/* REST API Endpoint Guide */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                Live Open Data REST API Endpoint
              </h2>
              <p className="text-xs text-slate-400">
                Direct JSON query access for university labs, GIS spatial software, and forestry researchers.
              </p>
            </div>
            <Link
              href="/api/environmental-monitoring/chinar-monitoring"
              target="_blank"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[6px] text-xs font-mono flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Query JSON API</span>
            </Link>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-white/10 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
            <div className="text-slate-500"># Fetch all district census summaries and sample trees</div>
            <div className="text-emerald-400">
              GET /api/environmental-monitoring/chinar-monitoring
            </div>
            <div className="text-slate-500 pt-2"># Filter by district and health condition</div>
            <div className="text-indigo-400">
              GET /api/environmental-monitoring/chinar-monitoring?district=Srinagar&amp;health=VIGOROUS
            </div>
          </div>
        </div>

        {/* Licensing */}
        <div className="bg-slate-900/60 border border-white/10 p-5 rounded-lg space-y-2 text-xs">
          <h3 className="text-sm font-bold text-white">Open Access &amp; Citation License</h3>
          <p className="text-slate-300 leading-relaxed">
            Data is released under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). Official census figures remain under the statutory copyright of J&amp;K Forest Research Institute (JKFRI).
          </p>
          <div className="p-3 bg-slate-950 border border-white/5 rounded-[4px] font-mono text-slate-400 text-[11px]">
            Kashmir EcoWatch (2026). &ldquo;Kashmir Valley Chinar Monitoring Intelligence Database (KEW-CMD)&rdquo;. https://kashmirecowatch.org/environmental-monitoring/chinar-monitoring.
          </div>
        </div>
      </div>
    </div>
  );
}
