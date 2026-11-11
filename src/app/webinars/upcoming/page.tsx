import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Layers, Users, Video, ArrowRight, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';

export default function UpcomingEventsPage() {
  const upcomingConfs = CONFERENCES_DETAILED.filter(c => c.status === 'upcoming' || c.status === 'proposed');
  const upcomingWebinars = SCIENTIFIC_WEBINARS.filter(w => w.status === 'upcoming' || w.status === 'proposed');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Scheduled Academic Calendar"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Upcoming Events' }
        ]}
        icon={<Calendar className="w-6 h-6 text-teal-400" />}
        title="Upcoming Scientific Conferences & Webinars"
        subtitle="Advance schedule of verified Himalayan environmental symposia, specialized technical webinars, and multi-track academic summits."
      />

      <WebinarNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Conferences Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Multi-Day Scientific Conferences</span>
            </h2>
            <Link href="/webinars/conferences" className="text-xs text-teal-400 hover:underline">
              View All Conferences &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingConfs.map(conf => (
              <div key={conf.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-teal-300">{conf.dates.display}</span>
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 text-[10px] font-bold">
                    {conf.tracks.length} Parallel Tracks
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  <Link href={`/webinars/conferences/${conf.id}`} className="hover:text-teal-300">
                    {conf.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">{conf.theme}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Host: {conf.hostInstitution.shortName}</span>
                  <Link
                    href={`/webinars/conferences/${conf.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                  >
                    Conference Dossier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Individual Webinars Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-teal-400" />
              <span>Technical Lectures &amp; Roundtables</span>
            </h2>
            <Link href="/webinars/calendar" className="text-xs text-teal-400 hover:underline">
              Calendar Directory &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingWebinars.map(web => (
              <div key={web.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-teal-300">{web.dateDisplay}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-bold">
                    {web.discipline}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  <Link href={`/webinars/${web.id}`} className="hover:text-teal-300">
                    {web.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">{web.abstract}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{web.registeredCount === 0 ? '0 Confirmed' : `${web.registeredCount} Registered`}</span>
                  <Link
                    href={`/webinars/${web.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-teal-300 hover:bg-slate-700 border border-teal-500/30"
                  >
                    Dossier &amp; Pass
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
