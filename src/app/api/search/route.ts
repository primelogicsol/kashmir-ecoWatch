import { NextRequest, NextResponse } from 'next/server';
import { executeUniversalSearch } from '@/lib/search/engine';
import {
  KewSubregion,
  SearchDomain,
  SearchResultClass,
  TemporalClassification,
  TrustClassification,
} from '@/lib/search/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get('q') || '';
    const resultClass = (sp.get('resultClass') || 'all') as SearchResultClass | 'all';
    const domain = (sp.get('domain') || 'all') as SearchDomain | 'all';
    const subregion = (sp.get('subregion') || 'all') as KewSubregion | 'all' | 'Gilgit-Baltistan';
    const district = sp.get('district') || undefined;
    const watershed = sp.get('watershed') || undefined;
    const trustBadge = (sp.get('trustBadge') || 'all') as TrustClassification | 'all';
    const temporalNature = (sp.get('temporalNature') || 'all') as TemporalClassification | 'all';
    const verifiedOnly = sp.get('verifiedOnly') === 'true';
    const hasCoordinates = sp.get('hasCoordinates') === 'true';
    const dateFrom = sp.get('dateFrom') || undefined;
    const dateTo = sp.get('dateTo') || undefined;
    const nearLat = sp.get('nearLat') ? Number(sp.get('nearLat')) : undefined;
    const nearLng = sp.get('nearLng') ? Number(sp.get('nearLng')) : undefined;
    const radiusKm = sp.get('radiusKm') ? Number(sp.get('radiusKm')) : undefined;
    const sort = (sp.get('sort') || 'relevance') as 'relevance' | 'updated' | 'title_asc';
    const page = sp.get('page') ? Number(sp.get('page')) : 1;
    const limit = sp.get('limit') ? Number(sp.get('limit')) : 24;

    const result = await executeUniversalSearch({
      q,
      resultClass,
      domain,
      subregion,
      district,
      watershed,
      trustBadge,
      temporalNature,
      verifiedOnly,
      hasCoordinates,
      dateFrom,
      dateTo,
      nearLat,
      nearLng,
      radiusKm,
      sort,
      page,
      limit,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Search execution failed', detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}
