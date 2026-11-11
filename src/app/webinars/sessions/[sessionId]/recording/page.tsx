import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Video, Download, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { SESSIONS_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return SESSIONS_DETAILED.map(sess => ({ sessionId: sess.id }));
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionRecordingPage({ params }: Props) {
  const { sessionId } = await params;
  const session = SESSIONS_DETAILED.find(s => s.id === sessionId);

  if (!session) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Archival Recording &amp; Transcript"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: session.roomCode, href: `/webinars/sessions/${session.id}` },
          { label: 'Recording' }
        ]}
        icon={<Video className="w-6 h-6 text-teal-400" />}
        title={`Session Recording &amp; Transcripts • ${session.title}`}
        subtitle="High-definition stream playback, synchronized speaker slide decks, and statutory participant consent archives."
      />

      <WebinarNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Link
          href={`/webinars/sessions/${session.id}`}
          className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Session Overview</span>
        </Link>

        {/* Video Player Shell */}
        <div className="relative aspect-video rounded-3xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
            <Video className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">{session.title}</h3>
          <p className="text-xs text-slate-400 max-w-md">
            Stream Master Recorded in 1080p 60fps WebRTC with Statutory Participant Notice.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400">
              Stream High-Definition Replay
            </button>
            {session.slidesUrl && (
              <a
                href={session.slidesUrl}
                download
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Slides</span>
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
