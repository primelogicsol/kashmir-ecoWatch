// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · SPECIAL GEOLOGICAL & ENVIRONMENTAL INVESTIGATION
// MINERAL RESOURCE GOVERNANCE · EXTRACTIVE ECONOMICS · ENVIRONMENTAL JUSTICE
//
// "THE WEALTH BENEATH THE MOUNTAINS"
// Subtitle: "Gilgit-Baltistan’s Mineral Resources: Extraction, Environmental
//            Vulnerability, External Commercial Interests and the Question of
//            Local Ownership"
//
// Placement: Immediately after "The Price of Power" and immediately before
//            "The Western Himalayas Are Sitting on a Time Bomb"
//            (Dispatch 24 of 35 in complete Vol. 01 / No. 01 sequence).
//
// Regional Byline Integrity:
//   Attributed to "Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage"
//   (Founding Editor-in-Chief's personal byline omitted; recorded under
//   Editorial Oversight only until a genuine Gilgit-Baltistan correspondent is
//   appointed and contributes to the investigation.)
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';
import {
  ECONOMIC_VS_LIABILITY_BALANCE_10,
  EXTERNAL_INVESTMENT_PARTICIPANTS_7,
  FIFTEEN_UNANSWERED_QUESTIONS_GB,
  GB_MINERAL_EXTERNAL_DATA_SOURCES_12,
  GB_MINERAL_OCCURRENCES_14,
  GEMSTONE_VALUE_CHAIN_6,
  GEOLOGICAL_CONFIDENCE_TIERS_6,
  GEOLOGICAL_SLOPE_HAZARDS_9,
  MINERAL_INTEGRITY_PROTOCOL_20,
  OCCUPATIONAL_MINING_HAZARDS_10,
  PLACER_GOLD_RIVER_DISTURBANCES_8,
  PROTECTED_AREAS_AND_WILDLIFE_10,
  REGULATORY_ACCOUNTABILITY_CHAIN_12,
  SHIGAR_2025_CONTROVERSY_AUDIT_7,
  TRADITIONAL_VS_INDUSTRIAL_EXTRACTION_6,
  WATER_POLLUTION_CONTAMINANTS_10,
  WEALTH_BENEATH_MOUNTAINS_SPEC,
} from './himalayan-dispatch-wealth-beneath-mountains-monograph';

export const THE_WEALTH_BENEATH_THE_MOUNTAINS_STORY: MagazineStory = {
  id: 'hd-story-wealth-beneath-mountains',
  slug: 'the-wealth-beneath-the-mountains',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'field-reports', 'editorials'],
  departmentRubric:
    'SPECIAL GEOLOGICAL INVESTIGATION · MINERAL EXPLOITATION · EXTERNAL COMMERCIAL INTERESTS · RESOURCE OWNERSHIP · ENVIRONMENTAL JUSTICE',
  folioCode: '24 / SPECIAL GEOLOGICAL & ENVIRONMENTAL INVESTIGATION · MONOGRAPH 16',
  title: 'The Wealth Beneath the Mountains',
  subtitle:
    'Gilgit-Baltistan’s Mineral Resources: Extraction, Environmental Vulnerability, External Commercial Interests and the Question of Local Ownership',
  excerpt:
    'Where the Himalayan, Karakoram, and Hindu Kush orogenic belts collide, Gilgit-Baltistan holds documented occurrences of rubies, aquamarine, topaz, tourmaline, gold, copper, graphite, and lithium-bearing pegmatites—attracting official mineral-development interest across a reported 43,494 km². Yet public inspection of the regional mining portal shows 590 study-area entries alongside zero displayed private-lease records, April 2025 saw mass protests in Shigar over mineral-rights reforms, consolidated rules point to an illustrative 85% drop in community royalty share (from 2× royalty to 30%), and August 2026 environmental warnings flagged mechanized placer gold mining threatening rivers and the Diamer-Basha corridor.',
  dateline: 'GILGIT-BALTISTAN · KARAKORAM · SHIGAR · HUNZA · DIAMER · UPPER INDUS BASIN',
  region: 'Gilgit-Baltistan · Karakoram · Upper Indus Basin',
  readingTimeMinutes: 36,
  wordCount: 8420,
  proseWordCount: 6390,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
  heroCaption:
    'High-relief mountain river gorge and alluvial gravel corridor representative of Upper Indus extractive landscapes—where mechanized placer dredging, hard-rock pegmatite mining, glacier-fed hydrology, and steep tectonic slopes converge (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
  heroCredit: 'Kashmir EcoWatch Visual Archive',
  journalistSlug: 'himalayan-dispatch-research-desk-gb',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage',
  bylineRole:
    'Geological Sciences, Extractive Economics and Mineral Resource Governance · Editorial Oversight: Dr. Fayaz Ahmad Khan, Founding Editor-in-Chief',
  factCheckedBy:
    'Stage 04 GB Mines Portal (590 Study Entries), April 2025 Shigar/PGMA Record, Aug 9, 2026 Dawn/GB-EPA Report & Indexed Concession Rules Audit Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Internal KEW Economic Geology (CRIRSCO Classification), Fluvial Geomorphology, Acid-Drainage Geochemistry & Spatial Conservation Audit Completed · Gazette Authentication & Field Sampling Ongoing',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl:
    '/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains',
  supplementaryDatasetLabel:
    'Open Monograph 16: The Wealth Beneath the Mountains (18 Thematic Volumes · 108 Proposed Chapters)',
  reportingBeatSlug: 'extractive-industries-mineral-governance',
  reportingBeatLabel:
    'Gilgit-Baltistan Mineral Governance, Extractive Economics & Upper Indus Environmental Justice',
  seoTitle:
    'The Wealth Beneath the Mountains: Gilgit-Baltistan’s Mineral Resources & Local Ownership | Himalayan Dispatch',
  publicationStatusNote:
    'Stage 08 · Pre-Release Geological & Environmental Investigation Awaiting Administrator Approval',
  editorialVerificationNote: WEALTH_BENEATH_MOUNTAINS_SPEC.researchLimitationsNote,
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Cross-checked against the Gilgit-Baltistan Mines & Minerals public portal (590 study-area/auctionable entries; zero records displayed on public private-leaseholder view at inspection), official Pakistan–China mineral forum estimate (43,494 km² mineral-development interest area), April 27, 2025 Shigar protest & PGMA statements (Hum English), August 9, 2026 Dawn investigation citing GB-EPA warnings on mechanized placer gold mining and Diamer-Basha risks, FWEGB protected-area records, and indexed consolidated GB Mining Concession Rules (2× royalty vs. 2024 30% amendment).',
    scientificNote:
      'Enforces CRIRSCO/JORC geological distinctions between mineral occurrences and mineable reserves, pyrite acid-drainage stoichiometry (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺), non-allegation of mercury/cyanide or protected-area overlap without site-level proof, and strict separation of mining rock-failure hazards from major tectonic earthquakes.',
    ethicsAndVisualNote:
      'Carries "Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage" without inventing a fictional regional correspondent or claiming an unestablished local bureau; records Founding Editor-in-Chief under Editorial Oversight only.',
    adminHoldNote:
      'Stage 08 Pre-Release Flagship Investigation staged on localhost for Founding Administrator review.',
  }),
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'Three Colliding Mountain Systems—and the Question of Who Owns What Lies Beneath',
      subtitle:
        'Why Gilgit-Baltistan’s extraordinary mineral diversity demands strict geological honesty, transparent lease registries, and local economic ownership—not speculative hype or unexamined extraction.',
      dateline: 'GILGIT · SKARDU · SHIGAR · HUNZA · DIAMER · UPPER INDUS BASIN',
      paragraphs: [
        'Positioned immediately after our investigation into Western Himalayan hydropower and energy justice—and directly ahead of our synthesis on cumulative tectonic and climate disaster vulnerability—mineral extraction in Gilgit-Baltistan completes a decisive inquiry into mountain resource governance: first ecological carrying limits, then water and electricity, and now the rock and riverbeds themselves. Where the Himalayan, Karakoram, and Hindu Kush mountain systems collide across the Kohistan–Ladakh island arc, tectonic convergence has generated fourteen documented groups of precious gemstones, base and precious metals, industrial minerals, and strategic mineral occurrences: alluvial gold along the Indus and Gilgit rivers, rubies in Hunza and Nagar, world-famous aquamarine and topaz in Shigar and Haramosh, tourmaline and garnet pegmatites, copper occurrences in Bagrot, Danyor, Sher Qila, and Singal, graphite in Nagar, Hunza, and Chalt, iron and molybdenum occurrences, dimension marble, historical uranium anomalies, and lithium-bearing minerals in the Shengus pegmatites.',
        'At a Pakistan–China mineral investment forum, a Gilgit-Baltistan official identified approximately 43,494 km² (4.35 million hectares) as the region’s mining or mineral-development interest area. Scientific precision must govern that figure from the outset: 43,494 km² is an official investment-promotion estimate of geological interest—not the area currently excavated—just as identifying a lithium or rare-earth mineral occurrence does not establish a commercially recoverable reserve without Measured/Indicated drilling and economic feasibility proof.',
        'Crucially, environmental harm in fragile mountains is not confined to illegal digging. Even legally licensed mechanized mining can destabilize slopes, incise glacier-fed rivers, fragment snow-leopard and Markhor corridors, and leave multi-generational liabilities if environmental clearances, beneficial-ownership transparency, community consent, and financial closure bonds fail to keep pace with commercial appetite.',
      ],
      commemorationLedger: {
        heading:
          'GILGIT-BALTISTAN MINERAL GOVERNANCE BASELINES · STRICT GEOLOGICAL & PORTAL CAVEATS',
        items: [
          {
            label: 'Reported Mineral-Interest Area (Not Active Excavation)',
            figure: '43,494 km²',
          },
          {
            label: 'Public Portal Study Entries / Displayed Private Leases',
            figure: '590 / 0',
          },
          {
            label: 'Illustrative Community Royalty Shift (PKR 200 → PKR 30)',
            figure: '-85%',
          },
        ],
        methodologicalNote:
          '43,494 km² (4.35M ha) reflects an official investment-interest estimate; the 590 portal entries span studies, proposed blocks, and varied statuses (not 590 active mines), while the blank private-lease table may reflect database/filter incompleteness; the 85% royalty figure compares 2× vs. 30% of PKR 100 government royalty pending visual authentication of original gazetted pages.',
        sourceNote:
          'Sources: INP mineral-forum report; GB Mines & Minerals Portal (portal.minesandmineralsgb.gog.pk); Consolidated GB Mining Concession Rules (lpd.gbit.gov.pk); Dawn (Aug 9, 2026).',
      },
      editorialTable: {
        kicker: 'PART I & XIV · FOURTEEN MINERAL OCCURRENCES & SIX GEOLOGICAL CONFIDENCE TIERS',
        caption:
          'Documented mineral occurrences across Gilgit-Baltistan paired with the six geological classification tiers separating occurrences from mineable reserves.',
        headers: [
          'Mineral Resource or Geological Tier',
          'Reported Geographical Occurrence or Technical Meaning',
        ],
        rows: [
          ...GB_MINERAL_OCCURRENCES_14.map(
            (m): [string, string] => [
              m.mineral,
              `${m.reportedOccurrences} — ${m.classificationNote}`,
            ]
          ),
          ...GEOLOGICAL_CONFIDENCE_TIERS_6,
        ],
        footnote:
          'Speculative "billion/trillion-dollar reserve" claims are excluded until independently verified Measured/Indicated and Reserve studies are published.',
      },
    },
    {
      numberRoman: 'I',
      title: 'From Artisanal Tunnels to Excavators: The 2025 Shigar Protests and the 590-Entry Portal Mystery',
      subtitle:
        'Examining the April 27, 2025 mineral-rights demonstrations, the blank public private-leaseholder table, external investment rules, and the 2024 community-royalty amendment.',
      paragraphs: [
        'For generations, gemstone extraction in valleys such as Shigar, Hunza, Nagar, and Haramosh revolved around small-scale local mining, family share arrangements, and hard-won vernacular knowledge of pegmatite pockets—carrying real informal hazards of roof collapse and dust, yet anchored in local livelihoods. Today’s shift toward mechanized excavation introduces far larger capital requirements, river and slope footprints, and external corporate structures—raising the urgent question of whether regulatory capacity and local ownership protections are keeping pace.',
        'In spring 2025, that tension reached the streets. On April 27, 2025, thousands reportedly demonstrated in Shigar against proposed mining legislation, voicing deep concern over customary mineral rights, insufficient public consultation, and the potential transfer of mineral wealth away from local communities—concerns echoed by the Pakistan Gemstone and Minerals Association (PGMA) regarding amended mining concession rules. When our research desk inspected the Gilgit-Baltistan Mines and Minerals Department’s public portal, its government study-area and auctionable-land table listed numbered entries up to 590, whereas opening the associated private leaseholder table displayed no records—a transparency gap underscoring why a geological occurrence list cannot substitute for a public beneficial-ownership, permit, and revenue cadastre.',
        'Equally consequential is a documentary lead in the consolidated Gilgit-Baltistan Mining Concession Rules: whereas earlier text described a community entitlement equal to twice the government royalty (PKR 200 for every PKR 100 in government royalty), a recorded 2024 amendment sets the community share at 30 percent of government royalty (PKR 30 per PKR 100)—an illustrative 85 percent reduction relative to the earlier formula if applied to comparable leases on an unchanged royalty base (subject to visual authentication of original gazettes and transitional clauses). Meanwhile, departmental rules expressly invite domestic Pakistani companies and foreign joint ventures—including Chinese and other international commercial interest—requiring verified contract-by-contract scrutiny rather than ideological assumptions.',
      ],
      pullQuote: {
        quote: WEALTH_BENEATH_MOUNTAINS_SPEC.portalPrincipleQuote,
        attribution:
          'Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage',
        context: 'Section VI · Forensic Inspection of the Official Mining Registry',
      },
      editorialTable: {
        kicker: 'PART III, IV & VII · EXTRACTION TRANSITION, 2025 GRIEVANCES & INVESTMENT ACTORS',
        caption:
          'Structural shift from artisanal to mechanized mining alongside April 2025 stakeholder concerns and commercial participant categories.',
        headers: [
          'Analytical Dimension or Stakeholder Category',
          'Contrast, Required Documentary Audit, or Governance Question',
        ],
        rows: [
          ...TRADITIONAL_VS_INDUSTRIAL_EXTRACTION_6,
          ...SHIGAR_2025_CONTROVERSY_AUDIT_7,
          ...EXTERNAL_INVESTMENT_PARTICIPANTS_7,
        ],
        footnote:
          'Test community royalty formulas (PKR 200 vs. PKR 30) and regional value-retention scenarios interactively in the Extractive Governance Workbench in Chapter IV.',
      },
    },
    {
      numberRoman: 'II',
      title: 'Value Leakage Abroad—and Environmental Destabilization Along the Upper Indus',
      subtitle:
        'How rough gemstones leave at low prices while August 2026 GB-EPA warnings flag mechanized placer gold mining threatening rivers, banks, bridges, and Diamer-Basha inflows.',
      paragraphs: [
        'Gilgit-Baltistan’s own Mines and Minerals Department candidly identifies a core structural loss: locally mined gemstones are overwhelmingly sold in rough, uncut form to outside buyers at relatively low prices, while sorting, precision cutting, laboratory certification, jewellery manufacturing, and international luxury retail capture the overwhelming share of final commercial value elsewhere. Without domestic lapidary centres, gemmological laboratories, accredited certification, and local enterprise equity, mountain communities bear underground physical risk while capturing only the thinnest rung of the value ladder.',
        'At the same time, riverine extraction is already alarming regulators. On August 9, 2026, Dawn reported warnings from the Gilgit-Baltistan Environmental Protection Agency (GB-EPA) over rapidly expanding mechanized placer gold mining along regional rivers—identifying environmental noncompliance, heavy riverbed and bank excavation, threats to bridges and riverside farmland, and downstream sedimentation concerns extending to the developing Diamer-Basha Dam. Excavating active glacier-fed channels alters thalweg geometry, incises riverbeds, undercuts agricultural terraces, and mobilizes fine sediment across the Upper Indus drainage system.',
        'Beyond physical scour, mineralized rock excavation demands rigorous hydrochemical surveillance across ten potential water contaminants—from suspended solids, arsenic, lead, cadmium, and dissolved copper to petroleum leaks and Acid Mine Drainage (AMD) where exposed sulfide minerals such as pyrite oxidize in air and water (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺), lowering pH and mobilizing toxic metals long after a mine closes. Scientific integrity requires paired upstream-and-downstream water testing before attributing contamination—and strictly prohibits alleging mercury or cyanide pollution unless chemical use or analytical detection is proven.',
      ],
      editorialTable: {
        kicker: 'PART V, VIII & IX · PLACER GOLD RIVER SCOUR, VALUE CHAIN & WATER CONTAMINANTS',
        caption:
          'Geomorphological impacts of mechanized river gold mining, six stages of gemstone value capture, and Upper Indus hydrochemical monitoring priorities.',
        headers: [
          'Disturbance, Value Stage or Contaminant',
          'Hydrological, Economic or Ecotoxicological Consequence',
        ],
        rows: [
          ...PLACER_GOLD_RIVER_DISTURBANCES_8,
          ...GEMSTONE_VALUE_CHAIN_6,
          ...WATER_POLLUTION_CONTAMINANTS_10.slice(0, 6),
        ],
        footnote:
          'All 10 water-quality parameters—including pyrite oxidation stoichiometry and strict mercury/cyanide evidentiary rules—are detailed in Monograph 16 Volume IX.',
      },
    },
    {
      numberRoman: 'III',
      title: 'Tectonic Slopes, Iconic National Parks and the Human Beings Who Enter the Mine',
      subtitle:
        'Screening concessions against Karakoram multi-hazards, CKNP/Khunjerab/Deosai/Qurumber wildlife sanctuaries, and unrecorded underground occupational risks.',
      paragraphs: [
        'Mining in Gilgit-Baltistan unfolds across some of Earth’s steepest, most tectonically fractured, and glacier-draped slopes. Bench cuts, unbuttressed haulage roads, portal blasting, toe removal, and unengineered waste-rock piles can destabilize moraine and talus slopes—potentially compounding cloudburst debris flows or glacial lake outburst floods (GLOFs). While project assessments must distinguish localized blasting vibrations and rockbursts from natural tectonic earthquakes (which ordinary mining does not inherently trigger), evaluating concessions in isolation from the region’s multi-hazard environment invites preventable disaster.',
        'Equally irreplaceable is Gilgit-Baltistan’s living conservation heritage—anchored by Central Karakoram National Park, Khunjerab National Park, Deosai National Park, and Qurumber National Park, home to the snow leopard, Himalayan brown bear, Markhor, Himalayan ibex, Marco Polo sheep, musk deer, cold-water fishes, and fragile alpine cushion flora. Every exploration licence and mining lease requires exact polygon comparison against protected areas, wildlife corridors, glaciers, springs, and villages before a single track is bulldozed.',
        'Above all, no showroom valuation is honest if it erases the human beings entering freezing, high-altitude adits. Unsupported tunnel roofs, rockfalls, respirable crystalline silica dust (silicosis), explosives accidents, oxygen-poor shafts, extreme cold, hours-long cliff evacuations, informal share labour without disability cover, child-labour risks, and unrecorded fatalities must be audited with the same rigour as carat weights and export earnings.',
      ],
      plate: {
        imageUrl: '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
        caption:
          'Steep, fractured high-mountain valley walls and talus aprons—illustrating why bench excavation, blasting, haul-road cutting, and spoil disposal in Gilgit-Baltistan require integrated slope-stability and cryosphere hazard screening (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
        credit: 'Kashmir EcoWatch Visual Archive',
        aspect: 'wide',
      },
      editorialTable: {
        kicker: 'PART X, XII & XIII · GEOTECHNICAL HAZARDS, WILDLIFE BUFFERS & MINER SAFETY',
        caption:
          'Slope-stability interactions, protected-species sensitivities, and underground occupational safety investigations required across Gilgit-Baltistan.',
        headers: [
          'Slope Activity, Species or Occupational Hazard',
          'Potential Consequence or Required Forensic Investigation',
        ],
        rows: [
          ...GEOLOGICAL_SLOPE_HAZARDS_9.slice(0, 5),
          ...PROTECTED_AREAS_AND_WILDLIFE_10.slice(0, 6),
          ...OCCUPATIONAL_MINING_HAZARDS_10.slice(0, 6),
        ],
        footnote:
          'Zero protected-area overlap or species loss is claimed without verified concession polygons and field camera-trap / habitat data.',
      },
    },
    {
      numberRoman: 'IV',
      title: 'Twin Balance Sheets, Fifteen Open Questions & the 20-Gate Mineral Integrity Protocol',
      subtitle:
        'Auditing local value retention, mapping twelve accountable institutions (1947–2026), and expanding KEW’s Mining & Extraction Intelligence with an 18-registry Gilgit-Baltistan Observatory.',
      paragraphs: [
        'Every extractive project produces two ledgers whether companies publish the second one or not: an Economic Benefit Ledger (sales, government and community royalties, local wages, processing value-add) and an Environmental & Social Liability Ledger (excavated land, eroded riverbanks, lost orchards, contaminated water, silicosis, slope instability, and post-closure cleanup debt). In a simplified illustrative scenario where annual mineral sales equal PKR 100 crore, if 15 percent of economic value is retained locally (PKR 15.0 crore vs. PKR 85.0 crore flowing to external costs, equipment, intermediaries, and profits) while uncompensated local environmental and agricultural damages reach PKR 10.0 crore, net local benefit shrinks to just PKR 5.0 crore—demonstrating why audited local value retention and upfront closure bonds are indispensable.',
        'Tracing regulatory responsibility from pre-1947 customary stewardship through the 2024–2026 controversies engages twelve distinct institutions—from the GB Mines and Minerals Department, GB-EPA, FWEGB, Revenue authorities, and the GB Legislative Assembly to federal ministries, the Geological Survey of Pakistan, PMDC, the Auditor-General, mining firms, district administrations, and community bodies. Until fifteen foundational public-interest questions are answered with authenticated records, society cannot verify whether mineral extraction serves Gilgit-Baltistan’s people.',
        'To establish a transparent scientific benchmark, we propose the twenty-gate Mineral Extraction Integrity Protocol (GB-MEIP-20)—requiring CRIRSCO resource proof, EITI beneficial-ownership disclosure, customary-rights protection, park and GLOF exclusions, AMD prevention, miner insurance, fair community royalties, local value-addition, and bank-guaranteed escrow reclamation bonds—paired permanently with Monograph 16 (18 Volumes · 108 Proposed Chapters) and the 18-registry Gilgit-Baltistan Mineral Extraction & Environmental Accountability Observatory integrated into Kashmir EcoWatch’s Mining & Extraction hub (/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory).',
      ],
      editorialTable: {
        kicker: 'PART XVIII & XIX · FIFTEEN UNANSWERED QUESTIONS & TWENTY INTEGRITY GATES',
        caption:
          'Core public-accountability questions confronting mineral governance in Gilgit-Baltistan paired with proposed pre-licensing gates under GB-MEIP-20.',
        headers: [
          'Question / Integrity Gate',
          'Required Public Disclosure or Mandatory Assessment Standard',
        ],
        rows: [
          ...FIFTEEN_UNANSWERED_QUESTIONS_GB.slice(0, 8).map(
            ([n, q]): [string, string] => [`Question ${n}`, q]
          ),
          ...MINERAL_INTEGRITY_PROTOCOL_20.slice(0, 10),
        ],
        footnote:
          'Explore all 15 questions, all 20 Integrity Protocol gates, the 12-institution accountability chain, and the interactive Value-Retention & Royalty Calculator immediately below.',
      },
    },
    {
      numberRoman: 'EPILOGUE',
      title: 'The Mountains May Be Rich. Will Their People Share That Wealth?',
      subtitle:
        'Participating not merely as labourers in dangerous tunnels, but as informed owners, scientists, gemmologists, and stewards of a living mountain homeland.',
      paragraphs: [
        'Gilgit-Baltistan possesses extraordinary natural endowments: glaciers that sustain the Indus, gorges that generate electricity, peaks and high plains that draw the world’s admiration, and geological formations rich in gemstones and metals. Yet geographical possession of natural wealth never automatically guarantees prosperity for the communities living upon it.',
        'A gemstone can leave Shigar or Hunza as low-priced rough crystal and reappear in an overseas showroom at many times what its miner earned. A river can yield alluvial gold while eroding the riverside fields that fed a family for generations. A mining lease can generate short-term commercial turnover across two decades while leaving fractured slopes, waste rock, or acidic seepage across centuries.',
        'The goal of scientific journalism is not to demand a blanket prohibition on every form of mineral enterprise. It is to insist that extraction proceed only where geological stability, water purity, wildlife sanctuaries, worker safety, customary community rights, and fair regional value capture are demonstrably secured—so the people of Gilgit-Baltistan participate not merely as labourers extracting rough rock, but as scientists, gemmologists, engineers, enterprise owners, and decision-makers shaping their own future.',
      ],
      pullQuote: {
        quote: WEALTH_BENEATH_MOUNTAINS_SPEC.closingEpilogueQuestion,
        attribution:
          'Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage',
        context: 'Epilogue · The Wealth Beneath the Mountains',
      },
      fieldNote: {
        label: 'REGIONAL BYLINE GOVERNANCE & RESEARCH LIMITATIONS',
        detail: `${WEALTH_BENEATH_MOUNTAINS_SPEC.researchLimitationsNote}`,
      },
    },
  ],
  documentarySources: [
    ...GB_MINERAL_EXTERNAL_DATA_SOURCES_12.map((ds) => ({
      label: ds.source,
      url: ds.url,
      relevance: ds.application,
    })),
    {
      label:
        'KEW Gilgit-Baltistan Mineral Extraction & Environmental Accountability Observatory (18 Registries)',
      url: '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory',
      relevance:
        'Dedicated Gilgit-Baltistan extractive-intelligence expansion inside KEW’s Mining & Extraction module (/earth-human-impact/mining-extraction).',
    },
  ],
  editorialMetadataTable: [
    { attribute: 'Publication', assignment: 'Himalayan Dispatch' },
    {
      attribute: 'Volume / Edition Placement',
      assignment:
        'Vol. 01 / No. 01 · Immediately after "The Price of Power" and before "The Western Himalayas Are Sitting on a Time Bomb" (Dispatch 24 in 35-Dispatch Architecture)',
    },
    {
      attribute: 'Investigation Rubric',
      assignment:
        'Special Geological & Environmental Investigation · Mineral Resource Governance · Extractive Economics · Environmental Justice · Geopolitical Interests',
    },
    {
      attribute: 'Byline (Pre-Correspondent Desk)',
      assignment:
        'Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage (Geological Sciences, Extractive Economics and Mineral Resource Governance)',
    },
    {
      attribute: 'Editorial Oversight',
      assignment:
        'Dr. Fayaz Ahmad Khan, Founding Editor-in-Chief (Personal byline omitted; reserved for future Gilgit-Baltistan Bureau correspondent upon genuine local contribution)',
    },
    {
      attribute: 'Dateline / Scope',
      assignment: 'Gilgit-Baltistan · Karakoram · Upper Indus Basin · Western Himalayas',
    },
    {
      attribute: 'Companion Monograph',
      assignment:
        'Monograph 16 — The Wealth Beneath the Mountains (18 Thematic Volumes · 108 Proposed Research Chapters)',
    },
    {
      attribute: 'Proposed Governance Standard',
      assignment:
        '20-Gate Mineral Extraction Integrity Protocol (GB-MEIP-20)',
    },
    {
      attribute: 'Permanent KEW Integration',
      assignment:
        'Gilgit-Baltistan Mineral Extraction & Environmental Accountability Observatory (18 Registries · /earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory)',
    },
    {
      attribute: 'Publication Gate Status',
      assignment: 'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
    },
  ],
  corrections: [],
  relatedKewModule: {
    label: 'Open KEW Gilgit-Baltistan Mineral Extraction Observatory (18 Registries)',
    href: '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory',
    scientificContext:
      'Expanded directly inside KEW’s Mining & Extraction Intelligence architecture (/earth-human-impact/mining-extraction), connecting satellite change detection, hydrochemistry, and multi-hazard screening.',
  },
  seoKeywords: [
    'Gilgit Baltistan Mineral Resources Extraction Ownership Himalayan Dispatch',
    'The Wealth Beneath the Mountains Shigar 2025 Mining Protest PGMA',
    'Gilgit Baltistan Placer Gold Mining Indus River GB EPA Dawn 2026',
    'GB Mining Concession Rules Community Royalty 2024 Amendment',
    'Karakoram Gemstones Aquamarine Ruby Hunza Shigar Shengus Pegmatite',
    'Mineral Extraction Integrity Protocol Kashmir EcoWatch Observatory',
  ],
};
