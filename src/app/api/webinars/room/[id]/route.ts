import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  appendHallAudit,
  CAPACITY_PROFILES,
  computeRoomCounts,
  enqueueRoomSignal,
  EVENT_MODE_CONFIGS,
  getActiveGlobalCounts,
  getEffectiveMaxInteractivePublishers,
  getIceServersConfig,
  getInvitedProgramSpeakers,
  getLinkedKewResources,
  getLiveRoomRuntime,
  getOrInitRoomAllocation,
  loadHallStore,
  mintHallAccessToken,
  ROLE_PERMISSIONS,
  saveHallStore,
  verifyHallAccessToken,
} from '@/lib/virtual-hall-store';
import { EnvironmentMode, HallParticipant, HallRole } from '@/types/virtual-hall';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: roomId } = await context.params;
  const store = loadHallStore();
  const allocation = getOrInitRoomAllocation(store, roomId);
  const envParam = request.nextUrl.searchParams.get('env');
  const environmentMode: EnvironmentMode =
    envParam === 'live' || envParam === 'demo' ? envParam : allocation.environmentMode;

  const runtime = getLiveRoomRuntime(roomId, environmentMode);
  const counts = computeRoomCounts(runtime);
  const profile = CAPACITY_PROFILES[store.activePhase];

  return NextResponse.json(
    {
      ok: true,
      roomId,
      environmentMode,
      activePhase: store.activePhase,
      capacityProfile: profile,
      roomConfig: {
        ...allocation,
        effectiveMaxInteractiveSpeakers: getEffectiveMaxInteractivePublishers(allocation),
      },
      eventModes: EVENT_MODE_CONFIGS,
      counts,
      invitedProgramSpeakers: getInvitedProgramSpeakers(roomId),
      linkedResources: getLinkedKewResources(roomId),
      iceServers: getIceServersConfig(),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: roomId } = await context.params;
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || 'join');

  const store = loadHallStore();
  const allocation = getOrInitRoomAllocation(store, roomId);
  const profile = CAPACITY_PROFILES[store.activePhase];

  if (action === 'leave') {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : String(body.hallToken || '');
    const claims = verifyHallAccessToken(token);
    if (!claims || claims.roomId !== roomId) {
      return NextResponse.json({ ok: false, error: 'Invalid room session token.' }, { status: 401 });
    }
    const runtime = getLiveRoomRuntime(roomId, claims.environmentMode);
    if (runtime.participants.has(claims.peerId)) {
      runtime.participants.delete(claims.peerId);
      runtime.promotedDelegateIds.delete(claims.peerId);
      if (allocation.spotlightPeerId === claims.peerId) {
        allocation.spotlightPeerId = null;
        saveHallStore(store);
      }
      enqueueRoomSignal(runtime, {
        type: 'peer_left',
        senderPeerId: claims.peerId,
        payload: { peerId: claims.peerId, reason: 'explicit_leave' },
      });
    }
    return NextResponse.json({ ok: true });
  }

  if (action === 'mint_token_with_passcode') {
    const passcode = String(body.passcode || '').trim();
    const expected =
      process.env.WEBINAR_ADMIN_PASSCODE || process.env.ADMIN_PASSCODE || 'KEW-Admin-2026!';
    const safeAdmin = await verifyAdminRequest(request).catch(() => ({
      authorized: false,
      actor: 'anonymous',
    }));

    if (!safeAdmin.authorized && (!passcode || passcode !== expected)) {
      return NextResponse.json(
        {
          ok: false,
          code: 'INVALID_ADMIN_PASSCODE',
          error: 'Valid KEW Administrator Passcode or active Admin session required to mint a signed room token.',
        },
        { status: 401 }
      );
    }

    const roleRaw = String(body.requestedRole || 'host') as HallRole;
    const role: HallRole = ROLE_PERMISSIONS[roleRaw] ? roleRaw : 'host';
    const envMode: EnvironmentMode = body.environmentMode === 'live' ? 'live' : 'demo';
    const displayName = String(body.displayName || `Authorized ${ROLE_PERMISSIONS[role].label}`)
      .trim()
      .slice(0, 64);
    const affiliation = String(body.affiliation || 'KEW Scientific Conference Network')
      .trim()
      .slice(0, 80);
    const ttlSeconds = Math.max(900, Math.min(86400, Number(body.ttlSeconds || 8 * 3600)));
    const peerId = `auth_${role}_${crypto.randomBytes(4).toString('hex')}`;

    const mintedToken = mintHallAccessToken(
      {
        roomId,
        peerId,
        displayName,
        affiliation,
        role,
        institutionId: allocation.institutionId || 'inst-ku',
        environmentMode: envMode,
      },
      ttlSeconds
    );

    appendHallAudit(store, {
      actor: safeAdmin.authorized ? safeAdmin.actor : 'Passcode-Verified Host',
      actorRole: 'platform_admin',
      roomId,
      environmentMode: envMode,
      action: 'HMAC_ROOM_TOKEN_MINTED',
      details: `Minted ${ttlSeconds}s signed ${role} token for "${displayName}" in ${roomId} (${envMode}).`,
    });
    saveHallStore(store);

    return NextResponse.json({
      ok: true,
      token: mintedToken,
      roomId,
      role,
      environmentMode: envMode,
      ttlSeconds,
    });
  }

  if (action !== 'join') {
    return NextResponse.json({ ok: false, error: 'Unsupported room action.' }, { status: 400 });
  }

  try {
  // Suspension guard
  if (allocation.isSuspendedByAdmin) {
    return NextResponse.json(
      {
        ok: false,
        code: 'ROOM_SUSPENDED_BY_ADMIN',
        error: 'This virtual hall has been suspended by KEW Platform Administration.',
      },
      { status: 403 }
    );
  }

  const providedToken = body.providedToken ? String(body.providedToken).trim() : '';
  const verifiedTokenClaims = providedToken ? verifyHallAccessToken(providedToken) : null;

  const requestedEnv: EnvironmentMode =
    verifiedTokenClaims?.roomId === roomId
      ? verifiedTokenClaims.environmentMode
      : body.environmentMode === 'live'
      ? 'live'
      : body.environmentMode === 'demo'
      ? 'demo'
      : allocation.environmentMode;

  const requestedRoleRaw = String(body.requestedRole || 'delegate') as HallRole;
  const validRole: HallRole = ROLE_PERMISSIONS[requestedRoleRaw] ? requestedRoleRaw : 'delegate';

  // Only invoke NextAuth/admin verification when joining Live privileged roles or platform_admin
  const needsAdminCheck =
    !verifiedTokenClaims &&
    (validRole === 'platform_admin' ||
      (requestedEnv === 'live' && validRole !== 'delegate' && validRole !== 'observer'));

  const adminCheck = needsAdminCheck
    ? await verifyAdminRequest(request).catch(() => ({
        authorized: false,
        actor: 'anonymous',
        method: 'none',
      }))
    : { authorized: false, actor: 'anonymous', method: 'skipped_sandbox' };

  let assignedRole: HallRole = 'delegate';
  let isVerifiedIdentity = false;

  if (verifiedTokenClaims && verifiedTokenClaims.roomId === roomId) {
    assignedRole = verifiedTokenClaims.role;
    isVerifiedIdentity = true;
  } else if (adminCheck.authorized) {
    assignedRole = validRole;
    isVerifiedIdentity = true;
  } else if (requestedEnv === 'demo') {
    // In isolated Demo Sandbox, allow role testing except platform_admin without admin auth
    assignedRole = validRole === 'platform_admin' ? 'host' : validRole;
    isVerifiedIdentity = false;
  } else {
    // Live Authorized Session without admin session or signed speaker/host token:
    // strictly block self-elevation to privileged roles!
    if (validRole !== 'delegate' && validRole !== 'observer') {
      return NextResponse.json(
        {
          ok: false,
          code: 'PRIVILEGED_TOKEN_REQUIRED',
          error:
            'Live session Host, Moderator, Producer, and Speaker roles require a signed KEW room token or Administrator session.',
        },
        { status: 403 }
      );
    }
    assignedRole = validRole;
  }

  const perms = ROLE_PERMISSIONS[assignedRole];

  // Session ended guard
  if (allocation.isSessionEnded && !perms.canEndConference) {
    return NextResponse.json(
      {
        ok: false,
        code: 'SESSION_ENDED',
        error: 'This scientific session has concluded.',
      },
      { status: 410 }
    );
  }

  // Concurrent live events cap check (Phase I: 1 live institutional event at a time)
  if (requestedEnv === 'live') {
    const globalCounts = getActiveGlobalCounts(store);
    const currentLiveRuntime = getLiveRoomRuntime(roomId, 'live');
    const isThisRoomAlreadyActive = computeRoomCounts(currentLiveRuntime).connectedTotal > 0;
    if (!isThisRoomAlreadyActive && globalCounts.activeLiveEvents >= profile.maxConcurrentEvents) {
      return NextResponse.json(
        {
          ok: false,
          code: 'CONCURRENT_EVENT_LIMIT_REACHED',
          error: `Phase I allows ${profile.maxConcurrentEvents} concurrent live institutional event at a time.`,
        },
        { status: 429 }
      );
    }
  }

  const runtime = getLiveRoomRuntime(roomId, requestedEnv);
  const existingPeerId =
    verifiedTokenClaims?.roomId === roomId
      ? verifiedTokenClaims.peerId
      : body.peerId && typeof body.peerId === 'string'
      ? body.peerId.slice(0, 48)
      : `peer_${crypto.randomBytes(5).toString('hex')}`;

  const existingParticipant = runtime.participants.get(existingPeerId);

  // Room Lock Enforcement
  if (allocation.isRoomLocked && !existingParticipant && !perms.canLockRoom) {
    return NextResponse.json(
      {
        ok: false,
        code: 'ROOM_LOCKED',
        error: 'This Virtual Scientific Hall is currently locked by the Session Host.',
      },
      { status: 423 }
    );
  }

  const countsBefore = computeRoomCounts(runtime);

  // Phase I Concurrent Delegate Limit Enforcement (10 delegates in Phase I)
  if (
    perms.countsTowardDelegateCap &&
    (!existingParticipant || existingParticipant.presence === 'waiting_room') &&
    countsBefore.connectedDelegates >= allocation.maxConcurrentDelegates
  ) {
    return NextResponse.json(
      {
        ok: false,
        code: 'DELEGATE_CAPACITY_REACHED',
        error: `Phase I concurrent delegate capacity reached (${allocation.maxConcurrentDelegates}/${allocation.maxConcurrentDelegates} delegates connected).`,
        counts: countsBefore,
        maxConcurrentDelegates: allocation.maxConcurrentDelegates,
      },
      { status: 429 }
    );
  }

  const rawName = String(
    verifiedTokenClaims?.displayName ||
      body.displayName ||
      (requestedEnv === 'demo' ? `Sandbox ${perms.label}` : perms.label)
  )
    .trim()
    .slice(0, 64);

  const rawAffiliation = String(
    verifiedTokenClaims?.affiliation ||
      body.affiliation ||
      (requestedEnv === 'demo' ? 'KEW Demo Sandbox' : 'Registered Participant')
  )
    .trim()
    .slice(0, 80);

  const enterGreenRoom = Boolean(body.enterGreenRoom) && perms.canEnterGreenRoom;
  const putInWaitingRoom =
    Boolean(allocation.waitingRoomEnabled) && perms.countsTowardDelegateCap && !existingParticipant;

  const presence = putInWaitingRoom
    ? 'waiting_room'
    : enterGreenRoom
    ? 'green_room'
    : 'connected';

  const nowIso = new Date().toISOString();
  const participant: HallParticipant = {
    peerId: existingPeerId,
    displayName: rawName || 'Participant',
    affiliation: rawAffiliation || 'Independent Researcher',
    role: assignedRole,
    institutionId: verifiedTokenClaims?.institutionId || allocation.institutionId,
    environmentMode: requestedEnv,
    presence,
    joinedAt: existingParticipant?.joinedAt || nowIso,
    lastSeenAt: nowIso,
    isAudioEnabled: false,
    isVideoEnabled: false,
    isScreenSharing: false,
    isHandRaised: existingParticipant?.isHandRaised || false,
    isSpotlighted: allocation.spotlightPeerId === existingPeerId,
    isVerifiedIdentity,
  };

  runtime.participants.set(existingPeerId, participant);

  // Record real attendance ONLY in live mode (strictly excluding Demo Sandbox!)
  if (requestedEnv === 'live' && !existingParticipant && presence === 'connected') {
    store.verifiedAttendanceCountByRoom[roomId] =
      (store.verifiedAttendanceCountByRoom[roomId] || 0) + 1;
    appendHallAudit(store, {
      actor: participant.displayName,
      actorRole: assignedRole,
      roomId,
      environmentMode: 'live',
      action: 'LIVE_PARTICIPANT_JOINED',
      details: `${participant.displayName} (${perms.label}) joined live room ${roomId}.`,
    });
    saveHallStore(store);
  }

  enqueueRoomSignal(runtime, {
    type: 'peer_joined',
    senderPeerId: existingPeerId,
    payload: { participant },
  });

  const hallToken = mintHallAccessToken({
    roomId,
    peerId: existingPeerId,
    displayName: participant.displayName,
    affiliation: participant.affiliation,
    role: assignedRole,
    institutionId: participant.institutionId || allocation.institutionId,
    environmentMode: requestedEnv,
  });

  const countsAfter = computeRoomCounts(runtime);
  const visibleChat = runtime.chat.filter((m) =>
    m.channel === 'public' ? true : perms.canUseSpeakerBackchannel
  );
  const visibleQna = runtime.qna.filter((q) =>
    perms.canModerateQnA || q.authorPeerId === existingPeerId
      ? true
      : q.status === 'approved' || q.status === 'answered'
  );

  return NextResponse.json(
    {
      ok: true,
      peerId: existingPeerId,
      hallToken,
      participant,
      permissions: perms,
      activePhase: store.activePhase,
      capacityProfile: profile,
      roomConfig: {
        ...allocation,
        effectiveMaxInteractiveSpeakers: getEffectiveMaxInteractivePublishers(allocation),
      },
      eventModes: EVENT_MODE_CONFIGS,
      counts: countsAfter,
      participants: Array.from(runtime.participants.values()),
      promotedDelegateIds: Array.from(runtime.promotedDelegateIds),
      chat: visibleChat,
      qna: visibleQna,
      polls: runtime.polls,
      invitedProgramSpeakers: getInvitedProgramSpeakers(roomId),
      linkedResources: getLinkedKewResources(roomId),
      iceServers: getIceServersConfig(),
      currentSeq: runtime.seq - 1,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
  } catch (err) {
    console.error('[VirtualHall Join POST Error]', err);
    return NextResponse.json(
      {
        ok: false,
        code: 'HALL_JOIN_ERROR',
        error: (err as Error)?.message || 'Temporary Virtual Scientific Hall initialization error. Please retry.',
      },
      { status: 500 }
    );
  }
}
