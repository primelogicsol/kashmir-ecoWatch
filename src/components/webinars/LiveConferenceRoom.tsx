'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertCircle,
  Award,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  HelpCircle,
  Layers,
  Lock,
  LogOut,
  Maximize2,
  MessageSquare,
  Mic,
  MicOff,
  Minimize2,
  MonitorOff,
  MonitorUp,
  Radio,
  RefreshCw,
  Send,
  Settings,
  ShieldAlert,
  Sliders,
  Sparkles,
  ThumbsUp,
  Unlock,
  Users,
  Video as VideoIcon,
  VideoOff,
  Volume2,
  VolumeX,
  Wrench
} from 'lucide-react';
import {
  WebinarSession,
  SAMPLE_QNA_ITEMS,
  SAMPLE_CHAT_MESSAGES,
  QnAItem,
  ChatMessage
} from '@/data/webinars';
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
    metricBLabel: 'Equilibrium Line Altitude (ELA) Shift (+118 m)',
    description: 'Satellite stereo-photogrammetry and synthetic aperture radar interferometry reveal accelerated ice downwasting across steep north-facing cirques in the Greater Himalayan range.'
  },
  {
    title: 'Slide 2 · Kolahoi Glacier Terminus Retreat & Radar Coherence Tracking',
    subtitle: 'Sentinel-1 TOPSAR Line-of-Sight Displacement Time Series',
    metricA: '21.4 m / year',
    metricALabel: 'Mean Snout Retreat Velocity',
    metricB: '3.12 km²',
    metricBLabel: 'Supraglacial Debris Expansion Since 1990',
    description: 'Aspect-dependent phase unwrapping confirms that heavily debris-covered tongues show heterogeneous ablation with supraglacial lake formation in karst depressions.'
  },
  {
    title: 'Slide 3 · Downstream Discharge & Springshed Vulnerability Matrix',
    subtitle: 'Lidder & Jhelum Hydrographic Sub-Basin Runoff Dynamics',
    metricA: '42.8%',
    metricALabel: 'Late-Summer Baseflow Dependent on Ice Melt',
    metricB: '68 Perennial Springs',
    metricBLabel: 'Springshed Aquifers in Critical Recharge Deficit',
    description: 'Coupled glacio-hydrological modeling indicates that peak water discharge will be reached between 2035 and 2045, after which sustained summer flow decreases substantially.'
  }
];

export function LiveConferenceRoom({ session }: LiveConferenceRoomProps) {
  // Independent Media Stream State
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSlideDeckMode, setIsSlideDeckMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Dedicated Audio & Video Stream State
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isVirtualCamera, setIsVirtualCamera] = useState(false);

  // Diagnostics & Telemetry
  const [micAudioLevel, setMicAudioLevel] = useState<number>(0);
  const [remoteAudioLevel, setRemoteAudioLevel] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [micPermissionStatus, setMicPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');
  const [showAudioDiagnostics, setShowAudioDiagnostics] = useState(false);
  const [isMicTestActive, setIsMicTestActive] = useState(false);

  // Device lists
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState<string>('');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('');
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  // WebRTC Peer Connection States
  const [peerConnectionState, setPeerConnectionState] = useState<string>('idle');
  const [isAudioPublished, setIsAudioPublished] = useState(false);
  const [isVideoPublished, setIsVideoPublished] = useState(false);
  const [hasRemoteAudioTrack, setHasRemoteAudioTrack] = useState(false);
  const [hasRemoteVideoTrack, setHasRemoteVideoTrack] = useState(false);
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
  const [remotePeerCount, setRemotePeerCount] = useState<number>(0);
  const [isAudioAutoplayBlocked, setIsAudioAutoplayBlocked] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(false);
  const [cameraState, setCameraState] = useState<'IDLE' | 'REQUESTING' | 'ACTIVE' | 'STOPPING' | 'ERROR'>('IDLE');
  const cameraStateRef = useRef<'IDLE' | 'REQUESTING' | 'ACTIVE' | 'STOPPING' | 'ERROR'>('IDLE');
  const [cameraDiagnostics, setCameraDiagnostics] = useState<{
    errorName?: string;
    errorMessage?: string;
    deviceId?: string;
    deviceLabel?: string;
    trackState?: string;
    trackSettings?: MediaTrackSettings;
    timestamp?: string;
  } | null>(null);

  // UI Panels
  const [activeTab, setActiveTab] = useState<'qna' | 'chat' | 'participants' | 'tracks'>('qna');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string>(session.tracks?.[0]?.id || 'main');
  const [spotlightSpeakerId, setSpotlightSpeakerId] = useState<string>('spk-1');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Data states
  const [qnaList, setQnaList] = useState<QnAItem[]>(SAMPLE_QNA_ITEMS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(SAMPLE_CHAT_MESSAGES);
  const [newQuestion, setNewQuestion] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');
  const [chatMode, setChatMode] = useState<'public' | 'speakers'>('public');
  const [dwellSeconds, setDwellSeconds] = useState(3240); // 54 mins
  const [isRoomLocked, setIsRoomLocked] = useState(false);

  // DOM & Media Refs
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const stageVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const virtualCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Web Audio API refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micAnimFrameRef = useRef<number | null>(null);
  const remoteAudioContextRef = useRef<AudioContext | null>(null);
  const remoteAnalyserRef = useRef<AnalyserNode | null>(null);
  const remoteAnimFrameRef = useRef<number | null>(null);

  // WebRTC Refs
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const signalingChannelRef = useRef<BroadcastChannel | null>(null);
  const localPeerIdRef = useRef<string>(`peer_${Math.random().toString(36).substring(2, 9)}`);
  const activeAudioSenderRef = useRef<RTCRtpSender | null>(null);
  const activeVideoSenderRef = useRef<RTCRtpSender | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const isAcquiringCameraRef = useRef<boolean>(false);

  // Dwell timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDwellSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Component Unmount Cleanup (Release camera & microphone tracks immediately)
  useEffect(() => {
    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getVideoTracks().forEach(t => {
          try { t.stop(); } catch {}
        });
        videoStreamRef.current = null;
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getAudioTracks().forEach(t => {
          try { t.stop(); } catch {}
        });
        audioStreamRef.current = null;
      }
    };
  }, []);

  // Global click unlock for browser Autoplay policy on remote WebRTC audio
  useEffect(() => {
    const handleGlobalClick = () => {
      if (remoteAudioRef.current && remoteAudioRef.current.paused && remoteAudioRef.current.srcObject) {
        remoteAudioRef.current.play()
          .then(() => setIsAudioAutoplayBlocked(false))
          .catch(() => {});
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? `${h}:` : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. Refresh device list & permissions
  const refreshDevices = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const mics = devices.filter(d => d.kind === 'audioinput');
      const speakers = devices.filter(d => d.kind === 'audiooutput');
      const cams = devices.filter(d => d.kind === 'videoinput');

      setAudioInputDevices(mics);
      setAudioOutputDevices(speakers);
      setVideoDevices(cams);

      if (mics.length > 0 && !selectedMicId) setSelectedMicId(mics[0].deviceId);
      if (speakers.length > 0 && !selectedSpeakerId) setSelectedSpeakerId(speakers[0].deviceId);

      // Smart camera selection: prefer real physical hardware webcams over phone/virtual camera drivers
      if (cams.length > 0) {
        const preferredHardwareCam = cams.find(c => {
          const l = c.label.toLowerCase();
          return (l.includes('c950') || l.includes('emeet')) && !l.includes('virtual');
        }) || cams.find(c => {
          const l = c.label.toLowerCase();
          return !l.includes('virtual') && !l.includes('phone') && !l.includes('quest') && !l.includes('oculus');
        });

        if (preferredHardwareCam && (!selectedCameraId || cams.find(c => c.deviceId === selectedCameraId)?.label.toLowerCase().includes('virtual'))) {
          setSelectedCameraId(preferredHardwareCam.deviceId);
        } else if (!selectedCameraId) {
          setSelectedCameraId(cams[0].deviceId);
        }
      }

      // Check permission query if supported
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const micPerm = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          setMicPermissionStatus(micPerm.state);
          micPerm.onchange = () => setMicPermissionStatus(micPerm.state);
        } catch {
          // Permissions query for mic not supported in all browsers
        }
      }
    } catch (err) {
      console.warn('Error enumerating media devices:', err);
    }
  }, [selectedMicId, selectedSpeakerId, selectedCameraId]);

  useEffect(() => {
    refreshDevices();
    if (navigator.mediaDevices) {
      navigator.mediaDevices.ondevicechange = refreshDevices;
    }
  }, [refreshDevices]);

  // 2. Setup Web Audio API RMS Input Meter
  const setupAudioMeter = useCallback((stream: MediaStream) => {
    try {
      // Clean up previous context if open
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (micAnimFrameRef.current) {
        cancelAnimationFrame(micAnimFrameRef.current);
      }

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const track = stream.getAudioTracks()[0];

      const updateMeter = () => {
        if (!analyserRef.current || !track || !track.enabled || track.readyState !== 'live') {
          setMicAudioLevel(0);
          return;
        }
        analyserRef.current.getByteFrequencyData(dataArray);

        // Compute RMS volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        // Normalize between 0% and 100%
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setMicAudioLevel(normalized);

        micAnimFrameRef.current = requestAnimationFrame(updateMeter);
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(() => updateMeter());
      } else {
        updateMeter();
      }
    } catch (err) {
      console.warn('Web Audio meter setup failed:', err);
    }
  }, []);

  // 3. Setup Remote Audio Web Audio Meter
  const setupRemoteAudioMeter = useCallback((remoteStream: MediaStream) => {
    try {
      if (remoteAudioContextRef.current && remoteAudioContextRef.current.state !== 'closed') {
        remoteAudioContextRef.current.close().catch(() => {});
      }
      if (remoteAnimFrameRef.current) {
        cancelAnimationFrame(remoteAnimFrameRef.current);
      }

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      remoteAudioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;
      remoteAnalyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(remoteStream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const rTrack = remoteStream.getAudioTracks()[0];

      const updateRemoteMeter = () => {
        if (!remoteAnalyserRef.current || !rTrack || !rTrack.enabled || rTrack.readyState !== 'live') {
          setRemoteAudioLevel(0);
          return;
        }
        remoteAnalyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setRemoteAudioLevel(normalized);
        remoteAnimFrameRef.current = requestAnimationFrame(updateRemoteMeter);
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(() => updateRemoteMeter());
      } else {
        updateRemoteMeter();
      }
    } catch (err) {
      console.warn('Remote audio meter setup error:', err);
    }
  }, []);

  // 4. WebRTC Peer Connection & BroadcastChannel Signaling
  useEffect(() => {
    if (typeof window === 'undefined' || typeof RTCPeerConnection === 'undefined') return;

    const roomId = session.id;
    const channelName = `kew_webrtc_signaling_${roomId}`;
    const channel = new BroadcastChannel(channelName);
    signalingChannelRef.current = channel;

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' }
      ]
    });
    peerConnectionRef.current = pc;

    pc.onconnectionstatechange = () => {
      setPeerConnectionState(pc.connectionState);
    };

    // When remote track is received
    pc.ontrack = (event) => {
      if (event.track.kind === 'audio') {
        console.log('[KEW Audio WebRTC] Remote audio track received:', event.track.id, event.track.label);
        setHasRemoteAudioTrack(true);
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
          remoteAudioRef.current.play()
            .then(() => setIsAudioAutoplayBlocked(false))
            .catch(e => {
              console.log('Autoplay unlock required by browser:', e);
              setIsAudioAutoplayBlocked(true);
            });
        }
        setupRemoteAudioMeter(event.streams[0]);
      } else if (event.track.kind === 'video') {
        setHasRemoteVideoTrack(true);
        setRemoteVideoStream(event.streams[0]);
      }
    };

    // When local ICE candidates are gathered
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const candObj = event.candidate.toJSON ? event.candidate.toJSON() : {
          candidate: event.candidate.candidate,
          sdpMid: event.candidate.sdpMid,
          sdpMLineIndex: event.candidate.sdpMLineIndex
        };
        channel.postMessage({
          type: 'candidate',
          sender: localPeerIdRef.current,
          candidate: candObj
        });
      }
    };

    // Listen to signaling messages from peer tabs/windows
    channel.onmessage = async (event) => {
      const data = event.data;
      if (!data || data.sender === localPeerIdRef.current) return;

      if (data.type === 'peer_joined') {
        setRemotePeerCount(prev => prev + 1);
        // If we have an active audio or video track, send an offer to the newcomer
        const hasAudio = audioStreamRef.current && audioStreamRef.current.getAudioTracks().length > 0;
        const hasVideo = videoStreamRef.current && videoStreamRef.current.getVideoTracks().length > 0;
        if (hasAudio || hasVideo) {
          try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            channel.postMessage({
              type: 'offer',
              sender: localPeerIdRef.current,
              offer: { type: offer.type, sdp: offer.sdp }
            });
          } catch (e) {
            console.warn('Error creating WebRTC offer:', e);
          }
        }
      } else if (data.type === 'offer' && data.offer) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          channel.postMessage({
            type: 'answer',
            sender: localPeerIdRef.current,
            answer: { type: answer.type, sdp: answer.sdp }
          });
          setRemotePeerCount(prev => Math.max(1, prev));
        } catch (e) {
          console.warn('Error handling WebRTC offer:', e);
        }
      } else if (data.type === 'answer' && data.answer) {
        try {
          if (pc.signalingState !== 'stable') {
            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            setRemotePeerCount(prev => Math.max(1, prev));
          }
        } catch (e) {
          console.warn('Error setting remote description from answer:', e);
        }
      } else if (data.type === 'candidate' && data.candidate) {
        try {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
        } catch (e) {
          console.warn('Error adding ICE candidate:', e);
        }
      } else if (data.type === 'peer_left') {
        setRemotePeerCount(prev => Math.max(0, prev - 1));
      }
    };

    // Announce entry into room
    channel.postMessage({
      type: 'peer_joined',
      sender: localPeerIdRef.current
    });

    return () => {
      channel.postMessage({
        type: 'peer_left',
        sender: localPeerIdRef.current
      });
      channel.close();
      pc.close();
    };
  }, [session.id, setupRemoteAudioMeter]);

  // 5. Publish Audio Track to WebRTC
  const publishAudioTrack = useCallback((track: MediaStreamTrack, stream: MediaStream) => {
    const pc = peerConnectionRef.current;
    if (!pc) return;

    try {
      const senders = pc.getSenders();
      const existingAudioSender = senders.find(s => s.track?.kind === 'audio');

      if (existingAudioSender) {
        existingAudioSender.replaceTrack(track);
        activeAudioSenderRef.current = existingAudioSender;
      } else {
        const sender = pc.addTrack(track, stream);
        activeAudioSenderRef.current = sender;
      }

      setIsAudioPublished(true);

      // Renegotiate with peers
      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
          if (pc.localDescription) {
            signalingChannelRef.current?.postMessage({
              type: 'offer',
              sender: localPeerIdRef.current,
              offer: { type: pc.localDescription.type, sdp: pc.localDescription.sdp }
            });
          }
        })
        .catch(err => console.warn('Offer negotiation error on publish:', err));
    } catch (err) {
      console.warn('Failed to publish audio track to WebRTC:', err);
    }
  }, []);

  // 5b. Stop & Dispose Current Video Tracks Cleanly with Driver Cooldown
  const stopCurrentVideoTracks = useCallback(async () => {
    if (cameraStateRef.current === 'STOPPING') return;
    cameraStateRef.current = 'STOPPING';
    setCameraState('STOPPING');

    if (videoStreamRef.current) {
      videoStreamRef.current.getVideoTracks().forEach(t => {
        try {
          t.stop();
          console.log('[KEW Video] Track stopped:', t.label, t.readyState);
        } catch (e) {
          console.warn('[KEW Video] Error stopping track:', e);
        }
      });
      videoStreamRef.current = null;
    }
    setVideoStream(null);
    setIsVideoOn(false);

    // Strict 250ms cooldown for Windows Media Foundation device handle release
    await new Promise(r => setTimeout(r, 250));
    cameraStateRef.current = 'IDLE';
    setCameraState('IDLE');
  }, []);

  // 5c. Publish Video Track to WebRTC
  const publishVideoTrack = useCallback((track: MediaStreamTrack, stream: MediaStream) => {
    const pc = peerConnectionRef.current;
    if (!pc) return;

    try {
      const senders = pc.getSenders();
      const existingVideoSender = senders.find(s => s.track?.kind === 'video');

      if (existingVideoSender) {
        existingVideoSender.replaceTrack(track);
        activeVideoSenderRef.current = existingVideoSender;
      } else {
        const sender = pc.addTrack(track, stream);
        activeVideoSenderRef.current = sender;
      }

      setIsVideoPublished(true);

      // Renegotiate with peers
      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
          if (pc.localDescription) {
            signalingChannelRef.current?.postMessage({
              type: 'offer',
              sender: localPeerIdRef.current,
              offer: { type: pc.localDescription.type, sdp: pc.localDescription.sdp }
            });
          }
        })
        .catch(err => console.warn('Offer negotiation error on video publish:', err));
    } catch (err) {
      console.warn('Failed to publish video track to WebRTC:', err);
    }
  }, []);

  // 5d. Unpublish Video Track from WebRTC
  const unpublishVideoTrack = useCallback(() => {
    const pc = peerConnectionRef.current;
    if (!pc) return;

    try {
      if (activeVideoSenderRef.current) {
        pc.removeTrack(activeVideoSenderRef.current);
        activeVideoSenderRef.current = null;
      }
      setIsVideoPublished(false);

      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
          if (pc.localDescription) {
            signalingChannelRef.current?.postMessage({
              type: 'offer',
              sender: localPeerIdRef.current,
              offer: { type: pc.localDescription.type, sdp: pc.localDescription.sdp }
            });
          }
        })
        .catch(err => console.warn('Offer negotiation error on video unpublish:', err));
    } catch (err) {
      console.warn('Failed to unpublish video track from WebRTC:', err);
    }
  }, []);

  // 6. Start Real Microphone
  const startMicrophone = async (deviceId?: string) => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('navigator.mediaDevices.getUserMedia is not supported by your browser.');
      }

      // Explicit audio constraint
      const audioConstraints: MediaTrackConstraints = deviceId
        ? { deviceId: { exact: deviceId } }
        : { echoCancellation: true, noiseSuppression: true, autoGainControl: true };

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: false
      });

      const track = stream.getAudioTracks()[0];
      if (!track) {
        throw new Error('No audio track returned from microphone capture.');
      }

      track.enabled = true;

      // Handle external unplugging or track ending
      track.onended = () => {
        setIsMicOn(false);
        setIsAudioPublished(false);
        setMicAudioLevel(0);
        setMicError('Microphone disconnected or stopped by system.');
      };

      audioStreamRef.current = stream;
      setAudioStream(stream);
      setIsMicOn(true);
      setMicPermissionStatus('granted');
      setupAudioMeter(stream);
      publishAudioTrack(track, stream);
      refreshDevices();
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Real microphone capture error:', error);
      setIsMicOn(false);
      setIsAudioPublished(false);
      setMicAudioLevel(0);

      let msg = 'Unable to access microphone.';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        msg = 'Microphone permission blocked. Click the lock/site controls icon beside localhost:3000 in your address bar, set Microphone to Allow, and retry.';
        setMicPermissionStatus('denied');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        msg = 'No microphone device found. Please connect a headset or integrated microphone.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        msg = 'Microphone is currently in use by another application (Zoom, Teams, Skype) or blocked by Windows privacy settings.';
      } else if (error.name === 'OverconstrainedError') {
        msg = 'The selected microphone could not satisfy audio constraints. Trying default microphone...';
        // Retry with simple constraint
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const fbTrack = fallbackStream.getAudioTracks()[0];
          fbTrack.enabled = true;
          audioStreamRef.current = fallbackStream;
          setAudioStream(fallbackStream);
          setIsMicOn(true);
          setupAudioMeter(fallbackStream);
          publishAudioTrack(fbTrack, fallbackStream);
          return;
        } catch {
          // If fallback fails too, keep error
        }
      } else if (error.message) {
        msg = `Microphone error: ${error.message}`;
      }
      setMicError(msg);
    }
  };

  // 7. Toggle Microphone (Unmute / Mute)
  const toggleMic = async () => {
    if (isMicOn) {
      // Mute: disable audio track without destroying stream
      if (audioStreamRef.current) {
        audioStreamRef.current.getAudioTracks().forEach(track => {
          track.enabled = false;
        });
      }
      setIsMicOn(false);
      setIsAudioPublished(false);
      setMicAudioLevel(0);
    } else {
      // Unmute: if track exists and is live, re-enable it immediately
      const existingTrack = audioStreamRef.current?.getAudioTracks()[0];
      if (existingTrack && existingTrack.readyState === 'live') {
        existingTrack.enabled = true;
        setIsMicOn(true);
        setIsAudioPublished(true);
        if (audioStreamRef.current) {
          setupAudioMeter(audioStreamRef.current);
          publishAudioTrack(existingTrack, audioStreamRef.current);
        }
      } else {
        // Request fresh microphone stream
        await startMicrophone(selectedMicId);
      }
    }
  };

  // 8. Start Real Hardware Camera (Thread-safe, Non-overlapping, Multi-device fallback)
  const startHardwareCamera = async (targetDeviceId?: string) => {
    // 1. Guard against concurrent acquisition or stopping
    if (cameraStateRef.current === 'REQUESTING' || cameraStateRef.current === 'STOPPING') {
      console.warn('[KEW Camera] Acquisition or stop already in progress (state=' + cameraStateRef.current + '); preventing concurrent request');
      return;
    }
    const reqId = Math.random().toString(36).substring(2, 7);
    const startTime = performance.now();
    cameraStateRef.current = 'REQUESTING';
    setCameraState('REQUESTING');
    setIsCameraLoading(true);
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam capture (navigator.mediaDevices.getUserMedia) is not supported by your browser.');
      }

      // 2. Stop any existing video tracks cleanly to free hardware device
      if (videoStreamRef.current) {
        await stopCurrentVideoTracks();
        cameraStateRef.current = 'REQUESTING';
        setCameraState('REQUESTING');
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Enumerate current devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(d => d.kind === 'videoinput');

      // Identify preferred physical camera (EMEET SmartCam C950, excluding virtual devices)
      const emeetPhysical = videoInputs.find(d => 
        (d.label.toLowerCase().includes('c950') || d.label.toLowerCase().includes('emeet')) && 
        !d.label.toLowerCase().includes('virtual')
      );
      const otherPhysical = videoInputs.find(d => 
        !d.label.toLowerCase().includes('virtual') && 
        !d.label.toLowerCase().includes('phone') && 
        !d.label.toLowerCase().includes('quest') && 
        !d.label.toLowerCase().includes('oculus')
      );
      const bestPhysicalCam = emeetPhysical || otherPhysical;

      let deviceToUse = targetDeviceId;
      if (!deviceToUse) {
        if (bestPhysicalCam) {
          deviceToUse = bestPhysicalCam.deviceId;
        } else if (selectedCameraId) {
          deviceToUse = selectedCameraId;
        }
      }

      let stream: MediaStream | null = null;
      let acquiredTrack: MediaStreamTrack | null = null;
      let activeDevId = deviceToUse;

      // Attempt A: Preferred or selected device
      if (deviceToUse) {
        try {
          console.log(`[KEW Camera Req #${reqId}] Requesting exact deviceId:`, deviceToUse);
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: deviceToUse },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false // STRICT: Audio must never be touched
          });
          acquiredTrack = stream.getVideoTracks()[0];
        } catch (exactErr: unknown) {
          console.warn(`[KEW Camera Req #${reqId}] Exact device request failed, trying ideal:`, exactErr);
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: {
                deviceId: { ideal: deviceToUse },
                width: { ideal: 1280 },
                height: { ideal: 720 }
              },
              audio: false
            });
            acquiredTrack = stream.getVideoTracks()[0];
          } catch (idealErr: unknown) {
            console.warn(`[KEW Camera Req #${reqId}] Ideal device request failed:`, idealErr);
          }
        }
      }

      // Attempt B: If specific device failed or was unavailable, try other enumerated physical cameras (excluding virtual/phone/quest)
      if (!stream || !acquiredTrack) {
        const altPhysical = videoInputs.find(d => 
          d.deviceId !== deviceToUse && 
          !d.label.toLowerCase().includes('virtual') && 
          !d.label.toLowerCase().includes('phone') &&
          !d.label.toLowerCase().includes('quest') &&
          !d.label.toLowerCase().includes('oculus')
        );
        if (altPhysical) {
          try {
            console.log(`[KEW Camera Req #${reqId}] Trying alternative physical camera:`, altPhysical.label);
            stream = await navigator.mediaDevices.getUserMedia({
              video: {
                deviceId: { exact: altPhysical.deviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 }
              },
              audio: false
            });
            acquiredTrack = stream.getVideoTracks()[0];
            activeDevId = altPhysical.deviceId;
          } catch (altErr) {
            console.warn(`[KEW Camera Req #${reqId}] Alternative physical camera failed:`, altErr);
          }
        }
      }

      // Attempt C: Generic video constraint (fallback)
      if (!stream || !acquiredTrack) {
        console.log(`[KEW Camera Req #${reqId}] Requesting generic video constraint`);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        acquiredTrack = stream.getVideoTracks()[0];
      }

      if (!stream || !acquiredTrack || acquiredTrack.readyState !== 'live') {
        throw new Error('Webcam initialized but no active video track was produced.');
      }

      // Check if Windows assigned an inactive Virtual / Phone camera while a real physical webcam exists
      const currentTrackLabel = (acquiredTrack.label || '').toLowerCase();
      const isVirtualSource = currentTrackLabel.includes('virtual') || currentTrackLabel.includes('phone') || currentTrackLabel.includes('quest');
      
      const refreshedDevices = await navigator.mediaDevices.enumerateDevices();
      const realHardwareCam = refreshedDevices.find(d => 
        d.kind === 'videoinput' && 
        (d.label.toLowerCase().includes('c950') || d.label.toLowerCase().includes('emeet')) && 
        !d.label.toLowerCase().includes('virtual')
      ) || refreshedDevices.find(d => 
        d.kind === 'videoinput' && 
        !d.label.toLowerCase().includes('virtual') && 
        !d.label.toLowerCase().includes('phone') && 
        !d.label.toLowerCase().includes('quest') && 
        !d.label.toLowerCase().includes('oculus')
      );

      // If Windows assigned a virtual camera, auto-switch to real physical webcam immediately
      if (isVirtualSource && realHardwareCam && !targetDeviceId) {
        console.log(`[KEW Camera Req #${reqId}] Auto-switching from virtual camera (${acquiredTrack.label}) to real physical webcam (${realHardwareCam.label})`);
        try {
          stream.getTracks().forEach(t => t.stop());
          await new Promise(r => setTimeout(r, 250)); // Windows driver cooldown
          const hwStream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: realHardwareCam.deviceId },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });
          const hwTrack = hwStream.getVideoTracks()[0];
          if (hwTrack && hwTrack.readyState === 'live') {
            stream = hwStream;
            acquiredTrack = hwTrack;
            activeDevId = realHardwareCam.deviceId;
          }
        } catch (switchErr) {
          console.warn(`[KEW Camera Req #${reqId}] Auto-switch to physical camera failed:`, switchErr);
        }
      } else {
        activeDevId = acquiredTrack.getSettings()?.deviceId || activeDevId;
      }

      const elapsed = Math.round(performance.now() - startTime);
      console.log(`[KEW Camera Req #${reqId}] Live video track established successfully in ${elapsed}ms:`, {
        label: acquiredTrack.label,
        state: acquiredTrack.readyState,
        settings: acquiredTrack.getSettings()
      });

      // 3. Set authoritative stream
      videoStreamRef.current = stream;
      setVideoStream(stream);
      setIsVideoOn(true);
      setIsVirtualCamera(false);
      setCameraError(null);
      setSpotlightSpeakerId('you');
      if (activeDevId) {
        setSelectedCameraId(activeDevId);
      }

      cameraStateRef.current = 'ACTIVE';
      setCameraState('ACTIVE');

      // 4. Record Diagnostics
      setCameraDiagnostics({
        deviceId: activeDevId,
        deviceLabel: acquiredTrack.label,
        trackState: acquiredTrack.readyState,
        trackSettings: acquiredTrack.getSettings(),
        timestamp: new Date().toLocaleTimeString()
      });

      // 5. Publish to WebRTC Peer Connection
      publishVideoTrack(acquiredTrack, stream);

      // Handle unexpected track end
      acquiredTrack.onended = () => {
        console.warn(`[KEW Camera Req #${reqId}] Video track ended by hardware/OS`);
        stopCurrentVideoTracks();
        unpublishVideoTrack();
        setCameraError('Webcam disconnected or stream stopped by system.');
      };

      refreshDevices();
    } catch (err: unknown) {
      const error = err as Error;
      const elapsed = Math.round(performance.now() - startTime);
      console.error(`[KEW Camera Req #${reqId}] Detailed error report after ${elapsed}ms:`, {
        name: error.name,
        message: error.message,
        requestedDeviceId: targetDeviceId
      });

      cameraStateRef.current = 'ERROR';
      setCameraState('ERROR');

      setCameraDiagnostics({
        errorName: error.name,
        errorMessage: error.message,
        deviceId: targetDeviceId || selectedCameraId,
        timestamp: new Date().toLocaleTimeString()
      });

      let message = 'Unable to access your webcam.';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        message = 'Camera permission blocked. Click the lock/site controls icon beside localhost:3000 in your browser, set Camera to Allow, and retry.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        message = 'No webcam hardware detected on this device. Please plug in a USB camera or integrated webcam.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        const camLabel = videoDevices.find(d => d.deviceId === (targetDeviceId || selectedCameraId))?.label || 'Selected camera';
        message = `Camera "${camLabel}" is currently not readable. This occurs if Windows is still releasing the camera handle, another app is holding the device, or the phone/virtual camera is not active. Select an alternative camera below or click Retry.`;
      } else if (error.name === 'OverconstrainedError') {
        message = 'The requested camera resolution or format is not supported. Please select an alternative camera.';
      } else if (error.message) {
        message = `Camera error (${error.name}): ${error.message}`;
      }
      setCameraError(message);
    } finally {
      setIsCameraLoading(false);
    }
  };

  // Toggle Camera
  const toggleCamera = async () => {
    if (isVideoOn) {
      await stopCurrentVideoTracks();
      unpublishVideoTrack();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsVirtualCamera(false);
      setCameraError(null);
      if (spotlightSpeakerId === 'you') {
        setSpotlightSpeakerId('spk-1');
      }
    } else {
      await startHardwareCamera();
    }
  };

  // Virtual Avatar Fallback (Guaranteed to render live animated stream)
  const startVirtualAvatar = useCallback(() => {
    stopCurrentVideoTracks();
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      // Dark slate background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 640, 480);

      // Radial teal halo
      const grad = ctx.createRadialGradient(320, 240, 40, 320, 240, 220);
      grad.addColorStop(0, '#0d9488');
      grad.addColorStop(0.6, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Avatar circle
      ctx.beginPath();
      ctx.arc(320, 200, 75, 0, Math.PI * 2);
      ctx.fillStyle = '#14b8a6';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#2dd4bf';
      ctx.stroke();

      // Delegate text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Virtual Delegate Avatar', 320, 320);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '13px monospace';
      ctx.fillText(`Frame ${frame} · WebRTC Active`, 320, 350);

      animationFrameRef.current = requestAnimationFrame(render);
    };
    render();

    const vStream = canvas.captureStream(30);
    videoStreamRef.current = vStream;
    setVideoStream(vStream);
    setIsVideoOn(true);
    setIsVirtualCamera(true);
    setCameraError(null);
    setSpotlightSpeakerId('you');
    publishVideoTrack(vStream.getVideoTracks()[0], vStream);
  }, [stopCurrentVideoTracks, publishVideoTrack]);

  // 9. Callback refs for Video Elements
  const attachLocalVideo = useCallback((el: HTMLVideoElement | null) => {
    localVideoRef.current = el;
    if (el && videoStream) {
      el.srcObject = videoStream;
      el.play().catch(e => console.log('Thumbnail video play error:', e));
    }
  }, [videoStream]);

  const attachStageVideo = useCallback((el: HTMLVideoElement | null) => {
    stageVideoRef.current = el;
    if (el && videoStream) {
      el.srcObject = videoStream;
      el.play().catch(e => console.log('Stage video play error:', e));
    }
  }, [videoStream]);

  const attachScreenVideo = useCallback((el: HTMLVideoElement | null) => {
    screenVideoRef.current = el;
    if (el && screenStream) {
      el.srcObject = screenStream;
      el.play().catch(e => console.log('Screen video play error:', e));
    }
  }, [screenStream]);

  // Screen Share
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach(t => t.stop());
        setScreenStream(null);
      }
      setIsScreenSharing(false);
      setIsSlideDeckMode(false);
    } else {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
          const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
          });
          setScreenStream(stream);
          setIsScreenSharing(true);
          setIsSlideDeckMode(false);
          stream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false);
            setScreenStream(null);
          };
        } else {
          throw new Error('Screen sharing not supported');
        }
      } catch {
        setIsScreenSharing(true);
        setIsSlideDeckMode(true);
      }
    }
  };

  // Switch Audio Output (Speaker)
  const handleSpeakerChange = async (deviceId: string) => {
    setSelectedSpeakerId(deviceId);
    if (remoteAudioRef.current && 'setSinkId' in remoteAudioRef.current) {
      try {
        await (remoteAudioRef.current as unknown as { setSinkId: (id: string) => Promise<void> }).setSinkId(deviceId);
      } catch (err) {
        console.warn('Failed to switch audio output device:', err);
      }
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Q&A
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const q: QnAItem = {
      id: `qna-${Date.now()}`,
      author: 'You (Delegate)',
      affiliation: 'Verified Scientist',
      question: newQuestion,
      upvotes: 1,
      isAnswered: false,
      timestamp: 'Just now'
    };
    setQnaList([q, ...qnaList]);
    setNewQuestion('');
  };

  const handleUpvote = (id: string) => {
    setQnaList(prev => prev.map(q => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  // Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    const msg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'You',
      role: 'Delegate',
      message: newChatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSpeakerOnly: chatMode === 'speakers'
    };
    setChatMessages([...chatMessages, msg]);
    setNewChatMessage('');
  };

  const activeTrack = session.tracks?.find(t => t.id === activeTrackId);

  // Spotlight Speaker Details
  const getSpotlightDetails = () => {
    if (spotlightSpeakerId === 'you') {
      return {
        name: 'You (Delegate)',
        title: isVirtualCamera ? 'Virtual Camera' : 'Live Webcam • Mirrored View',
        institution: 'Kashmir EcoWatch Research Network',
        avatar: '/images/bear.png',
        isYou: true
      };
    }
    if (spotlightSpeakerId === 'spk-2' && session.speakers[1]) {
      return {
        name: session.speakers[1].name,
        title: session.speakers[1].title,
        institution: session.speakers[1].institution,
        avatar: session.speakers[1].avatar,
        isYou: false
      };
    }
    if (spotlightSpeakerId === 'spk-3' && session.speakers[2]) {
      return {
        name: session.speakers[2].name,
        title: session.speakers[2].title,
        institution: session.speakers[2].institution,
        avatar: session.speakers[2].avatar,
        isYou: false
      };
    }
    if (spotlightSpeakerId === 'moderator') {
      return {
        name: 'Symposium Scientific Secretariat Chair',
        title: 'Moderator & Session Convener',
        institution: 'Kashmir EcoWatch Secretariat',
        avatar: '/images/markhor.png',
        isYou: false
      };
    }
    return {
      name: session.speakers[0]?.name || 'Keynote Faculty',
      title: session.speakers[0]?.title || 'Earth Sciences Specialist',
      institution: session.speakers[0]?.institution || 'University of Kashmir',
      avatar: session.speakers[0]?.avatar || '/images/bear.png',
      isYou: false
    };
  };

  const spotlight = getSpotlightDetails();
  const currentAudioTrack = audioStream?.getAudioTracks()[0];

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none',
        isFullscreen ? 'fixed inset-0 z-[100] h-screen w-screen' : 'h-full w-full flex-1'
      )}
    >
      {/* Hidden Audio Element for Remote WebRTC Playback */}
      <audio ref={remoteAudioRef} autoPlay playsInline />

      {/* Autoplay Policy Audio Unlock Notification Banner */}
      {isAudioAutoplayBlocked && (
        <div 
          onClick={() => {
            if (remoteAudioRef.current) {
              remoteAudioRef.current.play().then(() => setIsAudioAutoplayBlocked(false)).catch(() => {});
            }
          }}
          className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-between cursor-pointer transition shadow-lg shrink-0 z-40 select-none animate-pulse"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-950" />
            <span>Incoming peer audio is paused by your browser. Click anywhere on this banner to enable live audio.</span>
          </div>
          <span className="bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider font-extrabold shadow-sm">
            Enable Audio
          </span>
        </div>
      )}

      {/* Top Bar: Conference Header & Status - Responsive & Non-truncating */}
      <header className="w-full min-h-[52px] h-auto flex flex-col md:flex-row md:items-center justify-between gap-y-2.5 gap-x-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900/95 border-b border-white/10 shrink-0 z-30 transition-all">
        {/* Left: Exit Hall, LIVE Badge, & Complete Multi-line Conference Title */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          <Link
            href="/webinars"
            className="text-slate-400 hover:text-white transition-colors shrink-0 inline-flex items-center pt-0.5 sm:pt-0"
          >
            <span className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1">
              &larr; Exit Hall
            </span>
          </Link>
          <span className="text-slate-700 shrink-0 select-none">|</span>
          <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1 flex-wrap">
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 mt-0.5 sm:mt-0 shadow-sm shadow-amber-500/10 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              DEMO / TEST ENVIRONMENT
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30 mt-0.5 sm:mt-0 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              SIMULATED STAGE
            </span>
            <h1 className="text-xs sm:text-sm lg:text-base font-bold text-white leading-snug break-words flex-1 min-w-0">
              {session.title}
            </h1>
          </div>
        </div>

        {/* Right / Secondary Row on Mobile: Room Telemetry Badges & Fullscreen Control */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0 flex-wrap justify-between md:justify-end border-t border-white/5 md:border-t-0 pt-2 md:pt-0">
          {/* Active Track Badge */}
          {activeTrack && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-medium font-mono shrink-0"
              title={activeTrack.name}
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>{activeTrack.roomCode}</span>
            </span>
          )}

          {/* WebRTC Live Peer Indicator */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-white/10 shrink-0">
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                remotePeerCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              )}
            />
            <span>Simulated Peers: {remotePeerCount}</span>
          </span>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="flex items-center gap-1.5 text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-mono shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>TEST REC (SIMULATED) {formatTime(dwellSeconds)}</span>
            </div>
          )}

          {/* Certificate Progress */}
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] shrink-0">
            <Award className="w-3.5 h-3.5" />
            <span>Attendance: 82%</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="p-1.5 h-7 border-white/10 text-slate-300 hover:bg-white/5 shrink-0"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </header>

      {/* Demo / Sandbox Environment Notice Banner */}
      <div className="bg-amber-950/60 border-b border-amber-500/30 px-4 py-2 text-[11px] text-amber-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 font-mono font-bold text-amber-300 text-[10px] uppercase shrink-0">
            DEMO / TEST ENVIRONMENT
          </span>
          <span className="leading-snug break-words text-slate-300">
            You are exploring the Kashmir EcoWatch Virtual Hall pre-flight sandbox. Video feeds, participant questions, and chat streams are simulated demonstration data for WebRTC hardware testing. No live symposium is currently broadcasting.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] text-amber-400/80 font-mono hidden md:inline">Hardware Diagnostics Ready</span>
          <Link
            href="/webinars/conferences"
            className="text-[11px] font-bold text-teal-400 hover:text-teal-300 underline font-mono flex items-center gap-1"
          >
            <span>Conferences Directory &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Microphone Error Banner */}
      {micError && (
        <div className="bg-rose-950/90 border-b border-rose-500/50 px-4 py-2.5 text-xs text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 z-30 shadow-lg">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-white mr-1.5">Microphone Notice:</span>
              <span>{micError}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <Button
              size="sm"
              onClick={() => startMicrophone(selectedMicId)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 text-xs shadow-sm"
            >
              <Mic className="w-3.5 h-3.5 mr-1" />
              Allow &amp; Retry Mic
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAudioDiagnostics(true)}
              className="border-white/20 text-slate-200 hover:bg-white/10 text-xs px-2.5 py-1"
            >
              <Wrench className="w-3.5 h-3.5 mr-1 text-teal-400" />
              Open Audio Diagnostics
            </Button>
            <button
              onClick={() => setMicError(null)}
              className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Camera Error Banner with Device Selector & Hardware Diagnostics */}
      {cameraError && (
        <div className="bg-rose-950/95 border-b border-rose-500/60 px-4 py-3 text-xs text-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 z-30 shadow-xl">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white text-xs sm:text-sm mb-1 flex items-center gap-2">
                <span>Webcam Capture Notice</span>
                {cameraDiagnostics?.errorName && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-900 border border-rose-700/60 text-rose-300">
                    {cameraDiagnostics.errorName}
                  </span>
                )}
              </div>
              <p className="text-rose-200 text-xs leading-relaxed break-words">
                {cameraError}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap self-end md:self-auto">
            {/* Camera Device Switcher Dropdown */}
            {videoDevices.length > 0 && (
              <div className="flex items-center gap-1.5 bg-black/50 border border-white/15 rounded-lg px-2 py-1 shadow-inner">
                <Camera className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <select
                  value={selectedCameraId}
                  onChange={(e) => {
                    const newId = e.target.value;
                    setSelectedCameraId(newId);
                    startHardwareCamera(newId);
                  }}
                  className="bg-transparent text-white text-xs border-none outline-none cursor-pointer max-w-[180px] sm:max-w-[220px] font-mono truncate"
                  title="Switch to another camera device"
                >
                  {videoDevices.map(d => (
                    <option key={d.deviceId} value={d.deviceId} className="bg-slate-900 text-white">
                      {d.label || `Camera (${d.deviceId.substring(0, 8)}...)`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Button
              size="sm"
              disabled={isCameraLoading}
              onClick={() => startHardwareCamera(selectedCameraId)}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold px-3 py-1 shadow-sm"
            >
              {isCameraLoading ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  Retry Camera
                </span>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                startVirtualAvatar();
                setCameraError(null);
              }}
              className="border-white/20 text-slate-300 hover:bg-white/10 text-xs px-2.5 py-1"
            >
              Virtual Avatar
            </Button>

            <button
              onClick={() => setCameraError(null)}
              className="text-rose-400 hover:text-white p-1 text-sm transition-colors"
              title="Dismiss Notice"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Video Conference Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Video Grid & Stage */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 gap-3 overflow-y-auto">
          {/* Spotlight Stage / Main Presenter or Screen Share */}
          <div className="relative flex-1 min-h-[320px] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
            {isScreenSharing ? (
              isSlideDeckMode ? (
                /* Interactive Scientific Slide Deck */
                <div className="w-full h-full bg-slate-950 flex flex-col justify-between p-6 sm:p-8 relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                        SCREEN SHARE ACTIVE • SLIDE DECK
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Slide {currentSlideIndex + 1} of {SCIENTIFIC_SLIDES.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentSlideIndex === 0}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4 inline" /> Prev
                      </button>
                      <button
                        onClick={() => setCurrentSlideIndex(prev => Math.min(SCIENTIFIC_SLIDES.length - 1, prev + 1))}
                        disabled={currentSlideIndex === SCIENTIFIC_SLIDES.length - 1}
                        className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white disabled:opacity-40"
                      >
                        Next <ChevronRight className="w-4 h-4 inline" />
                      </button>
                    </div>
                  </div>

                  <div className="my-auto max-w-3xl space-y-4">
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                      {SCIENTIFIC_SLIDES[currentSlideIndex].subtitle}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {SCIENTIFIC_SLIDES[currentSlideIndex].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {SCIENTIFIC_SLIDES[currentSlideIndex].description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-teal-500/30">
                        <div className="text-lg font-mono font-bold text-teal-300">
                          {SCIENTIFIC_SLIDES[currentSlideIndex].metricA}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {SCIENTIFIC_SLIDES[currentSlideIndex].metricALabel}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30">
                        <div className="text-lg font-mono font-bold text-cyan-300">
                          {SCIENTIFIC_SLIDES[currentSlideIndex].metricB}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {SCIENTIFIC_SLIDES[currentSlideIndex].metricBLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between border-t border-white/5 pt-3">
                    <span>Presenter: You (Delegate) • Kashmir EcoWatch Symposium Portal</span>
                    <span>Live WebRTC Broadcast</span>
                  </div>
                </div>
              ) : (
                /* Hardware Display Media Screen Video */
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <video ref={attachScreenVideo} autoPlay playsInline className="w-full h-full object-contain" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-2">
                    <MonitorUp className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Live Presentation Stream Active</span>
                  </div>
                </div>
              )
            ) : spotlight.isYou && isVideoOn ? (
              /* User Camera on Stage (Big Screen with Mirror Flip) */
              <div className="w-full h-full relative bg-slate-950 flex items-center justify-center">
                <video
                  ref={attachStageVideo}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-teal-500/40 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="font-semibold text-white">You (Delegate)</span>
                  <span className="text-[10px] text-teal-300 font-mono">• Live Webcam (Mirrored)</span>
                  {isMicOn && (
                    <span className="ml-2 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <Mic className="w-3 h-3" /> {micAudioLevel}%
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-300 font-mono border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Your Face is Live on Stage</span>
                </div>
              </div>
            ) : (
              /* Spotlight Speaker Graphic / Stage */
              <div className="w-full h-full relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-6">
                <div className="text-center p-6 max-w-xl">
                  <div className="relative inline-block mb-4">
                    <img
                      src={spotlight.avatar}
                      alt={spotlight.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-teal-500/50 shadow-2xl mx-auto"
                    />
                    <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {spotlight.name}
                  </h3>
                  <p className="text-xs text-teal-400 font-medium mb-3">
                    {spotlight.title} &bull; {spotlight.institution}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Speaking in Main Auditorium Track</span>
                  </div>
                </div>

                {/* Speaker Stage Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">{spotlight.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {spotlight.isYou ? '(You)' : '(Spotlighted on Stage)'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Participant Thumbnail Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 h-28 sm:h-32 shrink-0">
            {/* Keynote 1 */}
            {session.speakers[0] && (
              <div
                onClick={() => setSpotlightSpeakerId('spk-1')}
                className={cn(
                  'relative rounded-xl bg-slate-900 border overflow-hidden flex flex-col justify-end p-2 cursor-pointer transition-all group',
                  spotlightSpeakerId === 'spk-1'
                    ? 'border-teal-400 ring-2 ring-teal-500/30'
                    : 'border-white/10 hover:border-teal-500/40'
                )}
                title="Click to spotlight this speaker on stage"
              >
                <img
                  src={session.speakers[0].avatar}
                  alt={session.speakers[0].name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="relative z-10 bg-black/60 backdrop-blur-sm p-1 rounded text-[11px] truncate">
                  <div className="font-semibold text-white truncate">{session.speakers[0].name}</div>
                  <div className="text-[9px] text-slate-400 truncate">{session.speakers[0].institution}</div>
                </div>
              </div>
            )}

            {/* Keynote 2 */}
            {session.speakers[1] && (
              <div
                onClick={() => setSpotlightSpeakerId('spk-2')}
                className={cn(
                  'relative rounded-xl bg-slate-900 border overflow-hidden flex flex-col justify-end p-2 cursor-pointer transition-all group',
                  spotlightSpeakerId === 'spk-2'
                    ? 'border-teal-400 ring-2 ring-teal-500/30'
                    : 'border-white/10 hover:border-teal-500/40'
                )}
                title="Click to spotlight this speaker on stage"
              >
                <img
                  src={session.speakers[1].avatar}
                  alt={session.speakers[1].name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="relative z-10 bg-black/60 backdrop-blur-sm p-1 rounded text-[11px] truncate">
                  <div className="font-semibold text-white truncate">{session.speakers[1].name}</div>
                  <div className="text-[9px] text-slate-400 truncate">{session.speakers[1].institution}</div>
                </div>
              </div>
            )}

            {/* Scientific Moderator */}
            <div
              onClick={() => setSpotlightSpeakerId('moderator')}
              className={cn(
                'relative rounded-xl bg-slate-900 border overflow-hidden flex flex-col justify-end p-2 cursor-pointer transition-all group',
                spotlightSpeakerId === 'moderator'
                  ? 'border-teal-400 ring-2 ring-teal-500/30'
                  : 'border-white/10 hover:border-teal-500/40'
              )}
              title="Click to spotlight session chair on stage"
            >
              <img
                src="/images/markhor.png"
                alt="Session Moderator"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="relative z-10 bg-black/60 backdrop-blur-sm p-1 rounded text-[11px] truncate">
                <div className="font-semibold text-white truncate">Session Chair</div>
                <div className="text-[9px] text-teal-400 truncate">KEW Symposium Secretariat</div>
              </div>
            </div>

            {/* Local User (You) - Click to Spotlight Yourself */}
            <div
              onClick={() => setSpotlightSpeakerId('you')}
              className={cn(
                'relative rounded-xl bg-slate-900 border overflow-hidden flex flex-col justify-end p-2 cursor-pointer transition-all shadow-inner',
                spotlightSpeakerId === 'you'
                  ? 'border-teal-400 ring-2 ring-teal-500/40'
                  : 'border-teal-500/30 hover:border-teal-400'
              )}
              title="Click to spotlight yourself on stage"
            >
              {isVideoOn ? (
                <video
                  ref={attachLocalVideo}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover -scale-x-100"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-500">
                  <VideoOff className="w-6 h-6 mb-1 opacity-50" />
                  <span className="text-[10px]">Camera Muted</span>
                </div>
              )}

              <div className="relative z-10 bg-black/75 backdrop-blur-sm p-1 rounded text-[11px] flex items-center justify-between">
                <div className="truncate">
                  <span className="font-semibold text-teal-300">You (Delegate)</span>
                  {isVideoOn && (
                    <span className="text-[9px] text-slate-400 block font-mono">
                      HD Webcam
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {isMicOn ? (
                    <span className="flex items-center text-emerald-400">
                      <Mic className="w-3 h-3 animate-pulse" />
                      <span className="text-[9px] font-mono ml-0.5">{micAudioLevel}%</span>
                    </span>
                  ) : (
                    <MicOff className="w-3 h-3 text-rose-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Q&A, Chat, Participants, Tracks */}
        {isSidebarOpen && (
          <div className="w-80 sm:w-96 border-l border-white/10 bg-slate-900/95 flex flex-col shrink-0 z-20">
            {/* Sidebar Tabs */}
            <div className="grid grid-cols-4 border-b border-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('qna')}
                className={cn(
                  'py-3 border-b-2 transition-all flex flex-col items-center gap-1',
                  activeTab === 'qna'
                    ? 'border-teal-400 text-teal-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                )}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Q&amp;A ({qnaList.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={cn(
                  'py-3 border-b-2 transition-all flex flex-col items-center gap-1',
                  activeTab === 'chat'
                    ? 'border-teal-400 text-teal-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                )}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('participants')}
                className={cn(
                  'py-3 border-b-2 transition-all flex flex-col items-center gap-1',
                  activeTab === 'participants'
                    ? 'border-teal-400 text-teal-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                )}
              >
                <Users className="w-4 h-4" />
                <span>Roster ({session.registeredCount})</span>
              </button>
              {session.tracks && session.tracks.length > 0 && (
                <button
                  onClick={() => setActiveTab('tracks')}
                  className={cn(
                    'py-3 border-b-2 transition-all flex flex-col items-center gap-1',
                    activeTab === 'tracks'
                      ? 'border-teal-400 text-teal-300 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  )}
                >
                  <Layers className="w-4 h-4" />
                  <span>Tracks</span>
                </button>
              )}
            </div>

            {/* Tab 1: Q&A */}
            {activeTab === 'qna' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-3 bg-slate-950/60 border-b border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Moderated Peer Q&amp;A (Demonstration Stream)</span>
                  <span className="text-amber-400 font-mono text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">SIMULATED</span>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {qnaList.map(item => (
                    <div key={item.id} className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-bold text-white">{item.author}</span>
                          <span className="text-slate-400 text-[10px] ml-1.5">({item.affiliation})</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{item.question}</p>

                      {item.isAnswered && item.answer && (
                        <div className="p-2.5 rounded-lg bg-teal-950/30 border border-teal-500/20 text-[11px] text-teal-200">
                          <strong className="text-teal-300 block mb-0.5 font-semibold">Live Faculty Response:</strong>
                          {item.answer}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleUpvote(item.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-teal-300 font-medium px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3 text-teal-400" />
                          <span>{item.upvotes} Upvotes</span>
                        </button>

                        {item.isAnswered ? (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Answered
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-medium">Pending Moderation</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Question */}
                <form onSubmit={handleAddQuestion} className="p-3 bg-slate-950 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                    placeholder="Ask scientific panel a question..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                  <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            )}

            {/* Tab 2: Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex border-b border-white/10 text-[11px]">
                  <button
                    onClick={() => setChatMode('public')}
                    className={cn(
                      'flex-1 py-1.5 font-semibold text-center transition-colors',
                      chatMode === 'public' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                    )}
                  >
                    Public Hall
                  </button>
                  <button
                    onClick={() => setChatMode('speakers')}
                    className={cn(
                      'flex-1 py-1.5 font-semibold text-center transition-colors',
                      chatMode === 'speakers' ? 'bg-teal-950/60 text-teal-300' : 'text-slate-400 hover:text-white'
                    )}
                  >
                    Speaker Backchannel
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {chatMessages
                    .filter(m => (chatMode === 'public' ? !m.isSpeakerOnly : m.isSpeakerOnly))
                    .map(msg => (
                      <div key={msg.id} className="text-xs">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={cn(
                              'text-[9px] font-bold uppercase px-1.5 py-0.2 rounded font-mono',
                              msg.role === 'Host'
                                ? 'bg-rose-500/20 text-rose-300'
                                : msg.role === 'Speaker'
                                ? 'bg-teal-500/20 text-teal-300'
                                : 'bg-slate-800 text-slate-400'
                            )}
                          >
                            {msg.role}
                          </span>
                          <span className="font-semibold text-white">{msg.sender}</span>
                          <span className="text-[10px] text-slate-500 font-mono ml-auto">{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-300 pl-2 border-l border-white/10">{msg.message}</p>
                      </div>
                    ))}
                </div>

                {/* Send Chat */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={newChatMessage}
                    onChange={e => setNewChatMessage(e.target.value)}
                    placeholder={chatMode === 'public' ? 'Message everyone...' : 'Message speakers only...'}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                  <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            )}

            {/* Tab 3: Roster */}
            {activeTab === 'participants' && (
              <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Session Faculty &amp; Delegates</span>
                  <span className="text-amber-400 font-mono text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-normal">SIMULATED ROSTER</span>
                </div>
                {session.speakers.map(spk => (
                  <div
                    key={spk.id}
                    onClick={() => {
                      if (spk.id === session.speakers[0]?.id) setSpotlightSpeakerId('spk-1');
                      else if (spk.id === session.speakers[1]?.id) setSpotlightSpeakerId('spk-2');
                      else if (spk.id === session.speakers[2]?.id) setSpotlightSpeakerId('spk-3');
                    }}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between cursor-pointer hover:border-teal-500/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={spk.avatar} alt={spk.name} className="w-8 h-8 rounded-full object-cover border border-teal-500/30" />
                      <div>
                        <div className="font-bold text-white leading-none">{spk.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-1">{spk.institution}</div>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Faculty
                    </span>
                  </div>
                ))}
                <div
                  onClick={() => setSpotlightSpeakerId('you')}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-teal-500/30 flex items-center justify-between cursor-pointer hover:border-teal-400"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center font-bold text-xs border border-white/10">
                      U
                    </div>
                    <div>
                      <div className="font-bold text-white leading-none">You (Delegate)</div>
                      <div className="text-[10px] text-emerald-400 leading-tight mt-1">Verified Attendance Active</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Delegate
                  </span>
                </div>
              </div>
            )}

            {/* Tab 4: Parallel Tracks */}
            {activeTab === 'tracks' && session.tracks && (
              <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Parallel Symposium Halls
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Click to switch your live virtual audio/video feed to another symposium room.
                </p>

                {session.tracks.map(track => (
                  <div
                    key={track.id}
                    onClick={() => setActiveTrackId(track.id)}
                    className={cn(
                      'p-3 rounded-xl border cursor-pointer transition-all',
                      activeTrackId === track.id
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-950/30'
                        : 'bg-slate-950/60 border-white/5 hover:border-white/20'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-white text-xs break-words leading-snug flex-1">
                        {track.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 shrink-0">
                        {track.roomCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mb-2 break-words leading-snug">{track.theme}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Chair: {track.chair}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Audio Diagnostics Panel Modal */}
      {showAudioDiagnostics && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/50 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Audio &amp; WebRTC Diagnostics Panel</h3>
                  <p className="text-xs text-slate-400 font-mono">Hardware capture, track state, and RTP transmission audit</p>
                </div>
              </div>
              <button
                onClick={() => setShowAudioDiagnostics(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Diagnostic Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Permission */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Microphone Permission</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={cn('w-2 h-2 rounded-full', micPermissionStatus === 'granted' ? 'bg-emerald-400' : 'bg-rose-400')} />
                  <span className={micPermissionStatus === 'granted' ? 'text-emerald-300' : 'text-rose-300'}>
                    {micPermissionStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Local Mute State */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Local Mute State</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={cn('w-2 h-2 rounded-full', isMicOn ? 'bg-emerald-400' : 'bg-rose-400')} />
                  <span className={isMicOn ? 'text-emerald-300' : 'text-rose-300'}>
                    {isMicOn ? 'UNMUTED (Live Transmitting)' : 'MUTED (Track Disabled)'}
                  </span>
                </div>
              </div>

              {/* WebRTC Connection State */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">WebRTC Peer Connection</span>
                <div className="flex items-center gap-1.5 font-bold text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="font-mono">{peerConnectionState.toUpperCase()}</span>
                </div>
              </div>

              {/* Audio Publication Status */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">WebRTC RTP Audio Publication</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={cn('w-2 h-2 rounded-full', isAudioPublished ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500')} />
                  <span className={isAudioPublished ? 'text-emerald-300' : 'text-slate-400'}>
                    {isAudioPublished ? 'ACTIVE (Published to Peers)' : 'STANDBY (Unpublished)'}
                  </span>
                </div>
              </div>

              {/* Video Publication Status */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">WebRTC RTP Video Publication</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={cn('w-2 h-2 rounded-full', isVideoPublished ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500')} />
                  <span className={isVideoPublished ? 'text-emerald-300' : 'text-slate-400'}>
                    {isVideoPublished ? 'ACTIVE (Transmitting Video)' : 'STANDBY (Video Off)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Input Device Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-teal-400" />
                <span>Microphone Input Device</span>
              </label>
              <select
                value={selectedMicId}
                onChange={e => {
                  setSelectedMicId(e.target.value);
                  if (isMicOn) startMicrophone(e.target.value);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              >
                {audioInputDevices.map((d, idx) => (
                  <option key={d.deviceId || idx} value={d.deviceId}>
                    {d.label || `Microphone ${idx + 1} (${d.deviceId.slice(0, 8)}...)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Output Device Selector (if supported) */}
            {audioOutputDevices.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Headphones className="w-3.5 h-3.5 text-purple-400" />
                  <span>Speaker Output Device (setSinkId)</span>
                </label>
                <select
                  value={selectedSpeakerId}
                  onChange={e => handleSpeakerChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                >
                  {audioOutputDevices.map((d, idx) => (
                    <option key={d.deviceId || idx} value={d.deviceId}>
                      {d.label || `Speaker ${idx + 1} (${d.deviceId.slice(0, 8)}...)`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Live Input Signal VU Meter */}
            <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-Time Mic Input Signal (Web Audio API)</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">{micAudioLevel}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-75"
                  style={{ width: `${micAudioLevel}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                <span>-60 dB (Silence)</span>
                <span>-24 dB (Speech)</span>
                <span>0 dB (Peak)</span>
              </div>
            </div>

            {/* Camera Device Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-teal-400" />
                  <span>Webcam / Video Device Selector</span>
                </span>
                {videoDevices.length > 0 && (
                  <span className="text-[10px] font-mono text-slate-500">{videoDevices.length} devices found</span>
                )}
              </label>
              <select
                value={selectedCameraId}
                onChange={e => {
                  const newId = e.target.value;
                  setSelectedCameraId(newId);
                  if (isVideoOn) startHardwareCamera(newId);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              >
                {videoDevices.map((d, idx) => (
                  <option key={d.deviceId || idx} value={d.deviceId}>
                    {d.label || `Camera ${idx + 1} (${d.deviceId.slice(0, 8)}...)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Video Track Detailed Inspection */}
            {videoStream && videoStream.getVideoTracks().length > 0 && (
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-white/5 font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className="font-bold text-teal-300 pb-1 border-b border-white/5 flex items-center justify-between">
                  <span>Active Video Track Introspection</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    LIVE
                  </span>
                </div>
                <div>Track Label: <span className="text-white">{videoStream.getVideoTracks()[0].label}</span></div>
                <div>Ready State: <span className="text-emerald-400">{videoStream.getVideoTracks()[0].readyState}</span></div>
                <div>Track Enabled: <span className="text-white">{String(videoStream.getVideoTracks()[0].enabled)}</span></div>
                <div>Settings: <span className="text-slate-400">
                  {videoStream.getVideoTracks()[0].getSettings()?.width ?? 'auto'}x{videoStream.getVideoTracks()[0].getSettings()?.height ?? 'auto'} @ {videoStream.getVideoTracks()[0].getSettings()?.frameRate ?? 'auto'}fps
                </span></div>
                <div>WebRTC Video Sender: <span className={isVideoPublished ? 'text-emerald-400' : 'text-slate-400'}>{isVideoPublished ? 'Active' : 'Unpublished'}</span></div>
              </div>
            )}

            {/* Audio Track Detailed Inspection */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-white/5 font-mono text-[11px] space-y-1.5 text-slate-300">
              <div className="font-bold text-teal-300 pb-1 border-b border-white/5">Active Audio Track Introspection</div>
              <div>Track ID: <span className="text-white">{currentAudioTrack?.id || 'No active track'}</span></div>
              <div>Ready State: <span className={cn(currentAudioTrack?.readyState === 'live' ? 'text-emerald-400' : 'text-slate-400')}>{currentAudioTrack?.readyState || 'none'}</span></div>
              <div>Track Enabled: <span className={cn(currentAudioTrack?.enabled ? 'text-emerald-400' : 'text-rose-400')}>{String(currentAudioTrack?.enabled ?? false)}</span></div>
              <div>Track Muted Flag: <span className="text-slate-400">{String(currentAudioTrack?.muted ?? true)}</span></div>
              <div>Remote Audio Track Subscribed: <span className={hasRemoteAudioTrack ? 'text-emerald-400' : 'text-slate-400'}>{String(hasRemoteAudioTrack)}</span></div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    if (!isMicOn) startMicrophone(selectedMicId);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  <Mic className="w-3.5 h-3.5 mr-1.5" />
                  Capture Mic
                </Button>
                <Button
                  size="sm"
                  disabled={isCameraLoading}
                  onClick={() => startHardwareCamera(selectedCameraId)}
                  className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs"
                >
                  <Camera className="w-3.5 h-3.5 mr-1.5" />
                  {isCameraLoading ? 'Starting...' : isVideoOn ? 'Restart Cam' : 'Start Cam'}
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAudioDiagnostics(false)}
                className="border-white/10 text-slate-300 text-xs"
              >
                Close Diagnostics
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="px-4 py-3 bg-slate-900 border-t border-white/10 shrink-0 flex items-center justify-between gap-4 z-30">
        {/* Left: Room Status & Live VU Decibel Meter */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
          <span className="font-mono text-white font-bold">{session.roomCode}</span>
          <span className="text-slate-700">|</span>
          <span>{session.discipline}</span>

          {/* Local Mic VU Meter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-[10px] font-mono">
            {isMicOn ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300">MIC {micAudioLevel}%</span>
                <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
                    style={{ width: `${micAudioLevel}%` }}
                  />
                </div>
              </>
            ) : (
              <span className="text-slate-500 flex items-center gap-1">
                <MicOff className="w-3 h-3 text-rose-500" />
                <span>MIC MUTED</span>
              </span>
            )}
          </div>

          {/* Remote Audio VU Meter (if remote peer is speaking) */}
          {hasRemoteAudioTrack && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950 border border-teal-500/20 text-[10px] font-mono text-teal-300">
              <Volume2 className="w-3 h-3 text-teal-400" />
              <span>REMOTE {remoteAudioLevel}%</span>
              <div className="w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-400 transition-all duration-75"
                  style={{ width: `${remoteAudioLevel}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Center: Main Media Actions */}
        <div className="flex items-center gap-2 sm:gap-3 mx-auto">
          {/* Mic Control with Diagnostics trigger */}
          <div className="relative inline-flex items-center">
            <Button
              size="sm"
              onClick={toggleMic}
              className={cn(
                'rounded-l-xl px-3 sm:px-4 py-2 font-semibold text-xs transition-all shadow-md',
                isMicOn
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-y border-l border-emerald-400/50 shadow-emerald-900/30'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              )}
            >
              {isMicOn ? <Mic className="w-4 h-4 mr-1.5 text-white animate-pulse" /> : <MicOff className="w-4 h-4 mr-1.5" />}
              <span>{isMicOn ? 'Mute' : 'Unmute'}</span>
            </Button>
            <button
              onClick={() => setShowAudioDiagnostics(!showAudioDiagnostics)}
              className={cn(
                'px-1.5 py-2 rounded-r-xl border-l text-xs font-bold transition-colors shadow-md',
                isMicOn
                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-white/20'
                  : 'bg-rose-700 hover:bg-rose-600 text-white border-white/20'
              )}
              title="Open Audio & Microphone Diagnostics"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Camera Control with Device Diagnostics trigger */}
          <div className="relative inline-flex items-center">
            <Button
              size="sm"
              disabled={isCameraLoading}
              onClick={toggleCamera}
              className={cn(
                'rounded-l-xl px-3 sm:px-4 py-2 font-semibold text-xs transition-all shadow-md',
                isVideoOn
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-y border-l border-emerald-400/50 shadow-emerald-900/30'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              )}
            >
              {isCameraLoading ? (
                <span className="w-4 h-4 mr-1.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isVideoOn ? (
                <VideoIcon className="w-4 h-4 mr-1.5 text-white" />
              ) : (
                <VideoOff className="w-4 h-4 mr-1.5" />
              )}
              <span>{isCameraLoading ? 'Starting...' : isVideoOn ? 'Stop Video' : 'Start Video'}</span>
            </Button>
            <button
              onClick={() => setShowAudioDiagnostics(true)}
              className={cn(
                'px-1.5 py-2 rounded-r-xl border-l text-xs font-bold transition-colors shadow-md',
                isVideoOn
                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-white/20'
                  : 'bg-rose-700 hover:bg-rose-600 text-white border-white/20'
              )}
              title="Camera Settings & Device Selection"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Screen Share */}
          <Button
            size="sm"
            onClick={toggleScreenShare}
            className={cn(
              'rounded-xl px-3 sm:px-4 py-2 font-semibold text-xs transition-all shadow-md',
              isScreenSharing
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400/50 shadow-cyan-900/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10'
            )}
          >
            {isScreenSharing ? <MonitorOff className="w-4 h-4 mr-1.5" /> : <MonitorUp className="w-4 h-4 mr-1.5 text-cyan-400" />}
            <span>{isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
          </Button>

          {/* Spotlight Self on Big Stage */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSpotlightSpeakerId(spotlightSpeakerId === 'you' ? 'spk-1' : 'you')}
            className={cn(
              'hidden lg:inline-flex rounded-xl px-3 py-2 text-xs border transition-all',
              spotlightSpeakerId === 'you'
                ? 'border-teal-400 bg-teal-950/40 text-teal-300'
                : 'border-white/10 text-slate-300 hover:bg-white/5'
            )}
            title="Toggle your video on the main auditorium stage"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-teal-400" />
            <span>{spotlightSpeakerId === 'you' ? 'Spotlight Active' : 'Spotlight Me'}</span>
          </Button>

          {/* Host Mute All / Lock */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRoomLocked(!isRoomLocked)}
            className="hidden md:inline-flex rounded-xl px-3 py-2 text-xs border-white/10 text-slate-300 hover:bg-white/5"
            title={isRoomLocked ? 'Room is Locked' : 'Room is Unlocked'}
          >
            {isRoomLocked ? <Lock className="w-4 h-4 mr-1.5 text-amber-400" /> : <Unlock className="w-4 h-4 mr-1.5 text-slate-400" />}
            <span>{isRoomLocked ? 'Locked' : 'Lock Room'}</span>
          </Button>
        </div>

        {/* Right: Diagnostics, Panel & Leave */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAudioDiagnostics(!showAudioDiagnostics)}
            className="hidden sm:inline-flex rounded-xl px-3 py-2 text-xs border border-white/10 text-slate-300 hover:bg-white/5"
            title="Audio Diagnostics"
          >
            <Activity className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
            <span>Audio Diagnostics</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              'rounded-xl px-3 py-2 text-xs border',
              isSidebarOpen ? 'border-teal-500/40 text-teal-300 bg-teal-950/30' : 'border-white/10 text-slate-400 hover:bg-white/5'
            )}
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Panel</span>
          </Button>

          <Link href="/webinars">
            <Button size="sm" className="rounded-xl px-3 sm:px-4 py-2 bg-rose-700 hover:bg-rose-600 font-bold text-white text-xs shadow-md shadow-rose-900/40">
              <LogOut className="w-4 h-4 mr-1.5" />
              <span>Leave</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
