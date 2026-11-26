// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI INITIAL INVESTIGATION PORTFOLIO (KEW-INV-0003 .. KEW-INV-0008)
// Active Scoping & Proposed Investigation Subjects (No Predetermined Findings)
// ─────────────────────────────────────────────────────────────────────────────

import { InvestigationRecord } from '@/types/environmental-investigations';
import { MASTER_LAKE_SUMMARY_STATS as MLS } from '@/data/hydrology/master-lake-registry';

function buildScopingSections(
  leadExec: string,
  background: string,
  geography: string,
  baseline: string,
  hydrologyApplicable: boolean,
  hydrologyLead: string
) {
  return [
    {
      sectionNumber: '01',
      key: 'executive-summary',
      title: 'Executive Summary & Scoping Status',
      applicable: true,
      leadSummary: leadExec,
      bodyParagraphs: [
        'In strict compliance with KEW-EIAI scientific standards, this record represents an active/proposed investigation subject rather than predetermined conclusions. Only baseline documentary anchors and verified scoping assertions are populated prior to full peer-review sign-off.',
      ],
    },
    {
      sectionNumber: '02',
      key: 'investigation-background',
      title: 'Investigation Background',
      applicable: true,
      leadSummary: background,
      bodyParagraphs: ['Initiated under the initial 8-subject Western Himalayan Investigation Portfolio.'],
    },
    {
      sectionNumber: '03',
      key: 'geographic-context',
      title: 'Geographic Context',
      applicable: true,
      leadSummary: geography,
      bodyParagraphs: ['Spatial centroid and watershed linkages are mapped in the KEW-EIAI Investigation Atlas.'],
    },
    {
      sectionNumber: '05',
      key: 'environmental-baseline',
      title: 'Environmental Baseline',
      applicable: true,
      leadSummary: baseline,
      bodyParagraphs: ['Historical archival baselines are being cross-indexed from the KEW Research Library and Earth & Human Impact satellite layers.'],
    },
    {
      sectionNumber: '10',
      key: 'hydrological-analysis',
      title: 'Hydrological Analysis',
      applicable: hydrologyApplicable,
      nonApplicableReason: hydrologyApplicable ? undefined : 'Not primary driver for terrestrial lithostratigraphic tableland scoping.',
      leadSummary: hydrologyLead,
      bodyParagraphs: hydrologyApplicable ? ['Hydrological gauging and sediment/discharge series under compilation.'] : [],
    },
    {
      sectionNumber: '18',
      key: 'scientific-evidence-matrix',
      title: 'Initial Scoping Evidence Matrix',
      applicable: true,
      leadSummary: 'Preliminary verification classification separating documented baseline records from hypotheses awaiting empirical verification.',
      bodyParagraphs: ['Inspect the Evidence Matrix below.'],
    },
    {
      sectionNumber: '19',
      key: 'unanswered-questions',
      title: 'Core Research & Institutional Questions',
      applicable: true,
      leadSummary: 'Falsifiable scientific and institutional questions guiding documentary discovery.',
      bodyParagraphs: ['Contributions of peer-reviewed datasets or official records may be submitted via the Submit Investigation portal.'],
    },
    {
      sectionNumber: '23',
      key: 'references-datasets',
      title: 'Initial Reference Anchors',
      applicable: true,
      leadSummary: 'Foundational peer-reviewed and statutory sources anchoring scoping review.',
      bodyParagraphs: ['Additional citations appended as Stage 03–04 Evidence Verification progresses.'],
    },
  ];
}

export const PORTFOLIO_INVESTIGATION_DOSSIERS: InvestigationRecord[] = [
  // ─── KEW-INV-0003: TELBAL SETTLING BASIN ───────────────────────────────────
  {
    code: 'KEW-INV-0003',
    slug: 'telbal-settling-basin-sediment-management',
    title: 'The Telbal Settling Basin: Three Decades of Sediment Management',
    subtitle: 'Hydraulic trap efficiency, sediment interception, and maintenance performance upstream of Hazratbal Basin',
    shortTitle: 'The Telbal Settling Basin: Sediment Management',
    status: 'active_investigation',
    statusLabel: 'Active Investigation (Stage 06)',
    temporalScope: '1988–2026',
    initiatedDate: '2026-03-10',
    lastUpdated: '2026-11-18',
    version: 'v0.8 (Active Evidence Compilation)',
    featured: false,
    heroImage: '/images/water-module/watersheds.png',
    heroImageCaption: 'Telbal–Dachigam sediment delivery corridor entering northern Dal Lake.',

    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Ganderbal'],
    watershedOrBasin: 'Dachigam–Telbal Sub-Watershed',
    elevationRangeM: '1,585–1,750 m ASL (Basin & Lower Fan)',
    coordinates: [34.156, 74.888],
    spatialEnvelopeKm2: 228,
    connectedEcosystems: ['Telbal Nallah', 'Hazratbal Basin (Dal Lake)', 'Dachigam Lower Catchment'],

    primaryDomainId: '01-lakes-limnology',
    secondaryDomainIds: ['03-rivers-hydrology', '18-environmental-governance'],
    disciplineIds: ['sedimentology', 'hydraulics', 'hydrology', 'soil-science', 'environmental-engineering'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Watersheds', route: '/water-systems/watersheds', contributionNote: 'Dachigam–Telbal catchment morphometry and runoff.' },
      { moduleName: 'Dal Lake Investigation (KEW-INV-0001)', route: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences', contributionNote: 'Companion downstream receiving-basin investigation.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001'],

    scopingQuestions: [
      'What has been the actual year-by-year trap efficiency η_trap of the Telbal Settling Basin for coarse sand versus fine suspended silt (<63 µm)?',
      'How closely have desilting expenditure cycles aligned with spring snowmelt sediment pulses from the Dachigam–Marsar watershed?',
    ],
    executiveKeyFindings: [
      'Scoping audit links CAG-documented multi-year desilting intervals at Telbal directly to accelerated re-shoaling in northern Dal Lake (KEW-INV-0001).',
      'Hydraulic residence-time modelling is underway to test whether current cell geometry can settle fine dispersive silts during peak spring discharges.',
    ],
    chronology: [
      { period: '1988–1992', eventTitle: 'Settling Basin Construction', documentedRecord: 'Constructed following ENEX recommendations to intercept Telbal Nallah bedload and suspended sediment.', sourceRef: 'REF-TEL-01', significance: 'Intervention' },
      { period: '2011', eventTitle: 'CAG Performance Audit Observation', documentedRecord: 'Documented prolonged intervals without periodic desilting, reducing effective settling storage.', sourceRef: 'REF-TEL-01', significance: 'Audit / Judicial' },
    ],
    interventionInventory: [
      { id: 'INT-TEL-01', name: 'Telbal Desilting Cells & Weir System', period: '1988–Present', executingAgency: 'LAWDA / LCMA', interventionType: 'Hydraulic Sediment Trap', reportedScaleOrOutlay: 'NLCP / UT O&M allocations', status: 'Ongoing', documentedOutcome: 'Episodic clearance; continuous trap-efficiency telemetry absent.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'hydraulics',
        disciplineName: 'Hydraulics & Sedimentology',
        clusterName: 'Water & Aquatic Sciences',
        methodologyApplied: 'Overflow-rate vs Stokes settling velocity comparison.',
        equationOrMetricUsed: 'v_s = g (ρ_s - ρ) d² / (18 µ) vs Overflow Rate Q / A_surface',
        empiricalFinding: 'Loss of active depth through silt accumulation raises horizontal velocity above critical resuspension shear during snowmelt peaks.',
        uncertaintyAndLimitations: 'Awaiting measured grain-size distribution curves at inlet vs weir crest.',
        verificationClass: 'Provisionally Supported',
      },
    ],
    evidenceMatrix: [
      {
        id: 'EVID-TEL-01',
        investigationCode: 'KEW-INV-0003',
        investigationSlug: 'telbal-settling-basin-sediment-management',
        investigationTitle: 'The Telbal Settling Basin: Three Decades of Sediment Management',
        assertion: 'Prolonged intervals without desilting lowered the effective sediment-retention capacity of the Telbal Settling Basin.',
        sourceCategory: 'Government Audit Records',
        classification: 'Documented',
        evidenceBasisSummary: 'Directly recorded in CAG Performance Audit on Conservation and Management of Dal–Nigeen Lake.',
        citationIds: ['REF-TEL-01'],
        lastVerifiedDate: '2026-11-18',
      },
      {
        id: 'EVID-TEL-02',
        investigationCode: 'KEW-INV-0003',
        investigationSlug: 'telbal-settling-basin-sediment-management',
        investigationTitle: 'The Telbal Settling Basin: Three Decades of Sediment Management',
        assertion: 'Present basin surface area is hydraulically undersized to capture <20 µm glacial/Karewa silt during 10-year peak discharges even when clean.',
        sourceCategory: 'Hydrological & Telemetry Series',
        classification: 'Unverified',
        evidenceBasisSummary: 'Plausible Stokes-law hypothesis undergoing hydraulic verification; requires paired inlet/outlet laser-diffraction particle sizing.',
        citationIds: ['REF-TEL-01'],
        methodologicalRequirement: 'Inlet/outlet suspended-sediment particle-size distribution during April–May peak flow.',
        lastVerifiedDate: '2026-11-18',
      },
    ],
    accountabilityMatrix: [
      {
        id: 'ACC-TEL-01',
        investigationCode: 'KEW-INV-0003',
        investigationSlug: 'telbal-settling-basin-sediment-management',
        investigationTitle: 'The Telbal Settling Basin: Three Decades of Sediment Management',
        responsibleInstitution: 'J&K Lake Conservation and Management Authority',
        institutionAcronym: 'LCMA',
        statutoryMandate: 'Operation, periodic desilting, and hydraulic maintenance of Telbal Settling Basin.',
        projectOwnership: 'Telbal Settling Basin & Upper Catchment Check Dams',
        scientificResponsibility: 'Inflow sediment load monitoring and bathymetric capacity checks.',
        financialResponsibility: 'Desilting O&M contracts under Dal conservation outlays.',
        environmentalAuthorisation: 'Statutory conservation mandate.',
        monitoringObligations: 'Pre- and post-monsoon/snowmelt silt volume measurement.',
        documentedFindings: 'CAG audit flagged multi-year maintenance gaps undermining downstream Dal Lake dredging.',
        institutionalResponse: 'Periodic mechanical clearance drives reported in recent conservation updates.',
        outstandingQuestions: ['What annual cubic-metre silt extraction logs exist for Telbal Settling Basin from 2015 to 2026?'],
        correctiveAction: 'Periodic mechanical desilting resumed; automated turbidity gauging still awaited.',
        followUpStatus: 'Under Statutory Review',
      },
    ],
    unansweredQuestions: [
      'What annual volume (m³) of sediment was removed from Telbal Settling Basin each year between 2010 and 2026?',
    ],
    alternativeSolutions: [
      { title: 'Dual-Cell Alternating Desilting & Upstream Slit Check-Dams', mechanism: 'Operate parallel settling cells allowing dry excavation without bypassing turbid flow, paired with upstream slit check-dams.', evidencePrecedent: 'Swiss FOEN alpine sediment retention basins.', feasibilityNote: 'High engineering feasibility within existing Telbal footprint.' },
    ],
    recommendations: [
      {
        id: 'REC-TEL-01',
        investigationCode: 'KEW-INV-0003',
        investigationSlug: 'telbal-settling-basin-sediment-management',
        investigationTitle: 'The Telbal Settling Basin: Three Decades of Sediment Management',
        horizon: 'Immediate (0–12 Months)',
        title: 'Install Paired Optical Turbidity & Stage Sensors at Telbal Inlet and Weir Outlet',
        actionSpecification: 'Continuously log C_in and C_out to compute real-time trap efficiency η_trap.',
        targetInstitution: 'LCMA & NIT Srinagar',
        scientificJustification: 'Provides objective trigger for cell desilting.',
        verificationIndicator: 'Live monthly trap-efficiency ledger.',
        status: 'Proposed',
      },
    ],
    references: [
      { id: 'REF-TEL-01', authorsOrBody: 'CAG of India & AHEC IIT Roorkee', year: 2011, title: 'Audit & DPR Records on Telbal Nallah Siltation and Settling Basin Performance', publicationOrSeries: 'Government of J&K Audit Series / NLCP DPR', referenceType: 'Statutory Audit (CAG)', provenanceNote: 'Primary documentary anchor for Telbal maintenance history.' },
    ],
    updatesLog: [{ date: '2026-11-18', version: 'v0.8', entryType: 'Evidence Addition', summary: 'Linked Telbal hydraulic overflow equations with KEW-INV-0001 Dal Lake findings.', verifiedBy: 'KEW-EIAI Hydrology Desk' }],
    dataGaps: ['Inlet/outlet suspended grain-size curves (D10, D50, D90) during peak snowmelt.'],
    sections: buildScopingSections(
      'Active technical investigation examining three decades of hydraulic performance, maintenance intervals, and sediment trap efficiency at the Telbal Settling Basin — the critical upstream shield for Dal Lake.',
      'Linked directly to KEW-INV-0001, this investigation isolates why upstream sediment arrest underperformed relative to downstream dredging expenditure.',
      'Located at the mouth of Telbal Nallah draining the ~228 km² Dachigam–Marsar watershed into Hazratbal Basin.',
      'Designed in the late 1980s to intercept coarse and medium suspended load from Dal Lake’s largest tributary.',
      true,
      'Evaluates overflow rate (Q/A) against Stokes settling velocities as basin storage volume fluctuates between desilting cycles.'
    ),
  },

  // ─── KEW-INV-0004: KASHMIR'S KAREWAS ───────────────────────────────────────
  {
    code: 'KEW-INV-0004',
    slug: 'disappearance-of-kashmirs-karewas',
    title: "The Disappearance of Kashmir's Karewas",
    subtitle: 'Quaternary geology, Plio-Pleistocene paleoclimatic archives, unscientific earthfill excavation, and horticultural/hydrological consequences',
    shortTitle: "The Disappearance of Kashmir's Karewas",
    status: 'active_investigation',
    statusLabel: 'Active Investigation (Stage 05)',
    temporalScope: '1995–2026',
    initiatedDate: '2026-04-02',
    lastUpdated: '2026-11-18',
    version: 'v0.7 (Spatial Attribution Underway)',
    featured: false,
    heroImage: '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
    heroImageCaption: 'Plio-Pleistocene fluvio-lacustrine Karewa plateau tablelands undergoing vertical scarp excavation in central/south Kashmir.',

    subregion: 'Multi-District Kashmir Basin',
    districts: ['Pulwama', 'Budgam', 'Pampore', 'Anantnag', 'Shopian', 'Baramulla'],
    watershedOrBasin: 'Kashmir Intermontane Basin Tablelands (Hirpur, Nagum & Dilpur Formations)',
    elevationRangeM: '1,600–2,100 m ASL',
    coordinates: [33.945, 74.915],
    spatialEnvelopeKm2: 2500,
    connectedEcosystems: ['Pampore Saffron Heritage Tablelands', 'Almond/Apple Karewa Orchards', 'Jhelum Tributary Gully Networks'],

    primaryDomainId: '10-mining-quarrying',
    secondaryDomainIds: ['07-infrastructure-development', '13-agriculture-horticulture', '18-environmental-governance'],
    disciplineIds: ['geology', 'geomorphology', 'soil-science', 'geotechnical-engineering', 'remote-sensing', 'spatial-statistics', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Earth & Human Impact · Land & Mining', route: '/earth-human-impact/mining-extraction', contributionNote: 'Supplies Sentinel-2 & DEM scarp-excavation footprint polygons.' },
      { moduleName: 'Sectoral EIA · Agriculture & Saffron', route: '/sectoral-eia/sectors/agriculture', contributionNote: 'Tracks saffron GI tableland soil-moisture and land-use loss.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0007'],

    scopingQuestions: [
      'How many hectares and cubic metres of Plio-Pleistocene Karewa tablelands have been excavated across Budgam, Pulwama, Shopian, and Baramulla for highway, ring-road, railway, and brick-kiln earthfill?',
      'Which internationally cited Quaternary vertebrate-fossil and paleoclimatic type-sections (Romushi, Sombur, Burzahom-adjacent) face irreversible stratigraphic erasure?',
      'How does vertical undercutting of unconsolidated silt-loess scarps accelerate gully erosion and siltation into Jhelum floodplain channels?',
    ],
    executiveKeyFindings: [
      'Kashmir’s Karewas (~4 million-year-old fluvio-glacio-lacustrine sequences) constitute an irreplaceable global paleoclimatic/fossil archive, natural flood-free elevated terrain, and sole pedological substrate for Pampore GI saffron.',
      'Sentinel-2 and DEM change-detection across Budgam–Pulwama–Pampore confirm extensive vertical bench cutting for linear embankment fill and brick-earth extraction; parcel-level royalty/clearance cross-verification is underway.',
    ],
    chronology: [
      { period: '1982–1989', eventTitle: 'International Magnetostratigraphic & Paleoclimatic Recognition', documentedRecord: 'Burbank & Johnson (1982) and Agrawal et al. (1989) established Kashmir Karewas as a 4-Myr Himalayan uplift and monsoon-westerly archive.', sourceRef: 'REF-KAR-01', significance: 'Baseline' },
      { period: '2000s–2026', eventTitle: 'Accelerated Earthfill Quarrying for Linear Corridors & Brick Kilns', documentedRecord: 'Large-scale mechanical excavation across Pampore, Budgam, Pulwama, and Pattan scarps.', sourceRef: 'REF-KAR-02', significance: 'Intervention' },
    ],
    interventionInventory: [
      { id: 'INT-KAR-01', name: 'Mechanical Earthfill Borrow-Pit Excavation on Karewa Scarps', period: '2000–2026', executingAgency: 'Contracted Earthwork Suppliers / Regulated by Geology & Mining Dept.', interventionType: 'Minor-Mineral Soil/Clay Extraction', reportedScaleOrOutlay: 'Multi-district borrow permits & unauthorized cuts under NGT scrutiny', status: 'Ongoing', documentedOutcome: 'Irreversible removal of Dilpur loess-paleosol caps and over-steepened unstable vertical cliffs.' },
    ],
    disciplineFindings: [
      {
        disciplineId: 'geology',
        disciplineName: 'Quaternary Geology & Stratigraphy',
        clusterName: 'Earth & Geological Sciences',
        methodologyApplied: 'Lithostratigraphic correlation of Hirpur, Nagum, and Dilpur loess-paleosol sequences.',
        equationOrMetricUsed: 'R_s = ΔZ / Δt (~4 Myr continuous basin archive)',
        empiricalFinding: 'Excavation permanently destroys un-reproducible fossiliferous (Elephas hysudricus, Equus sivalensis) and paleosol horizons.',
        uncertaintyAndLimitations: 'Comprehensive UT-wide georeferenced inventory of designated geo-heritage type sections is not yet statutorily notified.',
        verificationClass: 'Documented',
      },
    ],
    evidenceMatrix: [
      {
        id: 'EVID-KAR-01',
        investigationCode: 'KEW-INV-0004',
        investigationSlug: 'disappearance-of-kashmirs-karewas',
        investigationTitle: "The Disappearance of Kashmir's Karewas",
        assertion: 'Large-scale mechanical excavation has removed Plio-Pleistocene Karewa tableland sections across Budgam, Pulwama, and Baramulla, destroying paleoclimatic strata and saffron/orchard soils.',
        sourceCategory: 'Satellite & GIS Archive',
        classification: 'Documented',
        evidenceBasisSummary: 'Verified by multi-temporal Sentinel-2 optical series, geological field publications, and NGT proceedings on Budgam/Pulwama clay mining.',
        citationIds: ['REF-KAR-01', 'REF-KAR-02'],
        lastVerifiedDate: '2026-11-18',
      },
    ],
    accountabilityMatrix: [
      {
        id: 'ACC-KAR-01',
        investigationCode: 'KEW-INV-0004',
        investigationSlug: 'disappearance-of-kashmirs-karewas',
        investigationTitle: "The Disappearance of Kashmir's Karewas",
        responsibleInstitution: 'Department of Geology & Mining, J&K & SEIAA / JKPCC',
        institutionAcronym: 'DGM / SEIAA',
        statutoryMandate: 'Regulation of minor-mineral earth/clay permits, slope-bench mining plans, and post-excavation reclamation.',
        projectOwnership: 'Short-term earthwork borrow permits and enforcement against illegal night excavation.',
        scientificResponsibility: 'Ensuring geological heritage sites and saffron GI zones are excluded from borrow permits.',
        financialResponsibility: 'Royalty collection and District Mineral Foundation (DMF) restoration funds.',
        environmentalAuthorisation: 'EIA Notification 2006 cluster-mining Environmental Clearances & NGT directives.',
        monitoringObligations: 'Volumetric DEM verification of permitted vs actual excavation depth and benching.',
        documentedFindings: 'NGT cases on Budgam/Pulwama Karewa clay mining scrutinized short-term permit exemptions and un-reclaimed vertical cuts.',
        institutionalResponse: 'Seizure of unauthorized excavators and revision of short-term permit scrutiny reported in NGT filings.',
        outstandingQuestions: ['Will J&K notify a statutory Geo-Heritage Protection Overlay prohibiting borrow-pit permits on type fossiliferous and Saffron GI Karewas?'],
        correctiveAction: 'Under NGT & administrative review.',
        followUpStatus: 'Under Statutory Review',
      },
    ],
    unansweredQuestions: [
      'What total volume (million m³) of Karewa earthfill was permitted under short-term permits vs Environmental Clearances between 2015 and 2026?',
    ],
    alternativeSolutions: [
      { title: 'Recycled Dredge-Silt / Fly-Ash Geopolymer Embankments & Geo-Heritage Protection', mechanism: 'Substitute virgin Karewa loess borrow fill with stabilized Jhelum/flood-channel dredged sand-silt and fly-ash composites while notifying protected geological monuments.', evidencePrecedent: 'Chinese Loess Plateau scarp-cutting ban & Indian IRC embankment specifications.', feasibilityNote: 'Simultaneously solves dredge-spoil utilization and protects Karewas.' },
    ],
    recommendations: [
      {
        id: 'REC-KAR-01',
        investigationCode: 'KEW-INV-0004',
        investigationSlug: 'disappearance-of-kashmirs-karewas',
        investigationTitle: "The Disappearance of Kashmir's Karewas",
        horizon: 'Immediate (0–12 Months)',
        title: 'Statutory Geo-Heritage & Saffron-Zone Exclusion Map for All Earthwork Borrow Permits',
        actionSpecification: 'Prohibit mechanical scarp cutting across Sombur, Romushi, Pampore GI Saffron, and fossiliferous Karewa type sections.',
        targetInstitution: 'Dept. of Geology & Mining, Revenue Dept. & GSI',
        scientificJustification: '4-million-year Quaternary stratigraphic archives are non-renewable.',
        verificationIndicator: 'Public GIS exclusion layer integrated into SEIAA/DGM portal.',
        status: 'Proposed',
      },
    ],
    references: [
      { id: 'REF-KAR-01', authorsOrBody: 'Burbank, D. W., & Johnson, G. D.', year: 1982, title: 'Intermontane-basin development in the past 4 Myr in the north-west Himalaya', publicationOrSeries: 'Nature, 298, 432–436', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1038/298432a0', externalUrl: 'https://doi.org/10.1038/298432a0', provenanceNote: 'Foundational chronostratigraphic baseline of Kashmir Karewas.' },
      { id: 'REF-KAR-02', authorsOrBody: 'Dar, R. A., Romshoo, S. A., Chandra, R., & Ahmad, I.', year: 2014, title: 'Tectono-geomorphic study of the Karewa Basin of Kashmir Valley', publicationOrSeries: 'Journal of Asian Earth Sciences, 92, 143–156', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Geomorphic significance and vulnerability of Karewa tablelands.' },
    ],
    updatesLog: [{ date: '2026-11-18', version: 'v0.7', entryType: 'Evidence Addition', summary: 'Compiled Sentinel-2 scarp retreat polygons across Pampore–Budgam–Pulwama.', verifiedBy: 'KEW-EIAI Earth Sciences Desk' }],
    dataGaps: ['District-wise volumetric registry of permitted vs unpermitted Karewa borrow pits (2015–2026).'],
    sections: buildScopingSections(
      'Active geological and spatial investigation quantifying the excavation of Kashmir’s 4-million-year-old Plio-Pleistocene Karewa plateaus for linear infrastructure fill, brick kilns, and unplanned land levelling.',
      'Initiated to document irreversible loss of Quaternary paleoclimatic/fossil archives, Pampore GI saffron soils, and slope stability.',
      'Spans elevated tablelands across Pulwama, Pampore, Budgam, Shopian, Anantnag, and Baramulla.',
      'Unconsolidated fluvio-glacio-lacustrine silts, clays, conglomerates, and wind-blown Dilpur loess-paleosols.',
      false,
      'Dynamically suppressed as primary driver; gully sediment export to Jhelum tributaries is evaluated under Geomorphology.'
    ),
  },

  // ─── KEW-INV-0005: WULAR LAKE ──────────────────────────────────────────────
  {
    code: 'KEW-INV-0005',
    slug: 'wular-lake-effectiveness-of-large-scale-restoration',
    title: 'Wular Lake: The Environmental Effectiveness of Large-Scale Restoration',
    subtitle: 'Dredging, willow-removal trade-offs, catchment siltation, flood attenuation, and Ramsar wetland governance',
    shortTitle: 'Wular Lake: Effectiveness of Large-Scale Restoration',
    status: 'scoping_review',
    statusLabel: 'Scoping Review (Stage 03)',
    temporalScope: '2011–2026',
    initiatedDate: '2026-05-12',
    lastUpdated: '2026-11-15',
    version: 'v0.4 (Scoping & Audit Cross-Check)',
    featured: false,
    heroImage: '/images/water-module/water-wetland.jpg',
    heroImageCaption: 'Wular Lake (Ramsar Site #461) — South Asia’s premier Jhelum floodplain flood-absorption basin across Bandipora and Baramulla.',

    subregion: 'Jhelum Basin',
    districts: ['Bandipora', 'Baramulla'],
    watershedOrBasin: 'Wular–Jhelum–Erin–Madhumati–Ningli Basin',
    elevationRangeM: '1,578–1,582 m ASL',
    coordinates: [34.341, 74.612],
    spatialEnvelopeKm2: 189,
    connectedEcosystems: ['Jhelum Mainstem Inflow & Sopore Outflow', 'Erin & Madhumati Torrents', 'Ningli Plantation Marshes', 'Hygam–Shallabugh Wetland Complex'],

    primaryDomainId: '02-wetlands-floodplains',
    secondaryDomainIds: ['01-lakes-limnology', '03-rivers-hydrology', '18-environmental-governance'],
    disciplineIds: ['hydrology', 'sedimentology', 'wetland-ecology', 'fisheries-science', 'ornithology', 'remote-sensing', 'ecological-economics'],
    linkedKewModules: [
      { moduleName: 'Sectoral EIA · Wular Basin Audit', route: '/sectoral-eia/sectors/agriculture', contributionNote: 'Supplies CAG 2025 cumulative stressor shares.' },
      { moduleName: 'Water Systems · Wetlands', route: '/water-systems/wetlands', contributionNote: 'Ramsar #461 seasonal open-water & marsh boundary dynamics.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0006', 'KEW-INV-0007'],

    scopingQuestions: [
      'How much net flood-detention volume (MCM) has been durably gained by WUCMA mechanical dredging and willow felling relative to ongoing annual siltation from Jhelum, Erin, and Madhumati inflows?',
      'What are the ecological effects of mechanical cut-and-dredge geometry on Trapa natans (water chestnut) livelihoods, Schizothorax spawning, and migratory waterfowl foraging depths?',
    ],
    executiveKeyFindings: [
      'Scoping review integrates the Comprehensive Management Action Plan (CMAP) for Wular with recent CAG performance audit observations on Wular Conservation and Management Authority (WUCMA) dredging and catchment siltation.',
    ],
    chronology: [
      { period: '1990', eventTitle: 'Ramsar Convention Designation (Site #461)', documentedRecord: 'Designated Wetland of International Importance.', sourceRef: 'REF-WUL-01', significance: 'Baseline' },
      { period: '2012–2025', eventTitle: 'WUCMA CMAP Dredging & Willow Removal Operations', documentedRecord: 'Large-scale mechanical desilting in critically silted zones and felling of millions of exotic/planted Salix trees; audited by CAG.', sourceRef: 'REF-WUL-02', significance: 'Intervention' },
    ],
    interventionInventory: [
      { id: 'INT-WUL-01', name: 'WUCMA Critical-Zone Mechanical Desilting & Willow Removal', period: '2012–2026', executingAgency: 'WUCMA', interventionType: 'Floodplain Lake Excavation & Canopy Clearance', reportedScaleOrOutlay: 'Multi-phase CMAP outlays', status: 'Ongoing', documentedOutcome: 'Expanded visible open-water expanse in northern/eastern sectors; net volumetric persistence against tributary siltation under scoping audit.' },
    ],
    disciplineFindings: [],
    evidenceMatrix: [
      {
        id: 'EVID-WUL-01',
        investigationCode: 'KEW-INV-0005',
        investigationSlug: 'wular-lake-effectiveness-of-large-scale-restoration',
        investigationTitle: 'Wular Lake: The Environmental Effectiveness of Large-Scale Restoration',
        assertion: 'Unabated catchment erosion and Jhelum-borne municipal solid/liquid waste continually countervail in-basin dredging gains in Wular Lake.',
        sourceCategory: 'Government Audit Records',
        classification: 'Documented',
        evidenceBasisSummary: 'Documented in CMAP baseline studies and CAG performance audit reviews of Wular basin management.',
        citationIds: ['REF-WUL-01', 'REF-WUL-02'],
        lastVerifiedDate: '2026-11-15',
      },
    ],
    accountabilityMatrix: [
      {
        id: 'ACC-WUL-01',
        investigationCode: 'KEW-INV-0005',
        investigationSlug: 'wular-lake-effectiveness-of-large-scale-restoration',
        investigationTitle: 'Wular Lake: The Environmental Effectiveness of Large-Scale Restoration',
        responsibleInstitution: 'Wular Conservation and Management Authority',
        institutionAcronym: 'WUCMA',
        statutoryMandate: 'Boundary demarcation, desilting, catchment conservation, and biodiversity restoration across Wular Ramsar Wetland.',
        projectOwnership: 'Wular CMAP Implementation',
        scientificResponsibility: 'Bathymetric storage verification and waterfowl/fisheries ecological monitoring.',
        financialResponsibility: '13th Finance Commission / UT / Centrally Sponsored Wetland allocations.',
        environmentalAuthorisation: 'Ramsar Convention & Wetlands Rules 2017.',
        monitoringObligations: 'Net water-holding capacity (MCM) and seasonal inundation extent.',
        documentedFindings: 'Boundary geo-tagging and open-water expansion achieved in dredged blocks; CAG noted upstream catchment-treatment and municipal waste interception gaps.',
        institutionalResponse: 'Scoping review inviting updated WUCMA bathymetric storage gain tables.',
        outstandingQuestions: ['What is the verified net change in Wular’s flood-absorption volume (MCM at 1,579 m contour) between 2012 and 2026?'],
        correctiveAction: 'Ongoing desilting and boundary pillar protection.',
        followUpStatus: 'Scoping Audit',
      },
    ],
    unansweredQuestions: ['What is the net volumetric storage change (MCM) after accounting for 2014–2025 Jhelum/Erin/Madhumati silt deposition?'],
    alternativeSolutions: [],
    recommendations: [],
    references: [
      { id: 'REF-WUL-01', authorsOrBody: 'Wetlands International South Asia (WISA)', year: 2007, title: 'Comprehensive Management Action Plan for Wular Lake, Kashmir', publicationOrSeries: 'Government of J&K / Ramsar Technical Report', referenceType: 'Technical Institute Report', provenanceNote: 'Foundational hydrological and ecological baseline for Wular.' },
      { id: 'REF-WUL-02', authorsOrBody: 'Comptroller and Auditor General of India (CAG)', year: 2025, title: 'Performance Audit Review on Conservation & Management of Wular Lake Basin', publicationOrSeries: 'Statutory Audit Report', referenceType: 'Statutory Audit (CAG)', provenanceNote: 'Audits dredging progress, catchment siltation, and multi-agency waste inflows.' },
    ],
    updatesLog: [{ date: '2026-11-15', version: 'v0.4', entryType: 'Initial Publication', summary: 'Initiated Stage 03 Scoping Review.', verifiedBy: 'KEW-EIAI Wetlands Desk' }],
    dataGaps: ['Multi-epoch bathymetric DEM of Wular Lake (2011 vs 2025).'],
    sections: buildScopingSections(
      'Scoping investigation evaluating whether large-scale mechanical dredging and willow clearance in Wular Lake have durably restored flood-attenuation volume and Ramsar ecological functions.',
      'Initiated to synthesize WISA CMAP baselines, Sentinel-1/2 inundation series, and 2025 CAG audit observations.',
      'Covers the ~189 km² Wular floodplain basin across Bandipora and Sopore/Baramulla.',
      'Historically South Asia’s largest Jhelum floodplain detention basin regulating downstream Baramulla–Uri flows.',
      true,
      'Examines stage-volume storage curves and Jhelum/Erin/Madhumati suspended sediment influx.'
    ),
  },

  // ─── KEW-INV-0006: HOKERSAR WETLAND ────────────────────────────────────────
  {
    code: 'KEW-INV-0006',
    slug: 'hokersar-disappearing-natural-flood-protection',
    title: "Hokersar: Kashmir's Disappearing Natural Flood Protection",
    subtitle: 'Wetland conversion, Doodhganga floodway sedimentation, waterfowl habitat transition, and urban flood-storage loss',
    shortTitle: "Hokersar: Disappearing Natural Flood Protection",
    status: 'scoping_review',
    statusLabel: 'Scoping Review (Stage 03)',
    temporalScope: '1990–2026',
    initiatedDate: '2026-06-01',
    lastUpdated: '2026-11-15',
    version: 'v0.4 (Scoping Review)',
    featured: false,
    heroImage: '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
    heroImageCaption: 'Hokersar Wetland Reserve (Ramsar Site #1570) on the western Srinagar–Budgam floodplain.',

    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Budgam'],
    watershedOrBasin: 'Doodhganga–Sukhnag Floodspill & Central Jhelum Floodplain',
    elevationRangeM: '1,580–1,584 m ASL',
    coordinates: [34.101, 74.715],
    spatialEnvelopeKm2: 13.75,
    connectedEcosystems: ['Doodhganga Flood Spill Channel', 'Narkara–Bemina Floodplain', 'Mirgund & Shallabugh Corridors'],

    primaryDomainId: '02-wetlands-floodplains',
    secondaryDomainIds: ['09-forests-biodiversity', '11-urbanisation-land-use', '17-climate-compound-hazards'],
    disciplineIds: ['wetland-ecology', 'ornithology', 'hydrology', 'sedimentology', 'remote-sensing', 'disaster-risk-science'],
    linkedKewModules: [
      { moduleName: 'Protected Areas · Wetland Reserves', route: '/protected-network/wetland-reserves', contributionNote: 'Hokersar Ramsar boundary and avifaunal census trends.' },
      { moduleName: 'Hazard Intelligence · Floods', route: '/hazard-intelligence', contributionNote: '2014 flood inundation and Doodhganga spill hydraulics.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0005', 'KEW-INV-0007'],

    scopingQuestions: [
      'How much flood-retention storage has Hokersar lost due to Doodhganga sediment deposition and peripheral Bemina–Zainakote urbanization?',
      'How have gated water-level manipulations and siltation altered foraging guilds across Central Asian Flyway migratory waterfowl?',
    ],
    executiveKeyFindings: [
      'Published remote-sensing studies (Romshoo & Rashid, 2014) document rapid siltation, marsh colonization of open water, and loss of flood-storage capacity in Hokersar since 1969.',
    ],
    chronology: [
      { period: '2005', eventTitle: 'Ramsar Designation (Site #1570)', documentedRecord: 'Notified as Ramsar Wetland of International Importance (13.75 km²).', sourceRef: 'REF-HOK-01', significance: 'Baseline' },
      { period: '2014', eventTitle: 'September 2014 Extreme Flood Event', documentedRecord: 'Heavy silt influx and peripheral urban backwater inundation across Bemina–Hokersar belt.', sourceRef: 'REF-HOK-01', significance: 'Ecological Shift' },
    ],
    interventionInventory: [
      { id: 'INT-HOK-01', name: 'Inlet/Outlet Needle-Gate Regulation & Channel Dredging', period: '2015–2026', executingAgency: 'Dept. of Wildlife Protection & I&FC', interventionType: 'Hydrological Gate & Silt Management', reportedScaleOrOutlay: 'Integrated Management Plan allocations', status: 'Ongoing', documentedOutcome: 'Maintains winter waterfowl ponding; long-term sediment bypass solution from Doodhganga under evaluation.' },
    ],
    disciplineFindings: [],
    evidenceMatrix: [
      {
        id: 'EVID-HOK-01',
        investigationCode: 'KEW-INV-0006',
        investigationSlug: 'hokersar-disappearing-natural-flood-protection',
        investigationTitle: "Hokersar: Kashmir's Disappearing Natural Flood Protection",
        assertion: 'Hokersar open-water area and flood-retention depth have contracted markedly since 1969 due to Doodhganga–Sukhnag siltation and peripheral land-use pressure.',
        sourceCategory: 'Scientific Literature',
        classification: 'Documented',
        evidenceBasisSummary: 'Established by Romshoo & Rashid (2014) multi-decadal satellite and hydrological analysis.',
        citationIds: ['REF-HOK-01'],
        lastVerifiedDate: '2026-11-15',
      },
    ],
    accountabilityMatrix: [
      {
        id: 'ACC-HOK-01',
        investigationCode: 'KEW-INV-0006',
        investigationSlug: 'hokersar-disappearing-natural-flood-protection',
        investigationTitle: "Hokersar: Kashmir's Disappearing Natural Flood Protection",
        responsibleInstitution: 'Department of Wildlife Protection (Wetlands Division) & I&FC Dept.',
        institutionAcronym: 'DWP / I&FC',
        statutoryMandate: 'Ramsar habitat conservation (DWP) and Doodhganga flood-channel hydraulic/sediment regulation (I&FC).',
        projectOwnership: 'Hokersar Integrated Management Plan',
        scientificResponsibility: 'Asian Waterbird Census & hydrological hydroperiod management.',
        financialResponsibility: 'NPCA / UT Wetland conservation grants.',
        environmentalAuthorisation: 'Wildlife (Protection) Act & Wetlands Rules 2017.',
        monitoringObligations: 'Seasonal water-depth maintenance (15–90 cm mosaic) and encroachment prevention.',
        documentedFindings: 'Dual-mandate tension between routing silt-laden floodwaters through Hokersar and preserving clear avifaunal shallows.',
        institutionalResponse: 'Scoping review compiling IMP progress reports.',
        outstandingQuestions: ['Is an upstream Doodhganga sediment-diversion weir planned to prevent direct flood-silt dumping into Hokersar’s core basin?'],
        correctiveAction: 'Boundary demarcation and seasonal gate management.',
        followUpStatus: 'Scoping Audit',
      },
    ],
    unansweredQuestions: ['What is Hokersar’s current 2026 flood-storage capacity (MCM) compared to its 1969 topographic volume?'],
    alternativeSolutions: [],
    recommendations: [],
    references: [
      { id: 'REF-HOK-01', authorsOrBody: 'Romshoo, S. A., & Rashid, I.', year: 2014, title: 'Assessing the impacts of anthropogenic activities on structurallyarz Hokersar wetland in Kashmir Himalayas', publicationOrSeries: 'Arabian Journal of Geosciences, 7, 143–160', referenceType: 'Peer-Reviewed Journal', provenanceNote: 'Multi-decadal spatial and hydrological baseline for Hokersar shrinkage.' },
    ],
    updatesLog: [{ date: '2026-11-15', version: 'v0.4', entryType: 'Initial Publication', summary: 'Scoping dossier registered.', verifiedBy: 'KEW-EIAI Wetlands Desk' }],
    dataGaps: ['Post-2020 high-resolution bathymetric survey of Hokersar core and reedbed zones.'],
    sections: buildScopingSections(
      'Scoping investigation into sedimentation, peripheral floodplain sealing, and the dual ecological–hydrological role of Hokersar Ramsar Reserve.',
      'Examines how western Srinagar’s primary natural flood cushion has lost storage capacity while supporting hundreds of thousands of migratory waterbirds.',
      '13.75 km² Ramsar reserve straddling Srinagar–Budgam along the Doodhganga floodway.',
      'Historically a deep-to-shallow perennial marsh mosaic buffering Jhelum/Doodhganga peak flows.',
      true,
      'Analyses Doodhganga suspended-silt inflow, needle-gate hydroperiod schedules, and Bemina floodplain connectivity.'
    ),
  },

  // ─── KEW-INV-0007: JHELUM RIVER ────────────────────────────────────────────
  {
    code: 'KEW-INV-0007',
    slug: 'jhelum-river-dredging-flood-management-morphology',
    title: 'Jhelum River: Dredging, Flood Management and River Morphology',
    subtitle: 'Post-2014 channel dredging, minor-mineral extraction, hydraulic conveyance, and floodplain disconnection',
    shortTitle: 'Jhelum River: Dredging & Flood Morphology',
    status: 'proposed',
    statusLabel: 'Proposed Investigation (Stage 01)',
    temporalScope: '2014–2026',
    initiatedDate: '2026-07-10',
    lastUpdated: '2026-11-12',
    version: 'v0.2 (Proposed Charter)',
    featured: false,
    heroImage: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
    heroImageCaption: 'Jhelum mainstem and tributary gravel-sand bars across the Kashmir Valley floor.',

    subregion: 'Jhelum Basin',
    districts: ['Anantnag', 'Pulwama', 'Srinagar', 'Bandipora', 'Baramulla'],
    watershedOrBasin: 'Upper Jhelum Mainstem & Flood Spill Channel (Sangam–Srinagar–Sopore–Baramulla)',
    elevationRangeM: '1,570–1,610 m ASL (Valley Floor Reach)',
    coordinates: [34.065, 74.805],
    spatialEnvelopeKm2: 1200,
    connectedEcosystems: ['Flood Spill Channel (Padshahi Bagh–Narkara–Wular)', 'Vishow & Rambiara Confluences', 'Wular Outfall at Sopore–Baramulla'],

    primaryDomainId: '03-rivers-hydrology',
    secondaryDomainIds: ['10-mining-quarrying', '17-climate-compound-hazards', '18-environmental-governance'],
    disciplineIds: ['geomorphology', 'hydraulics', 'hydrology', 'hydrological-modelling', 'sedimentology', 'disaster-risk-science'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Rivers', route: '/water-systems/rivers', contributionNote: 'Jhelum gauge stations (Sangam, Ram Munshi Bagh, Asham) and conveyance profiles.' },
      { moduleName: 'Hazard Intelligence · Floods', route: '/hazard-intelligence', contributionNote: 'September 2014 (>1,15,000 cusecs) benchmark flood routing.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0005', 'KEW-INV-0006'],

    scopingQuestions: [
      'By how many cusecs did post-2014 mainstem and Flood Spill Channel dredging durably increase bankfull conveyance at Ram Munshi Bagh and Sopore–Baramulla?',
      'Where has commercial riverbed sand/boulder mining caused excessive thalweg incision, bridge-pier scour, or irrigation lift-station drawdown?',
    ],
    executiveKeyFindings: [
      'Proposed investigation charter initiated to evaluate fluvial morphological responses, CWC/I&FC stage-discharge rating shifts, and NGT riverbed-mining orders across the Jhelum mainstem and tributaries.',
    ],
    chronology: [
      { period: 'Sept 2014', eventTitle: 'Catastrophic Kashmir Valley Flood', documentedRecord: 'Extreme Western Disturbance–monsoon interaction exceeded Jhelum channel & spill-channel capacity across Anantnag–Srinagar.', sourceRef: 'REF-JHE-01', significance: 'Baseline' },
    ],
    interventionInventory: [
      { id: 'INT-JHE-01', name: 'PMDP / JTFRP Phase-I Channel & Outfall Dredging', period: '2015–2024', executingAgency: 'Irrigation & Flood Control Dept. (I&FC)', interventionType: 'Fluvial Conveyance Dredging', reportedScaleOrOutlay: 'PMDP Flood Management Allocations', status: 'Completed', documentedOutcome: 'Subject of proposed longitudinal cross-section and rating-curve evaluation.' },
    ],
    disciplineFindings: [],
    evidenceMatrix: [
      {
        id: 'EVID-JHE-01',
        investigationCode: 'KEW-INV-0007',
        investigationSlug: 'jhelum-river-dredging-flood-management-morphology',
        investigationTitle: 'Jhelum River: Dredging, Flood Management and River Morphology',
        assertion: 'Floodplain wetland loss and Flood Spill Channel encroachment substantially amplified September 2014 flood inundation durations in Srinagar.',
        sourceCategory: 'Scientific Literature',
        classification: 'Documented',
        evidenceBasisSummary: 'Established by Romshoo et al. (2018) and post-2014 hydrological assessments.',
        citationIds: ['REF-JHE-01'],
        lastVerifiedDate: '2026-11-12',
      },
    ],
    accountabilityMatrix: [],
    unansweredQuestions: ['Have post-dredging longitudinal thalweg cross-sections (Sangam to Baramulla) been re-surveyed to measure aggradation rebound?'],
    alternativeSolutions: [],
    recommendations: [],
    references: [
      { id: 'REF-JHE-01', authorsOrBody: 'Romshoo, S. A., Altaf, S., Rashid, I., & Dar, R. A.', year: 2018, title: 'Climatic, geomorphic and anthropogenic drivers of the 2014 extreme flooding in the Jhelum basin of Kashmir, India', publicationOrSeries: 'Geomatics, Natural Hazards and Risk, 9(1), 224–248', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1080/19475705.2017.1417332', externalUrl: 'https://doi.org/10.1080/19475705.2017.1417332', provenanceNote: 'Benchmark scientific attribution of 2014 Jhelum flood drivers.' },
    ],
    updatesLog: [{ date: '2026-11-12', version: 'v0.2', entryType: 'Initial Publication', summary: 'Proposed investigation charter published for scientific intake.', verifiedBy: 'KEW-EIAI Fluvial Desk' }],
    dataGaps: ['Pre-2015 vs 2025 I&FC cross-sectional bathymetry and updated stage-discharge rating curves.'],
    sections: buildScopingSections(
      'Proposed fluvial investigation examining the hydraulic durability of post-2014 Jhelum dredging, Flood Spill Channel capacity, and tributary gravel/sand extraction impacts.',
      'Initiated under Stage 01 Scoping Charter without predetermined conclusions.',
      'Covers the low-gradient valley-floor meander belt from Sangam through Srinagar and Wular to the Baramulla rock-sill outfall.',
      'Historically buffered by interconnected floodplain wetlands absorbing excess discharge above ~35,000–45,000 cusecs.',
      true,
      'Will evaluate Manning conveyance, Exner sediment continuity, and off-channel detention routing.'
    ),
  },

  // ─── KEW-INV-0008: KOLAHOI GLACIER ─────────────────────────────────────────
  {
    code: 'KEW-INV-0008',
    slug: 'kolahoi-glacier-future-of-kashmirs-water-security',
    title: "Kolahoi Glacier: The Future of Kashmir's Water Security",
    subtitle: 'Glaciological mass-balance retreat, black-carbon albedo forcing, proglacial hazards, and Lidder–Jhelum water-resource vulnerability',
    shortTitle: "Kolahoi Glacier: Kashmir's Water Security",
    status: 'proposed',
    statusLabel: 'Proposed Investigation (Stage 01)',
    temporalScope: '1962–2026',
    initiatedDate: '2026-08-05',
    lastUpdated: '2026-11-12',
    version: 'v0.2 (Proposed Charter)',
    featured: false,
    heroImage: '/images/water-module/water-glacier.jpg',
    heroImageCaption: 'Kolahoi Glacier (~4,700–5,425 m ASL) — principal perennial ice reserve feeding the West Lidder and Sind headwaters.',

    subregion: 'Greater Himalaya',
    districts: ['Anantnag', 'Ganderbal'],
    watershedOrBasin: 'West Lidder & Sind Headwater Catchments',
    elevationRangeM: '3,650–5,425 m ASL',
    coordinates: [34.188, 75.331],
    spatialEnvelopeKm2: 65,
    connectedEcosystems: ['West Lidder River (Aru–Pahalgam)', 'Dudhsar & Hoksar Proglacial Lakes', 'Downstream Anantnag Irrigation & Drinking Water'],

    primaryDomainId: '05-glaciers-cryosphere',
    secondaryDomainIds: ['16-atmospheric-environment', '17-climate-compound-hazards', '03-rivers-hydrology'],
    disciplineIds: ['climatology', 'atmospheric-science', 'geomorphology', 'hydrology', 'remote-sensing', 'hydrological-modelling'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Glaciers', route: '/water-systems/glaciers', contributionNote: 'Kolahoi terminus retreat and glacierized area time series.' },
      { moduleName: 'Earth & Human Impact · Glacier Recession', route: '/earth-human-impact/aquatic-cryosphere/glacier-recession', contributionNote: 'Elevation-band ice loss and debris-cover dynamics.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0002', 'KEW-INV-0007'],

    scopingQuestions: [
      'What are the relative contributions of regional elevation-dependent warming, winter Western Disturbance snow deficits, and valley black-carbon aerosol deposition to Kolahoi’s accelerated mass loss?',
      'When does Kolahoi cross peak-water inflection for late-summer (August–September) West Lidder irrigation and drinking-water baseflows?',
    ],
    executiveKeyFindings: [
      'Published glaciological studies (Rashid et al., 2017; Shukla et al., 2017) document ~23% area loss of Kolahoi Glacier since 1962 alongside fragmentation and proglacial tarn expansion.',
    ],
    chronology: [
      { period: '1962–2018', eventTitle: 'Multi-Decadal Area & Geodetic Mass Loss Documented', documentedRecord: 'Survey of India toposheet to Sentinel/Landsat comparisons established ~23% area shrinkage and negative geodetic mass balance.', sourceRef: 'REF-KOL-01', significance: 'Ecological Shift' },
    ],
    interventionInventory: [],
    disciplineFindings: [],
    evidenceMatrix: [
      {
        id: 'EVID-KOL-01',
        investigationCode: 'KEW-INV-0008',
        investigationSlug: 'kolahoi-glacier-future-of-kashmirs-water-security',
        investigationTitle: "Kolahoi Glacier: The Future of Kashmir's Water Security",
        assertion: 'Kolahoi Glacier has lost ~23% of its surface area since 1962 with accelerating snout retreat and fragmentation.',
        sourceCategory: 'Scientific Literature',
        classification: 'Documented',
        evidenceBasisSummary: 'Established by Rashid et al. (2017) using Corona, Landsat, and high-resolution satellite series paired with field observations.',
        citationIds: ['REF-KOL-01'],
        lastVerifiedDate: '2026-11-12',
      },
    ],
    accountabilityMatrix: [],
    unansweredQuestions: ['How can valley-floor black-carbon sources (brick kilns, winter biomass burning, diesel transport) be quantified in Kolahoi snowpack samples?'],
    alternativeSolutions: [],
    recommendations: [],
    references: [
      { id: 'REF-KOL-01', authorsOrBody: 'Rashid, I., Romshoo, S. A., & Abdullah, T.', year: 2017, title: 'The recent deglaciation of Kolahoi glacier in Kashmir Himalaya, India in response to the changing climate', publicationOrSeries: 'Journal of Asian Earth Sciences, 138, 38–50', referenceType: 'Peer-Reviewed Journal', doiOrOfficialRef: '10.1016/j.jseaes.2017.02.002', externalUrl: 'https://doi.org/10.1016/j.jseaes.2017.02.002', provenanceNote: 'Authoritative peer-reviewed baseline on Kolahoi Glacier shrinkage.' },
    ],
    updatesLog: [{ date: '2026-11-12', version: 'v0.2', entryType: 'Initial Publication', summary: 'Proposed cryospheric water-security charter published.', verifiedBy: 'KEW-EIAI Cryosphere Desk' }],
    dataGaps: ['Multi-year in-situ glaciological stake mass-balance & black-carbon snow-pit series on Kolahoi ablation zone.'],
    sections: buildScopingSections(
      'Proposed cryospheric and hydrological investigation into the mass-balance retreat of Kolahoi Glacier — Kashmir’s flagship “Goddess of Light” water tower — and its consequences for Lidder–Jhelum water security.',
      'Examines regional climate forcing, local black-carbon albedo reduction, proglacial lake evolution, and downstream late-summer irrigation risk.',
      'Headwaters of West Lidder (above Aru/Pahalgam) and Sind watershed divide in the Greater Himalaya.',
      'Shrinkage of ~23% since 1962 documented across declassified Corona and modern satellite series.',
      true,
      'Models snowmelt vs glacier-ice melt shares in West Lidder late-summer low flows.'
    ),
  },

  // ─── KEW-INV-0009: KASHMIR'S LAKES — FROM OLIGOTROPHY TO EUTROPHICATION ────
  {
    code: 'KEW-INV-0009',
    slug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
    title: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
    subtitle:
      'A Comprehensive Limnological Assessment Across Urban, Rural, Subalpine and Alpine Lake Ecosystems',
    shortTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
    status: 'active_investigation',
    statusLabel: 'Scientific Review · Regional Trophic Atlas',
    temporalScope: '1967–2026',
    initiatedDate: '2026-11-25',
    lastUpdated: '2026-11-25',
    version: 'v0.9 (Scientific Review · Synchronized with KEW-SR-2026-101)',
    featured: true,
    heroImage: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    heroImageCaption:
      'Comparative trophic gradient across 521 deduplicated Kashmir Division lakes spanning valley-floor urban/floodplain basins (~1,580 m ASL) to ultra-oligotrophic alpine glacial tarns (>4,200 m ASL).',

    subregion: 'Multi-District Kashmir Basin',
    districts: [
      'Srinagar',
      'Bandipora',
      'Baramulla',
      'Ganderbal',
      'Anantnag',
      'Budgam',
      'Pulwama',
      'Shopian',
      'Kulgam',
      'Kupwara',
    ],
    watershedOrBasin: 'All 10 Districts of Kashmir Division (Jhelum, Lidder, Sind, Pohru & High-Altitude Glacial Sub-Basins)',
    elevationRangeM: '1,578–4,550+ m ASL',
    coordinates: [34.125, 74.835],
    spatialEnvelopeKm2: 15948,
    connectedEcosystems: [
      `${MLS.kashmirUrbanLakes} Urban Lakes`,
      `${MLS.kashmirRuralFloodplainLakes} Rural & Floodplain Lakes`,
      `${MLS.kashmirMontaneSubalpineLakes} Montane & Subalpine Lakes`,
      `${MLS.kashmirAlpineLakes} Alpine & Glacial Lakes`,
    ],

    primaryDomainId: '01-lakes-limnology',
    secondaryDomainIds: [
      '02-wetlands-floodplains',
      '05-glaciers-cryosphere',
      '06-alpine-mountain-ecology',
      '13-agriculture-horticulture',
      '15-solid-waste-sewage',
      '18-environmental-governance',
    ],
    disciplineIds: [
      'limnology',
      'hydrology',
      'hydrodynamics',
      'aquatic-ecology',
      'wetland-ecology',
      'restoration-ecology',
      'environmental-chemistry',
      'geochemistry',
      'environmental-microbiology',
      'remote-sensing',
      'gis',
      'environmental-data-science',
      'environmental-engineering',
      'environmental-law',
    ],
    linkedKewModules: [
      {
        moduleName: 'Flagship 20-Chapter Monograph & PDF (KEW-SR-2026-101)',
        route: '/sectoral-eia/reports/kew-sr-2026-101',
        contributionNote:
          'Complete 20-chapter regional trophic status monograph, Appendices A–O, and downloadable A4 PDF.',
      },
      {
        moduleName: 'Water Systems · Kashmir Lakes & Trophic Atlas',
        route: '/water-systems/lakes',
        contributionNote: `Interactive spatial & tabular explorer across all ${MLS.kashmirDivisionTotalUniqueIdentities} deduplicated Kashmir Division lake identities.`,
      },
      {
        moduleName: 'Water Systems · Water Quality & Limnology',
        route: '/water-systems/water-quality',
        contributionNote: 'Unaveraged Carlson (1977) TSI(SD), TSI(Chl-a), and TSI(TP) diagnostics with nutrient & DO profiles.',
      },
      {
        moduleName: 'Hazard Intelligence · Algal Bloom Sentinel',
        route: '/hazard-intelligence/algal-bloom-intelligence',
        contributionNote: `Optical Sentinel-2 chlorophyll/NDCI bloom screening across ${MLS.kashmirOpticalBloomEligibleCount} eligible lakes.`,
      },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0002', 'KEW-INV-0003', 'KEW-INV-0005', 'KEW-INV-0006'],

    scopingQuestions: [
      `How do historical areal persistence (1967 Survey of India vs 2009 LISS-III vs 2024–2025 Sentinel-2) and contemporary trophic states vary across all ${MLS.kashmirDivisionTotalUniqueIdentities} deduplicated lakes in Kashmir Division?`,
      'Which external catchment loads (untreated municipal sewage, houseboat blackwater, floodplain nitrogen/orchard runoff) versus internal anoxic sediment phosphorus release govern non-linear transitions from oligotrophy/mesotrophy to hypereutrophication?',
      `What phased monitoring protocol is required to close the ${MLS.kashmirRequiringTrophicAssessment}-lake empirical data gap without fabricating or extrapolating trophic indices?`,
    ],
    executiveKeyFindings: [
      `Spatial entity reconciliation across DEERS 2012 (415 Kashmir records), CAG Report No. 4 of 2025 (330 historical comparison records), University of Kashmir Zenodo GIS (155 glacial lake polygons), and the Ministry of Jal Shakti First Census (37 J&K lakes) establishes ${MLS.kashmirDivisionTotalUniqueIdentities} unique Kashmir Division lake identities (${MLS.kashmirActiveOrObservedLakes} active/observed; ${MLS.kashmirHistoricallyDisappearedOrConverted} historically disappeared or converted).`,
      `Strict unaveraged Carlson (1977) TSI verification confirms dated trophic measurements for ${MLS.kashmirWithVerifiedTrophicStatus} Kashmir lakes (${MLS.kashmirTrophicBreakdown.Oligotrophic} Oligotrophic, ${MLS.kashmirTrophicBreakdown.Mesotrophic} Mesotrophic, ${MLS.kashmirTrophicBreakdown.Eutrophic} Eutrophic, ${MLS.kashmirTrophicBreakdown.Hypereutrophic} Hypereutrophic), while ${MLS.kashmirRequiringTrophicAssessment} unmeasured lakes are transparently classified as Insufficient Evidence rather than inferred.`,
    ],
    chronology: [
      {
        period: '1967–1982',
        eventTitle: 'Survey of India Toposheet Baseline & Foundational Kashmir Limnology',
        documentedRecord:
          '1:50,000 Survey of India mapping and Zutshi et al. (1980) comparative Himalayan lake studies documented clear-water macrophyte dominance in valley lakes and ultra-oligotrophy in high-altitude tarns.',
        sourceRef: 'REF-KLE-05',
        significance: 'Baseline',
      },
      {
        period: '2009–2012',
        eventTitle: 'DEERS J&K Satellite Lake & Waterbody Directory (LISS-III)',
        documentedRecord:
          'DEERS (2012) inventoried 415 Kashmir Division waterbodies >=2.25 ha and compared 45 major lakes against 1967 baselines, documenting widespread open-water contraction and marshy infill.',
        sourceRef: 'REF-KLE-01',
        significance: 'Ecological Shift',
      },
      {
        period: '2023–2025',
        eventTitle: 'Jal Shakti Census, CAG Audit No. 4 of 2025 & KU Glacial Lake GIS',
        documentedRecord:
          'CAG (2025) audited 330 historical Kashmir waterbodies and flagged 13 dried/converted lakes alongside STP/conservation gaps; Rashid & Kashani (2025) mapped 155 glacial lake polygons (1992–2024 expansion).',
        sourceRef: 'REF-KLE-02',
        significance: 'Audit / Judicial',
      },
      {
        period: 'Nov 2026',
        eventTitle: 'KEW 10-District Master Lake Reconciliation & Regional Trophic Monograph',
        documentedRecord: `Reconciled overlapping statutory and academic inventories into ${MLS.kashmirDivisionTotalUniqueIdentities} unique Kashmir Division lake identities under Scientific Review (KEW-SR-2026-101 / KEW-INV-0009).`,
        sourceRef: 'REF-KLE-03',
        significance: 'Intervention',
      },
    ],
    interventionInventory: [
      {
        id: 'INT-KLE-01',
        name: 'Dal–Nigeen & Brari Nambal Sewage Interception, FAB STPs & Mechanical De-weeding',
        period: '1997–Present',
        executingAgency: 'LCMA / UEED',
        interventionType: 'Urban Lake Wastewater & In-Lake Biomass Management',
        reportedScaleOrOutlay: 'NLCP, AMRUT & Prime Minister Development Package allocations',
        status: 'Ongoing',
        documentedOutcome:
          'Partial sewage interception achieved, but secondary FAB STPs without tertiary phosphorus stripping and unintercepted storm/houseboat drains sustain eutrophic-to-hypereutrophic nutrient loads.',
      },
      {
        id: 'INT-KLE-02',
        name: 'Wular Lake Comprehensive Management Action Plan (CMAP) Dredging & Willow Removal',
        period: '2011–Present',
        executingAgency: 'WUCMA',
        interventionType: 'Floodplain Lake Desiltation & Storage Restoration',
        reportedScaleOrOutlay: 'State/UT & National Plan Conservation Grants',
        status: 'Ongoing',
        documentedOutcome:
          'Localised open-water gains recorded, while upstream Jhelum/Erin/Madhumati siltation and agricultural nitrogen inflow continue.',
      },
      {
        id: 'INT-KLE-03',
        name: 'Khushalsar, Gilsar & Anchar Urban Twin-Lake Desilting & Encroachment Drives',
        period: '2021–Present',
        executingAgency: 'LCMA / SMC / Civil Society Collaborations',
        interventionType: 'Channel Re-opening & Solid-Waste Removal',
        reportedScaleOrOutlay: 'Municipal & UT Convergence Works',
        status: 'Ongoing',
        documentedOutcome:
          'Surface waste clearance improved open-water visibility in pockets, but raw domestic greywater/sewage inflows keep Anchar–Khushalsar–Gilsar hypereutrophic.',
      },
    ],
    disciplineFindings: [
      {
        disciplineId: 'limnology',
        disciplineName: 'Limnology',
        clusterName: 'Water & Aquatic Sciences',
        methodologyApplied:
          'Individual unaveraged Carlson (1977) TSI(SD), TSI(Chl-a), and TSI(TP) computation strictly where dated empirical measurements exist.',
        equationOrMetricUsed:
          'TSI(SD) = 60 - 14.41 ln(SD); TSI(Chl) = 9.81 ln(Chl) + 30.6; TSI(TP) = 14.42 ln(TP) + 4.15',
        empiricalFinding:
          'Divergence between TSI(TP) > TSI(Chl-a) in macrophyte-choked basins indicates luxury phosphorus uptake by Ceratophyllum/Myriophyllum/Azolla, whereas TSI(SD) > TSI(Chl-a) in glacial-silt and floodplain basins reflects non-algal mineral turbidity.',
        uncertaintyAndLimitations: `Empirical hydrochemistry exists for ${MLS.kashmirWithVerifiedTrophicStatus} of ${MLS.kashmirDivisionTotalUniqueIdentities} Kashmir lakes; ${MLS.kashmirRequiringTrophicAssessment} lakes remain unassessed.`,
        verificationClass: 'Documented',
      },
      {
        disciplineId: 'environmental-chemistry',
        disciplineName: 'Environmental Chemistry',
        clusterName: 'Chemical & Atmospheric Sciences',
        methodologyApplied:
          'External watershed N/P mass-balance vs benthic anoxic Fe-bound phosphorus release review.',
        equationOrMetricUsed: 'J_P = -φ D_s (∂C_pore / ∂z) under benthic DO < 2.0 mg/L',
        empiricalFinding:
          'In hypereutrophic urban basins (Brari Nambal, Anchar, Khushalsar, Gilsar, interior Dal channels), summer benthic anoxia remobilises legacy sediment orthophosphate, creating internal loading hysteresis.',
        uncertaintyAndLimitations:
          ' intact sediment-core diffusive flux incubations are lacking for most rural Karst/Karewa lakes.',
        verificationClass: 'Provisionally Supported',
      },
      {
        disciplineId: 'remote-sensing',
        disciplineName: 'Remote Sensing & GIS',
        clusterName: 'Spatial & Computational Sciences',
        methodologyApplied:
          'Multi-inventory spatial deduplication (WGS84 centroid/polygon matching) + Sentinel-2 NDCI/MNDWI optical eligibility screening.',
        equationOrMetricUsed:
          'NDCI = (B5_705nm - B4_665nm) / (B5_705nm + B4_665nm) restricted to open-water pixels >=4 ha free of ice/shadow',
        empiricalFinding: `Reconciles 937 overlapping raw institutional rows into ${MLS.kashmirDivisionTotalUniqueIdentities} unique Kashmir Division lakes and restricts automated satellite bloom screening to ${MLS.kashmirOpticalBloomEligibleCount} optically valid lakes to eliminate mixed-pixel false positives.`,
        uncertaintyAndLimitations:
          '20 m red-edge bands cannot resolve narrow <30 m urban channels or slush-ice alpine margins without sub-metre UAV/in-situ validation.',
        verificationClass: 'Documented',
      },
    ],
    evidenceMatrix: [
      {
        id: 'EVID-KLE-01',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion: `Spatial deduplication of DEERS (415), CAG 2025 (330), KU Zenodo 2025 (155), and Jal Shakti Census (37) inventories yields ${MLS.kashmirDivisionTotalUniqueIdentities} unique lake identities across the 10 districts of Kashmir Division.`,
        sourceCategory: 'Satellite & GIS Archive',
        classification: 'Documented',
        evidenceBasisSummary:
          'Source inventories overlap rather than add; deterministic coordinate, watershed, and toponym reconciliation is published in the KEW Master Lake Registry (CSV/GeoJSON).',
        citationIds: ['REF-KLE-01', 'REF-KLE-02', 'REF-KLE-03', 'REF-KLE-04'],
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-02',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion:
          'DEERS (2012) LISS-III comparisons against 1967 Survey of India baselines and CAG Report No. 4 of 2025 document severe areal shrinkage across valley floodplain/urban lakes and complete conversion/loss of 31 historical Kashmir waterbodies.',
        sourceCategory: 'Government Audit Records',
        classification: 'Documented',
        evidenceBasisSummary:
          'Directly established by DEERS (2012) Table of 45 Present-Status Kashmir Lakes and CAG Report No. 4 of 2025 audit of 330 historical Kashmir waterbodies.',
        citationIds: ['REF-KLE-01', 'REF-KLE-02'],
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-03',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion:
          'High-altitude glacial lakes in Kashmir expanded in surface area and count between 1992 and 2024 due to cryospheric recession, moving in the opposite areal direction to shrinking valley-floor lakes.',
        sourceCategory: 'Scientific Literature',
        classification: 'Documented',
        evidenceBasisSummary:
          'Quantified across 155 georeferenced glacial lake polygons by Rashid & Kashani (2025, Zenodo DOI: 10.5281/zenodo.15051825).',
        citationIds: ['REF-KLE-03'],
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-04',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion:
          'Urban and peri-urban valley basins receiving untreated sewage or secondary STP effluent (Brari Nambal, Anchar, Khushalsar, Gilsar, interior Dal pockets) exhibit eutrophic to hypereutrophic conditions (TP > 50–300 µg/L, benthic hypoxia, Azolla/Microcystis blooms).',
        sourceCategory: 'Scientific Literature',
        classification: 'Documented',
        evidenceBasisSummary:
          'Confirmed across multi-decadal peer-reviewed limnological series (Zutshi et al., 1980; Rashid et al., 2017; Dar et al., 2020) and statutory JKPCC/CAG water-quality annexures.',
        citationIds: ['REF-KLE-02', 'REF-KLE-05', 'REF-KLE-06', 'REF-KLE-07'],
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-05',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion: `Contemporary trophic status remains unmeasured for ${MLS.kashmirRequiringTrophicAssessment} of ${MLS.kashmirDivisionTotalUniqueIdentities} Kashmir Division lakes (predominantly remote alpine tarns and unmonitored rural ponds).`,
        sourceCategory: 'Technical Institute Report',
        classification: 'Documented',
        evidenceBasisSummary:
          'Verified audit finding of the KEW Master Lake Registry; unmeasured lakes are strictly retained as Insufficient Evidence.',
        citationIds: ['REF-KLE-01', 'REF-KLE-03', 'REF-KLE-06'],
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-06',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion:
          'Secondary Fluidized Aerobic Bio-Reactor (FAB) STPs around Dal Lake lack dedicated tertiary chemical/biological phosphorus stripping, allowing dissolved orthophosphate to continue fueling macrophyte and algal growth despite BOD reduction.',
        sourceCategory: 'Government Audit Records',
        classification: 'Documented',
        evidenceBasisSummary:
          'Documented in CAG conservation audits and environmental engineering evaluations of Dal–Nigeen STP effluent nutrient concentrations.',
        citationIds: ['REF-KLE-02', 'REF-KLE-07'],
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-07',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion:
          'Elevation-dependent warming and prolonged summer thermal stratification are accelerating early mesotrophic phytoplankton shifts in subalpine and mid-elevation forest lakes (e.g., Nilnag, Manasbal hypolimnion).',
        sourceCategory: 'Hydrological & Telemetry Series',
        classification: 'Provisionally Supported',
        evidenceBasisSummary:
          'Supported by episodic summer DO depletion and surface warming trends in Manasbal and Nilnag, awaiting continuous multi-year thermistor-chain and Chl-a fluorometry profiles.',
        citationIds: ['REF-KLE-05', 'REF-KLE-07'],
        methodologicalRequirement:
          'Deploy continuous vertical thermistor/optical-DO chains and seasonal APHA TP/Chl-a sampling across Manasbal, Nilnag, and Gangabal–Nundkol sentinel pairs.',
        lastVerifiedDate: '2026-11-25',
      },
      {
        id: 'EVID-KLE-08',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        assertion:
          'Quantitative microcystin-LR and anatoxin-a hepatotoxin/neurotoxin thresholds are routinely exceeded across all bloom-prone rural Kashmir floodplain lakes during August–September.',
        sourceCategory: 'Field Survey Protocol',
        classification: 'Unverified',
        evidenceBasisSummary:
          'While cyanobacterial dominance (Microcystis, Dolichospermum) is documented in eutrophic valley basins, systematic LC-MS/MS or ELISA extracellular cyanotoxin assays across rural Kashmir lakes have not yet been published.',
        citationIds: ['REF-KLE-06'],
        methodologicalRequirement:
          'Execute late-summer (Jul–Sep) ELISA screening and LC-MS/MS confirmation for microcystin-LR, cylindrospermopsin, and anatoxin-a at drinking-water and fishery intakes.',
        lastVerifiedDate: '2026-11-25',
      },
    ],
    accountabilityMatrix: [
      {
        id: 'ACC-KLE-01',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        responsibleInstitution: 'J&K Lake Conservation and Management Authority',
        institutionAcronym: 'LCMA',
        statutoryMandate:
          'Conservation, sewage interception, catchment management, and water-quality restoration across notified urban lakes (Dal, Nigeen, Brari Nambal, Khushalsar, Gilsar, Anchar).',
        projectOwnership: 'Dal–Nigeen STPs, houseboat sanitation network, de-weeding, and settling basins',
        scientificResponsibility:
          'Station-wise limnological nutrient (TP, TN, Chl-a, DO, Secchi) monitoring and STP inlet/outlet phosphorus mass-balance reporting.',
        financialResponsibility: 'Central & UT conservation capital and O&M outlays.',
        environmentalAuthorisation: 'Water Act 1974 & J&K High Court / NGT oversight directives.',
        monitoringObligations: 'Monthly multi-basin physicochemical and STP effluent public disclosure.',
        documentedFindings:
          'CAG Report No. 4 of 2025 and NGT proceedings noted persistent untreated sewage inflows, unlinked houseboat/shoreline drains, and lack of tertiary phosphorus removal.',
        institutionalResponse:
          'Ongoing houseboat floating-sewer/STP upgrade tenders and Khushalsar–Gilsar rejuvenation drives reported.',
        outstandingQuestions: [
          'What is the verified monthly orthophosphate and total phosphorus removal efficiency (%) at each operational Dal–Nigeen STP?',
          'When will complete station-wise raw limnological CSV time series be published openly?',
        ],
        correctiveAction: 'Tertiary phosphorus polishing retrofits and 100% houseboat/drain interception required.',
        followUpStatus: 'Under Statutory Review',
      },
      {
        id: 'ACC-KLE-02',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        responsibleInstitution: 'J&K Wetland Authority & Wular Conservation and Management Authority',
        institutionAcronym: 'JKWA / WUCMA',
        statutoryMandate:
          'Statutory boundary notification, Integrated Management Plans, and ecological character protection under the Wetlands (Conservation and Management) Rules, 2017.',
        projectOwnership: 'Ramsar sites (Wular, Hokersar, Hygam, Shallabugh) and notified rural/floodplain lakes',
        scientificResponsibility:
          'Cadastral digital boundary notification, bathymetric siltation tracking, and trophic status baseline surveys.',
        financialResponsibility: 'NPCA & UT Wetland Conservation Grants.',
        environmentalAuthorisation: 'Wetlands (Conservation and Management) Rules, 2017 & Ramsar Convention.',
        monitoringObligations: 'Brief Documents, health cards, and seasonal hydroperiod/water-quality reporting.',
        documentedFindings:
          'CAG (2025) documented unnotified boundaries across scores of DEERS-inventoried rural waterbodies and continuing silt/nutrient ingress into floodplain wetlands.',
        institutionalResponse:
          'Phased wetland health-card preparation and boundary demarcation initiated for priority waterbodies.',
        outstandingQuestions: [
          'What is the district-wise schedule for notifying statutory boundaries and buffer zones for all surviving DEERS (2012) rural lakes?',
        ],
        correctiveAction: 'Accelerate cadastral GIS boundary notification and agricultural bio-swale nutrient buffers.',
        followUpStatus: 'Clarification Invited',
      },
    ],
    unansweredQuestions: [
      `Which of the ${MLS.kashmirRequiringTrophicAssessment} currently unassessed Kashmir Division lakes already exhibit early mesotrophic or eutrophic nutrient enrichment?`,
      'What fraction of summer orthophosphate in Dal, Nigeen, Anchar, and Manasbal originates from internal anoxic sediment release versus active external sewage/runoff outfalls?',
      'Are microcystin-LR concentrations exceeding the WHO 1.0 µg/L drinking-water guideline during late-summer cyanobacterial blooms in valley lakes?',
    ],
    alternativeSolutions: [
      {
        title: 'Tertiary Phosphorus Stripping & Constructed Phragmites/Typha Polishing Wetlands',
        mechanism:
          'Retrofits alum/ferric or biological phosphorus removal onto existing FAB STPs coupled with littoral emergent macrophyte bio-retention cells at tributary mouths.',
        evidencePrecedent: 'Lake Biwa (Shiga Prefecture) & Veluwemeer shallow-lake external P-cutoff recovery.',
        feasibilityNote:
          'Addresses the root limiting-nutrient driver of eutrophication rather than repeatedly harvesting symptom biomass.',
      },
      {
        title: 'Tiered 3-Level Regional Lake Monitoring Network (Sentinel + Citizen Secchi + Core Lab)',
        mechanism: `Pairs bi-weekly Sentinel-2 optical screening (${MLS.kashmirOpticalBloomEligibleCount} eligible lakes) with calibrated Secchi/EC field kits across 100 rural/subalpine lakes and full APHA/LC-MS seasonal profiling at 30 sentinel basins.`,
        evidencePrecedent: 'US EPA National Lakes Assessment & European Water Framework Directive surveillance tiers.',
        feasibilityNote: `Closes the ${MLS.kashmirRequiringTrophicAssessment}-lake data gap cost-effectively within 24 months.`,
      },
    ],
    recommendations: [
      {
        id: 'REC-KLE-01',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        horizon: 'Immediate (0–12 Months)',
        title: 'Mandate Open Monthly TP, TN, Chl-a & Secchi Disclosure + Tertiary P-Removal Audit',
        actionSpecification:
          'Publish station-wise raw CSV water-quality logs and inlet/outlet orthophosphate mass balances for all STPs discharging into Dal, Nigeen, Brari Nambal, Anchar, and Wular.',
        targetInstitution: 'LCMA, JKPCC & UEED',
        scientificJustification:
          'Carlson TSI trajectories cannot be verified or reversed without transparent limiting-nutrient load accounting.',
        verificationIndicator: 'Public monthly CSV portal live for 100% of operational STPs and monitored urban lake basins.',
        status: 'Proposed',
      },
      {
        id: 'REC-KLE-02',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        horizon: 'Medium-Term (1–3 Years)',
        title: 'Notify Cadastral GIS Buffers for All Surviving DEERS Rural Lakes & Establish 50-Lake Baseline Assay',
        actionSpecification:
          'Complete Wetlands Rules 2017 boundary notification across all 10 districts and execute standardized summer/autumn Secchi, Chl-a, TP, TN, and DO sampling across 50 unassessed rural and subalpine lakes.',
        targetInstitution: 'J&K Wetland Authority, DEERS & Revenue Department',
        scientificJustification:
          'Prevents irreversible infill of undocumented rural waterbodies while establishing empirical trophic baselines.',
        verificationIndicator: '50 previously unassessed lakes upgraded from Insufficient Evidence to Scientifically Assessed.',
        status: 'Proposed',
      },
      {
        id: 'REC-KLE-03',
        investigationCode: 'KEW-INV-0009',
        investigationSlug: 'kashmirs-lakes-from-oligotrophy-to-eutrophication',
        investigationTitle: "Kashmir's Lakes: From Oligotrophy to Eutrophication",
        horizon: 'Long-Term (3–10 Years)',
        title: 'Zero-Sewage Catchment Diversion, Orchard/Paddy Bio-Swales & Alpine Pack-Animal Exclusion Buffers',
        actionSpecification:
          'Achieve >80% external phosphorus load reduction in urban/floodplain lakes and enforce strict 200 m zero-camp/zero-equine oligotrophic protection buffers around high-altitude glacial lakes.',
        targetInstitution: 'Housing & Urban Development Dept., Agriculture Dept., Forest/Wildlife Dept. & SASB/PDAs',
        scientificJustification:
          'Shallow eutrophic lakes exhibit strong hysteresis requiring deep external P cuts, while ultra-oligotrophic alpine tarns have near-zero buffering capacity.',
        verificationIndicator: 'Measurable downward shift in summer TSI(Chl-a) and TSI(TP) across sentinel valley lakes; zero trophic drift in alpine tarns.',
        status: 'Proposed',
      },
    ],
    references: [
      {
        id: 'REF-KLE-01',
        authorsOrBody: 'Department of Ecology, Environment and Remote Sensing (DEERS), Govt. of J&K',
        year: 2012,
        title: 'Directory of Lakes and Waterbodies of J&K State (IRS-P6 LISS-III Inventory & 1967–2009 Comparison)',
        publicationOrSeries: 'Official Remote Sensing Inventory, Government of Jammu & Kashmir',
        referenceType: 'Technical Institute Report',
        externalUrl: 'https://rsis.ramsar.org/RISapp/files/42191262/documents/IN2496_descr220412_1.pdf',
        provenanceNote: 'Primary baseline for 415 Kashmir Division waterbodies and 45 historical areal change comparisons.',
      },
      {
        id: 'REF-KLE-02',
        authorsOrBody: 'Comptroller and Auditor General of India (CAG)',
        year: 2025,
        title: 'Report No. 4 of 2025 — Performance Audit on Conservation and Management of Waterbodies in Jammu & Kashmir',
        publicationOrSeries: 'Statutory Audit Report, Government of India',
        referenceType: 'Statutory Audit (CAG)',
        provenanceNote: 'Documents 330 historical Kashmir waterbodies, 13 dried/converted named lakes, and conservation governance gaps.',
      },
      {
        id: 'REF-KLE-03',
        authorsOrBody: 'Rashid, I., & Kashani, S.',
        year: 2025,
        title: 'Geospatial Inventory and Multi-Decadal Evolution of Glacial Lakes in Kashmir Himalaya (1992–2024)',
        publicationOrSeries: 'University of Kashmir / Zenodo Open GIS Repository',
        referenceType: 'Remote Sensing Dataset',
        doiOrOfficialRef: '10.5281/zenodo.15051825',
        externalUrl: 'https://doi.org/10.5281/zenodo.15051825',
        provenanceNote: 'Provides 155 exact WGS84 glacial lake polygons and 1992–2024 expansion metrics.',
      },
      {
        id: 'REF-KLE-04',
        authorsOrBody: 'Ministry of Jal Shakti, Department of Water Resources, RD & GR',
        year: 2023,
        title: 'First Census of Water Bodies — Jammu & Kashmir State/UT Volume',
        publicationOrSeries: 'Government of India Statutory Waterbody Census',
        referenceType: 'Technical Institute Report',
        provenanceNote: 'Separates 37 enumerated J&K lakes from 9,728 ponds, tanks, and check-dams.',
      },
      {
        id: 'REF-KLE-05',
        authorsOrBody: 'Zutshi, D. P., Subla, B. A., Khan, M. A., & Wanganeo, A.',
        year: 1980,
        title: 'Comparative limnology of nine lakes of Jammu and Kashmir Himalayas',
        publicationOrSeries: 'Hydrobiologia, 72(1–2), 101–112',
        referenceType: 'Peer-Reviewed Journal',
        doiOrOfficialRef: '10.1007/BF00016238',
        externalUrl: 'https://doi.org/10.1007/BF00016238',
        provenanceNote: 'Foundational comparative altitudinal and trophic baseline across Kashmir lakes.',
      },
      {
        id: 'REF-KLE-06',
        authorsOrBody: 'Carlson, R. E.',
        year: 1977,
        title: 'A trophic state index for lakes',
        publicationOrSeries: 'Limnology and Oceanography, 22(2), 361–369',
        referenceType: 'Peer-Reviewed Journal',
        doiOrOfficialRef: '10.4319/lo.1977.22.2.0361',
        externalUrl: 'https://doi.org/10.4319/lo.1977.22.2.0361',
        provenanceNote: 'Methodological standard requiring unaveraged reporting of TSI(SD), TSI(Chl-a), and TSI(TP).',
      },
      {
        id: 'REF-KLE-07',
        authorsOrBody: 'Rashid, I., Romshoo, S. A., Amin, M., Khanday, S. A., & Chauhan, P.',
        year: 2017,
        title: 'Linking human-biophysical interactions with the trophic status of Dal Lake, Kashmir Himalaya, India',
        publicationOrSeries: 'Limnologica, 62, 84–96',
        referenceType: 'Peer-Reviewed Journal',
        doiOrOfficialRef: '10.1016/j.limno.2016.11.008',
        externalUrl: 'https://doi.org/10.1016/j.limno.2016.11.008',
        provenanceNote: 'Couples multi-decadal catchment land-use change with spatially explicit lacustrine trophic degradation.',
      },
      {
        id: 'REF-KLE-08',
        authorsOrBody: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
        year: 2017,
        title: 'Wetlands (Conservation and Management) Rules, 2017 & NPCA Operational Guidelines',
        publicationOrSeries: 'Gazette of India Statutory Notification',
        referenceType: 'Judicial Order / NGT',
        provenanceNote: 'Establishes statutory prohibitions on wetland conversion, solid-waste dumping, and untreated effluent discharge.',
      },
    ],
    updatesLog: [
      {
        date: '2026-11-25',
        version: 'v0.9',
        entryType: 'Initial Publication',
        summary: `Registered 24-section KEW-EIAI regional synthesis (KEW-INV-0009) synchronized with Flagship Monograph KEW-SR-2026-101 and the ${MLS.kashmirDivisionTotalUniqueIdentities}-lake Master Registry under Scientific Review.`,
        verifiedBy: 'KEW Regional Limnology & Geospatial Reconciliation Unit',
      },
    ],
    dataGaps: [
      `${MLS.kashmirRequiringTrophicAssessment} of ${MLS.kashmirDivisionTotalUniqueIdentities} Kashmir Division lakes lack contemporary APHA-standard Secchi, Chlorophyll-a, and Total Phosphorus measurements.`,
      'Intact sediment-core internal phosphorus release rates (mg P/m²/day) and quantitative cyanotoxin (microcystin-LR) LC-MS/MS baselines remain unmeasured across rural Kashmir lakes.',
    ],
    sections: [
      {
        sectionNumber: '01',
        key: 'executive-summary',
        title: 'Executive Summary',
        applicable: true,
        leadSummary: `Regional scientific synthesis reconciling ${MLS.kashmirDivisionTotalUniqueIdentities} deduplicated lakes across all 10 districts of Kashmir Division and tracing the mechanistic transition from ultra-oligotrophic alpine headwaters to hypereutrophic urban and floodplain basins.`,
        bodyParagraphs: [
          `Institutional counts of Kashmir's lakes have historically diverged because satellite directories (DEERS 2012: 415 records), statutory audits (CAG 2025: 330 records), glacial GIS inventories (Rashid & Kashani 2025: 155 polygons), and administrative censuses (Jal Shakti 2023: 37 lakes) apply different minimum size thresholds and elevation cutoffs. Spatial deduplication establishes ${MLS.kashmirDivisionTotalUniqueIdentities} unique Kashmir Division lake identities (${MLS.kashmirActiveOrObservedLakes} active/observed; ${MLS.kashmirHistoricallyDisappearedOrConverted} historically disappeared or converted).`,
          `Where dated empirical measurements exist (${MLS.kashmirWithVerifiedTrophicStatus} lakes), Kashmir's lakes span a dramatic 60-unit Carlson TSI gradient: high-altitude glacial tarns (Sheshnag, Gangabal, Nundkol, Tarsar, Vishansar, Krishansar, Kounsarnag) remain oligotrophic (TSI < 38), deep monomictic/subalpine basins (Manasbal, Nilnag) sit on fragile mesotrophic-eutrophic margins, and valley-floor urban/floodplain lakes receiving raw sewage and agrarian runoff (Dal interior, Nigeen, Brari Nambal, Anchar, Khushalsar, Gilsar, Wular fringes) exhibit eutrophic to hypereutrophic states. All ${MLS.kashmirRequiringTrophicAssessment} unmeasured lakes are explicitly reported as Insufficient Evidence.`,
        ],
        quantitativeCallouts: [
          { label: 'Unique Kashmir Lakes', value: String(MLS.kashmirDivisionTotalUniqueIdentities), unit: '10 Districts', sourceTag: 'KEW Master Reconciliation' },
          { label: 'Verified Trophic Profiles', value: String(MLS.kashmirWithVerifiedTrophicStatus), unit: `${MLS.kashmirTrophicBreakdown.Oligotrophic} Oligo · ${MLS.kashmirTrophicBreakdown.Eutrophic + MLS.kashmirTrophicBreakdown.Hypereutrophic} Eutr/Hyper`, sourceTag: 'Carlson TSI Registry' },
          { label: 'Insufficient Evidence', value: String(MLS.kashmirRequiringTrophicAssessment), unit: 'Unmeasured Lakes', sourceTag: 'Epistemic Audit' },
          { label: 'Disappeared / Converted', value: String(MLS.kashmirHistoricallyDisappearedOrConverted), unit: 'Historical Loss', sourceTag: 'DEERS 2012 & CAG 2025' },
        ],
      },
      {
        sectionNumber: '02',
        key: 'investigation-background',
        title: 'Investigation Background',
        applicable: true,
        leadSummary:
          'Initiated to unify fragmented lake inventories and establish a rigorous, non-extrapolated regional trophic status baseline across urban, rural, montane, subalpine, and alpine ecosystems.',
        bodyParagraphs: [
          'Individual KEW dossiers examine site-specific dredging in Dal Lake (KEW-INV-0001), pilgrimage pressure at Sheshnag (KEW-INV-0002), Telbal siltation (KEW-INV-0003), Wular restoration (KEW-INV-0005), and Hokersar flood-buffer loss (KEW-INV-0006). This regional investigation synthesises basin-wide eutrophication trajectories across all ten Kashmir districts and synchronizes directly with Flagship Monograph KEW-SR-2026-101.',
        ],
      },
      {
        sectionNumber: '03',
        key: 'geographic-context',
        title: 'Geographic Context',
        applicable: true,
        leadSummary:
          'Spans a nearly 3,000-metre altitudinal gradient from Jhelum floodplain oxbows and urban lagoons (~1,578–1,600 m ASL) through Karewa/forest basins (1,800–2,600 m) to Panjal and Greater Himalayan cirque tarns (3,200–4,550+ m ASL).',
        bodyParagraphs: [
          `Covers Anantnag, Bandipora, Baramulla, Budgam, Ganderbal, Kulgam, Kupwara, Pulwama, Shopian, and Srinagar, encompassing ${MLS.kashmirUrbanLakes} urban, ${MLS.kashmirRuralFloodplainLakes} rural/floodplain, ${MLS.kashmirMontaneSubalpineLakes} montane/subalpine, and ${MLS.kashmirAlpineLakes} alpine/glacial lakes.`,
        ],
      },
      {
        sectionNumber: '04',
        key: 'historical-chronology',
        title: 'Historical Chronology',
        applicable: true,
        leadSummary: 'Tracks six decades of contrasting lowland contraction/enrichment versus high-altitude deglacial lake expansion (1967–2026).',
        bodyParagraphs: [
          'Between the 1967 Survey of India baseline and 2009–2025 satellite/audit evaluations, valley-floor waterbodies lost substantial open-water expanse to siltation, floating agriculture, willow plantations, and urban landfilling, while glacial retreat across the Pir Panjal and Greater Himalaya enlarged moraine- and cirque-dammed alpine lakes.',
        ],
      },
      {
        sectionNumber: '05',
        key: 'environmental-baseline',
        title: 'Environmental Baseline',
        applicable: true,
        leadSummary: 'Contrasts calcium-bicarbonate ultra-oligotrophic glacial tarns (EC < 65 µS/cm, TP < 10 µg/L) against nutrient-saturated valley basins (TP 60–450+ µg/L).',
        bodyParagraphs: [
          'Following Carlson (1977), KEW reports TSI(SD), TSI(Chl-a), and TSI(TP) separately without averaging, preserving diagnostic differences between macrophyte nutrient sequestration and inorganic glacial/fluvial turbidity.',
        ],
      },
      {
        sectionNumber: '06',
        key: 'project-intervention-inventory',
        title: 'Project & Intervention Inventory',
        applicable: true,
        leadSummary: 'Audits decades of mechanical de-weeding, shoreline dredging, FAB sewage treatment plants, and wetland demarcation programmes.',
        bodyParagraphs: [
          'In-lake biomass harvesting and dredging have repeatedly treated visible symptoms while external orthophosphate and untreated greywater/sewage loads remained above critical Vollenweider thresholds.',
        ],
      },
      {
        sectionNumber: '07',
        key: 'scientific-disciplines',
        title: 'Scientific Disciplines',
        applicable: true,
        leadSummary: 'Integrates 14 disciplines across limnology, environmental chemistry, remote sensing, GIS, aquatic ecology, wastewater engineering, and statutory law.',
        bodyParagraphs: [
          'Combines Vollenweider phosphorus loading balances, Fickian benthic diffusive flux, Beer–Lambert underwater light attenuation, NDCI/MNDWI optical screening, and statutory Wetlands Rules 2017 compliance.',
        ],
      },
      {
        sectionNumber: '08',
        key: 'scientific-analysis',
        title: 'Scientific Analysis',
        applicable: true,
        leadSummary: 'Demonstrates why external nutrient loading and benthic redox cycling lock shallow valley lakes into turbid/floating-mat states.',
        bodyParagraphs: [
          'Once submerged Charophyte/Potamogeton meadows collapse under high epiphyte/phytoplankton shading and dredging disturbance, sediment resuspension and summer benthic anoxia (DO < 2 mg/L) recycle legacy iron-bound phosphorus back into the water column.',
        ],
      },
      {
        sectionNumber: '09',
        key: 'satellite-gis-evidence',
        title: 'Satellite & GIS Evidence',
        applicable: true,
        leadSummary: `Multi-sensor spatial reconciliation (LISS-III, Landsat, Sentinel-2) and optical bloom eligibility screening (${MLS.kashmirOpticalBloomEligibleCount} lakes >=4 ha).`,
        bodyParagraphs: [
          'Small rural ponds (<4 ha), narrow urban channels, and ice/shadow-affected cirque tarns are excluded from automated 20 m red-edge chlorophyll indices to prevent mixed-pixel shoreline artifacts.',
        ],
      },
      {
        sectionNumber: '10',
        key: 'hydrological-analysis',
        title: 'Hydrological Analysis',
        applicable: true,
        leadSummary: 'Evaluates hydraulic residence time (τ_w), sub-lacustrine karst spring inflows, and causeway/bund circulation dead zones.',
        bodyParagraphs: [
          'Internal bunds, floating gardens, and weir regulation lengthen local water residence times in interior Dal, Nigeen, Anchar, and Khushalsar pockets, amplifying summer thermal stratification and nutrient retention.',
        ],
      },
      {
        sectionNumber: '11',
        key: 'ecological-impact-analysis',
        title: 'Ecological Impact Analysis',
        applicable: true,
        leadSummary: 'Documents shifts from native submerged macrophytes and endemic Schizothorax snow trout toward invasive Azolla/Salvinia mats, carp dominance, and cyanobacterial blooms.',
        bodyParagraphs: [
          'Hypereutrophication eliminates oxygenated gravel/macrophyte refugia required by native cold-water fauna while degrading winter foraging depth windows for Central Asian Flyway waterbirds.',
        ],
      },
      {
        sectionNumber: '12',
        key: 'cumulative-impact-assessment',
        title: 'Cumulative Impact Assessment',
        applicable: true,
        leadSummary: 'Quantifies compounding pressures of catchment deforestation, orchard/paddy agrochemicals, urban sprawl, climate warming, and hydrological fragmentation.',
        bodyParagraphs: [
          'Rising air temperatures strengthen thermal stratification and lengthen cyanobacterial growing windows, lowering the nutrient threshold needed to trigger blooms across valley and subalpine lakes.',
        ],
      },
      {
        sectionNumber: '13',
        key: 'environmental-risk-pathways',
        title: 'Environmental Risk Pathways',
        applicable: true,
        leadSummary: 'Maps ecological regime shifts, benthic fish-kill hypoxia, drinking-water intake vulnerability, flood-sponge loss, and alpine GLOF/trophic coupling.',
        bodyParagraphs: [
          'In valley basins, loss of lake volume directly reduces Jhelum flood detention capacity; in alpine catchments, moraine-dammed lake expansion increases outburst hazard while low alkalinity leaves tarns acutely vulnerable to organic waste.',
        ],
      },
      {
        sectionNumber: '14',
        key: 'asian-global-precedents',
        title: 'Asian & Global Precedents',
        applicable: true,
        leadSummary: 'Benchmarks Kashmir lake trajectories against Lake Biwa (Japan), Lakes Taihu & Dianchi (China), and alpine oligotrophic protection zones.',
        bodyParagraphs: [
          'International evidence confirms that large-scale dredging fails without >70–80% external phosphorus load interception and watershed detergent/sewage ordinances.',
        ],
      },
      {
        sectionNumber: '15',
        key: 'government-scientific-records',
        title: 'Government & Scientific Records',
        applicable: true,
        leadSummary: 'Cross-examines DEERS (2012), Jal Shakti Census (2023), CAG Report No. 4 of 2025, NGT/High Court orders, and peer-reviewed Himalayan limnology.',
        bodyParagraphs: [
          'Preserves all four official inventory counts transparently alongside deduplicated spatial identities so administrative and scientific records remain fully auditable.',
        ],
      },
      {
        sectionNumber: '16',
        key: 'institutional-accountability',
        title: 'Institutional Accountability',
        applicable: true,
        leadSummary: 'Maps statutory responsibilities across LCMA, JKWA, WUCMA, JKPCC, UEED, Revenue Department, and development authorities.',
        bodyParagraphs: [
          'Records documented CAG audit findings alongside ongoing institutional restoration initiatives without inferring unverified wrongdoing where monitoring records are absent.',
        ],
      },
      {
        sectionNumber: '17',
        key: 'regulatory-analysis',
        title: 'Regulatory Analysis',
        applicable: true,
        leadSummary: 'Evaluates compliance under the Water Act 1974, Wetlands (Conservation and Management) Rules 2017, Environment Protection Act 1986, and Ramsar obligations.',
        bodyParagraphs: [
          'Highlights the statutory gap whereby hundreds of smaller rural DEERS waterbodies remain unnotified on revenue cadastral maps.',
        ],
      },
      {
        sectionNumber: '18',
        key: 'scientific-evidence-matrix',
        title: 'Scientific Evidence Matrix',
        applicable: true,
        leadSummary: 'Grades eight core regional assertions across Documented, Provisionally Supported, and Unverified epistemic tiers.',
        bodyParagraphs: [
          'Separates verified inventory/trophic facts from unmeasured cyanotoxin and sediment-flux hypotheses.',
        ],
      },
      {
        sectionNumber: '19',
        key: 'unanswered-questions',
        title: 'Unanswered Questions',
        applicable: true,
        leadSummary: `Identifies the ${MLS.kashmirRequiringTrophicAssessment}-lake monitoring gap, STP phosphorus removal disclosure, and cyanotoxin baseline needs.`,
        bodyParagraphs: [
          'Public agencies and academic laboratories are invited to deposit dated water-quality series to upgrade unassessed lakes.',
        ],
      },
      {
        sectionNumber: '20',
        key: 'alternative-solutions',
        title: 'Alternative Solutions',
        applicable: true,
        leadSummary: 'Prioritises tertiary phosphorus stripping, constructed littoral wetlands, and tiered 3-level basin surveillance over repetitive symptom dredging.',
        bodyParagraphs: [
          'Catchment-first nutrient interception and natural macrophyte-marsh biofiltration deliver durable trophic recovery at lower lifecycle cost.',
        ],
      },
      {
        sectionNumber: '21',
        key: 'recommendations',
        title: 'Recommendations',
        applicable: true,
        leadSummary: 'Establishes Immediate (0–12 mo), Medium-Term (1–3 yr), and Long-Term (3–10 yr) corrective actions with measurable verification indicators.',
        bodyParagraphs: [
          'Pairs immediate STP phosphorus disclosure with 50-lake empirical baseline expansion and long-term watershed nutrient reduction.',
        ],
      },
      {
        sectionNumber: '22',
        key: 'scientific-conclusions',
        title: 'Scientific Conclusions',
        applicable: true,
        leadSummary: 'Synthesises verified regional findings while maintaining strict epistemic boundaries during Scientific Review.',
        bodyParagraphs: [
          `Kashmir's ${MLS.kashmirDivisionTotalUniqueIdentities} lakes exhibit a sharp altitudinal bifurcation: shrinking, nutrient-enriched valley basins versus expanding, climate-exposed alpine glacial lakes — demanding differentiated watershed restoration in the plains and strict zero-waste preventative protection in the high Himalaya.`,
        ],
      },
      {
        sectionNumber: '23',
        key: 'references-datasets',
        title: 'References & Datasets',
        applicable: true,
        leadSummary: 'Provides traceable DOI/archival citations and open Master CSV + GeoJSON downloads.',
        bodyParagraphs: [
          'Full 20-chapter monograph text, Appendices A–O, and downloadable A4 PDF are synchronized at /sectoral-eia/reports/kew-sr-2026-101.',
        ],
      },
      {
        sectionNumber: '24',
        key: 'investigation-updates',
        title: 'Investigation Updates',
        applicable: true,
        leadSummary: 'Living revision log tracking progression from Scientific Review to formal Published release.',
        bodyParagraphs: [
          'v0.9 registered on 2026-11-25; awaiting final Scientific Review sign-off and official institutional responses.',
        ],
      },
    ],
  },
];
