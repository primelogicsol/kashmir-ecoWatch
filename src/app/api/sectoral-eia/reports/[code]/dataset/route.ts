import { NextRequest, NextResponse } from 'next/server';
import { buildMinimalXlsxBuffer, XlsxSheetInput } from '@/lib/xlsx-minimal';
import {
  getMergedMasterRecord,
  recordReportAnalyticsEvent,
} from '@/lib/sectoral-research-store';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const { searchParams } = new URL(request.url);
  const format = (searchParams.get('format') || 'csv').toLowerCase();

  const master = getMergedMasterRecord(code);
  if (!master) {
    return NextResponse.json(
      { success: false, error: `Dossier "${code}" not found.` },
      { status: 404 }
    );
  }

  const isPublished =
    master.dossier.status === 'Published' || master.dossier.status === 'Updated';
  if (!isPublished) {
    return NextResponse.json(
      {
        success: false,
        code: master.dossier.code,
        status: master.dossier.status,
        governanceNotice:
          'Scientific Governance Safeguard: Empirical dataset downloads are enabled only for validated Published/Updated dossiers. Proposed dossiers do not fabricate unmeasured datasets.',
      },
      { status: 409 }
    );
  }

  const baseName = `${master.dossier.code}-${master.filenameSlug}`;
  recordReportAnalyticsEvent(master.dossier.code, 'dataset_download', format.toUpperCase());

  if (format === 'geojson') {
    const geojson = {
      type: 'FeatureCollection',
      metadata: {
        code: master.dossier.code,
        title: master.dossier.title,
        version: master.version,
        watershed: master.studyArea.watershed,
        source: master.attribution.workingGroup,
      },
      features: [
        {
          type: 'Feature',
          properties: {
            code: master.dossier.code,
            name: master.studyArea.region,
            ecosystem: master.studyArea.ecosystem,
            watershed: master.studyArea.watershed,
            elevationBand: master.studyArea.elevationBand,
            status: master.dossier.status,
          },
          geometry: {
            type: 'Point',
            coordinates: [master.studyArea.coordinates[1], master.studyArea.coordinates[0]],
          },
        },
      ],
    };
    return new NextResponse(JSON.stringify(geojson, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/geo+json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${baseName}.geojson"`,
      },
    });
  }

  if (format === 'xlsx') {
    const sheets: XlsxSheetInput[] = [];

    const indRows = master.indicators.map((i) => ({
      Indicator_ID: i.id,
      Indicator_Name: i.name,
      Unit: i.unit,
      Historical_Baseline: i.baselineValue ?? 'N/A',
      Observed_Value: i.observedValue ?? 'Pending',
      Threshold_Limit: i.thresholdValue ?? 'N/A',
      Observation_Window: i.observationDate,
      Classification: i.classification,
      Trend: i.trend,
      Uncertainty: i.uncertainty,
      Provenance_Class: i.provenanceClass,
      Source_Attribution: i.sourceAttribution,
    }));
    sheets.push({ name: 'Indicators', rows: indRows });

    const tsRows = master.telemetrySeries.points.map((p) => ({
      Period: p.period,
      Season: p.season,
      Station: p.station,
      Value: p.primaryValue,
      Unit: master.telemetrySeries.unit,
      Baseline_Reference: p.baselineReference,
      Threshold_Limit: p.thresholdLimit,
      Provenance: master.telemetrySeries.provenanceClass,
    }));
    if (tsRows.length > 0) {
      sheets.push({ name: 'Seasonal_Series', rows: tsRows });
    }

    const riskRows = master.riskMatrix.map((r) => ({
      Receptor_Or_Process: r.receptorOrProcess,
      Pressure_Driver: r.pressureDriver,
      Severity: r.severity,
      Duration: r.duration,
      Spatial_Extent: r.spatialExtent,
      Reversibility: r.reversibility,
      Cumulative_Score_100: r.cumulativeScore,
      Mitigation_Priority: r.mitigationPriority,
    }));
    sheets.push({ name: 'Risk_Matrix', rows: riskRows });

    const refRows = master.references.map((r) => ({
      Ref_Number: r.num,
      Authors_Or_Body: r.authors,
      Year: r.year,
      Title: r.title,
      Publication: r.journalOrPublisher,
      Category: r.category,
      Geographical_Tier: r.geographicalTier || 'Tier B',
      Access_Classification: r.accessClassification || 'Abstract-Verified',
      DOI_Or_URL: r.doi ? `https://doi.org/${r.doi}` : r.sourceUrl || '',
    }));
    sheets.push({ name: 'References', rows: refRows });

    if (master.claimVerificationMatrix && master.claimVerificationMatrix.length > 0) {
      sheets.push({
        name: 'Claim_Verification',
        rows: master.claimVerificationMatrix as unknown as Array<Record<string, unknown>>,
      });
    }

    const xlsxBuf = buildMinimalXlsxBuffer(sheets);
    return new NextResponse(new Uint8Array(xlsxBuf), {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Length': String(xlsxBuf.length),
        'Content-Disposition': `attachment; filename="${baseName}.xlsx"`,
      },
    });
  }

  if (format === 'json') {
    const payload = {
      schema: 'KEW-SEIAE-Scientific-Dataset-v2',
      exportedAt: new Date().toISOString(),
      code: master.dossier.code,
      title: master.dossier.title,
      version: master.version,
      status: master.dossier.status,
      evidencePublicationClass: master.evidencePublicationClass,
      publicationDate: master.dossier.date,
      workingGroup: master.attribution.workingGroup,
      studyArea: master.studyArea,
      externalSearchProtocol: master.externalSearchProtocol,
      analyticalModelSpec: master.analyticalModelSpec,
      indicators: master.indicators,
      telemetrySeries: master.telemetrySeries,
      riskMatrix: master.riskMatrix,
      claimVerificationMatrix: master.claimVerificationMatrix,
      internationalComparativeCase: master.internationalComparativeCase,
      references: master.references,
      limitations: master.limitations,
    };
    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${baseName}.json"`,
      },
    });
  }

  // Default: CSV
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const headers = [
    'Indicator_ID',
    'Indicator_Name',
    'Unit',
    'Baseline_Value',
    'Observed_Value',
    'Threshold_Limit',
    'Observation_Date',
    'Classification',
    'Trend',
    'Uncertainty',
    'Provenance_Class',
    'Source_Attribution',
  ];
  const lines = [
    headers.join(','),
    ...master.indicators.map((i) =>
      [
        i.id,
        i.name,
        i.unit,
        i.baselineValue ?? 'N/A',
        i.observedValue ?? 'Pending',
        i.thresholdValue ?? 'N/A',
        i.observationDate,
        i.classification,
        i.trend,
        i.uncertainty,
        i.provenanceClass,
        i.sourceAttribution,
      ]
        .map(esc)
        .join(',')
    ),
  ];

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${baseName}.csv"`,
    },
  });
}
