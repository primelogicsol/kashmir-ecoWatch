// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — SPECIAL SCIENTIFIC INVESTIGATION · MONOGRAPH 01
// "THE ATMOSPHERE HAS NO BORDERS: THE AIR WE BREATHE, THE NUMBERS WE CANNOT TRUST"
// Complete 12-Volume, 60-Chapter, 20-Appendix Scientific Research Framework
// Kashmir EcoWatch | Western Himalayan Environmental Intelligence
//
// Evidentiary Status: Ongoing Scientific Investigation & Research Protocol.
// Original November 2026 WRF-Chem/HYSPLIT modelling, chemical source attribution,
// station metrological co-location, and exposure assessments remain in progress.
// Zero unverified country-by-country source percentages are asserted prior to
// completion of observational validation and external specialist peer review.
// ─────────────────────────────────────────────────────────────────────────────

export interface MonographHeroMetric {
  value: string;
  label: string;
  note: string;
}

export interface MonographPublicationLevel {
  levelCode: string;
  tierLabel: string;
  title: string;
  routePath: string;
  summary: string;
}

export interface Monograph01Identity {
  editionSlug: 'monograph-01-atmosphere-without-borders';
  dispatchSlug: 'the-atmosphere-has-no-borders';
  dispatchNumber: '17';
  dispatchAliasPath: '/himalayan-dispatch/dispatches/the-atmosphere-has-no-borders';
  canonicalDispatchPath: '/himalayan-dispatch/issues/volume-01-issue-01/the-atmosphere-has-no-borders';
  canonicalMonographPath: '/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders';
  kewCompanionPath: '/risk-monitoring/air-pollution';
  datasetEndpointPath: '/api/himalayan-dispatch/datasets/atmosphere-monograph-framework';
  companionGovernanceDispatchSlug: 'six-years-of-warnings-and-kashmir-still-cannot-breathe';
  companionGovernanceDispatchPath: '/himalayan-dispatch/issues/volume-01-issue-01/six-years-of-warnings-and-kashmir-still-cannot-breathe';
  kicker: string;
  title: string;
  subtitle: string;
  extendedSubtitle: string;
  proposedByline: string;
  bylineStatusNote: string;
  geographicScope: string;
  classificationBadges: string[];
  heroMetrics: MonographHeroMetric[];
  publicationHierarchy: MonographPublicationLevel[];
  foundationalStatement: string[];
  closingPrinciple: string;
  epilogueTitle: string;
  epilogueStatement: string[];
  researchStatusDisclosure: string;
}

export interface MonographSevenQuestionRow {
  number: number;
  investigation:
    | 'Climatology'
    | 'Atmospheric physics'
    | 'Local emissions'
    | 'Transboundary transport'
    | 'Atmospheric chemistry'
    | 'Measurement integrity'
    | 'Environmental governance';
  fundamentalQuestion: string;
  targetVolumes: string;
  targetChapterRange: string;
  analyticalFocus: string;
}

export interface MonographEquationSymbol {
  symbol: string;
  label: string;
  definition: string;
  unit: string;
}

export interface MonographEquationsSpec {
  sourceAccounting: {
    id: 'source-accounting';
    title: string;
    formulaText: string;
    latex: string;
    symbols: MonographEquationSymbol[];
    caveat: string;
    relatedChapterSlugs: string[];
  };
  ventilationCoefficient: {
    id: 'ventilation-coefficient';
    title: string;
    formulaText: string;
    latex: string;
    defaultHmixMeters: number;
    defaultWindMps: number;
    defaultVcM2ps: number;
    unit: string;
    symbols: MonographEquationSymbol[];
    caveat: string;
    relatedChapterSlugs: string[];
  };
  aqiSubIndex: {
    id: 'aqi-sub-index';
    title: string;
    formulaText: string;
    latex: string;
    symbols: MonographEquationSymbol[];
    cpcbVsUsEpaComparison: string;
    srinagarNov2026CaseStudy: {
      episodeWindow: string;
      documentedPressSource: string;
      reportedPrivatePlatformName: string;
      reportedPrivatePlatformAqi: number;
      reportedOfficialJkpccApproxAqi: string;
      validationDisclaimer: string;
      metrologicalAuditSummary: string;
    };
    caveat: string;
    relatedChapterSlugs: string[];
  };
}

export interface MonographStructuredTable {
  caption: string;
  headers: [string, string];
  rows: Array<[string, string]>;
}

export interface MonographVolume {
  volumeNumber: number;
  volumeRoman: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII';
  slug: string;
  title: string;
  fullHeading: string;
  epigraph: string;
  chapterRangeLabel: string;
  chapterNumbers: [number, number, number, number, number];
  scientificMandate: string;
  linkedAppendixCodes: string[];
}

export interface MonographChapter {
  number: number;
  code: string;
  slug: string;
  volumeNumber: number;
  volumeRoman: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII';
  volumeTitle: string;
  title: string;
  researchStatus: 'Proposed Chapter Protocol · Investigation In Progress';
  executiveSummary: string[];
  keyQuestionsAndScope: string[];
  methodologyAndDatasets: string[];
  scientificDeliverable: string;
  methodologicalCaveat: string;
  structuredTable?: MonographStructuredTable;
}

export interface MonographMasterSpecificationRow {
  number: number;
  component: string;
  proposedSpecification: string;
  targetStatus: 'Editorial and research targets, not claims of completed work';
}

export interface MonographAppendix {
  code:
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T';
  slug: string;
  title: string;
  associatedVolumes: string[];
  associatedChapterCodes: string[];
  purpose: string[];
  requiredVariablesAndRecords: string[];
  qualityAndUncertaintyRule: string;
  status: 'Protocol Defined · Data Compilation & Validation In Progress';
}

export interface MonographFoundationalReference {
  number: number;
  title: string;
  journalOrSource: string;
  year: string;
  url: string;
  scientificRelevance: string;
}

export interface StrategicFlagshipComparisonRow {
  dimension: string;
  dispatch01: string;
  dispatch17: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MONOGRAPH 01 IDENTITY, FOUNDATIONAL STATEMENT & EPILOGUE
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_IDENTITY: Monograph01Identity = {
  editionSlug: 'monograph-01-atmosphere-without-borders',
  dispatchSlug: 'the-atmosphere-has-no-borders',
  dispatchNumber: '17',
  dispatchAliasPath: '/himalayan-dispatch/dispatches/the-atmosphere-has-no-borders',
  canonicalDispatchPath:
    '/himalayan-dispatch/issues/volume-01-issue-01/the-atmosphere-has-no-borders',
  canonicalMonographPath:
    '/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders',
  kewCompanionPath: '/risk-monitoring/air-pollution',
  datasetEndpointPath: '/api/himalayan-dispatch/datasets/atmosphere-monograph-framework',
  companionGovernanceDispatchSlug:
    'six-years-of-warnings-and-kashmir-still-cannot-breathe',
  companionGovernanceDispatchPath:
    '/himalayan-dispatch/issues/volume-01-issue-01/six-years-of-warnings-and-kashmir-still-cannot-breathe',
  kicker: 'SPECIAL SCIENTIFIC INVESTIGATION · MONOGRAPH 01 · RESEARCH FRAMEWORK',
  title: 'The Atmosphere Has No Borders',
  subtitle: 'The Air We Breathe, the Numbers We Cannot Trust',
  extendedSubtitle:
    "Kashmir's Atmospheric Crisis: An Integrated Scientific Investigation into Regional Climatology, Himalayan Atmospheric Dynamics, Transboundary Pollution, Air Quality Measurement Integrity, Public Health and Environmental Governance",
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Atmospheric Science and Geospatial Intelligence Desk',
  bylineStatusNote:
    'Proposed Monograph Directorate & 60-Chapter Scope — Ongoing Scientific Investigation Awaiting Completion of Original Atmospheric Modelling, Station Validation, and External Peer Review',
  geographicScope:
    'Kashmir Valley · Western Himalayas · Indo-Gangetic Plains · Hindu Kush · Karakoram · Tibetan Plateau · Central Asia',
  classificationBadges: [
    'CLIMATOLOGY & ATMOSPHERIC PHYSICS',
    'TRANSBOUNDARY POLLUTION',
    'REMOTE SENSING & GEOSPATIAL INTELLIGENCE',
    'ATMOSPHERIC CHEMISTRY',
    'SCIENTIFIC MEASUREMENT INTEGRITY',
    'PUBLIC HEALTH & ENVIRONMENTAL GOVERNANCE',
  ],
  heroMetrics: [
    {
      value: '12',
      label: 'Thematic volumes',
      note: 'Proposed research architecture',
    },
    {
      value: '60',
      label: 'Scientific chapters',
      note: 'Proposed chapter slate',
    },
    {
      value: '30 Years',
      label: 'Climate baseline',
      note: '1991–2020 WMO normal',
    },
    {
      value: '20',
      label: 'Technical appendices',
      note: 'Protocols A through T',
    },
  ],
  publicationHierarchy: [
    {
      levelCode: 'LEVEL 01',
      tierLabel: 'Inaugural Edition · Dispatch 17',
      title: 'Executive Scientific Investigation in Vol. 01 / No. 01',
      routePath:
        '/himalayan-dispatch/issues/volume-01-issue-01/the-atmosphere-has-no-borders',
      summary:
        'Placed immediately after Dispatch 16 (Clean Air Governance) under an independent Special Scientific Investigation rubric, presenting the executive synthesis of physical climatology, transboundary hypotheses, and the November 2026 AQI measurement schism.',
    },
    {
      levelCode: 'LEVEL 02',
      tierLabel: 'Independent Scientific Monograph · Monograph 01',
      title: '12 Thematic Volumes, 60 Chapter Protocols & 20 Technical Appendices',
      routePath:
        '/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders',
      summary:
        'Full research architecture specifying physical equations, boundary-layer climatology, regional emission inventories, 14 WRF-Chem attribution sensitivity experiments, 12-field AQI metrological audits, and Appendices A–T.',
    },
    {
      levelCode: 'LEVEL 03',
      tierLabel: 'KEW Scientific Companion · Operational Observatory',
      title: 'Western Himalayan Atmospheric Intelligence & Air Quality Registry',
      routePath: '/risk-monitoring/air-pollution',
      summary:
        'Operational digital companion pairing non-regulatory community optical screening nodes and 44-unit ECMWF CAMS 0.1° (~11 km) gridded reanalysis cells with ground-to-model validation deltas and open data provenance.',
    },
  ],
  foundationalStatement: [
    'The atmosphere above Kashmir is not an isolated geographical entity. It is part of an interconnected planetary atmospheric system that transports moisture, heat, gases, mineral dust, combustion particles and chemical compounds across continents, mountain ranges and political boundaries.',
    'The air arriving in Kashmir may have travelled across the industrial landscapes of northern India, the agricultural and urban regions of Pakistan, the arid territories of Afghanistan and Iran, the deserts of Central Asia or, under particular atmospheric conditions, the high-altitude environments of western China.',
    'Upon entering Kashmir, these atmospheric constituents interact with locally generated emissions, mountain-valley circulation, seasonal temperature inversions, atmospheric humidity, solar radiation, snow cover and the distinctive topographical architecture of the Western Himalayas.',
    'The resulting air quality is not necessarily a simple reflection of what Kashmir emits. It is the cumulative outcome of what Kashmir produces, what the regional atmosphere transports, what its mountains retain, what atmospheric chemistry creates and what its environmental instruments ultimately measure.',
    'When different monitoring platforms report AQI values ranging from approximately 140 to 708 and beyond, the controversy cannot be adequately explained by newspaper headlines, conventional references to winter pollution or institutional assurances.',
    'It demands an integrated investigation involving climatology, atmospheric physics, meteorology, aerosol chemistry, remote sensing, environmental instrumentation, computational modelling, epidemiology and environmental governance.',
    "The central purpose of this special issue is to establish a scientifically defensible understanding of Kashmir's atmospheric environment.",
    'It must investigate the origin of its pollutants, the mechanisms governing their transport, the processes responsible for their accumulation, the reliability of their measurement and the consequences of prolonged exposure.',
    'It must neither prematurely blame neighbouring countries nor dismiss the possibility of international atmospheric pollution.',
    'The atmosphere has no borders. Scientific accountability should not have them either.',
  ],
  closingPrinciple:
    'The atmosphere has no borders. Scientific accountability should not have them either.',
  epilogueTitle: 'The Atmosphere Belongs to No Nation',
  epilogueStatement: [
    "Kashmir's mountains may define its geography, its watersheds may define its hydrology, and its borders may define administrative responsibilities. None of them completely defines its atmosphere.",
    'The air entering a Kashmiri household may contain particles emitted from a neighbouring street, an orchard several kilometres away, an industrial landscape beyond the mountains or a desert hundreds of kilometres distant.',
    'It may carry compounds transformed through atmospheric reactions during a journey that began far beyond the valley.',
    "Its concentration may be amplified by Kashmir's cold winter nights, its shallow atmospheric boundary layer and the mountains that restrict ventilation.",
    'Yet the person breathing that air has no instrument capable of distinguishing its geographical origin. The human lung does not recognize national boundaries. Neither do the glaciers, forests, lakes and agricultural landscapes receiving atmospheric deposition.',
    'Scientific institutions must therefore understand the atmosphere as a connected environmental system.',
    'Kashmir cannot transfer responsibility for its own pollution to neighbouring countries. Nor can it assume that its air quality is determined exclusively by activities occurring within its territory.',
    'It must measure before it declares, investigate before it attributes, validate before it communicates and understand before it intervenes.',
    'The responsibility of Himalayan Dispatch is not to produce another alarming headline.',
    'It is to establish whether Kashmir understands the atmosphere upon which its people, ecosystems and future depend.',
  ],
  researchStatusDisclosure:
    'Monograph 01 remains explicitly identified as an ongoing scientific investigation until its original November 2026 atmospheric modelling, geographic source attribution, co-located station validation, and population exposure assessments are completed. Proposed chapter counts, specifications, and directorate bylines constitute research framework architecture rather than claims of completed empirical attribution, and no country-specific pollution contribution percentage is published ahead of verified empirical proof.',
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. CENTRAL SCIENTIFIC QUESTIONS (7 INTERCONNECTED INVESTIGATIONS)
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_SEVEN_QUESTIONS: MonographSevenQuestionRow[] = [
  {
    number: 1,
    investigation: 'Climatology',
    fundamentalQuestion: 'What atmospheric conditions historically define Kashmir?',
    targetVolumes: 'Volume I',
    targetChapterRange: 'Chapters 01–05',
    analyticalFocus:
      '1991–2020 WMO climatological normals, seasonal radiation-moisture regimes, snowpack albedo trends, frost-day shifts, and historical winter stagnation anomalies across the intermontane basin.',
  },
  {
    number: 2,
    investigation: 'Atmospheric physics',
    fundamentalQuestion:
      'Why does Kashmir accumulate pollution differently from surrounding plains?',
    targetVolumes: 'Volume II & Volume III',
    targetChapterRange: 'Chapters 06–15',
    analyticalFocus:
      'Pir Panjal and Greater Himalayan topographic confinement, radiative and subsidence temperature inversions, shallow winter planetary boundary layers (173–1,042 m), katabatic cold-air pooling, ventilation coefficients, and synoptic Western Disturbances.',
  },
  {
    number: 3,
    investigation: 'Local emissions',
    fundamentalQuestion: 'How much pollution originates within Kashmir?',
    targetVolumes: 'Volume IV',
    targetChapterRange: 'Chapters 16–20',
    analyticalFocus:
      'Bottom-up fuel and activity inventories across winter domestic heating (firewood, charcoal, lignite, diesel backup), cold-start urban transport, brick kilns, cement/quarry clusters, autumn orchard residue burning, and urban construction dust.',
  },
  {
    number: 4,
    investigation: 'Transboundary transport',
    fundamentalQuestion:
      'How much pollution potentially arrives from India, Pakistan, China and other regional sources?',
    targetVolumes: 'Volume V, Volume VIII & Volume IX',
    targetChapterRange: 'Chapters 21–25, 36–45',
    analyticalFocus:
      'Multi-elevation HYSPLIT back-trajectories, nested WRF-Chem sensitivity runs, CALIOP/EarthCARE vertical aerosol curtains, and FIRMS thermal plume tracking across the Indo-Gangetic Plain, northern Pakistan, Xinjiang/Taklamakan, Afghanistan, Iran, and Central Asia.',
  },
  {
    number: 5,
    investigation: 'Atmospheric chemistry',
    fundamentalQuestion:
      'How much pollution forms within Kashmir through chemical transformation?',
    targetVolumes: 'Volume VI & Volume IX',
    targetChapterRange: 'Chapters 26–30, 43–45',
    analyticalFocus:
      'Secondary inorganic sulfate-nitrate-ammonium thermodynamics, volatile organic compound oxidation, brown and coated black carbon aging, and kappa-Köhler aqueous-phase aerosol growth inside winter radiation fogs.',
  },
  {
    number: 6,
    investigation: 'Measurement integrity',
    fundamentalQuestion:
      'Why do different AQI monitoring systems produce substantially different results?',
    targetVolumes: 'Volume VII & Volume XII',
    targetChapterRange: 'Chapters 31–35, 59',
    analyticalFocus:
      'Forensic 12-field audit of the November 26–27, 2026 Srinagar AQI divergence (~140 JKPCC vs. 708 private optical feed), CPCB NAQI 500 cap versus US EPA >500 breakpoint extrapolation, and unheated nephelometer relative-humidity bias.',
  },
  {
    number: 7,
    investigation: 'Environmental governance',
    fundamentalQuestion:
      'Does Kashmir possess the scientific and institutional capacity to understand and manage its atmosphere?',
    targetVolumes: 'Volume X, Volume XI & Volume XII',
    targetChapterRange: 'Chapters 46–60',
    analyticalFocus:
      'Epidemiological, cryospheric, agronomic, and economic damage accounting; 11-institution statutory governance audit; open raw-telemetry rights; 16-node stratified monitoring design; and a phased local-plus-regional clean-air roadmap.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. CORE PHYSICAL & METROLOGICAL EQUATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_EQUATIONS: MonographEquationsSpec = {
  sourceAccounting: {
    id: 'source-accounting',
    title: 'Conceptual Atmospheric Source-Accounting Framework',
    formulaText: 'C_observed = C_local + C_transported + C_secondary + C_natural + ε',
    latex:
      'C_{\\mathrm{observed}} = C_{\\mathrm{local}} + C_{\\mathrm{transported}} + C_{\\mathrm{secondary}} + C_{\\mathrm{natural}} + \\epsilon',
    symbols: [
      {
        symbol: 'C_observed',
        label: 'Observed receptor concentration',
        definition:
          'Total ambient pollutant mass concentration recorded at a validated monitoring station over a standardized averaging window.',
        unit: 'µg/m³',
      },
      {
        symbol: 'C_local',
        label: 'Local primary emissions',
        definition:
          'Primary particulate or gaseous mass emitted directly within the Kashmir Valley airshed (heating, traffic, kilns, waste, orchard smoke, construction).',
        unit: 'µg/m³',
      },
      {
        symbol: 'C_transported',
        label: 'Imported primary pollutants',
        definition:
          'Primary anthropogenic aerosols advected across mountain passes or mixed downward from regional corridors outside the Kashmir Valley.',
        unit: 'µg/m³',
      },
      {
        symbol: 'C_secondary',
        label: 'Secondary chemical aerosols',
        definition:
          'Particulate mass formed in situ or along transit pathways via gas-to-particle conversion and heterogeneous fog chemistry (sulfates, nitrates, ammonium, SOA).',
        unit: 'µg/m³',
      },
      {
        symbol: 'C_natural',
        label: 'Natural primary aerosols',
        definition:
          'Non-anthropogenic primary particles including mobilized desert mineral dust (e.g., Taklamakan, Thar, Karakum, Iranian Plateau), natural soil dust, and primary biogenic aerosols.',
        unit: 'µg/m³',
      },
      {
        symbol: 'ε',
        label: 'Measurement & model residual',
        definition:
          'Combined instrumental measurement uncertainty (calibration drift, inlet humidity bias) and unresolved atmospheric transport/chemistry model error.',
        unit: 'µg/m³',
      },
    ],
    caveat:
      'This is a conceptual source-accounting framework. Actual atmospheric concentrations also depend on horizontal/vertical dispersion, wet and dry deposition, chemical loss, and entrainment across the boundary layer. Source categories must be defined rigorously to prevent double counting—particularly where transboundary gaseous precursors react with local valley ammonia or oxidants to form secondary aerosols.',
    relatedChapterSlugs: [
      'chapter-01-the-atmospheric-geography-of-kashmir',
      'chapter-28-secondary-inorganic-aerosols',
      'chapter-44-geographic-source-attribution-experiments',
      'chapter-45-chemical-source-apportionment-and-independent-validation',
    ],
  },
  ventilationCoefficient: {
    id: 'ventilation-coefficient',
    title: 'Simplified Atmospheric Ventilation Coefficient',
    formulaText: 'VC = H_mix × U',
    latex: 'VC = H_{\\mathrm{mix}} \\times U',
    defaultHmixMeters: 250,
    defaultWindMps: 1.5,
    defaultVcM2ps: 375,
    unit: 'm²/s',
    symbols: [
      {
        symbol: 'VC',
        label: 'Ventilation coefficient',
        definition:
          'Volumetric horizontal atmospheric flushing rate per unit cross-wind basin width controlling valley residence time.',
        unit: 'm²/s',
      },
      {
        symbol: 'H_mix',
        label: 'Mixing-layer height',
        definition:
          'Depth of the planetary boundary layer available for vertical turbulent dilution below the capping temperature inversion.',
        unit: 'm',
      },
      {
        symbol: 'U',
        label: 'Representative wind speed',
        definition:
          'Mean horizontal transport wind speed integrated across the active mixing layer.',
        unit: 'm/s',
      },
    ],
    caveat:
      'Illustrative calculation (250 m × 1.5 m/s = 375 m²/s). Kashmir-specific ventilation risk thresholds must be established through observational validation using co-located ceilometer/radiosonde profiles and multi-level wind measurements rather than unvalidated plains criteria.',
    relatedChapterSlugs: [
      'chapter-08-the-planetary-boundary-layer',
      'chapter-10-atmospheric-ventilation-and-residence-time',
      'chapter-58-atmospheric-early-warning-and-forecasting',
    ],
  },
  aqiSubIndex: {
    id: 'aqi-sub-index',
    title: 'Piecewise Linear Pollutant Sub-Index Formula',
    formulaText: 'I_p = ((I_H - I_L) / (C_H - C_L)) × (C_p - C_L) + I_L',
    latex: 'I_p = \\frac{I_H - I_L}{C_H - C_L}(C_p - C_L) + I_L',
    symbols: [
      {
        symbol: 'I_p',
        label: 'Pollutant sub-index',
        definition:
          'Dimensionless sub-index computed for pollutant p; overall reported AQI equals max(I_p) across valid monitored criteria pollutants under the chosen standard.',
        unit: 'Dimensionless index',
      },
      {
        symbol: 'C_p',
        label: 'Observed pollutant concentration',
        definition:
          'Truncated or averaged mass/volume concentration of pollutant p over the standard-specific averaging window (e.g., 24-hour vs. NowCast/1-hour).',
        unit: 'µg/m³ or ppm',
      },
      {
        symbol: 'C_L, C_H',
        label: 'Concentration breakpoints',
        definition:
          'Lower (C_L ≤ C_p) and upper (C_H ≥ C_p) regulatory concentration bracket boundaries defined by the national index table.',
        unit: 'µg/m³ or ppm',
      },
      {
        symbol: 'I_L, I_H',
        label: 'Index breakpoints',
        definition:
          'Dimensionless index values corresponding to concentration boundaries C_L and C_H.',
        unit: 'Dimensionless index',
      },
    ],
    cpcbVsUsEpaComparison:
      "India's CPCB National Air Quality Index (NAQI) defines its highest Severe category within the 401–500 range (24-hour PM2.5 > 250 µg/m³) and caps conventional official index displays at 500. By contrast, the US EPA AQI methodology provides an explicit linear slope extrapolation beyond 500 when concentrations surpass the top breakpoint, and commercial aggregator platforms frequently apply proprietary real-time 1-hour formulas onto unheated optical nephelometer counts.",
    srinagarNov2026CaseStudy: {
      episodeWindow: 'November 26–27, 2026',
      documentedPressSource:
        'Daily Excelsior report (November 27–28, 2026): "Srinagar pollution readings diverge sharply, raising concern among residents"',
      reportedPrivatePlatformName: 'AQI.in',
      reportedPrivatePlatformAqi: 708,
      reportedOfficialJkpccApproxAqi: '~140',
      validationDisclaimer:
        'Reported private-platform AQI (708) — Not an independently validated valley-wide or official AQI measurement.',
      metrologicalAuditSummary:
        'Reconciling ~140 (JKPCC) against 708 (AQI.in) requires auditing station micro-siting (tree-buffered institutional compound vs. roadside/residential smoke pocket), averaging periods (24-hour rolling regulatory mean vs. instantaneous peak), unheated laser scattering inflation under 85–98% relative humidity radiation fog, and NAQI cap vs. >500 breakpoint extrapolation.',
    },
    caveat:
      'An AQI exceeding 500 is not automatically scientifically impossible under extrapolated breakpoint conventions, but any reported AQI without its underlying pollutant concentration, averaging period, instrument class, humidity correction, and index standard lacks scientific interpretability.',
    relatedChapterSlugs: [
      'chapter-31-reconstructing-the-aqi-708-event',
      'chapter-32-the-science-of-the-air-quality-index',
      'chapter-33-when-the-air-quality-index-exceeds-500',
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. STRATEGIC FLAGSHIP COMPARISON (DISPATCH 01 VS. DISPATCH 17)
// ─────────────────────────────────────────────────────────────────────────────

export const STRATEGIC_FLAGSHIP_DISTINCTION_NOTE =
  'Dispatch 01 establishes the historical environmental identity of Himalayan Dispatch. Dispatch 17 establishes its scientific investigative identity.';

export const STRATEGIC_FLAGSHIP_COMPARISON: StrategicFlagshipComparisonRow[] = [
  {
    dimension: 'Title',
    dispatch01: 'The Price of Protecting Paradise',
    dispatch17: 'The Atmosphere Has No Borders',
  },
  {
    dimension: 'Classification',
    dispatch01: 'Inaugural cover story',
    dispatch17: 'Special scientific investigation',
  },
  {
    dimension: 'Focus',
    dispatch01: 'Environmental legacy',
    dispatch17: 'Atmospheric science',
  },
  {
    dimension: 'Scope',
    dispatch01: 'Environmental history and stewardship',
    dispatch17: 'Regional and international atmospheric systems',
  },
  {
    dimension: 'Scientific identity',
    dispatch01: 'Historical and institutional investigation',
    dispatch17: 'Quantitative scientific investigation',
  },
  {
    dimension: 'Permanent value',
    dispatch01: 'Environmental legacy documentation',
    dispatch17: 'Atmospheric research and monitoring foundation',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. PUBLICATION MASTER SPECIFICATIONS (16 EDITORIAL & RESEARCH TARGETS)
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_MASTER_SPECIFICATIONS_NOTE =
  'Editorial and research targets, not claims of completed work.';

export const MONOGRAPH_01_MASTER_SPECIFICATIONS: MonographMasterSpecificationRow[] = [
  {
    number: 1,
    component: 'Publication type',
    proposedSpecification: 'Scientific investigative monograph',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 2,
    component: 'Major thematic volumes',
    proposedSpecification: '12',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 3,
    component: 'Scientific chapters',
    proposedSpecification: '60',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 4,
    component: 'Prologue and epilogue',
    proposedSpecification: '2',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 5,
    component: 'Manuscript length',
    proposedSpecification: '65,000–90,000 words',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 6,
    component: 'Climatological baseline',
    proposedSpecification: '1991–2020',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 7,
    component: 'Regional geographical scope',
    proposedSpecification:
      'Kashmir, India, Pakistan, China, Afghanistan, Iran and Central Asia',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 8,
    component: 'Proposed receptor locations',
    proposedSpecification: '16',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 9,
    component: 'Source-attribution experiments',
    proposedSpecification: '14',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 10,
    component: 'Scientific maps',
    proposedSpecification: '50–70',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 11,
    component: 'Scientific charts and diagrams',
    proposedSpecification: '80–100',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 12,
    component: 'Technical data tables',
    proposedSpecification: '75–100',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 13,
    component: 'Scientific appendices',
    proposedSpecification: '20',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 14,
    component: 'Bibliographic target',
    proposedSpecification: '200+ relevant scientific sources',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 15,
    component: 'External scientific review',
    proposedSpecification:
      'Atmospheric science, climatology, instrumentation, epidemiology and modelling',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
  {
    number: 16,
    component: 'Digital companion',
    proposedSpecification: 'KEW Atmospheric Intelligence Observatory',
    targetStatus: 'Editorial and research targets, not claims of completed work',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. FOUNDATIONAL SCIENTIFIC REFERENCES (11 CORE PUBLICATIONS & RESOURCES)
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_FOUNDATIONAL_REFERENCES: MonographFoundationalReference[] = [
  {
    number: 1,
    title: 'Winter Burst of Pristine Kashmir Valley Air',
    journalOrSource: 'Scientific Reports (Nature Portfolio)',
    year: '2018',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5820365/',
    scientificRelevance:
      'Documents extreme historical winter fine-particulate pollution in Srinagar reaching 348 µg/m³ alongside WRF-Chem modelling of basin meteorological trapping and potential long-range transport—proving severe particulate episodes predate the November 2026 AQI dispute.',
  },
  {
    number: 2,
    title:
      'Particulate pollution over an urban Himalayan site: Temporal variability, impact of meteorology and potential source regions',
    journalOrSource: 'Science of The Total Environment',
    year: '2021',
    url: 'https://www.sciencedirect.com/science/article/pii/S0048969721044375',
    scientificRelevance:
      'Quantifies multi-seasonal particulate variability over Srinagar, demonstrating boundary-layer meteorological amplification and identifying potential regional source pathways across the Trans-Gangetic Plains and western corridors.',
  },
  {
    number: 3,
    title:
      'Characteristics, source apportionment and long-range transport of black carbon in the Kashmir Valley',
    journalOrSource: 'Science of The Total Environment (PubMed PMID 35439603)',
    year: '2022',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35439603/',
    scientificRelevance:
      'Analyzes multi-year (2012–2017) black carbon observations in Srinagar, linking winter carbonaceous surges to shallow planetary boundary layers (approximately 173 to 1,042 m), local solid-fuel/fossil combustion, and potential source hotspots in northern Pakistan, the Trans-Gangetic Plains, Afghanistan, and Iran.',
  },
  {
    number: 4,
    title:
      'Aerosol black carbon at an urban site in Srinagar: Seasonality, sources, meteorology and radiative forcing',
    journalOrSource: 'Atmospheric Environment',
    year: '2017',
    url: 'https://www.sciencedirect.com/science/article/pii/S1352231017304466',
    scientificRelevance:
      'Establishes foundational optical aethalometer seasonality, fossil-fuel versus biomass-burning absorption Ångström partitioning, boundary-layer sensitivity, and atmospheric radiative forcing estimates for Srinagar.',
  },
  {
    number: 5,
    title:
      'Aerosol variability and atmospheric transport in the Himalayan region from CALIOP observations',
    journalOrSource: 'Atmospheric Chemistry and Physics (Copernicus / EGU)',
    year: '2014',
    url: 'https://acp.copernicus.org/articles/14/4369/2014/',
    scientificRelevance:
      'Uses spaceborne CALIOP lidar vertical profiles to characterize elevated aerosol plumes crossing Himalayan slopes and passes, providing observational benchmarks for distinguishing column optical depth from valley-floor entrainment.',
  },
  {
    number: 6,
    title: 'Quantification of dust-source contributions over the Tibetan Plateau',
    journalOrSource: 'Journal of Climate (American Meteorological Society)',
    year: '2024',
    url: 'https://journals.ametsoc.org/view/journals/clim/37/10/JCLI-D-23-0486.1.xml',
    scientificRelevance:
      'Quantifies long-range mineral dust mobilization from the Taklamakan Desert and surrounding arid basins onto the Tibetan Plateau while establishing altitude and circulation constraints essential to evaluating western China transport hypotheses.',
  },
  {
    number: 7,
    title:
      'Dominating Remote Source and Its Potential Contribution of Airborne Dust Over the Tibetan Plateau',
    journalOrSource: 'GeoHealth / AGU (PMC11582389)',
    year: '2024',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11582389/',
    scientificRelevance:
      'Differentiates natural remote desert dust pathways from anthropogenic combustion aerosols across high-altitude Asian receptor environments, reinforcing Chapter 23 guardrails against misclassifying natural mineral dust as industrial emissions.',
  },
  {
    number: 8,
    title: 'NOAA HYSPLIT Atmospheric Transport and Dispersion Modeling System',
    journalOrSource: 'NOAA Air Resources Laboratory (ARL)',
    year: 'Technical System Reference',
    url: 'https://www.arl.noaa.gov/hysplit/',
    scientificRelevance:
      'Defines the Lagrangian parcel back-trajectory and dispersion computational architecture proposed in Chapter 42 and Appendix J for reconstructing air-mass histories across all 10 Kashmir districts and mountain-pass receptors.',
  },
  {
    number: 9,
    title: 'NOAA Atmospheric Modelling Limitations',
    journalOrSource: 'NOAA READY / Air Resources Laboratory Technical Guidance',
    year: 'Methodological Standard',
    url: 'https://www.ready.noaa.gov/hypub/limitations.html',
    scientificRelevance:
      'Documents inherent trajectory integration errors and coarse meteorological grid limitations in complex mountain terrain—mandating ensemble sensitivity testing rather than deterministic single-line source claims in the Himalayas.',
  },
  {
    number: 10,
    title: 'US EPA Air Quality Index Breakpoints',
    journalOrSource: 'United States Environmental Protection Agency (AQS Code Tables)',
    year: 'Regulatory Reference',
    url: 'https://aqs.epa.gov/aqsweb/documents/codetables/aqi_breakpoints.html',
    scientificRelevance:
      'Provides official concentration-to-index piecewise breakpoints and >500 extrapolation conventions required in Chapters 32–33 and Appendix O to audit discrepancies against India CPCB NAQI (401–500 ceiling).',
  },
  {
    number: 11,
    title:
      'Srinagar pollution readings diverge sharply, raising concern among residents',
    journalOrSource: 'Daily Excelsior',
    year: 'November 2026',
    url: 'https://www.dailyexcelsior.com/srinagar-pollution-readings-diverge-sharply-raising-concern-among-residents/',
    scientificRelevance:
      'Primary documentary record of the November 26–27, 2026 Srinagar monitoring controversy in which private platform AQI.in displayed 708 while official JKPCC observations stood near ~140, motivating Volume VII.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. THE 12 THEMATIC VOLUMES OF MONOGRAPH 01
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_VOLUMES: MonographVolume[] = [
  {
    volumeNumber: 1,
    volumeRoman: 'I',
    slug: 'volume-01-climatological-identity-of-kashmir',
    title: 'The Climatological Identity of Kashmir',
    fullHeading: 'VOLUME I — THE CLIMATOLOGICAL IDENTITY OF KASHMIR',
    epigraph:
      'Understanding the natural atmospheric system before investigating its contamination.',
    chapterRangeLabel: 'Chapters 01–05',
    chapterNumbers: [1, 2, 3, 4, 5],
    scientificMandate:
      'Establishes the physical baseline of the Kashmir intermontane basin across the 1991–2020 WMO climatological normal, resolving seasonal radiation-moisture shifts, winter snow-albedo energetics, and observed vs. projected climate change.',
    linkedAppendixCodes: ['A', 'B', 'C'],
  },
  {
    volumeNumber: 2,
    volumeRoman: 'II',
    slug: 'volume-02-physics-of-kashmirs-atmosphere',
    title: "The Physics of Kashmir's Atmosphere",
    fullHeading: "VOLUME II — THE PHYSICS OF KASHMIR'S ATMOSPHERE",
    epigraph:
      'Why the geographical beauty of Kashmir may also create atmospheric vulnerability.',
    chapterRangeLabel: 'Chapters 06–10',
    chapterNumbers: [6, 7, 8, 9, 10],
    scientificMandate:
      'Quantifies orographic confinement, pass-level exchange, multi-mechanism temperature inversions, shallow winter planetary boundary layers, diurnal slope-valley wind recirculation, and basin ventilation residence times.',
    linkedAppendixCodes: ['C', 'D', 'E'],
  },
  {
    volumeNumber: 3,
    volumeRoman: 'III',
    slug: 'volume-03-the-regional-atmospheric-engine',
    title: 'The Regional Atmospheric Engine',
    fullHeading: 'VOLUME III — THE REGIONAL ATMOSPHERIC ENGINE',
    epigraph:
      'Understanding the larger atmospheric systems that connect Kashmir with the surrounding continent.',
    chapterRangeLabel: 'Chapters 11–15',
    chapterNumbers: [11, 12, 13, 14, 15],
    scientificMandate:
      'Investigates synoptic-scale couplings linking the Kashmir Valley to the Subtropical Westerly Jet, Western Disturbances (as importers, ventilators, cleansers, or redistributors), Indian Summer Monsoon transitions, and continental anticyclones.',
    linkedAppendixCodes: ['B', 'C', 'J'],
  },
  {
    volumeNumber: 4,
    volumeRoman: 'IV',
    slug: 'volume-04-kashmirs-indigenous-pollution-inventory',
    title: "Kashmir's Indigenous Pollution Inventory",
    fullHeading: "VOLUME IV — KASHMIR'S INDIGENOUS POLLUTION INVENTORY",
    epigraph: 'Scientific accountability must begin within Kashmir itself.',
    chapterRangeLabel: 'Chapters 16–20',
    chapterNumbers: [16, 17, 18, 19, 20],
    scientificMandate:
      'Constructs a verifiable local emissions ledger spanning winter household and commercial heating, cold-start road transport, brick kilns and cement clusters, orchard and agricultural biomass burning, municipal waste fires, and urban corridor obstruction.',
    linkedAppendixCodes: ['F', 'H'],
  },
  {
    volumeNumber: 5,
    volumeRoman: 'V',
    slug: 'volume-05-the-geography-of-transboundary-pollution',
    title: 'The Geography of Transboundary Pollution',
    fullHeading: 'VOLUME V — THE GEOGRAPHY OF TRANSBOUNDARY POLLUTION',
    epigraph: "Investigating the atmosphere beyond Kashmir's mountains.",
    chapterRangeLabel: 'Chapters 21–25',
    chapterNumbers: [21, 22, 23, 24, 25],
    scientificMandate:
      'Tests transboundary aerosol and precursor transport hypotheses across the Indo-Gangetic Plain, Pakistan western corridor, Xinjiang/Taklamakan/Tibetan Plateau, and Afghanistan–Iran–Central Asia arid belt without conflating natural desert dust with anthropogenic pollution.',
    linkedAppendixCodes: ['G', 'H', 'J', 'L'],
  },
  {
    volumeNumber: 6,
    volumeRoman: 'VI',
    slug: 'volume-06-the-chemistry-of-the-air-kashmir-breathes',
    title: 'The Chemistry of the Air Kashmir Breathes',
    fullHeading: 'VOLUME VI — THE CHEMISTRY OF THE AIR KASHMIR BREATHES',
    epigraph:
      'What arrives in Kashmir may not be chemically identical to what was originally emitted.',
    chapterRangeLabel: 'Chapters 26–30',
    chapterNumbers: [26, 27, 28, 29, 30],
    scientificMandate:
      'Examines aerodynamic size distributions, light-absorbing black and brown carbon, secondary inorganic sulfate-nitrate-ammonium formation from gaseous precursors, seasonal VOC photochemistry, and hygroscopic fog-droplet growth.',
    linkedAppendixCodes: ['M', 'N'],
  },
  {
    volumeNumber: 7,
    volumeRoman: 'VII',
    slug: 'volume-07-the-numbers-we-cannot-trust',
    title: 'The Numbers We Cannot Trust',
    fullHeading: 'VOLUME VII — THE NUMBERS WE CANNOT TRUST',
    epigraph:
      "Determining whether Kashmir's atmospheric measurements accurately represent the air its citizens breathe.",
    chapterRangeLabel: 'Chapters 31–35',
    chapterNumbers: [31, 32, 33, 34, 35],
    scientificMandate:
      'Reconstructs the November 26–27, 2026 Srinagar AQI 708 vs. ~140 discrepancy through a 12-field audit, CPCB vs. US EPA sub-index mathematics, >500 extrapolation rules, reference gravimetric/BAM vs. optical sensor physics, and station QA/QC.',
    linkedAppendixCodes: ['N', 'O', 'P', 'Q'],
  },
  {
    volumeNumber: 8,
    volumeRoman: 'VIII',
    slug: 'volume-08-remote-sensing-and-atmospheric-intelligence',
    title: 'Remote Sensing and Atmospheric Intelligence',
    fullHeading: 'VOLUME VIII — REMOTE SENSING AND ATMOSPHERIC INTELLIGENCE',
    epigraph:
      'Observing an atmosphere that cannot be understood through scattered ground sensors alone.',
    chapterRangeLabel: 'Chapters 36–40',
    chapterNumbers: [36, 37, 38, 39, 40],
    scientificMandate:
      'Integrates 8 satellite Earth-observation constellations, 7 atmospheric reanalysis suites, regional GIS source mapping, NASA FIRMS cross-border fire tracking, and vertical aerosol profiling while strictly separating column AOD from breathing-zone PM2.5.',
    linkedAppendixCodes: ['G', 'H', 'I'],
  },
  {
    volumeNumber: 9,
    volumeRoman: 'IX',
    slug: 'volume-09-original-atmospheric-modelling-and-source-attribution',
    title: 'Original Atmospheric Modelling and Source Attribution',
    fullHeading:
      'VOLUME IX — ORIGINAL ATMOSPHERIC MODELLING AND SOURCE ATTRIBUTION',
    epigraph:
      'Moving from plausible explanations to measurable scientific evidence.',
    chapterRangeLabel: 'Chapters 41–45',
    chapterNumbers: [41, 42, 43, 44, 45],
    scientificMandate:
      'Defines the multi-period empirical reconstruction window, multi-height NOAA HYSPLIT ensemble trajectories, 27–9–3–1 km nested WRF-Chem domains, 14 nonlinear source-sensitivity experiments, and independent PMF/CMB chemical validation.',
    linkedAppendixCodes: ['J', 'K', 'L', 'M', 'Q'],
  },
  {
    volumeNumber: 10,
    volumeRoman: 'X',
    slug: 'volume-10-the-human-ecological-and-economic-consequences',
    title: 'The Human, Ecological and Economic Consequences',
    fullHeading:
      'VOLUME X — THE HUMAN, ECOLOGICAL AND ECONOMIC CONSEQUENCES',
    epigraph:
      'Understanding pollution as an environmental systems problem rather than an isolated respiratory concern.',
    chapterRangeLabel: 'Chapters 46–50',
    chapterNumbers: [46, 47, 48, 49, 50],
    scientificMandate:
      'Evaluates population-weighted cardiopulmonary and maternal-child exposure, black-carbon and dust deposition on Kolahoi and Thajiwas cryospheric reserves, orchard and saffron ozone/particulate stress, Dal–Wular–Jhelum aquatic fallout, and economic welfare losses.',
    linkedAppendixCodes: ['R', 'S'],
  },
  {
    volumeNumber: 11,
    volumeRoman: 'XI',
    slug: 'volume-11-environmental-governance-and-atmospheric-accountability',
    title: 'Environmental Governance and Atmospheric Accountability',
    fullHeading:
      'VOLUME XI — ENVIRONMENTAL GOVERNANCE AND ATMOSPHERIC ACCOUNTABILITY',
    epigraph:
      'The atmosphere is regional, but responsibility must remain scientifically and institutionally identifiable.',
    chapterRangeLabel: 'Chapters 51–55',
    chapterNumbers: [51, 52, 53, 54, 55],
    scientificMandate:
      'Audits 11 regional regulatory, scientific, and municipal institutions alongside comparative international transboundary frameworks, open raw-telemetry data rights, non-alarmist public risk communication, and science-led regional cooperation.',
    linkedAppendixCodes: ['N', 'O', 'T'],
  },
  {
    volumeNumber: 12,
    volumeRoman: 'XII',
    slug: 'volume-12-building-kashmirs-future-atmospheric-intelligence',
    title: "Building Kashmir's Future Atmospheric Intelligence",
    fullHeading:
      "VOLUME XII — BUILDING KASHMIR'S FUTURE ATMOSPHERIC INTELLIGENCE",
    epigraph:
      'Transforming the special issue into a permanent environmental scientific capability.',
    chapterRangeLabel: 'Chapters 56–60',
    chapterNumbers: [56, 57, 58, 59, 60],
    scientificMandate:
      'Architects the permanent Western Himalayan Transboundary Atmospheric Intelligence Observatory within KEW, a proposed 16-node stratified monitoring network, 10 uncertainty-qualified 24–72h warning products, a measurement integrity protocol, and a 6-phase clean-air roadmap.',
    linkedAppendixCodes: ['A', 'N', 'P', 'Q', 'T'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. ALL 60 SCIENTIFIC CHAPTER PROTOCOLS (CHAPTERS 01–60)
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_CHAPTERS: MonographChapter[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME I — THE CLIMATOLOGICAL IDENTITY OF KASHMIR (CHAPTERS 01–05)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 1,
    code: '01',
    slug: 'chapter-01-the-atmospheric-geography-of-kashmir',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'The Climatological Identity of Kashmir',
    title: 'The Atmospheric Geography of Kashmir',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Situated between the Pir Panjal range to the southwest and the Greater Himalayan crest to the northeast, the Kashmir Valley forms a semi-enclosed intermontane basin approximately 135 kilometres long and 32 to 40 kilometres wide, resting at an alluvial floor elevation of 1,550 to 1,850 metres above mean sea level. Surrounding ridgelines rise steeply to 3,500–5,400 metres, embedding a lower-pressure mountain airshed inside one of Earth’s most complex orographic junctions—where the Western Himalayas meet the Hindu Kush, Karakoram, Indo-Gangetic foreland, and western margins of the Tibetan Plateau.',
      'Unlike open continental plains where horizontal pressure gradients flush boundary-layer air freely across hundreds of kilometres, Kashmir’s atmospheric mass exchange is governed by hypsometric elevation gradients, tributary valley geometry, and discrete topographic saddles—including the Jhelum gorge below Baramulla–Uri, Banihal Pass on the southern Pir Panjal divide, Zoji La toward Drass–Ladakh, and Razdan and Sadhna passes to the north and northwest. Understanding how fluvial drainage architecture couples with atmospheric drainage is prerequisite to evaluating both local pollutant trapping and transboundary entry.',
    ],
    keyQuestionsAndScope: [
      'Geographical position of the Kashmir Valley within the Western Himalayan–Karakoram–Hindu Kush mountain arc.',
      'Morphometric characterization of the Kashmir Valley as an intermontane atmospheric basin (floor area, ridge-to-floor relief, and hypsometric volume curves).',
      'Barometric pressure reduction with elevation (~840–850 hPa on the valley floor versus ~550–650 hPa along bounding crests) and its implications for gas density and combustion stoichiometry.',
      'Aerodynamic barrier geometry of the Pir Panjal and Greater Himalayan ranges across prevailing seasonal wind azimuths.',
      'Synoptic-topographic teleconnections imposed by the Karakoram, Hindu Kush, and Tibetan Plateau thermal-mechanical forcing.',
      'Coupling between the 28 Upper Jhelum tributary watersheds (Lidder, Sindh, Pohru, Vishav, Rambiara, Sukhnag, Dudhganga) and nocturnal katabatic airshed drainage.',
      'Orographic lifting, lee-side gravity waves, rotor turbulence, and hydraulic jumps across bounding mountain escarpments.',
      'Identification of natural pass-level ventilation corridors versus topographically sheltered stagnation embayments.',
    ],
    methodologyAndDatasets: [
      '30-metre Copernicus GLO-30 and NASADEM digital elevation models processed for topographic openness, sky-view factor, and basin volume-height integrals.',
      'Hypsometric airshed box-volume partitioning at 50-metre vertical increments from 1,500 m to 4,500 m ASL.',
      'Pass-cross-section morphometry across Uri–Jhelum Gorge, Banihal/Qazigund, Mughal Road/Pir Ki Gali, Sadhna, Razdan, and Zoji La.',
      'ECMWF ERA5-Land and high-resolution terrain-following coordinate diagnostics of mountain-induced mechanical turbulence.',
    ],
    scientificDeliverable:
      'A three-dimensional atmospheric terrain model of the Kashmir basin identifying pass ventilation corridors, sheltered stagnation pockets, and elevation-dependent pollution exposure zones.',
    methodologicalCaveat:
      'Terrain morphometry identifies geometric confinement potential and corridor cross-sections; actual air-mass flux through mountain passes cannot be inferred from topography alone without multi-season wind and vertical profile observations.',
  },
  {
    number: 2,
    code: '02',
    slug: 'chapter-02-the-historical-climatology-of-kashmir',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'The Climatological Identity of Kashmir',
    title: 'The Historical Climatology of Kashmir',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Before attributing autumn haze or winter smog to novel emission sources, atmospheric science must establish what constitutes climatological normality in Kashmir. Long-term instrumental records across Srinagar, Qazigund, Pahalgam, Gulmarg, Kupwara, and Kokernag document a temperate-submediterranean mountain climate shaped by bimodal precipitation—winter and spring snow and rain delivered by extratropical Western Disturbances, followed by weaker, erratic late-summer monsoonal spillover across the Pir Panjal.',
      'Adopting the World Meteorological Organization (WMO) 1991–2020 standard climatological normal as primary reference, this chapter reconstructs multi-decadal trajectories in maximum and minimum temperatures, solid-versus-liquid precipitation ratios, atmospheric specific and relative humidity, calm-wind frequencies, frost days, cold-wave duration, and prolonged dry winter anticyclonic spells. Separating internal multi-year variability (such as ENSO and North Atlantic Oscillation phases) from secular anthropogenic warming clarifies whether meteorological background conditions have shifted toward longer winter stagnation.',
    ],
    keyQuestionsAndScope: [
      'Homogenized historical temperature and precipitation time series across IMD Kashmir Valley synoptic stations.',
      'Interannual and intraseasonal climatic anomalies relative to the 1991–2020 WMO reference normal.',
      'Long-term snowfall depth, snow-day frequency, and solid-to-liquid precipitation fraction shifts across valley-floor and montane stations.',
      'Decadal evolution in Chillai Kalan (December 21–January 30) winter severity and minimum temperature extremes.',
      'Seasonal atmospheric moisture availability, vapour pressure deficit, and morning radiation-fog climatology.',
      'Historical surface wind speed distributions, calm-hour percentages, and directional shifts.',
      'Trends in annual frost days, ice days, and severe cold-wave episodes.',
      'Statistical separation of natural multidecadal climate variability from long-term secular climate change.',
      'Reconstruction of historical meteorological droughts and multi-week winter atmospheric stagnation episodes.',
    ],
    methodologyAndDatasets: [
      'WMO 1991–2020 primary climatological normal baseline supplemented by pre-1991 archival Srinagar station records passing Pettitt, SNHT, and Buishand homogeneity tests.',
      'IMD daily synoptic station archives (Srinagar, Qazigund, Pahalgam, Gulmarg, Kupwara, Kokernag) cross-checked against ERA5/ERA5-Land reanalysis.',
      'Non-parametric Mann-Kendall trend tests with Theil-Sen slope estimators and lag-1 autocorrelation pre-whitening.',
      'Standardized Precipitation Index (SPI) and dry-spell run-length statistics for autumn–winter precipitation deficits.',
    ],
    scientificDeliverable:
      'Homogenized 30-year (1991–2020) and extended historical climatological atlas for the Kashmir Valley quantifying long-term shifts in calm-wind frequency, dry spells, frost days, and winter moisture regimes.',
    methodologicalCaveat:
      'Use the 1991–2020 WMO climatological normal period as the primary baseline; earlier historical observations prior to station relocations or instrument transitions must only be integrated where station metadata and statistical homogeneity are verified.',
  },
  {
    number: 3,
    code: '03',
    slug: 'chapter-03-four-seasons-four-atmospheric-realities',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'The Climatological Identity of Kashmir',
    title: 'Four Seasons, Four Atmospheric Realities',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Applying a single annual-average dispersion or emission assumption to the Kashmir Valley obscures four fundamentally distinct atmospheric regimes. Between March and February, solar insolation angles, surface albedo, boundary-layer convection, synoptic wind direction, wet scavenging rates, and human combustion behaviour reorganize completely—transforming the basin from a deep, convectively ventilated summer boundary layer into a shallow, radiatively capped winter accumulation bowl.',
      'This chapter disaggregates Kashmir’s annual cycle into four process-defined atmospheric climatologies: Spring (Sonth), characterized by vigorous westerly disturbances, trans-continental mineral dust episodes, rapid snowmelt latent-heat exchange, and deepening afternoon convection; Summer (Retkol), marked by high convective mixing heights, diurnal valley breezes, biogenic and urban ozone photochemistry, and intermittent monsoon moisture incursions; Autumn (Harud), defined by declining solar radiation, calm post-monsoon anticyclones, agricultural/orchard residue burning, and evening radiative trapping; and Winter (Wandh / Chillai Kalan), governed by persistent inversions, cold-air pooling, peak solid-fuel residential heating, high-humidity radiation fog, and episodic Western Disturbance passages.',
    ],
    keyQuestionsAndScope: [
      'Process-level partitioning of spring westerly circulation, trans-regional dust episodes, snowmelt energetics, and convective boundary-layer recovery.',
      'Summer convective mixing depth, thermally driven valley-to-mountain winds, monsoon spillover scavenging, and afternoon photochemical ozone/SOA production.',
      'Autumn radiative decay, post-harvest paddy and orchard pruning combustion windows, leaf-litter fires, and early nocturnal inversion onset.',
      'Winter cold-air pooling, multi-day radiative and subsidence inversions, domestic heating fuel surges, weak horizontal ventilation, and wet vs. dry Western Disturbances.',
      'Why annual mean PM2.5 or AQI statistics conceal acute seasonal exposure asymmetries across Kashmir.',
    ],
    methodologyAndDatasets: [
      'Seasonal stratification (MAM, JJA, SON, DJF plus traditional Kashmiri Harud and Chillai Kalan sub-windows) across ERA5 boundary-layer and synoptic variables.',
      'Seasonal wet-scavenging efficiency curves pairing daily precipitation rates (IMD / GPM IMERG) with historical particulate anomalies.',
      'Diurnal cycle composites of surface solar radiation, sensible/latent heat flux, mixing depth, and wind roses by season.',
      'Multi-year satellite AOD and absorbing aerosol index seasonal climatologies (MODIS, TROPOMI, MERRA-2).',
    ],
    scientificDeliverable:
      'Four separate seasonal pollution and dispersion climatologies for the Kashmir Valley replacing single annual-average airshed assumptions.',
    methodologicalCaveat:
      'Seasonal boundaries in mountain basins shift interannually with snowpack persistence and monsoon withdrawal; dynamic meteorological regime classification must supplement fixed calendar-month groupings.',
    structuredTable: {
      caption: 'Four seasonal atmospheric regimes and principal physical-chemical processes in the Kashmir Valley',
      headers: ['Season', 'Principal processes to investigate'],
      rows: [
        [
          'Spring',
          'Westerly circulation, dust transport, increasing convection and snowmelt',
        ],
        [
          'Summer',
          'Convective mixing, monsoon incursions, photochemical pollution and valley winds',
        ],
        [
          'Autumn',
          'Declining solar radiation, agricultural emissions, increasing stagnation and biomass combustion',
        ],
        [
          'Winter',
          'Inversions, cold-air pooling, residential heating, weak ventilation and western disturbances',
        ],
      ],
    },
  },
  {
    number: 4,
    code: '04',
    slug: 'chapter-04-kashmirs-changing-winter-atmosphere',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'The Climatological Identity of Kashmir',
    title: "Kashmir's Changing Winter Atmosphere",
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Residents and clinicians across Kashmir increasingly observe that late-autumn and winter air-pollution episodes appear more prolonged during dry, snowless November–January stretches than in historical wet winters. Testing whether Kashmir’s winter atmosphere is physically becoming more favourable to sustained particulate accumulation requires examining the coupled surface energy balance of the basin floor and surrounding snowpack.',
      'Snow cover exerts competing influences on winter air quality: fresh high-albedo snow reflects incoming shortwave solar radiation and enhances nocturnal longwave radiative cooling—strengthening surface temperature inversions—yet active snow-bearing Western Disturbances simultaneously scour aerosols out of the air column via wet deposition and dynamic air-mass replacement. Conversely, prolonged winter precipitation droughts leave dry, dusty urban roads exposed while persistent high-pressure ridges suppress vertical mixing and freezing nocturnal temperatures sustain intense domestic biomass and charcoal heating demand.',
    ],
    keyQuestionsAndScope: [
      'Components of the winter surface energy budget (shortwave net radiation, longwave radiative cooling, sensible, latent, and ground heat fluxes) across snow-covered vs. snow-free valley floors.',
      'Snow-cover fraction, surface albedo evolution, and snow-line elevation variability across November–February.',
      'Nocturnal radiative cooling rates under clear anticyclonic skies versus overcast stratiform cloud decks.',
      'Observed multidecadal changes in early- and mid-winter precipitation frequency and inter-storm dry-spell length.',
      'Coupling between winter boundary-layer moisture, radiation fog persistence, and reduced daytime solar break-up of inversions.',
      'Heating Degree Day (HDD) trajectories, winter hydropower curtailment interactions, and solid-fuel residential energy demand.',
      'Trends in bulk Richardson number, static stability, and multi-day inversion persistence.',
    ],
    methodologyAndDatasets: [
      'ERA5-Land and CERES/MODIS surface radiation, snow-cover extent (MOD10A1/VNP10A1), and albedo time series (2001–2026).',
      'Lower-tropospheric static stability (LTSS) and inversion persistence diagnostics from reanalysis pressure levels (850–700 hPa).',
      'IMD winter dry-spell duration indices and fog-hour synoptic reports at Srinagar and Qazigund.',
      'Heating Degree Day (base 18 °C and 15.5 °C) calculations paired with seasonal electric load-shedding records.',
    ],
    scientificDeliverable:
      'Quantitative empirical test of whether Kashmir’s winter atmosphere exhibits statistically significant increases in stagnation duration, dry-spell length, and radiative trapping intensity over 1991–2026.',
    methodologicalCaveat:
      'Changes in winter ambient pollution must not be attributed solely to changing winter meteorology without controlling for concurrent multi-decadal growth in vehicles, urban footprint, kilns, and fuel consumption.',
  },
  {
    number: 5,
    code: '05',
    slug: 'chapter-05-climate-change-and-kashmirs-atmospheric-future',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'The Climatological Identity of Kashmir',
    title: "Climate Change and Kashmir's Atmospheric Future",
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Elevation-dependent warming across the Hindu Kush–Karakoram–Himalaya (HKKH) is reshaping the thermodynamic and circulatory boundary conditions within which Kashmir’s future air quality will evolve. Rising freezing levels, altered Western Disturbance storm tracks, shifting rain-to-snow ratios, expanding regional arid dust margins, and lengthened forest-fire seasons interact directly with future airshed dispersion capacity.',
      'This chapter evaluates mid-century (2041–2060) and late-century (2081–2100) climate projections under Shared Socioeconomic Pathways (SSP2-4.5 and SSP5-8.5) alongside high-resolution CORDEX South Asia downscaled ensembles to assess whether Kashmir faces an amplified "climate-pollution penalty"—in which more erratic winter storms, drier autumn soils, and stronger subtropics-to-mountain subsidence compound anthropogenic emission risks—or whether warmer daytime temperatures partially deepen afternoon boundary layers.',
    ],
    keyQuestionsAndScope: [
      'Projected changes in the frequency and multi-day persistence of winter and autumn atmospheric stagnation episodes.',
      'Future interannual variability, storm-track latitude shifts, and precipitation efficiency of Western Disturbances.',
      'Elevation-dependent warming impacts on snowfall fraction, precipitation phase transitions, and winter albedo feedbacks.',
      'Projected planetary boundary-layer height and ventilation coefficient trajectories across seasons.',
      'Climate-driven aridification and soil-moisture trends across upwind dust-source basins (Thar, Cholistan, Iranian Plateau, Central Asia, Taklamakan).',
      'Future wildland fire weather indices and forest/shrubland biomass-burning risk across Pir Panjal and Himalayan pine belts.',
      'Projected modifications in Indian Summer Monsoon northern penetration and autumn withdrawal timing.',
    ],
    methodologyAndDatasets: [
      'Bias-corrected CMIP6 multi-model ensemble and CORDEX-CORE high-resolution regional climate simulations over the Western Himalayas.',
      'Comparison of historical model hindcasts (1991–2020) against homogenized IMD observations to quantify elevation and valley-resolving bias.',
      'Air Stagnation Index (ASI) and Canadian Forest Fire Weather Index (FWI) projections adapted for mountain pressure levels.',
      'SSP emission-pathway co-evolution scenarios distinguishing meteorological forcing from future regional emission controls.',
    ],
    scientificDeliverable:
      'Scenario-stratified mid-century atmospheric dispersion and climate-penalty assessment for the Kashmir Valley with explicit model-spread bounds.',
    methodologicalCaveat:
      'Climate projections must strictly distinguish modelled scenario outputs (SSP/CMIP6/CORDEX) from observed historical meteorological trends, particularly given coarse GCM representation of Himalayan valley topography.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME II — THE PHYSICS OF KASHMIR'S ATMOSPHERE (CHAPTERS 06–10)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 6,
    code: '06',
    slug: 'chapter-06-the-mountains-that-trap-the-air',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: "The Physics of Kashmir's Atmosphere",
    title: 'The Mountains That Trap the Air',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Popular accounts of Kashmir’s air quality routinely oscillate between two physical caricatures: either portraying the Pir Panjal and Greater Himalayas as sealed stone walls that keep all external pollution out, or assuming regional smog sheets slide effortlessly across 4,000-metre ridges without resistance. Fluid dynamics in stratified mountain atmospheres supports neither extreme. Whether an approaching air parcel ascends over a mountain barrier or becomes blocked and deflected around it depends on the dimensionless Froude number—relating wind speed to Brunt-Väisälä static stability and barrier height.',
      'Within the basin, steep bounding walls restrict horizontal advective flushing, channel synoptically forced winds along the northwest–southeast Jhelum axis, and trigger lee waves, rotors, and pressure-driven gap flows across passes such as Qazigund–Banihal and the Uri gorge. Simultaneously, elevated free-tropospheric plumes riding above mountain crests can cross into Kashmir’s column overhead and subsequently entrain downward when afternoon convection or mountain-wave turbulence erodes the valley cap.',
    ],
    keyQuestionsAndScope: [
      'Froude-number and dividing-streamline physics governing flow blocking versus over-ridge transport across the Pir Panjal and Greater Himalayas.',
      'Valley lateral confinement, basin aspect ratio, and topographic channelling along the Anantnag–Srinagar–Baramulla axis.',
      'Gap winds and pressure-gradient acceleration through Banihal Pass, Jhelum Gorge (Uri), Zoji La, and Pir Ki Gali.',
      'Orographic gravity waves, lee-side downslope flows, rotor formation, and shear-driven vertical mixing.',
      'Elevated free-tropospheric aerosol advection above ridge height followed by convective or turbulent downward entrainment.',
      'Topographic shading effects on slope insolation asymmetry and premature evening stabilization in narrow side valleys.',
    ],
    methodologyAndDatasets: [
      'Dimensionless Froude number (Fr = U / NH) calculations using upstream ERA5 profiles and effective Pir Panjal barrier heights.',
      'Cross-barrier vertical cross-sections of potential temperature (isentropes), vertical velocity (omega), and horizontal wind vectors.',
      'High-resolution terrain-following mesoscale flow diagnostics at 3 km and 1 km horizontal grid spacing.',
      'Pass-corridor pressure-gradient time series comparing Jammu/Udhampur vs. Qazigund/Srinagar and Muzaffarabad vs. Baramulla.',
    ],
    scientificDeliverable:
      'Physical regime classification of flow blocking, pass channelling, and elevated over-barrier transport pathways into and out of the Kashmir Valley.',
    methodologicalCaveat:
      'Mountains must never be described as completely impermeable atmospheric walls: pollutants and gaseous precursors can cross mountain barriers through elevated circulation, mountain passes, and terrain-modified flows.',
  },
  {
    number: 7,
    code: '07',
    slug: 'chapter-07-the-invisible-ceiling-temperature-inversions',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: "The Physics of Kashmir's Atmosphere",
    title: 'The Invisible Ceiling: Temperature Inversions',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'In a standard convective troposphere, air temperature decreases with altitude, allowing warm, buoyant surface air parcels carrying combustion exhaust to rise and dilute across kilometres of vertical depth. During a temperature inversion, temperature increases with height (`∂T/∂z > 0`) across a ground-based or elevated layer, creating positive static stability that suppresses vertical buoyancy and acts as an invisible physical lid above the Kashmir Valley floor.',
      'Crucially, inversions in an enclosed Himalayan basin arise from multiple distinct physical mechanisms operating alone or in tandem: nocturnal surface radiation inversions driven by rapid longwave heat loss under clear skies; topographic cold-air pooling as dense katabatic air drains off snow-covered Pir Panjal and Zabarwan slopes into the valley trough; synoptic subsidence inversions produced by descending air beneath continental high-pressure ridges; and frontal inversions formed when warm air overrides cold trapped basin air ahead of an approaching Western Disturbance.',
    ],
    keyQuestionsAndScope: [
      'Surface radiation inversions: nocturnal onset timing, cooling rates, morning break-up mechanics, and suppression of break-up by persistent valley fog.',
      'Subsidence inversions: adiabatic warming of descending mid-tropospheric air under persistent subtropical high-pressure ridges.',
      'Topographic cold-air pooling (CAP) and basin heat-deficit accumulation across multi-day winter stagnation spells.',
      'Frontal and warm-advection inversions preceding Western Disturbance passages over trapped cold valley air.',
      'Elevated capping inversion layers bounding shallow daytime convective mixing.',
      'Quantification of inversion base height, top height, thickness (`Δz`), thermal jump (`ΔT`), lapse-rate strength (`°C/100 m`), and multi-day persistence.',
      'Contrasts between Srinagar’s urban heat-island modified surface layer and steeper rural/karewa radiative inversions.',
    ],
    methodologyAndDatasets: [
      'Available IMD Srinagar upper-air radiosonde soundings (00 UTC / 12 UTC) archived in IGRA v2 (Integrated Global Radiosonde Archive), audited for temporal completeness.',
      'Pseudo-vertical elevation-transect thermometry comparing valley-floor stations (Srinagar ~1,585 m, Qazigund ~1,720 m) against elevated stations (Gulmarg ~2,655 m, Pahalgam ~2,195 m) to compute valley bulk lapse rates.',
      'ERA5 model-level temperature and potential temperature profiles over central, northern, and southern Kashmir grid columns.',
      'Conceptual normal-lapse-rate vs. winter-inversion vertical schematic protocols clearly separated from empirical soundings.',
    ],
    scientificDeliverable:
      'Multi-mechanism taxonomy and climatology of Kashmir temperature inversions quantifying inversion depth, thermal strength, and multi-day persistence.',
    methodologicalCaveat:
      'Illustrative diagrams contrasting a normal atmosphere with a winter temperature inversion represent conceptual temperature profiles—not observed Srinagar radiosonde sounding data—unless stamped with a verified IGRA/IMD sounding timestamp and WMO station identifier.',
  },
  {
    number: 8,
    code: '08',
    slug: 'chapter-08-the-planetary-boundary-layer',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: "The Physics of Kashmir's Atmosphere",
    title: 'The Planetary Boundary Layer',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'The Planetary Boundary Layer (PBL) is the lowest turbulent layer of the atmosphere directly influenced by surface friction, solar heating, and evapotranspiration—representing the effective vertical dilution box into which all ground-level emissions mix. When the PBL collapses from more than 1,500–2,200 metres on a sunny summer afternoon to fewer than 200 metres on a calm December night, identical mass emission rates yield an order-of-magnitude surge in breathing-zone pollutant concentrations.',
      'Peer-reviewed empirical research in Srinagar analyzing multi-year black carbon observations from 2012–2017 demonstrated that severe winter carbonaceous aerosol accumulation is tightly coupled to inversions, low wind stagnation, and shallow boundary-layer heights spanning approximately 173 to 1,042 metres. Accurately diagnosing PBL dynamics in Kashmir requires examining surface sensible heat flux, turbulent kinetic energy (TKE), shear generation, entrainment-zone exchange, and why standard reanalysis bulk-Richardson parameterizations often misestimate mixing depth over snow-covered or fog-shrouded complex terrain.',
    ],
    keyQuestionsAndScope: [
      'Diurnal and seasonal evolution of mixing-layer height (`H_mix`) from nocturnal stable boundary layers (SBL) to daytime convective boundary layers (CBL) and residual layers.',
      'Surface sensible heat flux, latent heat flux, friction velocity (`u*`), and turbulent kinetic energy (TKE) budgets across urban, wetland, orchard, and snow surfaces.',
      'Monin-Obukhov length, Pasquill-Gifford-Turner / Richardson atmospheric stability classes, and mechanical vs. buoyant turbulence regimes.',
      'Residual-layer storage of aged pollutants overnight and morning fumigation downward onto the valley floor after sunrise.',
      'Entrainment-zone dynamics governing exchange between the valley boundary layer and the overlying mountain free troposphere.',
      'Synthesis of published Kashmir boundary-layer observations, including the 2012–2017 black carbon investigation documenting boundary-layer heights near 173–1,042 m.',
    ],
    methodologyAndDatasets: [
      'Historical Kashmir PBL literature synthesis (including 2012–2017 Srinagar black-carbon/PBL datasets; Foundational References 3 & 4).',
      'Intercomparison of ERA5, MERRA-2, and GFS/GDAS boundary-layer height diagnostics against radiosonde parcel/Richardson-number inversions.',
      'WRF-Chem boundary-layer parameterization sensitivity protocol (YSU non-local vs. MYJ / MYNN TKE schemes; linked to Chapter 44 `PBL-SENS`).',
      'Proposed ceilometer and micro-pulse lidar backscatter-gradient mixing-height validation rules.',
    ],
    scientificDeliverable:
      'Diurnal-seasonal Planetary Boundary Layer depth reference curves and reanalysis-bias evaluation for the Kashmir Valley.',
    methodologicalCaveat:
      'Published Srinagar boundary-layer ranges (~173–1,042 m in the 2012–2017 black carbon study) combine reanalysis/modelled PBL estimates with site observations; direct continuous ceilometer/lidar PBL measurements across Kashmir districts remain an urgent observational gap.',
  },
  {
    number: 9,
    code: '09',
    slug: 'chapter-09-mountain-and-valley-wind-systems',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: "The Physics of Kashmir's Atmosphere",
    title: 'Mountain and Valley Wind Systems',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Even when synoptic weather charts show weak macro-scale pressure gradients over northwestern South Asia, Kashmir’s steep topography generates its own internal thermally driven circulation engine. After sunrise, sunlit mountain slopes along the Zabarwan, Pir Panjal, and Sindh–Lidder flanks warm faster than adjacent free valley air at the same altitude, driving buoyant daytime upslope (anabatic) and up-valley winds. After sunset, radiative cooling reverses the horizontal temperature gradient, sending dense katabatic drainage flows sliding back down mountain valleys onto the Jhelum floodplain.',
      'Far from guaranteeing clean ventilation, this closed diurnal oscillation frequently acts as an atmospheric sloshing treadmill. Daytime anabatic breezes loft urban and kiln plumes partway up surrounding forested slopes and subalpine valleys—exposing Pahalgam, Gulmarg, and Sonamarg watersheds—only for nocturnal katabatic drainage and urban heat-island convergence to carry aged, chemically transformed aerosols back into Srinagar and valley-floor towns overnight.',
    ],
    keyQuestionsAndScope: [
      'Daytime upslope (anabatic) and up-valley wind onset, vertical depth, and afternoon speed maxima across differently oriented Himalayan aspects.',
      'Nighttime downslope (katabatic) drainage winds, tributary cold-air jets emerging from Lidder, Sindh, Sukhnag, and Vishav valleys, and basin pooling.',
      'Along-valley hydrostatically induced pressure gradients between southern (Anantnag–Qazigund), central (Srinagar–Budgam), and northern (Sopore–Baramulla) sub-basins.',
      'Interaction between Srinagar’s expanding urban heat island (UHI) and rural-to-urban nocturnal convergence breezes.',
      'Closed-cell diurnal recirculation of previously emitted valley pollutants ("atmospheric sloshing") across multi-day stagnation.',
      'Bi-directional aerosol transport linking 1,600 m valley-floor settlements with 2,200–3,000 m montane forests and cryospheric headwaters.',
    ],
    methodologyAndDatasets: [
      'Hourly surface wind vector roses and diurnal hodographs across valley-floor, piedmont, and montane stations.',
      '3 km / 1 km mesoscale wind-field simulations resolving anabatic/katabatic slope layers and counter-currents aloft.',
      'Lagrangian particle recirculation index quantifying return fraction of locally emitted tracers over 24- and 48-hour cycles.',
      'MODIS/Landsat land-surface temperature (LST) urban heat-island intensity gradients across Greater Srinagar.',
    ],
    scientificDeliverable:
      'Diurnal three-dimensional mountain-valley circulation model demonstrating upslope/downslope pollutant recirculation and multi-level wind shear.',
    methodologicalCaveat:
      'Single-level 10-metre surface anemometer observations at a valley-floor station cannot represent multi-layered slope flows, tributary drainage jets, or counter-directed winds aloft.',
  },
  {
    number: 10,
    code: '10',
    slug: 'chapter-10-atmospheric-ventilation-and-residence-time',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: "The Physics of Kashmir's Atmosphere",
    title: 'Atmospheric Ventilation and Residence Time',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'To translate boundary-layer physics and wind speed into a single operational metric of airshed flushing capacity, meteorologists define the simplified Ventilation Coefficient (`VC = H_mix × U`), expressed in square metres per second (`m²/s`), alongside the characteristic e-folding residence time of air within a confined basin. When both mixing height and wind speed contract simultaneously—for instance, an illustrative `H_mix = 250 m` paired with `U = 1.5 m/s`, yielding `VC = 375 m²/s`—horizontal flushing collapses to a fraction of open-plains dispersion norms.',
      'In an enclosed intermontane valley, however, even a low positive `VC` can overstate true atmospheric export if winds merely recirculate inside the topographic rim rather than exiting through mountain passes or ventilating into the free troposphere. This chapter couples `VC` calculations with Eulerian box-flushing and Lagrangian tracer residence-time analysis to determine how many hours or days a unit of particulate matter emitted in Srinagar, Budgam, or Pulwama remains trapped inside the human breathing zone.',
    ],
    keyQuestionsAndScope: [
      'Formulation and physical limits of the simplified Ventilation Coefficient (`VC = H_mix × U`) in complex basin terrain.',
      'Empirical distribution of hourly, daily, and seasonal `VC` values across the Kashmir Valley.',
      'Illustrative low-ventilation benchmark (`H_mix = 250 m`, `U = 1.5 m/s`, `VC = 375 m²/s`) and sensitivity across `H_mix` (100–1,500 m) and `U` (0.3–8.0 m/s).',
      'Distinction between local point `VC` and net basin export across topographic rims and pass cross-sections.',
      'Quantification of valley atmospheric residence time (`τ_res`) for non-reactive tracers, fine PM2.5, and water-soluble aerosols.',
      'Calibration of Kashmir-specific ventilation risk thresholds against observed multi-day PM2.5 accumulation slopes.',
    ],
    methodologyAndDatasets: [
      'Simplified ventilation equation `VC = H_mix × U` computed across ERA5 hourly gridded climatology (1991–2026) and Nov 2026 event windows.',
      'Mass-continuity basin box model integrating pass outflow fluxes and top-of-PBL entrainment.',
      'Passive-tracer decay experiments in WRF-Chem estimating 50% and 90% basin clearance half-lives under calm vs. disturbed regimes.',
    ],
    scientificDeliverable:
      'Kashmir Valley Atmospheric Ventilation & Residence-Time Atlas establishing empirical stagnation persistence curves and interactive VC screening parameters.',
    methodologicalCaveat:
      'The calculation `VC = 250 m × 1.5 m/s = 375 m²/s` is strictly an illustrative demonstration; Kashmir-specific regulatory ventilation risk thresholds (rather than borrowed plains thresholds such as 6,000 m²/s) must be established through local observational validation.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME III — THE REGIONAL ATMOSPHERIC ENGINE (CHAPTERS 11–15)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 11,
    code: '11',
    slug: 'chapter-11-the-subtropical-westerly-jet',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The Regional Atmospheric Engine',
    title: 'The Subtropical Westerly Jet',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'High above the Western Himalayas, between 200 and 300 hPa (roughly 9 to 12 kilometres altitude), the Subtropical Westerly Jet (SWJ) forms a planetary waveguide steering extratropical Rossby waves, upper-level divergence, and mid-latitude baroclinic disturbances across West, Central, and South Asia. Its seasonal meridional migration—shifting southward astride the Himalayan-Tibetan massif from October through May and retreating northward onto the Central Asian rim during the summer monsoon—orchestrates Kashmir’s fundamental weather calendar.',
      'Public commentary occasionally conflates high-speed upper-tropospheric westerlies with direct surface-level smoke transport into Srinagar. Scientifically, 200 hPa jet cores do not directly blow ground-level smoke into a 1,600-metre valley; rather, upper-level jet streaks, troughs, and ridges modulate synoptic-scale vertical motion (convergence/subsidence vs. dynamic ascent), steer lower-tropospheric Western Disturbances, and govern tropopause-to-boundary-layer exchange over the mountain arc.',
    ],
    keyQuestionsAndScope: [
      'Seasonal latitudinal migration, core altitude (200–300 hPa), wind-speed isotachs, and split-jet structure around the Tibetan Plateau.',
      'Rossby wave trains, upper-tropospheric troughs/ridges, and jet-streak ageostrophic circulation coupling upper and lower atmospheric layers.',
      'Mechanical and thermodynamic interaction between the Subtropical Westerly Jet and the Karakoram–Western Himalayan barrier.',
      'Dynamic control exerted by jet position on lower-tropospheric subsidence inversions during dry winter spells versus cyclogenesis during active storms.',
      'Vertical coupling pathways evaluating whether and when upper/mid-tropospheric dust or biomass plumes subside toward Himalayan ridge elevations.',
    ],
    methodologyAndDatasets: [
      'ECMWF ERA5 and NCEP/NCAR 500–200 hPa zonal/meridional wind, geopotential height, potential vorticity, and vertical velocity diagnostics (1991–2026).',
      'Wave-activity flux and jet-axis latitude/intensity indices correlated with Kashmir surface stagnation and precipitation anomalies.',
      'CALIOP/EarthCARE high-altitude aerosol curtain cross-sections beneath active jet-stream corridors.',
    ],
    scientificDeliverable:
      'Synoptic-dynamic synthesis quantifying how Subtropical Westerly Jet position and wave amplitude govern lower-tropospheric stability and storm steering over Kashmir.',
    methodologicalCaveat:
      'Upper-atmospheric jet-stream trajectories at 9–12 km altitude must never be assumed to deliver pollution directly to the Kashmir Valley surface without demonstrating physical downward transport and boundary-layer entrainment.',
  },
  {
    number: 12,
    code: '12',
    slug: 'chapter-12-western-disturbances-carriers-cleaners-or-redistributors',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The Regional Atmospheric Engine',
    title: 'Western Disturbances: Carriers, Cleaners or Redistributors?',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Extratropical synoptic systems embedded in the mid-latitude westerlies—known across South Asia as Western Disturbances (WDs)—originate over the Mediterranean, Caspian, Black Sea, and West Asian regions, acquiring secondary moisture from the Arabian Sea before impinging upon the Hindu Kush and Western Himalayas. For Kashmir’s hydrology, WDs are lifeblood; for Kashmir’s air quality, however, their role is complex, state-dependent, and fourfold.',
      'Approaching WDs can act first as atmospheric Importers, organizing pre-frontal southerly and southwesterly inflow that draws aerosol-rich boundary-layer air from northern Pakistan and the northwestern Indo-Gangetic Plain toward Himalayan slopes and passes. Strong Dry WDs lacking precipitation may act either as Ventilators—eroding valley inversions through turbulent momentum mixing—or as Redistributors that loft and relocate pollutants vertically and horizontally without removing mass. Finally, precipitating Wet WDs act as potent Cleansers via below-cloud impaction and in-cloud nucleation scavenging, often triggering dramatic overnight drops in valley PM2.5.',
    ],
    keyQuestionsAndScope: [
      'Synoptic life-cycle analysis of Western Disturbances across four functional air-quality roles: Importer, Ventilator, Cleanser, and Redistributor.',
      'Pre-frontal southerly/westerly warm-sector advection drawing regional haze plumes toward Pir Panjal passes ahead of trough passage.',
      'Dry vs. precipitating Western Disturbances: why overcast cloud decks and weak non-precipitating fronts can temporarily worsen stagnation before frontal passage.',
      'Below-cloud rainfall washout vs. snowfall crystal scavenging efficiencies across fine (PM2.5) and coarse (PM10) particle modes.',
      'Case-by-case synoptic reconstruction of every Western Disturbance and trough passage across the October–November 2026 buildup and event window.',
    ],
    methodologyAndDatasets: [
      'Automated Western Disturbance vortex/trough tracking catalog coupled with 850–500 hPa geopotential height, wind vectors, and moisture flux (IVT).',
      'IMD station precipitation, GPM IMERG half-hourly rain/snow rates, and pre-/post-storm PM2.5 & CAMS aerosol deltas.',
      'November 2026 synoptic pressure-wind-precipitation-aerosol timeline analysis.',
    ],
    scientificDeliverable:
      'Process classification and empirical event ledger distinguishing importing, ventilating, cleansing, and redistributing Western Disturbances over Kashmir.',
    methodologicalCaveat:
      'Western Disturbances must not be treated uniformly as pollution cleaners: weak or dry disturbances can import regional plumes ahead of the trough or cap valley inversions beneath pre-frontal clouds without wet scavenging.',
    structuredTable: {
      caption: 'Four potential atmospheric pollution roles of Western Disturbances in the Kashmir Himalayas',
      headers: ['Role', 'Mechanism'],
      rows: [
        ['Importer', 'Transport of aerosol-laden regional air'],
        ['Ventilator', 'Replacement or dispersal of stagnant valley air'],
        ['Cleanser', 'Removal of particles through precipitation'],
        ['Redistributor', 'Vertical and horizontal relocation of pollutants'],
      ],
    },
  },
  {
    number: 13,
    code: '13',
    slug: 'chapter-13-the-indian-summer-monsoon',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The Regional Atmospheric Engine',
    title: 'The Indian Summer Monsoon',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Although the Pir Panjal range places the Kashmir Valley in a partial orographic rain shadow relative to Jammu and Himachal Pradesh, the Indian Summer Monsoon (June–September) profoundly shapes regional atmospheric composition across the Western Himalayas. Strong southerly/southeasterly monsoonal currents pump moist Bay of Bengal and Arabian Sea air along the Himalayan foothills, intermittently breaching Banihal and southern passes during active monsoon pulses and monsoon-westerly interactions.',
      'From an atmospheric-pollution standpoint, the monsoon operates a dual balance: intense wet scavenging across northern India suppresses coarse dust and shortens aerosol lifetimes, yet deep moist convection along the southern Himalayan front lofts Indo-Gangetic boundary-layer gases and fine aerosols into the mid- and upper troposphere (feeding the Asian Tropopause Aerosol Layer). Equally critical is the autumn monsoon withdrawal window (late September–October): delayed or abrupt monsoon retreat modulates soil moisture, agricultural paddy harvest timing in Punjab/Haryana, and the onset of calm post-monsoon anticyclonic stagnation across Kashmir.',
    ],
    keyQuestionsAndScope: [
      'Thermodynamic and topographic pathways of Indian Summer Monsoon moisture incursion across the Pir Panjal into the Kashmir Valley.',
      'Deep convective uplift of plains pollutants along the Himalayan foothill convergence zone versus wet-deposition removal during monsoonal rainfall.',
      'Interaction episodes between mid-latitude westerly troughs and monsoonal moisture plumes over Kashmir.',
      'Timing of monsoon withdrawal from northwestern India and its cascading effect on October agricultural harvest, residue-burning windows, and autumn stagnation onset.',
      'High-humidity summer aerosol aqueous chemistry and biogenic-anthropogenic interactions.',
    ],
    methodologyAndDatasets: [
      'IMD monsoon onset/withdrawal isochrones, GPM IMERG precipitation, and ERA5 850/700 hPa equivalent potential temperature (`θ_e`) moisture transport vectors.',
      'MODIS/VIIRS aerosol optical depth and TROPOMI trace-gas anomalies across pre-monsoon, core monsoon, and post-monsoon transition pentads.',
      'Correlation analysis linking northwestern monsoon withdrawal dates (2001–2026) with October–November Kashmir turbidity anomalies.',
    ],
    scientificDeliverable:
      'Diagnostic evaluation of monsoonal wet scavenging, convective foothill uplift, and post-monsoon withdrawal controls on autumn air quality.',
    methodologicalCaveat:
      'High summer Aerosol Optical Depth during humid monsoonal incursions reflects substantial hygroscopic water uptake and cloud-halo contamination in satellite retrievals, requiring careful separation from dry particulate mass.',
  },
  {
    number: 14,
    code: '14',
    slug: 'chapter-14-regional-high-pressure-systems-and-atmospheric-stagnation',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The Regional Atmospheric Engine',
    title: 'Regional High-Pressure Systems and Atmospheric Stagnation',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Kashmir’s severest air-quality crises rarely coincide with dramatic storms; they unfold under deceptively tranquil skies dominated by persistent continental high-pressure ridges. Between passing Western Disturbances in late autumn and winter, expansive anticyclonic circulations anchor across northwestern South Asia, the Iranian-Afghan plateau, and the Western Himalayas, imposing large-scale synoptic subsidence (`ω > 0` in pressure coordinates).',
      'As mid-tropospheric air sinks, compresses, and warms adiabatically above the mountain rim, it reinforces valley-top capping inversions, weakens horizontal pressure gradients to near calm, clears upper cloud cover to maximize nocturnal surface radiative cooling, and locks the Kashmir basin into multi-day accumulation cycles. Under such persistent anticyclonic blocking, each day’s local emissions carry over into the next day’s residual background until a vigorous synoptic trough finally breaks the ridge.',
    ],
    keyQuestionsAndScope: [
      'Synoptic climatology of post-monsoon and winter anticyclonic circulation anomalies over northwestern India, Pakistan, and the Western Himalayas.',
      'Large-scale atmospheric subsidence rates, adiabatic warming aloft, and reinforcement of valley-top temperature inversions.',
      'Persistence distributions (3-day, 5-day, 10-day, and >14-day blocking episodes) of high-pressure stagnation regimes.',
      'Collapse of regional and valley-level horizontal wind speeds during synoptic col and ridge configurations.',
      'Cumulative multi-day carryover dynamics driving non-linear escalation of ground-level PM2.5 and black carbon.',
      'Synoptic breakdown mechanics when an approaching trough or Western Disturbance displaces stagnant ridge air.',
    ],
    methodologyAndDatasets: [
      'ERA5 500 hPa geopotential height anomalies, mean sea-level / 850 hPa pressure gradients, and 700 hPa vertical velocity (`ω`) composites.',
      'Modified Wang-Angell / NOAA Air Stagnation Index adapted for high-altitude complex terrain (combining upper-air wind, boundary-layer wind, and zero-precipitation criteria).',
      'Episode-accumulation slope regressions (`ΔPM2.5 / Δday`) during documented stagnation events including November 2026.',
    ],
    scientificDeliverable:
      'Synoptic blocking and multi-day atmospheric stagnation catalog establishing predictive ridge-persistence indicators for severe Kashmir smog episodes.',
    methodologicalCaveat:
      'Synoptic anticyclones explain why dispersion shuts down across multiple days, but accumulation slopes still depend directly on active emission fluxes beneath the ridge.',
  },
  {
    number: 15,
    code: '15',
    slug: 'chapter-15-atmospheric-connections-across-central-and-south-asia',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The Regional Atmospheric Engine',
    title: 'Atmospheric Connections Across Central and South Asia',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Situated near `34° N, 74–75.5° E`, the Kashmir Valley occupies an atmospheric crossroads where tropical-monsoonal South Asia, arid West Asia, continental Central Asia, and high-altitude Inner Asia converge. Depending on altitude and season, air parcels arriving above Kashmir trace back to moisture-bearing trajectories over the Arabian Sea, dust-mobilizing winds across the Iranian Plateau, Registan/Afghanistan, and Karakum–Kyzylkum deserts, densely populated combustion corridors across Pakistan’s Indus Basin and India’s Gangetic Plains, or high-elevation westerlies skirting the Pamir–Karakoram–Tarim rim.',
      'Synthesizing Volume III, this chapter constructs a multi-altitude continental circulation atlas that strictly separates climatologically prevalent seasonal transport corridors (such as dominant winter/spring western and southwestern pathways) from rare, episodic synoptic anomalies—providing the physical meteorological foundation required before testing geographic pollution sources in Volume V.',
    ],
    keyQuestionsAndScope: [
      'Seasonal synoptic air-mass connectivity linking Kashmir with the Arabian Sea, Iranian Plateau, Afghanistan, Pakistan, northern India, Central Asia, and the Himalayan-Tibetan system.',
      'Vertical stratification of transport corridors: low-level foothill/pass inflow (850–700 hPa) versus mid-tropospheric continental transport (600–400 hPa).',
      'Statistical frequency separation of dominant climatological pathways (>15% seasonal frequency) from episodic or rare circulation anomalies (<2–5% frequency).',
      'Typical synoptic transit times (12 h, 24 h, 48 h, 72 h, 120 h) from surrounding continental basins to Western Himalayan receptors relative to aerosol atmospheric lifetimes.',
    ],
    methodologyAndDatasets: [
      '30-year (1991–2020) and recent decadal (2016–2026) ERA5 multi-pressure-level streamline, moisture-flux, and wind-rose climatologies across `20°–45° N, 50°–90° E`.',
      'Clustered long-term kinematic back-trajectory density climatologies stratified by arrival elevation and season.',
      'Cross-tabulation of continental circulation clusters against MERRA-2 dust, sulfate, and carbonaceous optical depth anomalies.',
    ],
    scientificDeliverable:
      'Multi-altitude Central and South Asian Seasonal Atmospheric Circulation Atlas distinguishing dominant transport highways from rare episodic pathways.',
    methodologicalCaveat:
      'Atmospheric air-mass connectivity demonstrates meteorological pathway feasibility—not pollutant attribution—until coupled with verified upwind emissions, chemical transformation, survival against wet/dry removal, and valley downward mixing.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME IV — KASHMIR'S INDIGENOUS POLLUTION INVENTORY (CHAPTERS 16–20)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 16,
    code: '16',
    slug: 'chapter-16-residential-heating-and-winter-energy-consumption',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: "Kashmir's Indigenous Pollution Inventory",
    title: 'Residential Heating and Winter Energy Consumption',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Credible transboundary science begins with rigorous self-accounting inside Kashmir’s own airshed. Every autumn and winter, as ambient temperatures fall toward and below freezing while snowmelt-dependent regional hydropower output contracts sharply, hundreds of thousands of households, mosques, hotels, offices, and commercial establishments across the Kashmir Valley shift toward solid and liquid carbon combustion to survive winter cold.',
      'Low-temperature, oxygen-starved smouldering of firewood (willow, poplar, orchard prunings), charcoal in kangri braziers, cordwood in subterranean domestic and community hamam heating chambers, sheet-metal bukhari space heaters, coal or local lignite where utilized, kerosene heaters, and commercial/institutional diesel backup generators during peak evening power curtailments release concentrated plumes of primary PM2.5, black carbon, brown carbon, carbon monoxide, and polycyclic aromatic hydrocarbons directly into the shallow nocturnal inversion layer.',
    ],
    keyQuestionsAndScope: [
      'District- and urban/rural-stratified winter household fuel mix: firewood, orchard wood, charcoal (kangri), hamam cordwood, coal/lignite, LPG, kerosene, and electric heating.',
      'Combustion efficiency and emission factors (`g PM2.5 / kg fuel`, `g BC / kg`, `g OC / kg`, `g CO / kg`) for traditional Kashmiri bukharis, hamams, and kangri charcoal production/use.',
      'Quantification of backup diesel generator (DG set) fuel burn across hospitals, hotels, telecom towers, commercial markets, and residences during winter electricity curtailment hours.',
      'Diurnal emission timing profiles—particularly the 17:00–22:00 IST evening heating surge and 05:30–08:30 IST dawn firing coinciding with peak boundary-layer stability.',
      'Indoor-to-outdoor smoke exchange and hyper-local neighbourhood exposure gradients.',
    ],
    methodologyAndDatasets: [
      'Census housing energy microdata, NSSO household energy surveys, Forest/Social Forestry fuelwood supply estimates, and J&K Power Development Department winter curtailment schedules.',
      'Regionally appropriate Himalayan solid-fuel emission factors (COALESCE / IIASA GAINS / IIT Delhi carbonaceous stove testing databases) with uncertainty bounds.',
      'High-resolution (`1 km × 1 km`) spatial-temporal residential energy gridding weighted by population density, building typology, and Heating Degree Days.',
    ],
    scientificDeliverable:
      'Seasonally and diurnally resolved Kashmir Valley Residential & Commercial Winter Heating Emission Inventory with explicit fuel-factor uncertainty ranges.',
    methodologicalCaveat:
      'Informal domestic firewood, orchard pruning fuel, and artisanal charcoal consumption are substantially under-recorded in commercial tax ledgers; top-down fuel statistics must be cross-validated against household survey sampling and levoglucosan/potassium chemical tracers.',
  },
  {
    number: 17,
    code: '17',
    slug: 'chapter-17-transportation-and-urban-emissions',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: "Kashmir's Indigenous Pollution Inventory",
    title: 'Transportation and Urban Emissions',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Motor vehicle registrations across Jammu and Kashmir have expanded rapidly over the past two decades, concentrating passenger cars, aging diesel minibuses, three-wheelers, school buses, municipal trucks, and heavy inter-regional apple/freight carriers along narrow radial corridors converging on Srinagar and major district towns. At ~1,600 metres elevation (~15% lower ambient oxygen partial pressure than sea level) and sub-zero winter morning temperatures, internal combustion engines experience prolonged cold-start enrichment and incomplete diesel soot oxidation.',
      'Beyond tailpipe exhaust (`PM2.5`, elemental black carbon, `NOₓ`, `CO`, volatile organic compounds), urban traffic generates substantial non-exhaust particulate pollution via brake-pad and tyre-tread abrasion alongside mechanical resuspension of winter road grit, construction silt, and frost-damaged asphalt dust across high-congestion chokepoints such as Parimpora, Qamarwari, Jahangir Chowk, Hyderpora, Pantha Chowk, and NH-44.',
    ],
    keyQuestionsAndScope: [
      'Fleet composition by fuel type (diesel, petrol, CNG/LPG, electric), vehicle age, and Bharat Stage (BS-III/BS-IV/BS-VI) emission standard across Kashmir districts.',
      'Corridor-level traffic congestion, stop-and-go queuing, and stationary engine idling at bottlenecks, checkpoints, and school/hospital zones.',
      'Sub-zero and high-altitude cold-start emission multipliers for petrol hydrocarbons/CO and diesel black carbon/NOₓ.',
      'Non-exhaust vehicular particulates: brake wear, tyre wear, clutch dust, and trace-metal signatures (`Cu`, `Zn`, `Ba`, `Sb`).',
      'Silt-loading measurements and road-dust resuspension fluxes on unpaved shoulders, utility-trenched urban streets, and highway construction corridors.',
      'Heavy commercial freight fleets (horticulture outbound trucks, inbound fuel/supply tankers, and sand/gravel tippers).',
    ],
    methodologyAndDatasets: [
      'VAHAN / J&K Transport Department district vehicle registration cohorts adjusted for fleet survival and daily vehicle-kilometres travelled (VKT).',
      'COPERT / ARAI Indian emission factors adjusted for 1,600–2,700 m altitude and winter ambient temperature cold-start penalties.',
      'OpenStreetMap / GIS road-hierarchy network weighted by peak-hour congestion speeds and NH-44 freight axle counts.',
      'AP-42 / regional paved and unpaved road silt-resuspension parameterizations suppressed dynamically during wet/snow-covered road hours.',
    ],
    scientificDeliverable:
      'Link-resolved exhaust and non-exhaust transportation emission inventory (`PM2.5`, `PM10`, `BC`, `NOₓ`, `CO`, `NMVOCs`) for Greater Srinagar and all 10 Valley districts.',
    methodologicalCaveat:
      'Registered vehicle totals must be corrected for inactive vehicles, inter-district commercial transit, and wet-road suppression of resuspended dust rather than applying flat sea-level summer emission factors.',
  },
  {
    number: 18,
    code: '18',
    slug: 'chapter-18-industrial-and-commercial-pollution',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: "Kashmir's Indigenous Pollution Inventory",
    title: 'Industrial and Commercial Pollution',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Although Kashmir lacks mega-scale coal thermal power stations on the valley floor, stationary industrial and peri-urban point sources exert potent localized and basin-wide impacts when discharging into a shallow mountain airshed. Hundreds of brick kilns clustered across Budgam, Pulwama, and Anantnag; rotary cement plants and limestone quarries in the Khrew–Wuyan–Pampore belt; stone crushers and hot-mix macadam batching plants along riverbeds and highway corridors; industrial estates (Zainakote, Rangreth, Lassipora, Khonmoh, Bari Brahmana comparison); bakeries (`kandur` tandoors); and institutional boilers collectively emit coarse mineral dust, fine fly ash, `SO₂`, `NOₓ`, and black carbon.',
      'Crucially, brick kiln firing calendars (spring through late autumn) and cement/crusher operations overlap critical low-ventilation transition periods, while regulatory compliance on paper—such as nominal conversion from Fixed Chimney Bull’s Trench Kilns (FCBTK) to Induced-Draft Zig-Zag geometry or baghouse installation—depends entirely on actual fuel sulfur/ash quality, continuous draft-fan power, and unmonitored nocturnal filter performance.',
    ],
    keyQuestionsAndScope: [
      'Geolocated census of brick kilns across Budgam, Pulwama, Anantnag, and northern districts, distinguishing verified Zig-Zag conversions from FCBTK stacks and seasonal operating months.',
      'Cement clinker rotary kilns, captive power/coal mills, and limestone mining dust across the Khrew–Wuyan industrial cluster.',
      'Stone crushers, riverbed aggregate screening units, and asphalt hot-mix plants.',
      'Organized industrial estate boilers, cold-storage ammonia/diesel plants, plywood/veneer units, workshops, and commercial heating/baking establishments.',
      'Fuel quality audit: coal sulfur content, petroleum coke usage, sawmill wood waste, tyre/scrap adulteration, and stack particulate/SO₂ emission factors.',
      'Availability and gaps in Continuous Emission Monitoring System (CEMS) stack telemetry.',
    ],
    methodologyAndDatasets: [
      'High-resolution Sentinel-2 / Planet / Google Earth optical verification of active brick-kiln chimneys and quarry footprints cross-checked against JKPCC Consent-to-Operate (CTO) registries.',
      'Published South Asian brick-kiln stack measurement campaigns (FCBTK vs. Zig-Zag `PM2.5`, `BC`, `SO₂`, `CO` per kg fired brick) and cement baghouse efficiency ranges.',
      'TROPOMI `SO₂` and `NO₂` oversampled spatial enhancements over Khrew–Pampore and Budgam kiln belts.',
    ],
    scientificDeliverable:
      'Georeferenced stationary point-source and fugitive industrial emission registry for the Kashmir Valley with seasonal operating calendars.',
    methodologicalCaveat:
      'Actual facility inventories, active operating status, fuel types, and pollution-control equipment performance must be verified empirically before quantifying industrial source shares; consented paper capacity does not equal real-world emissions.',
  },
  {
    number: 19,
    code: '19',
    slug: 'chapter-19-agriculture-horticulture-and-biomass-combustion',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: "Kashmir's Indigenous Pollution Inventory",
    title: 'Agriculture, Horticulture and Biomass Combustion',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Every October and November (Harud), an unmistakable rural-to-urban smoke pulse accompanies post-harvest sanitation across Kashmir’s >1.6 lakh hectares of temperate apple, pear, walnut, and almond orchards alongside paddy fields and Chinar/poplar avenues. Orchardists clearing scab-infected fallen leaves and pruned woody branches ahead of winter snows—and urban or village households burning swept deciduous foliage—ignite thousands of dispersed, low-temperature smouldering fires late each afternoon just as radiative surface inversions form.',
      'Simultaneously, agricultural soils, livestock manure management, and nitrogenous urea application emit gaseous ammonia (`NH₃`), the primary alkaline reagent that neutralizes acidic `SO₂` and `NOₓ` oxidation products to form secondary ammonium sulfate and ammonium nitrate fine particulates. Dry autumn–winter spells also elevate wildland and forest-floor fire occurrence across Pir Panjal and Kehmil/Kamraj/Anantnag conifer compartments, injecting episodic biomass plumes directly above and into the valley.',
    ],
    keyQuestionsAndScope: [
      'Spatial and temporal quantification of autumn orchard pruning and fallen-leaf combustion across Shopian, Pulwama, Kulgam, Anantnag, Baramulla, Budgam, and Kupwara.',
      'Paddy straw, mustard stalk, and field-margin agricultural residue disposal practices within Kashmir.',
      'Urban and institutional deciduous leaf burning (Chinar, poplar, willow litter) across Srinagar and municipal towns.',
      'Agricultural and livestock ammonia (`NH₃`) emission inventories from synthetic fertilizer application and animal husbandry.',
      'Forest fires and scrub-burning episodes during dry autumn–winter anomalies (cross-linked with KEW Forest Fires hazard records).',
      'Chemical fingerprints of temperate C3 woody/foliar smoke (`K⁺`, levoglucosan, mannosan/galactosan ratios, brown carbon optical absorption).',
    ],
    methodologyAndDatasets: [
      'District horticulture area/tree-age inventories (Department of Horticulture / SKUAST-K) combined with pruning dry-matter residue generation rates and burned-fraction field bounds.',
      'VIIRS 375 m I-band and MODIS active fire detections supplemented by Sentinel-2 burn-scar / small-plume auditing (accounting for satellite omission of small dusk pile fires).',
      'Temperate orchard-wood and deciduous leaf smouldering emission factors (`PM2.5`, `OC`, `BC`, `BrC`, `NH₃`, `VOCs`).',
    ],
    scientificDeliverable:
      'Spatially gridded horticultural, agricultural, forest-fire, and ammonia emission inventory capturing Kashmir’s autumn Harud combustion peak.',
    methodologicalCaveat:
      'Polar-orbiting satellite fire sensors (early afternoon overpass) systematically miss small, short-lived dusk orchard-twig and garden-leaf bonfires (<50 m²); satellite counts alone severely underestimate local Kashmiri biomass burning unless paired with bottom-up agronomic and chemical-tracer methods.',
  },
  {
    number: 20,
    code: '20',
    slug: 'chapter-20-waste-construction-and-urban-expansion',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: "Kashmir's Indigenous Pollution Inventory",
    title: 'Waste, Construction and Urban Expansion',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Rapid peri-urban sprawl across Greater Srinagar and ribbon urbanization along valley highways affect Kashmir’s airshed through two coupled mechanisms: direct fugitive emissions and aerodynamic modification of the urban canopy. Unsegregated municipal solid waste burning in neighbourhood dumpsters, peri-urban drains, and landfill margins (including Achan and district dumping sites) releases toxic chlorinated organics, plastic pyrolysis aerosols, black carbon, and trace metals, while building demolition, concrete batching, flyover/ring-road earthworks, and trenched unpaved streets load coarse and fine mineral particulates into the boundary layer.',
      'Crucially, peer-reviewed historical measurements prove that Kashmir’s severe winter particulate pollution predates the November 2026 AQI controversy: a landmark 2018 *Scientific Reports* study documented ambient `PM2.5` reaching `348 µg/m³` during its Srinagar winter observation period, linking extreme concentrations to meteorological trapping alongside local and regional sources. Investigating how wetland infilling, floodplain construction, and dense multi-storey corridors alter urban surface roughness (`z_0`), urban heat storage, and natural Jhelum/wetland ventilation pathways bridges historical baselines with present-day urban exposure.',
    ],
    keyQuestionsAndScope: [
      'Open municipal solid waste burning across uncollected urban/rural pockets, commercial markets, and landfill fires.',
      'Demolition dust, large-scale highway/flyover earthworks, concrete mixing, brick/stone cutting, and unstabilized stockpiles.',
      'Unpaved neighbourhood roads and utility-excavated street corridors generating persistent fugitive mineral dust during dry spells.',
      'Landfill gas (`CH₄`, `H₂S`, `NMVOCs`) and smouldering subsurface fire risks at municipal waste sites.',
      'Multi-decadal land-use/land-cover (LULC) transformation—wetland shrinkage, karewa leveling, and built-up densification—and its aerodynamic impact on natural valley ventilation corridors.',
      'Contextualization against historical scientific baselines, including the 2018 *Scientific Reports* observation of Srinagar winter `PM2.5` reaching `348 µg/m³`.',
    ],
    methodologyAndDatasets: [
      'Municipal solid waste generation vs. collection-efficiency mass balances (SMC & ULB records cross-checked with KEW `solid-waste.ts` registry) to bound uncollected open-burned fractions.',
      'Multi-temporal Sentinel-2 and Landsat (1991–2026) urban imperviousness, karewa excavation, and wetland-loss GIS layers.',
      'Urban canopy aerodynamic roughness length (`z_0`) and sky-view factor modelling along Jhelum, Flood Spill Channel, and Dal–Anchar–Hokersar ventilation axes.',
      'Historical benchmark synthesis anchored by *Scientific Reports* (2018; PMC5820365) `348 µg/m³` winter `PM2.5` dataset.',
    ],
    scientificDeliverable:
      'Integrated waste-burning, construction-dust, and urban-corridor aerodynamic modification assessment contextualized against pre-2026 empirical PM2.5 extremes.',
    methodologicalCaveat:
      'Citing the 2018 *Scientific Reports* peak (`348 µg/m³`) establishes documented historical precedent for severe winter particulate episodes in Srinagar, but episode-specific values from earlier years must not be substituted for verified November 2026 ambient concentrations.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME V — THE GEOGRAPHY OF TRANSBOUNDARY POLLUTION (CHAPTERS 21–25)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 21,
    code: '21',
    slug: 'chapter-21-india-and-the-indo-gangetic-atmospheric-pollution-corridor',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The Geography of Transboundary Pollution',
    title: 'India and the Indo-Gangetic Atmospheric Pollution Corridor',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Immediately south of the Pir Panjal and Shiwalik foothills stretches the Indo-Gangetic Plain (IGP)—one of the most densely populated, intensively farmed, and heavily industrialized atmospheric basins on Earth. Across Delhi NCR, Punjab, Haryana, western Uttar Pradesh, northern Rajasthan, industrial valleys of Himachal Pradesh, and the Jammu plains, coal-fired power generation, dense diesel corridors, brick-kiln belts, urban combustion, mineral dust, and October–November post-monsoon paddy-residue burning generate vast regional plumes of fine aerosols and gaseous precursors (`SO₂`, `NOₓ`, `NH₃`, `CO`, `VOCs`).',
      'For Kashmir, however, the decisive scientific question is never merely whether the Indo-Gangetic Plain generates severe air pollution—that fact is thoroughly established—but whether, when, and by what physical mechanisms plains emissions overcome the 2,500–4,500-metre Pir Panjal barrier at concentrations and altitudes capable of altering breathing-height air quality inside the Kashmir Valley. Peer-reviewed receptor studies in Srinagar have previously identified the Trans-Gangetic Plains among potential particulate and black-carbon source regions, motivating a six-mechanism vertical and pass-transport investigation.',
    ],
    keyQuestionsAndScope: [
      'Regional emission characterization across seven source zones: Delhi NCR, Punjab, Haryana, Western Uttar Pradesh, Rajasthan, Himachal Pradesh, and the Jammu region.',
      'Mechanism 1 — Lower-atmospheric regional aerosol accumulation along the Shiwalik–Pir Panjal southern foothill ramp.',
      'Mechanism 2 — Daytime convective and synoptically forced orographic lifting along southern Himalayan slopes.',
      'Mechanism 3 — Elevated free-tropospheric aerosol sheet transport across Pir Panjal crestlines.',
      'Mechanism 4 — Channelled inflow through terrain-controlled mountain passes (notably the Udhampur–Ramban–Banihal–Qazigund corridor and Pir Ki Gali).',
      'Mechanism 5 — Subsequent convective entrainment or mountain-wave downward mixing from elevated plume layers onto the 1,600 m Kashmir Valley floor.',
      'Mechanism 6 — Gas-to-particle chemical conversion of transported `SO₂`, `NOₓ`, and `VOC` precursors during upslope transit.',
    ],
    methodologyAndDatasets: [
      'CALIOP / EarthCARE cross-Pir Panjal vertical lidar transects paired with MODIS MAIAC 1 km AOD and TROPOMI `CO`/`NO₂` column gradients.',
      'Transect comparison across Jammu, Udhampur, Ramban, Banihal/Qazigund, Anantnag, and Srinagar monitoring/reanalysis nodes.',
      'WRF-Chem `INDIA-OFF` sensitivity simulation (Chapter 44) and HYSPLIT multi-elevation arrival clusters.',
      'Cross-validation against published Srinagar receptor studies (*Science of The Total Environment*, 2021 & 2022; Foundational References 2 & 3).',
    ],
    scientificDeliverable:
      'Quantitative evaluation of cross-Pir Panjal and Banihal-corridor aerosol and precursor flux from northern Indian source regions into the Kashmir Valley.',
    methodologicalCaveat:
      'Severe smog over Delhi or Punjab must never be assumed to cause simultaneous Srinagar pollution without demonstrating matching southerly/southwesterly transport trajectories, pass/crest clearance, transit lag times, and downward boundary-layer mixing.',
    structuredTable: {
      caption: 'Indo-Gangetic and northern Indian regional source environments evaluated in Chapter 21',
      headers: ['Region', 'Principal emissions to investigate'],
      rows: [
        [
          'Delhi NCR',
          'Transportation, industrial emissions, construction and secondary aerosols',
        ],
        [
          'Punjab',
          'Agricultural residue burning, industry and residential combustion',
        ],
        [
          'Haryana',
          'Agriculture, industrial activities and transportation',
        ],
        [
          'Western Uttar Pradesh',
          'Industrial emissions, agriculture and biomass combustion',
        ],
        [
          'Rajasthan',
          'Natural dust, industrial activity and combustion',
        ],
        [
          'Himachal Pradesh',
          'Industrial clusters, transport, biomass combustion and forest fires',
        ],
        [
          'Jammu region',
          'Urban emissions, industry, road dust and seasonal combustion',
        ],
      ],
    },
  },
  {
    number: 22,
    code: '22',
    slug: 'chapter-22-pakistan-and-the-western-atmospheric-pollution-corridor',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The Geography of Transboundary Pollution',
    title: 'Pakistan and the Western Atmospheric Pollution Corridor',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Geographic proximity, prevailing synoptic westerlies, and the incised topographic conduit of the Jhelum River valley below Baramulla–Uri–Muzaffarabad make Pakistan’s northern plains and mountain valleys a central focus of transboundary inquiry. Across the Lahore–Gujranwala–Faisalabad–Sialkot industrial-urban quadrangle, Rawalpindi–Islamabad, the Peshawar Basin, northern Pakistani Punjab’s autumn rice-stubble belt, and adjacent foothill corridors, winter boundary layers regularly experience severe fine-particulate and carbonaceous smog.',
      'Peer-reviewed analysis of six years of black carbon observations in Srinagar identified northern Pakistan alongside the Trans-Gangetic region as significant potential source hotspots in Concentration Weighted Trajectory (CWT) and Potential Source Contribution Function (PSCF) mappings. Rigorous verification, however, requires testing time-lagged physical causality—determining whether verified emission surges in northern Pakistan precede measurable chemical and mass increases in western and central Kashmir (Uri → Baramulla → Srinagar) along observed pressure-driven westerly or up-gorge trajectories.',
    ],
    keyQuestionsAndScope: [
      'Source characterization across eight western corridor regions: Lahore metropolitan region, Gujranwala, Faisalabad, Sialkot, Rawalpindi–Islamabad, Peshawar Valley, Northern Punjab, and northern mountain regions.',
      'Channelled lower-tropospheric transport up the Jhelum Gorge (Muzaffarabad–Uri–Baramulla gateway) versus elevated westerly transport across Poonch, Kupwara, and Sadhna ridges.',
      'Time-lagged cross-correlation analysis accounting for realistic 12-to-72-hour advective transit speeds between Indus-basin plumes and Kashmir Valley receptors.',
      'Pre-frontal westerly and southwesterly transport surges organized ahead of approaching Western Disturbances.',
      'Chemical differentiation of imported high-temperature fossil/industrial sulfates and paddy-residue smoke from indigenous Kashmiri willow/poplar/orchard combustion.',
    ],
    methodologyAndDatasets: [
      'Multi-year CWT/PSCF receptor literature synthesis (including Srinagar 6-year black carbon dataset; Foundational Reference 3) paired with fresh November 2026 HYSPLIT ensembles.',
      'WRF-Chem `PAKISTAN-OFF` zero-out sensitivity experiment (Chapter 44) and western-gateway (Uri/Baramulla/Kupwara) cross-section flux diagnostics.',
      'VIIRS active fire detections, TROPOMI `NO₂`/`SO₂`/`CO` plumes, and CAMS regional reanalysis across northern Pakistan and AJK.',
    ],
    scientificDeliverable:
      'Lag-resolved meteorological and chemical evaluation of western-corridor aerosol and precursor transport from northern Pakistan into western and central Kashmir.',
    methodologicalCaveat:
      'Testing transboundary transport from Pakistan requires simultaneous 3D meteorological trajectory, pass-wind, and lag-time verification rather than visual juxtaposition of Lahore and Srinagar AQI headlines.',
    structuredTable: {
      caption: 'Western corridor source regions across Pakistan and adjoining mountain zones evaluated in Chapter 22',
      headers: ['Potential source region', 'Relevant emissions'],
      rows: [
        [
          'Lahore metropolitan region',
          'Urban combustion, transportation and industrial pollution',
        ],
        ['Gujranwala', 'Industrial combustion and particulate emissions'],
        ['Faisalabad', 'Manufacturing, agriculture and combustion'],
        ['Sialkot', 'Industrial and urban emissions'],
        [
          'Rawalpindi–Islamabad',
          'Transportation, construction and urban pollution',
        ],
        ['Peshawar Valley', 'Combustion, transportation and regional dust'],
        ['Northern Punjab', 'Agricultural burning and industrial emissions'],
        [
          'Northern mountain regions',
          'Local combustion, dust and terrain-modified transport',
        ],
      ],
    },
  },
  {
    number: 23,
    code: '23',
    slug: 'chapter-23-china-xinjiang-and-the-tibetan-atmospheric-system',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The Geography of Transboundary Pollution',
    title: 'China, Xinjiang and the Tibetan Atmospheric System',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Evaluating potential atmospheric linkages between western China and the Kashmir Valley demands exceptional geographical, altitudinal, and geochemical precision. Unlike the Indo-Gangetic or Indus plains—which lie upwind along lower-elevation southern and western approaches—Xinjiang’s Tarim Basin, the Taklamakan Desert, and the Tibetan Plateau are separated from Srinagar by the formidable 5,000–8,000-metre Karakoram, Kunlun, and Ladakh ranges, while prevailing mid-latitude westerlies flow predominantly from west to east rather than east to west.',
      'Recent peer-reviewed climate and satellite studies (including 2024 *Journal of Climate* and *GeoHealth* investigations alongside CALIOP lidar climatologies) confirm substantial mobilization of natural mineral dust from the Taklamakan Desert onto the Tibetan Plateau and high-altitude Asian free troposphere, while simultaneously demonstrating strong vertical and spatial barriers limiting low-level carbonaceous industrial aerosol exchange. Crucially, even if high-altitude mineral dust mobilized inside the Taklamakan reaches Western Himalayan skies under specific circulation anomalies, natural desert lithogenic dust originating within Chinese territory is a natural earth-system aerosol—never to be misclassified as Chinese industrial pollution.',
    ],
    keyQuestionsAndScope: [
      'Distinct physical evaluation of three western Chinese environments: Xinjiang urban-industrial corridors, the Taklamakan Desert natural dust basin, and the Tibetan Plateau high-altitude circulation system.',
      'Frequency test: how often do air-mass back-trajectories arriving in Kashmir actually originate over or traverse Xinjiang or the Tibetan Plateau?',
      'Vertical barrier and survival test: at what altitudes (`>4,000–6,000 m ASL`) does transport occur, and do coarse/fine particles survive gravitational settling and mountain impaction?',
      'Entrainment test: do elevated trans-Karakoram or Tibetan free-tropospheric aerosol layers ever mix downward into the 1,600 m Kashmir Valley boundary layer?',
      'Geochemical discrimination separating natural carbonate/silicate desert dust (`Ca²⁺`, `Al`, `Si`, `Fe`, low depolarization sphericity) from anthropogenic fossil/industrial combustion (`BC`, `SO₄²⁻`, trace heavy metals).',
    ],
    methodologyAndDatasets: [
      '120-hour multi-elevation HYSPLIT back-trajectory probability screening at 500 m, 1,500 m, and 3,000 m AGL over Kashmir and Ladakh.',
      'CALIOP / EarthCARE depolarization-ratio vertical curtains distinguishing non-spherical mineral dust from spherical combustion/pollution aerosols.',
      'WRF-Chem `CHINA-OFF` (anthropogenic-only) versus `DUST-OFF` (natural mineral dust) decoupled sensitivity experiments (Chapter 44).',
      'Literature synthesis anchored by 2014 ACP CALIOP and 2024 Tibetan Plateau dust attribution studies (Foundational References 5, 6 & 7).',
    ],
    scientificDeliverable:
      'Altitude-resolved meteorological and geochemical assessment testing whether western Chinese anthropogenic emissions or natural Taklamakan dust measurably influence Kashmir Valley air quality.',
    methodologicalCaveat:
      'Natural mineral dust originating within China (such as the Taklamakan Desert) must NEVER be automatically classified as anthropogenic industrial pollution attributable to China, nor can proximity on a flat map override Karakoram barrier physics and prevailing westerly flow.',
    structuredTable: {
      caption: 'Western Chinese and Tibetan geographical environments distinguished in Chapter 23',
      headers: ['Chinese geographical region', 'Relevant atmospheric process'],
      rows: [
        [
          'Xinjiang',
          'Mineral dust, industrial emissions and elevated aerosol transport',
        ],
        ['Taklamakan Desert', 'Long-range mineral dust mobilization'],
        [
          'Tibetan Plateau and adjoining regions',
          'High-altitude aerosol circulation and atmospheric exchange',
        ],
      ],
    },
  },
  {
    number: 24,
    code: '24',
    slug: 'chapter-24-afghanistan-iran-and-the-central-asian-atmospheric-corridor',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The Geography of Transboundary Pollution',
    title: 'Afghanistan, Iran and the Central Asian Atmospheric Corridor',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Upstream along the mid-latitude westerly storm track lie extensive arid and semi-arid dust basins alongside urban and energy-extraction combustion zones spanning Afghanistan (Registan, Sistan/Helmand ephemeral lakebeds, Kabul basin solid-fuel smoke, Hindu Kush valleys), the Iranian Plateau (Dasht-e Kavir, Dasht-e Lut, petrochemical/industrial belts), and Central Asia’s Karakum, Kyzylkum, and Aralkum deserts. During winter, spring, and dry autumn westerlies, synoptic cyclones and pre-frontal jets mobilize mineral dust and combustion aerosols eastward across the Hindu Kush toward northern Pakistan and the Western Himalayas.',
      'Published multi-year black carbon back-trajectory analyses in Srinagar have previously flagged sectors of Afghanistan and eastern Iran as potential long-range source regions. Methodologically, however, Lagrangian trajectories passing over transit countries can create false "pathway smearing" unless source-attribution models strictly separate the true geographic emission point of a particle from downstream territories across which the air parcel merely travelled.',
    ],
    keyQuestionsAndScope: [
      'Mineral dust mobilization and urban/winter solid-fuel combustion sources across Afghanistan and the Hindu Kush corridor.',
      'Iranian Plateau salt/playa dust systems (Sistan basin, Dasht-e Kavir, Dasht-e Lut) and industrial/refinery `SO₂` and carbonaceous emissions.',
      'Central Asian desert aerosol systems (Karakum, Kyzylkum, Aralkum desiccation dust) entrained into southward-diving westerly troughs.',
      'Methodological separation of primary emission origin from transit countries traversed along 72–120-hour transport pathways.',
      'Mineralogical and elemental ratios (`Ca/Al`, `Fe/Al`, `Mg/Al`, rare-earth signatures) distinguishing West/Central Asian dust from Thar/Indo-Gangetic soil dust.',
    ],
    methodologyAndDatasets: [
      'MODIS Deep Blue AOD, TROPOMI Absorbing Aerosol Index (AAI), and MERRA-2 dust column mass flux across `50°–75° E, 25°–45° N`.',
      'WRF-Chem `AFGHANISTAN-OFF`, `IRAN-OFF`, and `CENTRAL-ASIA-OFF` anthropogenic experiments paired with `DUST-OFF` natural aerosol runs.',
      'Residence-time weighted CWT/PSCF bias-correction ("residence-time deconvolution") to eliminate transit-corridor artifacts.',
    ],
    scientificDeliverable:
      'Long-range western/northwestern arid-corridor transport assessment separating origin-country anthropogenic emissions, natural desert dust, and transit-pathway air masses.',
    methodologicalCaveat:
      'Trajectory passage across Afghanistan, Iran, or Pakistan en route to Kashmir does not prove emission origin in the transit territory; emission-flux weighting and chemical/mineralogical markers are mandatory.',
  },
  {
    number: 25,
    code: '25',
    slug: 'chapter-25-the-western-himalayan-atmospheric-source-receptor-atlas',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The Geography of Transboundary Pollution',
    title: 'The Western Himalayan Atmospheric Source-Receptor Atlas',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Integrating Chapters 21 through 24, this concluding chapter of Volume V defines the cartographic and statistical specification for the *Western Himalayan Atmospheric Source-Receptor Atlas*. Rather than relying on rhetorical arrows drawn across political maps, a scientifically defensible source-receptor atlas represents transboundary connectivity as four-dimensional probability fields—stratified by month, season, arrival altitude above ground, aerosol chemical species, and explicit ensemble uncertainty.',
      'In its preliminary research-framework stage, conceptual schematics distinguish western source pathways, southern Indo-Gangetic pathways, and eastern high-altitude hypotheses strictly as testable research corridors rather than quantified contributions. Upon completion of the multi-year HYSPLIT, WRF-Chem, and chemical receptor campaigns specified in Volume IX, the atlas will publish validated monthly and seasonal source-receptor probability surfaces, vertical mountain cross-sections, emission density layers, and confidence bounds.',
    ],
    keyQuestionsAndScope: [
      'Synthesis of Western source corridors (Pakistan, Afghanistan, Iran, Central Asia), Southern corridors (Indo-Gangetic Plain, Jammu, NW India), and Eastern/Northern high-altitude hypotheses (Xinjiang, Taklamakan, Tibetan Plateau).',
      'Monthly and seasonal source-receptor footprint probability grids (`km⁻² hr`) across all 10 Kashmir Valley districts and high-elevation pass receptors.',
      'Vertical cross-section curtains illustrating over-barrier free-tropospheric transport versus pass-channelled boundary-layer inflow.',
      'Overlay of harmonized anthropogenic emission inventories, active biomass-burning density, and natural erodible dust-source masks.',
      'Explicit uncertainty cartography displaying meteorological-input spread and model-observation residuals.',
    ],
    methodologyAndDatasets: [
      'Ensemble Lagrangian footprint integration coupled with Eulerian adjoint / zero-out sensitivity fields.',
      'Standardized WGS84 / UTM Zone 43N geospatial data cubes exported to the KEW Atmospheric Intelligence Observatory.',
      'Strict visual-governance symbology rules differentiating conceptual research schematics from validated empirical trajectories.',
    ],
    scientificDeliverable:
      'Multi-layer seasonal and monthly Western Himalayan Atmospheric Source-Receptor Atlas with explicit vertical cross-sections and uncertainty masks.',
    methodologicalCaveat:
      'Any preliminary source-receptor schematic is strictly a conceptual research diagram—not a geographical wind observation or validated transport trajectory—where arrow styles denote proposed research hypotheses rather than quantified country contributions.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME VI — THE CHEMISTRY OF THE AIR KASHMIR BREATHES (CHAPTERS 26–30)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 26,
    code: '26',
    slug: 'chapter-26-the-anatomy-of-particulate-matter',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Chemistry of the Air Kashmir Breathes',
    title: 'The Anatomy of Particulate Matter',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Public air-quality debates frequently treat "particulate matter" as a single uniform substance. Physically and toxicologically, ambient aerosols span more than four orders of magnitude in dimension—from freshly nucleated ultrafine combustion clusters below `0.1 µm` (`PM0.1`), through accumulation-mode fine particles below `2.5 µm` aerodynamic diameter (`PM2.5`), to coarse mineral, quarry, road-grit, and bioaerosol fragments up to `10 µm` (`PM10`)—customarily contrasted against an illustrative `~50 µm` human hair.',
      'Aerodynamic diameter, particle morphology, density, and surface chemistry jointly dictate every stage of an aerosol’s life cycle and health hazard: coarse `PM2.5–10` quarry or road dust settles gravitationally within kilometres and lodges primarily in the upper nasopharyngeal airways, whereas sub-micron `PM2.5` and ultrafine `PM0.1` combustion and secondary droplets remain suspended for days across hundreds of kilometres, penetrate deep into alveolar gas-exchange sacs, and translocate inflammatory oxidants into the systemic bloodstream.',
    ],
    keyQuestionsAndScope: [
      'Coarse fraction (`PM10` and `PM2.5–10`): crustal silicates, Khrew/Wuyan limestone dust, road-grit resuspension, pollen, and rapid dry sedimentation.',
      'Fine fraction (`PM2.5` and `PM1`): primary soot, organic biomass tar balls, and secondary accumulation-mode sulfate/nitrate/ammonium droplets.',
      'Ultrafine particles (`PM0.1` / `<100 nm`) and particle number concentration (`PNC`) spikes along congested urban diesel and domestic stove plumes.',
      'Tri-modal aerosol size distributions (nucleation, Aitken, accumulation, and coarse modes) across seasons in Kashmir.',
      'Bulk and single-particle chemical composition: carbonaceous fractions (`OC`/`EC`), water-soluble inorganic ions, crustal oxides, and toxic trace metals (`Pb`, `Cr`, `As`, `Ni`, `Cd`).',
      'Particle morphology (fractal soot aggregates vs. aged core-shell droplets vs. angular mineral shards) and hygroscopicity parameter (`κ`).',
    ],
    methodologyAndDatasets: [
      'Size-segregated cascade impactor, aerodynamic particle sizer, and scanning mobility particle sizer protocols paired with filter gravimetry.',
      'Scanning/transmission electron microscopy with energy-dispersive X-ray spectroscopy (SEM-EDX / TEM) single-particle morphology characterization.',
      'PM2.5 / PM10 mass-ratio diagnostics separating combustion-dominated winter smog (`PM2.5/PM10 > 0.65`) from spring/construction coarse dust episodes (`PM2.5/PM10 < 0.35`).',
    ],
    scientificDeliverable:
      'Size-resolved physical, morphological, and elemental speciation profile of Kashmir Valley ambient aerosols across combustion and crustal regimes.',
    methodologicalCaveat:
      'Comparisons against a representative `50 µm` human hair are illustrative visual aids only; actual human hair thickness varies widely (`~40–100 µm`), and regulatory `PM10`/`PM2.5` fractions are defined strictly by 50% cut-point aerodynamic equivalent diameter.',
  },
  {
    number: 27,
    code: '27',
    slug: 'chapter-27-black-carbon-the-pollutant-connecting-air-quality-and-climate',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Chemistry of the Air Kashmir Breathes',
    title: 'Black Carbon: The Pollutant Connecting Air Quality and Climate',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Black carbon (BC)—the graphitic, strongly light-absorbing component of soot formed by incomplete combustion of fossil fuels, biomass, and biofuels—occupies a uniquely destructive nexus in the Western Himalayas. Within the breathing zone, sub-micron soot aggregates carry adsorbed polycyclic aromatic hydrocarbons (PAHs) and transition metals deep into human lungs while degrading horizontal visibility across Srinagar and valley towns.',
      'Simultaneously, within the atmospheric column and across surrounding Himalayan snowfields, black carbon absorbs incoming shortwave solar radiation—warming the elevated aerosol layer (which thermodynamically strengthens underlying temperature inversions!) while darkening snow and glacier surfaces upon deposition to accelerate cryospheric melt. Multi-year multi-wavelength aethalometer studies in Srinagar (2012–2017 and subsequent campaigns) already establish pronounced winter black carbon peaks driven by wood/biomass heating and fossil diesel combustion under shallow boundary layers.',
    ],
    keyQuestionsAndScope: [
      'Multi-wavelength optical absorption physics distinguishing high-temperature fossil-fuel black carbon (`BC_ff`, absorption Ångström exponent `α ≈ 1.0`) from lower-temperature biomass-burning soot and UV-absorbing brown carbon (`BC_bb` / `BrC`, `α ≈ 1.8–2.2`).',
      'Atmospheric column heating by absorbing BC aloft and the "semi-direct aerosol feedback" stabilizing lower-valley temperature inversions.',
      'Diurnal bimodal BC peaks in Srinagar (morning traffic + dawn heating peak; sharp evening heating + collapsing PBL surge) and seasonal winter amplification.',
      'Internal mixing and hydrophilic coating ("lensing amplification") of fresh hydrophobic soot during residence in humid Kashmir air.',
      'Dry and wet deposition pathways linking valley black carbon plumes to snow-albedo reduction across Pir Panjal and Greater Himalayan glaciers.',
    ],
    methodologyAndDatasets: [
      'Seven-wavelength (`370–950 nm`) aethalometer Sandradewi two-component (`BC_ff` vs. `BC_bb`) source-partitioning equations and thermal-optical `EC`/`OC` calibration.',
      'Synthesis of published Srinagar black carbon series (2017 *Atmospheric Environment* and 2022 *Science of The Total Environment*; Foundational References 3 & 4).',
      'Radiative transfer calculations quantifying top-of-atmosphere, atmospheric-column, and surface radiative forcing (`W/m²`).',
    ],
    scientificDeliverable:
      'Dual health-and-climate assessment of Kashmir black and brown carbon quantifying fossil vs. biomass fractions, inversion-heating feedbacks, and cryospheric export.',
    methodologicalCaveat:
      'Aethalometer source partitioning depends sensitively on assumed fossil and biomass absorption Ångström exponents (`α_ff`, `α_bb`); sensitivity ranges and thermal-optical elemental carbon cross-checks are mandatory.',
  },
  {
    number: 28,
    code: '28',
    slug: 'chapter-28-secondary-inorganic-aerosols',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Chemistry of the Air Kashmir Breathes',
    title: 'Secondary Inorganic Aerosols',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'A large fraction of winter fine particulate mass (`PM2.5`) was never emitted from any chimney or tailpipe as a solid particle. Instead, Secondary Inorganic Aerosols (SIA)—principally ammonium sulfate (`(NH₄)₂SO₄`), ammonium bisulfate (`NH₄HSO₄`), and ammonium nitrate (`NH₄NO₃`)—crystallize or condense in the atmosphere when gaseous sulfur dioxide (`SO₂` from kilns and coal combustion) and nitrogen oxides (`NOₓ` from vehicles and industry) oxidize into sulfuric and nitric acids and react with gaseous ammonia (`NH₃` from agriculture, livestock, waste, and biomass fires).',
      'Cold winter temperatures and high relative humidity inside the Kashmir Valley strongly favour thermodynamic partitioning of semi-volatile nitric acid and ammonia into the particulate ammonium nitrate phase. Crucially, this gas-particle chemistry profoundly complicates transboundary attribution: gaseous `SO₂` or `NOₓ` transported across a mountain pass may react with locally emitted Kashmiri agricultural `NH₃`—creating hybrid secondary particles whose mass belongs neither purely to external import nor purely to local primary emission.',
    ],
    keyQuestionsAndScope: [
      'Gas-phase and heterogeneous/aqueous-phase oxidation rates converting `SO₂ → H₂SO₄ → SO₄²⁻` (Sulfur Oxidation Ratio, `SOR`) and `NOₓ → HNO₃ / N₂O₅ → NO₃⁻` (Nitrogen Oxidation Ratio, `NOR`).',
      'Cold-temperature thermodynamic shift driving semi-volatile `NH₄NO₃` condensation during sub-10 °C Kashmiri autumns and winters.',
      'Ammonia-rich vs. nitric-acid/sulfate-limited chemical regimes across urban Srinagar and rural horticultural/livestock districts.',
      'Acid neutralization buffering by alkaline calcium/magnesium carbonate dust (`CaCO₃`) near Khrew cement/quarry plumes.',
      'Why cross-border transport of invisible gaseous precursors invalidates simplistic "visible smoke plume" attribution models.',
    ],
    methodologyAndDatasets: [
      'Ion chromatography (`SO₄²⁻`, `NO₃⁻`, `NH₄⁺`, `Cl⁻`, `K⁺`, `Ca²⁺`, `Mg²⁺`, `Na⁺`) on 24-hour filter extracts paired with co-located `SO₂`, `NO₂`, and `NH₃` gas measurements.',
      'ISORROPIA-II thermodynamic equilibrium modelling evaluating aerosol pH, liquid water content, and nitrate sensitivity to precursor reductions.',
      'WRF-Chem `CHEMISTRY-SENS` nonlinear gas-aerosol partitioning experiments (Chapter 44).',
    ],
    scientificDeliverable:
      'Thermodynamic regime diagnosis of secondary sulfate-nitrate-ammonium formation in Kashmir identifying limiting gaseous precursors and hybrid local-transboundary coupling.',
    methodologicalCaveat:
      'In ammonia-rich winter atmospheres, reducing `SO₂` alone can free `NH₃` to form replacement `NH₄NO₃` ("nitrate substitution"), demonstrating why linear additive attribution fails for secondary inorganic aerosols.',
  },
  {
    number: 29,
    code: '29',
    slug: 'chapter-29-secondary-organic-aerosols-and-photochemistry',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Chemistry of the Air Kashmir Breathes',
    title: 'Secondary Organic Aerosols and Photochemistry',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Organic matter frequently constitutes 30% to more than 60% of ambient `PM2.5` mass in Himalayan basins, comprising both Primary Organic Aerosol (POA) emitted directly from biomass heating, orchard burning, cooking, and traffic, and Secondary Organic Aerosol (SOA) formed when volatile, intermediate-volatility, and semi-volatile organic compounds (`VOCs`/`IVOCs`/`SVOCs`) undergo atmospheric oxidation and condense onto pre-existing particles.',
      'Kashmir exhibits two contrasting seasonal organic-chemistry regimes. During warm, high-insolation summer months ( enhanced by 1,600–3,000 m UV actinic flux), biogenic terpenes and isoprene emitted by extensive conifer forests (`Pinus wallichiana`, `Cedrus deodara`) and orchards react with urban `NOₓ` and hydroxyl radicals (`OH`) to drive tropospheric ozone (`O₃`) and biogenic SOA formation. During cold, dark winter inversions, phenolic, furanic, and aromatic precursors from residential wood/charcoal smoke undergo rapid nocturnal nitrate-radical (`NO₃`) and aqueous-fog aging, generating oxygenated organic aerosols and light-absorbing secondary brown carbon.',
    ],
    keyQuestionsAndScope: [
      'Precursor inventory spanning anthropogenic aromatics (benzene, toluene, xylenes from petrol/solvents), biomass-burning phenols/furans, and biogenic forest monoterpenes/isoprene.',
      'Daytime photochemical hydroxyl (`OH`) and ozone (`O₃`) oxidation pathways versus nighttime nitrate-radical (`NO₃`) oxidation inside stagnant winter layers.',
      'Summer high-altitude photochemical ozone (`O₃`) production regimes (`NOₓ`-limited vs. `VOC`-limited) and risks to human lungs and orchard/saffron foliage.',
      'Cold-season volatility basis set (VBS) condensation of semi-volatile biomass-smoke organics at temperatures near 0 °C.',
      'Formation and photochemical bleaching of secondary organic brown carbon (`BrC`).',
    ],
    methodologyAndDatasets: [
      'Thermal-optical `OC`/`EC` minimum-ratio (`(OC/EC)_pri`) tracer estimation and Positive Matrix Factorization / Aerosol Mass Spectrometry (`OOA` vs. `BBOA` vs. `HOA`) protocols.',
      'Continuous UV-photometric surface ozone (`O₃`), `NO`/`NO₂`, and speciated `VOC` canister/PTR-MS measurement frameworks.',
      'WRF-Chem Volatility Basis Set (VBS) / MOZART-MOSAIC organic aerosol parameterization tests.',
    ],
    scientificDeliverable:
      'Seasonal partitioning of primary vs. secondary organic aerosols and summer vs. winter photochemical oxidant budgets across the Kashmir Valley.',
    methodologicalCaveat:
      'Standard regulatory monitoring in J&K rarely measures speciated VOCs or organic molecular markers; until local filter/AMS campaigns are completed, SOA fractions carry wider parameterization uncertainty than inorganic ions.',
  },
  {
    number: 30,
    code: '30',
    slug: 'chapter-30-humidity-fog-and-atmospheric-aerosol-growth',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Chemistry of the Air Kashmir Breathes',
    title: 'Humidity, Fog and Atmospheric Aerosol Growth',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Lying across extensive open waterbodies, marshes, and irrigated floodplains (Dal, Wular, Anchar, Hokersar, Jhelum trunk), the Kashmir Valley floor routinely experiences nocturnal and morning relative humidity (`RH`) between `85%` and `99%` alongside dense radiation fog throughout late autumn and winter. Under these near-saturated conditions, water-soluble inorganic salts (sulfates, nitrates) and oxygenated organic particles absorb ambient water vapour via `κ`-Köhler hygroscopic growth—expanding two- to fourfold in scattering cross-section as aerosol liquid water content (`ALWC`) surges.',
      'This chapter forms the vital physical bridge between Volume VI (Atmospheric Chemistry) and Volume VII (Measurement Integrity). Chemically, microscopic water shells and fog droplets act as Tiny Aqueous Reactors accelerating heterogeneous `SO₂` and `N₂O₅` conversion into particulate mass ("fog processing"). Metrologically, while regulatory reference instruments heat or equilibrate sample air (`~35–50% RH`) to weigh true dry toxic particulate mass, unheated low-cost laser optical particle sensors mistake swollen water-coated fog aerosols for massive solid `PM2.5` spikes—explaining why foggy Srinagar mornings trigger extreme divergences between consumer apps and reference monitors.',
    ],
    keyQuestionsAndScope: [
      'Deliquescence, efflorescence, and `κ`-Köhler hygroscopic diameter growth factors (`gf(RH)`) of Kashmiri winter aerosols across `40%–99% RH`.',
      'Aerosol Liquid Water Content (`ALWC`) and radiation-fog microphysics over wetland-adjacent Srinagar, Bandipora, and Jhelum riverine corridors.',
      'Aqueous-phase heterogeneous oxidation of `SO₂` (via `H₂O₂`, `O₃`, transition-metal catalysis, and `NO₂` in buffered droplets) accelerating winter sulfate/nitrate buildup.',
      'Post-fog evaporation residuals leaving behind denser, larger accumulation-mode smog particles.',
      'Optical scattering enhancement factor (`f(RH)`) inflating unheated nephelometer and consumer laser-sensor `PM2.5` readings by `2×` to `>3.5×` above `85–90% RH`.',
      'Regulatory dry-mass equilibration (`20–23 °C, 35–40% RH`) versus ambient wet-aerosol light extinction.',
    ],
    methodologyAndDatasets: [
      '`κ`-Köhler theory coupled with ISORROPIA-II `ALWC` predictions and co-located ambient temperature/relative-humidity/visibility logs.',
      'Paired heated Beta Attenuation Monitor (BAM) / gravimetric filter vs. unheated low-cost optical nephelometer (`PM_optical / PM_reference` vs. `RH`) calibration curves.',
      'IMD Srinagar synoptic visibility and radiation-fog duration records during the November 2026 episode.',
    ],
    scientificDeliverable:
      'Quantitative Kashmir winter hygroscopic growth (`f(RH)`) correction model separating genuine aqueous chemical mass production from optical fog-droplet sensor inflation.',
    methodologicalCaveat:
      'Correcting unheated optical sensors for high relative humidity removes water-droplet scattering bias, NOT real aqueous-phase sulfate/nitrate mass formed inside fog—both physical dry-mass growth and optical artifact must be quantified separately.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME VII — THE NUMBERS WE CANNOT TRUST (CHAPTERS 31–35)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 31,
    code: '31',
    slug: 'chapter-31-reconstructing-the-aqi-708-event',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The Numbers We Cannot Trust',
    title: 'Reconstructing the AQI 708 Event',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Around November 27–28, 2026, *Daily Excelsior* documented an acute public controversy across Srinagar: during the stagnant November 26–27 pollution episode, private air-quality aggregator platform `AQI.in` displayed an alarming Srinagar reading of `708`, whereas official Jammu and Kashmir Pollution Control Committee (JKPCC) observations stood near `~140`, with other private portals reporting widely scattered intermediate figures. Overnight, screenshots of `708` circulated across Kashmir as putative proof of catastrophic valley-wide air toxicity, while official assurances failed to explain why public-facing screens differed by fivefold.',
      'Scientifically, `708` on a commercial aggregator platform is a reported private-platform reading—not an independently validated valley-wide or official regulatory AQI measurement. Reconstructing what actually transpired in Srinagar’s air on November 26–27, 2026 requires forensic metrological auditing across 12 mandatory metadata fields for every single station and platform, separating genuine hyper-local evening smoke plumes from unheated fog-scattering inflation, instantaneous 1-minute/1-hour peaks vs. 24-hour rolling averages, and uncalibrated breakpoint extrapolations.',
    ],
    keyQuestionsAndScope: [
      'Chronological hour-by-hour forensic reconstruction of the November 26–27, 2026 Srinagar pollution episode across all archived public, community, and private feeds.',
      'Execution of the 12-field metrological audit (timestamp, time zone, coordinates, elevation, instrument type, raw concentration, dominant pollutant, averaging period, AQI standard, calibration status, QA flags, algorithmic post-processing) on both the `708` (`AQI.in`) and `~140` (`JKPCC`) reports.',
      'Micro-siting audit: was a private optical node positioned directly adjacent to a domestic chimney, leaf fire, tandoor, or diesel generator while the official station sat inside a sheltered green enclave?',
      'Meteorological co-audit: boundary-layer height, calm wind speed, nocturnal temperature drop, and `>85–95% RH` radiation fog across Srinagar during November 26–27, 2026.',
      'Cross-comparison against independent satellite column indicators (TROPOMI `CO`/`NO₂`/AAI, MODIS/VIIRS AOD) and KEW’s community AirGradient + CAMS delta records.',
    ],
    methodologyAndDatasets: [
      'Documentary baseline from *Daily Excelsior* (Nov 27–28, 2026; Foundational Reference 11) paired with archived hourly API/platform snapshots, JKPCC/CPCB logs, and KEW `air-quality-registry.ts` telemetry.',
      '12-Field AQI Forensic Verification Ledger applied symmetrically to every official and non-regulatory node.',
      'IMD Srinagar hourly temperature, dewpoint/relative humidity, wind speed, and visibility observations for Nov 20–28, 2026.',
    ],
    scientificDeliverable:
      'Forensic technical reconstruction report of the November 26–27, 2026 Srinagar AQI `708` vs. `~140` divergence isolating spatial, physical, instrumental, and mathematical causes.',
    methodologicalCaveat:
      'The figure `708` must always be labeled strictly as a "Reported private-platform AQI" and never cited as an independently validated valley-wide or official regulatory measurement; conversely, official `~140` figures must also undergo full 12-field raw-data and siting verification.',
    structuredTable: {
      caption: 'Mandatory 12-field forensic verification protocol for every reported Srinagar AQI observation',
      headers: ['Required field', 'Why it matters'],
      rows: [
        [
          'Observation timestamp',
          'Prevents comparison of different pollution episodes',
        ],
        ['Time zone', 'Prevents incorrect temporal alignment'],
        [
          'Monitoring coordinates',
          'Establishes spatial representativeness',
        ],
        [
          'Station elevation',
          'Identifies vertical atmospheric differences',
        ],
        ['Instrument type', 'Establishes measurement principle'],
        [
          'Pollutant concentration',
          'Provides the underlying scientific observation',
        ],
        [
          'Dominant pollutant',
          'Identifies the pollutant controlling AQI',
        ],
        [
          'Averaging period',
          'Distinguishes short peaks from sustained exposure',
        ],
        [
          'AQI standard',
          'Distinguishes national calculation systems',
        ],
        ['Calibration status', 'Evaluates data reliability'],
        [
          'Data-quality flags',
          'Identifies invalid or questionable measurements',
        ],
        [
          'Processing history',
          'Identifies algorithmic adjustments',
        ],
      ],
    },
  },
  {
    number: 32,
    code: '32',
    slug: 'chapter-32-the-science-of-the-air-quality-index',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The Numbers We Cannot Trust',
    title: 'The Science of the Air Quality Index',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'A foundational source of public confusion is treating the Air Quality Index (AQI) as if it were a physical atmospheric quantity like temperature in kelvins or particulate mass in micrograms per cubic metre (`µg/m³`). In reality, AQI is a policy-constructed, dimensionless communication index calculated by mapping measured or estimated pollutant concentrations through piecewise linear concentration-to-index breakpoint tables (`I_p = ((I_H - I_L)/(C_H - C_L)) × (C_p - C_L) + I_L`) and selecting the maximum valid sub-index.',
      'Because different jurisdictions design their breakpoints around different domestic standards and averaging rules, the exact same physical air parcel yields substantially different AQI numbers depending on the formula applied. At `PM2.5 = 65 µg/m³`, India’s CPCB NAQI classifies air as "Satisfactory/Moderate" (`NAQI ≈ 117`), whereas the revised US EPA AQI places the same concentration well into "Unhealthy" (`US AQI ≈ 161`); conversely, above `250 µg/m³`, India’s steeper Severe slope escalates rapidly toward `500` while commercial apps often feed instantaneous 10-minute optical spikes directly into 24-hour equations.',
    ],
    keyQuestionsAndScope: [
      'Mathematical derivation and piecewise linear behaviour of the pollutant sub-index equation `I_p = ((I_H - I_L)/(C_H - C_L)) × (C_p - C_L) + I_L`.',
      'Minimum pollutant-availability rules (e.g., CPCB requirement of ≥3 pollutants including PM2.5 or PM10, and ≥16 valid hours in a rolling 24-hour window).',
      'Side-by-side breakpoint slope comparison across India CPCB NAQI, US EPA AQI (including 2024 PM2.5 revision vs. legacy tables), WHO Air Quality Guidelines, European EAQI, and Chinese MEP AQI.',
      'Distortion introduced when real-time consumer portals substitute 1-minute or 1-hour instantaneous concentrations into 24-hour exposure breakpoint tables without NowCast weighting.',
      'Independent recalculation of documented Srinagar raw concentration records across both Indian NAQI and US EPA AQI algorithms.',
    ],
    methodologyAndDatasets: [
      'Official CPCB National Air Quality Index (2014) technical manual and US EPA AQS Code Table breakpoints (Foundational Reference 10).',
      'Deterministic dual-standard (`NAQI` vs. `US_AQI` vs. `NowCast`) recalculation engine cross-referenced with KEW’s dual-index architecture in `air-quality-registry.ts`.',
      'Sensitivity matrices quantifying AQI spread across `PM2.5` (`0–600 µg/m³`) and `PM10` (`0–1,000 µg/m³`) under competing averaging windows.',
    ],
    scientificDeliverable:
      'Transparent concentration-to-index conversion tables and open dual-standard recalculation verification of reported Srinagar pollution episodes.',
    methodologicalCaveat:
      'Comparing two AQI numbers without first converting both back to physical pollutant concentrations (`µg/m³`) at matching averaging durations is mathematically invalid.',
  },
  {
    number: 33,
    code: '33',
    slug: 'chapter-33-when-the-air-quality-index-exceeds-500',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The Numbers We Cannot Trust',
    title: 'When the Air Quality Index Exceeds 500',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'When screenshots of `AQI 708` circulated in Srinagar in late November 2026, some commentators dismissed any figure above `500` out of hand as a software bug or fabrication because official Indian CPCB bulletins never exceed `500`. Others treated `708` as literal proof that Srinagar’s air was 40% more toxic than a `500` emergency. Both reactions misunderstand regulatory index architecture above the top breakpoint.',
      'Under India’s CPCB National Air Quality Index, the highest Severe category spans `401–500` (reached at 24-hour `PM2.5 ≥ 250 µg/m³`—and capped at `500` on public CPCB dashboards regardless of whether `PM2.5` is `380` or `600 µg/m³`). By contrast, the US EPA AQI technical specification explicitly defines a linear slope extrapolation beyond `500` whenever concentrations surpass the `500`-index breakpoint, and several private platforms apply custom high-concentration slopes to `PM2.5` and `PM10` simultaneously. Thus an index above `500` is not mathematically impossible—but without its formula, pollutant (`PM2.5` vs. `PM10`), concentration, and sensor audit, the number itself communicates heat rather than light.',
    ],
    keyQuestionsAndScope: [
      'Why India CPCB NAQI caps public reporting at `500` (`401–500` Severe ceiling) and the "ceiling compression" blind spot this creates during extreme smog episodes (`>250–350 µg/m³`).',
      'US EPA AQI mathematical rules for linear extrapolation beyond the `500` breakpoint ("beyond the AQI").',
      'Proprietary super-500 index formulas deployed by commercial aggregator websites and mobile apps (`AQI.in`, IQAir, WAQI) and why different platforms produce `420`, `580`, or `708` from the same raw microgram reading.',
      'Sensor saturation physics: optical coincidence error and laser photodetector non-linearity when low-cost nephelometers encounter ultra-dense smoke or fog (`>300–500 µg/m³`).',
      'Reporting protocol recommendation: always display physical `µg/m³` mass concentration prominently alongside any capped or extrapolated AQI.',
    ],
    methodologyAndDatasets: [
      'CPCB NAQI technical specification (`401–500` bracket rules) and US EPA Technical Assistance Document for Reporting of Daily Air Quality (AQS Breakpoints; Foundational Reference 10).',
      'Reverse-calculation forensic curves mapping `AQI = 708` back to implied `PM2.5` and `PM10` concentrations under US EPA legacy, US EPA 2024, CPCB un-capped linear extension, and aggregator formulas.',
      'Optical particle counter coincidence-loss and saturation test literature above `300–500 µg/m³`.',
    ],
    scientificDeliverable:
      'Technical ruling on super-500 AQI values explaining both CPCB ceiling truncation and private-platform breakpoint extrapolation alongside sensor saturation limits.',
    methodologicalCaveat:
      'An AQI exceeding `500` is not automatically scientifically impossible, yet it must never be published or cited without explicitly stating the calculation standard, underlying `µg/m³` concentration, averaging interval, and instrument humidity/saturation status.',
  },
  {
    number: 34,
    code: '34',
    slug: 'chapter-34-reference-grade-instruments-versus-low-cost-sensors',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The Numbers We Cannot Trust',
    title: 'Reference-Grade Instruments Versus Low-Cost Sensors',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'At the heart of modern air-quality disputes lies a fundamental distinction in measurement physics. Regulatory Federal Reference Method (FRM) and Federal Equivalent Method (FEM) / CPCB-certified CAAQMS instruments—such as 24-hour conditioned gravimetric filter samplers, heated Beta Attenuation Monitors (BAM), and Tapered Element Oscillating Microbalances (TEOM)—measure or directly approximate dry particulate mass (`µg/m³`) under controlled inlet flow rates, sharp aerodynamic cyclone cut-heads, and regulated sample-air relative humidity.',
      'By contrast, the `$30–$300` low-cost optical particle counters and nephelometers powering consumer monitors and community networks shine an internal laser diode across an unconditioned ambient air stream, detect scattered light pulses, and infer mass concentration by assuming fixed particle density, spherical shape, and refractive index. Low-cost sensors offer transformative spatial density for identifying neighbourhood smoke hotspots and temporal trends—yet during foggy Kashmiri winters or coarse mineral dust events, treating raw optical light-scattering proxies as interchangeable with reference gravimetric mass violates basic metrology.',
    ],
    keyQuestionsAndScope: [
      'First-principles measurement physics, strengths, and winter mountain failure modes across eight atmospheric instrument classes.',
      'Conditioned gravimetric filter sampling: reference gold standard for dry mass and chemical speciation vs. multi-day laboratory turnaround lag.',
      'Beta Attenuation Monitors (BAM) and TEOMs: continuous hourly regulatory mass telemetry, smart-heater humidity conditioning, and semi-volatile ammonium nitrate loss risks if overheated.',
      'Low-cost optical particle counters (OPCs) and integrating nephelometers: particle size cut-off limits (`<0.3 µm` invisibility), density assumptions, `>85% RH` fog-droplet bias, and drift.',
      'Filter-based aethalometers (black/brown carbon), sun photometers (AERONET column AOD), and ceilometers/aerosol lidars (vertical boundary-layer and plume profiling).',
      'Co-location calibration protocols (multivariate RH-temperature random-forest / `κ`-Köhler regressions) required before deploying low-cost optical nodes in Kashmir.',
    ],
    methodologyAndDatasets: [
      'ISO / US EPA FRM-FEM / CPCB CAAQMS instrument performance standards and WMO GAW aerosol measurement guidelines.',
      'Published Himalayan and Indo-Gangetic low-cost optical vs. reference BAM/gravimetric co-location datasets across dry, dusty, and radiation-fog regimes.',
      'Self-audit of KEW’s reference screening architecture in `air-quality-registry.ts` (explicitly distinguishing non-regulatory AirGradient optical nodes from reference CAAQMS).',
    ],
    scientificDeliverable:
      'Comparative metrological reference guide across eight aerosol sensing technologies establishing co-location calibration equations for Himalayan winter deployment.',
    methodologicalCaveat:
      'Different instruments measure fundamentally different physical quantities (dry collected mass, beta-ray attenuation, microbalance frequency, laser scattering, light absorption, or column extinction); their outputs must never be treated as automatically interchangeable.',
    structuredTable: {
      caption: 'Eight atmospheric particulate and aerosol instrument classes and their underlying physical principles',
      headers: ['Instrument', 'Measurement principle'],
      rows: [
        [
          'Gravimetric filter sampling',
          'Direct determination of collected particulate mass',
        ],
        [
          'Beta attenuation monitor',
          'Estimation of mass through beta radiation attenuation',
        ],
        [
          'TEOM',
          'Mass determination using an oscillating tapered element',
        ],
        [
          'Optical particle counter',
          'Particle detection through light scattering',
        ],
        [
          'Nephelometer',
          'Measurement of aerosol light scattering',
        ],
        [
          'Aethalometer',
          'Estimation of light-absorbing carbonaceous aerosol',
        ],
        [
          'Sun photometer',
          'Column-integrated aerosol optical properties',
        ],
        [
          'Ceilometer and aerosol lidar',
          'Vertical atmospheric structure and aerosol layers',
        ],
      ],
    },
  },
  {
    number: 35,
    code: '35',
    slug: 'chapter-35-kashmirs-environmental-measurement-integrity-audit',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The Numbers We Cannot Trust',
    title: "Kashmir's Environmental Measurement Integrity Audit",
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Scientific neutrality requires rejecting two symmetrical fallacies: assuming an official government reading is accurate merely because it carries an institutional seal, or assuming a private citizen/commercial sensor reading is "telling the hidden truth" merely because its number is higher. An official CAAQMS station with an uncleaned PM2.5 cyclone, drifted volumetric flow rate, power-cut data gaps during peak winter curtailment hours, or sheltered park-like micro-siting can systematically under-represent urban exposure just as severely as an unheated rooftop optical node in fog over-estimates dry mass.',
      'This chapter establishes a 12-criterion Station Measurement Integrity Audit applicable to every JKPCC/CPCB regulatory station, university research instrument, community AirGradient node, and commercial aggregator feed operating across Jammu and Kashmir—anchoring public trust in verifiable calibration traceability and open raw observations.',
    ],
    keyQuestionsAndScope: [
      'Instrument dynamic operating limits (minimum detection limit, upper saturation ceiling, ambient sub-zero operating rating).',
      'Calibration traceability to primary mass, flow, and zero-air metrological standards (NABL / NIST / NPL lineage).',
      'Temporal data completeness (`≥75%` hourly/daily capture) especially across overnight winter power-outage windows.',
      'Sampling inlet aerodynamics (`PM2.5` VSCC/cyclone maintenance) and inlet height above ground (`3–15 m` siting standards).',
      'Sample-stream relative humidity control (`35–50% RH` smart heaters vs. unconditioned inlets).',
      'Shelter thermal stability, pump vacuum integrity, and volumetric flow-rate verification (`16.67 L/min` FRM standard at mountain ~840 hPa pressure!).',
      ' Preventive maintenance logs, filter-tape replacement records, and UTC/IST clock synchronization.',
      'Macro- and micro-scale station siting audit (distance from trees, building walls, local flues, and traffic lanes).',
      'Independent co-located reference comparison and open machine-readable publication of raw unrounded observations.',
    ],
    methodologyAndDatasets: [
      'CPCB CAAQMS siting & QA/QC guidelines, US EPA QA Handbook for Air Pollution Measurement Systems (Vol. II), and WMO GAW station audit checklists.',
      'Barometric pressure-flow audit protocol verifying volumetric vs. standard-temperature-pressure (`STP` vs. `ATP` at `1,600 m` elevation) mass concentration reporting.',
      'Public data-availability scorecard across JKPCC, CPCB CCR portal, University stations, and private platforms.',
    ],
    scientificDeliverable:
      '12-point Kashmir Station Measurement Integrity Scorecard auditing siting, barometric flow calibration, humidity conditioning, data completeness, and raw-data transparency.',
    methodologicalCaveat:
      'Scientific credibility is established exclusively through measurement traceability, calibration transparency, and independent co-located validation—never through institutional identity or headline alarm.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME VIII — REMOTE SENSING AND ATMOSPHERIC INTELLIGENCE (CHAPTERS 36–40)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 36,
    code: '36',
    slug: 'chapter-36-satellite-based-atmospheric-observation',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Remote Sensing and Atmospheric Intelligence',
    title: 'Satellite-Based Atmospheric Observation',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'In a mountain region where ground reference monitors are sparse and cross-border access is constrained, spaceborne Earth-observation constellations provide indispensable synoptic visibility across the entire Kashmir–Indus–Gangetic–Tarim domain. Multi-spectral imagers, trace-gas spectrometers, geostationary weather sounders, and active spaceborne lidars map regional plume geometry, gaseous combustion precursors (`NO₂`, `SO₂`, `CO`), active fires, snow-cover reflectivity, and vertical aerosol layer altitudes.',
      'At the same time, satellite remote sensing over the Western Himalayas confronts acute physical retrieval challenges: bright snow-covered ridges corrupt standard dark-target aerosol algorithms, winter stratiform cloud and valley radiation fog mask low-level smog from passive optical sensors, and—most importantly—satellite Aerosol Optical Depth (`AOD`) integrates light extinction from the ground all the way to the top of the atmosphere. High column `AOD` caused by a dust plume at `4,500 m` altitude can coexist with clean valley air, whereas lethal `200 m`-deep nocturnal smoke beneath winter fog can escape passive daytime satellite detection.',
    ],
    keyQuestionsAndScope: [
      'Harmonized multi-sensor architecture integrating MODIS (MAIAC 1 km & Deep Blue), VIIRS, Sentinel-5P TROPOMI, INSAT-3D/3DR, Meteosat Indian Ocean Data Coverage, ESA/JAXA EarthCARE, archival NASA/CNES CALIPSO, and high-resolution Sentinel-2 / Landsat.',
      'Snow-surface reflectance masking and high-terrain surface-albedo error screening in Himalayan MAIAC/Deep Blue AOD retrievals.',
      'Sentinel-5P TROPOMI tropospheric `NO₂` (urban/traffic/industrial), `SO₂` (kilns/power/coal), `CO` (incomplete biomass/solid-fuel combustion), and UV Absorbing Aerosol Index (`AAI`).',
      'Geostationary sub-hourly cloud, fog, and synoptic disturbance tracking via INSAT-3D/3DR and Meteosat.',
      'Active vertical aerosol-cloud profiling comparing the 2006–2023 CALIPSO CALIOP climatology with next-generation EarthCARE atmospheric lidar observations.',
      'Physical conversion limits separating dimensionless column-integrated `AOD` from breathing-zone `PM2.5` (`µg/m³`).',
    ],
    methodologyAndDatasets: [
      'NASA LAADS DAAC / LP DAAC (MCD19A2 MAIAC 1 km AOD, VNP14IMG VIIRS), Copernicus Data Space (S5P TROPOMI Level-2 `CO`, `NO₂`, `SO₂`, `AER_AI`; Sentinel-2 L2A), ISRO MOSDAC (INSAT-3D/3DR), and CALIPSO/EarthCARE L2 vertical curtains.',
      'Quality-assurance pixel filtering (`qa_value > 0.75` for TROPOMI; snow/cloud adjacency screening for MAIAC) over steep Kashmir relief.',
      'Boundary-layer height and relative-humidity scaling tests (`AOD / H_mix / f(RH)`) audited against surface stations.',
    ],
    scientificDeliverable:
      'Multi-sensor satellite atmospheric observation catalog and retrieval quality-control protocol tailored for snow-rimmed Himalayan valleys.',
    methodologicalCaveat:
      'Satellite Aerosol Optical Depth measures column-integrated light extinction through the entire atmosphere—it does NOT directly measure particulate mass concentration (`µg/m³`) at human breathing height.',
    structuredTable: {
      caption: 'Eight Earth-observation satellite systems integrated into Monograph 01 atmospheric intelligence',
      headers: ['Satellite or sensor', 'Scientific application'],
      rows: [
        [
          'MODIS',
          'Aerosol optical depth and regional aerosol distribution',
        ],
        [
          'VIIRS',
          'Active fire detection and aerosol observations',
        ],
        [
          'Sentinel-5P TROPOMI',
          'Atmospheric NO₂, SO₂, CO and absorbing aerosol indicators',
        ],
        [
          'INSAT-3D/3DR',
          'Regional meteorological and cloud observations',
        ],
        [
          'Meteosat observations, where applicable',
          'Large-scale weather-system evolution',
        ],
        [
          'EarthCARE',
          'Atmospheric vertical structure, aerosols and clouds',
        ],
        [
          'Historical CALIPSO archive',
          'Historical aerosol altitude and transport climatology',
        ],
        [
          'Sentinel-2 and Landsat',
          'Emission-source geography, urban expansion and land-use change',
        ],
      ],
    },
  },
  {
    number: 37,
    code: '37',
    slug: 'chapter-37-atmospheric-reanalysis-and-global-modelling',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Remote Sensing and Atmospheric Intelligence',
    title: 'Atmospheric Reanalysis and Global Modelling',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Atmospheric reanalysis systems blend billions of satellite radiances, radiosonde profiles, aircraft observations, and surface synoptic reports into physically consistent three-dimensional gridded reconstructions of Earth’s weather and atmospheric composition. Combining ECMWF ERA5, ERA5-Land, NASA MERRA-2, Copernicus CAMS, NOAA GDAS/GFS, CHIRPS, and GPM IMERG enables Monograph 01 to reconstruct multidecadal wind fields, snow states, aerosol species budgets, and wet-scavenging events across data-sparse transboundary terrain.',
      'Nevertheless, global reanalysis and composition grids carry severe resolution penalties over the Kashmir Valley. At horizontal grid spacings of `0.1° (~11 km)` in CAMS/ERA5-Land, `0.25° (~27 km)` in ERA5, or `0.5° × 0.625° (~50 km)` in MERRA-2, the steep walls of the Pir Panjal and Zabarwan are smoothed into gentle ramps, blurring `150 m`-deep valley-floor radiation inversions and diluting concentrated Srinagar or Budgam winter smoke plumes across mountain volume—precisely why KEW’s Air Quality Registry explicitly tracks ground-to-model validation deltas.',
    ],
    keyQuestionsAndScope: [
      'Cross-dataset intercomparison across seven complementary meteorological, land-surface, composition, and precipitation reanalysis products.',
      'Orographic smoothing bias: comparing true digital-elevation valley floor altitudes (`1,585 m` in Srinagar) against smoothed reanalysis model-grid surface elevations (`~2,100–2,600 m` in coarse grids!).',
      'Intercomparison of MERRA-2 (long-term 1980–2026 speciated dust, BC, OC, sulfate reanalysis) and Copernicus CAMS (`~11 km` operational/reanalysis composition) over Kashmir.',
      'Evaluation of NOAA GDAS/GFS meteorological fields driving Lagrangian back-trajectories versus ECMWF ERA5.',
      'Mountain precipitation retrieval uncertainties in CHIRPS and GPM IMERG during solid winter snowfall events.',
    ],
    methodologyAndDatasets: [
      'ECMWF Climate Data Store (ERA5 pressure/single levels, ERA5-Land `0.1°`), Copernicus Atmosphere Data Store (CAMS global/regional), NASA GES DISC (MERRA-2 `M2T1NXAER` & GPM IMERG Final Run), UCSB CHIRPS v2, and NOAA ARL GDAS/GFS archives.',
      'Grid-elevation lapse-rate and hypsometric bias quantification across all 44 regional grid units tracked in KEW `air-quality-registry.ts`.',
      'Multi-reanalysis ensemble spread calculation for boundary-layer height, wind vectors, and column aerosol species.',
    ],
    scientificDeliverable:
      'Multi-reanalysis harmonization and Himalayan terrain-bias assessment quantifying model resolution limits across Kashmir and surrounding corridors.',
    methodologicalCaveat:
      'Global reanalysis and composition models (`11–50 km` grids) cannot resolve narrow Himalayan valley micro-inversions, street-level traffic corridors, or dispersed village heating plumes without dynamical mesoscale downscaling and ground validation.',
    structuredTable: {
      caption: 'Seven global atmospheric, composition, and precipitation datasets integrated in Chapter 37',
      headers: ['Dataset', 'Application'],
      rows: [
        [
          'ECMWF ERA5',
          'Wind, temperature, humidity and boundary-layer climatology',
        ],
        [
          'ERA5-Land',
          'Surface temperature, snow and land-atmosphere conditions',
        ],
        [
          'NASA MERRA-2',
          'Historical aerosol composition and atmospheric reanalysis',
        ],
        [
          'Copernicus CAMS',
          'Atmospheric composition and regional pollution evolution',
        ],
        [
          'NOAA GDAS/GFS',
          'Meteorological inputs for atmospheric trajectory modelling',
        ],
        [
          'CHIRPS',
          'Historical precipitation analysis, with mountain-region limitations',
        ],
        [
          'GPM IMERG',
          'Precipitation events and potential aerosol removal',
        ],
      ],
    },
  },
  {
    number: 38,
    code: '38',
    slug: 'chapter-38-mapping-the-geography-of-pollution-sources',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Remote Sensing and Atmospheric Intelligence',
    title: 'Mapping the Geography of Pollution Sources',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Global anthropogenic emission inventories used in standard climate models (such as EDGAR, CEDS, or HTAP at `0.1°` to `0.5°` resolution) frequently misallocate mountain emissions—placing valley-floor brick kilns on uninhabited alpine ridges, missing seasonal Kashmiri hamam/bukhari wood combustion, or lagging rapid peri-urban road and construction growth. High-resolution WRF-Chem modelling over a `3 km` and `1 km` Himalayan nest is only as credible as the spatial geography of the emissions feeding it.',
      'This chapter constructs a harmonized, multi-thematic Geographic Information System (GIS) atmospheric emission source atlas spanning both the internal Kashmir Valley airshed and surrounding regional corridors, fusing satellite-verified point facilities (brick kilns, cement plants, thermal power stations, quarries), linear transport networks, gridded population-heating demand, agricultural landscapes, waste sites, and natural dust-erodibility maps.',
    ],
    keyQuestionsAndScope: [
      'High-resolution (`100 m` to `1 km`) spatial disaggregation of human population density, settlement elevation, and winter residential heating demand.',
      'Vector road and highway freight networks classified by traffic volume, gradient, and unpaved dust potential.',
      'Geolocated stationary industrial clusters, brick-kiln belts, cement rotary kilns, thermal power facilities (regional IGP/Pakistan corridors), and mining/quarrying footprints.',
      'Irrigated paddy-wheat rotation belts, temperate horticultural orchard zones, and seasonal residue-generation calendars.',
      'Active fire climatology masks, municipal waste-disposal sites, and active urban construction expansion fronts.',
      'Natural aeolian dust-source susceptibility surfaces incorporating bare-soil fraction, clay/silt mineralogy, snow-free mask, and threshold friction velocity.',
    ],
    methodologyAndDatasets: [
      'Fusion of global/regional base inventories (EDGAR v8, CEDS, ECLIPSE/GAINS, regional Indian SMog/COALESCE datasets) with custom 10 m Sentinel-2 / OpenStreetMap / WorldPop downscaling proxies over Kashmir.',
      'GINOUX / geomorphological topographic depression dust-source erodibility functions coupled with dynamic snow and soil-moisture masking.',
      'Temporal allocation profiles (`monthly × day-of-week × hourly`) tailored to Himalayan heating, kiln, and agricultural cycles.',
    ],
    scientificDeliverable:
      'Harmonized GIS-based multi-sector regional and local atmospheric emission geospatial database formatted for `27–9–3–1 km` WRF-Chem ingestion.',
    methodologicalCaveat:
      'Spatial proxy downscaling improves geographic placement of emissions, but total sector mass fluxes remain bounded by underlying fuel-consumption and emission-factor uncertainties.',
  },
  {
    number: 39,
    code: '39',
    slug: 'chapter-39-tracking-agricultural-burning-across-borders',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Remote Sensing and Atmospheric Intelligence',
    title: 'Tracking Agricultural Burning Across Borders',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Every October and November, satellite fire maps glowing red across northwestern India (Punjab, Haryana) and Pakistani Punjab become instant visual shorthand in public arguments over Himalayan haze—while smaller orchard-pruning and leaf fires inside Kashmir itself go largely unseen on coarse global fire maps. Turning thermal remote sensing from rhetorical imagery into quantitative atmospheric evidence requires coupling fire detections with plume-rise physics and three-dimensional transport.',
      'Using NASA’s Fire Information for Resource Management System (FIRMS)—integrating MODIS (`1 km`) and Suomi-NPP / NOAA-20 / NOAA-21 VIIRS (`375 m`) thermal anomalies alongside Fire Radiative Power (`FRP`), land-cover classification, fuel-consumption emission factors, and plume injection height—this chapter reconstructs cross-border and intra-valley biomass burning across autumn 2026 while enforcing a strict evidentiary distinction between thermal ignition on the ground and verified smoke arrival in Srinagar.',
    ],
    keyQuestionsAndScope: [
      'Daily and sub-daily reconstruction of agricultural crop-residue, orchard-waste, and forest/scrub fires across Kashmir, northern India, Pakistan, and adjacent corridors using NASA FIRMS.',
      'Integration of Fire Radiative Power (`FRP`, in MW) with land-cover type (ESA WorldCover / MODIS IGBP: cropland vs. orchard vs. temperate forest) to estimate dry biomass burned and `PM2.5`, `BC`, `OC`, and `CO` emissions.',
      'Plume injection-height estimation: determining whether fire buoyancy lofts smoke above the local boundary layer into regional transport winds (`>1,500–3,000 m`) or traps it near the ground.',
      'Forward-trajectory coupling testing which specific fire clusters intersect the Kashmir Valley airshed versus advecting southeastward down the Gangetic Plain toward Delhi/Bay of Bengal.',
      'Quantification of satellite omission errors for small (`<0.05 ha`), brief late-afternoon Kashmiri orchard/leaf fires occurring after polar-orbiting daytime overpasses (~13:30 local time) or beneath cloud/haze.',
    ],
    methodologyAndDatasets: [
      'NASA FIRMS MODIS Collection 6.1 (`MCD14ML`) and VIIRS `375 m` (`VNP14IMG` / `VJ114IMG`) archival and November 2026 active fire records.',
      'FINN v2.5 (Fire INventory from NCAR) and GFASv1.2 (CAMS Global Fire Assimilation System) FRP-based emission fluxes.',
      'MISR / CALIOP / TROPOMI aerosol layer height constraints and HYSPLIT forward smoke-plume dispersion runs.',
    ],
    scientificDeliverable:
      'Cross-border and intra-Kashmir biomass-burning emission and plume-trajectory database separating transported agricultural smoke episodes from non-intersecting regional fire events.',
    methodologicalCaveat:
      'A satellite-detected active fire is physical evidence of surface thermal activity—NOT automatic proof of smoke arrival or breathing-height pollution exposure in Srinagar without verified transport trajectories and boundary-layer entrainment.',
  },
  {
    number: 40,
    code: '40',
    slug: 'chapter-40-atmospheric-vertical-profiling',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Remote Sensing and Atmospheric Intelligence',
    title: 'Atmospheric Vertical Profiling',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Perhaps the single greatest blind spot in Himalayan air-quality science is treating the atmosphere as a flat two-dimensional sheet. In the Kashmir basin, a surface monitor at `1,585 m` in Srinagar, an orchard terrace at `1,950 m` in Shopian, a subalpine meadow at `2,650 m` in Gulmarg, a mountain pass at `2,830 m` near Banihal, and an elevated trans-regional dust or biomass plume at `4,200 m` occupy entirely decoupled or intermittently coupled atmospheric strata.',
      'Closing Volume VIII, this chapter specifies a comprehensive vertical-profiling framework combining elevation-transect ground measurements along bounding mountain slopes, radiosonde thermodynamic soundings, ground-based ceilometer/lidar backscatter profiles, and spaceborne CALIOP/EarthCARE vertical curtains. Its central scientific mission is answering the vertical coupling question: when regional pollution enters Kashmir’s sky at `2,500–4,500 m` altitude, under what exact thermodynamic conditions does it subside or fumigate downward onto populated valley floors—and when does it pass harmlessly overhead?',
    ],
    keyQuestionsAndScope: [
      'Simultaneous vertical comparison of valley-floor (`~1,580–1,750 m`), karewa/piedmont (`1,800–2,100 m`), montane/pass (`2,200–3,000 m`), and free-tropospheric (`>3,500 m`) aerosol layers.',
      'Thermodynamic profile characterization: potential temperature (`θ`), equivalent potential temperature (`θ_e`), specific humidity (`q`), wind shear (`∂U/∂z`), and bulk Richardson stability.',
      'Detection of elevated multi-layered aerosol strata decoupled above winter surface radiation inversions.',
      'Morning convective break-up fumigation versus mountain-wave lee-side subsidence mechanisms capable of mixing elevated regional plumes down to breathing height.',
      'Design of permanent mountain-slope pseudo-vertical monitoring transects (e.g., Srinagar–Tangmarg–Gulmarg–Apharwat and Anantnag–Pahalgam–Chandanwari).',
    ],
    methodologyAndDatasets: [
      'Paired valley-to-ridge elevation-transect observations (Srinagar vs. Gulmarg/Sonamarg/Pahalgam/Qazigund) combined with IGRA radiosonde archives.',
      'Archival CALIOP Level-2 5 km aerosol profile extinction and subtype curtains (Foundational Reference 5) plus ESA/JAXA EarthCARE ATLID vertical profiles.',
      'Proposed Vaisala/Lufft ceilometer and micro-pulse polarization lidar deployment specifications for Srinagar.',
    ],
    scientificDeliverable:
      'Vertical atmospheric structure and entrainment diagnostic framework resolving decoupled overhead plumes versus valley-floor fumigation events.',
    methodologicalCaveat:
      'Observing an elevated aerosol layer at `3,000–5,000 m` above Kashmir via lidar or sun photometer does not establish human surface exposure until downward vertical exchange across the capping valley inversion is demonstrated.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME IX — ORIGINAL ATMOSPHERIC MODELLING AND SOURCE ATTRIBUTION (CHAPTERS 41–45)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 41,
    code: '41',
    slug: 'chapter-41-the-november-2026-atmospheric-reconstruction',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'Original Atmospheric Modelling and Source Attribution',
    title: 'The November 2026 Atmospheric Reconstruction',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'A single extreme pollution headline in late November 2026 cannot be interpreted scientifically in isolation from the seasonal, decadal, and multidecadal hierarchy within which it unfolded. Was November 20–27, 2026 a meteorological outlier driven by an anomalously persistent dry anticyclone and delayed Western Disturbance snowfall, an amplification of indigenous Harud biomass and heating combustion, an episodic transboundary transport event, a private optical sensor artifact in radiation fog, or a superposition of all four?',
      'To test these competing hypotheses rigorously, Chapter 41 establishes a seven-tier temporal research design nesting the intensive November 20–27, 2026 investigation and full November 1–27, 2026 event reconstruction inside the September–November 2026 seasonal buildup, the 2016–2026 recent pollution-meteorology decade, the 2001–2025 satellite aerosol archive, and the 1991–2020 WMO climatological baseline—while designating December 2026–February 2027 strictly as a prospective winter observational campaign.',
    ],
    keyQuestionsAndScope: [
      'Nested seven-window temporal architecture linking multidecadal baselines to the November 2026 acute episode.',
      'Climatological anomaly scoring of November 1–27, 2026 temperature, relative humidity, precipitation deficit, 500 hPa geopotential height, and boundary-layer height against 1991–2020 normals.',
      'Synoptic timeline of the September–November 2026 monsoon withdrawal, post-harvest burning calendar, and early-winter cold-air pooling onset.',
      'Hour-by-hour multi-sensor data fusion across the intensive November 20–27, 2026 window (ground stations, community optical nodes, CAMS, ERA5, MODIS/VIIRS, TROPOMI, FIRMS).',
      'Prospective field monitoring protocol for December 2026–February 2027 (Chillai Kalan through late winter) to capture cold-season evolution.',
    ],
    methodologyAndDatasets: [
      'Synchronized UTC/IST hourly observational data cube spanning September 1–November 27, 2026 across meteorological, ground-sensor, satellite, and reanalysis streams.',
      'Standardized Z-score anomaly indexing relative to 1991–2020 (ERA5/IMD) and 2001–2025 (MODIS/MERRA-2) historical distributions.',
      'Strict temporal cutoff governance separating archived pre-November 28, 2026 observations from prospective winter campaign targets.',
    ],
    scientificDeliverable:
      'Multi-scale November 2026 Atmospheric Event Reconstruction placing the November 20–27 episode in 30-year climatological and 25-year satellite context.',
    methodologicalCaveat:
      'Event reconstruction must utilize verified observations available up to late November 2026 only; future dates (December 2026–February 2027) remain strictly part of the proposed prospective monitoring campaign, never presented as completed observations.',
    structuredTable: {
      caption: 'Seven nested temporal research periods governing Monograph 01 reconstruction and monitoring',
      headers: ['Period', 'Purpose'],
      rows: [
        ['1991–2020', 'Standard climatological baseline'],
        [
          '2001–2025',
          'Long-term satellite aerosol variability, subject to product availability',
        ],
        ['2016–2026', 'Recent pollution and meteorological trends'],
        ['September–November 2026', 'Seasonal buildup'],
        ['November 1–27, 2026', 'Observed event reconstruction'],
        [
          'November 20–27, 2026',
          'Intensive pollution-event investigation',
        ],
        [
          'December 2026–February 2027',
          'Prospective winter monitoring',
        ],
      ],
    },
  },
  {
    number: 42,
    code: '42',
    slug: 'chapter-42-atmospheric-back-trajectory-modelling',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'Original Atmospheric Modelling and Source Attribution',
    title: 'Atmospheric Back-Trajectory Modelling',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Reconstructing the geographical history of air parcels arriving over Kashmir requires Lagrangian transport modelling using the NOAA Air Resources Laboratory’s Hybrid Single-Particle Lagrangian Integrated Trajectory (`HYSPLIT`) system. Rather than computing isolated single-height trajectories at Srinagar alone—which are notoriously sensitive to small initial-position errors—this protocol specifies a multi-duration (`24, 48, 72, and 120 hours`), seven-altitude (`50 m` to `3,000 m AGL`), six-hourly arrival ensemble across all ten Kashmir Valley districts plus key mountain-pass gateways.',
      'Crucially, NOAA’s own technical guidance explicitly warns that trajectory accuracy degrades in complex mountain terrain whenever driving synoptic meteorological grids (`0.25°–1.0°`) under-resolve narrow valley channelling, slope flows, and shallow inversions. Accordingly, Monograph 01 treats HYSPLIT back-trajectories not as standalone proof of ground-level pollution import, but as multi-meteorology ensemble probability corridors cross-checked against `3 km / 1 km` WRF-Chem winds.',
    ],
    keyQuestionsAndScope: [
      'Multi-duration (`24, 48, 72, 120 h`) backward parcel integration matching short-lived boundary-layer smoke vs. synoptic mineral-dust lifetimes.',
      'Vertical arrival stratification across seven heights (`50, 100, 250, 500, 1,000, 1,500, and 3,000 m AGL`) separating valley-floor stagnant air from pass-level and free-tropospheric inflow.',
      'Six-hourly synoptic arrival schedule (`00, 06, 12, 18 UTC`) capturing diurnal anabatic/katabatic transitions.',
      'Receptor network spanning all 10 Kashmir Valley districts (Srinagar, Budgam, Ganderbal, Baramulla, Bandipora, Kupwara, Pulwama, Shopian, Kulgam, Anantnag) plus mountain-corridor nodes (Uri, Tangdhar, Sonamarg, Gulmarg, Pahalgam, Qazigund).',
      '27-member spatial offset and multi-meteorology (`GDAS/GFS`, `ERA5`, downscaled `WRF`) ensemble sensitivity testing.',
      'Cluster analysis, Potential Source Contribution Function (`PSCF`), and Concentration Weighted Trajectory (`CWT`) mapping.',
    ],
    methodologyAndDatasets: [
      'NOAA ARL HYSPLIT v5 Lagrangian trajectory and dispersion engine (Foundational Reference 8) governed by NOAA READY complex-terrain limitation protocols (Foundational Reference 9).',
      'Driving meteorological fields from NOAA GDAS/GFS (`0.25°`), ECMWF ERA5 (`0.25°` pressure/model levels), and nested high-resolution WRF outputs (`3 km`).',
      'Total Spatial Variance (`TSV`) k-means / Ward hierarchical trajectory clustering stratified by season and arrival layer.',
    ],
    scientificDeliverable:
      'Ensemble multi-elevation back-trajectory cluster library and gridded air-mass residence-time probabilities for all 10 Kashmir districts and mountain passes.',
    methodologicalCaveat:
      'As NOAA ARL explicitly cautions, kinematic trajectories driven by coarse meteorological models in steep Himalayan terrain carry substantial position uncertainty and cannot resolve sub-grid valley channelling without high-resolution mesoscale wind validation.',
    structuredTable: {
      caption: 'Proposed NOAA HYSPLIT back-trajectory ensemble configuration for Kashmir receptors',
      headers: ['Parameter', 'Configuration'],
      rows: [
        ['Backward trajectory durations', '24, 48, 72 and 120 hours'],
        [
          'Arrival heights',
          '50, 100, 250, 500, 1,000, 1,500 and 3,000 m above ground',
        ],
        ['Arrival intervals', 'Every six hours'],
        [
          'Meteorological inputs',
          'Multiple available model products',
        ],
        [
          'Ensemble analysis',
          'Spatial and meteorological sensitivity',
        ],
        [
          'Output',
          'Trajectory clusters and potential source-region maps',
        ],
      ],
    },
  },
  {
    number: 43,
    code: '43',
    slug: 'chapter-43-high-resolution-wrf-chem-atmospheric-modelling',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'Original Atmospheric Modelling and Source Attribution',
    title: 'High-Resolution WRF-Chem Atmospheric Modelling',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Because chemistry, radiation, boundary-layer turbulence, and mountain winds interact continuously online—for example, black carbon heating an elevated layer while fog droplets catalyse sulfate formation inside a 200-metre basin inversion—defensible source attribution in Kashmir requires a fully coupled online Eulerian weather-and-chemistry model: the Weather Research and Forecasting model coupled with Chemistry (`WRF-Chem`). Earlier peer-reviewed Kashmir air-quality research (including the 2018 *Scientific Reports* investigation) has already demonstrated WRF-Chem’s capability to capture winter particulate trapping in the basin.',
      'Chapter 43 specifies a four-tier telescopic nested grid hierarchy stepping down from a `27 km` Central and South Asian continental outer domain (`d01`), through a `9 km` Northwestern Subcontinent domain (`d02`) and `3 km` convection-permitting Western Himalayan domain (`d03`), to an experimental `1 km` Kashmir Valley inner nest (`d04`) explicitly resolving Pir Panjal passes, tributary valleys, and Srinagar’s urban canopy.',
    ],
    keyQuestionsAndScope: [
      'Telescopic four-domain horizontal nesting (`27 km → 9 km → 3 km → 1 km`) with stretched terrain-following vertical coordinates (`≥45–60` vertical levels, `<20 m` lowest model layer) resolving shallow winter inversions.',
      'Online two-way aerosol-radiation and aerosol-cloud microphysics feedbacks (semi-direct soot stabilization and fog/cloud processing).',
      'Coupled gas-phase photochemistry and sectional/modal aerosol thermodynamics (`MOZART-MOSAIC` 4-bin or 8-bin aqueous aerosol chemistry including `SO₄²⁻`, `NO₃⁻`, `NH₄⁺`, `BC`, `POA`, `SOA`, and mineral dust).',
      'Ingestion of harmonized local Kashmiri + regional anthropogenic inventories (Chapter 38), FINN/GFAS daily fire fluxes (Chapter 39), and GOCART/AFWA online dust mobilization.',
      'Numerical stability controls over `>40°` Himalayan slopes (smoothed/hybrid vertical coordinates, adaptive time-stepping, Courant-Friedrichs-Lewy safeguards).',
    ],
    methodologyAndDatasets: [
      'NCAR WRF-Chem v4.x coupled meteorology-chemistry modelling system initialized with ERA5 meteorology and CAMS/WACCM chemical boundary conditions.',
      'SRTM / Copernicus 30 m terrain static fields paired with updated MODIS/Sentinel-2 Kashmir land-use/urban canopy parameters.',
      'Benchmark verification against prior Himalayan WRF-Chem studies (Foundational Reference 1) and independent surface/sounding observations.',
    ],
    scientificDeliverable:
      'Validated multi-nest WRF-Chem simulation suite (`27–9–3–1 km`) resolving three-dimensional meteorology, aerosol chemistry, and pass-level fluxes across the Kashmir Valley.',
    methodologicalCaveat:
      'The `27 km, 9 km, 3 km, and 1 km` grid resolutions represent proposed starting targets; numerical stability over steep Himalayan escarpments, computational cost, and `1 km` local emission inventory fidelity must govern final production configuration.',
    structuredTable: {
      caption: 'Proposed four-domain telescopic WRF-Chem nested modelling architecture',
      headers: ['Proposed modelling domain', 'Resolution target'],
      rows: [
        ['Central and South Asia', '27 km'],
        ['Northwestern subcontinent', '9 km'],
        ['Western Himalayas', '3 km'],
        ['Kashmir Valley experimental nest', '1 km'],
      ],
    },
  },
  {
    number: 44,
    code: '44',
    slug: 'chapter-44-geographic-source-attribution-experiments',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'Original Atmospheric Modelling and Source Attribution',
    title: 'Geographic Source Attribution Experiments',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'To move transboundary debate from speculation to controlled physical experimentation, Chapter 44 designs a 14-member WRF-Chem sensitivity matrix. Starting from a fully coupled `CONTROL` simulation incorporating all local, regional, biomass-burning, and natural mineral-dust emissions, nine targeted emission-perturbation runs systematically zero out anthropogenic emissions from the Kashmir Valley (`LOCAL-OFF`), the rest of India (`INDIA-OFF`), Pakistan (`PAKISTAN-OFF`), China (`CHINA-OFF`), Afghanistan (`AFGHANISTAN-OFF`), Central Asia (`CENTRAL-ASIA-OFF`), and Iran (`IRAN-OFF`), alongside open biomass burning (`FIRE-OFF`) and natural mineral dust (`DUST-OFF`). Four physics/chemistry perturbation runs (`CHEMISTRY-SENS`, `BOUNDARY-SENS`, `PBL-SENS`, `DEPOSITION-SENS`) bound structural model uncertainty.',
      'A foundational scientific rule governs interpretation of all 14 experiments: differences `(CONTROL − REGION_OFF)` measure atmospheric sensitivity to removing a source, NOT simple additive percentages summing neatly to 100%. Because oxidants (`OH`, `O₃`, `H₂O₂`), ammonia neutralization (`NH₃ + HNO₃ ⇌ NH₄NO₃`), and aerosol-radiation feedbacks are strongly nonlinear, removing one region’s `SO₂` or `NOₓ` alters the chemical formation efficiency of emissions from every remaining region.',
    ],
    keyQuestionsAndScope: [
      'Execution of the `CONTROL` baseline and seven geographic anthropogenic zero-out experiments (`LOCAL-OFF`, `INDIA-OFF`, `PAKISTAN-OFF`, `CHINA-OFF`, `AFGHANISTAN-OFF`, `CENTRAL-ASIA-OFF`, `IRAN-OFF`).',
      'Separation of open biomass fires (`FIRE-OFF`) and natural aeolian desert dust (`DUST-OFF`) from stationary/mobile anthropogenic combustion.',
      'Quantification of structural model uncertainty across gas/aqueous chemistry mechanisms (`CHEMISTRY-SENS`), lateral chemical boundary conditions (`BOUNDARY-SENS`), planetary boundary-layer schemes (`PBL-SENS`), and wet/dry deposition velocities (`DEPOSITION-SENS`).',
      'Stein-Alpert factor-separation and tagged-species cross-checks quantifying nonlinear interaction residuals (`∑ ΔC_i ≠ C_CONTROL`).',
      'Spatial and altitudinal disaggregation of sensitivity responses across Srinagar, border gateways (Uri, Qazigund, Kupwara), and alpine glacier elevations.',
    ],
    methodologyAndDatasets: [
      '14-experiment WRF-Chem perturbation protocol run under identical meteorology (or quantified radiative-feedback twin runs) across the November 2026 reconstruction window.',
      'Nonlinear chemical residual accounting comparing brute-force zero-out sensitivities against online source-tagged tracers.',
    ],
    scientificDeliverable:
      '14-Experiment Geographic & Process Sensitivity Matrix quantifying local, regional, fire, dust, and structural physics sensitivities with explicit nonlinearity residuals.',
    methodologicalCaveat:
      'Zero-out experiment differences `(CONTROL − X-OFF)` must NEVER be published as naive additive country-by-country percentage shares without accounting for nonlinear oxidant, thermodynamic ammonium-nitrate, and boundary-layer radiative interactions.',
    structuredTable: {
      caption: 'Fourteen proposed WRF-Chem geographic source-attribution and physics sensitivity experiments',
      headers: ['Experiment', 'Model configuration'],
      rows: [
        ['CONTROL', 'All available emissions'],
        ['LOCAL-OFF', 'Kashmir Valley anthropogenic emissions removed'],
        [
          'INDIA-OFF',
          'Anthropogenic emissions from the rest of India removed',
        ],
        ['PAKISTAN-OFF', 'Pakistani anthropogenic emissions removed'],
        ['CHINA-OFF', 'Chinese anthropogenic emissions removed'],
        ['AFGHANISTAN-OFF', 'Afghan anthropogenic emissions removed'],
        [
          'CENTRAL-ASIA-OFF',
          'Central Asian anthropogenic emissions removed',
        ],
        ['IRAN-OFF', 'Iranian anthropogenic emissions removed'],
        ['FIRE-OFF', 'Biomass-burning emissions removed'],
        ['DUST-OFF', 'Natural mineral dust emissions removed'],
        [
          'CHEMISTRY-SENS',
          'Alternative atmospheric chemistry configuration',
        ],
        [
          'BOUNDARY-SENS',
          'Alternative meteorological and chemical boundary conditions',
        ],
        [
          'PBL-SENS',
          'Alternative boundary-layer parameterization',
        ],
        [
          'DEPOSITION-SENS',
          'Alternative deposition configuration',
        ],
      ],
    },
  },
  {
    number: 45,
    code: '45',
    slug: 'chapter-45-chemical-source-apportionment-and-independent-validation',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'Original Atmospheric Modelling and Source Attribution',
    title: 'Chemical Source Apportionment and Independent Validation',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Computational atmospheric models—no matter how finely nested—remain hypotheses until confronted with independent physical and chemical observations on filter media collected from the air people actually breathe. Chapter 45 closes Volume IX by pairing forward Eulerian simulations (`WRF-Chem` + tagged tracers) with observational receptor modelling—Positive Matrix Factorization (`EPA PMF 5.0`), Chemical Mass Balance (`CMB`), isotopic carbon analysis (`δ¹³C` / `Δ¹⁴C` fossil vs. contemporary biomass), `PSCF`, and `CWT`—applied to chemically speciated `PM2.5` and `PM10` samples.',
      'Strict out-of-sample model verification metrics—Mean Bias (`MB`), Normalized Mean Bias (`NMB`), Root Mean Square Error (`RMSE`), Index of Agreement (`IOA`), and Pearson/Spearman correlation (`r`)—evaluated against held-back ground stations and speciated filter series govern whether any quantitative source-contribution range is certified for publication across the eight required final monograph outputs.',
    ],
    keyQuestionsAndScope: [
      'Observational receptor apportionment via Positive Matrix Factorization (`PMF`) and Chemical Mass Balance (`CMB`) using elemental, ionic, `EC`/`OC`, and molecular organic markers (levoglucosan, hopanes, PAHs).',
      'Radiocarbon (`¹⁴C`) and stable carbon (`¹³C`) isotopic constraints unambiguously partitioning fossil carbon (coal, diesel, petrol) from modern biogenic/biomass carbon (wood, orchard twigs, paddy straw).',
      'Reconciliation of bottom-up/forward `WRF-Chem` source sensitivities with top-down filter receptor apportionment.',
      'Quantitative skill verification (`MB`, `NMB`, `NME`, `RMSE`, `r`, `FAC2`) against independent out-of-sample monitoring stations not assimilated during calibration.',
      'Propagation of combined analytical, emission, meteorological, and structural uncertainty into 95% confidence intervals across all eight expected final outputs.',
    ],
    methodologyAndDatasets: [
      'US EPA PMF v5.0 (with displacement `DISP` and bootstrap `BS` rotational/random error estimation) and CMBv8.2 receptor protocols.',
      'Emery/Boylan atmospheric model performance benchmark criteria (`|NMB| ≤ 15–30%`, `NME ≤ 35–50%`, `r > 0.70`) for meteorology and speciated PM2.5.',
      'Held-out independent validation ledger preserving uncalibrated observation subsets.',
    ],
    scientificDeliverable:
      'Convergent forward-and-receptor source-apportionment synthesis populating the eight final scientific output metrics with verified 95% confidence intervals.',
    methodologicalCaveat:
      'None of the eight expected final source-contribution outputs may be populated with numerical claims until both forward atmospheric modelling and independent chemical receptor validation are completed.',
    structuredTable: {
      caption: 'Eight expected final quantitative outputs of Monograph 01 (awaiting completion of modelling and field validation)',
      headers: ['Scientific outcome', 'Required result'],
      rows: [
        [
          "Kashmir's local primary emissions",
          'Concentration and percentage',
        ],
        [
          'Imported primary pollution',
          'Concentration and percentage',
        ],
        [
          'Regional source contributions',
          'Country or source-region estimates',
        ],
        [
          'Secondary aerosol formation',
          'Chemical contribution estimates',
        ],
        ['Natural dust', 'Concentration and percentage'],
        [
          'Atmospheric accumulation',
          'Quantified meteorological amplification',
        ],
        [
          'Measurement discrepancy',
          'Instrumental and methodological explanation',
        ],
        [
          'Remaining uncertainty',
          'Explicit confidence intervals',
        ],
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME X — THE HUMAN, ECOLOGICAL AND ECONOMIC CONSEQUENCES (CHAPTERS 46–50)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 46,
    code: '46',
    slug: 'chapter-46-human-health-and-population-exposure',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The Human, Ecological and Economic Consequences',
    title: 'Human Health and Population Exposure',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Ultimately, atmospheric physics and sensor metrology matter because roughly seven million residents across the Kashmir Valley inhale the basin’s air more than twenty thousand times each day. Clinical and epidemiological research in Kashmir—including landmark spirometric studies led from SKIMS Soura documenting high adult prevalence of chronic obstructive pulmonary disease (COPD) alongside seasonal surges in acute respiratory infections, asthma exacerbations, hypertension, ischemic heart events, and cerebrovascular stroke during Chillai Kalan—already points to a severe winter cardiopulmonary burden compounded by indoor domestic biomass heating.',
      'Rather than extrapolating health risk from a single central Srinagar monitor, Chapter 46 develops a population-weighted, micro-environment-adjusted exposure framework across urban neighbourhoods, brick-kiln and cement-downwind villages, rural firewood-dependent households, schoolyards, and outdoor occupational cohorts (traffic police, sweepers, orchard labourers, forest watchers, construction workers), stratifying vulnerability across infants, school-age children, pregnant women, elderly residents, and cardiopulmonary patients.',
    ],
    keyQuestionsAndScope: [
      'Acute short-term lag effects (`0–7 days`) vs. chronic multi-year exposure pathways for COPD, lower respiratory tract infections, asthma, myocardial infarction, stroke, lung cancer risk, and adverse birth outcomes (low birth weight, preterm delivery).',
      'Stratified vulnerability analysis for children (higher ventilation-to-body-mass ratio and developing alveoli), elderly residents, pregnant women, outdoor workers, and pre-existing respiratory/cardiac cohorts.',
      'Joint indoor-outdoor exposure accounting linking ambient valley inversion smog with household solid-fuel heating (`bukhari`, `kangri`, `hamam`) infiltration.',
      'Spatially resolved population-weighted `PM2.5` and `BC` exposure estimation across all 10 Valley districts replacing single-station city proxies.',
      'Differential toxicity considerations for PAH-rich biomass/coal soot and heavy-metal-bearing industrial particulates relative to crustal dust.',
    ],
    methodologyAndDatasets: [
      'WHO Global Air Quality Guidelines (2021) and Global Burden of Disease (GBD) Integrated Exposure-Response (`IER`) / `GEMM` concentration-response functions with local clinical literature cross-checks.',
      'High-resolution `100 m` WorldPop / Census age-sex demographic grids intersected with bias-corrected `WRF-Chem` + ground-calibrated exposure surfaces.',
      'Anonymized aggregate seasonal respiratory/cardiac hospital admission and spirometry prevalence synthesis (SKIMS, SMHS, Chest Diseases Hospital Srinagar published studies).',
    ],
    scientificDeliverable:
      'District- and vulnerability-stratified population-weighted atmospheric exposure and attributable cardiopulmonary health-burden assessment for Kashmir.',
    methodologicalCaveat:
      'Epidemiological attributable-risk models estimate population-level statistical disease burden—not individual clinical causation—and must separate ambient outdoor pollution from confounding indoor solid-fuel smoke and tobacco exposure.',
  },
  {
    number: 47,
    code: '47',
    slug: 'chapter-47-pollution-and-the-himalayan-cryosphere',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The Human, Ecological and Economic Consequences',
    title: 'Pollution and the Himalayan Cryosphere',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Air pollution in the Western Himalayas does not vanish when daytime upslope breezes or passing storms clear the valley floor; a significant fraction deposits onto the seasonal snowpacks and benchmark alpine glaciers feeding the Jhelum, Lidder, and Sindh rivers—including Kolahoi Glacier, Thajiwas Glacier, Hoksar, and Machoi. Light-absorbing impurities (`LAIs`)—principally black carbon, organic brown carbon, and iron-oxide-bearing mineral dust—reduce visible snow surface albedo, increasing absorbed shortwave solar energy and accelerating snow-grain coarsening and spring ablation.',
      'Crucially, rigorous cryospheric science forbids conflating airborne smoke over Srinagar with automatic glacier loss. Atmospheric concentration (`µg/m³` in air), dry and wet deposition flux onto snow (`mg m⁻² day⁻¹`), in-snow impurity mass mixing ratio (`ng BC / g snow`), instantaneous snow-albedo radiative forcing (`W m⁻²`), and net glacier mass balance (`m w.e. yr⁻¹` relative to thermal air-temperature melt) are distinct physical quantities that must be measured and modelled sequentially.',
    ],
    keyQuestionsAndScope: [
      'Upslope valley-breeze and synoptic storm transport of black carbon, brown carbon, and mineral dust to Kolahoi Glacier, Thajiwas Glacier, and the upper Lidder, Sindh, and Pir Panjal snowsheds.',
      'Dry gravitational/turbulent deposition vs. below-cloud and in-cloud wet snowfall scavenging fluxes across elevation bands (`2,500–5,000 m ASL`).',
      'Post-depositional melt-amplification feedbacks as hydrophobic soot concentrates at melting snowpack surfaces during April–June ablation.',
      'Radiative transfer quantification (`SNICAR` snow-albedo modelling) separating black-carbon radiative forcing from natural mineral-dust darkening.',
      'Partitioning impurity-driven melt acceleration from greenhouse-gas air-temperature warming in glacier energy-balance budgets.',
    ],
    methodologyAndDatasets: [
      'Snowpack/glacier surface impurity sampling protocol (`EC`/`OC` thermal-optical, `SP2` refractory BC, gravimetric dust, iron-oxide spectrophotometry) cross-linked with KEW `aquatic-cryosphere-observatory.ts`.',
      'SNICAR-ADv3 (Snow, Ice, and Aerosol Radiation) radiative-transfer model coupled with `WRF-Chem` dry/wet deposition fields and MODIS `MOD10A1` / Sentinel-2 snow-albedo retrievals.',
      'Published Kolahoi and Hoksar glaciological mass-balance baselines (Romshoo et al.; Shukla & Ali).',
    ],
    scientificDeliverable:
      'Quantitative snow-impurity deposition and radiative-forcing budget for benchmark Kashmir glaciers (Kolahoi, Thajiwas, Lidder & Sindh headwaters).',
    methodologicalCaveat:
      'Atmospheric aerosol concentration, snow deposition flux, snow-albedo radiative forcing, and net glacier melt must be treated strictly as separate physical quantities; air-temperature warming and precipitation deficits must be controlled when attributing glacier retreat.',
  },
  {
    number: 48,
    code: '48',
    slug: 'chapter-48-agriculture-horticulture-and-food-security',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The Human, Ecological and Economic Consequences',
    title: 'Agriculture, Horticulture and Food Security',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Temperate horticulture and specialty crops—led by apple orchards across Shopian, Baramulla, Kupwara, Pulwama, Kulgam, and Anantnag, alongside Geographic Indication (`GI`)-protected Pampore karewa saffron (`Crocus sativus`), walnut, almond, paddy, and peri-urban vegetables—form the rural economic backbone of the Kashmir Valley. Yet crops are simultaneously seasonal contributors (via autumn pruning smoke and fertilizer ammonia) and acute biological receptors of atmospheric contamination.',
      'Fine and coarse particulate fallout coats leaf cuticles, clogs stomatal apertures, alters leaf thermal budgets, and—around alkaline cement and limestone quarry belts in Khrew–Wuyan–Pampore—encrusts saffron stigma/foliage and raises soil pH, disrupting micronutrient availability. Concurrently, warm-season tropospheric ozone (`O₃`) formed downwind of urban `NOₓ` plumes enters open stomata during peak photosynthetic hours, inducing oxidative cellular damage, premature leaf senescence, and measurable yield and fruit-quality penalties.',
    ],
    keyQuestionsAndScope: [
      'Foliar particulate deposition (`mg/cm²` leaf area), stomatal conductance blockage, and Photosynthetically Active Radiation (`PAR`) dimming ("atmospheric haze dimming") across apple orchards and vegetable belts.',
      'Alkaline cement, clinker, and stone-crusher dust fallout impacts on Pampore karewa saffron flowering, stigma quality, corm vigor, and soil carbonate/pH chemistry.',
      'Phytotoxic surface ozone (`O₃`) cumulative exposure indices (`AOT40` and `W126`) across spring-summer vegetative and fruit-set phenological stages.',
      'Reactive atmospheric nitrogen (`NHₓ` and `NO_y`) and sulfur wet/dry deposition effects on orchard soil acidification, nutrient stoichiometry, and pest/fungal susceptibility.',
      'Trace heavy-metal bioaccumulation screening in peri-urban leafy vegetables irrigated or grown adjacent to highways, brick kilns, and waste-burning corridors.',
    ],
    methodologyAndDatasets: [
      'Agronomic foliar-dust, chlorophyll/carotenoid stress, and karewa soil-chemistry field datasets (synthesizing SKUAST-K and University of Kashmir studies around Khrew, Pampore, and Budgam; cross-linked with KEW `horticulture-eia-inventory.ts` and `agriculture-eia-inventory.ts`).',
      'Crop-specific `AOT40` ozone exposure-yield response functions and radiative-dimming `PAR` attenuation calculations.',
    ],
    scientificDeliverable:
      'Agro-ecological risk map quantifying particulate fallout, alkaline cement-dust stress, solar dimming, and ozone exposure across Kashmir’s apple, saffron, and food-crop belts.',
    methodologicalCaveat:
      'Observed orchard or saffron yield fluctuations are co-determined by spring frost, drought, hailstorms, scab/pest pressure, and soil degradation; atmospheric pollution impacts must be isolated through controlled distance-decay gradients and meteorological covariates.',
  },
  {
    number: 49,
    code: '49',
    slug: 'chapter-49-water-systems-forests-and-biodiversity',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The Human, Ecological and Economic Consequences',
    title: 'Water Systems, Forests and Biodiversity',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Every tonne of particulate nitrogen, phosphorus-bearing mineral dust, sulfate, trace metal, or polycyclic aromatic hydrocarbon scavenged from Kashmir’s sky by rain and snow enters its watersheds, forests, and wetlands. Across shallow urban and floodplain lakes—Dal Lake, Wular Lake, Anchar, Hokersar, Haigam, Shallabugh—and oligotrophic high-altitude alpine tarns (Sheshnag, Tarsar-Marsar, Gangabal, Kounsarnag), atmospheric wet and dry deposition acts as an unmonitored non-point nutrient and contaminant pathway.',
      'While municipal sewage and agricultural runoff dominate lowland lake eutrophication, atmospheric reactive nitrogen (`NH₄⁺` + `NO₃⁻`) and mineral phosphorus deposition can measurably perturb sensitive nutrient-poor alpine lakes, epiphytic forest lichens, conifer needle cuticles along highway/kiln slopes, and wetland trophic webs—linking Monograph 01 directly to Monograph 00 (*Watershed Voices*) and KEW’s 553-waterbody, forest, and protected-area intelligence registries.',
    ],
    keyQuestionsAndScope: [
      'Wet and dry atmospheric nutrient (`N`, `P`), acidifying ion (`SO₄²⁻`, `NO₃⁻`), black carbon, PAH, and trace-metal deposition fluxes onto Dal Lake, Wular Lake, and the Jhelum River basin.',
      'Critical load exceedances in ultra-sensitive, weakly buffered high-altitude alpine lakes across the Greater Himalayas and Pir Panjal.',
      'Wetland Ramsar ecosystem exposure (Hokersar, Wular, Shallabugh, Hygam) to airborne soot, heavy metals, and peri-urban waste-combustion dioxins/furans.',
      'Conifer and broadleaf forest physiological stress (`Cedrus deodara`, `Pinus wallichiana`, `Abies pindrow`, `Platanus orientalis` Chinar) and cryptogamic lichen bioindicator gradients.',
      'Protected-area airshed integrity across Dachigam National Park (immediately downwind of Srinagar and adjacent to the Khrew–Zabarwan rim!), Overa-Aru, Hirpora, and Gulmarg Wildlife Sanctuaries.',
    ],
    methodologyAndDatasets: [
      'Bulk and wet-only precipitation chemistry collector protocols paired with `WRF-Chem` dry/wet deposition flux integrals over waterbody and protected-area polygons.',
      'Cross-linkage with KEW `water-systems.ts`, `algal-bloom-lakes.ts`, `forest-ecosystems.ts`, `chinar-monitoring.ts`, and `protected-area-registry.ts` spatial boundaries.',
      'Epiphytic lichen diversity and foliar heavy-metal bioindicator transect designs across Dachigam and Zabarwan.',
    ],
    scientificDeliverable:
      'Watershed and ecosystem atmospheric-deposition budget quantifying non-point airborne nutrient and contaminant loading into Kashmir’s lakes, forests, and Dachigam/Ramsar reserves.',
    methodologicalCaveat:
      'In lowland eutrophic lakes (Dal, Anchar, Wular), atmospheric nutrient deposition must be scaled proportionally against much larger direct raw-sewage and catchment runoff loads rather than overstated as the primary eutrophication driver.',
  },
  {
    number: 50,
    code: '50',
    slug: 'chapter-50-the-economic-cost-of-breathing-polluted-air',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The Human, Ecological and Economic Consequences',
    title: 'The Economic Cost of Breathing Polluted Air',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Because the financial costs of air pollution are dispersed across household out-of-pocket pharmacy bills, winter hospital admissions, missed workdays, school closures or absenteeism, reduced orchard/saffron revenues, aviation fog/smog flight cancellations at Srinagar International Airport, and degraded scenic visibility in a tourism-dependent economy, municipal budgets routinely treat clean-air infrastructure as an unaffordable luxury rather than a high-return fiscal investment.',
      'Concluding Volume X, Chapter 50 formulates a transparent environmental-economics valuation protocol covering direct Cost-of-Illness (`COI`: inpatient, outpatient, medication, diagnostic expenditure), human-capital productivity and wage losses, premature mortality welfare valuation (with explicit income-elasticity sensitivity ranges), educational disruption, aviation/transport visibility delays, tourism brand vulnerability, horticultural yield penalties, and ecosystem restoration costs—benchmarked directly against the engineering cost of clean domestic heating, kiln retrofits, orchard chippers, and reference monitoring.',
    ],
    keyQuestionsAndScope: [
      'Direct public and household Cost-of-Illness (`COI`) for pollution-attributable respiratory and cardiovascular hospitalizations, emergency visits, and chronic inhaler/medication regimens.',
      'Labour productivity losses, informal daily-wage forfeiture, caregiver burden, and winter school absenteeism.',
      'Welfare valuation of attributable premature mortality and Disability-Adjusted Life Years (`DALYs`) presenting transparent lower-bound human-capital and upper-bound Value of a Statistical Life (`VSL`) sensitivity brackets.',
      'Visibility-degradation and smog/fog interaction costs across Srinagar aviation disruptions, highway freight delays, and winter/autumn scenic tourism.',
      'Agronomic revenue risk across GI Pampore saffron and commercial apple grading alongside natural-capital depreciation.',
      'Benefit-cost comparison (`BCR`) weighing annual pollution damages against phased abatement investments.',
    ],
    methodologyAndDatasets: [
      'World Bank / OECD environmental health valuation methodologies adapted with NSS health-expenditure microdata, J&K state domestic product (`GSDP`) wage baselines, and KEW `environmental-economics-fiscal-evidence.ts`.',
      'Monte Carlo uncertainty propagation across concentration-response slopes, baseline disease incidence, and economic unit values.',
    ],
    scientificDeliverable:
      'Multi-sector economic damage and abatement benefit-cost ledger for Kashmir’s atmospheric crisis with explicit low-, central-, and high-estimate bounds.',
    methodologicalCaveat:
      'Economic damage valuations must rely strictly on verified epidemiological exposure-response relationships and audited regional demographic/financial data, always reporting separate tangible fiscal/COI costs and welfare-based VSL estimates.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME XI — ENVIRONMENTAL GOVERNANCE AND ATMOSPHERIC ACCOUNTABILITY (CHAPTERS 51–55)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 51,
    code: '51',
    slug: 'chapter-51-kashmirs-existing-environmental-governance-architecture',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Environmental Governance and Atmospheric Accountability',
    title: "Kashmir's Existing Environmental Governance Architecture",
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Managing an intermontane airshed requires coordinated action across statutory regulators, synoptic meteorological agencies, research universities, tertiary health surveillance systems, urban local bodies, transport enforcement, and district magistracies. In Jammu and Kashmir, responsibilities under the Air (Prevention and Control of Pollution) Act, 1981, Environment (Protection) Act, 1986, National Clean Air Programme (`NCAP`), and Motor Vehicles rules are distributed across at least eleven distinct institutional tiers.',
      'Complementing Dispatch 16 (*Six Years of Warnings, and Kashmir Still Cannot Breathe*), Chapter 51 conducts an empirical, non-adversarial technical capacity audit of all eleven institutions—evaluating statutory mandates, laboratory instrumentation, staffing cadres, winter calibration budgets, inter-agency data sharing, and NCAP expenditure alignment without presuming institutional failure prior to examining documented evidence.',
    ],
    keyQuestionsAndScope: [
      'Statutory mandate, monitoring network size, NABL laboratory accreditation, CEMS enforcement, and raw-data publication capacity of JKPCC.',
      'Standard-setting, CAAQMS protocol oversight, and NCAP / Swachh Vayu Sarvekshan coordination by CPCB.',
      'Upper-air radiosonde frequency, boundary-layer/fog telemetry, and mountain weather forecasting capabilities of IMD.',
      'Atmospheric physics, aerosol speciation, glaciology, engineering sensor calibration, and agronomic exposure research capacities across University of Kashmir, IUST, NIT Srinagar, and SKUAST-K.',
      'Syndromic pollution-related respiratory/cardiac surveillance within the J&K Health Department and tertiary medical colleges.',
      'Solid-waste, leaf-burning, road-dust, and NCAP fund execution by Municipal authorities alongside Transport vehicle-fitness enforcement and District Administration winter emergency protocols.',
    ],
    methodologyAndDatasets: [
      'Statutory charters (Air Act 1981, EPA 1986, MoEFCC NCAP guidelines), CAG environmental audit reports, published annual administrative reports, and public portal telemetry audits.',
      'Institutional capacity matrix scoring legal authority, physical instrumentation, technical staffing, open data API access, and inter-departmental coordination.',
    ],
    scientificDeliverable:
      '11-Institution Kashmir Atmospheric Governance & Technical Capacity Matrix identifying statutory mandates, laboratory strengths, and operational bottlenecks.',
    methodologicalCaveat:
      'Institutional evaluation must assess documented legal responsibilities, budget/staffing constraints, and empirical data availability objectively—never assuming bad faith or institutional failure ahead of verified evidence.',
    structuredTable: {
      caption: 'Eleven regional, national, academic, and administrative institutions reviewed in Chapter 51',
      headers: ['Institution', 'Function to examine'],
      rows: [
        ['JKPCC', 'Air quality monitoring and pollution regulation'],
        [
          'CPCB',
          'National standards, monitoring protocols and regulatory coordination',
        ],
        [
          'IMD',
          'Meteorological observations and atmospheric forecasts',
        ],
        [
          'University of Kashmir',
          'Atmospheric and environmental research',
        ],
        ['IUST', 'Scientific research and technical capacity'],
        [
          'NIT Srinagar',
          'Engineering and environmental monitoring',
        ],
        [
          'SKUAST-K',
          'Agricultural and ecological exposure research',
        ],
        [
          'Health Department',
          'Pollution-related health surveillance',
        ],
        [
          'Municipal authorities',
          'Urban emission management and waste regulation',
        ],
        ['Transport authorities', 'Vehicle emission management'],
        [
          'District administrations',
          'Local pollution-control implementation',
        ],
      ],
    },
  },
  {
    number: 52,
    code: '52',
    slug: 'chapter-52-international-atmospheric-governance',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Environmental Governance and Atmospheric Accountability',
    title: 'International Atmospheric Governance',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Kashmir is not the first region in history forced to confront air pollution crossing sovereign boundaries amidst complex geopolitics. Beginning in 1979—at the height of the Cold War—rival European and North American states signed the UNECE Convention on Long-range Transboundary Air Pollution (`CLRTAP`) and established the Cooperative Programme for Monitoring and Evaluation of the Long-range Transmission of Air Pollutants in Europe (`EMEP`), proving that rival states can agree on shared measurement standards, harmonized emission inventories, and source-receptor matrices even across deep political divides.',
      'Chapter 52 examines four comparative international governance architectures—UNECE `CLRTAP`/`EMEP` (including the Gothenburg multi-pollutant protocol), the 1991 US–Canada Air Quality Agreement, East Asia’s Acid Deposition Monitoring Network (`EANET`), and South Asia’s Malé Declaration on Control and Prevention of Air Pollution and Its Likely Transboundary Effects—extracting practical institutional design lessons while strictly clarifying their non-binding legal status for Kashmir.',
    ],
    keyQuestionsAndScope: [
      'Architecture of UNECE `CLRTAP` and `EMEP`: how independent scientific monitoring and source-receptor matrices (`EMEP MSC-W`) preceded and enabled negotiated emission ceilings.',
      'Bilateral airshed management, joint border monitoring, and notification triggers under the US–Canada Air Quality Agreement.',
      'Asian regional scientific networks: `EANET`, the 1998 South Asian `Malé Declaration` (UNEP/SACEP), and ICIMOD Hindu Kush Himalayan atmospheric initiatives—evaluating why South Asian transboundary air cooperation stalled.',
      'Alpine mountain-valley governance lessons from Switzerland, Austria, and Northern Italy’s Po-Alpine interface.',
      'Distinction between customary international environmental principles (trail smelter / no-harm norms), voluntary scientific declarations, and binding domestic statutory law.',
    ],
    methodologyAndDatasets: [
      'Comparative legal-institutional analysis of UNECE CLRTAP/EMEP protocols, US–Canada Air Quality Agreement reports, EANET QA/QC manuals, and UNEP/SACEP Malé Declaration archival records.',
    ],
    scientificDeliverable:
      'Comparative institutional analysis extracting technical monitoring, QA/QC, and source-receptor governance mechanisms adaptable to the Western Himalayas.',
    methodologicalCaveat:
      'International treaties such as UNECE CLRTAP or the US–Canada Agreement must be presented strictly as comparative institutional models—never misrepresented as automatically applicable or legally binding treaty obligations governing India, Pakistan, China, or Jammu & Kashmir.',
  },
  {
    number: 53,
    code: '53',
    slug: 'chapter-53-scientific-transparency-and-environmental-data-rights',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Environmental Governance and Atmospheric Accountability',
    title: 'Scientific Transparency and Environmental Data Rights',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Why did a single unverified screenshot of `AQI 708` trigger widespread public alarm across Srinagar in November 2026? Because in an information vacuum—where citizens cannot inspect raw hourly microgram readings, station coordinates, inlet relative humidity, calibration certificates, or stack CEMS logs on an open public portal—opaque official reassurance and sensationalist private numbers compete on equal footing.',
      'Chapter 53 formulates a statutory and institutional *Public Atmospheric Data Disclosure Charter* grounded in right-to-information principles and FAIR (`Findable, Accessible, Interoperable, Reusable`) scientific data governance. Its core premise is simple: publishing a single colour-coded AQI integer without its underlying physical concentrations, instrument metadata, quality flags, and calculation code denies citizens and scientists the evidence required for independent verification.',
    ],
    keyQuestionsAndScope: [
      'Mandatory open station metadata registry: exact WGS84 coordinates, elevation ASL, inlet height, surrounding land-use siting class, and instrument make/model/principle.',
      'Real-time publication of raw, unrounded 15-minute and 1-hour physical concentrations (`PM2.5`, `PM10`, `NO₂`, `SO₂`, `CO`, `O₃`, `BC` in `µg/m³` or `ppb`) alongside sample-stream temperature, relative humidity, and barometric pressure.',
      'Public calibration ledger disclosing zero/span check dates, flow-rate audits, BAM/gravimetric co-location slopes, and NABL traceability.',
      'Transparent machine-readable quality-control (`QC`) flags rather than silent deletion of high-concentration spikes as "instrument maintenance."',
      'Open JSON/CSV REST APIs and permanent downloadable historical archives replacing screenshot-only dashboards and locked PDF bulletins.',
      'Public disclosure of industrial Continuous Emission Monitoring System (`CEMS`) stack feeds for Khrew–Wuyan cement plants and major industrial clusters.',
    ],
    methodologyAndDatasets: [
      'OpenAQ data-transparency benchmarks, WMO Open Data Policy, FAIR scientific metadata standards, and Indian Right to Information Act / National Data Sharing and Accessibility Policy (`NDSAP`) provisions.',
    ],
    scientificDeliverable:
      'Model Open Atmospheric Data Disclosure Standard specifying mandatory raw-telemetry, calibration, QA-flag, and API schemas for all regulatory and public-facing monitors in Kashmir.',
    methodologicalCaveat:
      'A standalone AQI number published without its supporting raw pollutant concentrations, averaging duration, calibration metadata, and quality-control flags cannot satisfy scientific accountability.',
  },
  {
    number: 54,
    code: '54',
    slug: 'chapter-54-communicating-atmospheric-risk-without-panic',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Environmental Governance and Atmospheric Accountability',
    title: 'Communicating Atmospheric Risk Without Panic',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Environmental risk communication fails in two opposite ways: either through complacent minimization ("winter mist is normal in Kashmir; ignore private apps") that leaves asthmatic children, COPD patients, and outdoor workers unprotected during genuine `200–350 µg/m³` smog surges, or through breathless viral catastrophism ("Srinagar hits AQI 708—deadliest air on Earth!") built on uncalibrated fog-swollen optical spikes that quickly breeds public fatalism and distrust when skies clear.',
      'Chapter 54 establishes an eight-tier *Epistemic Clarity & Health Risk Communication Protocol* requiring journalists, platforms, clinicians, and public agencies to visibly label the evidentiary tier of every atmospheric statement—cleanly separating validated reference measurements, preliminary unvalidated observations, model-derived grid estimates, meteorological forecasts, untested scientific hypotheses, unresolved sensor discrepancies, qualified clinical advisories, and explicit uncertainty bounds.',
    ],
    keyQuestionsAndScope: [
      'Strict taxonomic labelling distinguishing: (1) Validated reference measurements, (2) Preliminary unvalidated observations, (3) Model-derived gridded concentrations, (4) Predictive 24–72h forecasts, (5) Testable scientific hypotheses, (6) Documented instrument discrepancies, (7) Qualified clinical exposure advisories, and (8) Unresolved scientific uncertainty.',
      'Actionable, non-alarmist clinical guidance stratified by sensitive groups (dawn school-assembly modifications, N95/FFP2 respirator fit for high-exposure outdoor workers, indoor clean-air room steps, and avoiding unvented indoor heating smoke).',
      'Editorial visual-design rules preventing misleading colour scales, unlabeled AQI standards, or false cross-city leaderboard rankings.',
      'Rapid public anomaly-explanation bulletins whenever official reference monitors and community optical sensors diverge by `>50%` during radiation-fog events.',
    ],
    methodologyAndDatasets: [
      'WHO Risk Communication and Community Engagement (`RCCE`) evidence standards, IPCC calibrated uncertainty language protocols, and KEW dual-index/provenance badge conventions.',
    ],
    scientificDeliverable:
      'Eight-category Atmospheric Epistemic Labelling & Public Health Advisory Protocol for media, civil society, and regulatory communication in Kashmir.',
    methodologicalCaveat:
      'Public risk communication must never exaggerate certainty to command attention, nor invoke measurement uncertainty as an excuse to withhold protective health precautions for vulnerable groups during genuine stagnation episodes.',
  },
  {
    number: 55,
    code: '55',
    slug: 'chapter-55-a-regional-framework-for-shared-atmospheric-responsibility',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Environmental Governance and Atmospheric Accountability',
    title: 'A Regional Framework for Shared Atmospheric Responsibility',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Because westerly troughs, Indo-Gangetic foothill plumes, Indus-basin winter haze, Afghan-Iranian dust storms, and Himalayan glacier albedo feedbacks cross political borders continuously without passports, no single municipal corporation, union territory administration, or national ministry can fully diagnose—let alone solve—Western Himalayan air pollution in isolation. Yet politicized cross-border blame games reliably paralyze scientific exchange.',
      'Concluding Volume XI, Chapter 55 outlines a depoliticized, science-first *Western Himalayan & South-Central Asian Shared Atmospheric Research Framework*. Anchored strictly in mutual public-health protection, cryospheric water security (shared Indus/Jhelum snowpacks), open metrological standards, harmonized emission inventories, and neutral academic/WMO data exchange involving scientific communities across India, Pakistan, China, Afghanistan, and international earth-observation agencies, it separates technical cooperation from geopolitical dispute.',
    ],
    keyQuestionsAndScope: [
      'Harmonized regional monitoring and calibration protocols (`FRM/FEM` gravimetric, heated `BAM`, aethalometer, and `AERONET`/`ceilometer` standards) across Himalayan foothills, valleys, and passes.',
      'Open exchange of non-sensitive synoptic meteorological soundings, boundary-layer profiles, and background aerosol chemical composition via WMO Global Atmosphere Watch (`GAW`) channels.',
      'Collaborative transboundary aerosol and dust transport case-study reconstructions using shared open satellite (`TROPOMI`, `MODIS`, `VIIRS`, `EarthCARE`) and reanalysis (`ERA5`, `CAMS`, `MERRA-2`) baselines.',
      'Methodological harmonization of gridded agricultural-fire, brick-kiln, residential-fuel, and transport emission inventories across South and Central Asia.',
      'Neutral early-warning pollution-episode and severe dust-storm scientific notifications protecting hospitals, aviation, and schools on all sides of mountain borders.',
    ],
    methodologyAndDatasets: [
      'WMO Global Atmosphere Watch (`GAW`) data-sharing protocols, ICIMOD regional cryosphere-atmosphere scientific cooperation precedents, and open-science reproducibility standards.',
    ],
    scientificDeliverable:
      'Depoliticized technical blueprint for regional Western Himalayan atmospheric observation, inventory harmonization, and dust/smog event notification.',
    methodologicalCaveat:
      'Regional atmospheric cooperation proposals must remain strictly grounded in shared scientific measurement, public health, and cryospheric stewardship—never framed as geopolitical accusation or sovereign legal adjudication.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLUME XII — BUILDING KASHMIR'S FUTURE ATMOSPHERIC INTELLIGENCE (CHAPTERS 56–60)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    number: 56,
    code: '56',
    slug: 'chapter-56-western-himalayan-transboundary-atmospheric-intelligence-observatory',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: "Building Kashmir's Future Atmospheric Intelligence",
    title: 'Western Himalayan Transboundary Atmospheric Intelligence Observatory',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Monograph 01 is designed not to end as a static archival publication, but to serve as the architectural charter for a permanent scientific capability inside Kashmir EcoWatch: the *Western Himalayan Transboundary Atmospheric Intelligence Observatory*. Crucially, this observatory must not become just another unverified AQI widget copying numbers from third-party feeds.',
      'Building transparently upon KEW’s existing dual-track air-quality architecture (`air-quality-registry.ts`, which openly discloses `0` KEW-owned CPCB hardware stations while pairing community AirGradient optical screening nodes against 44 `0.1°` CAMS model grids), Chapter 56 specifies a five-layer operational-and-investigative system linking (1) Multi-source data acquisition, (2) Metrological validation, unit/averaging harmonization, and quality-flagging, (3) Four-pillar scientific engines (Climatology & physics, Regional source attribution, Atmospheric chemistry, Remote sensing & GIS), (4) Uncertainty-qualified transport/stagnation/deposition intelligence, and (5) Dual public delivery through **Kashmir EcoWatch** (operational monitoring) and **Himalayan Dispatch** (peer-auditable scientific investigations).',
    ],
    keyQuestionsAndScope: [
      'Layer 01 — Multi-stream Atmospheric Data Acquisition: ground reference & community instruments, 8 satellite constellations, synoptic meteorology, and gridded local/regional emission inventories.',
      'Layer 02 — Scientific Validation & Harmonization Engine: automated calibration-status tracking, physical unit standardization (`µg/m³` STP vs. ATP), rolling averaging alignment (`1h` vs. `24h`), `RH` fog-bias flagging, and source provenance stamping.',
      'Layer 03 — Four Coupled Analytical Engines: Climatology & boundary-layer physics; Lagrangian/Eulerian regional source attribution; Gas-aerosol-fog chemistry; and High-resolution remote sensing & GIS.',
      'Layer 04 — Operational Forecasting & Diagnostic Synthesis: stagnation, pass transport, cryospheric black-carbon deposition, and explicit source-uncertainty quantification.',
      'Layer 05 — Institutional Division of Labour: **Kashmir EcoWatch** delivering continuous operational environmental intelligence and open datasets alongside **Himalayan Dispatch** publishing in-depth forensic investigations and public scientific interpretation.',
    ],
    methodologyAndDatasets: [
      'Integration blueprint extending KEW `src/data/air-quality-registry.ts`, `hazard-western-disturbances.ts`, `hazard-jet-stream-circulation.ts`, `hazard-monsoon-dynamics.ts`, and `aquatic-cryosphere-observatory.ts`.',
      'End-to-end provenance metadata schema tagging every data point as Reference Ground, Calibrated Community Optical, Satellite Column, Reanalysis Grid, or Experimental Forecast.',
    ],
    scientificDeliverable:
      'System architecture and data-engineering specification for the permanent Western Himalayan Transboundary Atmospheric Intelligence Observatory within Kashmir EcoWatch.',
    methodologicalCaveat:
      'The observatory must never present modelled reanalysis grids or unheated community optical feeds as equivalent to certified regulatory reference stations; strict tier badging and ground-to-model delta reporting remain mandatory.',
  },
  {
    number: 57,
    code: '57',
    slug: 'chapter-57-a-kashmir-wide-atmospheric-monitoring-network',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: "Building Kashmir's Future Atmospheric Intelligence",
    title: 'A Kashmir-Wide Atmospheric Monitoring Network',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Understanding a 135-kilometre enclosed mountain basin crossed by western, northwestern, and southern mountain passes is physically impossible with one or two urban Srinagar monitors. If an aerosol plume enters via the Jhelum gorge at Uri or crosses the Pir Panjal saddle at Qazigund, or if orchard biomass smoke pools across Shopian while clean free-tropospheric air sits over Gulmarg, an urban-only sensor network is blind to both transboundary entry and rural exposure.',
      'Chapter 57 designs a proposed **16-location stratified Kashmir-wide Atmospheric Monitoring Network** spanning urban population cores (`Srinagar`), central-valley kiln/airport plains (`Budgam`), western and northwestern transport gateways (`Baramulla`, `Uri`, `Kupwara`, `Tangdhar`), northern wetland/valley margins (`Bandipora`), valley-to-alpine transitions and elevated background observatories (`Ganderbal`, `Sonamarg`, `Gulmarg`, `Pahalgam`), southern horticultural/agricultural basins (`Pulwama`, `Shopian`, `Kulgam`, `Anantnag`), and the southern Pir Panjal ventilation saddle (`Qazigund`).',
    ],
    keyQuestionsAndScope: [
      'Stratified 16-node network geometry covering eight functional site classes: urban core, suburban/central basin, industrial-peri-urban, horticultural/agricultural, wetland-rural, western/northwestern/southern mountain passes, high-altitude watershed, and elevated free-tropospheric background.',
      'Tiered instrumentation architecture pairing gold-standard reference hubs (heated `BAM`/`FRM` gravimetric + `NOₓ`/`SO₂`/`CO`/`O₃` + multi-wavelength aethalometer + ceilometer at flagship urban/gateway nodes) with humidity-corrected co-located satellite nodes.',
      'Uninterrupted solar-plus-lithium winter battery backup ensuring `>95%` data capture across Chillai Kalan power curtailments.',
      'Micro-siting optimization based on 30 m terrain openness, local wind-rose fetch, security/accessibility, and avoidance of immediate chimney interference.',
    ],
    methodologyAndDatasets: [
      'Spatial network-design optimization combining population exposure density, `WRF-Chem` concentration-gradient variance, and pass-corridor inflow vectors across all 10 districts and 6 mountain/corridor sub-sites.',
      'WMO GAW and CPCB CAAQMS macro/micro-siting compliance protocols.',
    ],
    scientificDeliverable:
      'Engineering and scientific siting blueprint for a 16-location stratified Kashmir-wide Atmospheric Monitoring Network.',
    methodologicalCaveat:
      'These 16 locations represent proposed geographical monitoring priorities—NOT a claim that operational physical monitoring stations currently exist at every site; final station coordinates must follow field terrain audits, wind climatology, power/telemetry feasibility, and regulatory/institutional partnerships.',
    structuredTable: {
      caption: 'Sixteen proposed stratified atmospheric monitoring locations across the Kashmir Valley and mountain corridors',
      headers: ['Proposed monitoring region', 'Primary scientific objective'],
      rows: [
        ['Srinagar', 'Urban exposure and measurement comparison'],
        ['Baramulla', 'Western regional transport'],
        ['Uri', 'Potential western atmospheric corridor'],
        ['Kupwara', 'Northwestern regional transport'],
        ['Tangdhar', 'Mountain-corridor observations'],
        ['Bandipora', 'Northern valley and wetland environment'],
        [
          'Ganderbal',
          'Valley-to-mountain atmospheric transition',
        ],
        ['Sonamarg', 'Elevated atmospheric transport'],
        ['Budgam', 'Central valley atmospheric conditions'],
        [
          'Gulmarg',
          'Elevated aerosol and background observations',
        ],
        ['Pulwama', 'Urban-agricultural exposure'],
        [
          'Shopian',
          'Horticultural and biomass-emission environment',
        ],
        ['Kulgam', 'Southern valley circulation'],
        ['Anantnag', 'Southeastern atmospheric conditions'],
        ['Pahalgam', 'High-altitude watershed exposure'],
        [
          'Qazigund',
          'Southern valley ventilation and transport',
        ],
      ],
    },
  },
  {
    number: 58,
    code: '58',
    slug: 'chapter-58-atmospheric-early-warning-and-forecasting',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: "Building Kashmir's Future Atmospheric Intelligence",
    title: 'Atmospheric Early Warning and Forecasting',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Reactive air-quality reporting tells citizens that they breathed hazardous air yesterday; predictive atmospheric intelligence warns hospitals, schools, municipal authorities, and vulnerable households 24 to 72 hours before a severe inversion lid clamps over the Kashmir basin or a regional dust/smoke plume arrives at mountain passes. Because winter synoptic blocking ridges and Western Disturbances exhibit strong 1-to-3-day numerical predictability, anticipatory clean-air governance in Kashmir is physically achievable.',
      'Chapter 58 specifies ten operational 24-hour, 48-hour, and 72-hour atmospheric intelligence and early-warning products—spanning thermal trapping (`Temperature Inversion Watch`), multi-day low-VC blocking (`Atmospheric Stagnation Alert`), incoming regional plumes (`Regional Aerosol Transport Watch`, `Transboundary Source Assessment`, `Dust Transport Alert`, `Biomass Burning Intelligence`), metrological QA (`Sensor Discrepancy Alert`), glacier protection (`Black Carbon Deposition Risk`), dispersion windows (`Atmospheric Ventilation Forecast`), and clinical protection (`Public Exposure Advisory`).',
    ],
    keyQuestionsAndScope: [
      'Quantitative trigger thresholds, false-alarm/hit-rate verification metrics (`POD`, `FAR`, `Brier Score`), and 24h / 48h / 72h forecast horizons across all ten proposed warning products.',
      'Automated `Sensor Discrepancy Alert` triggered whenever unheated optical feeds and reference/CAMS baselines diverge sharply during `>85% RH` radiation-fog hours.',
      'Decision-support coupling: linking `Atmospheric Ventilation Forecast` windows and `Inversion Watch` alerts to temporary emission-curtailment protocols (brick-kiln modulation, municipal burning bans, school dawn-assembly advisories).',
      'Mandatory provenance classification stamping every forecast card as Observation-Based, Model-Derived, Experimental, or Independently Validated.',
    ],
    methodologyAndDatasets: [
      'ECMWF IFS / CAMS global-regional forecasts, NOAA GFS/GEFS ensembles, IMD synoptic advisories, NASA FIRMS near-real-time thermal feeds, and nested operational `WRF-Chem` / statistical post-processing (`MOS`) pipelines.',
    ],
    scientificDeliverable:
      'Operational specification and verification protocol for ten 24–72-hour Kashmir Atmospheric Early-Warning and Forecasting intelligence products.',
    methodologicalCaveat:
      'Every early-warning product must prominently disclose whether its output is observation-based, model-derived, experimental, or independently validated, and include explicit forecast confidence intervals.',
    structuredTable: {
      caption: 'Ten proposed 24h / 48h / 72h operational atmospheric intelligence and early-warning products',
      headers: ['Intelligence product', 'Purpose'],
      rows: [
        [
          'Temperature Inversion Watch',
          'Identify atmospheric trapping conditions',
        ],
        [
          'Atmospheric Stagnation Alert',
          'Identify prolonged poor ventilation',
        ],
        [
          'Regional Aerosol Transport Watch',
          'Detect potentially incoming aerosol plumes',
        ],
        [
          'Transboundary Source Assessment',
          'Evaluate potential geographical origins',
        ],
        [
          'Dust Transport Alert',
          'Identify natural mineral aerosol episodes',
        ],
        [
          'Biomass Burning Intelligence',
          'Track relevant regional fire activity',
        ],
        [
          'Sensor Discrepancy Alert',
          'Identify inconsistent observations',
        ],
        [
          'Black Carbon Deposition Risk',
          'Assess potential cryospheric exposure',
        ],
        [
          'Atmospheric Ventilation Forecast',
          'Predict opportunities for pollutant dispersion',
        ],
        [
          'Public Exposure Advisory',
          'Communicate qualified health risks',
        ],
      ],
    },
  },
  {
    number: 59,
    code: '59',
    slug: 'chapter-59-kashmir-atmospheric-measurement-integrity-protocol',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: "Building Kashmir's Future Atmospheric Intelligence",
    title: 'Kashmir Atmospheric Measurement Integrity Protocol',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'To ensure that the measurement confusion of November 2026 (`~140` vs. `708`) never again paralyzes public understanding, Chapter 59 codifies the *Kashmir Atmospheric Measurement Integrity Protocol (`KAMIP`)*—an open, independent metrological standard against which any monitoring station, academic dataset, citizen-science node, or digital dashboard operating in the Western Himalayas can be audited and graded.',
      'KAMIP establishes binding minimum specifications across ten technical pillars—instrumentation class disclosure, NABL/primary calibration intervals, WMO/CPCB station siting classification, 5-decimal WGS84 geolocation and ASL/AGL heights, unambiguous physical pollutant units (`µg/m³` with `STP` vs. ambient ~840 hPa `ATP` declaration), NTP/GPS clock synchronization, `≥75%` completeness rules, machine-readable QA/QC flags, dual-index (`NAQI` & `US AQI`) calculation transparency, and full archival reproducibility.',
    ],
    keyQuestionsAndScope: [
      'Four-Tier Station Classification System: Tier 1 Certified Reference (`FRM` Gravimetric / Heated `BAM` / `TEOM`), Tier 2 Co-Location Calibrated Research/Community Node, Tier 3 Uncalibrated Screening Optical Sensor, and Tier 4 Satellite/Model Reanalysis Grid.',
      'Mandatory mountain-pressure reporting rule: requiring explicit disclosure of whether concentrations are reported at sea-level Standard Temperature & Pressure (`STP`: `25 °C, 1013.25 hPa`) or Actual valley Temperature & Pressure (`ATP`: `~840 hPa` at `1,600 m`), eliminating hidden `~17%` barometric conversion discrepancies!',
      'Automated QA/QC flag dictionary flagging `RH > 85%` unheated optical measurements, negative zero-drift values, frozen-value flatlines, power-outage gaps, and super-500 extrapolated indices.',
      'Open-source reference calculation script and versioned raw-to-processed audit trail ensuring complete scientific reproducibility.',
    ],
    methodologyAndDatasets: [
      'Synthesis of ISO/IEC 17025 testing calibration principles, WMO GAW Aerosol Measurement Procedures, CPCB CAAQMS guidelines, and US EPA QA Handbook Vol. II.',
    ],
    scientificDeliverable:
      'Codified Kashmir Atmospheric Measurement Integrity Protocol (`KAMIP` v1.0) with four-tier station certification criteria and mountain-pressure/humidity reporting rules.',
    methodologicalCaveat:
      'Guiding principle of KAMIP: "No atmospheric intelligence product should be more confident than the quality of the scientific evidence supporting it."',
  },
  {
    number: 60,
    code: '60',
    slug: 'chapter-60-a-scientific-roadmap-for-clean-air-in-kashmir',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: "Building Kashmir's Future Atmospheric Intelligence",
    title: 'A Scientific Roadmap for Clean Air in Kashmir',
    researchStatus: 'Proposed Chapter Protocol · Investigation In Progress',
    executiveSummary: [
      'Culminating the 12 volumes and 60 chapters of Monograph 01, Chapter 60 translates atmospheric physics, chemical speciation, transboundary modelling, and measurement integrity into a phased, six-stage *Scientific Roadmap for Clean Air in Kashmir*. Rather than offering generic plains prescriptions (such as summer water-mist cannons on sub-zero winter streets) or waiting passively for international treaties before cleaning domestic chimneys, the roadmap sequences immediate forensic evidence preservation through long-term monitoring infrastructure and regional scientific diplomacy.',
      'Above all, the roadmap enforces a sharp jurisdictional distinction: separating high-impact local emission controls wholly within Jammu & Kashmir’s domestic authority—winter electric heating reliability and thermal housing insulation, ward/panchayat orchard-chipping and briquetting logistics, verified Zig-Zag brick-kiln fuel/stack telemetry, Khrew cement baghouse CEMS transparency, clean public transit, and a 16-node reference network—from transboundary aerosol and precursor reductions requiring national Indo-Gangetic coordination and international scientific cooperation.',
    ],
    keyQuestionsAndScope: [
      'Phase 1 (Immediate): Archive all perishable hourly raw logs from November 2026 across JKPCC, CPCB, community sensors, and private aggregators; deploy co-located gravimetric/BAM vs. optical winter fog calibration tests.',
      'Phase 2 (Short term): Harmonize valley-wide station metadata under KAMIP and complete the multi-sensor forensic reconstruction of the November 2026 pollution episode.',
      'Phase 3 (Medium term): Complete verified bottom-up local emission inventories, speciated filter `PMF`/`¹⁴C` sampling, and `WRF-Chem` 14-experiment regional source attribution.',
      'Phase 4 (Long term): Commission the permanent 16-location stratified Kashmir monitoring network, vertical ceilometer/lidar profiling, and validated 24–72h operational inversion/transport forecasting.',
      'Phase 5 (Institutional): Enact open machine-readable raw-telemetry data rights, winter-inversion emission rationing rules, NCAP winter heating/biomass reallocation, and independent scientific peer review.',
      'Phase 6 (Regional): Advance depoliticized transboundary meteorological, dust, and aerosol research cooperation across the Western Himalayas, South Asia, and Central Asia.',
    ],
    methodologyAndDatasets: [
      'Integrated synthesis of Volumes I–XII findings paired with Dispatch 16 governance reforms (`RASS-CAF`) and KEW Observatory implementation milestones.',
    ],
    scientificDeliverable:
      'Six-Phase Actionable Clean Air & Atmospheric Intelligence Roadmap separating immediate domestic Kashmir abatement levers from national and international transboundary initiatives.',
    methodologicalCaveat:
      'Clean-air policy must neither delay urgent domestic emission reductions inside Kashmir while awaiting transboundary agreements, nor pretend local municipal actions alone can eliminate regional background aerosols during major synoptic transport episodes.',
    structuredTable: {
      caption: 'Six-phase scientific and institutional roadmap for clean air and atmospheric intelligence in Kashmir',
      headers: ['Phase', 'Scientific priority'],
      rows: [
        [
          'Immediate',
          'Preserve current observations and verify reported extreme pollution',
        ],
        [
          'Short term',
          'Harmonize monitoring and reconstruct the November 2026 event',
        ],
        [
          'Medium term',
          'Establish emissions inventories and regional source attribution',
        ],
        [
          'Long term',
          'Develop validated forecasting and permanent monitoring infrastructure',
        ],
        [
          'Institutional',
          'Establish transparent data governance and independent scientific review',
        ],
        [
          'Regional',
          'Promote evidence-based atmospheric research cooperation',
        ],
      ],
    },
  },
];



// ─────────────────────────────────────────────────────────────────────────────
// 9. ALL 20 SCIENTIFIC APPENDICES (APPENDIX A THROUGH APPENDIX T)
// ─────────────────────────────────────────────────────────────────────────────

export const MONOGRAPH_01_APPENDICES: MonographAppendix[] = [
  {
    code: 'A',
    slug: 'appendix-a',
    title: 'Kashmir climatological station inventory',
    associatedVolumes: ['Volume I', 'Volume VII', 'Volume XII'],
    associatedChapterCodes: ['01', '02', '35', '57'],
    purpose: [
      'Establishes the master geodetic and operational metadata ledger for every historical and contemporary meteorological, upper-air, hydrological-weather, agro-meteorological, and ambient air-quality observation site across the Kashmir Valley and bounding mountain passes—spanning IMD synoptic observatories (Srinagar, Qazigund, Pahalgam, Gulmarg, Kupwara, Kokernag), SKUAST-K/university stations, JKPCC monitoring nodes, community optical sensors, and the 16 proposed stratified receptor locations.',
      'By documenting historical station relocations, surrounding land-use urbanization changes, elevation differences, and instrument upgrades since the early twentieth century, Appendix A prevents artificial step-changes caused by station moves or shelter modifications from being misinterpreted as physical climate or pollution trends.',
    ],
    requiredVariablesAndRecords: [
      'WMO / IMD / CPCB / network unique station identifier and official operating agency.',
      'Five-decimal WGS84 latitude and longitude (`°N, °E`), barometer/ground elevation (`m ASL`), and sensor/inlet height above ground (`m AGL`).',
      'Topographic siting classification (valley floor urban, karewa plateau, riverine wetland margin, mountain pass, subalpine meadow).',
      'Operational start date, decommissioning or relocation history, and instrument transition timeline (manual Stevenson screen / tipping-bucket vs. AWS).',
      'Measured meteorological and air-quality parameter list, temporal reporting interval (`15 min`, `1 hr`, `synoptic 3 hr`, `24 hr`), and archival data-completeness percentage.',
      '300-metre surrounding land-cover buffer audit (sky-view factor, obstacle distance-to-height ratio, local combustion source proximity).',
    ],
    qualityAndUncertaintyRule:
      'Stations lacking verified coordinates, elevation metadata, or relocation logs are flagged as Metadata-Incomplete and excluded from long-term trend homogenization until archival station-history files are reconciled.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'B',
    slug: 'appendix-b',
    title: 'Historical temperature and precipitation records',
    associatedVolumes: ['Volume I', 'Volume III'],
    associatedChapterCodes: ['02', '03', '04', '05', '12', '13'],
    purpose: [
      'Compiles the quality-controlled, homogenized daily, monthly, seasonal, and annual temperature (`T_max`, `T_min`, `T_mean`, diurnal temperature range) and precipitation (liquid rainfall, solid snowfall water equivalent, rainy/snowy days, dry-spell run lengths) series anchored to the WMO 1991–2020 climatological reference normal across Kashmir Valley benchmark stations.',
      'Provides the statistical baseline tables required to score anomalous autumn–winter dry spells (including September–November 2026), frost-day declines, Heating Degree Day demand shifts, and long-term shifts in the solid-to-liquid winter precipitation ratio.',
    ],
    requiredVariablesAndRecords: [
      '1991–2020 WMO 30-year monthly and seasonal normal tables (`mean`, `standard deviation`, `10th/50th/90th/99th percentiles`) per station.',
      'Daily and monthly `T_max`, `T_min`, diurnal range (`DTR`), frost days (`T_min < 0 °C`), ice days (`T_max < 0 °C`), and Heating Degree Days.',
      'Total precipitation (`mm`), snowfall depth (`cm`) where recorded, precipitation-phase partitioning thresholds, and maximum consecutive dry days (`CDD`).',
      'Statistical homogeneity breakpoint test statistics (`Pettitt`, `Standard Normal Homogeneity Test`, `Buishand range`) and adjustment offsets.',
      'Cross-comparison bias tables pairing station gauge observations against `ERA5`, `ERA5-Land`, `CHIRPS`, and `GPM IMERG` mountain grid cells.',
      'Non-parametric `Mann-Kendall` Z-statistics and `Theil-Sen` decadal trend slopes with 95% confidence bounds.',
    ],
    qualityAndUncertaintyRule:
      'Winter solid-snowfall gauge undercatch under windy sub-zero conditions and missing synoptic transmissions must be explicitly flagged rather than zero-filled; pre-1991 series are reported separately from the primary 1991–2020 normal.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'C',
    slug: 'appendix-c',
    title: 'Seasonal wind roses and circulation patterns',
    associatedVolumes: ['Volume I', 'Volume II', 'Volume III'],
    associatedChapterCodes: ['01', '03', '06', '09', '11', '14', '15'],
    purpose: [
      'Documents multi-altitude and diurnal wind speed and directional frequency distributions across the Kashmir Valley floor, tributary mountain canyons, bounding passes (Uri, Banihal/Qazigund, Zoji La, Tangdhar), and regional pressure surfaces (`850, 700, 500, and 300 hPa`).',
      'Separates daytime upslope/up-valley anabatic wind roses from nighttime katabatic cold-air drainage and calm-wind (`<0.5 m/s` and `<1.0 m/s`) stagnation hours—demonstrating visually and quantitatively why single-height valley surface anemometers diverge from pass-level and free-tropospheric transport vectors.',
    ],
    requiredVariablesAndRecords: [
      '16-sector directional wind frequency and speed-class bivariate tables stratified by season (`Spring`, `Summer`, `Autumn`, `Winter`) and time of day (`00, 06, 12, 18 IST`).',
      'Calm-hour percentage (`U < 0.5 m/s` and `U < 1.0 m/s`) and anemometer starting-threshold stall specifications.',
      'Vector-mean wind vs. scalar-mean wind speed ratios (`persistence factor`) quantifying diurnal wind reversal and recirculation.',
      'Pass-corridor channelled wind distributions at Qazigund–Banihal and Uri–Baramulla.',
      'Regional `ERA5` streamline and moisture-flux composites at `850, 700, 500, and 250 hPa` across `20°–45° N, 50°–90° E`.',
      'Lagrangian 24-hour recirculation factor (`R_24`) tables across Srinagar, Budgam, Pulwama, and Anantnag.',
    ],
    qualityAndUncertaintyRule:
      'Cup-anemometer stall speeds during near-calm winter nights (`<0.5 m/s`) bias directional vanes; calm hours must be tabulated as an explicit calm category rather than assigned spurious compass azimuths.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'D',
    slug: 'appendix-d',
    title: 'Atmospheric boundary-layer climatology',
    associatedVolumes: ['Volume II', 'Volume IX', 'Volume XII'],
    associatedChapterCodes: ['08', '10', '40', '43', '58'],
    purpose: [
      'Provides the technical parameterization, observational benchmarks, and hourly-seasonal climatological distributions of Planetary Boundary Layer (`PBL`) mixing height (`H_mix`), surface turbulent heat fluxes, friction velocity, and Ventilation Coefficient (`VC = H_mix × U`) across the Kashmir basin.',
      'Reconciles published Kashmir empirical boundary-layer findings—including the 2012–2017 Srinagar black carbon investigation reporting boundary-layer heights spanning roughly `173 to 1,042 m`—against competing bulk-Richardson and TKE diagnostics in `ERA5`, `MERRA-2`, `GDAS`, and high-resolution `WRF-Chem` schemes.',
    ],
    requiredVariablesAndRecords: [
      'Hourly diurnal cycle percentiles (`5th, 25th, 50th, 75th, 95th`) of `H_mix` (`m AGL`) for every calendar month across valley-floor and montane grid cells.',
      'Surface sensible heat flux (`W/m²`), latent heat flux (`W/m²`), friction velocity (`u*`, `m/s`), Monin-Obukhov length (`L`), and bulk Richardson number (`Ri_b`).',
      'Hourly and daily Ventilation Coefficient (`VC = H_mix × U`, `m²/s`) empirical distributions and persistence-hour durations below candidate stagnation thresholds.',
      'Inter-model PBL comparison tables (`ERA5` vs. `MERRA-2` vs. `WRF-YSU` vs. `WRF-MYNN`) quantifying winter snow/fog bias.',
      'Ceilometer / micro-pulse lidar aerosol-backscatter wavelet covariance `H_mix` retrieval equations for field validation.',
      'Sensitivity of simulated surface `PM2.5` to `±25%` perturbations in nocturnal stable boundary-layer depth (`PBL-SENS`).',
    ],
    qualityAndUncertaintyRule:
      'Reanalysis `H_mix` values over snow-covered or fog-capped mountain basins carry substantial diagnostic uncertainty unless anchored to radiosonde potential-temperature profiles or lidar backscatter gradients; all unvalidated model PBL values must carry model-spread bounds.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'E',
    slug: 'appendix-e',
    title: 'Temperature inversion frequency and intensity',
    associatedVolumes: ['Volume II', 'Volume VIII', 'Volume XII'],
    associatedChapterCodes: ['04', '07', '40', '58'],
    purpose: [
      'Catalogues the vertical thermodynamic structure, occurrence frequency, thermal jump (`ΔT`), depth (`Δz`), lapse-rate gradient (`+°C / 100 m`), onset/break-up timing, and multi-day persistence of surface-based and elevated temperature inversions over the Kashmir Valley.',
      'Combines archived upper-air radiosonde soundings at Srinagar with continuous valley-to-mountain pseudo-vertical elevation-transect thermometry (e.g., Srinagar vs. Gulmarg and Qazigund/Anantnag vs. Pahalgam) to track inversions during periods when balloon soundings are sparse or unavailable.',
    ],
    requiredVariablesAndRecords: [
      'Inversion detection criteria (`∂T/∂z > 0` for absolute temperature inversion; `∂θ/∂z` threshold for strong static stability).',
      'Inversion base height (`Z_base`), inversion top height (`Z_top`), layer thickness (`Δz = Z_top − Z_base`), and temperature magnitude (`ΔT = T_top − T_base`).',
      'Classification flag distinguishing surface radiation inversions, cold-air-pool inversions, synoptic subsidence caps, and pre-frontal warm-override inversions.',
      'Pseudo-vertical valley bulk lapse-rate (`Γ_valley = −(T_ridge − T_floor)/(Z_ridge − Z_floor)`) hourly series across paired IMD/AWS elevation stations.',
      'Multi-day non-breakup episode catalog where daytime solar heating fails to erode the morning inversion beneath valley fog.',
      'Explicit metadata tag separating observed IGRA/IMD radiosonde profiles from conceptual pedagogical profiles.',
    ],
    qualityAndUncertaintyRule:
      'Slope-station pseudo-vertical lapse rates reflect near-surface mountain skin heating/cooling in addition to free-air column temperatures and must be calibrated against co-timed radiosonde or satellite/reanalysis profiles.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'F',
    slug: 'appendix-f',
    title: 'Local anthropogenic emission inventory',
    associatedVolumes: ['Volume IV', 'Volume VIII', 'Volume IX'],
    associatedChapterCodes: ['16', '17', '18', '19', '20', '38', '44'],
    purpose: [
      'Specifies the bottom-up calculation equations, activity-data schemas, fuel calorific/sulfur properties, local emission factors, spatial gridding proxies (`1 km × 1 km`), and diurnal-seasonal temporal profiles for all indigenous anthropogenic emission sources operating within the ten districts of the Kashmir Valley.',
      'Covers residential and commercial winter heating (`bukhari`, `hamam`, `kangri` charcoal, firewood, LPG, kerosene, backup diesel generators), road transport (tailpipe cold-start + non-exhaust wear + road-dust resuspension), brick kilns (`FCBTK` vs. `Zig-Zag`), Khrew–Wuyan cement and stone-crusher clusters, horticultural/urban biomass burning, and municipal solid-waste combustion.',
    ],
    requiredVariablesAndRecords: [
      'Core emission equation `E_{i,s,t} = ∑ Activity_{s,f,t} × EF_{i,s,f} × (1 − η_{control})` across pollutants `PM2.5`, `PM10`, `BC`, `OC`, `SO₂`, `NOₓ`, `CO`, `NH₃`, and `NMVOCs`.',
      'District-wise household winter heating fuel consumption matrices and hourly diurnal heating curves.',
      'Vehicle fleet survival tables, VKT estimates, high-altitude/sub-zero cold-start multipliers, and dry-day road-silt resuspension factors.',
      'Geolocated point-source ledger of brick kilns, cement plants, hot-mix units, and stone crushers with verified control efficiencies and operating months.',
      'Orchard area, pruning dry-biomass yield (`t/ha`), open-burned fraction bounds, and municipal uncollected waste-burning estimates.',
      'Monte Carlo log-normal emission-factor and activity-data uncertainty distributions (`±%` 95% CI by sector).',
    ],
    qualityAndUncertaintyRule:
      'Informal solid fuels (domestic firewood, artisanal charcoal, uncollected waste, dusk orchard piles) carry `±40–80%` bottom-up uncertainty and must be constrained against top-down chemical tracers (`levoglucosan`, `¹⁴C`, `K⁺`) prior to finalizing sector shares.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'G',
    slug: 'appendix-g',
    title: 'Regional anthropogenic emission inventory',
    associatedVolumes: ['Volume V', 'Volume VIII', 'Volume IX'],
    associatedChapterCodes: ['21', '22', '23', '24', '38', '43', '44'],
    purpose: [
      'Harmonizes mosaic continental and regional anthropogenic emission inventories across the surrounding `27 km` and `9 km` modelling domains—encompassing northern India (Indo-Gangetic Plain, Jammu, Himachal Pradesh), Pakistan, western China (Xinjiang/Tibetan rim), Afghanistan, Iran, and Central Asia—into a unified chemical speciation and temporal format for `WRF-Chem`.',
      'Prevents artificial cross-border emission discontinuities ("border step artifacts") caused by stitching incompatible national inventories with differing base years, sector definitions, or carbonaceous aerosol speciation splits.',
    ],
    requiredVariablesAndRecords: [
      'Source inventory hierarchy (`EDGAR v8`, `CEDS`, `HTAPv3`, `IIASA ECLIPSE/GAINS`, `COALESCE/SMoG-India`) with explicit base-year scaling factors to 2026.',
      'Country/sub-region territorial mask polygons matching the exact `INDIA-OFF`, `PAKISTAN-OFF`, `CHINA-OFF`, `AFGHANISTAN-OFF`, `CENTRAL-ASIA-OFF`, and `IRAN-OFF` sensitivity domains in Chapter 44.',
      'Chemical mechanism mapping tables translating bulk `NMVOC` and `PM2.5` totals into `MOZART-MOSAIC` / `RADM2` lumped organic and inorganic species.',
      'Plume-rise stack parameters (stack height, exit temperature, exit velocity) for major regional thermal power stations, refineries, and industrial corridors.',
      'Monthly and diurnal sector allocation profiles across power, industry, transport, residential heating, and agricultural ammonia.',
      'TROPOMI `NO₂`, `SO₂`, and `CO` top-down satellite column anomaly checks flagging outdated point-source closures or new industrial commissioning.',
    ],
    qualityAndUncertaintyRule:
      'Natural aeolian desert dust (Taklamakan, Thar, Cholistan, Registan, Dasht-e Lut, Karakum) is strictly excluded from `Appendix G` anthropogenic country masks and parameterized exclusively inside the `DUST-OFF` natural lithogenic module.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'H',
    slug: 'appendix-h',
    title: 'Agricultural fire and biomass-burning database',
    associatedVolumes: ['Volume IV', 'Volume V', 'Volume VIII', 'Volume IX'],
    associatedChapterCodes: ['19', '21', '22', '39', '44'],
    purpose: [
      'Constructs a unified multi-sensor active-fire, burned-area, and pyrogenic emission database spanning intra-Kashmir orchard/agricultural/forest burning as well as post-monsoon paddy-stubble and rabi-wheat burning across Indian Punjab, Haryana, Pakistani Punjab, and wider South-Central Asian corridors from 2001 through November 2026.',
      'Integrates polar-orbiting thermal detections with biome-specific fuel loading, combustion completeness, Fire Radiative Power (`FRP`) time-integrals, and plume-rise injection heights—while explicitly accounting for small-fire satellite omission inside Kashmiri orchards.',
    ],
    requiredVariablesAndRecords: [
      'Merged `MODIS` (`1 km` Collection 6.1) and `Suomi-NPP / NOAA-20 / NOAA-21 VIIRS` (`375 m`) daily fire pixel coordinates, acquisition UTC/IST time, confidence flag, and `FRP` (`MW`).',
      'Land-cover intersection class (`irrigated cropland`, `temperate orchard`, `needleleaf/broadleaf forest`, `shrubland`, `urban interface`) using 10 m ESA WorldCover and local horticultural layers.',
      'Daily dry-matter burned (`kg DM / m²`) and speciated pyrogenic fluxes (`PM2.5`, `PM10`, `BC`, `OC`, `CO`, `NOₓ`, `NH₃`, `SO₂`, `NMVOCs`) cross-comparing `FINN v2.5` and `CAMS GFASv1.2`.',
      'Buoyant plume-top injection height estimates (`Freitas` / `Sofiev` plume-rise formulations compared against `MISR` / `TROPOMI ALH` / `CALIOP` smoke layers).',
      'Small-fire omission adjustment protocol combining Sentinel-2 `20 m` SWIR burn/smoke inspections with bottom-up Kashmiri autumn orchard-pruning calendars.',
      'Forward trajectory intersection flag indicating whether a detected regional fire cluster physically advected toward Western Himalayan passes.',
    ],
    qualityAndUncertaintyRule:
      'Static persistent industrial thermal anomalies (brick kilns, cement kilns, gas flares, steel plants) must be filtered out via persistent thermal-anomaly masks before computing biomass-burning fire statistics.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'I',
    slug: 'appendix-i',
    title: 'Satellite aerosol product inventory',
    associatedVolumes: ['Volume VIII', 'Volume IX'],
    associatedChapterCodes: ['23', '36', '40', '41'],
    purpose: [
      'Documents product versions, spatial/temporal resolutions, wavelength bands, quality-assurance bitmasks, snow/cloud-glint rejection criteria, and vertical sensitivity kernels for all eight Earth-observation satellite missions utilized across Monograph 01.',
      'Provides rigorous mathematical and physical guardrails governing how column-integrated Aerosol Optical Depth (`AOD`), UV Absorbing Aerosol Index (`AAI`), tropospheric trace-gas slant/vertical columns (`mol/m²`), and spaceborne lidar attenuated backscatter (`km⁻¹ sr⁻¹`) are processed over snow-rimmed Himalayan topography.',
    ],
    requiredVariablesAndRecords: [
      'Exact product identifiers: `MCD19A2` (MODIS MAIAC 1 km AOD), `MOD04/MYD04` Deep Blue, `VNP04` VIIRS AOD, `S5P_L2__NO2___`, `S5P_L2__SO2___`, `S5P_L2__CO____`, `S5P_L2__AER_AI`, `CAL_LID_L2_05kmAPro`, and `EarthCARE ATLID` products.',
      'Pixel-level quality-assurance filter thresholds (`qa_value ≥ 0.75` for TROPOMI tropospheric columns; MAIAC cloud/snow-adjacency mask bits; CALIOP CAD score and extinction QC flags).',
      'High-altitude surface reflectance and snow-cover contamination error budgets over Pir Panjal, Greater Himalayas, and winter valley snowpack.',
      'Oversampling/gridding algorithms (`0.01°–0.05°` tessellation) for mapping persistent `NO₂`/`SO₂`/`CO` enhancements over Srinagar, Budgam, Khrew, and regional corridors.',
      'Empirical evaluation metrics comparing satellite `AOD` against ground sun-photometer (`AERONET` where available) and boundary-layer `PM2.5` scaled by `H_mix` and `f(RH)`.',
      'Overpass local solar time windows (`~10:30 Terra`, `~13:30 Aqua/Suomi-NPP/S5P`) and resulting blindness to nocturnal domestic-heating spikes.',
    ],
    qualityAndUncertaintyRule:
      'Dimensionless column `AOD` or `AAI` maps must never be relabelled as surface air-quality concentrations (`µg/m³` or `AQI`); pixels failing snow-reflectance or cloud-margin QA bitmasks are masked as No-Data rather than interpolated.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'J',
    slug: 'appendix-j',
    title: 'Atmospheric back-trajectory methodology',
    associatedVolumes: ['Volume III', 'Volume V', 'Volume IX'],
    associatedChapterCodes: ['15', '21', '22', '23', '24', '42'],
    purpose: [
      'Codifies the complete numerical configuration, receptor coordinate matrix, vertical velocity method, ensemble perturbation grid, clustering equations, and gridded trajectory-receptor weighting formulas (`PSCF`, `CWT`, residence-time analysis) for NOAA `HYSPLIT` modelling in Monograph 01.',
      'Explicitly incorporates NOAA Air Resources Laboratory’s complex-terrain error bounds—showing how integration truncation error (`~15–30%` of travel distance after 72–120 hours) and coarse meteorological topography require multi-model, multi-height ensemble envelopes rather than deterministic single-line attribution.',
    ],
    requiredVariablesAndRecords: [
      'Exact receptor coordinate and elevation table across all 10 Kashmir district centroids and 6 mountain-pass/alpine gateway nodes.',
      'Seven arrival altitudes (`50, 100, 250, 500, 1,000, 1,500, and 3,000 m AGL`), four integration lengths (`−24, −48, −72, −120 h`), and `00/06/12/18 UTC` release schedule.',
      'Vertical motion calculation mode (`3D meteorological model vertical velocity ω` vs. `isobaric` / `isentropic` sensitivity checks) and terrain-intersection termination/sliding rules.',
      '27-member 3D spatial-grid ensemble perturbation (`±Δx, ±Δy, ±Δz`) plus driving-model ensemble (`GDAS 0.25°`, `ERA5 0.25°`, nested `WRF 3 km`).',
      'Potential Source Contribution Function (`PSCF_{ij} = m_{ij} / n_{ij}`) and Concentration Weighted Trajectory (`CWT_{ij}`) equations with arbitrary-weight (`W_{ij}`) low-endpoint-count damping functions.',
      'Wet-precipitation along-trajectory washout censoring rules removing air-parcel segments downstream of heavy en-route rainfall (`>5 mm/6h`).',
    ],
    qualityAndUncertaintyRule:
      'Grid cells traversed by fewer than a minimum threshold of trajectory endpoints (`n_{ij} < 3×` domain mean density) must be down-weighted or masked to eliminate spurious tail hotspots at 120-hour range.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'K',
    slug: 'appendix-k',
    title: 'WRF-Chem modelling configuration',
    associatedVolumes: ['Volume VIII', 'Volume IX'],
    associatedChapterCodes: ['08', '28', '29', '43', '44'],
    purpose: [
      'Provides the reproducible namelist specification (`namelist.input` and `namelist.wps` physics/chemistry choices), four-domain projection geometry (`27 km → 9 km → 3 km → 1 km`), vertical hybrid-eta level stretching, spin-up periods, and numerical stability settings for the coupled `WRF-Chem` atmospheric simulations.',
      'Documents every physical parameterization choice—microphysics, shortwave/longwave radiation, land-surface snow albedo, urban canopy, planetary boundary layer, cumulus convection (on coarse outer nests), photolysis, gas-phase mechanism, and sectional aqueous aerosol module—enabling independent scientific groups to replicate or critique the simulations.',
    ],
    requiredVariablesAndRecords: [
      'Lambert Conformal domain bounding coordinates, grid dimensions (`nx × ny`), horizontal spacings (`27, 9, 3, 1 km`), and one-way vs. two-way feedback flags.',
      'Vertical grid structure (`≥50` hybrid-eta levels up to `50 hPa`, with `≥12–15` levels below `1,000 m AGL` and lowest mass point at `~12–18 m AGL`).',
      'Physics suite matrix: `Morrison 2-moment` microphysics, `RRTMG` SW/LW radiation (with aerosol direct/semi-direct optical coupling), `Noah-MP` snow-hydrology land surface, `YSU` vs. `MYNN 2.5` PBL (`PBL-SENS`), and `Single-Layer Urban Canopy Model (UCM)` over Srinagar.',
      'Chemistry suite (`chem_opt`): `MOZART` gas-phase chemistry coupled with `MOSAIC` 4-bin / 8-bin sectional aerosols including aqueous cloud/fog chemistry and `Fast-J` / `FTUV` photolysis.',
      'Meteorological nudging (`FDDA` spectral/grid nudging above the boundary layer in `d01/d02` only, leaving valley PBL physics un-nudged and free to evolve) and 7-to-10-day chemical spin-up discard rules.',
      'Steep-slope numerical stability parameters (`epssm`, `w_damping`, smoothed/hybrid terrain coordinate settings) over Karakoram–Pir Panjal relief.',
    ],
    qualityAndUncertaintyRule:
      'Before any chemistry or source-attribution output is accepted, `WRF` meteorology (`T_2m`, `RH_2m`, `U_10m`, wind direction, precipitation, and sounding `T/θ` profiles) must pass quantitative mountain meteorological verification benchmarks.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'L',
    slug: 'appendix-l',
    title: 'Geographic source-attribution methodology',
    associatedVolumes: ['Volume V', 'Volume IX'],
    associatedChapterCodes: ['21', '22', '23', '24', '25', '44', '45'],
    purpose: [
      'Defines the mathematical formulation reconciling the 14 brute-force `WRF-Chem` emission/physics sensitivity experiments (`CONTROL`, `LOCAL-OFF`, `INDIA-OFF`, `PAKISTAN-OFF`, `CHINA-OFF`, `AFGHANISTAN-OFF`, `CENTRAL-ASIA-OFF`, `IRAN-OFF`, `FIRE-OFF`, `DUST-OFF`, and 4 physics sensitivity runs) with online tagged-species mass tracking and nonlinear interaction terms.',
      'Prevents the classic attribution error of summing nonlinear zero-out deltas (`∑(CONTROL − REGION_OFF)`) as if they equalled 100% of observed mass, explicitly isolating pure primary contributions from shared multi-region secondary chemical synergy.',
    ],
    requiredVariablesAndRecords: [
      'Exact polygon shapefiles and vertical emission cut-offs defining each geographic perturbation mask (`Kashmir Valley`, `Rest of India`, `Pakistan`, `China`, `Afghanistan`, `Central Asia`, `Iran`).',
      'Brute-force sensitivity delta equation `ΔC_k = C_{CONTROL} − C_{k-OFF}` and relative sensitivity index `S_k = ΔC_k / C_{CONTROL}`.',
      'Nonlinearity residual equation `R_{nonlin} = C_{CONTROL} − (C_{background} + ∑ ΔC_k)` quantifying oxidant competition, `NH₄NO₃` thermodynamic substitution, and radiative-PBL coupling.',
      'Online chemically inert & reactive source-tagged tracer equations tracking geographic origin of primary `BC`/`PM2.5` and `SO₄²⁻`/`NO₃⁻` precursors without perturbing background oxidant state.',
      'Separate ledger partitioning anthropogenic emissions from natural lithogenic dust (`DUST-OFF`) and open biomass fires (`FIRE-OFF`) across every territory.',
      'Spatial receptor aggregation rules (Srinagar urban, 10-district population-weighted valley mean, gateway passes, and alpine cryosphere zones).',
    ],
    qualityAndUncertaintyRule:
      'No country or regional source estimate may be reported as a single point percentage; results must be reported as bounded intervals spanning tagged-tracer shares, brute-force sensitivities, and `CHEMISTRY/BOUNDARY/PBL/DEPOSITION-SENS` physics spread.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'M',
    slug: 'appendix-m',
    title: 'Aerosol chemical fingerprinting',
    associatedVolumes: ['Volume IV', 'Volume VI', 'Volume IX'],
    associatedChapterCodes: ['26', '27', '28', '29', '45'],
    purpose: [
      'Specifies the laboratory analytical protocols, diagnostic chemical ratios, isotopic tracers, and multivariate receptor-modelling source profiles required to fingerprint ambient particulate samples collected across the Kashmir Valley.',
      'Enables empirical laboratory differentiation between Kashmiri domestic wood/kangri/hamam heating, autumn apple-orchard pruning fires, paddy-straw smoke, diesel vehicle exhaust, coal-fired brick kilns, Khrew cement/limestone dust, and long-range desert mineral dust.',
    ],
    requiredVariablesAndRecords: [
      'Dual-filter sampling protocol: pre-baked quartz-fibre filters (for `EC`/`OC` via IMPROVE_A / EUSAAR_2 thermal-optical reflectance, water-soluble ions, `¹⁴C`/`¹³C`, and organic markers) paired with PTFE Teflon filters (for conditioned gravimetric mass and `ICP-MS` / `ED-XRF` trace elements).',
      'Water-soluble inorganic ion suite (`SO₄²⁻`, `NO₃⁻`, `NH₄⁺`, `K⁺`, `Cl⁻`, `Na⁺`, `Ca²⁺`, `Mg²⁺`) and non-sea-salt potassium (`nss-K⁺`) biomass indicator equations.',
      'Anhydrosugar and organic molecular markers via `GC-MS` / `HPLC`: `levoglucosan`, `mannosan`, `galactosan` (distinguishing hardwood/orchard twigs vs. softwood vs. crop straw!), hopanes/steranes (vehicular lubricating oil), and diagnostic PAH ratios.',
      'Crustal and industrial elemental enrichment factors (`EF_crust` normalized to `Al` or `Ti`) separating natural desert/soil silicates (`Si`, `Al`, `Fe`, `Ti`) from Khrew carbonate/clinker (`Ca`, `Mg`, `Sr`) and coal/kiln/traffic metals (`As`, `Se`, `Pb`, `Zn`, `Cu`, `Cr`, `Ni`, `V`).',
      'Dual-carbon isotope (`δ¹³C` and radiocarbon `f_M` / `Δ¹⁴C`) equations providing definitive fossil vs. contemporary non-fossil carbon fractions.',
      'EPA `PMF 5.0` uncertainty-matrix construction (`Polissar` MDL/error equations), factor-number selection (`Q_true/Q_robust`), and `DISP`/`BS` stability rules.',
    ],
    qualityAndUncertaintyRule:
      'Field blanks (`≥10%` of total filter samples), laboratory replicate precision checks, ion-balance (`∑cations` vs. `∑anions`), and reconstructed mass-closure (`OM + EC + SIA + Dust + Trace Elements` vs. gravimetric mass) are mandatory before running `PMF` or `CMB`.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'N',
    slug: 'appendix-n',
    title: 'Monitoring instrument technical registry',
    associatedVolumes: ['Volume VII', 'Volume XI', 'Volume XII'],
    associatedChapterCodes: ['30', '31', '34', '35', '56', '59'],
    purpose: [
      'Maintains the complete hardware, physical measurement-principle, inlet-conditioning, barometric flow-control, and calibration ledger for every regulatory, academic, community, and commercial air-monitoring sensor model deployed or proposed across Jammu, Kashmir, and Ladakh.',
      'Anchors KEW’s transparent institutional self-audit (`0` KEW-owned CPCB CAAQMS stations; 3 community AirGradient optical nodes + 44 `0.1°` CAMS model grids in `air-quality-registry.ts`) alongside JKPCC/CPCB regulatory hardware and commercial aggregator sensor fleets.',
    ],
    requiredVariablesAndRecords: [
      'Instrument make, model, firmware version, physical sensing method (`FRM Gravimetric`, `BAM-1020/1022`, `TEOM-FDMS`, `Plantower PMS5003 / Sensirion SPS30 / AirGradient laser OPC`, `Magee AE33 Aethalometer`, `Cimel Sun Photometer`, `Ceilometer`).',
      'Aerodynamic size-cut mechanism (`VSCC` / `BGI sharp-cut cyclone` vs. virtual impactor vs. optical pulse-height binning without physical cut-head).',
      'Sample-inlet heating and relative-humidity conditioning status (`smart heater controlled at 35–45% RH` vs. `unheated ambient air stream`).',
      'Volumetric flow rate (`L/min`), active barometric pressure/temperature compensation (`ATP` at `~840 hPa` vs. sea-level `STP` conversion), minimum detection limit, and upper saturation ceiling.',
      'Calibration lineage, zero-filter / spanfoil / reference co-location dates, and `κ`-Köhler / multivariate `RH` correction coefficients.',
      'Power-backup autonomy hours across winter electricity load-shedding windows.',
    ],
    qualityAndUncertaintyRule:
      'Any optical particle sensor lacking an inlet dryer/heater or validated local `RH`-correction curve must have all readings acquired at ambient `RH ≥ 85%` automatically flagged as `FOG_HYGROSCOPIC_BIAS_SUSPECT`.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'O',
    slug: 'appendix-o',
    title: 'International AQI breakpoint comparison',
    associatedVolumes: ['Volume VII', 'Volume XI'],
    associatedChapterCodes: ['31', '32', '33', '53', '54'],
    purpose: [
      'Tabulates the exact concentration-to-index breakpoint matrices, required pollutant suites, truncation/rounding rules, averaging periods, category colour/health labels, and super-500 ceiling/extrapolation equations across major national and international air-quality standards.',
      'Demonstrates side-by-side how identical ambient `PM2.5` and `PM10` concentrations (`µg/m³`) translate into markedly different public AQI integers across India `CPCB NAQI`, `US EPA AQI` (both legacy and revised 2024 `PM2.5` breakpoints), `WHO 2021 Air Quality Guidelines` interim targets, `European Environment Agency EAQI`, `China MEP AQI`, and commercial private aggregator formulas.',
    ],
    requiredVariablesAndRecords: [
      'Complete piecewise breakpoint tables (`[C_L, C_H] → [I_L, I_H]`) for `PM2.5`, `PM10`, `NO₂`, `SO₂`, `CO`, `O₃`, and `NH₃`/`Pb` (where applicable) across India `CPCB NAQI` and `US EPA AQI`.',
      'Decimal truncation vs. rounding rules prior to sub-index substitution (e.g., `0.1 µg/m³` truncation for `PM2.5` vs. `1 µg/m³` integer rounding for `PM10` under US EPA rules).',
      'Averaging-window specifications (`24-hour rolling mean` with `≥16 valid hours` under CPCB vs. `US EPA NowCast` weighted 12-hour dynamic responsive formula vs. raw 1-hour app feeds).',
      'Mathematical upper-tail rules above `I = 500`: CPCB hard display cap at `500` vs. US EPA linear slope extension using the highest breakpoint bracket vs. proprietary aggregator slopes.',
      'Reference conversion lookup table mapping `PM2.5` from `5` to `600 µg/m³` (in `5–10 µg/m³` steps) simultaneously to `CPCB NAQI`, `US EPA AQI`, and `WHO 2021 AQG` multiples (`× 15 µg/m³` 24h guideline).',
    ],
    qualityAndUncertaintyRule:
      'Every published or visualized AQI value across Himalayan Dispatch and KEW must explicitly append its standard identifier (`NAQI (India)` or `US EPA AQI`), dominant pollutant, averaging window, and raw `µg/m³` concentration.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'P',
    slug: 'appendix-p',
    title: 'Raw AQI observations and recalculation',
    associatedVolumes: ['Volume VII', 'Volume XII'],
    associatedChapterCodes: ['31', '32', '33', '59', '60'],
    purpose: [
      'Serves as the permanent forensic archive and deterministic recalculation ledger for the November 2026 Srinagar pollution episode—preserving timestamped raw pollutant readings, meteorological co-variables, and platform screenshots/API payloads across official JKPCC/CPCB feeds, KEW’s community AirGradient + CAMS dual-track screening nodes, and third-party commercial platforms (including the reported November 26–27 `AQI.in` reading of `708` vs. JKPCC `~140`).',
      'Applies open, auditable code to recompute sub-indices from raw physical concentrations under standardized `1-hour`, `NowCast`, and `24-hour` windows—isolating how much of the `~140` vs. `708` gap arose from micro-siting, averaging intervals, `RH` fog bias, or index-formula differences.',
    ],
    requiredVariablesAndRecords: [
      'Synchronized hourly UTC and IST (`UTC+05:30`) ledger spanning November 1–28, 2026 across all available Srinagar and Valley data streams.',
      'Complete 12-field forensic metadata record (from Chapter 31) attached to every archived official, community, and commercial observation.',
      'Co-timed IMD Srinagar ambient temperature (`°C`), dewpoint (`°C`), relative humidity (`%`), horizontal visibility (`m`), wind speed (`m/s`), and weather-code fog flags.',
      'Side-by-side recalculated outputs: (a) Raw reported platform AQI, (b) Uncorrected 24h `CPCB NAQI`, (c) Uncorrected 24h `US EPA AQI`, (d) `NowCast` AQI, and (e) `κ`-Köhler `RH`-corrected optical `PM2.5` equivalent AQI.',
      'Ground-to-model delta time series comparing surface screening readings against `ECMWF CAMS` `0.1°` Srinagar centroid grid (`KC-SGR`).',
      'Cryptographic SHA-256 checksums of archived raw CSV/JSON input files and open recalculation scripts.',
    ],
    qualityAndUncertaintyRule:
      'Where a private aggregator platform displays an AQI integer (such as `708`) without exposing its underlying raw `µg/m³` concentration or sensor ID, Appendix P reports implied concentration brackets under candidate breakpoint tables rather than inventing an unverified raw measurement.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'Q',
    slug: 'appendix-q',
    title: 'Statistical validation and uncertainty',
    associatedVolumes: ['Volume VII', 'Volume IX', 'Volume XII'],
    associatedChapterCodes: ['35', '44', '45', '58', '59'],
    purpose: [
      'Establishes the unified mathematical framework for instrument error propagation, atmospheric model skill verification, receptor-model rotational/bootstrap stability, spatial interpolation kriging variance, and calibrated confidence-interval reporting across all 60 chapters.',
      'Ensures that every empirical measurement, reanalysis comparison, and source-attribution output in Monograph 01 satisfies peer-reviewed atmospheric-science verification thresholds rather than relying on cherry-picked visual agreement.',
    ],
    requiredVariablesAndRecords: [
      'Standard atmospheric model evaluation equations: Mean Bias (`MB`), Normalized Mean Bias (`NMB`), Normalized Mean Error (`NME`), Root Mean Square Error (`RMSE`), Fractional Bias (`FB`), Fractional Error (`FE`), Index of Agreement (`IOA`), and correlation (`r`).',
      'Categorical early-warning forecast skill scores: Probability of Detection (`POD`), False Alarm Ratio (`FAR`), Critical Success Index (`CSI`), Heidke Skill Score (`HSS`), and probabilistic `Brier Skill Score`.',
      'GUM (`Guide to the Expression of Uncertainty in Measurement`) quadrature error-propagation equations combining flow, mass, calibration, and `RH`-correction uncertainties.',
      'Block-bootstrap and pre-whitened trend significance protocols accounting for strong temporal autocorrelation in multi-day stagnation time series.',
      'Out-of-sample cross-validation rules reserving `≥20–30%` of station/filter records strictly for independent blind verification.',
      'Calibrated uncertainty vocabulary mapping quantitative 90%/95% confidence intervals to standardized verbal qualifiers.',
    ],
    qualityAndUncertaintyRule:
      'Any simulation period or spatial sub-domain failing minimum meteorological or particulate skill benchmarks must be explicitly flagged as `Unvalidated / Diagnostic Only` and barred from quantitative policy attribution.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'R',
    slug: 'appendix-r',
    title: 'Population exposure methodology',
    associatedVolumes: ['Volume X', 'Volume XI'],
    associatedChapterCodes: ['46', '50', '54'],
    purpose: [
      'Details the geospatial and epidemiological equations used to transform sparse station readings, calibrated sensor networks, satellite-informed land-use regressions, and `WRF-Chem` concentration fields into district- and demographic-stratified human inhalation exposure estimates across the Kashmir Valley.',
      'Documents baseline morbidity/mortality incidence tables, age-specific breathing rates, indoor-outdoor infiltration factors during winter heating months, and epidemiological concentration-response (`CRF`) curves with full sensitivity bounds.',
    ],
    requiredVariablesAndRecords: [
      'Population-weighted concentration equation `C_{PW} = (∑ P_g × C_g) / (∑ P_g)` evaluated across `100 m` / `1 km` gridded population cells (`g`) by district and urban/rural stratum.',
      'Time-activity micro-environment model (`C_{exp} = ∑ f_m × C_m`) accounting for winter indoor residence fractions (`>80%` indoors during Chillai Kalan), building air-exchange rates, and indoor solid-fuel smoke coupling.',
      'Relative Risk (`RR(C)`) and Population Attributable Fraction (`PAF = (RR − 1) / RR`) equations using WHO / GBD nonlinear `IER` and `GEMM` hazard curves across `COPD`, `ALRI`, `IHD`, `stroke`, and `lung cancer`.',
      'Counterfactual theoretical minimum risk exposure level (`TMREL`: `2.4–5.0 µg/m³` WHO/GBD benchmark vs. `40 µg/m³` Indian annual `NAAQS` policy target).',
      'Vulnerable sub-population spatial overlays: schools, neonatal/maternity hospitals, geriatric cohorts, brick-kiln worker settlements, and high-traffic occupational corridors.',
    ],
    qualityAndUncertaintyRule:
      'Transferring global `IER`/`GEMM` exposure-response curves to Himalayan biomass-rich aerosol mixtures carries toxicological slope uncertainty; calculations must report 95% confidence bounds and avoid attributing individual clinical cases.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'S',
    slug: 'appendix-s',
    title: 'Ecological and economic assessment methodology',
    associatedVolumes: ['Volume X', 'Volume XII'],
    associatedChapterCodes: ['47', '48', '49', '50', '60'],
    purpose: [
      'Compiles the biophysical transfer equations and environmental-economics valuation models connecting atmospheric pollution and deposition to Himalayan glacier albedo forcing, orchard/saffron crop stress, aquatic/forest critical loads, healthcare expenditures, labour productivity, and clean-air abatement benefit-cost ratios.',
      'Harmonizes physical ecological impact metrics (`W/m²` snow forcing, `kg N ha⁻¹ yr⁻¹` critical load exceedance, `AOT40 ppm·h` crop ozone exposure) with transparent monetary accounting rules.',
    ],
    requiredVariablesAndRecords: [
      'Cryospheric `SNICAR` radiative-transfer input parameters: snow grain effective radius (`µm`), snowpack density (`kg/m³`), `BC` and `dust` mass mixing ratios (`ng/g`), and coated-soot MAC enhancement factors (`1.1–1.8×`).',
      'Agronomic exposure-yield equations: `AOT40` / `W126` surface ozone indices, foliar dust light-interception `%PAR` loss, and alkaline cement-dust soil pH shift gradients across Pampore saffron and Valley apple belts.',
      'Aquatic and forest critical-load mass-balance equations (`F_{dry} = V_d × C` and `F_{wet} = P × C_{precip}`) over Dal, Wular, alpine tarns, and Dachigam/montane conifer stands.',
      'Cost-of-Illness (`COI`), human-capital lost-workday valuation, and income-adjusted `Value of a Statistical Life (VSL)` elasticity formulas (`VSL_{J&K} = VSL_{ref} × (Y_{J&K}/Y_{ref})^ε`, testing `ε = 0.8–1.2`).',
      'Engineering abatement cost curves (`₹ / tonne PM2.5 and BC avoided`) across household heating retrofits/insulation, panchayat orchard chippers/briquetting, Zig-Zag kiln fuel/fan upgrades, baghouse CEMS, and electric public transit.',
    ],
    qualityAndUncertaintyRule:
      'Direct fiscal expenditures (`COI`, crop market losses, flight disruptions) and non-market welfare valuations (`VSL`, ecosystem-service depreciation) must always be reported in separate ledger columns—never summed into a single opaque headline figure without disaggregation.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
  {
    code: 'T',
    slug: 'appendix-t',
    title: 'Scientific reproducibility, data provenance and bibliography',
    associatedVolumes: ['Volume XI', 'Volume XII'],
    associatedChapterCodes: ['53', '56', '59', '60'],
    purpose: [
      'Anchors the entire 12-volume, 60-chapter monograph in verifiable open-science reproducibility—housing the master data-provenance registry, software/model version manifests, open license attributions, institutional conflict-of-interest and non-exemption disclosures, external specialist peer-review audit logs, and the target `200+` peer-reviewed scientific bibliography.',
      'Guarantees that every chart, map, table, and equation eventually published under Monograph 01 can be traced from its final rendered figure all the way back to raw sensor/satellite observations, version-controlled processing code, and DOI-verified literature.',
    ],
    requiredVariablesAndRecords: [
      'Master Dataset Provenance Table documenting upstream provider, product version, spatial/temporal bounds, download date, terms of use, and persistent URL/DOI (`ECMWF`, `Copernicus CAMS`, `NASA Earthdata`, `NOAA ARL`, `IMD`, `CPCB`, `OpenAQ`, `AirGradient`).',
      'Computational reproducibility manifest specifying exact `WRF-Chem`, `HYSPLIT`, `EPA PMF`, `ISORROPIA-II`, `SNICAR`, and Python/R/TypeScript analysis script versions and random seeds.',
      'Structured `200+` bibliographic database organized by thematic volume with verified DOIs, PubMed IDs, and statutory gazette citations (building from the 11 Foundational Scientific References).',
      'Editorial & Scientific Gate Ledger tracking completion status across documentary verification, internal KEW cross-check, external domain-specialist peer review (climatology, physics, chemistry, metrology, epidemiology, modelling), and post-publication errata.',
      'Explicit Non-Exemption & Self-Audit Declaration recording KEW’s own hardware boundaries alongside governmental, academic, and private-platform limitations.',
    ],
    qualityAndUncertaintyRule:
      'Zero synthetic citations, unverified DOIs, or unarchived proprietary transformations are permitted; every empirical figure must link to an immutable provenance ID and reproducible calculation script.',
    status: 'Protocol Defined · Data Compilation & Validation In Progress',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. LOOKUP HELPERS & MACHINE-READABLE DATASET EXPORT BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

const ROMAN_TO_NUMBER_MAP: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
  xi: 11,
  xii: 12,
};

/**
 * Look up any of the 60 Monograph 01 chapters by canonical slug
 * (`chapter-01-the-atmospheric-geography-of-kashmir`), short prefix (`chapter-01`),
 * two-digit code (`01`), or integer string (`1`).
 */
export function getMonographChapterBySlug(
  slug: string,
): MonographChapter | undefined {
  const clean = decodeURIComponent(slug || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const exact = MONOGRAPH_01_CHAPTERS.find(
    (ch) => ch.slug.toLowerCase() === clean,
  );
  if (exact) return exact;

  const byCode = MONOGRAPH_01_CHAPTERS.find(
    (ch) =>
      ch.code.toLowerCase() === clean ||
      `chapter-${ch.code.toLowerCase()}` === clean ||
      String(ch.number) === clean,
  );
  if (byCode) return byCode;

  const prefixMatch = clean.match(/^chapter-(\d{1,2})\b/);
  if (prefixMatch) {
    const num = Number.parseInt(prefixMatch[1], 10);
    return MONOGRAPH_01_CHAPTERS.find((ch) => ch.number === num);
  }

  return undefined;
}

/**
 * Retrieve previous and next chapters for sequential monograph navigation.
 */
export function getMonographAdjacentChapters(slug: string): {
  previous?: MonographChapter;
  next?: MonographChapter;
} {
  const current = getMonographChapterBySlug(slug);
  if (!current) return {};
  const idx = MONOGRAPH_01_CHAPTERS.findIndex(
    (ch) => ch.number === current.number,
  );
  return {
    previous: idx > 0 ? MONOGRAPH_01_CHAPTERS[idx - 1] : undefined,
    next:
      idx >= 0 && idx < MONOGRAPH_01_CHAPTERS.length - 1
        ? MONOGRAPH_01_CHAPTERS[idx + 1]
        : undefined,
  };
}

/**
 * Look up any of the 12 Monograph 01 thematic volumes by Roman numeral (`I`..`XII`),
 * integer/zero-padded number (`1`..`12`, `01`..`12`), `volume-i`..`volume-xii`,
 * or canonical volume slug.
 */
export function getMonographVolumeByRomanOrNumber(
  token: string | number,
): MonographVolume | undefined {
  if (typeof token === 'number') {
    return MONOGRAPH_01_VOLUMES.find((v) => v.volumeNumber === token);
  }
  const clean = decodeURIComponent(token || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const direct = MONOGRAPH_01_VOLUMES.find(
    (v) =>
      v.slug.toLowerCase() === clean ||
      v.volumeRoman.toLowerCase() === clean ||
      `volume-${v.volumeRoman.toLowerCase()}` === clean ||
      String(v.volumeNumber) === clean ||
      v.volumeNumber.toString().padStart(2, '0') === clean ||
      `volume-${v.volumeNumber.toString().padStart(2, '0')}` === clean ||
      `volume-${v.volumeNumber}` === clean,
  );
  if (direct) return direct;

  if (clean in ROMAN_TO_NUMBER_MAP) {
    const num = ROMAN_TO_NUMBER_MAP[clean];
    return MONOGRAPH_01_VOLUMES.find((v) => v.volumeNumber === num);
  }

  return undefined;
}

/**
 * Return the 5 ordered chapters belonging to a given volume number (1..12).
 */
export function getMonographChaptersByVolume(
  volumeNumber: number,
): MonographChapter[] {
  return MONOGRAPH_01_CHAPTERS.filter((ch) => ch.volumeNumber === volumeNumber);
}

/**
 * Look up any of the 20 Monograph 01 technical appendices by single-letter code
 * (`A`..`T`, case-insensitive), canonical slug (`appendix-a`..`appendix-t`),
 * or extended descriptive slug (`appendix-a-...`).
 */
export function getMonographAppendixBySlugOrCode(
  token: string,
): MonographAppendix | undefined {
  const clean = decodeURIComponent(token || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const exact = MONOGRAPH_01_APPENDICES.find(
    (ap) =>
      ap.slug.toLowerCase() === clean || ap.code.toLowerCase() === clean,
  );
  if (exact) return exact;

  const prefixMatch = clean.match(/^appendix-([a-t])(?:-|$)/);
  if (prefixMatch) {
    const letter = prefixMatch[1].toUpperCase();
    return MONOGRAPH_01_APPENDICES.find((ap) => ap.code === letter);
  }

  return undefined;
}

/**
 * Retrieve previous and next appendices (`A`..`T`) for sequential navigation.
 */
export function getMonographAdjacentAppendices(token: string): {
  previous?: MonographAppendix;
  next?: MonographAppendix;
} {
  const current = getMonographAppendixBySlugOrCode(token);
  if (!current) return {};
  const idx = MONOGRAPH_01_APPENDICES.findIndex(
    (ap) => ap.code === current.code,
  );
  return {
    previous: idx > 0 ? MONOGRAPH_01_APPENDICES[idx - 1] : undefined,
    next:
      idx >= 0 && idx < MONOGRAPH_01_APPENDICES.length - 1
        ? MONOGRAPH_01_APPENDICES[idx + 1]
        : undefined,
  };
}

/**
 * Build the complete machine-readable JSON dataset payload for
 * `/api/himalayan-dispatch/datasets/atmosphere-monograph-framework`.
 */
export function buildAtmosphereMonographDatasetPayload() {
  return {
    schemaVersion: '1.0.0',
    generatedFrameworkId: 'kew-hd-monograph-01-atmosphere-without-borders',
    evidentiaryStatus:
      'Proposed Scientific Monograph & Ongoing Research Framework — Original November 2026 Atmospheric Modelling, Station Validation, and Source Attribution In Progress',
    counts: {
      volumes: MONOGRAPH_01_VOLUMES.length,
      chapters: MONOGRAPH_01_CHAPTERS.length,
      appendices: MONOGRAPH_01_APPENDICES.length,
      centralQuestions: MONOGRAPH_01_SEVEN_QUESTIONS.length,
      masterSpecifications: MONOGRAPH_01_MASTER_SPECIFICATIONS.length,
      foundationalReferences: MONOGRAPH_01_FOUNDATIONAL_REFERENCES.length,
      flagshipComparisonRows: STRATEGIC_FLAGSHIP_COMPARISON.length,
    },
    identity: MONOGRAPH_01_IDENTITY,
    centralScientificQuestions: MONOGRAPH_01_SEVEN_QUESTIONS,
    coreEquations: MONOGRAPH_01_EQUATIONS,
    strategicFlagshipComparison: {
      distinctionSummary: STRATEGIC_FLAGSHIP_DISTINCTION_NOTE,
      rows: STRATEGIC_FLAGSHIP_COMPARISON,
    },
    masterSpecifications: {
      disclaimer: MONOGRAPH_01_MASTER_SPECIFICATIONS_NOTE,
      rows: MONOGRAPH_01_MASTER_SPECIFICATIONS,
    },
    volumes: MONOGRAPH_01_VOLUMES,
    chapters: MONOGRAPH_01_CHAPTERS,
    appendices: MONOGRAPH_01_APPENDICES,
    foundationalReferences: MONOGRAPH_01_FOUNDATIONAL_REFERENCES,
  };
}

function escapeCsvCell(value: string | number): string {
  const str = String(value ?? '');
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Build a machine-readable CSV export covering all 60 chapters and 20 appendices
 * for `/api/himalayan-dispatch/datasets/atmosphere-monograph-framework?format=csv`.
 */
export function buildAtmosphereMonographCsv(): string {
  const headers = [
    'record_type',
    'code',
    'slug',
    'volume_roman',
    'volume_title',
    'title',
    'status',
    'deliverable_or_quality_rule',
    'methodological_caveat',
    'canonical_url',
  ];

  const rows: string[][] = [headers];

  for (const ch of MONOGRAPH_01_CHAPTERS) {
    rows.push([
      'chapter',
      ch.code,
      ch.slug,
      ch.volumeRoman,
      ch.volumeTitle,
      ch.title,
      ch.researchStatus,
      ch.scientificDeliverable,
      ch.methodologicalCaveat,
      `${MONOGRAPH_01_IDENTITY.canonicalMonographPath}/chapters/${ch.slug}`,
    ]);
  }

  for (const ap of MONOGRAPH_01_APPENDICES) {
    rows.push([
      'appendix',
      ap.code,
      ap.slug,
      ap.associatedVolumes.join(' | '),
      `Chapters ${ap.associatedChapterCodes.join(', ')}`,
      ap.title,
      ap.status,
      ap.qualityAndUncertaintyRule,
      ap.purpose[0] || '',
      `${MONOGRAPH_01_IDENTITY.canonicalMonographPath}/appendices/${ap.slug}`,
    ]);
  }

  return rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
}
