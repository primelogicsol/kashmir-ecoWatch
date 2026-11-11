'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SCENARIO_MODELS } from '@/data/sectoral-eia';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  TreePine, 
  Wheat, 
  Clock, 
  ArrowRight,
  Flame,
  Droplets,
  Layers
} from 'lucide-react';

export default function ScenarioModelingPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('scen-bau');
  const activeScenario = SCENARIO_MODELS.find(s => s.id === selectedScenarioId) || SCENARIO_MODELS[0];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Forward Projection & Climate Scenarios"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Scenario Modeling' }
        ]}
        icon={<TrendingUp className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Scenario Intelligence & Trajectory Modeling
          </span>
        }
        subtitle="Simulating future climate, land-use, and economic growth pathways across 2027, 2030, and 2035 to evaluate policy interventions before irreversible tipping points."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-12 max-w-6xl">
        {/* SCENARIO SELECTOR STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCENARIO_MODELS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => setSelectedScenarioId(scen.id)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedScenarioId === scen.id
                  ? scen.id === 'scen-adaptive-mitigation'
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-lg text-white'
                    : 'bg-rose-950/40 border-rose-500/60 shadow-lg text-white'
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-white/20 text-[10px] text-slate-300">
                    {scen.timeHorizon}
                  </Badge>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    scen.id === 'scen-adaptive-mitigation' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {scen.compositeEcosystemRisk}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">{scen.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{scen.tagline}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono">Select to Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>

        {/* ACTIVE SCENARIO DEEP DIVE */}
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                  Simulated Pathway: {activeScenario.timeHorizon}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-semibold">{activeScenario.tagline}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{activeScenario.title}</h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {activeScenario.description}
              </p>
            </div>
            <div className={`p-4 rounded-xl border shrink-0 text-center ${
              activeScenario.id === 'scen-adaptive-mitigation'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <span className="text-[10px] uppercase font-bold tracking-wider block">Risk Projection</span>
              <span className="text-base font-bold mt-1 block">{activeScenario.compositeEcosystemRisk}</span>
            </div>
          </div>

          {/* PROJECTED METRIC SHIFTS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
              Projected Biophysical Shifts ({activeScenario.timeHorizon})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeScenario.projectedImpacts.map((imp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-xs block">{imp.metric}</span>
                  <span className={`text-2xl font-mono font-bold block ${
                    imp.state === 'improving' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {imp.change}
                  </span>
                  <span className={`text-[10px] uppercase font-semibold block ${
                    imp.state === 'improving' ? 'text-emerald-400/80' : 'text-rose-400/80'
                  }`}>
                    Trajectory: {imp.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEMIC POLICY IMPLICATION */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
            <h4 className="text-white font-bold text-sm">Policy Intervention Required to Avert Collapse:</h4>
            <p className="text-slate-300 leading-relaxed">
              Under this scenario, business-as-usual infrastructure expansion will exceed irreversible assimilative thresholds. Strategic carrying capacity quotas, mandatory vacuum sanitation mandates for high-altitude tourism, and 100m agricultural buffer strips are urgent prerequisites.
            </p>
          </div>
        </div>

        {/* SCENARIO MODELING METHODOLOGY */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
          <h3 className="text-lg font-bold text-white">How Scenarios Are Quantified</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Scenario models combine IPCC AR6 climate projections (downscaled for the Western Himalayas), regional demographic growth forecasts from the J&K Economics and Statistics Directorate, and Kashmir EcoWatch empirical mass balance equations. Projections are audited annually against satellite-detected land cover changes.
          </p>
        </div>
      </div>
    </main>
  );
}
