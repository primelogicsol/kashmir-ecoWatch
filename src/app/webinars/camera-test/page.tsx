'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, Mic, MicOff, Video, VideoOff, RefreshCw, Download, 
  CheckCircle2, XCircle, AlertTriangle, Activity, Settings, Info, Play, Square 
} from 'lucide-react';

interface DiagnosticLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR' | 'EVENT' | 'WARN';
  title: string;
  details?: any;
}

interface FrameStats {
  totalFrames: number;
  fps: number;
  lastFrameTime: number;
  isMoving: boolean;
  pixelDelta: number;
}

export default function CameraDiagnosticPage() {
  // Device enumeration
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');
  const [selectedAudioId, setSelectedAudioId] = useState<string>('');

  // Mode: video-only | audio-only | combined
  const [captureMode, setCaptureMode] = useState<'video-only' | 'audio-only' | 'combined'>('video-only');
  
  // Active streams
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  // Status & Metrics
  const [isCapturingVideo, setIsCapturingVideo] = useState(false);
  const [isCapturingAudio, setIsCapturingAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<{ name: string; message: string; constraint?: string; stack?: string } | null>(null);
  
  // Real-time Track States
  const [activeVideoSettings, setActiveVideoSettings] = useState<MediaTrackSettings | null>(null);
  const [activeVideoCapabilities, setActiveVideoCapabilities] = useState<any>(null);
  const [activeVideoTrackInfo, setActiveVideoTrackInfo] = useState<{ id: string; label: string; readyState: string; muted: boolean; enabled: boolean } | null>(null);
  const [activeAudioTrackInfo, setActiveAudioTrackInfo] = useState<{ id: string; label: string; readyState: string; muted: boolean; enabled: boolean } | null>(null);

  // Audio level meter
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioMeterAnimRef = useRef<number | null>(null);

  // Frame progression analysis
  const [frameStats, setFrameStats] = useState<FrameStats>({
    totalFrames: 0,
    fps: 0,
    lastFrameTime: 0,
    isMoving: false,
    pixelDelta: 0
  });

  // Diagnostics Event Log
  const [logs, setLogs] = useState<DiagnosticLog[]>([]);

  // DOM Refs
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCallbackIdRef = useRef<number | null>(null);
  const prevFrameDataRef = useRef<Uint8ClampedArray | null>(null);
  const frameCountRef = useRef<number>(0);
  const lastFpsCalcTimeRef = useRef<number>(Date.now());
  const framesSinceLastCalcRef = useRef<number>(0);

  const addLog = useCallback((type: DiagnosticLog['type'], title: string, details?: any) => {
    const entry: DiagnosticLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      type,
      title,
      details
    };
    setLogs(prev => [entry, ...prev.slice(0, 199)]);
    console.log(`[CameraTest ${type}] ${title}`, details || '');
  }, []);

  // Enumerate hardware devices
  const refreshDevices = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) {
      addLog('ERROR', 'MediaDevices API not supported in this browser.');
      return;
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const vDevs = devices.filter(d => d.kind === 'videoinput');
      const aDevs = devices.filter(d => d.kind === 'audioinput');

      setVideoDevices(vDevs);
      setAudioDevices(aDevs);

      // Auto-select preferred devices if not already selected
      if (!selectedVideoId && vDevs.length > 0) {
        // Look for EMEET first
        const emeet = vDevs.find(d => d.label.toLowerCase().includes('emeet') || d.label.toLowerCase().includes('c950'));
        if (emeet) {
          setSelectedVideoId(emeet.deviceId);
        } else {
          setSelectedVideoId(vDevs[0].deviceId);
        }
      }
      if (!selectedAudioId && aDevs.length > 0) {
        setSelectedAudioId(aDevs[0].deviceId);
      }

      addLog('INFO', `Discovered ${vDevs.length} camera(s) and ${aDevs.length} microphone(s)`, {
        videoDevices: vDevs.map(d => ({ label: d.label || '(Permission needed)', deviceId: d.deviceId })),
        audioDevices: aDevs.map(d => ({ label: d.label || '(Permission needed)', deviceId: d.deviceId }))
      });
    } catch (err: any) {
      addLog('ERROR', 'Failed to enumerate devices', { error: err.message });
    }
  }, [addLog, selectedVideoId, selectedAudioId]);

  useEffect(() => {
    refreshDevices();
  }, [refreshDevices]);

  // Frame Progression & Motion Analysis Loop
  const startFrameInspection = useCallback((videoEl: HTMLVideoElement) => {
    let active = true;

    const checkFrame = (now: DOMHighResTimeStamp, metadata?: any) => {
      if (!active || !videoEl) return;

      frameCountRef.current += 1;
      framesSinceLastCalcRef.current += 1;

      // Calculate instantaneous FPS every 1000ms
      const currentTime = Date.now();
      const timeDiff = currentTime - lastFpsCalcTimeRef.current;
      if (timeDiff >= 1000) {
        const currentFps = Math.round((framesSinceLastCalcRef.current * 1000) / timeDiff);
        lastFpsCalcTimeRef.current = currentTime;
        framesSinceLastCalcRef.current = 0;

        // Perform lightweight pixel difference check using offscreen canvas to verify real video frames
        let pixelDelta = 0;
        let isMoving = false;
        try {
          if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
            canvasRef.current.width = 64;
            canvasRef.current.height = 48;
          }
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx && videoEl.videoWidth > 0) {
            ctx.drawImage(videoEl, 0, 0, 64, 48);
            const imgData = ctx.getImageData(0, 0, 64, 48).data;
            if (prevFrameDataRef.current) {
              let diff = 0;
              for (let i = 0; i < imgData.length; i += 4) {
                diff += Math.abs(imgData[i] - prevFrameDataRef.current[i]);
              }
              pixelDelta = Math.round(diff / (64 * 48));
              isMoving = pixelDelta > 1; // Any slight lighting or motion change
            }
            prevFrameDataRef.current = new Uint8ClampedArray(imgData);
          }
        } catch (e) {
          // ignore canvas read errors
        }

        setFrameStats({
          totalFrames: frameCountRef.current,
          fps: currentFps,
          lastFrameTime: currentTime,
          isMoving,
          pixelDelta
        });
      }

      if ('requestVideoFrameCallback' in videoEl) {
        // @ts-ignore
        videoEl.requestVideoFrameCallback(checkFrame);
      } else {
        frameCallbackIdRef.current = requestAnimationFrame(() => checkFrame(performance.now()));
      }
    };

    if ('requestVideoFrameCallback' in videoEl) {
      // @ts-ignore
      videoEl.requestVideoFrameCallback(checkFrame);
    } else {
      frameCallbackIdRef.current = requestAnimationFrame(() => checkFrame(performance.now()));
    }

    return () => {
      active = false;
      if (frameCallbackIdRef.current) {
        cancelAnimationFrame(frameCallbackIdRef.current);
      }
    };
  }, []);

  // Stop video capture cleanly
  const stopVideo = useCallback((cooldownMs = 0) => {
    if (videoStream) {
      addLog('INFO', `Stopping video stream with ${videoStream.getVideoTracks().length} track(s)`);
      videoStream.getVideoTracks().forEach(t => {
        try {
          t.stop();
          addLog('EVENT', `Track ${t.label} stopped. (readyState=${t.readyState})`);
        } catch (e: any) {
          addLog('WARN', 'Error stopping track', e.message);
        }
      });
      setVideoStream(null);
    }
    if (videoElRef.current) {
      videoElRef.current.srcObject = null;
    }
    setIsCapturingVideo(false);
    setActiveVideoSettings(null);
    setActiveVideoCapabilities(null);
    setActiveVideoTrackInfo(null);
    setFrameStats({ totalFrames: 0, fps: 0, lastFrameTime: 0, isMoving: false, pixelDelta: 0 });

    if (cooldownMs > 0) {
      addLog('INFO', `Enforcing ${cooldownMs}ms cooldown for OS driver release...`);
      return new Promise(r => setTimeout(r, cooldownMs));
    }
    return Promise.resolve();
  }, [videoStream, addLog]);

  // Stop audio capture cleanly
  const stopAudio = useCallback(() => {
    if (audioStream) {
      audioStream.getAudioTracks().forEach(t => {
        try { t.stop(); } catch {}
      });
      setAudioStream(null);
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
    if (audioMeterAnimRef.current) {
      cancelAnimationFrame(audioMeterAnimRef.current);
    }
    setIsCapturingAudio(false);
    setActiveAudioTrackInfo(null);
    setAudioLevel(0);
    addLog('INFO', 'Audio capture stopped');
  }, [audioStream, addLog]);

  // Setup WebAudio meter
  const setupAudioMeter = useCallback((stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.frequencyBinCount);
      const updateMeter = () => {
        analyser.getByteFrequencyData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          sum += buffer[i];
        }
        const avg = sum / buffer.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);
        audioMeterAnimRef.current = requestAnimationFrame(updateMeter);
      };
      updateMeter();
    } catch (e: any) {
      addLog('WARN', 'WebAudio meter setup failed', e.message);
    }
  }, [addLog]);

  // Start Capture with arbitrary constraints
  const startCapture = async (customConstraints?: MediaStreamConstraints) => {
    setIsLoading(true);
    setLastError(null);

    const requestId = Math.random().toString(36).substring(2, 8);
    const startTime = performance.now();

    // Determine constraints
    let constraints: MediaStreamConstraints;
    if (customConstraints) {
      constraints = customConstraints;
    } else {
      const videoConstraint: MediaTrackConstraints | boolean = 
        captureMode === 'audio-only' 
          ? false 
          : selectedVideoId 
            ? { deviceId: { exact: selectedVideoId } }
            : true;

      const audioConstraint: MediaTrackConstraints | boolean = 
        captureMode === 'video-only' 
          ? false 
          : selectedAudioId 
            ? { deviceId: { exact: selectedAudioId } }
            : true;

      constraints = {
        video: videoConstraint,
        audio: audioConstraint
      };
    }

    addLog('INFO', `[Req #${requestId}] Calling navigator.mediaDevices.getUserMedia()`, {
      requestedConstraints: constraints,
      mode: captureMode,
      targetVideoDevice: selectedVideoId
    });

    try {
      // 1. Stop existing tracks first
      if (constraints.video) {
        await stopVideo(250);
      }
      if (constraints.audio) {
        stopAudio();
      }

      // 2. Invoke getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const elapsed = Math.round(performance.now() - startTime);

      addLog('SUCCESS', `[Req #${requestId}] getUserMedia succeeded in ${elapsed}ms`, {
        videoTrackCount: stream.getVideoTracks().length,
        audioTrackCount: stream.getAudioTracks().length
      });

      // Handle Video Track
      const vTrack = stream.getVideoTracks()[0];
      if (vTrack) {
        setVideoStream(stream);
        setIsCapturingVideo(true);

        const settings = vTrack.getSettings ? vTrack.getSettings() : {};
        const capabilities = vTrack.getCapabilities ? vTrack.getCapabilities() : {};
        setActiveVideoSettings(settings);
        setActiveVideoCapabilities(capabilities);
        setActiveVideoTrackInfo({
          id: vTrack.id,
          label: vTrack.label,
          readyState: vTrack.readyState,
          muted: vTrack.muted,
          enabled: vTrack.enabled
        });

        // Track event listeners
        vTrack.onmute = () => {
          addLog('EVENT', `[VideoTrack ${vTrack.label}] onmute fired`);
          setActiveVideoTrackInfo(prev => prev ? { ...prev, muted: true } : null);
        };
        vTrack.onunmute = () => {
          addLog('EVENT', `[VideoTrack ${vTrack.label}] onunmute fired`);
          setActiveVideoTrackInfo(prev => prev ? { ...prev, muted: false } : null);
        };
        vTrack.onended = () => {
          addLog('WARN', `[VideoTrack ${vTrack.label}] onended fired (Track stopped by OS/hardware)`);
          setActiveVideoTrackInfo(prev => prev ? { ...prev, readyState: 'ended' } : null);
          setIsCapturingVideo(false);
        };

        // Attach to DOM element
        if (videoElRef.current) {
          videoElRef.current.srcObject = stream;
          videoElRef.current.play()
            .then(() => {
              addLog('INFO', `Video element playing (${videoElRef.current?.videoWidth}x${videoElRef.current?.videoHeight})`);
              startFrameInspection(videoElRef.current!);
            })
            .catch(playErr => {
              addLog('ERROR', 'video.play() failed', playErr.message);
            });
        }
      }

      // Handle Audio Track
      const aTrack = stream.getAudioTracks()[0];
      if (aTrack) {
        setAudioStream(stream);
        setIsCapturingAudio(true);
        setActiveAudioTrackInfo({
          id: aTrack.id,
          label: aTrack.label,
          readyState: aTrack.readyState,
          muted: aTrack.muted,
          enabled: aTrack.enabled
        });

        aTrack.onmute = () => addLog('EVENT', `[AudioTrack ${aTrack.label}] onmute fired`);
        aTrack.onunmute = () => addLog('EVENT', `[AudioTrack ${aTrack.label}] onunmute fired`);
        aTrack.onended = () => {
          addLog('WARN', `[AudioTrack ${aTrack.label}] onended fired`);
          setIsCapturingAudio(false);
        };

        setupAudioMeter(stream);
      }

      // Refresh labels now that permissions are granted
      refreshDevices();
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - startTime);
      const errInfo = {
        name: err.name || 'Error',
        message: err.message || 'Unknown error',
        constraint: err.constraint,
        stack: err.stack
      };
      setLastError(errInfo);
      addLog('ERROR', `[Req #${requestId}] getUserMedia FAILED after ${elapsed}ms: ${err.name} - ${err.message}`, errInfo);
    } finally {
      setIsLoading(false);
    }
  };

  // Export full diagnostic report as JSON
  const exportReport = () => {
    const report = {
      title: 'Kashmir EcoWatch - Isolated Camera Diagnostic Report',
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      platform: typeof navigator !== 'undefined' ? (navigator as any).userAgentData?.platform || navigator.platform : 'Unknown',
      selectedVideoId,
      selectedAudioId,
      captureMode,
      videoDevices: videoDevices.map(d => ({ label: d.label, deviceId: d.deviceId, groupId: d.groupId })),
      audioDevices: audioDevices.map(d => ({ label: d.label, deviceId: d.deviceId, groupId: d.groupId })),
      currentTrackInfo: {
        video: activeVideoTrackInfo,
        videoSettings: activeVideoSettings,
        videoCapabilities: activeVideoCapabilities,
        audio: activeAudioTrackInfo
      },
      frameStats,
      lastError,
      eventLogs: logs
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kew-camera-diagnostics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addLog('INFO', 'Diagnostic report JSON exported');
  };

  // Presets from Phase 3
  const runPreset = (presetKey: string) => {
    switch (presetKey) {
      case 'A': // video: true
        startCapture({ video: true, audio: false });
        break;
      case 'B': // Exact EMEET without resolution constraints
        startCapture({ video: { deviceId: { exact: selectedVideoId } }, audio: false });
        break;
      case 'C': // 640x480 @ 15fps
        startCapture({
          video: {
            deviceId: { exact: selectedVideoId },
            width: { exact: 640 },
            height: { exact: 480 },
            frameRate: { ideal: 15 }
          },
          audio: false
        });
        break;
      case 'D': // 1280x720 @ 30fps
        startCapture({
          video: {
            deviceId: { exact: selectedVideoId },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
          },
          audio: false
        });
        break;
      case 'E': // Combined video + audio
        startCapture({
          video: { deviceId: { exact: selectedVideoId } },
          audio: { deviceId: selectedAudioId ? { exact: selectedAudioId } : true }
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 pt-28 md:pt-36 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 text-xs font-mono font-bold uppercase tracking-wider border border-teal-500/30">
                Phase 2 Minimal Reproducibility Test
              </span>
              <span className="text-xs text-slate-400 font-mono">Isolated Diagnostic Environment</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              Camera & MediaStream Hardware Diagnostic Hub
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              Zero conference layers • Zero WebRTC • Direct hardware & MediaDevices API introspection
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshDevices}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
              title="Refresh enumerated device list"
            >
              <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
              Refresh Devices
            </button>
            <button
              onClick={exportReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-lg shadow-teal-900/30"
              title="Export complete diagnostic JSON"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls & Presets */}
        <div className="lg:col-span-5 space-y-6">
          {/* Device Selection Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-teal-400" />
              1. Hardware Device Selectors
            </h2>

            {/* Video Device Select */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>Select Physical / Virtual Camera</span>
                <span className="text-[10px] text-teal-400 font-mono">{videoDevices.length} available</span>
              </label>
              <select
                value={selectedVideoId}
                onChange={e => setSelectedVideoId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              >
                {videoDevices.map(d => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Camera (${d.deviceId.substring(0, 10)}...)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Audio Device Select */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>Select Microphone</span>
                <span className="text-[10px] text-emerald-400 font-mono">{audioDevices.length} available</span>
              </label>
              <select
                value={selectedAudioId}
                onChange={e => setSelectedAudioId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              >
                {audioDevices.map(d => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Microphone (${d.deviceId.substring(0, 10)}...)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Toggle */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-slate-300 font-medium">Capture Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {(['video-only', 'audio-only', 'combined'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setCaptureMode(mode)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition ${
                      captureMode === mode 
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-sm' 
                        : 'bg-slate-950 border-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                disabled={isLoading}
                onClick={() => startCapture()}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-teal-900/30"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
                Start {captureMode}
              </button>

              <button
                onClick={() => {
                  stopVideo(250);
                  stopAudio();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-900/30"
              >
                <Square className="w-4 h-4 fill-white" />
                Stop All
              </button>
            </div>
          </div>

          {/* Phase 3 Presets Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              2. Phase 3 Constraint Presets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => runPreset('A')}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 text-left transition flex flex-col justify-between"
              >
                <span className="font-bold text-cyan-300">Preset A</span>
                <span className="text-[11px] text-slate-400">video: true (Generic)</span>
              </button>

              <button
                onClick={() => runPreset('B')}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 text-left transition flex flex-col justify-between"
              >
                <span className="font-bold text-cyan-300">Preset B</span>
                <span className="text-[11px] text-slate-400">Exact deviceId (No constraints)</span>
              </button>

              <button
                onClick={() => runPreset('C')}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 text-left transition flex flex-col justify-between"
              >
                <span className="font-bold text-cyan-300">Preset C</span>
                <span className="text-[11px] text-slate-400">640x480 @ 15fps</span>
              </button>

              <button
                onClick={() => runPreset('D')}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 text-left transition flex flex-col justify-between"
              >
                <span className="font-bold text-cyan-300">Preset D</span>
                <span className="text-[11px] text-slate-400">1280x720 @ 30fps</span>
              </button>

              <button
                onClick={() => runPreset('E')}
                className="col-span-full p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 text-left transition flex flex-col justify-between"
              >
                <span className="font-bold text-emerald-300">Preset E (Combined)</span>
                <span className="text-[11px] text-slate-400">Exact Video + Audio Simultaneously</span>
              </button>
            </div>
          </div>

          {/* Cooldown Test Matrix */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-400" />
              3. Cooldown Cycle Matrix
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {[250, 500, 1000, 2000].map(ms => (
                <button
                  key={ms}
                  onClick={async () => {
                    addLog('INFO', `Executing Stop & Restart with ${ms}ms cooldown...`);
                    await stopVideo(ms);
                    await startCapture();
                  }}
                  className="py-2.5 px-2 rounded-xl bg-slate-950 border border-white/10 hover:border-amber-400 text-xs font-mono font-bold text-amber-300 transition text-center"
                >
                  {ms}ms
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live View & Hardware Telemetry */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Preview Display */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-400" />
                Live Video & Audio Preview
              </h2>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${isCapturingVideo ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCapturingVideo ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                  Video: {isCapturingVideo ? 'ACTIVE' : 'IDLE'}
                </span>
                <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${isCapturingAudio ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCapturingAudio ? 'bg-teal-400 animate-pulse' : 'bg-slate-500'}`} />
                  Audio: {isCapturingAudio ? `${audioLevel}%` : 'IDLE'}
                </span>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="relative aspect-video w-full rounded-xl bg-black border border-white/15 overflow-hidden flex items-center justify-center">
              <video
                ref={videoElRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-contain"
              />

              {!isCapturingVideo && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-2">
                  <VideoOff className="w-12 h-12 stroke-[1.2]" />
                  <p className="text-xs font-mono">No video stream attached</p>
                </div>
              )}

              {/* Real-time frame inspection overlay */}
              {isCapturingVideo && (
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 font-mono text-[11px] text-slate-200 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400 font-bold">{frameStats.fps} FPS</span>
                    <span>•</span>
                    <span>Frames: {frameStats.totalFrames}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${frameStats.isMoving ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span>{frameStats.isMoving ? 'Physical Motion Detected' : 'Still / Static Frame'}</span>
                    <span>(Δ {frameStats.pixelDelta})</span>
                  </div>
                </div>
              )}

              {/* Microphone VU Overlay */}
              {isCapturingAudio && (
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2 rounded-lg border border-white/15">
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5" /> Live Microphone Input
                    </span>
                    <span>{audioLevel}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-rose-500 transition-all duration-75"
                      style={{ width: `${audioLevel}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error Banner if any */}
            {lastError && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs space-y-1 font-mono">
                <div className="flex items-center gap-2 font-bold text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>DOMException: {lastError.name}</span>
                </div>
                <div className="text-slate-300 pl-6">{lastError.message}</div>
                {lastError.constraint && (
                  <div className="text-amber-300 pl-6">Failed Constraint: {lastError.constraint}</div>
                )}
              </div>
            )}
          </div>

          {/* Active Track Telemetry & Settings */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-3 font-mono text-xs">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-sans">
              <Info className="w-4 h-4 text-teal-400" />
              4. Active Track Hardware Telemetry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Video Track Settings */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1 text-slate-300">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Video Track Settings
                </span>
                {activeVideoSettings ? (
                  <>
                    <div>Label: <span className="text-white">{activeVideoTrackInfo?.label}</span></div>
                    <div>Dimensions: <span className="text-white">{activeVideoSettings.width} × {activeVideoSettings.height}</span></div>
                    <div>Frame Rate: <span className="text-white">{activeVideoSettings.frameRate} fps</span></div>
                    <div>Aspect Ratio: <span className="text-white">{activeVideoSettings.aspectRatio?.toFixed(2)}</span></div>
                    <div>State: <span className="text-emerald-400">{activeVideoTrackInfo?.readyState}</span></div>
                    <div>Muted: <span className="text-white">{String(activeVideoTrackInfo?.muted)}</span></div>
                  </>
                ) : (
                  <span className="text-slate-500 italic">No video track active</span>
                )}
              </div>

              {/* Audio Track Settings */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1 text-slate-300">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Audio Track Settings
                </span>
                {activeAudioTrackInfo ? (
                  <>
                    <div>Label: <span className="text-white">{activeAudioTrackInfo.label}</span></div>
                    <div>State: <span className="text-emerald-400">{activeAudioTrackInfo.readyState}</span></div>
                    <div>Muted: <span className="text-white">{String(activeAudioTrackInfo.muted)}</span></div>
                    <div>Enabled: <span className="text-white">{String(activeAudioTrackInfo.enabled)}</span></div>
                  </>
                ) : (
                  <span className="text-slate-500 italic">No audio track active</span>
                )}
              </div>
            </div>
          </div>

          {/* Real-time Diagnostics Log Stream */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                5. Diagnostics Event Log ({logs.length})
              </h2>
              <button
                onClick={() => setLogs([])}
                className="text-[11px] text-slate-400 hover:text-white font-mono"
              >
                Clear Log
              </button>
            </div>

            <div className="h-64 overflow-y-auto rounded-xl bg-slate-950 p-3 border border-white/10 font-mono text-[11px] space-y-1.5">
              {logs.length === 0 ? (
                <div className="text-slate-500 italic text-center py-8">No events recorded yet. Run a test above.</div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-500 shrink-0">[{log.timestamp.substring(11, 23)}]</span>
                    <span className={`font-bold shrink-0 ${
                      log.type === 'SUCCESS' ? 'text-emerald-400' :
                      log.type === 'ERROR' ? 'text-rose-400' :
                      log.type === 'WARN' ? 'text-amber-400' :
                      log.type === 'EVENT' ? 'text-cyan-400' : 'text-slate-400'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-slate-200">{log.title}</span>
                    {log.details && (
                      <span className="text-slate-400 truncate max-w-xs">{JSON.stringify(log.details)}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
