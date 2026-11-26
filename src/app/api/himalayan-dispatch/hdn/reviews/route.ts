import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import {
  getAllUnifiedManuscripts,
  getSanitizedManuscriptForScientificReviewer,
  readHdnStore,
  submitOrUpdateScientificReview,
} from '@/lib/hdn/store';
import { REPORTING_BEATS_FULL } from '@/data/himalayan-dispatch-autonomous';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  if (!hasPermission(account, 'workspace:review') && !hasPermission(account, 'workspace:editorial')) {
    return NextResponse.json(
      { success: false, error: 'Scientific Reviewer or Editorial credentials required.' },
      { status: 403 }
    );
  }

  const targetId = request.nextUrl.searchParams.get('id');
  if (targetId) {
    const existingReview = store.scientificReviews.find(
      (r) => r.id === targetId || r.manuscriptId === targetId
    );
    const msId = existingReview ? existingReview.manuscriptId : targetId;
    const sanitized = getSanitizedManuscriptForScientificReviewer(msId);
    if (!sanitized) {
      return NextResponse.json(
        { success: false, error: 'Manuscript for scientific review not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      review: existingReview || null,
      ...sanitized,
    });
  }

  const isAdminOrEditor = hasPermission(account, 'workspace:editorial') || hasPermission(account, 'workspace:admin');
  const reviews = isAdminOrEditor
    ? store.scientificReviews
    : store.scientificReviews.filter((r) => r.assignedReviewerSlug === account.slug);

  const eligibleManuscripts = getAllUnifiedManuscripts(false)
    .filter(
      (m) =>
        !m.isConfidential &&
        (m.scientificReviewRequired || m.workflowStatus === 'scientific_review')
    )
    .map((m) => ({
      id: m.id,
      headline: m.headline,
      departmentId: m.departmentId,
      bureauId: m.bureauId,
      reportingBeatLabel: m.reportingBeatLabel,
      workflowStatus: m.workflowStatus,
      scientificReviewCompleted: m.scientificReviewCompleted,
      scientificReviewedBy: m.scientificReviewedBy,
      wordCount: m.wordCount,
      updatedAt: m.updatedAt,
    }));

  const reviewers = store.accounts
    .filter((a) => a.status === 'active' && a.roles.includes('scientific_reviewer'))
    .map((a) => ({
      slug: a.slug,
      fullName: a.fullName,
      roleTitle: a.primaryRoleTitle,
      credentials: a.verifiedCredentials,
    }));

  return NextResponse.json({
    success: true,
    reviews,
    eligibleManuscripts,
    reviewers,
    kewObservatoryReferences: REPORTING_BEATS_FULL.map((b) => ({
      code: b.code,
      beatTitle: b.title,
      observatoryLabel: b.kewObservatoryLabel,
      observatoryHref: b.kewObservatoryHref,
      summary: b.summary,
    })),
  });
}

export async function POST(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const res = submitOrUpdateScientificReview(account, {
      reviewId: body.reviewId ? String(body.reviewId) : undefined,
      manuscriptId: String(body.manuscriptId || ''),
      assignedReviewerSlug: body.assignedReviewerSlug
        ? String(body.assignedReviewerSlug)
        : undefined,
      claimAssessments: Array.isArray(body.claimAssessments) ? body.claimAssessments : undefined,
      supportingReferences: Array.isArray(body.supportingReferences)
        ? body.supportingReferences.map(String)
        : undefined,
      methodologicalComments: body.methodologicalComments
        ? String(body.methodologicalComments)
        : undefined,
      statisticalVerificationStatus: body.statisticalVerificationStatus,
      statisticalNotes: body.statisticalNotes ? String(body.statisticalNotes) : undefined,
      geospatialVerificationStatus: body.geospatialVerificationStatus,
      geospatialNotes: body.geospatialNotes ? String(body.geospatialNotes) : undefined,
      uncertaintyAssessment: body.uncertaintyAssessment
        ? String(body.uncertaintyAssessment)
        : undefined,
      conflictOfInterestDeclared:
        typeof body.conflictOfInterestDeclared === 'boolean'
          ? body.conflictOfInterestDeclared
          : undefined,
      conflictOfInterestDetails: body.conflictOfInterestDetails
        ? String(body.conflictOfInterestDetails)
        : undefined,
      recommendation: body.recommendation,
      completeReview: Boolean(body.completeReview),
    });

    if (res.ok === false) {
      return NextResponse.json({ success: false, error: res.error }, { status: 403 });
    }
    return NextResponse.json({ success: true, review: res.review });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to save scientific review.' },
      { status: 500 }
    );
  }
}
