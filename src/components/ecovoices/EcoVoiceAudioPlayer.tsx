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
  Info
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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(initiallyOpen);

  const totalSeconds = parseDurationToSeconds(release.durationFormatted);

  // Audio Context references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine base harmonic frequency based on release theme
  const getBaseFrequency = () => {
    switch (release.id) {
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

  const togglePlay = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
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

  return (
    <div className="space-y-3 w-full">
      {/* TRIGGER BUTTON (Used in card header if not already open) */}
      {!initiallyOpen && (
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${release.title}` : `Play audio stream for ${release.title}`}
            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all ${
              isPlaying
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/40 ring-4 ring-purple-500/20'
                : 'bg-purple-950/80 text-purple-300 border border-purple-500/40 hover:bg-purple-900 hover:scale-105'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          
          <div className="text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Audio Stream</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-purple-500/30 text-purple-300">
                {release.durationFormatted}
              </Badge>
              {isPlaying && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Playing Active Stream
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              {isPlaying ? `${formatSeconds(currentTime)} / ${release.durationFormatted}` : 'Click play to start audio preview'}
            </p>
          </div>
        </div>
      )}

      {/* EXPANDED PLAYER CONSOLE */}
      {(isOpen || initiallyOpen) && (
        <div className={`rounded-2xl border transition-all ${
          variant === 'full' 
            ? 'p-5 sm:p-6 bg-slate-950/90 border-purple-500/40 shadow-xl space-y-4' 
            : 'p-4 bg-purple-950/30 border-purple-500/30 space-y-3'
        }`}>
          {/* HEADER STRIP */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-purple-300">
              <Radio className={`w-4 h-4 text-purple-400 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span className="font-semibold tracking-wide">
                {isPlaying ? 'Live Audio Stream Active' : 'SufiPulse Audio Stream Engine'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">432 Hz Drone Preview</span>
            </div>

            <div className="flex items-center gap-2">
              <span data-testid="audio-timer-current" className="text-purple-300 font-bold font-mono">
                {formatSeconds(currentTime)}
              </span>
              <span className="text-slate-500">/</span>
              <span data-testid="audio-timer-total" className="text-slate-400 font-mono">
                {release.durationFormatted}
              </span>
            </div>
          </div>

          {/* MAIN CONTROLS ROW (For full variant or card variant) */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                isPlaying 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 hover:bg-purple-500' 
                  : 'bg-purple-900/80 text-purple-200 border border-purple-400/30 hover:bg-purple-800'
              }`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <button
              onClick={handleReset}
              title="Restart from beginning"
              aria-label="Restart audio from beginning"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* INTERACTIVE SEEK BAR & WAVEFORM */}
            <div className="flex-1 space-y-1.5">
              <div 
                onClick={handleSeek}
                className="h-3 w-full bg-slate-900 rounded-full overflow-hidden cursor-pointer relative group flex items-center border border-white/5"
                title="Click to seek"
              >
                {/* Progress bar background */}
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
                {/* Visual cursor */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              {/* EQUALIZER PULSE BARS */}
              <div className="h-4 w-full flex items-center gap-1 px-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isPast = (i / 36) * 100 <= progressPercent;
                  const barHeight = isPlaying 
                    ? 25 + (((i * 17) + (currentTime * 7)) % 75)
                    : 20 + ((i * 13) % 40);
                  return (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-xs transition-all duration-200 ${
                        isPast
                          ? 'bg-purple-400/80'
                          : 'bg-slate-800'
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

            {/* VOLUME CONTROL */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-slate-400 hover:text-purple-300 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
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
                className="w-16 accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                aria-label="Volume slider"
              />
            </div>
          </div>

          {/* STREAM STATUS & CANONICAL SUFIPULSE MASTER CTA */}
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2 text-slate-300">
              <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-400">
                <strong className="text-purple-300">Harmonic Soundscape:</strong> Active stream plays 432 Hz Western Himalayan ambient meditation drone. Full 320kbps vocal master recording with orchestration is hosted on canonical SufiPulse USA servers.
              </p>
            </div>

            <a
              href={release.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition-colors shadow-md shadow-purple-600/30"
            >
              <Music2 className="w-3.5 h-3.5" />
              <span>Stream Full Master on SufiPulse ({release.durationFormatted})</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
