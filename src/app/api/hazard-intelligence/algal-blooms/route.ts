import { NextResponse } from 'next/server';
import {
  primaryMonitoredWaterbodies,
  satelliteObservationsCatalog,
  institutionalRecordsCatalog,
  lcmaStpEffluentCatalog,
  laboratoryCyanotoxinCatalog,
  bloomEarlyWarningAlerts,
  predictiveForecastsCatalog,
  getInitialAlgalBloomSnapshot,
  MonitoredWaterbody,
  BloomClassification,
} from '@/data/algal-bloom-intelligence-hub';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Pure live data delivery, zero stale disk caching

export async function GET() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  try {
    // Collect coordinates from primary monitored waterbodies
    const lats = primaryMonitoredWaterbodies.map(l => l.latitude.toFixed(4)).join(',');
    const lngs = primaryMonitoredWaterbodies.map(l => l.longitude.toFixed(4)).join(',');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);

    // 7-day rolling window: past_days=6 + forecast_days=1 = 7 daily steps
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max,shortwave_radiation_sum&past_days=6&forecast_days=1&timezone=auto`;

    const res = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    let meteoResults: any[] = [];
    if (res.ok) {
      const data = await res.json();
      meteoResults = Array.isArray(data) ? data : [data];
    }

    // Enrich waterbodies with modeled meteorology and UNMODIFIED static archived satellite observations
    const enrichedWaterbodies: MonitoredWaterbody[] = primaryMonitoredWaterbodies.map((wb, idx) => {
      const locData = meteoResults[idx];
      const daily = locData?.daily;
      const hasMeteo = Boolean(daily && Array.isArray(daily.temperature_2m_max) && daily.temperature_2m_max.length > 0);

      const tempMax = hasMeteo ? (daily.temperature_2m_max[daily.temperature_2m_max.length - 1] ?? 18.5) : 0;
      const windSpeed = hasMeteo ? (daily.wind_speed_10m_max?.[daily.wind_speed_10m_max.length - 1] ?? 7.5) : 0;
      const precip7d = hasMeteo ? (daily.precipitation_sum?.slice(-7).reduce((a: number, b: number) => a + (b || 0), 0) ?? 0) : 0;
      const solarRad = hasMeteo ? (daily.shortwave_radiation_sum?.[daily.shortwave_radiation_sum.length - 1] ?? 16.0) : 0;

      const isStagnant = hasMeteo && windSpeed < 10;
      const isEutrophic = wb.trophicStatus === 'Eutrophic' || wb.trophicStatus === 'Hypereutrophic';

      // Correlate with static scientific catalogs (NEVER mutate archived Sentinel-2 Chl-a by live weather!)
      const sat = satelliteObservationsCatalog.find(s => s.waterbodyId === wb.id);
      const inst = institutionalRecordsCatalog.find(i => i.waterbodyName === wb.name);
      const lab = laboratoryCyanotoxinCatalog.find(l => l.waterbodyName === wb.name);
      const fc = predictiveForecastsCatalog.find(f => f.waterbodyId === wb.id);

      // Determine evidence-based bloom classification
      let classification: BloomClassification = wb.currentBloomClassification;
      if (lab && lab.chainOfCustodyVerified && lab.toxinSafetyStatus.includes('Exceedance')) {
        classification = 'Laboratory-Confirmed Harmful Bloom';
      } else if (sat && sat.surfaceScumDetected && isEutrophic) {
        classification = 'Probable Bloom';
      } else if (sat && sat.ndciIndex > 0.15) {
        classification = 'Possible Bloom Detected';
      } else if (wb.trophicStatus === 'Oligotrophic') {
        classification = 'No Bloom Detected';
      }

      return {
        ...wb,
        currentBloomClassification: classification,
        satelliteObservation: sat ? { ...sat } : undefined,
        institutionalRecord: inst,
        laboratoryRecord: lab,
        forecast: fc,
        liveMeteorology: hasMeteo
          ? {
              tempMaxC: Number(tempMax.toFixed(1)),
              windSpeedKmH: Number(windSpeed.toFixed(1)),
              solarRadiationMjM2: Number(solarRad.toFixed(1)),
              precip7dMm: Number(precip7d.toFixed(1)),
              stratificationState: isStagnant ? 'Low-Wind Surface Layer (<10 km/h NWP)' : 'Mixed Surface Layer (NWP)',
            }
          : undefined,
      };
    });

    const activeBloomAlerts = enrichedWaterbodies.filter(
      w => w.currentBloomClassification === 'Laboratory-Confirmed Harmful Bloom' || w.currentBloomClassification === 'Probable Bloom'
    ).length;

    return NextResponse.json(
      {
        success: true,
        telemetryStatus: meteoResults.length > 0 ? 'MODEL_SCREENING' : 'UNAVAILABLE',
        waterbodies: enrichedWaterbodies,
        satelliteObservations: satelliteObservationsCatalog,
        institutionalRecords: institutionalRecordsCatalog,
        lcmaStpRecords: lcmaStpEffluentCatalog,
        laboratoryToxinRecords: laboratoryCyanotoxinCatalog,
        earlyWarningAlerts: bloomEarlyWarningAlerts,
        forecastModels: predictiveForecastsCatalog,
        summary: {
          totalMonitoredWaterbodies: enrichedWaterbodies.length,
          satelliteTrackedLakes: satelliteObservationsCatalog.length,
          institutionalStations: institutionalRecordsCatalog.length,
          activeOcemsStps: lcmaStpEffluentCatalog.length,
          laboratoryAssays: laboratoryCyanotoxinCatalog.length,
          activeBloomAlerts,
          lastSyncTime: meteoResults.length > 0 ? `Open-Meteo NWP (${timeStr})` : 'Archival Reference Snapshot',
        },
        meta: {
          satelliteEngine: 'Copernicus Sentinel-2 MSI (L2A) Archived Red-Edge NDCI Screening (Mishra & Mishra 2012 Polynomial, ±12 µg/L Uncalibrated)',
          meteorologyEngine: 'Open-Meteo Gridded Solar Radiation & Surface Meteorology (~9–11 km NWP)',
          institutionalBaselines: [
            'CPCB National Water Quality Monitoring Programme (NWQMP Published Archives)',
            'J&K Pollution Control Committee (JKPCC Published Reports)',
            'J&K Lakes Conservation and Management Authority (LCMA — Published Audit / Design Capacity Reference, Non-Live)',
            'Published Limnological Literature (University of Kashmir / Peer-Reviewed Studies)',
          ],
          disclaimer: 'Satellite Chl-a is an uncalibrated optical biomass proxy (±12 µg/L uncertainty) tied to archived overpass dates and does NOT prove cyanotoxin presence. Laboratory ELISA/LC-MS cyanotoxin feed is pending institutional MoU.',
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
    console.warn('[Algal Bloom API] Fallback to verified baseline snapshot:', err?.message);
    const snapshot = getInitialAlgalBloomSnapshot();
    return NextResponse.json({
      success: true,
      waterbodies: snapshot.waterbodies,
      satelliteObservations: snapshot.satelliteObservations,
      institutionalRecords: snapshot.institutionalRecords,
      lcmaStpRecords: snapshot.lcmaStpRecords,
      laboratoryToxinRecords: snapshot.laboratoryToxinRecords,
      earlyWarningAlerts: snapshot.earlyWarningAlerts,
      forecastModels: snapshot.forecastModels,
      summary: snapshot.summary,
      meta: {
        isFallback: true,
        timestamp: now.toISOString(),
      },
    });
  }
}
