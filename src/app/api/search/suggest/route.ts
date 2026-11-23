import { NextRequest, NextResponse } from 'next/server';
import { executeInstantSuggest } from '@/lib/search/engine';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get('q') || '';
    const maxPerGroup = Number(req.nextUrl.searchParams.get('limit') || '4');
    if (q.trim().length < 2) {
      return NextResponse.json({
        query: q,
        totalHits: 0,
        latencyMs: 0,
        groups: [],
      });
    }
    const payload = await executeInstantSuggest(q, Math.min(8, Math.max(2, maxPerGroup)));
    return NextResponse.json(payload, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Suggest failed', detail: err?.message || String(err), groups: [] },
      { status: 500 }
    );
  }
}
