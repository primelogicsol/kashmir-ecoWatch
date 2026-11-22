'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  Trees,
  ThermometerSun,
  Droplets,
  Wind,
  AlertTriangle,
  Activity,
  Layers,
  Info
} from 'lucide-react';

export default function ChinarClimateStressPage() {
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
          { label: 'Climate Stress & Thermal Exposure' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                CLIMATE STRESS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-rose-300 to-rose-400 bg-clip-text text-transparent">
              Climate Stress & Thermal Exposure
            </span>
          </>
        }
        subtitle="Empirical environmental stress indicators tracking urban heat island thermal anomalies, root-zone drought indices, erratic winter warming, and phenological budburst shifts."
        icon={<ThermometerSun className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/tree-health"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Tree Pathology</span>
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
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Microclimatic Cooling</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">-3.5°C</div>
            <span className="text-[10px] text-slate-400 font-mono">Ambient temp drop under canopy</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Summer Soil Moisture</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">18.4%</div>
            <span className="text-[10px] text-slate-400 font-mono">Root zone 28-100cm depth</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Summer Thermal Scorch</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">&gt;34.5°C</div>
            <span className="text-[10px] text-slate-400 font-mono">Heatwave foliar stress threshold</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Frost Split Resistance</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-300 mt-1">-18°C</div>
            <span className="text-[10px] text-slate-400 font-mono">Sub-zero dormancy tolerance</span>
          </div>
        </div>

        {/* Microclimatic Ecosystem Service Section */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-indigo-400" />
            Ecosystem Service: Urban Heat Island Mitigation
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mature Oriental Plane trees transpire up to 400 liters of water per day during midsummer peak heat. In urban centers like Srinagar and Anantnag, Chinar avenues reduce road surface temperatures by up to 8.2°C compared to unshaded asphalt, demonstrating vital microclimate resilience under climate change.
          </p>
        </div>
      </div>
    </div>
  );
}
