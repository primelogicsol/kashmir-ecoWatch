import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Radio, Users, MessageSquare, Download, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { SESSIONS_DETAILED, CONFERENCES_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return SESSIONS_DETAILED.map(sess => ({ sessionId: sess.id }));
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionDetailsPage({ params }: Props) {
  const { sessionId } = await params;
  const session = SESSIONS_DETAILED.find(s => s.id === sessionId);

  if (!session) notFound();

  const conference = CONFERENCES_DETAILED.find(c => c.id === session.conferenceId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label={`${session.timeDisplay} • ${session.sessionType}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference?.shortTitle || 'Conference', href: `/webinars/conferences/${session.conferenceId}` },
          { label: session.roomCode }
        ]}
        icon={<Clock className="w-6 h-6 text-teal-400" />}
        title={session.title}
        subtitle={session.trackName}
        actions={
          session.status === 'live' ? (
            <Link
              href={`/webinars/sessions/${session.id}/live`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg animate-pulse"
            >
              <Radio className="w-4 h-4" />
              <span>Join Live Hall</span>
            </Link>
          ) : undefined
        }
      />

      <WebinarNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Quick Nav Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-slate-900/60 p-2.5 rounded-2xl border border-white/10 text-xs">
          <Link
            href={`/webinars/sessions/${session.id}`}
            className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30"
          >
            Session Overview
          </Link>
          <Link
            href={`/webinars/sessions/${session.id}/live`}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <Radio className="w-3 h-3 text-rose-500" />
            <span>Virtual Hall</span>
          </Link>
          <Link
            href={`/webinars/sessions/${session.id}/questions`}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <MessageSquare className="w-3 h-3 text-cyan-400" />
            <span>Q&amp;A Panel ({session.questionsCount})</span>
          </Link>
          <Link
            href={`/webinars/sessions/${session.id}/recording`}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <Download className="w-3 h-3 text-amber-400" />
            <span>Recording &amp; Slides</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Scientific Abstract</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{session.abstract}</p>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Room Code</span>
                  <span className="font-bold text-teal-300 font-mono">{session.roomCode}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Target Hall</span>
                  <span className="font-bold text-white">{session.roomName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Attendees</span>
                  <span className="font-bold text-cyan-300 font-mono">{session.attendeesCount} Registered</span>
                </div>
              </div>
            </div>

            {/* Presenters */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                <span>Presenters &amp; Session Chair</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {session.speakers.map(spk => (
                  <div key={spk.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-2">
                    <div className="font-bold text-white text-sm">{spk.name}</div>
                    <div className="text-xs text-teal-300">{spk.title}</div>
                    <div className="text-[11px] text-slate-400">{spk.institution}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Action Card */}
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Session Access</h4>
              {session.status === 'live' ? (
                <Link
                  href={`/webinars/sessions/${session.id}/live`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg animate-pulse"
                >
                  <Radio className="w-4 h-4" />
                  <span>Enter Live WebRTC Hall</span>
                </Link>
              ) : (
                <Link
                  href={`/webinars/conferences/${session.conferenceId}/registration`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950"
                >
                  <span>Register Delegate Pass</span>
                </Link>
              )}

              {session.slidesUrl && (
                <a
                  href={session.slidesUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Slide Deck</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
