import { NextRequest, NextResponse } from 'next/server';
import {
  canAccessManuscript,
  canEditManuscript,
  hasPermission,
  resolveHdnRequestAccount,
} from '@/lib/hdn/rbac';
import {
  addHdnManuscriptComment,
  blocksToChapters,
  getUnifiedManuscriptByIdOrSlug,
  readHdnStore,
  recordHdnAudit,
  restoreHdnManuscriptRevision,
  transitionHdnManuscriptWorkflow,
  updateHdnManuscriptContent,
  writeHdnStore,
} from '@/lib/hdn/store';
import { EDITORIAL_DEPARTMENTS, REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { REPORTING_BEATS_FULL } from '@/data/himalayan-dispatch-autonomous';
import type { MagazineStory, StoryCorrectionEntry } from '@/types/himalayan-dispatch';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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

  const ms = getUnifiedManuscriptByIdOrSlug(decodeURIComponent(id));
  if (!ms) {
    return NextResponse.json(
      { success: false, error: 'Manuscript not found.' },
      { status: 404 }
    );
  }

  if (!canAccessManuscript(account, ms)) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Forbidden: You do not have role, bureau, or assignment authorization to access this manuscript.',
      },
      { status: 403 }
    );
  }

  // Build live `MagazineStory` preview object for exact public layout preview
  const dept =
    EDITORIAL_DEPARTMENTS.find((d) => d.id === ms.departmentId) || EDITORIAL_DEPARTMENTS[2];
  const bureauObj = REGIONAL_REPORTING_BUREAUS.find((b) => b.id === ms.bureauId);
  const chartBlock = ms.blocks.find((b) => b.type === 'interactive_chart');

  const previewStory: MagazineStory = {
    id: ms.id,
    slug: ms.slug,
    editionSlug: ms.targetEditionSlug,
    editionLabel: ms.editionLabel,
    departmentId: ms.departmentId,
    departmentRubric: dept.shortLabel.toUpperCase(),
    folioCode: `FOLIO ${dept.folioNumber}`,
    title: ms.headline,
    subtitle: ms.standfirst || ms.subtitle,
    excerpt: ms.subtitle || ms.standfirst,
    dateline: ms.dateline,
    region: bureauObj?.name || 'Western Himalayas',
    readingTimeMinutes: ms.readingTimeMinutes,
    wordCount: ms.wordCount,
    publishedAt: (ms.publishedAt || ms.updatedAt).slice(0, 10),
    heroImage: ms.heroImage,
    heroCaption: ms.heroCaption,
    heroCredit: `${ms.heroCredit} (${ms.heroLicense})`,
    heroMonochrome: ms.heroMonochrome,
    journalistSlug: ms.primaryAuthorSlug,
    bylineDisplay: ms.bylineDisplay,
    bylineRole: ms.bylineRole,
    photographyByline: ms.photographyByline,
    factCheckedBy: ms.factCheckedBy || 'Pending Stage 07 Fact-Check',
    scientificReviewer: ms.scientificReviewedBy || 'Pending / Optional Stage 08 Review',
    workflowStage: ms.workflowStatus === 'published' ? 'publication' : 'drafting',
    isPublished: ms.workflowStatus === 'published',
    chapters: blocksToChapters(ms.blocks),
    dataVisualization:
      chartBlock && chartBlock.chartPoints
        ? {
            id: chartBlock.id,
            kicker: 'EDITORIAL DATA PROFILE',
            title: chartBlock.heading || 'Quantitative Series',
            subtitle: chartBlock.subheading || '',
            unit: chartBlock.chartUnit || '',
            chartStyle: chartBlock.chartStyle || 'snowline_horizon',
            keyFindingStat: chartBlock.keyFindingStat || '',
            keyFindingNarrative: chartBlock.keyFindingNarrative || '',
            methodologyNote: chartBlock.mapMethodologyNote || 'Verified KEW series.',
            sourceCitation: chartBlock.corroborationNote || 'Kashmir EcoWatch Observatory',
            points: chartBlock.chartPoints,
          }
        : undefined,
    corrections: ms.corrections,
    relatedKewModule: ms.relatedKewModules[0],
    seoKeywords: ms.seoKeywords,
    reportingBeatSlug: ms.reportingBeatSlug,
    reportingBeatLabel: ms.reportingBeatLabel,
    publicationStatusNote:
      ms.workflowStatus === 'published'
        ? undefined
        : `UNPUBLISHED PREVIEW · ${ms.workflowStatus.toUpperCase()}`,
  };

  return NextResponse.json({
    success: true,
    canEdit: canEditManuscript(account, ms),
    canPublish: hasPermission(account, 'publication:publish'),
    manuscript: ms,
    previewStory,
    bureaus: REGIONAL_REPORTING_BUREAUS,
    departments: EDITORIAL_DEPARTMENTS,
    beats: REPORTING_BEATS_FULL,
    mediaLibrary: store.mediaAssets.filter((a) => a.editorialApprovalStatus !== 'rejected'),
  });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const manuscriptId = decodeURIComponent(id);
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
    const action = String(body?.action || 'save_content');

    if (action === 'save_content' || action === 'autosave') {
      const res = updateHdnManuscriptContent(account, manuscriptId, {
        ...body,
        saveKind: action === 'autosave' ? 'autosave' : 'manual',
      });
      if (res.ok === false) {
        return NextResponse.json(
          { success: false, error: res.error },
          { status: res.status || 400 }
        );
      }
      return NextResponse.json({ success: true, manuscript: res.manuscript });
    }

    if (action === 'restore_revision') {
      const res = restoreHdnManuscriptRevision(
        account,
        manuscriptId,
        String(body?.revisionId || '')
      );
      if (res.ok === false) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, manuscript: res.manuscript });
    }

    if (action === 'transition_workflow') {
      const res = transitionHdnManuscriptWorkflow(account, manuscriptId, {
        targetStatus: body?.targetStatus,
        signOffGate: body?.signOffGate,
        scheduledPublicationAt: body?.scheduledPublicationAt,
        note: body?.note,
      });
      if (res.ok === false) {
        return NextResponse.json(
          { success: false, error: res.error },
          { status: res.status || 403 }
        );
      }
      return NextResponse.json({ success: true, manuscript: res.manuscript });
    }

    if (action === 'add_comment') {
      const res = addHdnManuscriptComment(account, manuscriptId, {
        blockId: body?.blockId ? String(body.blockId) : undefined,
        kind: body?.kind || 'editorial_comment',
        message: String(body?.message || ''),
        resolveCommentId: body?.resolveCommentId ? String(body.resolveCommentId) : undefined,
      });
      if (res.ok === false) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, manuscript: res.manuscript });
    }

    if (action === 'append_correction') {
      if (!hasPermission(account, 'publication:corrections')) {
        return NextResponse.json(
          { success: false, error: 'Corrections require Public Editor, Managing Editor, or EIC authority.' },
          { status: 403 }
        );
      }
      const note = String(body?.note || '').trim();
      if (note.length < 10) {
        return NextResponse.json(
          { success: false, error: 'Correction note must be at least 10 characters.' },
          { status: 400 }
        );
      }
      const freshStore = readHdnStore();
      const ms = freshStore.manuscripts.find(
        (m) => m.id === manuscriptId || m.slug === manuscriptId
      );
      if (!ms) {
        return NextResponse.json({ success: false, error: 'Manuscript not found.' }, { status: 404 });
      }
      const entry: StoryCorrectionEntry = {
        id: `corr-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        kind: (body?.kind as StoryCorrectionEntry['kind']) || 'Clarification',
        note,
        approvedBy: account.fullName,
      };
      ms.corrections.unshift(entry);
      recordHdnAudit(freshStore, account, {
        category: 'publication',
        action: 'append_correction',
        targetId: ms.id,
        targetLabel: ms.headline,
        details: `Appended ${entry.kind}: ${note}`,
      });
      writeHdnStore(freshStore);
      return NextResponse.json({ success: true, manuscript: ms });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update manuscript.' },
      { status: 500 }
    );
  }
}
