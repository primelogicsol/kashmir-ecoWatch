// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — UNIVERSAL ENVIRONMENTAL INTELLIGENCE SEARCH SCHEMA
// Canonical SearchDocument, Taxonomy, Query & Health Audit Contracts
// ─────────────────────────────────────────────────────────────────────────────

export type SearchResultClass =
  | 'module'                   // Module pages, specialist submodules, dashboards & navigable tabs
  | 'scientific_record'        // Species, habitats, protected areas, phenology, PIL dockets, Green Heroes
  | 'geographic_entity'        // 6 subregions, 44 districts, lakes, wetlands, rivers, springs, glaciers, watersheds
  | 'report_dataset'           // SEIAE reports, EIAs, publications, field reports, open datasets, statutes
  | 'operational_intelligence'; // Verified hazard events, official alerts, satellite change alerts, monitoring stations

export type SearchDomain =
  | 'environmental_modules'
  | 'hazard_intelligence'
  | 'biodiversity_conservation'
  | 'water_cryosphere'
  | 'earth_human_impact'
  | 'environmental_monitoring'
  | 'scientific_research'
  | 'environmental_accountability'
  | 'ecological_calendar'
  | 'community_participation'
  | 'geographic_intelligence';

export type SearchDocumentType =
  | 'module_page'
  | 'dashboard_tab'
  | 'subregion'
  | 'district'
  | 'watershed'
  | 'lake'
  | 'wetland'
  | 'river'
  | 'spring'
  | 'glacier'
  | 'protected_area'
  | 'corridor'
  | 'trail'
  | 'forest_unit'
  | 'species'
  | 'sighting_hotspot'
  | 'hwc_zone'
  | 'hazard_zone'
  | 'hazard_event'
  | 'atmospheric_station'
  | 'official_alert'
  | 'risk_update'
  | 'satellite_alert'
  | 'earth_indicator'
  | 'monitoring_station'
  | 'pil_case'
  | 'legal_statute'
  | 'agency_accountability'
  | 'eia_assessment'
  | 'scientific_report'
  | 'field_report'
  | 'open_dataset'
  | 'conference_webinar'
  | 'phenology_record'
  | 'pollinator_record'
  | 'migration_record'
  | 'seasonal_landscape'
  | 'calendar_event'
  | 'ecovoice_release'
  | 'education_program'
  | 'green_hero'
  | 'ngo_profile'
  | 'citizen_program';

export type KewSubregion =
  | 'Kashmir'
  | 'Jammu'
  | 'Ladakh'
  | 'Azad Kashmir'
  | 'Gilgit'
  | 'Baltistan'
  | 'Multi-Regional';

export type TrustClassification =
  | 'Official Warning'
  | 'Statutory / Judicial Record'
  | 'Peer-Reviewed / Institutional'
  | 'Satellite-Derived'
  | 'KEW Scientific Assessment'
  | 'Field Verified'
  | 'Modelled / Reanalysis'
  | 'Community Reported'
  | 'Platform Module';

export type TemporalClassification =
  | 'reference'
  | 'historical_archive'
  | 'periodic_monitoring'
  | 'operational_feed'
  | 'forecast';

export type DataFreshnessState =
  | 'live_telemetry'
  | 'recent_operational'
  | 'periodic_baseline'
  | 'historical_archive'
  | 'static_module'
  | 'stale_or_offline';

export type CoordinatePrecision = 'exact' | 'centroid' | 'approximate';

export interface MultilingualTerms {
  ur?: string[];       // Urdu (Perso-Arabic script)
  ks?: string[];       // Kashmiri (Perso-Arabic / Kashur)
  hi?: string[];       // Devanagari (Hindi / Urdu vocabulary in Devanagari)
  translit?: string[]; // Verified Roman transliterations & local vernacular spellings
}

export interface SearchDocumentMetric {
  label: string;
  value: string;
}

export interface SearchDocument {
  id: string;
  documentType: SearchDocumentType;
  resultClass: SearchResultClass;
  domain: SearchDomain;
  title: string;
  subtitle?: string;
  description: string;
  canonicalUrl: string;
  parentModule: string;
  subregion?: KewSubregion;
  subregions?: KewSubregion[];
  geographicScope?: 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended' | 'Western Himalaya';
  jurisdictionNote?: string;
  district?: string;
  districts?: string[];
  watershed?: string;
  coordinates?: {
    lat: number;
    lng: number;
    precision: CoordinatePrecision;
  };
  geometryRef?: string;
  tags: string[];
  synonyms: string[];
  multilingualTerms?: MultilingualTerms;
  source: string;
  sourceUrl?: string;
  trustBadge: TrustClassification;
  temporalNature: TemporalClassification;
  observationTimestamp?: string;
  lastUpdated?: string;
  verificationStatus: string;
  dataFreshness: DataFreshnessState;
  accessClassification: 'public';
  metrics?: SearchDocumentMetric[];
  ctaLabel?: string;
  adapterId: string;
}

export interface ExcludedResourceRecord {
  idOrRoute: string;
  title: string;
  reason:
    | 'admin_or_auth_route'
    | 'internal_dev_route'
    | 'redirect_compatibility_route'
    | 'dynamic_route_template'
    | 'restricted_visibility'
    | 'unpublished_draft'
    | 'duplicate_canonical_entity';
  adapterId: string;
}

export interface SearchAdapterOutput {
  adapterId: string;
  adapterName: string;
  documents: SearchDocument[];
  excluded: ExcludedResourceRecord[];
  sourceHealthy: boolean;
  errorMessage?: string;
}

export interface SearchQueryOptions {
  q?: string;
  resultClass?: SearchResultClass | 'all';
  domain?: SearchDomain | 'all';
  subregion?: KewSubregion | 'all' | 'Gilgit-Baltistan';
  district?: string;
  watershed?: string;
  trustBadge?: TrustClassification | 'all';
  temporalNature?: TemporalClassification | 'all';
  verifiedOnly?: boolean;
  hasCoordinates?: boolean;
  dateFrom?: string;
  dateTo?: string;
  nearLat?: number;
  nearLng?: number;
  radiusKm?: number;
  sort?: 'relevance' | 'updated' | 'title_asc';
  page?: number;
  limit?: number;
}

export interface RankedSearchHit {
  document: SearchDocument;
  score: number;
  matchedFields: string[];
  distanceKm?: number;
}

export interface SearchFacetCounts {
  resultClasses: Record<string, number>;
  domains: Record<string, number>;
  subregions: Record<string, number>;
  districts: Array<{ name: string; count: number }>;
  watersheds: Array<{ name: string; count: number }>;
  temporalNatures: Record<string, number>;
  trustBadges: Record<string, number>;
  withCoordinates: number;
}

export interface SearchMapPin {
  id: string;
  title: string;
  subtitle?: string;
  canonicalUrl: string;
  domain: SearchDomain;
  resultClass: SearchResultClass;
  documentType: SearchDocumentType;
  district?: string;
  subregion?: KewSubregion;
  trustBadge: TrustClassification;
  lat: number;
  lng: number;
  precision: CoordinatePrecision;
}

export interface SearchQueryResponse {
  query: string;
  normalizedQuery: string;
  totalHits: number;
  page: number;
  limit: number;
  totalPages: number;
  hits: RankedSearchHit[];
  facets: SearchFacetCounts;
  mapPins: SearchMapPin[];
  didYouMean?: string;
  engine: 'postgresql_fts_hybrid' | 'memory_bm25_hybrid';
  latencyMs: number;
  indexStats: {
    totalIndexedDocuments: number;
    lastBuiltAt: string;
    pgSynced: boolean;
  };
}

export const SEARCH_DOMAIN_META: Record<
  SearchDomain,
  { label: string; shortLabel: string; description: string; defaultRoute: string }
> = {
  environmental_modules: {
    label: 'Environmental Modules',
    shortLabel: 'Modules & Dashboards',
    description: 'Module homepages, specialist observatories, analytical dashboards, and directly navigable workbench tabs.',
    defaultRoute: '/module-directory',
  },
  hazard_intelligence: {
    label: 'Hazard Intelligence',
    shortLabel: 'Hazard Intelligence',
    description: 'Atmospheric systems, extreme weather, floods, flash floods, landslides, avalanches, earthquakes, GLOFs, forest fires, algal blooms, and official alerts.',
    defaultRoute: '/hazard-intelligence',
  },
  biodiversity_conservation: {
    label: 'Biodiversity & Conservation',
    shortLabel: 'Biodiversity',
    description: 'Mammals, birds, fish, vascular & medicinal flora, Red Data Book species, habitats, protected areas, corridors, and verified sightings.',
    defaultRoute: '/biodiversity',
  },
  water_cryosphere: {
    label: 'Water & Cryosphere',
    shortLabel: 'Water & Cryosphere',
    description: 'Lakes, Ramsar wetlands, rivers, karst springs, glaciers, snowpack, watersheds, drinking water sources, water quality, and NWIA baselines.',
    defaultRoute: '/water-systems',
  },
  earth_human_impact: {
    label: 'Earth & Human Impact',
    shortLabel: 'Earth & Human Impact',
    description: 'Land-use transformation, Karewa & riverbed mining, glacier recession, urban heat islands, and multi-sensor satellite change detection.',
    defaultRoute: '/earth-human-impact',
  },
  environmental_monitoring: {
    label: 'Environmental Monitoring',
    shortLabel: 'Monitoring',
    description: 'CAAQMS & CAMS air quality, solid/plastic/bio waste, sewage & STPs, noise, transport emissions, heritage Chinar census, EHI, resilience, and SDGs.',
    defaultRoute: '/environmental-monitoring',
  },
  scientific_research: {
    label: 'Scientific Research',
    shortLabel: 'Scientific Research',
    description: 'SEIAE sectoral assessments, EIAs, peer-reviewed publications, field reports, FAIR open data categories, conferences, and webinars.',
    defaultRoute: '/sectoral-eia',
  },
  environmental_accountability: {
    label: 'Environmental Accountability',
    shortLabel: 'PIL & Accountability',
    description: 'Public Interest Litigations, High Court & NGT directives, environmental statutes, compliance audits, and agency accountability registers.',
    defaultRoute: '/resources/environmental-pil',
  },
  ecological_calendar: {
    label: 'Ecological Calendar',
    shortLabel: 'Calendar & Phenology',
    description: 'Flowering phenology, pollinator windows, bird migration schedules, seasonal landscapes, UN/regional observances, EcoVoices, and Outdoor Classroom.',
    defaultRoute: '/environmental-calendar',
  },
  community_participation: {
    label: 'Community Participation',
    shortLabel: 'Community & Heroes',
    description: 'KEW Green Heroes, environmental martyrs, scientists, journalists, advocates, NGO directory, citizen science programs, and student field records.',
    defaultRoute: '/resources/kew-green-heroes',
  },
  geographic_intelligence: {
    label: 'Geographic Intelligence',
    shortLabel: 'Geographic & GIS',
    description: 'Six Western Himalayan subregions, 44 districts, river basins, watersheds, forest divisions, mountain passes, and GIS spatial entities.',
    defaultRoute: '/geographic-scope',
  },
};

export const RESULT_CLASS_META: Record<
  SearchResultClass,
  { label: string; shortLabel: string; description: string }
> = {
  module: {
    label: 'Modules & Dashboards',
    shortLabel: 'Modules',
    description: 'Platform homepages, specialist modules, interactive dashboards, and workbench tabs',
  },
  scientific_record: {
    label: 'Scientific & Institutional Records',
    shortLabel: 'Scientific Records',
    description: 'Species, protected areas, phenology, PIL cases, Green Heroes, NGOs, and educational programs',
  },
  geographic_entity: {
    label: 'Geographic & Spatial Entities',
    shortLabel: 'Geographic Entities',
    description: 'Subregions, districts, lakes, wetlands, rivers, springs, glaciers, watersheds, corridors, and trails',
  },
  report_dataset: {
    label: 'Reports, EIAs & Datasets',
    shortLabel: 'Reports & Datasets',
    description: 'SEIAE assessments, scientific monographs, field surveys, open datasets, and statutory instruments',
  },
  operational_intelligence: {
    label: 'Operational & Hazard Intelligence',
    shortLabel: 'Operational Intelligence',
    description: 'Official alerts, hazard zones, historical disaster events, satellite change alerts, and monitoring stations',
  },
};
