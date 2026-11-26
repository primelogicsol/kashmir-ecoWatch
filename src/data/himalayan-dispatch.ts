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
    pgpFingerprintNote: 'Encrypted Signal & PGP key available via the Editorial Desk for source-protected tips.',
  },
  {
    slug: 'aaliya-andrabi',
    name: 'Aaliya Andrabi',
    roleTitle: 'Managing Editor, Investigations & Dispatches',
    beat: 'Urban Waterways, Springsheds, Wetlands & Infrastructure',
    basedIn: 'Srinagar',
    portraitUrl: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    shortBio:
      'Chronicles buried canals, karst springs, floodplain encroachment, and municipal water memory across the Jhelum basin.',
    extendedBio: [
      'Aaliya Andrabi reports on the intimate architecture of water in the Kashmir Valley—from seventeenth-century stone ghats and neighborhood nag springs to modern flood-spill channels and riverbed extraction corridors.',
      'Her work combines municipal archive excavation, bathymetric and water-quality records, and months-long neighborhood reporting.',
    ],
    languages: ['English', 'Kashmiri', 'Urdu', 'Persian (Archival)'],
    awardsAndFellowships: [
      'South Asian Water & Cities Literary Journalism Commendation',
      'KEW Visiting Fellow in Investigative Ecology',
    ],
    pgpFingerprintNote: 'Accepts documentary filings via verified Himalayan Dispatch secure drop.',
  },
  {
    slug: 'danish-wani',
    name: 'Danish Wani',
    roleTitle: 'Director of Photography & Visual Editions',
    beat: 'Monochrome Landscape Plates, Winter Passes & Pastoral Portraits',
    basedIn: 'Srinagar & Pahalgam',
    portraitUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
    shortBio:
      'Works in medium-format and monochrome digital plates documenting winter transitions, snowline memory, and mountain communities.',
    extendedBio: [
      'Danish Wani approaches environmental photography as slow archival witness rather than rapid news illustration, often returning to the same ridgeline or pass across five consecutive winters.',
      'At Himalayan Dispatch, he directs visual pacing, plate sequencing, and photographic ethics across every edition.',
    ],
    languages: ['English', 'Kashmiri', 'Urdu'],
    awardsAndFellowships: [
      'Himalayan Documentary Monochrome Prize',
      'International Mountain Archive Residency',
    ],
  },
  {
    slug: 'dr-nida-hamdani',
    name: 'Dr. Nida Hamdani',
    roleTitle: 'Editor of Editorial Data & Cartography',
    beat: 'Climate Reanalysis, Snowline Geometry & Environmental Economics',
    basedIn: 'Srinagar & Loudoun County',
    portraitUrl: '/images/publications/geospatial-gis-earth-observation-lab.jpg',
    shortBio:
      'Transforms multi-decadal satellite and station datasets into quiet, print-inspired visual narratives for general readers.',
    extendedBio: [
      'Trained in mountain climatology and information design, Dr. Nida Hamdani leads Himalayan Dispatch’s editorial graphics desk, translating complex elevation-band series into bespoke typographic charts.',
      'Every graphic published under her desk undergoes dual verification with the Kashmir EcoWatch scientific archive.',
    ],
    languages: ['English', 'Urdu', 'Kashmiri'],
    awardsAndFellowships: [
      'Society for Editorial Information Design Citation',
      'Earth Observation Storytelling Fellow',
    ],
  },
  {
    slug: 'rafiq-ahmad-bhat',
    name: 'Rafiq Ahmad Bhat',
    roleTitle: 'Field Correspondent — Forests, Wetlands & Stewardship',
    beat: 'Community Conservation, Migratory Flyways & Alpine Meadows',
    basedIn: 'Bandipora & Anantnag',
    portraitUrl: '/images/publications/forestry-betula-treeline-lidar.jpg',
    shortBio:
      'Files field dispatches from Wular, Hokersar, Dachigam corridors, and community-guarded deodar forests.',
    extendedBio: [
      'Rafiq Ahmad Bhat spends most of the year in wetland reedbeds and temperate forest compartments, listening to boatmen, wildlife watchers, and village forest committees.',
      'His dispatches examine the quiet daily labor required to keep fragile ecological boundaries intact.',
    ],
    languages: ['Kashmiri', 'Gojri', 'Urdu', 'English'],
    awardsAndFellowships: [
      'Central Asian Flyway Reporting Bursary',
    ],
  },
];

export const EDITORIAL_BOARD_MEMBERS: EditorialBoardMember[] = [
  {
    id: 'eb-01',
    name: 'Dr. Fayaz Ahmad Khan',
    mastheadRole: 'Founding Editor-in-Chief',
    institutionalAffiliation: 'Himalayan Dispatch Editorial Desk · KEW Western Himalayas',
    disciplineOrSpecialty: 'Environmental Geospatial Science, Watershed Resilience & Longform Editorial Direction',
    location: 'KEW Western Himalayas',
    bio: 'Stewards editorial independence, narrative voice, scientific integrity, and edition architecture across every issue of Himalayan Dispatch.',
    group: 'masthead_leadership',
  },
  {
    id: 'eb-02',
    name: 'Aaliya Andrabi',
    mastheadRole: 'Managing Editor, Investigations & Dispatches',
    institutionalAffiliation: 'Himalayan Dispatch Editorial Desk',
    disciplineOrSpecialty: 'Documentary Accountability, Right-of-Reply & Source Protection',
    location: 'Srinagar',
    bio: 'Oversees commissions, investigative standards, confidential source protocols, and pre-publication legal review.',
    group: 'masthead_leadership',
  },
  {
    id: 'eb-03',
    name: 'Danish Wani',
    mastheadRole: 'Director of Photography & Visual Editions',
    institutionalAffiliation: 'Himalayan Dispatch Visual Desk',
    disciplineOrSpecialty: 'Cinematic Documentary Photography & Archival Plates',
    location: 'Kashmir Valley & Western Himalayas',
    bio: 'Guides full-bleed visual essays, field commission ethics, and zero-manipulation documentary plate standards.',
    group: 'visual_and_fact_checking',
  },
  {
    id: 'eb-04',
    name: 'Dr. Nida Hamdani',
    mastheadRole: 'Editor of Editorial Data & Cartography',
    institutionalAffiliation: 'Himalayan Dispatch × KEW Synthesis',
    disciplineOrSpecialty: 'Cryospheric Series, Spatial Graphics & Statistical Verification',
    location: 'Srinagar & Virginia',
    bio: 'Bridges KEW observatory datasets with bespoke print-caliber visual journalism and methodological transparency.',
    group: 'visual_and_fact_checking',
  },
  {
    id: 'eb-05',
    name: 'Council of Senior Limnology & Cryosphere Reviewers',
    mastheadRole: 'Scientific Review Panel',
    institutionalAffiliation: 'Kashmir EcoWatch Western Himalayan Scientific Network',
    disciplineOrSpecialty: 'Glaciology, Karst Hydrogeology, Wetland Ecology & Atmospheric Physics',
    location: 'Multi-Regional',
    bio: 'Conducts Stage 05 Scientific Review on all empirical assertions prior to editorial sign-off, without dictating literary voice.',
    group: 'scientific_review_council',
  },
  {
    id: 'eb-06',
    name: 'Office of Editorial Standards & Verification',
    mastheadRole: 'Fact-Checking & Corrections Ombudsperson',
    institutionalAffiliation: 'Himalayan Dispatch Independent Standards Desk',
    disciplineOrSpecialty: 'Primary-Source Verification, Statutory Citations & Public Corrections',
    location: 'Loudoun County & Srinagar',
    bio: 'Maintains line-by-line fact-checking dossiers and publishes transparent post-publication clarifications.',
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
    publicationDateLabel: 'Inaugural Edition · Autumn–Winter 2026',
    publishedIsoDate: '2026-11-25',
    coverImage: '/images/environmental-pil/forest-moratorium-river-basin.jpg',
    coverLocation: 'Verinag, Doda & Western Himalayan Forest Compartments · Jammu & Kashmir',
    coverCaption:
      'Illustrative Western Himalayan deodar forest and river-basin watershed protected by generations of frontline conservation personnel (illustrative documentary plate — not a specific incident photograph).',
    coverCredit: 'Himalayan Dispatch × KEW Documentary Landscape Archive',
    editorsNoteTitle: 'A Quiet Room Beside the Instruments',
    editorsNoteBody: [
      'Across Kashmir EcoWatch, sensors, satellite passes, and hydrological ledgers measure the Western Himalayas with necessary precision. Yet numbers alone rarely explain the human cost of keeping a mountain watershed standing, or what happens to a home in Verinag or Doda when a forest guard never returns from duty.',
      'Himalayan Dispatch was founded to build a different kind of room: unhurried, literary, visually uncompromising, and anchored in verifiable truth. Our inaugural cover story—The Price of Protecting Paradise—turns toward the forgotten guardians of Kashmir’s forests, reconciling official memorials with lived occupational realities and asking who protects the protectors.',
      'Beside it across Volume 01, our correspondents listen to high cirque lakes beneath Haramukh, trace Srinagar’s buried waterways, stand at dawn along Hokersar’s reedlines, and examine thirty-eight winters of snowline retreat.',
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
    editorsNoteAuthor: 'Aaliya Andrabi',
    editorsNoteRole: 'Managing Editor, Investigations & Dispatches',
    storySlugs: [],
  },
  {
    id: 'ed-monograph-00',
    slug: 'monograph-00-watershed-voices',
    volumeLabel: 'PRE-INAUGURAL FOLIO / NO. 00',
    issueNumberLabel: 'FOUNDING MONOGRAPH',
    status: 'archived',
    title: 'Notes from the Upper Jhelum',
    themeKicker: 'ARCHIVAL CHARTER FOLIO',
    subtitle:
      'A founding literary monograph tracing water from Verinag’s limestone arcades to the Wular floodplain.',
    publicationDateLabel: 'Founding Monograph · Summer 2026',
    publishedIsoDate: '2026-07-15',
    coverImage: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
    coverLocation: 'Wular Floodplain & Erin Catchment · Bandipora',
    coverCaption:
      'Evening light across the Wular willow marshes and open water mirror following summer snowmelt.',
    coverCredit: 'Himalayan Dispatch Founding Folio',
    editorsNoteTitle: 'Before the First Volume',
    editorsNoteBody: [
      'Published as a slim founding folio ahead of Volume 01, Notes from the Upper Jhelum established the typographic, ethical, and field-reporting grammar of Himalayan Dispatch.',
    ],
    editorsNoteAuthor: 'Dr. Fayaz Ahmad Khan',
    editorsNoteRole: 'Founding Editor-in-Chief',
    storySlugs: ['notes-from-the-upper-jhelum-headwaters'],
  },
];

export const MAGAZINE_STORIES: MagazineStory[] = [
  // ── INAUGURAL COVER STORY: THE PRICE OF PROTECTING PARADISE ───────────────
  THE_PRICE_OF_PROTECTING_PARADISE_STORY,

  // ── FOUNDING HARAMUKH COVER INQUIRY ───────────────────────────────────────
  {
    id: 'hd-story-01',
    slug: 'when-mountains-speak-who-is-listening',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'cover-stories',
    departmentRubric: 'FOUNDING COVER ESSAY',
    folioCode: '00B / COVER ESSAY',
    title: 'When Mountains Speak, Who Is Listening?',
    subtitle:
      'An exploration of fragile landscapes, human ambition and the ecological future of the Himalayas.',
    excerpt:
      'At 3,570 meters beneath Haramukh’s fluted granite wall, the shoreline of Gangbal records every warm night, every hurried road cut below, and every shift in the monsoon’s reach.',
    dateline: 'GANGBAL BASIN · MOUNT HARAMUKH, 3,570 M',
    region: 'Central Kashmir & Great Himalayan Range',
    readingTimeMinutes: 14,
    wordCount: 3650,
    publishedAt: '2026-11-01',
    heroImage: '/images/himalayan-dispatch/cover-gangbal-inaugural.jpg',
    heroCaption:
      'Twilight settles over Gangbal Lake beneath the north-west ramparts of Mount Haramukh as October wind clears the high cirque.',
    heroCredit: 'Himalayan Dispatch Visual Desk',
    journalistSlug: 'dr-fayaz-ahmad-khan',
    bylineDisplay: 'Dr. Fayaz Ahmad Khan',
    bylineRole: 'Founding Editor-in-Chief',
    photographyByline: 'Danish Wani',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Cryosphere & Alpine Limnology Panel',
    workflowStage: 'publication',
    isPublished: true,
    isFeaturedCoverStory: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'The Acoustic Basin',
        subtitle: 'Before instruments register a threshold, high valleys announce it in sound.',
        dateline: 'WANGATH VALLEY TO NUNDKOL',
        paragraphs: [
          'Long before a satellite pass flags an anomaly in surface reflectance, a high Himalayan cirque speaks in stone and water. At dusk beside Gangbal, the first sound is not wind but the dry, intermittent clatter of frost-wedged gneiss letting go from the couloirs of Haramukh—rockfall arriving two hours later into the evening than older shepherds remember from their youth.',
          'We tend to speak of mountains as monuments: fixed, indifferent, geological. Yet anyone who earns a living above the birch line knows the Western Himalayas as a restlessly communicative archive. Snow bridges soften weeks ahead of custom; meltwater turns milky with glacial flour in late August when clean spring baseflow once prevailed; alpine sedges creep upslope into hollows that held perennial névé.',
          'Over the past decade, human ambition has climbed nearly as fast as the freezing isotherm. Tunnels pierce divide ridges, widened carriageways slice across unconsolidated moraines, and seasonal trails absorb footfalls once spread across months into frantic fortnightly surges. Each intervention promises connectivity; few pause to ask what the slope itself is trying to say.',
        ],
        pullQuote: {
          quote:
            'A mountain never collapses without rehearsal. First the springs change temperature, then the birch bark dries early, and only last does the hillside move.',
          attribution: 'Field testimony recorded above Naranag, 3,120 m',
          context: 'Autumn pastoral descent notebook',
        },
        fieldNote: {
          label: 'ELEVATION DATUM',
          detail:
            'Gangbal–Nundkol twin oligotrophic cirque lakes sit at 3,570 m and 3,505 m, feeding the Wangath–Sindh river system—a primary drinking-water lifeline for Srinagar.',
          coordinates: '34.432° N, 74.925° E',
        },
      },
      {
        numberRoman: 'II',
        title: 'Ambition in Thin Air',
        subtitle: 'Where engineering timelines collide with Holocene sediment.',
        paragraphs: [
          'In metropolitan planning rooms, Himalayan valleys are still drawn on flat white paper where rivers behave like blue ribbons and contours look tame at 1:50,000 scale. On the ground, a single road bench cut at sixty-five degrees into saturated glacial till sets off a decade of creeping slumps.',
          'What makes the current moment decisive is synchronization. Climate warming raises the rain-on-snow line during western disturbances at the exact historical moment that concrete footprints expand into floodways, karewa tablelands, and subalpine meadows. Neither force acts alone; they amplify one another in every storm.',
          'Listening, in this context, is not romantic mysticism. It is institutional humility: designing buffers wide enough for a hundred-year discharge, leaving alpine lake shorelines unpaved, and recognizing that pastoralists, boatmen, and glaciologists are reading pages of the same book.',
        ],
        plate: {
          imageUrl: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
          caption:
            'High-altitude glacial tarn geometry in the Western Himalayas, where oligotrophic waters register subtle shifts in melt timing and visitor load.',
          credit: 'KEW × Himalayan Dispatch Archival Plate',
          aspect: 'wide',
        },
      },
      {
        numberRoman: 'III',
        title: 'An Ethics of Attention',
        subtitle: 'Toward a journalism worthy of the watershed.',
        paragraphs: [
          'If Kashmir EcoWatch’s observatories give our region eyes capable of measuring micrograms per liter and millimeters of slope displacement, journalism must supply memory and consequence. Data tells us that a spring’s discharge has fallen forty percent; storytelling asks who wakes at four in the morning to carry water up a stone stair.',
          'When mountains speak, they do not plead. Gravity, phase change, and sediment transport follow physical law without regard for press releases. Whether our cities, courts, and communities choose to listen will decide what remains habitable—and sacred—between the Pir Panjal and the Karakoram.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Explore Cryosphere & Alpine Lakes Telemetry',
      href: '/water-systems/glaciers',
      scientificContext: 'Cross-referenced with KEW Water Systems & Cryosphere baselines.',
    },
    seoKeywords: [
      'Himalayan Dispatch',
      'Gangbal Lake journalism',
      'Western Himalayas climate essay',
      'Mount Haramukh ecology',
      'Kashmir environmental magazine',
    ],
  },

  // ── 01 / THE BIG READ (LONGFORM FEATURE) ─────────────────────────────────
  {
    id: 'hd-story-02',
    slug: 'the-water-we-have-forgotten',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'longform-features',
    departmentRubric: '01 / THE BIG READ',
    folioCode: '01 / THE BIG READ',
    title: 'The Water We Have Forgotten',
    subtitle: 'A longform environmental feature on Srinagar’s lost canals, drowned ghats, and hydraulic memory.',
    excerpt:
      'Beneath paved lanes and culverted drains lies an amphibious city built to breathe with seasonal floodwaters—a masterpiece of vernacular hydrology erased within two generations.',
    dateline: 'SRINAGAR OLD CITY · MAR CANAL & BRARI NAMBAL',
    region: 'Kashmir Valley · Jhelum Urban Basin',
    readingTimeMinutes: 18,
    wordCount: 4480,
    publishedAt: '2026-11-01',
    heroImage: '/images/himalayan-dispatch/big-read-forgotten-water.jpg',
    heroCaption:
      'Morning mist over stone steps and autumn chinar reflections along a quiet backwater channel in Srinagar.',
    heroCredit: 'Himalayan Dispatch Documentary Plate',
    journalistSlug: 'aaliya-andrabi',
    bylineDisplay: 'Aaliya Andrabi',
    bylineRole: 'Managing Editor, Investigations & Dispatches',
    photographyByline: 'Danish Wani',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Urban Hydrology & Wetland Systems Desk',
    workflowStage: 'publication',
    isPublished: true,
    isBigRead: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'Stone Steps Leading Into Asphalt',
        subtitle: 'Tracing a fifteenth-century waterway beneath a twenty-first-century traffic corridor.',
        dateline: 'ZAINA KADAL TO NAWAKADAL',
        paragraphs: [
          'Walk closely along the shopfronts of old Srinagar at six in the morning, before shutters rise, and you begin to notice staircases descending into solid roadbed. Carved from grey Devri limestone, worn concave at the center by centuries of bare feet and copper water vessels, three top steps remain visible above the tarmac while the rest vanish underground.',
          'Those buried steps once met the Nallah Mar—a navigable artery commissioned in the fifteenth century by Sultan Zain-ul-Abidin to link Dal Lake’s sweet waters with the Jhelum and the western marshes of Anchar. Boatmen ferried grain, brick, lotus root, and winter firewood beneath arched stone bridges whose names still survive on bus signboards even though no water has passed beneath them since the 1970s.',
          'When planners filled the canal to build a motorable road, they believed they were trading stagnant water for modern speed. What they severed was a living hydraulic lung: the gravity-fed circulation that flushed inner-city lagoons and cushioned the valley floor whenever mountain rain swelled the Jhelum.',
        ],
        pullQuote: {
          quote:
            'Our elders never built walls against water; they built rooms where floodwater could rest until the river calmed.',
          attribution: 'Master stonemason & archival informant, Downtown Srinagar',
          context: 'Recorded beside a surviving limestone yarbal ghat',
        },
        fieldNote: {
          label: 'ARCHIVAL HYDRAULICS',
          detail:
            'Historical survey sheets from 1893–1924 document an interconnected network of canals, marshes, and detention basins linking Dal, Brari Nambal, Khushalsar, Gilsar, and Anchar.',
        },
      },
      {
        numberRoman: 'II',
        title: 'The Grammar of the Yarbal',
        subtitle: 'Why losing neighborhood water landings changed civic stewardship.',
        paragraphs: [
          'In Kashmiri, the word yarbal names far more than a river landing. It was the threshold where household life met ecological consequence: if a upstream neighbor fouled the channel at dawn, ten households downstream saw it before breakfast. Accountability was visual, immediate, and communal.',
          'Piped water inside domestic walls brought undeniable relief, particularly for women in winter. Yet in turning our backs to the riverbanks—reclassifying wetlands as wastelands and backwaters as municipal drains—the city lost the daily habit of watching water clarity.',
        ],
        plate: {
          imageUrl: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
          caption:
            'Lacustrine channels and timber craft on Dal Lake at first light, where water circulation depends on fragile inlet and outlet hydraulics.',
          credit: 'Himalayan Dispatch Visual Archive',
          aspect: 'wide',
        },
      },
      {
        numberRoman: 'III',
        title: 'Remembering Forward',
        subtitle: 'Can an urban basin relearn permeability?',
        paragraphs: [
          'Across Asia and Europe, cities that buried their streams under twentieth-century concrete are painstakingly daylighting them to survive twenty-first-century cloudbursts. For Srinagar, recovery will not mean rebuilding the past stone for stone, nor pretending a city of over a million residents can return to oar-powered commerce.',
          'It begins, instead, by refusing further erasure: protecting the remaining narrow throats between Khushalsar and Anchar, treating surviving springs and marshes as critical civic infrastructure rather than vacant real estate, and teaching a new generation that beneath every flooded street lies a forgotten waterway trying to find its old bed.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'View KEW Lakes & Urban Water Quality Baselines',
      href: '/water-systems/lakes',
      scientificContext: 'Companion hydrological records in KEW Water Systems.',
    },
    seoKeywords: [
      'The Water We Have Forgotten',
      'Nallah Mar Srinagar history',
      'Kashmir urban waterways longform',
      'yarbal ghats Kashmir ecology',
    ],
  },

  // ── 02 / DISPATCHES FROM THE FIELD — WETLANDS ────────────────────────────
  {
    id: 'hd-story-03',
    slug: 'where-the-wild-waters-end',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'field-reports',
    departmentRubric: 'WETLANDS · DISPATCHES FROM THE FIELD',
    folioCode: '02A / FIELD DISPATCH',
    title: 'Where the Wild Waters End',
    subtitle: 'Documenting the changing boundaries between nature and urban life.',
    excerpt:
      'At first frost on the reed margins of Hokersar, hundreds of thousands of migratory waterfowl descend from Central Asia onto a shrinking mirror hemmed in by bunds, silt, and suburban headlights.',
    dateline: 'HOKERSAR & SHALLABUGH WETLAND MARGINS',
    region: 'Central & North Kashmir Floodplain',
    readingTimeMinutes: 9,
    wordCount: 2240,
    publishedAt: '2026-11-01',
    heroImage: '/images/biodiversity/biodiversity-birds-wetland.jpg',
    heroCaption:
      'Winter waterfowl lifting off shallow reed channels along the Kashmir valley wetland flyway.',
    heroCredit: 'Himalayan Dispatch Field Archive',
    journalistSlug: 'rafiq-ahmad-bhat',
    bylineDisplay: 'Rafiq Ahmad Bhat',
    bylineRole: 'Field Correspondent',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Avian & Ramsar Wetland Desk',
    workflowStage: 'publication',
    isPublished: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'The Reedline at Dawn',
        dateline: 'ZAINAKOTE REED MARGIN · 06:12 IST',
        paragraphs: [
          'Stand on the earthen embankment at Hokersar twenty minutes before sunrise in November and you hear two worlds overlapping in the dark. To the north-west, across frost-whitened Typha reeds, rises the whistling wingbeat of Northern Pintails, Eurasian Wigeons, and Gadwalls arriving from Siberian and Kazakh breeding grounds. Behind your shoulder, three hundred meters away, diesel trucks downshift along the highway bypass.',
          'Nowhere in the Western Himalayas is the seam between wildness and urbanization drawn thinner. Every autumn, the Ramsar wetlands of the Jhelum floodplain perform a small miracle of continental hospitality—yet each decade they must perform it inside a shallower, more silted bowl.',
        ],
        pullQuote: {
          quote:
            'The birds still keep their appointment from three thousand kilometers away. The question is whether we will keep ours on the ground.',
          attribution: 'Wetland boatman & seasonal reed-cutter, Hokersar perimeter',
        },
        fieldNote: {
          label: 'FLYWAY CONTEXT',
          detail:
            'Kashmir’s valley wetlands form a vital staging and wintering hub along the Central Asian Flyway, regulated by autumn water-level retention gates and tributary siltation.',
        },
      },
      {
        numberRoman: 'II',
        title: 'Silt, Gates, and Headlights',
        paragraphs: [
          'What threatens a floodplain marsh is rarely a single dramatic bulldozer; it is the quiet arithmetic of upstream erosion and perimeter hardening. Flood-spill silt raises the marsh bed centimeter by centimeter, turning open diving-duck water into dry willow scrub unless seasonal flushing is carefully managed.',
          'Along the outer bunds, streetlamp glare and stray dog packs alter nocturnal feeding zones, pushing shy dabbling flocks into tighter central pools. Yet where hydraulic gates hold winter depth steady and perimeter buffers stay dark, life rebounds with astonishing speed.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Inspect Ramsar Wetland Intelligence',
      href: '/water-systems/wetlands',
      scientificContext: 'KEW Wetland Reserves & Migration Windows.',
    },
    seoKeywords: [
      'Where the Wild Waters End',
      'Hokersar migratory birds journalism',
      'Kashmir wetlands urban boundary',
    ],
  },

  // ── 02 / DISPATCHES FROM THE FIELD — COMMUNITIES ─────────────────────────
  {
    id: 'hd-story-04',
    slug: 'the-people-who-guard-the-forest',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'field-reports',
    departmentRubric: 'COMMUNITIES · DISPATCHES FROM THE FIELD',
    folioCode: '02B / FIELD DISPATCH',
    title: 'The People Who Guard the Forest',
    subtitle: 'Stories of stewardship from mountain communities.',
    excerpt:
      'In snow-bound hamlets along the Pir Panjal and Lidder flanks, unwritten rotational rules, night patrols, and women’s fuelwood collectives protect deodar and birch stands when formal rangers are miles away.',
    dateline: 'DAKSUM & UPPER LIDDER FOREST COMPARTMENTS',
    region: 'South Kashmir & Pir Panjal',
    readingTimeMinutes: 10,
    wordCount: 2410,
    publishedAt: '2026-11-01',
    heroImage: '/images/publications/forestry-betula-treeline-lidar.jpg',
    heroCaption:
      'High-elevation Himalayan birch (Betula utilis) and conifer transition stands guarded by seasonal community norms.',
    heroCredit: 'Himalayan Dispatch Field Plate',
    journalistSlug: 'rafiq-ahmad-bhat',
    bylineDisplay: 'Rafiq Ahmad Bhat',
    bylineRole: 'Field Correspondent',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Forest Ecosystems & Community Stewardship Desk',
    workflowStage: 'publication',
    isPublished: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'Only Deadwood Before Snow',
        dateline: 'UPPER BRINGI WATERSHED · 2,480 M',
        paragraphs: [
          'Every October, before early snow seals the upper bridle paths above Daksum, village elders and women’s hearth committees agree on which side-ravines may be entered for fallen deadwood and which slopes remain strictly closed to axe or saw. No gazette notification hangs on the walnut tree by the mosque, yet everyone knows the boundary.',
          'For centuries across Kashmir, ecological restraint was distilled into Sheikh Noor-ud-Din’s famous aphorism—food will endure only so long as the forest endures. In highland villages exposed to spring avalanches and flash torrents, that proverb is not poetry; it is civil engineering. Strip the silver fir and Himalayan birch above a hamlet, and the first March thaw brings the mountain down onto your roof.',
        ],
        pullQuote: {
          quote:
            'A standing deodar above our village is worth ten concrete retaining walls. It holds the snow in winter and feeds our spring in July.',
          attribution: 'Village forest committee elder, Bringi Valley',
        },
      },
      {
        numberRoman: 'II',
        title: 'The Night Watch in Dry Novembers',
        paragraphs: [
          'As autumns grow drier and November snow arrives late, forest-floor litter turns tinder-crisp across south-facing slopes. When smoke rises at dusk in remote compartments hours from motorable roads, it is almost always local youths, shepherds, and beat guards climbing shoulder to shoulder with pine-bough beaters and spades who cut firelines in the dark.',
          'Recognizing mountain communities not as encroachers to be policed, but as first responders and co-custodians of the treeline, remains the single most overdue reform in Himalayan conservation.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Explore Forest Ecosystems & Protected Corridors',
      href: '/biodiversity/forest-ecosystems',
      scientificContext: 'KEW Biodiversity & Forest Habitat Layer.',
    },
    seoKeywords: [
      'The People Who Guard the Forest',
      'Himalayan forest stewardship communities',
      'Kashmir birch deodar conservation stories',
    ],
  },

  // ── 03 / THE VISUAL JOURNAL (PHOTO ESSAY) ────────────────────────────────
  {
    id: 'hd-story-05',
    slug: 'an-elegy-for-winter',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'photo-essays',
    departmentRubric: '03 / THE VISUAL JOURNAL',
    folioCode: '03 / THE VISUAL JOURNAL',
    title: 'An Elegy for Winter',
    subtitle: 'A photographic essay on Chillai Kalan, bare ridges, and the changing geometry of Himalayan snow.',
    excerpt:
      'Shot in stark monochrome across five high-altitude passes and valley basins, these plates record a season whose ancient forty-day certainty has begun to fracture into rain, dust, and sudden blizzards.',
    dateline: 'ZOJI LA · SONAMARG · GUREZ · GULMARG · WULAR',
    region: 'Western Himalayan Cryosphere',
    readingTimeMinutes: 8,
    wordCount: 1580,
    publishedAt: '2026-11-01',
    heroImage: '/images/himalayan-dispatch/visual-journal-elegy-winter.jpg',
    heroCaption:
      'Plate I — Wind-scoured granite ribs and storm spindrift at 4,100 meters during a brief January clearing.',
    heroCredit: 'Photographs by Danish Wani',
    heroMonochrome: true,
    journalistSlug: 'danish-wani',
    bylineDisplay: 'Danish Wani',
    bylineRole: 'Director of Photography & Visual Editions',
    photographyByline: 'Danish Wani',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Cryosphere & Atmospheric Systems Desk',
    workflowStage: 'publication',
    isPublished: true,
    isVisualJournal: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'Photographer’s Note: Exposure in a Snowless January',
        paragraphs: [
          'In Kashmiri memory, Chillai Kalan—the forty fiercest days of winter beginning on the solstice—was an architecture of white silence. Icicles hung like organ pipes from cedar eaves, lakes froze thick enough to walk across, and deep dry snow banked high in alpine cirques became the slow-release savings account for August orchards and paddy fields.',
          'Photographing winter in black and white removes the distraction of blue sky and forces the eye onto texture: exposed talus where three meters of snowpack should lie, rain-glazed crust instead of powder, and the solitary patience of ridges waiting for western disturbances that arrive warmer and more erratic each decade.',
        ],
      },
    ],
    photoPlates: [
      {
        plateRoman: 'PLATE I',
        title: 'Spindrift Over the Divide',
        imageUrl: '/images/himalayan-dispatch/visual-journal-elegy-winter.jpg',
        location: 'Great Himalayan Crest · Sindh–Drass Divide',
        elevation: '4,120 m',
        exposureMeta: '50mm Medium Format · 1/1000s · f/8 · Monochrome Silver Profile',
        narrative:
          'Gale-force crest winds strip fresh snow from windward granite faces, concentrating drift into narrow leeward gullies while lower south-facing slopes stand bare in mid-January.',
      },
      {
        plateRoman: 'PLATE II',
        title: 'The Snout in Shadow',
        imageUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
        location: 'Kolahoi Cirque Approach · Upper Lidder',
        elevation: '3,790 m',
        exposureMeta: '35mm · 1/500s · f/11 · Deep Red Filter Emulation',
        narrative:
          'Dark supraglacial debris bands absorb winter solar radiation even at sub-zero air temperatures, etching visible retreat lines along lateral moraine walls.',
      },
      {
        plateRoman: 'PLATE III',
        title: 'Inversion Over the River',
        imageUrl: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
        location: 'Jhelum Corridor · Srinagar Basin',
        elevation: '1,585 m',
        exposureMeta: '85mm · 1/250s · f/5.6 · Dawn Haze',
        narrative:
          'When dry high-pressure ridges stall over the valley in place of snow-bearing storms, stagnant cold air traps woodsmoke and winter haze low against the water.',
      },
      {
        plateRoman: 'PLATE IV',
        title: 'Pastoral Winter Crossing',
        imageUrl: '/images/publications/pashmina-changthang-pastoral-ecology.jpg',
        location: 'Trans-Himalayan High Plateau',
        elevation: '4,450 m',
        exposureMeta: '45mm · 1/800s · f/8 · Natural Overcast',
        narrative:
          'On the arid wind-swept plateau east of the main range, both snow drought and sudden unseasonal crusting ice test high-altitude pastoral herds.',
      },
      {
        plateRoman: 'PLATE V',
        title: 'Meltwater Before Spring',
        imageUrl: '/images/publications/lidder-pahalgam-mountain-river.jpg',
        location: 'Boulder Reach · Lidder Gorge',
        elevation: '2,180 m',
        exposureMeta: '28mm · 1/15s · f/16 · Tripod Study',
        narrative:
          'Mid-February baseflow threading past unburied river boulders—a quiet visual index of an early, abbreviated winter.',
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'View Western Disturbances & Snowpack Telemetry',
      href: '/hazard-intelligence/atmospheric-systems/western-disturbances',
      scientificContext: 'KEW Atmospheric & Cryosphere Monitoring.',
    },
    seoKeywords: [
      'An Elegy for Winter',
      'Himalayan black and white photography essay',
      'Chillai Kalan climate change Kashmir',
    ],
  },

  // ── 04A / INVESTIGATIVE JOURNALISM ───────────────────────────────────────
  {
    id: 'hd-story-06',
    slug: 'gravel-concrete-and-the-vanishing-floodplain',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'investigative-journalism',
    departmentRubric: 'INVESTIGATIVE DESK',
    folioCode: '04 / INVESTIGATION',
    title: 'Gravel, Concrete, and the Vanishing Floodplain',
    subtitle: 'How mechanized riverbed excavation is lowering stream beds, starving irrigation canals, and exposing bridge piers across mountain tributaries.',
    excerpt:
      'A six-month documentary and field investigation along three Jhelum tributaries reveals what happens when hydraulic cobble armor—deposited over millennia—is scooped out faster than glaciers and slopes can replenish it.',
    dateline: 'RARA · ROMSHI, VAISHAW & SINDH TRIBUTARIES',
    region: 'Pulwama, Kulgam & Ganderbal',
    readingTimeMinutes: 16,
    wordCount: 3920,
    publishedAt: '2026-11-01',
    heroImage: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
    heroCaption:
      'Exposed cobble bars and incised channel banks along a Himalayan gravel-bed tributary corridor.',
    heroCredit: 'Himalayan Dispatch Investigative Desk',
    journalistSlug: 'aaliya-andrabi',
    bylineDisplay: 'Aaliya Andrabi',
    bylineRole: 'Managing Editor, Investigations & Dispatches',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Fluvial Geomorphology & EIA Review Desk',
    workflowStage: 'publication',
    isPublished: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'The Sinking Riverbed',
        dateline: 'ROMSHI STREAM CROSSING',
        paragraphs: [
          'For generations, gravity-fed kuhls—earthen irrigation channels hand-dug by orchardists and rice farmers—skimmed summer snowmelt effortlessly off the edges of Kashmir’s mountain streams. Today, at dozens of diversion points across southern and central Kashmir, the canal intakes hang one to two meters above the active water surface like dry concrete mouths.',
          'The water did not simply vanish; the riverbed dropped beneath it. Where manual boatmen once gathered sand with wicker baskets and long-handled scoops at rates matched by spring flood replenishment, heavy hydraulic excavators now work gravel bars down to raw clay.',
        ],
        pullQuote: {
          quote:
            'A river’s cobble bed is not waste stone waiting for a crusher—it is the brake pad that slows mountain floodwater and feeds the shallow aquifer.',
          attribution: 'Fluvial geomorphology review dossier, KEW Scientific Synthesis',
        },
        fieldNote: {
          label: 'DOCUMENTARY VERIFICATION',
          detail:
            'Cross-checked against multi-temporal Sentinel-2 bar-morphology series, statutory mining environmental clearance stipulations (prohibiting heavy in-stream excavation below replenishment depth), and field staff-gauge surveys.',
        },
      },
      {
        numberRoman: 'II',
        title: 'Scour Around the Piers',
        paragraphs: [
          'In fluvial physics, removing gravel from one reach triggers "hungry water" downstream and headward nickpoint erosion upstream. Stripped of its coarse cobble armor, high-velocity meltwater carves downward around bridge pile caps, pipeline crossings, and flood-protection spurs.',
          'Environmental clearance conditions on paper routinely require dry-bar skimming only, daylight operating hours, and annual replenishment audits. Bridging the gulf between those statutory conditions and midnight riverbed reality is one of the defining governance tests of the decade.',
        ],
      },
    ],
    corrections: [
      {
        id: 'corr-hd-06-1',
        date: '2026-11-12',
        kind: 'Clarification',
        note: 'An earlier folio caption referred generally to tributary intake drop; the text specifies that surveyed canal-invert elevation offsets ranged between 0.9 m and 2.1 m across inspected reaches.',
        approvedBy: 'Office of Editorial Standards & Verification',
      },
    ],
    relatedKewModule: {
      label: 'Examine KEW Mining & Extraction Observatory',
      href: '/earth-human-impact/mining-extraction',
      scientificContext: 'Paired with KEW Earth & Human Impact spatial records.',
    },
    seoKeywords: [
      'riverbed mining Kashmir investigation',
      'Romshi Vaishaw gravel extraction ecology',
      'Himalayan Dispatch investigative journalism',
    ],
  },

  // ── 04B / DATA JOURNALISM ────────────────────────────────────────────────
  {
    id: 'hd-story-07',
    slug: 'thirty-eight-winters-of-snowline-retreat',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'data-journalism',
    departmentRubric: 'CARTOGRAPHY & NUMBERS',
    folioCode: '05 / EDITORIAL DATA ESSAY',
    title: 'Thirty-Eight Winters of Snowline Retreat',
    subtitle: 'Reading the upward march of the end-of-summer snowline across the Upper Jhelum and Lidder basins.',
    excerpt:
      'Every meter that the September snowline climbs exposes darker ice to late-summer sunlight. Drawn from nearly four decades of satellite and station records, here is what an upward creep of 240 meters looks like on the page.',
    dateline: 'UPPER JHELUM & LIDDER ELEVATION BANDS',
    region: 'Western Himalaya · 3,200 m – 4,800 m',
    readingTimeMinutes: 11,
    wordCount: 2680,
    publishedAt: '2026-11-01',
    heroImage: '/images/publications/glaciology-kolahoi-gnss-survey.jpg',
    heroCaption:
      'High-altitude GNSS and ablation-zone survey transect across a Western Himalayan valley glacier.',
    heroCredit: 'KEW × Himalayan Dispatch Data Desk',
    journalistSlug: 'dr-nida-hamdani',
    bylineDisplay: 'Dr. Nida Hamdani',
    bylineRole: 'Editor of Editorial Data & Cartography',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Glaciology & Remote Sensing Review Panel',
    workflowStage: 'publication',
    isPublished: true,
    dataVisualization: {
      id: 'viz-snowline-1988-2026',
      kicker: 'FIGURE I · CRYOSPHERIC HORIZON LEDGER (1988–2026)',
      title: 'The Climbing End-of-Summer Snowline',
      subtitle:
        'Mean September equilibrium snowline elevation (meters above sea level) across monitored Upper Lidder & Sindh sub-catchments, five-year smoothed archival synthesis.',
      unit: 'm a.s.l.',
      chartStyle: 'snowline_horizon',
      keyFindingStat: '+242 m',
      keyFindingNarrative:
        'Net upward shift in mean late-September snowline altitude between the 1988–1992 baseline (~4,190 m) and the 2022–2026 pentad (~4,432 m), shrinking the reflective accumulation area.',
      methodologyNote:
        'Editorial synthesis constructed from cloud-free late-ablation Landsat TM/ETM+/OLI and Sentinel-2 optical snow-cover delineations paired with ERA5-Land freezing-level reanalysis.',
      sourceCitation: 'Kashmir EcoWatch Cryosphere Archive & Peer-Reviewed Western Himalayan Glaciological Literature',
      points: [
        { yearOrLabel: '1988', primaryValue: 4190, annotation: 'Late-1980s baseline (~4,190 m)' },
        { yearOrLabel: '1994', primaryValue: 4215 },
        { yearOrLabel: '2000', primaryValue: 4258, annotation: 'Turn-of-century drought winters' },
        { yearOrLabel: '2006', primaryValue: 4290 },
        { yearOrLabel: '2012', primaryValue: 4334 },
        { yearOrLabel: '2018', primaryValue: 4385, annotation: 'Accelerated autumn warm anomalies' },
        { yearOrLabel: '2022', primaryValue: 4412 },
        { yearOrLabel: '2026', primaryValue: 4432, annotation: 'Current pentad (~4,432 m)' },
      ],
    },
    chapters: [
      {
        numberRoman: 'I',
        title: 'Why September Is the Honest Month',
        paragraphs: [
          'Mid-winter satellite maps flatter the Himalayas. After a single vigorous western disturbance in February, white blankets cover orchards, highways, and glaciers alike, disguising the health of the perennial ice underneath. Glaciologists wait instead for late September—the ruthless accounting hour just before autumn snow returns.',
          'Where clean white snow still survives at the end of September, the glacier has gained mass. Below that line—the transient snowline, proxy for the equilibrium-line altitude—bare, dust-darkened ice has spent July and August absorbing solar heat and bleeding meltwater.',
        ],
      },
      {
        numberRoman: 'II',
        title: 'Two Hundred and Forty Meters on a Steep Cone',
        paragraphs: [
          'Two hundred and forty meters sounds modest—roughly the height of a sixty-story building, or twenty minutes of brisk climbing on an alpine trail. On the hypsometric curve of a Kashmir valley glacier whose headwall tops out near 4,900 meters, however, pushing the snowline from 4,190 to 4,432 meters slices away a disproportionate share of its nourishment zone.',
          'Data journalism’s task is not to induce fatalism, but clarity: every fraction of a degree kept out of the atmosphere, and every ton of black-carbon soot kept off valley snowfields from brick kilns, open burning, and winter diesel exhaust, slows that upward climb.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Open KEW Cryosphere & Loss-Recovery Ledger',
      href: '/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger',
      scientificContext: 'Full quantitative tables in KEW Earth & Human Impact.',
    },
    seoKeywords: [
      'Himalayan snowline retreat data journalism',
      'Kolahoi Lidder equilibrium line altitude',
      'editorial climate visualization Kashmir',
    ],
  },

  // ── 05 / INTERVIEWS (THE CONVERSATION) ───────────────────────────────────
  {
    id: 'hd-story-08',
    slug: 'a-glacier-does-not-negotiate-with-five-year-plans',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'interviews',
    departmentRubric: 'THE CONVERSATION',
    folioCode: '06 / LONGFORM INTERVIEW',
    title: '“A Glacier Does Not Negotiate With Five-Year Plans”',
    subtitle: 'An extended dialogue on cryospheric time, indigenous water law, and why Himalayan science must speak plainly to the public.',
    excerpt:
      'Sitting over noon chai as November rain taps against cedar windowpanes, senior watershed hydrologist Prof. Abdul Rashid Dar reflects on forty years of measuring mountain rivers—and why technical jargon often hides moral choices.',
    dateline: 'HAZRATBAL & PAHALGAM FIELD ARCHIVE',
    region: 'Kashmir Valley',
    readingTimeMinutes: 12,
    wordCount: 2950,
    publishedAt: '2026-11-01',
    heroImage: '/images/publications/pashmina-field-ecology-scientists.jpg',
    heroCaption:
      'Field dialogue and watershed notebook review during autumn baseflow observations.',
    heroCredit: 'Portrait for Himalayan Dispatch',
    journalistSlug: 'dr-fayaz-ahmad-khan',
    bylineDisplay: 'Dr. Fayaz Ahmad Khan',
    bylineRole: 'Founding Editor-in-Chief',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Scientific Review Council',
    workflowStage: 'publication',
    isPublished: true,
    interviewSubjectBio:
      'Composite inaugural editorial conversation synthesizing four decades of Western Himalayan hydrological scholarship, field mentorship, and watershed ethics.',
    interviewExchanges: [
      {
        speakerRole: 'dispatch',
        speakerLabel: 'HIMALAYAN DISPATCH',
        text: 'You began carrying current meters into mountain tributaries in the mid-1980s, long before automated telemetry stations. What strikes you first when you revisit those same gauging pools today?',
      },
      {
        speakerRole: 'subject',
        speakerLabel: 'WATERSHED SCHOLAR',
        text: 'Flashiness. Back then, a forested spring-and-glacier tributary had patience. Rain fell on deep humus and moss, infiltrated fractured limestone, and emerged weeks later as cold, steady baseflow. Today, between thinner snowpacks above and compacted roads and roofs below, water arrives all at once in brown surges—and then drops to a trickle by September.',
      },
      {
        speakerRole: 'dispatch',
        speakerLabel: 'HIMALAYAN DISPATCH',
        text: 'Policymakers often ask scientists for “safe carrying capacities” or engineering fixes so projects can proceed unchanged. How do you answer that?',
      },
      {
        speakerRole: 'subject',
        speakerLabel: 'WATERSHED SCHOLAR',
        text: 'I remind them that a glacier does not negotiate with five-year plans, nor does a floodplain read municipal zoning bylaws. Physics has no exemption clause. When you build on an active alluvial fan or narrow a wetland spill channel, you are not eliminating risk—you are merely transferring an unpaid invoice to downstream households ten years from now.',
      },
      {
        speakerRole: 'dispatch',
        speakerLabel: 'HIMALAYAN DISPATCH',
        text: 'Why does an environmental intelligence platform also need a literary magazine?',
      },
      {
        speakerRole: 'subject',
        speakerLabel: 'WATERSHED SCHOLAR',
        text: 'Because nobody ever defended a river solely out of affection for a regression coefficient! We need exact measurements so nobody can lie about what is happening. And we need literature, photography, and honest testimony so people remember why this valley is worth defending in the first place.',
      },
    ],
    chapters: [
      {
        numberRoman: 'I',
        title: 'Editor’s Introduction',
        paragraphs: [
          'Every issue of Himalayan Dispatch reserves space for a single unhurried conversation with a thinker, practitioner, or custodian whose life’s work illuminates the relationship between mountain science and public conscience.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Browse KEW Watersheds & Hydrology Hub',
      href: '/water-systems/watersheds',
      scientificContext: 'KEW Hydrological Basins & Catchments.',
    },
    seoKeywords: [
      'Himalayan watershed interview',
      'glacier hydrology conversation Kashmir',
      'Himalayan Dispatch interview',
    ],
  },

  // ── 06 / EDITORIALS (FROM THE MASTHEAD) ──────────────────────────────────
  {
    id: 'hd-story-09',
    slug: 'why-the-western-himalayas-demand-slow-journalism',
    editionSlug: 'vol-01-no-01',
    editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
    departmentId: 'editorials',
    departmentRubric: 'FROM THE MASTHEAD · EDITORIAL',
    folioCode: '07 / INAUGURAL CHARTER',
    title: 'Why the Western Himalayas Demand Slow, Fearless Journalism',
    subtitle: 'On founding a periodical that refuses disaster-cycle amnesia.',
    excerpt:
      'Environmental coverage of mountain regions too often oscillates between postcard nostalgia and 48-hour catastrophe headlines. Himalayan Dispatch exists for the long, quiet years in between.',
    dateline: 'THE EDITORIAL BOARD · AUTUMN 2026',
    region: 'Western Himalayas',
    readingTimeMinutes: 6,
    wordCount: 1490,
    publishedAt: '2026-11-01',
    heroImage: '/images/publications/limnology-alpine-lake-sonde.jpg',
    heroCaption:
      'High-altitude limnological observation at dawn—where empirical measurement meets editorial witness.',
    heroCredit: 'Himalayan Dispatch Masthead',
    journalistSlug: 'dr-fayaz-ahmad-khan',
    bylineDisplay: 'The Editorial Board',
    bylineRole: 'Himalayan Dispatch Masthead',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Institutional Governance & Ethics Charter',
    workflowStage: 'publication',
    isPublished: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'Beyond the Forty-Eight-Hour Flood Headline',
        paragraphs: [
          'Whenever a cloudburst cuts a highway or smoke hangs over a Himalayan valley, cameras arrive for two days and depart on the third. Left unexamined are the twenty years of quiet decisions—the culverted spring, the felled birch belt, the unmonitored quarry—that scripted the disaster long before the first raindrop fell.',
          'Slow journalism is not slow out of complacency; it is slow out of respect for complexity. Every story in Himalayan Dispatch passes through field reporting, documentary fact-checking, and independent scientific review while standing completely independent in literary craft.',
          'We invite scientists, writers, photographers, and mountain residents across Kashmir, Jammu, Ladakh, Gilgit-Baltistan, and Azad Kashmir to treat these pages as a shared civic record—rigorous in fact, generous in spirit, and unafraid of truth.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Read KEW Scientific Governance & Methodology',
      href: '/about/methodology',
      scientificContext: 'Kashmir EcoWatch Institutional Charter.',
    },
    seoKeywords: [
      'slow environmental journalism Himalayas',
      'Himalayan Dispatch editorial charter',
    ],
  },

  // ── ARCHIVED FOUNDING MONOGRAPH STORY ────────────────────────────────────
  {
    id: 'hd-story-10',
    slug: 'notes-from-the-upper-jhelum-headwaters',
    editionSlug: 'monograph-00-watershed-voices',
    editionLabel: 'PRE-INAUGURAL FOLIO / NO. 00',
    departmentId: 'longform-features',
    departmentRubric: 'ARCHIVAL MONOGRAPH',
    folioCode: 'FOLIO 00 / ESSAY',
    title: 'Where the River First Learns Its Name',
    subtitle: 'Walking from karst limestone springs in Anantnag to the reed labyrinths of Wular.',
    excerpt:
      'From the octagonal stone basin of Verinag to the wide wind-ruffled waters of Bandipora, a founding essay traces how one river binds forty sub-watersheds into a single ecological fate.',
    dateline: 'VERINAG · SANGAM · SHADIPORA · WULAR',
    region: 'Jhelum River Continuum',
    readingTimeMinutes: 15,
    wordCount: 3810,
    publishedAt: '2026-07-15',
    heroImage: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
    heroCaption:
      'The Jhelum entering the vast alluvial detention mirror of Wular Lake.',
    heroCredit: 'Himalayan Dispatch Founding Archive',
    journalistSlug: 'dr-fayaz-ahmad-khan',
    bylineDisplay: 'Dr. Fayaz Ahmad Khan',
    bylineRole: 'Founding Editor-in-Chief',
    photographyByline: 'Danish Wani',
    factCheckedBy: 'Office of Editorial Standards & Verification',
    scientificReviewer: 'KEW Hydrology & Ramsar Systems Panel',
    workflowStage: 'archiving',
    isPublished: true,
    chapters: [
      {
        numberRoman: 'I',
        title: 'Cold Karst Emergence',
        paragraphs: [
          'At the foot of the Pir Panjal, water that fell as winter snow on fractured Triassic limestone emerges emerald-clear and eleven degrees Celsius year-round. Here the Vitasta—the Jhelum—begins not as a muddy torrent, but as a quiet karst spring.',
          'Follow that water downstream for two hundred kilometers and you witness the entire biography of the valley: saffron karewas rising on the right bank, apple orchards drawing tributary kuhls on the left, Srinagar’s seven historic bridges overhead, and finally Wular’s vast floodplain sponge absorbing the fury of spring snowmelt before the river plunges into its western gorge.',
        ],
      },
    ],
    corrections: [],
    relatedKewModule: {
      label: 'Explore Jhelum River & Wular Profiles',
      href: '/water-systems/rivers',
      scientificContext: 'KEW Fluvial & Lacustrine Archive.',
    },
    seoKeywords: [
      'Upper Jhelum literary essay',
      'Verinag to Wular watershed journalism',
    ],
  },
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
    journalistSlug: 'danish-wani',
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
    journalistSlug: 'rafiq-ahmad-bhat',
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
    journalistSlug: 'aaliya-andrabi',
    bylineDisplay: 'Restricted Desk Assignment',
    workflowStage: 'fact_checking',
    publicStageLabel: 'Fact-checking',
    anticipatedPublicationWindow: 'Embargoed Pending Legal & Source Safety Clearance',
    region: 'Classified Catchment Reach',
    publicPreviewApproved: false,
    isConfidential: true,
    sourceProtectionLevel: 'strict_confidential',
    internalDeskNotes:
      'STRICT SOURCE PROTECTION: Whistleblower contractor manifests stored offline only. Right-of-reply letters scheduled post-verification.',
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
    gatekeeper: 'Aaliya Andrabi · Managing Editor',
    status: 'Open for Commissions',
  },
  {
    id: 'cal-iss02-drafts',
    editionLabel: 'VOL. 01 / NO. 02',
    editionTitle: 'A World in Transition',
    milestone: 'First-Draft Manuscripts & Documentary Plates Due',
    windowLabel: 'Stage 03–05 Verification Gate',
    gatekeeper: 'Danish Wani & Standards Desk',
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
    holderName: 'Sameer Hamdani',
    domainsRubric:
      'Editorial Strategy · Newsroom Coordination · International Publishing Standards',
    mandateDescription:
      'Translates institutional editorial objectives into publication strategy, oversees departmental coordination and maintains editorial excellence across the magazine.',
    status: 'Confirmed',
  },
  {
    id: 'mp-i-03',
    sectionId: 'I_leadership',
    order: 3,
    roleTitle: 'Deputy Editor-in-Chief',
    holderName: 'Dr. Saira Qadri',
    domainsRubric:
      'Editorial Governance · Scientific Communication · Publication Quality',
    mandateDescription:
      'Supports executive editorial leadership, multidisciplinary coordination, institutional partnerships and editorial continuity.',
    status: 'Confirmed',
  },
  {
    id: 'mp-i-04',
    sectionId: 'I_leadership',
    order: 4,
    roleTitle: 'Managing Editor, Investigations & Dispatches',
    holderName: 'Aaliya Andrabi',
    domainsRubric:
      'Documentary Accountability · Right of Reply · Source Protection',
    mandateDescription:
      'Oversees editorial commissions, investigative standards, correspondent assignments, confidential source protocols and risk-based pre-publication review.',
    status: 'Confirmed',
    journalistSlug: 'aaliya-andrabi',
  },
  {
    id: 'mp-i-05',
    sectionId: 'I_leadership',
    order: 5,
    roleTitle: 'Editor-at-Large',
    holderName: 'Omar Zargar',
    domainsRubric:
      'Longform Journalism · Intellectual Commentary · Special Editorial Projects',
    mandateDescription:
      'Develops flagship narratives, institutional interviews, major investigative features and specialist editorial projects.',
    status: 'Confirmed',
  },

  // ── II · EDITORIAL PRODUCTION & COMMISSIONING (Central Newsroom) ─────────
  {
    id: 'mp-ii-01',
    sectionId: 'II_commissioning',
    order: 1,
    roleTitle: 'Commissioning Editor',
    holderName: 'Mehreen Koul',
    domainsRubric:
      'Editorial Commissions · Contributor Development · Story Acquisition',
    mandateDescription:
      'Evaluates story pitches, commissions independent journalists and coordinates editorial assignments for forthcoming editions.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-02',
    sectionId: 'II_commissioning',
    order: 2,
    roleTitle: 'Senior Features Editor',
    holderName: 'Zareen Shah',
    domainsRubric:
      'Longform Narratives · Cover Stories · Environmental Storytelling',
    mandateDescription:
      'Oversees narrative development, cover features, literary journalism and the editorial quality of extended environmental reporting.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-03',
    sectionId: 'II_commissioning',
    order: 3,
    roleTitle: 'Investigations Editor',
    holderName: 'Adil Mir',
    domainsRubric:
      'Documentary Evidence · Public Accountability · Investigative Journalism',
    mandateDescription:
      'Coordinates environmental investigations, documentary research, evidence assessment and right-of-reply procedures.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-04',
    sectionId: 'II_commissioning',
    order: 4,
    roleTitle: 'Science Editor',
    holderName: 'Dr. Areeba Dar',
    domainsRubric:
      'Scientific Interpretation · Research Communication · Empirical Accuracy',
    mandateDescription:
      'Ensures that environmental science is communicated accurately, accessibly and with appropriate acknowledgment of methodological limitations.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-05',
    sectionId: 'II_commissioning',
    order: 5,
    roleTitle: 'Environment & Climate Editor',
    holderName: 'Dr. Aamir Bhat',
    domainsRubric:
      'Climate Intelligence · Environmental Policy · Ecosystem Resilience',
    mandateDescription:
      'Directs editorial coverage of climate change, ecological degradation, conservation, atmospheric systems and environmental governance.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-06',
    sectionId: 'II_commissioning',
    order: 6,
    roleTitle: 'Opinion & Editorial Page Editor',
    holderName: 'Sana Naqshbandi',
    domainsRubric:
      'Editorial Commentary · Intellectual Discourse · Expert Perspectives',
    mandateDescription:
      'Curates opinion articles, institutional commentary, guest columns and independent environmental perspectives.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-07',
    sectionId: 'II_commissioning',
    order: 7,
    roleTitle: 'Chief Copy Editor',
    holderName: 'Nazia Raina',
    domainsRubric:
      'Editorial Language · Stylebook Compliance · Manuscript Refinement',
    mandateDescription:
      'Maintains linguistic precision, editorial consistency, factual clarity and professional publication standards.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ii-08',
    sectionId: 'II_commissioning',
    order: 8,
    roleTitle: 'Research & Documentation Editor',
    holderName: 'Farhan Wani',
    domainsRubric:
      'Primary Sources · Archival Research · Documentary References',
    mandateDescription:
      'Oversees documentary evidence, archival materials, scientific references and research dossiers supporting published journalism.',
    status: 'Confirmed',
  },

  // ── III · VISUAL JOURNALISM, CARTOGRAPHY & DESIGN ────────────────────────
  {
    id: 'mp-iii-01',
    sectionId: 'III_visual',
    order: 1,
    roleTitle: 'Director of Photography & Visual Editions',
    holderName: 'Danish Wani',
    domainsRubric:
      'Cinematic Documentary Photography · Visual Journalism · Archival Plates',
    mandateDescription:
      'Directs photographic commissions, full-bleed visual essays, documentary integrity, photographic provenance and visual storytelling.',
    status: 'Confirmed',
    journalistSlug: 'danish-wani',
  },
  {
    id: 'mp-iii-02',
    sectionId: 'III_visual',
    order: 2,
    roleTitle: 'Editor of Editorial Data & Cartography',
    holderName: 'Dr. Nida Hamdani',
    domainsRubric:
      'Spatial Intelligence · Cryospheric Research · Statistical Verification',
    mandateDescription:
      'Bridges KEW observatory datasets, geospatial intelligence and scientific research with sophisticated visual journalism and methodological transparency.',
    status: 'Confirmed',
    journalistSlug: 'dr-nida-hamdani',
  },
  {
    id: 'mp-iii-03',
    sectionId: 'III_visual',
    order: 3,
    roleTitle: 'Creative Director',
    holderName: 'Zubin Kaul',
    domainsRubric:
      'Editorial Art Direction · Magazine Identity · Visual Architecture',
    mandateDescription:
      'Maintains the distinctive Himalayan Dispatch visual identity, cinematic presentation and premium editorial design.',
    status: 'Confirmed',
  },
  {
    id: 'mp-iii-04',
    sectionId: 'III_visual',
    order: 4,
    roleTitle: 'Senior Photo Editor',
    holderName: 'Insha Zargar',
    domainsRubric:
      'Image Curation · Photographic Verification · Documentary Ethics',
    mandateDescription:
      'Oversees photographic selection, caption accuracy, image attribution and documentary authenticity.',
    status: 'Confirmed',
  },
  {
    id: 'mp-iii-05',
    sectionId: 'III_visual',
    order: 5,
    roleTitle: 'Multimedia & Documentary Editor',
    holderName: 'Ayaan Qadri',
    domainsRubric:
      'Documentary Film · Digital Storytelling · Audio-Visual Journalism',
    mandateDescription:
      'Coordinates environmental documentaries, multimedia narratives, interviews and immersive editorial productions.',
    status: 'Confirmed',
  },
  {
    id: 'mp-iii-06',
    sectionId: 'III_visual',
    order: 6,
    roleTitle: 'Data Visualization Editor',
    holderName: 'Dr. Mahira Shah',
    domainsRubric:
      'Statistical Graphics · Scientific Illustration · Interactive Visualizations',
    mandateDescription:
      'Transforms complex environmental information into accurate, accessible and professionally designed visual narratives.',
    status: 'Confirmed',
  },

  // ── IV · REGIONAL BUREAUS & CORRESPONDENT NETWORK ────────────────────────
  {
    id: 'mp-iv-01',
    sectionId: 'IV_bureaus',
    order: 1,
    roleTitle: 'Director of Regional Correspondence',
    holderName: 'Irfan Naqshbandi',
    domainsRubric:
      'Regional Newsroom Coordination · Correspondent Development · Transboundary Reporting',
    mandateDescription:
      'Coordinates geographical reporting assignments, regional editorial standards, correspondent recruitment and environmental coverage across the six reporting regions.',
    status: 'Confirmed',
  },
  {
    id: 'mp-iv-02',
    sectionId: 'IV_bureaus',
    order: 2,
    roleTitle: 'Bureau Chief',
    holderName: 'Shahid Andrabi',
    domainsRubric: 'Kashmir Bureau · Active Reporting Desk',
    mandateDescription:
      'Kashmir Valley, Jhelum Basin & Pir Panjal–Greater Himalayan Flanks.',
    status: 'Confirmed',
    bureauId: 'kashmir',
    bureauOperationalStatus: 'active_reporting_desk',
  },
  {
    id: 'mp-iv-03',
    sectionId: 'IV_bureaus',
    order: 3,
    roleTitle: 'Bureau Chief',
    holderName: 'Rohan Jamwal',
    domainsRubric: 'Jammu Bureau · Active Reporting Desk',
    mandateDescription:
      'Chenab Gorge, Pir Panjal Southern Escarpment & Shivalik Foothills.',
    status: 'Confirmed',
    bureauId: 'jammu',
    bureauOperationalStatus: 'active_reporting_desk',
  },
  {
    id: 'mp-iv-04',
    sectionId: 'IV_bureaus',
    order: 4,
    roleTitle: 'Bureau Chief',
    holderName: 'Tsering Angchuk',
    domainsRubric: 'Ladakh Bureau · Active Reporting Desk',
    mandateDescription:
      'Trans-Himalayan Cold Desert · Indus, Shyok, Zanskar & Changthang.',
    status: 'Confirmed',
    bureauId: 'ladakh',
    bureauOperationalStatus: 'active_reporting_desk',
  },
  {
    id: 'mp-iv-05',
    sectionId: 'IV_bureaus',
    order: 5,
    roleTitle: 'Bureau Chief',
    holderName: 'Usman Abbasi',
    domainsRubric: 'AJ&K Bureau · In Establishment',
    mandateDescription:
      'Neelum Valley, Muzaffarabad Syntaxis & Mangla–Jhelum Catchments.',
    status: 'Confirmed',
    bureauId: 'ajk',
    bureauOperationalStatus: 'in_establishment',
  },
  {
    id: 'mp-iv-06',
    sectionId: 'IV_bureaus',
    order: 6,
    roleTitle: 'Bureau Chief',
    holderName: 'Salman Karim',
    domainsRubric: 'Gilgit Bureau · In Establishment',
    mandateDescription:
      'Western Karakoram, Hindu Raj & Upper Indus Confluence.',
    status: 'Confirmed',
    bureauId: 'gilgit',
    bureauOperationalStatus: 'in_establishment',
  },
  {
    id: 'mp-iv-07',
    sectionId: 'IV_bureaus',
    order: 7,
    roleTitle: 'Bureau Chief',
    holderName: 'Sajjad Balti',
    domainsRubric: 'Baltistan Bureau · In Establishment',
    mandateDescription:
      'Central Karakoram Icefields · Skardu, Shigar, Shyok & Baltoro.',
    status: 'Confirmed',
    bureauId: 'baltistan',
    bureauOperationalStatus: 'in_establishment',
  },

  // ── V · EMPIRICAL & INDEPENDENT SCIENTIFIC REVIEW ────────────────────────
  {
    id: 'mp-v-01',
    sectionId: 'V_scientific_council',
    order: 1,
    roleTitle: 'Chair, Scientific Advisory & Review Council',
    holderName: 'Dr. Tariq Hamdani',
    domainsRubric:
      'Earth Systems Science · Multidisciplinary Research · Scientific Governance',
    mandateDescription:
      'Coordinates specialist scientific review, methodological integrity, reviewer independence and empirical verification.',
    status: 'Confirmed',
    isCouncilSpecialistRow: false,
  },
  {
    id: 'mp-v-02',
    sectionId: 'V_scientific_council',
    order: 2,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Arshad Mir',
    domainsRubric: 'Glaciology & Cryosphere Sciences',
    mandateDescription: 'Specialist empirical peer review in Glaciology & Cryosphere Sciences.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-03',
    sectionId: 'V_scientific_council',
    order: 3,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Saira Koul',
    domainsRubric: 'Limnology & Freshwater Ecology',
    mandateDescription: 'Specialist empirical peer review in Limnology & Freshwater Ecology.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-04',
    sectionId: 'V_scientific_council',
    order: 4,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Imran Bhat',
    domainsRubric: 'Hydrogeology & Karst Systems',
    mandateDescription: 'Specialist empirical peer review in Hydrogeology & Karst Systems.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-05',
    sectionId: 'V_scientific_council',
    order: 5,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Mehvish Dar',
    domainsRubric: 'Wetland Ecology & Conservation',
    mandateDescription: 'Specialist empirical peer review in Wetland Ecology & Conservation.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-06',
    sectionId: 'V_scientific_council',
    order: 6,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Zubair Shah',
    domainsRubric: 'Atmospheric Physics & Climatology',
    mandateDescription: 'Specialist empirical peer review in Atmospheric Physics & Climatology.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-07',
    sectionId: 'V_scientific_council',
    order: 7,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Hina Qadri',
    domainsRubric: 'Biodiversity & Ecosystem Science',
    mandateDescription: 'Specialist empirical peer review in Biodiversity & Ecosystem Science.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-08',
    sectionId: 'V_scientific_council',
    order: 8,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Adeel Wani',
    domainsRubric: 'Remote Sensing & Geospatial Sciences',
    mandateDescription: 'Specialist empirical peer review in Remote Sensing & Geospatial Sciences.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-09',
    sectionId: 'V_scientific_council',
    order: 9,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Rukhsana Malik',
    domainsRubric: 'Environmental Chemistry & Toxicology',
    mandateDescription: 'Specialist empirical peer review in Environmental Chemistry & Toxicology.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-10',
    sectionId: 'V_scientific_council',
    order: 10,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Saqib Rather',
    domainsRubric: 'Geomorphology & Geological Sciences',
    mandateDescription: 'Specialist empirical peer review in Geomorphology & Geological Sciences.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-11',
    sectionId: 'V_scientific_council',
    order: 11,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Naila Andrabi',
    domainsRubric: 'Environmental Engineering & Impact Assessment',
    mandateDescription:
      'Specialist empirical peer review in Environmental Engineering & Impact Assessment.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-12',
    sectionId: 'V_scientific_council',
    order: 12,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Yasir Zargar',
    domainsRubric: 'Disaster Risk & Climate Resilience',
    mandateDescription: 'Specialist empirical peer review in Disaster Risk & Climate Resilience.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-13',
    sectionId: 'V_scientific_council',
    order: 13,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Samina Raina',
    domainsRubric: 'Environmental Economics & Sustainability',
    mandateDescription:
      'Specialist empirical peer review in Environmental Economics & Sustainability.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-14',
    sectionId: 'V_scientific_council',
    order: 14,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Bilal Naqshbandi',
    domainsRubric: 'Statistical Modelling & Computational Sciences',
    mandateDescription:
      'Specialist empirical peer review in Statistical Modelling & Computational Sciences.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-15',
    sectionId: 'V_scientific_council',
    order: 15,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Ayesha Mirza',
    domainsRubric: 'Environmental Health & Exposure Science',
    mandateDescription:
      'Specialist empirical peer review in Environmental Health & Exposure Science.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },
  {
    id: 'mp-v-16',
    sectionId: 'V_scientific_council',
    order: 16,
    roleTitle: 'Scientific Review Council Member',
    holderName: 'Dr. Danish Koul',
    domainsRubric: 'Environmental Governance & Policy',
    mandateDescription: 'Specialist empirical peer review in Environmental Governance & Policy.',
    status: 'External Reviewer',
    isCouncilSpecialistRow: true,
  },

  // ── VI · FACT-CHECKING, VERIFICATION & EDITORIAL STANDARDS ───────────────
  {
    id: 'mp-vi-01',
    sectionId: 'VI_standards',
    order: 1,
    roleTitle: 'Director of Editorial Standards',
    holderName: 'Sadia Hamdani',
    domainsRubric:
      'Professional Journalism Ethics · Editorial Compliance · Institutional Accountability',
    mandateDescription:
      'Maintains editorial standards, verification procedures and professional conduct across all published editions.',
    status: 'Confirmed',
  },
  {
    id: 'mp-vi-02',
    sectionId: 'VI_standards',
    order: 2,
    roleTitle: 'Chief Fact-Checker',
    holderName: 'Fahad Qadri',
    domainsRubric:
      'Primary-Source Verification · Documentary Evidence · Claim Assessment',
    mandateDescription:
      'Maintains article-level verification records and ensures material factual claims are appropriately corroborated.',
    status: 'Confirmed',
  },
  {
    id: 'mp-vi-03',
    sectionId: 'VI_standards',
    order: 3,
    roleTitle: 'Data & Evidence Verification Editor',
    holderName: 'Dr. Asma Wani',
    domainsRubric:
      'Statistical Accuracy · Dataset Provenance · Empirical Validation',
    mandateDescription:
      'Reviews quantitative information, scientific datasets, calculations and methodological claims.',
    status: 'Confirmed',
  },
  {
    id: 'mp-vi-04',
    sectionId: 'VI_standards',
    order: 4,
    roleTitle: 'Digital & Visual Verification Editor',
    holderName: 'Faizan Dar',
    domainsRubric:
      'Digital Forensics · Image Authenticity · Open-Source Verification',
    mandateDescription:
      'Assesses photographic provenance, digital evidence, synthetic media and potentially manipulated content.',
    status: 'Confirmed',
  },
  {
    id: 'mp-vi-05',
    sectionId: 'VI_standards',
    order: 5,
    roleTitle: 'Corrections & Clarifications Editor',
    holderName: 'Madiha Shah',
    domainsRubric:
      'Publication Corrections · Editorial Transparency · Archival Accuracy',
    mandateDescription:
      'Maintains public correction notices, clarification records, article amendments and version histories.',
    status: 'Confirmed',
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
    holderName: 'Rehan Zargar',
    domainsRubric:
      'Confidential Communications · Source Ethics · Evidence Protection',
    mandateDescription:
      'Develops secure procedures for confidential sources, protected records and unpublished investigative materials.',
    status: 'Confirmed',
  },
  {
    id: 'mp-vii-03',
    sectionId: 'VII_legal_safety',
    order: 3,
    roleTitle: 'Journalist Safety & Digital Security Coordinator',
    holderName: 'Aqib Malik',
    domainsRubric:
      'Reporter Safety · Digital Security · Editorial Risk Management',
    mandateDescription:
      'Coordinates risk assessments and security safeguards for correspondents, investigative journalists and sensitive reporting assignments.',
    status: 'Confirmed',
  },
  {
    id: 'mp-vii-04',
    sectionId: 'VII_legal_safety',
    order: 4,
    roleTitle: 'Rights & Permissions Editor',
    holderName: 'Aiman Koul',
    domainsRubric:
      'Copyright · Content Licensing · Intellectual Property Protection',
    mandateDescription:
      'Manages publication permissions, photographic rights, contributor agreements and authorized content reproduction.',
    status: 'Confirmed',
    anchorId: 'rights-permissions',
  },

  // ── VIII · PUBLIC EDITOR & READER ACCOUNTABILITY ─────────────────────────
  {
    id: 'mp-viii-01',
    sectionId: 'VIII_public_editor',
    order: 1,
    roleTitle: 'Public Editor & Editorial Ombudsperson',
    holderName: 'Prof. Nasreen Qadri',
    domainsRubric:
      'Reader Accountability · Editorial Independence · Public Complaints',
    mandateDescription:
      'Independently evaluates reader concerns, serious editorial complaints, conflicts of interest and potential breaches of the publication’s ethical charter.',
    status: 'Confirmed',
  },
  {
    id: 'mp-viii-02',
    sectionId: 'VIII_public_editor',
    order: 2,
    roleTitle: 'Reader Relations Editor',
    holderName: 'Mahnoor Andrabi',
    domainsRubric:
      'Public Correspondence · Readership Engagement · Editorial Feedback',
    mandateDescription:
      'Maintains structured communication between readers, contributors and the Editorial Directorate.',
    status: 'Confirmed',
  },

  // ── IX · DIGITAL PUBLISHING & INTERNATIONAL CIRCULATION ──────────────────
  {
    id: 'mp-ix-01',
    sectionId: 'IX_digital_publishing',
    order: 1,
    roleTitle: 'Director of Digital Publishing',
    holderName: 'Aariz Hamdani',
    domainsRubric:
      'Digital Publications · Editorial Technology · International Distribution',
    mandateDescription:
      'Oversees digital production, edition publication, platform management and worldwide distribution.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ix-02',
    sectionId: 'IX_digital_publishing',
    order: 2,
    roleTitle: 'Production & Editions Editor',
    holderName: 'Haniya Mir',
    domainsRubric:
      'Edition Assembly · Editorial Scheduling · Publication Production',
    mandateDescription:
      'Coordinates final edition preparation, article sequencing, publication schedules and archive completeness.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ix-03',
    sectionId: 'IX_digital_publishing',
    order: 3,
    roleTitle: 'Audience Development & Circulation Editor',
    holderName: 'Sahil Wani',
    domainsRubric:
      'Global Readership · Digital Discovery · Audience Intelligence',
    mandateDescription:
      'Develops readership strategies, editorial discoverability and international circulation without compromising journalistic independence.',
    status: 'Confirmed',
  },
  {
    id: 'mp-ix-04',
    sectionId: 'IX_digital_publishing',
    order: 4,
    roleTitle: 'Digital Archives & Publications Editor',
    holderName: 'Zoya Naqshbandi',
    domainsRubric:
      'Digital Preservation · Edition Archives · Institutional Records',
    mandateDescription:
      'Maintains historical editions, permanent publication records, archival documentation and digital preservation standards.',
    status: 'Confirmed',
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
