'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Radio, 
  Filter,
  FileText
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { CONFERENCES_DETAILED, HostingModel } from '@/data/conference-system';

export default function ConferencesIndexPage() {
  const [modelFilter, setModelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredConferences = CONFERENCES_DETAILED.filter(conf => {
    if (modelFilter !== 'all' && conf.hostingModel !== modelFilter) return false;
    if (statusFilter !== 'all' && conf.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="International Multi-Track Scientific Symposia"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Scientific Conferences' }
        ]}
        icon={<Layers className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <span className="text-white">Multi-Day Scientific </span>
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Conferences &amp; Symposia
            </span>
          </div>
        }
        subtitle="Peer-moderated multi-day conferences featuring parallel thematic tracks, concurrent virtual halls, international faculty, double-blind abstract review, and permanent Zenodo DOI proceedings."
      />

      <WebinarNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-teal-400" />
              <span>Model:</span>
            </span>
            {[
              { id: 'all', label: 'All Models' },
              { id: 'joint', label: 'Joint Institutional' },
              { id: 'institution-hosted', label: 'Institution Hosted' },
              { id: 'kew-organized', label: 'KEW Direct' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setModelFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  modelFilter === tab.id
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    : 'bg-slate-800/80 text-slate-400 border-transparent hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 text-teal-200 border border-white/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="proposed">Proposed (2027)</option>
              <option value="upcoming">Upcoming</option>
              <option value="concluded">Concluded</option>
            </select>
          </div>
        </div>

        {/* Conference Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredConferences.map(conf => (
            <div
              key={conf.id}
              className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    conf.status === 'proposed'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : conf.status === 'live'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : conf.status === 'upcoming'
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                      : 'bg-slate-800 text-slate-400 border-white/10'
                  }`}>
                    {conf.status === 'proposed' ? 'PROPOSED (2027) · PLANNING PHASE' : conf.status === 'live' ? 'ACTIVE SESSION' : conf.status.toUpperCase()}
                  </span>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>{conf.hostInstitution.name}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    <Link href={`/webinars/conferences/${conf.id}`} className="hover:text-teal-300 transition-colors">
                      {conf.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {conf.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Duration</span>
                    <span className="text-xs font-bold text-white font-mono">{conf.dates.daysCount} Days</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Parallel Tracks</span>
                    <span className="text-xs font-bold text-teal-300 font-mono">{conf.tracks.length} Tracks</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Registered</span>
                    <span className="text-xs font-bold text-cyan-300 font-mono">
                      {conf.registeredCount === 0 ? '0 (Planning Phase)' : `${conf.registeredCount} Scientists`}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Proceedings</span>
                    <span className="text-xs font-bold text-emerald-300 font-mono">
                      {conf.proceedingsDoi ? 'DOI Indexed' : 'Post-Summit DOI'}
                    </span>
                  </div>
                </div>

                {/* Tracks preview */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono text-slate-400">Concurrent Virtual Halls:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {conf.tracks.map(t => (
                      <span key={t.id} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                        {t.roomCode}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/webinars/conferences/${conf.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
                >
                  <span>Conference Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/webinars/conferences/${conf.id}/program`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Program Agenda</span>
                </Link>

                <Link
                  href={`/webinars/room/${conf.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 transition-colors"
                >
                  <Radio className="w-3.5 h-3.5 text-teal-400" />
                  <span>Pre-Flight Test</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
