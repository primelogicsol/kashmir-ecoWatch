import { NextResponse } from 'next/server';
import {
  landslideData,
  roadCorridorsData,
  officialBulletinsData,
  getInitialLandslideSnapshot,
  LandslideRecord,
  NowcastHazardLevel,
} from '@/data/hazard-landslides';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Real-time delivery, zero stale cache

export async function GET() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  try {
    // Collect coordinates from all 35 monitored landslide zones
    const lats = landslideData.map(r => r.latitude.toFixed(4)).join(',');
    const lons = landslideData.map(r => r.longitude.toFixed(4)).join(',');

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=soil_moisture_0_to_7cm,precipitation&daily=precipitation_sum&timezone=auto&past_days=3&forecast_days=1`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);

    const weatherRes = await fetch(weatherUrl, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo returned status ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const results = Array.isArray(weatherData) ? weatherData : [weatherData];

    // Compute Open-Meteo Gridded NWP rainfall + site susceptibility screening heuristic
    const enhancedRecords: Array<LandslideRecord & { telemetryStatus?: string }> = landslideData.map((record, index) => {
      const locData = results[index];
      if (!locData || !locData.current || !locData.daily) {
        return {
          ...record,
          live_risk_level: 'Low',
          dominant_trigger: 'Telemetry Unavailable — Static Susceptibility Baseline Only',
          last_updated: 'Telemetry Unavailable',
          telemetryStatus: 'UNAVAILABLE',
        };
      }

      const soilMoisture = Number((locData.current.soil_moisture_0_to_7cm ?? 0.30).toFixed(3));
      const dailyPrecip: number[] = locData.daily.precipitation_sum ?? [];
      const precip24h = Number((dailyPrecip.length > 0 ? dailyPrecip[dailyPrecip.length - 1] : 0).toFixed(1));
      const precip72h = Number((dailyPrecip.slice(-3).reduce((acc, v) => acc + (v || 0), 0)).toFixed(1));

      // Combine coarse NWP precipitation/moisture with site geological susceptibility_class
      const susceptibility = String(
        (record as unknown as { susceptibility_class?: string }).susceptibility_class || record.risk_level || 'Moderate'
      );
      const isHighSusceptibility =
        susceptibility === 'Very High' || susceptibility === 'Critical' || susceptibility === 'High';
      const isLowSusceptibility = susceptibility === 'Low';

      let nowcastLevel: NowcastHazardLevel = 'Low';
      let triggerDesc = 'Baseline Conditions (Below Screening Threshold)';

      const highRainThreshold72h = isHighSusceptibility ? 28 : isLowSusceptibility ? 50 : 38;
      const highRainThreshold24h = isHighSusceptibility ? 18 : isLowSusceptibility ? 35 : 25;
      const modRainThreshold72h = isHighSusceptibility ? 12 : isLowSusceptibility ? 25 : 16;
      const modRainThreshold24h = isHighSusceptibility ? 8 : isLowSusceptibility ? 16 : 10;

      const isHighSaturation = soilMoisture > (isHighSusceptibility ? 0.36 : 0.40);
      const isExtremePrecip = precip72h > highRainThreshold72h || precip24h > highRainThreshold24h;
      const isModeratePrecip = precip72h > modRainThreshold72h || precip24h > modRainThreshold24h;

      if ((isHighSaturation && isExtremePrecip) || (isHighSusceptibility && precip72h > 45)) {
        nowcastLevel = 'High';
        triggerDesc = `NWP Screening: Heavy Rain + Saturated Soil (${susceptibility} Susceptibility Slope)`;
      } else if (isModeratePrecip || (isHighSaturation && precip72h > 5 && !isLowSusceptibility)) {
        nowcastLevel = 'Moderate';
        triggerDesc = isModeratePrecip
          ? `NWP Screening: Moderate 72h Rainfall (${susceptibility} Susceptibility)`
          : 'NWP Screening: Elevated Subsurface Moisture + Recent Rain';
      } else {
        nowcastLevel = 'Low';
        triggerDesc = 'NWP Screening: Below Rainfall Trigger Threshold';
      }

      return {
        ...record,
        live_soil_moisture: soilMoisture,
        live_precipitation_24h: precip24h,
        live_precipitation_72h: precip72h,
        live_risk_level: nowcastLevel,
        dominant_trigger: triggerDesc,
        last_updated: `Open-Meteo NWP Grid (${timeStr})`,
        telemetryStatus: 'MODEL_SCREENING',
      };
    });

    // Life-Safety Corridors: Keep operational status decoupled from weather nowcasts
    const liveCorridors = roadCorridorsData.map(corridor => {
      // Find matching landslide zones along this highway for environmental susceptibility monitoring
      const corridorZones = enhancedRecords.filter(r => r.road_affected.includes(corridor.highwayCode.split(' ')[0]));
      const hasHighNowcast = corridorZones.some(z => z.live_risk_level === 'High');

      return {
        ...corridor,
        lastUpdated: `NWP Screening (${timeStr})`,
        environmentalSusceptibilityNotice: hasHighNowcast
          ? 'Elevated modeled rainfall & soil moisture indicated along watershed slopes (Open-Meteo ~9 km grid). Commuters should verify official BRO / Traffic Police advisories.'
          : 'Normal modeled antecedent moisture. High-altitude pass freeze-thaw and localized geological factors apply.',
      };
    });

    const highNowcastCount = enhancedRecords.filter(r => r.live_risk_level === 'High').length;
    const activeOfficialBulletins = officialBulletinsData.filter(b => b.warningLevel === 'Warning' || b.warningLevel === 'Watch').length;
    const anyAvailable = enhancedRecords.some(r => r.telemetryStatus === 'MODEL_SCREENING');

    return NextResponse.json(
      {
        success: true,
        telemetryStatus: anyAvailable ? 'MODEL_SCREENING' : 'UNAVAILABLE',
        records: enhancedRecords,
        roadCorridors: liveCorridors,
        officialBulletins: officialBulletinsData,
        summary: {
          totalMonitoredZones: enhancedRecords.length,
          activeCorridorsCount: liveCorridors.length,
          officialWarningsCount: activeOfficialBulletins,
          highNowcastCount,
          lastTelemetrySync: anyAvailable ? `Open-Meteo NWP (${timeStr})` : 'UNAVAILABLE',
        },
        meta: {
          sources: [
            'Geological Survey of India (GSI Bhusanket Published Susceptibility Reference)',
            'Open-Meteo Gridded NWP Screening Heuristic (~9–11 km Precipitation & Soil Moisture)',
            'Border Roads Organisation (BRO Published Corridor Reference)',
          ],
          modelClassification: 'Open-Meteo Gridded NWP Screening Heuristic (Zero In-Situ Rain Gauge / Piezometer Telemetry)',
          citation: 'Kashmir EcoWatch Landslide Susceptibility & NWP Screening Synthesis',
          timestamp: now.toISOString(),
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (err: any) {
    console.warn('[Landslides API] Upstream NWP unavailable; returning static susceptibility baseline:', err?.message);
    const snapshot = getInitialLandslideSnapshot();
    const sanitizedRecords = snapshot.records.map(r => ({
      ...r,
      last_updated: 'Telemetry Unavailable — Static Susceptibility Baseline',
      telemetryStatus: 'UNAVAILABLE' as const,
    }));
    return NextResponse.json({
      success: true,
      telemetryStatus: 'UNAVAILABLE',
      records: sanitizedRecords,
      roadCorridors: snapshot.roadCorridors,
      officialBulletins: snapshot.officialBulletins,
      summary: {
        ...snapshot.summary,
        lastTelemetrySync: 'UNAVAILABLE',
      },
      meta: {
        sources: ['GSI Bhusanket Static Susceptibility Inventory', 'BRO Published Corridor Reference'],
        modelClassification: 'Telemetry Unavailable — Static Geological Susceptibility Baseline Only',
        isFallback: true,
        telemetryStatus: 'UNAVAILABLE',
        timestamp: now.toISOString(),
      },
    });
  }
}
