# Kashmir EcoWatch — Regression, Build & Live HTTP Verification Results (`Phase 13`)

**Verification Date:** November 27, 2026  
**Target Server:** `http://localhost:3000` (Next.js 16.2.9)  
**Overall Build & Regression Status:** **PASS (`712/712` Pages Built, `15/15` Guard Rules Passed, `34/34` Live HTTP/API Checks Passed)**

---

## 1. Production Build & Compiler Verification

| Verification Suite | Command Executed | Result | Details |
| :--- | :--- | :---: | :--- |
| **Next.js 16 Production Compilation & Prerender** | `NEXT_DIST_DIR=.next-prod-verify npx next build` | **PASS (`Exit 0`)** | Compiled in `27.4s`; pre-rendered **`712 / 712`** static (`○`) and SSG (`●`) pages across 19 workers in `5.0s` (including `/water-systems/nwia-classification`, `/governance`, `/resources/environmental-pil`, and all 53 `KEW-INV-*` investigation slugs). |
| **TypeScript Verification on All Remediated Files** | `npx tsc --noEmit --incremental false` | **PASS (`0` New Errors)** | `0` TypeScript errors introduced across all newly created and remediated files (`baseline_susceptibility` Prisma field in `api/ingest/telemetry/route.ts` caught and fixed during verification). |
| **Automated 15-Rule Integrity Guard** | `npm run audit:scientific-integrity` | **PASS (`15 / 15`)** | Scanned `1,761` files in `src/` + `package.json`; `0` failures. |
| **Turbopack Routing Root-Cause Diagnostic** | Clean `NEXT_DIST_DIR` `next dev` & `next build` | **VERIFIED** | Proved prior Turbopack 404s on 2+ segment routes were caused solely by stale `.next/dev` persistent cache state; Turbopack production build succeeded cleanly across all `712` routes, and Next.js 16 `images.qualities: [75, 85]` warning was resolved in `next.config.js`. |

---

## 2. Live HTTP, SSR Content, Redirect & Security API Suite (`http://localhost:3000`)

All **34** automated end-to-end HTTP checks against the live localhost server passed:

| Check Category | Tested Endpoints / Routes | Expected Outcome | Measured Result |
| :--- | :--- | :--- | :---: |
| **SSR Pre-Rendered Portals (`18` routes)** | `/`, `/governance`, `/about/governance`, `/about/founder`, `/about`, `/about/contributors`, `/about/partners`, `/about/csr-collaborations`, `/resources/environmental-pil`, `/resources/kew-green-heroes`, `/open-data`, `/environmental-investigations`, `/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences`, `/environmental-investigations/reports/kew-inv-0010`, `/atlas`, `/biodiversity`, `/geographic-scope`, `/sitemap.xml` | `HTTP 200` + expected scientific/licensing strings present + zero forbidden placeholders, loading shells, `501(c)(3)` claims, or deleted founder stats | **`18 / 18 PASS`** |
| **Permanent Alias Redirects (`5` routes)** | `/methodology`, `/founder`, `/leadership`, `/gis-mapping`, `/biodiversity/wetlands` | `HTTP 308` with canonical `Location` header | **`5 / 5 PASS`** |
| **Security Authorization Guards (`9` APIs)** | `GET /api/admin/system/errors`, `GET /api/operations`, `GET /api/submissions`, `GET /api/sectoral-eia/assessments`, `POST /api/ingest/telemetry`, `GET /api/cron/ingest`, `PATCH /api/sectoral-eia/reports`, `PATCH /api/environmental-investigations`, `POST /api/search/health` | `HTTP 401 Unauthorized` on unauthenticated calls | **`9 / 9 PASS`** |
| **Telemetry Provenance & `.xlsx` Export (`2` APIs)** | `GET /api/floods/live` (`isLiveTelemetry: false`), `GET /api/sectoral-eia/reports/KEW-SR-2026-01/dataset?format=xlsx` | `HTTP 200` + non-live statutory benchmark flag + valid `8,962`-byte OpenXML `PK\x03\x04` workbook without `xlsx` package | **`2 / 2 PASS`** |
