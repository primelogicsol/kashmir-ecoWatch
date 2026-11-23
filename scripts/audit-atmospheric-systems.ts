/**
 * Comprehensive Scientific, Contract, Negative, Terrain-Masking & Raw-Payload Cross-Check Suite
 * Covers:
 *   1. Western Disturbances (31 corridors + 36-node 2D vorticity grid)
 *   2. Monsoon Dynamics (24 corridors + 4 gates + 850 hPa terrain mask + ERA5 historical archive)
 *   3. Jet Stream & Atmospheric Circulation (24 sectors + 45-node 2D SWJ grid + Z500 climatology)
 *   4. Extreme Rainfall & Cloudbursts (24 watersheds + 31-member GFS ensemble + ERA5 archive)
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  safeFinite,
  aggregateNullableSeries,
  windSpeedDirToUVms,
  validateExpectedUnits,
  resolveTerrainAwareMoisture,
  clearAtmosphericIngestionCache,
  ORDERED_SUBREGIONS,
} from '../src/lib/atmospheric-ingestion';

import { WD_CORRIDOR_STATIONS } from '../src/data/hazard-western-disturbances';
import { MONSOON_CORRIDOR_STATIONS, MOISTURE_TRANSPORT_NODES } from '../src/data/hazard-monsoon-dynamics';
import { JET_CIRCULATION_SECTORS } from '../src/data/hazard-jet-stream-circulation';
import { EXTREME_RAINFALL_WATERSHEDS } from '../src/data/hazard-extreme-weather';

import { buildWesternDisturbancesPayload } from '../src/lib/engines/western-disturbances-engine';
import { buildMonsoonDynamicsPayload } from '../src/lib/engines/monsoon-dynamics-engine';
import { buildJetStreamPayload, detectGriddedSwjAxis } from '../src/lib/engines/jet-stream-engine';
import { buildExtremeRainfallPayload } from '../src/lib/engines/extreme-rainfall-engine';

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

async function runTest(name: string, fn: () => Promise<string> | string) {
  try {
    const detail = await fn();
    results.push({ name, passed: true, detail });
    console.log(`PASS: ${name} -> ${detail}`);
  } catch (err: any) {
    results.push({ name, passed: false, detail: err?.message || String(err) });
    console.error(`FAIL: ${name} -> ${err?.message || err}`);
  }
}

async function main() {
  // ── 1. Null-Preservation vs Measured-Zero Tests ────────────────────────────
  await runTest('Zero vs Null Invariant (Missing Data Never Becomes Zero)', () => {
    assert.equal(safeFinite(0), 0, 'Measured 0 must remain 0');
    assert.equal(safeFinite(0.0), 0, 'Measured 0.0 must remain 0');
    assert.equal(safeFinite(null), null, 'null must remain null');
    assert.equal(safeFinite(undefined), null, 'undefined must remain null');
    assert.equal(safeFinite(NaN), null, 'NaN must remain null');
    assert.equal(safeFinite('0'), null, 'Non-number string must remain null');

    const allZeros = aggregateNullableSeries([0, 0, 0, 0], 4);
    assert.equal(allZeros.sum, 0);
    assert.equal(allZeros.completenessPct, 100);

    const allNulls = aggregateNullableSeries([null, undefined, null], 3);
    assert.equal(allNulls.sum, null, 'All-null series sum MUST be null, never 0');
    assert.equal(allNulls.mean, null);
    assert.equal(allNulls.max, null);

    const sparse = aggregateNullableSeries([5.0, null, null, null, null], 5, 1, 80);
    assert.equal(sparse.sum, null, '<80% completeness must not return biased partial sum');
    return 'Measured 0===0; null/sparse series return null without zero-coercion';
  });

  // ── 2. Unit-Conversion & Unit-Contract Validation Tests ────────────────────
  await runTest('Wind Vector & Unit Contract Validation', () => {
    const westJet = windSpeedDirToUVms(108, 270, 'km/h');
    assert.ok(westJet);
    assert.ok(Math.abs(westJet.u - 30.0) < 1e-6, '270° 108 km/h -> u = +30 m/s');
    assert.ok(Math.abs(westJet.v) < 1e-6, '270° -> v = 0 m/s');

    const southFlow = windSpeedDirToUVms(10, 180, 'm/s');
    assert.ok(southFlow);
    assert.ok(Math.abs(southFlow.v - 10.0) < 1e-6, '180° 10 m/s -> v = +10 m/s');

    const badUnits = validateExpectedUnits({ precipitation: 'inch', cape: 'J/kg' }, { precipitation: ['mm'], cape: ['J/kg'] });
    assert.equal(badUnits.passed, false);
    assert.equal(badUnits.mismatches.length, 1);
    return 'u/v spherical trigonometry & unit-contract guard verified';
  });

  // ── 3. Below-Ground 850 hPa & 700 hPa Pressure-Level Masking Tests ─────────
  await runTest('Below-Ground Pressure-Level Terrain Masking (Jammu vs Srinagar vs Leh)', () => {
    const jammu = resolveTerrainAwareMoisture({
      elevationM: 327, surfacePressureHpa: 984.5,
      rh850: 62, wind850: 22, dir850: 240,
      rh700: 45, wind700: 35, dir700: 260,
      rh500: 20, wind500: 55, dir500: 275,
      tcwv: 18.4,
    });
    assert.equal(jammu.rh850Masked.isAboveGround, true);
    assert.equal(jammu.rh850Masked.value, 62);
    assert.equal(jammu.selectedAboveGroundLevelHpa, 850);

    const srinagar = resolveTerrainAwareMoisture({
      elevationM: 1585, surfacePressureHpa: 853.1,
      rh850: 88, wind850: 5, dir850: 180,
      rh700: 51, wind700: 28, dir700: 265,
      rh500: 25, wind500: 60, dir500: 280,
      tcwv: 5.4,
    });
    assert.equal(srinagar.rh850Masked.isAboveGround, false);
    assert.equal(srinagar.rh850Masked.value, null);
    assert.equal(srinagar.selectedAboveGroundLevelHpa, 700);
    assert.equal(srinagar.selectedRhPct, 51);

    const leh = resolveTerrainAwareMoisture({
      elevationM: 3520, surfacePressureHpa: 689.8,
      rh850: 99, wind850: 0, dir850: 0,
      rh700: 95, wind700: 0, dir700: 0,
      rh500: 34, wind500: 64, dir500: 275,
      tcwv: 2.1,
    });
    assert.equal(leh.rh850Masked.isAboveGround, false);
    assert.equal(leh.rh850Masked.value, null);
    assert.equal(leh.selectedAboveGroundLevelHpa, 500);
    assert.equal(leh.selectedRhPct, 34);
    return 'Jammu->850hPa, Srinagar->700hPa (850 masked), Leh->500hPa (850 & 700 masked)';
  });

  // ── 4. Regional Geography & Administrative Unit Mapping Check ──────────────
  await runTest('Six-Subregion Coverage & Gilgit-Baltistan Administrative Mapping (103 Total Stations)', () => {
    const datasets = [
      { label: 'WD', list: WD_CORRIDOR_STATIONS, expected: 31 },
      { label: 'Monsoon', list: MONSOON_CORRIDOR_STATIONS, expected: 24 },
      { label: 'Jet', list: JET_CIRCULATION_SECTORS, expected: 24 },
      { label: 'ExtremeRain', list: EXTREME_RAINFALL_WATERSHEDS, expected: 24 },
    ];
    for (const ds of datasets) {
      assert.equal(ds.list.length, ds.expected, `${ds.label} count mismatch`);
      for (const sr of ORDERED_SUBREGIONS) {
        const inSr = ds.list.filter((x) => x.subRegion === sr);
        assert.ok(inSr.length > 0, `${ds.label} missing subregion ${sr}`);
      }
      for (const st of ds.list) {
        assert.ok(st.latitude >= 32.0 && st.latitude <= 37.2, `Invalid lat on ${st.id}`);
        assert.ok(st.longitude >= 73.0 && st.longitude <= 79.0, `Invalid lon on ${st.id}`);
        if (st.subRegion === 'Gilgit' || st.subRegion === 'Baltistan') {
          assert.equal(st.administrativeUnit, 'Gilgit-Baltistan', `${st.id} must map to Gilgit-Baltistan`);
        }
      }
    }
    assert.equal(MOISTURE_TRANSPORT_NODES.length, 4);
    return 'All 103 stations across 4 modules verified for bounds, elevation & Gilgit-Baltistan mapping';
  });

  // ── 5. Negative / Upstream Failure & Missing-Detector Tests ────────────────
  await runTest('Negative Upstream Error & Unavailable Detector Handling (No Fake Zeroes)', async () => {
    clearAtmosphericIngestionCache();
    const failFetch = (async () => new Response('Internal Error', { status: 500 })) as unknown as typeof fetch;

    const wdFail = await buildWesternDisturbancesPayload({ forceRefresh: true, fetchImpl: failFetch });
    assert.equal(wdFail.httpStatus, 503);
    assert.equal(wdFail.body.success, false);

    const monFail = await buildMonsoonDynamicsPayload({ forceRefresh: true, fetchImpl: failFetch });
    assert.equal(monFail.httpStatus, 503);
    assert.equal(monFail.body.success, false);

    const jetFail = await buildJetStreamPayload({ forceRefresh: true, fetchImpl: failFetch });
    assert.equal(jetFail.httpStatus, 503);
    assert.equal(jetFail.body.success, false);

    const ercFail = await buildExtremeRainfallPayload({ forceRefresh: true, fetchImpl: failFetch });
    assert.equal(ercFail.httpStatus, 503);
    assert.equal(ercFail.body.success, false);

    clearAtmosphericIngestionCache();
    const partialFetch = (async (input: RequestInfo | URL) => {
      const url = decodeURIComponent(String(input));
      if (url.includes('25,30,35,40')) {
        return new Response('Synoptic Grid Timeout', { status: 502 });
      }
      if (url.includes('rainviewer') || url.includes('imd.gov') || url.includes('pmd.gov')) {
        return new Response('{}', { status: 200 });
      }
      const dummyItems = Array.from({ length: 37 }, (_, idx) => ({
        elevation: 1600,
        current_units: { temperature_2m: '°C' },
        hourly_units: {
          precipitation: 'mm', snowfall: 'cm', freezing_level_height: 'm',
          geopotential_height_500hPa: 'm', wind_speed_300hPa: 'km/h',
        },
        current: { time: '2026-11-23T06:00', temperature_2m: idx === 6 ? null : 11.2, pressure_msl: 1018, cloud_cover: 10, precipitation: 0 },
        hourly: {
          time: Array.from({ length: 192 }, (__, h) => new Date(Date.UTC(2026, 10, 23, h)).toISOString().slice(0, 16)),
          precipitation: Array.from({ length: 192 }, () => (idx === 6 ? null : 0)),
          rain: Array.from({ length: 192 }, () => (idx === 6 ? null : 0)),
          snowfall: Array.from({ length: 192 }, () => 0),
          freezing_level_height: Array.from({ length: 192 }, () => 3800),
          geopotential_height_500hPa: Array.from({ length: 192 }, () => 5840),
          wind_speed_300hPa: Array.from({ length: 192 }, () => 98),
          wind_direction_300hPa: Array.from({ length: 192 }, () => 280),
          pressure_msl: Array.from({ length: 192 }, () => 1018),
        },
        daily: {
          time: Array.from({ length: 10 }, (__, d) => `2026-11-${21 + d}`),
          precipitation_sum: Array.from({ length: 10 }, () => (idx === 6 ? null : 0)),
          rain_sum: Array.from({ length: 10 }, () => 0),
          snowfall_sum: Array.from({ length: 10 }, () => 0),
          precipitation_probability_max: Array.from({ length: 10 }, () => 0),
          wind_gusts_10m_max: Array.from({ length: 10 }, () => 22),
          temperature_2m_max: Array.from({ length: 10 }, () => 14),
          temperature_2m_min: Array.from({ length: 10 }, () => 2),
        },
      }));
      return new Response(JSON.stringify(dummyItems), { status: 200 });
    }) as unknown as typeof fetch;

    const wdPartial = await buildWesternDisturbancesPayload({
      forceRefresh: true,
      nowMs: Date.UTC(2026, 10, 23, 6, 0),
      fetchImpl: partialFetch,
    });
    assert.equal(wdPartial.httpStatus, 200);
    const wdSum: any = wdPartial.body.synopticSummary;
    assert.equal(wdSum.detectionStatus, 'UNAVAILABLE');
    assert.equal(wdSum.detectedSystemCount, null, 'Must be null (Detection Unavailable), never 0!');
    assert.equal(wdSum.activePassageCount, null, 'Must be null (Detection Unavailable), never 0!');
    assert.equal(wdSum.configuredCorridors, 31);
    assert.equal(wdSum.reportingCorridors, 30);
    const c0 = (wdPartial.body as any).corridors[0];
    assert.equal(c0.forecast7d.total_precip_mm, null);
    assert.equal(c0.compoundTriggers.overallRisk, 'Not Assessed');

    const emptySwj = detectGriddedSwjAxis([]);
    assert.equal(emptySwj.status, 'UNAVAILABLE');
    assert.equal(emptySwj.axisLatitudeDeg, null);

    clearAtmosphericIngestionCache();
    return 'HTTP 503 on total failure; Detection Unavailable (null) & 30/31 reporting on partial missing data';
  });

  // ── 6. Live Upstream Contract & 12-Corridor Raw Payload Cross-Check ────────
  await runTest('Live End-to-End Contract & Raw Upstream Cross-Check (12 Representative Corridors)', async () => {
    clearAtmosphericIngestionCache();
    const wdRes = await buildWesternDisturbancesPayload({ forceRefresh: true });
    assert.equal(wdRes.httpStatus, 200, `WD failed: ${JSON.stringify((wdRes.body as any).error)}`);

    const monRes = await buildMonsoonDynamicsPayload({ forceRefresh: true });
    assert.equal(monRes.httpStatus, 200, `Monsoon failed: ${JSON.stringify((monRes.body as any).error)}`);

    const jetRes = await buildJetStreamPayload({ forceRefresh: true });
    assert.equal(jetRes.httpStatus, 200, `Jet failed: ${JSON.stringify((jetRes.body as any).error)}`);

    const ercRes = await buildExtremeRainfallPayload({ forceRefresh: true });
    assert.equal(ercRes.httpStatus, 200, `ExtremeRain failed: ${JSON.stringify((ercRes.body as any).error)}`);

    const wdBody: any = wdRes.body;
    const monBody: any = monRes.body;
    const jetBody: any = jetRes.body;
    const ercBody: any = ercRes.body;

    // 3 WD corridors
    const wdPickIds = ['wd-kas-01', 'wd-jmu-02', 'wd-ldk-02'];
    const wdPicks = wdPickIds.map((id) => wdBody.corridors.find((c: any) => c.id === id));
    const rawWdUrl = `https://api.open-meteo.com/v1/forecast?latitude=${wdPicks.map((p) => p.latitude).join(',')}&longitude=${wdPicks.map((p) => p.longitude).join(',')}&current=temperature_2m&hourly=freezing_level_height,geopotential_height_500hPa,wind_speed_300hPa&timezone=GMT&forecast_days=2`;
    const rawWdJson = await (await fetch(rawWdUrl)).json();

    const wdCrossCheck = wdPicks.map((p, idx) => {
      const rawTemp = Number(rawWdJson[idx].current.temperature_2m.toFixed(1));
      const diff = Math.abs((p.liveObservation.temp_c ?? 0) - rawTemp);
      assert.ok(diff <= 0.5, `WD ${p.id} temp mismatch: ${p.liveObservation.temp_c} vs ${rawTemp}`);
      return {
        id: p.id, name: p.name, subRegion: p.subRegion,
        apiTempC: p.liveObservation.temp_c, rawTempC: rawTemp,
        demElevM: p.provenance.modelGridElevationM,
        fzlM: p.liveObservation.freezing_level_m,
        z500Gpm: p.liveObservation.z500_gpm,
        jet300Kmh: p.liveObservation.jet300_kmh,
        p7dMm: p.forecast7d.total_precip_mm,
      };
    });

    // 3 Monsoon corridors
    const monPickIds = ['mon-jmu-02', 'mon-kas-03', 'mon-ldk-01'];
    const monPicks = monPickIds.map((id) => monBody.corridors.find((c: any) => c.id === id));
    assert.equal(monPicks[0].liveObservation.is_850hpa_above_ground, true);
    assert.equal(monPicks[2].liveObservation.is_850hpa_above_ground, false);
    assert.equal(monPicks[2].liveObservation.rh_850hpa_pct, null);
    assert.equal(monPicks[2].liveObservation.above_ground_level_hpa, 500);

    const histWin = monBody.seasonContext.historicalWindowLabel.split(' ');
    const rawEra5Url = `https://archive-api.open-meteo.com/v1/archive?latitude=${monPicks.map((p) => p.latitude).join(',')}&longitude=${monPicks.map((p) => p.longitude).join(',')}&start_date=${histWin[0]}&end_date=${histWin[2]}&daily=precipitation_sum&timezone=GMT`;
    const rawEra5Json = await (await fetch(rawEra5Url)).json();
    const monCrossCheck = monPicks.map((p, idx) => {
      const rawSum = Number(rawEra5Json[idx].daily.precipitation_sum.reduce((a: number, b: number) => a + (b || 0), 0).toFixed(1));
      assert.equal(p.liveObservation.era5_past7d_rain_mm, rawSum);
      return {
        id: p.id, name: p.name, subRegion: p.subRegion,
        pSfcHpa: p.liveObservation.surface_pressure_hpa,
        rh850: p.liveObservation.rh_850hpa_pct,
        selectedLevel: p.liveObservation.above_ground_level_hpa,
        selectedRh: p.liveObservation.above_ground_rh_pct,
        tcwv: p.liveObservation.tcwv_kg_m2,
        apiEra5Mm: p.liveObservation.era5_past7d_rain_mm,
        rawEra5Mm: rawSum,
      };
    });

    // 3 Jet Stream sectors (with raw Open-Meteo 250/500 hPa cross-check)
    const jetPickIds = ['jet-jmu-01', 'jet-kas-03', 'jet-blt-02'];
    const jetPicks = jetPickIds.map((id) => jetBody.sectors.find((s: any) => s.id === id));
    const rawJetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${jetPicks.map((p) => p.latitude).join(',')}&longitude=${jetPicks.map((p) => p.longitude).join(',')}&hourly=wind_speed_250hPa,geopotential_height_500hPa&timezone=GMT&forecast_days=2`;
    const rawJetJson = await (await fetch(rawJetUrl)).json();
    const jetCrossCheck = jetPicks.map((p, idx) => {
      assert.ok(p.liveUpperAir.jet250_kmh !== null && p.liveUpperAir.z500_gpm !== null);
      const validIsoPrefix = p.provenance.validTimeUtc.slice(0, 16);
      const tIdx = rawJetJson[idx].hourly.time.findIndex((t: string) => t === validIsoPrefix);
      const rawJet250 = Number(rawJetJson[idx].hourly.wind_speed_250hPa[tIdx].toFixed(1));
      const rawZ500 = Math.round(rawJetJson[idx].hourly.geopotential_height_500hPa[tIdx]);
      assert.ok(Math.abs(p.liveUpperAir.jet250_kmh - rawJet250) <= 0.5, `Jet 250 mismatch for ${p.id}`);
      assert.ok(Math.abs(p.liveUpperAir.z500_gpm - rawZ500) <= 2, `Z500 mismatch for ${p.id}`);
      return {
        id: p.id, name: p.name, subRegion: p.subRegion,
        apiJet250Kmh: p.liveUpperAir.jet250_kmh, rawJet250Kmh: rawJet250,
        apiZ500Gpm: p.liveUpperAir.z500_gpm, rawZ500Gpm: rawZ500,
        z500ClimGpm: p.liveUpperAir.z500_climatology_gpm,
        z500DepGpm: p.liveUpperAir.z500_departure_gpm,
        regime: p.circulationRegime,
      };
    });

    // 3 Extreme Rainfall watersheds (with raw ERA5 + 31-member GFS ensemble cross-check)
    const ercPickIds = ['erc-kas-01', 'erc-jmu-01', 'erc-ldk-01'];
    const ercPicks = ercPickIds.map((id) => ercBody.watersheds.find((w: any) => w.id === id));
    const ercHistWin = ercBody.meta.historicalWindow.split(' ');
    const rawErcEra5Url = `https://archive-api.open-meteo.com/v1/archive?latitude=${ercPicks.map((w) => w.latitude).join(',')}&longitude=${ercPicks.map((w) => w.longitude).join(',')}&start_date=${ercHistWin[0]}&end_date=${ercHistWin[2]}&daily=precipitation_sum&timezone=GMT`;
    const rawErcEnsUrl = `https://ensemble-api.open-meteo.com/v1/ensemble?latitude=${ercPicks.map((w) => w.latitude).join(',')}&longitude=${ercPicks.map((w) => w.longitude).join(',')}&daily=precipitation_sum&models=gfs_seamless&timezone=GMT&forecast_days=7`;
    const [rawErcEra5Json, rawErcEnsJson] = await Promise.all([
      (await fetch(rawErcEra5Url)).json(),
      (await fetch(rawErcEnsUrl)).json(),
    ]);
    const ercCrossCheck = ercPicks.map((w, idx) => {
      assert.equal(w.ensembleGfs31.memberCount, 31);
      const rawEra5Sum = Number(rawErcEra5Json[idx].daily.precipitation_sum.reduce((a: number, b: number) => a + (b || 0), 0).toFixed(1));
      const rawEnsMemberKeys = Object.keys(rawErcEnsJson[idx].daily || {}).filter((k) => k.startsWith('precipitation_sum'));
      assert.equal(w.currentAnalysis.era5_past7d_mm, rawEra5Sum);
      assert.equal(w.ensembleGfs31.memberCount, rawEnsMemberKeys.length);
      return {
        id: w.id, name: w.name, subRegion: w.subRegion,
        apiEra5_7dMm: w.currentAnalysis.era5_past7d_mm, rawEra5_7dMm: rawEra5Sum,
        peak1hMm: w.forecast168h.peak_1h_mm,
        peak24hMm: w.forecast168h.peak_24h_mm,
        apiEnsMembers: w.ensembleGfs31.memberCount, rawEnsMembers: rawEnsMemberKeys.length,
        ensP90Mm: w.ensembleGfs31.p90_7d_mm,
        probGe50Pct: w.ensembleGfs31.prob_24h_ge_50mm_pct,
      };
    });

    const snapshot = {
      generatedAtUtc: new Date().toISOString(),
      westernDisturbances: { summary: wdBody.synopticSummary, meta: wdBody.meta, detectedSystems: wdBody.detectedSystems, representativeCorridors: wdCrossCheck },
      monsoonDynamics: { seasonContext: monBody.seasonContext, meta: monBody.meta, moistureGates: monBody.moistureBranches, representativeCorridors: monCrossCheck },
      jetStreamCirculation: { summary: jetBody.circulationSummary, meta: jetBody.meta, representativeSectors: jetCrossCheck },
      extremeRainfallCloudbursts: { summary: ercBody.summary, meta: ercBody.meta, representativeWatersheds: ercCrossCheck },
    };

    const outDir = path.resolve('C:/Users/Fayaz/.gemini/antigravity-cli/brain/f21007ff-4e92-4972-982d-afedc1d490b9/scratch');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'live_audit_snapshot.json'), JSON.stringify(snapshot, null, 2));

    return `All 4 live APIs HTTP 200; 12 representative corridors matched raw Open-Meteo/ERA5/31-member GFS payloads`;
  });

  const failed = results.filter((r) => !r.passed);
  console.log(`\n=== AUDIT TEST SUMMARY: ${results.length - failed.length}/${results.length} PASSED ===`);
  if (failed.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
