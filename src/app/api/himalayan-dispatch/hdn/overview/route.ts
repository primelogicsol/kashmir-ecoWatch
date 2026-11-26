import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import {
  getAllUnifiedManuscripts,
  getScopedManuscriptsForAccount,
  readHdnStore,
} from '@/lib/hdn/store';
import { readAnieStore } from '@/lib/hd-anie/store';
import { readDispatchStore } from '@/lib/himalayan-dispatch-store';
import { EDITORIAL_DEPARTMENTS, REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { REPORTING_BEATS_FULL } from '@/data/himalayan-dispatch-autonomous';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const hdnStore = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => hdnStore.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  const scopedMs = getScopedManuscriptsForAccount(account, false);
  const myMs = scopedMs.filter(
    (m) => m.primaryAuthorSlug === account.slug || m.coAuthorSlugs.includes(account.slug)
  );
  const myAssignments = hdnStore.assignments.filter(
    (a) => a.assignedJournalistSlug === account.slug && a.status !== 'cancelled'
  );
  const dispatchLegacy = readDispatchStore();
  const myPitches = dispatchLegacy.pitches.filter(
    (p) =>
      p.journalistSlug === account.slug ||
      p.authorEmail.toLowerCase() === account.email.toLowerCase()
  );

  // Reporter / Journalist Measured Metrics
  const journalistSummary = {
    assignmentsCount: myAssignments.length,
    draftsCount: myMs.filter((m) => ['assigned', 'researching', 'drafting', 'revision_requested'].includes(m.workflowStatus)).length,
    inReviewCount: myMs.filter((m) =>
      ['submitted', 'editorial_review', 'fact_checking', 'scientific_review', 'legal_review', 'copy_editing', 'visual_production', 'ready_for_approval'].includes(
        m.workflowStatus
      )
    ).length,
    publishedCount: myMs.filter((m) => m.workflowStatus === 'published').length,
    pitchesCount: myPitches.length,
    recentAssignments: myAssignments.slice(0, 5),
    recentManuscripts: myMs.slice(0, 6),
  };

  // Scientific Reviewer Measured Metrics
  const myReviews = hdnStore.scientificReviews.filter(
    (r) =>
      r.assignedReviewerSlug === account.slug ||
      hasPermission(account, 'workspace:admin')
  );
  const reviewCandidates = scopedMs.filter(
    (m) => m.scientificReviewRequired || m.workflowStatus === 'scientific_review'
  );

  // Editorial & Administrator Measured Metrics (Strictly Real Store Counts — Zero Fabricated Numbers!)
  let adminCommandSummary = null;
  if (hasPermission(account, 'workspace:editorial') || hasPermission(account, 'workspace:admin')) {
    const allActiveMs = getAllUnifiedManuscripts(false);
    const allTrashedMs = getAllUnifiedManuscripts(true).filter((m) => m.workflowStatus === 'trashed');
    const anieStore = readAnieStore();

    const aiDraftsCount = allActiveMs.filter(
      (m) => m.originType === 'ai_autonomous_draft' && m.workflowStatus !== 'published'
    ).length;
    const humanDraftsCount = allActiveMs.filter(
      (m) =>
        m.originType !== 'ai_autonomous_draft' &&
        m.originType !== 'canonical_magazine_story' &&
        m.workflowStatus !== 'published'
    ).length;
    const awaitingReviewCount = allActiveMs.filter((m) =>
      ['submitted', 'editorial_review', 'fact_checking', 'scientific_review', 'legal_review'].includes(
        m.workflowStatus
      )
    ).length;
    const readyToPublishItems = allActiveMs.filter(
      (m) =>
        ['ready_for_approval', 'approved'].includes(m.workflowStatus) ||
        (m.originType === 'ai_autonomous_draft' &&
          m.riskLevel === 'GREEN' &&
          m.factCheckCompleted &&
          m.workflowStatus !== 'published')
    );
    const activeAssignmentsCount = hdnStore.assignments.filter(
      (a) => !['completed', 'cancelled'].includes(a.status)
    ).length;
    const publishedStoriesCount = allActiveMs.filter((m) => m.workflowStatus === 'published').length;

    const forthcomingEdition =
      hdnStore.editions.find((e) => e.status !== 'current' && e.status !== 'archived') ||
      hdnStore.editions[0];

    adminCommandSummary = {
      aiDraftsCount,
      humanDraftsCount,
      awaitingReviewCount,
      readyToPublishCount: readyToPublishItems.length,
      activeAssignmentsCount,
      publishedStoriesCount,
      trashedCount: allTrashedMs.length,
      pendingApplicationsCount: dispatchLegacy.applications.filter(
        (a) => a.status === 'Submitted' || a.status === 'Under Credential Review' || a.status === 'Under Editorial Assessment'
      ).length,
      openPitchesCount: dispatchLegacy.pitches.filter((p) => p.workflowStage === 'pitching').length,
      activeJournalistsCount: hdnStore.accounts.filter(
        (a) => a.status === 'active' && !a.roles.includes('autonomous_ai_engine')
      ).length,
      activeSourcesCount: anieStore.sources.filter((s) => s.active).length,
      signalsDiscoveredCount: anieStore.signals.length,
      forthcomingEdition: forthcomingEdition
        ? {
            slug: forthcomingEdition.slug,
            title: forthcomingEdition.themeTitle,
            volumeLabel: forthcomingEdition.volumeLabel,
            readinessPercent: forthcomingEdition.readinessPercent,
            status: forthcomingEdition.status,
          }
        : null,
      // Daily Consolidated Approval Queue (for founder 1-screen management!)
      consolidatedApprovalQueue: readyToPublishItems.slice(0, 12).map((m) => ({
        id: m.id,
        headline: m.headline,
        bylineDisplay: m.bylineDisplay,
        originType: m.originType,
        publicationStream: m.publicationStream,
        bureauId: m.bureauId,
        departmentId: m.departmentId,
        riskLevel: m.riskLevel,
        workflowStatus: m.workflowStatus,
        factCheckCompleted: m.factCheckCompleted,
        scientificReviewRequired: m.scientificReviewRequired,
        scientificReviewCompleted: m.scientificReviewCompleted,
        wordCount: m.wordCount,
        updatedAt: m.updatedAt,
      })),
      anieEngineMode: anieStore.engineMode,
      measuredAiSpendTodayUsd: anieStore.modelAndBudget.measuredSpentTodayUsd,
      measuredAiSpendMonthUsd: anieStore.modelAndBudget.measuredSpentMonthUsd,
    };
  }

  return NextResponse.json({
    success: true,
    journalistSummary,
    reviewSummary: {
      assignedReviewsCount: myReviews.filter((r) => r.status !== 'completed').length,
      completedReviewsCount: myReviews.filter((r) => r.status === 'completed').length,
      candidateManuscriptsCount: reviewCandidates.length,
      reviews: myReviews,
    },
    adminCommandSummary,
    bureaus: REGIONAL_REPORTING_BUREAUS,
    departments: EDITORIAL_DEPARTMENTS,
    beats: REPORTING_BEATS_FULL,
  });
}
