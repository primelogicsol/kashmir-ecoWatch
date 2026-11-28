import { NextRequest, NextResponse } from 'next/server';
import {
  buildSalimAliMonographCsv,
  buildSalimAliMonographDatasetPayload,
} from '@/data/himalayan-dispatch-salim-ali-park-monograph';

export async function GET(req: NextRequest) {
  const format = (req.nextUrl.searchParams.get('format') || 'json').toLowerCase();

  if (format === 'csv') {
    const csv = buildSalimAliMonographCsv();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="kew-hd-monograph-09-salim-ali-park-framework.csv"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.json(buildSalimAliMonographDatasetPayload(), {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
