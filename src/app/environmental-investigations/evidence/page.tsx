'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Database, Search } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { EvidenceClassificationBadge } from '@/components/environmental-investigations/EiaiBadges';
import {
  CANONICAL_INVESTIGATIONS,
  getAllEvidenceAssertions,
} from '@/data/environmental-investigations';
import {
  EvidenceVerificationClass,
  InvestigationRecord,
} from '@/types/environmental-investigations';

export default function EvidenceRegistryPage() {
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState<EvidenceVerificationClass | 'ALL'>('ALL');
  const [invFilter, setInvFilter] = useState<string>('ALL');

  useEffect(() => {
    fetch('/api/environmental-investigations')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && Array.isArray(d.investigations)) {
          setRecords(d.investigations);
        }
      })
      .catch(() => {});
  }, []);

  const allAssertions = useMemo(() => getAllEvidenceAssertions(records), [records]);

  const filtered = useMemo(() => {
    return allAssertions.filter((ev) => {
      if (classFilter !== 'ALL' && ev.classification !== classFilter) return false;
      if (invFilter !== 'ALL' && ev.investigationCode !== invFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          ev.assertion.toLowerCase().includes(q) ||
          ev.evidenceBasisSummary.toLowerCase().includes(q) ||
          ev.sourceCategory.toLowerCase().includes(q) ||
          ev.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allAssertions, classFilter, invFilter, query]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI CLAIM-BY-CLAIM EPISTEMIC VERIFICATION"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Evidence Registry' },
        ]}
        icon={<Database className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Scientific Evidence Verification Registry
            </span>
          </div>
        }
        subtitle="Protecting KEW's scientific credibility by separating documented environmental facts from provisionally supported mechanisms, unverified spatial/modelling hypotheses, and unsupported allegations."
        images={['/images/water-module/Water Quality.webp']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-6">
        <Card className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search assertions, CAG audits, remote sensing, hydrodynamic requirements..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <select
              value={invFilter}
              onChange={(e) => setInvFilter(e.target.value)}
              aria-label="Filter by investigation"
              className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">All Investigations ({records.length})</option>
              {records.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.code} — {r.shortTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  'ALL',
                  'Documented',
                  'Provisionally Supported',
                  'Unverified',
                  'Unsupported',
                ] as const
              ).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setClassFilter(cls)}
                  className={`px-2.5 py-1 rounded-sm border font-medium ${
                    classFilter === cls
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
            <span className="font-mono text-slate-400">
              {filtered.length} / {allAssertions.length} assertions
            </span>
          </div>
        </Card>

        <Card padding="none">
          <div className="responsive-table-container mb-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Evidence ID &amp; Investigation</th>
                  <th className="py-3.5 px-4">Evaluated Assertion</th>
                  <th className="py-3.5 px-4">Source Category</th>
                  <th className="py-3.5 px-4">Classification</th>
                  <th className="py-3.5 px-4">Verification Summary &amp; Protocol Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((ev) => (
                  <tr key={ev.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-white">{ev.id}</div>
                      <Link
                        href={`/environmental-investigations/reports/${ev.investigationSlug}#section-18`}
                        className="text-[11px] font-mono text-emerald-400 hover:underline"
                      >
                        {ev.investigationCode} →
                      </Link>
                    </td>
                    <td className="py-4 px-4 font-semibold text-white max-w-xs leading-snug">
                      {ev.assertion}
                    </td>
                    <td className="py-4 px-4 text-slate-300 whitespace-nowrap">
                      {ev.sourceCategory}
                    </td>
                    <td className="py-4 px-4">
                      <EvidenceClassificationBadge classification={ev.classification} />
                    </td>
                    <td className="py-4 px-4 text-slate-300 max-w-md leading-relaxed">
                      <p>{ev.evidenceBasisSummary}</p>
                      {ev.methodologicalRequirement && (
                        <p className="text-[11px] font-mono text-amber-300 mt-1">
                          Protocol required: {ev.methodologicalRequirement}
                        </p>
                      )}
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        Citations: {ev.citationIds.join(', ')} • Verified: {ev.lastVerifiedDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
