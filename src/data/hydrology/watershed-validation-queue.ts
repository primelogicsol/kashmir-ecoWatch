/**
 * Kashmir EcoWatch — Watershed Validation Queue
 * Hydrological catchments requiring field validation, GPS centroids, area audits, or conflict resolution
 * Updated: 2026-06-16
 */

export interface WatershedValidationEntry {
  watershedId: string;
  watershedName: string;
  district: string;
  validationNeeded: ('GPS' | 'Area' | 'BoundaryVector' | 'LanduseGaps' | 'HierarchyLinkage' | 'HydrometricData')[];
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export const watershedValidationQueue: WatershedValidationEntry[] = [
  {
    watershedId: 'hokersar-catchment',
    watershedName: 'Hokersar Catchment',
    district: 'Srinagar/Budgam',
    validationNeeded: ['BoundaryVector', 'LanduseGaps'],
    priority: 'High',
    notes: 'Missing high-resolution GIS boundary vectors. Urban encroachment boundary along the Srinagar bypass must be digitized to resolve property boundary disputes.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'shallabugh-catchment',
    watershedName: 'Shallabugh Catchment',
    district: 'Ganderbal',
    validationNeeded: ['BoundaryVector', 'GPS'],
    priority: 'High',
    notes: 'Ramsar wetland boundary requires vector alignment. Local village boundaries overlap with the wildlife sanctuary core zone.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'tatapani-kalakote-spring-shed',
    watershedName: 'Tatapani Kalakote Spring-Shed',
    district: 'Rajouri',
    validationNeeded: ['BoundaryVector', 'HydrometricData'],
    priority: 'Medium',
    notes: 'Geothermal recharge boundary is approximate. Needs isotopic tracing to identify the exact infiltration zone on the limestone slopes of Kalakote.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'spring-tatta-pani-kotli-spring-shed',
    watershedName: 'Spring Tatta Pani Kotli Spring-Shed',
    district: 'Kotli',
    validationNeeded: ['GPS', 'Area', 'BoundaryVector'],
    priority: 'High',
    notes: 'Geothermal spring on transboundary riverbank. Local geological fault maps must be digitized to define the recharge area.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'puga-geothermal-catchment',
    watershedName: 'Puga Valley Geothermal Catchment',
    district: 'Leh',
    validationNeeded: ['BoundaryVector', 'LanduseGaps'],
    priority: 'Medium',
    notes: 'ONGC drilling site layouts must be integrated with the catchment boundary to assess the impact of drilling mud on local hot spring vents.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'mangla-reservoir-catchment',
    watershedName: 'Mangla Reservoir Catchment',
    district: 'Mirpur',
    validationNeeded: ['BoundaryVector', 'HydrometricData'],
    priority: 'Medium',
    notes: 'WAPDA reservoir maps show sedimentation boundaries that overlap with local agricultural plains. Siltation rates require update.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'jhelum-muzaffarabad-catchment',
    watershedName: 'Jhelum Muzaffarabad Catchment',
    district: 'Muzaffarabad',
    validationNeeded: ['BoundaryVector'],
    priority: 'Medium',
    notes: 'Landslide-induced changes from the 2005 earthquake have altered catchment runoff profiles. Needs post-seismic DEM verification.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'marusudar-sub-basin',
    watershedName: 'Marusudar Sub-Basin',
    district: 'Kishtwar',
    validationNeeded: ['BoundaryVector'],
    priority: 'Medium',
    notes: 'Delineation overlaps with the Pakal Dul dam reservoir footprint. Needs NHPC site map cross-referencing.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'nubra-sub-basin',
    watershedName: 'Nubra Sub-Basin',
    district: 'Leh',
    validationNeeded: ['BoundaryVector', 'LanduseGaps'],
    priority: 'Medium',
    notes: 'Glacial snout boundary of Siachen is dynamic. Needs satellite-delineated glacial terminus vectors from 2025.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  },
  {
    watershedId: 'hispar-glacial-catchment',
    watershedName: 'Hispar Glacial Catchment',
    district: 'Nagar',
    validationNeeded: ['BoundaryVector', 'HydrometricData'],
    priority: 'Medium',
    notes: 'Requires dynamic glacial surge tracking to estimate runoff flow peaks in GLOF mitigation planning.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z'
  }
];
