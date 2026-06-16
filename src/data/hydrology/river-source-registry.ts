/**
 * Kashmir EcoWatch — River & Stream Source Registry
 * Authoritative data sources used for river basin data mining, GIS mapping, and validation.
 * Updated: 2026-06-16
 */

export interface RiverSource {
  sourceId: string;
  sourceName: string;
  sourceType: 'International-Database' | 'Government-Database' | 'Satellite-Imagery' | 'Academic-Institution' | 'Non-Governmental' | 'Secondary-Report' | 'Government-Report';
  sourceUrl: string;
  reliability: 'High' | 'Medium' | 'Low';
  coverage: string;
  dataFields: string[];
  notes: string;
}

export const riverSourceRegistry: RiverSource[] = [
  {
    sourceId: 'INDIA-WRIS',
    sourceName: 'India Water Resources Information System (India-WRIS)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://indiawris.gov.in/',
    reliability: 'High',
    coverage: 'Indian-Administered J&K and Ladakh Basins',
    dataFields: ['River_Name', 'River_Order', 'Length_km', 'Basin', 'Sub_Basin', 'Source_Location', 'Source_Latitude', 'Source_Longitude', 'Mouth_Latitude', 'Mouth_Longitude', 'Elevation_Min_m', 'Elevation_Max_m'],
    notes: 'National portal providing spatial and non-spatial water resources data under the National Hydrology Project.'
  },
  {
    sourceId: 'CWC-INDIA',
    sourceName: 'Central Water Commission (CWC), Government of India',
    sourceType: 'Government-Database',
    sourceUrl: 'http://cwc.gov.in/',
    reliability: 'High',
    coverage: 'Major Indus Basin River Systems (Jhelum, Chenab, Ravi)',
    dataFields: ['River_Name', 'Length_km', 'Discharge_Rate_m3s', 'Sediment_Load_Risk', 'Flood_Risk', 'Monitoring_Stations'],
    notes: 'Premier technical organization in India for water resources. Monitors discharges, silt loads, and flood warnings.'
  },
  {
    sourceId: 'NWIC-INDIA',
    sourceName: 'National Water Informatics Centre (NWIC)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://nwic.gov.in/',
    reliability: 'High',
    coverage: 'All major and secondary watercourses in J&K/Ladakh',
    dataFields: ['River_Name', 'River_Order', 'Flow_Type', 'Irrigation_Link', 'Drinking_Water_Link'],
    notes: 'Central repository of water resources data under MoEFCC and Jal Shakti ministry.'
  },
  {
    sourceId: 'JAL-SHAKTI-JK',
    sourceName: 'Jal Shakti Department, Government of J&K',
    sourceType: 'Government-Database',
    sourceUrl: 'https://phyddep.jk.gov.in/',
    reliability: 'High',
    coverage: 'Kashmir Valley and Jammu Division local channels',
    dataFields: ['River_Name', 'Alternative_Names', 'Irrigation_Link', 'Drinking_Water_Link', 'Encroachment_Risk', 'Sand_Mining_Risk'],
    notes: 'Custodian for drinking water supply, local channel management, and flood monitoring in J&K.'
  },
  {
    sourceId: 'IFCD-JK',
    sourceName: 'Irrigation & Flood Control Department, J&K',
    sourceType: 'Government-Database',
    sourceUrl: 'http://ifckashmir.com/',
    reliability: 'High',
    coverage: 'Kashmir Valley flood spill channels, nallahs, and embankments',
    dataFields: ['River_Name', 'Flood_Risk', 'Erosion_Risk', 'Sediment_Load_Risk', 'Mouth_or_Confluence', 'Flow_Type'],
    notes: 'Responsible for dredging, river training works, flood spill channels, and monitoring river water levels.'
  },
  {
    sourceId: 'JKPCC',
    sourceName: 'J&K Pollution Control Committee (JKPCC)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://jkspcb.nic.in/',
    reliability: 'High',
    coverage: 'Urban streams, nallahs, and major Jhelum/Chenab reaches',
    dataFields: ['River_Name', 'Water_Quality_Status', 'Pollution_Risk', 'Urban_Drainage_Pressure', 'Monitoring_Stations'],
    notes: 'Responsible for monitoring biochemical oxygen demand (BOD), fecal coliforms, and pH at designated river stations.'
  },
  {
    sourceId: 'CPCB-INDIA',
    sourceName: 'Central Pollution Control Board (CPCB)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://cpcb.nic.in/',
    reliability: 'High',
    coverage: 'National water quality monitoring network (Jhelum, Chenab, Tawi, Ravi)',
    dataFields: ['River_Name', 'Water_Quality_Status', 'Pollution_Risk', 'Monitoring_Stations'],
    notes: 'Monitors polluted river stretches in India and establishes bio-monitoring standards.'
  },
  {
    sourceId: 'ISRO-BHUVAN',
    sourceName: 'ISRO Bhuvan Geoportal',
    sourceType: 'Satellite-Imagery',
    sourceUrl: 'https://bhuvan.nrsc.gov.in/',
    reliability: 'High',
    coverage: 'Indian Subcontinent Hydrology Layers',
    dataFields: ['Source_Latitude', 'Source_Longitude', 'Mouth_Latitude', 'Mouth_Longitude', 'Connected_Wetlands', 'Connected_Lakes', 'Riparian_Condition'],
    notes: 'Provides high-resolution satellite basemaps, drainage network datasets, and land-use layers.'
  },
  {
    sourceId: 'HYDROSHEDS',
    sourceName: 'HydroSHEDS (Conservation Science Program WWF-US)',
    sourceType: 'International-Database',
    sourceUrl: 'https://www.hydrosheds.org/',
    reliability: 'High',
    coverage: 'Global / Upper Indus Basin',
    dataFields: ['River_Order', 'Basin', 'Sub_Basin', 'Watershed', 'Length_km', 'Elevation_Min_m', 'Elevation_Max_m'],
    notes: 'Provides hydrographic information (dem, flow directions, accumulation) in a consistent format.'
  },
  {
    sourceId: 'MERIT-HYDRO',
    sourceName: 'MERIT Hydro global hydrography dataset',
    sourceType: 'International-Database',
    sourceUrl: 'http://hydro.iis.u-tokyo.ac.jp/~yamadai/MERIT_Hydro/',
    reliability: 'High',
    coverage: 'Global High-Resolution Hydrography',
    dataFields: ['Elevation_Min_m', 'Elevation_Max_m', 'River_Order', 'Source_Location', 'Mouth_or_Confluence'],
    notes: 'High-accuracy global flow direction map at 3 arc-second resolution, calibrated with multiple satellite DEMs.'
  },
  {
    sourceId: 'JRC-GSW',
    sourceName: 'JRC Global Surface Water (European Commission)',
    sourceType: 'Satellite-Imagery',
    sourceUrl: 'https://global-surface-water.appspot.com/',
    reliability: 'High',
    coverage: 'Global river dynamics and seasonal water presence',
    dataFields: ['Flow_Type', 'Perennial_or_Seasonal', 'Riparian_Condition', 'Connected_Wetlands'],
    notes: 'Maps spatial and temporal dynamics of global surface water over 38 years using Landsat imagery.'
  },
  {
    sourceId: 'COP-LAND',
    sourceName: 'Copernicus Land Monitoring Service',
    sourceType: 'Satellite-Imagery',
    sourceUrl: 'https://land.copernicus.eu/',
    reliability: 'High',
    coverage: 'Global / European Sentinel Land cover datasets',
    dataFields: ['Riparian_Condition', 'Encroachment_Risk', 'Urban_Drainage_Pressure'],
    notes: 'High-resolution Sentinel-2 mapping of riparian buffer zones, vegetation cover, and artificial structures.'
  },
  {
    sourceId: 'NRSC-INDIA',
    sourceName: 'National Remote Sensing Centre (NRSC)',
    sourceType: 'Government-Report',
    sourceUrl: 'https://www.nrsc.gov.in/',
    reliability: 'High',
    coverage: 'Watershed mapping and flood zone inventory',
    dataFields: ['Flood_Risk', 'Erosion_Risk', 'Sediment_Load_Risk', 'Watershed'],
    notes: 'Part of ISRO. Publishes glacier and river catchment runoff models and flood hazard mapping reports.'
  },
  {
    sourceId: 'JKDEERS',
    sourceName: 'J&K Department of Ecology, Environment and Remote Sensing',
    sourceType: 'Government-Database',
    sourceUrl: 'http://jkdears.com/',
    reliability: 'High',
    coverage: 'State-wide environment mapping and stream catchment studies',
    dataFields: ['River_Name', 'Districts_Crossed', 'Riparian_Condition', 'Erosion_Risk', 'Sand_Mining_Risk'],
    notes: 'Publishes remote sensing based reports on catchment degradation, forest-hydrology linkages, and river silting.'
  },
  {
    sourceId: 'JKSDMA',
    sourceName: 'Disaster Management Authority J&K',
    sourceType: 'Government-Report',
    sourceUrl: 'https://jksdma.jk.gov.in/',
    reliability: 'High',
    coverage: 'Flood hazard mapping and GLOF warning systems',
    dataFields: ['River_Name', 'Flood_Risk', 'Erosion_Risk', 'Sediment_Load_Risk'],
    notes: 'Manages warning networks and issues hazard risk maps for flood-prone valleys.'
  },
  {
    sourceId: 'UOK-EARTH',
    sourceName: 'University of Kashmir, Department of Earth Sciences',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://www.kashmiruniversity.net/',
    reliability: 'High',
    coverage: 'Jhelum Basin hydrology, geomorphology, and water chemistry',
    dataFields: ['River_Name', 'Alternative_Names', 'Length_km', 'Elevation_Min_m', 'Elevation_Max_m', 'Aquatic_Biodiversity_Value', 'Pollution_Risk', 'Sand_Mining_Risk'],
    notes: 'Primary research publisher on Jhelum tributaries (Lidder, Sindh, Vishav, Rambiara, Doodhganga, Pohru).'
  },
  {
    sourceId: 'SKUAST-K',
    sourceName: 'SKUAST-K Watershed and Aquatic Studies',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://skuastkashmir.co.in/',
    reliability: 'High',
    coverage: 'Riparian ecology and cold-water fisheries in Kashmir Core',
    dataFields: ['Aquatic_Biodiversity_Value', 'Riparian_Condition', 'Water_Quality_Status', 'Monitoring_Stations'],
    notes: 'Sher-e-Kashmir University of Agricultural Sciences and Technology. Focuses on trout habitats, riparian agro-forestry, and fish migration.'
  },
  {
    sourceId: 'NIT-SRINAGAR',
    sourceName: 'NIT Srinagar River and Flood Studies',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://nitsri.ac.in/',
    reliability: 'High',
    coverage: 'Hydraulic modeling of Jhelum Basin and urban drainage systems',
    dataFields: ['Flood_Risk', 'Erosion_Risk', 'Sediment_Load_Risk', 'Urban_Drainage_Pressure'],
    notes: 'Performs computational hydraulics research, sand transport mapping, and urban stormwater drainage analysis.'
  },
  {
    sourceId: 'ICIMOD-HKH',
    sourceName: 'ICIMOD Upper Indus Basin Studies',
    sourceType: 'International-Database',
    sourceUrl: 'https://www.icimod.org/',
    reliability: 'High',
    coverage: 'Hindu Kush-Karakoram-Himalaya transboundary basins',
    dataFields: ['Glacierfed_Status', 'Snowfed_Status', 'Elevation_Max_m', 'Hydropower_Link', 'Ecological_Status'],
    notes: 'Intergovernmental center studying transboundary mountain ecosystems, snow cover trends, and glacier melt watercourses.'
  },
  {
    sourceId: 'WAPDA-PK',
    sourceName: 'Water and Power Development Authority, Pakistan',
    sourceType: 'Government-Report',
    sourceUrl: 'https://www.wapda.gov.pk/',
    reliability: 'High',
    coverage: 'AJK, Gilgit-Baltistan, and Upper Indus mainstem',
    dataFields: ['River_Name', 'Length_km', 'Discharge_Rate_m3s', 'Hydropower_Link', 'Sediment_Load_Risk'],
    notes: 'Monitors Upper Indus, Neelum, Poonch, and Kunhar river discharges and operates major dams (Mangla, Tarbela).'
  },
  {
    sourceId: 'PCRWR-PK',
    sourceName: 'Pakistan Council of Research in Water Resources (PCRWR)',
    sourceType: 'Government-Database',
    sourceUrl: 'http://pcrwr.gov.pk/',
    reliability: 'High',
    coverage: 'AJK and Gilgit-Baltistan watercourses',
    dataFields: ['River_Name', 'Water_Quality_Status', 'Pollution_Risk', 'Drinking_Water_Link', 'Irrigation_Link'],
    notes: 'Conducts extensive water quality testing, siltation tracking, and aquifer mapping in AJK and GB.'
  },
  {
    sourceId: 'AJK-EPA',
    sourceName: 'Azad Jammu & Kashmir Environmental Protection Agency',
    sourceType: 'Government-Database',
    sourceUrl: 'http://www.ajk.gov.pk/',
    reliability: 'High',
    coverage: 'Neelum, Poonch, Jhelum AJK reaches',
    dataFields: ['Water_Quality_Status', 'Pollution_Risk', 'Sand_Mining_Risk', 'Urban_Drainage_Pressure'],
    notes: 'Regulatory monitoring of industrial runoff, municipal sewage, and river sand mining impacts in AJK.'
  },
  {
    sourceId: 'GB-EPA',
    sourceName: 'Gilgit-Baltistan Environmental Protection Agency',
    sourceType: 'Government-Database',
    sourceUrl: 'https://www.gilgitbaltistan.gov.pk/',
    reliability: 'High',
    coverage: 'Gilgit, Hunza, Shyok, Shigar, Astore reaches',
    dataFields: ['Water_Quality_Status', 'Pollution_Risk', 'Erosion_Risk', 'Monitoring_Stations'],
    notes: 'Monitors sewage disposal, tourism-related pollution, and heavy metals in glacial runoffs across GB.'
  }
];
