import { NextRequest, NextResponse } from 'next/server';
import {
  appendHallAudit,
  canParticipantPublishMedia,
  computeRoomCounts,
  enqueueRoomSignal,
  EVENT_MODE_CONFIGS,
  getEffectiveMaxInteractivePublishers,
  getLiveRoomRuntime,
  getOrInitRoomAllocation,
  loadHallStore,
  ROLE_PERMISSIONS,
  saveHallStore,
  verifyHallAccessToken,
} from '@/lib/virtual-hall-store';
import { EventModeId, HallChatMessage, HallPoll, HallQuestionItem } from '@/types/virtual-hall';

export const dynamic = 'force-dynamic';

function extractClaims(request: NextRequest, roomId: string, bodyToken?: string) {
  const authHeader = request.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const queryToken = request.nextUrl.searchParams.get('token') || '';
  const token = bearer || bodyToken || queryToken;
  const claims = verifyHallAccessToken(token);
  if (!claims || claims.roomId !== roomId) return null;
  return claims;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: roomId } = await context.params;
  const claims = extractClaims(request, roomId);
  if (!claims) {
    return NextResponse.json(
      { ok: false, code: 'UNAUTHORIZED', error: 'Valid room access token required.' },
      { status: 401 }
    );
  }

  const store = loadHallStore();
  const allocation = getOrInitRoomAllocation(store, roomId);
  const runtime = getLiveRoomRuntime(roomId, claims.environmentMode);

  const me = runtime.participants.get(claims.peerId);
  if (!me) {
    return NextResponse.json(
      {
        ok: false,
        code: 'PEER_NOT_IN_ROOM',
        error: 'Session disconnected or removed from hall.',
      },
      { status: 410 }
    );
  }

  // Refresh heartbeat
  me.lastSeenAt = new Date().toISOString();

  const sinceSeq = Number(request.nextUrl.searchParams.get('sinceSeq') || '0');
  const perms = ROLE_PERMISSIONS[me.role];

  const signals = runtime.signals.filter((sig) => {
    if (sig.seq <= sinceSeq) return false;
    if (sig.targetPeerId && sig.targetPeerId !== me.peerId) return false;
    // Filter speaker/green-room private chat signals from non-authorized peers
    if (sig.type === 'chat_message') {
      const msg = sig.payload.message as HallChatMessage | undefined;
      if (msg && msg.channel !== 'public' && !perms.canUseSpeakerBackchannel) {
        return false;
      }
    }
    return true;
  });

  const counts = computeRoomCounts(runtime);
  const visibleQna = runtime.qna.filter((q) =>
    perms.canModerateQnA || q.authorPeerId === me.peerId
      ? true
      : q.status === 'approved' || q.status === 'answered'
  );

  return NextResponse.json(
    {
      ok: true,
      currentSeq: runtime.seq - 1,
      me,
      permissions: perms,
      roomConfig: {
        ...allocation,
        effectiveMaxInteractiveSpeakers: getEffectiveMaxInteractivePublishers(allocation),
      },
      counts,
      participants: Array.from(runtime.participants.values()),
      promotedDelegateIds: Array.from(runtime.promotedDelegateIds),
      signals,
      qna: visibleQna,
      polls: runtime.polls,
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
  const claims = extractClaims(request, roomId, body.hallToken);
  if (!claims) {
    return NextResponse.json(
      { ok: false, code: 'UNAUTHORIZED', error: 'Valid signed room token required.' },
      { status: 401 }
    );
  }

  const store = loadHallStore();
  const allocation = getOrInitRoomAllocation(store, roomId);
  if (allocation.isSuspendedByAdmin) {
    return NextResponse.json(
      { ok: false, code: 'ROOM_SUSPENDED', error: 'Room suspended by platform administrator.' },
      { status: 403 }
    );
  }

  const runtime = getLiveRoomRuntime(roomId, claims.environmentMode);
  const sender = runtime.participants.get(claims.peerId);
  if (!sender) {
    return NextResponse.json(
      { ok: false, code: 'PEER_NOT_FOUND', error: 'Participant is no longer in the room.' },
      { status: 410 }
    );
  }

  sender.lastSeenAt = new Date().toISOString();
  const perms = ROLE_PERMISSIONS[sender.role];
  const action = String(body.action || '');

  // 1. WebRTC Signaling Relay (Offer / Answer / ICE)
  if (action === 'webrtc_offer' || action === 'webrtc_answer' || action === 'webrtc_ice') {
    if (sender.presence !== 'connected') {
      return NextResponse.json(
        {
          ok: false,
          code: 'NOT_ON_MAIN_STAGE',
          error: 'Participants in Green Room or Waiting Room do not transmit WebRTC streams to the main hall.',
        },
        { status: 403 }
      );
    }

    const targetPeerId = body.targetPeerId ? String(body.targetPeerId) : undefined;
    if (action === 'webrtc_offer' && body.publishingMedia === true) {
      const check = canParticipantPublishMedia(runtime, allocation, sender);
      if (!check.allowed) {
        return NextResponse.json(
          { ok: false, code: 'MEDIA_PUBLISH_DENIED', error: check.reason },
          { status: check.reason?.includes('Phase I') ? 429 : 403 }
        );
      }
    }

    const env = enqueueRoomSignal(runtime, {
      type: action,
      senderPeerId: sender.peerId,
      targetPeerId,
      payload: {
        sdp: body.sdp,
        candidate: body.candidate,
        mediaMeta: body.mediaMeta || {},
      },
    });

    return NextResponse.json({ ok: true, seq: env.seq });
  }

  // 2. Participant Media / Hand / Stage Presence Update
  if (action === 'update_media_state') {
    const nextPresence = body.presence as typeof sender.presence | undefined;
    if (nextPresence && (nextPresence === 'green_room' || nextPresence === 'connected')) {
      if (nextPresence === 'green_room' && !perms.canEnterGreenRoom) {
        return NextResponse.json(
          { ok: false, code: 'FORBIDDEN_GREEN_ROOM', error: 'Green Room access is restricted to speakers and hosts.' },
          { status: 403 }
        );
      }
      if (sender.presence === 'waiting_room' && !perms.canAdmitOrRemove) {
        return NextResponse.json(
          { ok: false, code: 'WAITING_APPROVAL', error: 'Awaiting Host admission from waiting room.' },
          { status: 403 }
        );
      }
      sender.presence = nextPresence;
      if (nextPresence === 'green_room') {
        // Unpublish main-hall flags when stepping into backstage green room
        sender.isAudioEnabled = false;
        sender.isVideoEnabled = false;
        sender.isScreenSharing = false;
      }
    }

    const wantsAudio = typeof body.isAudioEnabled === 'boolean' ? body.isAudioEnabled : sender.isAudioEnabled;
    const wantsVideo = typeof body.isVideoEnabled === 'boolean' ? body.isVideoEnabled : sender.isVideoEnabled;
    const wantsScreen = typeof body.isScreenSharing === 'boolean' ? body.isScreenSharing : sender.isScreenSharing;

    if (sender.presence === 'connected' && (wantsAudio || wantsVideo || wantsScreen)) {
      if (wantsScreen && !perms.canShareScreen && !runtime.promotedDelegateIds.has(sender.peerId) && allocation.eventMode !== 'applied_workshop') {
        return NextResponse.json(
          { ok: false, code: 'SCREEN_SHARE_DENIED', error: 'Screen sharing is restricted to authorized presenters.' },
          { status: 403 }
        );
      }
      const check = canParticipantPublishMedia(runtime, allocation, sender);
      if (!check.allowed) {
        return NextResponse.json(
          { ok: false, code: 'SPEAKER_LIMIT_OR_ROLE_DENIED', error: check.reason },
          { status: check.reason?.includes('Phase I') ? 429 : 403 }
        );
      }
    }

    if (sender.presence === 'connected') {
      sender.isAudioEnabled = wantsAudio;
      sender.isVideoEnabled = wantsVideo;
      sender.isScreenSharing = wantsScreen;
    }
    if (typeof body.isHandRaised === 'boolean') {
      sender.isHandRaised = body.isHandRaised;
    }

    enqueueRoomSignal(runtime, {
      type: 'peer_updated',
      senderPeerId: sender.peerId,
      payload: { participant: sender },
    });

    return NextResponse.json({
      ok: true,
      participant: sender,
      counts: computeRoomCounts(runtime),
    });
  }

  // 3. Chat Messaging (Public / Speaker Backchannel / Green Room)
  if (action === 'chat_send') {
    const text = String(body.message || '').trim().slice(0, 1000);
    if (!text) {
      return NextResponse.json({ ok: false, error: 'Message cannot be empty.' }, { status: 400 });
    }
    const channelRaw = String(body.channel || 'public');
    const channel: HallChatMessage['channel'] =
      channelRaw === 'speakers' || channelRaw === 'green_room' ? channelRaw : 'public';

    if (channel !== 'public' && !perms.canUseSpeakerBackchannel) {
      return NextResponse.json(
        { ok: false, code: 'FORBIDDEN_CHANNEL', error: 'Speaker backchannel is restricted to speakers and hosts.' },
        { status: 403 }
      );
    }

    const chatMsg: HallChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      roomId,
      senderPeerId: sender.peerId,
      senderName: sender.displayName,
      senderAffiliation: sender.affiliation,
      senderRole: sender.role,
      channel,
      message: text,
      createdAt: new Date().toISOString(),
    };
    runtime.chat.push(chatMsg);
    if (runtime.chat.length > 250) runtime.chat = runtime.chat.slice(-250);

    enqueueRoomSignal(runtime, {
      type: 'chat_message',
      senderPeerId: sender.peerId,
      payload: { message: chatMsg },
    });

    return NextResponse.json({ ok: true, message: chatMsg });
  }

  // 4. Scientific Q&A (Submit, Upvote, Moderate)
  if (action === 'qna_submit') {
    const questionText = String(body.question || '').trim().slice(0, 600);
    if (!questionText) {
      return NextResponse.json({ ok: false, error: 'Question text required.' }, { status: 400 });
    }
    const modeCfg = EVENT_MODE_CONFIGS[allocation.eventMode];
    const autoApprove = perms.canModerateQnA || !modeCfg?.moderatedQnADefault;

    const item: HallQuestionItem = {
      id: `qna_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      roomId,
      authorPeerId: sender.peerId,
      authorName: sender.displayName,
      authorAffiliation: sender.affiliation,
      question: questionText,
      upvotes: 1,
      upvotedBy: [sender.peerId],
      status: autoApprove ? 'approved' : 'pending_moderation',
      createdAt: new Date().toISOString(),
    };
    runtime.qna.unshift(item);

    enqueueRoomSignal(runtime, {
      type: 'qna_updated',
      senderPeerId: sender.peerId,
      payload: { itemId: item.id },
    });

    return NextResponse.json({ ok: true, item });
  }

  if (action === 'qna_upvote') {
    const itemId = String(body.itemId || '');
    const item = runtime.qna.find((q) => q.id === itemId);
    if (!item) return NextResponse.json({ ok: false, error: 'Question not found.' }, { status: 404 });
    if (!item.upvotedBy.includes(sender.peerId)) {
      item.upvotedBy.push(sender.peerId);
      item.upvotes = item.upvotedBy.length;
      enqueueRoomSignal(runtime, {
        type: 'qna_updated',
        senderPeerId: sender.peerId,
        payload: { itemId: item.id },
      });
    }
    return NextResponse.json({ ok: true, item });
  }

  if (action === 'qna_moderate') {
    if (!perms.canModerateQnA) {
      return NextResponse.json(
        { ok: false, code: 'FORBIDDEN_MODERATION', error: 'Only Moderators and Hosts can moderate Q&A.' },
        { status: 403 }
      );
    }
    const itemId = String(body.itemId || '');
    const item = runtime.qna.find((q) => q.id === itemId);
    if (!item) return NextResponse.json({ ok: false, error: 'Question not found.' }, { status: 404 });

    const modOp = String(body.operation || 'approve');
    if (modOp === 'approve') item.status = 'approved';
    if (modOp === 'dismiss') item.status = 'dismissed';
    if (modOp === 'answer') {
      item.status = 'answered';
      item.answer = String(body.answer || '').trim().slice(0, 800);
      item.answeredBy = sender.displayName;
    }
    if (modOp === 'highlight') {
      const nextHighlight = !item.isHighlightedOnStage;
      for (const q of runtime.qna) q.isHighlightedOnStage = false;
      item.isHighlightedOnStage = nextHighlight;
      if (item.status === 'pending_moderation') item.status = 'approved';
    }

    enqueueRoomSignal(runtime, {
      type: 'qna_updated',
      senderPeerId: sender.peerId,
      payload: { itemId: item.id },
    });

    return NextResponse.json({ ok: true, item });
  }

  // 5. Polls
  if (action === 'poll_vote') {
    const pollId = String(body.pollId || '');
    const optionId = String(body.optionId || '');
    const poll = runtime.polls.find((p) => p.id === pollId);
    if (!poll || !poll.isOpen) {
      return NextResponse.json({ ok: false, error: 'Poll is closed or unavailable.' }, { status: 400 });
    }
    if (poll.votedPeerIds.includes(sender.peerId)) {
      return NextResponse.json({ ok: false, error: 'You have already voted in this poll.' }, { status: 409 });
    }
    const opt = poll.options.find((o) => o.id === optionId);
    if (!opt) return NextResponse.json({ ok: false, error: 'Invalid poll option.' }, { status: 400 });

    opt.votes += 1;
    poll.votedPeerIds.push(sender.peerId);
    enqueueRoomSignal(runtime, {
      type: 'poll_updated',
      senderPeerId: sender.peerId,
      payload: { pollId: poll.id },
    });
    return NextResponse.json({ ok: true, poll });
  }

  if (action === 'poll_create') {
    if (!perms.canManagePolls) {
      return NextResponse.json(
        { ok: false, code: 'FORBIDDEN_POLL', error: 'Only Hosts and Moderators can launch polls.' },
        { status: 403 }
      );
    }
    const question = String(body.question || '').trim().slice(0, 300);
    const rawOptions = Array.isArray(body.options) ? body.options : [];
    const cleanedOptions = rawOptions
      .map((o: unknown) => String(o || '').trim().slice(0, 140))
      .filter(Boolean)
      .slice(0, 5);

    if (!question || cleanedOptions.length < 2) {
      return NextResponse.json({ ok: false, error: 'Provide a poll question and at least 2 options.' }, { status: 400 });
    }

    const newPoll: HallPoll = {
      id: `poll_${Date.now()}`,
      roomId,
      question,
      options: cleanedOptions.map((label: string, idx: number) => ({
        id: `opt_${idx + 1}`,
        label,
        votes: 0,
      })),
      votedPeerIds: [],
      isOpen: true,
      createdBy: sender.displayName,
      createdAt: new Date().toISOString(),
    };
    runtime.polls.unshift(newPoll);
    enqueueRoomSignal(runtime, {
      type: 'poll_updated',
      senderPeerId: sender.peerId,
      payload: { pollId: newPoll.id },
    });
    return NextResponse.json({ ok: true, poll: newPoll });
  }

  // 6. Reactions
  if (action === 'reaction') {
    const emoji = String(body.emoji || '👏').slice(0, 8);
    enqueueRoomSignal(runtime, {
      type: 'reaction',
      senderPeerId: sender.peerId,
      payload: { emoji, senderName: sender.displayName },
    });
    return NextResponse.json({ ok: true });
  }

  // 7. Strict Host / Moderator / Producer Controls (Server-Side RBAC Enforced!)
  if (action === 'host_control') {
    const command = String(body.command || '');
    const targetPeerId = body.targetPeerId ? String(body.targetPeerId) : '';

    if (command === 'lock_room') {
      if (!perms.canLockRoom) {
        return NextResponse.json(
          { ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Only authorized Hosts/Producers can lock or unlock the room.' },
          { status: 403 }
        );
      }
      allocation.isRoomLocked = Boolean(body.locked);
      appendHallAudit(store, {
        actor: sender.displayName,
        actorRole: sender.role,
        roomId,
        environmentMode: claims.environmentMode,
        action: allocation.isRoomLocked ? 'ROOM_LOCKED' : 'ROOM_UNLOCKED',
        details: `Room lock set to ${allocation.isRoomLocked}.`,
      });
      saveHallStore(store);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: sender.peerId,
        payload: { roomConfig: allocation },
      });
      return NextResponse.json({ ok: true, roomConfig: allocation });
    }

    if (command === 'toggle_waiting_room') {
      if (!perms.canLockRoom) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host permission required.' }, { status: 403 });
      }
      allocation.waitingRoomEnabled = Boolean(body.enabled);
      saveHallStore(store);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: sender.peerId,
        payload: { roomConfig: allocation },
      });
      return NextResponse.json({ ok: true, roomConfig: allocation });
    }

    if (command === 'admit_peer') {
      if (!perms.canAdmitOrRemove) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host/Moderator permission required to admit participants.' }, { status: 403 });
      }
      const target = runtime.participants.get(targetPeerId);
      if (!target) return NextResponse.json({ ok: false, error: 'Participant not found.' }, { status: 404 });
      const counts = computeRoomCounts(runtime);
      if (ROLE_PERMISSIONS[target.role].countsTowardDelegateCap && counts.connectedDelegates >= allocation.maxConcurrentDelegates) {
        return NextResponse.json(
          { ok: false, code: 'DELEGATE_CAPACITY_REACHED', error: `Cannot admit: Phase I ${allocation.maxConcurrentDelegates}-delegate limit reached.` },
          { status: 429 }
        );
      }
      target.presence = 'connected';
      enqueueRoomSignal(runtime, {
        type: 'peer_updated',
        senderPeerId: sender.peerId,
        payload: { participant: target },
      });
      return NextResponse.json({ ok: true, participant: target });
    }

    if (command === 'remove_peer') {
      if (!perms.canAdmitOrRemove) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host/Moderator permission required to remove participants.' }, { status: 403 });
      }
      const target = runtime.participants.get(targetPeerId);
      if (!target) return NextResponse.json({ ok: false, error: 'Participant not found.' }, { status: 404 });
      runtime.participants.delete(targetPeerId);
      runtime.promotedDelegateIds.delete(targetPeerId);
      enqueueRoomSignal(runtime, {
        type: 'host_directive',
        senderPeerId: sender.peerId,
        payload: { directive: 'removed', targetPeerId },
      });
      enqueueRoomSignal(runtime, {
        type: 'peer_left',
        senderPeerId: targetPeerId,
        payload: { peerId: targetPeerId, reason: 'removed_by_host' },
      });
      return NextResponse.json({ ok: true });
    }

    if (command === 'mute_peer' || command === 'mute_all') {
      if (!perms.canMuteOthers) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host/Moderator permission required to mute participants.' }, { status: 403 });
      }
      if (command === 'mute_all') {
        for (const p of runtime.participants.values()) {
          if (p.peerId !== sender.peerId) p.isAudioEnabled = false;
        }
        enqueueRoomSignal(runtime, {
          type: 'host_directive',
          senderPeerId: sender.peerId,
          payload: { directive: 'force_mute_all', exceptPeerId: sender.peerId },
        });
      } else {
        const target = runtime.participants.get(targetPeerId);
        if (target) target.isAudioEnabled = false;
        enqueueRoomSignal(runtime, {
          type: 'host_directive',
          senderPeerId: sender.peerId,
          targetPeerId,
          payload: { directive: 'force_mute', targetPeerId },
        });
      }
      return NextResponse.json({ ok: true });
    }

    if (command === 'promote_delegate' || command === 'revoke_delegate_mic') {
      if (!perms.canAdmitOrRemove) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host/Moderator permission required.' }, { status: 403 });
      }
      if (command === 'promote_delegate') {
        runtime.promotedDelegateIds.add(targetPeerId);
      } else {
        runtime.promotedDelegateIds.delete(targetPeerId);
        const target = runtime.participants.get(targetPeerId);
        if (target && target.role === 'delegate') {
          target.isAudioEnabled = false;
          target.isVideoEnabled = false;
          target.isScreenSharing = false;
        }
      }
      enqueueRoomSignal(runtime, {
        type: 'host_directive',
        senderPeerId: sender.peerId,
        payload: {
          directive: command,
          targetPeerId,
          promotedDelegateIds: Array.from(runtime.promotedDelegateIds),
        },
      });
      return NextResponse.json({ ok: true, promotedDelegateIds: Array.from(runtime.promotedDelegateIds) });
    }

    if (command === 'spotlight_peer') {
      if (!perms.canSpotlight) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host/Moderator permission required to spotlight.' }, { status: 403 });
      }
      allocation.spotlightPeerId = targetPeerId || null;
      for (const p of runtime.participants.values()) {
        p.isSpotlighted = p.peerId === allocation.spotlightPeerId;
      }
      saveHallStore(store);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: sender.peerId,
        payload: { roomConfig: allocation },
      });
      return NextResponse.json({ ok: true, roomConfig: allocation });
    }

    if (command === 'set_event_mode') {
      if (!perms.canChangeEventMode) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Host permission required to change event mode.' }, { status: 403 });
      }
      const nextMode = String(body.eventMode || '') as EventModeId;
      if (!EVENT_MODE_CONFIGS[nextMode]) {
        return NextResponse.json({ ok: false, error: 'Unknown scientific event mode.' }, { status: 400 });
      }
      allocation.eventMode = nextMode;
      allocation.defaultLayout = EVENT_MODE_CONFIGS[nextMode].defaultLayout;
      saveHallStore(store);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: sender.peerId,
        payload: { roomConfig: allocation },
      });
      return NextResponse.json({ ok: true, roomConfig: allocation });
    }

    if (command === 'set_slide_index') {
      if (!perms.canShareScreen) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_SLIDE_CONTROL', error: 'Presenter permission required.' }, { status: 403 });
      }
      allocation.activeSlideDeckIndex = Math.max(0, Math.min(10, Number(body.slideIndex || 0)));
      saveHallStore(store);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: sender.peerId,
        payload: { roomConfig: allocation },
      });
      return NextResponse.json({ ok: true, roomConfig: allocation });
    }

    if (command === 'end_session' || command === 'reopen_session') {
      if (!perms.canEndConference) {
        return NextResponse.json({ ok: false, code: 'FORBIDDEN_HOST_CONTROL', error: 'Only Session Hosts/Admins can end the conference.' }, { status: 403 });
      }
      allocation.isSessionEnded = command === 'end_session';
      appendHallAudit(store, {
        actor: sender.displayName,
        actorRole: sender.role,
        roomId,
        environmentMode: claims.environmentMode,
        action: allocation.isSessionEnded ? 'CONFERENCE_ENDED' : 'CONFERENCE_REOPENED',
        details: `${sender.displayName} ${allocation.isSessionEnded ? 'concluded' : 'reopened'} ${roomId}.`,
      });
      saveHallStore(store);
      enqueueRoomSignal(runtime, {
        type: 'room_state_changed',
        senderPeerId: sender.peerId,
        payload: { roomConfig: allocation },
      });
      return NextResponse.json({ ok: true, roomConfig: allocation });
    }

    return NextResponse.json({ ok: false, error: `Unknown host command: ${command}` }, { status: 400 });
  }

  return NextResponse.json({ ok: false, error: `Unsupported signal action: ${action}` }, { status: 400 });
}
