import React from 'react';
import { notFound } from 'next/navigation';
import { LiveConferenceRoom } from '@/components/webinars/LiveConferenceRoom';
import { SESSIONS_DETAILED, CONFERENCES_DETAILED } from '@/data/conference-system';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';

export function generateStaticParams() {
  return SESSIONS_DETAILED.map(sess => ({ sessionId: sess.id }));
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionLiveHallPage({ params }: Props) {
  const { sessionId } = await params;
  const session = SESSIONS_DETAILED.find(s => s.id === sessionId);

  if (!session) notFound();

  // Find underlying webinar session format for WebRTC controller
  const webinarLike = SCIENTIFIC_WEBINARS.find(w => w.id === session.conferenceId || w.id.replace('2027', '2026') === session.conferenceId) || SCIENTIFIC_WEBINARS[0];

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 h-screen w-screen overflow-hidden bg-slate-950 flex flex-col">
      <LiveConferenceRoom session={webinarLike} />
    </div>
  );
}
