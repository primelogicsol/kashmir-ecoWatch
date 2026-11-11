'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Search, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';

export default function InstitutionVerificationPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = VERIFIED_INSTITUTIONS.filter(inst => {
    const q = searchQuery.toLowerCase();
    return inst.name.toLowerCase().includes(q) || 
           inst.domain.toLowerCase().includes(q) || 
           inst.category.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Accredited Partner Directory"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Institutional Verification' }
        ]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title="Verified Scientific Institutions Directory"
        subtitle="Public registry of universities, research academies, and environmental NGO partners verified for hosting conferences and issuing accredited proceedings under Kashmir EcoWatch."
      />

      <WebinarNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Actions Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search institutions by name or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/webinars/institution/register"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
            >
              Register New Institution
            </Link>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(inst => (
            <div
              key={inst.id}
              className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    inst.status === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {inst.status === 'verified' ? '✓ Verified Partner' : '⏳ Pending Review'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{inst.category}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{inst.name}</h3>
                  <div className="text-xs text-teal-400 font-mono mt-0.5">{inst.domain}</div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {inst.bio}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-slate-400">
                  <div>Authorized Lead: <strong className="text-slate-200">{inst.authorizedRep.name}</strong></div>
                  <div>Quota: <span className="text-teal-300 font-mono">{inst.resourceQuota.maxConcurrentTracks} Tracks • {inst.resourceQuota.maxDelegatesPerHall} Max Seats</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  {inst.verifiedAt ? `Verified ${inst.verifiedAt}` : 'Under Review'}
                </span>
                <Link
                  href={`/webinars/institution/${inst.id}/dashboard`}
                  className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
