import { NextResponse } from 'next/server';
import { telemetryStore, IncidentStatus } from '@/lib/error-telemetry';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== 'KEW-Admin-2026!') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Administrator authentication key required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const moduleFilter = searchParams.get('module') || 'ALL';
    const severity = searchParams.get('severity') || 'ALL';
    const status = searchParams.get('status') || 'ALL';
    const environment = searchParams.get('environment') || 'ALL';
    const search = searchParams.get('search') || '';

    const incidents = telemetryStore.getIncidents({
      module: moduleFilter,
      severity,
      status,
      environment,
      search,
    });

    const health = telemetryStore.getHealth();

    // Calculate aggregated metrics
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const todayIncidents = incidents.filter(
      (i) => new Date(i.lastSeen).getTime() >= startOfToday
    );

    const totalErrorsToday = todayIncidents.reduce((sum, i) => sum + i.occurrenceCount, 0);
    const newIncidentsCount = incidents.filter((i) => i.status === 'NEW').length;
    const criticalCount = incidents.filter((i) => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length;

    const affectedModulesSet = new Set(incidents.filter((i) => i.status !== 'RESOLVED').map((i) => i.module));
    const affectedModulesCount = affectedModulesSet.size;

    // Calculate Hourly Error Rates (Last 24 hours)
    const hourlyDistribution: { hour: string; count: number }[] = [];
    for (let i = 23; i >= 0; i--) {
      const hDate = new Date(now.getTime() - i * 3600000);
      const hourLabel = `${hDate.getHours().toString().padStart(2, '0')}:00`;
      const hStart = new Date(hDate.getFullYear(), hDate.getMonth(), hDate.getDate(), hDate.getHours()).getTime();
      const hEnd = hStart + 3600000;

      const count = incidents.reduce((acc, inc) => {
        const incTime = new Date(inc.lastSeen).getTime();
        return incTime >= hStart && incTime < hEnd ? acc + inc.occurrenceCount : acc;
      }, 0);

      hourlyDistribution.push({ hour: hourLabel, count });
    }

    // Top Failing Routes
    const routeCounts: Record<string, number> = {};
    for (const inc of incidents) {
      routeCounts[inc.route] = (routeCounts[inc.route] || 0) + inc.occurrenceCount;
    }
    const topRoutes = Object.entries(routeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([route, count]) => ({ route, count }));

    const lastDetected = incidents[0] ? incidents[0].lastSeen : null;

    return NextResponse.json({
      success: true,
      provider: {
        name: 'Prime Logic Solutions USA',
        url: 'https://primelogicsol.com/',
        system: 'Universal Technical Error Monitoring Platform',
      },
      health,
      metrics: {
        totalErrorsToday,
        newIncidentsCount,
        criticalCount,
        affectedModulesCount,
        lastDetected,
        hourlyDistribution,
        topRoutes,
      },
      totalCount: incidents.length,
      incidents,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve telemetry data',
        details: err?.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== 'KEW-Admin-2026!') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Administrator authentication key required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, resolutionNotes, resolvedBy } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: id, status' },
        { status: 400 }
      );
    }

    const updated = telemetryStore.updateIncidentStatus(
      id,
      status as IncidentStatus,
      resolutionNotes,
      resolvedBy
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Incident record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      incident: updated,
      message: `Incident ${id} status transitioned to ${status}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to update incident', details: err?.message },
      { status: 500 }
    );
  }
}
