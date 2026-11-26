import React from 'react';
import { notFound } from 'next/navigation';
import { SCIENTIFIC_WEBINARS, WebinarSession } from '@/data/webinars';
import { CONFERENCES_DETAILED } from '@/data/conference-system';
import { LiveConferenceRoom } from '@/components/webinars/LiveConferenceRoom';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const ids = new Set<string>(SCIENTIFIC_WEBINARS.map((w) => w.id));
  for (const c of CONFERENCES_DETAILED) ids.add(c.id);
  return Array.from(ids).map((id) => ({ id }));
}

export default async function VirtualConferenceRoomPage({ params }: Props) {
  const { id } = await params;
  let session: WebinarSession | undefined = SCIENTIFIC_WEBINARS.find((w) => w.id === id);

  if (!session) {
    const conf = CONFERENCES_DETAILED.find((c) => c.id === id);
    if (conf) {
      session = {
        id: conf.id,
        title: conf.title,
        slug: conf.slug,
        type: 'conference',
        status: conf.status,
        isMultiDay: conf.dates.daysCount > 1,
        dateDisplay: conf.dates.display,
        startDate: conf.dates.start,
        endDate: conf.dates.end,
        timeZone: 'IST (UTC+05:30)',
        discipline: 'Forest Ecology',
        abstract: conf.description,
        agenda: conf.dailyThemes.map((d) => ({
          time: d.date,
          title: d.title,
          speaker: conf.hostInstitution.shortName,
          affiliation: conf.hostInstitution.name,
          description: d.highlight,
        })),
        speakers: conf.featuredSpeakers,
        coHosts: conf.coHosts,
        registeredCount: conf.registeredCount,
        maxCapacity: 10,
        roomCode: conf.tracks[0]?.roomCode || conf.id.toUpperCase(),
        proceedingsDoi: conf.proceedingsDoi,
        featured: true,
        bannerImage: conf.bannerImage,
      };
    }
  }

  if (!session) {
    notFound();
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-full max-w-full overflow-hidden bg-[#060d18]">
      <LiveConferenceRoom session={session} />
    </div>
  );
}
