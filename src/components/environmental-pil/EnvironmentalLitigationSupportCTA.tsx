'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import {
  Scale,
  FileUp,
  ListChecks,
  FileEdit,
  Handshake,
  Coins,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Gavel
} from 'lucide-react';

interface EnvironmentalLitigationSupportCTAProps {
  onTabChange?: (tabId: string) => void;
}

export function EnvironmentalLitigationSupportCTA({ onTabChange }: EnvironmentalLitigationSupportCTAProps) {
  const handleNav = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
      // Smooth scroll to top of main content
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-8 border-t border-slate-800">
      <Card className="bg-slate-900 border border-emerald-800/50 rounded-lg p-5 sm:p-7 space-y-6 shadow-2xl">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-[4px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Gavel className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Environmental Justice &amp; Litigation Support Centre
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              PIL Filing, Drafting, Legal Resources &amp; Litigation Funding
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Moving beyond historical case archives into practical environmental accountability. Assisting citizens, researchers, community organizations, and legal counsel in preparing evidence-based environmental cases, identifying competent forums, securing lawful legal aid, estimating expenses, and tracking long-term post-judgment compliance.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-[6px] bg-slate-900 border border-slate-700 text-slate-300">
              5 Himalayan Regions
            </span>
          </div>
        </div>

        {/* Most Important Design Decision Notice */}
        <div className="p-3.5 rounded-md bg-amber-950/30 border border-amber-800/40 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="font-semibold text-amber-200">
              Core KEW Protocol: A PIL is a Measure of Last Resort
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Kashmir EcoWatch does not automatically encourage filing Public Interest Litigations. We first evaluate whether the environmental problem can be resolved through a statutory complaint, regulatory notice to SPCB/PCC, administrative representation under Section 19 EPA 1986, or by joining existing judicial orders (e.g. Dal Lake, Doodh Ganga, River Tawi).
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Pillar 1 */}
          <div
            onClick={() => handleNav('file-pil')}
            className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">PILLAR 1</span>
                <FileUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                File an Environmental PIL
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                4-step pre-litigation triage ladder, locus standi verification, and 5-region judicial forum selector (High Courts, NGT, Apex Courts).
              </p>
            </div>
            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
              <span>Jurisdiction Triage</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => handleNav('filing-checklist')}
            className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-mono text-blue-400 font-semibold">PILLAR 2</span>
                <ListChecks className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                PIL Resource Checklist
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                12-factor procedural readiness assessment incorporating J&amp;K High Court PIL Rule 817/RG disclosures and evidence tests.
              </p>
            </div>
            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-blue-400 font-medium">
              <span>12-Factor Checklist</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => handleNav('drafting-studio')}
            className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-purple-500 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-mono text-purple-400 font-semibold">PILLAR 3</span>
                <FileEdit className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                PIL Drafting Studio
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Structured pleadings workspace with automated linkage to KEW's verified water quality and Sentinel-2 satellite baseline data.
              </p>
            </div>
            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-purple-400 font-medium">
              <span>GIS-Linked Drafting</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Pillar 4 */}
          <div
            onClick={() => handleNav('legal-aid')}
            className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-mono text-amber-400 font-semibold">PILLAR 4</span>
                <Handshake className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Legal Aid &amp; PIL Funding
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Verified NALSA, JKSLSA, Nyaya Bandhu, and LJCP legal aid directory; 8-phase litigation expense budget and FCRA compliance.
              </p>
            </div>
            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-amber-400 font-medium">
              <span>Free Aid &amp; Budget</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleNav('file-pil')}
              className="px-3.5 py-2 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40"
            >
              <span>Launch PIL Filing &amp; Forum Selection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleNav('drafting-studio')}
              className="px-3.5 py-2 rounded-[6px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-950/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Drafting Studio</span>
            </button>

            <button
              onClick={() => handleNav('filing-checklist')}
              className="px-3 py-2 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Review 12-Factor Checklist</span>
            </button>

            <button
              onClick={() => handleNav('funding')}
              className="px-3 py-2 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Calculate Case Budget</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-right hidden lg:block">
            <span>Disposal ≠ Compliance · Research Repository</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
