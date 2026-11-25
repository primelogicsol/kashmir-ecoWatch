import { NextRequest, NextResponse } from 'next/server';
import {
  getAllReportAnalytics,
  recordReportAnalyticsEvent,
  ReportAnalyticsEventType,
} from '@/lib/sectoral-research-store';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const all = getAllReportAnalytics();
  if (code) {
    return NextResponse.json({
      success: true,
      code: code.toUpperCase(),
      counters: all[code.toUpperCase()] || null,
    });
  }
  return NextResponse.json({ success: true, analytics: all });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, eventType, metaKey } = body as {
      code?: string;
      eventType?: ReportAnalyticsEventType;
      metaKey?: string;
    };
    if (!code || !eventType) {
      return NextResponse.json(
        { success: false, error: 'Both code and eventType are required.' },
        { status: 400 }
      );
    }
    const counters = recordReportAnalyticsEvent(code, eventType, metaKey);
    return NextResponse.json({ success: true, counters });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Analytics error' },
      { status: 500 }
    );
  }
}
