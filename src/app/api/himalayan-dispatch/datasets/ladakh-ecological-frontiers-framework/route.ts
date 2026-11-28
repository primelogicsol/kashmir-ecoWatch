import { NextRequest, NextResponse } from 'next/server';
import {
  buildLadakhFrontiersFrameworkCsv,
  buildLadakhFrontiersFrameworkJson,
} from '@/data/himalayan-dispatch-ladakh-frontiers-monograph';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get('format')?.toLowerCase() || 'json';

  if (format === 'csv') {
    const csv = buildLadakhFrontiersFrameworkCsv();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="ladakhs-ecological-frontiers-45-chapters.csv"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const payload = buildLadakhFrontiersFrameworkJson();
  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
