// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 04 & ELECTORAL ACCOUNTABILITY ARCHITECTURE
// "WHEN POLITICS PROMISES GREEN: POLITICAL MANIFESTOS, ENVIRONMENTAL COMMITMENTS
//  AND GROUND REALITIES ACROSS THE WESTERN HIMALAYAS"
//
// Geographical Coverage: Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan
// Investigation Period: 2000–2026 (15 Thematic Volumes · 75 Proposed Chapters)
// + Permanent KEW Companion: Western Himalayan Environmental Manifesto & Governance Observatory
//
// Research Status Disclosure: Substantial preliminary investigation and publication
// framework. Complete historical manifesto archive, constituency-level legislative
// records, party-wise implementation evidence, and visual verification of two 2024
// manifesto PDFs (whose indexed text was accessible) remain incomplete.
// ─────────────────────────────────────────────────────────────────────────────

export interface ManifestoPartyCommitmentRow {
  party: string;
  documentedCommitmentsOrStatus: string;
  extractionStatus: 'Original PDF / Indexed Text Reviewed' | 'Secondary Academic / Policy Attribution' | 'Full Archival Extraction Pending';
}

export interface RegionalPartyScopeEntry {
  no: string;
  name: string;
  entityType: 'Electoral Political Party' | 'Political & Civil Society Coalition' | 'Independent / Regional Cohort';
}

export interface ManifestoSubjectBenchmark {
  no: string; // '01' .. '30'
  domain: string;
  expectedEvidence: string;
}

export interface FiveRegionRealityRow {
  system: string;
  kashmir: string;
  jammu: string;
  ladakh: string;
  ajk: string;
  gilgitBaltistan: string;
}

export interface WhempProtocolComponent {
  number: string; // '01' .. '10'
  component: string;
  requiredDisclosure: string;
}

export interface PromiseTrackingStatusSpec {
  code: string;
  status: string;
  meaning: string;
}

export interface Monograph04VolumeSpec {
  volumeRoman: string;
  investigation: string;
  chapterCount: number;
  chapterRange: string;
}

export interface Monograph04ChapterSpec {
  number: string; // '01' .. '75'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  investigativeScope: string;
  evidentiaryProtocol: string;
}

export const WHEN_POLITICS_PROMISES_GREEN_SPEC = {
  monographCode: 'MONOGRAPH 06 · ELECTORAL ACCOUNTABILITY & ENVIRONMENTAL GOVERNANCE',
  monographSlug: 'monograph-06-when-politics-promises-green',
  dispatchSlug: 'when-politics-promises-green',
  kicker:
    'SPECIAL INVESTIGATION · ELECTORAL ACCOUNTABILITY · ENVIRONMENTAL MANIFESTOS · GOVERNANCE',
  extendedRubric:
    'SPECIAL INVESTIGATION · ELECTORAL ACCOUNTABILITY · ENVIRONMENTAL GOVERNANCE · POLITICAL ECOLOGY · PUBLIC EXPENDITURE',
  title: 'When Politics Promises Green',
  subtitle:
    'Political Manifestos, Environmental Commitments and Ground Realities Across the Western Himalayas',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Environmental Governance, Legislative Affairs and Public Accountability Desk',
  geographicalCoverage:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan',
  investigationPeriod: '2000–2026',
  nonPartisanStandard:
    'No political party is excluded, and no political party is judged by a different evidentiary standard.',
  definingEditorialStatement: [
    'Political terms are temporary. Environmental consequences can last for generations.',
    'A government may complete its tenure before a newly planted forest matures. A political representative may leave office before the ecological consequences of a tunnel become apparent. An infrastructure project may be inaugurated long before its downstream environmental impacts are understood.',
    'That is why environmental commitments require continuity beyond electoral cycles. The Western Himalayas need political manifestos that explain not only how economies will grow, but how the ecological systems supporting those economies will survive.',
  ],
  definingQuestion:
    'If every political party can explain what it intends to build during the next five years, should it not also explain what it intends to preserve for the next hundred?',
  researchStatusDisclosure:
    'Research Status Disclosure: This is a substantial preliminary investigation and publication framework. Original manifesto documents, historical electoral records, independent environmental audits, and contemporary policy analyses have been identified; however, the complete 2000–2026 historical manifesto archive, constituency-level legislative records, and party-wise implementation evidence remain incomplete. Visual verification of two 2024 manifesto PDFs was unsuccessful, although their indexed text was accessible.',
  heroStats: [
    { value: '5', label: 'Geographical regions' },
    { value: '15 / 75', label: 'Volumes & chapters' },
    { value: '2000–26', label: 'Investigation period' },
  ],
  observatoryHeroStats: [
    { value: '5', label: 'Geographical regions' },
    { value: '30', label: 'Environmental policy domains' },
    { value: '2000–26', label: 'Initial historical coverage' },
  ],
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship',
      title: 'When Politics Promises Green — Five-Region Electoral Investigation',
      detail:
        'Positioned immediately before Selective Environmental Consciousness in Vol. 01 / No. 01: examines 2024–2026 manifestos, jurisdiction, budgets, legislative duty, and WHEMP.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/when-politics-promises-green',
      ctaLabel: 'Read Flagship Investigation',
    },
    {
      level: '02 · 15-Volume, 75-Chapter Monograph',
      title: 'Monograph 06 — Complete 2000–2026 Manifesto & Governance Framework',
      detail:
        'Houses all 15 thematic volumes, 75 chapter protocols, 4 regional party registries, 30 manifesto subjects, 12 development contradictions, and interactive WHEMP evaluator.',
      href: '/himalayan-dispatch/issues/monograph-06-when-politics-promises-green',
      ctaLabel: 'Open Monograph 06',
    },
    {
      level: '03 · Permanent KEW Governance Module',
      title: 'Western Himalayan Environmental Manifesto & Governance Observatory',
      detail:
        'Twelve non-partisan evidence modules and 11 commitment-tracking statuses documenting promises, budgets (INR/PKR), tenure jurisdiction, and measured outcomes.',
      href: '/governance/environmental-manifesto-observatory',
      ctaLabel: 'Open KEW Observatory',
    },
  ],
} as const;

// ── PART I: REGIONAL DOCUMENTARY MANIFESTO REVIEWS ───────────────────────────

export const JK_2024_MANIFESTO_COMMITMENTS: ManifestoPartyCommitmentRow[] = [
  {
    party: 'Jammu & Kashmir National Conference (JKNC)',
    documentedCommitmentsOrStatus:
      'Renewable energy, residential solar power, afforestation, pollution reduction, waste management, and responsible mineral exploration (analysed alongside post-2019 UT governance constraints in Dialogue Earth, 2024).',
    extractionStatus: 'Original PDF / Indexed Text Reviewed',
  },
  {
    party: 'Jammu & Kashmir Peoples Democratic Party (PDP)',
    documentedCommitmentsOrStatus:
      'Contains 13 numbered commitments under environmental protection and sustainability, including urban wetland and rural stream restoration, degraded forest rehabilitation, community forestry and environmental education, preventing illegal logging/encroachment, satellite/drone/GIS forest monitoring, climate-resilient plantation, cleaner energy/transport, Dal Lake restoration, and climate change research.',
    extractionStatus: 'Original PDF / Indexed Text Reviewed',
  },
  {
    party: 'Bharatiya Janata Party (BJP)',
    documentedCommitmentsOrStatus:
      'Contains a dedicated chapter on environmental and natural resource management—covering lake rejuvenation, wind energy, medicinal plant cultivation, and forest conservation—alongside major infrastructure, industrial, and tourism development commitments.',
    extractionStatus: 'Original PDF / Indexed Text Reviewed',
  },
  {
    party: 'Indian National Congress (INC)',
    documentedCommitmentsOrStatus:
      'Agricultural and socioeconomic development commitments identified; environmental provisions require complete line-by-line manifesto extraction.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Jammu & Kashmir Apni Party',
    documentedCommitmentsOrStatus:
      'Manifesto identified; environmental and natural-resource provisions require detailed documentary extraction.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Awami National Conference',
    documentedCommitmentsOrStatus:
      'Manifesto identified; environmental provisions require detailed documentary extraction.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
];

export const LADAKH_POLITICAL_MILESTONES: Array<[string, string]> = [
  ['2019 Lok Sabha elections', 'BJP manifesto commitment concerning Sixth Schedule protection for Ladakh'],
  ['2020 Leh Hill Council elections', 'Constitutional safeguards connected to land, employment, and fragile cold-desert environmental protection'],
  ['2023 Kargil Hill Council elections', 'Local governance authority, water security, and regional development priorities'],
  ['2024 Lok Sabha elections', 'Environmental protection, Sixth Schedule constitutional safeguards, and local representation featured prominently in the campaign'],
  ['2025 constitutional & administrative negotiations', 'Ministry of Home Affairs High-Powered Committee debates concerning land protection, employment, and regional governance'],
  ['September 2026', 'Announcement / promulgation expanding Autonomous Hill Development Councils across all Ladakh districts (distinct from Sixth Schedule constitutional protection under Article 244)'],
];

export const LADAKH_ENVIRONMENTAL_EVIDENCE_QUESTIONS: Array<[string, string]> = [
  ['Glacier-dependent water security', 'Long-term snow/glacier mass-balance monitoring and oasis irrigation water availability'],
  ['Tourism expansion', 'Site-specific visitor carrying-capacity assessments across Leh, Nubra, Pangong, and Zanskar'],
  ['Groundwater extraction', 'Commercial borewell abstraction versus snowmelt aquifer recharge balances'],
  ['Hotel construction', 'Winter water consumption and sub-zero sewage/faecal-sludge treatment compliance'],
  ['Renewable energy projects', 'Utility-scale solar/transmission land requirements, Changthang rangeland rights, and biodiversity impacts'],
  ['Road infrastructure', 'High-pass slope stability, permafrost disturbance, and wildlife corridor fragmentation'],
  ['Cold-desert ecology', 'Endorheic wetland, pasture, and threatened mountain fauna habitat protection'],
  ['Constitutional safeguards', 'Actual statutory powers over land allotment, mineral concessions, and natural resources'],
];

export const AJK_2021_MANIFESTO_BASELINE: ManifestoPartyCommitmentRow[] = [
  {
    party: 'Pakistan Tehreek-e-Insaf (PTI)',
    documentedCommitmentsOrStatus:
      'Clean drinking water, forestry, climate projects, agriculture, livestock, fisheries, and Mangla Dam-related development (reconstructed in University of the Punjab secondary study).',
    extractionStatus: 'Secondary Academic / Policy Attribution',
  },
  {
    party: 'Pakistan Muslim League-Nawaz (PML-N)',
    documentedCommitmentsOrStatus:
      '2021 focus on motorways, infrastructure, and socioeconomic development (PU study); ahead of 2026 elections, party representatives indicated proposed manifesto inclusion of climate adaptation and forest conservation (Dawn — final published text requires separate retrieval).',
    extractionStatus: 'Secondary Academic / Policy Attribution',
  },
  {
    party: 'Pakistan Peoples Party (PPP)',
    documentedCommitmentsOrStatus:
      'Public welfare and basic necessities documented in 2021 secondary reconstruction; complete environmental clauses require primary extraction.',
    extractionStatus: 'Secondary Academic / Policy Attribution',
  },
  {
    party: 'All Jammu & Kashmir Muslim Conference',
    documentedCommitmentsOrStatus: 'Full environmental manifesto requires primary archival retrieval.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Jamaat-e-Islami AJ&K',
    documentedCommitmentsOrStatus: 'Full environmental manifesto requires primary archival retrieval.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Jammu Kashmir Peoples Party',
    documentedCommitmentsOrStatus: 'Full environmental manifesto requires primary archival retrieval.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Other registered parties & independents',
    documentedCommitmentsOrStatus: 'Constituency-level documentary examination required across 2001–2026 cycles.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
];

export const AJK_NEELUM_JHELUM_VERIFICATION_MATRIX: Array<[string, string]> = [
  ['Hydropower development', 'Minimum downstream environmental flow compliance below diversion barrages'],
  ['Electricity generation', 'Local ecological costs versus fiscal royalty and power distribution benefits'],
  ['Drinking-water security', 'Reliable municipal and spring water quantity and quality in Muzaffarabad and Neelum'],
  ['River conservation', 'Measured instream discharge, municipal sewage dilution, and coldwater aquatic habitat'],
  ['Forest conservation', 'Satellite-verified canopy cover and forest health across Neelum and Jhelum valleys'],
  ['Mountain roads', 'Seismic-zone slope cuts, landslide reactivation, and river sediment loading'],
  ['Tourism development', 'Valley wastewater interception, solid waste, and seasonal carrying capacity'],
];

export const GB_2026_CAMPAIGN_EMPHASIS: ManifestoPartyCommitmentRow[] = [
  {
    party: 'Pakistan Peoples Party (PPP)',
    documentedCommitmentsOrStatus:
      'Sustainable tourism and environmental conservation; Hunza chapter discussed waste management and glacier monitoring (attributed to SDPI analysis, June 7, 2026).',
    extractionStatus: 'Secondary Academic / Policy Attribution',
  },
  {
    party: 'Pakistan Muslim League-Nawaz (PML-N)',
    documentedCommitmentsOrStatus:
      'Economic development, tourism, roads, digital connectivity, and infrastructure; climate adaptation received less explicit attention in examined campaign documents (SDPI, June 7, 2026).',
    extractionStatus: 'Secondary Academic / Policy Attribution',
  },
  {
    party: 'PTI-associated independent candidates',
    documentedCommitmentsOrStatus:
      'Historical association with plantation and conservation programmes; 2026 campaigning concentrated substantially on governance and political issues (SDPI, June 7, 2026).',
    extractionStatus: 'Secondary Academic / Policy Attribution',
  },
  {
    party: 'Majlis Wahdat-e-Muslimeen (MWM)',
    documentedCommitmentsOrStatus: 'Party and constituency-level environmental commitments require separate primary extraction.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Islami Tehreek Pakistan',
    documentedCommitmentsOrStatus: 'Environmental commitments require primary archival verification.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
  {
    party: 'Regional parties & independents',
    documentedCommitmentsOrStatus: 'Individual manifesto and constituency pamphlet retrieval required.',
    extractionStatus: 'Full Archival Extraction Pending',
  },
];

// ── PART II: ELECTORAL CYCLES & REGIONAL PARTY REGISTRIES ────────────────────

export const ELECTORAL_CYCLES_ARCHIVE: Array<[string, string]> = [
  ['Kashmir and Jammu (Assembly)', '2002, 2008, 2014, 2024 Assembly elections (plus relevant pre-2000 policy baselines)'],
  ['Kashmir and Jammu (Parliamentary)', 'Lok Sabha parliamentary elections from 2004–2024'],
  ['Ladakh (Parliamentary)', 'Lok Sabha elections from 2004–2024'],
  ['Ladakh (Autonomous Hill Councils)', 'Leh and Kargil LAHDC elections + September 2026 8-district council expansion'],
  ['Azad Jammu & Kashmir', '2001, 2006, 2011, 2016, 2021, and 2026 Assembly elections (July 27, August 2 & August 10, 2026 phases)'],
  ['Gilgit-Baltistan', '2009, 2015, 2020, and June 7, 2026 Legislative Assembly elections'],
];

export const REGIONAL_PARTY_SCOPE_REGISTRIES: Record<
  'kashmirJammu' | 'ladakh' | 'ajk' | 'gilgitBaltistan',
  { regionLabel: string; entries: RegionalPartyScopeEntry[] }
> = {
  kashmirJammu: {
    regionLabel: 'Kashmir and Jammu',
    entries: [
      { no: '01', name: 'Jammu & Kashmir National Conference', entityType: 'Electoral Political Party' },
      { no: '02', name: 'Jammu & Kashmir Peoples Democratic Party', entityType: 'Electoral Political Party' },
      { no: '03', name: 'Bharatiya Janata Party', entityType: 'Electoral Political Party' },
      { no: '04', name: 'Indian National Congress', entityType: 'Electoral Political Party' },
      { no: '05', name: 'Jammu & Kashmir Peoples Conference', entityType: 'Electoral Political Party' },
      { no: '06', name: 'Jammu & Kashmir Apni Party', entityType: 'Electoral Political Party' },
      { no: '07', name: 'Awami Ittehad Party', entityType: 'Electoral Political Party' },
      { no: '08', name: 'Communist Party of India (Marxist)', entityType: 'Electoral Political Party' },
      { no: '09', name: 'Communist Party of India', entityType: 'Electoral Political Party' },
      { no: '10', name: 'Aam Aadmi Party', entityType: 'Electoral Political Party' },
      { no: '11', name: 'Democratic Progressive Azad Party', entityType: 'Electoral Political Party' },
      { no: '12', name: 'Jammu & Kashmir National Panthers Party and relevant factions', entityType: 'Electoral Political Party' },
      { no: '13', name: 'Awami National Conference', entityType: 'Electoral Political Party' },
      { no: '14', name: 'Bahujan Samaj Party', entityType: 'Electoral Political Party' },
      { no: '15', name: 'Other registered parties and independent representatives', entityType: 'Independent / Regional Cohort' },
    ],
  },
  ladakh: {
    regionLabel: 'Ladakh',
    entries: [
      { no: '01', name: 'Bharatiya Janata Party', entityType: 'Electoral Political Party' },
      { no: '02', name: 'Indian National Congress', entityType: 'Electoral Political Party' },
      { no: '03', name: 'Jammu & Kashmir National Conference', entityType: 'Electoral Political Party' },
      { no: '04', name: 'Jammu & Kashmir Peoples Democratic Party', entityType: 'Electoral Political Party' },
      { no: '05', name: 'Independent parliamentary candidates', entityType: 'Independent / Regional Cohort' },
      { no: '06', name: 'Independent hill council representatives', entityType: 'Independent / Regional Cohort' },
      { no: '07', name: 'Leh Apex Body (Political & Civil Society Coalition — non-electoral party)', entityType: 'Political & Civil Society Coalition' },
      { no: '08', name: 'Kargil Democratic Alliance (Political & Civil Society Coalition — non-electoral party)', entityType: 'Political & Civil Society Coalition' },
      { no: '09', name: 'Historical regional political organizations', entityType: 'Independent / Regional Cohort' },
    ],
  },
  ajk: {
    regionLabel: 'Azad Jammu & Kashmir',
    entries: [
      { no: '01', name: 'Pakistan Peoples Party', entityType: 'Electoral Political Party' },
      { no: '02', name: 'Pakistan Muslim League-Nawaz', entityType: 'Electoral Political Party' },
      { no: '03', name: 'Pakistan Tehreek-e-Insaf', entityType: 'Electoral Political Party' },
      { no: '04', name: 'All Jammu & Kashmir Muslim Conference', entityType: 'Electoral Political Party' },
      { no: '05', name: 'Jamaat-e-Islami AJ&K', entityType: 'Electoral Political Party' },
      { no: '06', name: 'Jammu Kashmir Peoples Party', entityType: 'Electoral Political Party' },
      { no: '07', name: 'Tehreek-e-Labbaik Pakistan', entityType: 'Electoral Political Party' },
      { no: '08', name: 'Other registered regional parties', entityType: 'Independent / Regional Cohort' },
      { no: '09', name: 'Independent representatives', entityType: 'Independent / Regional Cohort' },
    ],
  },
  gilgitBaltistan: {
    regionLabel: 'Gilgit-Baltistan',
    entries: [
      { no: '01', name: 'Pakistan Peoples Party', entityType: 'Electoral Political Party' },
      { no: '02', name: 'Pakistan Muslim League-Nawaz', entityType: 'Electoral Political Party' },
      { no: '03', name: 'Pakistan Tehreek-e-Insaf and associated candidates', entityType: 'Electoral Political Party' },
      { no: '04', name: 'Majlis Wahdat-e-Muslimeen', entityType: 'Electoral Political Party' },
      { no: '05', name: 'Islami Tehreek Pakistan', entityType: 'Electoral Political Party' },
      { no: '06', name: 'Jamiat Ulema-e-Islam', entityType: 'Electoral Political Party' },
      { no: '07', name: 'Jamaat-e-Islami', entityType: 'Electoral Political Party' },
      { no: '08', name: 'Regional nationalist political organizations', entityType: 'Independent / Regional Cohort' },
      { no: '09', name: 'Other registered parties and independents', entityType: 'Independent / Regional Cohort' },
    ],
  },
};

// ── PART III: 30 ENVIRONMENTAL SUBJECTS EVERY MANIFESTO SHOULD ADDRESS ───────

export const THIRTY_MANIFESTO_SUBJECTS: ManifestoSubjectBenchmark[] = [
  { no: '01', domain: 'Air pollution', expectedEvidence: 'Emission reduction targets and seasonal PM2.5 compliance plans' },
  { no: '02', domain: 'Transboundary atmospheric pollution', expectedEvidence: 'Regional scientific monitoring and air-shed cooperation' },
  { no: '03', domain: 'Drinking water', expectedEvidence: 'Potable water-quality testing and perennial source protection commitments' },
  { no: '04', domain: 'Wastewater', expectedEvidence: 'Cold-climate treatment capacity, interception ratios, and discharge standards' },
  { no: '05', domain: 'Solid waste', expectedEvidence: 'Segregated collection, recycling, leachate control, and processing targets' },
  { no: '06', domain: 'Lakes', expectedEvidence: 'Measurable bathymetric, nutrient-load, and open-water ecological restoration' },
  { no: '07', domain: 'Wetlands', expectedEvidence: 'Statutory boundary protection and river-floodplain hydrological restoration' },
  { no: '08', domain: 'Rivers', expectedEvidence: 'Mandatory minimum environmental flows and point-source pollution prevention' },
  { no: '09', domain: 'Glaciers', expectedEvidence: 'Benchmark mass-balance monitoring, black-carbon controls, and adaptation programmes' },
  { no: '10', domain: 'Snow resources', expectedEvidence: 'Snow-water-equivalent tracking and late-summer water-security planning' },
  { no: '11', domain: 'Glacial lake hazards', expectedEvidence: 'Moraine-dam bathymetry, automated sensors, and downstream GLOF early warning' },
  { no: '12', domain: 'Floodplains', expectedEvidence: '100-year floodway land-use prohibitions and room-for-the-river detention' },
  { no: '13', domain: 'Forests', expectedEvidence: 'Native forest protection, fragmentation limits, and multi-year survival verification' },
  { no: '14', domain: 'Wildlife', expectedEvidence: 'Endangered species habitat and evolutionary movement corridor protection' },
  { no: '15', domain: 'Birds', expectedEvidence: 'Central Asian Flyway winter staging hydroperiods and breeding habitat conservation' },
  { no: '16', domain: 'Biodiversity', expectedEvidence: 'Long-term endemic flora/fauna conservation and invasive-species control' },
  { no: '17', domain: 'Mining', expectedEvidence: 'Replenishment-verified extraction limits, excavator bans, and riverbed safeguards' },
  { no: '18', domain: 'Karewas and geological heritage', expectedEvidence: 'Statutory plateau conservation and earthwork extraction controls' },
  { no: '19', domain: 'Agriculture', expectedEvidence: 'Irrigated paddy protection, climate adaptation, and soil-moisture conservation' },
  { no: '20', domain: 'Horticulture', expectedEvidence: 'Altitude/water-aligned rootstock zoning and integrated pesticide management' },
  { no: '21', domain: 'Tourism', expectedEvidence: 'Quantified site-specific ecological, water, and waste carrying capacities' },
  { no: '22', domain: 'Pilgrimage', expectedEvidence: 'Respectful, science-based carrying capacity and sanitation in sacred landscapes' },
  { no: '23', domain: 'Road and tunnel construction', expectedEvidence: 'Cumulative slope-stability EIA and engineered muck-disposal safeguards' },
  { no: '24', domain: 'Hydropower', expectedEvidence: 'Continuous diurnal environmental flows, sediment flushing, and downstream equity' },
  { no: '25', domain: 'Renewable energy', expectedEvidence: 'Rangeland, agricultural, and biodiversity siting safeguards for solar/wind' },
  { no: '26', domain: 'Urban development', expectedEvidence: 'Flood-safe, seismically resilient, ecologically compatible spatial planning' },
  { no: '27', domain: 'Disaster management', expectedEvidence: 'Predictive multi-hazard risk reduction rather than post-disaster relief alone' },
  { no: '28', domain: 'Climate financing', expectedEvidence: 'Dedicated, inflation-indexed, auditable adaptation budget lines' },
  { no: '29', domain: 'Environmental research', expectedEvidence: 'Independent scientific infrastructure, open telemetry, and policy translation' },
  { no: '30', domain: 'Environmental justice', expectedEvidence: 'Meaningful public participation, frontline worker safety, and accessible remedies' },
];

// ── PART IV: FIVE-REGION REALITIES & THREE ANCHOR CASES ──────────────────────

export const FIVE_REGION_ENVIRONMENTAL_MATRIX: FiveRegionRealityRow[] = [
  {
    system: 'Atmospheric pollution',
    kashmir: 'Valley winter stagnation, kiln/biomass/vehicular plumes & regional transport',
    jammu: 'Urban vehicular, industrial estate & seasonal regional aerosol emissions',
    ladakh: 'Cold-desert mineral dust, winter heating & high-altitude transport black carbon',
    ajk: 'Muzaffarabad/Mirpur valley traffic, solid-waste burning & slope dust',
    gilgitBaltistan: 'Narrow valley inversions, diesel generators/corridors & glacial dust',
  },
  {
    system: 'Water security',
    kashmir: 'Lakes, karst springs & Jhelum watershed under sewage and baseflow stress',
    jammu: 'Chenab, Tawi & kandi-belt groundwater/surface-water pressures',
    ladakh: 'Acute snowmelt, glacier & spring dependence across arid oases',
    ajk: 'Jhelum, Neelum & Poonch river systems and hydropower diversion impacts',
    gilgitBaltistan: 'Upper Indus, Hunza, Shyok & Shigar meltwater channels and gravity canals',
  },
  {
    system: 'Cryosphere',
    kashmir: 'Retreating Lidder/Sindh glaciers & +242 m rising snowlines',
    jammu: 'Chenab/Kishtwar high-altitude icefields and periglacial hazard basins',
    ladakh: 'Zanskar, Suru & Changthang high-altitude glacier shrinkage and permafrost thaw',
    ajk: 'Upper Neelum snowfields and seasonal avalanche/melt regimes',
    gilgitBaltistan: 'Karakoram glaciers, surging tongues, ice-dammed lakes & proglacial lakes',
  },
  {
    system: 'Forests',
    kashmir: 'Temperate deodar-kail-fir forests facing edge creep and fragmentation',
    jammu: 'Subtropical chir pine and temperate Pir Panjal/Chenab forest fire & road cuts',
    ladakh: 'Sparse riparian willow/seabuckthorn and high-elevation juniper relicts',
    ajk: 'Moist/dry temperate mountain forests under fuelwood and road pressure',
    gilgitBaltistan: 'Dry temperate chilghoza-spruce-juniper valleys under high-value timber stress',
  },
  {
    system: 'Urbanization',
    kashmir: 'Srinagar floodplain infill and ribbon sprawl across all ten valley districts',
    jammu: 'Jammu metropolitan expansion across Tawi terraces and kandi ridges',
    ladakh: 'Rapid commercial hotel/concrete growth in Leh and Kargil oases',
    ajk: 'Steep-slope construction in Muzaffarabad, Rawalakot, and Mirpur basin',
    gilgitBaltistan: 'Unplanned urban growth on alluvial fans in Gilgit, Skardu, and Hunza',
  },
  {
    system: 'Tourism',
    kashmir: 'Compressed summer surges across Dal, Gulmarg, Pahalgam & Sonamarg',
    jammu: 'High-volume pilgrimage corridors and Patnitop–Bhaderwah hill resorts',
    ladakh: 'Summer visitor spikes straining fragile cold-desert water and waste systems',
    ajk: 'Neelum, Leepa & Banjosa valley domestic tourism outstripping sanitation',
    gilgitBaltistan: 'Karakoram Highway, Hunza, Skardu & expedition tourism waste/water loads',
  },
  {
    system: 'Mining',
    kashmir: 'Mechanized Jhelum-tributary cobble mining & Plio-Pleistocene Karewa excavation',
    jammu: 'Tawi/Chenab riverbed minor-mineral blocks and foothill stone/gypsum quarries',
    ladakh: 'Riverbed aggregate extraction and high-altitude strategic mineral debates',
    ajk: 'Mountain slope stone quarrying and river sand/gravel extraction',
    gilgitBaltistan: 'High-altitude gemstone, marble, and metallic mineral blasting/tailings',
  },
  {
    system: 'Natural hazards',
    kashmir: 'Compound Jhelum floods, rain-on-snow surges, landslides & seismic risk',
    jammu: 'NH-44/Chenab landslides, cloudburst flash floods, heatwaves & forest fires',
    ladakh: 'Convective cloudburst debris flows, GLOFs, and winter snow droughts',
    ajk: 'Active thrust seismicity (2005 fault zone), steep landslides & flash floods',
    gilgitBaltistan: 'Glacial Lake Outburst Floods (GLOFs), glacier surges & rockslide-dammed rivers',
  },
];

export const THREE_ANCHOR_EMPIRICAL_CASES = [
  {
    region: 'Jammu and Kashmir',
    title: 'The Lake Conservation Record',
    headlineFigure: '50 of 63 lakes',
    summary:
      'India’s Comptroller and Auditor General (CAG Report No. 4 of 2025, covering the period ending March 2022) documented untreated sewage entering 50 of 63 test-checked lakes—44 in Kashmir and 6 in Jammu—establishing an objective audit baseline against which past and 2024 manifesto conservation promises must be tested.',
    sourceLabel: 'CAG of India · Report No. 4 of 2025',
  },
  {
    region: 'Azad Jammu & Kashmir',
    title: 'Hydropower and River Ecology',
    headlineFigure: 'Neelum–Jhelum Flow',
    summary:
      'AJ&K’s 2019 official sustainable development report acknowledged severe water-flow reductions in the Neelum River through Muzaffarabad, drinking-water security concerns, and sewage dilution deficits following hydropower diversion—demonstrating why renewable-energy pledges require binding instream environmental-flow audits.',
    sourceLabel: 'AJ&K Planning & Development Dept. (2019)',
  },
  {
    region: 'Gilgit-Baltistan (+ KP Programme Area)',
    title: 'Glacier-Related Disaster Resilience',
    headlineFigure: '411 structures',
    summary:
      'Published results from the UNDP-supported GLOF-II programme (across 24 valleys in Gilgit-Baltistan and Khyber Pakhtunkhwa) report construction of 411 flood-protection structures—representing documented multi-agency implementation that cannot be credited solely to GB or any single party, while requiring independent long-term risk-reduction evaluation.',
    sourceLabel: 'UNDP Pakistan · GLOF-II Programme',
  },
] as const;

// ── PART V–VIII: CONTRADICTIONS, JURISDICTION, BUDGETS & LEGISLATURES ────────

export const DEVELOPMENT_CONSERVATION_CONTRADICTIONS_12: Array<[string, string, string]> = [
  ['Increase tourist arrivals', 'Protect fragile ecosystems', 'What is the maximum sustainable visitor capacity per valley and season?'],
  ['Construct new highways', 'Conserve forests', 'How many hectares of native canopy and wildlife corridor will be fragmented?'],
  ['Expand mining employment', 'Protect natural resources', 'What are the replenishment-verified annual boulder and clay extraction limits?'],
  ['Expand hydropower generation', 'Protect living rivers', 'What continuous seasonal and diurnal environmental flows will be legally maintained?'],
  ['Expand urban infrastructure', 'Protect wetlands', 'Which mapped floodplains and Ramsar buffers are strictly off-limits to construction?'],
  ['Increase horticultural productivity', 'Protect biodiversity', 'How will M9 summer groundwater pumping and pollinator-harming sprays be capped?'],
  ['Promote pilgrimage tourism', 'Protect sacred landscapes', 'What trail, waste, and thermal infrastructure ceilings can high-altitude zones sustain?'],
  ['Expand industrial employment', 'Reduce air & water pollution', 'What continuous stack-emission and zero-liquid-discharge limits will be enforced?'],
  ['Develop utility renewable energy', 'Protect wildlife & pastures', 'How will rangeland rights and threatened cold-desert habitats be safeguarded?'],
  ['Construct affordable housing', 'Reduce flood risk', 'Will public and private housing avoid 100-year river floodways and detention nambals?'],
  ['Increase hill road connectivity', 'Reduce landslide risks', 'Are slope-susceptibility limits and engineered muck-disposal sites incorporated before cutting?'],
  ['Expand agricultural output', 'Protect water resources', 'Is seasonal surface and aquifer irrigation demand within shrinking snowmelt limits?'],
];

export const JURISDICTION_RESPONSIBILITY_MATRIX_11: Array<[string, string]> = [
  ['Governing political party', 'Cabinet orders, departmental budgets, statutory appointments, and executive implementation'],
  ['Coalition partner', 'Assigned ministerial portfolio decisions and collective cabinet approvals'],
  ['Opposition party', 'Assembly/parliamentary questions, statutory amendments, committee scrutiny, and costed policy alternatives'],
  ['Member of legislature (MLA)', 'Constituency interventions, local area development funds, cut-motions, and voting records'],
  ['Member of parliament (MP)', 'Federal parliamentary questions, standing-committee advocacy, and central-project oversight'],
  ['Federal or central government', 'National highways, strategic tunnels, central hydropower, Forest/EIA clearances, and UT/federal statutory powers'],
  ['Regional administration', 'State/UT/regional regulatory enforcement, master plans, and public-works execution'],
  ['Hill development council', 'Land, local planning, and development decisions strictly within delegated council statutes'],
  ['Municipal government', 'Door-to-door solid waste, stormwater/sewerage networks, and municipal building compliance'],
  ['Environmental regulatory authority', 'Consent to Establish/Operate, monitoring QA/QC, inspections, and closure penalties'],
  ['Government contractors', 'Adherence to slope-angle, muck-disposal, dust-suppression, and restoration bond obligations'],
];

export const BUDGET_EXPENDITURE_CATEGORIES_11: Array<[string, string]> = [
  ['Lake conservation', 'Sanctioned, released, and audited actual expenditure (distinguishing dredging vs. catchment works)'],
  ['Sewage treatment', 'Capital construction versus annual O&M power/chemical expenditure for cold-climate STPs'],
  ['Solid waste management', 'Segregated collection fleets, material recovery, composting, and sanitary landfill lining'],
  ['Forest restoration', 'Nursery, native planting, fencing, and 3-to-5-year post-planting survival maintenance funds'],
  ['Air pollution', 'Reference-grade CAAQMS calibration, source-apportionment labs, and kiln/transit abatement grants'],
  ['Climate adaptation', 'Dedicated climate-budget allocations across agriculture, water storage, and heat/cold resilience'],
  ['Glacier research', 'Field mass-balance instrumentation, automatic weather stations, and cryospheric fellowships'],
  ['Disaster risk reduction', 'Pre-disaster floodways, GLOF early-warning telemetry, and slope bio-engineering vs. relief'],
  ['Biodiversity protection', 'Protected-area staffing, frontline ranger safety gear, and corridor restoration funds'],
  ['Environmental research', 'Independent university and public-institute monitoring grants with open-data mandates'],
  ['Environmental enforcement', 'PCC/regulatory scientific staffing, accredited laboratories, and field inspection capacity'],
];

export const EXPENDITURE_TO_OUTCOME_MATRIX_8: Array<[string, string]> = [
  ['Money spent on plantation', 'Independently verified 3- and 5-year surviving native forest area and canopy density'],
  ['Money spent on lake dredging', 'Net bathymetric storage volume permanently maintained after catchment silt control'],
  ['Money spent on sewage treatment', 'Measured reduction in BOD, ammoniacal nitrogen, and orthophosphate entering waterbodies'],
  ['Money spent on flood protection', 'Verified increase in floodway conveyance/detention and reduction in exposed households'],
  ['Money spent on air monitoring', 'QA/QC-validated station uptime and documented emission-reduction interventions'],
  ['Money spent on wetland restoration', 'Recovered seasonal hydroperiod, open-water area, and migratory waterbird carrying capacity'],
  ['Money spent on wildlife conservation', 'Intact corridor connectivity and stable/recovering threatened species populations'],
  ['Money spent on environmental research', 'Peer-reviewed open datasets and documented translation into binding regulatory rules'],
];

export const LEGISLATIVE_ACCOUNTABILITY_INDICATORS_9: string[] = [
  'Starred and unstarred environmental questions raised in legislative assemblies and national parliaments',
  'Private-member or government environmental bills introduced, co-sponsored, or supported',
  'Statutory environmental protection amendments proposed during legislative debates',
  'Substantive floor speeches addressing watershed, forest, air, cryosphere, or hazard governance',
  'Participation and attendance in legislative committees on environment, public accounts, and estimates',
  'Documented constituency-level interventions on local sewage, mining, springs, waste, or forest encroachment',
  'Formal written requests demanding independent Environmental Impact Assessments or public hearings',
  'Official ministerial and regulatory responses obtained and placed on the public record',
  'Post-question follow-up actions and independently measured field outcomes (distinguishing speech from recovery)',
];

// ── PART IX: WHEMP — WESTERN HIMALAYAN ENVIRONMENTAL MANIFESTO PROTOCOL ──────

export const WHEMP_TEN_COMPONENTS: WhempProtocolComponent[] = [
  { number: '01', component: 'Environmental baseline', requiredDisclosure: 'What is the current, independently measured condition of the target ecosystem?' },
  { number: '02', component: 'Defined problem', requiredDisclosure: 'What specific physical, chemical, or institutional driver will be addressed?' },
  { number: '03', component: 'Scientific evidence', requiredDisclosure: 'What peer-reviewed or statutory research supports the proposed intervention?' },
  { number: '04', component: 'Quantitative target', requiredDisclosure: 'What measurable biophysical improvement (not merely activity count) is promised?' },
  { number: '05', component: 'Implementation method', requiredDisclosure: 'Through what engineering, legal, and ecological mechanism will it be fulfilled?' },
  { number: '06', component: 'Financial allocation', requiredDisclosure: 'What is the estimated capital and O&M cost (in INR/PKR) and funding source?' },
  { number: '07', component: 'Responsible institution', requiredDisclosure: 'Which authority holds actual constitutional and statutory jurisdiction to deliver it?' },
  { number: '08', component: 'Implementation deadline', requiredDisclosure: 'By what specific calendar milestone within the electoral term will it be delivered?' },
  { number: '09', component: 'Independent verification', requiredDisclosure: 'How will ecological survival or pollution reduction be audited independently?' },
  { number: '10', component: 'Public reporting', requiredDisclosure: 'Where will citizens access machine-readable annual progress and expenditure records?' },
];

export const WHEMP_MEASURABLE_ALTERNATIVES_7: Array<[string, string]> = [
  ['We will protect Dal Lake.', 'Publish annual basin nutrient loads, winter STP removal efficiency, and independently measured trophic/bathymetric recovery indicators.'],
  ['We will increase forest cover.', 'Establish hectare-specific native species restoration targets and publish geo-tagged 3-year and 5-year survival audits.'],
  ['We will improve air quality.', 'Publish source-apportionment emissions baselines, seasonal PM2.5 reduction targets, and reference-grade sensor QA/QC audits.'],
  ['We will promote sustainable tourism.', 'Legally notify valley-specific visitor carrying capacities and enforce cold-climate water, sewage, and construction caps.'],
  ['We will conserve glaciers.', 'Fund continuous benchmark glacier mass-balance networks, GLOF early-warning systems, and sub-basin dry-season water adaptation plans.'],
  ['We will improve waste management.', 'Publish ward- and town-wise waste generation, segregated collection, composting/recycling, and sanitary disposal tonnages.'],
  ['We will protect biodiversity.', 'Demarcate priority wildlife corridors and Ramsar buffers with measurable habitat-connectivity and population-recovery targets.'],
];

// ── PART X: PERMANENT KEW ENVIRONMENTAL MANIFESTO & GOVERNANCE OBSERVATORY ───

export const KEW_MANIFESTO_OBSERVATORY_MODULES_12 = [
  { code: 'EMGO-01', title: 'Political Party Registry', detail: 'Verified electoral participants, coalitions, and historical party lineages across all five regions (2000–2026).' },
  { code: 'EMGO-02', title: 'Historical Manifesto Archive', detail: 'Indexed repository of original published manifestos (with PDF/text provenance notes) from 2000 to 2026.' },
  { code: 'EMGO-03', title: 'Environmental Promise Registry', detail: 'Clause-level extraction of commitments mapped across the 30 environmental policy domains.' },
  { code: 'EMGO-04', title: 'Government Tenure Registry', detail: 'Chronological record of governing parties, coalitions, central rule periods, and ministerial portfolios.' },
  { code: 'EMGO-05', title: 'Legislative Intervention Archive', detail: 'Assembly and parliamentary questions, bills, committee reports, and constituency interventions.' },
  { code: 'EMGO-06', title: 'Environmental Budget Intelligence', detail: 'Sanctioned, released, and actual expenditure in original INR and PKR values (inflation-indexed, non-double-counted).' },
  { code: 'EMGO-07', title: 'Project Implementation Registry', detail: 'Administrative orders, DPRs, tenders, and physical completion milestones linked to manifesto pledges.' },
  { code: 'EMGO-08', title: 'Satellite-Based Ground Verification', detail: 'Multi-temporal Landsat, Sentinel-1/2, and DEM change verification across promised conservation sites.' },
  { code: 'EMGO-09', title: 'Environmental Outcome Records', detail: 'Measured water, air, forest survival, river flow, and biodiversity trajectories before and after tenures.' },
  { code: 'EMGO-10', title: 'Jurisdiction & Responsibility Matrix', detail: 'Separates central/federal, UT/regional, hill-council, and municipal statutory powers fairly.' },
  { code: 'EMGO-11', title: 'Public Evidence Submissions', detail: 'Authenticated portal for scholars, citizens, and archivists to submit missing manifestos and official gazettes.' },
  { code: 'EMGO-12', title: 'Institutional Right of Response', detail: 'Permanent, unedited right-of-reply register open equally to every political party and public authority.' },
] as const;

export const PROMISE_IMPLEMENTATION_STATUSES_11: PromiseTrackingStatusSpec[] = [
  { code: 'ST-01', status: 'Documented promise', meaning: 'Original published manifesto commitment located and indexed verbatim' },
  { code: 'ST-02', status: 'Policy initiated', meaning: 'Related cabinet decision, statutory rule, or administrative order located' },
  { code: 'ST-03', status: 'Funding allocated', meaning: 'Documented budget line provisioned in annual fiscal statement' },
  { code: 'ST-04', status: 'Funding released', meaning: 'Treasury release to implementing department verified' },
  { code: 'ST-05', status: 'Implementation underway', meaning: 'Physical works or regulatory programme execution documented' },
  { code: 'ST-06', status: 'Implementation completed', meaning: 'Promised administrative or physical activity completed' },
  { code: 'ST-07', status: 'Outcome verified', meaning: 'Target ecological improvement independently measured in the field' },
  { code: 'ST-08', status: 'Deadline elapsed', meaning: 'Specified manifesto or statutory implementation deadline passed without completion' },
  { code: 'ST-09', status: 'Policy revised', meaning: 'Original commitment formally amended, superseded, or withdrawn' },
  { code: 'ST-10', status: 'Outside jurisdiction', meaning: 'Implementation legally requires central/federal or another statutory authority' },
  { code: 'ST-11', status: 'Evidence unavailable', meaning: 'Insufficient accessible public documentation to establish current status' },
];

// ── PART XI: 15 VOLUMES & 75 PROPOSED CHAPTERS ───────────────────────────────

export const MONOGRAPH_04_VOLUMES_15: Monograph04VolumeSpec[] = [
  { volumeRoman: 'VOLUME I', investigation: 'Twenty-five years of Western Himalayan electoral environmental politics', chapterCount: 5, chapterRange: 'Chapters 01–05' },
  { volumeRoman: 'VOLUME II', investigation: 'Political party and historical manifesto census', chapterCount: 5, chapterRange: 'Chapters 06–10' },
  { volumeRoman: 'VOLUME III', investigation: "Kashmir's environmental electoral commitments", chapterCount: 5, chapterRange: 'Chapters 11–15' },
  { volumeRoman: 'VOLUME IV', investigation: "Jammu's environmental electoral commitments", chapterCount: 5, chapterRange: 'Chapters 16–20' },
  { volumeRoman: 'VOLUME V', investigation: 'Ladakh: Constitutional safeguards and ecological governance', chapterCount: 5, chapterRange: 'Chapters 21–25' },
  { volumeRoman: 'VOLUME VI', investigation: 'Azad Jammu & Kashmir: Manifestos and environmental realities', chapterCount: 5, chapterRange: 'Chapters 26–30' },
  { volumeRoman: 'VOLUME VII', investigation: 'Gilgit-Baltistan: Development politics and climate vulnerability', chapterCount: 5, chapterRange: 'Chapters 31–35' },
  { volumeRoman: 'VOLUME VIII', investigation: 'Environmental commitments by scientific discipline', chapterCount: 5, chapterRange: 'Chapters 36–40' },
  { volumeRoman: 'VOLUME IX', investigation: 'Development promises and ecological limits', chapterCount: 5, chapterRange: 'Chapters 41–45' },
  { volumeRoman: 'VOLUME X', investigation: 'Environmental budgets and public expenditure', chapterCount: 5, chapterRange: 'Chapters 46–50' },
  { volumeRoman: 'VOLUME XI', investigation: 'Legislative environmental interventions', chapterCount: 5, chapterRange: 'Chapters 51–55' },
  { volumeRoman: 'VOLUME XII', investigation: 'Satellite evidence and ground-level environmental change', chapterCount: 5, chapterRange: 'Chapters 56–60' },
  { volumeRoman: 'VOLUME XIII', investigation: 'Environmental justice and governmental responsibility', chapterCount: 5, chapterRange: 'Chapters 61–65' },
  { volumeRoman: 'VOLUME XIV', investigation: 'The Western Himalayan Environmental Manifesto Protocol', chapterCount: 5, chapterRange: 'Chapters 66–70' },
  { volumeRoman: 'VOLUME XV', investigation: 'A common regional environmental governance agenda for 2027–2035', chapterCount: 5, chapterRange: 'Chapters 71–75' },
];

const RAW_75_CHAPTERS: Array<[number, string, string]> = [
  // Volume I (01–05)
  [0, 'Five-Year Elections in a Ten-Thousand-Year Landscape', 'Establishes the temporal mismatch between electoral terms and cryospheric, forest, and lacustrine recovery horizons across all five Western Himalayan regions.'],
  [0, 'How Political Manifestos Frame Nature: Resource, Obstacle or Foundation?', 'Content-coding methodology distinguishing extractive growth framing, activity-count pledges, and biophysical outcome commitments (2000–2026).'],
  [0, 'Coalitions, Constitutional Reorganizations and Interruptions of Tenure', 'Maps governing periods, coalition agreements, governor/central rule intervals, and post-2019 institutional shifts across J&K, Ladakh, AJ&K, and GB.'],
  [0, 'One Evidentiary Standard Across Five Mountain Jurisdictions', 'Defines non-partisan archival, fiscal, legislative, and remote-sensing verification rules binding every party equally.'],
  [0, 'Distinguishing Activity Promises from Ecological Outcomes', 'Demonstrates why promising sapling counts, DPRs, or cleanups differs fundamentally from promising surviving native canopy or trophic recovery.'],

  // Volume II (06–10)
  [1, 'The Complete Political Party Register (2000–2026)', 'Reconciles active, historical, renamed, faction-split, and dissolved parties alongside non-electoral coalitions (LAB, KDA) with official election rolls.'],
  [1, 'Retrieving the Primary Manifesto Archive: Provenance and Gaps', 'Documents located PDF/print manifestos, indexed-text extractions, secondary academic reconstructions, and unretrieved constituency pamphlets.'],
  [1, 'Thirty Environmental Domains: A Regional Coding Dictionary', 'Operationalizes clause-by-clause coding across all 30 policy subjects from air quality and GLOFs to Karewas and environmental justice.'],
  [1, 'Pre-2000 Historical Baselines of Agrarian, Forest and Water Politics', 'Contextualizes post-2000 manifestos against twentieth-century land reforms, forest working plans, and hydropower treaties.'],
  [1, 'Independents, Constituency Charters and Local Council Pledges', 'Examines how independent MLAs, MPs, and hill-council candidates articulate local spring, road, mining, and pasture demands.'],

  // Volume III (11–15): Kashmir
  [2, 'Kashmir Assembly Elections (2002, 2008, 2014, 2024): The Manifesto Evolution', 'Longitudinal comparison of JKNC, PDP, INC, BJP, Peoples Conference, Apni Party, CPI(M), AIP, and regional parties across four assembly cycles.'],
  [2, 'Promises to the Lakes: Dal, Wular, Anchar and the 44-Lake Audit Reality', 'Compares twenty-five years of lake-rejuvenation manifesto pledges against CAG Report No. 4 of 2025 (44 Kashmir lakes receiving untreated sewage).'],
  [2, 'Floodplain Memory After September 2014: Did Manifestos Learn Hydrology?', 'Tests whether post-2014 manifestos incorporated Jhelum room-for-the-river, wetland detention, and urban zoning reforms.'],
  [2, 'Orchards, Karewas, Saffron and Riverbed Mining in Valley Politics', 'Examines how Valley parties addressed paddy conversion, M9 irrigation, GI saffron plateau protection, and tributary boulder mining.'],
  [2, 'Parliamentary Campaigns in Srinagar, Baramulla and Anantnag (2004–2024)', 'Tracks environmental pledges and Lok Sabha interventions by Kashmir parliamentary representatives.'],

  // Volume IV (16–20): Jammu
  [3, 'Jammu Assembly & Parliamentary Manifestos (2002–2024)', 'Examines BJP, INC, JKNC, PDP, Panthers Party, DPAP, BSP, and regional commitments across Jammu’s plains, kandi belt, and mountain districts.'],
  [3, 'The Tawi, Six Audited Jammu Lakes and Kandi Water Scarcity', 'Compares urban waterfront, sewage, and kandi-pond pledges against CAG audit findings and municipal STP performance in Jammu Division.'],
  [3, 'Chenab Gorge Highways, Landslides and Hydropower Cascades', 'Evaluates manifesto promises on Ramban–Kishtwar–Doda road connectivity and power projects against slope-failure and local water realities.'],
  [3, 'Subtropical Chir Pine Fires, Pir Panjal Forests and Industrial Air-Sheds', 'Audits forest-fire prevention, Samba–Bari Brahmana–Kathua industrial pollution controls, and transhumant grazing protections.'],
  [3, 'Pilgrimage Infrastructure and Ecological Carrying Capacity in Jammu', 'Assesses how parties balanced high-volume shrine tourism growth with sanitation, waste, and Trikuta/mountain watershed management.'],

  // Volume V (21–25): Ladakh
  [4, 'From Sixth Schedule Pledges (2019–2020) to the 2026 Eight-District Council Framework', 'Chronicles electoral promises in 2019 Lok Sabha and 2020/2023 LAHDC polls alongside the September 2026 eight-district council regulation.'],
  [4, 'Electoral Parties and Civic Coalitions: BJP, INC, NC, PDP, LAB and KDA', 'Separates registered party manifestos from Leh Apex Body and Kargil Democratic Alliance constitutional-ecological charters.'],
  [4, 'Cold-Desert Water Security, Borewells and Sub-Zero Sanitation in Leh and Kargil', 'Compares campaign commitments against MoEFCC climate projections, 2026 parliamentary committee sanitation warnings, and oasis groundwater drawdown.'],
  [4, 'Mega-Solar Parks, Strategic Corridors and Changthang Pastoral Commons', 'Evaluates whether Ladakh manifestos address cumulative land footprints, pashmina rangelands, and high-altitude wildlife habitats.'],
  [4, 'Constitutional Authority Versus Enforceable Local Ecological Rules', 'Examines what land, water, tourism, and waste powers LAHDCs actually hold—and how they have used them.'],

  // Volume VI (26–30): Azad Jammu & Kashmir
  [5, 'Six AJ&K Assembly Cycles (2001, 2006, 2011, 2016, 2021, 2026)', 'Reconstructs environmental and infrastructure commitments across PPP, PML-N, PTI, Muslim Conference, JI-AJK, JKPP, and independents through August 2026.'],
  [5, 'The Neelum–Jhelum Accountability Case: Hydropower Promises and Reduced River Flows', 'Cross-examines energy-development pledges against AJ&K P&D’s 2019 sustainable development report on Muzaffarabad river-flow and drinking-water stress.'],
  [5, 'Post-2005 Seismic Slope Reconstruction, Mountain Roads and Landslide Risk', 'Evaluates whether road-expansion promises incorporated active-fault geology, bio-engineering, and watershed sediment controls.'],
  [5, 'Forestry, Mangla Catchment Sedimentation and Clean Drinking-Water Pledges', 'Compares forestry and water-supply commitments (including 2021 PU-documented pledges) against satellite canopy and spring-quality records.'],
  [5, 'Tourism Growth and Municipal Waste in Neelum, Leepa, Rawalakot and Mirpur', 'Audits municipal sanitation capacity and river pollution across AJ&K’s fastest-growing towns and tourist valleys.'],

  // Volume VII (31–35): Gilgit-Baltistan
  [6, 'Gilgit-Baltistan Assembly Cycles (2009, 2015, 2020, June 7, 2026)', 'Examines PPP, PML-N, PTI-associated candidates, MWM, Islami Tehreek, JUI, JI, and regional organizations across four assembly elections.'],
  [6, 'Climate Vulnerability and Campaign Gaps in the June 2026 Election', 'Builds upon SDPI’s June 7, 2026 analysis to audit party positions on climate budgeting, resilient infrastructure, and agricultural adaptation.'],
  [6, 'Karakoram Glaciers, GLOF-II (411 Structures) and Multi-Agency Attribution', 'Evaluates documented UNDP/GCF GLOF-II infrastructure across GB and KP while separating international/state delivery from partisan claims.'],
  [6, 'Karakoram Highway Corridors, Expedition Tourism and Hunza–Skardu Waste', 'Tests sustainable-tourism pledges against hotel proliferation, solid waste, and high-altitude expedition management.'],
  [6, 'Dry Temperate Chilghoza-Juniper Forests and Gemstone/Mineral Extraction', 'Examines political commitments and regulatory enforcement across GB’s community forests and high-mountain mining leases.'],

  // Volume VIII (36–40): By Scientific Discipline
  [7, 'Atmospheric Physics & Clean-Air Commitments Across Five Regions', 'Evaluates manifesto air-quality clauses against boundary-layer inversion physics and transboundary aerosol transport.'],
  [7, 'Hydrology, Limnology and Cryosphere in Electoral Programmes', 'Tests river, lake, wetland, spring, snow, and glacier pledges against mass-balance hydrology.'],
  [7, 'Forest Ecology, Wildlife Corridors and Avian Flyways in Party Texts', 'Assesses native-species, protected-area, and Central Asian Flyway commitments across party platforms.'],
  [7, 'Engineering Geology, Seismicity and Geomorphology in Infrastructure Pledges', 'Audits highway, tunnel, mining, and karewa pledges against Himalayan slope-stability science.'],
  [7, 'Agroecology, Horticulture and Climate-Resilient Livelihood Promises', 'Examines crop insurance, irrigation, pesticide reduction, and pastoral adaptation commitments.'],

  // Volume IX (41–45): Contradictions
  [8, 'Mass Tourism Targets Without Carrying-Capacity Ceilings', 'Quantifies water, sewage, and solid-waste loads implied by manifesto visitor-doubling promises.'],
  [8, 'Expressways, Tunnels and Forest Conservation in the Same Chapter', 'Evaluates spatial overlap between promised transport corridors and protected forest/wildlife compartments.'],
  [8, 'Riverbed Mining Employment Versus Irrigation Kuhls and Trout Habitat', 'Examines the physical contradiction between expanded mineral royalty targets and river conservation pledges.'],
  [8, 'Hydropower Megawatts Versus Living Himalayan Rivers', 'Tests run-of-the-river generation targets against downstream drinking-water, aquatic ecology, and e-flow thresholds.'],
  [8, 'Urban Housing, Industrial Estates and Floodplain/Wetland Survival', 'Analyses how manifestos reconcile affordable housing and industrial employment with 100-year floodway protection.'],

  // Volume X (46–50): Follow the Money
  [9, 'Twenty-Six Years of Environmental Budgets in INR and PKR (2000–2026)', 'Constructs inflation-indexed, non-double-counted fiscal series across J&K, Ladakh, AJ&K, and GB without cross-currency distortion.'],
  [9, 'Sanctioned, Released and Spent: The Anatomy of Unspent Conservation Funds', 'Tracks fiscal slippage between budget-speech headlines, treasury releases, and audited utilization certificates.'],
  [9, 'Capital Concrete Versus Operating Maintenance in Sewage and Waste', 'Explains why capital grants build STPs and waste plants that stall for lack of winter electricity and O&M budgets.'],
  [9, 'Independent Audit Benchmarks: CAG of India and Auditor General of Pakistan', 'Synthesizes statutory audit findings on lake conservation, forestry, flood works, and municipal sanitation across jurisdictions.'],
  [9, 'Measuring Ecological Return per Crore Spent', 'Applies the eight Expenditure-to-Outcome indicators to separate contractor turnover from ecosystem recovery.'],

  // Volume XI (51–55): Legislative Accountability
  [10, 'Environmental Questions in Assemblies and National Parliaments', 'Indexes starred/unstarred questions raised by MLAs and MPs across Srinagar/Jammu, New Delhi, Muzaffarabad, Gilgit, and Islamabad.'],
  [10, 'Environmental Legislation, Amendments and Statutory Dilutions', 'Tracks bills passed, amendments proposed, and land/forest/mining rule relaxations across governing tenures.'],
  [10, 'Standing Committees, Public Accounts Committees and Audit Follow-Up', 'Examines whether legislative committees enforced corrective action on CAG/AGP environmental audit paragraphs.'],
  [10, 'Constituency Development Funds and Local Watershed Priorities', 'Analyses how legislators allocated discretionary constituency funds between concrete drains/roads and spring/waste/forest works.'],
  [10, 'Recognizing Legislative Advocacy Without Confusing Speech for Recovery', 'Applies strict evidentiary parity so factual credit for raising issues is paired with downstream physical verification.'],

  // Volume XII (56–60): Satellite & Ground Change
  [11, 'Before and After Tenure: Multi-Temporal Forest Canopy Trajectories', 'Landsat and Sentinel-2 canopy-density comparisons segmented by administrative tenure and forest division.'],
  [11, 'Wetland, Lake Open-Water and Floodplain Infill Change Detection', 'SAR and optical surface-water and built-up encroachment series across Dal, Wular, Hokersar, Rawalakot/Mirpur, and high-altitude lakes.'],
  [11, 'Riverbed Incision, Karewa Scarps and Mountain Road-Cut Mapping', 'High-resolution optical and DEM differencing of extractive and linear-infrastructure terrain disturbance.'],
  [11, 'Air-Shed Aerosol, NO2 and Brick-Kiln Plume Satellite Time Series', 'TROPOMI, MODIS/VIIRS MAIAC, and ground-sensor parity tracking across electoral periods.'],
  [11, 'Ground Verification, Accuracy Matrices and Attribution Limits', 'Enforces confusion-matrix uncertainty reporting and separates climatic variability from policy-attributable land change.'],

  // Volume XIII (61–65): Jurisdiction & Justice
  [12, 'Who Actually Held Power? Mapping Federal, UT, Regional and Council Authority', 'Applies the 11-actor Jurisdiction Matrix so no party is blamed—or credited—for decisions outside its constitutional competence.'],
  [12, 'Opposition Promises Versus Governing Decisions: Tracking Party Consistency', 'Compares what parties demanded on opposition benches against executive orders signed in office.'],
  [12, 'Frontline Communities, Pastoralists, Boatmen and Disaster Exposure', 'Evaluates whether environmental policies protected vulnerable livelihoods or displaced compliance burdens onto the poor.'],
  [12, 'Public Hearings, Right to Information and Environmental Justice Access', 'Audits citizen access to EIAs, pollution data, judicial remedies, and multilingual public consultations across all five regions.'],
  [12, 'Institutional Right of Response: Responses from Political Parties and Agencies', 'Dedicated archival volume publishing verbatim responses, clarifications, and counter-evidence from invited parties and authorities.'],

  // Volume XIV (66–70): WHEMP Protocol
  [13, 'Why Conventional Green Slogans Fail Voters and Watersheds Alike', 'Diagnoses vague manifesto verbs ("beautify," "promote," "rejuvenate") lacking baselines, budgets, or deadlines.'],
  [13, 'The Ten Mandatory Components of WHEMP', 'Technical specification of baselines, targets, scientific evidence, INR/PKR costing, jurisdiction, deadlines, and open verification.'],
  [13, 'Rewriting Seven Classic Manifesto Promises into Auditable Commitments', 'Worked engineering and ecological templates for lakes, forests, air, tourism, glaciers, solid waste, and biodiversity.'],
  [13, 'Pre-Election Fiscal and Biophysical Feasibility Screening', 'How parties, journalists, and voters can stress-test manifesto pledges against carrying capacity and budget reality before polling day.'],
  [13, 'Operationalizing the KEW Environmental Manifesto & Governance Observatory', 'Data schema, 11 commitment-tracking statuses, and non-partisan governance rules for continuous public tracking.'],

  // Volume XV (71–75): 2027–2035 Regional Agenda
  [14, 'Shared Cryospheric and River-Basin Realities Beyond Political Divides', 'Identifies non-political scientific imperatives—glacier monitoring, GLOF warning, and flood forecasting—affecting communities across the Western Himalayas.'],
  [14, 'Minimum Ecological Floors Every Governing Coalition Should Uphold', 'Defines baseline non-regression commitments on raw sewage, floodplain infill, native forests, and slope safety across changes of government.'],
  [14, 'Financing Century-Scale Stewardship Across Five-Year Budgets', 'Designs statutory watershed restoration funds, ring-fenced eco-user fees, and multi-term O&M guarantees.'],
  [14, 'Empowering Voters, Legislators and Journalists with Open Baseline Data', 'Connects KEW’s 365-day observatories to civic literacy ahead of every assembly, council, and parliamentary election through 2035.'],
  [14, 'What Will We Preserve for the Next Hundred Years?', 'Closing synthesis uniting all fifteen volumes around intergenerational ecological trusteeship across the Western Himalayas.'],
];

function slugifyMonograph04Chapter(numStr: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${numStr}-${clean}`;
}

export const MONOGRAPH_04_CHAPTERS_75: Monograph04ChapterSpec[] = RAW_75_CHAPTERS.map(
  ([volIdx, title, scope], idx) => {
    const numStr = String(idx + 1).padStart(2, '0');
    const vol = MONOGRAPH_04_VOLUMES_15[volIdx]!;
    return {
      number: numStr,
      slug: slugifyMonograph04Chapter(numStr, title),
      volumeRoman: vol.volumeRoman,
      volumeTitle: vol.investigation,
      title,
      investigativeScope: scope,
      evidentiaryProtocol:
        'Primary manifesto archival coding (30 domains), 11-actor jurisdictional verification, inflation-indexed INR/PKR budget audit, legislative record indexing, and accuracy-assessed satellite/sensor outcome pairing with full right of response.',
    };
  }
);

export function getMonograph04ChapterBySlug(
  chapterSlug: string
): Monograph04ChapterSpec | undefined {
  return MONOGRAPH_04_CHAPTERS_75.find((c) => c.slug === chapterSlug);
}

export const REQUIRED_INVESTIGATIVE_DELIVERABLES_13: Array<[string, string]> = [
  ['Geographical regions', 'All five: Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan'],
  ['Historical period', '2000–2026 (with pre-2000 manifestos included where historically decisive)'],
  ['Political organizations', 'All verifiable electoral participants plus non-electoral coalitions clearly distinguished'],
  ['Manifestos', 'Original archived documents (noting PDF vs. indexed-text vs. secondary-source status transparently)'],
  ['Government tenures', 'Complete jurisdictional chronology separating governing, coalition, and opposition periods'],
  ['Environmental policy domains', 'All 30 standardized environmental and natural-resource subjects'],
  ['Annual budgets', 'All retrievable fiscal records in original INR and PKR values (inflation-adjusted, non-double-counted)'],
  ['Legislative records', 'Assembly and parliamentary environmental questions, bills, committees, and follow-ups'],
  ['Scientific evidence', 'Peer-reviewed earth-system research and calibrated environmental monitoring'],
  ['Geospatial evidence', 'Accuracy-assessed historical land-use, canopy, wetland, and riverbed change series'],
  ['Independent audits', 'CAG of India, Auditor General of Pakistan, regional P&D, and project-level evaluations'],
  ['Right of response', 'Every political organization and relevant statutory authority invited equally'],
  ['Future environmental protocol', 'Voluntary 10-component Western Himalayan Environmental Manifesto Protocol (WHEMP)'],
];

export const PRIMARY_CONTINUED_INVESTIGATION_SOURCES_13 = [
  { label: 'Election Commission of India', url: 'https://eci.gov.in/', purpose: 'Official election records, schedules, and political party participation (J&K and Ladakh)' },
  { label: 'J&K National Conference Manifesto 2024', url: 'https://jknc.co.in/wp-content/uploads/2024/08/Final-Meni_compressed.pdf', purpose: 'Original 2024 J&K Assembly election manifesto document' },
  { label: 'BJP J&K Manifesto 2024 (Sankalp Patra)', url: 'https://jkbjp.in/wp-content/uploads/2024/09/FINAL-JK-MANIFESTO_English.pdf', purpose: 'Original 2024 J&K Assembly manifesto containing dedicated environment & natural-resource chapter' },
  { label: 'PDP Manifesto 2024 (Peoples’ Manifesto)', url: 'https://kashmirtimes.com/wp-content/uploads/2024/08/PDP-Manifesto.pdf', purpose: 'Original 2024 J&K Assembly manifesto containing 13 numbered environmental commitments' },
  { label: 'Comptroller and Auditor General (CAG) of India', url: 'https://cag.gov.in/', purpose: 'Independent public expenditure and lake/forest conservation performance audits (including Report No. 4 of 2025)' },
  { label: 'PRS Legislative Research', url: 'https://prsindia.org/', purpose: 'Independent legislative, bill, and state/UT budget analysis' },
  { label: 'AJ&K Election Commission', url: 'https://ec.ajk.gov.pk/', purpose: 'Regional electoral rolls, party registrations, and polling records (2001–2026)' },
  { label: 'AJ&K Legislative Assembly', url: 'https://ajkassembly.gok.pk/', purpose: 'Official legislative history, assembly debates, and 2026 phased election records (July 27, Aug 2 & Aug 10)' },
  { label: 'AJ&K Planning and Development Department', url: 'https://www.pndajk.gov.pk/', purpose: 'Regional statistics and 2019 sustainable development report documenting Neelum–Jhelum flow impacts' },
  { label: 'Gilgit-Baltistan Election Commission', url: 'https://ecgb.gov.pk/', purpose: 'Regional election schedules (including June 7, 2026 general election) and candidate records' },
  { label: 'Auditor General of Pakistan', url: 'https://agp.gov.pk/', purpose: 'Independent public project, forestry, and environmental expenditure audits' },
  { label: 'UNDP Pakistan (GLOF-II Programme)', url: 'https://www.undp.org/pakistan', purpose: 'Published project documentation on 411 flood-protection structures across 24 valleys in GB & KP' },
  { label: 'Sustainable Development Policy Institute (SDPI) & Dialogue Earth', url: 'https://sdpi.org/', purpose: 'Independent policy analyses of 2026 Gilgit-Baltistan and 2024 J&K campaign commitments' },
] as const;
