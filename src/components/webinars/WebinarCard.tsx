'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  FileText,
  Layers,
  Radio,
  Users,
  Video
} from 'lucide-react';
import { WebinarSession } from '@/data/webinars';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface WebinarCardProps {
  session: WebinarSession;
  onRegisterClick?: (session: WebinarSession) => void;
}

export function WebinarCard({ session, onRegisterClick }: WebinarCardProps) {
  const isLive = session.status === 'live';
  const isConcluded = session.status === 'concluded';
  const HeaderIcon = session.type === 'conference' ? Layers : Video;

  return (
    <div
      className={cn(
        'kew-card-shell group h-full',
        isLive && 'border-rose-500/40 shadow-xl shadow-rose-950/30'
      )}
    >
      {/* 1. ICON (top-left) + Status & Discipline badges (top-right) */}
      <div className="kew-card-top-row">
        <div
          className={cn(
            'kew-card-icon-box',
            isLive
              ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
              : session.type === 'conference'
              ? 'bg-purple-500/15 border-purple-500/30 text-purple-400'
              : 'bg-teal-500/15 border-teal-500/30 text-teal-400'
          )}
        >
          <HeaderIcon className="w-5 h-5" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <span
            className={cn(
              'px-2 py-0.5 rounded-[4px] text-[10px] font-black uppercase tracking-wider',
              session.type === 'conference'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
            )}
          >
            {session.isMultiDay ? 'Multi-Day Conference' : session.type}
          </span>
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Active Session
            </span>
          ) : isConcluded ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-slate-800 text-slate-400 border border-white/10">
              <CheckCircle2 className="w-3 h-3 text-slate-400" />
              Concluded
            </span>
          ) : session.status === 'proposed' ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Proposed (2027)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Registration Open
            </span>
          )}
        </div>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <div>
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 break-words">
          {session.discipline}
        </div>
        <Link href={`/webinars/${session.id}`} className="no-underline">
          <h3 className="kew-card-title">{session.title}</h3>
        </Link>
      </div>

      {/* 3. KPI / Date & Registration */}
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 py-2 border-y border-white/10">
        <div className="flex items-center gap-1.5 min-w-0">
          <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="break-words">{session.dateDisplay.split('•')[0].trim()}</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0 tabular-nums">
          <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{session.registeredCount === 0 ? '0 Confirmed' : `${session.registeredCount} Registered`}</span>
        </div>
      </div>

      {/* 4. DESCRIPTION */}
      <p className="kew-card-desc text-xs sm:text-sm">{session.abstract}</p>

      {/* Parallel Tracks Info */}
      {session.tracks && session.tracks.length > 0 && (
        <div className="p-3 rounded-lg bg-slate-950/70 border border-purple-500/20 text-xs">
          <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>{session.tracks.length} Parallel Symposium Halls</span>
          </div>
          <div className="space-y-1">
            {session.tracks.map((t) => (
              <div key={t.id} className="text-[11px] text-slate-400 flex items-center justify-between gap-2">
                <span className="font-medium text-slate-300 break-words">{t.name.split(':')[0]}</span>
                <span className="text-[10px] font-mono text-purple-400/80 shrink-0">{t.roomCode}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keynote Speakers Row */}
      <div className="pt-1">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Featured Scientific Faculty
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {session.speakers.map((spk) => (
            <div key={spk.id} className="flex items-center gap-2 min-w-0">
              <img
                src={spk.avatar}
                alt={spk.name}
                className="w-7 h-7 rounded-full object-cover border border-teal-500/30 shrink-0"
              />
              <div className="text-left min-w-0">
                <div className="text-xs font-semibold text-white leading-tight break-words">{spk.name}</div>
                <div className="text-[10px] text-slate-400 leading-tight break-words">{spk.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CTA — anchored near bottom */}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center gap-2">
        {isLive ? (
          <Link href={`/webinars/room/${session.id}`} className="flex-1">
            <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-500 font-bold text-white shadow-md shadow-rose-600/30">
              <Radio className="w-3.5 h-3.5 mr-1.5" />
              Join Virtual Hall
            </Button>
          </Link>
        ) : isConcluded ? (
          <Link href="/webinars/proceedings" className="flex-1">
            <Button size="sm" variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              Proceedings &amp; Video
            </Button>
          </Link>
        ) : session.status === 'proposed' ? (
          <Link href={`/webinars/${session.id}`} className="flex-1">
            <Button size="sm" className="w-full bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold border border-teal-500/30">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              Proposed Topic Dossier
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            onClick={() => (onRegisterClick ? onRegisterClick(session) : null)}
            className="flex-1 bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20"
          >
            <Award className="w-3.5 h-3.5 mr-1.5" />
            Register / Delegate Pass
          </Button>
        )}

        <Link href={`/webinars/${session.id}`}>
          <Button size="sm" variant="outline" className="border-white/15 text-slate-300 hover:bg-white/5 px-2.5">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
