'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers,
  Radio,
  Share2,
  ShieldCheck,
  Users,
  Video
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { RegistrationModal } from '@/components/webinars/RegistrationModal';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WebinarDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const session = SCIENTIFIC_WEBINARS.find(s => s.id === resolvedParams.id || s.slug === resolvedParams.id);

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  if (!session) {
    return notFound();
  }

  const isLive = session.status === 'live';
  const isConcluded = session.status === 'concluded';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label={`${session.type.toUpperCase()} DOSSIER • ${session.discipline}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Scientific Webinars', href: '/webinars' },
          { label: session.title }
        ]}
        icon={<Video className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                {session.type}
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                {session.title}
              </span>
            </div>
          </div>
        }
        subtitle={session.abstract}
        images={[
          session.bannerImage || '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {isLive ? (
              <Link href={`/webinars/room/${session.id}`}>
                <Button size="sm" className="bg-rose-600 hover:bg-rose-500 font-bold text-white shadow-md shadow-rose-600/30">
                  <Radio className="w-4 h-4 mr-1.5 animate-pulse" />
                  Enter Live Virtual Hall
                </Button>
              </Link>
            ) : isConcluded ? (
              <Link href="/webinars/proceedings">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                  <FileText className="w-4 h-4 mr-1.5" />
                  View Published Proceedings
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                onClick={() => setIsRegModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20"
              >
                <Award className="w-4 h-4 mr-1.5" />
                Register for Delegate Pass
              </Button>
            )}

            <Link href="/webinars/calendar">
              <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                <Calendar className="w-4 h-4 mr-1.5 text-teal-400" />
                All Calendar Sessions
              </Button>
            </Link>
          </div>
        }
      />

      <WebinarNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Main Grid: Details + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Agenda, Tracks, Materials */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scientific Abstract */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white">Scientific Framework &amp; Abstract</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {session.abstract}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-slate-400">Co-Hosted By:</span>
                {session.coHosts.map((host, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded text-xs bg-white/5 border border-white/5 text-slate-300">
                    {host}
                  </span>
                ))}
              </div>
            </div>

            {/* Parallel Tracks (if multi-day conference) */}
            {session.tracks && session.tracks.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-6">
                <div>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Multi-Day Parallel Symposium Structure</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Parallel Breakout Halls &amp; Thematic Sessions</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Participants can fluidly navigate between these simultaneous virtual rooms during the conference.
                  </p>
                </div>

                <div className="space-y-4">
                  {session.tracks.map((track) => (
                    <div key={track.id} className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{track.name}</h4>
                        <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">
                          {track.roomCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{track.theme}</p>
                      <div className="text-xs text-slate-400 font-mono">Session Chair: {track.chair}</div>

                      <div className="border-t border-white/5 pt-2 space-y-1.5">
                        {track.sessions.map((s, sidx) => (
                          <div key={sidx} className="text-xs flex items-center justify-between text-slate-300">
                            <span>{s.time} &bull; <strong className="text-white">{s.title}</strong> ({s.speaker})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Agenda */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-400" />
                Comprehensive Program Agenda
              </h3>

              <div className="space-y-4">
                {session.agenda.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row items-start gap-4">
                    <span className="px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold whitespace-nowrap">
                      {item.time}
                    </span>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                      <p className="text-xs text-teal-400 font-medium">{item.speaker} &bull; <span className="text-slate-400">{item.affiliation}</span></p>
                      {item.description && (
                        <p className="text-xs text-slate-400 leading-relaxed pt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Committee & Keynotes */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                Keynote Faculty &amp; Scientific Chairs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {session.speakers.map((spk) => (
                  <div key={spk.id} className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={spk.avatar} alt={spk.name} className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/30" />
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{spk.name}</h4>
                        <div className="text-xs text-teal-400 leading-tight mt-0.5">{spk.title}</div>
                        <div className="text-[11px] text-slate-400">{spk.institution}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{spk.bio}</p>
                    {spk.orcid && (
                      <div className="text-[11px] font-mono text-emerald-400 pt-1 border-t border-white/5">
                        ORCID: {spk.orcid}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card & Room Access */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-teal-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Session Telemetry
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300">
                  {session.roomCode}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Date &amp; Time</span>
                  <span className="font-bold text-white text-right">{session.dateDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Registered Delegates</span>
                  <span className="font-bold text-teal-400 font-mono">{session.registeredCount} / {session.maxCapacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Certificate Units</span>
                  <span className="font-bold text-emerald-400 font-mono">18.0 Academic Hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Platform Protocol</span>
                  <span className="font-bold text-slate-200 font-mono">WebRTC TLS Encrypted</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2.5">
                {isLive ? (
                  <Link href={`/webinars/room/${session.id}`} className="block">
                    <Button className="w-full bg-rose-600 hover:bg-rose-500 font-bold text-white shadow-lg shadow-rose-600/30">
                      <Radio className="w-4 h-4 mr-2 animate-pulse" />
                      Enter Virtual Hall Now
                    </Button>
                  </Link>
                ) : isConcluded ? (
                  <Link href="/webinars/proceedings" className="block">
                    <Button className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white">
                      <FileText className="w-4 h-4 mr-2" />
                      View Archival Video
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => setIsRegModalOpen(true)}
                    className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Register / Delegate Pass
                  </Button>
                )}

                <Link href="/webinars/create" className="block">
                  <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:bg-white/5 text-xs">
                    Propose Working Paper
                  </Button>
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verified participants receive authenticated digital certificates signed by Kashmir EcoWatch and Dr. Kumar Foundation USA.</span>
              </div>
            </div>

            {/* Presentation Materials Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Symposium Materials &amp; Pre-prints
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="truncate text-slate-200">Kolahoi-InSAR-Differencing.pdf</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="truncate text-slate-200">Plenary-Slide-Deck-Farooq.pdf</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        session={session}
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
      />
    </div>
  );
}
