// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 02 & DISPATCH 22 MASTER ARCHITECTURE
// "SELECTIVE ENVIRONMENTAL CONSCIOUSNESS: WHEN ECOLOGY BECOMES POLITICAL AND
//  ENVIRONMENTAL RESPONSIBILITY BECOMES OPTIONAL"
//
// Interdisciplinary Investigative Monograph Specification (9 Volumes · 50 Chapters)
// + Permanent KEW Companion: Western Himalayan Environmental Accountability Observatory
// Note: Surveys, longitudinal assessments, satellite change-detection series, and
//       institutional scoring frameworks are explicitly identified as proposed
//       research protocols and publication targets, not completed field surveys.
// ─────────────────────────────────────────────────────────────────────────────

export interface MonographVolumeSpec {
  volumeRoman: string;
  volumeTitle: string;
  chapterRange: string;
  thematicMandate: string;
}

export interface MonographChapterProtocol {
  number: string; // '01' .. '50'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  analyticalFocus: string;
  empiricalMethodsAndSources: string;
  researchStatus: string;
}

export interface EcologicalAccountabilitySystemDossier {
  code: string;
  system: string;
  documentedPressures: string;
  responsibleInstitutions: string;
  affectedCommunities: string;
  regulatoryProvisions: string;
  measurableIndicators: string;
  kewModuleHref: string;
}

export interface AccountabilityObservatoryRegistrySpec {
  code: string;
  name: string;
  permanentFunction: string;
  evidentiaryStandard: string;
  connectedKewSurfaceLabel: string;
  connectedKewSurfaceHref: string;
}

export const SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 02 · POLITICAL ECOLOGY & ENVIRONMENTAL ETHICS',
  monographSlug: 'monograph-02-selective-environmental-consciousness',
  dispatchNumber: '36',
  dispatchSlug: 'selective-environmental-consciousness',
  legacyIntroductoryEssaySlug:
    'who-speaks-for-the-environment-when-politics-chooses-the-landscape',
  introductoryCoverEssayTitle:
    'Who Speaks for the Environment When Politics Chooses the Landscape?',
  kicker:
    'SPECIAL INVESTIGATION · POLITICAL ECOLOGY · ENVIRONMENTAL ETHICS · UNIVERSAL ACCOUNTABILITY',
  title: 'Selective Environmental Consciousness',
  subtitle:
    'When Ecology Becomes Political and Environmental Responsibility Becomes Optional',
  extendedSubtitle:
    'A comprehensive historical, scientific, sociological and institutional investigation into environmental activism, collective behaviour, ecological destruction and universal environmental responsibility.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Political Ecology and Environmental Accountability Desk',
  geographicScope: 'Kashmir Valley · Jammu · Ladakh · Western Himalayas',
  coreHistoricalPeriod: '2008–2026',
  statusBadge:
    'Stage 08 Pre-Release Flagship Investigation & Proposed 50-Chapter Monograph Architecture',
  heroStats: [
    { value: '9', label: 'Thematic parts' },
    { value: '50', label: 'Proposed chapters' },
    { value: '2008–26', label: 'Core historical period' },
  ],
  foundationalEditorialStatement: [
    'When the government touches a mountain, we protest. When we excavate mountains to construct residential colonies, commercial establishments and private infrastructure, we frequently call it development.',
    'When an excavator appears beside a sacred lake, its image travels across the world. When untreated sewage enters dozens of lakes through thousands of household and commercial outlets, the destruction becomes almost invisible.',
    'When forestland is associated with a politically sensitive project, its ecological value becomes the subject of intense public debate. When forests disappear through incremental encroachment, commercial extraction and residential expansion, the response may be comparatively fragmented.',
    'Why does the identity of the environmental offender sometimes appear to determine the intensity of our environmental concern? Does a mountain possess a different ecological value when its destruction is undertaken by the government rather than a local community? Does a wetland become less environmentally significant when its conversion benefits our own families? Does a religious institution acquire the right to exceed ecological limits because its activities are spiritually significant? Does constitutional protection necessarily guarantee environmental protection?',
    'Political action can be a legitimate and necessary instrument of environmental protection. The problem arises when environmental principles are applied inconsistently, according to political identity, economic benefit, religious affiliation or personal convenience.',
  ],
  centralThesis:
    'The central issue is not whether environmentalism should engage with politics. It is whether environmental responsibility should survive when political attention disappears.',
  epilogueClosingQuestion:
    'If every politically controversial development project were cancelled tomorrow, would Kashmir continue defending its forests, wetlands, rivers, mountains and lakes with the same determination? Or would its environmental consciousness return to sleep?',
  evidentiaryNotice:
    'Methodological & Provenance Disclosure: Documented historical chronologies (2008 Baltal–Domail forestland order, 2023–2026 Ladakh constitutional movement, November 2026 Sheshnag track-excavation inquiry) and statutory audit figures (CAG of India Report No. 4 of 2025 covering the period ended March 2022) cite official parliamentary, audit, and published news records. The 50-chapter monograph targets, 3,000–5,000-respondent Kashmir Environmental Consciousness Survey, randomized Consistency Experiment, 2000–2026 media database, and multi-decadal satellite change-detection protocols represent proposed research architectures awaiting field execution and Stage 05 external scientific review.',
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (Dispatch 36)',
      title: 'Dispatch 36 — Selective Environmental Consciousness',
      detail:
        'Published as the closing flagship investigation of Vol. 01 / No. 01: opens with the cover essay "Who Speaks for the Environment When Politics Chooses the Landscape?" and synthesizes all eight investigative parts.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/selective-environmental-consciousness',
      ctaLabel: 'Read Dispatch 36',
    },
    {
      level: '02 · Independent 9-Volume Monograph',
      title: 'Monograph 02 — 9 Thematic Volumes & 50 Chapter Protocols',
      detail:
        'Full interdisciplinary monograph architecture covering historical movements, the 44-lake sewage audit, behavioural science, sacred geography, political economy, and research instruments.',
      href: '/himalayan-dispatch/issues/monograph-02-selective-environmental-consciousness',
      ctaLabel: 'Open Monograph 02',
    },
    {
      level: '03 · Permanent KEW Scientific Companion',
      title: 'Western Himalayan Environmental Accountability Observatory',
      detail:
        'Ten permanent evidence registries tracking environmental controversies, clearances, judicial orders, restoration promises, and measurable ecological outcomes across political cycles.',
      href: '/governance/environmental-accountability-observatory',
      ctaLabel: 'Open KEW Observatory',
    },
  ],
  masterSpecifications: [
    { component: 'Publication type', target: 'Interdisciplinary investigative monograph' },
    { component: 'Thematic parts', target: '9 volumes (Volumes I–IX)' },
    { component: 'Chapters', target: '50 proposed chapters (Chapters 01–50)' },
    { component: 'Target manuscript length', target: '50,000–70,000 words (proposed full monograph target)' },
    { component: 'Core historical cases', target: '3 comparative episodes (2008 Amarnath · 2023–2026 Ladakh · 2026 Sheshnag)' },
    { component: 'Historical period', target: '2008–2026 (with 2000–2026 media & satellite baselines)' },
    { component: 'Supplementary ecological case studies', target: '20 regional ecological systems' },
    { component: 'Proposed survey respondents', target: '3,000–5,000 stratified respondents (Kashmir, Jammu & Ladakh)' },
    { component: 'Scientific maps', target: '40–50 multi-scale watershed, land-cover & hazard plates (proposed)' },
    { component: 'Charts and analytical diagrams', target: '60–80 empirical & statistical graphics (proposed)' },
    { component: 'Institutional and legal dossiers', target: '25–40 statutory clearance, audit & judicial files (proposed)' },
    { component: 'Technical appendices', target: '15–20 survey, remote-sensing & cost-accounting protocols (proposed)' },
    { component: 'Academic and documentary references', target: '200+ peer-reviewed, parliamentary & statutory records (target)' },
    { component: 'External scientific review', target: 'Required prior to Stage 09 certification' },
    { component: 'Permanent digital companion', target: 'Western Himalayan Environmental Accountability Observatory (KEW)' },
  ],
} as const;

export const HIMALAYAN_DISPATCH_FIVE_FLAGSHIP_INVESTIGATIONS = [
  {
    dispatchLabel: 'DISPATCH 01 · HISTORICAL ENVIRONMENTAL ACCOUNTABILITY',
    foundationPillar: 'THE HISTORICAL FOUNDATION',
    title: 'The Price of Protecting Paradise',
    subtitle: 'Environmental history, stewardship, sacrifice and the legacy of conservation.',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise',
    companionLabel: 'KEW Green Martyrs & Frontline Stewardship Roll',
    companionHref: '/resources/kew-green-heroes?tab=green-martyrs',
  },
  {
    dispatchLabel: 'DISPATCH 04 · ENGINEERING AND EXPENDITURE ACCOUNTABILITY',
    foundationPillar: 'THE ENGINEERING & HYDROLOGICAL FOUNDATION',
    title: 'The Mathematics of a Dying Lake',
    subtitle:
      'Decades of Conservation, Crores of Expenditure and the Unresolved Engineering of Dal Lake',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake',
    companionLabel: 'Monograph 03 & Dal Lake Conservation Performance Observatory',
    companionHref: '/water-systems/lakes/dal-lake/conservation-performance',
  },
  {
    dispatchLabel: 'DISPATCH 11 · LIVING BOTANICAL HERITAGE & ACADEMIC ACCOUNTABILITY',
    foundationPillar: 'THE LIVING HERITAGE & CAMPUS ECOLOGY FOUNDATION',
    title: 'The Chinars in the Shadow of Concrete',
    subtitle:
      'Naseem Bagh: When an Institution of Higher Learning Expands Within a Landscape of Living Heritage',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-chinars-in-the-shadow-of-concrete',
    companionLabel: 'Monograph 14 (12 Vols · 72 Chapters) & Naseem Bagh Living Heritage Observatory',
    companionHref: '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 12 · ACADEMIC AND SCIENTIFIC ACCOUNTABILITY',
    foundationPillar: 'THE ACADEMIC & KNOWLEDGE-RETURN FOUNDATION',
    title: 'Who Are We Researching For?',
    subtitle: 'The World Knows Our Mountains. Do We?',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/who-are-we-researching-for',
    companionLabel: 'Monograph 04 & Environmental Research Observatory',
    companionHref: '/research-library/environmental-research-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 23 · HYDROPOWER, TECTONIC HAZARDS & ENERGY JUSTICE',
    foundationPillar: 'THE MOUNTAIN INFRASTRUCTURE & ENERGY JUSTICE FOUNDATION',
    title: 'The Price of Power',
    subtitle:
      'When Mountains Generate Electricity but Their People Remain in Darkness',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-power',
    companionLabel: 'Monograph 12 (20 Vols · 120 Chapters) & 16-Registry Hydropower Observatory',
    companionHref: '/earth-human-impact/hydropower-energy-justice-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 24 · MINERAL GOVERNANCE, EXTRACTIVE ECONOMICS & RESOURCE JUSTICE',
    foundationPillar: 'THE GEOLOGICAL & MINERAL OWNERSHIP FOUNDATION',
    title: 'The Wealth Beneath the Mountains',
    subtitle:
      'Gilgit-Baltistan’s Mineral Resources: Extraction, Environmental Vulnerability, External Commercial Interests and the Question of Local Ownership',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-wealth-beneath-the-mountains',
    companionLabel: 'Monograph 16 (18 Vols · 108 Chapters) & 18-Registry GB Mineral Observatory',
    companionHref: '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 25 · RIVER DIVERSION, SUBMERGENCE & ENVIRONMENTAL JUSTICE',
    foundationPillar: 'THE AZAD JAMMU & KASHMIR WATER & DISPLACEMENT FOUNDATION',
    title: 'The Rivers That No Longer Belong to Their Valleys',
    subtitle:
      'Azad Jammu & Kashmir: Hydropower, River Diversion, Submerged Civilizations and the Unresolved Question of Environmental Justice',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-rivers-that-no-longer-belong-to-their-valleys',
    companionLabel: 'Monograph 17 (12 Vols · 72 Chapters) & 10-Registry AJ&K River Observatory',
    companionHref: '/earth-human-impact/ajk-river-justice-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 26 · TECTONIC INSTABILITY, MULTI-HAZARDS & CRITICAL LIFELINES',
    foundationPillar: 'THE CASCADING DISASTER VULNERABILITY FOUNDATION',
    title: 'The Western Himalayas Are Sitting on a Time Bomb',
    subtitle:
      'The Convergence of Tectonic Instability, Climate Extremes, Ecological Destruction and Unprepared Human Settlements',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-western-himalayas-are-sitting-on-a-time-bomb',
    companionLabel: 'Monograph 13 (25 Vols · 150 Chapters) & 20-Pillar Multi-Hazard Command Center',
    companionHref: '/hazard-intelligence/multi-hazard-resilience-command-center',
  },
  {
    dispatchLabel: 'DISPATCH 30 · ATMOSPHERIC AND TRANSBOUNDARY ACCOUNTABILITY',
    foundationPillar: 'THE ATMOSPHERIC SCIENTIFIC FOUNDATION',
    title: 'The Atmosphere Has No Borders',
    subtitle: 'The Air We Breathe, the Numbers We Cannot Trust',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-atmosphere-has-no-borders',
    companionLabel: 'Monograph 01 & Atmospheric Intelligence Observatory',
    companionHref: '/risk-monitoring/air-pollution',
  },
  {
    dispatchLabel: 'DISPATCH 31 · ENVIRONMENTAL JURISPRUDENCE & LEGISLATIVE ACCOUNTABILITY',
    foundationPillar: 'THE LEGAL & REGULATORY FOUNDATION',
    title: 'When Environmental Laws Exist but the Environment Has No Defence',
    subtitle:
      'What the Laws Were Intended to Protect, Where Protection Broke Down and What Must Change',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/when-environmental-laws-exist-but-the-environment-has-no-defence',
    companionLabel: 'Monograph 07 (20 Vols · 100 Chapters) & 16-Registry Legal Observatory',
    companionHref: '/governance/legislation-enforcement-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 35 · ELECTORAL & LEGISLATIVE ACCOUNTABILITY',
    foundationPillar: 'THE ELECTORAL GOVERNANCE FOUNDATION',
    title: 'When Politics Promises Green',
    subtitle:
      'Political Manifestos, Environmental Commitments and Ground Realities Across the Western Himalayas',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/when-politics-promises-green',
    companionLabel: 'Monograph 06 & Manifesto Governance Observatory',
    companionHref: '/governance/environmental-manifesto-observatory',
  },
  {
    dispatchLabel: 'DISPATCH 36 · POLITICAL, SOCIETAL AND ETHICAL ACCOUNTABILITY',
    foundationPillar: 'THE ETHICAL AND INSTITUTIONAL FOUNDATION',
    title: 'Selective Environmental Consciousness',
    subtitle: 'When Ecology Becomes Political and Environmental Responsibility Becomes Optional',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/selective-environmental-consciousness',
    companionLabel: 'Monograph 02 & Environmental Accountability Observatory',
    companionHref: '/governance/environmental-accountability-observatory',
  },
] as const;

export const HIMALAYAN_DISPATCH_FOUR_FLAGSHIP_INVESTIGATIONS =
  HIMALAYAN_DISPATCH_FIVE_FLAGSHIP_INVESTIGATIONS;
export const HIMALAYAN_DISPATCH_THREE_FLAGSHIP_INVESTIGATIONS =
  HIMALAYAN_DISPATCH_FIVE_FLAGSHIP_INVESTIGATIONS;

export const SELECTIVE_CONSCIOUSNESS_HISTORICAL_EPISODES = [
  {
    id: 'case-2008-baltal-domail',
    period: '2008',
    title: 'When 800 Kanals of Forestland Shook an Elected Government',
    headlineFigure: '800 kanals (~40 ha)',
    headlineCaption: 'Baltal–Domail forestland diversion order · May 26, 2008',
    summary:
      'Indian parliamentary records and Jammu & Kashmir cabinet archives document that on May 26, 2008, the state government approved the diversion of approximately 800 kanals (~40 hectares) of forestland in the Baltal–Domail corridor (Sindh headwaters) for temporary pilgrimage-related facilities. Intense protests, counter-mobilizations, order revocation, coalition collapse, and a negotiated settlement reshaped regional politics within ninety-seven days—yet the long-term ecological trajectory of the corridor received far less longitudinal scientific tracking than its electoral fallout.',
    timeline: [
      {
        date: 'May 26, 2008',
        event: 'Forestland diversion approved',
        detail:
          'Government order authorizes diversion/use of ~800 kanals (~40 hectares) in Baltal–Domail for temporary pilgrimage facilities.',
      },
      {
        date: 'July 1, 2008',
        event: 'Original order revoked',
        detail:
          'Following widespread protests across Kashmir, the cabinet withdraws the May 26 land-diversion order, triggering counter-agitations in Jammu.',
      },
      {
        date: 'July 7, 2008',
        event: 'Chief Minister resigns',
        detail:
          'Chief Minister Ghulam Nabi Azad resigns ahead of a confidence vote after the ruling coalition loses its legislative majority.',
      },
      {
        date: 'August 31, 2008',
        event: 'Negotiated settlement',
        detail:
          'Formal agreement permits temporary seasonal use of the disputed land strictly during the annual pilgrimage window without permanent proprietary transfer.',
      },
    ],
    openResearchQuestions: [
      'What was the baseline canopy density and subalpine land cover in the Baltal–Domail parcel prior to May 2008?',
      'What temporary and semi-permanent camp, road, sanitation, and helipad infrastructure developed along the corridor between 2008 and 2026?',
      'Were statutory forestland restoration or Compensatory Afforestation (CAMPA) obligations established, audited, and met?',
      'How did seasonal visitor density, pony movement, and solid/liquid waste loads evolve between 2008 and 2026 (414,311 registered Yatris in 2025)?',
      'What measurable hydrochemical, benthic, and riparian changes occurred along the upper Sindh watercourses and adjacent alpine habitats?',
      'Did the 2008 mobilization produce durable improvements in regional Forest Conservation Act governance across Jammu & Kashmir?',
      'Did subsequent non-pilgrimage forest diversions of equal or larger hectare scale receive comparable civic and parliamentary scrutiny?',
    ],
  },
  {
    id: 'case-2023-2026-ladakh',
    period: '2023–2026',
    title: "When Ladakh's Environmental Concerns Became a Constitutional Movement",
    headlineFigure: '10 Dimensions',
    headlineCaption: 'Constitutional autonomy vs. enforceable ecological obligations (2023–Nov 2026)',
    summary:
      'Between 2023 and November 2026, civic coalitions led by the Leh Apex Body (LAB), Kargil Democratic Alliance (KDA), and climate advocates mobilized around ecological fragility, land and employment safeguards, democratic representation, and Sixth Schedule constitutional protections. Fair inquiry requires recognizing that local communities possess deep ecological knowledge and legitimate stakes in high-altitude water and pasture survival—while independently testing whether local political autonomy automatically guarantees sustainable groundwater, sewage, tourism, and waste governance.',
    ladakhDimensions: [
      ['Water scarcity', 'Deep commercial borewell extraction vs. snowmelt/glacier-fed alluvial recharge in Leh and Kargil'],
      ['Tourism', 'Seasonal visitor surges against cold-desert water, waste, and fragile wetland carrying capacity'],
      ['Urban expansion', 'Concrete hotel and commercial construction intensity and agricultural/oasis land conversion'],
      ['Waste', 'Municipal and trekking solid-waste generation, landfill siting, and winter containment'],
      ['Sewage', 'Sub-zero faecal-sludge and wastewater treatment performance vs. groundwater seepage'],
      ['Cryosphere', 'High-altitude glacier recession, permafrost thaw, and snow-dependent village irrigation security'],
      ['Energy', 'Winter diesel/fossil-fuel dependence alongside cumulative land footprints of utility-scale solar parks'],
      ['Biodiversity', 'Free-ranging dog predation, wetland encroachment, and Changthang/snow-leopard habitat disturbance'],
      ['Infrastructure', 'Cumulative ecological impacts of strategic highways, passes, tunnels, and transmission corridors'],
      ['Community responsibility', 'Local commercial and household compliance with groundwater, building, and pasture restrictions'],
    ] as Array<[string, string]>,
  },
  {
    id: 'case-2026-sheshnag',
    period: 'November 2026',
    title: 'Sheshnag and the Politics of a Fragile Alpine Landscape',
    headlineFigure: '3,590 m ASL',
    headlineCaption: 'Oligotrophic glacial lake · >10,000 petition signatures (Nov 25) & J&K inquiry (Nov 27, 2026)',
    summary:
      'In November 2026, footage of mechanical earthmovers operating along the high-altitude corridor near Sheshnag Lake ignited rapid regional and national debate. By November 25, 2026, a public petition opposing excavation crossed 10,000 signatures (reported by Kashmir Life); on November 27, 2026, The Indian Express reported that while the Jammu & Kashmir government and Border Roads Organisation (Project Beacon) defended the work as safety-focused post-Yatra track maintenance conducted away from the lakeshore, the government simultaneously ordered an internal inquiry into whether work departed from the approved plan. Neither viral video clips nor unverified verbal assurances can substitute for a public, document-verified alpine environmental dossier.',
    scientificDomains: [
      'Glacial and periglacial moraine geomorphology',
      'Alpine lake formation, bathymetry, and subsurface hydrological connectivity',
      'Seasonal snowmelt flushing and fine-sediment transport into oligotrophic waters',
      'Cut-slope stability, freeze-thaw weathering, and excavation-induced erosion',
      'Short-season alpine turf and cushion-plant regeneration ceilings',
      'High-elevation aquatic and terrestrial mountain biodiversity',
      'Cold-water oligotrophic nutrient loading (orthophosphate and nitrogen thresholds)',
      'Glacial lake outburst flood (GLOF) and moraine-breach downstream vulnerability',
      'Heavy machinery vibration, diesel soot (black carbon), and acoustic disturbance',
      'Seasonal pilgrimage and trekking carrying capacity',
      'Cumulative corridor infrastructure footprints from Chandanwari to Panchtarni',
      'Non-motorized, bio-engineered, and low-impact safety alternatives',
    ],
    requiredDocuments: [
      ['Original engineering alignment', 'Establish geo-referenced project boundaries relative to the 3,590 m lakeshore and moraines'],
      ['Approved track dimensions', 'Determine authorized width, gradient, and cut-slope scope vs. field execution'],
      ['Geological assessment', 'Evaluate fractured rock, talus, and moraine slope stability under freeze-thaw cycles'],
      ['Hydrological assessment', 'Evaluate surface runoff, meltwater channels, and lake inflow connectivity'],
      ['Glacial lake hazard assessment', 'Identify potential moraine destabilization, avalanche, or downstream GLOF risks'],
      ['Forest clearance, where applicable', 'Establish statutory compliance under the Van (Sanrakshan Evam Samvardhan) / Forest Conservation framework'],
      ['Environmental clearance determination', 'Establish applicable EIA Notification / NGT high-altitude legal requirements'],
      ['Excavation and spoil-management plan', 'Assess cut-and-fill balance, muck containment, and zero-siltation barriers'],
      ['Alternatives assessment', 'Evaluate less disruptive trail stabilization and emergency evacuation designs'],
      ['Carrying-capacity assessment', 'Relate corridor width and visitor throughput to biophysical alpine limits'],
      ['Compliance inspection records', 'Determine whether approved environmental safeguards were monitored on site'],
      ['Internal inquiry findings', 'Examine official inspection measurements and any reported plan deviations'],
    ] as Array<[string, string]>,
  },
] as const;

export const CAG_LAKE_SEWAGE_AUDIT_LEDGER = {
  heading: 'OFFICIAL PERFORMANCE AUDIT · CAG OF INDIA REPORT NO. 4 OF 2025',
  auditScopeSubtitle:
    'Conservation and Management of Lakes in Jammu and Kashmir (Audited Period Ending March 2022)',
  metrics: [
    { label: 'Lakes Examined (Audit Sample)', figure: '63' },
    { label: 'Receiving Untreated Sewage', figure: '50' },
    { label: 'Affected Kashmir / Jammu Lakes', figure: '44 / 6' },
  ],
  otherExaminedLakes: 13,
  methodologicalNote:
    'Scope & Temporal Caveat: The 63 lakes represent the Comptroller and Auditor General’s test-checked performance-audit sample—not a complete census of all 553+ cataloged regional waterbodies or the 697 historical waterbodies referenced since 1967 (of which 518 were reported vanished or shrunk). Findings strictly reflect the audited period ending March 2022 rather than verified post-remediation 2026 conditions, while establishing an objective statutory baseline of multi-actor municipal, commercial, and household accountability.',
  sourceCitation:
    'Source: Comptroller and Auditor General of India, Report No. 4 of the Year 2025 (Performance Audit on Conservation and Management of Lakes in Union Territory of Jammu and Kashmir, period ended March 2022).',
} as const;

export const ECOLOGICAL_ACCOUNTABILITY_REGISTER_20: EcologicalAccountabilitySystemDossier[] = [
  {
    code: 'EAR-01',
    system: 'Dal Lake',
    documentedPressures: 'Untreated/partially treated sewage, orthophosphate enrichment, shoreline construction, floating-garden infill, and peak commercial hospitality pressure',
    responsibleInstitutions: 'J&K LCMA, Srinagar Municipal Corporation (SMC), UEED, JKPCC, Tourism Directorate',
    affectedCommunities: 'Hanji houseboat/shikara households, vegetable growers, Boulevard–Hazratbal residents',
    regulatoryProvisions: 'Water Act 1974, Environment (Protection) Act 1986, J&K High Court PIL Dal directives',
    measurableIndicators: 'Basin-wise STP interception (42%–81% in 2024 LCMA census), Carlson TSI, dissolved oxygen, open-water area',
    kewModuleHref: '/water-systems/lakes/dal-lake',
  },
  {
    code: 'EAR-02',
    system: 'Wular Lake',
    documentedPressures: 'Catchment siltation, commercial willow (Salix) conversion, bund encroachment, and downstream basin sewage/agrochemical inflow',
    responsibleInstitutions: 'WUCMA, Forest Department, I&FC, Revenue Administration, JKPCC',
    affectedCommunities: 'Bandipora & Sopore artisanal fisherfolk, singhara and nadru harvesters, downstream floodplains',
    regulatoryProvisions: 'Ramsar Convention (#461), Wetlands (Conservation & Management) Rules 2017, WUCMA mandate',
    measurableIndicators: 'Open-water vs. silted marsh area (2,472.3 ha vs. 9,191.2 ha DEERS baseline), bathymetric storage (MCM), Chl-a TSI (68.2)',
    kewModuleHref: '/water-systems/lakes/wular-lake',
  },
  {
    code: 'EAR-03',
    system: 'Hokersar',
    documentedPressures: 'Flood-spill siltation without forebays, perimeter residential conversion, hydroperiod gate conflicts, and orchard pesticide drift',
    responsibleInstitutions: 'Department of Wildlife Protection, I&FC, Budgam/Srinagar Revenue & Municipal bodies',
    affectedCommunities: 'Sozeith, Zainakote & Narbal riparian settlements; Central Asian Flyway migratory waterfowl',
    regulatoryProvisions: 'Ramsar Convention (#1570), Wildlife (Protection) Act 1972, Wetlands Rules 2017',
    measurableIndicators: 'Functional marsh area (~18.75 km² in 1969 to ~13.75 km²), winter open-water depth (30–90 cm), pesticide residue levels',
    kewModuleHref: '/protected-network',
  },
  {
    code: 'EAR-04',
    system: 'Anchar Lake',
    documentedPressures: 'Raw urban domestic/hospital wastewater via Gilsar–Khushalsar, solid-waste tipping, and perimeter land reclamation',
    responsibleInstitutions: 'LCMA, SMC, UEED, JKPCC, District Administration Srinagar/Ganderbal',
    affectedCommunities: 'Soura, Buchpora & Saidapora lakeshore neighbourhoods and traditional lotus/fodder collectors',
    regulatoryProvisions: 'Water Act 1974, Wetlands Rules 2017, Municipal Solid Waste Rules 2016',
    measurableIndicators: 'BOD5, ammoniacal nitrogen, open-water mirror contraction, macrophyte/peat terrestrialization rate',
    kewModuleHref: '/water-systems',
  },
  {
    code: 'EAR-05',
    system: 'Nigeen Lake',
    documentedPressures: 'Interceptor bypasses, shoreline commercial/residential build-out, houseboat greywater, and low-flushing stagnation',
    responsibleInstitutions: 'LCMA, UEED, SMC, JKPCC, Hospitality & Houseboat Associations',
    affectedCommunities: 'Nigeen–Saida Kadal communities, heritage houseboat operators, artisanal boatmen',
    regulatoryProvisions: 'Water Act 1974, LCMA Master Plan zoning, High Court lake-buffer prohibitions',
    measurableIndicators: 'STP connection compliance (81% LCMA 2024 baseline), hypolimnetic DO, Secchi transparency, shoreline buffer integrity',
    kewModuleHref: '/water-systems',
  },
  {
    code: 'EAR-06',
    system: 'Manasbal Lake',
    documentedPressures: 'Limestone quarry scars in catchment, littoral encroachment, agricultural nutrient runoff, and visitor waste',
    responsibleInstitutions: 'Wular–Manasbal Development Authority, Geology & Mining, Ganderbal Administration, JKPCC',
    affectedCommunities: 'Safa Pora, Kondabal & Gratbal lakeshore communities, nadru cultivators, fishers',
    regulatoryProvisions: 'Water Act 1974, Wetlands Rules 2017, Minor Mineral closure & reclamation orders',
    measurableIndicators: 'Deep-water (13 m) summer hypolimnetic oxygen, karst spring inflow rate, littoral buffer encroachment',
    kewModuleHref: '/water-systems',
  },
  {
    code: 'EAR-07',
    system: 'Jhelum River',
    documentedPressures: 'Municipal sewage dewatering outfalls, riverbank solid waste, floodplain colony construction, and canal infilling',
    responsibleInstitutions: 'I&FC, SMC, Urban Local Bodies, J&K Water Resources Regulatory Authority, JKPCC',
    affectedCommunities: 'All ten Kashmir Valley districts from Verinag and Sangam through Srinagar to Sopore–Baramulla',
    regulatoryProvisions: 'J&K Water Resources (Regulation & Management) Act 2010, Water Act 1974, NGT river-pollution orders',
    measurableIndicators: 'Bankfull flood conveyance (cusecs), autumn baseflow Q90, faecal coliforms/BOD, active floodplain detention area',
    kewModuleHref: '/water-systems/rivers',
  },
  {
    code: 'EAR-08',
    system: 'Sindh River',
    documentedPressures: 'Hydropower diversion dewatering, Z-Morh/Zojila tunnel muck risk, boulder-sand mining, and Sonamarg–Baltal visitor loads',
    responsibleInstitutions: 'JKSPDC, NHIDCL/BRO, Geology & Mining, Forest & Wildlife Departments, Ganderbal Administration',
    affectedCommunities: 'Sonamarg, Gund, Kangan, Ganderbal & Shadipora riparian and coldwater-fishery communities',
    regulatoryProvisions: 'EIA Notification 2006, EMGSM 2020 sand-mining rules, statutory environmental-flow norms',
    measurableIndicators: 'Bypassed-reach diurnal e-flow compliance, suspended sediment turbidity, Schizothorax spawning habitat',
    kewModuleHref: '/water-systems/rivers',
  },
  {
    code: 'EAR-09',
    system: 'Lidder River',
    documentedPressures: 'Pahalgam resort/camp wastewater, equine organic runoff, solid waste, and lower-fan cobble extraction',
    responsibleInstitutions: 'Pahalgam Development Authority (PDA), SASB, JKPCC, Fisheries, I&FC, Anantnag Administration',
    affectedCommunities: 'Aru, Pahalgam, Mattan & Anantnag drinking-water, irrigation, and pastoral communities',
    regulatoryProvisions: 'Water Act 1974, Pahalgam Master Plan, NGT subalpine waste & sewage directives',
    measurableIndicators: 'Kolahoi/East-West Lidder ablation discharge, nitrate/orthophosphate levels, benthic macroinvertebrate EPT index',
    kewModuleHref: '/water-systems/rivers',
  },
  {
    code: 'EAR-10',
    system: 'Karewas',
    documentedPressures: 'Mechanical strip-excavation for highway fill, railway berms, urban landfilling, and brick-kiln clay extraction',
    responsibleInstitutions: 'Revenue Department, Geology & Mining, NHAI, District Collectors (Budgam, Pulwama, Shopian, Anantnag)',
    affectedCommunities: 'Pampore–Khrew GI saffron growers, almond/apple farmers, karewa-toe spring villages',
    regulatoryProvisions: 'J&K Land Revenue Act (kahcharai/saffron protections), J&K Saffron Act, Minor Mineral Rules 2016',
    measurableIndicators: 'Excavated scarp area/volume (DEM differencing), gully erosion rates, perched-aquifer soil moisture retention',
    kewModuleHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'EAR-11',
    system: 'Forests',
    documentedPressures: 'Incremental agricultural/orchard edge encroachment, linear road/transmission fragmentation, illicit timber extraction, and wildfire',
    responsibleInstitutions: 'J&K Forest Department, Forest Protection Force, MoEFCC Regional Office, Revenue Administration',
    affectedCommunities: 'Forest-fringe villages, Gujjar-Bakarwal FRA right-holders, downstream flood-vulnerable settlements',
    regulatoryProvisions: 'Indian Forest Act 1927, Forest (Conservation) Act 1980, Forest Rights Act 2006',
    measurableIndicators: 'FSI/Sentinel-2 dense-canopy change, patch-fragmentation indices, CAMPA survival audit rates',
    kewModuleHref: '/biodiversity/forest-ecosystems',
  },
  {
    code: 'EAR-12',
    system: 'Alpine Meadows',
    documentedPressures: 'Unregulated commercial camping, ATV/vehicle track scarring, pony overstocking, plastic litter, and lease creep',
    responsibleInstitutions: 'Tourism Development Authorities (Gulmarg, Sonamarg, Pahalgam, Doodhpathri, Yusmarg), Forest Dept.',
    affectedCommunities: 'Seasonal transhumant pastoralists (Gujjar, Bakarwal, Chopan), downstream snowmelt users',
    regulatoryProvisions: 'Forest Act 1927, Master Plan eco-sensitive zones, High Court meadow-construction bans',
    measurableIndicators: 'Alpine turf NDVI/fractional cover, soil bulk-density compaction, solid-waste audit recovery',
    kewModuleHref: '/sectoral-eia',
  },
  {
    code: 'EAR-13',
    system: 'Glaciers',
    documentedPressures: 'Tropospheric warming, black-carbon and mineral-dust albedo darkening, and proximal high-altitude combustion/road dust',
    responsibleInstitutions: 'MoEFCC, Department of Science & Technology, UT Climate Cells, Regional Transport & Shrine/Tourism bodies',
    affectedCommunities: 'Irrigated agriculture, drinking-water schemes, and GLOF-exposed valleys across J&K and Ladakh',
    regulatoryProvisions: 'National Mission for Sustaining the Himalayan Ecosystem (NMSHE), NGT black-carbon/glacier orders',
    measurableIndicators: 'Geodetic mass balance (m w.e./yr), end-of-ablation snowline (+242 m trend), snow black-carbon concentration',
    kewModuleHref: '/risk-monitoring/glacier-cryosphere',
  },
  {
    code: 'EAR-14',
    system: 'Groundwater',
    documentedPressures: 'Unmetered deep karewa/piedmont orchard borewells, commercial hotel pumping, and urban surface sealing reducing recharge',
    responsibleInstitutions: 'Jal Shakti (PHE), Central Ground Water Board (CGWB), J&K Water Resources Regulatory Authority',
    affectedCommunities: 'Rural drinking-water schemes, high-density orchardists, Leh/Srinagar peri-urban households',
    regulatoryProvisions: 'J&K Water Resources Act 2010, CGWA Groundwater Extraction Guidelines',
    measurableIndicators: 'Seasonal piezometric water-table depth, borewell density, stable-isotope recharge ratios',
    kewModuleHref: '/water-systems',
  },
  {
    code: 'EAR-15',
    system: 'Natural Springs',
    documentedPressures: 'Karst recharge deforestation, hillside septic contamination, karewa toe-cutting, and tributary bed incision',
    responsibleInstitutions: 'Jal Shakti, Forest Department, Rural Development (Panchayats), Geology & Mining',
    affectedCommunities: 'Hundreds of mountain and piedmont villages reliant on perennial nag springs for drinking and sacred rites',
    regulatoryProvisions: 'J&K Water Resources Act 2010, Drinking-Water Source Protection guidelines',
    measurableIndicators: 'Lean-season spring discharge (L/s), perennial-to-seasonal conversion count, nitrate/coliform contamination',
    kewModuleHref: '/water-systems',
  },
  {
    code: 'EAR-16',
    system: 'Agricultural Landscapes',
    documentedPressures: 'Irreversible conversion of irrigated paddy lands (~2,150 ha/yr) into ribbon commercial complexes and residential colonies',
    responsibleInstitutions: 'Revenue Department, Town Planning / Development Authorities, Agriculture & Horticulture Departments',
    affectedCommunities: 'Tenant farmers, regional food-grain security, peri-urban flood-detention beneficiaries',
    regulatoryProvisions: 'J&K Land Revenue Act (abi-awal paddy conversion restrictions), Master Plan land-use rules',
    measurableIndicators: 'Annual net irrigated paddy loss (ha/yr), summer percolation-recharge loss, impervious surface growth',
    kewModuleHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'EAR-17',
    system: 'Floodplains',
    documentedPressures: 'Earth-filling of urban nambals (Bemina, Lasjan, Narkara), culvert constrictions, and commercial building inside 100-year floodways',
    responsibleInstitutions: 'Srinagar Development Authority (SDA), SMC, I&FC, Revenue & Disaster Management Authorities',
    affectedCommunities: 'Downstream and low-lying residential wards, hospitals, and public schools exposed to 2014-type inundation',
    regulatoryProvisions: 'J&K Water Resources Act 2010 floodplain zoning, Disaster Management Act 2005',
    measurableIndicators: '100-year floodway encroachment area, Padshahi Bagh Flood Spill Channel conveyance, detention volume (MCM)',
    kewModuleHref: '/risk-monitoring/flood-flash-flood',
  },
  {
    code: 'EAR-18',
    system: 'Atmosphere',
    documentedPressures: 'Winter boundary-layer trapping of brick-kiln plumes, vehicular diesel emissions, open waste/biomass burning, and transboundary aerosols',
    responsibleInstitutions: 'JKPCC, Transport Department, SMC/ULBs, Industries & Commerce, CPCB',
    affectedCommunities: 'Entire Kashmir Valley bowl and Jammu urban air-sheds—especially children, elderly, and respiratory patients',
    regulatoryProvisions: 'Air (Prevention & Control of Pollution) Act 1981, National Clean Air Programme (NCAP), Zig-Zag kiln norms',
    measurableIndicators: 'Validated gravimetric PM2.5/PM10 (µg/m³), CAAQMS uptime & QA/QC parity, ventilation coefficient',
    kewModuleHref: '/risk-monitoring/air-pollution',
  },
  {
    code: 'EAR-19',
    system: 'Biodiversity',
    documentedPressures: 'Corridor severance (hangul, markhor, snow leopard), orchard pesticide pollinator collapse (-46% connectance), and river cobble loss',
    responsibleInstitutions: 'Department of Wildlife Protection, Forest Department, Fisheries, SKUAST/Extension agencies',
    affectedCommunities: 'Pastoralists, orchardists dependent on wild pollinators, coldwater fishers, global conservation heritage',
    regulatoryProvisions: 'Wildlife (Protection) Act 1972, Biological Diversity Act 2002, Eco-Sensitive Zone notifications',
    measurableIndicators: 'Hangul population & fawn-to-hind ratio, pollinator network connectance, Glyptothorax/Schizothorax occupancy',
    kewModuleHref: '/biodiversity',
  },
  {
    code: 'EAR-20',
    system: 'Mountain Slopes',
    documentedPressures: 'Over-steepened highway/local road toe-cutting (>60° in fractured phyllite/shale), unbuttressed private hillside hotels, and uncontained muck dumping',
    responsibleInstitutions: 'NHAI, BRO, PW(R&B), PMGSY, District Administrations, Town & Country Planning',
    affectedCommunities: 'Ramban–Banihal–Kishtwar–Poonch hill settlements, commuters, and river ecosystems choked by debris slides',
    regulatoryProvisions: 'EIA Notification 2006, IRC Hill Road Manual, NDMA Landslide Risk Management Guidelines',
    measurableIndicators: 'Static/seismic slope Factor of Safety, designated muck-disposal utilization rate, landslide reactivation frequency',
    kewModuleHref: '/risk-monitoring/landslide-slope',
  },
];

export const BEHAVIOURAL_MECHANISMS_10: Array<[string, string]> = [
  ['In-group bias', "Greater tolerance of ecological violations committed by one's own community, social network, or political constituency"],
  ['Confirmation bias', 'Accepting environmental evidence selectively when it reinforces pre-existing political or regional beliefs'],
  ['Motivated reasoning', 'Reinterpreting ecological risk thresholds according to personal property, commercial, or institutional interests'],
  ['Moral licensing', 'Treating visible participation in a high-profile protest or cleanup as justification for overlooking everyday household or business impacts'],
  ['Cognitive dissonance', 'Publicly endorsing conservation principles while privately participating in wetland infill, borewell extraction, or waste dumping'],
  ['Diffusion of responsibility', 'Assuming individual domestic sewage outfalls, plastic burning, or orchard sprays are negligible within a basin-wide crisis'],
  ['Availability bias', 'Responding intensely to dramatic, camera-ready excavation footage while ignoring invisible, odourless aquifer or benthic decline'],
  ['Shifting baseline syndrome', 'Each generation accepting shrunken marshes, turbid rivers, and winter haze as the natural condition of the valley'],
  ['Present bias', 'Prioritizing immediate real-estate, mineral, or seasonal tourism income over irreversible multi-decadal watershed losses'],
  ['Collective action problems', 'Expecting neighbours, rival guilds, or state agencies to bear compliance costs first while continuing personal extraction'],
];

export const SLOW_VIOLENCE_COMPARISON_6: Array<[string, string]> = [
  ['Excavation beside an alpine lake', 'Continuous untreated sewage discharge into 50 audited lakes'],
  ['Single controversial forestland diversion order', 'Incremental decadal forest-edge encroachment and canopy fragmentation'],
  ['Major public infrastructure announcement', 'Thousands of unpermitted individual floodplain and hillside construction projects'],
  ['Politically contested land allocation', 'Routine commercial conversion of ~2,150 ha/yr of irrigated paddy land'],
  ['Viral video of acute environmental damage', 'Decades-long silent contraction of pollinators, snow trout, and spring baseflows'],
  ['Publicly contested state development project', 'Unmetered private and commercial groundwater overextraction across karewas'],
];

export const RELIGIOUS_INSTITUTIONS_ACCOUNTABILITY_8: Array<[string, string]> = [
  ['Mosques', 'Ablution water conservation, greywater sanitation routing, solid-waste segregation, and Friday khutbah ecological literacy'],
  ['Khanqahs', 'Custodianship of historic spiritual-ecological ethics (Rishi-Sufi stewardship) and neighbourhood water/tree protection'],
  ['Sufi shrines', 'Peak Urs congregation sanitation, hillside parking discipline, plastic-free langar/tabarruk norms, and spring/lake protection'],
  ['Hindu temples', 'Organic offering management in springs/streams, decentralized wastewater interception, and forest-slope fire safety'],
  ['Pilgrimage organizations', 'Science-based seasonal carrying-capacity quotas, zero-bypass cold-climate sanitation, equine waste management, and non-motorized track ethics'],
  ['Buddhist monasteries', 'Cold-desert spring and glacier-stream stewardship, solar/passive winter heating, and community rangeland conservation education'],
  ['Gurdwaras', 'Zero-waste langar composting, water-recycling efficiency, renewable energy adoption, and civic tree/watershed service'],
  ['Churches', 'Institutional campus sustainability, rainwater harvesting, heritage grove conservation, and youth environmental education'],
];

export const POLITICAL_ECONOMY_SECTORS_8: Array<[string, string]> = [
  ['Real estate', 'Speculative conversion of flood-detention wetlands, kahcharai commons, and irrigated paddy lowlands into high-margin colonies and plazas'],
  ['Construction', 'Demand for unreplenished riverbed aggregate and karewa clay fill, fugitive mineral dust, and unbuttressed hill-slope cutting'],
  ['Tourism', 'Compressed summer water demand, subalpine meadow enclosure, vehicular black carbon, and unheated winter sewage overload'],
  ['Mining', 'Mechanized instream cobble/boulder extraction incising thalwegs, stranding gravity kuhls, and undermining bridge foundations'],
  ['Horticulture', 'High-density M9 summer groundwater pumping, forest-buffer creep, and intensive fungicide/pesticide drift into wetlands'],
  ['Transportation', 'Diesel freight and commuter tailpipe emissions under winter inversions alongside linear highway slope destabilization'],
  ['Hospitality', 'Unconnected or under-performing hotel/houseboat sewage systems socializing lake eutrophication costs onto public utilities'],
  ['Timber-related activities', 'Illicit compartment felling, firewood pressure, and commercial Salix monocultures displacing open-water wetland habitats'],
];

export const ACTIVISM_OUTCOME_COMPARISON_7: Array<[string, string]> = [
  ['Government order withdrawn', 'Target forest, moraine, or wetland habitat demonstrably protected on the ground'],
  ['Public demonstration organized', 'Measurable reduction in physical pollutant, sediment, or extraction pressure'],
  ['Petition signatures collected', 'Scientifically justified engineering or conservation intervention implemented'],
  ['Parliamentary or assembly debate initiated', 'Statutory inspection, STP uptime, and regulatory compliance durably improved'],
  ['Constitutional protection secured', 'Local groundwater, pastures, waste, and tourism governed within biophysical limits'],
  ['Environmental declaration adopted', 'Independent water, air, canopy, and biodiversity indicators measurably improved'],
  ['Judicial intervention obtained', 'Court-ordered remediation funded, executed on schedule, and verified by open telemetry'],
];

export const LONGITUDINAL_MOVEMENT_PARAMETERS_10: Array<[string, string]> = [
  ['Original objectives', 'Published charter statements, memorandum demands, and primary movement texts'],
  ['Environmental objectives', 'Explicit, falsifiable conservation and carrying-capacity commitments'],
  ['Political objectives', 'Documented constitutional, territorial, electoral, or administrative governance demands'],
  ['Institutional response', 'Cabinet orders, revocations, inquiry committees, and statutory notifications'],
  ['Legal outcome', 'Parliamentary records, High Court / Supreme Court / NGT orders, and settlement terms'],
  ['Ecological baseline', 'Pre-controversy satellite canopy, water-quality, moraine, and land-cover benchmarks'],
  ['Post-movement ecology', 'Subsequent multi-year physical, hydrochemical, and remote-sensing observations'],
  ['Continued engagement', 'Evidence of sustained monitoring and advocacy after media headlines subsided'],
  ['Community participation', 'Local compliance and stewardship actions extending beyond the contested project'],
  ['Long-term effectiveness', 'Context-adjusted ecological outcomes and transparently reported remaining uncertainties'],
];

export const CONSCIOUSNESS_SURVEY_PARAMETERS_8: Array<[string, string]> = [
  ['Sample size', '3,000–5,000 adult respondents (proposed protocol; not yet fielded)'],
  ['Geographic coverage', 'All 10 Kashmir Valley districts plus comparative strata across Jammu and Ladakh'],
  ['Sampling design', 'Multi-stage stratified probability sampling across elevation and watershed zones where feasible'],
  ['Settlement categories', 'Metropolitan cores, peri-urban towns, agrarian valley villages, and high-mountain settlements'],
  ['Survey methodology', 'Anonymous multilingual questionnaires (Kashmiri, Urdu, Dogri, Ladakhi, Gojri, English) and structured interviews'],
  ['Demographic coverage', 'Balanced representation across age cohorts, gender, income, education, and livelihood sectors'],
  ['Scientific analysis', 'Hierarchical multivariate regression and randomized vignette treatment-effect estimation'],
  ['Research safeguards', 'Written/oral informed consent, strict respondent anonymity, zero political profiling, and IRB ethical review'],
];

export const SATELLITE_CHANGE_DETECTION_10: Array<[string, string]> = [
  ['Forest degradation', 'Multi-decadal Landsat (1990–2026) and Sentinel-2 (10 m) canopy-density and disturbance classification'],
  ['Wetland conversion', 'Seasonal SAR (Sentinel-1) and optical land-cover trajectories across Ramsar and urban nambal boundaries'],
  ['Lake surface changes', 'NDWI/MNDWI open-water vs. floating-vegetation and silt-bar partitioning across 63+ audited lakes'],
  ['Urban expansion', 'Impervious built-up footprint expansion across Srinagar, Leh, Jammu, and district headquarters'],
  ['Karewa excavation', 'Multi-temporal DEM differencing and optical bare-earth scarp detection across Pampore–Budgam–Pulwama'],
  ['Agricultural land loss', 'Historical paddy-to-horticulture and paddy-to-concrete land-system transition matrices'],
  ['Floodplain occupation', 'Spatial overlay of post-2000 buildings and roads against 100-year hydrodynamic flood-hazard zones'],
  ['Alpine infrastructure', 'High-resolution sub-meter/Sentinel-2 track width, camp footprint, and talus disturbance mapping'],
  ['Vegetation degradation', 'Elevation-stratified NDVI/EVI growing-season anomalies across subalpine meadows and grazing routes'],
  ['Glacier change', 'Automated and manually verified glacier terminus, area, and end-of-ablation snowline time series'],
];

export const CONSISTENCY_FRAMEWORK_DOMAINS_5 = [
  {
    code: '01',
    domain: 'Scientific consistency',
    question: 'Are equivalent ecological impacts assessed using equivalent physical, chemical, and geotechnical evidence regardless of proponent?',
  },
  {
    code: '02',
    domain: 'Institutional consistency',
    question: 'Are environmental clearance rules, inspection schedules, and penalties applied irrespective of public, private, religious, or community ownership?',
  },
  {
    code: '03',
    domain: 'Social consistency',
    question: 'Do public environmental attitudes hold steady—or shift measurably—when conservation obligations impose personal or in-group costs?',
  },
  {
    code: '04',
    domain: 'Economic consistency',
    question: 'Are downstream flood, sewage, and slope externalities acknowledged transparently when activities generate private or sectoral income?',
  },
  {
    code: '05',
    domain: 'Temporal consistency',
    question: 'Does civic monitoring, institutional enforcement, and ecological restoration continue after viral or electoral attention disappears?',
  },
] as const;

export const SELECTIVE_CONSCIOUSNESS_VOLUMES_9: MonographVolumeSpec[] = [
  {
    volumeRoman: 'VOLUME I',
    volumeTitle: 'The Politics of Environmental Consciousness',
    chapterRange: 'Chapters 01–05',
    thematicMandate:
      'Establishes the conceptual, ethical, and geographical distinction between partisan mobilization and universal watershed stewardship.',
  },
  {
    volumeRoman: 'VOLUME II',
    volumeTitle: 'Three Historical Movements',
    chapterRange: 'Chapters 06–11',
    thematicMandate:
      'Reconstructs the 2008 Baltal–Domail agitation, Ladakh’s 2023–2026 constitutional movement, and the November 2026 Sheshnag controversy alongside their unresolved ecological legacies.',
  },
  {
    volumeRoman: 'VOLUME III',
    volumeTitle: 'The Destruction We Have Normalized',
    chapterRange: 'Chapters 12–20',
    thematicMandate:
      'Investigates the everyday, multi-actor degradation of 44 sewage-impacted Kashmir lakes, Dal, Wular, Hokersar, the Jhelum, Karewas, forests, paddy lands, aquifers, and mountain slopes.',
  },
  {
    volumeRoman: 'VOLUME IV',
    volumeTitle: 'The Human Mind and Environmental Morality',
    chapterRange: 'Chapters 21–26',
    thematicMandate:
      'Examines cognitive biases, collective identity, Rob Nixon’s slow ecological violence, shifting baselines, and ownership-contingent moral reasoning.',
  },
  {
    volumeRoman: 'VOLUME V',
    volumeTitle: 'Religion, Spirituality and Ecological Responsibility',
    chapterRange: 'Chapters 27–31',
    thematicMandate:
      'Applies respectful, universal ecological carrying-capacity and sanitation standards across pilgrimage corridors and all eight categories of spiritual institutions.',
  },
  {
    volumeRoman: 'VOLUME VI',
    volumeTitle: 'The Economics of Ecological Destruction',
    chapterRange: 'Chapters 32–36',
    thematicMandate:
      'Quantifies private wealth capture versus socialized public environmental losses across real estate, mining, tourism, horticulture, and structural compliance barriers.',
  },
  {
    volumeRoman: 'VOLUME VII',
    volumeTitle: 'Governance, Law and Institutional Accountability',
    chapterRange: 'Chapters 37–41',
    thematicMandate:
      'Audits why governments possessing scientific capacity fail to enforce environmental law, pre-/post-construction EIA performance, and asymmetric state responsibility.',
  },
  {
    volumeRoman: 'VOLUME VIII',
    volumeTitle: 'The Scientific Measurement of Environmental Consciousness',
    chapterRange: 'Chapters 42–46',
    thematicMandate:
      'Sets out reproducible protocols for the 3,000–5,000-respondent survey, randomized actor-blind Consistency Experiment, 2000–2026 media analysis, and satellite change detection.',
  },
  {
    volumeRoman: 'VOLUME IX',
    volumeTitle: 'From Environmental Reaction to Permanent Stewardship',
    chapterRange: 'Chapters 47–50',
    thematicMandate:
      'Documents non-partisan environmental defenders, establishes the 10-registry KEW Accountability Observatory, codifies a Universal Charter, and concludes the monograph.',
  },
];

const RAW_50_CHAPTERS: Array<{
  num: string;
  volIdx: number;
  title: string;
  focus: string;
  methods: string;
}> = [
  // VOLUME I (01–05)
  { num: '01', volIdx: 0, title: 'The Landscape We Defend and the Landscape We Destroy', focus: 'Introductory synthesis pairing the retained cover essay ("Who Speaks for the Environment When Politics Chooses the Landscape?") with empirical contrasts between contested state projects and normalized domestic degradation.', methods: 'Comparative biophysical load matrix & statutory audit synthesis.' },
  { num: '02', volIdx: 0, title: 'Environmentalism or Political Environmentalism?', focus: 'Distinguishes legitimate civic environmental protest from actor-contingent advocacy whose intensity rises or vanishes with partisan alignment.', methods: 'Political-ecology typology & comparative regional case history.' },
  { num: '03', volIdx: 0, title: 'When Ecological Threat Becomes Collective Identity', focus: 'Examines how land, forest, and water disputes intersect with constitutional autonomy, demographic anxieties, sacred geography, and regional representation.', methods: 'Historical discourse analysis across parliamentary, assembly, and press archives.' },
  { num: '04', volIdx: 0, title: 'The Geography of Environmental Responsibility', focus: 'Maps how elevation, watershed connectivity, and administrative boundaries distribute ecological costs between upland headwaters and valley sinks.', methods: 'GIS hypsometric watershed coupling across Jhelum, Chenab, and Indus basins.' },
  { num: '05', volIdx: 0, title: 'The Difference Between Political Victory and Ecological Recovery', focus: 'Demonstrates why revoking an order, winning a stay, or passing a resolution does not automatically restore canopy, dissolved oxygen, or slope stability.', methods: 'Before-and-after ecological indicator evaluation framework.' },

  // VOLUME II (06–11)
  { num: '06', volIdx: 1, title: '2008: Eight Hundred Kanals That Changed a Government', focus: 'Chronicles the May 26, 2008 Baltal–Domail 800-kanal (~40 ha) forestland diversion order, July 1 revocation, July 7 cabinet fall, and August 31 temporary-use settlement.', methods: 'Parliamentary debates, cabinet orders, and official 2008 settlement records.' },
  { num: '07', volIdx: 1, title: 'The Environmental Legacy of the Amarnath Land Agitation', focus: 'Investigates the seven unanswered scientific questions regarding pre-2008 Baltal–Domail forest cover, post-2008 corridor build-out, CAMPA obligations, and upper Sindh ecology.', methods: 'Proposed Landsat/Sentinel-2 time-series & Forest Conservation Act audit protocol.' },
  { num: '08', volIdx: 1, title: 'Ladakh: When Ecology Became a Constitutional Question', focus: 'Examines the 2023–2026 Ladakh movement (LAB, KDA, climate marches, HPC dialogues, and November 2026 developments) linking cold-desert fragility with Sixth Schedule demands.', methods: 'Documentary review of MHA HPC records, LAHDC frameworks, and public charters.' },
  { num: '09', volIdx: 1, title: 'Constitutional Protection and Ecological Responsibility', focus: 'Evaluates all ten environmental dimensions in Ladakh—water scarcity, tourism, urban sprawl, waste, sub-zero sewage, cryosphere, energy, biodiversity, infrastructure, and local compliance.', methods: 'Ten-dimension cold-desert sustainability vs. local governance matrix.' },
  { num: '10', volIdx: 1, title: 'Sheshnag: The Mountain, the Machine and the Movement', focus: 'Analyses the November 2026 Sheshnag excavation controversy (3,590 m), the >10,000-signature petition (Nov 25), BRO safety claims, and the Nov 27 J&K internal inquiry.', methods: 'Twelve-domain alpine limnological, periglacial, and 12-document clearance audit.' },
  { num: '11', volIdx: 1, title: 'Three Historical Moments, Three Unresolved Ecological Questions', focus: 'Synthesizes context-adjusted lessons across 2008, 2023–2026, and November 2026 without false historical equivalence.', methods: 'Comparative longitudinal political-ecology synthesis.' },

  // VOLUME III (12–20)
  { num: '12', volIdx: 2, title: 'Forty-Four Lakes Receiving Untreated Sewage', focus: 'Dissects CAG of India Report No. 4 of 2025 (63 audited lakes; 50 receiving untreated sewage—44 in Kashmir, 6 in Jammu; STP nitrogen-removal deficits) with strict sample/period precision.', methods: 'CAG Performance Audit (period ended March 2022) & UEED/JKPCC STP asset review.' },
  { num: '13', volIdx: 2, title: 'Dal Lake and the Economics of Ecological Decline', focus: 'Traces nutrient loading, shoreline commercialization, basin-wise houseboat/hotel interception gaps (42%–81%), and multi-decade cleanup expenditures.', methods: 'LCMA 2024 GIS census, Sultan et al. (2024) hydrochemistry, and fiscal audit records.' },
  { num: '14', volIdx: 2, title: 'Wular, Hokersar and the Disappearing Wetlands', focus: 'Examines sediment aggradation, Salix conversion, perimeter housing encroachment, and pesticide drift across Kashmir’s Ramsar flood-detention lungs.', methods: 'ISRO NWIA, DEERS LISS-III, Alam et al. (2023), Mushtaq et al. (2022), Irshad et al. (2026).' },
  { num: '15', volIdx: 2, title: "The River Jhelum: A Civilization's Neglected Artery", focus: 'Investigates urban canal infilling (Nallah Mar), municipal dewatering outfalls, riverside solid waste, and compound flood amplification.', methods: 'Romshoo et al. (2018), Yousuf & Romshoo (2022), and KEW 28-sub-basin registry.' },
  { num: '16', volIdx: 2, title: 'The Karewas We Will Never Recover', focus: 'Documents irreversible mechanical excavation of four-million-year Plio-Pleistocene lacustrine tablelands for highway embankments, ring roads, and brick kilns.', methods: 'Burbank & Johnson (1982) stratigraphy, DEM scarp mapping, and Saffron/Revenue law audit.' },
  { num: '17', volIdx: 2, title: 'Forests, Encroachment and the Fragmentation of Nature', focus: 'Evaluates incremental orchard/residential forest-edge creep alongside linear infrastructure clearances and wildlife corridor severance.', methods: 'FSI State of Forest series, Sentinel-2 fragmentation metrics, and FRA records.' },
  { num: '18', volIdx: 2, title: 'When Agricultural Landscapes Become Real Estate', focus: 'Quantifies the conversion of ~2,150 ha/yr of valley-floor irrigated paddy recharge basins into commercial ribbons and housing colonies.', methods: 'Land-revenue abi-awal conversion filings & multi-temporal land-use classification.' },
  { num: '19', volIdx: 2, title: 'The Invisible Destruction of Groundwater and Springs', focus: 'Examines unmetered karewa borewell proliferation, incised gravel riverbeds, and contamination/drying of perennial nag springs.', methods: 'Jeelani (2008, 2021), Arora et al. (2026), and KEW springshed vulnerability inventory.' },
  { num: '20', volIdx: 2, title: 'The Mountains We Destroy for Our Own Convenience', focus: 'Audits unregulated private hillside cutting, local stone quarrying, and peri-urban slope destabilization across Kashmir and Jammu.', methods: 'Jasrotia et al. (2026) landslide susceptibility & municipal building-permission review.' },

  // VOLUME IV (21–26)
  { num: '21', volIdx: 3, title: 'The Psychology of Selective Outrage', focus: 'Tests ten established cognitive and behavioural mechanisms—from in-group bias and moral licensing to availability bias—in regional environmental controversies.', methods: 'Behavioural decision science & environmental psychology conceptual synthesis.' },
  { num: '22', volIdx: 3, title: 'When Environmental Responsibility Becomes Personal', focus: 'Examines cognitive dissonance and diffusion of responsibility when conservation rules touch household sewage, private land, or family businesses.', methods: 'Household compliance vignette design & behavioural economics.' },
  { num: '23', volIdx: 3, title: 'Collective Identity and Environmental Judgment', focus: 'Investigates how group belonging shapes evidentiary trust without attributing unverified psychological motives to specific protesters or communities.', methods: 'Social-identity theory & randomized actor-condition experimental protocol.' },
  { num: '24', volIdx: 3, title: 'Spectacular Destruction and Invisible Ecological Violence', focus: 'Applies Rob Nixon’s slow-violence framework (2011) and environmental-conflict scholarship to contrast viral machinery footage with chronic sewage and aquifer attrition.', methods: 'Comparative hazard-visibility vs. cumulative-ecological-impact assessment.' },
  { num: '25', volIdx: 3, title: 'The Environmental Consequences of Normalization', focus: 'Traces shifting baseline syndrome across generations who inherit contracted marshes, concrete river walls, and winter particulate haze as ordinary life.', methods: 'Inter-generational archival and ecological baseline comparison.' },
  { num: '26', volIdx: 3, title: 'When Economic Interests Override Environmental Principles', focus: 'Analyses present bias and collective-action traps across land markets, mineral syndicates, and seasonal hospitality peaks.', methods: 'Institutional political-economy and game-theoretic commons analysis.' },

  // VOLUME V (27–31)
  { num: '27', volIdx: 4, title: 'Sacred Landscapes and Ecological Limits', focus: 'Establishes why spiritual reverence across Hindu, Muslim, Sufi, Buddhist, Sikh, and Christian traditions strengthens—never suspends—biophysical limits.', methods: 'Comparative sacred-geography & cold-water/alpine carrying-capacity synthesis.' },
  { num: '28', volIdx: 4, title: 'When Pilgrimage Becomes an Infrastructure Question', focus: 'Balances legitimate pilgrim safety, elderly/disabled access, and emergency medical evacuation against periglacial slope, waste, and cryospheric ceilings.', methods: 'SASB, Vaishno Devi, and NGT alpine corridor sanitation & access case review.' },
  { num: '29', volIdx: 4, title: 'Mosques, Khanqahs, Shrines, Temples, Monasteries, Gurdwaras and Churches', focus: 'Defines universal institutional responsibilities across all eight spiritual institution categories for water efficiency, sanitation, waste, and surrounding terrain.', methods: 'Universal non-sectarian institutional environmental audit protocol.' },
  { num: '30', volIdx: 4, title: 'Religious Leadership and Environmental Education', focus: 'Explores how sermons, shrine committees, monastic councils, and faith trusts can advance spring restoration, plastic elimination, and tree protection.', methods: 'Civic-faith stewardship case documentation & community education framework.' },
  { num: '31', volIdx: 4, title: 'Reverence for Creation and Responsibility Towards Creation', focus: 'Examines how Kashmir’s Nund Rishi / Lal Ded heritage and wider Himalayan spiritual traditions can translate devotion into measurable watershed protection.', methods: 'Cultural-ecological textual synthesis & measurable stewardship indicators.' },

  // VOLUME VI (32–36)
  { num: '32', volIdx: 5, title: 'The Financial Incentives Behind Environmental Degradation', focus: 'Maps rent-seeking and profit margins across eight landscape-altering sectors from wetland real estate to agrochemical monocultures.', methods: 'Sectoral margin vs. abatement-cost political-economy analysis.' },
  { num: '33', volIdx: 5, title: 'Privatized Profits and Public Environmental Losses', focus: 'Develops an ecological cost-accounting methodology separating private commercial revenue from socialized flood, health, and STP remediation liabilities.', methods: 'Environmental externality & public-expenditure accounting protocol.' },
  { num: '34', volIdx: 5, title: 'Tourism, Carrying Capacity and Commercial Pressure', focus: 'Audits seasonal visitor compression (1.11M Kashmir visits in 2025; 3.14M in 2024), sub-zero STP failure, and meadow/houseboat pressures while safeguarding worker livelihoods.', methods: 'J&K Economic Survey 2025–26, LCMA 2024 census, and destination carrying-capacity models.' },
  { num: '35', volIdx: 5, title: 'Construction, Mining and the Transformation of Landscapes', focus: 'Traces the hybrid state-corporate-local supply chain linking highway/urban concrete demand to ~118 km of disturbed gravel riverbeds and karewa scarps.', methods: 'Jafri et al. (2025), EMGSM 2020 compliance rules, and KEW EHII corridor baseline.' },
  { num: '36', volIdx: 5, title: 'The Cost of Environmental Responsibility', focus: 'Distinguishes deliberate commercial profiteering from households and micro-enterprises lacking affordable municipal sewerage, waste collection, clean winter heating, or lawful housing.', methods: 'Household affordability, municipal service-coverage, and just-transition equity audit.' },

  // VOLUME VII (37–41)
  { num: '37', volIdx: 6, title: 'When Governments Know but Fail to Act', focus: 'Tests nine institutional failure hypotheses—scientific gaps, authority limits, silo fragmentation, selective enforcement, fiscal scarcity, conflicting mandates, weak EIAs, public exclusion, and post-approval neglect.', methods: 'CAG audits, assembly disclosures, JKPCC/LCMA/WUCMA staffing & compliance records.' },
  { num: '38', volIdx: 6, title: 'Environmental Assessments and Their Actual Influence', focus: 'Reviews EIA/EC practices across nine sectors (high-altitude works, roads/tunnels, tourism, urban sprawl, mining, hydropower, industry, colonies, wetlands).', methods: 'PARIVESH clearance dossier review, sub-100 km highway slicing audit, and post-EC monitoring.' },
  { num: '39', volIdx: 6, title: 'The Distance Between Environmental Law and Enforcement', focus: 'Measures the implementation gap between statutory mandates (EPA 1986, Water Act 1974, Wetlands Rules 2017, EMGSM 2020) and field compliance.', methods: 'NGT/High Court order-to-closure tracking & statutory penalty records.' },
  { num: '40', volIdx: 6, title: 'Scientific Institutions and Their Public Responsibility', focus: 'Examines how universities, research laboratories, and technical agencies can maintain public independence when appraising state or commercial projects.', methods: 'Blind-sponsor peer-appraisal firewall design (PNEEAC Article VI).' },
  { num: '41', volIdx: 6, title: 'Who Monitors the Environmental Regulator?', focus: 'Explains why government responsibility exceeds individual conduct under constitutional Public Trust Doctrine—and designs transparent regulator-audit mechanisms.', methods: 'Article 21 public-trust jurisprudence & open compliance-ledger design.' },

  // VOLUME VIII (42–46)
  { num: '42', volIdx: 7, title: 'Measuring Environmental Attitudes Without Political Assumptions', focus: 'Establishes neutral psychometric, linguistic, and ethical safeguards so sociological research tests—rather than presupposes—selective consciousness.', methods: 'Double-blind survey wording validation & IRB ethics protocol.' },
  { num: '43', volIdx: 7, title: 'The Kashmir Environmental Consciousness Survey', focus: 'Full sampling, questionnaire, and multivariate statistical design for the proposed 3,000–5,000-respondent study across Kashmir, Jammu, and Ladakh.', methods: 'Stratified probability sampling & hierarchical regression protocol (proposed).' },
  { num: '44', volIdx: 7, title: 'The Environmental Consistency Experiment', focus: 'Randomized vignette experiment holding ecological harm constant while varying responsible actor identity across five institutional/social categories.', methods: 'Between-subjects randomized survey experiment & interactive public demonstration.' },
  { num: '45', volIdx: 7, title: 'Mapping Environmental Destruction from Space', focus: 'Ten-process multi-sensor remote-sensing protocol (Landsat, Sentinel-1/2, DEM differencing) with mandatory field ground-truthing and confusion-matrix uncertainty bounds.', methods: '2000–2026 Earth-observation change-detection & kappa/error-matrix protocol.' },
  { num: '46', volIdx: 7, title: 'Measuring the Long-Term Outcomes of Environmental Activism', focus: 'Integrates the 2000–2026 environmental media coverage database with longitudinal ecological outcome tracking across campaigns and litigations.', methods: 'Event-severity-controlled media panel model & post-campaign biophysical audit.' },

  // VOLUME IX (47–50)
  { num: '47', volIdx: 8, title: 'Recognizing the People Who Consistently Protect Nature', focus: 'Establishes an evidence-verified stewardship archive recognizing sustained RTI/NGT advocates (including Dr. Raja Muzaffar Bhat and civic litigants), scientists, rangers, journalists, and village custodians based on documented outcomes.', methods: 'Verified judicial filings, RTI disclosures, scientific publications, and field restoration audits.' },
  { num: '48', volIdx: 8, title: 'The Western Himalayan Environmental Accountability Observatory', focus: 'Operational blueprint for KEW’s ten permanent registries tracking controversies, damage, clearances, judicial orders, commitments, restoration, and outcomes.', methods: 'Open-provenance relational observatory architecture & non-surveillance charter.' },
  { num: '49', volIdx: 8, title: 'A Universal Environmental Responsibility Charter', focus: 'Synthesizes the five-domain Consistency Framework and seven-article Blind-Sponsor Assessment Charter (PNEEAC) binding state, business, faith, community, and KEW alike.', methods: 'Statutory EPA Section 3(2)(v) template & voluntary institutional covenant.' },
  { num: '50', volIdx: 8, title: 'Nature Does Not Have a Political Party', focus: 'Closing philosophical and empirical summation confronting whether Himalayan environmental consciousness will endure when political controversy subsides.', methods: 'Integrative synthesis across history, earth science, ethics, and public trust.' },
];

function slugifyChapterTitle(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const SELECTIVE_CONSCIOUSNESS_CHAPTERS_50: MonographChapterProtocol[] = RAW_50_CHAPTERS.map(
  (row) => {
    const vol = SELECTIVE_CONSCIOUSNESS_VOLUMES_9[row.volIdx]!;
    return {
      number: row.num,
      slug: slugifyChapterTitle(row.num, row.title),
      volumeRoman: vol.volumeRoman,
      volumeTitle: vol.volumeTitle,
      title: row.title,
      analyticalFocus: row.focus,
      empiricalMethodsAndSources: row.methods,
      researchStatus:
        'Proposed Monograph Chapter Protocol · Documentary & Scoping Baseline Established (Full Survey / Satellite Field Execution Pending)',
    };
  }
);

export function getMonograph02ChapterBySlug(
  chapterSlug: string
): MonographChapterProtocol | undefined {
  return SELECTIVE_CONSCIOUSNESS_CHAPTERS_50.find((c) => c.slug === chapterSlug);
}

export const WESTERN_HIMALAYAN_ACCOUNTABILITY_OBSERVATORY_REGISTRIES_10: AccountabilityObservatoryRegistrySpec[] = [
  {
    code: 'WHEAO-01',
    name: 'Environmental Controversy Registry',
    permanentFunction:
      'Documents public environmental disputes from initial emergence through engineering filings, stakeholder positions, and multi-year post-controversy ecological states.',
    evidentiaryStandard:
      'Geo-referenced parcel coordinates, official government/proponent statements, civic petitions, and baseline-to-outcome timeline.',
    connectedKewSurfaceLabel: 'Environmental Investigations Archive',
    connectedKewSurfaceHref: '/environmental-investigations',
  },
  {
    code: 'WHEAO-02',
    name: 'Ecological Damage Registry',
    permanentFunction:
      'Records independently verified physical, chemical, and biological degradation across lakes, rivers, wetlands, karewas, forests, and slopes.',
    evidentiaryStandard:
      'Calibrated sensor logs, CAG/JKPCC statutory audits, peer-reviewed studies, and accuracy-assessed satellite change polygons.',
    connectedKewSurfaceLabel: 'Change Detection Observatory',
    connectedKewSurfaceHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'WHEAO-03',
    name: 'Environmental Clearance Registry',
    permanentFunction:
      'Tracks publicly accessible PARIVESH/SEIAA/Forest Conservation assessments, stipulated safeguard conditions, and compliance inspection filings.',
    evidentiaryStandard:
      'Official EC/FC letters, project alignment maps, muck-disposal plans, and six-monthly compliance disclosures.',
    connectedKewSurfaceLabel: 'Sectoral EIA Intelligence',
    connectedKewSurfaceHref: '/sectoral-eia',
  },
  {
    code: 'WHEAO-04',
    name: 'Judicial Intervention Registry',
    permanentFunction:
      'Monitors Supreme Court, J&K and Ladakh High Court, and National Green Tribunal environmental orders, committee inspections, and execution status.',
    evidentiaryStandard:
      'Verified docket numbers, verbatim operative directions, statutory deadlines, and respondent compliance affidavits.',
    connectedKewSurfaceLabel: 'KEW Environmental PIL Portal',
    connectedKewSurfaceHref: '/resources/environmental-pil',
  },
  {
    code: 'WHEAO-05',
    name: 'Institutional Commitment Registry',
    permanentFunction:
      'Tracks public environmental promises, budgetary allocations, action plans, and conference/civic declarations against scheduled milestones.',
    evidentiaryStandard:
      'Dated official announcements, DPR targets, treasury releases, and milestone completion verification.',
    connectedKewSurfaceLabel: 'Institutional Governance Portal',
    connectedKewSurfaceHref: '/governance',
  },
  {
    code: 'WHEAO-06',
    name: 'Environmental Restoration Registry',
    permanentFunction:
      'Monitors lake dredging, STP upgrades, CAMPA afforestation, wetland weir retrofits, and slope bio-engineering for multi-year ecological survival.',
    evidentiaryStandard:
      '3-to-10-year post-project survival, bathymetric storage recovery, and effluent nutrient-removal audits rather than expenditure tallies.',
    connectedKewSurfaceLabel: 'Water Systems & Lake Registry',
    connectedKewSurfaceHref: '/water-systems',
  },
  {
    code: 'WHEAO-07',
    name: 'Community Stewardship Registry',
    permanentFunction:
      'Documents verified non-partisan conservation work by scientists, RTI/NGT advocates, forest rangers, religious trusts, panchayats, and citizens.',
    evidentiaryStandard:
      'Documented filings, field restoration records, and measurable local outcomes—never political affiliation or social-media popularity.',
    connectedKewSurfaceLabel: 'KEW Green Heroes & Martyrs',
    connectedKewSurfaceHref: '/resources/kew-green-heroes',
  },
  {
    code: 'WHEAO-08',
    name: 'Environmental Movement Archive',
    permanentFunction:
      'Preserves primary historical charters, parliamentary records, official responses, and stated ecological vs. political goals of regional movements.',
    evidentiaryStandard:
      'Primary archival documents with context-adjusted historical annotations separating stated goals from measured ecosystem trajectories.',
    connectedKewSurfaceLabel: 'Himalayan Dispatch Edition Archive',
    connectedKewSurfaceHref: '/himalayan-dispatch/archive',
  },
  {
    code: 'WHEAO-09',
    name: 'Ecological Outcome Tracker',
    permanentFunction:
      'Compares statutory clearances, court directives, and movement settlements directly against longitudinal water, air, canopy, and species time series.',
    evidentiaryStandard:
      'Continuous physical indicator pairings (DO, BOD, PM2.5, NDVI, thalweg elevation, open-water ha) with explicit uncertainty bounds.',
    connectedKewSurfaceLabel: 'Risk & Environmental Monitoring Hub',
    connectedKewSurfaceHref: '/risk-monitoring/environmental-monitoring',
  },
  {
    code: 'WHEAO-10',
    name: 'Public Evidence Repository',
    permanentFunction:
      'Preserves open-access scientific reports, audit tables, satellite methodologies, and right-of-reply submissions for public and scholarly scrutiny.',
    evidentiaryStandard:
      'DOI/checksum-verified documents, reproducible CSV datasets, and open corrections/right-of-reply governance.',
    connectedKewSurfaceLabel: 'KEW Open Data & Evidence Hub',
    connectedKewSurfaceHref: '/open-data',
  },
];
