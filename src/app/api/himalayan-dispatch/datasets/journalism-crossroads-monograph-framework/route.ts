import { NextRequest, NextResponse } from 'next/server';
import {
  buildJournalismCrossroadsFrameworkCsv,
  buildJournalismCrossroadsFrameworkJson,
} from '@/data/himalayan-dispatch-journalism-crossroads-monograph';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get('format')?.toLowerCase() || 'json';

  if (format === 'csv') {
    const csv = buildJournalismCrossroadsFrameworkCsv();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="monograph-15-journalism-at-a-crossroads-90-chapters.csv"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const payload = buildJournalismCrossroadsFrameworkJson();
  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
