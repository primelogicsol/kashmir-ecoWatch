// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · THE VISUAL JOURNAL (PHOTO ESSAYS)
// STORY 06: "An Elegy for Winter"
// Curated Monochrome Illustrative Tonal Study & Cryospheric-Seasonal Essay
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';

export const STORY_06_ELEGY_WINTER: MagazineStory = {
  id: 'hd-story-05',
  slug: 'an-elegy-for-winter',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'photo-essays',
  departmentRubric: '03 / THE VISUAL JOURNAL',
  folioCode: '03 / THE VISUAL JOURNAL',
  title: 'An Elegy for Winter',
  subtitle:
    'A ten-plate monochrome visual study and seasonal essay on Chillai Kalan, Western Disturbance snow droughts, and the changing tonal geometry of the Kashmir winter.',
  excerpt:
    'Across the forty solstice days of Chillai Kalan, Kashmir’s winter once arrived as an unbroken architecture of deep snowpack and crystalline stillness. Paired with ten curated monochrome tonal studies from 1,578 to 4,450 meters, this visual essay traces a season fracturing into bare January ridges, stagnant valley inversions, and premature February bloom.',
  dateline: 'SRINAGAR BASIN · LIDDER CIRQUES · WULAR · CHANGTHANG',
  region: 'Kashmir Valley & Western Himalayan Cryosphere',
  readingTimeMinutes: 5,
  wordCount: 1135,
  proseWordCount: 1028,
  estimatedViewingMinutes: 7,
  visualEssayMode: 'illustrative_monochrome_study',
  publishedAt: '2026-11-25',
  updatedAt: '2026-11-27',
  heroImage: '/images/himalayan-dispatch/visual-journal-elegy-winter.jpg',
  heroCaption:
    'Lead Tonal Study — Winter radiation mist, bare deciduous silhouettes, and shallow valley-floor frost during a snow-deficient Chillai Kalan regime (Illustrative archival monochrome study).',
  heroCredit: 'Himalayan Dispatch Visual Editions Desk (Illustrative monochrome study)',
  conceptualFolioDisclosure:
    'Inaugural Curatorial Visual Study: Presents ten illustrative monochrome tonal plates paired with peer-reviewed meteorological and cryospheric literature rather than dated camera-captured field photojournalism.',
  heroMonochrome: true,
  journalistSlug: 'visual-editions-desk',
  bylineDisplay: 'Himalayan Dispatch · Visual Editions Desk',
  bylineRole: 'Monochrome Visual Study & Seasonal Essay',
  factCheckedBy: 'Stage 04 Documentary & Citation Audit Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Curatorial Visual & Meteorological Synthesis — Citations Verified at Stage 04',
  workflowStage: 'editorial_approval',
  isPublished: true,
  hasCompletedIndependentReview: false,
  isVisualJournal: true,
  reportingBeatSlug: 'cryosphere-glaciers-atmospheric-hazards',
  reportingBeatLabel: 'Cryosphere, Glaciers & Atmospheric Systems',
  publicationStatusNote:
    'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: false,
    evidenceSummary:
      'Climatological normals, Western Disturbance dynamics (Kumar et al., 2026), shortened snow-persistence baselines (Gaddam et al., 2026), and winter PM2.5 boundary-layer trace-element studies (Najar et al., 2026) verified at Stage 04.',
    ethicsAndVisualNote:
      'Synthetic photographer persona and all fabricated camera/lens/exposure strings permanently removed; visualEssayMode set to illustrative_monochrome_study with explicit curatorial disclosure.',
  }),
  editorialVerificationNote:
    'Curatorial Visual Disclosure: The ten plates presented in An Elegy for Winter are curated monochrome illustrative tonal studies prepared by the Himalayan Dispatch Visual Editions Desk and paired with peer-reviewed meteorological and cryospheric synthesis. They are not dated, camera-captured documentary field photographs and carry no camera exposure metadata, ensuring readers never mistake illustrative visual studies for evidentiary site photography.',
  chapters: [
    {
      numberRoman: 'I',
      title: 'The Forty-Day Architecture of Chillai Kalan',
      subtitle: 'Vernacular winter reckoning and the synoptic engine of Western Disturbances.',
      paragraphs: [
        'For centuries, agrarian and pastoral life in the Kashmir Valley organized its winter endurance around a precise seventy-day tripartite calendar. Beginning on the December solstice, Chillai Kalan—the forty days of deepest cold running from December 21 through January 30—established the structural snowpack upon which the coming agricultural year depended. Behind it followed twenty days of Chillai Khurd (January 31 to February 19) and ten milder days of Chillai Bachha (February 20 to March 1), stepping the basin gradually toward spring thaw.',
        'Physically, that vernacular calendar tracks the winter southward migration of the subtropical westerly jet stream, steering extratropical cyclonic troughs—Western Disturbances—from the Mediterranean, Caspian, and Black Seas across the Hindu Kush and Pir Panjal. When cold Arctic-continental air masses lock with moisture-bearing westerlies, high cirques accumulate dense solid precipitation while valley roofs hang with meter-long icicles (Kumar et al., 2026; Khanday et al., 2021). Banked above 2,800 meters, Chillai Kalan snow functions as a delayed-release water tower for July paddy terraces and August apple orchards.',
        'Every domestic custom of the valley evolved in dialogue with that forty-day freeze: autumn strings of sun-dried gourds and turnips hung beneath cedar eaves, woven willow kangris glowing with chinar-leaf embers inside mud-plastered rooms, and quiet mornings when wooden spades cleared waist-deep powder off pitched roofs so timber beams would not buckle. Critically, dry mid-winter snow falling at sub-zero temperatures compacts cleanly into high-density firn across the Kolahoi, Thajiwas, and Haramukh accumulation bowls—buying time that late-winter wet slush can never replace.',
      ],
    },
    {
      numberRoman: 'II',
      title: 'Snow Drought, False Spring, and the Rising Freezing Line',
      subtitle: 'Bare January slopes and the vulnerability of premature February blossom.',
      paragraphs: [
        'In recent decades, the once-dependable rhythm of solstice snow has grown erratic, oscillating between prolonged mid-winter snow droughts and sudden, wet late-season blizzards. Across January 2024 and again through much of December 2024, persistent upper-tropospheric ridging deflected moisture-bearing Western Disturbances northward or weakened their synoptic lift, leaving Gulmarg’s subalpine bowls brown with dry grass and exposing bare limestone ribs at 3,200 meters during the heart of Chillai Kalan.',
        'Simultaneously, regional warming of roughly 1.4 degrees Celsius above late-twentieth-century valley normals has lifted the winter zero-degree isotherm upslope by nearly three hundred vertical meters. Storms that once buried lower karewa benches in dry powder increasingly fall as cold rain below 2,200 meters, accelerating rain-on-snow runoff and shortening seasonal snow persistence (Gaddam et al., 2026). When anomalously warm February afternoons coax almond (Prunus dulcis) and apricot buds out of dormancy weeks ahead of custom, a single March polar trough or wet snowfall can shatter an entire season’s pollination.',
        'Hydrologically, a snow-starved January extracts a compound debt six months later. Without a thick seasonal snow blanket shielding glacier ice from spring insolation, darker debris-laden ablation tongues across the Upper Jhelum and Lidder headwaters begin losing perennial ice mass weeks ahead of historical schedules (Rashid et al., 2020; Romshoo, Murtaza, & Abdullah, 2022). Streams surge briefly in early spring and then falter in August, precisely when downstream paddy transplantation and fruit sizing demand steady cold baseflow.',
      ],
    },
    {
      numberRoman: 'III',
      title: 'Stagnant Bowls and Darkened Cirques',
      subtitle: 'Reading winter transformation in monochrome contrast from valley inversion to glacier snout.',
      paragraphs: [
        'Without cyclonic snowstorms to scrub the lower atmosphere, dry winter high-pressure domes transform the oval Kashmir Valley into a sealed nocturnal radiation trap. Cold katabatic drainage pools over the Jhelum floodplain beneath warmer air aloft, confining domestic biomass smoke, kangri charcoal plumes, brick-kiln emissions, and diesel exhaust within a shallow boundary layer of grey haze enriched in fine particulate trace elements (Najar et al., 2026). Aloft, transported black-carbon aerosols settle onto high-altitude snowfields, lowering surface albedo and accelerating radiative melt even beneath sub-zero air (Pu et al., 2021).',
        'Rendering these ten landscapes as monochrome tonal studies strips away the comforting illusion of clear blue winter skies. Reduced to luminance, shadow, and grain, the eye confronts physical form directly: dry river boulders protruding through premature February baseflow, exposed lateral moraines above shrinking cirque ice, and reedbeds waiting in pale frost for storms delayed across the horizon.',
        'Sequenced across nearly three vertical kilometers—from Wular’s 1,578-meter drawdown flats to Changthang’s 4,450-meter wind-scoured steppe—these curated plates trace a single thermodynamic column. What appears in the city as stagnant morning haze and on the mountain crest as bare rock ribs are two halves of the same synoptic shift: an ancient winter learning an unfamiliar grammar of warmth, interruption, and loss.',
      ],
    },
  ],
  photoPlates: [
    {
      plateRoman: 'PLATE I',
      title: 'Radiation Mist on the Valley Floor',
      imageUrl: '/images/himalayan-dispatch/visual-journal-elegy-winter.jpg',
      location: 'Central Kashmir Alluvial Bowl',
      elevation: '~1,585 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · CHILLAI KALAN RADIATION FOG REGIME · VALLEY FLOOR ~1,585 M',
      narrative:
        'During snow-deficient solstice weeks, intense nocturnal radiative cooling condenses shallow ground mist across bare poplars, willow rows, and dormant paddy bunds, replacing the deep insulating snow blanket that historically buffered winter soil temperatures and recharged springtime moisture across the central valley floor.',
    },
    {
      plateRoman: 'PLATE II',
      title: 'Debris Ribs Below the Cirque Headwall',
      imageUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
      location: 'Upper Lidder Glaciated Headwaters',
      elevation: '~3,790 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · HIGH-RELIEF ABLATION & DEBRIS MANTLE REGIME · ~3,790 M',
      narrative:
        'Where multi-meter winter accumulation once smoothed valley glacier tongues from wall to wall by mid-January, dark supraglacial boulder bands and steep lateral moraine scars remain starkly legible against thin, wind-redistributed snow patches absorbing clear-sky winter solar radiation.',
    },
    {
      plateRoman: 'PLATE III',
      title: 'The Trapped Atmospheric Bowl',
      imageUrl: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
      location: 'Srinagar Urban Jhelum Corridor',
      elevation: '~1,585 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · NOCTURNAL & DAWN BOUNDARY-LAYER INVERSION REGIME · ~1,585 M',
      narrative:
        'Under stalled anticyclonic ridges devoid of wet scavenging storms, a low thermal inversion lid compresses domestic biomass smoke, brick-kiln plumes, vehicular exhaust, and fine particulate aerosols tightly against the sluggish winter mirror of the Jhelum through mid-morning.',
    },
    {
      plateRoman: 'PLATE IV',
      title: 'Frost Along the Contracted Reedline',
      imageUrl: '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
      location: 'Hokersar Floodplain Marsh Margin',
      elevation: '~1,584 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · PALUSTRINE WINTER HYDROPERIOD REGIME · ~1,584 M',
      narrative:
        'Brittle hoarfrost whitens emergent Typha and Phragmites stalks framing narrow ice-free channels where wintering Central Asian waterfowl crowd into tighter nocturnal rafts whenever dry autumns reduce tributary inflow and shallow outer mudflats freeze.',
    },
    {
      plateRoman: 'PLATE V',
      title: 'Unburied Stems at the Birch Ceiling',
      imageUrl: '/images/publications/forestry-betula-treeline-lidar.jpg',
      location: 'Subalpine Betula utilis Ecotone',
      elevation: '~3,450 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · SUBALPINE TREELINE SNOWPACK DEFICIT REGIME · ~3,450 M',
      narrative:
        'Snow-bent papery trunks of Himalayan birch depend on deep mid-winter drift burial to insulate shallow root collars from desiccating freeze-thaw cycles and release slow rhizosphere moisture when subalpine budbreak arrives in late May.',
    },
    {
      plateRoman: 'PLATE VI',
      title: 'Arid Gale on the Rain-Shadow Steppe',
      imageUrl: '/images/publications/pashmina-changthang-pastoral-ecology.jpg',
      location: 'Trans-Himalayan Changthang Plateau',
      elevation: '~4,450 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · TRANS-HIMALAYAN COLD ARID STEPPE REGIME · ~4,450 M',
      narrative:
        'East of the Great Himalayan crest, sub-zero westerly gales scour sparse Carex and Kobresia sedge pastures where high-altitude pastoral herds navigate twin extremes: moisture-starved winter dust and sudden ice-crusting storms that lock winter forage beneath impenetrable glaze.',
    },
    {
      plateRoman: 'PLATE VII',
      title: 'Stillness on the High Glacial Tarn',
      imageUrl: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
      location: 'Upper Lidder Oligotrophic Cirque Basin',
      elevation: '~3,590 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · ALPINE CRYOLIMNOLOGICAL FREEZE REGIME · ~3,590 M',
      narrative:
        'High oligotrophic cirque lakes register delayed autumn-to-winter freeze-up dates and progressively earlier spring ice-out thresholds, altering under-ice thermal stratification, dissolved-oxygen balance, and meltwater release timing into steep mountain gorges below.',
    },
    {
      plateRoman: 'PLATE VIII',
      title: 'Low-Stage Mirror Across the Willow Belt',
      imageUrl: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
      location: 'Wular Lacustrine Basin · Bandipora',
      elevation: '~1,578 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · WINTER BASEFLOW DETENTION DRAWDOWN REGIME · ~1,578 M',
      narrative:
        'At the lowest hydraulic sink of the Kashmir Valley, bare Salix plantations and wide exposed mudflats trace winter baseflow contraction whenever upper watersheds receive brief rain pulses instead of sustained solid snow storage.',
    },
    {
      plateRoman: 'PLATE IX',
      title: 'Wind-Loaded Cornice and Isothermal Stress',
      imageUrl: '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
      location: 'Great Himalayan & Pir Panjal Pass Zone',
      elevation: '~3,520 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · LEEWARD DRIFT & WET-SLAB INSTABILITY REGIME · ~3,520 M',
      narrative:
        'Abrupt warm winter storm intrusions deposit dense, moisture-heavy snow layers atop weak faceted depth-hoar crystals grown during prolonged clear-sky droughts, sharpening wet-slab avalanche hazard along steep mountain passes and valley settlements.',
    },
    {
      plateRoman: 'PLATE X',
      title: 'Early Meltwater Among Bare Boulders',
      imageUrl: '/images/publications/lidder-pahalgam-mountain-river.jpg',
      location: 'Boulder Reach · Lidder Gorge',
      elevation: '~2,180 m',
      exposureMeta:
        'MONOCHROME TONAL PLATE · PREMATURE LATE-WINTER ABLATION BASEFLOW REGIME · ~2,180 M',
      narrative:
        'Cold, clear meltwater threads past unburied granodiorite boulders weeks ahead of historical spring thaw—an austere hydrographic signature of mountain snowpack spent prematurely in February rather than held in reserve for summer scarcity.',
    },
  ],
  documentarySources: [
    {
      label: 'Kumar et al. (2026) — Science of the Total Environment',
      url: 'https://doi.org/10.1016/j.scitotenv.2026.181812',
      relevance: 'Multi-scalar aridity dynamics and winter Western Disturbance coupling in the Western Himalaya',
    },
    {
      label: 'Gaddam et al. (2026) — Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-026-53393-8',
      relevance: 'Intensifying precipitation extremes, shortened snow persistence, and rainfall-driven runoff shifts',
    },
    {
      label: 'Najar et al. (2026) — Environmental Science and Pollution Research',
      url: 'https://doi.org/10.1007/s11356-026-38379-3',
      relevance: 'Atmospheric trace elements in PM2.5 and winter boundary-layer source apportionment in the Western Himalaya',
    },
    {
      label: 'Pu et al. (2021) — The Cryosphere',
      url: 'https://doi.org/10.5194/tc-15-2255-2021',
      relevance: 'Snow albedo reduction and radiative forcing driven by coated black carbon aerosols in snowpack',
    },
    {
      label: 'Khanday et al. (2021) — CATENA',
      url: 'https://doi.org/10.1016/j.catena.2020.104853',
      relevance: 'Spatio-seasonal hydrochemistry and snowmelt dynamics across the River Jhelum Basin',
    },
    {
      label: 'India Meteorological Department (IMD) — Srinagar Climatological Centre',
      url: 'https://mausam.imd.gov.in/srinagar/',
      relevance: 'Official winter temperature anomalies and Western Disturbance precipitation deficit bulletins',
    },
  ],
  editorialMetadataTable: [
    { attribute: 'Publication', assignment: 'Himalayan Dispatch' },
    { attribute: 'Edition', assignment: 'Vol. 01 / No. 01 · The Inaugural Issue' },
    { attribute: 'Department', assignment: 'Photo Essays (The Visual Journal)' },
    { attribute: 'Visual Essay Mode', assignment: 'Illustrative Monochrome Tonal Study (10 Curated Plates)' },
    { attribute: 'Byline', assignment: 'Himalayan Dispatch · Visual Editions Desk' },
    { attribute: 'Publication Gate', assignment: 'Stage 08 · Pre-Release Folio Awaiting Administrator Approval' },
  ],
  corrections: [],
  relatedKewModule: {
    label: 'View KEW Western Disturbances & Cryosphere Telemetry',
    href: '/hazard-intelligence/atmospheric-systems/western-disturbances',
    scientificContext:
      'Cross-referenced with KEW Climate & Atmosphere (+1.42 °C anomaly, snow-drought frequency) and Cryosphere observatories.',
  },
  seoTitle: 'An Elegy for Winter: Monochrome Visual Study of Chillai Kalan & Himalayan Snow Drought',
  seoKeywords: [
    'An Elegy for Winter',
    'Chillai Kalan snow drought Kashmir',
    'Western Disturbances climate change Himalaya',
    'Srinagar winter thermal inversion black carbon',
    'Himalayan Dispatch monochrome visual essay',
  ],
};
