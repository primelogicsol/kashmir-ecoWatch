// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — FLAGSHIP SCIENTIFIC MONOGRAPH KEW-SR-2026-101
// "KASHMIR'S LAKES: FROM OLIGOTROPHY TO EUTROPHICATION"
// Synchronized 100% with MASTER_LAKE_REGISTRY (src/data/hydrology/master-lake-registry.ts)
// ─────────────────────────────────────────────────────────────────────────────

import type { IndividualScientificDossierSpec } from '@/types/scientific-dossier-reconstruction';

export interface FlagshipScientificAppendix {
  letter: string;
  title: string;
  scope: string;
  artifactUrl: string;
  summary: string;
}

export const FLAGSHIP_101_APPENDICES: FlagshipScientificAppendix[] = [
  {
    "letter": "Appendix A",
    "title": "Complete Master Lake Inventory",
    "scope": "521 deduplicated Kashmir Division lake identities (+ 32 extended Western Himalayan reference lakes = 553 platform records)",
    "artifactUrl": "/data/kew-kashmir-master-lakes.csv",
    "summary": "Permanent KEW Lake IDs (KEW-LK-0001..0553), official and local spellings, district, watershed, coordinates, coordinate precision class, elevation, typology, multi-epoch areas, Carlson TSI, GLOF class, and source record IDs."
  },
  {
    "letter": "Appendix B",
    "title": "Original Departmental Inventory Reconciliation (DEERS 2012)",
    "scope": "415 / 415 Kashmir Division LISS-III (2009–2010) records + 45 / 45 1967→2009 Present-Status rows (1,230 statewide verified)",
    "artifactUrl": "/data/kew-lake-source-reconciliation.json",
    "summary": "Page-by-page extraction of Nasim & Keng (May 2012), preserving compound open-water vs marshy sub-parts (e.g., Wular 2,472.3 ha open + 9,191.2 ha marshy; Dal 1,129.4 ha open + 187.9 ha marshy) and pre-2007 to 10-district mapping."
  },
  {
    "letter": "Appendix C",
    "title": "CAG Historical Inventory Reconciliation (Report No. 4 of 2025)",
    "scope": "330 Kashmir historical baseline (56 disappeared, 144 shrunk, 104 expanded, 26 unchanged); 13 named Kashmir audit/dried-up lakes linked; 317 appendix rows queued",
    "artifactUrl": "/data/kew-lake-source-reconciliation.json",
    "summary": "Reconciles official CAG Performance Audit findings (697 J&K natural lakes, 63 sampled, 6 detailed-checked, ₹560.65 cr CAPEX) and logs Appendices 2.1–2.10 in the explicit acquisition queue due to saiindia.gov.in / cag.gov.in server outages."
  },
  {
    "letter": "Appendix D",
    "title": "Glacial Lake GIS Inventory Reconciliation (University of Kashmir Zenodo 2025)",
    "scope": "155 / 155 glacial lake polygons (1992–2024) across 14 Kashmir Himalayan watersheds (DOI: 10.5281/zenodo.15051825)",
    "artifactUrl": "/data/kew-kashmir-master-lakes.geojson",
    "summary": "Inverse-projected WGS84 polygons from EPSG:32643, matching 77 named alpine lakes and registering 78 additional georeferenced proglacial/cirque tarns with GLOF susceptibility strictly separated from trophic status."
  },
  {
    "letter": "Appendix E",
    "title": "Water-Body Census Reconciliation (Ministry of Jal Shakti First Census)",
    "scope": "9,765 J&K enumerated water bodies (37 Lakes [0.38%] strictly separated from 5,256 Ponds, 441 Reservoirs, 179 Tanks, 29 Check Dams, 3,823 Others)",
    "artifactUrl": "/data/kew-lake-source-reconciliation.json",
    "summary": "Prevents typological inflation by isolating the 37 census lakes from 9,728 rural ponds, tanks, and irrigation structures, while documenting 1,051 dried-up and 103 encroached water bodies."
  },
  {
    "letter": "Appendix F",
    "title": "Lake Names, Kashmiri Transliterations and Alternative Spellings",
    "scope": "418 named Kashmir lake identities & 103 unnamed tarns/wetland basins",
    "artifactUrl": "/data/kew-kashmir-master-lakes.csv",
    "summary": "Cross-walk of Kashmiri suffixes (-Sar, -Nag, -Nambal, -Dal, -Kol, -Talao) and orthographical variants (Wular/Wullar, Nigeen/Nagin, Kausarnag/Konsar Nag, Gangabal/Gangbal, Nundkol/Nundkul, Krishansar/Kishan Sar)."
  },
  {
    "letter": "Appendix G",
    "title": "Historical Surface-Area Multi-Epoch Records (1911–2024)",
    "scope": "1967 SOI baseline, 1992 Landsat TM, 2009–2010 IRS LISS-III, 2014–2020 CAG remote sensing, and 2024 Sentinel-2/Landsat-9 epochs",
    "artifactUrl": "/data/kew-kashmir-master-lakes.csv",
    "summary": "Documents open-water vs total wetland-ecosystem boundary definitions to prevent incompatible cross-epoch area comparisons."
  },
  {
    "letter": "Appendix H",
    "title": "Published Water Chemistry Observations & Unit Validation",
    "scope": "22 Kashmir lakes with dated peer-reviewed physicochemical records (1972–2025)",
    "artifactUrl": "/data/kew-kashmir-master-lakes.csv",
    "summary": "Dated pH, DO, EC, TDS, Secchi depth, TP, Ortho-P, NO3-N, NH3-N, and Chl-a records, including unit-validation correction of Lone et al. (2021) Table 1 header (mg/L typo vs µg/L main-text concentrations)."
  },
  {
    "letter": "Appendix I",
    "title": "Carlson Trophic State Index (TSI) Individual Calculations",
    "scope": "22 assessed Kashmir Division lakes (10 Oligotrophic, 1 Mesotrophic, 6 Eutrophic, 5 Hypereutrophic) + 499 Insufficient Evidence",
    "artifactUrl": "/data/kew-kashmir-master-lakes.csv",
    "summary": "Individual TSI(SD), TSI(Chl-a), and TSI(TP) outputs computed strictly from positive measurements without blind averaging, highlighting macrophyte uptake and glacial rock-flour optical divergences."
  },
  {
    "letter": "Appendix J",
    "title": "Scientific Methodology, Vollenweider Mass-Balance & Model Variables",
    "scope": "18 integrated disciplines, Carlson (1977) & OECD (1982) thresholds, Vollenweider phosphorus retention equations",
    "artifactUrl": "/sectoral-eia/reports/kew-sr-2026-101",
    "summary": "Formalizes external vs internal sediment P loading, hydraulic residence time, optical water-type constraints, and statistical uncertainty rules."
  },
  {
    "letter": "Appendix K",
    "title": "Satellite Datasets, Atmospheric/Topographic Correction & Optical Screening",
    "scope": "Landsat MSS/TM/ETM+/OLI (1972–2025), IRS-P6 LISS-III, Sentinel-2 MSI (10–20 m), Sentinel-1 SAR; 29 optical-screening-eligible lakes",
    "artifactUrl": "/hazard-intelligence/algal-bloom-intelligence",
    "summary": "Specifies Sen2Cor/ACOLITE correction, DEM terrain-shadow masking, snow/ice exclusion, adjacency-effect buffers (>=4 ha open water), and MNDWI/NDCI validation limits."
  },
  {
    "letter": "Appendix L",
    "title": "Institutional Responsibility & Statutory Mandate Matrix",
    "scope": "LCMA, WUCMA, WMDA, J&K Forest Dept, Wildlife Protection Dept, JKPCC, Revenue Dept, J&K Wetland Authority",
    "artifactUrl": "/water-systems/restoration",
    "summary": "Maps statutory jurisdiction across all 521 Kashmir lake identities, addressing CAG (2025) findings that 691 of 697 J&K natural lakes lacked dedicated management plans."
  },
  {
    "letter": "Appendix M",
    "title": "Lake-Specific Conservation & Restoration Priorities",
    "scope": "Tiered P0 Emergency Nutrient Interception, P1 Sentinel Alpine/GLOF & Demarcation, P2 Baseline Inventory Verification",
    "artifactUrl": "/water-systems/lakes",
    "summary": "Pairs watershed sewer interception, septage management, internal P locking/selective de-weeding, riparian buffers, and alpine campsite setbacks with environmental trade-off appraisals."
  },
  {
    "letter": "Appendix N",
    "title": "Missing Scientific Data, Ungeoreferenced Records & Monitoring Queue",
    "scope": "499 Kashmir lakes lacking trophic measurements; 374 tabular records awaiting SOI/LISS-III coordinate pinning; 317 CAG appendix rows",
    "artifactUrl": "/data/kew-lake-source-reconciliation.json",
    "summary": "Explicit inventory completeness register ensuring zero silent omissions and guiding prioritized university/departmental sampling campaigns across Kupwara, Shopian, Pulwama, Budgam, Kulgam, and Baramulla."
  },
  {
    "letter": "Appendix O",
    "title": "Complete Verified Bibliography & Evidence Provenance Register",
    "scope": "12 core peer-reviewed, statutory audit, UN/FAO, NASA, and Zenodo DOI/URL-verified primary anchors",
    "artifactUrl": "/research-library",
    "summary": "Traceable bibliographic entries with live-checked DOIs, archive checksums, extracted quantitative findings, and domain applicability limitations."
  }
];

export const FLAGSHIP_101_LAKES_MONOGRAPH: IndividualScientificDossierSpec = {
  "code": "KEW-SR-2026-101",
  "sequenceNumber": 101,
  "publicationClassification": "Secondary-Data Scientific Review",
  "primaryDiscipline": "Limnology, Bathymetry & Trophic Biogeochemistry",
  "supportingDisciplines": [
    "Wetland Hydroperiod & Ramsar Ecological Character Science",
    "Phycology, Cyanobacterial Dynamics & Aquatic Ecotoxicology",
    "Glacial Geomorphology, Moraine Dam Geotechnical Stability & Breach Routing",
    "Agro-Hydrology, Soil Nutrient Mass Balance & Wetland Buffer Engineering",
    "Remote Sensing Radiometric Harmonization & Error Propagation Science",
    "Environmental Law, Regulatory Compliance & Judicial Accountability"
  ],
  "subtitle": "Comprehensive Inventory, Historical Transformation, Comparative Limnology, Nutrient Enrichment, Ecological Tipping Points and Conservation Pathways Across Kashmir's Urban, Rural, Montane, Subalpine, Alpine and Glacial Lake Systems",
  "researchIdentity": {
    "researchProblem": "Kashmir Division possesses hundreds of lacustrine ecosystems spanning 1,560 m alluvial floodplains to >4,500 m proglacial cirques, yet institutional inventories report conflicting totals (62 KEW legacy records, 415 DEERS 2012 waterbodies, 330 CAG 2025 historical lakes, 155 Zenodo glacial polygons, and 9,765 Jal Shakti census waterbodies) while unverified assumptions falsely label unmeasured alpine tarns 'pristine oligotrophic' or generalize urban hypereutrophication across all elevations.",
    "primaryResearchQuestion": "How do historical areal persistence and contemporary trophic states vary across Kashmir Division's complete altitudinal gradient (urban, rural floodplain, montane forest, subalpine, and alpine/glacial lakes), and what external watershed vs internal sediment mechanisms govern transitions from oligotrophy toward eutrophication and ecological tipping points?",
    "secondaryResearchQuestions": [
      "How do the 415 DEERS (2012) departmental records, 330 CAG (2025) historical comparison records, 155 Rashid & Kashani (2025) glacial lake polygons, and 37 Jal Shakti census lakes reconcile spatially across all ten districts of Kashmir Division (521 deduplicated identities)?",
      "Why do Carlson TSI(SD), TSI(Chl-a), and TSI(TP) diverge systematically across macrophyte-dominated valley lakes (Dal, Manasbal, Hokersar), silt-laden floodplain basins (Wular), and rock-flour-fed alpine glacial lakes (Gangabal, Gadsar, Sheshnag)?",
      "Which Kashmir lakes exhibit verified cultural eutrophication or hypereutrophication versus historical oligotrophy, and how many identifiable lakes currently lack sufficient dated chemistry for trophic classification?",
      "What institutional governance reforms and watershed-to-sediment interventions are required to arrest open-water loss, internal phosphorus recycling, and emerging high-altitude recreational/climatic stressors?"
    ],
    "scientificObjectives": [
      "Establish one authoritative, deduplicated Master Lake Registry covering all ten Kashmir Division districts (521 unique lake identities, separating 32 extended Western Himalayan reference lakes and 9,728 non-lake census ponds/tanks).",
      "Reconstruct multi-epoch lake area and persistence trajectories across 1967 SOI toposheets, 1992 Landsat TM, 2009–2010 IRS-P6 LISS-III, 2014–2020 CAG audit timelines, and 2024 Sentinel-2/Landsat-9 glacial polygons.",
      "Compute individual Carlson (1977) TSI(SD), TSI(Chl-a), and TSI(TP) indices strictly for the 22 Kashmir lakes possessing dated peer-reviewed measurements while classifying all 499 unmeasured lakes transparently as Insufficient Evidence.",
      "Synthesize external sewage/agricultural nutrient loading, internal anoxic sediment phosphorus feedback, biological community shifts (Bacillariophyceae to Cyanophyceae and invasive macrophytes), and institutional accountability across LCMA, WUCMA, WMDA, Forest, and Wildlife authorities."
    ],
    "hypotheses": [
      "H1 (Altitudinal-Anthropogenic Decoupling): Trophic enrichment across Kashmir's lakes is governed primarily by catchment urban imperviousness, unintercepted sewage, agricultural fertilizer flux, and hydraulic residence time rather than elevation alone, producing hypereutrophic/eutrophic valley basins (1,575–1,606 m) alongside oligotrophic alpine cirques (>3,400 m).",
      "H2 (Optical & Mineral Index Divergence): Unmodified averaging of Carlson TSI(SD), TSI(Chl-a), and TSI(TP) misclassifies both macrophyte-dominated valley lakes (where submerged plants sequester dissolved P/Chl-a) and glacially turbid alpine lakes (where mineral rock-flour depresses Secchi depth and elevates particulate P without algal proliferation).",
      "H3 (Bistable Hysteresis in Shallow Basins): Urban and rural floodplain lakes with summer hypolimnetic/benthic hypoxia and legacy organic muck (Dal, Nigeen, Anchar, Khushalsar, Gilsar) experience internal redox phosphorus release that sustains eutrophic-hypereutrophic states unless external sewage interception is paired with sediment P management.",
      "H4 (Bimodal Cryospheric vs Valley Area Trajectory): While valley-floor and karewa-foot lakes experienced severe net shrinkage and land-use conversion between 1967 and 2024, high-altitude proglacial lakes expanded in surface area (+1992 to 2024) due to glacier recession—an expansion reflecting cryospheric hazard rather than ecological improvement."
    ],
    "temporalBoundaries": {
      "historicalBaselineWindow": "1911–1989 (Early morphometric records, 1967 SOI 1:50,000 Toposheets, and 1972–1989 Zutshi/Vass Limnological Benchmarks)",
      "contemporaryObservationWindow": "1992–2026 (1992–2024 Glacial GIS Series, 2009–2010 DEERS LISS-III, 2017–2022 CAG Audit & 2020–2025 Peer-Reviewed Limnology)",
      "periodJustification": "Integrates the earliest statutory cartographic baseline (1967 SOI) used by DEERS and CAG with the 1977–1989 foundational high-mountain/valley limnological surveys and modern 2020–2025 multi-basin trophic and satellite assessments."
    },
    "environmentalReceptors": [
      "Pelagic phytoplankton guilds (Bacillariophyceae, Chlorophyceae, Cyanophyceae, Euglenophyceae) and zooplankton grazers",
      "Submerged charophyte/potamogeton meadows vs invasive floating macrophyte mats (Salvinia natans, Azolla cristata, Trapa natans)",
      "Endemic schizothoracine fishes (Schizothorax niger, S. esocinus, high-altitude Diptychus maculatus) and benthic macroinvertebrates",
      "Central Asian Flyway migratory waterfowl populations across Wular, Hokersar, Shallabugh, and Hygam",
      "Downstream drinking-water intakes, Jhelum flood-detention storage capacity, and proglacial valley settlements"
    ],
    "researchVariables": {
      "independentDrivers": [
        "Untreated municipal wastewater, non-networked mohallas, and houseboat blackwater/greywater discharges",
        "Catchment paddy/orchard nitrogen-phosphorus runoff and riparian marsh-to-plantation/habitation conversion",
        "Elevation-dependent warming, shortened winter ice cover, glacier recession, and seasonal alpine grazing/trekking pressure",
        "Basin morphometry (mean/max depth, fetch), hydraulic residence time, and Jhelum/tributary suspended silt loads"
      ],
      "dependentResponses": [
        "Secchi disk transparency (m), Chlorophyll-a (µg/L), Total Phosphorus (µg/L), Ortho-P (µg/L), and NO3-N / NH3-N (µg/L)",
        "Individual Carlson TSI(SD), TSI(Chl-a), and TSI(TP) values and hypolimnetic dissolved oxygen (mg/L)",
        "Multi-decadal open-water vs marshy surface-area change (%) and lake persistence/disappearance class"
      ],
      "confoundingFactors": [
        "Inorganic glacial rock-flour turbidity and apatite-bound particulate phosphorus in proglacial tarns (>3,400 m)",
        "Incompatible boundary definitions across inventories (open-water polygon vs total lake-marsh-rakh ecosystem)",
        "Seasonal monsoon/snowmelt discharge pulses and inter-study analytical differences across 1972–2025 publications"
      ]
    },
    "methodologySummary": "Executes a multi-source institutional inventory reconciliation, UTM-to-WGS84 geospatial polygon harmonization, unit-validated secondary water-chemistry compilation, unaveraged Carlson (1977) & OECD (1982) trophic state evaluation, Vollenweider nutrient retention analysis, and statutory governance appraisal across all 10 Kashmir Division districts.",
    "analyticalTechniques": [
      "Deterministic multi-criteria lake entity resolution (normalized Kashmiri toponymy, elevation compatibility, watershed membership, and <=1.8 km WGS84 centroid proximity)",
      "Inverse Transverse Mercator projection (EPSG:32643 -> EPSG:4326) and multi-epoch areal change classification (1967, 1992, 2009–2010, 2014–2020, 2024)",
      "Individual Carlson (1977) logarithmic trophic transformations [TSI(SD), TSI(Chl-a), TSI(TP)] paired with pairwise residual diagnostics [TSI(TP)-TSI(Chl-a) and TSI(Chl-a)-TSI(SD)]",
      "Vollenweider areal phosphorus loading and residence-time critical threshold evaluation distinguishing external vs internal benthic loading",
      "Canonical institutional mandate & CAPEX audit synthesis across CAG Report No. 4 of 2025, Wetlands Rules 2017, and Ramsar ecological character obligations"
    ],
    "expectedScientificContribution": "Delivers the first unified, non-fabricated regional limnological monograph and digital Trophic Status Atlas for Kashmir Division that reconciles 415 departmental, 330 historical audit, and 155 glacial GIS lake records into 521 auditable lake identities while replacing unverified 'pristine' assumptions with dated empirical classifications."
  },
  "studyArea": {
    "region": "Kashmir Division (All Ten Administrative Districts: Valley Floor, Karewa Tablelands, Pir Panjal & Greater Himalayan Cirques)",
    "districts": [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Ganderbal",
      "Kulgam",
      "Kupwara",
      "Pulwama",
      "Shopian",
      "Srinagar"
    ],
    "ecosystems": [
      "Urban & Peri-Urban Lacustrine Basins (1,580–1,606 m)",
      "Rural Jhelum Alluvial Floodplain & Oxbow Lakes (1,560–1,650 m)",
      "Montane Pine-Forest & Subalpine Moraine Basins (1,800–3,399 m)",
      "Alpine Cirque, Proglacial & Ice-Contact Glacial Lakes (3,400–4,600+ m)"
    ],
    "watershedOrDomain": "Upper Jhelum River Basin & 14 Tributary Sub-Watersheds (Sind, Lidder, Vishav, Rembiara, Madhumati, Erin, Pohru, Sukhnag, Doodhganga, Ferozpur, Ningal, Bringi, Kuthar, Romshi)",
    "geometryType": "Polygon Study Envelope",
    "spatialExtentKm2": "15,948 km^2 Kashmir Division administrative & lacustrine catchment domain",
    "elevationBand": "1,400–4,500 m ASL (Full Kashmir Division Lacustrine Gradient)",
    "coordinates": [
      34.2494,
      74.6694
    ],
    "studyLocations": [
      {
        "name": "Wular Lake Ramsar Floodplain Basin (Bandipora/Baramulla)",
        "latitude": 34.3644,
        "longitude": 74.5625,
        "elevationM": 1580,
        "role": "Largest Jhelum floodplain lake (2,472.3 ha open water + 9,191.2 ha marshy in DEERS 2012); polymictic silt-nutrient benchmark"
      },
      {
        "name": "Dal–Nigeen–Anchar–Khushalsar Urban Lacustrine Chain (Srinagar)",
        "latitude": 34.1106,
        "longitude": 74.8683,
        "elevationM": 1584,
        "role": "Urban cultural eutrophication, internal P recycling, and municipal wastewater pressure benchmark"
      },
      {
        "name": "Manasbal Warm-Monomictic Tectonic/Karst Basin (Ganderbal)",
        "latitude": 34.2494,
        "longitude": 74.6694,
        "elevationM": 1583,
        "role": "Deepest valley-floor stratifying lake (Z_max = 13 m) with clinograde summer hypolimnetic oxygen deficit"
      },
      {
        "name": "Harmukh–Sind Alpine Cascade: Gangabal, Nundkol, Gadsar, Krishansar & Vishansar (Ganderbal)",
        "latitude": 34.4319,
        "longitude": 74.9243,
        "elevationM": 3612,
        "role": "High-altitude oligotrophic glacial benchmark (Z_max up to 84 m; Vass et al. 1989 & Lone et al. 2021)"
      },
      {
        "name": "Pir Panjal & Lidder High-Mountain Basins: Kausarnag, Nilnag, Tarsar & Sheshnag (Kulgam/Budgam/Anantnag)",
        "latitude": 33.5064,
        "longitude": 74.8519,
        "elevationM": 3580,
        "role": "Southern Pir Panjal & Eastern Lidder cryospheric, forest-montane, and pilgrimage-exposed reference lakes"
      },
      {
        "name": "Kupwara Pohru–Kishanganga Rural & Montane Sars (Kan Sar, Buta Sar, Bran Khudu Sar)",
        "latitude": 34.5262,
        "longitude": 74.2546,
        "elevationM": 1700,
        "role": "Previously unmapped 66-waterbody northern district inventory requiring baseline limnological sampling"
      }
    ],
    "boundarySource": "Survey of India / Kashmir Division 10-District Administrative Envelope integrated with UoK Zenodo 15051825 UTM Zone 43N glacial lake polygons and DEERS (2012) LISS-III inventory",
    "spatialAccuracy": "+/- 10–30 m for 147 georeferenced polygon/centroid lakes; district-level tabular attribution explicitly flagged for ungeoreferenced DEERS 2012 entries",
    "gisLayers": [
      "KEW Master Kashmir Lake Polygons & Centroids (kew-kashmir-master-lakes.geojson, EPSG:4326)",
      "UoK Zenodo 2025 155 Glacial Lake Dynamics (1992–2024) & GLOF Susceptibility Vectors",
      "NWIA (2010) & Ramsar Wetland Connectivity Buffers (Wular #461, Hokersar #1207, Shallabugh #2486, Hygam #2485)",
      "Kashmir 10-District & 14-Sub-Watershed Hydrological Drainage Network"
    ]
  },
  "structuredAbstract": {
    "background": "Kashmir Division hosts a remarkable altitudinal continuum of urban, floodplain, montane forest, subalpine, and glacial lakes across ten districts (1,400–4,500 m ASL), yet fragmented departmental directories and unverified web counters previously obscured both true lake numbers and empirical trophic conditions.",
    "problem": "Institutional records cite 415 departmental waterbodies (DEERS 2012), 330 historical comparison lakes (CAG 2025), 155 glacial lakes (Rashid & Kashani 2025), and 9,765 census waterbodies (Jal Shakti), while legacy portals either omitted entire districts such as Kupwara or assumed all high-altitude tarns were 'pristine oligotrophic' without chemical measurements.",
    "objectives": "Reconcile all accessible institutional and GIS inventories into one deduplicated Master Lake Registry (521 Kashmir Division lake identities), evaluate multi-decadal areal loss versus glacial lake expansion, and quantify trophic states strictly from dated published Secchi, Chlorophyll-a, and Total Phosphorus evidence.",
    "methodology": "Combines page-verified PDF extraction (131-page DEERS directory, CAG Report No. 4 of 2025 brief, Jal Shakti First Census annexure), EPSG:32643->4326 shapefile conversion (155 glacial polygons), unit-audited literature synthesis (1972–2025), and unaveraged Carlson (1977) TSI diagnostics.",
    "findings": "Reconciliation establishes 521 unique Kashmir Division lake identities (490 currently observed, 31 historically disappeared/converted in retrieved records; CAG 2025 documents 56 disappeared and 144 shrunk of 330 historical Kashmir lakes). Only 22 Kashmir lakes possess dated trophic evidence (10 Oligotrophic, 1 Mesotrophic, 6 Eutrophic, 5 Hypereutrophic), leaving 499 lakes honestly classified as Insufficient Evidence.",
    "implications": "Demonstrates stark altitudinal-anthropogenic divergence: shallow valley-floor urban and floodplain lakes suffer cultural eutrophication, macrophyte infilling, and internal sediment P release, whereas alpine lakes remain biologically oligotrophic but face emerging cryospheric, pastoral, and trekking pressures.",
    "interventions": "Mandates establishing a unified statutory Lake Conservation & Limnological Authority (per CAG 2025), completing interceptor sewerage and septage treatment around urban/rural basins, managing internal benthic P in hypereutrophic lagoons, and executing baseline field sampling across the 499 unassessed Kashmir lakes."
  },
  "remoteSensingAndAnalyticalMethods": [
    {
      "sensorOrInstrument": "IRS-P6 LISS-III & Survey of India 1:50,000 Toposheets (DEERS 2012 Archive)",
      "productOrStandard": "23.5 m multispectral waterbody & wetland delineation (2009–2010) vs 1967 SOI baseline",
      "spatialOrAnalyticalResolution": "23.5 m spatial resolution; minimum mapping unit ~0.1–0.2 ha",
      "temporalCoverage": "1967 baseline vs 2009–2010 post-thaw/post-monsoon",
      "preprocessingAndMethod": "Page-level extraction of all 415 Kashmir Division records plus 45 converted waterbodies, separating open-water (Lake) and emergent-macrophyte (Marshy) sub-polygons.",
      "validationAndUncertainty": "15 SOI 1967 toposheets were excluded in the 1998/2012 departmental baseline; tabular records lack published lat/lon coordinates.",
      "roleInStudy": "Statutory / Legal Archival Corpus"
    },
    {
      "sensorOrInstrument": "Landsat 5 TM, Landsat 8/9 OLI & Copernicus Sentinel-2 MSI (Zenodo 15051825 & Optical Screening)",
      "productOrStandard": "Level-2 surface reflectance MNDWI glacial lake polygons (1992–2024) & calibrated Chl-a/NDCI screening",
      "spatialOrAnalyticalResolution": "10–20 m (Sentinel-2 MSI) and 30 m (Landsat TM/OLI) in WGS84 / UTM Zone 43N",
      "temporalCoverage": "1992–2024 multi-decadal late-ablation window (Aug–Oct)",
      "preprocessingAndMethod": "Atmospheric/terrain shadow masking, MNDWI water-boundary extraction across 155 Kashmir glacial lakes, and adjacency-screened optical bloom eligibility (>=4 ha open water).",
      "validationAndUncertainty": "Optical imagery cannot directly measure TP, TN, DO, or cyanotoxins; rock-flour turbidity confounds uncalibrated reflectance in proglacial lakes.",
      "roleInStudy": "Primary Orbital Sensor"
    },
    {
      "sensorOrInstrument": "APHA Standard Methods UV-Vis Spectrophotometry, Winkler/Digital DO & Secchi Disk Limnology",
      "productOrStandard": "APHA (1998/2017), Carlson (1977) TSI & OECD (1982) Eutrophication Thresholds",
      "spatialOrAnalyticalResolution": "Pelagic & sub-basin depth-discrete water-column stations across 22 studied Kashmir lakes",
      "temporalCoverage": "1972–2025 published peer-reviewed campaigns",
      "preprocessingAndMethod": "Molybdate-ascorbic acid colorimetric TP/Ortho-P, brucine/salicylate NO3-N, indophenol NH3-N, acetone-extracted Chl-a, and individual logarithmic TSI transformations.",
      "validationAndUncertainty": "Cross-checked published tables against main-text ranges (correcting Lone et al. 2021 Table 1 mg/L header misprint to µg/L); unequal seasonal sample sizes noted.",
      "roleInStudy": "Laboratory / Analytical Assay"
    },
    {
      "sensorOrInstrument": "CAG Performance Audit (Report No. 4 of 2025) & Jal Shakti First Census of Water Bodies",
      "productOrStandard": "Section 72 J&K Reorganisation Act Performance Audit (2017–2022) & National Water Body Census (2017–2018)",
      "spatialOrAnalyticalResolution": "697 J&K natural lakes (330 Kashmir, 63 test-checked, 6 detailed) & 9,765 J&K census waterbodies",
      "temporalCoverage": "1967–2022 statutory & remote-sensing audit record",
      "preprocessingAndMethod": "Statutory reconciliation isolating 37 census lakes from 9,728 ponds/tanks/reservoirs and linking CAG encroachment, STP, and governance findings.",
      "validationAndUncertainty": "317 individual CAG Kashmir appendix rows remain queued due to upstream saiindia.gov.in / cag.gov.in server unavailability during automated retrieval.",
      "roleInStudy": "Statutory / Legal Archival Corpus"
    }
  ],
  "remoteSensingApplicabilityNote": "Satellite remote sensing (Landsat TM/OLI, IRS LISS-III, Sentinel-2 MSI, Sentinel-1 SAR) is applied strictly for surface-water extent, shoreline shrinkage, glacial lake expansion, emergent macrophyte cover, and calibrated chlorophyll-a proxy screening on sufficiently large lakes (>=4 ha). Nutrient concentrations (TP, SRP, TN, NO3, NH4), dissolved oxygen, benthic phosphorus release, and cyanotoxins require in-situ and laboratory measurements.",
  "indicators": [
    {
      "id": "IND-101-01",
      "name": "Deduplicated Kashmir Division Lake Identity & Trophic Evidence Coverage",
      "scientificDefinition": "Total verified unique lacustrine identities across Kashmir's 10 districts and percentage possessing dated peer-reviewed Secchi, Chlorophyll-a, or Total Phosphorus trophic assessments.",
      "unit": "% assessed (of 521 lakes)",
      "measurementMethodology": "Multi-source spatial and toponymic entity resolution across DEERS (2012), UoK Zenodo (2025), CAG (2025), and peer-reviewed limnological literature.",
      "dataSource": "KEW Master Lake Registry v1.0 (DEERS 2012 + Zenodo 15051825 + CAG 2025 + Literature)",
      "observationPeriod": "1967–2026",
      "spatialScale": "All 10 Districts of Kashmir Division (521 unique lake identities)",
      "scientificRelevance": "Quantifies the regional scientific monitoring deficit and prevents extrapolating trophic classifications to unmeasured lakes.",
      "regulatoryThresholdLabel": "100% Statutory Inventory & Baseline Assessment Mandate (1989 GoJ&K / CAG 2025)",
      "thresholdValue": 100.0,
      "baselineValue": 11.9,
      "observedValue": 4.22,
      "classification": "Critical",
      "trend": "Pending Field Sampling",
      "uncertainty": "Exact for parsed inventories; +/- 10–15% potential overlap between 78 unnamed glacial polygons and ungeoreferenced DEERS alpine tarns",
      "provenanceClass": "Historical Record",
      "dataAvailability": "Statutory Monitoring Record",
      "validationStatus": "Statutory Audit Verified"
    },
    {
      "id": "IND-101-02",
      "name": "Historical Kashmir Lake Shrinkage & Disappearance Ratio (CAG 1967–2014 Baseline)",
      "scientificDefinition": "Combined percentage of historical Kashmir Division lakes that either disappeared completely (56) or decreased in surface area (144) out of 330 evaluated lakes.",
      "unit": "% of 330 lakes",
      "measurementMethodology": "Multi-temporal remote sensing and Survey of India 1967 toposheet comparison audited in CAG Report No. 4 of 2025.",
      "dataSource": "CAG Report No. 4 of 2025 & EE&RSD Atlas of Lakes and Wetlands",
      "observationPeriod": "1967–2014 (audited through 2022)",
      "spatialScale": "Kashmir Division Historical Lake Population (n = 330)",
      "scientificRelevance": "Measures cumulative basin-scale loss of lacustrine flood storage, open-water habitat, and wetland buffering.",
      "regulatoryThresholdLabel": "Zero Net Wetland/Lake Loss (Wetlands Rules 2017)",
      "thresholdValue": 0.0,
      "baselineValue": 13.6,
      "observedValue": 60.61,
      "classification": "Critical",
      "trend": "Deteriorating",
      "uncertainty": "CAG noted EE&RSD remote-sensing classifications require ground-truthing for seasonal water-level variance",
      "provenanceClass": "Historical Record",
      "dataAvailability": "Statutory Monitoring Record",
      "validationStatus": "Statutory Audit Verified"
    },
    {
      "id": "IND-101-03",
      "name": "Valley-Floor Urban & Floodplain Total Phosphorus Concentration (TP)",
      "scientificDefinition": "Mean epilimnetic total phosphorus concentration across scientifically assessed Kashmir valley-floor lakes (Manasbal, Dal, Wular, Hokersar, Nigeen, Anchar, Gilsar, Khushalsar).",
      "unit": "µg/L",
      "measurementMethodology": "APHA persulfate digestion and ascorbic-acid colorimetric spectrophotometry across published seasonal campaigns.",
      "dataSource": "Mir & Pandit (2021); Dar et al. (2020, 2021); Solim & Wanganeo (2008); Ali et al. (2025)",
      "observationPeriod": "2002–2023",
      "spatialScale": "Assessed Valley-Floor Lakes (1,575–1,606 m ASL)",
      "scientificRelevance": "Primary macronutrient governing cultural eutrophication, cyanobacterial/macrophyte blooms, and Carlson TSI(TP).",
      "regulatoryThresholdLabel": "OECD Eutrophic Boundary (35 µg/L; Hypereutrophic >100 µg/L)",
      "thresholdValue": 35.0,
      "baselineValue": 42.0,
      "observedValue": 277.5,
      "classification": "Critical",
      "trend": "Deteriorating",
      "uncertainty": "+/- 18% inter-seasonal and inter-basin variance (58 µg/L Manasbal to >460 µg/L Khushalsar/Brari Nambal)",
      "provenanceClass": "Literature-Derived",
      "dataAvailability": "Published Secondary Baseline",
      "validationStatus": "Secondary-Literature Verified"
    },
    {
      "id": "IND-101-04",
      "name": "Valley-Floor Secchi Disk Water Transparency (SD)",
      "scientificDefinition": "Mean euphotic Secchi disk disappearance depth across assessed urban and floodplain Kashmir Valley lakes.",
      "unit": "m",
      "measurementMethodology": "Standard 20 cm black-and-white Secchi disk lowered on shaded boat side.",
      "dataSource": "Mir & Pandit (2021); Dar et al. (2020, 2021); Wanganeo (1984); Ali et al. (2025)",
      "observationPeriod": "1980–2023",
      "spatialScale": "Assessed Valley-Floor Lakes (Dal, Wular, Nigeen, Anchar, Manasbal, Hokersar)",
      "scientificRelevance": "Integrates phytoplankton biomass, dissolved organic colour, and suspended tributary sediment governing submerged macrophyte light compensation.",
      "regulatoryThresholdLabel": "OECD Mesotrophic Minimum Transparency (>= 1.5 m)",
      "thresholdValue": 1.5,
      "baselineValue": 2.2,
      "observedValue": 0.91,
      "classification": "Elevated Stress",
      "trend": "Deteriorating",
      "uncertainty": "Ranges from 0.28–0.38 m in Brari Nambal/Anchar to 2.45 m in deep spring-fed Manasbal",
      "provenanceClass": "Literature-Derived",
      "dataAvailability": "Published Secondary Baseline",
      "validationStatus": "Secondary-Literature Verified"
    },
    {
      "id": "IND-101-05",
      "name": "High-Altitude Alpine Lake Specific Electrical Conductivity (EC)",
      "scientificDefinition": "Summer surface specific conductivity at 25 °C across benchmark Kashmir alpine glacial lakes (>3,400 m: Gangabal, Nundkol, Gadsar, Krishansar, Vishansar).",
      "unit": "µS/cm",
      "measurementMethodology": "Pre-calibrated digital multiparameter probe across replicate lake stations (Lone et al. 2021 vs Vass et al. 1989).",
      "dataSource": "Vass et al. (1989, Arch. Hydrobiol.); Lone et al. (2021, Front. Environ. Sci.)",
      "observationPeriod": "1977–2021",
      "spatialScale": "Harmukh–Gurez–Sind Alpine Lake Complex (3,505–3,819 m ASL)",
      "scientificRelevance": "Sensitive tracer of ultra-dilute snow/glacier meltwater solute regime, bedrock weathering, and absence of municipal electrolyte pollution.",
      "regulatoryThresholdLabel": "Alpine Oligotrophic Dilute Solute Envelope (< 80 µS/cm)",
      "thresholdValue": 80.0,
      "baselineValue": 24.0,
      "observedValue": 26.2,
      "classification": "Within Threshold",
      "trend": "Stable",
      "uncertainty": "Ranges 16–40 µS/cm across the five Harmukh–Kishanganga alpine lakes",
      "provenanceClass": "Literature-Derived",
      "dataAvailability": "Published Secondary Baseline",
      "validationStatus": "Secondary-Literature Verified"
    },
    {
      "id": "IND-101-06",
      "name": "Kashmir Himalayan Glacial Lake Surface Area Expansion (1992–2024)",
      "scientificDefinition": "Aggregate mapped open-water surface area across all 155 georeferenced Kashmir Himalayan glacial lakes between 1992 and 2024.",
      "unit": "ha",
      "measurementMethodology": "UTM Zone 43N polygon planimetry from Landsat TM (1992) and Sentinel-2 / Landsat-9 OLI (2024).",
      "dataSource": "Rashid & Kashani (2025, Zenodo DOI: 10.5281/zenodo.15051825)",
      "observationPeriod": "1992–2024",
      "spatialScale": "155 Glacial Lakes across 14 Kashmir Himalayan Watersheds",
      "scientificRelevance": "Captures cryospheric recession and proglacial meltwater ponding—strictly distinguished from ecological improvement or trophic state.",
      "regulatoryThresholdLabel": "1992 Cryospheric Reference Extent",
      "thresholdValue": 1150.0,
      "baselineValue": 1068.4,
      "observedValue": 1246.8,
      "classification": "Elevated Stress",
      "trend": "Seasonal Surge",
      "uncertainty": "+/- 0.5 pixel shoreline uncertainty on 15–30 m imagery",
      "provenanceClass": "Satellite-Derived",
      "dataAvailability": "Satellite Archive Derived",
      "validationStatus": "Cross-Sensor Verified"
    }
  ],
  "telemetrySeries": {
    "indicatorLabel": "Carlson Trophic State Index — TSI(SD) & TSI(TP) Altitudinal Gradient Comparison",
    "unit": "Carlson TSI Units (0–100 Scale)",
    "provenanceClass": "Literature-Derived",
    "sourceNote": "Computed from dated published peer-reviewed measurements (Vass et al. 1989; Mir & Pandit 2021; Dar et al. 2020, 2021; Ali et al. 2025) — not a live automated buoy feed.",
    "stations": [
      "Tarsar Alpine (3,800 m)",
      "Gangabal Alpine (3,612 m)",
      "Nilnag Montane (2,180 m)",
      "Manasbal Rural Deep (1,583 m)",
      "Wular Floodplain (1,580 m)",
      "Dal Urban Basin (1,584 m)",
      "Anchar Peri-Urban (1,584 m)"
    ],
    "points": [
      {
        "period": "Tarsar (3800m)",
        "season": "Summer",
        "station": "Tarsar Alpine (3,800 m)",
        "primaryValue": 29.16,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0
      },
      {
        "period": "Gangabal (3612m)",
        "season": "Summer",
        "station": "Gangabal Alpine (3,612 m)",
        "primaryValue": 35.42,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0,
        "secondaryValue": 66.97
      },
      {
        "period": "Nilnag (2180m)",
        "season": "Summer",
        "station": "Nilnag Montane (2,180 m)",
        "primaryValue": 49.31,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0,
        "secondaryValue": 53.67
      },
      {
        "period": "Manasbal (1583m)",
        "season": "Summer",
        "station": "Manasbal Rural Deep (1,583 m)",
        "primaryValue": 47.09,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0,
        "secondaryValue": 62.7
      },
      {
        "period": "Wular (1580m)",
        "season": "Summer",
        "station": "Wular Floodplain (1,580 m)",
        "primaryValue": 58.89,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0,
        "secondaryValue": 78.64
      },
      {
        "period": "Dal (1584m)",
        "season": "Summer",
        "station": "Dal Urban Basin (1,584 m)",
        "primaryValue": 62.34,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0,
        "secondaryValue": 75.52
      },
      {
        "period": "Anchar (1584m)",
        "season": "Summer",
        "station": "Anchar Peri-Urban (1,584 m)",
        "primaryValue": 73.94,
        "baselineReference": 40.0,
        "thresholdLimit": 50.0,
        "secondaryValue": 90.9
      }
    ]
  },
  "visualizationSpec": {
    "domainType": "Limnology & Wetland Hydrology",
    "primaryFigureDescription": "Altitudinal Carlson TSI(SD) vs TSI(TP) divergence profile across Kashmir's urban, floodplain, montane, and alpine lake belts paired with 10-district verified lake distribution.",
    "spatialLayerDescription": "Interactive Regional Lake Trophic Status Atlas rendering 155 WGS84 glacial polygons and 366 point/district-referenced Kashmir lakes color-coded by empirical trophic evidence (with neutral grey for Insufficient Evidence)."
  },
  "chapters": [
    {
      "number": "01",
      "title": "Executive Scientific Summary",
      "paragraphs": [
        "This flagship regional monograph investigates every identifiable historical and contemporary lacustrine waterbody across all ten administrative districts of Kashmir Division—Anantnag, Bandipora, Baramulla, Budgam, Ganderbal, Kulgam, Kupwara, Pulwama, Shopian, and Srinagar—to answer a foundational limnological question: to what extent are Kashmir's lakes transitioning from oligotrophy to eutrophication, and how do trophic states, areal trajectories, and ecological tipping points differ across urban, rural floodplain, montane forest, subalpine, alpine, and proglacial systems [1][3][9]?",
        "Prior to this synthesis, institutional and public portals reported seemingly contradictory totals: 1,230+ statewide waterbodies on regional banners [1], 62 mapped lakes in the legacy KEW directory, 330 historical Kashmir lakes in Comptroller and Auditor General (CAG) Report No. 4 of 2025 [2], 155 glacial lakes in the University of Kashmir geospatial inventory [3], and 9,765 waterbodies in the Ministry of Jal Shakti First Census [4]. By acquiring and parsing the original source records rather than adding aggregate totals, this investigation establishes 521 deduplicated Kashmir Division lake identities (490 currently observed and 31 historically disappeared or converted in retrieved tabular records, while queuing 317 unretrieved CAG appendix rows transparently) alongside 32 separately scoped Western Himalayan reference lakes in Jammu, Ladakh, Azad Jammu and Kashmir, and Gilgit-Baltistan [1][2][3][4].",
        "Strict evaluation against dated peer-reviewed water-chemistry measurements demonstrates that cultural eutrophication is neither universal across Kashmir nor absent above the valley floor, but sharply stratified by anthropogenic catchment pressure, basin residence time, and internal sediment feedback. Exactly 22 Kashmir Division lakes currently possess sufficient dated scientific evidence to support trophic classification—comprising 10 Oligotrophic alpine glacial lakes, 1 Mesotrophic montane forest lake (Nilnag), 6 Eutrophic urban/floodplain lakes (including Dal, Wular, Manasbal, Hokersar, Ahansar, and Waskursar), and 5 Hypereutrophic urban/peri-urban basins (Nigeen, Anchar, Khushalsar, Gilsar, and Brari Nambal)—while 499 identifiable lakes lack dated nutrient or transparency measurements and are classified honestly as Insufficient Evidence rather than 'pristine oligotrophic' [5][6][7][8][9][10]."
      ],
      "table": {
        "tableNumber": "Table 1.1",
        "title": "Reconciled Institutional Lake Inventories and Master Registry Coverage Across Kashmir Division",
        "headers": [
          "Inventory Source",
          "Reported Scope",
          "Raw Total",
          "Kashmir Lakes Parsed",
          "Role in Master Registry"
        ],
        "rows": [
          [
            "DEERS Directory (Nasim & Keng, May 2012) [1]",
            "J&K + Ladakh (LISS-III 2009–10)",
            "1,230 (+45 conv.)",
            "415 active + 45 conv.",
            "100% extracted; open-water vs marshy sub-parts preserved"
          ],
          [
            "CAG Report No. 4 of 2025 [2]",
            "J&K Historical Audit (1967–2022)",
            "697 (330 Kashmir)",
            "13 named (+317 queued)",
            "56 disappeared & 144 shrunk benchmark; 6 detailed audits"
          ],
          [
            "UoK Zenodo Glacial GIS (Rashid & Kashani 2025) [3]",
            "Kashmir Himalaya (1992–2024)",
            "155 polygons",
            "155 (77 matched, 78 new)",
            "Exact WGS84 polygons, 32-yr expansion & GLOF hazard"
          ],
          [
            "Jal Shakti 1st Census of Water Bodies [4]",
            "J&K UT All Water Bodies (2017–18)",
            "9,765",
            "37 Lakes (9,728 non-lake)",
            "Separated 5,256 ponds, 441 reservoirs & 179 tanks"
          ],
          [
            "KEW Deduplicated Master Registry (2026)",
            "Kashmir Division (10 Districts)",
            "553 platform",
            "521 unique Kashmir",
            "22 trophic-verified; 499 Insufficient Evidence"
          ]
        ],
        "sourceNote": "Compiled from SHA-256 verified primary PDFs, shapefiles, and published limnological datasets [1][2][3][4]."
      }
    },
    {
      "number": "02",
      "title": "Geological Origin and Evolution of Kashmir's Lake Systems",
      "paragraphs": [
        "Kashmir's lacustrine diversity is rooted in the Plio-Pleistocene tectonic and glacial evolution of the intermontane Kashmir Basin. Uplift of the Pir Panjal Range along thrust faults impounded the ancestral drainage of the Palaeo-Jhelum, creating the vast Karewa Lake (Satisar) that occupied the valley floor for millions of years and deposited >1,300 m of fluvio-lacustrine clays, silts, sands, and lignites (Hirpur and Nagum Formations) before tectonic breaching at the Baramulla-Uri gorge drained the basin during the Late Pleistocene [5][12].",
        "Contemporary lakes across the ten districts represent four distinct geomorphic lineages shaped after the draining of Palaeo-Satisar: (1) Valley-floor tectonic-fluvial remnant and oxbow depressions along the low-gradient Jhelum meander belt (1,560–1,606 m ASL), including Wular, Dal, Nigeen, Anchar, Manasbal, Hokersar, Ahansar, and Waskursar, characterized by fine alluvial-organic substrates, shallow mean depths (0.6–4.5 m, reaching 13 m in fault-controlled spring-fed Manasbal), and extensive emergent reed-marsh fringes [1][11][12]; (2) Montane fault-sag and landslide-dammed forest basins within the Karewa-Pir Panjal transition (1,800–2,600 m), exemplified by Nilnag (2,120–2,180 m) in Budgam [1]; (3) Pleistocene cirque, paternoster, and moraine-impounded alpine lakes (3,200–4,200 m) carved into Panjal Traps, Triassic limestones, and Palaeozoic granitoids across the Greater Himalaya and Pir Panjal—such as Gangabal (Z_max = 84 m), Gadsar (Z_max = 72 m), Nundkol (Z_max = 23 m), Vishansar (Z_max = 17 m), Krishansar, Tarsar, Marsar, Sheshnag, and Kausarnag [5][6]; and (4) Late-Holocene and post-1990 ice-contact proglacial and supraglacial lakes forming behind unconsolidated terminal moraines of retreating glaciers [3].",
        "Geological substrate directly modulates baseline hydrochemistry and susceptibility to nutrient enrichment. Alpine basins incised into resistant Panjal volcanics and crystalline granitoids (e.g., Harmukh-Gangabal) exhibit ultra-low specific conductivity (16–40 µS/cm) and low alkalinity (36–70 mg/L), whereas valley lakes underlain by calcareous Karewa loess-paleosols and Triassic limestone karst springs (e.g., Manasbal, Dal, Wular) are well-buffered, alkaline hard-water systems (pH 7.4–9.6, alkalinity 85–201 mg/L, Ca 21–55 mg/L) in which calcium-carbonate co-precipitation (marl formation) historically buffered soluble reactive phosphorus until overwhelmed by anthropogenic organic loading [6][7][11]."
      ]
    },
    {
      "number": "03",
      "title": "Complete Regional Lake Inventory and Institutional Record Reconciliation",
      "paragraphs": [
        "Resolving the long-standing discrepancy among institutional lake figures requires examining mapping sensors, minimum detectable areas, and administrative definitions. In May 2012, Dr. Hanifa Nasim and Dr. Tasneem Keng (Department of Environment and Remote Sensing, DEERS) published the Directory of Lakes and Waterbodies of J&K State using 2009–2010 IRS-P6 LISS-III (23.5 m) imagery, enumerating 1,230 waterbodies statewide: 415 in Kashmir Division, 150 in Jammu Division, and 665 in Ladakh, alongside a 45-record table of waterbodies present on 1967 Survey of India (SOI) 1:50,000 toposheets that had converted to agriculture, plantation, marsh, playground, or habitation by 2009 [1]. Crucially, page-by-page extraction of all 415 Kashmir rows reveals that DEERS recorded major valley lakes as compound multi-part entries—for example, Wular (#97 Baramulla) comprises 2,472.3 ha of open lake plus 9,191.2 ha of marshy expanse (11,663.5 ha total), while Dal (#58 Srinagar) comprises five open-water polygons totaling 1,129.4 ha plus 187.9 ha of marshy pockets (1,317.3 ha total) [1].",
        "By contrast, CAG Report No. 4 of 2025 (Performance Audit on Conservation and Management of Lakes in Jammu and Kashmir for the period ended March 2022) audited 697 natural historical lakes across J&K UT (excluding Ladakh), comprising 330 in Kashmir Division and 367 in Jammu Division [2]. Comparing 1967 baselines against 2014 departmental remote-sensing inventories, CAG documented that 56 Kashmir lakes had disappeared, 144 had decreased in area, 104 had increased, and 26 remained unchanged [2]. Meanwhile, the Ministry of Jal Shakti First Census of Water Bodies (2017–18 reference) enumerated 9,765 waterbodies across J&K, of which 98.39% (9,602) are smaller than 0.5 ha and only 37 (0.38%) are classified as Lakes—the remaining 9,728 being rural ponds (5,256), reservoirs (441), tanks (179), check dams (29), and other micro-impoundments [4].",
        "To integrate high-altitude cryospheric basins with exact geometry, all 155 glacial lake shapefiles from Rashid and Kashani (2025; University of Kashmir, Zenodo DOI: 10.5281/zenodo.15051825) were inverse-projected from WGS 1984 UTM Zone 43N to EPSG:4326 [3]. Deterministic reconciliation matched 35 DEERS records to existing KEW profiles, 17 DEERS 1967→2009 Present-Status rows to extant marshy/shrunk lakes (adding 28 disappeared waterbodies), and 77 Zenodo glacial polygons to named alpine lakes in DEERS/KEW (adding 78 additional georeferenced glacial tarns), plus 6 named dried-up Kashmir lakes from CAG Footnote 1—yielding 521 unique Kashmir Division lake identities across all ten districts and completely resolving the legacy 'Kupwara: 0 lakes' defect with 66 verified DEERS waterbodies in Kupwara [1][2][3]."
      ],
      "table": {
        "tableNumber": "Table 3.1",
        "title": "Verified Ten-District Master Lake Inventory Across Kashmir Division",
        "headers": [
          "District",
          "Unique Lakes",
          "Observed",
          "Disappeared/Conv.",
          "Named / Unnamed",
          "Glacial GIS Polygons",
          "Trophic Evidence Status"
        ],
        "rows": [
          [
            "Anantnag",
            "104",
            "95",
            "9",
            "88 / 16",
            "31",
            "2 assessed (102 unassessed)"
          ],
          [
            "Bandipora",
            "29",
            "29",
            "0",
            "24 / 5",
            "14",
            "1 assessed (28 unassessed)"
          ],
          [
            "Baramulla",
            "105",
            "99",
            "6",
            "78 / 27",
            "5",
            "1 assessed (104 unassessed)"
          ],
          [
            "Budgam",
            "45",
            "42",
            "3",
            "36 / 9",
            "14",
            "1 assessed (44 unassessed)"
          ],
          [
            "Ganderbal",
            "49",
            "48",
            "1",
            "38 / 11",
            "28",
            "8 assessed (41 unassessed)"
          ],
          [
            "Kulgam",
            "25",
            "25",
            "0",
            "17 / 8",
            "15",
            "1 assessed (24 unassessed)"
          ],
          [
            "Kupwara",
            "66",
            "66",
            "0",
            "59 / 7",
            "0",
            "0 assessed (66 unassessed)"
          ],
          [
            "Pulwama",
            "26",
            "18",
            "8",
            "24 / 2",
            "2",
            "0 assessed (26 unassessed)"
          ],
          [
            "Shopian",
            "17",
            "17",
            "0",
            "12 / 5",
            "13",
            "0 assessed (17 unassessed)"
          ],
          [
            "Srinagar",
            "55",
            "51",
            "4",
            "42 / 13",
            "2",
            "8 assessed (47 unassessed)"
          ]
        ],
        "sourceNote": "Derived dynamically from MASTER_LAKE_REGISTRY (src/data/hydrology/master-lake-registry.ts). Pre-2007 DEERS parent-district entries without published coordinates retain parent-district attribution."
      }
    },
    {
      "number": "04",
      "title": "Scientific Foundations of Lake Eutrophication",
      "paragraphs": [
        "Lake eutrophication is an ecosystem-scale biogeochemical response to excessive macronutrient supply—principally phosphorus (P) and nitrogen (N)—that accelerates primary organic matter production beyond the mineralization and flushing capacity of a basin [7][8]. Natural ('ontogenetic') lake ageing occurs over millennia as post-glacial basins gradually shoal and accumulate watershed weathering solutes; 'cultural eutrophication' compresses this trajectory into decades via concentrated domestic sewage, agricultural fertilizers, livestock waste, and urban stormwater [8][9][10].",
        "In temperate and Himalayan dimictic or warm-monomictic lakes (such as Manasbal and Nigeen), summer thermal stratification isolates the cooler hypolimnion from atmospheric re-aeration. As senescent phytoplankton and macrophyte detritus settle below the thermocline, heterotrophic bacterial respiration consumes dissolved oxygen (clinograde O2 profile) [11]. Once sediment-water interface redox potential drops below ~200 mV (DO < 1–2 mg/L), ferric oxyhydroxides [Fe(OH)3] reduce to soluble ferrous iron (Fe2+), liberating sorbed orthophosphate (PO43-) from bottom sediments into the overlying water column [8]. In shallow polymictic basins (such as Dal's Gagribal/Lokut basins, Anchar, and Wular), wind resuspension, boat wakes, high summer pH (>8.5–9.6 from intense photosynthesis), and microbial sulfate reduction similarly mobilize internal sediment phosphorus even without persistent thermal stratification [8][11].",
        "Crucially, trophic status (autotrophic biological productivity and nutrient enrichment) must not be conflated with general water-quality indices (WQI), potable drinking-water safety (fecal coliforms, trace metals), or cryospheric outburst hazard (GLOF susceptibility) [3][6]. An ultra-oligotrophic proglacial tarn may exhibit poor Secchi clarity (0.5–1.2 m) due to suspended glacial rock flour while remaining nutrient-poor and biologically oligotrophic [5][11]; conversely, a macrophyte-choked urban basin may exhibit moderate pelagic chlorophyll-a and deceptively clear interstitial water because dense Ceratophyllum and Myriophyllum beds luxury-uptake dissolved nutrients and allelopathically suppress phytoplankton [8][11]."
      ]
    },
    {
      "number": "05",
      "title": "Historical Limnological Research and Environmental Baselines",
      "paragraphs": [
        "Scientific limnology in Kashmir spans more than a century of morphometric and hydrobiological inquiry, anchored systematically in the 1970s and 1980s by D. P. Zutshi, V. Kaul, K. K. Vass, M. A. Khan, A. K. Pandit, H. S. Raina, and A. Wanganeo [5][7][11]. Early surveys of valley lakes documented progressive contraction of Dal Lake's open-water expanse from 1,507 ha in 1911 to 700 ha of open water (plus 1,530 ha of marshy/floating-garden zones) by 1984, accompanied by 40,000–52,000 tonnes/yr of senescent aquatic plant and agricultural organic deposition [11]. Over the same 20th-century window, Wular Lake contracted from historical flood-plain maxima cited near 27,500 ha (including seasonal Sonawari inundation) to ~15,200 ha by the 1980s and 11,663.5 ha (2,472.3 ha open water) in the 2009 DEERS LISS-III inventory as embankments, paddy conversion, and social-forestry willow plantations reclaimed littoral margins [1][11][12].",
        "For high-altitude ecosystems, the foundational multi-year summer expeditions of Zutshi et al. (1972) and Vass, Wanganeo, Raina, Zutshi, and Wanganeo (1989; 1977–1984 field campaigns across 12 Kashmir mountain lakes between 3,200 m and 3,819 m) established an irreplaceable historical baseline [5][11]. Those 1977–1984 measurements recorded 6–9 months of winter ice cover, summer epilimnetic temperatures <=13–15 °C, summer thermal stratification with 8–9 °C epilimnion-hypolimnion gradients, circumneutral pH (6.7–7.4), dilute conductivity (15–130 µS/cm), high dissolved oxygen, diatom-dominated phytoplankton, copepod-dominated zooplankton, and Secchi transparencies ranging from 0.5 m in silt-laden glacial-contact tarns to 12.0 m in clear cirque basins [5][11].",
        "Reconstructing decadal change between 1967 and 2026 requires explicit acknowledgment of temporal gaps and methodological shifts: pre-1990 nutrient assays often reported orthophosphate or total hydrolysable phosphorus with higher detection limits than modern UV-Vis protocols, 1967 SOI maps omitted 15 sheets across parts of Srinagar and Anantnag [1], and continuous monthly multi-year monitoring exists only for Dal, Nigeen, Wular, Manasbal, Anchar, and Hokersar—leaving decadal interpolation across minor rural sars scientifically impermissible [2][6][9][10]."
      ]
    },
    {
      "number": "06",
      "title": "Research Questions, Evidence Acquisition and Scientific Methodology",
      "paragraphs": [
        "This assessment was executed under an acquire-first, reconcile-second, classify-third scientific protocol designed to eliminate both inventory double-counting and unsupported trophic extrapolation. Primary evidence acquisition targeted four statutory/geospatial pillars and eleven peer-reviewed limnological anchors: (1) full 131-page extraction of the DEERS (2012) Directory via authorized Ramsar RIS archive mirror [1]; (2) retrieval of official CAG Report No. 4 of 2025 audit documentation [2]; (3) binary shapefile and DBF ingestion of all 155 glacial lake dynamics and GLOF susceptibility records from Zenodo (10.5281/zenodo.15051825) [3]; and (4) extraction of the Jammu & Kashmir state annexure from the Ministry of Jal Shakti First Census of Water Bodies [4].",
        "Spatial and toponymic entity resolution applied a strict six-tier hierarchy: (i) exact coordinate/polygon proximity (<=1.8 km Haversine threshold within matching elevation bands for verified alpine centroids); (ii) normalized Kashmiri toponymic matching stripping variable suffixes (-sar, -nag, -lake, -talao) while preserving immutable original spellings; (iii) elevation-band compatibility gates (+/-550 m) preventing false merges between homonymous lowland and alpine waterbodies (e.g., lowland Gad Sar at 1,600 m in Baramulla vs alpine Gadsar at 3,584 m in Ganderbal); (iv) isolation of ambiguous recurring names ('Sar', 'Nambal', 'Lokut Sar', 'Sona Sar', 'Kon Nag') as distinct numbered records rather than forced merges; (v) strict separation of non-Kashmir-Division lakes into regional registers; and (vi) explicit retention of unretrieved CAG appendix rows (317) in a completeness queue.",
        "Every chemical and biological record was subjected to unit and provenance auditing prior to statistical or trophic calculation. During ingestion of Lone et al. (2021; Frontiers in Environmental Science, 10.3389/fenvs.2021.681965), automated range checks flagged Table 1's column header 'TP (mg L-1)' and 'OP (mg L-1)' reporting values of 38–168 and 26–72 in waters whose total dissolved solids (TDS) were only 10–37 mg/L; cross-verification against the article's Results text confirmed the true analytical unit was µg/L ('total phosphorus ranged from 32–168 µg L-1 and PO4 ranged from 21–72 µg L-1') [6]. All downstream calculations incorporate this verified unit correction."
      ]
    },
    {
      "number": "07",
      "title": "Integrated Scientific Disciplines",
      "paragraphs": [
        "Evaluating 521 lacustrine systems across a 3,100-metre vertical relief requires integrating 18 complementary scientific disciplines without forcing uniform protocols onto dissimilar ecosystems: regional and alpine limnology (stratification, heat budgets, euphotic optics), surface hydrology and karst/alluvial hydrogeology (Jhelum backwater hydraulics, spring-fed Manasbal and Verinag/Achabal inflows), analytical environmental chemistry (nutrient speciation, redox Fe-P cycling, alkalinity buffering), phycology and aquatic botany (diatom-to-cyanobacteria succession, submerged vs free-floating macrophyte competition), ichthyology and fisheries ecology (Schizothorax spawning requirements, Diptychus maculatus alpine endemism, exotic Cyprinus carpio benthivory), sedimentology and paleolimnology (Karewa stratigraphy, core sedimentation rates), cryosphere and GLOF geomorphology, quantitative remote sensing and GIS, environmental engineering (interceptor sewerage, SBR/MBBR cold-climate STP kinetics), and environmental law/public-audit governance [1][2][3][5][6][11].",
        "Each discipline governs specific analytical layers within the KEW Water Systems architecture: cryospheric geomorphology and GLOF multi-criteria weighting govern hazard appraisal for the 155 glacial polygons [3], whereas Carlson trophic transformations, phytoplankton assemblage ordination (NMDS/CCA), and Vollenweider mass balances govern water-quality and eutrophication modules [6][7][10]. Keeping hazard, hydrology, and trophic dimensions orthogonal prevents the common error of interpreting an expanding, high-hazard proglacial lake as ecologically healthy or eutrophying."
      ]
    },
    {
      "number": "08",
      "title": "Quantitative Trophic Assessment, Nutrient Mass Balance and Uncertainty",
      "paragraphs": [
        "Quantitative trophic state evaluation follows Carlson (1977) using natural-logarithm transformations of Secchi disk transparency (SD, m), surface Chlorophyll-a (Chl-a, µg/L), and Total Phosphorus (TP, µg/L), cross-referenced against OECD (1982) fixed-boundary criteria (Oligotrophic: TP < 10 µg/L, SD > 3.0 m; Mesotrophic: TP 10–35 µg/L, SD 1.5–3.0 m; Eutrophic: TP 35–100 µg/L, SD 0.7–1.5 m; Hypereutrophic: TP > 100 µg/L, SD < 0.7 m) [7]. Individual indices are computed strictly from positive empirical observations and are never blindly averaged into a single composite number when optical or biological confounding is present.",
        "Pairwise comparison of TSI residuals across Kashmir's 22 assessed lakes exposes three distinct mechanistic regimes: (1) In shallow macrophyte-dominated Dal and Manasbal basins, TSI(TP) exceeds TSI(Chl-a) by +6 to +13.5 units (e.g., Dal TSI(TP)=75.5 vs TSI(Chl-a)=62.0; Manasbal TSI(TP)=62.7 vs TSI(SD)=47.1) because dense submerged Ceratophyllum, Myriophyllum, and Hydrilla meadows sequester bioavailable nutrients and stabilize bottom sediments [8][9][11]; (2) In shallow, river-fed Wular Lake, Mir and Pandit (2021) demonstrated TSI(SD)=58.9 (Eutrophic; mean SD 1.08 m) alongside TSI(TP)=78.6 (Hypereutrophic; mean TP 175 µg/L), while Mushtaq et al. (2022) measured bloom-zone Chl-a of 25.81–207.96 µg/L (TSI(Chl-a)=62.5–82.9), reflecting non-algal Jhelum mineral silt attenuation alongside localized hypereutrophic embayments [7][10]; and (3) In Harmukh alpine lakes (Gangabal, Gadsar, Vishansar), TSI(SD) is 35.4–39.3 (Oligotrophic) with ultra-low EC (20–37 µS/cm) and diatom dominance, whereas late-meltwater TP pulses (78–163 µg/L) yield apparent TSI(TP) values of 67–78 driven by non-bioavailable glacial rock-flour apatite and brief pastoral snowmelt flushing [5][6].",
        "External versus internal phosphorus mass-balance dynamics follow Vollenweider's residence-time formulation: L_P = [P]_steady * z_mean * (1/tau_w + sigma_P), where z_mean is mean depth (m), tau_w is hydraulic residence time (yr), and sigma_P is net sedimentary retention/release (/yr) [8]. In Dal Lake, Zutshi (1989) and Solim and Wanganeo (2008) documented net positive annual retention (+4.36 t P/yr and +39.2 t N/yr historically, rising substantially with urban expansion) creating a large legacy benthic P pool that now acts as an internal seasonal source during warm, high-pH or hypoxic episodes [8][11]."
      ],
      "equation": {
        "expression": "TSI(SD) = 60 - 14.41 ln(SD_m) ;  TSI(Chl-a) = 9.81 ln(Chla_ugL) + 30.6 ;  TSI(TP) = 14.42 ln(TP_ugL) + 4.15 ;  [P]_eq = L_P / (z_mean * (rho_w + sigma_P))",
        "explanation": "Carlson (1977) Individual Trophic State Equations & Vollenweider Steady-State Phosphorus Balance, where SD_m is Secchi disk transparency depth (m > 0), Chla_ugL and TP_ugL are epilimnetic chlorophyll-a and total phosphorus (µg/L > 0), L_P is areal P load (mg/m^2/yr), z_mean is mean depth (m), rho_w = 1/tau_w is hydraulic flushing rate (/yr), and sigma_P is net sedimentary P loss/release coefficient (/yr)."
      },
      "table": {
        "tableNumber": "Table 8.1",
        "title": "Individual Carlson TSI Diagnostics Across Representative Assessed Kashmir Lakes",
        "headers": [
          "Lake (District, Elev.)",
          "SD (m) / TSI(SD)",
          "Chl-a (µg/L) / TSI(Chl)",
          "TP (µg/L) / TSI(TP)",
          "Verified Trophic Class & Diagnostic Regime"
        ],
        "rows": [
          [
            "Tarsar (Anantnag, 3,800 m) [5]",
            "8.50 m / 29.2",
            "Unavailable / —",
            "Unavailable / —",
            "Oligotrophic (Clear cirque; modern TP/Chl-a needed)"
          ],
          [
            "Gangabal (Ganderbal, 3,612 m) [5][6]",
            "5.50 m / 35.4",
            "Unavailable / —",
            "78 µg/L / 67.0*",
            "Oligotrophic (*Mineral rock-flour P pulse; EC 21 µS/cm)"
          ],
          [
            "Nundkol (Ganderbal, 3,505 m) [5][6]",
            "5.00 m / 36.8",
            "Unavailable / —",
            "52 µg/L / 61.1*",
            "Oligotrophic (DO 8.4 mg/L; diatom-dominated)"
          ],
          [
            "Nilnag (Budgam, 2,180 m) [1]",
            "2.10 m / 49.3",
            "Unavailable / —",
            "31 µg/L / 53.7",
            "Mesotrophic (Montane forest siltation stress)"
          ],
          [
            "Manasbal (Ganderbal, 1,583 m) [2][11]",
            "2.45 m / 47.1",
            "14.2 µg/L / 56.6",
            "58 µg/L / 62.7",
            "Eutrophic (Deep monomictic; hypolimnetic O2 deficit)"
          ],
          [
            "Wular (Bandipora, 1,580 m) [7][10]",
            "1.08 m / 58.9",
            "46.2 µg/L / 68.2",
            "175 µg/L / 78.6",
            "Eutrophic to Hypereutrophic (Silt + sewage/agro load)"
          ],
          [
            "Dal Lake (Srinagar, 1,584 m) [8][9]",
            "0.85 m / 62.3",
            "24.6 µg/L / 62.0",
            "142 µg/L / 75.5",
            "Eutrophic (Macrophyte P uptake + internal P release)"
          ],
          [
            "Nigeen (Srinagar, 1,584 m) [9][10]",
            "0.95 m / 60.7",
            "31.4 µg/L / 64.4",
            "340 µg/L / 88.2",
            "Hypereutrophic (30% urban growth; restricted flushing)"
          ],
          [
            "Anchar (Srinagar, 1,584 m) [1][2]",
            "0.38 m / 73.9",
            "58.0 µg/L / 70.4",
            "410 µg/L / 90.9",
            "Hypereutrophic (8.2 ha open water left of 1,490.6 ha)"
          ]
        ],
        "sourceNote": "Calculated via exact Carlson (1977) formulas from published means [5][6][7][8][9][10][11]. *Unfiltered alpine TP reflects non-algal mineral meltwater particulates."
      },
      "chart": {
        "figureNumber": "Figure 8.1",
        "title": "Altitudinal Gradient of Carlson Secchi Transparency Index [TSI(SD)] Across Assessed Kashmir Lakes",
        "unit": "TSI(SD) units (0–100)",
        "observationPeriod": "1977–2025 Published Limnological Series",
        "source": "Vass et al. (1989) [5]; Lone et al. (2021) [6]; Mir & Pandit (2021) [7]; Dar et al. (2020) & Ali et al. (2025) [9]",
        "interpretation": "Carlson TSI(SD) increases systematically from clear alpine cirque basins (<40 Oligotrophic) through montane/deep rural lakes (47–49 Mesotrophic) to shallow floodplain and urban basins (59–78 Eutrophic–Hypereutrophic); baseline = 40.0 oligotrophic/mesotrophic boundary, threshold = 50.0 eutrophic boundary.",
        "bars": [
          { "label": "Tarsar (3,800m Alpine)", "baseline": 40.0, "observed": 29.2, "threshold": 50.0 },
          { "label": "Gangabal (3,612m Alpine)", "baseline": 40.0, "observed": 35.4, "threshold": 50.0 },
          { "label": "Manasbal (1,583m Rural)", "baseline": 40.0, "observed": 47.1, "threshold": 50.0 },
          { "label": "Nilnag (2,180m Montane)", "baseline": 40.0, "observed": 49.3, "threshold": 50.0 },
          { "label": "Wular (1,580m Floodplain)", "baseline": 40.0, "observed": 58.9, "threshold": 50.0 },
          { "label": "Nigeen (1,584m Urban)", "baseline": 40.0, "observed": 60.7, "threshold": 50.0 },
          { "label": "Dal (1,584m Urban)", "baseline": 40.0, "observed": 62.3, "threshold": 50.0 },
          { "label": "Anchar (1,584m Peri-Urban)", "baseline": 40.0, "observed": 73.9, "threshold": 50.0 },
          { "label": "Brari Nambal (1,583m Lagoon)", "baseline": 40.0, "observed": 78.3, "threshold": 50.0 }
        ]
      }
    },
    {
      "number": "09",
      "title": "Urban and Peri-Urban Lake Eutrophication",
      "paragraphs": [
        "Srinagar's interconnected urban lacustrine chain—Dal (Hazratbal, Bod Dal, Lokut Dal, Gagribal), Nigeen, Pokhribal-Gilsar, Khushalsar, Anchar, and Brari Nambal—represents the most acute locus of cultural eutrophication in the Western Himalaya [2][8][9]. Multi-year monitoring across Dal's four basins from 2019 to 2023 (Ali et al. 2025; 10.3390/w17030314) demonstrates that Hazratbal transitioned from mesotrophic to eutrophic while Nishat/Bod Dal, Gagribal, and Nigeen progressed from meso-eutrophic into persistent eutrophic-hypereutrophic regimes [9]. Over a 40-year trajectory (Kumar et al. 2022; 10.1007/s10661-022-09869-x) and Landsat analysis (NASA 2023), Dal lost ~25% of its open-water area between 1980 and 2018 while supporting >50,000 intra-lake and shoreline residents across houseboats, islands, and floating gardens [9][12].",
        "Down-gradient basins along the Nallah Amir Khan outflow corridor exhibit even more severe degradation. In Nigeen Lake, Dar et al. (2020; 10.1007/s10661-020-8091-y) measured Secchi transparency of only 0.52–1.39 m and Total Phosphorus of 184–687 µg/L (TSI(TP) 79.4–98.4, Hypereutrophic), driven by a 30% expansion of built-up settlements between 2003 and 2016 and inadequate sewage interception [9]. Further downstream, Gilsar (3.0 ha open lake + 4.2 ha marshy in DEERS 2012), Khushalsar (92 ha largely marshy/encroached), Brari Nambal, and Anchar Lake (reduced in DEERS 2012 to 8.2 ha of open water amidst 1,482.4 ha of Rakh-i-Kujar plantation, habitation, and marsh) suffer near-complete hydraulic choking, benthic anoxia (DO 2.4–3.4 mg/L), and year-round organic sludge accumulation [1][2].",
        "CAG Report No. 4 of 2025 corroborated that malfunctioning Sewage Treatment Plants (STPs), unsewered shoreline mohallas, unaligned houseboats, improper disposal of harvested de-weeding sludge, and non-demarcation prevented restoration of Dal's open-water area despite substantial expenditure under NLCP and PMRP [2]."
      ]
    },
    {
      "number": "10",
      "title": "Rural Lakes, Floodplain Systems and Agricultural Nutrient Loading",
      "paragraphs": [
        "Across Bandipora, Baramulla, Ganderbal, Pulwama, Budgam, Anantnag, and Kupwara, rural floodplain lakes ('sars' and 'nambals') function as hydrodynamic expansion chambers of the River Jhelum and its tributaries. Wular Lake (Ramsar Site #461) receives the integrated drainage of virtually the entire Kashmir Valley before the Jhelum exits through Baramulla [7][10]. Seasonal seven-site sampling by Mir and Pandit (2021) recorded TP of 101–215 µg/L (mean 175 µg/L), Ortho-P of 15.33–32 µg/L, NO3-N of 214.66–457.22 µg/L, and Secchi depth of 0.18–2.23 m, while Landsat-8 OLI modeling by Mushtaq et al. (2022; 10.1029/2021EA001653) classified ~57% of Wular's surface as eutrophic, with ISRO LISS-IV imagery confirming a ~25% contraction in open-water area between 2008 and 2019 [7][10][12].",
        "Smaller rural valley lakes—Manasbal (177.2 ha in DEERS 2012), Ahansar (9.9 ha open + 14.8 ha marshy), Waskursar (21.0 ha open + 21.5 ha marshy), Hokersar (99.3 ha open + Satellite 3.3 ha; 2,528.10 kanals encroached per CAG 2025), Haigam Jhil (353.3 ha), Mirgund (29.7 ha), Shallabugh (1,508.2 ha), Narkur Nambal (307.3 ha), and the 66 rural/foothill sars of Kupwara (such as Kan Sar [10.4 ha], Chornar Sar [2.9 ha], Nag Reddi [2.6 ha], Narain Sar [2.5 ha], and Buta Sar [1.9 ha])—face intense non-point urea/DAP fertilizer runoff from paddy fields and high-density apple orchards, willow plantation infilling, and unmonitored village greywater [1][2]. Unlike Dal and Wular, the overwhelming majority of rural sars in Kupwara (66), Pulwama (20 DEERS), Baramulla, and Budgam have zero published seasonal nutrient or chlorophyll time series, representing a critical blind spot in regional water-quality surveillance [1][2]."
      ]
    },
    {
      "number": "11",
      "title": "Montane, Forest and Subalpine Lake Ecology",
      "paragraphs": [
        "Between the intensively cultivated valley floor (<1,750 m) and the timberline (~3,350 m) lies a vulnerable, sparsely studied cohort of montane forest and subalpine lakes—including Nilnag (2,120–2,180 m, 1.3 ha open water in DEERS 2012) and Nagabal Sar (2,400 m, 5.9 ha) in Budgam, Gosai Sar (2,720 m) and Athet Sar (3,120 m) in Baramulla, Mahi Nag (3,000 m) in Anantnag, Panyar Nag (2,100 m) and Thal Sar (2,180 m) in Pulwama, and Bran Khudu Sar (2,800 m, 2.2 ha) and Gang Sar (2,000 m, 0.9 ha) in Kupwara [1].",
        "Because these basins have small surface areas (typically 0.4–6.0 ha) and high catchment-to-lake area ratios on steep forested Karewa and Pir Panjal slopes, they are acutely sensitive to canopy opening, forest-road cut-slope erosion, and grazing-induced sediment delivery. Nilnag illustrates this transitional vulnerability: surrounded by Pinus wallichiana and Abies pindrow forest near Yusmarg, historical investigations documented early mesotrophic shift driven by rapid terrigenous siltation, humic/leaf-litter organic inputs, and littoral macrophyte expansion—placing montane forest lakes at higher immediate risk of terrestrialization and mesotrophic-eutrophic transition than higher bedrock cirque tarns [1][11]."
      ]
    },
    {
      "number": "12",
      "title": "Alpine and Glacial Lake Limnology",
      "paragraphs": [
        "Alpine and proglacial lakes (>=3,400 m ASL) constitute the largest numerical guild in Kashmir Division—accounting for 310 of the 521 master lake identities, including 155 georeferenced glacial polygons across 14 watersheds (Sind: 37, Lidder: 30, Vishav: 17, Rembiara: 16, Sukhnag: 13, Madhumati: 11, Doodhganga: 7, Arin: 7, Bringi: 4, Kuthar: 3, Romshi: 3, Ningal: 3, Dal: 2, Ferozpur: 2) [3]. Morphometric and limnochemical synthesis of Vass et al. (1989) and Lone et al. (2021) across Gangabal (162.4–163.1 ha, Z_max 84 m), Gadsar (39.8 ha, Z_max 72 m), Vishansar (47.2 ha, Z_max 17 m), Nundkol (37.4 ha, Z_max 23 m), and Krishansar (31.9 ha, Z_max 8 m) confirms cold summer water temperatures (9.0–13.8 °C), circumneutral-to-weakly-alkaline pH (7.31–8.0), high dissolved oxygen (7.8–8.4 mg/L), ultra-low TDS (10–25 mg/L), and low EC (16–40 µS/cm) [3][5][6].",
        "Crucially, this monograph rejects both extreme generalizations regarding Kashmir's alpine lakes: (1) We reject labeling all 310 alpine lakes 'Pristine Oligotrophic', because only 10 alpine lakes possess published limnological observations while 300 lack chemical measurements; and (2) Even within the studied Harmukh-Gurez cascade, Lone et al. (2021) documented significant inter-lake nutrient variance driven by alpine pasture cover (50.8% of the 16,179.5 ha study catchment) and meltwater pulses (NO3-N 110–208 µg/L, NH3-N 40–108 µg/L, TP 48–168 µg/L), while Vass et al. (1989) already noted localized summer cyanophycean populations in Krishansar and Kausarnag [5][6]. Thus, while Kashmir's studied alpine lakes remain biologically oligotrophic (dominated by 45 Bacillariophyceae diatom taxa), shallow alpine basins exposed to intensive livestock corrals, trekking campsites, or pilgrimage trails warrant targeted early-warning Chl-a and soluble reactive phosphorus (SRP) monitoring [5][6]."
      ]
    },
    {
      "number": "13",
      "title": "Comparative Nutrient Loading, Water Chemistry and Sediment Dynamics",
      "paragraphs": [
        "Comparing hydrochemistry across the 2,900-metre gradient from Srinagar/Bandipora (1,580 m) to Krishansar/Kausarnag (3,819–3,960 m) reveals a ten- to twenty-fold solute and nutrient amplification in valley-floor basins. Specific conductivity rises from 16–40 µS/cm in Harmukh alpine lakes to 230–296 µS/cm in Wular, 245–340 µS/cm in Dal-Nigeen, and 465–560 µS/cm in Anchar, Gilsar, Khushalsar, and Brari Nambal [6][7][9]. Dissolved oxygen remains near saturation (7.8–8.4 mg/L) in alpine epilimnia but exhibits acute summer hypolimnetic/benthic depletion in Manasbal, Nigeen, Dal, and urban lagoons (2.4–5.2 mg/L) [6][9][11].",
        "Sediment dynamics diverge equally sharply. In alpine proglacial basins, sediment influx consists primarily of unweathered mineral glacial flour (silicates and detrital apatite) with low organic carbon, limiting benthic oxygen demand despite high seasonal turbidity [5][6]. In valley-floor floodplain and urban lakes, tributary erosion from deforested/cultivated catchments combines with massive autochthonous macrophyte detritus (8 t C/ha/yr fixed by macrophytes in Dal at an 8:1 macrophyte-to-phytoplankton carbon fixation ratio; Raina & Petr 1999) and raw sewage biosolids to form organic-rich, reducing sapropelic muds [8][11]. Mechanical de-weeding that cuts shoots without removing root-rhizome nutrient stocks or intercepting external sewage merely recycles particulate P and accelerates turbid phytoplankton switches [2][8]."
      ]
    },
    {
      "number": "14",
      "title": "Phytoplankton, Cyanobacteria, Macrophytes and Aquatic Biodiversity",
      "paragraphs": [
        "Biological community structure provides an independent, time-integrated validator of chemical trophic indices. In high-altitude lakes (Gangabal, Nundkol, Gadsar, Krishansar, Vishansar), Lone et al. (2021) identified 61 periphytic/planktonic algal taxa dominated overwhelmingly by cold-stenothermal diatoms—Bacillariophyceae (45 taxa), Chlorophyceae (14), Cyanophyceae (1), and Xanthophyceae (1)—with high Shannon diversity (H' = 3.10–3.31) and Simpson evenness (0.93–0.95) diagnostic of oligotrophic waters [6]. By contrast, in floodplain Wular Lake, Mir and Pandit (2021) found that while Bacillariophyceae still contributed 49.6% of cell counts, Chlorophyceae (26.0%), Cyanophyceae (13.8%), and organic-pollution-tolerant Euglenophyceae (9.1%) accounted for >49% of assemblage composition (densities reaching 11,466 ind./L), with Canonical Correspondence Analysis (CCA; 87% variance on axes 1–2, p < 0.001) linking cyanobacterial and euglenoid biomass directly to elevated temperature, TP, Ortho-P, and chloride [7].",
        "In urban hypereutrophic basins (Dal's Gagribal/Brari Nambal, Nigeen, Anchar, Khushalsar), summer community composition shifts toward bloom-forming cyanobacteria (Microcystis aeruginosa, Oscillatoria, Anabaena) and dense free-floating fern/pleustophyte carpets (Azolla cristata, Salvinia natans, Lemna minor) that shade out native submerged charophytes and Potamogeton [8][9][11]. Concurrently, ichthyofaunal guilds have shifted from endemic cold-water schizothoracines (Schizothorax niger, which spawns on clean lake-margin willow roots and cold spring pockets, and S. esocinus) toward exotic eurythermal common carp (Cyprinus carpio, introduced in 1959), which accounted for >75% of commercial valley lake catches while disturbing benthic sediments; meanwhile, alpine Gadsar and Zumsar harbor evolutionarily distinct, slow-growing populations of endemic Diptychus maculatus (reaching 225 mm / 125 g at age 7; fecundity <=380 eggs) alongside stocked brown trout (Salmo trutta fario) in Gangabal, Nundkol, Krishansar, and Vishansar [5][11]."
      ]
    },
    {
      "number": "15",
      "title": "Satellite-Based Historical Change Detection and Disappeared Lakes",
      "paragraphs": [
        "Multi-epoch remote-sensing synthesis exposes two opposite hydrological trajectories operating simultaneously across Kashmir Division. Across the low-elevation valley floor and Karewa margins (1,560–2,200 m), lakes have experienced severe areal contraction, fragmentation, marsh terrestrialization, and outright disappearance. DEERS (2012) documented net 1967→2009 waterbody losses in Baramulla (163 to 124), Pulwama (61 to 20), and Kupwara (111 to 66), cataloging 45 named valley waterbodies converted to agriculture, willow plantation, playground, or habitation—including Rampur Talao and Kiel Khanun Talao (converted to playgrounds in Anantnag), Rakhi Malanpur, Chowkidar Sar, and Begam Bagh Nambal (converted to agriculture in Pulwama), Rakhi Arth (Budgam), and marsh/habitation encroachment across Khushal Sar, Gilsar, Anchar, Waskur, and Wular [1].",
        "Independently, CAG Report No. 4 of 2025 reported that across 330 historical Kashmir Division lakes compared between 1967 and 2014, 56 (17.0%) disappeared and 144 (43.6%) decreased in area, and audit plotting of 63 EE&RSD test-checked lakes on multi-temporal Google Earth imagery confirmed seven lakes—including Rakh-i-Arth, Sether Gund Numbal, Marhama, Devpursar, Mahtan, and Chandargar Numbal in Kashmir—were no longer visible or had almost dried up [2]. Conversely, across the alpine cryosphere (>3,400 m), Rashid and Kashani's (2025) 1992–2024 shapefile series across 155 Kashmir glacial lakes documents widespread proglacial lake expansion and new moraine-pond formation driven by glacier terminus retreat (accounting for many of the 104 area-increasing lakes in regional comparisons and the 'New Glacial Lake' entries on p. 58 of DEERS 2012) [1][2][3][13][14]."
      ],
      "table": {
        "tableNumber": "Table 15.1",
        "title": "Multi-Epoch Historical Area & Persistence Trajectories Across Key Kashmir Lake Systems",
        "headers": [
          "Lake / Cohort",
          "Historical Baseline",
          "2009–2010 DEERS LISS-III",
          "2014–2024 Recent Epoch",
          "Documented Trajectory & Mechanism"
        ],
        "rows": [
          [
            "Dal Lake (Srinagar) [1][9][11][12]",
            "1,507 ha open water (1911)",
            "1,129.4 ha open + 187.9 ha marshy",
            "-25% open water (1980–2018)",
            "Floating garden/urban encroachment & macrophyte infill"
          ],
          [
            "Wular Lake (Bandipora) [1][10][11][12]",
            "15,200–27,500 ha seasonal",
            "2,472.3 ha open + 9,191.2 ha marsh",
            "-25% open water (2008–2019)",
            "Jhelum siltation, embankments, willow & paddy conversion"
          ],
          [
            "Anchar + Rakh-i-Kujar [1][2]",
            "Large open floodplain lake (1967)",
            "8.2 ha open + 1,482.4 ha marsh/conv.",
            "Severely shrunk (CAG 2025)",
            "Sind silt delta, plantation, habitation & raw sewage"
          ],
          [
            "330 Historical Kashmir Lakes [2]",
            "1967 SOI Baseline (330 lakes)",
            "415 waterbodies (incl. new alpine)",
            "56 vanished, 144 shrunk, 104 grew",
            "Bimodal: valley reclamation loss vs alpine glacial growth"
          ],
          [
            "155 Kashmir Glacial Lakes [3]",
            "1992 Landsat TMpolygons",
            "Partially captured in DEERS",
            "2024 Sentinel-2/Landsat-9 expansion",
            "Retreating ice tongues enlarging proglacial moraine lakes"
          ]
        ],
        "sourceNote": "Boundary definitions (open water vs total lake-marsh ecosystem) are explicitly separated per Section 18/38 [1][2][3][11][12]."
      }
    },
    {
      "number": "16",
      "title": "Climate Change, Snowmelt and Altitudinal Ecological Vulnerability",
      "paragraphs": [
        "Elevation-dependent warming across the Western Himalaya alters lake physics, hydrology, and biogeochemistry from valley floor to glacial cirque. In valley lakes (1,580 m), warmer spring-autumn surface water temperatures (reaching 28 °C in Wular and >29 °C in shallow Dal/Anchar littoral zones) steepen thermal density gradients in Manasbal and Nigeen, accelerate sediment microbial mineralization rates, reduce oxygen solubility, and favor buoyant cyanobacteria (whose growth optima exceed 25 °C) over diatoms [7][9].",
        "In alpine and glacial lakes (>3,400 m), rising freezing-level heights, black-carbon snow darkening, and shift from winter snowfall toward rain-on-snow events shorten the historical 6–9 month ice-cover duration documented by Vass et al. (1989) [5]. Earlier ice-out lengthens the summer growing season, increases thermal stability in deep basins like Gangabal and Gadsar, and exposes proglacial lakes to higher-magnitude meltwater and GLOF impulse hazards—where 155 mapped Kashmir glacial lakes include Very High and High GLOF susceptibility basins such as Gangabal, Sheshnag, Kausarnag, and Lidder/Sind proglacial lakes [3]. Whether longer ice-free seasons combined with atmospheric reactive nitrogen deposition and alpine grazing are already shifting Kashmir's alpine lakes from ultra-oligotrophy toward mesotrophy remains a critical testable hypothesis requiring standardized multi-year paleolimnological sediment-core diatom reconstructions and sub-microgram SRP monitoring [5][6]."
      ]
    },
    {
      "number": "17",
      "title": "Tourism, Pilgrimage, Sewage, Agriculture and Cumulative Environmental Impacts",
      "paragraphs": [
        "Kashmir's lakes experience cumulative, cross-sectoral stressor convergence rather than isolated single-source pollution. In Srinagar, commercial tourism (houseboats,shikara congestion, foreshore hotels) compounds municipal sewage deficits across >1.5 million residents because STP hydraulic capacity, interceptor sewer connectivity, and storm-overflow segregation lag urban growth [2][8][9]. Across the Jhelum floodplain, intensive paddy cultivation, rapid conversion of rainfed Karewas to high-density apple orchards (with heavy foliar fungicide and soil N-P fertilization), riparian sand/gravel extraction, and municipal solid-waste dumping along tributary nallahs converge into Wular, Hokersar, Haigam, Anchar, and Shallabugh [2][7][10].",
        "At high elevations, unregulated wilderness trekking and lakeside tented camps along the Kashmir Great Lakes route (Vishansar–Krishansar–Gadsar–Satsar–Gangabal–Nundkol) and Tarsar–Marsar circuit, seasonal pilgrimage congregation and equine waste along the Sheshnag–Panchtarni corridor, and high-density migratory livestock grazing across alpine margs introduce localized fecal bacteria, organic nitrogen, and trampled shoreline sediment into ultra-dilute, low-buffering cold-water basins whose slow microbial turnover renders recovery far slower than in lowland waters [5][6]."
      ]
    },
    {
      "number": "18",
      "title": "Institutional Accountability, Restoration and Conservation Alternatives",
      "paragraphs": [
        "CAG Report No. 4 of 2025 exposed profound institutional fragmentation across J&K's lake governance architecture [2]. Administrative control is split across five departments (Forest, Revenue, Agriculture, Housing & Urban Development, and Tourism) and multiple Lake Development Authorities (LCMA, WUCMA, WMDA) without a unified Lake Conservation Act or centralized regulatory authority [2]. Although GoJ&K mandated the Forest Department in October 1989 to conserve all 697 natural lakes and assigned EE&RSD to survey their physical, chemical, and biological dynamics, detailed limnological surveys were never completed due to technical manpower deficits; conservation funding (₹560.65 crore, ~1% of J&K CAPEX during 2017–22) was restricted to just six lakes (Dal, Wular, Hokersar, Manasbal, Surinsar, Mansar), leaving 691 natural lakes without management plans or MoEFCC funding proposals [2].",
        "International mountain and urban lake restoration science—including deep urban sewage diversion in Lake Washington (USA) and Alpine lakes (Lake Annecy, Lake Geneva/Léman, Lake Constance/Bodensee), biomanipulation and sediment phosphorus locking in shallow Dutch/Danish polymictic lakes, and Kumaon Himalayan aeration/watershed lessons (Nainital, Bhimtal) [8][11]—demonstrates a universal rule: in-lake cosmetic dredging or mechanical weed-cutting fails unless external phosphorus loading is first reduced below critical Vollenweider resilience thresholds. For Kashmir, evidence-supported conservation requires: (1) enacting a unified statutory J&K Lake & Wetland Conservation Authority staffed with limnologists, hydrologists, and GIS specialists [2]; (2) completing 100% household/houseboat interceptor sewer & cold-climate nutrient-removal (N/P) STP upgrades around Dal, Nigeen, Anchar, Khushalsar, Gilsar, and Manasbal; (3) establishing cadastral boundary pillars across all 521 Kashmir lake identities (resolving Hokersar's 2,528.10-kanal encroachment and Manasbal's >7 km undemarcated shore) [2]; and (4) enforcing >=200 m no-camping/no-latrine setbacks and pack-in/pack-out rules around all alpine lakes."
      ]
    },
    {
      "number": "19",
      "title": "Regional Lake Trophic Status Atlas, Ecological Tipping Points and Scientific Conclusions",
      "paragraphs": [
        "Integrating all reconciled evidence into the KEW Regional Lake Trophic Status Atlas (/water-systems/lakes) yields four core scientific conclusions. First, Kashmir Division contains 521 verifiable unique lake identities across all ten districts—not 62, and not 1,230 (which includes 150 Jammu and 665 Ladakh waterbodies) [1][3]. Second, empirical trophic states follow a steep anthropogenic pressure gradient: urban and enclosed peri-urban valley basins (Anchar, Nigeen, Khushalsar, Gilsar, Brari Nambal, Dal) have crossed or sit at eutrophic-hypereutrophic thresholds characterized by benthic hypoxia, internal P recycling, and floating/cyanobacterial bloom dominance; open floodplain and deep rural lakes (Wular, Hokersar, Manasbal, Ahansar, Waskursar) exhibit eutrophic stress modulated by flushing or thermal stratification; montane Nilnag is mesotrophic; and the 10 studied alpine glacial lakes remain biologically oligotrophic [5][6][7][8][9][10][11].",
        "Third, ecological tipping-point vulnerability is highest in two contrasting cohorts: (a) Manasbal and outer Dal/Wular zones where loss of submerged charophyte/macrophyte clarity buffers could trigger irreversible turbid cyanobacterial bistability [8][10]; and (b) shallow alpine lakes (such as Krishansar, Z_max = 8 m, and Nundkol) where warming-shortened ice cover and localized grazing/camping nutrient inputs could trigger rapid periphytic/cyanobacterial shifts in ultra-dilute waters [5][6]. Fourth, because 499 of 521 Kashmir lakes currently lack dated chemical measurements, honest scientific intelligence requires displaying them in a neutral Insufficient Evidence category and deploying a systematic 10-district baseline limnological sampling programme rather than inventing trophic labels."
      ]
    },
    {
      "number": "20",
      "title": "Scientific References, Complete Lake Register, Datasets and Technical Appendices",
      "paragraphs": [
        "All primary inventories, spatial shapefiles, published chemical series, Carlson TSI calculations, and institutional audit records synthesized in this monograph are organized across fifteen mandatory technical appendices (Appendices A through O) and published as legally reusable open datasets in the KEW Open Data Portal (/open-data) and Lakes Intelligence Atlas (/water-systems/lakes): kew-kashmir-master-lakes.csv (553 records), kew-kashmir-master-lakes.geojson (521 Kashmir Division features in EPSG:4326), and kew-lake-source-reconciliation.json (10-district summary, 45 DEERS 1967→2009 converted records, and external source completeness queue) [1][2][3][4].",
        "In accordance with KEW Scientific Governance Standards (Section 47), this monograph is classified as a Secondary-Data Regional Scientific Assessment with Original Geospatial and Trophic Analytical Components and placed in 'Scientific Review' status pending formal external human limnological peer review."
      ],
      "table": {
        "tableNumber": "Table 20.1",
        "title": "Mandatory Scientific Appendices (Appendices A–O) Linked to KEW-SR-2026-101",
        "headers": [
          "Appendix",
          "Title",
          "Verified Record Scope",
          "Machine-Readable Access"
        ],
        "rows": [
          [
            "Appendix A",
            "Complete Master Lake Inventory",
            "521 deduplicated Kashmir Division lake identities (+ 32 extended Western Himalayan reference lakes = 553 platform records)",
            "/data/kew-kashmir-master-lakes.csv"
          ],
          [
            "Appendix B",
            "Original Departmental Inventory Reconciliation (DEERS 2012)",
            "415 / 415 Kashmir Division LISS-III (2009–2010) records + 45 / 45 1967→2009 Present-Status rows (1,230 statewide verified)",
            "/data/kew-lake-source-reconciliation.json"
          ],
          [
            "Appendix C",
            "CAG Historical Inventory Reconciliation (Report No. 4 of 2025)",
            "330 Kashmir historical baseline (56 disappeared, 144 shrunk, 104 expanded, 26 unchanged); 13 named Kashmir audit/dried-up lakes linked; 317 appendix rows queued",
            "/data/kew-lake-source-reconciliation.json"
          ],
          [
            "Appendix D",
            "Glacial Lake GIS Inventory Reconciliation (University of Kashmir Zenodo 2025)",
            "155 / 155 glacial lake polygons (1992–2024) across 14 Kashmir Himalayan watersheds (DOI: 10.5281/zenodo.15051825)",
            "/data/kew-kashmir-master-lakes.geojson"
          ],
          [
            "Appendix E",
            "Water-Body Census Reconciliation (Ministry of Jal Shakti First Census)",
            "9,765 J&K enumerated water bodies (37 Lakes [0.38%] strictly separated from 5,256 Ponds, 441 Reservoirs, 179 Tanks, 29 Check Dams, 3,823 Others)",
            "/data/kew-lake-source-reconciliation.json"
          ],
          [
            "Appendix F",
            "Lake Names, Kashmiri Transliterations and Alternative Spellings",
            "418 named Kashmir lake identities & 103 unnamed tarns/wetland basins",
            "/data/kew-kashmir-master-lakes.csv"
          ],
          [
            "Appendix G",
            "Historical Surface-Area Multi-Epoch Records (1911–2024)",
            "1967 SOI baseline, 1992 Landsat TM, 2009–2010 IRS LISS-III, 2014–2020 CAG remote sensing, and 2024 Sentinel-2/Landsat-9 epochs",
            "/data/kew-kashmir-master-lakes.csv"
          ],
          [
            "Appendix H",
            "Published Water Chemistry Observations & Unit Validation",
            "22 Kashmir lakes with dated peer-reviewed physicochemical records (1972–2025)",
            "/data/kew-kashmir-master-lakes.csv"
          ],
          [
            "Appendix I",
            "Carlson Trophic State Index (TSI) Individual Calculations",
            "22 assessed Kashmir Division lakes (10 Oligotrophic, 1 Mesotrophic, 6 Eutrophic, 5 Hypereutrophic) + 499 Insufficient Evidence",
            "/data/kew-kashmir-master-lakes.csv"
          ],
          [
            "Appendix J",
            "Scientific Methodology, Vollenweider Mass-Balance & Model Variables",
            "18 integrated disciplines, Carlson (1977) & OECD (1982) thresholds, Vollenweider phosphorus retention equations",
            "/sectoral-eia/reports/kew-sr-2026-101"
          ],
          [
            "Appendix K",
            "Satellite Datasets, Atmospheric/Topographic Correction & Optical Screening",
            "Landsat MSS/TM/ETM+/OLI (1972–2025), IRS-P6 LISS-III, Sentinel-2 MSI (10–20 m), Sentinel-1 SAR; 29 optical-screening-eligible lakes",
            "/hazard-intelligence/algal-bloom-intelligence"
          ],
          [
            "Appendix L",
            "Institutional Responsibility & Statutory Mandate Matrix",
            "LCMA, WUCMA, WMDA, J&K Forest Dept, Wildlife Protection Dept, JKPCC, Revenue Dept, J&K Wetland Authority",
            "/water-systems/restoration"
          ],
          [
            "Appendix M",
            "Lake-Specific Conservation & Restoration Priorities",
            "Tiered P0 Emergency Nutrient Interception, P1 Sentinel Alpine/GLOF & Demarcation, P2 Baseline Inventory Verification",
            "/water-systems/lakes"
          ],
          [
            "Appendix N",
            "Missing Scientific Data, Ungeoreferenced Records & Monitoring Queue",
            "499 Kashmir lakes lacking trophic measurements; 374 tabular records awaiting SOI/LISS-III coordinate pinning; 317 CAG appendix rows",
            "/data/kew-lake-source-reconciliation.json"
          ],
          [
            "Appendix O",
            "Complete Verified Bibliography & Evidence Provenance Register",
            "12 core peer-reviewed, statutory audit, UN/FAO, NASA, and Zenodo DOI/URL-verified primary anchors",
            "/research-library"
          ]
        ],
        "sourceNote": "Full tabular & spatial appendices are served directly via /data/kew-kashmir-master-lakes.csv, /data/kew-kashmir-master-lakes.geojson, and /data/kew-lake-source-reconciliation.json."
      }
    }
  ],
  "riskMethodologyNote": "Evaluates lacustrine receptor risk across four coupled dimensions—nutrient/trophic regime shift probability, areal encroachment/siltation persistence, internal benthic hysteresis (irreversibility), and institutional monitoring deficit—while keeping cryospheric GLOF hazard strictly separate from trophic risk.",
  "riskMatrix": [
    {
      "receptorOrProcess": "Urban & Peri-Urban Lacustrine Basins (Dal, Nigeen, Anchar, Khushalsar, Gilsar, Brari Nambal)",
      "pressureDriver": "Unintercepted municipal/houseboat sewage, stormwater inflows, shoreline encroachment & internal anoxic sediment P release",
      "severity": "Critical",
      "duration": "Multi-Decadal / Persistent",
      "spatialExtent": "Sub-Watershed",
      "reversibility": "Partially Reversible",
      "cumulativeScore": 92,
      "mitigationPriority": "P1 Immediate"
    },
    {
      "receptorOrProcess": "Jhelum Rural Floodplain Lakes & Sars (Wular, Hokersar, Haigam, Ahansar, Waskursar, Kupwara/Pulwama Sars)",
      "pressureDriver": "Catchment soil erosion, paddy/orchard fertilizer runoff, willow plantation & agricultural land-use conversion",
      "severity": "Critical",
      "duration": "Multi-Decadal / Persistent",
      "spatialExtent": "Basin-Wide",
      "reversibility": "Partially Reversible",
      "cumulativeScore": 86,
      "mitigationPriority": "P1 Immediate"
    },
    {
      "receptorOrProcess": "Deep Warm-Monomictic & Montane Forest Lakes (Manasbal, Nilnag)",
      "pressureDriver": "Summer hypolimnetic anoxia, unidentified village sewage outfalls, quarry/forest-slope siltation & undemarcated shores",
      "severity": "High",
      "duration": "Multi-Year",
      "spatialExtent": "Sub-Watershed",
      "reversibility": "Reversible with Intervention",
      "cumulativeScore": 74,
      "mitigationPriority": "P1 Immediate"
    },
    {
      "receptorOrProcess": "High-Altitude Alpine & Proglacial Lakes (Gangabal, Nundkol, Krishansar, Tarsar, Sheshnag & 300 Unassessed Tarns)",
      "pressureDriver": "Shortened winter ice cover, glacier retreat, unregulated trekking campsites, pilgrimage waste, alpine grazing & zero baseline WQ monitoring",
      "severity": "Moderate",
      "duration": "Seasonal / Episodic",
      "spatialExtent": "Basin-Wide",
      "reversibility": "Reversible with Intervention",
      "cumulativeScore": 64,
      "mitigationPriority": "P2 Short-Term"
    }
  ],
  "mitigationRecommendations": [
    {
      "id": "MIT-101-01",
      "category": "Regulatory Obligation",
      "recommendation": "Establish a unified statutory Jammu & Kashmir Lake and Wetland Conservation Authority with dedicated limnological, bathymetric, and GIS enforcement wings covering all 521 Kashmir lake identities.",
      "scientificMechanism": "Eliminates the 5-department jurisdictional diffusion audited by CAG Report No. 4 of 2025 that left 691 of 697 J&K natural lakes without conservation plans.",
      "targetReceptorOrIndicator": "Statutory demarcation & management plan coverage (0% -> 100% of verified lakes)",
      "feasibilityAssessment": "High administrative feasibility under Wetlands (Conservation and Management) Rules 2017 and J&K Reorganisation framework.",
      "environmentalTradeOffs": "None; requires ring-fenced multi-year scientific monitoring budgets rather than civil beautification CAPEX.",
      "responsibleInstitutions": "Government of J&K, Forest, Ecology & Environment Dept, J&K Wetland Authority"
    },
    {
      "id": "MIT-101-02",
      "category": "Evidence-Supported Intervention",
      "recommendation": "Complete 100% perimeter sewer interception, houseboat vacuum-sewerage hookups, and biological nutrient removal (N & P) STP retrofits before relying on mechanical de-weeding or dredging in Dal, Nigeen, Anchar, Khushalsar, Gilsar, and Manasbal.",
      "scientificMechanism": "Reduces external Vollenweider areal P loading below critical threshold so internal sediment management is not immediately re-saturated by raw wastewater.",
      "targetReceptorOrIndicator": "Epilimnetic Total Phosphorus (<35 µg/L target) and hypolimnetic DO (>5.0 mg/L)",
      "feasibilityAssessment": "Technically mature (cold-insulated SBR/MBBR + tertiary P precipitation); requires household lateral enforcement.",
      "environmentalTradeOffs": "Unsupervised mechanical dredging or wholesale macrophyte stripping without external P cutoff triggers turbid cyanobacterial blooms and resuspends anoxic sludge.",
      "responsibleInstitutions": "LCMA, UEED, SMC, WMDA, JKPCC"
    },
    {
      "id": "MIT-101-03",
      "category": "Ecological Restoration",
      "recommendation": "Restore hydrological flood-pulse connectivity, sediment check-dams on Erin/Madhumati/Doodhganga/Ningli inflows, and native emergent buffer zones across Wular, Hokersar, Haigam, and Shallabugh while halting new marsh-to-plantation conversions.",
      "scientificMechanism": "Traps coarse watershed silt upstream while preserving littoral denitrification and flood-attenuation storage.",
      "targetReceptorOrIndicator": "Open-water hydroperiod persistence and Secchi transparency (>1.5 m)",
      "feasibilityAssessment": "High; aligns with WUCMA Ramsar Action Plan and Wildlife Protection Department mandates.",
      "environmentalTradeOffs": "Requires equitable livelihood transition for communities dependent on willow coppicing and water-chestnut harvesting.",
      "responsibleInstitutions": "WUCMA, Dept of Wildlife Protection, Irrigation & Flood Control Dept, Forest Dept"
    },
    {
      "id": "MIT-101-04",
      "category": "Monitoring Requirement",
      "recommendation": "Execute a 10-district tiered baseline limnological and GPS-georeferencing campaign across all 499 unassessed Kashmir lakes—prioritizing Kupwara (66 lakes), Pulwama (26), Shopian (17), Kulgam (25), Budgam (45), and high-visitation alpine trekking lakes.",
      "scientificMechanism": "Measures paired Secchi depth, acetone-extracted Chl-a, filtered SRP, TP, TN, DO, and EC while resolving mineral vs bioavailable P in glacial waters.",
      "targetReceptorOrIndicator": "Trophic evidence coverage (4.2% -> >50% of perennial named lakes within 3 years)",
      "feasibilityAssessment": "High cost-effectiveness via University of Kashmir, SKUAST-K, and DEERS seasonal field fellowships.",
      "environmentalTradeOffs": "Non-invasive grab sampling; helicopter access near alpine lakes must be prohibited.",
      "responsibleInstitutions": "DEERS, JKPCC, University of Kashmir (CORD / Dept of Environmental Science & Geoinformatics)"
    }
  ],
  "references": [
    {
      "num": 1,
      "id": "ref-101-01",
      "authors": "Nasim, H., & Keng, T. (Department of Environment & Remote Sensing, J&K)",
      "year": 2012,
      "title": "Directory of Lakes and Waterbodies of J&K State (IRS-P6 LISS-III 2009–2010 & 1967 SOI Comparison)",
      "journalOrPublisher": "Directorate of Environment, Ecology and Remote Sensing (DEERS), Government of Jammu & Kashmir (131 pp.)",
      "category": "Government / Statutory Audit",
      "sourceUrl": "https://rsis.ramsar.org/RISapp/files/42191262/documents/IN2496_descr220412_1.pdf",
      "relevantFinding": "Enumerates exactly 415 Kashmir Division waterbodies (Anantnag 98, Baramulla 124, Budgam 33, Kupwara 66, Pulwama 20, Srinagar 74), 150 Jammu, and 665 Ladakh (= 1,230) plus 45 1967→2009 converted waterbodies.",
      "applicabilityLimitation": "Tabular district entries omit individual lat/lon coordinates, and 15 SOI 1967 toposheets were unavailable in the historical baseline."
    },
    {
      "num": 2,
      "id": "ref-101-02",
      "authors": "Comptroller and Auditor General of India (CAG)",
      "year": 2025,
      "title": "Report No. 4 of 2025: Performance Audit on Conservation and Management of Lakes in Jammu and Kashmir (ended March 2022)",
      "journalOrPublisher": "Government of Union Territory of Jammu and Kashmir / CAG of India",
      "category": "Government / Statutory Audit",
      "sourceUrl": "https://saiindia.gov.in/en/audit-report/details/125068",
      "relevantFinding": "Audits 697 J&K natural lakes (330 Kashmir: 56 disappeared, 144 shrunk, 104 expanded, 26 unchanged), 63 sampled lakes (7 dried up/invisible), and ₹560.65 cr CAPEX concentrated in only 6 lakes.",
      "applicabilityLimitation": "Official 4-page CAG Press Release verified; 317 remaining row-level entries in Appendices 2.1–2.10 remain queued due to saiindia.gov.in / cag.gov.in server downtime."
    },
    {
      "num": 3,
      "id": "ref-101-03",
      "authors": "Rashid, I., & Kashani, S. D. R.",
      "year": 2025,
      "title": "Glacial Lake Outburst Flood Susceptibility and Potential Downstream Implications Across the Kashmir Himalaya [Spatial Dataset]",
      "journalOrPublisher": "University of Kashmir / Zenodo",
      "category": "Satellite / Geospatial Product",
      "doi": "10.5281/zenodo.15051825",
      "sourceUrl": "https://zenodo.org/records/15051825",
      "relevantFinding": "Provides 155 georeferenced glacial lake polygons (1992–2024 dynamics) and multi-criteria GLOF susceptibility classifications across 14 Kashmir Himalayan watersheds.",
      "applicabilityLimitation": "Captures physical glacial lake dynamics and GLOF hazard (>= ~0.1 ha); contains no water-chemistry or trophic measurements."
    },
    {
      "num": 4,
      "id": "ref-101-04",
      "authors": "Ministry of Jal Shakti (Department of Water Resources, RD & GR)",
      "year": 2023,
      "title": "First Census of Water Bodies — All India & Jammu and Kashmir State Report (pp. 175–180 / PDF pp. 181–186)",
      "journalOrPublisher": "Government of India, Ministry of Jal Shakti",
      "category": "Government / Statutory Audit",
      "sourceUrl": "https://www.jalshakti-dowr.gov.in/static/uploads/2024/05/20240110191671260.pdf",
      "relevantFinding": "Enumerates 9,765 J&K waterbodies (98.4% <0.5 ha), strictly distinguishing 37 Lakes (0.38%) from 5,256 Ponds, 441 Reservoirs, 179 Tanks, 1,051 dried-up, and 103 encroached bodies.",
      "applicabilityLimitation": "Published PDF provides state-level disaggregated tables; village-level OGD microdata requires authenticated API access."
    },
    {
      "num": 5,
      "id": "ref-101-05",
      "authors": "Vass, K. K., Wanganeo, A., Raina, H. S., Zutshi, D. P., & Wanganeo, R.",
      "year": 1989,
      "title": "Summer limnology and fisheries of high mountain lakes of Kashmir Himalayas",
      "journalOrPublisher": "Archiv für Hydrobiologie, 114(4), 603–619",
      "category": "Peer-Reviewed Journal",
      "doi": "10.1127/archiv-hydrobiol/114/1989/603",
      "sourceUrl": "https://doi.org/10.1127/archiv-hydrobiol/114/1989/603",
      "relevantFinding": "Establishes 1977–1984 summer baseline across 12 Kashmir alpine lakes (3,200–3,819 m): Secchi 0.5–12 m, pH 6.7–7.4, EC 15–130 µS/cm, diatom dominance, and Diptychus maculatus / Salmo trutta distributions.",
      "applicabilityLimitation": "Historical summer-only campaign from >35 years ago; cannot alone confirm contemporary 2026 trophic stability."
    },
    {
      "num": 6,
      "id": "ref-101-06",
      "authors": "Lone, S. A., Bhat, S. U., Hamid, A., Bhat, F. A., & Kumar, A.",
      "year": 2021,
      "title": "Limnochemistry and Plankton Diversity in Some High Altitude Lakes of Kashmir Himalaya",
      "journalOrPublisher": "Frontiers in Environmental Science, 9, 681965",
      "category": "Peer-Reviewed Journal",
      "doi": "10.3389/fenvs.2021.681965",
      "sourceUrl": "https://doi.org/10.3389/fenvs.2021.681965",
      "relevantFinding": "Provides bathymetry (Z_max 8–84 m), hydrochemistry (EC 16–40 µS/cm, DO 7.8–8.4 mg/L, TP 48–168 µg/L), and 61 plankton taxa (45 Bacillariophyceae) across Gangabal, Nundkol, Gadsar, Kishansar, and Vishansar.",
      "applicabilityLimitation": "Two ice-free samplings without Secchi or Chl-a; Table 1 header misprinted mg/L for µg/L TP/OP values confirmed in text."
    },
    {
      "num": 7,
      "id": "ref-101-07",
      "authors": "Mir, S. S., & Pandit, A. K.",
      "year": 2021,
      "title": "Phytoplankton Assemblages and Trophic Status of Wular Lake in Kashmir Himalaya",
      "journalOrPublisher": "Journal of Himalayan Ecology and Sustainable Development, 16, 86–105",
      "category": "Peer-Reviewed Journal",
      "sourceUrl": "https://envirsc.uok.edu.in/Files/ab1ac1f1-07e3-42a2-85bc-83717ef39155/Journal/f0e0a788-6f9a-42cc-836b-605de12dae5f.pdf",
      "relevantFinding": "Reports 7-site seasonal Wular measurements (SD 0.18–2.23 m [mean 1.08 m], TP 101–215 µg/L [mean 175 µg/L]), Carlson TSI >60, and NMDS/CCA ordination across 4 algal classes.",
      "applicabilityLimitation": "Underlying field campaign conducted 2002–2004 (published 2021); supplemented with Mushtaq et al. (2022) satellite-in-situ series."
    },
    {
      "num": 8,
      "id": "ref-101-08",
      "authors": "Solim, U. S., & Wanganeo, A.",
      "year": 2008,
      "title": "Excessive Phosphorus Loading to Dal Lake, India: Implications for Managing Shallow Eutrophic Lakes in Urbanized Watersheds",
      "journalOrPublisher": "International Review of Hydrobiology, 93(2), 148–166",
      "category": "Peer-Reviewed Journal",
      "doi": "10.1002/iroh.200710934",
      "sourceUrl": "https://doi.org/10.1002/iroh.200710934",
      "relevantFinding": "Quantifies external phosphorus loading, mass-balance retention, and internal benthic P recycling governing eutrophic persistence in Dal Lake.",
      "applicabilityLimitation": "Focused on Dal Lake urban sub-basins; flushing parameters differ in riverine Wular and deep Manasbal."
    },
    {
      "num": 9,
      "id": "ref-101-09",
      "authors": "Ali, I., Neverova-Dziopak, E., & Kowalewski, Z.",
      "year": 2025,
      "title": "Assessment of Spatio-Temporal Dynamics of Dal Lake's Trophic State",
      "journalOrPublisher": "Water, 17(3), 314",
      "category": "Peer-Reviewed Journal",
      "doi": "10.3390/w17030314",
      "sourceUrl": "https://doi.org/10.3390/w17030314",
      "relevantFinding": "Evaluates 2019–2023 monitoring across Hazratbal, Nishat/Bod Dal, Nigeen, and Gagribal, confirming basin-wide progression into eutrophic status.",
      "applicabilityLimitation": "Applies biotic-balance Index of Trophic State alongside physicochemical series specific to Dal-Nigeen basins."
    },
    {
      "num": 10,
      "id": "ref-101-10",
      "authors": "Mushtaq, F., Lala, M. G. N., & Pandit, B. A.",
      "year": 2022,
      "title": "Trophic State Assessment of a Freshwater Himalayan Lake Using Landsat 8 OLI Satellite Imagery: A Case Study of Wular Lake, Jammu and Kashmir (India)",
      "journalOrPublisher": "Earth and Space Science, 9(3), e2021EA001653",
      "category": "Peer-Reviewed Journal",
      "doi": "10.1029/2021EA001653",
      "sourceUrl": "https://doi.org/10.1029/2021EA001653",
      "relevantFinding": "Combines in-situ Chl-a (25.81–207.96 µg/L) and Secchi depth (0.18–0.66 m) with Landsat-8 OLI reflectance, mapping ~57% of Wular open water as eutrophic.",
      "applicabilityLimitation": "Empirical optical regression is sensor- and season-specific to turbid floodplain waters and cannot be transferred uncalibrated to alpine tarns."
    },
    {
      "num": 11,
      "id": "ref-101-11",
      "authors": "Raina, H. S., & Petr, T.",
      "year": 1999,
      "title": "Coldwater Fish and Fisheries in the Indian Himalayas: Lakes and Reservoirs (FAO Fisheries Technical Paper No. 385)",
      "journalOrPublisher": "Food and Agriculture Organization of the United Nations (FAO), Rome",
      "category": "Institutional Monograph",
      "sourceUrl": "https://www.fao.org/4/x2614e/x2614e05.htm",
      "relevantFinding": "Synthesizes morphometry, clinograde oxygen depletion in Manasbal and Nigeen, 1:8 phytoplankton-to-macrophyte carbon fixation in Dal, and native Schizothorax vs introduced Cyprinus carpio fisheries.",
      "applicabilityLimitation": "Pre-2000 synthesis; contemporary catch and nutrient loads have intensified."
    },
    {
      "num": 12,
      "id": "ref-101-12",
      "authors": "Dar, S. A., Bhat, S. U., Aneaus, S., & Rashid, I.",
      "year": 2020,
      "title": "A geospatial approach for limnological characterization of Nigeen Lake, Kashmir Himalaya",
      "journalOrPublisher": "Environmental Monitoring and Assessment, 192, 121",
      "category": "Peer-Reviewed Journal",
      "doi": "10.1007/s10661-020-8091-y",
      "sourceUrl": "https://doi.org/10.1007/s10661-020-8091-y",
      "relevantFinding": "Documents Nigeen Secchi depth (0.52–1.39 m), Total Phosphorus (184–687 µg/L), 30% built-up settlement growth (2003–2016), and hypereutrophic Carlson TSI status.",
      "applicabilityLimitation": "Single urban basin study; paired in this monograph with Dar, Bhat & Rashid (2021; 10.1007/s11270-021-05416-5) on Anchar."
    },
    {
      "num": 13,
      "id": "ref-101-13",
      "authors": "Mir, R. A., Jain, S. K., Lohani, A. K., &isar, U. / Discover Water Kashmir Glacial Inventory",
      "year": 2021,
      "title": "Spatiotemporal dynamics of glacial lakes (1990–2018) in the Kashmir Himalayas, India using Remote Sensing and GIS",
      "journalOrPublisher": "Discover Water, 1, 7",
      "category": "Peer-Reviewed Journal",
      "doi": "10.1007/s43832-021-00007-1",
      "sourceUrl": "https://doi.org/10.1007/s43832-021-00007-1",
      "relevantFinding": "Documents 1990–2018 glacial lake expansion across the Upper Jhelum / Kashmir Himalayas, contextualizing population differences across glacial lake inventories.",
      "applicabilityLimitation": "Different minimum mapping threshold and regional bounding box explain aggregate count variance relative to Zenodo 15051825."
    },
    {
      "num": 14,
      "id": "ref-101-14",
      "authors": "Discover Geoscience Upper Indus Glacial Lake Working Group",
      "year": 2026,
      "title": "Automated mapping and multi-decadal changes in glacial lakes in the Upper Indus Sub-Basin, Western Himalaya, using Google Earth Engine",
      "journalOrPublisher": "Discover Geoscience (Springer Nature)",
      "category": "Peer-Reviewed Journal",
      "doi": "10.1007/s44288-026-00761-6",
      "sourceUrl": "https://doi.org/10.1007/s44288-026-00761-6",
      "relevantFinding": "Demonstrates GEE multi-decadal glacial lake detection across the broader Upper Indus Sub-Basin, confirming why broader Indus totals (255/324/616/775) must not be added to Kashmir Division counts.",
      "applicabilityLimitation": "Covers wider Upper Indus trans-divisional catchments beyond the 10-district Kashmir Division boundary."
    }
  ],
  "limitations": [
    "Trophic Evidence Deficit: Only 22 of 521 deduplicated Kashmir Division lakes currently possess dated published water-chemistry or Secchi measurements; all 499 remaining lakes are explicitly classified as 'Insufficient Evidence' and must not be cited as oligotrophic or eutrophic until sampled.",
    "CAG Report No. 4 of 2025 Appendix Queue: While the official 4-page CAG audit release and aggregate 330-lake Kashmir historical figures (56 disappeared, 144 shrunk, 104 expanded, 26 unchanged) plus 13 named Kashmir lakes were verified, 317 row-level entries in Appendices 2.1–2.10 remain in the explicit acquisition queue due to upstream saiindia.gov.in connection timeouts and cag.gov.in HTTP 500 errors.",
    "DEERS 2012 Coordinate & Parent-District Granularity: Nasim & Keng (2012) published exact waterbody names, areas (ha), and altitudes (m) across 6 pre-reorganization Kashmir parent districts without individual lat/lon coordinates; 78 unnamed georeferenced Zenodo glacial polygons may spatially correspond to ungeoreferenced DEERS high-altitude tarns and are retained transparently without forced merging.",
    "Secondary-Data Governance Status: No original KEW wet-chemistry fieldwork or external independent human peer review is claimed; KEW-SR-2026-101 is classified in 'Scientific Review' status awaiting human scientific sign-off."
  ],
  "version": "v1.0-flagship-review",
  "lastRevised": "2026-11-25",
  "dataQualityLabel": "Secondary-Data Regional Scientific Monograph (521 Reconciled Kashmir Lakes · 14 Verified Primary Sources)"
};
