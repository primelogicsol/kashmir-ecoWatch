/**
 * Kashmir EcoWatch: CSR Collaborations & Institutional Funding Framework
 * Evidence-Based Environmental Intelligence & Research Funding Directory
 * 
 * Reviewed November 2026 for Statutory Compliance, MCA Schedule VII Alignment,
 * U.S. 501(c)(3) Non-Conduit Governance, and Cross-Border FCRA Regulatory Standards.
 */

export interface FundingPathway {
  id: string;
  name: string;
  regulatoryJurisdiction: string;
  governingStatute: string;
  recipientEligibility: string;
  taxDeductibility: string;
  compliancePrerequisites: string[];
  monitoringMechanism: string;
  bestFitSponsors: string[];
}

export interface ScalableTier {
  id: string;
  label: string;
  scopeUnits: string;
  indicativeBudgetInr: string;
  indicativeBudgetUsd: string;
  targetTimeline: string;
  studentOrCommunityReach: string;
  description: string;
}

export interface CsrProgramDossier {
  id: string;
  title: string;
  programCode: string;
  readinessState: 'Evidence-Generating Pilot' | 'Funding Opportunity / Concept Design' | 'Pre-Feasibility Stage';
  leadScientificDomain: string;
  summary: string;
  problemStatement: string;
  interventionDesign: string;
  statutoryScheduleVii: string;
  sebiBrsrAlignment: string;
  indicativeEnvelopes: {
    minInr: string;
    maxInr: string;
    minUsd: string;
    maxUsd: string;
    basisOfEstimation: string;
  };
  scalableTiers: ScalableTier[];
  indicativeCostBreakdownPercent: {
    category: string;
    percentage: number;
    description: string;
  }[];
  technicalLimitsAndDisclosures: string[];
  statutoryPermitsRequired: string[];
  keyDeliverables: string[];
  expectedAnnualTargets: string[];
  linkedEcoWatchModules: {
    name: string;
    route: string;
  }[];
}

export interface CsrPipelineStage {
  step: number;
  stageName: string;
  leadParty: string;
  keyAction: string;
  deliverable: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. THREE DISTINCT FUNDING PATHWAYS (LEGAL DISCLOSURES)
// ─────────────────────────────────────────────────────────────────────────────

export const FUNDING_PATHWAYS: FundingPathway[] = [
  {
    id: 'indian-corporate-csr',
    name: 'Indian Corporate CSR (Domestic)',
    regulatoryJurisdiction: 'Ministry of Corporate Affairs (MCA), Government of India',
    governingStatute: 'Section 135 & Schedule VII (Item iv), Indian Companies Act 2013',
    recipientEligibility: 'Registered Indian Trust / Society / Section 8 Company holding an active MCA Form CSR-1 Registration Number, valid Section 12A registration, and Section 80G approval under the Income Tax Act 1961.',
    taxDeductibility: 'Qualifies directly toward mandatory 2% CSR expenditure under Companies Act 2013. Tax deductions under Section 80G apply subject to prevailing Indian Finance Act rules.',
    compliancePrerequisites: [
      'Verified MCA Form CSR-1 registration of the executing Indian implementing partner.',
      'Active 12A and 80G certificates with valid Unique Registration Numbers (URN).',
      'Tripartite CSR Agreement between the corporate funder, Indian implementing agency, and technical monitoring partner.',
      'Mandatory reporting on the MCA CSR portal with project geo-tagging.'
    ],
    monitoringMechanism: 'Third-party financial audit of fund utilization, photographic ground-truthing, and live open telemetry logged on Kashmir EcoWatch.',
    bestFitSponsors: ['Indian Scheduled Commercial Banks', 'Public Sector Undertakings (PSUs)', 'Indian IT & Technology Corporates', 'Domestic Manufacturing Enterprises']
  },
  {
    id: 'us-international-philanthropy',
    name: 'U.S. & International Philanthropy',
    regulatoryJurisdiction: 'Internal Revenue Service (IRS), United States & Ministry of Home Affairs (MHA), India',
    governingStatute: 'U.S. Internal Revenue Code Section 501(c)(3) & Indian Foreign Contribution (Regulation) Act (FCRA) 2010',
    recipientEligibility: 'Dr. Kumar Foundation USA / Kumar Trust USA (501(c)(3) public charity status pending / documented agreement) exercising independent charitable discretion. Cross-border disbursements to India require receiving partners to hold an active MHA FCRA registration or project-specific prior permission.',
    taxDeductibility: 'U.S. federal income tax deductions are available for qualifying gifts to eligible U.S. 501(c)(3) entities. Contributions must not be ear-marked or designated as a pass-through conduit under IRS Rev. Rul. 63-252.',
    compliancePrerequisites: [
      'Independent board approval and charitable expenditure oversight by the U.S. foundation.',
      'Documented grant agreement between the U.S. entity and the executing Indian scientific partner.',
      'State Bank of India (SBI) Main Branch, New Delhi FCRA designated bank account utilization.',
      'Filing of Form FC-4 annual return with the Ministry of Home Affairs, Government of India.'
    ],
    monitoringMechanism: 'Comprehensive grant acquittal reports, quarterly expenditure statements, and open-access scientific publication of generated datasets.',
    bestFitSponsors: ['Kashmir Diaspora Endowments', 'Global Climate Philanthropies', 'Family Foundations in North America & Europe', 'Bilateral Climate Resilience Trust Funds']
  },
  {
    id: 'scientific-grants',
    name: 'Scientific & Multilateral Research Grants',
    regulatoryJurisdiction: 'Government of India Scientific Councils & Multilateral Environmental Conventions',
    governingStatute: 'Anusandhan National Research Foundation (ANRF) Act 2023, MoEFCC NMHS Guidelines, and UN Convention Protocols',
    recipientEligibility: 'Recognized academic institutions, university departments, and accredited scientific research societies eligible under ANRF, MoEFCC, or multilateral funding windows.',
    taxDeductibility: 'Exempt under academic and scientific non-profit provisions of the respective national or multilateral funding agencies.',
    compliancePrerequisites: [
      'Formal academic research proposal submission responding to open competitive calls.',
      'Institutional Biosafety, Animal Ethics, or Protected Area research clearances where required.',
      'Memorandum of Understanding (MoU) with university departments (e.g. University of Kashmir, SKUAST-K).',
      'Mandatory open data dissemination under national FAIR scientific data sharing guidelines.'
    ],
    monitoringMechanism: 'Peer review of milestone deliverables, project advisory committee audits, and integration into the Kashmir EcoWatch Open Research Repository.',
    bestFitSponsors: ['Anusandhan National Research Foundation (ANRF)', 'MoEFCC National Mission on Himalayan Studies (NMHS)', 'UNDP-GEF Small Grants Programme (SGP)', 'The Rufford Foundation (UK)', 'ICIMOD']
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. FOUR SCIENTIFIC PROGRAM DOSSIERS (WITH SCALABLE TIERS & FINANCIAL MODELS)
// ─────────────────────────────────────────────────────────────────────────────

export const CSR_PROGRAM_DOSSIERS: CsrProgramDossier[] = [
  {
    id: 'outdoor-classroom-grid',
    title: 'Outdoor Classroom (OD) & Water Telemetry Network',
    programCode: 'KEW-PRG-CSR-001',
    readinessState: 'Evidence-Generating Pilot',
    leadScientificDomain: 'Environmental Education, Hydrological Monitoring & School Science',
    summary: 'A scalable field science initiative that equips school and college eco-clubs with calibrated water testing pens, optical binoculars, and an 8-stage experiential learning curriculum connecting textbook science with live Kashmir waterbody monitoring.',
    problemStatement: 'Over 85% of Kashmir high school students study hydrology and ecosystems exclusively through textbook diagrams without ever conducting empirical water testing or bird censuses. Concurrently, dozens of rural streams and peripheral wetlands lack baseline water quality telemetry.',
    interventionDesign: 'Deployment of standardized, safe field kits paired with JKBOSE/CBSE-aligned teacher guides. Student cohorts conduct supervised monthly water diagnostic tours at local adopted waterbodies, inputting verified measurements into the open Kashmir EcoWatch telemetry feed.',
    statutoryScheduleVii: 'Schedule VII (Item iv): Ensuring environmental sustainability, ecological balance, conservation of natural resources, and maintaining quality of water.',
    sebiBrsrAlignment: 'BRSR Core Principle 6 (Water Stewardship & Environmental Literacy) and Principle 8 (Inclusive Growth & Education). Provides verifiable community impact evidence for annual corporate filings.',
    indicativeEnvelopes: {
      minInr: '₹4.50 Lakhs (10 Schools)',
      maxInr: '₹75.00 Lakhs (100 Schools)',
      minUsd: '$5,400 USD',
      maxUsd: '$90,000 USD',
      basisOfEstimation: 'Based on an indicative unit allocation of ₹45,000 to ₹75,000 per school, covering equipment procurement, teacher capacity building, study tour logistics, buffer replacement stock, data infrastructure, and independent audit.'
    },
    scalableTiers: [
      {
        id: 'tier-10-pilot',
        label: 'Tier A: 10-School Evidence-Generating Pilot',
        scopeUnits: '10 High Schools across 2 Districts (Srinagar & Budgam)',
        indicativeBudgetInr: '₹4.50 Lakhs – ₹7.50 Lakhs',
        indicativeBudgetUsd: '$5,400 – $9,000 USD',
        targetTimeline: '6 Months (Pilot Proof-of-Concept)',
        studentOrCommunityReach: '250 Trained Student Observers & 20 Science Teachers',
        description: 'Recommended entry point for corporate CSR committees to test data quality, student engagement, and baseline reporting before committing to a valley-wide scale.'
      },
      {
        id: 'tier-25-cluster',
        label: 'Tier B: 25-School District Cluster Network',
        scopeUnits: '25 Schools across 3 Districts (Srinagar, Baramulla, Anantnag)',
        indicativeBudgetInr: '₹11.25 Lakhs – ₹18.75 Lakhs',
        indicativeBudgetUsd: '$13,500 – $22,500 USD',
        targetTimeline: '12 Months (Full Academic Year Cycle)',
        studentOrCommunityReach: '650 Trained Student Observers & 50 Science Teachers',
        description: 'Comprehensive cluster establishing multi-station comparative water quality baselines across northern, central, and southern Kashmir catchments.'
      },
      {
        id: 'tier-100-network',
        label: 'Tier C: 100-School Regional Valley Grid',
        scopeUnits: '100 Schools across all 10 Kashmir Valley Districts',
        indicativeBudgetInr: '₹45.00 Lakhs – ₹75.00 Lakhs',
        indicativeBudgetUsd: '$54,000 – $90,000 USD',
        targetTimeline: '24 Months (Multi-Year Transformation)',
        studentOrCommunityReach: '2,500+ Trained Student Observers & 200 Science Teachers',
        description: 'Valley-wide educational sensor network generating longitudinal watershed observations while training a new generation of Himalayan environmental stewards.'
      }
    ],
    indicativeCostBreakdownPercent: [
      { category: 'Hardware Procurement & Kits', percentage: 46, description: 'Digital multi-parameter water pens (pH/EC/TDS), Secchi disks, 8x42 field binoculars, thermometers, and protective cases.' },
      { category: 'Teacher Training & Capacity Workshops', percentage: 16, description: 'District-level hands-on training sessions for faculty mentors on calibration, safety, and oral history ethics.' },
      { category: 'Field Tour Logistics & Student Subsidies', percentage: 16, description: 'Local transport subsidies for supervised field excursions, hydration, and first-aid field kits.' },
      { category: 'Calibration, Buffer Stock & Replacement (10%)', percentage: 8, description: 'NIST-traceable buffer solutions (pH 7.00/4.01), replacement probes, and equipment maintenance.' },
      { category: 'Data Platform, Telemetry QA/QC & Privacy', percentage: 8, description: 'Secure student PII anonymization hashing, server-side data ingestion, and open spatial GIS mapping.' },
      { category: 'Annual Independent Audit & BRSR Dossier', percentage: 6, description: 'Financial verification of fund utilization, impact measurement, and corporate ESG reporting synthesis.' }
    ],
    technicalLimitsAndDisclosures: [
      'Technical Sensor Scope: Handheld multi-parameter pens measure physical and bulk chemical parameters (pH, electrical conductivity, TDS, and water temperature). They do NOT measure microbiological pathogens (e.g. fecal coliform/E. coli), heavy metals, or biochemical oxygen demand (BOD) unless augmented with laboratory incubators or chemical titration kits.',
      'Observation Targets: The target of 500 validated field observations is an annual scientific goal subject to faculty audit and anomaly filtering, not a pre-guaranteed volume.',
      'Student Safeguarding: Minor privacy is strictly protected under institutional hash tokens (e.g. STU-SRI-042). No minor PII is ever exposed on the public data layer.'
    ],
    statutoryPermitsRequired: [
      'School Management Committee (SMC) and Principal administrative consent letters.',
      'Signed parental/guardian informed consent for all participating students.',
      'Department of Wildlife Protection intimation prior to tours within protected wetlands or sanctuaries.'
    ],
    keyDeliverables: [
      'Itemized equipment distribution log with school Principal signed asset receipts.',
      'District-wise teacher training completion records and certified educator rosters.',
      'Dedicated corporate sponsor attribution dashboard citing verified student observations.',
      'Annual Audited Field Science Monograph with BRSR Principle 6 compliance documentation.'
    ],
    expectedAnnualTargets: [
      '2,500 students participating in at least 2 seasonal field investigation tours.',
      '500+ verified multi-parameter water telemetry observations ingested into open GIS.',
      '100 student oral history interviews with village elders deposited in the Himalayan archive.'
    ],
    linkedEcoWatchModules: [
      { name: 'Outdoor Classroom Hub', route: '/environmental-calendar/outdoor-classroom' },
      { name: '5-Tier Curriculum Library', route: '/environmental-calendar/outdoor-classroom/curriculum' },
      { name: 'Water Systems Observatory', route: '/water-systems' }
    ]
  },

  {
    id: 'springshed-rejuvenation',
    title: 'Western Himalayan Karst Springshed Assessment & Rejuvenation',
    programCode: 'KEW-PRG-CSR-002',
    readinessState: 'Funding Opportunity / Concept Design',
    leadScientificDomain: 'Hydrogeology, Karst Aquifers & Rural Drinking Water Security',
    summary: 'A hydrogeological assessment and community rejuvenation program across vulnerable perennial and seasonal karst springs (*Naags*) in South and Central Kashmir, combining isotopic recharge mapping, bio-engineering catchment restoration, and continuous telemetry.',
    problemStatement: 'Over 40% of karst springs in Anantnag, Pulwama, and Budgam have experienced measurable discharge decline or mid-summer drying over the past two decades due to catchment deforestation, limestone excavation, and unmonitored agricultural pesticide infiltration.',
    interventionDesign: 'Phase 1 hydrogeological mapping of spring recharge zones (springsheds), followed by Phase 2 community bio-engineering (native deep-root vegetative planting to curb siltation) and Phase 3 continuous digital discharge/quality telemetry.',
    statutoryScheduleVii: 'Schedule VII (Item iv): Conservation of natural resources, maintaining quality of water, and agroforestry.',
    sebiBrsrAlignment: 'BRSR Principle 6 (Water Stewardship & Resource Replenishment). Directly documents cubic meters of clean water secured for rural communities.',
    indicativeEnvelopes: {
      minInr: '₹15.00 Lakhs (5-Spring Pilot)',
      maxInr: '₹1.20 Crore (25-Spring Cluster)',
      minUsd: '$18,000 USD',
      maxUsd: '$145,000 USD',
      basisOfEstimation: 'Based on estimated hydrogeological surveying, civil protection works, native bio-engineering vegetation, continuous sensor telemetry nodes, and community water committee formation across 5 to 25 karst emergence points.'
    },
    scalableTiers: [
      {
        id: 'spring-5-pilot',
        label: 'Tier A: 5-Spring Karst Pilot Assessment',
        scopeUnits: '5 Perennial Springs in Anantnag Karst Basin',
        indicativeBudgetInr: '₹15.00 Lakhs – ₹25.00 Lakhs',
        indicativeBudgetUsd: '$18,000 – $30,000 USD',
        targetTimeline: '9 Months',
        studentOrCommunityReach: '8,000 Rural Residents across 5 Villages',
        description: 'Detailed hydrogeological recharge area mapping, water chemistry profiling, and baseline discharge sensors on 5 critical drinking water springs.'
      },
      {
        id: 'spring-25-cluster',
        label: 'Tier B: 25-Spring Valley Springshed Network',
        scopeUnits: '25 Springs across Anantnag, Pulwama, and Budgam',
        indicativeBudgetInr: '₹60.00 Lakhs – ₹1.20 Crore',
        indicativeBudgetUsd: '$72,000 – $145,000 USD',
        targetTimeline: '24 Months',
        studentOrCommunityReach: '45,000+ Rural Residents & 15 Farmer Irrigation Groups',
        description: 'Comprehensive springshed catchment treatment, civil desiltation works, bio-engineering buffer plantations, and solar-powered continuous telemetry nodes.'
      }
    ],
    indicativeCostBreakdownPercent: [
      { category: 'Hydrogeological Surveys & Aquifer Mapping', percentage: 28, description: 'Geological structural mapping, elevation tracer studies, and recharge zone boundary demarcation.' },
      { category: 'Civil Restoration & Desiltation Works', percentage: 26, description: 'Restoration of masonry spring chambers, desiltation of traditional step-well reservoirs, and animal fencing.' },
      { category: 'Catchment Bio-Engineering & Tree Planting', percentage: 18, description: 'Plantation of native Himalayan cedar, willow, and deep-root grasses along recharge slopes to aid infiltration.' },
      { category: 'Telemetry Sensors & Solar Nodes', percentage: 16, description: 'Continuous solar-powered pressure transducer water level sensors and electrical conductivity probes.' },
      { category: 'Community Water Committee (Naag Nigran) Training', percentage: 7, description: 'Capacity building for village elders, youth, and traditional Mirabs on local maintenance and monitoring.' },
      { category: 'Audited Reporting & BRSR Documentation', percentage: 5, description: 'Independent hydraulic discharge audit, community impact report, and corporate ESG metrics.' }
    ],
    technicalLimitsAndDisclosures: [
      'Concept Stage Notice: This initiative is currently open for collaborative corporate sponsorship. Baseline discharge measurements and civil intervention designs will be finalized upon formal agreement.',
      'Hydrogeological Complexity: Subsurface karst flow channels in limestone geology can extend several kilometers; recharge area treatment requires community consensus across private agricultural lands.'
    ],
    statutoryPermitsRequired: [
      'Panchayat Raj Institution (PRI) and Village Halqa administrative resolutions.',
      'Irrigation and Flood Control (I&FC) / Jal Shakti Department technical clearance.',
      'Geology & Mining Department intimation regarding limestone extraction buffer zones.'
    ],
    keyDeliverables: [
      'Comprehensive Hydrogeological Springshed Atlas with PostGIS vector recharge boundaries.',
      'Civil restoration completion certificates signed by Village Panchayat heads.',
      'Continuous telemetry data feed publicly accessible on the Kashmir EcoWatch platform.',
      'Independent Water Replenishment Impact Report citing total cubic meters secured.'
    ],
    expectedAnnualTargets: [
      'Protection of at least 25 critical community springs serving 45,000+ rural residents.',
      'Stabilization of mid-summer spring discharge drawdown by an estimated 15–25%.',
      'Over 200,000 automated telemetry sensor readings published to open GIS.'
    ],
    linkedEcoWatchModules: [
      { name: 'Springs & Aquifers Database', route: '/water-systems/springs' },
      { name: 'Hazard Intelligence: Flash Floods', route: '/hazard-intelligence/flash-floods' },
      { name: 'Earth & Human Impact: Land Systems', route: '/earth-human-impact/land-earth-systems' }
    ]
  },

  {
    id: 'ramsar-wetland-protection',
    title: 'Ramsar Wetland Sponge Protection & Waterbird Observatory',
    programCode: 'KEW-PRG-CSR-003',
    readinessState: 'Funding Opportunity / Concept Design',
    leadScientificDomain: 'Wetland Ecology, Waterbird Censuses & Satellite Siltation Tracking',
    summary: 'A specialized wetland resilience and habitat conservation initiative monitoring Kashmir’s critical Ramsar wetland complexes (Hokersar, Wular, Shallabugh, Haigam) to detect siltation, macrophyte infilling, and waterbird habitat degradation.',
    problemStatement: 'Rapid encroachment, excessive siltation from degraded upper catchments, and invasive weed infestation (*Trapa natans* and *Azolla*) threaten the flood-sponge capacity of valley wetlands, increasing catastrophic flooding risks for Srinagar and peripheral towns.',
    interventionDesign: 'Deployment of solar-powered continuous water quality buoys (DO, turbidity, temperature), multi-spectral satellite change detection of weed infilling, and seasonal waterfowl census networks in partnership with local universities.',
    statutoryScheduleVii: 'Schedule VII (Item iv): Protection of flora and fauna, animal welfare, agroforestry, and wetland ecological balance.',
    sebiBrsrAlignment: 'BRSR Principle 6 (Biodiversity Stewardship & Ecosystem Conservation). Supports national Ramsar convention reporting.',
    indicativeEnvelopes: {
      minInr: '₹25.00 Lakhs (Single Wetland Pilot)',
      maxInr: '₹1.50 Crore (4-Ramsar Complex)',
      minUsd: '$30,000 USD',
      maxUsd: '$180,000 USD',
      basisOfEstimation: 'Based on automated telemetry buoy procurement, drone/satellite high-resolution multi-spectral tracking, seasonal waterfowl observation blinds, and academic research coordination across 1 to 4 Ramsar complexes.'
    },
    scalableTiers: [
      {
        id: 'ramsar-single-pilot',
        label: 'Tier A: Single Wetland Resilience Pilot (Hokersar)',
        scopeUnits: 'Hokersar Wetland Reserve (1,375 Hectares)',
        indicativeBudgetInr: '₹25.00 Lakhs – ₹40.00 Lakhs',
        indicativeBudgetUsd: '$30,000 – $48,000 USD',
        targetTimeline: '12 Months',
        studentOrCommunityReach: 'Srinagar & Budgam Flood-Basin Communities',
        description: 'Installation of 2 automated water monitoring buoys, quarterly drone weed mapping, and winter waterfowl telemetry at Kashmir’s most critical flood sponge.'
      },
      {
        id: 'ramsar-valley-network',
        label: 'Tier B: Valley-Wide Ramsar Complex Network',
        scopeUnits: '4 Ramsar Wetlands (Hokersar, Wular, Shallabugh, Haigam)',
        indicativeBudgetInr: '₹75.00 Lakhs – ₹1.50 Crore',
        indicativeBudgetUsd: '$90,000 – $180,000 USD',
        targetTimeline: '24 Months',
        studentOrCommunityReach: 'Valley-Wide Flood Risk Mitigation & Wildlife Corridor',
        description: 'Integrated multi-sensor telemetry buoys, automated hypoxia warnings, satellite sediment plume monitoring, and annual State of Kashmir Wetlands monographs.'
      }
    ],
    indicativeCostBreakdownPercent: [
      { category: 'Automated Telemetry Buoys & Sensors', percentage: 38, description: 'Solar-powered optical dissolved oxygen, nephelometric turbidity, and water depth sensors with GSM telemetry.' },
      { category: 'Satellite Imagery & Drone Infilling Analysis', percentage: 22, description: 'Sentinel-2 and PlanetScope high-frequency multi-spectral analysis of macrophyte weed mat expansion.' },
      { category: 'Field Waterfowl Censuses & Optical Blinds', percentage: 18, description: 'Equipping ornithological survey teams, erecting low-impact birding blinds, and standardized counts.' },
      { category: 'Scientific Data Engineering & Hypoxia Alerts', percentage: 12, description: 'Automated alert pipelines notifying wildlife officials of low DO levels that threaten winter waterfowl.' },
      { category: 'Independent Peer Review & Environmental Auditing', percentage: 10, description: 'Peer review by accredited limnologists, financial auditing, and corporate CSR impact synthesis.' }
    ],
    technicalLimitsAndDisclosures: [
      'Regulatory Permission Contingency: All on-site activities within Ramsar reserves and wildlife sanctuaries are strictly conditional upon prior written permits from the Department of Wildlife Protection under the Wildlife Protection Act 1972.',
      'Siltation Complexities: In-situ sensor buoys detect turbidity and hypoxia; large-scale catchment desiltation remains the statutory responsibility of government authorities (WUCMA / LCMA).'
    ],
    statutoryPermitsRequired: [
      'Chief Wildlife Warden research and scientific observation authorization.',
      'Wular Conservation & Management Authority (WUCMA) entry clearance for Wular Lake stations.',
      'Directorate of Aviation / DGCA drone operation permissions where aerial mapping is planned.'
    ],
    keyDeliverables: [
      'Quarterly Limnological & Wetland Health Bulletins published to the open EcoWatch portal.',
      'High-resolution multi-temporal satellite maps documenting weed mat expansion/contraction.',
      'Annual Winter Waterfowl Census Monograph cited with corporate sponsor recognition.',
      'Corporate BRSR Core Principle 6 Environmental Evidence Dossier.'
    ],
    expectedAnnualTargets: [
      'Continuous monitoring of 12,000+ hectares of Western Himalayan wetland habitat.',
      'Early detection and public reporting of at least 4 seasonal hypoxia or pollution spikes.',
      'Documented census of over 500,000 migratory waterfowl across monitored complexes.'
    ],
    linkedEcoWatchModules: [
      { name: 'Wetlands Directory', route: '/water-systems/wetlands' },
      { name: 'Earth & Human Impact: Aquatic Cryosphere', route: '/earth-human-impact/aquatic-cryosphere' },
      { name: 'Protected Area Network: Wetland Reserves', route: '/protected-network/wetland-reserves' }
    ]
  },

  {
    id: 'urban-canopy-chinar',
    title: 'Srinagar Urban Heat Island & Heritage Chinar Conservation',
    programCode: 'KEW-PRG-CSR-004',
    readinessState: 'Funding Opportunity / Concept Design',
    leadScientificDomain: 'Urban Ecology, Satellite Thermal Anomalies & Heritage Forestry',
    summary: 'A targeted urban climate resilience project combining satellite land surface temperature (LST) mapping with the geotagged plantation, soil care, and 3-year survival monitoring of 1,000 heritage oriental plane (*Platanus orientalis* / *Booni*) and cedar trees.',
    problemStatement: 'Rapid urban sprawl, loss of historical watercourses, and high impervious surface density have created severe Urban Heat Islands in Srinagar (up to 4.5°C warmer than rural fringes), while aging heritage Chinar trees suffer root compaction and illegal felling.',
    interventionDesign: 'Micro-climate thermal sensor deployment to map urban heat hot-spots, coupled with institutional campus and canal-bank plantation of 1,000 Chinar and Deodar saplings equipped with individual QR survival tags and photographic telemetry.',
    statutoryScheduleVii: 'Schedule VII (Item iv): Agroforestry, soil conservation, and protection of natural heritage.',
    sebiBrsrAlignment: 'BRSR Principle 6 (Emissions, Microclimate Adaptation & Biodiversity). Provides audited tree survival metrics.',
    indicativeEnvelopes: {
      minInr: '₹12.00 Lakhs (250-Tree Pilot)',
      maxInr: '₹65.00 Lakhs (1,000-Tree Urban Grid)',
      minUsd: '$14,500 USD',
      maxUsd: '$78,000 USD',
      basisOfEstimation: 'Based on procurement of mature 3-year-old nursery saplings, soil preparation, tree guards, micro-climate weather stations, and dedicated 3-year quarterly survival auditing.'
    },
    scalableTiers: [
      {
        id: 'chinar-250-pilot',
        label: 'Tier A: 250-Tree Campus & Canal Pilot',
        scopeUnits: '250 Heritage Chinar Trees across 5 College Campuses',
        indicativeBudgetInr: '₹12.00 Lakhs – ₹18.00 Lakhs',
        indicativeBudgetUsd: '$14,500 – $21,500 USD',
        targetTimeline: '12 Months (Plantation & Year-1 Survival)',
        studentOrCommunityReach: '15,000 College Students & Faculty',
        description: 'Plantation in protected university and college campuses with dedicated student eco-club tree wardens.'
      },
      {
        id: 'chinar-1000-network',
        label: 'Tier B: 1,000-Tree Srinagar Green Corridor Grid',
        scopeUnits: '1,000 Trees across Public Parks, Canal Banks, and Institutions',
        indicativeBudgetInr: '₹35.00 Lakhs – ₹65.00 Lakhs',
        indicativeBudgetUsd: '$42,000 – $78,000 USD',
        targetTimeline: '36 Months (3-Year Longitudinal Survival Guarantee)',
        studentOrCommunityReach: 'Srinagar Urban Core (400,000+ Citizens Benefited)',
        description: 'City-wide urban forestry grid featuring micro-weather stations tracking urban cooling and individual QR-tagged survival audits.'
      }
    ],
    indicativeCostBreakdownPercent: [
      { category: 'Mature Sapling Procurement & Soil Prep', percentage: 32, description: 'Healthy 3-year nursery saplings (Chinar & Deodar), organic compost, and excavation.' },
      { category: 'Protective Steel Tree Guards & Fencing', percentage: 24, description: 'Heavy-gauge steel tree guards to prevent cattle grazing and urban vandalism.' },
      { category: 'Micro-Climate Weather Sensor Stations', percentage: 18, description: 'Installation of 5 urban temperature/humidity telemetry stations to measure microclimate cooling.' },
      { category: 'Quarterly Survival Auditing & Geotagging', percentage: 14, description: 'Photographic survival audits, diameter growth logging, and replacement of dead saplings.' },
      { category: 'Administrative Due Diligence & Reporting', percentage: 12, description: 'PRI / Municipal corporation permissions, financial audit, and corporate CSR impact reporting.' }
    ],
    technicalLimitsAndDisclosures: [
      'Survival Rate Disclosure: Conventional tree planting programs often suffer >60% mortality. Kashmir EcoWatch implements mandatory 3-year watering contracts and tree guards, targeting an audited >80% survival rate.',
      'Urban Land Clearances: All planting locations require formal written permissions from Srinagar Municipal Corporation (SMC), Floriculture Department, or participating universities.'
    ],
    statutoryPermitsRequired: [
      'Srinagar Municipal Corporation (SMC) or Floriculture Department planting approvals.',
      'J&K Chinar Tree Protection Act guidelines compliance (statutory heritage status).',
      'Institutional campus administration MoUs for long-term tree guardianship.'
    ],
    keyDeliverables: [
      'Public GIS Urban Canopy Map showing exact geotagged coordinates of all 1,000 trees.',
      'Individual QR codes on tree guards linking to the tree’s growth and watering log.',
      'Quarterly Audited Tree Survival Certificates signed by independent botanists.',
      'Annual Urban Heat Island Cooling Assessment citing satellite thermal anomalies.'
    ],
    expectedAnnualTargets: [
      '1,000 heritage trees established with an audited survival rate of >80% at 36 months.',
      'Documented microclimate temperature reduction of 1.0°C to 1.8°C within green clusters.',
      'Active involvement of 25 urban educational institutions as long-term tree guardians.'
    ],
    linkedEcoWatchModules: [
      { name: 'Earth & Human Impact: Urban Ecology', route: '/earth-human-impact/urban-ecology' },
      { name: 'Forest Ecosystems Intelligence', route: '/biodiversity/forest-ecosystems' },
      { name: 'Environmental Monitoring: Air & Urban Resilience', route: '/environmental-monitoring' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. EIGHT-STAGE CORPORATE DUE DILIGENCE & INTAKE WORKFLOW
// ─────────────────────────────────────────────────────────────────────────────

export const CSR_PIPELINE_STAGES: CsrPipelineStage[] = [
  {
    step: 1,
    stageName: 'Partnership Inquiry & Initial Briefing',
    leadParty: 'Corporate Funder / Grant Agency',
    keyAction: 'Submission of formal inquiry via Kashmir EcoWatch portal outlining target budget envelope, preferred geography, and CSR / grant mandate.',
    deliverable: 'Unique Inquiry Tracking Reference Code (e.g. KEW-CSR-2026-INQ-0412).'
  },
  {
    step: 2,
    stageName: 'Eligibility Screening & Regulatory Check',
    leadParty: 'EcoWatch Compliance Committee & Legal Counsel',
    keyAction: 'Verification of corporate eligibility under Companies Act Sec. 135, vetting of executing Indian NGO partner (Form CSR-1 / 12A / 80G), and cross-border FCRA exposure assessment.',
    deliverable: 'Statutory Eligibility & Compliance Clearance Note.'
  },
  {
    step: 3,
    stageName: 'Scientific Concept Note Formulation',
    leadParty: 'Kashmir EcoWatch Research Board',
    keyAction: 'Drafting of tailored scientific concept note with baseline telemetry data, problem statement, proposed interventions, and measurable outcomes.',
    deliverable: 'Tailored 6-Page Scientific Concept Dossier.'
  },
  {
    step: 4,
    stageName: 'Itemized Budget & Work Plan Development',
    leadParty: 'Joint Technical Committee',
    keyAction: 'Co-design of itemized bill of quantities (BOQ), procurement schedules, training costs, risk mitigation, and milestone timeline.',
    deliverable: 'Fully Costed Financial Model & Milestones Matrix.'
  },
  {
    step: 5,
    stageName: 'Statutory Permits & Site Clearances',
    leadParty: 'Local Executing Partner & Government Liaisons',
    keyAction: 'Filing and acquisition of required government intimations (Wildlife Department, School Education, SMC, or Panchayat resolutions).',
    deliverable: 'Repository of Approved Statutory Clearances & Permissions.'
  },
  {
    step: 6,
    stageName: 'Formal Agreement & Escrow Funding Schedule',
    leadParty: 'Corporate CSR Committee & Implementing Partner',
    keyAction: 'Signing of bilateral CSR / Grant Agreement defining funding tranches linked to verified milestone deliveries and independent audit rights.',
    deliverable: 'Executed Legal Agreement & Tranche Disbursal Schedule.'
  },
  {
    step: 7,
    stageName: 'Field Execution, Sensor Logging & Public Telemetry',
    leadParty: 'Field Teams, School Eco-Clubs & Scientists',
    keyAction: 'Equipment deployment, study tours, bio-engineering works, and real-time open data publishing on Kashmir EcoWatch with corporate sponsor branding.',
    deliverable: 'Live Spatial Telemetry Dashboard with Transparent Public Attribution.'
  },
  {
    step: 8,
    stageName: 'Audited Impact Reporting & Project Closure',
    leadParty: 'Chartered Accountants & Scientific Audit Board',
    keyAction: 'Independent financial utilization audit, photographic evidence compilation, and publication of corporate BRSR Core Principle 6 compliance dossier.',
    deliverable: 'Final Audited Impact Monograph & MCA CSR Filing Documentation.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. SCIENTIFIC INDEPENDENCE & GOVERNANCE GUARANTEE
// ─────────────────────────────────────────────────────────────────────────────

export const SCIENTIFIC_INDEPENDENCE_COVENANT = {
  title: 'Kashmir EcoWatch Scientific Neutrality & Editorial Independence Covenant',
  principles: [
    'Zero Commercial Editorial Influence: Corporate sponsorship, philanthropic funding, and research grants provide funding for equipment, logistics, and data infrastructure. Sponsors possess zero authority or editorial rights to alter, suppress, or influence scientific observations, water quality readings, hazard alerts, or biodiversity threat indexes.',
    'FAIR Open Science Standard: All telemetry, sensor logs, and species censuses generated through sponsored programs must be published openly under the FAIR principles (Findable, Accessible, Interoperable, and Reusable) for public benefit.',
    'SEBI BRSR Scope Disclosure: Kashmir EcoWatch produces raw, verified, and transparent environmental evidence supporting corporate sustainability reporting. Kashmir EcoWatch is an open research platform and does not claim statutory status as an accredited SEBI ESG assurance provider under the March 28, 2025 circular.',
    'Non-Conduit Policy: All funding agreements strictly adhere to IRS non-conduit rules for U.S. 501(c)(3) entities and Indian Foreign Contribution Regulation Act (FCRA) provisions, ensuring full statutory compliance across international borders.'
  ]
};
