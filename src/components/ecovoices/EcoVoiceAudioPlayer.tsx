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
  Sparkles,
  Music2,
  Info,
  Tv,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EcoVoiceRelease } from '@/data/ecovoices-catalog';

interface EcoVoiceAudioPlayerProps {
  release: EcoVoiceRelease;
  variant?: 'card' | 'full';
  initiallyOpen?: boolean;
}

// Convert "8:04" string into total seconds (484)
function parseDurationToSeconds(durationStr: string): number {
  const parts = durationStr.split(':').map(Number);
  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  }
  if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }
  return 300; // default 5 mins
}

function formatSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function EcoVoiceAudioPlayer({
  release,
  variant = 'card',
  initiallyOpen = false
}: EcoVoiceAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioConsoleOpen, setIsAudioConsoleOpen] = useState<boolean>(initiallyOpen);

  const totalSeconds = parseDurationToSeconds(release.durationFormatted);

  // Audio Context references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine base harmonic frequency based on release theme
  const getBaseFrequency = () => {
    switch (release.id) {
      case 'sheikh-noorani-father-of-sustainable-development':
        return 144; // D3 alpine grounding tone
      case 'cry-of-the-kashmir-valley':
        return 288; // D4 awakening bell harmonic
      case 'mirror-of-hazratbal-wound-of-dal':
        return 256; // C4 sacred harmonic
      case 'sufi-cry-for-a-river':
        return 192; // G3 contemplative river tone
      case 'pani-gawah-hai':
      default:
        return 216; // 432 Hz sub-harmonic water resonance
    }
  };

  // Start sound generation
  const startAudio = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Master Gain Node
      const masterGain = ctx.createGain();
      const targetVol = isMuted ? 0 : volume * 0.22; // Keep ambient & comfortable
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetVol), now + 0.8);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Multi-harmonic acoustic drone (Root, 5th, Octave, Warm Filtered Sub)
      const baseFreq = getBaseFrequency();
      const harmonics = [
        { freq: baseFreq, type: 'sine' as OscillatorType, gain: 0.4 },
        { freq: baseFreq * 1.5, type: 'triangle' as OscillatorType, gain: 0.25 },
        { freq: baseFreq * 2, type: 'sine' as OscillatorType, gain: 0.15 },
        { freq: baseFreq * 0.5, type: 'sine' as OscillatorType, gain: 0.2 }
      ];

      oscNodesRef.current = [];

      harmonics.forEach(({ freq, type, gain }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Low-pass warm resonance
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

  // Stop sound generation with smooth fade-out
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
              // Ignore already stopped
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

  // Timer interval for playback progress
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

  // Adjust volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetVol = isMuted ? 0.0001 : Math.max(0.0001, volume * 0.22);
      masterGainRef.current.gain.setValueAtTime(targetVol, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Clean up on unmount
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

  const handleReset = () => {
    setCurrentTime(0);
  };

  const videoId = release.youtubeVideoId || release.videoEmbedId;
  const thumbnailSrc = release.thumbnailUrl || release.coverImage || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');

  return (
    <div className="space-y-3.5 w-full">
      {/* ======================================================== */}
      {/* 1. PLAYABLE VIDEO & VISIBLE THUMBNAIL SCREEN */}
      {/* ======================================================== */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl group">
        {showVideo && videoId ? (
          <div className="relative w-full h-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={release.title}
              className="w-full h-full border-0 absolute inset-0 z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {/* Close Video Bar */}
            <div className="absolute top-2 right-2 z-20">
              <button
                type="button"
                onClick={handleCloseVideo}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 hover:bg-black text-white text-[11px] font-semibold border border-white/20 backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                title="Close video and show thumbnail"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Video</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Visible Thumbnail Image */}
            <img
              src={thumbnailSrc}
              alt={release.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30 group-hover:from-slate-950/95 transition-all" />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="bg-red-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                  <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Track #{release.youtubeStats?.trackNumber || release.trackOrder}</span>
                </span>
                <span className="bg-black/70 backdrop-blur-md text-slate-200 font-mono text-[10px] px-2 py-0.5 rounded border border-white/10">
                  ⏱ {release.durationFormatted}
                </span>
              </div>

              {release.youtubeStats && (
                <span className="bg-black/70 backdrop-blur-md text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded border border-white/10 hidden sm:inline-block">
                  👁 {release.youtubeStats.views} views • {release.youtubeStats.uploadedAge}
                </span>
              )}
            </div>

            {/* Central Playable Trigger */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 z-10 p-4 text-center">
              <button
                type="button"
                onClick={handlePlayVideo}
                aria-label={`Play official YouTube recording for ${release.title}`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/60 hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-white/20 group-hover:ring-red-400/50"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
              </button>
              <div className="space-y-0.5">
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow">
                  Play Official YouTube Master
                </span>
                <p className="text-[10px] text-slate-300 font-mono drop-shadow hidden sm:block">
                  Click to watch full video with high-fidelity audio
                </p>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 z-10 pointer-events-none">
              <span className="truncate pr-2 font-medium drop-shadow-md text-white">
                {release.title}
              </span>
              <span className="shrink-0 text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                SufiPulse USA
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. AUDIO & STREAM TOOLBAR */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {/* Play Video Quick Button */}
          {!showVideo && (
            <button
              type="button"
              onClick={handlePlayVideo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] shadow-sm transition-colors cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Watch Video</span>
            </button>
          )}

          {/* Toggle Ambient Drone Audio */}
          <button
            type="button"
            onClick={togglePlayAudio}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-[11px] border transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                : 'bg-slate-900 text-slate-300 border-white/10 hover:bg-slate-800'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Ambient Stream' : '432 Hz Drone Preview'}</span>
          </button>
        </div>

        {/* Video & Playlist External Links */}
        <div className="flex items-center gap-2">
          {release.youtubeStats && (
            <a
              href={release.youtubeStats.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-mono underline underline-offset-2"
            >
              <span>Playlist Track #{release.youtubeStats.trackNumber}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. EXPANDABLE AMBIENT DRONE CONSOLE (Optional) */}
      {/* ======================================================== */}
      {(isAudioConsoleOpen || isPlaying) && (
        <div className={`rounded-xl border transition-all ${
          variant === 'full' 
            ? 'p-5 bg-slate-950/90 border-purple-500/40 shadow-xl space-y-4' 
            : 'p-3.5 bg-purple-950/25 border-purple-500/25 space-y-3'
        }`}>
          {/* Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-purple-300">
              <Radio className={`w-3.5 h-3.5 text-purple-400 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span className="font-semibold tracking-wide text-[11px]">
                {isPlaying ? 'Active 432 Hz Himalayan Resonance' : 'Acoustic Drone Preview Console'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span data-testid="audio-timer-current" className="text-purple-300 font-bold font-mono text-[11px]">
                {formatSeconds(currentTime)}
              </span>
              <span className="text-slate-500">/</span>
              <span data-testid="audio-timer-total" className="text-slate-400 font-mono text-[11px]">
                {release.durationFormatted}
              </span>
            </div>
          </div>

          {/* Main Controls Row */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayAudio}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                isPlaying 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40' 
                  : 'bg-purple-900/80 text-purple-200 border border-purple-400/30 hover:bg-purple-800'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Restart from beginning"
              aria-label="Restart audio from beginning"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Seek Bar */}
            <div className="flex-1 space-y-1">
              <div 
                onClick={handleSeek}
                className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden cursor-pointer relative group flex items-center border border-white/5"
                title="Click to seek"
              >
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Equalizer Waveform */}
              <div className="h-3 w-full flex items-center gap-0.5 px-0.5">
                {Array.from({ length: 32 }).map((_, i) => {
                  const isPast = (i / 32) * 100 <= progressPercent;
                  const barHeight = isPlaying 
                    ? 25 + (((i * 17) + (currentTime * 7)) % 75)
                    : 20 + ((i * 13) % 40);
                  return (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-xs transition-all duration-200 ${
                        isPast ? 'bg-purple-400/80' : 'bg-slate-800'
                      }`}
                      style={{ 
                        height: `${barHeight}%`,
                        opacity: isPlaying ? 1 : 0.4
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2 pl-1">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-slate-400 hover:text-purple-300 transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
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
                className="w-14 accent-purple-500 cursor-pointer h-1 bg-slate-800 rounded-lg"
                aria-label="Volume slider"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
