// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — CANONICAL ENTITY REGISTRY & IDENTITY SYSTEM
// Universal Cross-Module Source of Truth for Western Himalayan Environmental Intelligence
// Audited Date: November 22, 2026
// ─────────────────────────────────────────────────────────────────────────────

export type CanonicalEntityType =
  | 'PERSON'
  | 'ORGANIZATION'
  | 'INSTITUTION'
  | 'GOVERNMENT_DEPARTMENT'
  | 'ENVIRONMENTAL_CASE'
  | 'SCIENTIFIC_REPORT'
  | 'ENVIRONMENTAL_PROJECT'
  | 'WATER_BODY'
  | 'RIVER'
  | 'WATERSHED'
  | 'WETLAND'
  | 'GLACIER'
  | 'FOREST'
  | 'PROTECTED_AREA'
  | 'WILDLIFE_SPECIES'
  | 'GEOGRAPHIC_LOCATION'
  | 'CONFERENCE_WEBINAR'
  | 'HISTORICAL_EVENT'
  | 'ENVIRONMENTAL_INDICATOR'
  | 'DATA_SOURCE';

export type VerificationState =
  | 'UNVERIFIED'
  | 'SOURCE_IDENTIFIED'
  | 'DOCUMENT_REVIEWED'
  | 'CROSS_VERIFIED'
  | 'EDITORIAL_APPROVED'
  | 'PUBLISHED';

export interface ModuleCrossLink {
  moduleName: string;
  route: string;
  localRecordId: string;
  relationship: string;
}

export interface CanonicalEntity {
  canonicalId: string;
  entityType: CanonicalEntityType;
  canonicalName: string;
  honorific?: string;
  aliases: string[];
  transliterations?: string[];
  primaryAffiliationOrInstitution?: string;
  region: 'Kashmir Valley' | 'Jammu' | 'Ladakh' | 'Azad Jammu & Kashmir' | 'Gilgit-Baltistan' | 'Multi-Region' | 'National';
  district?: string;
  coordinates?: { lat: number; lng: number };
  verificationStatus: VerificationState;
  evidenceTiers: string[];
  primarySourceCitation?: string;
  connectedEntities?: string[]; // IDs of related canonical entities
  sourceModuleLinks: ModuleCrossLink[];
  biographyOrDescription: string;
  historicalPeriodOrLifespan?: string;
  isHistorical: boolean;
  lastAuditedDate: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZED A–Z DIRECTORY SORTING UTILITY (HONORIFICS-INDEPENDENT)
// ─────────────────────────────────────────────────────────────────────────────

export function getNormalizedSortName(name: string = '', honorific?: string): string {
  let n = name.trim();
  // Strip known leading honorifics / professional / spiritual titles
  n = n.replace(/^(His\s+Holiness|His\s+Highness|Senior\s+Advocate|Advocate|Adv\.|Dr\.|Prof\.\s+Dr\.|Prof\.|Justice|Mirwaiz\s+Moulvi|Mirwaiz|Moulvi|Maulana|Mufti|Shaykh|Sheikh|Pir|Pandit|Venerable|Prince|Mr\.|Ms\.|Mrs\.|Shri|Smt\.|Begum|Shaheed|Late|Engr\.|Hero of Pakistan|Alamdar-e-Kashmir|Achi|Uncle|Ustad|Chaudhary|Master|Hon\.|Hon'ble|IFS)\s+/i, '');
  n = n.replace(/^["'‘“(]+/, '');
  return n.trim();
}

export function isUniversalPinnedEntity(item?: { name?: string; honorific?: string; canonicalId?: string; id?: string } | null): boolean {
  if (!item) return false;
  const id = item.canonicalId || item.id || '';
  if (id === 'kew-hero-003' || id === 'sheikh-noor-ud-din' || id === 'rel-001' || id === 'person-sheikh-noor-ud-din') return true;
  const n = (item.name || '').toLowerCase();
  const h = (item.honorific || '').toLowerCase();
  return (
    n.includes('noor-ud-din') ||
    n.includes('nund rishi') ||
    n.includes('sheikh-ul-alam') ||
    h.includes('nund rishi') ||
    h.includes('alamdar-e-kashmir')
  );
}

export function compareNamesAlphabetically<T extends { name?: string; honorific?: string; id?: string; canonicalId?: string }>(
  a: T,
  b: T,
  order: 'A_Z' | 'Z_A' = 'A_Z'
): number {
  const isA = isUniversalPinnedEntity(a);
  const isB = isUniversalPinnedEntity(b);
  if (isA && !isB) return -1;
  if (!isA && isB) return 1;
  if (isA && isB) return 0;

  const nameA = getNormalizedSortName(a.name || '', a.honorific).toLowerCase();
  const nameB = getNormalizedSortName(b.name || '', b.honorific).toLowerCase();
  const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  return order === 'Z_A' ? -cmp : cmp;
}

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL ENTITY MASTER REGISTRY (SAMPLE ANCHOR REPOSITORIES)
// ─────────────────────────────────────────────────────────────────────────────

export const CANONICAL_ENTITIES: CanonicalEntity[] = [
  // ─── PERSON: SHEIKH NOOR-UD-DIN WALI ───────────────────────────────────────
  {
    canonicalId: 'person-sheikh-noor-ud-din',
    entityType: 'PERSON',
    canonicalName: 'Sheikh Noor-ud-Din Wali (Nund Rishi)',
    honorific: 'Alamdar-e-Kashmir, Sheikh-ul-Alam',
    aliases: ['Nund Rishi', 'Sheikh Noor-ud-Din Noorani', 'Sahazanand'],
    primaryAffiliationOrInstitution: 'Rishi Order of Kashmir / Sufi Ecological Heritage',
    region: 'Kashmir Valley',
    district: 'Budgam',
    coordinates: { lat: 33.918, lng: 74.792 },
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['HISTORICAL_MANUSCRIPT', 'GOVERNMENT_GAZETTE'],
    primarySourceCitation: 'Reshi Nama (Cultural Academy), Tazkira-i-Auliya-i-Kashmir',
    connectedEntities: ['shrine-charar-e-sharief', 'basin-jhelum'],
    sourceModuleLinks: [
      { moduleName: 'Green Heroes', route: '/resources/kew-green-heroes', localRecordId: 'kew-hero-003', relationship: 'Primary Historical Contributor' },
      { moduleName: 'Religious Leaders', route: '/resources/kew-green-heroes?tab=religious-spiritual', localRecordId: 'rel-001', relationship: 'Historical Spiritual Legacy' },
      { moduleName: 'EcoVoices', route: '/environmental-calendar/ecovoices', localRecordId: 'song-ann-poshi', relationship: 'Lyric & Kalam Originator' }
    ],
    biographyOrDescription: '14th-century patron saint, philosopher, and founder of the Kashmiri Rishi tradition. Formulated the universal Himalayan forest conservation aphorism: "Ann poshi teli yeli van poshi" (Food will endure as long as forests endure).',
    historicalPeriodOrLifespan: '1377–1440 CE',
    isHistorical: true,
    lastAuditedDate: '2026-11-22'
  },

  // ─── PERSON: DR. RAJA MUZAFFAR BHAT ────────────────────────────────────────
  {
    canonicalId: 'person-raja-muzaffar-bhat',
    entityType: 'PERSON',
    canonicalName: 'Raja Muzaffar Bhat',
    honorific: 'Dr.',
    aliases: ['Dr. Muzaffar Bhat'],
    primaryAffiliationOrInstitution: 'J&K Climate Action Group / RTI Activist Network',
    region: 'Kashmir Valley',
    district: 'Budgam',
    coordinates: { lat: 34.015, lng: 74.725 },
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['CERTIFIED_DOCUMENT', 'INDEPENDENT_MEDIA', 'JUDICIAL_FILING'],
    primarySourceCitation: 'NGT Principal Bench Order Sheets OA 241/2021 & OA 351/2023',
    connectedEntities: ['river-doodhganga', 'wetland-hokersar', 'case-ngt-241-2021'],
    sourceModuleLinks: [
      { moduleName: 'Green Heroes', route: '/resources/kew-green-heroes', localRecordId: 'kew-hero-001', relationship: 'Primary Environmental Advocate' },
      { moduleName: 'Advocates Directory', route: '/resources/kew-green-heroes?tab=advocates-legal', localRecordId: 'adv-002', relationship: 'Environmental Petitioner' },
      { moduleName: 'Environmental PIL Portal', route: '/resources/environmental-pil', localRecordId: 'pil-001', relationship: 'Lead Petitioner in Doodhganga Case' }
    ],
    biographyOrDescription: 'Physician, renowned RTI activist, and public-interest environmental petitioner whose systematic legal actions before the National Green Tribunal exposed municipal sewage and solid waste dumping into Doodhganga and Mamath streams.',
    historicalPeriodOrLifespan: 'Active',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  },

  // ─── PERSON: ENGR. SONAM WANGCHUK ──────────────────────────────────────────
  {
    canonicalId: 'person-sonam-wangchuk',
    entityType: 'PERSON',
    canonicalName: 'Sonam Wangchuk',
    honorific: 'Engr.',
    aliases: ['Wangchuk Sonam'],
    primaryAffiliationOrInstitution: 'Himalayan Institute of Alternatives Ladakh (HIAL) / SECMOL',
    region: 'Ladakh',
    district: 'Leh',
    coordinates: { lat: 34.152, lng: 77.577 },
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['PEER_REVIEWED', 'CERTIFIED_DOCUMENT'],
    primarySourceCitation: 'Rolex Award for Enterprise (2016), Ramon Magsaysay Award (2018)',
    connectedEntities: ['inst-hial', 'glacier-ice-stupa-network'],
    sourceModuleLinks: [
      { moduleName: 'Green Heroes', route: '/resources/kew-green-heroes', localRecordId: 'kew-hero-002', relationship: 'Environmental Scientist & Innovator' },
      { moduleName: 'Cryosphere Intelligence', route: '/hazard-intelligence/glofs', localRecordId: 'glof-resilience-ladakh', relationship: 'Cryospheric Water Storage Innovator' }
    ],
    biographyOrDescription: 'Mechanical engineer and innovator who engineered "Ice Stupas"—conical artificial glaciers freezing winter streamflow for trans-Himalayan desert farming.',
    historicalPeriodOrLifespan: 'Active',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  },

  // ─── PERSON: PROF. SHAKIL AHMAD ROMSHOO ────────────────────────────────────
  {
    canonicalId: 'person-shakil-romshoo',
    entityType: 'PERSON',
    canonicalName: 'Shakil Ahmad Romshoo',
    honorific: 'Prof. Dr.',
    aliases: ['Prof. Shakil Romshoo', 'S. A. Romshoo'],
    primaryAffiliationOrInstitution: 'Vice Chancellor, IUST / Former Dean Academic Affairs, University of Kashmir',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    coordinates: { lat: 34.128, lng: 74.838 },
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['PEER_REVIEWED', 'GOVERNMENT_GAZETTE'],
    primarySourceCitation: 'Over 200 peer-reviewed articles indexed in Scopus/ORCID (0000-0002-3151-5182)',
    connectedEntities: ['glacier-kolahoi', 'lake-dal', 'lake-wular'],
    sourceModuleLinks: [
      { moduleName: 'Green Heroes', route: '/resources/kew-green-heroes', localRecordId: 'kew-hero-004', relationship: 'Environmental Scientist' },
      { moduleName: 'Scientists Directory', route: '/resources/kew-green-heroes?tab=scientists-conservationists', localRecordId: 'sci-001', relationship: 'Glaciologist & Climate Scientist' }
    ],
    biographyOrDescription: 'Leading Himalayan earth scientist, glaciologist, and hydrologist. Conducted foundational decadal satellite studies on Kolahoi glacier retreat, Indus basin snowpack dynamics, and Jhelum basin flood modeling.',
    historicalPeriodOrLifespan: 'Active',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  },

  // ─── PERSON: ADV. NADEEM QADRI ─────────────────────────────────────────────
  {
    canonicalId: 'person-nadeem-qadri',
    entityType: 'PERSON',
    canonicalName: 'Nadeem Qadri',
    honorific: 'Adv.',
    aliases: ['Advocate Nadeem Qadri'],
    primaryAffiliationOrInstitution: 'High Court of J&K and Ladakh / Centre for Environmental Law',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    coordinates: { lat: 34.083, lng: 74.797 },
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['CERTIFIED_DOCUMENT', 'JUDICIAL_FILING'],
    primarySourceCitation: 'High Court Orders in Wular Lake Conservation PIL & Amicus Curiae Orders',
    connectedEntities: ['lake-wular', 'lake-dal', 'wetland-hokersar'],
    sourceModuleLinks: [
      { moduleName: 'Advocates Directory', route: '/resources/kew-green-heroes?tab=advocates-legal', localRecordId: 'adv-001', relationship: 'Senior Environmental Counsel & Amicus Curiae' }
    ],
    biographyOrDescription: 'Environmental lawyer and amicus curiae before the J&K High Court. Spearheaded legal conservation dockets protecting Wular Lake, Dal Lake, and the high-altitude wetlands of Kashmir.',
    historicalPeriodOrLifespan: 'Active',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  },

  // ─── WATER BODY: DOODHGANGA RIVER ──────────────────────────────────────────
  {
    canonicalId: 'river-doodhganga',
    entityType: 'RIVER',
    canonicalName: 'Doodhganga River',
    aliases: ['Doodh Ganga', 'Chadoora Stream'],
    primaryAffiliationOrInstitution: 'Jhelum River Basin Drainage Network',
    region: 'Kashmir Valley',
    district: 'Budgam',
    coordinates: { lat: 34.015, lng: 74.75 },
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['GOVERNMENT_GAZETTE', 'JUDICIAL_FILING', 'PEER_REVIEWED'],
    primarySourceCitation: 'NGT OA 241/2021 orders and JKPCC Water Quality Telemetry',
    connectedEntities: ['person-raja-muzaffar-bhat', 'case-ngt-241-2021', 'dept-jkpcc'],
    sourceModuleLinks: [
      { moduleName: 'Water Systems', route: '/water-systems/rivers', localRecordId: 'river-doodhganga', relationship: 'Hydrological Profile & Water Quality Station' },
      { moduleName: 'Environmental PIL', route: '/resources/environmental-pil', localRecordId: 'pil-001', relationship: 'Subject of NGT OA 241/2021 Sewage Litigation' }
    ],
    biographyOrDescription: 'Major tributary of the Jhelum originating from the Pir Panjal mountain range. Serves as primary drinking water intake for half a million residents of Srinagar and Budgam.',
    historicalPeriodOrLifespan: 'Perennial River System',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  },

  // ─── ENVIRONMENTAL CASE: NGT OA 241/2021 ───────────────────────────────────
  {
    canonicalId: 'case-ngt-241-2021',
    entityType: 'ENVIRONMENTAL_CASE',
    canonicalName: 'NGT OA 241/2021 (Doodhganga & Mamath Kull Pollution Remediation)',
    aliases: ['Raja Muzaffar Bhat vs. State of J&K and Ors.'],
    primaryAffiliationOrInstitution: 'National Green Tribunal, Principal Bench, New Delhi',
    region: 'Kashmir Valley',
    district: 'Budgam',
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['CERTIFIED_DOCUMENT', 'JUDICIAL_FILING'],
    primarySourceCitation: 'NGT Final Decree dated 08.04.2022 imposing ₹35 Cr environmental penalty',
    connectedEntities: ['person-raja-muzaffar-bhat', 'river-doodhganga', 'dept-jkpcc'],
    sourceModuleLinks: [
      { moduleName: 'Environmental PIL Tracker', route: '/resources/environmental-pil', localRecordId: 'pil-001', relationship: 'Full Judicial Docket & Compliance Audit' },
      { moduleName: 'Green Heroes', route: '/resources/kew-green-heroes', localRecordId: 'kew-hero-001', relationship: 'Documented Landmark Contribution' }
    ],
    biographyOrDescription: 'Pivotal National Green Tribunal decree penalizing Srinagar Municipal Corporation and Municipal Committee Chadoora ₹35 Crore for discharging untreated municipal sewage into Doodhganga.',
    historicalPeriodOrLifespan: 'Filing: 2021 · Order: 2022 · Active Compliance Tracking: 2026',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  },

  // ─── GOVERNMENT DEPARTMENT: JKPCC ──────────────────────────────────────────
  {
    canonicalId: 'dept-jkpcc',
    entityType: 'GOVERNMENT_DEPARTMENT',
    canonicalName: 'Jammu & Kashmir Pollution Control Committee (JKPCC)',
    aliases: ['JKPCC', 'Former J&K State Pollution Control Board (JKSPCB)'],
    primaryAffiliationOrInstitution: 'Department of Forest, Ecology & Environment, Govt of J&K',
    region: 'Kashmir Valley',
    district: 'Srinagar / Jammu',
    verificationStatus: 'EDITORIAL_APPROVED',
    evidenceTiers: ['GOVERNMENT_GAZETTE', 'STATUTORY_NOTIFICATION'],
    primarySourceCitation: 'Jammu & Kashmir Reorganisation Act 2019 & Gazette Notifications',
    connectedEntities: ['river-doodhganga', 'lake-dal', 'case-ngt-241-2021'],
    sourceModuleLinks: [
      { moduleName: 'Environmental Monitoring', route: '/environmental-monitoring/air-pollution', localRecordId: 'monitoring-caaqms', relationship: 'Regulatory Agency for Air & Water Monitoring' }
    ],
    biographyOrDescription: 'Statutory regulatory body overseeing industrial environmental compliance, air emissions, sewage discharge, and water pollution monitoring across Jammu and Kashmir.',
    historicalPeriodOrLifespan: 'Established under Water Act 1974 · Restructured 2019',
    isHistorical: false,
    lastAuditedDate: '2026-11-22'
  }
];

export function getCanonicalEntity(idOrAlias: string): CanonicalEntity | undefined {
  if (!idOrAlias) return undefined;
  const q = idOrAlias.toLowerCase().trim();
  return CANONICAL_ENTITIES.find(
    (e) =>
      e.canonicalId.toLowerCase() === q ||
      e.canonicalName.toLowerCase() === q ||
      e.aliases.some((a) => a.toLowerCase() === q)
  );
}
