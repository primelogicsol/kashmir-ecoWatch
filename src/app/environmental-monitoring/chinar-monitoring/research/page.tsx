'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { CHINAR_RESEARCH_LIBRARY, ChinarResearchPaper } from '@/data/chinar-monitoring';
import {
  Trees,
  BookOpen,
  FileText,
  Search,
  ExternalLink,
  Layers,
  CheckCircle2,
  Filter
} from 'lucide-react';

export default function ChinarResearchPage() {
  const [topicFilter, setTopicFilter] = useState('ALL');

  const filtered = topicFilter === 'ALL'
    ? CHINAR_RESEARCH_LIBRARY
    : CHINAR_RESEARCH_LIBRARY.filter(p => p.topicCategory === topicFilter);

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
          { label: 'Scientific Research & Botanical Archives' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PUBLICATIONS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              Scientific Research & Botanical Archives
            </span>
          </>
        }
        subtitle="Comprehensive bibliography of peer-reviewed dendrochronological papers, pathology lab studies, wood anatomy research, and historical colonial botanical surveys."
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/data-sources"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Data Feeds</span>
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
            <span className="text-[11px] text-slate-400 uppercase font-mono">Curated Studies</span>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
              {CHINAR_RESEARCH_LIBRARY.length} Papers
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Verified DOI records</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Core Disciplines</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">5 Fields</div>
            <span className="text-[10px] text-slate-400 font-mono">Pathology to legal ecology</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Earliest Archived Record</span>
            <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">1586 AD</div>
            <span className="text-[10px] text-slate-400 font-mono">Akbar imperial decrees</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Open Access Links</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">100%</div>
            <span className="text-[10px] text-slate-400 font-mono">Direct publisher DOIs</span>
          </div>
        </div>

        {/* Papers Catalog */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Academic Research Bibliography
            </h2>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Research Topics</option>
              <option value="Dendrochronology & Age">Dendrochronology &amp; Age</option>
              <option value="Fungal Pathology & Decay">Fungal Pathology &amp; Decay</option>
              <option value="Urban Stress & Concreting">Urban Stress &amp; Concreting</option>
              <option value="History & Cultural Ecology">History &amp; Cultural Ecology</option>
            </select>
          </div>

          <div className="space-y-3">
            {filtered.map((paper) => (
              <Card key={paper.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {paper.topicCategory}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{paper.year}</span>
                    </div>
                    <h3 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                      {paper.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1">
                      <span className="text-slate-300 font-medium">{paper.authors}</span> · <span className="italic">{paper.journal}</span>
                    </div>
                  </div>

                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-[6px] bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 shrink-0 self-start transition-colors"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                  {paper.abstractSummary}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
