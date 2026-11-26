// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI HIGH-PRIORITY INVESTIGATION EXPANSION — PART I (16 INVESTIGATIONS)
// KEW-INV-0010 .. KEW-INV-0025 across Four Thematic Accountability Series:
//   1. Dal Lake Ecological Interventions (KEW-INV-0010 .. 0012)
//   2. Dachigam National Park Investigations (KEW-INV-0013 .. 0017)
//   3. Salim Ali National Park Historical & Legal Investigations (KEW-INV-0018 .. 0020)
//   4. Drinking Water Security & Public Water Supply in Kashmir (KEW-INV-0021 .. 0025)
// Scientific Governance: All 16 records remain Scoping Review or Proposed until
// primary institutional datasets and peer-review validation gates are completed.
// ─────────────────────────────────────────────────────────────────────────────

import {
  CitationReference,
  DisciplineFinding,
  EvidenceVerificationClass,
  InvestigationDomainId,
  InvestigationPriority,
  InvestigationRecord,
  InvestigationReportSection,
  InvestigationSeriesId,
  InvestigationStatus,
} from '@/types/environmental-investigations';

const ALL_10_KASHMIR_DISTRICTS = [
  'Anantnag',
  'Bandipora',
  'Baramulla',
  'Budgam',
  'Ganderbal',
  'Kulgam',
  'Kupwara',
  'Pulwama',
  'Shopian',
  'Srinagar',
];

function buildStructuredCharterSections(params: {
  leadExec: string;
  centralQuestion: string;
  background: string;
  geography: string;
  baseline: string;
  interventions: string;
  methodology: string;
  hydrologyApplicable: boolean;
  hydrologyNote: string;
  accountabilityLead: string;
  regulatoryLead: string;
  alternativesLead: string;
  callouts?: Array<{ label: string; value: string; unit?: string; sourceTag: string }>;
}): InvestigationReportSection[] {
  return [
    {
      sectionNumber: '01',
      key: 'executive-summary',
      title: 'Executive Summary & Scoping Mandate',
      applicable: true,
      leadSummary: params.leadExec,
      bodyParagraphs: [
        `Central Scientific Question: ${params.centralQuestion}`,
        'In strict compliance with KEW-EIAI publication governance, this record is maintained as an active scoping / proposed scientific investigation rather than a completed report. Only authenticated statutory audits, peer-reviewed baselines, and gazette records are cited as Documented; unmeasured parameters are explicitly isolated as evidence gaps.',
      ],
      quantitativeCallouts: params.callouts,
    },
    {
      sectionNumber: '02',
      key: 'investigation-background',
      title: 'Investigation Background',
      applicable: true,
      leadSummary: params.background,
      bodyParagraphs: [
        'Evaluates measurable ecological outcomes against public expenditure, institutional mandates, and statutory compliance rather than relying on administrative completion claims.',
      ],
    },
    {
      sectionNumber: '03',
      key: 'geographic-context',
      title: 'Geographic Context',
      applicable: true,
      leadSummary: params.geography,
      bodyParagraphs: [
        'Spatial boundaries, watershed connectivity, and receptor polygons are cross-linked with the KEW Spatial Investigation Atlas and domain observatories.',
      ],
    },
    {
      sectionNumber: '04',
      key: 'historical-chronology',
      title: 'Historical Chronology',
      applicable: true,
      leadSummary: 'Distinguishes dated historical baselines and audit periods from contemporary (2026) conditions.',
      bodyParagraphs: [
        'Historical audit and research records are preserved as temporal benchmarks to test whether subsequent interventions achieved measurable improvement.',
      ],
    },
    {
      sectionNumber: '05',
      key: 'environmental-baseline',
      title: 'Environmental Baseline',
      applicable: true,
      leadSummary: params.baseline,
      bodyParagraphs: [
        'Baseline ecological, physicochemical, and legal reference states are compiled from peer-reviewed literature, satellite archives, and statutory inventories.',
      ],
    },
    {
      sectionNumber: '06',
      key: 'project-intervention-inventory',
      title: 'Project & Intervention Inventory',
      applicable: true,
      leadSummary: params.interventions,
      bodyParagraphs: [
        'Tracks capital outlay, O&M expenditure, seasonal timing, engineering design specifications, and documented ecological monitoring.',
      ],
    },
    {
      sectionNumber: '07',
      key: 'scientific-disciplines',
      title: 'Scientific Disciplines & Governing Models',
      applicable: true,
      leadSummary: params.methodology,
      bodyParagraphs: [
        'Applies explicit governing equations, uncertainty bounds, and falsifiable hypotheses across physical, biological, chemical, spatial, and legal sciences.',
      ],
    },
    {
      sectionNumber: '09',
      key: 'satellite-gis-evidence',
      title: 'Satellite & GIS Evidence',
      applicable: true,
      leadSummary: 'Multi-temporal Corona, Landsat, Sentinel-1/2, and cadastral GIS change-detection protocol.',
      bodyParagraphs: [
        'Remote-sensing observations are paired with ground-truth requirements to prevent over-interpretation of coarse-pixel proxies.',
      ],
    },
    {
      sectionNumber: '10',
      key: 'hydrological-analysis',
      title: 'Hydrological Analysis',
      applicable: params.hydrologyApplicable,
      nonApplicableReason: params.hydrologyApplicable
        ? undefined
        : 'Secondary to terrestrial/legal scope; see Ecological & Spatial Analysis.',
      leadSummary: params.hydrologyNote,
      bodyParagraphs: params.hydrologyApplicable
        ? ['Evaluates residence times, catchment fluxes, aquifer connectivity, and seasonal hydrographs.']
        : [],
    },
    {
      sectionNumber: '16',
      key: 'institutional-accountability',
      title: 'Institutional Accountability',
      applicable: true,
      leadSummary: params.accountabilityLead,
      bodyParagraphs: [
        'Maps statutory mandates, executing agencies, monitoring duties, and official right-of-reply invitations without inferring wrongdoing from missing public records.',
      ],
    },
    {
      sectionNumber: '17',
      key: 'regulatory-analysis',
      title: 'Regulatory Analysis',
      applicable: true,
      leadSummary: params.regulatoryLead,
      bodyParagraphs: [
        'Distinguishes enforceable Indian statutory standards and gazette notifications from international scientific benchmarks.',
      ],
    },
    {
      sectionNumber: '18',
      key: 'scientific-evidence-matrix',
      title: 'Scientific Evidence Matrix',
      applicable: true,
      leadSummary: 'Claim-by-claim epistemic grading separating Documented facts from Unverified hypotheses.',
      bodyParagraphs: ['Inspect the Evidence Verification Matrix below for source provenance and required verification protocols.'],
    },
    {
      sectionNumber: '19',
      key: 'unanswered-questions',
      title: 'Unanswered Questions & Evidence Gaps',
      applicable: true,
      leadSummary: 'Explicitly enumerates institutional records, laboratory assays, and archival instruments required prior to publication.',
      bodyParagraphs: ['Authenticated datasets and official responses may be deposited via /environmental-investigations/submit.'],
    },
    {
      sectionNumber: '20',
      key: 'alternative-solutions',
      title: 'Alternative Solutions & Restoration Pathways',
      applicable: true,
      leadSummary: params.alternativesLead,
      bodyParagraphs: ['Compares symptom-focused engineering against root-cause ecological and source-control strategies.'],
    },
    {
      sectionNumber: '21',
      key: 'recommendations',
      title: 'Phased Recommendations',
      applicable: true,
      leadSummary: 'Immediate, medium-term, and long-term corrective actions paired with measurable verification indicators.',
      bodyParagraphs: ['Tracked in the KEW-EIAI Recommendations Tracker.'],
    },
    {
      sectionNumber: '23',
      key: 'references-datasets',
      title: 'References & Primary Data Repositories',
      applicable: true,
      leadSummary: 'Traceable statutory audits, peer-reviewed studies, gazette registries, and telemetry portals.',
      bodyParagraphs: ['All Documented assertions map 1:1 to verified reference identifiers below.'],
    },
  ];
}

interface CompactSpec {
  code: string;
  slug: string;
  title: string;
  subtitle: string;
  shortTitle: string;
  seriesId: InvestigationSeriesId;
  seriesTitle: string;
  priority: InvestigationPriority;
  recommendedPublicationSequence?: number;
  status: InvestigationStatus;
  statusLabel: string;
  temporalScope: string;
  heroImage: string;
  heroImageCaption: string;
  subregion: InvestigationRecord['subregion'];
  districts: string[];
  watershedOrBasin: string;
  elevationRangeM: string;
  coordinates: [number, number];
  spatialEnvelopeKm2: number;
  connectedEcosystems: string[];
  primaryDomainId: InvestigationDomainId;
  secondaryDomainIds: InvestigationDomainId[];
  disciplineIds: string[];
  linkedKewModules: InvestigationRecord['linkedKewModules'];
  relatedInvestigationCodes: string[];
  relatedSectoralCodes: string[];
  scopeDifferentiation: string;
  centralQuestion: string;
  scopingQuestions: string[];
  executiveKeyFindings: string[];
  callouts?: Array<{ label: string; value: string; unit?: string; sourceTag: string }>;
  chronology: InvestigationRecord['chronology'];
  interventions: InvestigationRecord['interventionInventory'];
  disciplineFindings: DisciplineFinding[];
  assertions: Array<{
    suffix: string;
    assertion: string;
    sourceCategory: InvestigationRecord['evidenceMatrix'][number]['sourceCategory'];
    classification: EvidenceVerificationClass;
    basis: string;
    citationIds: string[];
    methodReq?: string;
  }>;
  accountability: Array<{
    suffix: string;
    institution: string;
    acronym: string;
    mandate: string;
    ownership: string;
    scientificResp: string;
    documentedFindings: string;
    response: string;
    questions: string[];
    corrective: string;
  }>;
  unansweredQuestions: string[];
  alternatives: InvestigationRecord['alternativeSolutions'];
  recommendations: Array<{
    suffix: string;
    horizon: InvestigationRecord['recommendations'][number]['horizon'];
    title: string;
    spec: string;
    target: string;
    justification: string;
    indicator: string;
  }>;
  references: CitationReference[];
  dataGaps: string[];
  hydrologyApplicable?: boolean;
  hydrologyNote?: string;
  regulatoryLead: string;
}

function makeCharterRecord(s: CompactSpec): InvestigationRecord {
  const hydrologyApplicable = s.hydrologyApplicable ?? true;
  return {
    code: s.code,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle,
    shortTitle: s.shortTitle,
    seriesId: s.seriesId,
    seriesTitle: s.seriesTitle,
    priority: s.priority,
    recommendedPublicationSequence: s.recommendedPublicationSequence,
    centralScientificQuestion: s.centralQuestion,
    duplicationAudit: {
      status:
        s.relatedSectoralCodes.length > 0
          ? 'Cleared — Cross-Module Accountability Complement'
          : 'Cleared — Distinct Investigative Question',
      relatedSectoralCodes: s.relatedSectoralCodes,
      relatedInvestigationCodes: s.relatedInvestigationCodes,
      scopeDifferentiation: s.scopeDifferentiation,
    },
    status: s.status,
    statusLabel: s.statusLabel,
    temporalScope: s.temporalScope,
    initiatedDate: '2026-11-25',
    lastUpdated: '2026-11-25',
    version: s.status === 'scoping_review' ? 'v0.4 (Priority Scoping & Evidence Acquisition)' : 'v0.2 (Proposed Investigation Charter)',
    featured: false,
    heroImage: s.heroImage,
    heroImageCaption: s.heroImageCaption,
    subregion: s.subregion,
    districts: s.districts,
    watershedOrBasin: s.watershedOrBasin,
    elevationRangeM: s.elevationRangeM,
    coordinates: s.coordinates,
    spatialEnvelopeKm2: s.spatialEnvelopeKm2,
    connectedEcosystems: s.connectedEcosystems,
    primaryDomainId: s.primaryDomainId,
    secondaryDomainIds: s.secondaryDomainIds,
    disciplineIds: s.disciplineIds,
    linkedKewModules: s.linkedKewModules,
    relatedInvestigationCodes: s.relatedInvestigationCodes,
    scopingQuestions: s.scopingQuestions,
    executiveKeyFindings: s.executiveKeyFindings,
    chronology: s.chronology,
    interventionInventory: s.interventions,
    disciplineFindings: s.disciplineFindings,
    evidenceMatrix: s.assertions.map((a) => ({
      id: `EVID-${s.code.slice(-4)}-${a.suffix}`,
      investigationCode: s.code,
      investigationSlug: s.slug,
      investigationTitle: s.title,
      assertion: a.assertion,
      sourceCategory: a.sourceCategory,
      classification: a.classification,
      evidenceBasisSummary: a.basis,
      citationIds: a.citationIds,
      methodologicalRequirement: a.methodReq,
      lastVerifiedDate: '2026-11-25',
    })),
    accountabilityMatrix: s.accountability.map((acc) => ({
      id: `ACC-${s.code.slice(-4)}-${acc.suffix}`,
      investigationCode: s.code,
      investigationSlug: s.slug,
      investigationTitle: s.title,
      responsibleInstitution: acc.institution,
      institutionAcronym: acc.acronym,
      statutoryMandate: acc.mandate,
      projectOwnership: acc.ownership,
      scientificResponsibility: acc.scientificResp,
      financialResponsibility: 'Audited public capital & O&M expenditure allocations',
      environmentalAuthorisation: s.regulatoryLead,
      monitoringObligations: 'Statutory baseline, operational performance, and ecological outcome reporting',
      documentedFindings: acc.documentedFindings,
      institutionalResponse: acc.response,
      outstandingQuestions: acc.questions,
      correctiveAction: acc.corrective,
      followUpStatus: 'Clarification Invited',
    })),
    unansweredQuestions: s.unansweredQuestions,
    alternativeSolutions: s.alternatives,
    recommendations: s.recommendations.map((r) => ({
      id: `REC-${s.code.slice(-4)}-${r.suffix}`,
      investigationCode: s.code,
      investigationSlug: s.slug,
      investigationTitle: s.title,
      horizon: r.horizon,
      title: r.title,
      actionSpecification: r.spec,
      targetInstitution: r.target,
      scientificJustification: r.justification,
      verificationIndicator: r.indicator,
      status: 'Proposed',
    })),
    references: s.references,
    updatesLog: [
      {
        date: '2026-11-25',
        version: s.status === 'scoping_review' ? 'v0.4' : 'v0.2',
        entryType: 'Initial Publication',
        summary: `Registered under ${s.seriesTitle} following cross-portfolio duplication audit against 101 sectoral dossiers and KEW-EIAI registry.`,
        verifiedBy: 'KEW-EIAI Scientific Scoping Council',
      },
    ],
    dataGaps: s.dataGaps,
    sections: buildStructuredCharterSections({
      leadExec: s.subtitle,
      centralQuestion: s.centralQuestion,
      background: s.scopeDifferentiation,
      geography: `${s.watershedOrBasin} (${s.districts.join(', ')}; ${s.elevationRangeM}).`,
      baseline: s.executiveKeyFindings[0] || s.subtitle,
      interventions: s.interventions[0]?.name || 'Statutory conservation, engineering, and public-infrastructure operations under audit.',
      methodology: `Integrates ${s.disciplineIds.join(', ')} with explicit uncertainty bounds and control-vs-impact evaluation.`,
      hydrologyApplicable,
      hydrologyNote: s.hydrologyNote || 'Evaluates watershed inflows, residence times, and hydrochemical transport.',
      accountabilityLead: s.accountability.map((a) => `${a.institution} (${a.acronym})`).join('; '),
      regulatoryLead: s.regulatoryLead,
      alternativesLead: s.alternatives[0]?.title || 'Source-control and ecologically compatible alternatives.',
      callouts: s.callouts,
    }),
  };
}

export const SERIES_16_INVESTIGATION_DOSSIERS: InvestigationRecord[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SERIES 1: DAL LAKE ECOLOGICAL INTERVENTIONS (3 REPORTS: KEW-INV-0010..0012)
  // ═══════════════════════════════════════════════════════════════════════════
  makeCharterRecord({
    code: 'KEW-INV-0010',
    slug: 'dal-lake-mechanized-manual-deweeding-effectiveness',
    title: 'Three Decades of Aquatic Vegetation Management in Dal Lake: Ecological Effectiveness, Sediment Disturbance and Limnological Consequences',
    subtitle: 'Evaluating mechanized harvester cutting, manual skimming, ₹28.01 Cr audited expenditure (2016–2022), benthic biodiversity impacts, and macrophyte nutrient-sink dynamics',
    shortTitle: 'Dal Lake: Mechanized & Manual De-weeding',
    seriesId: 'dal-lake-interventions',
    seriesTitle: 'Dal Lake Ecological Interventions',
    priority: 'Critical',
    recommendedPublicationSequence: 1,
    status: 'scoping_review',
    statusLabel: 'Priority #1 Scoping · Audit & Limnological Review',
    temporalScope: '1990–2027',
    heroImage: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    heroImageCaption: 'Dal Lake macrophyte zones — evaluating three decades of mechanized and manual harvesting against underlying nutrient inputs.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar'],
    watershedOrBasin: 'Dal–Nigeen Lacustrine System (Hazratbal, Bod Dal, Gagribal, Nigeen)',
    elevationRangeM: '1,583 m ASL',
    coordinates: [34.112, 74.868],
    spatialEnvelopeKm2: 24,
    connectedEcosystems: ['Submerged Charophyte/Ceratophyllum Beds', 'Floating Gardens (Radh)', 'Fish Spawning Shallows', 'Shoreside Spoil Disposal Sites'],
    primaryDomainId: '01-lakes-limnology',
    secondaryDomainIds: ['15-solid-waste-sewage', '18-environmental-governance'],
    disciplineIds: ['limnology', 'aquatic-ecology', 'environmental-chemistry', 'sedimentology', 'fisheries-science', 'ornithology', 'ecological-economics', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Dal Lake Profile', route: '/water-systems/lakes/dal-lake', contributionNote: 'Basin morphometry, Carlson TSI, and macrophyte zonation.' },
      { moduleName: 'Water Systems · Water Quality & Limnology', route: '/water-systems/water-quality', contributionNote: 'Nutrient uptake vs dissolved orthophosphate profiles.' },
      { moduleName: 'Dal Mechanical Dredging Investigation (KEW-INV-0001)', route: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences', contributionNote: 'Companion sediment-excavation accountability dossier.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0003', 'KEW-INV-0009', 'KEW-INV-0011', 'KEW-INV-0012'],
    relatedSectoralCodes: ['KEW-SR-2026-01'],
    scopeDifferentiation: 'Distinct from KEW-INV-0001 (bed sediment dredging) and KEW-SR-2026-01 (tourism wastewater load): specifically audits 35+ years of mechanized weed harvesters and manual skimming, seasonal timing compliance, benthic fauna impacts, and harvested biomass nutrient export.',
    centralQuestion: 'If aquatic vegetation has been removed repeatedly for decades, why does excessive vegetation growth continue, and has the intervention addressed its underlying nutrient sources?',
    scopingQuestions: [
      'Why was ₹16.18 crore (57.8% of ₹28.01 crore audited de-weeding expenditure during 2016–2022) incurred outside prescribed harvesting months, and how did off-season cutting affect regrowth and fish spawning?',
      'Does indiscriminate mechanical cutting shift Dal Lake basins from clear-water submerged macrophyte states toward turbid phytoplankton/Azolla dominance while depleting benthic macroinvertebrates?',
      'What mass of nitrogen and phosphorus (tonnes/yr) is permanently exported from the Dal watershed in harvested biomass versus leached back from shoreline dumping?',
    ],
    executiveKeyFindings: [
      'CAG lake conservation audit records document ₹28.01 crore in de-weeding expenditure between 2016 and 2022, of which ₹16.18 crore (57.8%) occurred outside prescribed seasonal windows, alongside undocumented retention of undisturbed fish-spawning and waterfowl-feeding zones.',
      'Peer-reviewed University of Kashmir research (2014) documented significantly lower benthic macroinvertebrate densities in mechanically de-weeded Dal Lake sectors compared with undisturbed reference sites, extending foundational harvester impact studies by Zutshi & Ticku (1990, 1991, 1993).',
    ],
    callouts: [
      { label: 'Audited De-weeding Outlay', value: '₹28.01 Cr', unit: '2016–2022', sourceTag: 'CAG Lake Conservation Audit' },
      { label: 'Outside Prescribed Months', value: '₹16.18 Cr', unit: '57.8% of Outlay', sourceTag: 'CAG Audit Finding' },
      { label: 'Within Prescribed Window', value: '₹11.83 Cr', unit: '42.2% of Outlay', sourceTag: 'CAG Audit Finding' },
      { label: 'Active Tender Horizon', value: '2026–2027', unit: 'Manual & Skimming', sourceTag: 'J&K Procurement Records' },
    ],
    chronology: [
      { period: '1990–1993', eventTitle: 'Early Mechanical Harvester Impact Studies', documentedRecord: 'Zutshi & Ticku evaluated ecological effects of mechanical de-weeding on Dal Lake macrophyte guilds and water chemistry.', sourceRef: 'REF-DW-03', significance: 'Baseline' },
      { period: '2014', eventTitle: 'University of Kashmir Benthic Biodiversity Study', documentedRecord: 'Published comparative field study found lower macroinvertebrate densities in mechanically de-weeded areas vs reference zones.', sourceRef: 'REF-DW-02', significance: 'Ecological Shift' },
      { period: '2016–2022', eventTitle: 'CAG Performance Audit of De-weeding Expenditure', documentedRecord: 'Audited ₹28.01 Cr expenditure; flagged ₹16.18 Cr (57.8%) spent outside prescribed months and missing documentation on selective spawning-refuge retention.', sourceRef: 'REF-DW-01', significance: 'Audit / Judicial' },
      { period: '2026–2027', eventTitle: 'Continuing Manual De-weeding & Skimming Contracts', documentedRecord: 'Government procurement tenders confirm ongoing manual de-weeding and floating-waste skimming operations.', sourceRef: 'REF-DW-04', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-DW-01', name: 'LCMA Mechanized Weed Harvesters, Lily Cutters & Manual Skimming Contracts', period: '1990–2027', executingAgency: 'LCMA (formerly LAWDA)', interventionType: 'Mechanical & Manual Macrophyte Removal', reportedScaleOrOutlay: '₹28.01 Cr audited (2016–2022); ongoing 2026–27 tenders', status: 'Ongoing', documentedOutcome: 'Temporary visual clearance followed by rapid seasonal regrowth under continuing external sewage/phosphorus loading.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'aquatic-ecology',
        disciplineName: 'Aquatic Ecology & Benthic Biology',
        clusterName: 'Water & Aquatic Sciences',
        methodologyApplied: 'Before-After-Control-Impact (BACI) comparison of macrophyte guild structure and benthic macroinvertebrate density.',
        equationOrMetricUsed: 'Beer–Lambert Photic Depth I(z) = I_0 e^(-K_d z) & Shannon Diversity H′',
        empiricalFinding: 'Mechanical cutter blades disturb soft surficial silt, stripping epiphytic/benthic invertebrates and releasing porewater orthophosphate.',
        uncertaintyAndLimitations: 'Basin-wide GPS harvester track logs and wet-to-dry biomass elemental N/P assays are required from LCMA.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Between 2016 and 2022, ₹16.18 crore (57.8%) of ₹28.01 crore audited Dal Lake de-weeding expenditure was incurred outside prescribed seasonal harvesting windows, with inadequate documentation of undisturbed spawning/feeding refuges.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Established in CAG Performance Audit on Conservation and Management of Lakes in J&K.', citationIds: ['REF-DW-01'] },
      { suffix: '02', assertion: 'Mechanically de-weeded plots in Dal Lake exhibited lower benthic macroinvertebrate densities than non-de-weeded reference plots in published empirical sampling.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Documented in peer-reviewed University of Kashmir aquatic ecology study (2014) indexed in PubMed.', citationIds: ['REF-DW-02'] },
      { suffix: '03', assertion: 'Shoreline stacking and unlined disposal of harvested Dal macrophyte biomass leaches a significant fraction of sequestered phosphorus back into shallow littoral channels during rainfall.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Biogeochemically plausible leachability pathway requiring weighed truckload logs and disposal-site leachate P assays.', citationIds: ['REF-DW-01'], methodReq: 'Quantify dry-matter N/P content of harvested biomass and monitor leachate runoff at designated LCMA disposal sites.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Lake Conservation and Management Authority', acronym: 'LCMA', mandate: 'Scientific aquatic vegetation management, harvester operation, biomass disposal, and spawning-habitat protection in Dal–Nigeen.', ownership: 'Weed harvesters, skimmers, de-weeding tenders, and biomass transport fleet', scientificResp: 'Species-selective harvesting calendars, pre/post DO/turbidity/Chl-a logging, and fish-spawning exclusion mapping.', documentedFindings: 'CAG audit flagged 57.8% off-season expenditure (2016–2022) and unverified adherence to selective harvesting norms.', response: 'Annual manual/mechanical de-weeding tenders issued for 2026–2027 navigational and aesthetic maintenance; formal scientific protocols invited.', questions: ['What GPS polygon maps delineate protected fish-spawning and waterfowl-foraging zones excluded from 2026–2027 de-weeding?', 'What is the verified dry-weight tonnage and final composting/disposal fate of harvested biomass?'], corrective: 'Enforce phenology-aligned autumn selective harvesting, GPS exclusion zones, and closed-loop off-basin composting.' },
    ],
    unansweredQuestions: [
      'What proportion of removed Dal biomass consists of invasive Azolla/Salvinia/nuisance Ceratophyllum versus beneficial native Charophytes and Potamogeton?',
      'What is the net cost per kilogram of phosphorus permanently removed via harvesting compared with tertiary STP phosphorus stripping?',
    ],
    alternatives: [
      { title: 'Selective Late-Summer Harvesting + External Orthophosphate Cutoff', mechanism: 'Retains submerged native macrophyte nutrient sinks during spring fish spawning while harvesting senescent late-summer biomass for off-watershed composting alongside STP P-stripping.', evidencePrecedent: 'Lake Biwa (Japan) & European shallow-lake selective management protocols.', feasibilityNote: 'Prevents phytoplankton blooms while permanently exporting plant-bound nutrients prior to winter senescence.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Seasonal De-weeding Calendar, GPS Trackers & Spawning Refuge Maps', spec: 'Mandate GPS telemetry on all mechanical harvesters and publish seasonal exclusion polygons for Schizothorax/carp spawning and winter waterfowl.', target: 'LCMA & Fisheries Department', justification: 'Addresses CAG audit findings on off-season expenditure and habitat disturbance.', indicator: '0% non-emergency harvester expenditure outside notified phenological windows.' },
    ],
    references: [
      { id: 'REF-DW-01', authorsOrBody: 'Comptroller and Auditor General of India (CAG)', year: 2024, title: 'Performance Audit on Conservation and Management of Lakes in Jammu & Kashmir (Audit Report Details 125068)', publicationOrSeries: 'SAI India / Government of India', referenceType: 'Statutory Audit (CAG)', externalUrl: 'https://www.cag.gov.in/en/audit-report/details/125068', provenanceNote: 'Establishes ₹28.01 Cr de-weeding outlay (2016–2022) and ₹16.18 Cr (57.8%) off-season expenditure.' },
      { id: 'REF-DW-02', authorsOrBody: 'Mir, Z. A., Bakhtiyar, Y., & Arafat, M. Y. / University of Kashmir', year: 2014, title: 'Impact of mechanical deweeding on macroinvertebrate community structure in Dal Lake, Kashmir', publicationOrSeries: 'PubMed Indexed Aquatic Ecology Study', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Documents lower benthic macroinvertebrate densities in mechanically de-weeded zones.' },
      { id: 'REF-DW-03', authorsOrBody: 'Zutshi, D. P., & Ticku, A.', year: 1991, title: 'Impact of mechanical deweeding on Dal Lake ecosystem (1990–1993 series)', publicationOrSeries: 'Hydrobiologia / Centre of Research for Development', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Foundational empirical evaluation of mechanical weed harvesting in Dal Lake.' },
      { id: 'REF-DW-04', authorsOrBody: 'Government of Jammu & Kashmir e-Procurement Portal (JKTenders)', year: 2026, title: 'LCMA Manual De-weeding, Lily Cutting and Floating Waste Skimming Tender Records (2026–2027)', publicationOrSeries: 'jktenders.gov.in Official Procurement Archive', referenceType: 'Technical Institute Report', externalUrl: 'https://jktenders.gov.in/', provenanceNote: 'Confirms continuation of manual de-weeding and skimming in 2026–2027 management cycle.' },
    ],
    dataGaps: ['Machine-wise hourly operation logs, GPS tracks, and elemental N/P assays of harvested macrophyte loads (2016–2026).'],
    regulatoryLead: 'Water (Prevention and Control of Pollution) Act 1974, Wetlands Rules 2017 & J&K High Court PIL 159/2002 monitoring directives.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0011',
    slug: 'dal-lake-mechanical-aeration-jet-fountains-audit',
    title: 'Artificial Aeration, Jet Fountains and Oxygen Management in Dal Lake: Engineering Performance versus Ecological Restoration',
    subtitle: 'Evaluating standard aeration efficiency (kg O₂/kWh), radial DO influence, benthic sediment resuspension, cyanobacterial mixing, and electricity expenditure across Dal–Nigeen fountains and aerators',
    shortTitle: 'Dal Lake: Aeration & Jet Fountains',
    seriesId: 'dal-lake-interventions',
    seriesTitle: 'Dal Lake Ecological Interventions',
    priority: 'Critical',
    recommendedPublicationSequence: 2,
    status: 'scoping_review',
    statusLabel: 'Priority #2 Scoping · Engineering & Limnology Audit',
    temporalScope: '2005–2026',
    heroImage: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    heroImageCaption: 'Evaluating decorative high-head jet fountains versus engineered oxygenation across Dal Lake’s Boulevard and stagnant houseboat channels.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar'],
    watershedOrBasin: 'Gagribal, Boulevard, Lokut Dal, Brari Nambal & Nigeen Stagnant Pockets',
    elevationRangeM: '1,583 m ASL',
    coordinates: [34.088, 74.848],
    spatialEnvelopeKm2: 18,
    connectedEcosystems: ['Gagribal Boulevard Front', 'Brari Nambal Lagoon', 'Houseboat Mooring Channels'],
    primaryDomainId: '01-lakes-limnology',
    secondaryDomainIds: ['15-solid-waste-sewage', '18-environmental-governance'],
    disciplineIds: ['environmental-engineering', 'limnology', 'hydrodynamics', 'environmental-chemistry', 'environmental-microbiology', 'ecological-economics'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Dal Lake Profile', route: '/water-systems/lakes/dal-lake', contributionNote: 'Basin dissolved oxygen and bathymetric depth constraints.' },
      { moduleName: 'Hazard Intelligence · Algal Bloom Sentinel', route: '/hazard-intelligence/algal-bloom-intelligence', contributionNote: 'Chlorophyll-a and cyanobacterial bloom response tracking.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0009', 'KEW-INV-0010', 'KEW-INV-0012'],
    relatedSectoralCodes: ['KEW-SR-2026-01', 'KEW-SR-2026-50'],
    scopeDifferentiation: 'Zero overlap in existing portfolio: isolates artificial aeration units and ornamental jet fountains across 11 engineering and limnological performance indicators.',
    centralQuestion: 'Are aerators and fountains producing measurable ecological improvements, or are their effects localized, temporary and insufficient against continuing nutrient and wastewater inputs?',
    scopingQuestions: [
      'What is the measured radial dissolved-oxygen (DO) decay curve (at 5 m, 25 m, 50 m, 100 m) and Standard Aeration Efficiency (kg O₂/kWh) of Dal Lake jet fountains versus diffused/surface aerators?',
      'In shallow (<1.5–2.5 m) silt-laden pockets like Brari Nambal and Boulevard margins, do vertical pump intakes resuspend anoxic nutrient-rich sediment and elevate orthophosphate/turbidity?',
      'Does continuous raw-sewage BOD₅ oxygen demand overwhelm mechanical oxygen transfer capacity within metres of each unit?',
    ],
    executiveKeyFindings: [
      'International limnological synthesis (Gächter & Wehrli, 1998) establishes that ornamental vertical jet fountains have low oxygen-transfer efficiency per kWh compared with fine-bubble/hypolimnetic systems and cannot lower internal phosphorus loading while external sewage continues.',
      'Scoping framework establishes an 11-parameter radial field verification matrix separating aesthetic tourism fountains from genuine dissolved-oxygen remediation.',
    ],
    chronology: [
      { period: '2008–2024', eventTitle: 'Installation of Jet Fountains & Surface Aerators in Dal & Brari Nambal', documentedRecord: 'Multiple high-head decorative fountains and floating aerators commissioned along Boulevard/Gagribal and Brari Nambal.', sourceRef: 'REF-AER-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-AER-01', name: 'Dal Boulevard, Gagribal & Brari Nambal Jet Fountains and Floating Aerators', period: '2008–Present', executingAgency: 'LCMA / Smart City / Tourism Dept.', interventionType: 'Mechanical Aeration & Ornamental Fountains', reportedScaleOrOutlay: 'Capital installation + KPDCL electricity O&M', status: 'Ongoing', documentedOutcome: 'No peer-reviewed radial DO transfer or benthic resuspension audit publicly disclosed.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-engineering',
        disciplineName: 'Environmental Engineering',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'ASCE Standard Oxygen Transfer Rate (SOTR) & Standard Aeration Efficiency (SAE = SOTR / Power) vs local BOD₅ mass demand.',
        equationOrMetricUsed: 'dC/dt = K_L a (C_sat - C) - R_BOD - J_SOD / h',
        empiricalFinding: 'Where sediment oxygen demand (J_SOD) and sewage BOD₅ are high, DO gains collapse rapidly beyond the immediate splash zone.',
        uncertaintyAndLimitations: 'Requires pump nameplate kW, operating hours, and concentric sonde DO/NTU transects.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Decadal lake-restoration evidence demonstrates that artificial mixing/aeration alone does not reduce trophic state or internal phosphorus release when external P loading remains elevated.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established by Gächter & Wehrli (1998, Environmental Science & Technology) 10-year lake oxygenation evaluation.', citationIds: ['REF-AER-02'] },
      { suffix: '02', assertion: 'Submerged pump intakes of high-jet fountains in shallow (<2 m) Dal/Brari Nambal zones entrain surficial sediment, elevating localized turbidity and dissolved orthophosphate.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Hydraulically plausible bed-shear mechanism requiring paired pump-on vs pump-off concentric NTU/PO₄³⁻ sonde profiles.', citationIds: ['REF-AER-01'], methodReq: 'Conduct concentric (5 m, 15 m, 30 m, 75 m, 150 m) pump-on/pump-off DO, turbidity, Chl-a, and PO₄³⁻ profiling.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Lake Conservation and Management Authority', acronym: 'LCMA', mandate: 'Operation and ecological performance monitoring of lake aeration and circulation infrastructure.', ownership: 'Gagribal, Lokut Dal & Brari Nambal aerators and jet fountains', scientificResp: 'Demonstrating net DO gain, energy efficiency (kg O₂/kWh), and zero adverse sediment resuspension.', documentedFindings: 'CAG conservation audit noted infrastructure expenditure without commensurate basin-wide water-quality recovery.', response: 'Fountains and aerators operated seasonally for circulation and waterfront aesthetics; technical performance logs invited.', questions: ['What is the annual kWh electricity consumption, uptime %, and measured DO treatment radius of each installed fountain/aerator?'], corrective: 'Reclassify decorative fountains under tourism amenities rather than conservation outlay; redirect conservation funds to sewage/P interception.' },
    ],
    unansweredQuestions: [
      'How many installed aerators/fountains in Dal and Brari Nambal are currently operational, and what is their measured oxygen transfer per kWh?',
    ],
    alternatives: [
      { title: 'Gravity Culvert Flushing + Complete Outfall Sewage Interception', mechanism: 'Eliminates carbonaceous/nitrogenous oxygen demand at source rather than attempting to re-oxygenate raw wastewater plumes in-lake.', evidencePrecedent: 'Urban lagoon restoration benchmarks.', feasibilityNote: 'Delivers permanent basin-wide DO recovery without perpetual electricity expenditure.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Execute Radial Sonde Audit (DO, NTU, TP, Chl-a) & Energy Metering Across All Units', spec: 'Publish pump-on/pump-off radial water-quality transects and kWh electricity logs for every Dal and Brari Nambal fountain/aerator.', target: 'LCMA & NIT Srinagar / KU Limnology', justification: 'Separates ornamental water features from scientifically effective oxygenation.', indicator: '100% of active units audited across all 11 limnological & engineering parameters.' },
    ],
    references: [
      { id: 'REF-AER-01', authorsOrBody: 'Comptroller and Auditor General of India (CAG)', year: 2024, title: 'Audit Report on Conservation and Management of Lakes in Jammu & Kashmir', publicationOrSeries: 'SAI India Report 125068', referenceType: 'Statutory Audit (CAG)', externalUrl: 'https://www.cag.gov.in/en/audit-report/details/125068', provenanceNote: 'Audits Dal–Nigeen and Brari Nambal conservation components and water-quality outcomes.' },
      { id: 'REF-AER-02', authorsOrBody: 'Gächter, R., & Wehrli, B.', year: 1998, title: 'Ten years of artificial mixing and oxygenation: No effect on the internal phosphorus loading of two eutrophic lakes', publicationOrSeries: 'Environmental Science & Technology, 32(23), 3659–3665', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1021/es980418l', externalUrl: 'https://doi.org/10.1021/es980418l', provenanceNote: 'Benchmark empirical test of artificial lake oxygenation vs external P control.' },
    ],
    dataGaps: ['Unit-by-unit motor rating (kW), submergence depth, electricity bills, and concentric DO/resuspension measurements.'],
    regulatoryLead: 'Water Act 1974, NGT OA monitoring orders & public conservation expenditure accountability rules.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0012',
    slug: 'dal-lake-integrated-restoration-expenditure-outcomes',
    title: 'Dal Lake Restoration Expenditure and Ecological Outcomes: A Multidecadal Scientific and Institutional Performance Audit',
    subtitle: 'Integrating cumulative public outlays across dredging, de-weeding, aeration, STPs, Telbal settling basin, houseboat sanitation, and resettlement against 1980–2026 trophic trajectories',
    shortTitle: 'Dal Lake: Integrated Restoration Audit',
    seriesId: 'dal-lake-interventions',
    seriesTitle: 'Dal Lake Ecological Interventions',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Synthesis Audit (Stage 01)',
    temporalScope: '1978–2026',
    heroImage: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    heroImageCaption: 'Integrated multi-intervention synthesis testing cumulative restoration expenditure against open-water area and Carlson TSI trajectories.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Ganderbal'],
    watershedOrBasin: 'Complete 316 km² Dal–Nigeen Catchment & Lacustrine System',
    elevationRangeM: '1,583–4,267 m ASL',
    coordinates: [34.115, 74.872],
    spatialEnvelopeKm2: 316,
    connectedEcosystems: ['Dal Four Basins', 'Nigeen Lake', 'Brari Nambal', 'Telbal–Dachigam Headwaters'],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['01-lakes-limnology', '15-solid-waste-sewage', '11-urbanisation-land-use'],
    disciplineIds: ['ecological-economics', 'limnology', 'environmental-engineering', 'remote-sensing', 'gis', 'environmental-data-science', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Dal Mechanical Dredging (KEW-INV-0001)', route: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences', contributionNote: 'Dredging component baseline.' },
      { moduleName: 'Telbal Settling Basin (KEW-INV-0003)', route: '/environmental-investigations/reports/telbal-settling-basin-sediment-management', contributionNote: 'Upstream sediment trap audit.' },
      { moduleName: 'Water Systems · Dal Lake', route: '/water-systems/lakes/dal-lake', contributionNote: 'Master Lake Registry trophic & area record.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0003', 'KEW-INV-0009', 'KEW-INV-0010', 'KEW-INV-0011'],
    relatedSectoralCodes: ['KEW-SR-2026-01', 'KEW-SR-2026-21'],
    scopeDifferentiation: 'Capstone institutional cost-effectiveness synthesis uniting all individual Dal Lake engineering interventions (dredging, de-weeding, aerators, FAB STPs, Telbal, houseboats, shoreline encroachment) into a single expenditure-vs-ecological-outcome ledger.',
    centralQuestion: 'Has cumulative multidecadal public expenditure under NLCP, AMRUT, PMDP, and UT budgets produced statistically verifiable improvements in Dal Lake’s open-water area, nutrient balance, and ecological integrity?',
    scopingQuestions: [
      'What is the inflation-adjusted cumulative public expenditure across each Dal conservation sub-component since 1997, and what measurable ΔTP, ΔChl-a, ΔDO, and ΔOpen-Water resulted per ₹ crore spent?',
      'Why have capital-intensive in-lake symptom interventions repeatedly outpaced upstream catchment sediment control and tertiary phosphorus interception?',
    ],
    executiveKeyFindings: [
      'Successive CAG audits and peer-reviewed remote-sensing time series (Rashid et al., 2017) document persistent nutrient enrichment and open-water contraction despite multi-hundred-crore conservation programmes.',
    ],
    chronology: [
      { period: '1978–2025', eventTitle: 'ENEX Report to NLCP, PMDP & CAG Performance Audits', documentedRecord: 'Four decades of conservation master plans and statutory audits evaluating financial utilisation vs limnological outcomes.', sourceRef: 'REF-INT-01', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-DAL-ALL', name: 'Cumulative Dal–Nigeen Conservation Programmes (NLCP / PMDP / UT Grants)', period: '1997–2026', executingAgency: 'LCMA / UEED / SMC / Forest Dept.', interventionType: 'Multi-Component Lake Restoration', reportedScaleOrOutlay: 'Multi-scheme central & UT allocations under audit reconciliation', status: 'Ongoing', documentedOutcome: 'Fragmented component execution; integrated cost-per-unit-nutrient-abated audit initiated.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'ecological-economics',
        disciplineName: 'Ecological Economics',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'Cost-effectiveness ratio CE = NPV(Expenditure_i) / ΔLoad_abated,i across all 11 intervention classes.',
        equationOrMetricUsed: 'CE_P = ₹ Crore Spent / (kg TP permanently prevented or removed)',
        empiricalFinding: 'Preliminary audit baselines indicate orders-of-magnitude higher nutrient-abatement durability from source interception than recurring mechanical harvesting.',
        uncertaintyAndLimitations: 'Awaiting scheme-wise audited expenditure reconciliation from 1997 to 2026.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Statutory CAG audits have repeatedly documented mismatches between sanctioned Dal conservation expenditure and measurable improvements in lake water quality and areal extent.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Established across CAG J&K Lake Conservation Performance Audits.', citationIds: ['REF-INT-01'] },
      { suffix: '02', assertion: 'Reallocating >60% of recurring mechanical de-weeding/fountain O&M budgets toward tertiary STP phosphorus polishing and Telbal catchment check-dams would achieve Vollenweider recovery within 7 years.', sourceCategory: 'Technical Institute Report', classification: 'Unverified', basis: 'Requires coupled Vollenweider-hydrodynamic mass-balance simulation calibrated to 2024–2026 inflow P loads.', citationIds: ['REF-INT-02'], methodReq: 'Calibrate coupled basin P-budget and expenditure-abatement model across all four Dal basins.' },
    ],
    accountability: [
      { suffix: '01', institution: 'LCMA, Housing & Urban Development Dept. & Committee of Experts', acronym: 'LCMA / HUDD', mandate: 'Integrated execution, financial accountability, and ecological outcome reporting for Dal–Nigeen restoration.', ownership: 'All Dal–Nigeen conservation schemes', scientificResp: 'Publishing unified annual mass-balance and expenditure-to-outcome scorecards.', documentedFindings: 'CAG audits and High Court PIL 159/2002 orders highlighted inter-departmental coordination and STP/catchment gaps.', response: 'Integrated DPRs and High Court compliance status reports filed periodically; consolidated ledger invited.', questions: ['Will HUDD/LCMA publish a single machine-readable ledger linking every conservation contract (1997–2026) to pre/post water-quality metrics?'], corrective: 'Adopt outcome-linked conservation budgeting tied to verified TP, DO, and open-water thresholds.' },
    ],
    unansweredQuestions: ['What is the exact disaggregated expenditure split (%) between sewage interception, resettlement, dredging, de-weeding, aeration, and catchment afforestation from 1997 to 2026?'],
    alternatives: [
      { title: 'Outcome-Based Watershed-First Restoration Charter', mechanism: 'Ties capital releases strictly to verified reductions in external TP/sediment loading at Telbal, Botkol, and perimeter STP outfalls.', evidencePrecedent: 'Chesapeake Bay & Lake Biwa TMDL nutrient-cap accountability.', feasibilityNote: 'Ends fragmented symptom spending.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Establish Public Dal Restoration Financial-to-Ecological Outcome Ledger', spec: 'Reconcile all NLCP, PMDP, AMRUT, and UT outlays against station-wise Carlson TSI trends.', target: 'HUDD, LCMA & Finance Department', justification: 'Distinguishes financial disbursement from ecological restoration.', indicator: 'Annual audited ₹-to-ΔTSI report published openly.' },
    ],
    references: [
      { id: 'REF-INT-01', authorsOrBody: 'Comptroller and Auditor General of India (CAG)', year: 2024, title: 'Performance Audit on Conservation and Management of Lakes in Jammu & Kashmir', publicationOrSeries: 'SAI India Report 125068', referenceType: 'Statutory Audit (CAG)', externalUrl: 'https://www.cag.gov.in/en/audit-report/details/125068', provenanceNote: 'Primary statutory financial and operational audit anchor.' },
      { id: 'REF-INT-02', authorsOrBody: 'Rashid, I., Romshoo, S. A., Amin, M., et al.', year: 2017, title: 'Linking human-biophysical interactions with the trophic status of Dal Lake, Kashmir Himalaya', publicationOrSeries: 'Limnologica, 62, 84–96', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1016/j.limno.2016.11.008', provenanceNote: 'Multi-decadal spatial and limnological outcome trajectory.' },
    ],
    dataGaps: ['Consolidated scheme-wise audited expenditure statements (1997–2026) across LCMA, UEED, and Forest Department.'],
    regulatoryLead: 'Environment Protection Act 1986, Water Act 1974, Wetlands Rules 2017 & J&K High Court PIL 159/2002.',
  }),

  // ═══════════════════════════════════════════════════════════════════════════
  // SERIES 2: DACHIGAM NATIONAL PARK INVESTIGATIONS (5: KEW-INV-0013..0017)
  // ═══════════════════════════════════════════════════════════════════════════
  makeCharterRecord({
    code: 'KEW-INV-0013',
    slug: 'dachigam-hangul-population-dynamics-conservation-effectiveness',
    title: 'The Survival of the Kashmir Stag: A Multidecadal Assessment of Hangul Population Dynamics, Habitat Fragmentation and Conservation Effectiveness',
    subtitle: 'Evaluating census methodologies, skewed male-to-female and fawn-to-hind ratios, genetic bottlenecks, Upper Dachigam migration, and Shikargah conservation-breeding outcomes',
    shortTitle: 'Dachigam: Hangul Population & Conservation',
    seriesId: 'dachigam-national-park',
    seriesTitle: 'Dachigam National Park Investigations',
    priority: 'Critical',
    recommendedPublicationSequence: 5,
    status: 'scoping_review',
    statusLabel: 'Priority #5 Scoping · Wildlife &PVA Audit',
    temporalScope: '1970–2026',
    heroImage: '/images/biodiversity/biodiversity-hangul-stag.jpg',
    heroImageCaption: 'Critically Endangered Kashmir Stag (Cervus hanglu hanglu) in Dachigam National Park — auditing demographic viability and conservation effectiveness.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Ganderbal', 'Pulwama', 'Anantnag'],
    watershedOrBasin: 'Dagwan River Catchment & Zabarwan–Upper Dachigam Massif',
    elevationRangeM: '1,600–4,267 m ASL',
    coordinates: [34.1372, 75.0378],
    spatialEnvelopeKm2: 141,
    connectedEcosystems: ['Lower Dachigam Riverine Oak/Parrotiopsis Forest', 'Upper Dachigam Subalpine/Alpine Pastures', 'Shikargah–Tral Relic Range'],
    primaryDomainId: '09-forests-biodiversity',
    secondaryDomainIds: ['06-alpine-mountain-ecology', '18-environmental-governance'],
    disciplineIds: ['conservation-biology', 'spatial-statistics', 'remote-sensing', 'gis', 'environmental-data-science', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Dachigam National Park', route: '/protected-network/national-parks/dachigam-national-park', contributionNote: 'IUCN Cat II park profile, habitat signals, and threat scores.' },
      { moduleName: 'Biodiversity · Threatened Species', route: '/biodiversity/threatened-species', contributionNote: 'IUCN Critically Endangered Cervus hanglu hanglu dossier.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0014', 'KEW-INV-0015', 'KEW-INV-0016', 'KEW-INV-0017'],
    relatedSectoralCodes: ['KEW-SR-2026-54'],
    scopeDifferentiation: 'Complements biological PVA dossier KEW-SR-2026-54 by auditing census sampling variance, decades of Conservation Breeding Centre expenditure/delays at Shikargah, and institutional implementation of WII/IUCN recovery plans.',
    centralQuestion: 'Why have Hangul fawn-to-female recruitment and range re-colonisation remained critically constrained despite four decades of National Park protection and recovery funding?',
    scopingQuestions: [
      'How much of the reported fluctuation in biennial Hangul counts (~186 to ~289) reflects true demographic growth versus observer effort, block coverage, and sightability bias?',
      'Why has the Shikargah Hangul Conservation Breeding Centre remained unpopulated with founder stock despite infrastructure completion, and what recruitment bottlenecks depress fawn survival?',
    ],
    executiveKeyFindings: [
      'WII and J&K Wildlife Protection censuses document a single viable Hangul sub-population (<300 individuals) confined largely to Lower Dachigam, exhibiting persistently low fawn-to-female and skewed male-to-female ratios.',
      'Archival provenance note: legacy external Dachigam management-plan web links redirect to unrelated domains; KEW-EIAI requires authenticated hardcopy/gazette retrieval from J&K Dept. of Wildlife Protection and WII Dehradun.',
    ],
    chronology: [
      { period: '1981', eventTitle: 'Upgradation of Dachigam Sanctuary to National Park (141 km²)', documentedRecord: 'Notified to safeguard the last viable population of Cervus hanglu hanglu and Srinagar’s Dagwan watershed.', sourceRef: 'REF-DNP-01', significance: 'Baseline' },
      { period: '2009–2023', eventTitle: 'Species Recovery Plan & Biennial Hangul Population Censuses', documentedRecord: 'Counts ranged between ~183 and ~289 individuals with persistently depressed fawn recruitment and truncated summer migration to Upper Dachigam.', sourceRef: 'REF-DNP-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-DNP-01', name: 'MoEFCC/J&K Hangul Species Recovery Programme & Shikargah Breeding Facility', period: '2009–Present', executingAgency: 'Dept. of Wildlife Protection J&K & WII', interventionType: 'In-Situ Protection & Ex-Situ Conservation Breeding', reportedScaleOrOutlay: 'CSS-IDWH Species Recovery grants', status: 'Ongoing', documentedOutcome: 'Core Lower Dachigam protection stabilized adult numbers below 300, but ex-situ founder capture/breeding and Upper Dachigam reclamation remain incomplete.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'conservation-biology',
        disciplineName: 'Conservation Biology & Population Genetics',
        clusterName: 'Biological & Ecological Sciences',
        methodologyApplied: 'Demographic stage-matrix PVA, effective population size (N_e) microsatellite/mtDNA review, and double-observer mark-resight audit.',
        equationOrMetricUsed: 'N_e = (4 N_m N_f) / (N_m + N_f);  λ = N_{t+1} / N_t',
        empiricalFinding: 'Skewed adult sex ratios (~15–26 males per 100 females) and low fawn recruitment severely depress genetically effective population size N_e well below census N.',
        uncertaintyAndLimitations: 'Requires block-wise raw sighting sheets and confidence intervals for all 2004–2025 censuses.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'The global wild population of Kashmir Stag (Cervus hanglu hanglu) is restricted primarily to the Dachigam landscape (<300 individuals) and classified as Critically Endangered on the IUCN Red List.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established by IUCN Red List assessment (Brook et al., 2017) and WII/J&K Wildlife census reports.', citationIds: ['REF-DNP-01', 'REF-DNP-02'] },
      { suffix: '02', assertion: 'Mesopredator/feral-dog predation and summer pasture disturbance jointly account for >60% of neonatal Hangul fawn mortality during May–July.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Leading ecological hypothesis in WII/SKUAST-K studies; requires neonatal telemetry/camera-trap mortality partitioning without invasive capture stress.', citationIds: ['REF-DNP-01'], methodReq: 'Non-invasive faecal hormone/eDNA, camera-trap grid, and predator scat diet partitioning across fawning blocks.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Department of Wildlife Protection, Govt. of J&K', acronym: 'J&K Wildlife Dept.', mandate: 'Statutory protection of Dachigam National Park, Hangul census execution, habitat restoration, and Species Recovery Plan implementation.', ownership: 'Dachigam National Park & Shikargah Conservation Breeding Centre', scientificResp: 'Publishing peer-reviewed census confidence intervals, demographic ratios, and authenticated Management Plans.', documentedFindings: 'WII Management Effectiveness Evaluation highlighted persistent Upper Dachigam grazing, enclave pressures, and corridor isolation.', response: 'Biennial population estimations conducted with WII/university observers; authenticated 2020–2030 Management Plan text invited for archival deposit.', questions: ['What is the current operational status and scientific roadmap for the Shikargah Hangul Conservation Breeding Centre?', 'Will block-wise raw census counts and 95% confidence bounds be released publicly?'], corrective: 'Secure undisturbed fawning blocks, restore Upper Dachigam migration, and publish open census protocols.' },
    ],
    unansweredQuestions: ['What is the authenticated statutory Management Plan currently in force for Dachigam National Park (given legacy web domain link expiry)?'],
    alternatives: [
      { title: 'In-Situ Fawning Sanctuary Expansion & Upper Dachigam Pasture Recovery', mechanism: 'Prioritises disturbance-free in-situ fawning habitat and seasonal altitudinal migration over high-risk capture of wild hinds.', evidencePrecedent: 'European Red Deer & Bactrian Deer metapopulation recovery.', feasibilityNote: 'Eliminates capture myopathy risk in a <300-animal population.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Deposit Authenticated Dachigam Management Plan & Standardize Double-Observer/DNA Census', spec: 'Publish authenticated PDF management plan and pair visual rut/spring counts with non-invasive faecal DNA spatial capture-recapture.', target: 'J&K Dept. of Wildlife Protection & WII', justification: 'Removes census sightability ambiguity and broken public document links.', indicator: 'Authenticated Management Plan + SECR genetic census confidence intervals published.' },
    ],
    references: [
      { id: 'REF-DNP-01', authorsOrBody: 'Wildlife Institute of India (WII) & Dept. of Wildlife Protection J&K', year: 2020, title: 'Management Effectiveness Evaluation (MEE) of Dachigam National Park & Hangul Recovery Assessments', publicationOrSeries: 'MoEFCC / Wildlife Institute of India, Dehradun', referenceType: 'Technical Institute Report', externalUrl: 'https://wii.gov.in/', provenanceNote: 'Authoritative institutional evaluation of Dachigam conservation effectiveness and Greater Dachigam landscape needs.' },
      { id: 'REF-DNP-02', authorsOrBody: 'Brook, S. M., Donnithorne-Tait, D., Qureshi, Q., et al.', year: 2017, title: 'Cervus hanglu ssp. hanglu — The IUCN Red List of Threatened Species (Critically Endangered)', publicationOrSeries: 'IUCN Global Species Programme', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Confirms Critically Endangered status, <300 mature/total population size, and demographic ratio vulnerability.' },
    ],
    dataGaps: ['Authenticated archival copy of Dachigam Management Plan (legacy jkwildlife URL redirected externally) and block-wise 1990–2025 raw census sheets.'],
    hydrologyApplicable: false,
    regulatoryLead: 'Wildlife (Protection) Act, 1972 (Schedule I) & National Wildlife Action Plan.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0014',
    slug: 'dachigam-livestock-grazing-wildlife-habitat-competition',
    title: 'Domestic Livestock Pressure in the Dachigam Landscape: Grazing Competition, Disease Transmission and Wildlife Habitat Degradation',
    subtitle: 'Investigating migratory sheep/goat/equine stocking density in Upper Dachigam, alpine forage competition, soil compaction, livestock guard dogs, and pathogen spillover risks to Hangul',
    shortTitle: 'Dachigam: Livestock Grazing & Competition',
    seriesId: 'dachigam-national-park',
    seriesTitle: 'Dachigam National Park Investigations',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter (Stage 01)',
    temporalScope: '1981–2026',
    heroImage: '/images/protected-network/protected-national-parks-dachigam.jpg',
    heroImageCaption: 'Upper Dachigam subalpine and alpine meadows (Dagwan–Nagaberan) — assessing seasonal livestock overlap with historical Hangul summer range.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Ganderbal', 'Anantnag'],
    watershedOrBasin: 'Upper Dachigam — Dagwan, Nagaberan & Marsar Subalpine/Alpine Pastures',
    elevationRangeM: '2,600–4,200 m ASL',
    coordinates: [34.148, 75.095],
    spatialEnvelopeKm2: 95,
    connectedEcosystems: ['Nagaberan Alpine Meadows', 'Dagwan Headwaters', 'Betula utilis Timberline Ecotone'],
    primaryDomainId: '09-forests-biodiversity',
    secondaryDomainIds: ['06-alpine-mountain-ecology', '13-agriculture-horticulture'],
    disciplineIds: ['conservation-biology', 'soil-science', 'environmental-microbiology', 'remote-sensing', 'gis', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Dachigam National Park', route: '/protected-network/national-parks/dachigam-national-park', contributionNote: 'Threat assessment & Upper Dachigam zonation.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0013', 'KEW-INV-0015', 'KEW-INV-0016', 'KEW-INV-0017'],
    relatedSectoralCodes: ['KEW-SR-2026-20', 'KEW-SR-2026-54'],
    scopeDifferentiation: 'Focuses specifically on livestock intrusion inside legally notified National Park boundaries (where Wildlife Protection Act Sec 35(6) prohibits grazing) and its causal role in truncating Hangul summer migration.',
    centralQuestion: 'To what extent has seasonal domestic livestock grazing and herding-dog presence displaced Hangul from Upper Dachigam summer pastures and introduced gastrointestinal/viral pathogen risks?',
    scopingQuestions: [
      'What are the verified summer livestock headcounts, entry routes, and institutional/customary grazing permits operating across Upper Dachigam pastures (Nagaberan, Dagwan, Gumri)?',
      'What dietary niche overlap (Pianka index) and faecal parasite/seroprevalence overlap exist between migratory sheep/goats and Hangul?',
    ],
    executiveKeyFindings: [
      'WII assessments and published Hangul ecology studies identify heavy summer livestock and herding-dog presence in Upper Dachigam as a primary factor curtailing historical seasonal Hangul migration to high-protein alpine meadows.',
    ],
    chronology: [
      { period: '1981–2025', eventTitle: 'Persistence of Summer Grazing in Upper Dachigam Pastures', documentedRecord: 'Despite National Park notification, seasonal livestock flocks continued accessing high-altitude Upper Dachigam meadows.', sourceRef: 'REF-GRZ-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-GRZ-01', name: 'Seasonal Checkposts & Grazing Regulation in Upper Dachigam', period: '1985–Present', executingAgency: 'J&K Wildlife Dept. / Sheep Husbandry Context', interventionType: 'Protected-Area Grazing Control', reportedScaleOrOutlay: 'Routine park protection budget', status: 'Ongoing', documentedOutcome: 'Partial regulation in Lower Dachigam; Upper Dachigam alpine pastures remain seasonally contested.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'conservation-biology',
        disciplineName: 'Wildlife & Rangeland Ecology',
        clusterName: 'Biological & Ecological Sciences',
        methodologyApplied: 'Forage biomass exclosure plots, Pianka dietary overlap, soil bulk-density compaction, and coprological pathogen screening.',
        equationOrMetricUsed: 'RUSLE Soil Loss A = R·K·LS·C·P & Pianka Niche Overlap O_jk',
        empiricalFinding: 'High stocking density reduces palatable alpine forb biomass and introduces herding-dog disturbance during summer lactation.',
        uncertaintyAndLimitations: 'Requires current GPS-mappeddok/camp counts and equitable pastoralist livelihood transition data.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'WII and peer-reviewed Hangul habitat studies document that summer livestock and guard-dog disturbance in Upper Dachigam restrict Hangul utilization of high-altitude summer pastures.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Documented in WII MEE evaluations and Charoo et al. / Qureshi et al. Dachigam ecological assessments.', citationIds: ['REF-GRZ-01'] },
      { suffix: '02', assertion: 'Cross-transmission of paratuberculosis, foot-and-mouth, or gastrointestinal helminths from sheep flocks measurably depresses adult Hangul body condition in Dachigam.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Plausible veterinary-epidemiological pathway requiring paired non-invasive faecal PCR/coprological assays.', citationIds: ['REF-GRZ-01'], methodReq: 'Paired non-invasive faecal PCR and parasite egg counts from co-occurring sheep/goat and Hangul pellets.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Department of Wildlife Protection & Sheep Husbandry Department, J&K', acronym: 'Wildlife / Sheep Husbandry', mandate: 'Enforcement of Section 35(6) Wildlife Protection Act grazing restrictions paired with humane, compensated alternative pasture arrangements.', ownership: 'Upper Dachigam alpine pastures & migratory route regulation', scientificResp: 'Annual alpine biomass carrying-capacity and wildlife occupancy monitoring.', documentedFindings: 'WII evaluations recommended resolving Upper Dachigam grazing pressure to restore Hangul altitudinal migration.', response: 'Wildlife staff patrol entry points; rights-sensitive pastoralist consultation and alternative pasture records invited.', questions: ['How many livestock units entered Upper Dachigam during summers 2020–2026, and what alternative pasture/compensation frameworks exist for traditional herders?'], corrective: 'Co-design compensated outside-park pasture alternatives and veterinary vaccination buffers.' },
    ],
    unansweredQuestions: ['What is the exact spatial overlap (km²) between active summer dhoks in Upper Dachigam and historical 1960s–1980s Hangul summer calving/foraging grounds?'],
    alternatives: [
      { title: 'Compensated Outside-Core Pasture Rotation & Buffer Veterinary Shield', mechanism: 'Provides fodder/rotational grazing incentives outside core Upper Dachigam alongside 100% livestock vaccination and dog-exclusion rules in buffer zones.', evidencePrecedent: 'Kibber (Spiti) community-agreed livestock-free wildlife core reserves.', feasibilityNote: 'Protects traditional pastoral livelihoods while restoring disturbance-free alpine meadows for Hangul.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Establish Ungrazed Alpine Recovery Exclosures & Participatory Pasture Transition Plan', spec: 'Map all summer grazing camps via Sentinel-2/field transects and negotiate compensated core-meadow rest zones in Nagaberan–Dagwan.', target: 'J&K Wildlife Dept., Tribal Affairs & Revenue Dept.', justification: 'Restores high-nutrition summer forage essential for hind lactation and winter survival.', indicator: 'Verified Hangul summer camera-trap detections restored in Upper Dachigam meadows.' },
    ],
    references: [
      { id: 'REF-GRZ-01', authorsOrBody: 'Wildlife Institute of India (WII) — Qureshi, Q., Shah, G. M., Bhat, B. A., et al.', year: 2015, title: 'Ecology and Conservation of Hangul in Dachigam Landscape (Technical Report & MEE Series)', publicationOrSeries: 'Wildlife Institute of India, Dehradun', referenceType: 'Technical Institute Report', externalUrl: 'https://wii.gov.in/', provenanceNote: 'Documents Upper Dachigam livestock disturbance and summer range abandonment.' },
    ],
    dataGaps: ['Authenticated 2020–2026 summer livestock headcounts and alpine forb biomass exclosure measurements in Upper Dachigam.'],
    hydrologyApplicable: false,
    regulatoryLead: 'Wildlife (Protection) Act, 1972 Section 35(6) & Forest Rights / Pastoralist Consultation Frameworks.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0015',
    slug: 'dachigam-institutional-infrastructure-land-occupation',
    title: 'Institutional Land Occupation and Infrastructure within Dachigam National Park: Ecological Compatibility and Protected-Area Governance',
    subtitle: 'Forensic inventory of government sheep-breeding legacies, trout hatchery facilities, VIP/administrative compounds, paved roads, vehicular traffic, and utility lines inside Dachigam',
    shortTitle: 'Dachigam: Institutional Infrastructure Audit',
    seriesId: 'dachigam-national-park',
    seriesTitle: 'Dachigam National Park Investigations',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Forensic Governance Charter (Stage 01)',
    temporalScope: '1960–2026',
    heroImage: '/images/protected-network/protected-national-parks-dachigam.jpg',
    heroImageCaption: 'Lower Dachigam valley floor — evaluating ecological footprints and statutory authorizations of non-wildlife government infrastructure inside the National Park.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar'],
    watershedOrBasin: 'Lower & Upper Dachigam Valley Floor (Harwan–Draphama–Pahilpora–Dagwan)',
    elevationRangeM: '1,650–2,800 m ASL',
    coordinates: [34.108, 74.945],
    spatialEnvelopeKm2: 141,
    connectedEcosystems: ['Lower Dachigam Riparian Corridor', 'Dagwan Trout Stream', 'Winter Hangul Rutting & Wintering Flats'],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['09-forests-biodiversity', '07-infrastructure-development'],
    disciplineIds: ['environmental-law', 'conservation-biology', 'gis', 'remote-sensing', 'environmental-impact-assessment'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Dachigam National Park', route: '/protected-network/national-parks/dachigam-national-park', contributionNote: 'Protected boundary and visitor/access status.' },
      { moduleName: 'Environmental PIL & Statutory Governance', route: '/resources/environmental-pil', contributionNote: 'Protected-area non-forestry land-use statutory rules.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0013', 'KEW-INV-0014', 'KEW-INV-0016'],
    relatedSectoralCodes: ['KEW-SR-2026-61'],
    scopeDifferentiation: 'Zero overlap in sectoral portfolio: specifically audits government-owned enclaves, roads, hatcheries, VIP lodges, and legacy sheep-farm footprints inside Dachigam National Park.',
    centralQuestion: 'Which non-conservation government facilities, roads, and utility installations continue to operate inside Dachigam National Park, under what statutory authorizations, and what is their measurable disturbance footprint on prime winter Hangul valley-floor habitat?',
    scopingQuestions: [
      'Has the historical Government Sheep Breeding Farm land in Dachigam been completely handed over, ecologically restored, and vacated of all non-wildlife operations as repeatedly recommended since the 1980s?',
      'What daily vehicular traffic counts, acoustic disturbance radii, and riparian barrier effects arise from paved roads, VIP/guest compounds, water-supply headworks, and Laribal fisheries infrastructure in Lower Dachigam?',
    ],
    executiveKeyFindings: [
      'WII Management Effectiveness Evaluations and Supreme Court / NBWL protected-area guidelines identify non-forestry departmental enclaves and valley-floor vehicular traffic in Lower Dachigam as chronic stressors in the exact riparian belt required by wintering Hangul.',
    ],
    chronology: [
      { period: '1960s–1981', eventTitle: 'Pre-Park Departmental Enclaves Established', documentedRecord: 'Government sheep farm, trout hatchery, water intake, guest lodge, and paved road established along Dagwan valley floor prior to/around 1981 NP notification.', sourceRef: 'REF-INF-01', significance: 'Baseline' },
      { period: '2005–2020', eventTitle: 'WII & Statutory Recommendations on Sheep-Farm Relocation & Enclave Rationalisation', documentedRecord: 'Successive recovery plans urged complete relocation/restoration of non-wildlife departmental infrastructure from prime Hangul habitat.', sourceRef: 'REF-INF-01', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-INF-01', name: 'Departmental Facilities & Road Network Inside Dachigam NP', period: '1960s–Present', executingAgency: 'Multiple J&K Departments (Sheep Husbandry, Fisheries, PHE/Jal Shakti, Hospitality, Wildlife)', interventionType: 'Institutional Enclaves & Linear Utilities', reportedScaleOrOutlay: 'Departmental operational footprints under GIS cadastral audit', status: 'Ongoing', documentedOutcome: 'Partial sheep-farm phase-down reported historically; parcel-by-parcel current occupation & NBWL clearance audit initiated.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'gis',
        disciplineName: 'GIS & Protected-Area Law',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied: 'High-resolution building/fencing/road polygon digitization overlaid on Hangul winter kernel-density utilization distributions.',
        equationOrMetricUsed: 'Effective Undisturbed Core Area A_core = A_NP - Area(Buffer_road/enclave)',
        empiricalFinding: 'Because steep Zabarwan ridges confine winter Hangul habitat to the narrow Dagwan valley floor, linear roads and fenced compounds disproportionately fragment prime winter range.',
        uncertaintyAndLimitations: 'Requires official revenue/forest mutation records and gate vehicle entry registers.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'WII evaluations and Hangul Species Recovery Plans explicitly identified non-wildlife departmental enclaves (including the historical Sheep Breeding Farm and valley-floor vehicular movement) inside Dachigam as impediments to undisturbed habitat management.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'Recorded in WII Management Effectiveness Evaluation and MoEFCC Hangul Recovery Plan.', citationIds: ['REF-INF-01'] },
      { suffix: '02', assertion: 'Non-conservation vehicular trips entering Lower Dachigam exceed authorized park-management thresholds during peak rutting (Sep–Oct) and fawning (May–Jun) windows.', sourceCategory: 'Institutional DPR / EIA Filing', classification: 'Unverified', basis: 'Requires inspection of main gate vehicle entry logs classified by department and purpose.', citationIds: ['REF-INF-01'], methodReq: 'Audit 36-month main gate entry logs and acoustic/camera-trap Hangul flight-initiation distances.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Department of Wildlife Protection &Occupying Line Departments, J&K', acronym: 'J&K Wildlife / Line Depts.', mandate: 'Exclusive conservation management of National Park land under Sections 35 & 29 of the Wildlife (Protection) Act, 1972 and NBWL guidelines.', ownership: 'All built compounds, fenced enclosures, hatcheries, roads, and utility corridors inside Dachigam NP', scientificResp: 'Maintaining parcel-level register of authorized structures and enforcing rutting/fawning traffic moratoriums.', documentedFindings: 'WII MEE flagged continuing multi-department footprints inside Lower Dachigam.', response: 'Gate entry permits and seasonal rutting restrictions enforced by Wildlife Warden; complete parcel-transfer status invited.', questions: ['Which exact parcels (in hectares) inside Dachigam NP remain under the control of departments other than Wildlife Protection as of November 2026?', 'What NBWL authorizations exist for any post-1981 construction or utility upgrades inside the Park?'], corrective: 'Complete statutory land mutation of all residual enclaves to Wildlife Protection and restrict valley-floor motor access to essential electric patrol vehicles.' },
    ],
    unansweredQuestions: ['Has 100% of the former Government Sheep Breeding Farm acreage been legally mutated to Dachigam National Park and ecologically restored?'],
    alternatives: [
      { title: 'Zero-Combustion Core Patrols & Externalized Departmental Facilities', mechanism: 'Relocates non-essential administrative/hospitality functions outside Harwan gate and transitions essential park patrols to silent electric vehicles.', evidencePrecedent: 'IUCN Category II core-zone vehicle-exclusion standards.', feasibilityNote: 'Immediately expands functional winter Hangul refuge without boundary expansion.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Complete GIS Register of Built Structures, Land Control & Gate Vehicle Logs', spec: 'Disclose every non-wildlife compound, land-transfer order, and monthly departmental vehicle count inside Dachigam NP.', target: 'Chief Wildlife Warden J&K & General Administration Dept.', justification: 'Establishes transparent protected-area governance baseline.', indicator: 'Public parcel & authorization register published; strict rutting/fawning motor-vehicle cap enforced.' },
    ],
    references: [
      { id: 'REF-INF-01', authorsOrBody: 'Wildlife Institute of India (WII)', year: 2020, title: 'Management Effectiveness Evaluation of National Parks and Wildlife Sanctuaries in India — Dachigam National Park Assessment', publicationOrSeries: 'MoEFCC & WII Dehradun', referenceType: 'Technical Institute Report', externalUrl: 'https://wii.gov.in/', provenanceNote: 'Documents institutional enclave, sheep-farm legacy, and traffic governance issues inside Dachigam.' },
    ],
    dataGaps: ['Parcel-level cadastral mutation orders for the Sheep Breeding Farm and 2022–2026 Harwan gate vehicle logs.'],
    hydrologyApplicable: false,
    regulatoryLead: 'Wildlife (Protection) Act, 1972 Sections 29 & 35; Supreme Court / NBWL Protected Area Orders.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0016',
    slug: 'greater-dachigam-wildlife-corridor-connectivity',
    title: "Beyond Dachigam: Habitat Connectivity, Landscape Fragmentation and the Long-Term Survival of Kashmir's Wildlife",
    subtitle: 'Circuit-theory and least-cost corridor assessment across Dachigam, Overa-Aru, Tral–Shikargah, Khiram, and Sindh–Wangath to test single-reserve isolation risk',
    shortTitle: 'Greater Dachigam Wildlife Corridors',
    seriesId: 'dachigam-national-park',
    seriesTitle: 'Dachigam National Park Investigations',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Critical Scoping · Landscape Connectivity GIS',
    temporalScope: '1980–2026',
    heroImage: '/images/protected-network/protected-area-atlas-gis.jpg',
    heroImageCaption: 'Greater Dachigam Landscape connectivity network linking Dachigam with Overa-Aru, Shikargah–Tral, and Sindh–Wangath.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Ganderbal', 'Pulwama', 'Anantnag'],
    watershedOrBasin: 'Zabarwan–Sindh–Lidder–Tral Inter-Basin Forest Divide (~1,000 km² Greater Dachigam Landscape)',
    elevationRangeM: '1,650–4,400 m ASL',
    coordinates: [34.095, 75.145],
    spatialEnvelopeKm2: 1050,
    connectedEcosystems: ['Dachigam NP', 'Overa-Aru Wildlife Sanctuary', 'Tral / Shikargah–Panyer Conservation Reserves', 'Wangath–Naranag–Sindh Forests'],
    primaryDomainId: '09-forests-biodiversity',
    secondaryDomainIds: ['07-infrastructure-development', '11-urbanisation-land-use'],
    disciplineIds: ['conservation-biology', 'gis', 'remote-sensing', 'spatial-statistics', 'environmental-impact-assessment', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Corridors & Connectivity', route: '/protected-network/corridors-and-connectivity', contributionNote: 'Dachigam–Tral–Shikargah & Dachigam–Overa-Aru corridor vectors.' },
      { moduleName: 'Protected Areas GIS Atlas', route: '/protected-network/atlas', contributionNote: '182-site spatial boundary & corridor overlay.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0013', 'KEW-INV-0014', 'KEW-INV-0015', 'KEW-INV-0036'],
    relatedSectoralCodes: ['KEW-SR-2026-39', 'KEW-SR-2026-61'],
    scopeDifferentiation: 'Operationalizes WII’s specific recommendation for a Greater Dachigam Landscape by pinpointing road, orchard, quarry, and settlement pinch-points severing Hangul, Black Bear, and Musk Deer dispersal.',
    centralQuestion: 'Can Dachigam National Park (141 km²) sustain a genetically and demographically viable Hangul population in isolation, or is functional ecological reconnection across the Greater Dachigam Landscape indispensable against stochastic extinction?',
    scopingQuestions: [
      'Where are the exact <500 m pinch-points (roads, fencing, quarries, settlements, hydropower canals) obstructing wildlife movement between Dachigam, Tral–Shikargah, Overa-Aru, and Sindh?',
      'Have notified Conservation Reserves (Khiram, Panyer, Shikargah, Khrew, Brain-Nishat, Khimber-Dara) received legally enforceable Eco-Sensitive Zone and corridor land-use protections?',
    ],
    executiveKeyFindings: [
      'WII’s Management Effectiveness Evaluation explicitly recommends managing a ~1,000 km² Greater Dachigam Landscape because a single isolated <300-animal population in 141 km² faces severe demographic, disease, and wildfire/climate extinction risk.',
    ],
    chronology: [
      { period: '2005–2024', eventTitle: 'Notification of Adjoining Conservation Reserves & WII Greater Dachigam Proposal', documentedRecord: 'Conservation reserves notified around Dachigam; WII MEE urged integrated landscape corridor governance.', sourceRef: 'REF-COR-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-COR-01', name: 'Greater Dachigam Conservation Reserves & Eco-Sensitive Zone Notifications', period: '2005–Present', executingAgency: 'J&K Wildlife Dept. / Forest Dept. / MoEFCC', interventionType: 'Landscape Corridor Designation', reportedScaleOrOutlay: 'Integrated Development of Wildlife Habitats (IDWH)', status: 'Ongoing', documentedOutcome: 'Legal reserve polygons exist on paper, but linear road upgrades, stone quarries (Khrew–Pampore belt), and fencing threaten permeability.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'conservation-biology',
        disciplineName: 'Landscape Ecology & Circuit Theory',
        clusterName: 'Biological & Ecological Sciences',
        methodologyApplied: 'Omniscape/Circuitscape current-density modelling + Effective Mesh Size m_eff across 1990–2025 Sentinel/Landsat land-cover series.',
        equationOrMetricUsed: 'Effective Mesh Size m_eff = (1 / A_total) Σ A_i²; Resistance-surface current I = V / R_eff',
        empiricalFinding: 'Stone quarrying in the Khrew–Wuyan spur and road ribbon development along Sindh and Tral margins concentrate movement current into narrow vulnerable saddles.',
        uncertaintyAndLimitations: 'Requires systematic camera-trap and faecal-DNA verification in stepping-stone reserves (Shikargah, Khiram, Wangath).',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Wildlife Institute of India evaluations recommend managing Dachigam as part of an interconnected Greater Dachigam Landscape incorporating adjoining sanctuaries and Hangul corridors.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'Directly recommended in WII Management Effectiveness Evaluation and Hangul Recovery documentation.', citationIds: ['REF-COR-01'] },
      { suffix: '02', assertion: 'Active gene flow via natural Hangul dispersal between Dachigam and Tral–Shikargah or Overa-Aru currently occurs at >=1 effective migrant per generation.', sourceCategory: 'Scientific Literature', classification: 'Unverified', basis: 'Recent relic sightings outside Dachigam are sporadic; contemporary inter-patch gene flow requires landscape-wide faecal genotyping.', citationIds: ['REF-COR-01'], methodReq: 'Multi-reserve non-invasive faecal microsatellite/SNP genotyping across Dachigam, Tral, Shikargah, Khiram, and Overa-Aru.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Wildlife Protection Dept., Territorial Forest Dept. & Town Planning/Revenue', acronym: 'Wildlife / Forest / Revenue', mandate: 'Maintaining ecological corridor permeability, ESZ land-use restrictions, and quarry/road clearance scrutiny across the Greater Dachigam Landscape.', ownership: 'Dachigam NP, Overa-Aru WS & 8 adjoining Conservation Reserves', scientificResp: 'Corridor camera-trap occupancy monitoring and cumulative EIA screening of linear/extractive projects.', documentedFindings: 'WII MEE recommended unified Greater Dachigam Landscape governance across territorial forest and wildlife divisions.', response: 'Conservation reserves notified and ESZ proposals processed; unified landscape authority status invited.', questions: ['Is there a binding inter-divisional Greater Dachigam Landscape Management Plan governing road, fencing, and quarry clearances in corridor bottlenecks?'], corrective: 'Notify legally binding Corridor Protection Overlays prohibiting stone crushers, chain-link fencing, and ribbon construction in pinch-points.' },
    ],
    unansweredQuestions: ['Which specific ridge saddles and stream crossings between Dachigam, Shikargah, and Overa-Aru retain confirmed Hangul or large-mammal transit in 2024–2026?'],
    alternatives: [
      { title: 'Statutory Greater Dachigam Conservation Landscape Authority & Wildlife Overpasses/Fencing Removal', mechanism: 'Unifies Wildlife and Territorial Forest compartments under a single corridor land-use plan and removes impermeable fencing/quarry encroachments.', evidencePrecedent: 'Terai Arc & Kaziranga–Karbi Anglong corridor notifications.', feasibilityNote: 'Uses existing public forest land to establish a second viable Hangul sub-population.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Map & Protect All <500 m Corridor Pinch-Points Across Dachigam–Tral–Overa–Sindh', spec: 'Publish 10 m resistance-surface pinch-point GIS layers and freeze new quarry/fencing/building permissions inside identified bottlenecks.', target: 'J&K Forest & Wildlife Dept., SEIAA & District Magistrates', justification: 'Prevents irreversible severance of the last Hangul dispersal pathways.', indicator: 'Zero net loss of natural cover in mapped Greater Dachigam corridor bottlenecks.' },
    ],
    references: [
      { id: 'REF-COR-01', authorsOrBody: 'Wildlife Institute of India (WII)', year: 2020, title: 'Management Effectiveness Evaluation — Greater Dachigam Landscape & Hangul Corridor Recommendations', publicationOrSeries: 'MoEFCC & WII Dehradun', referenceType: 'Technical Institute Report', externalUrl: 'https://wii.gov.in/', provenanceNote: 'Primary institutional basis for Greater Dachigam corridor integration.' },
    ],
    dataGaps: ['Synchronized camera-trap and faecal-DNA sampling grids across Tral, Shikargah, Khiram, and Wangath stepping-stone reserves.'],
    hydrologyApplicable: false,
    regulatoryLead: 'Wildlife (Protection) Act 1972 (Conservation Reserves Sec 36A & ESZ notifications under EPA 1986).',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0017',
    slug: 'dachigam-climate-change-ecosystem-stability',
    title: 'Climate-Induced Ecological Transformation of Dachigam National Park: Snow Cover, Vegetation Shifts, Water Availability and Wildlife Adaptation',
    subtitle: 'Assessing winter snow-water equivalent decline, earlier Dagwan snowmelt, spring forage phenology shifts, autumn mast variability, wildfire risk, and Hangul thermal/trophic mismatch',
    shortTitle: 'Dachigam: Climate Change & Ecosystem Stability',
    seriesId: 'dachigam-national-park',
    seriesTitle: 'Dachigam National Park Investigations',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter (Stage 01)',
    temporalScope: '1980–2026',
    heroImage: '/images/protected-network/protected-national-parks-dachigam.jpg',
    heroImageCaption: 'Altitudinal climate gradient (1,600–4,267 m ASL) from Lower Dachigam broadleaf groves to Mahadev snowfields.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Ganderbal'],
    watershedOrBasin: 'Marsar–Dagwan Glacial/Nival Watershed & Dachigam Elevation Transect',
    elevationRangeM: '1,600–4,267 m ASL',
    coordinates: [34.142, 75.045],
    spatialEnvelopeKm2: 141,
    connectedEcosystems: ['Marsar Lake Headwaters', 'Dagwan River', 'Quercus robur / Ulmus / Parrotiopsis Groves', 'Subalpine Birch-Conifer Ecotone'],
    primaryDomainId: '09-forests-biodiversity',
    secondaryDomainIds: ['17-climate-compound-hazards', '05-glaciers-cryosphere', '03-rivers-hydrology'],
    disciplineIds: ['climatology', 'hydrology', 'conservation-biology', 'remote-sensing', 'spatial-statistics'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Dachigam National Park', route: '/protected-network/national-parks/dachigam-national-park', contributionNote: 'Ecological trend indicators (+0.6°C warming baseline).' },
      { moduleName: 'Seasonal Ecology & Phenology', route: '/seasonal-ecology', contributionNote: 'Spring green-up and rutting/fawning phenology windows.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0013', 'KEW-INV-0014', 'KEW-INV-0016'],
    relatedSectoralCodes: ['KEW-SR-2026-42', 'KEW-SR-2026-63', 'KEW-SR-2026-77'],
    scopeDifferentiation: 'Translates regional Western Himalayan warming into site-specific phenological, hydrological (Dagwan low-flow), wildfire, and Hangul/black-bear trophic consequences inside Dachigam NP.',
    centralQuestion: 'How are winter snowpack deficits, earlier spring green-up, and late-summer/autumn dry spells altering forage phenology, Dagwan streamflows, wildfire frequency, and wildlife survival in Dachigam?',
    scopingQuestions: [
      'Has earlier spring snowmelt shifted peak forage green-up out of alignment with May–June Hangul parturition and lactation energy demands?',
      'Do autumn drought spells and variable oak/walnut/fruit mast crops drive increased Himalayan Black Bear movement out of Dachigam into adjoining orchards (human-wildlife conflict) and dry-winter forest fires?',
    ],
    executiveKeyFindings: [
      'MODIS/Landsat snow-cover and IMD Srinagar temperature series document warming winter minima and heightened dry-winter ground-fire susceptibility across Zabarwan south-facing slopes.',
    ],
    chronology: [
      { period: '2000–2026', eventTitle: 'MODIS NDVI/NDSI Phenology & Dry-Winter Wildfire Episodes', documentedRecord: 'Satellite observations record earlier snowline retreat and recurrent autumn/winter grass-litter fires on south-facing Zabarwan slopes.', sourceRef: 'REF-CLM-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-CLM-01', name: 'Dachigam Fire-Line Maintenance & Micro-Meteorological Monitoring', period: '2010–Present', executingAgency: 'J&K Wildlife Protection Dept.', interventionType: 'Wildfire Suppression & Habitat Management', reportedScaleOrOutlay: 'CAMPA / IDWH allocations', status: 'Ongoing', documentedOutcome: 'Manual fire-beating lines maintained; automated elevation-band weather/soil-moisture stations across 1,700–3,800 m needed.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'climatology',
        disciplineName: 'Bioclimatology & Phenology',
        clusterName: 'Chemical & Atmospheric Sciences',
        methodologyApplied: 'Mann–Kendall trend & Sen’s slope on MODIS NDSI snow persistence, NDVI Start-of-Season (SOS), and Dagwan baseflow.',
        equationOrMetricUsed: 'Phenological Mismatch Δt_mismatch = DOY_parturition - DOY_peak_NDVI',
        empiricalFinding: 'Warming late-winter anomalies accelerate low-elevation green-up and senescence while drying south-aspect grass slopes.',
        uncertaintyAndLimitations: 'Requires high-elevation AWS data above 3,000 m inside Upper Dachigam.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Western Himalayan meteorological records document statistically significant winter/spring warming and declining solid-to-liquid precipitation ratios across the Srinagar–Zabarwan elevation belt.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established by IMD long-term station analyses and Western Himalayan climate studies (Shafiq et al., 2019; Romshoo et al., 2015).', citationIds: ['REF-CLM-01'] },
      { suffix: '02', assertion: 'Trophic mismatch between earlier spring forb senescence and May–June Hangul fawning has measurably lowered neonatal fawn recruitment since 2000.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Plausible ungulate phenology hypothesis requiring multi-year regression of MODIS SOS against standardized fawn:hind counts.', citationIds: ['REF-CLM-01'], methodReq: 'Correlate 25-year MODIS 250 m NDVI phenology metrics in fawning blocks against standardized biennial fawn:hind ratios.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Department of Wildlife Protection J&K & Climate Change Cell (DEERS)', acronym: 'Wildlife / DEERS', mandate: 'Climate-adaptive protected-area planning, dry-winter wildfire prevention, and Dagwan watershed conservation.', ownership: 'Dachigam NP elevation monitoring & fire management plan', scientificResp: 'Operating elevation-gradient AWS/phenology plots and protecting thermal refugia.', documentedFindings: 'State Action Plan on Climate Change & WII MEE recognize high climate sensitivity of temperate-alpine ecotones.', response: 'Seasonal fire-watch squads deployed during dry autumn/winter spells; AWS telemetry integration invited.', questions: ['Are automated weather and soil-moisture stations operational across Lower, Middle, and Upper Dachigam elevation bands?'], corrective: 'Install 3-tier elevation AWS/phenocams and incorporate climate-corridor refugia into the Dachigam Management Plan.' },
    ],
    unansweredQuestions: ['How have Dagwan River August–October low-flow discharges changed since 1990, affecting both Dachigam riparian groves and Harwan raw-water supply?'],
    alternatives: [
      { title: 'Altitudinal Thermal-Refugia Protection & Early-Warning Wildfire Moisture Grid', mechanism: 'Protects unbroken north-aspect broadleaf/conifer canopy corridors up to 3,800 m and deploys soil-moisture fire alerts.', evidencePrecedent: 'IUCN climate-smart protected area adaptation standards.', feasibilityNote: 'Buffers microclimatic extremes naturally.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Deploy 3-Elevation AWS + Phenocam Transect (1,700 m, 2,700 m, 3,700 m) in Dachigam', spec: 'Couple continuous snow-depth, soil-moisture, and Dagwan discharge gauges with phenological vegetation plots.', target: 'J&K Wildlife Dept., KU & IMD', justification: 'Replaces coarse regional climate extrapolation with in-park empirical telemetry.', indicator: 'Continuous open phenology & Dagwan discharge dataset active.' },
    ],
    references: [
      { id: 'REF-CLM-01', authorsOrBody: 'Shafiq, M. U., Rasool, R., Ahmed, P., & Dimri, A. P.', year: 2019, title: 'Temperature and precipitation trends in Kashmir Valley, north Western Himalayas', publicationOrSeries: 'Theoretical and Applied Climatology, 135, 293–304', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1007/s00704-018-2377-9', externalUrl: 'https://doi.org/10.1007/s00704-018-2377-9', provenanceNote: 'Establishes empirical warming and winter precipitation shift across the Kashmir Valley.' },
    ],
    dataGaps: ['High-altitude (>3,000 m) in-situ meteorological and Dagwan continuous stream-gauge records inside Dachigam.'],
    regulatoryLead: 'Wildlife (Protection) Act 1972 & J&K Action Plan on Climate Change.',
  }),

  // ═══════════════════════════════════════════════════════════════════════════
  // SERIES 3: SALIM ALI NATIONAL PARK INVESTIGATIONS (3: KEW-INV-0018..0020)
  // ═══════════════════════════════════════════════════════════════════════════
  makeCharterRecord({
    code: 'KEW-INV-0018',
    slug: 'salim-ali-national-park-denotification-forensic-legal-audit',
    title: 'From Protected Wildlife Habitat to Golf Course: A Forensic Environmental and Legal Investigation into the De-notification and Transformation of Salim Ali National Park, Srinagar',
    subtitle: 'Reconstructing original City Forest National Park gazette boundaries, cabinet/statutory instruments, Royal Springs Golf Course conversion (1998–2001), EIA clearances, and current legal status',
    shortTitle: 'Salim Ali NP: De-notification & Legal Audit',
    seriesId: 'salim-ali-national-park',
    seriesTitle: 'Salim Ali National Park Historical & Legal Series',
    priority: 'Critical',
    recommendedPublicationSequence: 3,
    status: 'scoping_review',
    statusLabel: 'Priority #3 Scoping · Forensic Legal & Gazette Audit',
    temporalScope: '1986–2026',
    heroImage: '/images/protected-network.png',
    heroImageCaption: 'Zabarwan foothill–Dal Lake interface in Srinagar — forensic verification of the statutory notifications and conversion of City Forest (Salim Ali) National Park.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar'],
    watershedOrBasin: 'Zabarwan Foothill – Chashma Shahi – Nishat – Dal Lake Eastern Margin (~9.07 km²)',
    elevationRangeM: '1,585–2,050 m ASL',
    coordinates: [34.0833, 74.882],
    spatialEnvelopeKm2: 9.07,
    connectedEcosystems: ['Zabarwan Reserve Forests', 'Dal Lake Littoral Margin', 'Dachigam Southwestern Spur'],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['09-forests-biodiversity', '11-urbanisation-land-use', '12-tourism-pilgrimage'],
    disciplineIds: ['environmental-law', 'gis', 'remote-sensing', 'environmental-impact-assessment', 'conservation-biology'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Salim Ali National Park Archive', route: '/protected-network/national-parks/salim-ali-national-park', contributionNote: '9.07 km² gazette archive record & historical ecology.' },
      { moduleName: 'Earth & Human Impact · Change Detection Observatory', route: '/earth-human-impact/change-detection-observatory', contributionNote: '1986–2026 Landsat/Sentinel land-cover conversion overlay.' },
      { moduleName: 'Environmental PIL & Statutory Portal', route: '/resources/environmental-pil', contributionNote: 'Statutory protected-area boundary alteration law.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0019', 'KEW-INV-0020', 'KEW-INV-0016'],
    relatedSectoralCodes: ['KEW-SR-2026-61', 'KEW-SR-2026-95'],
    scopeDifferentiation: 'Completely unique forensic legal and archival investigation: retrieves and verifies primary gazette notifications, statutory de-notification instruments (if any exist), legislative/NBWL approvals, and wildlife relocation records rather than assuming legal de-notification from secondary reports.',
    centralQuestion: 'What authenticated gazette notifications, statutory legislative/wildlife approvals, environmental assessments, and cabinet instruments governed the transformation of City Forest (Salim Ali) National Park into a golf course, and what is the parcel’s exact current statutory status?',
    scopingQuestions: [
      'What are the exact text, SRO number, date, and cadastral boundary schedules of the original notification of City Forest (Salim Ali) National Park (~9.07 km²)?',
      'Does an authenticated statutory de-notification gazette instrument passed in accordance with applicable J&K Wildlife Protection / legislative provisions exist, or did land-use conversion proceed via executive transfer?',
      'Were any formal Environmental Impact Assessment (EIA), floral/faunal baseline inventory, or captive/wild animal relocation logs recorded prior to golf-course construction?',
    ],
    executiveKeyFindings: [
      'The Wildlife Institute of India (WII) Protected Area Gazette Notification archive records an official entry for City Forest (Salim Ali) National Park in Jammu & Kashmir (~9.07 km²), while archival conservation correspondence documents the late-1990s conversion into Royal Springs Golf Course.',
      'Epistemic Forensic Safeguard: KEW-EIAI treats the existence, form, and statutory validity of any de-notification instrument as a primary evidentiary question requiring authenticated Government Gazette retrieval rather than a pre-assumed fact.',
    ],
    chronology: [
      { period: '1986–1992', eventTitle: 'Notification of City Forest (Salim Ali) National Park (~9.07 km²)', documentedRecord: 'Recorded in WII Protected Area Gazette Notification registry for J&K along the Zabarwan–Dal foothills.', sourceRef: 'REF-SAL-01', significance: 'Baseline' },
      { period: '1998–2001', eventTitle: 'Development & Commissioning of Royal Springs Golf Course', documentedRecord: 'Forested/woodland parcel transformed into an 18-hole golf facility; conservation bodies raised statutory de-notification objections.', sourceRef: 'REF-SAL-02', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-SAL-01', name: 'Conversion of City Forest / Salim Ali NP Parcel to Royal Springs Golf Course', period: '1998–2001', executingAgency: 'Tourism Dept. / RSGC Management / Forest & Wildlife Depts.', interventionType: 'Protected Woodland-to-Golf-Course Land Transformation', reportedScaleOrOutlay: '~120+ ha turf/infrastructure development within ~9.07 km² notified area', status: 'Completed', documentedOutcome: 'Protected urban wildlife sanctuary replaced by manicured golf fairways; primary gazette de-notification instrument under RTI/archival verification.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-law',
        disciplineName: 'Environmental & Protected-Area Law',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'Primary statutory chain verification: Original SRO Gazette → Legislative/Board Resolution → De-notification SRO → Land Mutation → EIA Clearance.',
        equationOrMetricUsed: 'Statutory Chain Completeness Audit (10 Mandatory Documentary Links)',
        empiricalFinding: 'WII’s national PA gazette archive confirms original notification entry; subsequent statutory alteration instruments require certified Gazette of J&K verification.',
        uncertaintyAndLimitations: 'Certified copies of J&K Government Gazette SROs (1986–2002) and Cabinet/Legislative Assembly proceedings must be obtained before legal conclusions are drawn.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'The Wildlife Institute of India Protected Area Gazette Notification registry maintains an official entry for City Forest (Salim Ali) National Park in Srinagar (~9.07 km²).', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Verified in WII National Wildlife Database Protected Area Gazette Notifications for Jammu & Kashmir.', citationIds: ['REF-SAL-01'] },
      { suffix: '02', assertion: 'A valid, legislatively compliant statutory de-notification gazette order extinguishing National Park status across the entire 9.07 km² area was duly promulgated prior to golf course construction.', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Unverified', basis: 'Secondary media and NGO accounts contest the de-notification process; KEW requires certified Gazette SRO copies from J&K Law/Forest Archives before classifying compliance.', citationIds: ['REF-SAL-01', 'REF-SAL-02'], methodReq: 'Obtain certified J&K Government Gazette notifications, Cabinet decisions, and Wildlife Board/Assembly records (1986–2002).' },
    ],
    accountability: [
      { suffix: '01', institution: 'Department of Wildlife Protection, Forest Dept. & Tourism Dept., J&K', acronym: 'Wildlife / Forest / Tourism', mandate: 'Custodianship of statutory protected-area notifications, boundary alterations, wildlife relocation records, and compensatory conservation offsets.', ownership: 'Former City Forest (Salim Ali) National Park / Royal Springs Golf Course & adjoining Zabarwan compartments', scientificResp: 'Public disclosure of original and subsequent SRO notifications, remaining forested compartment status, and wildlife relocation logs.', documentedFindings: 'WII archive lists original notification while present land use reflects golf-course conversion; complete legal chain not publicly consolidated online.', response: 'Residual Zabarwan hillside compartments managed under forest/conservation categories; certified gazette dossier invited from departments.', questions: ['What are the exact SRO numbers and dates of the original notification and any subsequent boundary alteration or de-notification of Salim Ali National Park?', 'Which residual hectares of the original 9.07 km² remain forested public land eligible for statutory urban sanctuary restoration?'], corrective: 'Publish complete certified gazette history and legally protect all surviving adjacent Zabarwan–Dal woodland compartments.' },
    ],
    unansweredQuestions: [
      'What happened to captive and free-ranging wildlife (including Hangul/deer enclosures and avifauna habitats) documented in City Forest prior to 1998?',
      'How many hectares of the original 9.07 km² notification lie outside the fenced golf fairways and remain forested on the Zabarwan slope?',
    ],
    alternatives: [
      { title: 'Statutory Protection of Residual Zabarwan Compartments & Compensatory Urban Sanctuary Offset', mechanism: 'Demarcates and notifies all surviving undeveloped hillside/riparian parcels of the original 9.07 km² alongside naturalistic pesticide-free wetland roughs.', evidencePrecedent: 'Urban protected-area compensatory restoration covenants.', feasibilityNote: 'Achievable without speculative demolition claims while securing surviving woodland corridors.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Compile Certified Gazette Dossier (1986–2026) & Cadastral Boundary Overlay', spec: 'Retrieve certified SRO notifications, revenue mutations, and 1986 vs 2026 satellite boundary overlays across all 9.07 km².', target: 'J&K Archives, Dept. of Law, Wildlife Protection & DEERS', justification: 'Establishes verified legal and spatial truth without relying on hearsay.', indicator: 'Complete 10-component documentary verification matrix published.' },
    ],
    references: [
      { id: 'REF-SAL-01', authorsOrBody: 'Wildlife Institute of India (WII) — National Wildlife Database Cell', year: 2019, title: 'Protected Area Gazette Notifications Database: Jammu & Kashmir — City Forest (Salim Ali) National Park Entry', publicationOrSeries: 'Wildlife Institute of India, Dehradun', referenceType: 'Technical Institute Report', externalUrl: 'https://v1.wii.gov.in/protectedareagazette_jammu_kashmir', provenanceNote: 'Primary institutional archival anchor confirming official PA gazette entry.' },
      { id: 'REF-SAL-02', authorsOrBody: 'Bombay Natural History Society (BNHS) / Buceros & Sanctuary Archival Conservation Records', year: 2001, title: 'Archival Documentation on City Forest (Salim Ali) National Park Conversion to Royal Springs Golf Course, Srinagar', publicationOrSeries: 'Indian Ornithological & Protected Area Conservation Archives', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Documents contemporary conservation objections and historical ornithological significance.' },
    ],
    dataGaps: ['Certified copies of J&K Gazette SRO notifications (1986–2002), EIA/clearance files, and pre-conversion species relocation logs.'],
    hydrologyApplicable: false,
    regulatoryLead: 'J&K Wildlife (Protection) Act, 1978 / Central Wildlife (Protection) Act, 1972 Section 35(5) boundary alteration provisions.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0019',
    slug: 'salim-ali-national-park-wildlife-displacement-avian-loss',
    title: 'The Disappearing Urban Wildlife Sanctuary: Avian Diversity, Wetland Habitat Loss and Ecological Displacement Following the Transformation of Salim Ali National Park',
    subtitle: 'Reconstructing historical bird species richness, woodland-wetland habitat clearance, turfgrass irrigation/agrochemical inputs, and severed Zabarwan–Dal Lake wildlife movement',
    shortTitle: 'Salim Ali NP: Wildlife & Avian Displacement',
    seriesId: 'salim-ali-national-park',
    seriesTitle: 'Salim Ali National Park Historical & Legal Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Ecological Investigation (Stage 01)',
    temporalScope: '1972–2026',
    heroImage: '/images/biodiversity/biodiversity-command-center.jpg',
    heroImageCaption: 'Assessing avian guild turnover, turf chemical inputs, and Zabarwan–Dal Lake ecological connectivity loss.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar'],
    watershedOrBasin: 'Zabarwan Foothill – Dal Lake Eastern Ecotone',
    elevationRangeM: '1,585–2,050 m ASL',
    coordinates: [34.085, 74.885],
    spatialEnvelopeKm2: 12,
    connectedEcosystems: ['Dal Lake Littoral Reedbeds', 'Zabarwan Scrub-Oak Slopes', 'Chashma Shahi–Pari Mahal Woodland Belt'],
    primaryDomainId: '09-forests-biodiversity',
    secondaryDomainIds: ['01-lakes-limnology', '13-agriculture-horticulture', '11-urbanisation-land-use'],
    disciplineIds: ['ornithology', 'conservation-biology', 'ecotoxicology', 'remote-sensing', 'gis'],
    linkedKewModules: [
      { moduleName: 'Protected Network · Salim Ali National Park', route: '/protected-network/national-parks/salim-ali-national-park', contributionNote: 'Historical species list and park profile.' },
      { moduleName: 'Biodiversity · Bird Intelligence', route: '/biodiversity/birds', contributionNote: 'Srinagar–Zabarwan avian checklists and migratory guilds.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0018', 'KEW-INV-0020', 'KEW-INV-0001'],
    relatedSectoralCodes: ['KEW-SR-2026-56'],
    scopeDifferentiation: 'Focuses strictly on empirical biodiversity displacement, avian guild shifts, turf fungicide/fertilizer runoff toward Dal Lake, and Zabarwan foothill barrier effects — separate from legal gazette verification (KEW-INV-0018).',
    centralQuestion: 'How did replacing multi-layered native riparian woodland and scrub-wetland margins with monoculture golf turf and perimeter fencing alter avian diversity, mammal/amphibian movement, and agrochemical runoff into Dal Lake?',
    scopingQuestions: [
      'What changes in breeding forest-interior bird guilds, winter raptors, and wetland-edge avifauna occurred between pre-1998 ornithological records and contemporary eBird/point-count surveys?',
      'What annual volumes of irrigation water, nitrogen/phosphorus turf fertilizers, herbicides, and fungicides are applied on the golf course upslope of Dal Lake?',
    ],
    executiveKeyFindings: [
      'Landsat TM/ETM+/OLI time series (1986–2025) allow exact spatial quantification of canopy clearing, water-hazard excavation, and impervious perimeter fencing between Zabarwan and Dal Lake.',
    ],
    chronology: [
      { period: '1986–1997', eventTitle: 'Multi-Strata City Forest Woodland & Wildlife Refuge Phase', documentedRecord: 'Supported pheasant, flycatcher, raptor, jackal, black-bear, and Hangul/leopard foothill transit above Dal Lake.', sourceRef: 'REF-SAW-01', significance: 'Baseline' },
      { period: '1998–2026', eventTitle: 'Turf Monoculture Conversion & Perimeter Fencing', documentedRecord: 'Understorey scrub and wetland depressions replaced by irrigated fairways and security walls.', sourceRef: 'REF-SAW-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-SAW-01', name: 'Turfgrass Management, Irrigation Pumping & Perimeter Fencing at RSGC', period: '2001–Present', executingAgency: 'Royal Springs Golf Course Management', interventionType: 'Intensive Turf Maintenance', reportedScaleOrOutlay: 'Annual irrigation & turf-chemical maintenance', status: 'Ongoing', documentedOutcome: 'High aesthetic turf maintenance; turf agrochemical runoff and biodiversity audit unquantified.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'ornithology',
        disciplineName: 'Ornithology & Landscape Ecology',
        clusterName: 'Biological & Ecological Sciences',
        methodologyApplied: 'Historical museum/KU CORD checklist comparison vs stratified point-count surveys (fairway vs remnant Zabarwan woodland) + Landsat NDVI/structural heterogeneity.',
        equationOrMetricUsed: ' Sørensen Beta-Diversity β_sor & Ecotoxicological Risk Quotient RQ = MEC / PNEC',
        empiricalFinding: 'Canopy simplification typically replaces understory/cavity-nesting forest specialists with open-lawn generalists while perimeter walls block terrestrial mammal movement.',
        uncertaintyAndLimitations: 'Requires archival 1980s–1990s KU/BNHS bird transects and RSGC turf chemical procurement logs.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Multi-temporal Landsat archive imagery (1990 vs 2002) documents structural land-cover transformation of the City Forest foothill bench from heterogeneous woodland-scrub into manicured golf fairways.', sourceCategory: 'Satellite & GIS Archive', classification: 'Documented', basis: 'Directly observable in USGS Landsat 5 TM (1990–1997) vs Landsat 7 ETM+ (2001–2002) optical composites.', citationIds: ['REF-SAW-01'] },
      { suffix: '02', assertion: 'Turfgrass fungicide and nitrate/phosphate fertilizer applications on the golf course contribute measurable agrochemical loads to eastern Dal Lake sub-surface/storm drains.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Upslope hydrological gradient drains toward Dal Lake; requires downslope drain sampling and chemical inventory disclosure.', citationIds: ['REF-SAW-01'], methodReq: 'Seasonal storm-drain nutrient and pesticide LC-MS/MS screening at outfall culverts between RSGC and Boulevard.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Royal Springs Golf Course Management, J&K PCC & Wildlife Protection Dept.', acronym: 'RSGC / JKPCC / Wildlife', mandate: 'Preventing pesticide/nutrient runoff into Dal Lake, disclosing water abstraction, and conserving remnant native woodland patches.', ownership: 'Golf course irrigation, chemical inputs, and wooded roughs', scientificResp: 'Annual disclosure of turf chemical inputs, water abstraction volume, and avian biodiversity audits.', documentedFindings: 'No public environmental audit of RSGC water/chemical footprint or biodiversity offset commitments is currently published.', response: 'Course managed as premier tourism infrastructure; chemical/irrigation disclosure and Audubon-style naturalized buffer audit invited.', questions: ['What quantities (kg/yr) of fertilizers, herbicides, and fungicides and what volume (MLD) of Dal/spring water are used annually for turf irrigation?'], corrective: 'Transition to chemical-free integrated turf management, restore native understorey buffers, and open wildlife underpasses.' },
    ],
    unansweredQuestions: ['Which breeding bird and amphibian species recorded in City Forest prior to 1998 have been locally extirpated from the converted parcel?'],
    alternatives: [
      { title: 'Pesticide-Free Naturalized Woodland Buffers & Dal Bio-Retention Swales', mechanism: 'Converts out-of-play acreage back into multi-strata native Zabarwan woodland/wetland pockets and eliminates synthetic turf pesticides.', evidencePrecedent: 'Organic urban sanctuary golf retrofits adjacent to drinking/sensitive lakes.', feasibilityNote: 'Reduces chemical runoff into Dal Lake while restoring avian nesting strata.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Audit Turf Agrochemical/Irrigation Inputs & Conduct 4-Season Avian Comparison Survey', spec: 'Disclose annual chemical/water use and execute paired seasonal bird/herpetofauna surveys across RSGC vs intact Zabarwan forest.', target: 'JKPCC, RSGC & KU Biodiversity Researchers', justification: 'Quantifies ongoing ecological footprint and restoration potential.', indicator: 'Zero synthetic fungicide/phosphorus runoff into Dal Lake eastern drains.' },
    ],
    references: [
      { id: 'REF-SAW-01', authorsOrBody: 'USGS Landsat Archive & BNHS Important Bird Areas Inventory (Jammu & Kashmir)', year: 2004, title: 'Historical Land-Cover & Avifaunal Baseline of Dachigam–Zabarwan–City Forest–Dal Lake Complex', publicationOrSeries: 'USGS EarthExplorer / BNHS IBA Monograph', referenceType: 'Remote Sensing Dataset', externalUrl: 'https://earthexplorer.usgs.gov/', provenanceNote: 'Provides multi-spectral pre- and post-conversion imagery and regional IBA species baselines.' },
    ],
    dataGaps: ['Pre-1998 species-level City Forest census manuscripts and RSGC annual chemical/irrigation ledgers.'],
    regulatoryLead: 'Water Act 1974 (Dal catchment runoff), Wildlife Protection Act 1972 & Insecticides Act rules.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0020',
    slug: 'salim-ali-national-park-ecosystem-services-loss',
    title: 'The Environmental Cost of Losing Salim Ali National Park: Urban Flood Regulation, Carbon Storage, Biodiversity and Ecosystem Services',
    subtitle: 'Counterfactual hydrological, carbon-stock, land-surface-temperature (LST), and stormwater-infiltration modelling of historical woodland-wetland habitat versus current land use',
    shortTitle: 'Salim Ali NP: Ecosystem Services Loss',
    seriesId: 'salim-ali-national-park',
    seriesTitle: 'Salim Ali National Park Historical & Legal Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Ecosystem-Services Charter (Stage 01)',
    temporalScope: '1986–2026',
    heroImage: '/images/earth-human-impact/ehii-command-center-satellite.jpg',
    heroImageCaption: 'Quantifying lost Zabarwan foothill stormwater retention, carbon sequestration, and urban thermal regulation.',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar'],
    watershedOrBasin: 'Zabarwan Piedmont – Eastern Dal Stormwater Sub-Catchment (~9.07 km²)',
    elevationRangeM: '1,585–2,050 m ASL',
    coordinates: [34.082, 74.880],
    spatialEnvelopeKm2: 9.07,
    connectedEcosystems: ['Zabarwan Hill Torrent Fans', 'Boulevard Stormwater Drains', 'Eastern Dal Lake'],
    primaryDomainId: '11-urbanisation-land-use',
    secondaryDomainIds: ['09-forests-biodiversity', '17-climate-compound-hazards'],
    disciplineIds: ['ecological-economics', 'hydrological-modelling', 'soil-science', 'remote-sensing', 'climatology'],
    linkedKewModules: [
      { moduleName: 'Earth & Human Impact · Urban Ecology', route: '/earth-human-impact/urban-ecology', contributionNote: 'Srinagar LST thermal islands and impervious runoff.' },
      { moduleName: 'Earth & Human Impact · Change Detection', route: '/earth-human-impact/change-detection-observatory', contributionNote: 'Multi-decadal biomass and surface change.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0018', 'KEW-INV-0019', 'KEW-INV-0001'],
    relatedSectoralCodes: ['KEW-SR-2026-28', 'KEW-SR-2026-31', 'KEW-SR-2026-99'],
    scopeDifferentiation: 'Dedicated biophysical ecosystem-services counterfactual (SCS-CN stormwater runoff, tCO₂e biomass/soil carbon, Landsat thermal LST cooling) — zero repetition of legal de-notification history (KEW-INV-0018).',
    centralQuestion: 'What measurable urban flood-attenuation volume (m³), stormwater infiltration, carbon storage (tC), and summer microclimatic cooling were lost by converting a 9.07 km² foothill forest-wetland sanctuary into compacted turf and built surfaces?',
    scopingQuestions: [
      'How much did the SCS Curve Number (CN) and peak cloudburst runoff discharge into Boulevard/Dal Lake increase following woodland clearing and turf compaction?',
      'What is the net difference in above- and below-ground carbon stock (tC/ha) and summer Land Surface Temperature (°C) between intact Zabarwan woodland and irrigated golf turf?',
    ],
    executiveKeyFindings: [
      'Compacted golf fairways typically exhibit higher bulk density and lower deep macropore infiltration than multi-aged forest litter soils during high-intensity Zabarwan convective rainstorms, while requiring energy-intensive summer irrigation.',
    ],
    chronology: [
      { period: '1986–2026', eventTitle: '40-Year Landsat Thermal & Canopy Time Series Available', documentedRecord: 'Landsat 5/7/8/9 Surface Temperature and NDVI archives span a 12-year pre-conversion baseline (1986–1997) and 25-year post-conversion period.', sourceRef: 'REF-SAE-01', significance: 'Baseline' },
    ],
    interventions: [
      { id: 'INT-SAE-01', name: 'Piedmont Canopy Replacement & Subsurface Drainage Grading', period: '1998–2026', executingAgency: 'Tourism / Urban Infrastructure Agencies', interventionType: 'Land-Cover Transformation', reportedScaleOrOutlay: '9.07 km² ecosystem-service accounting boundary', status: 'Completed', documentedOutcome: 'Biophysical UN SEEA ecosystem-service loss account initiated.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'hydrological-modelling',
        disciplineName: 'Hydrological & Ecosystem-Service Modelling',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied: 'USDA SCS Curve Number runoff modelling, IPCC Tier-2 biomass/soil carbon accounting, and Landsat 8/9 TIRS LST differencing.',
        equationOrMetricUsed: 'Q = (P - 0.2 S)² / (P + 0.8 S),  S = (25400 / CN) - 254',
        empiricalFinding: 'Provides reproducible physical-unit bounds (m³ storm detention, tC sequestered, °C cooling) before any monetary valuation.',
        uncertaintyAndLimitations: 'Requires paired double-ring infiltrometer and soil-core organic carbon measurements on site vs reference Zabarwan forest.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Continuous 30 m Landsat optical and thermal archives (1986–2026) enable direct before-after-control-impact (BACI) measurement of canopy albedo and Land Surface Temperature across the former City Forest parcel relative to adjacent Zabarwan slopes.', sourceCategory: 'Satellite & GIS Archive', classification: 'Documented', basis: 'Verified availability of USGS Collection-2 Surface Reflectance and Surface Temperature scenes.', citationIds: ['REF-SAE-01'] },
      { suffix: '02', assertion: 'Forest-to-fairway soil compaction reduced 10-year storm infiltration capacity by >35% across the Chashma Shahi–Boulevard piedmont fan.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Requires field saturated hydraulic conductivity (K_sat) testing across fairway, rough, and intact Zabarwan oak-conifer stands.', citationIds: ['REF-SAE-01'], methodReq: 'Paired Guelph permeameter / infiltrometer and 0–30 cm soil organic carbon core sampling.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Srinagar Metropolitan Region Planners, DEERS & Forest Dept.', acronym: 'SDA / DEERS / Forest', mandate: 'Accounting for natural green-infrastructure flood buffering and carbon sinks in Srinagar Master Plan decisions.', ownership: 'Zabarwan foothill greenbelt & urban watershed regulation', scientificResp: 'Integrating UN SEEA natural-capital loss audits into urban land-use approvals.', documentedFindings: 'Urban wetland and foothill woodland conversions were historically approved without quantitative ecosystem-service replacement accounts.', response: 'Srinagar Master Plan 2035 incorporates Zabarwan greenbelt conservation overlays; SEEA natural-capital integration invited.', questions: ['Will Srinagar Master Plan authorities mandate 1:1 hydrological detention and carbon-sink offsets for historical public greenbelt conversions?'], corrective: 'Mandate biophysical stormwater-retention and native-canopy offsets in all Zabarwan piedmont management plans.' },
    ],
    unansweredQuestions: ['What is the net greenhouse-gas balance of the converted parcel once pumping electricity, mowing fuel, and N₂O emissions from turf fertilization are included?'],
    alternatives: [
      { title: 'Piedmont Detention Bio-Basins & Native Canopy Re-wilding Along Non-Play Margins', mechanism: 'Restores terraced stormwater infiltration basins and native broadleaf groves across peripheral slopes.', evidencePrecedent: 'UN SEEA urban sponge-foothill restoration.', feasibilityNote: 'Reduces Boulevard flash-flooding and nutrient runoff into Dal Lake.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Publish UN SEEA Biophysical Ecosystem-Services Account (1986 vs 2026) for Salim Ali Parcel', spec: 'Quantify physical changes in storm retention (m³), carbon stock (tC), and LST (°C) using Landsat + field soil cores.', target: 'DEERS, SKUAST-K & KU Earth Sciences', justification: 'Establishes an empirical benchmark against future protected-area conversions.', indicator: 'Peer-reviewed physical ecosystem-service balance published openly.' },
    ],
    references: [
      { id: 'REF-SAE-01', authorsOrBody: 'USGS / NASA Landsat Collection-2 Level-2 Surface Reflectance & Surface Temperature Archive', year: 2025, title: 'Multi-Decadal Optical & Thermal Time Series Over Srinagar–Zabarwan Foothills (Path 149 / Row 36, 1986–2025)', publicationOrSeries: 'USGS EarthExplorer Open Archive', referenceType: 'Remote Sensing Dataset', externalUrl: 'https://earthexplorer.usgs.gov/', provenanceNote: 'Primary remote-sensing baseline for canopy, NDVI, and LST change detection.' },
    ],
    dataGaps: ['In-situ soil bulk density, K_sat infiltration rates, and 0–50 cm soil organic carbon cores inside vs adjacent to RSGC.'],
    regulatoryLead: 'Environment Protection Act 1986, Srinagar Master Plan 2035 Zabarwan Greenbelt Provisions & UN SEEA Framework.',
  }),

  // ═══════════════════════════════════════════════════════════════════════════
  // SERIES 4: DRINKING WATER SECURITY IN KASHMIR (5: KEW-INV-0021..0025)
  // ═══════════════════════════════════════════════════════════════════════════
  makeCharterRecord({
    code: 'KEW-INV-0021',
    slug: 'kashmir-district-drinking-water-quality-compliance',
    title: "Is Kashmir's Drinking Water Safe? A District-Wise Scientific Assessment of Public Water Supply Quality, Contamination and Regulatory Compliance",
    subtitle: 'Evaluating microbiological (E. coli, coliforms), turbidity, residual chlorine, nitrate, heavy-metal, and pesticide compliance across all 10 Kashmir Division districts against BIS IS 10500:2012 and WHO guidelines',
    shortTitle: 'Kashmir Drinking Water Quality & Compliance',
    seriesId: 'drinking-water-security',
    seriesTitle: 'Drinking Water Security & Public Supply Series',
    priority: 'Critical',
    recommendedPublicationSequence: 4,
    status: 'scoping_review',
    statusLabel: 'Priority #4 Scoping · 10-District WQMIS & Lab Audit',
    temporalScope: '2013–2026',
    heroImage: '/images/publications/chemistry-water-icpms-chromatography.jpg',
    heroImageCaption: 'Auditing BIS IS 10500:2012 microbiological, physicochemical, residual chlorine, and trace-contaminant compliance across all 10 Kashmir Division districts.',
    subregion: 'Multi-District Kashmir Basin',
    districts: ALL_10_KASHMIR_DISTRICTS,
    watershedOrBasin: 'Public Drinking Water Supply Schemes Across All 10 Districts of Kashmir Division',
    elevationRangeM: '1,575–2,800 m ASL',
    coordinates: [34.075, 74.815],
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: ['Surface River/Stream Intakes', 'Karst & Alluvial Springs', 'Treated Distribution Networks', 'Household Consumer Taps'],
    primaryDomainId: '04-springs-groundwater',
    secondaryDomainIds: ['03-rivers-hydrology', '15-solid-waste-sewage', '18-environmental-governance'],
    disciplineIds: ['environmental-microbiology', 'environmental-chemistry', 'ecotoxicology', 'environmental-epidemiology', 'environmental-engineering', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Drinking Water Sources', route: '/water-systems/drinking-water-sources', contributionNote: 'District source inventory and water-quality testing sub-modules.' },
      { moduleName: 'Water Systems · Water Quality', route: '/water-systems/water-quality', contributionNote: 'Physicochemical parameter baselines.' },
      { moduleName: 'Environmental Monitoring · Health Signals', route: '/environmental-monitoring/environmental-health', contributionNote: 'Waterborne exposure indicators.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0022', 'KEW-INV-0023', 'KEW-INV-0024', 'KEW-INV-0025'],
    relatedSectoralCodes: ['KEW-SR-2026-53', 'KEW-SR-2026-38', 'KEW-SR-2026-80'],
    scopeDifferentiation: 'Complements sectoral scoping KEW-SR-2026-53 by conducting an explicit 10-district statutory compliance audit comparing JJM WQMIS public lab results and independent university assays against enforceable BIS IS 10500:2012 limits vs WHO health guidance.',
    centralQuestion: 'Across all ten districts of Kashmir Division, what proportion of public drinking-water supplies meet enforceable BIS IS 10500:2012 microbiological, turbidity, residual chlorine, nutrient, and trace-metal standards at the consumer tap across wet and dry seasons?',
    scopingQuestions: [
      'Why do independent peer-reviewed microbiological studies in Srinagar and Ganderbal detect coliform/E. coli presence in sampled treated tap supplies, and how closely do JJM WQMIS district lab failure rates reflect independent blind sampling?',
      'Where do snowmelt/rainstorm turbidity spikes (>5 NTU) suppress chlorine disinfection efficacy, and are orchard pesticides or heavy metals screened in accredited PHE/Jal Shakti laboratories?',
    ],
    executiveKeyFindings: [
      'Published University of Kashmir research in Srinagar and Ganderbal documented faecal/total coliform contamination in subsets of sampled drinking-water sources, including some treated tap samples — justifying systematic 10-district verification without extrapolating localized findings to the entire Valley.',
      'Enforceable Indian standard BIS IS 10500:2012 requires 0 E. coli / 0 total coliforms per 100 mL at consumer taps and >=0.2 mg/L free residual chlorine where chlorinated.',
    ],
    chronology: [
      { period: '2012', eventTitle: 'BIS IS 10500:2012 Drinking Water Specification Revision', documentedRecord: 'Established enforceable acceptable and permissible limits for microbiological, physical, chemical, and toxic parameters across India.', sourceRef: 'REF-DWQ-01', significance: 'Baseline' },
      { period: '2021–2026', eventTitle: 'JJM WQMIS Rollout & Independent KU Microbial Surveillance Studies', documentedRecord: 'Online WQMIS laboratory/FTK reporting launched alongside localized university studies flagging microbial breaches in Srinagar/Ganderbal taps.', sourceRef: 'REF-DWQ-02', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-DWQ-01', name: 'Jal Shakti District/Sub-Divisional Water Testing Laboratories & JJM WQMIS', period: '2019–Present', executingAgency: 'Jal Shakti (PHE) Department Kashmir', interventionType: 'Drinking Water Quality Surveillance & Chlorination', reportedScaleOrOutlay: 'JJM Water Quality Monitoring & Surveillance (WQM&S) grants', status: 'Ongoing', documentedOutcome: 'NABL accreditation expanded for select labs; contaminant-wise exceedance and remedial closure rates across all 10 districts under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-microbiology',
        disciplineName: 'Environmental Microbiology & Disinfection Kinetics',
        clusterName: 'Biological & Ecological Sciences',
        methodologyApplied: 'Membrane filtration E. coli/total coliform compliance + Chick–Watson CT disinfection & turbidity-shielding analysis across 9 parameter groups.',
        equationOrMetricUsed: 'Chick–Watson Inactivation: ln(N / N_0) = -k′ · C^n · t (compromised when Turbidity > 5 NTU)',
        empiricalFinding: 'High spring snowmelt/storm turbidity shields enteric pathogens from marginal chlorination while intermittent low-pressure distribution mains risk sewage ingress.',
        uncertaintyAndLimitations: 'Localized academic studies cannot be generalized to all 10 districts without stratified random household tap sampling.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Peer-reviewed University of Kashmir surveillance in Srinagar and Ganderbal detected bacterial/coliform contamination in sampled drinking-water sources, including subsets of treated tap samples, demonstrating localized post-treatment or disinfection vulnerability.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Reported in PubMed-indexed University of Kashmir drinking-water microbiological assessment; strictly scoped to sampled sites rather than Valley-wide extrapolation.', citationIds: ['REF-DWQ-03'] },
      { suffix: '02', assertion: 'Orchard fungicide/organophosphate residues and trace heavy metals (As, Pb, Cr, Cd) exceed BIS IS 10500:2012 acceptable limits in rural South and North Kashmir public tap supplies.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Routine district FTK/basic lab tests rarely screen pesticides or trace ICP-MS metals; requires accredited GC-MS/MS and ICP-MS seasonal tap assays.', citationIds: ['REF-DWQ-01', 'REF-DWQ-02'], methodReq: 'Stratified 10-district GC-MS/MS pesticide and ICP-MS trace-metal tap-water screening during spray and post-monsoon windows.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Jal Shakti (PHE) Department, Kashmir & J&K Health Surveillance (IDSP)', acronym: 'Jal Shakti / IDSP', mandate: 'Delivery of BIS IS 10500:2012 compliant potable water, accredited laboratory testing, residual chlorine maintenance, and remedial action on contaminated sources.', ownership: 'District/sub-divisional water quality laboratories and public supply disinfection', scientificResp: 'Contaminant-wise public reporting on JJM WQMIS and paired investigation of diarrhoeal/enteric clusters.', documentedFindings: 'Localized university studies report tap coliform detections despite high administrative safe-supply claims.', response: 'District testing laboratories upload periodic sample counts on JJM WQMIS; raw parameter-wise failure & remedial logs invited.', questions: ['What is the exact 2024–2026 sample count, % bacteriological failure, % residual-chlorine failure, and verified remedial turnaround time across each of the 10 Kashmir districts?', 'Which district laboratories hold active NABL accreditation for heavy metals and pesticide residues?'], corrective: 'Mandate automated online turbidity/chlorine dosing at WTP outlets and publish raw village/ward tap-test CSVs.' },
    ],
    unansweredQuestions: ['What percentage of consumer-end tap samples (as opposed to WTP clear-water tank samples) maintain >=0.2 mg/L free residual chlorine and 0 E. coli/100 mL across winter and monsoon peaks?'],
    alternatives: [
      { title: 'WHO Water Safety Plans (WSP) + Automated Flow-Paced Chlorination & Dead-End Flushing', mechanism: 'Shifts from occasional end-pipe grab testing to continuous turbidity-interlocked dosing and positive-pressure leak repair.', evidencePrecedent: 'WHO Drinking-Water Water Safety Plan & BIS IS 10500 multi-barrier standard.', feasibilityNote: 'Directly prevents intermittent-supply recontamination.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Audit All 10 Districts on JJM WQMIS & Institute Blind Consumer-Tap Microbiological Verification', spec: 'Cross-validate JJM WQMIS contaminant-wise and remedial portals against independent blind household tap sampling in all 10 districts.', target: 'Jal Shakti Dept. Kashmir & KU / SKIMS Public Health Labs', justification: 'Verifies actual tap safety rather than plant-gate claims.', indicator: '10-district seasonal BIS IS 10500 compliance matrix published openly.' },
    ],
    references: [
      { id: 'REF-DWQ-01', authorsOrBody: 'Bureau of Indian Standards (BIS)', year: 2012, title: 'IS 10500:2012 — Indian Standard Drinking Water Specification (Second Revision & Amendments)', publicationOrSeries: 'Government of India Statutory Standard', referenceType: 'Technical Institute Report', provenanceNote: 'Enforceable national benchmark for microbiological, physical, chemical, and toxic drinking-water limits.' },
      { id: 'REF-DWQ-02', authorsOrBody: 'Ministry of Jal Shakti — Jal Jeevan Mission', year: 2026, title: 'Water Quality Management Information System (WQMIS) — Contaminant-Wise & Remedial Action Portals', publicationOrSeries: 'ejalshakti.gov.in Official Repository', referenceType: 'Technical Institute Report', externalUrl: 'https://ejalshakti.gov.in/WQMIS', provenanceNote: 'Official repository for district laboratory and FTK water-quality surveillance.' },
      { id: 'REF-DWQ-03', authorsOrBody: 'University of Kashmir — Environmental Science / Microbiology Research Group', year: 2023, title: 'Assessment of bacteriological and physicochemical drinking water quality across Srinagar and Ganderbal supply sources', publicationOrSeries: 'PubMed Indexed Regional Drinking Water Study', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Documents localized coliform detections in sampled sources including treated water samples.' },
    ],
    dataGaps: ['Ward/village-level consumer-tap free residual chlorine, ICP-MS heavy metal, and GC-MS/MS pesticide residue datasets across all 10 districts.'],
    regulatoryLead: 'BIS IS 10500:2012 (enforceable national specification), J&K Water Resources Act 2010 & WHO Guidelines (4th ed., international health benchmark).',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0022',
    slug: 'kashmir-water-supply-schemes-filtration-plant-audit',
    title: "From Source to Household: A Scientific Performance Audit of Kashmir's Drinking Water Treatment Plants and Public Water Supply Infrastructure",
    subtitle: 'Measuring post-2013 progress against the historical CAG finding of 341 unfiltered schemes serving ~1.609M people, auditing coagulation, rapid-sand filtration, disinfection, storage reservoirs, and distribution leakage',
    shortTitle: 'Water Supply Schemes & Filtration Audit',
    seriesId: 'drinking-water-security',
    seriesTitle: 'Drinking Water Security & Public Supply Series',
    priority: 'Critical',
    recommendedPublicationSequence: 4,
    status: 'scoping_review',
    statusLabel: 'Priority #4b Scoping · WTP Engineering Audit',
    temporalScope: '2013–2026',
    heroImage: '/images/env-monitoring/kashmir-drinking-water-lab.jpg',
    heroImageCaption: 'Source-to-tap engineering audit across intake works, coagulation/filtration plants, service reservoirs, and distribution mains.',
    subregion: 'Multi-District Kashmir Basin',
    districts: ALL_10_KASHMIR_DISTRICTS,
    watershedOrBasin: 'Urban & Rural Water Treatment Plants (Rangil, Nishat, Alusteng, Sukhnag, Doodhganga & District WTPs)',
    elevationRangeM: '1,575–2,600 m ASL',
    coordinates: [34.165, 74.825],
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: ['Sind/Rangil Canal Intake', 'Doodhganga & Sukhnag Intakes', 'Dal/Marsar/Harwan Intake', 'District Gravity & Lift Schemes'],
    primaryDomainId: '15-solid-waste-sewage',
    secondaryDomainIds: ['03-rivers-hydrology', '07-infrastructure-development', '18-environmental-governance'],
    disciplineIds: ['environmental-engineering', 'hydraulics', 'environmental-chemistry', 'environmental-microbiology', 'ecological-economics', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Drinking Water · Water Treatment Plants', route: '/water-systems/drinking-water-sources/water-treatment', contributionNote: 'WTP process and capacity registry.' },
      { moduleName: 'Drinking Water · Distribution Network', route: '/water-systems/drinking-water-sources/distribution-network', contributionNote: 'Pipeline age, leakage, and storage analysis.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0021', 'KEW-INV-0023', 'KEW-INV-0025'],
    relatedSectoralCodes: ['KEW-SR-2026-53'],
    scopeDifferentiation: 'Zero duplicate in sectoral series: conducts a hydraulic and unit-process engineering audit of WTPs (coagulation, flocculation, sedimentation, rapid/slow sand filtration, gas vs hypo chlorination, clear-water reservoirs, and distribution cross-contamination) anchored against the historical March 2013 CAG baseline.',
    centralQuestion: 'How many of the 341 unfiltered water-supply schemes identified in the March 2013 CAG audit (serving ~1.609 million people across 7 Kashmir divisions) now possess fully commissioned, continuously operating filtration and disinfection systems, and where do plant bypasses or distribution leaks persist in 2026?',
    scopingQuestions: [
      'Of all operational Water Supply Schemes (WSS) in Kashmir Division in November 2026, how many supply direct raw river/nallah water without functional filtration or automated chlorination?',
      'During high-turbidity snowmelt and cloudburst events (>50–200 NTU in Doodhganga, Sind, Lidder, Vishow, Pohru), do rapid-sand WTPs maintain <1–5 NTU filtered effluent or bypass overloaded clarifiers?',
    ],
    executiveKeyFindings: [
      'Historical Benchmark (Not Assumed Current): CAG’s performance audit for the period ended March 2013 documented unfiltered water supply to ~1.609 million residents through 341 schemes across seven examined PHE divisions in Kashmir.',
      'This investigation measures verified 2013–2026 commissioning of rapid/slow-sand WTPs under AMRUT, JJM, and languishing-project funds rather than citing 2013 figures as 2026 conditions.',
    ],
    callouts: [
      { label: '2013 CAG Baseline Schemes', value: '341', unit: 'Unfiltered (7 Divs)', sourceTag: 'Historical CAG 2013 Audit' },
      { label: '2013 Affected Population', value: '1.609M', unit: 'Historical Baseline', sourceTag: 'Historical CAG 2013 Audit' },
      { label: '2026 Verification Scope', value: '10 Districts', unit: 'Source-to-Tap Chain', sourceTag: 'KEW Engineering Audit' },
    ],
    chronology: [
      { period: 'Ended Mar 2013', eventTitle: 'CAG Audit on Rural/Public Water Supply in J&K', documentedRecord: 'Identified 341 schemes across 7 Kashmir PHE divisions supplying unfiltered water to ~1.609 million people alongside incomplete WTPs.', sourceRef: 'REF-WTP-01', significance: 'Audit / Judicial' },
      { period: '2019–2026', eventTitle: 'AMRUT, Languishing Projects & JJM Filtration Plant Commissioning Drive', documentedRecord: 'Major capital allocations sanctioned to complete stalled filtration plants and upgrade rural WSS treatment.', sourceRef: 'REF-WTP-02', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-WTP-01', name: 'Urban & Rural Rapid/Slow Sand Filtration Plants & Service Reservoirs', period: '2013–2026', executingAgency: 'Jal Shakti (PHE) Department Kashmir', interventionType: 'Drinking Water Filtration & Distribution Infrastructure', reportedScaleOrOutlay: 'NRDWP, AMRUT & JJM capital outlays', status: 'Ongoing', documentedOutcome: 'Substantial civil construction reported; plant-by-plant filter media condition, alum/chlorine dosing continuity, and non-revenue leakage under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-engineering',
        disciplineName: 'Water Treatment & Hydraulic Engineering',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'Unit-process mass balance (jar-test alum dosing, surface overflow rate, filter backwash headloss, CT disinfection) + intermittent-pipe negative-pressure intrusion audit.',
        equationOrMetricUsed: 'Log Removal Value LRV = log₁₀(C_raw / C_treated); Hazen–Williams headloss & NRW %',
        empiricalFinding: 'Intermittent supply schedules (2–4 hrs/day) create vacuum transients when mains drain, drawing contaminated trench water through aging joints alongside surface drains.',
        uncertaintyAndLimitations: 'Requires current division-wise WSS master register distinguishing civil completion from 24×7 chemical/filter operation.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'For the audit period ended March 2013, the CAG documented that 341 water-supply schemes across seven examined PHE divisions in Kashmir supplied unfiltered water to approximately 1.609 million people.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Directly recorded in CAG Audit Report on Government of Jammu & Kashmir (period ended March 2013); explicitly framed as a historical baseline.', citationIds: ['REF-WTP-01'] },
      { suffix: '02', assertion: 'All 341 historically unfiltered schemes identified in 2013 now operate continuously functioning filtration and automated disinfection units meeting BIS IS 10500 turbidity/coliform standards.', sourceCategory: 'Institutional DPR / EIA Filing', classification: 'Unverified', basis: 'Requires scheme-by-scheme 2026 operational verification of filter media, coagulant/chlorine consumption logs, and outlet NTU.', citationIds: ['REF-WTP-01', 'REF-WTP-02'], methodReq: 'Division-wise physical and operational audit of all historical 341 schemes plus post-2013 JJM schemes.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Jal Shakti (PHE) Department, Kashmir', acronym: 'Jal Shakti Kashmir', mandate: 'Design, commissioning, coagulant/chlorine O&M, filter-bed regeneration, reservoir cleaning, and leak-free distribution across all public WSS.', ownership: 'All urban & rural WTPs, clear-water reservoirs, and distribution networks in Kashmir Division', scientificResp: 'Maintaining hourly raw vs filtered NTU, alum dose, residual chlorine, and reservoir cleaning logs.', documentedFindings: 'Historical 2013 CAG audit flagged 341 unfiltered schemes and stalled WTPs; NGT proceedings (e.g., Doodhganga/Mamath) recently scrutinized raw-water contamination.', response: 'Numerous languishing and JJM filtration plants commissioned since 2019; updated scheme-wise operational register invited.', questions: ['How many total WSS operate in Kashmir Division today, and what exact number still lack functional filtration or continuous chlorination?', 'What is the estimated Non-Revenue Water (leakage %) and cross-connection replacement backlog in Srinagar and district towns?'], corrective: 'Eliminate all direct raw surface-water bypasses, install automated turbidity/chlorine loggers, and replace pipes running inside open drains.' },
    ],
    unansweredQuestions: ['How many service reservoirs/overhead tanks across Kashmir Division have documented semi-annual cleaning and disinfection certificates in 2025–2026?'],
    alternatives: [
      { title: 'Multi-Barrier Riverbank Filtration (RBF) + Pressurized District Metered Areas (DMAs)', mechanism: 'Uses natural alluvial gravel riverbank pre-filtration ahead of rapid-sand WTPs to buffer cloudburst turbidity spikes, paired with pressurized leak-free DMAs.', evidencePrecedent: 'Alpine/Himalayan riverbank filtration (Haridwar/Srinagar Garhwal) & CPHEEO DMA standards.', feasibilityNote: 'Cuts coagulant demand by >50% during snowmelt floods and prevents sewage suction into pipes.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish 2013-to-2026 Reconciliation Register for All 341 Historical Unfiltered Schemes', spec: 'Disclose current filtration status, MLD capacity, and outlet NTU/chlorine compliance for every WSS across all 10 Kashmir districts.', target: 'Chief Engineer, Jal Shakti (PHE) Kashmir', justification: 'Provides transparent accountability on post-2013 public infrastructure investments.', indicator: 'Scheme-by-scheme operational WTP register published openly.' },
    ],
    references: [
      { id: 'REF-WTP-01', authorsOrBody: 'Comptroller and Auditor General of India (CAG)', year: 2014, title: 'Report of the Comptroller and Auditor General of India on Social, General and Economic Sectors, Government of Jammu & Kashmir (Ended March 2013 — Rural/Public Water Supply Audit)', publicationOrSeries: 'SAI India Statutory Audit Archive', referenceType: 'Statutory Audit (CAG)', provenanceNote: 'Establishes historical baseline of 341 unfiltered schemes serving ~1.609M people in 7 Kashmir divisions.' },
      { id: 'REF-WTP-02', authorsOrBody: 'Ministry of Jal Shakti — CPHEEO & Jal Jeevan Mission IMIS', year: 2025, title: 'Manual on Water Supply and Treatment & J&K Scheme Infrastructure Dashboard', publicationOrSeries: 'Government of India Technical Standard & IMIS', referenceType: 'Technical Institute Report', externalUrl: 'https://ejalshakti.gov.in/', provenanceNote: 'Engineering design benchmark and contemporary scheme inventory source.' },
    ],
    dataGaps: ['2026 division-wise register of filter-media replacement dates, chemical consumption (alum/chlorine), and non-revenue pipeline leakage rates.'],
    regulatoryLead: 'CPHEEO Manual on Water Supply & Treatment, BIS IS 10500:2012 & Water Act 1974.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0023',
    slug: 'jal-jeevan-mission-actual-household-water-security',
    title: 'Beyond Har Ghar Jal: Household Tap Connectivity versus Safe, Reliable and Sustainable Drinking Water Delivery in Kashmir',
    subtitle: 'Evaluating registered Functional Household Tap Connections (FHTCs) against operational delivery, >=55 LPCD quantity, supply hours, sub-zero winter pipe-freeze resilience, O&M funding, and village-level equity',
    shortTitle: 'Jal Jeevan Mission & Actual Water Security',
    seriesId: 'drinking-water-security',
    seriesTitle: 'Drinking Water Security & Public Supply Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Functionality Audit (Stage 01)',
    temporalScope: '2019–2026',
    heroImage: '/images/publications/chemistry-water-icpms-chromatography.jpg',
    heroImageCaption: 'Distinguishing physical tap installation from year-round >=55 LPCD BIS-compliant household water security.',
    subregion: 'Multi-District Kashmir Basin',
    districts: ALL_10_KASHMIR_DISTRICTS,
    watershedOrBasin: 'Rural & Peri-Urban Panchayats/Villages Across All 10 Kashmir Division Districts',
    elevationRangeM: '1,575–3,100 m ASL',
    coordinates: [33.945, 74.925],
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: ['Gravity Spring/Stream Schemes', 'Tube-Well & Lift Schemes', 'Kandi & Karewa Upland Villages'],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['04-springs-groundwater', '03-rivers-hydrology'],
    disciplineIds: ['environmental-engineering', 'hydrology', 'environmental-data-science', 'ecological-economics', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Drinking Water · Piped Water Supply', route: '/water-systems/drinking-water-sources/piped-water-supply', contributionNote: 'Network coverage and service-level indicators.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0021', 'KEW-INV-0022', 'KEW-INV-0024'],
    relatedSectoralCodes: ['KEW-SR-2026-53'],
    scopeDifferentiation: 'Specifically audits JJM’s four statutory FHTC functionality criteria (working connection, >=55 LPCD quantity, prescribed regularity, BIS IS 10500 quality) plus Himalayan winter freeze-rupture and tail-end Karewa village equity.',
    centralQuestion: 'What gap exists between administrative Har Ghar Jal tap-connection percentages and verified 12-month FHTC functionality (working flow, >=55 LPCD, regular schedule, and BIS IS 10500 potable quality) across valley-floor versus upland Kandi/Karewa villages in Kashmir?',
    scopingQuestions: [
      'What proportion of newly installed standposts/household taps suffer dry-source failure in late summer/autumn (Sep–Nov) or exposed GI-pipe freeze bursts during winter (Dec–Feb)?',
      'How do independent JJM Functionality Assessment surveys and Pani Samiti O&M revenues compare with dashboard certification rates across the 10 Kashmir districts?',
    ],
    executiveKeyFindings: [
      'Official Jal Jeevan Mission operational guidelines define a Functional Household Tap Connection (FHTC) strictly by four concurrent criteria: working tap, adequate quantity (>=55 LPCD), regular schedule, and prescribed BIS IS 10500 water quality — physical plumbing alone does not constitute water security.',
    ],
    chronology: [
      { period: 'Aug 2019–2026', eventTitle: 'Jal Jeevan Mission (Har Ghar Jal) Rollout & Parliamentary Functionality Reviews', documentedRecord: 'Rapid expansion of rural tap connections across J&K accompanied by national JJM Functionality Assessment protocols.', sourceRef: 'REF-JJM-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-JJM-01', name: 'Jal Jeevan Mission Rural Tap Connectivity, Source Sustainability & Pani Samitis', period: '2019–Present', executingAgency: 'Jal Jeevan Mission J&K / Jal Shakti Dept.', interventionType: 'Rural Piped Drinking Water Infrastructure', reportedScaleOrOutlay: 'Central + UT JJM capital allocations', status: 'Ongoing', documentedOutcome: 'High reported physical tap coverage; seasonal source sustainability, winter frost-proofing, and WTP synchronization under independent audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-data-science',
        disciplineName: 'Service-Level & Hydraulic Reliability Auditing',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied: '4-Pillar JJM Functionality Index decomposition stratified by elevation (valley floor vs Karewa/Kandi uplands) and season (summer melt, autumn low-flow, Chilla-i-Kalan freeze).',
        equationOrMetricUsed: 'FHTC_true = I(Working) × I(Q >= 55 LPCD) × I(Regular) × I(BIS_10500)',
        empiricalFinding: 'Evaluating the product of all four binary/continuous criteria reveals tail-end pressure drops and winter frost interruptions masked by aggregate connection counts.',
        uncertaintyAndLimitations: 'Requires stratified household verification across all 10 districts during both autumn low-flow and January freeze windows.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Official Jal Jeevan Mission guidelines and Functionality Assessments explicitly distinguish physical tap connections from fully functional connections delivering >=55 LPCD regularly at prescribed BIS IS 10500 quality.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Established in Ministry of Jal Shakti JJM Operational Guidelines and Parliamentary (Digital Sansad) responses.', citationIds: ['REF-JJM-01'] },
      { suffix: '02', assertion: 'Upland Kandi and Karewa tail-end habitations in Budgam, Pulwama, Shopian, Kupwara, and Baramulla experience >30% seasonal FHTC non-functionality during autumn spring recession and winter pipe freezes.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Reported qualitatively in local grievances; requires statistically representative 10-district household functionality sampling.', citationIds: ['REF-JJM-01'], methodReq: 'Two-season (Oct low-flow & Jan sub-zero) stratified panchayat tap-flow, LPCD, and chlorine audit.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Mission Director, Jal Jeevan Mission J&K & Jal Shakti Dept.', acronym: 'JJM J&K', mandate: 'Ensuring source sustainability, frost-depth trenching, WTP completion prior to distribution commissioning, and verified 4-pillar FHTC functionality.', ownership: 'JJM rural schemes, Pani Samiti handovers, and third-party inspection records', scientificResp: 'Publishing district-wise 4-pillar functionality scores and seasonal tanker-dependency logs.', documentedFindings: 'Rapid distribution pipe laying in several divisions preceded source augmentation or filtration plant completion.', response: 'Har Ghar Jal certifications and third-party inspections conducted; district-wise functionality microdata and tanker dispatch logs invited.', questions: ['How many Har Ghar Jal certified villages in Kashmir Division required emergency water-tanker supply during autumn 2025 or winter 2025–26?', 'What burial-depth/insulation standards are enforced for JJM pipelines above 1,800 m ASL to prevent winter freezing?'], corrective: 'Enforce frost-line pipe burial, pair every FHTC scheme with verified source yield + filtration, and publish seasonal functionality audits.' },
    ],
    unansweredQuestions: ['What percentage of village Pani Samitis in Kashmir Division have trained operators, functional FTK reagent kits, and sustainable O&M tariff/grant accounts?'],
    alternatives: [
      { title: 'Frost-Protected Gravity/Solar Hybrid Micro-Grids + Springshed Recharge', mechanism: 'Pairs frost-depth HDPE mains and tail-end pressure zoning with upstream springshed recharge trenches.', evidencePrecedent: 'Cold-mountain rural water engineering standards.', feasibilityNote: 'Eliminates winter pipe bursts and autumn tanker dependence.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Seasonal Tanker-Dependency & 4-Pillar FHTC Audit Across All 10 Districts', spec: 'Disclose village-level LPCD, supply hours, winter freeze outages, and WQMIS pass rates alongside connection counts.', target: 'JJM J&K & District Water and Sanitation Missions', justification: 'Aligns public reporting with JJM’s own statutory definition of functionality.', indicator: 'Zero tanker-dependent villages classified as 100% functional without seasonal caveat.' },
    ],
    references: [
      { id: 'REF-JJM-01', authorsOrBody: 'Ministry of Jal Shakti & Parliament of India (Digital Sansad)', year: 2024, title: 'Jal Jeevan Mission Operational Guidelines & Functionality Assessment of Household Tap Connections', publicationOrSeries: 'Government of India / sansad.in & ejalshakti.gov.in', referenceType: 'Technical Institute Report', externalUrl: 'https://sansad.in/', provenanceNote: 'Defines the four mandatory FHTC functionality pillars (working tap, >=55 LPCD, regularity, BIS quality).' },
    ],
    dataGaps: ['Village-level winter outage durations, water-tanker dispatch logs (2023–2026), and independent household LPCD measurements.'],
    regulatoryLead: 'Jal Jeevan Mission Operational Guidelines, BIS IS 10500:2012 & 73rd Constitutional Amendment Panchayat Water Governance.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0024',
    slug: 'kashmir-declining-springs-groundwater-drinking-vulnerability',
    title: "Kashmir's Disappearing Springs: Groundwater Depletion, Contamination, Land-Use Change and Rural Drinking Water Vulnerability",
    subtitle: 'Establishing a georeferenced inventory of drinking-water springs (Nags), CGWB observation wells, Maillet recession rates, septic/nitrate contamination, and Karewa/karst recharge disruption',
    shortTitle: 'Declining Springs & Groundwater Security',
    seriesId: 'drinking-water-security',
    seriesTitle: 'Drinking Water Security & Public Supply Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Hydrogeological Charter (Stage 01)',
    temporalScope: '1980–2026',
    heroImage: '/images/water-module/springs.jpg',
    heroImageCaption: 'Karst and alluvial freshwater springs (Nags) of Kashmir — auditing discharge decline, recharge-zone disturbance, and rural drinking-water vulnerability.',
    subregion: 'Multi-District Kashmir Basin',
    districts: ALL_10_KASHMIR_DISTRICTS,
    watershedOrBasin: 'Anantnag Karst Belt (Verinag, Kokernag, Achabal, Martand), Karewa Seepage Springs & CGWB Valley Aquifers',
    elevationRangeM: '1,580–2,800 m ASL',
    coordinates: [33.645, 75.245],
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: ['Triassic Limestone Karst Conduits', 'Karewa Perched Aquifers', 'Alluvial Fan Springs', 'Rural Drinking Intakes'],
    primaryDomainId: '04-springs-groundwater',
    secondaryDomainIds: ['10-mining-quarrying', '13-agriculture-horticulture', '15-solid-waste-sewage'],
    disciplineIds: ['hydrogeology', 'hydrology', 'geochemistry', 'environmental-microbiology', 'gis', 'remote-sensing'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Springs Directory', route: '/water-systems/springs', contributionNote: '100-spring hydrogeological baseline.' },
      { moduleName: 'Drinking Water · Groundwater Intelligence', route: '/water-systems/drinking-water-sources/groundwater', contributionNote: 'CGWB aquifer & tube-well monitoring.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0021', 'KEW-INV-0023', 'KEW-INV-0025'],
    relatedSectoralCodes: ['KEW-SR-2026-02', 'KEW-SR-2026-23', 'KEW-SR-2026-30'],
    scopeDifferentiation: 'Complements physical hydrogeology dossier KEW-SR-2026-23 by linking spring discharge recession, unlined soak-pit/septic nitrate-coliform contamination, Karewa clay mining, and borewell proliferation directly to rural household drinking-water vulnerability.',
    centralQuestion: 'How rapidly are Kashmir’s karst, alluvial, and Karewa springs losing late-autumn baseflow or acquiring septic/agrochemical contamination, and which rural drinking-water schemes face acute source failure?',
    scopingQuestions: [
      'How have post-snowmelt Maillet recession coefficients (α) and October–November minimum discharges shifted across Anantnag, Kulgam, Pulwama, Budgam, and Kupwara drinking-water springs?',
      'Where do unlined domestic soak-pits, limestone quarrying, tunnel excavation, and high-density orchard borewells intersect fast-flow karst and Karewa recharge zones?',
    ],
    executiveKeyFindings: [
      'Peer-reviewed isotope and hydrogeochemical studies in Kashmir (Jeelani et al., 2010, 2017; Bhat et al.) document high vulnerability of Triassic limestone karst springs to rapid snowmelt recession and surface microbial/nitrate ingress due to conduit flow.',
    ],
    chronology: [
      { period: '2010–2025', eventTitle: 'Isotopic Karst Spring Studies, NITI Aayog Himalayan Springshed Initiative & Autumn Dry-Ups', documentedRecord: 'Hydrogeological studies and autumn low-flow episodes highlighted declining spring yields and rising borewell drilling across South and Central Kashmir.', sourceRef: 'REF-SPR-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-SPR-01', name: 'CGWB Observation Wells, Springshed Inventory & Rural Spring Intake Schemes', period: '2000–Present', executingAgency: 'CGWB (NWHR), Jal Shakti Dept. & I&FC', interventionType: 'Groundwater & Spring Monitoring / Supply', reportedScaleOrOutlay: 'National Aquifer Mapping (NAQUIM) & JJM source works', status: 'Ongoing', documentedOutcome: 'NAQUIM aquifer maps prepared; statutory recharge-zone protection and septic-setback enforcement around springs remain absent.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'hydrogeology',
        disciplineName: 'Karst & Alluvial Hydrogeology',
        clusterName: 'Water & Aquatic Sciences',
        methodologyApplied: 'Maillet hydrograph recession Q(t) = Q_0 e^(-αt), δ¹⁸O/δ²H recharge elevation tracing, and CGWB piezometric trend analysis.',
        equationOrMetricUsed: 'Q(t) = Q_0 · e^(-αt);  Dynamic Storage V_dyn = Q_0 / α',
        empiricalFinding: 'High conduit recession α in fractured Triassic limestone means winter snowpack deficits translate into sharp autumn discharge drops at Kokernag, Achabal, and Verinag.',
        uncertaintyAndLimitations: 'Hundreds of village-level Nags lack continuous V-notch weir discharge gauges.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Isotopic and hydrograph investigations confirm that major South Kashmir karst springs depend heavily on winter snowpack recharge and exhibit rapid conduit transport vulnerable to surface contamination.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established by Jeelani et al. (2010, 2017) peer-reviewed hydrogeological studies in the Kashmir Valley.', citationIds: ['REF-SPR-01'] },
      { suffix: '02', assertion: 'Unregulated private orchard/domestic borewells and Karewa excavation have lowered perched water tables enough to permanently dry >200 traditional village Nags across Pulwama, Shopian, and Budgam.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Widely reported by communities; requires systematic 10-district spring census reconciled against CGWB piezometer records.', citationIds: ['REF-SPR-02'], methodReq: 'District-by-district georeferenced spring census (perennial vs seasonal vs dried) paired with CGWB piezometric water-level trends.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Central Ground Water Board (NWHR), Jal Shakti Dept. & J&K Water Resources Regulatory Authority', acronym: 'CGWB / Jal Shakti / JKWRRA', mandate: 'Aquifer mapping, borewell licensing/regulation, and protection of public drinking-water spring recharge zones.', ownership: 'CGWB piezometer network & spring-fed public water supply schemes', scientificResp: 'Publishing seasonal spring discharge and nitrate/bacteriological vulnerability maps.', documentedFindings: 'NITI Aayog Himalayan springshed reports note severe data and governance gaps in mountain spring protection compared with river basins.', response: 'NAQUIM reports and spring census exercises initiated; georeferenced Kashmir spring database invited.', questions: ['How many public drinking-water schemes in Kashmir Division rely primarily on springs or borewells, and how many experienced >40% autumn yield decline in 2024–2025?', 'What licensing controls govern deep commercial/agricultural borewell drilling on Karewa plateaus?'], corrective: 'Notify Springshed Protection Zones prohibiting soak-pits, quarries, and unlicensed deep borewells in delineated recharge areas.' },
    ],
    unansweredQuestions: ['Which rural settlements in Kashmir have zero alternative surface-water backup if their local karst or Karewa spring fails or turns bacteriologically unsafe?'],
    alternatives: [
      { title: 'Isotope-Guided Springshed Recharge Sanctuary & Sealed Decentralised Sanitation', mechanism: 'Delineates exact recharge altitudes via δ¹⁸O/geology, constructs contour recharge trenches, and replaces unlined soak-pits upslope of springs with sealed bio-digesters.', evidencePrecedent: 'Dhara Vikas (Sikkim) & PSI Himalayan hydrogeological springshed revival.', feasibilityNote: 'Restores dry-season spring baseflow at low cost.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Build Open Georeferenced Inventory of Drinking-Water Springs & Instrument 50 Sentinel Nags', spec: 'Map all drinking-water springs across 10 districts with seasonal discharge (L/s), EC, NO₃⁻, and E. coli logs.', target: 'Jal Shakti Dept., CGWB, DEERS & KU Earth Sciences', justification: 'Protects decentralized freshwater lifelines across rural Kashmir.', indicator: '50 instrumented sentinel springs + statutory Springshed Protection Guidelines notified.' },
    ],
    references: [
      { id: 'REF-SPR-01', authorsOrBody: 'Jeelani, G., Bhat, N. A., Shivanna, K., & Bhat, M. Y.', year: 2010, title: 'Geochemical characterization and isotopic recharge of karst springs in Kashmir Himalaya, India', publicationOrSeries: 'Journal of Hydrology / Hydrogeology Journal Series', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Foundational hydrogeological and isotopic characterization of Kashmir karst springs.' },
      { id: 'REF-SPR-02', authorsOrBody: 'Central Ground Water Board (CGWB) & NITI Aayog', year: 2023, title: 'Ground Water Year Book (J&K) & Inventory and Revival of Springs in the Himalayas for Water Security', publicationOrSeries: 'Ministry of Jal Shakti / NITI Aayog, Govt. of India', referenceType: 'Technical Institute Report', provenanceNote: 'Provides official observation-well levels and Himalayan springshed governance framework.' },
    ],
    dataGaps: ['Unified 10-district georeferenced database of perennial vs dried village springs and private borewell extraction volumes.'],
    regulatoryLead: 'J&K Water Resources (Regulation and Management) Act, 2010 & CGWB Groundwater Extraction Guidelines.',
  }),

  makeCharterRecord({
    code: 'KEW-INV-0025',
    slug: 'catchment-pollution-source-to-tap-health-risks',
    title: 'Contaminated Catchments and Vulnerable Communities: Source-to-Tap Pollution Pathways and Drinking Water Health Risks in Kashmir',
    subtitle: 'GIS watershed delineation and Quantitative Microbial/Chemical Risk Assessment (QMRA) linking raw-water intakes to upstream sewage outfalls, municipal waste dumps, riverbed mining, and agrochemicals',
    shortTitle: 'Catchment Pollution & Drinking Water Health Risks',
    seriesId: 'drinking-water-security',
    seriesTitle: 'Drinking Water Security & Public Supply Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Source-to-Tap Risk Charter (Stage 01)',
    temporalScope: '2010–2026',
    heroImage: '/images/publications/hydrology_jhelum_adcp_discharge_1795638881367.jpg',
    heroImageCaption: 'Mapping hydrological pollution pathways between upstream waste/mining/agrochemical discharges and downstream drinking-water abstraction intakes.',
    subregion: 'Multi-District Kashmir Basin',
    districts: ALL_10_KASHMIR_DISTRICTS,
    watershedOrBasin: 'Doodhganga, Sukhnag, Sind, Lidder, Vishow, Rambiara, Pohru, Ningli & Jhelum Drinking-Water Sub-Catchments',
    elevationRangeM: '1,575–3,500 m ASL',
    coordinates: [33.985, 74.785],
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: ['Mountain Stream Intakes', 'Riparian Waste Sites', 'Orchard Drainage Channels', 'Downstream Supplied Towns & Villages'],
    primaryDomainId: '03-rivers-hydrology',
    secondaryDomainIds: ['15-solid-waste-sewage', '13-agriculture-horticulture', '10-mining-quarrying'],
    disciplineIds: ['hydrology', 'environmental-epidemiology', 'environmental-microbiology', 'ecotoxicology', 'gis', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Drinking Water Sources', route: '/water-systems/drinking-water-sources', contributionNote: 'Raw-water abstraction source profiles.' },
      { moduleName: 'Environmental Monitoring · Health Signals', route: '/environmental-monitoring/environmental-health', contributionNote: 'District environmental health indicators.' },
      { moduleName: 'Environmental PIL Portal', route: '/resources/environmental-pil', contributionNote: 'NGT Doodhganga, Sukhnag & tributary pollution dockets.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0021', 'KEW-INV-0022', 'KEW-INV-0024'],
    relatedSectoralCodes: ['KEW-SR-2026-02', 'KEW-SR-2026-26', 'KEW-SR-2026-37', 'KEW-SR-2026-38'],
    scopeDifferentiation: 'Synthesizes spatial upstream-of-intake hazard mapping (DEM watershed delineation above every Jal Shakti intake) with NGT tributary pollution dockets and IDSP waterborne disease surveillance.',
    centralQuestion: 'Which public drinking-water intakes in Kashmir Division abstract raw water immediately downstream of untreated municipal drains, riverside solid-waste dumps, heavy riverbed mining, or intensive orchard pesticide zones, and how do flood/turbidity pulses translate into community enteric and chemical exposure?',
    scopingQuestions: [
      'How many Jal Shakti raw-water intakes across Doodhganga, Sukhnag, Sind, Lidder, Rambiara, Vishow, and Pohru lie within <5 km downstream of unlined municipal waste sites, untreated drains, or active boulder/sand mining reaches?',
      'Do seasonal spikes in acute diarrhoeal disease, hepatitis A/E, and enteric fever in IDSP district surveillance correlate with snowmelt/rainstorm turbidity events in exposed intake catchments?',
    ],
    executiveKeyFindings: [
      'National Green Tribunal (NGT) orders on Doodhganga, Mamath, and Sukhnag have repeatedly documented municipal solid waste dumping, untreated sewage discharge, and illegal riverbed mining directly affecting streams used for downstream drinking-water supply.',
    ],
    chronology: [
      { period: '2021–2026', eventTitle: 'NGT Tributary Pollution Orders (Doodhganga, Sukhnag & Allied Streams)', documentedRecord: 'NGT imposed environmental compensation on municipal/departmental bodies for untreated waste/sewage entering drinking-water streams and riverbed mining damage.', sourceRef: 'REF-CAT-01', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-CAT-01', name: 'NGT-Directed Tributary Remediation, Legacy Waste Clearance & Mining Restrictions', period: '2021–Present', executingAgency: 'ULBs / SMC / JKPCC / Geology & Mining / Jal Shakti', interventionType: 'Drinking-Water Catchment Pollution Control', reportedScaleOrOutlay: 'NGT environmental compensation & AMRUT/SBM allocations', status: 'Ongoing', documentedOutcome: 'Partial riverbank waste removal; comprehensive 10-district intake-catchment sanitary protection zones still absent.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-epidemiology',
        disciplineName: 'GIS Watershed Sanitary Inspection & QMRA',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: '30 m Copernicus DEM upstream catchment delineation above each WSS intake + exponential/Beta-Poisson Quantitative Microbial Risk Assessment (QMRA).',
        equationOrMetricUsed: 'P_inf = 1 - [1 + d / N_50 (2^(1/α) - 1)]^(-α)',
        empiricalFinding: ' Riverbed gravel mining removes natural hyporheic biofiltration while resuspending fine silt that overwhelms downstream WTP chlorination during storms.',
        uncertaintyAndLimitations: 'Requires exact GPS coordinates of Jal Shakti intakes and sub-district IDSP weekly waterborne morbidity time series.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'National Green Tribunal proceedings have documented untreated municipal sewage, solid-waste dumping, and unregulated riverbed mining along Kashmir tributaries (including Doodhganga and Sukhnag) that serve downstream public water-supply intakes.', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Established in NGT Principal Bench orders and JKPCC Joint Committee compliance reports.', citationIds: ['REF-CAT-01'] },
      { suffix: '02', assertion: 'Communities served by surface intakes without riverbank filtration downstream of intensive orchard and urban drains experience statistically elevated hepatitis A/E and acute gastroenteritis incidence during April–August runoff peaks.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Epidemiologically plausible source-to-tap pathway requiring spatial linkage of WSS service zones with IDSP clinical surveillance records.', citationIds: ['REF-CAT-01', 'REF-CAT-02'], methodReq: 'Spatial overlay of WSS supply boundaries with block-level IDSP waterborne disease surveillance and raw-intake E. coli/turbidity series.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Jal Shakti Dept., JKPCC, Directorate of Urban Local Bodies, Geology & Mining & Health Dept.', acronym: 'Jal Shakti / JKPCC / ULBs / Mining', mandate: 'Protecting raw drinking-water abstraction reaches from sewage, waste leachate, and riverbed mining within statutory upstream sanitary buffers.', ownership: 'Raw-water intakes, municipal STPs/waste sites, minor-mineral blocks, and IDSP surveillance', scientificResp: 'Joint sanitary-survey risk scoring of every raw-water intake catchment and outbreak root-cause reporting.', documentedFindings: 'NGT imposed environmental compensation penalties for persistent pollution of Doodhganga/Sukhnag drinking-water streams.', response: 'Joint committee action plans submitted to NGT; 10-district intake GPS & upstream hazard buffer map invited.', questions: ['Are minor-mineral riverbed mining leases legally prohibited within a mandatory upstream/downstream hydraulic buffer of all Jal Shakti drinking-water intakes?', 'Which WSS intakes have active WHO-style Sanitary Inspection Risk Scores?'], corrective: 'Notify statutory Drinking Water Source Protection Zones (prohibiting waste dumps, sewage outfalls, and riverbed mining upstream of intakes).' },
    ],
    unansweredQuestions: ['How many Jal Shakti surface intakes across Kashmir lack upstream sanitary protection buffers or automatic high-turbidity/ammonia intake shutoff alarms?'],
    alternatives: [
      { title: 'Statutory Drinking-Water Source Protection Zones + Sub-Surface Infiltration Galleries', mechanism: 'Bans riverbed mining, waste dumping, and raw outfalls 5 km upstream of intakes while converting open-channel intakes into sub-bed infiltration galleries.', evidencePrecedent: 'WHO Water Safety Plan catchment barriers & European Drinking Water Protection Zones.', feasibilityNote: 'Prevents raw-source contamination spikes before water reaches the treatment plant.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish 10-District GIS Spatial Risk Inventory of All Raw-Water Intakes vs Upstream Pollution Sources', spec: 'Delineate upstream watersheds for all public intakes and flag intersections with sewage drains, waste dumps, quarries, and mining blocks.', target: 'Jal Shakti, JKPCC, DEERS & Dept. of Geology and Mining', justification: 'Protects public health at the point of abstraction.', indicator: '100% of surface WSS intakes assigned verified upstream sanitary risk classifications.' },
    ],
    references: [
      { id: 'REF-CAT-01', authorsOrBody: 'National Green Tribunal (NGT) Principal Bench & JKPCC Joint Committees', year: 2024, title: 'Orders & Compliance Reports on Pollution and Illegal Mining in Doodhganga, Sukhnag and Allied Kashmir Tributaries', publicationOrSeries: 'greentribunal.gov.in Statutory Judicial Record', referenceType: 'Judicial Order / NGT', externalUrl: 'https://www.greentribunal.gov.in/', provenanceNote: 'Documents upstream municipal sewage, waste, and riverbed mining affecting drinking-water streams.' },
      { id: 'REF-CAT-02', authorsOrBody: 'World Health Organization (WHO) & Integrated Disease Surveillance Programme (IDSP)', year: 2022, title: 'Guidelines for Drinking-Water Quality (4th ed.) — Quantitative Microbial Risk Assessment & Sanitary Inspection Frameworks', publicationOrSeries: 'World Health Organization, Geneva', referenceType: 'Technical Institute Report', provenanceNote: 'International scientific methodology for source-to-tap microbial and chemical health-risk assessment.' },
    ],
    dataGaps: ['Georeferenced WSS raw-intake coordinates paired with block-level IDSP waterborne disease surveillance (2018–2026).'],
    regulatoryLead: 'Water (Prevention and Control of Pollution) Act 1974, Solid Waste Management Rules 2016, NGT Directives & BIS IS 10500:2012.',
  }),
];
