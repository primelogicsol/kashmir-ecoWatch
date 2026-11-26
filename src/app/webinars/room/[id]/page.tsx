import React from 'react';
import { notFound } from 'next/navigation';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { LiveConferenceRoom } from '@/components/webinars/LiveConferenceRoom';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return SCIENTIFIC_WEBINARS.map((w) => ({ id: w.id }));
}

export default async function VirtualConferenceRoomPage({ params }: Props) {
  const { id } = await params;
  const session = SCIENTIFIC_WEBINARS.find((w) => w.id === id);

  if (!session) {
    notFound();
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#060d18]">
      <LiveConferenceRoom session={session} />
    </div>
  );
}
