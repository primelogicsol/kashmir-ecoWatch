'use client';

export const VERIFIED_DEVICE_PREFS_STORAGE_KEY = 'kew_vh_verified_devices_v1';
export const VERIFIED_DEVICE_PREFS_EVENT = 'kew-vh-device-prefs-updated';

export interface VerifiedDevicePreferences {
  audioInputId?: string;
  audioInputLabel?: string;
  audioInputVerifiedAt?: string;
  audioOutputId?: string;
  audioOutputLabel?: string;
  audioOutputVerifiedAt?: string;
  videoInputId?: string;
  videoInputLabel?: string;
  videoInputVerifiedAt?: string;
}

const VIRTUAL_DEVICE_PATTERN =
  /\b(virtual|oculus|quest|steam streaming|vb-audio|cable output|cable input|droidcam|obs-camera)\b/i;

export function loadVerifiedDevicePrefs(): VerifiedDevicePreferences {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(VERIFIED_DEVICE_PREFS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as VerifiedDevicePreferences;
  } catch {
    return {};
  }
}

export function saveVerifiedDevicePrefs(
  patch: Partial<VerifiedDevicePreferences>
): VerifiedDevicePreferences {
  const current = loadVerifiedDevicePrefs();
  const next: VerifiedDevicePreferences = {
    ...current,
    ...patch,
  };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(VERIFIED_DEVICE_PREFS_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent(VERIFIED_DEVICE_PREFS_EVENT, { detail: next }));
    } catch {
      // ignore storage quota / private mode blocks
    }
  }
  return next;
}

/**
 * Resolves the best device from an enumerated list:
 * 1. Exact persisted verified deviceId match
 * 2. Exact persisted verified hardware label match (handles rotated browser deviceIds across sessions)
 * 3. Current in-memory selection if still present in the device list
 * 4. Physical hardware device preferred over virtual VR/streaming audio/video adapters
 * 5. First available device
 */
export function resolvePreferredDevice(
  devices: MediaDeviceInfo[],
  opts: {
    savedId?: string;
    savedLabel?: string;
    currentSelectedId?: string;
  }
): MediaDeviceInfo | undefined {
  if (devices.length === 0) return undefined;

  if (opts.currentSelectedId) {
    const activeCurrent = devices.find((d) => d.deviceId === opts.currentSelectedId);
    if (activeCurrent) return activeCurrent;
  }

  if (opts.savedId) {
    const byId = devices.find((d) => d.deviceId && d.deviceId === opts.savedId);
    if (byId) return byId;
  }

  if (opts.savedLabel) {
    const normTarget = opts.savedLabel.trim().toLowerCase();
    if (normTarget) {
      const byLabel = devices.find((d) => d.label && d.label.trim().toLowerCase() === normTarget);
      if (byLabel) return byLabel;
    }
  }

  const physical = devices.find((d) => d.label && !VIRTUAL_DEVICE_PATTERN.test(d.label));
  return physical || devices[0];
}

export function isLikelyVirtualVideoDevice(label?: string): boolean {
  if (!label) return false;
  return VIRTUAL_DEVICE_PATTERN.test(label);
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Camera Hardware Release Cooldown & Acquisition Controller
// Coordinates Windows Media Foundation / UVC driver release windows (~350ms)
// between off-air private diagnostics and live conference camera acquisition
// while preserving strict separation between private preview and live broadcast.
// ─────────────────────────────────────────────────────────────────────────────

const CAMERA_ARBITER_CHANNEL = 'kew-vh-camera-arbiter';

let lastCameraHardwareReleaseAt = 0;
let activeDiagnosticRelinquisher: (() => void) | null = null;
let arbiterChannelInstance: BroadcastChannel | null = null;
let inFlightConferenceCameraPromise: Promise<MediaStream> | null = null;

function ensureCameraArbiterChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') return null;
  if (!arbiterChannelInstance) {
    try {
      arbiterChannelInstance = new BroadcastChannel(CAMERA_ARBITER_CHANNEL);
      arbiterChannelInstance.onmessage = (ev) => {
        if (ev?.data?.type === 'RELINQUISH_DIAGNOSTIC_CAMERA' && activeDiagnosticRelinquisher) {
          const fn = activeDiagnosticRelinquisher;
          activeDiagnosticRelinquisher = null;
          fn();
          try {
            arbiterChannelInstance?.postMessage({
              type: 'DIAGNOSTIC_CAMERA_RELEASED',
              ts: Date.now(),
            });
          } catch {}
        } else if (ev?.data?.type === 'DIAGNOSTIC_CAMERA_RELEASED') {
          markCameraHardwareReleased();
        }
      };
    } catch {
      arbiterChannelInstance = null;
    }
  }
  return arbiterChannelInstance;
}

export function markCameraHardwareReleased(): void {
  lastCameraHardwareReleaseAt = Date.now();
}

export function registerDiagnosticCameraRelinquisher(fn: (() => void) | null): void {
  activeDiagnosticRelinquisher = fn;
  if (fn) {
    ensureCameraArbiterChannel();
  }
}

export function relinquishDiagnosticCameraForLiveUse(): boolean {
  let releasedLocal = false;
  if (activeDiagnosticRelinquisher) {
    const fn = activeDiagnosticRelinquisher;
    activeDiagnosticRelinquisher = null;
    fn();
    releasedLocal = true;
  }
  const ch = ensureCameraArbiterChannel();
  if (ch) {
    try {
      ch.postMessage({ type: 'RELINQUISH_DIAGNOSTIC_CAMERA', ts: Date.now() });
    } catch {}
  }
  return releasedLocal;
}

export async function waitForCameraHardwareCooldown(minCooldownMs = 350): Promise<void> {
  if (lastCameraHardwareReleaseAt <= 0) return;
  const elapsed = Date.now() - lastCameraHardwareReleaseAt;
  if (elapsed >= 0 && elapsed < minCooldownMs) {
    await new Promise((resolve) => setTimeout(resolve, minCooldownMs - elapsed));
  }
}

export interface AcquireConferenceCameraOptions {
  deviceOverride?: string;
  selectedCameraId?: string;
  knownVideoDevices?: MediaDeviceInfo[];
}

/**
 * Acquires the preferred hardware camera for the live conference room using the
 * exact same `deviceId: { exact }` and `1280×720` capture constraints proven in
 * Private Hardware Diagnostics, without ever falling back to `{ video: true }`
 * onto inactive virtual cameras (e.g. Windows Virtual Camera / Meta Quest / OBS).
 */
export async function acquireVerifiedHardwareCameraStream(
  opts: AcquireConferenceCameraOptions = {}
): Promise<MediaStream> {
  if (inFlightConferenceCameraPromise) {
    return inFlightConferenceCameraPromise;
  }

  const task = (async (): Promise<MediaStream> => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      const unavailErr = new Error('Browser mediaDevices.getUserMedia API is unavailable.');
      unavailErr.name = 'NotSupportedError';
      throw unavailErr;
    }

    // 1. Release any active diagnostic-only camera track in this tab & honor UVC driver cooldown
    const releasedDiag = relinquishDiagnosticCameraForLiveUse();
    await waitForCameraHardwareCooldown(releasedDiag ? 380 : 320);

    // 2. Resolve the exact target camera deviceId using fresh enumeration + saved verified preferences
    const saved = loadVerifiedDevicePrefs();
    let videoInputs: MediaDeviceInfo[] = opts.knownVideoDevices || [];
    if (navigator.mediaDevices.enumerateDevices) {
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        const enumeratedCams = all.filter((d) => d.kind === 'videoinput');
        if (enumeratedCams.length > 0) {
          videoInputs = enumeratedCams;
        }
      } catch {
        // proceed with known devices / saved preferences
      }
    }

    let targetCamId = opts.deviceOverride || '';
    if (!targetCamId) {
      const preferred = resolvePreferredDevice(videoInputs, {
        currentSelectedId: opts.selectedCameraId || undefined,
        savedId: saved.videoInputId,
        savedLabel: saved.videoInputLabel,
      });
      targetCamId = preferred?.deviceId || opts.selectedCameraId || saved.videoInputId || '';
    }

    const buildExactConstraints = (camId: string): MediaStreamConstraints => ({
      video: camId
        ? {
            deviceId: { exact: camId },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          }
        : {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
      audio: false,
    });

    const attemptOpen = async (camId: string): Promise<MediaStream> => {
      try {
        return await navigator.mediaDevices.getUserMedia(buildExactConstraints(camId));
      } catch (firstErr) {
        const e = firstErr as DOMException & { constraint?: string };
        if (e?.name === 'OverconstrainedError' && camId) {
          // Match exact fallback behavior of working Private Camera Diagnostics
          return await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: camId } },
            audio: false,
          });
        }
        throw firstErr;
      }
    };

    let lastError: unknown = null;
    const retryDelaysMs = [0, 400, 650];

    for (let attempt = 0; attempt < retryDelaysMs.length; attempt++) {
      if (retryDelaysMs[attempt] > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelaysMs[attempt]));
      }
      try {
        const openedStream = await attemptOpen(targetCamId);
        const firstTrack = openedStream.getVideoTracks()[0];

        // If permission was just granted for the first time (targetCamId was empty) and the OS
        // handed back a virtual camera while a real physical USB/integrated camera is available,
        // automatically switch to the physical hardware camera.
        if (
          !targetCamId &&
          !opts.deviceOverride &&
          firstTrack &&
          isLikelyVirtualVideoDevice(firstTrack.label)
        ) {
          try {
            const postPermCams = (await navigator.mediaDevices.enumerateDevices()).filter(
              (d) => d.kind === 'videoinput'
            );
            const realPhysical = postPermCams.find(
              (d) => d.deviceId && d.label && !isLikelyVirtualVideoDevice(d.label)
            );
            if (realPhysical) {
              openedStream.getTracks().forEach((t) => {
                try {
                  t.stop();
                } catch {}
              });
              markCameraHardwareReleased();
              await waitForCameraHardwareCooldown(260);
              return await attemptOpen(realPhysical.deviceId);
            }
          } catch {
            // keep openedStream if physical switch fails (e.g. physical camera busy in another app)
          }
        }

        return openedStream;
      } catch (err) {
        lastError = err;
        const e = err as DOMException;

        // If saved deviceId rotated across browser restarts, re-resolve by saved verified hardware label
        if (e?.name === 'OverconstrainedError' || e?.name === 'NotFoundError') {
          try {
            const refreshed = (await navigator.mediaDevices.enumerateDevices()).filter(
              (d) => d.kind === 'videoinput'
            );
            const fallbackCam = resolvePreferredDevice(refreshed, {
              savedLabel: saved.videoInputLabel,
            });
            if (fallbackCam?.deviceId && fallbackCam.deviceId !== targetCamId) {
              targetCamId = fallbackCam.deviceId;
              return await attemptOpen(targetCamId);
            }
          } catch (reResolveErr) {
            lastError = reResolveErr;
          }
          break;
        }

        // Only retry on transient Windows UVC / Media Foundation driver release locks
        const isTransientLock =
          e?.name === 'NotReadableError' ||
          e?.name === 'TrackStartError' ||
          e?.name === 'AbortError';
        if (!isTransientLock) {
          break;
        }
      }
    }

    throw lastError;
  })();

  inFlightConferenceCameraPromise = task;
  try {
    return await task;
  } finally {
    if (inFlightConferenceCameraPromise === task) {
      inFlightConferenceCameraPromise = null;
    }
  }
}
