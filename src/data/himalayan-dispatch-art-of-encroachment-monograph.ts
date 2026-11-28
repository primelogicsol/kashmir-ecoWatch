// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 11 & DISPATCH 06 MASTER FORENSIC ARCHITECTURE
// "THE ART OF ENCROACHMENT: HOW DAL LAKE IS BEING TURNED INTO REAL ESTATE:
//  A HISTORICAL INVESTIGATION INTO LAND APPROPRIATION, ADMINISTRATIVE
//  COMPLICITY AND THE DISAPPEARING WATERS OF KASHMIR"
//
// Special Historical, Geospatial, Legal & Institutional Investigation
// Proposed 15-Volume, 100-Chapter Research Dossier (1859–2026)
// + Permanent KEW Companion: Dal Lake Encroachment & Administrative Accountability Observatory
//
// Legal, Methodological & Evidentiary Guardrails:
// 1. Presumption of innocence applies strictly to all individuals identified as
//    accused in J&K Anti-Corruption Bureau FIR No. 48/2015 (charge sheet filed
//    December 2020); ultimate judicial outcomes have not been established here.
// 2. Traditional lake-dwelling communities (Hanjis / Mirbahris) and historical
//    floating-garden livelihoods are rigorously differentiated from unauthorized
//    commercial, speculative, and public-sector land conversion.
// 3. Equal methodological scrutiny applies to government restoration figures
//    (>20.3 km²) and Kashmir EcoWatch's published contemporary estimate (13.95 km²).
// 4. Independent multi-temporal satellite processing through November 2026 has
//    not yet been completed; CAG Report No. 4 of 2025 tables were examined via
//    extracted official text after PDF screenshot retrieval failed.
// ─────────────────────────────────────────────────────────────────────────────

export type EncroachmentVolumeRoman =
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
  | 'XV';

export interface EncroachmentHeroStat {
  value: string;
  label: string;
}

export interface EncroachmentPublicationTier {
  level: string;
  title: string;
  detail: string;
  href: string;
  ctaLabel: string;
}

export interface EncroachmentMasterSpecificationRow {
  component: string;
  target: string;
}

export interface HistoricalOpenWaterObservation {
  year: number;
  totalLakeExtent: string;
  totalLakeExtentKm2: number;
  openWater: string;
  openWaterKm2: number;
  builtUpLand: string;
  builtUpLandKm2: number;
  analyticalNote: string;
}

export type HistoricalOpenWaterSeriesCollection =
  ReadonlyArray<HistoricalOpenWaterObservation> & {
    readonly roundedHeadlineComparison: {
      extent1859Km2: number;
      extent1859Ha: number;
      extent2013Km2: number;
      extent2013Ha: number;
      geographicalLossHa: number;
      geographicalLossKanalsApprox: number;
      percentageReduction: string;
      primarySource: string;
    };
    readonly preciseHistoricalSummary: {
      totalGeographicalLossPercent1859To2013: string;
      totalGeographicalLossHa1859To2013: number;
      openWaterLossPercent1859To2013: string;
      openWaterLossHa1859To2013: number;
      openWaterLossPercent1903To2013: string;
      openWaterLossHa1903To2013: number;
      builtUpGrowthMultiplier1859To2013: string;
      builtUpHa1859: number;
      builtUpHa2013: number;
      internalTransformationThesis: string;
    };
    readonly methodologicalNote: string;
  };

export interface ConflictEraIntervalRow {
  period: string;
  openWaterChange: string;
  openWaterChangeHa: number;
  builtUpChange: string;
  builtUpChangeHa: number;
  contextualNote: string;
}

export type ConflictEraIntervalsCollection =
  ReadonlyArray<ConflictEraIntervalRow> & {
    readonly focusInterval1992To2001: {
      openWater1992Km2: number;
      openWater2001Km2: number;
      netOpenWaterReductionHa: number;
      openWaterReductionPercent: string;
      floatingGardens1992Km2: number;
      floatingGardens2001Km2: number;
      floatingGardensExpansionHa: number;
      floatingGardensExpansionPercentApprox: string;
    };
    readonly causalGuardrailNote: string;
  };

export interface HistoricalGovernanceChronologyRow {
  id: string;
  period: string;
  principalInvestigativeFocus: string;
  keyInstitutionalOrLegalMarker: string;
}

export interface AcbAccusedOfficialRow {
  name: string;
  positionAtRelevantTime: string;
  legalStatusNote: string;
}

export interface AcbAccusedBeneficiaryRow {
  name: string;
  alternateName?: string;
  reportedLocality: string;
  legalStatusNote: string;
}

export interface AccountabilityChainStageRow {
  stageNumber: number;
  accountabilityStage: string;
  evidenceRequired: string;
  diagnosticSignificance: string;
}

export interface AcbAndJudicialAccountabilitySpec {
  firNumber: string;
  chargeSheetFilingDate: string;
  originatingHighCourtOrderDate: string;
  officialSourceUrl: string;
  fir48Of2015Summary: string;
  accusedOfficials2: AcbAccusedOfficialRow[];
  accusedBeneficiaries4: AcbAccusedBeneficiaryRow[];
  presumptionOfInnocenceNotice: string;
  march2009HighCourtInquiryNote: string;
  coreDiagnosticPrinciple: string;
  accountabilityStages8: AccountabilityChainStageRow[];
}

export interface LandUseTransitionClassRow {
  code: string;
  category: string;
  environmentalAndLegalSignificance: string;
  presumptionGuardrail: string;
}

export interface PublicInfrastructureObstructionRow {
  id: string;
  location: string;
  auditFinding: string;
  actorClassification: string;
}

export interface TributaryNarrowingCase {
  id: string;
  watercourseName: string;
  earlierReportedWidth: string;
  subsequentlyObservedWidth: string;
  localizedWidthReductionPercent: string;
  auditSource: string;
  measurementCaveat: string;
}

export interface CagLandUseBalanceRow {
  id: string;
  landUseCategory: string;
  area2007Ha: number;
  area2014Ha: number;
  area2020Ha: number;
  netChangeHa: number;
  area2007Label: string;
  area2014Label: string;
  area2020Label: string;
  netChangeLabel: string;
  isTotalRow?: boolean;
}

export interface CagLandUseBalanceSpec {
  authority: string;
  auditReference: string;
  consistentMappedExtentKm2: number;
  consistentMappedExtentHa: number;
  observationYears: [number, number, number];
  rows: CagLandUseBalanceRow[];
  cagPercentageCorrection: {
    lossRelativeToTotalMappedExtentPercent: string;
    share2007Percent: string;
    share2020Percent: string;
    lossRelativeTo2007OpenWaterCategoryPercent: string;
    mathematicalExplanation: string;
  };
  historicalTransformationAverages: {
    annualAverageHa: number;
    annualAverageLabel: string;
    monthlyAverageKanals: number;
    monthlyAverageLabel: string;
    dailyAverageSqMeters: number;
    dailyAverageLabel: string;
    totalReductionKanals: number;
    totalReductionKanalsLabel: string;
    totalReductionAcresApprox: number;
    totalReductionAcresLabel: string;
    nonExtrapolationWarning: string;
  };
  permanentConversion2007To2020: {
    combinedExpansionHa: number;
    combinedExpansionLabel: string;
    combinedExpansionKanalsApprox: number;
    croplandAndPlantationExpansionHa: number;
    builtUpLandExpansionHa: number;
    parcelMatrixRequirement: string;
  };
}

export interface EncroachmentLocalityLeadRow {
  id: string;
  locality: string;
  evidenceOrInvestigationLead: string;
  verificationStatus: string;
}

export interface LakeBasinDossierRow {
  id: string;
  basinOrWaterway: string;
  principalInvestigation: string;
  parcelQuantificationStatus: string;
}

export interface EnforcementDisruptionEpisodeRow {
  id: string;
  period: string;
  investigation: string;
  historicalContextAndMethod: string;
}

export interface SurveillanceComponentRow {
  component: string;
  target: string;
  initiallyAchieved: string;
  achievementPercentLabel: string;
}

export interface SurveillanceAndSpaAuditSpec {
  flood2014RecordLoss: {
    rtiDisclosureDate: string;
    reportingOutlet: string;
    lostRecordsSpan: string;
    lostRecordsPeriod: string;
    postFloodRemovalsCount: number;
    postFloodRemovalsPeriod: string;
    reconstructionPathways: string[];
    evidentiaryGuardrail: string;
  };
  cctvSurveillanceAudit: {
    proposalDate: string;
    fundingReleasedCrore: number;
    fundingPeriod: string;
    components4: SurveillanceComponentRow[];
    cagDeficiencySummary: string;
    subsequentGovernmentResponse: string;
  };
  spa356CroreAcquisitionAudit: {
    approvalDate: string;
    approvedOutlayCrore: number;
    intendedCompletionDate: string;
    auditCutOffDate: string;
    landAcquiredKanals: number;
    landTargetKanals: number;
    landAchievementPercent: string;
    landRemainingKanals: number;
    landAcquiredHectaresApprox: number;
    structuresAcquired: number;
    structuresTarget: number;
    structuresAchievementPercent: string;
    structuresRemaining: number;
    expenditureByDec2019Crore: number;
    centralFundingUnreleasedCrore: number;
    unreclaimedDredgingFinding: string;
  };
  illustrativeValuationBenchmark: {
    hypotheticalAreaKanals: number;
    hypotheticalValuePerKanalLakh: number;
    illustrativeAggregateValueCrore: number;
    equivalentAreaHa: number;
    disclaimer: string;
  };
  illustrativeRecoveryBenchmark: {
    hypotheticalRestoredAreaHa: number;
    recoveredWaterAreaKm2: string;
    equivalentKanals: number;
    shareOfCag2007To2020LossPercent: string;
    equivalentAcres: number;
    disclaimer: string;
  };
}

export interface EnforcementMetricReformRow {
  code: string;
  conventionalEnforcementMetric: string;
  scientificallyMeaningfulOutcome: string;
  verificationMethod: string;
}

export interface Conflicting2026AreaEstimateRow {
  id: string;
  source: string;
  observationPeriod: string;
  reportedArea: string;
  reportedAreaKm2Numeric: number;
  category: string;
  reconciliationNotes: string;
}

export type Conflicting2026AreaEstimatesCollection =
  ReadonlyArray<Conflicting2026AreaEstimateRow> & {
    readonly governmentVegetationClearanceKm2Approx: number;
    readonly govtVsKewDiscrepancyKm2: number;
    readonly govtVsKewDiscrepancyHa: number;
    readonly contemporaryReportingLeads2026: ReadonlyArray<{
      date: string;
      source: string;
      reportedFinding: string;
    }>;
    readonly kewSelfVerificationMandate: string;
  };

export interface SatelliteReconstructionEpochRow {
  code: string;
  period: string;
  principalDataSource: string;
  investigation: string;
}

export interface ScientificLandCoverClassRow {
  code:
    | 'OW'
    | 'SV'
    | 'FV'
    | 'EV'
    | 'FG'
    | 'CL'
    | 'AG'
    | 'PL'
    | 'RB'
    | 'CB'
    | 'GI'
    | 'HB'
    | 'CH'
    | 'SL'
    | 'UL';
  landCoverClass: string;
  reversibilityAndForensicRole: string;
}

export interface ParcelAccountabilityFieldRow {
  fieldNumber: number;
  registryField: string;
  requiredInformation: string;
  publicDisclosureRule: string;
}

export interface AdministrativeResponsibilityRow {
  code: string;
  institution: string;
  principalResponsibilityToInvestigate: string;
}

export interface CommunityDifferentiationRow {
  code: string;
  category: string;
  appropriateApproach: string;
}

export interface LakesideContradictionRow {
  code: string;
  historicalInvestigation: string;
  centralContradiction: string;
  canonicalDispatchHref: string;
}

export interface ForensicSatelliteProtocolSpec {
  satelliteEpochs10: SatelliteReconstructionEpochRow[];
  landCoverClasses15: ScientificLandCoverClassRow[];
  geospatialAnalyticalMethods8: string[];
  seasonalNormalizationRule: string;
  parcelRegistryFields17: ParcelAccountabilityFieldRow[];
  parcelRegistryGuardrail: string;
  responsibilityChain13: AdministrativeResponsibilityRow[];
  communityDifferentiation7: CommunityDifferentiationRow[];
  fiveLakesideContradictions5: LakesideContradictionRow[];
}

export interface EncroachmentMonographVolumeSpec {
  volumeNumber: number;
  volumeRoman: EncroachmentVolumeRoman;
  slug: string;
  volumeTitle: string;
  chapterRange: string;
  chapterCount: number;
  chapterCodes: string[];
  thematicMandate: string;
}

export interface EncroachmentMonographChapter {
  number: number;
  code: string; // '01' .. '100'
  slug: string;
  volumeNumber: number;
  volumeRoman: EncroachmentVolumeRoman;
  volumeTitle: string;
  title: string;
  researchStatus: 'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending';
  executiveSummary: [string, string];
  investigativeQuestions: string[];
  evidenceAndMethods: string[];
  deliverable: string;
  methodologicalCaveat: string;
}

export interface KewDalEncroachmentObservatoryModule {
  code: string;
  title: string;
  operationalFunction: string;
  dataStandard: string;
  currentStatus: string;
  connectedKewSurfaceLabel: string;
  connectedKewSurfaceHref: string;
}

export interface KewDalPublicIndicatorSpec {
  code: string;
  indicatorLabel: string;
  definitionAndUnit: string;
  currentVerificationStatus: string;
}

export interface PrimaryDocumentaryEvidenceSource {
  code: string;
  sourceLabel: string;
  authorityOrPublication: string;
  yearOrDate: string;
  url: string;
  investigativeValue: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MASTER MONOGRAPH IDENTITY & EDITORIAL SPECIFICATION
// ─────────────────────────────────────────────────────────────────────────────

export const ART_OF_ENCROACHMENT_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 11 · ENVIRONMENTAL CRIMINOLOGY & LAND GOVERNANCE',
  editionSlug: 'monograph-11-the-art-of-encroachment',
  companionDispatchSlug: 'the-art-of-encroachment',
  companionDispatchNumber: '06',
  canonicalMonographPath:
    '/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment',
  canonicalDispatchPath:
    '/himalayan-dispatch/issues/volume-01-issue-01/the-art-of-encroachment',
  kewObservatoryPath: '/earth-human-impact/aquatic-cryosphere/lake-encroachment',
  kewDalForensicSubpath:
    '/earth-human-impact/aquatic-cryosphere/lake-encroachment/dal-lake-forensic-observatory',
  datasetApiPath:
    '/api/himalayan-dispatch/datasets/dal-encroachment-monograph-framework',
  kicker:
    'SPECIAL HISTORICAL & GEOSPATIAL INVESTIGATION · ENVIRONMENTAL CRIMINOLOGY · LAND GOVERNANCE · POLITICAL ECOLOGY · REGULATORY ACCOUNTABILITY',
  title: 'The Art of Encroachment',
  subtitle:
    'How Dal Lake Is Being Turned into Real Estate: A Historical Investigation into Land Appropriation, Administrative Complicity and the Disappearing Waters of Kashmir',
  extendedSubtitle:
    'A 15-volume, 100-chapter historical, geospatial, legal and institutional research dossier examining 1859–2026 water-to-land conversion, conflict-era governance, official collusion inquiries, tributary obstruction, and net aquatic recovery across the Dal–Nigeen Lake System.',
  standfirst:
    'Dal Lake did not lose its geographical extent overnight. Its transformation occurred through decades of land-use changes, expanding settlements, floating gardens, construction, inadequate enforcement and institutional failures. How much of this transformation was unauthorized, how much was administratively tolerated, and how much can still be reversed?',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Geospatial Intelligence, Environmental Criminology, Land Governance and Public Accountability Desk',
  geographicScope: 'Dal–Nigeen Lake System · Srinagar · Western Himalayas',
  investigationPeriod: '1859–2026',
  statusBadge:
    'Proposed 15-Volume, 100-Chapter Historical, Geospatial & Accountability Repository (Independent Satellite Processing Pending)',
  heroStats: [
    { value: '15', label: 'Thematic volumes' },
    { value: '100', label: 'Research chapters' },
    { value: '−49.0%', label: '1859–2013 open-water loss' },
    { value: '−249.8 ha', label: '2007–2020 CAG water loss' },
  ] as EncroachmentHeroStat[],
  researchLimitationsDisclosure:
    'This investigation examined published historical remote-sensing reconstructions (1859–2013), extracted official land-use and audit tables from Comptroller and Auditor General (CAG) Report No. 4 of 2025 (whose PDF tables were analysed via extracted text after PDF screenshot retrieval failed), the Jammu & Kashmir Anti-Corruption Bureau December 2020 charge-sheet announcement in FIR No. 48/2015, Jammu & Kashmir High Court orders (2009–2024), the July 2025 LCMA Right to Information disclosure on pre-2014 enforcement records, and contemporary reporting through October 2026. Independent processing of historical and November 2026 satellite imagery has not yet been executed. Consequently, the exact current unobstructed water surface, the total area of legally established encroachment, parcel-level economic beneficiaries, and the present annual rate of permanent water-to-land conversion remain unverified pending reproducible geospatial reconstruction.',
  editorialPremise: [
    'Dal Lake confronts two distinct crises that public policy routinely conflates: the chemical and biological degradation of its water column, and the physical disappearance of the geographical space in which that water exists. Eutrophic water can be intercepted, treated, and flushed; once open water is progressively anchored, filled, consolidated into terrestrial plots, connected to municipal utilities, and transferred as residential or commercial real estate, ecological restoration becomes entangled in property claims, occupancy rights, political patronage, and fiscal compensation.',
    'Multi-decadal historical reconstructions reveal that Dal Lake has not merely shrunk inward from its outer shoreline; it has been hollowed out from within. While the mapped outer boundary stabilized near 24.04 km² after 1979 in peer-reviewed historical series, unobstructed open water contracted by 49.0% between 1859 (20.59 km²) and 2013 (10.50 km²)—and by 56.2% relative to 1903 (23.98 km²)—while built-up land inside the system expanded more than forty-fold from 5 hectares to 202 hectares.',
    'Within a fixed 2,460.5-hectare boundary audited by the Comptroller and Auditor General (Report No. 4 of 2025), open water and submerged vegetation declined by a further 249.8 hectares between 2007 (1,540.5 ha) and 2020 (1,290.7 ha)—a 10.15 percentage-point loss of total lake share that equals a 16.22% contraction of the aquatic category itself—while cropland/plantation (+55.9 ha) and built-up land (+28.2 ha) expanded by a combined 84.1 hectares (~1,663 kanals).',
    'Accountability cannot stop at private shoreline violators or turn generational lake-dwelling communities into scapegoats. Official records document criminal charge sheets alleging collusion between enforcement personnel and builders (subject to judicial determination and the presumption of innocence), fourteen years of pre-2014 LCMA enforcement records reported damaged in the 2014 floods, ₹356 crore acquisition programmes where acquired land remained undredged, and public-sector road and retaining-wall projects that narrowed vital feeder channels such as Chatterhama Nallah (60–70 ft to 3–4 ft) and Saidnar Nallah (100–150 ft to 25–30 ft).',
    'Replacing administrative activity tallies with scientific accountability requires measuring Net Aquatic Area Recovered (A_net_recovery = A_ecologically_restored − A_newly_converted) and applying identical evidentiary discipline to government restoration claims (>20.3 km²) and Kashmir EcoWatch’s own published contemporary estimate (13.95 km²).',
  ],
  netAquaticRecoveryFormula:
    'A_net_recovery = A_ecologically_restored − A_newly_converted',
  epilogueTitle:
    'The Lake That Could Disappear Without Its Boundary Disappearing',
  closingEpilogueQuestion:
    'Kashmir has spent decades asking how to save Dal Lake. Has it sufficiently investigated who has been turning its water into land?',
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (Dispatch 06)',
      title: 'Dispatch 06 — The Art of Encroachment',
      detail:
        'Published immediately after The Laboratory That Kashmir Lost in Vol. 01 / No. 01 of Himalayan Dispatch: synthesizes the 1859–2026 water-to-land record, the 2007–2020 CAG balance sheet, ACB FIR No. 48/2015, tributary narrowing, and the Net Aquatic Area Recovered standard.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-art-of-encroachment',
      ctaLabel: 'Read Dispatch 06',
    },
    {
      level: '02 · Complete 15-Volume Research Monograph',
      title: 'Monograph 11 — 15 Thematic Volumes & 100 Chapter Protocols',
      detail:
        'Internal and public research dossier spanning pre-modern cadastral baselines, conflict-era governance, LAWDA/LCMA regulatory history, official collusion inquiries, property economics, public-infrastructure obstructions, satellite/cadastral forensics, and aquatic commons recovery.',
      href: '/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment',
      ctaLabel: 'Open Monograph 11',
    },
    {
      level: '03 · Permanent KEW Forensic Companion',
      title: 'Dal Lake Encroachment & Administrative Accountability Observatory',
      detail:
        'Twelve permanent geospatial, legal, cadastral, and hydrological accountability modules integrated into KEW’s Lake Encroachment Observatory (/earth-human-impact/aquatic-cryosphere/lake-encroachment/dal-lake-forensic-observatory) governed by seven dated public indicators.',
      href: '/earth-human-impact/aquatic-cryosphere/lake-encroachment/dal-lake-forensic-observatory',
      ctaLabel: 'Open Dal Forensic Observatory',
    },
  ] as EncroachmentPublicationTier[],
  masterSpecifications: [
    {
      component: 'Publication classification',
      target:
        'Historical, geospatial, environmental-criminology, land-governance and regulatory-accountability monograph',
    },
    {
      component: 'Structural architecture',
      target:
        '15 thematic volumes (Volumes I–XV) · 100 structured research chapter protocols (Chapters 01–100)',
    },
    {
      component: 'Temporal & geographical scope',
      target:
        '1859–2026 · Dal–Nigeen Lake System, feeder tributaries, internal canals & foreshore wards, Srinagar',
    },
    {
      component: 'Historical & audit baselines reconciled',
      target:
        '9-epoch historical series (1859–2013), CAG/EE&RSD 2,460.5 ha balance sheet (2007–2020), and 4 contemporary area estimates (2013–2026)',
    },
    {
      component: 'Forensic remote-sensing taxonomy',
      target:
        '10 multi-sensor imagery epochs (Survey sheets & CORONA to Sentinel-1/2 & Landsat 9) across 15 land-cover classes (OW–UL)',
    },
    {
      component: 'Parcel & institutional accountability architecture',
      target:
        '17-field Parcel Accountability Registry paired with a 13-institution Administrative Responsibility Chain and 8 accountability stages',
    },
    {
      component: 'Social & legal safeguards',
      target:
        '7-tier community differentiation protecting generational lake dwellers + strict presumption of innocence for accused individuals',
    },
    {
      component: 'Permanent KEW observatory integration',
      target:
        'Dal Lake Encroachment & Administrative Accountability Observatory (12 modules · 7 dated public indicators)',
    },
  ] as EncroachmentMasterSpecificationRow[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. PARTS II–V — 1859–2013 OPEN-WATER SERIES, CONFLICT INTERVALS & CHRONOLOGY
// ─────────────────────────────────────────────────────────────────────────────

const HISTORICAL_OPEN_WATER_ROWS: HistoricalOpenWaterObservation[] = [
  {
    year: 1859,
    totalLakeExtent: '31.84 km²',
    totalLakeExtentKm2: 31.84,
    openWater: '20.59 km²',
    openWaterKm2: 20.59,
    builtUpLand: '0.05 km²',
    builtUpLandKm2: 0.05,
    analyticalNote:
      'Mid-nineteenth-century trigonometrical survey baseline prior to modern urban embankment expansion; built-up footprint ~5 hectares.',
  },
  {
    year: 1903,
    totalLakeExtent: '31.64 km²',
    totalLakeExtentKm2: 31.64,
    openWater: '23.98 km²',
    openWaterKm2: 23.98,
    builtUpLand: '0.06 km²',
    builtUpLandKm2: 0.06,
    analyticalNote:
      'Colonial settlement mapping recording peak documented open-water surface (23.98 km²) and minimal terrestrial built-up footprint (~6 hectares).',
  },
  {
    year: 1962,
    totalLakeExtent: '27.82 km²',
    totalLakeExtentKm2: 27.82,
    openWater: '13.84 km²',
    openWaterKm2: 13.84,
    builtUpLand: '0.84 km²',
    builtUpLandKm2: 0.84,
    analyticalNote:
      'Substantial mid-twentieth-century shoreline contraction (−3.82 km² total extent vs. 1903) and steep open-water decline (−10.14 km²) alongside 14-fold built-up growth.',
  },
  {
    year: 1972,
    totalLakeExtent: '26.40 km²',
    totalLakeExtentKm2: 26.4,
    openWater: '13.19 km²',
    openWaterKm2: 13.19,
    builtUpLand: '0.68 km²',
    builtUpLandKm2: 0.68,
    analyticalNote:
      'Early satellite/topographic transition showing continued outer perimeter reclamation down to 26.40 km².',
  },
  {
    year: 1979,
    totalLakeExtent: '24.02 km²',
    totalLakeExtentKm2: 24.02,
    openWater: '12.41 km²',
    openWaterKm2: 12.41,
    builtUpLand: '0.80 km²',
    builtUpLandKm2: 0.8,
    analyticalNote:
      'Outer geographical boundary reaches ~24.02 km²—the approximate perimeter at which subsequent observations stabilize even as internal partitioning accelerates.',
  },
  {
    year: 1992,
    totalLakeExtent: '24.04 km²',
    totalLakeExtentKm2: 24.04,
    openWater: '13.10 km²',
    openWaterKm2: 13.1,
    builtUpLand: '1.83 km²',
    builtUpLandKm2: 1.83,
    analyticalNote:
      'Outer extent virtually unchanged (24.04 km²), while internal built-up area more than doubles relative to 1979 (+103 ha to 183 ha).',
  },
  {
    year: 2001,
    totalLakeExtent: '24.04 km²',
    totalLakeExtentKm2: 24.04,
    openWater: '10.68 km²',
    openWaterKm2: 10.68,
    builtUpLand: '2.10 km²',
    builtUpLandKm2: 2.1,
    analyticalNote:
      'Open water drops by 242 hectares (−18.5% relative to 1992) as floating gardens expand by 116 ha (1.36 km² to 2.52 km²) and built-up land reaches 210 ha.',
  },
  {
    year: 2010,
    totalLakeExtent: '24.04 km²',
    totalLakeExtentKm2: 24.04,
    openWater: '8.91 km²',
    openWaterKm2: 8.91,
    builtUpLand: '2.03 km²',
    builtUpLandKm2: 2.03,
    analyticalNote:
      'Lowest open-water observation in the historical series (8.91 km², barely 37.1% of mapped lake area) despite an unchanged 24.04 km² outer perimeter.',
  },
  {
    year: 2013,
    totalLakeExtent: '24.04 km²',
    totalLakeExtentKm2: 24.04,
    openWater: '10.50 km²',
    openWaterKm2: 10.5,
    builtUpLand: '2.02 km²',
    builtUpLandKm2: 2.02,
    analyticalNote:
      'Terminal year of the 1859–2013 series: 24.5% total geographical loss (780 ha), 49.0% open-water loss (1,009 ha), and 40.4× built-up expansion (202 ha).',
  },
];

export const HISTORICAL_OPEN_WATER_SERIES_9: HistoricalOpenWaterSeriesCollection =
  Object.assign(HISTORICAL_OPEN_WATER_ROWS, {
    roundedHeadlineComparison: {
      extent1859Km2: 31,
      extent1859Ha: 3100,
      extent2013Km2: 24,
      extent2013Ha: 2400,
      geographicalLossHa: 700,
      geographicalLossKanalsApprox: 13838,
      percentageReduction: '22.6%',
      primarySource: 'Rashid et al., 2017 (Limnologica / ScienceDirect)',
    },
    preciseHistoricalSummary: {
      totalGeographicalLossPercent1859To2013: '24.5%',
      totalGeographicalLossHa1859To2013: 780,
      openWaterLossPercent1859To2013: '49.0%',
      openWaterLossHa1859To2013: 1009,
      openWaterLossPercent1903To2013: '56.2%',
      openWaterLossHa1903To2013: 1348,
      builtUpGrowthMultiplier1859To2013: '40.4×',
      builtUpHa1859: 5,
      builtUpHa2013: 202,
      internalTransformationThesis:
        'Mapped outer geographical extent remained almost unchanged after 1979 (~24.02–24.04 km²), while internal open water contracted sharply in favour of floating gardens, emergent vegetation, and consolidated built-up land—proving Dal Lake was transforming from within as well as shrinking from its edges.',
    },
    methodologicalNote:
      'Discrete historical observations reconstructed by Rashid et al. (2017) and reproduced in Frontiers in Environmental Science (2019), not continuous annual measurements. Differences in historical cartography, sensor spatial resolution, macrophyte phenology, and seasonal lake stage must be controlled before inter-epoch comparison.',
  });

const CONFLICT_ERA_INTERVAL_ROWS: ConflictEraIntervalRow[] = [
  {
    period: '1979–1992',
    openWaterChange: '+69 ha',
    openWaterChangeHa: 69,
    builtUpChange: '+103 ha',
    builtUpChangeHa: 103,
    contextualNote:
      'Spans late pre-conflict planning years and early conflict onset; substantial built-up expansion (+103 ha, from 0.80 km² to 1.83 km²) accompanied by seasonal/classification open-water variation.',
  },
  {
    period: '1992–2001',
    openWaterChange: '−242 ha',
    openWaterChangeHa: -242,
    builtUpChange: '+27 ha',
    builtUpChangeHa: 27,
    contextualNote:
      'Open water fell 18.5% (13.10 km² to 10.68 km²) while mapped floating gardens rose from 1.36 km² to 2.52 km² (+116 ha, ~85% expansion) and built-up area reached 210 ha.',
  },
  {
    period: '2001–2010',
    openWaterChange: '−177 ha',
    openWaterChangeHa: -177,
    builtUpChange: '−7 ha',
    builtUpChangeHa: -7,
    contextualNote:
      'Continued internal open-water contraction during the first full decade of LAWDA operations and High Court PIL litigation, reaching the 8.91 km² historical low.',
  },
  {
    period: '2010–2013',
    openWaterChange: '+159 ha',
    openWaterChangeHa: 159,
    builtUpChange: '−1 ha',
    builtUpChangeHa: -1,
    contextualNote:
      'Partial open-water rebound (+159 ha to 10.50 km²) reflecting macrophyte clearance, hydrological stage differences, and selective enforcement prior to the 2014 floods.',
  },
];

export const CONFLICT_ERA_INTERVALS_4: ConflictEraIntervalsCollection =
  Object.assign(CONFLICT_ERA_INTERVAL_ROWS, {
    focusInterval1992To2001: {
      openWater1992Km2: 13.1,
      openWater2001Km2: 10.68,
      netOpenWaterReductionHa: 242,
      openWaterReductionPercent: '18.5%',
      floatingGardens1992Km2: 1.36,
      floatingGardens2001Km2: 2.52,
      floatingGardensExpansionHa: 116,
      floatingGardensExpansionPercentApprox: '85%',
    },
    causalGuardrailNote:
      'Anthropological scholarship by Mona Bhan and Nishita Trisal (Fluid Landscapes) documents diminished governmental and civic conservation attention between 1989 and 1996 alongside contested rehabilitation eligibility. However, available decadal remote-sensing intervals do not isolate 1989–1996 alone, and political conflict cannot automatically be treated as the sole cause without testing demographic growth, agricultural intensification, nutrient enrichment, hydrology, and policy design.',
  });

export const HISTORICAL_GOVERNANCE_CHRONOLOGY_12: HistoricalGovernanceChronologyRow[] =
  [
    {
      id: 'chron-01',
      period: '1859–1903',
      principalInvestigativeFocus:
        'Historical lake boundaries, traditional settlements and agricultural practices',
      keyInstitutionalOrLegalMarker:
        'Great Trigonometrical Survey sheets & Walter Lawrence colonial revenue settlements establishing customary water/radh rights.',
    },
    {
      id: 'chron-02',
      period: '1903–1962',
      principalInvestigativeFocus:
        'Expansion of Srinagar and transformation of the historical lakeshore',
      keyInstitutionalOrLegalMarker:
        'Boulevard road alignment, urban drainage re-routing, houseboat mooring rules, and loss of >10 km² of open water.',
    },
    {
      id: 'chron-03',
      period: '1962–1979',
      principalInvestigativeFocus:
        'Urban expansion, land reclamation and substantial geographical loss',
      keyInstitutionalOrLegalMarker:
        'Outer mapped lake boundary contracts from 27.82 km² to 24.02 km² amid peripheral land reclamation and foreshore engineering.',
    },
    {
      id: 'chron-04',
      period: '1980–1988',
      principalInvestigativeFocus:
        'Early conservation planning and construction restrictions',
      keyInstitutionalOrLegalMarker:
        'First reported government construction moratorium within Dal Lake (June 1986) and early international limnological master plans.',
    },
    {
      id: 'chron-05',
      period: '1989–1996',
      principalInvestigativeFocus:
        'Political conflict, administrative disruption and conservation continuity',
      keyInstitutionalOrLegalMarker:
        'Armed conflict onset, diminished civic/administrative conservation oversight, and floating-garden / settlement consolidation.',
    },
    {
      id: 'chron-06',
      period: '1997–2001',
      principalInvestigativeFocus:
        'Establishment of LAWDA, rehabilitation and enforcement',
      keyInstitutionalOrLegalMarker:
        'Creation of J&K Lakes and Waterways Development Authority (1997) to unify conservation, sewage engineering, and enforcement.',
    },
    {
      id: 'chron-07',
      period: '2002–2009',
      principalInvestigativeFocus:
        'Public-interest litigation, construction restrictions and allegations of official involvement',
      keyInstitutionalOrLegalMarker:
        'Sustained J&K High Court PIL oversight and March 2009 Divisional Commissioner inquiry report naming eight LAWDA officials.',
    },
    {
      id: 'chron-08',
      period: '2010–2014',
      principalInvestigativeFocus:
        'Continued development pressure and environmental monitoring',
      keyInstitutionalOrLegalMarker:
        'February 2012 approval of ₹356 crore Special Plan Assistance land/structure acquisition and relocation programme.',
    },
    {
      id: 'chron-09',
      period: '2014',
      principalInvestigativeFocus:
        'Flood disaster and destruction of enforcement records, according to LCMA',
      keyInstitutionalOrLegalMarker:
        'September 2014 Jhelum–Dal flood inundation; LCMA later disclosed via July 2025 RTI that 2000–September 2014 enforcement files were damaged.',
    },
    {
      id: 'chron-10',
      period: '2015–2019',
      principalInvestigativeFocus:
        'Judicial monitoring, anti-corruption investigations and surveillance projects',
      keyInstitutionalOrLegalMarker:
        'High Court directions (Oct 28, 2015) triggering ACB FIR No. 48/2015, December 2015 CCTV proposal, and 2016 unrest FIR disclosures.',
    },
    {
      id: 'chron-11',
      period: '2020–2021',
      principalInvestigativeFocus:
        'Illegal construction enforcement during pandemic restrictions',
      keyInstitutionalOrLegalMarker:
        'December 2020 ACB charge sheet in FIR No. 48/2015, lockdown-period enforcement scrutiny, and reorganization of LAWDA into LCMA.',
    },
    {
      id: 'chron-12',
      period: '2022–2026',
      principalInvestigativeFocus:
        'Restoration claims, continuing demolition programmes and renewed audit scrutiny',
      keyInstitutionalOrLegalMarker:
        'CAG Report No. 4 of 2025, 632 reported LCMA demolitions (Oct 2024–Feb 2026), >20.3 km² restoration claims, and 2026 soil-filling allegations.',
    },
  ];

// ─────────────────────────────────────────────────────────────────────────────
// 3. PART VI — ACB FIR NO. 48/2015 & JUDICIAL ACCOUNTABILITY ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

export const ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC: AcbAndJudicialAccountabilitySpec =
  {
    firNumber: 'FIR No. 48/2015',
    chargeSheetFilingDate: 'December 2020',
    originatingHighCourtOrderDate: 'October 28, 2015',
    officialSourceUrl: 'https://jkacb.in/link.php?sno=214',
    fir48Of2015Summary:
      'In December 2020, the Jammu and Kashmir Anti-Corruption Bureau (ACB) filed a charge sheet in FIR No. 48/2015 concerning alleged illegal construction around Dal Lake. The criminal investigation originated from directions issued by the Jammu and Kashmir High Court on October 28, 2015 following inspection reports submitted by court-appointed commissioners. The ACB alleged that LAWDA enforcement personnel had facilitated construction undertaken without statutory permission or in violation of sanctioned building plans and master-plan provisions, explicitly alleging collusion between enforcement personnel and private violators.',
    accusedOfficials2: [
      {
        name: 'Manzoor Ahmad Bhat',
        positionAtRelevantTime: 'LAWDA Enforcement Wing supervisor',
        legalStatusNote:
          'Identified as accused in the December 2020 ACB charge sheet (FIR No. 48/2015); ultimate judicial outcome not established in this investigation; presumption of innocence applies.',
      },
      {
        name: 'Parvaiz Ahmad Mir',
        positionAtRelevantTime: 'LAWDA watcher',
        legalStatusNote:
          'Identified as accused in the December 2020 ACB charge sheet (FIR No. 48/2015); ultimate judicial outcome not established in this investigation; presumption of innocence applies.',
      },
    ],
    accusedBeneficiaries4: [
      {
        name: 'Mohammad Tariq Reshi',
        reportedLocality: 'Ishber, Nishat',
        legalStatusNote:
          'Identified as accused beneficiary in the December 2020 ACB charge sheet (FIR No. 48/2015); ultimate judicial outcome not established in this investigation; presumption of innocence applies.',
      },
      {
        name: 'Tahir Mir',
        alternateName: 'Tahir Mir / Tahir Gul',
        reportedLocality: 'Nigeen',
        legalStatusNote:
          'Identified in the December 2020 ACB charge sheet (also identified as Tahir Gul) in FIR No. 48/2015; ultimate judicial outcome not established in this investigation; presumption of innocence applies.',
      },
      {
        name: 'Ghulam Mohammad Mir',
        reportedLocality: 'Nigeen',
        legalStatusNote:
          'Identified as accused beneficiary in the December 2020 ACB charge sheet (FIR No. 48/2015); ultimate judicial outcome not established in this investigation; presumption of innocence applies.',
      },
      {
        name: 'Mohammad Maqbool Beigh',
        reportedLocality: 'Beigh Mohalla, Nigeen',
        legalStatusNote:
          'Identified as accused beneficiary in the December 2020 ACB charge sheet (FIR No. 48/2015); ultimate judicial outcome not established in this investigation; presumption of innocence applies.',
      },
    ],
    presumptionOfInnocenceNotice:
      'All six individuals listed above were identified as accused in official Anti-Corruption Bureau charge-sheet proceedings in FIR No. 48/2015. An FIR or charge sheet is a prosecutorial accusation, not a judicial conviction. Their ultimate trial dispositions have not been established in this investigation, the presumption of innocence applies in full to each named person, and individual criminal proceedings cannot be extrapolated to indict the entire workforce of LAWDA/LCMA without case-specific proof.',
    march2009HighCourtInquiryNote:
      'According to the Centre for Science and Environment (CSE) litigation archive on Dal Lake, in March 2009 the Jammu and Kashmir High Court acted upon an inquiry report submitted by the Divisional Commissioner that named eight LAWDA officials in connection with alleged unauthorized construction in prohibited zones. Subsequent High Court orders also recorded judicial concern regarding enforcement staff failing to halt ongoing construction brought directly to their notice.',
    coreDiagnosticPrinciple:
      'An allegation, an FIR, a departmental inquiry, and a demolition notice are administrative or legal events; none automatically establishes either final criminal guilt or the physical recovery of Dal Lake’s lost ecological space.',
    accountabilityStages8: [
      {
        stageNumber: 1,
        accountabilityStage: 'Identification of unauthorized construction',
        evidenceRequired: 'Original inspection report',
        diagnosticSignificance:
          'Establishes timestamp, parcel coordinates, stage of plinth/filling, and whether field watchers detected activity before structural completion.',
      },
      {
        stageNumber: 2,
        accountabilityStage: 'Identification of responsible officials',
        evidenceRequired: 'Enforcement jurisdiction and duty records',
        diagnosticSignificance:
          'Maps beat-level supervisory responsibility across LCMA ward rosters, revenue circles, and municipal limits at the time of violation.',
      },
      {
        stageNumber: 3,
        accountabilityStage: 'Departmental investigation',
        evidenceRequired: 'Inquiry findings',
        diagnosticSignificance:
          'Determines whether internal administrative scrutiny substantiated negligence, unauthorized exemption, or procedural compliance.',
      },
      {
        stageNumber: 4,
        accountabilityStage: 'Criminal investigation',
        evidenceRequired: 'FIR and charge sheet',
        diagnosticSignificance:
          'Documents police or Anti-Corruption Bureau investigation into alleged statutory offences or corrupt facilitation.',
      },
      {
        stageNumber: 5,
        accountabilityStage: 'Prosecution',
        evidenceRequired: 'Complete court records',
        diagnosticSignificance:
          'Tracks framing of charges, witness testimony, evidentiary exhibits, and trial continuity before special anti-corruption or magistrate courts.',
      },
      {
        stageNumber: 6,
        accountabilityStage: 'Disciplinary action',
        evidenceRequired:
          'Suspension, dismissal, exoneration or other orders',
        diagnosticSignificance:
          'Verifies whether service-rule outcomes followed inquiry reports (such as the March 2009 eight-official inquiry) or lapsed without final orders.',
      },
      {
        stageNumber: 7,
        accountabilityStage: 'Judicial outcome',
        evidenceRequired: 'Conviction, acquittal or pending proceedings',
        diagnosticSignificance:
          'Distinguishes legally proven misconduct from unproven allegations and records binding appellate remedies.',
      },
      {
        stageNumber: 8,
        accountabilityStage: 'Ecological recovery',
        evidenceRequired: 'Verified restoration of affected land or water',
        diagnosticSignificance:
          'Tests whether legal or administrative action actually removed earthfill/plinths and restored hydrological circulation to the affected parcel.',
      },
    ],
  };

// ─────────────────────────────────────────────────────────────────────────────
// 4. PARTS VII & VIII — LAND-USE TRANSITIONS, PUBLIC ACTORS & TRIBUTARY NARROWING
// ─────────────────────────────────────────────────────────────────────────────

export const LAND_USE_TRANSITION_CLASSES_9: LandUseTransitionClassRow[] = [
  {
    code: 'LUT-01',
    category: 'Traditional floating gardens',
    environmentalAndLegalSignificance:
      'Historical agricultural livelihood requiring ecological and legal assessment',
    presumptionGuardrail:
      'Customary radh cultivation represents generational agrarian heritage; forensic analysis must assess anchoring and nutrient dynamics without equating historical cultivators with land speculators.',
  },
  {
    code: 'LUT-02',
    category: 'Unauthorized land reclamation',
    environmentalAndLegalSignificance:
      'Potential permanent conversion of water into land',
    presumptionGuardrail:
      'Earth-tipping, rubble infilling, and progressive raising of submerged beds above high-water stage create irreversible terrestrial plots unless excavated.',
  },
  {
    code: 'LUT-03',
    category: 'Residential construction',
    environmentalAndLegalSignificance:
      'Requires examination of title, permission and statutory compliance',
    presumptionGuardrail:
      'Must differentiate pre-moratorium ancestral homes and permitted repairs from unpermitted multi-storey concrete construction in prohibited zones.',
  },
  {
    code: 'LUT-04',
    category: 'Commercial development',
    environmentalAndLegalSignificance:
      'Requires investigation of permissions and economic beneficiaries',
    presumptionGuardrail:
      'Hotels, commercial complexes, banquet venues, and tourist guesthouses carry high rent-seeking incentives demanding beneficial-ownership and sanction audits.',
  },
  {
    code: 'LUT-05',
    category: 'Government infrastructure',
    environmentalAndLegalSignificance:
      'Requires examination of environmental compatibility and public authorization',
    presumptionGuardrail:
      'Public roads, bunds, retaining walls, culverts, and departmental compounds alter basin hydrology and must face the same environmental standards applied to citizens.',
  },
  {
    code: 'LUT-06',
    category: 'Shoreline modification',
    environmentalAndLegalSignificance:
      'Can alter hydrological and ecological connectivity',
    presumptionGuardrail:
      'Concrete revetments, ghats, and foreshore embankments sever littoral reedbed nurseries and littoral groundwater exchange.',
  },
  {
    code: 'LUT-07',
    category: 'Channel obstruction',
    environmentalAndLegalSignificance:
      'Can impair circulation, drainage and flood management',
    presumptionGuardrail:
      'Culvert undersizing, encroachments into nallahs, and stagnant dead-end canals induce localized anoxia and backwater flooding.',
  },
  {
    code: 'LUT-08',
    category: 'Natural vegetation growth',
    environmentalAndLegalSignificance:
      'Ecological process, not automatically illegal encroachment',
    presumptionGuardrail:
      'Macrophyte expansion reflects nutrient loading, residence time, and seasonal phenology; spectral shrinkage of open water due to weeds is not equivalent to illegal land theft.',
  },
  {
    code: 'LUT-09',
    category: 'Sediment accumulation',
    environmentalAndLegalSignificance:
      'Geomorphological process requiring source and transport analysis',
    presumptionGuardrail:
      'Catchment erosion in Dachigam–Telbal deposits natural deltaic silt; only subsequent unauthorized occupation or bunding converts shoals into contested property.',
  },
];

export const PUBLIC_INFRASTRUCTURE_OBSTRUCTIONS_9: PublicInfrastructureObstructionRow[] =
  [
    {
      id: 'obs-01-chatterhama',
      location: 'Chatterhama',
      auditFinding: 'Watercourse narrowing and road-related obstruction',
      actorClassification:
        'Public road infrastructure & corridor encroachment documented in CAG audit (including R&B road-blockage observations).',
    },
    {
      id: 'obs-02-dfo-bagh',
      location: 'DFO Bagh',
      auditFinding: 'Road construction through drainage channels',
      actorClassification:
        'Public-sector road alignment obstructing natural catchment drainage pathways.',
    },
    {
      id: 'obs-03-tailbal-khawaja',
      location: 'Tailbal Nallah, Khawaja Colony',
      auditFinding:
        'Retaining-wall construction within the earlier channel alignment',
      actorClassification:
        'Engineered civil retaining structure constricting the active cross-section of Dal Lake’s primary northern inflow.',
    },
    {
      id: 'obs-04-azad-colony-batapora',
      location: 'Azad Colony, Batapora',
      auditFinding:
        'Unauthorized private construction affecting a watercourse',
      actorClassification:
        'Private catchment building encroaching upon feeder drainage corridor.',
    },
    {
      id: 'obs-05-bata-khul',
      location: 'Bata Khul',
      auditFinding: 'Land filling and waste deposition',
      actorClassification:
        'Solid-waste dumping and progressive earthfill choking feeder conveyance.',
    },
    {
      id: 'obs-06-saidpora',
      location: 'Saidpora',
      auditFinding: 'Unauthorized construction within the catchment',
      actorClassification:
        'Catchment-zone building activity altering runoff and sediment delivery.',
    },
    {
      id: 'obs-07-mirza-bagh',
      location: 'Mirza Bagh Colony',
      auditFinding: 'Encroachment affecting a lake tributary',
      actorClassification:
        'Residential/peri-urban encroachment narrowing tributary buffer.',
    },
    {
      id: 'obs-08-saidnar',
      location: 'Saidnar',
      auditFinding: 'Interventions reducing channel width',
      actorClassification:
        'Severe localized channel constriction documented in CAG feeder-stream audit.',
    },
    {
      id: 'obs-09-maloori-nallah',
      location: 'Maloori Nallah',
      auditFinding: 'Plantation within the drainage channel',
      actorClassification:
        'Vegetative/arboricultural planting inside active drainage cross-section impeding flow.',
    },
  ];

export const TRIBUTARY_NARROWING_CASES_2: TributaryNarrowingCase[] = [
  {
    id: 'trib-chatterhama-nallah',
    watercourseName: 'Chatterhama Nallah',
    earlierReportedWidth: '60–70 ft',
    subsequentlyObservedWidth: '3–4 ft',
    localizedWidthReductionPercent: '93–96%',
    auditSource:
      'Comptroller and Auditor General (CAG) Report No. 4 of 2025 (including documented R&B Department road-construction watercourse blockages at four locations)',
    measurementCaveat:
      'Reported localized cross-sectional width changes at audited inspection points, not uniform measurements across the entire stream length or direct volumetric discharge-capacity measurements.',
  },
  {
    id: 'trib-saidnar-nallah',
    watercourseName: 'Saidnar Nallah',
    earlierReportedWidth: '100–150 ft',
    subsequentlyObservedWidth: '25–30 ft',
    localizedWidthReductionPercent: '70–83%',
    auditSource:
      'Comptroller and Auditor General (CAG) Report No. 4 of 2025 hydrological feeder inspection findings',
    measurementCaveat:
      'Reported localized cross-sectional width changes at audited inspection points, not uniform measurements across the entire stream length or direct volumetric discharge-capacity measurements.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. PARTS IX & X — CAG / EE&RSD 2007–2020 LAND-USE BALANCE SHEET
// ─────────────────────────────────────────────────────────────────────────────

export const CAG_LAND_USE_BALANCE_2007_2020: CagLandUseBalanceSpec = {
  authority:
    'Department of Ecology, Environment and Remote Sensing (EE&RSD), reproduced in CAG Report No. 4 of 2025',
  auditReference: 'CAG Performance Audit Report No. 4 of 2025 (J&K)',
  consistentMappedExtentKm2: 24.605,
  consistentMappedExtentHa: 2460.5,
  observationYears: [2007, 2014, 2020],
  rows: [
    {
      id: 'cag-lu-01-open-water',
      landUseCategory: 'Open water and submerged vegetation',
      area2007Ha: 1540.5,
      area2014Ha: 1421.4,
      area2020Ha: 1290.7,
      netChangeHa: -249.8,
      area2007Label: '1,540.5 ha',
      area2014Label: '1,421.4 ha',
      area2020Label: '1,290.7 ha',
      netChangeLabel: '−249.8 ha',
    },
    {
      id: 'cag-lu-02-floating-veg',
      landUseCategory: 'Floating vegetation',
      area2007Ha: 526.2,
      area2014Ha: 636.6,
      area2020Ha: 679.6,
      netChangeHa: 153.4,
      area2007Label: '526.2 ha',
      area2014Label: '636.6 ha',
      area2020Label: '679.6 ha',
      netChangeLabel: '+153.4 ha',
    },
    {
      id: 'cag-lu-03-cropland-plantation',
      landUseCategory: 'Cropland and plantation',
      area2007Ha: 229.0,
      area2014Ha: 235.1,
      area2020Ha: 284.9,
      netChangeHa: 55.9,
      area2007Label: '229.0 ha',
      area2014Label: '235.1 ha',
      area2020Label: '284.9 ha',
      netChangeLabel: '+55.9 ha',
    },
    {
      id: 'cag-lu-04-built-up',
      landUseCategory: 'Built-up land',
      area2007Ha: 74.3,
      area2014Ha: 81.2,
      area2020Ha: 102.5,
      netChangeHa: 28.2,
      area2007Label: '74.3 ha',
      area2014Label: '81.2 ha',
      area2020Label: '102.5 ha',
      netChangeLabel: '+28.2 ha',
    },
    {
      id: 'cag-lu-05-floating-gardens',
      landUseCategory: 'Floating gardens',
      area2007Ha: 35.2,
      area2014Ha: 55.6,
      area2020Ha: 49.8,
      netChangeHa: 14.6,
      area2007Label: '35.2 ha',
      area2014Label: '55.6 ha',
      area2020Label: '49.8 ha',
      netChangeLabel: '+14.6 ha',
    },
    {
      id: 'cag-lu-06-houseboats-ghats',
      landUseCategory: 'Houseboats and shikara ghats',
      area2007Ha: 15.0,
      area2014Ha: 19.6,
      area2020Ha: 17.0,
      netChangeHa: 2.0,
      area2007Label: '15.0 ha',
      area2014Label: '19.6 ha',
      area2020Label: '17.0 ha',
      netChangeLabel: '+2.0 ha',
    },
    {
      id: 'cag-lu-07-parks-vacant',
      landUseCategory: 'Parks, grassland and vacant land',
      area2007Ha: 40.3,
      area2014Ha: 11.0,
      area2020Ha: 36.0,
      netChangeHa: -4.3,
      area2007Label: '40.3 ha',
      area2014Label: '11.0 ha',
      area2020Label: '36.0 ha',
      netChangeLabel: '−4.3 ha',
    },
    {
      id: 'cag-lu-08-total',
      landUseCategory: 'Total mapped area',
      area2007Ha: 2460.5,
      area2014Ha: 2460.5,
      area2020Ha: 2460.5,
      netChangeHa: 0,
      area2007Label: '2,460.5 ha',
      area2014Label: '2,460.5 ha',
      area2020Label: '2,460.5 ha',
      netChangeLabel: '0',
      isTotalRow: true,
    },
  ],
  cagPercentageCorrection: {
    lossRelativeToTotalMappedExtentPercent: '10.15%',
    share2007Percent: '62.61%',
    share2020Percent: '52.46%',
    lossRelativeTo2007OpenWaterCategoryPercent: '16.22%',
    mathematicalExplanation:
      'Media coverage in April 2026 widely cited a 10.15% decline in open water, which in the CAG table represents the 10.15 percentage-point drop in share of the entire 2,460.5 ha mapped polygon (from 62.61% in 2007 to 52.46% in 2020). Measured relative to the 2007 open-water and submerged-vegetation baseline itself (249.8 ha ÷ 1,540.5 ha), the category experienced a 16.22% contraction.',
  },
  historicalTransformationAverages: {
    annualAverageHa: 19.2,
    annualAverageLabel: '19.2 ha',
    monthlyAverageKanals: 31.6,
    monthlyAverageLabel: '31.6 kanals',
    dailyAverageSqMeters: 527,
    dailyAverageLabel: '527 m²',
    totalReductionKanals: 4938,
    totalReductionKanalsLabel: '4,938 kanals',
    totalReductionAcresApprox: 617,
    totalReductionAcresLabel: '617 acres',
    nonExtrapolationWarning:
      'These rates are arithmetic historical averages of net reduction in open water and submerged vegetation across the thirteen-year 2007–2020 audit interval (including +153.4 ha floating-vegetation growth). They are NOT measurements of daily illegal encroachment and must NOT be extrapolated as the current 2026 rate of permanent land appropriation.',
  },
  permanentConversion2007To2020: {
    combinedExpansionHa: 84.1,
    combinedExpansionLabel: '84.1 hectares',
    combinedExpansionKanalsApprox: 1663,
    croplandAndPlantationExpansionHa: 55.9,
    builtUpLandExpansionHa: 28.2,
    parcelMatrixRequirement:
      'Unlike floating vegetation, consolidated cropland/plantation (+55.9 ha) and built-up land (+28.2 ha) represent physically durable terrestrial expansion (~1,663 kanals combined). Determining what fraction originated directly from open water versus vacant land or floating gardens—and which parcels lacked legal sanction—requires a pixel- and parcel-level transition matrix.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. PARTS XI–XVI & XXIII — LOCALITIES, BASINS, DISRUPTIONS & AUDIT LEDGERS
// ─────────────────────────────────────────────────────────────────────────────

export const ENCROACHMENT_LOCALITIES_9: EncroachmentLocalityLeadRow[] = [
  {
    id: 'loc-01-mir-behri',
    locality: 'Mir Behri',
    evidenceOrInvestigationLead: 'Historical imagery examined by CAG',
    verificationStatus:
      'Indicative 2004–2022 CAG imagery investigation locality; requires parcel-by-parcel separation of generational island dwellings from new unauthorized reclamation.',
  },
  {
    id: 'loc-02-lati-mohalla',
    locality: 'Lati Mohalla',
    evidenceOrInvestigationLead: 'Gradual encroachment identified by CAG',
    verificationStatus:
      'Indicative CAG historical-imagery lead; parcel boundaries and sanction histories require cadastral verification.',
  },
  {
    id: 'loc-03-nandapora',
    locality: 'Nandapora',
    evidenceOrInvestigationLead:
      'Historical land-use transformation identified by CAG',
    verificationStatus:
      'Indicative CAG multi-temporal land-conversion cluster; requires revenue khasra and permit cross-check.',
  },
  {
    id: 'loc-04-ishber',
    locality: 'Ishber',
    evidenceOrInvestigationLead: 'Named in anti-corruption proceedings',
    verificationStatus:
      'Locality (Ishber, Nishat) referenced in December 2020 ACB FIR No. 48/2015 charge sheet; judicial outcome unverified.',
  },
  {
    id: 'loc-05-nigeen',
    locality: 'Nigeen',
    evidenceOrInvestigationLead:
      'Multiple beneficiaries identified in anti-corruption proceedings',
    verificationStatus:
      'Includes Nigeen and Beigh Mohalla, Nigeen cited in ACB FIR No. 48/2015 charge sheet; parcel-level judicial dispositions require court-record verification.',
  },
  {
    id: 'loc-06-batapora',
    locality: 'Batapora',
    evidenceOrInvestigationLead:
      'Unauthorized construction affecting drainage documented by CAG',
    verificationStatus:
      'Azad Colony, Batapora watercourse encroachment recorded in CAG feeder-channel audit.',
  },
  {
    id: 'loc-07-chatterhama',
    locality: 'Chatterhama',
    evidenceOrInvestigationLead: 'Severe localized watercourse narrowing',
    verificationStatus:
      'CAG-documented localized narrowing of Chatterhama Nallah from 60–70 ft to 3–4 ft (93–96%) alongside road obstruction.',
  },
  {
    id: 'loc-08-miskeen-bagh',
    locality: 'Miskeen Bagh',
    evidenceOrInvestigationLead: 'Alleged filling reported in August 2026',
    verificationStatus:
      'Subject of August 31, 2026 Environmental Policy Group call for investigation; requires independent site inspection and official LCMA response.',
  },
  {
    id: 'loc-09-dalgate',
    locality: 'Dalgate',
    evidenceOrInvestigationLead: 'Contemporary enforcement activity',
    verificationStatus:
      'High-density commercial/urban outlet corridor experiencing recurring LCMA enforcement and building-permission scrutiny.',
  },
];

export const LAKE_BASIN_DOSSIERS_8: LakeBasinDossierRow[] = [
  {
    id: 'basin-01-hazratbal',
    basinOrWaterway: 'Hazratbal Basin',
    principalInvestigation:
      'Sedimentation, shoreline alteration and settlement expansion',
    parcelQuantificationStatus:
      'Parcel-level quantities pending matched-season satellite and Telbal delta bathymetric analysis.',
  },
  {
    id: 'basin-02-bod-dal',
    basinOrWaterway: 'Bod Dal',
    principalInvestigation:
      'Open-water fragmentation and peripheral development',
    parcelQuantificationStatus:
      'Parcel-level quantities pending macrophyte-adjusted NDWI/SAR time-series decomposition.',
  },
  {
    id: 'basin-03-gagribal',
    basinOrWaterway: 'Gagribal Basin',
    principalInvestigation: 'Urban infrastructure and shoreline modification',
    parcelQuantificationStatus:
      'Parcel-level quantities pending Boulevard/foreshore revetment, houseboat mooring, and commercial strip audit.',
  },
  {
    id: 'basin-04-nigeen',
    basinOrWaterway: 'Nigeen Basin',
    principalInvestigation:
      'Residential, commercial and tourism-related development',
    parcelQuantificationStatus:
      'Parcel-level quantities pending cadastral overlay, building-permission audit, and judicial case cross-referencing.',
  },
  {
    id: 'basin-05-lokut-dal',
    basinOrWaterway: 'Lokut Dal',
    principalInvestigation: 'Internal land-use transformations',
    parcelQuantificationStatus:
      'Parcel-level quantities pending floating-garden-to-consolidated-land transition mapping.',
  },
  {
    id: 'basin-06-brari-nambal',
    basinOrWaterway: 'Brari Nambal',
    principalInvestigation: 'Urban land pressure and drainage connectivity',
    parcelQuantificationStatus:
      'Parcel-level quantities pending historical backwater perimeter and outfall channel reconstruction.',
  },
  {
    id: 'basin-07-nallah-amir-khan',
    basinOrWaterway: 'Nallah Amir Khan',
    principalInvestigation:
      'Hydrological connectivity and channel obstruction',
    parcelQuantificationStatus:
      'Channel-width and hydraulic conveyance audit pending between Dal, Nigeen, Gilsar, and Khushalsar.',
  },
  {
    id: 'basin-08-internal-canals',
    basinOrWaterway: "Dal Lake's internal canals",
    principalInvestigation: 'Width reduction, blockage and accessibility',
    parcelQuantificationStatus:
      'Sub-metre canal network vectorization pending high-resolution optical and field boat-transect verification.',
  },
];

export const DISRUPTION_EPISODES_7: EnforcementDisruptionEpisodeRow[] = [
  {
    id: 'disrupt-01-1989-1996',
    period: '1989–1996',
    investigation: 'Conservation continuity during intense political conflict',
    historicalContextAndMethod:
      'Pair Landsat 5 TM matched-season composites (1988 vs. 1996) with archival project files to test how administrative disruption interacted with floating-garden and settlement shifts.',
  },
  {
    id: 'disrupt-02-2008',
    period: '2008',
    investigation: 'Construction and enforcement records during unrest',
    historicalContextAndMethod:
      'Cross-examine surviving court commissioner submissions, Divisional Commissioner inquiry records, and high-resolution imagery bracketing summer 2008.',
  },
  {
    id: 'disrupt-03-2010',
    period: '2010',
    investigation: 'Land-use change during prolonged disruption',
    historicalContextAndMethod:
      'Evaluate 2009–2011 shoreline and internal island building footprints against reported curfews and enforcement patrol logs.',
  },
  {
    id: 'disrupt-04-2014',
    period: '2014',
    investigation:
      'Post-flood reconstruction and loss of administrative records',
    historicalContextAndMethod:
      'Audit post-September 2014 repair permissions alongside LCMA’s July 2025 RTI disclosure that 2000–September 2014 enforcement files were damaged.',
  },
  {
    id: 'disrupt-05-2016',
    period: '2016',
    investigation: 'Unauthorized development during unrest',
    historicalContextAndMethod:
      'Examine J&K High Court 2016 intervention and LAWDA’s submission that eight FIRs were registered after unrest began, validated against Sentinel-2 scenes.',
  },
  {
    id: 'disrupt-06-2019-2020',
    period: '2019–2020',
    investigation: 'Governance transition and continuity of enforcement',
    historicalContextAndMethod:
      'Test Sentinel-1/2 bi-monthly shoreline series across August 2019–early 2020 administrative restructuring against LCMA demolition logs.',
  },
  {
    id: 'disrupt-07-2020-2021',
    period: '2020–2021',
    investigation: 'Unauthorized construction during pandemic restrictions',
    historicalContextAndMethod:
      'Compare COVID-19 lockdown Sentinel-2/high-resolution optical anomalies with enforcement notices and judicial filings.',
  },
];

export const SURVEILLANCE_AND_SPA_AUDIT_SPEC: SurveillanceAndSpaAuditSpec = {
  flood2014RecordLoss: {
    rtiDisclosureDate: 'July 2025',
    reportingOutlet: 'Greater Kashmir (reporting LCMA Enforcement Wing RTI reply)',
    lostRecordsSpan: '14+ years',
    lostRecordsPeriod: '2000–September 2014',
    postFloodRemovalsCount: 2916,
    postFloodRemovalsPeriod: 'October 2014 to the July 2025 RTI response',
    reconstructionPathways: [
      'Revenue Department parallel jamabandi, girdawari, and mutation registers',
      'Jammu & Kashmir High Court PIL affidavits, commissioner reports, and status filings (2002–2014)',
      'Police station FIR registers and Anti-Corruption Bureau / Vigilance Organization case dockets',
      'Srinagar Municipal Corporation, SDA, and Building Operation Controlling Authority sanction ledgers',
      'Continuous archival Landsat 5/7/8 and commercial high-resolution satellite time-series (2000–2014)',
    ],
    evidentiaryGuardrail:
      'Physical inundation during the September 2014 floods makes archive damage plausible and does NOT by itself establish deliberate concealment; however, it creates an acute 14-year institutional memory gap that must be reconstructed from independent judicial, revenue, and satellite archives.',
  },
  cctvSurveillanceAudit: {
    proposalDate: 'December 2015',
    fundingReleasedCrore: 4.55,
    fundingPeriod: '2017–2022',
    components4: [
      {
        component: 'Cable network',
        target: '40 km',
        initiallyAchieved: '19 km',
        achievementPercentLabel: '47.5%',
      },
      {
        component: 'Camera poles',
        target: '20',
        initiallyAchieved: '9',
        achievementPercentLabel: '45%',
      },
      {
        component: 'Cable installation',
        target: '100%',
        initiallyAchieved: '47.5%',
        achievementPercentLabel: '47.5%',
      },
      {
        component: 'Pole installation',
        target: '100%',
        initiallyAchieved: '45%',
        achievementPercentLabel: '45%',
      },
    ],
    cagDeficiencySummary:
      'CAG Report No. 4 of 2025 documented incomplete physical execution (19 of 40 km cabling; 9 of 20 camera poles initially achieved despite ~₹4.55 crore released during 2017–2022), contractual payment irregularities, and multi-year delays in covering high-risk lake peripheries.',
    subsequentGovernmentResponse:
      'The administration subsequently reported completion of Phase I surveillance and announced plans to expand camera coverage; independent verification is required to test whether camera uptime measurably reduced new plinth/filling area.',
  },
  spa356CroreAcquisitionAudit: {
    approvalDate: 'February 2012',
    approvedOutlayCrore: 356,
    intendedCompletionDate: 'January 2017',
    auditCutOffDate: 'December 2019',
    landAcquiredKanals: 2299,
    landTargetKanals: 14992,
    landAchievementPercent: '15.3%',
    landRemainingKanals: 12693,
    landAcquiredHectaresApprox: 116,
    structuresAcquired: 319,
    structuresTarget: 1994,
    structuresAchievementPercent: '16.0%',
    structuresRemaining: 1675,
    expenditureByDec2019Crore: 63.73,
    centralFundingUnreleasedCrore: 272.82,
    unreclaimedDredgingFinding:
      'Auditors recorded that the 2,299 kanals (~116 hectares) acquired by December 2019 had NOT been dredged to restore them to functioning lake water—demonstrating that fiscal land acquisition does not automatically equal ecological restoration.',
  },
  illustrativeValuationBenchmark: {
    hypotheticalAreaKanals: 100,
    hypotheticalValuePerKanalLakh: 50,
    illustrativeAggregateValueCrore: 50,
    equivalentAreaHa: 5.06,
    disclaimer:
      'Hypothetical scenario only illustrating how 100 kanals (5.06 ha) at an assumed ₹50 lakh/kanal represents ₹50 crore in private economic stakes; NOT an appraisal of verified illegally occupied Dal Lake parcels or prevailing market prices.',
  },
  illustrativeRecoveryBenchmark: {
    hypotheticalRestoredAreaHa: 100,
    recoveredWaterAreaKm2: '1.00 km²',
    equivalentKanals: 1977,
    shareOfCag2007To2020LossPercent: '40.0%',
    equivalentAcres: 247,
    disclaimer:
      'Hypothetical restoration benchmark (not verified recoverable land) showing that ecologically reclaiming 100 ha—less than the ~116 ha already acquired by December 2019—would recover 40.0% of the 2007–2020 CAG open-water reduction.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. PARTS XVII & XVIII — ENFORCEMENT METRICS REFORM & 2026 AREA RECONCILIATION
// ─────────────────────────────────────────────────────────────────────────────

export const ENFORCEMENT_METRICS_REFORM_8: EnforcementMetricReformRow[] = [
  {
    code: 'EMR-01',
    conventionalEnforcementMetric: 'Number of notices issued',
    scientificallyMeaningfulOutcome: 'Area of development prevented',
    verificationMethod:
      'Post-notice multi-temporal satellite check confirming zero subsequent plinth or soil-fill expansion on noticed coordinates.',
  },
  {
    code: 'EMR-02',
    conventionalEnforcementMetric: 'Number of FIRs registered',
    scientificallyMeaningfulOutcome: 'Cases resolved and legal compliance secured',
    verificationMethod:
      'End-to-end judicial docket tracking from police/ACB FIR registration to final court order and parcel remediation.',
  },
  {
    code: 'EMR-03',
    conventionalEnforcementMetric: 'Number of structures demolished',
    scientificallyMeaningfulOutcome: 'Square metres of occupied land recovered',
    verificationMethod:
      'Georeferenced pre- and post-demolition polygon measurement distinguishing outer-zone wall removals from in-lake land recovery (contextualizing the 632 LCMA demolitions reported in Feb 2026 since Oct 2024).',
  },
  {
    code: 'EMR-04',
    conventionalEnforcementMetric: 'Number of inspections conducted',
    scientificallyMeaningfulOutcome: 'Reduction in newly detected violations',
    verificationMethod:
      'Comparison of ward-level patrol frequency against independently detected quarterly satellite construction anomalies.',
  },
  {
    code: 'EMR-05',
    conventionalEnforcementMetric: 'Number of vehicles seized',
    scientificallyMeaningfulOutcome:
      'Demonstrated prevention of unauthorized construction',
    verificationMethod:
      'Decline in nocturnal earth-tipping volume across shoreline choke points such as Miskeen Bagh, Batapora, and Nigeen.',
  },
  {
    code: 'EMR-06',
    conventionalEnforcementMetric: 'Number of enforcement personnel deployed',
    scientificallyMeaningfulOutcome:
      'Percentage of vulnerable shoreline monitored',
    verificationMethod:
      'Spatial audit of active watcher beats and functioning CCTV fields-of-view across high-risk littoral segments.',
  },
  {
    code: 'EMR-07',
    conventionalEnforcementMetric: 'Amount of fines collected',
    scientificallyMeaningfulOutcome: 'Amount of ecological damage addressed',
    verificationMethod:
      'Ring-fenced accounting verifying whether penalties fund physical excavation of rubble/fill and channel restoration.',
  },
  {
    code: 'EMR-08',
    conventionalEnforcementMetric: 'Number of households relocated',
    scientificallyMeaningfulOutcome:
      'Area restored to functioning aquatic habitat',
    verificationMethod:
      'Bathymetric and optical confirmation that vacated/acquired kanals were dredged to free-flowing lake water while relocated families received dignified civic infrastructure.',
  },
];

const CONFLICTING_2026_AREA_ESTIMATE_ROWS: Conflicting2026AreaEstimateRow[] = [
  {
    id: 'est-2013-academic',
    source: 'Historical academic reconstruction',
    observationPeriod: '2013',
    reportedArea: '10.50 km²',
    reportedAreaKm2Numeric: 10.5,
    category: 'Open water',
    reconciliationNotes:
      'Rashid et al. (2017) / Frontiers in Environmental Science (2019) strict unobstructed open-water class within a 24.04 km² total lake extent (excluding submerged/floating macrophytes and floating gardens).',
  },
  {
    id: 'est-2020-cag-eersd',
    source: 'CAG/EE&RSD dataset',
    observationPeriod: '2020',
    reportedArea: '12.907 km²',
    reportedAreaKm2Numeric: 12.907,
    category: 'Open water and submerged vegetation',
    reconciliationNotes:
      'CAG Report No. 4 of 2025 / EE&RSD combined open-water + submerged-vegetation class (1,290.7 ha) inside a consistent 24.605 km² polygon.',
  },
  {
    id: 'est-2026-govt',
    source: 'Government restoration statements',
    observationPeriod: '2026',
    reportedArea: 'Over 20.3 km²',
    reportedAreaKm2Numeric: 20.3,
    category: 'Reported open water',
    reconciliationNotes:
      'Official 2026 statements reporting clearance of ~6.5 km² of aquatic vegetation and expansion of open-water area above 20.3 km²; requires disclosure of polygon boundary (Dal vs. Dal–Nigeen), macrophyte inclusion rules, and gauge stage.',
  },
  {
    id: 'est-2026-kew',
    source: 'KEW Lake Encroachment Observatory',
    observationPeriod: '2026',
    reportedArea: '13.95 km²',
    reportedAreaKm2Numeric: 13.95,
    category: 'Published contemporary area estimate',
    reconciliationNotes:
      'KEW published figure (1,395 ha) exhibiting an ~6.35 km² (635 ha) discrepancy below official >20.3 km² statements; requires KEW self-audit publishing exact Sentinel-1/2 scene dates, boundary shapefile, and NDWI/SAR thresholds.',
  },
];

export const CONFLICTING_2026_AREA_ESTIMATES_4: Conflicting2026AreaEstimatesCollection =
  Object.assign(CONFLICTING_2026_AREA_ESTIMATE_ROWS, {
    governmentVegetationClearanceKm2Approx: 6.5,
    govtVsKewDiscrepancyKm2: 6.35,
    govtVsKewDiscrepancyHa: 635,
    contemporaryReportingLeads2026: [
      {
        date: 'June 30, 2026',
        source: 'Associated Press',
        reportedFinding:
          'Reported continuing pressure on Dal Lake from encroachment, residential development, farmland expansion, pollution, and climatic warming despite restoration drives.',
      },
      {
        date: 'August 31, 2026',
        source: 'Environmental Policy Group (reported via Kashmir Life)',
        reportedFinding:
          'Called for an official investigation into alleged earth filling near Miskeen Bagh.',
      },
      {
        date: 'October 24, 2026',
        source: 'Kashmir News Trust',
        reportedFinding:
          'Reported eyewitness allegations of continuing soil filling and unauthorized construction inside Dal Lake despite LCMA field visits; requires independent site verification and official response.',
      },
    ],
    kewSelfVerificationMandate:
      'The ~6.35 km² (635 ha) gap between government statements (>20.3 km²) and KEW’s published figure (13.95 km²) is a discrepancy between published estimates—not proof that either figure is false. Because boundary polygons, submerged-vegetation inclusion, deweeding timing, and lake water levels strongly shift spectral water masks, KEW must subject its own 13.95 km² figure to fully reproducible open-code satellite verification prior to certification.',
  });

// ─────────────────────────────────────────────────────────────────────────────
// 8. PARTS XIX, XX, XXI, XXII & XXIV — FORENSIC SATELLITE & GOVERNANCE PROTOCOL
// ─────────────────────────────────────────────────────────────────────────────

export const FORENSIC_SATELLITE_PROTOCOL_SPEC: ForensicSatelliteProtocolSpec = {
  satelliteEpochs10: [
    {
      code: 'SAT-01',
      period: '1859–1960',
      principalDataSource: 'Historical survey maps',
      investigation: 'Original lake extent and shoreline',
    },
    {
      code: 'SAT-02',
      period: '1960–1972',
      principalDataSource: 'Declassified CORONA imagery',
      investigation: 'Pre-conflict landscape reconstruction',
    },
    {
      code: 'SAT-03',
      period: '1972–1988',
      principalDataSource: 'Landsat MSS and TM',
      investigation: 'Historical land-use change',
    },
    {
      code: 'SAT-04',
      period: '1989–1996',
      principalDataSource: 'Landsat TM',
      investigation: 'Transformation during the early conflict period',
    },
    {
      code: 'SAT-05',
      period: '1997–2002',
      principalDataSource: 'Landsat TM and ETM+',
      investigation: 'Early LAWDA period',
    },
    {
      code: 'SAT-06',
      period: '2003–2014',
      principalDataSource: 'Landsat 5, 7 and 8',
      investigation: 'Urban expansion and pre-flood conditions',
    },
    {
      code: 'SAT-07',
      period: '2014–2015',
      principalDataSource: 'Landsat 8',
      investigation: 'Flood and post-flood landscape',
    },
    {
      code: 'SAT-08',
      period: '2015–2020',
      principalDataSource: 'Sentinel-2 and Landsat',
      investigation: 'Detailed land-use transformations',
    },
    {
      code: 'SAT-09',
      period: '2021–2025',
      principalDataSource: 'Sentinel-1, Sentinel-2 and Landsat 9',
      investigation: 'Contemporary change monitoring',
    },
    {
      code: 'SAT-10',
      period: '2026',
      principalDataSource: 'Latest cloud-free satellite observations',
      investigation: 'Current water surface and construction footprint',
    },
  ],
  landCoverClasses15: [
    {
      code: 'OW',
      landCoverClass: 'Unobstructed open water',
      reversibilityAndForensicRole:
        'Core open-surface hydraulic and ecological baseline separated from vegetated mats.',
    },
    {
      code: 'SV',
      landCoverClass: 'Submerged aquatic vegetation',
      reversibilityAndForensicRole:
        'Aquatic habitat column combined with OW in CAG/EE&RSD tables but separated here to reconcile 2013/2020/2026 estimates.',
    },
    {
      code: 'FV',
      landCoverClass: 'Floating vegetation',
      reversibilityAndForensicRole:
        'Free-floating or rooted floating-leaf macrophytes (lotus, Salvinia, Azolla, Nymphoides); ecologically reversible via nutrient control and harvesting.',
    },
    {
      code: 'EV',
      landCoverClass: 'Emergent vegetation',
      reversibilityAndForensicRole:
        'Typha/Phragmites reedbeds providing avian habitat yet vulnerable to clandestine anchoring and soil tipping.',
    },
    {
      code: 'FG',
      landCoverClass: 'Floating agricultural gardens',
      reversibilityAndForensicRole:
        'Traditional radh mats requiring distinction between buoyant seasonal cultivation and bottom-anchored consolidation.',
    },
    {
      code: 'CL',
      landCoverClass: 'Consolidated terrestrial land',
      reversibilityAndForensicRole:
        'Earth-filled or silt-stabilized plots elevated above lake stage prior to cultivation or building.',
    },
    {
      code: 'AG',
      landCoverClass: 'Agricultural land',
      reversibilityAndForensicRole:
        'Fixed-bed demba/vegetable cropland within the historical wetland perimeter.',
    },
    {
      code: 'PL',
      landCoverClass: 'Plantation',
      reversibilityAndForensicRole:
        'Willow/poplar or orchard stands consolidating marshland and drainage channels (part of +55.9 ha CAG cropland/plantation shift).',
    },
    {
      code: 'RB',
      landCoverClass: 'Residential built-up land',
      reversibilityAndForensicRole:
        'Domestic structures requiring parcel-level separation of ancestral lake dwellings from unauthorized concrete builds.',
    },
    {
      code: 'CB',
      landCoverClass: 'Commercial built-up land',
      reversibilityAndForensicRole:
        'Hotels, guesthouses, retail strips, and commercial venues audited for permissions and beneficial ownership.',
    },
    {
      code: 'GI',
      landCoverClass: 'Government infrastructure',
      reversibilityAndForensicRole:
        'Public roads, embankments, retaining walls, STPs, and institutional compounds evaluated for hydraulic obstruction.',
    },
    {
      code: 'HB',
      landCoverClass: 'Houseboats and associated facilities',
      reversibilityAndForensicRole:
        'Moored heritage/tourism vessels, walkways, and shikara ghats (17.0 ha in 2020 CAG balance sheet).',
    },
    {
      code: 'CH',
      landCoverClass: 'Internal water channels',
      reversibilityAndForensicRole:
        'Navigable and circulatory internal khuls and feeder nallahs audited for width constriction and blockage.',
    },
    {
      code: 'SL',
      landCoverClass: 'Sediment-affected shallow water',
      reversibilityAndForensicRole:
        'Turbid deltaic plumes and aggrading shoals (especially Telbal–Hazratbal) at risk of terrestrial colonization.',
    },
    {
      code: 'UL',
      landCoverClass: 'Land of unresolved legal status',
      reversibilityAndForensicRole:
        'Explicit evidentiary holding class preventing premature legal labelling where cadastral or judicial verification is incomplete.',
    },
  ],
  geospatialAnalyticalMethods8: [
    'NDWI and MNDWI spectral indices for surface-water delineation calibrated against turbidity and submerged macrophyte reflectance',
    'Sentinel-1 C-band Synthetic Aperture Radar (SAR) dual-polarization backscatter for cloud- and haze-independent water mapping',
    'Multi-season vegetation indices (NDVI/EVI/floating-algae indices) and harmonic phenological time-series classification',
    'Pixel- and parcel-level historical land-use transition matrices quantifying exact origin-to-destination conversions across epochs',
    'Object-Based Image Analysis (OBIA) of building roofs, retaining walls, embankments, and consolidated earthfill parcels',
    'Georeferenced cadastral khasra, Master Plan zone, and 200-metre statutory buffer boundary overlays',
    'Matched-season and matched-water-stage shoreline comparisons controlling for Dal Gate / Ram Munshi Bagh gauge elevation',
    'Independent stratified field ground-truthing with confusion matrices, overall/class producer–user accuracy, and confidence intervals',
  ],
  seasonalNormalizationRule:
    'All multi-decadal surface-water comparisons must pair phenologically matched seasonal windows and, wherever gauge records exist, corresponding lake water-level elevations so temporary low-water drawdowns or late-summer lotus peaks are never misclassified as permanent land encroachment.',
  parcelRegistryFields17: [
    {
      fieldNumber: 1,
      registryField: 'Parcel ID',
      requiredInformation: 'Unique geographical identifier',
      publicDisclosureRule: 'Publicly indexed immutable basin-ward-parcel code.',
    },
    {
      fieldNumber: 2,
      registryField: 'Coordinates',
      requiredInformation: 'Verified geographical location',
      publicDisclosureRule:
        'WGS84 centroid & polygon geometry generalized where required to protect ordinary household privacy.',
    },
    {
      fieldNumber: 3,
      registryField: 'Historical classification',
      requiredInformation: 'Original land or water use',
      publicDisclosureRule:
        'Dated baseline class (OW–UL) citing exact historical map or satellite scene.',
    },
    {
      fieldNumber: 4,
      registryField: 'First observed transformation',
      requiredInformation: 'Earliest detectable satellite evidence',
      publicDisclosureRule:
        'Bracketing pre-change and post-change sensor timestamps.',
    },
    {
      fieldNumber: 5,
      registryField: 'Current classification',
      requiredInformation: 'Present land use',
      publicDisclosureRule:
        'Verified 15-class taxonomy label with observation date.',
    },
    {
      fieldNumber: 6,
      registryField: 'Area transformed',
      requiredInformation: 'Square metres, hectares and kanals',
      publicDisclosureRule:
        'Published in all three units (1 ha = 10,000 m² = 19.7684 kanals) with margin of error.',
    },
    {
      fieldNumber: 7,
      registryField: 'Original ownership',
      requiredInformation: 'Revenue and cadastral documentation',
      publicDisclosureRule:
        'Tenure category (State water / Kahcharai / Shamlat / proprietary Abi-Awal) per revenue record.',
    },
    {
      fieldNumber: 8,
      registryField: 'Current ownership',
      requiredInformation: 'Legally accessible ownership records',
      publicDisclosureRule:
        'Disclosed strictly within statutory public-record and data-protection bounds; redacts unnecessary private household PII.',
    },
    {
      fieldNumber: 9,
      registryField: 'Construction permission',
      requiredInformation: 'Sanction number and conditions',
      publicDisclosureRule:
        'BOCA / LAWDA / LCMA / SMC order reference, permitted plinth/height, or absence of record.',
    },
    {
      fieldNumber: 10,
      registryField: 'Regulatory jurisdiction',
      requiredInformation: 'Responsible authority',
      publicDisclosureRule:
        'Identifies primary enforcement ward, revenue circle, and municipal/development zone.',
    },
    {
      fieldNumber: 11,
      registryField: 'Inspection history',
      requiredInformation: 'Recorded administrative inspections',
      publicDisclosureRule:
        'Chronological log of field watcher / commissioner inspections or flood-lost archive notation.',
    },
    {
      fieldNumber: 12,
      registryField: 'Notices',
      requiredInformation: 'Enforcement notices issued',
      publicDisclosureRule:
        'Statutory show-cause, stop-work, or demolition notice dates and statutory sections.',
    },
    {
      fieldNumber: 13,
      registryField: 'Court proceedings',
      requiredInformation: 'Relevant judicial orders',
      publicDisclosureRule:
        'High Court PIL, civil suit, or tribunal case citation and operative stay/remediation status.',
    },
    {
      fieldNumber: 14,
      registryField: 'Anti-corruption investigation',
      requiredInformation: 'Official case reference, if applicable',
      publicDisclosureRule:
        'FIR / charge-sheet reference accompanied by mandatory presumption-of-innocence and trial-status notice.',
    },
    {
      fieldNumber: 15,
      registryField: 'Current legal status',
      requiredInformation: 'Verified, alleged, disputed or resolved',
      publicDisclosureRule:
        'Strict four-state legal tag preventing unproven allegations from appearing as adjudicated encroachments.',
    },
    {
      fieldNumber: 16,
      registryField: 'Restoration status',
      requiredInformation: 'Ecological recovery independently confirmed',
      publicDisclosureRule:
        'Records whether structure/fill remains, was demolished on land, or was dredged back to open water.',
    },
    {
      fieldNumber: 17,
      registryField: 'Right of response',
      requiredInformation: 'Recorded response from relevant parties',
      publicDisclosureRule:
        'Publishes verbatim or summarized replies from property holders, communities, and public agencies.',
    },
  ],
  parcelRegistryGuardrail:
    'The public-facing Dal Lake Parcel Accountability Registry must strictly separate suspected anomalies and unproven allegations from legally established encroachments, redact unnecessary personal data of ordinary residents, and guarantee a documented right of response prior to publication.',
  responsibilityChain13: [
    {
      code: 'INST-01',
      institution: 'LCMA Enforcement Wing',
      principalResponsibilityToInvestigate:
        'Construction surveillance and regulatory enforcement',
    },
    {
      code: 'INST-02',
      institution: 'LCMA Planning Division',
      principalResponsibilityToInvestigate:
        'Development permissions and land-use compliance',
    },
    {
      code: 'INST-03',
      institution: 'Revenue Department',
      principalResponsibilityToInvestigate:
        'Land records, ownership and boundary verification',
    },
    {
      code: 'INST-04',
      institution: 'Srinagar Municipal Corporation',
      principalResponsibilityToInvestigate:
        'Municipal development and infrastructure responsibilities',
    },
    {
      code: 'INST-05',
      institution: 'Srinagar Development Authority',
      principalResponsibilityToInvestigate: 'Master-plan compliance',
    },
    {
      code: 'INST-06',
      institution: 'Roads and Buildings Department',
      principalResponsibilityToInvestigate:
        'Environmental effects of public infrastructure',
    },
    {
      code: 'INST-07',
      institution: 'Pollution Control Committee',
      principalResponsibilityToInvestigate: 'Pollution regulation',
    },
    {
      code: 'INST-08',
      institution: 'Housing and Urban Development Department',
      principalResponsibilityToInvestigate:
        'Institutional supervision and policy',
    },
    {
      code: 'INST-09',
      institution: 'District Administration',
      principalResponsibilityToInvestigate:
        'Coordination and enforcement support',
    },
    {
      code: 'INST-10',
      institution: 'Police Department',
      principalResponsibilityToInvestigate:
        'Assistance with lawful enforcement',
    },
    {
      code: 'INST-11',
      institution: 'Anti-Corruption Bureau',
      principalResponsibilityToInvestigate:
        'Investigation of alleged official misconduct',
    },
    {
      code: 'INST-12',
      institution: 'Judiciary',
      principalResponsibilityToInvestigate: 'Legal oversight and remedies',
    },
    {
      code: 'INST-13',
      institution: 'Legislative Assembly',
      principalResponsibilityToInvestigate:
        'Public scrutiny and legislative accountability',
    },
  ],
  communityDifferentiation7: [
    {
      code: 'COM-01',
      category: 'Historically established households',
      appropriateApproach:
        'Verify historical rights and legitimate rehabilitation requirements',
    },
    {
      code: 'COM-02',
      category: 'Subsequent family expansion',
      appropriateApproach:
        'Examine housing needs and applicable regulations',
    },
    {
      code: 'COM-03',
      category: 'Traditional agricultural activity',
      appropriateApproach: 'Evaluate ecological sustainability',
    },
    {
      code: 'COM-04',
      category: 'Unauthorized commercial construction',
      appropriateApproach:
        'Investigate beneficiaries and regulatory compliance',
    },
    {
      code: 'COM-05',
      category: 'Speculative property development',
      appropriateApproach: 'Examine legal title and economic interests',
    },
    {
      code: 'COM-06',
      category: 'Government development',
      appropriateApproach: 'Apply equivalent environmental scrutiny',
    },
    {
      code: 'COM-07',
      category: 'Alleged official collusion',
      appropriateApproach:
        'Investigate through administrative and criminal records',
    },
  ],
  fiveLakesideContradictions5: [
    {
      code: 'LSC-01',
      historicalInvestigation: 'The Mathematics of a Dying Lake',
      centralContradiction:
        'Conservation expenditure without adequate scientific outcome accounting',
      canonicalDispatchHref:
        '/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake',
    },
    {
      code: 'LSC-02',
      historicalInvestigation: 'The Laboratory That Kashmir Lost',
      centralContradiction:
        'Scientific infrastructure weakened while ecological problems demanded more science',
      canonicalDispatchHref:
        '/himalayan-dispatch/issues/volume-01-issue-01/the-laboratory-that-kashmir-lost',
    },
    {
      code: 'LSC-03',
      historicalInvestigation: 'The Art of Encroachment',
      centralContradiction:
        'Land-use transformation continuing despite extensive conservation authority',
      canonicalDispatchHref:
        '/himalayan-dispatch/issues/volume-01-issue-01/the-art-of-encroachment',
    },
    {
      code: 'LSC-04',
      historicalInvestigation: 'The National Park That Became a Golf Course',
      centralContradiction:
        'Protected-area land reassigned for recreational development',
      canonicalDispatchHref:
        '/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course',
    },
    {
      code: 'LSC-05',
      historicalInvestigation: 'Selective Environmental Consciousness',
      centralContradiction:
        'Whether environmental standards are consistently applied across different actors and periods',
      canonicalDispatchHref:
        '/himalayan-dispatch/issues/volume-01-issue-01/selective-environmental-consciousness',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. PART XXV — 15 THEMATIC VOLUMES & 100 RESEARCH CHAPTER PROTOCOLS
// ─────────────────────────────────────────────────────────────────────────────

export const ENCROACHMENT_VOLUMES_15: EncroachmentMonographVolumeSpec[] = [
  {
    volumeNumber: 1,
    volumeRoman: 'I',
    slug: 'volume-i-dal-lake-before-modern-urban-expansion',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    chapterRange: '01–07',
    chapterCount: 7,
    chapterCodes: ['01', '02', '03', '04', '05', '06', '07'],
    thematicMandate:
      'Reconstructs 1859–1947 cartographic, hydro-geomorphic, Mughal hydraulic, and colonial revenue baselines establishing Dal Lake’s 31.84 km² extent, 23.98 km² 1903 open-water peak, and customary aquatic tenure before modern urban reclamation.',
  },
  {
    volumeNumber: 2,
    volumeRoman: 'II',
    slug: 'volume-ii-historical-geography-and-disappearing-water',
    volumeTitle: 'Historical Geography and Disappearing Water',
    chapterRange: '08–14',
    chapterCount: 7,
    chapterCodes: ['08', '09', '10', '11', '12', '13', '14'],
    thematicMandate:
      'Traces the 1903–2013 contraction of open water (−49.0% relative to 1859; −56.2% relative to 1903), forty-fold built-up expansion (5 ha to 202 ha), post-1979 internal hollowing inside a stable 24.04 km² perimeter, and severed backwaters.',
  },
  {
    volumeNumber: 3,
    volumeRoman: 'III',
    slug: 'volume-iii-traditional-communities-and-land-relationships',
    volumeTitle: 'Traditional Communities and Land Relationships',
    chapterRange: '15–20',
    chapterCount: 6,
    chapterCodes: ['15', '16', '17', '18', '19', '20'],
    thematicMandate:
      'Examines generational Hanji / Mirbahri settlement histories, customary radh floating-garden agronomy, census cut-off inequities, and ethical-legal standards preventing traditional communities from being scapegoated for speculative encroachment.',
  },
  {
    volumeNumber: 4,
    volumeRoman: 'IV',
    slug: 'volume-iv-environmental-governance-during-political-conflict',
    volumeTitle: 'Environmental Governance During Political Conflict',
    chapterRange: '21–28',
    chapterCount: 8,
    chapterCodes: ['21', '22', '23', '24', '25', '26', '27', '28'],
    thematicMandate:
      'Investigates conservation governance across 1989–1996 armed conflict, the 1992–2001 loss of 242 ha of open water and 85% floating-garden expansion, 2008/2010/2016 unrest episodes, and 2019–2021 transition and pandemic restrictions.',
  },
  {
    volumeNumber: 5,
    volumeRoman: 'V',
    slug: 'volume-v-lawda-and-the-evolution-of-regulatory-authority',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    chapterRange: '29–35',
    chapterCount: 7,
    chapterCodes: ['29', '30', '31', '32', '33', '34', '35'],
    thematicMandate:
      'Audits regulatory architecture from the June 1986 construction moratorium and 1997 creation of LAWDA through building-permission exemptions, the 2014 flood loss of 14+ years of enforcement records, LCMA restructuring, and delayed CCTV deployment.',
  },
  {
    volumeNumber: 6,
    volumeRoman: 'VI',
    slug: 'volume-vi-the-administration-encroacher-nexus-official-investigations',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    chapterRange: '36–43',
    chapterCount: 8,
    chapterCodes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    thematicMandate:
      'Examines official inquiries into alleged regulatory collusion—including the March 2009 inquiry naming eight LAWDA officials and the December 2020 ACB charge sheet in FIR No. 48/2015—under strict presumption-of-innocence standards.',
  },
  {
    volumeNumber: 7,
    volumeRoman: 'VII',
    slug: 'volume-vii-commercial-development-and-property-economics',
    volumeTitle: 'Commercial Development and Property Economics',
    chapterRange: '44–50',
    chapterCount: 7,
    chapterCodes: ['44', '45', '46', '47', '48', '49', '50'],
    thematicMandate:
      'Investigates the physical and financial mechanics of converting water into real estate: reedbed earthfilling supply chains, hospitality footprints, informal conveyancing, circle-rate valuation dynamics, and beneficial-ownership typologies.',
  },
  {
    volumeNumber: 8,
    volumeRoman: 'VIII',
    slug: 'volume-viii-government-infrastructure-and-hydrological-obstruction',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    chapterRange: '51–57',
    chapterCount: 7,
    chapterCodes: ['51', '52', '53', '54', '55', '56', '57'],
    thematicMandate:
      'Subjects public-sector construction to equal environmental scrutiny, auditing R&B road blockages at four watercourses, localized narrowing of Chatterhama Nallah (93–96%) and Saidnar Nallah (70–83%), Tailbal retaining walls, and foreshore bunds.',
  },
  {
    volumeNumber: 9,
    volumeRoman: 'IX',
    slug: 'volume-ix-the-mathematics-of-lost-water-surface',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    chapterRange: '58–65',
    chapterCount: 8,
    chapterCodes: ['58', '59', '60', '61', '62', '63', '64', '65'],
    thematicMandate:
      'Performs rigorous quantitative reconciliation of the 2007–2020 CAG/EE&RSD 2,460.5 ha balance sheet (10.15% vs. 16.22% water loss; +84.1 ha cropland/built-up), stage-area bathymetry, the 6.35 km² 2026 area discrepancy, and Net Aquatic Area Recovered.',
  },
  {
    volumeNumber: 10,
    volumeRoman: 'X',
    slug: 'volume-x-historical-satellite-and-cadastral-reconstruction',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    chapterRange: '66–73',
    chapterCount: 8,
    chapterCodes: ['66', '67', '68', '69', '70', '71', '72', '73'],
    thematicMandate:
      'Specifies the reproducible 10-epoch remote-sensing pipeline (CORONA, Landsat 1–9, Sentinel-1/2), 15-class land-cover taxonomy (OW–UL), khasra cadastral overlays, field accuracy protocols, and the 17-field Parcel Accountability Registry.',
  },
  {
    volumeNumber: 11,
    volumeRoman: 'XI',
    slug: 'volume-xi-judicial-intervention-firs-and-enforcement-outcomes',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    chapterRange: '74–80',
    chapterCount: 7,
    chapterCodes: ['74', '75', '76', '77', '78', '79', '80'],
    thematicMandate:
      'Traces J&K High Court PIL orders (2002–2024), court-appointed expert committees, post-2014 2,916 removals, October 2024–February 2026 632 LCMA demolitions, and the transition from activity counts to 8 outcome-verified accountability stages.',
  },
  {
    volumeNumber: 12,
    volumeRoman: 'XII',
    slug: 'volume-xii-rehabilitation-compensation-and-environmental-justice',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    chapterRange: '81–86',
    chapterCount: 6,
    chapterCodes: ['81', '82', '83', '84', '85', '86'],
    thematicMandate:
      'Audits the ₹356 crore Special Plan Assistance relocation programme (2,299/14,992 kanals and 319/1,994 structures acquired; ₹272.82 Cr unreleased; Rakh-i-Arth resettlement realities) and designs socially just co-stewardship models.',
  },
  {
    volumeNumber: 13,
    volumeRoman: 'XIII',
    slug: 'volume-xiii-contemporary-encroachment-intelligence',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    chapterRange: '87–92',
    chapterCount: 6,
    chapterCodes: ['87', '88', '89', '90', '91', '92'],
    thematicMandate:
      'Investigates 2004–2026 locality leads across Mir Behri, Lati Mohalla, Nandapora, Ishber, Nigeen, Dalgate, and Miskeen Bagh, internal canal constriction, automated SAR/optical alerts, and KEW’s own 13.95 km² self-verification audit.',
  },
  {
    volumeNumber: 14,
    volumeRoman: 'XIV',
    slug: 'volume-xiv-ecological-restoration-and-land-recovery',
    volumeTitle: 'Ecological Restoration and Land Recovery',
    chapterRange: '93–96',
    chapterCount: 4,
    chapterCodes: ['93', '94', '95', '96'],
    thematicMandate:
      'Establishes engineering and limnological protocols to dredge the unrestored ~116 ha of already-acquired land, evaluate realistic 100 ha (1,977-kanal) aquatic recovery targets, rehabilitate feeder nallahs, and restore post-demolition benthic habitat.',
  },
  {
    volumeNumber: 15,
    volumeRoman: 'XV',
    slug: 'volume-xv-the-future-of-kashmirs-aquatic-commons',
    volumeTitle: "The Future of Kashmir's Aquatic Commons",
    chapterRange: '97–100',
    chapterCount: 4,
    chapterCodes: ['97', '98', '99', '100'],
    thematicMandate:
      'Synthesizes the five lakeside governance contradictions across Kashmir, drafts statutory reforms for open cadastral and Net Aquatic Recovery accounting across all 13 responsible institutions, and articulates a 2026–2050 civic covenant.',
  },
];

export const ENCROACHMENT_CHAPTERS_100: EncroachmentMonographChapter[] = [
  // ── VOLUME I: DAL LAKE BEFORE MODERN URBAN EXPANSION (01–07) ──────────────
  {
    number: 1,
    code: '01',
    slug: 'chapter-01-1859-trigono-topographical-baselines-and-pre-urban-lake-footprint',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      '1859 Trigono-Topographical Baselines and the 31.84 km² Pre-Urban Lake Footprint',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Mid-nineteenth-century trigonometrical survey sheets compiled under Montgomerie in 1859 provide the earliest instrumentally triangulated benchmark for the Dal–Nigeen hydrological continuum, recording an overall lake extent of 31.84 km² (20.59 km² unobstructed open water and just 0.05 km²—roughly 5 hectares—of built-up land). Establishing how nineteenth-century surveyors distinguished perennial open water from seasonal littoral marshes, willow swamps, and floating mats is prerequisite to every long-term shrinkage claim.',
      'This chapter reconstructs the geodetic datum, plane-table traverse tolerances, and seasonal timing of the 1859 survey, bounding positional error across the Zabarwan piedmont, Telbal delta, and southern floodplain toward Tsunt Kul so historical shoreline vectors can be overlaid onto modern WGS84 satellite coordinates without spurious datum-shift artifacts.',
    ],
    investigativeQuestions: [
      'Which shoreline contours and seasonal marsh margins were included inside the 1859 31.84 km² total extent versus the 20.59 km² open-water polygon?',
      'What horizontal positional root-mean-square error arises when warping 1859 Survey of India sheets onto persistent architectural control points around Hari Parbat, Hazratbal, Nishat, and Shalimar?',
      'Where were the ~5 hectares of 1859 built-up island and shoreline settlements concentrated prior to modern road embankments?',
    ],
    evidenceAndMethods: [
      'Archival 1859 Great Trigonometrical Survey Kashmir Series sheets and surveyor field memoirs',
      'Thin-plate spline and projective georeferencing anchored to invariant Mughal garden masonry and shrine foundations',
      'Cross-validation against Rashid et al. (2017) and Frontiers in Environmental Science (2019) historical GIS reconstructions',
    ],
    deliverable:
      'Georeferenced 1859 Dal–Nigeen shoreline and open-water vector baseline with quantified cartographic uncertainty buffers.',
    methodologicalCaveat:
      'Nineteenth-century plane-table cartography generalized fine-scale reed channels and lacked standardized stage-gauge metadata; 1859 area totals represent survey-season snapshots rather than annual hydrograph means.',
  },
  {
    number: 2,
    code: '02',
    slug: 'chapter-02-1903-colonial-revenue-settlements-and-open-water-peak',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      '1903 Colonial Revenue Settlements, Walter Lawrence Surveys and the 23.98 km² Open-Water Peak',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In the historical series, 1903 records a total lake extent of 31.64 km² alongside the highest documented open-water surface in Dal Lake’s history—23.98 km²—while built-up land stood at 0.06 km² (~6 hectares). Compared against 2013 (10.50 km²), the 1903 benchmark implies a 56.2% loss (1,348 hectares) of unobstructed open water over the ensuing eleven decades.',
      'Drawing upon Walter Lawrence’s land-revenue settlement frameworks and turn-of-the-century cadastral maps, this chapter examines whether the jump from 20.59 km² (1859) to 23.98 km² (1903) reflects high-water flood years (following the 1893 and 1903 Jhelum floods), differences in classifying submerged macrophytes, or pre-industrial clearance of marsh channels.',
    ],
    investigativeQuestions: [
      'Did high lake stages associated with the catastrophic July 1903 Kashmir flood inflate the mapped 23.98 km² open-water figure relative to 1859?',
      'How did early Dogra-era revenue settlement rules classify state-owned water surface versus taxable agricultural demba strips and floating gardens?',
      'Which littoral villages held recognized revenue numbers inside the 31.64 km² perimeter in 1903?',
    ],
    evidenceAndMethods: [
      '1903 Survey of India / colonial settlement sheets and Walter R. Lawrence’s Valley of Kashmir revenue documentation',
      'Historical hydrometeorological archives of the 1893 and 1903 Srinagar flood events',
      'Comparative polygon differencing between the 1859 and 1903 georeferenced water masks',
    ],
    deliverable:
      'Annotated 1903 cadastral–hydrological synthesis reconciling flood-stage effects with historical open-water peak estimates.',
    methodologicalCaveat:
      'If 1903 mapping captured post-flood inundation or classified submerged-weed basins as open water, percentage losses measured solely from 1903 (56.2%) represent an upper-bound historical sensitivity case alongside the 1859 baseline (49.0%).',
  },
  {
    number: 3,
    code: '03',
    slug: 'chapter-03-hydro-geomorphology-telbal-delta-and-zabarwan-springs',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      'Hydro-Geomorphology of the Dal–Nigeen Alluvial Fan, Telbal Delta and Zabarwan Springs',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Dal Lake occupies a shallow post-glacial tectonic-alluvial depression fed primarily (~80% of surface inflow) by Dachigam–Telbal Nallah in the north, peripheral Zabarwan mountain torrents in the east, and sub-lacustrine karstic/alluvial springs on the lakebed, discharging southward via Dal Gate and westward through Nallah Amir Khan toward Nigeen, Gilsar, and the Jhelum.',
      'Separating natural deltaic progradation from human land appropriation requires quantifying background sediment yields from the Dachigam–Telbal watershed before modern deforestation and road cutting, establishing where natural shoaling historically created shallow benches susceptible to human consolidation.',
    ],
    investigativeQuestions: [
      'What was the natural pre-urban progradation rate of the Telbal delta into Hazratbal Basin prior to twentieth-century catchment disturbance?',
      'Where are sub-lacustrine spring recharge zones located, and how has earthfill consolidation capped or diverted benthic groundwater upwelling?',
      'How did natural seasonal Jhelum backwater dynamics regulate flushing before the Dal Gate weir and lock system?',
    ],
    evidenceAndMethods: [
      'Lacustrine sediment-core dating (210Pb / 137Cs sedimentation rates) published in peer-reviewed Kashmir limnological literature',
      'Digital elevation and watershed slope-erosion modelling across the Dachigam–Telbal–Zabarwan catchment',
      'Historical hydraulic records of the Dal Gate lock and Nallah Amir Khan outflow controls',
    ],
    deliverable:
      'Natural hydro-geomorphic baseline map distinguishing deltaic aggradation zones from anthropogenic infill corridors.',
    methodologicalCaveat:
      'Natural sedimentation reduces depth and creates shallow bars, whereas legal encroachment requires subsequent human stabilization, bunding, or unauthorized occupation; the two processes must not be conflated.',
  },
  {
    number: 4,
    code: '04',
    slug: 'chapter-04-pre-modern-floating-gardens-radh-demba-and-customary-tenure',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      'Pre-Modern Floating Gardens (Radh), Demba Lands and Customary Aquatic Tenure',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Centuries before concrete hotels or speculative land brokers existed in Srinagar, lake-dwelling cultivators engineered buoyant mats of woven Typha and Phragmites rhizomes (radh) alongside raised willow-fringed marsh strips (demba) to supply Srinagar with cucurbits, tomatoes, and greens. Early European travellers and colonial settlement officers recorded both the ingenuity of floating horticulture and customary norms governing mat movement.',
      'This chapter traces the historical distinction between genuinely floating, towable organic radh mats—which left underlying water circulation intact—and stationary, stake-pinned earth-mounded demba plots that progressively converted shallow water into fixed agricultural real estate.',
    ],
    investigativeQuestions: [
      'How did nineteenth- and early twentieth-century customary law and revenue registers distinguish movable radh rafts from fixed demba gardens?',
      'What ecological biomass recycling loop (harvesting lake weeds as compost for floating beds) historically removed nutrients from the water column?',
      'At what physical threshold of stake-anchoring and soil addition does a reversible floating garden cross into permanent terrestrial reclamation?',
    ],
    evidenceAndMethods: [
      'Colonial agrarian treatises, revenue glossary definitions (radh, demba, abi, nambal), and archival photographs (1880s–1930s)',
      'Agronomic and biogeochemical studies of traditional macrophyte-composted floating beds in Dal Lake',
      'Oral-history and ethno-ecological documentation standards cross-checked against historical settlement records',
    ],
    deliverable:
      'Typological matrix differentiating buoyant traditional radh cultivation from bottom-consolidated land reclamation.',
    methodologicalCaveat:
      'Treating all floating gardens as unlawful encroachment erases centuries-old intangible agricultural heritage and misdirects enforcement away from permanent concrete and earthfill conversion.',
  },
  {
    number: 5,
    code: '05',
    slug: 'chapter-05-mughal-shorelines-historic-gardens-and-hydraulic-engineering',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      'Mughal Shorelines, Historic Gardens, Canals and Hydraulic Engineering Around Dal',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Sixteenth- and seventeenth-century Mughal landscape architecture—Shalimar Bagh, Nishat Bagh, Chashma Shahi, Pari Mahal, Naseem Bagh, Jarogha Bagh, and Sona Lank / Rupa Lank—structured the eastern and northern shorelines around open boat-canal approaches, terraced gravity channels, and stone-revetted causeways such as Sutoo / Sadar-i-Khul fitted with arched bridges to preserve cross-basin water exchange.',
      'Comparing Mughal hydraulic design—which relied on arched openings to maintain cross-flow—against twentieth-century solid earthen road embankments illuminates how modern transport engineering severed littoral circulation that earlier builders deliberately protected.',
    ],
    investigativeQuestions: [
      'How many arched water openings originally pierced historical causeways across Dal Lake, and how many were subsequently culverted, narrowed, or sealed?',
      'Where did Mughal boat canals (such as the Shalimar and Nishat approach channels) originally meet unobstructed lake water compared with today’s foreshore road alignment?',
      'What statutory heritage buffers currently govern visual and hydrological corridors linking Zabarwan gardens to Bod Dal and Lokut Dal?',
    ],
    evidenceAndMethods: [
      'Archaeological, architectural-conservation, and historical-cartographic surveys of Dal Lake Mughal gardens and causeways',
      'Hydraulic comparison of open-arch causeways versus solid post-1960 road embankments',
      'Field inventory of surviving, narrowed, and buried historical bridge openings around Nishat, Ishber, and Shalimar',
    ],
    deliverable:
      'Historical hydraulic-connectivity atlas comparing pre-modern arched causeways with contemporary road-culvert bottlenecks.',
    methodologicalCaveat:
      'Historical imperial garden works themselves modified natural piedmont fans; the analytical purpose is hydraulic comparison rather than romanticizing pre-modern interventions.',
  },
  {
    number: 6,
    code: '06',
    slug: 'chapter-06-early-houseboat-regulations-and-mooring-zones',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      'Early Twentieth-Century Houseboat Regulations, European Residency Rules and Mooring Zones',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Restrictions preventing British visitors from purchasing permanent land in Kashmir under Dogra sovereignty spurred the late-nineteenth- and early-twentieth-century rise of residential cedar houseboats across the Jhelum,Tsunt Kul, Gagribal, and Nigeen. Over time, seasonal mobile vessels gave way to permanently moored hulls accompanied by auxiliary kitchen boats, wooden walkways, utility hookups, and shoreline ghat claims.',
      'This chapter traces early municipal and tourism registration rules governing houseboat numbers, mooring licenses, and timber allocations, establishing the baseline against which contemporary mooring footprints (15.0 ha in 2007; 19.6 ha in 2014; 17.0 ha in 2020 per CAG/EE&RSD) can be evaluated.',
    ],
    investigativeQuestions: [
      'How did early twentieth-century mooring rules regulate vessel density, mobility, and shoreline attachments in Gagribal, Dal Gate, and Nigeen?',
      'When did mobile seasonal moorings transition into stationary multi-decade berths accompanied by permanent shore decks and service structures?',
      'How cleanly do remote-sensing classifications separate licensed heritage houseboats from unauthorized shoreline commercial decks?',
    ],
    evidenceAndMethods: [
      'Dogra-era and post-1947 J&K Tourism Department houseboat registration and mooring notifications',
      'Archival photographs and municipal maps of Dal Gate, Boulevard, and Nigeen mooring lines (1900–1960)',
      'Comparison with CAG/EE&RSD houseboat and shikara-ghat areal estimates (2007–2020)',
    ],
    deliverable:
      'Historical regulatory chronology of houseboat licensing, mooring footprints, and shoreline interface rules.',
    methodologicalCaveat:
      'Licensed heritage houseboats represent a legally recognized cultural-tourism sector distinct from terrestrial land encroachment; vessel waste management and shoreline deck extensions must be evaluated separately.',
  },
  {
    number: 7,
    code: '07',
    slug: 'chapter-07-pre-1947-cadastral-archive-khasra-and-state-water-rights',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Dal Lake Before Modern Urban Expansion',
    title:
      'The Pre-1947 Cadastral Archive: Khasra Boundaries, Abi-Awal Classifications and State Water Rights',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Every rigorous adjudication of whether a contemporary shoreline building or plantation constitutes unlawful encroachment ultimately depends on revenue law: whether the underlying khasra parcel was recorded in foundational settlements (such as the 1911–1920s settlements) as sovereign state waterbody (Khalsa Sarkar / Ab-i-Dal), communal wetland commons, or proprietary irrigated land (Abi-Awal / Demba).',
      'This chapter designs the archival retrieval protocol for pre-1947 Settlement Tehsil Srinagar jamabandis, musavis (cloth village maps), and mutation books across every lakeside estate from Tailbal and Habak to Nishat, Gagribal, Mir Behri, and Nigeen.',
    ],
    investigativeQuestions: [
      'Which revenue estates (mauzas) around Dal and Nigeen hold continuous pre-1947 musavi cadastral sheets defining the legal state-water boundary?',
      'Under what statutory provisions were state water parcels or marsh margins ever lawfully mutated into proprietary ownership, and where were mutations barred?',
      'What gaps exist between Revenue Department cadastral water boundaries and LCMA/SDA Master Plan conservation zones?',
    ],
    evidenceAndMethods: [
      'Archival Srinagar Settlement Tehsil musavi maps, jamabandi registers, and J&K Land Revenue Act provisions',
      'High Court boundary-demarcation rulings (including 2018, 2020, and 2024 proceedings on lake demarcation)',
      'GIS vectorization accuracy protocol for digitizing cloth musavi sheets against field boundary pillars',
    ],
    deliverable:
      'Legal-cadastral baseline specification mapping revenue mauzas and tenure classes across the Dal–Nigeen perimeter.',
    methodologicalCaveat:
      'Until official Settlement musavi maps are digitized and cross-verified with certified mutation histories, satellite water-loss polygons alone cannot establish individual title invalidity.',
  },

  // ── VOLUME II: HISTORICAL GEOGRAPHY AND DISAPPEARING WATER (08–14) ────────
  {
    number: 8,
    code: '08',
    slug: 'chapter-08-1903-1962-shoreline-contraction-and-boulevard-embankments',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      '1903–1962 Shoreline Contraction: Boulevard Embankments, Urban Drainage and the Loss of 10.14 km² of Open Water',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'The single largest absolute drop in Dal Lake’s open-water surface in the historical dataset occurred between 1903 (23.98 km²) and 1962 (13.84 km²)—a contraction of 10.14 km² (1,014 hectares)—accompanied by a 3.82 km² reduction in total lake extent (31.64 km² to 27.82 km²) and a fourteen-fold rise in built-up land (0.06 km² to 0.84 km²).',
      'This chapter investigates the mid-century infrastructure and agrarian transformations driving that shift: construction and widening of the southern and eastern Boulevard corridor, post-1947 urban growth of Srinagar, expansion of stationary demba vegetable strips, and altered Jhelum flood-spill engineering.',
    ],
    investigativeQuestions: [
      'Which geographic sectors accounted for the 3.82 km² loss of outer lake extent between 1903 and 1962?',
      'How much of the 10.14 km² drop in open water between 1903 and 1962 shifted into floating/emergent vegetation versus consolidated agricultural and built-up land?',
      'How did Boulevard road embankments alter shallow southern and eastern littoral circulation?',
    ],
    evidenceAndMethods: [
      'Survey of India 1960s 1:50,000 topographic sheets and declassified early-1960s CORONA panoramic reconnaissance frames',
      'Public Works / Roads historical alignments for Boulevard Road and Dal Gate hydraulic structures',
      'Transition budget decomposition between 1903 and 1962 land-cover classes',
    ],
    deliverable:
      'Spatial attribution map of the 1903–1962 outer-perimeter and open-water contraction.',
    methodologicalCaveat:
      'Comparing 1903 revenue-era cartography with 1962 aerial/topographic surveys spans nearly six decades without intermediate decadal checkpoints; intermediate 1920s–1950s survey editions must be retrieved where extant.',
  },
  {
    number: 9,
    code: '09',
    slug: 'chapter-09-1962-1979-land-reclamation-and-perimeter-stabilization',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      '1962–1979 Land Reclamation, Foreshore Road Alignments and Perimeter Stabilization at 24.02 km²',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Between 1962 and 1979, Dal Lake’s mapped total extent contracted by a further 3.80 km²—from 27.82 km² (1962) to 26.40 km² (1972) and 24.02 km² (1979)—while open water declined to 12.41 km². By 1979, peripheral road alignments, agricultural reclamation along the northern and western fringes, and urban infill had largely fixed the outer mapped perimeter near 24 km².',
      'Using declassified 1960s–1972 CORONA KH-4A/4B high-resolution photography paired with 1972–1979 Landsat MSS scenes and the 1977 ENEX New Zealand limnological baseline report, this chapter documents the pre-1980 reclamation wave that preceded both the 1986 moratorium and the 1989 conflict.',
    ],
    investigativeQuestions: [
      'Where were the 380 hectares of outer lake area lost between 1962 and 1979 physically reclaimed, and under what state planning or agricultural schemes?',
      'How do the 1977–1978 ENEX consortium bathymetric and areal measurements compare against the 1979 remote-sensing benchmark (24.02 km² total; 12.41 km² open water)?',
      'Why did built-up land fluctuate slightly between 1962 (0.84 km²), 1972 (0.68 km²), and 1979 (0.80 km²) across changing sensor resolutions?',
    ],
    evidenceAndMethods: [
      'Declassified USGS CORONA KH-4B stereo photography (1.8–2.7 m resolution) and Landsat 1–3 MSS imagery',
      '1977–1978 ENEX (New Zealand) Study of the Pollution of Dal Lake technical baseline volumes',
      'Srinagar Master Plan (1971–1991) land-use zoning maps around northern and western foreshores',
    ],
    deliverable:
      'High-resolution 1962–1979 peripheral reclamation ledger establishing pre-1980 outer shoreline losses.',
    methodologicalCaveat:
      'Coarse 60–80 m Landsat MSS pixels in 1972–1979 under-detect narrow linear houses compared with 2 m CORONA film, explaining minor apparent built-up oscillations.',
  },
  {
    number: 10,
    code: '10',
    slug: 'chapter-10-why-outer-boundary-stabilized-after-1979-while-internal-water-shrank',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      'Why the Mapped Outer Boundary Stabilized After 1979 While Internal Open Water Continued to Shrink',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'One of the sharpest diagnostic findings in the 1859–2013 dataset is that Dal Lake’s mapped total extent remained virtually invariant across thirty-four years—24.02 km² (1979), 24.04 km² (1992), 24.04 km² (2001), 24.04 km² (2010), and 24.04 km² (2013)—even as unobstructed open water fell to 8.91 km² in 2010 and built-up land climbed from 0.80 km² to 2.02–2.10 km².',
      'This chapter establishes the central geographical thesis of Monograph 11: once ring roads and embankments fixed the outer administrative polygon, land conversion migrated inward—turning open water inside the boundary into floating gardens, consolidated islands, willow plantations, and permanent residential/commercial structures without moving the outer map line.',
    ],
    investigativeQuestions: [
      'How did fixed road embankments (Boulevard, Northern Foreshore Road, Nigeen ring roads) lock the outer GIS study polygon at ~24.04 km² while internal terrestrialization accelerated?',
      'Why do administrative maps that track only outer perimeter stability systematically conceal internal water-to-land conversion?',
      'Which internal sub-basins experienced the highest ratio of internal terrestrialization to perimeter stability between 1979 and 2013?',
    ],
    evidenceAndMethods: [
      'Internal-versus-peripheral spatial gradient analysis (concentric distance buffers inward from the 1979 shoreline)',
      'Multi-temporal Landsat TM/ETM+/OLI pixel-trajectory tracking inside the fixed 24.04 km² envelope',
      'Landscape-fragmentation metrics (patch cohesion, largest open-water patch index, canal connectivity)',
    ],
    deliverable:
      'Internal-transformation spatial proof demonstrating how a lake loses aquatic space without losing its mapped boundary.',
    methodologicalCaveat:
      'Holding an outer GIS study mask constant after 1979 is an analytical choice by researchers (mirroring the fixed 24.605 km² EE&RSD mask); peripheral wetland losses outside the ring road must also be audited separately.',
  },
  {
    number: 11,
    code: '11',
    slug: 'chapter-11-forty-fold-built-up-expansion-1859-to-2013',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      'Forty-Fold Built-Up Expansion (1859–2013): Tracing the Rise from 5 Hectares to 202 Hectares',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Across 154 years of historical reconstruction, built-up land inside the mapped Dal Lake system expanded 40.4-fold—from 0.05 km² (5 hectares) in 1859 and 0.06 km² (6 hectares) in 1903 to 0.80 km² (80 hectares) in 1979, 1.83 km² (183 hectares) in 1992, 2.10 km² (210 hectares) in 2001, and 2.02 km² (202 hectares) in 2013.',
      'Unlike macrophyte blooms that wax and wane with nutrient flushing, built-up land introduces reinforced concrete foundations, road access, electrical feeders, domestic sewage loads, and intergenerational occupancy expectations. This chapter disaggregates the 202-hectare built-up stock by decade of emergence, structural density, and basin location.',
    ],
    investigativeQuestions: [
      'What proportion of the 202 hectares of built-up area recorded in 2013 emerged during 1903–1962 (+78 ha) versus 1979–1992 (+103 ha) and 1992–2001 (+27 ha)?',
      'How do differences between the historical dataset’s 202 ha built-up figure (2013) and the CAG/EE&RSD dataset’s 81.2 ha (2014) / 102.5 ha (2020) built-up figures arise from polygon definitions versus mixed garden-hamlet pixel rules?',
      'Which built-up clusters occupy consolidated former open water versus pre-existing natural islands?',
    ],
    evidenceAndMethods: [
      'Cross-calibration of Rashid et al. (2017) built-up masks against EE&RSD/CAG 2007–2020 built-up polygons',
      'Retrospective CORONA (1960s–1972), Landsat (1979–2013), and Cartosat/high-resolution optical building-footprint extraction',
      'Spatial overlay with historical June 1986 construction moratorium and 1997 LAWDA jurisdiction maps',
    ],
    deliverable:
      'Cohort-dated built-up emergence atlas (pre-1962, 1962–1986, 1986–2001, 2001–2013) reconciled across competing datasets.',
    methodologicalCaveat:
      'Medium-resolution (30 m) Landsat classifications group courtyards and tree-shaded hamlets differently than 2.5–5 m Indian remote-sensing data, explaining absolute-hectare differences between academic and EE&RSD built-up totals.',
  },
  {
    number: 12,
    code: '12',
    slug: 'chapter-12-basin-by-basin-fragmentation-hazratbal-bod-dal-lokut-dal-gagribal-nigeen',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      'Basin-by-Basin Fragmentation: Hazratbal, Bod Dal, Lokut Dal, Gagribal and Nigeen Compared',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Aggregate lake-wide numbers mask sharply divergent trajectories across Dal–Nigeen’s five main waterbodies. Hazratbal faces northern Telbal sediment plumes and foreshore settlement pressure; Bod Dal retains the largest central open-water expanse while losing western marsh margins; Lokut Dal and Mir Behri contain dense floating-garden and island mosaics; Gagribal confronts intense urban tourism and houseboat pressure; and Nigeen experiences high-value residential and commercial shoreline conversion.',
      'This chapter establishes standardized sub-basin hydro-geographical polygons so historical and contemporary water loss, residence time, and built-up density can be audited independently for each basin rather than averaged across the system.',
    ],
    investigativeQuestions: [
      'What percentage of 1859 and 1979 unobstructed open water survives today inside each of the five principal basins individually?',
      'Where have causeways, narrowed bridges, and floating-garden belts hydraulically decoupled Lokut Dal, Mir Behri, and Nigeen from central wind-driven mixing?',
      'Which sub-basin exhibits the steepest post-2007 expansion of permanent built-up and plantation classes?',
    ],
    evidenceAndMethods: [
      'Standardized sub-basin watershed and causeway-divide polygon specification (Hazratbal, Bod Dal, Lokut Dal, Gagribal, Nigeen)',
      'Sub-basin disaggregation of historical remote-sensing series and bathymetric depth-volume curves',
      'Hydrodynamic water-exchange connectivity modelling across inter-basin causeway openings',
    ],
    deliverable:
      'Comparative five-basin historical water-loss and fragmentation scorecard.',
    methodologicalCaveat:
      'Published CAG and historical tables differ on whether Nigeen Basin and interconnecting channels are pooled with or separated from the four Dal basins; explicit sub-basin masks resolve this ambiguity.',
  },
  {
    number: 13,
    code: '13',
    slug: 'chapter-13-lost-backwaters-brari-nambal-khushalsar-gilsar-nallah-amir-khan',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      'Lost Backwaters and Severed Marshes: Brari Nambal, Khushalsar, Gilsar and Nallah Amir Khan',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Historically, Dal Lake did not terminate abruptly at Dal Gate or Nigeen; it breathed hydrologically through an interconnected urban chain embracing Brari Nambal lagoon in the south and Nallah Amir Khan, Gilsar, Khushalsar, and Anchar Lake in the northwest. Progressive landfilling, road crossings, solid-waste tipping, and unsewered urban encroachment throttled these outflow lungs, raising hydraulic retention time inside Dal itself.',
      'Treating Brari Nambal and the Nallah Amir Khan–Gilsar–Khushalsar corridor as an integral part of Dal’s forensic investigation reveals what happens in an advanced stage of wetland-to-real-estate conversion—offering a stark preview of Dal’s own internal trajectory if unchecked.',
    ],
    investigativeQuestions: [
      'How much open water and channel width were lost across Brari Nambal, Nallah Amir Khan, Gilsar, and Khushalsar between 1903, 1962, and 2026?',
      'How has hydraulic constriction along Nallah Amir Khan altered outflow discharge from Nigeen toward Khushalsar and Anchar during high-stage events?',
      'Which municipal waste-dumping, road-widening, or housing interventions initiated terrestrialization in Brari Nambal?',
    ],
    evidenceAndMethods: [
      'Multi-temporal satellite and historical map reconstruction of the Dal–Nigeen–Gilsar–Khushalsar–Anchar and Dal–Brari Nambal–Tsunt Kul chains',
      'Srinagar wetland peer-reviewed inventories (including Frontiers in Environmental Science, 2019) and High Court orders on Khushalsar/Gilsar/Brari Nambal',
      'Channel longitudinal width and culvert-invert profiling along Nallah Amir Khan',
    ],
    deliverable:
      'Connected urban-wetland severance atlas linking Dal Lake’s internal stagnation to backwater and outflow encroachment.',
    methodologicalCaveat:
      'Brari Nambal, Gilsar, and Khushalsar fall outside the 2,460.5 ha CAG Dal mask; their areal losses must be reported in dedicated companion ledgers rather than double-counted inside Dal’s polygon.',
  },
  {
    number: 14,
    code: '14',
    slug: 'chapter-14-cartographic-discrepancies-across-167-years',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'Historical Geography and Disappearing Water',
    title:
      'Cartographic Discrepancies Across 167 Years: Reconciling Survey Maps, Aerial Photographs and Multi-Sensor Satellite Series',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Across literature published between 1977 and 2026, quoted figures for Dal Lake’s area range from 8.91 km² to >31 km²—a spread routinely misused in public debate when commentators compare total basin extent in one century against strict mid-summer unobstructed open water in another. Even within contemporary records, total mapped polygons vary between 24.04 km² (academic series) and 24.605 km² (CAG/EE&RSD).',
      'This chapter codifies a strict metadata harmonization standard requiring every cited Dal Lake area figure to declare five parameters: outer boundary shapefile, inclusion/exclusion of Nigeen and backwaters, vegetation-class aggregation rule, acquisition date/phenology, and lake water-stage elevation.',
    ],
    investigativeQuestions: [
      'How much of the variance across published Dal Lake area figures stems from polygon boundary differences versus spectral definitions of submerged and floating macrophytes?',
      'What minimum mapping unit (MMU) bias occurs when comparing 1:63,360 colonial maps, 80 m Landsat MSS, 30 m Landsat TM/OLI, 10 m Sentinel-2, and sub-metre aerial/satellite data?',
      'How can cross-sensor calibration equations translate historical series onto a single reference geometry?',
    ],
    evidenceAndMethods: [
      'Systematic meta-analysis of published Dal Lake areal studies (1977 ENEX, Rashid et al. 2017, Frontiers 2019, EE&RSD/CAG 2025, KEW 2026)',
      'Spatial resampling sensitivity experiments degrading 10 m Sentinel-2 scenes to 30 m and 80 m grids to quantify resolution bias',
      'Standardized five-parameter areal metadata reporting protocol',
    ],
    deliverable:
      'Master cross-walk table reconciling every major published Dal Lake area figure (1859–2026) under explicit boundary and class definitions.',
    methodologicalCaveat:
      'No single historical curve is error-free; transparent uncertainty bars are scientifically superior to false two-decimal precision across incompatible map sources.',
  },

  // ── VOLUME III: TRADITIONAL COMMUNITIES AND LAND RELATIONSHIPS (15–20) ────
  {
    number: 15,
    code: '15',
    slug: 'chapter-15-generational-lake-dwellers-hanjis-mirbahris-settlement-history',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Traditional Communities and Land Relationships',
    title:
      'Generational Lake Dwellers (Hanjis / Mirbahris): Settlement History, Cultural Identity and Livelihood Ecology',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Long before Dal Lake became a site of urban tourism speculation or bureaucratic conservation projects, indigenous lake-dwelling communities—diverse Hanji and Mirbahri occupational lineages embracing shikara boatmen, radh cultivators (Zamindari/Mirbahri), fishermen, nadru (lotus-stem) harvesters, and timber/freight boatmen—inhabited island mahallas and moored dwellings woven into Srinagar’s food supply and aquatic economy.',
      'Grounded in historical ethnography, archival censuses, and social geography, this chapter documents the multigenerational presence, vernacular ecological knowledge, and internal social differentiation of Dal’s traditional communities so conservation policy never mischaracterizes indigenous inhabitation as recent land invasion.',
    ],
    investigativeQuestions: [
      'How do historical census records (1891–1941 and post-1947 enumerations) document population size, occupational guilds, and island settlements across Dal Lake?',
      'What vernacular hydrological and botanical monitoring practices have lake-dwelling cultivators and fishermen maintained across generations?',
      'How did urban stereotypes historically marginalize boat- and lake-dwelling communities in administrative decision-making?',
    ],
    evidenceAndMethods: [
      'Historical Census of India Kashmir volumes, colonial gazetteers, and published anthropological scholarship on Hanji/Mirbahri communities',
      'Archival revenue and mahalla settlement records for historic internal islands and foreshore hamlets',
      'Participatory oral-history protocols adhering to informed consent and community review standards',
    ],
    deliverable:
      'Historical-sociological profile of Dal Lake’s traditional communities and livelihood guilds.',
    methodologicalCaveat:
      'Recognizing historical community rights neither romanticizes untreated domestic sewage nor exempts post-moratorium commercial conversions from statutory review; social justice and ecological rigour must operate together.',
  },
  {
    number: 16,
    code: '16',
    slug: 'chapter-16-mir-behri-and-internal-island-mahallas-demographic-growth',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Traditional Communities and Land Relationships',
    title:
      'Mir Behri and Internal Island Mahallas: Demographic Growth, Household Splitting and Housing Need',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Across Mir Behri and Lokut Dal’s internal island clusters—comprising scores of historic mahallas accessible primarily or solely by shikara and narrow causeways—natural demographic growth over four decades collided with blanket post-1986 construction freezes that often provided neither timely repair permits nor viable, livelihood-compatible nearby housing alternatives.',
      'Because CAG Report No. 4 of 2025 identified Mir Behri through 2004–2022 historical imagery as an encroachment-investigation locality, this chapter designs a fine-grained analytical method to separate organic joint-family subdivision on pre-existing ancestral islands from newly filled commercial or speculative plots.',
    ],
    investigativeQuestions: [
      'How much structural footprint change in Mir Behri since 1986 reflects vertical/courtyard subdivision for multi-generational household splitting versus outward filling into open water?',
      'How did decades-long delays in processing genuine repair permits for weather-damaged timber-and-brick homes affect compliance dynamics among island households?',
      'What sanitation, drinking-water, fire-safety, and medical-access conditions currently prevail across internal island mahallas?',
    ],
    evidenceAndMethods: [
      'Comparison of 1960s–1972 CORONA island outlines with 2004–2026 high-resolution imagery over Mir Behri mahallas',
      'Review of High Court orders governing bona fide residential repair permissions inside prohibited/restricted lake zones',
      'Household-density, civic-infrastructure, and sanitation baseline assessment',
    ],
    deliverable:
      'Differentiated Mir Behri spatial typology separating ancestral island infill from outward water-to-land expansion.',
    methodologicalCaveat:
      'CAG imagery leads over Mir Behri are indicative investigation prompts, not parcel-verified findings of illegality against every resident household.',
  },
  {
    number: 17,
    code: '17',
    slug: 'chapter-17-agronomy-and-nutrient-dynamics-of-radh-versus-earth-filling',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Traditional Communities and Land Relationships',
    title:
      'The Agronomy and Nutrient Dynamics of Traditional Radh Floating Gardens Versus Consolidated Earth Filling',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Dal Lake’s vegetable bowl supplies a substantial share of Srinagar’s fresh produce, yet contemporary cultivation spans a wide ecological spectrum: from traditional organic radh mats fertilized with harvested lake macrophytes to stationary willow-staked beds raised with trucked soil, chemical NPK fertilizers, and synthetic pesticides that leach directly into surrounding channels.',
      'Noting that mapped floating gardens surged from 1.36 km² to 2.52 km² (+116 ha, ~85%) during 1992–2001 and stood at 49.8 ha (+14.6 ha over 2007) alongside 284.9 ha (+55.9 ha) of cropland/plantation in the 2020 CAG/EE&RSD dataset, this chapter evaluates both the livelihood economics and the hydro-chemical trade-offs of contemporary lake agriculture.',
    ],
    investigativeQuestions: [
      'Why do published floating-garden totals differ so sharply between the academic dataset (2.52 km² / 252 ha in 2001) and the EE&RSD/CAG classification (35.2–55.6 ha floating gardens alongside 229.0–284.9 ha cropland/plantation)?',
      'What net nitrogen, phosphorus, and pesticide fluxes enter Dal’s internal canals from chemically intensified vegetable beds compared with traditional macrophyte-mulched radh?',
      'Can sustainable agro-ecological standards preserve farmer incomes while halting bottom-consolidation of floating mats into permanent land?',
    ],
    evidenceAndMethods: [
      'Spectral and field cross-classification reconciling FG (floating gardens), AG (agricultural demba land), and PL (willow/poplar plantations)',
      'Hydrochemical pore-water and canal nutrient/pesticide sampling literature from SKUAST-K and University of Kashmir',
      'Value-chain survey of Dal vegetable production, wholesale mandis, and cultivator household dependence',
    ],
    deliverable:
      'Ecological sustainability and classification-reconciliation framework for floating and marsh agriculture.',
    methodologicalCaveat:
      'In remote sensing, fixed demba vegetable strips and willow-lined radh beds are frequently split differently between "floating gardens" and "cropland/plantation", requiring combined tracking alongside field buoyancy checks.',
  },
  {
    number: 18,
    code: '18',
    slug: 'chapter-18-lake-fisheries-macrophyte-harvesting-nadru-and-subsistence-commons',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Traditional Communities and Land Relationships',
    title:
      'Lake Fisheries, Macrophyte Harvesting, Nadru Cultivation and Subsistence Commons',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Open water and healthy submerged/floating-leaf habitats sustain cast-net fishermen pursuing endemic schizothoracine snowtrout (Kashir Gaad) alongside introduced mirror carp, seasonal nadru (Nelumbo nucifera rhizome) harvesters, and traditional fodder-weed collectors. Ironically, permanent land reclamation and tributary blockage destroy the very spawning gravels and shallow lotus beds on which these non-real-estate livelihoods depend.',
      'This chapter examines how traditional aquatic-commons harvesters act as natural stakeholders in defending open water—and how poorly planned mechanical deweeding or uncompensated shoreline cordoning has periodically disrupted subsistence harvesting.',
    ],
    investigativeQuestions: [
      'How has the contraction of open water and blockage of Telbal/Chatterhama spawning tributaries altered native Schizothorax versus exotic Cyprinus carpio catch composition?',
      'How did the 2014 flood siltation and subsequent resurgence of Nelumbo nucifera beds reshape nadru livelihoods across Hazratbal, Bod Dal, and Nigeen?',
      'How can community biomass-harvesting cooperatives replace or complement contractor-driven mechanical deweeding?',
    ],
    evidenceAndMethods: [
      'Department of Fisheries J&K catch series, gill/cast-net CPUE studies, and schizothoracine spawning-habitat assessments',
      'Multi-year mapping of Nelumbo nucifera beds before and after the September 2014 flood',
      'Comparative cost-and-nutrient-export analysis of community fodder/compost harvesting versus mechanical harvester dumping',
    ],
    deliverable:
      'Subsistence-commons impact assessment linking tributary and open-water protection to fishery and nadru livelihoods.',
    methodologicalCaveat:
      'Seasonal lotus leaf cover appears spectrally vegetated in late summer (July–September) despite reverting to open water in winter/spring—a critical seasonal phenology control for satellite water mapping.',
  },
  {
    number: 19,
    code: '19',
    slug: 'chapter-19-documented-versus-undocumented-households-survey-cut-off-inequalities',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Traditional Communities and Land Relationships',
    title:
      'Documented Versus Undocumented Households: Census Omissions and Survey Cut-Off Inequalities',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Successive government socio-economic surveys of Dal Lake dwellers—beginning with baseline enumerations in the late 1970s and 1986 and followed by post-1997 LAWDA/LCMA resettlement lists—determined which families qualified for compensation, rehabilitation plots, or repair permissions. Anthropological scholarship (including Bhan and Trisal) has documented acute inequities faced by genuine lake households omitted from earlier Conflict- or pre-Conflict-era enumerations or formed through natural intergenerational marriage.',
      'This chapter audits the methodology, cut-off dates, appellate mechanisms, and exclusion errors of official household surveys from 1979 to 2025.',
    ],
    investigativeQuestions: [
      'Which baseline surveys (1979, 1986, 1998–2000, 2008–2012) govern current LCMA rehabilitation eligibility, and how were omissions during conflict years handled?',
      'How were newly formed nuclear households descended from verified pre-1986 lake families treated under rigid per-structure enumeration rules?',
      'Did opaque survey-inclusion procedures create administrative vulnerability or rent-seeking risks during compensation verification?',
    ],
    evidenceAndMethods: [
      'Comparative audit of official Dal Lake socio-economic survey guidelines, cut-off notifications, and High Court rehabilitation directives',
      'Peer-reviewed ethnographic analyses of survey exclusion and resettlement politics (Bhan & Trisal; regional social-policy studies)',
      'Cross-referencing of electoral rolls, ration-card histories, and pre-1986 archival island footprints',
    ],
    deliverable:
      'Diagnostic audit of resettlement survey methodology, cut-off exclusions, and due-process safeguards.',
    methodologicalCaveat:
      'Absence from an older administrative enumeration list does not automatically prove recent unlawful arrival; multi-source documentary corroboration is essential.',
  },
  {
    number: 20,
    code: '20',
    slug: 'chapter-20-ethical-and-legal-differentiation-protecting-communities-from-scapegoating',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'Traditional Communities and Land Relationships',
    title:
      'Ethical and Legal Differentiation: Protecting Historical Lake Communities From Real-Estate Scapegoating',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'An environmental investigation that lumps a fourth-generation boatman repairing a leaking timber roof in Mir Behri into the same category as a commercial developer tipping truckloads of earth for a multi-storey guesthouse in Nigeen or a government department narrowing a 65-foot nallah to 3 feet would be scientifically flawed and socially unjust.',
      'Operationalizing Part XXII’s seven-category differentiation framework, this chapter establishes binding evidentiary criteria separating historical household tenure, family housing need, and customary agriculture from unauthorized commercial construction, speculative property development, public-infrastructure harm, and official collusion.',
    ],
    investigativeQuestions: [
      'What objective documentary, architectural, and geospatial indicators reliably assign a contested parcel across the seven-tier social-legal differentiation matrix?',
      'Have past demolition drives fallen disproportionately on small wooden sheds and fencing while reinforced commercial buildings or departmental road obstructions persisted?',
      'What privacy and redaction rules must govern public reporting so ordinary lake families are never subjected to vigilante stigmatization?',
    ],
    evidenceAndMethods: [
      'Seven-category legal-ethical classification rubric (COM-01 through COM-07) cross-mapped to J&K land, municipal, and constitutional jurisprudence',
      'Disaggregated analysis of demolition logs by structure type, floor area, commercial vs. domestic use, and basin zone',
      'Public-interest journalism ethics and PII redaction standards for parcel-level environmental registries',
    ],
    deliverable:
      'Binding seven-tier Ethical & Legal Differentiation Charter for all KEW and Himalayan Dispatch Dal Lake reporting.',
    methodologicalCaveat:
      'Differentiation protects vulnerable historical residents from scapegoating while maintaining that no actor—wealthy, official, or local—may newly fill open lake water into private land.',
  },

  // ── VOLUME IV: ENVIRONMENTAL GOVERNANCE DURING POLITICAL CONFLICT (21–28) ─
  {
    number: 21,
    code: '21',
    slug: 'chapter-21-pre-1989-baseline-degradation-before-armed-conflict',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      'Pre-1989 Baseline Degradation: Establishing What Had Already Been Lost Before Armed Conflict Began',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Popular commentary frequently attributes Dal Lake’s spatial collapse almost wholly to the post-1989 armed conflict. Yet the historical table demonstrates that total lake extent had already shrunk from 31.84 km² (1859) to 24.02 km² by 1979—meaning virtually 100% of the outer-perimeter loss in that series occurred a decade before 1989—while open water had already fallen from 23.98 km² (1903) to 12.41 km² (1979).',
      'Establishing a rigorous 1988 pre-conflict Landsat 5 TM baseline prevents anachronistic blame-shifting and isolates which specific forms of internal transformation actually accelerated after 1989.',
    ],
    investigativeQuestions: [
      'What exact open-water, floating-garden, emergent-marsh, and built-up areas existed across Dal–Nigeen in cloud-free autumn 1988 Landsat 5 TM imagery?',
      'Why had early conservation blueprints (1977 ENEX report, 1978–1986 state committees, June 1986 moratorium) already warned of acute encroachment before 1989?',
      'Which shoreline sectors were already heavily urbanized or hotel-lined prior to 1989?',
    ],
    evidenceAndMethods: [
      'Matched-season 1987–1988 Landsat 5 Thematic Mapper surface-reflectance scenes and late-1980s town-planning maps',
      'Archival 1977 ENEX recommendations and pre-1989 Urban Environmental Engineering Department (UEED) project records',
      'Pre-1989 versus post-1989 rate-of-change statistical breakpoint testing',
    ],
    deliverable:
      'Verified 1988 pre-conflict geospatial and institutional baseline map.',
    methodologicalCaveat:
      'Acknowledging severe pre-1989 perimeter loss does not minimize subsequent conflict-era internal consolidation; both epochs require distinct causal accounting.',
  },
  {
    number: 22,
    code: '22',
    slug: 'chapter-22-1989-1996-institutional-disruption-and-administrative-vacuum',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      '1989–1996 Institutional Disruption: Conservation Continuity, Civic Attention and Administrative Vacuum',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Between 1989 and 1996, acute armed conflict, prolonged curfews, institutional paralysis, departure of external technical consultants, and the redirection of state administration toward security management severely disrupted ordinary municipal inspection, environmental monitoring, and conservation engineering around Srinagar’s waterbodies.',
      'Because published academic tables bracket 1979–1992 and 1992–2001 rather than isolating 1989–1996 directly, this chapter pairs annual 1989–1996 Landsat 5 TM scenes with surviving UEED, municipal, and budgetary archives to measure exactly what changed on the water during those seven years.',
    ],
    investigativeQuestions: [
      'When 1989 and 1996 matched-season Landsat 5 TM scenes are compared directly, how many hectares of open water transitioned to floating gardens, emergent reeds, or consolidated land?',
      'Which conservation works, dredging operations, and enforcement patrols were suspended or curtailed between 1989 and 1996?',
      'Did unauthorized building during 1989–1996 cluster along outer roads (Boulevard, Nishat, Nigeen) or within internal boat-accessible islands?',
    ],
    evidenceAndMethods: [
      'Annual matched-season (September–October) USGS Landsat 5 TM Level-2 archive scenes from 1989 through 1996',
      'State plan expenditure archives and UEED / Housing & Urban Development administrative reports (1989–1997)',
      'Contextual synthesis with Bhan and Trisal’s institutional-history findings on 1989–1996 conservation discontinuity',
    ],
    deliverable:
      'Dedicated 1989–1996 annual satellite land-cover time series isolating the early conflict interval for the first time.',
    methodologicalCaveat:
      'Landsat 5 TM’s 30 m pixel resolution detects floating-garden belts and multi-plot earthfill reliably, whereas single small wooden sheds require supplementary aerial or cadastral corroboration.',
  },
  {
    number: 23,
    code: '23',
    slug: 'chapter-23-1992-2001-open-water-loss-and-floating-garden-expansion',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      'The 1992–2001 Transformation Interval: Accounting for 242 Hectares of Open-Water Loss and 85% Floating-Garden Growth',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In the published historical reconstruction, the nine-year span between 1992 and 2001 recorded a net open-water loss of 242 hectares—an 18.5% drop from 13.10 km² to 10.68 km²—while mapped floating gardens expanded from 1.36 km² to 2.52 km² (+116 hectares, or ~85%) and built-up land rose by +27 hectares to reach 2.10 km² (210 ha).',
      'This chapter performs a multi-factor attribution of the 1992–2001 shift, testing competing and interacting drivers: urban food-supply demand during curfews and highway closures, untreated sewage nutrient enrichment fuelling macrophyte mats, demographic pressure inside lake wards, and weak regulatory enforcement across the pre- and early-LAWDA transition.',
    ],
    investigativeQuestions: [
      'Where inside Lokut Dal, Bod Dal, Mir Behri, and Hazratbal did the +116 ha expansion of floating gardens (1.36 km² to 2.52 km²) concentrate between 1992 and 2001?',
      'What accounted for the remaining ~99 ha of the 242 ha open-water reduction beyond floating gardens (+116 ha) and built-up land (+27 ha)—specifically emergent/floating macrophyte succession?',
      'Did supply-chain disruptions and urban unemployment during the 1990s increase economic reliance on intensive vegetable cultivation inside the lake?',
    ],
    evidenceAndMethods: [
      'Sub-basin transition matrix between 1992 Landsat 5 TM and 1999–2001 Landsat 7 ETM+ pan-sharpened (15 m) scenes',
      'Agrarian and urban food-market records from Srinagar during the 1990s',
      'Hydrochemical eutrophication records tracking macrophyte proliferation across the 1990s',
    ],
    deliverable:
      'Complete 242-hectare spatial and causal budget for the 1992–2001 Dal Lake open-water contraction.',
    methodologicalCaveat:
      'Correlation with the 1990s conflict decade does not establish monocausal attribution; hydrologic stage, nutrient loading, livelihood adaptation, and regulatory gaps operated simultaneously.',
  },
  {
    number: 24,
    code: '24',
    slug: 'chapter-24-anthropology-of-conflict-era-conservation-bhan-and-trisal',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      'Anthropology of Conflict-Era Conservation: Revisiting Bhan and Trisal’s Fluid Landscapes Analysis',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Mona Bhan and Nishita Trisal’s peer-reviewed anthropological study (Fluid Landscapes, Sovereign Nature: Conservation and Counterinsurgency in Indian-Controlled Kashmir) demonstrated that environmental governance around Dal Lake cannot be understood purely as a technocratic engineering exercise divorced from sovereignty contests, security governance, class hierarchies, and the contested citizenship of lake dwellers.',
      'Engaging critically and empirically with this scholarship, this chapter bridges political ecology and remote-sensing forensics—examining how state conservation narratives sometimes framed ordinary lake dwellers as ecological threats while failing to curb politically connected commercial construction or state infrastructure encroachments.',
    ],
    investigativeQuestions: [
      'How did post-1996 conservation and beautification drives intersect with tourism-recovery politics and uneven class enforcement?',
      'How did disputes over pre-1986 survey cut-offs and post-1989 household growth shape mistrust between lake residents and LAWDA?',
      'Where do hard geospatial building-footprint data corroborate, refine, or complicate ethnographic accounts of lakeside governance?',
    ],
    evidenceAndMethods: [
      'Close documentary review of Bhan & Trisal (Critique of Anthropology) alongside comparative political-ecology studies of urban South Asian wetlands',
      'Cross-comparison of ethnographic locality case notes with 1990–2020 satellite land-use trajectories and court commissioner reports',
      'Institutional discourse analysis of official Master Plans, tourism brochures, and PIL affidavits',
    ],
    deliverable:
      'Interdisciplinary synthesis uniting political-ecological scholarship with reproducible geospatial evidence.',
    methodologicalCaveat:
      'Political-ecological critique explains asymmetrical power and social vulnerability, but it must never be used to deny verified physical loss of aquatic habitat where water was permanently turned into land.',
  },
  {
    number: 25,
    code: '25',
    slug: 'chapter-25-security-deployments-restricted-shorelines-and-surveillance-geometries',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      'Security Deployments, Restricted Shorelines and Altered Surveillance Geometries Around the Lake',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'From 1990 onward, hotels, guesthouses, centaur/foreshore precincts, and strategic road nodes around Dal and Nigeen periodically hosted security installations, perimeter bunds, and restricted zones, while nocturnal boat movement and civilian administrative inspections inside interior channels were curtailed for extended intervals.',
      'Maintaining symmetric institutional standards, this chapter examines documented official records regarding temporary and long-term state/security occupancy around lakefront properties, rent/compensation structures, sewage/solid-waste compliance, and how nocturnal movement restrictions reshaped municipal enforcement visibility.',
    ],
    investigativeQuestions: [
      'How did lakeside hotel requisitions and perimeter security infrastructure during the 1990s–2000s interact with shoreline land use and municipal sewage compliance?',
      'Did restrictions on night-time civilian departmental patrols create unmonitored windows inside interior channels or peripheral nallahs?',
      'Where have vacated state or security shoreline sites subsequently been restored, retained by government departments, or returned to commercial hospitality use?',
    ],
    evidenceAndMethods: [
      'Published Jammu & Kashmir Legislative Assembly replies, High Court PIL filings, and CAG audit references regarding lakeside government/hotel occupancies',
      'Multi-temporal satellite mapping of institutional compounds along Boulevard, Nishat, and Nigeen',
      'Review of Pollution Control Committee compliance orders covering government and hospitality establishments',
    ],
    deliverable:
      'Documented institutional-footprint assessment across restricted and state-occupied lakeside zones.',
    methodologicalCaveat:
      'Only publicly documented legislative, judicial, and audit records may be cited; operational security facilities outside public environmental records remain outside scope.',
  },
  {
    number: 26,
    code: '26',
    slug: 'chapter-26-2008-and-2010-civil-unrest-episodes-testing-opportunistic-construction',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      '2008 and 2010 Civil Unrest Episodes: Testing Claims of Opportunistic Construction Against Satellite Archives',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'During the prolonged summer unrests of 2008 and 2010, media reports, civic petitioners, and judicial proceedings repeatedly raised alarms that builders and land-fillers exploited curfews and civil-police redeployment to tip soil and erect concrete frames overnight around Dal, Nigeen, and Khushalsar.',
      'Rather than accepting anecdotal claims uncritically, this chapter pairs pre-summer and post-autumn high-resolution and Landsat 5/7 satellite scenes bracketing 2008 and 2010 with the March 2009 Divisional Commissioner inquiry and High Court commissioner filings to test whether measurable spikes in earthfill or roof area occurred during those windows.',
    ],
    investigativeQuestions: [
      'Do matched May versus November satellite scenes in 2008 and 2010 show statistically elevated rates of new building roofs or shoreline filling compared with 2006–2007 or 2011–2012?',
      'Which specific wards accounted for the unauthorized constructions investigated in the March 2009 Divisional Commissioner report naming eight LAWDA officials?',
      'How did the loss of pre-2014 LCMA enforcement files (disclosed via July 2025 RTI) affect documentary accountability for 2008 and 2010 violations?',
    ],
    evidenceAndMethods: [
      'Archive high-resolution commercial optical imagery (QuickBird / WorldView / GeoEye / Cartosat) and Landsat 5 TM scenes bracketing 2008 and 2010',
      'CSE Dal Lake litigation chronology and surviving J&K High Court PIL orders from 2008–2011',
      'Before–after difference-in-differences rate comparison against non-unrest control summers',
    ],
    deliverable:
      'Empirical test of unrest-window construction rates for 2008 and 2010 with ward-level hotspot attribution.',
    methodologicalCaveat:
      'Where cloud-free sub-metre imagery is unavailable for exact curfew months, annual brackets measure cumulative annual change rather than isolating specific curfew weeks.',
  },
  {
    number: 27,
    code: '27',
    slug: 'chapter-27-2016-unrest-high-court-intervention-and-eight-registered-firs',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      '2016 Unrest and High Court Intervention: Auditing the Eight Registered FIRs and Field Inspection Gaps',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'During the post-July 2016 unrest, the Jammu & Kashmir High Court intervened directly over reports of rampant unauthorized construction inside and around Dal Lake while ordinary administration was paralysed; LAWDA informed the Court that eight FIRs had been registered since the unrest began.',
      'Because Sentinel-2A (10 m optical) and Sentinel-1A (C-band SAR) were fully operational by summer 2016—and because post-October 2014 LCMA enforcement records were NOT affected by the 2014 flood—2016 represents the first disruption episode where satellite change detection can be audited directly against surviving FIRs and demolition ledgers.',
    ],
    investigativeQuestions: [
      'What happened to the eight FIRs reported by LAWDA to the High Court in 2016 across police investigation, charge-sheeting, prosecution, and site restoration?',
      'How many distinct construction or soil-filling anomalies are detectable in 10 m Sentinel-2 scenes between June 2016 and December 2016 across Dal and Nigeen?',
      'Did police assistance shortages during 2016 prevent demolition squads from executing stop-work orders, and were completed structures subsequently regularized or removed?',
    ],
    evidenceAndMethods: [
      'Sentinel-2A MSI (10 m) and Sentinel-1A SAR time-series spanning May–December 2016',
      '2016 J&K High Court PIL orders, court commissioner reports, and RTI tracking of the eight 2016 unrest FIRs',
      'Cross-verification against LCMA’s post-2014 ledger of 2,916 reported removals',
    ],
    deliverable:
      'End-to-end judicial and satellite outcome audit of the 2016 unrest construction cases.',
    methodologicalCaveat:
      'Ten-metre Sentinel-2 pixels reliably flag plots ≥200–400 m², whereas minor internal room extensions require sub-metre archival scenes or field inspection logs.',
  },
  {
    number: 28,
    code: '28',
    slug: 'chapter-28-2019-2021-governance-transition-and-covid-19-lockdown-monitoring',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Environmental Governance During Political Conflict',
    title:
      '2019–2021 Governance Transition and COVID-19 Lockdowns: Pandemic-Era Construction Monitoring',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Between August 2019 and late 2021, Srinagar experienced two consecutive exceptional governance intervals: the constitutional and administrative reorganization of 2019–2020 (including communications restrictions and departmental transitions) followed immediately by the 2020–2021 COVID-19 public-health lockdowns, during which judicial petitions and local reporting again flagged covert lakeside construction and earthfilling.',
      'Utilizing five-day Sentinel-2A/2B optical revisit and six-to-twelve-day Sentinel-1A/1B radar time series alongside High Court 2020 boundary/accountability orders, this chapter quantifies shoreline and internal parcel changes across 2019–2021.',
    ],
    investigativeQuestions: [
      'Did permanent land consolidation or building-footprint growth accelerate during August 2019–February 2020 or March 2020–June 2021 relative to 2017–2018?',
      'How did High Court monitoring in 2020 (including proceedings on lake demarcation and encroachment accountability) enforce oversight during pandemic restrictions?',
      'How did the institutional transition from LAWDA to the Jammu & Kashmir Lake Conservation and Management Authority (LCMA) affect enforcement command chains?',
    ],
    evidenceAndMethods: [
      'Dense 5-day Sentinel-2A/2B and 12-day Sentinel-1 SAR stacks (2018–2022) processed for new roof and soil-fill emergence',
      'J&K High Court 2020 proceedings (Indian Kanoon doc/152003009) and official LCMA lockdown demolition disclosures',
      'Administrative reorganization notifications converting LAWDA into LCMA',
    ],
    deliverable:
      'Bi-monthly 2019–2021 satellite anomaly ledger paired with lockdown-era judicial and LCMA enforcement records.',
    methodologicalCaveat:
      'Lockdown halts in tourism boat traffic temporarily improved water clarity in spring 2020, altering submerged-macrophyte optical reflectance; SAR and NIR/SWIR indices must control for clarity shifts.',
  },

  // ── VOLUME V: LAWDA AND THE EVOLUTION OF REGULATORY AUTHORITY (29–35) ─────
  {
    number: 29,
    code: '29',
    slug: 'chapter-29-june-1986-construction-moratorium-and-early-planning-orders',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      'The June 1986 Construction Moratorium and Early Urban Environmental Planning Orders',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Public reporting records that the first government construction moratorium inside and immediately around Dal Lake dates back to June 1986—nearly four decades before contemporary enforcement controversies. If statutory prohibitions on new lakeside building have stood on the books since 1986, then every post-1986 commercial hotel, residential colony, and departmental compound within that zone either received an explicit government exemption or arose in breach of the moratorium.',
      'This chapter establishes the archival retrieval protocol to secure the original June 1986 executive/statutory order, its exact geographical schedule of prohibited khasra numbers or buffer distances, and every subsequent modification, relaxation, or cabinet/authority override.',
    ],
    investigativeQuestions: [
      'What exact statutory instrument enacted the reported June 1986 construction moratorium, and which lakeside wards and buffer widths did it cover?',
      'Which government authorities held discretionary power after June 1986 to grant special exemptions, hotel upgrades, or institutional construction clearances?',
      'What fraction of today’s 202+ hectares of built-up footprint post-dates the June 1986 prohibition?',
    ],
    evidenceAndMethods: [
      'Jammu & Kashmir Government Gazette archives, Housing & Urban Development notifications (1985–1989), and Srinagar Master Plan orders',
      'J&K Control of Building Operations Act (1988) and Development Act statutory schedules',
      'Spatial overlay of 1986 Landsat 5 TM built-up masks against 2020/2026 building footprints',
    ],
    deliverable:
      'Annotated legal text and spatial coverage map of the June 1986 moratorium and all subsequent statutory amendments.',
    methodologicalCaveat:
      'Secondary press references to the June 1986 order must be verified against the certified Gazette notification before parcel-specific legal conclusions are drawn.',
  },
  {
    number: 30,
    code: '30',
    slug: 'chapter-30-1997-establishment-of-lawda-mandate-and-jurisdictional-map',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      '1997 Establishment of LAWDA: Statutory Mandate, Jurisdictional Map and Institutional Architecture',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Created in 1997 under the Jammu & Kashmir Development Act to replace fragmented municipal, irrigation, and UEED responsibilities with a dedicated single-purpose agency, the Lakes and Waterways Development Authority (LAWDA) was entrusted simultaneously with catchment engineering, sewage treatment, deweeding, lake-dweller rehabilitation, building permissions, and anti-encroachment enforcement.',
      'This chapter audits whether housing capital-works contracting, building-permission licensing, and police-style shoreline enforcement inside one bureaucracy created structural conflicts of interest—while leaving peripheral catchment channels split across the Srinagar Municipal Corporation, SDA, Revenue Department, and R&B.',
    ],
    investigativeQuestions: [
      'Which exact revenue villages, municipal wards, and catchment sub-watersheds were notified under LAWDA’s local-area jurisdiction in 1997 and subsequent revisions?',
      'How were budgetary, staffing, and engineering resources allocated inside LAWDA between contractor-led civil works and field regulatory enforcement?',
      'Where did boundary seams between LAWDA, SMC, and SDA create regulatory no-man’s-lands along tributaries and foreshore colonies?',
    ],
    evidenceAndMethods: [
      '1997 J&K Development Act notification constituting LAWDA, board governance charters, and local-area boundary schedules',
      'CAG performance audits comparing LAWDA administrative, engineering, and enforcement wing staffing and budgets',
      'GIS boundary seam map comparing LAWDA, SMC, SDA, and Revenue tehsil limits',
    ],
    deliverable:
      'Institutional anatomy and jurisdictional boundary map of LAWDA from 1997 to reorganization.',
    methodologicalCaveat:
      'Statutory creation of an authority does not automatically transfer revenue-record custody or police powers; inter-agency dependencies must be mapped explicitly.',
  },
  {
    number: 31,
    code: '31',
    slug: 'chapter-31-building-permission-regimes-master-plan-zoning-and-exemptions',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      'Building Permission Regimes, Master-Plan Zonal Regulations and Exemption Clauses (1997–2026)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Across the Dal–Nigeen local area, building regulation operates through concentric and thematic zones—from strictly prohibited waterbody and 200-metre green-belt buffers along Foreshore/Boulevard corridors to restricted heritage, low-density residential, and rural catchment pockets governed by the Building Operation Controlling Authority (BOCA) and Srinagar Master Plan 2035.',
      'This chapter examines how formal permission committees operated in practice: how long ordinary residents waited for minor roof or wall repair approvals, how commercial renovations were evaluated, and whether discretionary compounding or Master Plan land-use reclassifications legalized prior violations.',
    ],
    investigativeQuestions: [
      'How many building and repair permissions were granted, rejected, or kept pending by LAWDA/LCMA BOCA committees annually between 1997 and 2026?',
      'Did Srinagar Master Plan revisions alter green-belt or prohibited-zone boundaries around Dal, Nigeen, Ishber, Nishat, or Habak?',
      'Were statutory compounding fees ever used to regularize plinth or storey deviations inside ecologically sensitive buffers?',
    ],
    evidenceAndMethods: [
      'Published LCMA BOCA meeting minutes, sanction orders, and Srinagar Master Plan 2000–2021 / 2015–2035 land-use maps',
      'High Court orders scrutinizing repair-permission committees and prohibited-zone relaxations',
      'Spatial cross-check of sanctioned building coordinates against Master Plan buffer layers',
    ],
    deliverable:
      'Longitudinal database specification of lakeside BOCA permissions, rejections, and zonal boundary shifts.',
    methodologicalCaveat:
      'A structure possessing a BOCA repair permit may still involve illegal encroachment if executed beyond sanctioned plinth dimensions—requiring field/satellite comparison against sanctioned drawings.',
  },
  {
    number: 32,
    code: '32',
    slug: 'chapter-32-2014-floods-and-disappearance-of-fourteen-years-of-enforcement-records',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      'The 2014 Srinagar Floods and the Reported Loss of Fourteen Years of Enforcement Records (2000–September 2014)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In July 2025, Greater Kashmir reported a formal Right to Information disclosure from LCMA’s Enforcement Wing stating that enforcement records spanning more than fourteen years—from 2000 through September 2014—had been damaged during the catastrophic September 2014 Kashmir floods, while 2,916 illegal constructions and encroachments were reported removed from October 2014 onward.',
      'While the September 2014 inundation genuinely submerged ground-floor government offices across Srinagar, the absence of digitized backups or off-site duplicates erased the primary administrative paper trail across the exact years when post-1997 LAWDA oversight, the 2009 eight-official High Court inquiry, and the 2007–2014 CAG land-use losses unfolded.',
    ],
    investigativeQuestions: [
      'Which exact categories of files (show-cause notices, demolition registers, watcher diaries, compounding orders, departmental inquiries) were lost in September 2014, and was a formal damaged-record inventory ever certified?',
      'Why were fourteen years of statutory enforcement registers maintained without off-site or electronic duplication prior to September 2014?',
      'How has the absence of pre-September 2014 enforcement files affected ongoing prosecutions, civil title disputes, and historical accountability audits?',
    ],
    evidenceAndMethods: [
      'July 2025 LCMA Enforcement Wing RTI reply (reported by Greater Kashmir) and follow-up RTI requests for post-flood archival damage inventories',
      'J&K Public Records Act / departmental record-retention manuals governing statutory enforcement registers',
      'Audit of pending pre-2014 litigation files affected by missing departmental originals',
    ],
    deliverable:
      'Forensic accountability audit of the 2000–September 2014 enforcement-archive gap.',
    methodologicalCaveat:
      'Reported flood damage to paper files does NOT establish intentional destruction or cover-up; investigative rigour lies in testing backup compliance and rebuilding the lost record from surviving external archives.',
  },
  {
    number: 33,
    code: '33',
    slug: 'chapter-33-reconstructing-damaged-archives-through-parallel-registries',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      'Reconstructing Damaged Archives Through Revenue Registries, Court Filings and Parallel Departmental Ledgers',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'A lake’s legal memory does not reside inside a single basement filing cabinet. Throughout 2000–2014, LAWDA routinely filed status reports, violation lists, and compliance affidavits before the Jammu & Kashmir High Court, lodged FIRs at local police stations and the Vigilance Organization, corresponded with the Divisional Commissioner and Revenue Tehsildars, and left physical signatures across continuous satellite archives.',
      'This chapter designs a multi-archive triangulation workflow to reconstruct pre-September 2014 enforcement history by harvesting duplicate records preserved in judicial registries, police station roznamchas, revenue offices, and orbital imagery.',
    ],
    investigativeQuestions: [
      'How many pre-September 2014 violation lists, status reports, and court-commissioner inventories remain intact inside the Jammu & Kashmir High Court PIL record room?',
      'Which police stations around Dal and Nigeen (Nigeen, Nishat, Ram Munshi Bagh, Khanyar, Lal Bazar, Hazratbal) hold intact FIR registers from 2000–2014 referencing LAWDA complaints?',
      'Can continuous 2000–2014 satellite change detection paired with Revenue jamabandis independently re-identify unpermitted structures built during the lost-record era?',
    ],
    evidenceAndMethods: [
      'High Court PIL case dockets (2002–2014), CSE litigation compilations, and court-commissioner annexures',
      'Police station FIR index ledgers and Anti-Corruption Bureau / Vigilance case archives (such as records underlying FIR No. 48/2015)',
      'Annual 2000–2014 Landsat 7/8 and commercial high-resolution optical building-emergence catalogs',
    ],
    deliverable:
      'Reconstructed 2000–2014 Secondary Enforcement Archive cross-linking judicial, police, revenue, and satellite evidence.',
    methodologicalCaveat:
      'Secondary archive reconstruction recovers reported violations and physical structures but may not recover unfiled internal show-cause notices that never reached court or police dockets.',
  },
  {
    number: 34,
    code: '34',
    slug: 'chapter-34-from-lawda-to-lcma-restructuring-and-jurisdictional-overlaps',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      'From LAWDA to LCMA: Rebranding, Administrative Restructuring and Unresolved Jurisdictional Overlaps',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Reconstituting LAWDA as the Jammu & Kashmir Lake Conservation and Management Authority (LCMA) promised sharper conservation focus, modernized enforcement, and unified management. Yet CAG Report No. 4 of 2025 and ongoing judicial proceedings indicate that deep structural weaknesses—delayed physical demarcation, incomplete surveillance, unrecovered acquired land, and inter-departmental friction—persisted across the institutional rename.',
      'This chapter evaluates what actually changed in statutory authority, scientific staffing, digital record-keeping, and public transparency when LAWDA became LCMA—and what remained unchanged.',
    ],
    investigativeQuestions: [
      'Did the transition from LAWDA to LCMA expand statutory powers over feeder tributaries, municipal sewage inflows, or R&B road alignments?',
      'Were dedicated limnologists, GIS analysts, and cadastral surveyors embedded into LCMA’s core decision structure, or did civil-engineering contracting remain dominant?',
      'Has LCMA instituted tamper-evident, cloud-backed public registries of every notice, permit, demolition, and restored parcel since reorganization?',
    ],
    evidenceAndMethods: [
      'Statutory notifications establishing LCMA, organizational charts, and annual administrative/financial statements',
      'CAG Report No. 4 of 2025 institutional-governance and human-resource audit chapters',
      'Cross-synthesis with Monograph 10 (The Laboratory That Kashmir Lost) on scientific capacity inside lake administration',
    ],
    deliverable:
      'Before-and-after institutional comparison of LAWDA versus LCMA statutory powers, scientific capacity, and transparency.',
    methodologicalCaveat:
      'Institutional reforms require multi-year outcome windows; evaluation must test concrete transparency and water-recovery metrics rather than dismissing reorganization a priori.',
  },
  {
    number: 35,
    code: '35',
    slug: 'chapter-35-delayed-cctv-surveillance-network-audit-2015-2022',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'LAWDA and the Evolution of Regulatory Authority',
    title:
      'The Delayed CCTV Surveillance Network (2015–2022): Auditing ₹4.55 Crore Expenditure, 19/40 km Cabling and Blind Spots',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Recognizing that nocturnal earth tipping and rapid plinth construction routinely outpaced manual boat patrols, LCMA proposed an electronic CCTV shoreline surveillance network in December 2015. Yet CAG Report No. 4 of 2025 revealed that despite ~₹4.55 crore released between 2017 and 2022, initial implementation achieved only 19 km of the 40 km cable network (47.5%) and 9 of 20 camera poles (45%), marred by contractual payment irregularities and unmonitored vulnerable zones.',
      'Although the government subsequently reported completion of Phase I and plans for expansion, this chapter audits the spatial coverage, camera uptime, archival video retention, and measurable deterrence effect of the CCTV network through 2026.',
    ],
    investigativeQuestions: [
      'Which shoreline sectors received the initial 9 camera poles and 19 km of cable, and which CAG-identified encroachment hotspots remained outside camera view for seven years?',
      'What specific contractual payment irregularities did CAG Report No. 4 of 2025 document in the ₹4.55 crore surveillance procurement?',
      'In sectors now covered by Phase I cameras, do October 2024–October 2026 satellite and field reports (including Miskeen Bagh and interior channels) show reduced soil-filling rates?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 procurement and physical-verification findings on LCMA CCTV implementation',
      'Viewshed GIS modelling of installed camera pole coordinates and optical ranges across Dal–Nigeen shorelines',
      'Comparison of CCTV-monitored versus unmonitored shoreline segments against post-2022 violation logs',
    ],
    deliverable:
      'Spatial viewshed and value-for-money audit of the Dal Lake electronic surveillance system.',
    methodologicalCaveat:
      'Fixed perimeter cameras cannot see behind dense willow belts or inside interior Mir Behri / Lokut Dal islands; satellite radar/optical monitoring remains indispensable even with 100% pole installation.',
  },

  // ── VOLUME VI: THE ADMINISTRATION–ENCROACHER NEXUS: OFFICIAL INVESTIGATIONS (36–43) ─
  {
    number: 36,
    code: '36',
    slug: 'chapter-36-analytical-framework-for-institutional-complicity',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'Analytical Framework for Institutional Complicity: Separating Systemic Loopholes From Proven Criminal Collusion',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Public discourse in Kashmir frequently speaks of an "official–encroacher nexus" as an undifferentiated monolith, while defensive official responses dismiss irregularities as isolated lapses by junior staff. Environmental criminology requires a far sharper evidentiary taxonomy distinguishing four phenomena: statutory ambiguity, resource/security incapacity, passive regulatory forbearance, and active corrupt facilitation.',
      'This chapter establishes the legal and criminological standards governing Volume VI—ensuring every allegation is anchored to official judicial, departmental, or Anti-Corruption Bureau records while upholding due process and the presumption of innocence.',
    ],
    investigativeQuestions: [
      'What distinct evidentiary signatures separate passive administrative overload from active selective facilitation of unauthorized lakeside construction?',
      'At which procedural chokepoints—beat inspection, notice service, BOCA scrutiny, demolition scheduling, utility hookup, or stay-order litigation—does regulatory capture typically occur?',
      'How do evidentiary standards differ across journalistic reporting, departmental service inquiries, High Court PIL oversight, and criminal anti-corruption trials?',
    ],
    evidenceAndMethods: [
      'Environmental-criminology and urban land-governance analytical frameworks adapted to South Asian wetland regulation',
      'Prevention of Corruption Act jurisprudence, J&K Civil Services (Classification, Control and Appeal) Rules, and evidentiary due-process standards',
      'Process-tracing across the 8-stage regulatory accountability chain defined in Part VI',
    ],
    deliverable:
      'Evidentiary classification matrix governing all official-collusion and regulatory-failure investigations.',
    methodologicalCaveat:
      'Systemic non-enforcement proves institutional failure, whereas criminal corruption requires individualized proof adjudicated by a competent court.',
  },
  {
    number: 37,
    code: '37',
    slug: 'chapter-37-march-2009-divisional-commissioner-inquiry-naming-eight-lawda-officials',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'The March 2009 Divisional Commissioner Inquiry Naming Eight LAWDA Officials: Tracing Disciplinary Outcomes',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'More than eleven years before the December 2020 ACB charge sheet, the Centre for Science and Environment’s Dal Lake litigation chronology records that in March 2009 the Jammu & Kashmir High Court acted upon an official inquiry report from the Divisional Commissioner naming eight LAWDA officials in connection with alleged unauthorized construction in prohibited lake zones.',
      'In regulatory governance, announcing an inquiry during a heated court hearing often satisfies immediate public scrutiny while subsequent departmental proceedings quietly stall. This chapter traces the complete post-2009 service-record trajectory of that inquiry.',
    ],
    investigativeQuestions: [
      'What specific prohibited-zone constructions and supervisory lapses were documented in the Divisional Commissioner’s March 2009 inquiry report to the High Court?',
      'Were formal departmental charge sheets issued against the eight named officials, and did those proceedings end in penalties, exonerations, retirements, or administrative limbo?',
      'What happened physically to the prohibited-zone buildings that triggered the March 2009 inquiry—do they stand today as occupied real estate?',
    ],
    evidenceAndMethods: [
      'Centre for Science and Environment (CSE) Dal Lake judicial archive and March 2009 J&K High Court PIL orders',
      'Right to Information requests to Housing & Urban Development Department and LCMA regarding final disciplinary orders on the 2009 inquiry',
      'Satellite verification of the 2009 inquiry site coordinates between 2009 and 2026',
    ],
    deliverable:
      'Longitudinal outcome docket tracking both the disciplinary and physical parcel fate of the March 2009 High Court inquiry.',
    methodologicalCaveat:
      'Inclusion in a Divisional Commissioner preliminary inquiry does not prove guilt; exoneration orders, if issued on merit, must be reported with equal prominence.',
  },
  {
    number: 38,
    code: '38',
    slug: 'chapter-38-court-appointed-commissioners-and-vigilance-directives-2002-2015',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'Court-Appointed Commissioners and Vigilance Directives (2002–2015): Field Reports That Triggered Criminal Scrutiny',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Faced with recurring discrepancies between soothing official status affidavits and visible concrete rising along Nishat, Ishber, Nigeen, and Foreshore Road, the Jammu & Kashmir High Court repeatedly appointed independent advocates and expert commissioners to conduct unannounced site inspections—culminating in the October 28, 2015 High Court directions that initiated ACB FIR No. 48/2015.',
      'This chapter compiles and maps the field observations recorded by court-appointed commissioners between 2002 and 2015, examining why independent judicial spot-checks repeatedly detected active multi-storey construction that routine departmental ward patrols had failed to halt.',
    ],
    investigativeQuestions: [
      'What systematic discrepancies did court-appointed commissioners document between ground reality and LAWDA enforcement status reports prior to October 28, 2015?',
      'How frequently did court orders record instances where enforcement staff failed to respond even after ongoing unauthorized construction was brought directly to their notice?',
      'Can commissioner inspection models be institutionalized as permanent civic-scientific oversight alongside satellite alerts?',
    ],
    evidenceAndMethods: [
      'J&K High Court PIL orders (2002–2015), October 28, 2015 order, and court-appointed commissioner inspection reports',
      'Published legal summaries (including CSE and Lawsisto judicial records) documenting non-response by enforcement personnel',
      'Spatial mapping of commissioner-flagged sites across Dal and Nigeen wards',
    ],
    deliverable:
      'Chronological digest and spatial map of High Court commissioner field inspections (2002–2015).',
    methodologicalCaveat:
      'Commissioner spot-inspection reports establish prima facie field observations for judicial supervision and must be read alongside subsequent formal investigation findings.',
  },
  {
    number: 39,
    code: '39',
    slug: 'chapter-39-acb-fir-48-of-2015-and-december-2020-charge-sheet',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'ACB FIR No. 48/2015 and the December 2020 Charge Sheet: Documentary Anatomy of Alleged Enforcement Facilitation',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In December 2020—five years after the High Court’s October 28, 2015 order—the Jammu & Kashmir Anti-Corruption Bureau filed a formal charge sheet in FIR No. 48/2015 alleging that LAWDA enforcement personnel had colluded with private violators to facilitate construction undertaken without permission or in breach of sanctioned plans and Master Plan provisions around Ishber (Nishat) and Nigeen.',
      'Examining the official ACB statement strictly within legal bounds, this chapter documents the institutional mechanics alleged in the charge sheet—involving accused officials Manzoor Ahmad Bhat (LAWDA Enforcement Wing supervisor) and Parvaiz Ahmad Mir (LAWDA watcher) and accused beneficiaries Mohammad Tariq Reshi (Ishber, Nishat), Tahir Mir / Tahir Gul (Nigeen), Ghulam Mohammad Mir (Nigeen), and Mohammad Maqbool Beigh (Beigh Mohalla, Nigeen)—while explicitly affirming that all six accused enjoy the full presumption of innocence and that ultimate judicial outcomes remain unestablished.',
    ],
    investigativeQuestions: [
      'What specific statutory duties, beat-supervision procedures, and building-plan conditions were alleged in FIR No. 48/2015 to have been bypassed in Ishber and Nigeen?',
      'Why did five years elapse between the October 28, 2015 High Court direction and the December 2020 filing of the charge sheet?',
      'What has transpired in the Special Judge Anti-Corruption Court since December 2020, and what is the physical status of the disputed structures in Ishber and Nigeen?',
    ],
    evidenceAndMethods: [
      'Official J&K Anti-Corruption Bureau December 2020 press/charge-sheet statement (jkacb.in/link.php?sno=214)',
      'Publicly accessible trial-court cause lists, judicial orders, and right-of-response outreach to legal counsel of named parties',
      'High-resolution satellite comparison of the relevant Ishber and Nigeen localities (2014–2026)',
    ],
    deliverable:
      'Legally rigorous case study of FIR No. 48/2015 tracing institutional vulnerability from High Court referral to trial.',
    methodologicalCaveat:
      'A charge sheet represents prosecutorial allegations, NOT a judicial finding of guilt; all six named individuals are presumed innocent unless and until convicted by a final court of law.',
  },
  {
    number: 40,
    code: '40',
    slug: 'chapter-40-ward-level-enforcement-supervision-watcher-beats-and-duty-rosters',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'Ward-Level Enforcement Supervision, Watcher Beats and Duty-Roster Accountability Protocols',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Every square metre of Dal and Nigeen falls within an assigned administrative enforcement ward staffed by field watchers, beat officers, supervisors, and an Enforcement Officer. Earth tipping by tipper truck or multi-week masonry curing cannot physically occur without leaving visible, audible traces across multiple daily beat cycles.',
      'This chapter analyses how LCMA’s ward-level surveillance chain is structured: watcher-to-shoreline ratios, night-shift coverage, political or physical intimidation faced by junior field staff, transfer patterns in lucrative shoreline wards, and how duty rosters link physical satellite anomalies to supervisory accountability.',
    ],
    investigativeQuestions: [
      'How many enforcement wards currently partition the Dal–Nigeen local area, and what shoreline length and household count does each field watcher cover?',
      'Do field watchers possess secure digital geo-tagged reporting tools that bypass intermediate suppression of violation reports?',
      'What protection, staffing, and rotation safeguards exist so junior watchers neither face physical coercion nor remain posted indefinitely in high-value commercial wards?',
    ],
    evidenceAndMethods: [
      'LCMA Enforcement Wing ward-jurisdiction maps, staffing norms, and duty-roster rules',
      'CAG Report No. 4 of 2025 enforcement-management observations and High Court directions on beat accountability',
      'Comparative regulatory-design analysis of tamper-evident mobile field-inspection logs',
    ],
    deliverable:
      'Ward-level supervisory accountability protocol pairing satellite change timestamps with immutable beat-inspection logs.',
    methodologicalCaveat:
      'Holding field watchers solely responsible when senior authorities ignore filed reports or withhold demolition support creates scapegoating inside the bureaucracy itself.',
  },
  {
    number: 41,
    code: '41',
    slug: 'chapter-41-sanctioned-plan-deviations-repair-permits-masking-expansion',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'Sanctioned-Plan Deviations: How Repair Permits and Renovation Approvals Mask Structural Expansion',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Both High Court proceedings and the ACB’s December 2020 statement highlight a recurring mechanism distinct from wholly unpermitted building: securing a lawful BOCA permission for minor residential repair, roof replacement, or renovation, and then using that sanction banner on site to erect expanded plinths, extra storeys, or commercial guest rooms.',
      'This chapter designs a quantitative plan-versus-as-built audit methodology comparing sanctioned architectural plinth/height parameters against post-construction sub-metre satellite footprints and municipal property assessments.',
    ],
    investigativeQuestions: [
      'Among sampled BOCA repair and reconstruction permits issued between 2015 and 2025, what proportion remained within sanctioned plinth area and storey height?',
      'Are sanctioned building drawings and plinth coordinates publicly posted online and on physical site boards so neighbours and civic monitors can verify compliance?',
      'At what stage of construction are mandatory plinth-level and roof-level completion inspections conducted—or skipped?',
    ],
    evidenceAndMethods: [
      'Sampled LCMA/BOCA sanction orders compared against pre- and post-permit high-resolution optical imagery',
      'Master Plan zonal Floor Area Ratio (FAR), ground-coverage, and height regulations',
      'Audit of completion-certificate and deviation-notice registers',
    ],
    deliverable:
      'Sanctioned-versus-built deviation audit protocol and public permit-disclosure standard.',
    methodologicalCaveat:
      'Optical nadir satellite imagery measures roof overhang area accurately but requires oblique/shadow photogrammetry or field laser measurement to verify vertical storey deviations.',
  },
  {
    number: 42,
    code: '42',
    slug: 'chapter-42-utility-provisioning-to-unauthorized-structures',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'Utility Provisioning to Unauthorized Structures: Electricity, Water Supply, Road Access and Municipal Numbering',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'As Part I emphasizes, temporary or unlawful filling inside a wetland acquires the social and economic durability of permanent real estate when public agencies extend electricity connections, piped water, macadamized approach lanes, street lighting, house numbering, and tourism registrations to the resulting buildings.',
      'This chapter traces inter-departmental complicity by fragmentation: how one arm of government (LCMA) can declare a lakeside structure illegal while sister public utilities connect transformers, water mains, and paved roads that cement its market value.',
    ],
    investigativeQuestions: [
      'What statutory No-Objection Certificate (NOC) checks prevent power, water, municipal, and tourism departments from servicing unpermitted lakeside structures?',
      'How many structures listed in LCMA violation or demolition registers simultaneously hold active commercial electricity tariffs or tourism guesthouse registrations?',
      'How do judicial humanitarian doctrines on domestic utility access for historic residents differ legally from commercial utility provisioning to newly encroached hotels?',
    ],
    evidenceAndMethods: [
      'High Court PIL orders restricting utility connections to unauthorized constructions in prohibited Dal/Nigeen zones',
      'Cross-audit protocol linking LCMA violation dockets with commercial power, PHE water, SMC assessment, and Tourism registration rules',
      'Case documentation of public approach-road paving onto newly consolidated marshland',
    ],
    deliverable:
      'Inter-agency utility-compliance audit framework distinguishing humanitarian residential access from commercial regularization.',
    methodologicalCaveat:
      'Basic drinking water and electricity for verified pre-existing ancestral lake households involve constitutional dignity considerations and must never be conflated with commercial hotel hookups.',
  },
  {
    number: 43,
    code: '43',
    slug: 'chapter-43-tracking-post-fir-judicial-and-departmental-dispositions',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The Administration–Encroacher Nexus: Official Investigations',
    title:
      'Tracking Post-FIR Judicial and Departmental Dispositions Under Strict Presumption-of-Innocence Standards',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Across environmental governance in South Asia, the widest evidentiary black hole lies after headlines fade: FIRs are announced, officials are briefly attached, and inquiries are ordered, yet years later neither the public nor the legislature knows how many cases produced convictions, acquittals, disciplinary dismissals, or restored water.',
      'Operationalizing all eight stages of Part VI’s accountability table, this chapter builds a standardized disposition tracker following Dal Lake anti-corruption FIRs, police encroachments FIRs (including the eight 2016 unrest FIRs), and departmental inquiries from inception to final judicial and ecological resolution.',
    ],
    investigativeQuestions: [
      'Across all Dal–Nigeen encroachment and official-misconduct FIRs registered between 2009 and 2026, what percentage reached charge sheet, trial completion, conviction, or acquittal?',
      'In cases where courts upheld violations, was the underlying structure or earthfill physically removed and restored to water?',
      'What procedural safeguards ensure acquitted or exonerated individuals have their clearance recorded prominently in public archives?',
    ],
    evidenceAndMethods: [
      'Eight-stage judicial and administrative tracking ledger applied to ACB, police, and departmental dockets',
      'e-Courts public case-status records, High Court compliance reports, and RTI disposition disclosures',
      'Mandatory right-of-reply and exoneration-update editorial protocol',
    ],
    deliverable:
      'Standardized 8-Stage Post-FIR Disposition & Ecological Recovery Ledger.',
    methodologicalCaveat:
      'Slow trial timelines in anti-corruption courts mean pending status must never be misread as either guilt or exoneration; exact procedural stage must always be stated.',
  },

  // ── VOLUME VII: COMMERCIAL DEVELOPMENT AND PROPERTY ECONOMICS (44–50) ─────
  {
    number: 44,
    code: '44',
    slug: 'chapter-44-mechanics-of-water-to-real-estate-conversion',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'The Mechanics of Water-to-Real-Estate Conversion: From Reedbed Anchoring and Soil Tipping to Plinth Consolidation',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Open lake water rarely turns into a concrete building in a single week. Across Dal, Nigeen, and connected Srinagar wetlands, physical conversion typically unfolds through a multi-year sequence: staking willow poles along a shallow reed margin, pinning floating mats to trap silt, planting dense willow/poplar screens that block sightlines from shore roads, tipping construction rubble and karewa soil during winter/night/unrest windows, raising the plot above spring flood stage, erecting a tin fence, and finally pouring a permanent plinth.',
      'Documenting this physical sequence step by step enables satellite analysts and regulators to intervene at early, reversible stages—before consolidated land acquires occupants and litigation stays.',
    ],
    investigativeQuestions: [
      'What is the typical multi-year residence time spent in each intermediate land-cover class (OW → EV/FG → PL/CL → RB/CB) prior to building construction?',
      'How effectively do Sentinel-1 SAR backscatter coherence and dry-season SWIR reflectance detect fresh soil tipping beneath willow canopy screens?',
      'Why is physical reversal ten to fifty times less costly at the stake-and-silt stage than after concrete plinth completion?',
    ],
    evidenceAndMethods: [
      'Multi-year pixel-trajectory sequencing across confirmed conversion sites documented in CAG 2004–2022 imagery leads',
      'Geotechnical and hydrological analysis of lakebed compaction under rubble/karewa earthfill',
      'Comparative remediation-cost engineering across early versus late conversion stages',
    ],
    deliverable:
      'Six-stage physical forensic model of water-to-real-estate conversion for early-warning detection.',
    methodologicalCaveat:
      'Not every willow planting or reedbed shift is a precursor to building; early-warning flags trigger field verification rather than automatic legal accusation.',
  },
  {
    number: 45,
    code: '45',
    slug: 'chapter-45-commercial-hospitality-hotels-guesthouses-and-tourism-footprints',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'Commercial Hospitality, Hotels, Guesthouses and Shoreline Tourism Footprints Across Dal and Nigeen',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Dal and Nigeen sit at the centre of Kashmir’s tourism economy, commanding some of the highest hospitality room yields in the Western Himalayas. Along Boulevard, Dalgate, Gagribal, Nishat, Ishber, Foreshore corridors, and Nigeen, commercial hotels, boutique guesthouses, restaurants, and lawn venues generate intense economic pressure to expand parking aprons, garden decks, annexes, and lake-view storeys.',
      'This chapter audits commercial hospitality expansion separately from household shelter—cross-referencing tourism registrations, Pollution Control Committee consents-to-operate, STP connections, and historical plinth footprints.',
    ],
    investigativeQuestions: [
      'How many commercial hotels, guesthouses, and banquet/restaurant establishments operate within the Dal–Nigeen local area and 200-metre buffer zones, and how has their aggregate roof/impervious footprint changed since 2000?',
      'What proportion of lakeside hospitality units maintain verified Sewage Treatment Plant (STP) compliance under Pollution Control Committee norms?',
      'Where have residential structures in Nigeen, Ishber, or Gagribal been converted into commercial hospitality properties without land-use change sanction?',
    ],
    evidenceAndMethods: [
      'Department of Tourism J&K hotel/guesthouse registration lists and J&K Pollution Control Committee consent/closure orders',
      'High Court PIL orders regarding hotel sewage treatment and prohibited-zone commercial extensions',
      'High-resolution satellite building-expansion tracking across commercial shoreline strips (2004–2026)',
    ],
    deliverable:
      'Commercial hospitality compliance and footprint-expansion audit across Dal and Nigeen.',
    methodologicalCaveat:
      'Lawfully established pre-moratorium heritage hotels operating within sanctioned footprints and STP norms must be clearly distinguished from unauthorized post-moratorium expansions.',
  },
  {
    number: 46,
    code: '46',
    slug: 'chapter-46-circle-rates-informal-stamp-transactions-and-power-of-attorney-transfers',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'Circle Rates, Informal Stamp Transactions and Unregistered Power-of-Attorney Transfers in Lake Wards',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Where formal sale deeds are restricted over state water, kahcharai/nambal commons, or moratorium-bound lakeside parcels, de facto real-estate markets frequently operate through informal instruments: notarized agreements to sell, irrevocable powers of attorney, hiba (gift) deeds, leaseholds, or unrecorded possession transfers that monetize reclaimed plots outside formal sub-registrar scrutiny.',
      'This chapter investigates the legal and economic mechanics of lakeside land conveyancing, comparing official stamp-duty circle rates across Srinagar lakeside mauzas with formal registration volumes and court-documented informal transfer disputes.',
    ],
    investigativeQuestions: [
      'How have official government stamp-duty circle rates per kanal evolved between 2010 and 2026 across Nishat, Ishber, Guptganga, Habak, Tailbal, Nigeen, and Dalgate?',
      'What legal mechanisms have courts and registration authorities identified in disputes over informal transfers of non-proprietary lake or marsh parcels?',
      'Have Revenue mutations ever been entered over khasra numbers recorded historically as Ab-i-Dal or state wetland?',
    ],
    evidenceAndMethods: [
      'Published District Magistrate / Inspector General of Registration Srinagar stamp-duty circle-rate notifications (2010–2026)',
      'J&K High Court civil and PIL rulings addressing power-of-attorney, notarized transfers, and mutations in lakeside estates',
      'Registration Act and J&K Land Revenue Act restrictions on state-water and wetland alienation',
    ],
    deliverable:
      'Legal-economic study of formal circle-rate trajectories and informal transfer vulnerabilities in lakeside mauzas.',
    methodologicalCaveat:
      'Informal unregistered agreements lack public central registries; empirical claims must rely strictly on court-documented cases, CAG findings, and official registration notifications.',
  },
  {
    number: 47,
    code: '47',
    slug: 'chapter-47-land-valuation-modelling-per-kanal-scenarios-and-registration-records',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'Land Valuation Modelling: Testing Hypothetical Per-Kanal Scenarios Against Verified Registration Records',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Part XVI illustrates the sheer economic gravity of lakeside land conversion: even in a purely hypothetical scenario, 100 kanals (5.06 hectares) valued at ₹50 lakh per kanal represents ₹50 crore in private asset value—while the 84.1 hectares (~1,663 kanals) of net cropland/plantation and built-up expansion recorded by CAG between 2007 and 2020 underscores why minor administrative forbearance can unlock vast private windfalls.',
      'This chapter replaces back-of-the-envelope illustrations with a spatially stratified valuation methodology anchored to official circle rates across internal agricultural islands, peri-urban marsh fringes, and prime Boulevard/Nigeen commercial frontages.',
    ],
    investigativeQuestions: [
      'What is the verified range of official circle rates per kanal across different micro-zones of the Dal–Nigeen local area in 2026?',
      'How wide is the valuation gradient between an unbuildable floating vegetable bed and a road-connected consolidated plot carrying residential or commercial utility?',
      'How do administrative fines for illegal filling compare against the capital-value uplift gained when water becomes buildable land?',
    ],
    evidenceAndMethods: [
      'Stratified spatial database of Srinagar official circle rates across agricultural, residential, and commercial lakeside categories',
      'Sensitivity modelling across conservative circle-rate floors and registered sale-deed benchmarks',
      'Economic deterrence ratio comparing statutory building penalties against land-value appreciation',
    ],
    deliverable:
      'Spatially stratified circle-rate valuation model and deterrence-gap analysis for Dal–Nigeen land conversion.',
    methodologicalCaveat:
      'Hypothetical calculator scenarios (such as 100 kanals @ ₹50 lakh/kanal = ₹50 crore) must always be labelled as illustrative benchmarks and never cited as an audited valuation of illegally occupied Dal Lake land.',
  },
  {
    number: 48,
    code: '48',
    slug: 'chapter-48-supply-chains-of-lake-filling-nocturnal-earth-transport-and-quarries',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'Supply Chains of Lake Filling: Nocturnal Earth Transport, Quarry Origins and Construction Material Flows',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Converting one hectare of 1.5-metre-deep lake margin into dry buildable ground requires roughly 15,000 cubic metres of fill—equivalent to well over a thousand tipper-truck loads of karewa soil, construction demolition rubble, or quarry aggregate, often ferried further inward by flat-bottomed load barges. Soil filling inside Dal Lake is therefore an industrial logistics operation linking upland karewa excavation directly to wetland destruction.',
      'Connecting Monograph 11 with KEW’s upland karewa and riverbed mining observatories, this chapter traces the material supply chain—entry checkpoints, nocturnal tipper routes, boat-loading ghats, and vehicle-seizure outcomes.',
    ],
    investigativeQuestions: [
      'Through which road approaches and boat-transfer ghats does bulk earthfill enter shoreline and interior Dal–Nigeen sectors?',
      'How many tipper trucks, excavators, and load boats seized by LCMA and police since 2015 were forfeited versus routinely released on minor fines to resume operations?',
      'Can volumetric soil-fill estimates inside Dal wetlands be linked geochemically or logistically to unauthorized karewa cutting around Pampore, Budgam, and Chatterhama?',
    ],
    evidenceAndMethods: [
      'LCMA and police vehicle/barge seizure logs, check-post deployment maps, and October 2026 eyewitness soil-filling reports',
      'Volumetric fill estimation combining pre-fill bathymetry with post-fill elevation/optical footprints',
      'Cross-module linkage with KEW Karewa & Riverbed Mining monitoring frameworks',
    ],
    deliverable:
      'Material-flow and chokepoint interdiction map of the Dal Lake earthfilling supply chain.',
    methodologicalCaveat:
      'Seizure tallies without repeat-offender tracking or volumetric halting metrics measure patrol activity rather than supply-chain disruption.',
  },
  {
    number: 49,
    code: '49',
    slug: 'chapter-49-commercial-houseboat-mooring-expansion-decks-and-shoreline-interfaces',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'Commercial Houseboat Mooring Expansion, Deck Extensions and Sewage-Shoreline Interfaces',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In the CAG/EE&RSD land-use balance sheet, houseboats and shikara ghats occupied 15.0 ha in 2007, 19.6 ha in 2014, and 17.0 ha in 2020 (+2.0 ha net change). While heritage cedar houseboats constitute an iconic cultural asset rather than terrestrial real estate, stationary moorings backed by filled service islands, kitchen annexes, floating walkways, and unaligned vacuum-sewer connections reshape Gagribal, Dal Gate–Boulevard, and Nigeen littoral zones.',
      'This chapter distinguishes legitimate heritage houseboat preservation and timber-repair needs from unauthorized rear-island earthfilling and shoreline privatization behind moored vessels.',
    ],
    investigativeQuestions: [
      'What explains the rise in mapped houseboat and shikara-ghat area from 15.0 ha (2007) to 19.6 ha (2014) and subsequent shift to 17.0 ha (2020)—fire losses, relocations, or deck reclassifications?',
      'Where have stationary rear-shore gardens behind moored houseboats in Gagribal, Dal Gate, and Nigeen consolidated into permanent land?',
      'What percentage of registered houseboats are now connected to functioning vacuum/floating sewage collection networks?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 houseboat/ghat land-use series and sewage-connectivity audit findings',
      'High Court orders governing houseboat reconstruction, mooring realignment, and sewage hookups',
      'Sub-metre optical mapping of hull footprints versus rear-berth consolidated service plots',
    ],
    deliverable:
      'Spatial and environmental assessment separating heritage vessel conservation from rear-mooring land consolidation.',
    methodologicalCaveat:
      'Houseboat owners face genuine heritage preservation costs and strict timber caps; policy analysis must separate compliant licensed vessels from unauthorized land reclamation.',
  },
  {
    number: 50,
    code: '50',
    slug: 'chapter-50-beneficiary-typology-subsistence-shelter-versus-speculative-syndicates',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Commercial Development and Property Economics',
    title:
      'Beneficiary Typology: Distinguishing Subsistence Shelter From Speculative Rent-Seeking and Commercial Syndicates',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Asking "who is turning Dal Lake into real estate?" requires disaggregating economic beneficiaries rather than issuing blanket denunciations. Across 1859–2026, land conversion has served markedly different actors: subsistence cultivators extending vegetable beds, crowded island families adding a single room, urban middle-class buyers acquiring peri-lake plots, commercial tourism operators expanding lakefront hospitality, speculative intermediaries assembling marsh parcels, and state departments routing roads across channels.',
      'Closing Volume VII, this chapter formalizes an empirical beneficiary-classification methodology linking parcel scale, capital intensity, architectural typology, and ownership records.',
    ],
    investigativeQuestions: [
      'When post-2007 built-up expansion (+28.2 ha in CAG data) is stratified by building footprint size and functional use, what share belongs to commercial/large-villa structures versus modest domestic dwellings?',
      'Do multi-parcel ownership clusters or recurring intermediaries appear across lakeside sub-registrar, municipal, or litigation records?',
      'How should graduated legal remedies distinguish subsistence housing regularizations/relocations from commercial disgorgement and ecological restoration?',
    ],
    evidenceAndMethods: [
      'Building-footprint size, roof-type, and compound-area stratification using high-resolution satellite OBIA',
      'Public litigation dockets, BOCA files, commercial tax/tourism registries, and revenue records',
      'Proportional environmental-remedy jurisprudence across Indian constitutional and NGT courts',
    ],
    deliverable:
      'Empirical Beneficiary Typology Matrix informing proportionate legal accountability and socially just restoration.',
    methodologicalCaveat:
      'Parcel-level beneficial ownership remains unverified until official revenue, municipal, and registration ledgers are systematically cross-matched.',
  },

  // ── VOLUME VIII: GOVERNMENT INFRASTRUCTURE AND HYDROLOGICAL OBSTRUCTION (51–57) ─
  {
    number: 51,
    code: '51',
    slug: 'chapter-51-the-state-as-land-use-actor-symmetric-environmental-scrutiny',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'The State as Land-Use Actor: Evaluating Public-Sector Construction Under Symmetric Environmental Scrutiny',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Conventional anti-encroachment narratives cast government exclusively as the beleaguered guardian of Dal Lake and private citizens exclusively as the violators. CAG Report No. 4 of 2025 shatters that binary by documenting how public-sector roads, retaining walls, embankments, and departmental interventions directly narrowed feeder streams and obstructed drainage channels essential to the lake’s survival.',
      'This chapter establishes the constitutional and scientific principle of symmetric environmental scrutiny: concrete poured by a government engineering division inside a feeder watercourse obstructs hydrology just as severely as concrete poured by a private builder.',
    ],
    investigativeQuestions: [
      'What statutory environmental clearance or LCMA concurrence procedures govern public-sector civil works inside the Dal–Nigeen watershed?',
      'How many hectares of historical lake margin, causeway buffer, and tributary cross-section have been occupied by public roads, parking lots, utilities, and institutional buildings since 1962?',
      'Have LCMA enforcement wings ever issued stop-work or restoration orders against sister government engineering departments, and with what result?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 public-infrastructure and watercourse-obstruction findings',
      'Inventory of government infrastructure class (GI) footprints across the Dal–Nigeen local area and feeder network',
      'Public-trust doctrine jurisprudence holding state infrastructure agencies to strict ecological non-degradation duties',
    ],
    deliverable:
      'Public-Sector Land-Use & Hydrological Impact Ledger across the Dal–Nigeen basin.',
    methodologicalCaveat:
      'Essential public utilities (such as properly sited STPs or flood-control gates) serve public welfare; audit scrutiny evaluates hydrological compatibility and statutory authorization rather than opposing civic infrastructure per se.',
  },
  {
    number: 52,
    code: '52',
    slug: 'chapter-52-roads-and-buildings-department-four-watercourse-blockages',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'Roads and Buildings Department Interventions: Auditing the Four CAG-Documented Watercourse Blockages',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'CAG Report No. 4 of 2025 specifically recorded blockage of watercourses at four locations caused by road construction undertaken by the Roads and Buildings (R&B) Department, including road alignments cutting through drainage channels at Chatterhama and DFO Bagh.',
      'Replacing open-span bridges with earthen road fills or undersized pipe culverts starves downstream lake basins of oxygenated inflow while aggravating upstream flash-flood ponding. This chapter conducts an engineering and administrative post-mortem of all four R&B watercourse blockages.',
    ],
    investigativeQuestions: [
      'What are the exact coordinates, project sanction numbers, hydraulic design calculations (if any), and execution dates of the four R&B road-related watercourse blockages cited by the CAG?',
      'Did the R&B Department seek or obtain prior hydrological clearance from Irrigation & Flood Control or LCMA before filling or culverting those channels?',
      'What engineering retrofits (box culverts, clear-span bridges, channel de-culverting) are required to restore pre-construction conveyance at all four sites?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 audit paragraphs on R&B Department road blockages and departmental replies',
      'R&B Detailed Project Reports (DPRs), tender drawings, and Irrigation & Flood Control hydraulic standards',
      'Field cross-sectional culvert surveys and pre/post-construction high-resolution satellite imagery',
    ],
    deliverable:
      'Engineering audit and hydraulic remediation design brief for the four CAG-documented R&B watercourse blockages.',
    methodologicalCaveat:
      'CAG text extraction establishes the four R&B blockage findings; exact culvert invert elevations and peak-flow bottlenecks require field total-station measurement.',
  },
  {
    number: 53,
    code: '53',
    slug: 'chapter-53-chatterhama-nallah-forensic-profile-narrowing-60-70-ft-to-3-4-ft',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'Chatterhama Nallah Forensic Profile: Localized Narrowing From 60–70 Feet to 3–4 Feet (93–96% Reduction)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Few figures in the official audit capture the strangulation of Dal Lake’s catchment arteries more vividly than Chatterhama Nallah: CAG inspectors recorded a watercourse whose earlier reported width of 60–70 feet had been reduced at audited points to just 3–4 feet—an approximate localized width reduction of 93–96% associated with road-related obstruction and corridor encroachment.',
      'While rigorously noting that 60–70 ft → 3–4 ft represents a localized cross-sectional width observation rather than a uniform measurement of the entire stream length, a 93–96% bottleneck acts as a hydraulic choke valve controlling everything downstream. This chapter maps Chatterhama Nallah from headwaters to confluence.',
    ],
    investigativeQuestions: [
      'Along what exact longitudinal reach (in metres) of Chatterhama Nallah does severe constriction occur, and how does channel width vary every 50 metres from source to confluence?',
      'Which segments of the 60–70 ft historical revenue khasra width of Chatterhama Nallah were occupied by public road widening versus private boundary walls or earthfill?',
      'How has the 3–4 ft bottleneck altered peak storm-flow velocity, upstream flooding, sediment trapping, and freshwater delivery toward the northern Dal catchment?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 Chatterhama inspection findings paired with Revenue village musavi stream-width records',
      'Declassified CORONA (1960s–1972) and 2004–2026 sub-metre satellite longitudinal channel-width profiling',
      '1D/2D HEC-RAS hydraulic conveyance modelling across the 3–4 ft constriction reach',
    ],
    deliverable:
      'Complete source-to-mouth cadastral and hydraulic profile of Chatterhama Nallah.',
    methodologicalCaveat:
      'Reported CAG widths (60–70 ft to 3–4 ft) represent localized cross-sections rather than stream-wide averages or direct volumetric discharge measurements.',
  },
  {
    number: 54,
    code: '54',
    slug: 'chapter-54-saidnar-nallah-forensic-profile-narrowing-100-150-ft-to-25-30-ft',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'Saidnar Nallah Forensic Profile: Localized Narrowing From 100–150 Feet to 25–30 Feet (70–83% Reduction)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In a second striking catchment case recorded by the CAG audit, Saidnar Nallah contracted from an earlier reported width of 100–150 feet to a subsequently observed width of 25–30 feet—an approximate localized width reduction of 70–83% removing three-quarters of the historical floodway cross-section.',
      'When a 100–150 foot mountain-piedmont torrent bed is squeezed down to 25–30 feet, seventy to one hundred twenty feet of former public stream corridor does not vanish into thin air; it becomes adjacent road shoulder, plantation, walled compound, or reclaimed plot. This chapter traces where that missing channel width went.',
    ],
    investigativeQuestions: [
      'What cadastral tenure status (Gair Mumkin Nallah / state watercourse) governs the missing 70–120 feet of historical width along Saidnar Nallah?',
      'Which specific public engineering works or private boundary encroachments narrowed Saidnar Nallah across 1972, 2004, 2014, and 2026?',
      'What flood-stage backwater hazard does a 25–30 ft constriction pose under high-intensity cloudburst or snowmelt-on-rain events in the Zabarwan–Dachigam foothills?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 Saidnar Nallah audit record and Tehsil Srinagar/North cadastral stream-corridor maps',
      'Multi-temporal aerial/satellite bankline extraction along Saidnar Nallah at 25-metre transect spacing',
      'Return-period flood discharge routing (10-year, 50-year, 100-year) through historical versus constricted cross-sections',
    ],
    deliverable:
      'Cadastral encroachment map and flood-hazard hydraulic assessment for Saidnar Nallah.',
    methodologicalCaveat:
      'As with Chatterhama, CAG width figures (100–150 ft to 25–30 ft) reflect localized cross-sections and must be complemented by full-reach transect surveys.',
  },
  {
    number: 55,
    code: '55',
    slug: 'chapter-55-tailbal-nallah-dfo-bagh-bata-khul-and-maloori-nallah-interventions',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'Tailbal Nallah, DFO Bagh, Bata Khul and Maloori Nallah: Retaining Walls, Channel Plantations and Waste Filling',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Beyond Chatterhama and Saidnar, CAG Report No. 4 of 2025 documented a constellation of feeder disturbances: retaining-wall construction within the earlier channel alignment of Tailbal Nallah at Khawaja Colony, road construction through drainage channels at DFO Bagh, land filling and solid-waste deposition in Bata Khul, and arboricultural plantation directly inside the active drainage channel of Maloori Nallah.',
      'Because Tailbal Nallah supplies roughly four-fifths of Dal Lake’s surface freshwater inflow, building rigid retaining walls inside its active alignment alters sediment transport velocity—jetting coarse silt deeper into Hazratbal Basin while severing floodplain attenuation.',
    ],
    investigativeQuestions: [
      'Which engineering agency designed and funded the retaining wall built inside Tailbal Nallah’s earlier channel alignment at Khawaja Colony, and by how many metres did it narrow the active bed?',
      'Who authorized or conducted tree plantation inside Maloori Nallah’s drainage bed and waste/soil filling along Bata Khul?',
      'How do alterations along Tailbal Nallah interact with operation of the nearby siltation/settling basin above Hazratbal?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 locality tables for Tailbal Nallah (Khawaja Colony), DFO Bagh, Bata Khul, and Maloori Nallah',
      'Irrigation & Flood Control / LCMA catchment-management project files and settling-basin dredging logs',
      'Multi-date high-resolution satellite and field transect mapping across all four channels',
    ],
    deliverable:
      'Four-waterway forensic engineering dossier covering Tailbal Nallah, DFO Bagh, Bata Khul, and Maloori Nallah.',
    methodologicalCaveat:
      'Channel retaining walls sometimes protect legitimate bankside homes from erosion; engineering critique focuses specifically on walls Alignment-shifted inward into the active bed.',
  },
  {
    number: 56,
    code: '56',
    slug: 'chapter-56-foreshore-roads-embankment-bunds-and-culvert-constrictions',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'Foreshore Roads, Embankment Bunds and Culvert Constrictions: Hydraulic Isolation of Peripheral Wetlands',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Constructed originally with the stated aim of defining a hard boundary to halt further peripheral encroachment, Northern Foreshore Road, Nishat–Shalimar–Habak embankments, internal causeways, and Nigeen ring roads paradoxically severed outlying littoral marshes from main-lake circulation—turning cut-off shallow pockets on the landward side of the bunds into stagnant, easily filled real estate.',
      'This chapter evaluates the "boundary-road paradox" across Dal and Nigeen: testing how road embankments, pedestrian promenades, and cycle tracks transformed dynamic wetland transitions into hardened urban frontage.',
    ],
    investigativeQuestions: [
      'How many hectares of historical littoral wetland landward of Northern Foreshore Road and Nigeen ring roads transitioned into consolidated cropland or built-up colonies after embankment construction?',
      'What is the combined hydraulic cross-sectional area of bridges and culverts piercing Dal Lake’s causeways today compared with pre-1970 open-arch crossings?',
      'Where have lake-rejuvenation or smart-city shoreline beautification works added impervious concrete or narrowed littoral reed margins?',
    ],
    evidenceAndMethods: [
      'Pre- and post-Foreshore Road Landsat/CORONA land-use comparison along the Habak–Shalimar–Nishat arc',
      'Field inventory and hydraulic flow measurement across every causeway bridge and culvert inside Dal–Nigeen',
      'Audit of contemporary shoreline promenade and embankment DPRs against wetland-buffer rules',
    ],
    deliverable:
      'Hydraulic and land-use impact evaluation of foreshore roads, causeways, and shoreline hardscaping.',
    methodologicalCaveat:
      'Removing primary public transport roads is unrealistic; actionable engineering focuses on replacing solid causeway segments with wide clear-span bridges and protecting landward marsh pockets.',
  },
  {
    number: 57,
    code: '57',
    slug: 'chapter-57-catchment-urbanization-batapora-saidpora-and-mirza-bagh-colony',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Government Infrastructure and Hydrological Obstruction',
    title:
      'Catchment Urbanization in Batapora, Saidpora and Mirza Bagh Colony: Tributary Chokepoints and Flood Risk',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Completing the nine-site hydrological obstruction ledger from CAG Report No. 4 of 2025, auditors documented unauthorized private construction affecting a watercourse at Azad Colony, Batapora, unauthorized construction within the catchment at Saidpora, and encroachment affecting a lake tributary at Mirza Bagh Colony.',
      'Together, these northern peri-urban colonies illustrate how unregulated residential sprawl across Srinagar’s expanding northern fringe converts permeable orchard/paddy recharge zones and natural stream buffers into impervious roof-and-drain networks discharging untreated sullage and flash runoff into Hazratbal and Nigeen.',
    ],
    investigativeQuestions: [
      'How rapidly did impervious built-up cover expand across Batapora, Saidpora, and Mirza Bagh Colony between 2004, 2014, and 2026?',
      'Which authority—SMC, SDA, LCMA, or Rural Development/Panchayat—exercised building-permission jurisdiction over Azad Colony (Batapora), Saidpora, and Mirza Bagh Colony when those encroachments occurred?',
      'What storm-sewer and tributary buffer-recovery interventions are needed across northern catchment colonies to protect Dal Lake’s inflows?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 catchment encroachment findings for Azad Colony (Batapora), Saidpora, and Mirza Bagh Colony',
      'Sentinel-2 and Cartosat/high-resolution impervious-surface mapping across the northern Srinagar–Hazratbal peri-urban belt',
      'Jurisdictional boundary overlay across SMC wards, SDA Master Plan limits, and LCMA catchment zones',
    ],
    deliverable:
      'Northern catchment urbanization and tributary-buffer accountability dossier.',
    methodologicalCaveat:
      'Catchment residential growth outside prohibited lake buffers is not automatically illegal; violations arise specifically where structures lack sanction or encroach statutory watercourse buffers.',
  },

  // ── VOLUME IX: THE MATHEMATICS OF LOST WATER SURFACE (58–65) ──────────────
  {
    number: 58,
    code: '58',
    slug: 'chapter-58-deconstructing-2007-2020-cag-eersd-balance-sheet',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Deconstructing the 2007–2020 CAG / EE&RSD Balance Sheet Across the Fixed 2,460.5-Hectare Polygon',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Unlike multi-author historical studies whose outer boundaries shift between 31.84 km² and 24.02 km², the land-use assessment prepared by the Department of Ecology, Environment and Remote Sensing (EE&RSD) and published in CAG Report No. 4 of 2025 enforces strict mass conservation across a constant 2,460.5-hectare (24.605 km²) polygon in 2007, 2014, and 2020—ensuring every hectare lost from one class must appear as an exact gain in another.',
      'This chapter audits the complete seven-class zero-sum ledger: open water and submerged vegetation (−249.8 ha) and parks/grassland/vacant land (−4.3 ha) declined by a combined 254.1 ha, balanced exactly by gains in floating vegetation (+153.4 ha), cropland/plantation (+55.9 ha), built-up land (+28.2 ha), floating gardens (+14.6 ha), and houseboats/ghats (+2.0 ha).',
    ],
    investigativeQuestions: [
      'Which satellite sensors, spatial resolutions, and seasonal acquisition dates did EE&RSD use for the 2007, 2014 (pre- or post-September flood?), and 2020 classifications?',
      'What exact outer boundary defines the 2,460.5-hectare EE&RSD mask compared with the 2,404-hectare academic historical polygon (+56.5 ha difference)?',
      'Why did parks, grassland, and vacant land dip sharply from 40.3 ha (2007) to 11.0 ha (2014) before rebounding to 36.0 ha (2020)?',
    ],
    evidenceAndMethods: [
      'Extracted land-use tables from CAG Report No. 4 of 2025 and RTI request to EE&RSD for underlying GIS shapefiles and sensor metadata',
      'Accounting identity verification across all seven land-use classes in 2007, 2014, and 2020',
      'Comparison of 2014 pre-flood versus post-flood sediment/water spectral signatures',
    ],
    deliverable:
      'Complete technical audit and metadata verification of the 2,460.5-hectare CAG/EE&RSD balance sheet.',
    methodologicalCaveat:
      'Because CAG PDF screenshot retrieval failed during preliminary review, extracted tabular values were verified mathematically (all three columns sum to exactly 2,460.5 ha; net changes sum to 0.0 ha), while original vector maps remain to be obtained from EE&RSD.',
  },
  {
    number: 59,
    code: '59',
    slug: 'chapter-59-10-15-percent-versus-16-22-percent-category-relative-water-loss',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      '10.15% Versus 16.22%: Mathematical Proof of Category-Relative Open-Water Loss (−249.8 Hectares)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'When CAG Report No. 4 of 2025 entered public discussion in April 2026, newspapers widely reported that Dal Lake’s open water had shrunk by 10.15%. Mathematically, 249.8 ha ÷ 2,460.5 ha = 10.1524%—meaning 10.15% is the percentage-point decline in open water’s share of the entire mapped polygon (from 62.61% in 2007 down to 52.46% in 2020), NOT the percentage of existing open water that disappeared.',
      'Measured against the 2007 open-water and submerged-vegetation baseline itself, losing 249.8 hectares out of 1,540.5 hectares constitutes a 16.22% contraction (16.2155%)—nearly one-sixth of the lake’s remaining aquatic column lost in just thirteen years.',
    ],
    investigativeQuestions: [
      'How does conflating percentage-point share reductions (10.15 pp) with relative category losses (16.22%) systematically understate ecological shrinkage in official and media reporting?',
      'What were the intermediate sub-period relative contraction rates during 2007–2014 (−119.1 ha, or −7.73%) versus 2014–2020 (−130.7 ha, or −9.20% over six years)?',
      'Why did the annualized loss rate actually steepen from 17.0 ha/yr (2007–2014) to 21.8 ha/yr (2014–2020) despite intensified judicial monitoring and surveillance spending?',
    ],
    evidenceAndMethods: [
      'Exact ratio and percentage-point decomposition of CAG/EE&RSD 2007, 2014, and 2020 tabular values',
      'Sub-interval annualized rate comparison (2007–2014 seven-year span vs. 2014–2020 six-year span)',
      'Media-literacy content audit of April 2026 reporting on CAG Report No. 4 of 2025',
    ],
    deliverable:
      'Published mathematical correction note and sub-period rate decomposition (2007–2014 vs. 2014–2020).',
    methodologicalCaveat:
      'Both 10.15% (share of total polygon) and 16.22% (share of 2007 water category) are mathematically exact when their denominators are stated explicitly.',
  },
  {
    number: 60,
    code: '60',
    slug: 'chapter-60-interpreting-historical-averages-responsibly-without-extrapolation',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Interpreting Historical Averages Responsibly: 19.2 ha/yr, 31.6 kanals/mo and 527 m²/day Without Extrapolation Fallacies',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Expressed across familiar Kashmir land units (1 hectare = 19.7684 kanals ≈ 2.471 acres), the net 2007–2020 reduction of 249.8 hectares in open water and submerged vegetation equals ~4,938 kanals (~617 acres)—an arithmetic thirteen-year average of 19.2 hectares per year, 31.6 kanals per month, or 527 square metres per day.',
      'While unit translations make abstract remote-sensing figures legible to citizens and legislators, this chapter enforces a strict statistical guardrail: 527 m²/day is a retrospective 2007–2020 net aquatic-category average (heavily influenced by +153.4 ha of floating vegetation), NOT a live clock of daily illegal land theft in 2026.',
    ],
    investigativeQuestions: [
      'When +153.4 ha of floating-vegetation expansion is separated out, what were the 2007–2020 annualized rates specifically for cropland/plantation (+4.30 ha/yr; ~7.1 kanals/mo) and built-up land (+2.17 ha/yr; ~3.6 kanals/mo)?',
      'Why is linear forward extrapolation of 2007–2020 rates to 2026 or 2050 scientifically invalid without post-2020 deweeding and satellite observations?',
      'How should public dashboards display historical rate equivalents so readers never mistake retrospective averages for live telemetry?',
    ],
    evidenceAndMethods: [
      'Disaggregated annualized, monthly, and daily unit conversions across reversible (floating vegetation) versus durable (cropland/built-up) classes',
      'Time-series non-linearity testing across 1859–2013 and 2007–2020 intervals',
      'KEW dashboard disclosure rules prohibiting simulated "live loss tickers"',
    ],
    deliverable:
      'Disaggregated unit-conversion reference table separating macrophyte shifts from durable terrestrial expansion.',
    methodologicalCaveat:
      'Retrospective averages summarize past intervals; representing 527 m²/day as an ongoing 2026 permanent-encroachment rate violates KEW scientific integrity standards.',
  },
  {
    number: 61,
    code: '61',
    slug: 'chapter-61-floating-vegetation-expansion-153-4-ha-eutrophication-versus-reclamation',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Floating Vegetation Expansion (+153.4 ha): Separating Eutrophic Macrophyte Proliferation From Land Reclamation',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Three-fifths (61.4%) of the 249.8-hectare reduction in open water and submerged vegetation between 2007 and 2020 corresponded to a +153.4-hectare surge in floating vegetation—rising from 526.2 ha (2007) to 636.6 ha (2014) and 679.6 ha (2020), covering more than a quarter (27.6%) of the entire mapped lake by 2020.',
      'Conflating 679.6 ha of floating lily, lotus, Salvinia, and Azolla mats with illegal real-estate construction distorts reality; yet dismissing floating mats as harmless ignores two links: untreated sewage fuels dense mats, and persistent mats trap silt that unscrupulous actors subsequently stake and fill. This chapter models both processes.',
    ],
    investigativeQuestions: [
      'How much of the +153.4 ha floating-vegetation increase reflects untreated nutrient inflows (linking directly to Monograph 03’s sewage balance) versus seasonal acquisition timing?',
      'Which persistent 2007 floating-vegetation patches transitioned by 2020 into floating gardens (+14.6 ha) or cropland/plantation (+55.9 ha)?',
      'How durable is mechanical deweeding (such as the government’s reported ~6.5 km² clearance by 2026) when external phosphorus and nitrogen loads remain elevated?',
    ],
    evidenceAndMethods: [
      'Cross-synthesis of CAG 2007–2020 floating-vegetation series with Monograph 03 sewage/nutrient loading models',
      'Intra-annual Sentinel-2 phenological curves (March through November) tracking seasonal growth and post-deweeding regrowth rates',
      'Spatial persistence mapping identifying perennial multi-year mats at risk of terrestrial anchoring',
    ],
    deliverable:
      'Phenological and succession model linking eutrophication, mechanical deweeding durability, and mat consolidation risk.',
    methodologicalCaveat:
      'Clearing 6.5 km² of floating weeds restores visible open water spectrally within months, whereas excavating consolidated earthfill requires civil dredging—explaining why weed clearance can boost open-water figures rapidly without reversing real-estate encroachment.',
  },
  {
    number: 62,
    code: '62',
    slug: 'chapter-62-permanent-terrestrial-expansion-84-1-ha-cropland-and-built-up',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Permanent Terrestrial Expansion (+84.1 ha): Disaggregating Cropland/Plantation (+55.9 ha) and Built-Up (+28.2 ha) Gains',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Part X isolates the most consequential structural shift in the 2007–2020 CAG balance sheet: cropland and plantation grew from 229.0 ha to 284.9 ha (+55.9 ha, a 24.4% increase) while built-up land grew from 74.3 ha to 102.5 ha (+28.2 ha, a 38.0% increase)—a combined terrestrial expansion of 84.1 hectares (~1,663 kanals) inside a conserved wetland during an era of continuous High Court monitoring.',
      'Notice the temporal acceleration: cropland/plantation added +6.1 ha during 2007–2014 but +49.8 ha during 2014–2020; built-up land added +6.9 ha during 2007–2014 but +21.3 ha during 2014–2020. Fully 71.1 of the 84.1 hectares (84.5%) emerged in the six post-flood years between 2014 and 2020.',
    ],
    investigativeQuestions: [
      'Why did 84.5% of the 2007–2020 terrestrial expansion (+49.8 ha cropland/plantation and +21.3 ha built-up = +71.1 ha) occur specifically between 2014 and 2020?',
      'In a pixel-by-pixel transition matrix, how much of the +28.2 ha built-up gain replaced former cropland/vacant land versus directly replacing floating gardens or water?',
      'How much of the +49.8 ha post-2014 cropland/plantation surge reflects post-flood sediment bar colonization by willow/vegetable plots in Hazratbal and Telbal?',
    ],
    evidenceAndMethods: [
      'Sub-period decomposition of CAG/EE&RSD 2007→2014 versus 2014→2020 terrestrial classes',
      'Landsat 8 (2014) and Sentinel-2 (2015–2020) pixel-level origin-destination transition matrix across the 2,460.5 ha mask',
      'Cadastral and BOCA sanction cross-check over all post-2014 built-up polygons (+21.3 ha)',
    ],
    deliverable:
      'Origin-destination forensic audit of the 84.1-hectare (1,663-kanal) 2007–2020 terrestrial expansion, focusing on the 2014–2020 post-flood surge.',
    methodologicalCaveat:
      'Aggregate net class expansion (+84.1 ha) does not by itself prove direct water-to-building conversion or illegality on every plot until prior pixel states and legal titles are verified.',
  },
  {
    number: 63,
    code: '63',
    slug: 'chapter-63-stage-area-volume-bathymetry-and-seasonal-gauge-confounders',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Stage-Area-Volume Bathymetry: How Seasonal Gauge Fluctuations Confound Single-Date Surface-Water Estimates',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Because Dal Lake is a shallow flat-bottomed basin (mean depth ~1.4–2.0 m across large littoral shelves), a vertical water-level fluctuation of just 30 to 50 centimetres at the Dal Gate weir lock exposes or submerges tens of hectares of gently sloping mudflats, Telbal delta bars, and marsh fringes without any human encroachment or restoration taking place.',
      'This chapter derives Dal–Nigeen’s hypsometric Stage–Area–Volume curve from bathymetric surveys, establishing exact stage-normalization equations so every historical and contemporary satellite scene is adjusted to a reference datum elevation (e.g., standard operating weir level in metres AMSL).',
    ],
    investigativeQuestions: [
      'What is the slope (ΔArea / ΔStage, in hectares per 10 cm of water-level change) around Dal–Nigeen’s littoral zones at low, normal, and flood stages?',
      'What daily gauge elevations were recorded at Dal Gate and Nigeen lock gates on the exact satellite overpass dates used in the 1992, 2001, 2010, 2013, 2014, 2020, and 2026 estimates?',
      'How has lakebed siltation reduced total water-holding volume (million cubic metres) even where surface area appears constant?',
    ],
    evidenceAndMethods: [
      'Published bathymetric echo-sounding surveys of Dal and Nigeen basins (1977 ENEX, NIH Roorkee, University of Kashmir, LCMA DPRs)',
      'Irrigation & Flood Control / LCMA daily Dal Gate and Nallah Amir Khan gauge-register time series',
      'Inundation-frequency histograms across 250+ Sentinel-1/2 scenes stratified by water stage',
    ],
    deliverable:
      'Reference Stage–Area–Volume hypsometric curve and water-level normalization lookup table for Dal–Nigeen.',
    methodologicalCaveat:
      'Comparing a drought-autumn low-stage satellite image against a spring snowmelt high-stage image without gauge correction introduces severe false-loss or false-recovery artifacts.',
  },
  {
    number: 64,
    code: '64',
    slug: 'chapter-64-reconciling-6-35-km2-contemporary-gap-govt-20-3-versus-kew-13-95',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Reconciling the 6.35 km² Contemporary Gap: Government >20.3 km² Claims Versus KEW’s 13.95 km² Observatory Estimate',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In 2026, two starkly different contemporary numbers circulate in public domain: official government statements report clearing ~6.5 km² of aquatic vegetation and raising Dal Lake’s open-water expanse to more than 20.3 km², whereas Kashmir EcoWatch’s published Lake Encroachment Observatory lists 2026 water area at 13.95 km² (1,395 ha)—a discrepancy of ~6.35 km² (635 hectares), alongside earlier benchmarks of 10.50 km² (2013 academic open water) and 12.907 km² (2020 CAG open water + submerged vegetation).',
      'Scientific integrity forbids presuming the government figure is inflated while treating KEW’s own 13.95 km² figure as infallible. Note that adding ~6.5 km² of cleared floating vegetation (679.6 ha in 2020 CAG data) onto 12.91–13.95 km² of open/submerged water yields ~19.4–20.45 km²—pointing directly to class-definition and seasonal-deweeding differences that reproducible open satellite code can test decisively.',
    ],
    investigativeQuestions: [
      'Does the government’s >20.3 km² figure sum unobstructed open water, submerged macrophyte beds, and deweeded lily zones across both Dal and Nigeen, and on what survey date and gauge height was it measured?',
      'What exact outer shapefile, Sentinel-2 scene date, NDWI threshold, and macrophyte-exclusion rule generated KEW’s published 13.95 km² (1,395 ha) figure and 1990 baseline (1,980 ha)?',
      'When identical cloud-free 2026 Sentinel-1/2 scenes are classified across all 15 forensic classes (OW, SV, FV, EV, FG...), what are the exact areas of strict OW alone versus OW+SV versus OW+SV+deweeded FV?',
    ],
    evidenceAndMethods: [
      'Formal technical comparison of LCMA/government 2026 restoration reports, CAG/EE&RSD 2020 definitions, Rashid et al. 2013 definitions, and KEW Lake Encroachment Observatory code',
      'Multi-season 2026 Sentinel-2 L2A and Sentinel-1 SAR classification across nested class aggregations (OW; OW+SV; OW+SV+FV)',
      'Public release of reproducible classification scripts, training polygons, and boundary GeoJSONs',
    ],
    deliverable:
      'Open-source 2026 Area Reconciliation Report testing both Government (>20.3 km²) and KEW (13.95 km²) figures under identical transparent rules.',
    methodologicalCaveat:
      'Until November 2026 multi-seasonal imagery and official LCMA boundary metadata are processed side-by-side, the 6.35 km² gap remains an unresolved definitional discrepancy rather than proof of error by either institution.',
  },
  {
    number: 65,
    code: '65',
    slug: 'chapter-65-net-aquatic-area-recovered-formalizing-the-accountability-equation',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'The Mathematics of Lost Water Surface',
    title:
      'Net Aquatic Area Recovered: Formalizing A_net_recovery = A_ecologically_restored − A_newly_converted',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Closing Volume IX, this chapter codifies the central quantitative reform proposed by Himalayan Dispatch: replacing disconnected counts of demolitions, notices, and crores spent with an audited annual spatial balance sheet governed by Net Aquatic Area Recovered: A_net_recovery = A_ecologically_restored − A_newly_converted.',
      'To prevent spectral gaming (such as counting seasonal weed mowing as permanent land recovery), the chapter defines strict physical qualification criteria for both terms: A_ecologically_restored counts only consolidated land, earthfill, or blocked channel area excavated and reconnected to perennial lake circulation, while A_newly_converted counts all water, marsh, or floating-mat area newly consolidated into terrestrial fill, plantation, or building footprint during the same reporting year.',
    ],
    investigativeQuestions: [
      'What hydrological, bathymetric (minimum depth below datum), and multi-season persistence thresholds qualify a parcel for inclusion in A_ecologically_restored?',
      'How should seasonal deweeding (FV → OW) be reported on a separate "Aquatic Habitat Maintenance" ledger so it never masks terrestrial real-estate losses on the "Permanent Space Ledger"?',
      'If applied retroactively to 2007–2020 CAG figures and 2012–2019 SPA acquisition records, what was Dal Lake’s true Net Aquatic Area Recovered?',
    ],
    evidenceAndMethods: [
      'Mathematical accounting specification separating the Permanent Terrestrial Conversion Ledger from the Reversible Macrophyte Maintenance Ledger',
      'Retroactive simulation using CAG 2007–2020 transitions (+84.1 ha cropland/built-up gain vs. 0 ha confirmed SPA dredging)',
      'Audit reporting template designed for annual presentation before the J&K Legislative Assembly and High Court',
    ],
    deliverable:
      'Statutory technical standard for calculating and auditing annual Net Aquatic Area Recovered.',
    methodologicalCaveat:
      'Both terms in A_net_recovery carry pixel-edge measurement uncertainty; annual reports must publish parcel polygons and 95% confidence bounds alongside point totals.',
  },

  // ── VOLUME X: HISTORICAL SATELLITE AND CADASTRAL RECONSTRUCTION (66–73) ───
  {
    number: 66,
    code: '66',
    slug: 'chapter-66-georeferencing-survey-of-india-sheets-and-declassified-corona-photography',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Georeferencing 1859–1960 Survey of India Sheets and Declassified 1960–1972 CORONA Reconnaissance Photography',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Before civilian Earth-observation satellites launched in 1972, declassified US CORONA panoramic reconnaissance missions (KH-4, KH-4A, KH-4B) captured Srinagar and the Dal–Nigeen basin during the 1960s and early 1970s at 1.8 to 2.7-metre ground resolution—fine enough to resolve individual floating gardens, houseboat lines, arched causeway bridges, and pre-conflict island mahallas.',
      'This chapter specifies the photogrammetric orthorectification workflow linking 1859–1960 Survey of India sheets with declassified CORONA film strips using rigorous camera-model bundle adjustment and Zabarwan–Hari Parbat ground control points.',
    ],
    investigativeQuestions: [
      'Which cloud-free snow-free CORONA KH-4A/4B mission strips over Srinagar (1962–1972) provide optimal stereo geometry for orthorectification?',
      'How accurately do CORONA 2-metre shorelines validate or refine the 1962 (27.82 km²) and 1972 (26.40 km²) historical areal estimates?',
      'Which internal islands, feeder nallah widths (Chatterhama, Saidnar, Tailbal), and Mughal canal mouths are directly measurable on 1965–1971 CORONA frames?',
    ],
    evidenceAndMethods: [
      'USGS EarthExplorer declassified CORONA KH-4A/4B panoramic film scans and historical Survey of India 1:63,360 / 1:50,000 sheets',
      'Panoramic camera distortion modelling with 30 m / 10 m DEM terrain orthorectification',
      'Independent check-point RMSE validation across invariant heritage structures',
    ],
    deliverable:
      'Orthorectified 2-metre 1960s–1972 CORONA mosaic of the Dal–Nigeen basin and feeder tributaries.',
    methodologicalCaveat:
      'Panchromatic black-and-white CORONA film lacks multispectral NIR/SWIR bands, requiring textural and tonal photo-interpretation keys to separate dense floating weeds from wet mudflats.',
  },
  {
    number: 67,
    code: '67',
    slug: 'chapter-67-harmonizing-landsat-mss-tm-etm-and-oli-archives-1972-2025',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Harmonizing Landsat MSS, TM, ETM+ and OLI Archives (1972–2025) Across Matched Phenological Windows',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Spanning more than half a century from Landsat 1 MSS (1972) through Landsat 4/5 TM, Landsat 7 ETM+, and Landsat 8/9 OLI (2025–2026), the USGS Collection-2 surface-reflectance archive offers the only unbroken multispectral record bridging pre-conflict conservation planning, the 1989–1996 conflict years, LAWDA’s creation, the 2014 flood, and contemporary restoration.',
      'This chapter defines cross-sensor radiometric harmonization, Landsat 7 SLC-off gap handling, and strict phenological window matching (pairing spring post-snowmelt high-clarity scenes with late-summer peak-macrophyte scenes every year).',
    ],
    investigativeQuestions: [
      'How do inter-sensor band-pass adjustments harmonize NDWI and MNDWI water thresholds across MSS, TM, ETM+, and OLI sensors?',
      'What continuous annual open-water versus vegetated-water curve emerges when every cloud-free September–October and April–May scene from 1972 to 2025 is processed uniformly?',
      'Do continuous annual series reveal abrupt step-changes following specific administrative, flood, or unrest events?',
    ],
    evidenceAndMethods: [
      'USGS Landsat Collection-2 Level-2 Surface Reflectance archive (1972–2025) over Path 149 / Row 36',
      'Roy et al. OLS/RMA cross-sensor spectral transformation coefficients and harmonic time-series fitting',
      'Dual-season (spring minimum-macrophyte vs. late-summer maximum-macrophyte) annual compositing',
    ],
    deliverable:
      'Harmonized 54-year annual dual-season Landsat surface-water and terrestrialization time series.',
    methodologicalCaveat:
      'Thirty-metre Landsat pixels contain mixed shoreline and narrow-canal sub-pixel fractions requiring spectral unmixing or sub-10 m Sentinel calibration.',
  },
  {
    number: 68,
    code: '68',
    slug: 'chapter-68-sentinel-1-sar-and-sentinel-2-fusion-for-cloud-independent-mapping',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Sentinel-1 C-Band SAR and Sentinel-2 Multi-Spectral Fusion for Cloud-Independent Water and Reedbed Mapping',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Winter cloud cover, valley fog, and spring storms frequently obscure optical satellites over Srinagar during the exact months when covert soil tipping and channel filling occur. Combining Sentinel-1 C-band Synthetic Aperture Radar (VV/VH specular water backscatter and interferometric coherence) with 10-metre Sentinel-2 optical/SWIR bands enables all-weather monitoring every six to twelve days.',
      'This chapter specifies the radar–optical fusion classifier capable of distinguishing specular open water, double-bounce emergent reedbeds, floating mats, and newly tipped dry mineral earthfill.',
    ],
    investigativeQuestions: [
      'How effectively does VV/VH backscatter drop versus double-bounce enhancement separate unobstructed open water (OW) from emergent Typha/Phragmites stands (EV) and consolidated soil fill (CL)?',
      'Can interferometric SAR coherence loss detect sudden surface disturbance from earth tipping or new masonry construction between consecutive 12-day passes?',
      'How closely do Sentinel-1/2 fused water masks match sub-metre commercial optical shorelines around Nigeen and Lokut Dal?',
    ],
    evidenceAndMethods: [
      'Copernicus Sentinel-1 GRD/SLC C-band SAR (2014–2026) and Sentinel-2 MSI Level-2A (2015–2026) archives',
      'Terrain-flattened backscatter calibration, speckle filtering, and optical–SAR random-forest / gradient-boosted classification',
      'Sub-metre optical validation strips across complex floating-garden and reedbed mosaics',
    ],
    deliverable:
      'All-weather 10-metre optical–radar water, macrophyte, and earthfill classification pipeline (2015–2026).',
    methodologicalCaveat:
      'Mountain layover/shadow near steep Zabarwan slopes and wind-roughened Bragg scattering on open Bod Dal waters require ascending/descending orbit combination.',
  },
  {
    number: 69,
    code: '69',
    slug: 'chapter-69-fifteen-class-scientific-land-cover-taxonomy-rulesets',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Fifteen-Class Scientific Land-Cover Taxonomy (OW Through UL): Spectral, Textural and Object-Based Rulesets',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Conventional binary "water versus non-water" maps fail Dal Lake because they collapse submerged weeds, floating gardens, ancestral residential islands, commercial hotels, government roads, houseboats, and turbid delta plumes into crude aggregates. Part XIX therefore mandates fifteen distinct scientific classes (`OW`, `SV`, `FV`, `EV`, `FG`, `CL`, `AG`, `PL`, `RB`, `CB`, `GI`, `HB`, `CH`, `SL`, `UL`).',
      'This chapter defines the exact spectral indices, seasonal phenology signatures, roof/vessel geometry descriptors, and ancillary cadastral overlays needed to classify all fifteen categories consistently.',
    ],
    investigativeQuestions: [
      'Which multi-seasonal spectral and elevation rules cleanly separate floating agricultural gardens (FG) from fixed agricultural demba land (AG) and newly consolidated fill (CL)?',
      'How are residential built-up (RB), commercial built-up (CB), and government infrastructure (GI) differentiated by combining OBIA building morphology with municipal/tourism/departmental registries?',
      'Under what evidentiary ambiguity rules must a pixel or parcel be assigned to class UL (Land of unresolved legal status)?',
    ],
    evidenceAndMethods: [
      'Hierarchical 15-class decision-tree and Object-Based Image Analysis (OBIA) specification',
      'Spectral library field radiometry across Dal Lake water, submerged Hydrilla/Myriophyllum, lotus, radh, willow, and karewa fill',
      'Explicit hierarchy mapping the 15 forensic classes back to CAG/EE&RSD 7 classes and Rashid et al. historical classes for backward compatibility',
    ],
    deliverable:
      'Complete 15-Class Dal–Nigeen Land-Cover Classification Manual and backward-harmonization crosswalk.',
    methodologicalCaveat:
      'Purely spectral satellites cannot separate RB, CB, and GI roofs without ancillary parcel/institutional layers; functional building classes require verified registry fusion.',
  },
  {
    number: 70,
    code: '70',
    slug: 'chapter-70-parcel-level-transition-matrices-water-to-building-footprints',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Parcel-Level Transition Matrices: Tracing Every Pixel From Open Water to Consolidated Land and Building Footprints',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Net category totals conceal gross bidirectional churn: if 20 hectares of open water are filled into cropland on one shore while 20 hectares of weeds are cleared elsewhere, net open water looks unchanged even though 20 hectares of lake space were permanently privatized. Only a full 15 × 15 origin–destination transition matrix exposes irreversible conversions.',
      'This chapter constructs multi-epoch pixel and parcel transition matrices (1972→1988, 1988→2001, 2001→2007, 2007→2014, 2014→2020, 2020→2026) tracking every consolidated plot back to its earliest aquatic state.',
    ],
    investigativeQuestions: [
      'Across 2007–2020 and 2020–2026, what were the gross hectare flows along the irreversible pathway OW/SV → FV/EV/FG → CL/AG/PL → RB/CB/GI?',
      'What fraction of the +28.2 ha built-up expansion in CAG data originated in 1972 or 1988 as unobstructed open water versus historic island/agricultural land?',
      'Where have genuine reverse transitions (CL/RB → OW) ever occurred across the Dal–Nigeen system?',
    ],
    evidenceAndMethods: [
      'Pontius cross-tabulation transition-matrix accounting separating net change, swap change, and persistence across 15 classes',
      'First-date-of-consolidation change-point detection per parcel polygon',
      'Vector building-footprint genealogy linking 2026 structures to historical underlying cover classes',
    ],
    deliverable:
      'Multi-epoch 15 × 15 Gross & Net Land-Use Transition Matrices and Parcel Origin Atlas.',
    methodologicalCaveat:
      'Co-registration error exceeding half a pixel generates false shoreline "swap" transitions; sub-pixel image registration (<0.3 pixel RMSE) is mandatory before computing matrices.',
  },
  {
    number: 71,
    code: '71',
    slug: 'chapter-71-overlaying-revenue-khasra-maps-master-plan-zones-and-buffers',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Overlaying Revenue Khasra Maps, Master-Plan Zones and Statutory Buffer Lines Onto High-Resolution Imagery',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Remote sensing detects physical land-cover transformation, whereas legal accountability depends on statutory boundaries: Revenue khasra lines, High Court-monitored demarcation pillars, Srinagar Master Plan 2035 conservation zones, and 200-metre prohibited construction buffers.',
      'This chapter specifies the cadastral–geospatial integration layer aligning digitized village musavis, geo-referenced lake boundary pillars, and Master Plan zoning polygons onto sub-metre imagery across every lakeside tehsil and ward.',
    ],
    investigativeQuestions: [
      'How closely do physical demarcation pillars installed around Dal and Nigeen match historical Settlement musavi water boundaries?',
      'Where do discrepancies or un-pillared gaps remain along the Dal–Nigeen perimeter as examined in 2018, 2020, and 2024 High Court proceedings?',
      'How many post-2007 consolidated or built-up hectares lie inside state-owned khasra numbers versus private proprietary khasras subject to Master Plan building bans?',
    ],
    evidenceAndMethods: [
      'Digitized Revenue Department jamabandi/musavi sheets (Digital India Land Records Modernization / J&K Land Records portal where published) and High Court demarcation status filings',
      'Srinagar Master Plan 2015–2035 statutory zoning GIS layers',
      'Differential GNSS field survey verification of installed lakeside boundary pillars',
    ],
    deliverable:
      'Integrated Cadastral–Statutory–Satellite Overlay Specification distinguishing encroachment on state land from prohibited-zone construction on private land.',
    methodologicalCaveat:
      'Building without permission on private proprietary land inside a prohibited green belt is a statutory zoning/BOCA offence, whereas occupying state water khasras is public-land encroachment; the two carry distinct legal remedies.',
  },
  {
    number: 72,
    code: '72',
    slug: 'chapter-72-field-ground-truthing-confusion-matrices-and-uncertainty-envelopes',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Field Ground-Truthing, Confusion Matrices, Kappa / F1 Accuracy Benchmarks and Uncertainty Envelopes',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Any geospatial investigation whose findings may inform public accountability, legislative scrutiny, or judicial proceedings must meet forensic remote-sensing validation standards rather than visual colour-map assertions. Unvalidated pixel counts regularly over- or under-estimate rare classes such as narrow channels (CH) or newly consolidated fill (CL).',
      'Adopting Olofsson et al. good-practice stratified area-estimation protocols, this chapter mandates independent boat- and shore-based ground-truthing, error-adjusted area estimators, class-specific user’s and producer’s accuracies, F1 scores, and ±95% confidence intervals.',
    ],
    investigativeQuestions: [
      'What stratified random sample size across all 15 land-cover classes is required to achieve ±5% relative confidence bounds on open-water and built-up area estimates?',
      'Which class pairs (such as FG vs. AG, SV vs. OW, or CL vs. vacant grassland) exhibit the highest spectral confusion without field verification?',
      'How are classification error matrices propagated into +/- hectare bounds on Net Aquatic Area Recovered?',
    ],
    evidenceAndMethods: [
      'Olofsson et al. (Remote Sensing of Environment) stratified area-adjusted estimator and 95% confidence-interval equations',
      'Geo-tagged timestamped boat-transect and shoreline photographic validation protocol',
      'Blind dual-interpreter reference labelling across archival imagery epochs',
    ],
    deliverable:
      'Forensic Accuracy Assessment & Uncertainty Propagation Standard for all KEW lake datasets.',
    methodologicalCaveat:
      'No KEW Dal Lake area counter may be labelled "verified" until its underlying confusion matrix achieves documented class accuracy benchmarks and publishes its +/- hectare margin of error.',
  },
  {
    number: 73,
    code: '73',
    slug: 'chapter-73-architecture-of-dal-lake-parcel-accountability-registry',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'Historical Satellite and Cadastral Reconstruction',
    title:
      'Architecture of the Dal Lake Parcel Accountability Registry: 17 Evidentiary Fields, Privacy Safeguards and Right of Reply',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Synthesizing Part XX, this chapter specifies the relational database schema, evidentiary governance, privacy redaction tiers, and editorial verification gates for the proposed 17-field Dal Lake Parcel Accountability Registry—linking physical satellite change history directly to permissions, inspections, notices, court orders, ACB dockets, restoration verification, and recorded party responses.',
      'By separating internal investigative working files from public-facing verified summaries, the registry connects physical landscape change to institutional responsibility without functioning as an unverified public accusation board.',
    ],
    investigativeQuestions: [
      'How does the 17-field schema enforce cryptographic immutability and source-document attachment for every status transition (Verified, Alleged, Disputed, Resolved)?',
      'What redaction rules protect personal household details of ordinary residents while maintaining transparency over commercial entities, public projects, and adjudicated orders?',
      'How is a mandatory pre-publication Right of Response notice workflow built directly into parcel dossier publication?',
    ],
    evidenceAndMethods: [
      '17-field relational PostGIS / GeoJSON schema implementing Part XX specifications',
      'Data-protection, defamation-law, and investigative-journalism right-of-reply compliance protocols',
      'Four-state legal-status gate (`verified` | `alleged` | `disputed` | `resolved`) coupled with presumption-of-innocence banners',
    ],
    deliverable:
      'Complete technical and legal governance charter for the 17-field Dal Lake Parcel Accountability Registry.',
    methodologicalCaveat:
      'Parcels lacking verified cadastral or judicial documentation remain strictly in class UL / "alleged or under verification" and are never aggregated into "legally established encroachment" counters.',
  },

  // ── VOLUME XI: JUDICIAL INTERVENTION, FIRS AND ENFORCEMENT OUTCOMES (74–80) ─
  {
    number: 74,
    code: '74',
    slug: 'chapter-74-chronology-of-high-court-public-interest-litigation-2002-2026',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Chronology of Jammu & Kashmir High Court Public Interest Litigation on Dal and Nigeen Lakes (2002–2026)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'For nearly a quarter-century, continuous Public Interest Litigation before the Jammu & Kashmir High Court (including landmark Syed Iqbal Tahir Geelani / Molvi Peer Noor-ul-Haq and consolidated lake-protection proceedings) has served as the primary institutional counterweight against executive inertia around Dal and Nigeen Lakes.',
      'Drawing on the Centre for Science and Environment’s litigation chronology and published High Court orders through 2024–2026, this chapter constructs a comprehensive doctrinal and operational history of judicial lake governance—evaluating both what judicial mandamus saved and why courtroom supervision could not by itself halt 84.1 ha of 2007–2020 terrestrial expansion.',
    ],
    investigativeQuestions: [
      'Across 2002–2026, how many substantive interim orders did the High Court issue on demarcation, sewage treatment, construction bans, deweeding, and official accountability—and what was the executive compliance rate?',
      'Why did executive agencies repeatedly require contempt warnings or court-appointed commissioners before acting on visible shoreline violations?',
      'What structural limits prevent episodic courtroom hearings from substituting for scientifically staffed executive governance?',
    ],
    evidenceAndMethods: [
      'CSE Dal Lake litigation compilation (cseindia.org/cases-on-protection-of-lakes-2547) and High Court order archives (2002–2026)',
      'Compliance-lag tracking measuring months/years elapsed between judicial deadlines and executive execution',
      'Cross-synthesis with Monograph 07 (When Environmental Laws Exist but the Environment Has No Defence)',
    ],
    deliverable:
      'Comprehensive 2002–2026 Judicial Directives & Executive Compliance Matrix for Dal–Nigeen.',
    methodologicalCaveat:
      'Judicial orders reflect the evidentiary record placed before the bench; incomplete or overly optimistic departmental affidavits periodically constrained judicial visibility.',
  },
  {
    number: 75,
    code: '75',
    slug: 'chapter-75-analysing-2018-2020-and-2024-high-court-orders-on-demarcation-and-accountability',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Analysing the 2018, 2020 and 2024 High Court Orders on Boundary Demarcation and Encroachment Accountability',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Published High Court proceedings in 2018, 2020, and 2024 repeatedly returned to three stubborn bottlenecks: incomplete revenue-backed geo-tagged boundary demarcation of Dal and Nigeen, persistence of unauthorized constructions despite ward-officer deployment, and weak follow-through on rehabilitating canals and inflow channels.',
      'Examining the specific judicial texts from 2018, 2020, and 2024 indexed in Part XXVIII, this chapter traces how judicial scrutiny evolved from ordering physical demolitions toward demanding geo-referenced cadastral records, officer-wise accountability, and scientific expert oversight.',
    ],
    investigativeQuestions: [
      'What specific deficiencies in boundary demarcation, geo-tagging, and ward-level enforcement accountability were recorded in the 2018, 2020, and 2024 High Court orders?',
      'Which judicial directions issued in 2018 and 2020 remained unfulfilled when re-examined by the Court in 2024?',
      'How have civil-court status-quo or stay orders interacted with High Court Division Bench anti-encroachment mandates?',
    ],
    evidenceAndMethods: [
      'Full text of J&K High Court proceedings from 2018 (Indian Kanoon doc/52574074), 2020 (doc/152003009), and 2024 (doc/45973173)',
      'Comparative tracking of demarcation-pillar installation numbers and digitized revenue maps submitted to the Court',
      'Analysis of subordinate-court stay litigation rules established by Division Bench directives',
    ],
    deliverable:
      'Clause-by-clause compliance scorecard for the 2018, 2020, and 2024 High Court Dal Lake orders.',
    methodologicalCaveat:
      'Individual interim orders form part of a continuing mandamus; later orders modifying or recording compliance with earlier directions must be read sequentially.',
  },
  {
    number: 76,
    code: '76',
    slug: 'chapter-76-court-monitored-committees-of-experts-mandate-and-implementation-deficits',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Court-Monitored Committees of Experts: Mandate, Technical Recommendations and Implementation Deficits',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Recognizing the technical gulf between bureaucratic contracting and limnological restoration, the High Court constituted independent Committees of Experts (CoE) bringing together national administrators, planners, and scientists to audit dredging, deweeding, STP performance, catchment inflows, and shoreline governance.',
      'Complementing Monograph 10’s investigation of displaced local limnological capacity at Habak, this chapter evaluates the technical diagnoses submitted by court-appointed expert committees and examines where bureaucratic resistance or budgetary disconnects stalled their recommendations.',
    ],
    investigativeQuestions: [
      'Which core scientific and anti-encroachment recommendations of the High Court’s Committee of Experts were adopted versus sidelined by LCMA and line departments?',
      'How were regional Kashmir university and Habak limnologists integrated into—or excluded from—expert-committee governance?',
      'What institutional mechanism can give independent scientific recommendations binding operational teeth outside courtroom litigation?',
    ],
    evidenceAndMethods: [
      'Published reports and High Court discussions of the Committee of Experts (CoE) on Dal and Nigeen Lakes',
      'CAG Report No. 4 of 2025 cross-references on technical appraisal, DPR quality, and conservation execution',
      'Institutional comparison with statutory lake/estuary science boards internationally',
    ],
    deliverable:
      'Implementation audit of Court-Monitored Expert Committee technical recommendations.',
    methodologicalCaveat:
      'Advisory committees lack direct treasury or policing authority; implementation deficits must be attributed accurately between advisory design and executive execution.',
  },
  {
    number: 77,
    code: '77',
    slug: 'chapter-77-auditing-post-2014-enforcement-removals-2916-demolished-sites',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Auditing Post-2014 Enforcement Removals: What Happened to the 2,916 Demolished Sites After Clearance?',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In its July 2025 RTI response, LCMA’s Enforcement Wing reported removing or demolishing 2,916 illegal constructions and encroachments between October 2014 and 2025—averaging roughly 270 enforcement actions per year across nearly eleven years. Yet over the overlapping 2014–2020 CAG window, built-up land inside the lake still grew by +21.3 hectares and cropland/plantation by +49.8 hectares.',
      'How can nearly three thousand demolitions coexist with expanding terrestrial real estate? This chapter tests three explanations: repeat rebuilding on the same plots, demolition of minor peripheral fences/sheds while major structures survived, and non-excavation of earthfill plinths left behind after wall demolition.',
    ],
    investigativeQuestions: [
      'When the 2,916 post-October 2014 removals are disaggregated by category, how many involved boundary walls, tin sheds, or bamboo stakes versus reinforced concrete buildings or in-lake earthfill?',
      'On a random stratified sample of post-2014 demolition coordinates, what percentage of sites were subsequently rebuilt upon or remained consolidated dry land?',
      'How many total square metres of functioning aquatic habitat were recovered across all 2,916 operations?',
    ],
    evidenceAndMethods: [
      'RTI request for ward-wise, year-wise, and structure-type disaggregation of LCMA’s post-October 2014 ledger of 2,916 removals',
      'Multi-temporal Sentinel-2 / sub-metre optical post-demolition persistence audit on geo-referenced removal sites',
      'Comparison against CAG 2014–2020 net built-up (+21.3 ha) and cropland (+49.8 ha) expansion',
    ],
    deliverable:
      'Post-Demolition Persistence & Ecological Recovery Audit of the 2,916 reported post-2014 removals.',
    methodologicalCaveat:
      'Counting repeated removals of temporary fencing on the same plot inflates operation counts without dishonesty; unit-of-area accounting resolves repeat-event ambiguity.',
  },
  {
    number: 78,
    code: '78',
    slug: 'chapter-78-legislative-assembly-scrutiny-632-reported-lcma-demolitions',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Legislative Assembly Scrutiny (October 2024–February 2026): Evaluating the 632 Reported LCMA Demolitions',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In February 2026, the government informed the Jammu & Kashmir Legislative Assembly that LCMA had carried out 632 demolitions within its jurisdiction since October 2024—a high tempo of ~39 demolitions per month demonstrating active field deployment following the return of elected legislative questioning.',
      'Yet eight months later, in August and October 2026, independent civic groups and news agencies still reported fresh soil-filling and construction allegations at Miskeen Bagh and inside Dal Lake. This chapter examines the legislative record of February 2026 and designs a transparent ward-by-ward verification framework for contemporary assembly disclosures.',
    ],
    investigativeQuestions: [
      'Which wards, buffer zones (foreshore/catchment land vs. in-lake water/islands), and building types accounted for the 632 demolitions reported between October 2024 and February 2026?',
      'Did the 632 demolitions include removal of underlying soil fill inside wetland margins, or solely superstructure dismantling in upland BOCA wards?',
      'How can Legislative Assembly questions be structured to require tabular disclosure of Net Aquatic Area Recovered alongside operation counts?',
    ],
    evidenceAndMethods: [
      'February 2026 J&K Legislative Assembly starred/unstarred question replies on LCMA enforcement (reported via Kashmir Life)',
      '2024–2026 Sentinel-1/2 shoreline change detection paired with contemporary LCMA press releases',
      'Model legislative oversight questionnaire for Assembly Estimates, Public Accounts, and Environment committees',
    ],
    deliverable:
      'Spatial and categorical breakdown protocol for the 632 October 2024–February 2026 LCMA demolitions.',
    methodologicalCaveat:
      'LCMA’s statutory jurisdiction spans upland hillside and peri-urban BOCA wards well beyond the water edge; upland wall demolitions are lawful zoning enforcement but do not directly expand Dal Lake’s water surface.',
  },
  {
    number: 79,
    code: '79',
    slug: 'chapter-79-why-demolition-counts-mislead-eight-outcome-verified-metrics',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Why Demolition Counts Mislead: Replacing Activity Tallies With Eight Outcome-Verified Accountability Metrics',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Across bureaucracies worldwide, Goodhart’s Law prevails whenever performance is judged by raw activity counts: rewarding notice tallies produces paper notices without follow-up; rewarding demolition counts incentivizes tearing down ten fragile wooden sheds rather than excavating one politically connected commercial earthfill plot.',
      'Operationalizing Part XVII’s eight-row metric reform table (`EMR-01` through `EMR-08`), this chapter translates every conventional input statistic—notices, FIRs, demolitions, inspections, vehicle seizures, staff deployed, fines collected, households relocated—into a falsifiable, satellite- and court-verifiable ecological outcome.',
    ],
    investigativeQuestions: [
      'What data fields must LCMA add to its monthly enforcement ledger to report square metres of land recovered and newly converted alongside demolition counts?',
      'How can shoreline monitoring coverage (`EMR-06`) be weighted by historical encroachment risk rather than raw headcount?',
      'How should public audit reports penalize unexcavated earthfill pads left intact after superstructure demolition?',
    ],
    evidenceAndMethods: [
      'Eight-indicator regulatory performance specification (`EMR-01`–`EMR-08`) aligned with CAG performance-audit methodology',
      'Incentive-compatibility analysis of bureaucratic enforcement reporting',
      'Template monthly public JSON/CSV enforcement disclosure schema for LCMA',
    ],
    deliverable:
      'Outcome-Verified Enforcement Reporting Standard replacing activity tallies across wetland authorities.',
    methodologicalCaveat:
      'Outcome metrics complement rather than abolish input logs; tracking notices and FIRs remains necessary for procedural due-process auditing.',
  },
  {
    number: 80,
    code: '80',
    slug: 'chapter-80-closing-the-eight-stage-accountability-loop',
    volumeNumber: 11,
    volumeRoman: 'XI',
    volumeTitle: 'Judicial Intervention, FIRs and Enforcement Outcomes',
    title:
      'Closing the Eight-Stage Accountability Loop: From Inspection Report and FIR to Verified Ecological Recovery',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Synthesizing Volumes VI and XI, this chapter demonstrates why Dal Lake’s accountability chain breaks repeatedly between Stage 1 (detecting a violation) and Stage 8 (verified ecological recovery of land or water): files vanish between ward watchers and BOCA, departmental inquiries stall without service orders, FIRs take half a decade to reach charge sheet, trials linger for years, and demolished superstructures leave consolidated dry plots intact.',
      'The chapter designs an integrated digital docket linking LCMA, Revenue, Police, ACB, Prosecution, and Judiciary around a single immutable parcel identifier until Stage 8 ecological restoration is physically verified.',
    ],
    investigativeQuestions: [
      'At which of the eight accountability stages does the highest percentage of detected Dal Lake violations drop out of institutional follow-through?',
      'What statutory timelines should govern transitions from inspection report (Stage 1) to departmental inquiry completion (Stage 3) and physical site remediation (Stage 8)?',
      'How can third-party satellite verification certify Stage 8 independently of the agency that conducted the demolition?',
    ],
    evidenceAndMethods: [
      'Attrition-funnel modelling across Stages 1–8 of Part VI’s accountability framework',
      'Comparative environmental-enforcement workflow designs (integrated judicial–cadastral–EO compliance systems)',
      'Independent Stage-8 certification protocol via KEW Dal Forensic Observatory',
    ],
    deliverable:
      'End-to-End Eight-Stage Accountability Funnel & Statutory Timeline Blueprint.',
    methodologicalCaveat:
      'Mandatory timelines must fully respect natural justice, statutory appellate notice periods, and judicial stay rights before irreversible demolition.',
  },

  // ── VOLUME XII: REHABILITATION, COMPENSATION AND ENVIRONMENTAL JUSTICE (81–86) ─
  {
    number: 81,
    code: '81',
    slug: 'chapter-81-auditing-356-crore-special-plan-assistance-programme-2012-2019',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    title:
      'Auditing the ₹356 Crore Special Plan Assistance Programme (2012–2019): 15.3% Land and 16.0% Structure Acquisition',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'In February 2012, the Government of India sanctioned ₹356 crore under Special Plan Assistance (SPA) to acquire proprietary land and structures inside Dal Lake and relocate eligible lake dwellers by January 2017. Yet by December 2019—nearly three years past the completion deadline—CAG Report No. 4 of 2025 documented that only 2,299 of 14,992 target kanals of land (15.3%, leaving 12,693 kanals unacquired) and 319 of 1,994 target structures (16.0%, leaving 1,675 structures unacquired) had been acquired, with expenditure standing at ₹63.73 crore.',
      'This chapter reconstructs the financial, valuation, and administrative bottlenecks that left over four-fifths of the flagship 2012 acquisition programme unachieved.',
    ],
    investigativeQuestions: [
      'How were the original targets of 14,992 kanals (~758 ha) and 1,994 structures spatially distributed across Dal Lake’s basins and islands in the 2012 DPR?',
      'What caused the 84–85% shortfall in land and structure acquisition by December 2019—valuation disputes, resettlement-site delays, title verification hurdles, or stalled central fund releases?',
      'What additional acquisitions, if any, occurred under successor funding windows between January 2020 and November 2026?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 performance audit tables on the February 2012 ₹356 crore SPA programme',
      'Collector Land Acquisition (LAWDA/LCMA) award registers, target khasra schedules, and utilization certificates',
      'Post-2019 budget and legislative disclosures updating cumulative land/structure acquisitions through 2026',
    ],
    deliverable:
      'Comprehensive financial and spatial performance audit of the ₹356 crore SPA acquisition programme.',
    methodologicalCaveat:
      'Slow voluntary acquisition sometimes reflected genuine household concerns over inadequate compensation or unlivable resettlement conditions rather than mere bureaucratic delay.',
  },
  {
    number: 82,
    code: '82',
    slug: 'chapter-82-why-272-82-crore-remained-unreleased-and-2299-kanals-undredged',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    title:
      'Why ₹272.82 Crore Remained Unreleased and Why 2,299 Acquired Kanals (~116 ha) Were Not Dredged Back to Water',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Two findings in the CAG’s SPA audit strike at the heart of Dal Lake’s conservation paradox. Financially, ₹272.82 crore of approved central assistance remained unreleased while ₹63.73 crore was spent by December 2019. Ecologically—and even more critically—the 2,299 kanals (~116 hectares) of land actually acquired with public funds had NOT been dredged to restore them to the lake.',
      'Acquiring paper title over 116 hectares of consolidated earth and leaving those 116 hectares sitting as dry or marshy terrestrial ground delivers zero additional cubic metres of lake water—and worse, leaves vacant unguarded public plots vulnerable to fresh re-encroachment.',
    ],
    investigativeQuestions: [
      'What fiscal conditions, utilization-certificate gaps, or scheme-restructuring decisions left ₹272.82 crore of central SPA funding unreleased?',
      'Where are the exact 2,299 kanals (~116 ha) of acquired parcels located on the map today, and what is their 2026 satellite land-cover class?',
      'Have any of those 2,299 publicly purchased kanals been dredged back to open water between 2020 and 2026—or have any been re-occupied?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 fiscal-flow and post-acquisition dredging audit findings',
      'RTI retrieval of khasra numbers and coordinates for all 2,299 acquired kanals and 319 acquired structures',
      '2020–2026 Sentinel-2 / sub-metre optical inspection of acquired public parcels to test dredging versus re-occupation',
    ],
    deliverable:
      'Georeferenced Public Asset Status Map of the 2,299 acquired kanals (~116 ha) verifying dredging and custodial integrity.',
    methodologicalCaveat:
      'CAG findings reflect status as audited up to the report’s inspection window; post-2020 dredging claims on acquired plots must be verified parcel-by-parcel.',
  },
  {
    number: 83,
    code: '83',
    slug: 'chapter-83-rakh-i-arth-resettlement-colony-wetland-to-housing-ironies',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    title:
      'Rakh-i-Arth Resettlement Colony: Wetland-to-Housing Ironies, Civic Infrastructure Deficits and Livelihood Severance',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'To relocate households out of Dal Lake, authorities developed the flagship Rakh-i-Arth resettlement site at Bemina—ironically filling and converting hundreds of hectares of historic Jhelum floodplain marsh ("Rakh" literally denoting a marsh/reserve wetland) into a dense housing grid prone to subsidence, waterlogging, and flood vulnerability while severing boatmen and vegetable cultivators kilometres away from aquatic livelihoods.',
      'Saving one wetland by filling another wetland—and leaving relocated families struggling with incomplete drainage, schools, clinics, and transport—eroded community trust in state rehabilitation and slowed voluntary relocation out of Dal.',
    ],
    investigativeQuestions: [
      'How many hectares of historic Bemina floodplain wetland at Rakh-i-Arth were filled to construct the Dal Lake resettlement colony, and how did that affect local flood storage in September 2014?',
      'What documented deficits in foundation stability, sewerage, potable water, healthcare, and public transport have CAG audits, courts, and residents recorded at Rakh-i-Arth?',
      'How did livelihood loss among relocated shikara operators, fishermen, and radh farmers shape resistance to further relocation inside Dal Lake?',
    ],
    evidenceAndMethods: [
      'Historical 1972–2026 satellite comparison of the Rakh-i-Arth Bemina marsh basin before and after earthfilling',
      'CAG audit paragraphs, High Court PIL reports, and published socio-economic studies on Rakh-i-Arth living conditions',
      'Livelihood-transition and household-income comparison between relocated and in-situ families',
    ],
    deliverable:
      'Ecological and social post-mortem of the Rakh-i-Arth wetland-to-housing resettlement model.',
    methodologicalCaveat:
      'Critiquing planning flaws at Rakh-i-Arth highlights the need for dignified, non-wetland, livelihood-linked rehabilitation—not abandonment of families already residing at Bemina, who urgently merit upgraded civic infrastructure.',
  },
  {
    number: 84,
    code: '84',
    slug: 'chapter-84-valuation-equity-compensation-delays-and-grievance-redressal',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    title:
      'Valuation Equity, Compensation Delays and Grievance Redressal for Legitimate Displaced Households',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Where lake dwellers hold century-old proprietary Abi-Awal or residential rights inside zones designated for water recovery, eminent-domain acquisition is governed by constitutional property protections and statutory fair-compensation mandates. Multi-year delays between notification, structure assessment, award disbursement, and plot handover lock families in legal limbo—unable either to repair crumbling homes or to purchase dignified shelter outside.',
      'This chapter audits compensation-valuation formulas, inflation erosion across delayed awards, and appellate grievance redressal mechanisms under LCMA acquisition schemes.',
    ],
    investigativeQuestions: [
      'How were compensation rates for proprietary demba land, floating beds, and timber-brick houses calculated relative to prevailing Srinagar replacement housing costs?',
      'What was the median waiting time between initial acquisition consent/assessment and full payment plus serviced plot possession?',
      'Did transparent, independent ombudsman mechanisms exist to resolve disputed structure measurements or joint-family apportionment claims?',
    ],
    evidenceAndMethods: [
      'Land Acquisition Act / RFCTLARR statutory valuation standards compared against LAWDA/LCMA package norms',
      'High Court writ petitions filed by lake residents challenging delayed or inadequate acquisition awards',
      'Inflation-adjusted replacement-housing cost analysis across Srinagar urban/peri-urban wards',
    ],
    deliverable:
      'Fair-Valuation & Prompt-Disbursement Charter for voluntary, rights-compliant wetland acquisitions.',
    methodologicalCaveat:
      'Statutory compensation applies to verified legal title and eligible historical households; it must never be perverted into rewarding recent speculative commercial encroachment.',
  },
  {
    number: 85,
    code: '85',
    slug: 'chapter-85-gender-craft-boat-work-and-intergenerational-vulnerability-in-relocation',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    title:
      'Gender, Craft, Boat-Work and Intergenerational Vulnerability in Lake Relocation Programmes',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Inside traditional island and lakeshore households, women play central economic roles—tending floating vegetable nurseries, sorting and bundling nadru and greens for dawn boat markets, processing fodder and willow work, and spinning or embroidering artisanal textiles—within close-knit kinship mahallas where boat mobility and shared childcare sustain household resilience.',
      'Relocation packages calibrated solely around male household-head plot titles routinely overlook female livelihood disruption, transport isolation, and educational continuity for children. This chapter integrates gender-disaggregated social-impact assessment into lake governance.',
    ],
    investigativeQuestions: [
      'How did relocation from internal Dal mahallas to upland/Bemina colonies alter women’s independent income from horticulture, market gardening, and home-based craft?',
      'How were widowed, female-headed, or landless boat-working households treated in plot-allotment and compensation schedules?',
      'What gender-responsive livelihood, transit, and cooperative credit safeguards are required in any future voluntary rehabilitation plan?',
    ],
    evidenceAndMethods: [
      'Gender-disaggregated socio-economic scholarship on Srinagar lake-dwelling and relocated communities',
      'Audit of title-registration rules (joint spousal vs. single-head allotment) in LAWDA/LCMA resettlement policies',
      'Social-impact assessment standards aligned with international wetland human-rights guidelines (Ramsar human-wellbeing resolutions)',
    ],
    deliverable:
      'Gender- & Livelihood-Responsive Social Impact Protocol for Dal–Nigeen conservation.',
    methodologicalCaveat:
      'Field socio-economic interviews require strict ethical review, anonymization of vulnerable respondents, and Kashmiri-language community validation.',
  },
  {
    number: 86,
    code: '86',
    slug: 'chapter-86-rights-respecting-conservation-design-co-stewardship-frameworks',
    volumeNumber: 12,
    volumeRoman: 'XII',
    volumeTitle: 'Rehabilitation, Compensation and Environmental Justice',
    title:
      'Rights-Respecting Conservation Design: Co-Stewardship Frameworks That Protect Both Aquatic Habitat and Human Dignity',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Closing Volume XII, this chapter rejects the false choice between abandoning Dal Lake to concrete privatization and treating tens of thousands of historic residents as adversaries to be policed out of existence. Across global inhabited heritage wetlands, durable protection combines hard zero-tolerance physical boundaries against new filling with upgraded in-situ zero-discharge sanitation, heritage eco-hamlet compacts, and paid community stewardship for verified historic island communities.',
      'By turning generational boatmen, fishermen, and cultivators into compensated ecological monitors and canal custodians, conservation aligns community dignity directly with defending open water.',
    ],
    investigativeQuestions: [
      'Which historic island clusters can be sustainably stabilized in situ using decentralized vacuum/constructed-wetland sanitation, strict footprint freezes, and prompt eco-repair permits?',
      'How can community canal-custodian and macrophyte-composting cooperatives redirect public deweeding budgets toward local lake-dweller livelihoods?',
      'What binding legal compact prevents in-situ heritage protections from being exploited by external commercial buyers?',
    ],
    evidenceAndMethods: [
      'Decentralized boat/island vacuum-sewerage and floating-treatment-wetland engineering evaluations',
      'Non-alienability heritage-tenure covenants (barring commercial transfer to non-resident developers)',
      'Comparative inhabited-wetland co-governance models adapted to Kashmir’s legal and climatic context',
    ],
    deliverable:
      'In-Situ Heritage Stewardship & Zero-Expansion Compact Blueprint for historic Dal communities.',
    methodologicalCaveat:
      'In-situ stewardship requires 100% sewage interception and zero outward earthfill tolerance; without strict physical boundary locks, co-stewardship compacts fail.',
  },

  // ── VOLUME XIII: CONTEMPORARY ENCROACHMENT INTELLIGENCE (87–92) ───────────
  {
    number: 87,
    code: '87',
    slug: 'chapter-87-cag-2004-2022-imagery-leads-mir-behri-lati-mohalla-nandapora',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    title:
      'CAG 2004–2022 Imagery Leads: Forensic Dossiers on Mir Behri, Lati Mohalla and Nandapora',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Through multi-temporal satellite inspection spanning 2004–2022, CAG Report No. 4 of 2025 flagged gradual encroachments and land-use transformations across Mir Behri, Lati Mohalla, and Nandapora—three interior and littoral sectors where gradual plot consolidation across eighteen years altered marsh-and-channel mosaics step by step.',
      'Treating these CAG references strictly as indicative investigation localities rather than pre-judged boundaries of illegal property, this chapter specifies sub-metre parcel reconstructions from 2004 to 2026 paired with cadastral, household-growth, and BOCA sanction checks across all three mahallas.',
    ],
    investigativeQuestions: [
      'Between 2004, 2014, 2022, and 2026, how many hectares of open water, canal width, or floating garden transitioned into consolidated ground or roofs in Mir Behri, Lati Mohalla, and Nandapora?',
      'What share of post-2004 structural additions in Lati Mohalla and Nandapora represents ancestral household subdivision versus new commercial/agricultural land reclamation?',
      'Which LCMA enforcement notices or BOCA permissions were issued in these three localities across 2004–2026?',
    ],
    evidenceAndMethods: [
      'CAG Report No. 4 of 2025 2004–2022 historical-imagery audit observations for Mir Behri, Lati Mohalla, and Nandapora',
      'Sub-metre archival commercial satellite scenes (2004, 2010, 2016, 2022, 2026) and Tehsil Srinagar cadastral overlays',
      'Community right-of-response and seven-tier differentiation audit (`COM-01`–`COM-07`)',
    ],
    deliverable:
      'Differentiated 2004–2026 geospatial-cadastral dossiers for Mir Behri, Lati Mohalla, and Nandapora.',
    methodologicalCaveat:
      'CAG locality names identify broad neighbourhoods; individual homes inside Mir Behri, Lati Mohalla, or Nandapora must never be stigmatized without parcel-specific legal verification.',
  },
  {
    number: 88,
    code: '88',
    slug: 'chapter-88-nigeen-ishber-and-dalgate-pressure-corridors-high-value-shorelines',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    title:
      'Nigeen, Ishber and Dalgate Pressure Corridors: High-Value Shoreline Parcels and Regulatory Compliance Audits',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Unlike low-income interior marsh islands, Nigeen (including Beigh Mohalla), Ishber–Nishat along the Zabarwan piedmont, and the Dalgate commercial outlet belt command prime urban real-estate and tourism values—precisely the corridors recurring in ACB FIR No. 48/2015 charge-sheet localities and contemporary LCMA enforcement drives.',
      'This chapter conducts a focused high-value corridor audit across Nigeen, Ishber, and Dalgate, tracking shoreline revetments, commercial conversions, villa compounds, and BOCA plan deviations from 2004 through 2026.',
    ],
    investigativeQuestions: [
      'How has the shoreline, green-belt buffer, and commercial built-up footprint evolved across Nigeen Basin, Ishber–Nishat, and Dalgate between 2004 and 2026?',
      'What proportion of post-2010 constructions along Nigeen and Ishber held BOCA repair/building sanctions, and did completed plinths match sanctioned dimensions?',
      'How has shoreline hardening around Nigeen affected littoral reedbed belts and Nallah Amir Khan / Pokhribal connectivity?',
    ],
    evidenceAndMethods: [
      'Multi-temporal sub-metre satellite building and shoreline vectorization across Nigeen, Ishber, and Dalgate (2004–2026)',
      'Public BOCA sanction orders, High Court commissioner reports, ACB FIR No. 48/2015 public announcements, and LCMA Dalgate enforcement logs',
      'Circle-rate and commercial-use stratification across prime shoreline wards',
    ],
    deliverable:
      'High-Value Shoreline Compliance Atlas covering Nigeen, Ishber–Nishat, and Dalgate.',
    methodologicalCaveat:
      'All references to proceedings in Ishber and Nigeen under FIR No. 48/2015 remain strictly governed by the presumption of innocence pending final judicial verdicts.',
  },
  {
    number: 89,
    code: '89',
    slug: 'chapter-89-miskeen-bagh-august-2026-and-october-2026-soil-filling-allegations',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    title:
      'Miskeen Bagh (August 2026) and Contemporary Soil-Filling Allegations (October 2026): Field Verification Protocol',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Contemporary reporting in mid-to-late 2026 demonstrates why historical audits must connect directly to present-day field verification: on June 30, 2026 Associated Press reported continuing encroachment and farmland/residential pressure; on August 31, 2026 the Environmental Policy Group demanded an investigation into alleged wetland filling near Miskeen Bagh; and on October 24, 2026 Kashmir News Trust published eyewitness allegations of continuing soil filling and unauthorized construction inside Dal Lake despite LCMA visits.',
      'Upholding impartial journalism, this chapter treats all 2026 media and civil-society reports as testable hypotheses—designing rapid before-and-after satellite, cadastral, and right-of-reply verification protocols for Miskeen Bagh and every October 2026 allegation site.',
    ],
    investigativeQuestions: [
      'Do Sentinel-1/2 and commercial sub-metre satellite scenes between January 2026 and November 2026 confirm measurable fresh soil-fill polygons near Miskeen Bagh or interior Dal sectors?',
      'What official inspection logs, stop-work notices, FIRs, or clarifications has LCMA recorded in response to the August 31 and October 24, 2026 allegations?',
      'Were any verified 2026 soil fillings physically excavated back to water, or do consolidated pads remain in place?',
    ],
    evidenceAndMethods: [
      '2026 monthly Sentinel-2 L2A (10 m), Sentinel-1 SAR, and tasked/archive commercial sub-metre scenes over Miskeen Bagh and interior channels',
      'Documentary review of AP (June 30, 2026), Environmental Policy Group / Kashmir Life (August 31, 2026), and Kashmir News Trust (October 24, 2026) reports',
      'Formal right-of-response inquiries to LCMA Enforcement Wing and affected local stakeholders',
    ],
    deliverable:
      '2026 Rapid Forensic Verification Report testing Miskeen Bagh and October 2026 soil-filling allegations.',
    methodologicalCaveat:
      'Published eyewitness and advocacy allegations are investigative leads, NOT verified encroachments, until corroborated by dated imagery, site coordinates, and official response.',
  },
  {
    number: 90,
    code: '90',
    slug: 'chapter-90-internal-canal-networks-and-shikara-waterways-width-constriction',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    title:
      'Internal Canal Networks and Shikara Waterways: Mapping Width Constriction, Siltation and Privatized Cul-de-Sacs',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Inside Lokut Dal, Mir Behri, Rainawari–Jogilankar fringes, and floating-garden labyrinths, a web of hundreds of narrow internal waterways (`khuls` and `mar` channels, class `CH`) historically circulated oxygenated water, enabled shikara navigation, and drained storm inflows. Incremental staking of floating beds by half a metre on each bank every few years narrows 25-foot public waterways into 5-foot stagnant ditches or dead-end private cul-de-sacs invisible on coarse 30-metre maps.',
      'This chapter specifies a sub-metre vector network topology and boat-mounted GNSS/sonar survey of Dal Lake’s internal canals—measuring width loss, dissolved-oxygen dead zones, and blocked navigation loops.',
    ],
    investigativeQuestions: [
      'How many kilometres of navigable internal canals shown on 1960s CORONA photography and revenue maps remain open through-channels in 2026 versus dead-end cul-de-sacs?',
      'Where has incremental bilateral bank encroachment reduced internal canal widths below hydraulic flushing and emergency fire-boat navigation thresholds?',
      'How strongly does canal dead-ending correlate with summer benthic anoxia, hydrogen sulphide release, and Microcystis/Salvinia blooms?',
    ],
    evidenceAndMethods: [
      'Graph-theoretic network connectivity analysis comparing 1960s CORONA canal centrelines with 2026 0.3–0.5 m optical imagery',
      'Shikara-mounted RTK-GNSS width, depth, and dissolved-oxygen transect logging across interior channels',
      'Historical LCMA navigation-channel dredging and de-staking records',
    ],
    deliverable:
      'Sub-Metre Internal Canal Connectivity & Width-Constriction Atlas of Dal Lake.',
    methodologicalCaveat:
      'Overhanging willow canopies obscure narrow open canals in summer nadir optical imagery; leaf-off winter/early-spring imagery and field boat transects are mandatory to avoid false blockage flags.',
  },
  {
    number: 91,
    code: '91',
    slug: 'chapter-91-automated-near-real-time-shoreline-anomaly-alerts-sentinel-cadence',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    title:
      'Automated Near-Real-Time Shoreline Anomaly Alerts: Integrating Sentinel-1/2 Cadence With Public Inspection Logs',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Forensic reconstructions produced a decade after water becomes a three-storey hotel arrive too late to save the lake without painful demolitions and litigation. Because Copernicus Sentinel-1 and Sentinel-2 acquire free public observations over Srinagar every five to six days, algorithmic change detection can flag spectral shifts from water/reedbed toward mineral soil reflectance or radar coherence loss within weeks of initial tipping.',
      'This chapter designs KEW’s proposed automated Shoreline & Internal Anomaly Early-Warning Pipeline—paired with mandatory human analyst review before any public alert is logged.',
    ],
    investigativeQuestions: [
      'What minimum soil-fill or new-roof area (in m²) can 10-metre Sentinel-1/2 time-series anomaly detectors flag at >85% precision and <15% false-alarm rate?',
      'How does seasonal water-stage and lotus-phenology baseline subtraction prevent natural late-summer drawdown bars from triggering false encroachment alerts?',
      'How can verified anomaly tickets be shared constructively with LCMA, court-appointed monitors, and local panchayats/ward committees?',
    ],
    evidenceAndMethods: [
      'Harmonic BFAST / EWMA multi-spectral and SAR backscatter break-point detection calibrated against Srinagar gauge height',
      'Mandatory two-stage human photo-interpretation and field-verification gate prior to public observatory display',
      'Open API specification linking satellite anomaly tickets to 17-field Parcel Accountability records',
    ],
    deliverable:
      'Operational specification for KEW’s Human-Verified Satellite Shoreline Early-Warning System.',
    methodologicalCaveat:
      'Automated satellite alerts are probabilistic physical change flags, NEVER automated legal findings of encroachment; human verification and official right-of-reply remain non-negotiable.',
  },
  {
    number: 92,
    code: '92',
    slug: 'chapter-92-kashmir-ecowatch-self-audit-protocol-re-verifying-13-95-km2-estimate',
    volumeNumber: 13,
    volumeRoman: 'XIII',
    volumeTitle: 'Contemporary Encroachment Intelligence',
    title:
      'Kashmir EcoWatch Self-Audit Protocol: Re-Verifying the 13.95 km² Estimate Through Open Reproducible Code',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'An institution demanding scientific accountability from government agencies forfeits moral and technical authority if it treats its own published numbers as beyond scrutiny. KEW’s Lake Encroachment Observatory currently displays a 1990 baseline of 1,980 ha, a 2026 water area of 1,395 ha (13.95 km², −29.5% net change), and 18.4 km of hardened shoreline for Dal Lake—figures standing 6.35 km² below 2026 government restoration claims (>20.3 km²) and differing from both the 2013 academic (10.50 km²) and 2020 CAG (12.907 km²) benchmarks.',
      'Closing Volume XIII, this chapter establishes KEW’s binding internal self-audit protocol: auditing the exact scripts, scene IDs, polygon boundaries, and macrophyte thresholds behind 1,980 ha and 1,395 ha, and publishing any upward or downward revision transparently.',
    ],
    investigativeQuestions: [
      'Which exact 1990 Landsat 5 TM and 2026 Sentinel-2 L2A scene identifiers, cloud masks, and NDWI/MNDWI thresholds produced KEW’s published 1,980 ha and 1,395 ha figures?',
      'Did KEW’s 1,395 ha mask exclude submerged-vegetation beds and deweeded lily zones that government >20.3 km² figures include—and did KEW’s outer polygon exclude Nigeen?',
      'How does KEW’s 18.4 km hardened-shoreline metric compare against complete sub-metre revetment mapping around Dal and Nigeen?',
    ],
    evidenceAndMethods: [
      'Line-by-line code, shapefile, and scene-ID provenance audit of KEW’s existing `/earth-human-impact/aquatic-cryosphere/lake-encroachment` pipeline',
      'Independent replication across multiple 2026 seasonal scenes (April, July, October, November 2026) with error matrices',
      'Public errata and version-changelog commitment on the KEW Dal Forensic Observatory',
    ],
    deliverable:
      'Published KEW Self-Verification Audit & Open-Code Replication Package for the 13.95 km² estimate.',
    methodologicalCaveat:
      'Until this self-audit and November 2026 scene processing are completed, KEW’s 13.95 km² figure must be presented explicitly as a published preliminary estimate subject to open-code reconciliation.',
  },

  // ── VOLUME XIV: ECOLOGICAL RESTORATION AND LAND RECOVERY (93–96) ──────────
  {
    number: 93,
    code: '93',
    slug: 'chapter-93-scientific-de-consolidation-and-dredging-reclaiming-116-hectares',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle: 'Ecological Restoration and Land Recovery',
    title:
      'Scientific De-Consolidation and Dredging of Acquired Parcels: Reclaiming the Unrestored 116 Hectares',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Before spending fresh hundreds of crores displacing additional households or litigating contested private titles, Dal Lake holds an immediate, legally unencumbered ecological opportunity identified directly by the CAG: the 2,299 kanals (~116 hectares) of land already acquired with ₹63.73 crore of public money under the 2012 SPA programme that auditors found had not been dredged back to functioning lake water.',
      'This chapter develops the limnological and geotechnical engineering blueprint to excavate, grade, and hydrologically reconnect already-acquired public parcels—turning sunk fiscal expenditure into verified square kilometres of living aquatic habitat.',
    ],
    investigativeQuestions: [
      'Which of the 2,299 already-acquired kanals (~116 ha) sit contiguous to open water or internal channels where selective dredging would immediately restore circulation?',
      'What excavation depth (e.g., 1.8–2.5 m below operating weir stage) prevents immediate Typha/Salvinia re-colonization while supporting native submerged macrophytes?',
      'Where can excavated nutrient-rich lake silt and clean mineral soil be beneficially reused in upland degraded karewa/orchard restoration without polluting wetlands?',
    ],
    evidenceAndMethods: [
      'Bathymetric, sediment-chemistry, and hydraulic-connectivity design criteria for wetland de-consolidation dredging',
      'CAG Report No. 4 of 2025 SPA un-dredged land findings paired with LCMA mechanical-dredging fleet capacity assessments',
      'Spoil-disposal environmental safeguard protocol preventing secondary wetland dumping',
    ],
    deliverable:
      'Engineering & Limnological Action Plan for reclaiming Dal Lake’s ~116 hectares of already-acquired public land.',
    methodologicalCaveat:
      'Scattered isolated interior plots surrounded by inhabited houses cannot be deep-dredged without undermining adjacent foundations; contiguous hydrologically connected parcels must be prioritized first.',
  },
  {
    number: 94,
    code: '94',
    slug: 'chapter-94-realistic-aquatic-recovery-scenarios-100-hectare-feasibility-engineering',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle: 'Ecological Restoration and Land Recovery',
    title:
      'Realistic Aquatic Recovery Scenarios: Feasibility Engineering for a 100-Hectare (1,977-Kanal) Net Water-Surface Gain',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Demanding rhetorically that Dal Lake return to its 1859 extent of 31.84 km² ignores densely inhabited twentieth-century neighbourhoods of Srinagar and produces policy paralysis. Conversely, accepting permanent shrinkage as irreversible surrenders recoverable commons. Part XXIII models a concrete, disciplined benchmark: ecologically restoring 100 hectares (1.00 km², 1,977 kanals, or 247 acres) would recover 40.0% of the entire 2007–2020 CAG open-water reduction (249.8 ha).',
      'This chapter constructs a multi-criteria spatial feasibility model ranking candidate recovery zones across four tiers: already-acquired un-dredged public plots, recently tipped unoccupied soil fills, obstructed channel/delta shoals, and voluntary fair-compensated buyouts.',
    ],
    investigativeQuestions: [
      'Can a full 100-hectare (1,977-kanal) net aquatic recovery target be achieved over five to eight years primarily through already-acquired SPA plots, recent unoccupied fills, and Telbal/littoral shoal restoration without coercive mass displacement?',
      'What capital cost per hectare, dredge-spoil volume, and multi-season hydrological persistence benchmarks govern a realistic 100-hectare recovery plan?',
      'How much flood-attenuation volume (in million cubic metres) would 100 hectares of 2-metre-deep recovered water add to Srinagar’s urban flood buffer?',
    ],
    evidenceAndMethods: [
      'Multi-criteria GIS restoration suitability ranking (tenure clearance, zero habitation conflict, hydraulic connectivity, dredge haul distance)',
      'Volumetric flood-storage and residence-time hydrodynamic simulations for +50 ha, +100 ha, and +150 ha recovery scenarios',
      'Unit-cost engineering comparison against past SPA and AMRUT/NLCP conservation outlays',
    ],
    deliverable:
      'Tiered 100-Hectare (1,977-Kanal) Dal Lake Net Aquatic Recovery Master Feasibility Blueprint.',
    methodologicalCaveat:
      'The 100-hectare scenario is an analytical engineering target, NOT an assertion that 100 specific hectares have already been legally cleared for immediate excavation.',
  },
  {
    number: 95,
    code: '95',
    slug: 'chapter-95-re-opening-dal-lakes-hydrological-arteries-chatterhama-saidnar-tailbal',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle: 'Ecological Restoration and Land Recovery',
    title:
      'Re-Opening Dal Lake’s Hydrological Arteries: Hydraulic Rehabilitation of Chatterhama, Saidnar and Tailbal Nallahs',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'As Part VIII establishes, protecting Dal Lake’s central mirror while allowing its feeder tributaries and outflow channels to choke to a fraction of their natural width condemns the basin to stagnation, deltaic silting, and backwater flooding. Rehabilitating Chatterhama Nallah (narrowed locally to 3–4 ft), Saidnar Nallah (narrowed locally to 25–30 ft), Tailbal Nallah, Bata Khul, Maloori Nallah, and Nallah Amir Khan is co-equal with shoreline enforcement.',
      'This chapter designs an artery-by-artery hydraulic daylighting and culvert-replacement programme requiring R&B, Irrigation & Flood Control, SMC, Revenue, and LCMA to restore continuous conveyance corridors.',
    ],
    investigativeQuestions: [
      'Which R&B pipe culverts and earthen road crossings across the four CAG-flagged blockage sites can be replaced immediately with full-width box culverts or clear-span bridges?',
      'How much channel width must be recovered along Chatterhama and Saidnar Nallahs to safely pass a 50-year return-period piedmont flood without overbank damage?',
      'How would restoring free flow along Nallah Amir Khan and Brari Nambal outfalls reduce stagnant water residence time in Nigeen, Lokut Dal, and Gagribal?',
    ],
    evidenceAndMethods: [
      'Hydraulic conveyance and bridge/culvert retrofit engineering across all nine CAG-documented watercourse obstruction sites',
      'Revenue khasra demarcation of Gair Mumkin Nallah / Khul state stream corridors from Zabarwan–Dachigam foothills to lake confluences',
      'Coupled catchment-inflow and lake-circulation hydrodynamic modelling',
    ],
    deliverable:
      'Tributary & Outflow Daylighting Engineering Programme for Dal–Nigeen’s hydrological arteries.',
    methodologicalCaveat:
      'Re-widening urban stream corridors must pair removal of R&B road chokes and unlawful walls with upstream check-dam and sewage-interception works so widened channels carry clean water rather than raw sullage.',
  },
  {
    number: 96,
    code: '96',
    slug: 'chapter-96-post-demolition-ecological-succession-benthic-substrates-and-macrophytes',
    volumeNumber: 14,
    volumeRoman: 'XIV',
    volumeTitle: 'Ecological Restoration and Land Recovery',
    title:
      'Post-Demolition Ecological Succession: Restoring Benthic Substrates, Native Macrophytes and Circulation After Clearance',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Even when an unauthorized structure is demolished and underlying rubble fill is excavated, raw disturbed clay pits filled with cement debris, brickbats, and anoxic sediment do not spontaneously become healthy lacustrine ecosystems; left unmanaged, disturbed shallows rapidly turn into monospecific invasive weed mats or turbid dead pockets.',
      'Bridging civil enforcement with restoration limnology, this chapter specifies post-clearance ecological rehabilitation protocols: complete rubble/concrete extraction, benthic substrate grading, reconnection to wind-driven circulation, re-establishment of native submerged oxygenating macrophytes (Charophytes, Vallisneria, Potamogeton), and littoral reed buffers for waterbirds and schizothoracine fish.',
    ],
    investigativeQuestions: [
      'What residual construction-debris, pH, and heavy-metal contamination persists on demolished lakeside plots when rubble is bulldozed rather than excavated off-site?',
      'Which native submerged macrophyte guilds stabilize phosphorus in lakebed sediments and maintain high water clarity after dredging?',
      'What three-year post-restoration biological monitoring metrics (Secchi depth, dissolved oxygen, benthic macroinvertebrates, fish spawning use) verify genuine ecological recovery?',
    ],
    evidenceAndMethods: [
      'Restoration-limnology protocols for shallow temperate Himalayan lakes (synthesizing Kashmir university and Habak limnological research)',
      'Sediment-core chemical and physical testing before and after rubble/fill removal',
      'Before–After Control–Impact (BACI) biological monitoring protocol for restored littoral parcels',
    ],
    deliverable:
      'Post-Clearance Limnological Rehabilitation & Biological Certification Protocol.',
    methodologicalCaveat:
      'Counted area joins A_ecologically_restored only after physical rubble removal, hydrological reconnection, and verified multi-season water persistence—never on the afternoon a bulldozer departs.',
  },

  // ── VOLUME XV: THE FUTURE OF KASHMIR'S AQUATIC COMMONS (97–100) ───────────
  {
    number: 97,
    code: '97',
    slug: 'chapter-97-five-lakeside-contradictions-synthesizing-dal-habak-and-salim-ali-park',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle: "The Future of Kashmir's Aquatic Commons",
    title:
      'Five Lakeside Contradictions: Synthesizing Dal Lake Science, Habak Laboratory, Land Governance and Sálim Ali Park',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Situated along a single contiguous Zabarwan–Dal–Foreshore arc of Srinagar, five Himalayan Dispatch investigations expose five facets of one deeper institutional crisis (`LSC-01`–`LSC-05`): spending hundreds of crores on Dal Lake without scientific outcome accounting (Dispatch 04), displacing the dedicated limnological laboratory at Habak while ecological collapse deepened (Dispatch 05), losing 249.8 ha of open water and 84.1 ha to terrestrial expansion despite sweeping LCMA powers (Dispatch 06), reassigning Sálim Ali National Park overlooking the lake into a golf course (Dispatch 10), and applying environmental rules unevenly across actors and eras (Dispatch 30).',
      'Keeping evidentiary responsibility strictly independent in each case, this chapter examines what their shared geography reveals about how public natural and scientific commons are governed in Kashmir.',
    ],
    investigativeQuestions: [
      'How did the weakening of independent limnological monitoring at Habak directly impair independent state capacity to audit Dal Lake land-cover and water-quality claims?',
      'How do upland catchment conversions along the Zabarwan foothills (including institutional/recreational reassignments and chemical turf runoff) interact hydrologically with Dal Lake below?',
      'What common institutional design flaw allows protective environmental statutes to coexist with steady attrition of public ecological assets?',
    ],
    evidenceAndMethods: [
      'Comparative institutional synthesis across Dispatches 04, 05, 06, 10, and 30 and Monographs 02, 03, 09, 10, and 11',
      'Watershed-to-lake spatial overlay across the Zabarwan–Habak–Chashma Shahi–Dal–Nigeen continuum',
      'Public-trust governance diagnostics testing symmetry of legal standards across state, commercial, and citizen actors',
    ],
    deliverable:
      'Integrated Zabarwan–Dal–Nigeen Public Commons Governance Synthesis.',
    methodologicalCaveat:
      'These five investigations involve distinct statutes, agencies, decades, and legal histories; analytical synthesis illuminates structural governance patterns without merging distinct legal liabilities.',
  },
  {
    number: 98,
    code: '98',
    slug: 'chapter-98-statutory-architecture-for-open-cadastral-permit-and-recovery-ledger',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle: "The Future of Kashmir's Aquatic Commons",
    title:
      'Statutory Architecture for an Open Dal–Nigeen Cadastral, Permit and Net-Aquatic-Recovery Public Ledger',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Administrative opacity thrives when cadastral musavis sit in revenue rooms, BOCA building plans sit in LCMA folders, R&B culvert drawings sit in engineering divisions, and satellite polygons remain locked inside unshared consultant PDFs—so a single flood or departmental transfer can sever institutional memory for fourteen years.',
      'This chapter drafts model statutory rules under J&K lake-conservation, municipal, and proactive RTI disclosure law mandating a permanent, cloud-replicated public geospatial ledger publishing: (a) official state-water khasra boundaries, (b) every sanctioned lakeside permit with plinth GeoJSON, (c) every demolition and dredged recovery polygon, and (d) audited annual Net Aquatic Area Recovered.',
    ],
    investigativeQuestions: [
      'Which specific clauses under Section 4 proactive disclosure of the Right to Information Act and J&K Development / Lake Conservation statutes empower immediate publication of georeferenced permits and boundary pillars?',
      'How can distributed multi-institution backups (Revenue, LCMA, NIC, High Court Registry) ensure no future disaster ever erases enforcement archives again?',
      'What standardized GeoJSON and CSV schemas allow independent university researchers and journalists to audit official annual lake area figures reproducibly?',
    ],
    evidenceAndMethods: [
      'Statutory legislative-drafting review of J&K Development Act, Control of Building Operations Act, Land Revenue Act, Wetlands Rules, and RTI Section 4 mandates',
      'Open geospatial data-governance standards (OGC GeoPackage / GeoJSON, STAC satellite provenance metadata)',
      'Integration blueprint with KEW’s 12-module Dal Lake Encroachment & Administrative Accountability Observatory',
    ],
    deliverable:
      'Model Statutory Notification for Mandatory Proactive Geospatial & Net-Aquatic-Recovery Disclosure.',
    methodologicalCaveat:
      'Proactive public disclosure covers institutional boundaries, commercial licences, public works, and sanctioned building footprints while redacting sensitive personal household identifiers.',
  },
  {
    number: 99,
    code: '99',
    slug: 'chapter-99-institutional-reform-across-thirteen-agency-responsibility-chain',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle: "The Future of Kashmir's Aquatic Commons",
    title:
      'Institutional Reform Across the Thirteen-Agency Responsibility Chain: Ending Inter-Departmental Blame Shifting',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Whenever a tributary narrows to 3 feet or a marsh turns into a colony, thirteen public institutions (`INST-01` through `INST-13`—LCMA Enforcement, LCMA Planning, Revenue, SMC, SDA, R&B, PCC, HUDD, District Administration, Police, ACB, Judiciary, and Legislative Assembly) possess partial jurisdiction, enabling endless horizontal blame-shifting while consolidated plots harden on the ground.',
      'This chapter maps binding statutory inter-agency protocols across all thirteen institutions: mandatory prior LCMA/hydrological concurrence before any R&B road or utility connection, joint Revenue–LCMA cadastral sign-off, ring-fenced scientific review via restored limnological institutions, and annual legislative audit of Net Aquatic Area Recovered.',
    ],
    investigativeQuestions: [
      'Which concrete statutory sign-offs prevent R&B road divisions, power/water utilities, and sub-registrars from acting at cross-purposes with wetland protection?',
      'How should LCMA’s internal structure separate regulatory permitting and enforcement auditing from civil-works contracting?',
      'How can the Legislative Assembly’s Committee on Environment and Public Accounts Committee institutionalize annual CAG-style balance-sheet audits of Dal, Nigeen, Wular, Anchar, and Khushalsar?',
    ],
    evidenceAndMethods: [
      'Thirteen-institution RACI (Responsible, Accountable, Consulted, Informed) statutory matrix covering `INST-01`–`INST-13`',
      'CAG Report No. 4 of 2025 inter-departmental coordination audit findings',
      'Comparative statutory wetland-authority governance reforms',
    ],
    deliverable:
      'Thirteen-Institution Statutory Coordination & Accountability Protocol for Srinagar’s Wetland System.',
    methodologicalCaveat:
      'Coordinating thirteen agencies must streamline accountability around clear parcel IDs rather than adding bureaucratic delay for ordinary citizens seeking lawful domestic repairs.',
  },
  {
    number: 100,
    code: '100',
    slug: 'chapter-100-the-lake-that-could-disappear-without-its-boundary-disappearing',
    volumeNumber: 15,
    volumeRoman: 'XV',
    volumeTitle: "The Future of Kashmir's Aquatic Commons",
    title:
      'The Lake That Could Disappear Without Its Boundary Disappearing: A Civic Covenant for Kashmir’s Waters (2026–2050)',
    researchStatus:
      'Proposed Chapter Protocol · Archival, Cadastral & Satellite Verification Pending',
    executiveSummary: [
      'Dal Lake does not need to vanish from government maps or tourism postcards in order to cease functioning as a living Himalayan lake. Its outer ring road can remain intact at 24 km², shikaras can still ply a central mirror reflecting Zabarwan’s ridges, and annual conservation budgets can still be announced—while behind willow screens and narrowed khuls, internal marshes solidify into plots, tributaries shrink into drains, and public water quietly turns into private and institutional real estate.',
      'Culminating Monograph 11, this closing chapter distils a twenty-five-year civic, scientific, and legal covenant for 2026–2050—insisting that Dal Lake’s survival be measured not by crores spent, meetings convened, or walls demolished, but by how much unobstructed living water remains, how much lost aquatic space is genuinely recovered, how fairly historic lake communities are treated, and how honestly institutions answer for every square metre transformed.',
    ],
    investigativeQuestions: [
      'What measurable 2030, 2035, and 2050 milestones for unobstructed open water, tributary conveyance, zero net terrestrial conversion, and dignified community sanitation define genuine recovery for the Dal–Nigeen system?',
      'How do independent open satellite observatories, restored local limnological laboratories, fearless investigative journalism, and vigilant courts reinforce one another when political attention fluctuates?',
      'How can the forensic accountability model built for Dal Lake protect Wular, Anchar, Hokersar, Haigam, Khushalsar, Manasbal, and alpine Himalayan lakes before irreversible real-estate conversion takes hold?',
    ],
    evidenceAndMethods: [
      'Integrative synthesis across all fifteen volumes (Chapters 01–99) and all twelve KEW Dal Forensic Observatory modules',
      'Valley-wide replication blueprint extending Dal–Nigeen parcel and tributary forensics to Wular, Anchar, Hokersar, and Manasbal',
      '2026–2050 Intergenerational Aquatic Commons Charter & Public Accountability Benchmarks',
    ],
    deliverable:
      'The 2026–2050 Kashmir Aquatic Commons Covenant & Valley-Wide Forensic Replication Roadmap.',
    methodologicalCaveat:
      'Long-term ecological stewardship depends ultimately on sustained public institutional integrity, open reproducible science, and societal refusal to normalize the privatization of shared waters.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION & VOLUME LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const ENCROACHMENT_ROMAN_TO_NUMBER: Record<string, number> = {
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
};

/**
 * Look up any of the 100 Monograph 11 chapters by canonical slug
 * (`chapter-01-...` .. `chapter-100-...`), short prefix (`chapter-01`),
 * code (`'01'` .. `'100'`), or integer string (`'1'` .. `'100'`).
 */
export function getEncroachmentChapterBySlug(
  slug: string,
): EncroachmentMonographChapter | undefined {
  const clean = decodeURIComponent(slug || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const exact = ENCROACHMENT_CHAPTERS_100.find(
    (ch) => ch.slug.toLowerCase() === clean,
  );
  if (exact) return exact;

  const byCode = ENCROACHMENT_CHAPTERS_100.find(
    (ch) =>
      ch.code.toLowerCase() === clean ||
      `chapter-${ch.code.toLowerCase()}` === clean ||
      String(ch.number) === clean,
  );
  if (byCode) return byCode;

  const prefixMatch = clean.match(/^chapter-(\d{1,3})\b/);
  if (prefixMatch) {
    const num = Number.parseInt(prefixMatch[1], 10);
    return ENCROACHMENT_CHAPTERS_100.find((ch) => ch.number === num);
  }

  return undefined;
}

/**
 * Retrieve previous and next chapters across Chapters 01–100 for sequential navigation.
 */
export function getEncroachmentAdjacentChapters(slug: string): {
  previous?: EncroachmentMonographChapter;
  next?: EncroachmentMonographChapter;
  prev?: EncroachmentMonographChapter;
} {
  const current = getEncroachmentChapterBySlug(slug);
  if (!current) return {};
  const idx = ENCROACHMENT_CHAPTERS_100.findIndex(
    (ch) => ch.number === current.number,
  );
  const previous = idx > 0 ? ENCROACHMENT_CHAPTERS_100[idx - 1] : undefined;
  const next =
    idx >= 0 && idx < ENCROACHMENT_CHAPTERS_100.length - 1
      ? ENCROACHMENT_CHAPTERS_100[idx + 1]
      : undefined;
  return {
    previous,
    next,
    prev: previous,
  };
}

/**
 * Look up any of the 15 Monograph 11 volumes by Roman numeral (`'I'`..`'XV'`),
 * number (`1`..`15`), or volume slug.
 */
export function getEncroachmentVolumeByRomanOrNumber(
  token: string | number,
): EncroachmentMonographVolumeSpec | undefined {
  if (typeof token === 'number') {
    return ENCROACHMENT_VOLUMES_15.find((v) => v.volumeNumber === token);
  }
  const clean = decodeURIComponent(token || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const direct = ENCROACHMENT_VOLUMES_15.find(
    (v) =>
      v.slug.toLowerCase() === clean ||
      v.volumeRoman.toLowerCase() === clean ||
      `volume-${v.volumeRoman.toLowerCase()}` === clean ||
      String(v.volumeNumber) === clean ||
      v.volumeNumber.toString().padStart(2, '0') === clean,
  );
  if (direct) return direct;

  if (clean in ENCROACHMENT_ROMAN_TO_NUMBER) {
    const num = ENCROACHMENT_ROMAN_TO_NUMBER[clean];
    return ENCROACHMENT_VOLUMES_15.find((v) => v.volumeNumber === num);
  }

  return undefined;
}

/**
 * Return the ordered chapters belonging to a given Monograph 11 volume (`I`–`XV`).
 */
export function getEncroachmentChaptersByVolume(
  volumeRoman: string | number,
): EncroachmentMonographChapter[] {
  const vol = getEncroachmentVolumeByRomanOrNumber(volumeRoman);
  if (!vol) return [];
  return ENCROACHMENT_CHAPTERS_100.filter(
    (ch) => ch.volumeNumber === vol.volumeNumber,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. PART XXVI — PERMANENT KEW COMPANION: DAL LAKE ENCROACHMENT &
//     ADMINISTRATIVE ACCOUNTABILITY OBSERVATORY (12 MODULES + 7 INDICATORS)
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_DAL_OBSERVATORY_PUBLIC_INDICATORS_7: KewDalPublicIndicatorSpec[] =
  [
    {
      code: 'IND-01',
      indicatorLabel: 'Historical lake extent',
      definitionAndUnit:
        'Dated historical perimeter and open-water reference baselines (1859: 31.84 km² total / 20.59 km² open water; 1903: 31.64 km² total / 23.98 km² open water).',
      currentVerificationStatus:
        'Published from peer-reviewed historical reconstructions (Rashid et al., 2017; Frontiers in Environmental Science, 2019); Survey of India sheet georeferencing uncertainty bands pending.',
    },
    {
      code: 'IND-02',
      indicatorLabel: 'Current verified water extent',
      definitionAndUnit:
        'Stage-normalized, phenology-matched contemporary unobstructed open water (OW) and submerged-vegetation (SV) area in km² and hectares.',
      currentVerificationStatus:
        'Pending independent November 2026 satellite processing to reconcile CAG 2020 (12.907 km² OW+SV), Government 2026 (>20.3 km² reported), and KEW published estimate (13.95 km²).',
    },
    {
      code: 'IND-03',
      indicatorLabel: 'Permanent land conversion',
      definitionAndUnit:
        'Cumulative area (hectares and kanals) converted into consolidated terrestrial land, cropland/plantation, or built-up cover (+84.1 ha / ~1,663 kanals net cropland+built-up expansion in 2007–2020 CAG balance sheet).',
      currentVerificationStatus:
        '2007–2020 CAG/EE&RSD net balance documented; pixel-level origin-to-destination transition matrix through 2026 pending.',
    },
    {
      code: 'IND-04',
      indicatorLabel: 'New construction footprint',
      definitionAndUnit:
        'Dated roof and impervious plinth emergence (m² and kanals) across residential, commercial, and public-infrastructure categories.',
      currentVerificationStatus:
        '1859–2013 (5 ha to 202 ha) and 2007–2020 (+28.2 ha to 102.5 ha) baselines archived; post-2020 sub-metre building extraction pending.',
    },
    {
      code: 'IND-05',
      indicatorLabel: 'Legally established encroachment',
      definitionAndUnit:
        'Area (m², ha, kanals) adjudicated as unlawful encroachment by final judicial order, certified revenue demarcation, or uncontested statutory determination.',
      currentVerificationStatus:
        'Unverified in aggregate; strictly separated from suspected satellite anomalies and pending/alleged proceedings.',
    },
    {
      code: 'IND-06',
      indicatorLabel: 'Area recovered',
      definitionAndUnit:
        'Verified consolidated land or obstructed channel area physically excavated and reconnected to perennial functioning aquatic habitat (A_ecologically_restored).',
      currentVerificationStatus:
        'Unverified; CAG recorded that 2,299 kanals (~116 ha) acquired under SPA by Dec 2019 remained undredged, and post-2014 demolition square-metres require physical audit.',
    },
    {
      code: 'IND-07',
      indicatorLabel: 'Net annual aquatic recovery',
      definitionAndUnit:
        'Annual spatial balance A_net_recovery = A_ecologically_restored − A_newly_converted (reported in hectares and kanals with 95% confidence bounds).',
      currentVerificationStatus:
        'Proposed mandatory accountability standard; requires annual matched-season satellite and bathymetric audit.',
    },
  ];

export const KEW_DAL_ENCROACHMENT_OBSERVATORY_12: KewDalEncroachmentObservatoryModule[] =
  [
    {
      code: 'DLEO-01',
      title: 'Historical Boundary Registry',
      operationalFunction:
        'Archives georeferenced shorelines and cadastral perimeters from 1859 Survey of India sheets, 1903 colonial revenue maps, 1960s CORONA photography, 1979/2013 academic masks, and the 2,460.5 ha CAG/EE&RSD boundary.',
      dataStandard:
        'Versioned WGS84 GeoJSON polygons with explicit datum-warping RMSE buffers, boundary-pillar status, and inclusion/exclusion metadata.',
      currentStatus:
        '9-epoch tabular series (1859–2013) and CAG 2,460.5 ha balance integrated; historical map vectorization and pillar GNSS audit proposed.',
      connectedKewSurfaceLabel: 'KEW Lake Encroachment Observatory',
      connectedKewSurfaceHref:
        '/earth-human-impact/aquatic-cryosphere/lake-encroachment',
    },
    {
      code: 'DLEO-02',
      title: 'Satellite Change Detection',
      operationalFunction:
        'Executes multi-sensor surface-water, macrophyte, and earthfill classification across all 10 historical epochs (CORONA, Landsat 1–9, Sentinel-1 SAR, Sentinel-2 MSI) under matched-season and matched-gauge-stage rules.',
      dataStandard:
        '15-class forensic land-cover taxonomy (OW through UL) validated via Olofsson stratified confusion matrices and 95% confidence intervals.',
      currentStatus:
        '15-class taxonomy and 10-epoch pipeline specified; independent November 2026 processing and KEW 13.95 km² self-audit queued.',
      connectedKewSurfaceLabel: 'KEW Change Detection Observatory',
      connectedKewSurfaceHref:
        '/earth-human-impact/change-detection-observatory',
    },
    {
      code: 'DLEO-03',
      title: 'Conflict-Era Land Analysis',
      operationalFunction:
        'Reconstructs land-use shifts across 1989–1996 armed conflict, the 1992–2001 (−242 ha open water; +85% floating gardens) interval, and 2008, 2010, 2014, 2016, and 2019–2021 administrative disruption episodes.',
      dataStandard:
        'Matched-season Landsat TM/ETM+/OLI and Sentinel-1/2 difference-in-differences brackets paired with non-monocausal institutional context.',
      currentStatus:
        '4 decadal conflict-era intervals and 7 disruption-episode protocols structured; annual 1989–1996 scene stack pending processing.',
      connectedKewSurfaceLabel: 'KEW Wetland Encroachment Module',
      connectedKewSurfaceHref:
        '/earth-human-impact/aquatic-cryosphere/wetland-encroachment',
    },
    {
      code: 'DLEO-04',
      title: 'Water-to-Land Transition',
      operationalFunction:
        'Tracks pixel- and parcel-level trajectories from unobstructed water and reedbeds to consolidated fill, cropland/plantation (+55.9 ha in 2007–2020), and built-up structures (+28.2 ha in 2007–2020).',
      dataStandard:
        '15 × 15 gross origin–destination transition matrices separating reversible macrophyte shifts (+153.4 ha FV) from durable terrestrial conversion (+84.1 ha).',
      currentStatus:
        'CAG 2007–2014–2020 balance sheet and 10.15% vs. 16.22% mathematical correction operational; pixel transition matrices proposed.',
      connectedKewSurfaceLabel: 'KEW Aquatic & Cryosphere Core',
      connectedKewSurfaceHref: '/earth-human-impact/aquatic-cryosphere',
    },
    {
      code: 'DLEO-05',
      title: 'Parcel Accountability',
      operationalFunction:
        'Maintains the 17-field Dal Lake Parcel Accountability Registry linking geographic transformation dates to tenure, sanctions, inspections, notices, court orders, ACB dockets, and recorded right of response.',
      dataStandard:
        'Strict four-state legal classification (`verified` | `alleged` | `disputed` | `resolved`) with household PII redaction and presumption-of-innocence safeguards.',
      currentStatus:
        '17-field evidentiary schema and 7-tier social-differentiation rules specified; parcel population gated on verified cadastral/judicial records.',
      connectedKewSurfaceLabel: 'Dal Forensic Observatory Submodule',
      connectedKewSurfaceHref:
        '/earth-human-impact/aquatic-cryosphere/lake-encroachment/dal-lake-forensic-observatory',
    },
    {
      code: 'DLEO-06',
      title: 'Construction Permissions',
      operationalFunction:
        'Audits BOCA / LAWDA / LCMA building and repair sanctions, June 1986 moratorium exemptions, Srinagar Master Plan 2035 buffer compliance, and sanctioned-versus-built plinth deviations.',
      dataStandard:
        'Georeferenced sanction-order ledger cross-checked against high-resolution roof/plinth footprints and utility-connection NOC rules.',
      currentStatus:
        'Audit protocol established across 13-agency responsibility chain; historical BOCA minutes ingestion pending.',
      connectedKewSurfaceLabel: 'KEW Environmental Governance Hub',
      connectedKewSurfaceHref: '/governance',
    },
    {
      code: 'DLEO-07',
      title: 'Enforcement Intelligence',
      operationalFunction:
        'Reconstructs the flood-damaged 2000–September 2014 enforcement gap (14+ years), audits post-2014 removals (2,916 reported through 2025; 632 during Oct 2024–Feb 2026), and evaluates CCTV surveillance coverage (19/40 km; 9/20 poles initially).',
      dataStandard:
        'Eight outcome-verified enforcement metrics (`EMR-01`–`EMR-08`) measuring square metres prevented and recovered rather than raw operation counts.',
      currentStatus:
        'LCMA July 2025 RTI, Feb 2026 Assembly figures, and CAG CCTV audit integrated; post-demolition site persistence checks proposed.',
      connectedKewSurfaceLabel: 'KEW Environmental Accountability Observatory',
      connectedKewSurfaceHref:
        '/governance/environmental-accountability-observatory',
    },
    {
      code: 'DLEO-08',
      title: 'Judicial Case Archive',
      operationalFunction:
        'Tracks J&K High Court PIL orders (2002–2024+), Divisional Commissioner inquiries (including the March 2009 eight-official report), police FIRs (including eight 2016 unrest FIRs), and ACB FIR No. 48/2015 across all 8 accountability stages.',
      dataStandard:
        'End-to-end 8-stage docket schema pairing verbatim judicial citations with explicit presumption-of-innocence and final-disposition notices.',
      currentStatus:
        '2009 inquiry, 2015–2020 ACB charge-sheet announcement, and 2018/2020/2024 High Court proceedings indexed; trial-disposition tracking ongoing.',
      connectedKewSurfaceLabel: 'KEW Environmental PIL & Legal Hub',
      connectedKewSurfaceHref: '/environmental-pil',
    },
    {
      code: 'DLEO-09',
      title: 'Public Asset Valuation',
      operationalFunction:
        'Models economic incentives driving wetland privatization across stratified Srinagar circle rates, commercial hospitality revenues, and public land-acquisition outlays.',
      dataStandard:
        'Explicit separation between clearly labelled hypothetical scenario calculators (e.g., 100 kanals @ ₹50 lakh = ₹50 Cr) and verified stamp-duty / collector award records.',
      currentStatus:
        'Interactive land-value scenario benchmark operational; ward-stratified official circle-rate series proposed.',
      connectedKewSurfaceLabel: 'KEW Sectoral EIA & Cumulative Impact',
      connectedKewSurfaceHref: '/sectoral-eia/cumulative-impact',
    },
    {
      code: 'DLEO-10',
      title: 'Hydrological Obstruction',
      operationalFunction:
        'Monitors feeder tributaries, R&B road-culvert blockages (four CAG locations), Chatterhama Nallah (60–70 ft → 3–4 ft), Saidnar Nallah (100–150 ft → 25–30 ft), Tailbal retaining walls, Nallah Amir Khan, and internal khuls.',
      dataStandard:
        'Longitudinal stream-width transect profiles (distinguishing localized cross-sections from full-reach averages) paired with culvert conveyance ratings.',
      currentStatus:
        'All 9 CAG watercourse obstruction sites and 2 severe narrowing cases documented; full-reach transect mapping proposed.',
      connectedKewSurfaceLabel: 'KEW Water Quality & Limnology Surfaces',
      connectedKewSurfaceHref: '/water-climate/water-quality',
    },
    {
      code: 'DLEO-11',
      title: 'Rehabilitation Monitoring',
      operationalFunction:
        'Audits the ₹356 crore SPA acquisition and relocation programme (2,299/14,992 kanals; 319/1,994 structures; ₹63.73 Cr spent; ₹272.82 Cr unreleased), Rakh-i-Arth civic infrastructure, and survey cut-off equity for historic lake dwellers.',
      dataStandard:
        '7-tier community differentiation (`COM-01`–`COM-07`) pairing fiscal acquisition tracking with human-dignity and livelihood indicators.',
      currentStatus:
        'December 2019 CAG SPA audit baselines integrated; post-2019 relocation and Rakh-i-Arth infrastructure status updates proposed.',
      connectedKewSurfaceLabel: 'KEW EcoVoices & Community Stewardship',
      connectedKewSurfaceHref: '/ecovoices',
    },
    {
      code: 'DLEO-12',
      title: 'Ecological Recovery',
      operationalFunction:
        'Tracks physical dredging of the ~116 ha (2,299 kanals) of already-acquired land, evaluates realistic 100-hectare (1,977-kanal) habitat restoration scenarios, and computes annual Net Aquatic Area Recovered.',
      dataStandard:
        'Bathymetric, multi-season persistence, and benthic biological verification governing A_net_recovery = A_ecologically_restored − A_newly_converted.',
      currentStatus:
        'Net Aquatic Area Recovered formula and 100 ha recovery workbench active; field parcel restoration certification pending.',
      connectedKewSurfaceLabel: 'KEW Dal Lake Performance & Science Archive',
      connectedKewSurfaceHref: '/research-library',
    },
  ];

export const KEW_DAL_OBSERVATORY_SPEC = {
  kicker: 'KEW · AQUATIC ENVIRONMENTAL INTELLIGENCE',
  title: 'Dal Lake Encroachment & Administrative Accountability Observatory',
  parentObservatoryPath: '/earth-human-impact/aquatic-cryosphere/lake-encroachment',
  dedicatedForensicPath:
    '/earth-human-impact/aquatic-cryosphere/lake-encroachment/dal-lake-forensic-observatory',
  publicCounterIntegrityRule:
    'All public counters must be backed by dated datasets, reproducible calculations, and documented geographical boundaries. No simulated, extrapolated, or unverified estimate may ever be labelled as a live verified measurement.',
  principalPublicIndicators7: KEW_DAL_OBSERVATORY_PUBLIC_INDICATORS_7,
  modules12: KEW_DAL_ENCROACHMENT_OBSERVATORY_12,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 11. PART XXVIII — PRIMARY DOCUMENTARY EVIDENCE (11 CLEAN SOURCES)
// ─────────────────────────────────────────────────────────────────────────────

export const PRIMARY_DOCUMENTARY_EVIDENCE_11: PrimaryDocumentaryEvidenceSource[] =
  [
    {
      code: 'DOC-01',
      sourceLabel: 'Rashid et al., 2017',
      authorityOrPublication: 'Limnologica (Elsevier / ScienceDirect)',
      yearOrDate: '2017 (covering 1859–2013)',
      url: 'https://www.sciencedirect.com/science/article/pii/S0075951116302158',
      investigativeValue: 'Historical reconstruction from 1859–2013',
    },
    {
      code: 'DOC-02',
      sourceLabel: 'Frontiers in Environmental Science, 2019',
      authorityOrPublication:
        'Frontiers in Environmental Science (Peer-Reviewed Srinagar Wetlands Study)',
      yearOrDate: '2019',
      url: 'https://www.frontiersin.org/journals/environmental-science/articles/10.3389/fenvs.2019.00199/full',
      investigativeValue: 'Detailed historical land-use figures',
    },
    {
      code: 'DOC-03',
      sourceLabel: 'CAG Report No. 4 of 2025',
      authorityOrPublication: 'Comptroller and Auditor General of India (CAG)',
      yearOrDate: '2025 (covering 2004–2022 / 2007–2020 datasets)',
      url: 'https://cag.gov.in/en/audit-report/details/125068',
      investigativeValue:
        'Land-use change, administrative deficiencies and enforcement',
    },
    {
      code: 'DOC-04',
      sourceLabel: 'Anti-Corruption Bureau official charge sheet announcement',
      authorityOrPublication:
        'Jammu and Kashmir Anti-Corruption Bureau (FIR No. 48/2015)',
      yearOrDate: 'December 2020',
      url: 'https://jkacb.in/link.php?sno=214',
      investigativeValue: 'Documented allegations of official collusion',
    },
    {
      code: 'DOC-05',
      sourceLabel:
        'Centre for Science and Environment litigation chronology',
      authorityOrPublication: 'Centre for Science and Environment (CSE India)',
      yearOrDate: '2009–archive compilation',
      url: 'https://www.cseindia.org/cases-on-protection-of-lakes-2547',
      investigativeValue: 'Historical judicial interventions',
    },
    {
      code: 'DOC-06',
      sourceLabel: 'High Court proceedings, 2018',
      authorityOrPublication:
        'High Court of Jammu & Kashmir and Ladakh (via Indian Kanoon)',
      yearOrDate: '2018',
      url: 'https://indiankanoon.org/doc/52574074/',
      investigativeValue: 'Continuing judicial oversight',
    },
    {
      code: 'DOC-07',
      sourceLabel: 'High Court proceedings, 2020',
      authorityOrPublication:
        'High Court of Jammu & Kashmir and Ladakh (via Indian Kanoon)',
      yearOrDate: '2020',
      url: 'https://indiankanoon.org/doc/152003009/',
      investigativeValue: 'Boundary and encroachment accountability',
    },
    {
      code: 'DOC-08',
      sourceLabel: 'High Court proceedings, 2024',
      authorityOrPublication:
        'High Court of Jammu & Kashmir and Ladakh (via Indian Kanoon)',
      yearOrDate: '2024',
      url: 'https://indiankanoon.org/doc/45973173/',
      investigativeValue: 'Continued legal examination',
    },
    {
      code: 'DOC-09',
      sourceLabel: 'Bhan and Trisal, Fluid Landscapes',
      authorityOrPublication:
        'Critique of Anthropology (Mona Bhan & Nishita Trisal)',
      yearOrDate: '2017',
      url: 'https://www.nishitatrisal.com/downloads/critique-of-anthropology.pdf',
      investigativeValue: 'Political conflict and conservation governance',
    },
    {
      code: 'DOC-10',
      sourceLabel: 'LCMA RTI disclosure, July 2025',
      authorityOrPublication:
        'Greater Kashmir (reporting LCMA Enforcement Wing RTI reply)',
      yearOrDate: 'July 2025',
      url: 'https://www.greaterkashmir.com/city/no-record-of-encroachments-before-2014-available-lcma/',
      investigativeValue: 'Historical enforcement record loss',
    },
    {
      code: 'DOC-11',
      sourceLabel: 'Kashmir News Trust, October 24, 2026',
      authorityOrPublication: 'Kashmir News Trust (KNT)',
      yearOrDate: 'October 24, 2026',
      url: 'https://newsagencyknt.com/illegal-constructions-soil-filling-continue-inside-dal-lake-lcma-visits-fail-to-halt-activity/',
      investigativeValue: 'Contemporary encroachment allegations',
    },
  ];

// ─────────────────────────────────────────────────────────────────────────────
// 12. OPEN DATASET PAYLOAD & RFC-4180 CSV EXPORT BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the complete machine-readable JSON dataset payload for
 * `/api/himalayan-dispatch/datasets/dal-encroachment-monograph-framework`.
 */
export function buildEncroachmentMonographDatasetPayload() {
  return {
    schemaVersion: '1.0.0',
    generatedFrameworkId: 'kew-hd-monograph-11-the-art-of-encroachment',
    researchLimitationsDisclosure:
      ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.researchLimitationsDisclosure,
    presumptionOfInnocenceNotice:
      ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC.presumptionOfInnocenceNotice,
    counts: {
      volumes: ENCROACHMENT_VOLUMES_15.length,
      chapters: ENCROACHMENT_CHAPTERS_100.length,
      historicalOpenWaterObservations: HISTORICAL_OPEN_WATER_SERIES_9.length,
      conflictEraIntervals: CONFLICT_ERA_INTERVALS_4.length,
      governanceChronologyPeriods: HISTORICAL_GOVERNANCE_CHRONOLOGY_12.length,
      accountabilityStages:
        ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC.accountabilityStages8.length,
      landUseTransitionClasses: LAND_USE_TRANSITION_CLASSES_9.length,
      publicInfrastructureObstructions:
        PUBLIC_INFRASTRUCTURE_OBSTRUCTIONS_9.length,
      tributaryNarrowingCases: TRIBUTARY_NARROWING_CASES_2.length,
      cagBalanceSheetRows: CAG_LAND_USE_BALANCE_2007_2020.rows.length,
      encroachmentLocalityLeads: ENCROACHMENT_LOCALITIES_9.length,
      lakeBasinDossiers: LAKE_BASIN_DOSSIERS_8.length,
      disruptionEpisodes: DISRUPTION_EPISODES_7.length,
      enforcementMetricsReforms: ENFORCEMENT_METRICS_REFORM_8.length,
      conflicting2026AreaEstimates: CONFLICTING_2026_AREA_ESTIMATES_4.length,
      satelliteEpochs: FORENSIC_SATELLITE_PROTOCOL_SPEC.satelliteEpochs10.length,
      scientificLandCoverClasses:
        FORENSIC_SATELLITE_PROTOCOL_SPEC.landCoverClasses15.length,
      parcelRegistryFields:
        FORENSIC_SATELLITE_PROTOCOL_SPEC.parcelRegistryFields17.length,
      responsibilityChainInstitutions:
        FORENSIC_SATELLITE_PROTOCOL_SPEC.responsibilityChain13.length,
      communityDifferentiationCategories:
        FORENSIC_SATELLITE_PROTOCOL_SPEC.communityDifferentiation7.length,
      fiveLakesideContradictions:
        FORENSIC_SATELLITE_PROTOCOL_SPEC.fiveLakesideContradictions5.length,
      observatoryModules: KEW_DAL_ENCROACHMENT_OBSERVATORY_12.length,
      observatoryPublicIndicators: KEW_DAL_OBSERVATORY_PUBLIC_INDICATORS_7.length,
      primaryDocumentarySources: PRIMARY_DOCUMENTARY_EVIDENCE_11.length,
    },
    monographSpec: ART_OF_ENCROACHMENT_MONOGRAPH_SPEC,
    historicalOpenWaterSeries: {
      roundedHeadlineComparison:
        HISTORICAL_OPEN_WATER_SERIES_9.roundedHeadlineComparison,
      preciseHistoricalSummary:
        HISTORICAL_OPEN_WATER_SERIES_9.preciseHistoricalSummary,
      methodologicalNote: HISTORICAL_OPEN_WATER_SERIES_9.methodologicalNote,
      observations: [...HISTORICAL_OPEN_WATER_SERIES_9],
    },
    conflictEraIntervals: {
      focusInterval1992To2001: CONFLICT_ERA_INTERVALS_4.focusInterval1992To2001,
      causalGuardrailNote: CONFLICT_ERA_INTERVALS_4.causalGuardrailNote,
      intervals: [...CONFLICT_ERA_INTERVALS_4],
    },
    historicalGovernanceChronology: HISTORICAL_GOVERNANCE_CHRONOLOGY_12,
    acbAndJudicialAccountability: ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC,
    landUseTransitionClasses: LAND_USE_TRANSITION_CLASSES_9,
    publicInfrastructureObstructions: PUBLIC_INFRASTRUCTURE_OBSTRUCTIONS_9,
    tributaryNarrowingCases: TRIBUTARY_NARROWING_CASES_2,
    cagLandUseBalance2007To2020: CAG_LAND_USE_BALANCE_2007_2020,
    encroachmentLocalities: ENCROACHMENT_LOCALITIES_9,
    lakeBasinDossiers: LAKE_BASIN_DOSSIERS_8,
    disruptionEpisodes: DISRUPTION_EPISODES_7,
    surveillanceAndSpaAudit: SURVEILLANCE_AND_SPA_AUDIT_SPEC,
    enforcementMetricsReform: ENFORCEMENT_METRICS_REFORM_8,
    conflicting2026AreaEstimates: {
      governmentVegetationClearanceKm2Approx:
        CONFLICTING_2026_AREA_ESTIMATES_4.governmentVegetationClearanceKm2Approx,
      govtVsKewDiscrepancyKm2:
        CONFLICTING_2026_AREA_ESTIMATES_4.govtVsKewDiscrepancyKm2,
      govtVsKewDiscrepancyHa:
        CONFLICTING_2026_AREA_ESTIMATES_4.govtVsKewDiscrepancyHa,
      contemporaryReportingLeads2026:
        CONFLICTING_2026_AREA_ESTIMATES_4.contemporaryReportingLeads2026,
      kewSelfVerificationMandate:
        CONFLICTING_2026_AREA_ESTIMATES_4.kewSelfVerificationMandate,
      estimates: [...CONFLICTING_2026_AREA_ESTIMATES_4],
    },
    forensicSatelliteProtocol: FORENSIC_SATELLITE_PROTOCOL_SPEC,
    volumes: ENCROACHMENT_VOLUMES_15,
    chapters: ENCROACHMENT_CHAPTERS_100,
    kewDalEncroachmentObservatory: KEW_DAL_OBSERVATORY_SPEC,
    primaryDocumentaryEvidence: PRIMARY_DOCUMENTARY_EVIDENCE_11,
  };
}

function escapeEncroachmentCsvCell(value: string | number): string {
  const str = String(value ?? '');
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Build a machine-readable RFC-4180 CSV export covering all 100 chapter protocols,
 * 9 historical open-water observations, 8 CAG balance-sheet rows, 15 EO classes,
 * 13 responsible institutions, 12 KEW Dal Observatory modules, and 11 primary sources
 * for `/api/himalayan-dispatch/datasets/dal-encroachment-monograph-framework?format=csv`.
 */
export function buildEncroachmentMonographCsv(): string {
  const headers = [
    'record_type',
    'code',
    'slug_or_id',
    'parent_group',
    'title_or_name',
    'status_or_period',
    'primary_deliverable_or_metric',
    'caveat_or_standard',
    'canonical_url',
  ];

  const rows: string[][] = [headers];

  for (const ch of ENCROACHMENT_CHAPTERS_100) {
    rows.push([
      'chapter',
      ch.code,
      ch.slug,
      `Volume ${ch.volumeRoman}: ${ch.volumeTitle}`,
      ch.title,
      ch.researchStatus,
      ch.deliverable,
      ch.methodologicalCaveat,
      `${ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.canonicalMonographPath}/chapters/${ch.slug}`,
    ]);
  }

  for (const obs of HISTORICAL_OPEN_WATER_SERIES_9) {
    rows.push([
      'historical_open_water',
      String(obs.year),
      `dal-extent-${obs.year}`,
      '1859–2013 Historical Reconstruction',
      `Dal Lake ${obs.year} Surface Reconstruction`,
      String(obs.year),
      `Total: ${obs.totalLakeExtent} | Open water: ${obs.openWater} | Built-up: ${obs.builtUpLand}`,
      obs.analyticalNote,
      ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.kewDalForensicSubpath,
    ]);
  }

  for (const cagRow of CAG_LAND_USE_BALANCE_2007_2020.rows) {
    rows.push([
      'cag_land_use_balance',
      cagRow.id,
      cagRow.id,
      'CAG Report No. 4 of 2025 (EE&RSD 2,460.5 ha Polygon)',
      cagRow.landUseCategory,
      '2007–2020',
      `2007: ${cagRow.area2007Label} | 2014: ${cagRow.area2014Label} | 2020: ${cagRow.area2020Label} | Net: ${cagRow.netChangeLabel}`,
      CAG_LAND_USE_BALANCE_2007_2020.cagPercentageCorrection
        .mathematicalExplanation,
      ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.kewDalForensicSubpath,
    ]);
  }

  for (const lc of FORENSIC_SATELLITE_PROTOCOL_SPEC.landCoverClasses15) {
    rows.push([
      'eo_land_cover_class',
      lc.code,
      `eo-class-${lc.code.toLowerCase()}`,
      '15-Class Forensic Satellite Taxonomy',
      lc.landCoverClass,
      'Proposed EO Classification Standard',
      lc.reversibilityAndForensicRole,
      FORENSIC_SATELLITE_PROTOCOL_SPEC.seasonalNormalizationRule,
      ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.kewDalForensicSubpath,
    ]);
  }

  for (const inst of FORENSIC_SATELLITE_PROTOCOL_SPEC.responsibilityChain13) {
    rows.push([
      'responsibility_chain_institution',
      inst.code,
      inst.code.toLowerCase(),
      '13-Agency Administrative Responsibility Chain',
      inst.institution,
      'Institutional Accountability Scope',
      inst.principalResponsibilityToInvestigate,
      ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC.coreDiagnosticPrinciple,
      ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.canonicalMonographPath,
    ]);
  }

  for (const mod of KEW_DAL_ENCROACHMENT_OBSERVATORY_12) {
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

  for (const src of PRIMARY_DOCUMENTARY_EVIDENCE_11) {
    rows.push([
      'primary_documentary_source',
      src.code,
      src.code.toLowerCase(),
      src.authorityOrPublication,
      src.sourceLabel,
      src.yearOrDate,
      src.investigativeValue,
      ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.researchLimitationsDisclosure,
      src.url,
    ]);
  }

  return rows
    .map((row) => row.map(escapeEncroachmentCsvCell).join(','))
    .join('\r\n');
}


