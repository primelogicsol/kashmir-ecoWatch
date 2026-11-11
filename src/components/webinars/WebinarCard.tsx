'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
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

  return (
    <div className={cn(
      'group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden',
      isLive 
        ? 'bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-950 border-rose-500/40 shadow-xl shadow-rose-950/30'
        : 'bg-slate-900/50 hover:bg-slate-900/80 border-white/10 hover:border-teal-500/40'
    )}>
      {/* Top Banner & Status Bar */}
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={cn(
              'px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider',
              session.type === 'conference' 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
            )}>
              {session.isMultiDay ? 'Multi-Day Conference' : session.type}
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              {session.discipline}
            </span>
          </div>

          <div>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Active Session
              </span>
            ) : isConcluded ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-white/5">
                <CheckCircle2 className="w-3 h-3 text-slate-500" />
                Concluded
              </span>
            ) : session.status === 'proposed' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Proposed (2027)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Registration Open
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link href={`/webinars/${session.id}`} className="group-hover:text-teal-300 transition-colors">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2 mb-3">
            {session.title}
          </h3>
        </Link>

        {/* Abstract */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-5">
          {session.abstract}
        </p>

        {/* Parallel Tracks Info (if conference) */}
        {session.tracks && session.tracks.length > 0 && (
          <div className="mb-5 p-3 rounded-xl bg-slate-950/70 border border-purple-500/20 text-xs">
            <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>{session.tracks.length} Parallel Symposium Halls</span>
            </div>
            <div className="space-y-1">
              {session.tracks.map(t => (
                <div key={t.id} className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="font-medium text-slate-300 truncate max-w-[200px]">{t.name.split(':')[0]}</span>
                  <span className="text-[10px] font-mono text-purple-400/80">{t.roomCode}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Keynote Speakers Row */}
        <div className="border-t border-white/5 pt-4 mb-4">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Featured Scientific Faculty
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {session.speakers.map((spk) => (
              <div key={spk.id} className="flex items-center gap-2">
                <img
                  src={spk.avatar}
                  alt={spk.name}
                  className="w-7 h-7 rounded-full object-cover border border-teal-500/30"
                />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white leading-none">{spk.name}</div>
                  <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[140px]">{spk.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info & Action Bar */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 py-3 border-t border-white/5 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">{session.dateDisplay.split('•')[0].trim()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{session.registeredCount === 0 ? '0 Confirmed' : `${session.registeredCount} Registered`}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLive ? (
            <Link href={`/webinars/room/${session.id}`} className="flex-1">
              <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-500 font-bold text-white shadow-md shadow-rose-600/30">
                <Radio className="w-3.5 h-3.5 mr-1.5" />
                Join Virtual Hall
              </Button>
            </Link>
          ) : isConcluded ? (
            <Link href={`/webinars/proceedings`} className="flex-1">
              <Button size="sm" variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                Proceedings &amp; Video
              </Button>
            </Link>
          ) : session.status === 'proposed' ? (
            <Link href={`/webinars/${session.id}`} className="flex-1">
              <Button
                size="sm"
                className="w-full bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold border border-teal-500/30"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                Proposed Topic Dossier
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              onClick={() => onRegisterClick ? onRegisterClick(session) : null}
              className="flex-1 bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20"
            >
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Register / Delegate Pass
            </Button>
          )}

          <Link href={`/webinars/${session.id}`}>
            <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 px-2.5">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
