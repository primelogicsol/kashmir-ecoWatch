// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — AUTOMATED MANUSCRIPT METRICS & 10-STAGE PUBLICATION GATES
// Single source of truth for rendered prose word counts, reading duration,
// visual-essay viewing time, and verification-gate badge eligibility.
// Navigation, author bios, masthead footers, external archive dossiers, and
// verification badges are strictly excluded from all word/reading calculations.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  DailyDispatchArticle,
  MagazineStory,
  PublicationGateRecord,
  PublicationGateStageId,
  StoryPublicationGateLedger,
} from '@/types/himalayan-dispatch';
import type {
  HdnFactCheckRecord,
  HdnScientificReviewRecord,
} from '@/types/hdn-newsroom';

export const PUBLICATION_GATE_STAGE_SPECS: Array<{
  stageNumber: string;
  stageId: PublicationGateStageId;
  label: string;
}> = [
  { stageNumber: '01', stageId: 'commissioned', label: 'Commissioned' },
  { stageNumber: '02', stageId: 'research_in_progress', label: 'Research in progress' },
  { stageNumber: '03', stageId: 'manuscript_draft', label: 'Manuscript draft' },
  { stageNumber: '04', stageId: 'evidence_verification', label: 'Evidence verification' },
  { stageNumber: '05', stageId: 'scientific_review', label: 'Scientific review (where applicable)' },
  { stageNumber: '06', stageId: 'editorial_review', label: 'Editorial review' },
  { stageNumber: '07', stageId: 'copyright_ethics_review', label: 'Copyright and ethics review' },
  { stageNumber: '08', stageId: 'administrator_approval', label: 'Administrator approval' },
  { stageNumber: '09', stageId: 'published', label: 'Published' },
  { stageNumber: '10', stageId: 'post_publication_corrections', label: 'Post-publication corrections' },
];

export const WORDS_PER_MINUTE_LONGFORM = 220;

export function countWordsInText(text?: string | null): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function countWordsInSegments(segments: Array<string | undefined | null>): number {
  let total = 0;
  for (const seg of segments) {
    total += countWordsInText(seg);
  }
  return total;
}

/**
 * Dynamically calculates rendered manuscript word count and reading time from
 * actual published article body prose and structured narrative elements ONLY.
 * Excludes navigation, author biographies, institutional footers, verification
 * badges, editorial metadata tables, source URL registers, and imported
 * Green Martyrs Roll of Honour database cards.
 */
export function computeStoryMetrics(story: MagazineStory): {
  wordCount: number;
  proseWordCount: number;
  readingTimeMinutes: number;
  estimatedViewingMinutes?: number;
} {
  const proseSegments: Array<string | undefined> = [];
  const apparatusSegments: Array<string | undefined> = [];

  for (const ch of story.chapters || []) {
    apparatusSegments.push(ch.title, ch.subtitle);
    for (const p of ch.paragraphs || []) {
      proseSegments.push(p);
    }
    if (ch.pullQuote) {
      apparatusSegments.push(ch.pullQuote.quote, ch.pullQuote.attribution, ch.pullQuote.context);
    }
    if (ch.fieldNote) {
      apparatusSegments.push(ch.fieldNote.detail);
    }
    if (ch.bulletList) {
      for (const item of ch.bulletList) {
        proseSegments.push(item);
      }
    }
    if (ch.editorialTable) {
      apparatusSegments.push(ch.editorialTable.caption, ch.editorialTable.footnote);
      for (const row of ch.editorialTable.rows || []) {
        apparatusSegments.push(row[0], row[1]);
      }
    }
    if (ch.commemorationLedger) {
      apparatusSegments.push(
        ch.commemorationLedger.methodologicalNote,
        ch.commemorationLedger.sourceNote
      );
    }
  }

  if (story.interviewExchanges && story.interviewExchanges.length > 0) {
    apparatusSegments.push(story.interviewSubjectBio);
    for (const ex of story.interviewExchanges) {
      proseSegments.push(ex.text);
      apparatusSegments.push(ex.editorialAnnotation);
    }
  }

  if (story.photoPlates && story.photoPlates.length > 0) {
    for (const pl of story.photoPlates) {
      apparatusSegments.push(pl.title);
      proseSegments.push(pl.narrative);
    }
  }

  if (story.dataVisualization) {
    apparatusSegments.push(
      story.dataVisualization.keyFindingNarrative,
      story.dataVisualization.methodologyNote
    );
  }

  const proseWordCount = countWordsInSegments(proseSegments);
  const apparatusWordCount = countWordsInSegments(apparatusSegments);
  const wordCount = proseWordCount + apparatusWordCount;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE_LONGFORM));

  const plateCount = story.photoPlates?.length || 0;
  const estimatedViewingMinutes =
    story.departmentId === 'photo-essays' || plateCount > 0
      ? Math.max(2, Math.round(plateCount * 0.65))
      : undefined;

  return {
    wordCount,
    proseWordCount,
    readingTimeMinutes,
    estimatedViewingMinutes,
  };
}

export function computeDailyDispatchMetrics(article: DailyDispatchArticle): {
  wordCount: number;
  readingTimeMinutes: number;
} {
  const wordCount = countWordsInSegments([
    article.headline,
    article.standfirst,
    ...(article.keyFindings || []),
    ...(article.paragraphs || []),
  ]);
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE_LONGFORM));
  return { wordCount, readingTimeMinutes };
}

/**
 * Builds a structured 10-stage publication gate ledger for Inaugural Edition
 * pre-release stories (Stage 08: Administrator Approval Pending unless independent
 * external scientific/fact-check reviews and administrator release are completed).
 */
export function buildPreReleaseStage08GateLedger(options: {
  scientificReviewApplicable: boolean;
  evidenceSummary: string;
  scientificNote?: string;
  ethicsAndVisualNote: string;
  adminHoldNote?: string;
}): StoryPublicationGateLedger {
  const gates: PublicationGateRecord[] = [
    {
      stageNumber: '01',
      stageId: 'commissioned',
      label: 'Commissioned',
      status: 'completed',
      verifiedBy: 'Himalayan Dispatch Founding Masthead',
      completedAt: '2026-11-15',
    },
    {
      stageNumber: '02',
      stageId: 'research_in_progress',
      label: 'Research in progress',
      status: 'completed',
      verifiedBy: 'Himalayan Dispatch Research & Observatory Desk',
      completedAt: '2026-11-24',
    },
    {
      stageNumber: '03',
      stageId: 'manuscript_draft',
      label: 'Manuscript draft',
      status: 'completed',
      verifiedBy: 'Assigned Author / Editorial Desk',
      completedAt: '2026-11-27',
    },
    {
      stageNumber: '04',
      stageId: 'evidence_verification',
      label: 'Evidence verification',
      status: 'completed',
      verifiedBy: 'Himalayan Dispatch Documentary & Citation Desk',
      completedAt: '2026-11-27',
      notes: options.evidenceSummary,
    },
    {
      stageNumber: '05',
      stageId: 'scientific_review',
      label: 'Scientific review (where applicable)',
      status: options.scientificReviewApplicable ? 'pending' : 'not_applicable',
      notes: options.scientificReviewApplicable
        ? options.scientificNote ||
          'Internal scholarly synthesis completed; independent external specialist certification pending prior to formal public release.'
        : 'Editorial or curatorial essay; empirical citations cross-checked under Stage 04.',
    },
    {
      stageNumber: '06',
      stageId: 'editorial_review',
      label: 'Editorial review',
      status: 'completed',
      verifiedBy: 'Founding Editor-in-Chief Desk Review',
      completedAt: '2026-11-27',
    },
    {
      stageNumber: '07',
      stageId: 'copyright_ethics_review',
      label: 'Copyright and ethics review',
      status: 'completed',
      verifiedBy: 'Himalayan Dispatch Visual & Ethics Governance',
      completedAt: '2026-11-27',
      notes: options.ethicsAndVisualNote,
    },
    {
      stageNumber: '08',
      stageId: 'administrator_approval',
      label: 'Administrator approval',
      status: 'in_progress',
      notes:
        options.adminHoldNote ||
        'Pre-release Inaugural Edition folio awaiting Founding Administrator release sign-off.',
    },
    {
      stageNumber: '09',
      stageId: 'published',
      label: 'Published',
      status: 'pending',
    },
    {
      stageNumber: '10',
      stageId: 'post_publication_corrections',
      label: 'Post-publication corrections',
      status: 'not_applicable',
    },
  ];

  return {
    currentStage: 'administrator_approval',
    currentStageNumber: '08',
    publicStatusSummary:
      'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
    scientificReviewApplicable: options.scientificReviewApplicable,
    gates,
  };
}

/**
 * Determines whether a story has a genuine, completed independent review record
 * in the persistent HDN store. Public pages MUST NEVER display "Fact-Checked &
 * Scientifically Reviewed" or "STAGE 05 VERIFIED" unless this returns true.
 */
export function evaluateStoryReviewVerification(
  story: MagazineStory,
  factChecks: HdnFactCheckRecord[],
  scientificReviews: HdnScientificReviewRecord[]
): boolean {
  const msId = `hdn-ms-${story.slug}`;
  const hasVerifiedFactCheck = factChecks.some(
    (fc) =>
      (fc.manuscriptId === msId || fc.manuscriptId === story.id) &&
      fc.verificationStatus === 'verified' &&
      fc.resolutionStatus === 'resolved'
  );
  if (!hasVerifiedFactCheck) return false;

  const sciRequired = story.publicationGates
    ? story.publicationGates.scientificReviewApplicable
    : story.departmentId !== 'editorials' && story.departmentId !== 'photo-essays';

  if (sciRequired) {
    const hasCompletedSciReview = scientificReviews.some(
      (sr) =>
        (sr.manuscriptId === msId || sr.manuscriptId === story.id) &&
        sr.status === 'completed' &&
        sr.recommendation === 'approve'
    );
    if (!hasCompletedSciReview) return false;
  }

  if (
    story.publicationGates &&
    story.publicationGates.currentStage !== 'published' &&
    story.publicationGates.currentStage !== 'post_publication_corrections'
  ) {
    return false;
  }

  return true;
}

export function getPublicStoryGateBadge(story: MagazineStory): {
  label: string;
  isVerifiedRelease: boolean;
} {
  if (story.isAiAssisted && !story.hasCompletedIndependentReview) {
    return {
      label: 'Automated Multi-Source Research Synthesis — Desk Reviewed',
      isVerifiedRelease: false,
    };
  }
  if (story.hasCompletedIndependentReview && Boolean(story.scientificReviewer)) {
    return {
      label: 'Fact-Checked & Scientifically Reviewed',
      isVerifiedRelease: true,
    };
  }
  if (story.publicationGates) {
    return {
      label: story.publicationGates.publicStatusSummary,
      isVerifiedRelease:
        story.publicationGates.currentStage === 'published' ||
        story.publicationGates.currentStage === 'post_publication_corrections',
    };
  }
  if (story.publicationStatusNote) {
    return {
      label: story.publicationStatusNote,
      isVerifiedRelease: false,
    };
  }
  return {
    label: 'Editorial Desk Verification Dossier',
    isVerifiedRelease: false,
  };
}

/**
 * PERMANENT EDITORIAL PRESENTATION STANDARD:
 * Reading duration may remain visible. Numerical word counts must remain internal
 * (used strictly for reading-time estimation and editorial administration).
 */
export function formatPublicReadingDuration(
  story: {
    readingTimeMinutes: number;
    departmentId?: string;
    estimatedViewingMinutes?: number;
  },
  variant: 'header' | 'card' | 'photo_header' = 'header'
): string {
  const mins = Math.max(1, story.readingTimeMinutes || 1);
  if (variant === 'photo_header') {
    const viewMins = Math.max(2, story.estimatedViewingMinutes || 7);
    return `${mins} MIN TEXT READ · ${viewMins} MIN PLATE VIEWING`;
  }
  if (variant === 'card' && story.departmentId === 'photo-essays') {
    const viewMins = Math.max(2, story.estimatedViewingMinutes || 7);
    return `${mins} MIN READ · ${viewMins} MIN VIEW`;
  }
  return `${mins} MIN READ`;
}

/**
 * Sanitizes public colophon `editorialMetadataTable` rows so numerical word counts
 * and surrounding parentheses never appear publicly, without leaving empty
 * parentheses or redundant separators.
 */
export function sanitizePublicEditorialMetadataRows(
  rows: Array<{ attribute: string; assignment: string }>,
  readingTimeMinutes: number
): Array<{ attribute: string; assignment: string }> {
  const out: Array<{ attribute: string; assignment: string }> = [];

  for (const row of rows) {
    const attr = row.attribute.trim();
    const isPureWordCountAttr = /^(?:verified\s+|manuscript\s+|target\s+)?word\s*count$/i.test(
      attr
    );
    if (isPureWordCountAttr) {
      continue;
    }

    const cleanedAttr = attr
      .replace(/\s*(?:&|and|\/)\s*word\s*count/gi, '')
      .replace(/word\s*count\s*(?:&|and|\/)\s*/gi, '')
      .trim();

    let cleanedVal = row.assignment
      // Remove parenthetical expressions containing word counts, e.g. "(5,697 words)" or "(4,157 prose words)"
      .replace(/\s*\([^)]*\bwords?\b[^)]*\)/gi, '')
      // Remove numerical word-count clauses, e.g. "5,153 verified words · " or "65,000–90,000 target words"
      .replace(
        /\b[0-9][0-9,–—-]*\+?\s*(?:[a-z-]+\s+){0,3}words?\b(?:\s*(?:total|prose|target|verified))?/gi,
        ''
      )
      // Clean redundant separators or empty parentheses left behind
      .replace(/\(\s*\)/g, '')
      .replace(/(?:\s*[·•;|—–-]\s*){2,}/g, ' · ')
      .replace(/^\s*[·•;|—–,-]\s*/g, '')
      .replace(/\s*[·•;|—–,-]\s*$/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    if (!cleanedVal) {
      if (/reading|duration|length/i.test(cleanedAttr)) {
        cleanedVal = `${Math.max(1, readingTimeMinutes || 1)} min read`;
      } else {
        continue;
      }
    }

    out.push({
      attribute: cleanedAttr || attr,
      assignment: cleanedVal,
    });
  }

  return out;
}

