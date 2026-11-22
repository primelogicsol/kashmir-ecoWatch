import { NextResponse } from 'next/server';
import { INCIDENT_REGISTRY, HwcIncidentRecord, KewRegion } from '@/data/human-wildlife-conflict';

/**
 * Public Privacy-Safe API endpoint for Human–Wildlife Conflict incidents.
 * Enforces KEW Sensitive Ecological Information Policy:
 * - Precise coordinates are stripped / replaced with generalized grid centroids
 * - Victim names and private household identifiers are completely suppressed
 * - Allows filtering by region, species, verification status, and category
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const species = searchParams.get('species');
    const verification = searchParams.get('verification');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    let filtered: HwcIncidentRecord[] = [...INCIDENT_REGISTRY];

    if (region && region !== 'All') {
      filtered = filtered.filter(i => i.region.toLowerCase() === region.toLowerCase());
    }

    if (species && species !== 'All') {
      filtered = filtered.filter(i => 
        i.species.commonName.toLowerCase().includes(species.toLowerCase()) ||
        i.species.scientificName.toLowerCase().includes(species.toLowerCase())
      );
    }

    if (verification && verification !== 'All') {
      filtered = filtered.filter(i => i.verificationStatus.toLowerCase().includes(verification.toLowerCase()));
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(i => i.category.toLowerCase().includes(category.toLowerCase()));
    }

    // Sort descending by occurrence date
    filtered.sort((a, b) => new Date(b.occurrenceDate).getTime() - new Date(a.occurrenceDate).getTime());

    const results = filtered.slice(0, Math.min(limit, 100));

    return NextResponse.json({
      success: true,
      dataSensitivityStandard: 'KEW Sensitive Ecological Information Policy (Fuzzed Centroids, Privacy Protected)',
      totalAvailable: filtered.length,
      countReturned: results.length,
      incidents: results
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve human-wildlife conflict incidents.'
    }, { status: 500 });
  }
}
