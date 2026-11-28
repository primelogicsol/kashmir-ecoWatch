import { NextRequest, NextResponse } from 'next/server';
import {
  executeFederatedSuggest,
  SearchScopeMode,
} from '@/lib/search/federated-knowledge-search';

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
    const limit = Math.min(10, Math.max(3, Number(sp.get('limit') || '6')));

    if (q.trim().length < 2) {
      return NextResponse.json({
        query: q,
        scope,
        totalHits: 0,
        dispatchCount: 0,
        kewCount: 0,
        latencyMs: 0,
        suggestions: [],
      });
    }

    const payload = await executeFederatedSuggest(q, scope, limit);
    return NextResponse.json(payload, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Federated suggest failed', detail: err?.message || String(err), suggestions: [] },
      { status: 500 }
    );
  }
}
