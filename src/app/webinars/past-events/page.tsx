import React from 'react';
import Link from 'next/link';
import { Award, BookOpen, Clock, Download, FileText, Layers, Video } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';

export default function PastEventsPage() {
  const pastConfs = CONFERENCES_DETAILED.filter(c => c.status === 'concluded');
  const pastWebinars = SCIENTIFIC_WEBINARS.filter(w => w.status === 'concluded');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Archived Proceedings &amp; Recordings"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Past Events &amp; Archives' }
        ]}
        icon={<Award className="w-6 h-6 text-teal-400" />}
        title="Concluded Scientific Conferences &amp; Archived Proceedings"
        subtitle="Explore permanent records of concluded Western Himalayan research summits, downloadable peer-reviewed monographs, slide decks, and high-definition video archives."
      />

      <WebinarNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {pastConfs.length === 0 && pastWebinars.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                0 Concluded Events • Inaugural Program Begins May 2027
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                No Past Conferences or Archived Proceedings Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                Kashmir EcoWatch is actively preparing its inaugural 2027 Western Himalayan scientific conference program. As an authentic scientific institution, no past conferences have yet occurred or concluded. Once sessions conclude, peer-reviewed monographs, slide decks, and high-definition video archives will be indexed here under permanent Zenodo DOIs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Inaugural Summit</span>
                <span className="text-xs font-bold text-teal-300">Cryosphere 2027</span>
                <span className="text-[10px] text-slate-400 block">May 27–29, 2027</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Proceedings DOI</span>
                <span className="text-xs font-bold text-cyan-300">Zenodo Open Handle</span>
                <span className="text-[10px] text-slate-400 block">Post-Summit Deposit</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Archival Standard</span>
                <span className="text-xs font-bold text-emerald-300">Creative Commons</span>
                <span className="text-[10px] text-slate-400 block">Double-Blind Verified</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/webinars/conferences"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
              >
                View Proposed 2027 Conferences
              </Link>
              <Link
                href="/webinars/host-a-conference"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
              >
                Apply to Co-Host
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastConfs.map(conf => (
            <div key={conf.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">{conf.dates.display}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  Full Proceedings Published
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                <Link href={`/webinars/conferences/${conf.id}/proceedings`} className="hover:text-teal-300">
                  {conf.title}
                </Link>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{conf.description}</p>
              
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1 font-mono text-xs">
                <div className="text-teal-300 font-bold">DOI: {conf.proceedingsDoi}</div>
                <div className="text-slate-400 text-[11px]">{conf.registeredCount} Verified Participants • 100% Archival Retention</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/webinars/conferences/${conf.id}/proceedings`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Proceedings</span>
                </Link>
                <Link
                  href="/webinars/certificates"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10"
                >
                  Verify Certificates
                </Link>
              </div>
            </div>
          ))}

          {pastWebinars.map(web => (
            <div key={web.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">{web.dateDisplay}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-bold">
                  {web.discipline}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                <Link href={`/webinars/${web.id}`} className="hover:text-teal-300">
                  {web.title}
                </Link>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{web.abstract}</p>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1 font-mono text-xs">
                <div className="text-cyan-300 font-bold">DOI: {web.proceedingsDoi || 'Indexed in KEW Repository'}</div>
                <div className="text-slate-400 text-[11px]">Recording Available • 1080p WebRTC Stream Master</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/webinars/${web.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-teal-300 hover:bg-slate-700 border border-teal-500/30 flex items-center gap-2"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Access Dossier &amp; Recording</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
}
