'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  VolumeX,
  Layers,
  Compass,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter,
  HeartPulse,
  GraduationCap,
  Scale
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { SENSITIVE_RECEPTORS, SensitiveReceptor } from '@/data/noise-pollution';

export default function NoiseSensitiveZonesPage() {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const typeCounts = useMemo(() => {
    return {
      ALL: SENSITIVE_RECEPTORS.length,
      HOSPITAL: SENSITIVE_RECEPTORS.filter((r) => r.category === 'HOSPITAL').length,
      EDUCATIONAL: SENSITIVE_RECEPTORS.filter((r) => r.category === 'UNIVERSITY' || r.category === 'SCHOOL').length,
      COURT: SENSITIVE_RECEPTORS.filter((r) => r.category === 'HIGH_COURT' || r.category === 'DISTRICT_COURT').length,
    };
  }, []);

  const filteredReceptors = useMemo(() => {
    return SENSITIVE_RECEPTORS.filter((r) => {
      let matchType = false;
      if (selectedType === 'ALL') {
        matchType = true;
      } else if (selectedType === 'HOSPITAL') {
        matchType = r.category === 'HOSPITAL';
      } else if (selectedType === 'EDUCATIONAL') {
        matchType = r.category === 'UNIVERSITY' || r.category === 'SCHOOL';
      } else if (selectedType === 'COURT') {
        matchType = r.category === 'HIGH_COURT' || r.category === 'DISTRICT_COURT';
      } else {
        matchType = r.category === selectedType;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);

      return matchType && matchSearch;
    });
  }, [selectedType, searchQuery]);

  const violatedCount = SENSITIVE_RECEPTORS.filter((r) => r.statutoryViolation).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION C · EXPOSURE & ECOLOGICAL IMPACTS"
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
          { label: 'Sensitive & Silence Zones' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                EXPOSURE SECTOR 01
              </span>
              <span>Sensitive &amp; Silence Zones</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              100m Statutory Buffers Around Hospitals, Universities &amp; Courts
            </span>
          </>
        }
        subtitle="Empirical compliance audits of statutory 100-meter silence zone perimeters across 42 Himalayan districts. Benchmarking actual field decibels against mandatory day limits (50 dB(A)) and night limits (40 dB(A))."
        icon={<VolumeX className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/health-exposure"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Health Exposure</span>
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
                Statutory Silence Limit
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              50 / 40 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Mandatory Day / Night legal threshold
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Noise Rules 2000 &amp; NEQS 2010 Rule 3
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Audited Violation Rate
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              {((violatedCount / SENSITIVE_RECEPTORS.length) * 100).toFixed(0)}%
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              {violatedCount} of {SENSITIVE_RECEPTORS.length} receptors breach limits
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Average exceedance: +8.4 dB above 50 dB
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Mandatory Buffer
              </span>
              <VolumeX className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              100 <span className="text-sm font-normal text-slate-400">meters</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Radial perimeter around premises
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Zero horn blowing &amp; sound amplification
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Total Identified
              </span>
              <HeartPulse className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              340 <span className="text-sm font-normal text-slate-400">Receptors</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Across 42 administrative districts
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              31 officially notified by District Magistrates
            </div>
          </Card>
        </div>

        {/* ── SENSITIVE RECEPTORS REGISTRY ─── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Ground-Truth Field Audits
              </span>
              <h3 className="text-xl font-bold text-white">Sensitive Silence Zone Receptors Registry</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search hospital, court, college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-[6px] bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex items-center gap-1">
                {(['ALL', 'HOSPITAL', 'EDUCATIONAL', 'COURT'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                      selectedType === t
                        ? 'bg-amber-600 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{t === 'ALL' ? 'All' : t}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded ${
                        selectedType === t
                          ? 'bg-slate-950/30 text-slate-950 font-black'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {typeCounts[t]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Receptor Name</th>
                  <th className="py-3 px-3">Typology</th>
                  <th className="py-3 px-3">District &amp; Region</th>
                  <th className="py-3 px-3 text-right">Distance to Arterial</th>
                  <th className="py-3 px-3 text-right">Day Measured</th>
                  <th className="py-3 px-3 text-right">Night Measured</th>
                  <th className="py-3 px-3 text-center">Exceedance Delta</th>
                  <th className="py-3 px-4 text-center">Legal Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredReceptors.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{r.name}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold">
                        {r.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                      {r.district} · {r.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : r.region}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-amber-400 font-bold">
                      {r.distanceToArterialMeters ?? r.statutoryBufferMeters ?? 100}m
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-white">
                      {r.measuredDayLeq} dB
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      {r.measuredNightLeq} dB
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      <span className={`font-bold ${r.measuredDayLeq > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {r.measuredDayLeq > 50 ? `+${(r.measuredDayLeq - 50).toFixed(1)} dB` : 'Compliant'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase ${
                          r.statutoryViolation
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {r.statutoryViolation ? 'Violating (Non-Compliant)' : 'Statutory Compliant'}
                      </span>
                    </td>
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
