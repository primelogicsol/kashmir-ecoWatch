import { NextResponse } from 'next/server';
import { telemetryStore, ErrorSeverity, SystemModule } from '@/lib/error-telemetry';

export const dynamic = 'force-dynamic';

/**
 * Universal Technical Error Ingestion Endpoint
 * Captures frontend exceptions, API failures, database errors, and GIS interruptions.
 * Redacts credentials, tokens, and precise coordinates before persistence.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      message,
      category,
      severity,
      route,
      module,
      environment,
      sanitizedStack,
      correlationId,
      httpStatus,
      method,
      isTest,
    } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: message' },
        { status: 400 }
      );
    }

    // Distinguish expected 401/403/404 from genuine failures unless explicitly flagged
    if (httpStatus === 401 || httpStatus === 403 || httpStatus === 404) {
      if (!body.forceLog) {
        return NextResponse.json({
          success: true,
          notice: 'Expected client response (401/403/404) suppressed from technical error telemetry',
          logged: false,
        });
      }
    }

    const incident = telemetryStore.recordIncident({
      title: title || message.substring(0, 80),
      message,
      category,
      severity: severity as ErrorSeverity,
      route,
      module: module as SystemModule,
      environment,
      sanitizedStack,
      correlationId,
      httpStatus,
      method,
      isTest: !!isTest,
    });

    return NextResponse.json({
      success: true,
      referenceCode: incident.id,
      fingerprint: incident.fingerprint,
      occurrenceCount: incident.occurrenceCount,
      status: incident.status,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to ingest telemetry event', details: err?.message },
      { status: 500 }
    );
  }
}
