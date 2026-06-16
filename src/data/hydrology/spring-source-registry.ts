/**
 * Kashmir EcoWatch — Spring Source Registry
 * Registers all authoritative data sources used for spring systems, geothermal springs, and karst aquifers.
 * Updated: 2026-06-16
 */

export interface SpringSource {
  sourceId: string;
  sourceName: string;
  sourceType: 'International-Database' | 'Government-Database' | 'Government-Report' | 'Academic-Institution' | 'Local-Knowledge' | 'Historical-Survey';
  sourceUrl?: string;
  reliability: 'High' | 'Medium' | 'Low';
  coverage: string;
  dataFields: string[];
  notes: string;
}

export const springSourceRegistry: SpringSource[] = [
  {
    sourceId: 'SRC-GOV-JALSHAKTI',
    sourceName: 'Jal Shakti Department, Government of Jammu & Kashmir',
    sourceType: 'Government-Database',
    sourceUrl: 'https://phyddep.jk.gov.in/',
    reliability: 'High',
    coverage: 'Jammu & Kashmir Union Territory (Drinking water springs and bowlis)',
    dataFields: ['Spring_Name', 'District', 'Village_Locality', 'Water_Use', 'Water_Quality_Status', 'Discharge_LPS'],
    notes: 'Primary custodian of public drinking water systems and local rural spring monitoring in J&K.'
  },
  {
    sourceId: 'SRC-ACADEMIC-KU',
    sourceName: 'University of Kashmir, Department of Environmental Sciences & Earth Sciences',
    sourceType: 'Academic-Institution',
    sourceUrl: 'https://www.kashmiruniversity.net/',
    reliability: 'High',
    coverage: 'Kashmir Valley karst systems and high-altitude springs',
    dataFields: ['Spring_Name', 'Latitude', 'Longitude', 'Elevation_m', 'Discharge_LPS', 'Water_Quality_Status', 'Water_Quality_Notes', 'Aquifer_Name'],
    notes: 'Publishes peer-reviewed research on spring chemistry, groundwater contamination, and karst hydrogeology in the valley.'
  },
  {
    sourceId: 'SRC-INT-ICIMOD',
    sourceName: 'International Centre for Integrated Mountain Development (ICIMOD)',
    sourceType: 'International-Database',
    sourceUrl: 'https://www.icimod.org/',
    reliability: 'High',
    coverage: 'Hindu Kush-Himalayan Region, Ladakh and Transboundary Geothermal Zones',
    dataFields: ['Spring_Name', 'Geothermal_Properties', 'Latitude', 'Longitude', 'Elevation_m', 'Discharge_LPS', 'Aquifer_Name'],
    notes: 'Monitors cryosphere and geothermal springs in the upper Indus basin, providing critical climate-vulnerability data.'
  },
  {
    sourceId: 'SRC-GOV-PCRWR',
    sourceName: 'Pakistan Council of Research in Water Resources (PCRWR)',
    sourceType: 'Government-Database',
    sourceUrl: 'http://pcrwr.gov.pk/',
    reliability: 'High',
    coverage: 'Azad Jammu & Kashmir (AJK) and Gilgit-Baltistan (GB) springs',
    dataFields: ['Spring_Name', 'District', 'Latitude', 'Longitude', 'Water_Quality_Status', 'Discharge_LPS', 'Water_Use'],
    notes: 'Conducts extensive surveys of water resources, potability, and spring discharge monitoring in AJK and GB.'
  },
  {
    sourceId: 'SRC-GOV-GBEPA',
    sourceName: 'Gilgit-Baltistan Environmental Protection Agency (GB-EPA)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://www.gilgitbaltistan.gov.pk/',
    reliability: 'High',
    coverage: 'Gilgit-Baltistan geothermal and freshwater spring networks',
    dataFields: ['Spring_Name', 'District', 'Water_Quality_Status', 'Therapeutic_Use', 'Notes'],
    notes: 'Monitors environmental quality, pollution threats, and therapeutic use of mineral and hot springs across GB.'
  },
  {
    sourceId: 'SRC-LOCAL-NGO',
    sourceName: 'Kashmir Eco Watch Field Surveys & Community Reports',
    sourceType: 'Local-Knowledge',
    reliability: 'Medium',
    coverage: 'Community-dependent and remote mountain springs',
    dataFields: ['Spring_Name', 'Village_Locality', 'Water_Use', 'Community_Dependency', 'Drying_Risk', 'Notes'],
    notes: 'Aggregated community reports, civil society water watches, and local herder knowledge for remote high-altitude springs.'
  },
  {
    sourceId: 'SRC-LEGACY-001',
    sourceName: 'Kashmir Eco Watch Legacy Database',
    sourceType: 'Historical-Survey',
    reliability: 'Medium',
    coverage: 'Initial seed records of major springs (2026 Migration)',
    dataFields: ['Spring_Name', 'Legacy_ID', 'District', 'Elevation_m', 'Category'],
    notes: 'Historical data compiled during initial website development, requiring GIS validation and source linking.'
  }
];
