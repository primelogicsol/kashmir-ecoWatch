// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — PERSISTENT SERVER STORE, RECRUITMENT & SOURCE PROTECTION
// Enforces server-side filtering so confidential assignments, private drafts,
// unapproved applications, uploaded credential documents, and protected source
// details never leak to public clients, search indexes, or sitemaps.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {
  CONTRIBUTOR_ROLE_CATEGORIES,
  EDITORIAL_BOARD_MEMBERS,
  EDITORIAL_CHARTER_COMMITMENTS,
  EDITORIAL_DEPARTMENTS,
  EDITORIAL_WORKFLOW_STAGES,
  FORTHCOMING_ASSIGNMENTS,
  JOURNALIST_PROFILES,
  MAGAZINE_EDITIONS,
  MAGAZINE_STORIES,
  MASTHEAD_DEFAULT_POSITIONS,
  MASTHEAD_SECTION_SPECS,
  ONBOARDING_LIFECYCLE_STEPS,
  PUBLICATION_CALENDAR_MILESTONES,
  REGIONAL_REPORTING_BUREAUS,
} from '@/data/himalayan-dispatch';
import {
  AUTONOMOUS_QUEUE_SEEDS,
  AUTONOMOUS_SOURCE_SIGNALS,
  DAILY_DISPATCH_ARTICLES,
  REPORTING_BEATS_FULL,
} from '@/data/himalayan-dispatch-autonomous';
import {
  DEPARTMENT_ROUTE_CONFIG,
  DepartmentRouteSlug,
  fromCanonicalIssueSlug,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
} from '@/lib/himalayan-dispatch-routes';
import {
  AutonomousEditorialQueueItem,
  AutonomousQueueStatus,
  AutonomousSourceSignal,
  BureauSlugId,
  ContributorEngagementBasis,
  ContributorRoleCategoryId,
  ContributorTrack,
  DailyDispatchArticle,
  EditorialDepartmentId,
  EditorialInquiryCategory,
  EditorialPitchSubmission,
  EditorialPublicInquiryRecord,
  EditorialWorkflowStage,
  ForthcomingAssignment,
  JournalistDraftRecord,
  JournalistEvidenceRecord,
  JournalistMediaRecord,
  JournalistProfile,
  MagazineEdition,
  MagazineStory,
  MastheadAppointmentStatus,
  MastheadPositionRecord,
  MastheadSectionId,
  NewsroomApplicationStatus,
  NewsroomContributorApplication,
  PrivateCredentialAttachment,
  PublicApplicationStatusSummary,
  PublicCorrectionRecord,
  PublicForthcomingAssignmentPreview,
  PublicMastheadPosition,
  PublicProductionBadge,
  ReportingBeatFullSpec,
  StoryCorrectionEntry,
} from '@/types/himalayan-dispatch';
import {
  getPublishedAnieStories,
  readAnieStore,
  recordAnieAudit,
  writeAnieStore,
} from '@/lib/hd-anie/store';
import {
  blocksToChapters,
  getCanonicalStoryHdnOverrides,
  getHdnPublishedDailyDispatches,
  getHdnPublishedMagazineStories,
  getPublicHdnEditionsMerged,
  readHdnStore,
} from '@/lib/hdn/store';
import {
  computeDailyDispatchMetrics,
  computeStoryMetrics,
  evaluateStoryReviewVerification,
} from '@/lib/himalayan-dispatch-metrics';

export const JOURNALIST_SESSION_COOKIE = 'hd_journalist_session';

interface DispatchPersistentStoreData {
  storyWorkflowOverrides: Record<
    string,
    {
      workflowStage: EditorialWorkflowStage;
      isPublished: boolean;
      updatedAt: string;
    }
  >;
  storyCorrections: Record<string, StoryCorrectionEntry[]>;
  assignmentOverrides: Record<
    string,
    {
      workflowStage: EditorialWorkflowStage;
      publicStageLabel: PublicProductionBadge;
      bylineDisplay?: string;
      publicPreviewApproved: boolean;
      isConfidential: boolean;
      updatedAt: string;
    }
  >;
  customAssignments: ForthcomingAssignment[];
  pitches: EditorialPitchSubmission[];
  applications: NewsroomContributorApplication[];
  journalistDrafts: JournalistDraftRecord[];
  journalistEvidence: JournalistEvidenceRecord[];
  journalistMedia: JournalistMediaRecord[];
  journalistProfileOverrides: Record<
    string,
    {
      shortBio?: string;
      basedIn?: string;
      beat?: string;
      languages?: string[];
      publicPortfolioConsent?: boolean;
    }
  >;
  mastheadPositionOverrides: Record<
    string,
    {
      roleTitle?: string;
      holderName?: string;
      domainsRubric?: string;
      mandateDescription?: string;
      status?: MastheadAppointmentStatus;
      publicVacantLabel?: string;
      internalAdminNote?: string;
      updatedAt: string;
      updatedBy: string;
    }
  >;
  customMastheadPositions: MastheadPositionRecord[];
  customDailyDispatches: DailyDispatchArticle[];
  autonomousQueueOverrides: Record<string, Partial<AutonomousEditorialQueueItem>>;
  customAutonomousQueue: AutonomousEditorialQueueItem[];
  publicInquiries: EditorialPublicInquiryRecord[];
  lastAutonomousScanAt?: string;
}

const STORE_FILE = path.join(process.cwd(), 'data', 'himalayan-dispatch-store.json');
const PRIVATE_CREDENTIALS_DIR = path.join(
  process.cwd(),
  'data',
  'private-dispatch-credentials'
);

const EMPTY_STORE: DispatchPersistentStoreData = {
  storyWorkflowOverrides: {},
  storyCorrections: {},
  assignmentOverrides: {},
  customAssignments: [],
  pitches: [],
  applications: [],
  journalistDrafts: [],
  journalistEvidence: [],
  journalistMedia: [],
  journalistProfileOverrides: {},
  mastheadPositionOverrides: {},
  customMastheadPositions: [],
  customDailyDispatches: [],
  autonomousQueueOverrides: {},
  customAutonomousQueue: [],
  publicInquiries: [],
};

import {
  getDomainSigningSecret,
  isConfiguredSafeSecret,
  timingSafeSecretMatch,
  verifyAdminPasscode,
} from '@/lib/seo/admin-session';

function getJournalistSigningSecret(): string {
  return getDomainSigningSecret('dispatch-journalist');
}

export interface JournalistSessionClaims {
  v?: 2;
  journalistSlug: string;
  email: string;
  name: string;
  roleTitle: string;
  applicationId?: string;
  iat: number;
  exp: number;
}

export function signJournalistSessionToken(
  claims: Omit<JournalistSessionClaims, 'iat' | 'exp' | 'v'>,
  ttlSeconds = 12 * 60 * 60
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: JournalistSessionClaims = {
    v: 2,
    ...claims,
    iat: now,
    exp: now + ttlSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getJournalistSigningSecret())
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifyJournalistSessionToken(
  token?: string | null
): JournalistSessionClaims | null {
  if (!token || !token.includes('.')) return null;
  const [encoded, providedSig] = token.split('.', 2);
  if (!encoded || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', getJournalistSigningSecret())
    .update(encoded)
    .digest('base64url');

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as JournalistSessionClaims;
    if (parsed.v !== 2) return null;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    if (!parsed.journalistSlug) return null;

    // Live revocation safeguard: if backed by an application that is no longer Approved, reject immediately!
    if (parsed.applicationId) {
      const store = readDispatchStore();
      const app = store.applications.find((x) => x.id === parsed.applicationId);
      if (!app || app.status !== 'Approved' || !app.charterAccepted) {
        return null;
      }
    }
    return parsed;
  } catch {
    return null;
  }
}

export function readDispatchStore(): DispatchPersistentStoreData {
  try {
    if (!fs.existsSync(STORE_FILE)) {
      return { ...EMPTY_STORE };
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DispatchPersistentStoreData>;
    return {
      storyWorkflowOverrides: parsed.storyWorkflowOverrides || {},
      storyCorrections: parsed.storyCorrections || {},
      assignmentOverrides: parsed.assignmentOverrides || {},
      customAssignments: Array.isArray(parsed.customAssignments) ? parsed.customAssignments : [],
      pitches: Array.isArray(parsed.pitches) ? parsed.pitches : [],
      applications: Array.isArray(parsed.applications) ? parsed.applications : [],
      journalistDrafts: Array.isArray(parsed.journalistDrafts) ? parsed.journalistDrafts : [],
      journalistEvidence: Array.isArray(parsed.journalistEvidence)
        ? parsed.journalistEvidence
        : [],
      journalistMedia: Array.isArray(parsed.journalistMedia) ? parsed.journalistMedia : [],
      journalistProfileOverrides: parsed.journalistProfileOverrides || {},
      mastheadPositionOverrides: parsed.mastheadPositionOverrides || {},
      customMastheadPositions: Array.isArray(parsed.customMastheadPositions)
        ? parsed.customMastheadPositions
        : [],
      customDailyDispatches: Array.isArray(parsed.customDailyDispatches)
        ? parsed.customDailyDispatches
        : [],
      autonomousQueueOverrides: parsed.autonomousQueueOverrides || {},
      customAutonomousQueue: Array.isArray(parsed.customAutonomousQueue)
        ? parsed.customAutonomousQueue
        : [],
      publicInquiries: Array.isArray(parsed.publicInquiries) ? parsed.publicInquiries : [],
      lastAutonomousScanAt: parsed.lastAutonomousScanAt,
    };
  } catch {
    return { ...EMPTY_STORE };
  }
}

export function writeDispatchStore(data: DispatchPersistentStoreData): void {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[Himalayan Dispatch Store] Unable to persist store:', err);
  }
}

/**
 * Stores uploaded CV / credential documents strictly OUTSIDE public/ so they
 * can never be enumerated or downloaded by unauthenticated web visitors.
 */
export function savePrivateCredentialDocument(
  fileName: string,
  mimeType: string,
  buffer: Buffer
): PrivateCredentialAttachment {
  if (!fs.existsSync(PRIVATE_CREDENTIALS_DIR)) {
    fs.mkdirSync(PRIVATE_CREDENTIALS_DIR, { recursive: true });
  }
  const safeBase = fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(-80);
  const storageKey = `cred_${Date.now()}_${crypto.randomBytes(6).toString('hex')}_${safeBase}`;
  const fullPath = path.join(PRIVATE_CREDENTIALS_DIR, storageKey);
  fs.writeFileSync(fullPath, buffer);
  return {
    fileName: safeBase,
    mimeType: mimeType || 'application/octet-stream',
    sizeBytes: buffer.byteLength,
    privateStorageKey: storageKey,
    uploadedAt: new Date().toISOString(),
  };
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function mapStatusToLifecycleStep(
  status: NewsroomApplicationStatus,
  publicPortfolioApproved: boolean
): number {
  switch (status) {
    case 'Submitted':
      return 1;
    case 'Under Credential Review':
    case 'Additional Information Required':
      return 2;
    case 'Under Editorial Assessment':
      return 3;
    case 'Approved':
      return publicPortfolioApproved ? 8 : 6;
    case 'Declined':
    case 'Withdrawn':
    case 'Suspended':
      return 4;
  }
}

/**
 * Internal merged stories (includes unpublished drafts if an admin moves a story out of publication)
 */
export function getAllMergedStoriesInternal(): MagazineStory[] {
  const store = readDispatchStore();
  const hdnStore = readHdnStore();
  const hdnOverrides = getCanonicalStoryHdnOverrides();
  return MAGAZINE_STORIES.map((story) => {
    const ov = store.storyWorkflowOverrides[story.slug];
    const hdnMs = hdnOverrides.get(story.slug);
    const extraCorrections = store.storyCorrections[story.slug] || [];
    const hdnPublished = hdnMs ? hdnMs.workflowStatus === 'published' : undefined;
    const hdnExplicitlyUnpublished = Boolean(
      hdnMs && (hdnMs.unpublishedAt || hdnMs.workflowStatus === 'trashed' || hdnMs.workflowStatus === 'rejected')
    );

    const storyCorrections = Array.isArray(story.corrections) ? story.corrections : [];
    const hdnMsCorrections = Array.isArray(hdnMs?.corrections) ? hdnMs.corrections : [];

    const mergedStory: MagazineStory = {
      ...story,
      ...(hdnMs && hdnMs.versionNumber > 1
        ? {
            title: hdnMs.headline,
            subtitle: hdnMs.standfirst || story.subtitle,
            dateline: hdnMs.dateline,
            chapters: blocksToChapters(hdnMs.blocks),
            isPublished: !hdnExplicitlyUnpublished && (Boolean(hdnPublished) || story.isPublished),
            workflowStage: hdnPublished ? 'publication' : story.workflowStage,
            updatedAt: hdnMs.updatedAt.slice(0, 10),
          }
        : hdnExplicitlyUnpublished
          ? {
              isPublished: false,
              workflowStage: 'editorial_approval' as EditorialWorkflowStage,
            }
          : {}),
      ...(ov
        ? {
            workflowStage: ov.workflowStage,
            isPublished: ov.isPublished,
            updatedAt: ov.updatedAt.slice(0, 10),
          }
        : {}),
      corrections: [
        ...hdnMsCorrections.filter((c) => !storyCorrections.some((sc) => sc.id === c.id)),
        ...extraCorrections,
        ...storyCorrections,
      ],
    };

    const metrics = computeStoryMetrics(mergedStory);
    const hasCompletedIndependentReview = evaluateStoryReviewVerification(
      mergedStory,
      hdnStore.factChecks,
      hdnStore.scientificReviews
    );

    return {
      ...mergedStory,
      wordCount: metrics.wordCount,
      proseWordCount: metrics.proseWordCount,
      readingTimeMinutes: metrics.readingTimeMinutes,
      estimatedViewingMinutes: metrics.estimatedViewingMinutes,
      hasCompletedIndependentReview,
    };
  });
}

/**
 * Internal merged assignments (includes confidential assignments for authorized newsroom admins ONLY)
 */
export function getAllMergedAssignmentsInternal(): ForthcomingAssignment[] {
  const store = readDispatchStore();
  const base = FORTHCOMING_ASSIGNMENTS.map((a) => {
    const ov = store.assignmentOverrides[a.id];
    if (!ov) return a;
    const effectiveConfidential = ov.isConfidential;
    const safePublicPreview =
      effectiveConfidential || a.sourceProtectionLevel === 'strict_confidential'
        ? false
        : ov.publicPreviewApproved;
    return {
      ...a,
      workflowStage: ov.workflowStage,
      publicStageLabel: ov.publicStageLabel,
      bylineDisplay: ov.bylineDisplay ?? a.bylineDisplay,
      isConfidential: effectiveConfidential,
      publicPreviewApproved: safePublicPreview,
    };
  });
  return [...base, ...store.customAssignments];
}

/**
 * PUBLIC STORIES — Only published or archived stories (merges canonical Magazine
 * stories with administrator-approved & published HD-ANIE articles seamlessly).
 */
export function getPublicPublishedStories(): MagazineStory[] {
  const hdnStore = readHdnStore();
  const allowedPublicStages = new Set<EditorialWorkflowStage>([
    'editorial_approval',
    'publication',
    'corrections',
    'archiving',
  ]);
  const canonicalPublished = getAllMergedStoriesInternal().filter(
    (s) => s.isPublished && allowedPublicStages.has(s.workflowStage)
  );
  const hdnPublished = getHdnPublishedMagazineStories();
  const aniePublished = getPublishedAnieStories();
  const seenSlugs = new Set<string>();
  const combined: MagazineStory[] = [];
  for (const st of [...hdnPublished, ...aniePublished, ...canonicalPublished]) {
    if (seenSlugs.has(st.slug)) continue;
    seenSlugs.add(st.slug);
    const metrics = computeStoryMetrics(st);
    const hasCompletedIndependentReview = evaluateStoryReviewVerification(
      st,
      hdnStore.factChecks,
      hdnStore.scientificReviews
    );
    combined.push({
      ...st,
      wordCount: metrics.wordCount,
      proseWordCount: metrics.proseWordCount,
      readingTimeMinutes: metrics.readingTimeMinutes,
      estimatedViewingMinutes: metrics.estimatedViewingMinutes,
      hasCompletedIndependentReview,
    });
  }
  return combined;
}

/** Backwards-compatible alias for `getPublicPublishedStories`. */
export const getPublicStories = getPublicPublishedStories;

/**
 * STREAM 01: THE DAILY DISPATCH — Chronological stream of administrator-approved
 * Daily Dispatch articles, alongside published field/regional dispatches.
 */
export function getPublicDailyDispatchStories(): MagazineStory[] {
  return getPublishedAnieStories('daily_dispatch');
}

export function getPublicStoryBySlug(slug: string): MagazineStory | null {
  const resolvedSlug =
    slug === 'who-speaks-for-the-environment-when-politics-chooses-landscape' ||
    slug === 'who-speaks-for-the-environment-when-politics-chooses-the-landscape'
      ? 'selective-environmental-consciousness'
      : slug;
  return getPublicPublishedStories().find((s) => s.slug === resolvedSlug) || null;
}

/**
 * PUBLIC FORTHCOMING PREVIEWS — Strictly strips confidential assignments,
 * unapproved commissions, internal desk notes, and confidential source summaries!
 */
export function getPublicForthcomingPreviews(
  editionSlug = 'issue-02-a-world-in-transition'
): PublicForthcomingAssignmentPreview[] {
  return getAllMergedAssignmentsInternal()
    .filter(
      (a) =>
        a.editionSlug === editionSlug &&
        a.publicPreviewApproved === true &&
        a.isConfidential === false &&
        a.sourceProtectionLevel !== 'strict_confidential'
    )
    .map((a) => ({
      id: a.id,
      editionSlug: a.editionSlug,
      workingTitle: a.workingTitle,
      synopsis: a.synopsis,
      departmentId: a.departmentId,
      departmentLabel: a.departmentLabel,
      journalistSlug: a.journalistSlug,
      bylineDisplay: a.bylineDisplay,
      publicStageLabel: a.publicStageLabel,
      anticipatedPublicationWindow: a.anticipatedPublicationWindow,
      region: a.region,
    }));
}

export function getPublicEditions(): MagazineEdition[] {
  return getPublicHdnEditionsMerged();
}

export function getPublicEditionBySlug(slug: string): {
  edition: MagazineEdition;
  canonicalIssueSlug: string;
  stories: MagazineStory[];
  forthcomingPreviews: PublicForthcomingAssignmentPreview[];
} | null {
  const internalSlug = fromCanonicalIssueSlug(slug);
  const editions = getPublicHdnEditionsMerged();
  const edition = editions.find(
    (e) => e.slug === internalSlug || e.slug === slug
  );
  if (!edition) return null;
  const pubStories = getPublicPublishedStories();
  const stories = edition.storySlugs
    .map((sSlug) => pubStories.find((st) => st.slug === sSlug))
    .filter((st): st is MagazineStory => Boolean(st));
  const forthcomingPreviews =
    edition.status === 'forthcoming' ? getPublicForthcomingPreviews(edition.slug) : [];
  return {
    edition,
    canonicalIssueSlug: toCanonicalIssueSlug(edition.slug),
    stories,
    forthcomingPreviews,
  };
}

/**
 * PUBLIC JOURNALISTS — Founding masthead roster + ONLY contributor applicants who have:
 * 1) `status === 'Approved'` (approved by Founding Editor-in-Chief or Editorial Admin)
 * 2) `charterAccepted === true`
 * 3) `publicPortfolioConsent === true` AND `publicPortfolioApproved === true`
 * Never exposes unapproved, pending, declined, withdrawn, or suspended applicants!
 */
export function getPublicJournalists(): JournalistProfile[] {
  const store = readDispatchStore();
  const baseSlugs = new Set(JOURNALIST_PROFILES.map((j) => j.slug));

  const baseProfiles = JOURNALIST_PROFILES.map((j) => {
    const ov = store.journalistProfileOverrides[j.slug];
    if (!ov) return j;
    return {
      ...j,
      shortBio: ov.shortBio || j.shortBio,
      basedIn: ov.basedIn || j.basedIn,
      beat: ov.beat || j.beat,
      languages: ov.languages && ov.languages.length > 0 ? ov.languages : j.languages,
    };
  });

  const onboardedPublicProfiles: JournalistProfile[] = store.applications
    .filter(
      (app) =>
        app.status === 'Approved' &&
        app.charterAccepted === true &&
        app.publicPortfolioApproved === true &&
        Boolean(app.assignedJournalistSlug) &&
        !baseSlugs.has(app.assignedJournalistSlug!)
    )
    .filter((app) => {
      const ov = store.journalistProfileOverrides[app.assignedJournalistSlug!];
      const consented =
        ov?.publicPortfolioConsent !== undefined
          ? ov.publicPortfolioConsent
          : app.publicPortfolioConsent;
      return consented === true;
    })
    .map((app) => {
      const slug = app.assignedJournalistSlug!;
      const ov = store.journalistProfileOverrides[slug];
      return {
        slug,
        name: app.fullName,
        roleTitle: app.roleCategoryTitle,
        beat: ov?.beat || `${app.roleCategoryTitle} · ${app.locationOrDistrict}`,
        basedIn: ov?.basedIn || app.locationOrDistrict,
        portraitUrl: '/images/publications/pashmina-field-ecology-scientists.jpg',
        shortBio: ov?.shortBio || app.professionalBackground.slice(0, 260),
        extendedBio: [
          ov?.shortBio || app.professionalBackground,
          app.motivationStatement,
        ],
        languages:
          ov?.languages && ov.languages.length > 0
            ? ov.languages
            : app.languages.length > 0
            ? app.languages
            : ['English'],
        awardsAndFellowships: [
          `Himalayan Dispatch Approved ${app.roleCategoryTitle}`,
          ...(app.publishedWorkNotes ? [app.publishedWorkNotes.slice(0, 90)] : []),
        ],
        pgpFingerprintNote:
          'Verified Himalayan Dispatch Contributor · Source-protected correspondence routed via Editorial Desk.',
      };
    });

  const combinedSlugs = new Set([
    ...baseProfiles.map((p) => p.slug),
    ...onboardedPublicProfiles.map((p) => p.slug),
  ]);

  const hdnExtraProfiles: JournalistProfile[] = readHdnStore()
    .accounts.filter(
      (acc) =>
        acc.status === 'active' &&
        acc.charterAccepted &&
        acc.publicPortfolioConsent &&
        acc.publicPortfolioApproved &&
        !combinedSlugs.has(acc.slug) &&
        !acc.roles.includes('autonomous_ai_engine')
    )
    .map((acc) => ({
      slug: acc.slug,
      name: acc.fullName,
      roleTitle: acc.primaryRoleTitle,
      beat: acc.reportingBeats.join(' · ') || acc.primaryRoleTitle,
      basedIn: acc.basedIn,
      portraitUrl: acc.portraitUrl || '/images/publications/pashmina-field-ecology-scientists.jpg',
      shortBio: acc.shortBio || `${acc.primaryRoleTitle} at Himalayan Dispatch.`,
      extendedBio: [acc.shortBio || `${acc.fullName} contributes environmental reporting to Himalayan Dispatch.`],
      languages: acc.languages.length > 0 ? acc.languages : ['English'],
      awardsAndFellowships:
        acc.verifiedCredentials.length > 0
          ? acc.verifiedCredentials
          : [`Himalayan Dispatch Verified ${acc.primaryRoleTitle}`],
    }));

  return [...baseProfiles, ...onboardedPublicProfiles, ...hdnExtraProfiles];
}

const LEGACY_JOURNALIST_SLUG_ALIASES: Record<string, string> = {
  'aaliya-andrabi': 'investigations-urban-water-desk',
  'danish-wani': 'visual-editions-desk',
  'dr-nida-hamdani': 'data-cartography-desk',
  'rafiq-ahmad-bhat': 'wetlands-forest-desk',
};

export function getPublicJournalistPortfolio(slug: string): {
  journalist: JournalistProfile;
  publishedStories: MagazineStory[];
  approvedUpcomingAssignments: PublicForthcomingAssignmentPreview[];
} | null {
  const publicList = getPublicJournalists();
  const resolvedSlug = LEGACY_JOURNALIST_SLUG_ALIASES[slug] || slug;
  const journalist =
    publicList.find((j) => j.slug === resolvedSlug) ||
    publicList.find((j) => j.slug === slug);
  if (!journalist) return null;
  const publishedStories = getPublicPublishedStories().filter(
    (s) =>
      s.journalistSlug === journalist.slug ||
      s.journalistSlug === slug ||
      s.photographyByline === journalist.name
  );
  const approvedUpcomingAssignments = getPublicForthcomingPreviews().filter(
    (a) => a.journalistSlug === journalist.slug || a.journalistSlug === slug
  );
  return {
    journalist,
    publishedStories,
    approvedUpcomingAssignments,
  };
}

const PUBLICLY_NAMED_MASTHEAD_STATUSES = new Set<MastheadAppointmentStatus>([
  'Confirmed',
  'Visiting',
  'External Reviewer',
]);

/**
 * Internal merged masthead positions (for authorized Newsroom Admin Dashboard ONLY).
 * Includes private Proposed / Under Review candidate placeholders and internal notes.
 */
export function getAllMastheadPositionsInternal(): MastheadPositionRecord[] {
  const store = readDispatchStore();
  const baseMerged = MASTHEAD_DEFAULT_POSITIONS.map((pos) => {
    const ov = store.mastheadPositionOverrides[pos.id];
    if (!ov) return pos;
    return {
      ...pos,
      roleTitle: ov.roleTitle !== undefined ? ov.roleTitle : pos.roleTitle,
      holderName: ov.holderName !== undefined ? ov.holderName : pos.holderName,
      domainsRubric: ov.domainsRubric !== undefined ? ov.domainsRubric : pos.domainsRubric,
      mandateDescription:
        ov.mandateDescription !== undefined ? ov.mandateDescription : pos.mandateDescription,
      status: ov.status !== undefined ? ov.status : pos.status,
      publicVacantLabel:
        ov.publicVacantLabel !== undefined ? ov.publicVacantLabel : pos.publicVacantLabel,
      internalAdminNote:
        ov.internalAdminNote !== undefined ? ov.internalAdminNote : pos.internalAdminNote,
      updatedAt: ov.updatedAt,
      updatedBy: ov.updatedBy,
    };
  });

  const customMerged = store.customMastheadPositions.map((pos) => {
    const ov = store.mastheadPositionOverrides[pos.id];
    if (!ov) return pos;
    return {
      ...pos,
      roleTitle: ov.roleTitle !== undefined ? ov.roleTitle : pos.roleTitle,
      holderName: ov.holderName !== undefined ? ov.holderName : pos.holderName,
      domainsRubric: ov.domainsRubric !== undefined ? ov.domainsRubric : pos.domainsRubric,
      mandateDescription:
        ov.mandateDescription !== undefined ? ov.mandateDescription : pos.mandateDescription,
      status: ov.status !== undefined ? ov.status : pos.status,
      publicVacantLabel:
        ov.publicVacantLabel !== undefined ? ov.publicVacantLabel : pos.publicVacantLabel,
      internalAdminNote:
        ov.internalAdminNote !== undefined ? ov.internalAdminNote : pos.internalAdminNote,
      updatedAt: ov.updatedAt,
      updatedBy: ov.updatedBy,
    };
  });

  return [...baseMerged, ...customMerged].sort((a, b) => a.order - b.order);
}

/**
 * PUBLIC MASTHEAD POSITIONS — Enforces institutional governance rule on the server:
 * Only verified & accepted appointments (`Confirmed`, `Visiting`, `External Reviewer`)
 * with a non-empty holderName appear as named individuals on the public masthead.
 * Any seat set to `Proposed`, `Under Review`, `Vacant`, or `Former Member` suppresses
 * private planning names on the server and displays `Appointment Pending` or `Vacant`.
 */
export function getPublicMastheadPositions(): PublicMastheadPosition[] {
  return getAllMastheadPositionsInternal().map((pos) => {
    const trimmedName = (pos.holderName || '').trim();
    const isFilledPublicly =
      PUBLICLY_NAMED_MASTHEAD_STATUSES.has(pos.status) && trimmedName.length > 0;

    const fallbackVacantLabel =
      pos.publicVacantLabel?.trim() ||
      (pos.status === 'Under Review' ? 'Appointment Pending' : 'Vacant');

    return {
      id: pos.id,
      sectionId: pos.sectionId,
      order: pos.order,
      roleTitle: pos.roleTitle,
      displayHolderName: isFilledPublicly ? trimmedName : fallbackVacantLabel,
      isFilledPublicly,
      publicDesignationNote:
        isFilledPublicly && pos.status === 'Visiting' ? 'Visiting Appointment' : undefined,
      domainsRubric: pos.domainsRubric,
      mandateDescription: pos.mandateDescription,
      bureauId: pos.bureauId,
      bureauOperationalStatus: pos.bureauOperationalStatus,
      isCouncilSpecialistRow: pos.isCouncilSpecialistRow,
      anchorId: pos.anchorId,
      journalistSlug: isFilledPublicly ? pos.journalistSlug : undefined,
    };
  });
}

export function getPublicDispatchBundle() {
  const currentEdition =
    MAGAZINE_EDITIONS.find((e) => e.status === 'current') || MAGAZINE_EDITIONS[0];
  const forthcomingEdition =
    MAGAZINE_EDITIONS.find((e) => e.status === 'forthcoming') || MAGAZINE_EDITIONS[1];
  const archivedEditions = MAGAZINE_EDITIONS.filter((e) => e.status === 'archived');
  const publishedStories = getPublicPublishedStories();
  const currentEditionStories = currentEdition.storySlugs
    .map((slug) => publishedStories.find((s) => s.slug === slug))
    .filter((s): s is MagazineStory => Boolean(s));

  return {
    currentEdition,
    currentEditionStories,
    dailyDispatchStories: getPublicDailyDispatchStories(),
    forthcomingEdition,
    forthcomingPreviews: getPublicForthcomingPreviews(forthcomingEdition.slug),
    archivedEditions,
    allPublishedStories: publishedStories,
    departments: EDITORIAL_DEPARTMENTS,
    journalists: getPublicJournalists(),
    editorialBoard: EDITORIAL_BOARD_MEMBERS,
    mastheadSections: MASTHEAD_SECTION_SPECS,
    mastheadPositions: getPublicMastheadPositions(),
    editorialCharterCommitments: EDITORIAL_CHARTER_COMMITMENTS,
    regionalBureaus: REGIONAL_REPORTING_BUREAUS,
    workflowStages: EDITORIAL_WORKFLOW_STAGES,
    contributorCategories: CONTRIBUTOR_ROLE_CATEGORIES,
    onboardingLifecycle: ONBOARDING_LIFECYCLE_STEPS,
    publicationCalendar: PUBLICATION_CALENDAR_MILESTONES,
  };
}

// ─── PUBLIC PITCH INTAKE (STAGE 01: PITCHING) ───────────────────────────────

export function submitEditorialPitch(input: {
  proposedHeadline: string;
  departmentId: EditorialDepartmentId;
  region: string;
  storySummary: string;
  reportingAccessAndSources: string;
  estimatedWordCount?: string;
  authorName: string;
  authorEmail: string;
  authorPortfolioUrl?: string;
  requiresSourceProtection?: boolean;
  journalistSlug?: string;
}): EditorialPitchSubmission {
  const store = readDispatchStore();
  const seq = String(store.pitches.length + 101).padStart(4, '0');
  const pitch: EditorialPitchSubmission = {
    id: `hd-pitch-${Date.now()}`,
    trackingCode: `HD-PITCH-${seq}`,
    proposedHeadline: input.proposedHeadline.trim(),
    departmentId: input.departmentId,
    region: input.region.trim() || 'Western Himalayas',
    storySummary: input.storySummary.trim(),
    reportingAccessAndSources: input.reportingAccessAndSources.trim(),
    estimatedWordCount: input.estimatedWordCount?.trim(),
    authorName: input.authorName.trim(),
    authorEmail: input.authorEmail.trim().toLowerCase(),
    authorPortfolioUrl: input.authorPortfolioUrl?.trim(),
    requiresSourceProtection: Boolean(input.requiresSourceProtection),
    workflowStage: 'pitching',
    submittedAt: new Date().toISOString(),
    journalistSlug: input.journalistSlug,
  };
  store.pitches.unshift(pitch);
  writeDispatchStore(store);
  return pitch;
}

// ─── JOURNALIST RECRUITMENT & ONBOARDING APPLICATION LIFECYCLE ──────────────

export function submitNewsroomApplication(input: {
  fullName: string;
  email: string;
  locationOrDistrict: string;
  kashmirDistrict?: string;
  roleCategoryId: ContributorRoleCategoryId;
  preferredDepartmentId?: EditorialDepartmentId;
  engagementBasis?: ContributorEngagementBasis;
  professionalBackground: string;
  portfolioUrl: string;
  publishedWorkNotes?: string;
  motivationStatement: string;
  languages?: string[];
  charterAccepted: boolean;
  nonEmploymentAcknowledged: boolean;
  publicPortfolioConsent: boolean;
  credentialAttachment?: PrivateCredentialAttachment;
}): NewsroomContributorApplication {
  const store = readDispatchStore();
  const catSpec =
    CONTRIBUTOR_ROLE_CATEGORIES.find((c) => c.id === input.roleCategoryId) ||
    CONTRIBUTOR_ROLE_CATEGORIES[0];

  const seq = String(store.applications.length + 101).padStart(4, '0');
  const nowIso = new Date().toISOString();
  const referenceNumber = `HD-APP-2026-${seq}`;

  const app: NewsroomContributorApplication = {
    id: `hd-app-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    referenceNumber,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    locationOrDistrict: input.locationOrDistrict.trim(),
    kashmirDistrict: input.kashmirDistrict?.trim() || undefined,
    track: catSpec.track,
    roleCategoryId: catSpec.id,
    roleCategoryTitle: catSpec.title,
    preferredDepartmentId: input.preferredDepartmentId || catSpec.primaryDepartmentId,
    engagementBasis: input.engagementBasis || 'voluntary_editorial_fellow',
    professionalBackground: input.professionalBackground.trim(),
    portfolioUrl: input.portfolioUrl.trim(),
    publishedWorkNotes: input.publishedWorkNotes?.trim() || undefined,
    motivationStatement: input.motivationStatement.trim(),
    languages:
      input.languages && input.languages.length > 0
        ? input.languages
        : ['English'],
    charterAccepted: Boolean(input.charterAccepted),
    charterAcceptedAt: nowIso,
    nonEmploymentAcknowledged: Boolean(input.nonEmploymentAcknowledged),
    publicPortfolioConsent: Boolean(input.publicPortfolioConsent),
    status: 'Submitted',
    submittedAt: nowIso,
    updatedAt: nowIso,
    credentialAttachment: input.credentialAttachment,
    publicPortfolioApproved: false,
    applicantFacingNote:
      'Application logged with the Himalayan Dispatch Editorial Administration. Credential verification and department review precede final consideration by the Founding Editor-in-Chief.',
    auditTrail: [
      {
        id: `aud-${Date.now()}`,
        timestamp: nowIso,
        actor: input.fullName.trim(),
        authorityTitle: 'Applicant Submission',
        fromStatus: 'New',
        toStatus: 'Submitted',
        note: `Submitted application for ${catSpec.title} (${catSpec.track === 'regular_journalist' ? 'Regular Newsroom Track' : 'Specialist Contributor Track'}). Editorial charter accepted.`,
      },
    ],
    correspondence: [],
  };

  store.applications.unshift(app);
  writeDispatchStore(store);
  return app;
}

export function lookupApplicationStatusByRefAndEmail(
  referenceNumber: string,
  email: string
): PublicApplicationStatusSummary | null {
  const store = readDispatchStore();
  const normRef = referenceNumber.trim().toUpperCase();
  const normEmail = email.trim().toLowerCase();
  if (!normRef || !normEmail) return null;

  const app = store.applications.find(
    (a) => a.referenceNumber.toUpperCase() === normRef && a.email.toLowerCase() === normEmail
  );
  if (!app) return null;

  const isApprovedActive = app.status === 'Approved' && app.charterAccepted;

  return {
    referenceNumber: app.referenceNumber,
    fullName: app.fullName,
    roleCategoryTitle: app.roleCategoryTitle,
    track: app.track,
    locationOrDistrict: app.locationOrDistrict,
    status: app.status,
    currentLifecycleStep: mapStatusToLifecycleStep(app.status, app.publicPortfolioApproved),
    submittedAt: app.submittedAt,
    updatedAt: app.updatedAt,
    charterAccepted: app.charterAccepted,
    publicPortfolioConsent: app.publicPortfolioConsent,
    publicPortfolioApproved: app.publicPortfolioApproved,
    assignedJournalistSlug: isApprovedActive ? app.assignedJournalistSlug : undefined,
    workspaceAccessActive: isApprovedActive,
    workspaceAccessCode: isApprovedActive ? app.workspaceAccessCode : undefined,
    approvedBy: app.approvedBy,
    approvedByTitle: app.approvedByTitle,
    approvedAt: app.approvedAt,
    applicantFacingNote: app.applicantFacingNote,
    hasCredentialOnFile: Boolean(app.credentialAttachment),
    credentialFileName: app.credentialAttachment?.fileName,
  };
}

export function applicantUpdateOwnApplication(input: {
  referenceNumber: string;
  email: string;
  action: 'withdraw' | 'provide_additional_info';
  supplementalNote?: string;
  portfolioUrl?: string;
}): PublicApplicationStatusSummary | null {
  const store = readDispatchStore();
  const normRef = input.referenceNumber.trim().toUpperCase();
  const normEmail = input.email.trim().toLowerCase();
  const idx = store.applications.findIndex(
    (a) => a.referenceNumber.toUpperCase() === normRef && a.email.toLowerCase() === normEmail
  );
  if (idx === -1) return null;

  const app = store.applications[idx];
  const nowIso = new Date().toISOString();

  if (input.action === 'withdraw') {
    const prev = app.status;
    app.status = 'Withdrawn';
    app.publicPortfolioApproved = false;
    app.updatedAt = nowIso;
    app.applicantFacingNote = 'Application withdrawn at the applicant’s request.';
    app.auditTrail.unshift({
      id: `aud-${Date.now()}`,
      timestamp: nowIso,
      actor: app.fullName,
      authorityTitle: 'Applicant',
      fromStatus: prev,
      toStatus: 'Withdrawn',
      note: input.supplementalNote?.trim() || 'Withdrawn by applicant via status portal.',
    });
  } else if (input.action === 'provide_additional_info') {
    const note = (input.supplementalNote || '').trim();
    if (input.portfolioUrl?.trim()) {
      app.portfolioUrl = input.portfolioUrl.trim();
    }
    if (note) {
      app.correspondence.push({
        id: `msg-${Date.now()}`,
        timestamp: nowIso,
        senderRole: 'journalist',
        senderName: app.fullName,
        senderTitle: 'Applicant',
        message: note,
      });
    }
    if (app.status === 'Additional Information Required') {
      const prev = app.status;
      app.status = 'Under Credential Review';
      app.auditTrail.unshift({
        id: `aud-${Date.now()}`,
        timestamp: nowIso,
        actor: app.fullName,
        authorityTitle: 'Applicant',
        fromStatus: prev,
        toStatus: 'Under Credential Review',
        note: 'Supplemental information submitted by applicant.',
      });
    }
    app.updatedAt = nowIso;
  }

  writeDispatchStore(store);
  return lookupApplicationStatusByRefAndEmail(normRef, normEmail);
}

// ─── JOURNALIST WORKSPACE AUTHENTICATION & SCOPED OPERATIONS ────────────────

const MASTHEAD_EMAIL_TO_SLUG: Record<string, string> = {
  'fayaz@kashmir-ecowatch.com': 'dr-fayaz-ahmad-khan',
  'editor@kashmir-ecowatch.com': 'dr-fayaz-ahmad-khan',
  'aaliya@kashmir-ecowatch.com': 'aaliya-andrabi',
  'danish@kashmir-ecowatch.com': 'danish-wani',
  'nida@kashmir-ecowatch.com': 'dr-nida-hamdani',
  'rafiq@kashmir-ecowatch.com': 'rafiq-ahmad-bhat',
};

/**
 * Verifies journalist credentials for activating a workspace session.
 * Unapproved, pending, declined, withdrawn, or suspended applicants are strictly rejected (`403`).
 */
export function authenticateJournalistForWorkspace(input: {
  email: string;
  accessCodeOrRef: string;
}):
  | { ok: true; claims: Omit<JournalistSessionClaims, 'iat' | 'exp'> }
  | { ok: false; httpStatus: 401 | 403; error: string } {
  const normEmail = input.email.trim().toLowerCase();
  const code = input.accessCodeOrRef.trim();

  if (!normEmail || !code) {
    return {
      ok: false,
      httpStatus: 401,
      error: 'Please enter both your registered email address and newsroom access code.',
    };
  }

  // 1. Check Founding Masthead roster (paired with configured ADMIN_PASSCODE or DISPATCH_MASTHEAD_CODE)
  const mastheadSlug = MASTHEAD_EMAIL_TO_SLUG[normEmail];
  const validMastheadSecret =
    verifyAdminPasscode(code).valid ||
    (isConfiguredSafeSecret(process.env.DISPATCH_MASTHEAD_CODE, 10) &&
      timingSafeSecretMatch(code, process.env.DISPATCH_MASTHEAD_CODE, 10));

  if (mastheadSlug && validMastheadSecret) {
    const profile = JOURNALIST_PROFILES.find((j) => j.slug === mastheadSlug);
    if (profile) {
      return {
        ok: true,
        claims: {
          journalistSlug: profile.slug,
          email: normEmail,
          name: profile.name,
          roleTitle: profile.roleTitle,
        },
      };
    }
  }

  // 2. Check contributor applications in persistent store
  const store = readDispatchStore();
  const matchingApps = store.applications.filter(
    (a) => a.email.toLowerCase() === normEmail
  );

  if (matchingApps.length === 0) {
    return {
      ok: false,
      httpStatus: 401,
      error: 'No Himalayan Dispatch journalist record found for those credentials.',
    };
  }

  // Find exact match on workspaceAccessCode or referenceNumber
  const app =
    matchingApps.find(
      (a) =>
        (a.workspaceAccessCode && a.workspaceAccessCode.toUpperCase() === code.toUpperCase()) ||
        a.referenceNumber.toUpperCase() === code.toUpperCase()
    ) || matchingApps[0];

  if (app.status !== 'Approved') {
    return {
      ok: false,
      httpStatus: 403,
      error: `Newsroom workspace access requires editorial approval. Current application status: "${app.status}".`,
    };
  }

  if (!app.charterAccepted) {
    return {
      ok: false,
      httpStatus: 403,
      error: 'Editorial charter acceptance is required before activating newsroom access.',
    };
  }

  if (
    !app.workspaceAccessCode ||
    code.toUpperCase() !== app.workspaceAccessCode.toUpperCase()
  ) {
    return {
      ok: false,
      httpStatus: 401,
      error:
        'Invalid Newsroom Access Code. Once approved, retrieve your workspace access code from the Application Status portal.',
    };
  }

  return {
    ok: true,
    claims: {
      journalistSlug: app.assignedJournalistSlug || slugifyName(app.fullName),
      email: app.email,
      name: app.fullName,
      roleTitle: app.roleCategoryTitle,
      applicationId: app.id,
    },
  };
}

export function getJournalistWorkspaceBundle(claims: JournalistSessionClaims) {
  const store = readDispatchStore();
  const slug = claims.journalistSlug;

  // Strictly scope assignments, pitches, drafts, evidence, media & correspondence to this journalist!
  const myAssignments = getAllMergedAssignmentsInternal()
    .filter((a) => a.journalistSlug === slug)
    .map((a) => ({
      id: a.id,
      editionSlug: a.editionSlug,
      workingTitle: a.workingTitle,
      synopsis: a.synopsis,
      departmentId: a.departmentId,
      departmentLabel: a.departmentLabel,
      workflowStage: a.workflowStage,
      publicStageLabel: a.publicStageLabel,
      anticipatedPublicationWindow: a.anticipatedPublicationWindow,
      region: a.region,
      isConfidential: a.isConfidential,
    }));

  const myPitches = store.pitches.filter(
    (p) =>
      p.journalistSlug === slug ||
      p.authorEmail.toLowerCase() === claims.email.toLowerCase()
  );

  const myDrafts = store.journalistDrafts.filter((d) => d.journalistSlug === slug);
  const myEvidence = store.journalistEvidence.filter((e) => e.journalistSlug === slug);
  const myMedia = store.journalistMedia.filter((m) => m.journalistSlug === slug);

  const publishedStories = getPublicPublishedStories().filter(
    (s) => s.journalistSlug === slug || s.photographyByline === claims.name
  );

  const appRecord = claims.applicationId
    ? store.applications.find((a) => a.id === claims.applicationId)
    : store.applications.find((a) => a.assignedJournalistSlug === slug);

  const correspondence = appRecord ? appRecord.correspondence : [];

  const baseProfile =
    getPublicJournalists().find((j) => j.slug === slug) ||
    JOURNALIST_PROFILES.find((j) => j.slug === slug);

  const ov = store.journalistProfileOverrides[slug] || {};

  return {
    journalist: {
      slug,
      name: claims.name,
      email: claims.email,
      roleTitle: claims.roleTitle,
      basedIn: ov.basedIn || baseProfile?.basedIn || appRecord?.locationOrDistrict || 'Western Himalayas',
      beat: ov.beat || baseProfile?.beat || claims.roleTitle,
      shortBio: ov.shortBio || baseProfile?.shortBio || appRecord?.professionalBackground || '',
      languages: ov.languages || baseProfile?.languages || appRecord?.languages || ['English'],
      publicPortfolioConsent:
        ov.publicPortfolioConsent !== undefined
          ? ov.publicPortfolioConsent
          : appRecord?.publicPortfolioConsent ?? true,
      publicPortfolioLive: Boolean(getPublicJournalists().some((j) => j.slug === slug)),
      engagementNotice:
        'Independent Editorial Contributor / Fellow — Non-employment literary & journalistic affiliation. Does not confer statutory government press accreditation.',
    },
    myAssignments,
    myPitches,
    myDrafts,
    myEvidence,
    myMedia,
    correspondence,
    publishedStories,
    editions: MAGAZINE_EDITIONS,
    departments: EDITORIAL_DEPARTMENTS,
    workflowStages: EDITORIAL_WORKFLOW_STAGES,
    publicationCalendar: PUBLICATION_CALENDAR_MILESTONES,
  };
}

export function upsertJournalistDraft(
  claims: JournalistSessionClaims,
  input: {
    id?: string;
    workingTitle: string;
    subtitle?: string;
    targetEditionSlug: string;
    departmentId: EditorialDepartmentId;
    dateline?: string;
    bodyMarkdown: string;
    submitForReview?: boolean;
  }
): JournalistDraftRecord {
  const store = readDispatchStore();
  const words = input.bodyMarkdown
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const nowIso = new Date().toISOString();
  const nextStage: EditorialWorkflowStage = input.submitForReview
    ? 'fact_checking'
    : 'drafting';

  if (input.id) {
    const existing = store.journalistDrafts.find(
      (d) => d.id === input.id && d.journalistSlug === claims.journalistSlug
    );
    if (existing) {
      existing.workingTitle = input.workingTitle.trim();
      existing.subtitle = (input.subtitle || '').trim();
      existing.targetEditionSlug = input.targetEditionSlug;
      existing.departmentId = input.departmentId;
      existing.dateline = (input.dateline || 'WESTERN HIMALAYAS').trim();
      existing.bodyMarkdown = input.bodyMarkdown;
      existing.wordCount = words;
      existing.workflowStage = nextStage;
      existing.updatedAt = nowIso;
      writeDispatchStore(store);
      return existing;
    }
  }

  const created: JournalistDraftRecord = {
    id: `hd-draft-${Date.now()}`,
    journalistSlug: claims.journalistSlug,
    workingTitle: input.workingTitle.trim(),
    subtitle: (input.subtitle || '').trim(),
    targetEditionSlug: input.targetEditionSlug || 'issue-02-a-world-in-transition',
    departmentId: input.departmentId || 'longform-features',
    dateline: (input.dateline || 'WESTERN HIMALAYAS').trim(),
    bodyMarkdown: input.bodyMarkdown,
    wordCount: words,
    workflowStage: nextStage,
    updatedAt: nowIso,
  };
  store.journalistDrafts.unshift(created);
  writeDispatchStore(store);
  return created;
}

export function appendJournalistEvidence(
  claims: JournalistSessionClaims,
  input: {
    title: string;
    sourceType: JournalistEvidenceRecord['sourceType'];
    referenceCitation: string;
    relatedStoryOrDraftTitle: string;
    isSensitiveProtected: boolean;
  }
): JournalistEvidenceRecord {
  const store = readDispatchStore();
  const rec: JournalistEvidenceRecord = {
    id: `hd-ev-${Date.now()}`,
    journalistSlug: claims.journalistSlug,
    title: input.title.trim(),
    sourceType: input.sourceType,
    referenceCitation: input.referenceCitation.trim(),
    relatedStoryOrDraftTitle: input.relatedStoryOrDraftTitle.trim(),
    isSensitiveProtected: Boolean(input.isSensitiveProtected),
    loggedAt: new Date().toISOString(),
  };
  store.journalistEvidence.unshift(rec);
  writeDispatchStore(store);
  return rec;
}

export function appendJournalistMedia(
  claims: JournalistSessionClaims,
  input: {
    title: string;
    mediaType: JournalistMediaRecord['mediaType'];
    locationAndElevation: string;
    captionAndEthicsNote: string;
    mediaUrl?: string;
  }
): JournalistMediaRecord {
  const store = readDispatchStore();
  const rec: JournalistMediaRecord = {
    id: `hd-media-${Date.now()}`,
    journalistSlug: claims.journalistSlug,
    title: input.title.trim(),
    mediaType: input.mediaType,
    locationAndElevation: input.locationAndElevation.trim(),
    captionAndEthicsNote: input.captionAndEthicsNote.trim(),
    mediaUrl: input.mediaUrl?.trim() || undefined,
    loggedAt: new Date().toISOString(),
  };
  store.journalistMedia.unshift(rec);
  writeDispatchStore(store);
  return rec;
}

export function appendJournalistCorrespondence(
  claims: JournalistSessionClaims,
  message: string
): boolean {
  const store = readDispatchStore();
  const app = claims.applicationId
    ? store.applications.find((a) => a.id === claims.applicationId)
    : store.applications.find((a) => a.assignedJournalistSlug === claims.journalistSlug);

  if (!app) return false;
  app.correspondence.push({
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    senderRole: 'journalist',
    senderName: claims.name,
    senderTitle: claims.roleTitle,
    message: message.trim(),
  });
  app.updatedAt = new Date().toISOString();
  writeDispatchStore(store);
  return true;
}

export function updateJournalistWorkspaceProfile(
  claims: JournalistSessionClaims,
  updates: {
    shortBio?: string;
    basedIn?: string;
    beat?: string;
    languages?: string[];
    publicPortfolioConsent?: boolean;
  }
) {
  const store = readDispatchStore();
  const cur = store.journalistProfileOverrides[claims.journalistSlug] || {};
  store.journalistProfileOverrides[claims.journalistSlug] = {
    ...cur,
    ...(updates.shortBio !== undefined ? { shortBio: updates.shortBio.trim() } : {}),
    ...(updates.basedIn !== undefined ? { basedIn: updates.basedIn.trim() } : {}),
    ...(updates.beat !== undefined ? { beat: updates.beat.trim() } : {}),
    ...(updates.languages !== undefined ? { languages: updates.languages } : {}),
    ...(updates.publicPortfolioConsent !== undefined
      ? { publicPortfolioConsent: updates.publicPortfolioConsent }
      : {}),
  };

  if (claims.applicationId && updates.publicPortfolioConsent !== undefined) {
    const app = store.applications.find((a) => a.id === claims.applicationId);
    if (app) {
      app.publicPortfolioConsent = updates.publicPortfolioConsent;
    }
  }
  writeDispatchStore(store);
  return getJournalistWorkspaceBundle(claims).journalist;
}

// ─── AUTHORIZED ADMIN NEWSROOM & EDITORIAL APPROVAL MUTATIONS ───────────────

export function getAdminDispatchBundle() {
  const store = readDispatchStore();
  // Strip raw filesystem storage paths even in admin JSON payload; expose safe metadata + audit trail
  const safeAdminApplications = store.applications.map((a) => ({
    ...a,
    credentialAttachment: a.credentialAttachment
      ? {
          fileName: a.credentialAttachment.fileName,
          mimeType: a.credentialAttachment.mimeType,
          sizeBytes: a.credentialAttachment.sizeBytes,
          privateStorageKey: '[PROTECTED_SERVER_VAULT]',
          uploadedAt: a.credentialAttachment.uploadedAt,
        }
      : undefined,
  }));

  return {
    editions: MAGAZINE_EDITIONS,
    stories: getAllMergedStoriesInternal(),
    assignments: getAllMergedAssignmentsInternal(),
    pitches: store.pitches,
    applications: safeAdminApplications,
    journalistDrafts: store.journalistDrafts,
    workflowStages: EDITORIAL_WORKFLOW_STAGES,
    departments: EDITORIAL_DEPARTMENTS,
    journalists: getPublicJournalists(),
    contributorCategories: CONTRIBUTOR_ROLE_CATEGORIES,
    mastheadSections: MASTHEAD_SECTION_SPECS,
    mastheadPositions: getAllMastheadPositionsInternal(),
  };
}

export function adminUpdateMastheadPosition(
  positionId: string,
  updates: {
    roleTitle?: string;
    holderName?: string;
    domainsRubric?: string;
    mandateDescription?: string;
    status?: MastheadAppointmentStatus;
    publicVacantLabel?: string;
    internalAdminNote?: string;
  },
  actor: string
): MastheadPositionRecord | null {
  const all = getAllMastheadPositionsInternal();
  const target = all.find((p) => p.id === positionId);
  if (!target) return null;

  const store = readDispatchStore();
  const prevOv = store.mastheadPositionOverrides[positionId] || {
    updatedAt: '',
    updatedBy: '',
  };
  const nowIso = new Date().toISOString();

  store.mastheadPositionOverrides[positionId] = {
    ...prevOv,
    ...(updates.roleTitle !== undefined ? { roleTitle: updates.roleTitle.trim() } : {}),
    ...(updates.holderName !== undefined ? { holderName: updates.holderName.trim() } : {}),
    ...(updates.domainsRubric !== undefined
      ? { domainsRubric: updates.domainsRubric.trim() }
      : {}),
    ...(updates.mandateDescription !== undefined
      ? { mandateDescription: updates.mandateDescription.trim() }
      : {}),
    ...(updates.status !== undefined ? { status: updates.status } : {}),
    ...(updates.publicVacantLabel !== undefined
      ? { publicVacantLabel: updates.publicVacantLabel.trim() }
      : {}),
    ...(updates.internalAdminNote !== undefined
      ? { internalAdminNote: updates.internalAdminNote.trim() }
      : {}),
    updatedAt: nowIso,
    updatedBy: actor,
  };

  writeDispatchStore(store);
  return getAllMastheadPositionsInternal().find((p) => p.id === positionId) || null;
}

export function adminCreateMastheadPosition(
  input: {
    sectionId: MastheadSectionId;
    roleTitle: string;
    holderName?: string;
    domainsRubric: string;
    mandateDescription: string;
    status: MastheadAppointmentStatus;
    publicVacantLabel?: string;
    isCouncilSpecialistRow?: boolean;
    internalAdminNote?: string;
  },
  actor: string
): MastheadPositionRecord {
  const store = readDispatchStore();
  const existingInSection = getAllMastheadPositionsInternal().filter(
    (p) => p.sectionId === input.sectionId
  );
  const nextOrder =
    existingInSection.length > 0
      ? Math.max(...existingInSection.map((p) => p.order)) + 1
      : 1;
  const nowIso = new Date().toISOString();

  const created: MastheadPositionRecord = {
    id: `mp-custom-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    sectionId: input.sectionId,
    order: nextOrder,
    roleTitle: input.roleTitle.trim(),
    holderName: (input.holderName || '').trim(),
    domainsRubric: input.domainsRubric.trim(),
    mandateDescription: input.mandateDescription.trim(),
    status: input.status,
    publicVacantLabel: input.publicVacantLabel?.trim() || undefined,
    isCouncilSpecialistRow: Boolean(input.isCouncilSpecialistRow),
    internalAdminNote: input.internalAdminNote?.trim() || undefined,
    updatedAt: nowIso,
    updatedBy: actor,
  };

  store.customMastheadPositions.push(created);
  writeDispatchStore(store);
  return created;
}

export function adminUpdateApplicationStatus(
  applicationId: string,
  updates: {
    status: NewsroomApplicationStatus;
    applicantFacingNote?: string;
    internalEditorialNote?: string;
    publicPortfolioApproved?: boolean;
    approvingAuthority?: 'Founding Editor-in-Chief' | 'Editorial Administrator';
  },
  actor: string
): NewsroomContributorApplication | null {
  const store = readDispatchStore();
  const app = store.applications.find((a) => a.id === applicationId);
  if (!app) return null;

  const prevStatus = app.status;
  const nowIso = new Date().toISOString();
  const isFinalApproval = updates.status === 'Approved';

  const authorityTitle = isFinalApproval
    ? updates.approvingAuthority === 'Editorial Administrator'
      ? 'Authorized Editorial Administrator'
      : 'Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief'
    : 'Himalayan Dispatch Editorial Administration';

  app.status = updates.status;
  app.updatedAt = nowIso;

  if (updates.applicantFacingNote !== undefined) {
    app.applicantFacingNote = updates.applicantFacingNote.trim();
  }
  if (updates.internalEditorialNote !== undefined) {
    app.internalEditorialNote = updates.internalEditorialNote.trim();
  }

  if (isFinalApproval) {
    if (!app.assignedJournalistSlug) {
      const baseSlug = slugifyName(app.fullName);
      const taken = new Set([
        ...JOURNALIST_PROFILES.map((j) => j.slug),
        ...store.applications
          .filter((x) => x.id !== app.id && x.assignedJournalistSlug)
          .map((x) => x.assignedJournalistSlug!),
      ]);
      app.assignedJournalistSlug = taken.has(baseSlug)
        ? `${baseSlug}-${app.referenceNumber.slice(-4).toLowerCase()}`
        : baseSlug;
    }
    if (!app.workspaceAccessCode) {
      app.workspaceAccessCode = `HD-KEY-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    }
    app.approvedBy = isFinalApproval && authorityTitle.includes('Dr. Fayaz Ahmad Khan')
      ? 'Dr. Fayaz Ahmad Khan'
      : actor;
    app.approvedByTitle = authorityTitle;
    app.approvedAt = nowIso;
    app.publicPortfolioApproved =
      typeof updates.publicPortfolioApproved === 'boolean'
        ? updates.publicPortfolioApproved && app.publicPortfolioConsent
        : app.publicPortfolioConsent;
  } else {
    // Revoke public portfolio visibility whenever status is not Approved (e.g., Suspended / Declined / Withdrawn)
    app.publicPortfolioApproved = false;
  }

  if (typeof updates.publicPortfolioApproved === 'boolean' && app.status === 'Approved') {
    app.publicPortfolioApproved = updates.publicPortfolioApproved && app.publicPortfolioConsent;
  }

  app.auditTrail.unshift({
    id: `aud-${Date.now()}`,
    timestamp: nowIso,
    actor,
    authorityTitle,
    fromStatus: prevStatus,
    toStatus: updates.status,
    note:
      updates.applicantFacingNote?.trim() ||
      updates.internalEditorialNote?.trim() ||
      `Application moved from "${prevStatus}" to "${updates.status}".`,
  });

  writeDispatchStore(store);
  return app;
}

export function adminSendApplicationCorrespondence(
  applicationId: string,
  message: string,
  actor: string,
  senderTitle = 'Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief'
): NewsroomContributorApplication | null {
  const store = readDispatchStore();
  const app = store.applications.find((a) => a.id === applicationId);
  if (!app) return null;

  const nowIso = new Date().toISOString();
  app.correspondence.push({
    id: `msg-${Date.now()}`,
    timestamp: nowIso,
    senderRole: 'editor',
    senderName: actor,
    senderTitle,
    message: message.trim(),
  });
  app.updatedAt = nowIso;
  writeDispatchStore(store);
  return app;
}

export function adminCreateEditorialAssignment(input: {
  workingTitle: string;
  synopsis: string;
  departmentId: EditorialDepartmentId;
  editionSlug: string;
  journalistSlug: string;
  bylineDisplay: string;
  region: string;
  isConfidential: boolean;
}): ForthcomingAssignment {
  const store = readDispatchStore();
  const dept =
    EDITORIAL_DEPARTMENTS.find((d) => d.id === input.departmentId) || EDITORIAL_DEPARTMENTS[0];
  const created: ForthcomingAssignment = {
    id: `assign-${Date.now()}`,
    editionSlug: input.editionSlug || 'issue-02-a-world-in-transition',
    workingTitle: input.workingTitle.trim(),
    synopsis: input.synopsis.trim(),
    departmentId: dept.id,
    departmentLabel: dept.name,
    journalistSlug: input.journalistSlug,
    bylineDisplay: input.isConfidential ? 'Restricted Desk Assignment' : input.bylineDisplay,
    workflowStage: 'assignment',
    publicStageLabel: 'Commissioned',
    anticipatedPublicationWindow: 'Issue 02 · Forthcoming',
    region: input.region.trim() || 'Western Himalayas',
    publicPreviewApproved: false,
    isConfidential: Boolean(input.isConfidential),
    sourceProtectionLevel: input.isConfidential
      ? 'strict_confidential'
      : 'standard_on_record',
  };
  store.customAssignments.unshift(created);
  writeDispatchStore(store);
  return created;
}

export function adminUpdateStoryWorkflow(
  slug: string,
  workflowStage: EditorialWorkflowStage
): MagazineStory | null {
  const exists = MAGAZINE_STORIES.some((s) => s.slug === slug);
  if (!exists) return null;
  const store = readDispatchStore();
  const isPublished =
    workflowStage === 'publication' ||
    workflowStage === 'corrections' ||
    workflowStage === 'archiving';
  store.storyWorkflowOverrides[slug] = {
    workflowStage,
    isPublished,
    updatedAt: new Date().toISOString(),
  };
  writeDispatchStore(store);
  return getAllMergedStoriesInternal().find((s) => s.slug === slug) || null;
}

export function adminAppendStoryCorrection(
  slug: string,
  kind: StoryCorrectionEntry['kind'],
  note: string,
  approvedBy: string
): StoryCorrectionEntry | null {
  const exists = MAGAZINE_STORIES.some((s) => s.slug === slug);
  if (!exists) return null;
  const store = readDispatchStore();
  const entry: StoryCorrectionEntry = {
    id: `corr-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    kind,
    note: note.trim(),
    approvedBy: approvedBy.trim() || 'Office of Editorial Standards & Verification',
  };
  if (!store.storyCorrections[slug]) {
    store.storyCorrections[slug] = [];
  }
  store.storyCorrections[slug].unshift(entry);
  writeDispatchStore(store);
  return entry;
}

export function adminUpdateAssignment(
  id: string,
  updates: {
    workflowStage?: EditorialWorkflowStage;
    publicStageLabel?: PublicProductionBadge;
    bylineDisplay?: string;
    publicPreviewApproved?: boolean;
    isConfidential?: boolean;
  }
): ForthcomingAssignment | null {
  const all = getAllMergedAssignmentsInternal();
  const target = all.find((a) => a.id === id);
  if (!target) return null;

  const store = readDispatchStore();
  const nextConfidential =
    typeof updates.isConfidential === 'boolean' ? updates.isConfidential : target.isConfidential;
  const nextPreviewApproved =
    nextConfidential || target.sourceProtectionLevel === 'strict_confidential'
      ? false
      : typeof updates.publicPreviewApproved === 'boolean'
      ? updates.publicPreviewApproved
      : target.publicPreviewApproved;

  store.assignmentOverrides[id] = {
    workflowStage: updates.workflowStage || target.workflowStage,
    publicStageLabel: updates.publicStageLabel || target.publicStageLabel,
    bylineDisplay: updates.bylineDisplay ?? target.bylineDisplay,
    isConfidential: nextConfidential,
    publicPreviewApproved: nextPreviewApproved,
    updatedAt: new Date().toISOString(),
  };
  writeDispatchStore(store);
  return getAllMergedAssignmentsInternal().find((a) => a.id === id) || null;
}

export function adminUpdatePitchStage(
  pitchId: string,
  workflowStage: EditorialWorkflowStage,
  reviewNotes?: string
): EditorialPitchSubmission | null {
  const store = readDispatchStore();
  const pitch = store.pitches.find((p) => p.id === pitchId);
  if (!pitch) return null;
  pitch.workflowStage = workflowStage;
  if (reviewNotes !== undefined) {
    pitch.reviewNotes = reviewNotes.trim();
  }
  writeDispatchStore(store);
  return pitch;
}

/**
 * Transfers an HD-ANIE research dossier & manuscript draft to a registered human
 * journalist's Newsroom Workspace without overwriting any existing human drafts.
 */
export function adminTransferAnieDossierToJournalist(
  anieDraftId: string,
  journalistSlug: string,
  actor: string
): { ok: boolean; error?: string } {
  const anieStore = readAnieStore();
  const draft = anieStore.drafts.find((d) => d.id === anieDraftId);
  if (!draft) return { ok: false, error: 'HD-ANIE draft not found.' };

  const journalists = getPublicJournalists();
  const dispatchStore = readDispatchStore();
  const approvedApp = dispatchStore.applications.find(
    (a) => a.assignedJournalistSlug === journalistSlug && a.status === 'Approved'
  );
  const journalistName =
    journalists.find((j) => j.slug === journalistSlug)?.name ||
    approvedApp?.fullName ||
    journalistSlug;

  const nowIso = new Date().toISOString();
  draft.assignedJournalistSlug = journalistSlug;
  draft.assignedJournalistName = journalistName;
  draft.updatedAt = nowIso;
  draft.revisionHistory.unshift({
    id: `rev-assign-${Date.now()}`,
    timestamp: nowIso,
    actor,
    actorType: 'administrator',
    summary: `Assigned AI research dossier & working draft to human contributor ${journalistName} (${journalistSlug}).`,
    previousStatus: draft.editorialStatus,
    newStatus: draft.editorialStatus,
  });

  // Create linked human workspace draft copy & assignment so the journalist can adopt/revise cleanly
  const markdownBody = draft.chapters
    .map((ch) => `## ${ch.numberRoman}. ${ch.title}\n\n${ch.paragraphs.join('\n\n')}`)
    .join('\n\n');

  dispatchStore.journalistDrafts.unshift({
    id: `jd-anie-${Date.now()}`,
    journalistSlug,
    workingTitle: draft.headline,
    subtitle: draft.standfirst,
    targetEditionSlug:
      draft.stream === 'monthly_edition'
        ? draft.targetEditionSlug
        : 'issue-02-a-world-in-transition',
    departmentId: draft.departmentId,
    dateline: draft.dateline,
    bodyMarkdown: `${markdownBody}\n\n---\n*AI Research Dossier Handoff Note: Verify all external citations and replace institutional disclosure upon human field/editorial completion.*`,
    wordCount: draft.wordCount,
    workflowStage: 'drafting',
    updatedAt: nowIso,
  });

  dispatchStore.customAssignments.unshift({
    id: `assign-anie-${Date.now()}`,
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: draft.headline,
    synopsis: draft.standfirst,
    departmentId: draft.departmentId,
    departmentLabel: draft.departmentRubric,
    journalistSlug,
    bylineDisplay: journalistName,
    workflowStage: 'assignment',
    publicStageLabel: 'In reporting',
    anticipatedPublicationWindow: 'Forthcoming',
    region: draft.regionDisplay,
    publicPreviewApproved: false,
    isConfidential: draft.riskLevel === 'RED',
    sourceProtectionLevel:
      draft.riskLevel === 'RED' ? 'strict_confidential' : 'standard_on_record',
  });

  recordAnieAudit(anieStore, {
    actor,
    category: 'editorial_action',
    action: 'assign_to_journalist',
    targetId: draft.id,
    targetTitle: draft.headline,
    details: `Transferred research dossier to ${journalistName} (${journalistSlug}) in Journalist Workspace.`,
  });

  writeDispatchStore(dispatchStore);
  writeAnieStore(anieStore);
  return { ok: true };
}

// ─── DAILY DISPATCH, BEATS, DEPARTMENTS, BUREAUS & CORRECTIONS GETTERS ──────

export function getPublicDailyDispatches(): DailyDispatchArticle[] {
  const store = readDispatchStore();
  const anieStore = readAnieStore();

  const aniePublishedDispatches: DailyDispatchArticle[] = anieStore.drafts
    .filter((d) => d.editorialStatus === 'published' && d.stream === 'daily_dispatch')
    .map((d) => {
      const validBureauId: BureauSlugId = (
        ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'].includes(d.bureauId)
          ? d.bureauId
          : 'kashmir'
      ) as BureauSlugId;
      const beat =
        REPORTING_BEATS_FULL.find((b) => b.leadDepartmentId === d.departmentId) ||
        REPORTING_BEATS_FULL[0];
      const dept =
        EDITORIAL_DEPARTMENTS.find((dep) => dep.id === d.departmentId) ||
        EDITORIAL_DEPARTMENTS[2];
      const primaryMod = d.relatedKewModules[0];

      return {
        id: d.id,
        slug: d.slug,
        headline: d.headline,
        standfirst: d.standfirst,
        dateline: d.dateline,
        bureauId: validBureauId,
        bureauLabel: d.bureauLabel,
        beatSlug: beat.slug,
        beatTitle: beat.title,
        departmentId: dept.id,
        departmentLabel: dept.name,
        publishedAt: (d.publishedAt || d.updatedAt).slice(0, 10),
        readingTimeMinutes: d.readingTimeMinutes,
        bylineDisplay: d.bylineDisplay,
        journalistSlug: d.assignedJournalistSlug,
        factCheckedBy:
          d.scientificReviewApproved && d.scientificReviewedBy
            ? `${d.scientificReviewedBy} · Office of Editorial Standards`
            : 'Office of Editorial Standards & Verification',
        scientificSourceNote: d.sourceReferences
          .map((r) => `${r.publisherOrJournal} (${r.publishedDate})`)
          .join(' · '),
        heroImage: d.heroImage,
        heroCaption: d.heroCaption,
        heroCredit: `${d.heroCredit} (${d.heroLicense})`,
        keyFindings: [
          `Evaluated ${d.sourceReferences.length} external & KEW baseline reference(s).`,
          ...d.limitationsAndEvidenceGaps.slice(0, 2),
        ],
        paragraphs: d.chapters.flatMap((ch) => ch.paragraphs),
        relatedKewModule: primaryMod
          ? {
              label: primaryMod.label,
              href: primaryMod.href,
              context: primaryMod.scientificContext,
            }
          : {
              label: beat.kewObservatoryLabel,
              href: beat.kewObservatoryHref,
              context: 'Companion KEW scientific observatory.',
            },
        isPublished: true,
        corrections: d.corrections,
      };
    });

  const seen = new Set<string>();
  const merged: DailyDispatchArticle[] = [];
  const hdnDaily = getHdnPublishedDailyDispatches();
  for (const item of [
    ...hdnDaily,
    ...aniePublishedDispatches,
    ...store.customDailyDispatches,
    ...DAILY_DISPATCH_ARTICLES,
  ]) {
    if (!item.isPublished || seen.has(item.slug)) continue;
    seen.add(item.slug);
    const ddMetrics = computeDailyDispatchMetrics(item);
    merged.push({
      ...item,
      wordCount: ddMetrics.wordCount,
      readingTimeMinutes: ddMetrics.readingTimeMinutes,
    });
  }
  return merged.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPublicDailyDispatchBySlug(slug: string): DailyDispatchArticle | null {
  return getPublicDailyDispatches().find((d) => d.slug === slug) || null;
}

export function getPublicReportingBeats(): ReportingBeatFullSpec[] {
  return REPORTING_BEATS_FULL;
}

export function getPublicReportingBeatBySlug(slug: string): {
  beat: ReportingBeatFullSpec;
  stories: MagazineStory[];
  dailyDispatches: DailyDispatchArticle[];
} | null {
  const beat = REPORTING_BEATS_FULL.find((b) => b.slug === slug);
  if (!beat) return null;
  const stories = getPublicPublishedStories().filter(
    (s) =>
      s.reportingBeatSlug === beat.slug ||
      (!s.reportingBeatSlug && s.departmentId === beat.leadDepartmentId)
  );
  const dailyDispatches = getPublicDailyDispatches().filter(
    (d) => d.beatSlug === beat.slug
  );
  return { beat, stories, dailyDispatches };
}

export function getPublicDepartmentDossier(routeSlug: string) {
  const config = DEPARTMENT_ROUTE_CONFIG[routeSlug as DepartmentRouteSlug];
  if (!config) return null;

  const allStories = getPublicPublishedStories().filter(
    (s) =>
      config.matchingDepartmentIds.includes(s.departmentId) ||
      (s.secondaryDepartmentIds || []).some((secId) =>
        config.matchingDepartmentIds.includes(secId)
      )
  );
  const currentEditionStories = allStories.filter((s) => s.editionSlug === 'vol-01-no-01');
  const historicalStories = allStories.filter((s) => s.editionSlug !== 'vol-01-no-01');

  const dailyDispatches = getPublicDailyDispatches().filter((d) =>
    config.matchingDepartmentIds.includes(d.departmentId)
  );

  const forthcomingPreviews = getPublicForthcomingPreviews().filter((p) =>
    config.matchingDepartmentIds.includes(p.departmentId)
  );

  const contributorSlugs = new Set([
    ...allStories.map((s) => s.journalistSlug),
    ...dailyDispatches.map((d) => d.journalistSlug).filter(Boolean),
  ]);
  const contributors = getPublicJournalists().filter((j) => contributorSlugs.has(j.slug));

  const editions = MAGAZINE_EDITIONS.filter(
    (ed) =>
      ed.status !== 'forthcoming' &&
      ed.storySlugs.some((sl) => allStories.some((s) => s.slug === sl))
  );

  return {
    config,
    featuredStory: allStories[0] || null,
    currentEditionStories,
    historicalStories,
    allStories,
    dailyDispatches,
    forthcomingPreviews,
    contributors,
    editions,
  };
}

export function getPublicBureauDossier(bureauSlug: string) {
  const bureau = REGIONAL_REPORTING_BUREAUS.find((b) => b.id === bureauSlug);
  if (!bureau) return null;

  const stories = getPublicPublishedStories().filter((st) =>
    bureau.storyRegionKeywords.some(
      (kw) =>
        st.region.toLowerCase().includes(kw.toLowerCase()) ||
        st.dateline.toLowerCase().includes(kw.toLowerCase())
    )
  );

  const dailyDispatches = getPublicDailyDispatches().filter(
    (d) =>
      d.bureauId === bureau.id ||
      bureau.storyRegionKeywords.some(
        (kw) =>
          d.dateline.toLowerCase().includes(kw.toLowerCase()) ||
          d.headline.toLowerCase().includes(kw.toLowerCase())
      )
  );

  const forthcomingPreviews = getPublicForthcomingPreviews().filter((pr) =>
    bureau.storyRegionKeywords.some((kw) =>
      pr.region.toLowerCase().includes(kw.toLowerCase())
    )
  );

  const mastheadPositions = getPublicMastheadPositions();
  const bureauLeadership = mastheadPositions.filter(
    (p) => p.bureauId === bureau.id || p.id === 'mp-iv-01'
  );

  const correspondents = getPublicJournalists().filter(
    (j) =>
      bureau.storyRegionKeywords.some(
        (kw) =>
          j.basedIn.toLowerCase().includes(kw.toLowerCase()) ||
          j.beat.toLowerCase().includes(kw.toLowerCase())
      ) ||
      stories.some((s) => s.journalistSlug === j.slug) ||
      dailyDispatches.some((d) => d.journalistSlug === j.slug)
  );

  const beats = REPORTING_BEATS_FULL.filter((b) =>
    b.coveredBureaus.includes(bureau.id as BureauSlugId)
  );

  return {
    bureau,
    stories,
    dailyDispatches,
    forthcomingPreviews,
    bureauLeadership,
    correspondents,
    beats,
  };
}

export function getPublicCorrectionRecords(): PublicCorrectionRecord[] {
  const records: PublicCorrectionRecord[] = [];
  for (const st of getPublicPublishedStories()) {
    for (const c of st.corrections ?? []) {
      records.push({
        id: c.id,
        date: c.date,
        kind: c.kind,
        note: c.note,
        approvedBy: c.approvedBy,
        sourceType: 'magazine_issue',
        articleTitle: st.title,
        articleUrl: resolveCanonicalStoryUrl(st),
        editionOrDeskLabel: st.editionLabel,
      });
    }
  }
  for (const dd of getPublicDailyDispatches()) {
    for (const c of dd.corrections ?? []) {
      records.push({
        id: c.id,
        date: c.date,
        kind: c.kind,
        note: c.note,
        approvedBy: c.approvedBy,
        sourceType: 'daily_dispatch',
        articleTitle: dd.headline,
        articleUrl: HD_ROUTES.dailyDispatchArticle(dd.slug),
        editionOrDeskLabel: `Daily Dispatch · ${dd.bureauLabel}`,
      });
    }
  }
  return records.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublicCorrectionById(recordId: string): PublicCorrectionRecord | null {
  return getPublicCorrectionRecords().find((r) => r.id === recordId) || null;
}

// ─── PUBLIC INQUIRIES (COMPLAINTS, PUBLIC EDITOR, CORRECTIONS, RIGHTS, DESK) ─

export function submitEditorialPublicInquiry(input: {
  category: EditorialInquiryCategory;
  subject: string;
  senderName: string;
  senderEmail: string;
  organizationOrLocation?: string;
  relatedArticleUrl?: string;
  bureauId?: BureauSlugId;
  positionTitle?: string;
  message: string;
}): EditorialPublicInquiryRecord {
  const store = readDispatchStore();
  const prefixMap: Record<EditorialInquiryCategory, string> = {
    reader_complaint: 'HD-CMP',
    public_editor_petition: 'HD-OMB',
    correction_request: 'HD-COR',
    rights_permissions: 'HD-PRM',
    editorial_appointment_interest: 'HD-APT',
    bureau_correspondence: 'HD-BUR',
    general_editorial_contact: 'HD-CON',
  };
  const seq = String(store.publicInquiries.length + 201).padStart(4, '0');
  const record: EditorialPublicInquiryRecord = {
    id: `inq-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    trackingCode: `${prefixMap[input.category]}-2026-${seq}`,
    category: input.category,
    subject: input.subject.trim(),
    senderName: input.senderName.trim(),
    senderEmail: input.senderEmail.trim().toLowerCase(),
    organizationOrLocation: input.organizationOrLocation?.trim() || undefined,
    relatedArticleUrl: input.relatedArticleUrl?.trim() || undefined,
    bureauId: input.bureauId,
    positionTitle: input.positionTitle?.trim() || undefined,
    message: input.message.trim(),
    status: 'Received',
    submittedAt: new Date().toISOString(),
  };
  store.publicInquiries.unshift(record);
  writeDispatchStore(store);
  return record;
}

// ─── AUTONOMOUS NEWSROOM INTELLIGENCE ENGINE (AUTHENTICATED ADMIN ONLY) ─────

export function getAutonomousQueueInternal(): AutonomousEditorialQueueItem[] {
  const store = readDispatchStore();
  const mergedSeeds = AUTONOMOUS_QUEUE_SEEDS.map((item) => {
    const ov = store.autonomousQueueOverrides[item.id];
    if (!ov) return item;
    return {
      ...item,
      ...ov,
      id: item.id,
    };
  });
  return [...store.customAutonomousQueue, ...mergedSeeds].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );
}

export function getAdminAutonomousEngineBundle() {
  const store = readDispatchStore();
  return {
    lastScanAt: store.lastAutonomousScanAt || '2026-11-25T09:15:00Z',
    sourceSignals: AUTONOMOUS_SOURCE_SIGNALS,
    autonomousQueue: getAutonomousQueueInternal(),
    dailyDispatches: getPublicDailyDispatches(),
    publicInquiries: store.publicInquiries,
  };
}

export function adminRunAutonomousSourceScan(actor: string) {
  const store = readDispatchStore();
  store.lastAutonomousScanAt = new Date().toISOString();
  writeDispatchStore(store);
  return {
    lastScanAt: store.lastAutonomousScanAt,
    scannedBy: actor,
    signalsCount: AUTONOMOUS_SOURCE_SIGNALS.length,
  };
}

export function adminGenerateAutonomousDraftFromSignal(
  signalId: string,
  targetChannel: 'daily_dispatch' | 'monthly_edition',
  actor: string
): AutonomousEditorialQueueItem | null {
  const signal = AUTONOMOUS_SOURCE_SIGNALS.find((s) => s.id === signalId);
  if (!signal) return null;

  const store = readDispatchStore();
  const nowIso = new Date().toISOString();
  const beat =
    REPORTING_BEATS_FULL.find((b) => b.slug === signal.beatSlug) || REPORTING_BEATS_FULL[0];
  const bureau =
    REGIONAL_REPORTING_BUREAUS.find((b) => b.id === signal.bureauId) ||
    REGIONAL_REPORTING_BUREAUS[0];

  const created: AutonomousEditorialQueueItem = {
    id: `auto-q-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    signalId: signal.id,
    targetChannel,
    targetEditionSlug:
      targetChannel === 'monthly_edition' ? 'issue-02-a-world-in-transition' : undefined,
    bureauId: signal.bureauId,
    beatSlug: signal.beatSlug,
    departmentId: beat.leadDepartmentId,
    workingHeadline: signal.headlineSignal,
    standfirst: `${signal.empiricalSummary} [Generated for human verification by ${actor}]`,
    dateline: `${bureau.name.toUpperCase()} · RESEARCH SYNTHESIS`,
    researchSynthesis: `Synthesized from ${signal.sourceName} (${signal.corroboratingSourcesCount} corroborating datasets, verification score ${signal.verificationScore}/100).`,
    draftParagraphs: [
      `[UNPUBLISHED AUTONOMOUS DRAFT — AWAITING HUMAN EDITORIAL VERIFICATION] ${signal.empiricalSummary}`,
      `Primary reference telemetry linked at ${signal.kewReferenceRoute}. No autonomous draft may be published until Stage 04 fact-checking, human correspondent review, and Stage 06 editorial sign-off are completed.`,
    ],
    verificationChecklist: [
      `Source signal corroborated (${signal.verificationScore}/100)`,
      'Human journalist field & context check required',
      'Stage 06 Editorial Approval required before public visibility',
    ],
    sourceCitations: [signal.sourceName, `KEW Reference: ${signal.kewReferenceRoute}`],
    status: 'draft_pending_approval',
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  store.customAutonomousQueue.unshift(created);
  writeDispatchStore(store);
  return created;
}

export function adminMutateAutonomousQueueItem(
  itemId: string,
  updates: {
    action:
      | 'edit'
      | 'schedule'
      | 'publish'
      | 'reject'
      | 'trash'
      | 'restore'
      | 'assign';
    workingHeadline?: string;
    standfirst?: string;
    draftBodyJoined?: string;
    scheduledFor?: string;
    assignedJournalistSlug?: string;
    editorialDecisionNote?: string;
  },
  actor: string
): AutonomousEditorialQueueItem | null {
  const all = getAutonomousQueueInternal();
  const target = all.find((x) => x.id === itemId);
  if (!target) return null;

  const store = readDispatchStore();
  const nowIso = new Date().toISOString();
  const isCustom = store.customAutonomousQueue.some((x) => x.id === itemId);

  let nextStatus: AutonomousQueueStatus = target.status;
  if (updates.action === 'schedule') nextStatus = 'scheduled';
  else if (updates.action === 'publish') nextStatus = 'published';
  else if (updates.action === 'reject') nextStatus = 'rejected';
  else if (updates.action === 'trash') nextStatus = 'trashed';
  else if (updates.action === 'restore') nextStatus = 'draft_pending_approval';

  const journalist = updates.assignedJournalistSlug
    ? getPublicJournalists().find((j) => j.slug === updates.assignedJournalistSlug)
    : undefined;

  const nextHeadline = updates.workingHeadline?.trim() || target.workingHeadline;
  const nextStandfirst = updates.standfirst?.trim() || target.standfirst;
  const nextParagraphs = updates.draftBodyJoined
    ? updates.draftBodyJoined
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : target.draftParagraphs;

  let publishedSlug = target.publishedSlug;

  // When an authorized human administrator explicitly approves & publishes a Daily Dispatch item:
  if (updates.action === 'publish' && target.targetChannel === 'daily_dispatch') {
    const slug = slugifyName(nextHeadline) || `dispatch-${Date.now()}`;
    publishedSlug = slug;
    const bureau =
      REGIONAL_REPORTING_BUREAUS.find((b) => b.id === target.bureauId) ||
      REGIONAL_REPORTING_BUREAUS[0];
    const beat =
      REPORTING_BEATS_FULL.find((b) => b.slug === target.beatSlug) ||
      REPORTING_BEATS_FULL[0];
    const dept =
      EDITORIAL_DEPARTMENTS.find((d) => d.id === target.departmentId) ||
      EDITORIAL_DEPARTMENTS[0];

    const cleanParagraphs = nextParagraphs.map((p) =>
      p.replace(/^\[UNPUBLISHED[^\]]*\]\s*/i, '')
    );

    const publishedArticle: DailyDispatchArticle = {
      id: `dd-pub-${Date.now()}`,
      slug,
      headline: nextHeadline,
      standfirst: nextStandfirst,
      dateline: target.dateline.replace(/\s*·\s*DRAFT$/i, ''),
      bureauId: target.bureauId,
      bureauLabel:
        bureau.operationalStatus === 'in_establishment'
          ? `${bureau.name} (In Establishment)`
          : bureau.name,
      beatSlug: beat.slug,
      beatTitle: beat.title,
      departmentId: dept.id,
      departmentLabel: dept.name,
      publishedAt: nowIso.slice(0, 10),
      readingTimeMinutes: Math.max(4, Math.ceil(cleanParagraphs.join(' ').split(/\s+/).length / 200)),
      bylineDisplay:
        journalist?.name || target.assignedJournalistName || 'Himalayan Dispatch Editorial Desk',
      journalistSlug: journalist?.slug || target.assignedJournalistSlug,
      factCheckedBy: `Approved by ${actor} · Editorial Desk`,
      scientificSourceNote: target.sourceCitations.join(' · '),
      heroImage: '/images/publications/kolahoi-glacier-cryosphere.jpg',
      heroCaption: `${bureau.name} environmental dispatch file plate.`,
      heroCredit: 'Himalayan Dispatch Archive',
      keyFindings: target.verificationChecklist,
      paragraphs: cleanParagraphs,
      relatedKewModule: {
        label: beat.kewObservatoryLabel,
        href: beat.kewObservatoryHref,
        context: 'Companion KEW scientific observatory.',
      },
      isPublished: true,
      corrections: [],
    };

    store.customDailyDispatches = [
      publishedArticle,
      ...store.customDailyDispatches.filter((d) => d.slug !== slug),
    ];
  }

  const patch: Partial<AutonomousEditorialQueueItem> = {
    workingHeadline: nextHeadline,
    standfirst: nextStandfirst,
    draftParagraphs: nextParagraphs,
    status: nextStatus,
    ...(updates.scheduledFor !== undefined ? { scheduledFor: updates.scheduledFor } : {}),
    ...(updates.assignedJournalistSlug !== undefined
      ? {
          assignedJournalistSlug: updates.assignedJournalistSlug || undefined,
          assignedJournalistName: journalist?.name || undefined,
        }
      : {}),
    ...(updates.editorialDecisionNote !== undefined
      ? { editorialDecisionNote: updates.editorialDecisionNote }
      : {}),
    ...(updates.action === 'publish'
      ? { approvedBy: actor, approvedAt: nowIso, publishedSlug }
      : {}),
    updatedAt: nowIso,
  };

  if (isCustom) {
    const idx = store.customAutonomousQueue.findIndex((x) => x.id === itemId);
    store.customAutonomousQueue[idx] = {
      ...store.customAutonomousQueue[idx],
      ...patch,
    };
  } else {
    store.autonomousQueueOverrides[itemId] = {
      ...(store.autonomousQueueOverrides[itemId] || {}),
      ...patch,
    };
  }

  writeDispatchStore(store);
  return getAutonomousQueueInternal().find((x) => x.id === itemId) || null;
}
