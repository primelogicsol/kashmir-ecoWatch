// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH NEWSROOM (HDN) — OPERATING SYSTEM TYPE CONTRACTS
// Unifies Human Journalists, 18-Role RBAC, 14-Stage Editorial Workflow,
// 18-Block Magazine Article CMS, Scientific Review, Fact-Checking,
// Confidential Source Vault, Regional Bureaus & HD-ANIE Autonomous Engine
// ─────────────────────────────────────────────────────────────────────────────

import type {
  BureauSlugId,
  EditorialDepartmentId,
  SourceProtectionLevel,
  StoryCorrectionEntry,
} from './himalayan-dispatch';
import type { AnieRiskLevel } from './hd-anie';

// ─── 1. 18-ROLE NEWSROOM RBAC SYSTEM ────────────────────────────────────────

export type HdnRoleId =
  | 'founding_eic'
  | 'executive_editor'
  | 'managing_editor'
  | 'commissioning_editor'
  | 'bureau_chief'
  | 'department_editor'
  | 'senior_correspondent'
  | 'journalist'
  | 'freelance_contributor'
  | 'photojournalist'
  | 'scientific_reviewer'
  | 'fact_checker'
  | 'copy_editor'
  | 'visual_editor'
  | 'legal_reviewer'
  | 'public_editor'
  | 'system_administrator'
  | 'autonomous_ai_engine';

export type HdnPermissionKey =
  | 'workspace:journalist'
  | 'workspace:editorial'
  | 'workspace:review'
  | 'workspace:bureau'
  | 'workspace:department'
  | 'workspace:admin'
  | 'pitch:create'
  | 'pitch:evaluate'
  | 'assignment:create'
  | 'assignment:manage_all'
  | 'assignment:manage_bureau'
  | 'assignment:manage_department'
  | 'manuscript:create_own'
  | 'manuscript:edit_own'
  | 'manuscript:edit_assigned_desk'
  | 'manuscript:edit_any'
  | 'manuscript:delete_trash'
  | 'manuscript:restore_trash'
  | 'workflow:fact_check'
  | 'workflow:scientific_review'
  | 'workflow:legal_review'
  | 'workflow:copy_edit'
  | 'workflow:visual_production'
  | 'workflow:final_approve'
  | 'publication:publish'
  | 'publication:schedule'
  | 'publication:unpublish'
  | 'publication:corrections'
  | 'edition:manage'
  | 'edition:approve_release'
  | 'sources:manage_own'
  | 'sources:view_confidential_vault'
  | 'media:upload'
  | 'media:approve'
  | 'anie:operate'
  | 'anie:bulk_publish'
  | 'users:manage_roles'
  | 'users:approve_applications'
  | 'audit:view_logs';

export interface HdnRoleDefinition {
  id: HdnRoleId;
  title: string;
  tier: 'leadership' | 'editorial_desk' | 'reporting' | 'specialist_review' | 'governance_system';
  authoritySummary: string;
  defaultLandingRoute: string;
  permissions: HdnPermissionKey[];
}

export interface HdnAccountRecord {
  id: string;
  slug: string;
  fullName: string;
  email: string;
  primaryRoleTitle: string;
  roles: HdnRoleId[];
  assignedBureaus: BureauSlugId[];
  assignedDepartments: EditorialDepartmentId[];
  reportingBeats: string[];
  basedIn: string;
  shortBio: string;
  portraitUrl?: string;
  languages: string[];
  verifiedCredentials: string[];
  approvedProfessionalLinks: Array<{ label: string; url: string }>;
  accessCodeHash?: string;
  plainAccessCodeHint?: string; // Only for newly issued contributor codes in admin
  status: 'active' | 'pending_approval' | 'suspended' | 'inactive';
  charterAccepted: boolean;
  charterAcceptedAt?: string;
  contributorAgreementAccepted: boolean;
  contributorAgreementType:
    | 'founding_masthead'
    | 'voluntary_editorial_fellow'
    | 'freelance_per_commission'
    | 'scientific_review_council'
    | 'supervised_mentorship';
  publicPortfolioConsent: boolean;
  publicPortfolioApproved: boolean;
  linkedApplicationId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── 2. RECONCILED 14-STAGE LIFECYCLE & 18 WORKFLOW BOARD STATUSES ──────────

export type HdnLifecycleStageNumber =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14';

export type HdnWorkflowStatus =
  | 'assigned'
  | 'researching'
  | 'drafting'
  | 'submitted'
  | 'editorial_review'
  | 'fact_checking'
  | 'scientific_review'
  | 'legal_review'
  | 'revision_requested'
  | 'copy_editing'
  | 'visual_production'
  | 'ready_for_approval'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'rejected'
  | 'withdrawn'
  | 'archived'
  | 'trashed';

export type HdnPublicationStream = 'daily_dispatch' | 'monthly_edition';

export type HdnReviewTrack =
  | 'routine_low_risk' // Simplified gate: Editorial Review + Fact-Check -> Approval -> Publish
  | 'standard_reporting' // Fact-Checking + Copy/Visual -> Approval -> Publish
  | 'scientific_technical' // Mandatory Fact-Checking + Scientific Review -> Approval -> Publish
  | 'sensitive_investigative'; // Mandatory Fact-Checking + Scientific (if applicable) + Legal Review -> EIC/Admin Approval

export type HdnPriorityLevel = 'urgent' | 'high' | 'standard' | 'long_horizon';

// ─── 3. 18-BLOCK PROFESSIONAL MAGAZINE ARTICLE CMS ──────────────────────────

export type HdnContentBlockType =
  | 'headline_standfirst'
  | 'dateline'
  | 'rich_text'
  | 'full_bleed_photo'
  | 'photo_gallery'
  | 'pull_quote'
  | 'scientific_map'
  | 'interactive_chart'
  | 'data_table'
  | 'scientific_equation'
  | 'historical_timeline'
  | 'interview_transcript'
  | 'memorial_profile'
  | 'research_citation'
  | 'evidence_dossier'
  | 'related_kew_intelligence'
  | 'video_audio'
  | 'editorial_disclosure';

export interface HdnContentBlock {
  id: string;
  type: HdnContentBlockType;
  order: number;
  chapterRoman?: string;
  heading?: string;
  subheading?: string;
  bodyText?: string; // Paragraphs separated by blank lines
  dropCap?: boolean;
  bulletItems?: string[];
  // Dateline
  datelineLocation?: string;
  coordinates?: string;
  reportingDate?: string;
  // Photography / Gallery / Media
  mediaUrl?: string;
  caption?: string;
  credit?: string;
  license?: string;
  provenanceType?:
    | 'authentic_documentary_photograph'
    | 'kew_scientific_cartography'
    | 'archival_historical_plate'
    | 'labeled_conceptual_illustration';
  aspect?: 'wide' | 'portrait' | 'panoramic';
  monochrome?: boolean;
  galleryPlates?: Array<{
    plateRoman: string;
    title: string;
    imageUrl: string;
    location: string;
    elevation: string;
    exposureMeta: string;
    narrative: string;
  }>;
  // Pull Quote
  quoteText?: string;
  quoteAttribution?: string;
  quoteContext?: string;
  verifiedSourceId?: string;
  // Scientific Map (KEW Geospatial Intelligence)
  kewMapLayerId?:
    | 'cryosphere_glaciers'
    | 'nwia_wetlands_lakes'
    | 'landslide_susceptibility'
    | 'watershed_basins'
    | 'protected_wildlife_corridors'
    | 'atmospheric_inversion';
  mapCenterLat?: number;
  mapCenterLng?: number;
  mapZoom?: number;
  mapMethodologyNote?: string;
  // Interactive Chart
  chartStyle?: 'snowline_horizon' | 'spring_depletion_slope' | 'inversion_profile';
  chartUnit?: string;
  keyFindingStat?: string;
  keyFindingNarrative?: string;
  chartPoints?: Array<{
    yearOrLabel: string;
    primaryValue: number;
    secondaryValue?: number;
    annotation?: string;
  }>;
  // Data Table
  tableKicker?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  tableFootnote?: string;
  // Scientific Equation
  equationLatex?: string;
  equationVariables?: Array<{ symbol: string; meaning: string; unit?: string }>;
  equationExplanation?: string;
  // Historical Timeline
  timelineEvents?: Array<{
    dateOrEra: string;
    title: string;
    detail: string;
    sourceRef?: string;
  }>;
  // Interview Transcript
  interviewSubject?: string;
  interviewSubjectBio?: string;
  interviewVerificationRef?: string;
  interviewExchanges?: Array<{
    speakerRole: 'dispatch' | 'subject';
    speakerLabel: string;
    text: string;
    editorialAnnotation?: string;
  }>;
  // Memorial Profile
  memorialName?: string;
  memorialDesignation?: string;
  memorialDivisionOrRegion?: string;
  memorialYear?: string;
  memorialTribute?: string;
  memorialSourceNote?: string;
  // Research Citation / Evidence Dossier
  citationAuthors?: string;
  citationJournalOrBody?: string;
  citationYear?: string;
  citationDoi?: string;
  citationUrl?: string;
  dossierRecordIds?: string[];
  corroborationNote?: string;
  // Related KEW Intelligence
  kewModuleLabel?: string;
  kewModuleHref?: string;
  kewScientificContext?: string;
  // Video & Audio
  mediaKind?: 'documentary_video' | 'field_audio';
  durationLabel?: string;
  transcriptSummary?: string;
  consentVerified?: boolean;
  // Editorial Disclosure
  authorshipOrigin?: 'human_original' | 'human_with_ai_research' | 'autonomous_hd_anie_desk';
  aiDisclosureText?: string;
  conflictOfInterestNote?: string;
  scientificLimitationsNote?: string;
}

export interface HdnEditorialComment {
  id: string;
  blockId?: string; // Optional anchor to a specific content block
  authorSlug: string;
  authorName: string;
  authorRoleTitle: string;
  kind: 'inline_annotation' | 'editorial_comment' | 'revision_request' | 'author_response';
  message: string;
  resolved: boolean;
  resolvedBy?: string;
  createdAt: string;
}

export interface HdnManuscriptRevision {
  id: string;
  versionNumber: number;
  savedAt: string;
  saveKind: 'manual' | 'autosave' | 'workflow_transition' | 'ai_generation' | 'restored';
  actorSlug: string;
  actorName: string;
  actorRole: string;
  summary: string;
  workflowStatus: HdnWorkflowStatus;
  wordCount: number;
  headline: string;
  standfirst: string;
  blocksSnapshot: HdnContentBlock[];
}

export interface HdnArticleManuscript {
  id: string;
  slug: string;
  originType: 'human_manuscript' | 'ai_autonomous_draft' | 'canonical_magazine_story' | 'commissioned_draft';
  linkedAnieDraftId?: string;
  linkedAssignmentId?: string;
  promotedFromDailyId?: string;
  promotedToMonthlyId?: string;

  // Core Editorial Headings & Attribution
  headline: string;
  standfirst: string;
  subtitle: string;
  bylineDisplay: string;
  bylineRole: string;
  primaryAuthorSlug: string;
  coAuthorSlugs: string[];
  photographyByline?: string;
  dateline: string;
  isAiAssisted: boolean;

  // Classification & Routing
  publicationStream: HdnPublicationStream;
  targetEditionSlug: string;
  editionLabel: string;
  departmentId: EditorialDepartmentId;
  bureauId: BureauSlugId;
  reportingBeatSlug: string;
  reportingBeatLabel: string;
  articleFormat:
    | 'News Brief'
    | 'Regional Dispatch'
    | 'Scientific Explainer'
    | 'Field Report'
    | 'Longform Feature'
    | 'Cover Story'
    | 'Investigative Dossier'
    | 'Photo Essay'
    | 'Data Journalism Essay'
    | 'Interview / Q&A'
    | 'Editorial Essay';

  // Workflow, Risk & Review Gates
  lifecycleStage: HdnLifecycleStageNumber;
  workflowStatus: HdnWorkflowStatus;
  previousStatusBeforeTrash?: HdnWorkflowStatus;
  reviewTrack: HdnReviewTrack;
  riskLevel: AnieRiskLevel;
  priority: HdnPriorityLevel;
  deadlineIso?: string;
  isFeatured: boolean;
  isConfidential: boolean;

  // Required Gate Sign-offs
  factCheckRequired: boolean;
  factCheckCompleted: boolean;
  factCheckedBy?: string;
  factCheckedAt?: string;

  scientificReviewRequired: boolean;
  scientificReviewCompleted: boolean;
  scientificReviewedBy?: string;
  scientificReviewedAt?: string;

  legalReviewRequired: boolean;
  legalReviewCompleted: boolean;
  legalReviewedBy?: string;
  legalReviewedAt?: string;

  copyEditCompleted: boolean;
  copyEditedBy?: string;

  visualProductionCompleted: boolean;
  visualApprovedBy?: string;

  finalApprovedBy?: string;
  finalApprovedAt?: string;

  // Structured Content Blocks
  heroImage: string;
  heroCaption: string;
  heroCredit: string;
  heroLicense: string;
  heroProvenance: HdnContentBlock['provenanceType'];
  heroMonochrome?: boolean;
  blocks: HdnContentBlock[];

  // Linked Verification, Disclosures & KEW Modules
  scientificLimitations: string[];
  editorialDisclosure: string;
  conflictOfInterestDisclosure: string;
  sourceReferenceIds: string[];
  relatedArticleSlugs: string[];
  relatedKewModules: Array<{
    label: string;
    href: string;
    scientificContext: string;
  }>;

  // Metrics & SEO
  wordCount: number;
  readingTimeMinutes: number;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  seoKeywords: string[];

  // Concurrency, Revisions, Comments & Corrections
  versionNumber: number;
  activeEditorSlug?: string;
  activeEditorLeaseUntil?: string;
  autoSavedAt?: string;
  createdAt: string;
  updatedAt: string;
  scheduledPublicationAt?: string;
  publishedAt?: string;
  unpublishedAt?: string;
  trashedAt?: string;
  comments: HdnEditorialComment[];
  revisions: HdnManuscriptRevision[];
  corrections: StoryCorrectionEntry[];
}

// ─── 4. FULL 17-FIELD EDITORIAL COMMISSIONING & ASSIGNMENT RECORD ───────────

export interface HdnAssignmentHistoryEntry {
  id: string;
  timestamp: string;
  actorName: string;
  action: string;
  note: string;
}

export interface HdnAssignmentMessage {
  id: string;
  timestamp: string;
  senderSlug: string;
  senderName: string;
  senderRoleTitle: string;
  message: string;
}

export interface HdnEditorialAssignment {
  id: string;
  title: string;
  editorialBrief: string;
  assignedJournalistSlug: string;
  assignedJournalistName: string;
  responsibleEditorSlug: string;
  responsibleEditorName: string;
  bureauId: BureauSlugId;
  departmentId: EditorialDepartmentId;
  reportingBeatSlug: string;
  expectedDeliverables: string[];
  targetWordCount: number;
  researchRequirements: string;
  scientificReviewRequired: boolean;
  scientificReviewNotes?: string;
  mediaRequirements: string;
  deadlineIso: string;
  priority: HdnPriorityLevel;
  publicationStream: HdnPublicationStream;
  proposedEditionSlug: string;
  status:
    | 'commissioned'
    | 'accepted'
    | 'researching'
    | 'drafting'
    | 'submitted'
    | 'completed'
    | 'reassigned'
    | 'cancelled';
  isConfidential: boolean;
  sourceProtectionLevel: SourceProtectionLevel;
  publicPreviewApproved: boolean;
  linkedManuscriptId?: string;
  linkedAnieDossierId?: string;
  correspondence: HdnAssignmentMessage[];
  history: HdnAssignmentHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

// ─── 5. SCIENTIFIC REVIEW WORKSPACE CONTRACTS ───────────────────────────────

export interface HdnScientificClaimCheck {
  id: string;
  claimExcerpt: string;
  assessmentStatus: 'supported' | 'requires_qualification' | 'unsupported_remove' | 'methodology_unclear';
  supportingDoiOrRef?: string;
  reviewerComment: string;
}

export interface HdnScientificReviewRecord {
  id: string;
  manuscriptId: string;
  manuscriptTitle: string;
  assignedReviewerSlug: string;
  assignedReviewerName: string;
  assignedBy: string;
  assignedAt: string;
  status: 'assigned' | 'in_progress' | 'completed';
  claimAssessments: HdnScientificClaimCheck[];
  supportingReferences: string[];
  methodologicalComments: string;
  statisticalVerificationStatus: 'verified' | 'not_applicable' | 'revision_needed';
  statisticalNotes: string;
  geospatialVerificationStatus: 'verified' | 'not_applicable' | 'revision_needed';
  geospatialNotes: string;
  uncertaintyAssessment: string;
  conflictOfInterestDeclared: boolean;
  conflictOfInterestDetails: string;
  recommendation?: 'approve' | 'minor_revisions' | 'major_revisions' | 'reject';
  completedAt?: string;
}

// ─── 6. FACT-CHECKING & CONFIDENTIAL SOURCE VAULT CONTRACTS ─────────────────

export interface HdnFactCheckRecord {
  id: string;
  claimIdentifier: string; // e.g. FC-2026-001
  manuscriptId: string;
  manuscriptTitle: string;
  claimAssertion: string;
  sourceClassification:
    | 'primary_documentary'
    | 'peer_reviewed_scientific'
    | 'kew_observatory_baseline'
    | 'independent_corroboration'
    | 'syndicated_single_origin'
    | 'unverified';
  supportingSourceLabel: string;
  sourceUrl: string;
  sourcePublicationDate: string;
  documentaryEvidenceNote: string;
  verificationStatus: 'verified' | 'partially_verified' | 'disputed' | 'unverified_hold';
  conflictingEvidenceNote?: string;
  reviewerSlug: string;
  reviewerName: string;
  reviewedAt: string;
  requiredCorrections?: string;
  resolutionStatus: 'open' | 'resolved' | 'claim_removed';
}

export interface HdnConfidentialSourceRecord {
  id: string;
  codeName: string; // e.g., "SOURCE-KASHMIR-HYDRO-04"
  ownerJournalistSlug: string;
  ownerJournalistName: string;
  bureauId: BureauSlugId;
  linkedAssignmentId?: string;
  linkedManuscriptId?: string;
  confidentialityLevel: SourceProtectionLevel;
  publicDescription: string; // Safe description visible in editorial summaries (e.g., "Municipal watershed engineer")
  restrictedNotes: string; // Strictly encrypted/gated server-side; NEVER sent to scientific reviewers or public APIs
  consentRecorded: boolean;
  consentScopeNote: string;
  retentionPolicy: 'retain_encrypted_archive' | 'purge_upon_publication' | 'purge_90_days';
  interviewRecords: Array<{
    id: string;
    interviewDate: string;
    mode: 'in_person_field' | 'encrypted_voice' | 'written_affidavit' | 'on_the_record';
    permissionStatus: 'on_record' | 'on_background' | 'deep_background_unattributed';
    summaryNotes: string;
  }>;
  authorizedViewerSlugs: string[];
  accessAuditTrail: Array<{
    timestamp: string;
    actorSlug: string;
    actorRole: string;
    action: 'created' | 'viewed_restricted' | 'updated' | 'interview_logged';
  }>;
  createdAt: string;
  updatedAt: string;
}

// ─── 7. VISUAL JOURNALISM MEDIA ASSET & MONTHLY EDITION BUILDER ─────────────

export interface HdnMediaAsset {
  id: string;
  title: string;
  mediaType:
    | 'documentary_photograph'
    | 'photo_gallery_plate'
    | 'archival_photograph'
    | 'scientific_map'
    | 'editorial_chart'
    | 'conceptual_illustration'
    | 'audio_recording'
    | 'video_documentary';
  url: string;
  caption: string;
  photographerOrCreator: string;
  contributorSlug: string;
  bureauId: BureauSlugId;
  locationAndElevation: string;
  licensingInfo: string;
  consentRecorded: boolean;
  provenanceClassification:
    | 'authentic_documentary_unmodified'
    | 'kew_verified_cartography'
    | 'archival_historical_scan'
    | 'ai_or_conceptual_labeled';
  editorialApprovalStatus: 'pending_review' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: string;
  /** Restricted Administrative Visual Governance Metadata (never rendered on public decorative surfaces) */
  generationWorkflow?: string;
  c2paSynthIdDetected?: boolean;
  exifPresent?: boolean;
  evidentiarySuitability?:
    | 'decorative_editorial_only'
    | 'illustrative_study_with_clarification'
    | 'verified_documentary_evidence'
    | 'verified_cartographic_graphic';
  publicCaptionPolicyNote?: string;
  usedInStorySlugs?: string[];
}

export interface HdnMonthlyEditionRecord {
  id: string;
  slug: string;
  volumeNumber: number;
  issueNumber: number;
  volumeLabel: string;
  issueNumberLabel: string;
  themeTitle: string;
  themeKicker: string;
  editionIntroduction: string;
  coverManuscriptId?: string;
  coverStorySlug?: string;
  coverImage: string;
  coverLocation: string;
  coverCaption: string;
  coverCredit: string;
  editorsLetter: {
    title: string;
    paragraphs: string[];
    authorName: string;
    authorRole: string;
    approvedByFoundingEic: boolean;
    approvedAt?: string;
  };
  orderedManuscriptIds: string[];
  orderedStorySlugs: string[];
  visualEssaySlugs: string[];
  contributorCredits: string[];
  scheduledReleaseDate?: string;
  publishedIsoDate?: string;
  status: 'planning' | 'in_production' | 'ready_for_approval' | 'current' | 'archived';
  readinessPercent: number;
  approvedBy?: string;
  updatedAt: string;
}

// ─── 8. NOTIFICATIONS, EDITORIAL ANNOUNCEMENTS & AUDIT LOG ──────────────────

export interface HdnNotificationItem {
  id: string;
  recipientSlug: string | 'all_editors' | 'all_newsroom';
  category:
    | 'assignment'
    | 'revision_request'
    | 'scientific_review'
    | 'publication'
    | 'deadline'
    | 'announcement';
  title: string;
  body: string;
  href: string;
  readBySlugs: string[];
  createdAt: string;
}

export interface HdnAuditLogRecord {
  id: string;
  timestamp: string;
  actorSlug: string;
  actorName: string;
  actorRoles: HdnRoleId[];
  category:
    | 'authentication'
    | 'rbac_security'
    | 'manuscript_cms'
    | 'workflow_gate'
    | 'publication'
    | 'confidential_source_access'
    | 'scientific_review'
    | 'assignment'
    | 'edition_builder'
    | 'autonomous_engine';
  action: string;
  targetId?: string;
  targetLabel?: string;
  details: string;
}

export interface HdnPersistentStore {
  schemaVersion: number;
  accounts: HdnAccountRecord[];
  manuscripts: HdnArticleManuscript[];
  assignments: HdnEditorialAssignment[];
  scientificReviews: HdnScientificReviewRecord[];
  factChecks: HdnFactCheckRecord[];
  confidentialSources: HdnConfidentialSourceRecord[];
  mediaAssets: HdnMediaAsset[];
  editions: HdnMonthlyEditionRecord[];
  notifications: HdnNotificationItem[];
  auditLogs: HdnAuditLogRecord[];
}
