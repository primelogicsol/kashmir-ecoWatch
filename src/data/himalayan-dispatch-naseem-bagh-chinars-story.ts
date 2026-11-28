// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · DISPATCH 11 (OF 33)
// SPECIAL HISTORICAL & ECOLOGICAL INVESTIGATION · LIVING HERITAGE ·
// ACADEMIC INSTITUTIONAL ACCOUNTABILITY · LANDSCAPE TRANSFORMATION · URBAN ECOLOGY
//
// "THE CHINARS IN THE SHADOW OF CONCRETE"
// Subtitle: "Naseem Bagh: When an Institution of Higher Learning Expands Within
//            a Landscape of Living Heritage"
//
// Positioned at Dispatch 11 immediately after Dispatch 10 ("The National Park
// That Became a Golf Course") and immediately before Dispatch 12 ("An Elegy for
// Winter"), paired with Companion Monograph 14 (12 Thematic Volumes · 72 Chapters)
// and KEW's Naseem Bagh Living Heritage & Campus Ecology Observatory.
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';
import {
  CONFLICT_INSTITUTIONAL_SEQUENCE_5,
  CONSTRUCTION_ROOT_STRESSORS_12,
  HERITAGE_LOSS_INDICATORS_14,
  HERITAGE_PARK_COMMITMENT_AUDIT_7,
  KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5,
  NASEEM_BAGH_CHINAR_CENSUS_DISCREPANCY_7,
  NASEEM_BAGH_CHINARS_SPEC,
  NASEEM_BAGH_CHRONOLOGY_13,
  NASEEM_BAGH_INFRASTRUCTURE_CASES_9,
  NASEEM_BAGH_PRIMARY_SOURCES_10,
  NASEEM_BAGH_RECOVERY_PROTOCOL_15,
  REQUIRED_LEGAL_AND_UNIVERSITY_DOCUMENTS_12,
  UOK_DISCIPLINARY_INTROSPECTION_11,
  UOK_MAIN_CAMPUS_LAND_USE_2021_22,
  UOK_REPORTED_TOTAL_CAMPUS_AREA_HA,
} from './himalayan-dispatch-naseem-bagh-chinars-monograph';

export const THE_CHINARS_IN_THE_SHADOW_OF_CONCRETE_STORY: MagazineStory = {
  id: 'hd-story-naseem-bagh-chinars',
  slug: 'the-chinars-in-the-shadow-of-concrete',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'field-reports', 'editorials'],
  departmentRubric:
    'SPECIAL HISTORICAL & ECOLOGICAL INVESTIGATION · LIVING HERITAGE · ACADEMIC ACCOUNTABILITY · LANDSCAPE TRANSFORMATION',
  folioCode: '11 / SPECIAL HISTORICAL & ECOLOGICAL INVESTIGATION · MONOGRAPH 14',
  title: 'The Chinars in the Shadow of Concrete',
  subtitle:
    'Naseem Bagh: When an Institution of Higher Learning Expands Within a Landscape of Living Heritage',
  excerpt:
    'Laid out overlooking Dal Lake in the Mughal era of Akbar and Shah Jahan, Naseem Bagh is one of Kashmir’s oldest designed Chinar landscapes—and today sits inside an institution that teaches botany, environmental science, remote sensing, geography, and law. Tracing the University of Kashmir’s own Institutional Calendar (696 Chinars) and 2021–22 Environmental Audit (~700 Chinars; 74.66 ha main-campus inventory) alongside 2007–2026 construction controversies, root-zone soil science, and the J&K Preservation of Specified Trees Act, 1969, this investigation asks whether academic advancement can be reconciled with living botanical heritage.',
  dateline: 'NASEEM BAGH · HAZRATBAL · DAL LAKE WESTERN SHORE · SRINAGAR',
  region: 'Naseem Bagh · Hazratbal · Srinagar · Kashmir Valley',
  readingTimeMinutes: 31,
  wordCount: 7480,
  proseWordCount: 5640,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/env-monitoring/naseem-bagh-chinar-gis.jpg',
  heroCaption:
    'Mature Kashmir Chinar (Platanus orientalis) avenues and canopy geometry representative of Srinagar’s historic Naseem Bagh cultural landscape—where four centuries of living Mughal arboriculture encounter contemporary campus construction, soil sealing, and root-zone disturbance (Illustrative archival plate, not matched-date change-detection proof — Kashmir EcoWatch Visual Archive).',
  heroCredit: 'Kashmir EcoWatch Visual Archive',
  journalistSlug: 'dr-fayaz-ahmad-khan',
  bylineDisplay:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Living Heritage, Botanical Sciences, Geospatial Intelligence and Academic Accountability Desk',
  bylineRole:
    'Special Historical & Ecological Investigation · Companion to Monograph 14 (12 Volumes · 72 Chapters) & KEW Naseem Bagh Living Heritage Observatory',
  factCheckedBy:
    'Stage 04 Documentary Audit Completed Against UoK 2021–22 Green Audit (p. 23), UoK Institutional Calendar, 1969 Specified Trees Act & 2010–2026 Reporting · Himalayan Dispatch Desk',
  scientificReviewer:
    'Internal KEW Arboricultural Biomechanics (BS 5837 RPA), Rhizosphere Soil Physics & Geospatial Canopy Audit Completed · Independent Field Tomography & Permit Authentication Ongoing',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl:
    '/himalayan-dispatch/issues/monograph-14-the-chinars-in-the-shadow-of-concrete',
  supplementaryDatasetLabel:
    'Open Monograph 14: The Chinars in the Shadow of Concrete (12 Thematic Volumes · 72 Proposed Chapters)',
  reportingBeatSlug: 'urban-ecology-heritage-landscapes',
  reportingBeatLabel:
    'Living Botanical Heritage, Campus Arboriculture & Academic Institutional Accountability',
  seoTitle:
    'The Chinars in the Shadow of Concrete — Naseem Bagh & Academic Accountability | Himalayan Dispatch',
  publicationStatusNote:
    'Stage 08 · Pre-Release Historical & Ecological Investigation Awaiting Administrator Approval',
  editorialVerificationNote: NASEEM_BAGH_CHINARS_SPEC.researchLimitationsNote,
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Cross-checked against the University of Kashmir 2021–22 Environmental Audit (including p. 23 Table 6 inventory and 74.66 ha main-campus land-use breakdown), UoK Institutional Calendar (696 Chinars and departmental relocation statement), Kashmir Life Feb 2011 (22 trees cut; Prof. B. A. Wafai 2007 guest-house statement; Zareef Ahmad Zareef ~20 root-damaged trees allegation), INTACH Kashmir (Saleem Beg 16+ Hamzah Guest House trees), Outlook India Sept 2023, Daily Excelsior May 2024, Mongabay Sept 2024, Kashmir Observer Nov 13, 2026, Greater Kashmir Nov 17, 2026, and J&K Preservation of Specified Trees Act, 1969.',
    scientificNote:
      'Enforces strict non-subtraction between Mughal planting estimates (1,200+; 992) and modern counts (~700; 696; 710), strict non-addition between potentially overlapping 22 and 16+ tree-removal reports, separation of 74.66 ha main-campus inventory from Naseem Bagh proper, and BS 5837 / ISA Root Protection Zone biomechanics.',
    ethicsAndVisualNote:
      'Labels reference plates transparently as illustrative rather than matched-date change detection, presumes zero statutory illegality prior to Section 3 permit inspection, credits faculty conservation efforts, and guarantees formal Right of Response to the University of Kashmir.',
    adminHoldNote:
      'Stage 08 Pre-Release Flagship Investigation staged on localhost for Founding Administrator review.',
  }),
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'Four Centuries of Living Heritage—and an Institutional Contradiction',
      subtitle:
        'What happens when an institution that teaches ecology, botany, geography, remote sensing, and environmental law expands inside one of Kashmir’s oldest Mughal Chinar gardens?',
      dateline: 'NASEEM BAGH · DAL LAKE WESTERN TERRACE · HAZRATBAL · SRINAGAR',
      paragraphs: [
        'Positioned immediately after our investigation into Srinagar’s Sálim Ali National Park, Naseem Bagh confronts Kashmir with an even more intimate institutional paradox: the responsibility of an institution of higher learning that teaches environmental science, botany, geography, remote sensing, and conservation law toward the four-century living heritage entrusted to its own campus. Associated with the Mughal reigns of Akbar (1586) and Shah Jahan (1635), Naseem Bagh—"the Garden of Morning Breeze" beside Dal Lake—was conceived long before a modern university existed as an integrated cultural and ecological design: ordered Chinar avenues, continuous summer shade, permeable meadow ground, open sightlines to the lake, and centuries-old trees functioning as one living landscape.',
        'Protecting isolated tree trunks while progressively filling the open garden around them with multi-storey academic blocks, guest houses, hostels, stadiums, asphalt roads, and utility trenches does not preserve a historical garden. This inquiry is grounded not in nostalgia, but in a recurring documentary record spanning multiple university administrations—from 2007 guest-house excavations and 2008 heritage-park announcements to 2010–2011 felling reports, the university’s own 2021–22 Environmental Audit, May 2024 rubble dumping, September 2024 stadium pressures, a Chinar falling onto a newly built Institute of Music and Fine Arts block in 2025–26, and fresh November 2026 calls by the Environmental Policy Group for an independent inquiry into campus heritage trees.',
        'Rigorous science begins with strict arithmetic honesty. Historical planting traditions associating 1,200+ Chinars (or a 992-tree historical account cited in 2011) with Naseem Bagh cannot be subtracted from contemporary university figures (~700 in the 2021–22 audit; 696 in the Institutional Calendar) to claim construction-caused loss without accounting for four centuries of natural mortality, replacements, and boundary shifts. Likewise, the 22 Chinars reported cut in 2011 and the 16+ mature Chinars cited by INTACH Kashmir’s Saleem Beg at Hamzah Guest House may overlap and must never be summed without incident-level verification.',
      ],
      commemorationLedger: {
        heading:
          'DOCUMENTED NASEEM BAGH EVIDENCE BASELINES · STRICT NON-SUBTRACTION & NON-ADDITION PROTOCOL',
        items: [
          {
            label: 'Historical Mughal Garden Planting Estimate',
            figure: '1,200+',
          },
          {
            label: 'UoK Environmental Audit (2021–22) / UniCal',
            figure: '~700 / 696',
          },
          {
            label: '2011 Reported Cut / Hamzah Account (Unverified Overlap)',
            figure: '22 / 16+',
          },
        ],
        methodologicalNote:
          'Historical planting estimates (1,200+; 992) and contemporary counts (~700; 696; 710) cannot be directly subtracted to establish construction-related tree loss; similarly, the reported 22 (2011) and 16+ (Hamzah Guest House) felled trees may overlap and are never added without primary verification.',
        sourceNote:
          'Sources: DIQA UoK Environmental Audit 2021–22 (p. 23); UoK Institutional Calendar; Kashmir Life (Feb 2011); INTACH Kashmir statements.',
      },
      pullQuote: {
        quote: NASEEM_BAGH_CHINARS_SPEC.landscapeAxiom,
        attribution:
          'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Living Heritage & Botanical Sciences Desk',
        context: 'Section II · Four Centuries of Living Heritage',
      },
    },
    {
      numberRoman: 'I',
      title: 'The Heritage Park That Continued to Receive Concrete (1586–November 2026)',
      subtitle:
        'From the Institutional Calendar’s pledge to shift departments out of Naseem Bagh to nine categories of modern concrete expansion and the 2007–2011 conflict-displacement rationale.',
      paragraphs: [
        'Few institutional documents frame the Naseem Bagh contradiction more starkly than the University of Kashmir’s own historical Institutional Calendar, which records 696 Chinar trees and explicitly states that several academic departments were shifted from Naseem Bagh to the main Hazratbal campus specifically to facilitate Naseem Bagh’s development as a heritage garden. In March 2008, university authorities again announced plans for heritage protection—and in 2021–22, the university’s Environmental Audit reiterated plans to develop Naseem Bagh as a Chinar heritage park.',
        'Yet a proposed heritage park is not a legally notified, boundary-demarcated, and professionally governed heritage park. In January 2010, reporting documented two Chinars felled shortly after heritage-park announcements; in February 2011, Kashmir Life documented continuing construction and 22 Chinars cut; in September 2023, Outlook India examined concrete encroachment on Mughal garden character; in May 2024, Daily Excelsior reported construction waste dumped inside Naseem Bagh; and in September 2024, Mongabay-India highlighted further construction pressures including an indoor stadium. Across Distance Education, Hamzah Guest House, the Law Department, student hostels, the indoor stadium, the Institute of Music and Fine Arts, internal roads/parking, staff quarters, and subsurface utilities, incremental building decisions repeatedly outpaced formal heritage zoning.',
        'History also requires examining how wider political conflict entered campus land-use decisions. In February 2011, Professor B. A. Wafai, then associated with the university’s Landscape Division, explained that constructing a new guest house—begun in 2007—had become necessary because the university’s earlier guest accommodation was occupied by security forces, within the same report recording activist Zareef Ahmad Zareef’s allegation that excavations had damaged the roots of roughly 20 Chinars. That record does not prove conflict caused every transformation in Naseem Bagh, but it documents how conflict-linked facility displacement was invoked to place permanent concrete inside an irreplaceable heritage grove—raising the vital question of whether non-heritage alternative sites were rigorously assessed.',
      ],
      editorialTable: {
        kicker: 'PART III, IV & V · CHRONOLOGY OF TRANSFORMATION & NINE INFRASTRUCTURE FILES',
        caption:
          'Documented timeline from Mughal establishment through November 2026, paired with campus developments requiring primary site-selection and permit verification.',
        headers: [
          'Period or Campus Infrastructure',
          'Documented Event or Principal Forensic Question',
        ],
        rows: [
          ...NASEEM_BAGH_CHRONOLOGY_13.map(
            (c): [string, string] => [c.period, `${c.documentedDevelopment} (${c.sourceBasis})`]
          ),
          ...NASEEM_BAGH_INFRASTRUCTURE_CASES_9.map(
            (inf): [string, string] => [
              `Audit File · ${inf.infrastructure}`,
              `${inf.principalQuestion} — Focus: ${inf.arboriculturalAndHeritageFocus}`,
            ]
          ),
        ],
        footnote:
          'Also audited in Monograph 14: 7 Heritage Park Commitment tests (Part IV) and 5 Conflict-to-Expansion institutional mechanisms (Part VI).',
      },
    },
    {
      numberRoman: 'II',
      title: 'Inside the University’s Own Environmental Audit—and the Chinar Census Discrepancy',
      subtitle:
        'Why 74.66 hectares of main-campus land use must be separated from Naseem Bagh proper, and why stable tree counts never prove that ancient canopy survived.',
      paragraphs: [
        'Institutional accountability is strongest when anchored in the institution’s own scientific work. Prepared with contributions from university departments, the 2021–22 Environmental Audit explicitly recognizes that campus green spaces face mounting pressure from infrastructure expansion. Its published land-use table reports 74.66 hectares of total main-campus area—comprising parks (34.89 ha), green spaces (15.04 ha), built-up area (9.97 ha), playgrounds (7.59 ha), roads (6.03 ha), and vehicle parking (0.88 ha). Crucially, however, those figures describe the reported main-campus inventory rather than Naseem Bagh as an independent historical parcel—making a dedicated cadastral and multi-temporal land-use reconstruction of Naseem Bagh essential.',
        'Equally instructive is the variation across Chinar numbers inside institutional and historical records: 992 in a historical account cited in 2011; 718 in an official’s initial inventory; 696 after the removal of 22 trees (matching the Institutional Calendar); "approximately 700" in Naseem Bagh in the 2021–22 audit text; 710 across the reported campus inventory in Table 6 (page 23); and "more than 500" in Naseem Bagh in the audit’s summary. Divergent phrasing does not prove bad faith, but it underscores the urgent necessity of a unified, individually georeferenced census.',
        'Above all, arboricultural science warns against tree-count complacency: a stable or rising stem count achieved by planting young saplings cannot substitute for the crown volume, microclimatic cooling, mycorrhizal soil web, hollow-cavity fauna habitat, carbon stock, or four-century cultural memory of a veteran Mughal Chinar. Nor should the historical vernacular huts and modest structures of Naseem Bagh be overlooked—replacing low-slung structures adaptable for reuse with tall, deep-foundation concrete blocks transforms the entire spatial identity of the garden.',
      ],
      editorialTable: {
        kicker: 'PART VII · UOK 2021–22 LAND-USE INVENTORY & SEVEN CHINAR CENSUS BENCHMARKS',
        caption:
          'Published main-campus land-use categories (74.66 ha reported total, distinct from Naseem Bagh standalone area) alongside historical and institutional Chinar enumerations.',
        headers: [
          'Land-Use Category or Census Source',
          'Reported Figure & Methodological Interpretation',
        ],
        rows: [
          ...UOK_MAIN_CAMPUS_LAND_USE_2021_22.map(
            (lu): [string, string] => [
              `Main Campus · ${lu.category}`,
              `${lu.areaHa.toFixed(2)} hectares (${lu.shareOfReportedTotalPct}% of ${UOK_REPORTED_TOTAL_CAMPUS_AREA_HA} ha reported main-campus total — separate Naseem Bagh boundary audit required)`,
            ]
          ),
          ...NASEEM_BAGH_CHINAR_CENSUS_DISCREPANCY_7.map(
            (cr): [string, string] => [
              `Census · ${cr.source}`,
              `${cr.reportedChinars} — ${cr.scopeAndCaveat}`,
            ]
          ),
        ],
        footnote:
          'Visual verification performed on page 23 (Table 6) of the 2021–22 DIQA Green Audit; individual age/girth class stratification remains publicly unverified.',
      },
    },
    {
      numberRoman: 'III',
      title: 'The Invisible Destruction Underground—and the Contradiction of Tree Safety',
      subtitle:
        'How concrete slabs, trenches, and soil compaction kill veteran Chinars over decades—and why placing buildings inside mature tree fall zones manufactures "safety hazards".',
      paragraphs: [
        'Felled trunks draw headlines; rhizosphere suffocation kills quietly over twenty years. Around a centuries-old Platanus orientalis whose Girth at Breast Height exceeds four to five metres, absorbing feeder roots and structural buttress plates radiate far beyond the visible trunk—internationally codified under British Standard BS 5837:2012 and ISA arboricultural guidelines as a minimum Root Protection Radius of twelve times trunk diameter (and fifteen times diameter for ancient veteran trees). When foundations sever structural roots, heavy machinery compacts alluvial garden soil above 1.6 g/cm³ bulk density, alkaline mortar rubble alters soil pH, asphalt seals off oxygen and rainwater infiltration, and utility trenches repeatedly slice root zones, a standing Chinar enters slow carbohydrate starvation and heartwood fungal decay (Inonotus, Ganoderma)—appearing alive when the ribbon is cut on a new building, only to suffer crown dieback or windthrow years later.',
        'That biological reality illuminates the campus safety controversy of 2025–2026. Defending tree-pruning interventions in November 2026—amid separate calls from the Environmental Policy Group for an independent inquiry into the cutting/pruning of century-old sweet chestnut trees—university officials pointed to an earlier incident in which a Chinar fell onto a newly constructed block of the Institute of Music and Fine Arts. Protecting students, faculty, and staff from falling limbs is an indisputable duty. Yet the sequence poses an inescapable planning question: why was a new academic building sited close enough to mature heritage Chinars—potentially encroaching on their root stability zones and target fall radii—that four-hundred-year-old trees subsequently became classified as threats to the building?',
        'Reconciling human safety with living heritage requires pre-construction arboricultural setbacks, sonic tomography cavity diagnostics, dynamic crown cabling, and snow-load pruning standards—never constructing right beside veteran trees and blaming the trees afterward.',
      ],
      editorialTable: {
        kicker: 'PART VIII & X · TWELVE ROOT-ZONE STRESSORS & FOURTEEN LANDSCAPE-LOSS METRICS',
        caption:
          'Subsurface biological mechanisms of construction-induced Chinar decline paired with quantitative indicators for forensic reconstruction.',
        headers: [
          'Construction Stressor or Scientific Indicator',
          'Biological Consequence or Required Forensic Measurement',
        ],
        rows: [
          ...CONSTRUCTION_ROOT_STRESSORS_12.slice(0, 8),
          ...HERITAGE_LOSS_INDICATORS_14.slice(0, 8),
        ],
        footnote:
          'Model BS 5837 Root Protection Radii, Root Protection Areas (m²), and building fall-zone conflicts interactively in the Arboricultural Workbench in Chapter IV.',
      },
      plate: {
        imageUrl: '/images/env-monitoring/kashmir-chinar-hero.jpg',
        caption:
          'Canopy architecture of mature Kashmir Chinars (Platanus orientalis)—whose structural stability and centuries-long survival depend on unsealed, uncompacted root protection zones extending well beyond the trunk flare (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
        credit: 'Kashmir EcoWatch Visual Archive',
        aspect: 'wide',
      },
    },
    {
      numberRoman: 'IV',
      title: 'Statutory Law, Eleven Academic Mirrors, and the Naseem Bagh Recovery Protocol',
      subtitle:
        'Auditing Section 3 of the 1969 Specified Trees Act, inviting eleven university disciplines to examine their own campus, and launching KEW’s 12-registry Living Heritage Observatory.',
      paragraphs: [
        'Kashmir’s Chinars do not stand outside statutory law. Under the Jammu and Kashmir Preservation of Specified Trees Act, 1969 (Section 3), felling a specified tree requires prior statutory permission from the prescribed authority—and the statutory definition of "fell" extends beyond cutting down a trunk to encompass burning, girdling, lopping, polling, or damaging a tree in ways that destroy its survival, reinforced by reserved-tree revenue rules and the March 2009 government restriction on Chinar felling and lopping. In strict adherence to evidentiary fairness, Himalayan Dispatch declares no individual campus removal or pruning unlawful in advance; instead, we specify twelve primary records—from Section 3 permits and Landscape Division ledgers to contractor tree-protection clauses—that must be verified against the exact date of each intervention.',
        'At the same time, the University of Kashmir possesses within its own faculties—Botany, Environmental Science, Geography, Geoinformatics/Remote Sensing, Hydrology, Civil Engineering, Law, History, Economics, Journalism, and University Administration—every scientific and legal tool needed to audit Naseem Bagh. Recognising that individual scholars and departments have contributed to the 2021–22 Green Audit and voiced conservation concerns, our investigation invites the university to exercise formal Right of Response and lead by example—guided by international heritage-campus precedents where historic groves and world-class laboratories thrive side by side without sacrificing ancient trees.',
        'To turn scrutiny into enduring restoration, we propose the fifteen-measure Naseem Bagh Ecological & Heritage Recovery Protocol (NBEHRP-15)—combining an independent Mughal-garden boundary survey, a sensitive-zone concrete moratorium, QR Tree Aadhaar geotagging, sonic tomography, BS 5837 Root Protection Zones, concrete-apron removal, debris remediation, and an endowment-backed Living Heritage Management Plan—supported permanently by Monograph 14 (12 Volumes · 72 Chapters) and Kashmir EcoWatch’s Naseem Bagh Living Heritage & Campus Ecology Observatory (/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory).',
      ],
      pullQuote: {
        quote: NASEEM_BAGH_CHINARS_SPEC.academicResponsibilityQuestion,
        attribution:
          'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Academic Accountability Desk',
        context: 'Section XII · The Educational Institution That Must Examine Itself',
      },
      editorialTable: {
        kicker: 'PART XII, XIII & XV · ACADEMIC INTROSPECTION, LEGAL AUDIT & 15-POINT RECOVERY PROTOCOL',
        caption:
          'Questions posed to the university’s own disciplines paired with core measures of the proposed Naseem Bagh Recovery Protocol.',
        headers: [
          'University Discipline or Recovery Measure',
          'Campus Accountability Question or Conservation Outcome',
        ],
        rows: [
          ...UOK_DISCIPLINARY_INTROSPECTION_11.slice(0, 6),
          ...NASEEM_BAGH_RECOVERY_PROTOCOL_15.slice(0, 9),
        ],
        footnote:
          'Explore all 11 disciplinary mirrors, 12 required statutory documents, 15 Recovery Protocol measures, and the interactive BS 5837 Root-Zone Calculator immediately below.',
      },
    },
    {
      numberRoman: 'EPILOGUE',
      title: 'What Did the Chinars Teach the University?',
      subtitle:
        'Buildings can be constructed elsewhere; four centuries of living continuity cannot be manufactured within an administrative tenure.',
      paragraphs: [
        'The Chinars of Naseem Bagh stood before the university existed. They stood before its departments, lecture halls, laboratories, hostels, and administrative buildings were conceived. Generations of students found shade beneath them; generations of scholars walked among them as they witnessed political transformations, institutional growth, social upheaval, and the intellectual evolution of modern Kashmir.',
        'They asked for no research grants. They required no academic recognition. Their contribution was expressed through shade, avian and soil habitat, microclimatic stability, historical continuity, and the quiet preservation of a living Mughal landscape overlooking Dal Lake.',
        'Buildings can be constructed elsewhere. Academic departments can be relocated—as the university’s own calendar once envisioned. Institutional infrastructure can be redesigned. But the historical and biological continuity embodied in a four-hundred-year-old Chinar cannot be manufactured within the tenure of a university administration. Joining our companion investigations into the Habak Laboratory, Dal Lake’s real-estate encroachment, Sálim Ali National Park, and twenty-five years of Himalayan scholarship, Naseem Bagh asks an institution of higher learning not to choose between education and heritage—but to prove its intellectual maturity by protecting both.',
      ],
      pullQuote: {
        quote: NASEEM_BAGH_CHINARS_SPEC.closingEpilogueLine,
        attribution: 'Dr. Fayaz Ahmad Khan',
        context: 'Epilogue · The Chinars in the Shadow of Concrete',
      },
      fieldNote: {
        label: 'RESEARCH LIMITATIONS, RIGHT OF RESPONSE & PENTAD CONTEXT',
        detail: `${NASEEM_BAGH_CHINARS_SPEC.researchLimitationsNote} Each of Himalayan Dispatch’s five institutional environmental history investigations (${KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5.map((p) => p.investigation).join('; ')}) rests on independent documentary proof rather than assumed equivalence.`,
      },
    },
  ],
  documentarySources: NASEEM_BAGH_PRIMARY_SOURCES_10.map((s) => ({
    label: s.source,
    url: s.url,
    relevance: s.significance,
  })),
  editorialMetadataTable: [
    { attribute: 'Publication', assignment: 'Himalayan Dispatch' },
    {
      attribute: 'Volume / Edition Placement',
      assignment:
        'Vol. 01 / No. 01 · Dispatch 11 of 33 (Immediately after Dispatch 10: "The National Park That Became a Golf Course" and before Dispatch 12: "An Elegy for Winter")',
    },
    {
      attribute: 'Investigation Rubric',
      assignment:
        'Special Historical & Ecological Investigation · Living Heritage · Academic Institutional Accountability · Landscape Transformation · Urban Ecology',
    },
    {
      attribute: 'Byline',
      assignment: NASEEM_BAGH_CHINARS_SPEC.proposedByline,
    },
    {
      attribute: 'Geographical Focus',
      assignment: NASEEM_BAGH_CHINARS_SPEC.geographicScope,
    },
    {
      attribute: 'Companion Monograph',
      assignment:
        'Monograph 14 — The Chinars in the Shadow of Concrete (12 Thematic Volumes · 72 Proposed Research Chapters)',
    },
    {
      attribute: 'Proposed Conservation Framework',
      assignment:
        'Naseem Bagh Ecological & Heritage Recovery Protocol (NBEHRP-15 · 15 Multidisciplinary Measures)',
    },
    {
      attribute: 'Permanent KEW Companion',
      assignment:
        'Naseem Bagh Living Heritage & Campus Ecology Observatory (12 Registries · /environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory)',
    },
    {
      attribute: 'Publication Gate Status',
      assignment: 'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
    },
  ],
  corrections: [],
  relatedKewModule: {
    label: 'Open KEW Naseem Bagh Living Heritage & Chinar Observatory (12 Registries)',
    href: '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory',
    scientificContext:
      'Integrated directly into KEW’s Chinar Monitoring Hub (/environmental-monitoring/chinar-monitoring), Tree Aadhaar Registry, Canopy NDVI, and Legislation Observatory.',
  },
  seoKeywords: [
    'Naseem Bagh Chinars University of Kashmir Concrete Development',
    'The Chinars in the Shadow of Concrete Himalayan Dispatch',
    'Kashmir University Environmental Audit 696 700 Chinars Naseem Bagh',
    'Jammu Kashmir Preservation of Specified Trees Act 1969 Chinar Protection',
    'Root Protection Zone BS 5837 Platanus orientalis Arboriculture Srinagar',
    'Mughal Garden Living Heritage Conservation Hazratbal Dal Lake',
  ],
};
