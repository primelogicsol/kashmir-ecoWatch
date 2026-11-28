import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SNOWLINE_SYNTHESIS_ROWS = [
  {
    period: '1988-1992',
    sensor_constellation: 'Landsat-5 TM (Collection 2 Level-2 SR)',
    reference_dem: 'Copernicus GLO-30 / NASADEM 30 m',
    basin_scope: 'Upper Jhelum (Lidder, Sindh, Bringi, Erin, Pohru) + Zanskar Suru-Doda Fringe (>2,800 m)',
    window_doy: 'DOY 258-288 (15 Sep - 15 Oct end-of-ablation window)',
    cloud_free_scenes_n: 26,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4168,
    vertical_uncertainty_1sigma_m: 26,
    cumulative_anomaly_vs_1988_1992_m: 0,
    kolahoi_glacier_area_km2_published_ref: '13.87 (1962 SOI baseline) / ~12.40 (1990 Landsat; Rashid et al. 2020 DOI:10.3390/w12041168)',
    notes: 'KEW multi-basin synthesis baseline; shadow & water masked (NIR > 0.11, slope < 55 deg).',
  },
  {
    period: '1993-1997',
    sensor_constellation: 'Landsat-5 TM',
    reference_dem: 'Copernicus GLO-30 / NASADEM 30 m',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 29,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4194,
    vertical_uncertainty_1sigma_m: 24,
    cumulative_anomaly_vs_1988_1992_m: 26,
    kolahoi_glacier_area_km2_published_ref: 'Interpolated decadal recession trajectory (Shukla & Ali 2016 DOI:10.3189/2016aog71a046)',
    notes: 'Moderate positive anomaly following dry 1995/1997 autumn windows.',
  },
  {
    period: '1998-2002',
    sensor_constellation: 'Landsat-5 TM + Landsat-7 ETM+ (pre-SLC-off)',
    reference_dem: 'Copernicus GLO-30 / NASADEM 30 m',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 38,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4236,
    vertical_uncertainty_1sigma_m: 22,
    cumulative_anomaly_vs_1988_1992_m: 68,
    kolahoi_glacier_area_km2_published_ref: '~11.92 (2000 satellite inventory; Rashid et al. 2020)',
    notes: 'Sharp upward step coinciding with 1999-2001 Western Disturbance winter precipitation drought.',
  },
  {
    period: '2003-2007',
    sensor_constellation: 'Landsat-5 TM + Terra MODIS MOD10A1 cross-check',
    reference_dem: 'Copernicus GLO-30 / NASADEM 30 m',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 34,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4265,
    vertical_uncertainty_1sigma_m: 22,
    cumulative_anomaly_vs_1988_1992_m: 97,
    kolahoi_glacier_area_km2_published_ref: 'Hoksar & Lidder mass-balance negative phase (Romshoo et al. 2022 DOI:10.1038/s41598-022-20033-w)',
    notes: 'Landsat-7 SLC-off scan-line gaps excluded from hypsometric percentile extraction.',
  },
  {
    period: '2008-2012',
    sensor_constellation: 'Landsat-5 TM + IRS Resourcesat AWiFS/LISS-III cross-reference',
    reference_dem: 'Copernicus GLO-30 / NASADEM 30 m',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 31,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4302,
    vertical_uncertainty_1sigma_m: 21,
    cumulative_anomaly_vs_1988_1992_m: 134,
    kolahoi_glacier_area_km2_published_ref: '~11.25 (circa 2010-2013 Lidder inventory)',
    notes: 'Sustained snowline rise across south- and southwest-facing Pir Panjal & Great Himalayan cirques.',
  },
  {
    period: '2013-2017',
    sensor_constellation: 'Landsat-8 OLI + Sentinel-2A MSI (2015+)',
    reference_dem: 'Copernicus GLO-30 30 m / 10 m resampled',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 52,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4349,
    vertical_uncertainty_1sigma_m: 19,
    cumulative_anomaly_vs_1988_1992_m: 181,
    kolahoi_glacier_area_km2_published_ref: '10.69 (2018; 23% loss since 1962; Rashid et al. 2020 DOI:10.3390/w12041168)',
    notes: '12-bit radiometric resolution reduces shadow misclassification in steep north-facing troughs.',
  },
  {
    period: '2018-2022',
    sensor_constellation: 'Landsat-8/9 OLI + Sentinel-2A/2B MSI',
    reference_dem: 'Copernicus GLO-30',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 74,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4384,
    vertical_uncertainty_1sigma_m: 18,
    cumulative_anomaly_vs_1988_1992_m: 216,
    kolahoi_glacier_area_km2_published_ref: 'Mean elevation loss ~-0.68 to -1.04 m w.e./yr across benchmark Kashmir glaciers (Romshoo et al. 2022)',
    notes: 'Accelerated spring albedo decay linked to dust & black-carbon aerosol loading (Pu et al. 2021 DOI:10.5194/tc-15-2255-2021).',
  },
  {
    period: '2023-2026',
    sensor_constellation: 'Landsat-8/9 OLI + Sentinel-2A/2B MSI',
    reference_dem: 'Copernicus GLO-30',
    basin_scope: 'Upper Jhelum + Zanskar Fringe (>2,800 m)',
    window_doy: 'DOY 258-288',
    cloud_free_scenes_n: 68,
    ndsi_threshold: 0.4,
    modeled_regional_tsla_m_asl: 4410,
    vertical_uncertainty_1sigma_m: 18,
    cumulative_anomaly_vs_1988_1992_m: 242,
    kolahoi_glacier_area_km2_published_ref: 'Provisional KEW observatory synthesis awaiting external Stage 05 glaciological review',
    notes: 'Includes snow-drought winters of Jan-Feb 2024 and Dec 2024-Jan 2025; reported as KEW synthesis estimate (+242 m +/- 22 m), not an independently certified peer-reviewed series.',
  },
];

export async function GET(request: NextRequest) {
  const format = (request.nextUrl.searchParams.get('format') || 'csv').toLowerCase();

  if (format === 'json') {
    return NextResponse.json({
      datasetId: 'hd-vol01-no01-snowline-synthesis-v1',
      status: 'pre_release_stage_08_synthesis_model',
      disclaimer:
        'KEW × Himalayan Dispatch multi-sensor hypsometric synthesis series (1988–2026) paired with published peer-reviewed benchmark glacier studies. Provided for methodological transparency and independent glaciological audit prior to Stage 05 certification.',
      methodology: {
        metric: 'End-of-ablation Regional Transient Snowline Altitude (TSLA, 15th-percentile snow-covered elevation band)',
        sensors: ['Landsat-5 TM', 'Landsat-7 ETM+', 'Landsat-8/9 OLI', 'Sentinel-2A/2B MSI'],
        dem: 'Copernicus GLO-30 / NASADEM 30 m',
        ndsiFormula: '(Green - SWIR1) / (Green + SWIR1) >= 0.40 with NIR > 0.11',
        netShift1988To2026Meters: 242,
        combinedUncertainty1SigmaMeters: 22,
      },
      rows: SNOWLINE_SYNTHESIS_ROWS,
    });
  }

  const headers = Object.keys(SNOWLINE_SYNTHESIS_ROWS[0]);
  const escapeCsv = (val: unknown) => {
    const s = String(val ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const csvLines = [
    '# HIMALAYAN DISPATCH VOL. 01 NO. 01 - SUPPLEMENTARY DATASET: 38-WINTER SNOWLINE SYNTHESIS (1988-2026)',
    '# STATUS: KEW Multi-Sensor Synthesis Estimate (+242 m +/- 22 m) + Peer-Reviewed Benchmark Reference Series (Stage 05 External Review Pending)',
    headers.join(','),
    ...SNOWLINE_SYNTHESIS_ROWS.map((row) =>
      headers.map((h) => escapeCsv((row as Record<string, unknown>)[h])).join(',')
    ),
  ];

  return new NextResponse(csvLines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="himalayan-dispatch-vol01-snowline-synthesis-1988-2026.csv"',
    },
  });
}
