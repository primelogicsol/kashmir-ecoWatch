/**
 * KASHMIR ECOWATCH — CANONICAL WESTERN HIMALAYAN GEOGRAPHIC & RAMSAR TAXONOMY REGISTRY
 *
 * Single authoritative source of truth for:
 * 1) 5 Western Himalayan Subregions & 46 Operational Baseline Districts (+ 5 newly notified 2024 Ladakh districts)
 * 2) Elevation & Bioclimatic Envelopes per District (for species & ecosystem range validation)
 * 3) Sub-district Tehsil / Town -> Parent District Normalization (e.g., Pampore -> Pulwama)
 * 4) 7 Official Ramsar Sites (RSIS-verified) vs Non-Ramsar Notified Wetlands
 */

export type CanonicalSubregionName =
  | 'Kashmir Valley'
  | 'Jammu Region'
  | 'Ladakh'
  | 'Azad Jammu & Kashmir'
  | 'Gilgit-Baltistan';

export type BioclimaticZone =
  | 'subtropical_shivalik_plains'
  | 'middle_himalayan_pir_panjal'
  | 'kashmir_valley_lacustrine_temperate'
  | 'greater_himalayan_alpine'
  | 'trans_himalayan_karakoram_cold_desert';

export interface CanonicalDistrictRecord {
  slug: string;
  name: string;
  subregion: CanonicalSubregionName;
  elevationMinM: number;
  elevationMaxM: number;
  bioclimaticZones: BioclimaticZone[];
  hasHighAlpineHabitat: boolean; // >= 3,200 m ASL verified habitat (Snow Leopard / Ibex / Alpine Flora)
  isLowlandSubtropical: boolean;
  administrativeHeadquarters: string;
  areaSqKm?: number;
  notes?: string;
}

export const CANONICAL_SUBREGIONS: Array<{
  name: CanonicalSubregionName;
  shortName: string;
  operationalDistrictsCount: number;
  newlyNotified2024DistrictsCount: number;
  description: string;
}> = [
  {
    name: 'Kashmir Valley',
    shortName: 'Kashmir',
    operationalDistrictsCount: 10,
    newlyNotified2024DistrictsCount: 0,
    description: 'Intermontane Jhelum basin framed by the Pir Panjal and Greater Himalaya (1,550–5,425 m ASL).',
  },
  {
    name: 'Jammu Region',
    shortName: 'Jammu',
    operationalDistrictsCount: 10,
    newlyNotified2024DistrictsCount: 0,
    description: 'Shivalik alluvial plains, middle Himalayan Chenab-Tawi-Ravi valleys, and Kishtwar high peaks (280–6,500 m ASL).',
  },
  {
    name: 'Ladakh',
    shortName: 'Ladakh',
    operationalDistrictsCount: 2,
    newlyNotified2024DistrictsCount: 5,
    description: 'Trans-Himalayan Indus, Shyok, Nubra, Zanskar, and Changthang plateau (2,550–7,742 m ASL; 2 operational Census/GIS districts + 5 districts notified in Aug 2024).',
  },
  {
    name: 'Azad Jammu & Kashmir',
    shortName: 'AJ&K',
    operationalDistrictsCount: 10,
    newlyNotified2024DistrictsCount: 0,
    description: 'Neelum, Jhelum, and Poonch watersheds from high alpine Neelum/Haveli ridges to Mirpur-Bhimber foothills (300–6,326 m ASL).',
  },
  {
    name: 'Gilgit-Baltistan',
    shortName: 'Gilgit-Baltistan',
    operationalDistrictsCount: 14,
    newlyNotified2024DistrictsCount: 0,
    description: 'Karakoram, Western Kunlun, Hindu Kush, and Nanga Parbat cryospheric core of the Upper Indus Basin (1,100–8,611 m ASL).',
  },
];

export const LADAKH_2024_NOTIFIED_DISTRICTS = [
  { name: 'Zanskar', parentOperationalDistrict: 'Kargil', notificationYear: 2024 },
  { name: 'Drass', parentOperationalDistrict: 'Kargil', notificationYear: 2024 },
  { name: 'Sham', parentOperationalDistrict: 'Leh', notificationYear: 2024 },
  { name: 'Nubra', parentOperationalDistrict: 'Leh', notificationYear: 2024 },
  { name: 'Changthang', parentOperationalDistrict: 'Leh', notificationYear: 2024 },
] as const;

export const CANONICAL_DISTRICTS: CanonicalDistrictRecord[] = [
  // ── KASHMIR VALLEY (10) ──
  { slug: 'srinagar', name: 'Srinagar', subregion: 'Kashmir Valley', elevationMinM: 1580, elevationMaxM: 4200, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Srinagar', areaSqKm: 1979 },
  { slug: 'ganderbal', name: 'Ganderbal', subregion: 'Kashmir Valley', elevationMinM: 1585, elevationMaxM: 5200, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Ganderbal', areaSqKm: 1045 },
  { slug: 'budgam', name: 'Budgam', subregion: 'Kashmir Valley', elevationMinM: 1580, elevationMaxM: 4700, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Budgam', areaSqKm: 1371 },
  { slug: 'anantnag', name: 'Anantnag', subregion: 'Kashmir Valley', elevationMinM: 1600, elevationMaxM: 5425, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Anantnag', areaSqKm: 3574 },
  { slug: 'kulgam', name: 'Kulgam', subregion: 'Kashmir Valley', elevationMinM: 1650, elevationMaxM: 4700, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Kulgam', areaSqKm: 410 },
  { slug: 'pulwama', name: 'Pulwama', subregion: 'Kashmir Valley', elevationMinM: 1585, elevationMaxM: 4300, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Pulwama', areaSqKm: 1086, notes: 'Includes Pampore (saffron karewas & wetland complexes), Awantipora, and Tral.' },
  { slug: 'shopian', name: 'Shopian', subregion: 'Kashmir Valley', elevationMinM: 1950, elevationMaxM: 4700, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Shopian', areaSqKm: 312 },
  { slug: 'baramulla', name: 'Baramulla', subregion: 'Kashmir Valley', elevationMinM: 1100, elevationMaxM: 4390, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'middle_himalayan_pir_panjal', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Baramulla', areaSqKm: 4243 },
  { slug: 'bandipora', name: 'Bandipora', subregion: 'Kashmir Valley', elevationMinM: 1578, elevationMaxM: 5100, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Bandipora', areaSqKm: 3450, notes: 'Includes Wular Lake northern basin and Gurez-Tilel high alpine valley.' },
  { slug: 'kupwara', name: 'Kupwara', subregion: 'Kashmir Valley', elevationMinM: 1550, elevationMaxM: 4600, bioclimaticZones: ['kashmir_valley_lacustrine_temperate', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Kupwara', areaSqKm: 2379 },

  // ── JAMMU REGION (10) ──
  { slug: 'jammu', name: 'Jammu', subregion: 'Jammu Region', elevationMinM: 280, elevationMaxM: 850, bioclimaticZones: ['subtropical_shivalik_plains'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Jammu', areaSqKm: 2342 },
  { slug: 'samba', name: 'Samba', subregion: 'Jammu Region', elevationMinM: 290, elevationMaxM: 750, bioclimaticZones: ['subtropical_shivalik_plains'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Samba', areaSqKm: 904 },
  { slug: 'kathua', name: 'Kathua', subregion: 'Jammu Region', elevationMinM: 280, elevationMaxM: 4100, bioclimaticZones: ['subtropical_shivalik_plains', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Kathua', areaSqKm: 2502 },
  { slug: 'udhampur', name: 'Udhampur', subregion: 'Jammu Region', elevationMinM: 600, elevationMaxM: 2900, bioclimaticZones: ['subtropical_shivalik_plains', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Udhampur', areaSqKm: 2637 },
  { slug: 'reasi', name: 'Reasi', subregion: 'Jammu Region', elevationMinM: 450, elevationMaxM: 3200, bioclimaticZones: ['subtropical_shivalik_plains', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Reasi', areaSqKm: 1719 },
  { slug: 'rajouri', name: 'Rajouri', subregion: 'Jammu Region', elevationMinM: 500, elevationMaxM: 4500, bioclimaticZones: ['subtropical_shivalik_plains', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: true, isLowlandSubtropical: true, administrativeHeadquarters: 'Rajouri', areaSqKm: 2630 },
  { slug: 'poonch', name: 'Poonch', subregion: 'Jammu Region', elevationMinM: 800, elevationMaxM: 4745, bioclimaticZones: ['middle_himalayan_pir_panjal', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Poonch', areaSqKm: 1674 },
  { slug: 'doda', name: 'Doda', subregion: 'Jammu Region', elevationMinM: 850, elevationMaxM: 4500, bioclimaticZones: ['middle_himalayan_pir_panjal', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Doda', areaSqKm: 8912 },
  { slug: 'ramban', name: 'Ramban', subregion: 'Jammu Region', elevationMinM: 700, elevationMaxM: 3600, bioclimaticZones: ['middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: false, administrativeHeadquarters: 'Ramban', areaSqKm: 1329 },
  { slug: 'kishtwar', name: 'Kishtwar', subregion: 'Jammu Region', elevationMinM: 1100, elevationMaxM: 6574, bioclimaticZones: ['middle_himalayan_pir_panjal', 'greater_himalayan_alpine', 'trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Kishtwar', areaSqKm: 7737 },

  // ── LADAKH (2 Operational Baseline Districts; 5 Newly Notified Aug 2024) ──
  { slug: 'leh', name: 'Leh', subregion: 'Ladakh', elevationMinM: 2900, elevationMaxM: 7742, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Leh', areaSqKm: 45110, notes: 'Includes Nubra, Changthang, and Sham (notified as new districts in Aug 2024).' },
  { slug: 'kargil', name: 'Kargil', subregion: 'Ladakh', elevationMinM: 2550, elevationMaxM: 7135, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Kargil', areaSqKm: 14036, notes: 'Includes Suru, Drass, and Zanskar (Drass & Zanskar notified as new districts in Aug 2024).' },

  // ── AZAD JAMMU & KASHMIR (10) ──
  { slug: 'muzaffarabad', name: 'Muzaffarabad', subregion: 'Azad Jammu & Kashmir', elevationMinM: 670, elevationMaxM: 4400, bioclimaticZones: ['middle_himalayan_pir_panjal', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Muzaffarabad', areaSqKm: 1642 },
  { slug: 'neelum', name: 'Neelum', subregion: 'Azad Jammu & Kashmir', elevationMinM: 1200, elevationMaxM: 6326, bioclimaticZones: ['middle_himalayan_pir_panjal', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Athmuqam', areaSqKm: 3621 },
  { slug: 'jhelum-valley', name: 'Jhelum Valley', subregion: 'Azad Jammu & Kashmir', elevationMinM: 850, elevationMaxM: 3800, bioclimaticZones: ['middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: false, administrativeHeadquarters: 'Hattian Bala', areaSqKm: 854 },
  { slug: 'bagh', name: 'Bagh', subregion: 'Azad Jammu & Kashmir', elevationMinM: 1000, elevationMaxM: 3400, bioclimaticZones: ['middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: false, administrativeHeadquarters: 'Bagh', areaSqKm: 770 },
  { slug: 'haveli', name: 'Haveli', subregion: 'Azad Jammu & Kashmir', elevationMinM: 1500, elevationMaxM: 4200, bioclimaticZones: ['middle_himalayan_pir_panjal', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Forward Kahuta', areaSqKm: 598 },
  { slug: 'poonch-ajk', name: 'Poonch (AJK)', subregion: 'Azad Jammu & Kashmir', elevationMinM: 900, elevationMaxM: 3200, bioclimaticZones: ['middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: false, administrativeHeadquarters: 'Rawalakot', areaSqKm: 855 },
  { slug: 'sudhnoti', name: 'Sudhnoti', subregion: 'Azad Jammu & Kashmir', elevationMinM: 600, elevationMaxM: 2200, bioclimaticZones: ['subtropical_shivalik_plains', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Pallandri', areaSqKm: 569 },
  { slug: 'kotli', name: 'Kotli', subregion: 'Azad Jammu & Kashmir', elevationMinM: 450, elevationMaxM: 1900, bioclimaticZones: ['subtropical_shivalik_plains', 'middle_himalayan_pir_panjal'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Kotli', areaSqKm: 1862 },
  { slug: 'mirpur', name: 'Mirpur', subregion: 'Azad Jammu & Kashmir', elevationMinM: 320, elevationMaxM: 900, bioclimaticZones: ['subtropical_shivalik_plains'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Mirpur', areaSqKm: 1010 },
  { slug: 'bhimber', name: 'Bhimber', subregion: 'Azad Jammu & Kashmir', elevationMinM: 300, elevationMaxM: 950, bioclimaticZones: ['subtropical_shivalik_plains'], hasHighAlpineHabitat: false, isLowlandSubtropical: true, administrativeHeadquarters: 'Bhimber', areaSqKm: 1516 },

  // ── GILGIT-BALTISTAN (14) ──
  { slug: 'gilgit', name: 'Gilgit', subregion: 'Gilgit-Baltistan', elevationMinM: 1450, elevationMaxM: 6100, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert', 'greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Gilgit', areaSqKm: 4208 },
  { slug: 'hunza', name: 'Hunza', subregion: 'Gilgit-Baltistan', elevationMinM: 1950, elevationMaxM: 7885, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Aliabad', areaSqKm: 10109 },
  { slug: 'nagar', name: 'Nagar', subregion: 'Gilgit-Baltistan', elevationMinM: 1850, elevationMaxM: 7788, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Nagar Khas', areaSqKm: 4137 },
  { slug: 'ghizer', name: 'Ghizer', subregion: 'Gilgit-Baltistan', elevationMinM: 1700, elevationMaxM: 5900, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Gahkuch', areaSqKm: 5720 },
  { slug: 'gupis-yasin', name: 'Gupis-Yasin', subregion: 'Gilgit-Baltistan', elevationMinM: 2100, elevationMaxM: 6800, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Phander / Gupis', areaSqKm: 6360 },
  { slug: 'diamer', name: 'Diamer', subregion: 'Gilgit-Baltistan', elevationMinM: 1100, elevationMaxM: 8126, bioclimaticZones: ['greater_himalayan_alpine', 'trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Chilas', areaSqKm: 5050 },
  { slug: 'darel', name: 'Darel', subregion: 'Gilgit-Baltistan', elevationMinM: 1300, elevationMaxM: 4900, bioclimaticZones: ['greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Darel', areaSqKm: 1150 },
  { slug: 'tangir', name: 'Tangir', subregion: 'Gilgit-Baltistan', elevationMinM: 1350, elevationMaxM: 4800, bioclimaticZones: ['greater_himalayan_alpine'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Tangir', areaSqKm: 1050 },
  { slug: 'astore', name: 'Astore', subregion: 'Gilgit-Baltistan', elevationMinM: 2100, elevationMaxM: 8126, bioclimaticZones: ['greater_himalayan_alpine', 'trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Eidgah (Astore)', areaSqKm: 5092 },
  { slug: 'skardu', name: 'Skardu', subregion: 'Gilgit-Baltistan', elevationMinM: 2200, elevationMaxM: 6200, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Skardu', areaSqKm: 8700 },
  { slug: 'shigar', name: 'Shigar', subregion: 'Gilgit-Baltistan', elevationMinM: 2250, elevationMaxM: 8611, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Shigar', areaSqKm: 8500, notes: 'Contains K2 (8,611 m) and Baltoro-Biafo-Hispar cryosphere.' },
  { slug: 'kharmang', name: 'Kharmang', subregion: 'Gilgit-Baltistan', elevationMinM: 2350, elevationMaxM: 5800, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Tolti', areaSqKm: 5500 },
  { slug: 'roundu', name: 'Roundu', subregion: 'Gilgit-Baltistan', elevationMinM: 1900, elevationMaxM: 6400, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Dambudas', areaSqKm: 3100 },
  { slug: 'ghanche', name: 'Ghanche', subregion: 'Gilgit-Baltistan', elevationMinM: 2500, elevationMaxM: 7821, bioclimaticZones: ['trans_himalayan_karakoram_cold_desert'], hasHighAlpineHabitat: true, isLowlandSubtropical: false, administrativeHeadquarters: 'Khaplu', areaSqKm: 8531 },
];

export const SUB_DISTRICT_TO_CANONICAL_DISTRICT: Record<string, string> = {
  pampore: 'Pulwama',
  pulwara: 'Pulwama',
  awantipora: 'Pulwama',
  tral: 'Pulwama',
  gulmarg: 'Baramulla',
  tangmarg: 'Baramulla',
  sopore: 'Baramulla',
  uri: 'Baramulla',
  pattani: 'Baramulla',
  pattan: 'Baramulla',
  pahalgam: 'Anantnag',
  kokernag: 'Anantnag',
  achabal: 'Anantnag',
  verinag: 'Anantnag',
  qazigund: 'Anantnag',
  sonamarg: 'Ganderbal',
  kangan: 'Ganderbal',
  gurez: 'Bandipora',
  sumbal: 'Bandipora',
  hajin: 'Bandipora',
  yusmarg: 'Budgam',
  charar_i_sharief: 'Budgam',
  bhaderwah: 'Doda',
  banihal: 'Ramban',
  batote: 'Ramban',
  ranbirsinghpura: 'Jammu',
  'r.s. pura': 'Jammu',
  akhnoor: 'Jammu',
  nowshera: 'Rajouri',
  punch: 'Poonch',
  nubra: 'Leh',
  changthang: 'Leh',
  hanle: 'Leh',
  sham: 'Leh',
  zanskar: 'Kargil',
  drass: 'Kargil',
  rawalakot: 'Poonch (AJK)',
  'hattian bala': 'Jhelum Valley',
  hattian: 'Jhelum Valley',
  athmuqam: 'Neelum',
  gojal: 'Hunza',
  chilas: 'Diamer',
  khaplu: 'Ghanche',
};

export function normalizeCanonicalDistrictName(raw: string): string | null {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (SUB_DISTRICT_TO_CANONICAL_DISTRICT[lower]) {
    return SUB_DISTRICT_TO_CANONICAL_DISTRICT[lower];
  }
  const exact = CANONICAL_DISTRICTS.find((d) => d.name.toLowerCase() === lower || d.slug === lower);
  return exact ? exact.name : null;
}

export function normalizeDistrictArray(rawList: readonly string[]): string[] {
  const out = new Set<string>();
  for (const item of rawList) {
    const norm = normalizeCanonicalDistrictName(item);
    if (norm) out.add(norm);
  }
  return Array.from(out);
}

export interface VerifiedRamsarWetlandRecord {
  ramsarSiteNumber: number;
  officialRsisName: string;
  commonPlatformName: string;
  designationDate: string;
  subregion: CanonicalSubregionName;
  districts: string[];
  designatedAreaHa: number;
  designatedAreaSqKm: number;
  coordinates: [number, number]; // [lat, lng]
  elevationM: number;
  rsisUrl: string;
}

/**
 * The ONLY 7 official Ramsar Sites designated under the Convention on Wetlands (RSIS)
 * within KEW's 5-region Western Himalayan scope as of November 2026.
 * Note: Mirgund, Dal, Anchar, Manasbal, Pangong Tso, Gharana, Narkara, Chatlam, Fashkoori,
 * Kranchoo, Malangpora, and Mangla Dam are NOT designated Ramsar sites.
 */
export const VERIFIED_WESTERN_HIMALAYAN_RAMSAR_SITES: VerifiedRamsarWetlandRecord[] = [
  {
    ramsarSiteNumber: 461,
    officialRsisName: 'Wular Lake',
    commonPlatformName: 'Wular Lake',
    designationDate: '1990-03-23',
    subregion: 'Kashmir Valley',
    districts: ['Bandipora', 'Baramulla'],
    designatedAreaHa: 18900,
    designatedAreaSqKm: 189.0,
    coordinates: [34.36, 74.56],
    elevationM: 1580,
    rsisUrl: 'https://rsis.ramsar.org/ris/461',
  },
  {
    ramsarSiteNumber: 1213,
    officialRsisName: 'Tsomoriri',
    commonPlatformName: 'Tso Moriri',
    designationDate: '2002-08-19',
    subregion: 'Ladakh',
    districts: ['Leh'],
    designatedAreaHa: 12000,
    designatedAreaSqKm: 120.0,
    coordinates: [32.9, 78.31],
    elevationM: 4522,
    rsisUrl: 'https://rsis.ramsar.org/ris/1213',
  },
  {
    ramsarSiteNumber: 1570,
    officialRsisName: 'Hokera Wetland',
    commonPlatformName: 'Hokersar Wetland',
    designationDate: '2005-11-08',
    subregion: 'Kashmir Valley',
    districts: ['Srinagar', 'Budgam'],
    designatedAreaHa: 1375,
    designatedAreaSqKm: 13.75,
    coordinates: [34.105, 74.715],
    elevationM: 1584,
    rsisUrl: 'https://rsis.ramsar.org/ris/1570',
  },
  {
    ramsarSiteNumber: 1573,
    officialRsisName: 'Surinsar-Mansar Lakes',
    commonPlatformName: 'Surinsar-Mansar Lakes',
    designationDate: '2005-11-08',
    subregion: 'Jammu Region',
    districts: ['Samba', 'Udhampur', 'Jammu'],
    designatedAreaHa: 350,
    designatedAreaSqKm: 3.5,
    coordinates: [32.735, 75.105],
    elevationM: 666,
    rsisUrl: 'https://rsis.ramsar.org/ris/1573',
  },
  {
    ramsarSiteNumber: 2443,
    officialRsisName: 'Tso Kar Wetland Complex',
    commonPlatformName: 'Tso Kar Wetland Complex',
    designationDate: '2020-11-17',
    subregion: 'Ladakh',
    districts: ['Leh'],
    designatedAreaHa: 9577,
    designatedAreaSqKm: 95.77,
    coordinates: [33.3, 78.0],
    elevationM: 4530,
    rsisUrl: 'https://rsis.ramsar.org/ris/2443',
  },
  {
    ramsarSiteNumber: 2488,
    officialRsisName: 'Shallbugh Wetland Conservation Reserve',
    commonPlatformName: 'Shallabugh Wetland',
    designationDate: '2022-06-08',
    subregion: 'Kashmir Valley',
    districts: ['Ganderbal', 'Srinagar'],
    designatedAreaHa: 1675,
    designatedAreaSqKm: 16.75,
    coordinates: [34.16, 74.725],
    elevationM: 1580,
    rsisUrl: 'https://rsis.ramsar.org/ris/2488',
  },
  {
    ramsarSiteNumber: 2496,
    officialRsisName: 'Hygam Wetland Conservation Reserve',
    commonPlatformName: 'Hygam Wetland',
    designationDate: '2022-06-08',
    subregion: 'Kashmir Valley',
    districts: ['Baramulla'],
    designatedAreaHa: 802,
    designatedAreaSqKm: 8.02,
    coordinates: [34.242, 74.525],
    elevationM: 1580,
    rsisUrl: 'https://rsis.ramsar.org/ris/2496',
  },
];

export const HIGH_ALPINE_SNOW_LEOPARD_DISTRICTS: readonly string[] = [
  'Leh',
  'Kargil',
  'Kishtwar',
  'Ganderbal',
  'Bandipora',
  'Anantnag',
  'Kupwara',
  'Neelum',
  'Astore',
  'Diamer',
  'Gilgit',
  'Hunza',
  'Nagar',
  'Ghizer',
  'Gupis-Yasin',
  'Skardu',
  'Shigar',
  'Kharmang',
  'Roundu',
  'Ghanche',
];
