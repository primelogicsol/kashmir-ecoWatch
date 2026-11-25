import { NextRequest, NextResponse } from 'next/server';
import { SHARED_ASSESSMENT_DATABASE } from '@/data/sectoral-eia';
import { generateInstitutionalScientificPdf } from '@/lib/pdf/kew-scientific-pdf-engine';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const asmt = SHARED_ASSESSMENT_DATABASE.find(
    (a) => a.id.toLowerCase() === id.toLowerCase() || a.slug.toLowerCase() === id.toLowerCase()
  );

  if (!asmt) {
    return NextResponse.json(
      { success: false, error: `Assessment "${id}" not found.` },
      { status: 404 }
    );
  }

  const artifact = generateInstitutionalScientificPdf({
    code: asmt.code,
    seriesTitle: 'Kashmir EcoWatch Sectoral EIA Engine — Assessment Dossier',
    sectorClassification: asmt.sector,
    status: asmt.publicationStatus,
    version: asmt.methodologyVersion,
    publicationDate: asmt.publishedAt || asmt.updatedAt,
    lastRevised: asmt.updatedAt,
    title: asmt.title,
    subtitle: asmt.formalTitle,
    workingGroup: asmt.submittingEntity?.name || 'Kashmir EcoWatch SEIAE Panel',
    isProposedWorkingGroup: false,
    studyAreaSummary: `${asmt.geographicBoundary.name} (${asmt.geographicBoundary.areaSqKm} km^2, ${asmt.geographicBoundary.watershed})`,
    abstract: asmt.summary,
    chapters: [
      {
        number: '01',
        title: 'Executive Summary & Key Findings',
        paragraphs: [asmt.summary, ...asmt.keyFindings],
      },
      {
        number: '02',
        title: 'Geographic Boundary & Historical Baseline',
        paragraphs: [
          `Boundary: ${asmt.geographicBoundary.name} (${asmt.geographicBoundary.districts.join(', ')}).`,
          `Baseline (${asmt.baseline.baselineYear}): ${asmt.baseline.referenceState} ${asmt.baseline.summary}`,
        ],
      },
      {
        number: '03',
        title: 'Quantitative Environmental Indicators',
        paragraphs: [
          `Overall Integrity Score: ${asmt.overallScore}/100 (${asmt.impactSignificance} Impact; Confidence: ${asmt.confidenceLevel}).`,
        ],
        table: {
          tableNumber: 'Table 01',
          title: `Indicator Scorecard -- ${asmt.code}`,
          headers: ['Indicator', 'Baseline', 'Observed', 'Threshold', 'Source'],
          rows: asmt.indicators.map((i) => [
            `${i.name} (${i.unit})`,
            String(i.baselineValue),
            String(i.currentValue),
            String(i.thresholdLimit),
            i.source.slice(0, 44),
          ]),
          sourceNote: asmt.methodologyVersion,
        },
      },
      {
        number: '04',
        title: 'Causal Pathways, Scenarios & Mitigation Plan',
        paragraphs: [
          ...asmt.causalPathways.map(
            (c) => `[${c.severity}] ${c.activity} -> ${c.primaryPressure} -> ${c.ecologicalConsequence}`
          ),
          ...asmt.mitigationActions.map(
            (m) => `[Mitigation -- ${m.hierarchyType}] ${m.action}: ${m.projectedReduction} (${m.responsibleLead})`
          ),
        ],
      },
    ],
    references: asmt.sourceReferences.map((r, idx) => ({
      num: idx + 1,
      citation: `${r.authorOrBody} (${r.year}). ${r.title} (${r.type}).`,
      urlOrDoi: r.urlOrCitation,
    })),
    limitations: [
      `Confidence Level: ${asmt.confidenceLevel} (${asmt.publicationStatus}). Non-statutory scientific assessment produced under ${asmt.methodologyVersion}.`,
    ],
    canonicalUrl: `https://kashmir-ecowatch.com/sectoral-eia/assessment/${asmt.id}`,
    filenameSlug: asmt.slug.slice(0, 42),
  });

  return new NextResponse(new Uint8Array(artifact.buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(artifact.byteLength),
      'Content-Disposition': `attachment; filename="${artifact.filename}"`,
    },
  });
}
