'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  Layers,
  Compass,
  ShieldCheck,
  AlertTriangle,
  Gavel,
  BookOpen,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { NOISE_LEGAL_STANDARDS } from '@/data/noise-pollution';

export default function NoiseStandardsCompliancePage() {
  const STATUTORY_PENALTIES = [
    { violation: 'Use of Loudspeakers during Night Curfew (22:00–06:00)', statute: 'Noise Rules 2000 Rule 5(2) / NEQS 2010', penalty: 'Seizure of sound equipment + Fine up to ₹100,000 / Rs 50,000 + Imprisonment up to 5 yrs under EPA 1986' },
    { violation: 'Blowing of Horns in Notified 100m Silence Zones', statute: 'Noise Rules 2000 Rule 6 / Motor Vehicles Act Sec 190(2)', penalty: '₹1,000 for first offence, ₹2,000 for subsequent offences + Driving license endorsement' },
    { violation: 'Operating Diesel Generator without CPCB Acoustic Canopy', statute: 'Environment (Protection) Second Amendment Rules 2002', penalty: 'Immediate sealing of premises + Disconnection of electrical utility connection' },
    { violation: 'Industrial Estate Boundary Exceedance (>75 dB Day / >70 dB Night)', statute: 'Water & Air Acts / Noise Rules 2000', penalty: 'Pollution Control Committee closure notice under Section 31A of Air Act 1981' },
    { violation: 'Public Nuisance & Daytime Extreme Noise Amplification', statute: 'Section 133 Code of Criminal Procedure (CrPC)', penalty: 'Executive Magistrate conditional order for immediate removal of acoustic nuisance' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION D · MANAGEMENT & ACCOUNTABILITY"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution' },
          { label: 'Standards & Compliance' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                STATUTORY ENGINE
              </span>
              <span>Standards &amp; Compliance</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              India Noise Rules 2000 · Pakistan NEQS 2010 · WHO Guidelines
            </span>
          </>
        }
        subtitle="Tri-jurisdictional statutory compliance engine harmonizing statutory limits across Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan with World Health Organization environmental benchmarks."
        icon={<Scale className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/mitigation"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Mitigation</span>
            </Link>
          </div>
        }
      />

      <NoisePollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 4 KPI CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Harmonized Frameworks
              </span>
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              3 <span className="text-sm font-normal text-slate-400">Statutes</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Noise Rules, NEQS &amp; WHO
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Territorially mapped to respective districts
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Silence Zone Limit
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              50 / 40 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Day / Night legal maximum
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              100m radius around hospitals &amp; courts
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Nocturnal Protected Curfew
              </span>
              <Gavel className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              22:00 – 06:00
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Mandatory sound silence window
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Strict prohibition of public amplification
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Enforcement Power
              </span>
              <Scale className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              Sec 133 CrPC
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Summary removal of public nuisance
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Armed with equipment confiscation authority
            </div>
          </Card>
        </div>

        {/* ── TRI-REGULATORY COMPARATIVE MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Comparative Law
              </span>
              <h3 className="text-xl font-bold text-white">Tri-Regulatory Statutory Noise Limits Matrix</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Comparing India Noise Rules 2000, Pakistan NEQS 2010 and WHO 2018 Guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOISE_LEGAL_STANDARDS.map((leg) => (
              <Card key={leg.jurisdiction} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                      Enacted {leg.enactedYear}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{leg.jurisdiction}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {leg.effectiveTerritory.join(', ')}
                  </span>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed font-mono text-[11px]">
                  {leg.statutoryReference}
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  {leg.zones.map((z) => (
                    <div key={z.zoneType} className="p-2.5 rounded-[6px] bg-slate-950/80 border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{z.label}</div>
                        <div className="text-[11px] text-slate-400">{z.dayPeriod} (Day) · {z.nightPeriod} (Night)</div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-amber-400 font-bold">{z.dayLimitDb} dB</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-cyan-300 font-bold">{z.nightLimitDb} dB</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── STATUTORY PENALTIES & ENFORCEMENT LEDGER ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Penalties &amp; Sanctions
              </span>
              <h3 className="text-xl font-bold text-white">Statutory Enforcement Mandates &amp; Penalties</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Statutory powers exercisable by Police, SPCB, EPA and District Magistrates
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Prohibited Violation</th>
                  <th className="py-3 px-3">Statutory Provision</th>
                  <th className="py-3 px-4">Prescribed Legal Penalty &amp; Enforcement Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {STATUTORY_PENALTIES.map((p) => (
                  <tr key={p.violation} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{p.violation}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300 text-[11px]">{p.statute}</td>
                    <td className="py-3 px-4 text-rose-300 font-medium text-xs">{p.penalty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
