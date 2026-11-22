'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import {
  Database,
  FileCheck,
  ShieldCheck,
  Download,
  Terminal,
  ExternalLink,
  Code2,
  Lock,
  Compass
} from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 05 · RESEARCH & METHODOLOGY · DATA STANDARDS"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Scientific' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-rose-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PLASTIC INTELLIGENCE
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Scientific Methodology, Calibration & Open Data
            </span>
          </>
        }
        subtitle="Standard operating procedures for microplastic FTIR spectroscopy, municipal audit triangulation protocols, and machine-readable open datasets."
        icon={<Database className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Evidence Classification Standard */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            The 4-Tier Scientific Evidence Classification System
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every record in the Kashmir EcoWatch database is tagged with an immutable evidence classification tag to prevent misleading claims and maintain rigorous academic integrity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-950/70 border border-emerald-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  OBSERVED
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Highest Rigor</span>
              </div>
              <h3 className="text-sm font-bold text-white">Field &amp; Laboratory Empirical Data</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly measured in field surveys or laboratory setups (e.g. FTIR spectroscopy, Raman imaging, gravimetric waste sorting audits, and in-situ drone observations).
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-blue-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-[4px] bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  OFFICIALLY_REPORTED
                </span>
                <span className="text-[10px] text-blue-400 font-mono">Statutory Records</span>
              </div>
              <h3 className="text-sm font-bold text-white">Institutional Administrative Returns</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formally submitted municipal returns, Central Pollution Control Board (CPCB) annual reports, Directorate of Urban Local Bodies records, or EPA registry submissions.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-amber-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  MODELED
                </span>
                <span className="text-[10px] text-amber-400 font-mono">Peer-Reviewed MFA</span>
              </div>
              <h3 className="text-sm font-bold text-white">Mathematical Material Flow Models</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Peer-reviewed Material Flow Analysis (MFA) algorithms calculating mass balances where direct municipal monitoring is partially available. Assumptions are documented.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-rose-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  UNAVAILABLE
                </span>
                <span className="text-[10px] text-rose-400 font-mono">Zero Fabrication</span>
              </div>
              <h3 className="text-sm font-bold text-white">Data Deficient / Missing Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transparently demarcates unmonitored districts. We reject synthetic data extrapolation for missing regions (e.g. Haveli, Kharmang, Roundu).
              </p>
            </div>
          </div>
        </div>

        {/* API Integration Guide */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                Live Open Data REST API Endpoint
              </h2>
              <p className="text-xs text-slate-400">
                Direct machine-readable access for researchers, GIS platforms, and university labs.
              </p>
            </div>
            <Link
              href="/api/environmental-monitoring/plastic-pollution"
              target="_blank"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[6px] text-xs font-mono flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Query JSON Endpoint</span>
            </Link>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-white/10 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
            <div className="text-slate-500"># Fetch all 42-district plastic profiles</div>
            <div className="text-emerald-400">
              GET /api/environmental-monitoring/plastic-pollution
            </div>
            <div className="text-slate-500 pt-2"># Filter by region and evidence class</div>
            <div className="text-indigo-400">
              GET /api/environmental-monitoring/plastic-pollution?region=Kashmir%20Valley&amp;evidence=OBSERVED
            </div>
          </div>
        </div>

        {/* Licensing & Citation */}
        <div className="bg-slate-900/60 border border-white/10 p-5 rounded-lg space-y-2 text-xs">
          <h3 className="text-sm font-bold text-white">Open Access &amp; Citation Terms</h3>
          <p className="text-slate-300 leading-relaxed">
            All datasets are released under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).
            When citing data in scientific publications, use:
          </p>
          <div className="p-3 bg-slate-950 border border-white/5 rounded-[4px] font-mono text-slate-400 text-[11px]">
            Kashmir EcoWatch (2026). &ldquo;Western Himalayan Plastic Pollution Monitoring Intelligence Database (KEW-PPM)&rdquo;. https://kashmirecowatch.org/environmental-monitoring/plastic-pollution.
          </div>
        </div>
      </div>
    </div>
  );
}
