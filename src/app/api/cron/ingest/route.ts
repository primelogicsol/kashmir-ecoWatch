import { NextRequest, NextResponse } from 'next/server';
import { verifyCronOrIngestRequest } from '@/lib/seo/admin-session';

export const runtime = 'nodejs';

/**
 * LISDS Phase 2: Authenticated Cron Job for Gridded NWP Weather & Soil Moisture Ingestion
 * Scientific Integrity Policy: Zero random/synthetic measurements permitted.
 * Queries real Open-Meteo gridded NWP model outputs (~9-11 km resolution) and explicitly
 * labels provenance as 'Gridded Reanalysis / NWP Model Output' (never physical ground station truth).
 */
export async function GET(request: NextRequest) {
  const authCheck = await verifyCronOrIngestRequest(request);
  if (!authCheck.authorized) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Valid CRON_SECRET / INGEST_API_KEY Bearer token or Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const targetZones = [
      { id: 'zone-001', name: 'NH44 Ramban Sector', lat: 33.24, lon: 75.19 },
      { id: 'zone-002', name: 'Banihal Pass Approach', lat: 33.43, lon: 75.19 },
    ];

    const telemetryPayload: Array<{
      spatial_entity_id: string;
      source_id: string;
      provenance_class: string;
      observation_type: string;
      value: number;
      unit: string;
      observed_at: string;
    }> = [];

    for (const zone of targetZones) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${zone.lat}&longitude=${zone.lon}&daily=precipitation_sum&hourly=soil_moisture_0_to_7cm&past_days=1&forecast_days=1&timezone=UTC`;

      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
        cache: 'no-store',
      }).finally(() => clearTimeout(timer));

      if (!res.ok) {
        continue;
      }

      const json = await res.json();
      const dailyPrecip: Array<number | null> = json?.daily?.precipitation_sum || [];
      const latestPrecip = dailyPrecip.length > 0 ? dailyPrecip[dailyPrecip.length - 1] : null;
      const hourlySm: Array<number | null> = json?.hourly?.soil_moisture_0_to_7cm || [];
      const validSm = hourlySm.filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
      const latestSm = validSm.length > 0 ? validSm[validSm.length - 1] : null;
      const observedAt = new Date().toISOString();

      if (typeof latestPrecip === 'number' && Number.isFinite(latestPrecip)) {
        telemetryPayload.push({
          spatial_entity_id: zone.id,
          source_id: 'Open-Meteo-Gridded-NWP-9km',
          provenance_class: 'Gridded Reanalysis / NWP Model Output',
          observation_type: 'Rainfall_24h',
          value: Number(latestPrecip.toFixed(2)),
          unit: 'mm',
          observed_at: observedAt,
        });
      }

      if (typeof latestSm === 'number' && Number.isFinite(latestSm)) {
        telemetryPayload.push({
          spatial_entity_id: zone.id,
          source_id: 'Open-Meteo-Gridded-NWP-9km',
          provenance_class: 'Gridded Reanalysis / NWP Model Output',
          observation_type: 'Soil_Moisture_API',
          value: Number(latestSm.toFixed(4)),
          unit: 'm3/m3',
          observed_at: observedAt,
        });
      }
    }

    if (telemetryPayload.length === 0) {
      return NextResponse.json(
        {
          success: false,
          status: 'EXTERNAL_SOURCE_UNAVAILABLE',
          message: 'External Open-Meteo NWP source temporarily unavailable; zero synthetic fallback values generated.',
          zones_processed: 0,
          records_retrieved: 0,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      provenanceClass: 'Gridded Reanalysis / NWP Model Output (~9-11 km)',
      groundTruthSensorClaim: false,
      message: 'Verified Open-Meteo gridded NWP model parameters retrieved.',
      zones_processed: targetZones.length,
      records_retrieved: telemetryPayload.length,
      telemetry: telemetryPayload,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 'EXTERNAL_SOURCE_UNAVAILABLE',
        error: 'Upstream NWP telemetry fetch interrupted; zero synthetic values generated.',
      },
      { status: 503 }
    );
  }
}
