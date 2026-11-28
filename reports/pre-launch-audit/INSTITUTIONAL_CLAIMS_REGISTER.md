# Kashmir EcoWatch — Institutional, Governance & Partnership Claims Register (`Phase 9`)

**Audit Date:** November 27, 2026  
**Scope:** `/about`, `/governance`, `/about/governance`, `/about/partners`, `/about/contributors`, `/about/csr-collaborations`, `/webinars/*`, `/kew-green-heroes`  
**Status:** **REMEDIATED (`0` Unverified Institutional Partnerships, `0` Unverified `501(c)(3)` Claims, `0` Fictional Speakers)**

---

## 1. Institutional Claims Audit Matrix

| Claim Category | Pre-Remediation Public Claim | Verification Finding | Post-Remediation Honest Representation |
| :--- | :--- | :--- | :--- |
| External University Partnerships (`/about/partners`) | University of Kashmir, SKUAST-K, NIT Srinagar, etc. badged as onboarded `"Research Partner"` | No signed institutional MoUs documented in repository | Reclassified as **Regional Scientific Ecosystem & Literature Reference Institutions** (`Formal Institutional MoU Not Claimed`) |
| Tax-Exempt Non-Profit Status (`/about/csr-collaborations`) | Referenced `501(c)(3)` tax-exempt status | Unverified statutory filing | Removed `501(c)(3)` claim; framed as non-commercial public-interest environmental observatory collaboration inquiry |
| Academic Contributor Roster (`/about/contributors`) | 21 named PhD researcher cards with institutional titles | Synthetic placeholder profiles (`commit e7646a2`) | Quarantined all 21 synthetic profiles; displays verified founding leadership + open ORCID/consent-gated contributor onboarding protocol |
| Conference Speakers & 2027–28 Proceedings (`/webinars/*`) | `"Prof. Elena Rostova"` + unconfirmed university faculty speakers; `"48 MB Proceedings PDF"` & Zenodo DOI for future 2027–28 conference | Fictional/unconfirmed speaker slots; proceedings cannot exist for future 2027–28 events | Quarantined fictional/unconfirmed names -> `"Invited Session Chair / Speaker Slot (Confirmation Pending)"`; replaced fake 48 MB PDF/DOI with `"Scheduled Future Conference — Proceedings Published Post-Convene"` |
| Governance Portal (`/governance`) | Linked in global footer, but `/governance` was missing as a standalone indexable route | Broken standalone route (`qa_audit_report.md` #2) | Created standalone SSR-indexable `src/app/governance/page.tsx` aligned with `/about/governance` |
| Research Citation & Download Metrics (`evidence-intelligence.ts`, `scientific-reports/page.tsx`) | Synthetic citation counts & download numbers on internal KEW dossiers | Fabricated bibliometrics | Removed synthetic citation/download counters |

---

## 2. Institutional Integrity Issue Register

### `INS-P0-001` — Synthetic Academic Contributor Roster, Fictional Conference Speakers & Premature University Partner Badges
- **Issue ID:** `INS-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/about/contributors`, `/about/partners`, `/webinars`, `/webinars/conferences/[conferenceId]/proceedings`, `/kew-green-heroes`
- **Affected file:** `src/app/about/contributors/page.tsx`, `src/app/about/partners/page.tsx`, `src/data/conference-system.ts`, `src/data/webinars.ts`, `src/components/webinars/ConferenceConflictScheduler.tsx`, `src/app/webinars/create/page.tsx`, `src/app/webinars/conferences/[conferenceId]/proceedings/page.tsx`, `src/data/kew-green-heroes.ts`
- **Original condition:** Listed 21 synthetic PhD contributors, fictional keynote `"Prof. Elena Rostova"`, unconfirmed named local faculty speakers, onboarded `"Research Partner"` badges on external universities, 5 unapproved candidate Green Heroes dossiers with fake `INGESTION_TELEMETRY`, and a downloadable 48 MB proceedings volume + Zenodo DOI for a 2027–2028 conference.
- **Root cause:** Prototype UI scaffolding populated realistic-looking academic personas, institutional badges, and sample archive artifacts.
- **Supporting evidence:** Phase 9 audit (`phase7_8_9_12_report.md`).
- **Corrective action:** Quarantined all synthetic profiles, fictional/unconfirmed speakers, fake 2027–28 proceedings artifacts, and unapproved candidate dossiers; reframed external universities on `/about/partners` with explicit non-endorsement / no-MoU disclosures.
- **Verification method:** `GUARD-14` automated check + SSR verification of `/about/contributors`, `/about/partners`, and `/governance`.
- **Current status:** `Resolved`
- **Remaining limitations:** External advisory board and institutional partner listings remain gated on signed written agreements.

---

### `INS-P1-002` — Unverified `501(c)(3)` Tax-Exempt Claim on `/about/csr-collaborations`
- **Issue ID:** `INS-P1-002`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/about/csr-collaborations`
- **Affected file:** `src/app/about/csr-collaborations/page.tsx`
- **Original condition:** Referenced US `501(c)(3)` tax-exempt eligibility without documented IRS determination letter.
- **Root cause:** Boilerplate non-profit philanthropic template copy.
- **Supporting evidence:** `src/app/about/csr-collaborations/page.tsx` (`phase7_8_9_12_report.md`).
- **Corrective action:** Removed all `501(c)(3)` or statutory tax-deductibility representations, stating clearly that institutional sponsorship/grant structures are subject to formal legal agreement and applicable statutory compliance.
- **Verification method:** `GUARD-14` automated check (`Unverified501c3=false`).
- **Current status:** `Resolved`
- **Remaining limitations:** None.
