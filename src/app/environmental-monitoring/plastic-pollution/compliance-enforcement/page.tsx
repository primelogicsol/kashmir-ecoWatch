'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { DISTRICT_PLASTIC_PROFILES, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  ShieldCheck,
  Scale,
  AlertTriangle,
  Award,
  TrendingDown,
  Info,
  Filter,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function ComplianceEnforcementPage() {
  const [regionFilter, setRegionFilter] = useState<PlasticPollutionRegion | 'ALL'>('ALL');

  // DPPAI Ranking (Excluding districts marked UNAVAILABLE)
  const rankedDistricts = DISTRICT_PLASTIC_PROFILES.filter((d) => {
    if (d.evidenceClass === 'UNAVAILABLE' || d.accountabilityScore === undefined) return false;
    if (regionFilter !== 'ALL' && d.region !== regionFilter) return false;
    return true;
  }).sort((a, b) => (b.accountabilityScore ?? 0) - (a.accountabilityScore ?? 0));

  const unrankedDistricts = DISTRICT_PLASTIC_PROFILES.filter((d) => {
    if (regionFilter !== 'ALL' && d.region !== regionFilter) return false;
    return d.evidenceClass === 'UNAVAILABLE' || d.accountabilityScore === undefined;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 04 · LAWS & ACCOUNTABILITY · COMPLIANCE AUDITING"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Compliance' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Compliance Monitoring & Enforcement Audits
            </span>
          </>
        }
        subtitle="State Pollution Control Board inspection registries, municipal seizure ledgers, environmental compensation notices, and single-use plastic ban enforcement."
        icon={<ShieldCheck className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* DPPAI Scientific Rule Notice */}
        <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="text-sm font-bold text-white">Scientific Methodology: Strict Exclusion of Data-Deficient Districts</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The <strong>District Plastic Pollution Accountability Index (DPPAI)</strong> awards scores from 0 to 100 based on audited parameters: door-to-door collection efficiency (30%), source segregation rate (20%), formal recycling/MRF processing capacity (25%), and low unmanaged environmental leakage (25%).
          </p>
          <p className="text-xs text-amber-300/90 leading-relaxed font-mono">
            <strong>Zero-Fabrication Directive:</strong> Districts categorized under the UNAVAILABLE tier (e.g., Haveli, Kharmang, Roundu) are explicitly omitted from rank scores. We never invent placeholder numbers to complete a ranking table.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white">Filter DPPAI Ledger:</span>
          </div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All 5 Regions</option>
            <option value="Kashmir Valley">Kashmir Valley</option>
            <option value="Jammu">Jammu</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
          </select>
        </div>

        {/* DPPAI Ranked Table */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Audited District Accountability Rankings ({rankedDistricts.length} Districts Qualified)
              </h2>
              <p className="text-xs text-slate-400">
                Sorted by overall DPPAI score (Higher score indicates superior statutory compliance and lower leakage).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/70 font-mono text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3 text-right">Collection Rate</th>
                  <th className="py-2.5 px-3 text-right">Segregation</th>
                  <th className="py-2.5 px-3 text-right">Recycling (TPD)</th>
                  <th className="py-2.5 px-3 text-right">DPPAI Score</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rankedDistricts.map((d, index) => {
                  const score = d.accountabilityScore ?? 0;
                  const grade =
                    score >= 70 ? 'A' : score >= 55 ? 'B' : score >= 40 ? 'C' : 'D';
                  const gradeColor =
                    grade === 'A'
                      ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40'
                      : grade === 'B'
                      ? 'text-blue-400 bg-blue-500/20 border-blue-500/40'
                      : grade === 'C'
                      ? 'text-amber-400 bg-amber-500/20 border-amber-500/40'
                      : 'text-rose-400 bg-rose-500/20 border-rose-500/40';

                  return (
                    <tr key={d.district} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                        #{index + 1}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-white">
                        {d.district}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-indigo-300">
                        {d.collectionEfficiencyPct}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-300">
                        {d.segregationAtSourcePct}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-300">
                        {d.recyclingCapacityTPD.toFixed(1)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-black text-white">
                        {score} / 100
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] border ${gradeColor}`}>
                          Grade {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data-Deficient Districts Register */}
        {unrankedDistricts.length > 0 && (
          <div className="bg-slate-900/60 border border-white/10 rounded-lg p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              Unranked Districts: Insufficient Empirical Statutory Records ({unrankedDistricts.length})
            </h3>
            <p className="text-xs text-slate-400">
              The following administrative districts have no formal municipal return or empirical sampling on file. In compliance with the zero-fabrication protocol, they are held in data-deficient status pending verification.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {unrankedDistricts.map((d) => (
                <span
                  key={d.district}
                  className="px-2.5 py-1 rounded-[4px] bg-slate-950 border border-white/5 text-[11px] font-mono text-slate-400"
                >
                  {d.district} ({d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}) · Tier: UNAVAILABLE
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
