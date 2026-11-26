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
import { VirtualHallParticipantTile } from './hall/VirtualHallAvatar';
import { RealWebRtcTelemetry, VirtualHallDiagnosticsModal } from './hall/VirtualHallDiagnosticsModal';
import { SidePanelTabId, VirtualHallSidePanel } from './hall/VirtualHallSidePanel';
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
  // Room & RBAC state from server
  const [joinStatus, setJoinStatus] = useState<'connecting' | 'joined' | 'blocked'>('connecting');
  const [joinBlockReason, setJoinBlockReason] = useState<{ code: string; message: string } | null>(null);
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
    defaultLayout: 'presentation',
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
  const [micPermissionStatus, setMicPermissionStatus] = useState<string>('prompt');
  const [micError, setMicError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [actionBanner, setActionBanner] = useState<{ text: string; tone: 'info' | 'warn' | 'ok' } | null>(
    null
  );

  // Devices
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState('');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState('');
  const [selectedCameraId, setSelectedCameraId] = useState('');

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
    rttMs: null,
    jitterMs: null,
    packetsLost: 0,
    packetsReceived: 0,
    inboundKbps: 0,
    outboundKbps: 0,
    videoResolution: null,
    framesPerSecond: null,
    candidateType: null,
    sampledAt: null,
  });

  // Refs
  const rootContainerRef = useRef<HTMLDivElement | null>(null);
  const hallTokenRef = useRef<string>('');
  const myPeerIdRef = useRef<string>(`peer_${Math.random().toString(36).slice(2, 11)}`);
  const isMountedRef = useRef<boolean>(false);
  const joinGenRef = useRef<number>(0);
  const meRef = useRef<HallParticipant | null>(null);
  const lastSeqRef = useRef<number>(0);
  const iceServersRef = useRef<RTCIceServer[]>([{ urls: 'stun:stun.l.google.com:19302' }]);
  const peersRef = useRef<Map<string, PeerConnectionEntry>>(new Map());
  const prevBytesRef = useRef<{ rx: number; tx: number; ts: number }>({ rx: 0, tx: 0, ts: 0 });

  const audioStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const cameraStateRef = useRef<'IDLE' | 'REQUESTING' | 'ACTIVE' | 'STOPPING'>('IDLE');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const micRafRef = useRef<number | null>(null);
  const remoteAudioCtxRef = useRef<AudioContext | null>(null);
  const remoteRafRef = useRef<number | null>(null);
  const remoteAudioElsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const speechRecRef = useRef<{ stop: () => void } | null>(null);

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

  // Lock document scroll & collapse sidebar automatically on mobile/tablet initial load
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Device enumeration
  const refreshDevices = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      const mics = list.filter((d) => d.kind === 'audioinput');
      const spks = list.filter((d) => d.kind === 'audiooutput');
      const cams = list.filter((d) => d.kind === 'videoinput');
      setAudioInputDevices(mics);
      setAudioOutputDevices(spks);
      setVideoDevices(cams);
      if (mics[0] && !selectedMicId) setSelectedMicId(mics[0].deviceId);
      if (spks[0] && !selectedSpeakerId) setSelectedSpeakerId(spks[0].deviceId);
      if (cams[0] && !selectedCameraId) {
        const physical =
          cams.find(
            (c) =>
              !c.label.toLowerCase().includes('virtual') &&
              !c.label.toLowerCase().includes('phone') &&
              !c.label.toLowerCase().includes('quest')
          ) || cams[0];
        setSelectedCameraId(physical.deviceId);
      }
    } catch {
      // ignore enumeration error prior to permission
    }
  }, [selectedCameraId, selectedMicId, selectedSpeakerId]);

  useEffect(() => {
    refreshDevices();
  }, [refreshDevices]);

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
      const tick = () => {
        if (!audioStreamRef.current) return;
        analyser.getByteTimeDomainData(buf);
        let sumSq = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          sumSq += v * v;
        }
        const rms = Math.sqrt(sumSq / buf.length);
        setMicAudioLevel(Math.min(100, Math.round(rms * 320)));
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
      }

      if (stream.getAudioTracks().length > 0 && !remoteAudioCtxRef.current) {
        try {
          const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new Ctx();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          const src = ctx.createMediaStreamSource(stream);
          src.connect(analyser);
          remoteAudioCtxRef.current = ctx;
          const buf = new Uint8Array(analyser.frequencyBinCount);
          const tick = () => {
            analyser.getByteTimeDomainData(buf);
            let sumSq = 0;
            for (let i = 0; i < buf.length; i++) {
              const v = (buf[i] - 128) / 128;
              sumSq += v * v;
            }
            const rms = Math.sqrt(sumSq / buf.length);
            setRemoteAudioLevel(Math.min(100, Math.round(rms * 320)));
            remoteRafRef.current = requestAnimationFrame(tick);
          };
          tick();
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
        (audioTr.sender as RTCRtpSender & { setStreams?: (...s: MediaStream[]) => void }).setStreams?.(
          audioStreamRef.current
        );
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
        (videoTr.sender as RTCRtpSender & { setStreams?: (...s: MediaStream[]) => void }).setStreams?.(
          activeVidStream
        );
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
          if (ev.track.kind === 'audio') {
            attachRemoteAudioPlayback(remotePeerId, cloned);
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

      if (initiateIfTieWinner && myPeerIdRef.current && myPeerIdRef.current < remotePeerId) {
        setTimeout(() => {
          negotiateWithPeer(remotePeerId);
        }, 80);
      }

      return entry;
    },
    [attachCurrentLocalTracksToPc, attachRemoteAudioPlayback, negotiateWithPeer, postSignalAction]
  );

  const closePeerConnection = useCallback((remotePeerId: string) => {
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

  // Dispose local camera with 250ms Windows Media Foundation driver cooldown
  const stopCurrentVideoTracks = useCallback(async () => {
    if (cameraStateRef.current === 'STOPPING') return;
    cameraStateRef.current = 'STOPPING';
    if (videoStreamRef.current) {
      videoStreamRef.current.getVideoTracks().forEach((t) => {
        try {
          t.stop();
        } catch {}
      });
      videoStreamRef.current = null;
    }
    setVideoStream(null);
    setIsVideoOn(false);
    await new Promise((r) => setTimeout(r, 250));
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
            stopCurrentVideoTracks();
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

  // Join Virtual Scientific Hall (supports query params + role/token modal re-join)
  const joinHall = useCallback(
    async (opts?: {
      displayName?: string;
      affiliation?: string;
      requestedRole?: HallRole;
      environmentMode?: EnvironmentMode;
      providedToken?: string;
      enterGreenRoom?: boolean;
    }) => {
      const myGen = ++joinGenRef.current;
      setJoinStatus('connecting');
      setJoinBlockReason(null);
      closeAllPeerConnections();

      try {
        const payloadBody = JSON.stringify({
          action: 'join',
          peerId: myPeerIdRef.current || undefined,
          displayName: opts?.displayName ?? desiredName,
          affiliation: opts?.affiliation ?? desiredAffiliation,
          requestedRole: opts?.requestedRole ?? desiredRole,
          environmentMode: opts?.environmentMode ?? desiredEnv,
          providedToken: opts?.providedToken ?? providedSignedToken,
          enterGreenRoom: opts?.enterGreenRoom ?? joinGreenRoomChecked,
        });

        let res = await fetch(`/api/webinars/room/${encodeURIComponent(session.id)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payloadBody,
        });

        // Automatic single retry if dev server was cold-compiling on initial hit
        if (res.status >= 500) {
          await new Promise((resolve) => setTimeout(resolve, 900));
          res = await fetch(`/api/webinars/room/${encodeURIComponent(session.id)}`, {
            method: 'POST',
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
        setCapacityProfile(data.capacityProfile || null);
        setEventModes(data.eventModes || {});
        setRoomConfig(data.roomConfig);
        setStageLayout(data.roomConfig?.defaultLayout || 'active_speaker');
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
    const params = new URLSearchParams(window.location.search);
    const qRole = (params.get('role') as HallRole) || 'delegate';
    const qName =
      params.get('name') ||
      (qRole === 'host'
        ? 'Session Host'
        : qRole === 'speaker'
        ? 'Presenting Scientist'
        : qRole === 'moderator'
        ? 'Scientific Moderator'
        : 'Visiting Delegate');
    const qAff = params.get('affiliation') || 'Western Himalayan Research Network';
    const qEnv = params.get('env') === 'live' ? 'live' : 'demo';
    const qToken = params.get('token') || '';
    const qGreen = params.get('greenroom') === '1';

    setDesiredRole(qRole);
    setDesiredName(qName);
    setDesiredAffiliation(qAff);
    setDesiredEnv(qEnv);
    setProvidedSignedToken(qToken);
    setJoinGreenRoomChecked(qGreen);

    joinHall({
      displayName: qName,
      affiliation: qAff,
      requestedRole: qRole,
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
          body: JSON.stringify({ action: 'leave' }),
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
          setJoinStatus('blocked');
          setJoinBlockReason({
            code: 'SESSION_DISCONNECTED',
            message: 'Your room session has ended or was disconnected.',
          });
          return;
        }
        if (!res.ok) return;
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
        if (data.roomConfig) setRoomConfig(data.roomConfig);
        if (data.counts) setCounts(data.counts);
        if (Array.isArray(data.participants)) {
          setParticipants(data.participants);
          // Connect P2P mesh with any connected peers when we are on main stage
          if (data.me?.presence === 'connected') {
            const activeRemoteIds = new Set<string>();
            for (const p of data.participants as HallParticipant[]) {
              if (p.peerId !== myPeerIdRef.current && p.presence === 'connected') {
                activeRemoteIds.add(p.peerId);
                getOrCreatePeerConnection(p.peerId, true);
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
            await handleSignalEnvelope(sig);
          }
        }
      } catch {
        // transient network hiccup; next poll recovers
      } finally {
        pollInFlight = false;
      }
    };

    const interval = setInterval(pollSignals, 450);
    pollSignals();
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [
    closeAllPeerConnections,
    closePeerConnection,
    getOrCreatePeerConnection,
    hallToken,
    handleSignalEnvelope,
    joinStatus,
    session.id,
  ]);

  // Real RTCPeerConnection.getStats() sampler every 1.5s
  useEffect(() => {
    const timer = setInterval(async () => {
      const entries = Array.from(peersRef.current.values());
      if (entries.length === 0) {
        setTelemetry((prev) => ({
          ...prev,
          activePeerConnections: 0,
          connectionState: joinStatus === 'joined' ? 'standby' : 'offline',
          rttMs: null,
          jitterMs: null,
          inboundKbps: 0,
          outboundKbps: 0,
          videoResolution: null,
          framesPerSecond: null,
          candidateType: null,
        }));
        return;
      }

      let rttMs: number | null = null;
      let jitterMs: number | null = null;
      let packetsLost = 0;
      let packetsReceived = 0;
      let bytesRx = 0;
      let bytesTx = 0;
      let videoRes: string | null = null;
      let fps: number | null = null;
      let candidateType: string | null = null;
      let connState = entries[0].pc.connectionState;

      for (const { pc } of entries) {
        if (pc.connectionState === 'connected') connState = 'connected';
        try {
          const stats = await pc.getStats();
          const candidateMap = new Map<string, { candidateType?: string }>();
          stats.forEach((report) => {
            if (report.type === 'local-candidate' || report.type === 'remote-candidate') {
              candidateMap.set(report.id, report);
            }
          });
          stats.forEach((report) => {
            if (report.type === 'candidate-pair' && report.state === 'succeeded') {
              if (typeof report.currentRoundTripTime === 'number') {
                rttMs = Math.round(report.currentRoundTripTime * 1000);
              }
              const localCand = candidateMap.get(report.localCandidateId);
              if (localCand?.candidateType) candidateType = localCand.candidateType;
            }
            if (report.type === 'inbound-rtp') {
              bytesRx += report.bytesReceived || 0;
              packetsLost += report.packetsLost || 0;
              packetsReceived += report.packetsReceived || 0;
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
      prevBytesRef.current = { rx: bytesRx, tx: bytesTx, ts: now };

      setTelemetry({
        activePeerConnections: entries.length,
        connectionState: connState,
        rttMs,
        jitterMs,
        packetsLost,
        packetsReceived,
        inboundKbps: inKbps,
        outboundKbps: outKbps,
        videoResolution: videoRes,
        framesPerSecond: fps,
        candidateType,
        sampledAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [joinStatus]);

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
        const constraints: MediaTrackConstraints = selectedMicId
          ? { deviceId: { exact: selectedMicId } }
          : { echoCancellation: true, noiseSuppression: true, autoGainControl: true };
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: constraints,
          video: false,
        });
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
  ]);

  // Toggle Hardware Camera (preserving proven 250ms driver cooldown & physical webcam preference)
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
        const devId = deviceOverride || selectedCameraId;
        let stream: MediaStream | null = null;
        if (devId) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: { deviceId: { ideal: devId }, width: { ideal: 1280 }, height: { ideal: 720 } },
              audio: false,
            });
          } catch {
            stream = null;
          }
        }
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }
        const track = stream.getVideoTracks()[0];
        if (!track || track.readyState !== 'live') {
          throw new Error('No active video track returned by camera.');
        }

        videoStreamRef.current = stream;
        setVideoStream(stream);
        setIsVideoOn(true);
        cameraStateRef.current = 'ACTIVE';
        refreshDevices();

        if (me?.presence === 'connected') {
          for (const pid of peersRef.current.keys()) negotiateWithPeer(pid);
        }
      } catch (err) {
        cameraStateRef.current = 'IDLE';
        setIsVideoOn(false);
        await postSignalAction({ action: 'update_media_state', isVideoEnabled: false });
        const msg = `Camera error: ${(err as Error).message}`;
        setCameraError(msg);
        pushNotice(msg, 'warn');
      } finally {
        setIsCameraLoading(false);
      }
    },
    [
      me?.presence,
      negotiateWithPeer,
      postSignalAction,
      pushNotice,
      refreshDevices,
      selectedCameraId,
      stopCurrentVideoTracks,
    ]
  );

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

  // Host command wrapper
  const sendHostCommand = useCallback(
    async (command: string, extra: Record<string, unknown> = {}) => {
      const res = await postSignalAction({ action: 'host_control', command, ...extra });
      if (!res.ok) {
        pushNotice(res.data?.error || 'Host permission denied.', 'warn');
      }
    },
    [postSignalAction, pushNotice]
  );

  // Connected main-stage participants + optional explicitly-toggled fictional layout preview tiles
  const connectedParticipants = useMemo(
    () => participants.filter((p) => p.presence === 'connected'),
    [participants]
  );

  const stageTiles = useMemo(() => {
    const realTiles = connectedParticipants.map((p) => {
      const isLocal = p.peerId === myPeerId;
      const localVid = isScreenSharing ? screenStream : videoStream;
      const remoteVid = remoteStreamsByPeer[p.peerId] || null;
      const hasLiveRemoteVideo = Boolean(
        remoteVid && remoteVid.getVideoTracks().some((t) => t.readyState === 'live')
      );
      return {
        peerId: p.peerId,
        name: p.displayName,
        affiliation: p.affiliation,
        role: p.role,
        isLocal,
        isAudioEnabled: isLocal ? isMicOn : p.isAudioEnabled,
        isVideoEnabled: isLocal ? isVideoOn || isScreenSharing : p.isVideoEnabled || hasLiveRemoteVideo,
        isScreenSharing: isLocal ? isScreenSharing : p.isScreenSharing,
        isHandRaised: p.isHandRaised,
        isSpotlighted: roomConfig.spotlightPeerId === p.peerId,
        isVerifiedIdentity: p.isVerifiedIdentity,
        isDemoPlaceholder: false,
        audioLevel: isLocal ? micAudioLevel : remoteAudioLevel,
        videoStream: isLocal ? localVid : remoteVid,
        mirrored: isLocal && !isScreenSharing,
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
          isDemoPlaceholder: true,
          audioLevel: 0,
          videoStream: null,
          mirrored: false,
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
          isDemoPlaceholder: true,
          audioLevel: 0,
          videoStream: null,
          mirrored: false,
        }
      );
    }

    return realTiles;
  }, [
    connectedParticipants,
    environmentMode,
    isMicOn,
    isScreenSharing,
    isVideoOn,
    micAudioLevel,
    myPeerId,
    remoteAudioLevel,
    remoteStreamsByPeer,
    roomConfig.spotlightPeerId,
    screenStream,
    showDemoLayoutPreview,
    videoStream,
  ]);

  const primaryTile = useMemo(() => {
    return (
      stageTiles.find((t) => t.isScreenSharing) ||
      stageTiles.find((t) => t.isSpotlighted) ||
      stageTiles.find((t) => !t.isLocal && t.isVideoEnabled) ||
      stageTiles.find((t) => t.isVideoEnabled) ||
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
  const hasPresentationSurface =
    isSlideDeckActive || isScreenSharing || stageTiles.some((t) => t.isScreenSharing);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderPresentationCanvas = () => {
    const screenTile = stageTiles.find((t) => t.isScreenSharing && t.videoStream);
    if (screenTile && screenTile.videoStream) {
      return (
        <VirtualHallParticipantTile
          {...screenTile}
          mirrored={false}
          className="w-full h-full bg-black"
        />
      );
    }

    return (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0b192e] via-[#091324] to-[#060d18] border border-teal-500/30 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-mono uppercase shrink-0">
              KEW Scientific Deck
            </span>
            <span className="text-xs text-slate-400 font-mono truncate">{session.roomCode}</span>
          </div>
          {permissions.canShareScreen && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() =>
                  sendHostCommand('set_slide_index', {
                    slideIndex:
                      (roomConfig.activeSlideDeckIndex - 1 + SCIENTIFIC_SLIDES.length) %
                      SCIENTIFIC_SLIDES.length,
                  })
                }
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 px-1.5">
                {(roomConfig.activeSlideDeckIndex % SCIENTIFIC_SLIDES.length) + 1}/
                {SCIENTIFIC_SLIDES.length}
              </span>
              <button
                onClick={() =>
                  sendHostCommand('set_slide_index', {
                    slideIndex: (roomConfig.activeSlideDeckIndex + 1) % SCIENTIFIC_SLIDES.length,
                  })
                }
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsSlideDeckActive(false)}
                className="ml-1 px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 text-[10px] font-semibold"
              >
                Close Deck
              </button>
            </div>
          )}
        </div>

        <div className="my-auto py-4 space-y-4">
          <div>
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-snug">
              {currentSlide.title}
            </h2>
            <p className="text-xs sm:text-sm text-teal-300 mt-1">{currentSlide.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-lg sm:text-2xl font-black text-teal-300 font-mono">
                {currentSlide.metricA}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{currentSlide.metricALabel}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
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

        <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-2">
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

  // Blocked / Capacity Full / Room Locked Screen
  if (joinStatus === 'blocked' && joinBlockReason) {
    return (
      <div className="fixed inset-0 z-[60] h-[100dvh] w-screen bg-[#060d18] text-slate-100 flex items-center justify-center p-4 overflow-hidden">
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

          {/* One-Click Demo Sandbox Role Entry */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
              Quick Demo Sandbox Entry (No Token Required)
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { role: 'host', label: 'Conference Host', defaultName: 'Session Host' },
                  { role: 'speaker', label: 'Confirmed Speaker', defaultName: 'Presenting Scientist' },
                  { role: 'moderator', label: 'Moderator', defaultName: 'Scientific Moderator' },
                  { role: 'delegate', label: 'Delegate', defaultName: 'Visiting Delegate' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => {
                    setDesiredEnv('demo');
                    setDesiredRole(preset.role);
                    setDesiredName(preset.defaultName);
                    setProvidedSignedToken('');
                    joinHall({
                      environmentMode: 'demo',
                      requestedRole: preset.role,
                      displayName: preset.defaultName,
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
              Join with Authorized Token or Sandbox Role
            </Button>
            <Link href="/webinars">
              <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 text-xs">
                Return to Webinars
              </Button>
            </Link>
          </div>
        </div>

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
                    Join with Authorized Token or Sandbox Role
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Choose Demo Sandbox (no token needed) or paste a signed <code>kew_vh1...</code> token
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
                    onChange={(e) => setDesiredName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Institution / Affiliation</label>
                  <input
                    type="text"
                    required
                    value={desiredAffiliation}
                    onChange={(e) => setDesiredAffiliation(e.target.value)}
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
                  <label className="block text-[11px] text-slate-300 mb-1">Participant / Sandbox Role</label>
                  <select
                    value={desiredRole}
                    onChange={(e) => setDesiredRole(e.target.value as HallRole)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="delegate">Registered Delegate</option>
                    <option value="observer">Observer (View Only)</option>
                    <option value="speaker">Confirmed Speaker</option>
                    <option value="moderator">Scientific Moderator</option>
                    <option value="technical_producer">Technical Producer</option>
                    <option value="host">Conference Host</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-300">
                    Signed Room Token {desiredEnv === 'demo' ? '(Optional in Demo Sandbox)' : '(Required for Host/Speaker)'}
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
                  placeholder="Paste signed kew_vh1... token (optional in Demo Sandbox)"
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
      className="fixed inset-0 z-[120] h-[100dvh] w-screen bg-[#060d18] text-slate-100 flex flex-col overflow-hidden select-none"
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

          {/* Actual WebRTC / Room Connection Pill */}
          <div
            data-testid="connection-status-pill"
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono"
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                telemetry.connectionState === 'connected'
                  ? 'bg-emerald-400'
                  : joinStatus === 'joined'
                  ? 'bg-teal-400'
                  : 'bg-amber-400'
              )}
            />
            <span className="text-slate-200">
              {telemetry.connectionState === 'connected'
                ? `P2P Live${telemetry.rttMs !== null ? ` · ${telemetry.rttMs}ms` : ''}`
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
              <div className="max-w-md space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-white">Waiting for Session Host Admission</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You are connected in the pre-admission lobby for <strong>{session.title}</strong>. The Session Chair or Moderator will admit you shortly.
                </p>
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
            /* CASE C: MAIN STAGE — 8 CONFIGURABLE ADAPTIVE LAYOUTS */
            <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden relative">
              {/* Layout 1: Active Speaker */}
              {stageLayout === 'active_speaker' && (
                <div className="flex-1 min-h-0 flex flex-col gap-2">
                  <div className="flex-1 min-h-0 relative">
                    {hasPresentationSurface ? (
                      renderPresentationCanvas()
                    ) : primaryTile ? (
                      <VirtualHallParticipantTile {...primaryTile} className="w-full h-full" />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-[#0a1424] border border-slate-800 flex items-center justify-center p-4 text-center">
                        <div className="max-w-md space-y-2">
                          <div className="text-sm font-bold text-white">Stage Ready · Awaiting Speaker Stream</div>
                          <p className="text-xs text-slate-400">
                            Phase I capacity: up to {roomConfig.maxConcurrentDelegates} concurrent delegates &amp;{' '}
                            {roomConfig.effectiveMaxInteractiveSpeakers ?? roomConfig.maxInteractiveSpeakers}{' '}
                            interactive speakers.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {stageTiles.length > 1 && (
                    <div className="h-24 sm:h-28 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 shrink-0">
                      {stageTiles.slice(0, 5).map((t) => (
                        <VirtualHallParticipantTile
                          key={t.peerId}
                          {...t}
                          compact
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

              {/* Layout 2: Gallery View */}
              {stageLayout === 'gallery' && (
                <div
                  className={cn(
                    'flex-1 min-h-0 grid gap-2',
                    stageTiles.length <= 1
                      ? 'grid-cols-1'
                      : stageTiles.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : stageTiles.length <= 4
                      ? 'grid-cols-2'
                      : 'grid-cols-2 lg:grid-cols-3'
                  )}
                >
                  {stageTiles.map((t) => (
                    <VirtualHallParticipantTile key={t.peerId} {...t} className="w-full h-full min-h-0" />
                  ))}
                </div>
              )}

              {/* Layout 3: Presentation View (75% Deck/Screen + 25% Speaker Rail) */}
              {stageLayout === 'presentation' && (
                <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-2">
                  <div className="flex-[3] min-h-0 min-w-0">{renderPresentationCanvas()}</div>
                  <div className="h-28 lg:h-auto lg:w-60 xl:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto shrink-0">
                    {stageTiles.map((t) => (
                      <VirtualHallParticipantTile
                        key={t.peerId}
                        {...t}
                        compact
                        className="w-44 lg:w-full h-full lg:h-36 shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Layout 4: Side-by-Side View (50% Presentation / 50% Active Speaker) */}
              {stageLayout === 'side_by_side' && (
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div className="min-h-0">{renderPresentationCanvas()}</div>
                  <div className="min-h-0">
                    {primaryTile ? (
                      <VirtualHallParticipantTile {...primaryTile} className="w-full h-full" />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-[#0b1526] border border-slate-800 flex items-center justify-center text-xs text-slate-400">
                        Active Speaker Slot
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Layout 5: Expert Panel View */}
              {stageLayout === 'expert_panel' && (
                <div className="flex-1 min-h-0 flex flex-col gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] shrink-0">
                    <span className="font-semibold text-teal-300">Expert Panel Discussion Stage</span>
                    <span className="font-mono text-slate-400">{session.discipline}</span>
                  </div>
                  <div
                    className={cn(
                      'flex-1 min-h-0 grid gap-2.5',
                      stageTiles.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
                    )}
                  >
                    {stageTiles.slice(0, 4).map((t) => (
                      <VirtualHallParticipantTile key={t.peerId} {...t} className="w-full h-full" />
                    ))}
                  </div>
                </div>
              )}

              {/* Layout 6: Podcast Interview View (2-Person Studio Frame) */}
              {stageLayout === 'podcast_interview' && (
                <div className="flex-1 min-h-0 flex flex-col gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 flex items-center justify-between text-[11px] shrink-0">
                    <span className="font-bold text-teal-200 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-teal-400" />
                      KEW Scientific Podcast Studio (2-Speaker Conversational Frame)
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Max 2 Interactive Voices</span>
                  </div>
                  <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stageTiles.slice(0, 2).map((t) => (
                      <VirtualHallParticipantTile key={t.peerId} {...t} className="w-full h-full" />
                    ))}
                    {stageTiles.length < 2 && (
                      <div className="rounded-xl bg-[#0b1526] border border-dashed border-slate-700 flex flex-col items-center justify-center p-4 text-center text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Co-Host / Guest Scientist Slot</span>
                        <span className="text-[11px] text-slate-500 mt-1">
                          Awaiting 2nd connected studio speaker
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Layout 7: Workshop Collaboration View (Workbench + up to 3 Interactive Tiles) */}
              {stageLayout === 'workshop_collaboration' && (
                <div className="flex-1 min-h-0 flex flex-col gap-2">
                  <div className="flex-[2] min-h-0">{renderPresentationCanvas()}</div>
                  <div className="flex-1 min-h-[110px] grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {stageTiles.slice(0, 3).map((t) => (
                      <VirtualHallParticipantTile key={t.peerId} {...t} compact className="w-full h-full" />
                    ))}
                  </div>
                </div>
              )}

              {/* Layout 8: Fullscreen Presentation View + PiP Speaker */}
              {stageLayout === 'fullscreen_presentation' && (
                <div className="flex-1 min-h-0 relative">
                  {renderPresentationCanvas()}
                  {primaryTile && (
                    <div className="w-40 sm:w-52 h-28 sm:h-32 absolute bottom-3 right-3 z-20 shadow-2xl">
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
              widthPx={sidebarWidth}
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
              onLaunchDeckOnStage={() => {
                setIsSlideDeckActive(true);
                setStageLayout('presentation');
              }}
            />
          </>
        )}
      </div>

      {/* 3. COMPACT PROFESSIONAL CONFERENCE TOOLBAR (56px) */}
      <footer className="h-14 px-2 sm:px-4 bg-[#081120] border-t border-slate-800/90 flex items-center justify-between gap-1.5 shrink-0 z-50">
        {/* Left: Compact Local Audio/Role Readout */}
        <div className="hidden md:flex items-center gap-2 min-w-0 text-[11px]">
          <button
            onClick={() => setShowRolePassModal(true)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center gap-1.5 truncate max-w-[210px]"
            title="Click to view or update your participant identity & role token"
          >
            <KeyRound className="w-3 h-3 text-teal-400 shrink-0" />
            <span className="font-semibold truncate">{me?.displayName || 'Joining...'}</span>
            <span className="text-[10px] font-mono text-teal-300 uppercase shrink-0">
              ({permissions.label.split(' ')[0]})
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
        <div className="flex items-center gap-1 sm:gap-1.5 mx-auto">
          {/* Microphone */}
          <button
            onClick={toggleMic}
            data-testid="toolbar-mic-btn"
            className={cn(
              'h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border',
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
            disabled={isCameraLoading}
            data-testid="toolbar-camera-btn"
            className={cn(
              'h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border',
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
              'h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border',
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
              'h-9 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border',
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
              'h-9 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border',
              isSidebarOpen && activeTab === 'chat'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Open session chat"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden lg:inline">Chat</span>
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
              'h-9 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border',
              isSidebarOpen && activeTab === 'qna'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Moderated Q&A"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden lg:inline">Q&amp;A</span>
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
              'h-9 px-2.5 rounded-xl text-xs font-semibold hidden sm:flex items-center gap-1 transition-colors border',
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
              'h-9 px-2.5 rounded-xl text-xs font-semibold hidden md:flex items-center gap-1 transition-colors border',
              captionsEnabled
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            )}
            title="Toggle browser live captions"
          >
            <Captions className="w-4 h-4" />
            <span className="hidden xl:inline">Captions</span>
          </button>

          {/* Stage Layout Switcher (8 Layouts) */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLayoutMenu(!showLayoutMenu);
                setShowMoreMenu(false);
                setShowHostMenu(false);
              }}
              data-testid="toolbar-layout-btn"
              className="h-9 px-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1"
              title="Switch stage layout"
            >
              <LayoutGrid className="w-4 h-4 text-teal-400" />
              <span className="hidden lg:inline">Layout</span>
            </button>

            {showLayoutMenu && (
              <div className="absolute bottom-12 right-0 z-50 w-64 max-w-[calc(100vw-16px)] max-h-[72dvh] overflow-y-auto p-2 rounded-2xl bg-[#0c182c] border border-slate-700 shadow-2xl space-y-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400">
                  Stage View (8 Layouts)
                </div>
                {STAGE_LAYOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
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
          <div className="relative">
            <button
              onClick={() => {
                setShowMoreMenu(!showMoreMenu);
                setShowLayoutMenu(false);
                setShowHostMenu(false);
              }}
              data-testid="toolbar-more-btn"
              className="h-9 px-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1"
              title="More options & diagnostics"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div className="absolute bottom-12 right-0 z-50 w-60 max-w-[calc(100vw-16px)] max-h-[72dvh] overflow-y-auto p-2 rounded-2xl bg-[#0c182c] border border-slate-700 shadow-2xl space-y-1 text-xs">
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
                    setActiveTab('resources');
                    setIsSidebarOpen(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>KEW Papers, DOIs &amp; Resources</span>
                </button>

                {permissions.canShareScreen && (
                  <button
                    onClick={() => {
                      setIsSlideDeckActive(!isSlideDeckActive);
                      if (!isSlideDeckActive) setStageLayout('presentation');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                  >
                    <Presentation className="w-3.5 h-3.5 text-teal-300" />
                    <span>{isSlideDeckActive ? 'Close Briefing Deck' : 'Present KEW Slide Deck'}</span>
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
            <div className="relative">
              <button
                onClick={() => {
                  setShowHostMenu(!showHostMenu);
                  setShowLayoutMenu(false);
                  setShowMoreMenu(false);
                }}
                data-testid="toolbar-host-controls-btn"
                className="h-9 px-2.5 sm:px-3 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden md:inline">Host</span>
              </button>

              {showHostMenu && (
                <div className="absolute bottom-12 right-0 z-50 w-72 max-w-[calc(100vw-16px)] max-h-[72dvh] overflow-y-auto p-3 rounded-2xl bg-[#0c182c] border border-amber-500/40 shadow-2xl space-y-2 text-xs">
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

      {/* REAL HARDWARE & WEBRTC DIAGNOSTICS MODAL */}
      <VirtualHallDiagnosticsModal
        open={showDiagnostics}
        onClose={() => setShowDiagnostics(false)}
        telemetry={telemetry}
        micPermissionStatus={micPermissionStatus}
        isMicOn={isMicOn}
        isVideoOn={isVideoOn}
        micAudioLevel={micAudioLevel}
        remoteAudioLevel={remoteAudioLevel}
        audioInputDevices={audioInputDevices}
        audioOutputDevices={audioOutputDevices}
        videoDevices={videoDevices}
        selectedMicId={selectedMicId}
        selectedSpeakerId={selectedSpeakerId}
        selectedCameraId={selectedCameraId}
        onSelectMic={(id) => {
          setSelectedMicId(id);
          if (isMicOn && audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((t) => t.stop());
            audioStreamRef.current = null;
            setIsMicOn(false);
          }
        }}
        onSelectSpeaker={(id) => {
          setSelectedSpeakerId(id);
          for (const el of remoteAudioElsRef.current.values()) {
            if ('setSinkId' in el) {
              (el as HTMLAudioElement & { setSinkId: (s: string) => Promise<void> })
                .setSinkId(id)
                .catch(() => {});
            }
          }
        }}
        onSelectCamera={(id) => {
          setSelectedCameraId(id);
          if (isVideoOn) startHardwareCamera(id);
        }}
        onTestMic={toggleMic}
        onTestCamera={toggleCamera}
        micError={micError}
        cameraError={cameraError}
      />

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
                  onChange={(e) => setDesiredName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Institution / Affiliation</label>
                <input
                  type="text"
                  required
                  value={desiredAffiliation}
                  onChange={(e) => setDesiredAffiliation(e.target.value)}
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
                  <option value="speaker">Confirmed Speaker</option>
                  <option value="moderator">Scientific Moderator</option>
                  <option value="technical_producer">Technical Producer</option>
                  <option value="host">Conference Host</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-slate-300">
                  Signed Room Token (Required for Host/Speaker in Live Mode)
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
