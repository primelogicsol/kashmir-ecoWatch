/**
 * Kashmir EcoWatch — River Watershed Linkage Queue
 * Tracks rivers and streams awaiting proper watershed or basin boundaries and hydrological linkages.
 * Updated: 2026-06-16
 */

export interface RiverWatershedLinkageEntry {
  riverId: string;
  riverName: string;
  region: string;
  currentBasin: string;
  currentWatershed: string;
  linkageProblem: 'Missing Watershed' | 'Unconfirmed Basin' | 'Boundary Delineation Needed' | 'Conflict';
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}

export const riverWatershedLinkageQueue: RiverWatershedLinkageEntry[] = [
  // ─── PENDING LINKAGE PROBLEMS ──────────────────────────────────────────────
  {
    riverId: 'river-hispar',
    riverName: 'Hispar River',
    region: 'Gilgit-Baltistan',
    currentBasin: 'Data Pending',
    currentWatershed: 'Data Pending',
    linkageProblem: 'Missing Watershed',
    priority: 'High',
    notes: 'Basin, sub-basin, and watershed fields are marked as Data Pending. Needs GIS linkage to the Hunza sub-basin and the Upper Indus Basin catchment structures.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    riverId: 'river-shimshal',
    riverName: 'Shimshal River',
    region: 'Gilgit-Baltistan',
    currentBasin: 'Data Pending',
    currentWatershed: 'Data Pending',
    linkageProblem: 'Missing Watershed',
    priority: 'High',
    notes: 'Basin, sub-basin, and watershed are marked as Data Pending. Hydrological boundaries need delineation relative to the Hunza sub-basin using MERIT Hydro DEM datasets.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── BOUNDARY DELINEATION / CONFLICTS RESOLVED ──────────────────────────────
  {
    riverId: 'river-kishanganga',
    riverName: 'Kishanganga River',
    region: 'Kashmir Core',
    currentBasin: 'Kishanganga Basin',
    currentWatershed: 'Kishanganga Basin',
    linkageProblem: 'Boundary Delineation Needed',
    priority: 'Medium',
    notes: 'Resolved transboundary watershed mapping. Historically split between Kishanganga (India) and Neelum (Pakistan) catchments. Delineated the transboundary basin as a single merged eco-region under Kishanganga Basin.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    riverId: 'river-veshaw',
    riverName: 'Veshaw River',
    region: 'Kashmir Core',
    currentBasin: 'Jhelum Basin',
    currentWatershed: 'Jhelum River Basin Catchment',
    linkageProblem: 'Conflict',
    priority: 'Low',
    notes: 'Resolved watershed linkage conflict. Secondary tourist records listed it under Veshaw Basin. Verified through India-WRIS that the Veshaw is a sub-catchment of the main Jhelum Basin. Re-linked accordingly.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  }
];
