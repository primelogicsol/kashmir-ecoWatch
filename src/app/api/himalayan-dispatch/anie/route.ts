import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  adminAppendAnieCorrection,
  adminBulkPublishEligibleDrafts,
  adminDeepenResearchOrRegenerate,
  adminPromoteToMonthlyEdition,
  adminReplaceDraftVisualPreset,
  adminSetEngineControl,
  adminToggleOrAddSource,
  adminTransitionDraftStatus,
  adminUpdateBudgetAndSchedule,
  adminUpdateDraftManuscript,
  assembleOrUpdateMonthlyEditionPlan,
  compileConsolidatedDailyDigest,
  readAnieStore,
  writeAnieStore,
} from '@/lib/hd-anie/store';
import { runAniePipelineCycle, ensureInProcessAnieWorkerStarted } from '@/lib/hd-anie/worker';
import { getDynamicMonitoringTaxonomy } from '@/lib/hd-anie/sources-seed';
import { projectAnieDraftToMagazineStory } from '@/lib/hd-anie/writer-verifier';
import { adminTransferAnieDossierToJournalist } from '@/lib/himalayan-dispatch-store';
import { AnieBureauId, AnieEngineMode, AniePublicationStream } from '@/types/hd-anie';
import { EditorialDepartmentId, StoryCorrectionEntry } from '@/types/himalayan-dispatch';

function computeMeasuredSummary(store: ReturnType<typeof readAnieStore>) {
  const todayPrefix = new Date().toISOString().slice(0, 10);
  const activeSources = store.sources.filter((s) => s.active).length;
  const healthySources = store.sources.filter(
    (s) => s.active && s.consecutiveFailures === 0 && Boolean(s.lastSuccessfulRetrievalAt)
  ).length;
  const signalsToday = store.signals.filter((s) => s.retrievedAt.startsWith(todayPrefix)).length;
  const acceptedSignals = store.signals.filter((s) => s.status === 'accepted').length;
  const rejectedSignals = store.signals.filter((s) => s.status !== 'accepted').length;

  const awaitingReview = store.drafts.filter((d) => d.editorialStatus === 'awaiting_review').length;
  const inScientificReview = store.drafts.filter(
    (d) => d.editorialStatus === 'in_scientific_review'
  ).length;
  const inLegalReview = store.drafts.filter((d) => d.editorialStatus === 'in_legal_review').length;
  const scheduled = store.drafts.filter((d) => d.editorialStatus === 'scheduled').length;
  const published = store.drafts.filter((d) => d.editorialStatus === 'published').length;
  const publishedToday = store.drafts.filter(
    (d) => d.editorialStatus === 'published' && (d.publishedAt || '').startsWith(todayPrefix)
  ).length;
  const rejectedDrafts = store.drafts.filter((d) => d.editorialStatus === 'rejected').length;
  const trashedDrafts = store.drafts.filter((d) => d.editorialStatus === 'trashed').length;
  const monthlyDrafts = store.drafts.filter(
    (d) => d.stream === 'monthly_edition' && d.editorialStatus !== 'trashed'
  ).length;

  return {
    activeSources,
    totalSources: store.sources.length,
    healthySources,
    totalSignalsStored: store.signals.length,
    signalsToday,
    acceptedSignals,
    rejectedSignals,
    clustersCount: store.clusters.length,
    dossiersCount: store.dossiers.length,
    awaitingReview,
    heldForReview: awaitingReview + inScientificReview + inLegalReview,
    inScientificReview,
    inLegalReview,
    scheduled,
    published,
    publishedToday,
    rejectedDrafts,
    trashedDrafts,
    monthlyDrafts,
    deadLetterCount: store.deadLetterQueue.length,
  };
}

export async function GET(request: NextRequest) {
  const authResult = await verifyAdminRequest(request);
  if (!authResult.authorized) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized: HD-ANIE Command Center requires verified KEW Administrator credentials.',
      },
      { status: 401 }
    );
  }

  ensureInProcessAnieWorkerStarted();
  const store = readAnieStore();
  const previewId = request.nextUrl.searchParams.get('previewDraftId');

  if (previewId) {
    const draft = store.drafts.find((d) => d.id === previewId);
    const dossier = draft ? store.dossiers.find((dos) => dos.id === draft.dossierId) : null;
    if (!draft) {
      return NextResponse.json({ success: false, error: 'Draft not found.' }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      draft,
      dossier,
      publicLayoutStoryPreview: projectAnieDraftToMagazineStory(draft),
    });
  }

  return NextResponse.json({
    success: true,
    actor: authResult.actor,
    metrics: computeMeasuredSummary(store),
    engineMode: store.engineMode,
    subsystems: store.subsystems,
    scheduleIntervalsMinutes: store.scheduleIntervalsMinutes,
    digestPreferences: store.digestPreferences,
    workerHeartbeat: store.workerHeartbeat,
    modelAndBudget: store.modelAndBudget,
    monitoringTaxonomyCount: getDynamicMonitoringTaxonomy().length,
    monitoringTaxonomy: getDynamicMonitoringTaxonomy(),
    sources: store.sources,
    signals: store.signals.slice(0, 120),
    clusters: store.clusters.slice(0, 80),
    dossiers: store.dossiers.slice(0, 80),
    drafts: store.drafts,
    monthlyEditions: store.monthlyEditions,
    dailyDigests: store.dailyDigests.slice(0, 10),
    workerJobs: store.workerJobs.slice(0, 40),
    deadLetterQueue: store.deadLetterQueue.slice(0, 30),
    auditLog: store.auditLog.slice(0, 80),
  });
}

export async function POST(request: NextRequest) {
  const authResult = await verifyAdminRequest(request);
  if (!authResult.authorized) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized: Administrator credentials required for HD-ANIE editorial operations.',
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const action = String(body?.action || '');
    const actor = authResult.actor;

    if (action === 'run_discovery_cycle') {
      const cycleResult = await runAniePipelineCycle({
        forceAllSources: Boolean(body.forceAllSources ?? true),
        maxNewDraftsPerCycle: Number(body.maxNewDraftsPerCycle || 8),
        triggeredBy: actor,
      });
      return NextResponse.json({ success: true, cycleResult });
    }

    if (action === 'set_engine_control') {
      const mode = (body.engineMode || 'running') as AnieEngineMode;
      const updated = adminSetEngineControl(mode, actor, body.subsystems);
      return NextResponse.json({
        success: true,
        engineMode: updated.engineMode,
        subsystems: updated.subsystems,
      });
    }

    if (action === 'transition_status') {
      const res = adminTransitionDraftStatus(
        String(body.draftId || ''),
        body.transition,
        actor,
        {
          scheduledPublicationAt: body.scheduledPublicationAt,
          note: body.note,
        }
      );
      if (!res.ok) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, draft: res.draft });
    }

    if (action === 'bulk_publish') {
      const ids = Array.isArray(body.draftIds) ? body.draftIds.map(String) : [];
      const result = adminBulkPublishEligibleDrafts(ids, actor);
      return NextResponse.json({ success: true, ...result });
    }

    if (action === 'edit_draft') {
      const updated = adminUpdateDraftManuscript(
        String(body.draftId || ''),
        {
          headline: body.headline,
          standfirst: body.standfirst,
          bylineDisplay: body.bylineDisplay,
          dateline: body.dateline,
          departmentId: body.departmentId as EditorialDepartmentId | undefined,
          bureauId: body.bureauId as AnieBureauId | undefined,
          reportingBeat: body.reportingBeat,
          stream: body.stream as AniePublicationStream | undefined,
          executiveSummary: body.executiveSummary,
          chapters: body.chapters,
          heroImage: body.heroImage,
          heroCaption: body.heroCaption,
          heroCredit: body.heroCredit,
          heroLicense: body.heroLicense,
          editorialDisclosure: body.editorialDisclosure,
          seoTitle: body.seoTitle,
          metaDescription: body.metaDescription,
          isFeatured: body.isFeatured,
        },
        actor
      );
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Draft not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, draft: updated });
    }

    if (action === 'promote_to_monthly_edition') {
      const res = await adminPromoteToMonthlyEdition(
        String(body.draftId || ''),
        actor,
        body.targetEditionSlug ? String(body.targetEditionSlug) : undefined
      );
      if (!res.ok) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, expandedDraft: res.expandedDraft });
    }

    if (
      action === 'regenerate' ||
      action === 'deepen_research' ||
      action === 'revalidate_sources'
    ) {
      const res = await adminDeepenResearchOrRegenerate(
        String(body.draftId || ''),
        action,
        actor
      );
      if (!res.ok) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, draft: res.draft });
    }

    if (action === 'replace_image') {
      const updated = adminReplaceDraftVisualPreset(
        String(body.draftId || ''),
        {
          domainId: body.domainId,
          imageUrl: body.imageUrl,
          caption: body.caption,
          credit: body.credit,
          license: body.license,
        },
        actor
      );
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Draft not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, draft: updated });
    }

    if (action === 'assign_to_journalist') {
      const res = adminTransferAnieDossierToJournalist(
        String(body.draftId || ''),
        String(body.journalistSlug || ''),
        actor
      );
      if (!res.ok) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === 'publish_correction') {
      const note = String(body.note || '').trim();
      if (note.length < 10) {
        return NextResponse.json(
          { success: false, error: 'Correction note must be at least 10 characters.' },
          { status: 400 }
        );
      }
      const updated = adminAppendAnieCorrection(
        String(body.draftId || ''),
        (body.kind as StoryCorrectionEntry['kind']) || 'Clarification',
        note,
        actor
      );
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Article not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, draft: updated });
    }

    if (action === 'toggle_or_add_source') {
      const res = adminToggleOrAddSource(body.sourcePayload, actor);
      if (!res.ok) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, sources: res.sources });
    }

    if (action === 'update_budget_schedule') {
      const updated = adminUpdateBudgetAndSchedule(body, actor);
      return NextResponse.json({
        success: true,
        modelAndBudget: updated.modelAndBudget,
        scheduleIntervalsMinutes: updated.scheduleIntervalsMinutes,
      });
    }

    if (action === 'compile_daily_digest') {
      const store = readAnieStore();
      const digest = compileConsolidatedDailyDigest(store);
      writeAnieStore(store);
      return NextResponse.json({ success: true, digest });
    }

    if (action === 'assemble_monthly_edition') {
      const store = readAnieStore();
      const plan = assembleOrUpdateMonthlyEditionPlan(store);
      writeAnieStore(store);
      return NextResponse.json({ success: true, plan });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported HD-ANIE action: ${action}` },
      { status: 400 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
