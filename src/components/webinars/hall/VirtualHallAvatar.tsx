'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Hand, Mic, MicOff, MonitorUp, ShieldCheck, Sparkles, User } from 'lucide-react';
import { HallRole } from '@/types/virtual-hall';
import { cn } from '@/lib/utils';

export function getInitials(name: string): string {
  const cleaned = name
    .replace(/\(.*?\)/g, '')
    .replace(/\b(Prof\.|Dr\.|Er\.|Mr\.|Ms\.|Mrs\.)\s*/gi, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'KE';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const ROLE_BADGE_STYLES: Record<HallRole, string> = {
  platform_admin: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
  institutional_admin: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
  host: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
  moderator: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
  technical_producer: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
  speaker: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
  delegate: 'bg-slate-700/60 text-slate-200 border-slate-500/40',
  observer: 'bg-slate-800/70 text-slate-300 border-slate-600/40',
};

const ROLE_SHORT_LABELS: Record<HallRole, string> = {
  platform_admin: 'Admin',
  institutional_admin: 'Inst. Host',
  host: 'Host',
  moderator: 'Moderator',
  technical_producer: 'Producer',
  speaker: 'Speaker',
  delegate: 'Delegate',
  observer: 'Observer',
};

interface VirtualHallTileProps {
  name: string;
  affiliation: string;
  role: HallRole;
  isLocal?: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing?: boolean;
  isHandRaised?: boolean;
  isSpotlighted?: boolean;
  isVerifiedIdentity?: boolean;
  isDemoPlaceholder?: boolean;
  audioLevel?: number;
  videoStream?: MediaStream | null;
  mirrored?: boolean;
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}

export function VirtualHallParticipantTile({
  name,
  affiliation,
  role,
  isLocal = false,
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing = false,
  isHandRaised = false,
  isSpotlighted = false,
  isVerifiedIdentity = false,
  isDemoPlaceholder = false,
  audioLevel = 0,
  videoStream = null,
  mirrored = false,
  compact = false,
  onClick,
  className,
}: VirtualHallTileProps) {
  const videoElRef = useRef<HTMLVideoElement | null>(null);

  const bindVideoRef = useCallback(
    (el: HTMLVideoElement | null) => {
      videoElRef.current = el;
      if (!el) return;
      if (videoStream && el.srcObject !== videoStream) {
        el.srcObject = videoStream;
        el.play().catch(() => {});
      } else if (!videoStream && el.srcObject) {
        el.srcObject = null;
      }
    },
    [videoStream]
  );

  useEffect(() => {
    const el = videoElRef.current;
    if (!el) return;
    if (videoStream && el.srcObject !== videoStream) {
      el.srcObject = videoStream;
    }
    if (videoStream && el.paused) {
      el.play().catch(() => {});
    }
  }, [videoStream, isVideoEnabled]);

  const initials = getInitials(name);
  const isSpeakingLoud = isAudioEnabled && audioLevel > 8;

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-xl bg-[#0b1526] border overflow-hidden flex items-center justify-center transition-all group',
        isSpeakingLoud
          ? 'border-emerald-400 ring-2 ring-emerald-400/30'
          : isSpotlighted
          ? 'border-teal-400/80 ring-1 ring-teal-400/30'
          : 'border-slate-800 hover:border-slate-700',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {isVideoEnabled && videoStream ? (
        <video
          ref={bindVideoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className={cn('w-full h-full object-cover', mirrored && '-scale-x-100')}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-3 text-center select-none">
          <div
            className={cn(
              'rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 border border-teal-500/30 flex items-center justify-center font-bold text-teal-200 shadow-inner relative',
              compact ? 'w-11 h-11 text-xs' : 'w-16 h-16 sm:w-20 sm:h-20 text-lg sm:text-xl'
            )}
          >
            <span>{initials}</span>
            <User className="w-3 h-3 text-slate-400/70 absolute -bottom-0.5 -right-0.5 bg-slate-900 rounded-full p-0.5 border border-slate-700" />
          </div>
          {!compact && (
            <div className="mt-2.5 max-w-[220px]">
              <div className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
                {name} {isLocal ? '(You)' : ''}
              </div>
              <div className="text-[11px] text-slate-400 truncate">{affiliation}</div>
            </div>
          )}
        </div>
      )}

      {/* Top Badges */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
        <div className="flex items-center gap-1 flex-wrap">
          <span
            className={cn(
              'px-1.5 py-0.5 rounded text-[10px] font-semibold border backdrop-blur-md',
              ROLE_BADGE_STYLES[role]
            )}
          >
            {ROLE_SHORT_LABELS[role]}
          </span>
          {isVerifiedIdentity && (
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5"
              title="Server-verified identity"
            >
              <ShieldCheck className="w-2.5 h-2.5" />
            </span>
          )}
          {isSpotlighted && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-teal-950/85 text-teal-300 border border-teal-500/40 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              {!compact && <span>Spotlight</span>}
            </span>
          )}
          {isDemoPlaceholder && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-950/90 text-amber-300 border border-amber-500/40">
              LAYOUT PREVIEW
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isScreenSharing && (
            <span className="px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 text-[10px] flex items-center gap-1">
              <MonitorUp className="w-3 h-3" />
            </span>
          )}
          {isHandRaised && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/90 text-slate-950 font-bold text-[10px] flex items-center gap-0.5 shadow">
              <Hand className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>

      {/* Bottom Nameplate & Real Audio Indicator */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold text-white truncate">
            {name} {isLocal ? '(You)' : ''}
          </div>
          {compact && <div className="text-[9px] text-slate-400 truncate">{affiliation}</div>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {isAudioEnabled ? (
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-mono">
              <Mic className="w-3 h-3" />
              {audioLevel > 0 && <span>{Math.min(100, Math.round(audioLevel))}%</span>}
            </span>
          ) : (
            <MicOff className="w-3 h-3 text-rose-400" />
          )}
        </div>
      </div>
    </div>
  );
}
