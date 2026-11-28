# Kashmir EcoWatch — Geographic, Coordinate, Ramsar & Species Distribution Audit (`Phase 4`)

**Audit Date:** November 27, 2026  
**Canonical Registry:** `src/data/geographic-registry.ts`  
**Status:** **REMEDIATED (`0` False Ramsar Designations, `0` Sub-District Tehsils in District Arrays, `52` Lake Pins Corrected)**

---

## 1. Canonical 5-Region & 46-District Taxonomy

Kashmir EcoWatch covers five contiguous Western Himalayan administrative-ecological subregions:
1. **Kashmir Valley (`10` districts):** Srinagar, Ganderbal, Budgam, Anantnag, Kulgam, Pulwama *(including Pampore tehsil)*, Shopian, Baramulla, Bandipora, Kupwara.
2. **Jammu Region (`10` districts):** Jammu, Samba, Kathua, Udhampur, Reasi, Rajouri, Poonch, Doda, Ramban, Kishtwar.
3. **Ladakh (`2` operational baseline districts + `5` Aug 2024 notified districts):** Leh and Kargil *(with explicit disclosure of Zanskar, Drass, Sham, Nubra, and Changthang notified in August 2024 awaiting separate Census/GIS polygon gazettes)*.
4. **Azad Jammu & Kashmir (`10` districts):** Muzaffarabad, Neelum, Jhelum Valley, Bagh, Haveli, Poonch (AJK), Sudhnoti, Kotli, Mirpur, Bhimber.
5. **Gilgit-Baltistan (`14` districts):** Gilgit, Hunza, Nagar, Ghizer, Gupis-Yasin, Diamer, Darel, Tangir, Astore, Skardu, Shigar, Kharmang, Roundu, Ghanche.

---

## 2. Official Ramsar Wetland Verification (`7` RSIS Sites vs `11` False Claims Removed)

Cross-verification against the official **Ramsar Sites Information Service (RSIS)** confirmed **exactly 7** designated Ramsar sites within KEW's 5-region scope:

| RSIS # | Official RSIS Name | Subregion | Verified Districts | Coordinates | Designated Area |
| :---: | :--- | :--- | :--- | :---: | :---: |
| `#461` | **Wular Lake** | Kashmir Valley | Bandipora, Baramulla | `34.360°N, 74.560°E` | `189.00 km²` (18,900 ha) |
| `#1213` | **Tsomoriri** | Ladakh | Leh | `32.900°N, 78.310°E` | `120.00 km²` (12,000 ha) |
| `#1570` | **Hokera Wetland** (Hokersar) | Kashmir Valley | Srinagar, Budgam | `34.105°N, 74.715°E` | `13.75 km²` (1,375 ha) |
| `#1573` | **Surinsar-Mansar Lakes** | Jammu Region | Samba, Udhampur, Jammu | `32.735°N, 75.105°E` | `3.50 km²` (350 ha) |
| `#2443` | **Tso Kar Wetland Complex** | Ladakh | Leh | `33.300°N, 78.000°E` | `95.77 km²` (9,577 ha) |
| `#2488` | **Shallbugh Wetland Conservation Reserve** | Kashmir Valley | Ganderbal, Srinagar | `34.160°N, 74.725°E` | `16.75 km²` (1,675 ha) |
| `#2496` | **Hygam Wetland Conservation Reserve** | Kashmir Valley | Baramulla | `34.242°N, 74.525°E` | `8.02 km²` (802 ha) |

**11 False Ramsar Claims Removed:**
1. `Mangla Dam (#820)` in `geography.ts:317` & `geographic-scope/page.tsx:165` *(RSIS `#820` is actually Uchhali Complex in Salt Range, Punjab; Mangla is NOT a Ramsar site)*.
2. `Mirgund Wetland` in `algal-bloom-intelligence-hub.ts` *(domestic J&K Wetland Conservation Reserve, non-Ramsar; also corrected from `Kulgam` to `Baramulla / Budgam` at `34.135°N, 74.642°E`)*.
3. `Anchar Lake`, `Manasbal Lake`, `Narkara`, `Chatlam`, `Fashkoori`, `Kranchoo`, `Malangpora` in `algal-bloom-intelligence-hub.ts`.
4. `Pangong Tso` in `environmental-pil.ts` *(proposed/transboundary high-altitude lake, NOT inscribed on RSIS)*.
5. `Dal Lake` in `scientific-program-2027-2028.ts`.
*(Additionally fixed Hygam `ramsarSite: false -> true` in `src/data/geojson/wetlands.json:80` and corrected swapped RSIS numbers `#2487/#2486/#2490/#2489` to `#2488` Shallbugh and `#2496` Hygam.)*

---

## 3. Detailed Geospatial & Taxonomy Issue Register

### `GEO-P0-001` — 11 Incorrect Ramsar Designations & Wrong RSIS Site Numbers
- **Issue ID:** `GEO-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/about/geographic-scope`, `/water-systems/wetlands`, `/hazard-intelligence/algal-bloom-intelligence`, `/resources/environmental-pil`
- **Affected file:** `src/data/geography.ts`, `src/app/about/geographic-scope/page.tsx`, `src/data/algal-bloom-intelligence-hub.ts`, `src/data/algal-bloom-lakes.ts`, `src/data/protected-network.ts`, `src/data/environmental-pil.ts`, `src/data/scientific-program-2027-2028.ts`, `src/data/geojson/wetlands.json`
- **Original condition:** 11 non-Ramsar waterbodies carried Ramsar designations (including `Mangla #820`, `Mirgund`, `Dal`, `Anchar`, `Pangong`), Hygam was marked `ramsarSite: false` in GeoJSON, and Shallbugh/Hygam carried wrong RSIS numbers.
- **Root cause:** Confusion between domestic Wildlife Protection Act Wetland Conservation Reserves and international Ramsar Convention RSIS inscriptions.
- **Supporting evidence:** Official RSIS database (`rsis.ramsar.org/ris/461`, `1213`, `1570`, `1573`, `2443`, `2488`, `2496`).
- **Corrective action:** Created `VERIFIED_WESTERN_HIMALAYAN_RAMSAR_SITES` in `src/data/geographic-registry.ts` and corrected all 8 files above.
- **Verification method:** `GUARD-07` automated check.
- **Current status:** `Resolved`
- **Remaining limitations:** None.

---

### `GEO-P0-002` — 374 Procedurally Scrambled Watersheds Including Landlocked `"Coastal Watershed"` Records
- **Issue ID:** `GEO-P0-002`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/water-systems`, `/water-systems/watersheds`
- **Affected file:** `src/data/water-systems.ts`
- **Original condition:** All 374 records in `watershedsData` were procedurally generated permutations (*"Kathua Coastal Watershed"* at 2,700 m, *Tso Moriri Catchment* in Samba, *Mirgund Catchment* under Kausarnag in Bandipora at 2,936 m, *Nowshera Catchment* in Kargil), and `indus-river` was pinned in Tibet (`31.2505, 81.3322`).
- **Root cause:** Procedural template script crossed district names, waterbody names, and coastal terrain strings without hydrographic topology.
- **Supporting evidence:** Phase 4 audit (`phase4_report.md`) and commit `89f6871`.
- **Corrective action:** Quarantined all 374 scrambled entries and reconstructed 28 hydrologically verified Western Himalayan river basins and major tributary sub-basins; updated `indus-river` pin to Upper Indus corridor (`34.16, 77.58`).
- **Verification method:** `GUARD-08` automated check.
- **Current status:** `Resolved`
- **Remaining limitations:** Fine-scale HydroBASINS Level 8 polygon boundaries queued for GIS Phase II import.

---

### `GEO-P1-003` — Mirgund Misplaced in Kulgam, Pampore Listed as a District, and 52 Collapsed Lake Coordinates
- **Issue ID:** `GEO-P1-003`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/water-systems/wetlands/mirgund-wetland`, `/hazard-intelligence/algal-bloom-intelligence`, `/environmental-investigations`, `/districts/[slug]`
- **Affected file:** `src/data/water-systems.ts`, `src/data/algal-bloom-lakes.ts`, `src/data/algal-bloom-intelligence-hub.ts`, `src/data/protected-network.ts`, `src/data/environmental-investigations-portfolio.ts`, `src/data/districts-intelligence.ts`, `src/data/biodiversity-intelligence.ts`
- **Original condition:** Mirgund Wetland was placed in `Kulgam` instead of `Baramulla / Budgam` (`34.135°N, 74.642°E`); `Pampore` tehsil appeared as a standalone district (inflating J&K district count to `21`); `'Pulwara'` typo appeared for `'Pulwama'`; 17 lakes in `algal-bloom-lakes.ts` were hardcoded to `[34.0, 74.8]` and 35+ alpine lakes were pinned to town centroids; 2 Himachal Pradesh NPs were included in Western Himalayan scope.
- **Root cause:** Unvalidated centroid geocoding and sub-district locality strings inserted into district arrays.
- **Supporting evidence:** `phase4_report.md` coordinate & district tables.
- **Corrective action:** Corrected Mirgund across all files (`Baramulla / Budgam`, `4.0 km²`), nested Pampore under `Pulwama` via `normalizeCanonicalDistrictName()`, fixed all 52 collapsed lake coordinates, removed the 2 out-of-scope Himachal Pradesh NPs, fixed `Tata Kutti WLS` scope (`Poonch`, Jammu/Pir Panjal), and replaced the 14 `2000 + index*200` loop district profiles in `districts-intelligence.ts`.
- **Verification method:** `GUARD-06`, `GUARD-07`, and `GUARD-08` automated checks.
- **Current status:** `Resolved`
- **Remaining limitations:** None.

---

### `GEO-P1-004` — Bioclimatically Impossible Mammalian, Avian & Floral District Templates
- **Issue ID:** `GEO-P1-004`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/biodiversity`, `/biodiversity/mammals`, `/biodiversity/birds`, `/biodiversity/flora`, `/biodiversity/district/[slug]`
- **Affected file:** `src/data/species/mammals.ts`, `src/data/species/birds.ts`, `src/data/species/plants.ts`, `src/data/species/fish.ts`, `src/data/species/threatened.ts`, `src/data/species/medicinal.ts`
- **Original condition:** 6 copy-pasted district arrays placed Snow Leopard, Tibetan Wolf, and Asiatic Ibex in subtropical `Jammu, Samba, Mirpur, Bhimber` while placing ~40 lowland Shivalik mammals (Nilgai, Chital, Sambar, Pangolin, Fruit Bats) in `Leh, Kargil` alpine deserts; Black-necked Crane lacked `Leh` and was placed in `Srinagar/Budgam`; Indus River Dolphin was typed `'fish'` in `'Jammu'`.
- **Root cause:** Bulk array assignment without elevation or bioregion filtering.
- **Supporting evidence:** `phase4_report.md` species distribution matrix.
- **Corrective action:** Reassigned all 111 mammals, 46 unique birds, 54 fish, and 28 verified flora to bioclimatically verified district envelopes aligned with `CANONICAL_DISTRICTS` (`src/data/geographic-registry.ts`), and reclassified Indus River Dolphin as a mammal.
- **Verification method:** `GUARD-04` and `GUARD-05` automated checks.
- **Current status:** `Resolved`
- **Remaining limitations:** Point voucher specimen integration from GBIF / WII planned under `BIODIVERSITY_RECONSTRUCTION_PLAN.md`.
