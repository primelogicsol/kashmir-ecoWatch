import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Layers, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  Radio, 
  Building2, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { ConferenceSubNav } from '@/components/webinars/ConferenceSubNav';
import { CONFERENCES_DETAILED, SESSIONS_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
}

interface Props {
  params: Promise<{ conferenceId: string }>;
}

export default async function ConferenceOverviewPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId || c.id.replace('2027', '2026') === conferenceId || c.id.replace('2027', '2025') === conferenceId) || CONFERENCES_DETAILED[0];

  const sessions = SESSIONS_DETAILED.filter(s => s.conferenceId === conference.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label={`${conference.dates.display} • Western Himalayan Academic Exchange`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Conferences', href: '/webinars/conferences' },
          { label: conference.shortTitle }
        ]}
        icon={<Layers className="w-6 h-6 text-teal-400" />}
        title={conference.title}
        subtitle={conference.theme}
        rightContent={
          conference.status === 'live' ? (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/40 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                  Plenary Hall Active
                </span>
                <span className="text-xs font-mono text-slate-400">WebRTC 1080p</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug">Day 1 Plenary: Geodetic Mass Balance Differencing</h4>
              <Link
                href="/webinars/room/kew-conf-2027-cryo"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Join Virtual Plenary Hall</span>
              </Link>
            </div>
          ) : undefined
        }
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Conference Dossier Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <span>Executive Scientific Synopsis</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {conference.description}
              </p>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Host Organization</span>
                  <span className="text-xs font-bold text-white">{conference.hostInstitution.shortName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Peer-Review Standard</span>
                  <span className="text-xs font-bold text-emerald-400">Double-Blind</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Registered Scientists</span>
                  <span className="text-xs font-bold text-teal-300 font-mono">{conference.registeredCount} Delegates</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Permanent Zenodo DOI</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono truncate block">{conference.proceedingsDoi || 'In Review'}</span>
                </div>
              </div>
            </div>

            {/* Daily Highlights */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                <span>Daily Symposium Schedule</span>
              </h3>

              <div className="space-y-3">
                {conference.dailyThemes.map(day => (
                  <div key={day.dayNumber} className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-teal-400 mb-0.5">
                        Day {day.dayNumber} • {day.date}
                      </div>
                      <h4 className="text-sm font-bold text-white">{day.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">{day.highlight}</p>
                    </div>
                    <Link
                      href={`/webinars/conferences/${conference.id}/program`}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 shrink-0 text-center"
                    >
                      View Day {day.dayNumber} Agenda &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Scientific Committee &amp; Chairs
              </h4>
              <div className="space-y-3">
                {conference.scientificCommittee.map((chair, i) => (
                  <div key={i} className="text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <div className="font-bold text-white">{chair.name}</div>
                    <div className="text-slate-400 text-[11px]">{chair.role}</div>
                    <div className="text-teal-400/90 text-[10px] font-mono">{chair.affiliation}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Conference Actions
              </h4>
              <div className="space-y-2">
                <Link
                  href={`/webinars/conferences/${conference.id}/registration`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Register as Delegate</span>
                </Link>

                <Link
                  href={`/webinars/conferences/${conference.id}/abstracts`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Call for Papers &amp; Abstracts</span>
                </Link>

                <Link
                  href={`/webinars/conferences/${conference.id}/proceedings`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Published Proceedings</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
