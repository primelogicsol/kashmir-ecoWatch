# Kashmir EcoWatch — Pre-Launch Readiness Assessment & December 8, 2026 Go-Live Checklist

**Assessment Date:** November 27, 2026  
**Scheduled Public Launch:** December 8, 2026 (`11` Days Remaining)  
**Readiness Classification:** **CONDITIONALLY READY FOR LAUNCH — PENDING FINAL HUMAN REVIEW & PRODUCTION ENV SECRET PROVISIONING**

---

## 1. Domain-by-Domain Readiness Matrix

| Domain | Pre-Audit Status | Post-Remediation Status | Verification Evidence |
| :--- | :---: | :---: | :--- |
| **1. Security & Access Control** | **CRITICAL BLOCK** (Hardcoded passcodes/HMACs, open write/PII APIs, `xlsx` CVEs) | **READY** | `0` hardcoded secrets (`GUARD-01`), v2 domain-separated HMAC cookies, `9/9` write/PII endpoints `HTTP 401`, `xlsx` removed (`GUARD-02`) |
| **2. Sensor & Real-Time Feed Honesty** | **CRITICAL BLOCK** (`240+` station claim, fake live flood stages, `Math.random()` weather/forest stats, CAMS=EPA) | **READY** | `0` KEW hardware sensors disclosed (`GUARD-09`), `0` `Math.random()` (`GUARD-10`), static flood stages marked non-live (`GUARD-11`), CAMS/AirGradient provenance labeled |
| **3. Biodiversity & Taxonomic Integrity** | **CRITICAL BLOCK** (`1,806` `specio-N` plants, `550` `sp. N` birds, `12` non-fish, Snow Leopard in Jammu, Nilgai in Leh) | **READY** | `2,368` synthetic/non-fish records quarantined (`GUARD-04`), `239` verified species with bioclimatic envelopes (`GUARD-05`), sensitive `CR/EN` GPS masked |
| **4. Geospatial, Hydrology & Ramsar** | **CRITICAL BLOCK** (`11` false Ramsar claims, `374` `"Coastal"` scrambled watersheds, Mirgund in Kulgam, Pampore district, `52` collapsed lake pins) | **READY** | Exact `7` RSIS Ramsar sites enforced (`GUARD-07`), `28` verified river basins & `52` lake pins corrected (`GUARD-08`), Pampore nested in Pulwama (`GUARD-06`) |
| **5. Investigations & 101 Dossiers** | **CRITICAL BLOCK** (`Peer-Verified` claims, fake `REF-DAL-07`, `jakfinance-jk.com`, misattributed `REF-DW-02`, `103` off-topic Crossref/DataCite items) | **READY** | `Desk-Verified Canonical Record` applied, all citations verified/cleaned (`GUARD-13`), Section `08/11/13/18/21` fallback UI active |
| **6. Judicial PIL & Institutional Claims** | **CRITICAL BLOCK** (`26` fake CNRs incl. `AJKHC01`/`GBSC01`, `21` synthetic PhDs, `"Elena Rostova"`, `501(c)(3)`, fake 2027–28 proceedings) | **READY** | All `26` fake CNRs quarantined (`GUARD-12`), synthetic profiles/speakers/proceedings quarantined & `501(c)(3)` removed (`GUARD-14`) |
| **7. Licensing & Legal Consistency** | **HIGH RISK** (No explicit CC license in footer, third-party reports re-licensed, `"52 of 50"` categories) | **READY** | `CC BY-NC 4.0` + 5 carve-out classes enforced across footer, Open Data, JSON-LD, legal pages & APIs (`GUARD-15`) |
| **8. SSR Pre-Rendering, SEO & Editorial** | **HIGH RISK** (`/governance` 404, PIL/Green Heroes loading shells, 50+ broken links, missing HD-ANIE AI badges) | **READY** | `712/712` static/SSG build PASS, `34/34` live HTTP checks PASS, standalone `/governance` (`200 OK`), AI/automation & `corrections` rendered |

---

## 2. Final Human Pre-Deployment Checklist (Before Pushing to Production on Dec 8, 2026)

Per your authorization (`Localhost only until final human approval`), **zero `git push` or production deployments have been executed**. Before switching production DNS / deploying on December 8, 2026:

- [ ] **1. Inspect Localhost (`http://localhost:3000`):** Review key remediated portals (`/`, `/governance`, `/about/founder`, `/about/contributors`, `/about/partners`, `/about/csr-collaborations`, `/resources/environmental-pil`, `/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences`, `/water-systems/nwia-classification`, `/biodiversity`, `/open-data`, `/himalayan-dispatch`).
- [ ] **2. Provision Unique Production Secrets:** Set cryptographically random 32-byte values in the production host environment for `AUTH_SECRET`, `ADMIN_PASSCODE`, `ADMIN_API_KEY`, `WEBINAR_ADMIN_PASSCODE`, `DISPATCH_MASTHEAD_CODE`, `DISPATCH_REVIEWER_CODE`, `INGEST_API_KEY`, and `CRON_SECRET` (never reuse retired legacy values).
- [ ] **3. Verify Subdomain Flag:** Keep `NEXT_PUBLIC_DISPATCH_SUBDOMAIN_LIVE="false"` and `DISPATCH_LEGACY_REDIRECTS_ENABLED="false"` until `https://dispatch.kashmir-ecowatch.com` SSL and DNS are verified live.
- [ ] **4. Run Pre-Release Gate:** Execute `npm run audit:scientific-integrity && npm run build` on the release commit and confirm `15/15 PASS` and `712/712` static/SSG pages generated.
