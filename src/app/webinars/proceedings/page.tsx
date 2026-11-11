'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Layers,
  Search,
  ShieldCheck,
  Users,
  Video
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { Button } from '@/components/ui/Button';

export default function WebinarProceedingsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const archivedSessions = SCIENTIFIC_WEBINARS.filter(s => s.status === 'concluded' || s.proceedingsDoi);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Permanent Scientific Proceedings & Archive • Open Research Repository"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Scientific Webinars', href: '/webinars' },
          { label: 'Proceedings & Recordings' }
        ]}
        icon={<FileText className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                REPOSITORY
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Conference Proceedings &amp; Video Archive
              </span>
            </div>
          </div>
        }
        subtitle="Open-access repository of recorded scientific webinars, plenary video transcripts, synchronized slide presentations, and peer-reviewed symposium proceedings registered with DOI handles."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/webinars/calendar">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Calendar className="w-4 h-4 mr-1.5" />
                Upcoming Calendar
              </Button>
            </Link>
          </div>
        }
      />

      <WebinarNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Search Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search proceedings by keyword, author, DOI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Showing {archivedSessions.length} Registered Proceedings
          </div>
        </div>

        {/* Proceedings Grid / Zero-Archive Display */}
        {archivedSessions.length === 0 ? (
          <div className="space-y-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  0 Published Proceedings to Date • Open Access Repository
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Proceedings Archives Open Post-Summit 2027
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                  Kashmir EcoWatch will publish peer-reviewed symposium proceedings, keynote slide decks, and master audio/video records upon the conclusion of our scheduled 2027 scientific summits.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">Repository Engine</span>
                  <span className="text-xs font-bold text-teal-300">Zenodo Open API</span>
                  <span className="text-[10px] text-slate-400 block">CERN High-Capacity Storage</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">DOI Identifier Policy</span>
                  <span className="text-xs font-bold text-cyan-300">10.5281/zenodo.kew.*</span>
                  <span className="text-[10px] text-slate-400 block">Verified Pre-Publication</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">Licensing Standard</span>
                  <span className="text-xs font-bold text-emerald-300">Creative Commons 4.0</span>
                  <span className="text-[10px] text-slate-400 block">Attribution Non-Commercial</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/webinars/conferences"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
                >
                  View Proposed 2027 Conferences
                </Link>
                <Link
                  href="/webinars/calendar"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                >
                  2027 Scientific Calendar
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {archivedSessions.map((item) => (
              <div key={item.id} className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-teal-500/30 transition-all flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {item.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      {item.discipline}
                    </span>
                    {item.proceedingsDoi && (
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                        DOI: {item.proceedingsDoi}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {item.abstract}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>{item.dateDisplay}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Faculty: {item.speakers.map(s => s.name).join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Column */}
                <div className="flex flex-col justify-center gap-2.5 min-w-[220px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-6">
                  <a
                    href={`/webinars/${item.id}`}
                    className="w-full"
                  >
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold">
                      <Video className="w-3.5 h-3.5 mr-2" />
                      Watch Video Stream
                    </Button>
                  </a>

                  <Button size="sm" variant="outline" className="w-full border-white/10 text-slate-300 hover:bg-white/5">
                    <Download className="w-3.5 h-3.5 mr-2 text-teal-400" />
                    Download Monograph (PDF)
                  </Button>

                  <Button size="sm" variant="outline" className="w-full border-white/10 text-slate-400 hover:text-white text-[11px]">
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    Copy Citation (BibTeX)
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
