'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Camera,
  Captions,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  DoorOpen,
  Hand,
  HelpCircle,
  Info,
  KeyRound,
  LayoutGrid,
  Lock,
  LogOut,
  Maximize2,
  MessageSquare,
  Mic,
  MicOff,
  Minimize2,
  MonitorOff,
  MonitorUp,
  MoreHorizontal,
  Presentation,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Smile,
  Sparkles,
  Square,
  Unlock,
  Users,
  Video as VideoIcon,
  VideoOff,
  Volume2,
} from 'lucide-react';
import { WebinarSession } from '@/data/webinars';
import {
  CapacityProfile,
  EnvironmentMode,
  EventModeConfig,
  EventModeId,
  HallChatMessage,
  HallParticipant,
  HallPoll,
  HallQuestionItem,
  HallRole,
  InvitedProgramSpeaker,
  LinkedKewResource,
  RolePermissions,
  RoomAllocationConfig,
  SignalEnvelope,
  StageLayoutId,
} from '@/types/virtual-hall';
import { ROLE_SHORT_LABELS, VirtualHallParticipantTile } from './hall/VirtualHallAvatar';
import {
  RealWebRtcTelemetry,
  VirtualHallDiagnosticsModal,
} from './hall/VirtualHallDiagnosticsModal';
import { SidePanelTabId, VirtualHallSidePanel } from './hall/VirtualHallSidePanel';
import { useVirtualHallDiagnostics } from '@/hooks/useVirtualHallDiagnostics';
import {
  acquireVerifiedHardwareCameraStream,
  markCameraHardwareReleased,
  saveVerifiedDevicePrefs,
} from '@/lib/virtual-hall-device-prefs';
import { useAuth } from '@/context/AuthContext';
import { KEW_OFFICIAL_LOGO_PATH } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LiveConferenceRoomProps {
  session: WebinarSession;
}

const SCIENTIFIC_SLIDES = [
  {
    title: 'Slide 1 · Geodetic Glacier Mass Balance Differencing (1980–2027)',
    subtitle: 'SRTM C-band vs TanDEM-X X-band Elevation Disparity Grids',
    metricA: '-0.46 ± 0.08 m w.e. a⁻¹',
    metricALabel: 'Mean Geodetic Ablation Rate',
    metricB: '4,420 m a.s.l.',
    metricBLabel: 'Equilibrium Line Altitude Shift (+118 m)',
    description:
      'Satellite stereo-photogrammetry and synthetic aperture radar interferometry document accelerated ice thinning across steep Greater Himalayan cirques.',
  },
  {
    title: 'Slide 2 · Kolahoi Glacier Terminus Retreat & Radar Coherence',
    subtitle: 'Sentinel-1 TOPSAR Line-of-Sight Displacement Time Series',
    metricA: '21.4 m / yr',
    metricALabel: 'Mean Snout Retreat Rate',
    metricB: '3.12 km²',
    metricBLabel: 'Supraglacial Debris Expansion Since 1990',
    description:
      'Differential phase unwrapping confirms heterogeneous ablation over debris-mantled tongues and proglacial lake expansion behind terminal moraines.',
  },
  {
    title: 'Slide 3 · Downstream Discharge & Springshed Baseflow Vulnerability',
    subtitle: 'Lidder & Jhelum Hydrographic Sub-Basin Runoff Coupling',
    metricA: '42.8%',
    metricALabel: 'Late-Summer Baseflow From Cryospheric Melt',
    metricB: '68 Springs',
    metricBLabel: 'Karewa Springsheds in Recharge Deficit',
    description:
      'Coupled glacio-hydrological budgets indicate peak meltwater contribution before mid-century followed by sustained late-August irrigation deficits.',
  },
];

const STAGE_LAYOUT_OPTIONS: { id: StageLayoutId; label: string; hint: string }[] = [
  { id: 'active_speaker', label: 'Active Speaker', hint: 'Primary speaker + participant strip' },
  { id: 'gallery', label: 'Gallery View', hint: 'Balanced grid of connected participants' },
  { id: 'presentation', label: 'Presentation View', hint: 'Large shared slide/screen + speaker rail' },
  { id: 'side_by_side', label: 'Side-by-Side', hint: '50/50 presentation & speaker split' },
  { id: 'expert_panel', label: 'Expert Panel', hint: 'Equal panelist stage frames' },
  { id: 'podcast_interview', label: 'Podcast Studio', hint: '2-person symmetrical audio/video studio' },
  { id: 'workshop_collaboration', label: 'Workshop Bench', hint: 'Shared workbench + up to 3 participants' },
  { id: 'fullscreen_presentation', label: 'Fullscreen Deck', hint: 'Edge-to-edge presentation + PiP speaker' },
];

const DEFAULT_DELEGATE_PERMS: RolePermissions = {
  role: 'delegate',
  label: 'Registered Delegate',
  canPublishAudioVideo: false,
  canShareScreen: false,
  canAdmitOrRemove: false,
  canMuteOthers: false,
  canSpotlight: false,
  canLockRoom: false,
  canChangeEventMode: false,
  canRecord: false,
  canEndConference: false,
  canModerateQnA: false,
  canManagePolls: false,
  canEnterGreenRoom: false,
  canUseSpeakerBackchannel: false,
  countsTowardDelegateCap: true,
};

interface PeerConnectionEntry {
  peerId: string;
  pc: RTCPeerConnection;
  makingOffer: boolean;
  needsRenegotiation: boolean;
  ignoreOffer: boolean;
  remoteStream: MediaStream;
  pendingCandidates: RTCIceCandidateInit[];
}

export function LiveConferenceRoom({ session }: LiveConferenceRoomProps) {
  const { user: authUser } = useAuth();

  // Room & RBAC state from server
  const [joinStatus, setJoinStatus] = useState<'connecting' | 'joined' | 'blocked'>('connecting');
  const [joinBlockReason, setJoinBlockReason] = useState<{ code: string; message: string } | null>(null);
  const [isAdminSessionActive, setIsAdminSessionActive] = useState<boolean>(false);
  const [myPeerId, setMyPeerId] = useState<string>('');
  const [hallToken, setHallToken] = useState<string>('');
  const [me, setMe] = useState<HallParticipant | null>(null);
  const [permissions, setPermissions] = useState<RolePermissions>(DEFAULT_DELEGATE_PERMS);
  const [environmentMode, setEnvironmentMode] = useState<EnvironmentMode>('demo');
  const [capacityProfile, setCapacityProfile] = useState<CapacityProfile | null>(null);
  const [eventModes, setEventModes] = useState<Record<string, EventModeConfig>>({});
  const [roomConfig, setRoomConfig] = useState<
    RoomAllocationConfig & { effectiveMaxInteractiveSpeakers?: number }
  >({
    roomId: session.id,
    conferenceId: session.id,
    institutionId: 'inst-ku',
    environmentMode: 'demo',
    eventMode: 'scientific_conference',
    defaultLayout: 'active_speaker',
    maxConcurrentDelegates: 10,
    maxInteractiveSpeakers: 2,
    maxScientificTracks: 1,
    recordingAllowed: true,
    waitingRoomEnabled: false,
    isRoomLocked: false,
    isSessionEnded: false,
    isSuspendedByAdmin: false,
    activeTrackId: session.tracks?.[0]?.id || 'track-a',
    spotlightPeerId: null,
    activeSlideDeckIndex: 0,
    isSlideDeckOpen: false,
    activeConsentRecordingId: null,
    effectiveMaxInteractiveSpeakers: 2,
  });

  const [counts, setCounts] = useState({
    connectedTotal: 0,
    connectedDelegates: 0,
    activeInteractivePublishers: 0,
    waitingRoomCount: 0,
    greenRoomCount: 0,
  });
  const [participants, setParticipants] = useState<HallParticipant[]>([]);
  const [promotedDelegateIds, setPromotedDelegateIds] = useState<string[]>([]);
  const [invitedSpeakers, setInvitedSpeakers] = useState<InvitedProgramSpeaker[]>([]);
  const [linkedResources, setLinkedResources] = useState<LinkedKewResource[]>([]);
  const [chatMessages, setChatMessages] = useState<HallChatMessage[]>([]);
  const [qnaList, setQnaList] = useState<HallQuestionItem[]>([]);
  const [polls, setPolls] = useState<HallPoll[]>([]);
  const [notifications, setNotifications] = useState<
    { id: string; time: string; text: string; tone?: 'info' | 'warn' | 'ok' }[]
  >([]);

  // Stage & UI chrome state
  const [stageLayout, setStageLayout] = useState<StageLayoutId>('active_speaker');
  const [isSlideDeckActive, setIsSlideDeckActive] = useState(false);
  const [showDemoLayoutPreview, setShowDemoLayoutPreview] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(352);
  const [activeTab, setActiveTab] = useState<SidePanelTabId>('qna');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTitleInfoPopover, setShowTitleInfoPopover] = useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showHostMenu, setShowHostMenu] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showRolePassModal, setShowRolePassModal] = useState(false);
  const [showRecordingConsentModal, setShowRecordingConsentModal] = useState(false);
  const [floatingReaction, setFloatingReaction] = useState<{ emoji: string; sender: string } | null>(
    null
  );

  // Identity / Role switcher modal inputs
  const [desiredName, setDesiredName] = useState('Visiting Delegate');
  const [desiredAffiliation, setDesiredAffiliation] = useState('Western Himalayan Research Network');
  const [desiredRole, setDesiredRole] = useState<HallRole>('delegate');
  const [desiredEnv, setDesiredEnv] = useState<EnvironmentMode>('demo');
  const [providedSignedToken, setProvidedSignedToken] = useState('');
  const [joinGreenRoomChecked, setJoinGreenRoomChecked] = useState(false);
  const [showMintHelper, setShowMintHelper] = useState(false);
  const [mintPasscode, setMintPasscode] = useState('');
  const [mintLoading, setMintLoading] = useState(false);
  const [mintFeedback, setMintFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  // Local Hardware Media State
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [micAudioLevel, setMicAudioLevel] = useState(0);
  const [remoteAudioLevel, setRemoteAudioLevel] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [actionBanner, setActionBanner] = useState<{ text: string; tone: 'info' | 'warn' | 'ok' } | null>(
    null
  );

  // Live Captions (Web Speech API where supported)
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [captionTranscript, setCaptionTranscript] = useState('');
  const [captionsSupported, setCaptionsSupported] = useState(true);

  // Consent-Based Recording State (NEVER fake or pre-started!)
  const [isRecordingLocal, setIsRecordingLocal] = useState(false);
  const [activeRecordingId, setActiveRecordingId] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [consentChecked, setConsentChecked] = useState(false);

  // Remote WebRTC Streams & Real Telemetry
  const [remoteStreamsByPeer, setRemoteStreamsByPeer] = useState<Record<string, MediaStream>>({});
  const [telemetry, setTelemetry] = useState<RealWebRtcTelemetry>({
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
  });

  // Refs
  const rootContainerRef = useRef<HTMLDivElement | null>(null);
  const stageViewportRef = useRef<HTMLDivElement | null>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({
    width: 1280,
    height: 720,
  });
  const [windowWidth, setWindowWidth] = useState<number>(1440);
  const [videoAspectsByPeer, setVideoAspectsByPeer] = useState<Record<string, number>>({});
  const hasCustomNameRef = useRef<boolean>(false);
  const hasCustomAffRef = useRef<boolean>(false);
  const hallTokenRef = useRef<string>('');
  const myPeerIdRef = useRef<string>(`peer_${Math.random().toString(36).slice(2, 11)}`);
  const isMountedRef = useRef<boolean>(false);
  const joinGenRef = useRef<number>(0);
  const meRef = useRef<HallParticipant | null>(null);
  const lastSeqRef = useRef<number>(0);
  const iceServersRef = useRef<RTCIceServer[]>([{ urls: 'stun:stun.l.google.com:19302' }]);
  const peersRef = useRef<Map<string, PeerConnectionEntry>>(new Map());
  const prevBytesRef = useRef<{ rx: number; tx: number; ts: number }>({ rx: 0, tx: 0, ts: 0 });
  const prevPacketsRef = useRef<{ rx: number; tx: number }>({ rx: 0, tx: 0 });

  const audioStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const cameraStateRef = useRef<'IDLE' | 'REQUESTING' | 'ACTIVE' | 'STOPPING'>('IDLE');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const micRafRef = useRef<number | null>(null);
  const remoteAudioCtxRef = useRef<AudioContext | null>(null);
  const remoteAudioAnalyserRef = useRef<AnalyserNode | null>(null);
  const remoteAudioSourcesRef = useRef<
    Map<string, { streamId: string; node: MediaStreamAudioSourceNode }>
  >(new Map());
  const remoteRafRef = useRef<number | null>(null);
  const remoteAudioElsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const speechRecRef = useRef<{ stop: () => void } | null>(null);
  const roomConfigRef = useRef<RoomAllocationConfig>(roomConfig);
  roomConfigRef.current = roomConfig;
  const autoRecoverCountRef = useRef<number>(0);
  const iceDisconnectTimersRef = useRef<Map<string, number>>(new Map());
  const liveDeviceSwitchRef = useRef<{
    onMic: (id: string) => void;
    onCam: (id: string) => void;
  }>({ onMic: () => {}, onCam: () => {} });

  // Shared Locked Hardware Diagnostics & Persisted Device Preferences Hook
  const {
    audioInputDevices,
    audioOutputDevices,
    videoDevices,
    selectedMicId,
    selectedSpeakerId,
    selectedCameraId,
    setSelectedCameraId,
    micPermissionStatus,
    setMicPermissionStatus,
    cameraPermissionStatus,
    setCameraPermissionStatus,
    speakerSinkSupported,
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
    refreshDevices,
    handleSelectMic,
    handleSelectSpeaker,
    handleSelectCamera,
    togglePrivateMicTest,
    togglePrivateCameraTest,
    stopPrivateCameraTest,
    runPrivateSpeakerTest,
  } = useVirtualHallDiagnostics({
    open: showDiagnostics,
    isMicOn,
    isVideoOn,
    audioStreamRef,
    videoStreamRef,
    remoteAudioElsRef,
    onLiveMicDeviceChanged: (id) => liveDeviceSwitchRef.current.onMic(id),
    onLiveCameraDeviceChanged: (id) => liveDeviceSwitchRef.current.onCam(id),
  });

  const pushNotice = useCallback((text: string, tone: 'info' | 'warn' | 'ok' = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setNotifications((prev) => [{ id: `${Date.now()}_${Math.random()}`, time, text, tone }, ...prev].slice(0, 40));
    setActionBanner({ text, tone });
  }, []);

  useEffect(() => {
    if (!actionBanner) return;
    const t = setTimeout(() => setActionBanner(null), 5000);
    return () => clearTimeout(t);
  }, [actionBanner]);

  // Lock document scroll, collapse sidebar on compact screens, and observe real stage & viewport dimensions
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setWindowWidth(window.innerWidth);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    const updateViewportMetrics = () => {
      setWindowWidth(window.innerWidth);
      const el = stageViewportRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          setStageSize((prev) =>
            Math.abs(prev.width - r.width) < 1 && Math.abs(prev.height - r.height) < 1
              ? prev
              : { width: Math.floor(r.width), height: Math.floor(r.height) }
          );
        }
      }
    };

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateViewportMetrics();
          })
        : null;
    if (ro && stageViewportRef.current) {
      ro.observe(stageViewportRef.current);
    }
    if (ro && rootContainerRef.current) {
      ro.observe(rootContainerRef.current);
    }

    window.addEventListener('resize', updateViewportMetrics, { passive: true });
    window.visualViewport?.addEventListener('resize', updateViewportMetrics, { passive: true });
    updateViewportMetrics();

    return () => {
      document.body.style.overflow = prevOverflow;
      ro?.disconnect();
      window.removeEventListener('resize', updateViewportMetrics);
      window.visualViewport?.removeEventListener('resize', updateViewportMetrics);
    };
  }, [joinStatus, isSidebarOpen, sidebarWidth]);

  // Web Audio RMS meter for local mic
  const attachLocalAudioMeter = useCallback((stream: MediaStream) => {
    try {
      if (micRafRef.current) cancelAnimationFrame(micRafRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const src = ctx.createMediaStreamSource(stream);
      src.connect(analyser);
      audioCtxRef.current = ctx;
      const buf = new Uint8Array(analyser.frequencyBinCount);
      let lastEmitTs = 0;
      const tick = () => {
        if (!audioStreamRef.current) return;
        const now = performance.now();
        if (now - lastEmitTs >= 180) {
          lastEmitTs = now;
          analyser.getByteTimeDomainData(buf);
          let sumSq = 0;
          for (let i = 0; i < buf.length; i++) {
            const v = (buf[i] - 128) / 128;
            sumSq += v * v;
          }
          const rms = Math.sqrt(sumSq / buf.length);
          const nextLvl = Math.min(100, Math.round(rms * 320));
          setMicAudioLevel((prev) => (Math.abs(prev - nextLvl) >= 2 ? nextLvl : prev));
        }
        micRafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // ignore audio context block in headless environments
    }
  }, []);

  // Web Audio RMS meter + hidden audio element for remote peer stream
  const attachRemoteAudioPlayback = useCallback(
    (peerId: string, stream: MediaStream) => {
      if (typeof document === 'undefined') return;
      let audioEl = remoteAudioElsRef.current.get(peerId);
      if (!audioEl) {
        audioEl = document.createElement('audio');
        audioEl.autoplay = true;
        audioEl.setAttribute('playsinline', 'true');
        remoteAudioElsRef.current.set(peerId, audioEl);
      }
      if (audioEl.srcObject !== stream) {
        audioEl.srcObject = stream;
        if (selectedSpeakerId && 'setSinkId' in audioEl) {
          (audioEl as HTMLAudioElement & { setSinkId: (id: string) => Promise<void> })
            .setSinkId(selectedSpeakerId)
            .catch(() => {});
        }
        audioEl.play().catch(() => {});
      } else if (audioEl.paused) {
        audioEl.play().catch(() => {});
      }

      const hasActiveAudioTrack = stream
        .getAudioTracks()
        .some((t) => t.readyState === 'live' && !t.muted);
      if (hasActiveAudioTrack) {
        try {
          if (!remoteAudioCtxRef.current || !remoteAudioAnalyserRef.current) {
            const Ctx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const ctx = new Ctx();
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 256;
            remoteAudioCtxRef.current = ctx;
            remoteAudioAnalyserRef.current = analyser;
            const buf = new Uint8Array(analyser.frequencyBinCount);
            let lastRemoteEmitTs = 0;
            const tick = () => {
              if (!remoteAudioAnalyserRef.current) return;
              const now = performance.now();
              if (now - lastRemoteEmitTs >= 180) {
                lastRemoteEmitTs = now;
                remoteAudioAnalyserRef.current.getByteTimeDomainData(buf);
                let sumSq = 0;
                for (let i = 0; i < buf.length; i++) {
                  const v = (buf[i] - 128) / 128;
                  sumSq += v * v;
                }
                const rms = Math.sqrt(sumSq / buf.length);
                const nextLvl = Math.min(100, Math.round(rms * 320));
                setRemoteAudioLevel((prev) => (Math.abs(prev - nextLvl) >= 2 ? nextLvl : prev));
              }
              remoteRafRef.current = requestAnimationFrame(tick);
            };
            tick();
          }
          if (remoteAudioCtxRef.current.state === 'suspended') {
            remoteAudioCtxRef.current.resume().catch(() => {});
          }
          const existingSrc = remoteAudioSourcesRef.current.get(peerId);
          if (!existingSrc || existingSrc.streamId !== stream.id) {
            if (existingSrc) {
              try {
                existingSrc.node.disconnect();
              } catch {}
            }
            const srcNode = remoteAudioCtxRef.current.createMediaStreamSource(stream);
            srcNode.connect(remoteAudioAnalyserRef.current);
            remoteAudioSourcesRef.current.set(peerId, { streamId: stream.id, node: srcNode });
          }
        } catch {
          // ignore
        }
      }
    },
    [selectedSpeakerId]
  );

  // Signal API helper
  const postSignalAction = useCallback(
    async (payload: Record<string, unknown>) => {
      if (!hallTokenRef.current) return { ok: false, status: 401, data: { error: 'Not connected' } };
      const res = await fetch(`/api/webinars/room/${encodeURIComponent(session.id)}/signal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hallTokenRef.current}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    },
    [session.id]
  );

  // Sync active local audio & video/screen tracks onto a specific RTCPeerConnection (RFC 8829 Associatable)
  const attachCurrentLocalTracksToPc = useCallback(async (pc: RTCPeerConnection) => {
    const audioTrack =
      audioStreamRef.current?.getAudioTracks().find((t) => t.readyState === 'live' && t.enabled) ||
      null;
    const primaryVideoTrack =
      screenStreamRef.current?.getVideoTracks().find((t) => t.readyState === 'live') ||
      videoStreamRef.current?.getVideoTracks().find((t) => t.readyState === 'live' && t.enabled) ||
      null;

    const transceivers = pc.getTransceivers();
    const audioTr = transceivers.find(
      (tr) =>
        tr.sender?.track?.kind === 'audio' ||
        (tr.mid !== null && tr.receiver?.track?.kind === 'audio')
    );
    if (audioTrack && audioStreamRef.current) {
      if (audioTr) {
        audioTr.direction = 'sendrecv';
        try {
          (
            audioTr.sender as RTCRtpSender & { setStreams?: (...s: MediaStream[]) => void }
          ).setStreams?.(audioStreamRef.current);
        } catch {
          // setStreams throws InvalidStateError in Chromium if transceiver was already negotiated; replaceTrack suffices
        }
        await audioTr.sender.replaceTrack(audioTrack).catch(() => {});
      } else {
        pc.addTrack(audioTrack, audioStreamRef.current);
      }
    } else if (audioTr) {
      if (audioTr.sender?.track) {
        await audioTr.sender.replaceTrack(null).catch(() => {});
      }
      audioTr.direction = 'recvonly';
    }

    const videoTr = pc.getTransceivers().find(
      (tr) =>
        tr.sender?.track?.kind === 'video' ||
        (tr.mid !== null && tr.receiver?.track?.kind === 'video')
    );
    const activeVidStream = screenStreamRef.current || videoStreamRef.current;
    if (primaryVideoTrack && activeVidStream) {
      if (videoTr) {
        videoTr.direction = 'sendrecv';
        try {
          (
            videoTr.sender as RTCRtpSender & { setStreams?: (...s: MediaStream[]) => void }
          ).setStreams?.(activeVidStream);
        } catch {
          // setStreams throws InvalidStateError in Chromium if transceiver was already negotiated; replaceTrack suffices
        }
        await videoTr.sender.replaceTrack(primaryVideoTrack).catch(() => {});
      } else {
        pc.addTrack(primaryVideoTrack, activeVidStream);
      }
    } else if (videoTr) {
      if (videoTr.sender?.track) {
        await videoTr.sender.replaceTrack(null).catch(() => {});
      }
      videoTr.direction = 'recvonly';
    }
  }, []);

  // Negotiate SDP offer with a specific remote peer
  const negotiateWithPeer = useCallback(
    async (remotePeerId: string) => {
      const entry = peersRef.current.get(remotePeerId);
      if (!entry) return;
      const { pc } = entry;
      if (entry.makingOffer || pc.signalingState !== 'stable') {
        entry.needsRenegotiation = true;
        return;
      }
      try {
        entry.makingOffer = true;
        entry.needsRenegotiation = false;
        await attachCurrentLocalTracksToPc(pc);
        if (pc.getTransceivers().length === 0) {
          pc.addTransceiver('audio', { direction: 'recvonly' });
          pc.addTransceiver('video', { direction: 'recvonly' });
        }
        const offer = await pc.createOffer();
        if (pc.signalingState !== 'stable') {
          entry.needsRenegotiation = true;
          return;
        }
        await pc.setLocalDescription(offer);
        const publishingMedia = Boolean(
          (audioStreamRef.current?.getAudioTracks()[0]?.enabled &&
            audioStreamRef.current?.getAudioTracks()[0]?.readyState === 'live') ||
            videoStreamRef.current?.getVideoTracks()[0]?.readyState === 'live' ||
            screenStreamRef.current?.getVideoTracks()[0]?.readyState === 'live'
        );
        if (pc.localDescription) {
          await postSignalAction({
            action: 'webrtc_offer',
            targetPeerId: remotePeerId,
            publishingMedia,
            sdp: { type: pc.localDescription.type, sdp: pc.localDescription.sdp },
          });
        }
      } catch (err) {
        console.warn('[KEW WebRTC] Offer negotiation warning:', err);
      } finally {
        entry.makingOffer = false;
        if (entry.needsRenegotiation && pc.signalingState === 'stable') {
          entry.needsRenegotiation = false;
          setTimeout(() => negotiateWithPeer(remotePeerId), 60);
        }
      }
    },
    [attachCurrentLocalTracksToPc, postSignalAction]
  );

  // Ensure RTCPeerConnection exists for a remote peer
  const getOrCreatePeerConnection = useCallback(
    (remotePeerId: string, initiateIfTieWinner = false): PeerConnectionEntry => {
      const existing = peersRef.current.get(remotePeerId);
      if (existing) return existing;

      const pc = new RTCPeerConnection({ iceServers: iceServersRef.current });
      const remoteStream = new MediaStream();
      const entry: PeerConnectionEntry = {
        peerId: remotePeerId,
        pc,
        makingOffer: false,
        needsRenegotiation: false,
        ignoreOffer: false,
        remoteStream,
        pendingCandidates: [],
      };
      peersRef.current.set(remotePeerId, entry);

      attachCurrentLocalTracksToPc(pc);

      pc.onicecandidate = (ev) => {
        if (ev.candidate && hallTokenRef.current) {
          postSignalAction({
            action: 'webrtc_ice',
            targetPeerId: remotePeerId,
            candidate: ev.candidate.toJSON(),
          }).catch(() => {});
        }
      };

      pc.ontrack = (ev) => {
        const currentTracks = entry.remoteStream.getTracks();
        if (!currentTracks.some((t) => t.id === ev.track.id)) {
          entry.remoteStream.addTrack(ev.track);
        }
        const publishRemoteClone = () => {
          const cloned = new MediaStream(entry.remoteStream.getTracks());
          setRemoteStreamsByPeer((prev) => ({ ...prev, [remotePeerId]: cloned }));
          if (entry.remoteStream.getAudioTracks().length > 0) {
            attachRemoteAudioPlayback(remotePeerId, entry.remoteStream);
          }
        };
        ev.track.onunmute = publishRemoteClone;
        publishRemoteClone();
      };

      pc.onconnectionstatechange = () => {
        const anyConnected = Array.from(peersRef.current.values()).some(
          (e) => e.pc.connectionState === 'connected'
        );
        setTelemetry((prev) => ({
          ...prev,
          activePeerConnections: peersRef.current.size,
          connectionState: anyConnected ? 'connected' : pc.connectionState,
        }));
      };

      // Automatic WebRTC ICE restart & transient network recovery
      pc.oniceconnectionstatechange = () => {
        const prevTimer = iceDisconnectTimersRef.current.get(remotePeerId);
        if (prevTimer) {
          window.clearTimeout(prevTimer);
          iceDisconnectTimersRef.current.delete(remotePeerId);
        }
        if (pc.iceConnectionState === 'failed') {
          pc.restartIce?.();
          if (myPeerIdRef.current && myPeerIdRef.current < remotePeerId) {
            negotiateWithPeer(remotePeerId);
          }
        } else if (pc.iceConnectionState === 'disconnected') {
          const timerId = window.setTimeout(() => {
            iceDisconnectTimersRef.current.delete(remotePeerId);
            if (
              peersRef.current.has(remotePeerId) &&
              pc.connectionState !== 'connected' &&
              (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed')
            ) {
              pc.restartIce?.();
              negotiateWithPeer(remotePeerId);
            }
          }, 7000);
          iceDisconnectTimersRef.current.set(remotePeerId, timerId);
        }
      };

      if (initiateIfTieWinner && myPeerIdRef.current && myPeerIdRef.current < remotePeerId) {
        setTimeout(() => {
          negotiateWithPeer(remotePeerId);
        }, 80);
      } else if (initiateIfTieWinner) {
        // Fallback watchdog for reloads/rejoins where remote tie-winner hasn't initiated yet
        setTimeout(() => {
          if (
            peersRef.current.get(remotePeerId) === entry &&
            pc.connectionState === 'new' &&
            pc.signalingState === 'stable' &&
            !entry.makingOffer
          ) {
            negotiateWithPeer(remotePeerId);
          }
        }, 1100);
      }

      return entry;
    },
    [attachCurrentLocalTracksToPc, attachRemoteAudioPlayback, negotiateWithPeer, postSignalAction]
  );

  const closePeerConnection = useCallback((remotePeerId: string) => {
    const iceTimer = iceDisconnectTimersRef.current.get(remotePeerId);
    if (iceTimer) {
      window.clearTimeout(iceTimer);
      iceDisconnectTimersRef.current.delete(remotePeerId);
    }
    const remSrc = remoteAudioSourcesRef.current.get(remotePeerId);
    if (remSrc) {
      try {
        remSrc.node.disconnect();
      } catch {}
      remoteAudioSourcesRef.current.delete(remotePeerId);
    }
    const entry = peersRef.current.get(remotePeerId);
    if (entry) {
      try {
        entry.pc.close();
      } catch {}
      peersRef.current.delete(remotePeerId);
    }
    const audioEl = remoteAudioElsRef.current.get(remotePeerId);
    if (audioEl) {
      audioEl.srcObject = null;
      remoteAudioElsRef.current.delete(remotePeerId);
    }
    setRemoteStreamsByPeer((prev) => {
      const next = { ...prev };
      delete next[remotePeerId];
      return next;
    });
  }, []);

  const closeAllPeerConnections = useCallback(() => {
    for (const peerId of Array.from(peersRef.current.keys())) {
      closePeerConnection(peerId);
    }
  }, [closePeerConnection]);

  // Dispose local camera with 300ms Windows Media Foundation / UVC driver cooldown
  const stopCurrentVideoTracks = useCallback(async () => {
    if (cameraStateRef.current === 'STOPPING') return;
    cameraStateRef.current = 'STOPPING';
    if (videoStreamRef.current) {
      let stoppedAny = false;
      videoStreamRef.current.getVideoTracks().forEach((t) => {
        try {
          t.stop();
          stoppedAny = true;
        } catch {}
      });
      if (stoppedAny) {
        markCameraHardwareReleased();
      }
      videoStreamRef.current = null;
    }
    setVideoStream(null);
    setIsVideoOn(false);
    await new Promise((r) => setTimeout(r, 300));
    cameraStateRef.current = 'IDLE';
  }, []);

  const forceStopLocalAudio = useCallback(() => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getAudioTracks().forEach((t) => {
        t.enabled = false;
      });
    }
    setIsMicOn(false);
    setMicAudioLevel(0);
    for (const remotePeerId of peersRef.current.keys()) {
      negotiateWithPeer(remotePeerId);
    }
  }, [negotiateWithPeer]);

  // Process incoming signal envelope from server
  const handleSignalEnvelope = useCallback(
    async (sig: SignalEnvelope) => {
      if (sig.type === 'chat_message' && sig.payload.message) {
        const msg = sig.payload.message as HallChatMessage;
        setChatMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        return;
      }

      if (sig.type === 'reaction') {
        setFloatingReaction({
          emoji: String(sig.payload.emoji || '👏'),
          sender: String(sig.payload.senderName || 'Participant'),
        });
        setTimeout(() => setFloatingReaction(null), 2600);
        return;
      }

      if (sig.type === 'room_state_changed' && sig.payload.roomConfig) {
        const nextCfg = sig.payload.roomConfig as RoomAllocationConfig;
        setRoomConfig((prev) => ({ ...prev, ...nextCfg }));
        if (typeof nextCfg.isSlideDeckOpen === 'boolean') {
          setIsSlideDeckActive((prevOpen) => {
            if (prevOpen && !nextCfg.isSlideDeckOpen && !screenStreamRef.current) {
              setStageLayout((cur) =>
                cur === 'presentation' || cur === 'fullscreen_presentation' ? 'active_speaker' : cur
              );
            }
            return Boolean(nextCfg.isSlideDeckOpen);
          });
        }
        if (sig.payload.recordingNotice) {
          pushNotice(String(sig.payload.recordingNotice), 'warn');
        }
        return;
      }

      if (sig.type === 'host_directive') {
        const directive = String(sig.payload.directive || '');
        const targetId = String(sig.payload.targetPeerId || '');
        if (directive === 'removed' && targetId === myPeerIdRef.current) {
          closeAllPeerConnections();
          setJoinStatus('blocked');
          setJoinBlockReason({
            code: 'REMOVED_BY_HOST',
            message: 'You were removed from this Virtual Scientific Hall by the Session Host.',
          });
          return;
        }
        if (
          (directive === 'force_mute' && targetId === myPeerIdRef.current) ||
          (directive === 'force_mute_all' && sig.payload.exceptPeerId !== myPeerIdRef.current)
        ) {
          forceStopLocalAudio();
          pushNotice('Your microphone was muted by the Session Host.', 'warn');
          return;
        }
        if (Array.isArray(sig.payload.promotedDelegateIds)) {
          const list = sig.payload.promotedDelegateIds as string[];
          setPromotedDelegateIds(list);
          if (directive === 'promote_delegate' && targetId === myPeerIdRef.current) {
            pushNotice('Host granted you floor microphone/camera permission.', 'ok');
          }
          if (directive === 'revoke_delegate_mic' && targetId === myPeerIdRef.current) {
            forceStopLocalAudio();
            await stopCurrentVideoTracks();
            for (const pid of peersRef.current.keys()) {
              negotiateWithPeer(pid);
            }
            pushNotice('Host returned you to audience listen-only mode.', 'info');
          }
        }
        return;
      }

      if (sig.type === 'peer_left') {
        const leftId = String(sig.payload.peerId || sig.senderPeerId);
        if (leftId && leftId !== myPeerIdRef.current) {
          closePeerConnection(leftId);
        }
        return;
      }

      // WebRTC signaling messages from remote peers
      if (sig.senderPeerId === myPeerIdRef.current) return;
      if (meRef.current?.presence !== 'connected') return;

      if (sig.type === 'webrtc_offer' && sig.payload.sdp) {
        const entry = getOrCreatePeerConnection(sig.senderPeerId, false);
        const { pc } = entry;
        const polite = myPeerIdRef.current > sig.senderPeerId;
        const sdp = sig.payload.sdp as RTCSessionDescriptionInit;
        const offerCollision = entry.makingOffer || pc.signalingState !== 'stable';
        entry.ignoreOffer = !polite && offerCollision;
        if (entry.ignoreOffer) return;

        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          while (entry.pendingCandidates.length > 0) {
            const c = entry.pendingCandidates.shift();
            if (c) await pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
          }
          await attachCurrentLocalTracksToPc(pc);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          if (pc.localDescription) {
            await postSignalAction({
              action: 'webrtc_answer',
              targetPeerId: sig.senderPeerId,
              sdp: { type: pc.localDescription.type, sdp: pc.localDescription.sdp },
            });
          }
          if (entry.needsRenegotiation && pc.signalingState === 'stable') {
            entry.needsRenegotiation = false;
            setTimeout(() => negotiateWithPeer(sig.senderPeerId), 60);
          }
        } catch (err) {
          console.warn('[KEW WebRTC] Handle offer error:', err);
        }
        return;
      }

      if (sig.type === 'webrtc_answer' && sig.payload.sdp) {
        const entry = peersRef.current.get(sig.senderPeerId);
        if (!entry) return;
        const { pc } = entry;
        try {
          if (pc.signalingState === 'have-local-offer') {
            await pc.setRemoteDescription(
              new RTCSessionDescription(sig.payload.sdp as RTCSessionDescriptionInit)
            );
            while (entry.pendingCandidates.length > 0) {
              const c = entry.pendingCandidates.shift();
              if (c) await pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
            }
            if (entry.needsRenegotiation) {
              entry.needsRenegotiation = false;
              setTimeout(() => negotiateWithPeer(sig.senderPeerId), 60);
            }
          }
        } catch (err) {
          console.warn('[KEW WebRTC] Handle answer error:', err);
        }
        return;
      }

      if (sig.type === 'webrtc_ice' && sig.payload.candidate) {
        const entry = getOrCreatePeerConnection(sig.senderPeerId, false);
        const cand = sig.payload.candidate as RTCIceCandidateInit;
        if (entry.pc.remoteDescription && entry.pc.remoteDescription.type) {
          await entry.pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
        } else {
          entry.pendingCandidates.push(cand);
        }
      }
    },
    [
      attachCurrentLocalTracksToPc,
      closeAllPeerConnections,
      closePeerConnection,
      forceStopLocalAudio,
      getOrCreatePeerConnection,
      negotiateWithPeer,
      postSignalAction,
      pushNotice,
      stopCurrentVideoTracks,
    ]
  );

  // Join Virtual Scientific Hall (authoritative server role & identity resolution)
  const joinHall = useCallback(
    async (opts?: {
      displayName?: string;
      affiliation?: string;
      requestedRole?: HallRole;
      explicitRoleRequested?: boolean;
      explicitNameProvided?: boolean;
      explicitAffiliationProvided?: boolean;
      environmentMode?: EnvironmentMode;
      providedToken?: string;
      enterGreenRoom?: boolean;
    }) => {
      const myGen = ++joinGenRef.current;
      setJoinStatus('connecting');
      setJoinBlockReason(null);
      closeAllPeerConnections();

      try {
        const explicitNameProvided = opts?.explicitNameProvided ?? hasCustomNameRef.current;
        const explicitAffiliationProvided =
          opts?.explicitAffiliationProvided ?? hasCustomAffRef.current;

        const payloadBody = JSON.stringify({
          action: 'join',
          peerId: myPeerIdRef.current || undefined,
          displayName: explicitNameProvided ? (opts?.displayName ?? desiredName) : '',
          affiliation: explicitAffiliationProvided
            ? (opts?.affiliation ?? desiredAffiliation)
            : '',
          requestedRole: opts?.requestedRole ?? desiredRole,
          explicitRoleRequested: opts?.explicitRoleRequested ?? true,
          explicitNameProvided,
          explicitAffiliationProvided,
          environmentMode: opts?.environmentMode ?? desiredEnv,
          providedToken: opts?.providedToken ?? providedSignedToken,
          enterGreenRoom: opts?.enterGreenRoom ?? joinGreenRoomChecked,
        });

        let res = await fetch(`/api/webinars/room/${encodeURIComponent(session.id)}`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: payloadBody,
        });

        // Automatic single retry if dev server was cold-compiling on initial hit
        if (res.status >= 500) {
          await new Promise((resolve) => setTimeout(resolve, 900));
          res = await fetch(`/api/webinars/room/${encodeURIComponent(session.id)}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: payloadBody,
          });
        }

        const data = await res.json().catch(() => ({}));
        if (myGen !== joinGenRef.current) return;
        if (!res.ok || !data.ok) {
          setJoinStatus('blocked');
          setJoinBlockReason({
            code: data.code || `HTTP_${res.status}`,
            message: data.error || 'Unable to enter Virtual Scientific Hall.',
          });
          return;
        }

        hallTokenRef.current = data.hallToken;
        myPeerIdRef.current = data.peerId;
        meRef.current = data.participant;
        lastSeqRef.current = data.currentSeq || 0;
        if (Array.isArray(data.iceServers) && data.iceServers.length > 0) {
          iceServersRef.current = data.iceServers;
        }

        setHallToken(data.hallToken);
        setMyPeerId(data.peerId);
        setMe(data.participant);
        setPermissions(data.permissions || DEFAULT_DELEGATE_PERMS);
        setEnvironmentMode(data.participant.environmentMode);
        setDesiredRole(data.participant.role);
        setDesiredName(data.participant.displayName);
        setDesiredAffiliation(data.participant.affiliation);
        setDesiredEnv(data.participant.environmentMode);
        setCapacityProfile(data.capacityProfile || null);
        setEventModes(data.eventModes || {});
        setRoomConfig(data.roomConfig);
        const initialDeckOpen = Boolean(data.roomConfig?.isSlideDeckOpen);
        setIsSlideDeckActive(initialDeckOpen);
        const rawDefaultLayout = (data.roomConfig?.defaultLayout || 'active_speaker') as StageLayoutId;
        setStageLayout(
          !initialDeckOpen &&
            (rawDefaultLayout === 'presentation' || rawDefaultLayout === 'fullscreen_presentation')
            ? 'active_speaker'
            : rawDefaultLayout
        );
        setCounts(data.counts);
        setParticipants(data.participants || []);
        setPromotedDelegateIds(data.promotedDelegateIds || []);
        setChatMessages(data.chat || []);
        setQnaList(data.qna || []);
        setPolls(data.polls || []);
        setInvitedSpeakers(data.invitedProgramSpeakers || []);
        setLinkedResources(data.linkedResources || []);
        setJoinStatus('joined');
      } catch (err) {
        setJoinStatus('blocked');
        setJoinBlockReason({
          code: 'NETWORK_ERROR',
          message: (err as Error).message || 'Network failure connecting to Virtual Hall.',
        });
      }
    },
    [
      closeAllPeerConnections,
      desiredAffiliation,
      desiredEnv,
      desiredName,
      desiredRole,
      joinGreenRoomChecked,
      providedSignedToken,
      session.id,
    ]
  );

  // Initial mount join reading optional URL parameters (StrictMode-safe idempotent peerId)
  useEffect(() => {
    isMountedRef.current = true;
    fetch('/api/admin/session', { cache: 'no-store', credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (isMountedRef.current) {
          setIsAdminSessionActive(Boolean(d?.authenticated && d?.role === 'administrator'));
        }
      })
      .catch(() => {});

    try {
      const tabPeerKey = `kew_vh_tab_peer_${session.id}`;
      const savedTabPeer = window.sessionStorage.getItem(tabPeerKey);
      if (savedTabPeer) {
        myPeerIdRef.current = savedTabPeer;
      } else {
        window.sessionStorage.setItem(tabPeerKey, myPeerIdRef.current);
      }
    } catch {
      // ignore sessionStorage restrictions
    }
    const params = new URLSearchParams(window.location.search);
    const explicitRoleParam = params.get('role') as HallRole | null;
    const explicitNameParam = params.get('name');
    const explicitAffParam = params.get('affiliation');
    const qRole = explicitRoleParam || 'delegate';
    const qName = explicitNameParam || authUser?.name || '';
    const qAff = explicitAffParam || authUser?.institution || '';
    const qEnv = params.get('env') === 'live' ? 'live' : 'demo';
    const qToken = params.get('token') || '';
    const qGreen = params.get('greenroom') === '1';
    const qPreflight = params.get('preflight') === '1' || params.get('diagnostics') === '1';

    hasCustomNameRef.current = Boolean(explicitNameParam || authUser?.name);
    hasCustomAffRef.current = Boolean(explicitAffParam || authUser?.institution);

    setDesiredRole(qRole);
    if (qName) setDesiredName(qName);
    if (qAff) setDesiredAffiliation(qAff);
    setDesiredEnv(qEnv);
    setProvidedSignedToken(qToken);
    setJoinGreenRoomChecked(qGreen);
    if (qPreflight) {
      setShowDiagnostics(true);
    }

    joinHall({
      displayName: qName,
      affiliation: qAff,
      requestedRole: qRole,
      explicitRoleRequested: Boolean(explicitRoleParam),
      explicitNameProvided: Boolean(explicitNameParam || authUser?.name),
      explicitAffiliationProvided: Boolean(explicitAffParam || authUser?.institution),
      environmentMode: qEnv,
      providedToken: qToken,
      enterGreenRoom: qGreen,
    });

    const sendLeaveBeacon = () => {
      if (hallTokenRef.current) {
        fetch(`/api/webinars/room/${encodeURIComponent(session.id)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hallTokenRef.current}`,
          },
          body: JSON.stringify({
            action: 'leave',
            joinedAt: meRef.current?.joinedAt,
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };
    window.addEventListener('pagehide', sendLeaveBeacon);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('pagehide', sendLeaveBeacon);
      setTimeout(() => {
        if (!isMountedRef.current) {
          sendLeaveBeacon();
          closeAllPeerConnections();
          if (videoStreamRef.current) videoStreamRef.current.getTracks().forEach((t) => t.stop());
          if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach((t) => t.stop());
          if (screenStreamRef.current) screenStreamRef.current.getTracks().forEach((t) => t.stop());
        }
      }, 120);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);

  // Continuous incremental signaling & room heartbeat poll (cross-browser & cross-device!)
  useEffect(() => {
    if (joinStatus !== 'joined' || !hallToken) return;
    let cancelled = false;
    let pollInFlight = false;

    const pollSignals = async () => {
      if (cancelled || pollInFlight || !hallTokenRef.current) return;
      pollInFlight = true;
      try {
        const res = await fetch(
          `/api/webinars/room/${encodeURIComponent(session.id)}/signal?sinceSeq=${lastSeqRef.current}`,
          {
            headers: { Authorization: `Bearer ${hallTokenRef.current}` },
            cache: 'no-store',
          }
        );
        if (res.status === 410) {
          if (!roomConfigRef.current?.isSessionEnded && autoRecoverCountRef.current < 2) {
            autoRecoverCountRef.current += 1;
            joinHall();
            return;
          }
          setJoinStatus('blocked');
          setJoinBlockReason({
            code: 'SESSION_DISCONNECTED',
            message: 'Your room session has ended or was disconnected.',
          });
          return;
        }
        if (!res.ok) return;
        autoRecoverCountRef.current = 0;
        const data = await res.json();
        if (cancelled || !data.ok) return;

        if (typeof data.currentSeq === 'number' && data.currentSeq > lastSeqRef.current) {
          lastSeqRef.current = data.currentSeq;
        }
        if (data.me) {
          meRef.current = data.me;
          setMe(data.me);
        }
        if (data.permissions) setPermissions(data.permissions);
        if (data.roomConfig) {
          setRoomConfig(data.roomConfig);
          if (typeof data.roomConfig.isSlideDeckOpen === 'boolean') {
            const nextDeckOpen = Boolean(data.roomConfig.isSlideDeckOpen);
            setIsSlideDeckActive((prevOpen) => {
              if (prevOpen && !nextDeckOpen && !screenStreamRef.current) {
                setStageLayout((cur) =>
                  cur === 'presentation' || cur === 'fullscreen_presentation' ? 'active_speaker' : cur
                );
              }
              return nextDeckOpen;
            });
          }
        }
        if (data.counts) setCounts(data.counts);
        // Process peer_left signals BEFORE reconciling active peer connections so a same-cycle
        // reload (peer_left -> peer_joined) closes the stale PC first and opens a fresh PC immediately
        if (Array.isArray(data.signals)) {
          for (const sig of data.signals as SignalEnvelope[]) {
            if (sig.type === 'peer_left') {
              await handleSignalEnvelope(sig);
            }
          }
        }

        if (Array.isArray(data.participants)) {
          setParticipants(data.participants);
          // Star / Publisher-Subscriber P2P topology:
          // Listen-only delegates connect exclusively to potential/active publishers (Speakers, Hosts,
          // Moderators, Producers, Promoted Speakers, or Applied Workshop peers), eliminating N*(N-1)/2
          // idle delegate-to-delegate connections while preserving immediate promotion & workshop mesh.
          if (data.me?.presence === 'connected') {
            const nextPromoted: string[] = Array.isArray(data.promotedDelegateIds)
              ? data.promotedDelegateIds
              : [];
            const activeMode = data.roomConfig?.eventMode || roomConfigRef.current?.eventMode;
            const isPublisherCapable = (p: HallParticipant) =>
              p.role !== 'delegate' && p.role !== 'observer'
                ? true
                : nextPromoted.includes(p.peerId) ||
                  activeMode === 'applied_workshop' ||
                  Boolean(p.isAudioEnabled || p.isVideoEnabled || p.isScreenSharing);

            const amIPublisherCapable = isPublisherCapable(data.me as HallParticipant);
            const activeRemoteIds = new Set<string>();
            for (const p of data.participants as HallParticipant[]) {
              if (p.peerId !== myPeerIdRef.current && p.presence === 'connected') {
                if (amIPublisherCapable || isPublisherCapable(p)) {
                  activeRemoteIds.add(p.peerId);
                  getOrCreatePeerConnection(p.peerId, true);
                }
              }
            }
            for (const existingId of Array.from(peersRef.current.keys())) {
              if (!activeRemoteIds.has(existingId)) {
                closePeerConnection(existingId);
              }
            }
          } else {
            // In Green Room or Waiting Room: ensure zero public WebRTC connections!
            closeAllPeerConnections();
          }
        }
        if (Array.isArray(data.promotedDelegateIds)) {
          setPromotedDelegateIds(data.promotedDelegateIds);
        }
        if (Array.isArray(data.qna)) setQnaList(data.qna);
        if (Array.isArray(data.polls)) setPolls(data.polls);

        if (Array.isArray(data.signals)) {
          for (const sig of data.signals as SignalEnvelope[]) {
            if (sig.type !== 'peer_left') {
              await handleSignalEnvelope(sig);
            }
          }
        }
      } catch {
        // transient network hiccup; next poll recovers
      } finally {
        pollInFlight = false;
      }
    };

    const handleBrowserOnline = () => {
      for (const [remotePeerId, entry] of peersRef.current.entries()) {
        if (
          entry.pc.iceConnectionState === 'failed' ||
          entry.pc.iceConnectionState === 'disconnected'
        ) {
          entry.pc.restartIce?.();
          negotiateWithPeer(remotePeerId);
        }
      }
      pollSignals();
    };

    window.addEventListener('online', handleBrowserOnline);
    const interval = setInterval(pollSignals, 450);
    pollSignals();
    return () => {
      cancelled = true;
      window.removeEventListener('online', handleBrowserOnline);
      clearInterval(interval);
    };
  }, [
    closeAllPeerConnections,
    closePeerConnection,
    getOrCreatePeerConnection,
    hallToken,
    handleSignalEnvelope,
    joinHall,
    joinStatus,
    negotiateWithPeer,
    session.id,
  ]);

  // Real RTCPeerConnection.getStats() sampler every 1.5s (Zero Simulated Metrics!)
  useEffect(() => {
    const timer = setInterval(async () => {
      const entries = Array.from(peersRef.current.values());
      const hasTurnConfigured = iceServersRef.current.some((s) => {
        const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
        return urls.some((u) => typeof u === 'string' && /^turns?:/i.test(u));
      });
      const liveAudioTrackActive = Boolean(
        isMicOn &&
          meRef.current?.presence === 'connected' &&
          audioStreamRef.current?.getAudioTracks().some((t) => t.readyState === 'live' && t.enabled)
      );
      const liveVideoTrackActive = Boolean(
        isVideoOn &&
          meRef.current?.presence === 'connected' &&
          videoStreamRef.current?.getVideoTracks().some((t) => t.readyState === 'live' && t.enabled)
      );
      const liveScreenTrackActive = Boolean(
        isScreenSharing &&
          meRef.current?.presence === 'connected' &&
          screenStreamRef.current?.getVideoTracks().some((t) => t.readyState === 'live')
      );

      if (entries.length === 0) {
        const localVidSettings = liveVideoTrackActive
          ? videoStreamRef.current?.getVideoTracks()[0]?.getSettings?.()
          : liveScreenTrackActive
          ? screenStreamRef.current?.getVideoTracks()[0]?.getSettings?.()
          : undefined;
        const localVideoRes =
          localVidSettings?.width && localVidSettings?.height
            ? `${localVidSettings.width}×${localVidSettings.height}`
            : null;
        const localFps = localVidSettings?.frameRate
          ? Math.round(localVidSettings.frameRate)
          : null;

        setTelemetry({
          activePeerConnections: 0,
          connectionState: joinStatus === 'joined' ? 'standby' : 'offline',
          iceGatheringState: 'standby',
          iceConnectionState: 'standby',
          signalingConnected: joinStatus === 'joined',
          rttMs: null,
          jitterMs: null,
          packetsLost: 0,
          packetsReceived: 0,
          packetsSent: 0,
          inboundKbps: 0,
          outboundKbps: 0,
          videoResolution: localVideoRes,
          framesPerSecond: localFps,
          candidateType: null,
          remoteCandidateType: null,
          turnConfigured: hasTurnConfigured,
          turnRelayVerified: false,
          remoteAudioSubscribed: false,
          localMediaPublished: {
            audio: liveAudioTrackActive,
            video: liveVideoTrackActive,
            screen: liveScreenTrackActive,
          },
          activeRtpTransmission: false,
          sampledAt: null,
        });
        return;
      }

      let rttMs: number | null = null;
      let jitterMs: number | null = null;
      let packetsLost = 0;
      let packetsReceived = 0;
      let packetsSent = 0;
      let bytesRx = 0;
      let bytesTx = 0;
      let videoRes: string | null = null;
      let fps: number | null = null;
      let candidateType: string | null = null;
      let remoteCandidateType: string | null = null;
      let connState: string = entries[0].pc.connectionState;
      let iceGathState: string = entries[0].pc.iceGatheringState;
      let iceConnState: string = entries[0].pc.iceConnectionState;
      let remoteAudioSubscribed = false;
      let senderHasAudio = false;
      let senderHasVideo = false;

      for (const entry of entries) {
        const { pc, remoteStream } = entry;
        // Self-healing publisher track sync: ensure every stable peer connection receives active local media
        if (pc.signalingState === 'stable' && !entry.makingOffer) {
          const senders = pc.getSenders();
          const missingLiveAudio =
            liveAudioTrackActive &&
            !senders.some((s) => s.track?.kind === 'audio' && s.track.readyState === 'live');
          const missingLiveVideo =
            (liveVideoTrackActive || liveScreenTrackActive) &&
            !senders.some((s) => s.track?.kind === 'video' && s.track.readyState === 'live');
          if (missingLiveAudio || missingLiveVideo) {
            negotiateWithPeer(entry.peerId);
          }
        }
        if (pc.connectionState === 'connected') connState = 'connected';
        if (pc.iceGatheringState === 'complete') iceGathState = 'complete';
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          iceConnState = pc.iceConnectionState;
        }
        if (
          remoteStream.getAudioTracks().some((t) => t.readyState === 'live' && !t.muted)
        ) {
          remoteAudioSubscribed = true;
        }
        for (const sender of pc.getSenders()) {
          if (sender.track?.readyState === 'live' && sender.track.enabled) {
            if (sender.track.kind === 'audio') senderHasAudio = true;
            if (sender.track.kind === 'video') senderHasVideo = true;
          }
        }

        try {
          const stats = await pc.getStats();
          const candidateMap = new Map<string, { candidateType?: string }>();
          const selectedPairIds = new Set<string>();
          stats.forEach((report) => {
            if (report.type === 'local-candidate' || report.type === 'remote-candidate') {
              candidateMap.set(report.id, report);
            }
            if (report.type === 'transport' && report.selectedCandidatePairId) {
              selectedPairIds.add(report.selectedCandidatePairId);
            }
          });
          stats.forEach((report) => {
            if (
              report.type === 'candidate-pair' &&
              (selectedPairIds.has(report.id) ||
                report.selected === true ||
                (report.state === 'succeeded' && report.nominated !== false))
            ) {
              if (typeof report.currentRoundTripTime === 'number') {
                rttMs = Math.round(report.currentRoundTripTime * 1000);
              }
              const localCand = candidateMap.get(report.localCandidateId);
              const remoteCand = candidateMap.get(report.remoteCandidateId);
              if (localCand?.candidateType) candidateType = localCand.candidateType;
              if (remoteCand?.candidateType) remoteCandidateType = remoteCand.candidateType;
            }
            if (report.type === 'inbound-rtp') {
              bytesRx += report.bytesReceived || 0;
              packetsLost += report.packetsLost || 0;
              packetsReceived += report.packetsReceived || 0;
              if (report.kind === 'audio' && (report.bytesReceived || 0) > 0) {
                remoteAudioSubscribed = true;
              }
              if (typeof report.jitter === 'number') {
                jitterMs = Math.round(report.jitter * 1000);
              }
              if (report.kind === 'video' && report.frameWidth && report.frameHeight) {
                videoRes = `${report.frameWidth}×${report.frameHeight}`;
                if (report.framesPerSecond) fps = Math.round(report.framesPerSecond);
              }
            }
            if (report.type === 'outbound-rtp') {
              bytesTx += report.bytesSent || 0;
              packetsSent += report.packetsSent || 0;
              if (!videoRes && report.kind === 'video' && report.frameWidth && report.frameHeight) {
                videoRes = `${report.frameWidth}×${report.frameHeight}`;
                if (report.framesPerSecond) fps = Math.round(report.framesPerSecond);
              }
            }
          });
        } catch {
          // ignore closed pc race
        }
      }

      const now = Date.now();
      let inKbps = 0;
      let outKbps = 0;
      if (prevBytesRef.current.ts > 0 && now > prevBytesRef.current.ts) {
        const dtSec = (now - prevBytesRef.current.ts) / 1000;
        inKbps = Math.max(0, Math.round(((bytesRx - prevBytesRef.current.rx) * 8) / 1000 / dtSec));
        outKbps = Math.max(0, Math.round(((bytesTx - prevBytesRef.current.tx) * 8) / 1000 / dtSec));
      }
      const deltaPktsRx = Math.max(0, packetsReceived - prevPacketsRef.current.rx);
      const deltaPktsTx = Math.max(0, packetsSent - prevPacketsRef.current.tx);
      prevBytesRef.current = { rx: bytesRx, tx: bytesTx, ts: now };
      prevPacketsRef.current = { rx: packetsReceived, tx: packetsSent };

      const turnRelayVerified = candidateType === 'relay' || remoteCandidateType === 'relay';
      // Strictly distinguish local media rendering from active remote WebRTC RTP packet flow
      const activeRtpTransmission =
        connState === 'connected' &&
        (inKbps > 0 || outKbps > 0 || deltaPktsRx > 0 || deltaPktsTx > 0);

      setTelemetry({
        activePeerConnections: entries.length,
        connectionState: connState,
        iceGatheringState: iceGathState,
        iceConnectionState: iceConnState,
        signalingConnected: joinStatus === 'joined',
        rttMs,
        jitterMs,
        packetsLost,
        packetsReceived,
        packetsSent,
        inboundKbps: inKbps,
        outboundKbps: outKbps,
        videoResolution: videoRes,
        framesPerSecond: fps,
        candidateType,
        remoteCandidateType,
        turnConfigured: hasTurnConfigured,
        turnRelayVerified,
        remoteAudioSubscribed,
        localMediaPublished: {
          audio: liveAudioTrackActive || senderHasAudio,
          video: (liveVideoTrackActive && !liveScreenTrackActive) || (senderHasVideo && !liveScreenTrackActive),
          screen: liveScreenTrackActive,
        },
        activeRtpTransmission,
        sampledAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [isMicOn, isScreenSharing, isVideoOn, joinStatus]);

  // Toggle Microphone (checks server RBAC & Phase I 2-speaker cap when on main stage)
  const toggleMic = useCallback(async () => {
    setMicError(null);
    if (isMicOn) {
      if (audioStreamRef.current) {
        audioStreamRef.current.getAudioTracks().forEach((t) => {
          t.enabled = false;
        });
      }
      setIsMicOn(false);
      setMicAudioLevel(0);
      await postSignalAction({ action: 'update_media_state', isAudioEnabled: false });
      for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
      return;
    }

    // Check server authorization first if connected on main stage
    if (me?.presence === 'connected') {
      const check = await postSignalAction({ action: 'update_media_state', isAudioEnabled: true });
      if (!check.ok) {
        const msg = check.data?.error || 'Microphone publication not permitted for current role.';
        setMicError(msg);
        pushNotice(msg, 'warn');
        return;
      }
    }

    try {
      const existing = audioStreamRef.current?.getAudioTracks()[0];
      if (existing && existing.readyState === 'live') {
        existing.enabled = true;
        setIsMicOn(true);
        if (audioStreamRef.current) attachLocalAudioMeter(audioStreamRef.current);
      } else {
        let stream: MediaStream | null = null;
        if (selectedMicId) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: {
                deviceId: { exact: selectedMicId },
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
              },
              video: false,
            });
          } catch {
            stream = null;
          }
        }
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              ...(selectedMicId ? { deviceId: { ideal: selectedMicId } } : {}),
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
            video: false,
          });
        }
        const liveMicTrack = stream.getAudioTracks()[0];
        if (liveMicTrack) {
          saveVerifiedDevicePrefs({
            audioInputId: liveMicTrack.getSettings?.()?.deviceId || selectedMicId || undefined,
            audioInputLabel: liveMicTrack.label || undefined,
            audioInputVerifiedAt: new Date().toISOString(),
          });
        }
        audioStreamRef.current = stream;
        setIsMicOn(true);
        setMicPermissionStatus('granted');
        attachLocalAudioMeter(stream);
        refreshDevices();
      }
      if (me?.presence === 'connected') {
        for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
      }
    } catch (err) {
      const e = err as Error;
      setIsMicOn(false);
      await postSignalAction({ action: 'update_media_state', isAudioEnabled: false });
      const msg =
        e.name === 'NotAllowedError'
          ? 'Microphone permission blocked in browser settings.'
          : `Microphone error: ${e.message}`;
      setMicPermissionStatus(e.name === 'NotAllowedError' ? 'denied' : 'prompt');
      setMicError(msg);
      pushNotice(msg, 'warn');
    }
  }, [
    attachLocalAudioMeter,
    isMicOn,
    me?.presence,
    negotiateWithPeer,
    postSignalAction,
    pushNotice,
    refreshDevices,
    selectedMicId,
    setMicPermissionStatus,
  ]);

  // Toggle Hardware Camera (aligned with verified Diagnostics exact deviceId & 1280×720 constraints)
  const startHardwareCamera = useCallback(
    async (deviceOverride?: string) => {
      if (cameraStateRef.current === 'REQUESTING' || cameraStateRef.current === 'STOPPING') return;
      setCameraError(null);

      if (me?.presence === 'connected') {
        const check = await postSignalAction({ action: 'update_media_state', isVideoEnabled: true });
        if (!check.ok) {
          const msg = check.data?.error || 'Camera publication not permitted for current role.';
          setCameraError(msg);
          pushNotice(msg, 'warn');
          return;
        }
      }

      cameraStateRef.current = 'REQUESTING';
      setIsCameraLoading(true);
      try {
        if (videoStreamRef.current) {
          await stopCurrentVideoTracks();
          cameraStateRef.current = 'REQUESTING';
        }

        const stream = await acquireVerifiedHardwareCameraStream({
          deviceOverride,
          selectedCameraId,
          knownVideoDevices: videoDevices,
        });

        const track = stream.getVideoTracks()[0];
        if (!track || track.readyState !== 'live') {
          stream.getTracks().forEach((t) => {
            try {
              t.stop();
            } catch {}
          });
          throw new Error('No active live video track returned by selected camera.');
        }

        track.enabled = true;
        track.onended = () => {
          if (videoStreamRef.current === stream) {
            markCameraHardwareReleased();
            videoStreamRef.current = null;
            setVideoStream(null);
            setIsVideoOn(false);
            cameraStateRef.current = 'IDLE';
            postSignalAction({ action: 'update_media_state', isVideoEnabled: false }).catch(() => {});
            for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
            pushNotice('Camera stream ended or device was disconnected.', 'warn');
          }
        };

        const settings = track.getSettings?.() || {};
        const actualCamId = settings.deviceId || deviceOverride || selectedCameraId || '';
        const actualCamLabel = track.label || '';

        if (actualCamId) {
          setSelectedCameraId(actualCamId);
        }
        setCameraPermissionStatus('granted');

        saveVerifiedDevicePrefs({
          videoInputId: actualCamId || undefined,
          videoInputLabel: actualCamLabel || undefined,
          videoInputVerifiedAt: new Date().toISOString(),
        });

        videoStreamRef.current = stream;
        setVideoStream(stream);
        setIsVideoOn(true);
        cameraStateRef.current = 'ACTIVE';

        // Immediately reflect active video on local participant state even with zero remote peers
        setMe((prev) => (prev ? { ...prev, isVideoEnabled: true } : prev));
        setParticipants((prev) =>
          prev.map((p) =>
            p.peerId === myPeerIdRef.current ? { ...p, isVideoEnabled: true } : p
          )
        );

        // Ensure main conference stage visibly foregrounds the live camera if no deck/screen share is active
        if (
          !isScreenSharing &&
          !isSlideDeckActive &&
          (stageLayout === 'presentation' || stageLayout === 'fullscreen_presentation')
        ) {
          setStageLayout('active_speaker');
        }

        refreshDevices();

        if (me?.presence === 'connected') {
          for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
        }
      } catch (err) {
        cameraStateRef.current = 'IDLE';
        setIsVideoOn(false);
        setVideoStream(null);
        await postSignalAction({ action: 'update_media_state', isVideoEnabled: false }).catch(
          () => {}
        );

        const domErr = err as DOMException & { constraint?: string };
        const errName = domErr?.name || 'Error';
        const errMessage = domErr?.message || String(err);
        const errConstraint = domErr?.constraint ? ` [constraint: ${domErr.constraint}]` : '';
        console.warn('[KEW Conference Camera] Hardware activation failed:', {
          name: errName,
          message: errMessage,
          constraint: domErr?.constraint,
          selectedCameraId: deviceOverride || selectedCameraId,
        });

        if (
          errName === 'NotAllowedError' ||
          errName === 'PermissionDeniedError' ||
          errName === 'SecurityError'
        ) {
          setCameraPermissionStatus('denied');
        }

        const lockHint =
          errName === 'NotReadableError' || errName === 'TrackStartError'
            ? ' (Close any other browser window or video app currently using this camera and retry.)'
            : '';
        const msg = `Camera error (${errName}: ${errMessage}${errConstraint})${lockHint}`;
        setCameraError(msg);
        pushNotice(msg, 'warn');
      } finally {
        setIsCameraLoading(false);
      }
    },
    [
      isScreenSharing,
      isSlideDeckActive,
      me?.presence,
      negotiateWithPeer,
      postSignalAction,
      pushNotice,
      refreshDevices,
      selectedCameraId,
      setCameraPermissionStatus,
      setSelectedCameraId,
      stageLayout,
      stopCurrentVideoTracks,
      videoDevices,
    ]
  );

  // Sync live on-air streams if user switches device inside Diagnostics while already broadcasting
  liveDeviceSwitchRef.current = {
    onMic: (id: string) => {
      if (isMicOn && audioStreamRef.current) {
        navigator.mediaDevices
          .getUserMedia({
            audio: id
              ? { deviceId: { ideal: id }, echoCancellation: true, noiseSuppression: true, autoGainControl: true }
              : true,
            video: false,
          })
          .then((nextStream) => {
            audioStreamRef.current?.getTracks().forEach((t) => t.stop());
            audioStreamRef.current = nextStream;
            attachLocalAudioMeter(nextStream);
            for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
          })
          .catch(() => {});
      }
    },
    onCam: (id: string) => {
      if (isVideoOn) {
        startHardwareCamera(id);
      }
    },
  };

  const toggleCamera = useCallback(async () => {
    if (isVideoOn) {
      await stopCurrentVideoTracks();
      await postSignalAction({ action: 'update_media_state', isVideoEnabled: false });
      for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
    } else {
      await startHardwareCamera();
    }
  }, [isVideoOn, negotiateWithPeer, postSignalAction, startHardwareCamera, stopCurrentVideoTracks]);

  // Screen Sharing (Real getDisplayMedia + automatic presentation layout switch)
  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      setScreenStream(null);
      setIsScreenSharing(false);
      await postSignalAction({ action: 'update_media_state', isScreenSharing: false });
      for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
      return;
    }

    if (me?.presence === 'connected') {
      const check = await postSignalAction({ action: 'update_media_state', isScreenSharing: true });
      if (!check.ok) {
        pushNotice(check.data?.error || 'Screen sharing requires Presenter/Host role.', 'warn');
        return;
      }
    }

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const screenTrack = displayStream.getVideoTracks()[0];
      if (!screenTrack) throw new Error('Screen share cancelled.');
      screenTrack.onended = () => {
        screenStreamRef.current = null;
        setScreenStream(null);
        setIsScreenSharing(false);
        postSignalAction({ action: 'update_media_state', isScreenSharing: false });
        for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
      };

      screenStreamRef.current = displayStream;
      setScreenStream(displayStream);
      setIsScreenSharing(true);
      if (stageLayout === 'active_speaker' || stageLayout === 'gallery') {
        setStageLayout('presentation');
      }
      if (me?.presence === 'connected') {
        for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
      }
    } catch (err) {
      await postSignalAction({ action: 'update_media_state', isScreenSharing: false });
      pushNotice(`Screen share cancelled or blocked: ${(err as Error).message}`, 'info');
    }
  }, [isScreenSharing, me?.presence, negotiateWithPeer, postSignalAction, pushNotice, stageLayout]);

  // Toggle Green Room <-> Main Stage (for authorized Speakers / Hosts / Producers)
  const toggleGreenRoomPresence = useCallback(async () => {
    if (!me) return;
    const nextPresence = me.presence === 'green_room' ? 'connected' : 'green_room';
    if (nextPresence === 'green_room') {
      closeAllPeerConnections();
    }
    const res = await postSignalAction({
      action: 'update_media_state',
      presence: nextPresence,
      isAudioEnabled: nextPresence === 'connected' ? isMicOn : false,
      isVideoEnabled: nextPresence === 'connected' ? isVideoOn : false,
      isScreenSharing: nextPresence === 'connected' ? isScreenSharing : false,
    });
    if (res.ok) {
      pushNotice(
        nextPresence === 'green_room'
          ? 'Entered private Backstage Green Room. Your audio/video is off-air.'
          : 'You are now live in the Main Scientific Hall.',
        nextPresence === 'green_room' ? 'info' : 'ok'
      );
    } else {
      pushNotice(res.data?.error || 'Unable to switch stage state.', 'warn');
    }
  }, [closeAllPeerConnections, isMicOn, isScreenSharing, isVideoOn, me, postSignalAction, pushNotice]);

  // Consent-based Recording (MediaRecorder -> /api/webinars/recordings enforcing 1 GB quota)
  useEffect(() => {
    if (!isRecordingLocal && !roomConfig.activeConsentRecordingId) {
      setRecordingSeconds(0);
      return;
    }
    const t = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isRecordingLocal, roomConfig.activeConsentRecordingId]);

  const startConsentRecording = useCallback(async () => {
    if (!consentChecked) {
      pushNotice('Confirm participant recording consent before starting.', 'warn');
      return;
    }
    const res = await fetch('/api/webinars/recordings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hallTokenRef.current}`,
      },
      body: JSON.stringify({
        action: 'start_recording',
        roomId: session.id,
        conferenceTitle: session.title,
        consentConfirmed: true,
        mimeType: 'video/webm',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      pushNotice(data.error || 'Unable to authorize recording.', 'warn');
      return;
    }

    const recId = data.recording.id as string;
    setActiveRecordingId(recId);
    setShowRecordingConsentModal(false);

    // Build MediaStream to record (active screen/video or lightweight canvas + audio tracks)
    const combinedTracks: MediaStreamTrack[] = [];
    const activeVid =
      screenStreamRef.current?.getVideoTracks()[0] || videoStreamRef.current?.getVideoTracks()[0];
    if (activeVid) combinedTracks.push(activeVid);
    const activeAud = audioStreamRef.current?.getAudioTracks()[0];
    if (activeAud) combinedTracks.push(activeAud);
    for (const remStream of Object.values(remoteStreamsByPeer)) {
      remStream.getTracks().forEach((t) => {
        if (combinedTracks.length < 4) combinedTracks.push(t);
      });
    }

    if (combinedTracks.length > 0 && typeof MediaRecorder !== 'undefined') {
      try {
        recordedChunksRef.current = [];
        const mr = new MediaRecorder(new MediaStream(combinedTracks));
        mr.ondataavailable = (ev) => {
          if (ev.data && ev.data.size > 0) recordedChunksRef.current.push(ev.data);
        };
        mr.start(1000);
        mediaRecorderRef.current = mr;
      } catch {
        mediaRecorderRef.current = null;
      }
    }

    setIsRecordingLocal(true);
    pushNotice('Consent-based session recording started (1 GB institutional quota active).', 'ok');
  }, [consentChecked, pushNotice, remoteStreamsByPeer, session.id, session.title]);

  const stopConsentRecording = useCallback(async () => {
    const recId = activeRecordingId || roomConfig.activeConsentRecordingId;
    if (!recId) return;
    const duration = Math.max(1, recordingSeconds);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      await new Promise<void>((resolve) => {
        if (!mediaRecorderRef.current) return resolve();
        mediaRecorderRef.current.onstop = () => resolve();
        mediaRecorderRef.current.stop();
      });
    }
    mediaRecorderRef.current = null;
    setIsRecordingLocal(false);
    setActiveRecordingId(null);
    setRoomConfig((prev) => ({ ...prev, activeConsentRecordingId: null }));

    if (recordedChunksRef.current.length > 0) {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      recordedChunksRef.current = [];
      const fd = new FormData();
      fd.append('recordingId', recId);
      fd.append('hallToken', hallTokenRef.current);
      fd.append('durationSeconds', String(duration));
      fd.append('file', blob, `${recId}.webm`);

      const up = await fetch('/api/webinars/recordings', { method: 'POST', body: fd });
      const upData = await up.json().catch(() => ({}));
      if (up.ok && upData.ok) {
        pushNotice(
          `Recording archived privately (${(blob.size / 1024).toFixed(1)} KB). Requires Admin approval before publication.`,
          'ok'
        );
      } else {
        pushNotice(upData.error || 'Recording upload failed quota check.', 'warn');
      }
    } else {
      await fetch('/api/webinars/recordings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hallTokenRef.current}`,
        },
        body: JSON.stringify({
          action: 'stop_recording',
          recordingId: recId,
          durationSeconds: duration,
        }),
      });
      pushNotice('Recording session stopped.', 'info');
    }
  }, [activeRecordingId, pushNotice, recordingSeconds, roomConfig.activeConsentRecordingId]);

  // Live Captions via Browser Web Speech API (labeled honestly)
  const toggleLiveCaptions = useCallback(() => {
    if (captionsEnabled) {
      speechRecRef.current?.stop();
      speechRecRef.current = null;
      setCaptionsEnabled(false);
      setCaptionTranscript('');
      return;
    }
    const SpeechRec =
      (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;

    if (!SpeechRec) {
      setCaptionsSupported(false);
      setCaptionsEnabled(true);
      setCaptionTranscript(
        'Browser Web Speech captioning is not available in this browser engine. Use Chrome/Edge for live speech-to-text captions.'
      );
      return;
    }

    try {
      const rec = new SpeechRec() as {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
        onerror: () => void;
        start: () => void;
        stop: () => void;
      };
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      rec.onresult = (ev) => {
        const last = ev.results[ev.results.length - 1];
        if (last && last[0]) setCaptionTranscript(last[0].transcript);
      };
      rec.onerror = () => {};
      rec.start();
      speechRecRef.current = rec;
      setCaptionsSupported(true);
      setCaptionsEnabled(true);
      setCaptionTranscript('Listening for spoken audio (Browser Live Captions)...');
    } catch {
      setCaptionsEnabled(true);
      setCaptionTranscript('Enable microphone access to generate browser live captions.');
    }
  }, [captionsEnabled]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      rootContainerRef.current?.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Desktop sidebar drag-to-resize
  const handleStartResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = sidebarWidth;
    const onMove = (mv: MouseEvent) => {
      const delta = startX - mv.clientX;
      setSidebarWidth(Math.max(290, Math.min(480, startW + delta)));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [sidebarWidth]);

  // Host command wrapper (immediately applies authoritative server response)
  const sendHostCommand = useCallback(
    async (command: string, extra: Record<string, unknown> = {}) => {
      const res = await postSignalAction({ action: 'host_control', command, ...extra });
      if (!res.ok) {
        pushNotice(res.data?.error || 'Host permission denied.', 'warn');
        return;
      }
      if (res.data?.roomConfig) {
        const cfg = res.data.roomConfig as RoomAllocationConfig;
        setRoomConfig((prev) => ({ ...prev, ...cfg }));
        if (typeof cfg.isSlideDeckOpen === 'boolean') {
          setIsSlideDeckActive(cfg.isSlideDeckOpen);
        }
      }
      if (Array.isArray(res.data?.promotedDelegateIds)) {
        setPromotedDelegateIds(res.data.promotedDelegateIds as string[]);
      }
    },
    [postSignalAction, pushNotice]
  );

  // Connected main-stage participants (strictly deduplicated by peerId) + zero-remote-peer local guarantee
  const connectedParticipants = useMemo(() => {
    const byPeer = new Map<string, HallParticipant>();
    for (const p of participants) {
      if (p.presence === 'connected' && p.peerId) {
        byPeer.set(p.peerId, p);
      }
    }
    if (me && me.presence === 'connected' && me.peerId) {
      if (!byPeer.has(me.peerId) && !(myPeerId && byPeer.has(myPeerId))) {
        return [me, ...Array.from(byPeer.values())];
      }
    }
    return Array.from(byPeer.values());
  }, [me, myPeerId, participants]);

  const handleVideoDimensionsChange = useCallback(
    (peerId: string, width: number, height: number) => {
      if (!peerId || width <= 0 || height <= 0) return;
      const ratio = Math.max(0.5, Math.min(2.4, Math.round((width / height) * 1000) / 1000));
      setVideoAspectsByPeer((prev) => (prev[peerId] === ratio ? prev : { ...prev, [peerId]: ratio }));
    },
    []
  );

  const stageTiles = useMemo(() => {
    const realTiles = connectedParticipants.map((p) => {
      const isLocal =
        p.peerId === myPeerId ||
        (Boolean(me?.peerId) && p.peerId === me?.peerId) ||
        p.peerId === myPeerIdRef.current;
      const remoteVid = remoteStreamsByPeer[p.peerId] || null;
      // Require non-muted remote video track + authoritative server video/screen flag so idle recvonly transceivers never render black video boxes
      const hasLiveRemoteVideo = Boolean(
        remoteVid && remoteVid.getVideoTracks().some((t) => t.readyState === 'live' && !t.muted)
      );
      const isFloorGranted =
        promotedDelegateIds.includes(p.peerId) ||
        (roomConfig.eventMode === 'applied_workshop' && p.role === 'delegate');
      // Keep participant tile stream focused on camera video (not duplicating a shared screen already shown on the presentation stage)
      const tileCameraStream = isLocal
        ? videoStream
        : p.isVideoEnabled && !p.isScreenSharing
        ? remoteVid
        : p.isVideoEnabled && hasLiveRemoteVideo
        ? remoteVid
        : null;
      const tileVideoActive = isLocal
        ? Boolean(isVideoOn && videoStream)
        : Boolean(p.isVideoEnabled && !p.isScreenSharing && (hasLiveRemoteVideo || remoteVid));

      return {
        peerId: p.peerId,
        name: p.displayName,
        affiliation: p.affiliation,
        role: p.role,
        isLocal,
        isAudioEnabled: isLocal ? isMicOn : p.isAudioEnabled,
        isVideoEnabled: tileVideoActive,
        isScreenSharing: isLocal ? isScreenSharing : p.isScreenSharing,
        isHandRaised: p.isHandRaised,
        isSpotlighted: roomConfig.spotlightPeerId === p.peerId,
        isVerifiedIdentity: p.isVerifiedIdentity,
        isFloorGranted,
        isDemoPlaceholder: false,
        audioLevel: isLocal ? micAudioLevel : p.isAudioEnabled ? remoteAudioLevel : 0,
        videoStream: tileCameraStream,
        mirrored: isLocal,
        onVideoDimensionsChange: handleVideoDimensionsChange,
      };
    });

    if (showDemoLayoutPreview && environmentMode === 'demo') {
      realTiles.push(
        {
          peerId: 'sandbox-preview-a',
          name: 'Sandbox Presenter A',
          affiliation: 'Fictional Layout Preview Tile',
          role: 'speaker',
          isLocal: false,
          isAudioEnabled: false,
          isVideoEnabled: false,
          isScreenSharing: false,
          isHandRaised: false,
          isSpotlighted: false,
          isVerifiedIdentity: false,
          isFloorGranted: false,
          isDemoPlaceholder: true,
          audioLevel: 0,
          videoStream: null,
          mirrored: false,
          onVideoDimensionsChange: handleVideoDimensionsChange,
        },
        {
          peerId: 'sandbox-preview-b',
          name: 'Sandbox Moderator B',
          affiliation: 'Fictional Layout Preview Tile',
          role: 'moderator',
          isLocal: false,
          isAudioEnabled: false,
          isVideoEnabled: false,
          isScreenSharing: false,
          isHandRaised: false,
          isSpotlighted: false,
          isVerifiedIdentity: false,
          isFloorGranted: false,
          isDemoPlaceholder: true,
          audioLevel: 0,
          videoStream: null,
          mirrored: false,
          onVideoDimensionsChange: handleVideoDimensionsChange,
        }
      );
    }

    return realTiles;
  }, [
    connectedParticipants,
    environmentMode,
    handleVideoDimensionsChange,
    isMicOn,
    isScreenSharing,
    isVideoOn,
    me?.peerId,
    micAudioLevel,
    myPeerId,
    promotedDelegateIds,
    remoteAudioLevel,
    remoteStreamsByPeer,
    roomConfig.eventMode,
    roomConfig.spotlightPeerId,
    showDemoLayoutPreview,
    videoStream,
  ]);

  const primaryTile = useMemo(() => {
    return (
      stageTiles.find((t) => t.isSpotlighted) ||
      stageTiles.find((t) => !t.isLocal && t.isVideoEnabled) ||
      stageTiles.find((t) => t.isVideoEnabled) ||
      stageTiles.find((t) => t.role === 'host' || t.role === 'speaker') ||
      stageTiles[0] ||
      null
    );
  }, [stageTiles]);

  const highlightedQuestion = useMemo(
    () => qnaList.find((q) => q.isHighlightedOnStage),
    [qnaList]
  );

  const isAnyRecordingActive = Boolean(isRecordingLocal || roomConfig.activeConsentRecordingId);
  const currentSlide =
    SCIENTIFIC_SLIDES[roomConfig.activeSlideDeckIndex % SCIENTIFIC_SLIDES.length] ||
    SCIENTIFIC_SLIDES[0];

  const isSlideDeckEffective = Boolean(isSlideDeckActive || roomConfig.isSlideDeckOpen);
  const activeScreenShareTarget = useMemo(() => {
    if (isScreenSharing && screenStream) {
      const meTile = stageTiles.find((t) => t.isLocal) || stageTiles[0];
      return meTile
        ? { ...meTile, isVideoEnabled: true, isScreenSharing: true, videoStream: screenStream, mirrored: false }
        : null;
    }
    const remoteScreenPeer = connectedParticipants.find(
      (p) => p.peerId !== myPeerId && p.isScreenSharing && remoteStreamsByPeer[p.peerId]
    );
    if (remoteScreenPeer) {
      const remTile = stageTiles.find((t) => t.peerId === remoteScreenPeer.peerId);
      if (remTile) {
        return {
          ...remTile,
          isVideoEnabled: true,
          isScreenSharing: true,
          videoStream: remoteStreamsByPeer[remoteScreenPeer.peerId],
          mirrored: false,
        };
      }
    }
    return null;
  }, [connectedParticipants, isScreenSharing, myPeerId, remoteStreamsByPeer, screenStream, stageTiles]);

  const hasPresentationSurface = Boolean(isSlideDeckEffective || activeScreenShareTarget);
  const canPresentDeck = Boolean(
    permissions.canShareScreen ||
      (myPeerId && promotedDelegateIds.includes(myPeerId)) ||
      (roomConfig.eventMode === 'applied_workshop' && me?.role === 'delegate')
  );

  // Open & Close KEW Briefing Slide Deck (completely independent of mic, camera & screen sharing)
  const openBriefingDeck = useCallback(() => {
    setIsSlideDeckActive(true);
    setRoomConfig((prev) => ({ ...prev, isSlideDeckOpen: true }));
    if (stageLayout === 'active_speaker' || stageLayout === 'gallery') {
      setStageLayout('presentation');
    }
    sendHostCommand('set_slide_deck_open', { open: true });
  }, [sendHostCommand, stageLayout]);

  const closeBriefingDeck = useCallback(() => {
    setIsSlideDeckActive(false);
    setRoomConfig((prev) => ({ ...prev, isSlideDeckOpen: false }));
    if (
      !activeScreenShareTarget &&
      (stageLayout === 'presentation' || stageLayout === 'fullscreen_presentation')
    ) {
      setStageLayout('active_speaker');
    }
    sendHostCommand('set_slide_deck_open', { open: false });
  }, [activeScreenShareTarget, sendHostCommand, stageLayout]);

  // Active Speaker non-duplicating filmstrip: excludes primaryTile when primaryTile is on the main stage
  const activeSpeakerFilmstripTiles = useMemo(() => {
    if (hasPresentationSurface) return stageTiles;
    if (!primaryTile) return [];
    return stageTiles.filter((t) => t.peerId !== primaryTile.peerId);
  }, [hasPresentationSurface, primaryTile, stageTiles]);

  // Container-aware bounded aspect-ratio frame for Active Speaker main camera stage
  const activeSpeakerPrimaryStyle = useMemo<React.CSSProperties>(() => {
    const availW = Math.max(240, stageSize.width);
    const filmstripReserve =
      activeSpeakerFilmstripTiles.length > 0 ? (availW < 640 ? 100 : 116) : 0;
    const availH = Math.max(160, stageSize.height - filmstripReserve);
    const ratio = (primaryTile && videoAspectsByPeer[primaryTile.peerId]) || 16 / 9;

    // Prevent excessive webcam enlargement on 4K / Ultrawide while fitting smaller containers cleanly
    const maxStageW = availW >= 2200 ? 1408 : 1216;
    const maxStageH = availH >= 1100 ? 792 : 684;
    const boundW = Math.min(availW, maxStageW);
    const boundH = Math.min(availH, maxStageH);

    const fitW = Math.max(220, Math.floor(Math.min(boundW, boundH * ratio)));
    const fitH = Math.max(140, Math.floor(fitW / ratio));

    return {
      width: `${fitW}px`,
      height: `${fitH}px`,
      maxWidth: '100%',
      maxHeight: '100%',
    };
  }, [activeSpeakerFilmstripTiles.length, primaryTile, stageSize.height, stageSize.width, videoAspectsByPeer]);

  // Container-aware Gallery grid calculator (1 tile per participant, fitted to container width & height)
  const galleryLayoutMetrics = useMemo(() => {
    const count = Math.max(1, stageTiles.length);
    const availW = Math.max(240, stageSize.width);
    const availH = Math.max(180, stageSize.height);
    const gap = 8;
    const targetAspect = 16 / 9;
    const maxCellWCap = availW >= 2200 ? 1120 : 960;
    const maxCellHCap = availH >= 1100 ? 630 : 540;

    let bestCols = 1;
    let bestRows = count;
    let bestCellW = 240;
    let bestCellH = 135;
    let bestArea = 0;

    const maxCols = Math.min(count, 4);
    for (let cols = 1; cols <= maxCols; cols++) {
      const rows = Math.ceil(count / cols);
      const rawW = Math.min((availW - gap * (cols - 1)) / cols, maxCellWCap);
      const rawH = Math.min((availH - gap * (rows - 1)) / rows, maxCellHCap);
      if (rawW <= 0 || rawH <= 0) continue;
      const cellW = Math.min(rawW, rawH * targetAspect);
      const cellH = cellW / targetAspect;
      const area = cellW * cellH;
      if (area > bestArea) {
        bestArea = area;
        bestCols = cols;
        bestRows = rows;
        bestCellW = Math.floor(cellW);
        bestCellH = Math.floor(cellH);
      }
    }

    const totalGridW = Math.min(availW, bestCols * bestCellW + gap * (bestCols - 1));
    const totalGridH = Math.min(availH, bestRows * bestCellH + gap * (bestRows - 1));

    return {
      cols: bestCols,
      rows: bestRows,
      gridStyle: {
        width: `${Math.max(220, totalGridW)}px`,
        height: `${Math.max(150, totalGridH)}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        gridTemplateColumns: `repeat(${bestCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${bestRows}, minmax(0, 1fr))`,
      } as React.CSSProperties,
    };
  }, [stageSize.height, stageSize.width, stageTiles.length]);

  const useHorizontalPresentationSplit =
    stageSize.width >= 820 && stageSize.width >= stageSize.height * 0.92;
  const effectiveSidebarWidth = Math.min(
    sidebarWidth,
    Math.max(280, Math.floor(windowWidth * 0.38))
  );

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderPresentationCanvas = () => {
    if (!isSlideDeckEffective && activeScreenShareTarget && activeScreenShareTarget.videoStream) {
      return (
        <VirtualHallParticipantTile
          {...activeScreenShareTarget}
          mirrored={false}
          className="w-full h-full bg-[#050b14]"
        />
      );
    }

    if (!isSlideDeckEffective) {
      return (
        <div
          data-testid="presentation-stage-standby"
          className="w-full h-full rounded-xl bg-[#0a1424] border border-slate-800 p-6 flex flex-col items-center justify-center text-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center justify-center">
            <Presentation className="w-5 h-5" />
          </div>
          <div className="max-w-md space-y-1">
            <h2 className="text-sm sm:text-base font-bold text-white">
              Presentation Stage Standby
            </h2>
            <p className="text-xs text-slate-400">
              No slide deck or external screen share is currently active on the main stage.
            </p>
          </div>
          {canPresentDeck && (
            <Button
              size="sm"
              data-testid="standby-present-deck-btn"
              onClick={openBriefingDeck}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
            >
              <Presentation className="w-3.5 h-3.5 mr-1.5" />
              Present KEW Slide Deck
            </Button>
          )}
        </div>
      );
    }

    return (
      <div
        data-testid="kew-slide-deck-stage"
        className="w-full h-full max-w-[1600px] mx-auto rounded-xl bg-gradient-to-br from-[#0b192e] via-[#091324] to-[#060d18] border border-teal-500/30 p-3.5 sm:p-6 flex flex-col justify-between overflow-y-auto"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-mono uppercase shrink-0">
              KEW Scientific Deck
            </span>
            <span className="text-xs text-slate-400 font-mono truncate">{session.roomCode}</span>
          </div>
          {canPresentDeck && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                data-testid="deck-prev-slide-btn"
                onClick={() => {
                  const nextIdx =
                    (roomConfig.activeSlideDeckIndex - 1 + SCIENTIFIC_SLIDES.length) %
                    SCIENTIFIC_SLIDES.length;
                  setRoomConfig((prev) => ({ ...prev, activeSlideDeckIndex: nextIdx }));
                  sendHostCommand('set_slide_index', { slideIndex: nextIdx });
                }}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                title="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span
                data-testid="deck-slide-counter"
                className="text-[11px] font-mono text-slate-300 px-1.5"
              >
                {(roomConfig.activeSlideDeckIndex % SCIENTIFIC_SLIDES.length) + 1}/
                {SCIENTIFIC_SLIDES.length}
              </span>
              <button
                type="button"
                data-testid="deck-next-slide-btn"
                onClick={() => {
                  const nextIdx =
                    (roomConfig.activeSlideDeckIndex + 1) % SCIENTIFIC_SLIDES.length;
                  setRoomConfig((prev) => ({ ...prev, activeSlideDeckIndex: nextIdx }));
                  sendHostCommand('set_slide_index', { slideIndex: nextIdx });
                }}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                title="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                data-testid="close-briefing-deck-btn"
                onClick={closeBriefingDeck}
                className="ml-1 px-2.5 py-0.5 rounded bg-rose-950/85 hover:bg-rose-900 text-rose-200 border border-rose-500/40 text-[10px] font-semibold cursor-pointer"
              >
                Close Briefing Deck
              </button>
            </div>
          )}
        </div>

        <div className="my-auto py-3 sm:py-4 space-y-3.5 sm:space-y-4">
          <div>
            <h2
              data-testid="deck-slide-title"
              className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-snug"
            >
              {currentSlide.title}
            </h2>
            <p className="text-xs sm:text-sm text-teal-300 mt-1">{currentSlide.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-lg sm:text-2xl font-black text-teal-300 font-mono">
                {currentSlide.metricA}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{currentSlide.metricALabel}</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-lg sm:text-2xl font-black text-cyan-300 font-mono">
                {currentSlide.metricB}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{currentSlide.metricBLabel}</div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {currentSlide.description}
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-2">
          <span>Kashmir EcoWatch · Western Himalayan Scientific Conference Network</span>
          <span>Ref: KEW-SR-2026-101 / ABS-2027-001</span>
        </div>
      </div>
    );
  };

  const handleMintSignedToken = async () => {
    setMintLoading(true);
    setMintFeedback(null);
    try {
      const res = await fetch(`/api/webinars/room/${encodeURIComponent(session.id)}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mint_token_with_passcode',
          passcode: mintPasscode,
          requestedRole: desiredRole,
          environmentMode: desiredEnv,
          displayName: desiredName,
          affiliation: desiredAffiliation,
          ttlSeconds: 24 * 3600,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok || !data.token) {
        setMintFeedback({
          ok: false,
          text: data.error || 'Unable to mint token. Check KEW Administrator Passcode.',
        });
      } else {
        setProvidedSignedToken(data.token);
        setMintFeedback({
          ok: true,
          text: `Signed 24h ${data.role} token (${data.environmentMode.toUpperCase()}) generated and ready.`,
        });
      }
    } catch {
      setMintFeedback({ ok: false, text: 'Network error while minting token.' });
    } finally {
      setMintLoading(false);
    }
  };

  const diagnosticsModalNode = (
    <VirtualHallDiagnosticsModal
      open={showDiagnostics}
      onClose={() => {
        stopPrivateCameraTest(false);
        setShowDiagnostics(false);
      }}
      telemetry={telemetry}
      micPermissionStatus={micPermissionStatus}
      cameraPermissionStatus={cameraPermissionStatus}
      isTestingMic={isTestingMic}
      micDiagStatus={micDiagStatus}
      micDiagMessage={micDiagMessage}
      diagMicLevel={diagMicLevel}
      diagMicPeakLevel={diagMicPeakLevel}
      diagMicDb={diagMicDb}
      isTestingCamera={isTestingCamera}
      cameraDiagStatus={cameraDiagStatus}
      cameraDiagMessage={cameraDiagMessage}
      diagCameraStream={diagCameraStream}
      diagCameraResolution={diagCameraResolution}
      diagCameraFps={diagCameraFps}
      speakerDiagStatus={speakerDiagStatus}
      speakerDiagMessage={speakerDiagMessage}
      speakerSinkSupported={speakerSinkSupported}
      canBroadcastLive={
        joinStatus === 'joined' &&
        Boolean(
          permissions.canPublishAudioVideo ||
            (myPeerId && promotedDelegateIds.includes(myPeerId)) ||
            (roomConfig.eventMode === 'applied_workshop' && me?.role === 'delegate')
        )
      }
      liveBroadcastRoleLabel={
        joinStatus !== 'joined'
          ? 'Pre-Join Gate'
          : myPeerId && promotedDelegateIds.includes(myPeerId) && me?.role === 'delegate'
          ? 'Promoted Speaker (Floor Granted)'
          : permissions.label
      }
      liveBroadcastModeLabel={
        joinStatus !== 'joined'
          ? 'Pre-Conference Verification'
          : eventModes[roomConfig.eventMode]?.label || 'Scientific Conference'
      }
      isLiveMicPublished={Boolean(isMicOn && me?.presence === 'connected')}
      isLiveVideoPublished={Boolean((isVideoOn || isScreenSharing) && me?.presence === 'connected')}
      remoteAudioLevel={remoteAudioLevel}
      audioInputDevices={audioInputDevices}
      audioOutputDevices={audioOutputDevices}
      videoDevices={videoDevices}
      selectedMicId={selectedMicId}
      selectedSpeakerId={selectedSpeakerId}
      selectedCameraId={selectedCameraId}
      onSelectMic={handleSelectMic}
      onSelectSpeaker={handleSelectSpeaker}
      onSelectCamera={handleSelectCamera}
      onToggleTestMic={togglePrivateMicTest}
      onToggleTestCamera={togglePrivateCameraTest}
      onTestSpeaker={runPrivateSpeakerTest}
    />
  );

  // Blocked / Capacity Full / Room Locked Screen
  if (joinStatus === 'blocked' && joinBlockReason) {
    return (
      <div className="fixed inset-0 z-[60] h-[100dvh] w-full max-w-full bg-[#060d18] text-slate-100 flex items-center justify-center p-4 overflow-hidden">
        <div className="max-w-lg w-full bg-[#0b1526] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/90">
            <Link href="/webinars" className="flex items-center gap-2.5 group">
              <img
                src={KEW_OFFICIAL_LOGO_PATH}
                alt="Kashmir EcoWatch (KEW Western Himalayan)"
                className="w-10 h-10 object-contain drop-shadow-md transform group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold text-white tracking-tight leading-tight">
                  Kashmir EcoWatch
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                  KEW Western Himalayan
                </span>
              </div>
            </Link>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              {joinBlockReason.code}
            </div>
            <h1 className="text-lg font-bold text-white mt-0.5">Virtual Scientific Hall Gate</h1>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {joinBlockReason.message}
            </p>
          </div>

          {/* Authoritative Entry Presets (Unauthenticated access strictly limited to Delegate / Observer) */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
              Standard Participant Entry (Host &amp; Speaker Roles Require Authorization)
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { role: 'delegate', label: 'Registered Delegate' },
                  { role: 'observer', label: 'Observer (View Only)' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => {
                    hasCustomNameRef.current = false;
                    setDesiredRole(preset.role);
                    setProvidedSignedToken('');
                    joinHall({
                      requestedRole: preset.role,
                      explicitRoleRequested: true,
                      explicitNameProvided: false,
                      providedToken: '',
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-teal-950/70 border border-slate-700 hover:border-teal-500/50 text-xs font-semibold text-slate-200 cursor-pointer transition-colors"
                >
                  Join as {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={() => setShowRolePassModal(true)}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
            >
              <KeyRound className="w-3.5 h-3.5 mr-1.5" />
              Enter Signed Host / Speaker Token
            </Button>
            <Button
              size="sm"
              variant="outline"
              data-testid="gate-open-diagnostics-btn"
              onClick={() => setShowDiagnostics(true)}
              className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 text-xs font-semibold"
            >
              <Activity className="w-3.5 h-3.5 mr-1.5" />
              Verify Hardware &amp; Audio
            </Button>
            <Link href="/webinars">
              <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 text-xs">
                Return to Webinars
              </Button>
            </Link>
          </div>
        </div>
        {diagnosticsModalNode}

        {showRolePassModal && (
          <div className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowRolePassModal(false);
                joinHall();
              }}
              className="bg-[#0b1526] border border-slate-700 rounded-2xl p-5 max-w-md w-full space-y-3.5 text-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Session Identity &amp; Authorized Access Token
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Host, Moderator &amp; Speaker roles require an Admin session or signed <code>kew_vh1...</code> token
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRolePassModal(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    value={desiredName}
                    onChange={(e) => {
                      hasCustomNameRef.current = true;
                      setDesiredName(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Institution / Affiliation</label>
                  <input
                    type="text"
                    required
                    value={desiredAffiliation}
                    onChange={(e) => {
                      hasCustomAffRef.current = true;
                      setDesiredAffiliation(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Environment Namespace</label>
                  <select
                    value={desiredEnv}
                    onChange={(e) => setDesiredEnv(e.target.value as EnvironmentMode)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="demo">Demo Sandbox (Isolated)</option>
                    <option value="live">Live Authorized Session</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Conference Role</label>
                  <select
                    value={desiredRole}
                    onChange={(e) => setDesiredRole(e.target.value as HallRole)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="delegate">Registered Delegate</option>
                    <option value="observer">Observer (View Only)</option>
                    <option value="speaker">
                      Confirmed Speaker {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                    </option>
                    <option value="moderator">
                      Scientific Moderator {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                    </option>
                    <option value="technical_producer">
                      Technical Producer {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                    </option>
                    <option value="host">
                      Conference Host {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-300">
                    Signed Room Token (Required for Host/Speaker unless Admin)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMintHelper((v) => !v)}
                    className="text-[10px] text-teal-400 hover:underline cursor-pointer"
                  >
                    {showMintHelper ? 'Hide Token Generator' : 'Mint Token (Admin)'}
                  </button>
                </div>
                <input
                  type="text"
                  value={providedSignedToken}
                  onChange={(e) => setProvidedSignedToken(e.target.value)}
                  placeholder="Paste signed kew_vh1... token"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 font-mono text-[11px]"
                />
              </div>

              {showMintHelper && (
                <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-teal-300">
                    Generate Signed <code>kew_vh1...</code> Token for {session.id}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={mintPasscode}
                      onChange={(e) => setMintPasscode(e.target.value)}
                      placeholder="KEW Admin Passcode (optional if logged in)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleMintSignedToken}
                      disabled={mintLoading}
                      className="bg-teal-700 hover:bg-teal-600 text-white text-[11px] shrink-0"
                    >
                      {mintLoading ? 'Minting…' : 'Mint Token'}
                    </Button>
                  </div>
                  {mintFeedback && (
                    <p
                      className={`text-[11px] ${
                        mintFeedback.ok ? 'text-emerald-300' : 'text-amber-300'
                      }`}
                    >
                      {mintFeedback.text}
                    </p>
                  )}
                </div>
              )}

              {desiredRole !== 'delegate' && desiredRole !== 'observer' && (
                <label className="flex items-center gap-2 text-[11px] text-indigo-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={joinGreenRoomChecked}
                    onChange={(e) => setJoinGreenRoomChecked(e.target.checked)}
                  />
                  <span>Enter via private Speaker Green Room (off-air hardware check)</span>
                </label>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setShowRolePassModal(false)}
                  className="border-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold">
                  Enter Virtual Hall
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={rootContainerRef}
      data-testid="kew-virtual-scientific-hall"
      data-kew-dark-surface="true"
      data-stage-layout={stageLayout}
      data-participant-role={me?.role || 'connecting'}
      data-webrtc-peers={telemetry.activePeerConnections}
      data-webrtc-state={telemetry.connectionState}
      data-rtp-active={String(telemetry.activeRtpTransmission)}
      data-packets-sent={telemetry.packetsSent}
      data-packets-received={telemetry.packetsReceived}
      data-inbound-kbps={telemetry.inboundKbps}
      data-outbound-kbps={telemetry.outboundKbps}
      className="fixed inset-0 z-[120] h-[100dvh] w-full max-w-full bg-[#060d18] text-slate-100 flex flex-col overflow-hidden select-none"
    >
      {/* 1. COMPACT SINGLE-ROW CONFERENCE HEADER (56px) */}
      <header className="h-14 px-2.5 sm:px-4 bg-[#081120] border-b border-slate-800/90 flex items-center justify-between gap-2.5 shrink-0 z-30">
        {/* Left: Official KEW Logo Lockup + Truncated Title + Info Disclosure + Mode + Room Code */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Link
            href="/webinars"
            className="flex items-center gap-2 shrink-0 group"
            title="Kashmir EcoWatch · Webinars & Scientific Conference Network"
          >
            <img
              src={KEW_OFFICIAL_LOGO_PATH}
              alt="Kashmir EcoWatch (KEW Western Himalayan)"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md transform group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden xl:flex flex-col justify-center select-none">
              <span className="text-xs font-bold text-white tracking-tight leading-tight whitespace-nowrap">
                Kashmir EcoWatch
              </span>
              <span className="text-[9px] text-emerald-400 font-semibold tracking-wider uppercase whitespace-nowrap">
                KEW Western Himalayan
              </span>
            </div>
          </Link>

          <span className="h-6 w-px bg-slate-800 shrink-0" aria-hidden="true" />

          <div className="min-w-0 flex items-center gap-1.5 relative">
            <h1
              className="text-xs sm:text-sm font-bold text-white truncate max-w-[140px] sm:max-w-[260px] md:max-w-[380px] xl:max-w-[520px]"
              title={session.title}
            >
              {session.title}
            </h1>
            <button
              onClick={() => setShowTitleInfoPopover(!showTitleInfoPopover)}
              className="p-1 rounded-md text-slate-400 hover:text-teal-300 hover:bg-slate-800/70 shrink-0"
              aria-label="Show full conference and session details"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {showTitleInfoPopover && (
              <div className="absolute left-0 top-9 z-50 w-80 sm:w-96 p-3.5 rounded-xl bg-[#0c182c] border border-slate-700 shadow-2xl text-xs space-y-2">
                <div className="font-bold text-white leading-snug">{session.title}</div>
                <div className="text-[11px] text-teal-300 font-mono">
                  {session.roomCode} &bull; {session.discipline}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{session.abstract}</p>
                <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>
                    Phase I Cap: {roomConfig.maxConcurrentDelegates} Delegates /{' '}
                    {roomConfig.effectiveMaxInteractiveSpeakers ?? roomConfig.maxInteractiveSpeakers}{' '}
                    Speakers
                  </span>
                  <button
                    onClick={() => setShowTitleInfoPopover(false)}
                    className="text-teal-400 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-teal-300 shrink-0">
            {eventModes[roomConfig.eventMode]?.shortLabel || 'Conference'}
          </span>

          <span className="hidden xl:inline-flex text-[10px] font-mono text-slate-400 shrink-0">
            {session.roomCode}
          </span>
        </div>

        {/* Right: Single Environment Badge + Actual Connection + Actual Count + Actual Recording + Exit */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* SINGLE Honest Environment Badge (Click to switch role/token) */}
          <button
            onClick={() => setShowRolePassModal(true)}
            data-testid="environment-mode-badge"
            className={cn(
              'px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border flex items-center gap-1 transition-colors',
              environmentMode === 'live'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
            )}
            title="Configure session identity, role, or authorized room token"
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                environmentMode === 'live' ? 'bg-emerald-400' : 'bg-amber-400'
              )}
            />
            <span>{environmentMode === 'live' ? 'Live Session' : 'Demo Sandbox'}</span>
          </button>

          {/* Actual WebRTC / Room Connection Pill (Distinguishes Local Preview vs Remote WebRTC RTP) */}
          <div
            data-testid="connection-status-pill"
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono"
            title={
              telemetry.activeRtpTransmission
                ? `Remote WebRTC RTP active (↑${telemetry.outboundKbps} / ↓${telemetry.inboundKbps} kbps)`
                : telemetry.connectionState === 'connected'
                ? 'Peer WebRTC connected (no active RTP stream)'
                : isVideoOn || isMicOn
                ? 'Local media active (0 remote WebRTC peers connected)'
                : 'Signaling standby'
            }
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                telemetry.activeRtpTransmission
                  ? 'bg-emerald-400 animate-pulse'
                  : telemetry.connectionState === 'connected'
                  ? 'bg-emerald-400'
                  : joinStatus === 'joined'
                  ? 'bg-teal-400'
                  : 'bg-amber-400'
              )}
            />
            <span className="text-slate-200">
              {telemetry.activeRtpTransmission
                ? `WebRTC RTP Live${telemetry.rttMs !== null ? ` · ${telemetry.rttMs}ms` : ''}`
                : telemetry.connectionState === 'connected'
                ? `P2P Ready${telemetry.rttMs !== null ? ` · ${telemetry.rttMs}ms` : ''}`
                : joinStatus === 'joined' && (isVideoOn || isMicOn)
                ? 'Local Preview · 0 Peers'
                : joinStatus === 'joined'
                ? 'Signaling Ready'
                : 'Connecting'}
            </span>
          </div>

          {/* Actual Connected Participant & Delegate Quota Pill */}
          <button
            onClick={() => {
              setActiveTab('participants');
              setIsSidebarOpen(true);
            }}
            data-testid="participant-count-pill"
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-200"
            title="Connected participants & Phase I delegate quota"
          >
            <Users className="w-3 h-3 text-teal-400" />
            <span>{counts.connectedTotal}</span>
            <span className="hidden md:inline text-slate-400">
              ({counts.connectedDelegates}/{roomConfig.maxConcurrentDelegates} Del)
            </span>
          </button>

          {/* Actual Recording Indicator (ONLY shown when real recording is active!) */}
          {isAnyRecordingActive && (
            <div
              data-testid="live-recording-badge"
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-950/90 border border-rose-500/50 text-[10px] font-mono font-bold text-rose-200"
            >
              <CircleDot className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>REC {formatTimer(recordingSeconds)}</span>
            </div>
          )}

          {roomConfig.isRoomLocked && (
            <span
              className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] flex items-center"
              title="Room is locked"
            >
              <Lock className="w-3 h-3" />
            </span>
          )}

          <button
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <Link
            href="/webinars"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-slate-200"
          >
            <LogOut className="w-3 h-3 text-rose-400" />
            <span className="hidden sm:inline">Exit Hall</span>
          </Link>
        </div>
      </header>

      {/* 2. DYNAMIC WORKSPACE (STAGE + COLLAPSIBLE/RESIZABLE RIGHT PANEL) */}
      <div className="flex-1 min-h-0 flex relative overflow-hidden">
        {/* Main Conferencing Stage Column */}
        <main className="flex-1 min-w-0 min-h-0 flex flex-col p-2 sm:p-3 gap-2 relative overflow-hidden">
          {/* Transient Status Notice Toast */}
          {actionBanner && (
            <div
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs flex items-center justify-between gap-2 shrink-0',
                actionBanner.tone === 'warn'
                  ? 'bg-amber-950/70 border-amber-500/40 text-amber-200'
                  : actionBanner.tone === 'ok'
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-900/90 border-slate-700 text-slate-200'
              )}
            >
              <span className="truncate">{actionBanner.text}</span>
              <button onClick={() => setActionBanner(null)} className="text-[10px] opacity-75">
                ✕
              </button>
            </div>
          )}

          {/* Pinned Stage Question Overlay */}
          {highlightedQuestion && (
            <div className="px-3.5 py-2 rounded-xl bg-teal-950/75 border border-teal-400/40 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-teal-300 block">
                  Stage Floor Question · {highlightedQuestion.authorName} ({highlightedQuestion.authorAffiliation})
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {highlightedQuestion.question}
                </p>
              </div>
              {permissions.canModerateQnA && (
                <button
                  onClick={() =>
                    postSignalAction({
                      action: 'qna_moderate',
                      itemId: highlightedQuestion.id,
                      operation: 'highlight',
                    })
                  }
                  className="text-[10px] font-mono text-teal-300 hover:underline shrink-0"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}

          {/* CASE A: WAITING ROOM */}
          {me?.presence === 'waiting_room' ? (
            <div className="flex-1 rounded-2xl bg-[#0a1424] border border-slate-800 flex items-center justify-center p-6 text-center">
              <div className="max-w-md space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-white">Waiting for Session Host Admission</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You are connected in the pre-admission lobby for <strong>{session.title}</strong>. The Session Chair or Moderator will admit you shortly.
                </p>
                <div className="pt-1 flex justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    data-testid="waiting-room-open-diagnostics-btn"
                    onClick={() => setShowDiagnostics(true)}
                    className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 text-xs font-semibold"
                  >
                    <Activity className="w-3.5 h-3.5 mr-1.5" />
                    Verify Hardware &amp; Audio While Waiting
                  </Button>
                </div>
              </div>
            </div>
          ) : me?.presence === 'green_room' ? (
            /* CASE B: PRIVATE SPEAKER GREEN ROOM (BACKSTAGE) */
            <div className="flex-1 min-h-0 rounded-2xl bg-[#0b1426] border border-indigo-500/40 p-3 sm:p-5 flex flex-col gap-3 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono uppercase font-bold">
                    Private Speaker Green Room · Off-Air Backstage
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-white mt-1">
                    Hardware Readiness &amp; Faculty Briefing Check
                  </h2>
                </div>
                <Button
                  size="sm"
                  onClick={toggleGreenRoomPresence}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  <DoorOpen className="w-3.5 h-3.5 mr-1.5" />
                  Enter Main Live Stage
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[220px]">
                <VirtualHallParticipantTile
                  name={me.displayName}
                  affiliation={`${me.affiliation} · Backstage Preview`}
                  role={me.role}
                  isLocal
                  isAudioEnabled={isMicOn}
                  isVideoEnabled={isVideoOn}
                  audioLevel={micAudioLevel}
                  videoStream={videoStream}
                  mirrored
                  className="min-h-[220px]"
                />
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 text-xs">
                  <div className="space-y-2">
                    <div className="font-bold text-white">Backstage Safeguards Active</div>
                    <p className="text-slate-400 leading-relaxed">
                      Your camera, microphone, and screen share previews are strictly isolated inside this backstage studio. Zero media tracks are transmitted to delegates until you click <strong>Enter Main Live Stage</strong>.
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                      <div>Mic Input Level: <span className="text-emerald-400">{micAudioLevel}%</span></div>
                      <div>Camera State: <span className="text-teal-300">{isVideoOn ? 'Active Preview' : 'Off'}</span></div>
                      <div>Main Hall Delegates Waiting: <span className="text-white">{counts.connectedDelegates}/{roomConfig.maxConcurrentDelegates}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowDiagnostics(true)}
                      className="border-slate-700 text-slate-200 text-xs"
                    >
                      Open Device &amp; Audio Check
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setActiveTab('chat');
                        setIsSidebarOpen(true);
                      }}
                      className="border-indigo-500/40 text-indigo-200 text-xs"
                    >
                      Backstage Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* CASE C: MAIN STAGE — CONTAINER-AWARE, ASPECT-RATIO-PRESERVING LAYOUTS */
            <div
              ref={stageViewportRef}
              data-testid="conference-stage-viewport"
              data-stage-width={stageSize.width}
              data-stage-height={stageSize.height}
              className="flex-1 min-h-0 min-w-0 flex flex-col gap-2 overflow-hidden relative"
            >
              {/* Layout 1: Active Speaker (Primary Speaker + Non-Duplicating Filmstrip) */}
              {stageLayout === 'active_speaker' && (
                <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-2">
                  <div className="flex-1 min-h-0 min-w-0 flex items-center justify-center relative overflow-hidden">
                    {hasPresentationSurface ? (
                      renderPresentationCanvas()
                    ) : primaryTile ? (
                      <VirtualHallParticipantTile
                        {...primaryTile}
                        style={activeSpeakerPrimaryStyle}
                        className="mx-auto my-auto shadow-xl"
                      />
                    ) : (
                      <div className="w-full h-full max-w-3xl max-h-[680px] rounded-xl bg-[#0a1424] border border-slate-800 flex items-center justify-center p-4 text-center">
                        <div className="max-w-md space-y-2">
                          <div className="text-sm font-bold text-white">
                            Stage Ready · Awaiting Speaker Stream
                          </div>
                          <p className="text-xs text-slate-400">
                            Phase I capacity: up to {roomConfig.maxConcurrentDelegates} concurrent delegates &amp;{' '}
                            {roomConfig.effectiveMaxInteractiveSpeakers ?? roomConfig.maxInteractiveSpeakers}{' '}
                            interactive speakers.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {activeSpeakerFilmstripTiles.length > 0 && (
                    <div
                      data-testid="active-speaker-filmstrip"
                      className="h-24 sm:h-28 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar shrink-0 px-0.5"
                    >
                      {activeSpeakerFilmstripTiles.map((t) => (
                        <VirtualHallParticipantTile
                          key={t.peerId}
                          {...t}
                          compact
                          className="w-40 h-[90px] sm:w-48 sm:h-[108px] shrink-0"
                          onClick={() => {
                            if (permissions.canSpotlight && !t.isDemoPlaceholder) {
                              sendHostCommand('spotlight_peer', { targetPeerId: t.peerId });
                            }
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Layout 2: Gallery View (One Tile Per Connected Participant, Container-Aware Aspect Grid) */}
              {stageLayout === 'gallery' && (
                <div
                  data-testid="gallery-stage-container"
                  className="flex-1 min-h-0 min-w-0 flex items-center justify-center overflow-hidden"
                >
                  <div style={galleryLayoutMetrics.gridStyle} className="grid gap-2 mx-auto my-auto">
                    {stageTiles.map((t) => (
                      <VirtualHallParticipantTile
                        key={t.peerId}
                        {...t}
                        className="w-full h-full min-h-0 min-w-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Layout 3: Presentation View (Presentation Stage + Independent Participant Video Tiles) */}
              {stageLayout === 'presentation' && (
                <div
                  data-testid="presentation-stage-container"
                  className={cn(
                    'flex-1 min-h-0 min-w-0 flex gap-2 overflow-hidden',
                    useHorizontalPresentationSplit ? 'flex-row' : 'flex-col'
                  )}
                >
                  <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
                    {renderPresentationCanvas()}
                  </div>
                  <div
                    data-testid="presentation-participant-rail"
                    className={cn(
                      'flex gap-2 shrink-0',
                      useHorizontalPresentationSplit
                        ? 'w-56 xl:w-64 h-full flex-col overflow-y-auto pr-0.5'
                        : 'h-24 sm:h-28 w-full flex-row items-center overflow-x-auto pb-0.5'
                    )}
                  >
                    {stageTiles.map((t) => (
                      <VirtualHallParticipantTile
                        key={t.peerId}
                        {...t}
                        compact
                        className={cn(
                          'shrink-0',
                          useHorizontalPresentationSplit
                            ? 'w-full aspect-video'
                            : 'w-40 h-[90px] sm:w-48 sm:h-[108px]'
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Layout 4: Side-by-Side View (50% Presentation / 50% Active Speaker + Secondary Strip) */}
              {stageLayout === 'side_by_side' && (
                <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-2 overflow-hidden">
                  <div
                    className={cn(
                      'flex-1 min-h-0 min-w-0 grid gap-2',
                      useHorizontalPresentationSplit ? 'grid-cols-2' : 'grid-cols-1 grid-rows-2'
                    )}
                  >
                    <div className="min-h-0 min-w-0 overflow-hidden">{renderPresentationCanvas()}</div>
                    <div className="min-h-0 min-w-0 flex items-center justify-center overflow-hidden">
                      {primaryTile ? (
                        <VirtualHallParticipantTile
                          {...primaryTile}
                          className="w-full max-w-full aspect-video max-h-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-[#0b1526] border border-slate-800 flex items-center justify-center text-xs text-slate-400">
                          Active Speaker Slot
                        </div>
                      )}
                    </div>
                  </div>
                  {stageTiles.filter((t) => t.peerId !== primaryTile?.peerId).length > 0 && (
                    <div className="h-20 sm:h-24 flex items-center justify-center gap-2 overflow-x-auto shrink-0">
                      {stageTiles
                        .filter((t) => t.peerId !== primaryTile?.peerId)
                        .map((t) => (
                          <VirtualHallParticipantTile
                            key={t.peerId}
                            {...t}
                            compact
                            className="h-full aspect-video shrink-0"
                          />
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Layout 5: Expert Panel View */}
              {stageLayout === 'expert_panel' && (
                <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-2 overflow-hidden">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] shrink-0">
                    <span className="font-semibold text-teal-300">Expert Panel Discussion Stage</span>
                    <span className="font-mono text-slate-400">{session.discipline}</span>
                  </div>
                  <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                    <div
                      className={cn(
                        'w-full max-w-[1440px] max-h-full grid gap-2.5',
                        stageTiles.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      )}
                    >
                      {stageTiles.slice(0, 6).map((t) => (
                        <VirtualHallParticipantTile
                          key={t.peerId}
                          {...t}
                          className="w-full aspect-video max-h-[420px]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Layout 6: Podcast Interview View (2-Person Studio Frame) */}
              {stageLayout === 'podcast_interview' && (
                <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-2 overflow-hidden">
                  <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 flex items-center justify-between text-[11px] shrink-0">
                    <span className="font-bold text-teal-200 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-teal-400" />
                      KEW Scientific Podcast Studio (2-Speaker Conversational Frame)
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Max 2 Interactive Voices</span>
                  </div>
                  <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-[1360px] max-h-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stageTiles.slice(0, 2).map((t) => (
                        <VirtualHallParticipantTile
                          key={t.peerId}
                          {...t}
                          className="w-full aspect-video max-h-[480px]"
                        />
                      ))}
                      {stageTiles.length < 2 && (
                        <div className="w-full aspect-video max-h-[480px] rounded-xl bg-[#0b1526] border border-dashed border-slate-700 flex flex-col items-center justify-center p-4 text-center text-xs text-slate-400">
                          <span className="font-semibold text-slate-300">Co-Host / Guest Scientist Slot</span>
                          <span className="text-[11px] text-slate-500 mt-1">
                            Awaiting 2nd connected studio speaker
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Layout 7: Workshop Collaboration View (Workbench + up to 3 Interactive Tiles) */}
              {stageLayout === 'workshop_collaboration' && (
                <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-2 overflow-hidden">
                  <div className="flex-[2] min-h-0 min-w-0 overflow-hidden">{renderPresentationCanvas()}</div>
                  <div className="h-28 sm:h-32 flex items-center justify-center gap-2 overflow-x-auto shrink-0">
                    {stageTiles.slice(0, 3).map((t) => (
                      <VirtualHallParticipantTile
                        key={t.peerId}
                        {...t}
                        compact
                        className="h-full aspect-video shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Layout 8: Fullscreen Presentation View + PiP Speaker */}
              {stageLayout === 'fullscreen_presentation' && (
                <div className="flex-1 min-h-0 min-w-0 relative overflow-hidden">
                  {renderPresentationCanvas()}
                  {primaryTile && (
                    <div className="w-36 sm:w-52 aspect-video absolute bottom-3 right-3 z-20 shadow-2xl">
                      <VirtualHallParticipantTile {...primaryTile} compact className="w-full h-full" />
                    </div>
                  )}
                </div>
              )}

              {/* Floating Reaction Overlay */}
              {floatingReaction && (
                <div className="absolute bottom-14 left-6 z-30 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs flex items-center gap-2 shadow-xl animate-bounce">
                  <span className="text-lg">{floatingReaction.emoji}</span>
                  <span className="text-slate-200 font-medium">{floatingReaction.sender}</span>
                </div>
              )}

              {/* Honest Live Captions Bar */}
              {captionsEnabled && (
                <div className="px-4 py-2 rounded-xl bg-black/80 border border-slate-700 text-center text-xs text-slate-100 shrink-0">
                  <span className="text-[10px] font-mono uppercase text-teal-400 mr-2">
                    {captionsSupported ? '[Live Captions]' : '[Captions Notice]'}
                  </span>
                  <span>{captionTranscript}</span>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Collapsible, Resizable Right-Side Interaction Panel */}
        {isSidebarOpen && (
          <>
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />
            <VirtualHallSidePanel
              session={session}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onClose={() => setIsSidebarOpen(false)}
              widthPx={effectiveSidebarWidth}
              onStartResize={handleStartResize}
              me={me}
              permissions={permissions}
              roomConfig={roomConfig}
              counts={counts}
              participants={participants}
              promotedDelegateIds={promotedDelegateIds}
              invitedSpeakers={invitedSpeakers}
              linkedResources={linkedResources}
              chatMessages={chatMessages}
              qnaList={qnaList}
              polls={polls}
              notifications={notifications}
              onSendChat={async (channel, text) => {
                const r = await postSignalAction({ action: 'chat_send', channel, message: text });
                if (!r.ok) pushNotice(r.data?.error || 'Unable to send chat message.', 'warn');
              }}
              onSubmitQuestion={async (question) => {
                const r = await postSignalAction({ action: 'qna_submit', question });
                if (r.ok) {
                  pushNotice('Question submitted to scientific Q&A queue.', 'ok');
                } else {
                  pushNotice(r.data?.error || 'Failed to submit question.', 'warn');
                }
              }}
              onUpvoteQuestion={async (itemId) => {
                await postSignalAction({ action: 'qna_upvote', itemId });
              }}
              onModerateQuestion={async (itemId, operation, answer) => {
                const r = await postSignalAction({ action: 'qna_moderate', itemId, operation, answer });
                if (!r.ok) pushNotice(r.data?.error || 'Moderation denied.', 'warn');
              }}
              onVotePoll={async (pollId, optionId) => {
                const r = await postSignalAction({ action: 'poll_vote', pollId, optionId });
                if (!r.ok) pushNotice(r.data?.error || 'Vote could not be recorded.', 'warn');
              }}
              onCreatePoll={async (question, options) => {
                const r = await postSignalAction({ action: 'poll_create', question, options });
                if (!r.ok) pushNotice(r.data?.error || 'Poll creation denied.', 'warn');
              }}
              onHostCommand={sendHostCommand}
              isSlideDeckOpen={isSlideDeckEffective}
              onLaunchDeckOnStage={openBriefingDeck}
              onCloseDeckOnStage={closeBriefingDeck}
            />
          </>
        )}
      </div>

      {/* 3. COMPACT PROFESSIONAL CONFERENCE TOOLBAR (56px) */}
      <footer className="h-14 px-1.5 sm:px-4 bg-[#081120] border-t border-slate-800/90 flex items-center justify-between gap-1 sm:gap-1.5 shrink-0 z-50 min-w-0 max-w-full">
        {/* Left: Compact Authoritative Role & Identity Readout */}
        <div className="hidden lg:flex items-center gap-2 min-w-0 text-[11px] shrink-0">
          <button
            onClick={() => setShowRolePassModal(true)}
            data-testid="toolbar-identity-btn"
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center gap-1.5 truncate max-w-[185px] xl:max-w-[240px]"
            title="Click to view or update your participant identity & role token"
          >
            <KeyRound className="w-3 h-3 text-teal-400 shrink-0" />
            <span className="font-semibold truncate">{me?.displayName || 'Joining...'}</span>
            <span
              data-testid="toolbar-role-label"
              className="text-[10px] font-mono text-teal-300 uppercase shrink-0"
            >
              ({me ? ROLE_SHORT_LABELS[me.role] : 'Delegate'}
              {me?.role === 'delegate' && myPeerId && promotedDelegateIds.includes(myPeerId)
                ? ' · Floor'
                : ''}
              )
            </span>
          </button>

          {remoteAudioLevel > 0 && (
            <span className="px-2 py-1 rounded-lg bg-slate-900 border border-teal-500/30 text-[10px] font-mono text-teal-300 flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              {remoteAudioLevel}%
            </span>
          )}
        </div>

        {/* Center: Primary Conferencing Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 mx-auto min-w-0">
          {/* Microphone */}
          <button
            onClick={toggleMic}
            disabled={joinStatus !== 'joined'}
            data-testid="toolbar-mic-btn"
            className={cn(
              'h-9 px-2 sm:px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border shrink-0 disabled:opacity-50',
              isMicOn
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 text-rose-400" />}
            <span className="hidden sm:inline">{isMicOn ? 'Mute' : 'Unmute'}</span>
          </button>

          {/* Camera */}
          <button
            onClick={toggleCamera}
            disabled={isCameraLoading || joinStatus !== 'joined'}
            data-testid="toolbar-camera-btn"
            className={cn(
              'h-9 px-2 sm:px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border shrink-0 disabled:opacity-50',
              isVideoOn
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title={isVideoOn ? 'Stop camera' : 'Start camera'}
          >
            {isVideoOn ? (
              <VideoIcon className="w-4 h-4" />
            ) : (
              <VideoOff className="w-4 h-4 text-rose-400" />
            )}
            <span className="hidden sm:inline">{isCameraLoading ? '...' : isVideoOn ? 'Stop Video' : 'Video'}</span>
          </button>

          {/* Share Screen */}
          <button
            onClick={toggleScreenShare}
            data-testid="toolbar-share-btn"
            className={cn(
              'h-9 px-2 sm:px-3 rounded-xl text-xs font-semibold hidden min-[370px]:flex items-center gap-1.5 transition-colors border shrink-0',
              isScreenSharing
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Share screen or scientific window"
          >
            {isScreenSharing ? (
              <MonitorOff className="w-4 h-4" />
            ) : (
              <MonitorUp className="w-4 h-4 text-cyan-400" />
            )}
            <span className="hidden md:inline">{isScreenSharing ? 'Stop Share' : 'Share'}</span>
          </button>

          {/* Present KEW Slide Deck (Direct Toolbar Toggle for Authorized Presenters) */}
          {canPresentDeck && (
            <button
              onClick={() => {
                if (isSlideDeckEffective) closeBriefingDeck();
                else openBriefingDeck();
              }}
              data-testid="toolbar-deck-btn"
              className={cn(
                'h-9 px-2 sm:px-3 rounded-xl text-xs font-semibold hidden md:flex items-center gap-1.5 transition-colors border shrink-0',
                isSlideDeckEffective
                  ? 'bg-teal-600 hover:bg-teal-500 text-white border-teal-400/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              )}
              title={isSlideDeckEffective ? 'Close Briefing Deck' : 'Present KEW Slide Deck'}
            >
              <Presentation className="w-4 h-4 text-teal-300" />
              <span className="hidden xl:inline">
                {isSlideDeckEffective ? 'Close Briefing Deck' : 'Present KEW Slide Deck'}
              </span>
            </button>
          )}

          {/* Raise Hand */}
          <button
            onClick={() =>
              postSignalAction({
                action: 'update_media_state',
                isHandRaised: !me?.isHandRaised,
              })
            }
            data-testid="toolbar-hand-btn"
            className={cn(
              'h-9 px-2 sm:px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border shrink-0',
              me?.isHandRaised
                ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Raise or lower hand"
          >
            <Hand className="w-4 h-4" />
            <span className="hidden xl:inline">{me?.isHandRaised ? 'Hand Up' : 'Hand'}</span>
          </button>

          {/* Chat */}
          <button
            onClick={() => {
              if (isSidebarOpen && activeTab === 'chat') setIsSidebarOpen(false);
              else {
                setActiveTab('chat');
                setIsSidebarOpen(true);
              }
            }}
            data-testid="toolbar-chat-btn"
            className={cn(
              'h-9 px-2 sm:px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border shrink-0',
              isSidebarOpen && activeTab === 'chat'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Open session chat"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden xl:inline">Chat</span>
          </button>

          {/* Q&A */}
          <button
            onClick={() => {
              if (isSidebarOpen && activeTab === 'qna') setIsSidebarOpen(false);
              else {
                setActiveTab('qna');
                setIsSidebarOpen(true);
              }
            }}
            data-testid="toolbar-qna-btn"
            className={cn(
              'h-9 px-2 sm:px-2.5 rounded-xl text-xs font-semibold hidden min-[420px]:flex items-center gap-1 transition-colors border shrink-0',
              isSidebarOpen && activeTab === 'qna'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Moderated Q&A"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden xl:inline">Q&amp;A</span>
          </button>

          {/* Participants */}
          <button
            onClick={() => {
              if (isSidebarOpen && activeTab === 'participants') setIsSidebarOpen(false);
              else {
                setActiveTab('participants');
                setIsSidebarOpen(true);
              }
            }}
            data-testid="toolbar-participants-btn"
            className={cn(
              'h-9 px-2.5 rounded-xl text-xs font-semibold hidden sm:flex items-center gap-1 transition-colors border shrink-0',
              isSidebarOpen && activeTab === 'participants'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Participants & roster"
          >
            <Users className="w-4 h-4" />
            <span className="hidden xl:inline">Participants</span>
          </button>

          {/* Live Captions */}
          <button
            onClick={toggleLiveCaptions}
            className={cn(
              'h-9 px-2.5 rounded-xl text-xs font-semibold hidden lg:flex items-center gap-1 transition-colors border shrink-0',
              captionsEnabled
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Toggle browser live captions"
          >
            <Captions className="w-4 h-4" />
            <span className="hidden 2xl:inline">Captions</span>
          </button>

          {/* Stage Layout Switcher (8 Layouts) */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setShowLayoutMenu(!showLayoutMenu);
                setShowMoreMenu(false);
                setShowHostMenu(false);
              }}
              data-testid="toolbar-layout-btn"
              className="h-9 px-2 sm:px-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1"
              title="Switch stage layout"
            >
              <LayoutGrid className="w-4 h-4 text-teal-400" />
              <span className="hidden xl:inline">Layout</span>
            </button>

            {showLayoutMenu && (
              <div className="fixed bottom-16 right-2 sm:absolute sm:bottom-12 sm:right-0 z-50 w-64 max-w-[calc(100vw-16px)] max-h-[72dvh] overflow-y-auto p-2 rounded-2xl bg-[#0c182c] border border-slate-700 shadow-2xl space-y-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400">
                  Stage View (8 Layouts)
                </div>
                {STAGE_LAYOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    data-testid={`layout-option-${opt.id}`}
                    onClick={() => {
                      setStageLayout(opt.id);
                      setShowLayoutMenu(false);
                    }}
                    className={cn(
                      'w-full text-left px-2.5 py-1.5 rounded-lg flex flex-col transition-colors',
                      stageLayout === opt.id
                        ? 'bg-teal-500/20 text-teal-200 border border-teal-500/30'
                        : 'hover:bg-slate-800 text-slate-200'
                    )}
                  >
                    <span className="font-semibold text-[11px]">{opt.label}</span>
                    <span className="text-[10px] text-slate-400">{opt.hint}</span>
                  </button>
                ))}
                {environmentMode === 'demo' && (
                  <div className="pt-1 mt-1 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setShowDemoLayoutPreview(!showDemoLayoutPreview);
                        setShowLayoutMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-[11px] text-amber-300"
                    >
                      {showDemoLayoutPreview
                        ? '✓ Hide Fictional Sandbox Tiles'
                        : '+ Preview Multi-Tile Sandbox Layout'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Secondary Overflow Menu ("More") */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setShowMoreMenu(!showMoreMenu);
                setShowLayoutMenu(false);
                setShowHostMenu(false);
              }}
              data-testid="toolbar-more-btn"
              className="h-9 px-2 sm:px-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1"
              title="More options & diagnostics"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div className="fixed bottom-16 right-2 sm:absolute sm:bottom-12 sm:right-0 z-50 w-60 max-w-[calc(100vw-16px)] max-h-[72dvh] overflow-y-auto p-2 rounded-2xl bg-[#0c182c] border border-slate-700 shadow-2xl space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowDiagnostics(true);
                    setShowMoreMenu(false);
                  }}
                  data-testid="menu-open-diagnostics"
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  <span>Audio &amp; Connection Diagnostics</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('participants');
                    setIsSidebarOpen(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex sm:hidden items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span>Participants &amp; Q&amp;A Panel</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('resources');
                    setIsSidebarOpen(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>KEW Papers, DOIs &amp; Resources</span>
                </button>

                {canPresentDeck && (
                  <button
                    onClick={() => {
                      if (isSlideDeckEffective) closeBriefingDeck();
                      else openBriefingDeck();
                      setShowMoreMenu(false);
                    }}
                    data-testid="menu-present-deck-btn"
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                  >
                    <Presentation className="w-3.5 h-3.5 text-teal-300" />
                    <span>{isSlideDeckEffective ? 'Close Briefing Deck' : 'Present KEW Slide Deck'}</span>
                  </button>
                )}

                {permissions.canEnterGreenRoom && (
                  <button
                    onClick={() => {
                      toggleGreenRoomPresence();
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-indigo-300 flex items-center gap-2"
                  >
                    <DoorOpen className="w-3.5 h-3.5" />
                    <span>
                      {me?.presence === 'green_room' ? 'Enter Main Live Stage' : 'Step Into Green Room'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowRolePassModal(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Role / Room Access Token</span>
                </button>

                {/* Reactions Row */}
                <div className="pt-1 border-t border-slate-800 flex items-center justify-around px-1">
                  {['👏', '👍', '🔬', '🏔️', '💧'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        postSignalAction({ action: 'reaction', emoji });
                        setShowMoreMenu(false);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-base"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* HOST-ONLY PRODUCTION CONTROLS (Strictly hidden from ordinary delegates!) */}
          {(permissions.canMuteOthers ||
            permissions.canLockRoom ||
            permissions.canRecord ||
            permissions.canChangeEventMode) && (
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setShowHostMenu(!showHostMenu);
                  setShowLayoutMenu(false);
                  setShowMoreMenu(false);
                }}
                data-testid="toolbar-host-controls-btn"
                className="h-9 px-2 sm:px-3 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden xl:inline">Host</span>
              </button>

              {showHostMenu && (
                <div className="fixed bottom-16 right-2 sm:absolute sm:bottom-12 sm:right-0 z-50 w-72 max-w-[calc(100vw-16px)] max-h-[72dvh] overflow-y-auto p-3 rounded-2xl bg-[#0c182c] border border-amber-500/40 shadow-2xl space-y-2 text-xs">
                  <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    Host &amp; Producer Controls (Server-Enforced)
                  </div>

                  {permissions.canMuteOthers && (
                    <button
                      onClick={() => {
                        sendHostCommand('mute_all');
                        setShowHostMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200"
                    >
                      Mute All Other Microphones
                    </button>
                  )}

                  {permissions.canLockRoom && (
                    <button
                      onClick={() => {
                        sendHostCommand('lock_room', { locked: !roomConfig.isRoomLocked });
                        setShowHostMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                    >
                      <span>{roomConfig.isRoomLocked ? 'Unlock Virtual Hall' : 'Lock Virtual Hall'}</span>
                      {roomConfig.isRoomLocked ? (
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </button>
                  )}

                  {permissions.canLockRoom && (
                    <button
                      onClick={() => {
                        sendHostCommand('toggle_waiting_room', {
                          enabled: !roomConfig.waitingRoomEnabled,
                        });
                        setShowHostMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200"
                    >
                      {roomConfig.waitingRoomEnabled
                        ? '✓ Waiting Room Enabled (Click to Disable)'
                        : 'Enable Delegate Waiting Room'}
                    </button>
                  )}

                  {permissions.canRecord && (
                    <button
                      onClick={() => {
                        setShowHostMenu(false);
                        if (isAnyRecordingActive) stopConsentRecording();
                        else setShowRecordingConsentModal(true);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-1.5 rounded-lg font-semibold flex items-center justify-between',
                        isAnyRecordingActive
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-rose-300'
                      )}
                    >
                      <span>{isAnyRecordingActive ? 'Stop Session Recording' : 'Start Consent Recording'}</span>
                      {isAnyRecordingActive ? (
                        <Square className="w-3.5 h-3.5" />
                      ) : (
                        <CircleDot className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}

                  {permissions.canChangeEventMode && (
                    <div className="pt-1 border-t border-slate-800 space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 block">
                        Scientific Event Mode (8 Modes)
                      </label>
                      <select
                        value={roomConfig.eventMode}
                        onChange={(e) => {
                          const mode = e.target.value as EventModeId;
                          sendHostCommand('set_event_mode', { eventMode: mode });
                          if (eventModes[mode]?.defaultLayout) {
                            setStageLayout(eventModes[mode].defaultLayout);
                          }
                          setShowHostMenu(false);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      >
                        {Object.values(eventModes).map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {permissions.canEndConference && (
                    <button
                      onClick={() => {
                        sendHostCommand(roomConfig.isSessionEnded ? 'reopen_session' : 'end_session');
                        setShowHostMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-200 font-semibold"
                    >
                      {roomConfig.isSessionEnded ? 'Reopen Session Hall' : 'End Session for All'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Leave Conference */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Link href="/webinars">
            <button className="h-9 px-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </Link>
        </div>
      </footer>

      {/* REAL HARDWARE & WEBRTC DIAGNOSTICS MODAL (3-LAYER PERMISSION SEPARATION) */}
      {diagnosticsModalNode}

      {/* RECORDING CONSENT & 1 GB QUOTA MODAL */}
      {showRecordingConsentModal && (
        <div className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1526] border border-rose-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <CircleDot className="w-4 h-4 text-rose-400" />
              <span>Start Consent-Based Session Recording</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Starting recording displays a live <strong>REC</strong> indicator to every connected participant. Recordings are stored privately within the <strong>1 GB Phase I institutional quota</strong> and require Administrator approval before public listing.
            </p>
            <label className="flex items-start gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5"
              />
              <span className="text-slate-200">
                I confirm all active speakers have been notified and consented to recording under KEW scientific governance.
              </span>
            </label>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowRecordingConsentModal(false)}
                className="border-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={!consentChecked}
                onClick={startConsentRecording}
                className="bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-bold"
              >
                Begin Recording
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ROLE / IDENTITY / SIGNED TOKEN MODAL */}
      {showRolePassModal && (
        <div className="fixed inset-0 z-[85] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowRolePassModal(false);
              joinHall();
            }}
            className="bg-[#0b1526] border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-3.5 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div>
                <h2 className="text-sm font-bold text-white">Session Identity &amp; Access Pass</h2>
                <p className="text-[11px] text-slate-400">
                  Phase I: {capacityProfile?.maxConcurrentDelegates ?? 10} delegates,{' '}
                  {capacityProfile?.maxInteractiveSpeakers ?? 2} speakers, $0 hosting charge
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRolePassModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={desiredName}
                  onChange={(e) => {
                    hasCustomNameRef.current = true;
                    setDesiredName(e.target.value);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Institution / Affiliation</label>
                <input
                  type="text"
                  required
                  value={desiredAffiliation}
                  onChange={(e) => {
                    hasCustomAffRef.current = true;
                    setDesiredAffiliation(e.target.value);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Environment Namespace</label>
                <select
                  value={desiredEnv}
                  onChange={(e) => setDesiredEnv(e.target.value as EnvironmentMode)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="demo">Demo Sandbox (Isolated)</option>
                  <option value="live">Live Authorized Session</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Participant Role</label>
                <select
                  value={desiredRole}
                  onChange={(e) => setDesiredRole(e.target.value as HallRole)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="delegate">Registered Delegate</option>
                  <option value="observer">Observer (View Only)</option>
                  <option value="speaker">
                    Confirmed Speaker {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                  </option>
                  <option value="moderator">
                    Scientific Moderator {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                  </option>
                  <option value="technical_producer">
                    Technical Producer {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                  </option>
                  <option value="host">
                    Conference Host {!isAdminSessionActive && !providedSignedToken.trim() ? '(Token Req.)' : ''}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-slate-300">
                  Signed Room Token (Required for Host/Speaker unless Admin)
                </label>
                <button
                  type="button"
                  onClick={() => setShowMintHelper((v) => !v)}
                  className="text-[10px] text-teal-400 hover:underline cursor-pointer"
                >
                  {showMintHelper ? 'Hide Token Generator' : 'Mint Token (Admin)'}
                </button>
              </div>
              <input
                type="text"
                value={providedSignedToken}
                onChange={(e) => setProvidedSignedToken(e.target.value)}
                placeholder="kew_vh1...."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-teal-300 font-mono text-[11px]"
              />
            </div>

            {showMintHelper && (
              <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30 space-y-2">
                <div className="text-[10px] font-bold uppercase text-teal-300">
                  Generate Signed <code>kew_vh1...</code> Token for {session.id}
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={mintPasscode}
                    onChange={(e) => setMintPasscode(e.target.value)}
                    placeholder="KEW Admin Passcode (optional if logged in)"
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleMintSignedToken}
                    disabled={mintLoading}
                    className="bg-teal-700 hover:bg-teal-600 text-white text-[11px] shrink-0"
                  >
                    {mintLoading ? 'Minting…' : 'Mint Token'}
                  </Button>
                </div>
                {mintFeedback && (
                  <p
                    className={`text-[11px] ${
                      mintFeedback.ok ? 'text-emerald-300' : 'text-amber-300'
                    }`}
                  >
                    {mintFeedback.text}
                  </p>
                )}
              </div>
            )}

            {desiredRole !== 'delegate' && desiredRole !== 'observer' && (
              <label className="flex items-center gap-2 text-[11px] text-indigo-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={joinGreenRoomChecked}
                  onChange={(e) => setJoinGreenRoomChecked(e.target.checked)}
                />
                <span>Enter via private Speaker Green Room (off-air hardware check)</span>
              </label>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowRolePassModal(false)}
                className="border-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold">
                Apply &amp; Reconnect
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
