import { NextResponse } from 'next/server';
import { telemetryStore, ErrorSeverity, SystemModule, ErrorCategory } from '@/lib/error-telemetry';

export const dynamic = 'force-dynamic';

export type SimulationType = 'frontend_crash' | 'api_failure' | 'gis_layer_failure' | 'database_timeout';

interface SimulationPreset {
  title: string;
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  module: SystemModule;
  route: string;
  sanitizedStack: string;
  httpStatus: number;
  method: string;
}

const SIMULATION_PRESETS: Record<SimulationType, SimulationPreset> = {
  frontend_crash: {
    title: '[TEST] Frontend Rendering Exception',
    message: '[TEST CONTROL EVENT] Simulated uncaught React rendering error in <SpeciesMapRenderer>: Cannot read properties of undefined (reading "coordinates").',
    category: 'UNEXPECTED',
    severity: 'HIGH',
    module: 'Protected Areas',
    route: '/protected-network/atlas',
    sanitizedStack: `TypeError: Cannot read properties of undefined (reading 'coordinates')\n    at SpeciesMapRenderer (src/components/gis/SpeciesMapRenderer.tsx:42:15)\n    at renderWithHooks (react-dom.development.js:14985:18)\n    at updateFunctionComponent (react-dom.development.js:18942:20)`,
    httpStatus: 200,
    method: 'GET',
  },
  api_failure: {
    title: '[TEST] Upstream Telemetry API Gateway 504 Timeout',
    message: '[TEST CONTROL EVENT] Upstream hydrological telemetry socket timed out after 12000ms. Missing readings marked as UNAVAILABLE per safety directive.',
    category: 'MONITORING_INTERRUPTED',
    severity: 'HIGH',
    module: 'Hazard Intelligence',
    route: '/api/floods/live',
    sanitizedStack: `AxiosError: timeout of 12000ms exceeded\n    at createError (axios/lib/core/createError.js:16:15)\n    at settle (axios/lib/core/settle.js:17:10)\n    at IncomingMessage.handleStreamEnd (axios/lib/adapters/http.js:322:11)`,
    httpStatus: 504,
    method: 'GET',
  },
  gis_layer_failure: {
    title: '[TEST] GIS Vector Tile WebGL Shader Decode Failure',
    message: '[TEST CONTROL EVENT] Failed to decode protobuf vector tile on layer [kew-geological-faults-v2]: WebGLContextLost in high-relief mountain pass.',
    category: 'GIS_FAILURE',
    severity: 'MEDIUM',
    module: 'GIS & Mapping Engine',
    route: '/hazard-intelligence/avalanches',
    sanitizedStack: `Error: WebGL context lost while compiling raster tile shader [terrain-rgb-highres]\n    at MapEngine.initShaders (src/components/gis/MapEngine.ts:112:13)\n    at MapEngine.renderVectorLayer (src/components/gis/MapEngine.ts:245:19)`,
    httpStatus: 422,
    method: 'GET',
  },
  database_timeout: {
    title: '[TEST] Spatial Hypertable Connection Pool Exhaustion',
    message: '[TEST CONTROL EVENT] connect ETIMEDOUT 127.0.0.1:5432 - PostGIS spatial entities pool timeout. Automated NOC dispatch triggered.',
    category: 'DATABASE_ERROR',
    severity: 'CRITICAL',
    module: 'Database & Storage',
    route: '/api/health/db',
    sanitizedStack: `ConnectionTimeoutError: ResourceRequest timed out after 10000ms\n    at Pool._acquire (generic-pool.js:283:17)\n    at DatabaseSpatialClient.query (src/lib/db.ts:89:12)\n    at SpatialEntitiesHandler (src/app/api/health/db/route.ts:34:21)`,
    httpStatus: 500,
    method: 'POST',
  },
};

/**
 * Development & Staging "Generate Test Error" Control
 * Strictly prohibited from destructive failure simulation in production.
 */
export async function POST(request: Request) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== 'KEW-Admin-2026!') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Administrator authentication key required.' },
        { status: 401 }
      );
    }

    // Safety check: restricted in production
    if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_STAGING_TEST_ERRORS) {
      return NextResponse.json(
        {
          success: false,
          error: 'Test error generation is permanently disabled in production environments for safety.',
        },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const simType = (body.simulationType as SimulationType) || 'api_failure';
    const preset = SIMULATION_PRESETS[simType] || SIMULATION_PRESETS.api_failure;

    // Record through official telemetry pipeline with fresh test fingerprint
    const testTag = Date.now().toString(36).slice(-4).toUpperCase();
    const incident = telemetryStore.recordIncident({
      title: body.title || `${preset.title} #${testTag}`,
      message: body.message || preset.message,
      category: body.category || preset.category,
      severity: body.severity || preset.severity,
      route: body.route || preset.route,
      module: body.module || preset.module,
      sanitizedStack: body.sanitizedStack || preset.sanitizedStack,
      isTest: true,
      httpStatus: preset.httpStatus,
      method: preset.method,
    });

    return NextResponse.json(
      {
        success: true,
        simulationType: simType,
        message: `Controlled test incident [${simType}] recorded and broadcast to live monitor.`,
        incident,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate test error', details: err?.message },
      { status: 500 }
    );
  }
}
