# Kashmir EcoWatch — Biodiversity Dataset Reconstruction Plan

**Audit Date:** November 27, 2026  
**Scope:** Vascular Flora (`plants.ts`), Avifauna (`birds.ts`), Mammalia (`mammals.ts`), Ichthyofauna (`fish.ts`), Threatened & Medicinal Taxa (`threatened.ts`, `medicinal.ts`)

---

## 1. Pre- vs Post-Remediation Dataset Baseline

| Taxonomic Group | Source File | Original Count | Verified Retained | Quarantined | Unverified | Corrected Envelopes | Post-Remediation Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Vascular Flora | `src/data/species/plants.ts` | 1,834 | **28** | **1,806** (`specio-N`) | 0 | 28 | Clean Reference Subset + Transparent Coverage Notice |
| Avifauna | `src/data/species/birds.ts` | 601 | **46** | **550** (`sp. N`) + 5 dupes | 0 | 46 | Clean Reference Subset + Flyway/Breeding Range Verified |
| Mammalia | `src/data/species/mammals.ts` | 111 | **111** | **0** | 0 | 111 | All 111 Binomials Valid; Bioclimatic District Envelopes Rebuilt |
| Freshwater Fish | `src/data/species/fish.ts` | 66 | **54** | **12** (non-fish) | 0 | 54 | Strictly Actinopterygii Taxa Retained |
| **Total Core Species** | `src/data/species/index.ts` | **2,612** | **239** | **2,368** (+5 dupes) | **0** | **239** | **Zero Synthetic Placeholders in Public Views** |

---

## 2. Scientific Policy: Why Synthetic Placeholders Were Quarantined Rather Than AI-Replaced

In strict compliance with the Supplementary P0 Scientific Integrity Directive:
1. **Zero LLM Taxon Generation:** Quarantined `Genus specio-N` and `Family sp. N` records were **not** replaced with newly LLM-invented checklists, which risk taxonomic synonymy errors, false regional occurrence assertions, and unverified IUCN statuses.
2. **Bioclimatic Envelope Enforcement:** Every retained taxon (`239` species) is constrained to verified elevation bands and subregional bioclimatic zones defined in `src/data/geographic-registry.ts` (`subtropical_shivalik_plains`, `middle_himalayan_pir_panjal`, `kashmir_valley_lacustrine_temperate`, `greater_himalayan_alpine`, `trans_himalayan_karakoram_cold_desert`).
3. **Anti-Poaching Coordinate Protection:** Sensitive `CR/EN` wildlife observations (`Hangul`, `Snow Leopard`, `Flare-horned Markhor`, `Kashmir Musk Deer`, `Western Tragopan`, `Black-necked Crane` nesting marshes, and CITES Appendix I herbs *Saussurea costus*) enforce masked or `>=10 km` generalized grid coordinates.

---

## 3. Staged Primary Literature & Herbarium Reconstruction Pipeline (Post-Launch Roadmap)

### Stage 1 — Authoritative Taxonomic Backbone Binding (Weeks 1–2)
- Bind every KEW species record to **GBIF Backbone Taxonomy `usageKey`**, **Catalogue of Life (CoL) ID**, and **IUCN Red List `taxonid`** via deterministic offline script (`scripts/biodiversity/reconcile-gbif-iucn.js`).
- Reject unaccepted synonyms unless explicitly linked via `acceptedScientificName` (e.g., *Cervus elaphus hanglu* -> *Cervus hanglu ssp. hanglu*; *Capra falconeri cashmiriensis*).

### Stage 2 — Voucher-Backed Vascular Flora Expansion (Weeks 3–6)
- Primary Monographs:
  1. Stewart, R. R. (1972). *An Annotated Catalogue of the Vascular Plants of West Pakistan and Kashmir*.
  2. Khuroo, A. A., Dar, G. H., Khan, Z. S., & Malik, A. H. (2007 / 2020). *Biodiversity of the Kashmir Himalaya* (University of Kashmir Centre for Biodiversity & Taxonomy — KASH Herbarium).
  3. Botanical Survey of India (BSI) *Flora of Jammu & Kashmir* and *Flora of Cold Deserts of Western Himalaya (Ladakh)*.
- Admission Gate: Every added plant species must carry `taxonomicAuthority`, `herbariumOrMonographRef`, `elevationRangeM: [min, max]`, and verified district occurrence.

### Stage 3 — Avifauna & Asian Waterbird Census Integration (Weeks 3–5)
- Primary Sources: eBird India Basic Dataset (EBD) vetted checklists for J&K/Ladakh, Grimmett, Inskipp & Inskipp (*Birds of the Indian Subcontinent*), and Wetlands International **Asian Waterbird Census (AWC)** counts for Wular (`#461`), Hokersar (`#1570`), Shallbugh (`#2488`), Hygam (`#2496`), Tsomoriri (`#1213`), Tso Kar (`#2443`), and Surinsar-Mansar (`#1573`).

### Stage 4 — Ichthyofauna & Endemic Cryophilic Fauna Verification (Weeks 5–6)
- Primary Sources: Kullander, S. O., Fang, F., Delling, B., & Åhlander, E. (1999) *The Fishes of the Kashmir Valley* (Swedish Museum of Natural History) and FishBase Indus/Jhelum/Chenab drainage checklists.
