export type CapacityPhaseId = 'PHASE_I' | 'PHASE_II' | 'PHASE_III' | 'PHASE_IV';

export interface CapacityProfile {
  phase: CapacityPhaseId;
  label: string;
  description: string;
  verified: boolean;
  maxConcurrentDelegates: number;
  maxInteractiveSpeakers: number;
  maxScientificTracks: number;
  maxConcurrentEvents: number;
  maxPodcastParticipants: number;
  maxWorkshopParticipants: number;
  maxBreakoutRooms: number;
  maxSimultaneousRecordings: number;
  institutionStorageQuotaBytes: number;
  hostingChargeUsd: 0;
  recommendedTransport: 'webrtc_p2p_mesh' | 'self_hosted_sfu';
}

export type HallRole =
  | 'platform_admin'
  | 'institutional_admin'
  | 'host'
  | 'moderator'
  | 'technical_producer'
  | 'speaker'
  | 'delegate'
  | 'observer';

export interface RolePermissions {
  role: HallRole;
  label: string;
  canPublishAudioVideo: boolean;
  canShareScreen: boolean;
  canAdmitOrRemove: boolean;
  canMuteOthers: boolean;
  canSpotlight: boolean;
  canLockRoom: boolean;
  canChangeEventMode: boolean;
  canRecord: boolean;
  canEndConference: boolean;
  canModerateQnA: boolean;
  canManagePolls: boolean;
  canEnterGreenRoom: boolean;
  canUseSpeakerBackchannel: boolean;
  countsTowardDelegateCap: boolean;
}

export type EventModeId =
  | 'scientific_conference'
  | 'specialist_webinar'
  | 'scientific_podcast'
  | 'applied_workshop'
  | 'scientific_symposium'
  | 'expert_panel'
  | 'environmental_education'
  | 'institutional_event';

export type StageLayoutId =
  | 'active_speaker'
  | 'gallery'
  | 'presentation'
  | 'side_by_side'
  | 'expert_panel'
  | 'podcast_interview'
  | 'workshop_collaboration'
  | 'fullscreen_presentation';

export interface EventModeConfig {
  id: EventModeId;
  label: string;
  shortLabel: string;
  description: string;
  defaultLayout: StageLayoutId;
  maxInteractivePublishersOverride?: number;
  moderatedQnADefault: boolean;
  delegateMicDefault: 'disabled_until_approved' | 'push_to_talk' | 'workshop_interactive';
}

export type EnvironmentMode = 'demo' | 'live';

export type ParticipantPresenceState =
  | 'connected'
  | 'green_room'
  | 'waiting_room'
  | 'disconnected';

export interface HallParticipant {
  peerId: string;
  displayName: string;
  affiliation: string;
  role: HallRole;
  institutionId?: string;
  environmentMode: EnvironmentMode;
  presence: ParticipantPresenceState;
  joinedAt: string;
  lastSeenAt: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  isSpotlighted: boolean;
  isVerifiedIdentity: boolean;
  avatarUrl?: string;
}

export interface InvitedProgramSpeaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  invitationStatus: 'Invited' | 'Nominated' | 'Confirmed';
  isConnectedInHall: boolean;
}

export interface HallChatMessage {
  id: string;
  roomId: string;
  senderPeerId: string;
  senderName: string;
  senderAffiliation: string;
  senderRole: HallRole;
  channel: 'public' | 'speakers' | 'green_room';
  message: string;
  createdAt: string;
  isPinned?: boolean;
}

export interface HallQuestionItem {
  id: string;
  roomId: string;
  authorPeerId: string;
  authorName: string;
  authorAffiliation: string;
  question: string;
  upvotes: number;
  upvotedBy: string[];
  status: 'pending_moderation' | 'approved' | 'answered' | 'dismissed';
  answer?: string;
  answeredBy?: string;
  isHighlightedOnStage?: boolean;
  createdAt: string;
}

export interface HallPollOption {
  id: string;
  label: string;
  votes: number;
}

export interface HallPoll {
  id: string;
  roomId: string;
  question: string;
  options: HallPollOption[];
  votedPeerIds: string[];
  isOpen: boolean;
  createdBy: string;
  createdAt: string;
}

export interface LinkedKewResource {
  id: string;
  type: 'KEW Scientific Report' | 'Master Dataset' | 'Proceedings Abstract' | 'GIS Intelligence Layer' | 'Presentation Deck';
  code: string;
  title: string;
  authors: string;
  href: string;
  doiOrHash?: string;
  summary: string;
}

export interface HallRecordingRecord {
  id: string;
  roomId: string;
  conferenceId: string;
  conferenceTitle: string;
  institutionId: string;
  startedBy: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  sizeBytes: number;
  mimeType: string;
  fileName?: string;
  consentConfirmed: boolean;
  environmentMode: EnvironmentMode;
  status: 'recording' | 'archived_private' | 'approved_public' | 'deleted';
  retentionDays: number;
}

export interface RoomAllocationConfig {
  roomId: string;
  conferenceId: string;
  institutionId: string;
  environmentMode: EnvironmentMode;
  eventMode: EventModeId;
  defaultLayout: StageLayoutId;
  maxConcurrentDelegates: number;
  maxInteractiveSpeakers: number;
  maxScientificTracks: number;
  recordingAllowed: boolean;
  waitingRoomEnabled: boolean;
  isRoomLocked: boolean;
  isSessionEnded: boolean;
  isSuspendedByAdmin: boolean;
  activeTrackId: string;
  spotlightPeerId: string | null;
  activeSlideDeckIndex: number;
  activeConsentRecordingId: string | null;
}

export type SignalMessageType =
  | 'webrtc_offer'
  | 'webrtc_answer'
  | 'webrtc_ice'
  | 'peer_joined'
  | 'peer_updated'
  | 'peer_left'
  | 'room_state_changed'
  | 'chat_message'
  | 'qna_updated'
  | 'poll_updated'
  | 'host_directive'
  | 'reaction';

export interface SignalEnvelope {
  seq: number;
  id: string;
  roomId: string;
  environmentMode: EnvironmentMode;
  type: SignalMessageType;
  senderPeerId: string;
  targetPeerId?: string; // undefined = broadcast to room
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface HallAccessTokenClaims {
  roomId: string;
  peerId: string;
  displayName: string;
  affiliation: string;
  role: HallRole;
  institutionId: string;
  environmentMode: EnvironmentMode;
  iat: number;
  exp: number;
}

export const INSTITUTION_TYPE_OPTIONS = [
  'University',
  'Environmental NGO',
  'Research Institution',
  'Government Department',
  'Scientific Society',
  'Educational Institution',
  'Community Organization',
  'Independent Research Group',
  'Other',
] as const;

export type InstitutionTypeOption = (typeof INSTITUTION_TYPE_OPTIONS)[number];

export type InstitutionalVerificationStatus =
  | 'pending'
  | 'under_review'
  | 'documentation_requested'
  | 'verified'
  | 'rejected'
  | 'suspended';

export type InstitutionalLifecycleStage =
  | '1_institution_registered'
  | '2_institution_verified'
  | '3_hosting_application_submitted'
  | '4_admin_review_in_progress'
  | '5_resources_allocated'
  | '6_program_and_speakers_scheduled'
  | '7_rehearsal_completed'
  | '8_live_session_active'
  | '9_attendance_verified'
  | '10_proceedings_archived';

export interface InstitutionalHostingRecord {
  id: string;
  institutionId: string;
  institutionName: string;
  institutionCategory: string;
  institutionTypeSelection?: string;
  customInstitutionType?: string;
  isCustomInstitution?: boolean;
  country?: string;
  cityRegion?: string;
  domain: string;
  website: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  verificationStatus: InstitutionalVerificationStatus;
  verifiedAt?: string;
  verificationNotes?: string;
  conferenceTitle: string;
  eventMode: EventModeId;
  proposedStart: string;
  proposedEnd: string;
  requestedDelegates: number;
  requestedSpeakers: number;
  requestedTracks: number;
  allocatedDelegates: number;
  allocatedSpeakers: number;
  allocatedTracks: number;
  allocatedStorageBytes: number;
  usedStorageBytes: number;
  hostingChargeUsd: 0;
  scientificScope: string;
  fundingDisclosure: string;
  lifecycleStage: InstitutionalLifecycleStage;
  applicationStatus: 'pending_review' | 'under_evaluation' | 'approved' | 'revisions_requested' | 'rejected' | 'suspended';
  roomId?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HallAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: HallRole | 'system';
  roomId: string;
  environmentMode: EnvironmentMode;
  action: string;
  details: string;
}
