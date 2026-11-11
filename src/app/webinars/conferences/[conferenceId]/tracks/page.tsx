import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layers, Video, Users, ArrowRight } from 'lucide-react';
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

export default async function ConferenceTracksPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId || c.id.replace('2027', '2026') === conferenceId || c.id.replace('2027', '2025') === conferenceId) || CONFERENCES_DETAILED[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Parallel Virtual Breakout Halls"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Parallel Tracks' }
        ]}
        icon={<Layers className="w-6 h-6 text-teal-400" />}
        title={`Parallel Breakout Tracks • ${conference.shortTitle}`}
        subtitle="Independent thematic tracks operating with dedicated WebRTC video halls, separate session moderators, and parallel presentation schedules."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conference.tracks.map(track => {
            const trackSessions = SESSIONS_DETAILED.filter(s => s.trackId === track.id);
            return (
              <div key={track.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 font-bold border border-teal-500/20">
                    {track.roomCode}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{track.sessionsCount} Papers Scheduled</span>
                </div>

                <h3 className="text-lg font-bold text-white">{track.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{track.theme}</p>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-xs text-slate-400">
                  Track Chair: <strong className="text-white">{track.chair}</strong> ({track.chairAffiliation})
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/webinars/conferences/${conference.id}/program`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                  >
                    View Track Papers
                  </Link>
                  {conference.status === 'live' && (
                    <Link
                      href="/webinars/room/kew-conf-2027-cryo"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
                    >
                      Enter Virtual Room
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
