import { NextRequest, NextResponse } from 'next/server';
import { resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import {
  createHdnManuscript,
  getScopedManuscriptsForAccount,
  promoteDailyManuscriptToMonthlyFeature,
  readHdnStore,
  RECONCILED_14_STAGE_LIFECYCLE,
} from '@/lib/hdn/store';
import type { BureauSlugId, EditorialDepartmentId } from '@/types/himalayan-dispatch';
import type { HdnArticleManuscript, HdnPublicationStream } from '@/types/hdn-newsroom';

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

  const sp = request.nextUrl.searchParams;
  const mineOnly = sp.get('mine') === '1';
  const includeTrashed = sp.get('includeTrashed') === '1';
  const statusFilter = sp.get('status');
  const streamFilter = sp.get('stream');
  const bureauFilter = sp.get('bureau');
  const deptFilter = sp.get('department');
  const riskFilter = sp.get('risk');
  const originFilter = sp.get('origin');
  const searchQ = (sp.get('q') || '').trim().toLowerCase();

  let list = getScopedManuscriptsForAccount(account, includeTrashed);

  if (mineOnly) {
    list = list.filter(
      (m) => m.primaryAuthorSlug === account.slug || m.coAuthorSlugs.includes(account.slug)
    );
  }
  if (statusFilter && statusFilter !== 'all') {
    list = list.filter((m) => m.workflowStatus === statusFilter);
  }
  if (streamFilter && streamFilter !== 'all') {
    list = list.filter((m) => m.publicationStream === streamFilter);
  }
  if (bureauFilter && bureauFilter !== 'all') {
    list = list.filter((m) => m.bureauId === bureauFilter);
  }
  if (deptFilter && deptFilter !== 'all') {
    list = list.filter((m) => m.departmentId === deptFilter);
  }
  if (riskFilter && riskFilter !== 'all') {
    list = list.filter((m) => m.riskLevel === riskFilter);
  }
  if (originFilter && originFilter !== 'all') {
    list = list.filter((m) => m.originType === originFilter);
  }
  if (searchQ) {
    list = list.filter(
      (m) =>
        m.headline.toLowerCase().includes(searchQ) ||
        m.standfirst.toLowerCase().includes(searchQ) ||
        m.bylineDisplay.toLowerCase().includes(searchQ) ||
        m.dateline.toLowerCase().includes(searchQ)
    );
  }

  // Return lightweight summary list (excluding 50 revision snapshots per row to keep responses ultra-fast!)
  const summaries = list.map((m) => ({
    ...m,
    revisionsCount: m.revisions.length,
    revisions: undefined,
  }));

  return NextResponse.json({
    success: true,
    total: summaries.length,
    manuscripts: summaries,
    lifecycleStages: RECONCILED_14_STAGE_LIFECYCLE,
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
    if (body?.action === 'promote_to_monthly') {
      const res = promoteDailyManuscriptToMonthlyFeature(
        account,
        String(body.sourceId || ''),
        body.targetEditionSlug ? String(body.targetEditionSlug) : undefined
      );
      if (res.ok === false) {
        return NextResponse.json({ success: false, error: res.error }, { status: 403 });
      }
      return NextResponse.json({ success: true, manuscript: res.featureManuscript });
    }

    const res = createHdnManuscript(account, {
      headline: String(body?.headline || 'Untitled Himalayan Dispatch Manuscript'),
      standfirst: body?.standfirst ? String(body.standfirst) : '',
      subtitle: body?.subtitle ? String(body.subtitle) : '',
      dateline: body?.dateline ? String(body.dateline) : undefined,
      publicationStream: body?.publicationStream as HdnPublicationStream | undefined,
      targetEditionSlug: body?.targetEditionSlug ? String(body.targetEditionSlug) : undefined,
      departmentId: body?.departmentId as EditorialDepartmentId | undefined,
      bureauId: body?.bureauId as BureauSlugId | undefined,
      reportingBeatSlug: body?.reportingBeatSlug ? String(body.reportingBeatSlug) : undefined,
      articleFormat: body?.articleFormat as HdnArticleManuscript['articleFormat'] | undefined,
      linkedAssignmentId: body?.linkedAssignmentId ? String(body.linkedAssignmentId) : undefined,
      isConfidential: Boolean(body?.isConfidential),
      blocks: Array.isArray(body?.blocks) ? body.blocks : undefined,
    });

    if (res.ok === false) {
      return NextResponse.json({ success: false, error: res.error }, { status: 403 });
    }

    return NextResponse.json({ success: true, manuscript: res.manuscript });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create manuscript.' },
      { status: 500 }
    );
  }
}
