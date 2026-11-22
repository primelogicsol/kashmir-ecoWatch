import { NextRequest, NextResponse } from 'next/server';
import {
  DISTRICT_TRANSPORT_DATA,
  REGION_TRANSPORT_SUMMARIES,
  BASIN_TRANSPORT_TOTALS,
  COMPLETENESS_MATRIX,
  TRAFFIC_POLLUTION_HOTSPOTS,
  TRANSPORT_DATA_PROVIDERS,
  SCIENTIFIC_EMISSION_FACTORS,
  KEWRegion
} from '@/data/transportation-pollution';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region') as KEWRegion | null;
  const district = searchParams.get('district');
  const view = searchParams.get('view'); // 'summary' | 'completeness' | 'hotspots' | 'providers' | 'factors' | 'all'

  let filtered = [...DISTRICT_TRANSPORT_DATA];

  if (region && region !== ('ALL' as any)) {
    filtered = filtered.filter(d => d.region === region);
  }

  if (district) {
    filtered = filtered.filter(d => d.district.toLowerCase() === district.toLowerCase());
  }

  if (view === 'completeness') {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      matrix: COMPLETENESS_MATRIX
    });
  }

  if (view === 'hotspots') {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      hotspots: TRAFFIC_POLLUTION_HOTSPOTS
    });
  }

  if (view === 'providers') {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      providers: TRANSPORT_DATA_PROVIDERS
    });
  }

  if (view === 'factors') {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      factors: SCIENTIFIC_EMISSION_FACTORS
    });
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    meta: {
      totalDistricts: filtered.length,
      basinTotals: BASIN_TRANSPORT_TOTALS,
      regionSummaries: REGION_TRANSPORT_SUMMARIES
    },
    data: filtered
  });
}
