// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — CLIENT-SAFE CORRESPONDENCE TYPES & SPECIFICATIONS
// Pure TypeScript types and immutable specifications with zero server/DB imports
// so client components bundle cleanly under Next.js 16 Turbopack.
// ─────────────────────────────────────────────────────────────────────────────

export const CORRESPONDENCE_THREAD_COOKIE = 'hd_corr_thread_session';

export type CorrespondenceCategoryId =
  | 'general_inquiry'
  | 'institutional_correspondence'
  | 'story_proposal'
  | 'investigative_information'
  | 'scientific_inquiry'
  | 'media_inquiry'
  | 'correction_request'
  | 'reader_complaint'
  | 'copyright_permissions'
  | 'regional_correspondence'
  | 'confidential_communication';

export type CorrespondenceStatus =
  | 'unread'
  | 'under_review'
  | 'assigned'
  | 'awaiting_response'
  | 'responded'
  | 'resolved'
  | 'archived';

export type CorrespondencePriority = 'low' | 'standard' | 'high' | 'urgent';

export type CorrespondenceRegion =
  | 'Kashmir'
  | 'Jammu'
  | 'Ladakh'
  | 'Azad Jammu & Kashmir'
  | 'Gilgit'
  | 'Baltistan'
  | 'Multi-Regional / Transboundary'
  | 'International / Outside Region';

export const CORRESPONDENCE_REGIONS: CorrespondenceRegion[] = [
  'Kashmir',
  'Jammu',
  'Ladakh',
  'Azad Jammu & Kashmir',
  'Gilgit',
  'Baltistan',
  'Multi-Regional / Transboundary',
  'International / Outside Region',
];

export interface CorrespondenceCategorySpec {
  id: CorrespondenceCategoryId;
  label: string;
  receivingDepartment: string;
  deskCode: string;
  isConfidentialDefault: boolean;
  description: string;
}

export const CORRESPONDENCE_CATEGORIES: CorrespondenceCategorySpec[] = [
  {
    id: 'general_inquiry',
    label: 'General editorial inquiry',
    receivingDepartment: 'Editorial Directorate',
    deskCode: 'editorial_directorate',
    isConfidentialDefault: false,
    description: 'General editorial questions, letters to the editors, and publication inquiries.',
  },
  {
    id: 'institutional_correspondence',
    label: 'Institutional correspondence',
    receivingDepartment: 'Editorial Affairs',
    deskCode: 'institutional_correspondence',
    isConfidentialDefault: false,
    description: 'Official communication from universities, agencies, courts, NGOs, and statutory bodies.',
  },
  {
    id: 'story_proposal',
    label: 'Story proposal',
    receivingDepartment: 'Commissioning & Pitch Desk',
    deskCode: 'commissioning_pitch',
    isConfidentialDefault: false,
    description: 'Commissioning proposals, reporting concepts, and contributor inquiries.',
  },
  {
    id: 'investigative_information',
    label: 'Investigative information',
    receivingDepartment: 'Investigative Desk',
    deskCode: 'investigative_desk',
    isConfidentialDefault: false,
    description: 'Documentary filings, public-interest records, and corroborating investigative leads.',
  },
  {
    id: 'scientific_inquiry',
    label: 'Scientific inquiry',
    receivingDepartment: 'Scientific Review',
    deskCode: 'scientific_review',
    isConfidentialDefault: false,
    description: 'Methodological questions, peer-review dialogue, dataset inquiries, and technical critiques.',
  },
  {
    id: 'media_inquiry',
    label: 'Media and publication inquiry',
    receivingDepartment: 'Publishing Office',
    deskCode: 'editorial_directorate',
    isConfidentialDefault: false,
    description: 'Press inquiries, citations, academic symposium invitations, and circulation matters.',
  },
  {
    id: 'correction_request',
    label: 'Correction request',
    receivingDepartment: 'Corrections & Clarifications',
    deskCode: 'corrections_clarifications',
    isConfidentialDefault: false,
    description: 'Factual error reports, empirical updates, and right-of-reply requests on published work.',
  },
  {
    id: 'reader_complaint',
    label: 'Reader complaint',
    receivingDepartment: 'Public Editor & Ombudsperson',
    deskCode: 'reader_complaints',
    isConfidentialDefault: false,
    description: 'Formal Editorial Charter complaints, fairness reviews, and conflict-of-interest concerns.',
  },
  {
    id: 'copyright_permissions',
    label: 'Copyright and permissions',
    receivingDepartment: 'Rights & Permissions',
    deskCode: 'editorial_directorate',
    isConfidentialDefault: false,
    description: 'Reprint, translation, archival licensing, and intellectual property correspondence.',
  },
  {
    id: 'regional_correspondence',
    label: 'Regional correspondence',
    receivingDepartment: 'Relevant Regional Bureau',
    deskCode: 'regional_bureau',
    isConfidentialDefault: false,
    description: 'Region-specific communication routed to Kashmir, Jammu, Ladakh, AJ&K, Gilgit, or Baltistan desks.',
  },
  {
    id: 'confidential_communication',
    label: 'Confidential communication',
    receivingDepartment: 'Restricted Source Protection Desk',
    deskCode: 'restricted_source_protection',
    isConfidentialDefault: true,
    description: 'Restricted preliminary coordination for sensitive disclosures; never upload raw Tier III files via web forms.',
  },
];

export interface KewGatewayFacilitySpec {
  id: string;
  title: string;
  description: string;
  kewPath: string;
  trackingPrefix: string;
  supportsEditorialConsent: boolean;
}

export const KEW_ENVIRONMENTAL_GATEWAY_FACILITIES: KewGatewayFacilitySpec[] = [
  {
    id: 'submit-investigation',
    title: 'Submit Investigation',
    description:
      'Propose a scientifically scoped environmental investigation dossier with traceable statutory, judicial, or satellite references.',
    kewPath: '/environmental-investigations/submit',
    trackingPrefix: 'KEW-INV',
    supportsEditorialConsent: true,
  },
  {
    id: 'report-environmental-issue',
    title: 'Report Environmental Issue',
    description:
      'Report pollution discharges, wetland encroachment, forest fires, illegal dumping, fish mortality, or ecological hazards.',
    kewPath: '/report-issue',
    trackingPrefix: 'KEW-INC',
    supportsEditorialConsent: true,
  },
  {
    id: 'submit-observation',
    title: 'Submit Observation',
    description:
      'Log georeferenced wildlife sightings, botanical records, spring conditions, or seasonal phenology observations.',
    kewPath: '/submit-observation',
    trackingPrefix: 'KEW-OBS',
    supportsEditorialConsent: true,
  },
  {
    id: 'share-environmental-data',
    title: 'Share Environmental Data',
    description:
      'Contribute structured hydrological, atmospheric, cryospheric, or biodiversity datasets aligned with open scientific standards.',
    kewPath: '/share-data',
    trackingPrefix: 'KEW-DAT',
    supportsEditorialConsent: true,
  },
  {
    id: 'submit-sectoral-assessment',
    title: 'Submit Sectoral Assessment',
    description:
      'Initiate a standardized 9-step Sectoral Environmental Impact Assessment (SEIAE) across key regional sectors.',
    kewPath: '/sectoral-eia/assessment/new',
    trackingPrefix: 'SEIAE',
    supportsEditorialConsent: true,
  },
  {
    id: 'join-citizen-science',
    title: 'Join Citizen Science',
    description:
      'Participate in structured community water-quality, phenology, bird-count, and Chinar monitoring cohorts.',
    kewPath: '/join-citizen-science',
    trackingPrefix: 'KEW-PRG',
    supportsEditorialConsent: false,
  },
  {
    id: 'become-data-contributor',
    title: 'Become a Data Contributor',
    description:
      'Apply for accredited sensor, laboratory, or field-station contributor status within the KEW network.',
    kewPath: '/become-data-contributor',
    trackingPrefix: 'KEW-ACR',
    supportsEditorialConsent: false,
  },
  {
    id: 'become-research-partner',
    title: 'Become a Research Partner',
    description:
      'Establish institutional research collaborations, university MoUs, and joint basin monitoring initiatives.',
    kewPath: '/become-research-partner',
    trackingPrefix: 'KEW-PAR',
    supportsEditorialConsent: false,
  },
  {
    id: 'submit-creative-work',
    title: 'Submit Creative Work',
    description:
      'Share environmental poetry, music, visual art, and oral ecological heritage through KEW EcoVoices.',
    kewPath: '/ecovoices#submit',
    trackingPrefix: 'KEW-ECV',
    supportsEditorialConsent: false,
  },
  {
    id: 'volunteer-contribute',
    title: 'Volunteer & Contribute',
    description:
      'Join field restoration, translation, GIS verification, and environmental education stewardship teams.',
    kewPath: '/get-involved/volunteer',
    trackingPrefix: 'KEW-VOL',
    supportsEditorialConsent: false,
  },
];

export const KEW_EDITORIAL_CONSIDERATION_CONSENT_TEXT =
  'I authorize Kashmir EcoWatch to make relevant portions of this submission available to authorized Himalayan Dispatch editors for possible scientific review, investigative reporting or editorial consideration, subject to applicable privacy and source protection policies.';

export function buildKewGatewayDestinationUrl(
  kewPath: string,
  toKewUrl: (path: string) => string
): string {
  const [beforeHash, hashPart] = kewPath.split('#');
  const separator = beforeHash.includes('?') ? '&' : '?';
  const withOrigin = `${beforeHash}${separator}origin=himalayan-dispatch${
    hashPart ? `#${hashPart}` : ''
  }`;
  return toKewUrl(withOrigin);
}

export interface AttachmentMetadataItem {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
}

export interface CorrespondenceThreadMessageView {
  id: string;
  senderType: 'correspondent' | 'editorial_desk' | 'system';
  senderLabel: string;
  messageKind: string;
  body: string;
  attachments: AttachmentMetadataItem[];
  createdAt: string;
}

export interface PublicCorrespondenceThreadView {
  referenceNumber: string;
  category: string;
  categoryLabel: string;
  receivingDepartment: string;
  assignedDepartment: string;
  assignedBureau: string | null;
  region: string;
  subject: string;
  status: CorrespondenceStatus;
  priority: CorrespondencePriority;
  isConfidential: boolean;
  createdAt: string;
  updatedAt: string;
  respondedAt: string | null;
  resolvedAt: string | null;
  messages: CorrespondenceThreadMessageView[];
}

export type EditorialCorrespondenceFilterViewId =
  | 'all'
  | 'editorial_directorate'
  | 'investigative_desk'
  | 'scientific_review'
  | 'institutional_correspondence'
  | 'corrections_clarifications'
  | 'reader_complaints'
  | 'commissioning_pitch'
  | 'regional_bureau'
  | 'restricted_source_protection'
  | 'authorized_kew_evidence'
  | 'email_alias_architecture'
  | 'archived'
  | 'audit_logs';

export const EDITORIAL_CORRESPONDENCE_FILTER_VIEWS: Array<{
  id: EditorialCorrespondenceFilterViewId;
  label: string;
}> = [
  { id: 'all', label: 'All Correspondence' },
  { id: 'editorial_directorate', label: 'Editorial Directorate' },
  { id: 'investigative_desk', label: 'Investigative Desk' },
  { id: 'scientific_review', label: 'Scientific Review' },
  { id: 'institutional_correspondence', label: 'Institutional Correspondence' },
  { id: 'corrections_clarifications', label: 'Corrections & Clarifications' },
  { id: 'reader_complaints', label: 'Reader Complaints' },
  { id: 'commissioning_pitch', label: 'Commissioning & Pitch Desk' },
  { id: 'regional_bureau', label: 'Regional Bureau Correspondence' },
  { id: 'restricted_source_protection', label: 'Restricted Source Protection' },
  { id: 'authorized_kew_evidence', label: 'Authorized KEW Evidence' },
  { id: 'email_alias_architecture', label: 'Email Alias Architecture (19)' },
  { id: 'archived', label: 'Archived Correspondence' },
  { id: 'audit_logs', label: 'Audit & Activity Logs' },
];

// ─── PROPOSED 19-ALIAS CENTRALIZED EMAIL ROUTING ARCHITECTURE ────────────────
// Proposed aliases (not yet configured/verified on the mail server; hidden from
// public pages while retaining the web-based Contact the Editorial Desk portal).

export const CENTRALIZED_RECEIVING_MAILBOX = 'contact@kashmir-ecowatch.com' as const;

export interface DispatchEmailAliasSpec {
  alias: string;
  departmentOrBureau: string;
  group: 'departmental' | 'regional_bureau';
  forwardsTo: typeof CENTRALIZED_RECEIVING_MAILBOX;
  mappedDeskCode: string;
  mappedBureauSlug: string | null;
  sendAsIdentityCandidate: boolean;
  mailServerStatus: 'proposed_unverified';
  publiclyDisplayed: false;
}

export const PROPOSED_DISPATCH_EMAIL_ALIASES: DispatchEmailAliasSpec[] = [
  // 13 Institutional & Departmental Aliases
  {
    alias: 'himalayandispatch@kashmir-ecowatch.com',
    departmentOrBureau: 'Primary institutional correspondence',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'institutional_correspondence',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'editorial@kashmir-ecowatch.com',
    departmentOrBureau: 'Editorial Directorate',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'editorial_directorate',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'newsroom@kashmir-ecowatch.com',
    departmentOrBureau: 'Newsroom Desk',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'editorial_directorate',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'investigations@kashmir-ecowatch.com',
    departmentOrBureau: 'Investigative Desk',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'investigative_desk',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'scientificreview@kashmir-ecowatch.com',
    departmentOrBureau: 'Scientific Review',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'scientific_review',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'submissions@kashmir-ecowatch.com',
    departmentOrBureau: 'Editorial submissions',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'commissioning_pitch',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'corrections@kashmir-ecowatch.com',
    departmentOrBureau: 'Corrections & Clarifications',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'corrections_clarifications',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'ombudsman@kashmir-ecowatch.com',
    departmentOrBureau: 'Public Editor & Ombudsperson',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'reader_complaints',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'publishing@kashmir-ecowatch.com',
    departmentOrBureau: 'Publishing Office',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'editorial_directorate',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'press@kashmir-ecowatch.com',
    departmentOrBureau: 'Media Relations',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'editorial_directorate',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'permissions@kashmir-ecowatch.com',
    departmentOrBureau: 'Rights & Permissions',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'editorial_directorate',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'recruitment@kashmir-ecowatch.com',
    departmentOrBureau: 'Editorial Recruitment',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'institutional_correspondence',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'correspondence@kashmir-ecowatch.com',
    departmentOrBureau: 'Correspondence Center',
    group: 'departmental',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'editorial_directorate',
    mappedBureauSlug: null,
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  // 6 Regional Bureau Aliases
  {
    alias: 'kashmir.bureau@kashmir-ecowatch.com',
    departmentOrBureau: 'Kashmir Bureau',
    group: 'regional_bureau',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'regional_bureau',
    mappedBureauSlug: 'kashmir',
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'jammu.bureau@kashmir-ecowatch.com',
    departmentOrBureau: 'Jammu Bureau',
    group: 'regional_bureau',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'regional_bureau',
    mappedBureauSlug: 'jammu',
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'ladakh.bureau@kashmir-ecowatch.com',
    departmentOrBureau: 'Ladakh Bureau',
    group: 'regional_bureau',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'regional_bureau',
    mappedBureauSlug: 'ladakh',
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'ajk.bureau@kashmir-ecowatch.com',
    departmentOrBureau: 'AJ&K Bureau',
    group: 'regional_bureau',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'regional_bureau',
    mappedBureauSlug: 'ajk',
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'gilgit.bureau@kashmir-ecowatch.com',
    departmentOrBureau: 'Gilgit Bureau',
    group: 'regional_bureau',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'regional_bureau',
    mappedBureauSlug: 'gilgit',
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
  {
    alias: 'baltistan.bureau@kashmir-ecowatch.com',
    departmentOrBureau: 'Baltistan Bureau',
    group: 'regional_bureau',
    forwardsTo: CENTRALIZED_RECEIVING_MAILBOX,
    mappedDeskCode: 'regional_bureau',
    mappedBureauSlug: 'baltistan',
    sendAsIdentityCandidate: true,
    mailServerStatus: 'proposed_unverified',
    publiclyDisplayed: false,
  },
];

export const CONFIDENTIAL_EMAIL_EXCLUSION_RULE =
  'Confidential source communications must NEVER be forwarded into contact@kashmir-ecowatch.com. They require separately restricted, security-reviewed infrastructure.';

export function classifyByOriginalRecipientAlias(
  rawRecipientEmail: string
): DispatchEmailAliasSpec | null {
  const clean = String(rawRecipientEmail || '').trim().toLowerCase();
  if (!clean) return null;
  return PROPOSED_DISPATCH_EMAIL_ALIASES.find((a) => a.alias === clean) || null;
}

export interface AdminCorrespondenceRecord {
  id: string;
  referenceNumber: string;
  category: string;
  categoryLabel: string;
  receivingDepartment: string;
  deskCode: string;
  region: string;
  assignedBureau: string | null;
  assignedDepartment: string;
  assignedEditorSlug: string | null;
  senderName: string;
  senderEmail: string;
  affiliation: string | null;
  relatedArticleUrl: string | null;
  subject: string;
  priority: CorrespondencePriority;
  status: CorrespondenceStatus;
  isRead: boolean;
  isConfidential: boolean;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  respondedAt: string | null;
  resolvedAt: string | null;
  archivedAt: string | null;
  messages: CorrespondenceThreadMessageView[];
}

export interface AdminCorrespondenceBundle {
  actor: {
    slug: string;
    name: string;
    roleSummary: string;
    authChannel: 'hdn_editorial_session' | 'hd_journalist_session' | 'kew_general_admin' | 'none';
    canViewConfidentialSourceDesk: boolean;
    canApproveKewEvidenceExchange: boolean;
  };
  counters: {
    totalReceived: number;
    unread: number;
    underReview: number;
    assigned: number;
    awaitingResponse: number;
    responded: number;
    resolved: number;
    confidential: number;
    archived: number;
  };
  records: AdminCorrespondenceRecord[];
  consentedKewSubmissions: Array<{
    trackingId: string;
    sourcePage: string;
    sourceLabel: string;
    title: string;
    category: string;
    district: string;
    originatingPlatform: string;
    editorialConsiderationConsent: boolean;
    isAnonymous: boolean;
    contributorLabel: string;
    summaryText: string;
    createdAt: string;
  }>;
  evidenceExchangeRequests: Array<{
    id: string;
    kewTrackingId: string;
    kewSourcePage: string;
    submissionTitle: string;
    district: string;
    contributorConsentVerified: boolean;
    requestedBySlug: string;
    requestedByName: string;
    requestPurpose: string;
    approvalStatus: string;
    approvedBySlug: string | null;
    approvedByName: string | null;
    editorialNotes: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  auditLogs: Array<{
    id: string;
    actorSlug: string;
    actorName: string;
    actorRoleSummary: string;
    action: string;
    targetReference: string | null;
    details: string;
    createdAt: string;
  }>;
}
