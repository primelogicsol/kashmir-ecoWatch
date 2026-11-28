import { NextRequest, NextResponse } from 'next/server';
import {
  buildAtmosphereMonographCsv,
  buildAtmosphereMonographDatasetPayload,
} from '@/data/himalayan-dispatch-monograph-01-atmosphere';

export async function GET(req: NextRequest) {
  const format = (req.nextUrl.searchParams.get('format') || 'json').toLowerCase();

  if (format === 'csv') {
    const csv = buildAtmosphereMonographCsv();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="kew-hd-monograph-01-atmosphere-framework.csv"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.json(buildAtmosphereMonographDatasetPayload(), {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
