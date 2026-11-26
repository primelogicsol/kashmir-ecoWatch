'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, MapPin, Search, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';
import { InstitutionalVerificationStatus } from '@/types/virtual-hall';

interface PublicInstitutionEntry {
  institutionId: string;
  name: string;
  shortName?: string;
  category: string;
  isCustomInstitution: boolean;
  country: string;
  cityRegion: string;
  domain: string;
  website: string;
  contactName: string;
  verificationStatus: InstitutionalVerificationStatus;
  verifiedAt?: string;
  verificationNotes?: string;
  bio: string;
  applicationsCount: number;
  latestConferenceTitle?: string;
  allocatedDelegates: number;
  allocatedSpeakers: number;
  allocatedTracks: number;
}

function getStatusBadge(status: InstitutionalVerificationStatus) {
  switch (status) {
    case 'verified':
      return {
        label: '✓ Verified Partner',
        className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      };
    case 'pending':
      return {
        label: '⏳ Pending Verification',
        className: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      };
    case 'documentation_requested':
      return {
        label: '📋 Documentation Requested',
        className: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      };
    case 'under_review':
      return {
        label: '🔍 Under Review',
        className: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      };
    case 'rejected':
      return {
        label: '✕ Verification Declined',
        className: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      };
    case 'suspended':
      return {
        label: '⚠ Suspended',
        className: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      };
    default:
      return {
        label: '⏳ Pending Verification',
        className: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      };
  }
}

export default function InstitutionVerificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [institutions, setInstitutions] = useState<PublicInstitutionEntry[]>(() =>
    VERIFIED_INSTITUTIONS.map((v) => ({
      institutionId: v.id,
      name: v.name,
      shortName: v.shortName,
      category: v.category,
      isCustomInstitution: false,
      country: v.country,
      cityRegion: v.city,
      domain: v.domain,
      website: v.website,
      contactName: v.authorizedRep.name,
      verificationStatus: v.status === 'verified' ? 'verified' : 'under_review',
      verifiedAt: v.verifiedAt,
      bio: v.bio,
      applicationsCount: 0,
      allocatedDelegates: v.resourceQuota.maxDelegatesPerHall,
      allocatedSpeakers: 2,
      allocatedTracks: v.resourceQuota.maxConcurrentTracks,
    }))
  );

  useEffect(() => {
    fetch('/api/webinars/admin?scope=public', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.institutions) && d.institutions.length > 0) {
          setInstitutions(d.institutions);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return institutions.filter((item) => {
      if (item.verificationStatus === 'rejected') return false;
      if (statusFilter === 'verified' && item.verificationStatus !== 'verified') return false;
      if (statusFilter === 'pending' && item.verificationStatus === 'verified') return false;

      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.domain.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.cityRegion.toLowerCase().includes(q) ||
        (item.latestConferenceTitle || '').toLowerCase().includes(q)
      );
    });
  }, [institutions, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Accredited Partner & Free Hosting Directory"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Institutional Verification' },
        ]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title="Institutional Verification &amp; Phase I Allocation Registry"
        subtitle="Public directory of universities, research institutions, NGOs, government departments, scientific societies, and community organizations in KEW's $0 free scientific conferencing network."
      />

      <WebinarNav />

      <main className="container mx-auto py-10 space-y-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by institution, type, city, or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all' as const, label: 'All Institutions' },
                { id: 'verified' as const, label: 'Verified Partners' },
                { id: 'pending' as const, label: 'Pending / Under Review' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                    statusFilter === tab.id
                      ? 'bg-teal-500/20 text-teal-200 border-teal-500/40'
                      : 'bg-slate-900 text-slate-400 border-white/10 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/webinars/institution/register"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
            >
              Register Institution ($0)
            </Link>
            <Link
              href="/webinars/host-a-conference"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10"
            >
              Apply to Host Event
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst) => {
            const badge = getStatusBadge(inst.verificationStatus);
            const quotaLabel = `${inst.allocatedTracks} Track • ${inst.allocatedDelegates} Delegates • ${inst.allocatedSpeakers} Speakers • 1 GB • $0 Fee`;
            return (
              <div
                key={inst.institutionId}
                className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{inst.category}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{inst.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-teal-400 font-mono mt-1">
                      <span>{inst.domain}</span>
                      {inst.website && (
                        <a
                          href={inst.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-teal-300 inline-flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    {(inst.cityRegion || inst.country) && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>
                          {[inst.cityRegion, inst.country].filter((x) => x && x !== 'Unspecified').join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {inst.latestConferenceTitle
                      ? `Proposed Event: "${inst.latestConferenceTitle}" — ${inst.bio}`
                      : inst.bio}
                  </p>

                  {inst.verificationNotes && inst.verificationStatus === 'documentation_requested' && (
                    <div className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-[11px] text-orange-200">
                      <strong>Secretariat Request:</strong> {inst.verificationNotes}
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-slate-400">
                    <div>
                      Authorized Representative: <strong className="text-slate-200">{inst.contactName}</strong>
                    </div>
                    <div>
                      Allocation: <span className="text-teal-300 font-mono">{quotaLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {inst.verificationStatus === 'verified' && inst.verifiedAt
                      ? `Verified ${inst.verifiedAt}`
                      : 'Verification Required Prior to Hosting Authorization'}
                  </span>
                  <Link
                    href="/webinars/host-a-conference"
                    className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <span>Host Event</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
