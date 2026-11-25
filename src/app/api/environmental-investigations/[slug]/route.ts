import { NextRequest, NextResponse } from 'next/server';
import {
  generateCitationFormats,
  generateEvidenceCsv,
  getInvestigationBySlugOrCode,
  runScientificValidation,
} from '@/data/environmental-investigations';
import { getMergedInvestigations } from '@/lib/environmental-investigations-store';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  const records = getMergedInvestigations();
  const inv = getInvestigationBySlugOrCode(slug, records);

  if (!inv) {
    return NextResponse.json(
      { success: false, error: `Investigation "${slug}" not found in KEW-EIAI registry.` },
      { status: 404 }
    );
  }

  if (format === 'csv') {
    const csv = generateEvidenceCsv(inv);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${inv.code.toLowerCase()}-evidence-matrix.csv"`,
      },
    });
  }

  if (format === 'dataset') {
    return NextResponse.json(
      {
        schema: 'KEW-EIAI-Open-Dataset-v1',
        exportedAt: new Date().toISOString(),
        code: inv.code,
        title: inv.title,
        version: inv.version,
        status: inv.status,
        temporalScope: inv.temporalScope,
        coordinates: inv.coordinates,
        districts: inv.districts,
        watershedOrBasin: inv.watershedOrBasin,
        interventions: inv.interventionInventory,
        evidenceMatrix: inv.evidenceMatrix,
        accountabilityMatrix: inv.accountabilityMatrix,
        recommendations: inv.recommendations,
        references: inv.references,
      },
      {
        headers: {
          'Content-Disposition': `attachment; filename="${inv.code.toLowerCase()}-canonical-dataset.json"`,
        },
      }
    );
  }

  return NextResponse.json({
    success: true,
    investigation: inv,
    citations: generateCitationFormats(inv),
    validation: runScientificValidation(inv),
  });
}
