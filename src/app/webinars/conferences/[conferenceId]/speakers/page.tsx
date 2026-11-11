import React from 'react';
import { notFound } from 'next/navigation';
import { Users, ExternalLink, Award } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { ConferenceSubNav } from '@/components/webinars/ConferenceSubNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
}

interface Props {
  params: Promise<{ conferenceId: string }>;
}

export default async function ConferenceSpeakersPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId || c.id.replace('2027', '2026') === conferenceId || c.id.replace('2027', '2025') === conferenceId) || CONFERENCES_DETAILED[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Keynote Faculty &amp; Invited Presenters"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Speakers' }
        ]}
        icon={<Users className="w-6 h-6 text-teal-400" />}
        title={`Faculty &amp; Speakers • ${conference.shortTitle}`}
        subtitle="Distinguished glaciologists, remote sensing geophysicists, agro-hydrologists, and environmental jurists presenting at this conference."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conference.featuredSpeakers.map(spk => (
            <div key={spk.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-300 font-bold text-base flex items-center justify-center">
                  {spk.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{spk.name}</h4>
                  <div className="text-xs text-teal-300">{spk.title}</div>
                  <div className="text-[11px] text-slate-400">{spk.institution}</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{spk.bio}</p>
              {spk.orcid && (
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 border-t border-white/5 pt-2">
                  <Award className="w-3 h-3" />
                  <span>ORCID: {spk.orcid}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
