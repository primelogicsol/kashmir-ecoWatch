'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { PLASTIC_RESEARCH_LIBRARY, ResearchPaperEntry, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  FileText,
  BookOpen,
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  Download,
  Filter
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function ResearchPage() {
  const [topicFilter, setTopicFilter] = useState<string>('ALL');
  const [regionFilter, setRegionFilter] = useState<string>('ALL');

  const filteredPapers = PLASTIC_RESEARCH_LIBRARY.filter((p) => {
    if (topicFilter !== 'ALL' && p.topicCategory !== topicFilter) return false;
    if (regionFilter !== 'ALL' && p.regionCovered !== regionFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 05 · RESEARCH & METHODOLOGY · SCIENTIFIC EVIDENCE"
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
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Scientific Research Library & Academic Publications
            </span>
          </>
        }
        subtitle="Peer-reviewed limnological papers, university theses, environmental impact studies, and microplastic assessments across Western Himalayan basins."
        icon={<FileText className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Curated Studies</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
              {PLASTIC_RESEARCH_LIBRARY.length} Papers
            </div>
            <span className="text-[10px] text-slate-400 font-mono">With verified DOIs</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Earliest Study</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">2024</div>
            <span className="text-[10px] text-slate-400 font-mono">Rapidly expanding field</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Open Access</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">100% Index</div>
            <span className="text-[10px] text-slate-400 font-mono">Direct external citations</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Evidence Standard</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">Tier-1</div>
            <span className="text-[10px] text-slate-400 font-mono">Peer-reviewed criteria</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Filter Research Library:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Topics</option>
              <option value="Microplastics in Freshwater">Microplastics in Freshwater</option>
              <option value="Municipal Waste Characterization">Municipal Waste Characterization</option>
              <option value="Glacial Deposition">Glacial Deposition</option>
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Regions</option>
              <option value="Kashmir Valley">Kashmir Valley</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {paper.topicCategory}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      {paper.regionCovered}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {paper.year}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white hover:text-emerald-300 transition-colors">
                    {paper.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    <span className="text-slate-300 font-medium">{paper.authors}</span> · <span className="italic">{paper.journal}</span>
                  </div>
                </div>

                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-[6px] bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 shrink-0 self-start transition-colors"
                >
                  <span>DOI Access</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                {paper.abstractSummary}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
