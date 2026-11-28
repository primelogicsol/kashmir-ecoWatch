# Kashmir EcoWatch — Sensor & Monitoring Infrastructure Registry Audit (`Phase 3`)

**Audit Date:** November 27, 2026  
**Authoritative Registry:** `src/data/monitoring-infrastructure-registry.ts`  
**KEW-Owned Physical Field Sensors:** **`0` (Zero)**

---

## 1. Fundamental Sensor Authenticity Determination

A central mandate of this pre-launch audit was to establish whether the platform's references to *"240+ Monitoring Stations Online"*, *"263 active stations"*, *"156 camera traps"*, *"44 air quality stations"*, *"65 water quality sites"*, *"alpine GNSS stations"*, and *"continuous automated buoys"* represent actual KEW-operated hardware, third-party telemetry, historical records, or synthetic data.

**Forensic Finding:**
1. **Kashmir EcoWatch owns and operates `0` physical field sensors.**
2. **Real Live External Feeds (`6` operational pipelines):**
   - **Seismic Events:** Real instrumental hypocenters from **USGS ComCat**, **EMSC**, and **NCS India** (`/api/hazard-intelligence/earthquakes`, Haversine-deduplicated).
   - **Urban Community PM2.5 (3 cities only):** Real low-cost optical community monitors in **Srinagar, Jammu, and Leh** via **AirGradient / BreatheOSS** (`api.breatheoss.app`), paired with ~11 km **ECMWF CAMS** modeled gases (`/api/environmental-monitoring/air-pollution`). Zero direct CPCB/JKPCC CAAQMS reference monitors are connected.
   - **Gridded Atmospheric Composition (Muzaffarabad & Gilgit):** 100% **ECMWF CAMS ~11 km gridded model** via Open-Meteo (previously mislabeled `'Government EPA'`, `is_ground_truth: true` — now corrected).
   - **Synoptic & Hazard Meteorology:** Real **Open-Meteo** gridded NWP analysis and forecasts (**ECMWF IFS 9 km**, **NOAA GFS**, and **31-member GEFS ensemble**) powering Western Disturbances, Jet Stream, Monsoon, Extreme Rainfall, and heuristic screening triggers.
   - **Modeled River Discharge:** Real **Copernicus GloFAS v4 (~5 km LISFLOOD grid)** modeled daily discharge via Open-Meteo Flood API (NOT physical CWC or J&K I&FC river staff gauges).
   - **Official Civil Disaster Warnings:** Real **NDMA SACHET Common Alerting Protocol (CAP)** RSS feed (now strictly pre-filtered to J&K and Ladakh districts).
3. **Static / Historical / Synthetic Items Previously Misrepresented as Live (`Remediated`):**
   - `/api/floods/live` stamped `new Date()` and `'cwc_jkifc_calibrated_telemetry'` onto 12 static river heights -> reclassified as static statutory Alert/Danger reference thresholds (`isLiveTelemetry: false`).
   - `ExpandableLivePanels.tsx` computed Anantnag/Baramulla AQI as `srinagarAqi - 15` / `- 5` and stamped `LIVE API` on static Hangul/Kolahoi/Dal/Verinag baselines -> removed fabricated math and live badges.
   - `/api/cron/ingest` generated `Math.random() * 120` rainfall labeled `'Open-Meteo-NWP'` -> replaced with real authenticated Open-Meteo NWP fetch + zero-fabrication `503` fallback.
   - `lcmaStpEffluentCatalog` (`12` STPs) and `monitoring-registry.ts` (`263` stations / `156` camera traps) -> reclassified as published audit/literature benchmarks with `0` KEW hardware sensors.

---

## 2. Issue Register (`Phase 3` Sensor & Live Telemetry Findings)

### `SEN-P0-001` — False KEW Physical Sensor Network & GNSS Claims on Homepage
- **Issue ID:** `SEN-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/`
- **Affected file:** `src/components/home/ImmersiveHero.tsx`, `src/components/home/CinematicIntroduction.tsx`, `src/data/monitoring-registry.ts`
- **Original condition:** Hero banner proclaimed `"240+ Monitoring Stations Online"` and introduction claimed `"alpine GNSS stations, and real-time sensor networks"`, while `monitoring-registry.ts` listed `263` active stations including `156` camera traps.
- **Root cause:** Aspirational observatory marketing copy conflated external gridded model cells and literature study sites with KEW-operated physical hardware.
- **Supporting evidence:** `ImmersiveHero.tsx:740,773`, `CinematicIntroduction.tsx:43`, `monitoring-registry.ts`.
- **Corrective action:** Removed all claims of KEW-owned physical sensor networks, GNSS stations, camera traps, and continuous water buoys; wired homepage metrics to `PLATFORM_METRICS` (`KEW_OWNED_PHYSICAL_SENSORS_COUNT = 0`) and `MONITORING_INFRASTRUCTURE_REGISTRY`.
- **Verification method:** `GUARD-09` automated check + homepage DOM inspection.
- **Current status:** `Resolved`
- **Remaining limitations:** None; external data providers are explicitly credited.

---

### `SEN-P0-002` — Static Flood Gauge Heights Served with Live `new Date()` Timestamps as CWC / J&K I&FC Telemetry
- **Issue ID:** `SEN-P0-002`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/api/floods/live`, `/hazard-intelligence/floods`, `/`
- **Affected file:** `src/app/api/floods/live/route.ts`, `src/components/home/AlertResponseSystem.tsx`
- **Original condition:** `GET /api/floods/live` returned 12 hardcoded river water levels (`Ram Munshi Bagh: 16.00 ft`, `Sangam: 13.60 ft`, etc.) stamped with `new Date().toISOString()` and `source: 'cwc_jkifc_calibrated_telemetry'`.
- **Root cause:** Prototype mock endpoint was left active as a public safety feed.
- **Supporting evidence:** `src/app/api/floods/live/route.ts:6-42`, `AlertResponseSystem.tsx:78`.
- **Corrective action:** Removed `new Date()` live timestamps and `'cwc_jkifc_calibrated_telemetry'` attribution; converted `/api/floods/live` to return static statutory Alert/Danger stage thresholds and historical Sept 2014 peak benchmarks with `isLiveTelemetry: false` and `provenanceClass: 'historical_baseline'`.
- **Verification method:** `GUARD-11` check + `GET http://localhost:3000/api/floods/live` JSON verification.
- **Current status:** `Resolved`
- **Remaining limitations:** Real-time CWC / J&K I&FC physical river stage gauges do not expose an open unauthenticated REST API; live hydrological screening uses Copernicus GloFAS v4 (~5 km modeled discharge) with explicit model disclaimers.

---

### `SEN-P0-003` — Coarse 11 km CAMS Model Grids Mislabeled as `'Government EPA'` Ground Truth in Muzaffarabad & Gilgit
- **Issue ID:** `SEN-P0-003`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-monitoring/air-pollution`, `/api/environmental-monitoring/air-pollution`
- **Affected file:** `src/data/air-quality-registry.ts`, `src/app/api/environmental-monitoring/air-pollution/route.ts`
- **Original condition:** Muzaffarabad and Gilgit nodes fetched 100% Open-Meteo ~11 km CAMS model grids yet declared `station_type: 'Government EPA'`, `is_ground_truth: true`, and `status: 'ONLINE'`; Srinagar/Jammu/Leh community AirGradient optical sensors were presented alongside regulatory NAAQS claims; fallback snapshots stamped `new Date()` as `'Live Telemetry'`.
- **Root cause:** Uniform station metadata template applied across heterogeneous community and model nodes.
- **Supporting evidence:** `air-quality-registry.ts:181-204,466-549`, `air-pollution/route.ts:428-458`.
- **Corrective action:** Reclassified Muzaffarabad & Gilgit to `'Gridded Atmospheric Model (ECMWF CAMS 11 km)'` (`is_ground_truth: false`); labeled Srinagar/Jammu/Leh `'Community Optical Sensor (AirGradient) + CAMS Model Gases (Non-Regulatory)'`; stripped live timestamps from static fallback snapshots.
- **Verification method:** `GET http://localhost:3000/api/environmental-monitoring/air-pollution` verification.
- **Current status:** `Resolved`
- **Remaining limitations:** Official JKPCC / CPCB / Pak-EPA reference CAAQMS stations are not connected via live API.

---

### `SEN-P0-004` — Fabricated District AQI Arithmetic (`srinagarAqi - 15`) & Fake `LIVE API` Badges in Homepage Live Panels
- **Issue ID:** `SEN-P0-004`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/`
- **Affected file:** `src/components/home/ExpandableLivePanels.tsx`
- **Original condition:** Anantnag and Baramulla AQI values were fabricated by subtracting `15` and `5` from Srinagar's AQI, 16 items generated `Date.now() - Xm` fake ages, and static Hangul census, Kolahoi glacier, Dal Lake, and Verinag records displayed green `LIVE API` badges.
- **Root cause:** UI card grid simulated uniform live telemetry across non-telemetered ecological domains.
- **Supporting evidence:** `ExpandableLivePanels.tsx:146-325`.
- **Corrective action:** Removed synthetic AQI subtraction formulas, removed fake `Date.now() - Xm` timestamps, and replaced `LIVE API` badges on static records with `'Historical / Statutory Baseline'` labels tied to documented survey years.
- **Verification method:** `GUARD-10` check + component inspection.
- **Current status:** `Resolved`
- **Remaining limitations:** District-level ground PM2.5 outside Srinagar, Jammu, and Leh remains a regional monitoring gap.
