'use client';

import React, { useEffect, useRef } from 'react';
import {
  Activity,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Headphones,
  Info,
  Lock,
  Mic,
  Network,
  ShieldCheck,
  Volume2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type MicDiagnosticStatus =
  | 'not_tested'
  | 'requesting'
  | 'permission_denied'
  | 'device_unavailable'
  | 'device_busy'
  | 'testing_no_signal'
  | 'signal_detected'
  | 'test_completed';

export type CameraDiagnosticStatus =
  | 'not_tested'
  | 'requesting'
  | 'permission_denied'
  | 'device_unavailable'
  | 'device_busy'
  | 'unsupported_constraints'
  | 'active_preview'
  | 'test_completed';

export type SpeakerDiagnosticStatus =
  | 'not_tested'
  | 'playing'
  | 'completed'
  | 'completed_default_sink'
  | 'autoplay_blocked'
  | 'error';

export interface RealWebRtcTelemetry {
  activePeerConnections: number;
  connectionState: string;
  iceGatheringState: string;
  iceConnectionState: string;
  signalingConnected: boolean;
  rttMs: number | null;
  jitterMs: number | null;
  packetsLost: number;
  packetsReceived: number;
  packetsSent: number;
  inboundKbps: number;
  outboundKbps: number;
  videoResolution: string | null;
  framesPerSecond: number | null;
  candidateType: string | null;
  remoteCandidateType: string | null;
  turnConfigured: boolean;
  turnRelayVerified: boolean;
  remoteAudioSubscribed: boolean;
  localMediaPublished: {
    audio: boolean;
    video: boolean;
    screen: boolean;
  };
  activeRtpTransmission: boolean;
  sampledAt: string | null;
}

export interface DiagnosticsModalProps {
  open: boolean;
  onClose: () => void;
  telemetry: RealWebRtcTelemetry;
  // Layer A: Browser & OS Hardware Access Permissions
  micPermissionStatus: string;
  cameraPermissionStatus: string;
  // Layer B: Private Local Hardware Diagnostics (100% Off-Air)
  isTestingMic: boolean;
  micDiagStatus: MicDiagnosticStatus;
  micDiagMessage: string | null;
  diagMicLevel: number;
  diagMicPeakLevel: number;
  diagMicDb: number | null;
  isTestingCamera: boolean;
  cameraDiagStatus: CameraDiagnosticStatus;
  cameraDiagMessage: string | null;
  diagCameraStream: MediaStream | null;
  diagCameraResolution: string | null;
  diagCameraFps: number | null;
  speakerDiagStatus: SpeakerDiagnosticStatus;
  speakerDiagMessage: string | null;
  speakerSinkSupported: boolean;
  // Layer C: Live Conference Publication Governance (Read-Only Informational Status Here)
  canBroadcastLive: boolean;
  liveBroadcastRoleLabel: string;
  liveBroadcastModeLabel: string;
  isLiveMicPublished: boolean;
  isLiveVideoPublished: boolean;
  remoteAudioLevel: number;
  // Device Lists & Selectors
  audioInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  selectedMicId: string;
  selectedSpeakerId: string;
  selectedCameraId: string;
  onSelectMic: (id: string) => void;
  onSelectSpeaker: (id: string) => void;
  onSelectCamera: (id: string) => void;
  onToggleTestMic: () => void;
  onToggleTestCamera: () => void;
  onTestSpeaker: () => void;
}

function getMicStatusBadge(status: MicDiagnosticStatus): {
  label: string;
  tone: 'neutral' | 'ok' | 'warn' | 'err';
} {
  switch (status) {
    case 'requesting':
      return { label: 'Requesting Access…', tone: 'neutral' };
    case 'testing_no_signal':
      return { label: 'No Audio Signal Yet', tone: 'warn' };
    case 'signal_detected':
      return { label: 'Audio Signal Detected', tone: 'ok' };
    case 'test_completed':
      return { label: 'Test Completed', tone: 'ok' };
    case 'permission_denied':
      return { label: 'Permission Denied', tone: 'err' };
    case 'device_unavailable':
      return { label: 'Device Unavailable', tone: 'err' };
    case 'device_busy':
      return { label: 'Device Busy', tone: 'err' };
    case 'not_tested':
    default:
      return { label: 'Not Tested', tone: 'neutral' };
  }
}

function getCameraStatusBadge(status: CameraDiagnosticStatus): {
  label: string;
  tone: 'neutral' | 'ok' | 'warn' | 'err';
} {
  switch (status) {
    case 'requesting':
      return { label: 'Opening Camera…', tone: 'neutral' };
    case 'active_preview':
      return { label: 'Operational (Private Preview)', tone: 'ok' };
    case 'test_completed':
      return { label: 'Test Completed', tone: 'ok' };
    case 'permission_denied':
      return { label: 'Permission Denied', tone: 'err' };
    case 'device_unavailable':
      return { label: 'Device Unavailable', tone: 'err' };
    case 'device_busy':
      return { label: 'Device Busy', tone: 'err' };
    case 'unsupported_constraints':
      return { label: 'Unsupported Constraints', tone: 'warn' };
    case 'not_tested':
    default:
      return { label: 'Not Tested', tone: 'neutral' };
  }
}

function badgeToneClasses(tone: 'neutral' | 'ok' | 'warn' | 'err'): string {
  switch (tone) {
    case 'ok':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35';
    case 'warn':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/35';
    case 'err':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/35';
    default:
      return 'bg-slate-800/90 text-slate-300 border-slate-700';
  }
}

export function VirtualHallDiagnosticsModal({
  open,
  onClose,
  telemetry,
  micPermissionStatus,
  cameraPermissionStatus,
  isTestingMic,
  micDiagStatus,
  micDiagMessage,
  diagMicLevel,
  diagMicPeakLevel,
  diagMicDb,
  isTestingCamera,
  cameraDiagStatus,
  cameraDiagMessage,
  diagCameraStream,
  diagCameraResolution,
  diagCameraFps,
  speakerDiagStatus,
  speakerDiagMessage,
  speakerSinkSupported,
  canBroadcastLive,
  liveBroadcastRoleLabel,
  liveBroadcastModeLabel,
  isLiveMicPublished,
  isLiveVideoPublished,
  remoteAudioLevel,
  audioInputDevices,
  audioOutputDevices,
  videoDevices,
  selectedMicId,
  selectedSpeakerId,
  selectedCameraId,
  onSelectMic,
  onSelectSpeaker,
  onSelectCamera,
  onToggleTestMic,
  onToggleTestCamera,
  onTestSpeaker,
}: DiagnosticsModalProps) {
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  const bindPreviewVideoRef = React.useCallback(
    (el: HTMLVideoElement | null) => {
      const prev = previewVideoRef.current;
      if (!el && prev) {
        try {
          prev.pause();
          prev.srcObject = null;
        } catch {}
      }
      previewVideoRef.current = el;
      if (el && open && isTestingCamera && diagCameraStream) {
        el.muted = true;
        el.playsInline = true;
        if (el.srcObject !== diagCameraStream) {
          el.srcObject = diagCameraStream;
        }
        el.play().catch(() => {});
      }
    },
    [open, isTestingCamera, diagCameraStream]
  );

  useEffect(() => {
    const el = previewVideoRef.current;
    if (!el) return;
    if (open && isTestingCamera && diagCameraStream) {
      el.muted = true;
      el.playsInline = true;
      if (el.srcObject !== diagCameraStream) {
        el.srcObject = diagCameraStream;
      }
      el.play().catch(() => {});
    } else if (el.srcObject) {
      try {
        el.pause();
        el.srcObject = null;
      } catch {}
    }
    return () => {
      if (el.srcObject) {
        try {
          el.pause();
          el.srcObject = null;
        } catch {}
      }
    };
  }, [open, isTestingCamera, diagCameraStream]);

  if (!open) return null;

  const totalPackets = telemetry.packetsReceived + telemetry.packetsLost;
  const lossPct =
    totalPackets > 0 ? ((telemetry.packetsLost / totalPackets) * 100).toFixed(2) : '0.00';

  const micBadge = getMicStatusBadge(micDiagStatus);
  const camBadge = getCameraStatusBadge(cameraDiagStatus);

  const micHardwareDetected = audioInputDevices.length > 0;
  const camHardwareDetected = videoDevices.length > 0;
  const micHardwareOperational =
    micDiagStatus === 'signal_detected' ||
    (micDiagStatus === 'test_completed' && diagMicPeakLevel > 1) ||
    isLiveMicPublished;
  const camHardwareOperational =
    cameraDiagStatus === 'active_preview' ||
    cameraDiagStatus === 'test_completed' ||
    isLiveVideoPublished;

  const candidateRouteLabel =
    telemetry.activePeerConnections === 0
      ? 'Standby — not yet tested (no active peer connection)'
      : telemetry.candidateType
      ? `${telemetry.candidateType.toUpperCase()}${
          telemetry.remoteCandidateType ? ` ↔ ${telemetry.remoteCandidateType.toUpperCase()}` : ''
        } (Active Pair)`
      : 'Negotiating — no active RTP candidate pair yet';

  const turnStatusLabel = telemetry.turnRelayVerified
    ? 'Verified (Active TURN Relay)'
    : telemetry.turnConfigured
    ? 'Configured — not yet verified'
    : 'Standby (STUN P2P · No TURN relay active)';

  return (
    <div
      className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Hardware and Connectivity Diagnostics"
      data-testid="virtual-hall-diagnostics-modal"
    >
      <div className="bg-[#0b1526] border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[min(92dvh,calc(100vh-1rem))] flex flex-col shadow-2xl overflow-hidden select-text">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white truncate">
                Hardware &amp; Connectivity Diagnostics
              </h2>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                Private device testing &amp; live conference telemetry (zero simulated metrics)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 shrink-0 cursor-pointer"
            aria-label="Close diagnostics"
            data-testid="diagnostics-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto overscroll-contain min-h-0 flex-1 space-y-4 text-xs">
          {/* Separate Live Conference Publication Governance Notice (Informational, Never Blocks Private Tests) */}
          <div
            data-testid="diagnostics-publication-governance-banner"
            data-can-broadcast={canBroadcastLive ? 'true' : 'false'}
            className={cn(
              'p-3 rounded-xl border flex items-start gap-2.5',
              canBroadcastLive
                ? 'bg-teal-950/45 border-teal-500/35 text-teal-100'
                : 'bg-slate-900/90 border-amber-500/35 text-slate-200'
            )}
          >
            {canBroadcastLive ? (
              <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
            ) : (
              <Lock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5 min-w-0">
              <div className="font-semibold text-white flex flex-wrap items-center gap-2">
                <span>
                  {canBroadcastLive
                    ? `Live broadcasting authorized (${liveBroadcastRoleLabel})`
                    : 'Live broadcasting restricted'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 text-slate-300">
                  {liveBroadcastModeLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {canBroadcastLive
                  ? 'Private hardware testing below remains strictly off-air and is never transmitted to other participants. Use the main conference toolbar when ready to broadcast live.'
                  : 'Private hardware testing is available to all participants. Your microphone and camera will not be broadcast until the host grants speaking permission or the event mode authorizes publication.'}
              </p>
            </div>
          </div>

          {/* =============================================================== */}
          {/* SECTION 1: PRIVATE HARDWARE TEST (100% LOCAL & ISOLATED)        */}
          {/* =============================================================== */}
          <section
            aria-label="Private Hardware Test"
            className="p-3.5 sm:p-4 rounded-xl bg-slate-950/75 border border-slate-800 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 pb-2.5">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Private Hardware Test</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Off-Air Local Loop
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Your test audio and video will not be transmitted to other participants.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Mic Perm: <strong className="text-slate-200">{micPermissionStatus.toUpperCase()}</strong>
                {' · '}
                Cam Perm: <strong className="text-slate-200">{cameraPermissionStatus.toUpperCase()}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Microphone + Speaker Diagnostics */}
              <div className="space-y-3.5">
                {/* Microphone Input & Real-Time RMS Signal */}
                <div className="p-3 rounded-xl bg-[#0b1526]/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="vh-diag-mic-select"
                      className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5"
                    >
                      <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Microphone Input</span>
                    </label>
                    <span
                      data-testid="diag-mic-status-badge"
                      data-status={micDiagStatus}
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded border',
                        badgeToneClasses(micBadge.tone)
                      )}
                    >
                      {micBadge.label}
                    </span>
                  </div>

                  <select
                    id="vh-diag-mic-select"
                    data-testid="diag-mic-select"
                    value={selectedMicId}
                    onChange={(e) => onSelectMic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  >
                    {audioInputDevices.length === 0 && (
                      <option value="">Default System Microphone</option>
                    )}
                    {audioInputDevices.map((d, i) => (
                      <option key={d.deviceId || i} value={d.deviceId}>
                        {d.label || `Microphone ${i + 1} (Grant permission to view model)`}
                      </option>
                    ))}
                  </select>

                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Microphone signal (Web Audio RMS)</span>
                      <span className="font-mono font-bold text-emerald-300" data-testid="diag-mic-rms-value">
                        {isTestingMic
                          ? `${diagMicLevel}%${diagMicDb !== null ? ` (${diagMicDb} dBFS)` : ''}${
                              diagMicPeakLevel > 0 ? ` · Peak ${diagMicPeakLevel}%` : ''
                            }`
                          : diagMicPeakLevel > 0
                          ? `Peak ${diagMicPeakLevel}%`
                          : 'Not tested'}
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        data-testid="diag-mic-rms-bar"
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-300 transition-all duration-75"
                        style={{ width: `${isTestingMic ? diagMicLevel : 0}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>
                        Recognition:{' '}
                        <strong className={micHardwareDetected ? 'text-slate-200' : 'text-amber-300'}>
                          {micHardwareDetected
                            ? `${audioInputDevices.length} device(s) listed`
                            : 'No device listed'}
                        </strong>
                      </span>
                      <span>
                        Operational:{' '}
                        <strong
                          className={micHardwareOperational ? 'text-emerald-300' : 'text-slate-400'}
                        >
                          {micHardwareOperational ? 'Verified' : 'Unverified'}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {micDiagMessage && (
                    <div
                      data-testid="diag-mic-message"
                      className={cn(
                        'p-2 rounded-lg border text-[11px] flex items-start gap-1.5',
                        micBadge.tone === 'err'
                          ? 'bg-rose-950/50 border-rose-500/35 text-rose-200'
                          : micBadge.tone === 'warn'
                          ? 'bg-amber-950/45 border-amber-500/35 text-amber-200'
                          : micBadge.tone === 'ok'
                          ? 'bg-emerald-950/45 border-emerald-500/35 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      )}
                    >
                      {micBadge.tone === 'err' || micBadge.tone === 'warn' ? (
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      ) : micBadge.tone === 'ok' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      )}
                      <span>{micDiagMessage}</span>
                    </div>
                  )}
                </div>

                {/* Audio Output (Speaker / Headset) */}
                <div className="p-3 rounded-xl bg-[#0b1526]/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="vh-diag-speaker-select"
                      className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5"
                    >
                      <Headphones className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Audio Output</span>
                    </label>
                    <span
                      data-testid="diag-speaker-status-badge"
                      data-status={speakerDiagStatus}
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded border',
                        speakerDiagStatus === 'completed' ||
                          speakerDiagStatus === 'completed_default_sink' ||
                          speakerDiagStatus === 'playing'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
                          : speakerDiagStatus === 'autoplay_blocked' || speakerDiagStatus === 'error'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
                          : 'bg-slate-800/90 text-slate-300 border-slate-700'
                      )}
                    >
                      {speakerDiagStatus === 'playing'
                        ? 'Playing Test Tone…'
                        : speakerDiagStatus === 'completed'
                        ? 'Output Tone Played'
                        : speakerDiagStatus === 'completed_default_sink'
                        ? 'Played (System Default)'
                        : speakerDiagStatus === 'autoplay_blocked'
                        ? 'Interaction Required'
                        : speakerDiagStatus === 'error'
                        ? 'Playback Error'
                        : 'Not Tested'}
                    </span>
                  </div>

                  {audioOutputDevices.length > 0 && speakerSinkSupported ? (
                    <select
                      id="vh-diag-speaker-select"
                      data-testid="diag-speaker-select"
                      value={selectedSpeakerId}
                      onChange={(e) => onSelectSpeaker(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    >
                      {audioOutputDevices.map((d, i) => (
                        <option key={d.deviceId || i} value={d.deviceId}>
                          {d.label || `Speaker / Headset ${i + 1}`}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      id="vh-diag-speaker-select"
                      data-testid="diag-speaker-fallback"
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                    >
                      System Default Audio Output{' '}
                      {!speakerSinkSupported
                        ? '(Direct speaker switching unsupported in this browser)'
                        : '(Grant audio permission to list named outputs)'}
                    </div>
                  )}

                  {/* Remote Conference Audio Subscription Meter */}
                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Remote Conference Audio (Inbound RTP)</span>
                      <span className="text-teal-300">
                        {telemetry.remoteAudioSubscribed ? `${remoteAudioLevel}%` : 'No inbound stream'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-400 transition-all duration-75"
                        style={{ width: `${remoteAudioLevel}%` }}
                      />
                    </div>
                  </div>

                  {speakerDiagMessage && (
                    <div
                      data-testid="diag-speaker-message"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 flex items-start gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{speakerDiagMessage}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Camera Input & Private Local Video Preview */}
              <div className="p-3 rounded-xl bg-[#0b1526]/90 border border-slate-800 flex flex-col justify-between space-y-2.5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="vh-diag-camera-select"
                      className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Camera Input</span>
                    </label>
                    <span
                      data-testid="diag-camera-status-badge"
                      data-status={cameraDiagStatus}
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded border',
                        badgeToneClasses(camBadge.tone)
                      )}
                    >
                      {camBadge.label}
                    </span>
                  </div>

                  <select
                    id="vh-diag-camera-select"
                    data-testid="diag-camera-select"
                    value={selectedCameraId}
                    onChange={(e) => onSelectCamera(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  >
                    {videoDevices.length === 0 && <option value="">Default System Camera</option>}
                    {videoDevices.map((d, i) => (
                      <option key={d.deviceId || i} value={d.deviceId}>
                        {d.label || `Camera ${i + 1} (Grant permission to view model)`}
                      </option>
                    ))}
                  </select>

                  {/* Private Local Camera Preview Surface */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {isTestingCamera && diagCameraStream ? (
                      <>
                        <video
                          ref={bindPreviewVideoRef}
                          data-testid="diag-private-camera-video"
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover -scale-x-100"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/85 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                          PRIVATE LOCAL PREVIEW · OFF-AIR
                        </div>
                        {diagCameraResolution && (
                          <div
                            data-testid="diag-camera-resolution-badge"
                            className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/85 border border-white/15 text-[10px] font-mono text-slate-200"
                          >
                            {diagCameraResolution}
                            {diagCameraFps ? ` @ ${diagCameraFps} fps` : ''}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-4 text-center space-y-1.5">
                        <Camera className="w-6 h-6 text-slate-600 mx-auto" />
                        <div className="text-[11px] font-semibold text-slate-300">
                          Private camera preview
                        </div>
                        <p className="text-[10px] text-slate-500 max-w-[230px] mx-auto">
                          Click <strong>Test Camera</strong> below to verify local video capture without broadcasting to the room.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>
                      Recognition:{' '}
                      <strong className={camHardwareDetected ? 'text-slate-200' : 'text-amber-300'}>
                        {camHardwareDetected
                          ? `${videoDevices.length} device(s) listed`
                          : 'No device listed'}
                      </strong>
                    </span>
                    <span>
                      Operational:{' '}
                      <strong
                        className={camHardwareOperational ? 'text-emerald-300' : 'text-slate-400'}
                      >
                        {camHardwareOperational ? 'Verified' : 'Unverified'}
                      </strong>
                    </span>
                  </div>
                </div>

                {cameraDiagMessage && (
                  <div
                    data-testid="diag-camera-message"
                    className={cn(
                      'p-2 rounded-lg border text-[11px] flex items-start gap-1.5',
                      camBadge.tone === 'err'
                        ? 'bg-rose-950/50 border-rose-500/35 text-rose-200'
                        : camBadge.tone === 'warn'
                        ? 'bg-amber-950/45 border-amber-500/35 text-amber-200'
                        : camBadge.tone === 'ok'
                        ? 'bg-emerald-950/45 border-emerald-500/35 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    )}
                  >
                    {camBadge.tone === 'err' || camBadge.tone === 'warn' ? (
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    ) : camBadge.tone === 'ok' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    )}
                    <span>{cameraDiagMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SECTION 2: ACTUAL LIVE WEBRTC TRANSPORT & STATE TELEMETRY       */}
          {/* =============================================================== */}
          <section aria-label="Live Conference WebRTC Telemetry" className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" />
                <span>Live Conference WebRTC Telemetry (RTCPeerConnection.getStats)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {telemetry.sampledAt
                  ? `Sampled ${telemetry.sampledAt}`
                  : 'Standby — no active peer connection'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">Signaling / Peers</div>
                <div className="text-xs font-bold text-white mt-0.5" data-testid="telemetry-peers">
                  {telemetry.signalingConnected ? 'Connected' : 'Standby'} ·{' '}
                  {telemetry.activePeerConnections} peer(s)
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">ICE Gathering / State</div>
                <div className="text-xs font-bold text-teal-300 mt-0.5" data-testid="telemetry-ice-state">
                  {telemetry.iceGatheringState} / {telemetry.iceConnectionState}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">RTT / Loss / Jitter</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">
                  {telemetry.rttMs !== null ? `${telemetry.rttMs}ms` : '—'} /{' '}
                  {totalPackets > 0 ? `${lossPct}%` : '—'} /{' '}
                  {telemetry.jitterMs !== null ? `${telemetry.jitterMs}ms` : '—'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">Live RTP Bitrate</div>
                <div
                  className="text-xs font-bold text-emerald-300 mt-0.5"
                  data-testid="telemetry-bitrate"
                >
                  {telemetry.inboundKbps} in / {telemetry.outboundKbps} out kbps
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 sm:col-span-2">
                <div className="text-[10px] text-slate-400">Active Candidate Pair</div>
                <div
                  className="text-[11px] font-bold text-cyan-300 mt-0.5 truncate"
                  title={candidateRouteLabel}
                  data-testid="telemetry-candidate-pair"
                >
                  {candidateRouteLabel}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 sm:col-span-2">
                <div className="text-[10px] text-slate-400">STUN / TURN Relay Verification</div>
                <div
                  className="text-[11px] font-bold text-slate-200 mt-0.5 truncate"
                  title={turnStatusLabel}
                  data-testid="telemetry-turn-status"
                >
                  {turnStatusLabel}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 sm:col-span-2">
                <div className="text-[10px] text-slate-400">Local Media Published to Room</div>
                <div
                  className="text-[11px] font-bold text-slate-200 mt-0.5"
                  data-testid="telemetry-local-published"
                >
                  {telemetry.localMediaPublished.audio ||
                  telemetry.localMediaPublished.video ||
                  telemetry.localMediaPublished.screen
                    ? [
                        telemetry.localMediaPublished.audio && 'Audio',
                        telemetry.localMediaPublished.video && 'Video',
                        telemetry.localMediaPublished.screen && 'Screen',
                      ]
                        .filter(Boolean)
                        .join(' + ')
                    : 'None (Off-Air)'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 sm:col-span-2">
                <div className="text-[10px] text-slate-400">Active RTP Transmission</div>
                <div
                  className="text-[11px] font-bold text-slate-200 mt-0.5"
                  data-testid="telemetry-rtp-active"
                >
                  {telemetry.activeRtpTransmission
                    ? `Active${
                        telemetry.videoResolution
                          ? ` (${telemetry.videoResolution}${
                              telemetry.framesPerSecond ? ` @ ${telemetry.framesPerSecond}fps` : ''
                            })`
                          : ' (Audio RTP)'
                      }`
                    : 'Standby (No active RTP stream)'}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Action Controls */}
        <div className="px-4 sm:px-5 py-3 border-t border-slate-800 bg-slate-950/85 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              data-testid="diag-test-mic-btn"
              onClick={onToggleTestMic}
              className={cn(
                'text-white text-xs font-semibold',
                isTestingMic
                  ? 'bg-amber-600 hover:bg-amber-500'
                  : 'bg-emerald-600 hover:bg-emerald-500'
              )}
            >
              <Mic className="w-3.5 h-3.5 mr-1.5" />
              {isTestingMic ? 'Stop Mic Test' : 'Test Mic'}
            </Button>

            <Button
              type="button"
              size="sm"
              data-testid="diag-test-camera-btn"
              onClick={onToggleTestCamera}
              className={cn(
                'text-white text-xs font-semibold',
                isTestingCamera
                  ? 'bg-amber-600 hover:bg-amber-500'
                  : 'bg-teal-600 hover:bg-teal-500'
              )}
            >
              <Camera className="w-3.5 h-3.5 mr-1.5" />
              {isTestingCamera ? 'Stop Camera Test' : 'Test Camera'}
            </Button>

            <Button
              type="button"
              size="sm"
              data-testid="diag-test-speaker-btn"
              disabled={speakerDiagStatus === 'playing'}
              onClick={onTestSpeaker}
              className="bg-cyan-700 hover:bg-cyan-600 disabled:opacity-60 text-white text-xs font-semibold"
            >
              <Volume2 className="w-3.5 h-3.5 mr-1.5" />
              {speakerDiagStatus === 'playing' ? 'Playing Tone…' : 'Test Speakers'}
            </Button>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            data-testid="diag-done-btn"
            onClick={onClose}
            className="border-slate-700 text-slate-200 text-xs"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
