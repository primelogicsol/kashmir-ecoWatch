import { NextRequest, NextResponse } from 'next/server';
import { computeResearchSeriesPortfolioStats } from '@/data/sectoral-research-series-2026';
import {
  getAllReportAnalytics,
  getMergedResearchDossiers,
  PUBLICATION_WORKFLOW_19_STAGES,
  saveDossierOverride,
} from '@/lib/sectoral-research-store';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const division = searchParams.get('division');
  const sectorTag = searchParams.get('sector');
  const status = searchParams.get('status');
  const includeAnalytics = searchParams.get('analytics') === 'true';

  const merged = getMergedResearchDossiers();
  let filtered = merged;

  if (division && division !== 'all') {
    filtered = filtered.filter((d) => d.divisionId === division);
  }
  if (sectorTag && sectorTag !== 'all') {
    filtered = filtered.filter((d) => d.sectorTag === sectorTag);
  }
  if (status && status !== 'all') {
    filtered = filtered.filter((d) => d.status === status);
  }

  return NextResponse.json({
    success: true,
    seriesTitle: 'Kashmir EcoWatch Sectoral Environmental Research Series 2026',
    stats: computeResearchSeriesPortfolioStats(merged),
    workflowStages: PUBLICATION_WORKFLOW_19_STAGES,
    dossiers: filtered,
    ...(includeAnalytics ? { analytics: getAllReportAnalytics() } : {}),
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      code,
      status,
      date,
      title,
      abstract,
      author,
      isProposedWorkingGroup,
      workflowStageIndex,
      customChapterParagraphs,
      note,
      actor,
      version,
    } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Dossier code is required.' },
        { status: 400 }
      );
    }

    const updated = saveDossierOverride(code, {
      status,
      date,
      title,
      abstract,
      author,
      isProposedWorkingGroup,
      workflowStageIndex,
      customChapterParagraphs,
      note,
      actor,
      version,
    });

    return NextResponse.json({ success: true, override: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to update dossier' },
      { status: 500 }
    );
  }
}
