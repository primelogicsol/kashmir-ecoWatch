import { NextRequest, NextResponse } from 'next/server';
import {
  DISTRICT_CHINAR_CENSUS,
  CHINAR_BASIN_TOTALS,
  INDIVIDUAL_CHINAR_REGISTRY,
  HERITAGE_CHINAR_GROVES,
  CHINAR_THREAT_RECORDS,
  CHINAR_DATA_PROVIDERS,
  INSTITUTIONAL_CONTRIBUTORS,
  CHINAR_RESEARCH_LIBRARY
} from '@/data/chinar-monitoring';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const health = searchParams.get('health');
    const query = searchParams.get('q')?.toLowerCase();

    // Filter districts
    let filteredDistricts = DISTRICT_CHINAR_CENSUS;
    if (district) {
      filteredDistricts = filteredDistricts.filter(
        d => d.district.toLowerCase() === district.toLowerCase()
      );
    }

    // Filter individual trees
    let filteredTrees = INDIVIDUAL_CHINAR_REGISTRY;
    if (district) {
      filteredTrees = filteredTrees.filter(
        t => t.district.toLowerCase() === district.toLowerCase()
      );
    }
    if (health) {
      filteredTrees = filteredTrees.filter(
        t => t.healthStatus.toLowerCase() === health.toLowerCase()
      );
    }
    if (query) {
      filteredTrees = filteredTrees.filter(
        t =>
          t.commonName.toLowerCase().includes(query) ||
          t.treeAadhaarId.toLowerCase().includes(query) ||
          t.villageOrSite.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      metadata: {
        title: 'Kashmir EcoWatch - Chinar Monitoring Intelligence API (KEW-CMD)',
        scientificName: 'Platanus orientalis var. orientalis',
        vernacularNames: ['Chinar (Urdu/Persian)', 'Bōyñ (Kashmiri)', 'Oriental Plane'],
        legalStatute: 'J&K Preservation of Specific Trees Act 1969',
        lastUpdated: '2026-03-01',
        license: 'CC BY-NC 4.0 International',
        censusCustodian: 'J&K Forest Research Institute (JKFRI)',
        dataReadinessNotes: 'District aggregates reflect official 2026 reported census. Individual GPS records reflect verified field audits.'
      },
      basinTotals: CHINAR_BASIN_TOTALS,
      districts: filteredDistricts,
      individualTrees: filteredTrees,
      heritageGroves: HERITAGE_CHINAR_GROVES,
      threatRecords: CHINAR_THREAT_RECORDS,
      externalDataProviders: CHINAR_DATA_PROVIDERS,
      institutionalContributors: INSTITUTIONAL_CONTRIBUTORS,
      researchPapers: CHINAR_RESEARCH_LIBRARY
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
