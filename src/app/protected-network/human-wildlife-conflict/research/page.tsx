'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  BookOpen,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';
import { RESEARCH_ARCHIVE } from '@/data/human-wildlife-conflict';

export default function HwcResearchPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Research Archive' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                RESEARCH ARCHIVE
              </span>
              <span>Scientific Literature</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-teal-400 to-amber-300 bg-clip-text text-transparent">
              Peer-Reviewed Studies & Historical Assessments
            </span>
          </>
        }
        subtitle="Catalog of published wildlife ecology studies, department research surveys, and regional historical assessments including the foundational ESRO Kashmir Valley conflict monograph."
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="space-y-6">
          {RESEARCH_ARCHIVE.map((paper) => (
            <Card key={paper.id} className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      {paper.year} · {paper.regionFocus}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[10px] text-slate-400 font-mono">{paper.id}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {paper.title}
                  </h3>
                  <div className="text-xs text-slate-300 mt-1 font-medium">
                    {paper.authors}
                  </div>
                  <div className="text-xs text-slate-400 italic">
                    {paper.publication}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded-[4px] border shrink-0 ${
                    paper.archivalStatus === 'Verified Full-Text Archived'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  {paper.archivalStatus}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-1 font-mono">
                    Abstract & Methodology Summary
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                    {paper.abstractSummary}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-emerald-400 text-[10px] mb-1 font-mono">
                    Key Empirical Findings
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                    {paper.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-[6px] border border-emerald-500/20 text-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {paper.doiOrUrl && (
                  <div className="pt-2">
                    <a
                      href={paper.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 underline font-mono"
                    >
                      <span>Digital Object Identifier (DOI) / Source Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
