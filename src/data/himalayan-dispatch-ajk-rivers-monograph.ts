// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 17 · AZAD JAMMU & KASHMIR HYDROLOGY & JUSTICE
// "THE RIVERS THAT NO LONGER BELONG TO THEIR VALLEYS:
//  AZAD JAMMU & KASHMIR — HYDROPOWER, RIVER DIVERSION, SUBMERGED CIVILIZATIONS
//  AND THE UNRESOLVED QUESTION OF ENVIRONMENTAL JUSTICE"
//
// Companion to Flagship Dispatch 25 in Vol. 01 / No. 01 (placed between
// "The Price of Power" / "The Wealth Beneath the Mountains" and
// "The Western Himalayas Are Sitting on a Time Bomb", renumbering subsequent
// investigations through Selective Environmental Consciousness).
//
// STRICT BYLINE & BUREAU GOVERNANCE:
// - Regional Bureau: Muzaffarabad Bureau (In Establishment — NO physical local
//   office implied).
// - Public Byline: "Himalayan Dispatch Research Desk | Muzaffarabad Coverage"
// - Editorial Oversight: Himalayan Dispatch Central Editorial Board
// - NO personal Dr. Fayaz Ahmad Khan byline is used on this investigation.
// ─────────────────────────────────────────────────────────────────────────────

export interface AjkChapterSpec {
  number: string;
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  investigativeQuestion: string;
  primaryRecordsAndMethods: string;
  verificationStatus: string;
}

export interface AjkVolumeSpec {
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

export const AJK_RIVERS_MONOGRAPH_SPEC = {
  monographId: 'ed-monograph-17-ajk-rivers',
  monographSlug: 'monograph-17-the-rivers-that-no-longer-belong-to-their-valleys',
  monographLabel: 'MONOGRAPH 17 · WATER GOVERNANCE, DISPLACEMENT & ENVIRONMENTAL JUSTICE',
  dispatchNumber: '25',
  storySlug: 'the-rivers-that-no-longer-belong-to-their-valleys',
  kicker:
    'SPECIAL HISTORICAL & HYDROLOGICAL INVESTIGATION · WATER GOVERNANCE · ENERGY JUSTICE · ENVIRONMENTAL ECONOMICS · COMMUNITY RIGHTS',
  extendedRubric:
    'SPECIAL HISTORICAL & HYDROLOGICAL INVESTIGATION · RESOURCE GOVERNANCE · ENERGY JUSTICE · ENVIRONMENTAL ACCOUNTABILITY',
  title: 'The Rivers That No Longer Belong to Their Valleys',
  subtitle:
    'Azad Jammu & Kashmir: Hydropower, River Diversion, Submerged Civilizations and the Unresolved Question of Environmental Justice',
  shortDeck:
    'From the submerged villages of Mangla to the diminished river flows of Muzaffarabad.',
  standfirst:
    'From the submerged villages of Mangla to the diminished river flows of Muzaffarabad, an investigation into what happens when mountain waters are transformed into national economic resources while the communities surrounding them confront displacement, water insecurity and ecological uncertainty.',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Muzaffarabad Coverage',
  subBylineDesk:
    'Azad Jammu & Kashmir Coverage · Hydrological Sciences, Water Resource Governance, Environmental Economics & Community Rights Desk',
  editorialOversight: 'Himalayan Dispatch Central Editorial Board',
  bureauDisclosure:
    'Regional Bureau Disclosure: Muzaffarabad Bureau (Proposed headquarters: Muzaffarabad · Coverage: All ten districts of Azad Jammu & Kashmir). Until the bureau is formally established and a regional correspondent is appointed, reporting is conducted by the Himalayan Dispatch Research Desk | Muzaffarabad Coverage under the Himalayan Dispatch Central Editorial Board; no operational physical local office is implied.',
  geographicalFocus:
    'Muzaffarabad · Neelum Valley · Mirpur · Mangla · Sudhnoti · Bagh · Haveli · Poonch · Hattian Bala · Kotli · Bhimber · Upper Jhelum Basin',
  overarchingQuestion:
    'When a region’s rivers are valuable enough to sustain economies beyond its mountains, why must the communities living beside those rivers struggle to secure their own water, electricity and environmental future?',
  replacementCostQuestion:
    'How much public expenditure becomes necessary to replace natural environmental services after those services have been disrupted by infrastructure development?',
  manglaGenerationalAxiom:
    'A reservoir may serve successive generations of electricity consumers, while the consequences of displacement remain part of the lives of successive generations of affected families.',
  researchLimitationsDisclosure:
    'Research Limitations & Evidentiary Boundaries: These six investigative pillars have been structured through preliminary documentary research—incorporating Ministry of Water Resources records, the AJ&K Government’s 2019 Sustainable Development Report, World Bank cumulative-impact assessments, 2024–25 AJ&K financial statements, and March–May 2026 reporting in Dawn, Business Recorder, and The News International. Continuous contemporary river discharge gauges, cumulative 1960s-plus-raising reservoir submergence ledgers, audited household-level compensation arrears, multi-decadal Landsat forest-loss verification, and georeferenced mining concession registries require further primary verification. The 280 m³/s Neelum–Jhelum figure is a design/engineering diversion capacity rather than continuous measured flow; the World Bank >84.6% (650 m³/s to <100 m³/s) figure is a projected cumulative-development scenario rather than a verified present-day river measurement; and the 15,780-acre / 118-village / PKR 26B Mangla metrics apply specifically to the later Mangla Dam Raising Project rather than cumulative original-dam totals. No regional correspondent has yet been assigned.',
  heroStats: [
    { value: '12', label: 'Thematic volumes' },
    { value: '72', label: 'Proposed chapters' },
    { value: '10', label: 'AJ&K districts covered' },
    { value: '6', label: 'Investigative priorities' },
  ],
  publicationHierarchy: [
    {
      level: '01 · FLAGSHIP REGIONAL INVESTIGATION (AZAD JAMMU & KASHMIR)',
      title: 'The Rivers That No Longer Belong to Their Valleys',
      detail:
        'Uniting Muzaffarabad’s post-2018 Neelum–Jhelum river diversion and PKR 1.6B+ water-replacement paradox with six decades of Mangla submergence, forest stress, 2024–2026 mining reversals, spring decline, and post-2005 earthquake resilience.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-rivers-that-no-longer-belong-to-their-valleys',
      ctaLabel: 'Read AJ&K Flagship Dispatch',
    },
    {
      level: '02 · MONOGRAPH 17 ARCHITECTURE (12 VOLUMES · 72 CHAPTERS)',
      title: 'Complete Hydrological, Displacement & Resource Governance Blueprint',
      detail:
        'Twelve thematic volumes and seventy-two proposed chapter protocols examining all ten districts of Azad Jammu & Kashmir under Central Editorial Board oversight.',
      href: '/himalayan-dispatch/issues/monograph-17-the-rivers-that-no-longer-belong-to-their-valleys',
      ctaLabel: 'Explore Monograph 17',
    },
    {
      level: '03 · KASHMIR ECOWATCH OBSERVATORY LAYER',
      title: 'AJ&K River Diversion, Reservoir Displacement & Resource Justice Observatory',
      detail:
        'Permanent 10-registry accountability layer tracking environmental flows, municipal dilution, Mangla water-usage charges, 2003 Mirpur water pledges, forest-energy links, and mining concessions.',
      href: '/earth-human-impact/ajk-river-justice-observatory',
      ctaLabel: 'Open KEW AJ&K Observatory',
    },
  ],
} as const;

export const MUZAFFARABAD_DIVERSION_METRICS = [
  {
    value: '969 MW',
    label: 'Installed generating capacity',
    note: 'Neelum–Jhelum Hydropower Project (commissioned 2018), diverting water at Nauseri via twin/headrace tunnels.',
  },
  {
    value: '280 m³/s',
    label: 'Reported water diversion',
    note: 'Engineering design diversion figure—NOT a continuous measured river discharge.',
  },
  {
    value: '41 km',
    label: 'Distance upstream of Muzaffarabad',
    note: 'Nauseri diversion dam location upstream of the historic Neelum–Jhelum confluence at Domel, Muzaffarabad.',
  },
  {
    value: '450,000',
    label: 'Population targeted by water scheme',
    note: 'Residents targeted by the >PKR 1.6 billion water supply scheme commissioned in 2025 after river-flow & groundwater stress.',
  },
] as const;

export const WORLD_BANK_CUMULATIVE_FLOW_SCENARIO = {
  badge: 'PROJECTED CUMULATIVE FLOW REDUCTION · WORLD BANK ASSESSMENT',
  baselineScenario: '650 m³/s',
  reducedScenario: 'Below 100 m³/s',
  percentageReduction: 'Over 84.6%',
  replacementSchemeCost: 'PKR 1.6B+ (2025)',
  caveat:
    'Methodological Warning: Over 84.6% (from ~650 m³/s to <100 m³/s) is a projected flow reduction under the World Bank’s assessed cumulative hydropower-development scenario—it must NOT be presented as a verified present-day continuous gauge measurement.',
  ajk2019OfficialAdmission:
    'The AJ&K Government’s own 2019 Sustainable Development Report acknowledged reduced Neelum river flow through Muzaffarabad, drinking-water scarcity, lowered water-table recharge, and concentrated untreated municipal sewage following upstream diversion.',
} as const;

export const MUZAFFARABAD_SCIENTIFIC_DOMAINS_10 = [
  { domain: 'Hydrology', investigation: 'Actual continuous upstream (Nauseri) vs. downstream (Muzaffarabad/Domel) seasonal discharge hydrographs.' },
  { domain: 'Water quality', investigation: 'Coliform, BOD/COD, and untreated municipal sewage concentration under diminished dilution flows.' },
  { domain: 'Aquatic ecology', investigation: 'Schizothorax snow-trout & Mahseer migration barriers, benthic thermal stress, and habitat continuity.' },
  { domain: 'Groundwater', investigation: 'Hyporheic river–aquifer exchange loss and drying riverside springs/wells across Muzaffarabad.' },
  { domain: 'Urban climatology', investigation: 'Measured microclimatic shifts in valley-floor summer temperature and relative humidity along exposed cobble beds.' },
  { domain: 'Public health', investigation: 'Household drinking-water safety, enteric disease incidence, and summer sanitation burdens.' },
  { domain: 'Energy justice', investigation: 'Local AJ&K electricity allocation, tariff structure, and winter/summer load-shedding reliability.' },
  { domain: 'Environmental economics', investigation: 'Public capital & operating expenditure (>PKR 1.6B scheme) required to replace lost natural river services.' },
  { domain: 'Transboundary hydrology', investigation: 'Cumulative basin-scale interaction of upstream Kishanganga (330 MW) and Neelum–Jhelum (969 MW) diversions.' },
  { domain: 'Governance', investigation: 'Statutory monitoring and independent verification of minimum environmental-flow (e-flow) obligations.' },
] as const;

export const MANGLA_RAISING_METRICS_2026 = {
  badge: 'MANGLA DAM RAISING PROJECT · MAY 2026 FEDERAL COMPENSATION SCRUTINY',
  scopeWarning:
    'Historical Scope Boundary: These figures pertain specifically to the 2000s Mangla Dam Raising Project (as flagged by Pakistan’s Ministry of Defence in May 2026 reporting), NOT the cumulative land, town, and population submergence of the original 1960s Mangla Dam.',
  fiscalNote:
    'AJ&K’s 2024–25 official financial statements record Mangla water-usage charges, providing an auditable public ledger to compare actual transfers against royalty parity, electricity tariffs, and unfulfilled rehabilitation pledges.',
  metrics: [
    {
      value: '15,780 acres',
      sub: 'Approximately 63.9 km²',
      label: 'Land inundated by dam raising',
    },
    {
      value: '118',
      sub: 'Mirpur & reservoir rim',
      label: 'Villages affected by displacement',
    },
    {
      value: 'PKR 26B',
      sub: '2003Raising Agreement',
      label: 'Agreed compensation package in 2003',
    },
    {
      value: '2026',
      sub: 'May 2026 MoD communication',
      label: 'Continuing compensation concerns',
    },
  ],
} as const;

export const AJK_FOREST_EVIDENCE_PROTOCOLS_10 = [
  { investigation: 'Historical forest loss', requiredEvidence: 'Harmonized Landsat archive analysis from the 1970s onward across all 10 districts.' },
  { investigation: 'Commercial timber extraction', requiredEvidence: 'Forest Department coupe permissions, salvage markings, and transit records.' },
  { investigation: 'Domestic fuelwood dependency', requiredEvidence: 'Measured household winter energy consumption vs. power-outage hours & LPG/tariff costs (measured, never assumed).' },
  { investigation: 'Forest fragmentation', requiredEvidence: 'Patch-corridor habitat connectivity metrics across Pir Panjal & Neelum conifers.' },
  { investigation: 'Wildlife disturbance', requiredEvidence: 'Musk deer, Tragopan, leopard, and black bear occupancy & poaching records.' },
  { investigation: 'Forest fires', requiredEvidence: 'VIIRS/MODIS burn-scar mapping across Chir pine slopes in Kotli, Sudhnoti, Mirpur & Muzaffarabad.' },
  { investigation: 'Spring depletion', requiredEvidence: 'Multi-season discharge measurements of rural chashma springs relative to upslope canopy loss.' },
  { investigation: 'Landslide vulnerability', requiredEvidence: 'Coupled root-cohesion, road-cutting, and slope-stability susceptibility mapping.' },
  { investigation: 'Afforestation performance', requiredEvidence: 'Independently audited 3-to-5-year sapling survival rates vs. reported planting totals.' },
  { investigation: 'Administrative accountability', requiredEvidence: 'Forest budgets, magistrate/ward enforcement logs, and ecological restoration audits.' },
] as const;

export const AJK_MINING_CONCESSION_QUESTIONS_8 = [
  { no: '01', question: 'Why were the original restrictions imposed?', evidenceRequired: 'Authenticated text and departmental file notes of the March 22, 2024 notification.' },
  { no: '02', question: 'Why were they subsequently withdrawn with retrospective effect?', evidenceRequired: 'March 17, 2026 withdrawal notification (Dawn reporting) and cabinet/departmental rationale.' },
  { no: '03', question: 'Who benefited from the retrospective withdrawal?', evidenceRequired: 'Complete registry of mining leases, quarry permits, and medicinal/herbal forest contracts.' },
  { no: '04', question: 'What geographical areas are affected?', evidenceRequired: 'Georeferenced cadastral and compartment lease polygons across AJ&K districts.' },
  { no: '05', question: 'Are demarcated forests and protected areas involved?', evidenceRequired: 'Spatial GIS overlap audit against national parks, wildlife sanctuaries, and reserved forests.' },
  { no: '06', question: 'Were affected valley communities consulted?', evidenceRequired: 'Public hearing transcripts, union-council objections, and consent documentation.' },
  { no: '07', question: 'What environmental assessments exist?', evidenceRequired: 'AJK-EPA Initial Environmental Examinations (IEEs), EIAs, and field compliance logs.' },
  { no: '08', question: 'What revenues are retained locally?', evidenceRequired: 'Audited mineral/herbal royalty receipts vs. watershed rehabilitation expenditure.' },
] as const;

export const AJK_EDITORIAL_PRIORITIES_6 = [
  {
    priority: '01',
    title: 'The City That Lost Its River',
    focus: 'Muzaffarabad · Neelum–Jhelum 969 MW diversion, reduced flow, sewage concentration & >PKR 1.6B replacement waterworks',
    significance: 'Hydrological transformation and urban environmental justice',
  },
  {
    priority: '02',
    title: 'The Villages Beneath the Water',
    focus: 'Mangla Dam (1960s submergence) & Raising Project (15,780 acres · 118 villages · PKR 26B 2003 package · May 2026 arrears concerns)',
    significance: 'Historical displacement and resource economics',
  },
  {
    priority: '03',
    title: 'Twenty-One Years After the Earthquake',
    focus: 'Muzaffarabad, Bagh & Rawalakot (2005–2026) · Hospitals, schools, Balakot–Bagh fault zoning & seismic resilience vs. mere rebuilding',
    significance: 'Disaster reconstruction accountability',
  },
  {
    priority: '04',
    title: 'The Mountains Returned to the Miners',
    focus: 'March 2026 retrospective withdrawal of March 2024 mining & forest medicinal/herbal concession restrictions',
    significance: 'Contemporary extractive-resource governance',
  },
  {
    priority: '05',
    title: 'The Water Crisis in the Land of Rivers',
    focus: 'Drying springs, declining groundwater recharge & unfulfilled 2003 Mangla drinking-water commitments in Mirpur (March 2026 reporting)',
    significance: 'Public health and household water security',
  },
  {
    priority: '06',
    title: 'The Forests That Are Losing Their Mountains',
    focus: 'Sudhnoti (April 2026 FAO report), Neelum, Bagh, Haveli, Poonch, Hattian Bala & Muzaffarabad deforestation and fuelwood pressures',
    significance: 'Watershed degradation and ecological resilience',
  },
] as const;

export const AJK_TEN_DISTRICTS_COVERAGE = [
  { district: 'Muzaffarabad', division: 'Muzaffarabad', keyIssues: 'Neelum–Jhelum confluence dewatering, sewage dilution loss, >PKR 1.6B water scheme, 2005 fault-zone urban growth, slope cutting.' },
  { district: 'Neelum', division: 'Muzaffarabad', keyIssues: 'Nauseri 969 MW diversion dam, upstream Kishanganga–Neelum cumulative flow reduction, moist temperate forest & herbal extraction, winter isolation.' },
  { district: 'Hattian Bala', division: 'Muzaffarabad', keyIssues: 'Upper Jhelum corridor hydropower proposals, 2005 Chikar landslide-lake memory, steep watershed erosion, spring vulnerability.' },
  { district: 'Bagh', division: 'Poonch', keyIssues: '2005 earthquake reconstruction audit, Pir Panjal conifer fragmentation, fuelwood dependence, flash-flood nallahs.' },
  { district: 'Haveli', division: 'Poonch', keyIssues: 'High-altitude alpine pasture & medicinal flora concessions, snowmelt spring recharge, road-cut slope instability.' },
  { district: 'Poonch', division: 'Poonch', keyIssues: 'Poonch River aquatic ecology & mahseer habitat, Rawalakot urban water stress, hillside deforestation.' },
  { district: 'Sudhnoti', division: 'Poonch', keyIssues: 'April 2026 FAO-documented forest loss, urban expansion, domestic fuelwood pressure, acute soil erosion, and spring scarcity.' },
  { district: 'Kotli', division: 'Mirpur', keyIssues: 'Poonch–Jhelum inflow sediment into Mangla, Chir pine forest fires, stone/mineral quarrying, seasonal drinking-water shortages.' },
  { district: 'Mirpur', division: 'Mirpur', keyIssues: 'Original 1960s & 2003 Mangla raising submergence (15,780 acres; 118 villages), 2026 compensation arrears, 2003 drinking-water pledge, 2019 quake liquefaction.' },
  { district: 'Bhimber', division: 'Mirpur', keyIssues: 'Foothill groundwater drawdown, aggregate mining concessions, scrub-forest degradation, heat and drought stress.' },
] as const;

const RAW_AJK_VOLUMES_12: Array<{
  roman: string;
  title: string;
  chapterRange: string;
  scopeSummary: string;
  chapterTitles: [string, string, string, string, string, string];
  methodsTemplate: string;
}> = [
  {
    roman: 'I',
    title: 'Rivers as National Infrastructure, Valleys as Sacrifice Zones',
    chapterRange: '01–06',
    scopeSummary: 'Historical political ecology of Upper Jhelum, Neelum, and Poonch waters across all ten districts of Azad Jammu & Kashmir.',
    chapterTitles: [
      'Confluence Geography: How the Neelum, Jhelum, and Poonch Shaped a Mountain Civilization',
      'From Local Lifelines to National Megawatts: Seven Decades of Basin Transformation',
      'Constitutional, Fiscal, and Regulatory Architecture of Water Governance in AJ&K',
      'Mapping All Ten Districts: Hydrological Abundance vs. Household Resource Deprivation',
      'Methodological Standards: Separating Engineering Capacities and Projections from Gauge Truth',
      'The Central Question of Environmental Justice Along Diverted Mountain Rivers',
    ],
    methodsTemplate: 'Historical basin archives, AJ&K constitutional/financial statutes, hydrological network synthesis, and strict evidentiary classification.',
  },
  {
    roman: 'II',
    title: 'The City That Lost Its River: Muzaffarabad and the Neelum–Jhelum Diversion',
    chapterRange: '07–12',
    scopeSummary: 'Engineering anatomy of the 2018 Nauseri diversion (969 MW; 280 m³/s design capacity) and downstream de-watering through Muzaffarabad.',
    chapterTitles: [
      'Nauseri to Chattar Kalas: Engineering Anatomy of the 41-Kilometre Tunnel Diversion',
      'Understanding the 280 m³/s Design Figure vs. Seasonal Upstream & Downstream Hydrographs',
      'Inside the AJ&K Government’s 2019 Sustainable Development Report Admissions',
      'Evaluating the World Bank Cumulative Scenario (650 m³/s to Below 100 m³/s; >84.6%)',
      'Cumulative Transboundary Interactions: Kishanganga (330 MW) and Neelum–Jhelum (969 MW)',
      'Auditing Statutory Environmental-Flow Commitments and Real-Time Gauge Transparency',
    ],
    methodsTemplate: 'WAPDA/MoWR project filings, World Bank cumulative-impact reports, AJ&K P&DD 2019 report, and Sentinel-2 wetted-channel width time series.',
  },
  {
    roman: 'III',
    title: 'Sewage, Aquifers, Microclimate and the PKR 1.6 Billion Replacement Paradox',
    chapterRange: '13–18',
    scopeSummary: 'Urban water quality, river–aquifer decoupling, thermal shifts, snow-trout ecology, and the economics of replacing lost river services.',
    chapterTitles: [
      'When Dilution Disappears: Untreated Municipal Outfalls Entering a Shrunken Neelum Channel',
      'Riverbed Incision, Hyporheic Disconnect, and Falling Riverside Wells in Muzaffarabad',
      'Exposed Cobble Bars and Urban Microclimatology: Measuring Valley Temperature & Humidity Shifts',
      'Fragmented Cold-Water Fisheries: Snow Trout, Mahseer, and Benthic Food-Web Collapse',
      'The 2025 Muzaffarabad Water Supply Scheme (>PKR 1.6B for 450,000 Residents): Replacement Economics',
      'Full-Cost Accounting: Comparing Hydropower Revenues Against Municipal Externality Expenditures',
    ],
    methodsTemplate: 'DO/BOD/fecal-coliform sampling protocols, piezometric well logs, Landsat thermal-band urban profiles, and public-works capital ledgers.',
  },
  {
    roman: 'IV',
    title: 'The Villages Beneath the Water: Original Mangla Submergence (1960s)',
    chapterRange: '19–24',
    scopeSummary: 'Historical documentation of Old Mirpur, submerged fertile valleys, heritage shrines, evacuee resettlement, and multi-generational memory.',
    chapterTitles: [
      'Before the Impoundment: Agrarian Economy and Cultural Geography of Old Mirpur',
      'Submerged Towns, Wells, Graveyards, and Archaeological Sites Revealed During Drawdowns',
      '1960s Compensation Standards, Allotment Disparities, and Cross-Regional Resettlement',
      'From Fertile Alluvium to Diaspora: Long-Term Socioeconomic Trajectories of Displaced Families',
      'Ecological Transformation of the Lower Jhelum–Poonch Confluence Into a Fluctuating Reservoir',
      'Oral Histories and Cadastral Reconstruction of the Original Mangla Submergence Zone',
    ],
    methodsTemplate: '1960s revenue/land-acquisition gazettes, drawdown exposure surveys, archival photography provenance, and structured oral-history protocols.',
  },
  {
    roman: 'V',
    title: 'Mangla Dam Raising (2003–2026): Unfinished Compensation and Fiscal Justice',
    chapterRange: '25–30',
    scopeSummary: 'Forensic audit of the 2003 Raising Agreement (15,780 acres; 118 villages; PKR 26B), May 2026 Ministry of Defence concerns, and water-usage charges.',
    chapterTitles: [
      'The 2003 Mangla Raising Agreement: 15,780 Acres (63.9 km²), 118 Villages, and PKR 26 Billion',
      'New City & Model Town Resettlement Promises vs. Infrastructure Delivery on the Ground',
      'May 2026 Federal Scrutiny: Examining Pakistan Ministry of Defence Compensation Concerns',
      'Water Usage Charges in AJ&K’s 2024–25 Financial Statements: Entitlements vs. Receipts',
      'Electricity Tariffs, Hydel Profit Parity Debates, and Local Power Reliability in AJ&K',
      'Intergenerational Environmental Justice Standards for Legacy Reservoir Populations',
    ],
    methodsTemplate: '2003 Tripartite/Raising Agreement clauses, Accountant General AJ&K 2024–25 financial statements, May 2026 parliamentary/press disclosures, and resettlement audits.',
  },
  {
    roman: 'VI',
    title: 'The Water Crisis in the Land of Rivers: Springs, Aquifers and Mirpur’s Pledge',
    chapterRange: '31–36',
    scopeSummary: 'Paradox of household drinking-water insecurity beside major rivers and reservoirs, drying chashma springs, and Mirpur’s 2003 water commitment.',
    chapterTitles: [
      'Abundant Rivers, Dry Taps: Mapping Household Drinking-Water Access Across Ten Districts',
      'Mirpur Beside Mangla: Auditing the 2003 Drinking-Water Supply Commitments Through March 2026',
      'Disappearing Mountain Springs (Chashmas) Across Poonch, Bagh, Sudhnoti, and Muzaffarabad',
      'Changing Precipitation, Rising Temperatures, and Reduced Natural Groundwater Recharge',
      'Borehole Proliferation, Bacteriological Contamination, and Tanker-Water Household Costs',
      'Watershed Spring-Shed Recharge Sanctuaries and Guaranteed Local Water Rights',
    ],
    methodsTemplate: 'Spring inventory & isotope recharge protocols, PHED/municipal water-supply ledgers, March 2026 investigative filings, and household water-budget surveys.',
  },
  {
    roman: 'VII',
    title: 'The Forests That Are Losing Their Mountains: Watersheds Under Stress',
    chapterRange: '37–42',
    scopeSummary: 'Deforestation, fuelwood-electricity linkages, soil erosion, pine fires, and plantation survival across Sudhnoti, Neelum, Bagh, Haveli, Poonch, and Hattian Bala.',
    chapterTitles: [
      'Half a Century of Canopy Change: Landsat Reconstruction Across AJ&K (1972–2026)',
      'Sudhnoti in Focus: Auditing the April 2026 FAO-Cited Forest, Erosion, and Water Warnings',
      'Neelum, Bagh, Haveli, Poonch, and Hattian Bala: Timber Extraction and Habitat Fragmentation',
      'Testing the Energy–Forest Hypothesis: Do Power Shortages and Tariffs Drive Fuelwood Cutting?',
      'Chir Pine Wildfires, Overgrazing, and Slope Destabilization Above Valley Roads',
      'Auditing Afforestation Claims: Independent Sapling Survival vs. Departmental Plantation Totals',
    ],
    methodsTemplate: 'Multi-decadal Landsat/Sentinel-2 NDVI & canopy classification, household fuel-mix surveys, VIIRS fire series, and independent quadrat survival audits.',
  },
  {
    roman: 'VIII',
    title: 'The Mountains Returned to the Miners: Extractive Concessions & Forest Contracts',
    chapterRange: '43–48',
    scopeSummary: 'Forensic governance inquiry into the March 17, 2026 retrospective withdrawal of March 22, 2024 mining and medicinal/herbal forest restrictions.',
    chapterTitles: [
      'The March 22, 2024 Moratorium: Why AJ&K Restricted Mining Leases and Herbal Contracts',
      'March 17, 2026: Anatomy and Legal Effect of the Retrospective Withdrawal Notification',
      'Concession Transparency: Mapping Mineral Leases, Riverbed Quarries, and Forest Contracts',
      'Spatial Overlap Analysis: Demarcated Forests, Protected Sanctuaries, and Fragile Slopes',
      'Medicinal and Aromatic Alpine Plants: Commercial Extraction vs. Community Livelihoods',
      'Environmental Clearances, Community Consultation, and Local Royalty Retention Audits',
    ],
    methodsTemplate: 'Official gazette notifications (March 2024 & March 2026), Mines & Minerals lease registries, Forest Department non-timber contracts, and AJK-EPA clearance dockets.',
  },
  {
    roman: 'IX',
    title: 'Twenty-One Years After October 8, 2005: Rebuilt Buildings or Rebuilt Resilience?',
    chapterRange: '49–54',
    scopeSummary: 'Post-2005 earthquake reconstruction audit (2005–2026) across Muzaffarabad, Bagh, and Rawalakot—linking directly to Monograph 13.',
    chapterTitles: [
      'October 8, 2005 Revisited: Geological Lessons of the Balakot–Bagh Fault Rupture',
      'Two Decades of ERRA/SERRA Reconstruction: Expenditure Ledgers vs. Completed Public Assets',
      'Hospitals and Schools Built Since 2005: Independent Seismic Structural Safety Audits',
      'Return to the Red Zone: Unregulated Commercial & Multi-Storey Growth on Fault & Slope Margins',
      'Coseismic Landslide Scars (Lohar Gali, Hattian) and River-Corridor Highway Vulnerability',
      'Emergency Preparedness Today: Drills, Microzonation Enforcement, and Rescue Readiness in AJ&K',
    ],
    methodsTemplate: 'ERRA/SERRA audit reports, seismic microzonation maps, rapid visual & non-destructive structural testing of post-2005 schools/hospitals, and SDMA AJ&K plans.',
  },
  {
    roman: 'X',
    title: 'Cumulative Cascade Pressure: Additional Hydropower Across the Jhelum–Poonch System',
    chapterRange: '55–60',
    scopeSummary: 'Kohala, Azad Pattan, Mahl, Jaggran, Gulpur, and tributary run-of-river/storage cascades—cumulative sediment, e-flow, and community impacts.',
    chapterTitles: [
      'Mapping Operational, Under-Construction, and Proposed Hydropower Across AJ&K Rivers',
      'Gulpur and the Poonch River Mahseer National Park: Auditing Biodiversity Offset Claims',
      'Kohala, Azad Pattan, and Mahl: Assessing Mainstem Jhelum Dewatering & Tunnel Risks',
      'Sediment Trapping, Downstream Channel Hunger, and Mangla Dead-Storage Dynamics',
      'Land Acquisition, Tunnel Blasting, Spring Loss, and Grievance Redressal in Project Valleys',
      'Basin-Wide Strategic Environmental Assessment Before Further Tributary Licensing',
    ],
    methodsTemplate: 'Project EIAs/CIAs, IFC/World Bank performance standards, Poonch River fish-telemetry studies, and sediment-transport budgets.',
  },
  {
    roman: 'XI',
    title: 'Environmental Economics & Constitutional Resource Rights',
    chapterRange: '61–66',
    scopeSummary: 'Quantifying externalized ecological costs, clean-energy transitions for mountain households, and transparent benefit-sharing.',
    chapterTitles: [
      'Valuing Unpriced River Services: Dilution, Aquifer Recharge, Microclimate, and Fisheries',
      'The Fiscal Balance Sheet: Hydel Levies, Water Usage Charges, and Federal-Regional Transfers',
      'Affordable Winter Electricity & Clean Cooking as Forest-Conservation Infrastructure',
      'Comparative Mountain Benefit-Sharing Models: Switzerland, Norway, Nepal, and Colombia',
      'Right of Reply and Institutional Accountability Across Federal and AJ&K Agencies',
      'Open Public Ledgers for Every Cubic Metre Diverted and Every Rupee Collected',
    ],
    methodsTemplate: 'Public finance audits, replacement-cost valuation, household energy-affordability modelling, and comparative statutory benefit-sharing review.',
  },
  {
    roman: 'XII',
    title: 'The Azad Jammu & Kashmir River, Forest and Resilience Charter (2027–2040)',
    chapterRange: '67–72',
    scopeSummary: 'Twelve-point actionable governance reform agenda for river restoration, legacy displacement justice, safe drinking water, and seismic safety.',
    chapterTitles: [
      'Legally Binding, Telemetered Minimum Environmental Flows Through Muzaffarabad & All Towns',
      'Municipal Wastewater Interception and Treatment Prior to Any Upstream Diversion Operation',
      'Time-Bound Resolution and Independent Audit of Legacy Mangla Compensation & Water Pledges',
      'Statutory Moratorium on Unassessed Mining and Protected-Forest Commercial Concessions',
      'Universal Spring-Shed Protection and Piped Safe Drinking-Water Guarantee Across 10 Districts',
      'The KEW AJ&K River Diversion, Displacement & Resource Justice Observatory Architecture',
    ],
    methodsTemplate: 'Statutory reform templates, telemetered e-flow protocols, independent ombudsperson frameworks, and open KEW geospatial monitoring.',
  },
];

function slugifyAjkChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 68)
    .replace(/-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const AJK_RIVERS_VOLUMES_12: AjkVolumeSpec[] = RAW_AJK_VOLUMES_12.map(
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
          investigativeQuestion: `What do primary hydrological records, fiscal ledgers, satellite archives, and community testimonies across Azad Jammu & Kashmir establish regarding "${cTitle}"?`,
          primaryRecordsAndMethods: vol.methodsTemplate,
        };
      }),
    };
  }
);

export const ALL_72_AJK_RIVERS_CHAPTERS: AjkChapterSpec[] =
  AJK_RIVERS_VOLUMES_12.flatMap((vol) =>
    vol.chapters.map((ch) => ({
      number: ch.number,
      slug: slugifyAjkChapter(ch.number, ch.title),
      volumeRoman: vol.roman,
      volumeTitle: vol.title,
      title: ch.title,
      investigativeQuestion: ch.investigativeQuestion,
      primaryRecordsAndMethods: ch.primaryRecordsAndMethods,
      verificationStatus:
        'PROPOSED MONOGRAPH CHAPTER PROTOCOL · HIMALAYAN DISPATCH RESEARCH DESK | MUZAFFARABAD COVERAGE',
    }))
  );

export function getAjkRiversChapterBySlug(
  chapterSlug: string
): AjkChapterSpec | undefined {
  return ALL_72_AJK_RIVERS_CHAPTERS.find((c) => c.slug === chapterSlug);
}
