# Kashmir EcoWatch — Scientific Data Quarantine Register

**Audit Date:** November 27, 2026  
**Gateway Module:** `src/lib/scientific-integrity/quarantine-gateway.ts`  
**Public Leakage Check:** **0 Quarantined Records Exposed in Public UI, Search, Maps, Counters, Reports, APIs, or Exports**

---

## 1. Master Dataset Quarantine & Verification Ledger

Every audited dataset below reports exact **Original**, **Verified**, **Quarantined**, **Unverified**, and **Corrected** record counts, alongside public fallback disclosures and remaining verification requirements.

| Dataset ID | Dataset Title | Source File | Original | Verified | Quarantined | Unverified | Corrected | Reason Code |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `species-flora-registry` | Western Himalayan Vascular Flora Checklist | `src/data/species/plants.ts` | 1,834 | 28 | 1,806 | 0 | 28 | `SYNTHETIC_BINOMIAL_OR_PLACEHOLDER_TAXON` |
| `species-avifauna-registry` | Western Himalayan Avifauna Checklist | `src/data/species/birds.ts` | 601 | 46 | 550 | 0 | 46 | `SYNTHETIC_BINOMIAL_OR_PLACEHOLDER_TAXON` |
| `species-ichthyofauna-registry` | Western Himalayan Freshwater Fish Registry | `src/data/species/fish.ts` | 66 | 54 | 12 | 0 | 54 | `TAXONOMIC_CLASS_MISMATCH` |
| `species-mammals-distributions` | Western Himalayan Mammalian Envelopes | `src/data/species/mammals.ts` | 111 | 111 | 0 | 0 | 111 | `PROCEDURAL_TEMPLATE_SCRAMBLE` |
| `hydrology-watersheds-registry` | River Basins & Major Sub-Basins | `src/data/water-systems.ts` | 374 | 28 | 374 | 0 | 28 | `PROCEDURAL_TEMPLATE_SCRAMBLE` |
| `algal-bloom-labs-and-pins` | Algal Bloom Lake Pins & Lab Cyanotoxin Catalog | `src/data/algal-bloom-lakes.ts` / `algal-bloom-intelligence-hub.ts` | 74 | 52 | 11 | 12 | 63 | `UNCALIBRATED_SYNTHETIC_MEASUREMENT` |
| `protected-areas-scope` | Western Himalayan Protected Area Registry | `src/data/protected-network.ts` | 47 | 45 | 2 | 0 | 7 | `OUT_OF_GEOGRAPHIC_SCOPE` |
| `judicial-pil-docket-registry` | Environmental PIL & NGT Docket Inventory | `src/data/environmental-pil.ts` | 26 | 14 | 26 (CNRs) | 12 | 26 | `FABRICATED_JUDICIAL_IDENTIFIER` |
| `institutional-academic-profiles` | Academic Contributors, Speakers & Candidate Heroes | `contributors/page.tsx`, `conference-system.ts`, `kew-green-heroes.ts` | 38 | 1 | 37 | 0 | 38 | `SYNTHETIC_INSTITUTIONAL_OR_SPEAKER_PROFILE` |
| `sectoral-dossiers-external-corpus` | 101 Sectoral Dossiers External Literature Corpus | `src/data/verified-external-evidence-corpus-100.json` | 470 | 401 | 69 | 5 | 77 | `UNVERIFIED_CITATION_OR_CORPUS_POLLUTION` |

---

## 2. Detailed Quarantine Entries & Remaining Verification Requirements

### 2.1 `species-flora-registry` (`src/data/species/plants.ts`)
- **Quarantined Range:** `flora-29` through `flora-1834` (`1,806` entries with `"Genus specio-N"` binomials and modulo-10 district assignments).
- **Retained Verified Records (`28`):** `flora-1` through `flora-28` (*Platanus orientalis*, *Cedrus deodara*, *Pinus wallichiana*, *Abies pindrow*, *Picea smithiana*, *Taxus wallichiana*, *Betula utilis*, *Ulmus wallichiana*, *Juglans regia*, *Crocus sativus*, *Saussurea costus*, *Aconitum heterophyllum*, *Picrorhiza kurroa*, *Arnebia benthamii*, *Podophyllum hexandrum*, *Nelumbo nucifera*, *Trapa natans*, etc.), with corrected elevation and district envelopes.
- **Public Transparent State:** *"Displaying 28 taxonomically verified Western Himalayan reference plant species; 1,806 unverified placeholder entries are quarantined pending BSI / University of Kashmir herbarium checklist verification."*
- **Remaining Verification Requirement:** Batch-verify species against Stewart (1972) *Annotated Catalogue of the Vascular Plants of West Pakistan and Kashmir* and Khuroo et al. (2007/2020) Kashmir Himalaya flora checklists before expanding public count.

### 2.2 `species-avifauna-registry` (`src/data/species/birds.ts`)
- **Quarantined Range:** `BRD-GEN-34` through `BRD-GEN-583` (`550` `"Family sp. N"` entries) + `5` duplicate entries merged between `BRD-GEN` and `MIG`.
- **Retained Verified Records (`46`):** Authentic resident, Himalayan endemic (*Ficedula subrubra*, *Sitta cashmirensis*, *Pyrrhula aurantiaca*, *Tragopan melanocephalus*, *Lophophorus impejanus*, *Catreus wallichii*), Trans-Himalayan breeding (*Grus nigricollis* corrected to `['Leh']`), and Central Asian Flyway waterbird taxa.
- **Remaining Verification Requirement:** Cross-check full ~550-species regional avian checklist against eBird India bar charts and Asian Waterbird Census (AWC) wetland counts.

### 2.3 `species-ichthyofauna-registry` (`src/data/species/fish.ts`)
- **Quarantined Range:** `fish-55` through `fish-66` (`12` non-fish entries: *Lutra lutra* mammal, amphibians, macroinvertebrates, and 4 aquatic macrophytes). Also corrected `thr-fsh-08` (*Platanista gangetica minor* Indus River Dolphin) in `src/data/species/threatened.ts` from `'fish'` in `'Jammu'` to freshwater cetacean mammal context.
- **Retained Verified Records (`54`):** True Actinopterygii freshwater fish (*Schizothorax* snowtrout spp., *Triplophysa* stone loaches, *Glyptothorax* mountain catfishes, *Tor putitora* mahseer, and introduced *Salmo trutta* / *Oncorhynchus mykiss*).
- **Remaining Verification Requirement:** Attach Kullander et al. (1999) and FishBase basin-level voucher references per species.

### 2.4 `hydrology-watersheds-registry` (`src/data/water-systems.ts`)
- **Quarantined Range:** All `374` procedurally scrambled sub-watershed placeholders (including landlocked `"Coastal Watershed"` entries and mismatched Tso Moriri / Mirgund / Nowshera catchments).
- **Reconstructed Verified Records (`28`):** Hydrologically verified Western Himalayan river basins and major tributary sub-basins across the Upper Indus, Shyok-Nubra, Zanskar-Suru, Gilgit-Hunza-Shigar-Astore, Jhelum (Lidder, Sind, Pohru, Vishow, Rambiara, Dudhganga, Sukhnag, Erin-Madhumati, Wular Direct, Neelum/Kishanganga, Kunhar, Poonch), Chenab (Marusudar, Bichleri, Tawi, Munawar Tawi), Ravi-Ujh, and Endorheic Changthang systems.
- **Remaining Verification Requirement:** Import DEM-derived HydroBASINS Level 7/8 and India-WRIS GeoJSON catchment boundaries.

### 2.5 `algal-bloom-labs-and-pins` (`src/data/algal-bloom-intelligence-hub.ts`)
- **Quarantined Records (`11`):** Synthetic chain-of-custody laboratory cyanotoxin rows (`KU-LIM-2026-D04`, `JK-ENV-2026-W09`, `JU-ENV-2026-MS01`, `PCRWR-AJK-2026-MG01`, etc.) and synthetic Dal Lake official public health bathing ban (`AL-BLM-DAL-01`).
- **Unverified / Static Benchmark Records (`12`):** LCMA / J&K STP capacity rows reclassified from `'Operational - Active Telemetry'` OCEMS to static `'Published Audit / Design Capacity Reference (Non-Live)'`.
- **Remaining Verification Requirement:** Execute formal laboratory data-sharing MoUs prior to publishing ELISA/LC-MS cyanotoxin concentrations.

### 2.6 `protected-areas-scope` (`src/data/protected-network.ts`)
- **Quarantined Out-of-Scope Records (`2`):** `Great Himalayan National Park` and `Pin Valley National Park` (located in Himachal Pradesh, outside KEW's 5-region Western Himalayan scope).
- **Retained Verified Records (`45`):** In-scope National Parks, Wildlife Sanctuaries, and Conservation/Wetland Reserves across Kashmir Valley, Jammu Region, Ladakh, AJ&K, and Gilgit-Baltistan.

### 2.7 `judicial-pil-docket-registry` (`src/data/environmental-pil.ts`)
- **Quarantined Identifiers (`26`):** All 26 fabricated 16-character `cnrNumber` values (including impossible `AJKHC01...` and `GBSC01...` codes) and non-resolving PDF/IndianKanoon links withdrawn. `14` landmark public environmental litigation themes verified against public court reporting; `12` regional docket items marked `'Pending Official Court Registry Verification'`.
- **Remaining Verification Requirement:** Retrieve certified PDF court orders and official `WP(C) PIL` / `OA` numbers directly from High Court of J&K and Ladakh and NGT Principal Bench registries.

### 2.8 `institutional-academic-profiles` (`contributors/page.tsx`, `conference-system.ts`, `kew-green-heroes.ts`)
- **Quarantined Records (`37`):** `21` synthetic PhD contributor profiles, fictional `"Prof. Elena Rostova"`, `10` unconfirmed named faculty speaker slots, and `5` unapproved candidate Green Heroes dossiers.
- **Remaining Verification Requirement:** Written opt-in consent, ORCID verification, and institutional confirmation required before publishing any external individual's name or affiliation.

### 2.9 `sectoral-dossiers-external-corpus` (`src/data/verified-external-evidence-corpus-100.json`)
- **Quarantined Literature Hits (`69`):** Off-topic automated Crossref/Zenodo keyword matches purged from `verified-external-evidence-corpus-100.json` and `cohort-25.ts`, plus fabricated `REF-DAL-07` removed from `KEW-INV-0001`.
- **Remaining Verification Requirement:** Specialist full-text review of abstract-verified papers across all 101 dossiers.
