# Kashmir EcoWatch — Complete File Change Manifest (`Phase 14`)

**Audit & Remediation Date:** November 27, 2026  
**Baseline Commit:** `8b01806f71ba9259f2f26112afab90a0528716da` (`master`)  
**Git Push / Production Modification:** **NONE (`Localhost Only`)**

---

## 1. Newly Created Architecture, Registry, Guard & Route Files (`13` Platform Files + `25` Audit Reports)

### Core Scientific Provenance, Security & Export Infrastructure (`8` files)
1. `src/lib/scientific-integrity/quarantine-gateway.ts` — 11-class provenance gateway & `DATASET_QUARANTINE_MANIFEST`
2. `src/data/geographic-registry.ts` — Canonical 5 subregions, 46 baseline (+5 2024 Ladakh) districts, bioclimatic envelopes, tehsil normalizer & 7 RSIS Ramsar sites
3. `src/data/monitoring-infrastructure-registry.ts` — 17-field external feed & benchmark registry (`KEW_OWNED_PHYSICAL_SENSORS_COUNT = 0`)
4. `src/data/platform-metrics.ts` — Centralized 14-field provenance-backed headline metrics
5. `src/data/dataset-licensing-registry.ts` — `CC BY-NC 4.0` + 5 carve-out licensing policy registry
6. `src/data/authoritative-source-connectors.ts` — 15-field external API & statutory archive connector registry
7. `src/lib/xlsx-minimal.ts` — Zero-dependency OpenXML `.xlsx` multi-sheet ZIP archive builder (replacing `xlsx@0.18.5`)
8. `scripts/audit/scientific-data-integrity-guard.js` — Automated 15-rule CI/build scientific, geospatial, legal & security guard

### Newly Created SSR / SSG & Barrel Modules (`5` files)
9. `src/app/governance/page.tsx` — Standalone indexable SSR `/governance` portal route
10. `src/app/governance/GovernancePortalView.tsx` — Pure Server Component governance & scientific charter view
11. `src/app/atlas/AtlasLeafletCanvas.tsx` — Isolated client Leaflet map wrapper allowing SSR `/atlas` layer catalog
12. `src/app/environmental-investigations/reports/[slug]/InvestigationReportClientView.tsx` — Hydrated report view paired with server `generateStaticParams()`
13. `src/data/species/index.ts` — Verified core species barrel (`239` verified taxa + quarantine disclosures)

---

## 2. Modified Existing Repository Files by Remediation Workstream

### Workstream 1 — Security Containment, Session Signing, WebRTC, SSRF & Config (`28` files)
- `.env.example`, `next.config.js`, `package.json`, `src/auth.ts`, `src/lib/seo/admin-session.ts`
- `src/context/AuthContext.tsx`, `src/components/seo/JsonLd.tsx`
- `src/app/admin/dashboard/page.tsx`, `src/app/admin/data-integrity/page.tsx`, `src/app/admin/gis-quality/page.tsx`, `src/app/admin/system/errors/page.tsx`, `src/app/preview-error/page.tsx`
- `src/app/api/admin/session/route.ts`, `src/app/api/admin/system/errors/{route,stream/route,test/route}.ts`
- `src/app/api/ingest/telemetry/route.ts`, `src/app/api/cron/ingest/route.ts`, `src/app/api/operations/route.ts`, `src/app/api/submissions/route.ts`, `src/app/api/search/health/route.ts`
- `src/app/api/sectoral-eia/{reports,assessments}/route.ts`, `src/app/api/sectoral-eia/reports/[code]/dataset/route.ts`, `src/app/api/environmental-investigations/route.ts`
- `src/app/api/himalayan-dispatch/hdn/admin/route.ts`, `src/app/api/webinars/{admin,recordings,room/[id]}/route.ts`
- `src/lib/hdn/{rbac,store}.ts`, `src/lib/himalayan-dispatch-store.ts`, `src/lib/virtual-hall-store.ts`, `src/lib/hd-anie/security.ts`
- `src/data/trails-observations.ts`, `src/app/protected-network/trails-and-sightings/page.tsx`

### Workstream 2 — Biodiversity, Hydrology, Geography, Ramsar & District Taxonomy (`18` files)
- `src/data/species/{plants,birds,fish,mammals,medicinal,threatened}.ts`, `src/app/biodiversity/page.tsx`
- `src/data/water-systems.ts`, `src/data/nwia-references.ts`, `src/app/water-systems/nwia-classification/page.tsx`, `src/data/geojson/wetlands.json`
- `src/data/algal-bloom-lakes.ts`, `src/data/protected-network.ts`
- `src/data/geography.ts`, `src/app/geographic-scope/page.tsx`
- `src/data/districts-intelligence.ts`, `src/data/biodiversity-intelligence.ts`, `src/app/districts/[slug]/page.tsx`, `src/app/biodiversity/district/[slug]/page.tsx`

### Workstream 3 — Live Telemetry, Sensors, Hazard APIs, Alerts Unification & Headline Metrics (`35` files)
- `src/components/sections/{ImmersiveHero,CinematicIntroduction,ExpandableLivePanels,DistrictIntelligenceStrip,NextGenDashboardPreview,AlertResponseSystem}.tsx`, `src/lib/data.ts`
- `src/data/monitoring-registry.ts`, `src/data/air-quality-registry.ts`, `src/app/api/environmental-monitoring/air-pollution/route.ts`
- `src/app/api/floods/live/route.ts`, `src/app/hazard-intelligence/floods/page.tsx`
- `src/app/api/alerts/live/route.ts`, `src/data/alert-registry.ts`, `src/hooks/useLiveAlerts.ts`, `src/components/navigation/{MobileQuickTelemetryBar,NotificationDropdown}.tsx`
- `src/app/api/hazard-intelligence/{glofs,avalanches,forest-fires,landslides,flash-floods,earthquakes,algal-blooms,jet-stream-circulation,monsoon-dynamics,western-disturbances}/route.ts`, `src/app/api/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/route.ts`, `src/lib/engines/monsoon-dynamics-engine.ts`
- `src/data/algal-bloom-intelligence-hub.ts`, `src/app/hazard-intelligence/algal-bloom-intelligence/page.tsx`
- `src/app/biodiversity/forest-ecosystems/page.tsx`, `src/data/wildlife-corridors.ts`, `src/data/risk-monitoring-command-center.ts`, `src/data/seasonal-intelligence.ts`

### Workstream 4 — Investigations, 101 Sectoral Dossiers, Judicial PIL, Institutional Profiles, Founder Edit & Licensing (`40` files)
- `src/data/environmental-investigations{-published,-portfolio,-series-16,-transport-13,-economics-15,-taxonomy,}.ts`, `src/data/environmental-economics-fiscal-evidence.ts`, `src/types/environmental-investigations.ts`, `src/app/environmental-investigations/page.tsx`
- `src/data/verified-external-evidence-corpus-100.json`, `src/data/report-scientific-registries-100.ts`, `src/data/dossiers/cohort-25.ts`, `src/app/sectoral-eia/page.tsx`, `src/data/sectoral-eia.ts`, `src/components/sectoral-eia/ScientificReportPublicationView.tsx`, `src/data/evidence-intelligence.ts`, `src/app/earth-human-impact/scientific-reports/page.tsx`, `src/app/earth-human-impact/change-detection-observatory/scientific-dossiers/page.tsx`, `src/data/scientific-program-2027-2028.ts`
- `src/data/environmental-pil.ts`
- `src/app/about/{page,founder/page,contributors/page,partners/page,csr-collaborations/page}.tsx`, `src/data/csr-collaborations.ts`, `src/data/conference-system.ts`, `src/data/webinars.ts`, `src/components/webinars/ConferenceConflictScheduler.tsx`, `src/app/webinars/create/page.tsx`, `src/app/webinars/conferences/[conferenceId]/proceedings/page.tsx`, `src/data/kew-green-heroes.ts`
- `src/components/sections/AdvancedFooter.tsx`, `src/app/open-data/page.tsx`, `src/app/legal-notice/page.tsx`, `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/components/seo/ScientificPublicationStandard.tsx`, `src/app/api/datasets/[category]/[id]/route.ts`

### Workstream 5 — SSR Pre-Rendering, Sitemap, Redirects, Broken Links & Himalayan Dispatch Disclosures (`50+` files)
- `src/app/about/governance/page.tsx`, `src/app/resources/environmental-pil/page.tsx`, `src/app/resources/kew-green-heroes/page.tsx`, `src/components/green-heroes/GreenHeroesSubNav.tsx`, `src/app/hazard-intelligence/forest-fires/page.tsx`, `src/app/seasonal-ecology/page.tsx`, `src/app/atlas/{page,AtlasClient}.tsx`, `src/app/environmental-investigations/reports/[slug]/page.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo/{sitemap-validator,route-metadata,structured-data}.ts`, `src/proxy.ts`
- `src/data/research-portfolio-100-expansion.ts`, `src/app/module-directory/page.tsx`, 17 `src/app/risk-monitoring/**/page.tsx` pages
- `src/types/{himalayan-dispatch,hd-anie}.ts`, `src/lib/hd-anie/{writer-verifier,intelligence,sources-seed}.ts`, `src/lib/himalayan-dispatch-metrics.ts`, `src/components/himalayan-dispatch/{StoryReaderClient,DailyDispatchClient,DepartmentsExplorerClient,RegionalBureausClient}.tsx`, `src/components/himalayan-dispatch/hdn/{JournalistModules,ReviewModules}.tsx`, `src/app/himalayan-dispatch/{daily-dispatch/[slug]/page,feed.xml/route,source-protection-verification/page,public-editor/page}.tsx`, `src/data/{himalayan-dispatch,himalayan-dispatch-price-of-paradise,himalayan-dispatch-autonomous}.ts`, and `src/data/himalayan-dispatch-stories/story-02..10*.ts`

### Workstream 6 — Pre-Launch Audit Reports (`25` files)
- `reports/pre-launch-audit/*.md` (all 25 required audit, quarantine, lineage, verification, reconstruction, and readiness deliverables)
