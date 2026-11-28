import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  CapacityPhaseId,
  CapacityProfile,
  EnvironmentMode,
  EventModeConfig,
  EventModeId,
  HallAccessTokenClaims,
  HallAuditEntry,
  HallChatMessage,
  HallParticipant,
  HallPoll,
  HallQuestionItem,
  HallRecordingRecord,
  HallRole,
  InstitutionalHostingRecord,
  InstitutionalVerificationStatus,
  InvitedProgramSpeaker,
  LinkedKewResource,
  RolePermissions,
  RoomAllocationConfig,
  SignalEnvelope,
  SignalMessageType,
} from '@/types/virtual-hall';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { CONFERENCES_DETAILED, HOSTING_APPLICATIONS, VERIFIED_INSTITUTIONS } from '@/data/conference-system';

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(STORE_DIR, 'virtual-hall-store.json');
export const RECORDINGS_DIR = path.join(STORE_DIR, 'conference-recordings');

export const ONE_GIB_BYTES = 1024 * 1024 * 1024; // 1,073,741,824 bytes

export const CAPACITY_PROFILES: Record<CapacityPhaseId, CapacityProfile> = {
  PHASE_I: {
    phase: 'PHASE_I',
    label: 'Phase I · Initial Operational Deployment',
    description:
      'Conservative, verified initial deployment using lightweight WebRTC P2P star/mesh signaling with zero commercial SFU charges.',
    verified: true,
    maxConcurrentDelegates: 10,
    maxInteractiveSpeakers: 2,
    maxScientificTracks: 1,
    maxConcurrentEvents: 1,
    maxPodcastParticipants: 2,
    maxWorkshopParticipants: 3,
    maxBreakoutRooms: 0,
    maxSimultaneousRecordings: 1,
    institutionStorageQuotaBytes: ONE_GIB_BYTES,
    hostingChargeUsd: 0,
    recommendedTransport: 'webrtc_p2p_mesh',
  },
  PHASE_II: {
    phase: 'PHASE_II',
    label: 'Phase II · Controlled Expansion (Pending Load Benchmark)',
    description:
      'Moderate academic seminar capacity; unlocks only after multi-network load testing and administrator authorization.',
    verified: false,
    maxConcurrentDelegates: 25,
    maxInteractiveSpeakers: 3,
    maxScientificTracks: 1,
    maxConcurrentEvents: 1,
    maxPodcastParticipants: 2,
    maxWorkshopParticipants: 5,
    maxBreakoutRooms: 0,
    maxSimultaneousRecordings: 1,
    institutionStorageQuotaBytes: 2 * ONE_GIB_BYTES,
    hostingChargeUsd: 0,
    recommendedTransport: 'self_hosted_sfu',
  },
  PHASE_III: {
    phase: 'PHASE_III',
    label: 'Phase III · Self-Hosted SFU Tier (LiveKit / mediasoup Ready)',
    description:
      'Departmental symposium tier requiring dedicated self-hosted SFU worker and TURN relay allocation.',
    verified: false,
    maxConcurrentDelegates: 50,
    maxInteractiveSpeakers: 4,
    maxScientificTracks: 1,
    maxConcurrentEvents: 2,
    maxPodcastParticipants: 3,
    maxWorkshopParticipants: 8,
    maxBreakoutRooms: 2,
    maxSimultaneousRecordings: 1,
    institutionStorageQuotaBytes: 5 * ONE_GIB_BYTES,
    hostingChargeUsd: 0,
    recommendedTransport: 'self_hosted_sfu',
  },
  PHASE_IV: {
    phase: 'PHASE_IV',
    label: 'Phase IV · Regional Congress Tier (Multi-Track SFU)',
    description:
      'Full 100-delegate dual-track regional congress tier; gated behind dedicated media server provisioning.',
    verified: false,
    maxConcurrentDelegates: 100,
    maxInteractiveSpeakers: 6,
    maxScientificTracks: 2,
    maxConcurrentEvents: 3,
    maxPodcastParticipants: 4,
    maxWorkshopParticipants: 12,
    maxBreakoutRooms: 4,
    maxSimultaneousRecordings: 2,
    institutionStorageQuotaBytes: 10 * ONE_GIB_BYTES,
    hostingChargeUsd: 0,
    recommendedTransport: 'self_hosted_sfu',
  },
};

export const ROLE_PERMISSIONS: Record<HallRole, RolePermissions> = {
  platform_admin: {
    role: 'platform_admin',
    label: 'Platform Administrator',
    canPublishAudioVideo: true,
    canShareScreen: true,
    canAdmitOrRemove: true,
    canMuteOthers: true,
    canSpotlight: true,
    canLockRoom: true,
    canChangeEventMode: true,
    canRecord: true,
    canEndConference: true,
    canModerateQnA: true,
    canManagePolls: true,
    canEnterGreenRoom: true,
    canUseSpeakerBackchannel: true,
    countsTowardDelegateCap: false,
  },
  institutional_admin: {
    role: 'institutional_admin',
    label: 'Institutional Host Admin',
    canPublishAudioVideo: true,
    canShareScreen: true,
    canAdmitOrRemove: true,
    canMuteOthers: true,
    canSpotlight: true,
    canLockRoom: true,
    canChangeEventMode: true,
    canRecord: true,
    canEndConference: true,
    canModerateQnA: true,
    canManagePolls: true,
    canEnterGreenRoom: true,
    canUseSpeakerBackchannel: true,
    countsTowardDelegateCap: false,
  },
  host: {
    role: 'host',
    label: 'Conference Host / Chair',
    canPublishAudioVideo: true,
    canShareScreen: true,
    canAdmitOrRemove: true,
    canMuteOthers: true,
    canSpotlight: true,
    canLockRoom: true,
    canChangeEventMode: true,
    canRecord: true,
    canEndConference: true,
    canModerateQnA: true,
    canManagePolls: true,
    canEnterGreenRoom: true,
    canUseSpeakerBackchannel: true,
    countsTowardDelegateCap: false,
  },
  moderator: {
    role: 'moderator',
    label: 'Scientific Moderator',
    canPublishAudioVideo: true,
    canShareScreen: true,
    canAdmitOrRemove: true,
    canMuteOthers: true,
    canSpotlight: true,
    canLockRoom: false,
    canChangeEventMode: false,
    canRecord: false,
    canEndConference: false,
    canModerateQnA: true,
    canManagePolls: true,
    canEnterGreenRoom: true,
    canUseSpeakerBackchannel: true,
    countsTowardDelegateCap: false,
  },
  technical_producer: {
    role: 'technical_producer',
    label: 'Technical Producer',
    canPublishAudioVideo: true,
    canShareScreen: true,
    canAdmitOrRemove: true,
    canMuteOthers: true,
    canSpotlight: true,
    canLockRoom: true,
    canChangeEventMode: true,
    canRecord: true,
    canEndConference: false,
    canModerateQnA: true,
    canManagePolls: true,
    canEnterGreenRoom: true,
    canUseSpeakerBackchannel: true,
    countsTowardDelegateCap: false,
  },
  speaker: {
    role: 'speaker',
    label: 'Confirmed Speaker',
    canPublishAudioVideo: true,
    canShareScreen: true,
    canAdmitOrRemove: false,
    canMuteOthers: false,
    canSpotlight: false,
    canLockRoom: false,
    canChangeEventMode: false,
    canRecord: false,
    canEndConference: false,
    canModerateQnA: false,
    canManagePolls: false,
    canEnterGreenRoom: true,
    canUseSpeakerBackchannel: true,
    countsTowardDelegateCap: false,
  },
  delegate: {
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
  },
  observer: {
    role: 'observer',
    label: 'Observer (View Only)',
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
  },
};

export const EVENT_MODE_CONFIGS: Record<EventModeId, EventModeConfig> = {
  scientific_conference: {
    id: 'scientific_conference',
    label: 'Scientific Conference',
    shortLabel: 'Conference',
    description: 'Keynote plenary, session chair moderation, slides & peer Q&A (Phase I: 10 delegates, 2 speakers).',
    defaultLayout: 'active_speaker',
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
  specialist_webinar: {
    id: 'specialist_webinar',
    label: 'Specialist Webinar',
    shortLabel: 'Webinar',
    description: 'Single presenter + moderator format with controlled delegate Q&A and scientific resource links.',
    defaultLayout: 'side_by_side',
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
  scientific_podcast: {
    id: 'scientific_podcast',
    label: 'Scientific Podcast',
    shortLabel: 'Podcast Studio',
    description: '2-person studio interview layout with clean dual-speaker framing and audio-first metering.',
    defaultLayout: 'podcast_interview',
    maxInteractivePublishersOverride: 2,
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
  applied_workshop: {
    id: 'applied_workshop',
    label: 'Applied Workshop',
    shortLabel: 'Workshop',
    description: 'Small-group interactive GIS, remote sensing, or data walkthrough (Phase I: up to 3 interactive participants).',
    defaultLayout: 'workshop_collaboration',
    maxInteractivePublishersOverride: 3,
    moderatedQnADefault: false,
    delegateMicDefault: 'workshop_interactive',
  },
  scientific_symposium: {
    id: 'scientific_symposium',
    label: 'Scientific Symposium',
    shortLabel: 'Symposium',
    description: 'Timed research presentations with abstract references and moderated floor questions.',
    defaultLayout: 'presentation',
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
  expert_panel: {
    id: 'expert_panel',
    label: 'Expert Panel',
    shortLabel: 'Expert Panel',
    description: 'Balanced panel discussion layout with moderator spotlight and structured audience questions.',
    defaultLayout: 'expert_panel',
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
  environmental_education: {
    id: 'environmental_education',
    label: 'Environmental Education',
    shortLabel: 'Education',
    description: 'School, university, and youth ecological literacy format with polls and guided resources.',
    defaultLayout: 'side_by_side',
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
  institutional_event: {
    id: 'institutional_event',
    label: 'Institutional Event',
    shortLabel: 'Institutional',
    description: 'Free hosted academic or NGO scientific event under KEW institutional governance.',
    defaultLayout: 'active_speaker',
    moderatedQnADefault: true,
    delegateMicDefault: 'disabled_until_approved',
  },
};

export interface PersistentHallStoreData {
  activePhase: CapacityPhaseId;
  roomAllocations: Record<string, RoomAllocationConfig>;
  hostingRecords: InstitutionalHostingRecord[];
  institutionStatusOverrides?: Record<
    string,
    {
      verificationStatus: InstitutionalVerificationStatus;
      verifiedAt?: string;
      verificationNotes?: string;
    }
  >;
  recordings: HallRecordingRecord[];
  auditLog: HallAuditEntry[];
  verifiedAttendanceCountByRoom: Record<string, number>;
}

interface LiveRoomRuntime {
  key: string;
  roomId: string;
  environmentMode: EnvironmentMode;
  seq: number;
  participants: Map<string, HallParticipant>;
  promotedDelegateIds: Set<string>;
  signals: SignalEnvelope[];
  chat: HallChatMessage[];
  qna: HallQuestionItem[];
  polls: HallPoll[];
}

interface GlobalVirtualHallState {
  rooms: Map<string, LiveRoomRuntime>;
}

const globalForHall = globalThis as unknown as {
  __kewVirtualHallRuntime?: GlobalVirtualHallState;
};

function getRuntimeMap(): Map<string, LiveRoomRuntime> {
  if (!globalForHall.__kewVirtualHallRuntime) {
    globalForHall.__kewVirtualHallRuntime = {
      rooms: new Map<string, LiveRoomRuntime>(),
    };
  }
  return globalForHall.__kewVirtualHallRuntime.rooms;
}

import { getDomainSigningSecret } from '@/lib/seo/admin-session';

function getSigningSecret(): string {
  if (process.env.VIRTUAL_HALL_SECRET && process.env.VIRTUAL_HALL_SECRET.trim().length >= 16) {
    return process.env.VIRTUAL_HALL_SECRET.trim();
  }
  return getDomainSigningSecret('virtual-scientific-hall');
}

export function mintHallAccessToken(
  claims: Omit<HallAccessTokenClaims, 'iat' | 'exp'>,
  ttlSeconds = 4 * 60 * 60
): string {
  const now = Math.floor(Date.now() / 1000);
  const fullClaims: HallAccessTokenClaims = {
    ...claims,
    iat: now,
    exp: now + ttlSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(fullClaims), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', getSigningSecret()).update(encoded).digest('base64url');
  return `kew_vh2.${encoded}.${sig}`;
}

export function verifyHallAccessToken(token?: string | null): HallAccessTokenClaims | null {
  if (!token || !token.startsWith('kew_vh2.')) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [, encoded, providedSig] = parts;
  if (!encoded || !providedSig) return null;

  const expectedSig = crypto.createHmac('sha256', getSigningSecret()).update(encoded).digest('base64url');
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as HallAccessTokenClaims;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    if (!parsed.roomId || !parsed.peerId || !ROLE_PERMISSIONS[parsed.role]) return null;
    return parsed;
  } catch {
    return null;
  }
}

function createInitialStoreData(): PersistentHallStoreData {
  const phaseI = CAPACITY_PROFILES.PHASE_I;
  const roomAllocations: Record<string, RoomAllocationConfig> = {};

  for (const w of SCIENTIFIC_WEBINARS) {
    const defaultEventMode: EventModeId =
      w.type === 'conference'
        ? 'scientific_conference'
        : w.type === 'symposium'
        ? 'scientific_symposium'
        : w.type === 'roundtable'
        ? 'expert_panel'
        : 'specialist_webinar';

    roomAllocations[w.id] = {
      roomId: w.id,
      conferenceId: w.id,
      institutionId: 'inst-ku',
      environmentMode: w.status === 'live' ? 'live' : 'demo',
      eventMode: defaultEventMode,
      defaultLayout: EVENT_MODE_CONFIGS[defaultEventMode].defaultLayout,
      maxConcurrentDelegates: phaseI.maxConcurrentDelegates,
      maxInteractiveSpeakers: phaseI.maxInteractiveSpeakers,
      maxScientificTracks: phaseI.maxScientificTracks,
      recordingAllowed: true,
      waitingRoomEnabled: false,
      isRoomLocked: false,
      isSessionEnded: false,
      isSuspendedByAdmin: false,
      activeTrackId: w.tracks?.[0]?.id || 'main-plenary',
      spotlightPeerId: null,
      activeSlideDeckIndex: 0,
      isSlideDeckOpen: false,
      activeConsentRecordingId: null,
    };
  }

  const hostingRecords: InstitutionalHostingRecord[] = HOSTING_APPLICATIONS.map((app, idx) => {
    const inst = VERIFIED_INSTITUTIONS.find((i) => i.id === app.institutionId) || VERIFIED_INSTITUTIONS[0];
    return {
      id: app.id,
      institutionId: inst.id,
      institutionName: inst.name,
      institutionCategory: inst.category,
      domain: inst.domain,
      website: inst.website,
      contactName: inst.authorizedRep.name,
      contactTitle: inst.authorizedRep.title,
      contactEmail: inst.authorizedRep.email,
      verificationStatus: inst.status === 'verified' ? 'verified' : 'under_review',
      verifiedAt: inst.verifiedAt,
      conferenceTitle: app.conferenceTitle,
      eventMode: idx === 0 ? 'scientific_conference' : 'scientific_symposium',
      proposedStart: app.proposedDates.start,
      proposedEnd: app.proposedDates.end,
      requestedDelegates: Math.min(app.expectedAttendees, 10),
      requestedSpeakers: 2,
      requestedTracks: 1,
      allocatedDelegates: phaseI.maxConcurrentDelegates,
      allocatedSpeakers: phaseI.maxInteractiveSpeakers,
      allocatedTracks: phaseI.maxScientificTracks,
      allocatedStorageBytes: phaseI.institutionStorageQuotaBytes,
      usedStorageBytes: 0,
      hostingChargeUsd: 0,
      scientificScope: app.scientificScope,
      fundingDisclosure: app.fundingDisclosure,
      lifecycleStage: '4_admin_review_in_progress',
      applicationStatus: 'under_evaluation',
      roomId: idx === 0 ? 'kew-conf-2027-cryo' : 'conf-2027-wetlands',
      reviewNotes: `${app.reviewNotes || ''} Phase I conservative allocation enforced (10 delegates, 2 speakers, 1 track, 1 GB storage, $0 fee).`.trim(),
      createdAt: app.submittedAt,
      updatedAt: new Date().toISOString(),
    };
  });

  return {
    activePhase: 'PHASE_I',
    roomAllocations,
    hostingRecords,
    recordings: [],
    auditLog: [
      {
        id: 'audit-init-1',
        timestamp: new Date().toISOString(),
        actor: 'KEW Virtual Hall Engine',
        actorRole: 'system',
        roomId: 'kew-conf-2027-cryo',
        environmentMode: 'demo',
        action: 'PHASE_I_CAPACITY_ENFORCED',
        details:
          'Initialized Phase I operational ceiling: 10 concurrent delegates, 2 interactive speakers, 1 track, 1 GB institutional storage, $0 hosting charge.',
      },
    ],
    verifiedAttendanceCountByRoom: {},
  };
}

export function loadHallStore(): PersistentHallStoreData {
  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    if (!fs.existsSync(RECORDINGS_DIR)) {
      fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const initial = createInitialStoreData();
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as PersistentHallStoreData;
    if (!parsed.activePhase || !CAPACITY_PROFILES[parsed.activePhase]) {
      parsed.activePhase = 'PHASE_I';
    }
    return parsed;
  } catch {
    return createInitialStoreData();
  }
}

export function saveHallStore(data: PersistentHallStoreData): void {
  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[VirtualHallStore] Non-fatal persistence warning:', err);
  }
}

export function appendHallAudit(
  store: PersistentHallStoreData,
  entry: Omit<HallAuditEntry, 'id' | 'timestamp'>
): void {
  store.auditLog.unshift({
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  });
  if (store.auditLog.length > 200) {
    store.auditLog = store.auditLog.slice(0, 200);
  }
}

export function getOrInitRoomAllocation(
  store: PersistentHallStoreData,
  roomId: string
): RoomAllocationConfig {
  if (!store.roomAllocations[roomId]) {
    const profile = CAPACITY_PROFILES[store.activePhase];
    store.roomAllocations[roomId] = {
      roomId,
      conferenceId: roomId,
      institutionId: 'inst-ku',
      environmentMode: 'demo',
      eventMode: 'scientific_conference',
      defaultLayout: 'presentation',
      maxConcurrentDelegates: profile.maxConcurrentDelegates,
      maxInteractiveSpeakers: profile.maxInteractiveSpeakers,
      maxScientificTracks: profile.maxScientificTracks,
      recordingAllowed: true,
      waitingRoomEnabled: false,
      isRoomLocked: false,
      isSessionEnded: false,
      isSuspendedByAdmin: false,
      activeTrackId: 'track-a',
      spotlightPeerId: null,
      activeSlideDeckIndex: 0,
      isSlideDeckOpen: false,
      activeConsentRecordingId: null,
    };
    saveHallStore(store);
  }
  return store.roomAllocations[roomId];
}

export function getEffectiveMaxInteractivePublishers(allocation: RoomAllocationConfig): number {
  const modeCfg = EVENT_MODE_CONFIGS[allocation.eventMode];
  if (modeCfg?.maxInteractivePublishersOverride) {
    return modeCfg.maxInteractivePublishersOverride;
  }
  return allocation.maxInteractiveSpeakers;
}

export function getLiveRoomRuntime(roomId: string, environmentMode: EnvironmentMode): LiveRoomRuntime {
  const rooms = getRuntimeMap();
  const key = `${roomId}::${environmentMode}`;
  let runtime = rooms.get(key);
  if (!runtime) {
    const isDemo = environmentMode === 'demo';
    runtime = {
      key,
      roomId,
      environmentMode,
      seq: 1,
      participants: new Map<string, HallParticipant>(),
      promotedDelegateIds: new Set<string>(),
      signals: [],
      chat: isDemo
        ? [
            {
              id: 'welcome-msg-1',
              roomId,
              senderPeerId: 'system',
              senderName: 'KEW Scientific Secretariat',
              senderAffiliation: 'Kashmir EcoWatch',
              senderRole: 'host',
              channel: 'public',
              message:
                'Virtual Scientific Hall ready (Phase I: max 10 concurrent delegates, 2 interactive speakers, 1 track). Demo Sandbox activity is isolated from live attendance records.',
              createdAt: new Date().toISOString(),
            },
          ]
        : [],
      qna: isDemo
        ? [
            {
              id: 'qna-seed-1',
              roomId,
              authorPeerId: 'demo-seed',
              authorName: 'Sample Research Question (Demo Sandbox)',
              authorAffiliation: 'Western Himalayan Cryosphere Working Group',
              question:
                'How does TanDEM-X X-band penetration bias affect geodetic mass balance differencing over Kolahoi accumulation zones compared with Sentinel-2 optical snowline tracking?',
              upvotes: 2,
              upvotedBy: [],
              status: 'approved',
              createdAt: new Date().toISOString(),
            },
          ]
        : [],
      polls: [
        {
          id: 'poll-cryo-1',
          roomId,
          question:
            'Which cryospheric monitoring priority requires immediate sensor deployment across the Lidder and Sindh headwaters?',
          options: [
            { id: 'opt-1', label: 'Automated proglacial moraine-lake level telemetry (GLOF warning)', votes: 0 },
            { id: 'opt-2', label: 'High-altitude AWS radiation & debris-thickness ablation stations', votes: 0 },
            { id: 'opt-3', label: 'Late-summer springshed & canal off-take isotopic discharge gauging', votes: 0 },
          ],
          votedPeerIds: [],
          isOpen: true,
          createdBy: 'KEW Session Secretariat',
          createdAt: new Date().toISOString(),
        },
      ],
    };
    rooms.set(key, runtime);
  }
  pruneStaleParticipants(runtime);
  return runtime;
}

export function pruneStaleParticipants(runtime: LiveRoomRuntime, staleMs = 20000): void {
  const cutoff = Date.now() - staleMs;
  for (const [peerId, p] of runtime.participants.entries()) {
    const lastSeen = new Date(p.lastSeenAt).getTime();
    if (isNaN(lastSeen) || lastSeen < cutoff) {
      runtime.participants.delete(peerId);
      runtime.promotedDelegateIds.delete(peerId);
      enqueueRoomSignal(runtime, {
        type: 'peer_left',
        senderPeerId: peerId,
        payload: { peerId, reason: 'heartbeat_timeout' },
      });
    }
  }
}

export function enqueueRoomSignal(
  runtime: LiveRoomRuntime,
  msg: {
    type: SignalMessageType;
    senderPeerId: string;
    targetPeerId?: string;
    payload: Record<string, unknown>;
  }
): SignalEnvelope {
  const seq = runtime.seq++;
  const env: SignalEnvelope = {
    seq,
    id: `sig_${seq}_${Math.random().toString(36).slice(2, 7)}`,
    roomId: runtime.roomId,
    environmentMode: runtime.environmentMode,
    type: msg.type,
    senderPeerId: msg.senderPeerId,
    targetPeerId: msg.targetPeerId,
    payload: msg.payload,
    createdAt: new Date().toISOString(),
  };
  runtime.signals.push(env);
  if (runtime.signals.length > 2500) {
    runtime.signals = runtime.signals.slice(-2500);
  }
  return env;
}

export function computeRoomCounts(runtime: LiveRoomRuntime) {
  let connectedTotal = 0;
  let connectedDelegates = 0;
  let activeInteractivePublishers = 0;
  let waitingRoomCount = 0;
  let greenRoomCount = 0;

  for (const p of runtime.participants.values()) {
    if (p.presence === 'waiting_room') {
      waitingRoomCount++;
      continue;
    }
    if (p.presence === 'disconnected') continue;

    connectedTotal++;
    if (p.presence === 'green_room') {
      greenRoomCount++;
    }

    const perms = ROLE_PERMISSIONS[p.role];
    if (perms?.countsTowardDelegateCap) {
      connectedDelegates++;
    }
    if (
      p.presence === 'connected' &&
      (p.isAudioEnabled || p.isVideoEnabled || p.isScreenSharing)
    ) {
      activeInteractivePublishers++;
    }
  }

  return {
    connectedTotal,
    connectedDelegates,
    activeInteractivePublishers,
    waitingRoomCount,
    greenRoomCount,
  };
}

export function canParticipantPublishMedia(
  runtime: LiveRoomRuntime,
  allocation: RoomAllocationConfig,
  participant: HallParticipant
): { allowed: boolean; reason?: string } {
  const perms = ROLE_PERMISSIONS[participant.role];
  const isWorkshopInteractive =
    allocation.eventMode === 'applied_workshop' && participant.role === 'delegate';
  const isPromoted = runtime.promotedDelegateIds.has(participant.peerId);

  if (!perms.canPublishAudioVideo && !isWorkshopInteractive && !isPromoted) {
    return {
      allowed: false,
      reason:
        'Delegate microphone/camera publication requires Host floor promotion or Applied Workshop mode.',
    };
  }

  // Check concurrent interactive publisher cap (excluding self if already publishing)
  const maxPublishers = getEffectiveMaxInteractivePublishers(allocation);
  let otherPublishers = 0;
  for (const p of runtime.participants.values()) {
    if (p.peerId === participant.peerId) continue;
    if (
      p.presence === 'connected' &&
      (p.isAudioEnabled || p.isVideoEnabled || p.isScreenSharing)
    ) {
      otherPublishers++;
    }
  }

  if (otherPublishers >= maxPublishers) {
    return {
      allowed: false,
      reason: `Phase I interactive speaker limit reached (${maxPublishers} concurrent active media publishers).`,
    };
  }

  return { allowed: true };
}

export function getInvitedProgramSpeakers(roomId: string): InvitedProgramSpeaker[] {
  const webinar = SCIENTIFIC_WEBINARS.find((w) => w.id === roomId);
  const conf = CONFERENCES_DETAILED.find((c) => c.id === roomId);
  const sourceSpeakers = webinar?.speakers?.length ? webinar.speakers : conf?.featuredSpeakers || [];

  return sourceSpeakers.map((s) => ({
    id: s.id,
    name: s.name,
    title: s.title,
    institution: s.institution,
    invitationStatus:
      s.status === 'Confirmed'
        ? 'Confirmed'
        : s.name.toLowerCase().includes('nominated')
        ? 'Nominated'
        : 'Invited',
    isConnectedInHall: false,
  }));
}

export function getLinkedKewResources(roomId: string): LinkedKewResource[] {
  if (roomId.includes('wetland')) {
    return [
      {
        id: 'res-sr-101',
        type: 'KEW Scientific Report',
        code: 'KEW-SR-2026-101',
        title: 'Flagship Monograph: Master Hydrological & Limnological Inventory of 553 Western Himalayan Lakes',
        authors: 'KEW Water Systems & Limnology Working Group',
        href: '/research-reports/KEW-SR-2026-101',
        doiOrHash: 'KEW-DOI-2026-101',
        summary: 'Verified multi-basin synthesis of alpine glacial tarns, valley lakes, and Ramsar wetland complexes.',
      },
      {
        id: 'res-lakes-intel',
        type: 'GIS Intelligence Layer',
        code: 'KEW-WATER-553',
        title: 'Western Himalayan Lakes & Wetlands Spatial Intelligence Explorer',
        authors: 'KEW Geospatial Observatory',
        href: '/lakes-intelligence',
        summary: 'Interactive bathymetric, trophic status, and catchment land-cover telemetry.',
      },
    ];
  }

  return [
    {
      id: 'res-cryo-glof',
      type: 'GIS Intelligence Layer',
      code: 'KEW-HAZ-GLOF',
      title: 'Western Himalayan Glacial Lake Outburst Flood (GLOF) & Proglacial Moraine Hazard Intelligence',
      authors: 'KEW Cryosphere & Hazard Division',
      href: '/hazard-intelligence/glofs',
      summary: 'Real-time proglacial lake expansion indices across Kolahoi, Thajiwas, Machoi, and Zanskar basins.',
    },
    {
      id: 'res-sr-101-cryo',
      type: 'KEW Scientific Report',
      code: 'KEW-SR-2026-101',
      title: 'High-Altitude Glacial & Periglacial Lakes Inventory within the 553-Lake Western Himalayan Registry',
      authors: 'KEW Water Systems & Cryosphere Secretariat',
      href: '/research-reports',
      doiOrHash: 'KEW-SR-2026-101',
      summary: 'Elevation-stratified analysis of >3,500 m a.s.l. cirque, moraine-dammed, and supra-glacial water bodies.',
    },
    {
      id: 'res-abs-cryo-1',
      type: 'Proceedings Abstract',
      code: 'ABS-2027-001',
      title: 'Spaceborne Differential InSAR Coherence Tracking Across Kolahoi Glacier Terminus',
      authors: 'Submitted to Track A · Glacial Mass Balance & InSAR Remote Sensing',
      href: '/webinars/proceedings',
      summary: 'Sentinel-1 TOPSAR split-beam interferometry methodology for summer ablation displacement.',
    },
    {
      id: 'res-deck-cryo',
      type: 'Presentation Deck',
      code: 'DECK-CRYO-01',
      title: 'Built-In Scientific Briefing Deck: Western Himalayan Geodetic Mass Balance & Springshed Baseflow',
      authors: 'KEW Symposium Technical Secretariat',
      href: '#stage-deck',
      summary: '3-slide quantitative briefing loadable directly onto the Virtual Scientific Hall presentation stage.',
    },
  ];
}

export interface IceServersOptions {
  peerId?: string;
  includeTurnCredentials?: boolean;
}

export function isTurnServerConfigured(): boolean {
  return Boolean((process.env.TURN_URL || process.env.NEXT_PUBLIC_TURN_URL || '').trim());
}

/**
 * Builds RTCIceServer list:
 * - Public GET requests omit TURN credentials so relay secrets are never exposed to unauthenticated scrapers.
 * - Authenticated POST room joins mint short-lived coturn REST HMAC-SHA1 credentials (`use-auth-secret`)
 *   when `TURN_SHARED_SECRET` is configured, or fall back to static `TURN_USERNAME` / `TURN_CREDENTIAL`.
 */
export function getIceServersConfig(opts?: IceServersOptions): RTCIceServer[] {
  const servers: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun.cloudflare.com:3478' },
  ];

  const turnUrlRaw = (process.env.TURN_URL || process.env.NEXT_PUBLIC_TURN_URL || '').trim();
  if (!turnUrlRaw || opts?.includeTurnCredentials === false) {
    return servers;
  }

  const urls = turnUrlRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (urls.length === 0) return servers;

  const sharedSecret = (process.env.TURN_SHARED_SECRET || '').trim();
  const ttlSeconds = Math.max(
    900,
    Math.min(86400, Number(process.env.TURN_CREDENTIAL_TTL_SECONDS || 4 * 3600))
  );

  if (sharedSecret) {
    const expiry = Math.floor(Date.now() / 1000) + ttlSeconds;
    const safePeer = (opts?.peerId || 'kew_peer').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48);
    const username = `${expiry}:${safePeer}`;
    const credential = crypto.createHmac('sha1', sharedSecret).update(username).digest('base64');
    servers.push({ urls, username, credential });
    return servers;
  }

  const turnUsername = (process.env.TURN_USERNAME || process.env.NEXT_PUBLIC_TURN_USERNAME || '').trim();
  const turnCredential = (process.env.TURN_CREDENTIAL || process.env.NEXT_PUBLIC_TURN_CREDENTIAL || '').trim();

  servers.push({
    urls,
    ...(turnUsername ? { username: turnUsername } : {}),
    ...(turnCredential ? { credential: turnCredential } : {}),
  });

  return servers;
}

export function getInstitutionUsedStorageBytes(
  store: PersistentHallStoreData,
  institutionId: string
): number {
  return store.recordings
    .filter((r) => r.institutionId === institutionId && r.status !== 'deleted')
    .reduce((sum, r) => sum + (r.sizeBytes || 0), 0);
}

export function getActiveGlobalCounts(store: PersistentHallStoreData) {
  const rooms = getRuntimeMap();
  let activeLiveEvents = 0;
  let activeDemoSandboxes = 0;
  let totalConnectedPeers = 0;
  let totalLiveDelegates = 0;
  let activeRecordings = 0;

  for (const runtime of rooms.values()) {
    pruneStaleParticipants(runtime);
    const counts = computeRoomCounts(runtime);
    if (counts.connectedTotal > 0) {
      totalConnectedPeers += counts.connectedTotal;
      if (runtime.environmentMode === 'live') {
        activeLiveEvents++;
        totalLiveDelegates += counts.connectedDelegates;
      } else {
        activeDemoSandboxes++;
      }
    }
  }

  for (const rec of store.recordings) {
    if (rec.status === 'recording') activeRecordings++;
  }

  return {
    activeLiveEvents,
    activeDemoSandboxes,
    totalConnectedPeers,
    totalLiveDelegates,
    activeRecordings,
  };
}
