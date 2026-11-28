// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — CANONICAL EDITORIAL CORPUS & WORKFLOW SPECIFICATION
// Luxury digital environmental periodical within Kashmir EcoWatch
// Note: Conceptual editorial demonstrations clearly distinguished from KEW telemetry
// ─────────────────────────────────────────────────────────────────────────────

import {
  ContributorRoleCategorySpec,
  EditorialBoardMember,
  EditorialCharterCommitment,
  EditorialDepartment,
  EditorialWorkflowStage,
  ForthcomingAssignment,
  JournalistProfile,
  MagazineEdition,
  MagazineStory,
  MastheadPositionRecord,
  MastheadSectionSpec,
  OnboardingLifecycleStepSpec,
  PublicationCalendarMilestone,
} from '@/types/himalayan-dispatch';
import { THE_PRICE_OF_PROTECTING_PARADISE_STORY } from './himalayan-dispatch-price-of-paradise';
import { MONOGRAPH_00_WATERSHED_VOICES_STORY } from './himalayan-dispatch-watershed-voices';
import { STORY_02_MOUNTAINS_SPEAK } from './himalayan-dispatch-stories/story-02-mountains-speak';
import { STORY_03_FORGOTTEN_WATER } from './himalayan-dispatch-stories/story-03-forgotten-water';
import { STORY_04_WILD_WATERS } from './himalayan-dispatch-stories/story-04-wild-waters';
import { STORY_05_FOREST_GUARDIANS } from './himalayan-dispatch-stories/story-05-forest-guardians';
import { STORY_06_ELEGY_WINTER } from './himalayan-dispatch-stories/story-06-elegy-winter';
import { STORY_07_VANISHING_FLOODPLAIN } from './himalayan-dispatch-stories/story-07-vanishing-floodplain';
import { STORY_08_SNOWLINE_RETREAT } from './himalayan-dispatch-stories/story-08-snowline-retreat';
import { STORY_09_GLACIER_DIALOGUE } from './himalayan-dispatch-stories/story-09-glacier-dialogue';
import { STORY_10_SLOW_JOURNALISM } from './himalayan-dispatch-stories/story-10-slow-journalism';
import { STORY_11_SCIENCE_GOVERNANCE } from './himalayan-dispatch-stories/story-11-science-diagnosed-valley-governance';
import { STORY_12_MOUNTAIN_REJECTS_ENGINEER } from './himalayan-dispatch-stories/story-12-when-mountain-rejects-engineer';
import { STORY_13_ECOLOGICAL_LIMITS_DEVELOPMENT } from './himalayan-dispatch-stories/story-13-who-gave-development-right-exceed-mountain';
import { STORY_14_NATURE_NOT_CONTRACTOR } from './himalayan-dispatch-stories/story-14-nature-is-not-a-contractor';
import { STORY_15_CLIMATE_AGRICULTURAL_SCIENCE } from './himalayan-dispatch-stories/story-15-climate-has-changed-has-agricultural-science';
import { STORY_16_SIX_YEARS_WARNINGS_AIR } from './himalayan-dispatch-stories/story-16-six-years-of-warnings-kashmir-cannot-breathe';
import { STORY_17_ENVIRONMENTAL_LAWS_NO_DEFENCE } from './himalayan-dispatch-stories/story-17-when-environmental-laws-exist-no-defence';
import { STORY_18_LAKE_ANNUAL_CLEANUP } from './himalayan-dispatch-stories/story-18-a-lake-cannot-be-rescued-by-annual-cleanup';
import { STORY_19_SUCCESS_ENVIRONMENTAL_ACTIVISM } from './himalayan-dispatch-stories/story-19-who-measures-success-environmental-activism';
import { STORY_20_ENOUGH_DECLARATIONS } from './himalayan-dispatch-stories/story-20-mountains-have-heard-enough-declarations';
import { STORY_21_POLITICS_CHOOSES_LANDSCAPE } from './himalayan-dispatch-stories/story-21-who-speaks-for-environment-when-politics-chooses-landscape';
import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';

export const EDITORIAL_WORKFLOW_STAGES: Array<{
  id: EditorialWorkflowStage;
  stepNumber: string;
  label: string;
  gatekeeper: string;
  description: string;
}> = [
  {
    id: 'pitching',
    stepNumber: '01',
    label: 'Pitching',
    gatekeeper: 'Commissioning Desk',
    description: 'Reporter or contributor submits a field-grounded hypothesis, access plan, and preliminary source assessment.',
  },
  {
    id: 'assignment',
    stepNumber: '02',
    label: 'Assignment',
    gatekeeper: 'Managing Editor',
    description: 'Formal editorial commission, scope charter, field safety review, and source-protection classification.',
  },
  {
    id: 'drafting',
    stepNumber: '03',
    label: 'Drafting',
    gatekeeper: 'Assigned Correspondent',
    description: 'On-the-ground reporting, archival document gathering, photography plates, and literary longform manuscript.',
  },
  {
    id: 'fact_checking',
    stepNumber: '04',
    label: 'Fact-Checking',
    gatekeeper: 'Verification Desk',
    description: 'Line-by-line verification of dates, elevations, statutory citations, quotes, and primary field notebooks.',
  },
  {
    id: 'scientific_review',
    stepNumber: '05',
    label: 'Scientific Review',
    gatekeeper: 'KEW Scientific Review Council',
    description: 'Independent peer review of hydrological, cryospheric, ecological, and statistical claims against physical evidence.',
  },
  {
    id: 'editorial_approval',
    stepNumber: '06',
    label: 'Editorial Approval',
    gatekeeper: 'Founding Editor-in-Chief',
    description: 'Final literary edit, right-of-reply audit, legal clearance, and layout sign-off.',
  },
  {
    id: 'scheduling',
    stepNumber: '07',
    label: 'Scheduling',
    gatekeeper: 'Production Desk',
    description: 'Placement into an edition folio, plate color-grading, and approved forthcoming preview release.',
  },
  {
    id: 'publication',
    stepNumber: '08',
    label: 'Publication',
    gatekeeper: 'Masthead Imprint',
    description: 'Public release within a numbered Himalayan Dispatch edition with permanent canonical citation.',
  },
  {
    id: 'corrections',
    stepNumber: '09',
    label: 'Corrections & Post-Publication Audit',
    gatekeeper: 'Standards Editor',
    description: 'Timestamped public clarifications, empirical updates, and institutional responses appended transparently.',
  },
  {
    id: 'archiving',
    stepNumber: '10',
    label: 'Archiving',
    gatekeeper: 'Periodical Archive',
    description: 'Preservation in the permanent Himalayan Dispatch Edition Archive once a new issue assumes the cover.',
  },
];

export const EDITORIAL_DEPARTMENTS: EditorialDepartment[] = [
  {
    id: 'cover-stories',
    name: 'Cover Stories',
    shortLabel: 'Cover Story',
    folioNumber: 'I',
    tagline: 'Defining reckonings at the roof of the Western Himalayas.',
    editorialMandate:
      'Each edition opens with a single sweeping cover inquiry uniting high-altitude field reporting, human testimony, and earth-system science.',
    compositionStyle: 'Full-bleed twilight plate with oversized display typography and multi-chapter narrative.',
  },
  {
    id: 'longform-features',
    name: 'Longform Features',
    shortLabel: 'The Big Read',
    folioNumber: 'II',
    tagline: 'Unhurried literary narratives on water, memory, and landscape.',
    editorialMandate:
      'Deep narrative essays of 3,000 to 6,000 words written over months of immersion along rivers, springsheds, and mountain passes.',
    compositionStyle: 'Asymmetric 7:5 split folio, drop-cap literary column, and marginalia field notes.',
  },
  {
    id: 'field-reports',
    name: 'Field Reports',
    shortLabel: 'Dispatches from the Field',
    folioNumber: 'III',
    tagline: 'Intimate dispatches from wetlands, pastures, and forest lines.',
    editorialMandate:
      'Firsthand notebooks filed from ecological transition zones where municipal expansion, grazing routes, and seasonal wildlife converge.',
    compositionStyle: 'Counterbalanced staggered diptych with dateline stamps and observational vignettes.',
  },
  {
    id: 'investigative-journalism',
    name: 'Investigative Journalism',
    shortLabel: 'Investigative Desk',
    folioNumber: 'IV',
    tagline: 'Documentary reporting following extraction, contracts, and accountability.',
    editorialMandate:
      'Evidence-led reporting cross-referencing satellite imagery, statutory filings, and on-site measurements while safeguarding confidential sources.',
    compositionStyle: 'Three-column broadsheet ledger with documentary callouts and verification colophon.',
  },
  {
    id: 'photo-essays',
    name: 'Photo Essays',
    shortLabel: 'The Visual Journal',
    folioNumber: 'V',
    tagline: 'Slow, large-format visual storytelling in monochrome and natural light.',
    editorialMandate:
      'Curated photographic sequences treated with gallery-grade pacing, generous negative space, and unhurried caption prose.',
    compositionStyle: 'Darkroom ink-black spread with numbered silver-gelatin plates and elevation metadata.',
  },
  {
    id: 'data-journalism',
    name: 'Data Journalism',
    shortLabel: 'Cartography & Numbers',
    folioNumber: 'VI',
    tagline: 'Bespoke print-inspired visual essays translating decadal records into human scale.',
    editorialMandate:
      'Hand-crafted editorial charts and spatial narratives—never generic dashboards—illuminating long-term cryospheric and hydrological shifts.',
    compositionStyle: 'Editorial copper-and-ink horizon graphics woven directly into narrative prose.',
  },
  {
    id: 'interviews',
    name: 'Interviews',
    shortLabel: 'The Conversation',
    folioNumber: 'VII',
    tagline: 'Extended dialogues with glaciologists, shepherds, jurists, and archivists.',
    editorialMandate:
      'Long-form Q&A portraits capturing the voices of thinkers and custodians who have spent decades reading Himalayan terrain.',
    compositionStyle: 'Literary review Q&A typography with oversized copper quotation motifs.',
  },
  {
    id: 'editorials',
    name: 'Editorials',
    shortLabel: 'From the Masthead',
    folioNumber: 'VIII',
    tagline: 'The moral and intellectual voice of Himalayan Dispatch.',
    editorialMandate:
      'Measured essays from the Editorial Board articulating why ecological truth requires both scientific rigor and literary conscience.',
    compositionStyle: 'Classic two-column essay ledger paired with signed masthead imprint.',
  },
];

export const JOURNALIST_PROFILES: JournalistProfile[] = [
  {
    slug: 'himalayan-dispatch-desk',
    name: 'Himalayan Dispatch Desk',
    roleTitle: 'Collective Editorial, Documentary & Investigative Desk',
    beat: 'Environmental Legacy & Conservation Accountability · Cover Inquiries',
    basedIn: 'Fairfax, Virginia & Western Himalayan Bureaus',
    portraitUrl: '/images/green-heroes/legacy-heritage.jpg',
    shortBio:
      'Institutional byline of Himalayan Dispatch uniting documentary reporting, archival verification, environmental science synthesis, and conservation accountability across Jammu & Kashmir and the Western Himalayas.',
    extendedBio: [
      'When an inquiry spans multiple mountain divisions, historical registers, scientific disciplines, and institutional accountability frameworks, it is filed collectively under the Himalayan Dispatch Desk.',
      'Every Desk manuscript undergoes line-by-line documentary verification by the Office of Editorial Standards & Verification, multidisciplinary review by the KEW Scientific Review Council, and final publication sign-off by the Founding Editor-in-Chief.',
    ],
    languages: ['English', 'Kashmiri', 'Urdu', 'Dogri'],
    awardsAndFellowships: [
      'Official Editorial Imprint of Kashmir EcoWatch (KEW) Western Himalayan',
      'Steward of the Annual September 11 Green Martyrs Memorial Edition',
    ],
    pgpFingerprintNote:
      'Families of fallen conservation personnel and documentary contributors may contact the Desk with full dignity, consent, and confidentiality protections.',
  },
  {
    slug: 'dr-fayaz-ahmad-khan',
    name: 'Dr. Fayaz Ahmad Khan',
    roleTitle: 'Founding Editor-in-Chief',
    beat: 'Cryosphere, High-Altitude Watersheds, Mountain Governance & Ecological Resilience',
    basedIn: 'Loudoun County, VA & Kashmir',
    portraitUrl: '/images/founder-profile.jpg',
    shortBio:
      'Founder of Kashmir EcoWatch and Founding Editor-in-Chief of Himalayan Dispatch; writes on alpine hydrology, cryospheric thresholds, disaster resilience, and mountain commons across the Western Himalayas.',
    extendedBio: [
      'Dr. Fayaz Ahmad Khan brings more than twenty-five years of environmental geospatial science, mountain hydrology, and critical watershed resilience work to the founding masthead of Himalayan Dispatch, bridging empirical Earth observation with literary public witness.',
      'Having founded ESRO in Kashmir in 2004 and conceptualized Kashmir EcoWatch as an enduring non-commercial knowledge return system for the Western Himalayas, his essays and dialogues examine where glacier physics, watershed memory, and human governance meet.',
    ],
    languages: ['English', 'Kashmiri', 'Urdu'],
    awardsAndFellowships: [
      'Ph.D., Environmental Geospatial Information Science',
      'Founder, Kashmir EcoWatch Western Himalayan & ESRO (Est. 2004)',
    ],
    pgpFingerprintNote:
      'Out-of-band secure contact options available upon request via the Editorial Desk; never submit Tier III confidential whistleblower files via standard web forms.',
  },
  {
    slug: 'investigations-urban-water-desk',
    name: 'Himalayan Dispatch · Investigations & Urban Water Desk',
    roleTitle: 'Institutional Investigative & Urban Hydrology Desk',
    beat: 'Urban Waterways, Springsheds, Floodplain Mining & Statutory Accountability',
    basedIn: 'Fairfax, Virginia & Kashmir Bureau',
    portraitUrl: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    shortBio:
      'Institutional investigative desk synthesizing statutory environmental filings, judicial orders, archival water history, and fluvial geomorphology across the Jhelum and Chenab basins.',
    extendedBio: [
      'The Investigations & Urban Water Desk examines buried hydraulic heritage, municipal wetland contraction, riverbed mineral concessions, and environmental compliance records across the Western Himalayas.',
      'Until individual investigative correspondents are formally appointed and publicly accredited under the Editorial Charter, multi-source statutory and archival dossiers are published transparently under this institutional desk.',
    ],
    languages: ['English', 'Kashmiri', 'Urdu'],
    awardsAndFellowships: [
      'Himalayan Dispatch Institutional Desk · Stage 04–08 Governance Protocol',
      'Connected to KEW Hydrological & Earth-Human Impact Observatories',
    ],
    pgpFingerprintNote: 'Accepts documentary filings and right-of-reply submissions via verified Himalayan Dispatch editorial channels.',
  },
  {
    slug: 'visual-editions-desk',
    name: 'Himalayan Dispatch · Visual Editions Desk',
    roleTitle: 'Curatorial Visual & Monochrome Editions Desk',
    beat: 'Monochrome Visual Studies, Seasonal Climatology & Archival Curation',
    basedIn: 'Fairfax, Virginia & Western Himalayan Bureaus',
    portraitUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
    shortBio:
      'Curates monochrome visual studies, seasonal landscape sequences, and visual provenance governance across Himalayan Dispatch editions.',
    extendedBio: [
      'The Visual Editions Desk directs gallery-grade plate sequencing, caption integrity, and strict adherence to the Himalayan Dispatch Visual Asset Governance Policy.',
      'Every visual essay distinguishes camera-verified documentary field photography from illustrative tonal studies, while maintaining complete C2PA and workflow provenance in the restricted newsroom registry.',
    ],
    languages: ['English', 'Kashmiri', 'Urdu'],
    awardsAndFellowships: [
      'Himalayan Dispatch Curatorial & Visual Governance Directorate',
    ],
  },
  {
    slug: 'data-cartography-desk',
    name: 'Himalayan Dispatch · Data & Cartography Desk',
    roleTitle: 'Earth Observation, Cryosphere & Statistical Graphics Desk',
    beat: 'Multi-Sensor Satellite Synthesis, Snowline Geometry & Reproducible Data Essays',
    basedIn: 'Loudoun County, Virginia & Kashmir',
    portraitUrl: '/images/publications/geospatial-gis-earth-observation-lab.jpg',
    shortBio:
      'Translates multi-decadal satellite Earth observation, elevation-band hypsometry, and peer-reviewed cryospheric datasets into reproducible visual essays.',
    extendedBio: [
      'The Data & Cartography Desk pairs Landsat, Sentinel, and Copernicus DEM syntheses with published Himalayan glaciological and meteorological benchmarks.',
      'Every quantitative graphic discloses exact sensors, observation windows, uncertainty bounds, methodological limitations, and downloadable supplementary tables.',
    ],
    languages: ['English', 'Urdu', 'Kashmiri'],
    awardsAndFellowships: [
      'Himalayan Dispatch × KEW Geospatial & Cryosphere Synthesis Desk',
    ],
  },
  {
    slug: 'wetlands-forest-desk',
    name: 'Himalayan Dispatch · Wetlands & Forest Desk',
    roleTitle: 'Ramsar Wetlands, Montane Commons & Biodiversity Desk',
    beat: 'Ramsar Basins, Central Asian Flyway, Forest Governance & Pastoral Ecology',
    basedIn: 'Fairfax, Virginia & Kashmir–Jammu Bureaus',
    portraitUrl: '/images/publications/forestry-betula-treeline-lidar.jpg',
    shortBio:
      'Produces ecological syntheses on Ramsar wetland hydroperiods, migratory waterbirds, temperate conifer commons, and frontline forest stewardship.',
    extendedBio: [
      'The Wetlands & Forest Desk integrates Ramsar Information Sheets, Forest Survey of India assessments, Forest Rights Act governance records, and peer-reviewed biodiversity research across Kashmir and Pir Panjal.',
      'All field-synthesis dossiers separate published empirical measurements from open community reporting commissions awaiting on-the-ground verification.',
    ],
    languages: ['English', 'Kashmiri', 'Gojri', 'Urdu'],
    awardsAndFellowships: [
      'Himalayan Dispatch Ecological & Commons Synthesis Desk',
    ],
  },
];

export const EDITORIAL_BOARD_MEMBERS: EditorialBoardMember[] = [
  {
    id: 'eb-01',
    name: 'Dr. Fayaz Ahmad Khan',
    mastheadRole: 'Founding Editor-in-Chief',
    institutionalAffiliation: 'Himalayan Dispatch Editorial Directorate · KEW Western Himalayas',
    disciplineOrSpecialty: 'Environmental Geospatial Science, Watershed Resilience & Longform Editorial Direction',
    location: 'Loudoun County, VA & Kashmir',
    bio: 'Stewards editorial independence, narrative voice, scientific integrity, and edition architecture across every issue of Himalayan Dispatch.',
    group: 'masthead_leadership',
  },
  {
    id: 'eb-02',
    name: 'Investigations & Urban Water Desk (Appointment Pending)',
    mastheadRole: 'Managing Desk — Investigations, Waterways & Statutory Accountability',
    institutionalAffiliation: 'Himalayan Dispatch Institutional Newsroom',
    disciplineOrSpecialty: 'Documentary Accountability, Right-of-Reply & Source Protection',
    location: 'Distributed Desk',
    bio: 'Coordinates statutory and hydrological investigations under Founding Editor-in-Chief oversight while individual managing-editor appointments remain under review.',
    group: 'masthead_leadership',
  },
  {
    id: 'eb-03',
    name: 'Visual Editions & Cartography Directorate (Appointment Pending)',
    mastheadRole: 'Visual Governance, Monochrome Studies & Data Graphics',
    institutionalAffiliation: 'Himalayan Dispatch × KEW Visual Archive',
    disciplineOrSpecialty: 'Visual Provenance Governance, Reproducible Graphics & Plate Curation',
    location: 'Loudoun County & Western Himalayas',
    bio: 'Enforces caption accuracy, non-fabrication of photographic metadata, and reproducible spatial graphics across all editions.',
    group: 'visual_and_fact_checking',
  },
  {
    id: 'eb-05',
    name: 'Multidisciplinary Scientific Review Council (Panel In Establishment)',
    mastheadRole: 'Independent Stage 05 Scientific Review Gate',
    institutionalAffiliation: 'Kashmir EcoWatch Western Himalayan Scientific Network',
    disciplineOrSpecialty: 'Glaciology, Karst Hydrogeology, Wetland Ecology & Atmospheric Physics',
    location: 'Multi-Regional',
    bio: 'Evaluates empirical assertions, uncertainty bounds, and methodological reproducibility prior to Stage 09 public certification; no article displays a scientific-review badge until panel review is completed.',
    group: 'scientific_review_council',
  },
  {
    id: 'eb-06',
    name: 'Office of Editorial Standards & Verification',
    mastheadRole: 'Stage 04 Evidence Verification & Stage 10 Corrections Register',
    institutionalAffiliation: 'Himalayan Dispatch Institutional Governance',
    disciplineOrSpecialty: 'Primary-Source Verification, Statutory Citations & Public Corrections',
    location: 'Loudoun County, VA',
    bio: 'Maintains claim-level citation audits, 10-stage publication gate ledgers, and permanent post-publication clarifications.',
    group: 'visual_and_fact_checking',
  },
];

export const MAGAZINE_EDITIONS: MagazineEdition[] = [
  {
    id: 'ed-vol01-no01',
    slug: 'vol-01-no-01',
    volumeLabel: 'VOL. 01 / NO. 01',
    issueNumberLabel: 'THE INAUGURAL ISSUE',
    status: 'current',
    title: 'The Price of Protecting Paradise',
    themeKicker: 'THE INAUGURAL ISSUE · COVER STORY · ENVIRONMENTAL LEGACY',
    subtitle:
      "The forgotten guardians of Kashmir's forests, the lives sacrificed in defence of nature, the families left behind, and the unfinished responsibility of a society that inherited their ecological legacy.",
    publicationDateLabel: 'Inaugural Edition · Pre-Release Folio (Autumn–Winter 2026)',
    publishedIsoDate: '2026-11-27',
    coverImage: '/images/environmental-pil/forest-moratorium-river-basin.jpg',
    coverLocation: 'Verinag, Doda & Western Himalayan Forest Compartments · Jammu & Kashmir',
    coverCaption:
      'Temperate Western Himalayan deodar canopy and mountain river watershed representative of forest compartments defended by frontline conservation personnel (illustrative landscape plate — not incident photography).',
    coverCredit: 'Kashmir EcoWatch Visual Archive',
    editorsNoteTitle: 'A Quiet Room Beside the Instruments',
    editorsNoteBody: [
      'Across Kashmir EcoWatch, sensors, satellite passes, and hydrological ledgers measure the Western Himalayas with necessary precision. Yet numbers alone rarely explain the human cost of keeping a mountain watershed standing, or what happens to a home in Verinag or Doda when a forest guard never returns from duty.',
      'Himalayan Dispatch was founded to build a different kind of room: unhurried, literary, visually uncompromising, and anchored in verifiable truth. Our inaugural cover story—The Price of Protecting Paradise—turns toward the forgotten guardians of Kashmir’s forests, reconciling official memorials with lived occupational realities and asking who protects the protectors.',
      'Beside it across Volume 01, our correspondents listen to high cirque lakes beneath Haramukh, trace Srinagar’s buried waterways, stand at dawn along Hokersar’s reedlines, and examine thirty-eight winters of snowline retreat.',
      'Completing this twenty-one-dispatch inaugural architecture, Series II (Beyond the Conference, Dispatches 11–15) begins where five major 2026 regional academic conferences ended, while Series III (Civil Society and Environmental Accountability, Dispatches 16–21) examines NGOs, legal advocacy, civic cleanups, public declarations, and selective consciousness—exempting neither universities, regulators, civil society, nor Kashmir EcoWatch itself from outcome-based scrutiny.',
    ],
    editorsNoteAuthor: 'Dr. Fayaz Ahmad Khan',
    editorsNoteRole: 'Founding Editor-in-Chief',
    storySlugs: [
      'the-price-of-protecting-paradise',
      'when-mountains-speak-who-is-listening',
      'the-water-we-have-forgotten',
      'where-the-wild-waters-end',
      'the-people-who-guard-the-forest',
      'an-elegy-for-winter',
      'gravel-concrete-and-the-vanishing-floodplain',
      'thirty-eight-winters-of-snowline-retreat',
      'a-glacier-does-not-negotiate-with-five-year-plans',
      'why-the-western-himalayas-demand-slow-journalism',
      'science-has-diagnosed-the-valley-who-will-prescribe-its-governance',
      'when-the-mountain-rejects-the-engineer',
      'who-gave-development-the-right-to-exceed-the-mountain',
      'nature-is-not-a-contractor',
      'the-climate-has-changed-has-agricultural-science',
      'six-years-of-warnings-and-kashmir-still-cannot-breathe',
      'when-environmental-laws-exist-but-the-environment-has-no-defence',
      'a-lake-cannot-be-rescued-by-an-annual-cleanup',
      'who-measures-the-success-of-environmental-activism',
      'the-mountains-have-heard-enough-declarations',
      'who-speaks-for-the-environment-when-politics-chooses-the-landscape',
    ],
  },
  {
    id: 'ed-issue-02',
    slug: 'issue-02-a-world-in-transition',
    volumeLabel: 'VOL. 01 / NO. 02',
    issueNumberLabel: 'ISSUE 02 · COMING NEXT',
    status: 'forthcoming',
    title: 'A World in Transition',
    themeKicker: 'BEHIND THE NEXT COVER',
    subtitle:
      'Four environmental stories exploring landscapes and communities in transition.',
    publicationDateLabel: 'Publication date to be announced',
    coverImage: '/images/himalayan-dispatch/forthcoming-world-in-transition.jpg',
    coverLocation: 'Upper Lidder & Zanskar Cryosphere Transition Zone',
    coverCaption:
      'Braided proglacial meltwater channels emerging from dark moraine stone at the close of the ablation season.',
    coverCredit: 'Forthcoming Cover Study · Himalayan Dispatch Visual Desk',
    editorsNoteTitle: 'Inside the Next Edition',
    editorsNoteBody: [
      'Our second edition turns toward transitions already underway beneath everyday life: vanishing karst springs across rural Kashmir, winter thermal inversions trapping urban particulate matter over Srinagar, nutrient and visitor pressures on high-altitude tarns, and the narrow forest corridors where the Hangul endures.',
      'In keeping with our newsroom charter, we open a window onto editorially approved commissions in progress while keeping sensitive investigative reporting, unpublished drafts, and confidential sources strictly protected.',
    ],
    editorsNoteAuthor: 'Dr. Fayaz Ahmad Khan',
    editorsNoteRole: 'Founding Editor-in-Chief',
    storySlugs: [],
  },
  {
    id: 'ed-monograph-00',
    slug: 'monograph-00-watershed-voices',
    volumeLabel: 'MONOGRAPH 00 · WATERSHED VOICES',
    issueNumberLabel: 'FOUNDATIONAL WATERSHED MONOGRAPH',
    status: 'archived',
    title: 'Watershed Voices: Notes from the Upper Jhelum',
    themeKicker: 'FOUNDATIONAL WATERSHED MONOGRAPH',
    subtitle:
      'From the hidden aquifers of Verinag to the diminishing floodwater sanctuary of Wular, tracing the ecological systems that sustain Kashmir and the institutional decisions that increasingly threaten them.',
    publicationDateLabel:
      'Originally Published July 15, 2026 · Expanded Monograph Revision November 27, 2026',
    publishedIsoDate: '2026-07-15',
    coverImage: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
    coverLocation: 'Wular Floodplain & Erin Catchment · Bandipora',
    coverCaption:
      'Open-water floodplain storage and peripheral willow marshes across the Wular detention basin (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
    coverCredit: 'Kashmir EcoWatch Visual Archive',
    editorsNoteTitle: 'Can We Protect the River Without Protecting Its Landscape?',
    editorsNoteBody: [
      'When Folio No. 00 first appeared on July 15, 2026, it carried only a brief two-paragraph charter prologue looking downstream from Verinag’s limestone spring toward Wular. That opening cadence was an invitation rather than a completed inquiry.',
      'Expanded on November 27, 2026 into this sixteen-part foundational watershed monograph, Where the River First Learns Its Name confronts the full scientific and institutional reality of the Upper Jhelum—uniting karst hydrogeology, cryospheric recession, twenty-eight tributary sub-basins, karewa stratigraphy, agrarian water demand, urban drainage, wetland connectivity, riverbed mining, and our proposed Upper Jhelum Integrated Watershed Intelligence and Governance Framework.',
    ],
    editorsNoteAuthor: 'Dr. Fayaz Ahmad Khan',
    editorsNoteRole: 'Founding Editor-in-Chief',
    storySlugs: ['notes-from-the-upper-jhelum-headwaters'],
  },
];

export const MAGAZINE_STORIES: MagazineStory[] = [
  // ── 01–10: INAUGURAL EDITION (VOL. 01 / NO. 01) COMPLETE MANUSCRIPTS ──────
  THE_PRICE_OF_PROTECTING_PARADISE_STORY,
  STORY_02_MOUNTAINS_SPEAK,
  STORY_03_FORGOTTEN_WATER,
  STORY_04_WILD_WATERS,
  STORY_05_FOREST_GUARDIANS,
  STORY_06_ELEGY_WINTER,
  STORY_07_VANISHING_FLOODPLAIN,
  STORY_08_SNOWLINE_RETREAT,
  STORY_09_GLACIER_DIALOGUE,
  STORY_10_SLOW_JOURNALISM,

  // ── 11–15: BEYOND THE CONFERENCE — INDEPENDENT RESPONSE SERIES (VOL. 01) ──
  STORY_11_SCIENCE_GOVERNANCE,
  STORY_12_MOUNTAIN_REJECTS_ENGINEER,
  STORY_13_ECOLOGICAL_LIMITS_DEVELOPMENT,
  STORY_14_NATURE_NOT_CONTRACTOR,
  STORY_15_CLIMATE_AGRICULTURAL_SCIENCE,

  // ── 16–21: CIVIL SOCIETY & ENVIRONMENTAL ACCOUNTABILITY SERIES (VOL. 01) ──
  STORY_16_SIX_YEARS_WARNINGS_AIR,
  STORY_17_ENVIRONMENTAL_LAWS_NO_DEFENCE,
  STORY_18_LAKE_ANNUAL_CLEANUP,
  STORY_19_SUCCESS_ENVIRONMENTAL_ACTIVISM,
  STORY_20_ENOUGH_DECLARATIONS,
  STORY_21_POLITICS_CHOOSES_LANDSCAPE,

  // ── FOUNDATIONAL WATERSHED MONOGRAPH (MONOGRAPH 00 · WATERSHED VOICES) ────
  MONOGRAPH_00_WATERSHED_VOICES_STORY,
];

/**
 * FORTHCOMING EDITION ASSIGNMENTS
 * Section 5: "Only editorially approved previews should appear publicly.
 * Confidential assignments, unpublished investigations and sensitive sources must remain protected."
 */
export const FORTHCOMING_ASSIGNMENTS: ForthcomingAssignment[] = [
  // ── 4 PUBLICLY APPROVED ISSUE 02 PREVIEWS (Matching Section 5 Specification) ──
  {
    id: 'assign-iss02-01',
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: 'The Disappearing Springs of Kashmir',
    synopsis:
      'Field reporting across karst and karewa villages where centuries-old perennial nag springs have turned seasonal or dry.',
    departmentId: 'longform-features',
    departmentLabel: 'Longform Features',
    bylineDisplay: 'Journalist assignment pending',
    workflowStage: 'drafting',
    publicStageLabel: 'In reporting',
    anticipatedPublicationWindow: 'Issue 02 · Forthcoming',
    region: 'Anantnag, Pulwama & Budgam',
    publicPreviewApproved: true,
    isConfidential: false,
    sourceProtectionLevel: 'standard_on_record',
    internalDeskNotes: 'Pairing village spring oral histories with KEW spring-discharge archive.',
  },
  {
    id: 'assign-iss02-02',
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: "Srinagar's Invisible Air Crisis",
    synopsis:
      'Examining winter thermal inversions, PM2.5 exposure disparities, biomass smoke, and brick-kiln plumes in a mountain bowl.',
    departmentId: 'data-journalism',
    departmentLabel: 'Data & Atmospheric Journalism',
    bylineDisplay: 'Journalist assignment pending',
    workflowStage: 'assignment',
    publicStageLabel: 'Commissioned',
    anticipatedPublicationWindow: 'Issue 02 · Forthcoming',
    region: 'Srinagar Metropolitan Bowl',
    publicPreviewApproved: true,
    isConfidential: false,
    sourceProtectionLevel: 'standard_on_record',
    internalDeskNotes: 'Bespoke winter inversion vertical profile graphic in commission.',
  },
  {
    id: 'assign-iss02-03',
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: 'The Fragile World of Alpine Lakes',
    synopsis:
      'High-elevation dispatches on oligotrophic tarns facing warming waters, unregulated trekking waste, and shortened ice cover.',
    departmentId: 'photo-essays',
    departmentLabel: 'Cover & Visual Dispatch',
    journalistSlug: 'visual-editions-desk',
    bylineDisplay: 'Journalist assignment pending',
    workflowStage: 'editorial_approval',
    publicStageLabel: 'In editorial review',
    anticipatedPublicationWindow: 'Issue 02 · Forthcoming',
    region: 'Pir Panjal & Great Himalayan Tarns',
    publicPreviewApproved: true,
    isConfidential: false,
    sourceProtectionLevel: 'standard_on_record',
    internalDeskNotes: 'Plates undergoing Stage 05 limnological caption check.',
  },
  {
    id: 'assign-iss02-04',
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: 'Living Alongside the Hangul',
    synopsis:
      'Portraits of wildlife guards, seasonal herders, and corridor researchers navigating survival around Dachigam and Overa-Aru.',
    departmentId: 'field-reports',
    departmentLabel: 'Dispatches from the Field',
    journalistSlug: 'wetlands-forest-desk',
    bylineDisplay: 'Journalist assignment pending',
    workflowStage: 'pitching',
    publicStageLabel: 'In development',
    anticipatedPublicationWindow: 'Issue 02 · Forthcoming',
    region: 'Dachigam–Sindh–Tralsar Corridor',
    publicPreviewApproved: true,
    isConfidential: false,
    sourceProtectionLevel: 'standard_on_record',
    internalDeskNotes: 'Coordinating winter camera-trap corridor notes.',
  },

  // ── CONFIDENTIAL / SENSITIVE ASSIGNMENTS (NEVER EXPOSED PUBLICLY) ────────
  {
    id: 'assign-conf-901',
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: '[CONFIDENTIAL] Unpermitted Nighttime Muck-Dumping Along Sub-Alpine Tributary Spoil Sites',
    synopsis:
      'Unpublished documentary investigation cross-checking whistleblower haulage logs with night-light and SAR riverbank backscatter.',
    departmentId: 'investigative-journalism',
    departmentLabel: 'Investigative Desk (Restricted)',
    journalistSlug: 'investigations-urban-water-desk',
    bylineDisplay: 'Restricted Desk Assignment',
    workflowStage: 'fact_checking',
    publicStageLabel: 'Fact-checking',
    anticipatedPublicationWindow: 'Embargoed Pending Legal & Source Safety Clearance',
    region: 'Classified Catchment Reach',
    publicPreviewApproved: false,
    isConfidential: true,
    sourceProtectionLevel: 'strict_confidential',
    internalDeskNotes:
      'STRICT SOURCE PROTECTION: Tier III whistleblower manifests routed out-of-band and encrypted at rest (AES-256-GCM). Right-of-reply letters scheduled post-verification.',
    confidentialSourceSummary: 'Two anonymous site engineers + statutory RTI docket under corroboration.',
  },
  {
    id: 'assign-conf-902',
    editionSlug: 'issue-02-a-world-in-transition',
    workingTitle: '[CONFIDENTIAL] Timber Transit Permits & Compartment Boundary Discrepancies',
    synopsis:
      'Pre-publication audit of compartment coupe markings versus high-resolution canopy loss polygons.',
    departmentId: 'investigative-journalism',
    departmentLabel: 'Investigative Desk (Restricted)',
    journalistSlug: 'dr-fayaz-ahmad-khan',
    bylineDisplay: 'Restricted Desk Assignment',
    workflowStage: 'scientific_review',
    publicStageLabel: 'Scientific review',
    anticipatedPublicationWindow: 'Unannounced',
    region: 'Classified Forest Division',
    publicPreviewApproved: false,
    isConfidential: true,
    sourceProtectionLevel: 'strict_confidential',
    internalDeskNotes: 'Hold from all public forthcoming previews until source relocation and statutory response.',
    confidentialSourceSummary: 'Protected community forestry informant.',
  },
];

// ── CONTRIBUTOR CATEGORIES, ONBOARDING LIFECYCLE & PUBLICATION CALENDAR ─────

export const CONTRIBUTOR_ROLE_CATEGORIES: ContributorRoleCategorySpec[] = [
  {
    id: 'environmental-reporter',
    title: 'Environmental Reporter',
    scopeOfWork: 'Environmental news and developments',
    track: 'regular_journalist',
    primaryDepartmentId: 'field-reports',
    engagementNote: 'Ongoing beat reporting across watersheds, forests, air quality, and ecological policy.',
  },
  {
    id: 'district-correspondent',
    title: 'District Correspondent',
    scopeOfWork: 'District-level reporting and local stories',
    track: 'regular_journalist',
    primaryDepartmentId: 'field-reports',
    engagementNote: 'Grounded local dispatches from valleys, towns, pastures, and sub-catchments across Kashmir and the Western Himalayas.',
  },
  {
    id: 'investigative-journalist',
    title: 'Investigative Journalist',
    scopeOfWork: 'Evidence-based public-interest investigations',
    track: 'regular_journalist',
    primaryDepartmentId: 'investigative-journalism',
    engagementNote: 'Documentary investigations pairing statutory records, field measurements, and strict source protection.',
  },
  {
    id: 'science-journalist',
    title: 'Science Journalist',
    scopeOfWork: 'Scientific research and environmental communication',
    track: 'specialist_contributor',
    primaryDepartmentId: 'longform-features',
    engagementNote: 'Translating glaciology, limnology, biodiversity, and atmospheric research into clear literary prose.',
  },
  {
    id: 'photojournalist',
    title: 'Photojournalist',
    scopeOfWork: 'Documentary photography and photo essays',
    track: 'specialist_contributor',
    primaryDepartmentId: 'photo-essays',
    engagementNote: 'Zero-manipulation medium-format, color, and monochrome documentary sequences from the field.',
  },
  {
    id: 'data-journalist',
    title: 'Data Journalist',
    scopeOfWork: 'Environmental datasets, statistics and spatial analysis',
    track: 'specialist_contributor',
    primaryDepartmentId: 'data-journalism',
    engagementNote: 'Print-caliber cartography, long-horizon climate series, and empirical visual essays.',
  },
  {
    id: 'documentary-filmmaker',
    title: 'Documentary Filmmaker',
    scopeOfWork: 'Cinematic environmental storytelling',
    track: 'specialist_contributor',
    primaryDepartmentId: 'photo-essays',
    engagementNote: 'Unhurried non-fiction visual dispatches and field audio-visual portraits.',
  },
  {
    id: 'feature-writer',
    title: 'Feature Writer',
    scopeOfWork: 'Longform narratives and magazine features',
    track: 'regular_journalist',
    primaryDepartmentId: 'longform-features',
    engagementNote: 'Deep 3,000–6,000 word narrative essays exploring landscape, memory, and human consequence.',
  },
  {
    id: 'guest-columnist',
    title: 'Guest Columnist',
    scopeOfWork: 'Specialist commentary and perspectives',
    track: 'specialist_contributor',
    primaryDepartmentId: 'editorials',
    engagementNote: 'Measured essays from scientists, jurists, historians, and mountain custodians.',
  },
  {
    id: 'student-journalist',
    title: 'Student Journalist',
    scopeOfWork: 'Supervised emerging journalism talent',
    track: 'regular_journalist',
    primaryDepartmentId: 'field-reports',
    engagementNote: 'Mentored reporting fellowships with senior editorial and fact-checking supervision.',
  },
  {
    id: 'freelance-contributor',
    title: 'Freelance Contributor',
    scopeOfWork: 'Independent commissioned or submitted stories',
    track: 'specialist_contributor',
    primaryDepartmentId: 'longform-features',
    engagementNote: 'Per-edition commissioned features, interviews, and dispatches under independent contributor terms.',
  },
  {
    id: 'international-correspondent',
    title: 'International Correspondent',
    scopeOfWork: 'Relevant environmental reporting beyond Kashmir',
    track: 'regular_journalist',
    primaryDepartmentId: 'cover-stories',
    engagementNote: 'Transboundary cryosphere, High Asia river basins, and global mountain policy reporting.',
  },
];

export const ONBOARDING_LIFECYCLE_STEPS: OnboardingLifecycleStepSpec[] = [
  {
    stepNumber: '01',
    title: 'Application submitted',
    description: 'Applicant receives a unique Himalayan Dispatch application reference number.',
  },
  {
    stepNumber: '02',
    title: 'Credential verification',
    description: 'Editorial administration privately reviews identity, qualifications, and published portfolio.',
  },
  {
    stepNumber: '03',
    title: 'Editorial assessment',
    description: 'Relevant editorial department evaluates reporting craft, beat alignment, and field rigor.',
  },
  {
    stepNumber: '04',
    title: 'Founding Editor-in-Chief approval',
    description: 'Final appointment or contributor authorization by Dr. Fayaz Ahmad Khan or delegated desk leadership.',
  },
  {
    stepNumber: '05',
    title: 'Editorial charter acceptance',
    description: 'Contributor affirms editorial ethics, scientific accuracy, right-of-reply, and source protection standards.',
  },
  {
    stepNumber: '06',
    title: 'Newsroom access activated',
    description: 'Role-based access to the private Himalayan Dispatch Journalist Newsroom Workspace.',
  },
  {
    stepNumber: '07',
    title: 'Editorial assignment',
    description: 'Journalist receives commissions or proposes stories for forthcoming numbered editions.',
  },
  {
    stepNumber: '08',
    title: 'Public journalist portfolio',
    description: 'Approved profile, verified credentials, published stories, and approved upcoming assignments.',
  },
];

export const PUBLICATION_CALENDAR_MILESTONES: PublicationCalendarMilestone[] = [
  {
    id: 'cal-iss02-pitches',
    editionLabel: 'VOL. 01 / NO. 02',
    editionTitle: 'A World in Transition',
    milestone: 'Commissioning & Beat Assignment Window',
    windowLabel: 'Open Now · Winter 2026–2027',
    gatekeeper: 'Commissioning Desk · Founding Masthead',
    status: 'Open for Commissions',
  },
  {
    id: 'cal-iss02-drafts',
    editionLabel: 'VOL. 01 / NO. 02',
    editionTitle: 'A World in Transition',
    milestone: 'First-Draft Manuscripts & Documentary Plates Due',
    windowLabel: 'Stage 03–05 Verification Gate',
    gatekeeper: 'Visual Editions & Standards Desks',
    status: 'In Production',
  },
  {
    id: 'cal-iss02-science',
    editionLabel: 'VOL. 01 / NO. 02',
    editionTitle: 'A World in Transition',
    milestone: 'Stage 05 Scientific Review & Stage 06 Masthead Sign-Off',
    windowLabel: 'Pre-Press Closing Folio',
    gatekeeper: 'Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief',
    status: 'Upcoming',
  },
  {
    id: 'cal-iss03-scoping',
    editionLabel: 'VOL. 01 / NO. 03',
    editionTitle: 'The High Passes & Transboundary Waters',
    milestone: 'Early Longform & District Correspondent Scoping',
    windowLabel: 'Spring 2027 Slate',
    gatekeeper: 'Commissioning Desk',
    status: 'Open for Commissions',
  },
  {
    id: 'cal-annual-green-martyrs-sept11',
    editionLabel: 'ANNUAL SPECIAL EDITION · SEPT 11',
    editionTitle: 'The Annual Green Martyrs Memorial Edition (Proposed)',
    milestone: 'Historical Roll Verification, Family Testimonies (with Consent) & Safety Accountability Audit',
    windowLabel: 'Proposed Annual Observance · September 11 (Subject to Formal Editorial Adoption)',
    gatekeeper: 'Himalayan Dispatch Desk & Founding Editor-in-Chief',
    status: 'Upcoming',
  },
];

export const KASHMIR_TEN_DISTRICTS: readonly string[] = [
  'Srinagar',
  'Ganderbal',
  'Budgam',
  'Baramulla',
  'Bandipora',
  'Kupwara',
  'Anantnag',
  'Pulwama',
  'Shopian',
  'Kulgam',
];

export interface RegionalBureauSpec {
  id: 'kashmir' | 'jammu' | 'ladakh' | 'ajk' | 'gilgit' | 'baltistan';
  folioRoman: string;
  name: string;
  shortLabel: string;
  geographicScopeLabel: string;
  coveredUnits: string[];
  operationalStatus: 'active_reporting_desk' | 'field_active_establishing' | 'in_establishment';
  publicStatusBadge: string;
  editorialMandate: string;
  physicalOfficeDisclosure: string;
  storyRegionKeywords: string[];
}

export const REGIONAL_REPORTING_BUREAUS: RegionalBureauSpec[] = [
  {
    id: 'kashmir',
    folioRoman: 'I',
    name: 'Kashmir Bureau',
    shortLabel: 'Established Desk',
    geographicScopeLabel: 'Kashmir Valley · Jhelum Basin & Pir Panjal–Greater Himalayan Flanks',
    coveredUnits: [
      'Srinagar',
      'Ganderbal',
      'Budgam',
      'Baramulla',
      'Bandipora',
      'Kupwara',
      'Anantnag',
      'Pulwama',
      'Shopian',
      'Kulgam',
    ],
    operationalStatus: 'active_reporting_desk',
    publicStatusBadge: 'Established Reporting Desk',
    editorialMandate:
      'Covers alpine glaciers, lacustrine systems (Dal, Wular, Manasbal, Anchar), Ramsar wetlands, karst springsheds, subalpine forests, and municipal environmental accountability across all ten Kashmir Valley districts.',
    physicalOfficeDisclosure:
      'Operates as an established distributed field correspondent desk coordinated with the Fairfax, VA publishing headquarters rather than a physical street office.',
    storyRegionKeywords: ['Srinagar', 'Kashmir', 'Kolahoi', 'Lidder', 'Pahalgam', 'Wular', 'Jhelum', 'Dachigam', 'Gurez', 'Haramukh', 'Gangbal', 'Hokersar', 'Pulwama', 'Anantnag'],
  },
  {
    id: 'jammu',
    folioRoman: 'II',
    name: 'Jammu Bureau',
    shortLabel: 'Established Desk',
    geographicScopeLabel: 'Chenab Gorge, Pir Panjal Southern Escarpment & Shivalik Foothills',
    coveredUnits: [
      'Jammu',
      'Kathua',
      'Samba',
      'Udhampur',
      'Reasi',
      'Doda',
      'Kishtwar',
      'Ramban',
      'Rajouri',
      'Poonch',
    ],
    operationalStatus: 'active_reporting_desk',
    publicStatusBadge: 'Established Reporting Desk',
    editorialMandate:
      'Focuses on Chenab cascade hydropower, Ramban–Kishtwar slope instability, Pir Panjal old-growth temperate forests, Tawi watershed hydrology, and transhumant pastoral corridors.',
    physicalOfficeDisclosure:
      'Operates as an established distributed regional correspondent desk coordinated with the Fairfax, VA publishing headquarters rather than a physical street office.',
    storyRegionKeywords: ['Jammu', 'Chenab', 'Kishtwar', 'Doda', 'Ramban', 'Rajouri', 'Poonch', 'Pir Panjal'],
  },
  {
    id: 'ladakh',
    folioRoman: 'III',
    name: 'Ladakh Bureau',
    shortLabel: 'Established Desk',
    geographicScopeLabel: 'Trans-Himalayan Cold Desert · Indus, Shyok, Zanskar & Changthang',
    coveredUnits: ['Leh', 'Kargil', 'Zanskar', 'Nubra', 'Changthang', 'Drass'],
    operationalStatus: 'active_reporting_desk',
    publicStatusBadge: 'Established Reporting Desk',
    editorialMandate:
      'Chronicles high-altitude cryospheric recession, artificial ice-reservoir stewardship, Changthang pastoral rangelands, Pangong–Tso Moriri endorheic basins, and fragile solar-infrastructure siting.',
    physicalOfficeDisclosure:
      'Operates as an established distributed high-altitude correspondent desk coordinated with the Fairfax, VA publishing headquarters rather than a physical street office.',
    storyRegionKeywords: ['Ladakh', 'Zanskar', 'Leh', 'Kargil', 'Changthang', 'Drass', 'Shyok', 'Pangong', 'Zoji La'],
  },
  {
    id: 'ajk',
    folioRoman: 'IV',
    name: 'AJ&K Bureau',
    shortLabel: 'In Establishment',
    geographicScopeLabel: 'Neelum Valley, MuzaffarabadSyntaxis & Mangla–Jhelum Catchments',
    coveredUnits: [
      'Muzaffarabad',
      'Neelum',
      'Hattian Bala',
      'Bagh',
      'Haveli',
      'Poonch (AJK)',
      'Sudhnoti',
      'Kotli',
      'Mirpur',
      'Bhimber',
    ],
    operationalStatus: 'in_establishment',
    publicStatusBadge: 'Regional Desk · In Establishment',
    editorialMandate:
      'Examines seismic hazard memory along the Kashmir–Hazara syntaxis, Neelum–Jhelum river diversion ecology, Himalayan moist temperate forestry, and cross-watershed flood warning gaps.',
    physicalOfficeDisclosure:
      'Editorial reporting beat in establishment; Himalayan Dispatch maintains no physical office in AJ&K and invites independent correspondent applications.',
    storyRegionKeywords: ['Neelum', 'Muzaffarabad', 'Mirpur', 'Mangla'],
  },
  {
    id: 'gilgit',
    folioRoman: 'V',
    name: 'Gilgit Bureau',
    shortLabel: 'In Establishment',
    geographicScopeLabel: 'Western Karakoram, Hindu Raj & Upper Indus Confluence',
    coveredUnits: [
      'Gilgit',
      'Hunza',
      'Nagar',
      'Ghizer',
      'Diamer',
      'Astore',
      'Darel',
      'Tangir',
      'Gupis-Yasin',
    ],
    operationalStatus: 'in_establishment',
    publicStatusBadge: 'Regional Desk · In Establishment',
    editorialMandate:
      'Dedicated to surging Karakoram glaciers (Shishper, Passu, Batura), glacial lake outburst flood (GLOF) early warning, Attabad–Hunza valley geomorphology, and Deosai–Astore alpine ecosystems.',
    physicalOfficeDisclosure:
      'Editorial reporting beat in establishment; Himalayan Dispatch maintains no physical office in Gilgit and welcomes remote-sensing and field contributor applications.',
    storyRegionKeywords: ['Gilgit', 'Hunza', 'Nagar', 'Ghizer', 'Diamer', 'Astore', 'Karakoram'],
  },
  {
    id: 'baltistan',
    folioRoman: 'VI',
    name: 'Baltistan Bureau',
    shortLabel: 'In Establishment',
    geographicScopeLabel: 'Central Karakoram Icefields · Skardu, Shigar, Shyok & Baltoro',
    coveredUnits: ['Skardu', 'Shigar', 'Kharmang', 'Ghanche', 'Roundu'],
    operationalStatus: 'in_establishment',
    publicStatusBadge: 'Regional Desk · In Establishment',
    editorialMandate:
      'Covers the Baltoro, Biafo, and Siachen–Shyok cryospheric complexes, high-elevation oasis irrigation heritage, cold-desert riparian dunes, and Upper Indus meltwater regimes.',
    physicalOfficeDisclosure:
      'Editorial reporting beat in establishment; Himalayan Dispatch maintains no physical office in Baltistan and invites specialist science and visual contributors.',
    storyRegionKeywords: ['Baltistan', 'Skardu', 'Shigar', 'Kharmang', 'Ghanche', 'Baltoro'],
  },
];

// ─── EXPANDED 11-SECTION MASTHEAD & GOVERNANCE ARCHITECTURE ─────────────────

export const MASTHEAD_SECTION_SPECS: MastheadSectionSpec[] = [
  {
    id: 'I_leadership',
    romanNumeral: 'I',
    kicker: 'I · MASTHEAD LEADERSHIP',
    directorateTitle: 'Editorial Directorate',
    anchorId: 'editorial-directorate',
  },
  {
    id: 'II_commissioning',
    romanNumeral: 'II',
    kicker: 'II · EDITORIAL PRODUCTION & COMMISSIONING',
    directorateTitle: 'Central Newsroom',
    anchorId: 'central-newsroom',
  },
  {
    id: 'III_visual',
    romanNumeral: 'III',
    kicker: 'III · VISUAL JOURNALISM, CARTOGRAPHY & DESIGN',
    directorateTitle: 'Photography, Multimedia & Visual Editions Directorate',
    anchorId: 'visual-editions',
  },
  {
    id: 'IV_bureaus',
    romanNumeral: 'IV',
    kicker: 'IV · REGIONAL BUREAUS & CORRESPONDENT NETWORK',
    directorateTitle: 'Geographical Editorial Directorate',
    anchorId: 'regional-bureaus',
    governanceNote:
      'AJ&K, Gilgit and Baltistan retain their existing establishment status as distributed reporting desks currently being established. No physical regional offices are implied.',
  },
  {
    id: 'V_scientific_council',
    romanNumeral: 'V',
    kicker: 'V · EMPIRICAL & INDEPENDENT SCIENTIFIC REVIEW',
    directorateTitle: 'Multidisciplinary Scientific Review Council',
    anchorId: 'scientific-review',
    governanceNote:
      'The council assesses scientific evidence, methodological accuracy, statistical uncertainty and technical interpretations without dictating literary voice or improperly influencing editorial conclusions.',
  },
  {
    id: 'VI_standards',
    romanNumeral: 'VI',
    kicker: 'VI · FACT-CHECKING, VERIFICATION & EDITORIAL STANDARDS',
    directorateTitle: 'Office of Editorial Standards & Verification',
    anchorId: 'corrections-policy',
  },
  {
    id: 'VII_legal_safety',
    romanNumeral: 'VII',
    kicker: 'VII · MEDIA LAW, SOURCE PROTECTION & JOURNALIST SAFETY',
    directorateTitle: 'Office of Editorial Risk & Legal Affairs',
    anchorId: 'source-protection',
  },
  {
    id: 'VIII_public_editor',
    romanNumeral: 'VIII',
    kicker: 'VIII · PUBLIC EDITOR & READER ACCOUNTABILITY',
    directorateTitle: 'Independent Office of the Public Editor',
    anchorId: 'public-editor',
    governanceNote:
      'This office remains functionally independent of routine newsroom decision-making.',
  },
  {
    id: 'IX_digital_publishing',
    romanNumeral: 'IX',
    kicker: 'IX · DIGITAL PUBLISHING & INTERNATIONAL CIRCULATION',
    directorateTitle: 'Digital Publishing Directorate',
    anchorId: 'digital-publishing',
  },
];

export const MASTHEAD_DEFAULT_POSITIONS: MastheadPositionRecord[] = [
  // ── I · MASTHEAD LEADERSHIP (Editorial Directorate) ──────────────────────
  {
    id: 'mp-i-01',
    sectionId: 'I_leadership',
    order: 1,
    roleTitle: 'Founding Editor-in-Chief',
    holderName: 'Dr. Fayaz Ahmad Khan',
    domainsRubric:
      'Himalayan Dispatch Editorial Directorate · KEW Western Himalayas · Environmental Geospatial Science, Earth Systems Intelligence & Longform Editorial Direction',
    mandateDescription:
      'Stewards editorial independence, institutional vision, scientific integrity, publication architecture and strategic editorial direction across every edition of Himalayan Dispatch.',
    status: 'Confirmed',
    journalistSlug: 'dr-fayaz-ahmad-khan',
  },
  {
    id: 'mp-i-02',
    sectionId: 'I_leadership',
    order: 2,
    roleTitle: 'Executive Editor',
    holderName: '',
    domainsRubric:
      'Editorial Strategy · Newsroom Coordination · International Publishing Standards',
    mandateDescription:
      'Translates institutional editorial objectives into publication strategy, oversees departmental coordination and maintains editorial excellence across the magazine.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-i-03',
    sectionId: 'I_leadership',
    order: 3,
    roleTitle: 'Deputy Editor-in-Chief',
    holderName: '',
    domainsRubric:
      'Editorial Governance · Scientific Communication · Publication Quality',
    mandateDescription:
      'Supports executive editorial leadership, multidisciplinary coordination, institutional partnerships and editorial continuity.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-i-04',
    sectionId: 'I_leadership',
    order: 4,
    roleTitle: 'Managing Editor, Investigations & Dispatches',
    holderName: '',
    domainsRubric:
      'Documentary Accountability · Right of Reply · Source Protection',
    mandateDescription:
      'Oversees editorial commissions, investigative standards, correspondent assignments, confidential source protocols and risk-based pre-publication review.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-i-05',
    sectionId: 'I_leadership',
    order: 5,
    roleTitle: 'Editor-at-Large',
    holderName: '',
    domainsRubric:
      'Longform Journalism · Intellectual Commentary · Special Editorial Projects',
    mandateDescription:
      'Develops flagship narratives, institutional interviews, major investigative features and specialist editorial projects.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },

  // ── II · EDITORIAL PRODUCTION & COMMISSIONING (Central Newsroom) ─────────
  {
    id: 'mp-ii-01',
    sectionId: 'II_commissioning',
    order: 1,
    roleTitle: 'Commissioning Editor',
    holderName: '',
    domainsRubric:
      'Editorial Commissions · Contributor Development · Story Acquisition',
    mandateDescription:
      'Evaluates story pitches, commissions independent journalists and coordinates editorial assignments for forthcoming editions.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-02',
    sectionId: 'II_commissioning',
    order: 2,
    roleTitle: 'Senior Features Editor',
    holderName: '',
    domainsRubric:
      'Longform Narratives · Cover Stories · Environmental Storytelling',
    mandateDescription:
      'Oversees narrative development, cover features, literary journalism and the editorial quality of extended environmental reporting.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-03',
    sectionId: 'II_commissioning',
    order: 3,
    roleTitle: 'Investigations Editor',
    holderName: '',
    domainsRubric:
      'Documentary Evidence · Public Accountability · Investigative Journalism',
    mandateDescription:
      'Coordinates environmental investigations, documentary research, evidence assessment and right-of-reply procedures.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-04',
    sectionId: 'II_commissioning',
    order: 4,
    roleTitle: 'Science Editor',
    holderName: '',
    domainsRubric:
      'Scientific Interpretation · Research Communication · Empirical Accuracy',
    mandateDescription:
      'Ensures that environmental science is communicated accurately, accessibly and with appropriate acknowledgment of methodological limitations.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-05',
    sectionId: 'II_commissioning',
    order: 5,
    roleTitle: 'Environment & Climate Editor',
    holderName: '',
    domainsRubric:
      'Climate Intelligence · Environmental Policy · Ecosystem Resilience',
    mandateDescription:
      'Directs editorial coverage of climate change, ecological degradation, conservation, atmospheric systems and environmental governance.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-06',
    sectionId: 'II_commissioning',
    order: 6,
    roleTitle: 'Opinion & Editorial Page Editor',
    holderName: '',
    domainsRubric:
      'Editorial Commentary · Intellectual Discourse · Expert Perspectives',
    mandateDescription:
      'Curates opinion articles, institutional commentary, guest columns and independent environmental perspectives.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-07',
    sectionId: 'II_commissioning',
    order: 7,
    roleTitle: 'Chief Copy Editor',
    holderName: '',
    domainsRubric:
      'Editorial Language · Stylebook Compliance · Manuscript Refinement',
    mandateDescription:
      'Maintains linguistic precision, editorial consistency, factual clarity and professional publication standards.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ii-08',
    sectionId: 'II_commissioning',
    order: 8,
    roleTitle: 'Research & Documentation Editor',
    holderName: '',
    domainsRubric:
      'Primary Sources · Archival Research · Documentary References',
    mandateDescription:
      'Oversees documentary evidence, archival materials, scientific references and research dossiers supporting published journalism.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },

  // ── III · VISUAL JOURNALISM, CARTOGRAPHY & DESIGN ────────────────────────
  {
    id: 'mp-iii-01',
    sectionId: 'III_visual',
    order: 1,
    roleTitle: 'Director of Photography & Visual Editions',
    holderName: '',
    domainsRubric:
      'Cinematic Documentary Photography · Visual Journalism · Archival Plates',
    mandateDescription:
      'Directs photographic commissions, full-bleed visual essays, documentary integrity, photographic provenance and visual storytelling.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-iii-02',
    sectionId: 'III_visual',
    order: 2,
    roleTitle: 'Editor of Editorial Data & Cartography',
    holderName: '',
    domainsRubric:
      'Spatial Intelligence · Cryospheric Research · Statistical Verification',
    mandateDescription:
      'Bridges KEW observatory datasets, geospatial intelligence and scientific research with sophisticated visual journalism and methodological transparency.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-iii-03',
    sectionId: 'III_visual',
    order: 3,
    roleTitle: 'Creative Director',
    holderName: '',
    domainsRubric:
      'Editorial Art Direction · Magazine Identity · Visual Architecture',
    mandateDescription:
      'Maintains the distinctive Himalayan Dispatch visual identity, cinematic presentation and premium editorial design.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-iii-04',
    sectionId: 'III_visual',
    order: 4,
    roleTitle: 'Senior Photo Editor',
    holderName: '',
    domainsRubric:
      'Image Curation · Photographic Verification · Documentary Ethics',
    mandateDescription:
      'Oversees photographic selection, caption accuracy, image attribution and documentary authenticity.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-iii-05',
    sectionId: 'III_visual',
    order: 5,
    roleTitle: 'Multimedia & Documentary Editor',
    holderName: '',
    domainsRubric:
      'Documentary Film · Digital Storytelling · Audio-Visual Journalism',
    mandateDescription:
      'Coordinates environmental documentaries, multimedia narratives, interviews and immersive editorial productions.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-iii-06',
    sectionId: 'III_visual',
    order: 6,
    roleTitle: 'Data Visualization Editor',
    holderName: '',
    domainsRubric:
      'Statistical Graphics · Scientific Illustration · Interactive Visualizations',
    mandateDescription:
      'Transforms complex environmental information into accurate, accessible and professionally designed visual narratives.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },

  // ── IV · REGIONAL BUREAUS & CORRESPONDENT NETWORK ────────────────────────
  {
    id: 'mp-iv-01',
    sectionId: 'IV_bureaus',
    order: 1,
    roleTitle: 'Director of Regional Correspondence',
    holderName: '',
    domainsRubric:
      'Regional Newsroom Coordination · Correspondent Development · Transboundary Reporting',
    mandateDescription:
      'Coordinates geographical reporting assignments, regional editorial standards, correspondent recruitment and environmental coverage across the six reporting regions.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-iv-02',
    sectionId: 'IV_bureaus',
    order: 2,
    roleTitle: 'Bureau Chief',
    holderName: '',
    domainsRubric: 'Kashmir Bureau · Active Reporting Desk',
    mandateDescription:
      'Kashmir Valley, Jhelum Basin & Pir Panjal–Greater Himalayan Flanks.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    bureauId: 'kashmir',
    bureauOperationalStatus: 'active_reporting_desk',
  },
  {
    id: 'mp-iv-03',
    sectionId: 'IV_bureaus',
    order: 3,
    roleTitle: 'Bureau Chief',
    holderName: '',
    domainsRubric: 'Jammu Bureau · Active Reporting Desk',
    mandateDescription:
      'Chenab Gorge, Pir Panjal Southern Escarpment & Shivalik Foothills.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    bureauId: 'jammu',
    bureauOperationalStatus: 'active_reporting_desk',
  },
  {
    id: 'mp-iv-04',
    sectionId: 'IV_bureaus',
    order: 4,
    roleTitle: 'Bureau Chief',
    holderName: '',
    domainsRubric: 'Ladakh Bureau · Active Reporting Desk',
    mandateDescription:
      'Trans-Himalayan Cold Desert · Indus, Shyok, Zanskar & Changthang.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    bureauId: 'ladakh',
    bureauOperationalStatus: 'active_reporting_desk',
  },
  {
    id: 'mp-iv-05',
    sectionId: 'IV_bureaus',
    order: 5,
    roleTitle: 'Bureau Chief',
    holderName: '',
    domainsRubric: 'AJ&K Bureau · In Establishment',
    mandateDescription:
      'Neelum Valley, Muzaffarabad Syntaxis & Mangla–Jhelum Catchments.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    bureauId: 'ajk',
    bureauOperationalStatus: 'in_establishment',
  },
  {
    id: 'mp-iv-06',
    sectionId: 'IV_bureaus',
    order: 6,
    roleTitle: 'Bureau Chief',
    holderName: '',
    domainsRubric: 'Gilgit Bureau · In Establishment',
    mandateDescription:
      'Western Karakoram, Hindu Raj & Upper Indus Confluence.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    bureauId: 'gilgit',
    bureauOperationalStatus: 'in_establishment',
  },
  {
    id: 'mp-iv-07',
    sectionId: 'IV_bureaus',
    order: 7,
    roleTitle: 'Bureau Chief',
    holderName: '',
    domainsRubric: 'Baltistan Bureau · In Establishment',
    mandateDescription:
      'Central Karakoram Icefields · Skardu, Shigar, Shyok & Baltoro.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    bureauId: 'baltistan',
    bureauOperationalStatus: 'in_establishment',
  },

  // ── V · EMPIRICAL & INDEPENDENT SCIENTIFIC REVIEW ────────────────────────
  {
    id: 'mp-v-01',
    sectionId: 'V_scientific_council',
    order: 1,
    roleTitle: 'Chair, Scientific Advisory & Review Council',
    holderName: '',
    domainsRubric:
      'Earth Systems Science · Multidisciplinary Research · Scientific Governance',
    mandateDescription:
      'Coordinates specialist scientific review, methodological integrity, reviewer independence and empirical verification.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: false,
  },
  {
    id: 'mp-v-02',
    sectionId: 'V_scientific_council',
    order: 2,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Glaciology & Cryosphere Sciences',
    mandateDescription: 'Specialist empirical peer review in Glaciology & Cryosphere Sciences.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-03',
    sectionId: 'V_scientific_council',
    order: 3,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Limnology & Freshwater Ecology',
    mandateDescription: 'Specialist empirical peer review in Limnology & Freshwater Ecology.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-04',
    sectionId: 'V_scientific_council',
    order: 4,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Hydrogeology & Karst Systems',
    mandateDescription: 'Specialist empirical peer review in Hydrogeology & Karst Systems.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-05',
    sectionId: 'V_scientific_council',
    order: 5,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Wetland Ecology & Conservation',
    mandateDescription: 'Specialist empirical peer review in Wetland Ecology & Conservation.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-06',
    sectionId: 'V_scientific_council',
    order: 6,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Atmospheric Physics & Climatology',
    mandateDescription: 'Specialist empirical peer review in Atmospheric Physics & Climatology.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-07',
    sectionId: 'V_scientific_council',
    order: 7,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Biodiversity & Ecosystem Science',
    mandateDescription: 'Specialist empirical peer review in Biodiversity & Ecosystem Science.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-08',
    sectionId: 'V_scientific_council',
    order: 8,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Remote Sensing & Geospatial Sciences',
    mandateDescription: 'Specialist empirical peer review in Remote Sensing & Geospatial Sciences.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-09',
    sectionId: 'V_scientific_council',
    order: 9,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Environmental Chemistry & Toxicology',
    mandateDescription: 'Specialist empirical peer review in Environmental Chemistry & Toxicology.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-10',
    sectionId: 'V_scientific_council',
    order: 10,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Geomorphology & Geological Sciences',
    mandateDescription: 'Specialist empirical peer review in Geomorphology & Geological Sciences.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-11',
    sectionId: 'V_scientific_council',
    order: 11,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Environmental Engineering & Impact Assessment',
    mandateDescription:
      'Specialist empirical peer review in Environmental Engineering & Impact Assessment.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-12',
    sectionId: 'V_scientific_council',
    order: 12,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Disaster Risk & Climate Resilience',
    mandateDescription: 'Specialist empirical peer review in Disaster Risk & Climate Resilience.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-13',
    sectionId: 'V_scientific_council',
    order: 13,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Environmental Economics & Sustainability',
    mandateDescription:
      'Specialist empirical peer review in Environmental Economics & Sustainability.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-14',
    sectionId: 'V_scientific_council',
    order: 14,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Statistical Modelling & Computational Sciences',
    mandateDescription:
      'Specialist empirical peer review in Statistical Modelling & Computational Sciences.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-15',
    sectionId: 'V_scientific_council',
    order: 15,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Environmental Health & Exposure Science',
    mandateDescription:
      'Specialist empirical peer review in Environmental Health & Exposure Science.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-16',
    sectionId: 'V_scientific_council',
    order: 16,
    roleTitle: 'Scientific Review Council Member',
    holderName: '',
    domainsRubric: 'Environmental Governance & Policy',
    mandateDescription: 'Specialist empirical peer review in Environmental Governance & Policy.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    isCouncilSpecialistRow: true,
  },

  // ── VI · FACT-CHECKING, VERIFICATION & EDITORIAL STANDARDS ───────────────
  {
    id: 'mp-vi-01',
    sectionId: 'VI_standards',
    order: 1,
    roleTitle: 'Director of Editorial Standards',
    holderName: '',
    domainsRubric:
      'Professional Journalism Ethics · Editorial Compliance · Institutional Accountability',
    mandateDescription:
      'Maintains editorial standards, verification procedures and professional conduct across all published editions.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vi-02',
    sectionId: 'VI_standards',
    order: 2,
    roleTitle: 'Chief Fact-Checker',
    holderName: '',
    domainsRubric:
      'Primary-Source Verification · Documentary Evidence · Claim Assessment',
    mandateDescription:
      'Maintains article-level verification records and ensures material factual claims are appropriately corroborated.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vi-03',
    sectionId: 'VI_standards',
    order: 3,
    roleTitle: 'Data & Evidence Verification Editor',
    holderName: '',
    domainsRubric:
      'Statistical Accuracy · Dataset Provenance · Empirical Validation',
    mandateDescription:
      'Reviews quantitative information, scientific datasets, calculations and methodological claims.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vi-04',
    sectionId: 'VI_standards',
    order: 4,
    roleTitle: 'Digital & Visual Verification Editor',
    holderName: '',
    domainsRubric:
      'Digital Forensics · Image Authenticity · Open-Source Verification',
    mandateDescription:
      'Assesses photographic provenance, digital evidence, synthetic media and potentially manipulated content.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vi-05',
    sectionId: 'VI_standards',
    order: 5,
    roleTitle: 'Corrections & Clarifications Editor',
    holderName: '',
    domainsRubric:
      'Publication Corrections · Editorial Transparency · Archival Accuracy',
    mandateDescription:
      'Maintains public correction notices, clarification records, article amendments and version histories.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },

  // ── VII · MEDIA LAW, SOURCE PROTECTION & JOURNALIST SAFETY ───────────────
  {
    id: 'mp-vii-01',
    sectionId: 'VII_legal_safety',
    order: 1,
    roleTitle: 'Media Law & Editorial Affairs Counsel',
    holderName: '',
    domainsRubric: 'Media Law · Privacy · Defamation · Intellectual Property',
    mandateDescription:
      'Provides qualified legal assessment of sensitive reporting, investigative allegations, copyright obligations and publication risks.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vii-02',
    sectionId: 'VII_legal_safety',
    order: 2,
    roleTitle: 'Source Protection & Confidentiality Officer',
    holderName: '',
    domainsRubric:
      'Confidential Communications · Source Ethics · Evidence Protection',
    mandateDescription:
      'Develops secure procedures for confidential sources, protected records and unpublished investigative materials.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vii-03',
    sectionId: 'VII_legal_safety',
    order: 3,
    roleTitle: 'Journalist Safety & Digital Security Coordinator',
    holderName: '',
    domainsRubric:
      'Reporter Safety · Digital Security · Editorial Risk Management',
    mandateDescription:
      'Coordinates risk assessments and security safeguards for correspondents, investigative journalists and sensitive reporting assignments.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-vii-04',
    sectionId: 'VII_legal_safety',
    order: 4,
    roleTitle: 'Rights & Permissions Editor',
    holderName: '',
    domainsRubric:
      'Copyright · Content Licensing · Intellectual Property Protection',
    mandateDescription:
      'Manages publication permissions, photographic rights, contributor agreements and authorized content reproduction.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
    anchorId: 'rights-permissions',
  },

  // ── VIII · PUBLIC EDITOR & READER ACCOUNTABILITY ─────────────────────────
  {
    id: 'mp-viii-01',
    sectionId: 'VIII_public_editor',
    order: 1,
    roleTitle: 'Public Editor & Editorial Ombudsperson',
    holderName: '',
    domainsRubric:
      'Reader Accountability · Editorial Independence · Public Complaints',
    mandateDescription:
      'Independently evaluates reader concerns, serious editorial complaints, conflicts of interest and potential breaches of the publication’s ethical charter.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-viii-02',
    sectionId: 'VIII_public_editor',
    order: 2,
    roleTitle: 'Reader Relations Editor',
    holderName: '',
    domainsRubric:
      'Public Correspondence · Readership Engagement · Editorial Feedback',
    mandateDescription:
      'Maintains structured communication between readers, contributors and the Editorial Directorate.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },

  // ── IX · DIGITAL PUBLISHING & INTERNATIONAL CIRCULATION ──────────────────
  {
    id: 'mp-ix-01',
    sectionId: 'IX_digital_publishing',
    order: 1,
    roleTitle: 'Director of Digital Publishing',
    holderName: '',
    domainsRubric:
      'Digital Publications · Editorial Technology · International Distribution',
    mandateDescription:
      'Oversees digital production, edition publication, platform management and worldwide distribution.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ix-02',
    sectionId: 'IX_digital_publishing',
    order: 2,
    roleTitle: 'Production & Editions Editor',
    holderName: '',
    domainsRubric:
      'Edition Assembly · Editorial Scheduling · Publication Production',
    mandateDescription:
      'Coordinates final edition preparation, article sequencing, publication schedules and archive completeness.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ix-03',
    sectionId: 'IX_digital_publishing',
    order: 3,
    roleTitle: 'Audience Development & Circulation Editor',
    holderName: '',
    domainsRubric:
      'Global Readership · Digital Discovery · Audience Intelligence',
    mandateDescription:
      'Develops readership strategies, editorial discoverability and international circulation without compromising journalistic independence.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
  {
    id: 'mp-ix-04',
    sectionId: 'IX_digital_publishing',
    order: 4,
    roleTitle: 'Digital Archives & Publications Editor',
    holderName: '',
    domainsRubric:
      'Digital Preservation · Edition Archives · Institutional Records',
    mandateDescription:
      'Maintains historical editions, permanent publication records, archival documentation and digital preservation standards.',
    status: 'Under Review',
    publicVacantLabel: 'Appointment Pending',
  },
];

export const EDITORIAL_CHARTER_COMMITMENTS: EditorialCharterCommitment[] = [
  {
    principle: 'Editorial independence',
    standard: 'Freedom from improper institutional, political and commercial interference',
  },
  {
    principle: 'Scientific integrity',
    standard: 'Evidence-based interpretation and acknowledgment of uncertainty',
  },
  {
    principle: 'Accuracy',
    standard: 'Verification of material factual claims',
  },
  {
    principle: 'Fairness',
    standard: 'Accurate representation of relevant perspectives',
  },
  {
    principle: 'Right of reply',
    standard: 'Reasonable opportunity to respond to significant allegations',
  },
  {
    principle: 'Source confidentiality',
    standard: 'Protection of confidential sources and sensitive records',
  },
  {
    principle: 'Documentary integrity',
    standard: 'No misleading manipulation of documentary evidence',
  },
  {
    principle: 'Visual & archival authenticity',
    standard: 'Strict verification of documentary media and primary archival records',
  },
  {
    principle: 'Conflict of interest',
    standard: 'Disclosure and management of competing interests',
  },
  {
    principle: 'Public accountability',
    standard: 'Accessible complaints, corrections and clarifications',
  },
  {
    principle: 'Journalist safety',
    standard: 'Appropriate physical, legal and digital safeguards',
  },
  {
    principle: 'Financial transparency',
    standard: 'Disclosure of material funding and sponsorship relationships',
  },
  {
    principle: 'Copyright protection',
    standard: 'Respect for intellectual property and contributor rights',
  },
  {
    principle: 'Environmental responsibility',
    standard: 'Protection of sensitive ecosystems and wildlife locations',
  },
  {
    principle: 'Editorial transparency',
    standard: 'Clear distinction between reporting, analysis, opinion and sponsored content',
  },
];

export const EDITORIAL_REPORTING_BEATS: Array<{
  code: string;
  title: string;
  leadDepartmentId: string;
  description: string;
}> = [
  {
    code: 'BEAT 01',
    title: 'Cryosphere, Glaciers & High Passes',
    leadDepartmentId: 'cover-stories',
    description: 'Mass-balance thresholds, surging Karakoram ice, permafrost thaw, GLOF hazards, and winter snowline retreat above 3,500 meters.',
  },
  {
    code: 'BEAT 02',
    title: 'Lakes, Wetlands, Springs & Urban Waterways',
    leadDepartmentId: 'longform-features',
    description: 'Lacustrine bathymetry, Ramsar marshes, disappearing karst springsheds, and floodplain urbanization across Himalayan valleys.',
  },
  {
    code: 'BEAT 03',
    title: 'Transboundary Rivers & Hydropower',
    leadDepartmentId: 'investigative-journalism',
    description: 'Indus, Jhelum, Chenab, Kishanganga–Neelum, and Shyok flow regimes, tunnel muck disposal, and environmental clearance scrutiny.',
  },
  {
    code: 'BEAT 04',
    title: 'Alpine Biodiversity, Forests & Pastoral Commons',
    leadDepartmentId: 'field-reports',
    description: 'Endangered mountain ungulates, migratory flyways, temperate conifers, medicinal flora, and Bakarwal–Changpa seasonal grazing routes.',
  },
  {
    code: 'BEAT 05',
    title: 'Earth Observation, Cartography & Climate Records',
    leadDepartmentId: 'data-journalism',
    description: 'Multi-decadal satellite reanalysis, elevation-band warming, air-shed inversions, and bespoke print-grade cartographic essays.',
  },
  {
    code: 'BEAT 06',
    title: 'Documentary Photography & Oral Mountain Memory',
    leadDepartmentId: 'photo-essays',
    description: 'Large-format monochrome and natural-light visual sequences paired with oral histories of elders, scientists, and land custodians.',
  },
  {
    code: 'BEAT 07',
    title: 'Environmental Legacy & Conservation Accountability',
    leadDepartmentId: 'cover-stories',
    description: 'Frontline forest and wildlife defenders, Green Martyrs memorial verification, occupational safety, bereaved family welfare, and institutional conservation accountability.',
  },
];
