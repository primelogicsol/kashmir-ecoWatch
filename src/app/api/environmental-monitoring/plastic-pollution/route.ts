import { NextResponse } from 'next/server';
import {
  DISTRICT_PLASTIC_PROFILES,
  REGIONAL_PLASTIC_SUMMARIES,
  HISTORICAL_PLASTIC_TRENDS,
  RECYCLING_FACILITIES,
  PlasticPollutionRegion,
  EvidenceClassification,
} from '@/data/plastic-pollution';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionFilter = searchParams.get('region') || 'ALL';
    const evidenceFilter = searchParams.get('evidenceClass') || 'ALL';
    const search = (searchParams.get('search') || '').toLowerCase();

    let filteredDistricts = [...DISTRICT_PLASTIC_PROFILES];

    if (regionFilter !== 'ALL') {
      filteredDistricts = filteredDistricts.filter((d) => d.region === regionFilter);
    }

    if (evidenceFilter !== 'ALL') {
      filteredDistricts = filteredDistricts.filter((d) => d.evidenceClass === evidenceFilter);
    }

    if (search) {
      filteredDistricts = filteredDistricts.filter(
        (d) =>
          d.district.toLowerCase().includes(search) ||
          d.region.toLowerCase().includes(search) ||
          d.headquarters.toLowerCase().includes(search) ||
          d.primaryDumpingSite.toLowerCase().includes(search)
      );
    }

    // Totals
    const totalDistricts = filteredDistricts.length;
    const totalPlasticTPD = filteredDistricts.reduce((sum, d) => sum + d.plasticWasteTPD, 0);
    const totalRecycledTPD = filteredDistricts.reduce((sum, d) => sum + d.recyclingCapacityTPD, 0);
    const totalUnmanagedTPD = filteredDistricts.reduce((sum, d) => sum + d.unmanagedDisposalTPD, 0);
    const avgCollectionEfficiency = Math.round(
      filteredDistricts.reduce((sum, d) => sum + d.collectionEfficiencyPct, 0) / (totalDistricts || 1)
    );

    return NextResponse.json({
      success: true,
      metadata: {
        system: 'Kashmir EcoWatch · Plastic Pollution Monitoring Intelligence Database',
        module: 'Environmental Monitoring',
        coverage: '5 Western Himalayan Regions (42 Districts)',
        scientificStandard: 'Observed, Officially Reported, Modeled, and Unavailable Gaps Documented',
        zeroFabricationPolicy: 'Missing empirical data transparently flagged without synthetic substitution.',
        timestamp: new Date().toISOString(),
      },
      summary: {
        totalDistricts,
        totalPlasticTPD: Number(totalPlasticTPD.toFixed(1)),
        totalRecycledTPD: Number(totalRecycledTPD.toFixed(1)),
        totalUnmanagedTPD: Number(totalUnmanagedTPD.toFixed(1)),
        avgCollectionEfficiency,
      },
      regionalSummaries: REGIONAL_PLASTIC_SUMMARIES,
      historicalTrends: HISTORICAL_PLASTIC_TRENDS,
      facilities: RECYCLING_FACILITIES,
      districts: filteredDistricts,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve plastic pollution intelligence', details: err?.message },
      { status: 500 }
    );
  }
}
