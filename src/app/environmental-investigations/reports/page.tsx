'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Download,
  FileSearch,
  FileText,
  MapPin,
  Search,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { InvestigationStatusBadge } from '@/components/environmental-investigations/EiaiBadges';
import {
  CANONICAL_INVESTIGATIONS,
  getDomainById,
  INVESTIGATION_DOMAINS,
} from '@/data/environmental-investigations';
import { InvestigationRecord, InvestigationStatus } from '@/types/environmental-investigations';

export default function InvestigationReportsRegistryPage() {
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvestigationStatus | 'all'>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');

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

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (
        domainFilter !== 'all' &&
        r.primaryDomainId !== domainFilter &&
        !r.secondaryDomainIds.includes(domainFilter as any)
      ) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${r.code} ${r.title} ${r.subtitle} ${r.districts.join(' ')} ${r.watershedOrBasin}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [records, statusFilter, domainFilter, query]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI CANONICAL INVESTIGATION ARCHIVE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Reports' },
        ]}
        icon={<FileText className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Investigation Reports Registry
            </span>
          </div>
        }
        subtitle="Browse published 24-section scientific investigations alongside active evidence-compilation dossiers, scoping reviews, and proposed investigation charters across the Western Himalayas."
        images={['/images/water-module/water-lake.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-8">
        {/* Filter Bar */}
        <Card className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by code (KEW-INV-...), lake/glacier/river, watershed, or district..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              aria-label="Filter by investigation domain"
              className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All 18 Investigation Domains</option>
              {INVESTIGATION_DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code}. {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', label: `All (${records.length})` },
                  { id: 'published', label: 'Published' },
                  { id: 'active_investigation', label: 'Active Investigation' },
                  { id: 'scoping_review', label: 'Scoping Review' },
                  { id: 'proposed', label: 'Proposed Charter' },
                ] as const
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-2.5 py-1 rounded-sm border font-medium transition-colors ${
                    statusFilter === st.id
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
            <span className="text-slate-400 font-mono">
              Showing {filtered.length} of {records.length} records
            </span>
          </div>
        </Card>

        {/* Investigation Dossier Cards */}
        <div className="space-y-5">
          {filtered.map((inv) => {
            const domain = getDomainById(inv.primaryDomainId);
            const documentedCount = inv.evidenceMatrix.filter(
              (e) => e.classification === 'Documented'
            ).length;

            return (
              <Card key={inv.code} padding="none" className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-4 relative min-h-[210px] border-b lg:border-b-0 lg:border-r border-white/10">
                    <img
                      src={inv.heroImage}
                      alt={inv.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="info" size="sm" className="font-mono font-bold bg-slate-950/90 text-emerald-300 border border-emerald-500/40">
                        {inv.code}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{inv.districts.join(', ')}</span>
                      </div>
                      <div className="font-mono text-[11px] text-emerald-300">
                        Temporal Scope: {inv.temporalScope} · {inv.version}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                          {domain?.code}. {domain?.name}
                        </span>
                        <InvestigationStatusBadge status={inv.status} label={inv.statusLabel} />
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {inv.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {inv.subtitle}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-300">
                        <span className="px-2 py-1 bg-slate-950 rounded-sm border border-white/10">
                          Disciplines: {inv.disciplineIds.length}
                        </span>
                        <span className="px-2 py-1 bg-slate-950 rounded-sm border border-white/10">
                          Claims: {inv.evidenceMatrix.length} ({documentedCount} Documented)
                        </span>
                        <span className="px-2 py-1 bg-slate-950 rounded-sm border border-white/10">
                          Institutions: {inv.accountabilityMatrix.length}
                        </span>
                        <span className="px-2 py-1 bg-slate-950 rounded-sm border border-white/10">
                          Citations: {inv.references.length}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <a href={`/api/environmental-investigations/${inv.slug}?format=dataset`}>
                          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                            Dataset JSON
                          </Button>
                        </a>
                        <a href={`/api/environmental-investigations/${inv.slug}?format=csv`}>
                          <Button variant="ghost" size="sm" icon={<FileSearch className="w-3.5 h-3.5 text-emerald-400" />}>
                            Evidence CSV
                          </Button>
                        </a>
                      </div>

                      <Link href={`/environmental-investigations/reports/${inv.slug}`}>
                        <Button size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                          {inv.status === 'published'
                            ? 'Open Canonical 24-Section Report'
                            : 'Open Scoping Dossier'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
