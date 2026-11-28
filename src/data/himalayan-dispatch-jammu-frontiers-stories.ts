// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — JAMMU DIVISION SCIENTIFIC INVESTIGATIONS (01, 02 & 03)
// DEDICATED THEMATIC ISSUE: "JAMMU'S ECOLOGICAL FRONTIERS"
// Following the scientific and editorial architecture of "The Atmosphere Has No Borders"
//
// Evidentiary Rule: Chapter counts (45), original scientific experiments (20),
// and the 41-year (1985–2026) baseline are proposed research targets. No original
// satellite processing, hydrological simulations, or field verification has yet
// been completed. Defining principle: Scientific discovery before editorial conclusions.
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import { MagazineStory } from '@/types/himalayan-dispatch';

export const STORY_JAMMU_01_CHENAB_BREAKING_POINT: MagazineStory = {
  id: 'hd-story-jammu-01',
  slug: 'the-chenab-has-a-breaking-point',
  editionSlug: 'monograph-18-jammus-ecological-frontiers',
  editionLabel: "MONOGRAPH 18 · JAMMU'S ECOLOGICAL FRONTIERS",
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'cover-stories'],
  departmentRubric:
    'JAMMU SCIENTIFIC INVESTIGATION 01 · RIVER BASIN HYDROLOGY, TECTONICS & CUMULATIVE CARRYING CAPACITY',
  folioCode: '01 / JAMMU ECOLOGICAL FRONTIERS · RESEARCH ARCHITECTURE',
  title: 'The Chenab Has a Breaking Point',
  subtitle:
    'Hydroelectric Expansion, Geological Vulnerability and the Cumulative Ecological Carrying Capacity of the Chenab River Basin.',
  excerpt:
    'Can the Chenab sustain multiple interconnected hydroelectric projects—spanning operational Dulhasti (390 MW), Baglihar (890 MW), and Salal (690 MW) alongside the proposed Sawalkote project—without compromising its geological stability, hydrological integrity, and ecological functions? Establishing a 15-chapter, 6-experiment scientific investigation protocol across the Chenab Gorge.',
  dateline:
    'KISHTWAR · DODA · RAMBAN · REASI · UDHAMPUR · AKHNOOR · CHENAB RIVER BASIN · JAMMU DIVISION',
  region: 'Jammu Division · Chenab River Basin (Kishtwar, Doda, Ramban, Reasi, Akhnoor)',
  readingTimeMinutes: 19,
  wordCount: 4200,
  proseWordCount: 3400,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
  heroCaption:
    'Deeply incised Western Himalayan gorge terrain representative of the middle Chenab corridor between Kishtwar, Ramban, and Reasi—where foliated metamorphic slopes, thrust faults, cascade reservoirs, and headrace tunnels converge (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
  heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
  journalistSlug: 'himalayan-dispatch-desk',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations',
  bylineRole:
    'Jammu Bureau Scientific Investigation 01 · Proposed 15-Chapter & 6-Experiment Research Protocol',
  factCheckedBy:
    'Stage 02 Literature & Baseline Scoping Completed · Primary Data & Experiment Execution Pending',
  scientificReviewer:
    'Protocol Architecture Modelled on Monograph 01 · Independent External Stage 07 Specialist Review Pending',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl: '/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers',
  supplementaryDatasetLabel:
    "Open Jammu's Ecological Frontiers Architecture (3 Investigations · 45 Chapters · 20 Experiments)",
  reportingBeatSlug: 'transboundary-rivers-hydropower',
  reportingBeatLabel: 'Transboundary Rivers, Hydropower Cascades & Himalayan Slope Stability',
  seoTitle:
    'The Chenab Has a Breaking Point — Jammu Division Scientific Investigation 01',
  seoKeywords: [
    'Chenab hydropower',
    'Dulhasti',
    'Baglihar',
    'Salal',
    'Sawalkote',
    'Chenab River Basin carrying capacity',
    'Ramban Kishtwar slope instability InSAR',
    'Jammu Division scientific investigations',
  ],
  publicationStatusNote:
    'Proposed Scientific Investigation Architecture · Stages 01–02 Formulated · Original Satellite, InSAR & Hydrological Experiments Not Yet Completed',
  conceptualFolioDisclosure:
    'Ongoing Scientific Investigation & Target Scope Disclosure: Following the scientific and editorial architecture of "The Atmosphere Has No Borders", the 15 research chapters, 6 original scientific experiments, and 41-year (1985–2026) historical baseline in Investigation 01 are proposed research targets. No original Sentinel-1 InSAR processing, hydrological discharge reconstructions, reservoir sedimentation runs, or field verification has yet been completed. Defining principle: Scientific discovery before editorial conclusions.',
  editorialVerificationNote:
    'Evidentiary Guardrails: Operational capacities for Dulhasti (390 MW), Baglihar (890 MW), and Salal (690 MW) and the proposed status of Sawalkote represent documented public-record anchors. Public media concerns (including photo-essay reporting on Chenab hydropower hazards and national coverage of Sawalkote clearances) are treated strictly as hypotheses to be tested independently against PARIVESH filings, CWC hydrology, Sentinel-1 SAR deformation, and seismic catalogues—never reproduced uncritically as pre-established scientific verdicts.',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Anchored to documented Chenab mainstem installations (Dulhasti 390 MW, Baglihar 890 MW, Salal 690 MW), proposed Sawalkote assessment scope, PARIVESH/CWC public frameworks, and Himalayan tectonic literature.',
    scientificNote:
      'Six original experiments (cumulative stress, 1985–2026 discharge reconstruction, Sentinel-1 InSAR slope velocity, sediment deficit, cascading GLOF/cloudburst routing, and e-flow modelling) defined as formal protocols awaiting execution and Stage 07 specialist review.',
    ethicsAndVisualNote:
      'Enforces scientific discovery before editorial conclusions, institutional Right of Reply for project developers and regulators, and explicit illustrative archival plate attribution.',
    adminHoldNote:
      'Published as an active research architecture within "Jammu’s Ecological Frontiers" (Monograph 18) under Founding Editor-in-Chief oversight.',
  }),
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'One River, Sequential Concrete Walls, and an Unasked Question',
      subtitle:
        'Can the Chenab sustain multiple interconnected hydroelectric projects without compromising its geological stability, hydrological integrity and ecological functions?',
      dateline: 'CHENAB GORGE · KISHTWAR TO AKHNOOR · INVESTIGATION 01 CHARTER',
      paragraphs: [
        'Rising from the confluence of the glacier-fed Chandra and Bhaga rivers in the high Lahaul Himalaya before plunging through the razor-backed gorges of Pangi, Kishtwar, Doda, Ramban, and Reasi, the Chenab is one of the highest-energy mountain rivers on Earth. Across steep metamorphic and phyllitic valleys bounded by active Himalayan thrust zones, the river drops thousands of metres in elevation before emerging onto the Jammu plains at Akhnoor. That extraordinary hydraulic head has made the Chenab Valley the centrepiece of hydroelectric ambition in the Western Himalayas.',
        'Three major hydroelectric complexes already operate along the Chenab mainstem in Jammu Division: Dulhasti (390 MW) in Kishtwar, Baglihar (890 MW) in Ramban, and Salal (690 MW) in Reasi—representing 1,970 megawatts of operational mainstem capacity alongside multiple tributary and under-construction schemes across Pakal Dul, Kiru, Kwar, and Ratle. Now, renewed movement around the proposed Sawalkote hydroelectric project between Baglihar and Salal gives acute urgency to a question that isolated project-by-project clearances rarely confront whole: does a steep, tectonically active Himalayan river possess a cumulative breaking point?',
        'Public commentary in the region has often polarized between two unsatisfying extremes. On one side, critical media reports and photo essays have warned of Chenab Valley hydropower projects as "ticking time bombs" amid slope failures, sinking villages, and tunnel seepage; on the other, official clearances routinely evaluate each dam within a narrow ten-kilometre study radius as though upstream and downstream reservoirs belonged to separate planets. Following the defining principle of Himalayan Dispatch—scientific discovery before editorial conclusions—Investigation 01 refuses merely to echo either activist alarm or bureaucratic reassurance. Its task is to test, through primary physical evidence, what can scientifically be demonstrated.',
        'In strict accordance with our Monograph 01 ("The Atmosphere Has No Borders") standard, every reader should note at the outset: the fifteen chapters, six original scientific experiments, and forty-one-year (1985–2026) historical baseline presented here constitute our proposed research architecture. No original Sentinel-1 InSAR processing, hydrological simulations, or field verification has yet been completed for this investigation.',
      ],
      fieldNote: {
        label: 'PRIMARY RESEARCH HYPOTHESIS · INVESTIGATION 01',
        detail:
          'Hypothesis under empirical test: Individual project-level environmental clearances may underestimate the combined environmental consequences of multiple hydroelectric projects operating within a connected river system. All 15 chapters and 6 experiments remain proposed research targets awaiting primary execution.',
      },
      commemorationLedger: {
        heading: 'Investigation 01 · Proposed Research Scope',
        items: [
          { label: 'Proposed Research Chapters', figure: '15' },
          { label: 'Original Scientific Experiments', figure: '6' },
          { label: 'Historical Baseline Target', figure: '1985–2026' },
        ],
        methodologicalNote:
          'Proposed research targets under the 10-stage Himalayan Dispatch publication standard; zero unexecuted simulations are presented as completed findings.',
        sourceNote:
          'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations.',
      },
    },
    {
      numberRoman: 'I',
      title: 'Lithology, Tectonics & the Ramban–Kishtwar Slope Crucible (Chapters 01–05)',
      subtitle:
        'Testing slope deformation, fault proximity, and reservoir-triggered seismicity across the Kishtwar Window and Main Boundary–Central Thrust zones.',
      paragraphs: [
        'Before a single turbine turns, the Chenab Gorge is already one of the most geodynamically restless corridors in the Himalaya. Between Kishtwar and Reasi, the river slices across the Kishtwar tectonic window, the Main Central Thrust (MCT), the fragile Ramban–Assar slate, phyllite, and gypsum-bearing formations, the Murree thrust, and the active Reasi fault system. Intense monsoonal cloudbursts, freeze-thaw wedging, and highway cut-slopes along NH-44 routinely trigger translational rockslides and deep-seated rotational slumps even without reservoir loading.',
        'Chapters 01 through 05 of our framework examine what happens when sequential impoundments, fluctuating reservoir rims, and tens of kilometres of blasted headrace and diversion tunnels are superimposed onto this structural architecture. Experiment 01.3 proposes a basin-wide multi-temporal Interferometric Synthetic Aperture Radar (SBAS/PS-InSAR) time-series using ascending and descending Sentinel-1 C-band archives paired with 30-metre Copernicus DEMs. Rather than relying on anecdotal crack reports alone, InSAR coherence mapping can measure millimetre-per-year line-of-sight slope velocities along reservoir drawdowns and tunnel alignments before and after excavation.',
        'Simultaneously, Chapters 04 and 05 audit seismic design accelerations in PARIVESH Environmental Impact Assessments against modern GPS crustal-convergence studies and test for micro-seismic clustering during seasonal reservoir filling and rapid drawdown cycles across Dulhasti, Baglihar, and Salal.',
      ],
      pullQuote: {
        quote:
          'A ten-kilometre clearance circle sees one dam, one tunnel, and one spoil bank; the river, the fault system, and the monsoon experience all of them at once.',
        attribution: 'Himalayan Dispatch Research Desk | Jammu Division',
        context: 'Investigation 01 · Cumulative Basin Principle',
      },
    },
    {
      numberRoman: 'II',
      title: 'Trapped Silt, Hungry Water & Bypassed Gorges (Chapters 06–08)',
      subtitle:
        'From Salal and Baglihar siltation benchmarks to dewatered tunnel reaches and native coldwater biodiversity.',
      paragraphs: [
        'Glaciated headwaters in Lahaul, Pangi, Miyar, and Warwan deliver immense volumes of glacially ground rock flour, sand, and cobbles into the Chenab. When concrete barriers intercept that flux—constrained further by run-of-the-river operational rules under the Indus Waters Treaty—sediment management becomes an existential engineering and ecological challenge, historically illustrated by rapid siltation behind Salal (690 MW) and periodic sluicing regimes at Baglihar (890 MW).',
        'Chapters 06 through 08 pair Experiment 01.4 (reservoir sedimentation and downstream sediment deficit modelling) with Experiment 01.6 (environmental flow scenario modelling). Sequential trapping behind Dulhasti, Baglihar, a future Sawalkote dam, and Salal alters two things simultaneously: upstream reservoirs lose live storage while periodic flushing releases concentrated turbidity pulses, and downstream reaches emerging onto the Akhnoor–Pargwal plains receive sediment-starved "hungry water" that reshapes gravel bars and riverine marshes.',
        'Between each diversion dam and its downstream tailrace outlet, river water travels inside concrete-lined mountain tunnels rather than the natural riverbed. Chapter 07 and Chapter 08 establish a transparent protocol to measure actual winter lean-season wetted width from 10-metre Sentinel-2 imagery, compare statutory minimum environmental-flow stipulations against diurnal hydropeaking swings, and map Dendritic Connectivity Indices for snow trout (Schizothorax) and Golden Mahseer (Tor putitora).',
      ],
    },
    {
      numberRoman: 'III',
      title: 'Cryospheric Outbursts, Cumulative Carrying Capacity & Governance (Chapters 09–15)',
      subtitle:
        'Evaluating cascading GLOF/cloudburst routing, non-stationary 1985–2026 hydrology, and PARIVESH regulatory compliance.',
      paragraphs: [
        'High above Kishtwar and Lahaul, retreating glaciers leave behind expanding moraine-dammed lakes exposed to ice-rock avalanches and extreme GPM IMERG rainfall events. Chapters 09 and 10 (Experiments 01.2 and 01.5) investigate non-stationary climate hydrology: reconstructing 41 years (1985–2026) of Chenab discharge using ERA5, GPM IMERG, and CWC observations while modelling how an upper-catchment Glacial Lake Outburst Flood (GLOF) or landslide-dam breach propagates through a tightly spaced chain of reservoirs.',
        'Chapters 11 through 15 bring all six proposed experiments together into a Cumulative Environmental Impact Assessment and Ecological Carrying Capacity model—directly examining how adding the proposed Sawalkote project transforms free-flowing reach continuity, forest submergence, tunnel-muck disposal risk, and downstream Akhnoor–Pargwal hydrology, while auditing six-monthly PARIVESH compliance filings and affording full Right of Reply to project authorities.',
      ],
      editorialTable: {
        kicker: 'FRAMEWORK MATRIX · INVESTIGATION 01 (15 PROPOSED CHAPTERS)',
        caption:
          'Complete 15-chapter scientific research architecture for "The Chenab Has a Breaking Point" (proposed research targets awaiting empirical execution)',
        headers: ['Chapter', 'Research Domain & Analytical Focus'],
        rows: [
          ['01', 'Geological evolution of the Chenab Basin — Litho-structural contacts, Kishtwar Window & Ramban phyllite instability'],
          ['02', 'Historical hydrological baseline — 1985–2026 nival, glacial & monsoon discharge reconstruction (EXP-01.2)'],
          ['03', 'Hydroelectric infrastructure inventory — Dulhasti (390 MW), Baglihar (890 MW), Salal (690 MW), Sawalkote & tributaries'],
          ['04', 'Himalayan tectonics and seismic vulnerability — MCT/MBT/Reasi thrust proximity & seismic design audit'],
          ['05', 'Reservoir-induced seismicity — Pore-pressure loading, drawdown cycles & micro-seismic telemetry review'],
          ['06', 'Sediment transport and retention — Sequential trap efficiency, flushing plumes & Akhnoor deficit (EXP-01.4)'],
          ['07', 'Environmental flow requirements — Dewatered tunnel reaches, hydropeaking & e-flow scenarios (EXP-01.6)'],
          ['08', 'River fragmentation and aquatic biodiversity — Schizothorax & Tor barrier connectivity and tributary refugia'],
          ['09', 'Glacial lakes and cascading flood risks — Headwater GLOF inventory & sequential dam-routing stress (EXP-01.5)'],
          ['10', 'Climate change and future water availability — Cryospheric recession & non-stationary generation dependability'],
          ['11', 'Cumulative environmental impact assessment — Single-project 10 km EIAs vs. overlapping cascade synergies'],
          ['12', 'Ecological carrying capacity modelling — Basin-wide slope, seismic, sediment & flow thresholds (EXP-01.1)'],
          ['13', 'Downstream and transboundary consequences — Akhnoor–Pargwal geomorphic coupling & treaty run-of-river constraints'],
          ['14', 'Environmental clearance and regulatory compliance — PARIVESH EC conditions, muck disposal & NGT records'],
          ['15', 'Scientific conclusions and policy recommendations — Evidence-gated safeguards & real-time public telemetry'],
        ],
        footnote:
          'Status: Proposed research targets under the 10-stage Himalayan Dispatch publication standard. No original satellite or hydrological simulations have yet been completed.',
      },
    },
  ],
};

export const STORY_JAMMU_02_RIVER_NOT_CONSTRUCTION_SITE: MagazineStory = {
  id: 'hd-story-jammu-02',
  slug: 'a-river-is-not-a-construction-site',
  editionSlug: 'monograph-18-jammus-ecological-frontiers',
  editionLabel: "MONOGRAPH 18 · JAMMU'S ECOLOGICAL FRONTIERS",
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'field-reports'],
  departmentRubric:
    'JAMMU SCIENTIFIC INVESTIGATION 02 · FLUVIAL GEOMORPHOLOGY, RIVERBED MINING & INFRASTRUCTURE VULNERABILITY',
  folioCode: '02 / JAMMU ECOLOGICAL FRONTIERS · RESEARCH ARCHITECTURE',
  title: 'A River Is Not a Construction Site',
  subtitle:
    "Riverbed Mining, Sediment Imbalance, Urban Encroachment and Hydrological Destabilization of Jammu's River Systems.",
  excerpt:
    'Is human intervention altering Jammu’s rivers—the Tawi, Ravi, Ujh, and Basantar—faster than their natural geomorphological processes can restore equilibrium? Anchored to the February 6, 2025 National Green Tribunal proceedings on Kathua and Samba sand mining and Basantar bridge-pillar exposure, Investigation 02 sets out a 15-chapter, 7-experiment fluvial science protocol.',
  dateline:
    'TAWI · BASANTAR · UJH · RAVI · JAMMU · SAMBA · KATHUA · UDHAMPUR · JAMMU DIVISION',
  region: 'Jammu Division · Tawi, Basantar, Ujh & Ravi Basins (Jammu, Samba, Kathua, Udhampur)',
  readingTimeMinutes: 19,
  wordCount: 4150,
  proseWordCount: 3350,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/sectoral-eia/eia-agriculture-riverbed-soil.jpg',
  heroCaption:
    'Piedmont gravel-and-sand river corridor representative of Jammu’s Siwalik-fed river systems (Tawi, Basantar, Ujh, and Ravi)—where seasonal monsoon sediment replenishment confronts heavy mechanized excavation, floodplain encroachment, and bridge-pier scour (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
  heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
  journalistSlug: 'himalayan-dispatch-desk',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations',
  bylineRole:
    'Jammu Bureau Scientific Investigation 02 · Proposed 15-Chapter & 7-Experiment Research Protocol',
  factCheckedBy:
    'Stage 02 Statutory & Judicial Scoping Completed · Primary Remote-Sensing & Geomorphic Execution Pending',
  scientificReviewer:
    'Protocol Architecture Modelled on Monograph 01 · Independent External Stage 07 Specialist Review Pending',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl: '/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers',
  supplementaryDatasetLabel:
    "Open Jammu's Ecological Frontiers Architecture (3 Investigations · 45 Chapters · 20 Experiments)",
  reportingBeatSlug: 'lakes-wetlands-springs-waterways',
  reportingBeatLabel: 'Fluvial Geomorphology, Sediment Budgets, Floodplains & Statutory Compliance',
  seoTitle:
    'A River Is Not a Construction Site — Jammu Division Scientific Investigation 02',
  seoKeywords: [
    'Jammu riverbed mining',
    'Basantar River bridge pillars NGT',
    'Tawi River hydrology',
    'Ujh River sediment dynamics',
    'Ravi River Kathua Samba sand mining',
    'Exner sediment balance',
    'Jammu Division scientific investigations',
  ],
  publicationStatusNote:
    'Proposed Scientific Investigation Architecture · Stages 01–02 Formulated · 1985–2026 Channel, Mining & Scour Experiments Not Yet Completed',
  conceptualFolioDisclosure:
    'Ongoing Scientific Investigation & Target Scope Disclosure: Following the architecture of "The Atmosphere Has No Borders", the 15 research chapters, 7 original scientific experiments, and 41-year (1985–2026) baseline in Investigation 02 are proposed research targets. No original Landsat/Sentinel mining-footprint classification, DEM elevation-change differencing, or field scour verification has yet been completed. Defining principle: Scientific discovery before editorial conclusions.',
  editorialVerificationNote:
    'Evidentiary Guardrails: National Green Tribunal (NGT) proceedings dated February 6, 2025 addressing illegal sand mining concerns in Kathua and Samba—including reported bridge-pillar exposure in the Basantar River—and SANDRP documentation on mechanized mining are cited as documented legal and public-interest triggers. Empirical attribution of incision depths, lease violations, and replenishment deficits requires executing Experiments 02.1–02.7 and affording full Right of Reply to regulatory agencies and leaseholders.',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Scoped against February 6, 2025 NGT proceedings on Kathua/Samba riverbed mining and Basantar bridge pillars, MoEFCC 2016/2020 Sand Mining Guidelines, SANDRP archival reports, and fluvial Exner mass-balance theory.',
    scientificNote:
      'Seven original experiments (1985–2026 channel change, Sentinel-2 mining footprints, extraction vs. replenishment mass balance, bed elevation change, floodplain encroachment, bridge scour vulnerability, and water-quality trends) defined for execution.',
    ethicsAndVisualNote:
      'Maintains strict separation between judicial allegations/triggers and independently demonstrated geomorphological proof; illustrative archival plate clearly labeled.',
    adminHoldNote:
      'Published within "Jammu’s Ecological Frontiers" (Monograph 18) as a structured scientific investigation framework.',
  }),
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'Exposed Bridge Pillars and the Physics of Hungry Rivers',
      subtitle:
        "Is human intervention altering Jammu's rivers faster than their natural geomorphological processes can restore equilibrium?",
      dateline: 'BASANTAR · TAWI · UJH · RAVI · SAMBA, KATHUA & JAMMU · INVESTIGATION 02 CHARTER',
      paragraphs: [
        'Every monsoon, torrential runoff pouring off the unconsolidated sandstones, conglomerates, and mudstones of the Siwalik foothills carries boulders, cobbles, gravel, and sand onto the piedmont fans of Jammu, Samba, and Kathua. For millennia, that seasonal bedload built the braided gravel armour of the Tawi, the Basantar, the Ujh, and the Ravi—dissipating flood velocity, supporting bridge foundations, filtering surface water, and recharging the shallow aquifers where the dry Kandi belt meets the fertile Sirowal plains.',
        'Over the past decade, rapid highway expansion, urban real-estate growth, and industrial construction transformed those living riverbeds into industrial aggregate quarries. On February 6, 2025, proceedings before the National Green Tribunal (NGT) confronted illegal sand mining concerns in Kathua and Samba districts, including the reported exposure of bridge pillars associated with riverbed mining in the Basantar River. Earlier civil-society documentation, including assessments by the South Asia Network on Dams, Rivers and People (SANDRP), similarly highlighted the shift from seasonal manual collection to heavy mechanized excavators operating directly inside active river channels.',
        'Yet judicial orders and press reports alone cannot measure a river’s sediment budget. How much gravel and sand do the Tawi, Ravi, Ujh, and Basantar actually replenish in a wet or dry monsoon compared with what excavators remove? How far upstream and downstream of mining pits does channel-bed incision migrate, and how severely has urban floodplain encroachment constricted Jammu’s floodways since 1985? Investigation 02 establishes a 15-chapter, 7-experiment fluvial geomorphology protocol to answer those questions through independent physical measurement.',
        'In keeping with our strict publication standard, the 15 chapters, 7 proposed experiments, and 1985–2026 historical baseline detailed below represent proposed research targets; no original satellite mining-footprint processing, DEM bed-elevation modelling, or field verification has yet been completed.',
      ],
      fieldNote: {
        label: 'PRIMARY RESEARCH HYPOTHESIS · INVESTIGATION 02',
        detail:
          'Hypothesis under empirical test: Where sediment extraction exceeds natural replenishment, riverbed incision and channel instability may increase risks to groundwater systems, aquatic habitats, bridges and surrounding communities.',
      },
      commemorationLedger: {
        heading: 'Investigation 02 · Proposed Research Scope',
        items: [
          { label: 'Proposed Research Chapters', figure: '15' },
          { label: 'Original Scientific Experiments', figure: '7' },
          { label: 'Channel Baseline Window', figure: '1985–2026' },
        ],
        methodologicalNote:
          'Anchored to Feb 6, 2025 NGT Basantar/Kathua–Samba proceedings as a scoping benchmark; empirical satellite and hydraulic experiments remain pending execution.',
        sourceNote:
          'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations.',
      },
    },
    {
      numberRoman: 'I',
      title: 'Four Rivers on the Siwalik Edge: Tawi, Ravi, Ujh & Basantar (Chapters 01–06)',
      subtitle:
        'Why steep piedmont gravel rivers lose equilibrium when their coarse surface armour is stripped.',
      paragraphs: [
        'Unlike low-gradient plains rivers lined with deep, cohesive silt, Jammu’s foothill rivers—the Tawi, Ravi, Ujh, and Basantar—are steep, flashy gravel-bed systems emerging from friable Siwalik hills. Their stability depends on a coarse surface pavement of cobbles and boulders that shields finer subsurface sands from erosion except during peak monsoon floods.',
        'Chapters 01 through 06 establish dedicated sub-basin diagnostics for each river across a 41-year (1985–2026) Landsat and Sentinel-2 archive (Experiment 02.1). In the Tawi (Chapter 03), urban barrage works, floodplain colonies, and peri-urban extraction converge right through Jammu city. Along the Ravi (Chapter 04) and Ujh (Chapter 05) in Kathua, upstream flow regulation and dense stone-crusher clusters intersect high-energy monsoon channels. And in the Basantar across Samba (Chapter 06), forensic satellite time-series will examine the exact spatial history of excavation surrounding the bridge corridors highlighted in the February 6, 2025 NGT proceedings.',
      ],
    },
    {
      numberRoman: 'II',
      title: 'The Exner Deficit: Extraction vs. Replenishment & Infrastructure Scour (Chapters 07–10)',
      subtitle:
        'Testing District Survey Report quotas against physical bedload physics and statutory bridge buffers.',
      paragraphs: [
        'At the heart of fluvial geomorphology lies the Exner sediment conservation balance: when anthropogenic removal exceeds the net convergence of natural monsoon bedload transport, channel-bed elevation must fall. Deep in-stream mining pits trap incoming upstream gravel while releasing sediment-starved water downstream, triggering both upstream-migrating headcuts ("knickpoints") and downstream scour.',
        'Chapters 07 through 10 operationalize Experiments 02.2, 02.3, 02.4, and 02.6: mapping 10-metre Sentinel-2 excavation pits and crusher stockpiles against official PARIVESH lease polygons; testing District Survey Report (DSR) replenishment claims against GPM IMERG monsoon runoff and DEM stream-power models; assessing multi-epoch bed lowering via ICESat-2 lidar crossings and benchmark records; and auditing every major NH-44, expressway, and railway bridge across Kathua, Samba, and Jammu for statutory buffer violations.',
      ],
      pullQuote: {
        quote:
          'When sand and boulders are mined faster than the Siwalik monsoon can replace them, the river pays the deficit by carving downward into bridge piers and draining adjacent village aquifers.',
        attribution: 'Himalayan Dispatch Research Desk | Jammu Division',
        context: 'Investigation 02 · Exner Sediment Balance Hypothesis',
      },
    },
    {
      numberRoman: 'III',
      title: 'Encroached Floodways, Falling Water Tables & Compliance Reform (Chapters 11–15)',
      subtitle:
        'Connecting riverbed incision to Kandi–Sirowal groundwater drawdown, urban sewage loads, and sustainable M-Sand transitions.',
      paragraphs: [
        'River destabilization does not stop at the riverbank. Chapters 11 through 15 connect physical channel change to human water security and governance: mapping 1985–2026 floodplain and urban khad encroachment across Jammu (Experiment 02.5); testing CGWB/India-WRIS piezometric records for riparian water-table drawdown alongside incised reaches; analyzing JKPCC/NWMP dissolved-oxygen, BOD, and industrial effluent trends from Jammu, Bari Brahmana, Samba, and Kathua (Experiment 02.7); and auditing PARIVESH/NGT compliance to define dynamic replenishment-capped extraction rules and manufactured-sand (M-Sand) alternatives.',
      ],
      editorialTable: {
        kicker: 'FRAMEWORK MATRIX · INVESTIGATION 02 (15 PROPOSED CHAPTERS)',
        caption:
          'Complete 15-chapter scientific research architecture for "A River Is Not a Construction Site" (proposed research targets awaiting empirical execution)',
        headers: ['Chapter', 'Research Domain & Analytical Focus'],
        rows: [
          ['01', 'Physiography of the Jammu river systems — Siwalik-to-plains slope break, Kandi/Sirowal belts & stream power'],
          ['02', 'Historical river morphology — 1985–2026 braid width, bar area & thalweg migration baseline (EXP-02.1)'],
          ['03', 'Tawi River hydrological assessment — Urban Jammu floodway hydraulics, barrages & peri-urban extraction'],
          ['04', 'Ravi River environmental assessment — Upstream regulation interactions & Kathua gravel-bed stability'],
          ['05', 'Ujh River sediment dynamics — Flashy Siwalik bedload yield vs. stone-crusher & lease footprints'],
          ['06', 'Basantar River vulnerability — Forensic scoping of Feb 6, 2025 NGT mining & bridge-pillar exposure record'],
          ['07', 'Riverbed mining intensity — Sentinel-2/SAR detection of mechanized pits, haul roads & depth proxies (EXP-02.2)'],
          ['08', 'Sediment replenishment versus extraction — Physical monsoon bedload yield vs. DSR quotas (EXP-02.3)'],
          ['09', 'River channel incision and migration — Knickpoint propagation, armour stripping & avulsion (EXP-02.4)'],
          ['10', 'Bridge and infrastructure vulnerability — Highway/rail pier scour & statutory buffer compliance (EXP-02.6)'],
          ['11', 'Floodplain encroachment — 1985–2026 urban construction across Tawi & piedmont khad floodways (EXP-02.5)'],
          ['12', 'Groundwater and river interactions — Incision-driven riparian aquifer drainage & hyporheic loss'],
          ['13', 'Sewage and industrial contamination — Urban Tawi drains & Samba/Kathua effluent trends (EXP-02.7)'],
          ['14', 'Mining permits and environmental compliance — PARIVESH EC conditions, e-challans & NGT enforcement'],
          ['15', 'River restoration and sustainable extraction — Replenishment caps, sanctuary zones & M-Sand transition'],
        ],
        footnote:
          'Status: Proposed research targets under the 10-stage Himalayan Dispatch publication standard. No original satellite processing or hydraulic simulations have yet been completed.',
      },
    },
  ],
};

export const STORY_JAMMU_03_WETLANDS_PROTECT_JAMMU: MagazineStory = {
  id: 'hd-story-jammu-03',
  slug: 'the-wetlands-that-protect-jammu',
  editionSlug: 'monograph-18-jammus-ecological-frontiers',
  editionLabel: "MONOGRAPH 18 · JAMMU'S ECOLOGICAL FRONTIERS",
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'longform-features'],
  departmentRubric:
    'JAMMU SCIENTIFIC INVESTIGATION 03 · FRESHWATER ECOLOGY, RAMSAR GOVERNANCE & MIGRATORY CORRIDORS',
  folioCode: '03 / JAMMU ECOLOGICAL FRONTIERS · RESEARCH ARCHITECTURE',
  title: 'The Wetlands That Protect Jammu',
  subtitle:
    'Freshwater Ecosystem Degradation, Migratory Bird Corridors, Groundwater Recharge and the Ecological Security of the Jammu Plains.',
  excerpt:
    'Is Jammu adequately protecting the natural freshwater infrastructure—anchored by the 350-hectare Surinsar–Mansar Ramsar lake system (designated November 8, 2005) alongside Gharana, Pargwal, Kukarian, and Sanasar wetlands—that sustains its flood resilience, groundwater recharge, and Central Asian Flyway biodiversity? A 15-chapter, 7-experiment research architecture.',
  dateline:
    'SURINSAR · MANSAR · GHARANA · PARGWAL · KUKARIAN · SANASAR · JAMMU PLAINS & FOOTHILLS',
  region: 'Jammu Division · Surinsar–Mansar, Gharana, Pargwal, Kukarian & Sanasar Wetlands',
  readingTimeMinutes: 19,
  wordCount: 4100,
  proseWordCount: 3300,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/biodiversity/biodiversity-birds-wetland.jpg',
  heroCaption:
    'Freshwater wetland habitat and wintering waterfowl representative of Jammu Division’s lacustrine and floodplain refugia—linking the Surinsar–Mansar Ramsar complex with Gharana, Pargwal, Kukarian, and Sanasar along the Central Asian Flyway (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
  heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
  journalistSlug: 'himalayan-dispatch-desk',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations',
  bylineRole:
    'Jammu Bureau Scientific Investigation 03 · Proposed 15-Chapter & 7-Experiment Research Protocol',
  factCheckedBy:
    'Stage 02 Ramsar, Botanical & Hydrological Literature Scoping Completed · Empirical Execution Pending',
  scientificReviewer:
    'Protocol Architecture Modelled on Monograph 01 · Mandatory Field Calibration Gate for Optical Water Quality',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl: '/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers',
  supplementaryDatasetLabel:
    "Open Jammu's Ecological Frontiers Architecture (3 Investigations · 45 Chapters · 20 Experiments)",
  reportingBeatSlug: 'lakes-wetlands-springs-waterways',
  reportingBeatLabel: 'Ramsar Lakes, Floodplain Marshes, Aquifer Recharge & Central Asian Flyway',
  seoTitle:
    'The Wetlands That Protect Jammu — Jammu Division Scientific Investigation 03',
  seoKeywords: [
    'Surinsar Mansar Ramsar wetland',
    'Gharana wetland migratory birds',
    'Pargwal wetland',
    'Kukarian wetland',
    'Sanasar wetland',
    'Jammu plains groundwater recharge',
    'Central Asian Flyway Jammu',
  ],
  publicationStatusNote:
    'Proposed Scientific Investigation Architecture · Stages 01–02 Formulated · 1985–2026 Wetland, NDWI/MNDWI & Field-Calibrated Water Quality Experiments Pending',
  conceptualFolioDisclosure:
    'Ongoing Scientific Investigation & Target Scope Disclosure: Following the architecture of "The Atmosphere Has No Borders", the 15 research chapters, 7 original scientific experiments, and 41-year (1985–2026) baseline in Investigation 03 are proposed research targets. No original NDWI/MNDWI processing, field-calibrated chlorophyll/turbidity retrievals, nutrient models, or ecosystem-service valuations have yet been completed. Defining principle: Scientific discovery before editorial conclusions.',
  editorialVerificationNote:
    'Evidentiary Guardrails: The 350-hectare Ramsar designation of Surinsar–Mansar Lakes on November 8, 2005 and published aquatic macrophyte research across Gharana, Pargwal, Kukarian, and Sanasar provide verified baseline anchors. Under Experiment 03.4 rules, satellite red-edge chlorophyll and turbidity estimates are strictly subject to in-situ field calibration and are never asserted as standalone laboratory measurements.',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Anchored to Ramsar Information Service Site #1573 (Surinsar–Mansar, 350 ha, Nov 8, 2005), peer-reviewed Jammu aquatic plant diversity studies (Gharana, Pargwal, Kukarian, Sanasar), J&K Stormwater hydrology context, and GBIF/eBird records.',
    scientificNote:
      'Seven original experiments (1985–2026 wetland change, seasonal inundation, NDWI/MNDWI water extent, field-calibrated chlorophyll/turbidity, agricultural nutrient loading, migratory bird suitability, and ecosystem service valuation) specified with explicit calibration guardrails.',
    ethicsAndVisualNote:
      'Protects sensitive migratory bird roost coordinates from disturbance while upholding institutional Right of Reply for wetland and municipal authorities.',
    adminHoldNote:
      'Published within "Jammu’s Ecological Frontiers" (Monograph 18) as a structured scientific investigation framework.',
  }),
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'The Quiet Infrastructure Beneath Jammu’s Ecological Security',
      subtitle:
        'Is Jammu adequately protecting the natural freshwater infrastructure that supports its ecological and hydrological security?',
      dateline: 'SURINSAR–MANSAR · GHARANA · PARGWAL · KUKARIAN · SANASAR · INVESTIGATION 03 CHARTER',
      paragraphs: [
        'When environmental emergencies in Jammu Division enter public consciousness, attention usually gravitates toward dramatic mountain highway collapses or swollen monsoon rivers. Far quieter—and far less understood as unified hydrological infrastructure—is the network of freshwater lakes, floodplain marshes, village talabs, and montane wet meadows stretching from the Patnitop ridge down across the Siwalik folds to the R.S. Pura and Akhnoor plains.',
        'On November 8, 2005, the twin Siwalik freshwater lakes of Surinsar and Mansar—covering a designated area of 350 hectares—received international recognition under the Ramsar Convention on Wetlands. Beyond that Ramsar flagship, regional botanical and limnological scholarship has documented remarkable aquatic plant diversity and ecological productivity across Gharana, Pargwal, Kukarian, and high-altitude Sanasar. Together, these waterbodies detain monsoon storm surges, percolate freshwater into Kandi and Sirowal aquifers, assimilate agricultural nutrients, and sustain tens of thousands of migratory waterbirds arriving along the Central Asian Flyway.',
        'Yet across four decades of peri-urban expansion, intensive fertilizer runoff, shoreline commercialization, catchment deforestation, and hydrological alteration from upstream dams (Investigation 01) and riverbed incision (Investigation 02), these natural commons face compounding stress. Investigation 03 establishes a 15-chapter, 7-experiment research framework to measure independently what Jammu stands to lose—and what engineered replacement costs it will incur—if its wetland shield degrades.',
        'Consistent with our Monograph 01 evidentiary charter, all 15 chapters, 7 proposed scientific experiments, and the 41-year (1985–2026) historical baseline represent proposed research targets; no original satellite processing, hydrological modelling, or field water-quality calibration has yet been completed.',
      ],
      fieldNote: {
        label: 'PRIMARY RESEARCH HYPOTHESIS · INVESTIGATION 03',
        detail:
          "Hypothesis under empirical test: The degradation of Jammu's wetlands may reduce regional flood resilience, freshwater availability and biodiversity while increasing long-term environmental management costs.",
      },
      commemorationLedger: {
        heading: 'Investigation 03 · Proposed Research Scope',
        items: [
          { label: 'Surinsar–Mansar Ramsar Area', figure: '350 ha' },
          { label: 'Proposed Research Chapters', figure: '15' },
          { label: 'Original Scientific Experiments', figure: '7' },
        ],
        methodologicalNote:
          'Surinsar–Mansar Ramsar recognition dated November 8, 2005; satellite chlorophyll and turbidity estimations (EXP-03.4) remain strictly subject to in-situ field calibration.',
        sourceNote:
          'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations.',
      },
    },
    {
      numberRoman: 'I',
      title: 'Six Focal Systems Across Three Elevation Belts (Chapters 01–07)',
      subtitle:
        'From sub-alpine Sanasar (~2,050 m) and Siwalik Surinsar–Mansar to floodplain Gharana, Pargwal, and Kukarian.',
      paragraphs: [
        'Jammu’s wetlands span three distinct hydrogeomorphic settings, each vulnerable to a different combination of pressures. At roughly 2,050 metres in Ramban, Sanasar’s cup-shaped montane meadow wetland regulates headwater soil moisture while confronting recreational compaction and drainage ditches (Chapter 07). Along the forested Siwalik anticlines east of Jammu, deep closed-basin lakes at Surinsar (Chapter 03) and Mansar (Chapter 04) trap hillside silt and lakeside domestic inflows with limited natural flushing.',
        'Down on the alluvial plains, Gharana Wetland in R.S. Pura (Chapter 05) crowds tens of thousands of wintering bar-headed geese and migratory ducks into a shrinking marsh hemmed in by paddy fields and drainage channels; Pargwal on the braided Chenab floodplain (Chapter 06) depends directly on seasonal river pulses altered by upstream hydropower and gravel mining; and Kukarian (Chapter 07) exemplifies smaller un-notified stepping-stone wetlands vulnerable to quiet agricultural conversion.',
      ],
    },
    {
      numberRoman: 'II',
      title: '41 Years of Spectral Water Tracking, Recharge & Flood Attenuation (Chapters 08–12)',
      subtitle:
        'Pairing 1985–2026 NDWI/MNDWI and Sentinel-1 SAR inundation mapping with field-calibrated trophic diagnostics.',
      paragraphs: [
        'Chapters 08 through 12 deploy Experiments 03.1 through 03.5 across harmonized 1985–2026 Landsat, JRC Global Surface Water, Sentinel-1 SAR, and Sentinel-2 MSI archives. By pairing Green-to-SWIR Modified Normalized Difference Water Indices (MNDWI) with cloud-penetrating monsoon SAR passes, the protocol separates permanent wetland reclamation from normal dry-year variability.',
        'Crucially, Chapter 12 enforces a strict metrological guardrail borrowed directly from "The Atmosphere Has No Borders": while Sentinel-2 red-edge bands can screen spatial algal and sediment plumes across Surinsar and Mansar, satellite-based chlorophyll and turbidity estimation (Experiment 03.4) is explicitly subject to in-situ field calibration and laboratory verification before trophic conclusions are drawn.',
      ],
      pullQuote: {
        quote:
          'Every hectare of marsh or village talab paved over on the Jammu plains reappears years later as a flooded urban street, a deeper borewell, and an expensive concrete storm drain.',
        attribution: 'Himalayan Dispatch Research Desk | Jammu Division',
        context: 'Investigation 03 · Natural Freshwater Infrastructure Hypothesis',
      },
    },
    {
      numberRoman: 'III',
      title: 'Central Asian Flyway Connectivity & Ramsar Governance (Chapters 13–15)',
      subtitle:
        'Evaluating two decades of post-2005 Ramsar stewardship, GBIF/eBird flyway networks, and replacement-cost economics.',
      paragraphs: [
        'Chapters 13 through 15 connect ecological integrity to international law and fiscal reality: modelling observer-effort-normalized GBIF and eBird habitat suitability across Jammu’s Central Asian Flyway stepping stones (Experiment 03.6); auditing twenty-one years of statutory compliance since Surinsar–Mansar’s November 8, 2005 Ramsar listing under India’s Wetlands (Conservation and Management) Rules; and quantifying ecosystem-service replacement costs (Experiment 03.7) to chart a practical wetland recovery blueprint.',
      ],
      editorialTable: {
        kicker: 'FRAMEWORK MATRIX · INVESTIGATION 03 (15 PROPOSED CHAPTERS)',
        caption:
          'Complete 15-chapter scientific research architecture for "The Wetlands That Protect Jammu" (proposed research targets awaiting empirical execution)',
        headers: ['Chapter', 'Research Domain & Analytical Focus'],
        rows: [
          ['01', "Historical evolution of Jammu's wetlands — Siwalik structural lakes, montane bowls & Chenab–Tawi floodplain marshes"],
          ['02', 'Regional freshwater ecosystem inventory — Division-wide lake, marsh & traditional talab geospatial registry'],
          ['03', 'Surinsar Lake ecological assessment — Catchment siltation, stratification & Ramsar ecological character'],
          ['04', 'Mansar Lake ecological assessment — Shoreline pressure, sewage interception, DO & biotic stress'],
          ['05', 'Gharana wetland and migratory birds — Boundary encroachment, agrochemical runoff & winter waterfowl refuge'],
          ['06', 'Pargwal wetland ecosystem — Chenab flood-pulse coupling, macrophyte diversity & gravel-mining links'],
          ['07', 'Kukarian and Sanasar wetlands — Plains agricultural conversion vs. sub-alpine meadow compaction/drainage'],
          ['08', 'Historical wetland extent and land-use changes — 1985–2026 Landsat/JRC/MNDWI transition matrix (EXP-03.1, 03.3)'],
          ['09', 'Groundwater recharge functions — Piezometric coupling between intact wetlands/talabs and Kandi–Sirowal wells'],
          ['10', 'Natural flood attenuation — Monsoon cloudburst detention volumes & urban Jammu stormwater buffering'],
          ['11', 'Agricultural runoff and nutrient loading — Catchment N/P export into Gharana, Pargwal & Ramsar basins (EXP-03.5)'],
          ['12', 'Eutrophication and aquatic biodiversity — Field-calibrated optical screening & native flora shifts (EXP-03.4)'],
          ['13', 'International migratory bird corridors — GBIF/eBird Central Asian Flyway habitat suitability (EXP-03.6)'],
          ['14', 'Ramsar obligations and conservation governance — Nov 8, 2005 Ramsar commitments & 2017 Wetland Rules audit'],
          ['15', 'Wetland restoration and ecological security — Ecosystem-service valuation (EXP-03.7) & recovery blueprint'],
        ],
        footnote:
          'Status: Proposed research targets under the 10-stage Himalayan Dispatch publication standard. Satellite chlorophyll/turbidity estimates remain strictly subject to field calibration.',
      },
    },
  ],
};

export const JAMMU_FRONTIERS_STORIES: MagazineStory[] = [
  STORY_JAMMU_01_CHENAB_BREAKING_POINT,
  STORY_JAMMU_02_RIVER_NOT_CONSTRUCTION_SITE,
  STORY_JAMMU_03_WETLANDS_PROTECT_JAMMU,
];
