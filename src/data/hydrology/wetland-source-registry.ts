/**
 * Kashmir EcoWatch — Wetland Source Registry
 * Authoritative data sources used for wetland data mining and verification
 * Updated: 2026-06-16
 */

export interface WetlandSource {
  sourceId: string;
  sourceName: string;
  sourceType: 'International-Database' | 'Government-Database' | 'Satellite-Imagery' | 'Academic-Institution' | 'Non-Governmental' | 'Secondary-Report';
  sourceUrl: string;
  reliability: 'High' | 'Medium' | 'Low';
  coverage: string;
  dataFields: string[];
  notes: string;
}

export const wetlandSourceRegistry: WetlandSource[] = [
  {
    sourceId: 'RAMSAR-DB',
    sourceName: 'Ramsar Sites Information Service (RSIS)',
    sourceType: 'International-Database',
    sourceUrl: 'https://rsis.ramsar.org/',
    reliability: 'High',
    coverage: 'Trans-Divisional & High-Altitude Ramsar Wetlands',
    dataFields: ['Wetland_Name', 'Ramsar_ID', 'Ramsar_Status', 'Area_km2', 'Latitude', 'Longitude', 'Elevation_m', 'Dominant_Vegetation', 'Biodiversity_Value'],
    notes: 'Gold standard for wetlands designated under the Ramsar Convention. Provides official Ramsar Information Sheets (RIS) with legal boundaries and coordinates.'
  },
  {
    sourceId: 'NWIA-2010',
    sourceName: 'National Wetland Inventory and Assessment (NWIA) J&K Atlas 2010',
    sourceType: 'Government-Database',
    sourceUrl: 'https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf',
    reliability: 'High',
    coverage: 'Kashmir Core, Jammu, and Ladakh',
    dataFields: ['Wetland_Name', 'Area_km2', 'Latitude', 'Longitude', 'Wetland_Type', 'Seasonality'],
    notes: 'Prepared by Space Applications Centre (ISRO) and J&K Department of Ecology, Environment and Remote Sensing. Detailed remote-sensing mapping of wetlands >1 hectare.'
  },
  {
    sourceId: 'NWIA-2021',
    sourceName: 'National Wetland Inventory and Assessment (NWIA) Phase-II 2021',
    sourceType: 'Government-Database',
    sourceUrl: 'https://moef.gov.in/',
    reliability: 'High',
    coverage: 'Kashmir Core, Jammu, and Ladakh',
    dataFields: ['Wetland_Name', 'Area_km2', 'Latitude', 'Longitude', 'Wetland_Type', 'Water_Level_Trend'],
    notes: 'Updated national decadal wetland mapping showing area changes and ecological status using high-resolution LISS-III and LISS-IV satellite data.'
  },
  {
    sourceId: 'ISRO-BHUVAN',
    sourceName: 'ISRO Bhuvan Geoportal',
    sourceType: 'Satellite-Imagery',
    sourceUrl: 'https://bhuvan.nrsc.gov.in/',
    reliability: 'High',
    coverage: 'Indian-administered regions (Kashmir, Jammu, Ladakh)',
    dataFields: ['Latitude', 'Longitude', 'Area_km2', 'Water_Depth_Status', 'Seasonality'],
    notes: 'Provides real-time and historical satellite layers. Used to verify the physical presence and surface area of unnamed mapped wetlands.'
  },
  {
    sourceId: 'JRC-GSW',
    sourceName: 'JRC Global Surface Water (European Commission)',
    sourceType: 'Satellite-Imagery',
    sourceUrl: 'https://global-surface-water.appspot.com/',
    reliability: 'High',
    coverage: 'Global / Full Himalayan Basins',
    dataFields: ['Seasonality', 'Water_Level_Trend', 'Area_km2'],
    notes: '38-year Landsat record of surface water dynamics. Indispensable for checking seasonality and desiccation trends in high-altitude and seasonal marshes.'
  },
  {
    sourceId: 'COP-LAND',
    sourceName: 'Copernicus Land Monitoring Service',
    sourceType: 'Satellite-Imagery',
    sourceUrl: 'https://land.copernicus.eu/',
    reliability: 'High',
    coverage: 'Global / Full Himalayan Basins',
    dataFields: ['Area_km2', 'Dominant_Vegetation', 'Reedbed_Presence'],
    notes: 'Sentinel-based land cover classification. Excellent for detecting wetland vegetation patterns, reedbeds, and urban expansion pressure.'
  },
  {
    sourceId: 'WET-INT',
    sourceName: 'Wetlands International',
    sourceType: 'Non-Governmental',
    sourceUrl: 'https://www.wetlands.org/',
    reliability: 'High',
    coverage: 'Global / Transboundary Basins',
    dataFields: ['Migratory_Bird_Value', 'Bird_Habitat_Value', 'Biodiversity_Value', 'Restoration_Status'],
    notes: 'Global authority on wetland ecology. Provides extensive data on bird populations and migratory corridors (Central Asian Flyway).'
  },
  {
    sourceId: 'MOEFCC-INDIA',
    sourceName: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://indianwetlands.in/',
    reliability: 'High',
    coverage: 'Indian-administered regions',
    dataFields: ['Protected_Status', 'Management_Agency', 'Ramsar_Status', 'Restoration_Status'],
    notes: 'Nodal ministry for wetland conservation in India. Hosts the national portal for wetlands and conservation schemes.'
  },
  {
    sourceId: 'JK-DEERS',
    sourceName: 'J&K Department of Ecology, Environment and Remote Sensing',
    sourceType: 'Government-Database',
    sourceUrl: 'http://jkdears.com/',
    reliability: 'High',
    coverage: 'Kashmir Core, Jammu',
    dataFields: ['Wetland_Name', 'District', 'Latitude', 'Longitude', 'Wetland_Type', 'Siltation_Risk', 'Encroachment_Risk'],
    notes: 'J&K state-level agency producing remote sensing studies, environmental plans, and state-of-environment reports.'
  },
  {
    sourceId: 'JK-WPD',
    sourceName: 'J&K Wildlife Protection Department',
    sourceType: 'Government-Database',
    sourceUrl: 'https://wildlife.jk.gov.in/',
    reliability: 'High',
    coverage: 'Kashmir Core, Jammu',
    dataFields: ['Protected_Status', 'Protected_Area_Link', 'Management_Agency', 'Bird_Habitat_Value', 'Migratory_Bird_Value'],
    notes: 'Administrative custodian for notified Wetland Conservation Reserves (e.g., Hokersar, Hygam, Shallabugh, Mirgund, Gharana).'
  },
  {
    sourceId: 'JKLCMA',
    sourceName: 'J&K Lakes Conservation and Management Authority',
    sourceType: 'Government-Database',
    sourceUrl: 'https://jklcma.jk.gov.in/',
    reliability: 'High',
    coverage: 'Srinagar and Ganderbal urban/semi-urban wetlands',
    dataFields: ['Pollution_Risk', 'Restoration_Status', 'Management_Agency', 'Dominant_Vegetation'],
    notes: 'Specific urban authority managing Dal-Nigeen basin and surrounding urban wetlands/reedbeds.'
  },
  {
    sourceId: 'JK-PCC',
    sourceName: 'J&K Pollution Control Committee',
    sourceType: 'Government-Database',
    sourceUrl: 'https://jkspcb.nic.in/',
    reliability: 'Medium',
    coverage: 'Kashmir Core, Jammu',
    dataFields: ['Pollution_Risk', 'Water_Depth_Status', 'Notes'],
    notes: 'Monitors water quality parameters (pH, DO, BOD) across state water bodies. Valuable for pollution risk assessment.'
  },
  {
    sourceId: 'JAL-SHAKTI',
    sourceName: 'Jal Shakti Department, Government of J&K',
    sourceType: 'Government-Database',
    sourceUrl: 'http://jklc.gov.in/',
    reliability: 'Medium',
    coverage: 'Kashmir Core, Jammu',
    dataFields: ['Basin', 'Watershed', 'Hydrological_Source', 'Inflow_Source', 'Outflow'],
    notes: 'Responsible for flood control, irrigation channels, and basin-wide water resource management.'
  },
  {
    sourceId: 'INDIA-WRIS',
    sourceName: 'India Water Resources Information System',
    sourceType: 'Government-Database',
    sourceUrl: 'https://indiawris.gov.in/',
    reliability: 'High',
    coverage: 'Indian-administered regions',
    dataFields: ['Basin', 'Watershed', 'Inflow_Source', 'Elevation_m', 'Latitude', 'Longitude'],
    notes: 'National hydrological portal containing river basin datasets, water quality monitoring, and aquifer mapping.'
  },
  {
    sourceId: 'ICIMOD-HKH',
    sourceName: 'ICIMOD Hindu Kush Himalaya Database',
    sourceType: 'International-Database',
    sourceUrl: 'https://www.icimod.org/',
    reliability: 'High',
    coverage: 'Ladakh, Gilgit-Baltistan, AJK, Upper Indus',
    dataFields: ['Elevation_m', 'Area_km2', 'Wetland_Type', 'Basin', 'Biodiversity_Value', 'Siltation_Risk'],
    notes: 'Intergovernmental learning centre. Crucial for high-altitude wetlands, climate impacts, and transboundary Himalayan basins.'
  },
  {
    sourceId: 'HYDROSHEDS',
    sourceName: 'HydroSHEDS Hydrological Database',
    sourceType: 'International-Database',
    sourceUrl: 'https://www.hydrosheds.org/',
    reliability: 'High',
    coverage: 'Global / Himalayan Basins',
    dataFields: ['Basin', 'Watershed', 'Outflow'],
    notes: 'Offers hydrographic information in a consistent format. Used to delineate watershed names and outflow trajectories.'
  },
  {
    sourceId: 'MERIT-HYDRO',
    sourceName: 'MERIT Hydro Hydrological Data',
    sourceType: 'International-Database',
    sourceUrl: 'http://hydro.iis.u-tokyo.ac.jp/~yamadai/MERIT_Hydro/',
    reliability: 'High',
    coverage: 'Global / Himalayan Basins',
    dataFields: ['Elevation_m', 'Basin'],
    notes: 'High-accuracy global digital elevation model. Essential for verifying elevation and catchment basins of remote alpine marshes.'
  },
  {
    sourceId: 'UOK-EARTH',
    sourceName: 'University of Kashmir, Department of Earth Sciences',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://www.kashmiruniversity.net/',
    reliability: 'High',
    coverage: 'Kashmir Valley and Ladakh',
    dataFields: ['Alternative_Names', 'Area_km2', 'Dominant_Vegetation', 'Siltation_Risk', 'Land_Use_Pressure', 'Notes'],
    notes: 'Authoritative research on Kashmir wetland shrinkage, siltation rates, and land-use changes.'
  },
  {
    sourceId: 'SKUAST-K',
    sourceName: 'SKUAST Kashmir Faculty of Fisheries & Forestry',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://skuastkashmir.co.in/',
    reliability: 'High',
    coverage: 'Kashmir Core, Jammu',
    dataFields: ['Dominant_Vegetation', 'Biodiversity_Value', 'Invasive_Species_Risk', 'Notes'],
    notes: 'Provides detailed field data on aquatic weeds, invasive fish species (e.g., Carassius carassius), and agricultural runoffs.'
  },
  {
    sourceId: 'WII-INDIA',
    sourceName: 'Wildlife Institute of India (WII)',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://wii.gov.in/',
    reliability: 'High',
    coverage: 'All regions',
    dataFields: ['Bird_Habitat_Value', 'Migratory_Bird_Value', 'Biodiversity_Value', 'Notes'],
    notes: 'Premier research institute. Conducts national inventories on migratory paths and bird census across Himalayan wetlands.'
  },
  {
    sourceId: 'AJK-EPA',
    sourceName: 'AJK Environmental Protection Agency',
    sourceType: 'Government-Database',
    sourceUrl: 'https://www.ajk.gov.pk/',
    reliability: 'Medium',
    coverage: 'Azad Jammu & Kashmir',
    dataFields: ['Management_Agency', 'Pollution_Risk', 'Land_Use_Pressure', 'Notes'],
    notes: 'Provincial environmental agency monitoring industrial effluent, urban dumps, and municipal threats in AJK.'
  },
  {
    sourceId: 'GB-FWED',
    sourceName: 'GB Forest, Wildlife and Environment Department',
    sourceType: 'Government-Database',
    sourceUrl: 'https://www.gilgitbaltistan.gov.pk/',
    reliability: 'High',
    coverage: 'Gilgit-Baltistan',
    dataFields: ['Protected_Status', 'Management_Agency', 'Biodiversity_Value', 'Bird_Habitat_Value'],
    notes: 'Administrative custodian for GB protected areas including Deosai National Park, Shandur-Handrup, and Khunjerab.'
  },
  {
    sourceId: 'PCRWR-PK',
    sourceName: 'Pakistan Council of Research in Water Resources',
    sourceType: 'Government-Database',
    sourceUrl: 'http://pcrwr.gov.pk/',
    reliability: 'High',
    coverage: 'Azad Jammu & Kashmir & Gilgit-Baltistan',
    dataFields: ['Hydrological_Source', 'Inflow_Source', 'Outflow', 'Seasonality', 'Water_Depth_Status'],
    notes: 'National water resources research agency. Provides data on water quality, sedimentation, and high-altitude hydrology.'
  },
  {
    sourceId: 'UIB-STUDY',
    sourceName: 'Upper Indus Basin Studies Network (UIBSN)',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://www.uibsn.org/',
    reliability: 'High',
    coverage: 'Gilgit-Baltistan, AJK, Upper Indus',
    dataFields: ['Water_Level_Trend', 'Siltation_Risk', 'Restoration_Status', 'Notes'],
    notes: 'Consortium of international and regional scientists monitoring cryosphere change, glacial runoff, and basin hydrology.'
  }
];
