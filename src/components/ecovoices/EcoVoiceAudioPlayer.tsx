'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Radio,
  RotateCcw,
  Tv,
  X,
} from 'lucide-react';
import { EcoVoiceRelease } from '@/data/ecovoices-catalog';

interface EcoVoiceAudioPlayerProps {
  release: EcoVoiceRelease;
  variant?: 'card' | 'full';
  initiallyOpen?: boolean;
}

function parseDurationToSeconds(durationStr: string): number {
  const parts = durationStr.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 300;
}

function formatSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function EcoVoiceAudioPlayer({
  release,
  variant = 'card',
  initiallyOpen = false,
}: EcoVoiceAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioConsoleOpen, setIsAudioConsoleOpen] = useState<boolean>(initiallyOpen);

  const totalSeconds = parseDurationToSeconds(release.durationFormatted);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getBaseFrequency = () => {
    switch (release.id) {
      case 'sheikh-noorani-father-of-sustainable-development':
        return 144;
      case 'cry-of-the-kashmir-valley':
        return 288;
      case 'mirror-of-hazratbal-wound-of-dal':
        return 256;
      case 'sufi-cry-for-a-river':
        return 192;
      case 'kashmir-how-long-will-you-remain-silent':
        return 174;
      case 'pani-gawah-hai':
      default:
        return 216;
    }
  };

  const startAudio = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      const targetVol = isMuted ? 0 : volume * 0.22;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetVol), now + 0.8);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const baseFreq = getBaseFrequency();
      const harmonics = [
        { freq: baseFreq, type: 'sine' as OscillatorType, gain: 0.4 },
        { freq: baseFreq * 1.5, type: 'triangle' as OscillatorType, gain: 0.25 },
        { freq: baseFreq * 2, type: 'sine' as OscillatorType, gain: 0.15 },
        { freq: baseFreq * 0.5, type: 'sine' as OscillatorType, gain: 0.2 },
      ];

      oscNodesRef.current = [];

      harmonics.forEach(({ freq, type, gain }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, now);
        filter.Q.setValueAtTime(2.0, now);

        oscGain.gain.setValueAtTime(gain, now);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        oscNodesRef.current.push(osc);
      });

      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio synthesis initialization warning:', err);
    }
  };

  const stopAudio = () => {
    try {
      if (audioCtxRef.current && masterGainRef.current) {
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

        setTimeout(() => {
          oscNodesRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          oscNodesRef.current = [];
        }, 550);
      }
      setIsPlaying(false);
    } catch (err) {
      console.warn('Audio stop warning:', err);
      setIsPlaying(false);
    }
  };

  const togglePlayAudio = () => {
    if (!isAudioConsoleOpen) {
      setIsAudioConsoleOpen(true);
    }
    if (isPlaying) {
      stopAudio();
    } else {
      if (showVideo) {
        setShowVideo(false);
      }
      startAudio();
    }
  };

  const handlePlayVideo = () => {
    if (isPlaying) {
      stopAudio();
    }
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            stopAudio();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetVol = isMuted ? 0.0001 : Math.max(0.0001, volume * 0.22);
      masterGainRef.current.gain.setValueAtTime(targetVol, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const progressPercent = Math.min(100, (currentTime / totalSeconds) * 100);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(Math.floor(ratio * totalSeconds));
  };

  const handleSeekKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentTime((prev) => Math.min(totalSeconds, prev + 10));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentTime((prev) => Math.max(0, prev - 10));
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
  };

  const videoId = release.youtubeVideoId || release.videoEmbedId;
  const thumbnailSrc =
    release.thumbnailUrl ||
    release.coverImage ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');

  return (
    <div className="space-y-3.5 w-full">
      {/* 1. CINEMA VIDEO & ARTWORK SCREEN */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-300/20 bg-[#05070f] shadow-[0_18px_45px_rgba(0,0,0,0.65)] group">
        {showVideo && videoId ? (
          <div className="relative w-full h-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={release.title}
              className="w-full h-full border-0 absolute inset-0 z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div className="absolute top-2.5 right-2.5 z-20">
              <button
                type="button"
                onClick={handleCloseVideo}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 hover:bg-black text-amber-100 text-[11px] font-semibold border border-amber-300/30 backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                aria-label="Close video player and return to composition artwork"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Screening</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={thumbnailSrc}
              alt={`${release.title} — ${release.artistCredit || 'SufiPulse USA'}`}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/45 to-black/35 group-hover:from-[#05070f]/95 transition-all" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="bg-black/75 backdrop-blur-md text-amber-200 font-mono font-semibold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-300/30 tracking-wider uppercase">
                  Master #{release.youtubeStats?.trackNumber || release.trackOrder}
                </span>
                <span className="bg-black/75 backdrop-blur-md text-slate-200 font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-white/15">
                  {release.durationFormatted}
                </span>
              </div>

              <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-200 font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-400/30 hidden sm:inline-block">
                Published Master
              </span>
            </div>

            {/* Central Playable Trigger */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 z-10 p-4 text-center">
              <button
                type="button"
                onClick={handlePlayVideo}
                aria-label={`Play official master video for ${release.title}`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-200 to-yellow-100 hover:from-amber-200 hover:to-white text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.45)] hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-amber-200/25"
              >
                <Play className="w-7 h-7 ml-1 fill-slate-950" />
              </button>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-amber-100 tracking-wide bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-300/25 shadow">
                  Screen Official Master Recording
                </span>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-slate-300 z-10 pointer-events-none">
              <span className="truncate pr-2 font-[family-name:var(--font-ecovoices-serif)] italic text-sm text-amber-100 drop-shadow-md">
                {release.artistCredit || 'Dr. Zarf-e-Noori · SufiPulse USA'}
              </span>
              <span className="shrink-0 text-[10px] font-mono text-amber-200/90 bg-black/70 px-2.5 py-0.5 rounded-full border border-amber-300/25">
                {release.catalogCode}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. ACCESSIBLE MEDIA CONTROLS TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {!showVideo && (
            <button
              type="button"
              onClick={handlePlayVideo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-[11px] shadow-sm transition-colors cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Screen Master Video</span>
            </button>
          )}

          <button
            type="button"
            onClick={togglePlayAudio}
            aria-pressed={isPlaying}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-[11px] border transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-amber-400/20 text-amber-200 border-amber-300/60 shadow-md shadow-amber-500/15'
                : 'bg-white/[0.04] text-slate-200 border-white/15 hover:border-amber-300/35 hover:text-amber-100'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Acoustic Resonance' : '432 Hz Harmonic Preview'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {release.youtubeStats && (
            <a
              href={release.youtubeStats.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-200/80 hover:text-amber-100 font-mono underline underline-offset-4"
            >
              <span>YouTube Master #{release.youtubeStats.trackNumber}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* 3. EXPANDABLE WEB AUDIO HARMONIC CONSOLE */}
      {(isAudioConsoleOpen || isPlaying) && (
        <div
          className={`rounded-2xl border transition-all ${
            variant === 'full'
              ? 'p-5 bg-[#070a16]/95 border-amber-300/30 shadow-xl space-y-4'
              : 'p-3.5 bg-[#080c1a]/90 border-amber-300/20 space-y-3'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-200">
              <Radio className={`w-3.5 h-3.5 text-amber-300 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span className="font-semibold tracking-wide text-[11px]">
                {isPlaying
                  ? 'Active Himalayan Harmonic Resonance (Web Audio Synthesis)'
                  : 'Contemplative Drone Preview Console'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span data-testid="audio-timer-current" className="text-amber-200 font-bold font-mono text-[11px]">
                {formatSeconds(currentTime)}
              </span>
              <span className="text-slate-500">/</span>
              <span data-testid="audio-timer-total" className="text-slate-400 font-mono text-[11px]">
                {release.durationFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayAudio}
              aria-label={isPlaying ? `Pause resonance preview for ${release.title}` : `Play resonance preview for ${release.title}`}
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform cursor-pointer ${
                isPlaying
                  ? 'bg-amber-300 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-amber-300/15 text-amber-200 border border-amber-300/35 hover:bg-amber-300/25'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Restart from beginning"
              aria-label="Restart audio from beginning"
              className="p-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex-1 space-y-1">
              <div
                role="slider"
                tabIndex={0}
                aria-label={`Seek position for ${release.title}`}
                aria-valuemin={0}
                aria-valuemax={totalSeconds}
                aria-valuenow={currentTime}
                onClick={handleSeek}
                onKeyDown={handleSeekKeyDown}
                className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden cursor-pointer relative group flex items-center border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
                title="Click or use Left/Right arrow keys to seek"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-300 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="h-3 w-full flex items-center gap-0.5 px-0.5" aria-hidden="true">
                {Array.from({ length: 32 }).map((_, i) => {
                  const isPast = (i / 32) * 100 <= progressPercent;
                  const barHeight = isPlaying
                    ? 25 + ((i * 17 + currentTime * 7) % 75)
                    : 20 + ((i * 13) % 40);
                  return (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-xs transition-all duration-200 ${
                        isPast ? 'bg-amber-300/85' : 'bg-slate-800'
                      }`}
                      style={{
                        height: `${barHeight}%`,
                        opacity: isPlaying ? 1 : 0.45,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-1">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                className="text-slate-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 accent-amber-300 cursor-pointer h-1 bg-slate-800 rounded-lg"
                aria-label="Volume slider"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
