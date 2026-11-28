# Kashmir EcoWatch — Headline Metric Provenance Register (`Phase 2`)

**Audit Date:** November 27, 2026  
**Single Source of Truth:** `src/data/platform-metrics.ts`  
**Headline Metrics with Full Provenance:** **100% (`11 / 11` Core Platform Headline Metrics)**

---

## 1. Resolution of Cross-Page Counter Contradictions

Prior to remediation, public pages exhibited severe numerical drift across identical ecological concepts:
- **Subregions & Districts:** Homepage alternated between `20` J&K districts and `5` regions; `/environmental-investigations` computed `21` districts due to `'Pampore'` tehsil inclusion; `/about/geographic-scope` and `districts-intelligence.ts` varied between `46`, `51`, and `52`.
- **Protected Areas:** Homepage alternated between `182`, `47`, and `32`, while `/about` claimed `150+ Protected Habitats` and `protected-network.ts` included `2` out-of-scope Himachal Pradesh parks (`47 -> 45`).
- **Lakes & Wetlands:** `route-metadata.ts:496` stated `62` lakes, `master-lake-registry.ts` cataloged `553` waterbodies, `nwia-references.ts` double-counted Bandipora/Ganderbal (`46,713 ha` vs `42,663 ha`) and misattributed statewide `2,106` high-altitude wetlands (`J&K + Ladakh`) solely to Kashmir Valley, and Ramsar counts varied from `5` to `15` (vs `7` official RSIS sites).
- **Methodology Sections:** `/about` cited a `"19-section methodology"` twice while Investigations used a `"24-section scientific investigation"` template (conflating the **19-stage** Sectoral Research workflow with the **24-section** KEW-EIAI forensic investigation report structure).
- **Open Data Categories:** `/open-data` rendered `"Showing 52 of 50 Categories"`.

All public counters now resolve to `src/data/platform-metrics.ts`.

---

## 2. Canonical 14-Field Headline Metric Provenance Table

| Metric ID | Display Label | Canonical Value | Unit | Geographic Scope | Methodology & Source Module | Primary Data Source | Last Verified | Update Cadence | Provenance Class | Caveat / Uncertainty |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `MET-GEO-01` | Western Himalayan Subregions | **5** | subregions | Kashmir Valley, Jammu Region, Ladakh, AJ&K, Gilgit-Baltistan | Exact count of `CANONICAL_SUBREGIONS` (`src/data/geographic-registry.ts`) | Administrative gazettes & Indus-Jhelum basin boundaries | 2026-11-27 | Static | `government_statutory_record` | Statutory Indian datasets (NWIA, FSI, CAG) cover J&K and Ladakh only |
| `MET-GEO-02` | Operational Baseline Districts | **46** | districts | `10` KV + `10` Jammu + `2` Ladakh + `10` AJ&K + `14` GB | Exact count of `CANONICAL_DISTRICTS` (`src/data/geographic-registry.ts`) | Census / GAD / PBS / GB Planning registries | 2026-11-27 | Annual | `government_statutory_record` | Excludes `5` newly announced Aug 2024 Ladakh districts (`51` total notified) pending GIS boundary gazettes |
| `MET-WET-01` | Designated Ramsar Wetlands | **7** | Ramsar sites | J&K (`5`: `#461, #1570, #1573, #2488, #2496`) & Ladakh (`2`: `#1213, #2443`) | Verified 1:1 against official RSIS sheets (`src/data/geographic-registry.ts`) | Ramsar Sites Information Service (RSIS) | 2026-11-27 | Upon RSIS inscription | `government_statutory_record` | Domestic Wetland Reserves (e.g., Mirgund) are non-Ramsar |
| `MET-SEN-01` | KEW-Owned Physical Field Sensors | **0** | physical stations | Platform-wide | Direct hardware asset audit (`src/data/monitoring-infrastructure-registry.ts`) | KEW Infrastructure Audit | 2026-11-27 | Continuous | `editorial_synthesis` | All live feeds aggregate external public agency/community/NWP APIs |
| `MET-PA-01` | Verified Protected Areas Mapped | **45** | protected areas | 5 Western Himalayan Subregions | Filtered in-scope count of `protectedAreasData` (`src/data/protected-network.ts`, excluding 2 HP parks) | J&K, Ladakh, AJ&K & GB Wildlife Depts | 2026-11-27 | Quarterly | `government_statutory_record` | Smaller forest/game reserves undergoing boundary digitization |
| `MET-BIO-01` | Verified Species Reference Profiles | **239** | verified species | Western Himalayan Bioregions | Dynamic sum of non-quarantined species (`111` mammals + `46` birds + `54` fish + `28` reference flora) | IUCN, WII, FishBase & KU monographs | 2026-11-27 | Incremental | `peer_reviewed_literature` | Curated verified reference subset (`2,368` synthetic placeholders quarantined) |
| `MET-HYD-01` | Cataloged Lakes & Wetlands | **553** | waterbodies | `521` KV + `32` Jammu/Ladakh/AJK/GB | Direct count of `MASTER_LAKE_REGISTRY` (`src/data/hydrology/master-lake-registry.ts`) | ISRO NWIA, WISA, LCMA & limnology literature | 2026-11-27 | Semi-annual | `government_statutory_record` | `22` lakes have published Carlson TSI limnology; `531` satellite-inventoried |
| `MET-HYD-02` | ISRO NWIA Mapped Wetland Area | **391,501** | hectares | Erstwhile State of J&K (incl. Ladakh) | Published statutory atlas table (`src/data/nwia-references.ts`); KV 10-district sum = `42,663 ha` | ISRO SAC National Wetland Atlas (2011) | 2026-11-27 | 2006–07 baseline | `government_statutory_record` | Includes `2,106` high-altitude wetlands across J&K + Ladakh combined |
| `MET-HYD-03` | Verified River Basins & Sub-Basins | **28** | basins & sub-basins | Indus, Jhelum, Chenab, Ravi, Shyok, Zanskar, Gilgit, Neelum, Poonch | Reconstructed verified hydrographic hierarchy (`src/data/water-systems.ts`) | CWC Indus Basin Atlas & HydroSHEDS | 2026-11-27 | Static | `government_statutory_record` | `374` scrambled sub-watershed placeholders quarantined |
| `MET-INV-01` | Environmental Investigation Charters | **53** | records | Western Himalayas | Exact count of `ALL_ENVIRONMENTAL_INVESTIGATIONS` (`2` Desk-Verified Canonical, `3` Active, `22` Scoping, `26` Proposed) | KEW-EIAI Registry (24-section template) | 2026-11-27 | Per stage | `editorial_synthesis` | Independently externally peer-reviewed count = `0` |
| `MET-RES-01` | Sectoral EIA & Research Dossiers | **101** | dossiers | 23 Environmental Sectors | Exact count of `KEW-SR-2026-01..101` (19-stage internal editorial workflow) | KEW Sectoral Research Portfolio | 2026-11-27 | Continuous | `editorial_synthesis` | External human peer review pending across all `101` dossiers |

---

## 3. Issue Register (`Phase 2` Metric Contradictions)

### `MET-P1-001` — Multi-Page Contradictions in Protected Areas, Lakes, Districts, Methodology & Open Data Counts
- **Issue ID:** `MET-P1-001`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/`, `/about`, `/open-data`, `/water-systems`, `/protected-areas`, `/biodiversity`
- **Affected file:** `src/data/platform-metrics.ts`, `src/components/home/ImmersiveHero.tsx`, `src/components/home/DistrictIntelligenceStrip.tsx`, `src/components/home/NextGenDashboardPreview.tsx`, `src/app/about/page.tsx`, `src/app/open-data/page.tsx`, `src/data/nwia-references.ts`, `src/lib/seo/route-metadata.ts`, `src/lib/data.ts`
- **Original condition:** Public pages displayed mutually incompatible counts (`182`/`150+`/`47`/`32` protected areas; `62` vs `553` lakes; `"Showing 52 of 50 Categories"`; `46,713 ha` double-counted NWIA valley wetland area; `"19-section"` vs `"24-section"` methodology confusion).
- **Root cause:** Hardcoded JSX copy written at different stages of repository growth without a central provenance ledger.
- **Supporting evidence:** Phase 2 audit (`phase2_3_report.md`).
- **Corrective action:** Created `src/data/platform-metrics.ts` and synchronized all headline counters, NWIA district sums (`42,663 ha` KV / `391,501 ha` J&K+Ladakh), Open Data category counts, SEO metadata (`553` waterbodies), and explicit distinction between the `19-stage` Sectoral Research workflow and `24-section` KEW-EIAI Investigation report template.
- **Verification method:** Cross-route counter audit + `GUARD-03` check.
- **Current status:** `Resolved`
- **Remaining limitations:** None.
