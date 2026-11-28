// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 04 & DISPATCH 06 MASTER SCIENTIFIC ARCHITECTURE
// "THE SKY HAS NO BORDERS: THE BIRDS OF THE WESTERN HIMALAYAS: MIGRATION,
//  ECOLOGICAL CONNECTIVITY AND THE LANDSCAPES WE ARE LOSING"
//
// Special Scientific Investigation & Proposed 18-Volume, 54-Chapter Monograph
// + Permanent KEW Companion: Western Himalayan Avian Intelligence Observatory
//
// Evidentiary & Methodological Guardrail:
// Regional species counts, historical population trends, February 2026 Asian
// Waterbird Census species-wise tables, and KEW taxonomic classifications
// require formal reconciliation prior to certification. Surveys, satellite
// telemetry tracks, acoustic arrays, and 54-chapter protocols represent a
// proposed investigative foundation rather than a completed regional census.
// ─────────────────────────────────────────────────────────────────────────────

export type SkyVolumeRoman =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII'
  | 'IX'
  | 'X'
  | 'XI'
  | 'XII'
  | 'XIII'
  | 'XIV'
  | 'XV'
  | 'XVI'
  | 'XVII'
  | 'XVIII';

export interface SkyMonographHeroStat {
  value: string;
  label: string;
}

export interface SkyMonographPublicationTier {
  level: string;
  title: string;
  detail: string;
  href: string;
  ctaLabel: string;
}

export interface SkyMonographMasterSpecificationRow {
  component: string;
  target: string;
}

export interface RegionalChecklistReconciliationRow {
  id: string;
  regionOrPlatform: string;
  reportedCount: string;
  primarySourceOrAuthority: string;
  taxonomicBackboneAndScope: string;
  reconciliationNotes: string;
}

export type RegionalChecklistReconciliationCollection =
  ReadonlyArray<RegionalChecklistReconciliationRow> & {
    readonly methodologicalWarning: string;
  };

export interface KewAvifaunaSelfAuditRow {
  id: string;
  metric: string;
  currentReportedValue: string;
  identifiedDiscrepancy: string;
  requiredAction: string;
  technicalRemediationProtocol: string;
}

export interface KewAvifaunaSelfAuditLedger {
  currentTotals: {
    cataloguedTaxa: number;
    songbirdsFlycatchers: number;
    alpineSpecialists: number;
    migratoryWaterfowl: number;
    raptorsOwls: number;
    pheasantsGalliformes: number;
    overlapNote: string;
  };
  auditRows: KewAvifaunaSelfAuditRow[];
}

export interface TransRegionalFlagshipBird {
  id: string;
  commonName: string;
  scientificName: string;
  iucnGlobalStatus: 'Vulnerable (VU)' | 'Near Threatened (NT)' | 'Least Concern (LC)';
  elevationalBandMeters: string;
  migratoryStrategy: string;
  ecologicalGuild: string;
  regionsConnected: string[];
  indicatorRole: string;
  primaryThreats: string[];
  researchQuestions: string[];
}

export interface WaterbirdAlternativeExplanationRow {
  code: string;
  observedPhenomenon: string;
  naiveInterpretation: string;
  competingEcologicalHypotheses: string;
  empiricalTestRequired: string;
}

export interface WaterbirdCensusParadoxSpec {
  count2020: number;
  count2025: number;
  reportedIncreasePercent: string;
  additionalRecordedBirds: number;
  topFourWetlandsConcentrationPercent: string;
  topFourSource: string;
  awcFeb2026Scope: string;
  disclaimer: string;
  alternativeExplanations8: WaterbirdAlternativeExplanationRow[];
}

export interface FiveRegionInvestigationMatrixRow {
  id: string;
  region:
    | 'Kashmir Valley'
    | 'Jammu'
    | 'Ladakh'
    | 'Azad Jammu & Kashmir'
    | 'Gilgit-Baltistan';
  referenceChecklistRange: string;
  bioclimaticSpan: string;
  principalHabitats: string[];
  researchPriorities: string[];
  localizedCaseNote: string;
}

export interface AvianThreatProtocol {
  code: string;
  threat: string;
  affectedGuilds: string;
  scientificInvestigation: string;
  measurableFieldMetric: string;
  kewCrossModuleHref: string;
}

export interface OrdinaryBirdSentinelGroup {
  code: string;
  group: string;
  representativeTaxa: string;
  localEcologicalNiche: string;
  hypothesizedDriversOfChange: string;
  standardizedMonitoringMethod: string;
}

export type OrdinaryBirdsSentinelsCollection =
  ReadonlyArray<OrdinaryBirdSentinelGroup> & {
    readonly shiftingBaselineNote: string;
  };

export interface ContemporaryOrnithologyShiftRow {
  number: number;
  domain: string;
  traditionalDescriptiveApproach: string;
  contemporaryQuantitativeMethod: string;
  westernHimalayanApplication: string;
}

export interface StakeholderKnowledgeTransferRow {
  code: string;
  stakeholderGroup: string;
  ecologicalInterface: string;
  keyOrnithologicalEvidenceNeeded: string;
  actionableStewardshipProtocol: string;
}

export interface SkyMonographVolumeSpec {
  volumeNumber: number;
  volumeRoman: SkyVolumeRoman;
  slug: string;
  volumeTitle: string;
  chapterRange: string;
  chapterCodes: [string, string, string];
  thematicMandate: string;
}

export interface SkyMonographChapter {
  number: number;
  code: string; // '01' .. '54'
  slug: string;
  volumeNumber: number;
  volumeRoman: SkyVolumeRoman;
  volumeTitle: string;
  title: string;
  researchStatus: 'Proposed Chapter Protocol · Census & Field Validation Ongoing';
  executiveSummary: [string, string];
  investigativeQuestions: string[];
  methodsAndDataSources: string[];
  deliverable: string;
  methodologicalCaveat: string;
}

export interface KewAvianObservatoryModuleSpec {
  code: string;
  title: string;
  operationalFunction: string;
  dataStandard: string;
  currentStatus: string;
  connectedKewSurfaceLabel: string;
  connectedKewSurfaceHref: string;
}

export interface SkyMonographFoundationalReference {
  code: string;
  title: string;
  authorityOrJournal: string;
  yearOrPeriod: string;
  url: string;
  evidentiaryRole: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MASTER MONOGRAPH IDENTITY & EDITORIAL SPECIFICATION
// ─────────────────────────────────────────────────────────────────────────────

export const SKY_NO_BORDERS_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 04 · ORNITHOLOGY & MIGRATORY ECOLOGY',
  editionSlug: 'monograph-04-the-sky-has-no-borders',
  companionDispatchSlug: 'the-sky-has-no-borders',
  companionDispatchNumber: '06',
  canonicalMonographPath:
    '/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders',
  canonicalDispatchPath:
    '/himalayan-dispatch/issues/volume-01-issue-01/the-sky-has-no-borders',
  kewObservatoryPath: '/biodiversity/birds/avian-intelligence-observatory',
  datasetApiPath: '/api/himalayan-dispatch/datasets/avian-monograph-framework',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · ORNITHOLOGY · BIODIVERSITY · MIGRATORY ECOLOGY · HABITAT CONSERVATION',
  title: 'The Sky Has No Borders',
  subtitle:
    'The Birds of the Western Himalayas: Migration, Ecological Connectivity and the Landscapes We Are Losing',
  extendedSubtitle:
    'A trans-regional ornithological investigation reconciling species baselines, Central Asian Flyway connectivity, wetland concentration paradoxes, forest endemism, and habitat transformation across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Ornithology, Biodiversity and Geospatial Intelligence Desk',
  geographicScope:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Central Asian Flyway',
  statusBadge:
    'Proposed 18-Volume, 54-Chapter Scientific Investigation & Taxonomic Reconciliation Architecture',
  heroStats: [
    { value: '18', label: 'Thematic volumes' },
    { value: '54', label: 'Proposed chapters' },
    { value: '5 Regions', label: 'Transboundary scope' },
    { value: '~30 Nations', label: 'Central Asian Flyway' },
  ] as SkyMonographHeroStat[],
  evidentiaryDisclaimer:
    'The regional species census, historical population trends, February 2026 Asian Waterbird Census species-wise tables, and KEW taxonomic classifications require formal reconciliation prior to certification. This monograph establishes the proposed investigative foundation rather than claiming a completed ornithological census.',
  definingEditorialMessage: [
    'Across the Western Himalayas—from the subtropical Shivalik scrub and border marshes of Jammu and the intermontane floodplains of the Kashmir Valley to the high-altitude Changthang fens of Ladakh, the moist temperate valleys of Azad Jammu & Kashmir, and the Karakoram–Indus gorges of Gilgit-Baltistan—avian life moves across an indivisible ecological continuum that recognizes neither administrative boundaries nor lines of control.',
    'Twice each year, flocks travelling along the Central Asian Flyway bind Arctic tundra, Kazakh steppes, Mongolian lakes, and the Tibetan Plateau to wintering waters across roughly thirty nations reaching the Indian Ocean. Within the mountains themselves, altitudinal migrants trace a vertical pulse between 4,500-metre birch–rhododendron treelines and 500-metre foothill valleys, stitching alpine snowfields, conifer forests, shingle-bed rivers, orchards, and village wetlands into a single living watershed.',
    'Yet public conversation about Himalayan birds remains trapped between two blind spots: geopolitical fragmentation that studies connected mountain ridges in isolation, and headline-driven complacency that mistakes rising raw waterfowl counts in a handful of congested sanctuaries for regional ecological recovery.',
    'When roughly ninety-six percent of wintering waterbirds recorded in Kashmir crowd into just four primary basins while satellite marshes are filled, braided gravel bars are mined for construction aggregate, deciduous forest understories are stripped, and orchards intensify chemical spraying, aggregate bird counts can mask severe structural simplification.',
    'Scientific credibility begins with self-examination. Rather than treating published regional checklists—or Kashmir EcoWatch’s own 601-taxon platform ledger—as settled truth, this investigation opens with an explicit taxonomic and methodological audit, separating confirmed breeding populations from vagrants, harmonizing competing global checklists, and testing every census claim against falsifiable ecological hypotheses.',
  ],
  closingQuestion:
    'When the birds that have travelled across continents finally arrive in the Western Himalayas, will they still find the landscapes that their ancestors taught them to return to?',
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (Dispatch 06)',
      title: 'Dispatch 06 — The Sky Has No Borders',
      detail:
        'Published in Vol. 01 / No. 01 of Himalayan Dispatch: synthesizes the five-region checklist audit, the 2020–2025 waterbird concentration paradox, eight trans-regional flagship species, and twelve everyday sentinel bird groups.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-sky-has-no-borders',
      ctaLabel: 'Read Dispatch 06',
    },
    {
      level: '02 · Complete 18-Volume Scientific Monograph',
      title: 'Monograph 04 — 18 Thematic Volumes & 54 Chapter Protocols',
      detail:
        'Full ornithological investigation architecture spanning evolutionary biogeography, checklist reconciliation, Central Asian Flyway aeroecology, wetland energetics, bioacoustics, ethno-ornithology, and the 2027–2035 conservation agenda.',
      href: '/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders',
      ctaLabel: 'Open Monograph 04',
    },
    {
      level: '03 · Permanent KEW Scientific Companion',
      title: 'Western Himalayan Avian Intelligence Observatory',
      detail:
        'Twelve permanent data and audit modules integrated into KEW Biodiversity (/biodiversity/birds/avian-intelligence-observatory) tracking verified taxonomy, migration phenology, acoustic arrays, avian mortality, and BACI conservation outcomes.',
      href: '/biodiversity/birds/avian-intelligence-observatory',
      ctaLabel: 'Open Avian Observatory',
    },
  ] as SkyMonographPublicationTier[],
  masterSpecifications: [
    {
      component: 'Publication classification',
      target:
        'Trans-regional ornithological, migratory-ecology and habitat-conservation monograph',
    },
    {
      component: 'Structural architecture',
      target: '18 thematic volumes (Volumes I–XVIII) · 3 chapters per volume',
    },
    {
      component: 'Proposed chapter protocols',
      target: '54 structured chapter protocols (Chapters 01–54)',
    },
    {
      component: 'Biogeographic scope',
      target:
        'Kashmir Valley · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Central Asian Flyway (~30 nations)',
    },
    {
      component: 'Checklist reconciliation baselines',
      target:
        '7 regional and institutional checklists audited against unified global taxonomic backbones',
    },
    {
      component: 'Trans-regional flagship dossiers',
      target:
        '8 indicator species linking temperate forests, alpine marshes, cliffs, and shingle rivers',
    },
    {
      component: 'Anthropogenic threat protocols',
      target:
        '15 field-measurable threat mechanisms cross-linked to KEW monitoring surfaces',
    },
    {
      component: 'Everyday sentinel bird guilds',
      target:
        '12 common household, orchard, forest, and stream bird groups guarding against shifting baselines',
    },
    {
      component: 'Permanent digital companion',
      target:
        'Western Himalayan Avian Intelligence Observatory (12 operational & proposed modules)',
    },
  ] as SkyMonographMasterSpecificationRow[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. SECTION 1 — REGIONAL CHECKLIST RECONCILIATION (7 BASELINES)
// ─────────────────────────────────────────────────────────────────────────────

export const REGIONAL_CHECKLIST_METHODOLOGICAL_WARNING =
  'Regional bird counts across Kashmir Valley (300+), Jammu & Kashmir combined (592), Ladakh (464 vs. 512), Azad Jammu & Kashmir (552), Gilgit-Baltistan (~362), and the Kashmir EcoWatch ledger (601 taxa) CANNOT be summed to estimate total Western Himalayan avian richness. The majority of resident, altitudinal, and Central Asian Flyway migratory species occur across multiple regions simultaneously. Formal reconciliation requires mapping every taxon to a single versioned taxonomic backbone (IOC World Bird List, Clements/eBird, BirdLife/HBW, or Howard & Moore), resolving lumps, splits, and historical synonyms, separating confirmed breeding residents from winter visitors, passage migrants, and single-record vagrants, and auditing geospatial polygon boundaries along high-elevation ridgelines.';

const REGIONAL_CHECKLIST_RECONCILIATION_ROWS: RegionalChecklistReconciliationRow[] = [
  {
    id: 'chk-01-kashmir-valley',
    regionOrPlatform: 'Kashmir Valley',
    reportedCount: '300+',
    primarySourceOrAuthority:
      'Regional ornithological syntheses, university checklists & valley wetland/forest compilations',
    taxonomicBackboneAndScope:
      'Intermontane Kashmir Basin (Jhelum floodplain, karewas, Dachigam, Pir Panjal north slope & Greater Himalayan side valleys)',
    reconciliationNotes:
      'Historical valley totals vary according to inclusion of unsubstantiated colonial sight records, recent Phylloscopus/Carpodacus/Trochalopteron splits, and high-pass boundary records bordering Ladakh and Jammu.',
  },
  {
    id: 'chk-02-jammu-and-kashmir-combined',
    regionOrPlatform: 'Jammu and Kashmir combined',
    reportedCount: '592',
    primarySourceOrAuthority:
      '2024 Annotated Checklist of Birds of Jammu & Kashmir (Journal of Threatened Taxa)',
    taxonomicBackboneAndScope:
      'Union Territory of Jammu & Kashmir spanning subtropical Jammu plains/Shivaliks, Chenab gorge, Pir Panjal, and Kashmir Valley',
    reconciliationNotes:
      'Peer-reviewed benchmark documenting 592 species; requires ongoing alignment with post-2024 taxonomic updates and disaggregation of historical specimen-only records from contemporary breeding/wintering populations.',
  },
  {
    id: 'chk-03-ladakh-sacon-wii',
    regionOrPlatform: 'Ladakh [SACON–WII Sept 2026]',
    reportedCount: '464',
    primarySourceOrAuthority:
      'SACON–WII Comprehensive Avifaunal Assessment of Ladakh (September 2026)',
    taxonomicBackboneAndScope:
      'Trans-Himalayan Ladakh across Leh, Kargil, Changthang, Nubra, Shyok, Suru, and Zanskar',
    reconciliationNotes:
      'Vetted institutional synthesis applying evidentiary filtering to historical and citizen-science claims; 48 species lower than unvetted global aggregator totals for the same region.',
  },
  {
    id: 'chk-04-ladakh-avibase-clements',
    regionOrPlatform: 'Ladakh [Avibase Clements 2025]',
    reportedCount: '512',
    primarySourceOrAuthority:
      'Avibase Regional Bird Checklist (Clements 2025 taxonomic backbone)',
    taxonomicBackboneAndScope:
      'Ladakh administrative polygon aggregated under Clements/eBird 2025 taxonomy',
    reconciliationNotes:
      'Higher count reflects Clements 2025 taxonomic splits, automated ingestion of peripheral boundary checklists, and provisional/vagrant sight records awaiting formal regional records-committee review.',
  },
  {
    id: 'chk-05-azad-jammu-kashmir',
    regionOrPlatform: 'Azad Jammu & Kashmir [Avibase Howard & Moore]',
    reportedCount: '552',
    primarySourceOrAuthority:
      'Avibase Regional Bird Checklist (Howard & Moore taxonomic backbone)',
    taxonomicBackboneAndScope:
      'Subtropical Mirpur/Mangla Reservoir north to Poonch, Jhelum, Leepa, and subalpine Neelum/Machiara–Salkhala',
    reconciliationNotes:
      'High diversity driven by steep subtropical-to-alpine elevation span and Mangla wintering waterfowl; Howard & Moore species limits must be cross-mapped before direct comparison with Clements or IOC lists.',
  },
  {
    id: 'chk-06-gilgit-baltistan',
    regionOrPlatform: 'Gilgit-Baltistan',
    reportedCount: 'Approximately 362',
    primarySourceOrAuthority:
      'Published regional ornithological surveys & Karakoram–Hindu Kush–Western Himalayan syntheses',
    taxonomicBackboneAndScope:
      'Gilgit, Hunza-Nagar, Skardu/Baltistan, Deosai Plateau, Astor, Diamer, and Ghizer valleys',
    reconciliationNotes:
      'Markedly lower count reflects severe winter and nocturnal passage under-sampling across rugged gorges rather than low biological richness; systematic Indus corridor surveys are expected to expand this baseline.',
  },
  {
    id: 'chk-07-kew-platform-database',
    regionOrPlatform: 'Kashmir EcoWatch database',
    reportedCount: '601 taxa',
    primarySourceOrAuthority:
      'KEW Master Avifaunal Platform Ledger (Pre-Reconciliation Internal Audit Baseline)',
    taxonomicBackboneAndScope:
      'Multi-region Western Himalayan compilation spanning Kashmir, Jammu, Ladakh, AJK, and Gilgit-Baltistan',
    reconciliationNotes:
      'Flagged for formal taxonomic self-audit (Section 2): requires synonym deduplication, standardized single-backbone taxonomy, strict EBA 128 endemism re-coding, and verified per-region seasonal status.',
  },
];

export const REGIONAL_CHECKLIST_RECONCILIATION_7: RegionalChecklistReconciliationCollection =
  Object.assign(REGIONAL_CHECKLIST_RECONCILIATION_ROWS, {
    methodologicalWarning: REGIONAL_CHECKLIST_METHODOLOGICAL_WARNING,
  });

// ─────────────────────────────────────────────────────────────────────────────
// 3. SECTION 2 — KEW AVIFAUNA PLATFORM SELF-AUDIT LEDGER
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_AVIFAUNA_SELF_AUDIT_LEDGER: KewAvifaunaSelfAuditLedger = {
  currentTotals: {
    cataloguedTaxa: 601,
    songbirdsFlycatchers: 330,
    alpineSpecialists: 161,
    migratoryWaterfowl: 95,
    raptorsOwls: 87,
    pheasantsGalliformes: 45,
    overlapNote:
      'Current platform categories overlap and are not independently validated population counts.',
  },
  auditRows: [
    {
      id: 'audit-01-catalogued-taxa',
      metric: 'Catalogued taxa',
      currentReportedValue: '601',
      identifiedDiscrepancy:
        'Combines multi-region Western Himalayan entries without locking to a single dated global taxonomic authority, leaving potential synonym duplicates, subspecies-level entries, and unverified vagrants alongside regular breeders.',
      requiredAction:
        'Reconcile all 601 records against a single versioned global taxonomic backbone with explicit cross-walk tables to IOC, Clements/eBird, and BirdLife/HBW.',
      technicalRemediationProtocol:
        'Assign immutable taxon_id, Avibase ID, GBIF usageKey, taxonomic rank, primary voucher/literature citation, and region-specific status (Breeding Resident, Summer Visitor, Winter Visitor, Passage Migrant, Vagrant).',
    },
    {
      id: 'audit-02-globally-threatened',
      metric: 'Globally threatened species',
      currentReportedValue: '152',
      identifiedDiscrepancy:
        'Substantially exceeds the verified number of globally Critically Endangered (CR), Endangered (EN), and Vulnerable (VU) bird species occurring in the Western Himalayas by conflating Near Threatened (NT), regionally scarce, or mis-mapped taxa with IUCN threatened categories.',
      requiredAction:
        'Audit every species directly against the current BirdLife International / IUCN Red List global assessment and strictly separate CR + EN + VU from NT, LC, and regional conservation priority tiers.',
      technicalRemediationProtocol:
        'Enforce distinct schema fields for global_iucn_status (CR, EN, VU, NT, LC, DD), iucn_assessment_year, BirdLife_SIS_ID, and regional_conservation_priority_tier with automated Red List API checksum validation.',
    },
    {
      id: 'audit-03-endemic-species',
      metric: 'Endemic species',
      currentReportedValue: '353 and 476',
      identifiedDiscrepancy:
        'Two inconsistent figures appear across platform views, and both conflate widespread Himalayan/South Asian native breeders with true Western Himalayan endemics (BirdLife Endemic Bird Area EBA 128 supports ~11 restricted-range species).',
      requiredAction:
        'Retire ambiguous single-flag endemism counts and reclassify all taxa under rigorous, mutually exclusive biogeographic endemism tiers.',
      technicalRemediationProtocol:
        'Implement four standardized biogeographic classes: (1) Strict Western Himalayan Restricted-Range Endemic (EBA 128), (2) Pan-Himalayan Endemic, (3) Endemic Western Himalayan Subspecies, and (4) Non-Endemic Native/Migratory Taxon.',
    },
    {
      id: 'audit-04-district-coverage',
      metric: 'District coverage',
      currentReportedValue: '25 and 27',
      identifiedDiscrepancy:
        'Platform summaries alternate between 25 and 27 monitored districts without clarifying administrative scope (20 J&K districts + 2 statutory Ladakh districts vs. newly proposed Ladakh districts and transboundary AJK/Gilgit-Baltistan units).',
      requiredAction:
        'Establish explicit, versioned administrative unit denominators distinguishing UT-level statutory districts from the complete 5-region transboundary spatial matrix.',
      technicalRemediationProtocol:
        'Bind species distribution arrays to standardized spatial polygon IDs across Kashmir Valley (10), Jammu (10), Ladakh (statutory & sub-regional zones), Azad Jammu & Kashmir (10), and Gilgit-Baltistan (14).',
    },
    {
      id: 'audit-05-protected-species',
      metric: 'Protected species',
      currentReportedValue: '592',
      identifiedDiscrepancy:
        'Reports a near-universal statutory protection figure without distinguishing Schedule I vs. Schedule II of India’s Wildlife (Protection) Amendment Act 2022, AJK/Gilgit-Baltistan territorial wildlife schedules, CITES Appendices, or CMS listings.',
      requiredAction:
        'Disaggregate legal protection into jurisdiction-specific statutory schedules and international treaty appendices with verified Gazette citations.',
      technicalRemediationProtocol:
        'Replace boolean protected flags with a structured legal_status table recording WLPA_2022_Schedule, AJK_GB_Wildlife_Schedule, CITES_Appendix (I/II/III), and CMS_Appendix (I/II).',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SECTION 3 — EIGHT TRANS-REGIONAL FLAGSHIP INDICATOR SPECIES
// ─────────────────────────────────────────────────────────────────────────────

export const TRANS_REGIONAL_FLAGSHIP_BIRDS_8: TransRegionalFlagshipBird[] = [
  {
    id: 'flagship-01-kashmir-flycatcher',
    commonName: 'Kashmir Flycatcher',
    scientificName: 'Ficedula subrubra',
    iucnGlobalStatus: 'Vulnerable (VU)',
    elevationalBandMeters: '1,800–2,700 m (breeding)',
    migratoryStrategy:
      'Long-distance subcontinental migrant: breeds almost exclusively in the Western Himalayas and winters in the central montane hills of Sri Lanka',
    ecologicalGuild:
      'Temperate Broadleaf–Mixed Conifer Forest Understory Insectivore',
    regionsConnected: [
      'Kashmir Valley (Dachigam, Overa-Aru, Hirpora, Limber)',
      'Jammu (Pir Panjal & Chenab moist temperate pockets)',
      'Azad Jammu & Kashmir (Neelum, Jhelum & Machiara–Salkhala valleys)',
    ],
    indicatorRole:
      'Restricted-range Western Himalayan endemic (EBA 128) serving as a sensitive bio-indicator of intact deciduous hazel–walnut–willow (*Corylus–Juglans–Salix–Parrotia*) understory structure within temperate forests.',
    primaryThreats: [
      'Intensive livestock browsing and fuelwood lopping removing closed deciduous understory thickets and natural snag cavities',
      'Fragmentation of mid-elevation temperate forests by hill roads, resorts, and peri-urban expansion',
      'Potential spring phenological mismatch between arrival from Sri Lanka and peak lepidopteran caterpillar emergence',
      'Habitat loss and agrochemical exposure across montane wintering gardens and cloud-forest edges in Sri Lanka',
    ],
    researchQuestions: [
      'What is the contemporary occupancy and effective breeding population size across Dachigam, Overa-Aru, Hirpora, Kazinag, and Machiara?',
      'At what quantitative threshold of understory shrub removal and grazing intensity does Ficedula subrubra abandon otherwise intact conifer stands?',
      'Where are the critical autumn and spring stopover bottlenecks across central and peninsular India linking Kashmir and Sri Lanka?',
    ],
  },
  {
    id: 'flagship-02-western-tragopan',
    commonName: 'Western Tragopan',
    scientificName: 'Tragopan melanocephalus',
    iucnGlobalStatus: 'Vulnerable (VU)',
    elevationalBandMeters: '2,400–3,600 m (seasonal vertical shift to 1,750 m in winter)',
    migratoryStrategy:
      'Short-distance altitudinal migrant between subalpine summer breeding ridges and lower cool-temperate winter valleys',
    ecologicalGuild:
      'Old-Growth Moist Temperate & Subalpine Forest Galliform',
    regionsConnected: [
      'Kashmir Valley (Kazinag, Limber, Tangmarg–Boniyar)',
      'Jammu (Kishtwar High Altitude NP, Bhaderwah, Marwah–Paddar)',
      'Azad Jammu & Kashmir (Machiara NP, Salkhala, Leepa, Neelum)',
      'Gilgit-Baltistan (Astor & Indus Kohistan / Palas contiguous belt)',
    ],
    indicatorRole:
      'Rarest living Himalayan pheasant in the region and apex indicator of undisturbed, steep, closed-canopy spruce–fir–brown oak (*Picea–Abies–Quercus semecarpifolia*) forests with dense ringal bamboo and viburnum cover.',
    primaryThreats: [
      'Intensive May–June human footfall during commercial *Morchella* morel mushroom and medicinal herb collection coinciding directly with incubation',
      'Isolation of small sub-populations across divided ridgelines, linear highways, and border security/hydropower clearings',
      'Migratory livestock grazing and shepherd dogs flushing incubating hens and broods',
      'Opportunistic winter snaring and shooting when heavy snow forces birds into lower village-adjacent oak belts',
    ],
    researchQuestions: [
      'Do Western Tragopan populations across Kazinag–Limber, Machiara–Salkhala–Leepa, and Kishtwar retain functional gene flow or face genetic drift?',
      'How does rotational community regulation of May–June *Morchella* harvesting alter nest survival and call-count density?',
      'Can passive autonomous acoustic arrays provide standardized cross-regional population estimates superior to steep dawn trail transects?',
    ],
  },
  {
    id: 'flagship-03-himalayan-monal',
    commonName: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    iucnGlobalStatus: 'Least Concern (LC)',
    elevationalBandMeters: '2,400–4,500 m',
    migratoryStrategy:
      'Pronounced altitudinal migrant descending from alpine boulders and subalpine birch meadows to winter conifer–oak slopes',
    ecologicalGuild:
      'Subalpine Treeline Ecotone & Alpine Meadow Tuber-Digging Galliform',
    regionsConnected: [
      'Kashmir Valley',
      'Jammu (Pir Panjal, Kishtwar, Doda, Ramban, Poonch)',
      'Azad Jammu & Kashmir (Neelum, Leepa, Haveli)',
      'Gilgit-Baltistan (Astor & Diamer southern Himalayan flank)',
    ],
    indicatorRole:
      'Flagship indicator of vertical forest-to-alpine meadow connectivity, snowpack thermal buffering, and soil invertebrate/tuber community health across treeline ecotones.',
    primaryThreats: [
      'Erratic winter rain-on-snow events creating impenetrable ice crusts over ground tubers alongside shrinking spring snowlines',
      'Overstocking of subalpine margs and shepherd dog predation on ground clutches and flightless chicks',
      'Ski-slope grading, ropeways, and high-altitude tourist infrastructure fragmenting treeline belts',
      'Localized winter trapping and opportunistic poaching during severe snowfalls',
    ],
    researchQuestions: [
      'How do mid-winter snowpack depth and freeze–thaw crust frequency govern altitudinal descent thresholds and overwinter survival?',
      'What grazing intensity and seasonal entry date in alpine margs is compatible with successful Monal brood rearing?',
      'How is climate-driven upward woody encroachment into alpine meadows reshaping habitat partitioning among Himalayan pheasants?',
    ],
  },
  {
    id: 'flagship-04-black-necked-crane',
    commonName: 'Black-necked Crane',
    scientificName: 'Grus nigricollis',
    iucnGlobalStatus: 'Near Threatened (NT)',
    elevationalBandMeters: '4,000–4,900 m (Ladakh breeding marshes)',
    migratoryStrategy:
      'High-altitude trans-Himalayan breeder migrating between Changthang marshes and lower Tibetan/Bhutanese/eastern Himalayan wintering valleys',
    ecologicalGuild:
      'Trans-Himalayan Cold-Desert Fen, Peat-Meadow & Lacustrine Omnivore',
    regionsConnected: [
      'Ladakh (Changthang: Tso Kar, Tso Moriri, Hanle, Chushul, Nyoma, Loma, Dungti)',
      'Tibetan Plateau & Central Asian Flyway High-Altitude Wetland Network',
    ],
    indicatorRole:
      'Sacred cultural icon and ecological keystone of Changthang cold-desert wetlands, indexing freshwater spring discharge, sedge-island integrity, and human–subsidized predator pressure.',
    primaryThreats: [
      'Predation on eggs and chicks by free-ranging and feral dogs sustained by organic waste around settlements, camps, and tourist hubs',
      'Unregulated off-road tourist vehicles, drones, and close-approach photography flushing incubating pairs',
      'Hydrological instability of small nesting islands driven by rapid glacial meltwater pulses and permafrost thaw',
      'Fatal collisions with expanding high-voltage power transmission lines across Hanle, Loma, and Indus/Changthang flight corridors',
    ],
    researchQuestions: [
      'What is the quantitative contribution of feral dog control and waste containment to fledgling recruitment per breeding pair across Changthang?',
      'How are multi-decadal lake-level and salinity changes at Tso Kar and Tso Moriri altering the availability of predator-safe nesting islands?',
      'Which daily foraging and seasonal migration flight paths require immediate power-line flight-diverter retrofitting or burial?',
    ],
  },
  {
    id: 'flagship-05-bar-headed-goose',
    commonName: 'Bar-headed Goose',
    scientificName: 'Anser indicus',
    iucnGlobalStatus: 'Least Concern (LC)',
    elevationalBandMeters: '300–5,000+ m (trans-mountain migration up to >7,000 m)',
    migratoryStrategy:
      'Iconic trans-Himalayan migrant breeding on high Central Asian/Tibetan/Ladakh lakes and wintering across South Asian reservoirs and floodplains',
    ecologicalGuild:
      'High-Altitude Lacustrine Breeder & Floodplain/Reservoir Grazing Waterfowl',
    regionsConnected: [
      'Ladakh (Breeding: Tso Moriri, Chushul, Hanle, Pangong marshes)',
      'Jammu (Wintering: Gharana Wetland, Ranjit Sagar Reservoir)',
      'Azad Jammu & Kashmir (Wintering: Mangla Reservoir)',
      'Kashmir Valley & Gilgit-Baltistan (Indus–Jhelum trans-mountain passage & stopover)',
    ],
    indicatorRole:
      'Living symbol of physiological endurance and transboundary flyway connectivity, directly linking Changthang breeding marshes with lowland agricultural wetlands across divided borders.',
    primaryThreats: [
      'Extreme spatial crowding at tiny wintering sanctuaries such as Gharana Wetland due to surrounding urban and agricultural encroachment',
      'Outbreaks of Highly Pathogenic Avian Influenza (HPAI H5Nx) at dense staging and wintering congregations',
      'Shoreline disturbance and dog predation during flightless post-breeding wing moult on Changthang lakes',
      'Agrochemical exposure in winter wheat/paddy foraging landscapes and illegal shooting outside protected boundaries',
    ],
    researchQuestions: [
      'Which exact Karakoram, Zanskar, and Pir Panjal valley passes carry peak autumn and spring Bar-headed Goose passage?',
      'How does wintering flock hyper-concentration elevate HPAI transmission risk and alter local crop-foraging conflict around Gharana and Mangla?',
      'Are warming Changthang autumns delaying southward departure or enabling partial high-altitude overwintering along unfrozen Indus reaches?',
    ],
  },
  {
    id: 'flagship-06-orange-bullfinch',
    commonName: 'Orange Bullfinch',
    scientificName: 'Pyrrhula aurantiaca',
    iucnGlobalStatus: 'Least Concern (LC)',
    elevationalBandMeters: '2,700–3,900 m (summer); 1,600–2,400 m (winter valleys)',
    migratoryStrategy:
      'Restricted-range altitudinal and irruptive regional migrant tracking winter valley willow/buckthorn thickets and summer birch–fir canopies',
    ecologicalGuild:
      'Western Himalayan Subalpine Conifer–Birch Specialist Granivore',
    regionsConnected: [
      'Kashmir Valley (Sonamarg, Gulmarg, Dachigam, Pahalgam)',
      'Jammu (Kishtwar, Bhaderwah, Sinthan)',
      'Azad Jammu & Kashmir (Neelum Valley)',
      'Gilgit-Baltistan (Astor, Naltar, Fairy Meadows)',
      'Ladakh (Suru–Zanskar vegetated western Transition)',
    ],
    indicatorRole:
      'Near-strict Western Himalayan endemic finch (EBA 128) indexing the ecological integrity of upper *Abies pindrow–Picea smithiana–Betula utilis* treeline forests and winter riparian scrub.',
    primaryThreats: [
      'Degradation, bark peeling, and poor regeneration of subalpine *Betula utilis* birch stands under heavy grazing and firewood cutting',
      'Climate-induced drought stress and disrupted cone-masting cycles in high-elevation fir and spruce belts',
      'Severe baseline data deficiency masking potential localized declines despite nominal Least Concern global status',
      'Winter valley-bottom scrub clearance along riverbanks and tourist towns',
    ],
    researchQuestions: [
      'What is the true breeding density and demographic trend of *Pyrrhula aurantiaca* across Kashmir, Neelum, Kishtwar, and Astor?',
      'How tightly are winter valley irruptions coupled to inter-annual *Betula* and *Abies* seed-crop fluctuations?',
      'Will projected 2030–2050 upward treeline shifts contract available subalpine canopy area on conical Pir Panjal ridges?',
    ],
  },
  {
    id: 'flagship-07-bearded-vulture',
    commonName: 'Bearded Vulture',
    scientificName: 'Gypaetus barbatus',
    iucnGlobalStatus: 'Near Threatened (NT)',
    elevationalBandMeters: '1,200–5,500+ m',
    migratoryStrategy:
      'Wide-ranging montane resident and juvenile long-distance disperser patrolling hundreds of kilometres of transboundary ridgelines',
    ecologicalGuild:
      'Montane & Alpine Osteophagous (Bone-Eating) Cliff-Nesting Scavenger Raptor',
    regionsConnected: [
      'Ladakh',
      'Gilgit-Baltistan',
      'Kashmir Valley',
      'Jammu Highlands',
      'Azad Jammu & Kashmir',
    ],
    indicatorRole:
      'Trans-mountain sentinel of clean pastoral landscapes, wild caprid (markhor, ibex, blue sheep) populations, cliff-nesting solitude, and freedom from veterinary pharmaceutical toxins and poisoned predator baits.',
    primaryThreats: [
      'Exposure to vulture-toxic veterinary NSAIDs (diclofenac, ketoprofen, aceclofenac, nimesulide) in treated domestic livestock carcasses',
      'Secondary poisoning from retaliatory poisoned baits set for snow leopards, wolves, and feral dogs',
      'Collision with high-span valley cables, military/civilian supply wires, and power transmission infrastructure',
      'Disturbance of traditional cliff eyries by road blasting, rock quarrying, and unshielded infrastructure',
    ],
    researchQuestions: [
      'What is the retail pharmacy availability and carcass residue prevalence of vulture-toxic NSAIDs across all five Western Himalayan regions?',
      'How extensive is transboundary juvenile dispersal connecting Karakoram, Ladakh, Kashmir, and AJK breeding territories?',
      'What is the multi-year fledgling success rate at documented cliff eyries across Dachigam, Kishtwar, Zanskar, and Gilgit-Baltistan?',
    ],
  },
  {
    id: 'flagship-08-ibisbill',
    commonName: 'Ibisbill',
    scientificName: 'Ibidorhyncha struthersii',
    iucnGlobalStatus: 'Least Concern (LC)',
    elevationalBandMeters: '1,500–4,400 m (winter descent to 500–1,400 m foothill shingle beds)',
    migratoryStrategy:
      'Partial altitudinal and longitudinal river-corridor migrant descending from frozen high valleys to open braided gravel rivers in winter',
    ecologicalGuild:
      'Monotypic Glacial-Fed Braided Cobble–Shingle River Specialist Wader',
    regionsConnected: [
      'Kashmir Valley (Sindh, Lidder, Rambiara, Bringi, Vishaw)',
      'Ladakh (Indus, Shyok, Nubra, Suru, Zanskar)',
      'Jammu (Chenab, Marusudar, Tawi upper reaches)',
      'Azad Jammu & Kashmir (Neelum & Jhelum shingle bars)',
      'Gilgit-Baltistan (Gilgit, Hunza, Astor, Ghizer, Indus)',
    ],
    indicatorRole:
      'Evolutionarily distinct monotypic family (*Ibidorhynchidae*) whose breeding presence strictly diagnoses unmined, unchannelized braided cobble islands and clean cold-water benthic macroinvertebrate communities.',
    primaryThreats: [
      'Industrial-scale mechanized boulder, gravel, and sand mining excavating active breeding shingle islands across Kashmir and foothill rivers',
      'Run-of-the-river hydropower diversions dewatering cobble reaches and hydropeaking surges drowning May ground-scrape clutches',
      'Concrete flood-wall channelization converting wide braided gravel plains into narrow, high-velocity chutes',
      'Organic sewage and mining siltation smothering stonefly, mayfly, and caddisfly nymph prey under river cobbles',
    ],
    researchQuestions: [
      'What percentage of historical Ibisbill breeding shingle bars along the Sindh, Lidder, Rambiara, and Neelum has been destroyed or degraded by riverbed mining since 2010?',
      'How do sub-daily hydropower peaking releases alter chick survival and benthic EPT prey biomass downstream of barrages?',
      'Can seasonal mining moratoria (March–July) and protected shingle-island reserves restore breeding density in degraded river reaches?',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. SECTION 5 & 6 — WATERBIRD CENSUS PARADOX & 8 ALTERNATIVE EXPLANATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const WATERBIRD_CENSUS_PARADOX_SPEC: WaterbirdCensusParadoxSpec = {
  count2020: 813043,
  count2025: 1343506,
  reportedIncreasePercent: '65.2%',
  additionalRecordedBirds: 530463,
  topFourWetlandsConcentrationPercent: '~96%',
  topFourSource: 'October 2026 RTI-based reporting (Kashmir Impulse)',
  awcFeb2026Scope:
    'February 12, 2026 Asian Waterbird Census covered 27 Kashmir wetlands and 58 census points; survey documentation located, complete final species-wise dataset pending public release.',
  disclaimer:
    'Reported census counts, not an independently established population growth rate. Survey coverage, observer effort, and counting methodologies must be reconciled.',
  alternativeExplanations8: [
    {
      code: 'HYP-01',
      observedPhenomenon: 'Increasing bird numbers',
      naiveInterpretation:
        'Migratory waterbird populations and Kashmir wetland habitat quality have expanded by 65.2% (+530,463 birds) between 2020 and 2025.',
      competingEcologicalHypotheses:
        'Expanded spatial survey network (more wetlands and census watchpoints added), increased volunteer/student observer participation, higher-magnification spotting scopes, unadjusted double-counting of flocks commuting between Wular, Hokersar, Haigam, and Shalbough, or drought displacement from external plains.',
      empiricalTestRequired:
        'Compute effort-calibrated indices restricted to a fixed historical core of census points with identical morning synchronization windows and block-estimation calibration.',
    },
    {
      code: 'HYP-02',
      observedPhenomenon: 'Declining bird numbers',
      naiveInterpretation:
        'A single low annual count proves irreversible Flyway-wide collapse or local sanctuary failure.',
      competingEcologicalHypotheses:
        'Mild northern winters enabling Central Asian flocks to winter farther north ("short-stopping"), severe sub-zero morning ice-over on census day pushing birds onto uncounted open rivers (Jhelum/Indus), or uncoordinated weir drawdown emptying dabbling flats.',
      empiricalTestRequired:
        'Replicate counts monthly across November–March paired with ice-cover fraction, weir gauge logs, and Central Asian Flyway reference indices.',
    },
    {
      code: 'HYP-03',
      observedPhenomenon: 'Birds concentrated in fewer wetlands',
      naiveInterpretation:
        'High densities in Hokersar, Wular, Shalbough, and Haigam/Dal demonstrate extraordinary carrying-capacity success.',
      competingEcologicalHypotheses:
        'Ecological refugee compression (~96% concentration per October 2026 RTI reporting): siltation, encroachment, drainage, and disturbance across twenty-plus smaller satellite jheels force the valley’s wintering birds into four surviving basins, magnifying food depletion and HPAI disease risk.',
      empiricalTestRequired:
        'Track multi-year Shannon spatial evenness and Gini concentration coefficients across all 27 surveyed wetlands alongside satellite inundation maps of smaller marshes.',
    },
    {
      code: 'HYP-04',
      observedPhenomenon: 'New species appearing',
      naiveInterpretation:
        'Wetland restoration is rapidly expanding regional species richness.',
      competingEcologicalHypotheses:
        'Exponential growth in digital telephoto verification, eBird checklist volume, and skilled local birders detecting scarce passage migrants and vagrants that previously went overlooked, alongside climate-driven range boundary shifts.',
      empiricalTestRequired:
        'Standardize species accumulation curves against observer-hours, submitted photograph volume, and synoptic weather anomalies.',
    },
    {
      code: 'HYP-05',
      observedPhenomenon: 'Delayed winter arrival',
      naiveInterpretation:
        'Migratory flocks are permanently abandoning Western Himalayan stopovers.',
      competingEcologicalHypotheses:
        'Later autumn freeze-up across Siberian, Kazakh, and Tibetan staging lakes combined with prolonged October–November precipitation deficits leaving Kashmir marshes dry until early winter Western Disturbances arrive.',
      empiricalTestRequired:
        'Regress 10th-percentile arrival dates against northern staging-lake freeze dates (ERA5/MODIS) and autumn Kashmir wetland water-level gauges.',
    },
    {
      code: 'HYP-06',
      observedPhenomenon: 'Earlier departure',
      naiveInterpretation:
        'Late-winter poaching or disturbance drives premature exodus in February.',
      competingEcologicalHypotheses:
        'Abnormal February warming anomalies (+1.5°C to +3.0°C) accelerating spring snowmelt and northern corridor opening, compounded by mid-winter exhaustion of submerged tubers/seeds in overcrowded basins.',
      empiricalTestRequired:
        'Combine bi-weekly January–March departure counts with late-winter temperature anomalies, exclosure forage-depletion plots, and GPS departure tracks.',
    },
    {
      code: 'HYP-07',
      observedPhenomenon: 'Declining breeding populations',
      naiveInterpretation:
        'Record winter waterfowl counts prove wetland biodiversity is healthy year-round.',
      competingEcologicalHypotheses:
        'Summer-breeding wetland birds (Pheasant-tailed Jacana, Watercock, Little Bittern, Whiskered Tern, Great Reed Warbler, Mallard) face reed harvesting, erratic summer flood pulses, eutrophication, and dog/corvid nest predation wholly invisible to February censuses.',
      empiricalTestRequired:
        'Institute dedicated May–August breeding marsh-bird point counts, reedbed structural audits, and Mayfield nest-survival monitoring.',
    },
    {
      code: 'HYP-08',
      observedPhenomenon: 'Increasing urban birds',
      naiveInterpretation:
        'Large visible bird flocks in Srinagar, Jammu, Leh, Muzaffarabad, and Gilgit indicate thriving urban ecosystems.',
      competingEcologicalHypotheses:
        'Trophic simplification and biotic homogenization: waste-subsidized generalists (Black Kite, House Crow, Rock Pigeon, Common Myna) surge around open garbage, slaughter offal, and concrete structures while insectivores and cavity specialists vanish.',
      empiricalTestRequired:
        'Monitor guild-partitioned urban integrity metrics contrasting synanthropic scavenger/commensal density against native insectivore and specialist richness.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. SECTION 7 — FIVE-REGION WESTERN HIMALAYAN INVESTIGATION MATRIX
// ─────────────────────────────────────────────────────────────────────────────

export const FIVE_REGION_INVESTIGATION_MATRIX_5: FiveRegionInvestigationMatrixRow[] = [
  {
    id: 'reg-01-kashmir-valley',
    region: 'Kashmir Valley',
    referenceChecklistRange: '300+ valley species (within 592 J&K UT checklist)',
    bioclimaticSpan: '1,550 m Jhelum floodplain to >5,200 m Greater Himalayan & Pir Panjal crests',
    principalHabitats: [
      'Intermontane Ramsar wetlands, lakes & floodplains (Wular, Hokersar, Shalbough, Haigam, Mirgund, Dal–Nigeen, Anchar)',
      'Temperate conifer & moist broadleaf-understory forests (Dachigam, Overa-Aru, Kazinag, Limber, Hirpora)',
      'Subalpine birch–rhododendron treelines & alpine margs (Gulmarg, Sonamarg, Tosamaidan, Gurez)',
      'Glacial cobble-bed rivers (Sindh, Lidder, Rambiara, Bringi) & karewa orchard–saffron agro-landscapes',
    ],
    researchPriorities: [
      'Auditing the ~96% winter waterbird concentration across four major basins and rehabilitating degraded satellite jheels',
      'Quantifying understory habitat thresholds and breeding demography of Kashmir Flycatcher and Orange Bullfinch',
      'Measuring orchard pesticide trophic impacts on insectivorous songbirds and rodenticide exposure in owls',
      'Halting mechanized boulder mining across Ibisbill and torrent-bird shingle bars in Rambiara, Sindh, and Lidder',
    ],
    localizedCaseNote:
      'On February 12, 2026, the Asian Waterbird Census surveyed 27 Kashmir wetlands across 58 census points (final species-wise dataset pending release), while October 2026 RTI disclosures revealed ~96% of wintering birds remain packed into just four wetlands.',
  },
  {
    id: 'reg-02-jammu',
    region: 'Jammu',
    referenceChecklistRange: 'Major subtropical-to-alpine share of the 592-species J&K checklist (2024 JoTT)',
    bioclimaticSpan: '280 m Indo-Gangetic alluvial margin & Shivaliks to >6,000 m Kishtwar Himalayas',
    principalHabitats: [
      'Subtropical dry deciduous scrub, Shivalik ridges & chir pine (*Pinus roxburghii*) forests (Nandini, Jasrota, Ramnagar, Surinsar–Mansar)',
      'Border agricultural marshes & major foothill reservoirs (Gharana Wetland Conservation Reserve, Ranjit Sagar)',
      'Deep Chenab–Marusudar river gorges & moist temperate–subalpine highlands (Kishtwar High Altitude NP, Bhaderwah, Paddar, Poonch–Rajouri Pir Panjal)',
    ],
    researchPriorities: [
      'Securing land-buffer hydrology, power-line safety, and crop-conflict management at Gharana Wetland for wintering Bar-headed Geese',
      'Evaluating cumulative hydropower cascade tunneling, dam impoundments, and slope blasting across Chenab–Kishtwar forest and river guilds',
      'Enforcing Vulture Safe Zone NSAID audits across Shivalik pastoral belts for Critically Endangered and Near Threatened vultures',
      'Mapping steep altitudinal migration turnover linking 300 m Jammu winter foothills with 4,000 m Pir Panjal and Kishtwar breeding ridges',
    ],
    localizedCaseNote:
      'Jammu bridges Indomalayan lowland scrub/wetland guilds and Palearctic high-altitude endemics (Western Tragopan in Kishtwar/Bhaderwah), accounting for the high overall richness captured in the 2024 592-species Jammu & Kashmir annotated checklist.',
  },
  {
    id: 'reg-03-ladakh',
    region: 'Ladakh',
    referenceChecklistRange: '464 species (SACON–WII Sept 2026) vs. 512 species (Avibase Clements 2025)',
    bioclimaticSpan: '2,550 m Kargil/Baltistan Indus–Shyok floors to >6,500 m Changthang, Zanskar & Karakoram peaks',
    principalHabitats: [
      'High-altitude Changthang brackish lakes, freshwater fens & peat meadows (Tso Kar, Tso Moriri, Hanle, Chushul, Pangong)',
      'Cold-desert braided shingle rivers & *Hippophae* sea-buckthorn/willow riparian thickets (Indus, Shyok, Nubra, Suru)',
      'Trans-Himalayan gorges, alpine scree, and irrigated barley–apricot oases (Zanskar, Kargil, Chiktan, Sham)',
    ],
    researchPriorities: [
      'Reconciling the 48-species divergence between the September 2026 SACON–WII assessment (464) and Avibase Clements 2025 (512)',
      'Eliminating free-ranging dog predation, organic waste dumps, and off-road vehicle disturbance around breeding Black-necked Cranes',
      'Retrofitting high-voltage Changthang and Indus transmission lines with bird-flight diverters and raptor-safe insulation',
      'Expanding multi-season winter and passage surveys into semi-isolated valleys outside the Leh–Changthang tourist circuit',
    ],
    localizedCaseNote:
      'A 2025 year-long field study in Zanskar documented 81 bird species across all four seasons, demonstrating that continuous local monitoring in snow-bound trans-Himalayan valleys uncovers resident and migratory assemblages missed by brief summer expeditions.',
  },
  {
    id: 'reg-04-azad-jammu-kashmir',
    region: 'Azad Jammu & Kashmir',
    referenceChecklistRange: '552 species (Avibase Howard & Moore taxonomic backbone)',
    bioclimaticSpan: '300 m Mirpur/Bhimber plains & Mangla basin to >4,700 m upper Neelum & Sarwali ridges',
    principalHabitats: [
      'Moist temperate spruce–fir–deodar & deciduous understory forests (Machiara NP, Salkhala, Musk Deer/Gurez NP, Leepa, Neelum)',
      'Pir Panjal montane grasslands and oak–conifer slopes (Poonch, Haveli, Tolipir, Ganga Choti)',
      'Subtropical scrub foothills & major trans-regional wintering waters (Mangla Dam Reservoir, Jhelum–Poonch confluence)',
    ],
    researchPriorities: [
      'Maintaining cross-ridgeline ecological connectivity for Western Tragopan and Kashmir Flycatcher populations shared with Kazinag and Limber',
      'Co-designing community seasonal buffers for May–June *Morchella* mushroom harvesting and alpine grazing in Machiara and Leepa',
      'Standardizing winter waterfowl census protocols and shoreline drawdown/encroachment monitoring across the Mangla Reservoir complex',
      'Cross-walking the 552-species Howard & Moore checklist against IOC/Clements backbones and verifying contemporary breeding status',
    ],
    localizedCaseNote:
      'Peer-reviewed surveys in Machiara National Park and Leepa Valley (published in Cambridge *Oryx*) confirm globally vital Western Tragopan populations directly contiguous with Kazinag–Limber, illustrating why fragmented administrative checklists obscure single biological metapopulations.',
  },
  {
    id: 'reg-05-gilgit-baltistan',
    region: 'Gilgit-Baltistan',
    referenceChecklistRange: 'Approximately 362 documented species (severely under-sampled baseline)',
    bioclimaticSpan: '1,000 m Indus Gorge entry to >8,000 m Karakoram & Nanga Parbat massifs',
    principalHabitats: [
      'Deep Indus, Gilgit, Hunza, and Shyok river gorges serving as trans-montane migratory funnels through the Karakoram–Himalayan barrier',
      'High-elevation alpine plateaus, lakes & sedge wetlands (Deosai National Park, Sheosar, Handarap, Naltar, Borit Lake)',
      'Dry temperate juniper (*Juniperus*), chilghoza pine (*Pinus gerardiana*), spruce & subalpine birch forests (Astor, Fairy Meadows, Diamer, Khunjerab, Central Karakoram)',
    ],
    researchPriorities: [
      'Deploying radar, nocturnal acoustic, and visual watchpoints along the Indus Gorge and Borit Lake to quantify Central Asian Flyway passage',
      'Systematic baseline inventory across Diamer, Ghizer, Skardu, and Astor to resolve severe historical survey deficits (~362 recorded species)',
      'Assessing snowmelt timing, pastoral grazing, and tourism pressures across the Deosai alpine breeding plateau',
      'Monitoring falcon trapping, raptor electrocution, and winter harvest of snowcocks, chukars, and pheasants',
    ],
    localizedCaseNote:
      'Standing where the Western Himalayas, Karakoram, Hindu Kush, and Pamir-Tibetan plateaus meet, Gilgit-Baltistan funnels trans-continental migrants along the Indus Gorge while remaining the most ornithologically under-documented of the five regions.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. SECTION 8 — FIFTEEN ANTHROPOGENIC AVIAN THREAT PROTOCOLS
// ─────────────────────────────────────────────────────────────────────────────

export const AVIAN_THREAT_PROTOCOLS_15: AvianThreatProtocol[] = [
  {
    code: 'THR-01',
    threat: 'Wetland encroachment',
    affectedGuilds:
      'Wintering Central Asian waterfowl, summer reedbed breeders (jacanas, bitterns, rails, terns), marsh harriers',
    scientificInvestigation:
      'Progressive infilling, bunding, residential/commercial conversion, and monoculture willow plantation across floodplain jheels and Ramsar margins (Wular, Hokersar, Haigam, Mirgund, Shalabugh, Gharana, Mangla).',
    measurableFieldMetric:
      'Stage-normalized net open-water and emergent reedbed area loss (ha/yr) via multi-decadal CORONA, Landsat, and Sentinel-1/2 imagery paired with revenue mutation audits.',
    kewCrossModuleHref: '/water-systems/wetlands',
  },
  {
    code: 'THR-02',
    threat: 'Untreated sewage, eutrophication and wetland siltation',
    affectedGuilds:
      'Dabbling and diving ducks, grebes, kingfishers, benthic-feeding shorebirds',
    scientificInvestigation:
      'Catchment soil erosion and raw municipal/agricultural nutrient inflows driving rapid bathymetric infilling, benthic hypoxia, cyanobacterial blooms, and loss of submerged *Potamogeton*/*Chara* food beds.',
    measurableFieldMetric:
      'Annual storage volume loss (m³/yr), orthophosphate & total nitrogen (mg/L), Carlson Trophic State Index (TSI), and submerged macrophyte dry biomass (g/m²).',
    kewCrossModuleHref: '/water-systems/water-quality',
  },
  {
    code: 'THR-03',
    threat: 'Temperate and subalpine forest fragmentation',
    affectedGuilds:
      'Kashmir Flycatcher, Western Tragopan, Orange Bullfinch, treecreepers, nuthatches, woodpeckers',
    scientificInvestigation:
      'Hill-road cutting, tunnel spoil tipping, tourist resort expansion, and intensive browsing/lopping of deciduous shrub understories breaking continuous moist temperate forest tracts.',
    measurableFieldMetric:
      'Interior forest core area (>100 m from edge), canopy closure (%), edge-to-area ratio (m/ha), and 0.5–4 m understory foliage density index.',
    kewCrossModuleHref: '/biodiversity/forest-ecosystems',
  },
  {
    code: 'THR-04',
    threat: 'Riverbed boulder, gravel and sand mining',
    affectedGuilds:
      'Ibisbill, River Lapwing, Little Ringed Plover, Dippers, Forktails, Water Redstarts',
    scientificInvestigation:
      'Heavy-machinery excavation of braided cobble–shingle islands in glacial-fed rivers (Rambiara, Sindh, Lidder, Vishaw, Chenab/Tawi tributaries), obliterating ground-scrape nesting bars and crushing benthic prey habitats.',
    measurableFieldMetric:
      'Excavated shingle-bar area (ha), active braid-channel complexity index, suspended sediment (NTU), and benthic EPT macroinvertebrate density (individuals/m²).',
    kewCrossModuleHref: '/water-systems/rivers',
  },
  {
    code: 'THR-05',
    threat: 'Hydropower diversions, barrages and altered flow regimes',
    affectedGuilds:
      'Torrential river specialists (dippers, ibisbills, crested kingfishers) and valley-corridor migrants',
    scientificInvestigation:
      'Dewatered river reaches downstream of diversion tunnels, unseasonal hydropeaking pulses inundating shingle nests, and concrete channelization across Chenab, Jhelum, Kishanganga/Neelum, and Indus basins.',
    measurableFieldMetric:
      'Lean-season environmental flow compliance (% natural Q90), sub-daily stage ramping rate (cm/hr), and breeding pair territories per river kilometre.',
    kewCrossModuleHref: '/sectoral-eia',
  },
  {
    code: 'THR-06',
    threat: 'Orchard and agricultural pesticide intensification',
    affectedGuilds:
      'Insectivorous songbirds, hoopoes, cuckoos, swallows, starlings, insect-provisioning sparrows, owls',
    scientificInvestigation:
      'High-frequency calendar spraying of insecticides, acaricides, fungicides, and anticoagulant rodenticides across apple orchards and paddy belts collapsing aerial/foliar arthropod prey and causing secondary poisoning.',
    measurableFieldMetric:
      'Pesticide active-ingredient load (kg a.i./ha/yr), Malaise/pitfall arthropod biomass (g/trap-day), and fledgling provisioning rates across IPM vs. conventional orchards.',
    kewCrossModuleHref: '/sectoral-eia/sectors/horticulture',
  },
  {
    code: 'THR-07',
    threat: 'Free-ranging and feral dog predation',
    affectedGuilds:
      'Black-necked Crane, Bar-headed Goose, Ruddy Shelduck, ground-nesting plovers, larks, and marsh breeders',
    scientificInvestigation:
      'Subsidized by uncontained organic waste around camps, towns, and tourist hubs, packs of free-ranging dogs predate eggs, flightless chicks, and moulting waterfowl across Changthang and Kashmir wetlands.',
    measurableFieldMetric:
      'Camera-trap dog encounter index (events/100 trap-nights within 2 km of marshes) and verified percentage of nest/chick losses attributable to canids.',
    kewCrossModuleHref: '/risk-monitoring/wildlife-mortality-kill-records',
  },
  {
    code: 'THR-08',
    threat: 'Power transmission lines, cable cars and linear collision hazards',
    affectedGuilds:
      'Black-necked Crane, Bar-headed Goose, Bearded/Himalayan Vultures, Steppe/Golden Eagles, nocturnal migrants',
    scientificInvestigation:
      'Unmarked high-voltage conductors strung across wetland flight paths and mountain passes causing mid-air wire strikes, alongside uninsulated distribution cross-arms electrocuting perching raptors.',
    measurableFieldMetric:
      'Bias-corrected carcass fatality rate (birds/km/yr adjusted for scavenger removal) and percentage of high-risk spans retrofitted with flight diverters and raptor insulation.',
    kewCrossModuleHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'THR-09',
    threat: 'Veterinary NSAIDs and secondary carcass poisoning',
    affectedGuilds:
      'Bearded Vulture, Himalayan Griffon, Egyptian Vulture, Cinereous Vulture, Steppe Eagle',
    scientificInvestigation:
      'Continued circulation of nephrotoxic veterinary NSAIDs (diclofenac, ketoprofen, aceclofenac, nimesulide) in pastoral livestock treatment and retaliatory poisoned baits targeting large carnivores.',
    measurableFieldMetric:
      'Statutory pharmacy survey compliance (% outlets free of vulture-toxic vials) and LC-MS/MS NSAID/toxin residue incidence in sampled ungulate carcasses.',
    kewCrossModuleHref: '/biodiversity/threatened-species',
  },
  {
    code: 'THR-10',
    threat: 'Climate change, snowline retreat and phenological mismatch',
    affectedGuilds:
      'Long-distance migrants (Kashmir Flycatcher, cuckoos, waterfowl) and high-alpine endemics (snowcocks, rosefinches, Monal)',
    scientificInvestigation:
      'Winter warming, declining snow-water equivalent, earlier spring melt, and unseasonal late-spring cold storms decoupling migration timing from peak insect emergence and compressing summit habitats.',
    measurableFieldMetric:
      'Decadal shift in arrival/departure quantiles (days/decade), MODIS/Sentinel snow-cover duration (days/yr), and breeding elevational centroid shift (m/decade).',
    kewCrossModuleHref: '/seasonal-ecology/migration-windows',
  },
  {
    code: 'THR-11',
    threat: 'Unregulated mass tourism, off-road vehicles and photography intrusion',
    affectedGuilds:
      'Changthang wetland breeders, alpine meadow pheasants/finches, cliff-nesting raptors',
    scientificInvestigation:
      'Off-road SUV driving across Tso Kar/Hanle/Deosai sedge meadows, close-range telephoto and drone harassment of incubating birds, call-playback abuse, and solid-waste generation in fragile high valleys.',
    measurableFieldMetric:
      'Parental flush frequency (events/day), off-road tyre-rut length density (km/km²), and documented sanctuary buffer-zone violations.',
    kewCrossModuleHref: '/sectoral-eia/sectors/tourism',
  },
  {
    code: 'THR-12',
    threat: 'Poaching, illegal trapping and seasonal NTFP harvest disturbance',
    affectedGuilds:
      'Western Tragopan, Himalayan Monal, Chukar/Snowcocks, wintering waterfowl, finches, falcons',
    scientificInvestigation:
      'Illicit winter waterfowl shooting/netting on unprotected floodplains, live cage-bird/falcon trapping, snow-bound pheasant snaring, and widespread May–June human footfall for *Morchella* morel harvesting across nesting slopes.',
    measurableFieldMetric:
      'SMART patrol snare/shotgun-shell encounter rate per 100 km patrolled and May–June human intrusion rate on forest camera/acoustic grids.',
    kewCrossModuleHref: '/protected-areas',
  },
  {
    code: 'THR-13',
    threat: 'Forest fires and agricultural/orchard biomass burning',
    affectedGuilds:
      'Shivalik chir-pine guilds, cavity-nesting woodpeckers/owls, ground-nesting partridges and warblers',
    scientificInvestigation:
      'Dry-spell surface and crown fires across Jammu chir pine, Pir Panjal slopes, and Zabarwan/Dachigam scrub alongside autumn pruning-wood smoke eliminating deadwood snags and ground cover.',
    measurableFieldMetric:
      'VIIRS/Sentinel-2 seasonal burn-scar area (ha), fire-return interval (yr), standing snag survival (stems/ha), and post-burn avian recolonization lag.',
    kewCrossModuleHref: '/hazard-intelligence',
  },
  {
    code: 'THR-14',
    threat: 'Artificial light at night (ALAN), noise and solid-waste subsidies',
    affectedGuilds:
      'Nocturnal trans-Himalayan passerine migrants, acoustic forest/urban songbirds, urban scavenger guilds',
    scientificInvestigation:
      'Unshielded highway/tunnel/resort floodlighting disorienting nocturnal migrants in misty mountain passes, traffic noise masking territorial song, and open municipal landfills driving hyper-abundant crow/kite predation on native nests.',
    measurableFieldMetric:
      'VIIRS nocturnal radiance (nW/cm²/sr), acoustic masking level (dB(A) & 1–8 kHz PSD), and corvid/Black Kite density ratio relative to native songbirds.',
    kewCrossModuleHref: '/risk-monitoring/noise-pollution',
  },
  {
    code: 'THR-15',
    threat: 'Invasive species',
    affectedGuilds:
      'Open-water diving/dabbling waterfowl, scrub/understory insectivores, cavity nesters',
    scientificInvestigation:
      'Choking of open wetland surfaces by invasive *Azolla*, *Salvinia*, *Alternanthera*, and monodominant *Typha* mats; replacement of native berry/insect-host flora by *Lantana camara*, *Robinia pseudoacacia*, and *Parthenium*; and synanthropic cavity competition.',
    measurableFieldMetric:
      'Percentage of wetland open-water area occluded by invasive floating mats (%), exotic-to-native woody stem ratio, and native lepidopteran larval abundance per plant host.',
    kewCrossModuleHref: '/biodiversity/habitat-signals',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. SECTION 9 — TWELVE ORDINARY SENTINEL BIRD GROUPS & SHIFTING BASELINES
// ─────────────────────────────────────────────────────────────────────────────

export const ORDINARY_BIRDS_SHIFTING_BASELINE_NOTE =
  'Shifting Baseline Syndrome Guardrail: Because the Western Himalayas lack a multi-decadal standardized Common Bird Monitoring Scheme comparable to European or North American breeding bird surveys, gradual declines in household, orchard, and village-stream birds risk passing undocumented as each generation accepts a quieter landscape as normal. Perceived losses of sparrows, swallows, hoopoes, cuckoos, and dippers—and perceived expansions of mynas and waste-subsidized scavengers—must be treated as structured scientific hypotheses tested through repeatable point counts, architectural/pesticide covariates, and calibrated ethno-ornithological elder interviews rather than anecdotal nostalgia alone.';

const ORDINARY_BIRDS_SENTINELS_ROWS: OrdinaryBirdSentinelGroup[] = [
  {
    code: 'SEN-01',
    group: 'House sparrows',
    representativeTaxa:
      'House Sparrow (Passer domesticus parkini/indicus) & Russet Sparrow (Passer rutilans)',
    localEcologicalNiche:
      'Human-commensal cavity nester in traditional mud-brick/timber eaves and granivore whose nestlings depend strictly on soft-bodied caterpillars, aphids, and orthopterans during the first 10–14 days.',
    hypothesizedDriversOfChange:
      'Replacement of traditional vented *taq* and *dhajji-dewari* timber roofs with sealed reinforced-concrete and glazed facades, disappearance of open courtyard grain drying, and garden/orchard insecticide depletion of chick prey.',
    standardizedMonitoringMethod:
      '15-minute seasonal courtyard/mohalla point counts stratified by building architecture age, paired with community nest-box brood survival logs.',
  },
  {
    code: 'SEN-02',
    group: 'Swallows',
    representativeTaxa:
      'Barn Swallow (Hirundo rustica), Red-rumped Swallow (Cecropis daurica) & Asian House Martin (Delichon dasypus)',
    localEcologicalNiche:
      'Long-distance migratory aerial insectivores constructing mud-pellet nests beneath wooden shopfront eaves, bridges, and traditional ground-floor livestock sheds (*kuthar*/*gan*).',
    hypothesizedDriversOfChange:
      'Demolition of open timber verandas and mud-plaster ceilings, sealing of household cattle sheds with shuttered concrete storefronts, loss of unpainted mud puddles for nest building, and declining wetland dipteran emergence.',
    standardizedMonitoringMethod:
      'Annual active mud-nest census along fixed 1-km bazaar and village-road transects recording arrival dates, occupied cups, and double-brood success.',
  },
  {
    code: 'SEN-03',
    group: 'Hoopoes',
    representativeTaxa: 'Eurasian Hoopoe (Upupa epops)',
    localEcologicalNiche:
      'Long-billed soil-probing insectivore extracting subterranean cutworms, mole-crickets, and beetle larvae across orchards, lawns, graveyards, and karewa turf; nests in tree and stone-wall cavities.',
    hypothesizedDriversOfChange:
      'Paving and soil compaction of residential compounds, broad-spectrum soil insecticide/herbicide drenching in apple orchards, and felling of hollow old-growth willow, mulberry, and walnut trees.',
    standardizedMonitoringMethod:
      'Spring territorial *hud-hud* acoustic point counts and timed foraging-probe observations across organic/unsprayed vs. intensively sprayed orchard blocks.',
  },
  {
    code: 'SEN-04',
    group: 'Bulbuls',
    representativeTaxa:
      'Himalayan Bulbul (Pycnonotus leucogenys) & Black Bulbul (Hypsipetes leucocephalus)',
    localEcologicalNiche:
      'Keystone native berry/seed dispersers and omnivorous garden–forest edge songbirds linking homestead orchards, scrub slopes, and broadleaf valleys.',
    hypothesizedDriversOfChange:
      'Climate-mediated upward range expansion into higher valleys during milder winters, altered fruiting calendars, and replacement of diverse native fruiting shrubs (*Berberis*, *Cotoneaster*, *Viburnum*) by invasive scrub.',
    standardizedMonitoringMethod:
      'Year-round garden feeder/fruiting-shrub watches and elevational transect mapping to track upper winter and breeding boundary shifts.',
  },
  {
    code: 'SEN-05',
    group: 'Cuckoos',
    representativeTaxa:
      'Common Cuckoo (Cuculus canorus), Indian Cuckoo (Cuculus micropterus) & Pied Cuckoo (Clamator jacobinus)',
    localEcologicalNiche:
      'Trans-continental Afro-Palearctic and monsoon-tracking brood parasites specializing on hairy lepidopteran caterpillars toxic to most passerines, parasitizing chats, leaf-warblers, and laughingthrushes.',
    hypothesizedDriversOfChange:
      'Asynchrony between long-distance spring cuckoo arrival and warmer-spring advancement of resident host egg-laying, alongside caterpillar biomass declines in chemically sprayed agro-forest margins.',
    standardizedMonitoringMethod:
      'Automated passive acoustic tracking of spring first-calling phenology paired with host nest-monitoring along elevational gradients.',
  },
  {
    code: 'SEN-06',
    group: 'Starlings',
    representativeTaxa:
      'Common Starling (Sturnus vulgaris humii — Himalayan breeding race) & Rosy Starling (Pastor roseus)',
    localEcologicalNiche:
      'Gregarious ground-foraging invertebrate predator across damp pastures and paddy bunds; secondary cavity nester reliant on hollow *Salix* willows, *Platanus* chinars, and woodpecked trunks.',
    hypothesizedDriversOfChange:
      'Felling of senescent hollow willow and walnut avenues in favour of short-rotation clonal *Populus* monocultures lacking cavities, plus aggressive cavity usurpation by expanding Common Mynas.',
    standardizedMonitoringMethod:
      'Breeding cavity-tree density plots (cavities/ha) in agroforestry belts and winter/autumn pre-roost flight counts around valley wetlands.',
  },
  {
    code: 'SEN-07',
    group: 'Mynas',
    representativeTaxa:
      'Common Myna (Acridotheres tristis) & Jungle Myna (Acridotheres fuscus)',
    localEcologicalNiche:
      'Thermophilic, behaviorally dominant commensal omnivore and secondary cavity nester tracking human settlements, highway corridors, and open organic waste.',
    hypothesizedDriversOfChange:
      'Urban heat islands, linear highway deforestation, and uncontained roadside waste facilitating upward expansion into higher Himalayan and Ladakh/GB valleys, increasing competition with native cavity nesters.',
    standardizedMonitoringMethod:
      'Elevational road-corridor strip counts from 300 m foothills to 3,200 m towns paired with behavioral cavity-interaction observations.',
  },
  {
    code: 'SEN-08',
    group: 'Woodpeckers',
    representativeTaxa:
      'Himalayan Woodpecker (Dendrocopos himalayensis), Scaly-bellied Woodpecker (Picus squamatus) & Brown-fronted Woodpecker (Dendrocoptes auriceps)',
    localEcologicalNiche:
      'Primary keystone cavity excavators ("ecosystem engineers") regulating wood-boring beetles and creating nesting hollows subsequently used by tits, nuthatches, flycatchers, starlings, and owlets.',
    hypothesizedDriversOfChange:
      'Removal of dead standing snags, decaying limbs, and veteran broadleaf/conifer trees through firewood collection and tidy "sanitary" silviculture.',
    standardizedMonitoringMethod:
      'Fixed-radius forest snag-and-deadwood volume plots paired with spring drumming and call-detection occupancy surveys.',
  },
  {
    code: 'SEN-09',
    group: 'Wagtails',
    representativeTaxa:
      'White Wagtail (Motacilla alba), Grey Wagtail (Motacilla cinerea) & Citrine Wagtail (Motacilla citreola)',
    localEcologicalNiche:
      'Riparian edge, wet-meadow, and flooded-paddy insectivores gleaning emerging aquatic dipterans, stoneflies, and beetles from valley floors to 4,600 m alpine streams.',
    hypothesizedDriversOfChange:
      'Concrete lining of village irrigation *kuhls* and stream banks, household detergent/sewage greywater discharge into micro-channels, and reclamation of wet sedge meadow margins.',
    standardizedMonitoringMethod:
      'Standardized 1-km riparian walkover transects comparing territory density across natural cobble/vegetated banks versus concrete-walled channels.',
  },
  {
    code: 'SEN-10',
    group: 'Kingfishers',
    representativeTaxa:
      'Common Kingfisher (Alcedo atthis), Crested Kingfisher (Megaceryle lugubris) & White-throated Kingfisher (Halcyon smyrnensis)',
    localEcologicalNiche:
      'Apex micro-piscivores and littoral predators requiring clear water columns for plunge-diving sight predation and vertical natural earthen riverbanks for excavating nesting tunnels.',
    hypothesizedDriversOfChange:
      'Chronic turbidity plumes from sand/gravel mining blinding visual hunting, concrete embankment walls eliminating earthen nesting banks, and sewage/pesticide suppression of juvenile native fish (*Schizothorax*, *Triplophysa*).',
    standardizedMonitoringMethod:
      'Linear river/lake shoreline encounter counts (birds/km) paired with Secchi/NTU water clarity logs and earthen-bank nest-burrow mapping.',
  },
  {
    code: 'SEN-11',
    group: 'Owls',
    representativeTaxa:
      'Spotted Owlet (Athene brama), Himalayan Wood Owl (Strix nivicolum), Collared Owlet (Taenioptynx brodiei) & Indian/Eurasian Eagle-Owl (Bubo bengalensis / B. bubo)',
    localEcologicalNiche:
      'Nocturnal rodent and macro-insect regulators occupying ancient hollow *Chinar* (*Platanus orientalis*) and deodar trunks, rock cliffs, graveyards, and traditional granaries.',
    hypothesizedDriversOfChange:
      'Secondary poisoning from second-generation anticoagulant rodenticides (bromadiolone) applied in apple orchards against voles/rats, loss of ancient hollow heritage trees, and superstition-driven persecution.',
    standardizedMonitoringMethod:
      'Passive nocturnal autonomous bioacoustic grids, non-invasive regurgitated pellet prey/rodenticide screening, and heritage-tree cavity registries.',
  },
  {
    code: 'SEN-12',
    group: 'Dippers',
    representativeTaxa:
      'Brown Dipper (Cinclus pallasii) & White-throated Dipper (Cinclus cinclus cashmeriensis)',
    localEcologicalNiche:
      'The world’s only aquatic songbirds—obligate underwater walkers and swimmers in fast, cold, well-oxygenated mountain torrents feeding on Ephemeroptera, Plecoptera, and Trichoptera nymphs.',
    hypothesizedDriversOfChange:
      'Small-hydropower stream dewatering, boulder-mining siltation clogging cobble interstices, raw hill-resort sewage organic loading, and warming late-summer glacial runoff.',
    standardizedMonitoringMethod:
      'Paired upstream–downstream linear territory counts, nest-bridge/cliff survival checks, and Surber-sampler benthic EPT water-quality indexing.',
  },
];

export const ORDINARY_BIRDS_SENTINELS_12: OrdinaryBirdsSentinelsCollection =
  Object.assign(ORDINARY_BIRDS_SENTINELS_ROWS, {
    shiftingBaselineNote: ORDINARY_BIRDS_SHIFTING_BASELINE_NOTE,
  });

// ─────────────────────────────────────────────────────────────────────────────
// 9. SECTION 10 & 11 — CONTEMPORARY ORNITHOLOGY SHIFTS (12) & STAKEHOLDERS (11)
// ─────────────────────────────────────────────────────────────────────────────

export const CONTEMPORARY_ORNITHOLOGY_SHIFTS_12: ContemporaryOrnithologyShiftRow[] = [
  {
    number: 1,
    domain: 'Presence & Distribution',
    traditionalDescriptiveApproach:
      'Static cumulative regional species checklists without effort or non-detection accounting',
    contemporaryQuantitativeMethod:
      'Multi-season hierarchical occupancy modelling (Ψ) explicitly estimating imperfect detection probability (p)',
    westernHimalayanApplication:
      'Separating true species absence from low observer coverage in rugged Kishtwar, Neelum, Zanskar, and Gilgit-Baltistan valleys.',
  },
  {
    number: 2,
    domain: 'Waterbird Population Assessment',
    traditionalDescriptiveApproach:
      'Raw single-morning waterbird headcount totals reported as direct population growth rates',
    contemporaryQuantitativeMethod:
      'Effort-standardized state-space trend models, synchronized block counts, and spatial Gini/Shannon concentration indices',
    westernHimalayanApplication:
      'Testing the 2020–2025 Kashmir waterbird surge (813,043 to 1,343,506) against observer expansion and ~96% four-wetland refugee crowding.',
  },
  {
    number: 3,
    domain: 'Field Observation Networks',
    traditionalDescriptiveApproach:
      'Unstructured opportunistic sight notes and isolated expedition diaries',
    contemporaryQuantitativeMethod:
      'Semi-structured citizen-science checklists capturing complete species reporting, duration, distance, and observer expertise calibration',
    westernHimalayanApplication:
      'Converting regional eBird and campus checklists into bias-corrected spatiotemporal relative abundance surfaces across five regions.',
  },
  {
    number: 4,
    domain: 'Movement & Flyway Tracking',
    traditionalDescriptiveApproach:
      'Low-recovery metal leg banding and inferred seasonal arrival/departure dates',
    contemporaryQuantitativeMethod:
      'Solar GPS-GSM/Argos satellite transmitters, miniature archival geolocators, and barometric altitude loggers',
    westernHimalayanApplication:
      'Mapping exact Karakoram/Pir Panjal pass crossings, flight altitudes, and wintering bottlenecks for Bar-headed Geese, Black-necked Cranes, and Kashmir Flycatchers.',
  },
  {
    number: 5,
    domain: 'Cryptic & Nocturnal Detection',
    traditionalDescriptiveApproach:
      'Short-duration human ear-only dawn trail walks limited by snow and terrain',
    contemporaryQuantitativeMethod:
      'Passive Autonomous Recording Units (ARUs) and multi-month seasonal soundscape arrays',
    westernHimalayanApplication:
      'Simultaneously monitoring dawn Western Tragopan calls, nocturnal owls, and spring cuckoo arrival across snow-bound subalpine slopes.',
  },
  {
    number: 6,
    domain: 'Genetics, Diet & Provenance',
    traditionalDescriptiveApproach:
      'Morphometric skin comparisons and visual stomach/foraging notes alone',
    contemporaryQuantitativeMethod:
      'Museomics, conservation genomics, wetland environmental DNA (eDNA) metabarcoding, and feather stable-isotope (δ²H, δ¹³C, δ¹⁵N) assignment',
    westernHimalayanApplication:
      'Quantifying Western Tragopan cross-valley gene flow, detecting elusive rails/bitterns from marsh water, and inferring natal origins of wintering flocks.',
  },
  {
    number: 7,
    domain: 'Species Classification Screening',
    traditionalDescriptiveApproach:
      'Manual spectrogram inspection and unverified field-notebook identification',
    contemporaryQuantitativeMethod:
      'Automated machine-learning visual and bioacoustic identification',
    westernHimalayanApplication:
      'Using regionally calibrated acoustic and photographic classification pipelines strictly as candidate filters subject to mandatory expert ornithologist verification thresholds.',
  },
  {
    number: 8,
    domain: 'Habitat Quantification',
    traditionalDescriptiveApproach:
      'Coarse static forest-cover classes and nominal administrative wetland areas',
    contemporaryQuantitativeMethod:
      'Multi-sensor satellite coupling: Sentinel-1 SAR inundation under clouds, Sentinel-2 phenology, and GEDI spaceborne LiDAR 3D understory structure',
    westernHimalayanApplication:
      'Linking real-time flooded marsh area and vertical deciduous shrub density directly to waterfowl carrying capacity and Ficedula subrubra occupancy.',
  },
  {
    number: 9,
    domain: 'High-Altitude & Nocturnal Passage',
    traditionalDescriptiveApproach:
      'Daytime valley-floor visual migration counts missing nocturnal broad-front flux',
    contemporaryQuantitativeMethod:
      'Aeroecology combining vertical-looking avian radar, thermal infrared imaging, and nocturnal flight-call (NFC) stations',
    westernHimalayanApplication:
      'Measuring unseen nocturnal passerine and wader migration flux through the Indus Gorge, Zoji La, Banihal, and Burzil corridors.',
  },
  {
    number: 10,
    domain: 'Disease & Toxicology',
    traditionalDescriptiveApproach:
      'Reactive post-mortem reporting only after visible mass bird die-offs occur',
    contemporaryQuantitativeMethod:
      'Proactive One-Health sentinel surveillance: environmental fecal HPAI RT-qPCR screening and LC-MS/MS NSAID/rodenticide/pesticide panels',
    westernHimalayanApplication:
      'Early detection of H5Nx avian influenza in hyper-concentrated Kashmir/Jammu wetlands and veterinary NSAID auditing in vulture zones.',
  },
  {
    number: 11,
    domain: 'Corridor & Climate Planning',
    traditionalDescriptiveApproach:
      'Isolated, static sanctuary boundaries drawn along administrative convenience',
    contemporaryQuantitativeMethod:
      'Circuit-theory landscape connectivity (Circuitscape), elevational stepping-stone optimization, and microclimatic refugia modelling',
    westernHimalayanApplication:
      'Designing functional vertical and trans-regional forest/river corridors capable of buffering 2030–2050 snowline and treeline shifts.',
  },
  {
    number: 12,
    domain: 'Conservation Accountability',
    traditionalDescriptiveApproach:
      'Input accounting (crores sanctioned, saplings planted, dredger hours logged)',
    contemporaryQuantitativeMethod:
      'Before–After Control–Impact (BACI) counterfactual evaluation tied to nest survival, guild diversity, and demographic vital rates',
    westernHimalayanApplication:
      'Auditing wetland engineering, riverbed mining bans, power-line diverters, and grazing regulations by verified biological recovery.',
  },
];

export const STAKEHOLDER_KNOWLEDGE_TRANSFER_11: StakeholderKnowledgeTransferRow[] = [
  {
    code: 'STK-01',
    stakeholderGroup: 'Farmers',
    ecologicalInterface:
      'Paddy floodplains, winter wheat/mustard fields, karewa drylands, and village irrigation *kuhls*',
    keyOrnithologicalEvidenceNeeded:
      'Quantification of natural pest suppression by wagtails, starlings, hoopoes, and owls versus non-target toxicity of seed dressings and rodenticides.',
    actionableStewardshipProtocol:
      'Retain unploughed winter wet-stubble patches near marshes, preserve grassy field bunds and hedgerows, avoid prophylactic neonicotinoid/organophosphate applications, and keep irrigation channels unlined where feasible.',
  },
  {
    code: 'STK-02',
    stakeholderGroup: 'Orchardists',
    ecologicalInterface:
      'High-density and traditional apple, walnut, almond, cherry, and apricot agro-ecosystems across Kashmir, Jammu highlands, Ladakh, AJK, and GB',
    keyOrnithologicalEvidenceNeeded:
      'Spray-calendar windows that devastate nestling insect prey and second-generation anticoagulant rodenticide transfer to Spotted and Wood Owls.',
    actionableStewardshipProtocol:
      'Adopt threshold-based Integrated Pest Management (IPM), suspend broad-spectrum insecticide sprays during peak May–June nestling provisioning, retain hollow heritage walnut/mulberry trees, and install tit/starling/owl nest boxes for biological pest and vole control.',
  },
  {
    code: 'STK-03',
    stakeholderGroup: 'Pastoralists and transhumant herders',
    ecologicalInterface:
      'Subalpine forests, treeline birch belts, alpine margs, and Changthang/Deosai sedge pastures',
    keyOrnithologicalEvidenceNeeded:
      'Spatial overlap of May–June herd entry, accompanying guard dogs, and livestock carcass medications with pheasant, crane, and vulture survival.',
    actionableStewardshipProtocol:
      'Respect rotational late-spring buffers on core Western Tragopan and Black-necked Crane nesting patches, leash or control camp dogs during incubation/chick windows, and use exclusively vulture-safe meloxicam/tolfenamic acid for livestock care.',
  },
  {
    code: 'STK-04',
    stakeholderGroup: 'Urban planners, architects and municipal authorities',
    ecologicalInterface:
      'Expanding cities, peri-urban wetland buffers, building facades, streetlights, and solid-waste systems',
    keyOrnithologicalEvidenceNeeded:
      'Mechanisms of urban biotic homogenization—how sealed facades erase sparrows/swallows while open waste dumps inflate nest-predating crow and kite densities.',
    actionableStewardshipProtocol:
      'Integrate cavity-nesting bricks/eaves into public and residential architecture, enforce closed sanitary solid-waste processing, protect peri-urban wetland sponges from land-use conversion, and mandate downward-shielded warm night lighting.',
  },
  {
    code: 'STK-05',
    stakeholderGroup: 'Hydropower, river-mining and power-grid engineers',
    ecologicalInterface:
      'Braided glacial rivers, diversion barrages, mountain passes, and high-voltage transmission corridors',
    keyOrnithologicalEvidenceNeeded:
      'Fine-scale spatial maps of crane/goose/vulture wire-strike hotspots, electrocution-prone pole geometries, and Ibisbill breeding shingle bars.',
    actionableStewardshipProtocol:
      'Retrofit Changthang and river-valley 66–400 kV spans with high-visibility flight diverters and raptor-safe insulated cross-arms, enforce strict March–July riverbed mining closures on active shingle islands, and maintain ecological flows without destructive hydropeaking.',
  },
  {
    code: 'STK-06',
    stakeholderGroup: 'Wildlife, forest and wetland managers',
    ecologicalInterface:
      'Ramsar sanctuaries, national parks, conservation reserves, and territorial forest divisions',
    keyOrnithologicalEvidenceNeeded:
      'Disaggregated, effort-corrected species trends, summer vs. winter wetland water-stage trade-offs, and snag/understory retention thresholds.',
    actionableStewardshipProtocol:
      'Publish complete open species-by-site Asian Waterbird Census tables with effort metadata, manage wetland weirs for both winter ducks and summer reedbed breeders, prohibit "tidy" removal of dead forest snags, and enforce feral-dog and off-road controls in sanctuaries.',
  },
  {
    code: 'STK-07',
    stakeholderGroup: 'Veterinarians, pharmacists and drug controllers',
    ecologicalInterface:
      'District veterinary hospitals, private agro-vet pharmacies, and livestock health camps across all five regions',
    keyOrnithologicalEvidenceNeeded:
      'Renal toxicity thresholds of diclofenac, ketoprofen, aceclofenac, and nimesulide in *Gyps* and *Gypaetus* vultures versus proven safe alternatives.',
    actionableStewardshipProtocol:
      'Conduct regular statutory audits eliminating multi-dose vulture-toxic NSAID vials from veterinary supply chains and subsidize universal availability of vulture-safe meloxicam and tolfenamic acid.',
  },
  {
    code: 'STK-08',
    stakeholderGroup: 'Tourism operators, trekkers and wildlife photographers',
    ecologicalInterface:
      'Changthang lakes, alpine trekking corridors, birding trails, ski slopes, and riverside camps',
    keyOrnithologicalEvidenceNeeded:
      'Energetic and predation costs of flushing incubating cranes, pheasants, and moulting waterfowl via off-road vehicles, drones, and call playback.',
    actionableStewardshipProtocol:
      'Enforce strict Ethical Birding & Photography Codes: zero drone flights or audio playback for threatened species, mandatory vehicle confinement to designated tracks, minimum standoff buffers at nests, and zero organic camp waste left behind.',
  },
  {
    code: 'STK-09',
    stakeholderGroup: 'Schools, universities and early-career researchers',
    ecologicalInterface:
      'District colleges, school eco-clubs, university zoology/forestry departments, and regional field stations',
    keyOrnithologicalEvidenceNeeded:
      'Geographic and seasonal blind spots (winter Zanskar, Kishtwar, Poonch, Neelum, Gilgit-Baltistan) and quantitative occupancy/bioacoustic training.',
    actionableStewardshipProtocol:
      'Adopt permanent Campus & Village Common Bird Monitoring transects, prioritize year-round under-sampled districts for thesis fieldwork, archive verified audio/specimen vouchers, and publish reproducible raw datasets.',
  },
  {
    code: 'STK-10',
    stakeholderGroup: 'Judiciary, environmental lawyers and policymakers',
    ecologicalInterface:
      'Environmental clearances (EIA/PARIVESH/SEIAA), wetland demarcation courts, wildlife schedules, and flyway treaties',
    keyOrnithologicalEvidenceNeeded:
      'Forensic evidence demonstrating how parcel-by-parcel clearances fragment cumulative flyway networks, unprotected satellite jheels, and cross-valley corridors.',
    actionableStewardshipProtocol:
      'Mandate four-season avifaunal and flyway cumulative impact assessments before approving linear, mining, or hydropower projects; protect unnotified satellite wetlands and braided shingle bars; and advance cooperative CMS Central Asian Flyway data sharing.',
  },
  {
    code: 'STK-11',
    stakeholderGroup: 'Local communities',
    ecologicalInterface:
      'Wetland-edge villages, reed/fishery livelihoods, sacred groves, shrine chinars, graveyards, and household gardens',
    keyOrnithologicalEvidenceNeeded:
      'Recognition of community-stewarded micro-refugia (old graveyard trees, village ponds, traditional eaves) alongside transparent co-management benefits.',
    actionableStewardshipProtocol:
      'Schedule reed, *nadru*, and fodder harvests outside May–July marsh-bird nesting peaks, protect ancient cavity-bearing chinar/mulberry/juniper trees, report early avian mortality or poaching, and co-document vernacular bird knowledge across regional languages.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10A. SECTION 12 — EIGHTEEN THEMATIC VOLUMES (VOLUMES I–XVIII)
// ─────────────────────────────────────────────────────────────────────────────

export const SKY_NO_BORDERS_VOLUMES_18: SkyMonographVolumeSpec[] = [
  {
    volumeNumber: 1,
    volumeRoman: 'I',
    slug: 'volume-i-evolutionary-and-geographical-history',
    volumeTitle:
      'The evolutionary and geographical history of Western Himalayan birds',
    chapterRange: 'Chapters 01–03',
    chapterCodes: ['01', '02', '03'],
    thematicMandate:
      'Reconstructs Himalayan–Karakoram orogeny, Palearctic–Indomalayan faunal exchange, Pleistocene glacial refugia, Western Himalayan Endemic Bird Area (EBA 128) speciation, and two centuries of regional ornithological inquiry.',
  },
  {
    volumeNumber: 2,
    volumeRoman: 'II',
    slug: 'volume-ii-taxonomic-reconciliation-and-checklist-audit',
    volumeTitle:
      'Taxonomic reconciliation, regional checklists and the audit of avian baselines',
    chapterRange: 'Chapters 04–06',
    chapterCodes: ['04', '05', '06'],
    thematicMandate:
      'Harmonizes the seven divergent regional and institutional checklists (300+ to 601 taxa), executes the forensic self-audit of KEW’s avifaunal database, and separates confirmed breeders from passage migrants and vagrants.',
  },
  {
    volumeNumber: 3,
    volumeRoman: 'III',
    slug: 'volume-iii-continental-migration-and-central-asian-flyway',
    volumeTitle:
      'Continental migration and the Central Asian Flyway',
    chapterRange: 'Chapters 07–09',
    chapterCodes: ['07', '08', '09'],
    thematicMandate:
      'Investigates trans-continental connectivity across ~30 Central Asian Flyway nations, physiological mechanics of extreme high-altitude flight, mountain-pass bottlenecks, and nocturnal river-gorge migration conduits.',
  },
  {
    volumeNumber: 4,
    volumeRoman: 'IV',
    slug: 'volume-iv-altitudinal-migration-and-vertical-connectivity',
    volumeTitle:
      'Altitudinal migration and vertical connectivity within mountain watersheds',
    chapterRange: 'Chapters 10–12',
    chapterCodes: ['10', '11', '12'],
    thematicMandate:
      'Examines seasonal vertical movements along the 300 m to 5,500 m elevation gradient, winter survival refugia during extreme snowstorms, and stepping-stone corridor integrity between foothills and alpine ridges.',
  },
  {
    volumeNumber: 5,
    volumeRoman: 'V',
    slug: 'volume-v-kashmir-valley-wetlands-and-census-paradox',
    volumeTitle:
      'Wetlands of the Kashmir Valley and the winter waterbird census paradox',
    chapterRange: 'Chapters 13–15',
    chapterCodes: ['13', '14', '15'],
    thematicMandate:
      'Deconstructs the 2020–2025 reported waterbird increase (813,043 to 1,343,506), investigates the ~96% four-wetland concentration paradox, audits degraded satellite floodplains, and contrasts winter counts with summer marsh-breeder declines.',
  },
  {
    volumeNumber: 6,
    volumeRoman: 'VI',
    slug: 'volume-vi-trans-himalayan-wetlands-and-valleys-of-ladakh',
    volumeTitle:
      'Trans-Himalayan cold-desert wetlands, rivers and plateaus of Ladakh',
    chapterRange: 'Chapters 16–18',
    chapterCodes: ['16', '17', '18'],
    thematicMandate:
      'Investigates Changthang breeding ecology of Black-necked Cranes and Bar-headed Geese, lake-level/permafrost shifts, feral dog predation, and four-season avifaunal dynamics across Zanskar (81 species), Suru, Nubra, and the Indus.',
  },
  {
    volumeNumber: 7,
    volumeRoman: 'VII',
    slug: 'volume-vii-temperate-subalpine-forests-and-endemics',
    volumeTitle:
      'Temperate, subalpine and alpine forest guilds and restricted-range endemics',
    chapterRange: 'Chapters 19–21',
    chapterCodes: ['19', '20', '21'],
    thematicMandate:
      'Establishes demographic, structural-habitat, and connectivity protocols for Kashmir Flycatcher, Western Tragopan, Himalayan Monal, Orange Bullfinch, Kashmir Nuthatch, and treeline birch–conifer specialists.',
  },
  {
    volumeNumber: 8,
    volumeRoman: 'VIII',
    slug: 'volume-viii-jammu-ajk-and-gilgit-baltistan-landscapes',
    volumeTitle:
      'Subtropical foothills, Chenab gorges and transboundary valleys of Jammu, AJK and Gilgit-Baltistan',
    chapterRange: 'Chapters 22–24',
    chapterCodes: ['22', '23', '24'],
    thematicMandate:
      'Synthesizes avian ecology across Jammu’s Shivaliks, Gharana Wetland, and Kishtwar gorges; AJK’s Mangla Reservoir and Machiara–Neelum forests; and Gilgit-Baltistan’s Deosai plains, dry juniper stands, and Indus migration funnel.',
  },
  {
    volumeNumber: 9,
    volumeRoman: 'IX',
    slug: 'volume-ix-glacial-rivers-shingle-islands-and-aquatic-birds',
    volumeTitle:
      'Glacial rivers, braided shingle islands and aquatic avian specialists',
    chapterRange: 'Chapters 25–27',
    chapterCodes: ['25', '26', '27'],
    thematicMandate:
      'Quantifies cobble-bar geomorphology and benthic food webs supporting Ibisbills, Dippers, Forktails, Water Redstarts, and Kingfishers under severe pressure from mechanized riverbed mining and hydropower cascades.',
  },
  {
    volumeNumber: 10,
    volumeRoman: 'X',
    slug: 'volume-x-raptors-vultures-and-nocturnal-predators',
    volumeTitle:
      'Raptors, vultures and nocturnal predators of the mountain sky',
    chapterRange: 'Chapters 28–30',
    chapterCodes: ['28', '29', '30'],
    thematicMandate:
      'Examines Bearded, Himalayan, and Egyptian Vulture scavenger ecology and veterinary NSAID risks, trans-Himalayan eagle/falcon migration watchpoints, and owl conservation across heritage cavity trees and orchards.',
  },
  {
    volumeNumber: 11,
    volumeRoman: 'XI',
    slug: 'volume-xi-agro-ecosystems-cities-and-ordinary-sentinel-birds',
    volumeTitle:
      'Agro-ecosystems, orchards, urbanizing valleys and the fate of ordinary birds',
    chapterRange: 'Chapters 31–33',
    chapterCodes: ['31', '32', '33'],
    thematicMandate:
      'Tracks orchard pesticide impacts, establishes longitudinal monitoring for the twelve everyday sentinel bird groups against shifting baselines, and diagnoses waste-subsidized biotic homogenization in Himalayan cities.',
  },
  {
    volumeNumber: 12,
    volumeRoman: 'XII',
    slug: 'volume-xii-climate-change-snowline-and-phenology',
    volumeTitle:
      'Climate change, cryospheric retreat and phenological mismatch',
    chapterRange: 'Chapters 34–36',
    chapterCodes: ['34', '35', '36'],
    thematicMandate:
      'Models winter warming, snow-cover contraction, shifted arrival–departure windows, trophic decoupling between spring arthropod peaks and chick rearing, and summit-trap range contractions through 2050.',
  },
  {
    volumeNumber: 13,
    volumeRoman: 'XIII',
    slug: 'volume-xiii-infrastructure-mortality-sinks-and-avian-health',
    volumeTitle:
      'Infrastructure, linear barriers, mortality sinks and avian health',
    chapterRange: 'Chapters 37–39',
    chapterCodes: ['37', '38', '39'],
    thematicMandate:
      'Investigates power-line collisions and raptor electrocutions, nocturnal light pollution, road noise, unregulated off-road tourism, and One-Health surveillance of HPAI H5Nx, botulism, and toxic contaminants.',
  },
  {
    volumeNumber: 14,
    volumeRoman: 'XIV',
    slug: 'volume-xiv-ethno-ornithology-and-multilingual-heritage',
    volumeTitle:
      'Ethno-ornithology, cultural memory and multilingual avian heritage',
    chapterRange: 'Chapters 40–42',
    chapterCodes: ['40', '41', '42'],
    thematicMandate:
      'Preserves avian oral literature, seasonal agricultural proverbs, sacred-grove/graveyard stewardship, and cross-mapped vernacular bird lexicons across Kashmiri, Dogri, Ladakhi, Pahari, Gojri, Shina, Balti, and Burushaski.',
  },
  {
    volumeNumber: 15,
    volumeRoman: 'XV',
    slug: 'volume-xv-bioacoustics-telemetry-and-geospatial-methods',
    volumeTitle:
      'Contemporary ornithological methods, bioacoustics, telemetry and geospatial intelligence',
    chapterRange: 'Chapters 43–45',
    chapterCodes: ['43', '44', '45'],
    thematicMandate:
      'Specifies field and analytical protocols for passive ARU soundscapes, automated machine-learning acoustic and visual species identification with expert verification, satellite telemetry, radar, eDNA, isotopes, and Sentinel/GEDI coupling.',
  },
  {
    volumeNumber: 16,
    volumeRoman: 'XVI',
    slug: 'volume-xvi-citizen-science-open-data-and-census-reform',
    volumeTitle:
      'Citizen science, open data standards and institutional monitoring reform',
    chapterRange: 'Chapters 46–48',
    chapterCodes: ['46', '47', '48'],
    thematicMandate:
      'Establishes bias-calibration standards for citizen science, defines Darwin Core data governance and sensitive-nest coordinate masking for the KEW Observatory, and reforms official wildlife census disclosure.',
  },
  {
    volumeNumber: 17,
    volumeRoman: 'XVII',
    slug: 'volume-xvii-law-governance-and-flyway-diplomacy',
    volumeTitle:
      'Law, governance, protected-area gaps and transboundary flyway diplomacy',
    chapterRange: 'Chapters 49–51',
    chapterCodes: ['49', '50', '51'],
    thematicMandate:
      'Audits statutory wildlife schedules, Ramsar compliance, unprotected satellite wetlands and shingle rivers, EIA cumulative flyway safeguards, and cooperative implementation of the CMS Central Asian Flyway Action Plan.',
  },
  {
    volumeNumber: 18,
    volumeRoman: 'XVIII',
    slug: 'volume-xviii-western-himalayan-avian-conservation-agenda-2027-2035',
    volumeTitle:
      'The Western Himalayan Avian Conservation Agenda 2027–2035',
    chapterRange: 'Chapters 52–54',
    chapterCodes: ['52', '53', '54'],
    thematicMandate:
      'Translates monograph findings into sectoral action protocols for eleven stakeholder groups, counterfactual BACI conservation outcome audits, and a measurable 2027–2035 regional refugia and monitoring roadmap.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10B. SECTION 12 — FIFTY-FOUR PROPOSED CHAPTER PROTOCOLS (CHAPTERS 01–54)
// ─────────────────────────────────────────────────────────────────────────────

export const SKY_NO_BORDERS_CHAPTERS_54: SkyMonographChapter[] = [
  // VOLUME I — Chapters 01–03
  {
    number: 1,
    code: '01',
    slug: 'chapter-01-tectonic-uplift-and-biogeographic-convergence',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle:
      'The evolutionary and geographical history of Western Himalayan birds',
    title:
      'Tectonic Uplift, Palearctic–Indomalayan Convergence and the Avian Architecture of the Western Himalayas',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines how Cenozoic collision of the Indian and Eurasian plates forged the Pir Panjal, Greater Himalaya, Zanskar, Ladakh, and Karakoram ranges into a steep biogeographic crossroads where Palearctic, Sino-Himalayan, Central Asian, and Indomalayan avifaunas intersect.',
      'Demonstrates why extreme relief—from 280-metre Jammu alluvial plains to 8,000-metre Karakoram summits—compresses continental biome transitions into horizontal distances of less than one hundred kilometres.',
    ],
    investigativeQuestions: [
      'How do precipitation shadows cast by the Pir Panjal and Great Himalayan crest partition moist Sino-Himalayan forest guilds from arid Trans-Himalayan assemblages?',
      'Where do sharp turnover zones occur between Indomalayan foothill species and Palearctic montane lineages across Jammu, AJK, and Gilgit-Baltistan?',
    ],
    methodsAndDataSources: [
      'Time-calibrated avian molecular phylogenies and Himalayan paleo-elevation reconstructions',
      'Digital elevation, monsoon/Western Disturbance isohyet, and bioclimatic envelope overlays across all five regions',
    ],
    deliverable:
      'Five-region Western Himalayan avian biogeographic regionalization atlas and elevational turnover matrix.',
    methodologicalCaveat:
      'Phylogeographic divergence estimates carry molecular-clock confidence intervals and cannot be equated with single geological uplift events without independent fossil/paleoclimatic corroboration.',
  },
  {
    number: 2,
    code: '02',
    slug: 'chapter-02-pleistocene-refugia-and-eba-128-endemism',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle:
      'The evolutionary and geographical history of Western Himalayan birds',
    title:
      'Pleistocene Glaciations, Intermontane Refugia and Speciation in the Western Himalayan Endemic Bird Area (EBA 128)',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates how Quaternary glacial–interglacial oscillations isolated temperate forest and subalpine bird populations within western Himalayan valleys, generating restricted-range endemics including Kashmir Flycatcher, Western Tragopan, Orange Bullfinch, Kashmir Nuthatch, and Tytler’s Leaf Warbler.',
      'Establishes rigorous biogeographic criteria separating strict EBA 128 restricted-range endemics (~11 species) from broader Pan-Himalayan endemics and endemic regional subspecies.',
    ],
    investigativeQuestions: [
      'Which deep river valleys (Jhelum, Chenab, Neelum, Indus) functioned as glacial forest refugia versus dispersal barriers during Last Glacial Maximum advances?',
      'Which nominal subspecies in the Western Himalayas exhibit cryptic vocal and genomic divergence warranting taxonomic re-evaluation?',
    ],
    methodsAndDataSources: [
      'BirdLife International EBA 128 boundary definitions and paleoclimate niche hindcasting',
      'Comparative bioacoustic spectrogram divergence and museum-skin genomic datasets',
    ],
    deliverable:
      'Verified EBA 128 Restricted-Range Species & Endemic Subspecies Reference Dossier replacing inflated platform endemism counts.',
    methodologicalCaveat:
      'Endemism counts depend strictly on spatial boundary definitions and taxonomic rank; subspecies endemism must never be merged silently into full-species endemic totals.',
  },
  {
    number: 3,
    code: '03',
    slug: 'chapter-03-two-centuries-of-western-himalayan-ornithology',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle:
      'The evolutionary and geographical history of Western Himalayan birds',
    title:
      'Historical Ornithology Across Five Regions: From 19th-Century Specimen Expeditions to Contemporary Baselines',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Reconstructs two centuries of ornithological documentation across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan—from Adams, Ward, Osmaston, Meinertzhagen, Bates & Lowther, and Sálim Ali to post-2000 university surveys and citizen science.',
      'Applies source-critical verification to historical specimen collections (including known historical provenance frauds such as Meinertzhagen records) to prevent corrupted locality data from distorting modern range loss assessments.',
    ],
    investigativeQuestions: [
      'Which historical breeding species documented in 19th- and early-20th-century Kashmir marshes and forests have suffered genuine regional extirpation versus false historical attribution?',
      'How have post-1947 administrative divisions shaped asymmetric research effort across J&K, Ladakh, AJK, and Gilgit-Baltistan?',
    ],
    methodsAndDataSources: [
      'NHM Tring, BNHS, Smithsonian, and university museum specimen ledger audits',
      'Archival gazetteers, historical clutch/egg registers, and contemporary literature databases',
    ],
    deliverable:
      'Source-audited historical baseline ledger flagging verified museum vouchers, unverified sight claims, and expunged fraudulent specimens.',
    methodologicalCaveat:
      'Historical collection effort concentrated heavily along colonial summer routes (Srinagar, Gulmarg, Leh, Gilgit), leaving vast winter and gorge landscapes historically unsampled.',
  },

  // VOLUME II — Chapters 04–06
  {
    number: 4,
    code: '04',
    slug: 'chapter-04-reconciling-divergent-regional-checklists',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle:
      'Taxonomic reconciliation, regional checklists and the audit of avian baselines',
    title:
      'Reconciling Divergent Regional Checklists (300+ to 601 Taxa): IOC, Clements, BirdLife and Howard & Moore Alignment',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Systematically cross-maps the seven published regional and platform figures—Kashmir Valley (300+), J&K combined (592), Ladakh SACON–WII (464), Ladakh Avibase Clements 2025 (512), AJK Avibase Howard & Moore (552), Gilgit-Baltistan (~362), and KEW (601)—into a unified relational concordance.',
      'Quantifies exactly how much divergence between regional totals stems from taxonomic splits/lumps versus genuine biogeographic turnover, vagrant inclusion, or administrative boundary buffering.',
    ],
    investigativeQuestions: [
      'Which exact 48 taxa account for the difference between the September 2026 SACON–WII Ladakh checklist (464) and the Avibase Clements 2025 Ladakh checklist (512)?',
      'What is the true deduplicated species richness across the combined five-region Western Himalayan biogeographic domain under IOC and Clements standards?',
    ],
    methodsAndDataSources: [
      'Avibase taxonomic concept cross-walks, IOC World Bird List, Clements/eBird 2025, BirdLife/HBW, and Howard & Moore 4th edition tables',
      '2024 Journal of Threatened Taxa J&K 592-species dataset and SACON–WII 2026 Ladakh synthesis',
    ],
    deliverable:
      'Master Five-Region Taxonomic Concordance Table with one-to-one concept mapping across four global backbones.',
    methodologicalCaveat:
      'Regional checklist totals must never be added across jurisdictions; union richness can only be computed after synonym deduplication.',
  },
  {
    number: 5,
    code: '05',
    slug: 'chapter-05-forensic-self-audit-of-kew-avifauna-ledger',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle:
      'Taxonomic reconciliation, regional checklists and the audit of avian baselines',
    title:
      'Forensic Self-Audit of the Kashmir EcoWatch 601-Taxon Ledger: Synonymy, Endemism Inflation, Red List Status and Legal Schedules',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Executes a line-by-line internal scientific audit of KEW’s existing 601-taxon avian platform database, resolving overlapping guild sums (330 + 161 + 95 + 87 + 45 = 718), inflated threatened counts (152), contradictory endemism figures (353 vs. 476), inconsistent district denominators (25 vs. 27), and undifferentiated protection claims (592).',
      'Establishes transparent version-control governance so every correction from pre-reconciliation estimates to verified taxonomic entries is publicly logged.',
    ],
    investigativeQuestions: [
      'How many unique, valid species remain in the KEW ledger once orthographic variants, obsolete synonyms, and subspecies rows are normalized?',
      'What is the exact verified breakdown of global IUCN CR, EN, VU, and NT bird species confirmed within the five Western Himalayan regions?',
    ],
    methodsAndDataSources: [
      'Direct schema audit of KEW biodiversity tables cross-checked against IUCN Red List API, BirdLife SIS IDs, WLPA 2022 Schedules, and CITES/CMS appendices',
      'Automated duplicate-binomial and Avibase-ID validation scripts',
    ],
    deliverable:
      'Public KEW Avifaunal Errata & Version 2.0 Normalized Database Schema.',
    methodologicalCaveat:
      'Until full row-by-row taxonomic reconciliation concludes, legacy KEW platform aggregates remain flagged with explicit pre-audit disclaimers.',
  },
  {
    number: 6,
    code: '06',
    slug: 'chapter-06-residency-phenology-and-vagrant-classification',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle:
      'Taxonomic reconciliation, regional checklists and the audit of avian baselines',
    title:
      'Separating Confirmed Breeders, Altitudinal Migrants, Passage Transients and Vagrants Across Five Regions',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Replaces binary presence/absence checklist ticks with standardized seasonal, breeding, and evidentiary status codes for every species within each of the five Western Himalayan regions.',
      'Demonstrates why treating single-occurrence storm-blown vagrants equally alongside core breeding endemics distorts conservation priority scoring and EIA screening.',
    ],
    investigativeQuestions: [
      'What proportion of each regional checklist comprises confirmed breeding species versus winter visitors, passage-only migrants, and <5-record vagrants?',
      'Which species lack post-2000 photographic, acoustic, or specimen confirmation in each region?',
    ],
    methodsAndDataSources: [
      'Standardized breeding-evidence codes (nest with eggs, fledglings, territorial song) from eBird, published monographs, and nest-record cards',
      'Regional Bird Records Committee evidentiary grading rubrics',
    ],
    deliverable:
      'Five-Region Seasonal Residency & Evidentiary Certainty Matrix.',
    methodologicalCaveat:
      'Absence of breeding confirmation in remote gorges of Gilgit-Baltistan, Kishtwar, or Neelum reflects low June–July survey effort unless bounded by occupancy surveys.',
  },

  // VOLUME III — Chapters 07–09
  {
    number: 7,
    code: '07',
    slug: 'chapter-07-central-asian-flyway-architecture',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Continental migration and the Central Asian Flyway',
    title:
      'Biogeographic Architecture of the Central Asian Flyway: Connecting ~30 Nations Through the Western Himalayas',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Maps the hemispheric geometry of the Central Asian Flyway (CAF), linking breeding tundra, taiga, and steppes across Russia, Kazakhstan, Mongolia, and western China to wintering wetlands and forests across South Asia and the Indian Ocean.',
      'Positions the Western Himalayas not as an impermeable wall, but as a critical mid-continental staging, bifurcating, and wintering nexus where habitat loss severs ecological chains thousands of kilometres long.',
    ],
    investigativeQuestions: [
      'Which Siberian, Kazakh, and Tibetan breeding populations rely specifically on Kashmir, Ladakh, Jammu, AJK, and Gilgit-Baltistan wetlands as irreplaceable autumn/spring refuelling nodes?',
      'Where does the Central Asian Flyway overlap with East Asian–Australasian and West Asian–East African flyway movements at the Pamir–Karakoram knot?',
    ],
    methodsAndDataSources: [
      'CMS Central Asian Flyway Action Plan species lists, historical ringing recoveries, and published Movebank satellite tracks',
      'Continental feather hydrogen-isotope (δ²H) isoscape assignment frameworks',
    ],
    deliverable:
      'Trans-continental CAF–Western Himalayan Connectivity Atlas covering waterbirds, raptors, and landbirds.',
    methodologicalCaveat:
      'Published satellite tracks remain skewed toward large-bodied waterbirds and raptors, under-representing small passerine flyway connectivity.',
  },
  {
    number: 8,
    code: '08',
    slug: 'chapter-08-high-altitude-flight-and-mountain-pass-funnels',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Continental migration and the Central Asian Flyway',
    title:
      'Extreme High-Altitude Flight Physiology, Wind-Drift Mechanics and Mountain Pass Funnels',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Synthesizes the respiratory, cardiovascular, and aerodynamic adaptations enabling Bar-headed Geese, Ruddy Shelducks, Demoiselle/Common Cranes, and raptors to cross hypoxic mountain barriers above 5,000–7,000 metres.',
      'Evaluates how birds minimize metabolic cost by hugging valley contours, riding diurnal upslope thermals, and funnelling through structural saddles including Zoji La, Karakoram Pass, Khunjerab, Burzil, Sinthan, and Banihal.',
    ],
    investigativeQuestions: [
      'How strongly do synoptic Western Disturbances, jet-stream shear, and valley headwinds dictate pass crossing schedules vs. mass grounded stopovers?',
      'Which mountain passes carry the densest diurnal and nocturnal avian flux across the Karakoram, Great Himalaya, and Pir Panjal?',
    ],
    methodsAndDataSources: [
      '3D GPS-accelerometry/barometric telemetry datasets paired with ERA5 hourly wind and geopotential fields',
      'Synchronized autumn and spring visual/radar pass-watch transects',
    ],
    deliverable:
      'High-Altitude Pass Bottleneck Vulnerability Index for infrastructure siting restrictions.',
    methodologicalCaveat:
      'Ground-based visual pass counts fail during low cloud/blizzard conditions precisely when collision and grounding mortality risks peak.',
  },
  {
    number: 9,
    code: '09',
    slug: 'chapter-09-nocturnal-migration-and-river-gorge-conduits',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Continental migration and the Central Asian Flyway',
    title:
      'Nocturnal Migration, Major River-Gorge Conduits (Indus, Jhelum, Chenab, Shyok) and Stopover Energetics',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates how deep antecedent river gorges—especially the Indus carving around Nanga Parbat through Gilgit-Baltistan and Ladakh, alongside the Shyok, Jhelum, Kishanganga/Neelum, and Chenab—serve as low-elevation highways for millions of nocturnal songbirds, waders, and waterfowl.',
      'Quantifies riparian thicket fuel-deposition rates required for migrants to rebuild lipid stores before or after barrier crossings.',
    ],
    investigativeQuestions: [
      'What is the magnitude and seasonal timing of nocturnal passerine migration through the Indus Gorge compared to broad-front ridge crossings?',
      'How does clearance of *Hippophae* sea-buckthorn and willow riparian scrub in Ladakh and Gilgit-Baltistan affect migrant stopover refuelling rates?',
    ],
    methodsAndDataSources: [
      'Nocturnal flight-call (NFC) acoustic recorders, portable vertical-looking avian radar, and thermal sky cameras',
      'Constant-effort mist-netting body-mass/fat-score stopover protocols at riparian stations',
    ],
    deliverable:
      'Riparian Stopover Corridor Priority Map across the Indus, Shyok, Nubra, Jhelum, Neelum, and Chenab valleys.',
    methodologicalCaveat:
      'Mist-netting and bird-banding require statutory wildlife permits and trained ringers; passive NFC and radar provide non-invasive first-stage deployment.',
  },

  // VOLUME IV — Chapters 10–12
  {
    number: 10,
    code: '10',
    slug: 'chapter-10-seasonal-altitudinal-turnover-gradients',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle:
      'Altitudinal migration and vertical connectivity within mountain watersheds',
    title:
      'Seasonal Vertical Turnover Along the 300 m to 5,500 m Western Himalayan Gradient',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Documents the dramatic semi-annual vertical redistribution of the majority of Western Himalayan breeding forest and alpine birds—including flycatchers, bush-robins, leaf-warblers, rosefinches, accentors, and pheasants—between summer high-elevation breeding zones and winter foothill/valley refuges.',
      'Shows why protecting high-altitude national parks alone fails when lower-elevation winter oak, scrub, and riverine belts outside park boundaries are degraded.',
    ],
    investigativeQuestions: [
      'What proportion of Western Himalayan resident breeders perform obligate vs. facultative altitudinal movements across 1,000+ metres of elevation?',
      'Where do summer breeders of Dachigam, Kishtwar, Machiara, and Deosai concentrate between December and March?',
    ],
    methodsAndDataSources: [
      'Four-season elevational point-count transects spaced every 300 m across Pir Panjal, Chenab, Kashmir, Neelum, and Indus slopes',
      'Seasonal eBird elevational quantile modelling controlled for winter road-access bias',
    ],
    deliverable:
      'Species-by-Elevation Seasonal Shift Matrix across 18 bioclimatic bands.',
    methodologicalCaveat:
      'Winter snow closures severely bias opportunistic checklists toward valley bottoms unless dedicated snowshoe/ARU winter transects are maintained.',
  },
  {
    number: 11,
    code: '11',
    slug: 'chapter-11-winter-refugia-and-extreme-snowstorm-survival',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle:
      'Altitudinal migration and vertical connectivity within mountain watersheds',
    title:
      'Low-Valley Winter Refugia, Sun-Facing Aspects and Survival Bottlenecks During Extreme Snowfall Events',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Analyzes emergency down-slope irruptions triggered by multi-day Western Disturbance blizzards, when pheasants, snowcocks, wallcreepers, accentors, and finches crowd onto south-facing snow-free slopes, warm spring seepages, and village edges.',
      'Evaluates heightened winter mortality from starvation, road collisions, domestic dog attacks, and opportunistic poaching during heavy snow years.',
    ],
    investigativeQuestions: [
      'How strongly do south-aspect solar insolation, unfrozen spring seeps, and berry-bearing *Hippophae*/*Cotoneaster*/*Viburnum* stands govern winter avian survival?',
      'Where do recurrent blizzard-driven poaching and road-mortality hotspots emerge when subalpine galliforms descend near settlements?',
    ],
    methodsAndDataSources: [
      'Sentinel-2 fractional snow-cover and topographic solar-radiation overlays paired with post-snowstorm transect counts',
      'Wildlife rescue/mortality logs and forest guard winter patrol records',
    ],
    deliverable:
      'Emergency Winter Snow-Refugia Atlas and Blizzard Rapid-Protection Protocol.',
    methodologicalCaveat:
      'High roadside counts immediately after heavy snowfall reflect down-slope compression onto ploughed corridors rather than population increases.',
  },
  {
    number: 12,
    code: '12',
    slug: 'chapter-12-vertical-stepping-stones-and-landscape-resistance',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle:
      'Altitudinal migration and vertical connectivity within mountain watersheds',
    title:
      'Vertical Stepping-Stones, Riparian Forest Ribbons and Landscape Resistance Across Fragmented Slopes',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Models structural habitat connectivity between 500-metre subtropical foothills and 4,000-metre alpine meadows where contour highways, reservoirs, deforested cultivation belts, and urban sprawl sever continuous forest cover.',
      'Identifies narrow wooded ravines (*nallah* gallery forests) and traditional agroforestry belts that act as indispensable vertical movement conduits for understory-dependent birds unwilling to cross open gaps.',
    ],
    investigativeQuestions: [
      'Which mid-elevation deforestation bands (1,200–2,000 m) create functional barriers for gap-shy understory insectivores and galliforms?',
      'Which wooded stream ravines provide the highest circuit-theory current density linking foothill winter habitats with subalpine breeding parks?',
    ],
    methodsAndDataSources: [
      '10 m land-cover classification, GEDI canopy height metrics, and Omniscape/Circuitscape connectivity modelling',
      'Playback gap-crossing experiments and radio-telemetry of understory passerines',
    ],
    deliverable:
      'Western Himalayan Vertical Ecological Corridor Prioritization Map.',
    methodologicalCaveat:
      'Structural canopy connectivity must be validated with behavioral movement data, as predators or microclimate edge effects can render narrow strips ecological traps.',
  },

  // VOLUME V — Chapters 13–15
  {
    number: 13,
    code: '13',
    slug: 'chapter-13-deconstructing-the-waterbird-census-surge',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle:
      'Wetlands of the Kashmir Valley and the winter waterbird census paradox',
    title:
      'Deconstructing the 2020–2025 Waterbird Surge (813,043 to 1,343,506): Effort Standardization vs. Demographic Growth',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Conducts a rigorous statistical audit of departmental census totals reporting an increase of 530,463 wintering waterbirds (+65.2%) across Kashmir between 2020 (813,043) and 2025 (1,343,506).',
      'Tests how changes in the number of surveyed wetlands, watchpoint density, observer count, optical gear, flock-block estimation bias, and inter-wetland commuting flocks influence raw totals independent of true flyway population growth.',
    ],
    investigativeQuestions: [
      'When restricted to an invariant historical core of census sites and standardized observer hours, what is the true effort-adjusted waterbird trend from 2015 to 2026?',
      'How much double-counting variance arises when mobile dabbling-duck flocks commute morning-to-noon between Hokersar, Mirgund, Haigam, Shalbough, and Wular?',
    ],
    methodsAndDataSources: [
      'Site-by-site departmental census ledgers (2015–2026), observer-deployment rosters, and synchronized time-stamped block counts',
      'Drone-orthomosaic vs. human visual flock-estimation calibration trials',
    ],
    deliverable:
      'Effort-Standardized Kashmir Winter Waterbird Index Protocol with explicit confidence intervals.',
    methodologicalCaveat:
      'Raw multi-site headcounts without published site-level effort metadata cannot establish biological population growth rates.',
  },
  {
    number: 14,
    code: '14',
    slug: 'chapter-14-ninety-six-percent-wetland-concentration-paradox',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle:
      'Wetlands of the Kashmir Valley and the winter waterbird census paradox',
    title:
      'The ~96% Four-Wetland Concentration Paradox and the Silent Collapse of Kashmir’s Satellite Floodplains',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates October 2026 RTI-based findings (*Kashmir Impulse*) indicating that roughly 96% of Kashmir’s wintering waterbirds crowd into just four primary wetland systems while more than twenty smaller satellite jheels and floodplain marshes contribute barely four percent combined.',
      'Frames extreme spatial concentration as an ecological warning signal—compressing hundreds of thousands of birds into shrinking open-water pockets where food depletion, disturbance cascades, and HPAI viral transmission risks intensify.',
    ],
    investigativeQuestions: [
      'How much historical inundation area and open-water persistence have satellite wetlands (Mirgund, Narkara, Chatlam, Kranchoo, Manibugh, Malgam, Anchar) lost since 1980?',
      'Does late-winter per-hectare benthic/macrophyte energy supply in Hokersar and Shalbough meet the metabolic demand of >300,000 crowded Anatidae?',
    ],
    methodsAndDataSources: [
      'October 2026 RTI disclosures, site-disaggregated census shares, and spatial Gini/Shannon evenness metrics',
      'Multi-decadal Landsat/Sentinel-1 SAR inundation histories and bioenergetic carrying-capacity models (TRUEMET)',
    ],
    deliverable:
      'Kashmir Satellite Wetland Triage & Hydrological De-Concentration Blueprint.',
    methodologicalCaveat:
      'Exact site-by-site concentration shares require cross-verification against complete official species-by-wetland tables upon public release.',
  },
  {
    number: 15,
    code: '15',
    slug: 'chapter-15-summer-marsh-breeders-and-february-2026-awc-audit',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle:
      'Wetlands of the Kashmir Valley and the winter waterbird census paradox',
    title:
      'Summer Marsh Breeders vs. Winter Waterfowl: Reedbed Ecology and Audit of the February 12, 2026 Asian Waterbird Census',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Contrasts high-profile winter duck counts with the neglected status of spring–summer wetland breeders—Pheasant-tailed Jacana, Watercock, Little Bittern, Yellow Bittern, Whiskered Tern, Ferruginous Duck, and reed-warblers—whose survival depends on stable May–August water levels and undisturbed *Phragmites*/*Typha* mosaics.',
      'Establishes the verification framework for the February 12, 2026 Asian Waterbird Census across 27 Kashmir wetlands and 58 census points once complete species-wise tables are publicly released.',
    ],
    investigativeQuestions: [
      'How do winter-centric weir impoundment and spring drawdown schedules inadvertently strand or flood summer marsh-bird clutches?',
      'Which diving ducks, pochards, and specialist waders are declining within the February 2026 27-wetland / 58-point census beneath abundant Mallard, Pintail, Coot, and Teal totals?',
    ],
    methodsAndDataSources: [
      'February 12, 2026 AWC survey documentation (27 wetlands, 58 points) and historical species-level AWC archives',
      'May–August marsh-bird call-broadcast/passive ARU surveys, nest-float stage loggers, and reed-harvest calendars',
    ],
    deliverable:
      'Dual-Season Wetland Hydrograph Management Standard balancing winter Anatidae and summer breeding guilds.',
    methodologicalCaveat:
      'As of monograph framing, survey documentation for the February 12, 2026 AWC is confirmed, while the complete final species-wise dataset remains pending public release.',
  },

  // VOLUME VI — Chapters 16–18
  {
    number: 16,
    code: '16',
    slug: 'chapter-16-black-necked-crane-changthang-demography',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle:
      'Trans-Himalayan cold-desert wetlands, rivers and plateaus of Ladakh',
    title:
      'Breeding Demography, Hydrological Sensitivity and Free-Ranging Dog Predation on the Black-necked Crane in Changthang',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines the breeding population of Black-necked Cranes (*Grus nigricollis*) across eastern Ladakh’s high-altitude fens and lakes (Tso Kar, Tso Moriri, Hanle, Chushul, Nyoma, Loma, Dungti) between 4,000 and 4,900 metres.',
      'Quantifies how waste-subsidized free-ranging dogs, off-road tourism vehicles, and glacial-melt inundation of small peat islands suppress chick fledging success.',
    ],
    investigativeQuestions: [
      'What is the annual breeding-pair count, hatching rate, and fledging recruitment per pair across each Changthang marsh sub-basin?',
      'By what margin do dog-proof waste containment, humane dog sterilization/removal, and artificial/stabilized nesting mounds elevate chick survival?',
    ],
    methodsAndDataSources: [
      'Long-term WII/Department of Wildlife Protection Ladakh crane monitoring records and noninvasive telescope nest watches',
      'Perimeter camera traps, water-stage pressure transducers, and waste-dump spatial mapping',
    ],
    deliverable:
      'Changthang Black-necked Crane Nest-Island Protection & Zero-Waste Dog Mitigation Protocol.',
    methodologicalCaveat:
      'Exact active nest coordinates must remain masked at >5 km public resolution to prevent photographer and tourist intrusion.',
  },
  {
    number: 17,
    code: '17',
    slug: 'chapter-17-high-altitude-lakes-moulting-and-salinity-shifts',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle:
      'Trans-Himalayan cold-desert wetlands, rivers and plateaus of Ladakh',
    title:
      'High-Altitude Lakes (Tso Moriri, Tso Kar, Pangong, Hanle) as Moulting and Staging Refuges Under Cryospheric Change',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates how closed-basin endorheic lakes and spring-fed marshes of Changthang support breeding and flightless wing-moulting congregations of Bar-headed Geese, Ruddy Shelducks, Great Crested Grebes, Brown-headed/Pallas’s Gulls, and Palearctic waders.',
      'Links ICESat-2/Sentinel lake-level trajectories, permafrost degradation, and changing salinity gradients to macroinvertebrate and *Potamogeton* productivity.',
    ],
    investigativeQuestions: [
      'How are accelerating glacier melt and evaporative shifts altering lake levels, shoreline slope geometry, and brackish-to-freshwater balances at Tso Kar and Tso Moriri?',
      'Where do flightless post-breeding Bar-headed Geese retreat to evade terrestrial predators and shoreline camps during July–August wing moult?',
    ],
    methodsAndDataSources: [
      'ICESat-2 laser altimetry, Sentinel-1/2 shoreline time series, and hydrochemical conductivity/benthic sampling',
      'Synchronized mid-summer breeding and moulting waterbird counts across Changthang Ramsar sites',
    ],
    deliverable:
      'Cryosphere-to-Wetland Hydro-Ecological Vulnerability Model for Ladakh Ramsar Basins.',
    methodologicalCaveat:
      'Rising lake surface area in closed trans-Himalayan basins can drown flat sedge deltas and actually reduce shallow foraging habitat.',
  },
  {
    number: 18,
    code: '18',
    slug: 'chapter-18-year-round-avifauna-of-zanskar-suru-nubra-and-indus',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle:
      'Trans-Himalayan cold-desert wetlands, rivers and plateaus of Ladakh',
    title:
      'Beyond Summer Expeditions: Year-Round Avifaunal Dynamics of Zanskar (81 Species), Suru, Nubra and the Indus Valley',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Builds upon the 2025 year-long field study in Zanskar documenting 81 bird species across extreme seasonal transitions to examine how semi-isolated trans-Himalayan valleys sustain hardy winter residents (ibisbills, dippers, accentors, snowfinches, rosefinches, lammergeiers) and passage migrants.',
      'Evaluates the ecological role of *Hippophae rhamnoides* sea-buckthorn thickets, irrigated barley fields, and unfrozen geothermal/spring river braids across Indus, Shyok, Nubra, and Suru.',
    ],
    investigativeQuestions: [
      'How do avian richness, trophic guild structure, and microhabitat use shift between -25°C Zanskar/Suru winters and brief July–August breeding windows?',
      'How is rapid highway opening (Shinku La, Zoji La/Nimmu–Padum–Darcha corridors) transforming disturbance, waste, and synanthropic bird colonization in Zanskar?',
    ],
    methodsAndDataSources: [
      '2025 Zanskar 81-species year-round baseline, SACON–WII 2026 Ladakh synthesis, and four-season valley transects',
      'Riparian *Hippophae* patch mapping and winter thermal-spring open-water inventories',
    ],
    deliverable:
      'Four-Season Trans-Himalayan Valley Monitoring Protocol for Zanskar, Suru, Nubra, and Sham.',
    methodologicalCaveat:
      'Single-year valley baselines capture core seasonal turnover but require multi-year replication to detect climate or highway-induced trends.',
  },

  // VOLUME VII — Chapters 19–21
  {
    number: 19,
    code: '19',
    slug: 'chapter-19-kashmir-flycatcher-understory-and-sri-lanka-connectivity',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle:
      'Temperate, subalpine and alpine forest guilds and restricted-range endemics',
    title:
      'Breeding Occupancy, Deciduous Understory Thresholds and Sri Lankan Connectivity of the Kashmir Flycatcher',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Establishes a range-wide demographic and microhabitat protocol for the Vulnerable Kashmir Flycatcher (*Ficedula subrubra*) across temperate mixed broadleaf–conifer forests (1,800–2,700 m) of the Kashmir Valley, Pir Panjal, and Azad Jammu & Kashmir.',
      'Connects Himalayan breeding territory quality—specifically closed *Parrotia–Corylus–Juglans–Salix* understory and snag cavities—with full annual-cycle survival along peninsular Indian stopovers and Sri Lankan montane wintering grounds.',
    ],
    investigativeQuestions: [
      'What minimum deciduous shrub cover, leaf-litter moisture, and snag density separate occupied breeding territories from adjacent unoccupied conifer stands?',
      'Does livestock browsing of forest understories elevate nest predation by corvids and martens or depress fledgling mass?',
    ],
    methodsAndDataSources: [
      'Repeated May–July territory-mapping occupancy grids, GEDI/terrestrial LiDAR understory profiles, and BirdLife DataZone baselines',
      'Ultra-light archival geolocator / Motus tag feasibility and collaborative Kashmir–Sri Lanka phenology comparison',
    ],
    deliverable:
      'Kashmir Flycatcher Critical Breeding Habitat & Understory Grazing-Exclusion Standard.',
    methodologicalCaveat:
      'Any miniature tag deployment on ~10 g passerines requires strict <3% body-mass ethical clearance and verified zero survival penalty on reference species.',
  },
  {
    number: 20,
    code: '20',
    slug: 'chapter-20-western-tragopan-and-pheasant-metapopulations',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle:
      'Temperate, subalpine and alpine forest guilds and restricted-range endemics',
    title:
      'Metapopulation Viability, Cross-Ridgeline Connectivity and Spring Disturbance of the Western Tragopan and Himalayan Galliforms',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Synthesizes population status, call-count densities, and habitat fragmentation of Western Tragopan (*Tragopan melanocephalus*), Himalayan Monal, Koklass, Kalij, and Cheer Pheasant candidate zones across Kazinag, Limber, Kishtwar, Bhaderwah, Machiara, Salkhala, Leepa, and Astor.',
      'Quantifies the severe temporal collision between May–June pheasant ground nesting and intensive commercial *Morchella* morel foraging by thousands of seasonal collectors.',
    ],
    investigativeQuestions: [
      'What is the contemporary effective population size (Ne) and genetic connectivity across divided Kazinag–Limber–Machiara–Salkhala and Kishtwar–Chamba complexes?',
      'Can community-enforced rotational rest zones during peak May incubation measurably increase Western Tragopan brood encounter rates?',
    ],
    methodsAndDataSources: [
      'Synchronized dawn acoustic ARU arrays, Cambridge *Oryx* Machiara/Leepa benchmarks, and Kazinag/Kishtwar wildlife survey archives',
      'Non-invasive shed-feather/fecal microsatellite & SNP genomics and camera-trap disturbance covariates',
    ],
    deliverable:
      'Trans-Regional Western Tragopan Metapopulation Recovery & Seasonal NTFP Co-Management Plan.',
    methodologicalCaveat:
      'Dawn call-counts index territorial males and vary sharply with morning cloud/wind; ARU multi-morning detection modelling is mandatory before comparing valleys.',
  },
  {
    number: 21,
    code: '21',
    slug: 'chapter-21-treeline-birch-conifer-endemics-and-mast-cycles',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle:
      'Temperate, subalpine and alpine forest guilds and restricted-range endemics',
    title:
      'Subalpine Birch–Conifer Mast Cycles, Veteran Cavities and EBA 128 Endemics (Orange Bullfinch, Kashmir Nuthatch, Tytler’s Leaf Warbler)',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates the poorly studied guild of restricted-range Western Himalayan canopy and treeline specialists—including Orange Bullfinch (*Pyrrhula aurantiaca*), Kashmir Nuthatch (*Sitta cashmirensis*), White-cheeked Tit (*Aegithalos leucogenys*), Spectacled Finch (*Callacanthis burtoni*), and Tytler’s Leaf Warbler (*Phylloscopus tytleri*).',
      'Examines dependence on large-diameter *Abies pindrow*, *Pinus wallichiana*, *Cedrus deodara*, and *Betula utilis* stands threatened by bark harvesting, grazing regeneration failure, and climate-altered cone masting.',
    ],
    investigativeQuestions: [
      'What minimum trunk diameter (DBH) and bark-fissure structure does *Sitta cashmirensis* require for excavation and foraging?',
      'How is regeneration failure of *Betula utilis* at 3,200–3,800 m reshaping breeding densities of *Pyrrhula aurantiaca* and subalpine warblers?',
    ],
    methodsAndDataSources: [
      'Stratified subalpine forest plot mensuration (DBH, cone crop score, birch sapling recruitment) paired with point-count distance sampling',
      'Focused acoustic templates for cryptic canopy finches and leaf-warblers',
    ],
    deliverable:
      'Old-Growth Conifer & Subalpine Birch Avian Guild Conservation Guidelines.',
    methodologicalCaveat:
      'Irruptive finches (*Pyrrhula*, *Callacanthis*, *Loxia*) exhibit large inter-annual local fluctuations driven by cone crops that mimic false declines over short 2–3 year windows.',
  },

  // VOLUME VIII — Chapters 22–24
  {
    number: 22,
    code: '22',
    slug: 'chapter-22-avian-biogeography-of-jammu-foothills-to-kishtwar',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle:
      'Subtropical foothills, Chenab gorges and transboundary valleys of Jammu, AJK and Gilgit-Baltistan',
    title:
      'Avian Biogeography of Jammu: Shivalik Dry Forests, Gharana Wetland Bottlenecks and Chenab–Kishtwar Gradients',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines the extraordinary avian diversity of the Jammu region—from subtropical *Acacia–Mallotus* scrub, chir pine ridges, Mansar–Surinsar lakes, and the Gharana border marsh up through the dramatic Chenab gorge into Kishtwar High Altitude National Park, Bhaderwah, and Poonch–Rajouri.',
      'Evaluates acute conservation bottlenecks at Gharana Wetland (where thousands of Bar-headed Geese crowd into <1 km² of marsh surrounded by fields and power lines) and cumulative hydropower/highway impacts along the Chenab basin.',
    ],
    investigativeQuestions: [
      'What hydrological buffer expansion, underground cabling, and farmer crop-compensation mechanisms are needed to secure Gharana Wetland permanently?',
      'How are cascade hydropower reservoirs and tunnel muck-disposal sites along the Chenab and Marusudar altering riverine and slope forest bird communities?',
    ],
    methodsAndDataSources: [
      '2024 J&K 592-species checklist regional disaggregation, Gharana winter goose counts, and Kishtwar/Bhaderwah elevational surveys',
      'PARIVESH hydropower EIA avifaunal chapter audits vs. independent field transects',
    ],
    deliverable:
      'Jammu Subtropical-to-Alpine Avian Conservation Atlas & Gharana Survival Action Plan.',
    methodologicalCaveat:
      'Subtropical Jammu thorn/scrub forests outside notified sanctuaries hold high Indomalayan richness frequently undervalued in alpine-centric conservation plans.',
  },
  {
    number: 23,
    code: '23',
    slug: 'chapter-23-ornithological-synthesis-of-azad-jammu-and-kashmir',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle:
      'Subtropical foothills, Chenab gorges and transboundary valleys of Jammu, AJK and Gilgit-Baltistan',
    title:
      'Ornithological Synthesis of Azad Jammu & Kashmir: From Mangla Wintering Waters to Machiara, Salkhala and Neelum Strongholds',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Integrates avian research across Azad Jammu & Kashmir’s 552-species checklist gradient—linking the major Central Asian Flyway wintering complex at Mangla Dam Reservoir and Mirpur dry scrub with moist temperate pheasant and flycatcher strongholds in Machiara National Park, Salkhala, Leepa, Musk Deer National Park, and Poonch.',
      'Highlights trans-ridgeline ecological continuity across the Pir Panjal and Shamsabari ranges connecting Neelum/Leepa directly with Kazinag, Limber, and Gurez.',
    ],
    investigativeQuestions: [
      'How do winter drawdown curves, gill-netting, and shoreline agriculture at Mangla Reservoir affect wintering Anatidae, grebes, gulls, and Black-bellied Tern records?',
      'Which forest compartments in Neelum, Leepa, and Haveli bridge core Western Tragopan and Kashmir Flycatcher habitats across the Shamsabari–Pir Panjal crest?',
    ],
    methodsAndDataSources: [
      'Published Machiara/Salkhala/Mangla ornithological surveys (including *Oryx* and regional university studies) and Avibase Howard & Moore cross-walks',
      'Sentinel-2 forest canopy continuity mapping across Neelum–Kazinag–Gurez watersheds',
    ],
    deliverable:
      'AJK Avifaunal Baseline Synthesis & Cross-Ridgeline Habitat Continuity Map.',
    methodologicalCaveat:
      'Differences between AJK’s 552-species Howard & Moore list and J&K’s 592-species list partially reflect taxonomic backbone conventions awaiting Chapter 04 normalization.',
  },
  {
    number: 24,
    code: '24',
    slug: 'chapter-24-closing-the-karakoram-indus-gap-in-gilgit-baltistan',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle:
      'Subtropical foothills, Chenab gorges and transboundary valleys of Jammu, AJK and Gilgit-Baltistan',
    title:
      'Closing the Karakoram–Indus Ornithological Gap in Gilgit-Baltistan: Deosai Breeding Plains, Dry Juniper Forests and Gorge Funnels',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Addresses the severe ornithological under-sampling of Gilgit-Baltistan (~362 documented species despite straddling the Karakoram, Hindu Kush, Pamir, and Western Himalaya convergence and the colossal Indus migratory gorge).',
      'Prioritizes systematic four-season inventories across Deosai National Park’s alpine wetlands, Astor–Fairy Meadows subalpine birch/pine belts, Diamer’s Indus Kohistan temperate remnants, Hunza’s Borit Lake staging oasis, and Skardu–Shigar braided floodplains.',
    ],
    investigativeQuestions: [
      'How many unrecorded passage and wintering taxa utilize the Indus, Gilgit, and Hunza river corridors when systematic autumn/spring watchpoints and ARUs are deployed?',
      'How are chilghoza pine (*Pinus gerardiana*) and juniper (*Juniperus excelsa*) harvest pressures in Diamer and Astor affecting dry-temperate specialist birds?',
    ],
    methodsAndDataSources: [
      'Published Karakoram/Deosai/Borit Lake surveys, Central Karakoram & Deosai NP management datasets, and citizen-science gap analysis',
      'Proposed four-season transect network across Astor, Skardu, Hunza, Ghizer, and Diamer',
    ],
    deliverable:
      'Gilgit-Baltistan Ornithological Gap-Analysis & Indus Corridor Watchpoint Design.',
    methodologicalCaveat:
      'The current ~362-species figure must be cited strictly as an incomplete minimum baseline reflecting historical survey scarcity.',
  },

  // VOLUME IX — Chapters 25–27
  {
    number: 25,
    code: '25',
    slug: 'chapter-25-ibisbill-and-braided-shingle-island-mechanics',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle:
      'Glacial rivers, braided shingle islands and aquatic avian specialists',
    title:
      'Fluvial Geomorphology and Cobble-Island Breeding Mechanics of the Ibisbill Across Glacial-Fed Rivers',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines the specialized fluvial niche of the Ibisbill (*Ibidorhyncha struthersii*) across braided shingle-bed reaches of the Sindh, Lidder, Rambiara, Bringi, Indus, Shyok, Nubra, Suru, Zanskar, Chenab, and Neelum rivers.',
      'Quantifies island elevation above spring baseflow, cobble grain-size distribution (5–25 cm), cryptically matched egg camouflage, and dual-channel water moats required to deter mammalian nest predators.',
    ],
    investigativeQuestions: [
      'What precise hydraulic and geomorphic window keeps cobble islands high enough to survive May snowmelt floods yet isolated enough by side channels to block feral dogs and foxes?',
      'How do winter freezing regimes in Ladakh and upper Kashmir trigger downstream longitudinal shifts onto lower braided reaches?',
    ],
    methodsAndDataSources: [
      'High-resolution drone/PlanetScope cobble-bar morphometry, pebble-count grain sizing, and linear breeding-pair river surveys',
      'Benthic Surber sampling of sub-cobble Ephemeroptera, Plecoptera, and Trichoptera biomass',
    ],
    deliverable:
      'Western Himalayan Braided Shingle-Island Avian Refugia Inventory.',
    methodologicalCaveat:
      'Ground-scrape clutches are virtually invisible against river cobbles; surveyors must observe adult incubation exchanges from bankside vantage points to avoid crushing eggs.',
  },
  {
    number: 26,
    code: '26',
    slug: 'chapter-26-mechanized-riverbed-mining-and-benthic-collapse',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle:
      'Glacial rivers, braided shingle islands and aquatic avian specialists',
    title:
      'Mechanized Riverbed Boulder and Sand Mining: Quantifying Shingle-Bar Destruction and Benthic Food-Web Collapse',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates the ecological toll of heavy hydraulic excavators, dumpers, and stone crushers operating directly within active river channels across Rambiara, Vishaw, Romshi, Sindh, Lidder, Tawi, and Jhelum/Chenab tributaries.',
      'Links physical removal of cobble islands and chronic fine-sediment plumes to local disappearance of breeding Ibisbills, River Lapwings, Little Ringed Plovers, and plunge-diving Kingfishers.',
    ],
    investigativeQuestions: [
      'How many hectares of active braided shingle habitat have leased and unleased mining blocks excavated across Kashmir and Jammu rivers between 2015 and 2026?',
      'By what magnitude do downstream turbidity (NTU) and cobble embeddedness reduce EPT insect prey and river-bird territory density compared to unmined upstream controls?',
    ],
    methodsAndDataSources: [
      'District Mineral Foundation / geology & mining block lease polygons overlaid with Sentinel-2/high-res active pit footprints',
      'Before–After Control–Impact (BACI) upstream vs. mined-reach avian and benthic EPT surveys',
    ],
    deliverable:
      'Avifaunal Breeding-Season Mining Exclusion Map (March–July Moratorium Zones).',
    methodologicalCaveat:
      'Distinguishing flood-scour bar rearrangement from mechanical excavation requires sub-5 m imagery paired with field verification of machinery tracks and crusher stockpiles.',
  },
  {
    number: 27,
    code: '27',
    slug: 'chapter-27-hydropower-cascades-and-torrent-bird-guilds',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle:
      'Glacial rivers, braided shingle islands and aquatic avian specialists',
    title:
      'Hydropower Cascades, Dewatered Reaches and Hydropeaking Impacts on Dippers, Forktails, Water Redstarts and Crested Kingfishers',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Evaluates how cascade run-of-the-river hydropower projects divert river discharge into long headrace tunnels—leaving kilometres of cobble riverbed nearly dry in winter—while tailrace hydropeaking releases unleash sudden daily stage surges downstream.',
      'Uses obligate torrential river birds (Brown and White-throated Dippers, Little/Spotted/Black-backed Forktails, White-capped and Plumbeous Water Redstarts, Crested Kingfisher) as quantitative bio-indicators of environmental flow adequacy.',
    ],
    investigativeQuestions: [
      'Below what percentage of natural lean-season flow do Dipper and Forktail linear territory densities collapse in diverted reaches of the Chenab, Kishanganga/Neelum, Sindh, and Indus basins?',
      'Do statutory 15–20% environmental flow stipulations actually sustain functional riffle oxygenation and submerged boulder-moss invertebrates?',
    ],
    methodsAndDataSources: [
      'Continuous stage/discharge logger series paired with linear territories/km across free-flowing, diverted, and tailrace-peaking reaches',
      'Stable-isotope (δ¹³C, δ¹⁵N) aquatic-to-riparian food-web transfer analysis in Dipper feathers/feces',
    ],
    deliverable:
      'Avian-Calibrated Environmental Flow (e-Flow) & Hydropeaking Ramping Standard for Himalayan Rivers.',
    methodologicalCaveat:
      'Natural glacial melt diurnal fluctuations must be separated from abrupt turbine-peaking step changes using upstream reference gauges.',
  },

  // VOLUME X — Chapters 28–30
  {
    number: 28,
    code: '28',
    slug: 'chapter-28-vulture-scavenger-ecology-and-nsaid-toxicology',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Raptors, vultures and nocturnal predators of the mountain sky',
    title:
      'Scavenger Guild Ecology, Transboundary Home Ranges and Veterinary NSAID Toxicology in Bearded, Himalayan and Egyptian Vultures',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates population trajectories and foraging ecology of Bearded Vulture (*Gypaetus barbatus*), Himalayan Vulture (*Gyps himalayensis*), Cinereous Vulture (*Aegypius monachus*), Griffon Vulture (*Gyps fulvus*), and Endangered Egyptian Vulture (*Neophron percnopterus*) across all five regions.',
      'Audits retail veterinary supply chains and pastoral carcass dumps for nephrotoxic NSAIDs (diclofenac, ketoprofen, aceclofenac, nimesulide) and retaliatory carnivore poison baits.',
    ],
    investigativeQuestions: [
      'To what extent do highland pastoralist herds and migratory Shivalik–alpine transhumance expose Himalayan cliff-nesting vultures to lethal veterinary NSAIDs?',
      'Where are active Bearded and Himalayan Vulture breeding colonies located across Ladakh, Gilgit-Baltistan, Kishtwar, Dachigam, and Neelum?',
    ],
    methodsAndDataSources: [
      'Stratified pharmacy covert/statutory NSAID surveys, carcass liver swab LC-MS/MS toxicology, and cliff-eyrie breeding occupancy surveys',
      'Published GPS-GSM vulture home-range datasets across the Karakoram–Himalayan arc',
    ],
    deliverable:
      'Western Himalayan Trans-Regional Vulture Safe Zone (VSZ) Audit & Pharmacy Enforcement Protocol.',
    methodologicalCaveat:
      'Juvenile Himalayan Vultures descend to northern Indian and Pakistani plains in winter, meaning lowland NSAID exposure can drive declines in high-mountain breeding cliffs.',
  },
  {
    number: 29,
    code: '29',
    slug: 'chapter-29-eagles-falcons-and-raptor-migration-watchpoints',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Raptors, vultures and nocturnal predators of the mountain sky',
    title:
      'Apex Cliff Eagles, Falcons and Trans-Himalayan Raptor Migration Watchpoints',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Documents resident apex predators—Golden Eagle (*Aquila chrysaetos daphanea*), Mountain Hawk-Eagle (*Nisaetus nipalensis*), Bonelli’s Eagle, Shaheen/Peregrine Falcon—alongside massive autumn and spring passage of Steppe Eagles (*Aquila nipalensis*), Booted Eagles, Black Kites, Harriers, and Saker Falcons.',
      'Evaluates electrocution mortality on medium-voltage power poles and illicit live falcon trapping along high-altitude desert and foothill corridors.',
    ],
    investigativeQuestions: [
      'Which Western Himalayan ridges and passes support the highest autumn Steppe Eagle and harrier migration rates worthy of permanent HawkWatch-standard stations?',
      'How severe are medium-voltage pole electrocutions and live falconry trapping pressures across Ladakh, Gilgit-Baltistan, and Jammu/AJK foothills?',
    ],
    methodsAndDataSources: [
      'Standardized hourly visual raptor migration counts along candidate ridges (Zoji La, Khardung/Chang La, Pir Panjal, Indus Gorge)',
      'Power-pole configuration risk audits and wildlife enforcement seizure records',
    ],
    deliverable:
      'Western Himalayan Raptor Migration Watchpoint Network & Raptor-Safe Pole Retrofit Specification.',
    methodologicalCaveat:
      'High urban Black Kite (*Milvus migrans*) counts around slaughterhouses and landfills must never be conflated with wild migratory raptor health.',
  },
  {
    number: 30,
    code: '30',
    slug: 'chapter-30-owls-heritage-trees-and-rodenticide-pathways',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Raptors, vultures and nocturnal predators of the mountain sky',
    title:
      'Nocturnal Predators of the Mountains: Owls, Ancient Cavity Trees and Anticoagulant Rodenticide Trophic Pathways',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Establishes the first systematic nocturnal survey framework for Western Himalayan Strigiformes—including Himalayan Wood Owl (*Strix nivicolum*), Spotted Owlet (*Athene brama*), Collared Owlet, Asian Barred Owlet, Scops Owls, Rock/Indian Eagle-Owl, and Long-eared/Short-eared Owls.',
      'Investigates secondary poisoning from bromadiolone and other anticoagulant rodenticides widely applied against orchard bark-gnawing voles and rodents, alongside felling of hollow heritage Chinars and deodars.',
    ],
    investigativeQuestions: [
      'What proportion of orchard-foraging Owls carry detectable liver/pellet residues of second-generation anticoagulant rodenticides (SGARs)?',
      'Can artificial owl nest-boxes in high-density apple orchards replace chemical rodenticides with natural biological vole control?',
    ],
    methodsAndDataSources: [
      'Nocturnal passive ARU grids, regurgitated pellet skull identification, and SGAR toxicological assays',
      'Geo-referenced inventory of hollow heritage *Platanus orientalis* (Chinar), *Juglans*, and *Cedrus* cavity trees',
    ],
    deliverable:
      'Orchard Owl Biological Rodent-Control Trial & Heritage Cavity-Tree Protection Registry.',
    methodologicalCaveat:
      'Active call-playback must be minimized for rare forest owls during courtship; passive nocturnal ARUs provide disturbance-free occupancy baselines.',
  },

  // VOLUME XI — Chapters 31–33
  {
    number: 31,
    code: '31',
    slug: 'chapter-31-orchard-pesticides-and-insectivore-trophic-decline',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle:
      'Agro-ecosystems, orchards, urbanizing valleys and the fate of ordinary birds',
    title:
      'High-Density Orchards, Agrochemical Spray Calendars and the Trophic Decline of Insectivorous Passerines',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines how structural conversion from multi-tier traditional walnut–almond–apple homestead orchards with grassy understories to trellised clonal high-density monocultures receiving 10–14 annual chemical sprays transforms rural avian communities.',
      'Measures arthropod prey collapse, egg-thinning/cholinesterase biomarkers, and fledgling starvation rates across tits, flycatchers, hoopoes, redstarts, warblers, and starlings.',
    ],
    investigativeQuestions: [
      'How do breeding bird richness, caterpillar biomass, and nestling fledging mass compare across traditional unsprayed, IPM, and intensive high-density apple orchards?',
      'Which specific blossom and post-petal-fall insecticide windows inflict the highest nestling mortality on orchard-breeding songbirds?',
    ],
    methodsAndDataSources: [
      'Paired farm-scale comparisons across Shopian, Pulwama, Baramulla, Sopore, Kulgam, Kishtwar, and Neelum orchard landscapes',
      'Malaise/beating-sheet arthropod sampling, nest-box video provisioning logs, and spray-diary audits',
    ],
    deliverable:
      'Bird-Safe Himalayan Orchard Integrated Pest Management (IPM) Calendar.',
    methodologicalCaveat:
      'Confounding landscape variables (surrounding forest proximity, tree age, elevation) must be controlled via matched-pair block designs.',
  },
  {
    number: 32,
    code: '32',
    slug: 'chapter-32-twelve-ordinary-sentinel-groups-and-shifting-baselines',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle:
      'Agro-ecosystems, orchards, urbanizing valleys and the fate of ordinary birds',
    title:
      'The Twelve Everyday Sentinel Bird Groups: Countering Shifting Baseline Syndrome in Villages, Gardens and Streams',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Operationalizes standardized monitoring across the twelve ordinary bird groups closest to daily Himalayan life—House Sparrows, Swallows, Hoopoes, Bulbuls, Cuckoos, Starlings, Mynas, Woodpeckers, Wagtails, Kingfishers, Owls, and Dippers.',
      'Combines repeatable quantitative point/transect counts with structured inter-generational elder interviews to test oral perceptions of vanishing household birds against architectural, hydrological, and chemical drivers.',
    ],
    investigativeQuestions: [
      'Where have House Sparrows and Barn Swallows genuinely declined with sealed concrete construction, and where do resilient rural/bazaar refugia persist?',
      'How accurately do structured ethno-ornithological memory timelines corroborate historical specimen/checklist records of village bird abundance?',
    ],
    methodsAndDataSources: [
      'Western Himalayan Common Bird Monitoring Scheme (WH-CBMS) stratified across 200+ urban, village, orchard, and stream squares',
      'Calibrated semi-structured elder interviews controlled for recall bias',
    ],
    deliverable:
      'Annual Common Himalayan Bird Indicator (CHBI) across Twelve Sentinel Guilds.',
    methodologicalCaveat:
      'Oral memory alone cannot establish percentage population declines without contemporary repeatable count baselines to anchor future decades.',
  },
  {
    number: 33,
    code: '33',
    slug: 'chapter-33-urbanization-waste-subsidies-and-biotic-homogenization',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle:
      'Agro-ecosystems, orchards, urbanizing valleys and the fate of ordinary birds',
    title:
      'Urbanizing Mountain Valleys, Open-Waste Subsidies and Biotic Homogenization in Srinagar, Jammu, Leh, Muzaffarabad and Gilgit',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Analyzes how rapid peri-urban sprawl, loss of garden trees and urban marshes, glazed commercial buildings, and uncontained municipal landfills reshape city bird assemblages across all five regional capitals.',
      'Demonstrates how anthropogenic food waste subsidizes super-abundant House Crows, Black Kites, Rock Pigeons, and Common Mynas (alongside feral dogs), elevating nest predation and cavity competition against sensitive native songbirds.',
    ],
    investigativeQuestions: [
      'How steeply does functional avian diversity decline along rural-to-urban-core gradients in Srinagar, Jammu, Leh, Muzaffarabad, and Gilgit?',
      'Does sanitary closure of open waste dumps and slaughter offal measurably reduce corvid/kite nest-predation pressure in adjacent urban wetlands and parks?',
    ],
    methodsAndDataSources: [
      'Urban-to-rural gradient point counts, functional trait diversity (FD) indices, and artificial-nest predation experiments',
      'Municipal solid-waste dump mapping and window-strike mortality surveys',
    ],
    deliverable:
      'Bird-Sensitive Mountain Urban Design & Sanitary Waste Management Charter.',
    methodologicalCaveat:
      'Total avian biomass often peaks in waste-rich urban cores; ecological health must be evaluated via native guild diversity rather than raw bird density.',
  },

  // VOLUME XII — Chapters 34–36
  {
    number: 34,
    code: '34',
    slug: 'chapter-34-warming-winters-and-migration-phenology-shifts',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle:
      'Climate change, cryospheric retreat and phenological mismatch',
    title:
      'Warming Winters, Retreating Snowlines and Shifting Arrival–Departure Windows Across the Western Himalayas',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Quantifies multi-decadal shifts in autumn arrival, mid-winter residency, and late-winter/spring departure dates of migratory waterfowl and summer-breeding landbirds in response to Western Himalayan winter warming anomalies (+1.5°C to +2.8°C) and declining valley snow-cover days.',
      'Tests hypotheses of delayed autumn arrival, "short-stopping" north of the Himalayas, and premature February departure from Kashmir wetlands.',
    ],
    investigativeQuestions: [
      'By how many days per decade have first/median spring arrival dates of Barn Swallow, Eurasian Golden Oriole, Common Cuckoo, and Kashmir Flycatcher shifted?',
      'Do warm-winter snow-drought years (*chilla-i-kalan* snow deficits) trigger early February northward exodus of Anatidae from Wular and Hokersar?',
    ],
    methodsAndDataSources: [
      'Quantile phenology regression on effort-controlled eBird/historical arrival series (1980–2026)',
      'ERA5-Land temperature, MODIS/Sentinel snow-cover fraction, and IMD/regional meteorological station records',
    ],
    deliverable:
      'Western Himalayan Avian Phenology Shift Atlas linking climate anomalies to migration calendars.',
    methodologicalCaveat:
      'First-arrival dates drift earlier automatically as observer numbers grow; 10th/50th-percentile occupancy models are required to avoid sample-size artifacts.',
  },
  {
    number: 35,
    code: '35',
    slug: 'chapter-35-trophic-asynchrony-and-extreme-spring-weather',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle:
      'Climate change, cryospheric retreat and phenological mismatch',
    title:
      'Trophic Asynchrony and Unseasonal Spring Storms: Decoupling of Leaf-Out, Arthropod Peaks and Chick Rearing',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates whether long-distance migrants wintering in Sri Lanka, peninsular India, or Africa (whose departure is cued by photoperiod) arrive out of step with temperature-accelerated Himalayan leaf-out and caterpillar peaks.',
      'Examines catastrophic brood mortality caused by erratic May–June Western Disturbance hailstorms, unseasonal heavy snows at 3,000+ m, and flash-flooded river shingle bars.',
    ],
    investigativeQuestions: [
      'Are photoperiod-cued long-distance migrants suffering greater phenological mismatch in temperate Kashmir forests than short-distance altitudinal migrants?',
      'How frequently do unseasonal May–June snow/cold snaps cause widespread clutch desertion and aerial-insectivore starvation at subalpine elevations?',
    ],
    methodsAndDataSources: [
      'PhenoCam budburst tracking, frass-trap caterpillar peak curves, and nestling growth/survival monitoring across 1,800–3,600 m',
      'Extreme weather event attribution during May–June breeding windows',
    ],
    deliverable:
      'Trophic Synchrony & Extreme-Weather Reproductive Vulnerability Assessment.',
    methodologicalCaveat:
      'Multi-year nest-survival series (>=5–10 years) are needed to separate stochastic storm mortality from directional trophic mismatch.',
  },
  {
    number: 36,
    code: '36',
    slug: 'chapter-36-upward-range-shifts-and-alpine-summit-traps',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle:
      'Climate change, cryospheric retreat and phenological mismatch',
    title:
      'Upward Elevational Shifts, Shrubification of Alpine Meadows and 2030–2050 Summit Traps',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Models how rising isotherms and woody shrub encroachment (*Rhododendron*, *Juniperus*) into open alpine scree and meadows compress the available geometric area of high-altitude specialists—Tibetan and Himalayan Snowcocks, Grandala, Brandt’s and Plain Mountain Finches, Red-fronted Rosefinch, and Alpine Accentor.',
      'Identifies topographically buffered microclimatic refugia across north-facing cirques and glaciated valleys through 2030 and 2050.',
    ],
    investigativeQuestions: [
      'At what rate (m/decade) are upper and lower breeding elevational limits shifting across Western Himalayan passerines and galliforms?',
      'Which conical Pir Panjal and Shamsabari ridges face complete loss of nival/alpine avian habitat before 2050 compared to higher Karakoram/Zanskar massifs?',
    ],
    methodsAndDataSources: [
      'Hypsometric area-elevation curves coupled with CMIP6 downscaled mountain climate projections and mechanistic niche models',
      'Resurveys of historical Osmaston/Ward/Bates elevational transects',
    ],
    deliverable:
      '2030–2050 Western Himalayan Alpine Avian Climate-Refugia & Summit-Trap Atlas.',
    methodologicalCaveat:
      'Bioclimatic envelope projections must incorporate biotic interactions (treeline lag, grazing arrest, upslope competitors) rather than temperature isotherms alone.',
  },

  // VOLUME XIII — Chapters 37–39
  {
    number: 37,
    code: '37',
    slug: 'chapter-37-power-grids-cable-cars-and-collision-electrocution-sinks',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle:
      'Infrastructure, linear barriers, mortality sinks and avian health',
    title:
      'High-Voltage Transmission Grids, Distribution Poles and Ropeways: Mapping Avian Collision and Electrocution Sinks',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Addresses the rapid proliferation of solar/hydropower evacuation transmission lines (66–400 kV), distribution networks, and tourist ropeways across Changthang crane marshes, Gharana/Wular/Hokersar flyways, and high mountain passes.',
      'Establishes bias-corrected carcass survey protocols accounting for rapid removal of downed birds by feral dogs, foxes, and corvids.',
    ],
    investigativeQuestions: [
      'Which exact transmission spans in eastern Ladakh, Kashmir floodplain corridors, and Indus/Chenab valleys inflict the highest per-kilometre mortality on cranes, geese, and eagles?',
      'How much mortality reduction is achieved by dynamic/UV-reflective flight diverters and insulated raptor perching cross-arms?',
    ],
    methodsAndDataSources: [
      'OpenStreetMap/utility transmission corridor GIS layers intersected with telemetry flight paths and wetland buffers',
      'Standardized carcass searches with empirical searcher-efficiency and scavenger-persistence trials',
    ],
    deliverable:
      'Span-Level Avian Power-Line Risk Map & Mandatory Retrofitting Engineering Standard.',
    methodologicalCaveat:
      'Uncorrected casual carcass counts underestimate true wire-strike and electrocution fatalities by 40–80% due to overnight scavenger removal.',
  },
  {
    number: 38,
    code: '38',
    slug: 'chapter-38-night-light-noise-and-off-road-tourism-disturbance',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle:
      'Infrastructure, linear barriers, mortality sinks and avian health',
    title:
      'Artificial Light at Night (ALAN), Highway Noise and Unregulated Off-Road Tourism Across Fragile Valleys',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates how high-intensity floodlighting at tunnel portals, highway corridors, border/security installations, and alpine resorts traps and disorients nocturnal migratory birds during foggy autumn and spring nights.',
      'Quantifies chronic acoustic masking along mountain highways and physical habitat damage from off-road SUVs, drones, and unethical wildlife photography at Tso Kar, Hanle, Sonamarg, Gulmarg, and Deosai.',
    ],
    investigativeQuestions: [
      'Do brightly lit mountain tunnel portals and pass installations act as nocturnal migrant attraction and collision traps during low-cloud nights?',
      'What minimum vehicle/photographer setback distances prevent physiological stress and incubation abandonment in Black-necked Cranes and Western Tragopans?',
    ],
    methodsAndDataSources: [
      'VIIRS Day/Night Band radiance trends, nocturnal sky-glow photometers, and sound-level/ARU acoustic masking loggers',
      'Flush-initiation distance (FID) field measurements and drone/vehicle intrusion logs',
    ],
    deliverable:
      'Dark-Sky Pass Lighting Standard & Mandatory Sanctuary Ethical Photography Code.',
    methodologicalCaveat:
      'Noise and road-edge declines must be disentangled from physical forest-edge habitat alteration using phantom-road or paired quiet-corridor controls.',
  },
  {
    number: 39,
    code: '39',
    slug: 'chapter-39-one-health-hpai-botulism-and-wetland-contaminants',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle:
      'Infrastructure, linear barriers, mortality sinks and avian health',
    title:
      'One-Health Avian Surveillance: Highly Pathogenic Avian Influenza (HPAI H5Nx), Botulism and Heavy-Metal/Pesticide Burdens',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Evaluates emerging infectious disease and toxicological hazards amplified when ~96% of wintering waterfowl crowd into four nutrient-enriched Kashmir wetlands or narrow foothill sanctuaries alongside domestic poultry and village ducks.',
      'Designs non-invasive environmental fecal/water viral surveillance, warm-shallows avian botulism (*Clostridium botulinum*) early-warning triggers, and lead/pesticide bioaccumulation screening.',
    ],
    investigativeQuestions: [
      'How does extreme four-wetland wintering concentration alter HPAI H5Nx viral persistence and wild-to-domestic poultry spillover interfaces?',
      'Are legacy lead-shot pellets, heavy metals, or organochlorine/neonicotinoid residues accumulating in Kashmir and Mangla/Gharana wetland sediments and waterbirds?',
    ],
    methodsAndDataSources: [
      'Non-invasive shoreline fresh-fecal swabbing and water eRNA/eDNA RT-qPCR screening in partnership with veterinary microbiology labs',
      'Sediment, macroinvertebrate, and naturally deceased bird tissue ICP-MS / GC-MS contaminant panels',
    ],
    deliverable:
      'Western Himalayan Avian One-Health Surveillance & Mass-Mortality Rapid Response SOP.',
    methodologicalCaveat:
      'Surveillance communication must strictly avoid framing wild migratory birds as pests or justifying wetland drainage/culling, which scatters infected flocks and worsens spillover.',
  },

  // VOLUME XIV — Chapters 40–42
  {
    number: 40,
    code: '40',
    slug: 'chapter-40-birds-in-multilingual-oral-traditions-and-calendars',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle:
      'Ethno-ornithology, cultural memory and multilingual avian heritage',
    title:
      'Avian Cultural Memory Across Kashmiri, Dogri, Ladakhi, Pahari, Gojri, Shina, Balti and Burushaski Traditions',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Documents the rich ethno-ornithological heritage embedded in regional poetry (*shrukhs*, *vatsun*, folk songs), agricultural phenology proverbs, weather lore, and spiritual reverence—from the *Kukil* (cuckoo), *Poshnool* (Golden Oriole), *Hud-hud* (Hoopoe), and *Hangul-forest* birds of Kashmir to the sacred *Cha-thung-thung* (Black-necked Crane) of Ladakh.',
      'Captures endangered oral ecological calendars before generational language attrition erases centuries of vernacular phenological observation.',
    ],
    investigativeQuestions: [
      'How did traditional agrarian and pastoralist calendars use specific bird arrivals and songs to time paddy sowing, transhumant ascent, and autumn harvest?',
      'How do cultural taboos and spiritual associations protect specific species (such as Black-necked Cranes, Hoopoes, and Swallows) while stigmatizing others (such as Owls)?',
    ],
    methodsAndDataSources: [
      'Archival textual scholarship, regional folklore collections, and recorded oral-history interviews across eight linguistic communities',
      'Cross-validation of phenological proverbs against contemporary arrival curves',
    ],
    deliverable:
      'Digital Archive of Western Himalayan Avian Oral Traditions & Phenological Lore.',
    methodologicalCaveat:
      'Poetic tropes frequently blend symbolic imagery (such as Persian *bulbul* conventions) with empirical local natural history; linguistic philology must partner with field ornithology.',
  },
  {
    number: 41,
    code: '41',
    slug: 'chapter-41-sacred-groves-shrine-chinars-and-community-custodianship',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle:
      'Ethno-ornithology, cultural memory and multilingual avian heritage',
    title:
      'Sacred Groves, Monastery Buffers, Shrine Chinars and Graveyard Refugia as Informal Avian Sanctuaries',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Investigates the disproportionate ecological value of ancient trees, uncut scrub patches, and protected waters maintained around Sufi *ziyarats*, Hindu *devbans*/temples, Buddhist *gompas*, and village graveyards (*mazar*/*qabristan*) across deforested or intensively farmed landscapes.',
      'Quantifies cavity-nesting owl, woodpecker, starling, hoopoe, and flycatcher densities inside culturally protected groves versus surrounding managed land.',
    ],
    investigativeQuestions: [
      'What fraction of surviving veteran hollow cavity trees in agricultural districts stands within shrine compounds, temples, monasteries, and graveyards?',
      'How can traditional community custodianship be supported without intrusive bureaucratization or concrete "beautification" that fells old trees and seals earthen banks?',
    ],
    methodsAndDataSources: [
      'Paired avian guild and cavity-tree surveys across 100+ sacred groves/graveyards vs. matched agricultural/urban control plots',
      'Participatory stewardship dialogues with shrine trusts, *gompa* committees, *devban* guardians, and village elders',
    ],
    deliverable:
      'Sacred Natural Sites & Heritage-Tree Avian Stewardship Guidelines.',
    methodologicalCaveat:
      'Modern concrete renovation and floodlighting of historic shrines/graveyards increasingly threatens the very microhabitats traditional reverence preserved.',
  },
  {
    number: 42,
    code: '42',
    slug: 'chapter-42-vernacular-folk-taxonomy-to-linnaean-concordance',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle:
      'Ethno-ornithology, cultural memory and multilingual avian heritage',
    title:
      'Reconciling Vernacular Folk Taxonomies with Linnaean Nomenclature for Multilingual Citizen Science',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Constructs a rigorous linguistic-to-scientific concordance mapping local bird names across Kashmiri, Dogri, Ladakhi, Purgi/Balti, Pahari-Pothwari, Gojri, Shina, Khowar, and Burushaski onto verified binomial taxa, audio calls, and illustrations.',
      'Eliminates persistent translation errors where a single vernacular label spans multiple biological species or varies between adjacent valleys.',
    ],
    investigativeQuestions: [
      'Which vernacular names exhibit one-to-one species precision (e.g., *Kola-tonch* for Ibisbill, *Cha-thung-thung* for Black-necked Crane) versus folk-generic grouping (e.g., leaf-warblers or ducks)?',
      'How does publishing field guides and citizen-science interfaces in regional languages expand rural participation by shepherds, fishers, and schoolchildren?',
    ],
    methodsAndDataSources: [
      'Structured photo-and-call elicitation workshops with boatmen (*hanjis*), shepherds, forest watchers, and elders across all five regions',
      'Phonetic IPA transcription, native-script rendering, and audio pronunciation recording',
    ],
    deliverable:
      'Open Multilingual Western Himalayan Bird Lexicon (8+ Regional Languages mapped to Avibase/IOC IDs).',
    methodologicalCaveat:
      'Folk names gathered without standardized visual/acoustic voucher prompts must not be converted directly into rare-species distribution records.',
  },

  // VOLUME XV — Chapters 43–45
  {
    number: 43,
    code: '43',
    slug: 'chapter-43-autonomous-bioacoustics-and-machine-learning-verification',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle:
      'Contemporary ornithological methods, bioacoustics, telemetry and geospatial intelligence',
    title:
      'Autonomous Acoustic Arrays, Automated Machine-Learning Acoustic and Visual Species Identification, and Mandatory Verification Protocols',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Establishes deployment standards for weatherproof Autonomous Recording Units (ARUs) across snow-bound subalpine pheasants, nocturnal forest owls, dense reedbed rails, and nocturnal flight-call corridors.',
      'Defines strict metrological governance for automated machine-learning acoustic and visual species identification (including BirdNET- and Merlin-class convolutional classifiers): addressing Western Himalayan training-data scarcity, vocal dialects, mimicry, and torrential river background noise through calibrated confidence thresholds and mandatory human specialist verification.',
    ],
    investigativeQuestions: [
      'What species-specific precision–recall curves and false-positive rates do global acoustic classifiers exhibit on Western Himalayan dialects and torrent-noise soundscapes?',
      'How many regionally annotated voucher recordings per species are required to fine-tune open-weights acoustic classifiers for EBA 128 endemics?',
    ],
    methodsAndDataSources: [
      'Stratified ARU soundscape grids paired with Xeno-canto / Macaulay Library regional reference call libraries',
      'Double-blind human ornithologist benchmarking of automated acoustic and photo-identification candidate outputs',
    ],
    deliverable:
      'Western Himalayan Reference Bioacoustic Library & Machine-Learning Verification Standard (Zero Unverified Auto-Ingestion Rule).',
    methodologicalCaveat:
      'Unvetted automated machine-learning acoustic and visual species identification outputs must NEVER be ingested directly into official regional checklists without human spectrogram/voucher confirmation.',
  },
  {
    number: 44,
    code: '44',
    slug: 'chapter-44-telemetry-radar-edna-and-isotope-protocols',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle:
      'Contemporary ornithological methods, bioacoustics, telemetry and geospatial intelligence',
    title:
      'Satellite Telemetry, Avian Radar, Wetland Environmental DNA (eDNA) and Stable-Isotope Provenance Protocols',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Integrates four complementary frontier tools to solve intractable Himalayan ornithological questions: solar GPS-GSM/ICARUS tracking for trans-border routes, portable avian radar for nocturnal gorge passage, filtered marsh-water eDNA metabarcoding for cryptic bitterns/crakes/pochards, and naturally shed feather stable isotopes (δ²H, δ¹³C, δ¹⁵N, ⁸⁷Sr/⁸⁶Sr) for non-invasive natal/moult origin assignment.',
      'Prioritizes minimally invasive and zero-capture sampling (water filtration, moulted feathers, passive radar) wherever feasible.',
    ],
    investigativeQuestions: [
      'Can 1-litre filtered water eDNA assays detect scarce breeding Watercock, Baillon’s Crake, and Little Bittern across overgrown Kashmir reedbeds with higher sensitivity than visual counts?',
      'What proportion of wintering Mallards, Pintails, and Bar-headed Geese in Kashmir and Jammu moult on the Tibetan Plateau vs. Siberian/Kazakh latitudes according to shed-feather δ²H isoscapes?',
    ],
    methodsAndDataSources: [
      'Avian 12S/COI eDNA primer validation, IRMS feather stable-isotope mass spectrometry, and Movebank data-archiving protocols',
      'Animal-welfare <3% tag-mass and harness-release ethical compliance standards',
    ],
    deliverable:
      'Non-Invasive Molecular, Isotopic & Aeroecological Field Protocol Suite.',
    methodologicalCaveat:
      'Wetland eDNA confirms recent DNA presence in connected waters but cannot distinguish live breeding pairs from transient passage birds or upstream inflow transport without spatial replication.',
  },
  {
    number: 45,
    code: '45',
    slug: 'chapter-45-satellite-habitat-coupling-and-occupancy-modelling',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle:
      'Contemporary ornithological methods, bioacoustics, telemetry and geospatial intelligence',
    title:
      'Multi-Sensor Satellite Habitat Coupling (Sentinel-1/2, GEDI LiDAR) and Hierarchical Spatiotemporal Modelling',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Couples dynamic Earth-observation layers—cloud-penetrating Sentinel-1 SAR wetland surface water, 10 m Sentinel-2 snow/reed/orchard phenology, Landsat multi-decadal land-cover trajectories, and GEDI spaceborne LiDAR vertical forest canopy profiles—directly with field avian point counts and semi-structured checklists.',
      'Builds reproducible Bayesian and hierarchical occupancy/abundance workflows that propagate both remote-sensing classification error and avian detection uncertainty.',
    ],
    investigativeQuestions: [
      'How accurately do GEDI foliage-height diversity (FHD) and understory plant-area volume density predict Kashmir Flycatcher and Western Tragopan habitat suitability across unsampled valleys?',
      'How closely do 12-day Sentinel-1 SAR open-water fluctuations track within-winter redistribution of waterfowl across the 27 AWC wetlands?',
    ],
    methodsAndDataSources: [
      'Copernicus Sentinel-1/2, NASA GEDI L2A/L2B canopy structure, Planet/NICFI, and USGS Landsat archives',
      'R `unmarked`, `spOccupancy`, and `ebirdst`-style spatiotemporal ensemble workflows',
    ],
    deliverable:
      'Dynamic 10 m Western Himalayan Avian Habitat Integrity & Occupancy Modelling Pipeline.',
    methodologicalCaveat:
      'Steep (>35°) mountain slopes introduce radar foreshortening/layover and GEDI geolocation/slope-broadening errors requiring terrain-corrected filtering.',
  },

  // VOLUME XVI — Chapters 46–48
  {
    number: 46,
    code: '46',
    slug: 'chapter-46-calibrating-citizen-science-and-spatial-effort-bias',
    volumeNumber: 16,
    volumeRoman: 'XVI',
    volumeTitle:
      'Citizen science, open data standards and institutional monitoring reform',
    title:
      'Calibrating Citizen Science (eBird, Asian Waterbird Census, Campus Counts) for Spatial, Seasonal and Taxonomic Rigor',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines the transformative rise of citizen birding across Jammu, Kashmir, Ladakh, AJK, and Gilgit-Baltistan while diagnosing severe structural biases: heavy clustering around Srinagar, Leh, Pangong/Tso Kar roads, Jammu, and Mangla; summer tourist peaks; incomplete "rarity-only" checklists; and misidentification of difficult *Phylloscopus*, *Acrocephalus*, *Calidris*, and *Aquila* complexes.',
      'Specifies spatial subsampling, checklist-completeness filtering, and regional reviewer protocols to turn community enthusiasm into research-grade trend indices.',
    ],
    investigativeQuestions: [
      'Which districts and 10×10 km grid cells across the five regions have fewer than 10 complete checklists across winter and monsoon seasons?',
      'How can targeted "Gap-Challenge" expeditions and university fellowships systematically fill cold-spot grids?',
    ],
    methodsAndDataSources: [
      'GBIF/eBird Basic Dataset spatiotemporal effort-density heatmaps across all five regions',
      'State of India’s Birds (SoIB) complete-checklist filtering and observer-expertise calibration protocols',
    ],
    deliverable:
      'Five-Region Citizen-Science Spatial Gap Atlas & Complete-Checklist Quality Guide.',
    methodologicalCaveat:
      'Unfiltered opportunistic sightings reflect birder road accessibility rather than true avian density unless effort covariates and spatial grid thinning are applied.',
  },
  {
    number: 47,
    code: '47',
    slug: 'chapter-47-avian-intelligence-observatory-darwin-core-governance',
    volumeNumber: 16,
    volumeRoman: 'XVI',
    volumeTitle:
      'Citizen science, open data standards and institutional monitoring reform',
    title:
      'Data Architecture of the Western Himalayan Avian Intelligence Observatory: Darwin Core Standards and Sensitive-Species Geofencing',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Defines the technical schema, open-data APIs, taxonomic version control, and ethical anti-poaching/anti-disturbance safeguards governing KEW’s permanent Western Himalayan Avian Intelligence Observatory.',
      'Mandates automatic coordinate fuzzing/geofencing (>=5–10 km grid generalization) and delayed embargoes for active nests, roosts, and trapping-sensitive species (Western Tragopan, Black-necked Crane, Saker/Shaheen Falcons, Owl cavities).',
    ],
    investigativeQuestions: [
      'How can full scientific reproducibility and open public accountability coexist with strict spatial protection of poaching- and photography-sensitive nest sites?',
      'Which Darwin Core (DwC) and Humboldt Extension fields are mandatory for every structured survey ingested into KEW?',
    ],
    methodsAndDataSources: [
      'TDWG Darwin Core + Humboldt Ecological Inventory Extension specifications and GBIF Sensitive Species Best Practices',
      'KEW Normalized Avifaunal Schema v2.0 (remediating all five Section 2 self-audit findings)',
    ],
    deliverable:
      'Open Data & Sensitive-Species Geofencing Governance Specification for `/biodiversity/birds/avian-intelligence-observatory`.',
    methodologicalCaveat:
      'Exact GPS coordinates of Vulnerable/Endangered nests or falcon eyries must never be exposed in public client payloads or downloadable CSVs.',
  },
  {
    number: 48,
    code: '48',
    slug: 'chapter-48-reforming-official-wildlife-censuses-and-public-ledgers',
    volumeNumber: 16,
    volumeRoman: 'XVI',
    volumeTitle:
      'Citizen science, open data standards and institutional monitoring reform',
    title:
      'Reforming Departmental Wildlife Censuses: From Headline Press Totals to Reproducible Species-by-Site Open Ledgers',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Critiques the institutional habit of releasing single aggregate waterbird or pheasant press-note figures without publishing underlying species-by-wetland tables, census-point coordinates, observer numbers, weather conditions, or estimation uncertainty.',
      'Proposes a standardized Open Census Reporting Template for wildlife departments across J&K, Ladakh, AJK, and Gilgit-Baltistan—starting with full public release of the February 12, 2026 Asian Waterbird Census species-wise dataset.',
    ],
    investigativeQuestions: [
      'Why do official press releases highlight aggregate duck headcounts while species-wise breakdowns across all 27 wetlands and 58 census points remain unavailable to independent scientists?',
      'What minimum metadata fields allow independent researchers to verify inter-annual waterbird and galliform trends without RTI litigation?',
    ],
    methodsAndDataSources: [
      'Comparative audit of public census disclosures (2015–2026), October 2026 RTI records, and Wetlands International AWC reporting standards',
      'Draft Open Statutory Wildlife Census Reporting Protocol',
    ],
    deliverable:
      'Model Open Avian Census Disclosure Template & Public Data Release Benchmark.',
    methodologicalCaveat:
      'Constructive methodological reform recognizes the hard field labour of frontline wildlife guards and volunteers while upgrading statistical transparency.',
  },

  // VOLUME XVII — Chapters 49–51
  {
    number: 49,
    code: '49',
    slug: 'chapter-49-statutory-schedules-ramsar-audits-and-unprotected-habitats',
    volumeNumber: 17,
    volumeRoman: 'XVII',
    volumeTitle:
      'Law, governance, protected-area gaps and transboundary flyway diplomacy',
    title:
      'Statutory Protection Audits: Wildlife Schedules, Ramsar Obligations and the Crisis of Unnotified Satellite Wetlands and Rivers',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Audits statutory avian protection across India’s Wildlife (Protection) Amendment Act 2022, Wetland (Conservation and Management) Rules 2017, AJK Wildlife Protection Act, Gilgit-Baltistan Wildlife frameworks, CITES, and Ramsar site management plans (Wular, Hokersar, Hygam, Shallabugh, Surinsar–Mansar, Tso Moriri, Tso Kar).',
      'Exposes the massive legal gap leaving braided river shingle islands, karewa steppes, subtropical scrub, and dozens of unnotified satellite floodplains completely outside protected-area boundaries.',
    ],
    investigativeQuestions: [
      'Which Ramsar wetlands in J&K and Ladakh possess notified, gazetted digital boundary maps and active Wise-Use hydrological management plans?',
      'What proportion of Ibisbill breeding river reaches, Gharana’s hydrological catchment, and low-elevation winter oak refugia enjoys zero statutory habitat protection?',
    ],
    methodsAndDataSources: [
      'Gazette notifications, Ramsar Information Sheets (RIS), High Court / NGT wetland demarcation dockets, and protected-area polygon overlays',
      'Gap analysis intersecting flagship/threatened species distributions with statutory protected boundaries',
    ],
    deliverable:
      'Five-Region Protected-Area Coverage Gap Audit & Unnotified Wetland/River Conservation Reserve Dossier.',
    methodologicalCaveat:
      'Listing a bird species on Schedule I provides paper protection against hunting but zero defense against legal habitat destruction unless critical foraging and nesting substrates are spatially protected.',
  },
  {
    number: 50,
    code: '50',
    slug: 'chapter-50-avifaunal-safeguards-in-eia-and-judicial-remedies',
    volumeNumber: 17,
    volumeRoman: 'XVII',
    volumeTitle:
      'Law, governance, protected-area gaps and transboundary flyway diplomacy',
    title:
      'Forensic Audit of Avifaunal Sections in Environmental Impact Assessments (Hydropower, Highways, Mining, Ropeways)',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Examines biodiversity chapters submitted in regional hydropower, highway/tunnel, riverbed mining, transmission-line, and tourist-ropeway Environmental Impact Assessments, documenting recurrent defects: single-week summer desktop checklists, copy-pasted species tables, omission of nocturnal passage, and ignoring cumulative basin fragmentation.',
      'Establishes legally enforceable four-season EIA ornithological baseline standards and reviews High Court, Supreme Court, and NGT public-trust jurisprudence.',
    ],
    investigativeQuestions: [
      'What percentage of regional hydropower and riverbed-mining EIAs conducted actual winter, spring-passage, and May–June breeding-season avian fieldwork?',
      'How can mandatory cumulative basin-wide flyway and shingle-bar impact thresholds prevent piecemeal "salami-slicing" project approvals?',
    ],
    methodsAndDataSources: [
      'PARIVESH / SEIAA / EPA public EIA reports, Forest Advisory Committee minutes, and six-monthly compliance filings',
      'Supreme Court (including power-line diverter & wetland public-trust precedents), NGT, and High Court environmental orders',
    ],
    deliverable:
      'Mandatory Four-Season Ornithological & Flyway EIA Scoping Standard.',
    methodologicalCaveat:
      'Critique of deficient EIA baselines evaluates methodological compliance with ecological science rather than alleging bad faith without documentary proof.',
  },
  {
    number: 51,
    code: '51',
    slug: 'chapter-51-cms-central-asian-flyway-cooperative-science',
    volumeNumber: 17,
    volumeRoman: 'XVII',
    volumeTitle:
      'Law, governance, protected-area gaps and transboundary flyway diplomacy',
    title:
      'Science Without Borders: Operationalizing the CMS Central Asian Flyway Action Plan Across Divided Mountain Landscapes',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Explores non-politicized scientific mechanisms—open global repositories (GBIF, eBird, Movebank, Avibase, Wetlands International), harmonized Darwin Core telemetry/census standards, and multilateral CMS Central Asian Flyway frameworks—through which ornithologists across India, Pakistan, Sri Lanka, Central Asia, and ~30 CAF states can protect shared bird populations.',
      'Demonstrates using the Kashmir Flycatcher (breeding in Kashmir/AJK, wintering in Sri Lanka), Western Tragopan (Kazinag–Machiara), and Bar-headed Goose (Ladakh–Gharana–Mangla) why biological survival depends on open trans-regional scientific literacy.',
    ],
    investigativeQuestions: [
      'How can open, standardized scientific protocols synchronize pheasant call-counts, mid-winter waterbird censuses, and NSAID pharmacy audits across divided Himalayan watersheds without requiring bilateral political treaties?',
      'Which Western Himalayan wetland and river complexes meet quantitative Ramsar and Flyway Site Network criteria under the CMS Central Asian Flyway initiative?',
    ],
    methodsAndDataSources: [
      'UNEP/CMS Central Asian Flyway institutional mandates, IUCN Transboundary Conservation Specialist Group case studies, and open-data interoperability standards',
      'Cross-regional species conservation action plans (*Ficedula subrubra*, *Tragopan melanocephalus*, *Grus nigricollis*)',
    ],
    deliverable:
      'Open-Science Trans-Regional Flyway Coordination Charter for Western Himalayan Ornithology.',
    methodologicalCaveat:
      'All cooperative data sharing must strictly respect national laws, security-zone regulations, and open-access academic publishing norms.',
  },

  // VOLUME XVIII — Chapters 52–54
  {
    number: 52,
    code: '52',
    slug: 'chapter-52-sectoral-stewardship-for-eleven-stakeholder-groups',
    volumeNumber: 18,
    volumeRoman: 'XVIII',
    volumeTitle:
      'The Western Himalayan Avian Conservation Agenda 2027–2035',
    title:
      'From Ornithology to Everyday Practice: Sectoral Action Protocols for Eleven Stakeholder Groups',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Translates fifty-one chapters of ornithological evidence into concrete, field-ready operational protocols for Farmers, Orchardists, Pastoralists, Urban Planners/Architects, Infrastructure/Grid Engineers, Wildlife/Wetland Managers, Veterinarians/Pharmacists, Tourism Operators/Photographers, Schools/Universities, Jurists/Policymakers, and Local Communities.',
      'Aligns livelihood incentives—biological orchard pest/vole control, eco-certified birding homestays, crop-damage insurance at Gharana, sustainable post-breeding reed harvest—with measurable habitat retention.',
    ],
    investigativeQuestions: [
      'Which low-cost structural interventions (sparrow/owl nest boxes, power-line diverters, meloxicam substitution, seasonal mining closures, waste containment) yield the highest immediate avian survival per rupee invested?',
      'How can orchardists and wetland-edge communities gain direct economic value from maintaining bird-friendly agro-ecosystems?',
    ],
    methodsAndDataSources: [
      'Cost-effectiveness synthesis across conservation interventions (Conservation Evidence framework)',
      'Stakeholder co-design workshops across farming, horticultural, pastoral, engineering, and village institutions',
    ],
    deliverable:
      'Eleven-Sector Western Himalayan Bird-Safe Operational Handbooks.',
    methodologicalCaveat:
      'Conservation rules imposed on farmers, herders, or boatmen without viable livelihood alternatives or fair compensation rarely achieve durable field compliance.',
  },
  {
    number: 53,
    code: '53',
    slug: 'chapter-53-counterfactual-baci-conservation-outcome-auditing',
    volumeNumber: 18,
    volumeRoman: 'XVIII',
    volumeTitle:
      'The Western Himalayan Avian Conservation Agenda 2027–2035',
    title:
      'Counterfactual Conservation Outcome Auditing (BACI): Measuring Interventions by Demographic Survival Rather Than Expenditure',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Replaces input-based departmental reporting (funds utilized, bunds built, saplings planted, dredger hours billed) with Before–After Control–Impact (BACI) ecological auditing across wetland restoration, satellite-jheel re-wetting, power-line retrofitting, feral-dog management, and forest understory protection.',
      'Links directly to Monograph 02 (Selective Environmental Consciousness) and Monograph 03 (The Mathematics of a Dying Lake) to establish unified ecological outcome accountability across Kashmir EcoWatch.',
    ],
    investigativeQuestions: [
      'Did sanctioned wetland dredging, silt-trap construction, or embankment works measurably increase summer marsh-bird nest survival, submerged macrophyte biomass, or spatial waterbird evenness relative to untreated sites?',
      'What standardized ecological vital rates must every publicly funded biodiversity project report at 1-, 3-, and 5-year post-intervention milestones?',
    ],
    methodsAndDataSources: [
      'BACI experimental design templates, treasury/CAMPA/wetland project ledgers, and multi-year demographic monitoring series',
      'Cross-module integration with KEW Environmental Accountability and Dal Lake Conservation Performance Observatories',
    ],
    deliverable:
      'Mandatory Avian Conservation Outcome Audit Matrix (Cost per Verified Breeding Pair / Hectare of Functional Habitat Restored).',
    methodologicalCaveat:
      'Natural inter-annual flyway fluctuations require matched untreated control wetlands/forests so climate anomalies are not mistaken for project success or failure.',
  },
  {
    number: 54,
    code: '54',
    slug: 'chapter-54-western-himalayan-avian-conservation-roadmap-2027-2035',
    volumeNumber: 18,
    volumeRoman: 'XVIII',
    volumeTitle:
      'The Western Himalayan Avian Conservation Agenda 2027–2035',
    title:
      'The 2027–2035 Decadal Roadmap: Priority Refugia, Open Monitoring Networks and the Landscapes Birds Require to Return',
    researchStatus:
      'Proposed Chapter Protocol · Census & Field Validation Ongoing',
    executiveSummary: [
      'Synthesizes the entire 18-volume investigation into a prioritized, milestone-driven 2027–2035 conservation and research agenda across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan.',
      'Closes with an empirical answer to the monograph’s defining question—specifying the minimum connected network of unencroached wetlands, unmined shingle rivers, intact deciduous-understory forests, dog-free alpine fens, NSAID-free pastures, and dark, wire-safe mountain passes required so trans-continental and altitudinal migrants continue finding home.',
    ],
    investigativeQuestions: [
      'Which 30 priority landscapes—spanning notified sanctuaries, satellite wetlands, braided river reaches, vertical forest corridors, and mountain passes—form the irreducible ecological backbone for Western Himalayan birds through 2035?',
      'Which ten measurable 2027–2035 indicators will tell the public honestly whether Western Himalayan birdlife is recovering or unravelling?',
    ],
    methodsAndDataSources: [
      'Systematic conservation planning (Marxan/Zonation spatial prioritization) integrating all 8 flagship species, EBA 128 endemics, CAF waterbird congregations, and 2050 climate refugia',
      'Nine-year milestone tracker hosted permanently on the KEW Western Himalayan Avian Intelligence Observatory',
    ],
    deliverable:
      'The Western Himalayan Avian Conservation Agenda 2027–2035 & Ten-Indicator Decadal Scorecard.',
    methodologicalCaveat:
      'Spatial prioritization maps represent living scientific decision-support baselines designed to evolve continuously as census reconciliations and field validations mature.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10C. CHAPTER & VOLUME NAVIGATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const SKY_ROMAN_TO_NUMBER: Record<string, number> = {
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
  xiii: 13,
  xiv: 14,
  xv: 15,
  xvi: 16,
  xvii: 17,
  xviii: 18,
};

/**
 * Look up any of the 54 Monograph 04 chapters by canonical slug
 * (`chapter-01-...`), short prefix (`chapter-01`), two-digit code (`01`),
 * or integer string (`1`).
 */
export function getSkyMonographChapterBySlug(
  slug: string,
): SkyMonographChapter | undefined {
  const clean = decodeURIComponent(slug || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const exact = SKY_NO_BORDERS_CHAPTERS_54.find(
    (ch) => ch.slug.toLowerCase() === clean,
  );
  if (exact) return exact;

  const byCode = SKY_NO_BORDERS_CHAPTERS_54.find(
    (ch) =>
      ch.code.toLowerCase() === clean ||
      `chapter-${ch.code.toLowerCase()}` === clean ||
      String(ch.number) === clean,
  );
  if (byCode) return byCode;

  const prefixMatch = clean.match(/^chapter-(\d{1,2})\b/);
  if (prefixMatch) {
    const num = Number.parseInt(prefixMatch[1], 10);
    return SKY_NO_BORDERS_CHAPTERS_54.find((ch) => ch.number === num);
  }

  return undefined;
}

/**
 * Retrieve previous and next chapters across Chapters 01–54 for sequential navigation.
 */
export function getSkyMonographAdjacentChapters(slug: string): {
  previous?: SkyMonographChapter;
  next?: SkyMonographChapter;
} {
  const current = getSkyMonographChapterBySlug(slug);
  if (!current) return {};
  const idx = SKY_NO_BORDERS_CHAPTERS_54.findIndex(
    (ch) => ch.number === current.number,
  );
  return {
    previous: idx > 0 ? SKY_NO_BORDERS_CHAPTERS_54[idx - 1] : undefined,
    next:
      idx >= 0 && idx < SKY_NO_BORDERS_CHAPTERS_54.length - 1
        ? SKY_NO_BORDERS_CHAPTERS_54[idx + 1]
        : undefined,
  };
}

/**
 * Look up any of the 18 Monograph 04 volumes by Roman numeral (`I`..`XVIII`),
 * number (`1`..`18`), or volume slug.
 */
export function getSkyMonographVolumeByRomanOrNumber(
  token: string | number,
): SkyMonographVolumeSpec | undefined {
  if (typeof token === 'number') {
    return SKY_NO_BORDERS_VOLUMES_18.find((v) => v.volumeNumber === token);
  }
  const clean = decodeURIComponent(token || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const direct = SKY_NO_BORDERS_VOLUMES_18.find(
    (v) =>
      v.slug.toLowerCase() === clean ||
      v.volumeRoman.toLowerCase() === clean ||
      `volume-${v.volumeRoman.toLowerCase()}` === clean ||
      String(v.volumeNumber) === clean ||
      v.volumeNumber.toString().padStart(2, '0') === clean,
  );
  if (direct) return direct;

  if (clean in SKY_ROMAN_TO_NUMBER) {
    const num = SKY_ROMAN_TO_NUMBER[clean];
    return SKY_NO_BORDERS_VOLUMES_18.find((v) => v.volumeNumber === num);
  }

  return undefined;
}

/**
 * Return the 3 ordered chapters belonging to a given Monograph 04 volume.
 */
export function getSkyMonographChaptersByVolume(
  volumeToken: number | string,
): SkyMonographChapter[] {
  const vol = getSkyMonographVolumeByRomanOrNumber(volumeToken);
  if (!vol) return [];
  return SKY_NO_BORDERS_CHAPTERS_54.filter(
    (ch) => ch.volumeNumber === vol.volumeNumber,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. PERMANENT KEW COMPANION — WESTERN HIMALAYAN AVIAN INTELLIGENCE OBSERVATORY (12 MODULES)
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_AVIAN_INTELLIGENCE_OBSERVATORY_12: KewAvianObservatoryModuleSpec[] = [
  {
    code: 'WHAIO-01',
    title: 'Verified Avian Registry',
    operationalFunction:
      'Maintains the normalized Western Himalayan master species ledger reconciling IOC, Clements, BirdLife, and Howard & Moore concepts while remediating KEW’s 601-taxon self-audit discrepancies across all five regions.',
    dataStandard:
      'Darwin Core Taxon core + Avibase ID + BirdLife SIS ID + strict EBA 128 endemism & per-jurisdiction statutory schedule tags.',
    currentStatus:
      'Baseline 601-taxon ledger active on KEW; formal taxonomic deduplication and five-region status reconciliation in progress.',
    connectedKewSurfaceLabel: 'KEW Avifauna & Ornithology Registry',
    connectedKewSurfaceHref: '/biodiversity/birds',
  },
  {
    code: 'WHAIO-02',
    title: 'Migration Intelligence',
    operationalFunction:
      'Tracks Central Asian Flyway continental arrivals/departures, high-altitude pass funnels (Zoji La, Karakoram, Indus Gorge, Banihal), and seasonal 300–5,500 m altitudinal turnover.',
    dataStandard:
      'Movebank telemetry metadata, quantile arrival/departure phenology curves, and Humboldt Ecological Inventory pass-watch protocols.',
    currentStatus:
      'Seasonal migration windows operational; pass-funnel telemetry & nocturnal corridor synthesis proposed.',
    connectedKewSurfaceLabel: 'KEW Migration Windows & Calendar',
    connectedKewSurfaceHref: '/biodiversity/migration-calendar',
  },
  {
    code: 'WHAIO-03',
    title: 'Population Trends',
    operationalFunction:
      'Computes effort-standardized abundance indices, spatial concentration metrics (Gini/Shannon across 27+ wetlands), and Common Himalayan Bird Indicators separating genuine demographic trends from observer-effort growth.',
    dataStandard:
      'Site-disaggregated Asian Waterbird Census tables with mandatory observer-hour, block-count, and water-stage covariates.',
    currentStatus:
      '2020–2025 headline waterbird series catalogued; awaiting public release of February 12, 2026 species-wise AWC tables for full effort calibration.',
    connectedKewSurfaceLabel: 'KEW Biodiversity Risk Dashboard',
    connectedKewSurfaceHref: '/biodiversity/risk-dashboard',
  },
  {
    code: 'WHAIO-04',
    title: 'Acoustic Monitoring',
    operationalFunction:
      'Archives voucher bird vocalizations and processes Autonomous Recording Unit (ARU) soundscapes for Western Tragopan dawn call-counts, forest owls, reedbed rails, and nocturnal flight calls.',
    dataStandard:
      'WAV/FLAC time-stamped soundscape archives screened via automated machine-learning acoustic and visual species identification strictly gated by mandatory human spectrogram verification.',
    currentStatus:
      'Proposed regional bioacoustic reference library and ARU verification protocol.',
    connectedKewSurfaceLabel: 'KEW Seasonal Activity & Phenology',
    connectedKewSurfaceHref: '/biodiversity/seasonal-activity',
  },
  {
    code: 'WHAIO-05',
    title: 'Habitat Change Detection',
    operationalFunction:
      'Couples Sentinel-1 SAR wetland inundation, Sentinel-2 reedbed/snowline phenology, GEDI 3D understory structure, and riverbed mining pit footprints directly to avian guild carrying capacity.',
    dataStandard:
      '10 m stage-normalized surface-water masks, core-forest interior buffers (>100 m), and active shingle-bar persistence polygons.',
    currentStatus:
      'Connected to KEW Satellite Change Detection & Wetland Registries; avian guild coupling protocols specified.',
    connectedKewSurfaceLabel: 'KEW Satellite Change Detection Observatory',
    connectedKewSurfaceHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'WHAIO-06',
    title: 'Breeding Intelligence',
    operationalFunction:
      'Monitors May–August marsh-bird nesting survival, Changthang Black-necked Crane chick recruitment, Kashmir Flycatcher territory occupancy, and Ibisbill shingle-bar clutches under strict spatial geofencing.',
    dataStandard:
      'Mayfield/logistic-exposure daily nest survival rates with mandatory >=5–10 km coordinate masking for sensitive species.',
    currentStatus:
      'Proposed breeding-season monitoring module addressing winter-centric census blind spots.',
    connectedKewSurfaceLabel: 'KEW Endemic & Threatened Species',
    connectedKewSurfaceHref: '/biodiversity/endemic-species',
  },
  {
    code: 'WHAIO-07',
    title: 'Avian Mortality Registry',
    operationalFunction:
      'Records verified power-line wire strikes, raptor pole electrocutions, feral dog nest/chick predation, HPAI/botulism die-offs, pesticide/NSAID poisonings, roadkills, and poaching incidents.',
    dataStandard:
      'Geo-referenced carcass/incident dockets with scavenger-persistence calibration, necropsy/toxicology status, and utility span IDs.',
    currentStatus:
      'Linked to KEW Wildlife Mortality & Kill Records; avian collision and NSAID toxicology sub-ledgers specified.',
    connectedKewSurfaceLabel: 'KEW Wildlife Mortality & Kill Records',
    connectedKewSurfaceHref: '/risk-monitoring/wildlife-mortality-kill-records',
  },
  {
    code: 'WHAIO-08',
    title: 'Threat Intelligence',
    operationalFunction:
      'Tracks all fifteen anthropogenic avian threat protocols—from wetland encroachment, riverbed boulder mining, and orchard spray intensity to veterinary NSAID prevalence and sanctuary off-road intrusions.',
    dataStandard:
      'Quantitative pressure indicators paired with statutory EIA/PARIVESH clearance and pharmacy/mining audit compliance flags.',
    currentStatus:
      '15 threat protocols cross-mapped to live KEW water, forest, EIA, and hazard surfaces.',
    connectedKewSurfaceLabel: 'KEW Sectoral EIA & Cumulative Impact',
    connectedKewSurfaceHref: '/sectoral-eia/cumulative-impact',
  },
  {
    code: 'WHAIO-09',
    title: 'Citizen Science',
    operationalFunction:
      'Guides regional birders, students, boatmen, and trekkers toward complete-checklist protocols, spatial cold-spot gap challenges, and the twelve ordinary household/stream sentinel bird groups.',
    dataStandard:
      'Complete-checklist effort metadata (duration, distance, observers, stationary/travelling protocol) with photographic/audio voucher triage.',
    currentStatus:
      'Connected to KEW Citizen Science & Bird Sightings portals; five-region spatial gap matrix active in protocol.',
    connectedKewSurfaceLabel: 'KEW Bird Sightings & Trails',
    connectedKewSurfaceHref: '/trails-sightings/bird-sightings',
  },
  {
    code: 'WHAIO-10',
    title: 'Regional Bird Research Archive',
    operationalFunction:
      'Indexes peer-reviewed ornithological papers, university theses, historical museum expedition logs, departmental census reports, and species action plans across J&K, Ladakh, AJK, and Gilgit-Baltistan.',
    dataStandard:
      'DOI/URI bibliographic metadata tagged by region, elevation band, taxonomic guild, and evidentiary verification status.',
    currentStatus:
      'Foundational corpus indexed; continuous bibliographic ingestion planned.',
    connectedKewSurfaceLabel: 'KEW Research Library',
    connectedKewSurfaceHref: '/research-library',
  },
  {
    code: 'WHAIO-11',
    title: 'Multilingual Bird Knowledge',
    operationalFunction:
      'Preserves vernacular bird names, IPA pronunciations, seasonal agricultural proverbs, and cultural stewardship traditions across Kashmiri, Dogri, Ladakhi, Pahari, Gojri, Shina, Balti, and Burushaski.',
    dataStandard:
      'Voucher-verified ethno-ornithological lexicon cross-mapped one-to-many or one-to-one against Avibase/IOC scientific concepts.',
    currentStatus:
      'Proposed multilingual ethno-ornithology repository & community elicitation framework.',
    connectedKewSurfaceLabel: 'KEW EcoVoices & Community Knowledge',
    connectedKewSurfaceHref: '/ecovoices',
  },
  {
    code: 'WHAIO-12',
    title: 'Conservation Outcome Audit',
    operationalFunction:
      'Evaluates publicly funded wetland works, CAMPA plantations, mining moratoria, dog-control drives, and power-line diverter installations using Before–After Control–Impact (BACI) biological survival metrics.',
    dataStandard:
      'Counterfactual BACI demographic effect sizes paired with sanctioned/expended public expenditure ledgers.',
    currentStatus:
      'Integrated conceptually with KEW Environmental Accountability & Dal Lake Performance Observatories.',
    connectedKewSurfaceLabel: 'KEW Environmental Accountability Observatory',
    connectedKewSurfaceHref: '/governance/environmental-accountability-observatory',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 12. FOUNDATIONAL SCIENTIFIC & DOCUMENTARY REFERENCES (12 VERIFIABLE SOURCES)
// ─────────────────────────────────────────────────────────────────────────────

export const SKY_NO_BORDERS_FOUNDATIONAL_REFERENCES: SkyMonographFoundationalReference[] = [
  {
    code: 'REF-01',
    title:
      'Annotated Checklist of the Birds of Jammu & Kashmir (592 Species Baseline)',
    authorityOrJournal: 'Journal of Threatened Taxa (Peer-Reviewed Regional Synthesis)',
    yearOrPeriod: '2024',
    url: 'https://threatenedtaxa.org',
    evidentiaryRole:
      'Establishes the peer-reviewed 592-species baseline across subtropical Jammu and temperate/alpine Kashmir Valley used in Section 1 checklist reconciliation.',
  },
  {
    code: 'REF-02',
    title:
      'Comprehensive Avifaunal Assessment of Ladakh (464 Vetted Species)',
    authorityOrJournal:
      'Sálim Ali Centre for Ornithology and Natural History (SACON) & Wildlife Institute of India (WII)',
    yearOrPeriod: 'September 2026',
    url: 'https://wii.gov.in',
    evidentiaryRole:
      'Provides the institutional 464-species synthesis for Trans-Himalayan Ladakh contrasted against the 512-species global aggregator count.',
  },
  {
    code: 'REF-03',
    title:
      'Year-Long Four-Season Ornithological Field Study of the Zanskar Valley (81 Species)',
    authorityOrJournal:
      'Regional Trans-Himalayan Field Ornithology & High-Altitude Seasonal Baseline',
    yearOrPeriod: '2025',
    url: 'https://threatenedtaxa.org',
    evidentiaryRole:
      'Demonstrates empirical four-season residency and passage (81 documented species) in semi-isolated Zanskar beyond brief summer tourist surveys.',
  },
  {
    code: 'REF-04',
    title:
      'Species Factsheet: Kashmir Flycatcher (Ficedula subrubra) & Western Himalayas Endemic Bird Area (EBA 128)',
    authorityOrJournal: 'BirdLife International DataZone & IUCN Red List of Threatened Species',
    yearOrPeriod: '2024–2026',
    url: 'https://datazone.birdlife.org',
    evidentiaryRole:
      'Defines global Vulnerable status, temperate deciduous understory habitat requirements in Kashmir/AJK, Sri Lankan wintering grounds, and strict EBA 128 restricted-range endemism.',
  },
  {
    code: 'REF-05',
    title:
      'Population Density, Habitat Selection and Conservation of Western Tragopan (Tragopan melanocephalus) in Machiara National Park and Leepa Valley',
    authorityOrJournal: 'Oryx — The International Journal of Conservation (Cambridge University Press)',
    yearOrPeriod: '2017–2024',
    url: 'https://www.cambridge.org/core/journals/oryx',
    evidentiaryRole:
      'Documents globally significant Western Tragopan breeding strongholds in Azad Jammu & Kashmir contiguous with Kazinag and Limber.',
  },
  {
    code: 'REF-06',
    title:
      'Central Asian Flyway (CAF) Action Plan for the Conservation of Migratory Waterbirds and Their Habitats & New Delhi CAF Initiative',
    authorityOrJournal: 'UNEP / Convention on the Conservation of Migratory Species of Wild Animals (CMS)',
    yearOrPeriod: '2005–2026',
    url: 'https://www.cms.int/en/legalinstrument/central-asian-flyway',
    evidentiaryRole:
      'Establishes the ~30-nation trans-continental flyway framework linking Arctic/Central Asian breeding grounds with Western Himalayan staging and wintering sites.',
  },
  {
    code: 'REF-07',
    title:
      'Avibase — The World Bird Database: Regional Checklists for Ladakh (Clements 2025: 512) and Azad Jammu & Kashmir (Howard & Moore: 552)',
    authorityOrJournal: 'Avibase (Denis Lepage / Birds Canada)',
    yearOrPeriod: '2025–2026',
    url: 'https://avibase.bsc-eoc.org',
    evidentiaryRole:
      'Illustrates how global taxonomic backbones (Clements 2025 vs. Howard & Moore vs. IOC) produce divergent regional totals requiring concept-level cross-mapping.',
  },
  {
    code: 'REF-08',
    title:
      'Asian Waterbird Census (AWC) February 12, 2026 Kashmir Survey Documentation (27 Wetlands, 58 Census Points) & 2020–2025 Census Series',
    authorityOrJournal:
      'Department of Wildlife Protection (J&K) & Wetlands International South Asia',
    yearOrPeriod: '2020–February 2026',
    url: 'https://south-asia.wetlands.org',
    evidentiaryRole:
      'Documents reported winter census counts rising from 813,043 (2020) to 1,343,506 (2025) and the February 12, 2026 27-wetland survey scope (species-wise final tables pending public release).',
  },
  {
    code: 'REF-09',
    title:
      'RTI-Based Investigation on Spatial Concentration of Wintering Migratory Birds Across Four Primary Kashmir Wetlands (~96% Share)',
    authorityOrJournal: 'Kashmir Impulse (Right to Information Documentary Reporting)',
    yearOrPeriod: 'October 2026',
    url: 'https://kashmirimpulse.com',
    evidentiaryRole:
      'Provides critical empirical context showing ~96% of counted wintering waterbirds crowd into four major basins despite high aggregate valley totals.',
  },
  {
    code: 'REF-10',
    title:
      'eBird Basic Dataset, Status & Trends Spatiotemporal Modelling, and Center for Conservation Bioacoustics Classifier Documentation',
    authorityOrJournal: 'Cornell Lab of Ornithology',
    yearOrPeriod: '2023–2026',
    url: 'https://ebird.org',
    evidentiaryRole:
      'Defines semi-structured checklist effort calibration and precision–recall verification protocols for automated machine-learning acoustic and visual species identification.',
  },
  {
    code: 'REF-11',
    title:
      'Open Avian Occurrence, Satellite Telemetry & Bioacoustic Voucher Infrastructures',
    authorityOrJournal:
      'Global Biodiversity Information Facility (GBIF), Movebank & Xeno-canto Foundation',
    yearOrPeriod: 'Continuous',
    url: 'https://www.gbif.org',
    evidentiaryRole:
      'Provides Darwin Core occurrence standards, sensitive-species coordinate generalization rules, satellite tracking repositories, and open sound-voucher archives.',
  },
  {
    code: 'REF-12',
    title:
      'State of India’s Birds 2023: Range, Trends, and Conservation Status',
    authorityOrJournal:
      'SoIB Partnership (WII, SACON, BNHS, NCF, WWF-India, Wetlands International, Bird Count India)',
    yearOrPeriod: '2023',
    url: 'https://stateofindiasbirds.in',
    evidentiaryRole:
      'Establishes national methodological benchmarks for converting complete citizen-science checklists into long-term abundance trends across Himalayan and wetland guilds.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 13. OPEN DATASET PAYLOAD & RFC-4180 CSV EXPORT BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the complete machine-readable JSON dataset payload for
 * `/api/himalayan-dispatch/datasets/avian-monograph-framework`.
 */
export function buildAvianMonographDatasetPayload() {
  return {
    schemaVersion: '1.0.0',
    generatedFrameworkId: 'kew-hd-monograph-04-the-sky-has-no-borders',
    evidentiaryStatus: SKY_NO_BORDERS_MONOGRAPH_SPEC.evidentiaryDisclaimer,
    counts: {
      volumes: SKY_NO_BORDERS_VOLUMES_18.length,
      chapters: SKY_NO_BORDERS_CHAPTERS_54.length,
      regionalChecklistBaselines: REGIONAL_CHECKLIST_RECONCILIATION_7.length,
      kewSelfAuditRows: KEW_AVIFAUNA_SELF_AUDIT_LEDGER.auditRows.length,
      flagshipSpecies: TRANS_REGIONAL_FLAGSHIP_BIRDS_8.length,
      waterbirdAlternativeHypotheses:
        WATERBIRD_CENSUS_PARADOX_SPEC.alternativeExplanations8.length,
      transboundaryRegions: FIVE_REGION_INVESTIGATION_MATRIX_5.length,
      threatProtocols: AVIAN_THREAT_PROTOCOLS_15.length,
      ordinarySentinelGroups: ORDINARY_BIRDS_SENTINELS_12.length,
      contemporaryOrnithologyShifts: CONTEMPORARY_ORNITHOLOGY_SHIFTS_12.length,
      stakeholderGroups: STAKEHOLDER_KNOWLEDGE_TRANSFER_11.length,
      observatoryModules: KEW_AVIAN_INTELLIGENCE_OBSERVATORY_12.length,
      foundationalReferences: SKY_NO_BORDERS_FOUNDATIONAL_REFERENCES.length,
    },
    monographSpec: SKY_NO_BORDERS_MONOGRAPH_SPEC,
    regionalChecklistReconciliation: {
      methodologicalWarning: REGIONAL_CHECKLIST_METHODOLOGICAL_WARNING,
      rows: [...REGIONAL_CHECKLIST_RECONCILIATION_7],
    },
    kewAvifaunaSelfAuditLedger: KEW_AVIFAUNA_SELF_AUDIT_LEDGER,
    transRegionalFlagshipBirds: TRANS_REGIONAL_FLAGSHIP_BIRDS_8,
    waterbirdCensusParadox: WATERBIRD_CENSUS_PARADOX_SPEC,
    fiveRegionInvestigationMatrix: FIVE_REGION_INVESTIGATION_MATRIX_5,
    avianThreatProtocols: AVIAN_THREAT_PROTOCOLS_15,
    ordinaryBirdsSentinels: {
      shiftingBaselineNote: ORDINARY_BIRDS_SHIFTING_BASELINE_NOTE,
      groups: [...ORDINARY_BIRDS_SENTINELS_12],
    },
    contemporaryOrnithologyShifts: CONTEMPORARY_ORNITHOLOGY_SHIFTS_12,
    stakeholderKnowledgeTransfer: STAKEHOLDER_KNOWLEDGE_TRANSFER_11,
    volumes: SKY_NO_BORDERS_VOLUMES_18,
    chapters: SKY_NO_BORDERS_CHAPTERS_54,
    kewAvianIntelligenceObservatory: KEW_AVIAN_INTELLIGENCE_OBSERVATORY_12,
    foundationalReferences: SKY_NO_BORDERS_FOUNDATIONAL_REFERENCES,
  };
}

function escapeAvianCsvCell(value: string | number): string {
  const str = String(value ?? '');
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Build a machine-readable RFC-4180 CSV export covering all 54 chapter protocols,
 * 8 flagship species, 15 threat protocols, 12 everyday sentinel bird groups, and
 * 12 KEW Avian Intelligence Observatory modules for
 * `/api/himalayan-dispatch/datasets/avian-monograph-framework?format=csv`.
 */
export function buildAvianMonographCsv(): string {
  const headers = [
    'record_type',
    'code',
    'slug_or_id',
    'parent_group',
    'title_or_name',
    'status_or_guild',
    'primary_deliverable_or_metric',
    'caveat_or_standard',
    'canonical_url',
  ];

  const rows: string[][] = [headers];

  for (const ch of SKY_NO_BORDERS_CHAPTERS_54) {
    rows.push([
      'chapter',
      ch.code,
      ch.slug,
      `Volume ${ch.volumeRoman}: ${ch.volumeTitle}`,
      ch.title,
      ch.researchStatus,
      ch.deliverable,
      ch.methodologicalCaveat,
      `${SKY_NO_BORDERS_MONOGRAPH_SPEC.canonicalMonographPath}/chapters/${ch.slug}`,
    ]);
  }

  for (const bird of TRANS_REGIONAL_FLAGSHIP_BIRDS_8) {
    rows.push([
      'flagship_species',
      bird.id,
      bird.scientificName,
      bird.regionsConnected.join(' | '),
      `${bird.commonName} (${bird.scientificName})`,
      `${bird.ecologicalGuild} · ${bird.iucnGlobalStatus}`,
      bird.indicatorRole,
      bird.primaryThreats.join('; '),
      SKY_NO_BORDERS_MONOGRAPH_SPEC.kewObservatoryPath,
    ]);
  }

  for (const thr of AVIAN_THREAT_PROTOCOLS_15) {
    rows.push([
      'threat_protocol',
      thr.code,
      thr.code.toLowerCase(),
      thr.affectedGuilds,
      thr.threat,
      'Field Threat Investigation Protocol',
      thr.measurableFieldMetric,
      thr.scientificInvestigation,
      thr.kewCrossModuleHref,
    ]);
  }

  for (const sen of ORDINARY_BIRDS_SENTINELS_12) {
    rows.push([
      'ordinary_sentinel_group',
      sen.code,
      sen.code.toLowerCase(),
      sen.representativeTaxa,
      sen.group,
      sen.localEcologicalNiche,
      sen.standardizedMonitoringMethod,
      sen.hypothesizedDriversOfChange,
      SKY_NO_BORDERS_MONOGRAPH_SPEC.kewObservatoryPath,
    ]);
  }

  for (const mod of KEW_AVIAN_INTELLIGENCE_OBSERVATORY_12) {
    rows.push([
      'observatory_module',
      mod.code,
      mod.code.toLowerCase(),
      mod.connectedKewSurfaceLabel,
      mod.title,
      mod.currentStatus,
      mod.operationalFunction,
      mod.dataStandard,
      mod.connectedKewSurfaceHref,
    ]);
  }

  return rows.map((row) => row.map(escapeAvianCsvCell).join(',')).join('\r\n');
}
