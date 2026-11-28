import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyCronOrIngestRequest } from '@/lib/seo/admin-session';

const ALLOWED_OBSERVATION_TYPES = new Set(['Rainfall_24h', 'Soil_Moisture_API']);

/**
 * LISDS Phase 2: Authenticated Telemetry Ingestion Pipeline
 * Endpoint: POST /api/ingest/telemetry
 * Security: Requires INGEST_API_KEY / CRON_SECRET Bearer token or verified Admin session.
 * Provenance Note: Generates heuristic trigger screening indices (LISDS-Heuristic-Screening-v1.1),
 * NOT calibrated physical factor-of-safety or site-surveyed Saaty AHP outputs unless hazard_zones susceptibility exists.
 */
export async function POST(req: NextRequest) {
  try {
    const authCheck = await verifyCronOrIngestRequest(req);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid INGEST_API_KEY / CRON_SECRET or administrator session required.' },
        { status: 401 }
      );
    }

    const data = await req.json();

    if (!data.telemetry || !Array.isArray(data.telemetry) || data.telemetry.length === 0) {
      return NextResponse.json({ error: 'Invalid payload. Non-empty "telemetry" array is required.' }, { status: 400 });
    }
    if (data.telemetry.length > 200) {
      return NextResponse.json({ error: 'Payload exceeds maximum batch size of 200 observations.' }, { status: 413 });
    }

    const observationsToInsert: Array<{
      spatial_entity_id: string;
      source_id: string;
      observation_type: string;
      value: number;
      unit: string;
      observed_at: Date;
    }> = [];

    for (const t of data.telemetry) {
      const entityId = typeof t?.spatial_entity_id === 'string' ? t.spatial_entity_id.trim().slice(0, 80) : '';
      const sourceId = typeof t?.source_id === 'string' ? t.source_id.trim().slice(0, 80) : '';
      const obsType = typeof t?.observation_type === 'string' ? t.observation_type.trim() : '';
      const val = Number(t?.value);
      const unit = typeof t?.unit === 'string' ? t.unit.trim().slice(0, 24) : '';
      const obsDate = t?.observed_at ? new Date(t.observed_at) : new Date();

      if (!entityId || !sourceId || !ALLOWED_OBSERVATION_TYPES.has(obsType) || !Number.isFinite(val) || Number.isNaN(obsDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid telemetry item: spatial_entity_id, source_id, valid observation_type, finite numeric value, and valid timestamp are required.' },
          { status: 400 }
        );
      }
      if (obsType === 'Rainfall_24h' && (val < 0 || val > 1500)) {
        return NextResponse.json({ error: 'Rainfall_24h value out of physical bounds [0, 1500] mm.' }, { status: 400 });
      }
      if (obsType === 'Soil_Moisture_API' && (val < 0 || val > 1)) {
        return NextResponse.json({ error: 'Soil_Moisture_API value out of volumetric bounds [0, 1] m3/m3.' }, { status: 400 });
      }

      observationsToInsert.push({
        spatial_entity_id: entityId,
        source_id: sourceId,
        observation_type: obsType,
        value: val,
        unit: unit || (obsType === 'Rainfall_24h' ? 'mm' : 'm3/m3'),
        observed_at: obsDate,
      });
    }

    await prisma.observations_ts.createMany({
      data: observationsToInsert,
      skipDuplicates: true,
    });

    const entityIds = [...new Set(observationsToInsert.map((o) => o.spatial_entity_id))];
    const existingZones = await prisma.hazard_zones
      .findMany({
        where: { spatial_entity_id: { in: entityIds } },
        select: { spatial_entity_id: true, baseline_susceptibility: true },
      })
      .catch(() => [] as Array<{ spatial_entity_id: string; baseline_susceptibility: number }>);

    const suscByEntity = new Map<string, number>();
    for (const z of existingZones) {
      const num = Number(z.baseline_susceptibility);
      if (Number.isFinite(num) && num >= 0 && num <= 1) {
        suscByEntity.set(z.spatial_entity_id, num);
      }
    }

    const newForecasts = [];

    for (const entityId of entityIds) {
      // Default uncalibrated terrain prior is 0.20 (allowing 'low' < 0.45 when dry) unless DB susceptibility_index exists
      const baselineSusceptibility = suscByEntity.get(entityId) ?? 0.20;
      const hasCalibratedZone = suscByEntity.has(entityId);
      const entityTelemetry = observationsToInsert.filter((o) => o.spatial_entity_id === entityId);

      let hydrologyTriggerFactor = 0.0;
      const rainfallObs = entityTelemetry.find((o) => o.observation_type === 'Rainfall_24h');
      const soilMoistureObs = entityTelemetry.find((o) => o.observation_type === 'Soil_Moisture_API');

      if (rainfallObs) {
        if (rainfallObs.value > 100) hydrologyTriggerFactor += 0.45;
        else if (rainfallObs.value > 50) hydrologyTriggerFactor += 0.25;
        else if (rainfallObs.value > 20) hydrologyTriggerFactor += 0.10;
      }

      if (soilMoistureObs) {
        if (soilMoistureObs.value > 0.4) hydrologyTriggerFactor += 0.25;
        else if (soilMoistureObs.value > 0.3) hydrologyTriggerFactor += 0.10;
      }

      const dynamicHazardIndex = Math.min(0.99, baselineSusceptibility + hydrologyTriggerFactor);
      const confidence = hasCalibratedZone
        ? rainfallObs && soilMoistureObs
          ? 0.78
          : 0.60
        : 0.45;

      newForecasts.push({
        spatial_entity_id: entityId,
        model_version: hasCalibratedZone ? 'LISDS-ZonePrior-v1.1' : 'LISDS-Heuristic-Screening-v1.1',
        hazard_type: 'Landslide',
        forecast_value: dynamicHazardIndex,
        confidence_score: confidence,
        target_time: new Date(Date.now() + 24 * 3600 * 1000),
        generated_at: new Date(),
      });
    }

    if (newForecasts.length > 0) {
      await prisma.forecasts_ts.createMany({
        data: newForecasts,
        skipDuplicates: true,
      });
    }

    return NextResponse.json(
      {
        message: 'Authenticated telemetry ingested and heuristic hazard screening index updated.',
        provenanceClass: 'NWP / Telemetry Heuristic Screening Model',
        records_ingested: observationsToInsert.length,
        forecasts_generated: newForecasts.length,
        sample_forecasts: newForecasts,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Ingestion Pipeline Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
