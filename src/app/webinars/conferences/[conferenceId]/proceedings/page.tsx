import React from 'react';
import { notFound } from 'next/navigation';
import { BookOpen, Download, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
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

export default async function ConferenceProceedingsPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId || c.id.replace('2027', '2026') === conferenceId || c.id.replace('2027', '2025') === conferenceId) || CONFERENCES_DETAILED[0];

  const sessionsWithSlides = SESSIONS_DETAILED.filter(s => s.conferenceId === conference.id && s.slidesUrl);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Archival Research Proceedings &amp; DOI Registry"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Proceedings' }
        ]}
        icon={<BookOpen className="w-6 h-6 text-teal-400" />}
        title={`Published Proceedings • ${conference.title}`}
        subtitle="Peer-reviewed conference monograph, session abstracts, downloadable presentation decks, and registered Zenodo DOI citations."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-teal-400 font-bold">
              DOI: {conference.proceedingsDoi || 'Registered with Zenodo'}
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Open Access CC-BY 4.0
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">Full Conference Compendium (Monograph Edition)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Contains all keynote transcripts, accepted technical paper pre-prints, high-resolution satellite cartography, and the Western Himalayan Water Security Communiqué ratified by participating institutions.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              <span>Download Full Volume (PDF • 48 MB)</span>
            </button>
            <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10">
              Copy BibTeX Citation
            </button>
          </div>
        </div>

        {/* Individual Paper Decks */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-white">Downloadable Presentation Decks &amp; Papers</h3>
          <div className="space-y-3">
            {sessionsWithSlides.map(s => (
              <div key={s.id} className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-white">{s.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Presenter: {s.speakers.map(sp => sp.name).join(', ')} • {s.trackName}</div>
                </div>
                <a
                  href={s.slidesUrl}
                  download
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3 h-3" />
                  <span>Slide Deck (PDF)</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
