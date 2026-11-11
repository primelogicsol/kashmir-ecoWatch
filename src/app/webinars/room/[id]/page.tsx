'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { LiveConferenceRoom } from '@/components/webinars/LiveConferenceRoom';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WebinarRoomPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const session = SCIENTIFIC_WEBINARS.find(
    s => s.id === resolvedParams.id || s.slug === resolvedParams.id || s.roomCode.toLowerCase() === resolvedParams.id.toLowerCase() || s.id.replace('2027', '2026') === resolvedParams.id
  ) || SCIENTIFIC_WEBINARS[0]; // fallback to premier cryosphere summit

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 h-screen w-screen overflow-hidden bg-slate-950 flex flex-col">
      <LiveConferenceRoom session={session} />
    </div>
  );
}
