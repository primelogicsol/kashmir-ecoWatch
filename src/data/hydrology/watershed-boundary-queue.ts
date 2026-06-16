/**
 * Kashmir EcoWatch — Watershed Boundary Validation Queue
 * Registers watersheds that lack high-resolution GIS boundary polygon layers (GeoJSON/Shapefile).
 * Updated: 2026-06-16
 */

export interface WatershedBoundaryEntry {
  watershedId: string;
  watershedName: string;
  currentFormat: 'None' | 'Approximate Polygon' | 'KML' | 'CAD Model';
  targetFormat: 'GeoJSON' | 'Shapefile';
  resolutionNeeded: 'High-Resolution (<10m)' | 'Medium-Resolution (<30m)';
  status: 'Awaiting Ingestion' | 'Digitizing' | 'Ready for QA';
  assignedSource: string;
  notes: string;
}

export const watershedBoundaryQueue: WatershedBoundaryEntry[] = [
  {
    watershedId: 'hokersar-catchment',
    watershedName: 'Hokersar Catchment',
    currentFormat: 'Approximate Polygon',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'High-Resolution (<10m)',
    status: 'Digitizing',
    assignedSource: 'J&K Wildlife Protection Department Map Archive',
    notes: 'Severe urban encroachment along the Srinagar bypass has altered the natural boundary. High-res drone DEM overlay required.'
  },
  {
    watershedId: 'shallabugh-catchment',
    watershedName: 'Shallabugh Catchment',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'High-Resolution (<10m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'Ecology Department of J&K',
    notes: 'Wetland boundary is seasonally dynamic. Requires winter vs summer satellite boundary comparison.'
  },
  {
    watershedId: 'tatapani-kalakote-spring-shed',
    watershedName: 'Tatapani Kalakote Spring-Shed',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'J&K Groundwater Division Rajouri',
    notes: 'Limestone fracture patterns must be mapped in GIS to define the subsurface hydrogeological boundary.'
  },
  {
    watershedId: 'spring-tatta-pani-kotli-spring-shed',
    watershedName: 'Spring Tatta Pani Kotli Spring-Shed',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'AJK Geological Survey',
    notes: 'Hot spring vents are mapped, but the recharge zone extends into the hills and lacks a digitized watershed polygon.'
  },
  {
    watershedId: 'puga-geothermal-catchment',
    watershedName: 'Puga Valley Geothermal Catchment',
    currentFormat: 'KML',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'High-Resolution (<10m)',
    status: 'Ready for QA',
    assignedSource: 'ONGC Geothermal exploration map',
    notes: 'KML file has been obtained from ONGC. Needs conversion to standard GeoJSON and projection alignment (WGS 84 UTM Zone 43N).'
  },
  {
    watershedId: 'mangla-reservoir-catchment',
    watershedName: 'Mangla Reservoir Catchment',
    currentFormat: 'Approximate Polygon',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'WAPDA Sedimentation division',
    notes: 'Requires seasonal water level shoreline tracking to delineate the maximum flood pool boundary.'
  },
  {
    watershedId: 'jhelum-muzaffarabad-catchment',
    watershedName: 'Jhelum Muzaffarabad Catchment',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'AJK Disaster Management Authority GIS layer',
    notes: 'Post-2005 earthquake slide maps must be merged to correct the drainage divide coordinates.'
  },
  {
    watershedId: 'marusudar-sub-basin',
    watershedName: 'Marusudar Sub-Basin',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Digitizing',
    assignedSource: 'NHPC Kishtwar Dam project file',
    notes: 'Requires coordination with NHPC to ingest the reservoir footprint vectors.'
  },
  {
    watershedId: 'nubra-sub-basin',
    watershedName: 'Nubra Sub-Basin',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'Siachen glacier snout monitoring satellite data',
    notes: 'Requires boundary shifts mapping to reflect the Siachen glacier terminal retreat.'
  },
  {
    watershedId: 'hispar-glacial-catchment',
    watershedName: 'Hispar Glacial Catchment',
    currentFormat: 'None',
    targetFormat: 'GeoJSON',
    resolutionNeeded: 'Medium-Resolution (<30m)',
    status: 'Awaiting Ingestion',
    assignedSource: 'ICIMOD Glacier inventory 2024',
    notes: 'Requires glacier surge tracking to determine peak flood pool shapefiles.'
  }
];
