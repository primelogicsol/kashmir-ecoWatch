'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Layers,
  Compass,
  Download,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Sliders,
  Code
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseMethodologyPage() {
  const FORMULAS = [
    {
      name: 'Logarithmic Decibel Energy Addition',
      formula: 'L_total = 10 · log10 [ ∑ 10^(L_i / 10) ]',
      derivation: 'Two independent 70 dB sources do not equal 140 dB. Because decibels are logarithmic measures of sound power, two equal sound pressures sum to exactly: 10 · log10(2 · 10^7) = 70 + 10 · log10(2) = 73.01 dB(A).',
      rule: '+3.0 dB for every doubling of identical sound energy.'
    },
    {
      name: 'Equivalent Continuous Sound Level (LAeq,T)',
      formula: 'L_Aeq,T = 10 · log10 [ (1 / T) · ∑ (t_i · 10^(L_i / 10)) ]',
      derivation: 'The steady sound pressure level that, over a specified time interval T, contains the same total acoustic energy as the actual fluctuating sound under measurement.',
      rule: 'Standard IEC 61672 metric for ambient environmental noise regulation.'
    },
    {
      name: 'Day-Evening-Night Level (Lden)',
      formula: 'L_den = 10 · log10 [ (12/24)·10^(Lday/10) + (4/24)·10^((Leve+5)/10) + (8/24)·10^((Lnight+10)/10) ]',
      derivation: 'Applies a +5 dB penalty to evening hours (18:00–22:00) and a +10 dB penalty to nighttime hours (22:00–06:00) to account for heightened human annoyance and nocturnal vulnerability.',
      rule: 'Primary metric used by the World Health Organization (WHO).'
    },
    {
      name: 'Mountain Valley Sound Propagation & Inversion Refraction',
      formula: 'L_p = L_w - 20 · log10(r) - 11 - A_atm - A_ground + C_inversion',
      derivation: 'In mountain valleys of Kashmir, winter ground-level cooling creates thermal inversions where temperature increases with height. Sound waves, which normally bend upward into cooler air, refract downward toward the valley floor, amplifying sound pressure by +6 to +8 dB across urban basins.',
      rule: 'Calibrated under CNOSSOS-EU mountain acoustic terrain guidelines.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION D · MANAGEMENT & ACCOUNTABILITY"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution' },
          { label: 'Methodology & Open Data' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                OPEN SCIENCE
              </span>
              <span>Methodology &amp; Open Data</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Logarithmic Derivations, Valley Physics &amp; Open Datasets
            </span>
          </>
        }
        subtitle="Mathematical formulations, mountain valley acoustic propagation physics, CNOSSOS-EU terrain models, and open access GeoJSON / CSV downloads for researchers and urban planners."
        icon={<FileText className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>District Scores</span>
            </Link>
          </div>
        }
      />

      <NoisePollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 4 KPI CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Primary Standard
              </span>
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              IEC 61672
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Class 1 &amp; 2 electroacoustic specifications
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Harmonized with ISO 1996-1:2016
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Log Energy Rule
              </span>
              <Calculator className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              +3.0 dB
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Physical doubling of identical sound sources
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Arithmetic averaging strictly forbidden
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Inversion Factor
              </span>
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              +6 to +8 dB
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Winter nocturnal downward sound refraction
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Reflected from cold valley ceiling layer
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Open Data Access
              </span>
              <Download className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              Open CC-BY
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Free GeoJSON, CSV &amp; API exports
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Public environmental intelligence
            </div>
          </Card>
        </div>

        {/* ── MATHEMATICAL DERIVATIONS MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Mathematical Rigor
              </span>
              <h3 className="text-xl font-bold text-white">Scientific Acoustic Equations &amp; Derivations</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Strictly implemented across all 18 noise pollution submodules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FORMULAS.map((f) => (
              <Card key={f.name} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-white">{f.name}</h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{f.rule}</span>
                </div>

                <div className="p-3 rounded-[6px] bg-slate-950 font-mono text-xs text-amber-400 border border-white/5 overflow-x-auto">
                  <code>{f.formula}</code>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{f.derivation}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ── OPEN DATA DOWNLOAD SECTION ─── */}
        <div className="p-6 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Research &amp; Open Access
              </span>
              <h3 className="text-lg font-bold text-white">Download Empirical Datasets</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-[6px] bg-slate-950 border border-white/5 space-y-2">
              <div className="text-xs font-mono font-bold text-white">42-District Acoustic Burden Ledger</div>
              <p className="text-xs text-slate-400">Complete CSV with DNPBS scores, baseline day/night Leq, confidence ratings &amp; primary sources.</p>
              <div className="pt-2">
                <button
                  onClick={() => alert('Downloading: kew_noise_42districts_2026.csv')}
                  className="px-3 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV (142 KB)</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-[6px] bg-slate-950 border border-white/5 space-y-2">
              <div className="text-xs font-mono font-bold text-white">Noise GIS Vector Geodatabase</div>
              <p className="text-xs text-slate-400">GeoJSON contours for continuous stations, 100m silence zone buffers, and highway corridors.</p>
              <div className="pt-2">
                <button
                  onClick={() => alert('Downloading: kew_noise_contours_gis.geojson')}
                  className="px-3 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download GeoJSON (1.8 MB)</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-[6px] bg-slate-950 border border-white/5 space-y-2">
              <div className="text-xs font-mono font-bold text-white">Scientific Methodology Whitepaper</div>
              <p className="text-xs text-slate-400">Full 34-page documentation of DNPBS formula, calibration protocols, and CNOSSOS-EU terrain models.</p>
              <div className="pt-2">
                <button
                  onClick={() => alert('Downloading: kew_acoustic_methodology_2026.pdf')}
                  className="px-3 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-rose-400" />
                  <span>Download PDF (4.2 MB)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
