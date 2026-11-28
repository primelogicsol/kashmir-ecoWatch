# Kashmir EcoWatch — API & Data Pipeline Audit (`Phases 3, 6 & 10`)

**Audit Date:** November 27, 2026  
**Total API Route Handlers Audited:** **`72` (`src/app/api/**/route.ts`)**  
**Status:** **REMEDIATED (`100%` Mutation/PII Routes Authenticated, `0` Synthetic Telemetry Pipelines, Upstream Refresh Cooldown Active)**

---

## 1. Portfolio Classification of All 72 API Endpoints

| API Functional Group | Endpoint Count | Authentication & Rate-Limit Posture | Scientific Data Provenance Posture |
| :--- | :---: | :--- | :--- |
| **1. Synoptic Meteorology & Atmospheric Systems** (`/api/hazard-intelligence/{western-disturbances,jet-stream-circulation,monsoon-dynamics,extreme-weather/extreme-rainfall-cloudbursts}`) | **4** | Public `GET`; `?refresh=1` guarded by 60s `allowForcedUpstreamRefresh()` cooldown | Live Open-Meteo ECMWF IFS / NOAA GEFS 31-member ensemble; explicit `ANALYZED_PAST` / `NWP_FORECAST` & terrain-masking metadata |
| **2. Multi-Hazard & Seismic Feeds** (`/api/hazard-intelligence/{earthquakes,landslides,flash-floods,glofs,avalanches,forest-fires,algal-blooms}`, `/api/alerts/live`, `/api/floods/live`) | **9** | Public `GET` with 5–30 min caching + refresh cooldown | Real USGS/EMSC/NCS seismic catalog + NDMA SACHET (J&K/Ladakh filtered) + Open-Meteo NWP screening; `/api/floods/live` serves static statutory thresholds (`isLiveTelemetry: false`); `algal-blooms` serves static archived Sentinel-2 NDCI without live temp mutation |
| **3. Environmental Monitoring** (`/api/environmental-monitoring/air-pollution`) | **1** | Public `GET` + 60s refresh cooldown | Real AirGradient community PM2.5 (Srinagar, Jammu, Leh) + ECMWF CAMS ~11 km modeled gases (sole source for Muzaffarabad & Gilgit, `is_ground_truth: false`) |
| **4. Telemetry Ingestion & Scheduled Cron** (`/api/ingest/telemetry`, `/api/cron/ingest`) | **2** | **Protected** by `verifyCronOrIngestRequest()` (`INGEST_API_KEY` / `CRON_SECRET` Bearer or Admin cookie) + strict physical range validation | Removed `Math.random()` fake `'Open-Meteo-NWP'`; fetches real Open-Meteo gridded NWP or returns `503 EXTERNAL_SOURCE_UNAVAILABLE` |
| **5. Platform Administration, Error NOC & Health** (`/api/admin/session`, `/api/admin/system/errors*`, `/api/search/health`, `/api/health/db`, `/api/indexnow/*`) | **9** | **Protected** by `verifyAdminRequest()` (`kew_adm2.` HttpOnly v2 HMAC cookie or `ADMIN_API_KEY`) + 10/15m login rate limit | Internal operational diagnostics (`X-Robots-Tag: noindex`) |
| **6. Research Dossiers, Investigations & Dataset Exports** (`/api/sectoral-eia/**`, `/api/environmental-investigations`, `/api/datasets/[category]/[id]`) | **8** | Public `GET` for published records; **Admin-protected** `PATCH` & `create_investigation` & `?proposals=true` & `GET /assessments` | Exports CSV, JSON, GeoJSON, and zero-dependency `.xlsx` (`src/lib/xlsx-minimal.ts`) with `CC BY-NC 4.0` / third-party license headers |
| **7. Contributor Intake & Operations** (`/api/operations`, `/api/submissions`) | **2** | Public `POST` intake + single `?trackingId=` lookup (masked email); **Admin-protected** full `GET` & `PATCH` | Prevents contributor email harvesting |
| **8. Himalayan Dispatch, HDN Newsroom & HD-ANIE** (`/api/himalayan-dispatch/**`) | **21** | RBAC-protected (`hdn_newsroom_session` v2 HMAC, `hd_journalist_session` v2 HMAC, `verifyAdminRequest`); SSRF DNS/redirect guard on HD-ANIE | Preserves `isAiAssisted` & original `authors`; AES-256-GCM encrypts Tier III confidential source notes; strips `plainAccessCodeHint` |
| **9. Webinars & Virtual Scientific Hall** (`/api/webinars/**`) | **10** | `kew_vh2.` HMAC room tokens + `verifyAdminRequest` + `verifyWebinarAdminPasscode` + room-match & `peerId`-collision guards | Enforces Phase I delegate/recording quotas & explicit recording consent |
| **10. Search, Auth & Public Utility Endpoints** (`/api/search/**`, `/api/auth/[...nextauth]`, etc.) | **6** | Public read-only search over non-quarantined corpus; NextAuth OAuth handlers | Excludes quarantined records via source registries |

---

## 2. Pipeline Reliability & Failure-Mode Guarantees

1. **Zero Silent Synthetic Substitution on Upstream Failure:** Previously, `landslides/route.ts`, `flash-floods/route.ts`, `air-pollution/route.ts`, and `cron/ingest/route.ts` fell back to hardcoded or `Math.random()` values labeled `"Live Telemetry"` when Open-Meteo timed out. All pipelines now return explicit `EXTERNAL_SOURCE_UNAVAILABLE` / `UNAVAILABLE` or `'Historical Reference Only'` status flags without fabricating measurements.
2. **Strict SACHET Geographic Pre-Filtering:** Common Alerting Protocol XML items from `sachet.ndma.gov.in` must match a verified J&K or Ladakh district/UT name before any hazard keyword (`flood`, `avalanche`, `fire`, `heatwave`) is evaluated, preventing nationwide alert leakage.
3. **Database Write Containment:** All Prisma / `pg` write routes (`observations_ts`, `forecasts_ts`, `research_submissions`, PostgreSQL search sync) require authenticated tokens or validated contributor intake payloads.
