import { NextRequest } from 'next/server';
import { telemetryStore, ErrorIncidentRecord } from '@/lib/error-telemetry';
import { verifyAdminRequest } from '@/lib/seo/admin-session';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Server-Sent Events (SSE) Live Telemetry Stream
 * Pushes live incoming incident records to connected administrator dashboards.
 * Includes automatic periodic heartbeat keep-alives every 15 seconds.
 */
export async function GET(request: NextRequest) {
  const authCheck = await verifyAdminRequest(request);
  if (!authCheck.authorized) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized: Active administrator session required.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // 1. Send initial connection confirmation
      const initialPayload = JSON.stringify({
        type: 'CONNECTED',
        provider: 'Prime Logic Solutions USA (https://primelogicsol.com/)',
        timestamp: new Date().toISOString(),
      });
      controller.enqueue(encoder.encode(`data: ${initialPayload}\n\n`));

      // 2. Subscribe to telemetry store broadcasts
      const unsubscribe = telemetryStore.subscribe((incident: ErrorIncidentRecord) => {
        try {
          const payload = JSON.stringify({
            type: 'INCIDENT_RECORDED',
            incident,
          });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        } catch (err) {
          console.error('[Prime Logic Solutions] Error sending SSE payload:', err);
        }
      });

      // 3. Heartbeat timer (every 15s)
      const heartbeatInterval = setInterval(() => {
        try {
          telemetryStore.updateHeartbeat();
          const heartbeatPayload = JSON.stringify({
            type: 'HEARTBEAT',
            health: telemetryStore.getHealth(),
            timestamp: new Date().toISOString(),
          });
          controller.enqueue(encoder.encode(`data: ${heartbeatPayload}\n\n`));
        } catch (err) {
          clearInterval(heartbeatInterval);
        }
      }, 15000);

      // 4. Clean up on stream termination
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        clearInterval(heartbeatInterval);
        try {
          controller.close();
        } catch (_) {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
