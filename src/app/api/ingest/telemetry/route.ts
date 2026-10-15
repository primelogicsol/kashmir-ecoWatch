import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * LISDS Phase 2: Telemetry Ingestion Pipeline
 * Endpoint: POST /api/ingest/telemetry
 * Description: Ingests high-frequency soil moisture and precipitation time-series data.
 * Automates the calculation of the dynamic Hazard Index using weighted parameters.
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    if (!data.telemetry || !Array.isArray(data.telemetry)) {
      return NextResponse.json({ error: 'Invalid payload. "telemetry" array is required.' }, { status: 400 });
    }

    // 1. Ingest Raw Telemetry Data into observations_ts
    const observationsToInsert = data.telemetry.map((t: any) => ({
      spatial_entity_id: t.spatial_entity_id,
      source_id: t.source_id,
      observation_type: t.observation_type, // 'Rainfall_24h', 'Soil_Moisture_API'
      value: parseFloat(t.value),
      unit: t.unit,
      observed_at: new Date(t.observed_at || new Date().toISOString())
    }));

    if (observationsToInsert.length > 0) {
      await prisma.observations_ts.createMany({
        data: observationsToInsert,
        skipDuplicates: true
      });
    }

    // 2. Dynamic Hazard Index Calculation Engine
    const entityIds = [...new Set(observationsToInsert.map((o: any) => o.spatial_entity_id))];
    const newForecasts = [];

    for (const entityId of entityIds as string[]) {
      // In a fully live environment, we'd query hazard_zones for the baseline.
      // For now, we simulate the AHP baseline fetch for the entity
      const mockBaselineSusceptibility = 0.45; // e.g. AHP baseline (Terrain + Geology)
      
      const entityTelemetry = observationsToInsert.filter((o: any) => o.spatial_entity_id === entityId);
      
      // Calculate Hydrological Trigger Factor
      let hydrologyTriggerFactor = 0.0;
      
      const rainfallObs = entityTelemetry.find((o: any) => o.observation_type === 'Rainfall_24h');
      const soilMoistureObs = entityTelemetry.find((o: any) => o.observation_type === 'Soil_Moisture_API');

      if (rainfallObs) {
        if (rainfallObs.value > 100) hydrologyTriggerFactor += 0.35;
        else if (rainfallObs.value > 50) hydrologyTriggerFactor += 0.15;
      }
      
      if (soilMoistureObs) {
        if (soilMoistureObs.value > 0.4) hydrologyTriggerFactor += 0.20;
      }

      // Hazard = Susceptibility + Temporal Triggers (capped at 1.0)
      const dynamicHazardIndex = Math.min(1.0, mockBaselineSusceptibility + hydrologyTriggerFactor);

      // Determine confidence based on data freshness and source quality
      const confidence = (rainfallObs && soilMoistureObs) ? 0.92 : 0.75;

      newForecasts.push({
        spatial_entity_id: entityId,
        model_version: 'LISDS-AHP-v1.0',
        hazard_type: 'Landslide',
        forecast_value: dynamicHazardIndex,
        confidence_score: confidence,
        target_time: new Date(Date.now() + 24 * 3600 * 1000), // 24 hours into the future
        generated_at: new Date()
      });
    }

    // 3. Persist the generated forecasts
    if (newForecasts.length > 0) {
      await prisma.forecasts_ts.createMany({
        data: newForecasts,
        skipDuplicates: true
      });
    }

    return NextResponse.json({ 
      message: 'Telemetry successfully ingested. Hazard Index recalculated.', 
      records_ingested: observationsToInsert.length,
      forecasts_generated: newForecasts.length,
      sample_forecasts: newForecasts
    }, { status: 201 });

  } catch (error: any) {
    console.error('Ingestion Pipeline Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
