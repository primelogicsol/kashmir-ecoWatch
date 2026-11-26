import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import { runAniePipelineCycle } from '@/lib/hd-anie/worker';

/**
 * Server-side cron & standalone worker trigger endpoint for HD-ANIE.
 * Protected by CRON_SECRET / ADMIN_API_KEY / Admin session in production;
 * permits local loopback worker invocation when CRON_SECRET is unset in local dev.
 */
async function handleCronInvocation(request: NextRequest, forceAllSources = false) {
  const adminCheck = await verifyAdminRequest(request);
  const cronSecret = process.env.CRON_SECRET;
  const host = request.headers.get('host') || '';
  const isLocalDevWithoutSecret =
    !cronSecret &&
    process.env.NODE_ENV !== 'production' &&
    (host.startsWith('localhost:') || host.startsWith('127.0.0.1:'));

  if (!adminCheck.authorized && !isLocalDevWithoutSecret) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized cron trigger.' },
      { status: 401 }
    );
  }

  const result = await runAniePipelineCycle({
    forceAllSources,
    maxNewDraftsPerCycle: 8,
    triggeredBy: adminCheck.authorized ? adminCheck.actor : 'HD-ANIE Local Worker Daemon',
  });

  return NextResponse.json({
    success: true,
    executedAt: new Date().toISOString(),
    ...result,
  });
}

export async function GET(request: NextRequest) {
  return handleCronInvocation(request, false);
}

export async function POST(request: NextRequest) {
  let forceAll = false;
  try {
    const body = await request.json();
    forceAll = Boolean(body?.forceAllSources);
  } catch {
    // empty body ok
  }
  return handleCronInvocation(request, forceAll);
}
