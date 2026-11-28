# Kashmir EcoWatch — Synthetic Data Forensic Lineage Report

**Audit Date:** November 27, 2026  
**Methodology:** Git Commit Archaeology (`git log -S`, `git blame`, AST/Regex Pattern Fingerprinting)  
**Repository Baseline Commit Audited:** `8b01806f71ba9259f2f26112afab90a0528716da` (`master`)

---

## 1. Forensic Executive Summary

To ensure remediations did not merely hide surface symptoms, we traced the exact commit origin, generation mechanism, and downstream propagation of every synthetic, procedurally scrambled, or unverified dataset in the Kashmir EcoWatch repository. Zero `.env` secrets were ever committed (`git log --all --full-history -- .env*` returned empty). However, rapid module-scaffolding commits between prototype phases introduced **seven distinct classes of synthetic or procedurally scrambled records**, all of which have now been quarantined or corrected via `src/lib/scientific-integrity/quarantine-gateway.ts`.

---

## 2. Commit-by-Commit Lineage Matrix

| Lineage Commit | Author / Commit Scope | Affected Files | Synthetic / Scrambled Pattern Introduced | Exact Record Count | Remediation Disposition |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `a794998` | Biodiversity species expansion | `src/data/species/plants.ts`, `birds.ts`, `fish.ts`, `mammals.ts` | Loop-generated `"Genus specio-N"` (`flora-29..1834`), `"Family sp. N"` (`BRD-GEN-34..583`), 12 non-fish aquatic organisms in `fish.ts`, and 6 copy-pasted district arrays across 111 mammals | **2,368** (`1,806` plants + `550` birds + `12` non-fish) + `111` mammal range templates | **Quarantined** (`2,368` synthetic/non-fish) & **Corrected** (`111` mammal envelopes, `28` plants, `46` birds, `54` fish) |
| `89f6871` & `63c8291` | Water systems & watershed scaffolding | `src/data/water-systems.ts` | 374 procedurally combined watershed objects pairing random district names with `"Coastal Watershed"` labels, wrong parent rivers, and scrambled elevations (e.g., Tso Moriri in Samba, Nowshera in Kargil) | **374** watersheds | **Quarantined** (`374` scrambled) & **Reconstructed** (`28` verified Indus/Jhelum/Chenab/Shyok/Zanskar/Gilgit basins) |
| `d2e8cea` | Algal bloom intelligence hub | `src/data/algal-bloom-lakes.ts`, `src/data/algal-bloom-intelligence-hub.ts`, `src/app/api/hazard-intelligence/algal-blooms/route.ts` | 17 lakes hardcoded to `[34.0, 74.8]`, 35+ lakes pinned to town centroids, 8 false Ramsar flags, 11 synthetic lab cyanotoxin IDs (`KU-LIM-2026-*`), `isOfficialHealthAdvisory: true` on Dal Lake, and `+2.5 µg/L` live weather mutation | **52** lake pins + **11** lab records + **8** Ramsar flags | **Corrected** (`52` lake coordinates, `8` Ramsar flags, NDCI math) & **Quarantined** (`11` synthetic lab assays + fake health ban withdrawn) |
| `444c5fc` | Environmental PIL legal portal | `src/data/environmental-pil.ts` | 26 algorithmically formatted 16-char `cnrNumber` strings (including Indian eCourts codes `AJKHC01...` / `GBSC01...` on AJ&K and Gilgit-Baltistan courts!), non-resolving PDF/IndianKanoon URLs, and duplicate bottom entries | **26** fabricated CNRs | **Quarantined / Withdrawn** (`26` unverified CNRs & broken court URLs; case themes retained with `'Pending Official Court Registry Verification'`) |
| `e7646a2` & `4d9065b` | Contributors, conferences, green heroes & security gates | `src/app/about/contributors/page.tsx`, `src/data/conference-system.ts`, `src/data/webinars.ts`, `src/data/kew-green-heroes.ts`, `src/app/admin/**` | 21 synthetic PhD profiles, fictional `"Prof. Elena Rostova"`, unconfirmed named faculty speakers, 5 unapproved hero candidate dossiers, fake 48 MB 2027–28 proceedings/Zenodo DOI, and hardcoded `'KEW-Admin-2026!'` | **37** synthetic person/speaker/candidate records + **18** credential literals | **Quarantined** (`37` synthetic profiles/dossiers) & **Purged** (`18` credential literals) |
| `87efcde` | District & forest intelligence pages | `src/data/districts-intelligence.ts`, `src/app/biodiversity/forest-ecosystems/page.tsx` | `2000 + index * 200` arithmetic loop for 14 districts and 11 `Math.random()` calls generating forest cover, carbon stock, and fire counts on render | **14** loop district profiles + **11** `Math.random()` generators | **Corrected** with canonical area/elevation/administrative baselines & FSI ISFR statutory figures; **0** `Math.random()` remaining |
| `8b01806` | 101 Sectoral Research Dossiers external corpus | `src/data/verified-external-evidence-corpus-100.json`, `cohort-25.ts`, `environmental-investigations-*.ts` | Unfiltered Crossref/Zenodo keyword harvesting injected 69 off-topic papers (tea, lacquer, coleoptera plates, beam deflection, plasma medicine, electoral factbook); conflated `REF-DAL-07`, misattributed `REF-DW-02`, and linked unofficial `jakfinance-jk.com` | **69** off-topic DOIs + **17** citation defects | **Quarantined** (`69` off-topic DOIs + `REF-DAL-07`) & **Corrected** (`REF-DW-02` -> Habib & Yousuf 2014; `jakfinance.nic.in` + PRS Budget Analysis) |

---

## 3. Root-Cause Taxonomy & Architectural Prevention

1. **Why Synthetic Records Appeared:** During early UI prototyping, developer seed scripts populated large array counts (`1,834` plants, `601` birds, `374` watersheds, `26` PIL CNRs) to stress-test pagination, search filters, and badge layouts, without marking those records `quarantined_unverified`.
2. **Why Downstream Counters Diverged:** Multiple components hardcoded snapshot counts (`182`, `150+`, `47`, `32` protected areas; `62` vs `553` lakes; `240+` vs `263` stations) instead of reading from a single provenance-backed registry.
3. **Permanent Structural Prevention Implemented:**
   - **Provenance Gateway (`src/lib/scientific-integrity/quarantine-gateway.ts`):** Enforces an 11-class provenance taxonomy and maintains `DATASET_QUARANTINE_MANIFEST`.
   - **Single Metric Registry (`src/data/platform-metrics.ts`):** Centralizes all headline numbers with 14-field provenance metadata.
   - **Automated CI/Build Integrity Guard (`scripts/audit/scientific-data-integrity-guard.js`):** Runs 15 deterministic static & data checks (`npm run audit:scientific-integrity`) that fail with exit code `1` if any synthetic taxon pattern, `Math.random()` telemetry generator, false Ramsar flag, fabricated CNR, or hardcoded secret is ever reintroduced.
