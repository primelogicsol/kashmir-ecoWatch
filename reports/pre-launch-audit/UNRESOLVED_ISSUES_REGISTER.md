# Kashmir EcoWatch — Unresolved Issues, Known Limitations & Post-Launch Backlog Register

**Audit Date:** November 27, 2026  
**Unresolved `P0 Critical` Issues:** **`0`**  
**Unresolved Unmitigated `P1 High` Public Integrity Issues:** **`0`**

---

## 1. Documented Operational Prerequisites & Post-Launch Scientific Backlog (`P2` / `P3`)

While zero `P0` or unmitigated `P1` scientific, legal, or security defects remain in public views, the following operational environment steps and Phase II data-enrichment items are transparently documented for human review prior to and following the **December 8, 2026** launch:

### `LIM-OPS-001` — Production Environment Variable Provisioning Required Prior to Live Hosting
- **Issue ID:** `LIM-OPS-001`
- **Severity:** `P2 Moderate` *(Operational Deployment Gate — Intentionally Fail-Closed)*
- **Verification Class:** `Verified`
- **Affected route:** `/api/admin/session`, `/api/webinars/admin`, `/api/ingest/telemetry`, `/api/cron/ingest`
- **Affected file:** `.env.example`, `src/lib/seo/admin-session.ts`
- **Original condition:** Hardcoded fallback secrets allowed login without environment variables.
- **Root cause:** Security containment intentionally removed all fallback credentials and configured production endpoints to fail closed (`HTTP 503` / `401`) until strong secrets are set.
- **Supporting evidence:** `src/lib/seo/admin-session.ts`.
- **Corrective action:** Documented all required secret keys (`AUTH_SECRET`, `ADMIN_PASSCODE`, `ADMIN_API_KEY`, `ADMIN_EMAILS`, `WEBINAR_ADMIN_PASSCODE`, `DISPATCH_MASTHEAD_CODE`, `DISPATCH_REVIEWER_CODE`, `INGEST_API_KEY`, `CRON_SECRET`) in `.env.example`.
- **Verification method:** Code review of fail-closed checks.
- **Current status:** `Ready for Production Secret Provisioning`
- **Remaining limitations:** Operator must generate unique 32-byte random secrets in production hosting environment before December 8, 2026.

---

### `LIM-SCI-002` — External Independent Academic Peer Review Program (`0` Externally Peer-Reviewed Dossiers at Launch)
- **Issue ID:** `LIM-SCI-002`
- **Severity:** `P2 Moderate`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations`, `/sectoral-eia`
- **Affected file:** `src/data/environmental-investigations-published.ts`, `src/data/sectoral-research-content-engine.ts`
- **Original condition:** Internal syntheses were labeled `'Peer-Verified'` / `'Peer-Reviewed'`.
- **Root cause:** External academic refereeing has not yet been conducted.
- **Supporting evidence:** `updatesLog` & dossier governance metadata.
- **Corrective action:** Relabeled all records honestly as `'Desk-Verified Canonical Record'` (`2`) or `'External Human Peer Review Pending'` (`101`).
- **Verification method:** `GUARD-13` check.
- **Current status:** `Disclosed & Contained`
- **Remaining limitations:** Upgrading any dossier to `'Independently Peer-Reviewed'` requires documented external referee reports and signed reviewer consent post-launch.

---

### `LIM-SCI-003` — Primary Herbarium, Avian Checklist, Certified Court Order & HydroBASINS Expansion
- **Issue ID:** `LIM-SCI-003`
- **Severity:** `P2 Moderate`
- **Verification Class:** `Verified`
- **Affected route:** `/biodiversity`, `/water-systems/watersheds`, `/resources/environmental-pil`
- **Affected file:** `src/data/species/{plants,birds}.ts`, `src/data/water-systems.ts`, `src/data/environmental-pil.ts`
- **Original condition:** Synthetic placeholders inflated counts (`1,834` plants, `601` birds, `374` watersheds, `26` CNRs).
- **Root cause:** Quarantining synthetic entries leaves clean, smaller verified reference baselines (`28` plants, `46` birds, `28` river basins, `0` unverified CNRs).
- **Supporting evidence:** `SCIENTIFIC_DATA_QUARANTINE_REGISTER.md`.
- **Corrective action:** Added transparent UI coverage notices and staged reconstruction blueprints (`BIODIVERSITY_RECONSTRUCTION_PLAN.md`, `HYDROLOGICAL_DATA_RECONSTRUCTION_PLAN.md`, `JUDICIAL_RECORD_VERIFICATION_REGISTER.md`).
- **Verification method:** `GUARD-04`, `GUARD-08`, `GUARD-12`.
- **Current status:** `Disclosed & Queued for Phase II Primary Ingestion`
- **Remaining limitations:** Expanding flora/bird counts, Level 8 micro-watershed polygons, NASA FIRMS fire hotspots, and certified High Court/NGT order PDFs requires primary voucher/archive ingestion.

---

### `LIM-TEC-004` — Pre-Existing Strict TypeScript Union Drift in Untouched Legacy Modules
- **Issue ID:** `LIM-TEC-004`
- **Severity:** `P3 Low`
- **Verification Class:** `Verified`
- **Affected route:** `/biodiversity/phenology-flowering`, `/biodiversity/birding-hotspots`, `/biodiversity/pollinator-activity`
- **Affected file:** `next.config.js` (`typescript.ignoreBuildErrors: true`), `src/data/phenology-flowering.ts`, `src/data/pollinator-activity.ts`, `scratch/new_national_parks.ts`
- **Original condition:** ~110 pre-existing string-literal union mismatches exist in untouched legacy calendar/phenology modules.
- **Root cause:** Early data files added string labels (`'Rocky terrain'`, `'Jammu Division'`) slightly wider than narrow union types while `ignoreBuildErrors: true` was enabled.
- **Supporting evidence:** `npx tsc --noEmit` baseline scan (`0` errors in any newly created/remediated files; `712/712` pages build cleanly in `next build`).
- **Corrective action:** Verified `0` TypeScript errors across all remediated security, provenance, biodiversity, telemetry, investigation, licensing, and SSR files.
- **Verification method:** `check-touched-ts.js` & `npx next build`.
- **Current status:** `Non-Blocking (Zero Runtime Impact)`
- **Remaining limitations:** Harmonizing legacy phenology/pollinator string unions post-launch will allow flipping `typescript.ignoreBuildErrors` to `false`.
