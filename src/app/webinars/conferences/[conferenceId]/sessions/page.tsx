import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Radio, ChevronRight, Layers } from 'lucide-react';
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

export default async function ConferenceSessionsPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId || c.id.replace('2027', '2026') === conferenceId || c.id.replace('2027', '2025') === conferenceId) || CONFERENCES_DETAILED[0];

  const sessions = SESSIONS_DETAILED.filter(s => s.conferenceId === conference.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Conference Sessions Catalog"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Sessions' }
        ]}
        icon={<Clock className="w-6 h-6 text-teal-400" />}
        title={`All Sessions • ${conference.shortTitle}`}
        subtitle="Catalog of all plenary lectures, parallel technical paper talks, and roundtable panel sessions scheduled across this conference."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        {sessions.map(s => (
          <div key={s.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-teal-300 font-bold">{s.timeDisplay}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{s.trackName}</span>
                <span className="text-slate-500">•</span>
                <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-300">{s.roomCode}</span>
              </div>
              <h4 className="text-base font-bold text-white hover:text-teal-300">
                <Link href={`/webinars/sessions/${s.id}`}>{s.title}</Link>
              </h4>
              <p className="text-xs text-slate-300 line-clamp-1">{s.abstract}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {s.status === 'live' ? (
                <Link
                  href={`/webinars/sessions/${s.id}/live`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-lg"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Join Live</span>
                </Link>
              ) : (
                <Link
                  href={`/webinars/sessions/${s.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-1"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
