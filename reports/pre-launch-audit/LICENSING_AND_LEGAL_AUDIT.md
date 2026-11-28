# Kashmir EcoWatch — Licensing, Open Data & Legal Consistency Audit (`Phase 8`)

**Audit Date:** November 27, 2026  
**Authoritative Registry:** `src/data/dataset-licensing-registry.ts`  
**Resolved Open License:** **`CC BY-NC 4.0` (Creative Commons Attribution-NonCommercial 4.0 International) with Explicit Third-Party, Sensitive-Species, Cultural & Software Carve-Outs**

---

## 1. Licensing Architecture & Legal Consistency Summary

Prior to remediation, Kashmir EcoWatch exhibited four major legal and licensing contradictions:
1. **Unpaired `"FAIR / Open Data"` Claims vs `"All Rights Reserved"` Footer:** Public pages promoted *"Open Data"* and *"FAIR Scientific Principles"* without specifying a Creative Commons license in `AdvancedFooter.tsx`, while `structured-data.ts` emitted unrestricted `CC BY 4.0` URLs that conflicted with KEW's non-commercial copyright notice.
2. **Re-Licensing of Third-Party Government & Journal Reports:** External statutory reports (ISRO NWIA, CAG of India, FSI ISFR, CWC, peer-reviewed journal articles) in the Research Library and dataset APIs were displayed under uniform KEW open-license badges, implying KEW owned or could re-license third-party copyright.
3. **Jurisdiction Mismatch Across Legal Pages:** `/legal-notice`, `/terms`, and `/privacy` contained inconsistent governing-law / jurisdiction wording (`'J&K, India'` vs international/platform operations).
4. **Broken Open Data Category Counter:** `/open-data` rendered `"Showing 52 of 50 Categories"`.

All public datasets, footers, legal notices, API metadata, and Schema.org `Dataset` JSON-LD blocks now enforce the six-tier `DATASET_LICENSE_POLICIES` framework in `src/data/dataset-licensing-registry.ts`.

---

## 2. Six-Tier Licensing Classification Matrix

| License Code | Scope of Covered Assets | Commercial Use | Redistribution Terms |
| :--- | :--- | :---: | :--- |
| `CC-BY-NC-4.0` | Eligible KEW-authored synthesis datasets, verified taxonomic/geographic reference registries, and desk-verified KEW matrices | **No** (Reserved) | Share & adapt for non-commercial academic, educational, journalistic & conservation use with attribution; **never** labeled `"unrestricted open data"` |
| `THIRD-PARTY-STATUTORY-OR-AGENCY` | Government atlases/audits (ISRO NWIA, FSI ISFR, CWC, CAG, Census, Ramsar RSIS), judicial orders, and indexed journal papers | Governed by Owner | Original statutory/publisher copyright retained; KEW provides bibliographic metadata & external links only |
| `THIRD-PARTY-OPEN-ATTRIBUTION` | Upstream external feeds (Open-Meteo CC BY 4.0 non-commercial tier, Copernicus CAMS/GloFAS/Sentinel-2, USGS Public Domain, AirGradient CC BY-SA 4.0) | Per Upstream License | Upstream attribution & non-commercial API terms preserved |
| `RESTRICTED-CONSERVATION-SENSITIVE` | Exact GPS coordinates of `CR/EN` poaching-sensitive wildlife (Hangul, Snow Leopard, Markhor, Musk Deer, Tragopan, Black-necked Crane nests) | **Restricted** | Masked or generalized to `>=10 km` / district grids under IUCN Sensitive Data Guidelines |
| `CULTURAL-ARTIST-RIGHTS-RESERVED` | EcoVoices musical compositions, vocal recordings, poetic lyrics, and artist photography | **No** | Specific artist & cultural heritage rights reserved |
| `PROPRIETARY-PLATFORM-SOFTWARE` | KEW web application source code, UI architecture, visual identity, and trademarks | **No** | `© 2026 Kashmir EcoWatch. All rights reserved.` |

---

## 3. Licensing & Legal Issue Register

### `LIC-P0-001` — Third-Party Statutory & Academic Publications Carrying KEW Open-License Claims
- **Issue ID:** `LIC-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/library`, `/open-data`, `/api/datasets/[category]/[id]`
- **Affected file:** `src/data/dataset-licensing-registry.ts`, `src/data/research-library.ts`, `src/app/open-data/page.tsx`, `src/app/api/datasets/[category]/[id]/route.ts`, `src/components/common/ScientificPublicationStandard.tsx`
- **Original condition:** External agency reports and peer-reviewed papers in the library/open-data modules carried generic KEW open-access license labels without distinguishing KEW-authored synthesis tables from third-party copyrighted works.
- **Root cause:** Single default license string applied across mixed first-party and third-party catalog items.
- **Supporting evidence:** Phase 8 audit (`phase7_8_9_12_report.md`).
- **Corrective action:** Implemented `resolveLicenseForLibraryOwner()` in `src/data/dataset-licensing-registry.ts`, explicitly tagging external agency/journal works `'Third-Party Statutory / Publisher Rights Retained'` and restricting `CC BY-NC 4.0` strictly to eligible KEW-authored synthesis datasets and reports.
- **Verification method:** `/open-data` and `/api/datasets/*` metadata check.
- **Current status:** `Resolved`
- **Remaining limitations:** None.

---

### `LIC-P1-002` — Missing `CC BY-NC 4.0` Footer Attribution, Conflicting `CC BY 4.0` JSON-LD & `"52 of 50 Categories"` Bug
- **Issue ID:** `LIC-P1-002`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** All routes (Footer & JSON-LD), `/open-data`, `/legal-notice`, `/terms`, `/privacy`
- **Affected file:** `src/components/layout/AdvancedFooter.tsx`, `src/lib/seo/structured-data.ts`, `src/app/open-data/page.tsx`, `src/app/legal-notice/page.tsx`, `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`
- **Original condition:** Footer claimed FAIR/Open Data alongside `"All rights reserved"` without naming `CC BY-NC 4.0`; `structured-data.ts` used `creativecommons.org/licenses/by/4.0/`; `/open-data` displayed `"Showing 52 of 50 Categories"` and `"unrestricted"` wording; legal pages had inconsistent jurisdiction clauses.
- **Root cause:** Uncoordinated legal copy and hardcoded denominator `50` on `/open-data`.
- **Supporting evidence:** `AdvancedFooter.tsx`, `open-data/page.tsx:606`, `structured-data.ts`.
- **Corrective action:** Added explicit `CC BY-NC 4.0` non-commercial dataset/research license notice (with third-party, wildlife-coordinate, cultural, and software carve-outs) to `AdvancedFooter.tsx`, `/open-data`, `/legal-notice`, `/terms`, and `structured-data.ts` (`https://creativecommons.org/licenses/by-nc/4.0/`); fixed dynamic category count on `/open-data`; harmonized legal notices across `/legal-notice`, `/terms`, and `/privacy`.
- **Verification method:** `GUARD-15` automated check + footer/JSON-LD verification.
- **Current status:** `Resolved`
- **Remaining limitations:** Formal legal counsel review recommended prior to executing external institutional data-sharing agreements.
