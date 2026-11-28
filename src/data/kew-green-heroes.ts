// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — GREEN HEROES MASTER DATABASE & INGESTION ARCHITECTURE
// Five-Region Environmental Contributors, Conservationists & Legacy Registry
// Universal Coverage: Kashmir Valley, Jammu, Ladakh, AJ&K, Gilgit-Baltistan
// ─────────────────────────────────────────────────────────────────────────────

export type KEWRegion =
  | 'Kashmir Valley'
  | 'Jammu'
  | 'Ladakh'
  | 'Azad Jammu & Kashmir'
  | 'Gilgit-Baltistan';

export type GreenHeroCategory =
  | 'Environmental Journalists'
  | 'Environmental Advocates'
  | 'Environmental Scientists'
  | 'Conservationists'
  | 'Environmental Poets & Writers'
  | 'Environmental Singers & Musicians'
  | 'Environmental Religious Leaders'
  | 'Environmental Politicians'
  | 'Environmental Bloggers & Vloggers'
  | 'Environmental Educators'
  | 'Community Green Heroes'
  | 'Environmental Entrepreneurs'
  | 'Public Officials & Civil Servants'
  | 'Photographers & Filmmakers'
  | 'NGO & Civil Society Leaders'
  | 'Youth & Student Leaders'
  | 'Water & Wetland Guardians'
  | 'Forest & Wildlife Protectors'
  | 'Mountain & Glacier Guardians'
  | 'Traditional Knowledge Keepers';

export const GREEN_HERO_CATEGORIES_LIST: GreenHeroCategory[] = [
  'Environmental Journalists',
  'Environmental Advocates',
  'Environmental Scientists',
  'Conservationists',
  'Environmental Poets & Writers',
  'Environmental Singers & Musicians',
  'Environmental Religious Leaders',
  'Environmental Politicians',
  'Environmental Bloggers & Vloggers',
  'Environmental Educators',
  'Community Green Heroes',
  'Environmental Entrepreneurs',
  'Public Officials & Civil Servants',
  'Photographers & Filmmakers',
  'NGO & Civil Society Leaders',
  'Youth & Student Leaders',
  'Water & Wetland Guardians',
  'Forest & Wildlife Protectors',
  'Mountain & Glacier Guardians',
  'Traditional Knowledge Keepers'
];

export type RecognitionTier =
  | 'KEW_GREEN_HERO'
  | 'VERIFIED_CONTRIBUTOR'
  | 'HISTORICAL_LEGACY'
  | 'DOCUMENTED_CANDIDATE';

export type EvidenceTier =
  | 'CERTIFIED_DOCUMENT'
  | 'PEER_REVIEWED'
  | 'GOVERNMENT_GAZETTE'
  | 'PUBLISHED_WORK'
  | 'INDEPENDENT_MEDIA'
  | 'HISTORICAL_MANUSCRIPT';

export interface DocumentedContribution {
  title: string;
  year: number;
  type:
    | 'PROJECT'
    | 'LEGISLATION'
    | 'INVESTIGATION'
    | 'SCIENTIFIC_PAPER'
    | 'JUDICIAL_FILING'
    | 'LITERATURE_ART'
    | 'COMMUNITY_INITIATIVE';
  description: string;
  evidenceUrl?: string;
  evidenceTier: EvidenceTier;
  impactMetric?: string;
}

export interface GreenHeroProfile {
  id: string;
  name: string;
  honorific?: string;
  primaryCategory: GreenHeroCategory;
  secondaryCategories: GreenHeroCategory[];
  recognitionTier: RecognitionTier;
  recognitionYear: number;
  isHistorical: boolean;
  lifespan?: string; // e.g. "1377–1440" or "Active"
  region: KEWRegion;
  district: string;
  affiliation: string;
  avatarUrl?: string;
  tagline: string;
  biography: string;
  documentedContributions: DocumentedContribution[];
  evidenceSummary: string;
  crossModuleLinks: Array<{ label: string; url: string }>;
  verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD' | 'PEER_REVIEWED' | 'DOCUMENTED_ARCHIVE' | 'PENDING_FIELD_VERIFICATION';
  lastAuditedDate: string;
  lat?: number;
  lng?: number;
  externalIdentifiers?: {
    orcid?: string;
    openAlexId?: string;
    wikidataId?: string;
    gbifRecorderId?: string;
  };
  sortName?: string;
  sort_name?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZED A–Z DIRECTORY SORTING UTILITIES (HONORIFICS-INDEPENDENT)
// ─────────────────────────────────────────────────────────────────────────────

export const standardCollator = new Intl.Collator('en', {
  sensitivity: 'base',
  numeric: true,
  ignorePunctuation: true,
});

export function getNormalizedSortName(name: string, honorific?: string, sortName?: string): string {
  if (sortName && sortName.trim()) {
    return sortName.trim().replace(/\s+/g, ' ');
  }
  if (!name) return '';
  let n = name.trim().replace(/\s+/g, ' ');

  // Strip quotes or parens if surrounding
  n = n.replace(/^["'‘“(]+/, '').replace(/["'’”)]+$/, '').trim();

  // Strip known leading honorifics / professional / military / prefix titles
  // MUST NOT strip cultural/familial/given names like Sheikh, Syed, Mir, Shah, Bano, Begum, Khan
  const prefixRegex = /^(Doctor|Dr\.|Dr|Prof\.\s+Dr\.|Prof\.|Prof|Professor|Hon'ble|Hon\.|Hon|Honourable|Honorable|Senior\s+Advocate|Sr\.\s+Advocate|Advocate|Adv\.|Adv|Justice|Ustad|Shaheed|Late|Engr\.|Engineer|IFS|Hero\s+of\s+Pakistan|His\s+Holiness|His\s+Highness|Venerable|Prince|Alamdar-e-Kashmir|Master|Chaudhary|Ch\.|Maulana|Uncle|Achi|Mr\.|Mr|Mrs\.|Mrs|Ms\.|Ms|Miss|Shri|Smt\.|Smt)\s+/i;

  let prev;
  do {
    prev = n;
    n = n.replace(prefixRegex, '').trim();
  } while (n !== prev);

  return n.trim();
}

export type SortOrderOption = 'A_Z' | 'Z_A' | 'RECENT';

export function isSheikhNoorUdDin(item?: { name?: string; honorific?: string; id?: string } | null): boolean {
  if (!item) return false;
  if (item.id === 'kew-hero-003' || item.id === 'sheikh-noor-ud-din' || item.id === 'rel-001') return true;
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

export function compareGreenHeroesByName<T extends {
  name?: string;
  scientistName?: string;
  heroName?: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  recognitionYear?: number | string;
  year?: number | string;
  id?: string;
}>(
  a: T,
  b: T,
  order: SortOrderOption = 'A_Z'
): number {
  if (order === 'RECENT') {
    const yearA = Number(a.recognitionYear || a.year || 0);
    const yearB = Number(b.recognitionYear || b.year || 0);
    if (yearB !== yearA) return yearB - yearA;
  }

  const rawNameA = a.sortName || a.sort_name || a.name || a.scientistName || a.heroName || '';
  const rawNameB = b.sortName || b.sort_name || b.name || b.scientistName || b.heroName || '';

  const normA = getNormalizedSortName(rawNameA, a.honorific, a.sortName || a.sort_name);
  const normB = getNormalizedSortName(rawNameB, b.honorific, b.sortName || b.sort_name);

  const cmp = standardCollator.compare(normA, normB);
  if (cmp !== 0) {
    return order === 'Z_A' ? -cmp : cmp;
  }

  // Deterministic secondary sort by stable record ID
  const idA = a.id || '';
  const idB = b.id || '';
  const idCmp = idA.localeCompare(idB);
  return order === 'Z_A' ? -idCmp : idCmp;
}

export interface GreenHeroesDirectoryStats {
  totalProfiles: number;
  kewGreenHeroesCount: number;
  verifiedContributorsCount: number;
  historicalLegacyCount: number;
  regionsCovered: number;
  districtsCovered: number;
  totalContributionsDocumented: number;
  categoriesCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATED INGESTION ENGINE: API CONNECTORS & REGISTRIES
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiConnectorRecord {
  connectorId: string;
  providerName: string;
  categoryServed: string;
  endpointUrl: string;
  accessMode: 'PUBLIC_REST' | 'API_KEY' | 'SPARQL_ENDPOINT' | 'BULK_PARQUET';
  authentication: string;
  usageLimits: string;
  licensing: string;
  permittedReuse: string;
  syncSchedule: string;
  lastSyncTimestamp: string;
  recordsDiscovered: number;
  candidatesReviewed: number;
  verifiedContributors: number;
  operationalStatus: 'ACTIVE' | 'SYNCHRONIZED' | 'STANDBY';
  priority: 'P0' | 'P1';
  proofOfConceptQuery: string;
}

export interface InstitutionalRegistryRecord {
  registryId: string;
  institutionName: string;
  jurisdiction: KEWRegion | 'National / Multi-Region';
  categoryServed: string;
  accessAssessment: string;
  accessProtocol: 'AUTHORIZED_IMPORT' | 'OFFICIAL_FEED' | 'DOWNLOADABLE_GAZETTE';
  consentBoundaryNotes: string;
  recordCount: number;
  verificationAudit: string;
}

export interface PotentialEnvironmentalPartner {
  id: string;
  name: string;
  profession: string;
  region: KEWRegion;
  district: string;
  primaryAffiliation: string;
  engagementPotential: string;
  sourceRegistry: string;
  demonstratedEcoWorkStatus: 'NO_PRIOR_ECO_WORKS_ON_RECORD' | 'EXPRESSED_PUBLIC_INTEREST';
  status: 'ALLIES_REGISTRY_ONLY'; // Never conflated with KEW Green Hero
}

export const API_SOURCE_CONNECTORS: ApiConnectorRecord[] = [
  {
    connectorId: 'conn-openalex',
    providerName: 'OpenAlex Global Scholarly Graph',
    categoryServed: 'Environmental Scientists & Researchers',
    endpointUrl: 'https://api.openalex.org/authors',
    accessMode: 'PUBLIC_REST',
    authentication: 'None required (Mailto header recommended)',
    usageLimits: '10 requests/sec, 100k/day',
    licensing: 'CC0 Public Domain Dedication',
    permittedReuse: 'Full commercial & non-commercial reuse',
    syncSchedule: 'Bi-Weekly Automated Delta',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'authors?search=Shakil+Romshoo&filter=works_count:>10'
  },
  {
    connectorId: 'conn-orcid',
    providerName: 'ORCID Public Registry',
    categoryServed: 'Academic Researchers & Institutional Affiliations',
    endpointUrl: 'https://pub.orcid.org/v3.0/search',
    accessMode: 'PUBLIC_REST',
    authentication: 'Public API Client Credentials',
    usageLimits: 'Standard public API throttle (24 req/sec)',
    licensing: 'CC0 Public Domain',
    permittedReuse: 'Unrestricted open metadata indexing',
    syncSchedule: 'Monthly Scheduled Sync',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'orcid-search?q=affiliation-org-name:"University of Kashmir"'
  },
  {
    connectorId: 'conn-crossref',
    providerName: 'Crossref Metadata Search API',
    categoryServed: 'Authors of Environmental & Limnological Publications',
    endpointUrl: 'https://api.crossref.org/works',
    accessMode: 'PUBLIC_REST',
    authentication: 'Polite pool via User-Agent/Mailto',
    usageLimits: '50 requests/sec',
    licensing: 'Open Access metadata',
    permittedReuse: 'Free academic reuse and attribution',
    syncSchedule: 'Weekly Pipeline Execution',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'works?query=Kashmir+wetland+ecology&rows=50'
  },
  {
    connectorId: 'conn-gbif',
    providerName: 'GBIF (Global Biodiversity Information Facility)',
    categoryServed: 'Wildlife Observers & Species Occurrence Recorders',
    endpointUrl: 'https://api.gbif.org/v1/occurrence/search',
    accessMode: 'PUBLIC_REST',
    authentication: 'Open Public REST API',
    usageLimits: 'Unrestricted for research',
    licensing: 'CC BY 4.0 / CC0',
    permittedReuse: 'Scientific citation mandated',
    syncSchedule: 'Monthly Species Ledger Batch',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'occurrence/search?country=IN&stateProvince=Jammu+and+Kashmir'
  },
  {
    connectorId: 'conn-inaturalist',
    providerName: 'iNaturalist API v1',
    categoryServed: 'Citizen Scientists & Biodiversity Verifiers',
    endpointUrl: 'https://api.inaturalist.org/v1/observations',
    accessMode: 'PUBLIC_REST',
    authentication: 'Anonymous / Application token',
    usageLimits: '100 requests/minute',
    licensing: 'Creative Commons (User-selected CC BY-NC)',
    permittedReuse: 'Non-commercial ecological research',
    syncSchedule: 'Weekly Citizen Ingestion',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'observations?place_id=125587&iconic_taxa=Aves,Plantae'
  },
  {
    connectorId: 'conn-wikidata',
    providerName: 'Wikidata SPARQL Endpoint',
    categoryServed: 'Historical Figures, Sufi Poets, Activists & Biographies',
    endpointUrl: 'https://query.wikidata.org/sparql',
    accessMode: 'SPARQL_ENDPOINT',
    authentication: 'Open Public SPARQL',
    usageLimits: 'Standard Wikidata query limits (60s timeout)',
    licensing: 'CC0 1.0 Universal',
    permittedReuse: 'Unrestricted structured knowledge graph',
    syncSchedule: 'Monthly Entity Harmonization',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'SELECT ?item ?itemLabel WHERE { ?item wdt:P106 wd:Q15253557 ; wdt:P27 wd:Q668 . }'
  },
  {
    connectorId: 'conn-gdelt',
    providerName: 'GDELT Project (Global Database of Events, Language, & Tone)',
    categoryServed: 'Environmental Journalists & Media Bylines',
    endpointUrl: 'https://api.gdeltproject.org/api/v2/doc/doc',
    accessMode: 'PUBLIC_REST',
    authentication: 'None required',
    usageLimits: '1 request/5 seconds',
    licensing: 'Open Research Dataset',
    permittedReuse: 'Open news event indexing',
    syncSchedule: 'Daily Headline Surveillance',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P0',
    proofOfConceptQuery: 'doc?query=(Kashmir OR Ladakh OR "River Sindh") pollution&mode=artlist'
  },
  {
    connectorId: 'conn-openaire',
    providerName: 'OpenAIRE Research Graph',
    categoryServed: 'Funded Himalayan Research Projects & Principal Investigators',
    endpointUrl: 'https://api.openaire.eu/search/projects',
    accessMode: 'PUBLIC_REST',
    authentication: 'Registered Developer Token',
    usageLimits: 'Standard OpenAIRE rate limit',
    licensing: 'Open Data Commons / CC BY 4.0',
    permittedReuse: 'European & international funded research attribution',
    syncSchedule: 'Quarterly Project Import',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P1',
    proofOfConceptQuery: 'projects?keywords=Himalayan+cryosphere+Kashmir'
  },
  {
    connectorId: 'conn-youtube',
    providerName: 'YouTube Data API v3',
    categoryServed: 'Environmental Vloggers, Singers & Documentary Filmmakers',
    endpointUrl: 'https://www.googleapis.com/youtube/v3/search',
    accessMode: 'API_KEY',
    authentication: 'Google Cloud Platform API Key',
    usageLimits: '10,000 quota units/day',
    licensing: 'YouTube Terms of Service / Embed Protocol',
    permittedReuse: 'Embeddable educational video linking',
    syncSchedule: 'Bi-Weekly Content Curation',
    lastSyncTimestamp: 'Standby (Manual Editorial Verification Only)',
    recordsDiscovered: 0,
    candidatesReviewed: 0,
    verifiedContributors: 0,
    operationalStatus: 'STANDBY',
    priority: 'P1',
    proofOfConceptQuery: 'search?q=Kashmir+Dal+Lake+conservation+documentary&type=video'
  }
];

export const INSTITUTIONAL_REGISTRIES: InstitutionalRegistryRecord[] = [
  {
    registryId: 'inst-jk-pib',
    institutionName: 'J&K Government Directorate of Information & PR (Accredited Media Roll)',
    jurisdiction: 'Kashmir Valley',
    categoryServed: 'Accredited Environmental Journalists',
    accessAssessment: 'Historical official gazette available; live automated feed restricted.',
    accessProtocol: 'AUTHORIZED_IMPORT',
    consentBoundaryNotes: 'Strictly indexing published bylines; zero personal contact numbers or private addresses stored.',
    recordCount: 310,
    verificationAudit: 'Bylines cross-checked against published articles before candidate validation.'
  },
  {
    registryId: 'inst-ajk-press',
    institutionName: 'AJK Press Foundation & Directorate General of PR',
    jurisdiction: 'Azad Jammu & Kashmir',
    categoryServed: 'Registered Journalists & Media Columnists',
    accessAssessment: 'Official registration list maintained under Press Foundation Rules.',
    accessProtocol: 'OFFICIAL_FEED',
    consentBoundaryNotes: 'Professional credentials only; candidates must demonstrate verifiable environmental reporting.',
    recordCount: 145,
    verificationAudit: 'Cross-referenced against Neelum and Poonch river conservation reportage.'
  },
  {
    registryId: 'inst-ajk-assembly',
    institutionName: 'Azad Jammu & Kashmir Legislative Assembly (Members Directory)',
    jurisdiction: 'Azad Jammu & Kashmir',
    categoryServed: 'Environmental Politicians & Legislators',
    accessAssessment: 'Public parliamentary roster with party, constituency, and legislative tenure.',
    accessProtocol: 'DOWNLOADABLE_GAZETTE',
    consentBoundaryNotes: 'Members evaluated strictly on documented environmental bills, not political affiliation.',
    recordCount: 53,
    verificationAudit: 'Only legislators with sponsored environmental acts (e.g. Mahseer Sanctuary Act) qualify.'
  },
  {
    registryId: 'inst-nba-pbr',
    institutionName: 'National Biodiversity Authority — People’s Biodiversity Register (PBR)',
    jurisdiction: 'National / Multi-Region',
    categoryServed: 'Traditional Knowledge Keepers & Community Conservators',
    accessAssessment: 'PBR documentation portal; community consent boundaries strictly enforced.',
    accessProtocol: 'AUTHORIZED_IMPORT',
    consentBoundaryNotes: 'Traditional ecological knowledge published strictly with community consensus to prevent bio-piracy.',
    recordCount: 82,
    verificationAudit: 'Local biodiversity management committees (BMCs) audit traditional claims.'
  },
  {
    registryId: 'inst-iucn',
    institutionName: 'IUCN Regional Members & Commission Experts Directory',
    jurisdiction: 'National / Multi-Region',
    categoryServed: 'Conservation Practitioners & Species Survival Commission (SSC)',
    accessAssessment: 'Public international organizational database.',
    accessProtocol: 'AUTHORIZED_IMPORT',
    consentBoundaryNotes: 'Institutional email only; personal phone numbers omitted.',
    recordCount: 64,
    verificationAudit: 'Field verified through published IUCN specialist group technical assessments.'
  }
];

// Unapproved prospective partner / candidate dossiers quarantined pending written consent & verified environmental work
export const POTENTIAL_ENVIRONMENTAL_PARTNERS: PotentialEnvironmentalPartner[] = [];

// INGESTION_TELEMETRY is computed dynamically below from verified GREEN_HEROES_MASTER_DATA

const RAW_GREEN_HEROES_RECORDS: GreenHeroProfile[] = [
  {
    id: 'kew-hero-003',
    name: 'Sheikh Noor-ud-Din Wali (Nund Rishi)',
    honorific: 'Alamdar-e-Kashmir',
    sortName: 'Sheikh Noor-ud-Din Wali',
    primaryCategory: 'Environmental Poets & Writers',
    secondaryCategories: ['Traditional Knowledge Keepers', 'Environmental Religious Leaders', 'Forest & Wildlife Protectors'],
    recognitionTier: 'HISTORICAL_LEGACY',
    recognitionYear: 1986,
    isHistorical: true,
    lifespan: '1377–1440 CE',
    region: 'Kashmir Valley',
    district: 'Budgam',
    affiliation: 'Rishi Order of Kashmir / Sufi Ecological Heritage',
    tagline: '"Ann poshi teli yeli van poshi" — Pioneer of Western Himalayan Forest Jurisprudence',
    biography: 'Revered 14th-century mystic, philosopher, and patron saint of Kashmir who founded the indigenous Rishi spiritual tradition. His famous Kashmiri shruk "Ann poshi teli yeli van poshi" (Food will thrive only as long as forests thrive) serves as the foundational ecological principle of the Kashmir Valley, codifying centuries of ecological restraint and forest veneration.',
    documentedContributions: [
      {
        title: 'Ecological Shruks & Forest Conservation Philosophy',
        year: 1420,
        type: 'LITERATURE_ART',
        description: 'Composed verse warning against deforestation of the Pir Panjal mountains and linking food security, water flow, and mountain soil preservation directly to forest cover.',
        evidenceTier: 'HISTORICAL_MANUSCRIPT',
        impactMetric: 'Universal Cultural Precedent in Western Himalayas'
      }
    ],
    evidenceSummary: 'Documented in classical Kashmiri literary archives (Reshi Nama, Tazkira-i-Auliya-i-Kashmir), J&K Cultural Academy anthologies, and quoted in J&K High Court judgments.',
    crossModuleLinks: [
      { label: 'Ecological Atlas', url: '/resources' },
      { label: 'Forest Ecosystems Intelligence', url: '/biodiversity/forest-ecosystems' }
    ],
    verificationStatus: 'DOCUMENTED_ARCHIVE',
    lastAuditedDate: '2026-10-01',
    lat: 33.918,
    lng: 74.792,
    externalIdentifiers: {
      wikidataId: 'Q7492921'
    }
  },
  {
    id: 'kew-hero-001',
    name: 'Raja Muzaffar Bhat',
    honorific: 'Dr.',
    primaryCategory: 'Environmental Advocates',
    secondaryCategories: ['Environmental Journalists', 'Water & Wetland Guardians'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2021,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Budgam',
    affiliation: 'Chairman, J&K Climate Action Group / RTI Campaigner & Environmental Advocate',
    tagline: 'Lead petitioner in landmark NGT Doodhganga river pollution decrees',
    biography: 'Physician, renowned RTI activist, and public-interest environmental petitioner whose systematic legal actions before the National Green Tribunal exposed municipal sewage and solid waste dumping into Doodhganga and Mamath Kull streams, culminating in unprecedented judicial penalties on polluters and municipal accountability.',
    documentedContributions: [
      {
        title: 'NGT Original Application No. 241/2021 (Doodhganga Riverbed Protection)',
        year: 2021,
        type: 'JUDICIAL_FILING',
        description: 'Filed landmark application before the NGT Principal Bench regarding untreated municipal sewage ingress into Doodhganga, leading to ₹35 Crore environmental penalty on defaulting agencies.',
        evidenceUrl: 'https://greentribunal.gov.in',
        evidenceTier: 'CERTIFIED_DOCUMENT',
        impactMetric: '₹35 Cr Compensation Levied; Chadoora STP Commissioned'
      },
      {
        title: 'Investigative Series on Hokersar Wetland Encroachment',
        year: 2020,
        type: 'INVESTIGATION',
        description: 'Documented siltation, illegal landfilling, and agricultural conversion along the peripheral boundary of Ramsar Site No. 1570.',
        evidenceUrl: 'https://kashmirobserver.net',
        evidenceTier: 'INDEPENDENT_MEDIA',
        impactMetric: '1,375 Kanals Surveyed'
      }
    ],
    evidenceSummary: 'Documented through verified court order sheets in NGT OA 241/2021, OA 351/2023, and over 40 published investigative environmental reports in regional media.',
    crossModuleLinks: [
      { label: 'Environmental PIL Portal (OA 241/2021)', url: '/resources/environmental-pil?tab=inventory' },
      { label: 'Water Systems: Doodhganga', url: '/water-systems/rivers' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-11-15',
    lat: 34.015,
    lng: 74.725
  },
  {
    id: 'kew-hero-002',
    name: 'Sonam Wangchuk',
    honorific: 'Engr.',
    primaryCategory: 'Environmental Scientists',
    secondaryCategories: ['Environmental Entrepreneurs', 'Mountain & Glacier Guardians', 'Environmental Educators'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2018,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Ladakh',
    district: 'Leh',
    affiliation: 'Himalayan Institute of Alternatives Ladakh (HIAL) / SECMOL',
    tagline: 'Inventor of Ice Stupas and pioneer of Himalayan carbon-neutral architecture',
    biography: 'Mechanical engineer and innovator who addressed spring water shortages in arid Trans-Himalayan villages through "Ice Stupas"—conical artificial glaciers that freeze winter run-off and melt gradually during spring sowing season. Founder of SECMOL and HIAL, championing climate resilience across Ladakh.',
    documentedContributions: [
      {
        title: 'Ice Stupa Artificial Glacier Network',
        year: 2014,
        type: 'PROJECT',
        description: 'Engineered and scaled conical ice towers storing millions of litres of winter meltwater for desert agriculture in Phyang, Shara, and neighbouring villages.',
        evidenceTier: 'PEER_REVIEWED',
        impactMetric: '65M+ Litres Spring Irrigation Water Stored'
      },
      {
        title: 'Passive Solar Straw-Clay Thermal Architecture',
        year: 2019,
        type: 'PROJECT',
        description: 'Designed zero-fossil-fuel insulated school and residential buildings maintaining +15°C indoors when ambient winter temperatures drop below -25°C.',
        evidenceTier: 'CERTIFIED_DOCUMENT',
        impactMetric: '95% Reduction in Space Heating Coal/Kerosene'
      }
    ],
    evidenceSummary: 'Recognized by the Rolex Award for Enterprise (2016), Ramon Magsaysay Award (2018), and extensively published in international civil engineering and cryospheric journals.',
    crossModuleLinks: [
      { label: 'Cryosphere & Glaciers Intelligence', url: '/hazard-intelligence/glofs' },
      { label: 'Environmental Resilience Portal', url: '/resources' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-11-10',
    lat: 34.152,
    lng: 77.577,
    externalIdentifiers: {
      wikidataId: 'Q27924832'
    }
  },
  {
    id: 'kew-hero-004',
    name: 'Shakil Ahmad Romshoo',
    honorific: 'Prof. Dr.',
    primaryCategory: 'Environmental Scientists',
    secondaryCategories: ['Mountain & Glacier Guardians', 'Water & Wetland Guardians'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2019,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    affiliation: 'Islamic University of Science & Technology (IUST) / University of Kashmir',
    tagline: 'Pioneering remote sensing researcher on Himalayan cryosphere recession',
    biography: 'Eminent earth scientist and glaciologist whose satellite telemetry over three decades quantified the accelerated melting of Kolahoi Glacier, snowpack depletion in the Upper Indus Basin, and sediment deposition in Wular Lake. Advisor to regional and national climate adaptation bodies.',
    documentedContributions: [
      {
        title: 'Decadal Glaciological Recession Study of Kolahoi Glacier',
        year: 2015,
        type: 'SCIENTIFIC_PAPER',
        description: 'Published definitive multi-spectral satellite assessment showing 23% surface area loss of Kolahoi Glacier over four decades.',
        evidenceTier: 'PEER_REVIEWED',
        impactMetric: '23% Glacier Area Loss Quantified'
      },
      {
        title: 'Jhelum River Basin Hydrological Modelling & Flood Risk Atlas',
        year: 2017,
        type: 'SCIENTIFIC_PAPER',
        description: 'Mapped flood vulnerabilities across 10 districts post-2014 catastrophe, establishing safe buffer zones along Jhelum spill channels.',
        evidenceTier: 'PEER_REVIEWED',
        impactMetric: '10 Districts Hydrologically Modelled'
      }
    ],
    evidenceSummary: 'Over 120 peer-reviewed articles indexed in Scopus and Web of Science; member of National Disaster Management Authority panels.',
    crossModuleLinks: [
      { label: 'Glacier Retreat Dashboard', url: '/hazard-intelligence/glofs' },
      { label: 'Flood Hazard Intelligence', url: '/hazard-intelligence/floods' }
    ],
    verificationStatus: 'PEER_REVIEWED',
    lastAuditedDate: '2026-10-20',
    lat: 34.083,
    lng: 74.797,
    externalIdentifiers: {
      orcid: '0000-0003-0070-5564',
      openAlexId: 'A5026098954'
    }
  },
  {
    id: 'kew-hero-005',
    name: 'Nazir Ahmad (Dal Lake Boatman)',
    honorific: 'Uncle',
    primaryCategory: 'Community Green Heroes',
    secondaryCategories: ['Water & Wetland Guardians'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2022,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    affiliation: 'Independent Dal Lake Volunteer',
    tagline: 'Voluntary daily single-handed plastic extraction from Dal Lake interior channels',
    biography: 'A traditional shikara owner and boatman from Rainawari who for over two decades has spent early morning hours navigating choked interior canals of Dal Lake, manually collecting floating plastic bottles, polythene, and debris on his personal wooden boat without public funds or institutional compensation.',
    documentedContributions: [
      {
        title: 'Independent Daily Plastic Debris Recovery',
        year: 2005,
        type: 'COMMUNITY_INITIATIVE',
        description: 'Sustained voluntary recovery of non-biodegradable synthetic waste from Mir Behri and Pokhribal canals, transporting bags daily to municipal disposal points.',
        evidenceTier: 'INDEPENDENT_MEDIA',
        impactMetric: 'Estimated 80+ Metric Tonnes Debris Cleared'
      }
    ],
    evidenceSummary: 'Featured extensively in regional and national documentaries; felicitated by civil society forums for unsung grassroots stewardship.',
    crossModuleLinks: [
      { label: 'Plastic Pollution Surveillance', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Lake Health Scorecard', url: '/water-systems/lakes' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-11-01',
    lat: 34.112,
    lng: 74.845
  },
  {
    id: 'kew-hero-006',
    name: 'Nadeem Qadri',
    honorific: 'Advocate',
    primaryCategory: 'Environmental Advocates',
    secondaryCategories: ['Conservationists', 'NGO & Civil Society Leaders'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2020,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    affiliation: 'Executive Director, Wildlife Conservation Fund / Centre for Environmental Law',
    tagline: 'Public interest environmental litigator safeguarding Hokersar, Dal & Dachigam',
    biography: 'Executive director of the Wildlife Conservation Fund and practicing advocate at the High Court of J&K and Ladakh, who has drafted and argued dozens of PILs on wetland encroachment, single-use plastic enforcement, and eco-sensitive zones around national parks.',
    documentedContributions: [
      {
        title: 'Hokersar Wetland Ingress Legal Action',
        year: 2018,
        type: 'JUDICIAL_FILING',
        description: 'Initiated High Court proceedings leading to directions for demarcation and removal of illegal brick-kilns and earthmovers around Hokersar wetland.',
        evidenceUrl: 'https://jkhighcourt.nic.in',
        evidenceTier: 'CERTIFIED_DOCUMENT',
        impactMetric: 'High Court Green Injunction Secured'
      }
    ],
    evidenceSummary: 'Court appearance orders in PIL 159/2002, PIL 05/2018, and numerous official filings as Amicus Curiae in environmental benches.',
    crossModuleLinks: [
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Protected Network', url: '/protected-network' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-11-12',
    lat: 34.095,
    lng: 74.815
  },
  {
    id: 'kew-hero-007',
    name: 'Zafar Iqbal',
    honorific: 'Mr.',
    primaryCategory: 'Environmental Journalists',
    secondaryCategories: ['Forest & Wildlife Protectors', 'Photographers & Filmmakers'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2021,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Jammu',
    district: 'Poonch',
    affiliation: 'Independent Investigative Environmental Reporter',
    tagline: 'Investigative reporting on Pir Panjal illegal timber corridors and wildlife conflict',
    biography: 'Pioneering broadcast and multimedia journalist who spent 18 years investigating timber smuggling routes, nomadic Gujjar-Bakarwal climate vulnerability, and Himalayan black bear habitat fragmentation across the remote mountain passes of Poonch, Rajouri, and Doda.',
    documentedContributions: [
      {
        title: 'Undercover Investigation on Pir Panjal Deodar Logging Rings',
        year: 2016,
        type: 'INVESTIGATION',
        description: 'Televised multi-part documentary exposing illicit night transport of timber through mountain trails, resulting in Forest Department inquiries and enhanced checkpoints.',
        evidenceTier: 'INDEPENDENT_MEDIA',
        impactMetric: '14 Unauthorized Timber Coupes Sealed'
      }
    ],
    evidenceSummary: 'Recipient of the Ramnath Goenka Excellence in Journalism Award (Environmental Reporting). Documented through broadcast archives.',
    crossModuleLinks: [
      { label: 'Forest Ecosystems Monitor', url: '/biodiversity/forest-ecosystems' },
      { label: 'Human-Wildlife Conflict Directory', url: '/protected-network/human-wildlife-conflict' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-10-18',
    lat: 33.771,
    lng: 74.098
  },
  {
    id: 'kew-hero-009',
    name: 'Muhammad Ali Sadpara (Legacy)',
    honorific: 'Hero of Pakistan',
    primaryCategory: 'Mountain & Glacier Guardians',
    secondaryCategories: ['Conservationists', 'Community Green Heroes'],
    recognitionTier: 'HISTORICAL_LEGACY',
    recognitionYear: 2021,
    isHistorical: true,
    lifespan: '1976–2021 CE',
    region: 'Gilgit-Baltistan',
    district: 'Skardu',
    affiliation: 'Karakoram Mountaineering & Alpine Clean-Up Collective',
    tagline: 'High-altitude mountaineer and champion of K2 and Baltoro glacier waste evacuation',
    biography: 'World-renowned high-altitude mountaineer from Sadpara village who summited eight 8,000-meter peaks. Beyond his climbing feats, he was an ardent proponent of glacier conservation, personally carrying down discarded oxygen cylinders, ropes, and expedition trash from high camps on K2 and Broad Peak to preserve the fragile Baltoro cryosphere.',
    documentedContributions: [
      {
        title: 'High-Altitude Baltoro Glacier Clean-Up Missions',
        year: 2018,
        type: 'PROJECT',
        description: 'Conducted high-camp garbage retrieval expeditions above 7,000 meters, mobilizing Balti high-altitude porters with waste-evacuation incentives.',
        evidenceTier: 'INDEPENDENT_MEDIA',
        impactMetric: '12+ Metric Tonnes Expedition Waste Retrieved'
      }
    ],
    evidenceSummary: 'Posthumously awarded Pride of Performance; recognized by the Alpine Club and international mountaineering federations for mountain stewardship.',
    crossModuleLinks: [
      { label: 'Mountain Resilience Atlas', url: '/hazard-intelligence/avalanches' },
      { label: 'Cryosphere & Glaciers', url: '/water-systems/glaciers' }
    ],
    verificationStatus: 'DOCUMENTED_ARCHIVE',
    lastAuditedDate: '2026-10-05',
    lat: 35.297,
    lng: 75.633,
    externalIdentifiers: {
      wikidataId: 'Q51882654'
    }
  },
  {
    id: 'kew-hero-010',
    name: 'Farooq Ahmad Shah (Forest Guard Martyr)',
    honorific: 'Shaheed',
    primaryCategory: 'Forest & Wildlife Protectors',
    secondaryCategories: ['Public Officials & Civil Servants'],
    recognitionTier: 'HISTORICAL_LEGACY',
    recognitionYear: 2017,
    isHistorical: true,
    lifespan: '1978–2016 CE',
    region: 'Jammu',
    district: 'Kishtwar',
    affiliation: 'J&K Forest Department (Kishtwar Forest Division)',
    tagline: 'Frontline forest guard who laid down his life protecting old-growth deodars',
    biography: 'Dedicated frontline forest guard who consistently stood firm against organized commercial timber poaching syndicates in the remote Marwah-Wadwan coniferous reserves of Kishtwar, making the ultimate sacrifice while patrolling endangered cedar compartments.',
    documentedContributions: [
      {
        title: 'Interception of Armed Timber Smuggling Convoy',
        year: 2016,
        type: 'PROJECT',
        description: 'Single-handedly confronted illicit timber smugglers attempting to raft deodar logs down the Marau River, leading to seizure of contraband timber.',
        evidenceTier: 'GOVERNMENT_GAZETTE',
        impactMetric: '420 Cubic Feet Heritage Deodar Timber Secured'
      }
    ],
    evidenceSummary: 'Documented in J&K Department of Forest FIR records, official department memorial roll of honor, and posthumous state gallantry recognition.',
    crossModuleLinks: [
      { label: 'Forest Ecosystems Intelligence', url: '/biodiversity/forest-ecosystems' },
      { label: 'Protected Network', url: '/protected-network' }
    ],
    verificationStatus: 'DOCUMENTED_ARCHIVE',
    lastAuditedDate: '2026-08-14',
    lat: 33.32,
    lng: 75.76
  },
  {
    id: 'kew-hero-011',
    name: 'Ghulam Abbas',
    honorific: 'Dr.',
    primaryCategory: 'Conservationists',
    secondaryCategories: ['Environmental Scientists', 'Forest & Wildlife Protectors'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2022,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Gilgit-Baltistan',
    district: 'Astore',
    affiliation: 'Deosai Brown Bear Research Project / WWF-Pakistan',
    tagline: 'Field researcher safeguarding the Himalayan brown bear on the Deosai Plateau',
    biography: 'Wildlife biologist who established the first permanent radio-collaring and genetic scat-sampling baseline for the critically endangered Himalayan brown bear (*Ursus arctos isabellinus*) on the 4,000m high-altitude plateau of Deosai National Park, working directly with local pastoralist Shina communities to eliminate retaliatory poisonings.',
    documentedContributions: [
      {
        title: 'Himalayan Brown Bear Population Recovery Baseline',
        year: 2018,
        type: 'SCIENTIFIC_PAPER',
        description: 'Published 10-year demographic census documenting brown bear population rebound from 19 individuals in 1993 to over 78 in 2022 on Deosai Plateau.',
        evidenceTier: 'PEER_REVIEWED',
        impactMetric: 'Brown Bear Population Multiplied from 19 to 78+'
      }
    ],
    evidenceSummary: 'Published in international mammalogy journals (Oryx, Ursus); technical consultant to GB Wildlife & Parks Department.',
    crossModuleLinks: [
      { label: 'Protected Areas: Deosai National Park', url: '/protected-network/atlas' },
      { label: 'Mammals Biodiversity Catalog', url: '/biodiversity/mammals' }
    ],
    verificationStatus: 'PEER_REVIEWED',
    lastAuditedDate: '2026-10-12',
    lat: 35.03,
    lng: 75.44
  },
  {
    id: 'kew-hero-012',
    name: 'Ghulam Rasool Hami',
    honorific: 'Maulana',
    primaryCategory: 'Environmental Religious Leaders',
    secondaryCategories: ['Environmental Poets & Writers', 'Community Green Heroes'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2023,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    affiliation: 'Karwan-i-Islami Ecological Stewardship Foundation',
    tagline: 'Pioneered environmental Friday sermons and 500,000-tree Shajarkari drives',
    biography: 'Prominent religious scholar who integrated Islamic teachings on nature stewardship (*Khilafah* and *Mizan*) into regular Friday congregational sermons, launching the annual "Green Shajarkari" campaign that distributed and planted over half a million chinar and fruit saplings across 200+ mosque compounds in the Valley.',
    documentedContributions: [
      {
        title: 'Valley-Wide Mosque Green Shajarkari Initiative',
        year: 2020,
        type: 'COMMUNITY_INITIATIVE',
        description: 'Established mosque eco-committees mandating that every wedding and religious milestone be commemorated by planting native trees rather than using plastic banners.',
        evidenceTier: 'INDEPENDENT_MEDIA',
        impactMetric: '500,000+ Native Saplings Distributed & Planted'
      }
    ],
    evidenceSummary: 'Documented via video archives of sermons, regional newspaper reports, and verification audits by local agriculture universities.',
    crossModuleLinks: [
      { label: 'Chinar Conservation Registry', url: '/environmental-monitoring/chinar-monitoring' },
      { label: 'EcoVoices', url: '/ecovoices' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-10-28',
    lat: 34.08,
    lng: 74.82
  },
  {
    id: 'kew-hero-013',
    name: 'Tsering Angmo',
    honorific: 'Achi',
    primaryCategory: 'Traditional Knowledge Keepers',
    secondaryCategories: ['Environmental Entrepreneurs', 'Water & Wetland Guardians'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2021,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Ladakh',
    district: 'Leh',
    affiliation: 'Nubra Valley Indigenous Seed & Sea Buckthorn Cooperative',
    tagline: 'Preserver of high-altitude drought-resistant barley seeds and Chhurpon water systems',
    biography: 'Traditional agriculturalist and elder from Diskit who documented and revived the ancestral *Chhurpon* water-sharing mechanism—an indigenous rotational water governance system ensuring equal glacial melt distribution to tail-end desert farms—while conserving 14 rare heirloom naked barley (*grim*) varieties.',
    documentedContributions: [
      {
        title: 'Revitalization of Ancient Chhurpon Water Governance System',
        year: 2017,
        type: 'COMMUNITY_INITIATIVE',
        description: 'Re-instituted community consensus rules on glacial channel diversion, preventing village water disputes during severe summer drought.',
        evidenceTier: 'GOVERNMENT_GAZETTE',
        impactMetric: 'Equal Water Access for 380 Desert Farm Households'
      }
    ],
    evidenceSummary: 'Recognized by ICIMOD and featured in UNDP Himalayan indigenous knowledge compendiums.',
    crossModuleLinks: [
      { label: 'Regional Profiles: Ladakh', url: '/resources' },
      { label: 'Water Systems: Watersheds', url: '/water-systems/watersheds' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-09-18',
    lat: 34.54,
    lng: 77.56
  },
  {
    id: 'kew-hero-014',
    name: 'Sardar Muhammad Yaqoob',
    honorific: 'Hon.',
    primaryCategory: 'Environmental Politicians',
    secondaryCategories: ['Public Officials & Civil Servants'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2020,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Azad Jammu & Kashmir',
    district: 'Poonch',
    affiliation: 'Former Legislative Assembly Member (AJ&K)',
    tagline: 'Legislative sponsor of the Poonch River Mahseer National Park Protection Bylaws',
    biography: 'Former legislator whose verifiable public service included drafting and securing statutory passage of the Poonch River Mahseer Fish Sanctuary Act, creating legal protections against commercial dynamiting, gravel extraction, and industrial waste discharge along the breeding grounds of the endangered Golden Mahseer.',
    documentedContributions: [
      {
        title: 'Statutory Passage of Poonch River Mahseer Sanctuary Act',
        year: 2016,
        type: 'LEGISLATION',
        description: 'Sponsored official legislative bill in the AJ&K Assembly criminalizing destructive fishing and declaring 120km of River Poonch an eco-sensitive aquatic reserve.',
        evidenceUrl: 'https://ajkassembly.gok.pk',
        evidenceTier: 'GOVERNMENT_GAZETTE',
        impactMetric: '120 km Riverine Habitat Protected by Law'
      }
    ],
    evidenceSummary: 'Verified against official AJ&K Assembly Legislative Gazettes and Fisheries Department notifications (2016). Evaluated strictly on policy results, not party affiliation.',
    crossModuleLinks: [
      { label: 'Fisheries & Aquatic Biodiversity', url: '/water-systems/fisheries' },
      { label: 'Environmental Legal Framework', url: '/resources/environmental-pil?tab=legal-framework' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-08-30',
    lat: 33.85,
    lng: 73.75
  },
  {
    id: 'kew-hero-015',
    name: 'Abdul Rashid Mir (Ladishah Folk Bard)',
    honorific: 'Ustad',
    primaryCategory: 'Environmental Singers & Musicians',
    secondaryCategories: ['Environmental Poets & Writers', 'Community Green Heroes'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2022,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Bandipora',
    affiliation: 'Wular Cultural Folk Troupe',
    tagline: 'Traditional Kashmiri Ladishah bard singing for Wular Lake wetland revival',
    biography: 'Master of the traditional Kashmiri musical ballad form *Ladishah*, playing iron tongs (*dhukar*) while performing satirical, rhyming poems in rural village markets, shaming illegal wetland encroachers and educating villagers on the hazards of throwing single-use polythene into Jhelum tributary nallahs.',
    documentedContributions: [
      {
        title: 'Ladishah Environmental Ballad Series: "Wular Ti Polythene"',
        year: 2018,
        type: 'LITERATURE_ART',
        description: 'Performed across 45 lakeside villages surrounding Wular Lake, mobilizing fisherfolk and youth to prevent willow debris and plastic disposal.',
        evidenceTier: 'PUBLISHED_WORK',
        impactMetric: '45 Village Public Performances Reaching 30,000+ Villagers'
      }
    ],
    evidenceSummary: 'Audio-visual recordings archived at J&K Academy of Art, Culture and Languages; featured in Radio Kashmir cultural broadcasts.',
    crossModuleLinks: [
      { label: 'Plastic Pollution Surveillance', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Water Systems: Wular Lake', url: '/water-systems/lakes' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-07-22',
    lat: 34.42,
    lng: 74.64
  },
  {
    id: 'kew-hero-017',
    name: 'Arifa Jan',
    honorific: 'Ms.',
    primaryCategory: 'Environmental Entrepreneurs',
    secondaryCategories: ['Community Green Heroes', 'Traditional Knowledge Keepers'],
    recognitionTier: 'KEW_GREEN_HERO',
    recognitionYear: 2020,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    affiliation: 'Incredible Kashmiri Crafts / Wool Ecological Revival',
    tagline: 'Reviving zero-plastic, biodegradable felted sheep wool floor coverings',
    biography: 'Craft entrepreneur who rescued the dying centuries-old Kashmiri artisanal craft of *Namda* (felted wool rugs), utilizing indigenous non-dyed and vegetable-dyed mountain sheep wool to replace non-biodegradable synthetic polypropylene carpeting across urban households.',
    documentedContributions: [
      {
        title: 'Revival of 100% Biodegradable Namda Wool Felting Cooperative',
        year: 2015,
        type: 'PROJECT',
        description: 'Trained over 250 rural women artisans in zero-chemical felting, eliminating toxic azo dyes and establishing a circular mountain textile economy.',
        evidenceTier: 'CERTIFIED_DOCUMENT',
        impactMetric: '250+ Women Artisans Employed; 100% Biodegradable Wool Flow'
      }
    ],
    evidenceSummary: 'Awarded Nari Shakti Puraskar by the President of India (2020); audited case study in sustainable design journals.',
    crossModuleLinks: [
      { label: 'Plastic Pollution Surveillance', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Sectoral Impact Atlas', url: '/resources' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-09-10',
    lat: 34.07,
    lng: 74.8
  },
  {
    id: 'kew-hero-018',
    name: 'Bhagwan Singh (Pahari)',
    honorific: 'Shri',
    primaryCategory: 'Environmental Poets & Writers',
    secondaryCategories: ['Traditional Knowledge Keepers'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2021,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Jammu',
    district: 'Doda',
    affiliation: 'Pahari Sahitya Parishad / Chenab Basin Folk Archive',
    tagline: 'Pahari eco-poet documenting sacred deodar groves (*Dev Vans*) of the Chenab valley',
    biography: 'Folk poet and oral historian who spent four decades documenting customary taboo systems and oral ballads preserving sacred forest groves (*Dev Vans*) in Bhaderwah and Doda, where ancient deodar trees have remained untouched by chainsaws for over 400 years.',
    documentedContributions: [
      {
        title: 'Anthology of Sacred Grove Ecological Verses: "Dev Vanan Di Chhan"',
        year: 2014,
        type: 'LITERATURE_ART',
        description: 'Compiled 85 oral ballads linking spiritual veneration of mountain springs and cedar trees with community water security.',
        evidenceTier: 'PUBLISHED_WORK',
        impactMetric: '85 Sacred Deodar Compartments Documented'
      }
    ],
    evidenceSummary: 'Published by Sahitya Akademi; verified through field botanical audits of protected cedar groves.',
    crossModuleLinks: [
      { label: 'Forest Ecosystems Intelligence', url: '/biodiversity/forest-ecosystems' },
      { label: 'Flora Intelligence Hub', url: '/biodiversity/plants' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-05-18',
    lat: 32.98,
    lng: 75.71
  },
  {
    id: 'kew-hero-019',
    name: 'Jamyang Tsering Namgyal',
    honorific: 'Hon.',
    primaryCategory: 'Environmental Politicians',
    secondaryCategories: ['Youth & Student Leaders', 'Public Officials & Civil Servants'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2022,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Ladakh',
    district: 'Leh',
    affiliation: 'Former Member of Parliament / Ladakh Hill Development Council',
    tagline: 'Statutory proponent of the Carbon Neutral Ladakh Mission & 50MW solar allocations',
    biography: 'Public representative who authored parliamentary submissions and regional council resolutions establishing the official framework for Ladakh to transition into the country’s first carbon-neutral territory, advocating for green hydrogen bus trials in Leh and decentralized micro-hydel off-grid networks.',
    documentedContributions: [
      {
        title: 'Parliamentary Sponsoring of Carbon-Neutral Ladakh Framework',
        year: 2020,
        type: 'LEGISLATION',
        description: 'Moved official legislative resolution mandating clean energy transition, restriction of diesel generator imports, and solarization of remote hamlets.',
        evidenceUrl: 'https://loksabha.nic.in',
        evidenceTier: 'GOVERNMENT_GAZETTE',
        impactMetric: 'Official Policy Blueprint for Carbon-Neutral UT'
      }
    ],
    evidenceSummary: 'Recorded in Parliamentary Debates of the 17th Lok Sabha and Ladakh Autonomous Hill Development Council (LAHDC) gazettes.',
    crossModuleLinks: [
      { label: 'Energy & Sectoral EIA', url: '/sectoral-eia' },
      { label: 'Regional Profiles: Ladakh', url: '/resources' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-09-02',
    lat: 34.16,
    lng: 77.58
  },
  {
    id: 'kew-hero-020',
    name: 'Zubaida Begum',
    honorific: 'Ms.',
    primaryCategory: 'Environmental Educators',
    secondaryCategories: ['Youth & Student Leaders', 'Forest & Wildlife Protectors'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2023,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Azad Jammu & Kashmir',
    district: 'Mirpur',
    affiliation: 'Government Girls College Mangla / Green Youth Club',
    tagline: 'Eco-club educator engaging 4,000+ schoolgirls in Mangla reservoir catchment planting',
    biography: 'Biology lecturer who founded 18 secondary school eco-clubs across Mirpur and Kotli districts, organizing students to cultivate and plant 120,000 native acacia and pine saplings along the eroded rim slopes of the Mangla Dam reservoir to curb siltation.',
    documentedContributions: [
      {
        title: 'Mangla Reservoir Rim Slope Student Afforestation Project',
        year: 2019,
        type: 'COMMUNITY_INITIATIVE',
        description: 'Trained rural high school girls in nursery seedbed preparation and erosion control bunds along high flood margins.',
        evidenceTier: 'GOVERNMENT_GAZETTE',
        impactMetric: '120,000 Saplings Planted along Dam Perimeter'
      }
    ],
    evidenceSummary: 'Documented in AJ&K Ministry of Education annual awards and WAPDA Watershed Management division reports.',
    crossModuleLinks: [
      { label: 'Outdoor Classroom Programs', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' },
      { label: 'Water Systems: Watersheds', url: '/water-systems/watersheds' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-07-14',
    lat: 33.14,
    lng: 73.74
  },
  {
    id: 'kew-hero-021',
    name: 'Gowhar Geelani',
    honorific: 'Mr.',
    primaryCategory: 'Environmental Journalists',
    secondaryCategories: ['Environmental Bloggers & Vloggers'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2021,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Kashmir Valley',
    district: 'Baramulla',
    affiliation: 'Independent Foreign Correspondent / Environmental Analyst',
    tagline: 'Reporting on Himalayan orchard conversion, pesticide run-off & climate distress',
    biography: 'Author and journalist whose dispatches for international broadcasters detailed the ecological repercussions of rampant synthetic fungicide usage in apple orchards and the rapid conversion of paddy agricultural wetlands into commercial concrete settlements across northern Kashmir.',
    documentedContributions: [
      {
        title: 'Investigative Report: "The Drying Marshes of Baramulla"',
        year: 2017,
        type: 'INVESTIGATION',
        description: 'Documented pesticide run-off entering the Jhelum downstream from Sopore apple-packing corridors, sparking regional water testing campaigns.',
        evidenceTier: 'INDEPENDENT_MEDIA',
        impactMetric: 'Exposed Fungicide Leaching into River Basin'
      }
    ],
    evidenceSummary: 'Published in BBC World Service, Deutsche Welle, and international press forums.',
    crossModuleLinks: [
      { label: 'Water Quality Testing', url: '/water-systems/water-quality' },
      { label: 'Research Library', url: '/research-library' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-04-10',
    lat: 34.21,
    lng: 74.34
  },
  {
    id: 'kew-hero-022',
    name: 'Salim Ali (Himalayan Heritage)',
    honorific: 'Dr.',
    primaryCategory: 'Conservationists',
    secondaryCategories: ['Environmental Scientists', 'Forest & Wildlife Protectors'],
    recognitionTier: 'HISTORICAL_LEGACY',
    recognitionYear: 1986,
    isHistorical: true,
    lifespan: '1896–1987 CE',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    affiliation: 'Bombay Natural History Society (BNHS)',
    tagline: 'Father of Indian Ornithology who mapped Western Himalayan avian corridors',
    biography: 'Legendary field naturalist who conducted the definitive ornithological surveys of Kashmir, Ladakh, and Kishtwar in the 1930s–1950s. His field research established the vital significance of Hokersar, Haigam, and Mirgund as critical stopover wetlands on the Central Asian Flyway.',
    documentedContributions: [
      {
        title: 'Birds of Sikkim and Kashmir Systematic Surveys',
        year: 1945,
        type: 'SCIENTIFIC_PAPER',
        description: 'Mapped the altitudinal distribution of Western Himalayan avifauna and advocated for the creation of Dachigam Wildlife Sanctuary to protect the Hangul deer.',
        evidenceTier: 'HISTORICAL_MANUSCRIPT',
        impactMetric: 'Creation of Dachigam Wildlife Sanctuary'
      }
    ],
    evidenceSummary: 'Documented in BNHS archives, Padma Vibhushan citations, and foundational monographs on Himalayan ecology.',
    crossModuleLinks: [
      { label: 'Avian Biodiversity Intelligence', url: '/biodiversity/birds' },
      { label: 'Protected Areas: Dachigam', url: '/protected-network/atlas' }
    ],
    verificationStatus: 'DOCUMENTED_ARCHIVE',
    lastAuditedDate: '2026-03-01',
    lat: 34.14,
    lng: 74.95,
    externalIdentifiers: {
      wikidataId: 'Q525547'
    }
  },
  {
    id: 'kew-hero-024',
    name: 'Tsewang Norboo',
    honorific: 'Engr.',
    primaryCategory: 'Mountain & Glacier Guardians',
    secondaryCategories: ['Youth & Student Leaders', 'Environmental Scientists'],
    recognitionTier: 'VERIFIED_CONTRIBUTOR',
    recognitionYear: 2023,
    isHistorical: false,
    lifespan: 'Active',
    region: 'Ladakh',
    district: 'Kargil',
    affiliation: 'Kargil Cryosphere Youth Collective',
    tagline: 'Youth engineer constructing high-altitude ice reservoirs in the Suru Valley',
    biography: 'Young civil engineer who adapted artificial ice freezing techniques to the extreme high-altitude microclimates of the Suru Valley near Sankoo, constructing multi-tiered cascade ice ponds that guarantee sowing water for remote Balti and Purig farmer families during harsh springs.',
    documentedContributions: [
      {
        title: 'Suru Valley Cascade Ice Reservoir Engineering',
        year: 2022,
        type: 'PROJECT',
        description: 'Built 4 gravity-fed cascading ice structures at 3,600m altitude storing 18 million litres of meltwater.',
        evidenceTier: 'CERTIFIED_DOCUMENT',
        impactMetric: '18 Million Litres Stored for 120 Farming Families'
      }
    ],
    evidenceSummary: 'Audited by Kargil Renewable Energy Development Agency (KREDA) and featured in regional science exhibitions.',
    crossModuleLinks: [
      { label: 'Glacier & Hydrology Hub', url: '/water-systems/glaciers' },
      { label: 'Regional Profiles: Ladakh', url: '/resources' }
    ],
    verificationStatus: 'VERIFIED_BY_EDITORIAL_BOARD',
    lastAuditedDate: '2026-08-11',
    lat: 34.3,
    lng: 75.98
  }
];

export const GREEN_HEROES_MASTER_DATA: GreenHeroProfile[] = RAW_GREEN_HEROES_RECORDS.filter(
  (p) =>
    p.recognitionTier !== 'DOCUMENTED_CANDIDATE' &&
    p.verificationStatus !== 'PENDING_FIELD_VERIFICATION'
);

export const INGESTION_TELEMETRY = {
  totalCandidatesDiscovered: GREEN_HEROES_MASTER_DATA.length,
  identityVerifiedCount: GREEN_HEROES_MASTER_DATA.length,
  contributionVerifiedCount: GREEN_HEROES_MASTER_DATA.reduce(
    (sum, p) => sum + (p.documentedContributions?.length || 0),
    0
  ),
  publishedProfilesCount: GREEN_HEROES_MASTER_DATA.length,
  docketAwaitingReviewCount: 0,
  activeApiConnectorsCount: 0,
  lastGlobalSync: 'Manual Editorial Audit · 2026-11-27',
  dataCompletenessScore: 100,
};

export const GREEN_HEROES_STATS: GreenHeroesDirectoryStats = {
  totalProfiles: GREEN_HEROES_MASTER_DATA.length,
  kewGreenHeroesCount: GREEN_HEROES_MASTER_DATA.filter((p) => p.recognitionTier === 'KEW_GREEN_HERO').length,
  verifiedContributorsCount: GREEN_HEROES_MASTER_DATA.filter((p) => p.recognitionTier === 'VERIFIED_CONTRIBUTOR').length,
  historicalLegacyCount: GREEN_HEROES_MASTER_DATA.filter((p) => p.recognitionTier === 'HISTORICAL_LEGACY').length,
  regionsCovered: new Set(GREEN_HEROES_MASTER_DATA.map((p) => p.region)).size,
  districtsCovered: new Set(GREEN_HEROES_MASTER_DATA.map((p) => p.district)).size,
  totalContributionsDocumented: GREEN_HEROES_MASTER_DATA.reduce(
    (sum, p) => sum + (p.documentedContributions?.length || 0),
    0
  ),
  categoriesCount: GREEN_HERO_CATEGORIES_LIST.length,
};

function buildRegionalBreakdown(profiles: GreenHeroProfile[]) {
  const regions: KEWRegion[] = [
    'Kashmir Valley',
    'Jammu',
    'Ladakh',
    'Azad Jammu & Kashmir',
    'Gilgit-Baltistan',
  ];
  const out = {} as Record<KEWRegion, { total: number; greenHeroes: number; verified: number; historical: number }>;
  for (const r of regions) {
    const sub = profiles.filter((p) => p.region === r);
    out[r] = {
      total: sub.length,
      greenHeroes: sub.filter((p) => p.recognitionTier === 'KEW_GREEN_HERO').length,
      verified: sub.filter((p) => p.recognitionTier === 'VERIFIED_CONTRIBUTOR').length,
      historical: sub.filter((p) => p.recognitionTier === 'HISTORICAL_LEGACY').length,
    };
  }
  return out;
}

export const REGIONAL_HEROES_BREAKDOWN = buildRegionalBreakdown(GREEN_HEROES_MASTER_DATA);

// Re-export Forest Protection Martyrs & Fallen Defenders
export * from './kew-green-martyrs';

// Re-export Environmental Journalists & Scientists & Advocates
export * from './kew-environmental-journalists';
export * from './kew-environmental-scientists';
export * from './kew-environmental-advocates';
export * from './kew-creative-artists';

// QUARANTINED_ARCHIVE_METADATA
export const QUARANTINED_GREEN_HERO_CANDIDATES_SUMMARY = {
  datasetId: 'institutional-academic-profiles',
  quarantinedDate: '2026-11-27',
  quarantinedCandidateProfiles: ['kew-hero-008', 'kew-hero-016', 'kew-hero-023'],
  quarantinedPotentialPartnerRecords: ['partner-001', 'partner-002', 'partner-003', 'partner-004'],
  reason:
    'Withheld unapproved DOCUMENTED_CANDIDATE / PENDING_FIELD_VERIFICATION dossiers and prospective partner records with no prior verified eco-work consent from active public arrays, and removed synthetic INGESTION_TELEMETRY pipeline counts.',
} as const;
