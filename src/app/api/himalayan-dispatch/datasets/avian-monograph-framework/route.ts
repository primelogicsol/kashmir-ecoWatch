import { NextRequest, NextResponse } from 'next/server';
import {
  buildAvianMonographCsv,
  buildAvianMonographDatasetPayload,
} from '@/data/himalayan-dispatch-sky-has-no-borders-monograph';

export async function GET(req: NextRequest) {
  const format = (req.nextUrl.searchParams.get('format') || 'json').toLowerCase();

  if (format === 'csv') {
    const csv = buildAvianMonographCsv();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="kew-hd-monograph-04-avian-framework.csv"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.json(buildAvianMonographDatasetPayload(), {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
