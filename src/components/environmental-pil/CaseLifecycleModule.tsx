'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CASE_LIFECYCLE_STAGES, CaseLifecycleStep } from '@/data/environmental-litigation-support';
import {
  Route,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Scale,
  Gavel
} from 'lucide-react';

export function CaseLifecycleModule() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep: CaseLifecycleStep = CASE_LIFECYCLE_STAGES[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[6px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Route className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Environmental Case Lifecycle Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            From preliminary field reconnaissance and pre-litigation representations through hearings, final judgment, engineering implementation, and satellite-verified restoration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-[6px] bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
            9 Discrete Lifecycle Stages
          </span>
        </div>
      </div>

      {/* Fundamental Doctrine Callout Banner */}
      <div className="p-4 rounded-lg bg-slate-900 border border-emerald-800/50 space-y-2">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-[6px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
            <Gavel className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-white text-sm">
              Fundamental KEW Principle: Case Disposal Does Not Equal Environmental Compliance
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-4xl">
              Most conventional databases cease tracking when a petition is formally marked "Disposed" by the registry. In Kashmir EcoWatch's lifecycle model, Stage 7 (Final Judgment) leads directly into Stage 8 (Scientific Implementation &amp; Ground Verification), monitoring whether wastewater treatment plants are built and ecological boundaries actually recovered.
            </p>
          </div>
        </div>
      </div>

      {/* 9-Step Horizontal Progress Ribbon */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-2 min-w-[850px]">
          {CASE_LIFECYCLE_STAGES.map((st, idx) => {
            const isSelected = activeStepIndex === idx;
            const isPast = idx < activeStepIndex;

            return (
              <button
                key={st.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md'
                    : isPast
                    ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isSelected ? 'text-cyan-400 font-bold' : ''}>STAGE {st.stepNumber}</span>
                  <span className="text-[9px] text-slate-400">{st.duration}</span>
                </div>
                <div className="text-xs font-semibold truncate leading-tight">{st.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-5 bg-slate-900/90 border-slate-800 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-cyan-400">
                  STAGE {activeStep.stepNumber} OF 9 · {activeStep.duration}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{activeStep.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeStep.subTitle}</p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-2.5 py-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-white border border-slate-700 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={activeStepIndex === CASE_LIFECYCLE_STAGES.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(CASE_LIFECYCLE_STAGES.length - 1, prev + 1))}
                  className="px-2.5 py-1 rounded-[6px] bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-xs text-white cursor-pointer"
                >
                  Next Stage
                </button>
              </div>
            </div>

            {/* Key Actions in This Stage */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key Operational Actions &amp; Milestones
              </h4>
              <div className="space-y-2">
                {activeStep.keyActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-md bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                    <span className="font-mono text-cyan-400 font-bold shrink-0">{i + 1}.</span>
                    <span className="leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Pitfalls & Traps */}
            <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Common Procedural Pitfalls in Stage {activeStep.stepNumber}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">{activeStep.commonPitfalls}</p>
            </div>
          </Card>
        </div>

        {/* Right: Integration & Milestone Summary */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Statutory Milestone
            </span>
            <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-xs font-semibold text-emerald-300">
              {activeStep.statutoryMilestone}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                KEW Platform Integration
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">{activeStep.kewIntegration}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center justify-between">
                <span>Estimated Duration:</span>
                <span className="font-mono text-white">{activeStep.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Next Lifecycle Phase:</span>
                <span className="font-mono text-cyan-400">
                  {activeStepIndex < CASE_LIFECYCLE_STAGES.length - 1
                    ? `Stage ${activeStepIndex + 2}`
                    : 'Ongoing Stewardship'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
