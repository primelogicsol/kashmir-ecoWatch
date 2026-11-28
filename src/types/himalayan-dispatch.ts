// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — EXCLUSIVE EDITORIAL MAGAZINE TYPE SYSTEM & WORKFLOW
// Route-scoped environmental journalism & luxury digital periodical contracts
// ─────────────────────────────────────────────────────────────────────────────

export type EditorialDepartmentId =
  | 'cover-stories'
  | 'longform-features'
  | 'field-reports'
  | 'investigative-journalism'
  | 'photo-essays'
  | 'data-journalism'
  | 'interviews'
  | 'editorials';

export type EditorialWorkflowStage =
  | 'pitching'
  | 'assignment'
  | 'drafting'
  | 'fact_checking'
  | 'scientific_review'
  | 'editorial_approval'
  | 'scheduling'
  | 'publication'
  | 'corrections'
  | 'archiving';

export type PublicationGateStageId =
  | 'commissioned'
  | 'research_in_progress'
  | 'manuscript_draft'
  | 'evidence_verification'
  | 'scientific_review'
  | 'editorial_review'
  | 'copyright_ethics_review'
  | 'administrator_approval'
  | 'published'
  | 'post_publication_corrections';

export type PublicationGateStatus =
  | 'completed'
  | 'in_progress'
  | 'pending'
  | 'not_applicable';

export interface PublicationGateRecord {
  stageNumber: string; // '01' .. '10'
  stageId: PublicationGateStageId;
  label: string;
  status: PublicationGateStatus;
  verifiedBy?: string;
  completedAt?: string;
  notes?: string;
}

export interface StoryPublicationGateLedger {
  currentStage: PublicationGateStageId;
  currentStageNumber: string;
  publicStatusSummary: string;
  scientificReviewApplicable: boolean;
  gates: PublicationGateRecord[];
}

export type PublicProductionBadge =
  | 'In reporting'
  | 'Commissioned'
  | 'In editorial review'
  | 'In development'
  | 'Fact-checking'
  | 'Scientific review'
  | 'Scheduled for publication';

export type SourceProtectionLevel =
  | 'standard_on_record'
  | 'embargoed_pre_publication'
  | 'strict_confidential';

export interface EditorialDepartment {
  id: EditorialDepartmentId;
  name: string;
  shortLabel: string;
  folioNumber: string;
  tagline: string;
  editorialMandate: string;
  compositionStyle: string;
}

export interface StoryChapter {
  numberRoman: string;
  title: string;
  subtitle?: string;
  dateline?: string;
  paragraphs: string[];
  pullQuote?: {
    quote: string;
    attribution?: string;
    context?: string;
  };
  fieldNote?: {
    label: string;
    detail: string;
    coordinates?: string;
  };
  plate?: {
    imageUrl: string;
    caption: string;
    credit: string;
    aspect?: 'wide' | 'portrait' | 'panoramic';
    monochrome?: boolean;
  };
  commemorationLedger?: {
    heading: string;
    items: Array<{
      label: string;
      figure: string;
    }>;
    methodologicalNote: string;
    sourceNote: string;
  };
  editorialTable?: {
    kicker?: string;
    caption?: string;
    headers: [string, string];
    rows: Array<[string, string]>;
    footnote?: string;
  };
  bulletList?: string[];
}

export interface PhotoEssayPlate {
  plateRoman: string;
  title: string;
  imageUrl: string;
  location: string;
  elevation: string;
  exposureMeta: string;
  narrative: string;
}

export interface EditorialDataSeriesPoint {
  yearOrLabel: string;
  primaryValue: number;
  secondaryValue?: number;
  annotation?: string;
}

export interface EditorialDataVisualizationSpec {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  unit: string;
  chartStyle: 'snowline_horizon' | 'spring_depletion_slope' | 'inversion_profile';
  keyFindingStat: string;
  keyFindingNarrative: string;
  methodologyNote: string;
  sourceCitation: string;
  points: EditorialDataSeriesPoint[];
}

export interface InterviewExchange {
  speakerRole: 'dispatch' | 'subject';
  speakerLabel: string;
  text: string;
  editorialAnnotation?: string;
}

export interface StoryCorrectionEntry {
  id: string;
  date: string;
  kind: 'Clarification' | 'Correction' | 'Editorial Update';
  note: string;
  approvedBy: string;
}

export interface MagazineStory {
  id: string;
  slug: string;
  editionSlug: string;
  editionLabel: string;
  departmentId: EditorialDepartmentId;
  departmentRubric: string;
  folioCode: string;
  title: string;
  subtitle: string;
  excerpt: string;
  dateline: string;
  region: string;
  readingTimeMinutes: number;
  wordCount: number;
  proseWordCount?: number;
  estimatedViewingMinutes?: number;
  visualEssayMode?: 'authentic_documentary_photographs' | 'illustrative_monochrome_study';
  dialogueMode?: 'verified_spoken_interview' | 'constructed_editorial_dialogue';
  publicationGates?: StoryPublicationGateLedger;
  hasCompletedIndependentReview?: boolean;
  isAiAssisted?: boolean;
  aiAssistanceDisclosure?: string;
  conceptualFolioDisclosure?: string;
  supplementaryDatasetUrl?: string;
  supplementaryDatasetLabel?: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage: string;
  heroCaption: string;
  heroCredit: string;
  heroMonochrome?: boolean;
  journalistSlug: string;
  bylineDisplay: string;
  bylineRole: string;
  photographyByline?: string;
  factCheckedBy: string;
  scientificReviewer: string;
  workflowStage: EditorialWorkflowStage;
  isPublished: boolean;
  isFeaturedCoverStory?: boolean;
  isBigRead?: boolean;
  isVisualJournal?: boolean;
  chapters: StoryChapter[];
  photoPlates?: PhotoEssayPlate[];
  dataVisualization?: EditorialDataVisualizationSpec;
  interviewExchanges?: InterviewExchange[];
  interviewSubjectBio?: string;
  corrections: StoryCorrectionEntry[];
  relatedKewModule?: {
    label: string;
    href: string;
    scientificContext: string;
  };
  seoTitle?: string;
  seoKeywords: string[];
  secondaryDepartmentIds?: EditorialDepartmentId[];
  reportingBeatSlug?: string;
  reportingBeatLabel?: string;
  publicationStatusNote?: string;
  editorialVerificationNote?: string;
  embedGreenMartyrsRoll?: boolean;
  memorialDedication?: {
    overline: string;
    title: string;
    dedication: string;
    imprintName: string;
    imprintMotto: string;
    imprintAffiliation: string;
    imprintLocation: string;
  };
  documentarySources?: Array<{
    label: string;
    url: string;
    relevance: string;
  }>;
  editorialMetadataTable?: Array<{
    attribute: string;
    assignment: string;
  }>;
}

export interface ForthcomingAssignment {
  id: string;
  editionSlug: string;
  workingTitle: string;
  synopsis: string;
  departmentId: EditorialDepartmentId;
  departmentLabel: string;
  journalistSlug?: string;
  bylineDisplay: string; // e.g., "Journalist assignment pending" or named correspondent
  workflowStage: EditorialWorkflowStage;
  publicStageLabel: PublicProductionBadge;
  anticipatedPublicationWindow: string;
  region: string;
  // Security & Confidentiality Controls (enforced server-side)
  publicPreviewApproved: boolean;
  isConfidential: boolean;
  sourceProtectionLevel: SourceProtectionLevel;
  internalDeskNotes?: string; // NEVER exposed in public bundles
  confidentialSourceSummary?: string; // NEVER exposed in public bundles
}

export interface PublicForthcomingAssignmentPreview {
  id: string;
  editionSlug: string;
  workingTitle: string;
  synopsis: string;
  departmentId: EditorialDepartmentId;
  departmentLabel: string;
  journalistSlug?: string;
  bylineDisplay: string;
  publicStageLabel: PublicProductionBadge;
  anticipatedPublicationWindow: string;
  region: string;
}

export interface MagazineEdition {
  id: string;
  slug: string;
  volumeLabel: string; // e.g., "VOL. 01 / NO. 01"
  issueNumberLabel: string; // e.g., "THE INAUGURAL ISSUE" or "ISSUE 02"
  status: 'current' | 'forthcoming' | 'archived';
  title: string;
  themeKicker: string;
  subtitle: string;
  publicationDateLabel: string;
  publishedIsoDate?: string;
  coverImage: string;
  coverLocation: string;
  coverCaption: string;
  coverCredit: string;
  editorsNoteTitle: string;
  editorsNoteBody: string[];
  editorsNoteAuthor: string;
  editorsNoteRole: string;
  storySlugs: string[];
}

export interface JournalistProfile {
  slug: string;
  name: string;
  roleTitle: string;
  beat: string;
  basedIn: string;
  portraitUrl: string;
  shortBio: string;
  extendedBio: string[];
  languages: string[];
  awardsAndFellowships: string[];
  pgpFingerprintNote?: string;
}

export interface EditorialBoardMember {
  id: string;
  name: string;
  mastheadRole: string;
  institutionalAffiliation: string;
  disciplineOrSpecialty: string;
  location: string;
  bio: string;
  group: 'masthead_leadership' | 'scientific_review_council' | 'visual_and_fact_checking';
}

// ─── EXPANDED MASTHEAD & GOVERNANCE APPOINTMENT ARCHITECTURE ────────────────

export type MastheadAppointmentStatus =
  | 'Confirmed'
  | 'Vacant'
  | 'Proposed'
  | 'Under Review'
  | 'Visiting'
  | 'External Reviewer'
  | 'Former Member';

export type MastheadSectionId =
  | 'I_leadership'
  | 'II_commissioning'
  | 'III_visual'
  | 'IV_bureaus'
  | 'V_scientific_council'
  | 'VI_standards'
  | 'VII_legal_safety'
  | 'VIII_public_editor'
  | 'IX_digital_publishing';

export interface MastheadSectionSpec {
  id: MastheadSectionId;
  romanNumeral: string;
  kicker: string;
  directorateTitle: string;
  anchorId: string;
  governanceNote?: string;
}

export interface MastheadPositionRecord {
  id: string;
  sectionId: MastheadSectionId;
  order: number;
  roleTitle: string;
  /** Stored on server; only exposed publicly when status is Confirmed, Visiting, or External Reviewer */
  holderName: string;
  domainsRubric: string;
  mandateDescription: string;
  status: MastheadAppointmentStatus;
  /** Public fallback label when seat is Vacant, Proposed, Under Review, or Former Member */
  publicVacantLabel?: string;
  /** Optional regional bureau link for Section IV seats */
  bureauId?: 'kashmir' | 'jammu' | 'ladakh' | 'ajk' | 'gilgit' | 'baltistan';
  bureauOperationalStatus?: 'active_reporting_desk' | 'in_establishment';
  /** True for the 15-seat Multidisciplinary Scientific Review Council specialist table */
  isCouncilSpecialistRow?: boolean;
  /** Optional HTML anchor on a specific seat (e.g. #rights-permissions) */
  anchorId?: string;
  /** Optional link to public journalist portfolio slug when applicable */
  journalistSlug?: string;
  internalAdminNote?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface PublicMastheadPosition {
  id: string;
  sectionId: MastheadSectionId;
  order: number;
  roleTitle: string;
  /** Publicly verified appointee name, or Vacant / Appointment Pending when unconfirmed */
  displayHolderName: string;
  isFilledPublicly: boolean;
  /** Only populated for special active designations like Visiting; never prints Proposed */
  publicDesignationNote?: string;
  domainsRubric: string;
  mandateDescription: string;
  bureauId?: 'kashmir' | 'jammu' | 'ladakh' | 'ajk' | 'gilgit' | 'baltistan';
  bureauOperationalStatus?: 'active_reporting_desk' | 'in_establishment';
  isCouncilSpecialistRow?: boolean;
  anchorId?: string;
  journalistSlug?: string;
}

export interface EditorialCharterCommitment {
  principle: string;
  standard: string;
}

export interface EditorialPitchSubmission {
  id: string;
  trackingCode: string;
  proposedHeadline: string;
  departmentId: EditorialDepartmentId;
  region: string;
  storySummary: string;
  reportingAccessAndSources: string;
  estimatedWordCount?: string;
  authorName: string;
  authorEmail: string;
  authorPortfolioUrl?: string;
  requiresSourceProtection: boolean;
  workflowStage: EditorialWorkflowStage;
  submittedAt: string;
  reviewNotes?: string;
  journalistSlug?: string;
}

// ─── JOURNALIST RECRUITMENT, ONBOARDING & NEWSROOM WORKSPACE CONTRACTS ──────

export type ContributorTrack = 'regular_journalist' | 'specialist_contributor';

export type ContributorRoleCategoryId =
  | 'environmental-reporter'
  | 'district-correspondent'
  | 'investigative-journalist'
  | 'science-journalist'
  | 'photojournalist'
  | 'data-journalist'
  | 'documentary-filmmaker'
  | 'feature-writer'
  | 'guest-columnist'
  | 'student-journalist'
  | 'freelance-contributor'
  | 'international-correspondent';

export type ContributorEngagementBasis =
  | 'voluntary_editorial_fellow'
  | 'freelance_per_commission'
  | 'supervised_student_mentorship';

export type NewsroomApplicationStatus =
  | 'Submitted'
  | 'Under Credential Review'
  | 'Under Editorial Assessment'
  | 'Additional Information Required'
  | 'Approved'
  | 'Declined'
  | 'Withdrawn'
  | 'Suspended';

export interface ContributorRoleCategorySpec {
  id: ContributorRoleCategoryId;
  title: string;
  scopeOfWork: string;
  track: ContributorTrack;
  primaryDepartmentId: EditorialDepartmentId;
  engagementNote: string;
}

export interface OnboardingLifecycleStepSpec {
  stepNumber: string;
  title: string;
  description: string;
}

export interface PrivateCredentialAttachment {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  /** Stored only on server in non-public data/private-dispatch-credentials; never exposed publicly */
  privateStorageKey: string;
  uploadedAt: string;
}

export interface ApplicationAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  authorityTitle: string;
  fromStatus: NewsroomApplicationStatus | 'New';
  toStatus: NewsroomApplicationStatus;
  note: string;
}

export interface EditorialCorrespondenceEntry {
  id: string;
  timestamp: string;
  senderRole: 'editor' | 'journalist';
  senderName: string;
  senderTitle: string;
  message: string;
}

export interface NewsroomContributorApplication {
  id: string;
  referenceNumber: string; // e.g., HD-APP-2026-0101
  fullName: string;
  email: string;
  locationOrDistrict: string;
  kashmirDistrict?: string;
  track: ContributorTrack;
  roleCategoryId: ContributorRoleCategoryId;
  roleCategoryTitle: string;
  preferredDepartmentId: EditorialDepartmentId;
  engagementBasis: ContributorEngagementBasis;
  professionalBackground: string;
  portfolioUrl: string;
  publishedWorkNotes?: string;
  motivationStatement: string;
  languages: string[];
  charterAccepted: boolean;
  charterAcceptedAt: string;
  nonEmploymentAcknowledged: boolean;
  publicPortfolioConsent: boolean;
  status: NewsroomApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  // Server-only private credential metadata (never rendered publicly)
  credentialAttachment?: PrivateCredentialAttachment;
  // Editorial approval & workspace provisioning
  assignedJournalistSlug?: string;
  workspaceAccessCode?: string;
  approvedBy?: string;
  approvedByTitle?: string;
  approvedAt?: string;
  publicPortfolioApproved: boolean;
  applicantFacingNote?: string;
  internalEditorialNote?: string;
  auditTrail: ApplicationAuditEntry[];
  correspondence: EditorialCorrespondenceEntry[];
}

export interface PublicApplicationStatusSummary {
  referenceNumber: string;
  fullName: string;
  roleCategoryTitle: string;
  track: ContributorTrack;
  locationOrDistrict: string;
  status: NewsroomApplicationStatus;
  currentLifecycleStep: number;
  submittedAt: string;
  updatedAt: string;
  charterAccepted: boolean;
  publicPortfolioConsent: boolean;
  publicPortfolioApproved: boolean;
  assignedJournalistSlug?: string;
  workspaceAccessActive: boolean;
  /** Returned only when verified by matching email + referenceNumber upon Approved status */
  workspaceAccessCode?: string;
  approvedBy?: string;
  approvedByTitle?: string;
  approvedAt?: string;
  applicantFacingNote?: string;
  hasCredentialOnFile: boolean;
  credentialFileName?: string;
}

export interface JournalistDraftRecord {
  id: string;
  journalistSlug: string;
  workingTitle: string;
  subtitle: string;
  targetEditionSlug: string;
  departmentId: EditorialDepartmentId;
  dateline: string;
  bodyMarkdown: string;
  wordCount: number;
  workflowStage: EditorialWorkflowStage;
  updatedAt: string;
}

export interface JournalistEvidenceRecord {
  id: string;
  journalistSlug: string;
  title: string;
  sourceType: 'Scientific Study' | 'Statutory Filing / Audit' | 'Field Measurement' | 'Archival Map';
  referenceCitation: string;
  relatedStoryOrDraftTitle: string;
  isSensitiveProtected: boolean;
  loggedAt: string;
}

export interface JournalistMediaRecord {
  id: string;
  journalistSlug: string;
  title: string;
  mediaType: 'Documentary Photograph' | 'Monochrome Plate' | 'Video / Audio Field Reel' | 'Cartographic Sketch';
  locationAndElevation: string;
  captionAndEthicsNote: string;
  mediaUrl?: string;
  loggedAt: string;
}

export interface PublicationCalendarMilestone {
  id: string;
  editionLabel: string;
  editionTitle: string;
  milestone: string;
  windowLabel: string;
  gatekeeper: string;
  status: 'Open for Commissions' | 'In Production' | 'Upcoming';
}

// ─── DAILY DISPATCH, REPORTING BEATS, AUTONOMOUS NEWSROOM & PUBLIC INQUIRIES ─

export type BureauSlugId = 'kashmir' | 'jammu' | 'ladakh' | 'ajk' | 'gilgit' | 'baltistan';

export interface DailyDispatchArticle {
  id: string;
  slug: string;
  headline: string;
  standfirst: string;
  dateline: string;
  bureauId: BureauSlugId;
  bureauLabel: string;
  beatSlug: string;
  beatTitle: string;
  departmentId: EditorialDepartmentId;
  departmentLabel: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  wordCount?: number;
  hasCompletedIndependentReview?: boolean;
  bylineDisplay: string;
  journalistSlug?: string;
  factCheckedBy: string;
  scientificSourceNote: string;
  aiAssistanceDisclosure?: string;
  heroImage: string;
  heroCaption: string;
  heroCredit: string;
  keyFindings: string[];
  paragraphs: string[];
  relatedKewModule: {
    label: string;
    href: string;
    context: string;
  };
  isPublished: boolean;
  corrections: StoryCorrectionEntry[];
}

export interface ReportingBeatFullSpec {
  slug: string;
  code: string;
  title: string;
  leadDepartmentId: EditorialDepartmentId;
  leadDepartmentSlug: string;
  leadEditorRole: string;
  summary: string;
  editorialMandate: string;
  coveredBureaus: BureauSlugId[];
  keyQuestions: string[];
  kewObservatoryLabel: string;
  kewObservatoryHref: string;
}

export interface PublicCorrectionRecord {
  id: string;
  date: string;
  kind: 'Clarification' | 'Correction' | 'Editorial Update';
  note: string;
  approvedBy: string;
  sourceType: 'magazine_issue' | 'daily_dispatch';
  articleTitle: string;
  articleUrl: string;
  editionOrDeskLabel: string;
}

export type AutonomousQueueStatus =
  | 'draft_pending_approval'
  | 'scheduled'
  | 'published'
  | 'rejected'
  | 'trashed';

export interface AutonomousSourceSignal {
  id: string;
  detectedAt: string;
  sourceName: string;
  sourceCategory:
    | 'KEW Satellite Observatory'
    | 'Hydrological & Cryosphere Telemetry'
    | 'Statutory & Judicial Registry'
    | 'Atmospheric & Air-Shed Monitor'
    | 'Biodiversity & Corridor Watch';
  bureauId: BureauSlugId;
  beatSlug: string;
  headlineSignal: string;
  empiricalSummary: string;
  verificationScore: number; // 0-100 corroboration index
  corroboratingSourcesCount: number;
  kewReferenceRoute: string;
}

export interface AutonomousEditorialQueueItem {
  id: string;
  signalId?: string;
  targetChannel: 'daily_dispatch' | 'monthly_edition';
  targetEditionSlug?: string;
  bureauId: BureauSlugId;
  beatSlug: string;
  departmentId: EditorialDepartmentId;
  workingHeadline: string;
  standfirst: string;
  dateline: string;
  researchSynthesis: string;
  draftParagraphs: string[];
  verificationChecklist: string[];
  sourceCitations: string[];
  status: AutonomousQueueStatus;
  assignedJournalistSlug?: string;
  assignedJournalistName?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  publishedSlug?: string;
  editorialDecisionNote?: string;
}

export type EditorialInquiryCategory =
  | 'reader_complaint'
  | 'public_editor_petition'
  | 'correction_request'
  | 'rights_permissions'
  | 'editorial_appointment_interest'
  | 'bureau_correspondence'
  | 'general_editorial_contact';

export interface EditorialPublicInquiryRecord {
  id: string;
  trackingCode: string;
  category: EditorialInquiryCategory;
  subject: string;
  senderName: string;
  senderEmail: string;
  organizationOrLocation?: string;
  relatedArticleUrl?: string;
  bureauId?: BureauSlugId;
  positionTitle?: string;
  message: string;
  status: 'Received' | 'Under Review' | 'Resolved';
  submittedAt: string;
}

