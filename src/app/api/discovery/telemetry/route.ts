import { NextRequest, NextResponse } from 'next/server';
import { recordDiscoveryEvent } from '@/lib/seo/discovery-store';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const pathname = typeof body.pathname === 'string' ? body.pathname : '/';
    const referrerUrl = typeof body.referrer === 'string' ? body.referrer : '';
    const utmSource = typeof body.utmSource === 'string' ? body.utmSource : null;
    const utmMedium = typeof body.utmMedium === 'string' ? body.utmMedium : null;
    const utmCampaign = typeof body.utmCampaign === 'string' ? body.utmCampaign : null;

    if (!referrerUrl && !utmSource) {
      return NextResponse.json({ recorded: false, reason: 'direct_navigation' });
    }

    const countryCode =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      null;

    const record = await recordDiscoveryEvent({
      pathname,
      referrerUrl,
      countryCode,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    return NextResponse.json({ recorded: true, channelCategory: record.channelCategory });
  } catch (err: any) {
    return NextResponse.json({ recorded: false, error: err?.message || 'telemetry_error' }, { status: 200 });
  }
}
