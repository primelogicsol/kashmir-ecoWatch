# Kashmir EcoWatch — P0 Security Containment Report

**Audit Date:** November 27, 2026  
**Target Launch Window:** December 8, 2026  
**Environment Scope:** Localhost / Repository Remediation (`http://localhost:3000` — Zero Production Push)  
**Containment Status:** **COMPLETE (0 Unresolved P0 Security Vulnerabilities)**

---

## 1. Executive Containment Summary

During the pre-launch forensic audit, five **P0 Critical** security defects were identified across client bundles, session-signing libraries, and API mutation/ingestion routes. Immediate non-destructive containment was executed across **28 source files**, completely purging hardcoded credentials from client and server source code, rotating HMAC session formats to v2 with domain-separated key derivation, decoupling cron credentials from administrative RBAC, locking down unauthenticated write/PII endpoints, and eliminating the vulnerable `xlsx@0.18.5` dependency.

> [!IMPORTANT]
> Zero `.env` secret values are reproduced in this report. Git history audit (`git log --all --full-history -- .env*`) confirmed `.env` files were **never committed** to repository history.

| Containment Vector | Pre-Remediation Exposure | Containment Action Executed | Post-Containment Status |
| :--- | :--- | :--- | :--- |
| Hardcoded Admin Passcode in Client Bundles & Server Routes | Literal passcode embedded in 4 `'use client'` pages and 9 server files | Purged all literals; replaced with `/api/admin/session` HttpOnly cookie verification + SHA-256 blocklist of retired credentials | **CONTAINED (`GUARD-01` PASS)** |
| Static HMAC Signing Fallbacks & `CRON_SECRET` Admin Privilege Escalation | 4 static HMAC fallback strings; `verifyAdminRequest()` accepted `Bearer <CRON_SECRET>` | Domain-separated v2 HMAC derivation (`kew_adm2.`, `kew_vh2.`, `v: 2`); ephemeral random dev key; fail-closed in prod; `CRON_SECRET` removed from admin RBAC | **CONTAINED (`GUARD-01` PASS)** |
| Unauthenticated Database Telemetry & Dossier Mutations | Public `POST /api/ingest/telemetry`, `GET /api/cron/ingest`, `PATCH /api/sectoral-eia/reports`, `POST/PATCH /api/environmental-investigations`, `POST /api/search/health` | Enforced `verifyCronOrIngestRequest()` and `verifyAdminRequest()` + strict numeric/batch bounds | **CONTAINED** |
| Unauthenticated Contributor PII Exposure | Public `GET` on `/api/operations`, `/api/submissions`, `/api/sectoral-eia/assessments`, `/api/environmental-investigations?proposals=true`, and HDN `plainAccessCodeHint` | Enforced `verifyAdminRequest()` on listing endpoints; masked email on single `trackingId` lookup; stripped `plainAccessCodeHint` and encrypted Tier III source notes with AES-256-GCM | **CONTAINED** |
| Unpatched `xlsx@0.18.5` Prototype Pollution & ReDoS CVEs | `xlsx` imported in `/api/sectoral-eia/reports/[code]/dataset` | Replaced with zero-dependency OpenXML ZIP workbook builder (`src/lib/xlsx-minimal.ts`) and removed `xlsx` from `package.json` | **CONTAINED (`GUARD-02` PASS)** |

---

## 2. Detailed P0 Security Issue Register (12-Field Schema)

### `SEC-P0-001` — Hardcoded Administrator Passcode Exposed in Public Client JavaScript Bundles and Server Fallbacks
- **Issue ID:** `SEC-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/admin/system/errors`, `/admin/data-integrity`, `/admin/gis-quality`, `/preview-error`, `/api/admin/session`, `/api/admin/system/errors*`, `/api/submissions`, `/api/operations`, `/api/webinars/admin`, `/api/webinars/room/[id]`
- **Affected file:** `src/app/admin/system/errors/page.tsx`, `src/app/admin/data-integrity/page.tsx`, `src/app/admin/gis-quality/page.tsx`, `src/app/preview-error/page.tsx`, `src/app/api/admin/session/route.ts`, `src/app/api/admin/system/errors/{route,stream/route,test/route}.ts`, `src/app/api/submissions/route.ts`, `src/app/api/operations/route.ts`, `src/app/api/webinars/admin/route.ts`, `src/app/api/webinars/room/[id]/route.ts`, `src/lib/hdn/store.ts`, `src/lib/himalayan-dispatch-store.ts`
- **Original condition:** A static administrator passcode literal, `x-admin-key` request headers, `?key=` SSE query parameters, and `sessionStorage.getItem('kew_admin_authenticated')` checks were shipped directly in public `'use client'` bundles and accepted as server-side fallbacks when `ADMIN_PASSCODE` was unset.
- **Root cause:** Prototype diagnostic gates implemented client-side string comparison and fallback defaults prior to centralized session management.
- **Supporting evidence:** Static scan identified 18 occurrences across 14 files in `src/` (introduced across commits `e7646a2` and `4d9065b`).
- **Corrective action:** Removed every hardcoded passcode literal, `x-admin-key` header, `?key=` query parameter, `sessionStorage` bypass, and `localStorage` `administrator` role grant. Standardized all admin UIs onto `GET/POST/DELETE /api/admin/session` (`credentials: 'same-origin'`), added SHA-256 digest blocklisting of retired credentials in `src/lib/seo/admin-session.ts`, and added per-IP sliding-window login rate limiting (`10 attempts / 15 min`). If `ADMIN_PASSCODE` is unconfigured, login fails closed with `HTTP 503`.
- **Verification method:** Automated static scan (`GUARD-01` in `scripts/audit/scientific-data-integrity-guard.js`) + unauthenticated `HTTP 401` verification on `/api/admin/system/errors` and `/api/operations`.
- **Current status:** `Resolved`
- **Remaining limitations:** Production deployment operator must provision strong unique `ADMIN_PASSCODE` and `WEBINAR_ADMIN_PASSCODE` secrets in host environment variables prior to launch.

---

### `SEC-P0-002` — Hardcoded HMAC Session Signing Fallbacks & `CRON_SECRET` Admin Session Equivalence
- **Issue ID:** `SEC-P0-002`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/api/admin/*`, `/api/himalayan-dispatch/*`, `/api/webinars/*`, `/api/auth/*`
- **Affected file:** `src/lib/seo/admin-session.ts`, `src/auth.ts`, `src/lib/hdn/rbac.ts`, `src/lib/himalayan-dispatch-store.ts`, `src/lib/virtual-hall-store.ts`
- **Original condition:** Session signing helpers fell back to static strings when `AUTH_SECRET` was absent, shared identical raw HMAC secrets across distinct cookie types, and `verifyAdminRequest()` accepted `Authorization: Bearer <CRON_SECRET>` as full platform administrator clearance.
- **Root cause:** Shared copy-pasted `getSigningSecret()` fallback chains conflated scheduled cron authentication with interactive human administrator sessions.
- **Supporting evidence:** `src/lib/seo/admin-session.ts:7-14,89-92`, `src/auth.ts:34`, `src/lib/hdn/rbac.ts:620-625`, `src/lib/himalayan-dispatch-store.ts:178-185`, `src/lib/virtual-hall-store.ts:382-390`.
- **Corrective action:** Implemented `getDomainSigningSecret(domain)` in `src/lib/seo/admin-session.ts` with HMAC-SHA256 domain separation (`admin-session`, `hdn-newsroom`, `dispatch-journalist`, `virtual-scientific-hall`, `nextauth`), bumped all token schemas (`kew_adm2.`, `kew_vh2.`, `v: 2`) to immediately invalidate any pre-audit tokens, removed `CRON_SECRET` from `verifyAdminRequest()` and HMAC key chains, restricted NextAuth admin elevation strictly to explicit `ADMIN_EMAILS`, and enforced fail-closed signing in `NODE_ENV === 'production'` when `AUTH_SECRET` is unset (using a per-process `crypto.randomBytes(32)` ephemeral key in local development only).
- **Verification method:** Token version prefix inspection, `GUARD-01` scan, and session API verification.
- **Current status:** `Resolved`
- **Remaining limitations:** Single-process in-memory rate-limit map resets on serverless cold start; edge WAF rate limiting recommended when deployed publicly.

---

### `SEC-P0-003` — Unauthenticated Telemetry Ingestion & Dossier/Investigation Mutation Endpoints
- **Issue ID:** `SEC-P0-003`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `POST /api/ingest/telemetry`, `GET /api/cron/ingest`, `PATCH /api/sectoral-eia/reports`, `POST & PATCH /api/environmental-investigations`, `POST /api/search/health`
- **Affected file:** `src/app/api/ingest/telemetry/route.ts`, `src/app/api/cron/ingest/route.ts`, `src/app/api/sectoral-eia/reports/route.ts`, `src/app/api/environmental-investigations/route.ts`, `src/app/api/search/health/route.ts`
- **Original condition:** Unauthenticated callers could insert arbitrary rows into `observations_ts` and `forecasts_ts`, trigger synthetic random weather cron cycles, overwrite any of the 101 Sectoral Research Dossiers, create or alter `KEW-INV-*` investigation statuses, and force PostgreSQL search index rebuilds.
- **Root cause:** Missing server-side `verifyAdminRequest()` / `verifyCronOrIngestRequest()` guards on route handlers.
- **Supporting evidence:** Direct code inspection of all 72 API route handlers in Phase 10 audit.
- **Corrective action:** Added `verifyCronOrIngestRequest()` + strict physical range and batch-size (`<=200`) validation on `/api/ingest/telemetry` and `/api/cron/ingest` (and removed `Math.random()` fake `'Open-Meteo-NWP'` generation in `/api/cron/ingest`); added `verifyAdminRequest()` on `PATCH /api/sectoral-eia/reports`, `POST (create_investigation)` and `PATCH /api/environmental-investigations`, and `POST /api/search/health`.
- **Verification method:** Unauthenticated HTTP requests return `401 Unauthorized`.
- **Current status:** `Resolved`
- **Remaining limitations:** Database role separation (`readonly_api` vs `ingestion_worker`) should also be enforced at PostgreSQL GRANT level in production.

---

### `SEC-P0-004` — Unauthenticated Contributor Email/PII Enumeration & Plaintext Newsroom Hints/Vault
- **Issue ID:** `SEC-P0-004`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `GET /api/operations`, `GET /api/submissions`, `GET /api/sectoral-eia/assessments`, `GET /api/environmental-investigations?proposals=true`, `GET /api/himalayan-dispatch/hdn/admin`
- **Affected file:** `src/app/api/operations/route.ts`, `src/app/api/submissions/route.ts`, `src/app/api/sectoral-eia/assessments/route.ts`, `src/app/api/environmental-investigations/route.ts`, `src/app/api/himalayan-dispatch/hdn/admin/route.ts`, `src/lib/hdn/store.ts`
- **Original condition:** Public `GET` requests returned contributor email addresses (`ownerEmail`, `contributor_email`, `contactEmail`, `proposerEmail`), HDN admin `GET` returned `plainAccessCodeHint` on provisioned accounts, and confidential newsroom source `restrictedNotes` were written to JSON in plaintext.
- **Root cause:** Admin dashboard data endpoints lacked session guards and stored plaintext convenience fields.
- **Supporting evidence:** `operations/route.ts:17-66`, `submissions/route.ts:15-48`, `assessments/route.ts:22-27`, `environmental-investigations/route.ts:55`, `hdn/admin/route.ts:92-95`, `hdn/store.ts:2725`.
- **Corrective action:** Required `verifyAdminRequest()` on all full-list `GET` endpoints; masked `ownerEmail` (`us***@domain`) on single public `?trackingId=` lookups; stripped `plainAccessCodeHint` from persistent storage and `GET` responses; encrypted `restrictedNotes` at rest using `AES-256-GCM` (`enc:aes256gcm:v1:...`).
- **Verification method:** API response payload inspection confirming zero unauthenticated PII exposure.
- **Current status:** `Resolved`
- **Remaining limitations:** High-risk Tier III journalistic sources should use out-of-band Signal/PGP channels rather than web intake.

---

### `SEC-P0-005` — Vulnerable `xlsx@0.18.5` Dependency in Dataset Export Pipeline
- **Issue ID:** `SEC-P0-005`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `GET /api/sectoral-eia/reports/[code]/dataset?format=xlsx`
- **Affected file:** `package.json`, `src/app/api/sectoral-eia/reports/[code]/dataset/route.ts`, `src/lib/xlsx-minimal.ts`
- **Original condition:** `package.json` depended on unpatched npm `xlsx@0.18.5` (Prototype Pollution `GHSA-4r6h-8v6p-xvw6` and ReDoS `GHSA-5pgg-2g8v-p4x9`).
- **Root cause:** Legacy SheetJS npm registry version froze at `0.18.5` with unpatched advisories.
- **Supporting evidence:** `package.json:47` and `dataset/route.ts:2,81-148`.
- **Corrective action:** Replaced `xlsx` with a clean, zero-dependency OpenXML `.xlsx` multi-sheet ZIP archive builder (`src/lib/xlsx-minimal.ts`) using Node's built-in `zlib.deflateRawSync` and CRC32, and removed `xlsx` from `package.json`.
- **Verification method:** `GUARD-02` integrity check + `.xlsx` binary header (`PK\x03\x04`) export check.
- **Current status:** `Resolved`
- **Remaining limitations:** Minimal `.xlsx` writer exports clean typed strings and finite numbers without custom cell font styling (preserving 100% scientific data fidelity).
