/**
 * Kashmir EcoWatch — Lake Validation Queue
 * Lakes requiring field verification, GPS confirmation, area data, or conflict resolution
 * Updated: 2026-06-16 | Status: Active
 */

import type { ValidationQueueEntry } from './lake-schema';

export const lakeValidationQueue: ValidationQueueEntry[] = [

  // ─── GPS VALIDATION REQUIRED ──────────────────────────────────────────────
  // Lakes found in official records but without precise coordinates

  {
    lakeId: 'sukh-dukh-lakes-kupwara',
    lakeName: 'Sukh Dukh Lakes (Daw Sar)',
    district: 'Kupwara',
    validationNeeded: ['GPS', 'Area'],
    priority: 'Medium',
    notes: 'Near Line of Control. Found in local documentation only. Exact coordinates disputed. Requires military clearance zone verification.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'nagmarg-lakes-kupwara',
    lakeName: 'Nagmarg Alpine Lakes',
    district: 'Kupwara',
    validationNeeded: ['GPS', 'Area', 'NameVerification'],
    priority: 'Low',
    notes: 'Multiple unnamed tarns in Nagmarg area reported by trekkers. Needs ISRO Bhuvan cross-reference for official existence confirmation.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'tulian-lake-anantnag',
    lakeName: 'Tulian Lake',
    district: 'Anantnag',
    validationNeeded: ['Area', 'WaterQuality'],
    priority: 'Medium',
    notes: 'Coordinates approximate (tourist sources). Area cited as 350m×160m oval which is ~0.056 km². Needs satellite confirmation.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'mirgund-lake-baramulla',
    lakeName: 'Mirgund Lake',
    district: 'Baramulla',
    validationNeeded: ['GPS', 'Area', 'WaterQuality'],
    priority: 'Medium',
    notes: 'Lake near Gulmarg. Coordinates and area reported by tourism sources only. Needs JRC GSW confirmation.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'shounter-lake-neelum',
    lakeName: 'Shounter Lake (AJK)',
    district: 'Neelum',
    validationNeeded: ['Area', 'WaterQuality'],
    priority: 'Medium',
    notes: 'Coordinates available from trekking sources. Area not officially confirmed. Water quality data absent.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'saral-lake-neelum',
    lakeName: 'Saral Lake',
    district: 'Neelum',
    validationNeeded: ['GPS', 'Area', 'WaterQuality'],
    priority: 'Medium',
    notes: 'AJK lake near Sharda. Tourism-only documentation. Needs Pakistan survey data confirmation.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'sari-lake-neelum',
    lakeName: 'Sari Lake (AJK)',
    district: 'Neelum',
    validationNeeded: ['GPS', 'Area', 'NameVerification'],
    priority: 'Low',
    notes: 'Small lake mentioned in Neelum valley trekking routes. May be same as Saral Lake (name conflict). Requires clarification.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

  // ─── AREA VALIDATION REQUIRED ─────────────────────────────────────────────
  // Lakes with confirmed existence but missing area data

  {
    lakeId: 'brari-nambal-lake-srinagar',
    lakeName: 'Brari Nambal Lake',
    district: 'Srinagar',
    validationNeeded: ['Area'],
    priority: 'High',
    notes: 'LCMA documented lake in Srinagar. Coordinates known. Area not officially published in accessible sources. CAG report references it as shrinking. Needs JKLCMA area data.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'khushalsar-lake-srinagar',
    lakeName: 'Khushalsar Lake',
    district: 'Srinagar',
    validationNeeded: ['Area'],
    priority: 'High',
    notes: 'JKLCMA restoration site. Official current area differs by source (0.5-0.8 km²). Needs latest JKLCMA survey data.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

  // ─── WATER QUALITY DATA REQUIRED ─────────────────────────────────────────
  // Lakes with good locational data but no water quality records

  {
    lakeId: 'gangabal-lake-ganderbal',
    lakeName: 'Gangabal Lake',
    district: 'Ganderbal',
    validationNeeded: ['WaterQuality'],
    priority: 'High',
    notes: 'High-tourist lake (Great Lakes Trek). Water quality likely degraded by trekker pressure. No official WQ monitoring data found. JKPCC should prioritize.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'vishansar-lake-ganderbal',
    lakeName: 'Vishansar Lake',
    district: 'Ganderbal',
    validationNeeded: ['WaterQuality'],
    priority: 'Medium',
    notes: 'Alpine lake on Great Lakes Trek route. No WQ monitoring data found. Likely excellent based on remoteness and elevation.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'krishnasar-lake-ganderbal',
    lakeName: 'Krishnasar Lake',
    district: 'Ganderbal',
    validationNeeded: ['WaterQuality'],
    priority: 'Medium',
    notes: 'Adjacent to Vishansar. Twin alpine lake. Same WQ monitoring gap.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'gadsar-lake-ganderbal',
    lakeName: 'Gadsar Lake',
    district: 'Ganderbal',
    validationNeeded: ['WaterQuality', 'Area'],
    priority: 'Medium',
    notes: 'One of the Great Lakes Trek lakes. Fish-stocked. No official WQ data found.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

  // ─── NAME CONFLICTS ───────────────────────────────────────────────────────
  // Lakes where official and local names conflict

  {
    lakeId: 'konsarnag-kulgam',
    lakeName: 'Konsarnag / Kausar Nag / Kounsarnag',
    district: 'Kulgam',
    validationNeeded: ['NameVerification'],
    priority: 'High',
    notes: 'Three spellings in use: Konsarnag (Dogri), Kausar Nag (Hindi), Kounsarnag (local Kashmiri). Official government documents use "Kausar Nag". Survey of India maps may differ. Need official name verification.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'satsar-lakes-ganderbal',
    lakeName: 'Satsar Lakes (Seven Lakes)',
    district: 'Ganderbal',
    validationNeeded: ['NameVerification', 'GPS'],
    priority: 'Medium',
    notes: 'Satsar = Seven lakes. Some sources say 7 lakes, others say 5-6. Individual lake names for each in the complex not officially documented. Need ISRO Bhuvan imagery to count and map.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

  // ─── CONFLICT RECORDS ─────────────────────────────────────────────────────
  // Lakes where sources conflict on key data

  {
    lakeId: 'dal-lake-srinagar',
    lakeName: 'Dal Lake (Area Conflict)',
    district: 'Srinagar',
    validationNeeded: ['Area', 'Conflict'],
    priority: 'High',
    notes: 'CONFLICT: Area cited as 22.8 km² (JKLCMA 2024), 18.0 km² (CAG report 2026, current shrunken area), 25.0 km² (historical 1950s). Use 22.8 km² as current official JKLCMA figure. Note historical loss for dashboard.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'wular-lake-bandipora',
    lakeName: 'Wular Lake (Area Conflict)',
    district: 'Bandipora',
    validationNeeded: ['Area', 'Conflict'],
    priority: 'High',
    notes: 'CONFLICT: Area cited as 98 km² (WUCMA current estimate), 189 km² (historical peak), 258 km² (Ramsar listing 1990), 130 km² (satellite average). Use 98-130 km² as current range. Seasonal variation is extreme (+/-50 km²).',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'attabad-lake-hunza',
    lakeName: 'Attabad Lake (Area Conflict)',
    district: 'Hunza',
    validationNeeded: ['Area', 'Conflict'],
    priority: 'Medium',
    notes: 'CONFLICT: Area cited as 9.6 km² (Pakistan Army survey 2011), 7.8 km² (GBDMA 2022), 12 km² (tourism sources). Growing at ~0.3 km²/yr initially, now stable. Use GBDMA 2022 figure.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

  // ─── GLOF RISK VERIFICATION QUEUE ────────────────────────────────────────
  // Glacial lakes needing GLOF risk reassessment

  {
    lakeId: 'shisper-glacial-lake-hunza',
    lakeName: 'Shisper Glacial Lake',
    district: 'Hunza',
    validationNeeded: ['Area'],
    priority: 'High',
    notes: 'CRITICAL GLOF ACTIVE. Lake area changes seasonally with glacier surge cycle. Area needs annual update from UNDP GLOF-II sensors. Current estimate 0.35 km² but may be 0-2.0 km² depending on surge phase.',
    status: 'In-Progress',
    assignedTo: 'UNDP-GLOF-II',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'drang-drung-proglacial-lake-kargil',
    lakeName: 'Drang-Drung Proglacial Lake',
    district: 'Kargil',
    validationNeeded: ['Area', 'GPS'],
    priority: 'High',
    notes: 'Expanding proglacial lake. Area increasing annually. Last confirmed measurement 2023 (Wadia Institute). Needs satellite update from NRSC.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },
  {
    lakeId: 'passu-glacial-lake-hunza',
    lakeName: 'Passu Glacial Lake',
    district: 'Hunza',
    validationNeeded: ['GPS', 'Area', 'WaterQuality'],
    priority: 'High',
    notes: 'Ice-dammed lake from Passu glacier. Multiple historical GLOF events. UNDP GLOF-II monitoring site. Current lake area needs annual update.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

  // ─── HISTORICAL / DISAPPEARED LAKES ──────────────────────────────────────
  // Lakes from CAG audit that may be lost

  {
    lakeId: 'historical-jk-lost-315',
    lakeName: 'J&K Lost Lakes (315 count)',
    district: 'Multiple',
    validationNeeded: ['GPS', 'Area', 'NameVerification'],
    priority: 'High',
    notes: 'CAG India 2026 audit found 315 of 697 J&K lakes have disappeared. Individual IDs and names of the 315 lost lakes not publicly available in the audit. Request formal data from JKLCMA/JK-DEER under RTI. This requires a separate comprehensive field survey.',
    status: 'Pending',
    createdAt: '2026-06-16T00:00:00Z',
  },

];

/**
 * Get validation queue entries by priority
 */
export function getQueueByPriority(priority: ValidationQueueEntry['priority']): ValidationQueueEntry[] {
  return lakeValidationQueue.filter(e => e.priority === priority);
}

/**
 * Get pending GPS validation entries
 */
export function getGPSValidationQueue(): ValidationQueueEntry[] {
  return lakeValidationQueue.filter(e => e.validationNeeded.includes('GPS'));
}

/**
 * Get entries needing water quality data
 */
export function getWaterQualityQueue(): ValidationQueueEntry[] {
  return lakeValidationQueue.filter(e => e.validationNeeded.includes('WaterQuality'));
}

export const VALIDATION_QUEUE_STATS = {
  total: lakeValidationQueue.length,
  pending: lakeValidationQueue.filter(e => e.status === 'Pending').length,
  inProgress: lakeValidationQueue.filter(e => e.status === 'In-Progress').length,
  gpsRequired: lakeValidationQueue.filter(e => e.validationNeeded.includes('GPS')).length,
  areaRequired: lakeValidationQueue.filter(e => e.validationNeeded.includes('Area')).length,
  wqRequired: lakeValidationQueue.filter(e => e.validationNeeded.includes('WaterQuality')).length,
  conflicts: lakeValidationQueue.filter(e => e.validationNeeded.includes('Conflict')).length,
  highPriority: lakeValidationQueue.filter(e => e.priority === 'High').length,
};
