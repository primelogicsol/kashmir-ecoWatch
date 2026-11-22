'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { INDIVIDUAL_CHINAR_REGISTRY } from '@/data/chinar-monitoring';
import {
  Trees,
  Ruler,
  TrendingUp,
  Clock,
  Layers,
  Compass,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function ChinarBiometricsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="02 · ECOLOGICAL & SCIENTIFIC MONITORING"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Growth Dynamics & Biometric Modeling' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                BIOMETRICS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-200 bg-clip-text text-transparent">
              Growth Dynamics & Biometric Modeling
            </span>
          </>
        }
        subtitle="Arboricultural growth curves, Girth at Breast Height (GBH) distributions, crown spread geometry, and allometric biomass carbon sequestration models across age classes."
        icon={<Ruler className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Health Dashboards</span>
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
        {/* Biometric Benchmarks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Maximum Girth (GBH)</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">14.8 m</div>
            <span className="text-[10px] text-slate-400 font-mono">Chattergam Chinar colossus</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Mean Annual Girth Growth</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">1.8 - 2.4 cm</div>
            <span className="text-[10px] text-slate-400 font-mono">In irrigated alluvial loam</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Maximum Crown Spread</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">38.5 m</div>
            <span className="text-[10px] text-slate-400 font-mono">Single tree canopy diameter</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Oldest Tree Verified</span>
            <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">~720 Years</div>
            <span className="text-[10px] text-slate-400 font-mono">Dated by tree-ring analysis</span>
          </div>
        </div>

        {/* Allometric Scaling Equations */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Ruler className="w-5 h-5 text-indigo-400" />
            Allometric Scaling &amp; Age-Girth Estimation Equations
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            In non-hollow trees, age can be approximated using the SKUAST-K calibrated radial increment equation:
          </p>

          <div className="bg-slate-950 p-4 rounded-lg border border-white/10 font-mono text-xs text-emerald-400 space-y-1">
            <div>Age (Years) = [GBH (cm) / (π × 2 × Mean Radial Growth Rate)] × Correction Factor (K)</div>
            <div className="text-slate-500 text-[11px]"># Where K = 1.05 for roadside/urban sites and 0.92 for Mughal garden lawn sites</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-[6px] border border-white/5 space-y-1">
              <span className="font-bold text-slate-200">Young Saplings (0-50 Yrs)</span>
              <p className="text-slate-400 text-[11px]">GBH: 0.3m - 1.8m. Fast vertical elongation reaching 12-18m height.</p>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-[6px] border border-white/5 space-y-1">
              <span className="font-bold text-slate-200">Mature Trees (50-250 Yrs)</span>
              <p className="text-slate-400 text-[11px]">GBH: 1.8m - 6.5m. Canopy expansion dominates over height growth.</p>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-[6px] border border-white/5 space-y-1">
              <span className="font-bold text-slate-200">Ancient / Monumental (&gt;250 Yrs)</span>
              <p className="text-slate-400 text-[11px]">GBH: &gt;6.5m. Slower radial growth, natural trunk hollow cavity development.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
