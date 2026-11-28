import { NextRequest, NextResponse } from 'next/server';
import {
  buildEncroachmentMonographCsv,
  buildEncroachmentMonographDatasetPayload,
} from '@/data/himalayan-dispatch-art-of-encroachment-monograph';

export async function GET(req: NextRequest) {
  const format = (req.nextUrl.searchParams.get('format') || 'json').toLowerCase();

  if (format === 'csv') {
    const csv = buildEncroachmentMonographCsv();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="kew-hd-monograph-11-dal-encroachment-framework.csv"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.json(buildEncroachmentMonographDatasetPayload(), {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
