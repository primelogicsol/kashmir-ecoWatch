'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Layers, 
  Radio, 
  Search, 
  Users, 
  FileText, 
  Download, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { 
  ConferenceDetailed, 
  ConferenceSessionDetailed, 
  formatTimeWithTimezone, 
  SESSIONS_DETAILED 
} from '@/data/conference-system';
import { TimezoneSelector } from './TimezoneSelector';

interface Props {
  conference: ConferenceDetailed;
  sessions?: ConferenceSessionDetailed[];
}

export function ConferenceAgendaInteractive({ conference, sessions = SESSIONS_DETAILED }: Props) {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('IST');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const confSessions = sessions.filter(s => s.conferenceId === conference.id);

  // Filtered sessions
  const filteredSessions = confSessions.filter(session => {
    if (session.dayNumber !== selectedDay) return false;
    if (selectedTrack !== 'all' && session.trackId !== selectedTrack) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = session.title.toLowerCase().includes(q);
      const matchSpeaker = session.speakers.some(sp => sp.name.toLowerCase().includes(q));
      const matchAbstract = session.abstract.toLowerCase().includes(q);
      if (!matchTitle && !matchSpeaker && !matchAbstract) return false;
    }
    return true;
  });

  const activeDailyTheme = conference.dailyThemes.find(d => d.dayNumber === selectedDay);

  return (
    <div className="space-y-6">
      {/* Top Controls: Day Tabs & Timezone */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
        {/* Days selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {conference.dailyThemes.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                selectedDay === day.dayNumber
                  ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-white/5 hover:border-teal-500/30'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day {day.dayNumber} ({day.date ? day.date.split(',')[0] : `Day ${day.dayNumber}`})</span>
            </button>
          ))}
        </div>

        {/* Timezone & Quick Info */}
        <div className="flex items-center gap-3">
          <TimezoneSelector 
            selectedTimezone={selectedTimezone} 
            onSelectTimezone={setSelectedTimezone} 
          />
        </div>
      </div>

      {/* Daily Theme Banner */}
      {activeDailyTheme && (
        <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 p-4 sm:p-5 rounded-2xl border border-teal-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-wider mb-1">
                <span>Day {activeDailyTheme.dayNumber} Keynote Focus</span>
                <span>•</span>
                <span>{activeDailyTheme.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{activeDailyTheme.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{activeDailyTheme.highlight}</p>
            </div>
            {conference.status === 'live' && (
              <Link
                href="/webinars/room/kew-conf-2027-cryo"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 shrink-0 transition-transform active:scale-95"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Join Day {selectedDay} Plenary Live</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Secondary Filter Bar: Parallel Tracks & Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Track filter */}
        <div className="md:col-span-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-teal-400" />
            <span>Tracks:</span>
          </span>
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedTrack === 'all'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
            }`}
          >
            All Tracks ({confSessions.filter(s => s.dayNumber === selectedDay).length})
          </button>
          {conference.tracks.map((track) => {
            const count = confSessions.filter(s => s.dayNumber === selectedDay && s.trackId === track.id).length;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedTrack === track.id
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                {(track.name || '').split('·')[0]} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search papers, speakers, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-white/5">
            <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-300">No scheduled sessions match the selected filters.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the track filter or changing the conference day.</p>
            <button
              onClick={() => { setSelectedTrack('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-teal-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-slate-900/70 border border-white/10 hover:border-teal-500/30 rounded-2xl p-5 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Time & Session Meta */}
                <div className="lg:w-48 shrink-0">
                  <div className="flex items-center gap-1.5 text-teal-300 font-mono text-xs font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{formatTimeWithTimezone(session.timeDisplay ? session.timeDisplay.split(' ')[0] : '09:30', selectedTimezone)}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">{session.timeDisplay}</div>
                  <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/5">
                    <Layers className="w-3 h-3 text-teal-400" />
                    <span>{session.roomCode}</span>
                  </div>
                  {session.status === 'live' && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        Live in Hall
                      </span>
                    </div>
                  )}
                </div>

                {/* Session Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {session.sessionType}
                    </span>
                    <span className="text-xs text-slate-400">
                      {session.trackName}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white hover:text-teal-300 transition-colors">
                    <Link href={`/webinars/sessions/${session.id}`}>
                      {session.title}
                    </Link>
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {session.abstract}
                  </p>

                  {/* Speakers & Affiliations */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {session.speakers.map((spk) => (
                      <div key={spk.id} className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-white/5">
                        <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[10px] font-bold text-teal-300">
                          {spk.name.charAt(0)}
                        </div>
                        <div className="text-[11px]">
                          <span className="text-white font-medium">{spk.name}</span>
                          <span className="text-slate-400 text-[10px] ml-1.5">({spk.institution})</span>
                        </div>
                      </div>
                    ))}
                    {session.moderator && (
                      <div className="text-[11px] text-slate-400 italic">
                        Moderated by: <span className="text-slate-300">{session.moderator.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Room Launch */}
                <div className="lg:w-44 shrink-0 flex flex-col gap-2 pt-2 lg:pt-0">
                  {session.status === 'live' ? (
                    <Link
                      href={`/webinars/sessions/${session.id}/live`}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all"
                    >
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span>Enter Live Room</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/webinars/sessions/${session.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                    >
                      <span>Session Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {session.slidesUrl && (
                    <a
                      href={session.slidesUrl}
                      download
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/20 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Slide Deck (PDF)</span>
                    </a>
                  )}

                  <div className="text-center text-[10px] text-slate-400 font-mono">
                    {session.attendeesCount} Registered • {session.questionsCount} Q&A
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
