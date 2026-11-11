'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { ASSESSMENT_WORKFLOW_STEPS } from '@/data/sectoral-eia';
import { 
  GitBranch, 
  Layers, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  Network, 
  TrendingUp, 
  CheckCircle2, 
  Award,
  ArrowRight,
  MapPin,
  Clock,
  FileCheck,
  ChevronRight
} from 'lucide-react';

export default function SectoralEiaMethodologyPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = ASSESSMENT_WORKFLOW_STEPS[activeStepIndex];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Standard Scientific Methodology"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Methodology' }
        ]}
        icon={<GitBranch className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            The 9-Process Assessment Workflow
          </span>
        }
        subtitle="The scientific methodology governing every sectoral environmental impact assessment conducted or reviewed by Kashmir EcoWatch."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-12 max-w-6xl">
        {/* CRUCIAL DESIGN PRINCIPLE CALLOUT */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-emerald-400 text-emerald-300 bg-emerald-500/10 text-xs">
              Scientific Imperative
            </Badge>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Foundational Grounding Principle
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            The 5 Inviolable Anchor Criteria
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
            The crucial design principle of Kashmir EcoWatch’s SEIAE is that <span className="text-white font-semibold underline">every single assessment</span> must be formally anchored by five empirical criteria:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="font-bold text-xs">1. Boundary</span>
              </div>
              <p className="text-xs text-slate-300">
                Explicit GIS watershed, landscape corridor, or polygon geometry.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-xs">2. Time Period</span>
              </div>
              <p className="text-xs text-slate-300">
                Defined seasonal or multi-year observation window.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Database className="w-4 h-4" />
                <span className="font-bold text-xs">3. Baseline</span>
              </div>
              <p className="text-xs text-slate-300">
                Documented historical or unpolluted reference state.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <GitBranch className="w-4 h-4" />
                <span className="font-bold text-xs">4. Method</span>
              </div>
              <p className="text-xs text-slate-300">
                Standardized indicator weighting, mass balances, and causal equations.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <FileCheck className="w-4 h-4" />
                <span className="font-bold text-xs">5. Evidence</span>
              </div>
              <p className="text-xs text-slate-300">
                Immutable citations, sensor logs, and lab spectrometry datasets.
              </p>
            </div>
          </div>
          <p className="text-xs text-amber-300/90 mt-4 italic">
            &ldquo;Without these five anchors, a numerical EIA score has little scientific meaning.&rdquo;
          </p>
        </div>

        {/* INTERACTIVE WORKFLOW EXPLORER */}
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step-by-Step Architecture</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">2. Connected Workflow Processes</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Step Selector List */}
            <div className="lg:col-span-4 space-y-1.5">
              {ASSESSMENT_WORKFLOW_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    activeStepIndex === idx
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-white shadow-md'
                      : 'bg-slate-900/70 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activeStepIndex === idx ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {s.step}
                    </span>
                    <span className="text-xs font-semibold">{s.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${activeStepIndex === idx ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            {/* Active Step Deep-Dive Card */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      Step {activeStep.step}
                    </span>
                    <span className="text-slate-600">•</span>
                    <h3 className="text-xl font-bold text-white">{activeStep.name}</h3>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 bg-emerald-500/10 text-xs self-start sm:self-auto">
                    Deliverable: {activeStep.deliverable}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Function & Mandate
                    </h4>
                    <p className="text-base text-slate-100 font-medium leading-relaxed">
                      {activeStep.functionSummary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Technical Implementation
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeStep.details}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">
                      Verification Standard Required:
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      All calculations in Step {activeStep.step} must cite peer-reviewed formulas, calibrated satellite indices (e.g. NDVI, NDWI, MNDWI), or empirical ground-truth sensors. Unsubstantiated estimates are flagged during Step 09 scientific review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : ASSESSMENT_WORKFLOW_STEPS.length - 1))}
                  className="border-white/10 text-xs"
                >
                  Previous Step
                </Button>
                <span className="text-xs text-slate-400 font-mono">
                  {activeStepIndex + 1} of {ASSESSMENT_WORKFLOW_STEPS.length}
                </span>
                <Button
                  size="sm"
                  onClick={() => setActiveStepIndex((prev) => (prev < ASSESSMENT_WORKFLOW_STEPS.length - 1 ? prev + 1 : 0))}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Next Step
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* WORKFLOW MATRIX TABLE */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Full Workflow Matrix Summary</h3>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs bg-slate-900/70">
              <thead className="bg-slate-950 text-slate-300 border-b border-white/10">
                <tr>
                  <th className="p-3 font-bold">Step</th>
                  <th className="p-3 font-bold">Engine Process</th>
                  <th className="p-3 font-bold">Core Function</th>
                  <th className="p-3 font-bold">Primary Scientific Deliverable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ASSESSMENT_WORKFLOW_STEPS.map((s) => (
                  <tr key={s.step} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 font-mono font-bold text-emerald-400">{s.step}</td>
                    <td className="p-3 font-semibold text-white">{s.name}</td>
                    <td className="p-3 text-slate-300">{s.functionSummary}</td>
                    <td className="p-3 text-emerald-300/90 font-medium">{s.deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Ready to Execute an Assessment?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Apply this 9-step workflow to your enterprise, catchment, or research study.
            </p>
          </div>
          <Link href="/sectoral-eia/assessment/new">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
              Open Assessment Engine <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
