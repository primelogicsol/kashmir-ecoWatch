import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  appendHallAudit,
  CAPACITY_PROFILES,
  enqueueRoomSignal,
  getInstitutionUsedStorageBytes,
  getLiveRoomRuntime,
  getOrInitRoomAllocation,
  loadHallStore,
  ONE_GIB_BYTES,
  RECORDINGS_DIR,
  ROLE_PERMISSIONS,
  saveHallStore,
  verifyHallAccessToken,
} from '@/lib/virtual-hall-store';
import { HallRecordingRecord } from '@/types/virtual-hall';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const store = loadHallStore();
  const roomId = request.nextUrl.searchParams.get('roomId');
  const institutionId = request.nextUrl.searchParams.get('institutionId') || 'inst-ku';
  const adminCheck = await verifyAdminRequest(request);

  const authHeader = request.headers.get('authorization') || '';
  const hallToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const claims = hallToken ? verifyHallAccessToken(hallToken) : null;
  const canViewPrivate =
    adminCheck.authorized || (claims ? ROLE_PERMISSIONS[claims.role].canRecord : false);

  const filtered = store.recordings.filter((r) => {
    if (r.status === 'deleted') return false;
    if (roomId && r.roomId !== roomId) return false;
    if (!canViewPrivate && r.status !== 'approved_public') return false;
    return true;
  });

  const profile = CAPACITY_PROFILES[store.activePhase];
  const usedBytes = getInstitutionUsedStorageBytes(store, institutionId);

  return NextResponse.json(
    {
      ok: true,
      recordings: filtered,
      quota: {
        institutionId,
        allocatedBytes: profile.institutionStorageQuotaBytes || ONE_GIB_BYTES,
        usedBytes,
        remainingBytes: Math.max(0, (profile.institutionStorageQuotaBytes || ONE_GIB_BYTES) - usedBytes),
        maxSimultaneousRecordings: profile.maxSimultaneousRecordings,
      },
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';

  // Multipart upload when MediaRecorder finishes capturing WebM blob
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    const recordingId = String(formData.get('recordingId') || '');
    const hallToken = String(formData.get('hallToken') || '');
    const durationSeconds = Math.max(1, Number(formData.get('durationSeconds') || 1));
    const blob = formData.get('file') as File | null;

    const claims = verifyHallAccessToken(hallToken);
    const hasRecorderToken = Boolean(claims && ROLE_PERMISSIONS[claims.role].canRecord);
    const adminCheck = hasRecorderToken
      ? { authorized: false, actor: claims!.displayName, method: 'hall_token' }
      : await verifyAdminRequest(request).catch(() => ({
          authorized: false,
          actor: 'anonymous',
          method: 'none',
        }));

    if (!hasRecorderToken && !adminCheck.authorized) {
      return NextResponse.json(
        { ok: false, code: 'FORBIDDEN_RECORDING', error: 'Recording upload requires Host/Producer/Admin authorization.' },
        { status: 403 }
      );
    }

    const store = loadHallStore();
    const profile = CAPACITY_PROFILES[store.activePhase];
    const rec = store.recordings.find((r) => r.id === recordingId);
    if (!rec) {
      return NextResponse.json({ ok: false, error: 'Recording session record not found.' }, { status: 404 });
    }

    const buffer = blob ? Buffer.from(await blob.arrayBuffer()) : Buffer.alloc(0);
    const usedBytes = getInstitutionUsedStorageBytes(store, rec.institutionId);
    const maxQuotaBytes = profile.institutionStorageQuotaBytes || ONE_GIB_BYTES;

    if (usedBytes + buffer.byteLength > maxQuotaBytes) {
      rec.status = 'deleted';
      const alloc = store.roomAllocations[rec.roomId];
      if (alloc && alloc.activeConsentRecordingId === rec.id) {
        alloc.activeConsentRecordingId = null;
      }
      saveHallStore(store);
      return NextResponse.json(
        {
          ok: false,
          code: 'STORAGE_QUOTA_EXCEEDED',
          error: `Upload exceeds the Phase I 1 GB institutional recording storage quota (${usedBytes} + ${buffer.byteLength} > ${maxQuotaBytes} bytes).`,
        },
        { status: 413 }
      );
    }

    if (!fs.existsSync(RECORDINGS_DIR)) {
      fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
    }
    const safeFileName = `${rec.id}.webm`;
    fs.writeFileSync(path.join(RECORDINGS_DIR, safeFileName), buffer);

    rec.sizeBytes = buffer.byteLength;
    rec.durationSeconds = durationSeconds;
    rec.fileName = safeFileName;
    rec.endedAt = new Date().toISOString();
    rec.status = 'archived_private';

    const alloc = store.roomAllocations[rec.roomId];
    if (alloc && alloc.activeConsentRecordingId === rec.id) {
      alloc.activeConsentRecordingId = null;
      const runtime = getLiveRoomRuntime(rec.roomId, rec.environmentMode);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: claims?.peerId || 'admin',
        payload: { roomConfig: alloc },
      });
    }

    appendHallAudit(store, {
      actor: claims?.displayName || adminCheck.actor,
      actorRole: claims?.role || 'platform_admin',
      roomId: rec.roomId,
      environmentMode: rec.environmentMode,
      action: 'RECORDING_ARCHIVED_PRIVATE',
      details: `Saved consent-based recording ${rec.id} (${(buffer.byteLength / 1024).toFixed(1)} KB, ${durationSeconds}s). Private pending approval.`,
    });
    saveHallStore(store);

    return NextResponse.json({
      ok: true,
      recording: rec,
      usedBytes: getInstitutionUsedStorageBytes(store, rec.institutionId),
      allocatedBytes: maxQuotaBytes,
    });
  }

  // JSON control actions: start_recording, stop_recording, approve_public, delete_recording
  const body = await request.json().catch(() => ({}));
  const store = loadHallStore();
  const profile = CAPACITY_PROFILES[store.activePhase];
  const action = String(body.action || '');
  const authHeader = request.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const hallToken = bearer || String(body.hallToken || '');
  const claims = hallToken ? verifyHallAccessToken(hallToken) : null;
  const hasRecorderClaim = Boolean(claims && ROLE_PERMISSIONS[claims.role].canRecord);
  const adminCheck =
    hasRecorderClaim && action !== 'approve_public'
      ? { authorized: false, actor: claims!.displayName, method: 'hall_token' }
      : await verifyAdminRequest(request).catch(() => ({
          authorized: false,
          actor: 'anonymous',
          method: 'none',
        }));

  const isAuthorizedRecorder = adminCheck.authorized || hasRecorderClaim;

  if (!isAuthorizedRecorder) {
    return NextResponse.json(
      {
        ok: false,
        code: 'FORBIDDEN_RECORDING',
        error: 'Only authorized Session Hosts, Technical Producers, or Platform Admins may control recordings.',
      },
      { status: 403 }
    );
  }

  if (action === 'start_recording') {
    const roomId = String(body.roomId || claims?.roomId || '');
    if (!roomId) {
      return NextResponse.json({ ok: false, error: 'roomId required.' }, { status: 400 });
    }
    if (body.consentConfirmed !== true) {
      return NextResponse.json(
        {
          ok: false,
          code: 'CONSENT_REQUIRED',
          error: 'Explicit participant recording notice & host consent confirmation is mandatory before starting recording.',
        },
        { status: 400 }
      );
    }

    const allocation = getOrInitRoomAllocation(store, roomId);
    if (!allocation.recordingAllowed) {
      return NextResponse.json(
        { ok: false, code: 'RECORDING_DISABLED', error: 'Recording is disabled for this virtual hall.' },
        { status: 403 }
      );
    }

    const activeRecordings = store.recordings.filter((r) => r.status === 'recording').length;
    if (activeRecordings >= profile.maxSimultaneousRecordings) {
      return NextResponse.json(
        {
          ok: false,
          code: 'SIMULTANEOUS_RECORDING_LIMIT',
          error: `Phase I allows ${profile.maxSimultaneousRecordings} simultaneous recording across the platform.`,
        },
        { status: 429 }
      );
    }

    const institutionId = allocation.institutionId || 'inst-ku';
    const usedBytes = getInstitutionUsedStorageBytes(store, institutionId);
    const maxQuotaBytes = profile.institutionStorageQuotaBytes || ONE_GIB_BYTES;
    if (usedBytes >= maxQuotaBytes) {
      return NextResponse.json(
        {
          ok: false,
          code: 'STORAGE_QUOTA_EXCEEDED',
          error: '1 GB institutional recording storage quota reached. Delete or archive older recordings first.',
        },
        { status: 413 }
      );
    }

    const envMode = claims?.environmentMode || allocation.environmentMode;
    const rec: HallRecordingRecord = {
      id: `rec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      roomId,
      conferenceId: allocation.conferenceId,
      conferenceTitle: String(body.conferenceTitle || roomId),
      institutionId,
      startedBy: claims?.displayName || adminCheck.actor,
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      sizeBytes: 0,
      mimeType: String(body.mimeType || 'video/webm'),
      consentConfirmed: true,
      environmentMode: envMode,
      status: 'recording',
      retentionDays: 90,
    };

    store.recordings.unshift(rec);
    allocation.activeConsentRecordingId = rec.id;
    saveHallStore(store);

    const runtime = getLiveRoomRuntime(roomId, envMode);
    enqueueRoomSignal(runtime, {
      type: 'room_state_changed',
      senderPeerId: claims?.peerId || 'admin',
      payload: { roomConfig: allocation, recordingNotice: 'Consent-based session recording started.' },
    });

    return NextResponse.json({ ok: true, recording: rec });
  }

  if (action === 'stop_recording') {
    const recordingId = String(body.recordingId || '');
    const rec = store.recordings.find((r) => r.id === recordingId);
    if (!rec) return NextResponse.json({ ok: false, error: 'Recording not found.' }, { status: 404 });
    rec.endedAt = new Date().toISOString();
    rec.durationSeconds = Math.max(1, Number(body.durationSeconds || rec.durationSeconds || 1));
    if (rec.status === 'recording') rec.status = 'archived_private';
    const alloc = store.roomAllocations[rec.roomId];
    if (alloc && alloc.activeConsentRecordingId === rec.id) {
      alloc.activeConsentRecordingId = null;
      const runtime = getLiveRoomRuntime(rec.roomId, rec.environmentMode);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: claims?.peerId || 'admin',
        payload: { roomConfig: alloc },
      });
    }
    saveHallStore(store);
    return NextResponse.json({ ok: true, recording: rec });
  }

  if (action === 'approve_public') {
    if (!adminCheck.authorized) {
      return NextResponse.json({ ok: false, error: 'Platform Administrator clearance required to publish recordings.' }, { status: 403 });
    }
    const rec = store.recordings.find((r) => r.id === String(body.recordingId || ''));
    if (!rec) return NextResponse.json({ ok: false, error: 'Recording not found.' }, { status: 404 });
    rec.status = 'approved_public';
    saveHallStore(store);
    return NextResponse.json({ ok: true, recording: rec });
  }

  if (action === 'delete_recording') {
    const rec = store.recordings.find((r) => r.id === String(body.recordingId || ''));
    if (!rec) return NextResponse.json({ ok: false, error: 'Recording not found.' }, { status: 404 });
    if (rec.fileName) {
      const fp = path.join(RECORDINGS_DIR, rec.fileName);
      if (fs.existsSync(fp)) {
        try {
          fs.unlinkSync(fp);
        } catch {
          // ignore file unlink race
        }
      }
    }
    rec.status = 'deleted';
    rec.sizeBytes = 0;
    const alloc = store.roomAllocations[rec.roomId];
    if (alloc && alloc.activeConsentRecordingId === rec.id) {
      alloc.activeConsentRecordingId = null;
    }
    saveHallStore(store);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: `Unknown recording action: ${action}` }, { status: 400 });
}
