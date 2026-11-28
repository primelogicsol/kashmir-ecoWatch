import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { ConferenceSubNav } from '@/components/webinars/ConferenceSubNav';
import { CONFERENCES_DETAILED, SESSIONS_DETAILED } from '@/data/conference-system';
import { DATASET_LICENSE_POLICIES } from '@/data/dataset-licensing-registry';

export function generateStaticParams() {
  return CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
}

interface Props {
  params: Promise<{ conferenceId: string }>;
}

export default async function ConferenceProceedingsPage({ params }: Props) {
  const { conferenceId } = await params;
  const conference =
    CONFERENCES_DETAILED.find(
      c =>
        c.id === conferenceId ||
        c.id.replace('2027', '2026') === conferenceId ||
        c.id.replace('2027', '2025') === conferenceId
    ) || CONFERENCES_DETAILED[0];

  const sessionsWithSlides = SESSIONS_DETAILED.filter(
    s => s.conferenceId === conference.id && Boolean(s.slidesUrl)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Archival Research Proceedings &amp; Post-Event Publication Policy"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Proceedings' }
        ]}
        icon={<BookOpen className="w-6 h-6 text-teal-400" />}
        title={`Proceedings Status • ${conference.title}`}
        subtitle="Future scheduled scientific conference in planning — proceedings, accepted abstracts, and archival DOIs are published only after the conference convenes and completes editorial review."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="container mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>Future Scheduled Conference — Proceedings Published Post-Convene</span>
            </span>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-white/10 font-mono">
              DOI: Not Yet Assigned (Pre-Event Planning Phase)
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white">
            No Published Proceedings Volume Exists Yet for {conference.shortTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            This event is currently in its pre-convene planning phase ({conference.dates.display}). No monograph PDF, institutional communiqué ratification, or archival DOI has been issued. Accepted papers, presentation decks, and post-event proceedings will be compiled only after sessions are conducted and author consent and review checks are completed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Proposed Schedule</div>
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{conference.dates.display}</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Published Volumes / DOIs</div>
              <div className="font-semibold text-slate-200 font-mono">0 Published (Post-Event Only)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Planned Licensing Policy</div>
              <div className="font-semibold text-emerald-300">
                {DATASET_LICENSE_POLICIES['CC-BY-NC-4.0'].shortBadge} (Author Rights Respected)
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/webinars/conferences/${conference.id}/abstracts`}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 inline-flex items-center gap-2 transition-colors"
            >
              <span>View Call for Abstracts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/webinars/conferences/${conference.id}`}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10 transition-colors"
            >
              Return to Conference Overview
            </Link>
          </div>
        </div>

        {/* Individual Paper Decks */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-white">Verified Presentation Decks &amp; Accepted Papers</h3>
          {sessionsWithSlides.length === 0 ? (
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 text-xs text-slate-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                0 presentation decks or technical papers have been archived for this future scheduled conference. Verified slide decks will appear here only after presenter authorization following the live sessions.
              </span>
            </div>
          ) : (
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
                    <span>Slide Deck (PDF)</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
