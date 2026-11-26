'use client';

import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  CameraDiagnosticStatus,
  MicDiagnosticStatus,
  SpeakerDiagnosticStatus,
} from '@/components/webinars/hall/VirtualHallDiagnosticsModal';
import {
  loadVerifiedDevicePrefs,
  markCameraHardwareReleased,
  registerDiagnosticCameraRelinquisher,
  resolvePreferredDevice,
  saveVerifiedDevicePrefs,
  VERIFIED_DEVICE_PREFS_EVENT,
} from '@/lib/virtual-hall-device-prefs';

export interface UseVirtualHallDiagnosticsOptions {
  open: boolean;
  isMicOn?: boolean;
  isVideoOn?: boolean;
  audioStreamRef?: MutableRefObject<MediaStream | null>;
  videoStreamRef?: MutableRefObject<MediaStream | null>;
  remoteAudioElsRef?: MutableRefObject<Map<string, HTMLAudioElement>>;
  onLiveMicDeviceChanged?: (deviceId: string) => void;
  onLiveCameraDeviceChanged?: (deviceId: string) => void;
}

export function useVirtualHallDiagnostics({
  open,
  isMicOn = false,
  isVideoOn = false,
  audioStreamRef,
  videoStreamRef,
  remoteAudioElsRef,
  onLiveMicDeviceChanged,
  onLiveCameraDeviceChanged,
}: UseVirtualHallDiagnosticsOptions) {
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);

  const [selectedMicId, setSelectedMicId] = useState<string>('');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('');
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  const [micPermissionStatus, setMicPermissionStatus] = useState<string>('prompt');
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<string>('prompt');
  const [speakerSinkSupported, setSpeakerSinkSupported] = useState<boolean>(false);

  const [isTestingMic, setIsTestingMic] = useState(false);
  const [micDiagStatus, setMicDiagStatus] = useState<MicDiagnosticStatus>('not_tested');
  const [micDiagMessage, setMicDiagMessage] = useState<string | null>(null);
  const [diagMicLevel, setDiagMicLevel] = useState(0);
  const [diagMicPeakLevel, setDiagMicPeakLevel] = useState(0);
  const [diagMicDb, setDiagMicDb] = useState<number | null>(null);

  const [isTestingCamera, setIsTestingCamera] = useState(false);
  const [cameraDiagStatus, setCameraDiagStatus] = useState<CameraDiagnosticStatus>('not_tested');
  const [cameraDiagMessage, setCameraDiagMessage] = useState<string | null>(null);
  const [diagCameraStream, setDiagCameraStream] = useState<MediaStream | null>(null);
  const [diagCameraResolution, setDiagCameraResolution] = useState<string | null>(null);
  const [diagCameraFps, setDiagCameraFps] = useState<number | null>(null);

  const [speakerDiagStatus, setSpeakerDiagStatus] = useState<SpeakerDiagnosticStatus>('not_tested');
  const [speakerDiagMessage, setSpeakerDiagMessage] = useState<string | null>(null);

  const selectedMicIdRef = useRef<string>('');
  const selectedSpeakerIdRef = useRef<string>('');
  const selectedCameraIdRef = useRef<string>('');
  selectedMicIdRef.current = selectedMicId;
  selectedSpeakerIdRef.current = selectedSpeakerId;
  selectedCameraIdRef.current = selectedCameraId;

  // Explicit user override flag so manual dropdown selection isn't overwritten by saved prefs until changed
  const manualMicChoiceRef = useRef<string>('');
  const manualSpeakerChoiceRef = useRef<string>('');
  const manualCameraChoiceRef = useRef<string>('');

  const diagMicStreamRef = useRef<MediaStream | null>(null);
  const diagAudioCtxRef = useRef<AudioContext | null>(null);
  const diagMicRafRef = useRef<number | null>(null);
  const diagPeakSeenRef = useRef<number>(0);
  const diagMicSavedForSessionRef = useRef<boolean>(false);
  const diagVideoStreamRef = useRef<MediaStream | null>(null);
  const diagSpeakerCtxRef = useRef<AudioContext | null>(null);
  const diagSpeakerAudioElRef = useRef<HTMLAudioElement | null>(null);

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

      const saved = loadVerifiedDevicePrefs();

      const preferredMic = resolvePreferredDevice(mics, {
        currentSelectedId: manualMicChoiceRef.current || undefined,
        savedId: saved.audioInputId,
        savedLabel: saved.audioInputLabel,
      });
      if (preferredMic && preferredMic.deviceId !== selectedMicIdRef.current) {
        setSelectedMicId(preferredMic.deviceId);
      }

      const preferredSpk = resolvePreferredDevice(spks, {
        currentSelectedId: manualSpeakerChoiceRef.current || undefined,
        savedId: saved.audioOutputId,
        savedLabel: saved.audioOutputLabel,
      });
      if (preferredSpk && preferredSpk.deviceId !== selectedSpeakerIdRef.current) {
        setSelectedSpeakerId(preferredSpk.deviceId);
      }

      const preferredCam = resolvePreferredDevice(cams, {
        currentSelectedId: manualCameraChoiceRef.current || undefined,
        savedId: saved.videoInputId,
        savedLabel: saved.videoInputLabel,
      });
      if (preferredCam && preferredCam.deviceId !== selectedCameraIdRef.current) {
        setSelectedCameraId(preferredCam.deviceId);
      }
    } catch {
      // ignore enumeration error prior to permission
    }
  }, []);

  useEffect(() => {
    refreshDevices();
    if (typeof HTMLMediaElement !== 'undefined') {
      setSpeakerSinkSupported('setSinkId' in HTMLMediaElement.prototype);
    }
    const onPrefsSync = () => {
      refreshDevices();
    };
    window.addEventListener(VERIFIED_DEVICE_PREFS_EVENT, onPrefsSync);
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', refreshDevices);
      return () => {
        window.removeEventListener(VERIFIED_DEVICE_PREFS_EVENT, onPrefsSync);
        navigator.mediaDevices.removeEventListener('devicechange', refreshDevices);
      };
    }
    return () => {
      window.removeEventListener(VERIFIED_DEVICE_PREFS_EVENT, onPrefsSync);
    };
  }, [refreshDevices]);

  // Layer A: Browser Permission Status Sync
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions?.query) return;
    let micPermObj: PermissionStatus | null = null;
    let camPermObj: PermissionStatus | null = null;
    const syncMic = () => {
      if (micPermObj) setMicPermissionStatus(micPermObj.state);
    };
    const syncCam = () => {
      if (camPermObj) setCameraPermissionStatus(camPermObj.state);
    };
    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then((p) => {
        micPermObj = p;
        setMicPermissionStatus(p.state);
        p.addEventListener?.('change', syncMic);
      })
      .catch(() => {});
    navigator.permissions
      .query({ name: 'camera' as PermissionName })
      .then((p) => {
        camPermObj = p;
        setCameraPermissionStatus(p.state);
        p.addEventListener?.('change', syncCam);
      })
      .catch(() => {});
    return () => {
      micPermObj?.removeEventListener?.('change', syncMic);
      camPermObj?.removeEventListener?.('change', syncCam);
    };
  }, []);

  // Re-enumerate when modal opens in case preferences were updated on pre-conference lobby
  useEffect(() => {
    if (open) {
      refreshDevices();
    }
  }, [open, refreshDevices]);

  const stopPrivateMicTest = useCallback((markCompleted = false) => {
    if (diagMicRafRef.current !== null) {
      cancelAnimationFrame(diagMicRafRef.current);
      diagMicRafRef.current = null;
    }
    if (diagAudioCtxRef.current) {
      diagAudioCtxRef.current.close().catch(() => {});
      diagAudioCtxRef.current = null;
    }
    if (diagMicStreamRef.current) {
      diagMicStreamRef.current.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch {}
      });
      diagMicStreamRef.current = null;
    }
    setIsTestingMic(false);
    setDiagMicLevel(0);
    setDiagMicDb(null);
    if (markCompleted) {
      setMicDiagStatus('test_completed');
      setMicDiagMessage(
        diagPeakSeenRef.current >= 2
          ? `Private microphone test completed — audio signal verified (peak ${diagPeakSeenRef.current}%). Preferred microphone saved & diagnostic tracks released.`
          : 'Microphone test stopped — capture opened, but no audible signal exceeded the noise floor.'
      );
    }
  }, []);

  const stopPrivateCameraTest = useCallback(
    (markCompleted = false) => {
      registerDiagnosticCameraRelinquisher(null);
      if (diagVideoStreamRef.current) {
        const isSharedLiveRef =
          Boolean(videoStreamRef?.current) && diagVideoStreamRef.current === videoStreamRef?.current;
        if (!isSharedLiveRef) {
          const liveTrackIds = new Set(
            (videoStreamRef?.current?.getVideoTracks() || []).map((t) => t.id)
          );
          let stoppedHardwareTrack = false;
          diagVideoStreamRef.current.getTracks().forEach((t) => {
            if (liveTrackIds.has(t.id)) return;
            try {
              t.stop();
              stoppedHardwareTrack = true;
            } catch {}
          });
          if (stoppedHardwareTrack && !isVideoOn) {
            markCameraHardwareReleased();
          }
        }
        diagVideoStreamRef.current = null;
      }
      setDiagCameraStream(null);
      setIsTestingCamera(false);
      if (markCompleted) {
        setCameraDiagStatus('test_completed');
        setCameraDiagMessage(
          'Private camera test completed — preferred camera saved and diagnostic video tracks released.'
        );
      }
    },
    [isVideoOn, videoStreamRef]
  );

  useEffect(() => {
    if (isTestingCamera && diagVideoStreamRef.current) {
      const relinquish = () => stopPrivateCameraTest(true);
      registerDiagnosticCameraRelinquisher(relinquish);
      return () => {
        registerDiagnosticCameraRelinquisher(null);
      };
    }
  }, [isTestingCamera, stopPrivateCameraTest]);

  const stopPrivateSpeakerTest = useCallback(() => {
    if (diagSpeakerAudioElRef.current) {
      try {
        diagSpeakerAudioElRef.current.pause();
        diagSpeakerAudioElRef.current.srcObject = null;
      } catch {}
      diagSpeakerAudioElRef.current = null;
    }
    if (diagSpeakerCtxRef.current) {
      diagSpeakerCtxRef.current.close().catch(() => {});
      diagSpeakerCtxRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!open) {
      stopPrivateMicTest(false);
      stopPrivateCameraTest(false);
      stopPrivateSpeakerTest();
    }
  }, [open, stopPrivateCameraTest, stopPrivateMicTest, stopPrivateSpeakerTest]);

  useEffect(() => {
    return () => {
      stopPrivateMicTest(false);
      stopPrivateCameraTest(false);
      stopPrivateSpeakerTest();
    };
  }, [stopPrivateCameraTest, stopPrivateMicTest, stopPrivateSpeakerTest]);

  const startPrivateMicTest = useCallback(
    async (deviceOverride?: string) => {
      stopPrivateMicTest(false);
      diagPeakSeenRef.current = 0;
      diagMicSavedForSessionRef.current = false;
      setDiagMicPeakLevel(0);

      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        setMicDiagStatus('device_unavailable');
        setMicDiagMessage('Browser media capture API is unavailable in this environment.');
        return;
      }

      setMicDiagStatus('requesting');
      setMicDiagMessage('Requesting local microphone access (off-air)…');

      const targetDeviceId = deviceOverride ?? selectedMicIdRef.current;

      try {
        let diagStream: MediaStream | null = null;
        const liveMicTrack = audioStreamRef?.current?.getAudioTracks()[0];
        const liveMatchesTarget =
          !targetDeviceId || liveMicTrack?.getSettings()?.deviceId === targetDeviceId;

        if (isMicOn && liveMicTrack?.readyState === 'live' && liveMatchesTarget && audioStreamRef?.current) {
          diagStream = audioStreamRef.current.clone();
        } else {
          try {
            diagStream = await navigator.mediaDevices.getUserMedia({
              audio: targetDeviceId
                ? {
                    deviceId: { exact: targetDeviceId },
                    echoCancellation: true,
                    noiseSuppression: false,
                    autoGainControl: true,
                  }
                : { echoCancellation: true, noiseSuppression: false, autoGainControl: true },
              video: false,
            });
          } catch (firstErr) {
            if ((firstErr as Error)?.name === 'OverconstrainedError' && targetDeviceId) {
              diagStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  deviceId: { ideal: targetDeviceId },
                  echoCancellation: true,
                  noiseSuppression: false,
                },
                video: false,
              });
            } else {
              throw firstErr;
            }
          }
        }

        const track = diagStream.getAudioTracks()[0];
        if (!track || track.readyState !== 'live') {
          diagStream.getTracks().forEach((t) => t.stop());
          setMicDiagStatus('device_unavailable');
          setMicDiagMessage('No live audio track was returned by the selected microphone.');
          return;
        }

        track.enabled = true;
        track.onended = () => {
          if (diagMicStreamRef.current === diagStream) {
            stopPrivateMicTest(false);
            setMicDiagStatus('device_unavailable');
            setMicDiagMessage('Microphone was disconnected during private testing.');
          }
        };

        const actualMicDeviceId = track.getSettings?.()?.deviceId || targetDeviceId || '';
        const actualMicLabel = track.label || '';
        if (actualMicDeviceId) {
          manualMicChoiceRef.current = actualMicDeviceId;
          setSelectedMicId(actualMicDeviceId);
        }

        diagMicStreamRef.current = diagStream;
        setMicPermissionStatus('granted');
        setIsTestingMic(true);
        setMicDiagStatus('testing_no_signal');
        setMicDiagMessage(
          'Microphone open privately — speak now to verify live audio signal (not transmitted to conference).'
        );
        refreshDevices();

        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        if (ctx.state === 'suspended') {
          await ctx.resume().catch(() => {});
        }
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.35;
        const src = ctx.createMediaStreamSource(diagStream);
        src.connect(analyser);
        diagAudioCtxRef.current = ctx;

        const floatBuf = new Float32Array(analyser.fftSize);
        const sampleRms = () => {
          if (diagMicStreamRef.current !== diagStream) return;
          analyser.getFloatTimeDomainData(floatBuf);
          let sumSq = 0;
          for (let i = 0; i < floatBuf.length; i++) {
            const s = floatBuf[i];
            sumSq += s * s;
          }
          const rms = Math.sqrt(sumSq / floatBuf.length);
          const pct = Math.min(100, Math.round(rms * 340));
          const db = rms > 0.00001 ? Math.max(-60, Math.round(20 * Math.log10(rms))) : -60;

          setDiagMicLevel(pct);
          setDiagMicDb(db);

          if (pct > diagPeakSeenRef.current) {
            diagPeakSeenRef.current = pct;
            setDiagMicPeakLevel(pct);
          }

          if (pct >= 2) {
            // Persist verified microphone preference immediately once real acoustic/PCM energy is confirmed
            if (!diagMicSavedForSessionRef.current) {
              diagMicSavedForSessionRef.current = true;
              saveVerifiedDevicePrefs({
                audioInputId: actualMicDeviceId || selectedMicIdRef.current,
                audioInputLabel: actualMicLabel || undefined,
                audioInputVerifiedAt: new Date().toISOString(),
              });
            }
            setMicDiagStatus((prev) => {
              if (prev !== 'signal_detected') {
                setMicDiagMessage(
                  'Audio signal detected — microphone hardware is operational and saved as your preferred input (100% private, off-air).'
                );
              }
              return 'signal_detected';
            });
          }

          diagMicRafRef.current = requestAnimationFrame(sampleRms);
        };
        sampleRms();
      } catch (err) {
        const e = err as Error;
        setIsTestingMic(false);
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError' || e.name === 'SecurityError') {
          setMicPermissionStatus('denied');
          setMicDiagStatus('permission_denied');
          setMicDiagMessage(
            'Browser or operating system blocked microphone access. Allow microphone permission in your browser site settings.'
          );
        } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
          setMicDiagStatus('device_unavailable');
          setMicDiagMessage('No microphone hardware found or selected device is disconnected.');
        } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError' || e.name === 'AbortError') {
          setMicDiagStatus('device_busy');
          setMicDiagMessage(
            'Microphone is busy or locked by another application. Close exclusive audio apps and retry.'
          );
        } else {
          setMicDiagStatus('device_unavailable');
          setMicDiagMessage(`Microphone diagnostic error: ${e.message}`);
        }
      }
    },
    [audioStreamRef, isMicOn, refreshDevices, stopPrivateMicTest]
  );

  const togglePrivateMicTest = useCallback(() => {
    if (isTestingMic) {
      stopPrivateMicTest(true);
    } else {
      startPrivateMicTest();
    }
  }, [isTestingMic, startPrivateMicTest, stopPrivateMicTest]);

  const startPrivateCameraTest = useCallback(
    async (deviceOverride?: string) => {
      stopPrivateCameraTest(false);
      setDiagCameraResolution(null);
      setDiagCameraFps(null);

      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        setCameraDiagStatus('device_unavailable');
        setCameraDiagMessage('Browser camera capture API is unavailable in this environment.');
        return;
      }

      setCameraDiagStatus('requesting');
      setCameraDiagMessage('Opening private local camera preview (off-air)…');

      const targetCamId = deviceOverride ?? selectedCameraIdRef.current;

      try {
        let diagStream: MediaStream | null = null;
        const liveVidTrack = videoStreamRef?.current?.getVideoTracks()[0];
        const liveMatchesTarget =
          !targetCamId || liveVidTrack?.getSettings()?.deviceId === targetCamId;

        if (isVideoOn && liveVidTrack?.readyState === 'live' && liveMatchesTarget && videoStreamRef?.current) {
          diagStream = videoStreamRef.current.clone();
        } else {
          try {
            diagStream = await navigator.mediaDevices.getUserMedia({
              video: targetCamId
                ? {
                    deviceId: { exact: targetCamId },
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                  }
                : { width: { ideal: 1280 }, height: { ideal: 720 } },
              audio: false,
            });
          } catch (firstErr) {
            if ((firstErr as Error)?.name === 'OverconstrainedError' && targetCamId) {
              diagStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: targetCamId } },
                audio: false,
              });
            } else {
              throw firstErr;
            }
          }
        }

        const vTrack = diagStream.getVideoTracks()[0];
        if (!vTrack || vTrack.readyState !== 'live') {
          diagStream.getTracks().forEach((t) => t.stop());
          setCameraDiagStatus('device_unavailable');
          setCameraDiagMessage('Camera did not produce an active video stream.');
          return;
        }

        vTrack.onended = () => {
          if (diagVideoStreamRef.current === diagStream) {
            stopPrivateCameraTest(false);
            setCameraDiagStatus('device_unavailable');
            setCameraDiagMessage('Camera was disconnected during private preview.');
          }
        };

        const settings = vTrack.getSettings();
        if (settings.width && settings.height) {
          setDiagCameraResolution(`${settings.width}×${settings.height}`);
        }
        if (settings.frameRate) {
          setDiagCameraFps(Math.round(settings.frameRate));
        }

        const actualCamId = settings.deviceId || targetCamId || '';
        const actualCamLabel = vTrack.label || '';
        if (actualCamId) {
          manualCameraChoiceRef.current = actualCamId;
          setSelectedCameraId(actualCamId);
        }

        // Persist verified camera preference upon live video capture
        saveVerifiedDevicePrefs({
          videoInputId: actualCamId || undefined,
          videoInputLabel: actualCamLabel || undefined,
          videoInputVerifiedAt: new Date().toISOString(),
        });

        diagVideoStreamRef.current = diagStream;
        setCameraPermissionStatus('granted');
        setDiagCameraStream(diagStream);
        setIsTestingCamera(true);
        setCameraDiagStatus('active_preview');
        setCameraDiagMessage(
          'Private local camera preview active — preferred camera saved and video remains strictly off-air.'
        );
        refreshDevices();
      } catch (err) {
        const e = err as Error;
        setIsTestingCamera(false);
        setDiagCameraStream(null);
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError' || e.name === 'SecurityError') {
          setCameraPermissionStatus('denied');
          setCameraDiagStatus('permission_denied');
          setCameraDiagMessage(
            'Browser or operating system blocked camera access. Allow camera permission in your browser site settings.'
          );
        } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
          setCameraDiagStatus('device_unavailable');
          setCameraDiagMessage('Selected camera is unavailable or disconnected.');
        } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError' || e.name === 'AbortError') {
          setCameraDiagStatus('device_busy');
          setCameraDiagMessage(
            'Camera is currently busy or locked by another application. Close other video apps and retry.'
          );
        } else if (e.name === 'OverconstrainedError') {
          setCameraDiagStatus('unsupported_constraints');
          setCameraDiagMessage(
            'Selected camera rejected the requested video constraints. Try selecting another camera device.'
          );
        } else {
          setCameraDiagStatus('device_unavailable');
          setCameraDiagMessage(`Camera diagnostic error: ${e.message}`);
        }
      }
    },
    [isVideoOn, refreshDevices, stopPrivateCameraTest, videoStreamRef]
  );

  const togglePrivateCameraTest = useCallback(() => {
    if (isTestingCamera) {
      stopPrivateCameraTest(true);
    } else {
      startPrivateCameraTest();
    }
  }, [isTestingCamera, startPrivateCameraTest, stopPrivateCameraTest]);

  const runPrivateSpeakerTest = useCallback(async () => {
    stopPrivateSpeakerTest();
    setSpeakerDiagStatus('playing');
    setSpeakerDiagMessage('Playing private two-note test chime…');

    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      diagSpeakerCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const now = ctx.currentTime;
      const oscA = ctx.createOscillator();
      const oscB = ctx.createOscillator();
      const gain = ctx.createGain();

      oscA.type = 'sine';
      oscA.frequency.setValueAtTime(440, now);
      oscB.type = 'sine';
      oscB.frequency.setValueAtTime(554.37, now + 0.38);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.36);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.42);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);

      oscA.connect(gain);
      oscB.connect(gain);

      const targetSinkId = selectedSpeakerIdRef.current;
      let routedToSpecificSink = false;
      if (
        targetSinkId &&
        typeof HTMLMediaElement !== 'undefined' &&
        'setSinkId' in HTMLMediaElement.prototype &&
        typeof ctx.createMediaStreamDestination === 'function'
      ) {
        const dest = ctx.createMediaStreamDestination();
        gain.connect(dest);
        const audioEl = document.createElement('audio');
        audioEl.srcObject = dest.stream;
        diagSpeakerAudioElRef.current = audioEl;
        try {
          await (audioEl as HTMLAudioElement & { setSinkId: (id: string) => Promise<void> }).setSinkId(
            targetSinkId
          );
          routedToSpecificSink = true;
        } catch {
          routedToSpecificSink = false;
        }
        await audioEl.play();
      } else {
        gain.connect(ctx.destination);
      }

      oscA.start(now);
      oscA.stop(now + 0.4);
      oscB.start(now + 0.38);
      oscB.stop(now + 1.08);

      window.setTimeout(() => {
        if (diagSpeakerCtxRef.current === ctx) {
          stopPrivateSpeakerTest();
          if (routedToSpecificSink) {
            const matchedSpk = audioOutputDevices.find((d) => d.deviceId === targetSinkId);
            saveVerifiedDevicePrefs({
              audioOutputId: targetSinkId,
              audioOutputLabel: matchedSpk?.label || undefined,
              audioOutputVerifiedAt: new Date().toISOString(),
            });
            setSpeakerDiagStatus('completed');
            setSpeakerDiagMessage(
              'Test chime played through selected output device — preferred output saved (strictly local, not broadcast).'
            );
          } else {
            setSpeakerDiagStatus('completed_default_sink');
            setSpeakerDiagMessage(
              speakerSinkSupported
                ? 'Test chime played through system default audio output (off-air).'
                : 'Test chime played via system default output (direct speaker selection is unsupported in this browser).'
            );
          }
        }
      }, 1150);
    } catch (err) {
      stopPrivateSpeakerTest();
      const e = err as Error;
      if (e.name === 'NotAllowedError') {
        setSpeakerDiagStatus('autoplay_blocked');
        setSpeakerDiagMessage('Browser blocked audio playback. Click Test Speakers again to allow local audio.');
      } else {
        setSpeakerDiagStatus('error');
        setSpeakerDiagMessage(`Speaker playback error: ${e.message}`);
      }
    }
  }, [audioOutputDevices, speakerSinkSupported, stopPrivateSpeakerTest]);

  const handleSelectMic = useCallback(
    (id: string) => {
      manualMicChoiceRef.current = id;
      setSelectedMicId(id);
      if (isTestingMic) {
        startPrivateMicTest(id);
      } else {
        setMicDiagStatus('not_tested');
        setMicDiagMessage(null);
        setDiagMicPeakLevel(0);
      }
      onLiveMicDeviceChanged?.(id);
    },
    [isTestingMic, onLiveMicDeviceChanged, startPrivateMicTest]
  );

  const handleSelectSpeaker = useCallback(
    (id: string) => {
      manualSpeakerChoiceRef.current = id;
      setSelectedSpeakerId(id);
      const matched = audioOutputDevices.find((d) => d.deviceId === id);
      saveVerifiedDevicePrefs({
        audioOutputId: id,
        audioOutputLabel: matched?.label || undefined,
        audioOutputVerifiedAt: new Date().toISOString(),
      });
      setSpeakerDiagStatus('not_tested');
      setSpeakerDiagMessage(null);
      if (remoteAudioElsRef?.current) {
        for (const el of remoteAudioElsRef.current.values()) {
          if ('setSinkId' in el) {
            (el as HTMLAudioElement & { setSinkId: (s: string) => Promise<void> })
              .setSinkId(id)
              .catch(() => {});
          }
        }
      }
    },
    [audioOutputDevices, remoteAudioElsRef]
  );

  const handleSelectCamera = useCallback(
    (id: string) => {
      manualCameraChoiceRef.current = id;
      setSelectedCameraId(id);
      if (isTestingCamera) {
        startPrivateCameraTest(id);
      } else {
        setCameraDiagStatus('not_tested');
        setCameraDiagMessage(null);
        setDiagCameraResolution(null);
        setDiagCameraFps(null);
      }
      onLiveCameraDeviceChanged?.(id);
    },
    [isTestingCamera, onLiveCameraDeviceChanged, startPrivateCameraTest]
  );

  return {
    audioInputDevices,
    audioOutputDevices,
    videoDevices,
    selectedMicId,
    selectedSpeakerId,
    selectedCameraId,
    setSelectedMicId,
    setSelectedSpeakerId,
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
  };
}
