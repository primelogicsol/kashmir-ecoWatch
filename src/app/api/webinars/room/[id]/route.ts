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
  isTurnServerConfigured,
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
      iceServers: getIceServersConfig({ includeTurnCredentials: false }),
      turnConfigured: isTurnServerConfigured(),
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
    const current = runtime.participants.get(claims.peerId);
    // Guard against delayed pagehide keepalive beacons arriving after a same-tab F5 reload rejoin
    if (current && (!body.joinedAt || current.joinedAt === body.joinedAt)) {
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
    const { checkAuthRateLimit, verifyWebinarAdminPasscode } = await import('@/lib/seo/admin-session');
    const rate = checkAuthRateLimit(request, 'webinar-room-mint', 10, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, code: 'RATE_LIMITED', error: 'Too many passcode attempts. Please retry later.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }
    const passcode = String(body.passcode || '').trim();
    const safeAdmin = await verifyAdminRequest(request).catch(() => ({
      authorized: false,
      actor: 'anonymous',
    }));
    const passcodeCheck = verifyWebinarAdminPasscode(passcode);

    if (!safeAdmin.authorized && !passcodeCheck.valid) {
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
  const explicitRoleRequested = Boolean(body.explicitRoleRequested);
  const explicitNameProvided = Boolean(body.explicitNameProvided);
  const explicitAffiliationProvided = Boolean(body.explicitAffiliationProvided);
  const validRole: HallRole = ROLE_PERMISSIONS[requestedRoleRaw] ? requestedRoleRaw : 'delegate';

  // Always verify server-side KEW Administrator credentials when no signed room token is presented,
  // ensuring authoritative role assignment across both Demo Sandbox and Live Session namespaces.
  const adminCheck = !verifiedTokenClaims
    ? await verifyAdminRequest(request).catch(() => ({
        authorized: false,
        actor: 'anonymous',
        method: 'none',
      }))
    : { authorized: false, actor: 'anonymous', method: 'signed_room_token' };

  let assignedRole: HallRole = 'delegate';
  let isVerifiedIdentity = false;

  if (verifiedTokenClaims && verifiedTokenClaims.roomId === roomId) {
    // Signed HMAC room token authoritatively governs conference role (preserves legitimate multiple-host functionality)
    assignedRole = verifiedTokenClaims.role;
    isVerifiedIdentity = true;
  } else if (adminCheck.authorized) {
    // Authenticated KEW Administrator: defaults to Host unless explicitly testing another conference role
    assignedRole = !explicitRoleRequested && validRole === 'delegate' ? 'host' : validRole;
    isVerifiedIdentity = true;
  } else {
    // Unauthenticated / non-admin client: strictly forbid granting Host, Moderator, Producer, or Speaker
    // privileges through client-side state, URL parameters, or display-name changes.
    if (explicitRoleRequested && validRole !== 'delegate' && validRole !== 'observer') {
      return NextResponse.json(
        {
          ok: false,
          code: 'PRIVILEGED_TOKEN_REQUIRED',
          error:
            'Conference Host, Moderator, Producer, and Speaker roles require an active KEW Administrator session or a signed KEW room access token.',
        },
        { status: 403 }
      );
    }
    assignedRole = validRole === 'observer' ? 'observer' : 'delegate';
    isVerifiedIdentity = false;
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
  let existingPeerId =
    verifiedTokenClaims?.roomId === roomId
      ? verifiedTokenClaims.peerId
      : body.peerId && typeof body.peerId === 'string'
      ? body.peerId.slice(0, 48)
      : `peer_${crypto.randomBytes(5).toString('hex')}`;

  // Prevent unauthenticated clients from colliding with an existing verified/privileged participant peerId
  const candidateExisting = runtime.participants.get(existingPeerId);
  if (candidateExisting && candidateExisting.isVerifiedIdentity && !isVerifiedIdentity) {
    existingPeerId = `peer_${crypto.randomBytes(5).toString('hex')}`;
  }

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

  const roleDefaultNames: Record<HallRole, string> = {
    platform_admin: 'KEW Platform Administrator',
    institutional_admin: 'Institutional Host',
    host: 'Session Host',
    moderator: 'Scientific Moderator',
    technical_producer: 'Technical Producer',
    speaker: 'Confirmed Speaker',
    delegate: 'Visiting Delegate',
    observer: 'Session Observer',
  };

  const clientDisplayName = String(body.displayName || '').trim();
  const isStaleDelegateFallback =
    assignedRole !== 'delegate' &&
    assignedRole !== 'observer' &&
    /^visiting delegate$/i.test(clientDisplayName);

  const adminActorDisplayName =
    adminCheck.authorized &&
    adminCheck.actor &&
    adminCheck.actor !== 'anonymous' &&
    adminCheck.actor !== 'KEW Automated CLI Verifier' &&
    !adminCheck.actor.includes('@')
      ? adminCheck.actor
      : null;

  const rawName = String(
    (verifiedTokenClaims && !explicitNameProvided ? verifiedTokenClaims.displayName : '') ||
      (explicitNameProvided && !isStaleDelegateFallback ? clientDisplayName : '') ||
      verifiedTokenClaims?.displayName ||
      (assignedRole === 'host' && adminActorDisplayName ? adminActorDisplayName : '') ||
      roleDefaultNames[assignedRole] ||
      perms.label
  )
    .trim()
    .slice(0, 64);

  const clientAffiliation = String(body.affiliation || '').trim();
  const rawAffiliation = String(
    (verifiedTokenClaims && !explicitAffiliationProvided ? verifiedTokenClaims.affiliation : '') ||
      (explicitAffiliationProvided ? clientAffiliation : '') ||
      verifiedTokenClaims?.affiliation ||
      (adminCheck.authorized ? 'Kashmir EcoWatch Secretariat' : 'Registered Conference Participant')
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
    joinedAt: nowIso,
    lastSeenAt: nowIso,
    isAudioEnabled: false,
    isVideoEnabled: false,
    isScreenSharing: false,
    isHandRaised: existingParticipant?.isHandRaised || false,
    isSpotlighted: allocation.spotlightPeerId === existingPeerId,
    isVerifiedIdentity,
  };

  if (existingParticipant) {
    enqueueRoomSignal(runtime, {
      type: 'peer_left',
      senderPeerId: existingPeerId,
      payload: { peerId: existingPeerId, reason: 'peer_reloaded' },
    });
  }

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
      iceServers: getIceServersConfig({ peerId: existingPeerId, includeTurnCredentials: true }),
      turnConfigured: isTurnServerConfigured(),
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
