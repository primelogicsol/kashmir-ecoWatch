/**
 * Kashmir EcoWatch — Watershed Source Registry
 * Authoritative data sources used in the basin and watershed intelligence database
 * Updated: 2026-06-16
 */

export interface WatershedSource {
  sourceId: string;
  sourceName: string;
  sourceType: 'International-Database' | 'Government-Database' | 'Satellite-Imagery' | 'Academic-Publication' | 'Research-Institution';
  sourceUrl: string;
  accessDate: string;
  dataYear: number;
  confidence: 'High' | 'Medium' | 'Low';
  dataFields: string[];
  notes: string;
}

export const watershedSourceRegistry: WatershedSource[] = [
  {
    sourceId: 'SRC-GOV-JALSHAKTI',
    sourceName: 'India Water Resources Information System (India-WRIS)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://indiawris.gov.in/',
    accessDate: '2026-06-16',
    dataYear: 2024,
    confidence: 'High',
    dataFields: ['basinBoundaries', 'catchmentAreas', 'centroidCoordinates', 'riverLinkages', 'elevation_m'],
    notes: 'Primary geospatial authority for river basins, sub-basins, and catchments within India. Established by the Ministry of Jal Shakti.'
  },
  {
    sourceId: 'SRC-PAK-PCRWR',
    sourceName: 'Pakistan Council of Research in Water Resources (PCRWR)',
    sourceType: 'Research-Institution',
    sourceUrl: 'http://pcrwr.gov.pk/',
    accessDate: '2026-06-16',
    dataYear: 2023,
    confidence: 'High',
    dataFields: ['catchmentAreas', 'waterQuality_status', 'groundwaterRecharge', 'sedimentLoad'],
    notes: 'Authoritative research body for water resources in Pakistan, including the Indus basin within AJK and Gilgit-Baltistan.'
  },
  {
    sourceId: 'SRC-PAK-WAPDA',
    sourceName: 'Water and Power Development Authority (WAPDA)',
    sourceType: 'Research-Institution',
    sourceUrl: 'http://wapda.gov.pk/',
    accessDate: '2026-06-16',
    dataYear: 2024,
    confidence: 'High',
    dataFields: ['hydropowerLinkages', 'catchmentAreas', 'sedimentLoad', 'riverFlowRate'],
    notes: 'Authoritative data source for basin-wide hydropower, reservoir capacities, siltation, and river flow monitoring in Pakistan, AJK, and GB.'
  },
  {
    sourceId: 'SRC-GOV-JKEERS',
    sourceName: 'J&K Department of Ecology, Environment and Remote Sensing',
    sourceType: 'Government-Database',
    sourceUrl: 'https://jkecology.nic.in/',
    accessDate: '2026-06-16',
    dataYear: 2023,
    confidence: 'High',
    dataFields: ['forestCover', 'landcoverData', 'wetlandCount', 'lakeCount', 'erosionRisk'],
    notes: 'Responsible for watershed delineation, landcover mappings, and environmental assessments in Jammu and Kashmir.'
  },
  {
    sourceId: 'SRC-GOV-LCMA',
    sourceName: 'JK Lake Conservation and Management Authority (LCMA)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://lcma.jk.gov.in/',
    accessDate: '2026-06-16',
    dataYear: 2024,
    confidence: 'High',
    dataFields: ['catchmentAreas', 'builtupCover', 'encroachmentRisk', 'pollutionLoad'],
    notes: 'Authority governing Dal-Nigeen Lake and its surrounding Telbal and Dachigam catchments.'
  },
  {
    sourceId: 'SRC-GOV-WUCMA',
    sourceName: 'Wular Conservation and Management Authority (WUCMA)',
    sourceType: 'Government-Database',
    sourceUrl: 'https://wucma.jk.gov.in/',
    accessDate: '2026-06-16',
    dataYear: 2024,
    confidence: 'High',
    dataFields: ['catchmentAreas', 'wetlandCount', 'siltationRisk', 'encroachmentRisk'],
    notes: 'Authority overseeing Wular Lake and its silt-prone tributaries (Erin, Madhumati, Pohru catchments).'
  },
  {
    sourceId: 'SRC-KU-GEOG',
    sourceName: 'University of Kashmir, Department of Geography and Regional Development',
    sourceType: 'Academic-Publication',
    sourceUrl: 'https://kashmiruniversity.net/',
    accessDate: '2026-06-16',
    dataYear: 2022,
    confidence: 'High',
    dataFields: ['watershedMorphometry', 'centroidCoordinates', 'soilErosion', 'slopeMean'],
    notes: 'Peer-reviewed studies on Kashmir Valley catchments (Lidder, Romushi, Rambiara, Vishav) using high-resolution DEMs.'
  }
];
