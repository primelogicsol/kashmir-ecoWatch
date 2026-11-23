'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { PLASTIC_LEGAL_INSTRUMENTS, PlasticLegalInstrument } from '@/data/plastic-pollution';
import {
  Scale,
  FileText,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Gavel,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function LawsRegulationsPage() {
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('ALL');

  const filteredInstruments = jurisdictionFilter === 'ALL'
    ? PLASTIC_LEGAL_INSTRUMENTS
    : PLASTIC_LEGAL_INSTRUMENTS.filter(inst => inst.jurisdiction.includes(jurisdictionFilter));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 04 · LAWS & ACCOUNTABILITY · STATUTORY FRAMEWORK"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Statutory' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Statutory Regulations & Single-Use Bans
            </span>
          </>
        }
        subtitle="Central Plastic Waste Management Rules (2016-2024), Non-Biodegradable Material Control Acts, EPR compliance rules, and district administrative ban notifications."
        icon={<Scale className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Enacted Instruments</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              {PLASTIC_LEGAL_INSTRUMENTS.length} Frameworks
            </div>
            <span className="text-[10px] text-slate-400 font-mono">National &amp; regional statutes</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">SUP Bans In Force</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">100%</div>
            <span className="text-[10px] text-slate-400 font-mono">All 5 regions have formal bans</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Carry Bag Thickness</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">&ge; 120 Microns</div>
            <span className="text-[10px] text-slate-400 font-mono">Statutory minimum threshold</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Enforcement Gap</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">SEVERE</div>
            <span className="text-[10px] text-slate-400 font-mono">Informal markets non-compliant</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white">Filter Jurisdictions:</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <select
              value={jurisdictionFilter}
              onChange={(e) => setJurisdictionFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Jurisdictions</option>
              <option value="Jammu & Kashmir">Jammu &amp; Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              <option value="India (National)">India (National)</option>
            </select>
          </div>
        </div>

        {/* Legal Instruments Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredInstruments.map((inst) => (
              <Card key={inst.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {inst.jurisdiction}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300 border border-white/10">
                        {inst.regulatoryScope}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {inst.currentLegalStatus}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{inst.title}</h3>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      Statutory Reference: {inst.statutoryNumber} (Enacted {inst.enactmentYear})
                    </div>
                  </div>
                  {inst.officialDocumentUrl && (
                    <a
                      href={inst.officialDocumentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-[6px] bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 shrink-0 self-start transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block mb-1">Core Mandates:</span>
                    <ul className="space-y-1 text-slate-300">
                      {inst.keyMandates.map((mandate, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{mandate}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 bg-slate-950/60 rounded-[4px] border border-white/5">
                      <span className="text-slate-400 text-[11px] block">Penalty Structure:</span>
                      <span className="text-rose-300 font-mono text-xs">{inst.penaltyStructure}</span>
                    </div>
                    <div className="p-2.5 bg-slate-950/60 rounded-[4px] border border-white/5">
                      <span className="text-slate-400 text-[11px] block">Enforcement Authority:</span>
                      <span className="text-slate-200 text-xs">{inst.enforcementAuthority}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
