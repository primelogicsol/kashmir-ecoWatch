# Kashmir EcoWatch — Institutional & Academic Profile Verification Register

**Audit Date:** November 27, 2026  
**Scope:** All Named Persons, Scholars, Conference Speakers, Editorial Masthead Roles, Green Heroes & Partner Institutions  
**Status:** **REMEDIATED (`37` Synthetic / Unconfirmed External Profiles Quarantined)**

---

## 1. Profile & Entity Verification Ledger

| Registry / Page | Source File | Original Count | Verified Retained | Quarantined | Unverified | Corrected | Verification Basis & Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Academic Contributors | `src/app/about/contributors/page.tsx` | 21 | **0** (external PhDs) | **21** | 0 | 21 | Synthetic PhD personas quarantined; replaced with verified founding leadership + ORCID/consent-gated contributor charter |
| Conference & Webinar Speakers | `src/data/conference-system.ts`, `src/data/webinars.ts`, `ConferenceConflictScheduler.tsx`, `webinars/create/page.tsx` | 11 | **0** (external unconfirmed) | **11** (incl. `"Prof. Elena Rostova"`) | 0 | 11 | Fictional `"Prof. Elena Rostova"` purged; unconfirmed named university faculty slots converted to `"Invited Chair / Speaker Slot (Confirmation Pending)"` |
| KEW Green Heroes Candidates | `src/data/kew-green-heroes.ts` | 6+ | Verified public honorees only | **5** (unapproved candidate dossiers) | 0 | 6 | Unapproved candidate dossiers & fake `INGESTION_TELEMETRY` quarantined from public export |
| Institutional Ecosystem Directory | `src/app/about/partners/page.tsx` | 12 | **12** (real institutions, status corrected) | **0** | 0 | 12 | Real regional universities/agencies (KU, SKUAST-K, NIT Srinagar, WII, ICIMOD) retained strictly as **Regional Scientific Ecosystem References** with explicit `"Formal Institutional MoU Not Claimed"` badge |
| 2027–2028 Conference Proceedings | `src/app/webinars/conferences/[conferenceId]/proceedings/page.tsx` | 1 (48 MB PDF + Zenodo DOI) | **0** | **1** | 0 | 1 | Withdrew fake published proceedings PDF & Zenodo DOI for future 2027–28 event -> `"Proceedings Published Post-Convene"` |

---

## 2. Mandatory Identity & Affiliation Governance Protocol (Enforced Going Forward)

To prevent synthetic or unconsented academic attribution prior to and after the December 8, 2026 launch, KEW enforces four non-negotiable rules:
1. **Written Consent Gate:** No external scientist, professor, ranger, or student may be listed as a KEW Contributor, Scientific Reviewer, Advisory Board Member, or Confirmed Webinar Speaker without a signed written or digital opt-in record on file.
2. **ORCID / Institutional Email Verification:** Academic contributor listings require a resolvable ORCID iD (`https://orcid.org/0000-...`) or verified institutional domain email.
3. **Institutional Non-Endorsement Disclosure:** Referencing published data or research from University of Kashmir, SKUAST-K, WII, ISRO, CWC, or ICIMOD never implies formal institutional partnership, sponsorship, or endorsement unless a Bilateral MoU is executed.
4. **Editorial Byline Transparency:** Conceptual or multi-source desk syntheses in Himalayan Dispatch carry institutional desk attribution (`Himalayan Dispatch Editorial Desk`) or explicit automated-synthesis disclosures rather than unverified external field reporter personas.
