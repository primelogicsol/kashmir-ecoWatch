// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI HIGH-PRIORITY INVESTIGATION EXPANSION — PART II (13 INVESTIGATIONS)
// KEW-INV-0026 .. KEW-INV-0038 across Thematic Series V & VI:
//   5. Kashmir Transportation, Air Pollution & Noise Pollution (KEW-INV-0026 .. 0037)
//   6. Security Force Transportation & Statutory Pollution Compliance (KEW-INV-0038)
// Scientific Governance:
//   - Distinguishes UT-wide cumulative registrations (~2.66M) from active Kashmir fleet.
//   - Preserves historical 2013–2017 Srinagar PM10 (2.0–3.2x) & PM2.5 (1.7–2.8x) baseline
//     as historical reference, never conflated with November 2026 live readings.
//   - Uses energy-logarithmic LAeq integration (never arithmetic decibel averaging).
//   - Security Force study (KEW-INV-0038) evaluates strictly aggregate environmental
//     footprint & statutory exemptions (zero sensitive deployments, routes, or identities).
// ─────────────────────────────────────────────────────────────────────────────

import {
  CitationReference,
  DisciplineFinding,
  EvidenceVerificationClass,
  InvestigationDomainId,
  InvestigationPriority,
  InvestigationRecord,
  InvestigationSeriesId,
  InvestigationStatus,
  StatutoryComplianceAssessmentRow,
} from '@/types/environmental-investigations';

const ALL_10_KASHMIR_DISTRICTS = [
  'Srinagar',
  'Ganderbal',
  'Baramulla',
  'Anantnag',
  'Pulwama',
  'Budgam',
  'Bandipora',
  'Kupwara',
  'Kulgam',
  'Shopian',
];

interface TransportCharterSpec {
  code: string;
  slug: string;
  title: string;
  subtitle: string;
  shortTitle: string;
  seriesId: InvestigationSeriesId;
  seriesTitle: string;
  priority: InvestigationPriority;
  status: InvestigationStatus;
  statusLabel: string;
  temporalScope: string;
  heroImage: string;
  heroImageCaption: string;
  districts: string[];
  corridorFocus: string;
  coordinates: [number, number];
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
  regulatoryLead: string;
  statutoryComplianceMatrix?: StatutoryComplianceAssessmentRow[];
}

function makeTransportCharter(s: TransportCharterSpec): InvestigationRecord {
  return {
    code: s.code,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle,
    shortTitle: s.shortTitle,
    seriesId: s.seriesId,
    seriesTitle: s.seriesTitle,
    priority: s.priority,
    centralScientificQuestion: s.centralQuestion,
    statutoryComplianceMatrix: s.statutoryComplianceMatrix,
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
    subregion: 'Multi-District Kashmir Basin',
    districts: s.districts,
    watershedOrBasin: s.corridorFocus,
    elevationRangeM: '1,575–3,528 m ASL (Valley Floor to Mountain Corridors)',
    coordinates: s.coordinates,
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: [
      'Valley Bowl Atmospheric Mixing Layer',
      'Urban Sensitive Receptors (Hospitals & Schools)',
      'Riparian/Wetland & Protected Wildlife Corridors',
      'Pir Panjal & Greater Himalayan Snowpack Albedo Zones',
    ],
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
      financialResponsibility: 'Public mobility, NCAP/PRANA, highway, and regulatory enforcement budgets',
      environmentalAuthorisation: s.regulatoryLead,
      monitoringObligations: 'Continuous/periodic ambient air, acoustic, traffic, and PUC compliance disclosure',
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
        summary: `Registered under ${s.seriesTitle} following cross-portfolio duplication check against 101 sectoral dossiers and KEW-EIAI registry.`,
        verifiedBy: 'KEW-EIAI Atmospheric, Acoustic & Mobility Desk',
      },
    ],
    dataGaps: s.dataGaps,
    sections: [
      {
        sectionNumber: '01',
        key: 'executive-summary',
        title: 'Executive Summary & Scoping Mandate',
        applicable: true,
        leadSummary: s.subtitle,
        bodyParagraphs: [
          `Central Scientific Question: ${s.centralQuestion}`,
          'Maintained as an active scoping / proposed scientific charter under KEW-EIAI governance. Distinguishes measured observations, historical baselines, statutory exemptions, and unverified hypotheses without fabricating fleet, emission, or decibel readings.',
        ],
        quantitativeCallouts: s.callouts,
      },
      {
        sectionNumber: '02',
        key: 'investigation-background',
        title: 'Investigation Background',
        applicable: true,
        leadSummary: s.scopeDifferentiation,
        bodyParagraphs: [
          'Evaluates transportation, atmospheric inversions, industrial/domestic sources, and acoustic exposure as an interconnected valley-basin system rather than presuming a single dominant source across all seasons.',
        ],
      },
      {
        sectionNumber: '03',
        key: 'geographic-context',
        title: 'Geographic Coverage (10 Kashmir Districts)',
        applicable: true,
        leadSummary: s.corridorFocus,
        bodyParagraphs: [
          'Covers proposed sampling corridors across Srinagar (Lal Chowk, Pantha Chowk, Parimpora, Nowgam), Ganderbal (Sonamarg corridor), Baramulla (Sopore, Pattan, Gulmarg corridor), Anantnag (Bijbehara, Pahalgam corridor), Pulwama (Pampore industrial/highway belt), Budgam (Airport & brick-kiln belt), Bandipora, Kupwara (Handwara), Kulgam, and Shopian (horticultural freight & Mughal Road) — treated strictly as candidate sampling sites until field-verified.',
        ],
      },
      {
        sectionNumber: '04',
        key: 'historical-chronology',
        title: 'Historical Chronology (1990–2026)',
        applicable: true,
        leadSummary: 'Separates historical baselines (e.g., 2013–2017 particulate studies) and cumulative vehicle registrations from contemporary 2026 conditions.',
        bodyParagraphs: ['Chronological milestones anchor regulatory transitions (BS-IV, BS-VI, Noise Rules 2000, NCAP, G.S.R. 991(E) Nov 2026 PUC amendments).'],
      },
      {
        sectionNumber: '05',
        key: 'environmental-baseline',
        title: 'Environmental & Regulatory Baseline',
        applicable: true,
        leadSummary: s.executiveKeyFindings[0] || s.subtitle,
        bodyParagraphs: ['Compares verified measurements against enforceable Indian NAAQS / Noise Pollution Rules 2000 while referencing WHO guidelines strictly as health benchmarks.'],
      },
      {
        sectionNumber: '07',
        key: 'scientific-disciplines',
        title: 'Scientific Disciplines & Governing Equations',
        applicable: true,
        leadSummary: 'Applies COPERT/ARAI fleet emission factors E_p = Σ N_i D_i EF_{i,p}, Positive Matrix Factorization (PMF), ERA5 boundary-layer physics, and logarithmic acoustic integration LAeq,T.',
        bodyParagraphs: ['Explicitly prohibits scientifically invalid practices such as arithmetic averaging of decibel readings or substituting uncalibrated satellite columns for ground roadside monitoring.'],
      },
      {
        sectionNumber: '09',
        key: 'satellite-gis-evidence',
        title: 'Satellite, GIS Network & Ground-Validation Protocol',
        applicable: true,
        leadSummary: 'Couples Sentinel-5P TROPOMI, MODIS/VIIRS MAIAC AOD, ERA5 mixing height, and OpenStreetMap road networks with mandatory ground-station validation.',
        bodyParagraphs: ['Satellite trace-gas and aerosol retrievals cannot replace calibrated CPCB/JKPCC ground CAAQMS or Class-1 sound-level meters.'],
      },
      {
        sectionNumber: '10',
        key: 'hydrological-analysis',
        title: 'Hydrological Analysis',
        applicable: s.code === 'KEW-INV-0036' || s.code === 'KEW-INV-0038',
        nonApplicableReason:
          s.code === 'KEW-INV-0036' || s.code === 'KEW-INV-0038'
            ? undefined
            : 'Dynamically omitted for atmospheric, fleet, and acoustic investigations (see Section 07–09 Atmospheric & Acoustic Physics).',
        leadSummary: 'Evaluates highway embankment wetland severance and black-carbon snow-albedo meltwater forcing where applicable.',
        bodyParagraphs:
          s.code === 'KEW-INV-0036' || s.code === 'KEW-INV-0038'
            ? ['Examines road-culvert floodplain obstruction and cryospheric black-carbon deposition pathways.']
            : [],
      },
      {
        sectionNumber: '16',
        key: 'institutional-accountability',
        title: 'Institutional Accountability',
        applicable: true,
        leadSummary: s.accountability.map((a) => `${a.institution} (${a.acronym})`).join('; '),
        bodyParagraphs: ['Separates statutory exemption, verified compliance, regulatory ambiguity, and unverified monitoring gaps without inferring noncompliance from missing public records.'],
      },
      {
        sectionNumber: '17',
        key: 'regulatory-analysis',
        title: 'Regulatory & Statutory Analysis',
        applicable: true,
        leadSummary: s.regulatoryLead,
        bodyParagraphs: ['Evaluates statutory instruments, Bharat Stage notifications, PUC mandates, and ambient air/noise rules.'],
      },
      {
        sectionNumber: '18',
        key: 'scientific-evidence-matrix',
        title: 'Scientific Evidence Matrix',
        applicable: true,
        leadSummary: 'Claim-by-claim verification separating Documented baselines from Unverified field/model hypotheses.',
        bodyParagraphs: ['Inspect the Evidence Matrix below.'],
      },
      {
        sectionNumber: '19',
        key: 'unanswered-questions',
        title: 'Unanswered Questions & Data Acquisition Queue',
        applicable: true,
        leadSummary: 'Primary institutional datasets required from VAHAN, RTOs, JKPCC, CPCB PRANA, SMC, Traffic Police, and Health/SKIMS.',
        bodyParagraphs: ['Official datasets and clarifications may be submitted via /environmental-investigations/submit.'],
      },
      {
        sectionNumber: '20',
        key: 'alternative-solutions',
        title: 'Alternative Solutions & Sustainable Mobility Pathways',
        applicable: true,
        leadSummary: s.alternatives[0]?.title || 'Evidence-based emission, transit, and acoustic mitigation.',
        bodyParagraphs: ['Tests whether public transit, dust suppression, and clean heating outperform road-widening and flyover expansion.'],
      },
      {
        sectionNumber: '21',
        key: 'recommendations',
        title: 'Phased Recommendations',
        applicable: true,
        leadSummary: 'Immediate, medium-term, and long-term actions with measurable verification indicators.',
        bodyParagraphs: ['Tracked in the KEW-EIAI Recommendations Tracker.'],
      },
      {
        sectionNumber: '23',
        key: 'references-datasets',
        title: 'References & Primary Data Repositories',
        applicable: true,
        leadSummary: 'Traceable statutory notifications, peer-reviewed atmospheric studies, and national portals (VAHAN, CPCB, PRANA, PIB, IndiaCode).',
        bodyParagraphs: ['All Documented assertions link to verified reference IDs below.'],
      },
    ],
  };
}

export const TRANSPORT_13_INVESTIGATION_DOSSIERS: InvestigationRecord[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SERIES 5: TRANSPORTATION, AIR & NOISE POLLUTION (12: KEW-INV-0026..0037)
  // ═══════════════════════════════════════════════════════════════════════════
  makeTransportCharter({
    code: 'KEW-INV-0026',
    slug: 'kashmir-transportation-growth-carrying-capacity',
    title: "Kashmir's Transportation Crisis: Vehicular Growth, Infrastructure Capacity and Environmental Sustainability, 1990–2026",
    subtitle: 'Distinguishing ~2.66M UT-wide cumulative registrations from active Kashmir Division fleet, auditing 1990–2026 district vehicle growth, road V/C ratios, freight/tourist surges, and induced private-vehicle dependency',
    shortTitle: 'Transportation Growth & Carrying Capacity',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Critical Scoping · VAHAN & Corridor Capacity Audit',
    temporalScope: '1990–2026',
    heroImage: '/images/env-monitoring/kashmir-transport-hero.jpg',
    heroImageCaption: 'Auditing 1990–2026 motorization growth against road Volume-to-Capacity (V/C) thresholds and valley carrying capacity.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'All 10 Kashmir Division RTOs (JK01, JK03, JK04, JK05, JK09, JK13, JK15, JK16, JK18, JK22) & Major Urban/Mountain Corridors',
    coordinates: [34.072, 74.808],
    primaryDomainId: '07-infrastructure-development',
    secondaryDomainIds: ['16-atmospheric-environment', '11-urbanisation-land-use', '12-tourism-pilgrimage'],
    disciplineIds: ['gis', 'spatial-statistics', 'atmospheric-science', 'ecological-economics', 'environmental-impact-assessment'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Transportation Pollution', route: '/environmental-monitoring/transportation-pollution', contributionNote: 'District fleet, VKT, and TPBS indicators.' },
      { moduleName: 'Sectoral EIA Engine', route: '/sectoral-eia', contributionNote: 'Cross-sector infrastructure & tourism carrying capacity.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0027', 'KEW-INV-0033', 'KEW-INV-0034', 'KEW-INV-0036', 'KEW-INV-0038'],
    relatedSectoralCodes: ['KEW-SR-2026-36'],
    scopeDifferentiation: 'Expands beyond seasonal tourist mobility (KEW-SR-2026-36) to audit 36-year district-wise private, commercial, freight, and public fleet trajectories, active-vs-deregistered survival curves, and road Volume-to-Capacity (V/C) saturation.',
    centralQuestion: 'How has the active on-road vehicle fleet in Kashmir Division (distinct from cumulative UT-wide registrations) evolved relative to road network capacity, public transit supply, and atmospheric carrying capacity between 1990 and 2026?',
    scopingQuestions: [
      'Of the ~2.66 million cumulative vehicles reported across Jammu & Kashmir UT in Transport Department records, what exact active on-road fleet operates daily inside the 10 Kashmir Division districts after accounting for scrappage, age survival, and inter-divisional split?',
      'Have flyover construction and road-widening projects in Srinagar reduced corridor Volume-to-Capacity (V/C) ratios over a 5-year horizon, or triggered Braess/Downs–Thomson induced private car and two-wheeler demand?',
    ],
    executiveKeyFindings: [
      'Public reporting citing J&K Transport Department / VAHAN records places cumulative UT-wide vehicle registrations near ~2.66 million; KEW-EIAI strictly separates UT-wide cumulative registrations from the active in-use fleet within Kashmir Division.',
    ],
    callouts: [
      { label: 'J&K UT Cumulative Reg.', value: '~2.66M', unit: 'UT-Wide Cumulative', sourceTag: 'Transport Dept. / Down To Earth' },
      { label: 'Kashmir Active Fleet', value: 'Audit Target', unit: '10 RTO Survival Curve', sourceTag: 'VAHAN Disaggregation Queue' },
      { label: 'District Coverage', value: '10 Districts', unit: '1990–2026 Series', sourceTag: 'KEW Mobility Scope' },
    ],
    chronology: [
      { period: '1990–2026', eventTitle: 'Rapid Private Car & Two-Wheeler Motorization Across Kashmir RTOs', documentedRecord: 'Multi-fold expansion in personal vehicles outpaced high-capacity public transit investment across Srinagar and district towns.', sourceRef: 'REF-TRN-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-TRN-01', name: 'Urban Flyovers, Junction Widening & Smart City Mobility Corridors', period: '2013–2026', executingAgency: 'R&B (PW) Dept., ERA, SSCL & NHAI', interventionType: 'Road Capacity & Urban Mobility Works', reportedScaleOrOutlay: 'ADB/ERA, Smart City & UT Capex', status: 'Ongoing', documentedOutcome: 'Localized grade separation achieved; basin-wide V/C congestion and modal-share outcomes under longitudinal audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'spatial-statistics',
        disciplineName: 'Transportation Engineering & Network Capacity',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied: 'BPR travel-time delay T = T_0 [1 + α (V/C)^β] + Weibull vehicle-age survival fleet disaggregation.',
        equationOrMetricUsed: 'N_active,d = Σ_y Reg_{d,y} · S(2026 - y);  V/C = Flow_PCU / Capacity_PCU',
        empiricalFinding: 'Cumulative registration totals overestimate active older cohorts unless adjusted by PUC/fitness/insurance renewal survival rates.',
        uncertaintyAndLimitations: 'Requires RTO-wise (JK01..JK22) VAHAN age-fuel-class tables and peak-hour PCU traffic counts.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Reported J&K vehicle registration figures (~2.66 million) represent cumulative UT-wide registrations across both Jammu and Kashmir divisions rather than the active daily operating fleet in Kashmir Division alone.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Verified against VAHAN accounting structure and Transport Department disclosures cited in national environmental reporting.', citationIds: ['REF-TRN-01', 'REF-TRN-02'] },
      { suffix: '02', assertion: 'Grade-separated flyovers in Srinagar (Jehangir Chowk–Rambagh, Bemina/Sanat Nagar NH-44) induced net private-vehicle VKT growth exceeding congestion-relief fuel savings within 36 months of opening.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Classic induced-demand hypothesis requiring pre/post screenline PCU counts on parallel and feeder arterials.', citationIds: ['REF-TRN-01'], methodReq: 'Compare pre-construction vs 2026 peak-hour PCU screenline counts and travel speeds across Rambagh–Lal Chowk and NH-44 bypass corridors.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Motor Vehicles Dept. (MVD), Traffic Police, R&B & Srinagar Smart City Ltd.', acronym: 'MVD / Traffic / R&B / SSCL', mandate: 'Fleet registration accounting, fitness/scrappage enforcement, traffic capacity management, and sustainable urban mobility planning.', ownership: '10 Kashmir RTO registries, urban arterial network & Comprehensive Mobility Plan', scientificResp: 'Publishing disaggregated active-fleet statistics (by RTO, fuel, BS norm, and active PUC/fitness) and corridor PCU counts.', documentedFindings: 'Public statistics routinely conflate cumulative registrations with active on-road fleet while comprehensive origin-destination matrices remain unpublished.', response: 'VAHAN4 digitization and Smart City junction upgrades implemented; RTO-wise active fleet & CMP traffic counts invited.', questions: ['What is the exact active (valid fitness/insurance/PUC) vehicle count by fuel and BS category for each of the 10 Kashmir Division RTOs as of November 2026?'], corrective: 'Publish annual active-fleet VAHAN abstracts for Kashmir Division and mandate induced-demand/modal-share audits on all major road projects.' },
    ],
    unansweredQuestions: ['What is the seasonal summer peak influx of outside-registered tourist and pilgrimage vehicles entering Kashmir via NH-44 and Mughal/Zojila corridors?'],
    alternatives: [
      { title: 'High-Frequency Electric Bus Rapid Corridors & Non-Motorized Street Prioritisation', mechanism: 'Moves 40–60 passengers per vehicle footprint rather than expanding mixed-traffic asphalt for single-occupancy cars.', evidencePrecedent: 'ITDP / National Urban Transport Policy (NUTP) people-moving capacity standards.', feasibilityNote: 'Multiplies corridor person-throughput 5–8× without demolishing urban fabric.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Release Disaggregated 10-RTO Active Fleet & Automated Corridor PCU Telemetry', spec: 'Separate cumulative vs active fleet across JK01–JK22 and publish ITMS camera hourly traffic volumes.', target: 'Transport Commissioner J&K & Srinagar Smart City Ltd.', justification: 'Essential denominator for all regional emission and congestion models.', indicator: 'Annual 10-district active-fleet & V/C dataset published on KEW Open Data.' },
    ],
    references: [
      { id: 'REF-TRN-01', authorsOrBody: 'Ministry of Road Transport & Highways (MoRTH) — VAHAN4 Dashboard', year: 2026, title: 'Centralized Vehicle Registration & Fleet Category Repository (Jammu & Kashmir)', publicationOrSeries: 'vahan.parivahan.gov.in Official Portal', referenceType: 'Technical Institute Report', externalUrl: 'https://vahan.parivahan.gov.in/vahan4dashboard/', provenanceNote: 'Authoritative statutory repository for RTO vehicle registrations, fuel mix, and emission norms.' },
      { id: 'REF-TRN-02', authorsOrBody: 'Down To Earth / J&K Transport Department Statistical Disclosures', year: 2025, title: 'Analysis of Rising Motorization (~2.66M Cumulative Registrations) and Public Transit Deficit in Jammu & Kashmir', publicationOrSeries: 'Down To Earth Environmental Mobility Reporting', referenceType: 'Technical Institute Report', provenanceNote: 'Documents cumulative UT registration figure requiring divisional and active-fleet disaggregation.' },
    ],
    dataGaps: ['RTO-wise active survival rates, commercial freight axle/tonnage counts on NH-44/Mughal Road, and seasonal tourist vehicle entry logs.'],
    regulatoryLead: 'Motor Vehicles Act, 1988, National Urban Transport Policy & Srinagar Comprehensive Mobility Plan.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0027',
    slug: 'kashmir-vehicular-emissions-atmospheric-pollution',
    title: 'Vehicular Exhaust, Non-Exhaust Particulates and Mobile-Source Atmospheric Pollution Across Kashmir',
    subtitle: 'Fleet-wide emission factor modelling (E_p = Σ N_i D_i EF_{i,p}) of PM2.5, PM10, NOx, CO, HC, black carbon, CO2, and brake/tyre wear across age, fuel, cold-start, and altitude gradients',
    shortTitle: 'Vehicular Emissions & Mobile-Source Pollution',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Emission-Inventory Charter (Stage 01)',
    temporalScope: '1990–2026',
    heroImage: '/images/env-monitoring/kashmir-vehicle-census.jpg',
    heroImageCaption: 'Quantifying cold-start tailpipe exhaust and non-exhaust brake/tyre wear across Kashmir’s high-altitude (~1,600–3,500 m) fleet.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Urban Commuter Fleets, NH-44 / Mughal Road Heavy Diesel Horticultural Freight & Mountain Tourist Corridors',
    coordinates: [34.055, 74.825],
    primaryDomainId: '16-atmospheric-environment',
    secondaryDomainIds: ['07-infrastructure-development', '17-climate-compound-hazards'],
    disciplineIds: ['atmospheric-science', 'environmental-chemistry', 'environmental-data-science', 'gis', 'ecotoxicology'],
    linkedKewModules: [
      { moduleName: 'Transportation Pollution · Fleet & Emissions', route: '/environmental-monitoring/transportation-pollution', contributionNote: 'COPERT Tier-3 district exhaust & non-exhaust baselines.' },
      { moduleName: 'Environmental Monitoring · Air Pollution', route: '/environmental-monitoring/air-pollution', contributionNote: 'Ambient PM2.5, PM10, NO2, and AQI stations.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0026', 'KEW-INV-0028', 'KEW-INV-0033', 'KEW-INV-0038'],
    relatedSectoralCodes: ['KEW-SR-2026-35', 'KEW-SR-2026-44'],
    scopeDifferentiation: 'Dedicated mobile-source emission inventory (ARAI/COPERT emission factors corrected for ~1,600–3,500 m altitude barometric pressure and sub-zero winter cold-start penalties, plus brake/tyre wear).',
    centralQuestion: 'What are the true seasonal mass emissions (tonnes/yr) of PM2.5, black carbon, NOx, CO, VOCs, and heavy-metal brake/tyre particulates from Kashmir’s civilian and commercial road fleet once sub-zero cold starts, pre-BS-VI diesel trucks, and steep gradients are accounted for?',
    scopingQuestions: [
      'By what factor do sub-zero winter morning cold starts (-5 °C to +2 °C) and ~840–700 hPa mountain barometric pressures amplify real-world diesel/petrol EF_{i,p} above standard sea-level ARAI test-cycle factors?',
      'What share of roadside PM10 and trace metals (Cu, Zn, Ba, Sb) originates from non-exhaust brake, clutch, and tyre wear on steep mountain corridors (Qazigund–Banihal, Tangmarg–Gulmarg, Pahalgam, Sonamarg, Shopian–Peer Ki Gali)?',
    ],
    executiveKeyFindings: [
      'Standard plains test-cycle emission factors underestimate real-world Himalayan emissions unless corrected for sub-zero cold-start catalyst light-off delays, reduced oxygen partial pressure at altitude, and older BS-II/III/IV commercial diesel trucks.',
    ],
    chronology: [
      { period: '2010–2026', eventTitle: 'BS-III → BS-IV → BS-VI Fuel/Vehicle Transition & G.S.R. 991(E) PUC Revision', documentedRecord: 'Phased emission standards introduced alongside persistent legacy diesel commercial vehicles and revised Nov 2026 PUC rules.', sourceRef: 'REF-VEM-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-VEM-01', name: 'BS-VI Fuel Rollout & Automated PUC Testing Centres', period: '2020–2026', executingAgency: 'MoRTH, MVD & Oil Marketing Companies', interventionType: 'Tailpipe Emission Control', reportedScaleOrOutlay: 'Statutory compliance regime', status: 'Ongoing', documentedOutcome: 'BS-VI fuel supplied; real-world PUC pass/fail integrity and legacy super-emitter share under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'atmospheric-science',
        disciplineName: 'Mobile-Source Emission Inventory Physics',
        clusterName: 'Chemical & Atmospheric Sciences',
        methodologyApplied: 'ARAI + EMEP/EEA COPERT Tier-3 cold-start, grade, and altitude-corrected emission inventory + EEA non-exhaust brake/tyre wear equations.',
        equationOrMetricUsed: 'E_p = Σ_i N_i · D_i · EF_{i,p} · γ_temp(T) · γ_alt(z) · γ_grade(θ)',
        empiricalFinding: 'A small fraction (10–15%) of poorly maintained heavy diesel trucks and buses typically contributes >50% of on-road black carbon and PM2.5.',
        uncertaintyAndLimitations: 'Requires local odometer/fuel-station sales validation of annual VKT D_i per vehicle class.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Sub-zero ambient temperatures and high-altitude gradients substantially increase cold-start CO, HC, PM2.5, and black-carbon emissions per kilometre relative to 25 °C sea-level certification cycles.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established in EMEP/EEA Air Pollutant Emission Inventory Guidebook and ARAI/ICCT high-altitude/cold-start emission studies.', citationIds: ['REF-VEM-01'] },
      { suffix: '02', assertion: 'Pre-BS-IV heavy diesel freight vehicles hauling autumn apple harvests and construction aggregates contribute >45% of total vehicular black carbon in Kashmir Division.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Requires RTO fleet-age matrix paired with corridor axle counts and roadside aethalometer/plume-chasing validation.', citationIds: ['REF-VEM-01'], methodReq: 'Combine odometer-derived VKT, petrol/diesel district sales reconciliation, and roadside optical opacity/BC testing.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Motor Vehicles Dept., JKPCC & Traffic Police', acronym: 'MVD / JKPCC / Traffic', mandate: 'PUC calibration oversight, visible-smoke super-emitter enforcement, and regional mobile-source emission inventory compilation.', ownership: 'PUC testing centres & commercial vehicle fitness inspections', scientificResp: 'Auditing PUC analyser calibration gases and publishing annual PUC test/failure rates by vehicle category.', documentedFindings: 'Roadside visible black-smoke emissions persist from heavy commercial vehicles despite nominal PUC certificates.', response: 'Online PUCC linkage with VAHAN active; analyser audit & super-emitter challan logs invited.', questions: ['What percentage of tested diesel commercial vehicles failed PUC opacity limits in Kashmir Division in 2024–2026, and how frequently are PUC smoke meters zero/span calibrated?'], corrective: 'Deploy tamper-proof video/OBD-linked PUC audits and remote-sensing roadside smoke screening on NH-44 and city entries.' },
    ],
    unansweredQuestions: ['What is the fuel-sales mass-balance discrepancy between bottom-up VKT emission estimates and total HSD/MS fuel dispensed across the 10 Kashmir districts?'],
    alternatives: [
      { title: 'Targeted Super-Emitter Diesel Retrofit/Scrappage + Rail Horticultural Freight Shift', mechanism: 'Shifts bulk autumn apple/cement freight onto the USBRL Kashmir rail link and targets the dirtiest 15% diesel vehicles.', evidencePrecedent: ' Freight modal shift & targeted DPF/super-emitter programmes.', feasibilityNote: 'Cuts valley black carbon sharply with minimal impact on small vehicle owners.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Compile Fuel-Reconciled 1 km × 1 km Gridded Kashmir Mobile-Source Emission Inventory', spec: 'Couple district HSD/petrol sales, VAHAN active cohorts, and ARAI/COPERT altitude-cold-start factors across all 10 districts.', target: 'JKPCC, MVD & KU Atmospheric Sciences', justification: 'Provides the quantitative input grid required for chemical dispersion and source apportionment.', indicator: 'Open 1 km gridded PM2.5, BC, NOx, and non-exhaust wear inventory published.' },
    ],
    references: [
      { id: 'REF-VEM-01', authorsOrBody: 'Automotive Research Association of India (ARAI) & EMEP/EEA', year: 2023, title: 'Indian Road Transport Emission Factors & EMEP/EEA Tier-3 Cold-Start, Road-Grade and Non-Exhaust Wear Methodology', publicationOrSeries: 'CPCB / ARAI Pune & European Environment Agency', referenceType: 'Technical Institute Report', provenanceNote: 'Standard scientific methodology for tailpipe and brake/tyre wear emission inventories.' },
    ],
    dataGaps: ['District-wise monthly petrol (MS) and diesel (HSD) retail/bulk sales and PUC smoke-opacity raw readings.'],
    regulatoryLead: 'Central Motor Vehicles Rules, 1989 (Rules 115 & 116), BS-VI Emission Norms & G.S.R. 991(E) (Nov 2026 PUC provisions).',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0028',
    slug: 'srinagar-air-pollution-multisectoral-source-apportionment',
    title: 'What Is Kashmir Breathing? A Multisectoral Scientific Investigation of Atmospheric Pollution and Emission Sources',
    subtitle: 'Evaluating all 12 emission sectors via Positive Matrix Factorization (PMF) and comparing contemporary CPCB/JKPCC monitoring against historical 2013–2017 Srinagar PM10 (2.0–3.2×) and PM2.5 (1.7–2.8×) NAAQS baselines',
    shortTitle: 'Srinagar Air Pollution Source Apportionment',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Critical Scoping · 12-Source PMF & NCAP Audit',
    temporalScope: '2013–2026',
    heroImage: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
    heroImageCaption: 'Srinagar airshed — apportioning winter domestic biomass/coal heating, brick kilns, cement/crushers, road dust, waste burning, and vehicular exhaust.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Srinagar Non-Attainment Airshed, Budgam Brick-Kiln Belt, Khrew–Wuyan Cement Cluster & Valley Background Sites',
    coordinates: [34.0837, 74.7973],
    primaryDomainId: '16-atmospheric-environment',
    secondaryDomainIds: ['14-industrial-craft-pollution', '07-infrastructure-development', '15-solid-waste-sewage'],
    disciplineIds: ['atmospheric-science', 'environmental-chemistry', 'climatology', 'remote-sensing', 'environmental-epidemiology', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Air Pollution', route: '/environmental-monitoring/air-pollution', contributionNote: 'Srinagar & district AQI, PM2.5, and PM10 monitoring.' },
      { moduleName: 'Earth & Human Impact · Climate & Atmosphere', route: '/earth-human-impact/climate-atmosphere', contributionNote: 'Regional aerosol & synoptic transport context.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0027', 'KEW-INV-0029', 'KEW-INV-0030', 'KEW-INV-0037', 'KEW-INV-0038'],
    relatedSectoralCodes: ['KEW-SR-2026-27', 'KEW-SR-2026-33', 'KEW-SR-2026-35'],
    scopeDifferentiation: 'Audits Srinagar’s National Clean Air Programme (NCAP / PRANA) expenditure and seasonal chemical receptor modelling across all 12 candidate sources — explicitly refusing to presume vehicles dominate every season.',
    centralQuestion: 'What are the verified seasonal percentage contributions of all 12 local and transboundary emission sources (vehicular exhaust, brake/tyre wear, road dust, domestic heating, brick kilns, cement plants, stone crushers, construction, waste burning, orchard/agricultural biomass burning, diesel gensets, and long-range transport) to Srinagar’s PM2.5 and PM10 across summer versus winter?',
    scopingQuestions: [
      'Has Srinagar’s ambient PM10 and PM2.5 measurably improved or worsened in 2024–2026 compared with the peer-reviewed 2013–2017 historical baseline (annual PM10 at 2.0–3.2× NAAQS and PM2.5 at 1.7–2.8× NAAQS)?',
      'Have NCAP / PRANA fund allocations in Srinagar matched scientifically apportioned winter biomass/heating, kiln, and dust shares, or disproportionately funded cosmetic measures?',
    ],
    executiveKeyFindings: [
      'Historical Baseline (2013–2017, Not Current Nov 2026): Peer-reviewed Srinagar particulate studies documented annual PM10 at 2.0–3.2× the Indian annual standard (60 µg/m³) and annual PM2.5 at 1.7–2.8× the Indian annual standard (40 µg/m³).',
      'Published atmospheric chemistry from Srinagar (Hakim et al.; Bhat et al., 2017) demonstrates strong seasonal source switching: winter domestic fuelwood/coal/Kangri and autumn orchard-pruning/leaf biomass combustion surge under shallow inversions, whereas road/construction dust, brick kilns, and traffic dominate warmer dry months.',
    ],
    callouts: [
      { label: '2013–2017 PM₁₀ Baseline', value: '2.0–3.2×', unit: 'Indian Annual NAAQS', sourceTag: 'Peer-Reviewed Historical Study' },
      { label: '2013–2017 PM₂.₅ Baseline', value: '1.7–2.8×', unit: 'Indian Annual NAAQS', sourceTag: 'Peer-Reviewed Historical Study' },
      { label: 'Candidate Source Sectors', value: '12 Sectors', unit: 'Seasonal PMF Scope', sourceTag: 'KEW Receptor Protocol' },
    ],
    chronology: [
      { period: '2013–2017', eventTitle: 'Multi-Year Peer-Reviewed Srinagar PM₁₀ & PM₂.₅ Baseline', documentedRecord: 'Observed annual PM10 at 2.0–3.2× and PM2.5 at 1.7–2.8× Indian annual NAAQS, peaking sharply in late autumn and winter.', sourceRef: 'REF-AIR-01', significance: 'Baseline' },
      { period: '2019–2026', eventTitle: 'Designation of Srinagar Under NCAP & PRANA Portal Tracking', documentedRecord: 'Clean Air Action Plan sanctioned under MoEFCC/CPCB National Clean Air Programme.', sourceRef: 'REF-AIR-02', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-AIR-01', name: 'Srinagar National Clean Air Programme (NCAP) & Zig-Zag Brick Kiln Mandates', period: '2019–Present', executingAgency: 'SMC, JKPCC & District Administrations', interventionType: 'Urban Air Quality Action Plan', reportedScaleOrOutlay: 'NCAP / 15th Finance Commission Clean Air grants (PRANA)', status: 'Ongoing', documentedOutcome: 'Select road paving/sweeping and CAAQMS commissioning completed; multi-season chemical PMF receptor study and CAAQMS uptime audit needed.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-chemistry',
        disciplineName: 'Aerosol Chemical Speciation & Positive Matrix Factorization (PMF)',
        clusterName: 'Chemical & Atmospheric Sciences',
        methodologyApplied: 'EPA PMF 5.0 receptor modelling on 24-hr quartz/PTFE filter EC/OC, levoglucosan, K⁺, ions, and ICP-MS crustal/trace elements + aethalometer BC Ångström exponent ( fossil vs biomass).',
        equationOrMetricUsed: 'X_ij = Σ_{k=1}^p g_ik f_kj + e_ij  (minimizing Q = Σ Σ (e_ij / u_ij)²)',
        empiricalFinding: 'Optical absorption Ångström exponents and K⁺/levoglucosan tracers separate fossil diesel soot from winter Chinar-leaf/orchard-pruning/heating biomass smoke.',
        uncertaintyAndLimitations: 'Requires 4-season speciated filter campaigns across urban core, kiln/cement downwind, and rural background sites.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Historical Srinagar particulate monitoring studies (2013–2017) reported elevated annual mean PM10 and PM2.5 multiples above Indian annual NAAQS (60 and 40 µg/m³), with acute winter amplification documented in black-carbon aerosol studies.', sourceCategory: 'Scientific Literature', classification: 'Provisionally Supported', basis: 'Winter boundary-layer black-carbon amplification is documented by Bhat et al. (2017, DOI: 10.1016/j.atmosenv.2017.07.004); multi-year PM10/PM2.5 mass-concentration synthesis is queued for exact single-paper DOI binding.', citationIds: ['REF-AIR-01', 'REF-AIR-03'], methodReq: 'Bind exact single-study DOIs for 2013–2017 gravimetric PM10/PM2.5 filter series alongside CPCB NAMP/CAAQMS archives.' },
      { suffix: '02', assertion: 'Srinagar has achieved the statutory NCAP 40% particulate matter reduction target by 2026 across continuous CAAQMS stations with >=85% annual data capture.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Requires verification of unbroken CPCB/JKPCC CAAQMS hourly data capture (especially during winter power/calibration outages) on the PRANA portal.', citationIds: ['REF-AIR-02'], methodReq: 'Audit raw hourly CAAQMS uptime, calibration logs, and seasonal means (2019–2026) on CPCB PRANA.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Pollution Control Committee, Srinagar Municipal Corporation & NCAP Implementation Committee', acronym: 'JKPCC / SMC / NCAP', mandate: 'Continuous NAAQS monitoring, brick-kiln/cement/crusher emission enforcement, open-burning prevention, and scientifically apportioned NCAP fund utilisation.', ownership: 'CAAQMS/NAMP stations, Srinagar Clean Air Action Plan & PRANA reporting', scientificResp: 'Publishing peer-reviewed seasonal source-apportionment reports and >=85% uptime hourly CAAQMS archives.', documentedFindings: 'Historical CAAQMS data gaps and seasonal autumn/winter smog episodes raise questions over action-plan targeting.', response: 'NCAP physical/financial progress reported on CPCB PRANA portal; full chemical source-apportionment report and raw CAAQMS CSVs invited.', questions: ['Has an accredited 4-season chemical PMF source-apportionment study for Srinagar been completed and published under NCAP?', 'What was the verified data-capture percentage of every CAAQMS station in Kashmir during Nov–Feb 2024–2026?'], corrective: 'Publish complete 4-season PMF source apportionment and align NCAP outlays with verified winter biomass, kiln, dust, and diesel shares.' },
    ],
    unansweredQuestions: ['What fraction of autumn (Oct–Nov) Srinagar PM2.5 spikes derives from intra-valley horticultural pruning/leaf burning versus transboundary Indo-Gangetic transport across Pir Panjal passes?'],
    alternatives: [
      { title: 'Seasonally Targeted Clean-Air Dispatch (Autumn Chipper-Mulchers + Winter Thermal Insulation/Clean Heating + Kiln Zig-Zag)', mechanism: 'Replaces orchard/leaf open burning with decentralized mulching/briquetting, insulates homes to cut winter fuelwood demand, and enforces zig-zag brick kilns.', evidencePrecedent: 'Multi-sector mountain valley clean-air plans.', feasibilityNote: 'Targets actual seasonal dominant sources rather than year-round uniform assumptions.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Audit CPCB PRANA Expenditure vs 2013–2017 / 2024–2026 CAAQMS Trajectories', spec: 'Reconcile Srinagar NCAP spending by sector against seasonally disaggregated PM2.5/PM10 trends and station uptime.', target: 'JKPCC, SMC & MoEFCC PRANA Cell', justification: 'Links clean-air public spending to measured ambient concentration reductions.', indicator: '>=90% winter CAAQMS uptime + public 12-source seasonal PMF apportionment.' },
    ],
    references: [
      { id: 'REF-AIR-01', authorsOrBody: 'Scoping Literature Review Target — Srinagar Multi-Year PM10/PM2.5 Series (Hakim, Beig, Bhat et al.)', year: 2018, title: 'Scoping Literature Review Target: Multi-year observations of PM10 and PM2.5 mass concentrations and NAAQS exceedances in Srinagar (2013–2017)', publicationOrSeries: 'Scoping Literature Review Target (Exact Single-Journal DOI Binding Pending)', referenceType: 'Technical Institute Report', provenanceNote: 'Reclassified from dual-journal composite reference to scoping literature review target pending single-article DOI verification.' },
      { id: 'REF-AIR-02', authorsOrBody: 'Central Pollution Control Board (CPCB) — PRANA Portal', year: 2026, title: 'Portal for Regulation of Air-Pollution in Non-Attainment Cities (PRANA) — Srinagar Action Plan & NAAQS Registry', publicationOrSeries: 'prana.cpcb.gov.in / cpcb.nic.in', referenceType: 'Technical Institute Report', externalUrl: 'https://prana.cpcb.gov.in/', provenanceNote: 'Statutory NCAP implementation and NAAQS standard repository.' },
      { id: 'REF-AIR-03', authorsOrBody: 'Bhat, M. A., Romshoo, S. A., & Beig, G.', year: 2017, title: 'Aerosol black carbon at an urban site-Srinagar, Northwestern Himalaya, India: Seasonality, sources, meteorology and radiative forcing', publicationOrSeries: 'Atmospheric Environment, 165, 336–348', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1016/j.atmosenv.2017.07.004', externalUrl: 'https://doi.org/10.1016/j.atmosenv.2017.07.004', provenanceNote: 'Separates fossil-fuel vs winter biomass black-carbon contributions under shallow Srinagar boundary layers.' },
    ],
    dataGaps: ['Unbroken 2019–2026 hourly CAAQMS datasets and 4-season chemical filter speciation across all 10 Kashmir districts.'],
    regulatoryLead: 'Air (Prevention and Control of Pollution) Act, 1981, CPCB NAAQS (2009) & National Clean Air Programme (NCAP).',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0029',
    slug: 'winter-air-pollution-temperature-inversions-kashmir',
    title: 'Winter Air Pollution, Shallow Mixing Layers and Atmospheric Temperature Inversions in the Kashmir Valley',
    subtitle: 'Quantifying Pir Panjal–Zabarwan bowl topography, ERA5/radiosonde planetary boundary-layer collapse (<150–250 m), calm katabatic stagnation, and winter ventilation coefficients',
    shortTitle: 'Winter Air Pollution & Temperature Inversions',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Boundary-Layer Charter (Stage 01)',
    temporalScope: '1990–2026',
    heroImage: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
    heroImageCaption: 'Winter thermal inversion lid trapping surface emissions inside the intermontane Kashmir Valley bowl.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Kashmir Intermontane Bowl Floor (~135 km × 40 km) Flanked by Pir Panjal & Greater Himalaya',
    coordinates: [34.05, 74.82],
    primaryDomainId: '16-atmospheric-environment',
    secondaryDomainIds: ['17-climate-compound-hazards'],
    disciplineIds: ['meteorology', 'atmospheric-science', 'climatology', 'remote-sensing', 'environmental-epidemiology'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Air Pollution', route: '/environmental-monitoring/air-pollution', contributionNote: 'Winter inversion AQI surges.' },
      { moduleName: 'Earth & Human Impact · Climate & Atmosphere', route: '/earth-human-impact/climate-atmosphere', contributionNote: 'Boundary-layer & Western Disturbance meteorology.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0028', 'KEW-INV-0027', 'KEW-INV-0008'],
    relatedSectoralCodes: ['KEW-SR-2026-33', 'KEW-SR-2026-35', 'KEW-SR-2026-73'],
    scopeDifferentiation: 'Isolates the physical meteorological trapping mechanism (ventilation coefficient VC = H_mix × U_wind, radiative cooling, snow-albedo inversions, and Western Disturbance washout intervals) so policy separates emission rate changes from meteorological stagnation.',
    centralQuestion: 'By what factor does winter collapse of the Kashmir Valley planetary boundary layer and ventilation coefficient amplify ground-level PM2.5 and black carbon per unit of surface emission compared with well-mixed summer afternoons?',
    scopingQuestions: [
      'How have prolonged dry winter Western Disturbance droughts (multi-week snowless stagnation spells) altered inversion persistence and peak winter PM2.5 episodes since 2000?',
      'Should JKPCC/SMC institute meteorology-triggered Graded Response Action Plans (GRAP) when forecast ventilation coefficients fall below critical stagnation thresholds (<1,500 m²/s)?',
    ],
    executiveKeyFindings: [
      'Peer-reviewed Srinagar boundary-layer studies (Bhat et al., 2017) demonstrate that nocturnal/winter mixing heights frequently drop below 150–300 m with near-calm winds (<1 m/s), compressing identical emission fluxes into a 5–10× smaller atmospheric volume.',
    ],
    chronology: [
      { period: '2013–2026', eventTitle: 'Documentation of Winter Boundary-Layer Collapse & Dry-Chilla Smog Spells', documentedRecord: 'Radiosonde/ERA5 and BC observations linked extreme Nov–Feb particulate peaks to radiative inversions interrupted only by Western Disturbance precipitation.', sourceRef: 'REF-INV-01', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-INV-01', name: 'IMD Srinagar Upper-Air Soundings & Winter Advisory Bulletins', period: '1990–Present', executingAgency: 'IMD Srinagar & JKPCC', interventionType: 'Meteorological Surveillance', reportedScaleOrOutlay: 'Routine meteorological operations', status: 'Ongoing', documentedOutcome: 'No meteorology-triggered Graded Response Action Plan (Valley GRAP) currently restricts high-emitting activities during severe inversion locks.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'meteorology',
        disciplineName: 'Boundary-Layer Meteorology',
        clusterName: 'Chemical & Atmospheric Sciences',
        methodologyApplied: 'Box-model ventilation coefficient VC = H_BL · U_mean from IMD radiosondes and ERA5 hourly reanalysis.',
        equationOrMetricUsed: 'C_box ≈ Q_area · L / (H_BL · U_mean + v_d · L)',
        empiricalFinding: 'When H_BL · U_mean approaches zero during anticyclonic winter nights, even moderate surface combustion produces hazardous (>250 µg/m³) PM2.5.',
        uncertaintyAndLimitations: 'ERA5 (~25 km grid) smooths steep Zabarwan/Pir Panjal cold-air pooling; requires local ceilometer/radiosonde validation.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Shallow winter atmospheric mixing heights, low wind speeds, and enclosed valley topography severely restrict horizontal and vertical dispersion in Srinagar, amplifying winter PM2.5 and black carbon.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established by Bhat et al. (2017, Atmospheric Environment) and IMD Srinagar climatological records.', citationIds: ['REF-INV-01'] },
      { suffix: '02', assertion: '72-hour ahead IMD/ERA5 ventilation-coefficient forecasts can predict >80% of severe (>200 µg/m³) Srinagar PM2.5 episodes early enough for pre-emptive emission controls.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Requires hindcast skill verification pairing ERA5/IMD soundings against continuous CAAQMS winter peaks.', citationIds: ['REF-INV-01'], methodReq: 'Evaluate ROC/hit-rate of 72-hr VC < 1,500 m²/s forecasts against 2020–2026 winter CAAQMS exceedances.' },
    ],
    accountability: [
      { suffix: '01', institution: 'JKPCC, Disaster Management / Div. Com. Kashmir & IMD Srinagar', acronym: 'JKPCC / DivCom / IMD', mandate: 'Issuing stagnation health advisories and enforcing temporary high-emitter curbs (kilns, open burning, uncovered construction, diesel gensets) during severe inversions.', ownership: 'Winter Air Quality Emergency Protocol', scientificResp: 'Coupling daily IMD mixing-height forecasts with live AQI public alerts.', documentedFindings: 'Unlike Delhi-NCR or European Alpine valleys, Kashmir currently lacks an enforceable inversion-triggered Valley Graded Response Action Plan.', response: 'IMD issues fog/cold-wave bulletins and JKPCC operates AQI displays; joint Valley-GRAP framework invited.', questions: ['Will J&K notify an inversion-triggered Kashmir Valley Graded Response Action Plan ahead of winter stagnation spells?'], corrective: 'Institute a 4-stage Kashmir Valley Winter GRAP triggered by forecast ventilation coefficient and live PM2.5.' },
    ],
    unansweredQuestions: ['What is the vertical inversion-top altitude (m AGL) across rural Pulwama/Anantnag/Baramulla basins compared with urban Srinagar?'],
    alternatives: [
      { title: 'Forecast-Triggered Kashmir Valley Winter GRAP + Uninterrupted Winter Grid Power', mechanism: 'Eliminates diesel generator and emergency biomass use during inversion locks by prioritizing reliable winter electric supply and halting open burning/dust works.', evidencePrecedent: 'Grenoble/Chamonix (Arve Valley, France) & Bolzano Alpine inversion protocols.', feasibilityNote: 'Directly prevents acute hospitalisation spikes during 5–10 day inversion locks.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Daily Kashmir Ventilation-Coefficient Forecast & Notify Winter Stagnation GRAP', spec: 'Pair IMD Srinagar radiosonde mixing-height data with JKPCC CAAQMS feeds to trigger automatic dust/burning/genset curbs.', target: 'IMD Srinagar, JKPCC & Divisional Administration Kashmir', justification: 'Protects vulnerable children, elderly, and respiratory patients during trapped smog spells.', indicator: 'Live daily Ventilation Coefficient + Winter GRAP protocol active.' },
    ],
    references: [
      { id: 'REF-INV-01', authorsOrBody: 'Bhat, M. A., Romshoo, S. A., & Beig, G.', year: 2017, title: 'Aerosol black carbon at an urban site-Srinagar, Northwestern Himalaya, India: Seasonality, sources, meteorology and radiative forcing', publicationOrSeries: 'Atmospheric Environment, 165, 336–348', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1016/j.atmosenv.2017.07.004', externalUrl: 'https://doi.org/10.1016/j.atmosenv.2017.07.004', provenanceNote: 'Documents shallow winter boundary layers and meteorological trapping in Srinagar.' },
    ],
    dataGaps: ['Lidar ceilometer continuous mixing-layer height profiles across Srinagar and South/North Kashmir valley floors.'],
    regulatoryLead: 'Air Act 1981, CPCB Graded Response Action Plan (GRAP) Guidelines & Disaster Management Act health advisories.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0030',
    slug: 'road-dust-construction-dust-particulate-pollution',
    title: 'Road Dust Resuspension, Uncontained Construction Excavations and Coarse-to-Fine Particulate Loading in Kashmir',
    subtitle: 'Auditing paved/unpaved road silt loading (sL g/m²), utility trenching without immediate reinstatement, flyover/highway construction dust EMPs, and mechanical sweeper effectiveness',
    shortTitle: 'Road & Construction Dust Pollution',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Particulate Audit (Stage 01)',
    temporalScope: '2014–2026',
    heroImage: '/images/env-monitoring/kashmir-traffic-urban.jpg',
    heroImageCaption: 'Evaluating crustal road-dust resuspension and uncontained trenching/construction dust across Kashmir’s corridors.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Urban Utility Trenches, Unpaved Road Shoulders, Flyover/Ring-Road Construction Zones & Karewa Haulage Routes',
    coordinates: [34.042, 74.812],
    primaryDomainId: '16-atmospheric-environment',
    secondaryDomainIds: ['07-infrastructure-development', '10-mining-quarrying'],
    disciplineIds: ['atmospheric-science', 'environmental-engineering', 'soil-science', 'gis', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Air Pollution', route: '/environmental-monitoring/air-pollution', contributionNote: 'Coarse PM10 vs fine PM2.5 ratios.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0028', 'KEW-INV-0036'],
    relatedSectoralCodes: ['KEW-SR-2026-25', 'KEW-SR-2026-27', 'KEW-SR-2026-35'],
    scopeDifferentiation: 'Specifically audits crustal fugitive dust mechanics (US EPA AP-42 silt loading sL and mean vehicle weight W), unsealed road shoulders, uncovered Karewa soil/aggregate dumpers, and multi-month excavated drainage trenches.',
    centralQuestion: 'What share of Kashmir’s chronic PM10 exceedance (and crustal PM2.5 fraction) is driven by preventable road silt resuspension, uncovered earthfill haulage, and un-reinstated utility trenches, and are mechanical sweepers/sprinklers operating effectively?',
    scopingQuestions: [
      'What is the measured road-surface silt loading (g/m²) on Srinagar arterials, NH-44 construction stretches, and Karewa haulage roads compared with end-to-end paved curbed streets?',
      'How many kilometres of urban roads excavated for drainage/sewer/cable works remain unpaved >90 days after trenching, and how many hours/week do NCAP-funded mechanical sweepers actually operate?',
    ],
    executiveKeyFindings: [
      'High PM10/PM2.5 ratios during dry spring/summer/autumn periods in Srinagar point to substantial mineral/crustal dust resuspension amplified by unsealed shoulders, mud tracking from Karewa/riverbed trucks, and prolonged utility trenching.',
    ],
    chronology: [
      { period: '2018–2026', eventTitle: 'C&D Waste Rules, NCAP Mechanical Sweepers & Major Urban/Ring-Road Excavations', documentedRecord: 'Mechanical sweepers procured under NCAP/Smart City alongside extensive drainage, flyover, and ring-road earthworks.', sourceRef: 'REF-DST-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-DST-01', name: 'NCAP Vacuum Road Sweepers, Water Sprinklers & Construction Dust Barriers', period: '2020–Present', executingAgency: 'SMC, R&B, ERA, SSCL & NHAI', interventionType: 'Fugitive Dust Suppression', reportedScaleOrOutlay: 'NCAP & Smart City equipment grants', status: 'Ongoing', documentedOutcome: 'Equipment procured; GPS sweeper route logs, collected silt tonnage, and contractor C&D penalty enforcement under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-engineering',
        disciplineName: 'Fugitive Dust Engineering (AP-42)',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'US EPA AP-42 Paved Road Resuspension EF = k · (sL)^0.91 · (W)^1.02 + gravimetric Si/Al/Ca/Fe crustal tracer ratio.',
        equationOrMetricUsed: 'EF_PM10 = k · (sL)^0.91 · (W)^1.02 · (1 - P / 4N)',
        empiricalFinding: 'Heavy multi-axle dumpers (high W) travelling over Karewa silt spilled onto asphalt (high sL) multiply PM10 emission per vehicle pass exponentially.',
        uncertaintyAndLimitations: 'Requires vacuum-quadrat silt-loading (g/m²) measurements across 10 districts.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Under CPCB Construction & Demolition (C&D) Waste Management Rules 2016 and MoEFCC dust mitigation notifications, uncovered transport of loose earth/aggregates and unbarricaded dry excavation on major projects are statutorily prohibited.', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Established in MoEFCC Gazette Notification G.S.R. 94(E) (2018) Mandatory Dust Mitigation Measures and C&D Waste Rules 2016.', citationIds: ['REF-DST-01'] },
      { suffix: '02', assertion: 'End-to-end shoulder paving, wheel-washing at Karewa/mining exits, and <30-day utility-trench restoration would cut dry-season corridor PM10 in Srinagar and Budgam by >35%.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Requires paired AP-42 silt-loading sampling before and after shoulder sealing and sweeper passes.', citationIds: ['REF-DST-01'], methodReq: 'Measure AP-42 silt loading (g/m²) and paired optical PM10 across curbed vs uncurbed/trenched corridors.' },
    ],
    accountability: [
      { suffix: '01', institution: 'SMC, R&B, NHAI, SSCL, UEED & JKPCC', acronym: 'SMC / R&B / NHAI / JKPCC', mandate: 'Enforcing mandatory C&D dust barriers, tarpaulin truck covers, wheel-wash bays, timely trench reinstatement, and GPS-tracked vacuum sweeping.', ownership: 'Urban roads, highway packages, utility trenches & NCAP sweepers', scientificResp: 'Logging collected road-silt tonnage and enforcing contractor EMP dust penalties.', documentedFindings: 'Uncovered soil dumpers and prolonged un-reinstated utility trenches remain widespread along urban and peri-urban corridors.', response: 'Periodic water sprinkling and night sweeping conducted on select Srinagar routes; GPS logs & C&D challan records invited.', questions: ['How many challans/penalties were levied under C&D Dust Rules against highway, drainage, and haulage contractors in Kashmir during 2024–2026?', 'What is the monthly GPS km-swept and silt tonnage collected by SMC mechanical sweepers?'], corrective: 'Mandate escrow-backed 30-day trench restoration, wheel-wash stations at all quarry/earthfill exits, and wall-to-wall vegetative/paved shoulder sealing.' },
    ],
    unansweredQuestions: ['Where is designated C&D waste processing infrastructure located across the 10 districts of Kashmir Division?'],
    alternatives: [
      { title: 'Wall-to-Wall Permeable Shoulder Stabilisation + Utility Duct Corridors ("Dig Once")', mechanism: 'Eliminates unpaved mud shoulders and places cables/pipes in accessible ducts to end repetitive road cutting.', evidencePrecedent: 'CPCB NCAP dust-free corridor engineering.', feasibilityNote: 'Permanently removes the silt reservoir rather than repeatedly spraying water.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Enforce Wheel-Wash & Tarpaulin Compliance on All Earthfill/Aggregate Hauliers + 30-Day Trench Rule', spec: 'Link road-cutting permits to time-bound resurfacing bonds and publish live GPS trails of NCAP vacuum sweepers.', target: 'SMC, R&B, NHAI, Traffic Police & JKPCC', justification: 'Fastest, lowest-cost reduction in breathable coarse particulates.', indicator: 'Measured 50% reduction in arterial silt loading (g/m²) within 12 months.' },
    ],
    references: [
      { id: 'REF-DST-01', authorsOrBody: 'Ministry of Environment, Forest and Climate Change (MoEFCC) & CPCB', year: 2018, title: 'C&D Waste Management Rules, 2016 & G.S.R. 94(E) Mandatory Dust Mitigation Guidelines for Construction and Road Works', publicationOrSeries: 'Gazette of India / CPCB New Delhi', referenceType: 'Judicial Order / NGT', externalUrl: 'https://cpcb.nic.in/', provenanceNote: 'Statutory dust-control requirements for road, construction, and material haulage activities.' },
    ],
    dataGaps: ['Arterial road silt-loading (g/m²) measurements and GPS operational logs of NCAP mechanical sweepers.'],
    regulatoryLead: 'C&D Waste Management Rules 2016, MoEFCC Notification G.S.R. 94(E) (2018) & CMVR tarpaulin carriage rules.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0031',
    slug: 'transportation-noise-pollution-urban-acoustics-health',
    title: 'The Invisible Pollutant: Transportation Noise, Urban Acoustic Degradation and Public Health in Kashmir',
    subtitle: 'Logarithmic acoustic energy assessment (LAeq, Lmax, L10, L90, Lden, Lnight) of pressure horns, modified exhausts, heavy night freight, and congested hubs against Noise Pollution Rules, 2000',
    shortTitle: 'Transportation Noise & Public Health',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Critical Scoping · Logarithmic LAeq & GIS Noise Audit',
    temporalScope: '2000–2026',
    heroImage: '/images/env-monitoring/kashmir-noise-hero.jpg',
    heroImageCaption: 'GIS acoustic propagation and logarithmic LAeq assessment across Kashmir’s urban intersections, transit terminals, and freight highways.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Lal Chowk, Jehangir Chowk, Pantha Chowk, Parimpora, Sopore, Baramulla, Anantnag, Pulwama & NH-44 Night Freight Corridor',
    coordinates: [34.073, 74.814],
    primaryDomainId: '16-atmospheric-environment',
    secondaryDomainIds: ['07-infrastructure-development', '09-forests-biodiversity', '18-environmental-governance'],
    disciplineIds: ['environmental-epidemiology', 'spatial-statistics', 'gis', 'conservation-biology', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Noise Pollution', route: '/environmental-monitoring/noise-pollution', contributionNote: 'Logarithmic calculateLogLeq engine, 22 stations & DNPBS scores.' },
      { moduleName: 'Noise Pollution · GIS Acoustic Atlas', route: '/environmental-monitoring/noise-pollution/gis-atlas', contributionNote: 'Spatial decibel contours & receptor buffers.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0032', 'KEW-INV-0026', 'KEW-INV-0037', 'KEW-INV-0038'],
    relatedSectoralCodes: ['KEW-SR-2026-78'],
    scopeDifferentiation: 'Complements sectoral acoustic baseline KEW-SR-2026-78 by auditing statutory enforcement under Noise Pollution Rules 2000 and CMVR Rules 119–120 (pressure horns, modified bullet silencers, bus terminals, night NH-44 freight) while strictly enforcing logarithmic energy integration.',
    centralQuestion: 'By how many decibels dB(A) and hours per day do Kashmir’s commercial hubs, residential corridors, and highway settlements exceed statutory Noise Pollution Rules, 2000 limits (75/70, 65/55, 55/45, 50/40 dB(A)) when properly computed via logarithmic LAeq,T integration?',
    scopingQuestions: [
      'Do any published academic or departmental noise summaries in Kashmir commit the methodological error of taking simple arithmetic averages of dB(A) readings instead of logarithmic energy integration LAeq,T, thereby under-reporting impulse horn peaks?',
      'What share of daytime L10/Lmax spikes (>85–95 dB(A)) at Srinagar and district junctions stems from illegal multi-toned/pressure horns and modified two-wheeler exhausts versus baseline engine/tyre rolling noise?',
    ],
    executiveKeyFindings: [
      'Statutory Indian Ambient Noise Standards (Noise Pollution Rules, 2000) mandate Daytime (06:00–22:00) / Nighttime (22:00–06:00) Leq limits of 75/70 dB(A) Industrial, 65/55 dB(A) Commercial, 55/45 dB(A) Residential, and 50/40 dB(A) Silence Zones.',
      'KEW strictly enforces logarithmic acoustic integration LAeq,T = 10 log10 [ (1/T) ∫ 10^(L_A(t)/10) dt ], preventing downward bias from arithmetic averaging.',
    ],
    callouts: [
      { label: 'Industrial Limit', value: '75 / 70', unit: 'dB(A) Day/Night', sourceTag: 'Noise Rules, 2000' },
      { label: 'Commercial Limit', value: '65 / 55', unit: 'dB(A) Day/Night', sourceTag: 'Noise Rules, 2000' },
      { label: 'Residential Limit', value: '55 / 45', unit: 'dB(A) Day/Night', sourceTag: 'Noise Rules, 2000' },
      { label: 'Silence Zone Limit', value: '50 / 40', unit: 'dB(A) Day/Night', sourceTag: 'Noise Rules, 2000' },
    ],
    chronology: [
      { period: '2000–2026', eventTitle: 'Noise Pollution (Regulation and Control) Rules, 2000 & CPCB NANMN Protocol', documentedRecord: 'Established four-zone ambient dB(A) Leq limits and Class-1 continuous acoustic monitoring methodology.', sourceRef: 'REF-NOI-01', significance: 'Baseline' },
    ],
    interventions: [
      { id: 'INT-NOI-01', name: 'Traffic Police Pressure-Horn/Modified-Silencer Seizure Drives & JKPCC Noise Checks', period: '2015–2026', executingAgency: 'J&K Traffic Police, MVD & JKPCC', interventionType: 'Acoustic Regulatory Enforcement', reportedScaleOrOutlay: 'Routine enforcement & CPCB monitoring', status: 'Ongoing', documentedOutcome: 'Episodic horn/silencer confiscation drives; permanent continuous Class-1 NANMN telemetric network across Kashmir districts still sparse.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'spatial-statistics',
        disciplineName: 'Environmental Acoustics & GIS Propagation (ISO 9613-2 / CNOSSOS)',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied: 'Logarithmic time-integrated LAeq,T, L10 (horn/traffic peaks), L90 (background), Lden, and Lnight line-source propagation.',
        equationOrMetricUsed: 'LAeq,T = 10 · log₁₀ [ (1/T) ∫₀^T 10^(L_A(t)/10) dt ]',
        empiricalFinding: 'A single 95 dB(A) pressure-horn blast carries 10,000× the acoustic energy of a 55 dB(A) residential baseline, dominating true LAeq even when brief.',
        uncertaintyAndLimitations: 'Requires 24-hour Class-1 IEC 61672 logging rather than 5-minute handheld spot checks.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'The Noise Pollution (Regulation and Control) Rules, 2000 prescribe enforceable daytime (06:00–22:00) and nighttime (22:00–06:00) dB(A) Leq limits of 75/70 (Industrial), 65/55 (Commercial), 55/45 (Residential), and 50/40 (Silence Zones).', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Verified in MoEFCC Gazette Notification S.O. 123(E) Noise Pollution Rules, 2000 and CPCB Schedule.', citationIds: ['REF-NOI-01'] },
      { suffix: '02', assertion: 'Nighttime heavy diesel freight movement along NH-44 and urban bypasses exposes >250,000 roadside residents in Kashmir to Lnight > 55–65 dB(A), exceeding both Indian Residential (45 dB(A)) and WHO sleep-disturbance thresholds.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Requires GIS building-population exposure overlay calibrated with 24-hour Class-1 roadside loggers across all 10 districts.', citationIds: ['REF-NOI-01', 'REF-NOI-02'], methodReq: '24-hour IEC 61672 Class-1 acoustic logging (1-second impulse + LAeq/Lnight) paired with CNOSSOS-EU GIS building facade exposure mapping.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Pollution Control Committee, J&K Traffic Police & Motor Vehicles Dept.', acronym: 'JKPCC / Traffic / MVD', mandate: 'Continuous ambient noise monitoring (NANMN), seizure of illegal pressure/multi-toned horns (CMVR Rule 119) and modified silencers (Rule 120), and acoustic zoning.', ownership: 'Ambient noise stations & roadside acoustic enforcement', scientificResp: 'Publishing 24-hour logarithmic LAeq/Lnight datasets (never arithmetic means) and horn/silencer enforcement statistics.', documentedFindings: 'Continuous real-time public noise telemetry is largely absent across Kashmir’s 10 district headquarters.', response: 'Traffic Police periodically crush seized modified silencers and pressure horns; annual seizure counts & JKPCC dB logs invited.', questions: ['How many permanent 24×7 Class-1 CPCB NANMN noise monitoring stations currently stream live LAeq data in Kashmir Division?', 'How many challans/seizures under CMVR Rules 119 & 120 were executed in 2024–2026?'], corrective: 'Deploy continuous 24×7 Class-1 NANMN stations in all 10 districts and mandate acoustic camera enforcement at major junctions.' },
    ],
    unansweredQuestions: ['To what extent does highway traffic noise along Dachigam, Overa-Aru, Kazinag, and Hokersar boundaries mask avian communication or trigger wildlife habitat avoidance?'],
    alternatives: [
      { title: 'Acoustic Horn-Camera Enforcement, Low-Noise Porous Asphalt & Freight Night Speed/Barrier Controls', mechanism: 'Combines automated microphone-array horn enforcement with signal synchronization (eliminating gridlock honking) and vegetative/earth-berm highway buffers.', evidencePrecedent: 'CPCB NANMN & European Environmental Noise Directive action plans.', feasibilityNote: 'Eliminates impulse horn peaks (>85 dB) immediately.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Establish 10-District 24-Hour Class-1 Logarithmic LAeq/Lnight Baseline & Ban Retail Sale of Pressure Horns', spec: 'Enforce supply-chain ban on non-type-approved multi-toned horns/silencers and publish GIS facade noise maps.', target: 'JKPCC, Traffic Police, MVD & District Magistrates', justification: 'Prevents chronic sleep disturbance, hypertension, and stress across urban Kashmir.', indicator: '100% logarithmic LAeq reporting + >=5 dB(A) L10 peak reduction at monitored junctions.' },
    ],
    references: [
      { id: 'REF-NOI-01', authorsOrBody: 'Ministry of Environment & Forests / Central Pollution Control Board (CPCB)', year: 2000, title: 'The Noise Pollution (Regulation and Control) Rules, 2000 (S.O. 123(E)) & Ambient Air Quality Standards in Respect of Noise', publicationOrSeries: 'Gazette of India / cpcb.nic.in', referenceType: 'Judicial Order / NGT', externalUrl: 'https://cpcb.nic.in/', provenanceNote: 'Establishes statutory 75/70, 65/55, 55/45, and 50/40 dB(A) Leq standards.' },
      { id: 'REF-NOI-02', authorsOrBody: 'World Health Organization (WHO)', year: 2018, title: 'Environmental Noise Guidelines for the European Region / Global Health Exposure Methodology (Lden & Lnight)', publicationOrSeries: 'World Health Organization', referenceType: 'Technical Institute Report', provenanceNote: 'International health-benchmark exposure-response functions for sleep disturbance and ischemic heart disease.' },
    ],
    dataGaps: ['Continuous 24-hour Class-1 LAeq, L10, L90, and Lnight time series across all 10 Kashmir Division districts.'],
    regulatoryLead: 'Noise Pollution (Regulation and Control) Rules, 2000 & Central Motor Vehicles Rules, 1989 (Rules 119 & 120).',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0032',
    slug: 'silent-zones-hospital-school-noise-compliance',
    title: 'Statutory Silence Zones Around Hospitals, Educational Institutions and Courts in Kashmir: Notification, Enforcement and Acoustic Compliance',
    subtitle: 'Auditing 100-metre statutory Silence Zone notification, physical signage, ambulance/horn discipline, and 50/40 dB(A) compliance around SKIMS, SMHS, LD Hospital, GB Pant, Universities, and District Hospitals',
    shortTitle: 'Silent Zones & Noise Compliance Audit',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Statutory Compliance Audit (Stage 01)',
    temporalScope: '2000–2026',
    heroImage: '/images/env-monitoring/kashmir-noise-hero.jpg',
    heroImageCaption: 'Auditing statutory 50 dB(A) day / 40 dB(A) night Silence Zone compliance across Kashmir’s tertiary and district hospitals and schools.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: '100-Metre Statutory Perimeters Around Major Hospitals, Universities, Schools & Courts in All 10 Districts',
    coordinates: [34.136, 74.800],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['16-atmospheric-environment'],
    disciplineIds: ['environmental-law', 'environmental-epidemiology', 'gis', 'spatial-statistics'],
    linkedKewModules: [
      { moduleName: 'Noise Pollution · Sensitive Receptors', route: '/environmental-monitoring/noise-pollution', contributionNote: 'SENSITIVE_RECEPTORS hospital/school registry.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0031', 'KEW-INV-0037', 'KEW-INV-0038'],
    relatedSectoralCodes: ['KEW-SR-2026-78'],
    scopeDifferentiation: 'Focused legal-acoustic audit of Rule 3(5) Silence Zone formal notification by District Magistrates/UT govt, physical boundary signage, kerbside auto/minibus stands outside hospital gates, and 50/40 dB(A) compliance.',
    centralQuestion: 'Which tertiary/district hospitals, educational campuses, and courts across Kashmir Division have been formally notified as statutory 100-metre Silence Zones under Rule 3(5) of the Noise Pollution Rules, 2000, and what actual LAeq/Lmax levels occur at inpatient wards?',
    scopingQuestions: [
      'Following the 2017 amendment to the Noise Pollution Rules (requiring explicit State/UT notification of Silence Zones), has the J&K administration formally notified 100 m Silence Zones around SKIMS Soura, SMHS, Lal Ded, Bone & Joint, Children’s Hospital Bemina, KU, and all 10 District Hospitals?',
      'How do unregulated minibus/auto-rickshaw stops and roadside commercial congestion directly outside hospital gates elevate ward-level Lnight above 40 dB(A)?',
    ],
    executiveKeyFindings: [
      'Under Noise Pollution Amendment Rules (2017), an area around a hospital, school, or court is enforceable as a statutory Silence Zone (50 dB day / 40 dB night) only when formally notified by the State/UT Government — making gazette notification verification essential.',
    ],
    chronology: [
      { period: '2000–2017', eventTitle: 'Noise Rules 2000 & S.O. 2555(E) (Aug 2017) Silence Zone Notification Requirement', documentedRecord: 'Clarified that 100 m Silence Zones around hospitals/schools/courts must be explicitly notified by competent government authority.', sourceRef: 'REF-SIL-01', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-SIL-01', name: 'Hospital Gate Traffic Regulation & No-Horn Signage', period: '2010–2026', executingAgency: 'District Magistrates, SMC/ULBs & Traffic Police', interventionType: 'Silence Zone Demarcation', reportedScaleOrOutlay: 'Municipal & traffic signage', status: 'Ongoing', documentedOutcome: 'Isolated signage present; formal post-2017 UT Silence Zone gazette list and inpatient-facade dB compliance unverified.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-law',
        disciplineName: 'Statutory Acoustic Compliance & Hospital Receptor Mapping',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: '100 m GIS buffer mapping around OSM/Health Dept. hospitals & schools + verification of post-2017 UT Silence Zone notifications + Class-1 facade LAeq.',
        equationOrMetricUsed: 'Exceedance ΔL_silence = LAeq,measured - 50 dB(A) [Day] / 40 dB(A) [Night]',
        empiricalFinding: 'Relocating transit boarding bays 150 m away from hospital gates and installing double-glazed ward windows sharply reduces patient sleep fragmentation.',
        uncertaintyAndLimitations: 'Requires official Home/Forest/Environment Dept. list of notified Silence Zones in J&K.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Under Noise Pollution (Regulation and Control) Amendment Rules, 2017 (S.O. 2555(E)), statutory 100-metre Silence Zones around hospitals, educational institutions, and courts require formal declaration/notification by the State/UT Government.', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Verified in MoEFCC Gazette Notification S.O. 2555(E), dated 10 August 2017.', citationIds: ['REF-SIL-01'] },
      { suffix: '02', assertion: 'Daytime and nighttime LAeq levels at the perimeter gates of SMHS, Lal Ded, and SKIMS Soura exceed the 50/40 dB(A) Silence Zone standard by >15–25 dB(A) due to transit stops and honking.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Observed qualitatively in urban traffic studies; requires calibrated 24-hr Class-1 logging paired with verification of formal Silence Zone notification.', citationIds: ['REF-SIL-01'], methodReq: 'Verify UT Silence Zone notification list and conduct 24-hr Class-1 facade logging at 20 tertiary and district hospitals.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Dept. of Forest, Ecology & Environment J&K, District Magistrates, SMC/ULBs & Traffic Police', acronym: 'JKFEE / DMs / Traffic', mandate: 'Formal gazette notification of all qualifying hospital/school/court Silence Zones, physical signage, relocation of noisy transit stands, and zero-horn enforcement.', ownership: 'Statutory Silence Zone register & 100 m perimeter traffic design', scientificResp: 'Quarterly acoustic compliance logging at tertiary and district hospitals.', documentedFindings: 'No consolidated public GIS map or gazette list of formally notified post-2017 Silence Zones in Kashmir Division is currently accessible.', response: 'No-horn boards placed near select tertiary hospitals; official Silence Zone notification schedule invited.', questions: ['Which exact hospitals, colleges/schools, and courts in Kashmir Division have been formally notified as Silence Zones since August 2017?'], corrective: 'Notify all tertiary/district hospitals and major campuses as statutory Silence Zones and redesign gate traffic/transit bays.' },
    ],
    unansweredQuestions: ['What is the indoor ICU/maternity-ward nighttime Lmax and LAeq across Srinagar’s major public hospitals?'],
    alternatives: [
      { title: '150 m Transit-Bay Setbacks, Visual Decibel Displays & Acoustic Hospital Facade Shielding', mechanism: 'Moves minibus/auto queuing away from hospital gates, installs live solar dB(A) warning boards, and enforces no-horn zones.', evidencePrecedent: 'CPCB Silence Zone Model Action Plan.', feasibilityNote: 'Low-cost urban traffic engineering with immediate clinical benefit.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Gazette-Notify All Qualifying Hospital/School Silence Zones Across All 10 Kashmir Districts', spec: 'Publish official GIS coordinates and 100 m Silence Zone notifications for every district/tertiary hospital, university, and court.', target: 'Govt. of J&K (Forest/Env Dept.) & All 10 Deputy Commissioners', justification: 'Closes the post-2017 legal enforceability gap.', indicator: '100% of tertiary & district hospitals formally notified and demarcated.' },
    ],
    references: [
      { id: 'REF-SIL-01', authorsOrBody: 'Ministry of Environment, Forest and Climate Change (MoEFCC)', year: 2017, title: 'Noise Pollution (Regulation and Control) Amendment Rules, 2017 — S.O. 2555(E) (Silence Zone Notification Mandate)', publicationOrSeries: 'Gazette of India Extraordinary', referenceType: 'Judicial Order / NGT', externalUrl: 'https://cpcb.nic.in/', provenanceNote: 'Establishes formal notification requirement and 50/40 dB(A) limits for 100 m Silence Zones.' },
    ],
    dataGaps: ['Official J&K gazette register of post-2017 notified Silence Zones and 24-hr hospital gate/ward Class-1 noise logs.'],
    regulatoryLead: 'Noise Pollution Rules, 2000 & Amendment Rules, 2017 (S.O. 2555(E)); Motor Vehicles (Driving) Regulations, 2017.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0033',
    slug: 'traffic-congestion-idling-fuel-emission-hotspots',
    title: "Urban Bottlenecks, Idling Fuel Wastage and Micro-Scale Vehicular Emission Hotspots Across Kashmir's Corridors",
    subtitle: 'Evaluating intersection queue lengths, stop-and-go idling fuel wastage, and micro-scale CO/NO2/BC hotspots across Lal Chowk, Pantha Chowk, Parimpora, Nowgam, Sopore, Anantnag, and Shopian freight routes',
    shortTitle: 'Traffic Congestion & Emission Hotspots',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Micro-Hotspot Charter (Stage 01)',
    temporalScope: '2010–2026',
    heroImage: '/images/env-monitoring/kashmir-traffic-urban.jpg',
    heroImageCaption: 'Evaluating stop-and-go congestion queues, idling fuel wastage, and street-canyon pollutant hotspots.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Candidate Junctions Across All 10 Districts (Lal Chowk, Pantha Chowk, Parimpora, Nowgam, Sopore, Bijbehara, Pampore, Pattan, Handwara, Shopian)',
    coordinates: [34.068, 74.805],
    primaryDomainId: '07-infrastructure-development',
    secondaryDomainIds: ['16-atmospheric-environment'],
    disciplineIds: ['gis', 'spatial-statistics', 'atmospheric-science', 'ecological-economics'],
    linkedKewModules: [
      { moduleName: 'Transportation Pollution · Hotspots & GIS', route: '/environmental-monitoring/transportation-pollution/gis-atlas', contributionNote: 'TRAFFIC_POLLUTION_HOTSPOTS spatial layer.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0026', 'KEW-INV-0027', 'KEW-INV-0034'],
    relatedSectoralCodes: ['KEW-SR-2026-35', 'KEW-SR-2026-36'],
    scopeDifferentiation: 'Focuses on micro-scale intersection kinematics (stop-and-go speed <10 km/h emission multipliers, idling fuel loss, and street-canyon dispersion) at candidate junctions across all 10 districts without pre-labelling unmeasured towns as verified hotspots.',
    centralQuestion: 'How much excess diesel/petrol fuel and localized PM2.5/NOx/CO pollution are generated by chronic stop-and-go congestion and roadside parking bottlenecks at Kashmir’s urban intersections and horticultural freight corridors?',
    scopingQuestions: [
      'By what multiplier do per-kilometre NOx, CO, and BC emissions rise when average corridor speeds drop from 35 km/h to <8–12 km/h at Parimpora, Pantha Chowk, Dalgate, Qamarwari, Sopore, and Anantnag?',
      'Have adaptive ITMS traffic signals in Srinagar measurably reduced intersection queue delay compared with manual regulation?',
    ],
    executiveKeyFindings: [
      'Speed-dependent COPERT emission curves show steep non-linear increases in fuel consumption, CO, HC, and PM2.5 per vehicle-km below 15 km/h under stop-and-go acceleration cycles.',
    ],
    chronology: [
      { period: '2020–2026', eventTitle: 'Srinagar Smart City ITMS Adaptive Signals & Junction Redesigns', documentedRecord: 'Intelligent Traffic Management System signals installed across Srinagar junctions; delay and idling reductions require empirical audit.', sourceRef: 'REF-CNG-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-CNG-01', name: 'ITMS Adaptive Traffic Signals, Multi-Level Parking & Freight Timing Windows', period: '2020–Present', executingAgency: 'SSCL, Traffic Police & SDA/SMC', interventionType: 'Congestion & Idling Management', reportedScaleOrOutlay: 'Smart City & urban mobility capex', status: 'Ongoing', documentedOutcome: 'Hardware installed; occupancy of multi-level parking vs on-street kerb blockage and signal green-wave sync under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'gis',
        disciplineName: 'Traffic Flow Kinematics & Street-Canyon Dispersion',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied: 'Floating-car GPS speed-delay logging + OSPM/CALINE4 line-source dispersion across candidate junctions in all 10 districts.',
        equationOrMetricUsed: 'EF(v) = a · v^(-b) + c + d · v²  (steep rise as v → 5 km/h)',
        empiricalFinding: 'Single-lane kerbside parking on 2-lane urban arterials halves effective saturation flow, triggering cascading queue spillback.',
        uncertaintyAndLimitations: 'Candidate junctions in all 10 districts must be empirically instrumented before ranking hotspot severity.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Stop-and-go urban driving at speeds <10–12 km/h increases per-kilometre fuel burn and tailpipe CO/PM emissions by 1.8–3.5× relative to steady 35–45 km/h cruise speeds.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established in CRRI (Central Road Research Institute) Indian idling fuel-loss studies and COPERT speed-emission functions.', citationIds: ['REF-CNG-01'] },
      { suffix: '02', assertion: 'Adaptive ITMS signal coordination in Srinagar has reduced peak-hour intersection idling time by >=25% across instrumented corridors.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Requires pre/post ITMS floating-car delay logs and signal uptime verification.', citationIds: ['REF-CNG-01'], methodReq: 'Analyze ITMS loop/camera queue lengths and GPS travel-time distributions across 25 Srinagar and district junctions.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Traffic Police, Srinagar Smart City Ltd. & Municipal Bodies', acronym: 'Traffic / SSCL / ULBs', mandate: 'Signal synchronization, kerbside parking enforcement, horticultural truck staging, and anti-idling campaigns.', ownership: 'ITMS network, multi-level car parks & highway truck terminals', scientificResp: 'Publishing corridor average peak speeds and multi-level parking utilization rates.', documentedFindings: 'Under-utilized off-street parking alongside persistent on-street double parking continues to choke key commercial corridors.', response: 'ITMS e-challans and tow-away drives active; corridor travel-time & parking occupancy data invited.', questions: ['What is the daily average occupancy (%) of public multi-level parking facilities in Srinagar versus adjacent on-street parking congestion?'], corrective: 'Enforce strict no-kerb-parking on transit corridors paired with dynamic green-wave signal timing and railway horticultural cold-chain terminals.' },
    ],
    unansweredQuestions: ['How many litres of fuel are wasted daily during autumn NH-44 / Mughal Road horticultural truck halts and urban junction queues?'],
    alternatives: [
      { title: 'Dedicated Bus/Emergency Lanes + Kerbside Parking Pricing & Rail Cold-Storage Hubs', mechanism: 'Frees outer carriageway lanes from parked cars and transfers bulk fruit movement to rail.', evidencePrecedent: 'CRRI urban congestion-pricing & bus-lane evaluations.', feasibilityNote: 'Cuts idling emissions without building costly new flyovers.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Instrument 30 Candidate Intersections Across All 10 Districts for Speed, Idling & Micro-Scale PM2.5/NO2', spec: 'Replace anecdotal hotspot claims with synchronized traffic-delay and breathing-zone air monitoring.', target: 'Traffic Police, SSCL, JKPCC & NIT Srinagar', justification: 'Identifies true high-exposure bottlenecks objectively.', indicator: '10-district empirical congestion & micro-exposure atlas published.' },
    ],
    references: [
      { id: 'REF-CNG-01', authorsOrBody: 'CSIR–Central Road Research Institute (CRRI) & MoRTH', year: 2021, title: 'Evaluation of Idling Fuel Consumption, Intersection Delay and Speed-Dependent Vehicular Emissions in Indian Cities', publicationOrSeries: 'CSIR-CRRI New Delhi Technical Series', referenceType: 'Technical Institute Report', provenanceNote: 'Benchmark engineering methodology for intersection idling fuel loss and low-speed emission multipliers.' },
    ],
    dataGaps: ['Peak-hour floating-car speed logs and breathing-zone (1.5 m height) NO2/BC measurements across district town centres.'],
    regulatoryLead: 'Motor Vehicles Act 1988, Motor Vehicles (Driving) Regulations 2017 & Smart City ITMS Standards.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0034',
    slug: 'public-transportation-deficiencies-modal-shift-costs',
    title: 'Public Transportation Deficiencies, Private Vehicle Dependency and the Environmental Cost of Incomplete Urban Mobility in Kashmir',
    subtitle: 'Auditing JKRTC/SSCL bus and private minibus capacity, post-dusk service disappearance, women/student mobility barriers, last-mile gaps, and passenger-km emission savings',
    shortTitle: 'Public Transport Deficiencies & Modal Shift',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Mobility Equity & Emissions Charter (Stage 01)',
    temporalScope: '1995–2026',
    heroImage: '/images/env-monitoring/kashmir-transport-hero.jpg',
    heroImageCaption: 'Evaluating public-transit fleet deficits, evening service cutoffs, and the environmental cost of forced private-vehicle dependency.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Srinagar Metropolitan Region, Inter-District JKRTC Routes & Rural Last-Mile Feeder Networks',
    coordinates: [34.075, 74.810],
    primaryDomainId: '07-infrastructure-development',
    secondaryDomainIds: ['16-atmospheric-environment', '11-urbanisation-land-use'],
    disciplineIds: ['gis', 'ecological-economics', 'atmospheric-science', 'spatial-statistics'],
    linkedKewModules: [
      { moduleName: 'Transportation Pollution Overview', route: '/environmental-monitoring/transportation-pollution', contributionNote: 'Bus vs private car/two-wheeler fleet ratios.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0026', 'KEW-INV-0033', 'KEW-INV-0035'],
    relatedSectoralCodes: ['KEW-SR-2026-35', 'KEW-SR-2026-36'],
    scopeDifferentiation: 'Examines the structural root cause of private motorization in Kashmir: severe public-bus per-1,000-resident deficits, absence of scheduled evening/winter services, unintegrated fares, and pedestrian/NMT neglect.',
    centralQuestion: 'How have inadequate public bus capacity, unreliable headways, and post-sunset transit disappearance driven household dependence on private cars and two-wheelers across Kashmir, and what PM2.5/CO2 reductions would a reliable 20% modal shift achieve?',
    scopingQuestions: [
      'How many operational public buses per 1,00,000 population currently serve Srinagar and the 9 other Kashmir districts compared with MoHUA national service-level benchmarks (60 buses per lakh urban population)?',
      'What happens to public-transit availability after 17:30–18:30 IST in winter across Srinagar and inter-district routes, forcing commuters into private vehicles?',
    ],
    executiveKeyFindings: [
      'MoHUA Urban Bus Service-Level Benchmarks recommend ~60 public buses per 100,000 urban residents; even after Smart City e-bus additions, Srinagar and district towns remain far below national transit capacity norms, especially after dusk.',
    ],
    chronology: [
      { period: '2000–2026', eventTitle: 'Decline of Public Transit Modal Share & 2023–2024 Smart City E-Bus Introduction', documentedRecord: 'Decades of ageing minibus fragmentation drove private car growth; initial 100–200 e-bus fleet introduced in Srinagar.', sourceRef: 'REF-PUB-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-PUB-01', name: 'JKRTC / Smart City E-Bus Operations & Suburban Banihal–Baramulla Rail Link', period: '2013–2026', executingAgency: 'JKRTC, SSCL & Northern Railway', interventionType: 'Public Mass Transit', reportedScaleOrOutlay: 'PM-eBus Sewa / Smart City & Indian Railways capex', status: 'Ongoing', documentedOutcome: 'Banihal–Baramulla EMU rail and initial Srinagar e-buses demonstrate strong ridership demand where reliable service exists, but last-mile feeder integration and evening frequency remain weak.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'ecological-economics',
        disciplineName: 'Transit Accessibility & Per-Passenger-Km Emission Intensity',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'GTFS/OSM isochrone accessibility mapping + g CO₂e and mg PM2.5 per passenger-kilometre (PKM) across car, two-wheeler, diesel minibus, e-bus, and electric rail.',
        equationOrMetricUsed: 'EI_PKM = EF_veh / Occupancy_avg;  ΔE = PKM_shifted · (EI_car - EI_transit)',
        empiricalFinding: 'An occupied electric/BS-VI bus or Baramulla–Sangaldan electric train emits 75–92% less PM2.5 and CO₂ per passenger-km than single-occupancy cars.',
        uncertaintyAndLimitations: 'Requires route-wise JKRTC/e-bus ridership, headway adherence, and last-bus timestamp logs.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Ministry of Housing and Urban Affairs (MoHUA) Service Level Benchmarks specify ~60 public buses per 100,000 population formillion-plus/capital cities alongside scheduled evening hours and universal accessibility.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Established in MoHUA Urban Transport Service Level Benchmarks, Govt. of India.', citationIds: ['REF-PUB-01'] },
      { suffix: '02', assertion: 'Guaranteed 10-minute peak headways, post-21:00 evening bus operations, and feeder shuttles at all Kashmir Valley railway stations would shift >=18% of daily car commuter trips within 24 months.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Requires commuter stated/revealed-preference survey and GTFS headway audit.', citationIds: ['REF-PUB-01'], methodReq: 'Conduct 10-district commuter modal-choice survey and GTFS real-time headway/evening-cutoff audit.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Road Transport Corporation, Housing & Urban Development Dept. & Transport Dept.', acronym: 'JKRTC / HUDD / MVD', mandate: 'Provision of adequate, safe, scheduled daytime and evening public passenger transport and feeder connectivity to railway stations.', ownership: 'Public bus fleet, route permits, terminals & fare integration', scientificResp: 'Publishing open GTFS schedules, buses-per-lakh ratios, and evening service compliance.', documentedFindings: 'Severe shortage of scheduled evening transit and unorganized minibus halting patterns push commuters into private vehicles.', response: 'Srinagar e-bus fleet operational and PM-eBus Sewa allocations underway; GTFS ridership & evening operating hours invited.', questions: ['How many public buses operate in Srinagar after 19:00 IST during winter (Nov–Feb), and what is the current buses-per-lakh ratio in each of the 10 Kashmir districts?'], corrective: 'Expand public e-bus fleet to MoHUA 60-bus/lakh benchmark, mandate 06:30–21:30 guaranteed schedules, and synchronize station feeders with Baramulla–Banihal trains.' },
    ],
    unansweredQuestions: ['Why do several Kashmir Valley railway stations (Pampore, Kakapora, Awantipora, Bijbehara, Pattan, Hamre) sit kilometres from town centres without dedicated scheduled public feeder buses?'],
    alternatives: [
      { title: 'Integrated Rail + E-Bus Trunk-and-Feeder Network With Unified Smart Card', mechanism: 'Uses the electrified Baramulla–Srinagar–Banihal railway as the regional spine fed by scheduled district e-buses and safe pedestrian footpaths.', evidencePrecedent: 'Alpine regional S-Bahn + postbus integration (Switzerland/Austria).', feasibilityNote: 'Leverages already-built rail infrastructure for massive valley-wide emission cuts.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Open GTFS Transit Data & Launch Synchronized Feeder Shuttles at All Valley Rail Stations', spec: 'Mandate GPS schedule adherence, guaranteed evening buses until 21:00 IST, and dedicated rail-station shuttles.', target: 'JKRTC, SSCL, Transport Dept. & Northern Railway', justification: 'Unlocks immediate modal shift from private cars.', indicator: 'Open GTFS live feed + >=25% increase in daily public-transit ridership.' },
    ],
    references: [
      { id: 'REF-PUB-01', authorsOrBody: 'Ministry of Housing and Urban Affairs (MoHUA), Government of India', year: 2023, title: 'Service Level Benchmarks for Urban Transport & PM-eBus Sewa Operational Guidelines', publicationOrSeries: 'MoHUA New Delhi Statutory Mobility Standards', referenceType: 'Technical Institute Report', provenanceNote: 'Defines national benchmark of 60 buses per lakh urban population and service reliability metrics.' },
    ],
    dataGaps: ['Route-wise passenger boardings, post-18:00 operating bus counts, and household modal-share survey across all 10 districts.'],
    regulatoryLead: 'National Urban Transport Policy (NUTP), MoHUA Service Level Benchmarks & Motor Vehicles Act Stage-Carriage Permits.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0035',
    slug: 'electric-mobility-sustainable-transport-transition-kashmir',
    title: 'Electric Mobility in a Cold Himalayan Valley: Smart-City E-Buses, E-Rickshaws, Winter Battery Performance and Lifecycle Emissions',
    subtitle: 'Evaluating sub-zero lithium-ion range derating, cabin heating loads, winter electricity grid reliability/carbon intensity, charging infrastructure, lead-acid vs Li-ion e-rickshaw waste, and lifecycle abatement',
    shortTitle: 'Electric Mobility & Cold-Climate EV Transition',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Lifecycle & Engineering Charter (Stage 01)',
    temporalScope: '2020–2026',
    heroImage: '/images/env-monitoring/kashmir-transport-hero.jpg',
    heroImageCaption: 'Assessing real-world sub-zero winter EV performance, grid charging resilience, and battery end-of-life management in Kashmir.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Srinagar E-Bus Depots, Urban/Town E-Rickshaw Networks & NH-44 / Tourist Corridor Charging Stations',
    coordinates: [34.080, 74.795],
    primaryDomainId: '07-infrastructure-development',
    secondaryDomainIds: ['16-atmospheric-environment', '15-solid-waste-sewage'],
    disciplineIds: ['environmental-engineering', 'ecological-economics', 'atmospheric-science', 'ecotoxicology'],
    linkedKewModules: [
      { moduleName: 'Transportation Pollution Overview', route: '/environmental-monitoring/transportation-pollution', contributionNote: 'EV penetration and tailpipe zero-emission tracking.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0034', 'KEW-INV-0027', 'KEW-INV-0029'],
    relatedSectoralCodes: ['KEW-SR-2026-34', 'KEW-SR-2026-82'],
    scopeDifferentiation: 'Evaluates Himalayan cold-weather EV engineering (sub-zero kWh/km energy consumption, winter hydro generation dip vs thermal power imports, and informal lead-acid e-rickshaw battery dumping).',
    centralQuestion: 'How do sub-zero Kashmir winters (-6 °C to +4 °C), steep gradients, and seasonal winter thermal-grid imports affect the real-world range, reliability, and well-to-wheel emission savings of e-buses, e-rickshaws, and private EVs, and how are spent batteries managed?',
    scopingQuestions: [
      'What is the measured winter (Dec–Feb) versus summer (Jun–Aug) kWh/km consumption and daily route completion rate of Srinagar Smart City e-buses?',
      'What proportion of Kashmir’s proliferating e-rickshaws use uncertified lead-acid batteries recycled informally, risking soil/water lead contamination under Battery Waste Management Rules, 2022?',
    ],
    executiveKeyFindings: [
      'Even accounting for winter cabin heating and seasonal Northern Grid power imports when run-of-river Himalayan hydro dips, electric buses eliminate 100% of breathing-zone tailpipe PM2.5, black carbon, and NOx inside Srinagar’s trapped winter inversion layer.',
    ],
    chronology: [
      { period: '2022–2026', eventTitle: 'Expansion of E-Rickshaws & Commissioning of Srinagar Smart City Electric Buses', documentedRecord: 'Rapid last-mile e-rickshaw adoption across districts and Smart City e-bus fleet deployment in Srinagar.', sourceRef: 'REF-EVM-01', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-EVM-01', name: 'Srinagar Smart City E-Bus Fleet, FAME/PM E-DRIVE & E-Rickshaw Expansion', period: '2022–Present', executingAgency: 'SSCL, JKRTC, MVD & KPDCL', interventionType: 'Fleet Electrification', reportedScaleOrOutlay: 'FAME-II / Smart City / PM-eBus Sewa', status: 'Ongoing', documentedOutcome: 'Zero tailpipe emissions on served routes; public fast-charging uptime, winter range derating, and battery EPR recycling compliance under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-engineering',
        disciplineName: 'Well-to-Wheel (WTW) Lifecycle & Cold-Climate Traction Analysis',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'Seasonal WTW GHG/PM2.5 balance incorporating winter J&K hydro-thermal grid emission factor + Battery Waste Management Rules 2022 EPR audit.',
        equationOrMetricUsed: 'E_WTW = (kWh/km)_season · EF_grid,season / η_charge  vs  EF_diesel,inversion',
        empiricalFinding: 'Eliminating ground-level diesel black carbon inside a <200 m winter inversion delivers far higher local health benefit per tonne abated than remote power-plant stack emissions.',
        uncertaintyAndLimitations: 'Requires depot meter kWh logs and MVD lead-acid vs Li-ion e-rickshaw registry.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Sub-zero ambient temperatures increase electric-bus energy consumption (kWh/km) by ~20–35% due to battery internal resistance and cabin heating, requiring thermal pre-conditioning at depots.', sourceCategory: 'Scientific Literature', classification: 'Documented', basis: 'Established in cold-climate transit e-bus empirical studies (IEEE / ICCT cold-weather EV evaluations).', citationIds: ['REF-EVM-01'] },
      { suffix: '02', assertion: 'Over 60% of spent lead-acid batteries from three-wheeled e-rickshaws in Kashmir Division enter informal acid-draining/smelting channels outside CPCB Extended Producer Responsibility (EPR) portals.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Requires audit of MVD registered e-rickshaws against JKPCC authorized battery-recycler EPR certificates.', citationIds: ['REF-EVM-02'], methodReq: 'Cross-audit RTO e-rickshaw registrations against JKPCC Battery Waste Management Rules 2022 EPR collection manifests.' },
    ],
    accountability: [
      { suffix: '01', institution: 'SSCL, JKRTC, KPDCL, MVD & JKPCC', acronym: 'SSCL / KPDCL / JKPCC', mandate: 'Dedicated winter depot feeder reliability, public EV charging network, safe e-rickshaw route zoning, and strict Battery Waste EPR enforcement.', ownership: 'E-bus depots, grid substations & EPR battery registry', scientificResp: 'Publishing seasonal e-bus kWh/km, diesel litres displaced, and authorized battery-recycling tonnage.', documentedFindings: 'Rapid e-rickshaw growth occurred without designated charging bays or public EPR battery-return tracking.', response: 'Dedicated depot charging infrastructure operational for e-buses; winter performance & EPR battery data invited.', questions: ['What was the winter (Dec–Feb) vs summer kWh/km efficiency and fleet availability (%) of Srinagar e-buses in 2024–2026?', 'How many authorized EV/lead-acid battery collection and recycling facilities are registered with JKPCC?'], corrective: 'Mandate plug-in depot thermal pre-conditioning, solar-assisted daytime charging, and 100% EPR tracking on e-rickshaw batteries.' },
    ],
    unansweredQuestions: ['Which mountain tourist corridors (Gulmarg, Pahalgam, Sonamarg, Yusmarg, Doodhpathri) can transition 100% of commercial tourist shuttles beyond base-town parking hubs to electric buses?'],
    alternatives: [
      { title: 'Alpine Eco-Portal Park-and-Ride Electric Shuttles (Zermatt / Tangmarg–Gulmarg Model)', mechanism: 'Intercepts private ICE tourist cars at base hubs (Tangmarg, Pahalgam base, Gagangir) and serves upper alpine meadows exclusively via electric shuttles.', evidencePrecedent: 'Car-free Alpine resort portals (Zermatt, Switzerland).', feasibilityNote: 'Protects fragile glacier/subalpine airsheds while relieving narrow mountain road gridlock.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Enforce 100% EPR Battery Tracking & Pilot Electric Park-and-Ride Portals for Gulmarg, Pahalgam & Sonamarg', spec: 'Close informal lead-acid battery dumping and deploy electric shuttle portals at fragile alpine tourist gateways.', target: 'JKPCC, MVD, Tourism Dept. & JKRTC', justification: 'Prevents toxic lead contamination while cutting black carbon near glaciers.', indicator: '100% EPR battery manifest compliance + operational alpine electric park-and-ride hubs.' },
    ],
    references: [
      { id: 'REF-EVM-01', authorsOrBody: 'International Council on Clean Transportation (ICCT) & MoHUA', year: 2023, title: 'Real-World Cold-Weather Performance and Lifecycle Emissions of Battery-Electric Transit Buses', publicationOrSeries: 'ICCT Technical Briefing / MoHUA E-Bus Advisory', referenceType: 'Technical Institute Report', provenanceNote: 'Quantifies winter range derating and depot pre-conditioning solutions.' },
      { id: 'REF-EVM-02', authorsOrBody: 'Ministry of Environment, Forest and Climate Change (MoEFCC)', year: 2022, title: 'Battery Waste Management Rules, 2022 (Extended Producer Responsibility Mandate)', publicationOrSeries: 'Gazette of India Notification', referenceType: 'Judicial Order / NGT', externalUrl: 'https://cpcb.nic.in/', provenanceNote: 'Enforceable EPR framework for EV and lead-acid traction batteries.' },
    ],
    dataGaps: ['Depot-level winter vs summer kWh/km logs for Srinagar e-buses and JKPCC Battery EPR collection tonnage.'],
    regulatoryLead: 'Battery Waste Management Rules 2022, Central Motor Vehicles Rules (E-Rickshaw provisions) & PM-eBus Sewa Guidelines.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0036',
    slug: 'highway-expansion-road-construction-ecological-fragmentation',
    title: "Highway Widening, Ring-Road Alignment and Ecological Fragmentation Across Kashmir's Wetlands, Karewas and Wildlife Corridors",
    subtitle: 'Auditing NH-44 four-laning, Srinagar Semi-Ring Road, orchard/paddy acquisition, Karewa borrow-pit earthfill, wetland culvert severance, and mountain slope cut-and-dump practices',
    shortTitle: 'Highway Expansion & Ecological Fragmentation',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Spatial & EIA Compliance Charter (Stage 01)',
    temporalScope: '2010–2026',
    heroImage: '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
    heroImageCaption: 'Auditing linear highway embankments, Karewa earthfill borrow pits, wetland sheet-flow severance, and slope cut-spoil disposal.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'NH-44 Corridor, Srinagar Semi-Ring Road (Pulwama–Budgam–Ganderbal–Bandipora), NH-701, Mughal Road & Sinthan/Zojila Approaches',
    coordinates: [34.015, 74.745],
    primaryDomainId: '07-infrastructure-development',
    secondaryDomainIds: ['02-wetlands-floodplains', '10-mining-quarrying', '09-forests-biodiversity'],
    disciplineIds: ['environmental-impact-assessment', 'geomorphology', 'geotechnical-engineering', 'hydrology', 'conservation-biology', 'remote-sensing', 'gis'],
    linkedKewModules: [
      { moduleName: 'Earth & Human Impact · Change Detection', route: '/earth-human-impact/change-detection-observatory', contributionNote: 'Corridor land-conversion & borrow-pit scars.' },
      { moduleName: 'Karewa Disappearance Investigation (KEW-INV-0004)', route: '/environmental-investigations/reports/disappearance-of-kashmirs-karewas', contributionNote: 'Linked embankment earthfill sourcing.' },
      { moduleName: 'Protected Network · Wildlife Corridors', route: '/protected-network/corridors-and-connectivity', contributionNote: 'Road-corridor barrier intersections.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0006', 'KEW-INV-0016', 'KEW-INV-0026'],
    relatedSectoralCodes: ['KEW-SR-2026-17', 'KEW-SR-2026-25', 'KEW-SR-2026-29'],
    scopeDifferentiation: 'Complements geotechnical slope dossier KEW-SR-2026-29 by auditing EIA Notification 2006 clearance conditions, linear project-splitting exemptions, floodplain embankment cross-drainage adequacy, and compensatory tree/wetland compliance on major Kashmir highway packages.',
    centralQuestion: 'Have major highway and ring-road projects across Kashmir complied with Environmental Clearance / EMP conditions regarding cross-drainage culverts across floodplains, muck-disposal containment, Karewa borrow-pit restoration, and wildlife underpasses?',
    scopingQuestions: [
      'How many hectares of irrigated paddy land, productive apple/almond orchards, and wetland floodways were converted by raised highway embankments between 2010 and 2026, and do installed box-culverts pass 50-year flood sheet-flows without backwater ponding?',
      'Were linear highway packages split into <100 km segments exempting them from statutory Category-A Environmental Impact Assessment, and what post-construction EMP audits exist?',
    ],
    executiveKeyFindings: [
      'Raised earthen highway embankments across the Jhelum–Doodhganga–Hokersar–Wular floodplain act as hydraulic levees during high-water events unless engineered with high-capacity viaducts/culverts, while embankment fill demand has driven extensive Karewa bench excavation (KEW-INV-0004).',
    ],
    chronology: [
      { period: '2012–2026', eventTitle: 'NH-44 Four-Laning, Srinagar Semi-Ring Road & NGT Muck/Karewa Scrutiny', documentedRecord: 'Large-scale corridor expansion accompanied by NGT proceedings on unscientific Karewa clay excavation and tributary muck dumping.', sourceRef: 'REF-HWY-01', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-HWY-01', name: 'NH-44 Widening, Srinagar Ring Road & Mountain Pass Highway Packages', period: '2012–Present', executingAgency: 'NHAI, NHIDCL, BRO & PW(R&B)', interventionType: 'Linear Highway Infrastructure', reportedScaleOrOutlay: 'Bharatmala / PMDP highway packages', status: 'Ongoing', documentedOutcome: 'Travel-time gains on completed stretches; borrow-pit reclamation, muck-dumping walls, and floodplain cross-drainage adequacy under audit.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-impact-assessment',
        disciplineName: 'Linear Infrastructure EIA & Floodplain Hydraulics',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'Sentinel-1/2 embankment footprint & backwater ponding analysis + audit of EIA Notification 2006 Item 7(f) applicability and EMP six-monthly compliance reports.',
        equationOrMetricUsed: 'Culvert Afflux Δh = (V_c² / 2g C_d²) - (V_1² / 2g);  Effective Mesh Size m_eff',
        empiricalFinding: 'Undersized embankment culverts across Doodhganga/Bemina/Narkara/Shalteng floodways elevate upstream flood stages during extreme rain events.',
        uncertaintyAndLimitations: 'Requires package-wise hydraulic design calculations and MoEFCC PARIVESH six-monthly compliance filings.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'NGT orders have documented unscientific Karewa earth excavation and improper muck disposal by highway contractors in Kashmir, directing environmental compensation and slope/pit remediation.', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Recorded in National Green Tribunal orders concerning Budgam/Pulwama Karewa excavation for Ring Road/highway earthfill.', citationIds: ['REF-HWY-01'] },
      { suffix: '02', assertion: 'Cross-drainage culvert capacity along raised Ring Road segments crossing the Budgam–Narkara–Hokersar floodway is insufficient to pass a 2014-magnitude flood hydrograph without >0.5 m upstream afflux.', sourceCategory: 'Hydrological & Telemetry Series', classification: 'Unverified', basis: 'Requires 2D HEC-RAS hydrodynamic modelling using exact as-built culvert invert/span dimensions from NHAI.', citationIds: ['REF-HWY-01'], methodReq: 'Run 2D HEC-RAS floodway routing with NHAI as-built culvert/viaduct geometry across Budgam–Hokersar–Bemina.' },
    ],
    accountability: [
      { suffix: '01', institution: 'NHAI, NHIDCL, PW(R&B), Dept. of Geology & Mining & JKPCC', acronym: 'NHAI / NHIDCL / JKPCC', mandate: 'Compliance with EIA Notification 2006 Item 7(f), designated muck-disposal walls, licensed non-heritage borrow sourcing, floodplain viaducts, and compensatory afforestation.', ownership: 'National and UT highway expansion packages', scientificResp: 'Public disclosure of hydrological afflux studies, borrow-pit reclamation certificates, and wildlife passage designs.', documentedFindings: 'NGT penalized unscientific Karewa borrow-pit excavation linked to highway embankment construction.', response: 'Contractors directed to source earthfill only with valid permits and construct gabion muck walls; PARIVESH EMP filings invited.', questions: ['What total cubic metres of embankment fill were sourced from Kashmir Karewas for Ring Road and NH-44 packages, and how many borrow sites have completed graded vegetative reclamation?', 'Were hydraulic backwater afflux models peer-reviewed for all wetland/floodway crossings?'], corrective: 'Mandate elevated viaducts (not earthen embankments) across notified wetland floodways and enforce escrow-backed borrow-pit restoration.' },
    ],
    unansweredQuestions: ['How many mature roadside heritage Chinar, walnut, and poplar trees were felled across Kashmir highway expansions (2014–2026), and what is the verified survival rate of compensatory saplings?'],
    alternatives: [
      { title: 'Pile-Supported Viaducts Across Floodplains + Recycled C&D/Dredge-Sand Sub-Base', mechanism: 'Uses open viaduct spans across wetland floodways and substitutes screened inert C&D/river-dredge material for virgin Karewa tableland clay.', evidencePrecedent: 'WII Eco-Friendly Linear Infrastructure Guidelines & IRC floodplain bridge norms.', feasibilityNote: 'Preserves flood conveyance and saves Plio-Pleistocene Karewas.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Audit All Highway Floodway Crossings, Muck Sites & Compensatory Tree Survival via High-Resolution GIS', spec: 'Publish package-by-package EMP compliance cards covering borrow pits, muck walls, culverts, and geo-tagged sapling survival.', target: 'NHAI, NHIDCL, JKPCC & Forest Dept.', justification: 'Prevents highway embankments from compounding future flood and landslide disasters.', indicator: '100% of highway packages mapped on KEW Spatial Investigation Atlas with EMP audit scores.' },
    ],
    references: [
      { id: 'REF-HWY-01', authorsOrBody: 'National Green Tribunal (NGT) & Wildlife Institute of India (WII)', year: 2023, title: 'NGT Orders on Kashmir Karewa Excavation / Highway Muck Disposal & WII Eco-Friendly Measures to Mitigate Impacts of Linear Infrastructure', publicationOrSeries: 'greentribunal.gov.in & WII Dehradun Statutory Guidelines', referenceType: 'Judicial Order / NGT', externalUrl: 'https://www.greentribunal.gov.in/', provenanceNote: 'Statutory judicial and ecological baseline for linear highway scrutiny.' },
    ],
    dataGaps: ['As-built culvert hydraulic schedules, total felled-tree vs surviving-sapling geo-tags, and borrow-pit closure certificates.'],
    regulatoryLead: 'EIA Notification 2006 (Item 7f), J&K Preservation of Specified Trees Act 1969, NGT Directives & WII Linear Infrastructure Guidelines.',
  }),

  makeTransportCharter({
    code: 'KEW-INV-0037',
    slug: 'transportation-pollution-human-exposure-disease-burden',
    title: 'Roadside Communities, Commuters and Traffic Personnel: Human Exposure and Cardiorespiratory Disease Burden from Transportation Pollution in Kashmir',
    subtitle: 'Epidemiological exposure assessment of near-road PM2.5, ultrafine black carbon, NO2, benzene, and chronic Lden/Lnight noise across traffic police, shopkeepers, schoolchildren, and roadside residents',
    shortTitle: 'Transport Pollution & Human Disease Burden',
    seriesId: 'transport-air-noise',
    seriesTitle: 'Transportation, Air Quality & Noise Series',
    priority: 'Critical',
    status: 'proposed',
    statusLabel: 'Proposed Epidemiological Charter (Stage 01)',
    temporalScope: '2013–2026',
    heroImage: '/images/env-monitoring/kashmir-air-pollution-monitoring.jpg',
    heroImageCaption: 'Evaluating occupational and residential near-road exposure to PM2.5, black carbon, NO2, and chronic traffic noise across Kashmir.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Occupational Traffic Booths, Roadside Schools/Markets & High-Density Commuter Corridors Across All 10 Districts',
    coordinates: [34.086, 74.799],
    primaryDomainId: '16-atmospheric-environment',
    secondaryDomainIds: ['18-environmental-governance'],
    disciplineIds: ['environmental-epidemiology', 'atmospheric-science', 'ecotoxicology', 'spatial-statistics'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Health Signals', route: '/environmental-monitoring/environmental-health', contributionNote: 'Cardiorespiratory & acoustic exposure indicators.' },
      { moduleName: 'Transportation Pollution · Exposure', route: '/environmental-monitoring/transportation-pollution', contributionNote: 'Near-road population buffer statistics.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0027', 'KEW-INV-0028', 'KEW-INV-0031', 'KEW-INV-0032'],
    relatedSectoralCodes: ['KEW-SR-2026-35', 'KEW-SR-2026-78'],
    scopeDifferentiation: 'Integrates occupational spirometry/audiometry exposure cohorts (traffic police, street vendors, bus drivers, roadside schoolchildren) with SKIMS/GMC respiratory and cardiovascular surveillance, strictly separating measured clinical cohorts from modelled Global Burden of Disease (GBD) attributable fractions.',
    centralQuestion: 'What is the measured personal inhalation dose of PM2.5/black carbon and occupational hearing/cardiovascular burden among Kashmir’s traffic personnel, commuters, and <100 m roadside schoolchildren, and how do winter pollution spikes correspond with hospital respiratory admissions?',
    scopingQuestions: [
      'By what factor does personal breathing-zone PM2.5 and black-carbon exposure at street-canyon traffic booths exceed rooftop ambient CAAQMS station readings?',
      'What prevalence of obstructive/restrictive spirometry deficits (FEV1/FVC) and noise-induced threshold shifts (4 kHz notch) exists among long-serving J&K Traffic Police and commercial drivers?',
    ],
    executiveKeyFindings: [
      'Rooftop ambient monitors located 10–15 m above ground routinely underestimate kerbside personal exposure to fresh diesel black carbon, ultrafine particles, NO2, and Lmax horn impulses by 1.5–3×.',
    ],
    chronology: [
      { period: '2015–2026', eventTitle: 'SKIMS / GMC Pulmonary & COPD Burden Studies in Kashmir', documentedRecord: 'Clinical studies documented high COPD and winter acute respiratory exacerbation burdens in Kashmir alongside biomass, smoking, and ambient particulate co-exposures.', sourceRef: 'REF-HLT-01', significance: 'Baseline' },
    ],
    interventions: [
      { id: 'INT-HLT-01', name: 'Occupational Protective Masks/Booths & Hospital Respiratory Surveillance', period: '2018–Present', executingAgency: 'Health & Medical Education Dept., SKIMS, GMC & Traffic Police', interventionType: 'Occupational & Public Health Protection', reportedScaleOrOutlay: 'Departmental health & welfare budgets', status: 'Ongoing', documentedOutcome: 'Periodic health camps held for traffic staff; systematic N95/HEPA traffic booths and pollutant-linked emergency-room registries absent.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-epidemiology',
        disciplineName: 'Environmental & Occupational Epidemiology',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: 'Time-series Poisson regression of daily emergency respiratory/cardiac admissions vs lagged PM2.5/NO2/T_min (controlling for winter viral influenza & heating confounders) + personal nephelometer/dosimeter cohorts.',
        equationOrMetricUsed: 'RR = exp[β · ΔC];  Inhaled Dose D = ∫ C_bz(t) · V_E(t) dt',
        empiricalFinding: 'Controlling rigorously for winter respiratory viruses, indoor Kangri/biomass smoke, and tobacco use is mandatory to avoid misattributing all winter COPD admissions to traffic alone.',
        uncertaintyAndLimitations: 'Modelled attributable fractions are never reported as confirmed clinical deaths without local cohort adjustment.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Clinical epidemiological research from SKIMS/GMC Srinagar indicates a high regional prevalence of chronic obstructive pulmonary disease (COPD) and winter respiratory hospitalisations influenced by multi-source particulate exposure and cold temperatures.', sourceCategory: 'Scientific Literature', classification: 'Provisionally Supported', basis: 'Supported by SKIMS Srinagar BOLD cohort pulmonary scoping literature (Koul et al.); exact single-article DOI citation binding queued for scoping review.', citationIds: ['REF-HLT-01'], methodReq: 'Bind exact DOI-verified SKIMS BOLD spirometry prevalence tables and stratify indoor biomass/tobacco confounders.' },
      { suffix: '02', assertion: 'Traffic personnel stationed >6 hours/day at unventilated Srinagar and NH-44 intersections exhibit statistically significant FEV1 decline and 4 kHz noise-induced hearing loss relative to indoor administrative controls.', sourceCategory: 'Field Survey Protocol', classification: 'Unverified', basis: 'Documented in other Indian metros; requires anonymized ethical occupational spirometry + audiometry cohort in Kashmir.', citationIds: ['REF-HLT-01', 'REF-HLT-02'], methodReq: 'IRB-approved paired personal PM2.5/BC + noise dosimetry, spirometry, and pure-tone audiometry cohort for J&K Traffic Police.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Health & Medical Education Dept. J&K, J&K Traffic Police Welfare & JKPCC', acronym: 'H&ME / Traffic / JKPCC', mandate: 'Occupational health protection of roadside personnel, school air-quality advisories during winter smog, and environmental-health surveillance.', ownership: 'Occupational health screening & public AQI health advisories', scientificResp: 'Linking anonymized daily hospital respiratory/cardiac emergency tallies with CAAQMS air-quality indices.', documentedFindings: 'No automated high-AQI school outdoor-activity protocol or positive-pressure HEPA traffic booths operate across Srinagar congestion points.', response: 'Periodic medical check-ups organized for traffic personnel; structured environmental-epidemiology linkage invited.', questions: ['Are J&K Traffic Police personnel provided certified N95/FFP2 respirators, annual audiometry/spirometry screening, and HEPA-filtered intersection booths during winter smog peaks?'], corrective: 'Deploy HEPA-filtered acoustic traffic booths, annual occupational spirometry/audiometry, and school AQI health protocols.' },
    ],
    unansweredQuestions: ['How many schools across Srinagar and NH-44 towns have classrooms located within <25 m of heavy diesel traffic corridors without vegetative or acoustic shielding?'],
    alternatives: [
      { title: 'Automated Camera Enforcement (Reducing Human Junction Exposure) + School Clean-Air Buffers', mechanism: 'Replaces prolonged manual standing in toxic exhaust plumes with ITMS camera management and installs green barriers/HEPA filtration in high-exposure roadside schools.', evidencePrecedent: 'WHO occupational roadside protection & school clean-air zone standards.', feasibilityNote: 'Immediately cuts acute occupational inhalation doses.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Institute Annual Spirometry/Audiometry & Filtered Booths for Traffic Staff + School Winter Smog Protocol', spec: 'Pair occupational health screening with automated AQI-linked school outdoor-exercise advisories when PM2.5 > 120 µg/m³.', target: 'J&K Health Dept., School Education Dept., Traffic Police & JKPCC', justification: 'Protects the two highest-vulnerability roadside groups (children and traffic personnel).', indicator: '100% traffic-staff annual screening + active school AQI health advisory system.' },
    ],
    references: [
      { id: 'REF-HLT-01', authorsOrBody: 'Scoping Literature Review Target — SKIMS Srinagar BOLD Pulmonary Cohort (Koul et al.)', year: 2016, title: 'Scoping Literature Review Target: Prevalence of chronic airflow limitation and respiratory morbidity in Kashmir, North India', publicationOrSeries: 'Scoping Literature Review Target (Exact Single-Journal DOI Binding Pending)', referenceType: 'Technical Institute Report', provenanceNote: 'Reclassified from dual-journal composite reference to scoping literature review target pending single-DOI verification.' },
      { id: 'REF-HLT-02', authorsOrBody: 'World Health Organization (WHO)', year: 2021, title: 'WHO Global Air Quality Guidelines (PM2.5, PM10, Ozone, NO2, SO2 and CO)', publicationOrSeries: 'World Health Organization, Geneva', referenceType: 'Technical Institute Report', provenanceNote: 'International health concentration-response benchmark (distinct from statutory Indian NAAQS).' },
    ],
    dataGaps: ['Personal breathing-zone PM2.5/BC + noise dosimetry datasets and anonymized daily emergency-room respiratory time series in Kashmir.'],
    regulatoryLead: 'Occupational Safety, Health and Working Conditions Standards, CPCB NAAQS & Noise Pollution Rules 2000.',
  }),

  // ═══════════════════════════════════════════════════════════════════════════
  // SERIES 6: SECURITY FORCE TRANSPORTATION & STATUTORY COMPLIANCE (KEW-INV-0038)
  // ═══════════════════════════════════════════════════════════════════════════
  makeTransportCharter({
    code: 'KEW-INV-0038',
    slug: 'security-force-transportation-emissions-noise-statutory-compliance',
    title: 'Security Force Transportation in Kashmir: Vehicular Emissions, Environmental Noise and Statutory Pollution Control Compliance',
    subtitle: 'An independent assessment of institutional transportation, atmospheric emissions, environmental noise, public exposure and regulatory accountability',
    shortTitle: 'Security Force Vehicles & Pollution Compliance',
    seriesId: 'security-transport-compliance',
    seriesTitle: 'Institutional & Security Transportation Compliance Series',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Critical Scoping · Statutory Exemption & Aggregate Emissions Audit',
    temporalScope: '1990–2026',
    heroImage: '/images/env-monitoring/kashmir-transport-hero.jpg',
    heroImageCaption: 'Independent legal and aggregate environmental assessment distinguishing statutory national-security exemptions from PUC maintenance, administrative fleets, and noise compliance.',
    districts: ALL_10_KASHMIR_DISTRICTS,
    corridorFocus: 'Aggregate Publicly Accessible Corridors Across Kashmir Division (Zero Sensitive Routes, Deployments, Schedules, or Vehicle Identities)',
    coordinates: [34.062, 74.822],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['16-atmospheric-environment', '05-glaciers-cryosphere', '07-infrastructure-development'],
    disciplineIds: ['environmental-law', 'atmospheric-science', 'environmental-epidemiology', 'climatology', 'environmental-data-science', 'ecological-economics'],
    linkedKewModules: [
      { moduleName: 'Environmental Monitoring · Transportation Pollution', route: '/environmental-monitoring/transportation-pollution', contributionNote: 'Regional mobile-source emission inventory completeness.' },
      { moduleName: 'Environmental Monitoring · Noise Pollution', route: '/environmental-monitoring/noise-pollution', contributionNote: 'Ambient dB(A) Leq & emergency signal compliance.' },
      { moduleName: 'Water Systems · Glaciers & Cryosphere', route: '/water-systems/glaciers', contributionNote: 'High-altitude black-carbon snow-albedo sensitivity.' },
      { moduleName: 'Environmental Investigations · Accountability Matrix', route: '/environmental-investigations/accountability', contributionNote: '5-tier statutory compliance vs exemption classification.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0026', 'KEW-INV-0027', 'KEW-INV-0028', 'KEW-INV-0031', 'KEW-INV-0032'],
    relatedSectoralCodes: ['KEW-SR-2026-35', 'KEW-SR-2026-44', 'KEW-SR-2026-78'],
    scopeDifferentiation: 'Addresses an essential completeness gap in regional emission and noise inventories: evaluates military, CAPF, police, specialized security, administrative, and civilian-contracted institutional vehicles strictly as an aggregate environmental and regulatory study — never examining operational deployments, routes, schedules, or individual vehicle identities.',
    centralQuestion: 'Even where national-security manufacturing or registration exemptions are legally established (such as MVA Sec 60, G.S.R. 547(E) BS-VI exemptions, and 2023 age-expiry exemptions), which periodic emissions testing, maintenance, contractor PUC, and ambient noise rules remain legally applicable, and what operationally compatible environmental safeguards can protect Kashmir’s airshed, cryosphere, and public health?',
    scopingQuestions: [
      'Precisely which categories of armoured/specialized operational vehicles qualify for BS-IV/BS-VI type-approval exemptions under G.S.R. 485(E) (2017), G.S.R. 871(E) (2018), and G.S.R. 547(E) (2019), versus ordinary non-tactical administrative cars/buses and civilian-hired commercial vehicles that remain bound by standard CMVR Rule 115/116 and G.S.R. 991(E) (Nov 2026) PUC mandates?',
      'Do regional air-pollution emission inventories compiled for Srinagar/Kashmir account for aggregate institutional diesel consumption, or omit the sector entirely?',
      'What internal authorized smoke-opacity inspection, preventive engine maintenance, ultra-low-sulphur fuel, anti-idling, and non-emergency siren/horn discipline frameworks operate across MoD, MHA/CAPF, and J&K Police fleets?',
    ],
    executiveKeyFindings: [
      'Legal vs Scientific Distinction: MoRTH notifications — including MVA 1988 Section 60, G.S.R. 485(E) (19 May 2017), G.S.R. 871(E) (13 Sep 2018), G.S.R. 547(E) (1 Aug 2019 BS-VI exemption for qualifying defence/security vehicles), and CMVR Amendment Rules 2023 (15-year government vehicle expiry exemption) — create lawful type-approval/retirement exemptions for qualifying specialized vehicles. A lawful exemption is never classified by KEW as regulatory noncompliance, yet atmospheric physics remains indifferent to legal status: emitted PM2.5, NOx, and black carbon still enter the enclosed Kashmir Valley inversion layer.',
      'An exemption from manufacturing BS-VI type-approval or 15-year de-registration does not automatically exempt ordinary administrative vehicles, commercially contracted civilian vehicles, unnecessary horn/siren use (CMVR Rule 119 & Driving Regulations 2017), or periodic fleet maintenance.',
      'Recent Regulatory Milestone: On 13 November 2026, MoRTH published G.S.R. 991(E) revising Pollution Under Control (PUC) certification provisions by vehicle age and emission category — requiring precise legal cross-mapping against Section 60 and specialized security fleets.',
    ],
    callouts: [
      { label: 'BS-VI Exemption Rule', value: 'G.S.R. 547(E)', unit: '1 Aug 2019 (Qualifying)', sourceTag: 'MoRTH / PIB Notification' },
      { label: 'Revised PUC Mandate', value: 'G.S.R. 991(E)', unit: '13 Nov 2026', sourceTag: 'MoRTH Gazette Revision' },
      { label: 'Compliance Taxonomy', value: '5 Tiers', unit: 'Exempt ≠ Noncompliant', sourceTag: 'KEW Legal-Epistemic Standard' },
      { label: 'Operational Privacy', value: '100% Aggregate', unit: 'Zero Sensitive Data', sourceTag: 'Mandatory Scope Boundary' },
    ],
    statutoryComplianceMatrix: [
      {
        id: 'COMP-0038-01',
        sectorOrQuestion: 'Qualifying Specialized Defence & Armoured Internal-Security Vehicles — BS-IV / BS-VI Manufacturing Type-Approval & 15-Year Expiry',
        applicableInstrument: 'MVA 1988 Sec 60; G.S.R. 485(E) (2017); G.S.R. 871(E) (2018); G.S.R. 547(E) (1 Aug 2019); CMVR Amendment Rules 2023',
        classification: 'Legally exempt',
        evidenceAndLegalBasis: 'Authenticated MoRTH Gazette notifications explicitly exempt qualifying specialized defence and armoured/operational internal-security vehicles from BS-IV/BS-VI manufacturing norms and the 15-year government-vehicle scrappage rule due to high-altitude/terrain operational requirements.',
        requiredInstitutionalEvidence: 'Published technical schedule of qualifying vehicle classes vs non-exempt general-duty vehicles; internal environmental maintenance norms.',
      },
      {
        id: 'COMP-0038-02',
        sectorOrQuestion: 'Periodic PUC Smoke-Opacity Testing & Applicability of Revised G.S.R. 991(E) (13 Nov 2026) Across Section-60 & CAPF/Police Fleets',
        applicableInstrument: 'CMVR Rules 115(7) & 116; MoRTH G.S.R. 991(E) (Nov 2026)',
        classification: 'Regulatory ambiguity',
        evidenceAndLegalBasis: 'Separate central registration under Section 60 MVA and type-approval exemptions create overlapping jurisdiction between civilian RTO/VAHAN PUCC portals and internal Base Workshop / MT inspection regimes.',
        requiredInstitutionalEvidence: 'Clarification from MoRTH, MoD, MHA, and J&K MVD on internal accredited smoke-testing equivalence and G.S.R. 991(E) applicability.',
      },
      {
        id: 'COMP-0038-03',
        sectorOrQuestion: 'Non-Tactical Administrative Cars/Buses & J&K Police Routine Civil-Registered Vehicles',
        applicableInstrument: 'CMVR Rules 115 & 116; G.S.R. 991(E) (2026); Government Fleet EV/BS-VI Procurement Policies',
        classification: 'Not verified',
        evidenceAndLegalBasis: 'Ordinary civilian-pattern staff cars, buses, and utility vehicles registered under standard RTO series do not fall under armoured/combat BS-VI exclusions, but aggregate PUC pass rates are not publicly disaggregated.',
        requiredInstitutionalEvidence: 'Aggregate RTO/departmental percentage of administrative & police civil-pattern vehicles holding valid PUCC.',
      },
      {
        id: 'COMP-0038-04',
        sectorOrQuestion: 'Commercially Hired / Contracted Civilian Trucks, Buses & Taxis Engaged for Institutional Transport',
        applicableInstrument: 'Motor Vehicles Act 1988; CMVR Rules 115, 116, 119 & Fitness Certificate Mandate',
        classification: 'Not verified',
        evidenceAndLegalBasis: 'Privately owned commercial vehicles hired under institutional transport contracts enjoy zero sovereign/defence statutory exemption and must hold valid civilian PUCC and fitness certificates.',
        requiredInstitutionalEvidence: 'Standard tender/contract clauses requiring valid PUCC, BS-IV/BS-VI compliance, and exhaust maintenance for hired civilian vehicles.',
      },
      {
        id: 'COMP-0038-05',
        sectorOrQuestion: 'Multi-Toned Horns, Emergency Sirens & Nighttime Silence-Zone Acoustic Compliance',
        applicableInstrument: 'CMVR Rule 119(3); Motor Vehicles (Driving) Regulations, 2017; Noise Pollution Rules, 2000 (50/40 dB(A) Silence Zones)',
        classification: 'Not verified',
        evidenceAndLegalBasis: 'Rule 119(3) permits approved multi-toned sirens strictly on authorized emergency/security vehicles during active operational necessity — not unrestricted routine use near hospitals/residential silence zones.',
        requiredInstitutionalEvidence: 'Standard Operating Procedures (SOPs) governing peacetime/non-emergency siren, pressure-horn, and stationary idling restrictions near hospitals and schools.',
      },
      {
        id: 'COMP-0038-06',
        sectorOrQuestion: 'Inclusion of Aggregate Institutional Fuel/Fleet Emissions in Regional Airshed Inventories (Srinagar NCAP & Kashmir Basin)',
        applicableInstrument: 'Air (Prevention and Control of Pollution) Act, 1981 & CPCB Emission Inventory Guidelines',
        classification: 'Not verified',
        evidenceAndLegalBasis: 'Civilian VAHAN-only bottom-up inventories omit Section-60 and outside-registered institutional fleets unless aggregate bulk fuel/emission factors are incorporated.',
        requiredInstitutionalEvidence: 'JKPCC / CPCB confirmation of methodology used to represent aggregate institutional transport in regional airshed models.',
      },
    ],
    chronology: [
      { period: '1988–2000', eventTitle: 'Motor Vehicles Act Sec 60, CMVR Rules 115–120 & Noise Rules 2000', documentedRecord: 'Established separate central defence vehicle registration alongside national exhaust, horn/siren, and ambient noise rules.', sourceRef: 'REF-SEC-01', significance: 'Baseline' },
      { period: '2017–2019', eventTitle: 'G.S.R. 485(E), G.S.R. 871(E) & G.S.R. 547(E) BS-IV / BS-VI Exemptions', documentedRecord: 'MoRTH notified specific BS-IV and BS-VI manufacturing exemptions for qualifying defence and specialized internal-security vehicles operating in demanding terrain.', sourceRef: 'REF-SEC-02', significance: 'Intervention' },
      { period: '2023', eventTitle: 'CMVR Amendment Rules Exempting Specialized Operational Vehicles from 15-Year Expiry', documentedRecord: 'Exempted qualifying specialized operational/armoured vehicles from automatic 15-year government-vehicle de-registration.', sourceRef: 'REF-SEC-03', significance: 'Intervention' },
      { period: '13 Nov 2026', eventTitle: 'G.S.R. 991(E) Revised PUC Certification Provisions Notified', documentedRecord: 'Updated national PUC testing frequency and compliance rules by vehicle age and emission category.', sourceRef: 'REF-SEC-04', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-SEC-01', name: 'Institutional Base-Workshop Maintenance, Administrative EV Pilots & Cantonment Green Initiatives', period: '2015–2026', executingAgency: 'MoD / EME, MHA / CAPF MT Wings & J&K Police MT', interventionType: 'Internal Fleet Maintenance & Sustainability', reportedScaleOrOutlay: 'Institutional O&M & sustainability programmes', status: 'Ongoing', documentedOutcome: 'Internal workshop inspection protocols operate; public aggregate environmental sustainability disclosures (analogous to UK MoD JSP 418 / US DoD reports) not yet published regionally.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'environmental-law',
        disciplineName: 'Statutory Exemption vs Environmental Impact Jurisprudence',
        clusterName: 'Applied Environmental Sciences',
        methodologyApplied: ' Clause-by-clause statutory construction of MVA Sec 60, CMVR Rules 115/116/119/120, G.S.R. 485(E)/871(E)/547(E)/991(E), and Noise Rules 2000 benchmarked against US EPA (40 CFR §1068.225), UK MoD, EU, and Canadian frameworks.',
        equationOrMetricUsed: '5-Tier Legal Classification × Aggregate Mass Balance E_total = E_civil + E_commercial + E_institutional',
        empiricalFinding: 'International defence frameworks prove that exempting combat/high-altitude tactical engines from civilian Euro/EPA shutdown sensors (e.g., SCR limp-mode risks) can be paired with strict ultra-low-sulphur fuel, internal smoke-opacity limits, non-tactical EV fleets, and annual aggregate emission reporting.',
        uncertaintyAndLimitations: 'Strictly restricted to authorized public statutory texts and aggregate environmental science; zero inference from missing public records.',
        verificationClass: 'Documented',
      },
    ],
    assertions: [
      { suffix: '01', assertion: 'Under MoRTH Notification G.S.R. 547(E) (dated 1 August 2019), qualifying defence and specialized security vehicles were granted statutory exemption from BS-VI emission standards owing to specialized engine and high-altitude operational conditions, following earlier BS-IV exemptions under G.S.R. 485(E) (2017) and G.S.R. 871(E) (2018).', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Verified in official Press Information Bureau (PIB) and Gazette of India MoRTH notifications.', citationIds: ['REF-SEC-02'] },
      { suffix: '02', assertion: 'On 13 November 2026, the Government of India published G.S.R. 991(E) revising Pollution Under Control (PUC) certification requirements according to vehicle age and emission category.', sourceCategory: 'Judicial & Statutory Dockets', classification: 'Documented', basis: 'Verified in official MoRTH Gazette Notification G.S.R. 991(E) dated 13 November 2026.', citationIds: ['REF-SEC-04'] },
      { suffix: '03', assertion: 'What percentage of total heavy-duty diesel black carbon and PM2.5 in the Kashmir Valley and high-altitude passes originates from institutional/security transportation relative to civilian freight, brick kilns, and winter biomass burning remains unquantified in published inventories.', sourceCategory: 'Scientific Literature', classification: 'Unverified', basis: 'Existing peer-reviewed Kashmir emission studies do not disaggregate institutional fleets; KEW treats actual emission share and PUC rates as open scientific questions rather than pre-assumed findings.', citationIds: ['REF-SEC-01', 'REF-SEC-05'], methodReq: 'Authorized aggregate fuel/emission-category disclosure from institutional environment cells + source-blind ambient black-carbon/NOx roadside monitoring.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Ministry of Road Transport & Highways, Ministry of Defence, Ministry of Home Affairs & J&K Home/Police MT', acronym: 'MoRTH / MoD / MHA / JKP', mandate: 'Defining clear statutory boundaries between exempt specialized tactical vehicles and non-exempt administrative/contracted fleets, maintaining internal emission/noise standards, and preventing unnecessary idling or horn/siren use.', ownership: 'Institutional fleet environmental management policies & contractor transport clauses', scientificResp: 'Publishing non-sensitive annual aggregate environmental sustainability summaries (fuel quality, administrative EV share, internal smoke-test compliance).', documentedFindings: 'Statutory BS-IV/BS-VI and 15-year exemptions are documented in national gazettes, while public aggregate environmental reporting and contractor PUC verification records remain unavailable.', response: 'National defence/CAPF cantonment greening and solar initiatives reported nationally; official clarification on internal PUC/maintenance standards and contractor clauses invited.', questions: ['Do commercial civilian vehicles hired on contract by security/police agencies in Kashmir undergo mandatory PUCC and BS-norm verification prior to deployment?', 'Are internal Base Workshop / MT smoke-opacity inspection standards enforced on vehicles exempted from civilian BS-VI type-approval?', 'What percentage of non-tactical administrative staff vehicles in Kashmir have transitioned to BS-VI petrol/CNG or electric mobility?'], corrective: 'Mandate 100% PUCC verification on all contracted civilian vehicles, electrify non-tactical administrative pools, enforce peacetime anti-idling/silence-zone SOPs, and publish aggregate sustainability reports.' },
      { suffix: '02', institution: 'J&K Pollution Control Committee & J&K Motor Vehicles Department', acronym: 'JKPCC / MVD', mandate: 'Ensuring regional airshed emission inventories and hospital Silence-Zone acoustic assessments capture total aggregate mobile-source loading.', ownership: 'Kashmir regional emission inventory & ambient air/noise networks', scientificResp: 'Documenting how bulk non-retail institutional fuel consumption is accounted for in regional air-quality models.', documentedFindings: 'VAHAN-only civilian registries exclude Section-60 and outside-registered vehicles from regional inventories.', response: 'JKPCC operates ambient stations measuring total receptor concentrations regardless of source; inventory methodology clarification invited.', questions: ['How do JKPCC and NCAP emission inventories account for non-VAHAN and outside-registered heavy diesel vehicles operating in Kashmir?'], corrective: 'Use bulk depot + retail fuel mass-balance reconciliation in regional airshed models without requiring sensitive operational data.' },
    ],
    unansweredQuestions: [
      'Even where tactical BS-VI exemptions (e.g., avoiding AdBlue/SCR freezing or limp-mode at sub-zero high-altitude posts) are operationally justified, what alternative diesel particulate filters, ultra-low-sulphur BS-VI fuel compatibility, and preventive injector maintenance standards are applied?',
      'What are the commencement and applicability provisions of G.S.R. 991(E) (Nov 2026) for civil-registered police and government administrative vehicles in J&K?',
    ],
    alternatives: [
      { title: 'UK MoD JSP 418 / US EPA Dual-Track Safeguard Framework (Tactical Reliability + Administrative Electrification & Contractor BS-VI Mandate)', mechanism: 'Preserves operational exemptions strictly for specialized tactical/high-altitude vehicles while mandating: (1) 100% BS-VI/EV transition for administrative & garrison utility vehicles, (2) strict PUCC/BS-VI clauses in all hired civilian transport tenders, (3) internal accredited opacity testing & anti-idling rules, and (4) strict hospital Silence-Zone siren/horn discipline.', evidencePrecedent: 'US EPA 40 CFR §1068.225, UK MoD Sustainable Support Strategy & Canada Greening Government Fleet Policy.', feasibilityNote: 'Achieves substantial PM2.5, black-carbon, and urban noise reductions with zero compromise to operational security.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Enforce Mandatory PUCC & Emission Clauses on All Commercially Contracted Vehicles + Hospital Silence-Zone SOPs', spec: 'Require valid PUCC and non-modified exhausts/horns in every hired-vehicle contract and issue non-emergency silence-zone acoustic directives near hospitals and schools.', target: 'MHA, MoD Cantonment/Env Cells, J&K Police MT & MVD', justification: 'Contracted civilian vehicles hold no statutory exemption and represent an immediate zero-cost compliance win.', indicator: '100% PUCC clause inclusion in institutional transport tenders.' },
      { suffix: '02', horizon: 'Medium-Term (1–3 Years)', title: 'Electrify Non-Tactical Administrative Fleets & Publish Non-Sensitive Annual Environmental Stewardship Reports', spec: 'Transition garrison/headquarters administrative cars and shuttle buses to EVs/BS-VI and publish aggregate fleet environmental metrics.', target: 'MoD, MHA, MoRTH & J&K Administration', justification: 'Aligns Indian institutional fleets with international defence sustainability best practices.', indicator: 'Annual aggregate environmental compliance summary published.' },
    ],
    references: [
      { id: 'REF-SEC-01', authorsOrBody: 'Parliament of India / Ministry of Road Transport & Highways (IndiaCode)', year: 1989, title: 'The Motor Vehicles Act, 1988 (Section 60) & Central Motor Vehicles Rules, 1989 (Rules 115, 116, 119 & 120); Motor Vehicles (Driving) Regulations, 2017', publicationOrSeries: 'indiacode.nic.in Official Statutory Text', referenceType: 'Judicial Order / NGT', externalUrl: 'https://www.indiacode.nic.in/', provenanceNote: 'Primary statutory framework governing defence registration, exhaust emissions, PUC, horns, and approved emergency sound signals.' },
      { id: 'REF-SEC-02', authorsOrBody: 'Ministry of Road Transport & Highways (MoRTH) / Press Information Bureau (PIB)', year: 2019, title: 'Gazette Notifications G.S.R. 485(E) (19 May 2017), G.S.R. 871(E) (13 Sep 2018), and G.S.R. 547(E) (1 Aug 2019 — BS-VI Exemption for Qualifying Defence and Specialized Security Vehicles)', publicationOrSeries: 'Gazette of India / pib.gov.in', referenceType: 'Technical Institute Report', externalUrl: 'https://www.pib.gov.in/', provenanceNote: 'Establishes authenticated BS-IV and BS-VI statutory exemptions for qualifying defence and internal-security vehicles.' },
      { id: 'REF-SEC-03', authorsOrBody: 'Ministry of Road Transport & Highways (MoRTH)', year: 2023, title: 'Central Motor Vehicles Amendment Rules, 2023 — Exemption of Specialized Operational Vehicles from 15-Year Government Vehicle Registration Expiry', publicationOrSeries: 'Gazette of India Extraordinary', referenceType: 'Judicial Order / NGT', provenanceNote: 'Documents 2023 exemption from automatic 15-year government vehicle retirement.' },
      { id: 'REF-SEC-04', authorsOrBody: 'Ministry of Road Transport & Highways (MoRTH) / PIB', year: 2026, title: 'Gazette Notification G.S.R. 991(E) (13 November 2026) — Revised Pollution Under Control (PUC) Certification Provisions', publicationOrSeries: 'Gazette of India / pib.gov.in', referenceType: 'Judicial Order / NGT', externalUrl: 'https://www.pib.gov.in/', provenanceNote: 'Latest 13 November 2026 PUC regulatory amendment requiring applicability cross-mapping.' },
      { id: 'REF-SEC-05', authorsOrBody: 'US Environmental Protection Agency (40 CFR §1068.225) & UK Ministry of Defence (JSP 418)', year: 2023, title: 'Comparative International Frameworks for National Security Vehicle Emission Exemptions and Defence Environmental Management', publicationOrSeries: 'US Code of Federal Regulations / UK Gov Sustainable Support', referenceType: 'Technical Institute Report', provenanceNote: 'International benchmark reconciling tactical exemptions with administrative fleet decarbonization and environmental auditing.' },
    ],
    dataGaps: ['Publicly releasable aggregate share of BS-VI/EV administrative vehicles, internal MT smoke-test frequency, and regional fuel mass-balance inclusion.'],
    regulatoryLead: 'MVA 1988 Sec 60; CMVR Rules 115, 116, 119, 120; G.S.R. 485(E), 871(E), 547(E) & 991(E) (Nov 2026); Air Act 1981; EPA 1986; Noise Rules 2000.',
  }),
];
