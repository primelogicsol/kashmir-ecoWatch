'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { JURISDICTION_FORUMS, JurisdictionForum } from '@/data/environmental-litigation-support';
import {
  FileUp,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Scale,
  ShieldCheck,
  Building,
  Info,
  ChevronRight,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

export function FilePilModule() {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeForum, setActiveForum] = useState<JurisdictionForum>(JURISDICTION_FORUMS[0]);

  // Filter forums
  const filteredForums = JURISDICTION_FORUMS.filter((f) => {
    if (selectedRegionFilter !== 'ALL') {
      if (selectedRegionFilter === 'JK' && !f.jurisdiction.includes('Kashmir') && !f.jurisdiction.includes('Jammu')) return false;
      if (selectedRegionFilter === 'LADAKH' && !f.jurisdiction.includes('Ladakh')) return false;
      if (selectedRegionFilter === 'AJK' && !f.jurisdiction.includes('Azad Jammu')) return false;
      if (selectedRegionFilter === 'GB' && !f.jurisdiction.includes('Gilgit-Baltistan')) return false;
      if (selectedRegionFilter === 'APEX' && f.type !== 'Apex Court') return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.jurisdiction.toLowerCase().includes(q) ||
        f.governingLegislation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[6px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              File an Environmental PIL &amp; Forum Selection
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Jurisdiction screening, eligibility verification, procedural rules, and court selection across 5 Himalayan administrative regions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-[6px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
            Rule 817/RG J&amp;K PIL Compliant
          </span>
        </div>
      </div>

      {/* Mandatory Pre-Litigation Triage Notice */}
      <div className="p-4 rounded-lg bg-slate-900 border border-amber-800/40 space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-[6px] bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-white text-sm">
              Critical KEW Protocol: A PIL is a Measure of Last Resort
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Kashmir EcoWatch does not automatically encourage filing Public Interest Litigations. Filing premature petitions without exhausting statutory avenues leads to summary dismissal, adverse cost awards, and delayed environmental relief.
            </p>
          </div>
        </div>

        {/* 4-Step Pre-Litigation Ladder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span>STEP 1</span>
              <span>30–60 DAYS</span>
            </div>
            <h4 className="text-xs font-semibold text-white">Statutory Representation</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Submit formal written grievance to SPCB/PCC, Municipal Commissioner, or Deputy Commissioner with speed post tracking.
            </p>
          </div>

          <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>STEP 2</span>
              <span>SECTION 19 / RTI</span>
            </div>
            <h4 className="text-xs font-semibold text-white">Notice of Pollution &amp; RTI</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Serve 30-day statutory notice of intention to file complaint under Section 19 EPA 1986; obtain discharge consents via RTI.
            </p>
          </div>

          <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span>STEP 3</span>
              <span>40-YR ARCHIVE</span>
            </div>
            <h4 className="text-xs font-semibold text-white">Search Prior Proceedings</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Check KEW Judicial Inventory for active orders (e.g. Dal Lake, Doodh Ganga, River Tawi) to avoid res judicata dismissal.
            </p>
          </div>

          <div className="p-3 rounded-md bg-slate-950/70 border border-amber-800/40 bg-amber-950/20 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
              <span>STEP 4</span>
              <span>COURT FILING</span>
            </div>
            <h4 className="text-xs font-semibold text-amber-200">Judicial Forum Filing</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              File before High Court (Article 226) or NGT (Section 14) only if statutory bodies fail to act within reasonable time.
            </p>
          </div>
        </div>
      </div>

      {/* Forum Selection Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Region:
          </span>
          {[
            { id: 'ALL', label: 'All 5 Regions' },
            { id: 'JK', label: 'J&K (Valley & Jammu)' },
            { id: 'LADAKH', label: 'Ladakh' },
            { id: 'AJK', label: 'Azad J&K' },
            { id: 'GB', label: 'Gilgit-Baltistan' },
            { id: 'APEX', label: 'Apex Courts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRegionFilter(tab.id)}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-medium whitespace-nowrap transition-colors ${
                selectedRegionFilter === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search courts or rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Forum Directory & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Forum Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-400" />
            Competent Judicial Forums ({filteredForums.length})
          </h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredForums.map((forum) => {
              const isSelected = activeForum.id === forum.id;
              return (
                <div
                  key={forum.id}
                  onClick={() => setActiveForum(forum)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-emerald-400">
                      {forum.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{forum.filingMode}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-1.5 leading-snug">{forum.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{forum.jurisdiction}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/60">
                    <span className="text-slate-300 font-medium">{forum.constitutionalArticle}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Forum Detail Inspector */}
        <div className="lg:col-span-7">
          <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-4 sticky top-32">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  {activeForum.type} · {activeForum.jurisdiction}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{activeForum.name}</h3>
              </div>
              <a
                href={activeForum.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-medium border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Official e-Filing Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Constitutional / Statutory Base
                </span>
                <p className="font-semibold text-white">{activeForum.constitutionalArticle}</p>
                <p className="text-[11px] text-slate-400">{activeForum.governingLegislation}</p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Bench Location &amp; Mode
                </span>
                <p className="font-semibold text-white">{activeForum.benchLocation}</p>
                <p className="text-[11px] text-emerald-400">{activeForum.filingMode}</p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Approximate Court Fee
                </span>
                <p className="font-semibold text-amber-300">{activeForum.approximateCourtFee}</p>
                <p className="text-[10px] text-slate-500">Excludes advocate drafting and stamp paper costs</p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Official Rules Reference
                </span>
                <p className="font-mono text-[11px] text-slate-300">{activeForum.rulesReference}</p>
              </div>
            </div>

            {/* Standing Criteria */}
            <div className="p-3.5 rounded-md bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                Locus Standi &amp; Petitioner Eligibility
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeForum.standingCriteria}</p>
            </div>

            {/* Mandatory Statutory Pre-Conditions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Mandatory Pre-Conditions &amp; Disclosures
              </h4>
              <div className="space-y-1.5">
                {activeForum.statutoryPreConditions.map((cond, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{cond}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
