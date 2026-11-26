'use client';

import React from 'react';
import { Activity, Camera, Headphones, Mic, Network, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface RealWebRtcTelemetry {
  activePeerConnections: number;
  connectionState: string;
  rttMs: number | null;
  jitterMs: number | null;
  packetsLost: number;
  packetsReceived: number;
  inboundKbps: number;
  outboundKbps: number;
  videoResolution: string | null;
  framesPerSecond: number | null;
  candidateType: string | null;
  sampledAt: string | null;
}

interface DiagnosticsModalProps {
  open: boolean;
  onClose: () => void;
  telemetry: RealWebRtcTelemetry;
  micPermissionStatus: string;
  isMicOn: boolean;
  isVideoOn: boolean;
  micAudioLevel: number;
  remoteAudioLevel: number;
  audioInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  selectedMicId: string;
  selectedSpeakerId: string;
  selectedCameraId: string;
  onSelectMic: (id: string) => void;
  onSelectSpeaker: (id: string) => void;
  onSelectCamera: (id: string) => void;
  onTestMic: () => void;
  onTestCamera: () => void;
  micError: string | null;
  cameraError: string | null;
}

export function VirtualHallDiagnosticsModal({
  open,
  onClose,
  telemetry,
  micPermissionStatus,
  isMicOn,
  isVideoOn,
  micAudioLevel,
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
  onTestMic,
  onTestCamera,
  micError,
  cameraError,
}: DiagnosticsModalProps) {
  if (!open) return null;

  const totalPackets = telemetry.packetsReceived + telemetry.packetsLost;
  const lossPct =
    totalPackets > 0 ? ((telemetry.packetsLost / totalPackets) * 100).toFixed(2) : '0.00';

  return (
    <div
      className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Audio, Video and WebRTC Connection Diagnostics"
    >
      <div className="bg-[#0b1526] border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[88dvh] flex flex-col shadow-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Real-Time Hardware &amp; WebRTC Telemetry
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Live RTCPeerConnection.getStats() &amp; Web Audio RMS inspection (zero simulated metrics)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close diagnostics"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {(micError || cameraError) && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-1">
              {micError && <div><strong>Microphone:</strong> {micError}</div>}
              {cameraError && <div><strong>Camera:</strong> {cameraError}</div>}
            </div>
          )}

          {/* Real WebRTC Network Stats Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" />
                <span>WebRTC Transport Metrics</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {telemetry.sampledAt ? `Sampled ${telemetry.sampledAt}` : 'Idle — awaiting peer stream'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">Active Peers</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {telemetry.activePeerConnections} ({telemetry.connectionState})
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">Round-Trip Time</div>
                <div className="text-sm font-bold text-teal-300 mt-0.5">
                  {telemetry.rttMs !== null ? `${telemetry.rttMs} ms` : '—'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">Packet Loss / Jitter</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">
                  {totalPackets > 0 ? `${lossPct}%` : '—'} /{' '}
                  {telemetry.jitterMs !== null ? `${telemetry.jitterMs}ms` : '—'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">Bitrate (In / Out)</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">
                  {telemetry.inboundKbps} / {telemetry.outboundKbps} kbps
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 sm:col-span-2">
                <div className="text-[10px] text-slate-400">Negotiated Video Frame</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">
                  {telemetry.videoResolution || 'No active video RTP track'}{' '}
                  {telemetry.framesPerSecond ? `@ ${telemetry.framesPerSecond} fps` : ''}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 sm:col-span-2">
                <div className="text-[10px] text-slate-400">ICE Candidate Route</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">
                  {telemetry.candidateType
                    ? telemetry.candidateType.toUpperCase()
                    : 'STUN/TURN Ready (No active RTP pair)'}
                </div>
              </div>
            </div>
          </div>

          {/* Audio Level Meters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Local Mic Input (RMS)</span>
                <span className={cn('font-mono font-bold', isMicOn ? 'text-emerald-400' : 'text-slate-500')}>
                  {isMicOn ? `${micAudioLevel}%` : 'MUTED'}
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
                  style={{ width: `${micAudioLevel}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Permission: {micPermissionStatus.toUpperCase()}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Remote Speaker Audio</span>
                <span className="font-mono font-bold text-teal-300">{remoteAudioLevel}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-400 transition-all duration-75"
                  style={{ width: `${remoteAudioLevel}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Subscribed via WebRTC RTP Audio
              </div>
            </div>
          </div>

          {/* Device Selectors */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Mic className="w-3.5 h-3.5 text-teal-400" />
                <span>Microphone Input</span>
              </label>
              <select
                value={selectedMicId}
                onChange={(e) => onSelectMic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
              >
                {audioInputDevices.length === 0 && <option value="">Default System Microphone</option>}
                {audioInputDevices.map((d, i) => (
                  <option key={d.deviceId || i} value={d.deviceId}>
                    {d.label || `Microphone ${i + 1}`}
                  </option>
                ))}
              </select>
            </div>

            {audioOutputDevices.length > 0 && (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Audio Output (Speaker / Headset)</span>
                </label>
                <select
                  value={selectedSpeakerId}
                  onChange={(e) => onSelectSpeaker(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                >
                  {audioOutputDevices.map((d, i) => (
                    <option key={d.deviceId || i} value={d.deviceId}>
                      {d.label || `Speaker ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Camera className="w-3.5 h-3.5 text-teal-400" />
                <span>Camera Input</span>
              </label>
              <select
                value={selectedCameraId}
                onChange={(e) => onSelectCamera(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
              >
                {videoDevices.length === 0 && <option value="">Default System Camera</option>}
                {videoDevices.map((d, i) => (
                  <option key={d.deviceId || i} value={d.deviceId}>
                    {d.label || `Camera ${i + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={onTestMic}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
            >
              <Mic className="w-3.5 h-3.5 mr-1" />
              {isMicOn ? 'Mute Mic' : 'Test Mic'}
            </Button>
            <Button
              size="sm"
              onClick={onTestCamera}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
            >
              <Camera className="w-3.5 h-3.5 mr-1" />
              {isVideoOn ? 'Stop Cam' : 'Test Cam'}
            </Button>
          </div>
          <Button
            size="sm"
            variant="outline"
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
