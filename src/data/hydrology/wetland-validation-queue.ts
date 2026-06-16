/**
 * Kashmir EcoWatch — Wetland Validation Queue
 * Wetlands requiring GPS verification, area calculation, or conflict resolution
 * Updated: 2026-06-16 | Status: Active
 */

export interface WetlandValidationEntry {
  wetlandId: string;
  wetlandName: string;
  district: string;
  region: string;
  validationNeeded: ('GPS' | 'Area' | 'Hydrological' | 'Biodiversity' | 'Conflict' | 'NameVerification')[];
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}

export const wetlandValidationQueue: WetlandValidationEntry[] = [
  // ─── GPS & LOCATION VALIDATION ──────────────────────────────────────────
  {
    wetlandId: 'wetland-srinagar-floodplain',
    wetlandName: 'Srinagar Jhelum Floodplain Wetlands',
    district: 'Srinagar',
    region: 'Kashmir Core',
    validationNeeded: ['GPS', 'Area', 'Hydrological'],
    priority: 'High',
    notes: 'No exact coordinates. Wetland is highly fragmented due to urban encroachment. Requires remote sensing mapping to trace remaining marshes and define boundaries.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── AREA VALIDATION ─────────────────────────────────────────────────────
  {
    wetlandId: 'wetland-malgam',
    wetlandName: 'Malgam Wetland',
    district: 'Bandipora',
    region: 'Kashmir Core',
    validationNeeded: ['Area', 'GPS'],
    priority: 'Medium',
    notes: 'Severe agricultural encroachment has reduced the water spread. Historical area records do not match current satellite views. Needs JRC Global Surface Water area calculation.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-pargwal',
    wetlandName: 'Pargwal Wetland Conservation Reserve',
    district: 'Jammu',
    region: 'Jammu Region',
    validationNeeded: ['Area', 'GPS'],
    priority: 'High',
    notes: 'Floodplain wetland along Chenab River. Boundaries shift dynamically with river course. Requires multi-temporal satellite imagery to map dry vs wet season extent.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-kukarian',
    wetlandName: 'Kukarian Wetland Conservation Reserve',
    district: 'Jammu',
    region: 'Jammu Region',
    validationNeeded: ['Area'],
    priority: 'Medium',
    notes: 'Notified area boundary not documented in GIS. Coordinates are verified, but area is pending ground survey mapping from the Wildlife Dept.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-sangral',
    wetlandName: 'Sangral-Asa Chak Wetland Conservation Reserve',
    district: 'Jammu',
    region: 'Jammu Region',
    validationNeeded: ['Area'],
    priority: 'Medium',
    notes: 'No official area figures. Requires border zone clearance or satellite-based area extraction due to proximity to the international border.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-nanga',
    wetlandName: 'Nanga Wetland Conservation Reserve',
    district: 'Samba',
    region: 'Jammu Region',
    validationNeeded: ['Area'],
    priority: 'Low',
    notes: 'Local wet meadow/marsh area unmeasured. Needs survey data from the Samba Wildlife division.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-trishul',
    wetlandName: 'Trishul Marshes',
    district: 'Leh',
    region: 'Ladakh',
    validationNeeded: ['Area', 'GPS'],
    priority: 'Low',
    notes: 'Remote high-altitude glacial wetland near LAC. Ground survey not feasible due to military restrictions. Area must be derived purely from Sentinel-2 satellite data.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-gyam',
    wetlandName: 'Gyam Marshes',
    district: 'Leh',
    region: 'Ladakh',
    validationNeeded: ['Area'],
    priority: 'Medium',
    notes: 'Connected to Tso Moriri. Boundaries are blurred with the lake proper. Needs delineating from lake basin to extract true peatland marsh area.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── CONFLICTS RESOLVED (HISTORICAL TRACKING) ────────────────────────────
  {
    wetlandId: 'wetland-hokersar',
    wetlandName: 'Hokersar Wetland Conservation Reserve',
    district: 'Srinagar',
    region: 'Kashmir Core',
    validationNeeded: ['Conflict', 'GPS'],
    priority: 'High',
    notes: 'Resolved coordinate conflict. Seed data had 34.25, 74.85 (~20km offset). Updated to official Ramsar center point: 34.0833, 74.7167.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-shallabugh',
    wetlandName: 'Shallabugh Wetland Conservation Reserve',
    district: 'Ganderbal',
    region: 'Kashmir Core',
    validationNeeded: ['Conflict', 'Area', 'GPS'],
    priority: 'High',
    notes: 'Resolved area and coordinate conflicts. Seed data had 7.5 km2 and 34.35, 74.75. Corrected to official Ramsar figures: 16.75 km2 and 34.1567, 74.7194.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-hygam',
    wetlandName: 'Hygam Wetland Conservation Reserve',
    district: 'Baramulla',
    region: 'Kashmir Core',
    validationNeeded: ['Conflict', 'Area', 'GPS'],
    priority: 'High',
    notes: 'Resolved area and coordinate conflicts. Seed data had 5.2 km2 and 34.35, 74.55. Corrected to official Ramsar figures: 8.02 km2 and 34.2444, 74.5222.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    wetlandId: 'wetland-mirgund',
    wetlandName: 'Mirgund Wetland Conservation Reserve',
    district: 'Baramulla',
    region: 'Kashmir Core',
    validationNeeded: ['Conflict', 'GPS', 'NameVerification'],
    priority: 'High',
    notes: 'Resolved district and coordinate conflicts. Seed data incorrectly listed Ganderbal and 34.2833, 74.7833. Corrected to Baramulla and 34.1433, 74.6333 based on wildlife division boundaries.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  }
];
