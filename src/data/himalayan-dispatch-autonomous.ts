// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — DAILY DISPATCH CORPUS, BEATS & AUTONOMOUS NEWSROOM SEEDS
// Connected to the single Himalayan Dispatch editorial store.
// Note: Autonomous queue drafts remain strictly private on the server until
// explicitly reviewed and approved by an authenticated editorial administrator.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  AutonomousEditorialQueueItem,
  AutonomousSourceSignal,
  DailyDispatchArticle,
  ReportingBeatFullSpec,
} from '@/types/himalayan-dispatch';

export const REPORTING_BEATS_FULL: ReportingBeatFullSpec[] = [
  {
    slug: 'cryosphere-glaciers-high-passes',
    code: 'BEAT 01',
    title: 'Cryosphere, Glaciers & High Passes',
    leadDepartmentId: 'cover-stories',
    leadDepartmentSlug: 'cover-stories',
    leadEditorRole: 'Science Editor & Chair of Cryosphere Review',
    summary:
      'Mass-balance thresholds, surging Karakoram ice, permafrost thaw, GLOF hazards, and winter snowline retreat above 3,500 meters.',
    editorialMandate:
      'Tracks seasonal accumulation deficits, equilibrium-line altitude shifts, black-carbon deposition on valley glaciers, and community early-warning readiness across Haramukh, Kolahoi, Zanskar, Nun-Kun, Hispar, and Baltoro.',
    coveredBureaus: ['kashmir', 'ladakh', 'gilgit', 'baltistan', 'jammu'],
    keyQuestions: [
      'How rapidly are end-of-summer snowlines climbing across sub-catchments feeding municipal drinking water and orchard kuhls?',
      'Where are moraine-dammed proglacial lakes expanding near seasonal grazing routes and downstream bridges?',
      'How do winter western-disturbance anomalies reshape spring melt timing across the Indus and Jhelum headwaters?',
    ],
    kewObservatoryLabel: 'KEW Glaciers & Cryosphere Observatory',
    kewObservatoryHref: '/water-systems/glaciers',
  },
  {
    slug: 'lakes-wetlands-springs-waterways',
    code: 'BEAT 02',
    title: 'Lakes, Wetlands, Springs & Urban Waterways',
    leadDepartmentId: 'longform-features',
    leadDepartmentSlug: 'longform-features',
    leadEditorRole: 'Managing Editor, Investigations & Dispatches',
    summary:
      'Lacustrine bathymetry, Ramsar marshes, disappearing karst springsheds, and floodplain urbanization across Himalayan valleys.',
    editorialMandate:
      'Documents trophic shifts in Dal, Wular, Manasbal, Surinsar-Mansar, and high-altitude endorheic lakes alongside perennial nag spring depletion and urban canal history.',
    coveredBureaus: ['kashmir', 'jammu', 'ladakh', 'ajk'],
    keyQuestions: [
      'Why are centuries-old karst and karewa village springs turning seasonal or drying out entirely?',
      'Are wetland water-retention gates and silt-traps maintaining sufficient winter depth for Central Asian Flyway waterfowl?',
      'Where does untreated municipal or agricultural runoff enter protected lacustrine basins?',
    ],
    kewObservatoryLabel: 'KEW Lakes, Wetlands & Springs Intelligence',
    kewObservatoryHref: '/water-systems/lakes',
  },
  {
    slug: 'transboundary-rivers-hydropower',
    code: 'BEAT 03',
    title: 'Transboundary Rivers & Hydropower',
    leadDepartmentId: 'investigative-journalism',
    leadDepartmentSlug: 'investigative-desk',
    leadEditorRole: 'Investigations Editor',
    summary:
      'Indus, Jhelum, Chenab, Kishanganga–Neelum, and Shyok flow regimes, tunnel muck disposal, riverbed mining, and environmental clearance scrutiny.',
    editorialMandate:
      'Follows statutory environmental impact stipulations, e-flow releases, cascading dam sediment traps, and mechanized cobble extraction across steep Himalayan gorges.',
    coveredBureaus: ['jammu', 'kashmir', 'ladakh', 'ajk', 'gilgit', 'baltistan'],
    keyQuestions: [
      'Do tunnel spoil and muck-dumping sites comply with mandated retaining walls above high-flood lines?',
      'How does cumulative cascade impoundment alter winter baseflow and aquatic habitat along the Chenab and Kishanganga–Neelum?',
      'Where has mechanized riverbed mining dropped stream thalwegs below traditional gravity-kuhl intakes?',
    ],
    kewObservatoryLabel: 'KEW Mining, Energy & Fluvial Impact Observatory',
    kewObservatoryHref: '/earth-human-impact/energy-infrastructure',
  },
  {
    slug: 'biodiversity-forests-pastoral-commons',
    code: 'BEAT 04',
    title: 'Alpine Biodiversity, Forests & Pastoral Commons',
    leadDepartmentId: 'field-reports',
    leadDepartmentSlug: 'field-reports',
    leadEditorRole: 'Environment & Climate Editor',
    summary:
      'Endangered mountain ungulates, migratory flyways, temperate conifers, medicinal flora, and Bakarwal–Changpa seasonal grazing routes.',
    editorialMandate:
      'Reports from Dachigam, Kishtwar High Altitude National Park, Hemis, Changthang, and Deosai margins on Hangul, markhor, snow leopard corridors, forest fire lines, and indigenous stewardship.',
    coveredBureaus: ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'],
    keyQuestions: [
      'Are wildlife movement corridors between Dachigam, Sindh, Overa-Aru, and Tralsar remaining permeable?',
      'How are late autumn dry spells extending forest-fire seasons across Pir Panjal and Chenab conifer compartments?',
      'How do village forest committees and transhumant herders adapt rotational grazing to shifting phenology?',
    ],
    kewObservatoryLabel: 'KEW Biodiversity & Protected Network',
    kewObservatoryHref: '/biodiversity',
  },
  {
    slug: 'earth-observation-climate-records',
    code: 'BEAT 05',
    title: 'Earth Observation, Cartography & Climate Records',
    leadDepartmentId: 'data-journalism',
    leadDepartmentSlug: 'data-journalism',
    leadEditorRole: 'Editor of Editorial Data & Cartography',
    summary:
      'Multi-decadal satellite reanalysis, elevation-band warming, air-shed inversions, and bespoke print-grade cartographic essays.',
    editorialMandate:
      'Synthesizes optical/SAR remote sensing, meteorological reanalysis, and air-quality series into verified visual journalism with full methodological disclosure.',
    coveredBureaus: ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'],
    keyQuestions: [
      'What does forty years of Landsat and Sentinel imagery reveal about karewa tableland conversion and marsh contraction?',
      'How severely do winter thermal inversions concentrate PM2.5 across valley-floor neighborhoods?',
      'Where do multi-sensor slope-deformation signals point to emerging landslide hazards along mountain highways?',
    ],
    kewObservatoryLabel: 'KEW Satellite Change Detection Observatory',
    kewObservatoryHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    slug: 'documentary-photography-oral-memory',
    code: 'BEAT 06',
    title: 'Documentary Photography & Oral Mountain Memory',
    leadDepartmentId: 'photo-essays',
    leadDepartmentSlug: 'visual-journal',
    leadEditorRole: 'Director of Photography & Visual Editions',
    summary:
      'Large-format monochrome and natural-light visual sequences paired with oral histories of elders, scientists, and land custodians.',
    editorialMandate:
      'Preserves visual and vernacular ecological memory across high passes, river landings, artisanal workshops, and winter villages under strict zero-manipulation documentary ethics.',
    coveredBureaus: ['kashmir', 'ladakh', 'jammu', 'baltistan', 'gilgit', 'ajk'],
    keyQuestions: [
      'Which vernacular water, snow, and agricultural practices hold adaptive wisdom for a warming Himalaya?',
      'How can slow repeat photography document multi-year landscape transitions at identical vantage points?',
      'How do mountain communities narrate ecological loss and stewardship in Kashmiri, Gojri, Ladakhi, Dogri, Balti, Shina, and Burushaski?',
    ],
    kewObservatoryLabel: 'KEW Green Heroes & Cultural Ecology Archive',
    kewObservatoryHref: '/resources/kew-green-heroes',
  },
  {
    slug: 'environmental-legacy-conservation-accountability',
    code: 'BEAT 07',
    title: 'Environmental Legacy & Conservation Accountability',
    leadDepartmentId: 'cover-stories',
    leadDepartmentSlug: 'cover-stories',
    leadEditorRole: 'Himalayan Dispatch Desk & Investigations Editor',
    summary:
      'Frontline forest and wildlife defenders, Green Martyrs historical verification, occupational safety, bereaved family welfare, and institutional conservation accountability.',
    editorialMandate:
      'Preserves the individual identities and documentary histories of fallen conservation personnel across Jammu & Kashmir and the Western Himalayas while investigating occupational safety, firefighting preparedness, employment equity for daily-rated watchers, and annual September 11 accountability.',
    coveredBureaus: ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'],
    keyQuestions: [
      'Why do historical Forest Department martyrdom totals vary across annual commemorations (≈100 in 2022, 85 in 2023, ≈100 in 2024), and how are daily-rated workers and accidental duty fatalities classified?',
      'Are frontline forest guards and temporary watchers equipped with fire-resistant PPE, emergency mountain communications, life insurance, and timely family compensation?',
      'Are the watersheds, deodar compartments, and wildlife habitats defended by fallen personnel receiving durable ecological protection?',
    ],
    kewObservatoryLabel: 'KEW Green Martyrs Memorial Registry',
    kewObservatoryHref: '/resources/kew-green-heroes?tab=green-martyrs',
  },
];

export const DAILY_DISPATCH_ARTICLES: DailyDispatchArticle[] = [
  {
    id: 'dd-2026-11-24-hokersar',
    slug: 'autumn-gate-retention-restores-early-pintail-staging-at-hokersar',
    headline: 'Early November Gate Retention Restores Shallow Staging Pools Across Hokersar’s Central Reedbeds',
    standfirst:
      'Timely hydraulic closure ahead of the first Siberian cold front holds winter water depth steady for early-arriving Northern Pintails and Gadwalls, though tributary silt plumes remain under watch.',
    dateline: 'ZAINAKOTE & SOIBUGH · KASHMIR BUREAU',
    bureauId: 'kashmir',
    bureauLabel: 'Kashmir Bureau',
    beatSlug: 'lakes-wetlands-springs-waterways',
    beatTitle: 'Lakes, Wetlands, Springs & Urban Waterways',
    departmentId: 'field-reports',
    departmentLabel: 'Field Reports',
    publishedAt: '2026-11-24',
    readingTimeMinutes: 2,
    bylineDisplay: 'Himalayan Dispatch · Wetlands & Forest Desk',
    journalistSlug: 'wetlands-forest-desk',
    factCheckedBy: 'Stage 04 Observatory Cross-Check · Himalayan Dispatch Desk',
    scientificSourceNote:
      'Synthesized from KEW Ramsar Wetland hydro-period baselines and published Hokersar management literature.',
    aiAssistanceDisclosure:
      'Inaugural Editorial Desk & Observatory Synthesis: Prepared from Kashmir EcoWatch Ramsar hydro-period baselines and published wetland literature; not an on-site field-interview dispatch.',
    heroImage: '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
    heroCaption:
      'Shallow open-water channels and Typha reed islands representative of Hokersar Wetland Reserve (Illustrative archival plate — representative habitat file image, not date-specific event photography).',
    heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
    keyFindings: [
      'Regulated outlet needle-gates raised central pool depth prior to mid-November migratory arrivals.',
      'Doodhganga flood-spill sediment load continues to require perimeter silt-trap maintenance.',
      'Nocturnal light spillover along the southern bund remains a localized disturbance factor.',
    ],
    paragraphs: [
      'Across the central open-water mirror of Hokersar, seasonal outlet retention ahead of late-autumn cold fronts determines whether shallow foraging depths remain available for early waves of dabbling waterfowl arriving along the Central Asian Flyway. Unlike dry autumns in which delayed gate closure leaves mudflats exposed into late November, coordinated retention holds autumn inflow inside the core marsh.',
      'Hydrological syntheses nonetheless caution that wetland management cannot stop at the outlet gate. Along the eastern inflow channel, fine silt carried off upstream karewa scarps and construction corridors continues to shallow peripheral reed lagoons, narrowing the buffer between roosting flocks and suburban roads.',
      'Maintaining quiet, unlit perimeter zones along the Zainakote–Soibugh margin through December and January remains decisive in determining whether wintering flocks disperse across the valley’s satellite marshes or crowd into shrinking central pools.',
    ],
    relatedKewModule: {
      label: 'KEW Wetland Reserves & Ramsar Profiles',
      href: '/water-systems/wetlands',
      context: 'Live wetland basin profiles and seasonal hydro-period indicators.',
    },
    isPublished: true,
    corrections: [],
  },
  {
    id: 'dd-2026-11-21-srinagar-inversion',
    slug: 'november-radiation-inversions-trap-evening-particulates-across-jhelum-bowl',
    headline: 'Calm November High-Pressure Ridges Trigger Sharp Evening PM2.5 Spikes Across the Srinagar Bowl',
    standfirst:
      'In the absence of early wet western disturbances, nocturnal radiative cooling caps valley air below 300 meters—turning biomass smoke, kiln plumes, and commuter exhaust into a dense dusk lid.',
    dateline: 'SRINAGAR · KASHMIR BUREAU',
    bureauId: 'kashmir',
    bureauLabel: 'Kashmir Bureau',
    beatSlug: 'earth-observation-climate-records',
    beatTitle: 'Earth Observation, Cartography & Climate Records',
    departmentId: 'data-journalism',
    departmentLabel: 'Data Journalism',
    publishedAt: '2026-11-21',
    readingTimeMinutes: 2,
    bylineDisplay: 'Himalayan Dispatch · Data & Cartography Desk',
    journalistSlug: 'data-cartography-desk',
    factCheckedBy: 'Stage 04 Observatory Cross-Check · Himalayan Dispatch Desk',
    scientificSourceNote:
      'Compiled from KEW Air Pollution diurnal baseline curves and published Srinagar boundary-layer aerosol literature.',
    aiAssistanceDisclosure:
      'Inaugural Editorial Desk & Observatory Synthesis: Compiled from Kashmir EcoWatch diurnal particulate baselines and published boundary-layer meteorology literature.',
    heroImage: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
    heroCaption:
      'Shallow evening winter haze pooling along the Jhelum river corridor beneath surrounding mountain ridges (Illustrative archival plate — representative atmospheric file image).',
    heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
    keyFindings: [
      'Evening particulate concentrations climb sharply between 17:30 and 22:00 IST as surface winds decouple.',
      'Valley topography prevents horizontal dispersion until mid-morning solar heating breaks the inversion cap.',
      'Findings inform Issue 02’s forthcoming deep investigation into Srinagar’s winter air-shed.',
    ],
    paragraphs: [
      'Every clear November evening in the Kashmir Valley performs a textbook demonstration of mountain boundary-layer physics. As soon as sunset drains warmth from the valley floor, cold air slides down the surrounding Pir Panjal and Zabarwan slopes, pooling beneath a warmer layer aloft like a glass lid over a bowl.',
      'Beneath that lid, emissions that might disperse across a flat plain—twig and leaf burning in orchards, domestic heating stoves, diesel freight bottlenecks, and construction dust—accumulate within a shallow breathing zone barely two to three hundred meters deep.',
      'Diurnal station traces reviewed by Himalayan Dispatch’s Data Desk show afternoon air quality briefly appearing moderate during peak solar mixing, only to deteriorate steeply within ninety minutes of dusk—underscoring why 24-hour averages often mask acute evening respiratory exposure.',
    ],
    relatedKewModule: {
      label: 'KEW Air Pollution & Boundary-Layer Telemetry',
      href: '/environmental-monitoring/air-pollution',
      context: 'District-level AQI, particulate trends, and atmospheric monitoring.',
    },
    isPublished: true,
    corrections: [],
  },
  {
    id: 'dd-2026-11-18-chenab-slopes',
    slug: 'post-monsoon-cut-slope-seepage-monitored-along-ramban-kishtwar-corridor',
    headline: 'Post-Monsoon Subsurface Seepage Keeps Cut-Slopes Fragile Along the Ramban–Kishtwar Chenab Gorge',
    standfirst:
      'Geotechnical slope-stability syntheses along steep phyllite and slate road benches show why slope failures often lag weeks behind peak rainfall—and why drainage weep-holes matter as much as retaining concrete.',
    dateline: 'RAMBAN & DODA · JAMMU DESK SYNTHESIS',
    bureauId: 'jammu',
    bureauLabel: 'Jammu Bureau',
    beatSlug: 'transboundary-rivers-hydropower',
    beatTitle: 'Transboundary Rivers & Hydropower',
    departmentId: 'investigative-journalism',
    departmentLabel: 'Investigative Desk',
    publishedAt: '2026-11-18',
    readingTimeMinutes: 2,
    bylineDisplay: 'Himalayan Dispatch · Investigations & Urban Water Desk',
    journalistSlug: 'investigations-urban-water-desk',
    factCheckedBy: 'Stage 04 Observatory Cross-Check · Himalayan Dispatch Desk',
    scientificSourceNote:
      'Synthesized with KEW Landslide Susceptibility & Slope Stability dossiers across the Middle Chenab corridor.',
    aiAssistanceDisclosure:
      'Inaugural Editorial Desk & Observatory Synthesis: Prepared from Kashmir EcoWatch landslide susceptibility dossiers and published Himalayan geotechnical literature; no firsthand bureau field interviews are claimed.',
    heroImage: '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
    heroCaption:
      'Steep fractured rock and colluvial benches overlooking an incised Himalayan highway corridor (Illustrative archival plate — representative terrain file image, not date-specific incident photography).',
    heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
    keyFindings: [
      'Foliated phyllites and schists along the Chenab gorge lose shear strength when perched pore-water pressures persist.',
      'Blocked toe-drains and unbuttressed toe cuts amplify rockfall risk during early winter freeze-thaw cycles.',
      'Documentary tracking of muck-disposal embankments along tributary confluences remains an active desk priority.',
    ],
    paragraphs: [
      'Travelers through the Middle Chenab gorge between Nashri, Ramban, Doda, and Kishtwar are accustomed to associating landslides with torrential July downpours or March snowmelt. Yet mountain highway engineering literature highlights a subtler hazard: the dry-weather November slump triggered by slow subsurface seepage and early nocturnal frost.',
      'Where vertical bench cuts intersect fractured metamorphic rock without deep horizontal drainage pipes, water stored upslope continues migrating toward the exposed face weeks after skies clear. Overnight sub-zero temperatures freeze moisture at the rock face, wedging joints apart until midday sun releases stone onto the carriageway.',
      'Published Himalayan slope-stability studies and mountain highway assessments stress that bio-engineering, stepped bench geometry, and unblocked drainage galleries offer far higher long-term resilience than rigid vertical concrete walls built against active colluvium.',
    ],
    relatedKewModule: {
      label: 'KEW Landslide & Slope Instability Intelligence',
      href: '/hazard-intelligence/landslides',
      context: 'Spatial susceptibility modeling and corridor hazard records.',
    },
    isPublished: true,
    corrections: [],
  },
  {
    id: 'dd-2026-11-14-ladakh-ice-reservoirs',
    slug: 'zanskar-and-leh-villages-prepare-gravity-fed-ice-reservoir-pipes-ahead-of-solstice',
    headline: 'High-Altitude Hamlets Across Leh and Zanskar Ready Gravity-Fed Ice-Reservoir Pipelines for Freeze Season',
    standfirst:
      'As natural cirque glaciers retreat higher above barley terraces, community water committees calibrate diversion intakes to freeze winter stream baseflow into conical spring water banks.',
    dateline: 'LEH & ZANSKAR · LADAKH BUREAU',
    bureauId: 'ladakh',
    bureauLabel: 'Ladakh Bureau',
    beatSlug: 'cryosphere-glaciers-high-passes',
    beatTitle: 'Cryosphere, Glaciers & High Passes',
    departmentId: 'field-reports',
    departmentLabel: 'Field Reports',
    publishedAt: '2026-11-14',
    readingTimeMinutes: 2,
    bylineDisplay: 'Himalayan Dispatch · Visual Editions Desk',
    journalistSlug: 'visual-editions-desk',
    factCheckedBy: 'Stage 04 Observatory Cross-Check · Himalayan Dispatch Desk',
    scientificSourceNote:
      'Reviewed against Trans-Himalayan cryosphere and seasonal irrigation water-balance studies.',
    aiAssistanceDisclosure:
      'Inaugural Editorial Desk & Observatory Synthesis: Compiled from published Trans-Himalayan cryo-hydrology and artificial ice-reservoir scholarship; not an on-site bureau field report.',
    heroImage: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
    heroCaption:
      'High-elevation Trans-Himalayan headwater terrain representative of cold-desert cryosphere basins (Illustrative archival plate — KEW Visual Archive file image).',
    heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
    keyFindings: [
      'Spring sowing in April–May faces an acute meltwater gap before high-altitude glaciers above 5,200 m begin melting.',
      'Community-managed winter ice reservoirs store otherwise unutilized winter stream discharge close to village fields.',
      'Warmer early-winter nights require careful nozzle scheduling to prevent mid-winter pipe bursts or premature thaw.',
    ],
    paragraphs: [
      'In the cold desert valleys of Ladakh and Zanskar, survival has always hinged on timing rather than annual rainfall totals. Barley and peas must be watered in late April and May—weeks before sunlight reaches high enough to melt glaciers retreating above five thousand meters.',
      'Published Trans-Himalayan water-stewardship studies across side valleys of Leh and Zanskar document how village water committees bury high-density polyethylene intake lines beneath frost depth ahead of winter freeze and clear silt traps so winter baseflow can spray skyward by gravity and freeze into shaded ice cones.',
      'Cryo-hydrological evaluations emphasize that artificial ice reservoirs are neither a panacea nor a substitute for global emissions cuts—they cannot replace a lost valley glacier—but they buffer critical spring irrigation weeks for household orchards and ancestral terraces.',
    ],
    relatedKewModule: {
      label: 'KEW Glaciers & Trans-Himalayan Cryosphere',
      href: '/water-systems/glaciers',
      context: 'Western Himalayan glacier inventory and meltwater regime analysis.',
    },
    isPublished: true,
    corrections: [],
  },
  {
    id: 'dd-2026-11-09-pir-panjal-firelines',
    slug: 'delayed-autumn-snow-prompts-community-fireline-vigils-along-south-kashmir-conifer-belts',
    headline: 'Delayed Autumn Precipitation Prompts Community Fire-Watch Vigils Across South Kashmir Conifer Compartments',
    standfirst:
      'Dry pine-needle litter on south-facing slopes between Anantnag, Kulgam, and Rajouri underscores how moisture deficits are stretching the Himalayan wildfire window into early winter.',
    dateline: 'ANANTNAG & PIR PANJAL FLANKS · KASHMIR BUREAU',
    bureauId: 'kashmir',
    bureauLabel: 'Kashmir Bureau',
    beatSlug: 'biodiversity-forests-pastoral-commons',
    beatTitle: 'Alpine Biodiversity, Forests & Pastoral Commons',
    departmentId: 'field-reports',
    departmentLabel: 'Field Reports',
    publishedAt: '2026-11-09',
    readingTimeMinutes: 1,
    bylineDisplay: 'Himalayan Dispatch · Wetlands & Forest Desk',
    journalistSlug: 'wetlands-forest-desk',
    factCheckedBy: 'Stage 04 Observatory Cross-Check · Himalayan Dispatch Desk',
    scientificSourceNote:
      'Cross-referenced with KEW Forest Fires & Drought Spell monitoring indicators.',
    aiAssistanceDisclosure:
      'Inaugural Editorial Desk & Observatory Synthesis: Prepared from Kashmir EcoWatch wildfire-seasonality indicators and published montane forestry protocols.',
    heroImage: '/images/hazard-intelligence/hazard-forest-fires-wildfire.jpg',
    heroCaption:
      'Dry autumn understory conditions along temperate Himalayan conifer slopes prior to winter snowpack (Illustrative archival plate — representative hazard file image).',
    heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
    keyFindings: [
      'Extended autumn dry spells desiccate forest-floor duff and grass litter across sun-exposed compartments.',
      'Joint vigilance between beat guards and village forest committees remains critical for rapid containment.',
    ],
    paragraphs: [
      'Historically, November storms soaked the temperate Blue Pine and Himalayan Cedar belts of southern Kashmir and the Pir Panjal, ending wildfire risk until late spring. Over recent dry autumns, however, crisp litter beds have persisted right up to December.',
      'Community forest fire-prevention protocols across Bringi, Lidder, and Pir Panjal compartments emphasize clearing footpath firebreaks around young regeneration plots and cautioning grazers and travellers against open warming fires near dry grass slopes.',
    ],
    relatedKewModule: {
      label: 'KEW Forest Fires & Burn Scar Intelligence',
      href: '/hazard-intelligence/forest-fires',
      context: 'Active thermal anomaly watch and forest compartment resilience.',
    },
    isPublished: true,
    corrections: [],
  },
  {
    id: 'dd-2026-11-05-karakoram-glof-watch',
    slug: 'remote-sensing-review-tracks-late-season-drainage-across-karakoram-ice-dammed-basins',
    headline: 'Late-Season Optical & Radar Synthesis Tracks Autumn Drainage Stability Across Karakoram Ice-Dammed Tributaries',
    standfirst:
      'Multi-temporal satellite observations across the Hunza, Ghizer, and Shyok headwaters highlight why transboundary cryospheric data sharing remains vital for downstream valley communities.',
    dateline: 'FAIRFAX DESK & UPPER INDUS OBSERVATORY · GILGIT & BALTISTAN WATCH',
    bureauId: 'gilgit',
    bureauLabel: 'Gilgit Bureau (In Establishment)',
    beatSlug: 'cryosphere-glaciers-high-passes',
    beatTitle: 'Cryosphere, Glaciers & High Passes',
    departmentId: 'data-journalism',
    departmentLabel: 'Data Journalism',
    publishedAt: '2026-11-05',
    readingTimeMinutes: 2,
    bylineDisplay: 'Dr. Fayaz Ahmad Khan',
    journalistSlug: 'dr-fayaz-ahmad-khan',
    factCheckedBy: 'Stage 04 Observatory Cross-Check · Himalayan Dispatch Desk',
    scientificSourceNote:
      'Compiled from open Sentinel-1 SAR backscatter and Sentinel-2 optical water-index series via KEW GLOF Observatory.',
    aiAssistanceDisclosure:
      'Inaugural Editorial Desk & Observatory Synthesis: Remote-sensing synthesis compiled from open Sentinel-1/2 observations and KEW GLOF Observatory baselines.',
    heroImage: '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
    heroCaption:
      'High-relief glacier snout and proglacial water body geometry in the Upper Indus cryosphere (Illustrative archival plate — representative cryosphere file image).',
    heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
    keyFindings: [
      'Surging glacier tongues in the Western and Central Karakoram periodically impound seasonal tributary valleys.',
      'Synthetic aperture radar penetrates autumn cloud cover to verify subglacial drainage closure as temperatures drop.',
      'Himalayan Dispatch’s Gilgit and Baltistan desks—currently in establishment—welcome glaciology and field correspondents.',
    ],
    paragraphs: [
      'Unlike steadily retreating valley glaciers further south, several steep tributary glaciers across the Hunza, Nagar, and Shyok basins exhibit episodic surges—advancing across main valley floors and temporarily blocking meltwater streams behind walls of fractured ice.',
      'Reviewing late-ablation Sentinel-1 radar and Sentinel-2 optical passes from our Fairfax geospatial synthesis desk confirms stable autumn water-level recession across monitored basins as sub-zero air temperatures lock upper accumulation zones for winter.',
      'As Himalayan Dispatch establishes distributed correspondent networks across Gilgit and Baltistan, combining open satellite earth observation with verified local community reporting remains a central editorial priority.',
    ],
    relatedKewModule: {
      label: 'KEW Glacial Lake Outburst Flood (GLOF) Intelligence',
      href: '/hazard-intelligence/glofs',
      context: 'High-altitude glacial lake inventory and hazard thresholds.',
    },
    isPublished: true,
    corrections: [],
  },
];

// ─── AUTONOMOUS NEWSROOM INTELLIGENCE ENGINE (SERVER-ONLY PRIVATE SEEDS) ────

export const AUTONOMOUS_SOURCE_SIGNALS: AutonomousSourceSignal[] = [
  {
    id: 'sig-2026-karewa-springs',
    detectedAt: '2026-11-25T09:15:00Z',
    sourceName: 'KEW Springshed Discharge Registry & Sentinel-2 Soil Moisture Anomaly',
    sourceCategory: 'Hydrological & Cryosphere Telemetry',
    bureauId: 'kashmir',
    beatSlug: 'lakes-wetlands-springs-waterways',
    headlineSignal: 'Autumn Baseflow Deficit Across 14 Monitored Pulwama–Budgam Karewa Contact Springs',
    empiricalSummary:
      'Late-autumn discharge measurements across karewa-alluvial contact springs show 28–41% lower baseflow relative to 2015–2020 autumn medians, coinciding with up-terrace clay excavation and dry October conditions.',
    verificationScore: 94,
    corroboratingSourcesCount: 4,
    kewReferenceRoute: '/water-systems/springs',
  },
  {
    id: 'sig-2026-surinsar-runoff',
    detectedAt: '2026-11-25T06:40:00Z',
    sourceName: 'KEW Regional Lake Trophic Atlas & Catchment Land-Cover Series',
    sourceCategory: 'KEW Satellite Observatory',
    bureauId: 'jammu',
    beatSlug: 'lakes-wetlands-springs-waterways',
    headlineSignal: 'Perimeter Impervious Surface Growth Around Surinsar–Mansar Ramsar Catchment',
    empiricalSummary:
      'Optical chlorophyll-a proxy and shoreline buffer delineations indicate localized nutrient enrichment near steep road-drainage outfalls entering Surinsar Lake.',
    verificationScore: 89,
    corroboratingSourcesCount: 3,
    kewReferenceRoute: '/water-systems/lakes',
  },
  {
    id: 'sig-2026-changthang-crust',
    detectedAt: '2026-11-24T19:20:00Z',
    sourceName: 'ERA5-Land Snow-Water Equivalent & High-Altitude Pastoral Advisory Watch',
    sourceCategory: 'Atmospheric & Air-Shed Monitor',
    bureauId: 'ladakh',
    beatSlug: 'biodiversity-forests-pastoral-commons',
    headlineSignal: 'Early Winter Wind-Scour & Patchy Snow Anomaly Across Eastern Changthang Rangelands',
    empiricalSummary:
      'High wind-chill and low early-season snow moisture create uneven winter forage availability across high-altitude Pashmina grazing plateaus.',
    verificationScore: 91,
    corroboratingSourcesCount: 3,
    kewReferenceRoute: '/hazard-intelligence/atmospheric-systems/western-disturbances',
  },
  {
    id: 'sig-2026-neelum-sediment',
    detectedAt: '2026-11-24T14:05:00Z',
    sourceName: 'Multi-Temporal Optical Turbidity & Slope Scar Inventory',
    sourceCategory: 'KEW Satellite Observatory',
    bureauId: 'ajk',
    beatSlug: 'transboundary-rivers-hydropower',
    headlineSignal: 'Tributary Fan Aggradation Along Steep Neelum–Jhelum Escarpment Gullies',
    empiricalSummary:
      'Post-monsoon debris-fan expansion documented across three steep side-tributaries; flagged for remote-sensing verification and future correspondent field check.',
    verificationScore: 86,
    corroboratingSourcesCount: 2,
    kewReferenceRoute: '/earth-human-impact/change-detection-observatory',
  },
];

export const AUTONOMOUS_QUEUE_SEEDS: AutonomousEditorialQueueItem[] = [
  {
    id: 'auto-q-101',
    signalId: 'sig-2026-karewa-springs',
    targetChannel: 'daily_dispatch',
    bureauId: 'kashmir',
    beatSlug: 'lakes-wetlands-springs-waterways',
    departmentId: 'field-reports',
    workingHeadline: 'Why Fourteen Karewa Contact Springs Entered November at Multi-Year Low Baseflow',
    standfirst:
      'Synthesizing KEW hydrogeological logs with karewa land-use change records across Pulwama and Budgam—awaiting correspondent village verification and Stage 06 approval.',
    dateline: 'PULWAMA & BUDGAM · KASHMIR BUREAU DRAFT',
    researchSynthesis:
      'Autonomous Research Engine cross-referenced 14 perennial contact springs in KEW’s spring registry against 2018–2026 karewa bench excavation polygons within 1.5 km recharge zones.',
    draftParagraphs: [
      '[UNPUBLISHED NEWSROOM DRAFT — REQUIRES HUMAN VERIFICATION & APPROVAL] Across the terraced karewa margins of Pulwama and Budgam, autumn spring discharge records compiled in the Kashmir EcoWatch hydrological archive indicate a pronounced baseflow dip entering late November.',
      'Hydrogeological synthesis suggests two compounding drivers: below-normal October–November western-disturbance recharge and localized truncation of permeable silt-sand recharge layers where plateau edges have been cut for earthfill.',
    ],
    verificationChecklist: [
      'KEW Spring Registry station IDs cross-verified (Stage 04 Pending)',
      'Sentinel-2 recharge-zone land-cover delta confirmed',
      'Assign correspondent to verify household water-collection impacts at three representative nag basins and obtain right-of-reply comment from district groundwater engineers prior to publication',
    ],
    sourceCitations: [
      'KEW Springshed Hydrological Archive (2015–2026)',
      'ERA5-Land Autumn Precipitation Anomaly Series',
    ],
    status: 'draft_pending_approval',
    assignedJournalistSlug: 'wetlands-forest-desk',
    assignedJournalistName: 'Himalayan Dispatch · Wetlands & Forest Desk',
    createdAt: '2026-11-25T09:30:00Z',
    updatedAt: '2026-11-25T09:30:00Z',
  },
  {
    id: 'auto-q-102',
    signalId: 'sig-2026-surinsar-runoff',
    targetChannel: 'daily_dispatch',
    bureauId: 'jammu',
    beatSlug: 'lakes-wetlands-springs-waterways',
    departmentId: 'data-journalism',
    workingHeadline: 'Shoreline Storm-Drain Plumes Tracked Across Surinsar–Mansar Ramsar Basin',
    standfirst:
      'Optical water-quality synthesis flags localized post-rain turbidity inlets along steep Shivalik catchment roads.',
    dateline: 'SAMBA & UDHAMPUR · JAMMU BUREAU DRAFT',
    researchSynthesis:
      'Automated research packet linking Ramsar boundary shapefiles, slope-drainage culverts, and seasonal chlorophyll-a indices.',
    draftParagraphs: [
      '[UNPUBLISHED NEWSROOM DRAFT — REQUIRES HUMAN VERIFICATION & APPROVAL] Surinsar and Mansar, the twin Shivalik freshwater lakes designated under the Ramsar Convention in the Jammu foothills, rely on forested sandstone catchments to filter monsoon and winter runoff.',
      'Multi-spectral shoreline screening indicates that unpaved roadside cuts and culvert outfalls deliver concentrated sediment pulses during intense rain spells—warranting vegetated bioswale buffers.',
    ],
    verificationChecklist: [
      'Satellite water-index seasonality checked against cloud masks',
      'Pending Stage 05 Limnology Reviewer sign-off',
    ],
    sourceCitations: [
      'KEW Regional Lake Trophic Atlas',
      'Surinsar–Mansar Ramsar Conservation Dossier',
    ],
    status: 'draft_pending_approval',
    assignedJournalistSlug: 'data-cartography-desk',
    assignedJournalistName: 'Himalayan Dispatch · Data & Cartography Desk',
    createdAt: '2026-11-25T07:10:00Z',
    updatedAt: '2026-11-25T07:10:00Z',
  },
  {
    id: 'auto-q-103',
    signalId: 'sig-2026-changthang-crust',
    targetChannel: 'monthly_edition',
    targetEditionSlug: 'issue-02-a-world-in-transition',
    bureauId: 'ladakh',
    beatSlug: 'biodiversity-forests-pastoral-commons',
    departmentId: 'longform-features',
    workingHeadline: 'Wind, Dust, and Pashm: Winter Rangeland Thresholds on the Changthang Plateau',
    standfirst:
      'Monthly magazine scoping brief for Volume 01, Issue 03 examining how erratic winter snow cover reshapes high-altitude pastoral mobility.',
    dateline: 'NYOMA & HANLE · LADAKH BUREAU SCOPING',
    researchSynthesis:
      'Long-horizon monthly magazine research packet combining 25-year snow-cover frequency rasters with Changpa winter camp elevation bands.',
    draftParagraphs: [
      '[UNPUBLISHED MONTHLY EDITION SCOPING BRIEF] On the 4,500-meter rangelands of Changthang, winter hazard wears two opposite faces: snow drought that dries spring sedge meadows, and sudden wet-snow freeze events (dzud-like crusting) that lock winter forage beneath impenetrable ice.',
    ],
    verificationChecklist: [
      'Scoped for Monthly Edition commissioning slate',
      'Requires in-person pastoralist oral history reporting',
    ],
    sourceCitations: [
      'KEW Changthang Pastoral Ecology & Cryosphere Series',
    ],
    status: 'scheduled',
    scheduledFor: 'Vol. 01 / Issue 03 Scoping Slate',
    assignedJournalistSlug: 'visual-editions-desk',
    assignedJournalistName: 'Himalayan Dispatch · Visual Editions Desk',
    createdAt: '2026-11-24T20:00:00Z',
    updatedAt: '2026-11-24T20:00:00Z',
  },
];
