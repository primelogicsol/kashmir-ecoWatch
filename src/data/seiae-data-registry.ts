export type EvidenceClass = 'Observed' | 'Reported' | 'Modeled' | 'Estimated' | 'Independently Verified';

export type IngestionPriority = 'P0' | 'P1' | 'P2';

export interface ExternalDataSource {
  id: string;
  name: string;
  publisher: string;
  category: 'Government Repository' | 'International Satellite & Climate' | 'Ecological & Biodiversity' | 'Economic & Industry';
  verifiedAvailability: string;
  primaryUse: string;
  method: string;
  url: string;
  priority: IngestionPriority;
  updateCadence: 'Daily' | 'Monthly' | 'Seasonal' | 'Annual' | 'Release-Based';
  coverage: string;
  technicalNotice?: string;
}

export interface IngestionQueueItem {
  id: string;
  title: string;
  sourceType: string;
  priority: IngestionPriority;
  purpose: string;
  cadence: string;
  status: 'Acquired & Verified' | 'Pipeline Active' | 'Planned Ingestion';
  targetSector: 'all' | 'tourism' | 'horticulture' | 'handicrafts' | 'agriculture';
}

export interface VerifiedBaselineData {
  id: string;
  name: string;
  sourceTitle: string;
  publisher: string;
  yearSpan: string;
  geographicScope: string;
  verifiedFigureOrCoverage: string;
  seiaeApplication: string;
  openSourceUrl: string;
  qualificationNote: string;
}

export interface ResearchGapItem {
  id: string;
  gapName: string;
  requiredProcess: string;
  priority: 'Critical' | 'High' | 'Medium';
  sector: 'tourism' | 'horticulture' | 'handicrafts' | 'agriculture' | 'cross-sector';
  riskOfOmission: string;
}

export const EVIDENCE_CLASSES_METADATA: Record<EvidenceClass, { label: string; description: string; badgeColor: string; confidenceCap: string }> = {
  'Observed': {
    label: 'Observed (Empirical)',
    description: 'Direct in-situ sensor telemetry, laboratory spectrometry, or physical field measurement conducted by accredited scientists.',
    badgeColor: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40',
    confidenceCap: 'Very High (95-100%)'
  },
  'Independently Verified': {
    label: 'Independently Verified',
    description: 'Third-party or stakeholder records audited and cross-checked against independent physical baselines or satellite ground-truth.',
    badgeColor: 'border-teal-500/50 text-teal-300 bg-teal-950/40',
    confidenceCap: 'High (80-94%)'
  },
  'Reported': {
    label: 'Reported (Self/Admin)',
    description: 'Official government publications, commercial enterprise disclosures, or grower survey self-reports without independent site audits.',
    badgeColor: 'border-amber-500/50 text-amber-300 bg-amber-950/40',
    confidenceCap: 'Medium (60-79%)'
  },
  'Modeled': {
    label: 'Modeled (Deterministic)',
    description: 'Calculated using peer-reviewed hydrological, mass-balance, chilling-unit, or atmospheric dispersion equations from validated drivers.',
    badgeColor: 'border-sky-500/50 text-sky-300 bg-sky-950/40',
    confidenceCap: 'Medium-High (65-85%)'
  },
  'Estimated': {
    label: 'Estimated (Proxy/Interpolated)',
    description: 'Geospatial interpolations, satellite proxies (e.g. 10m land cover transitions), or regional averages where micro-level data is absent.',
    badgeColor: 'border-purple-500/50 text-purple-300 bg-purple-950/40',
    confidenceCap: 'Preliminary (40-64%)'
  }
};

export const EXTERNAL_DATA_ACQUISITION_REGISTRY: ExternalDataSource[] = [
  {
    id: 'src-jk-digest',
    name: 'J&K Digest of Statistics 2024–25',
    publisher: 'Directorate of Economics & Statistics J&K',
    category: 'Government Repository',
    verifiedAvailability: 'Official Government Publication Available',
    primaryUse: 'Agricultural production, horticulture, tourism footfall, and regional sector baselines',
    method: 'PDF table extraction & tabular ingestion',
    url: 'https://ecostatjk.nic.in/showdata.aspx?q=Digest_Stat',
    priority: 'P0',
    updateCadence: 'Annual',
    coverage: 'UT of Jammu & Kashmir (All 20 districts)',
    technicalNotice: 'Regional aggregates must not be confused with facility-level or watershed-level environmental footprints.'
  },
  {
    id: 'src-jk-regional',
    name: 'J&K Regional Digest of Statistics 2024–25',
    publisher: 'Directorate of Economics & Statistics J&K',
    category: 'Government Repository',
    verifiedAvailability: 'Official Government Publication Available',
    primaryUse: 'District-wise and regional crop area comparisons, apple acreage, and historical trends',
    method: 'PDF table extraction & regional reconciliation',
    url: 'https://www.ecostatjk.nic.in/pdf/publications/regdigest/Regional%20Digest%202024-25.pdf',
    priority: 'P0',
    updateCadence: 'Annual',
    coverage: 'District-level across Jammu and Kashmir divisions',
    technicalNotice: 'Preserves divisional boundaries; Jammu division figures must not be merged into Kashmir Valley totals.'
  },
  {
    id: 'src-cgwb-yearbook',
    name: 'CGWB Ground Water Year Book 2024–25 (J&K)',
    publisher: 'Central Ground Water Board (Ministry of Jal Shakti)',
    category: 'Government Repository',
    verifiedAvailability: 'Published Government Report Available',
    primaryUse: 'Groundwater depth-to-water levels, seasonal fluctuation, and regional aquifer trends',
    method: 'Report extraction & monitoring well telemetry parsing',
    url: 'https://cgwb.gov.in/cgwbpnm/public/publication-detail/2012',
    priority: 'P0',
    updateCadence: 'Release-Based',
    coverage: 'All 20 districts of J&K including Shopian, Pulwama, Srinagar, and Anantnag',
    technicalNotice: 'Well-specific depth records provide crucial ground truth for Karewa aquifer drawdown modeling.'
  },
  {
    id: 'src-imd-rainfall',
    name: 'IMD Gridded Daily Rainfall Archive (1901–2024)',
    publisher: 'India Meteorological Department (IMD Pune)',
    category: 'International Satellite & Climate',
    verifiedAvailability: 'Historical Daily Gridded Records Available (0.25°)',
    primaryUse: 'Long-term rainfall climatology, extreme precipitation events, and watershed runoff drivers',
    method: 'NetCDF multidimensional raster processing',
    url: 'https://www.imdpune.gov.in/cmpg/Griddata/Rainfall_25_NetCDF.html',
    priority: 'P0',
    updateCadence: 'Daily / Release-Based',
    coverage: 'Western Himalayas (0.25° x 0.25° grid)',
    technicalNotice: 'Must be calibrated against mountain terrain gauges to account for rain-shadow and elevation gradients.'
  },
  {
    id: 'src-copernicus-s2',
    name: 'Copernicus Sentinel-2 MSI Multi-Spectral',
    publisher: 'European Space Agency (ESA) Copernicus Data Space',
    category: 'International Satellite & Climate',
    verifiedAvailability: 'Earth Observation Catalog & APIs (10m-20m resolution)',
    primaryUse: 'Land cover, vegetation health (NDVI), water surface reflectance (NDWI), and algal blooms',
    method: 'STAC, OData, and openEO APIs',
    url: 'https://dataspace.copernicus.eu/analyse/apis',
    priority: 'P0',
    updateCadence: 'Release-Based (5-day revisit)',
    coverage: 'Global / Full Western Himalayan coverage',
    technicalNotice: 'Cloud masking and topographic hill-shade corrections are required in alpine relief.'
  },
  {
    id: 'src-dynamic-world',
    name: 'Dynamic World 10m Near-Real-Time Land Cover',
    publisher: 'Google / World Resources Institute / Copernicus',
    category: 'International Satellite & Climate',
    verifiedAvailability: '10m Land-Cover Classifications (2015–Present)',
    primaryUse: 'Tracking paddy-to-orchard and cropland-to-urban soil sealing conversions',
    method: 'Google Earth Engine API / STAC exports',
    url: 'https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1',
    priority: 'P0',
    updateCadence: 'Continuous Composite',
    coverage: 'Continuous 10m grid across Kashmir Valley',
    technicalNotice: 'Identifies land-cover transition envelopes; facility causal attribution requires ground surveys.'
  },
  {
    id: 'src-era5-land',
    name: 'ERA5-Land Hourly Climate Reanalysis',
    publisher: 'ECMWF Copernicus Climate Change Service',
    category: 'International Satellite & Climate',
    verifiedAvailability: 'Hourly Reanalysis 1950 to Present (0.1° / 9km)',
    primaryUse: 'Phenological chilling models for fruit crops, soil temperature, and snowpack dynamics',
    method: 'CDS API & NetCDF multidimensional arrays',
    url: 'https://www.ecmwf.int/en/forecasts/datasets/era5-land-hourly-data-1950-present',
    priority: 'P0',
    updateCadence: 'Monthly Release',
    coverage: 'Pan-Himalayan spatial coverage',
    technicalNotice: 'Calibrated against local IMD stations due to complex valley inversion and cold-air drainage.'
  },
  {
    id: 'src-gbif-biodiv',
    name: 'GBIF Biodiversity Occurrence Registry',
    publisher: 'Global Biodiversity Information Facility',
    category: 'Ecological & Biodiversity',
    verifiedAvailability: 'Search & Bulk-Download REST Interfaces',
    primaryUse: 'Species observations, pollinator occurrence records, and sensitivity screening',
    method: 'REST API & occurrence polygon exports',
    url: 'https://techdocs.gbif.org/en/openapi/v1/occurrence',
    priority: 'P1',
    updateCadence: 'Continuous',
    coverage: 'Kashmir & Western Himalayas georeferenced records',
    technicalNotice: 'Sampling bias toward roads and trekking routes must be accounted for in ecological models.'
  },
  {
    id: 'src-epch-exports',
    name: 'EPCH Handicrafts Production & Export Data',
    publisher: 'Export Promotion Council for Handicrafts',
    category: 'Economic & Industry',
    verifiedAvailability: 'Annual Reports & Product Category Exports',
    primaryUse: 'National economic baseline, craft categories, and export demand context',
    method: 'Web table extraction & PDF parsing',
    url: 'https://www.epch.in/sites/default/files/policies/exportsofhandicrafts.htm',
    priority: 'P1',
    updateCadence: 'Annual',
    coverage: 'National India statistics (with J&K category breakdowns)',
    technicalNotice: 'National figures (e.g. ₹33,122.79 Cr) must not be attributed solely to Kashmir production.'
  },
  {
    id: 'src-parivesh-eia',
    name: 'PARIVESH Environmental Clearance Repository',
    publisher: 'MoEFCC Government of India',
    category: 'Government Repository',
    verifiedAvailability: 'Project EIA Reports & Clearance Conditions',
    primaryUse: 'Reviewing baseline environmental studies and compliance conditions of statutory project EIAs',
    method: 'Document search & public clearance condition harvesting',
    url: 'https://environmentclearance.nic.in/onlineSearch_parivesh.aspx',
    priority: 'P1',
    updateCadence: 'Release-Based',
    coverage: 'Statutory projects within J&K',
    technicalNotice: 'Used strictly as reference evidence; SEIAE does not issue statutory clearances.'
  },
  {
    id: 'src-isric-soilgrids',
    name: 'ISRIC SoilGrids 250m Global Soil Data',
    publisher: 'International Soil Reference and Information Centre (ISRIC)',
    category: 'International Satellite & Climate',
    verifiedAvailability: '250m Spatial Rasters (pH, Organic Carbon, Texture)',
    primaryUse: 'Soil erodibility, organic carbon baseline, and agricultural nutrient retention',
    method: 'Geospatial raster downloads (WebDAV / GeoTIFFs)',
    url: 'https://isric.org/explore/soilgrids/',
    priority: 'P1',
    updateCadence: 'Versioned Releases',
    coverage: 'Kashmir agricultural floor & Karewa terraces',
    technicalNotice: 'Uses offline raster stores due to REST API instability reported by ISRIC.'
  }
];

export const INGESTION_WORK_QUEUE: IngestionQueueItem[] = [
  {
    id: 'queue-p0-01',
    title: 'J&K Sectoral & Regional Statistics Extraction',
    sourceType: 'Official Government Publications (DES J&K)',
    priority: 'P0',
    purpose: 'Core production, yield, tourism footfall, and district-level economic baselines',
    cadence: 'Annual Release-Based',
    status: 'Acquired & Verified',
    targetSector: 'all'
  },
  {
    id: 'queue-p0-02',
    title: 'Copernicus Sentinel-2 & Dynamic World Ingestion',
    sourceType: 'Satellite Earth Observation APIs',
    priority: 'P0',
    purpose: '10m land cover transition, water surface indices, and orchard canopy monitoring',
    cadence: 'Bi-weekly Composite',
    status: 'Pipeline Active',
    targetSector: 'all'
  },
  {
    id: 'queue-p0-03',
    title: 'IMD Gridded Rainfall & ERA5-Land Climate Pipeline',
    sourceType: 'Climate Archives & Reanalysis APIs',
    priority: 'P0',
    purpose: 'Precipitation anomalies, microclimate baselines, and apple chilling hour modeling',
    cadence: 'Daily / Release-Based',
    status: 'Pipeline Active',
    targetSector: 'horticulture'
  },
  {
    id: 'queue-p0-04',
    title: 'CGWB Groundwater Yearbook Baseline Extraction',
    sourceType: 'Hydro-Geological Government Reports',
    priority: 'P0',
    purpose: 'District groundwater monitoring well baseline levels & Karewa aquifer trends',
    cadence: 'Annual / Publication',
    status: 'Acquired & Verified',
    targetSector: 'horticulture'
  },
  {
    id: 'queue-p1-01',
    title: 'Tourism Footfall & Accommodation Records Integration',
    sourceType: 'Tourism Department & Destination Authorities',
    priority: 'P1',
    purpose: 'Visitor density, bed capacity, and destination carrying-capacity metrics',
    cadence: 'Monthly / Seasonal',
    status: 'Pipeline Active',
    targetSector: 'tourism'
  },
  {
    id: 'queue-p1-02',
    title: 'GBIF & Protected Planet Biodiversity Feeds',
    sourceType: 'Global Biodiversity Occurrence APIs',
    priority: 'P1',
    purpose: 'Habitat sensitivity screening and pollinator distribution mapping',
    cadence: 'Quarterly',
    status: 'Planned Ingestion',
    targetSector: 'all'
  },
  {
    id: 'queue-p1-03',
    title: 'Handicraft Export & Cluster Production Mapping',
    sourceType: 'EPCH & Directorate of Handicrafts',
    priority: 'P1',
    purpose: 'Production-chain mapping and national economic reference baseline',
    cadence: 'Annual',
    status: 'Acquired & Verified',
    targetSector: 'handicrafts'
  },
  {
    id: 'queue-p1-04',
    title: 'Local Laboratory & Facility Sampling Submissions',
    sourceType: 'Institutional Field & Chemical Audits',
    priority: 'P1',
    purpose: 'Houseboat blackwater, workshop dye chemistry, and orchard pesticide residues',
    cadence: 'Sampling Campaign Driven',
    status: 'Pipeline Active',
    targetSector: 'all'
  },
  {
    id: 'queue-p2-01',
    title: 'Mitigation Effectiveness Longitudinal Verification',
    sourceType: 'Before-and-After Sensor Telemetry & Site Audits',
    priority: 'P2',
    purpose: 'Empirical verification of implemented wastewater and buffer interventions',
    cadence: 'Biennial Assessment Cycle',
    status: 'Planned Ingestion',
    targetSector: 'all'
  }
];

export const RESEARCH_GAPS_LEDGER: ResearchGapItem[] = [
  {
    id: 'gap-01',
    gapName: 'Dal Lake Houseboat Wastewater Volumes & Disposal Practices',
    requiredProcess: 'LCMA discharge registry audits, direct operator surveys, and decentralized bio-digester sensor telemetry',
    priority: 'Critical',
    sector: 'tourism',
    riskOfOmission: 'Assuming uniform per-capita wastewater generation leads to 40-70% error in nitrogen/phosphorus lake loading budgets.'
  },
  {
    id: 'gap-02',
    gapName: 'Actual Hotel & Alpine Facility Environmental Performance',
    requiredProcess: 'Audits of captive diesel generator fuel use, municipal water utility metering, and solid waste receipts',
    priority: 'Critical',
    sector: 'tourism',
    riskOfOmission: 'Relying solely on bed-count proxies masks extreme seasonal variations in high-altitude energy and waste generation.'
  },
  {
    id: 'gap-03',
    gapName: 'Apple Orchard Farm-Level Pesticide Spray Diaries',
    requiredProcess: 'Grower spray diaries, agrochemical retail sale invoice tracking, and mass-balance leaching audits',
    priority: 'Critical',
    sector: 'horticulture',
    riskOfOmission: 'Missing pesticide data must never silently default to a zero-pesticide score; requires explicit "Unmeasured" confidence caps.'
  },
  {
    id: 'gap-04',
    gapName: 'Crop-Level Canal & Groundwater Irrigation Withdrawals',
    requiredProcess: 'Irrigation canal gauging, deep borewell power consumption records, and farmer volumetric interviews',
    priority: 'Critical',
    sector: 'agriculture',
    riskOfOmission: 'Simple evapotranspiration models fail to account for conveyance losses and flood-irrigation return flows.'
  },
  {
    id: 'gap-05',
    gapName: 'Handicraft Workshop Dye Effluent & Chemistry Profiles',
    requiredProcess: 'Targeted water sampling at urban cluster outfalls (Zadibal, Brari Nambal) with accredited laboratory spectrometry',
    priority: 'Critical',
    sector: 'handicrafts',
    riskOfOmission: 'Economic craft export figures cannot quantify azo dye, chromium, or heavy metal concentrations in urban drains.'
  },
  {
    id: 'gap-06',
    gapName: 'Native Wild Pollinator Populations & Habitat Integrity',
    requiredProcess: 'Seasonal field transect counts (April-May flowering window) comparing high-density to traditional orchards',
    priority: 'High',
    sector: 'horticulture',
    riskOfOmission: 'Satellite vegetation indices cannot determine whether wild pollinator foraging niches have collapsed beneath monoculture.'
  },
  {
    id: 'gap-07',
    gapName: 'Catchment-Scale Agricultural Nutrient Export Dynamics',
    requiredProcess: 'Continuous flow gauging combined with automated autosampler nitrate/phosphate laboratory testing',
    priority: 'High',
    sector: 'agriculture',
    riskOfOmission: 'Multiplying regional fertilizer sales by acreage neglects soil retention, crop uptake, and precipitation timing.'
  },
  {
    id: 'gap-08',
    gapName: 'Mitigation Effectiveness Longitudinal Tracking',
    requiredProcess: 'Multi-year before-and-after sensor monitoring following mitigation installation (e.g. bio-swales, vacuum barges)',
    priority: 'High',
    sector: 'cross-sector',
    riskOfOmission: 'Assuming proposed mitigation guarantees real-world ecological recovery without post-implementation verification.'
  }
];

export const VERIFIED_BASELINE_CASES: VerifiedBaselineData[] = [
  {
    id: 'vb-cgwb',
    name: 'J&K Groundwater Baseline (2024–25)',
    sourceTitle: 'Ground Water Year Book 2024–25, Jammu & Kashmir',
    publisher: 'Central Ground Water Board (CGWB)',
    yearSpan: '2024–2025',
    geographicScope: '20 Districts of Jammu & Kashmir',
    verifiedFigureOrCoverage: 'Complete monitoring station network covering Shopian, Pulwama, Srinagar, Bandipora, and Anantnag',
    seiaeApplication: 'Extracts pre-monsoon and post-monsoon water table depths to benchmark Karewa aquifer drawdown against high-density orchard expansion.',
    openSourceUrl: 'https://cgwb.gov.in/cgwbpnm/public/publication-detail/2012',
    qualificationNote: 'District-level groundwater summaries provide essential station records, but localized Karewa plateaus require targeted piezometer arrays.'
  },
  {
    id: 'vb-hort-digest',
    name: 'Horticultural Land-Use Baseline (2024–25)',
    sourceTitle: 'Regional Digest of Statistics 2024–25',
    publisher: 'Directorate of Economics & Statistics J&K',
    yearSpan: '2024–2025',
    geographicScope: 'District-wise Kashmir and Jammu Divisions',
    verifiedFigureOrCoverage: 'Official district-wise apple orchard area tables: Baramulla (25,400+ ha), Shopian (26,200+ ha), Kulgam (18,300+ ha)',
    seiaeApplication: 'Serves as the administrative ground-truth baseline against which 10m Sentinel-2 / Dynamic World satellite estimates are verified.',
    openSourceUrl: 'https://www.ecostatjk.nic.in/pdf/publications/regdigest/Regional%20Digest%202024-25.pdf',
    qualificationNote: 'Preserves divisional boundaries; reported administrative area includes non-bearing young plantations which must be differentiated in canopy models.'
  },
  {
    id: 'vb-epch-exports',
    name: 'Handicrafts Macro-Economic Baseline (FY 2024–25)',
    sourceTitle: 'EPCH Annual Report FY 2024–25',
    publisher: 'Export Promotion Council for Handicrafts (EPCH)',
    yearSpan: 'FY 2024–2025',
    geographicScope: 'India-Wide Production & Exports',
    verifiedFigureOrCoverage: '₹33,122.79 Crore national export volume across major artisanal craft classifications',
    seiaeApplication: 'Provides macroeconomic supply-chain context and production-chain demand curves.',
    openSourceUrl: 'https://www.epch.in/sites/default/files/electionofcoa/EPCH_Annual_Report_2024-25.pdf',
    qualificationNote: 'National export statistics must not be attributed solely to Kashmir production; facility-level chemical dye footprints require separate physical audits.'
  },
  {
    id: 'vb-imd-rainfall',
    name: 'Historical Rainfall Baseline (1901–2024)',
    sourceTitle: 'IMD Historical Gridded Rainfall Dataset (0.25° x 0.25°)',
    publisher: 'India Meteorological Department (IMD Pune)',
    yearSpan: '1901–2024 (124 Years)',
    geographicScope: 'Western Himalayan Coordinates',
    verifiedFigureOrCoverage: 'Continuous 124-year daily precipitation grid over the Kashmir Valley and Pir Panjal range',
    seiaeApplication: 'Defines long-term precipitation climatology, drought index baselines, and extreme cloudburst recurrence intervals.',
    openSourceUrl: 'https://www.imdpune.gov.in/cmpg/Griddata/Rainfall_25_NetCDF.html',
    qualificationNote: '0.25° grid (~25 km) requires local topographic elevation downscaling to capture narrow valley microclimates.'
  }
];
