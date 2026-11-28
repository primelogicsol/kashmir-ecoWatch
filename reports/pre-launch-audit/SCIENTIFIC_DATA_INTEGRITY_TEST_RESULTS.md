# Kashmir EcoWatch — Automated Scientific Data Integrity Test Results

**Execution Date:** November 27, 2026  
**Guard Script:** `scripts/audit/scientific-data-integrity-guard.js` (`npm run audit:scientific-integrity`)  
**Files Scanned:** **`1,761` TypeScript/TSX/JS/JSON files in `src/` + `package.json`**  
**Result:** **`15 / 15 PASS` (`Exit Code 0`)**

---

## 1. Guard Rule Execution Matrix

| Rule ID | Invariant Verified | Measured Output | Status |
| :--- | :--- | :--- | :---: |
| `GUARD-01` | Zero hardcoded admin passcodes, `x-admin-key` headers, or static HMAC secrets in `src/` | `Scanned 1761 files cleanly.` | **PASS** |
| `GUARD-02` | Zero vulnerable `xlsx@0.18.5` dependency or imports | `Replaced by zero-dependency OpenXML builder (src/lib/xlsx-minimal.ts).` | **PASS** |
| `GUARD-03` | All 6 core scientific provenance, quarantine, geographic, sensor, metric & licensing registries exist | `All 6 core registries verified.` | **PASS** |
| `GUARD-04` | Zero synthetic `"specio-N"` flora, `"sp. N"` birds, or non-fish taxa in active species exports | `Active specio-N=0, active sp. N=0, non-fish in fishData=false` | **PASS** |
| `GUARD-05` | Bioclimatic mammalian envelopes verified (Snow Leopard excluded from plains; Nilgai excluded from Ladakh) | `SnowLeopardInPlains=false, NilgaiInLadakh=false` | **PASS** |
| `GUARD-06` | Zero sub-district tehsils (`Pampore`) or typos (`Pulwara`) in district arrays | `Pampore properly nested under Pulwama District.` | **PASS** |
| `GUARD-07` | Official 7 Ramsar sites enforced; Mirgund placed in Baramulla/Budgam (non-Ramsar); `Mangla #820` removed | `All Ramsar designations and Mirgund taxonomy verified.` | **PASS** |
| `GUARD-08` | Zero scrambled `"Coastal Watershed"` entries, Indus Tibet pin fixed, and collapsed `[34.0, 74.8]` lake pins resolved | `CoastalWatersheds=0, IndusTibet=false, Collapsed34.0_74.8=0` | **PASS** |
| `GUARD-09` | Zero false KEW physical sensor network or GNSS station ownership claims | `Hero240Stations=false, IntroGNSS=false` | **PASS** |
| `GUARD-10` | Zero `Math.random()` calls in telemetry APIs, forest stats, corridors, or seasonal/risk datasets | `Zero synthetic random number generators in scientific modules.` | **PASS** |
| `GUARD-11` | Static flood benchmarks stripped of fake live telemetry labels and inverted GloFAS risk formula fixed | `FakeSource=false, InvertedGloFAS=false` | **PASS** |
| `GUARD-12` | Zero fabricated judicial eCourts CNR identifiers in active PIL records | `All unverified CNR identifiers quarantined/withdrawn.` | **PASS** |
| `GUARD-13` | Zero unsupported `Peer-Verified` labels, fabricated `REF-DAL-07`, unofficial `jakfinance-jk.com`, or off-topic Crossref pollution | `All investigation & dossier citations verified.` | **PASS** |
| `GUARD-14` | Zero fictional conference speakers (`Elena Rostova`) or unverified `501(c)(3)` tax-exempt claims | `ElenaRostova=false, Unverified501c3=false` | **PASS** |
| `GUARD-15` | Explicit `CC BY-NC 4.0` footer attribution and standalone `/governance` SSR route present | `FooterCCBYNC4=true, GovernancePage=true` | **PASS** |

---

## 2. Continuous Pre-Commit / CI Integration Recommendation

Run `npm run audit:scientific-integrity` prior to every build or merge (`"prebuild": "npm run audit:scientific-integrity"` when deploying to staging/production) so any regression in species quarantine, Ramsar designations, `Math.random()` usage, or credential safety blocks deployment automatically.
