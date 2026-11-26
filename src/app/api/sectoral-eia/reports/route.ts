import { NextRequest, NextResponse } from 'next/server';
import { computeResearchSeriesPortfolioStats } from '@/data/sectoral-research-series-2026';
import {
  evaluateCandidateScopeDuplication,
  KEW_MODULE_TO_REPORT_COVERAGE_MATRIX,
  PRIORITY_15_RESEARCH_QUEUE,
} from '@/data/research-portfolio-100-expansion';
import {
  getAllReportAnalytics,
  getMergedResearchDossiers,
  getPortfolioQualityControlReport,
  PUBLICATION_WORKFLOW_19_STAGES,
  saveDossierOverride,
} from '@/lib/sectoral-research-store';
import { MASTER_LAKE_SUMMARY_STATS } from '@/data/hydrology/master-lake-registry';
import {
  getExternalCorpusSummary,
  UNSUPPORTED_CLAIMS_REMEDIATION_LEDGER,
} from '@/data/report-scientific-registries-100';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const division = searchParams.get('division');
  const sectorTag = searchParams.get('sector');
  const status = searchParams.get('status');
  const cohort = searchParams.get('cohort');
  const includeAnalytics = searchParams.get('analytics') === 'true';
  const includeMatrix = searchParams.get('matrix') === 'true';
  const includeQc = searchParams.get('qc') === 'true';

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
  if (cohort === 'original_40') {
    filtered = filtered.filter((d) => d.sequenceNumber <= 40);
  } else if (cohort === 'expanded_60') {
    filtered = filtered.filter((d) => d.sequenceNumber >= 41);
  } else if (cohort === 'priority_15') {
    filtered = filtered.filter((d) => typeof d.priorityRank === 'number');
  }

  return NextResponse.json({
    success: true,
    seriesTitle: 'Kashmir EcoWatch Scientific Research Series (101 Interconnected Dossiers Across 23 Sectors)',
    stats: computeResearchSeriesPortfolioStats(merged),
    externalCorpusSummary: getExternalCorpusSummary(),
    remediatedClaimsAuditCount: UNSUPPORTED_CLAIMS_REMEDIATION_LEDGER.length,
    priorityQueue: PRIORITY_15_RESEARCH_QUEUE,
    workflowStages: PUBLICATION_WORKFLOW_19_STAGES,
    dossiers: filtered,
    ...(includeMatrix ? { moduleCoverageMatrix: KEW_MODULE_TO_REPORT_COVERAGE_MATRIX } : {}),
    ...(includeAnalytics ? { analytics: getAllReportAnalytics() } : {}),
    ...(includeQc
      ? {
          qualityControl: getPortfolioQualityControlReport(),
          lakeInventorySummary: MASTER_LAKE_SUMMARY_STATS,
        }
      : {}),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const merged = getMergedResearchDossiers();
    const result = evaluateCandidateScopeDuplication(
      {
        code: body.code,
        title: body.title || '',
        primaryResearchQuestion: body.primaryResearchQuestion || '',
        geographicalBoundaries: body.geographicalBoundaries,
      },
      merged
    );
    return NextResponse.json({ success: true, duplicationCheck: result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Scope duplication evaluation failed' },
      { status: 500 }
    );
  }
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
