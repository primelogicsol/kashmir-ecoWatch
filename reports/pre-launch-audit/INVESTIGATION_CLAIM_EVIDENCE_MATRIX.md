# Kashmir EcoWatch — Investigation & Research Dossier Claim-Evidence Matrix (`Phase 5`)

**Audit Date:** November 27, 2026  
**Scope:** All **53** Canonical Investigations (`KEW-INV-0001`..`0053`) & All **101** Sectoral Research Dossiers (`KEW-SR-2026-01`..`101`)  
**Independently Externally Peer-Reviewed Records:** **`0` (Explicitly Disclosed; Zero Unsupported Peer-Review Claims Remaining)**

---

## 1. Portfolio Verification Reclassification Summary

Per the authorized editorial governance decision:
- **`Desk-Verified Canonical Record` (`2` records):** Applied to `KEW-INV-0001` (Dal Lake Mechanical Dredging) and `KEW-INV-0002` (Sheshnag Pilgrimage Infrastructure), replacing the unsupported `'Peer-Verified Master Record'` label.
- **`Active Investigation` (`3` records):** `KEW-INV-0003`, `KEW-INV-0004`, `KEW-INV-0009` — empirical synthesis underway with explicit uncertainty & data-gap logs.
- **`Scoping Review` (`22` records):** Stage 03 documentary & statutory scoping charters.
- **`Proposed Investigation Charter` (`26` records):** Stage 01 research questions without predetermined conclusions.
- **`Desk-Synthesized Research Dossiers (External Peer Review Pending)` (`101` records):** `KEW-SR-2026-01..101`, harmonized with `externalHumanPeerReviewStatus: 'External Human Peer Review Pending'` (eliminating `"Peer-Reviewed Dossiers"` / `"Peer-Reviewed & Digitally Certified"` labels).

| Corpus | Original Records / Citations | Verified Retained | Quarantined / Purged | Unverified / Downgraded | Corrected |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `KEW-INV-0001..0053` Investigations | 53 records (85 unique refs) | 53 records (79 verified refs) | 1 fabricated ref (`REF-DAL-07`) + 1 unofficial domain (`jakfinance-jk.com`) | 5 generic scoping refs downgraded from `'Documented'` | 53 (Section 08/11/13/18/21 UI black hole + DOI links fixed) |
| `KEW-SR-2026-01..101` External Literature Corpus | 470 Crossref/Zenodo refs | 401 domain-relevant refs | **69** off-topic Crossref/Zenodo papers | Preprints relabeled `'Preprint (Not Peer-Reviewed)'` | 77 |

---

## 2. Detailed Investigation & Dossier Issue Register

### `INV-P0-001` — Fabricated / Conflated *Water Research* Citation (`REF-DAL-07`) in Flagship `KEW-INV-0001`
- **Issue ID:** `INV-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations/reports/dal-lake-three-decades-mechanical-dredging-ecological-defences`
- **Affected file:** `src/data/environmental-investigations-published.ts`, `src/data/environmental-investigations-taxonomy.ts`
- **Original condition:** `REF-DAL-07` cited *"Chen, M., Ding, S. ... (2018). Long-term effects of sediment dredging on nutrient release and biological recovery in shallow eutrophic lakes. Water Research, 136, 110–121."* CrossRef verification proved no such paper exists in *Water Research* Vol. 136 (Chen, Ding et al. 2018 in *Water Research* Vol. 133, 153–164 studied algal-bloom Fe-P cycling, not dredging).
- **Root cause:** Synthetic bibliographic conflation of two separate Lake Taihu studies.
- **Supporting evidence:** CrossRef DOI lookup (`phase5_6_report.md` `[P0-5.1]`).
- **Corrective action:** Quarantined the fabricated citation string and replaced `REF-DAL-07` with verified peer-reviewed Lake Taihu five-year dredging follow-up literature (**Jing et al., 2019, *Science of the Total Environment*, 686, 753–763, DOI `10.1016/j.scitotenv.2019.05.133`**), updating `EVID-DAL-01`, `EVID-DAL-07`, and `taxonomy.ts` accordingly.
- **Verification method:** `GUARD-13` automated check + DOI resolution check.
- **Current status:** `Resolved`
- **Remaining limitations:** Direct post-dredging porewater diffusive flux core measurements inside Dal Lake remain a documented empirical gap (`EVID-DAL-05`).

---

### `INV-P0-002` — Unofficial Third-Party `.com` Domain (`jakfinance-jk.com`) Cited Across 15 Fiscal Investigations (`KEW-INV-0039..0053`)
- **Issue ID:** `INV-P0-002`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations`, `/environmental-investigations/reports/*` (`KEW-INV-0039`..`0053`)
- **Affected file:** `src/data/environmental-investigations.ts`, `src/data/environmental-investigations-economics-15.ts`, `src/data/environmental-economics-fiscal-evidence.ts`
- **Original condition:** Cited `https://jakfinance-jk.com/budget2026-27.html` (a private `.com` domain) as the official J&K Finance Department budget portal.
- **Root cause:** Unverified search result URL copied instead of official `.nic.in` / legislative analysis portals.
- **Supporting evidence:** `environmental-investigations.ts:142`, `economics-15.ts:59-61`, `environmental-economics-fiscal-evidence.ts:299,431,494` (`[P0-5.2]`). *(Macro-fiscal numbers ₹1,13,767 cr outlay, ₹80,640 cr revenue, ₹33,127 cr capital disbursement, ₹3,15,822 cr GSDP were independently verified accurate via PRS Legislative Research.)*
- **Corrective action:** Replaced `jakfinance-jk.com` across all three files with official Finance Department UT of J&K (`https://jakfinance.nic.in/`) and verified PRS Legislative Research J&K Budget Analysis 2026–27 (`https://prsindia.org/budgets/states/jammu-and-kashmir-budget-analysis-2026-27`).
- **Verification method:** `GUARD-13` check (`0` occurrences of `jakfinance-jk.com`).
- **Current status:** `Resolved`
- **Remaining limitations:** Detailed head-wise Grant Demand PDFs require archival download from `jakfinance.nic.in`.

---

### `INV-P0-003` — Misattributed Authors & Ecological Guild (`REF-DW-02`) in `KEW-INV-0010`
- **Issue ID:** `INV-P0-003`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations/reports/dal-lake-aquatic-vegetation-mechanical-deweeding-audit`
- **Affected file:** `src/data/environmental-investigations-series-16.ts`
- **Original condition:** `REF-DW-02` attributed a 2014 Dal Lake mechanical de-weeding study on *"benthic"* macroinvertebrates to `Mir, Z. A., Bakhtiyar, Y., & Arafat, M. Y.` in placeholder journal `'PubMed Indexed Aquatic Ecology Study'`.
- **Root cause:** Author misattribution and guild swap (`benthic` vs `phytophilous`).
- **Supporting evidence:** PubMed `PMID: 24414149` / DOI `10.1007/s11356-013-2470-7` (`[P0-5.3]`).
- **Corrective action:** Corrected citation to **Habib, S., & Yousuf, A. R. (2014)**, *"Impact of mechanical deweeding on the phytophilous macroinvertebrate community of an eutrophic lake"*, *Environmental Science and Pollution Research*, 21(8), 5653–5659 (`10.1007/s11356-013-2470-7`), and updated `EVID-0010-02` and `disciplineFindings` to specify **phytophilous (plant-associated)** macroinvertebrates.
- **Verification method:** Source inspection of `series-16.ts`.
- **Current status:** `Resolved`
- **Remaining limitations:** None.

---

### `INV-P1-004` — Unsubstantiated `'Peer-Verified Master Record'` & `'Peer-Reviewed'` Labels Across Investigations & Sectoral Dossiers
- **Issue ID:** `INV-P1-004`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations`, `/environmental-investigations/reports/[slug]`, `/sectoral-eia`, `/earth-human-impact/scientific-reports`
- **Affected file:** `src/data/environmental-investigations-published.ts`, `src/app/environmental-investigations/page.tsx`, `src/app/sectoral-eia/page.tsx`, `src/data/sectoral-eia.ts`, `src/app/earth-human-impact/scientific-reports/page.tsx`, `src/app/earth-human-impact/change-detection-observatory/scientific-dossiers/page.tsx`
- **Original condition:** Internal KEW desk syntheses carried `'Peer-Verified Master Record'`, `'Peer-Reviewed Dossiers'`, and `'Peer-Reviewed & Digitally Certified'` badges without independent external peer review.
- **Root cause:** Internal editorial verification was conflated with external academic peer review.
- **Supporting evidence:** `updatesLog` in `published.ts:593,1495` (`verifiedBy: 'KEW Scientific Review & Accountability Desk'`) and `sectoral-research-content-engine.ts:2159` (`'External Human Peer Review Pending'`).
- **Corrective action:** Replaced all unsupported peer-review badges with `'Desk-Verified Canonical Record'` (`KEW-INV-0001`, `0002`) and `'Desk-Synthesized Research Dossiers (External Peer Review Pending)'` (`KEW-SR-2026-*`).
- **Verification method:** `GUARD-13` automated check.
- **Current status:** `Resolved`
- **Remaining limitations:** External specialist peer review program scheduled post-launch.

---

### `INV-P1-005` — Section `08/11/13/18/21` UI Rendering Black Hole, Empty `DOI:` Anchors & 69 Off-Topic Crossref Corpus Hits
- **Issue ID:** `INV-P1-005`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/environmental-investigations/reports/[slug]`, `/sectoral-eia/reports/[code]`
- **Affected file:** `src/app/environmental-investigations/reports/[slug]/page.tsx`, `src/data/verified-external-evidence-corpus-100.json`, `src/data/report-scientific-registries-100.ts`, `src/data/dossiers/cohort-25.ts`
- **Original condition:** (1) 31 populated `disciplineFindings`, 13 `interventionInventory`, and 4 `chronology`/`accountability`/`recommendations` arrays were hidden on report detail pages because `inv.sections` omitted section numbers `'08'|'11'|'13'|'18'|'21'`; (2) `reports/[slug]/page.tsx:1035` rendered empty `DOI: ` text on 73 references lacking DOIs while hiding DOIs on 2 references lacking `externalUrl`; (3) `verified-external-evidence-corpus-100.json` contained 69 off-topic Crossref/Zenodo keyword hits (tea, lacquer, coleoptera plates, beam load deflection, electoral factbooks, plasma medicine) and collided with `[1]` in `buildReportClaimVerificationMatrix`.
- **Root cause:** Section-keyed conditional rendering without fallback blocks, unguarded JSX interpolation, and uncurated automated Crossref harvesting.
- **Supporting evidence:** `phase5_6_report.md` `[P1-5.5]`, `[P1-5.6]`, `[P1-5.8]`.
- **Corrective action:** Added fallback rendering sections in `reports/[slug]/page.tsx` so 100% of populated structured arrays render, fixed DOI link rendering and `Scoped Sciences` vs `Quantitative Findings` labels, purged all 69 off-topic publications from `verified-external-evidence-corpus-100.json` (and `cohort-25.ts`), stripped raw HTML entities, labeled preprints `'Preprint (Not Peer-Reviewed)'`, and fixed citation index formatting in `report-scientific-registries-100.ts`.
- **Verification method:** `GUARD-13` check + SSR HTML verification of investigation detail pages.
- **Current status:** `Resolved`
- **Remaining limitations:** Scoping/proposed charters intentionally include 1 quantitative scoping finding pending full Stage 05 investigation execution.
