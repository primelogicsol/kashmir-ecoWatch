# Kashmir EcoWatch — Scientific Methodology & Predictive Model Integrity Register (`Phase 6`)

**Audit Date:** November 27, 2026  
**Scope:** All 28 Algorithms, Environmental Indices, Synoptic Engines, Hazard Screening Heuristics & Limnological Equations  
**Status:** **REMEDIATED (`0` Unresolved P0 Formula Bugs, `0` `Math.random()` Generators, Honest Model Screening Labels Enforced)**

---

## 1. Classification of KEW Computational & Scientific Engines (28 Systems)

| Class | Count | Representative Engines | Scientific Validity & Post-Remediation Framing |
| :--- | :---: | :--- | :--- |
| **A. Physics- & Mathematics-Exact Atmospheric/Seismic Engines** | **6** | `atmospheric-ingestion.ts` (terrain-aware 850/700/500 hPa masking), `western-disturbances-engine.ts` (spherical 500 hPa relative vorticity `ζ`), `extreme-rainfall-engine.ts` (31-member GEFS `P10/P50/P90` quantiles), `jet-stream-engine.ts` (parabolic sub-grid jet core), `earthquakes/route.ts` (Haversine 65 km / 120 s deduplication), `master-lake-registry.ts` (Carlson 1977 `TSI(SD, Chl-a, TP)`) | **High Scientific Rigor** — Exact equations, null-safe missing-data handling, and explicit scale limitations (e.g., `'Cloudburst-Supportive Environment (Unconfirmed)'`). |
| **B. NWP-Driven Multi-Hazard Screening Heuristics** | **7** | `landslides/route.ts`, `flash-floods/route.ts`, `glofs/route.ts`, `avalanches/route.ts`, `forest-fires/route.ts`, `alerts/live/route.ts`, `ingest/telemetry/route.ts` | **Reclassified as Heuristic Screening Models** — Removed false claims of `"NASA LHASA 2.0"`, `"IMD Doppler Radar"`, `"DGRE SASE"`, `"Canadian FWI"`, `"NASA FIRMS"`, and `"Melting Degree-Days"`; fixed zero-snow summer avalanche bug, SACHET nationwide keyword leak, and Jhelum `150 m³/s` flood threshold. |
| **C. Optical Satellite & Limnological Screening Indices** | **5** | `algal-blooms/route.ts`, `algal-bloom-intelligence-hub.ts`, `water-intelligence-engine.ts`, `hydrology-models.ts`, `hydrological-intelligence.ts` | **Corrected & Bounded** — Recomputed Mishra & Mishra (2012) NDCI polynomial values, removed `+2.5 µg/L` live temperature mutation on archived Sentinel-2 scenes, quarantined 11 synthetic lab cyanotoxin assays, and stopped `TN/TP -> NO3/PO4` conflation. |
| **D. Statutory Regulatory Air & Acoustic Indices** | **4** | `air-quality-registry.ts` (`calculateIndianNAQI` CPCB 2014 & `calculateUsAqi` EPA 2024), `noise-pollution` `L_den`, `transportation-pollution` emission factors | **Verified Standard Breakpoints** — Dual Indian NAQI / US EPA AQI piecewise linear interpolation verified; source provenance corrected (`Community Sensor` vs `CAMS 11 km Model`). |
| **E. Retired / Purged Synthetic Generators** | **6** | `/api/floods/live` fake live stages, `floods/page.tsx` inverted GloFAS ratio, `/api/cron/ingest` `Math.random()`, `forest-ecosystems/page.tsx` 11 `Math.random()` stats, `ExpandableLivePanels.tsx` `srinagarAqi - 15`, `wildlife-corridors.ts` / `seasonal-intelligence.ts` `Math.random()` | **Purged / Replaced** — Zero `Math.random()` measurements remain (`GUARD-10` & `GUARD-11` PASS). |

---

## 2. Detailed Scientific Model & Equation Issue Register

### `SCI-P0-001` — Inverted GloFAS River Flood Risk Classifier Flagging Dry Baseflow as `'Very High'` Risk
- **Issue ID:** `SCI-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/hazard-intelligence/floods`
- **Affected file:** `src/app/hazard-intelligence/floods/page.tsx`
- **Original condition:** Lines 161–194 evaluated `if (latest_discharge > forecast_peak * 0.9) live_risk_level = 'Very High'`. Whenever a river was receding or steady during dry winter baseflow (`latest_discharge >= forecast_peak`), the ratio exceeded `0.9` and triggered `'Very High'` flood risk across dry rivers.
- **Root cause:** Inverted comparison against forward 30-day forecast peak instead of historical high-flow / bankfull thresholds.
- **Supporting evidence:** `src/app/hazard-intelligence/floods/page.tsx:161-194` (`phase5_6_report.md` `[P0-6.3]`).
- **Corrective action:** Replaced the inverted ratio with a baseline-exceedance screening rule requiring both elevated absolute modeled discharge and significant positive departure above series median/climatology, labeled `'GloFAS v4 Modeled Discharge (~5 km Grid) — Screening Only'`.
- **Verification method:** `GUARD-11` automated check + dry-season discharge test vector (`20 m³/s` receding -> `'Low'`).
- **Current status:** `Resolved`
- **Remaining limitations:** GloFAS v4 ~5 km grid is uncalibrated against local J&K I&FC rating curves.

---

### `SCI-P0-002` — Unrealistic `150 m³/s` Jhelum Flood Inundation Threshold & False Agency Attribution in `/api/alerts/live`
- **Issue ID:** `SCI-P0-002`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/api/alerts/live` (and global header/alert banners)
- **Affected file:** `src/app/api/alerts/live/route.ts`
- **Original condition:** Triggered `'critical'` *"High Flood Inundation Warning"* for Srinagar Jhelum whenever GloFAS discharge exceeded `150 m³/s` (~5,300 cusecs, which is routine spring snowmelt; statutory flood declaration at Ram Munshi Bagh is ~900–1,000 m³/s), labeled Open-Meteo NWP grids as `"J&K Traffic Police Highway Monitor"` / `"SASE Reference"` / `'expert-verified'`, and geocoded all earthquakes solely to `'Kargil'` or `'Baramulla'`.
- **Root cause:** Arbitrary prototype threshold ~6× below bankfull channel capacity and over-claimed agency labels.
- **Supporting evidence:** `src/app/api/alerts/live/route.ts:80,118,192,260,325` (`[P0-6.4]`).
- **Corrective action:** Raised Srinagar Jhelum modeled screening thresholds to `650 m³/s` (warning) and `950 m³/s` (critical), replaced agency impersonation labels with `'Open-Meteo / GloFAS Gridded Model Screening'`, and implemented Haversine nearest-district seismic geocoding across all 46 canonical districts.
- **Verification method:** `/api/alerts/live` response verification.
- **Current status:** `Resolved`
- **Remaining limitations:** Official flood evacuation warnings remain the exclusive statutory authority of J&K I&FC, CWC, and PMD/FFD.

---

### `SCI-P0-003` — Synthetic Dal Lake Official Public Health Bathing Ban (`AL-BLM-DAL-01`) & 11 Fabricated Cyanotoxin Lab Assays
- **Issue ID:** `SCI-P0-003`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/hazard-intelligence/algal-bloom-intelligence`, `/api/hazard-intelligence/algal-blooms`
- **Affected file:** `src/data/algal-bloom-intelligence-hub.ts`, `src/app/api/hazard-intelligence/algal-blooms/route.ts`, `src/app/hazard-intelligence/algal-bloom-intelligence/page.tsx`
- **Original condition:** `AL-BLM-DAL-01` set `isOfficialHealthAdvisory: true` and `issuingBody: 'University of Kashmir Limnology Lab & KEW Water Sentinel'` based on a hardcoded `1.45 µg/L` Microcystin-LR reading; `laboratoryCyanotoxinCatalog` contained 11 synthetic sample IDs (`KU-LIM-2026-D04`, etc.) marked `chainOfCustodyVerified: true`; `algal-blooms/route.ts:82` mutated archived Sentinel-2 Chl-a by `+2.5 µg/L` when air temp exceeded `22 °C`; and hardcoded Chl-a values did not match the cited Mishra & Mishra (2012) polynomial.
- **Root cause:** Illustrative prototype records were flagged as verified chain-of-custody laboratory assays and official public health advisories.
- **Supporting evidence:** `algal-bloom-intelligence-hub.ts:274-440,2022-2587`, `algal-blooms/route.ts:82` (`[P0-6.13]`, `[P1-6.14]`).
- **Corrective action:** Withdrew `isOfficialHealthAdvisory: true`, quarantined all 11 synthetic lab cyanotoxin assays, removed the `+2.5 µg/L` mutation in `algal-blooms/route.ts`, recomputed optical Chl-a screening estimates consistently from Mishra & Mishra (2012) with explicit uncalibrated optical uncertainty bounds, and reclassified the 12 STP records as static audit/design references.
- **Verification method:** `GET http://localhost:3000/api/hazard-intelligence/algal-blooms` + UI inspection.
- **Current status:** `Resolved`
- **Remaining limitations:** Satellite NDCI in shallow macrophyte-rich Himalayan lakes requires boat-based phycocyanin/HPLC field calibration.

---

### `SCI-P1-004` — Zero-Snow Summer Wind Avalanche Trigger & SACHET Nationwide Keyword Ingestion Leak
- **Issue ID:** `SCI-P1-004`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/api/hazard-intelligence/avalanches`, `/api/hazard-intelligence/glofs`, `/api/hazard-intelligence/forest-fires`
- **Affected file:** `src/app/api/hazard-intelligence/avalanches/route.ts`, `src/app/api/hazard-intelligence/glofs/route.ts`, `src/app/api/hazard-intelligence/forest-fires/route.ts`
- **Original condition:** (1) `avalanches/route.ts` evaluated `windMaxKmh > 25` / `> 55` without checking `snowDepthM > 0`, triggering avalanche alerts on dry bare rock in July; (2) SACHET RSS parsers mixed generic hazard words (`'fire'`, `'lake'`, `'avalanche'`, `'heatwave'`) into district keyword arrays, importing non-Himalayan alerts from across India with `district: "HEATWAVE"`; (3) `past_days=7&forecast_days=1` summed 8 days of rain as `precip7d` and misclaimed `"DGRE SASE"`, `"Canadian FWI"`, `"NASA FIRMS"`, and `"Melting Degree-Days"`.
- **Root cause:** Unconditional boolean OR clauses on wind speed and single-pass keyword matching on nationwide CAP XML.
- **Supporting evidence:** `avalanches/route.ts:21-70,145-225`, `glofs/route.ts:15-190`, `forest-fires/route.ts:15-190` (`[P1-6.7..6.10]`).
- **Corrective action:** Gated wind avalanche rules on `snowDepthM >= 0.15 || snowfall72hCm >= 5`; enforced two-stage geographic pre-filtering (requiring J&K/Ladakh district/UT match before hazard classification); fixed 7-day window (`past_days=6&forecast_days=1`); replaced unsubstantiated agency/model names with `'Open-Meteo Gridded NWP Screening Heuristic'`.
- **Verification method:** Route code & JSON payload verification.
- **Current status:** `Resolved`
- **Remaining limitations:** NASA FIRMS active fire thermal hotspot ingestion awaits `NASA_FIRMS_MAP_KEY` provisioning.

---

### `SCI-P2-005` — Vollenweider `10⁻³` Unit Conversion Factor, Chick–Watson Kinetic Misnaming & `TN/TP` Chemical Conflation
- **Issue ID:** `SCI-P2-005`
- **Severity:** `P2 Moderate`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations/reports/dal-lake-three-decades-mechanical-dredging-ecological-defences`, `/environmental-investigations/methodology`, `/water-systems/lakes`
- **Affected file:** `src/data/environmental-investigations-published.ts`, `src/data/environmental-investigations-taxonomy.ts`, `src/data/water-systems.ts`
- **Original condition:** Vollenweider equation omitted `10⁻³` when converting `P_lake` (`µg/L` = `mg/m³`) to areal loading `L_p` (`g/m²/yr`); `k_T = k_20 · θ^(T-20)` (Arrhenius/van 't Hoff thermal correction) was labeled `"Chick–Watson"`; `water-systems.ts:4061-4066` mapped `totalNitrogenUgL / 1000` to `nitrates` and `totalPhosphorusUgL / 1000` to `phosphates`.
- **Root cause:** Dimensional shorthand and nutrient species conflation during schema reconciliation.
- **Supporting evidence:** `taxonomy.ts:395,525`, `published.ts:215`, `water-systems.ts:4061-4066` (`[P2-5.13]`, `[P2-6.16]`).
- **Corrective action:** Added explicit `10⁻³` dimensional conversion factor to Vollenweider equation, separated Chick–Watson (`ln(N_t/N_0) = -Λ C^n t`) from Arrhenius thermal correction (`k_T = k_20 θ^(T-20)`), and removed unmeasured `pH`/`DO`/`turbidity`/`nitrate`/`phosphate` imputation in `water-systems.ts`.
- **Verification method:** Equation dimensional check & TypeScript build check.
- **Current status:** `Resolved`
- **Remaining limitations:** None.
