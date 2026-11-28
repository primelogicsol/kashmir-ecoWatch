// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 13 · MULTI-HAZARD & DISASTER INTELLIGENCE
// "THE WESTERN HIMALAYAS ARE SITTING ON A TIME BOMB:
//  THE CONVERGENCE OF TECTONIC INSTABILITY, CLIMATE EXTREMES, ECOLOGICAL
//  DESTRUCTION AND UNPREPARED HUMAN SETTLEMENTS"
//
// Flagship Disaster Vulnerability Investigation of Vol. 01 / No. 01 (Dispatch 22),
// placed immediately after Dispatch 21 ("The Price of Power") and immediately
// before Dispatch 23 ("Nature Is Not a Contractor"), completing the four-stage
// mountain development-limits progression (Dispatches 19–22) across all 32
// inaugural dispatches through 32 ("Selective Environmental Consciousness").
//
// Companion to Kashmir EcoWatch's permanent Multi-Hazard & Critical Infrastructure
// Resilience Command Center (/hazard-intelligence/multi-hazard-resilience-command-center).
//
// Architecture: 25 Thematic Volumes · 150 Proposed Chapters · 80 Hazard Categories
// Strictly enforces editorial non-prediction, regional data boundaries, and
// non-speculative catastrophe loss standards.
// ─────────────────────────────────────────────────────────────────────────────

export interface TimeBombChapterSpec {
  number: string;
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  investigativeQuestion: string;
  primaryRecordsAndMethods: string;
  verificationStatus: string;
}

export interface TimeBombVolumeSpec {
  roman: string;
  title: string;
  chapterRange: string;
  scopeSummary: string;
  chapters: Array<{
    number: string;
    title: string;
    investigativeQuestion: string;
    primaryRecordsAndMethods: string;
  }>;
}

export const THE_TIME_BOMB_SPEC = {
  monographId: 'ed-monograph-13-time-bomb',
  monographSlug: 'monograph-13-the-western-himalayas-are-sitting-on-a-time-bomb',
  monographLabel: 'MONOGRAPH 13 · MULTI-HAZARD & DISASTER INTELLIGENCE',
  dispatchNumber: '22',
  storySlug: 'the-western-himalayas-are-sitting-on-a-time-bomb',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · TECTONIC INSTABILITY · MULTI-HAZARD INTELLIGENCE · CASCADING DISASTERS · CRITICAL INFRASTRUCTURE · DISASTER GOVERNANCE',
  extendedRubric:
    'SPECIAL SCIENTIFIC INVESTIGATION · MULTI-HAZARD INTELLIGENCE · TECTONICS · DISASTER VULNERABILITY · CRITICAL INFRASTRUCTURE · CASCADING HAZARDS · GOVERNANCE ACCOUNTABILITY',
  title: 'The Western Himalayas Are Sitting on a Time Bomb',
  alternateManuscriptTitle: 'The Mountains Are Sitting on a Time Bomb',
  subtitle:
    'The Convergence of Tectonic Instability, Climate Extremes, Ecological Destruction and Unprepared Human Settlements',
  standfirst:
    'Beneath the extraordinary beauty of the Western Himalayas lies an interconnected landscape of active geological faults, retreating glaciers, unstable mountain slopes, expanding glacial lakes, vulnerable settlements, aging infrastructure and intensifying climatic extremes. What happens when these hazards begin interacting with one another?',
  tocTeaser:
    'The greatest danger may not be the next earthquake, flood or landslide, but the convergence of multiple hazards within an increasingly vulnerable mountain civilization.',
  geographicalCoverage:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Western Himalayas & Karakoram',
  extendedGeography:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Greater Western Himalayan and Karakoram Systems',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Tectonic Sciences, Multi-Hazard Intelligence, Critical Infrastructure Resilience and Disaster Risk Governance Desk',
  epilogueTitle: 'The Disaster May Be Natural. The Vulnerability Is Not Always Natural.',
  closingQuestion:
    'The mountains have been accumulating tectonic strain for centuries. Have our institutions been accumulating the scientific knowledge, engineering resilience and emergency preparedness necessary to survive its eventual release?',
  editorialMetaphorDisclosure:
    'Editorial Metaphor & Non-Prediction Standard: The expression "sitting on a time bomb" is an editorial metaphor for accumulated and interacting geological, cryospheric, hydrological, ecological, and infrastructural vulnerabilities. It must never be interpreted as a scientific prediction that a catastrophic earthquake or compound disaster will occur on a particular calendar date. Scientists cannot currently determine the precise date, location, and magnitude of a future earthquake.',
  researchLimitationsDisclosure:
    'Research Limitations & Methodological Boundaries: This flagship investigation incorporates peer-reviewed tectonic, geodetic, cryospheric, seismic-vulnerability, liquefaction, landslide, and flood research—including publications through November 2026—alongside September 2026 Jammu & Kashmir Legislative Assembly disclosures and parliamentary committee scrutiny. It does not yet establish a complete five-region population exposure census, verified building-by-building structural inventory, probabilistic catastrophe loss model, or field-verified operational preparedness audit. Some government PDF records were identified through indexed extracts and await visual page authentication. No earthquake prediction is made; the 471 years since 1555 is a historical reference rather than a recurrence countdown; ICIMOD 2026 statistics apply to the wider Hindu Kush Himalaya rather than uniformly to every Western Himalayan glacier; the 616 mapped glacial lakes (68 potentially dangerous, 24 priority) are Jammu & Kashmir-specific rather than a five-region total; the 80 hazard categories are proposed monitoring classes rather than equally probable disasters; the 6 compound scenarios are modelling exercises rather than forecasts; and the 25-volume, 150-chapter monograph constitutes a proposed research architecture.',
  heroStats: [
    { value: '25', label: 'Thematic volumes' },
    { value: '150', label: 'Proposed chapters' },
    { value: '80', label: 'Hazard & vulnerability categories' },
    { value: '6', label: 'Compound exercise scenarios' },
  ],
  publicationHierarchy: [
    {
      level: '01 · FLAGSHIP DISASTER VULNERABILITY INVESTIGATION (DISPATCH 22)',
      title: 'The Western Himalayas Are Sitting on a Time Bomb',
      detail:
        'Placed immediately after Dispatch 21 (The Price of Power) and before Dispatch 23 (Nature Is Not a Contractor) in Vol. 01 / No. 01—synthesizing tectonic strain, cryospheric retreat, glacial lakes, floodplains, slopes, permafrost, fire, urban liquefaction, and 12 critical lifelines.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-western-himalayas-are-sitting-on-a-time-bomb',
      ctaLabel: 'Read Dispatch 22',
    },
    {
      level: '02 · MONOGRAPH 13 ARCHITECTURE (25 VOLUMES · 150 CHAPTERS)',
      title: 'Complete Multi-Hazard, Tectonic & Critical Infrastructure Blueprint',
      detail:
        'Twenty-five thematic volumes and 150 proposed chapter dossiers covering the Kashmir seismic gap, 80 hazard categories across 10 domains, 16-point preparedness audits, 6 compound scenarios, and the 2027–2050 Disaster Prevention Agenda.',
      href: '/himalayan-dispatch/issues/monograph-13-the-western-himalayas-are-sitting-on-a-time-bomb',
      ctaLabel: 'Explore Monograph 13',
    },
    {
      level: '03 · KASHMIR ECOWATCH INTELLIGENCE LAYER',
      title: 'Multi-Hazard & Critical Infrastructure Resilience Command Center',
      detail:
        'Permanent 20-pillar intelligence synthesis connecting KEW Hazard Intelligence, Atmospheric Systems, Cryosphere, Earth Systems, Extreme Weather, and 17 scientific data sources.',
      href: '/hazard-intelligence/multi-hazard-resilience-command-center',
      ctaLabel: 'Open Command Center',
    },
  ],
} as const;

export const FOUR_STAGE_DEVELOPMENT_PROGRESSION = [
  {
    dispatchNumber: '19',
    title: 'When the Mountain Rejects the Engineer',
    slug: 'when-the-mountain-rejects-the-engineer',
    domain: 'Mountain engineering and geological limitations',
    investigativeStage: 'What the mountains cannot physically withstand.',
  },
  {
    dispatchNumber: '20',
    title: 'Who Gave Development the Right to Exceed the Mountain?',
    slug: 'who-gave-development-the-right-to-exceed-the-mountain',
    domain: 'Ecological limits of development',
    investigativeStage: 'What their ecosystems cannot sustainably accommodate.',
  },
  {
    dispatchNumber: '21',
    title: 'The Price of Power',
    slug: 'the-price-of-power',
    domain: 'Hydropower, environmental sacrifice and energy justice',
    investigativeStage: 'What society sacrifices in pursuit of energy.',
  },
  {
    dispatchNumber: '22',
    title: 'The Western Himalayas Are Sitting on a Time Bomb',
    slug: 'the-western-himalayas-are-sitting-on-a-time-bomb',
    domain: 'Tectonic instability, multi-hazard convergence and critical infrastructure',
    investigativeStage:
      'What happens when accumulated vulnerabilities converge into a major disaster.',
  },
] as const;

export const CASCADING_PATHWAY_STEPS_6 = [
  {
    step: '01',
    stage: 'Primary Geological or Climatic Trigger',
    mechanism: 'Major earthquake rupture or extreme mountain cloudburst / rain-on-snow event.',
  },
  {
    step: '02',
    stage: 'Coseismic or Hydrological Slope Failure',
    mechanism: 'Widespread rockfalls, deep-seated landslides, and moraine / debris mobilization.',
  },
  {
    step: '03',
    stage: 'River Obstruction & Natural Dam Formation',
    mechanism: 'Narrow gorge blockage impounding an unstable upstream landslide or ice dam.',
  },
  {
    step: '04',
    stage: 'Catastrophic Dam Breach & Outburst Wave',
    mechanism: 'Sudden overtopping or piping failure releasing an extreme water-sediment surge.',
  },
  {
    step: '05',
    stage: 'Hydropower, Bridge, Grid & Telecom Destruction',
    mechanism: 'Sequential damage to downstream reservoirs, arterial bridges, substations, and fibre.',
  },
  {
    step: '06',
    stage: 'Systemic Emergency & Lifeline Paralysis',
    mechanism: 'Interruption of trauma care, search-and-rescue access, potable water, fuel, and evacuation.',
  },
] as const;

export const KASHMIR_SEISMIC_GAP_METRICS = [
  {
    value: '250–270 km',
    label: 'Kashmir seismic gap',
    sublabel: 'Approximate along-arc extent between 1905 Kangra & 2005 Kashmir ruptures',
    caveat:
      '2024 geophysical research identified a ~100 km-wide frictionally locked Main Himalayan Thrust segment with complex ramp structures; 2026 research documented further structural complexity inside the locked zone.',
  },
  {
    value: '11 mm/yr',
    label: 'Measured convergence',
    sublabel: 'Approximate GPS-derived rate (11 ± 1 mm annually across Kashmir Himalaya)',
    caveat:
      'Indicates ongoing elastic strain accumulation across locked segments; cannot be converted into a calendar earthquake date.',
  },
  {
    value: '~5 m',
    label: 'Historical accumulated shortening',
    sublabel: 'Published slip-deficit estimate across locked thrust geometry',
    caveat:
      'Model-dependent slip-deficit estimate subject to ramp geometry, aseismic creep partitioning, and historical rupture assumptions.',
  },
  {
    value: '471 years',
    label: 'Time since the 1555 earthquake',
    sublabel: 'Historical reference, NOT a recurrence countdown',
    caveat:
      'Fault systems do not rupture on deterministic periodic schedules; elapsed years document historical silence rather than imminent timing.',
  },
] as const;

export const GEOLOGICAL_STRUCTURES_11 = [
  {
    structure: 'Main Himalayan Thrust (MHT)',
    scientificImportance: 'Principal Himalayan plate-boundary basal detachment fault system.',
     investigativeFocus: 'Locked ~100 km width, mid-crustal ramps, and strain partitioning.',
  },
  {
    structure: 'Main Frontal Thrust (MFT)',
    scientificImportance: 'Active deformation front along the southern Himalayan foothills.',
    investigativeFocus: 'Quaternary scarps, blind thrusting, and foothill urban/industrial exposure.',
  },
  {
    structure: 'Main Boundary Thrust (MBT)',
    scientificImportance: 'Major regional geological boundary with locally variable activity.',
    investigativeFocus: 'Fractured Murree/Panjal zones, slope instability, and highway/tunnel crossings.',
  },
  {
    structure: 'Main Central Thrust (MCT)',
    scientificImportance: 'Major crustal structural discontinuity across higher Himalayan crystalline units.',
    investigativeFocus: 'Steep relief gradients, rock-mass fracturing, and hydropower cavern siting.',
  },
  {
    structure: 'Reasi Thrust',
    scientificImportance: 'Significant active shortening in the northwestern Himalayas (Jammu foothills).',
    investigativeFocus: 'Paleoseismic trenching, rail/bridge crossings, and Chenab gorge proximity.',
  },
  {
    structure: 'Balakot–Bagh Fault',
    scientificImportance: 'Source fault system associated with the October 8, 2005 Mw 7.6 Kashmir earthquake.',
    investigativeFocus: 'Post-2005 stress transfer, Muzaffarabad–Bagh reconstruction resilience, and slope scars.',
  },
  {
    structure: 'Balapora Fault',
    scientificImportance: 'Intrabasinal geological structure in southwestern Kashmir Valley requiring continued local seismic investigation.',
    investigativeFocus: 'Karewa geomorphic offsets, slip-rate bounds, and valley floor shaking amplification.',
  },
  {
    structure: 'Indus–Kohistan Seismic Zone (IKSZ)',
    scientificImportance: 'Zone of significant regional earthquake activity northwest of the Hazara–Kashmir Syntaxis.',
    investigativeFocus: '1974 Pattan seismotectonics, deep crustal seismicity, and Indus gorge stability.',
  },
  {
    structure: 'Karakoram Fault',
    scientificImportance: 'Major right-lateral strike-slip tectonic system bounding eastern Ladakh and Karakoram.',
    investigativeFocus: 'Slip-rate debates, Nubra–Pangong structural corridors, and permafrost-rockfall coupling.',
  },
  {
    structure: 'Indus Suture Zone',
    scientificImportance: 'Complex geological and tectonic plate-collision boundary along the Indus corridor.',
    investigativeFocus: 'Sheared ophiolitic melanges, valley-wall rockslides, and arterial road exposure.',
  },
  {
    structure: 'Kishtwar Geological Structures',
    scientificImportance: 'Kishtwar Window fault ramps and active seismicity within the Himalayan thrust system.',
    investigativeFocus: '2013 Kishtwar swarm/earthquake sequence and dense Chenab hydropower cascade exposure.',
  },
] as const;

export const HISTORICAL_EARTHQUAKES_7 = [
  {
    year: '1555',
    earthquake: 'Kashmir earthquake',
    regionalSignificance: 'Major historical seismic event across the Kashmir Valley and Pir Panjal.',
  },
  {
    year: '1885',
    earthquake: 'Baramulla earthquake',
    regionalSignificance: 'Destructive earthquake in northwestern Kashmir Valley exposing masonry and timber-earth fragility.',
  },
  {
    year: '1905',
    earthquake: 'Kangra earthquake',
    regionalSignificance: 'Major western Himalayan rupture (~Mw 7.8) defining the southeastern boundary of the Kashmir seismic gap.',
  },
  {
    year: '1974',
    earthquake: 'Pattan earthquake, northern Pakistan',
    regionalSignificance: 'Significant earthquake demonstrating acute Indus–Kohistan mountain slope and settlement vulnerability.',
  },
  {
    year: '2005',
    earthquake: 'Kashmir earthquake',
    regionalSignificance: 'Magnitude 7.6; extensive structural destruction across Muzaffarabad, Bagh, Uri, and Tangdhar—core regional engineering and preparedness case study.',
  },
  {
    year: '2013',
    earthquake: 'Kishtwar earthquake',
    regionalSignificance: 'Renewed evidence of active regional seismicity across fault ramps in the Chenab hydropower belt.',
  },
  {
    year: '2019',
    earthquake: 'Mirpur earthquake',
    regionalSignificance: 'Demonstrated continuing shallow seismic exposure, canal-margin liquefaction, and road/building damage in AJ&K.',
  },
] as const;

export const CRYOSPHERE_HKH_METRICS = [
  {
    value: '12%',
    label: 'HKH glacier area reduction',
    period: '1990–2020 (ICIMOD)',
  },
  {
    value: '−27.8%',
    label: 'Regional snow persistence',
    period: '2026 relative to long-term normal (ICIMOD)',
  },
  {
    value: '~2×',
    label: 'Glacier ice-loss rate',
    period: 'Acceleration since 2000, reported in 2026',
  },
  {
    value: '4 years',
    label: 'Below-normal snow persistence',
    period: 'Consecutively through 2026',
  },
] as const;

export const CRYOSPHERE_SCOPE_NOTE =
  'Methodological Scope Note: These ICIMOD 2026 indicators apply to the wider Hindu Kush Himalayan (HKH) region. They must not be interpreted as identical rates of change across every Western Himalayan or Karakoram glacier (where heterogeneous mass-balance anomalies exist).';

export const GLACIER_PARADOX_PAIRS_6 = [
  {
    nearTerm: 'Glacial lake expansion',
    longTerm: 'Reduced glacier water reserves',
  },
  {
    nearTerm: 'Outburst floods (GLOFs)',
    longTerm: 'Seasonal water scarcity',
  },
  {
    nearTerm: 'Ice avalanches',
    longTerm: 'Reduced hydrological reliability',
  },
  {
    nearTerm: 'Sediment pulses',
    longTerm: 'Agricultural water insecurity',
  },
  {
    nearTerm: 'Unstable glacier margins',
    longTerm: 'Hydropower generation uncertainty',
  },
  {
    nearTerm: 'Meltwater extremes',
    longTerm: 'Greater competition for water resources',
  },
] as const;

export const JK_GLACIAL_LAKE_METRICS_2026 = {
  jurisdictionBadge: 'JAMMU & KASHMIR · SEPTEMBER 2026 LEGISLATIVE ASSEMBLY DISCLOSURE',
  sourceSummary:
    'Disclosed in the J&K Legislative Assembly (September 2026) based on University of Kashmir mapping across 12 districts; paired with a November 2026 NHESS peer-reviewed study documenting cascading mass-movement events and renewed outburst potential at a reformed Western Himalayan glacial lake.',
  scopeWarning:
    'Jurisdictional Scope Note: These figures are specific to Jammu & Kashmir (12 districts) and do NOT constitute a complete inventory of Ladakh, Azad Jammu & Kashmir, or Gilgit-Baltistan.',
  metrics: [
    { value: '616', label: 'Mapped glacial lakes (12 J&K districts)' },
    { value: '68', label: 'Potentially dangerous lakes' },
    { value: '24', label: 'Priority lakes for detailed assessment' },
    { value: '28.62 km²', label: 'Combined mapped glacial-lake area' },
  ],
} as const;

export const JHELUM_2014_FLOOD_METRICS = {
  eventLabel: 'SEPTEMBER 2014 JHELUM FLOODS · PEER-REVIEWED HYDRAULIC BENCHMARK',
  peakDischargeCusecs: '115,000+ cusecs',
  peakDischargeMetric: '~3,256+ m³/s',
  maxSouthKashmirDepth: '30.9 ft · 9.4 m',
  precedingRainfall: '7 days of preceding extreme basin-wide precipitation',
  anthropogenicAmplifiers: [
    'Wetland shrinkage and loss of natural detention storage',
    'Floodplain urbanization across residential and commercial colonies',
    'Watercourse and spill-channel sedimentation',
    'Catchment deforestation and accelerated hillslope runoff',
    'Deteriorating embankments and flood-control infrastructure',
  ],
  linkedDispatchInvestigations: [
    {
      title: 'The Art of Encroachment',
      slug: 'the-art-of-encroachment',
      relevance: 'Progressive conversion of lacustrine and wetland detention margins.',
    },
    {
      title: 'Where the Wild Waters End',
      slug: 'where-the-wild-waters-end',
      relevance: 'Contraction and hydrological disconnection of Ramsar floodplain marshes.',
    },
    {
      title: 'Gravel, Concrete, and the Vanishing Floodplain',
      slug: 'gravel-concrete-and-the-vanishing-floodplain',
      relevance: 'Riverbed incision, embankment constriction, and floodplain occupation.',
    },
    {
      title: 'The Mathematics of a Dying Lake',
      slug: 'the-mathematics-of-a-dying-lake',
      relevance: 'Sedimentation, hydraulic retention, and urban lake buffer degradation.',
    },
  ],
} as const;

export const LANDSLIDE_AGGRAVATION_PAIRS_10 = [
  {
    naturalVulnerability: 'Fractured geological formations',
    humanAggravation: 'Unscientific slope excavation and blasting',
  },
  {
    naturalVulnerability: 'Steep mountain slopes',
    humanAggravation: 'Vertical road widening without toe stabilization',
  },
  {
    naturalVulnerability: 'Seismic activity',
    humanAggravation: 'Unreinforced construction on unstable slopes',
  },
  {
    naturalVulnerability: 'Intense rainfall',
    humanAggravation: 'Inadequate culvert and hillslope drainage',
  },
  {
    naturalVulnerability: 'Groundwater pore-water pressure',
    humanAggravation: 'Tunnel excavation altering subsurface seepage',
  },
  {
    naturalVulnerability: 'River toe erosion',
    humanAggravation: 'Removal of basal slope support and unregulated mining',
  },
  {
    naturalVulnerability: 'Natural paleo-landslide deposits',
    humanAggravation: 'Dense residential and tourist settlement loading',
  },
  {
    naturalVulnerability: 'Weathered rock formations',
    humanAggravation: 'Inappropriate or under-designed retaining structures',
  },
  {
    naturalVulnerability: 'Glacial and moraine deposits',
    humanAggravation: 'Heavy linear and hydropower infrastructure loading',
  },
  {
    naturalVulnerability: 'Natural vegetation stress',
    humanAggravation: 'Deforestation, canopy clearing, and muck dumping',
  },
] as const;

export const PERMAFROST_CHANGES_7 = [
  {
    cryosphericChange: 'Thawing frozen rock fractures',
    potentialConsequence: 'High-elevation rockfalls and detachments',
  },
  {
    cryosphericChange: 'Loss of interstitial ground ice',
    potentialConsequence: 'Surface subsidence and roadbed deformation',
  },
  {
    cryosphericChange: 'Warming steep rock slopes',
    potentialConsequence: 'Reduced shear strength and large rock-slope failures',
  },
  {
    cryosphericChange: 'Increased meltwater infiltration',
    potentialConsequence: 'Elevated cleft and pore-water pressure',
  },
  {
    cryosphericChange: 'Glacier debuttressing / retreat',
    potentialConsequence: 'Loss of lateral valley-wall slope support',
  },
  {
    cryosphericChange: 'Thawing ice-cored moraine material',
    potentialConsequence: 'Greater debris-flow sediment mobilization and dam piping',
  },
  {
    cryosphericChange: 'Shifting diurnal and seasonal freeze–thaw cycles',
    potentialConsequence: 'Accelerated mechanical rock-weathering processes',
  },
] as const;

export const ATMOSPHERIC_HAZARDS_15 = [
  { hazard: 'Extreme rainfall', consequences: 'Basin flooding and widespread slope failure' },
  { hazard: 'Cloudbursts', consequences: 'Localized destructive flash floods and debris flows' },
  { hazard: 'Heavy snowfall', consequences: 'Arterial transport and power infrastructure disruption' },
  { hazard: 'Snowstorms', consequences: 'Prolonged physical isolation of mountain settlements' },
  { hazard: 'Avalanches', consequences: 'Burial of highways, tunnels, posts, and exposed communities' },
  { hazard: 'Rain-on-snow events', consequences: 'Rapid melt-amplified runoff and wet-snow instability' },
  { hazard: 'Heatwaves', consequences: 'Public health stress, accelerated melt, and crop damage' },
  { hazard: 'Cold waves', consequences: 'Hypothermia mortality risk, pipe freeze, and peak winter power deficit' },
  { hazard: 'Hailstorms', consequences: 'Severe horticultural (apple/stone-fruit) and agricultural losses' },
  { hazard: 'Lightning', consequences: 'Direct human, pastoralist, and livestock fatalities' },
  { hazard: 'Extreme winds', consequences: 'Roofing, transmission line, and forest canopy damage' },
  { hazard: 'Freezing rain', consequences: 'Glaze ice accumulation on mountain passes and conductors' },
  { hazard: 'Dense winter fog', consequences: 'Aviation, highway, and emergency medical transport disruption' },
  { hazard: 'Prolonged meteorological drought', consequences: 'Spring depletion, irrigation failure, and fire priming' },
  { hazard: 'Atmospheric pollution & inversions', consequences: 'Acute winter respiratory and cardiovascular disease burdens' },
] as const;

export const FOREST_FIRE_SECONDARY_CASCADE_5 = [
  {
    step: '01',
    stage: 'Forest Fire Event',
    mechanism:
      'Loss of ground cover, canopy interception, and alteration of surface soil hydrophobicity (e.g., 48 Kashmir forest fire incidents affecting ~100 ha during Dec 2025–Feb 2026; Aug 2026 parliamentary warning on pine litter & pre-monsoon heat).',
  },
  {
    step: '02',
    stage: 'Reduced Soil Protection',
    mechanism:
      'Root-cohesion decay and exposed ash-silt horizons create acute susceptibility to sheet/rill erosion and rapid overland runoff.',
  },
  {
    step: '03',
    stage: 'Subsequent Intense Rainfall',
    mechanism:
      'Convective or monsoon/western-disturbance downpours entrain burned detritus, loose regolith, and hillslope ash.',
  },
  {
    step: '04',
    stage: 'Post-Fire Debris Flows & Flash Floods',
    mechanism:
      'Lower rainfall thresholds trigger fast-moving sediment-laden surges into foothill settlements and road corridors.',
  },
  {
    step: '05',
    stage: 'River & Reservoir Sedimentation',
    mechanism:
      'Ash, nutrients, and coarse sediment degrade raw drinking-water turbidity and abrade hydropower turbines/storage.',
  },
] as const;

export const URBAN_STRUCTURAL_CENSUS_10 = [
  {
    infrastructure: 'Hospitals & trauma centres',
    requiredAssessment: 'Immediate-occupancy seismic resilience, non-structural equipment anchorage, and 72-hour utility autonomy',
  },
  {
    infrastructure: 'Schools, colleges & hostels',
    requiredAssessment: 'Earthquake-resistant masonry/RC detailing, unreinforced parapet removal, and high-occupancy life safety',
  },
  {
    infrastructure: 'Residential buildings',
    requiredAssessment: 'Building age, soft-storey vulnerability, unreinforced brick/stone load-bearing walls, and workmanship',
  },
  {
    infrastructure: 'High-rise & commercial buildings',
    requiredAssessment: 'Dynamic soil-structure interaction, basin amplification, and site-specific liquefaction settlement',
  },
  {
    infrastructure: 'River & highway bridges',
    requiredAssessment: 'Pier seismic ductility, bearing unseating prevention, and flood-scour foundation depth',
  },
  {
    infrastructure: 'Religious & heritage shrines',
    requiredAssessment: 'Non-invasive structural integrity assessment and peak congregation evacuation safety',
  },
  {
    infrastructure: 'Government & district secretariats',
    requiredAssessment: 'Structural survivability and post-disaster emergency operations continuity',
  },
  {
    infrastructure: 'Fire & rescue stations',
    requiredAssessment: 'Bay-door racking resistance and post-quake vehicle dispatch operability',
  },
  {
    infrastructure: 'Telecommunication towers & exchanges',
    requiredAssessment: 'Mast/rooftop structural stability, battery/fuel endurance, and fibre path diversity',
  },
  {
    infrastructure: 'Water & sewage treatment plants',
    requiredAssessment: 'Clarifier/pipeline joint flexibility under ground deformation and backup chlorine/power resilience',
  },
] as const;

export const PRIORITY_CITIES_8 = [
  { city: 'Srinagar', region: 'Kashmir Valley', keyConcerns: 'Alluvial/lacustrine basin amplification, Mw 6.0–7.5 liquefaction zones (2026 study), ward-level masonry vulnerability (2023 study), and Jhelum inundation.' },
  { city: 'Jammu', region: 'Jammu', keyConcerns: 'Main Frontal/Boundary & Reasi thrust proximity, foothill flash-flood nallahs, rapid vertical urban growth, and extreme heat.' },
  { city: 'Muzaffarabad', region: 'Azad Jammu & Kashmir', keyConcerns: '2005 Balakot–Bagh rupture lessons, steep Neelum–Jhelum confluence slopes, coseismic landslides, and post-2005 code compliance.' },
  { city: 'Mirpur', region: 'Azad Jammu & Kashmir', keyConcerns: '2019 shallow earthquake damage, Mangla reservoir margin liquefaction, and canal/bridge structural vulnerability.' },
  { city: 'Gilgit', region: 'Gilgit-Baltistan', keyConcerns: 'Upstream glacial/landslide-dam outburst routing along Gilgit & Hunza rivers, seismic shaking, and KKH lifeline dependence.' },
  { city: 'Skardu', region: 'Gilgit-Baltistan', keyConcerns: 'Indus basin seismic/rockfall exposure, cryospheric water variability, and winter air/road isolation.' },
  { city: 'Leh', region: 'Ladakh', keyConcerns: '2010-type convective cloudburst debris flows across alluvial fans, Karakoram/Indus tectonic proximity, and winter sub-zero grid reliance.' },
  { city: 'Kargil', region: 'Ladakh', keyConcerns: 'Suru–Drass winter avalanche isolation, steep slope rockfalls, flash floods, and sub-zero emergency healthcare access.' },
] as const;

export const CRITICAL_INFRASTRUCTURE_SECTORS_12 = [
  { sector: 'Electricity', consequences: 'Failure of winter heating, hospital life-support, pumping, and lighting.' },
  { sector: 'Telecommunications', consequences: 'Collapse of early warnings, citizen distress calls, and inter-agency rescue coordination.' },
  { sector: 'Transportation', consequences: 'Simultaneous highway/bridge/airfield severance isolating entire mountain districts.' },
  { sector: 'Healthcare', consequences: 'Structural ward damage, oxygen/power exhaustion, and overwhelmed trauma surgical capacity.' },
  { sector: 'Drinking water', consequences: 'Main breaks, turbidity spikes, cross-contamination, and acute potable supply interruption.' },
  { sector: 'Wastewater', consequences: 'Untreated sewage overflow into inundated streets and waterbodies, driving enteric outbreaks.' },
  { sector: 'Food supply', consequences: 'Depletion of valley/high-altitude grain and cold-chain essentials during prolonged highway closure.' },
  { sector: 'Fuel supply', consequences: 'Exhaustion of diesel/petrol/LPG needed for ambulances, excavators, and hospital generators.' },
  { sector: 'Emergency services', consequences: 'Delayed SDRF/NDRF/fire/mountain-rescue mobilization across blocked corridors.' },
  { sector: 'Financial services', consequences: 'ATMs, digital payment networks, and relief disbursement freezes during power/telecom blackouts.' },
  { sector: 'Government facilities', consequences: 'Disruption of district command centres, civil registries, and relief logistics coordination.' },
  { sector: 'Hydropower and dams', consequences: 'Regional generation loss coupled with gate malfunction, sediment surges, or downstream flood hazards.' },
] as const;

export interface HazardDomainInventorySpec {
  domainNumber: string;
  domainId: string;
  domainName: string;
  categories: readonly string[];
}

export const HAZARD_DOMAINS_10_WITH_80_CATEGORIES: readonly HazardDomainInventorySpec[] = [
  {
    domainNumber: '01',
    domainId: 'tectonic-seismic',
    domainName: 'Tectonic and seismic',
    categories: [
      'Earthquakes',
      'Fault rupture',
      'Ground shaking',
      'Liquefaction',
      'Ground amplification',
      'Earthquake-induced landslides',
      'Seismic infrastructure failure',
      'Reservoir-triggered seismicity',
    ],
  },
  {
    domainNumber: '02',
    domainId: 'geological-geomorphological',
    domainName: 'Geological and geomorphological',
    categories: [
      'Landslides',
      'Rockfalls',
      'Debris flows',
      'Subsidence',
      'Slope creep',
      'Soil erosion',
      'Tunnel instability',
      'Riverbank collapse',
    ],
  },
  {
    domainNumber: '03',
    domainId: 'cryospheric',
    domainName: 'Cryospheric',
    categories: [
      'Glacier retreat',
      'GLOFs',
      'Ice avalanches',
      'Snow avalanches',
      'Permafrost degradation',
      'Moraine failure',
      'Ice-dammed lakes',
      'Rain-on-snow',
    ],
  },
  {
    domainNumber: '04',
    domainId: 'hydrological',
    domainName: 'Hydrological',
    categories: [
      'River floods',
      'Flash floods',
      'Urban floods',
      'Landslide-dam outbursts',
      'Drainage obstruction',
      'Reservoir flooding',
      'Groundwater depletion',
      'Spring failure',
    ],
  },
  {
    domainNumber: '05',
    domainId: 'atmospheric',
    domainName: 'Atmospheric',
    categories: [
      'Cloudbursts',
      'Extreme rainfall',
      'Heatwaves',
      'Cold waves',
      'Snowstorms',
      'Hailstorms',
      'Lightning',
      'Extreme winds',
    ],
  },
  {
    domainNumber: '06',
    domainId: 'ecological',
    domainName: 'Ecological',
    categories: [
      'Forest fires',
      'Deforestation',
      'Wetland destruction',
      'Habitat fragmentation',
      'Invasive species',
      'Desertification',
      'Biodiversity collapse',
      'Ecosystem-service loss',
    ],
  },
  {
    domainNumber: '07',
    domainId: 'environmental-health',
    domainName: 'Environmental health',
    categories: [
      'Air pollution',
      'Drinking-water contamination',
      'Toxic algal blooms',
      'Waterborne disease',
      'Sewage overflow',
      'Chemical contamination',
      'Vector-borne disease',
      'Heat-related illness',
    ],
  },
  {
    domainNumber: '08',
    domainId: 'engineering-industrial',
    domainName: 'Engineering and industrial',
    categories: [
      'Dam failure',
      'Tunnel collapse',
      'Bridge failure',
      'Construction accidents',
      'Mining-induced slope failure',
      'Muck-dumping instability',
      'Industrial accidents',
      'Hazardous-material releases',
    ],
  },
  {
    domainNumber: '09',
    domainId: 'critical-infrastructure',
    domainName: 'Critical infrastructure',
    categories: [
      'Grid failure',
      'Communication failure',
      'Hospital disruption',
      'Road isolation',
      'Food supply interruption',
      'Fuel shortages',
      'Water-system failure',
      'Emergency-service disruption',
    ],
  },
  {
    domainNumber: '10',
    domainId: 'socioeconomic-governance',
    domainName: 'Socioeconomic and governance',
    categories: [
      'Unplanned urbanization',
      'Unsafe construction',
      'Floodplain occupation',
      'Inadequate warnings',
      'Evacuation deficiencies',
      'Displacement',
      'Economic disruption',
      'Institutional preparedness gaps',
    ],
  },
] as const;

export const REGIONAL_MULTI_HAZARD_GEOGRAPHY_5 = [
  {
    region: 'Kashmir Valley',
    principalHazards:
      'Earthquakes, liquefaction, river & urban floods, wetland loss, highway landslides, winter avalanches, and inversion air pollution.',
    priorityCorridors: 'Srinagar basin, Sangam–Ram Munshi Bagh–Wular floodplain, Sonamarg–Gumri, Bandipora–Gurez, Uri, Shopian–Pir Panjal.',
  },
  {
    region: 'Jammu',
    principalHazards:
      'Earthquakes (Reasi/MBT/MFT), Banihal–Ramban & Chenab landslides, cloudburst flash floods, foothill heatwaves, pine-belt forest fires, and tunnel/hydropower hazards.',
    priorityCorridors: 'Banihal–Ramban NH-44, Kishtwar–Chasoti–Doda Chenab gorge, Reasi, Rajouri–Poonch, Jammu urban tawi/nallah margins.',
  },
  {
    region: 'Ladakh',
    principalHazards:
      'GLOFs, high-altitude permafrost degradation, arid-zone convective cloudbursts, pass avalanches, cryospheric drought, and steep rockfalls.',
    priorityCorridors: 'Leh alluvial fans, Zanskar proglacial lakes, Shyok–Nubra–Karakoram corridor, Kargil–Drass–Zoji La axis.',
  },
  {
    region: 'Azad Jammu & Kashmir',
    principalHazards:
      'Active thrust earthquakes, coseismic & monsoon landslides, Neelum–Jhelum river floods, slope cutting, and hydropower/reservoir risks.',
    priorityCorridors: 'Muzaffarabad confluence, Neelum & Jhelum valleys, Bagh, Rawalakot, Mirpur–Mangla margin.',
  },
  {
    region: 'Gilgit-Baltistan',
    principalHazards:
      'Surging-glacier & proglacial outbursts, valley-blocking landslide dams, Indus–Kohistan/Karakoram earthquakes, debris flows, seasonal water scarcity, and KKH isolation.',
    priorityCorridors: 'Hunza–Hassanabad–Attabad KKH corridor, Gilgit, Ghizer, Ishkoman, Skardu–Shigar–Shyok valleys, Diamer Indus gorge.',
  },
] as const;

export const HISTORICAL_WARNING_DISASTERS_13 = [
  { year: '1555', event: 'Kashmir earthquake', lesson: 'Long-term plate-boundary tectonic vulnerability beneath the valley.' },
  { year: '1885', event: 'Baramulla earthquake', lesson: 'Acute structural vulnerability of unreinforced regional building stock.' },
  { year: '1905', event: 'Kangra earthquake', lesson: 'Scale of major western Himalayan thrust ruptures.' },
  { year: '2005', event: 'Kashmir earthquake (Mw 7.6)', lesson: 'Catastrophic cost of non-ductile schools, hospitals, and winter isolation.' },
  { year: '2010', event: 'Attabad landslide, Hunza', lesson: 'Landslide-dam river impoundment, KKH severance, and prolonged displacement.' },
  { year: '2010', event: 'Leh flash floods', lesson: 'Extreme convective precipitation and debris flows in arid Trans-Himalayan terrain.' },
  { year: '2014', event: 'Jhelum floods (115,000+ cusecs)', lesson: 'Consequence of floodplain occupation and lost wetland flood storage.' },
  { year: '2017', event: 'Gurez avalanches', lesson: 'Acute winter snowpack hazard exposure in isolated frontier valleys.' },
  { year: '2019', event: 'Mirpur earthquake', lesson: 'Continuing shallow seismic and liquefaction vulnerability.' },
  { year: '2022', event: 'Shisper glacial lake outburst', lesson: 'Destruction of the Hassanabad bridge on the Karakoram Highway—showing how a single cryospheric surge severs a strategic regional lifeline.' },
  { year: '2025', event: 'Ramban cloudburst and landslides (April 20)', lesson: 'Compound interaction of localized extreme rain, pore pressure, fractured geology, and highway cut-slopes.' },
  { year: '2025', event: 'Chasoti debris-flow disaster, Kishtwar (August)', lesson: 'Lethal convergence of localized extreme rainfall, steep sediment mobilization, and exposed populations.' },
  { year: '2026', event: 'Growing glacial-lake & reformed-lake cascade concerns', lesson: 'Urgent need for continuous upstream multi-sensor hazard intelligence (616 J&K lakes mapped; Nov 2026 NHESS reformed-lake warning).' },
] as const;

export const HUMAN_EXPOSURE_DECISIONS_10 = [
  { hazard: 'Earthquake', humanDecision: 'Uninspected, non-ductile construction on soft alluvial or steep slope soils' },
  { hazard: 'Riverine flood', humanDecision: 'Residential, commercial, and institutional floodplain encroachment' },
  { hazard: 'Landslide', humanDecision: 'Unscientific vertical slope cutting, blasting, and riverside muck dumping' },
  { hazard: 'GLOF', humanDecision: 'Siting settlements, camps, bridges, and powerhouses inside narrow outburst runout zones' },
  { hazard: 'Avalanche', humanDecision: 'Expanding roads, portals, and tourist infrastructure across known avalanche tracks' },
  { hazard: 'Forest fire', humanDecision: 'Pine-litter fuel accumulation, fragmented firelines, and unmonitored human ignitions' },
  { hazard: 'Drought & spring loss', humanDecision: 'Unsustainable groundwater pumping, karewa stripping, and recharge-zone paving' },
  { hazard: 'Urban flood', humanDecision: 'Infilled storm channels, paved marsh buffers, and unmaintained pumping networks' },
  { hazard: 'Infrastructure failure', humanDecision: 'Single-corridor roads, unanchored substations, and zero network redundancy' },
  { hazard: 'Public health emergency', humanDecision: 'Under-equipped labs, fragile water-treatment separation, and untested surge protocols' },
] as const;

export const PREPAREDNESS_MATURITY_TIERS_5 = [
  { tier: '01', label: 'Planned', meaning: 'Exists only as a policy commitment, DPR clause, or approved paper plan.' },
  { tier: '02', label: 'Installed', meaning: 'Physical sensors, sirens, shelters, or guidelines have been procured/placed.' },
  { tier: '03', label: 'Functioning', meaning: 'Verified power, telemetry, staffing, and maintenance are active today.' },
  { tier: '04', label: 'Independently Tested', meaning: 'Subjected to unannounced drills, structural audits, or external technical verification.' },
  { tier: '05', label: 'Demonstrably Effective', meaning: 'Proven to warn, evacuate, and sustain critical operations under compound stress.' },
] as const;

export const PREPAREDNESS_AUDIT_16 = [
  { no: '01', requirement: 'District-level disaster plans', evidenceToEstablish: 'Approved plans, public accessibility, and verified annual update dates across all districts.' },
  { no: '02', requirement: 'Seismic microzonation', evidenceToEstablish: 'Geographical coverage and binding statutory integration into municipal building permits.' },
  { no: '03', requirement: 'Structural building audits', evidenceToEstablish: 'Number and percentage of hospitals, schools, bridges, and public buildings independently audited and retrofitted.' },
  { no: '04', requirement: 'Hospital emergency plans', evidenceToEstablish: 'Independent operational mass-casualty, oxygen, water, and 72-hour generator blackout testing.' },
  { no: '05', requirement: 'School evacuation plans', evidenceToEstablish: 'Documented earthquake/flood drill frequency, structural safety certificates, and student participation.' },
  { no: '06', requirement: 'Glacial lake early warnings', evidenceToEstablish: 'List of priority lakes with installed, telemetered, functioning, and community-tested EWS.' },
  { no: '07', requirement: 'Landslide monitoring', evidenceToEstablish: 'Inclinometer/piezometer/SAR coverage along NH-44, Zoji La, KKH, Muzaffarabad, and Kishtwar corridors.' },
  { no: '08', requirement: 'Dam emergency action plans', evidenceToEstablish: 'Publicly accessible inundation maps, downstream sirens, and joint trans-district drill records.' },
  { no: '09', requirement: 'Emergency shelters', evidenceToEstablish: 'Winterized structural capacity, heating, sanitation, and ward/tehsil distribution.' },
  { no: '10', requirement: 'Alternative road connectivity', evidenceToEstablish: 'Viable bypass routes and airlift pads when primary mountain highways/bridges fail simultaneously.' },
  { no: '11', requirement: 'Emergency communications', evidenceToEstablish: 'Satellite, VHF/UHF, and mesh backup systems independent of commercial cellular towers and grid power.' },
  { no: '12', requirement: 'Fuel and food reserves', evidenceToEstablish: 'Verified winter/emergency days of buffer stock held inside landlocked valleys and high-altitude districts.' },
  { no: '13', requirement: 'Emergency electricity', evidenceToEstablish: 'Black-start islanding capability and protected microgrids for hospitals, waterworks, and EOCs.' },
  { no: '14', requirement: 'Urban search and rescue (USAR)', evidenceToEstablish: 'Heavy cutting/lifting equipment caches, trained collapse-rescue teams, and golden-hour mobilization time.' },
  { no: '15', requirement: 'Public disaster literacy', evidenceToEstablish: 'Empirically measured household preparedness, neighbourhood first-responder training, and multi-language alerts.' },
  { no: '16', requirement: 'Disaster recovery financing', evidenceToEstablish: 'Pre-arranged contingency funds, transparent disbursement rules, and resilient-reconstruction audit safeguards.' },
] as const;

export const COMPOUND_SCENARIOS_6 = [
  {
    code: 'SCENARIO 01',
    title: 'Major earthquake during severe winter',
    summary:
      'Strong regional ground shaking + alluvial liquefaction + coseismic pass landslides + sub-zero nocturnal temperatures + grid and highway collapse.',
    interactingHazards: ['Fault rupture & basin amplification', 'Srinagar/Mirpur soil liquefaction', 'NH-44 / KKH / Zoji La pass blockages', 'Sub-zero cold wave'],
    lifelineCascades: ['Loss of electric & gas heating', 'Trauma surge vs. damaged hospitals', 'Delayed external USAR & relief flights', 'Frozen/ruptured water mains'],
    planningImperative: 'Winterized neighbourhood USAR caches, seismic hospital retrofits, and 7-day autonomous district survival reserves.',
  },
  {
    code: 'SCENARIO 02',
    title: 'Glacial lake outburst through a hydropower cascade',
    summary:
      'Moraine or ice-avalanche breach releasing a high-density water-boulder surge into steep river gorges containing sequential run-of-river dams and towns.',
    interactingHazards: ['Ice/rock avalanche into priority tarn', 'Rapid moraine breach wave', 'Extreme channelbed boulder entrainment', 'Reservoir overtopping / gate jamming'],
    lifelineCascades: ['Sequential powerhouse & barrage damage', 'Arterial valley bridge washouts (cf. 2022 Hassanabad)', 'Regional grid generation loss', 'Downstream settlement inundation'],
    planningImperative: 'Joint basin-wide GLOF routing models, automated upstream acoustic/radar triggers, and mandatory pre-flood reservoir drawdown protocols.',
  },
  {
    code: 'SCENARIO 03',
    title: 'Extreme precipitation across the Jhelum basin',
    summary:
      'Multi-day western-disturbance / monsoonal moisture convergence (cf. Sept 2014) interacting with contracted wetlands, silted spill channels, and dense floodplain colonies.',
    interactingHazards: ['7-day basin-wide extreme rainfall', 'Rain-on-snow / tributary flash surges', 'Lost Hokersar/Narkara/Anchar storage', 'Embankment piping & overtopping'],
    lifelineCascades: ['Ground-floor submergence of hospitals & substations', 'Cellular & fibre blackout', 'Drinking-water & sewage cross-contamination', 'Boat-only rescue bottlenecks'],
    planningImperative: 'Statutory wetland detention restoration, spill-channel dredging with mass-balance verification, and elevated lifeline utilities.',
  },
  {
    code: 'SCENARIO 04',
    title: 'Earthquake-triggered landslide dam',
    summary:
      'Coseismic rock-avalanche blocking a major gorge on the Indus, Jhelum, Chenab, Neelum, or Hunza (cf. 2010 Attabad), creating twin upstream-submergence and downstream-breach emergencies.',
    interactingHazards: ['Coseismic deep-seated rockslide', 'Rapid upstream valley impoundment', 'Aftershock-driven secondary slides', 'Uncontrolled spillway erosion / breach'],
    lifelineCascades: ['Submergence of valley highways & villages', 'Isolation of upstream districts', 'Catastrophic downstream dambreak flood threat', 'Prolonged trade & agricultural paralysis'],
    planningImperative: 'Pre-mapped gorge blockage hotspots, rapid geotechnical reconnaissance teams, and controlled-spillway engineering protocols.',
  },
  {
    code: 'SCENARIO 05',
    title: 'Prolonged drought followed by extensive forest fires',
    summary:
      'Consecutive low-snow persistence winters and spring heatwaves driving widespread pine/temperate forest fires, followed immediately by intense convective downpours.',
    interactingHazards: ['Snow drought & spring depletion', 'Multiple slope wildfires & valley smoke inversions', 'Hydrophobic burned soils', 'Post-fire debris flows & flash floods'],
    lifelineCascades: ['Acute respiratory hospital admissions', 'Spring/irrigation water rationing', 'Turbidity/ash shutdown of water treatment plants', 'Reservoir dead-storage siltation'],
    planningImperative: 'Integrated cryosphere-drought-fire early warning, community fuel-break management, and post-burn catchment check-dams.',
  },
  {
    code: 'SCENARIO 06',
    title: 'Multiple transport corridors fail simultaneously',
    summary:
      'Synchronized winter storms, cloudbursts, and slope failures severing NH-44, Mughal Road, Zoji La, Kishtwar–Sinthan, Karakoram Highway, and Neelum–Muzaffarabad arteries while fog/winds ground aircraft.',
    interactingHazards: ['Multi-corridor landslides & bridge scour', 'Pass avalanches', 'Freezing rain / dense valley fog', 'Transmission tower toppling'],
    lifelineCascades: ['Complete physical isolation of mountain districts', 'Rapid drawdown of LPG, diesel, oxygen & grain', 'Interrupted dialysis/maternal/trauma referrals', 'Price spikes & supply-chain freeze'],
    planningImperative: 'Decentralized district medical/fuel/food stockpiles, redundant fibre/satellite rings, and slope-engineered all-weather corridors.',
  },
] as const;

export const DISASTER_LOSS_PAIRS_10 = [
  { directLoss: 'Destroyed and structurally condemned houses', indirectLongTermLoss: 'Multi-year household displacement, winter shelter trauma, and debt traps' },
  { directLoss: 'Damaged mountain highways, tunnels, and bridges', indirectLongTermLoss: 'Interrupted horticultural exports, trade, and regional tourism livelihoods' },
  { directLoss: 'Hospital building and diagnostic equipment destruction', indirectLongTermLoss: 'Prolonged regional loss of surgical, maternal, and chronic-care capacity' },
  { directLoss: 'Standing crop and orchard damage', indirectLongTermLoss: 'Multi-season agricultural income collapse and rural out-migration' },
  { directLoss: 'Forest canopy and soil destruction', indirectLongTermLoss: 'Permanent loss of slope stabilization, spring recharge, and ecosystem services' },
  { directLoss: 'Electricity generation and grid damage', indirectLongTermLoss: 'Artisanal, cold-storage, industrial, and winter-heating paralysis' },
  { directLoss: 'Damaged schools and university laboratories', indirectLongTermLoss: 'Lost instructional months and interrupted scientific monitoring series' },
  { directLoss: 'Water and sanitation infrastructure failure', indirectLongTermLoss: 'Escalating household and public expenditure on waterborne disease' },
  { directLoss: 'Telecommunication network disruption', indirectLongTermLoss: 'Delayed golden-hour rescues and frozen digital banking/relief transfers' },
  { directLoss: 'Damage to shrines, monuments, and vernacular heritage', indirectLongTermLoss: 'Irreplaceable cultural, architectural, and collective-memory losses' },
] as const;

export const INTERNATIONAL_BENCHMARKS_10 = [
  { countryOrFramework: 'Japan', areaOfStudy: 'Strict earthquake-resistant construction enforcement, dense seismic networks, and universal public drills.' },
  { countryOrFramework: 'Switzerland', areaOfStudy: 'High-resolution avalanche forecasting, permafrost monitoring, and legally binding alpine hazard-zone land-use maps.' },
  { countryOrFramework: 'New Zealand', areaOfStudy: 'Post-quake geotechnical land zoning, liquefaction engineering standards, and transparent public hazard portals.' },
  { countryOrFramework: 'Chile', areaOfStudy: 'Rigorous reinforced-concrete seismic code performance and accountable engineering liability.' },
  { countryOrFramework: 'United States', areaOfStudy: 'Critical infrastructure interdependency planning, lifeline resilience standards, and incident command systems.' },
  { countryOrFramework: 'Netherlands', areaOfStudy: 'Room-for-the-River floodplain restoration and statutory flood-storage protection.' },
  { countryOrFramework: 'Austria', areaOfStudy: 'Watershed torrent/debris-flow check-dam engineering and municipal mountain hazard cadastres.' },
  { countryOrFramework: 'Italy', areaOfStudy: 'Instrumented slope/landslide early warning and seismic retrofitting of historic masonry settlements.' },
  { countryOrFramework: 'Sendai Framework (UNDRR)', areaOfStudy: 'Four global priorities shifting governance from post-disaster relief to pre-disaster risk reduction.' },
  { countryOrFramework: 'ICIMOD', areaOfStudy: 'Transboundary Hindu Kush Himalayan cryosphere, GLOF, and community-based multi-hazard science.' },
] as const;

export const KEW_COMMAND_CENTER_PILLARS_20 = [
  { no: '01', name: 'Tectonic & Seismic Intelligence', focus: 'Kashmir seismic gap geodesy, MHT ramp locking, and regional microseismicity.' },
  { no: '02', name: 'Active Fault Registry', focus: 'Documented geometry, slip-rate bounds, and uncertainty flags across 11 major structures.' },
  { no: '03', name: 'Earthquake Vulnerability', focus: 'Ward- and tehsil-level building typology fragility (masonry, dhajji/taq, RC frame).' },
  { no: '04', name: 'Liquefaction Intelligence', focus: 'Alluvial, lacustrine, and reclaimed-marsh susceptibility under Mw 6.0–7.5 scenarios.' },
  { no: '05', name: 'Landslide Monitoring', focus: '739-event historical inventory, cut-slope failure hotspots, and InSAR slope-creep tracking.' },
  { no: '06', name: 'GLOF Intelligence', focus: 'J&K 616-lake baseline (68 dangerous, 24 priority), Ladakh/AJ&K/GB lake inventories, and reformed-lake cascades.' },
  { no: '07', name: 'Avalanche Intelligence', focus: 'Gurez, Zoji La, Pir Panjal, Kargil, and Karakoram snowpack stability & runout corridors.' },
  { no: '08', name: 'Permafrost Monitoring', focus: 'High-elevation rock-ice thermal regimes across Ladakh and the Karakoram.' },
  { no: '09', name: 'Flood Forecasting', focus: 'Jhelum, Chenab, Indus, Neelum, and Tawi routing paired with wetland detention accounting.' },
  { no: '10', name: 'Extreme Weather Systems', focus: 'Western disturbances, monsoon excursions, cloudbursts, rain-on-snow, and thermal extremes.' },
  { no: '11', name: 'Forest Fire Intelligence', focus: 'Winter/pre-monsoon pine-litter ignition risk and post-fire debris-flow susceptibility.' },
  { no: '12', name: 'Dam Safety Intelligence', focus: 'Reservoir inundation zones, sediment pulses, RTS monitoring, and public EAP audits.' },
  { no: '13', name: 'Infrastructure Interdependency', focus: 'Coupled failure propagation across power, telecom, roads, water, fuel, and hospitals.' },
  { no: '14', name: 'Population Exposure', focus: 'Gridded settlement growth on floodplains, alluvial fans, and unstable slopes.' },
  { no: '15', name: 'Emergency Healthcare', focus: 'Hospital structural survivability, trauma beds, oxygen, and 72-hour utility autonomy.' },
  { no: '16', name: 'Transport Resilience', focus: 'Single-corridor chokepoint index across NH-44, KKH, Zoji La, Mughal Road, and bridges.' },
  { no: '17', name: 'Electricity & Grid Resilience', focus: 'Substation seismic/flood hardening, winter deficit exposure, and hospital microgrids.' },
  { no: '18', name: 'Emergency Communications', focus: 'Cell-tower endurance, fibre ring redundancy, and off-grid emergency alert reach.' },
  { no: '19', name: 'Disaster Loss Modelling', focus: 'Open, non-speculative exposure schemas awaiting verified building and asset inventories.' },
  { no: '20', name: 'Governance Accountability', focus: '16-point preparedness audit tracking Planned →Demonstrably Effective readiness.' },
] as const;

export const SCIENTIFIC_DATA_SOURCES_17 = [
  { source: 'USGS', application: 'Global and regional instrumental earthquake event catalogue' },
  { source: 'International Seismological Centre (ISC)', application: 'Reviewed historical seismicity and focal mechanism archive' },
  { source: 'NASA FIRMS', application: 'Satellite thermal anomalies and active forest fire observations' },
  { source: 'NASA GPM IMERG', application: 'Multi-satellite mountain precipitation estimation' },
  { source: 'ECMWF ERA5', application: 'Multi-decadal atmospheric, snow, and freezing-level reanalysis' },
  { source: 'Copernicus Sentinel-1', application: 'C-band SAR surface deformation (InSAR) and all-weather flood mapping' },
  { source: 'Copernicus Sentinel-2', application: 'Multispectral land-cover, burn-scar, and glacial-lake monitoring' },
  { source: 'Landsat Archive', application: 'Multi-decadal historical floodplain, wetland, and glacier reconstruction' },
  { source: 'Randolph Glacier Inventory (RGI)', application: 'Standardized glacier outlines and hypsometric inventory' },
  { source: 'ICIMOD', application: 'Hindu Kush Himalayan cryosphere, snow-persistence, and mountain-risk research' },
  { source: 'Global Dam Watch', application: 'Georeferenced dam, barrage, and reservoir barrier inventories' },
  { source: 'India Meteorological Department (IMD)', application: 'Official meteorological observations, radar, and weather warnings' },
  { source: 'Pakistan Meteorological Department (PMD)', application: 'Regional meteorological, glacial-outburst, and hydrological advisories' },
  { source: 'Central Water Commission (CWC)', application: 'River gauge stages, flood forecasting, and hydrological records' },
  { source: 'NDMA / SDMA / PDMA / GBDMA / LDMA', application: 'Official disaster management plans, parliamentary disclosures, and alerts' },
  { source: 'WorldPop and GHSL', application: 'Gridded human population and built-settlement exposure layers' },
  { source: 'OpenStreetMap', application: 'Supplementary road, bridge, hospital, and school baseline geography' },
] as const;

export const SCIENTIFIC_DATA_INTEGRATION_CAVEAT =
  'Technical Verification Standard: These 17 scientific and institutional sources have differing access conditions, spatial resolutions, latencies, and reporting intervals. None is represented on Kashmir EcoWatch as an operational real-time feed unless its automated pipeline and uncertainty bounds are technically verified.';

export const REVISED_EDITION_32_DISPATCHES = [
  { no: '01', title: 'The Price of Protecting Paradise', slug: 'the-price-of-protecting-paradise' },
  { no: '02', title: 'When Mountains Speak, Who Is Listening?', slug: 'when-mountains-speak-who-is-listening' },
  { no: '03', title: 'The Water We Have Forgotten', slug: 'the-water-we-have-forgotten' },
  { no: '04', title: 'The Mathematics of a Dying Lake', slug: 'the-mathematics-of-a-dying-lake' },
  { no: '05', title: 'The Laboratory That Kashmir Lost', slug: 'the-laboratory-that-kashmir-lost' },
  { no: '06', title: 'The Art of Encroachment', slug: 'the-art-of-encroachment' },
  { no: '07', title: 'Where the Wild Waters End', slug: 'where-the-wild-waters-end' },
  { no: '08', title: 'The Sky Has No Borders', slug: 'the-sky-has-no-borders' },
  { no: '09', title: 'The People Who Guard the Forest', slug: 'the-people-who-guard-the-forest' },
  { no: '10', title: 'The National Park That Became a Golf Course', slug: 'the-national-park-that-became-a-golf-course' },
  { no: '11', title: 'An Elegy for Winter', slug: 'an-elegy-for-winter' },
  { no: '12', title: 'Gravel, Concrete, and the Vanishing Floodplain', slug: 'gravel-concrete-and-the-vanishing-floodplain' },
  { no: '13', title: 'Thirty-Eight Winters of Snowline Retreat', slug: 'thirty-eight-winters-of-snowline-retreat' },
  { no: '14', title: 'A Glacier Does Not Negotiate With Five-Year Plans', slug: 'a-glacier-does-not-negotiate-with-five-year-plans' },
  { no: '15', title: 'Why the Western Himalayas Demand Slow, Fearless Journalism', slug: 'why-the-western-himalayas-demand-slow-journalism' },
  { no: '16', title: 'Who Are We Researching For? The World Knows Our Mountains. Do We?', slug: 'who-are-we-researching-for' },
  { no: '17', title: 'South Asia’s Environmental Vanguard', slug: 'south-asias-environmental-vanguard' },
  { no: '18', title: 'Science Has Diagnosed the Valley. Who Will Prescribe Its Governance?', slug: 'science-has-diagnosed-the-valley-who-will-prescribe-its-governance' },
  { no: '19', title: 'When the Mountain Rejects the Engineer', slug: 'when-the-mountain-rejects-the-engineer' },
  { no: '20', title: 'Who Gave Development the Right to Exceed the Mountain?', slug: 'who-gave-development-the-right-to-exceed-the-mountain' },
  { no: '21', title: 'The Price of Power', slug: 'the-price-of-power' },
  { no: '22', title: 'The Western Himalayas Are Sitting on a Time Bomb', slug: 'the-western-himalayas-are-sitting-on-a-time-bomb', highlight: true },
  { no: '23', title: 'Nature Is Not a Contractor', slug: 'nature-is-not-a-contractor' },
  { no: '24', title: 'The Climate Has Changed. Has Agricultural Science?', slug: 'the-climate-has-changed-has-agricultural-science' },
  { no: '25', title: 'Six Years of Warnings, and Kashmir Still Cannot Breathe', slug: 'six-years-of-warnings-and-kashmir-still-cannot-breathe' },
  { no: '26', title: 'The Atmosphere Has No Borders: The Air We Breathe, the Numbers We Cannot Trust', slug: 'the-atmosphere-has-no-borders' },
  { no: '27', title: 'When Environmental Laws Exist but the Environment Has No Defence', slug: 'when-environmental-laws-exist-but-the-environment-has-no-defence' },
  { no: '28', title: 'A Lake Cannot Be Rescued by an Annual Cleanup', slug: 'a-lake-cannot-be-rescued-by-an-annual-cleanup' },
  { no: '29', title: 'Who Measures the Success of Environmental Activism?', slug: 'who-measures-the-success-of-environmental-activism' },
  { no: '30', title: 'The Mountains Have Heard Enough Declarations', slug: 'the-mountains-have-heard-enough-declarations' },
  { no: '31', title: 'When Politics Promises Green', slug: 'when-politics-promises-green' },
  { no: '32', title: 'Selective Environmental Consciousness', slug: 'selective-environmental-consciousness' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 25 THEMATIC VOLUMES · 150 PROPOSED CHAPTERS (01–150)
// Proposed research architecture — explicitly labeled as investigative protocols
// ─────────────────────────────────────────────────────────────────────────────

const RAW_VOLUME_BLUEPRINTS: Array<{
  roman: string;
  title: string;
  chapterRange: string;
  scopeSummary: string;
  chapterTitles: [string, string, string, string, string, string];
  methodsTemplate: string;
}> = [
  {
    roman: 'I',
    title: 'The Geological Evolution of the Western Himalayas',
    chapterRange: '01–06',
    scopeSummary: 'India–Eurasia continental collision, Hazara–Kashmir Syntaxis geometry, Karewa basin infill, Nanga Parbat crustal uplift, and structural inheritance.',
    chapterTitles: [
      'Continental Collision and the Birth of the Western Himalayan Arc',
      'The Hazara–Kashmir Syntaxis: Structural Pivot of Northwestern Seismotectonics',
      'Plio-Pleistocene Karewa Basin Stratigraphy and Soft-Sediment Inheritance',
      'Nanga Parbat–Haramosh Massif: Rapid Exhumation and Extreme Topographic Relief',
      'Lithological Fragility Across Panjal, Murree, Zanskar, and Ophiolitic Terranes',
      'Geological Inheritance and Why Himalayan Slopes Remember Ancient Tectonics',
    ],
    methodsTemplate: 'Geological Survey memoirs, balanced crustal cross-sections, thermochronology synthesis, and regional litho-structural mapping.',
  },
  {
    roman: 'II',
    title: 'Himalayan Tectonics and Active Fault Systems',
    chapterRange: '07–12',
    scopeSummary: 'Comparative kinematics, slip rates, and structural heterogeneity across the 11 major thrust, strike-slip, and suture fault systems.',
    chapterTitles: [
      'The Main Himalayan Thrust: Basal Detachment Geometry and Mid-Crustal Ramps',
      'Active Shortening Along the Main Frontal, Main Boundary, and Reasi Thrusts',
      'The Balakot–Bagh and Balapora Faults: Intrabasinal and Out-of-Sequence Deformation',
      'The Indus–Kohistan Seismic Zone and Deep Northwestern Seismogenic Structures',
      'The Karakoram Strike-Slip Fault and Indus Suture Zone Tectonic Boundaries',
      'Kishtwar Window Fault Ramps and Differentiating Hazard Across Heterogeneous Faults',
    ],
    methodsTemplate: 'GNSS velocity fields, InSAR interseismic strain profiles, paleoseismic trench logs, and ISC/USGS focal mechanism inversions.',
  },
  {
    roman: 'III',
    title: 'The Kashmir Seismic Gap',
    chapterRange: '13–18',
    scopeSummary: 'Geodetic convergence (11 ± 1 mm/yr), ~100 km locked MHT width (2024), internal structural complexity (2026), and non-predictive strain accounting.',
    chapterTitles: [
      'Defining the 250–270 km Kashmir Seismic Gap Between Kangra (1905) and Kashmir (2005)',
      'GNSS Geodesy and the 11 ± 1 mm/yr Convergence Budget Across the Kashmir Himalaya',
      'The ~100 km Frictionally Locked Main Himalayan Thrust Segment (2024 Geophysical Findings)',
      'Fault-Zone Structural Complexity and Rupture Propagation Controls (2026 Findings)',
      'Slip-Deficit Estimation (~5 m) and Its Epistemic Uncertainties',
      'Why Elapsed Time Since 1555 (471 Years) Is a Historical Benchmark, Never a Countdown',
    ],
    methodsTemplate: 'Continuous GPS time series, elastic/viscoelastic dislocation modelling, magnetotelluric/seismic tomography published syntheses, and uncertainty analysis.',
  },
  {
    roman: 'IV',
    title: 'Historical Earthquakes and Future Seismic Scenarios',
    chapterRange: '19–24',
    scopeSummary: 'Documentary and paleoseismic forensics of 1555, 1885, 1905, 1974, 2005, 2013, and 2019 earthquakes and physics-based ground-motion scenarios.',
    chapterTitles: [
      'The September 1555 Kashmir Earthquake: Chronicles, Paleoseismology, and Basin Effects',
      'The 1885 Baramulla and 1905 Kangra Earthquakes: Vernacular and Colonial Engineering Lessons',
      'The 1974 Pattan Earthquake: High-Relief Slope Collapse in the Indus–Kohistan Gorge',
      'October 8, 2005 (Mw 7.6): Forensic Reconstruction of Structural Collapse and Rescue Bottlenecks',
      'The 2013 Kishtwar and 2019 Mirpur Earthquakes: Continuing Warnings Across Fault Ramps and Canals',
      'Scenario Ground-Motion Modelling (Mw 6.5–7.8) Without Deterministic Date Predictions',
    ],
    methodsTemplate: 'Historical Persian/Sanskrit/colonial archives, ShakeMap ground-motion equations, 2005 engineering reconnaissance reports, and spectral acceleration modelling.',
  },
  {
    roman: 'V',
    title: 'Urban Seismic Vulnerability and Liquefaction',
    chapterRange: '25–30',
    scopeSummary: 'Ward-level structural fragility, Mw 6.0–7.5 liquefaction mapping, reclaimed wetland soils, and 10-sector city structural censuses across 8 cities.',
    chapterTitles: [
      'Srinagar Ward-Level Structural Vulnerability (2023 Benchmark) and Soft-Sediment Amplification',
      'Srinagar Liquefaction Susceptibility Under Mw 6.0–7.5 Scenarios (2026 Geotechnical Study)',
      'Reclaimed Wetlands, Filled Channels, and Why Site-Specific Borehole Testing Is Indispensable',
      'Muzaffarabad, Mirpur, and Jammu: Post-2005 Building Code Enforcement vs. Urban Reality',
      'Leh, Kargil, Gilgit, and Skardu: Rapid Concrete Transition vs. Taq and Dhajji-Dewari Heritage',
      'Protocol for a Mandatory 10-Category Municipal Structural Vulnerability Census',
    ],
    methodsTemplate: 'SPT/CPT geotechnical borehole archives, shear-wave velocity (Vs30) microzonation, rapid visual screening (RVS), and structural fragility curves.',
  },
  {
    roman: 'VI',
    title: 'Landslides, Rockfalls and Mountain Instability',
    chapterRange: '31–36',
    scopeSummary: 'The 739-event Kashmir landslide inventory (1990–2020), natural vs. anthropogenic slope destabilization, and the April 20, 2025 Ramban disaster.',
    chapterTitles: [
      'Three Decades of Moving Slopes: Auditing the 739-Event Kashmir Landslide Inventory (1990–2020)',
      'Banihal–Ramban, Sonamarg–Gumri, Bandipora–Gurez, Uri, and Kishtwar Instability Corridors',
      'April 20, 2025 in Ramban: Extreme Rain, Pore-Water Pressure, and Cut-Slope Vulnerability',
      'Road Widening, Blasting, and Riverside Muck Dumping: Quantifying Anthropogenic Slope Stress',
      'Deep-Seated Rockslides and Slow-Moving Slope Creep Above Valley Settlements',
      'Whole-Lifecycle Geological Stability Standards for Himalayan Engineering Approvals',
    ],
    methodsTemplate: 'Sentinel-1 InSAR time-series interferometry, limit-equilibrium/finite-element slope modelling, rainfall-threshold curves, and highway DPR audits.',
  },
  {
    roman: 'VII',
    title: 'Glaciers, Snow and Cryospheric Transformation',
    chapterRange: '37–42',
    scopeSummary: 'ICIMOD 2026 HKH cryosphere benchmarks, spatial heterogeneity across Kashmir–Ladakh–Karakoram, snow drought, and the meltwater paradox.',
    chapterTitles: [
      'Interpreting ICIMOD 2026 Benchmarks (−12% Area, ~2× Ice-Loss Rate) Without Uniformity Fallacies',
      'Kashmir & Zanskar Retreat vs. Karakoram Mass-Balance Heterogeneity and Glacier Surges',
      'Four Consecutive Snow-Deficit Winters and the −27.8% Snow-Persistence Anomaly of 2026',
      'Black Carbon, Regional Dust, and Elevation-Dependent Warming Above 3,500 Metres',
      'The Glacier Meltwater Paradox: Near-Term Flood Pulses vs. Long-Term Storage Decline',
      'Basin-by-Basin Cryospheric Water Accounting Across Jhelum, Chenab, Shyok, and Upper Indus',
    ],
    methodsTemplate: 'Randolph Glacier Inventory, multi-temporal stereo DEM geodetic mass balance, MODIS/VIIRS snow persistence, and glacio-hydrological routing.',
  },
  {
    roman: 'VIII',
    title: 'Glacial Lake Outburst Floods',
    chapterRange: '43–48',
    scopeSummary: 'Sept 2026 J&K 616-lake inventory (68 dangerous, 24 priority), Ladakh/AJ&K/GB glacial lakes, 2022 Shisper outburst, and Nov 2026 reformed-lake cascades.',
    chapterTitles: [
      'Inside J&K’s September 2026 Inventory: 616 Mapped Lakes, 68 Dangerous, 24 Priority (28.62 km²)',
      'Expanding the Inventory Across Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan',
      'Moraine Dam Piping, Overtopping Waves, and Ice/Rock-Avalanche Impact Triggers',
      'Reformed Glacial Lakes and Cascading Mass Movements (November 2026 NHESS Findings)',
      'The 2022 Shisper Outburst and Destruction of the Hassanabad Bridge on the Karakoram Highway',
      'Two-Phase Water-Sediment Outburst Modelling and Community-Tested GLOF Early Warning',
    ],
    methodsTemplate: 'Sentinel-2/Planet optical lake tracking, bathymetric sonar surveys, 2D non-Newtonian debris-flood hydrodynamics, and EWS telemetry verification.',
  },
  {
    roman: 'IX',
    title: 'Permafrost Degradation and High-Altitude Hazards',
    chapterRange: '49–54',
    scopeSummary: 'Thermal thaw of frozen rock fractures, ice-cored moraines, debuttressed valley walls, and high-pass infrastructure subsidence in Ladakh and Karakoram.',
    chapterTitles: [
      'Mapping Discontinuous and Sporadic Mountain Permafrost Across Ladakh and the Karakoram',
      'Warming Cleft Ice and High-Elevation Rock-Slope Detachment Mechanics',
      'Glacier Debuttressing and Paraglacial Valley-Wall Readjustment',
      'Thawing Ice-Cored Moraines, Rock Glaciers, and Sediment Recharge into Headwater Streams',
      'High-Altitude Passes, Border Roads, and Transmission Foundations Over Thawing Ground',
      'Long-Rock-Ice Avalanche Runout Chains from Uninhabited Summits into Populated Valleys',
    ],
    methodsTemplate: 'Ground-surface temperature loggers, electrical resistivity tomography (ERT), permafrost zonation indices, and runout modelling.',
  },
  {
    roman: 'X',
    title: 'Avalanches and Winter Disaster Systems',
    chapterRange: '55–60',
    scopeSummary: 'Snowpack metamorphism, rain-on-snow slab instability, Gurez 2017 lessons, winter pass isolation, and Swiss/Austrian hazard-zoning adaptation.',
    chapterTitles: [
      'Climatology of Western Disturbance Snowstorms Across Pir Panjal, Great Himalaya, and Karakoram',
      'Gurez (2017), Sonamarg–Zoji La, Tangdhar, and Kargil: Anatomy of Exposed Avalanche Corridors',
      'Warming Winters, Rain-on-Snow Events, and Wet-Slab Avalanche Regimes',
      'Highway Portals, Hydropower Camps, and Tourist Expansion into Avalanche Runout Zones',
      'Snow-pillow Telemetry, Doppler Radar, and Operational Avalanche Forecasting Gaps',
      'Adapting Statutory Red/Blue Avalanche Land-Use Zoning to Western Himalayan Districts',
    ],
    methodsTemplate: 'Snow-pit stratigraphy, RAMMS avalanche dynamic simulations, historical casualty/blockage logs, and winter road-closure records.',
  },
  {
    roman: 'XI',
    title: 'River Flooding and Floodplain Destruction',
    chapterRange: '61–66',
    scopeSummary: 'September 2014 Jhelum floods (115,000+ cusecs; 30.9 ft depth), wetland detention loss, Chenab/Indus/Neelum floods, and natural flood infrastructure.',
    chapterTitles: [
      'September 2014 Reconstructed: Seven Days of Rain, 115,000+ Cusecs, and 9.4 m Inundation',
      'Wetlands as Flood Infrastructure: Quantifying Storage Lost Across Hokersar, Narkara, Anchar, and Wular',
      'Spill Channels, Floodways, and Urban Encroachment Across Srinagar and South Kashmir',
      'High-Energy Gorge Floods vs. Alluvial Valley Inundation Along Chenab, Neelum, Tawi, and Indus',
      'Post-2014 Dredging, Embankment Works, and Independent Hydraulic Capacity Verification',
      'Statutory Floodplain Zoning and Room-for-the-River Restoration Across Five Regions',
    ],
    methodsTemplate: 'CWC/I&FC stage-discharge hydrographs, 1D/2D HEC-RAS floodplain inundation models, historical wetland cadastral overlays, and CAG flood-works audits.',
  },
  {
    roman: 'XII',
    title: 'Cloudbursts and Flash Floods',
    chapterRange: '67–72',
    scopeSummary: 'Orographic convective physics, 2010 Leh flash floods, August 2025 Chasoti Kishtwar debris flow, and ungauged steep-catchment vulnerability.',
    chapterTitles: [
      'Orographic Locking, Monsoon–Western Disturbance Interactions, and Cloudburst Physics',
      'Leh 2010: How Convective Downpours Transformed Arid Alluvial Fans into Debris Torrents',
      'Chasoti, Kishtwar (August 2025): Extreme Precipitation, Steep Sediment Pulses, and Exposed Gatherings',
      'Pilgrimage Routes, Seasonal Camps, and Tourist Chokepoints in Ungauged Mountain Nallahs',
      'X-Band Doppler Weather Radars, Rain-Gauge Blind Spots, and Nowcasting Latency',
      'Debris-Basin Engineering and Rapid Community Evacuation Protocols for Flash-Flood Fans',
    ],
    methodsTemplate: 'GPM IMERG/Doppler radar reflectivity, post-event boulder/high-water-mark paleohydraulics, alluvial-fan geomorphology, and disaster inquiry records.',
  },
  {
    roman: 'XIII',
    title: 'Extreme Weather and Atmospheric Hazards',
    chapterRange: '73–78',
    scopeSummary: 'All 15 atmospheric hazards—heatwaves, cold waves, hailstorms, lightning, extreme winds, freezing rain, fog—and the obsolescence of stationary averages.',
    chapterTitles: [
      'Why Historical Climatic Averages No Longer Bound Himalayan Engineering Design',
      'Foothill and Valley Heatwaves: Thermal Stress, Glacier Melt Spikes, and Crop Scorch',
      'Chillai Kalan Cold Waves, Sub-Zero Pipe Freezes, and Winter Mortality Vulnerability',
      'Spring Hailstorms and Unseasonal Snowfall: Horticultural Shock Across Kashmir and Himachal Margins',
      'Mountain Lightning, Extreme Downslope Winds, and Glaze Ice on High-Voltage Conductors',
      'Winter Thermal Inversions, Dense Fog, and Compound Atmospheric-Health Crises',
    ],
    methodsTemplate: 'ERA5/IMD/PMD daily station extremes, non-stationary GEV return-period curves, horticultural loss ledgers, and aviation/highway disruption logs.',
  },
  {
    roman: 'XIV',
    title: 'Drought and Mountain Water Insecurity',
    chapterRange: '79–84',
    scopeSummary: 'Snow droughts, drying karst/karewa springs, groundwater depletion, irrigation deficits, and seasonal water competition across five regions.',
    chapterTitles: [
      'From Flood Surplus to Autumn Scarcity: Anatomy of Western Himalayan Hydrological Drought',
      'Vanishing Nag Springs and Karst/Karewa Aquifer Recharge Disruption',
      'High-Altitude Oasis Fragility: Meltwater Dependence in Ladakh and Gilgit-Baltistan Villages',
      'Paddy-to-Orchard Transitions, Borewell Proliferation, and Agricultural Water Stress',
      'Winter Low-Flow Bottlenecks for Drinking-Water Intakes and Run-of-River Hydropower',
      'Watershed Spring-Sanctuary Protection and Drought Contingency Governance',
    ],
    methodsTemplate: 'Isotope spring hydrographs, GRACE/well groundwater trends, standardized precipitation-evapotranspiration index (SPEI), and village spring censuses.',
  },
  {
    roman: 'XV',
    title: 'Forest Fires and Ecological Destabilization',
    chapterRange: '85–90',
    scopeSummary: 'Dec 2025–Feb 2026 winter Kashmir fires (48 events, ~100 ha), Aug 2026 parliamentary findings, Chir pine litter, and the 5-stage post-fire flood cascade.',
    chapterTitles: [
      'Winter Fires in Snowless Forests: Analyzing Kashmir’s 48 Incidents (Dec 2025–Feb 2026)',
      'Chir Pine Litter, Pre-Monsoon Heat, and Anthropogenic Ignitions (August 2026 Parliamentary Scrutiny)',
      'Soil Hydrophobicity, Root-Strength Loss, and Post-Fire Hillslope Erosion Physics',
      'From Burn Scar to Flash Flood: Modelling the Five-Stage Post-Fire Debris-Flow Cascade',
      'Wildfire Smoke Plumes, Black Carbon Deposition on Nearby Glaciers, and Valley Air Quality',
      'Community Firelines, Litter Bio-Briquetting, and Frontline Forest Guard Equipment Standards',
    ],
    methodsTemplate: 'NASA FIRMS/VIIRS thermal anomalies, Sentinel-2 dNBR burn severity, infiltration ring tests, and Forest Department compartment fire logs.',
  },
  {
    roman: 'XVI',
    title: 'Hydropower, Reservoirs and Geological Risks',
    chapterRange: '91–96',
    scopeSummary: 'Cascade concentration in seismic/GLOF gorges, reservoir-triggered seismicity, sediment abrasion, tunnel hydrogeology, and public dam EAPs.',
    chapterTitles: [
      'Siting Mega-Cascades Across Locked Thrusts and Active Fault Ramps in Chenab, Jhelum, and Indus',
      'Reservoir-Triggered Seismicity (RTS) and Pore-Pressure Diffusion Beneath High Impoundments',
      'Upstream GLOF and Landslide-Dam Waves Entering Cascaded Reservoirs',
      'Head-Race Tunnelling, Spring Dewatering, and Overlying Village Subsidence',
      'Extreme Sediment Pulses, Dead-Storage Loss, and Spillway Gate Reliability Under Debris Loads',
      'Auditing Dam Emergency Action Plans, Public Inundation Maps, and Downstream Siren Drills',
    ],
    methodsTemplate: 'Dam safety statutory filings, local seismic network catalogs around reservoirs, sediment-rating curves, and cascade dambreak routing.',
  },
  {
    roman: 'XVII',
    title: 'Tunnels, Highways and Infrastructure Vulnerability',
    chapterRange: '97–102',
    scopeSummary: 'NH-44, Karakoram Highway, Zoji La, Mughal Road, Neelum highway, railway/road tunnels, portal hazards, and bridge scour/seismic fragility.',
    chapterTitles: [
      'Single-Artery Fragility: NH-44, Karakoram Highway, Zoji La, and Neelum Valley Chokepoints',
      'Deep Himalayan Tunnels: Squeezing Rock, High-Pressure Water Ingress, and Portal Avalanches',
      'Bridge Pier Scour, Boulder Impact, and Seismic Unseating Across Mountain Rivers',
      'Unregulated Spoil Disposal (Muck Dumping) and Artificial Channel Constriction',
      'Airfields, Helipads, and All-Weather Emergency Access Envelopes Under Compound Disruption',
      'Lifecycle Geotechnical Maintenance and Redundant Corridor Network Design',
    ],
    methodsTemplate: 'Tunnel convergence/seepage logs, bridge foundation & hydraulic scour audits, highway closure day series, and network graph centrality.',
  },
  {
    roman: 'XVIII',
    title: 'Critical Infrastructure Interdependencies',
    chapterRange: '103–108',
    scopeSummary: 'Network-level failure cascades across all 12 critical infrastructure sectors—electricity, telecom, healthcare, water, wastewater, food, fuel, banking.',
    chapterTitles: [
      'Mapping the 12 Critical Lifelines: How One Sector’s Failure Paralyzes Eleven Others',
      'Grid Substations, Transmission Towers, and Black-Start Survival in Sub-Zero Mountain Winters',
      'Telecommunications Fragility: Battery Depletion, Fibre Bridge Crossings, and Warning Blackouts',
      'Hospital Functional Survivability: Oxygen, Water, Structural Integrity, and Trauma Surge Capacity',
      'Potable Water, Sewage Overflow, Fuel Depots, and Grain Buffer Endurance Under Isolation',
      'Transitioning from Hazard-by-Hazard Response to Critical Infrastructure Resilience Engineering',
    ],
    methodsTemplate: 'Coupled infrastructure dependency matrices, fault-tree/percolation network modelling, hospital/utility resilience audits, and fuel/grain stock protocols.',
  },
  {
    roman: 'XIX',
    title: 'Public Health and Environmental Emergencies',
    chapterRange: '109–114',
    scopeSummary: 'Post-flood waterborne outbreaks, sewage-drinking water cross-contamination, winter CO/smoke risks, trauma triage, and chronic care continuity.',
    chapterTitles: [
      'When Floodwater Meets Sewage: Enteric and Waterborne Disease Risks After Inundation',
      'Hazardous-Material, Industrial, and Biomedical Waste Releases During Extreme Events',
      'Toxic Algal Blooms, Spring Contamination, and Emergency Water-Quality Diagnostics',
      'Winter Power Outages, Indoor Heating Hazards, Hypothermia, and Cardiovascular Spikes',
      'Dialysis, Insulin, Maternal Care, and Essential Medicine Continuity in Isolated Districts',
      'Psychological Trauma, Prolonged Displacement, and Community Mental-Health Recovery',
    ],
    methodsTemplate: 'IDSP/public-health surveillance records, water-quality microbiology protocols, hospital surge registries, and post-2005/2014 epidemiological studies.',
  },
  {
    roman: 'XX',
    title: 'Population Exposure and Social Vulnerability',
    chapterRange: '115–120',
    scopeSummary: 'Demographic growth on floodplains and fans, informal settlements, seasonal labourers/pilgrims/tourists, pastoralists, disability, and gender equity.',
    chapterTitles: [
      'Thirty Years of Settlement Expansion into Floodplains, Alluvial Fans, and Steep Slopes',
      'Low-Income Households, Informal Housing, and Unequal Structural Vulnerability',
      'Transient Exposure: Tourists, Pilgrims, Seasonal Migrant Workers, and Highway Queues',
      'Pastoralist Communities (Gujjar-Bakarwal, Changpa, Chopan) on High-Altitude Weather Frontlines',
      'Elderly, Disabled, Pediatric, and Maternal Vulnerability During Rapid Evacuations',
      'Building an Open, Privacy-Safe Five-Region Population Exposure Baseline',
    ],
    methodsTemplate: 'WorldPop/GHSL time series, census & municipal ward records, tourism/pilgrimage seasonal flux estimates, and social vulnerability index (SoVI) protocols.',
  },
  {
    roman: 'XXI',
    title: 'Disaster Economics and Environmental Losses',
    chapterRange: '121–126',
    scopeSummary: 'Direct vs. indirect loss accounting across 10 pairs, ecosystem-service valuation of wetlands/forests, and non-speculative catastrophe loss schemas.',
    chapterTitles: [
      'Why Speculative Regional Loss Headlines Fail—and How Verified Exposure Models Are Built',
      'Direct Structural Losses vs. Multi-Year Trade, Horticulture, and Tourism Interruption',
      'Fiscal Anatomy of Post-Disaster Relief vs. Pre-Disaster Mitigation Expenditure',
      'Economic Valuation of Flood-Attenuating Wetlands and Slope-Stabilizing Forests',
      'Household Insurance Gaps, Reconstruction Debt, and Small-Enterprise Survival',
      'Basin- and City-Level Catastrophe Loss Scenario Architecture Using Verified Inventories',
    ],
    methodsTemplate: 'PDNA (Post-Disaster Needs Assessment) archives, state/provincial disaster fund ledgers, input-output interruption models, and natural-capital accounting.',
  },
  {
    roman: 'XXII',
    title: 'Cascading and Compound Disaster Modelling',
    chapterRange: '127–132',
    scopeSummary: 'Full quantitative simulation protocols for Scenarios 01–06—winter quake, GLOF-hydropower cascade, Jhelum deluge, landslide dam, drought-fire-flood, multi-corridor isolation.',
    chapterTitles: [
      'Scenario 01 Protocol: Major Winter Earthquake, Basin Liquefaction, and Sub-Zero Isolation',
      'Scenario 02 Protocol: Glacial Lake Outburst Propagating Through a Hydropower Cascade',
      'Scenario 03 Protocol: Multi-Day Extreme Precipitation Across a Contracted Jhelum Floodplain',
      'Scenario 04 Protocol: Coseismic Landslide Dam Impoundment and Downstream Breach Wave',
      'Scenario 05 Protocol: Multi-Year Snow Drought, Pine Wildfires, and Post-Burn Debris Torrents',
      'Scenario 06 Protocol: Simultaneous Multi-Corridor Highway, Grid, and Telecom Severance',
    ],
    methodsTemplate: 'Multi-hazard event-tree coupling, coupled hydro-geotechnical-lifeline stress testing, and inter-agency tabletop/field exercise design.',
  },
  {
    roman: 'XXIII',
    title: 'Institutional Preparedness and Governance Failures',
    chapterRange: '133–138',
    scopeSummary: 'Sept 2026 parliamentary scrutiny, building-code & floodplain-zoning enforcement gaps, and the 16-point Planned → Demonstrably Effective audit.',
    chapterTitles: [
      'Paper Plans vs. Operational Readiness: Auditing NDMA, SDMA, PDMA, GBDMA, and LDMA Frameworks',
      'September 2026 Parliamentary Scrutiny: Seismic Code Gaps, Floodplain Zoning, and Missing Mitigation Plans',
      'Municipal Building Approvals vs. Independent Structural Engineering Verification',
      'Evaluating Early Warning Systems Across Five Maturity Tiers (Planned to Demonstrably Effective)',
      'Urban Search & Rescue, Golden-Hour Equipment Caches, and Inter-District Mutual Aid',
      'Public Right-to-Know: Making Microzonation, Dam EAPs, and Building Audits Publicly Accessible',
    ],
    methodsTemplate: 'Parliamentary/assembly committee reports, CAG/auditor-general disaster audits, municipal bylaw enforcement sampling, and 16-point readiness scorecards.',
  },
  {
    roman: 'XXIV',
    title: 'International Disaster Resilience Models',
    chapterRange: '139–144',
    scopeSummary: 'Comparative lessons from Japan, Switzerland, New Zealand, Chile, United States, Netherlands, Austria, Italy, Sendai Framework, and ICIMOD.',
    chapterTitles: [
      'Japan and Chile: Enforcing Ductile Seismic Construction and Engineering Accountability',
      'Switzerland and Austria: Binding Alpine Hazard Cadastres, Avalanche Zoning, and Torrent Control',
      'New Zealand and Italy: Liquefaction Land Zoning, Masonry Retrofitting, and Slope Instrumentation',
      'The Netherlands: Room-for-the-River Governance Applied to Himalayan Alluvial Valleys',
      'United States and Sendai Framework: Critical Lifeline Resilience and Pre-Disaster Investment',
      'ICIMOD and Transboundary Mountain Science: Sharing Upstream Warnings Across Borders',
    ],
    methodsTemplate: 'Comparative statutory analysis, building-code performance reviews, hazard-zoning ordinances, and transboundary data-sharing protocols.',
  },
  {
    roman: 'XXV',
    title: 'The Western Himalayan Disaster Prevention Agenda 2027–2050',
    chapterRange: '145–150',
    scopeSummary: 'Actionable quarter-century roadmap uniting scientific observatories, hospital/school retrofits, wetland restoration, lifeline redundancy, and KEW monitoring.',
    chapterTitles: [
      '2027–2030 Immediate Priorities: Hospital & School Seismic Retrofits and Priority-24 GLOF Telemetry',
      'Statutory Floodplain, Wetland, and Multi-Hazard Slope Zoning Across All Five Regions',
      'Decentralized Mountain Survival: 7-Day District Reserves, Microgrids, and Off-Grid Communications',
      'The KEW Multi-Hazard & Critical Infrastructure Resilience Command Center Architecture',
      'Citizen Preparedness, Vernacular Seismic Wisdom, and School/Community Drill Mandates',
      'From Fatalism to Foresight: A Quarter-Century Covenant for Western Himalayan Survival (2027–2050)',
    ],
    methodsTemplate: 'Phased public-investment roadmaps, statutory reform templates, open data standards, and annual independent accountability benchmarks.',
  },
];

function slugifyChapterTitle(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 68)
    .replace(/-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const TIME_BOMB_VOLUMES_25: TimeBombVolumeSpec[] = RAW_VOLUME_BLUEPRINTS.map(
  (vol, vIdx) => {
    const startNum = vIdx * 6 + 1;
    return {
      roman: vol.roman,
      title: vol.title,
      chapterRange: vol.chapterRange,
      scopeSummary: vol.scopeSummary,
      chapters: vol.chapterTitles.map((cTitle, cIdx) => {
        const number = String(startNum + cIdx).padStart(2, '0');
        return {
          number,
          title: cTitle,
          investigativeQuestion: `How do empirical records, physical modelling, and institutional audits across the Western Himalayas resolve the risk mechanisms of "${cTitle}" without deterministic prediction or regional over-generalization?`,
          primaryRecordsAndMethods: vol.methodsTemplate,
        };
      }),
    };
  }
);

export const ALL_150_TIME_BOMB_CHAPTERS: TimeBombChapterSpec[] =
  TIME_BOMB_VOLUMES_25.flatMap((vol) =>
    vol.chapters.map((ch) => ({
      number: ch.number,
      slug: slugifyChapterTitle(ch.number, ch.title),
      volumeRoman: vol.roman,
      volumeTitle: vol.title,
      title: ch.title,
      investigativeQuestion: ch.investigativeQuestion,
      primaryRecordsAndMethods: ch.primaryRecordsAndMethods,
      verificationStatus:
        'PROPOSED MONOGRAPH CHAPTER ARCHITECTURE · STAGE 03–05 MULTI-HAZARD PROTOCOL (NOT A COMPLETED REPORT)',
    }))
  );

export function getTimeBombChapterBySlug(
  chapterSlug: string
): TimeBombChapterSpec | undefined {
  return ALL_150_TIME_BOMB_CHAPTERS.find((c) => c.slug === chapterSlug);
}
