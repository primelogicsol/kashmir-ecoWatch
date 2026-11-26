// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH AUTONOMOUS NEWSROOM INTELLIGENCE ENGINE (HD-ANIE)
// Type Contracts: Dual Publication Streams, Source Discovery, Evidence Dossiers,
// KEW RAG Integration, Risk Governance, Editorial Workspace & Persistent Worker
// ─────────────────────────────────────────────────────────────────────────────

import {
  EditorialDataVisualizationSpec,
  EditorialDepartmentId,
  StoryChapter,
  StoryCorrectionEntry,
} from './himalayan-dispatch';

export type AniePublicationStream = 'daily_dispatch' | 'monthly_edition';

export type AnieBureauId =
  | 'kashmir'
  | 'jammu'
  | 'ladakh'
  | 'ajk'
  | 'gilgit'
  | 'baltistan'
  | 'western-himalayas'
  | 'international';

export type AnieSourceCategory =
  | 'regional_news'
  | 'international_media'
  | 'scientific_repository'
  | 'earth_observation'
  | 'climate_meteorology'
  | 'biodiversity_wetlands'
  | 'government_regulatory'
  | 'university_research'
  | 'civil_society_ngo'
  | 'global_discovery_index';

export type AnieRetrievalMethod =
  | 'rss_atom'
  | 'gdelt_doc_api'
  | 'openalex_api'
  | 'crossref_api'
  | 'news_sitemap'
  | 'institutional_json';

export type AnieRiskLevel = 'GREEN' | 'AMBER' | 'RED';

export type AnieEditorialStatus =
  | 'awaiting_review'
  | 'in_scientific_review'
  | 'in_legal_review'
  | 'scheduled'
  | 'published'
  | 'unpublished'
  | 'rejected'
  | 'trashed';

export type AnieEngineMode = 'running' | 'paused' | 'emergency_stop';

export interface AnieSourceFailureEntry {
  timestamp: string;
  httpStatus?: number;
  reason: string;
}

export interface AnieSourceRecord {
  id: string;
  name: string;
  domain: string;
  category: AnieSourceCategory;
  geographicalCoverage: AnieBureauId[];
  language: 'en' | 'ur' | 'ks' | 'hi' | 'multilingual';
  retrievalMethod: AnieRetrievalMethod;
  endpointUrl: string;
  accessPermissions: 'public_feed' | 'open_scientific_api' | 'public_index_metadata';
  copyrightAndLicense: string;
  robotsPolicyStatus: 'permitted' | 'unchecked' | 'restricted_blocked';
  reliabilityScore: number; // 0 - 100
  pollFrequencyMinutes: number;
  lastCheckedAt?: string;
  lastSuccessfulRetrievalAt?: string;
  lastHttpStatus?: number;
  consecutiveFailures: number;
  failureHistory: AnieSourceFailureEntry[];
  totalSignalsDiscovered: number;
  active: boolean;
  discoveredAutomatically?: boolean;
}

export interface AnieMonitoringDomainSpec {
  id: string;
  label: string;
  subjects: string[];
  keywords: string[];
  kewModuleLabel: string;
  kewModuleHref: string;
  leadDepartmentId: EditorialDepartmentId;
  reportingBeatCode: string;
}

export interface AnieRawSignal {
  id: string;
  canonicalUrl: string;
  urlHash: string;
  syndicationFingerprint: string;
  sourceId: string;
  sourceName: string;
  sourceDomain: string;
  sourceCategory: AnieSourceCategory;
  sourceReliability: number;
  originalLanguage: string;
  detectedScripts: string[];
  rawTitle: string;
  sanitizedSummary: string;
  translatedTitleNote?: string;
  authors: string[];
  doi?: string;
  publishedAt: string;
  estimatedEventDate: string;
  retrievedAt: string;
  licenseRestriction: string;
  detectedBureaus: AnieBureauId[];
  detectedDistricts: string[];
  detectedWatersheds: string[];
  monitoringDomainIds: string[];
  matchedToponyms: string[];
  environmentalRelevanceScore: number;
  status: 'accepted' | 'rejected_irrelevant' | 'rejected_duplicate';
  rejectionReason?: string;
  clusterId?: string;
}

export interface AnieClusterScorecard {
  environmentalRelevance: number;
  geographicalRelevance: number;
  publicInterestSignificance: number;
  scientificSignificance: number;
  freshness: number;
  sourceQuality: number;
  independentCorroboration: number;
  originalityPotential: number;
  evidenceCompleteness: number;
  environmentalRiskSignificance: number;
  editionRelevance: number;
  legalEthicalSensitivity: number;
  compositePriorityScore: number;
}

export interface AnieStoryCluster {
  id: string;
  clusterKey: string;
  canonicalTopic: string;
  primaryBureau: AnieBureauId;
  secondaryBureaus: AnieBureauId[];
  districts: string[];
  watersheds: string[];
  monitoringDomainIds: string[];
  signalIds: string[];
  sourceDomains: string[];
  independentSourceFamilyCount: number;
  earliestEventDate: string;
  firstReportedAt: string;
  latestSignalAt: string;
  scorecard: AnieClusterScorecard;
  recommendedStream: AniePublicationStream;
  recommendedDepartmentId: EditorialDepartmentId;
  status: 'queued_for_research' | 'drafted' | 'held_insufficient_evidence' | 'rejected';
  draftId?: string;
}

export interface AnieEvidenceSourceItem {
  sourceId: string;
  signalId: string;
  url: string;
  publicationTitle: string;
  publisherName: string;
  authors: string[];
  publishedAt: string;
  eventDate: string;
  retrievedAt: string;
  sourceCategory: AnieSourceCategory;
  originalLanguage: string;
  supportingExcerpt: string;
  doi?: string;
  doiVerified?: boolean;
  httpReachable?: boolean;
  verificationStatus: 'verified_primary' | 'verified_secondary' | 'pending_recheck' | 'unreachable';
  licensingRestriction: string;
}

export interface AnieKewKnowledgeMatch {
  entityId: string;
  title: string;
  documentType: string;
  moduleLabel: string;
  href: string;
  subregion: string;
  district?: string;
  watershed?: string;
  verifiedSummary: string;
  relevanceScore: number;
  evidenceClass: 'verified_kew_observatory' | 'kew_scientific_report' | 'kew_investigation_baseline';
}

export interface AnieClaimEvidenceMapping {
  id: string;
  claimText: string;
  claimCategory: 'empirical_event' | 'scientific_literature' | 'kew_baseline' | 'regulatory_context';
  supportingSourceUrls: string[];
  supportingKewHrefs: string[];
  independentSourceCount: number;
  verificationStatus:
    | 'corroborated_multi_source'
    | 'attributed_single_source'
    | 'kew_verified_baseline'
    | 'peer_reviewed_doi'
    | 'unresolved_gap';
}

export interface AnieEvidenceDossier {
  id: string;
  clusterId: string;
  createdAt: string;
  lastVerifiedAt: string;
  externalSources: AnieEvidenceSourceItem[];
  kewKnowledgeMatches: AnieKewKnowledgeMatch[];
  claimMappings: AnieClaimEvidenceMapping[];
  conflictingEvidenceNotes: string[];
  unresolvedEvidenceGaps: string[];
  verificationPassed: boolean;
  verificationSummary: string;
}

export interface AnieQualityCheckReport {
  checkedAt: string;
  factualTraceabilityPassed: boolean;
  citationValidityPassed: boolean;
  numericalConsistencyPassed: boolean;
  geographicalAccuracyPassed: boolean;
  chronologicalAccuracyPassed: boolean;
  zeroFabricatedQuotesPassed: boolean;
  copyrightCompliancePassed: boolean;
  imageProvenancePassed: boolean;
  bureauStatusHonestyPassed: boolean;
  rightOfReplyFlagged: boolean;
  overallPassed: boolean;
  warnings: string[];
}

export interface AnieRevisionEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'hd_anie_engine' | 'administrator' | 'journalist' | 'scientific_reviewer';
  summary: string;
  previousHeadline?: string;
  previousStatus?: AnieEditorialStatus;
  newStatus: AnieEditorialStatus;
}

export interface AnieSourceReferenceCitation {
  refNumber: number;
  label: string;
  publisherOrJournal: string;
  publishedDate: string;
  url: string;
  doi?: string;
  evidenceType: 'News Report' | 'Peer-Reviewed Study' | 'Official Notice' | 'KEW Observatory';
}

export interface AnieEditorialDraft {
  id: string;
  slug: string;
  stream: AniePublicationStream;
  targetEditionSlug: string;
  editionLabel: string;
  promotedFromDispatchId?: string;
  promotedToEditionDraftId?: string;
  clusterId: string;
  dossierId: string;

  // Administrator Publication & Governance Controls (Default: 'awaiting_review', NEVER auto-published)
  editorialStatus: AnieEditorialStatus;
  riskLevel: AnieRiskLevel;
  riskReasons: string[];
  scientificReviewRequired: boolean;
  scientificReviewApproved: boolean;
  scientificReviewedBy?: string;
  legalReviewRequired: boolean;
  legalReviewApproved: boolean;
  legalReviewedBy?: string;
  isFeatured: boolean;
  assignedJournalistSlug?: string;
  assignedJournalistName?: string;

  // Editorial Classification & Metadata
  departmentId: EditorialDepartmentId;
  departmentRubric: string;
  folioCode: string;
  bureauId: AnieBureauId;
  bureauLabel: string;
  regionDisplay: string;
  districts: string[];
  watersheds: string[];
  monitoringDomainIds: string[];
  reportingBeat: string;
  storyType:
    | 'Regional Dispatch'
    | 'Scientific Explainer'
    | 'Environmental Analysis'
    | 'Research Summary'
    | 'Policy & Governance Brief'
    | 'Longform Feature'
    | 'Data Journalism Essay'
    | 'Investigative Evidence Dossier'
    | 'Visual Essay'
    | 'Cover Story Candidate';

  // Manuscript Content
  headline: string;
  standfirst: string;
  bylineDisplay: string; // Default: "Himalayan Dispatch Intelligence Desk"
  bylineRole: string;
  isAiAssisted: boolean;
  dateline: string;
  executiveSummary: string;
  chapters: StoryChapter[];
  scientificContextSummary: string;
  dataVisualization?: EditorialDataVisualizationSpec;

  // Visual Journalism & Licensing
  heroImage: string;
  heroCaption: string;
  heroCredit: string;
  heroLicense: string;
  visualProvenanceType:
    | 'kew_documentary_plate'
    | 'kew_scientific_cartography'
    | 'labeled_conceptual_illustration';
  heroMonochrome?: boolean;

  // Citations, Limitations & Disclosures
  sourceReferences: AnieSourceReferenceCitation[];
  limitationsAndEvidenceGaps: string[];
  editorialDisclosure: string;
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
  canonicalPath: string;
  seoKeywords: string[];

  // Lifecycle Timestamps & Audit
  createdAt: string;
  updatedAt: string;
  scheduledPublicationAt?: string;
  publishedAt?: string;
  unpublishedAt?: string;
  trashedAt?: string;
  previousStatusBeforeTrash?: AnieEditorialStatus;
  qualityReport: AnieQualityCheckReport;
  corrections: StoryCorrectionEntry[];
  revisionHistory: AnieRevisionEntry[];
  generationMethod: string;
}

export interface AnieMonthlyEditionPlan {
  id: string;
  editionSlug: string;
  volumeLabel: string;
  issueNumberLabel: string;
  proposedThemeTitle: string;
  themeKicker: string;
  subtitle: string;
  anticipatedPublicationWindow: string;
  coverDraftId?: string;
  coverImage: string;
  coverLocation: string;
  coverCaption: string;
  coverCredit: string;
  editorsLetterDraft: {
    workingTitle: string;
    paragraphs: string[];
    authorAttributionStatus: 'draft_awaiting_founding_eic_personal_approval' | 'approved_by_eic';
    governanceNotice: string;
  };
  allocatedDraftIds: string[];
  departmentCounts: Record<string, number>;
  bureauCounts: Record<string, number>;
  regionalCoverageGaps: AnieBureauId[];
  readinessPercent: number;
  status: 'autonomous_planning' | 'assembled_for_review' | 'authorized_for_release';
  updatedAt: string;
}

export interface AnieDailyEditorialDigest {
  id: string;
  dateKey: string; // YYYY-MM-DD
  generatedAt: string;
  signalsScannedCount: number;
  clustersFormedCount: number;
  newDraftsReadyCount: number;
  greenBulkEligibleDraftIds: string[];
  amberReviewRequiredDraftIds: string[];
  redMandatoryHoldDraftIds: string[];
  monthlyEditionCandidateIds: string[];
  topProposedHeadlines: Array<{
    draftId: string;
    headline: string;
    bureauLabel: string;
    storyType: string;
    riskLevel: AnieRiskLevel;
    sourceCount: number;
  }>;
  summaryNarrative: string;
}

export interface AnieWorkerJobRecord {
  id: string;
  jobType:
    | 'regional_discovery'
    | 'international_discovery'
    | 'institutional_discovery'
    | 'scientific_discovery'
    | 'scheduled_publish_release'
    | 'published_revalidation'
    | 'daily_digest_generation'
    | 'monthly_edition_assembly';
  status: 'queued' | 'running' | 'completed' | 'failed' | 'dead_letter';
  attempts: number;
  maxAttempts: number;
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  summary?: string;
  errorMessage?: string;
}

export interface AnieAuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  category:
    | 'engine_control'
    | 'discovery'
    | 'editorial_action'
    | 'publication'
    | 'edition_management'
    | 'security'
    | 'budget';
  action: string;
  targetId?: string;
  targetTitle?: string;
  details: string;
}

export interface AnieModelAndBudgetConfig {
  primaryProvider: 'deterministic_rag_synthesis' | 'openai_compatible' | 'gemini' | 'ollama_local';
  primaryModelName: string;
  verificationMode: 'deterministic_claim_and_doi_verifier';
  dailySpendingCeilingUsd: number;
  monthlySpendingCeilingUsd: number;
  measuredSpentTodayUsd: number;
  measuredSpentMonthUsd: number;
  lastSpendResetDate: string;
  lastSpendResetMonth: string;
  measuredPromptTokens: number;
  measuredCompletionTokens: number;
  measuredExternalDiscoveryCalls: number;
  paidProcessingHaltedByBudget: boolean;
}

export interface AnieEngineSubsystemsToggle {
  globalNewsDiscovery: boolean;
  regionalSourceMonitoring: boolean;
  scientificResearchDiscovery: boolean;
  factAndSourceVerification: boolean;
  autonomousEditorialWriting: boolean;
  visualAssetMatching: boolean;
  scheduledReleaseGateway: boolean;
  dailyDigestCompilation: boolean;
}

export interface AniePersistentStore {
  schemaVersion: number;
  engineMode: AnieEngineMode;
  subsystems: AnieEngineSubsystemsToggle;
  scheduleIntervalsMinutes: {
    regionalDiscovery: number;
    internationalDiscovery: number;
    institutionalDiscovery: number;
    scientificDiscovery: number;
    revalidationMinutes: number;
  };
  digestPreferences: {
    enabled: boolean;
    deliveryHourUtc: number;
    maxDigestItems: number;
    includeAmberInDigest: boolean;
  };
  workerHeartbeat: {
    workerInstanceId?: string;
    inProcessSchedulerActive: boolean;
    lastHeartbeatAt?: string;
    lastDiscoveryRunAt?: string;
    lastScientificRunAt?: string;
    lastRevalidationRunAt?: string;
    lastDigestDate?: string;
    totalCyclesCompleted: number;
  };
  modelAndBudget: AnieModelAndBudgetConfig;
  sources: AnieSourceRecord[];
  signals: AnieRawSignal[];
  clusters: AnieStoryCluster[];
  dossiers: AnieEvidenceDossier[];
  drafts: AnieEditorialDraft[];
  monthlyEditions: AnieMonthlyEditionPlan[];
  dailyDigests: AnieDailyEditorialDigest[];
  workerJobs: AnieWorkerJobRecord[];
  deadLetterQueue: AnieWorkerJobRecord[];
  auditLog: AnieAuditLogEntry[];
}
