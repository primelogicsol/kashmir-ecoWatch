// Kashmir Eco Watch — Migrated Water Record Type
// Generated: 2026-06-16T01:16:26.296Z

export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Pending';

export interface MigratedWaterRecord {
  id: string;
  Legacy_ID: string;
  slug: string;
  Migration_Status: 'Legacy Imported';
  Verification_Status: 'Source Required' | 'Pending Verification' | 'Source Linked' | 'Verified';
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;

  name: string;
  type: string;
  category: string;
  description: string;

  District_ID: string;
  Ecological_Scope_ID: string;
  district: string;
  watershed: string;
  coordinates: { lat: number; lng: number } | null;
  elevation: number | null;
  area: number | null;
  length: number | null;

  waterQuality_status: string;

  Dashboard_Locked: boolean;
  Dashboard_Lock_Reason: string;

  // === Validation (injected during Step 3) ===
  NWIA_Validation?: Record<string, unknown>;

  // === Legacy Preservation ===
  Legacy_Metadata: Record<string, unknown>;
}
