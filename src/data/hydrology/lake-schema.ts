/**
 * Kashmir EcoWatch — Hydrological Intelligence Lake Schema
 * GIS-grade lake record structure for the expanded lakes database
 * Version: 2.0 | Built: 2026-06-16
 */

// ─── CONFIDENCE LEVELS ────────────────────────────────────────────────────────
export type ConfidenceLevel =
  | 'High'      // Official/satellite/Ramsar/peer-reviewed source
  | 'Medium'    // Government report, well-documented secondary source
  | 'Low'       // Tourism blog, unverified local name
  | 'Unverified'; // No source found, in validation queue

// ─── LAKE TYPES ───────────────────────────────────────────────────────────────
export type LakeType =
  | 'Alpine Lake'
  | 'Glacial Lake'
  | 'High-Altitude Lake'
  | 'Glacial Outburst Lake'         // GLOF-formed
  | 'Proglacial Lake'               // At glacier terminus
  | 'Supraglacial Lake'             // On glacier surface
  | 'Moraine-Dammed Lake'
  | 'Ice-Dammed Lake'
  | 'Landslide-Dammed Lake'
  | 'Endorheic Lake'                // No outflow (closed basin)
  | 'Salt Lake'
  | 'Volcanic Crater Lake'
  | 'Karst Lake'
  | 'Tectonic Lake'
  | 'Floodplain Lake'
  | 'Oxbow Lake'
  | 'Urban Lake'
  | 'Wetland Lake'
  | 'Ramsar Wetland Lake'
  | 'Sacred Lake'
  | 'Reservoir'
  | 'Geothermal Lake'
  | 'Desert Lake'
  | 'Seasonal Lake'
  | 'Tarn'                          // Small alpine glacial lake
  | 'Spring-Fed Lake'
  | 'River-Linked Lake'
  | 'Natural Lake'
  | 'Rural Lake';

// ─── HYDROLOGICAL STATUS ──────────────────────────────────────────────────────
export type HydrologicalStatus =
  | 'Perennial'
  | 'Seasonal'
  | 'Intermittent'
  | 'Ephemeral'
  | 'Shrinking'
  | 'Expanding'                     // GLOF-expansion risk
  | 'Desiccating'
  | 'Lost'                          // Historically recorded but no longer exists
  | 'Unconfirmed';

// ─── VERIFICATION STATUS ──────────────────────────────────────────────────────
export type VerificationStatus =
  | 'Verified'        // Multi-source confirmed
  | 'Under-Review'    // Awaiting secondary confirmation
  | 'Pending-GPS'     // Coordinates not confirmed
  | 'Pending-Area'    // Area data missing
  | 'Pending-WQ'      // Water quality data missing
  | 'Conflict'        // Sources conflict; see Conflict_Note
  | 'Community'       // Community-reported, not officially confirmed
  | 'Historical'      // Exists in historical records; current status unknown
  | 'Lost';           // Confirmed disappeared

// ─── GLOF RISK LEVEL ─────────────────────────────────────────────────────────
export type GlofRiskLevel = 'Critical' | 'High' | 'Moderate' | 'Low' | 'None' | 'Unknown';

// ─── WATER QUALITY STATUS ─────────────────────────────────────────────────────
export type WaterQualityStatus = 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Critical' | 'Unknown';

// ─── RAMSAR STATUS ────────────────────────────────────────────────────────────
export type RamsarStatus =
  | 'Designated'
  | 'Proposed'
  | 'Buffer-Zone'
  | 'Not-Designated';

// ─── SOURCE TYPES ─────────────────────────────────────────────────────────────
export type SourceType =
  | 'Satellite-Imagery'      // Sentinel, Landsat, MODIS, ISRO Bhuvan
  | 'Government-Database'    // India-WRIS, NWIA, Jal Shakti, J&K EE&RSD
  | 'International-Database' // Ramsar, ICIMOD, HydroSHEDS, JRC, GLIMS
  | 'Peer-Reviewed-Paper'    // Academic journals
  | 'Government-Report'      // CAG, NRSC, CWC, WAPDA reports
  | 'Protected-Area-Record'  // National Park / WLS records
  | 'Tourism-Secondary'      // Tourism boards, travel media
  | 'Local-Knowledge'        // Community/NGO reported
  | 'Historical-Survey'      // Pre-1990 surveys, Survey of India maps;

// ─── ECOLOGICAL SCOPE ─────────────────────────────────────────────────────────
export type EcologicalScope =
  | 'Kashmir-Valley'
  | 'Ladakh'
  | 'Jammu-Region'
  | 'AJK'
  | 'Gilgit-Baltistan'
  | 'Karakoram'
  | 'Upper-Indus-Basin'
  | 'Trans-Himalayan';

// ─── LAKE SOURCE RECORD ───────────────────────────────────────────────────────
export interface LakeSource {
  sourceId: string;
  sourceName: string;
  sourceType: SourceType;
  sourceUrl?: string;
  accessDate: string;
  dataYear?: number;
  confidence: ConfidenceLevel;
  dataFields: string[];           // Which fields this source provides
  notes?: string;
}

// ─── MAIN LAKE RECORD ─────────────────────────────────────────────────────────
export interface HydroLakeRecord {
  // Identity
  lakeId: string;                 // Unique, stable ID
  lakeName: string;               // Primary official name
  alternativeNames: string[];     // Local, historical, transliterated names
  localName?: string;             // Primary local-language name
  meaningOfName?: string;         // Etymology

  // Location
  district: string;
  tehsil?: string;
  region: string;
  ecologicalScope: EcologicalScope;
  countryAdminContext: string;    // "India (J&K)", "Pakistan (GB)", "Transboundary (India/China)"
  latitude?: number;              // Decimal degrees WGS84
  longitude?: number;             // Decimal degrees WGS84
  coordinateAccuracy?: 'GPS-Surveyed' | 'Satellite-Derived' | 'Approximate' | 'Estimated';
  elevation_m?: number;
  elevationAccuracy?: 'Surveyed' | 'DEM-Derived' | 'Approximate';

  // Physical Attributes
  area_km2?: number | 'Source-Required';
  area_ha?: number;
  perimeterKm?: number;
  maxDepthM?: number;
  avgDepthM?: number;
  lengthKm?: number;
  widthKm?: number;
  volumeMcm?: number;             // Million cubic metres

  // Classification
  lakeType: LakeType;
  lakeTypeSecondary?: LakeType;
  hydrologicalStatus: HydrologicalStatus;
  seasonalStatus: 'Year-Round' | 'Seasonal' | 'Intermittent' | 'Unknown';
  accessibleMonths?: string;      // e.g., "June-October"

  // Hydrology
  basin: string;                  // e.g., "Jhelum Basin", "Indus Basin"
  subBasin?: string;
  watershed?: string;
  inflowSources: string[];        // Glaciers, rivers, springs, rainfall
  outflow?: string;               // River/stream name or "Endorheic"
  connectedWaterBodies?: string[];

  // Conservation
  protectedStatus?: string;       // Protected Area name
  ramsarStatus: RamsarStatus;
  ramsarSiteNumber?: string;
  ramsarDesignationYear?: number;
  ibaStatus?: boolean;            // Important Bird Area
  kbaStatus?: boolean;            // Key Biodiversity Area
  nationalParkZone?: boolean;
  biodiversityHeritageSite?: boolean;

  // Ecology
  biodiversityValue: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';
  keySpecies?: string[];
  migratoryBirdsite?: boolean;
  fishSpecies?: string[];
  endemicSpecies?: string[];
  invasiveSpecies?: string[];

  // Threats & Risk
  glofRisk: GlofRiskLevel;
  glofMonitoringStatus?: string;
  earlyWarningSystem?: boolean;
  tourismPressure: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Negligible' | 'Unknown';
  pollutionRisk: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';
  algalBloomRisk: 'High' | 'Moderate' | 'Low' | 'Unknown';
  encroachmentRisk?: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';
  primaryThreats: string[];

  // Water Quality
  waterQualityStatus: WaterQualityStatus;
  waterQualityNotes?: string;
  pHRange?: string;
  salinity?: 'Freshwater' | 'Brackish' | 'Saline' | 'Hypersaline' | 'Unknown';

  // Data Provenance
  sourceIds: string[];            // References to LakeSource registry
  primarySourceUrl?: string;
  confidenceLevel: ConfidenceLevel;
  verificationStatus: VerificationStatus;
  conflictNote?: string;          // If sources conflict

  // Dashboard Control
  dashboardEnabled: boolean;      // false = locked from public dashboard
  dashboardLockReason?: string;
  dataCompleteness: number;       // 0-100% estimate

  // Metadata
  createdAt: string;
  updatedAt: string;
  lastVerified?: string;
  addedBy: string;                // Research agent ID
  notes?: string;
  gpsValidationRequired?: boolean;
  areaValidationRequired?: boolean;
  waterQualityDataRequired?: boolean;
}

// ─── VALIDATION QUEUE ENTRY ───────────────────────────────────────────────────
export interface ValidationQueueEntry {
  lakeId: string;
  lakeName: string;
  district: string;
  validationNeeded: ('GPS' | 'Area' | 'WaterQuality' | 'Conflict' | 'NameVerification')[];
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  assignedTo?: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}
