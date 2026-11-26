'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Activity } from 'lucide-react';
import {
  RealWebRtcTelemetry,
  VirtualHallDiagnosticsModal,
} from '@/components/webinars/hall/VirtualHallDiagnosticsModal';
import { useVirtualHallDiagnostics } from '@/hooks/useVirtualHallDiagnostics';
import { cn } from '@/lib/utils';

const STANDBY_PREFLIGHT_TELEMETRY: RealWebRtcTelemetry = {
  activePeerConnections: 0,
  connectionState: 'standby',
  iceGatheringState: 'standby',
  iceConnectionState: 'standby',
  signalingConnected: false,
  rttMs: null,
  jitterMs: null,
  packetsLost: 0,
  packetsReceived: 0,
  packetsSent: 0,
  inboundKbps: 0,
  outboundKbps: 0,
  videoResolution: null,
  framesPerSecond: null,
  candidateType: null,
  remoteCandidateType: null,
  turnConfigured: false,
  turnRelayVerified: false,
  remoteAudioSubscribed: false,
  localMediaPublished: { audio: false, video: false, screen: false },
  activeRtpTransmission: false,
  sampledAt: null,
};

interface PreConferenceDeviceCheckButtonProps {
  label?: string;
  className?: string;
  testId?: string;
}

/**
 * Reuses the exact locked VirtualHallDiagnosticsModal & useVirtualHallDiagnostics hook
 * for pre-conference hardware verification before entering any Virtual Scientific Hall.
 */
export function PreConferenceDeviceCheckButton({
  label = 'Device Check',
  className,
  testId = 'preconference-device-check-btn',
}: PreConferenceDeviceCheckButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const diag = useVirtualHallDiagnostics({ open });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid={testId}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-slate-900/80 hover:bg-slate-800 text-teal-300 hover:text-teal-200 border-teal-500/35 cursor-pointer',
          className
        )}
        title="Verify microphone, camera & speakers privately before joining a session"
      >
        <Activity className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span>{label}</span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <VirtualHallDiagnosticsModal
            open={open}
            onClose={() => setOpen(false)}
            telemetry={STANDBY_PREFLIGHT_TELEMETRY}
            micPermissionStatus={diag.micPermissionStatus}
            cameraPermissionStatus={diag.cameraPermissionStatus}
            isTestingMic={diag.isTestingMic}
            micDiagStatus={diag.micDiagStatus}
            micDiagMessage={diag.micDiagMessage}
            diagMicLevel={diag.diagMicLevel}
            diagMicPeakLevel={diag.diagMicPeakLevel}
            diagMicDb={diag.diagMicDb}
            isTestingCamera={diag.isTestingCamera}
            cameraDiagStatus={diag.cameraDiagStatus}
            cameraDiagMessage={diag.cameraDiagMessage}
            diagCameraStream={diag.diagCameraStream}
            diagCameraResolution={diag.diagCameraResolution}
            diagCameraFps={diag.diagCameraFps}
            speakerDiagStatus={diag.speakerDiagStatus}
            speakerDiagMessage={diag.speakerDiagMessage}
            speakerSinkSupported={diag.speakerSinkSupported}
            canBroadcastLive={false}
            liveBroadcastRoleLabel="Pre-Conference Lobby"
            liveBroadcastModeLabel="Pre-Join Hardware Verification"
            isLiveMicPublished={false}
            isLiveVideoPublished={false}
            remoteAudioLevel={0}
            audioInputDevices={diag.audioInputDevices}
            audioOutputDevices={diag.audioOutputDevices}
            videoDevices={diag.videoDevices}
            selectedMicId={diag.selectedMicId}
            selectedSpeakerId={diag.selectedSpeakerId}
            selectedCameraId={diag.selectedCameraId}
            onSelectMic={diag.handleSelectMic}
            onSelectSpeaker={diag.handleSelectSpeaker}
            onSelectCamera={diag.handleSelectCamera}
            onToggleTestMic={diag.togglePrivateMicTest}
            onToggleTestCamera={diag.togglePrivateCameraTest}
            onTestSpeaker={diag.runPrivateSpeakerTest}
          />,
          document.body
        )}
    </>
  );
}
