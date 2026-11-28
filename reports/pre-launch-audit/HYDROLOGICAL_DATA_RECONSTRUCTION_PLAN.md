# Kashmir EcoWatch — Hydrological, Limnological & Cryospheric Data Reconstruction Plan

**Audit Date:** November 27, 2026  
**Scope:** `water-systems.ts`, `master-lake-registry.ts`, `nwia-references.ts`, `algal-bloom-lakes.ts`, `algal-bloom-intelligence-hub.ts`, `/api/floods/live`, `/hazard-intelligence/floods`

---

## 1. Dataset Counts & Remediation Summary

| Hydrological Dataset | Source File | Original | Verified | Quarantined | Unverified | Corrected | Post-Remediation Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Watersheds / River Basins | `src/data/water-systems.ts` | 374 | **28** | **374** | 0 | 28 | 28 Verified Indus/Jhelum/Chenab/Shyok/Zanskar/Gilgit Basins |
| Master Lake & Wetland Registry | `src/data/hydrology/master-lake-registry.ts` | 553 | **553** (spatial/inventory) | **0** | 531 (limnology) | 553 | `22` with Carlson TSI literature; `531` honestly marked `'Insufficient Evidence'` |
| Algal Bloom Lake Coordinates | `src/data/algal-bloom-lakes.ts` | 63 | **63** | **0** | 0 | **52** | All 17 `[34.0, 74.8]` + 35 town-centroid pins moved to real waterbodies |
| Algal Bloom Cyanotoxin Lab Assays | `src/data/algal-bloom-intelligence-hub.ts` | 11 | **0** | **11** | 0 | 11 | Quarantined synthetic `KU-LIM-2026-*` assays & withdrew fake bathing ban |
| STP Effluent Records | `src/data/algal-bloom-intelligence-hub.ts` | 12 | **0** (live) | **0** | 12 | 12 | Reclassified from live OCEMS telemetry to static design/audit benchmarks |
| Flood Gauge Benchmarks | `src/app/api/floods/live/route.ts` | 12 | **12** (thresholds) | **12** (live heights) | 0 | 12 | Stripped `new Date()` & fake CWC live telemetry label; statutory thresholds retained |

---

## 2. Key Hydrological Corrections Implemented

1. **Watershed Topology Reconstruction (`water-systems.ts`):** Purged all 374 procedurally scrambled watersheds (including impossible `"Kathua Coastal Watershed"` entries) and established **28 hydrologically verified river basins and principal tributary sub-basins** aligned with the Indus Waters Treaty / CWC Indus Basin hydrographic hierarchy.
2. **ISRO NWIA (2011) Reconciliation (`nwia-references.ts`):** Eliminated Bandipora/Ganderbal double-counting (`46,713 ha -> 42,663 ha` across all 10 Kashmir Valley districts including Shopian & Kulgam) and clarified that `391,501 ha` (`3,654` wetlands including `2,106` high-altitude wetlands) covers the entire erstwhile State of J&K **inclusive of Ladakh**.
3. **Chemical & Limnological Non-Conflation (`water-systems.ts:4047-4087`):** Stopped `reconcileWaterEntitiesWithMasterRegistry()` from substituting fabricated `pH: 7.4`, `DO: 7.5`, `8 / Secchi` turbidity, or mapping Total Nitrogen (`TN`) / Total Phosphorus (`TP`) into dissolved `nitrates` / `phosphates`.
4. **Inverted GloFAS Flood Risk Fix (`floods/page.tsx:161-194`) & `/api/alerts/live` Jhelum Threshold Fix:** Replaced the inverted `latest_discharge > forecast_peak * 0.9` condition (which flagged dry winter baseflows as `'Very High'` flood risk) and raised Srinagar Jhelum modeled screening thresholds from `150 m³/s` (ordinary spring snowmelt) to `650 m³/s` (warning) / `950 m³/s` (critical), explicitly labeled as **Copernicus GloFAS v4 (~5 km) Modeled Discharge**.
5. **Sentinel-2 Optical Limnology Integrity (`algal-blooms/route.ts`, `algal-bloom-intelligence-hub.ts`):** Removed the `+2.5 µg/L` live weather mutation on archived Sentinel-2 retrievals, recomputed `chlorophyllAEstimateUgL` accurately from the Mishra & Mishra (2012) NDCI polynomial with explicit uncalibrated optical uncertainty disclosures, and withdrew the synthetic `AL-BLM-DAL-01` official public health bathing advisory.

---

## 3. Multi-Stage Authoritative Hydrological Reconstruction Roadmap

1. **Stage 1 — HydroSHEDS / HydroBASINS GIS Delineation:** Import Lehner & Grill (2013) HydroBASINS Level 6–8 polygons clipped to the 5 Western Himalayan subregions, replacing point/bounding-box catchment representations with topologically closed DEM drainage divides.
2. **Stage 2 — CWC / India-WRIS & PMD Historical Gauge Series:** Compile published historical monthly discharge and statutory danger/warning gauge levels (Sangam, Ram Munshi Bagh, Asham, Akhnoor, Leh Indus, Muzaffarabad Domel, Gilgit Alam Bridge) with explicit observation period citations.
3. **Stage 3 — GLIMS / RGI v7.0 & ICIMOD Cryosphere Inventory:** Link glacier entities (Kolahoi, Machoi, Thajiwas, Parkachik, Drang-Drung, Siachen, Baltoro, Biafo, Hispar, Batura, Passu) to Randolph Glacier Inventory v7.0 IDs and Hugonnet et al. (2021, *Nature*) geodetic mass-balance rates (`m w.e. yr⁻¹` ± uncertainty).
4. **Stage 4 — Calibrated Optical Limnology:** Pair Copernicus Data Space Sentinel-2 L2A scene ingestion with published Dal, Wular, Manasbal, and Anchar boat-transect datasets before enabling operational Chlorophyll-a concentration alerts.
