'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ExternalLink,
  ArrowRight,
  Search,
  BookOpen,
  Microscope,
  Compass,
  Upload,
  Waves,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ECOVOICES_BIOACOUSTIC_COLLECTION,
  ACOUSTIC_CLASSIFICATION_DEFINITIONS,
  KEW_SIX_ACOUSTIC_REGIONS,
  OPEN_BIOACOUSTIC_REPOSITORIES,
  BIOACOUSTIC_ARCHIVE_SUMMARY,
  type AcousticClassification,
  type KewAcousticRegion,
  type BioacousticArchiveEntry,
} from '@/data/ecovoices-bioacoustics';

type ListeningMode = 'educational' | 'scientific';
type AvailabilityFilter = 'ALL' | 'VERIFIED' | 'PENDING';

const WAVEFORM_BIN_COUNT = 72;

function formatSeconds(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const mins = Math.floor(sec / 60);
  const rem = Math.floor(sec % 60);
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export function EcoVoicesBioacousticArchive() {
  // Filtering & Listening Mode State
  const [selectedClassification, setSelectedClassification] = useState<'ALL' | AcousticClassification>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | KewAcousticRegion>('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('ALL');
  const [listeningMode, setListeningMode] = useState<ListeningMode>('educational');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedMetadataIds, setExpandedMetadataIds] = useState<Record<string, boolean>>({});
  const [selectedCompanionById, setSelectedCompanionById] = useState<Record<string, boolean>>({});
  const [showRepositoriesPanel, setShowRepositoriesPanel] = useState<boolean>(false);

  // Genuine HTML5 + Web Audio Decoded Waveform & FFT Spectrogram State (Zero Autoplay)
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSpectrogram, setShowSpectrogram] = useState<boolean>(false);
  const [waveformCache, setWaveformCache] = useState<Record<string, number[]>>({});
  const [decodingUrl, setDecodingUrl] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const spectrogramCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const getResolvedAudioUrl = useCallback(
    (entry: BioacousticArchiveEntry): string | undefined => {
      if (entry.companionVoucher && selectedCompanionById[entry.id]) {
        return entry.companionVoucher.audioUrl;
      }
      return entry.audioUrl;
    },
    [selectedCompanionById]
  );

  // Decode genuine PCM peak envelope from real audio buffer (never fake/random bars)
  const ensureDecodedWaveform = useCallback(
    async (audioUrl: string) => {
      if (waveformCache[audioUrl]) return;
      setDecodingUrl(audioUrl);
      try {
        const res = await fetch(audioUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arrayBuf = await res.arrayBuffer();
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const offlineCtx = new AudioContextClass();
        const decoded = await offlineCtx.decodeAudioData(arrayBuf.slice(0));
        const channel = decoded.getChannelData(0);
        const blockSize = Math.max(1, Math.floor(channel.length / WAVEFORM_BIN_COUNT));
        const peaks: number[] = [];
        let maxPeak = 0.001;

        for (let i = 0; i < WAVEFORM_BIN_COUNT; i++) {
          const start = i * blockSize;
          let sumSq = 0;
          let peak = 0;
          let count = 0;
          for (let j = 0; j < blockSize && start + j < channel.length; j++) {
            const sample = Math.abs(channel[start + j]);
            if (sample > peak) peak = sample;
            sumSq += sample * sample;
            count++;
          }
          const rms = count > 0 ? Math.sqrt(sumSq / count) : 0;
          const blended = peak * 0.65 + rms * 0.35;
          if (blended > maxPeak) maxPeak = blended;
          peaks.push(blended);
        }

        const normalized = peaks.map((p) => Math.max(0.08, Math.min(1, p / maxPeak)));
        setWaveformCache((prev) => ({ ...prev, [audioUrl]: normalized }));
        await offlineCtx.close().catch(() => {});
      } catch {
        // Do not fabricate fake bars if decoding fails
      } finally {
        setDecodingUrl((prev) => (prev === audioUrl ? null : prev));
      }
    },
    [waveformCache]
  );

  // Pre-decode verified audio waveforms lazily on mount so real peak envelopes are ready on inspect
  useEffect(() => {
    let cancelled = false;
    const verifiedUrls = ECOVOICES_BIOACOUSTIC_COLLECTION.flatMap((entry) => {
      const urls: string[] = [];
      if (entry.audioUrl) urls.push(entry.audioUrl);
      if (entry.companionVoucher?.audioUrl) urls.push(entry.companionVoucher.audioUrl);
      return urls;
    });

    (async () => {
      for (const url of verifiedUrls) {
        if (cancelled) break;
        await ensureDecodedWaveform(url);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Connect Web Audio AnalyserNode to single <audio> element for optional real-time FFT Spectrogram
  const ensureAnalyserGraph = useCallback(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const source = ctx.createMediaElementSource(audioEl);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.78;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      mediaSourceRef.current = source;
      analyserRef.current = analyser;
    }
    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume();
    }
  }, []);

  // Real-time scrolling Waterfall / Frequency Spectrogram Canvas Loop
  useEffect(() => {
    if (!isPlaying || !showSpectrogram || !analyserRef.current || !spectrogramCanvasRef.current) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    const canvas = spectrogramCanvasRef.current;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const bufferLength = analyser.frequencyBinCount;
    const freqData = new Uint8Array(bufferLength);

    const drawFrame = () => {
      analyser.getByteFrequencyData(freqData);
      const w = canvas.width;
      const h = canvas.height;

      // Shift existing waterfall 2px left
      const prevImage = ctx2d.getImageData(2, 0, w - 2, h);
      ctx2d.putImageData(prevImage, 0, 0);

      // Draw newest FFT column on right edge (0 – ~11 kHz focus, lower half of Nyquist bins)
      const usableBins = Math.floor(bufferLength * 0.55);
      for (let y = 0; y < h; y++) {
        const normalizedY = 1 - y / h;
        const binIndex = Math.min(usableBins - 1, Math.floor(normalizedY * usableBins));
        const mag = freqData[binIndex]; // 0..255
        const intensity = mag / 255;

        let r = 8;
        let g = 14;
        let b = 28;
        if (intensity > 0.72) {
          r = 253;
          g = 224;
          b = 71;
        } else if (intensity > 0.45) {
          r = 245;
          g = 158;
          b = 11;
        } else if (intensity > 0.2) {
          r = 16;
          g = 185;
          b = 129;
        } else if (intensity > 0.07) {
          r = 30;
          g = 58;
          b = 95;
        }

        ctx2d.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx2d.fillRect(w - 2, y, 2, 1);
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, showSpectrogram, activeEntryId]);

  // Sync volume & mute to <audio>
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTogglePlay = async (entry: BioacousticArchiveEntry) => {
    const resolvedUrl = getResolvedAudioUrl(entry);
    if (!resolvedUrl || !audioRef.current) return;
    setPlaybackError(null);

    try {
      ensureAnalyserGraph();
      void ensureDecodedWaveform(resolvedUrl);

      const audioEl = audioRef.current;
      const currentSrcPath = audioEl.getAttribute('data-track-url');

      if (activeEntryId === entry.id && currentSrcPath === resolvedUrl) {
        if (isPlaying) {
          audioEl.pause();
          setIsPlaying(false);
        } else {
          await audioEl.play();
          setIsPlaying(true);
        }
        return;
      }

      audioEl.pause();
      audioEl.src = resolvedUrl;
      audioEl.setAttribute('data-track-url', resolvedUrl);
      audioEl.currentTime = 0;
      setActiveEntryId(entry.id);
      setCurrentTime(0);
      setDuration(0);
      await audioEl.play();
      setIsPlaying(true);
    } catch {
      setPlaybackError('Browser blocked or failed audio playback. Click Play again to retry.');
      setIsPlaying(false);
    }
  };

  const handleSwitchVoucher = async (entry: BioacousticArchiveEntry, useCompanion: boolean) => {
    setSelectedCompanionById((prev) => ({ ...prev, [entry.id]: useCompanion }));
    const nextUrl = useCompanion ? entry.companionVoucher?.audioUrl : entry.audioUrl;
    if (nextUrl) {
      void ensureDecodedWaveform(nextUrl);
    }
    if (activeEntryId === entry.id && audioRef.current && nextUrl) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = nextUrl;
      audioRef.current.setAttribute('data-track-url', nextUrl);
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (wasPlaying) {
        await audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  const handleSeek = (entry: BioacousticArchiveEntry, nextTime: number) => {
    if (activeEntryId !== entry.id || !audioRef.current) return;
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleContributeForEntry = (entry: BioacousticArchiveEntry) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('kew:ecovoices-prefill-soundscape', {
          detail: {
            targetEntryId: entry.id,
            title: entry.title,
            classification: entry.acousticClassification,
            region: entry.geographicalRegion,
            speciesCommon: entry.commonSpeciesName,
            speciesScientific: entry.scientificSpeciesName,
            habitat: entry.habitat,
            sensitiveProtected: entry.sensitiveLocationProtected,
          },
        })
      );
      const submitEl = document.getElementById('submit');
      if (submitEl) {
        submitEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ECOVOICES_BIOACOUSTIC_COLLECTION.filter((entry) => {
      if (selectedClassification !== 'ALL' && entry.acousticClassification !== selectedClassification) {
        return false;
      }
      if (selectedRegion !== 'ALL' && !entry.regionalDistribution.includes(selectedRegion)) {
        return false;
      }
      if (
        availabilityFilter === 'VERIFIED' &&
        entry.verificationStatus !== 'Verified Open-License Recording'
      ) {
        return false;
      }
      if (availabilityFilter === 'PENDING' && entry.verificationStatus !== 'Field Recording Pending') {
        return false;
      }
      if (q) {
        const haystack = [
          entry.title,
          entry.subtitle,
          entry.commonSpeciesName,
          entry.scientificSpeciesName,
          entry.soundType,
          entry.habitat,
          entry.recordingLocation,
          entry.originalRecordingId,
          entry.associatedModule.name,
          ...entry.regionalDistribution,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [selectedClassification, selectedRegion, availabilityFilter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Hidden shared HTML5 Audio Element (Zero Autoplay) */}
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      {/* ===================================================================== */}
      {/* 1. INSTITUTIONAL HEADER & DISPLAY ARCHITECTURE                        */}
      {/* ===================================================================== */}
      <div className="p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0a1022] via-[#070b16] to-[#0f1629] border border-amber-300/30 shadow-[0_20px_60px_rgba(0,0,0,0.55)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-amber-300 font-semibold">
                ECOVOICES · DEPARTMENT V
              </span>
              <span className="text-[10px] font-mono px-3 py-0.5 rounded-full bg-amber-300/15 text-amber-200 border border-amber-300/35">
                Sounds of Nature · {BIOACOUSTIC_ARCHIVE_SUMMARY.naturalCollectionCount} Natural Environments +{' '}
                {BIOACOUSTIC_ARCHIVE_SUMMARY.anthrophonyCount} Comparative Baselines
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium tracking-wide text-emerald-300">
              The Living Acoustic Heritage of the Western Himalayas
            </p>

            <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl font-semibold text-white leading-[1.1]">
              The Living Symphony of the Himalayas
            </h2>

            <p className="text-sm sm:text-base text-amber-100/90 font-medium">
              Listen to the natural world. Discover its voices. Understand its ecological significance.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              An immersive bioacoustic and environmental soundscape archive documenting the wildlife, montane forests,
              snowmelt rivers, wetlands, karst springs, atmospheric storms, and glaciers of Kashmir, Jammu, Ladakh,
              AJ&amp;K, Gilgit, and Baltistan—connected directly to Kashmir EcoWatch scientific observatories.
            </p>
          </div>

          {/* Scientific vs Educational Listening Mode Switcher */}
          <div className="flex flex-col gap-2.5 shrink-0 bg-black/50 p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
              Archive Interpretation Mode
            </span>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Listening mode selector">
              <button
                type="button"
                onClick={() => setListeningMode('educational')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  listeningMode === 'educational'
                    ? 'bg-amber-300 text-slate-950 font-bold shadow-md'
                    : 'bg-white/[0.04] text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Educational Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setListeningMode('scientific')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  listeningMode === 'scientific'
                    ? 'bg-emerald-300 text-slate-950 font-bold shadow-md'
                    : 'bg-white/[0.04] text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                <span>Scientific 18-Field</span>
              </button>
            </div>
            <span className="text-[10px] text-slate-400">
              {listeningMode === 'educational'
                ? 'Showing ecological stories, listening cues & Outdoor Classroom prompts.'
                : 'Showing full 18-field provenance, spectral bands, licenses & habitat masks.'}
            </span>
          </div>
        </div>

        {/* Scientific Integrity & Archival Provenance Disclosure Strip */}
        <div className="p-4 rounded-2xl bg-black/55 border border-emerald-400/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">Acoustic &amp; Taxonomic Integrity Standard:</span>{' '}
              <span className="text-emerald-300 font-semibold">
                {BIOACOUSTIC_ARCHIVE_SUMMARY.verifiedRecordingsCount} categories
              </span>{' '}
              feature verified openly licensed field recordings (Xeno-canto &amp; Wikimedia Commons{' '}
              <code className="text-amber-200">CC BY 4.0</code> / <code className="text-amber-200">CC BY-SA 4.0</code> /{' '}
              <code className="text-amber-200">Public Domain</code>) with genuine decoded PCM waveforms and exact
              locality disclosure.{' '}
              <span className="text-amber-200 font-semibold">
                {BIOACOUSTIC_ARCHIVE_SUMMARY.pendingRecordingsCount} categories
              </span>{' '}
              awaiting regional field capture display <span className="font-mono text-amber-300">Field recording pending</span>
              —zero artificial frequency drones or non-regional wildlife substitutes are used.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowRepositoriesPanel((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-amber-300/15 text-amber-200 border border-amber-300/30 text-[11px] font-mono shrink-0 transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showRepositoriesPanel ? 'Hide Open Sources Policy' : 'Open Sources & Licensing'}</span>
          </button>
        </div>

        {showRepositoriesPanel && (
          <div className="p-5 rounded-2xl bg-[#050811] border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300">
                Curated Bioacoustic Reference Repositories &amp; Licensing Governance
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {OPEN_BIOACOUSTIC_REPOSITORIES.map((repo) => (
                <div
                  key={repo.name}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">{repo.name}</span>
                      {repo.url.startsWith('http') ? (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-amber-300 hover:text-amber-200 inline-flex items-center gap-1"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <a
                          href={repo.url}
                          className="text-[10px] font-mono text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1"
                        >
                          <span>Contribute</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300">{repo.focus}</p>
                    <p className="text-[10px] font-mono text-amber-200/80">License: {repo.licensingPolicy}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 border-t border-white/10 pt-1.5">{repo.kewAdoptionRule}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. THREE SOUNDSCAPE ECOLOGY PILLARS (BIOPHONY · GEOPHONY · ANTHROPHONY)*/}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACOUSTIC_CLASSIFICATION_DEFINITIONS.map((pillar) => {
          const isSelected = selectedClassification === pillar.id;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() =>
                setSelectedClassification((prev) => (prev === pillar.id ? 'ALL' : pillar.id))
              }
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-[#0e162e] border-amber-300/65 shadow-[0_10px_30px_rgba(251,191,36,0.12)]'
                  : 'bg-[#080c18]/90 border-white/10 hover:border-amber-300/35'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${pillar.accentBadgeClass}`}>
                    {pillar.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{pillar.etymology}</span>
                </div>
                <p className="text-xs font-semibold text-white leading-snug">{pillar.shortTagline}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.scientificDefinition}</p>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-amber-200/90">
                  {isSelected ? 'Filter Active — Click to Show All' : `Filter ${pillar.title}`}
                </span>
                <ArrowRight className="w-3 h-3 text-amber-300" />
              </div>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* 3. PRIMARY FILTER CONTROLS (CLASSIFICATION · 6 REGIONS · SEARCH)      */}
      {/* ===================================================================== */}
      <div className="p-5 rounded-2xl bg-[#080c18]/95 border border-white/10 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Primary Soundscape Ecology Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Soundscape classification filter">
            {[
              { id: 'ALL', label: `All Sounds (${BIOACOUSTIC_ARCHIVE_SUMMARY.totalCollectionEnvironments})` },
              { id: 'Biophony', label: `Biophony (${BIOACOUSTIC_ARCHIVE_SUMMARY.biophonyCount})` },
              { id: 'Geophony', label: `Geophony (${BIOACOUSTIC_ARCHIVE_SUMMARY.geophonyCount})` },
              { id: 'Anthrophony', label: `Anthrophony (${BIOACOUSTIC_ARCHIVE_SUMMARY.anthrophonyCount})` },
            ].map((tab) => {
              const active = selectedClassification === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedClassification(tab.id as 'ALL' | AcousticClassification)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-300 text-slate-950 font-bold shadow-sm'
                      : 'bg-white/[0.05] text-slate-200 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Availability Filter + Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              aria-label="Filter by recording verification status"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as AvailabilityFilter)}
              className="bg-black/65 border border-white/15 rounded-full px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-300/60"
            >
              <option value="ALL">All Statuses ({BIOACOUSTIC_ARCHIVE_SUMMARY.totalCollectionEnvironments})</option>
              <option value="VERIFIED">
                Verified Audio Available ({BIOACOUSTIC_ARCHIVE_SUMMARY.verifiedRecordingsCount})
              </option>
              <option value="PENDING">
                Field Recording Pending ({BIOACOUSTIC_ARCHIVE_SUMMARY.pendingRecordingsCount})
              </option>
            </select>

            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search species, river, XC ID..."
                aria-label="Search Western Himalayan soundscapes"
                className="w-full bg-black/65 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-300/60"
              />
            </div>
          </div>
        </div>

        {/* Six Western Himalayan Regions Filter Strip */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mr-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-300" />
            <span>Six-Region Scope:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedRegion('ALL')}
            className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
              selectedRegion === 'ALL'
                ? 'bg-emerald-300 text-slate-950 font-bold'
                : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            All 6 Regions
          </button>
          {KEW_SIX_ACOUSTIC_REGIONS.map((reg) => {
            const active = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                title={reg.representativeLandscapes}
                onClick={() => setSelectedRegion((prev) => (prev === reg.id ? 'ALL' : reg.id))}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
                  active
                    ? 'bg-emerald-300 text-slate-950 font-bold'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {reg.label}
              </button>
            );
          })}
        </div>
      </div>

      {playbackError && (
        <div
          role="alert"
          className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-400/40 text-xs text-rose-200"
        >
          {playbackError}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. BIOACOUSTIC ARCHIVE GRID                                           */}
      {/* ===================================================================== */}
      {filteredEntries.length === 0 ? (
        <div className="p-10 rounded-3xl bg-[#080c18]/85 border border-white/10 text-center space-y-3">
          <Waves className="w-8 h-8 text-amber-300 mx-auto" />
          <p className="text-sm font-semibold text-white">No acoustic environments match your current filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedClassification('ALL');
              setSelectedRegion('ALL');
              setAvailabilityFilter('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-full bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Reset Soundscape Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => {
            const isVerified = entry.verificationStatus === 'Verified Open-License Recording';
            const usingCompanion = Boolean(entry.companionVoucher && selectedCompanionById[entry.id]);
            const resolvedUrl = getResolvedAudioUrl(entry);
            const waveformBins = resolvedUrl ? waveformCache[resolvedUrl] : undefined;
            const isThisActive = activeEntryId === entry.id;
            const isThisPlaying = isThisActive && isPlaying;
            const progressRatio =
              isThisActive && duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
            const isMetadataExpanded =
              listeningMode === 'scientific' || Boolean(expandedMetadataIds[entry.id]);

            const classificationPillClass =
              entry.acousticClassification === 'Biophony'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-400/40'
                : entry.acousticClassification === 'Geophony'
                  ? 'bg-sky-950/90 text-sky-200 border-sky-400/40'
                  : 'bg-rose-950/90 text-rose-200 border-rose-400/40';

            return (
              <article
                key={entry.id}
                className={`rounded-3xl overflow-hidden border transition-all flex flex-col justify-between ${
                  isThisPlaying
                    ? 'bg-[#0c1326] border-amber-300/75 shadow-[0_18px_50px_rgba(251,191,36,0.16)]'
                    : 'bg-[#080c18]/92 border-white/10 hover:border-amber-300/35'
                }`}
              >
                <div>
                  {/* Visual Banner */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-65"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-[#080c18]/45 to-black/35" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/80 text-slate-200 border border-white/15">
                          {entry.catalogNumber}
                        </span>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${classificationPillClass}`}>
                          {entry.acousticClassification} · {entry.soundSubcategory}
                        </span>
                      </div>

                      {isVerified ? (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/95 text-emerald-200 border border-emerald-400/45 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Verified · {usingCompanion ? entry.companionVoucher?.license : entry.license}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/95 text-amber-200 border border-amber-300/40 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-300" />
                          <span>Field recording pending</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom Title Overlay */}
                    <div className="absolute bottom-3.5 left-4 right-4 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-amber-200/90">
                        <span>
                          {usingCompanion
                            ? entry.companionVoucher?.speciesCommon
                            : entry.commonSpeciesName}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="italic text-slate-300">
                          {usingCompanion
                            ? entry.companionVoucher?.speciesScientific
                            : entry.scientificSpeciesName}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white leading-tight">
                        {entry.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed">{entry.subtitle}</p>

                    {/* Regional Tags + Sensitive Coordinates Shield */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {entry.regionalDistribution.map((reg) => (
                        <span
                          key={reg}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/10"
                        >
                          {reg}
                        </span>
                      ))}
                      {entry.sensitiveLocationProtected && (
                        <span
                          title={entry.protectionReason}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-amber-950/80 text-amber-200 border border-amber-400/35 inline-flex items-center gap-1"
                        >
                          <ShieldAlert className="w-3 h-3 text-amber-300" />
                          <span>Sensitive Habitat Coordinates Masked</span>
                        </span>
                      )}
                    </div>

                    {/* ========================================================= */}
                    {/* GENUINE AUDIO PLAYER & DECODED WAVEFORM (VERIFIED ONLY)   */}
                    {/* ========================================================= */}
                    {isVerified && resolvedUrl ? (
                      <div className="p-4 rounded-2xl bg-black/60 border border-emerald-400/25 space-y-3.5">
                        {/* Companion Voucher Switcher (when multiple verified vouchers exist) */}
                        {entry.companionVoucher && (
                          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/10">
                            <span className="text-[10px] font-mono text-slate-400 mr-1">Field Voucher:</span>
                            <button
                              type="button"
                              onClick={() => void handleSwitchVoucher(entry, false)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${
                                !usingCompanion
                                  ? 'bg-amber-300 text-slate-950 font-bold'
                                  : 'bg-white/[0.05] text-slate-300 hover:bg-white/10'
                              }`}
                            >
                              Voucher A · Myophonus caeruleus (05:41 Dawn)
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleSwitchVoucher(entry, true)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${
                                usingCompanion
                                  ? 'bg-amber-300 text-slate-950 font-bold'
                                  : 'bg-white/[0.05] text-slate-300 hover:bg-white/10'
                              }`}
                            >
                              Voucher B · Trochalopteron lineatum (Shimla)
                            </button>
                          </div>
                        )}

                        {/* Primary Transport Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => void handleTogglePlay(entry)}
                              aria-label={isThisPlaying ? `Pause ${entry.title}` : `Play ${entry.title}`}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                isThisPlaying
                                  ? 'bg-amber-300 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.45)]'
                                  : 'bg-emerald-300 hover:bg-emerald-200 text-slate-950 font-bold'
                              }`}
                            >
                              {isThisPlaying ? (
                                <Pause className="w-4 h-4 fill-current" />
                              ) : (
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              )}
                            </button>

                            <div>
                              <div className="text-[11px] font-semibold text-white">
                                {isThisPlaying ? 'Playing Authentic Field Voucher' : 'Listen to Verified Field Voucher'}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400">
                                {isThisActive
                                  ? `${formatSeconds(currentTime)} / ${formatSeconds(duration)}`
                                  : `Duration ${usingCompanion ? entry.companionVoucher?.duration : entry.duration} · Zero Autoplay`}
                              </div>
                            </div>
                          </div>

                          {/* Volume + Mute + Live Spectrogram Toggle */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setIsMuted((prev) => !prev)}
                              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 text-slate-200 cursor-pointer"
                            >
                              {isMuted || volume === 0 ? (
                                <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                              )}
                            </button>
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.05}
                              value={isMuted ? 0 : volume}
                              onChange={(e) => {
                                const v = parseFloat(e.target.value);
                                setVolume(v);
                                if (v > 0 && isMuted) setIsMuted(false);
                              }}
                              aria-label={`Volume for ${entry.title}`}
                              className="w-16 accent-amber-300 cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSpectrogram((prev) => !prev)}
                              aria-pressed={showSpectrogram}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono inline-flex items-center gap-1 cursor-pointer border transition-colors ${
                                showSpectrogram
                                  ? 'bg-amber-300 text-slate-950 font-bold border-amber-200'
                                  : 'bg-white/[0.05] text-slate-200 border-white/10 hover:border-amber-300/40'
                              }`}
                            >
                              <Activity className="w-3 h-3" />
                              <span>Spectrogram</span>
                            </button>
                          </div>
                        </div>

                        {/* Genuine Decoded PCM Waveform Envelope */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span>Decoded PCM Amplitude Envelope ({WAVEFORM_BIN_COUNT} sample blocks)</span>
                            <span>
                              {usingCompanion
                                ? entry.companionVoucher?.originalRecordingId
                                : entry.originalRecordingId}
                            </span>
                          </div>

                          {waveformBins ? (
                            <div
                              className="h-12 px-2 py-1.5 rounded-xl bg-[#050811] border border-white/10 flex items-center gap-[2px] cursor-pointer"
                              onClick={(e) => {
                                if (!isThisActive || duration <= 0) return;
                                const rect = e.currentTarget.getBoundingClientRect();
                                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                handleSeek(entry, ratio * duration);
                              }}
                              title={
                                isThisActive
                                  ? 'Click anywhere along the decoded waveform to seek'
                                  : 'Decoded from actual audio file samples — press Play to scrub'
                              }
                            >
                              {waveformBins.map((amp, idx) => {
                                const binRatio = idx / waveformBins.length;
                                const passed = isThisActive && binRatio <= progressRatio;
                                return (
                                  <span
                                    key={idx}
                                    className={`flex-1 rounded-full transition-colors ${
                                      passed
                                        ? 'bg-amber-300'
                                        : isThisPlaying
                                          ? 'bg-emerald-400/55'
                                          : 'bg-slate-600/75'
                                    }`}
                                    style={{ height: `${Math.round(amp * 100)}%` }}
                                  />
                                );
                              })}
                            </div>
                          ) : (
                            <div className="h-12 rounded-xl bg-[#050811] border border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-400">
                              {decodingUrl === resolvedUrl
                                ? 'Decoding authentic PCM audio buffer...'
                                : 'Ready to decode authentic PCM waveform on demand'}
                            </div>
                          )}

                          {/* Accessible Keyboard Scrub Slider */}
                          <input
                            type="range"
                            min={0}
                            max={isThisActive && duration > 0 ? duration : 100}
                            step={0.1}
                            disabled={!isThisActive || duration <= 0}
                            value={isThisActive ? currentTime : 0}
                            onChange={(e) => handleSeek(entry, parseFloat(e.target.value))}
                            aria-label={`Seek position for ${entry.title}`}
                            className="w-full accent-amber-300 cursor-pointer disabled:opacity-40"
                          />
                        </div>

                        {/* Optional Real-Time FFT Spectrogram Canvas */}
                        {showSpectrogram && isThisActive && (
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-amber-200/90">
                              <span>Live FFT Time-Frequency Spectrogram (0 – 11 kHz)</span>
                              <span>{isThisPlaying ? 'Sampling AnalyserNode' : 'Paused'}</span>
                            </div>
                            <canvas
                              ref={spectrogramCanvasRef}
                              width={420}
                              height={88}
                              className="w-full h-22 rounded-xl bg-[#050811] border border-amber-300/25"
                            />
                          </div>
                        )}

                        {/* Provenance Transparency Note */}
                        <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/10 pt-2">
                          <span className="text-emerald-300 font-semibold">Provenance Note:</span>{' '}
                          {entry.provenanceScopeNote}
                        </p>
                      </div>
                    ) : (
                      /* ======================================================= */
                      /* HONEST "FIELD RECORDING PENDING" PANEL (NO FAKE AUDIO)  */
                      /* ======================================================= */
                      <div className="p-4 rounded-2xl bg-black/45 border border-amber-300/20 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-amber-200 font-semibold inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-300" />
                            <span>Field recording pending · No synthetic audio attached</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleContributeForEntry(entry)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Contribute Verified Recording</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {entry.provenanceScopeNote}
                        </p>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* EDUCATIONAL MODE vs SCIENTIFIC 18-FIELD METADATA VIEW     */}
                    {/* ========================================================= */}
                    {listeningMode === 'educational' && (
                      <div className="space-y-3 pt-1">
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {entry.educationalNarrative}
                        </p>
                        <div className="p-3.5 rounded-2xl bg-emerald-950/25 border border-emerald-400/20 space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                            Ecological &amp; Outdoor Classroom Inquiry
                          </span>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {entry.outdoorClassroomPrompt}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Toggleable or Scientific-Mode 18-Field Schema Drawer */}
                    <div className="pt-1">
                      {listeningMode === 'educational' && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMetadataIds((prev) => ({
                              ...prev,
                              [entry.id]: !prev[entry.id],
                            }))
                          }
                          className="text-[11px] font-mono text-amber-200 hover:text-amber-100 inline-flex items-center gap-1 cursor-pointer"
                        >
                          {isMetadataExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" />
                              <span>Hide 18-Field Bioacoustic Metadata</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" />
                              <span>Inspect 18-Field Bioacoustic Metadata &amp; License</span>
                            </>
                          )}
                        </button>
                      )}

                      {isMetadataExpanded && (
                        <div className="mt-2.5 p-4 rounded-2xl bg-[#050811]/95 border border-white/10 space-y-3 text-[11px]">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                              Standardized 18-Field Bioacoustic Metadata Record
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">
                              {entry.originalRecordingId}
                            </span>
                          </div>

                          <p className="text-slate-300 leading-relaxed">
                            <span className="text-white font-semibold">Bioacoustic Significance:</span>{' '}
                            {entry.scientificSignificance}
                          </p>

                          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[10px] text-amber-200">
                            Spectral Profile: {entry.frequencyBandProfile}
                          </div>

                          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">1. Common Name</dt>
                              <dd className="text-slate-200">{entry.commonSpeciesName}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">2. Scientific Name</dt>
                              <dd className="text-slate-200 italic">{entry.scientificSpeciesName}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">3. Acoustic Classification</dt>
                              <dd className="text-slate-200">{entry.acousticClassification}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">4. Sound Type</dt>
                              <dd className="text-slate-200">{entry.soundType}</dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-slate-500 font-mono text-[10px]">5. Recording Location</dt>
                              <dd className="text-slate-200">{entry.recordingLocation}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">6. Geographical Region</dt>
                              <dd className="text-slate-200">
                                {entry.geographicalRegion} ({entry.regionalDistribution.join(', ')})
                              </dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">7. Habitat</dt>
                              <dd className="text-slate-200">{entry.habitat}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">8. Elevation</dt>
                              <dd className="text-slate-200">{entry.elevation}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">9. Date &amp; Time</dt>
                              <dd className="text-slate-200">{entry.recordingDateTime}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">10. Season</dt>
                              <dd className="text-slate-200">{entry.season}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">11. Duration</dt>
                              <dd className="text-slate-200">{entry.duration}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">12. Equipment / Notes</dt>
                              <dd className="text-slate-200">{entry.recordingEquipment}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">13. Recorder Credit</dt>
                              <dd className="text-slate-200">{entry.recorderCredit}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">14. Source Repository</dt>
                              <dd className="text-slate-200">
                                {entry.sourceUrl ? (
                                  <a
                                    href={entry.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 underline"
                                  >
                                    <span>{entry.sourceRepository}</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ) : (
                                  entry.sourceRepository
                                )}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">15. Original Recording ID</dt>
                              <dd className="text-slate-200 font-mono">{entry.originalRecordingId}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">16. License</dt>
                              <dd className="text-slate-200">
                                {entry.licenseUrl ? (
                                  <a
                                    href={entry.licenseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1 underline"
                                  >
                                    <span>{entry.license}</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ) : (
                                  entry.license
                                )}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">17. Verification Status</dt>
                              <dd className="text-slate-200">{entry.verificationStatus}</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 font-mono text-[10px]">18. Associated KEW Module</dt>
                              <dd className="text-emerald-300">{entry.associatedModule.name}</dd>
                            </div>
                          </dl>

                          {entry.sensitiveLocationProtected && entry.protectionReason && (
                            <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-400/30 text-[10px] text-amber-200">
                              <span className="font-bold">Sensitive Wildlife Protection Policy:</span>{' '}
                              {entry.protectionReason}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Associated KEW Scientific Module Link */}
                <div className="px-5 sm:px-6 py-3.5 border-t border-white/10 bg-black/35 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    KEW {entry.associatedModule.domain} Observatory
                  </span>
                  <Link
                    href={entry.associatedModule.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                  >
                    <span>{entry.associatedModule.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. FIELD BIOACOUSTICS CALL TO CONTRIBUTORS BANNER                     */}
      {/* ===================================================================== */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0a1324] via-[#0d162a] to-[#131024] border border-emerald-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-300">
            KEW Contributor Observatory · Bioacoustic Field Intake
          </span>
          <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
            Contribute Authentic Western Himalayan Field Recordings
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ornithologists, bioacousticians, wildlife photographers, hydrologists, field investigators, and citizen
            scientists across Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit, and Baltistan can submit verified,
            openly licensed WAV/FLAC/MP3 field recordings through the unified EcoVoices submission gateway below.
          </p>
        </div>

        <a
          href="#submit"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('kew:ecovoices-prefill-soundscape', {
                  detail: {
                    title: '',
                    classification: 'Biophony',
                    region: 'Kashmir',
                  },
                })
              );
            }
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs shadow-md shrink-0 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Submit Field Recording</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
