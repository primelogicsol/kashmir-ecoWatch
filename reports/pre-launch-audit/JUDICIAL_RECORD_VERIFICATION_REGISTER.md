# Kashmir EcoWatch — Judicial & Environmental PIL Record Verification Register

**Audit Date:** November 27, 2026  
**Target Module:** `src/data/environmental-pil.ts` & `/resources/environmental-pil`  
**Status:** **CONTAINED & REMEDIATED (`26 / 26` Fabricated CNR Identifiers Quarantined; SSR Pre-Rendering Enabled)**

---

## 1. Dataset Verification Summary

| Metric | Count | Details |
| :--- | :---: | :--- |
| **Original Records in File** | **26** (+ duplicate bottom entries) | Introduced in commit `444c5fc`; included duplicate trailing entries and hardcoded summary counts |
| **Fabricated `cnrNumber` Identifiers Quarantined** | **26** | Algorithmically formatted 16-char strings (`JKHC01...`, `NGTPB01...`, plus impossible Indian eCourts CNR prefixes `AJKHC01...` and `GBSC01...` assigned to Pakistani/AJ&K/GB courts!) |
| **Broken External Order / IndianKanoon URLs Withdrawn** | **26** | Non-resolving slug-guessed PDF and IndianKanoon links removed |
| **Thematically Documented Public Litigation Matters Retained** | **14** | Well-known public-domain environmental PIL/NGT matters (Dal Lake *Syed Iqbal Tahir Geelani* / High Court monitoring, Wular encroachment, Hokersar/Rambiara/Doodhganga NGT riverbed mining & sewage orders, Sonamarg/Gulmarg master plan litigation, Salim Ali NP) retained with `cnrNumber: undefined` and explicit `'Official Docket / Order Archive Verification Pending'` notice |
| **Regional Scoping / Unverified Litigation Entries Flagged** | **12** | Marked `'Docket Verification Pending Primary Court Registry'` |
| **False Ramsar Claim Corrected** | **1** | Removed false Ramsar designation from Pangong Tso docket summary |

---

## 2. Forensic Analysis of Why `cnrNumber` Strings Failed Verification

1. **Jurisdictional Impossibility (`AJKHC01...`, `GBSC01...`):** The 16-character Case Number Record (`CNR`) system is an internal database identifier of the **National Informatics Centre (NIC) eCourts India** platform. High Courts in Azad Jammu & Kashmir (Muzaffarabad) and Supreme Appellate / Chief Courts in Gilgit-Baltistan do not use Indian NIC eCourts `CNR` identifiers.
2. **National Green Tribunal (`NGTPB01...`):** The National Green Tribunal (NGT) registers cases as `Original Application (OA) No. X/YYYY`, `Execution Application (EA)`, or `Appeal No.` on `greentribunal.gov.in`, not 16-character High Court `CNR` strings.
3. **Sequential Checksum Pattern (`JKHC0100XXXX20XX`):** All 26 strings followed a uniform synthetic zero-padded serial template without verified registry lookup.

---

## 3. Judicial Issue Register (12-Field Schema)

### `JUD-P0-001` — 26 Algorithmically Fabricated Judicial `cnrNumber` Identifiers & Non-Resolving Court Order Links
- **Issue ID:** `JUD-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/resources/environmental-pil`
- **Affected file:** `src/data/environmental-pil.ts`, `src/app/resources/environmental-pil/page.tsx`
- **Original condition:** Rendered 26 synthetic 16-character `cnrNumber` codes (including `AJKHC01` and `GBSC01` on non-Indian courts), broken PDF/IndianKanoon links, duplicate bottom array records, false Pangong Tso Ramsar claim, and a client-only `<Suspense>` loading shell (`"Loading Environmental PIL Portal & Judicial Inventory..."`) that prevented search engine indexing.
- **Root cause:** Prototype legal dataset seeded synthetic CNR strings and slug-constructed URLs; `useSearchParams()` caused full-page SSR bailout.
- **Supporting evidence:** `src/data/environmental-pil.ts` (`commit 444c5fc`) and `phase7_8_9_12_report.md`.
- **Corrective action:** Quarantined all 26 fabricated `cnrNumber` strings and broken URLs in `src/data/environmental-pil.ts`, deduplicated entries, removed false Pangong Ramsar text, computed summary statistics dynamically, and refactored `src/app/resources/environmental-pil/page.tsx` to server-side pre-render full docket content with transparent `'Pending Official Court Registry Verification'` badges.
- **Verification method:** `GUARD-12` automated check + `GET http://localhost:3000/resources/environmental-pil` raw SSR HTML check confirming pre-rendered dockets without loading-shell hang.
- **Current status:** `Resolved`
- **Remaining limitations:** Certified PDF orders and exact `WP(C) PIL` / `OA` numbers must be retrieved directly from `jkhighcourt.nic.in` and `greentribunal.gov.in` before displaying official case numbers.
