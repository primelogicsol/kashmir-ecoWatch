/**
 * Kashmir EcoWatch — River & Stream Validation Queue
 * Fluvial records requiring GPS coordinates, length calculations, or geomorphological reviews.
 * Updated: 2026-06-16
 */

export interface RiverValidationEntry {
  riverId: string;
  riverName: string;
  region: string;
  district: string;
  validationNeeded: ('GPS' | 'Length' | 'Elevation' | 'Conflict')[];
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}

export const riverValidationQueue: RiverValidationEntry[] = [
  // ─── GPS & COORDINATES VALIDATION ─────────────────────────────────────────
  {
    riverId: 'nallah-shounter',
    riverName: 'Shounter Nallah',
    region: 'AJK',
    district: 'Neelum',
    validationNeeded: ['GPS'],
    priority: 'High',
    notes: 'Mouth/confluence coordinates are marked as Source Required. Requires high-resolution satellite tracing near Kel to define the exact confluence point with the Neelum River.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    riverId: 'nallah-chittakatha',
    riverName: 'Chitta Katha Nallah',
    region: 'AJK',
    district: 'Neelum',
    validationNeeded: ['GPS'],
    priority: 'High',
    notes: 'Both source (lake outlet) and mouth (confluence with Shounter Nallah) coordinates are marked as Source Required. High mountain topography requires orthorectified Sentinel-2 imagery for mapping.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── LENGTH VALIDATION ─────────────────────────────────────────────────────
  {
    riverId: 'nallah-dudipat',
    riverName: 'Dudipat Nallah',
    region: 'AJK',
    district: 'Neelum',
    validationNeeded: ['Length', 'GPS'],
    priority: 'Medium',
    notes: 'Length is marked as Source Required. Mountain channel course is highly winding and snow-blocked for 8 months. Tracing using multi-temporal satellite datasets is required to calculate length in km.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── CONFLICT RESOLUTION ───────────────────────────────────────────────────
  {
    riverId: 'river-jhelum',
    riverName: 'Jhelum River',
    region: 'Kashmir Core',
    district: 'Multiple',
    validationNeeded: ['Conflict'],
    priority: 'Low',
    notes: 'Resolved minor length discrepancy. Historic British-era surveys recorded 725 km total length; recent India-WRIS GIS tracing calculates 721.5 km. Conflict resolved by preserving the standard 725 km and noting the GIS variance in the Conflict Note.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    riverId: 'river-tawi',
    riverName: 'Tawi River',
    region: 'Jammu',
    district: 'Jammu',
    validationNeeded: ['Conflict'],
    priority: 'Medium',
    notes: 'Resolved district-level listing. Seed records listed Jammu district only. Updated to include Doda and Udhampur districts based on watershed boundaries from Jammu & Kashmir DEERS.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  }
];
