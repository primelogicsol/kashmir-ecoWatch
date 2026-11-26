// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — INDIVIDUAL SCIENTIFIC DOSSIER RECONSTRUCTION SCHEMA
// Enforces 100 distinct scientific identities, discipline-specific methodologies,
// verified bibliographies, accurate study-area geographies, report-specific
// environmental indicator registries, honest secondary-data provenance, and
// automated publication quality gates across KEW-SR-2026-01 through 100.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  DataProvenanceClass,
  RiskMatrixEntry,
  TelemetryTimeSeriesPoint,
} from '@/data/sectoral-research-content-engine';
import type {
  ScientificPdfChapter,
} from '@/lib/pdf/kew-scientific-pdf-engine';

/**
 * 8-Tier Scientific Publication Classification (Section 15 Governance Standard)
 */
export type ScientificPublicationClassification =
  | 'Research Proposal'
  | 'Scientific Scoping Dossier'
  | 'Secondary-Data Scientific Review'
  | 'Systematic Literature Review'
  | 'Modelled Environmental Assessment'
  | 'Original Empirical Investigation'
  | 'Technical Scientific Report'
  | 'Approved Scientific Publication';

export type PrimaryScientificDiscipline =
  | 'Glaciology & Cryospheric Geodesy'
  | 'Snow Hydrology & Energy-Balance Modelling'
  | 'Periglacial Geomorphology & Permafrost Physics'
  | 'Aerosol Radiative Physics & Cryosphere-Atmosphere Interaction'
  | 'Isotope & End-Member Tracer Hydrology'
  | 'Proglacial Primary Succession & Chronosequence Ecology'
  | 'Limnology, Bathymetry & Trophic Biogeochemistry'
  | 'Wetland Hydroperiod & Ramsar Ecological Character Science'
  | 'Phycology, Cyanobacterial Dynamics & Aquatic Ecotoxicology'
  | 'Cold-Water Ichthyology & Fluvial Habitat Suitability'
  | 'Benthic Macroinvertebrate Biomonitoring & Food-Web Ecology'
  | 'Drinking Water Engineering & Quantitative Microbial Risk Assessment'
  | 'Fluvial Geomorphology, Sediment Transport & Hydraulic Modelling'
  | 'Hydrogeology, Karst/Karewa Spring Hydraulics & Isotope Recharge'
  | 'Atmospheric Chemistry, Boundary-Layer Physics & Source Apportionment'
  | 'Synoptic Meteorology, Atmospheric Rivers & Orographic Dynamics'
  | 'Climatology, CMIP6 Ensemble Downscaling & Uncertainty Analysis'
  | 'Phenological Ecology & Trophic Mismatch Analysis'
  | 'Seismology, Active Fault Kinematics & Probabilistic Seismic Hazard Assessment'
  | 'Engineering Geology, MT-InSAR Deformation & Landslide Susceptibility'
  | 'Snowpack Stratigraphy, Slab Mechanics & Avalanche Runout Modelling'
  | 'Glacial Geomorphology, Moraine Dam Geotechnical Stability & Breach Routing'
  | 'Multi-Hazard Systemic Risk & Critical Infrastructure Network Science'
  | 'Population Ecology, Conservation Genetics & Viability Modelling'
  | 'Wildlife Spatial Ecology, Predator-Prey Dynamics & Connectivity'
  | 'Ornithology, Flyway Stopover Ecology & Waterbird Demographics'
  | 'Alpine Botany, Endemism Biogeography & Niche Modelling'
  | 'Quantitative Ethnobotany & Non-Timber Resource Harvest Modelling'
  | 'Invasion Biology, Propagule Pressure & Community Displacement'
  | 'Human-Wildlife Conflict Spatial Risk & Coexistence Science'
  | 'Systematic Conservation Planning & Protected Area Effectiveness'
  | 'Forest Ecology, Allometric Biomass & Terrestrial Carbon Accounting'
  | 'Alpine Treeline Ecophysiology & Dendroclimatology'
  | 'Pyrogeography, Fuel Moisture Modelling & Post-Fire Recovery'
  | 'Urban Dendrology, Root-Zone Arboriculture & Heritage Conservation'
  | 'Industrial Ecology, ISO 14040/14044 Lifecycle Assessment & Material Flow'
  | 'Agro-Hydrology, Soil Nutrient Mass Balance & Wetland Buffer Engineering'
  | 'Agro-Ecology, Pesticide Fate/Transport & Pollinator Ecotoxicology'
  | 'Rangeland Ecology, Pastoral Carrying Capacity & Mountain Soil Carbon'
  | 'Recreation Ecology, Visitor Carrying Capacity & Cumulative Tourism EIA'
  | 'Urban Spatial Statistics, Land-Change Science & Surface Energy Balance'
  | 'Quaternary Stratigraphy, Tectonic Geomorphology & Geoheritage'
  | 'Pedology, RUSLE Erosion Modelling & Land Degradation Neutrality'
  | 'Biogeographical Regionalization & Topoclimatic Ecosystem Classification'
  | 'Remote Sensing Radiometric Harmonization & Error Propagation Science'
  | 'Environmental Acoustics, Soundscape Propagation & Receptor Exposure'
  | 'Nighttime Radiometry (ALAN), Skyglow Physics & Scotobiology'
  | 'Analytical Environmental Chemistry & Trace Micropollutant Fate'
  | 'Environmental Microbiology, Resistome (AMR) Surveillance & One Health'
  | 'Hazardous & Biomedical Waste Containment & Exposure Assessment'
  | 'Regional & Transboundary Watershed Systems Synthesis'
  | 'Environmental Law, Regulatory Compliance & Judicial Accountability'
  | 'Environmental Justice, Distributive Exposure & Social Vulnerability'
  | 'Conservation Impact Evaluation & Counterfactual Outcome Science'
  | 'Participatory Citizen Science, Observer Bias Modelling & Data QA/QC'
  | 'UN SEEA Ecosystem Accounting & Sustainable Development Indicators'
  | 'Environmental Data Architecture, Provenance & Reproducibility Science';

export interface ReconstructedStudyLocation {
  name: string;
  latitude: number;
  longitude: number;
  elevationM: number;
  role: string;
}

export interface ReconstructedStudyArea {
  region: string;
  districts: string[];
  ecosystems: string[];
  watershedOrDomain: string;
  geometryType:
    | 'Polygon Study Envelope'
    | 'Multi-Site Monitoring Network'
    | 'Linear Infrastructure / Fluvial Corridor'
    | 'Regional Administrative / Legal Domain';
  spatialExtentKm2: string;
  elevationBand: string;
  coordinates: [number, number]; // [lat, lng] unique subject centroid
  studyLocations: ReconstructedStudyLocation[];
  boundarySource: string;
  spatialAccuracy: string;
  gisLayers: string[];
}

export interface ReconstructedSensorOrAnalyticalMethod {
  sensorOrInstrument: string;
  productOrStandard: string;
  spatialOrAnalyticalResolution: string;
  temporalCoverage: string;
  preprocessingAndMethod: string;
  validationAndUncertainty: string;
  roleInStudy: 'Primary Orbital Sensor' | 'Climate/Hydrological Reanalysis' | 'Field Survey Protocol' | 'Laboratory / Analytical Assay' | 'Statutory / Legal Archival Corpus';
}

export interface ReconstructedIndicatorSpec {
  id: string;
  name: string;
  scientificDefinition: string;
  unit: string;
  measurementMethodology: string;
  dataSource: string;
  observationPeriod: string;
  spatialScale: string;
  scientificRelevance: string;
  regulatoryThresholdLabel: string;
  thresholdValue: number | null;
  baselineValue: number | null;
  observedValue: number | null;
  classification: 'Critical' | 'Elevated Stress' | 'Moderate' | 'Within Threshold' | 'Pending Validation';
  trend: 'Deteriorating' | 'Improving' | 'Stable' | 'Seasonal Surge' | 'Pending Field Sampling';
  uncertainty: string;
  provenanceClass: DataProvenanceClass;
  dataAvailability: 'Published Secondary Baseline' | 'Satellite Archive Derived' | 'Statutory Monitoring Record' | 'Pending Empirical Acquisition';
  validationStatus: 'Secondary-Literature Verified' | 'Cross-Sensor Verified' | 'Statutory Audit Verified' | 'Pre-Registered Protocol';
}

export interface ReconstructedBibliographyEntry {
  num: number;
  id: string;
  authors: string;
  year: number;
  title: string;
  journalOrPublisher: string;
  category:
    | 'Peer-Reviewed Journal'
    | 'Government / Statutory Audit'
    | 'Institutional Monograph'
    | 'Satellite / Geospatial Product';
  doi?: string;
  sourceUrl?: string;
  relevantFinding: string;
  applicabilityLimitation: string;
}

export interface ReconstructedMitigationEntry {
  id: string;
  category:
    | 'Evidence-Supported Intervention'
    | 'Proposed Intervention'
    | 'Regulatory Obligation'
    | 'Engineering Alternative'
    | 'Ecological Restoration'
    | 'Monitoring Requirement'
    | 'Research Recommendation'
    | 'Uncertainty-Dependent Decision';
  recommendation: string;
  scientificMechanism: string;
  targetReceptorOrIndicator: string;
  feasibilityAssessment: string;
  environmentalTradeOffs: string;
  responsibleInstitutions: string;
}

export interface ReconstructedChapterSpec extends ScientificPdfChapter {
  applicabilityStatus?: 'Applicable' | 'Discipline-Adapted';
  applicabilityNote?: string;
}

export interface IndividualScientificDossierSpec {
  code: string; // KEW-SR-2026-01 .. KEW-SR-2026-100
  sequenceNumber: number;
  publicationClassification: ScientificPublicationClassification;
  primaryDiscipline: PrimaryScientificDiscipline;
  supportingDisciplines: string[];
  subtitle: string;

  // Individual Scientific Identity (Section 3)
  researchIdentity: {
    researchProblem: string;
    primaryResearchQuestion: string;
    secondaryResearchQuestions: string[];
    scientificObjectives: string[];
    hypotheses: string[];
    temporalBoundaries: {
      historicalBaselineWindow: string;
      contemporaryObservationWindow: string;
      periodJustification: string;
    };
    environmentalReceptors: string[];
    researchVariables: {
      independentDrivers: string[];
      dependentResponses: string[];
      confoundingFactors: string[];
    };
    methodologySummary: string;
    analyticalTechniques: string[];
    expectedScientificContribution: string;
  };

  // Report-Specific Geographical Intelligence (Section 8)
  studyArea: ReconstructedStudyArea;

  // Structured 7-Part Abstract
  structuredAbstract: {
    background: string;
    problem: string;
    objectives: string;
    methodology: string;
    findings: string;
    implications: string;
    interventions: string;
  };

  // Discipline-Appropriate Remote Sensing, Field & Lab Spec (Sections 4, 9, 11)
  remoteSensingAndAnalyticalMethods: ReconstructedSensorOrAnalyticalMethod[];
  remoteSensingApplicabilityNote: string;

  // Individually Designed Indicator Registry (Section 9)
  indicators: ReconstructedIndicatorSpec[];

  // Report-Specific Telemetry / Published Secondary Time Series (Section 10)
  telemetrySeries: {
    indicatorLabel: string;
    unit: string;
    provenanceClass: DataProvenanceClass;
    sourceNote: string;
    stations: string[];
    points: TelemetryTimeSeriesPoint[];
  };

  // Visualization Domain Specification (Section 12)
  visualizationSpec: {
    domainType:
      | 'Glaciology'
      | 'Limnology & Wetland Hydrology'
      | 'Fluvial & Hydrogeology'
      | 'Atmospheric & Climate Science'
      | 'Geohazards & Seismology'
      | 'Industrial Ecology & LCA'
      | 'Agro-Ecology & Soil Systems'
      | 'Biodiversity & Forest Ecology'
      | 'Pollution & One Health'
      | 'Earth Systems & Geospatial QA'
      | 'Environmental Governance & Natural Capital';
    primaryFigureDescription: string;
    spatialLayerDescription: string;
  };

  // Reconstructed Substantive Chapters (Section 7)
  chapters: ReconstructedChapterSpec[];

  // Risk & Impact Assessment (Section 13)
  riskMethodologyNote: string;
  riskMatrix: RiskMatrixEntry[];

  // Mitigation & Policy Recommendations (Section 14)
  mitigationRecommendations: ReconstructedMitigationEntry[];

  // Verified Report-Specific Bibliography (Section 5)
  references: ReconstructedBibliographyEntry[];

  // Explicit Epistemic & Data Limitations (Section 6 & 20)
  limitations: string[];
  version: string;
  lastRevised: string;
  dataQualityLabel: string;
}
