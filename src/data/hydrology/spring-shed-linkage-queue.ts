/**
 * Kashmir EcoWatch — Spring Watershed & Aquifer Linkage Queue
 * Tracks springs awaiting proper linkage to aquifers, groundwater systems, or river basin catchments.
 * Updated: 2026-06-16
 */

export interface SpringShedLinkageEntry {
  springId: string;
  springName: string;
  region: string;
  district: string;
  currentAquifer: string;
  currentWatershed: string;
  linkageProblem: 'Missing Aquifer Link' | 'Unconfirmed Watershed' | 'Spring-shed Delineation Needed' | 'Conflict';
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}

export const springShedLinkageQueue: SpringShedLinkageEntry[] = [
  {
    springId: 'spring-panamik',
    springName: 'Panamik Hot Springs',
    region: 'Ladakh',
    district: 'Leh',
    currentAquifer: 'Tectonic Karakoram Geothermal Aquifer',
    currentWatershed: 'Shyok Basin',
    linkageProblem: 'Spring-shed Delineation Needed',
    priority: 'High',
    notes: 'Requires mapping of geothermal source lines along the Karakoram fault system. Link to Shyok watershed needs GIS boundary alignment.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-tatta-pani-kotli',
    springName: 'Tatta Pani Hot Springs (Kotli)',
    region: 'AJK',
    district: 'Kotli',
    currentAquifer: 'Poonch Valley Geothermal Aquifer',
    currentWatershed: 'Poonch River Basin',
    linkageProblem: 'Spring-shed Delineation Needed',
    priority: 'High',
    notes: 'Geothermal reservoir dynamics are poorly mapped. Needs boundary delineation relative to the Poonch River fault lines.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-chumathang',
    springName: 'Chumathang Hot Springs',
    region: 'Ladakh',
    district: 'Leh',
    currentAquifer: 'Indus Suture Zone Geothermal Aquifer',
    currentWatershed: 'Indus River Mainstem',
    linkageProblem: 'Missing Aquifer Link',
    priority: 'Medium',
    notes: 'Link to the Indus Suture Zone fracture system needs geological model linkage in GIS layers.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-puga',
    springName: 'Puga Hot Springs',
    region: 'Ladakh',
    district: 'Leh',
    currentAquifer: 'Puga Graben Fault Aquifer',
    currentWatershed: 'Indus River Mainstem',
    linkageProblem: 'Missing Aquifer Link',
    priority: 'High',
    notes: 'Graben-bound thermal aquifer requires alignment with deep geothermal drilling logs from the Geological Survey of India.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-ashtar',
    springName: 'Ashtar Spring',
    region: 'Kashmir Core',
    district: 'Budgam',
    currentAquifer: 'Tosa Maidan Glacio-Karst Aquifer',
    currentWatershed: 'Sukhnag River Basin',
    linkageProblem: 'Spring-shed Delineation Needed',
    priority: 'Medium',
    notes: 'High-altitude meadow spring-shed delineation needed to protect headwaters of the Sukhnag River from mining impacts.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-kel-springs',
    springName: 'Kel Springs',
    region: 'AJK',
    district: 'Neelum',
    currentAquifer: 'Neelum Granitic Fractured Aquifer',
    currentWatershed: 'Neelum River Basin',
    linkageProblem: 'Unconfirmed Watershed',
    priority: 'Low',
    notes: 'Local mountain catchment boundary needs digitizing using high-resolution DEM to link local flow paths to the main Neelum stem.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-sharda-springs',
    springName: 'Sharda Springs',
    region: 'AJK',
    district: 'Neelum',
    currentAquifer: 'Fractured Metasedimentary Aquifer',
    currentWatershed: 'Neelum River Basin',
    linkageProblem: 'Unconfirmed Watershed',
    priority: 'Low',
    notes: 'Hydrological connection to local Sharda stream catchments needs digitizing in GIS.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-murtazaabad',
    springName: 'Murtazaabad Spring',
    region: 'Gilgit-Baltistan',
    district: 'Hunza',
    currentAquifer: 'Karakoram Metamorphic Fracture Aquifer',
    currentWatershed: 'Hunza River Basin',
    linkageProblem: 'Missing Aquifer Link',
    priority: 'Medium',
    notes: 'Requires boundary mapping of the mountain fracture systems that feed this critical cold spring during summer runoff.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  }
];
