'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { CHINAR_THREAT_RECORDS,
  ChinarThreatRecord } from '@/data/chinar-monitoring';
import {
  AlertTriangle,
  Flame,
  Gavel,
  ShieldAlert,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  Trees
} from 'lucide-react';

export default function ChinarThreatsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="03 · CONSERVATION & HERITAGE PROTECTION"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Threats, Damage & Mortality Register' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                MORTALITY AUDIT
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 bg-clip-text text-transparent">
              Threats, Damage & Mortality Register
            </span>
          </>
        }
        subtitle="Systematic tracking of root asphyxiation from road macadamization, concrete choking, commercial felling, fungal trunk rot, storm decapitation, and unauthorized pruning."
        icon={<AlertTriangle className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/citizen-watch"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Report Incident</span>
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
        {/* Threat Level Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Logged Threat Incidents</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">
              {CHINAR_THREAT_RECORDS.length} Active Audits
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Across key corridors</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Asphalt Encasement Risk</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">CRITICAL</div>
            <span className="text-[10px] text-slate-400 font-mono">Root asphyxiation in cities</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Felling Penalties</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">Up to ₹500,000</div>
            <span className="text-[10px] text-slate-400 font-mono">Statutory fine structure</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Compensatory Ratio</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">1 : 10</div>
            <span className="text-[10px] text-slate-400 font-mono">Mandatory saplings per cut tree</span>
          </div>
        </div>

        {/* Documented Threat Incidents */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            Active Threat &amp; Damage Enforcement Registry
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHINAR_THREAT_RECORDS.map((thrt) => (
              <Card key={thrt.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border ${
                        thrt.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {thrt.severity}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 text-slate-300 border border-white/10">
                        {thrt.legalStatus}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{thrt.threatType}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">{thrt.location} ({thrt.district})</div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-rose-400">
                      {thrt.affectedTreesCount} Trees
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Affected</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-xs text-slate-300">
                  <span className="text-slate-500 font-medium block text-[11px] mb-0.5">Enforcement / Remediation Action:</span>
                  {thrt.resolutionAction}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Logged Date: {thrt.reportedDate}</span>
                  <span className="font-mono text-emerald-400">J&amp;K Specific Trees Act 1969</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
