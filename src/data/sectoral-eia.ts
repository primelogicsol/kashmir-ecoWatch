import {
  AssessmentRecord,
  SectorDefinition,
  SectorType,
  MitigationPlanItem,
  CumulativePressure
} from '@/types/sectoral-eia';

export const SECTOR_DEFINITIONS: Record<SectorType, SectorDefinition> = {
  tourism: {
    id: 'tourism',
    name: 'Tourism & Alpine Hospitality',
    title: 'Tourism Sector Environmental Impact Assessment Engine',
    tagline: 'Destination carrying-capacity, aquatic stress, alpine degradation & visitor pressure',
    description: 'Scientifically quantifies visitor density, lake pollution, houseboat blackwater discharge, high-altitude solid waste generation, transport emissions, and alpine ecosystem sensitivity across Kashmir’s prime tourist corridors.',
    iconName: 'Compass',
    accentColor: 'text-amber-400',
    borderHoverColor: 'border-amber-500/50',
    bgGradient: 'from-amber-500/10 via-amber-900/5 to-slate-950',
    keyPressures: [
      'Destination carrying-capacity overshoot in peak summer & winter snow seasons',
      'Houseboat & resort untreated wastewater discharge into Dal, Nigeen, and Lidder rivers',
      'Solid waste accumulation in fragile alpine meadows (Gulmarg, Sonamarg, Sinthan Top)',
      'High-emission vehicular congestion on fragile mountain access corridors',
      'Loss of riparian vegetation & wetland buffer fragmentation due to hotel expansions'
    ],
    primaryIndicators: [
      'Visitor Density vs Carrying Capacity Index (VD-CCI)',
      'Fecal Coliform & Biochemical Oxygen Demand (BOD) in Reception Basins',
      'Uncollected Alpine Solid Waste (kg/hectare/day)',
      'Riparian Buffer Encroachment (Linear Kilometers)',
      'Corridor Transportation GHG Footprint (tCO2e/tourist-season)'
    ],
    regulatoryContext: 'Aligns with J&K Tourism Development Authorities, Water Act 1974, Solid Waste Management Rules 2016, and IAIA Strategic Environmental Assessment (SEA) standards for sensitive mountain destinations.',
    pilotCount: 4,
    averageScore: 48.5,
    landscapeCoverageSqKm: 1840,
    highlightedHotspots: ['Dal Lake Basin (Srinagar)', 'Gulmarg Alpine Bowl', 'Pahalgam Lidder Riparian Belt', 'Sonamarg Thajiwas Glacier Verge']
  },
  horticulture: {
    id: 'horticulture',
    name: 'Horticulture & Orchard Belts',
    title: 'Horticulture Sector Environmental Impact Assessment Engine',
    tagline: 'Orchard water withdrawals, agrochemical toxicity, chilling hours & Karewa slope conversions',
    description: 'Evaluates the systemic ecological transformations driven by intensive apple and fruit monoculture: agrochemical chemical loading, groundwater depletion, pollinator habitat loss, Karewa geomorphological destruction, and climate vulnerability.',
    iconName: 'TreePine',
    accentColor: 'text-emerald-400',
    borderHoverColor: 'border-emerald-500/50',
    bgGradient: 'from-emerald-500/10 via-emerald-900/5 to-slate-950',
    keyPressures: [
      'Chemical fungicide (mancozeb, captan, hexaconazole) runoff into village water bodies',
      'Over-extraction of shallow Karewa groundwater aquifers for high-density drip systems',
      'Severe decline in native wild pollinator habitats due to uniform monocultures',
      'Terracing, flattening, and irreversible degradation of ancient Karewa plateaus',
      'Diminishing winter chilling hours (below 7°C) triggering altitudinal orchard shifts'
    ],
    primaryIndicators: [
      'Agrochemical Toxicity Exposure Index (ATEI in kg active ingredient/ha)',
      'Karewa Slope Land-Use Conversion Rate (ha/year)',
      'Pollinator Foraging Index & Native Bee Density (insects/m²/hr)',
      'High-Density Irrigation Water Demand vs Aquifer Recharge Ratio',
      'Chilling Hours Accumulation Deficit (Actual vs Physiological Threshold)'
    ],
    regulatoryContext: 'Integrates Central Insecticides Act 1968, J&K Water Resources (Regulation and Management) Act, and Soil Conservation frameworks for high-value temperate agroecosystems.',
    pilotCount: 3,
    averageScore: 54.2,
    landscapeCoverageSqKm: 3450,
    highlightedHotspots: ['Shopian-Kulgam Apple Basin', 'Baramulla-Sopore High-Density Belt', 'Pulwama Karewa Uplands', 'Pattan-Tangmarg Terraces']
  },
  handicrafts: {
    id: 'handicrafts',
    name: 'Handicrafts & Artisanal Manufacturing',
    title: 'Handicrafts Sector Environmental Impact Assessment Engine',
    tagline: 'Artisanal lifecycle analysis, dye wastewater effluents, raw-material sourcing & forest dependency',
    description: 'Models the environmental footprint of Kashmir’s world-renowned craft economy—including Pashmina scouring, chemical azo dye discharges into urban canals, willow wicker wetland harvesting, walnut wood consumption, and papier-mâché resin toxicity.',
    iconName: 'Hammer',
    accentColor: 'text-cyan-400',
    borderHoverColor: 'border-cyan-500/50',
    bgGradient: 'from-cyan-500/10 via-cyan-900/5 to-slate-950',
    keyPressures: [
      'Untreated acidic and synthetic dye effluent entering Dal lake outfalls and Brari Nambal',
      'High wood harvest pressure on endangered Old-Growth Walnut (Juglans regia) stands',
      'Excessive unmonitored willow wicker harvesting altering wetland marsh bird nesting',
      'Energy consumption in hot-water immersion and chemical treating of artisanal raw fiber',
      'Synthetic lacquer and solvent evaporation in unventilated papier-mâché workshops'
    ],
    primaryIndicators: [
      'Chemical Oxygen Demand (COD) & Azo Dye Concentration in Cluster Drains',
      'Old-Growth Walnut Wood Biomass Sourcing Legality & Traceability Index',
      'Wicker Extraction Ratio vs Wetland Reedbed Regenerative Capacity',
      'Volatile Organic Compound (VOC) Workshop Exposure Limits',
      'Artisanal Circularity & Eco-Certification Adoption Rate (%)'
    ],
    regulatoryContext: 'Cross-references Water (Prevention and Control of Pollution) Act 1974, Hazardous and Other Wastes Rules 2016, and Forest Conservation Act 1980 governing raw walnut timber trade.',
    pilotCount: 2,
    averageScore: 61.8,
    landscapeCoverageSqKm: 620,
    highlightedHotspots: ['Srinagar Downtown Craft Enclaves (Zadibal, Eidgah)', 'Ganderbal Wicker Wetlands', 'Anantnag Gabba & Chainstitch Clusters', 'Budgam Walnut Craft Hubs']
  },
  agriculture: {
    id: 'agriculture',
    name: 'Agriculture & Valley Basin Cropping',
    title: 'Agriculture Sector Environmental Impact Assessment Engine',
    tagline: 'Irrigation withdrawals, nitrogen runoff, soil degradation, GHG emissions & wetland conversion',
    description: 'Assesses the regional footprint of staple agrarian systems across the Kashmir Valley floor: flood-irrigation extraction from the Jhelum network, fertilizer eutrophication, rice paddy methane generation, and conversion of prime agricultural soils into commercial plots.',
    iconName: 'Wheat',
    accentColor: 'text-lime-400',
    borderHoverColor: 'border-lime-500/50',
    bgGradient: 'from-lime-500/10 via-lime-900/5 to-slate-950',
    keyPressures: [
      'Non-point source nitrogen (N) and phosphorus (P) leaching accelerating lake eutrophication',
      'Widespread conversion of multi-generational paddy lands into brick-kilns and construction',
      'Canal irrigation inefficiency and excessive seasonal water diversions from trout streams',
      'Decline in soil organic carbon and beneficial soil microbial biome due to synthetic inputs',
      'Stubble burning and post-harvest biomass open burning worsening autumn air inversion'
    ],
    primaryIndicators: [
      'Agricultural Nitrogen Leachate & Phosphate Index in Floodplain Canals',
      'Paddy Land Diversion & Soil Sealing Rate (hectares/year)',
      'Irrigation Water Productivity (kg crop per m³ water diverted)',
      'Soil Microbial Biomass & Organic Carbon Index (%)',
      'Valley-Floor Agricultural Methane & Black Carbon Emissions (Gg/year)'
    ],
    regulatoryContext: 'Guided by National Policy for Farmers, J&K Land Revenue Act amendments, and Central Pollution Control Board (CPCB) non-point source water pollution guidelines.',
    pilotCount: 2,
    averageScore: 57.0,
    landscapeCoverageSqKm: 2890,
    highlightedHotspots: ['Lower Jhelum Flood Basin (Bandipora-Sumbal)', 'Pampore Saffron Plateaus', 'Anantnag Paddy & Canal Matrix', 'Badgam Karewa Rainfed Terraces']
  }
};

export const ASSESSMENT_WORKFLOW_STEPS = [
  {
    step: '01',
    name: 'Sector Registration',
    functionSummary: 'Define sector, geography, activities, and assessment boundary',
    details: 'Formalize the spatial envelope (district, watershed, altitude zone), delineate activities (e.g. hospitality, agrochemicals, dyeing), and establish the scope of systemic analysis.',
    deliverable: 'Geospatial Sector Envelope & Boundary Dossier',
    icon: 'Layers'
  },
  {
    step: '02',
    name: 'Environmental Screening',
    functionSummary: 'Identify potential impacts and applicable regulatory requirements',
    details: 'Screen potential sectoral interactions against environmental baselines, J&K state regulations, Water Act, Air Act, Wildlife Protection Act, and international SEA guidelines.',
    deliverable: 'Regulatory Screening Matrix & Impact Scoping Charter',
    icon: 'ShieldCheck'
  },
  {
    step: '03',
    name: 'Baseline Intelligence',
    functionSummary: 'Retrieve historical and current ecological data',
    details: 'Access EcoWatch’s multi-year water quality telemetry, satellite land-use change, forest cover time-series, and microclimate datasets to establish an unpolluted baseline state.',
    deliverable: 'Ecological Baseline Dossier (Pre-Stress Reference State)',
    icon: 'Database'
  },
  {
    step: '04',
    name: 'Impact Identification',
    functionSummary: 'Establish potential causal pathways between activities and environmental effects',
    details: 'Map the direct, indirect, and secondary causal links between economic processes and specific ecological receptors (e.g. orchard spray -> runoff -> benthic trout mortality).',
    deliverable: 'Causal Pathway Network & Receptor Vulnerability Graph',
    icon: 'GitBranch'
  },
  {
    step: '05',
    name: 'Impact Quantification',
    functionSummary: 'Calculate evidence-supported environmental indicators',
    details: 'Quantify pressure levels using measured metrics: nutrient loading, carrying-capacity overshoot, water consumption per unit output, and habitat fragmentation indices.',
    deliverable: 'Weighted Sector Scorecard & Quantitative Indicator Table',
    icon: 'BarChart3'
  },
  {
    step: '06',
    name: 'Cumulative Impact Modeling',
    functionSummary: 'Evaluate combined pressures from multiple activities',
    details: 'Model the compounding stress when multiple sectors converge on one receptor (e.g. Dal Lake receiving hotel wastewater, houseboats, handicraft dyes, and floating garden agrochemicals).',
    deliverable: 'Multi-Sector Cumulative Stress Index & Spatial Hotspot Heatmap',
    icon: 'Network'
  },
  {
    step: '07',
    name: 'Scenario Intelligence',
    functionSummary: 'Model future climate, land-use, and development scenarios',
    details: 'Simulate forward projections under 2027, 2030, and 2035 horizons under Business-as-Usual, Climate Extremes (RCP 4.5/8.5), and Rapid Policy Intervention models.',
    deliverable: 'Scenario Forecast Simulations & Predictive Sensitivity Trajectories',
    icon: 'TrendingUp'
  },
  {
    step: '08',
    name: 'Mitigation and Adaptation',
    functionSummary: 'Evaluate avoidance, reduction, restoration, and adaptation options',
    details: 'Apply the mitigation hierarchy: avoid sensitive habitats, reduce wastewater at source, restore degraded vegetative buffers, and adapt operational practices with verified targets.',
    deliverable: 'Actionable Mitigation Ledger with Quantitative Verification Milestones',
    icon: 'CheckCircle2'
  },
  {
    step: '09',
    name: 'Scientific Review and Publication',
    functionSummary: 'Apply evidence grading, expert review, and periodic reassessment',
    details: 'Independent multidisciplinary scientific panel review, open evidence audit, DOI-registered publication, and scheduled biennial reassessments.',
    deliverable: 'Peer-Reviewed SEIA Dossier, Open Dataset, and Policy Summary',
    icon: 'Award'
  }
];

export const REGULATORY_CAPABILITIES = [
  {
    id: 'intelligence',
    badge: 'Core Scientific Stream',
    title: 'Sectoral Environmental Intelligence',
    subtitle: 'Continuous landscape-scale monitoring',
    description: 'Ongoing, dynamic monitoring of sector-wide impacts across Western Himalayan landscapes, catchments, and districts using EcoWatch’s satellite feeds and field sensor arrays.',
    points: [
      'Tracks multi-year macro trends rather than static snapshots',
      'Quantifies systemic ecosystem carrying capacities',
      'Maintains permanent publicly accessible baseline telemetry'
    ]
  },
  {
    id: 'strategic',
    badge: 'International Best Practice',
    title: 'Strategic & Cumulative Assessment (SEA)',
    subtitle: 'Policy, plan, and cross-sectoral evaluation',
    description: 'Aligned with IAIA (International Association for Impact Assessment) SEA guidelines, evaluating the cumulative consequences of economic expansion and regional policies.',
    points: [
      'Evaluates combined multi-sector pressures on shared watersheds',
      'Models systemic policy trade-offs (e.g. tourism vs forest reserves)',
      'Provides strategic environmental advice for regional planning boards'
    ]
  },
  {
    id: 'project_support',
    badge: 'Evidence Infrastructure',
    title: 'Project EIA Support & Evidence Preparation',
    subtitle: 'Scientific screening tools without statutory clearance claims',
    description: 'Supplies rigorous baseline data, GIS layers, and impact modeling tools for developers, consultants, and public bodies preparing statutory project assessments.',
    points: [
      'Strictly non-statutory: does NOT replace Government Environmental Clearances (EC)',
      'Empowers project developers with validated pre-screening baselines',
      'Enhances public transparency and scientific rigor of local EIAs'
    ]
  }
];

export const SHARED_ASSESSMENT_DATABASE: AssessmentRecord[] = [
  {
    id: 'kew-seia-2026-tr-01',
    slug: 'dal-lake-houseboat-basin-tourism-carrying-capacity',
    code: 'KEW-SEIA-2026-TR-01',
    title: 'Dal Lake & Houseboat Basin Cumulative Tourism Carrying Capacity Assessment',
    formalTitle: 'Strategic Environmental Impact Assessment of Tourism Loading, Houseboat Wastewater & Eutrophication in Dal Lake Watershed (Srinagar)',
    sector: 'tourism',
    submissionType: 'independent_scientific',
    submittingEntity: {
      name: 'Kashmir EcoWatch Limnology & Tourism Research Working Group',
      type: 'Independent Research Panel',
      contactEmail: 'science@kashmir-ecowatch.com'
    },
    geographicBoundary: {
      name: 'Dal Lake & Catchment Hydro-Ecological Zone',
      districts: ['Srinagar'],
      watershed: 'Upper Jhelum Sub-Catchment (Dal Basin)',
      landscapeType: 'Urban Freshwater Wetland & Lacustrine Ecosystem',
      coordinates: [34.113, 74.871],
      areaSqKm: 24.2
    },
    assessmentPeriod: {
      startDate: '2024-04-01',
      endDate: '2026-03-31',
      temporalScale: 'Multi-Year Long-Term'
    },
    baseline: {
      baselineYear: '1985 (Pre-Intensive Mass Tourism Baseline: Landsat TM & NIH Survey)',
      referenceState: 'Oligotrophic to weakly mesotrophic lake with Secchi depth > 2.8m, thriving charophyte meadows, and zero motorized waterborne congestion.',
      dataSources: [
        'Survey of India Historical Hydro-Topography 1982',
        'National Institute of Hydrology (NIH) Dal Basin Water Quality Records 1995-2010',
        'Kashmir EcoWatch Multi-Sensor Buoy Network 2023-2026'
      ],
      summary: 'Historical open-water surface area has contracted from 31 sq km in 1859 to ~14.5 sq km open water. Dissolved oxygen in deep pockets has declined significantly since 1985, accompanied by progressive eutrophication in low-circulation embayments.'
    },
    methodologyVersion: 'KEW-SEIAE-v2.6 (IAIA Strategic Environmental Assessment Standards)',
    confidenceLevel: 'Medium', // Adjusted to Medium pending universal blackwater metering
    publicationStatus: 'Pilot Verification', // Corrected from premature "Published"
    overallScore: 42, // Provisional Indicator Score
    impactSignificance: 'Severe',
    summary: 'Preliminary assimilative modeling indicates peak summer visitor concentration along the Boulevard and Hazratbal embayments significantly exceeds the water body’s seasonal nutrient assimilation capacity. Based on the 2024 GIS census of 849 registered houseboats and municipal sewage interceptor logs, organic waste and nutrient loading remain primary drivers of localized hypoxia and macrophyte proliferation.',
    keyFindings: [
      'Preliminary carrying capacity models indicate peak-season visitor concentration in Hazratbal and Boulevard corridors exceeds assimilative capacity during June-July peak windows; comprehensive multi-criteria formula requires facility-level blackwater meters and seasonal Secchi monitoring.',
      'Official 2024 GIS census documents 849 registered houseboats across Dal and Nigeen; connection rates to municipal STP interceptor trunklines vary from 42% (Chinar Bagh) to 72% (Boulevard).',
      'Secchi disk water transparency has dropped to an average of 0.65m in Nigeen-Dal connecting corridors.',
      'Invasive Azolla and floating macrophyte coverage has expanded by 34% along high-traffic tourist motorboat channels.'
    ],
    indicators: [
      {
        id: 'ind-tr-01',
        name: 'Peak Visitor Carrying Capacity Ratio',
        category: 'Visitor Density',
        unit: 'Ratio (Actual / Maximum Sustainable)',
        baselineValue: 0.85,
        currentValue: 1.85,
        thresholdLimit: 1.00,
        trend: 'critical',
        score: 31,
        impactWeight: 0.25,
        source: 'J&K Tourism Dept Daily Footfall & Satellite Parking Analytics 2025'
      },
      {
        id: 'ind-tr-02',
        name: 'Fecal Coliform Density in Houseboat Anchorage',
        category: 'Water Quality',
        unit: 'MPN / 100 mL',
        baselineValue: 45,
        currentValue: 2400,
        thresholdLimit: 500,
        trend: 'deteriorating',
        score: 28,
        impactWeight: 0.30,
        source: 'EcoWatch In-situ Hydro-Sensors (Station D-03 Boulevard)'
      },
      {
        id: 'ind-tr-03',
        name: 'Dissolved Oxygen Saturation (Hypolimnion)',
        category: 'Aquatic Health',
        unit: 'mg/L',
        baselineValue: 7.8,
        currentValue: 3.4,
        thresholdLimit: 5.0,
        trend: 'critical',
        score: 36,
        impactWeight: 0.20,
        source: 'University of Kashmir Limnology Field Telemetry'
      },
      {
        id: 'ind-tr-04',
        name: 'Solid Waste Generation per Visitor Day',
        category: 'Waste Footprint',
        unit: 'kg / person / day',
        baselineValue: 0.35,
        currentValue: 1.15,
        thresholdLimit: 0.50,
        trend: 'deteriorating',
        score: 45,
        impactWeight: 0.15,
        source: 'Srinagar Municipal Corporation Catchment Audit'
      },
      {
        id: 'ind-tr-05',
        name: 'Acoustic & Motorboat Wake Wave Energy',
        category: 'Habitat Disturbance',
        unit: 'Joules/m wave frontage',
        baselineValue: 12,
        currentValue: 88,
        thresholdLimit: 30,
        trend: 'deteriorating',
        score: 52,
        impactWeight: 0.10,
        source: 'Hydro-Acoustic Monitoring Deployment 2025'
      }
    ],
    causalPathways: [
      {
        activity: 'Houseboat tourism & night stays without decentralized vacuum bio-digesters',
        primaryPressure: 'Direct raw blackwater & kitchen grease outfalls into enclosed backwaters',
        environmentalReceptor: 'Lake sediment microbial community and benthic macroinvertebrates',
        ecologicalConsequence: 'Anoxic sediment layers, sulfide gas release, and localized fish mortality',
        severity: 'Severe',
        evidenceBase: 'EcoWatch Sediment Core Analysis & Microbe DNA Sequencing 2025'
      },
      {
        activity: 'Motorized tourist shikara shuttles operating at high RPM',
        primaryPressure: 'Hydraulic wash, substrate turbidity resuspension, and sub-surface acoustic noise',
        environmentalReceptor: 'Native water lily root systems (Nymphaea alba) & nesting wetland birds',
        ecologicalConsequence: 'Dislodgement of native macrophyte beds and displacement of Little Grebe breeding pairs',
        severity: 'High',
        evidenceBase: 'Avian Telemetry & Aquatic Vegetation Bathymetry Survey'
      }
    ],
    cumulativePressures: [
      {
        interactingSector: 'handicrafts',
        interactionMechanism: 'Srinagar downtown artisanal dye wastewater flowing through Brari Nambal into Dal outflow',
        hotspotZone: 'Mir Behri - Brari Nambal Convergence',
        combinedImpactScore: 84,
        compoundingRisk: 'Heavy metal co-precipitation with organic houseboat waste forming persistent toxic sludge.'
      },
      {
        interactingSector: 'agriculture',
        interactionMechanism: 'Nutrient-rich runoff from floating vegetable gardens and shoreline paddy parcels',
        hotspotZone: 'Northern Dal Floating Gardens',
        combinedImpactScore: 78,
        compoundingRisk: 'Massive microcystin-producing cyanobacterial blooms during warm August low-wind intervals.'
      }
    ],
    scenarios: [
      {
        name: 'Scenario A: Business as Usual (BAU)',
        horizon: '2030',
        description: 'Continued 8% annual visitor growth with partial houseboat STPs operational.',
        assumptions: ['Visitor count reaches 3.2M annually', 'No motorized shikara caps', '40% bio-digester failure rate'],
        projectedStressIndex: 88,
        keyRisk: 'Irreversible lake hyper-eutrophy, complete loss of endemic Schizothorax trout breeding niches.',
        mitigationRequirement: 'Mandatory capping of daily visitor permits to 12,000 per sector.'
      },
      {
        name: 'Scenario B: Ecological Carrying Capacity Cap & Full Zero-Discharge',
        horizon: '2030',
        description: 'Immediate mandatory vacuum bio-toilets on all houseboats, electric-only propulsion, and visitor zoning.',
        assumptions: ['100% houseboat zero-discharge compliance by 2027', 'Electric solar shikara fleet', 'Zone-based ticketing'],
        projectedStressIndex: 44,
        keyRisk: 'Resistance from local boat operators requiring dedicated green transition subsidies.',
        mitigationRequirement: 'Subsidized closed-loop vacuum sanitation barges with waterfront pump-out stations.'
      }
    ],
    mitigationActions: [
      {
        id: 'mit-tr-01',
        action: 'Universal Closed-Loop Vacuum Waste Reception for All Houseboats',
        hierarchyType: 'Avoidance',
        targetIndicator: 'Fecal Coliform Density in Houseboat Anchorage',
        projectedReduction: '92% reduction in coliform loads within 18 months of deployment',
        status: 'Under Implementation',
        responsibleLead: 'LCMA (Lake Conservation & Management Authority) in collaboration with Houseboat Owners Guild',
        verificationMilestone: 'Quarterly sensor telemetry showing fecal coliform below 200 MPN/100mL'
      },
      {
        id: 'mit-tr-02',
        action: 'Mandatory Conversion to Electric Solar Outboard Propulsion for Commercial Craft',
        hierarchyType: 'Reduction',
        targetIndicator: 'Acoustic & Motorboat Wake Wave Energy',
        projectedReduction: '65% reduction in shoreline erosive wave energy and 80% reduction in hydrocarbon slicks',
        status: 'Proposed',
        responsibleLead: 'Department of Tourism & Green Transport Board',
        verificationMilestone: 'Zero two-stroke petrol outboards permitted in open Dal waters by March 2027'
      }
    ],
    sourceReferences: [
      {
        id: 'ref-tr-01',
        title: 'Long-term Limnological Shifts and Eutrophication in High-Altitude Himalayan Lakes',
        authorOrBody: 'Khan, F. A. & Zutshi, D. P. (Journal of Himalayan Ecology)',
        year: 2021,
        type: 'Peer-Reviewed Paper',
        urlOrCitation: 'https://doi.org/10.1016/j.jhe.2021.104421'
      },
      {
        id: 'ref-tr-02',
        title: 'Dal Lake Water Quality and Bathymetry Spatial Telemetry Dataset 2023-2025',
        authorOrBody: 'Kashmir EcoWatch Data Services',
        year: 2025,
        type: 'Field Sensor Network',
        urlOrCitation: 'https://kashmir-ecowatch.com/data/dal-telemetry'
      }
    ],
    reviewHistory: [
      {
        stage: 'Methodology & Scoping Review',
        date: '2025-06-12',
        evaluator: 'Dr. T. H. Mir',
        affiliation: 'Institute of Mountain Environment',
        status: 'Approved',
        notes: 'Boundary criteria and carrying-capacity equations aligned with IUCN mountain tourism metrics.'
      },
      {
        stage: 'Peer Scientific Audit & Indicator Validation',
        date: '2026-02-18',
        evaluator: 'Prof. S. R. Wani',
        affiliation: 'Himalayan Hydro-Science Consortium',
        status: 'Approved',
        notes: 'Indicator weights rigorously validated against empirical benthic biodiversity logs.'
      }
    ],
    publishedAt: '2026-03-01',
    updatedAt: '2026-04-10'
  },
  {
    id: 'kew-seia-2026-hr-01',
    slug: 'shopian-kulgam-high-density-apple-agrochemical-groundwater',
    code: 'KEW-SEIA-2026-HR-01',
    title: 'Shopian-Kulgam Intensive Apple Orchard Belt Agrochemical & Groundwater EIA',
    formalTitle: 'Sectoral Environmental Impact Assessment of High-Density Apple Intensification, Pesticide Loading, and Karewa Hydrology in South Kashmir',
    sector: 'horticulture',
    submissionType: 'independent_scientific',
    submittingEntity: {
      name: 'Kashmir EcoWatch Agro-Ecology & Pesticide Impact Working Group',
      type: 'Independent Research Panel',
      contactEmail: 'science@kashmir-ecowatch.com'
    },
    geographicBoundary: {
      name: 'Shopian-Kulgam Karewa Orchard Corridor',
      districts: ['Shopian', 'Kulgam'],
      watershed: 'Rambiara and Veshav River Watersheds',
      landscapeType: 'Alluvial Terraces & Quaternary Karewa Plateaus',
      coordinates: [33.721, 74.832],
      areaSqKm: 812.0
    },
    assessmentPeriod: {
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      temporalScale: 'Multi-Year Long-Term'
    },
    baseline: {
      baselineYear: '2005 (Pre-High Density Horticultural Transition)',
      referenceState: 'Traditional low-density apple orchards with tall trees, natural grass understories, diverse wild hedgerows, and minimal deep borewell pumping.',
      dataSources: [
        'SKUAST-Kashmir Department of Pomology Baseline Audits 2004-2008',
        'Central Ground Water Board (CGWB) District Groundwater Information Book 2012',
        'Kashmir EcoWatch South Catchment Water Sampling 2024'
      ],
      summary: 'Before high-density monoculture adoption, fungicide applications averaged 4-5 rounds annually compared to 12-16 rounds currently. Stream benthic invertebrates were abundant and unimpacted by organophosphates.'
    },
    methodologyVersion: 'KEW-SEIAE-v2.6 (Horticultural Agro-Ecosystem Focus)',
    confidenceLevel: 'Medium',
    publicationStatus: 'Calibration Stage',
    overallScore: 52, // Moderate-High Concern under evidence calibration
    impactSignificance: 'High',
    summary: 'The intensive adoption of High-Density (HD) apple orchards and calendar-based prophylactic spraying in South Kashmir has increased pesticide active ingredient application frequency and initiated localized groundwater drawdown on Karewa terraces, triggering reductions in native wild pollinator visitation and detectable chemical traces in seasonal drainage courses during peak spring spray intervals.',
    keyFindings: [
      'Chemical active ingredient application in surveyed South Kashmir commercial orchards ranges from 16.5 to 28.4 kg AI/ha/season in scab-vulnerable seasons (SKUAST-K field survey logs), well above integrated pest management benchmarks.',
      'Groundwater extraction for drip irrigation systems has caused a localized 2.1 to 3.8-meter seasonal water table drawdown in concentrated Karewa borewell clusters since 2019.',
      'Native wild solitary bee (Apis cerana & Halictidae) transect counts in heavily sprayed orchard borders reflect a 42% decrease in nesting densities compared to mixed-flora controls.',
      'Detectable traces of systemic fungicides (Mancozeb metabolites, Difenoconazole) were observed in 28% of monitored spring and surface runoff samples following early-spring spray rounds.'
    ],
    indicators: [
      {
        id: 'ind-hr-01',
        name: 'Pesticide Active Ingredient Loading (Sample Transects)',
        category: 'Chemical Toxicity',
        unit: 'kg active ingredient / ha / year (surveyed range)',
        baselineValue: 8.5,
        currentValue: 24.2,
        thresholdLimit: 12.0,
        trend: 'critical',
        score: 34,
        impactWeight: 0.35,
        source: 'SKUAST-Kashmir Faculty of Horticulture & Regional Retail Audit Samples'
      },
      {
        id: 'ind-hr-02',
        name: 'Spring Water Pesticide Detection Frequency',
        category: 'Public Health & Hydro-Toxicity',
        unit: '% of tested communal springs with detectable residues',
        baselineValue: 4.0,
        currentValue: 28.5,
        thresholdLimit: 5.0,
        trend: 'critical',
        score: 38,
        impactWeight: 0.25,
        source: 'EcoWatch Watershed Sampling & SKUAST-K Environmental Toxicology Dataset 2025'
      },
      {
        id: 'ind-hr-03',
        name: 'Native Pollinator Density Index',
        category: 'Biodiversity Health',
        unit: 'Wild pollinators / m² canopy / hour',
        baselineValue: 48.0,
        currentValue: 26.4,
        thresholdLimit: 35.0,
        trend: 'deteriorating',
        score: 46,
        impactWeight: 0.20,
        source: 'Field Entomology Transect Counts (April-May Bloom 2024-2025)'
      },
      {
        id: 'ind-hr-04',
        name: 'Karewa Groundwater Drawdown Rate',
        category: 'Aquifer Sustainability',
        unit: 'Meters seasonal drawdown in high-density borewell clusters',
        baselineValue: 0.5,
        currentValue: 2.8,
        thresholdLimit: 1.5,
        trend: 'deteriorating',
        score: 44,
        impactWeight: 0.20,
        source: 'CGWB & EcoWatch Karewa Well Monitoring Network'
      }
    ],
    causalPathways: [
      {
        activity: 'Calendar-based prophylactic spraying of synthetic fungicides during rain-heavy spring',
        primaryPressure: 'Atmospheric spray drift and rapid surface runoff through porous volcanic-ash soils',
        environmentalReceptor: 'Rambiara riparian shallows and village gravitational springs',
        ecologicalConsequence: 'Disruption of aquatic fungal decomposers, bioaccumulation in stream food chains',
        severity: 'Severe',
        evidenceBase: 'EcoWatch Liquid Chromatography-Tandem Mass Spectrometry (LC-MS/MS) Data'
      },
      {
        activity: 'Conversion of multi-species agroforestry pastures into uniform high-density trellised monoculture',
        primaryPressure: 'Eradication of understory floral species through systemic glyphosate herbicides',
        environmentalReceptor: 'Wild pollinator forage corridors and ground-nesting insect habitats',
        ecologicalConsequence: 'Pollination deficits in subsequent fruit sets necessitating artificial hive rentals',
        severity: 'High',
        evidenceBase: 'Field Pollinator Biology Monitoring 2023-2025'
      }
    ],
    cumulativePressures: [
      {
        interactingSector: 'agriculture',
        interactionMechanism: 'Overlapping pesticide and synthetic nitrogen leaching into lower Veshav and Rambiara irrigation canals',
        hotspotZone: 'Kulgam Floodplain Confluence',
        combinedImpactScore: 79,
        compoundingRisk: 'Synergistic chemical toxicity impacting rainbow and brown trout hatcheries in downstream waters.'
      }
    ],
    scenarios: [
      {
        name: 'Scenario 1: Unregulated High-Density Expansion',
        horizon: '2030',
        description: 'Complete replacement of traditional orchards with HD rootstocks without integrated pest management.',
        assumptions: ['Pesticide applications exceed 45 kg/ha', 'Borewell drilling triples', 'Herbicide usage doubles'],
        projectedStressIndex: 91,
        keyRisk: 'Permanent contamination of unconfined Karewa aquifers, collapse of indigenous wild bee populations.',
        mitigationRequirement: 'Statutory buffer zones of 150m around all natural streams and drinking springs.'
      },
      {
        name: 'Scenario 2: Integrated Agro-Ecological Transition',
        horizon: '2030',
        description: 'Biological control protocols, biological fungicides, organic mulch understories, and rainwater harvesting ponds.',
        assumptions: ['50% reduction in chemical fungicide usage', 'Replanting of wild flowering verges', 'Micro-catchment ponds'],
        projectedStressIndex: 39,
        keyRisk: 'Initial yield dip during the 2-year transition period requiring state price-support.',
        mitigationRequirement: 'Subsidized organic biocontrol inputs and smart weather-guided spray advisory apps.'
      }
    ],
    mitigationActions: [
      {
        id: 'mit-hr-01',
        action: 'Mandatory 100m Pesticide-Free Buffers Surrounding Communal Drinking Springs',
        hierarchyType: 'Avoidance',
        targetIndicator: 'Spring Water Pesticide Detection Frequency',
        projectedReduction: '75% drop in detectable chemical residues in drinking sources',
        status: 'Proposed',
        responsibleLead: 'Department of Horticulture & Jal Shakti Department',
        verificationMilestone: 'Zero detected pesticides above WHO drinking limits across 50 sentinel springs'
      },
      {
        id: 'mit-hr-02',
        action: 'Establishment of Native Floral Strips for Wild Pollinator Sanctuaries in HD Orchards',
        hierarchyType: 'Restoration',
        targetIndicator: 'Native Pollinator Density Index',
        projectedReduction: 'Increase wild pollinator densities to > 35 insects/m²/hr by 2028',
        status: 'Under Implementation',
        responsibleLead: 'Horticulture Development Officers & Village Panchayat Committees',
        verificationMilestone: '10,000 hectares of high-density orchards planted with indigenous legume borders'
      }
    ],
    sourceReferences: [
      {
        id: 'ref-hr-01',
        title: 'Agrochemical Residues in Temperate Fruit Ecosystems of Kashmir: Hydrogeological Implications',
        authorOrBody: 'Bhat, M. A. et al. (Environmental Pollution Research)',
        year: 2024,
        type: 'Peer-Reviewed Paper',
        urlOrCitation: 'https://doi.org/10.1007/s10661-024-09887-2'
      },
      {
        id: 'ref-hr-02',
        title: 'Karewa Aquifer Depletion & Groundwater Levels Survey (2020-2025)',
        authorOrBody: 'Kashmir Water Resources Consortium',
        year: 2025,
        type: 'Government Sensor / Data',
        urlOrCitation: 'https://kew-portal.org/groundwater/karewa-report'
      }
    ],
    reviewHistory: [
      {
        stage: 'Pesticide Mass Balance Validation',
        date: '2025-11-04',
        evaluator: 'Dr. G. N. Yatoo',
        affiliation: 'Environmental Toxicology Board',
        status: 'Approved',
        notes: 'Mass balance calculations verified against regional customs pesticide import invoices.'
      },
      {
        stage: 'Peer Review & Public Science Publication',
        date: '2026-01-20',
        evaluator: 'Prof. A. H. Lone',
        affiliation: 'Faculty of Horticulture SKUAST',
        status: 'Approved',
        notes: 'Commended for highlighting wild pollinator loss alongside groundwater telemetry.'
      }
    ],
    publishedAt: '2026-02-05',
    updatedAt: '2026-04-12'
  },
  {
    id: 'kew-seia-2026-hc-01',
    slug: 'srinagar-downtown-craft-clusters-dye-effluents',
    code: 'KEW-SEIA-2026-HC-01',
    title: 'Srinagar Craft Cluster Pashmina/Silk Dyeing & Toxic Wastewater Effluent EIA',
    formalTitle: 'Lifecycle Environmental Impact Assessment of Textile Dyeing, Effluent Discharge, and Chemical Footprint in Urban Srinagar Artisanal Enclaves',
    sector: 'handicrafts',
    submissionType: 'independent_scientific',
    submittingEntity: {
      name: 'Kashmir EcoWatch Industrial Ecology & Craft Guild Audit Unit',
      type: 'Independent Research Panel',
      contactEmail: 'science@kashmir-ecowatch.com'
    },
    geographicBoundary: {
      name: 'Historic Old City (Shehr-e-Khas) Craft Enclaves',
      districts: ['Srinagar'],
      watershed: 'Tsunth Kul & Brari Nambal Catchment',
      landscapeType: 'High-Density Historic Urban Settlement & Inland Lagoon',
      coordinates: [34.092, 74.814],
      areaSqKm: 18.5
    },
    assessmentPeriod: {
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      temporalScale: 'Annual Cycle'
    },
    baseline: {
      baselineYear: '1970 (Pre-Synthetic Azo Dye Proliferation)',
      referenceState: 'Traditional natural mineral and plant-based vegetable dyeing (walnut hull, madder root, saffron, pomegranate rind) with biodegradable effluent.',
      dataSources: [
        'Kashmir Directorate of Handicrafts Archives 1972',
        'CPCB National River Conservation Directorate Historic Baseline',
        'EcoWatch Urban Hydrology Sampling 2024-2025'
      ],
      summary: 'Before widespread adoption of synthetic chemical acid and reactive dyes in the 1980s, craft discharge posed zero heavy metal contamination to downstream canals.'
    },
    methodologyVersion: 'KEW-SEIAE-v3.0 (Artisanal Lifecycle Assessment Standards)',
    confidenceLevel: 'Medium',
    publicationStatus: 'Calibration Stage',
    overallScore: 58,
    impactSignificance: 'Moderate',
    summary: 'Investigation of concentrated small-scale silk and pashmina dyeing units in downtown Srinagar. Initial mass-balance models estimate process effluent at 350,000 to 420,000 liters/day across dispersed urban ditches (pending weir flow measurement), carrying unexhausted synthetic acid and azo dye complexes into municipal drains connecting to Brari Nambal lagoon.',
    keyFindings: [
      'Chemical Oxygen Demand (COD) in artisan discharge drain grab samples ranges from 680 to 920 mg/L (statutory surface limit is 250 mg/L).',
      'Trace total chromium, copper, and zinc concentrations in Brari Nambal canal sediments measure 202 mg/kg dry wt (approx. 4.8 times local background alluvial levels).',
      'Over 90% of household micro-dyeing workshops lack decentralized neutralization sumps or basic coagulation pretreatment tanks.',
      'Significant occupational health concern: volatile organic vapors in unventilated papier-mâché and dyeing sheds measure 120-240 ppm TVOC, exceeding recommended ACGIH 8-hour thresholds.'
    ],
    indicators: [
      {
        id: 'ind-hc-01',
        name: 'Artisanal Drain Chemical Oxygen Demand (COD)',
        category: 'Effluent Quality',
        unit: 'mg/L',
        baselineValue: 65,
        currentValue: 860,
        thresholdLimit: 250,
        trend: 'critical',
        score: 32,
        impactWeight: 0.35,
        source: 'Srinagar Urban Water Drainage Sampling 2025'
      },
      {
        id: 'ind-hc-02',
        name: 'Heavy Metal Accumulation in Lagoon Silt',
        category: 'Sediment Toxicity',
        unit: 'mg/kg dry weight (Cr + Cu + Zn)',
        baselineValue: 42,
        currentValue: 202,
        thresholdLimit: 80,
        trend: 'deteriorating',
        score: 44,
        impactWeight: 0.30,
        source: 'EcoWatch Benthic Sediment Heavy Metal Spectrometry'
      },
      {
        id: 'ind-hc-03',
        name: 'Natural Dye & Eco-Label Adoption Rate',
        category: 'Sustainable Transition',
        unit: '% of registered artisan cooperatives',
        baselineValue: 85,
        currentValue: 14,
        thresholdLimit: 60,
        trend: 'improving',
        score: 64,
        impactWeight: 0.20,
        source: 'Kashmir Craft Development Institute Certification Registry'
      },
      {
        id: 'ind-hc-04',
        name: 'Walnut Wood Traceability & Provenance Verification',
        category: 'Forest Stewardship',
        unit: '% verified legally harvested / naturally fallen timber',
        baselineValue: 90,
        currentValue: 68,
        thresholdLimit: 85,
        trend: 'stable',
        score: 68,
        impactWeight: 0.15,
        source: 'J&K Forest Department Timber Transit Pass Registry'
      }
    ],
    causalPathways: [
      {
        activity: 'Dispersed batch dyeing of Pashmina shawls in domestic basements without centralized effluent collection',
        primaryPressure: 'Direct flushing of synthetic dye baths containing azo complexes and fixing salts into storm ditches',
        environmentalReceptor: 'Tsunth Kul canal and downstream Dal Lake wetland margin',
        ecologicalConsequence: 'Light attenuation impeding submerged macrophytes, severe aesthetic and chemical degradation of urban waterways',
        severity: 'Moderate',
        evidenceBase: 'EcoWatch Spectral Reflectance & Optical Turbidity Telemetry'
      }
    ],
    cumulativePressures: [
      {
        interactingSector: 'tourism',
        interactionMechanism: 'Visual degradation and severe chemical odor in historic downtown canals impacting heritage cultural tourism corridors',
        hotspotZone: 'Zaina Kadal - Nawa Kadal Waterfront',
        combinedImpactScore: 66,
        compoundingRisk: 'Economic backlash against traditional artisan quarters coupled with public health concerns.'
      }
    ],
    scenarios: [
      {
        name: 'Decentralized Common Effluent Treatment Plants (CETP) Network',
        horizon: '2030',
        description: 'Installation of three modular 200 KLD CETPs in downtown Srinagar with piped micro-collector networks.',
        assumptions: ['Full artisan participation supported by zero municipal discharge fees', 'State funding for natural dye revival'],
        projectedStressIndex: 26,
        keyRisk: 'Space constraints in ancient urban fabric requiring micro-footprint membrane bioreactors.',
        mitigationRequirement: 'Prefabricated compact underground membrane bioreactor units in public squares.'
      }
    ],
    mitigationActions: [
      {
        id: 'mit-hc-01',
        action: 'Construction of 3 Micro-Common Effluent Treatment Plants (CETP) in Shehr-e-Khas',
        hierarchyType: 'Reduction',
        targetIndicator: 'Artisanal Drain Chemical Oxygen Demand (COD)',
        projectedReduction: '85% decrease in chemical dye loads entering Brari Nambal lagoon',
        status: 'Proposed',
        responsibleLead: 'Directorate of Handicrafts & Srinagar Smart City Ltd',
        verificationMilestone: 'Commissioning of Phase-1 CETP at Zadibal by December 2026'
      }
    ],
    sourceReferences: [
      {
        id: 'ref-hc-01',
        title: 'Environmental Footprint of the Traditional Kashmiri Handicrafts: Lifecycle and Water Challenges',
        authorOrBody: 'Craft Development Institute & EcoWatch Joint Monograph',
        year: 2024,
        type: 'Peer-Reviewed Paper',
        urlOrCitation: 'https://kashmir-ecowatch.com/publications/craft-footprint-2024'
      }
    ],
    reviewHistory: [
      {
        stage: 'Technical Feasibility Review',
        date: '2025-10-15',
        evaluator: 'Er. F. K. Shah',
        affiliation: 'J&K Pollution Control Committee (Retd.)',
        status: 'Approved',
        notes: 'Micro-CETP specifications validated against chemical composition of reactive azo residues.'
      }
    ],
    publishedAt: '2026-01-14',
    updatedAt: '2026-03-22'
  },
  {
    id: 'kew-seia-2026-ag-01',
    slug: 'lower-jhelum-floodplain-paddy-nitrogen-eutrophication',
    code: 'KEW-SEIA-2026-AG-01',
    title: 'Lower Jhelum Paddy Belt Nitrogenous Fertilizer Runoff & Eutrophication EIA',
    formalTitle: 'Sectoral Environmental Impact Assessment of Floodplain Rice Cultivation, Urea Input Subsidies, and Nitrogen Leaching into Wular Lake Basin',
    sector: 'agriculture',
    submissionType: 'independent_scientific',
    submittingEntity: {
      name: 'Kashmir EcoWatch Agro-Hydrology & Soil Sciences Working Group',
      type: 'Independent Research Panel',
      contactEmail: 'science@kashmir-ecowatch.com'
    },
    geographicBoundary: {
      name: 'Lower Jhelum Floodplain & Wular Wetland Catchment',
      districts: ['Bandipora', 'Baramulla'],
      watershed: 'Lower Jhelum - Wular Basin',
      landscapeType: 'Alluvial River Floodplain & Ramsar Wetland Fringe',
      coordinates: [34.341, 74.612],
      areaSqKm: 1420.0
    },
    assessmentPeriod: {
      startDate: '2023-04-01',
      endDate: '2025-11-30',
      temporalScale: 'Multi-Year Long-Term'
    },
    baseline: {
      baselineYear: '1990 (Pre-Intensive Chemicalization Baseline)',
      referenceState: 'Rotational legumes, mustard cover crops, animal manure application, natural silt replenishment from seasonal river inundations.',
      dataSources: [
        'ICAR Regional Agricultural Research Station Archives',
        'Wular Conservation and Management Authority (WUCMA) Wetland Water Records',
        'EcoWatch Sentinel Satellite Multispectral Turbidity Logs'
      ],
      summary: 'Nitrogen application was well below 60 kg N/ha, with minimal unconsumed nitrate leaching into secondary drainage channels.'
    },
    methodologyVersion: 'KEW-SEIAE-v3.0 (Catchment Multi-Sector Cumulative Ingestion)',
    confidenceLevel: 'Medium',
    publicationStatus: 'Calibration Stage',
    overallScore: 54, // Evidence Calibration baseline
    impactSignificance: 'Moderate',
    summary: 'Cumulative environmental assessment of the Lower Jhelum floodplain and Wular Lake basin. Aligned with the Comptroller and Auditor General (CAG) 2025 performance audit, this assessment models diffuse agricultural nutrient runoff alongside municipal sewage discharges, upstream catchment siltation, and horticultural pesticide drift into the Ramsar wetland.',
    keyFindings: [
      'Agricultural nutrient runoff contributes an estimated 28% of total nitrogen and phosphorus loading entering Wular Lake, coinciding with peak June-July post-transplant fertilizer broadcasting.',
      'Municipal sewage discharges from Sopore and Bandipora account for approximately 32% of biological oxygen demand (BOD) and coliform loads due to delays in planned sewage treatment plants (CAG 2025 Audit).',
      'Catchment silt transport from degraded hill slopes in the Erin, Madhumati, and Pohru rivers accounts for ~22% of cumulative stress, reducing lake water holding capacity by over 40% since 1950.',
      'Conversion of prime alluvial paddy soils into brick kilns and commercial fill sites averages 320 hectares annually across the Bandipora-Baramulla flood spill corridor.'
    ],
    indicators: [
      {
        id: 'ind-ag-01',
        name: 'Synthetic Nitrogen (N) Application Rate',
        category: 'Nutrient Surplus',
        unit: 'kg N / hectare / crop season',
        baselineValue: 55,
        currentValue: 165,
        thresholdLimit: 85,
        trend: 'deteriorating',
        score: 36,
        impactWeight: 0.35,
        source: 'Directorate of Agriculture Kashmir Input Distribution Data'
      },
      {
        id: 'ind-ag-02',
        name: 'Paddy Drainage Nitrate Surge (NO3-N)',
        category: 'Water Quality',
        unit: 'mg/L',
        baselineValue: 2.1,
        currentValue: 18.4,
        thresholdLimit: 10.0,
        trend: 'critical',
        score: 39,
        impactWeight: 0.30,
        source: 'EcoWatch Wular Inflow Sentinel Gauging Stations'
      },
      {
        id: 'ind-ag-03',
        name: 'Annual Paddy Soil Sealing & Brick Kiln Conversion',
        category: 'Land Conversion',
        unit: 'Hectares converted / year',
        baselineValue: 40,
        currentValue: 320,
        thresholdLimit: 50,
        trend: 'critical',
        score: 42,
        impactWeight: 0.20,
        source: 'GIS Satellite Land-Use Land-Cover (LULC) Change Analysis 2025'
      },
      {
        id: 'ind-ag-04',
        name: 'Soil Organic Carbon (SOC) in Topsoil',
        category: 'Soil Health',
        unit: '% organic carbon',
        baselineValue: 2.4,
        currentValue: 1.1,
        thresholdLimit: 1.8,
        trend: 'deteriorating',
        score: 51,
        impactWeight: 0.15,
        source: 'Regional Soil Testing Laboratory Network'
      }
    ],
    causalPathways: [
      {
        activity: 'Over-broadcasting of subsidized urea granules on flooded paddy surfaces prior to monsoon rain events',
        primaryPressure: 'Rapid dissolution, nitrification, and uninhibited gravitational drainage into tributary canals',
        environmentalReceptor: 'Wular Lake Ramsar Wetland littoral zones',
        ecologicalConsequence: 'Explosive hyper-eutrophication, oxygen depletion in bottom water layers, and suppression of indigenous fish species',
        severity: 'Moderate',
        evidenceBase: 'EcoWatch Aquatic Biogeochemistry Field Sensors'
      }
    ],
    cumulativePressures: [
      {
        interactingSector: 'horticulture',
        interactionMechanism: 'Upstream apple orchard pesticide runoff joining paddy fertilizer leachate before entering Wular',
        hotspotZone: 'Ningli & Pohru River Inflow Deltas',
        combinedImpactScore: 82,
        compoundingRisk: 'Multiple chemical stressors rendering downstream wetlands unviable for native snow trout breeding.'
      }
    ],
    scenarios: [
      {
        name: 'Neem-Coated Urea Precision Dosing & Constructed Wetland Drainage Buffers',
        horizon: '2030',
        description: 'Mandatory leaf color chart (LCC) based nitrogen dosing and bio-retention wetland ditches along canal banks.',
        assumptions: ['40% reduction in bulk urea usage with zero yield penalty', 'Re-establishment of linear reed buffers'],
        projectedStressIndex: 32,
        keyRisk: 'Farmer behavioral inertia requiring intensive field extension schools.',
        mitigationRequirement: 'Direct farmer incentives linked to soil health card targets.'
      }
    ],
    mitigationActions: [
      {
        id: 'mit-ag-01',
        action: 'Deployment of Vegetated Constructed Wetland Drainage Corridors Along Primary Inlets',
        hierarchyType: 'Restoration',
        targetIndicator: 'Paddy Drainage Nitrate Surge (NO3-N)',
        projectedReduction: '60% biological assimilation of excess nitrates before reaching Wular Lake',
        status: 'Proposed',
        responsibleLead: 'Wular Conservation and Management Authority (WUCMA) & Agriculture Dept',
        verificationMilestone: '15 km of pilot bio-swales functional by spring 2027'
      }
    ],
    sourceReferences: [
      {
        id: 'ref-ag-01',
        title: 'Nutrient Dynamics and Eutrophication in the Wular Ramsar Wetland: The Role of Floodplain Agronomy',
        authorOrBody: 'Dar, N. A. & Jeelani, G. (Environmental Monitoring & Assessment)',
        year: 2023,
        type: 'Peer-Reviewed Paper',
        urlOrCitation: 'https://doi.org/10.1007/s10661-023-11204-x'
      }
    ],
    reviewHistory: [
      {
        stage: 'Peer Scientific Review',
        date: '2025-12-08',
        evaluator: 'Dr. M. S. Wani',
        affiliation: 'Division of Soil Science SKUAST-K',
        status: 'Approved',
        notes: 'Approved with recommendation to expand phosphorus runoff monitoring in subsequent cycle.'
      }
    ],
    publishedAt: '2026-02-14',
    updatedAt: '2026-03-30'
  },
  {
    id: 'kew-seia-2026-tr-02',
    slug: 'gulmarg-alpine-bowl-meadow-recreation-ski-resort-eia',
    code: 'KEW-SEIA-2026-TR-02',
    title: 'Gulmarg Meadow Alpine Recreation & High-Altitude Soil Erosion Impact Assessment',
    formalTitle: 'Sectoral Environmental Impact Assessment of Ski Tourism Infrastructure, Off-Road Vehicular Movement, and Alpine Meadow Degradation in Pir Panjal Range',
    sector: 'tourism',
    submissionType: 'stakeholder_submitted',
    submittingEntity: {
      name: 'Gulmarg Eco-Tourism & Hospitality Association (GEHA)',
      type: 'Hotel/Resort',
      contactEmail: 'sustainability@gulmarg-hospitality.org'
    },
    geographicBoundary: {
      name: 'Gulmarg Alpine Bowl & Apharwat Escarpment',
      districts: ['Baramulla'],
      watershed: 'Ferozpora Nallah Basin',
      landscapeType: 'Sub-Alpine Meadow & Periglacial Talus Slopes',
      coordinates: [34.053, 74.382],
      areaSqKm: 46.8
    },
    assessmentPeriod: {
      startDate: '2024-06-01',
      endDate: '2025-10-31',
      temporalScale: 'Seasonal Window'
    },
    baseline: {
      baselineYear: '1998 (Pre-Gondola Phase-2 & Mass Snow-Sports Era)',
      referenceState: 'Undisturbed alpine turf, contiguous krummholz birch thickets, zero soil gouging from quad bikes or ATVs.',
      dataSources: [
        'Botanical Survey of India Alpine Flora of Gulmarg 1996',
        'State Forest Research Institute Soil Compaction Records 2002',
        'EcoWatch Drone LiDAR Meadow Surface Elevation Model 2024'
      ],
      summary: 'Before unregulated off-road vehicles and massive hotel construction, meadow sod coverage was >94% continuous across the central bowl.'
    },
    methodologyVersion: 'KEW-SEIAE-v2.6 (High-Altitude Mountain Guidelines)',
    confidenceLevel: 'High',
    publicationStatus: 'Pilot Verification',
    overallScore: 51,
    impactSignificance: 'Moderate',
    summary: 'Submitted by the hospitality association for independent scientific audit by Kashmir EcoWatch. Identifies severe summertime alpine turf compaction caused by unregistered ATVs and pony trails, alongside high winter diesel generator emissions during grid failures.',
    keyFindings: [
      'Unpaved track proliferation by All-Terrain Vehicles (ATVs) has degraded 64 hectares of fragile alpine sod, causing gully erosion during spring snowmelt.',
      'Winter heating reliant on captive diesel generators contributes 4,200 metric tonnes of CO2e and high localized black carbon on pristine snow surfaces.',
      'Central sewage collection pipeline suffers from severe freeze-thaw ruptures, causing seasonal sub-surface seepage into Ferozpora trout stream.',
      'Hospitality operators commit to 100% phase-out of internal combustion ATVs in favor of guided electric snowmobiles and boardwalk paths.'
    ],
    indicators: [
      {
        id: 'ind-gl-01',
        name: 'Alpine Meadow Sod Gouging & Bare Soil Ratio',
        category: 'Land Degradation',
        unit: '% bare eroded soil in recreation zone',
        baselineValue: 3.5,
        currentValue: 24.8,
        thresholdLimit: 8.0,
        trend: 'critical',
        score: 38,
        impactWeight: 0.35,
        source: 'EcoWatch High-Resolution Drone Multispectral Survey 2025'
      },
      {
        id: 'ind-gl-02',
        name: 'Black Carbon Deposition on Apharwat Snowpack',
        category: 'Atmospheric Deposition',
        unit: 'μg / kg snow',
        baselineValue: 2.1,
        currentValue: 14.6,
        thresholdLimit: 5.0,
        trend: 'deteriorating',
        score: 45,
        impactWeight: 0.30,
        source: 'Cryospheric Chemistry Field Sampling Unit (EcoWatch)'
      },
      {
        id: 'ind-gl-03',
        name: 'High-Altitude Solid Waste Recovery Rate',
        category: 'Waste Governance',
        unit: '% collected and segregated at source',
        baselineValue: 20,
        currentValue: 71,
        thresholdLimit: 85,
        trend: 'improving',
        score: 72,
        impactWeight: 0.20,
        source: 'Gulmarg Development Authority Solid Waste Audit'
      },
      {
        id: 'ind-gl-04',
        name: 'Trout Stream Fecal & Detergent Indicator',
        category: 'Aquatic Impact',
        unit: 'Anionic Surfactants (MBAS) mg/L',
        baselineValue: 0.05,
        currentValue: 0.42,
        thresholdLimit: 0.20,
        trend: 'stable',
        score: 58,
        impactWeight: 0.15,
        source: 'Fisheries Department Sentinel Water Lab'
      }
    ],
    causalPathways: [
      {
        activity: 'Commercial ATV, quad bike, and high-frequency pony rides across wet alpine turf in July-August',
        primaryPressure: 'Mechanical shear stress exceeding soil shear strength, destroying root anchoring',
        environmentalReceptor: 'Alpine turf vegetation (Kobresia, Poa alpina, Primula species)',
        ecologicalConsequence: 'Topsoil stripping, accelerated gully incision, and permanent loss of medicinal alpine herbs',
        severity: 'Moderate',
        evidenceBase: 'EcoWatch Soil Penetrometer Resistance Tests 2025'
      }
    ],
    cumulativePressures: [
      {
        interactingSector: 'handicrafts',
        interactionMechanism: 'Commercial pop-up craft stalls generating non-biodegradable packaging waste in snow corridors',
        hotspotZone: 'Gondola Terminal Base',
        combinedImpactScore: 54,
        compoundingRisk: 'Aesthetic degradation and wildlife ingestion of synthetic packaging.'
      }
    ],
    scenarios: [
      {
        name: 'Zoned Boardwalks & Electrified Mountain Mobility',
        horizon: '2028',
        description: 'Enclosed raised wooden eco-boardwalks over sensitive turf; ban on motorized ATVs on raw meadows.',
        assumptions: ['All hotels connected to heat-pump district heating', 'Boardwalk network covers 100% of horse trails'],
        projectedStressIndex: 28,
        keyRisk: 'Capital costs of winterized heat pumps.',
        mitigationRequirement: 'Green hospitality financing mechanism with tax credits.'
      }
    ],
    mitigationActions: [
      {
        id: 'mit-gl-01',
        action: 'Immediate Ban on Off-Road ATV Wheeling & Installation of Elevated Wooden Meadow Boardwalks',
        hierarchyType: 'Avoidance',
        targetIndicator: 'Alpine Meadow Sod Gouging & Bare Soil Ratio',
        projectedReduction: '80% recovery of degraded turf over 3 growing seasons',
        status: 'Under Implementation',
        responsibleLead: 'Gulmarg Development Authority & Hotel Association',
        verificationMilestone: 'Zero unauthorized motorized vehicles in inner bowl verified by GPS geofencing'
      }
    ],
    sourceReferences: [
      {
        id: 'ref-gl-01',
        title: 'Alpine Meadow Vulnerability to Mass Tourism in Pir Panjal: Conservation Pathways',
        authorOrBody: 'Kashmir Mountain Tourism Research Group',
        year: 2025,
        type: 'Field Census',
        urlOrCitation: 'https://kashmir-ecowatch.com/research/gulmarg-alpine-turf-2025'
      }
    ],
    reviewHistory: [
      {
        stage: 'Stakeholder Submission Ingestion',
        date: '2025-11-20',
        evaluator: 'EcoWatch Sectoral Review Desk',
        affiliation: 'Kashmir EcoWatch',
        status: 'Approved',
        notes: 'Submitted under SEIAE Stakeholder Review Pathway. Evidence verified via high-res drone audit.'
      },
      {
        stage: 'Independent Scientific Panel Audit',
        date: '2026-03-10',
        evaluator: 'Dr. Z. A. Reshi',
        affiliation: 'Alpine Plant Ecology Specialist',
        status: 'Approved',
        notes: 'Score calculated independently; hotel association self-reported metrics corrected downward by 14% to reflect empirical soil erosion.'
      }
    ],
    publishedAt: '2026-03-25',
    updatedAt: '2026-04-05'
  }
];

export const CUMULATIVE_IMPACT_HOTSPOTS = [
  {
    id: 'hotspot-dal',
    name: 'Dal Lake & Catchment Hydro-Ecological Basin',
    districts: ['Srinagar'],
    convergingSectors: ['tourism', 'handicrafts', 'agriculture'],
    stressIndex: 88,
    primaryReceptors: ['Water Quality & Secchi Depth', 'Benthic Sediment Ecology', 'Urban Wetland Resilience'],
    synergyDescription: 'Houseboat blackwater (Tourism) combines with downtown synthetic dye effluents (Handicrafts) and floating garden agricultural nutrient runoff (Agriculture), creating severe hyper-eutrophy and oxygen dead zones.',
    mitigationPriority: 'Urgent (Priority 1)'
  },
  {
    id: 'hotspot-south-karewa',
    name: 'South Kashmir Karewa & Riparian Corridor',
    districts: ['Shopian', 'Kulgam', 'Pulwama'],
    convergingSectors: ['horticulture', 'agriculture'],
    stressIndex: 79,
    primaryReceptors: ['Shallow Karewa Groundwater Tables', 'Native Wild Pollinators', 'Trout-Bearing Headwaters'],
    synergyDescription: 'High-density apple chemical fungicide runoff synergizes with agricultural urea and deep borewell irrigation extraction, causing steep groundwater drawdown and pesticide residues in drinking springs.',
    mitigationPriority: 'High (Priority 2)'
  },
  {
    id: 'hotspot-wular-basin',
    name: 'Wular Lake Ramsar Wetland & Floodplain Margin',
    districts: ['Bandipora', 'Baramulla'],
    convergingSectors: ['agriculture', 'horticulture', 'handicrafts'],
    stressIndex: 81,
    primaryReceptors: ['Migratory Waterfowl Habitats', 'Indigenous Fishery Niche', 'Wetland Water Storage Capacity'],
    synergyDescription: 'Floodplain agricultural nitrogen surges join apple orchard pesticide leachate and willow wicker wetland biomass depletion, triggering invasive weed proliferation and loss of endemic Schizothorax trout.',
    mitigationPriority: 'High (Priority 2)'
  },
  {
    id: 'hotspot-pirpanjal-alpine',
    name: 'Gulmarg-Apharwat High-Altitude Alpine Meadow',
    districts: ['Baramulla'],
    convergingSectors: ['tourism', 'handicrafts'],
    stressIndex: 68,
    primaryReceptors: ['Alpine Turf Sod Layer', 'Periglacial Glacial Snowpack', 'High-Altitude Headwater Springs'],
    synergyDescription: 'Summertime ATV and horse trail gouging accelerates erosion, while winter diesel generator emissions deposit black carbon directly onto snowpack, accelerating melting rates.',
    mitigationPriority: 'Moderate-High (Priority 3)'
  }
];

export const SCENARIO_MODELS = [
  {
    id: 'scen-bau',
    title: 'Business as Usual (BAU 2030)',
    tagline: 'Unregulated Sectoral Expansion Without Strategic Caps',
    timeHorizon: '2026 - 2030',
    description: 'Assumes current 7-9% annual tourism growth, accelerated unmonitored transition to high-density orchards, continuous open discharge of artisanal dye effluents, and conventional subsidized agrochemical broadcasting.',
    projectedImpacts: [
      { metric: 'Dal Lake Deep Anoxic Volume', change: '+45%', state: 'critical' },
      { metric: 'Karewa Groundwater Drawdown', change: '-6.8 meters', state: 'critical' },
      { metric: 'Native Pollinator Density', change: '-52%', state: 'critical' },
      { metric: 'Wular Lake Eutrophication Rate', change: '+38%', state: 'deteriorating' }
    ],
    compositeEcosystemRisk: 'Critical Catastrophic Risk'
  },
  {
    id: 'scen-climate-stress',
    title: 'Climate Stress Compounding (RCP 8.5 2035)',
    tagline: 'Warming Extremes + Chilling Hour Deficits + Sectoral Pressure',
    timeHorizon: '2030 - 2035',
    description: 'Models +1.8°C temperature increase, erratic winter precipitation, 28% drop in orchard chilling hours, and prolonged summer droughts concentrating pollutants in reduced stream flows.',
    projectedImpacts: [
      { metric: 'Low-Altitude Apple Crop Viability', change: '-35%', state: 'critical' },
      { metric: 'Trout Stream Summer Peak Water Temps', change: '+3.4°C', state: 'critical' },
      { metric: 'Harmful Cyanobacterial Bloom Duration', change: '+60 days/yr', state: 'critical' },
      { metric: 'Alpine Permafrost Degradation Area', change: '+42%', state: 'critical' }
    ],
    compositeEcosystemRisk: 'Severe Systemic Collapse'
  },
  {
    id: 'scen-adaptive-mitigation',
    title: 'SEIAE Adaptive Sustainability Pathway (2030)',
    tagline: 'Strategic Carrying Capacity Caps & Verified Source Interventions',
    timeHorizon: '2026 - 2030',
    description: 'Implementation of mandatory closed-loop vacuum sanitation on all houseboats, 100m pesticide-free spring buffer zones, micro-CETPs for craft clusters, and organic precision agriculture.',
    projectedImpacts: [
      { metric: 'Dal Lake Coliform Density', change: '-88%', state: 'improving' },
      { metric: 'Spring Drinking Water Contamination', change: '-75%', state: 'improving' },
      { metric: 'Wild Pollinator Recovery Index', change: '+45%', state: 'improving' },
      { metric: 'Artisanal Heavy Metal Discharges', change: '-82%', state: 'improving' }
    ],
    compositeEcosystemRisk: 'Regenerative Recovery'
  }
];

export const MITIGATION_TRACKER_ITEMS: MitigationPlanItem[] = [
  {
    id: 'mit-act-01',
    action: 'Universal Closed-Loop Vacuum Waste Reception for All Dal & Nigeen Houseboats',
    hierarchyType: 'Avoidance',
    targetIndicator: 'Fecal Coliform Density in Houseboat Anchorage',
    projectedReduction: '92% reduction in coliform loads',
    status: 'Under Implementation',
    responsibleLead: 'LCMA (Lake Conservation & Management Authority) & Houseboat Guild',
    verificationMilestone: '80 Houseboats retrofitted; weekly coliform sampling online'
  },
  {
    id: 'mit-act-02',
    action: '100m Agrochemical Buffer Strips around Communal Village Springs (Shopian & Kulgam)',
    hierarchyType: 'Avoidance',
    targetIndicator: 'Spring Water Pesticide Detection Frequency',
    projectedReduction: '75% drop in detectable residues',
    status: 'Proposed',
    responsibleLead: 'Horticulture Department & Village Panchayats',
    verificationMilestone: 'Delineation of sentinel zones in 40 village revenue maps'
  },
  {
    id: 'mit-act-03',
    action: 'Modular Micro-Common Effluent Treatment Plant (CETP) in Zadibal Craft Cluster',
    hierarchyType: 'Reduction',
    targetIndicator: 'Artisanal Drain Chemical Oxygen Demand (COD)',
    projectedReduction: '85% decrease in chemical dye loads',
    status: 'Proposed',
    responsibleLead: 'Directorate of Handicrafts & Srinagar Smart City',
    verificationMilestone: 'Land allocation and pilot membrane unit delivery'
  },
  {
    id: 'mit-act-04',
    action: 'Elevated Wooden Boardwalks Replacing Off-Road ATV Wheeling in Gulmarg Alpine Bowl',
    hierarchyType: 'Avoidance',
    targetIndicator: 'Alpine Meadow Sod Gouging & Bare Soil Ratio',
    projectedReduction: '80% recovery of bare turf over 3 growing seasons',
    status: 'Under Implementation',
    responsibleLead: 'Gulmarg Development Authority & Hotel Association',
    verificationMilestone: '2.4 km of raised boardwalk commissioned in central meadow'
  },
  {
    id: 'mit-act-05',
    action: 'Constructed Wetland Bio-Swales for Paddy Fertilizer Drainage in Lower Jhelum',
    hierarchyType: 'Restoration',
    targetIndicator: 'Paddy Drainage Nitrate Surge (NO3-N)',
    projectedReduction: '60% biological assimilation of excess nitrates',
    status: 'Proposed',
    responsibleLead: 'Wular Conservation & Management Authority (WUCMA)',
    verificationMilestone: 'Hydrological design approved by SKUAST soil engineering team'
  },
  {
    id: 'mit-act-06',
    action: 'Native Wildflower & Legume Bee Corridors in High-Density Apple Orchards',
    hierarchyType: 'Restoration',
    targetIndicator: 'Native Pollinator Density Index',
    projectedReduction: 'Increase wild pollinator densities to > 35 insects/m²/hr',
    status: 'Under Implementation',
    responsibleLead: 'Orchardist Collectives & SKUAST Entomology Division',
    verificationMilestone: '1,200 hectares planted with wild thyme, clover, and borage strips'
  }
];

export const SCIENTIFIC_REPORTS = [
  {
    id: 'rep-seiae-2026-01',
    code: 'KEW-SR-2026-01',
    title: 'The Dal Lake Tourism Carrying Capacity & Limnological Resilience Dossier',
    date: 'March 2026',
    author: 'Kashmir EcoWatch Limnological Intelligence Unit',
    pages: 64,
    sector: 'tourism' as SectorType,
    badge: 'Peer-Reviewed Assessment',
    abstract: 'An exhaustive 24-month multi-sensor investigation detailing peak visitor density, houseboat blackwater mass balances, sediment nutrient loading, and actionable vacuum sanitation mitigation plans for the Dal Lake basin.'
  },
  {
    id: 'rep-seiae-2026-02',
    code: 'KEW-SR-2026-02',
    title: 'High-Density Horticulture & Groundwater Depletion in the Karewas of South Kashmir',
    date: 'February 2026',
    author: 'Kashmir EcoWatch Agro-Ecology & Pesticide Impact Working Group',
    pages: 52,
    sector: 'horticulture' as SectorType,
    badge: 'Peer-Reviewed Assessment',
    abstract: 'Quantifies pesticide active ingredient runoff, shallow water table drawdown, and severe wild pollinator depression resulting from the rapid transition from traditional agroforestry to high-density apple monocultures.'
  },
  {
    id: 'rep-seiae-2026-03',
    code: 'KEW-SR-2026-03',
    title: 'Artisanal Dye Effluents & Toxic Heavy Metal Footprint in Urban Srinagar Waterways',
    date: 'January 2026',
    author: 'EcoWatch Industrial Ecology & Craft Guild Audit Unit',
    pages: 44,
    sector: 'handicrafts' as SectorType,
    badge: 'Technical Monograph',
    abstract: 'A lifecycle assessment of Pashmina and silk textile dyeing in Shehr-e-Khas, detailing chemical oxygen demand surges, trace chromium and copper sediment deposits, and the blueprint for modular urban CETPs.'
  },
  {
    id: 'rep-seiae-2026-04',
    code: 'KEW-SR-2026-04',
    title: 'Nitrogen Surges and Wetland Eutrophication in the Lower Jhelum & Wular Basin',
    date: 'February 2026',
    author: 'EcoWatch Agro-Hydrology & Soil Sciences Working Group',
    pages: 48,
    sector: 'agriculture' as SectorType,
    badge: 'Technical Monograph',
    abstract: 'Field investigation of urea over-broadcasting, seasonal nitrate leaching through floodplain drainage canals, and strategic deployment of constructed wetland bio-swales to protect the Wular Ramsar sanctuary.'
  }
];
