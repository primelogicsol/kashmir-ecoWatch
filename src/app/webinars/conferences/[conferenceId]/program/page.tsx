import React from 'react';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { ConferenceSubNav } from '@/components/webinars/ConferenceSubNav';
import { ConferenceAgendaInteractive } from '@/components/webinars/ConferenceAgendaInteractive';
import { CONFERENCES_DETAILED, SESSIONS_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
}

interface Props {
  params: Promise<{ conferenceId: string }>;
}

export default async function ConferenceProgramPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId || c.id.replace('2027', '2026') === conferenceId || c.id.replace('2027', '2025') === conferenceId) || CONFERENCES_DETAILED[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Full Interactive Scientific Agenda"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Program & Agenda' }
        ]}
        icon={<Calendar className="w-6 h-6 text-teal-400" />}
        title={`Program Agenda • ${conference.title}`}
        subtitle="Explore detailed day-by-day schedules, filter across parallel breakout tracks, convert session times to your local timezone, and launch live video halls."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ConferenceAgendaInteractive conference={conference} />
      </main>
    </div>
  );
}
