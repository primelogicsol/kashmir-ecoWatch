// ─────────────────────────────────────────────────────────────────────────────
// HD-ANIE PERSISTENT SERVER STORE & COMPLETE 22-ACTION EDITORIAL ENGINE
// Persists sources, signals, clusters, dossiers, drafts, monthly edition plans,
// daily digests, worker jobs, DLQ, budget metrics, and immutable audit trails.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import {
  AnieAuditLogEntry,
  AnieBureauId,
  AnieDailyEditorialDigest,
  AnieEditorialDraft,
  AnieEditorialStatus,
  AnieEngineMode,
  AnieEngineSubsystemsToggle,
  AnieMonthlyEditionPlan,
  AniePersistentStore,
  AniePublicationStream,
  AnieSourceRecord,
} from '@/types/hd-anie';
import {
  EditorialDepartmentId,
  MagazineStory,
  StoryChapter,
  StoryCorrectionEntry,
} from '@/types/himalayan-dispatch';
import { EDITORIAL_DEPARTMENTS } from '@/data/himalayan-dispatch';
import { INITIAL_AUTHORIZED_SOURCES } from './sources-seed';
import {
  evaluateDraftQualityAndRisk,
  generateAutonomousEditorialDraft,
  projectAnieDraftToMagazineStory,
  selectVerifiedVisualForDomains,
} from './writer-verifier';
import {
  buildEvidenceDossier,
  getBureauDisplayLabel,
  retrieveKewScientificContext,
} from './intelligence';
import { safePoliteFetch } from './security';
import { verifyDoiExistsOnCrossref } from './discovery';

const ANIE_STORE_FILE = path.join(process.cwd(), 'data', 'hd-anie-store.json');

function createInitialAnieStore(): AniePersistentStore {
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);
  return {
    schemaVersion: 1,
    engineMode: 'running',
    subsystems: {
      globalNewsDiscovery: true,
      regionalSourceMonitoring: true,
      scientificResearchDiscovery: true,
      factAndSourceVerification: true,
      autonomousEditorialWriting: true,
      visualAssetMatching: true,
      scheduledReleaseGateway: true,
      dailyDigestCompilation: true,
    },
    scheduleIntervalsMinutes: {
      regionalDiscovery: 15,
      internationalDiscovery: 30,
      institutionalDiscovery: 60,
      scientificDiscovery: 360,
      revalidationMinutes: 1440,
    },
    digestPreferences: {
      enabled: true,
      deliveryHourUtc: 3,
      maxDigestItems: 12,
      includeAmberInDigest: true,
    },
    workerHeartbeat: {
      inProcessSchedulerActive: false,
      totalCyclesCompleted: 0,
    },
    modelAndBudget: {
      primaryProvider: process.env.OLLAMA_BASE_URL
        ? 'ollama_local'
        : process.env.OPENAI_API_KEY
          ? 'openai_compatible'
          : 'deterministic_rag_synthesis',
      primaryModelName: process.env.HD_ANIE_MODEL || 'kew-deterministic-rag-v1',
      verificationMode: 'deterministic_claim_and_doi_verifier',
      dailySpendingCeilingUsd: Number(process.env.HD_ANIE_DAILY_BUDGET_USD || 2.5),
      monthlySpendingCeilingUsd: Number(process.env.HD_ANIE_MONTHLY_BUDGET_USD || 40.0),
      measuredSpentTodayUsd: 0,
      measuredSpentMonthUsd: 0,
      lastSpendResetDate: today,
      lastSpendResetMonth: month,
      measuredPromptTokens: 0,
      measuredCompletionTokens: 0,
      measuredExternalDiscoveryCalls: 0,
      paidProcessingHaltedByBudget: false,
    },
    sources: INITIAL_AUTHORIZED_SOURCES.map((s) => ({ ...s })),
    signals: [],
    clusters: [],
    dossiers: [],
    drafts: [],
    monthlyEditions: [],
    dailyDigests: [],
    workerJobs: [],
    deadLetterQueue: [],
    auditLog: [
      {
        id: `aud-init-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: 'HD-ANIE System Bootstrap',
        category: 'engine_control',
        action: 'initialize_store',
        details: `Initialized HD-ANIE store with ${INITIAL_AUTHORIZED_SOURCES.length} authorized discovery sources. All autonomous drafts default strictly to unpublished review status.`,
      },
    ],
  };
}

export function readAnieStore(): AniePersistentStore {
  try {
    if (!fs.existsSync(ANIE_STORE_FILE)) {
      const initial = createInitialAnieStore();
      writeAnieStore(initial);
      return initial;
    }
    const raw = fs.readFileSync(ANIE_STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<AniePersistentStore>;
    const defaults = createInitialAnieStore();

    // Roll daily / monthly measured budget counters cleanly if date changed
    const today = new Date().toISOString().slice(0, 10);
    const month = today.slice(0, 7);
    const mb = { ...defaults.modelAndBudget, ...(parsed.modelAndBudget || {}) };
    if (mb.lastSpendResetDate !== today) {
      mb.measuredSpentTodayUsd = 0;
      mb.lastSpendResetDate = today;
    }
    if (mb.lastSpendResetMonth !== month) {
      mb.measuredSpentMonthUsd = 0;
      mb.lastSpendResetMonth = month;
    }
    mb.paidProcessingHaltedByBudget =
      mb.measuredSpentTodayUsd >= mb.dailySpendingCeilingUsd ||
      mb.measuredSpentMonthUsd >= mb.monthlySpendingCeilingUsd;

    // Ensure any newly seeded canonical sources exist without overwriting live metrics
    const existingSources = Array.isArray(parsed.sources) ? parsed.sources : [];
    const byId = new Map(existingSources.map((s) => [s.id, s]));
    for (const seed of INITIAL_AUTHORIZED_SOURCES) {
      if (!byId.has(seed.id)) {
        existingSources.push({ ...seed });
      }
    }

    return {
      schemaVersion: 1,
      engineMode: parsed.engineMode || defaults.engineMode,
      subsystems: { ...defaults.subsystems, ...(parsed.subsystems || {}) },
      scheduleIntervalsMinutes: {
        ...defaults.scheduleIntervalsMinutes,
        ...(parsed.scheduleIntervalsMinutes || {}),
      },
      digestPreferences: {
        ...defaults.digestPreferences,
        ...(parsed.digestPreferences || {}),
      },
      workerHeartbeat: {
        ...defaults.workerHeartbeat,
        ...(parsed.workerHeartbeat || {}),
      },
      modelAndBudget: mb,
      sources: existingSources,
      signals: Array.isArray(parsed.signals) ? parsed.signals : [],
      clusters: Array.isArray(parsed.clusters) ? parsed.clusters : [],
      dossiers: Array.isArray(parsed.dossiers) ? parsed.dossiers : [],
      drafts: Array.isArray(parsed.drafts) ? parsed.drafts : [],
      monthlyEditions: Array.isArray(parsed.monthlyEditions) ? parsed.monthlyEditions : [],
      dailyDigests: Array.isArray(parsed.dailyDigests) ? parsed.dailyDigests : [],
      workerJobs: Array.isArray(parsed.workerJobs) ? parsed.workerJobs : [],
      deadLetterQueue: Array.isArray(parsed.deadLetterQueue) ? parsed.deadLetterQueue : [],
      auditLog: Array.isArray(parsed.auditLog) ? parsed.auditLog : defaults.auditLog,
    };
  } catch {
    return createInitialAnieStore();
  }
}

export function writeAnieStore(store: AniePersistentStore): void {
  try {
    const dir = path.dirname(ANIE_STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Bound historical arrays so JSON store stays fast & compact over months of operation
    store.signals = store.signals.slice(0, 600);
    store.clusters = store.clusters.slice(0, 250);
    store.dossiers = store.dossiers.slice(0, 250);
    store.workerJobs = store.workerJobs.slice(0, 120);
    store.deadLetterQueue = store.deadLetterQueue.slice(0, 60);
    store.auditLog = store.auditLog.slice(0, 300);
    store.dailyDigests = store.dailyDigests.slice(0, 35);

    const tmpFile = `${ANIE_STORE_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(store, null, 2), 'utf8');
    fs.renameSync(tmpFile, ANIE_STORE_FILE);
  } catch (err) {
    console.error('[HD-ANIE Store] Write error:', err);
  }
}

export function recordAnieAudit(
  store: AniePersistentStore,
  entry: Omit<AnieAuditLogEntry, 'id' | 'timestamp'>
): void {
  store.auditLog.unshift({
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC READ PROJECTIONS (Strictly Approved & Published Articles Only!)
// ─────────────────────────────────────────────────────────────────────────────

export function getPublishedAnieStories(stream?: AniePublicationStream): MagazineStory[] {
  const store = readAnieStore();
  return store.drafts
    .filter(
      (d) =>
        d.editorialStatus === 'published' &&
        (!stream || d.stream === stream)
    )
    .sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt))
    .map(projectAnieDraftToMagazineStory);
}

export function getPublishedAnieStoryBySlug(slug: string): MagazineStory | null {
  const store = readAnieStore();
  const found = store.drafts.find(
    (d) => d.slug === slug && d.editorialStatus === 'published'
  );
  return found ? projectAnieDraftToMagazineStory(found) : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTONOMOUS MONTHLY EDITION PLANNER & DAILY DIGEST COMPILER
// ─────────────────────────────────────────────────────────────────────────────

export function assembleOrUpdateMonthlyEditionPlan(
  store: AniePersistentStore
): AnieMonthlyEditionPlan {
  const now = new Date();
  const editionSlug = 'issue-02-a-world-in-transition';

  // Select top Monthly Edition drafts + highest-scoring non-trashed/non-rejected drafts
  const eligibleMonthlyDrafts = store.drafts.filter(
    (d) =>
      d.editorialStatus !== 'trashed' &&
      d.editorialStatus !== 'rejected' &&
      (d.stream === 'monthly_edition' || d.isFeatured)
  );

  const fallbackTopDrafts =
    eligibleMonthlyDrafts.length >= 4
      ? eligibleMonthlyDrafts
      : [
          ...eligibleMonthlyDrafts,
          ...store.drafts
            .filter(
              (d) =>
                d.editorialStatus !== 'trashed' &&
                d.editorialStatus !== 'rejected' &&
                !eligibleMonthlyDrafts.some((m) => m.id === d.id)
            )
            .slice(0, 6),
        ];

  const allocatedIds = fallbackTopDrafts.slice(0, 12).map((d) => d.id);
  const deptCounts: Record<string, number> = {};
  const bureauCounts: Record<string, number> = {};

  for (const d of fallbackTopDrafts.slice(0, 12)) {
    deptCounts[d.departmentId] = (deptCounts[d.departmentId] || 0) + 1;
    bureauCounts[d.bureauId] = (bureauCounts[d.bureauId] || 0) + 1;
  }

  const coreSix: AnieBureauId[] = ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'];
  const coverageGaps = coreSix.filter((b) => !bureauCounts[b]);
  const coverCandidate = fallbackTopDrafts[0];

  const readinessPercent = Math.min(
    100,
    Math.round(
      (Math.min(6, allocatedIds.length) / 6) * 70 +
        ((6 - coverageGaps.length) / 6) * 30
    )
  );

  const existingIdx = store.monthlyEditions.findIndex((e) => e.editionSlug === editionSlug);
  const existing = existingIdx >= 0 ? store.monthlyEditions[existingIdx] : undefined;

  const plan: AnieMonthlyEditionPlan = {
    id: existing?.id || 'anie-ed-issue-02',
    editionSlug,
    volumeLabel: 'VOL. 01 / NO. 02',
    issueNumberLabel: 'ISSUE 02 · MONTHLY EDITION PLAN',
    proposedThemeTitle:
      existing?.proposedThemeTitle || 'The Fragile Waters & Changing Thresholds of the Himalayas',
    themeKicker: 'AUTONOMOUS EDITION PLANNING · AWAITING EDITORIAL AUTHORIZATION',
    subtitle:
      'A multidisciplinary monthly examination of cryospheric retreat, lacustrine and wetland stress, watershed infrastructure, and ecological accountability across the six Western Himalayan bureaus.',
    anticipatedPublicationWindow: `${now.toLocaleString('en-US', { month: 'long', year: 'numeric' })} · Monthly Cycle`,
    coverDraftId: coverCandidate?.id,
    coverImage:
      coverCandidate?.heroImage || '/images/publications/kolahoi-glacier-cryosphere.jpg',
    coverLocation: coverCandidate?.regionDisplay || 'Western Himalayas',
    coverCaption:
      coverCandidate?.heroCaption ||
      'High-altitude meltwater and watershed transition across the Western Himalayas.',
    coverCredit:
      coverCandidate?.heroCredit || 'Kashmir EcoWatch Cryosphere & Limnology Archive',
    editorsLetterDraft: existing?.editorsLetterDraft || {
      workingTitle: 'When Evidence Precedes Crisis',
      paragraphs: [
        'Across the watersheds of the Western Himalayas, environmental transformation rarely announces itself as a single catastrophe; it accumulates across seasonal snowline shifts, spring discharge declines, wetland sediment loads, and incremental land-use encroachments.',
        'This proposed Monthly Edition synthesizes emerging regional developments alongside Kashmir EcoWatch’s long-term observatory records—inviting readers, scientists, and policymakers to examine mountain water and ecosystem security as one interconnected system.',
      ],
      authorAttributionStatus: 'draft_awaiting_founding_eic_personal_approval',
      governanceNotice:
        'GOVERNANCE LOCK: Institutional working draft prepared by HD-ANIE. Never published under Dr. Fayaz Ahmad Khan’s personal signature without his explicit review and sign-off.',
    },
    allocatedDraftIds: allocatedIds,
    departmentCounts: deptCounts,
    bureauCounts,
    regionalCoverageGaps: coverageGaps,
    readinessPercent,
    status:
      existing?.status === 'authorized_for_release'
        ? 'authorized_for_release'
        : allocatedIds.length >= 4
          ? 'assembled_for_review'
          : 'autonomous_planning',
    updatedAt: now.toISOString(),
  };

  if (existingIdx >= 0) {
    store.monthlyEditions[existingIdx] = plan;
  } else {
    store.monthlyEditions.unshift(plan);
  }
  return plan;
}

export function compileConsolidatedDailyDigest(
  store: AniePersistentStore
): AnieDailyEditorialDigest {
  const todayKey = new Date().toISOString().slice(0, 10);
  const awaiting = store.drafts.filter((d) => d.editorialStatus === 'awaiting_review');

  const greenIds = awaiting
    .filter((d) => d.riskLevel === 'GREEN' && d.qualityReport.overallPassed)
    .map((d) => d.id);
  const amberIds = awaiting.filter((d) => d.riskLevel === 'AMBER').map((d) => d.id);
  const redIds = awaiting.filter((d) => d.riskLevel === 'RED').map((d) => d.id);
  const monthlyIds = store.drafts
    .filter((d) => d.stream === 'monthly_edition' && d.editorialStatus === 'awaiting_review')
    .map((d) => d.id);

  const topProposed = awaiting
    .slice(0, store.digestPreferences.maxDigestItems || 12)
    .map((d) => ({
      draftId: d.id,
      headline: d.headline,
      bureauLabel: d.bureauLabel,
      storyType: d.storyType,
      riskLevel: d.riskLevel,
      sourceCount: d.sourceReferences.length,
    }));

  const digest: AnieDailyEditorialDigest = {
    id: `dig-${todayKey}`,
    dateKey: todayKey,
    generatedAt: new Date().toISOString(),
    signalsScannedCount: store.signals.length,
    clustersFormedCount: store.clusters.length,
    newDraftsReadyCount: awaiting.length,
    greenBulkEligibleDraftIds: greenIds,
    amberReviewRequiredDraftIds: amberIds,
    redMandatoryHoldDraftIds: redIds,
    monthlyEditionCandidateIds: monthlyIds,
    topProposedHeadlines: topProposed,
    summaryNarrative: `${awaiting.length} complete draft(s) await administrator review (${greenIds.length} GREEN eligible for 1-click batch approval, ${amberIds.length} AMBER requiring editorial/scientific check, ${redIds.length} RED held for mandatory legal/human review).`,
  };

  const existingIdx = store.dailyDigests.findIndex((x) => x.dateKey === todayKey);
  if (existingIdx >= 0) {
    store.dailyDigests[existingIdx] = digest;
  } else {
    store.dailyDigests.unshift(digest);
  }
  store.workerHeartbeat.lastDigestDate = todayKey;
  return digest;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMINISTRATOR EDITORIAL CONTROLS (ALL 22 ACTIONS + GOVERNANCE GUARDS)
// ─────────────────────────────────────────────────────────────────────────────

export function canPublishDraft(draft: AnieEditorialDraft, isBulkPublish: boolean): {
  allowed: boolean;
  reason?: string;
} {
  if (draft.editorialStatus === 'trashed') {
    return { allowed: false, reason: 'Cannot publish a draft in Trash; restore it first.' };
  }
  if (!draft.qualityReport.overallPassed) {
    return {
      allowed: false,
      reason: `Quality gate check failed: ${draft.qualityReport.warnings.join('; ') || 'source traceability incomplete'}.`,
    };
  }
  if (draft.riskLevel === 'RED') {
    if (isBulkPublish) {
      return {
        allowed: false,
        reason: 'RED-classified sensitive/legal drafts cannot be Bulk Published; review and approve individually.',
      };
    }
    if (!draft.legalReviewApproved) {
      return {
        allowed: false,
        reason: 'RED-classified draft requires Legal & Right-of-Reply clearance before publication.',
      };
    }
  }
  if (draft.riskLevel === 'AMBER' && isBulkPublish && !draft.scientificReviewApproved) {
    return {
      allowed: false,
      reason: 'AMBER drafts require Scientific/Editorial Review sign-off before Bulk Publish.',
    };
  }
  return { allowed: true };
}

export function adminSetEngineControl(
  mode: AnieEngineMode,
  actor: string,
  subsystemsPatch?: Partial<AnieEngineSubsystemsToggle>
): AniePersistentStore {
  const store = readAnieStore();
  const prevMode = store.engineMode;
  store.engineMode = mode;
  if (subsystemsPatch) {
    store.subsystems = { ...store.subsystems, ...subsystemsPatch };
  }
  recordAnieAudit(store, {
    actor,
    category: 'engine_control',
    action: `engine_mode_${mode}`,
    details: `Changed HD-ANIE engine mode from "${prevMode}" to "${mode}".`,
  });
  writeAnieStore(store);
  return store;
}

export function adminUpdateDraftManuscript(
  draftId: string,
  patch: {
    headline?: string;
    standfirst?: string;
    bylineDisplay?: string;
    dateline?: string;
    departmentId?: EditorialDepartmentId;
    bureauId?: AnieBureauId;
    reportingBeat?: string;
    stream?: AniePublicationStream;
    executiveSummary?: string;
    chapters?: StoryChapter[];
    heroImage?: string;
    heroCaption?: string;
    heroCredit?: string;
    heroLicense?: string;
    editorialDisclosure?: string;
    seoTitle?: string;
    metaDescription?: string;
    isFeatured?: boolean;
  },
  actor: string
): AnieEditorialDraft | null {
  const store = readAnieStore();
  const draft = store.drafts.find((d) => d.id === draftId);
  if (!draft) return null;

  const prevHeadline = draft.headline;
  const nowIso = new Date().toISOString();

  if (patch.headline !== undefined && patch.headline.trim()) draft.headline = patch.headline.trim();
  if (patch.standfirst !== undefined) draft.standfirst = patch.standfirst.trim();
  if (patch.bylineDisplay !== undefined && patch.bylineDisplay.trim()) {
    draft.bylineDisplay = patch.bylineDisplay.trim();
  }
  if (patch.dateline !== undefined) draft.dateline = patch.dateline.trim();
  if (patch.departmentId !== undefined) {
    const dept = EDITORIAL_DEPARTMENTS.find((x) => x.id === patch.departmentId);
    if (dept) {
      draft.departmentId = dept.id;
      draft.departmentRubric = `${dept.shortLabel.toUpperCase()} · ${
        draft.stream === 'daily_dispatch' ? 'DAILY DISPATCH' : 'MONTHLY EDITION'
      }`;
    }
  }
  if (patch.bureauId !== undefined) {
    draft.bureauId = patch.bureauId;
    draft.bureauLabel = getBureauDisplayLabel(patch.bureauId);
    draft.regionDisplay = draft.bureauLabel.replace(/\s+Bureau$/i, '');
  }
  if (patch.reportingBeat !== undefined) draft.reportingBeat = patch.reportingBeat.trim();
  if (patch.stream !== undefined) {
    draft.stream = patch.stream;
    draft.editionLabel =
      patch.stream === 'daily_dispatch' ? 'THE DAILY DISPATCH' : 'FORTHCOMING MONTHLY EDITION';
  }
  if (patch.executiveSummary !== undefined) draft.executiveSummary = patch.executiveSummary.trim();
  if (Array.isArray(patch.chapters) && patch.chapters.length > 0) {
    draft.chapters = patch.chapters;
  }
  if (patch.heroImage !== undefined && patch.heroImage.trim()) draft.heroImage = patch.heroImage.trim();
  if (patch.heroCaption !== undefined) draft.heroCaption = patch.heroCaption.trim();
  if (patch.heroCredit !== undefined) draft.heroCredit = patch.heroCredit.trim();
  if (patch.heroLicense !== undefined) draft.heroLicense = patch.heroLicense.trim();
  if (patch.editorialDisclosure !== undefined) {
    draft.editorialDisclosure = patch.editorialDisclosure.trim();
  }
  if (patch.seoTitle !== undefined) draft.seoTitle = patch.seoTitle.trim();
  if (patch.metaDescription !== undefined) draft.metaDescription = patch.metaDescription.trim();
  if (typeof patch.isFeatured === 'boolean') draft.isFeatured = patch.isFeatured;

  // Recalculate wordCount & readingTime
  const allWords = [
    draft.headline,
    draft.standfirst,
    ...draft.chapters.flatMap((c) => c.paragraphs),
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  draft.wordCount = allWords;
  draft.readingTimeMinutes = Math.max(2, Math.round(allWords / 210));
  draft.updatedAt = nowIso;

  draft.revisionHistory.unshift({
    id: `rev-${Date.now()}`,
    timestamp: nowIso,
    actor,
    actorType: 'administrator',
    summary: 'Edited manuscript metadata and/or body in Newsroom Workspace.',
    previousHeadline: prevHeadline !== draft.headline ? prevHeadline : undefined,
    previousStatus: draft.editorialStatus,
    newStatus: draft.editorialStatus,
  });

  recordAnieAudit(store, {
    actor,
    category: 'editorial_action',
    action: 'edit_draft',
    targetId: draft.id,
    targetTitle: draft.headline,
    details: 'Saved manuscript revisions in Newsroom Workspace.',
  });

  writeAnieStore(store);
  return draft;
}

export function adminTransitionDraftStatus(
  draftId: string,
  action:
    | 'publish'
    | 'unpublish'
    | 'reject'
    | 'delete_to_trash'
    | 'restore_from_trash'
    | 'request_scientific_review'
    | 'approve_scientific_review'
    | 'request_legal_review'
    | 'approve_legal_review'
    | 'schedule'
    | 'toggle_feature',
  actor: string,
  extra?: { scheduledPublicationAt?: string; note?: string }
): { ok: boolean; draft?: AnieEditorialDraft; error?: string } {
  const store = readAnieStore();
  const draft = store.drafts.find((d) => d.id === draftId);
  if (!draft) return { ok: false, error: 'Draft not found.' };

  const nowIso = new Date().toISOString();
  const prevStatus = draft.editorialStatus;

  if (action === 'publish') {
    const check = canPublishDraft(draft, false);
    if (!check.allowed) return { ok: false, error: check.reason };
    draft.editorialStatus = 'published';
    draft.publishedAt = draft.publishedAt || nowIso;
    draft.scheduledPublicationAt = undefined;
  } else if (action === 'schedule') {
    if (!extra?.scheduledPublicationAt) {
      return { ok: false, error: 'Valid future publication timestamp is required for scheduling.' };
    }
    const check = canPublishDraft(draft, false);
    if (!check.allowed) return { ok: false, error: check.reason };
    draft.editorialStatus = 'scheduled';
    draft.scheduledPublicationAt = new Date(extra.scheduledPublicationAt).toISOString();
  } else if (action === 'unpublish') {
    draft.editorialStatus = 'unpublished';
    draft.unpublishedAt = nowIso;
  } else if (action === 'reject') {
    draft.editorialStatus = 'rejected';
  } else if (action === 'delete_to_trash') {
    if (draft.editorialStatus === 'published') {
      return {
        ok: false,
        error: 'Published articles must be Unpublished first so internal publication history is preserved.',
      };
    }
    draft.previousStatusBeforeTrash = draft.editorialStatus;
    draft.editorialStatus = 'trashed';
    draft.trashedAt = nowIso;
  } else if (action === 'restore_from_trash') {
    draft.editorialStatus = draft.previousStatusBeforeTrash || 'awaiting_review';
    draft.trashedAt = undefined;
  } else if (action === 'request_scientific_review') {
    draft.editorialStatus = 'in_scientific_review';
    draft.scientificReviewRequired = true;
  } else if (action === 'approve_scientific_review') {
    draft.scientificReviewApproved = true;
    draft.scientificReviewedBy = actor;
    if (draft.editorialStatus === 'in_scientific_review') {
      draft.editorialStatus = 'awaiting_review';
    }
  } else if (action === 'request_legal_review') {
    draft.editorialStatus = 'in_legal_review';
    draft.legalReviewRequired = true;
  } else if (action === 'approve_legal_review') {
    draft.legalReviewApproved = true;
    draft.legalReviewedBy = actor;
    if (draft.editorialStatus === 'in_legal_review') {
      draft.editorialStatus = 'awaiting_review';
    }
  } else if (action === 'toggle_feature') {
    draft.isFeatured = !draft.isFeatured;
  }

  draft.updatedAt = nowIso;
  draft.revisionHistory.unshift({
    id: `rev-${Date.now()}`,
    timestamp: nowIso,
    actor,
    actorType: 'administrator',
    summary: extra?.note || `Executed editorial action: ${action}.`,
    previousStatus: prevStatus,
    newStatus: draft.editorialStatus,
  });

  recordAnieAudit(store, {
    actor,
    category: action === 'publish' || action === 'unpublish' ? 'publication' : 'editorial_action',
    action,
    targetId: draft.id,
    targetTitle: draft.headline,
    details: extra?.note || `Status ${prevStatus} -> ${draft.editorialStatus}`,
  });

  writeAnieStore(store);
  return { ok: true, draft };
}

export function adminBulkPublishEligibleDrafts(
  draftIds: string[],
  actor: string
): {
  publishedIds: string[];
  skipped: Array<{ id: string; headline: string; reason: string }>;
} {
  const store = readAnieStore();
  const nowIso = new Date().toISOString();
  const publishedIds: string[] = [];
  const skipped: Array<{ id: string; headline: string; reason: string }> = [];

  for (const id of draftIds) {
    const draft = store.drafts.find((d) => d.id === id);
    if (!draft) continue;
    const check = canPublishDraft(draft, true);
    if (!check.allowed) {
      skipped.push({
        id: draft.id,
        headline: draft.headline,
        reason: check.reason || 'Ineligible for batch approval',
      });
      continue;
    }
    const prev = draft.editorialStatus;
    draft.editorialStatus = 'published';
    draft.publishedAt = draft.publishedAt || nowIso;
    draft.updatedAt = nowIso;
    draft.revisionHistory.unshift({
      id: `rev-${Date.now()}-${id.slice(-3)}`,
      timestamp: nowIso,
      actor,
      actorType: 'administrator',
      summary: 'Approved via Administrator Batch Publication (verified low-risk gate passed).',
      previousStatus: prev,
      newStatus: 'published',
    });
    publishedIds.push(draft.id);
  }

  recordAnieAudit(store, {
    actor,
    category: 'publication',
    action: 'bulk_publish',
    details: `Batch published ${publishedIds.length} verified draft(s); held/skipped ${skipped.length} draft(s) due to review/risk gates.`,
  });

  writeAnieStore(store);
  return { publishedIds, skipped };
}

/**
 * Daily-to-Monthly Editorial Promotion Pipeline:
 * Creates a linked, expanded Monthly Edition longform manuscript WITHOUT overwriting
 * the original Daily Dispatch article or its publication history!
 */
export async function adminPromoteToMonthlyEdition(
  sourceDraftId: string,
  actor: string,
  targetEditionSlug = 'issue-02-a-world-in-transition'
): Promise<{ ok: boolean; expandedDraft?: AnieEditorialDraft; error?: string }> {
  const store = readAnieStore();
  const original = store.drafts.find((d) => d.id === sourceDraftId);
  if (!original) return { ok: false, error: 'Source dispatch not found.' };

  const cluster = store.clusters.find((c) => c.id === original.clusterId);
  const dossier = store.dossiers.find((dos) => dos.id === original.dossierId);
  if (!cluster || !dossier) {
    return { ok: false, error: 'Associated evidence dossier not found for expansion.' };
  }

  const gen = await generateAutonomousEditorialDraft(cluster, dossier, store.modelAndBudget, {
    overrideStream: 'monthly_edition',
    targetEditionSlug,
    promotedFromDispatchId: original.id,
  });

  gen.draft.slug = `${original.slug}-monthly-feature`;
  gen.draft.canonicalPath = `/stories/${gen.draft.slug}`;
  gen.draft.revisionHistory.unshift({
    id: `rev-promo-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor,
    actorType: 'administrator',
    summary: `Promoted from Daily Dispatch (${original.id}) into expanded Monthly Edition manuscript (${targetEditionSlug}). Original dispatch preserved unchanged.`,
    newStatus: 'awaiting_review',
  });

  original.promotedToEditionDraftId = gen.draft.id;
  store.drafts.unshift(gen.draft);
  assembleOrUpdateMonthlyEditionPlan(store);

  recordAnieAudit(store, {
    actor,
    category: 'edition_management',
    action: 'promote_to_monthly_edition',
    targetId: gen.draft.id,
    targetTitle: gen.draft.headline,
    details: `Created linked Monthly Edition feature from Daily Dispatch "${original.headline}".`,
  });

  writeAnieStore(store);
  return { ok: true, expandedDraft: gen.draft };
}

export async function adminDeepenResearchOrRegenerate(
  draftId: string,
  mode: 'regenerate' | 'deepen_research' | 'revalidate_sources',
  actor: string
): Promise<{ ok: boolean; draft?: AnieEditorialDraft; error?: string }> {
  const store = readAnieStore();
  const draft = store.drafts.find((d) => d.id === draftId);
  if (!draft) return { ok: false, error: 'Draft not found.' };

  const cluster = store.clusters.find((c) => c.id === draft.clusterId);
  let dossier = store.dossiers.find((x) => x.id === draft.dossierId);
  if (!cluster || !dossier) return { ok: false, error: 'Evidence dossier missing.' };

  const nowIso = new Date().toISOString();

  if (mode === 'revalidate_sources') {
    for (const src of dossier.externalSources) {
      if (src.doi) {
        src.doiVerified = await verifyDoiExistsOnCrossref(src.doi);
      }
      const check = await safePoliteFetch(src.url, { timeoutMs: 5000 });
      src.httpReachable = check.ok || check.status === 403; // some sites block bot GET on article HTML while RSS was public
      src.verificationStatus = check.ok ? 'verified_primary' : src.verificationStatus;
    }
    dossier.lastVerifiedAt = nowIso;
    const gate = evaluateDraftQualityAndRisk(draft, cluster, dossier);
    draft.qualityReport = gate.qualityReport;
    draft.updatedAt = nowIso;
    draft.revisionHistory.unshift({
      id: `rev-${Date.now()}`,
      timestamp: nowIso,
      actor,
      actorType: 'administrator',
      summary: `Revalidated ${dossier.externalSources.length} external source URL(s) and DOI(s).`,
      previousStatus: draft.editorialStatus,
      newStatus: draft.editorialStatus,
    });
  } else if (mode === 'deepen_research') {
    const clusterSignals = store.signals.filter((s) => cluster.signalIds.includes(s.id));
    const deeperMatches = retrieveKewScientificContext(cluster, clusterSignals, 8);
    dossier.kewKnowledgeMatches = deeperMatches;
    dossier.lastVerifiedAt = nowIso;
    const fresh = await generateAutonomousEditorialDraft(cluster, dossier, store.modelAndBudget, {
      overrideStream: draft.stream,
      targetEditionSlug: draft.targetEditionSlug,
      promotedFromDispatchId: draft.promotedFromDispatchId,
    });
    draft.chapters = fresh.draft.chapters;
    draft.relatedKewModules = fresh.draft.relatedKewModules;
    draft.sourceReferences = fresh.draft.sourceReferences;
    draft.wordCount = fresh.draft.wordCount;
    draft.readingTimeMinutes = fresh.draft.readingTimeMinutes;
    draft.updatedAt = nowIso;
    draft.revisionHistory.unshift({
      id: `rev-${Date.now()}`,
      timestamp: nowIso,
      actor,
      actorType: 'administrator',
      summary: `Expanded KEW scientific baseline retrieval (${deeperMatches.length} linked observatories/dossiers) and enriched manuscript context.`,
      previousStatus: draft.editorialStatus,
      newStatus: draft.editorialStatus,
    });
  } else if (mode === 'regenerate') {
    const fresh = await generateAutonomousEditorialDraft(cluster, dossier, store.modelAndBudget, {
      overrideStream: draft.stream,
      targetEditionSlug: draft.targetEditionSlug,
      promotedFromDispatchId: draft.promotedFromDispatchId,
    });
    draft.headline = fresh.draft.headline;
    draft.standfirst = fresh.draft.standfirst;
    draft.chapters = fresh.draft.chapters;
    draft.wordCount = fresh.draft.wordCount;
    draft.readingTimeMinutes = fresh.draft.readingTimeMinutes;
    draft.qualityReport = fresh.draft.qualityReport;
    draft.updatedAt = nowIso;
    draft.revisionHistory.unshift({
      id: `rev-${Date.now()}`,
      timestamp: nowIso,
      actor,
      actorType: 'administrator',
      summary: 'Regenerated editorial synthesis from verified dossier.',
      previousStatus: draft.editorialStatus,
      newStatus: draft.editorialStatus,
    });
  }

  recordAnieAudit(store, {
    actor,
    category: 'editorial_action',
    action: mode,
    targetId: draft.id,
    targetTitle: draft.headline,
    details: `Completed ${mode} on draft.`,
  });

  writeAnieStore(store);
  return { ok: true, draft };
}

export function adminAppendAnieCorrection(
  draftId: string,
  kind: StoryCorrectionEntry['kind'],
  note: string,
  actor: string
): AnieEditorialDraft | null {
  const store = readAnieStore();
  const draft = store.drafts.find((d) => d.id === draftId);
  if (!draft) return null;

  const nowIso = new Date().toISOString();
  draft.corrections.unshift({
    id: `corr-${Date.now()}`,
    date: nowIso.slice(0, 10),
    kind,
    note: note.trim(),
    approvedBy: actor,
  });
  draft.updatedAt = nowIso;
  draft.revisionHistory.unshift({
    id: `rev-${Date.now()}`,
    timestamp: nowIso,
    actor,
    actorType: 'administrator',
    summary: `Published accountable ${kind}: "${note.trim().slice(0, 90)}"`,
    previousStatus: draft.editorialStatus,
    newStatus: draft.editorialStatus,
  });

  recordAnieAudit(store, {
    actor,
    category: 'publication',
    action: 'publish_correction',
    targetId: draft.id,
    targetTitle: draft.headline,
    details: `${kind} appended transparently without silently rewriting historical reporting.`,
  });

  writeAnieStore(store);
  return draft;
}

export function adminReplaceDraftVisualPreset(
  draftId: string,
  domainHintOrCustom: { domainId?: string; imageUrl?: string; caption?: string; credit?: string; license?: string },
  actor: string
): AnieEditorialDraft | null {
  const store = readAnieStore();
  const draft = store.drafts.find((d) => d.id === draftId);
  if (!draft) return null;

  if (domainHintOrCustom.imageUrl) {
    draft.heroImage = domainHintOrCustom.imageUrl;
    draft.heroCaption = domainHintOrCustom.caption || draft.heroCaption;
    draft.heroCredit = domainHintOrCustom.credit || draft.heroCredit;
    draft.heroLicense = domainHintOrCustom.license || draft.heroLicense;
  } else if (domainHintOrCustom.domainId) {
    const preset = selectVerifiedVisualForDomains([domainHintOrCustom.domainId]);
    draft.heroImage = preset.imageUrl;
    draft.heroCaption = preset.caption;
    draft.heroCredit = preset.credit;
    draft.heroLicense = preset.license;
    draft.visualProvenanceType = preset.provenanceType;
  }

  draft.updatedAt = new Date().toISOString();
  recordAnieAudit(store, {
    actor,
    category: 'editorial_action',
    action: 'replace_image',
    targetId: draft.id,
    targetTitle: draft.headline,
    details: `Updated visual plate to ${draft.heroImage}`,
  });
  writeAnieStore(store);
  return draft;
}

export function adminToggleOrAddSource(
  payload:
    | { mode: 'toggle'; sourceId: string; active: boolean }
    | {
        mode: 'add';
        name: string;
        domain: string;
        endpointUrl: string;
        category: AnieSourceRecord['category'];
        geographicalCoverage: AnieBureauId[];
        pollFrequencyMinutes: number;
      },
  actor: string
): { ok: boolean; sources: AnieSourceRecord[]; error?: string } {
  const store = readAnieStore();
  if (payload.mode === 'toggle') {
    const target = store.sources.find((s) => s.id === payload.sourceId);
    if (!target) return { ok: false, sources: store.sources, error: 'Source not found.' };
    target.active = payload.active;
    recordAnieAudit(store, {
      actor,
      category: 'discovery',
      action: payload.active ? 'enable_source' : 'disable_source',
      targetId: target.id,
      targetTitle: target.name,
      details: `${payload.active ? 'Enabled' : 'Paused'} source polling for ${target.domain}.`,
    });
  } else {
    const id = `src-custom-${Date.now().toString(36)}`;
    store.sources.unshift({
      id,
      name: payload.name.trim(),
      domain: payload.domain.trim().toLowerCase(),
      category: payload.category,
      geographicalCoverage: payload.geographicalCoverage,
      language: 'en',
      retrievalMethod: 'rss_atom',
      endpointUrl: payload.endpointUrl.trim(),
      accessPermissions: 'public_feed',
      copyrightAndLicense: 'Authorized RSS/Atom feed — original synthesis & attribution required.',
      robotsPolicyStatus: 'unchecked',
      reliabilityScore: 80,
      pollFrequencyMinutes: Math.max(15, payload.pollFrequencyMinutes || 30),
      consecutiveFailures: 0,
      failureHistory: [],
      totalSignalsDiscovered: 0,
      active: true,
    });
    recordAnieAudit(store, {
      actor,
      category: 'discovery',
      action: 'register_source',
      targetId: id,
      targetTitle: payload.name,
      details: `Registered new source endpoint ${payload.endpointUrl}`,
    });
  }
  writeAnieStore(store);
  return { ok: true, sources: store.sources };
}

export function adminUpdateBudgetAndSchedule(
  patch: {
    dailySpendingCeilingUsd?: number;
    monthlySpendingCeilingUsd?: number;
    regionalDiscoveryMinutes?: number;
    internationalDiscoveryMinutes?: number;
    scientificDiscoveryMinutes?: number;
  },
  actor: string
): AniePersistentStore {
  const store = readAnieStore();
  if (typeof patch.dailySpendingCeilingUsd === 'number' && patch.dailySpendingCeilingUsd >= 0) {
    store.modelAndBudget.dailySpendingCeilingUsd = patch.dailySpendingCeilingUsd;
  }
  if (typeof patch.monthlySpendingCeilingUsd === 'number' && patch.monthlySpendingCeilingUsd >= 0) {
    store.modelAndBudget.monthlySpendingCeilingUsd = patch.monthlySpendingCeilingUsd;
  }
  if (typeof patch.regionalDiscoveryMinutes === 'number' && patch.regionalDiscoveryMinutes >= 5) {
    store.scheduleIntervalsMinutes.regionalDiscovery = patch.regionalDiscoveryMinutes;
  }
  if (
    typeof patch.internationalDiscoveryMinutes === 'number' &&
    patch.internationalDiscoveryMinutes >= 10
  ) {
    store.scheduleIntervalsMinutes.internationalDiscovery = patch.internationalDiscoveryMinutes;
  }
  if (
    typeof patch.scientificDiscoveryMinutes === 'number' &&
    patch.scientificDiscoveryMinutes >= 30
  ) {
    store.scheduleIntervalsMinutes.scientificDiscovery = patch.scientificDiscoveryMinutes;
  }
  recordAnieAudit(store, {
    actor,
    category: 'budget',
    action: 'update_budget_and_schedule',
    details: `Updated spending ceilings ($${store.modelAndBudget.dailySpendingCeilingUsd}/day, $${store.modelAndBudget.monthlySpendingCeilingUsd}/month) and discovery intervals.`,
  });
  writeAnieStore(store);
  return store;
}
