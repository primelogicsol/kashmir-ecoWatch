import { NextRequest, NextResponse } from 'next/server';
import {
  executeFederatedKnowledgeSearch,
  SearchScopeMode,
} from '@/lib/search/federated-knowledge-search';
import type { UnifiedKnowledgeCategory } from '@/lib/search/himalayan-dispatch-index';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get('q') || '';
    const rawScope = sp.get('scope') || 'both';
    const scope: SearchScopeMode =
      rawScope === 'himalayan_dispatch' || rawScope === 'kashmir_ecowatch' || rawScope === 'both'
        ? rawScope
        : 'both';
    const category = (sp.get('category') || 'all') as UnifiedKnowledgeCategory | 'all';
    const region = sp.get('region') || 'all';
    const author = sp.get('author') || 'all';
    const dateWindow = sp.get('dateWindow') || 'all';
    const dateFrom = sp.get('dateFrom') || undefined;
    const dateTo = sp.get('dateTo') || undefined;
    const datasetsAndRegistriesOnly = sp.get('datasetsOnly') === 'true';
    const includeLiveDatasets = sp.get('includeLiveDatasets') !== 'false';
    const sort = (sp.get('sort') || 'relevance') as 'relevance' | 'newest' | 'title_asc';
    const page = sp.get('page') ? Number(sp.get('page')) : 1;
    const limit = sp.get('limit') ? Number(sp.get('limit')) : 20;

    const payload = await executeFederatedKnowledgeSearch({
      q,
      scope,
      category,
      region,
      author,
      dateWindow,
      dateFrom,
      dateTo,
      datasetsAndRegistriesOnly,
      includeLiveDatasets,
      sort,
      page,
      limit,
    });

    return NextResponse.json(payload, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Federated search execution failed', detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}
