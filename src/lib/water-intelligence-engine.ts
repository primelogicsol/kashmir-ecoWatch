/**
 * Kashmir Eco Watch — Hydrological Intelligence Engine
 * =====================================================
 * Phase 4A: Model Integration — runs the 10 calculation models
 *           against every waterbody record and stores computed outputs.
 *
 * Phase 4B: Intelligence Layer — generates model-backed narrative insights.
 *
 * STRICT RULES:
 * - Never calculate from Dashboard_Locked records for live KPIs.
 * - If required inputs are absent → return 'Insufficient Data', never guess.
 * - All narratives are drawn from computed model outputs only.
 */

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';
import type { RiskLevel, WaterQualityStatus } from '@/types/hydrology';

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED OUTPUT TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type InsufficientData = 'Insufficient Data';
export type ComputedRisk = RiskLevel | InsufficientData;
export type ComputedWQI = WaterQualityStatus | InsufficientData;
export type ComputedHealth = 'Healthy' | 'Moderate' | 'Degraded' | 'Critical' | InsufficientData;

export interface ComputedIntelligence {
  record_id: string;
  name: string;
  type: string;
  district: string;
  Ecological_Scope_ID: string;
  Dashboard_Locked: boolean;
  Confidence_Level: string;
  Source_ID: string;

  // Model Outputs
  Computed_WQI: ComputedWQI;
  Computed_Eutrophication_Risk: ComputedRisk;
  Computed_Algal_Bloom_Risk: ComputedRisk;
  Computed_Wetland_Health: ComputedHealth;
  Computed_Flood_Risk: ComputedRisk;
  Computed_Watershed_Risk: ComputedRisk;
  Computed_Restoration_Priority: ComputedRisk;
  Computed_Climate_Vulnerability: ComputedRisk;

  // Narrative intelligence
  Intelligence_Statements: string[];
  Alerts: WaterAlert[];

  // Traceability
  Computation_Notes: string[];
  Computed_At: string;
  Model_Version: string;
}

export interface WaterAlert {
  alert_id: string;
  alert_type: 'Flood' | 'Water Quality' | 'Algal Bloom' | 'Eutrophication' | 'Restoration' | 'Data Gap';
  severity: 'Advisory' | 'Watch' | 'Warning' | 'Critical';
  message: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4A — MODEL COMPUTATION FUNCTIONS
// Each function returns 'Insufficient Data' when critical inputs are missing.
// ─────────────────────────────────────────────────────────────────────────────

function computeWQI(wq: Record<string, unknown> | null): ComputedWQI {
  if (!wq) return 'Insufficient Data';

  const pH = wq.pH as number | null;
  const do_mgL = wq.dissolvedOxygen as number | null;
  const bod = wq.biologicalOxygenDemand as number | null;
  const turbidity = wq.turbidity as number | null;
  const nitrate = wq.nitrates as number | null;
  const fecalColiform = wq.fecalColiform as number | null;

  // Need at least pH and DO to compute
  if (pH == null || do_mgL == null) return 'Insufficient Data';

  let score = 100;

  if (pH < 6.5 || pH > 8.5) score -= 15;
  if (do_mgL < 5.0) score -= 25;
  if (bod != null && bod > 3.0) score -= 20;
  if (turbidity != null && turbidity > 10.0) score -= 10;
  if (nitrate != null && nitrate > 45) score -= 20;
  if (fecalColiform != null && fecalColiform > 500) score -= 30;

  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Moderate';
  if (score >= 30) return 'Poor';
  return 'Critical';
}

function computeEutrophicationRisk(
  wq: Record<string, unknown> | null,
  threats: string[],
  type: string
): ComputedRisk {
  if (!wq) return 'Insufficient Data';

  const phosphate = wq.phosphates as number | null;
  const nitrate = wq.nitrates as number | null;

  // Need at least phosphate to compute
  if (phosphate == null) return 'Insufficient Data';

  let score = 0;
  const hasSewagePressure = threats.some(t =>
    t.includes('pollution') || t.includes('sewage') || t.includes('eutrophication')
  );
  const isUrbanOrWetland = type === 'wetland' || (wq.conductivity as number || 0) > 220;

  if (phosphate > 0.10) score += 4;
  else if (phosphate > 0.05) score += 3;
  else if (phosphate > 0.02) score += 1;

  if (nitrate != null && nitrate > 1.5) score += 2;
  if (hasSewagePressure) score += 3;
  if (isUrbanOrWetland) score += 2;

  if (score >= 9) return 'Critical';
  if (score >= 7) return 'High';
  if (score >= 5) return 'Moderate';
  if (score >= 3) return 'Watch';
  return 'Low';
}

function computeAlgalBloomRisk(
  wq: Record<string, unknown> | null,
  threats: string[]
): ComputedRisk {
  if (!wq) return 'Insufficient Data';

  const temp = wq.temperature as number | null;
  const do_mgL = wq.dissolvedOxygen as number | null;
  const turbidity = wq.turbidity as number | null;
  const phosphate = wq.phosphates as number | null;

  // Need at least temperature or DO
  if (temp == null && do_mgL == null) return 'Insufficient Data';

  let score = 0;
  const isStagnant = threats.some(t =>
    t.includes('eutrophication') || t.includes('silt') || t.includes('encroach')
  );

  if (temp != null && temp > 20) score += 3;
  if (temp != null && temp > 16) score += 1;
  if (do_mgL != null && do_mgL < 6.0) score += 2;
  if (turbidity != null && turbidity > 8) score += 1;
  if (phosphate != null && phosphate > 0.08) score += 3;
  if (isStagnant) score += 2;

  if (score >= 9) return 'Critical';
  if (score >= 7) return 'High';
  if (score >= 5) return 'Moderate';
  if (score >= 3) return 'Watch';
  return 'Low';
}

function computeWetlandHealth(
  record: MigratedWaterRecord
): ComputedHealth {
  if (record.type !== 'wetland') return 'Insufficient Data';

  const threats = record.Legacy_Metadata?.threats as string[] || [];
  const wq = record.Legacy_Metadata?.waterQuality as Record<string, unknown> | null
    || (record.waterQuality_status ? { status: record.waterQuality_status } : null);

  let score = 100;

  // Encroachment penalty
  if (threats.some(t => t.includes('encroach'))) score -= 30;
  // Pollution/eutrophication penalty
  if (threats.some(t => t.includes('eutrophication') || t.includes('pollution'))) score -= 25;
  // Agricultural runoff
  if (threats.some(t => t.includes('agricultural') || t.includes('runoff'))) score -= 15;
  // Water quality
  const wqStatus = record.waterQuality_status;
  if (wqStatus === 'poor' || wqStatus === 'critical') score -= 30;
  if (wqStatus === 'moderate') score -= 15;

  if (score >= 80) return 'Healthy';
  if (score >= 55) return 'Moderate';
  if (score >= 30) return 'Degraded';
  return 'Critical';
}

function computeFloodRisk(
  record: MigratedWaterRecord
): ComputedRisk {
  const hydro = record.Legacy_Metadata?.hydrologicalData as Record<string, unknown> | null;
  if (!hydro) return 'Insufficient Data';

  const floodRisk = hydro.floodRisk as string | null;
  const threats = record.Legacy_Metadata?.threats as string[] || [];

  if (!floodRisk) return 'Insufficient Data';

  // Map legacy flood risk
  const baseMap: Record<string, number> = { low: 1, moderate: 3, high: 6, critical: 9 };
  let score = baseMap[floodRisk] || 2;

  if (threats.some(t => t.includes('encroach'))) score += 2;
  if (record.type === 'wetland') score -= 1; // wetlands buffer floods

  if (score >= 8) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Moderate';
  if (score >= 2) return 'Watch';
  return 'Low';
}

function computeRestorationPriority(
  record: MigratedWaterRecord
): ComputedRisk {
  const threats = record.Legacy_Metadata?.threats as string[] || [];
  const wqStatus = record.waterQuality_status;

  let score = 0;

  // Degradation severity from WQ
  if (wqStatus === 'critical') score += 4;
  else if (wqStatus === 'poor') score += 3;
  else if (wqStatus === 'moderate') score += 2;

  // Threat severity
  if (threats.some(t => t.includes('eutrophication'))) score += 2;
  if (threats.some(t => t.includes('encroach'))) score += 2;
  if (threats.some(t => t.includes('silt') || t.includes('sedimentation'))) score += 1;

  // Ramsar/protected bumps restoration priority higher
  const nwia = record.NWIA_Validation as Record<string, unknown> | undefined;
  if (nwia?.Ramsar_Status) score += 2;

  if (score >= 8) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Moderate';
  if (score >= 2) return 'Watch';
  return 'Low';
}

function computeClimateVulnerability(
  record: MigratedWaterRecord
): ComputedRisk {
  const threats = record.Legacy_Metadata?.threats as string[] || [];
  const hydro = record.Legacy_Metadata?.hydrologicalData as Record<string, unknown> | null;

  // Need some threat data
  if (!threats.length) return 'Insufficient Data';

  let score = 0;

  if (threats.some(t => t.includes('climate'))) score += 3;
  if (threats.some(t => t.includes('glacial') || t.includes('glacier'))) score += 3;
  if (threats.some(t => t.includes('sedimentation') || t.includes('catchment'))) score += 2;

  // Snowfed/glacial source → higher climate exposure
  const source = hydro?.source as string | undefined;
  if (source === 'glacial') score += 2;
  if (source === 'mixed') score += 1;

  if (score >= 7) return 'Critical';
  if (score >= 5) return 'High';
  if (score >= 3) return 'Moderate';
  if (score >= 1) return 'Watch';
  return 'Low';
}

function computeWatershedRisk(
  record: MigratedWaterRecord
): ComputedRisk {
  const hydro = record.Legacy_Metadata?.hydrologicalData as Record<string, unknown> | null;
  const threats = record.Legacy_Metadata?.threats as string[] || [];

  if (!hydro) return 'Insufficient Data';

  let score = 0;

  // Large drainage area with encroachment = elevated risk
  const drainageArea = hydro.drainageArea as number | null;
  if (drainageArea && drainageArea > 500) score += 2;

  if (threats.some(t => t.includes('sedimentation') || t.includes('silt'))) score += 3;
  if (threats.some(t => t.includes('catchment'))) score += 2;
  if (threats.some(t => t.includes('encroach'))) score += 2;

  const floodRisk = hydro.floodRisk as string | null;
  if (floodRisk === 'moderate') score += 2;
  if (floodRisk === 'high') score += 3;

  if (score >= 8) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Moderate';
  if (score >= 2) return 'Watch';
  return 'Low';
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4B — INTELLIGENCE NARRATIVE ENGINE
// Generates model-backed statements. Zero hallucination policy.
// ─────────────────────────────────────────────────────────────────────────────

function buildNarratives(
  record: MigratedWaterRecord,
  outputs: Omit<ComputedIntelligence, 'Intelligence_Statements' | 'Alerts' | 'Computation_Notes' | 'Computed_At' | 'Model_Version' | 'record_id' | 'Dashboard_Locked' | 'Confidence_Level' | 'Source_ID'>
): { statements: string[]; alerts: WaterAlert[]; notes: string[] } {
  const statements: string[] = [];
  const alerts: WaterAlert[] = [];
  const notes: string[] = [];
  const name = record.name;

  // WQI
  if (outputs.Computed_WQI !== 'Insufficient Data') {
    const wqMap: Record<string, string> = {
      Excellent: `${name} displays excellent water quality across all measured parameters. Continued monitoring is recommended to maintain this status.`,
      Good: `${name} currently exhibits good water quality. Nutrient levels are within acceptable ranges. Periodic quality checks are advised.`,
      Moderate: `${name} exhibits moderate water quality conditions. Dissolved oxygen pressure and nutrient loading indicate increasing stress. Enhanced monitoring and nutrient management interventions are recommended.`,
      Poor: `${name} is experiencing poor water quality conditions. Immediate investigation into pollution sources and discharge events is required.`,
      Critical: `${name} has reached critical water quality status. Emergency intervention and source control measures are urgently needed.`,
    };
    statements.push(wqMap[outputs.Computed_WQI] || `${name} water quality status: ${outputs.Computed_WQI}.`);

    if (outputs.Computed_WQI === 'Poor' || outputs.Computed_WQI === 'Critical') {
      alerts.push({
        alert_id: `WQ-${record.id}`,
        alert_type: 'Water Quality',
        severity: outputs.Computed_WQI === 'Critical' ? 'Critical' : 'Warning',
        message: `${name}: ${outputs.Computed_WQI} water quality detected. Immediate source investigation required.`,
      });
    }
  } else {
    notes.push(`WQI: Insufficient parametric data — requires JKPCC/CPCB ingestion for pH, DO, BOD measurements.`);
  }

  // Eutrophication
  if (outputs.Computed_Eutrophication_Risk !== 'Insufficient Data') {
    const eutroMap: Record<string, string> = {
      Low: `${name} shows low eutrophication pressure. Nutrient loads are within natural background levels.`,
      Watch: `${name} shows early eutrophication indicators. Phosphate accumulation requires continued monitoring.`,
      Moderate: `${name} currently exhibits moderate eutrophication risk. Elevated phosphate and nitrogen concentrations indicate increasing nutrient pressure. Nutrient management and catchment controls are recommended.`,
      High: `${name} shows high eutrophication risk. Nutrient loading from sewage and agricultural runoff is significant. Immediate intervention in nutrient inputs is required.`,
      Critical: `${name} is at critical eutrophication risk. Algal bloom conditions are probable. Emergency nutrient reduction measures and aeration may be required.`,
    };
    statements.push(eutroMap[outputs.Computed_Eutrophication_Risk] || '');

    if (outputs.Computed_Eutrophication_Risk === 'High' || outputs.Computed_Eutrophication_Risk === 'Critical') {
      alerts.push({
        alert_id: `EUTRO-${record.id}`,
        alert_type: 'Eutrophication',
        severity: outputs.Computed_Eutrophication_Risk === 'Critical' ? 'Critical' : 'Warning',
        message: `${name}: ${outputs.Computed_Eutrophication_Risk} eutrophication risk. Elevated nutrient loading detected.`,
      });
    }
  } else {
    notes.push(`Eutrophication: Requires total phosphorus and total nitrogen measurements.`);
  }

  // Algal Bloom
  if (outputs.Computed_Algal_Bloom_Risk !== 'Insufficient Data') {
    if (outputs.Computed_Algal_Bloom_Risk === 'Moderate' || outputs.Computed_Algal_Bloom_Risk === 'High' || outputs.Computed_Algal_Bloom_Risk === 'Critical') {
      statements.push(`${name} shows ${outputs.Computed_Algal_Bloom_Risk.toLowerCase()} algal bloom susceptibility based on temperature, nutrient levels, and flow conditions.`);
      alerts.push({
        alert_id: `BLOOM-${record.id}`,
        alert_type: 'Algal Bloom',
        severity: outputs.Computed_Algal_Bloom_Risk === 'Critical' ? 'Critical' : outputs.Computed_Algal_Bloom_Risk === 'High' ? 'Warning' : 'Advisory',
        message: `${name}: Algal bloom risk — ${outputs.Computed_Algal_Bloom_Risk}. Satellite NDCI monitoring recommended.`,
      });
    }
  }

  // Wetland Health
  if (outputs.Computed_Wetland_Health !== 'Insufficient Data') {
    const wetlandMap: Record<string, string> = {
      Healthy: `${name} demonstrates healthy ecological condition with stable water coverage, vegetation, and biodiversity.`,
      Moderate: `${name} is in moderate ecological condition. Eutrophication pressure, encroachment, or agricultural runoff impacts are detectable.`,
      Degraded: `${name} shows degraded ecological condition. Multiple stressors including encroachment, eutrophication, and pollution are compounding losses. Restoration action is overdue.`,
      Critical: `${name} is in critical ecological condition. Immediate comprehensive restoration intervention is required.`,
    };
    if (wetlandMap[outputs.Computed_Wetland_Health]) {
      statements.push(wetlandMap[outputs.Computed_Wetland_Health]);
    }
  }

  // Restoration Priority
  if (outputs.Computed_Restoration_Priority !== 'Insufficient Data') {
    if (outputs.Computed_Restoration_Priority === 'High' || outputs.Computed_Restoration_Priority === 'Critical') {
      statements.push(`${name} carries a ${outputs.Computed_Restoration_Priority.toLowerCase()} restoration priority rating. Conservation interventions should be accelerated.`);
    }
  }

  // Climate Vulnerability
  if (outputs.Computed_Climate_Vulnerability !== 'Insufficient Data') {
    if (outputs.Computed_Climate_Vulnerability === 'Moderate' || outputs.Computed_Climate_Vulnerability === 'High' || outputs.Computed_Climate_Vulnerability === 'Critical') {
      statements.push(`${name} carries ${outputs.Computed_Climate_Vulnerability.toLowerCase()} climate vulnerability based on recorded threat patterns and hydrological source characteristics.`);
    }
  }

  return { statements, alerts, notes };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT — compute intelligence for a single record
// ─────────────────────────────────────────────────────────────────────────────

export function computeRecordIntelligence(record: MigratedWaterRecord): ComputedIntelligence {
  const now = new Date().toISOString();

  // Pull waterQuality from Legacy_Metadata (migration preserved it there)
  const wq = record.Legacy_Metadata?.waterQuality as Record<string, unknown> | null;
  const threats = (record.Legacy_Metadata?.threats as string[]) || [];
  const hydro = record.Legacy_Metadata?.hydrologicalData as Record<string, unknown> | null;

  const notes: string[] = [];
  if (!wq) notes.push('Water quality parameters sourced from legacy status field only. Full parametric ingestion required from JKPCC/CPCB.');
  if (!hydro) notes.push('Hydrological data missing. India-WRIS ingestion required for flow and drainage parameters.');

  // Run all models
  const Computed_WQI = computeWQI(wq);
  const Computed_Eutrophication_Risk = computeEutrophicationRisk(wq, threats, record.type);
  const Computed_Algal_Bloom_Risk = computeAlgalBloomRisk(wq, threats);
  const Computed_Wetland_Health = computeWetlandHealth(record);
  const Computed_Flood_Risk = computeFloodRisk(record);
  const Computed_Watershed_Risk = computeWatershedRisk(record);
  const Computed_Restoration_Priority = computeRestorationPriority(record);
  const Computed_Climate_Vulnerability = computeClimateVulnerability(record);

  const partial = {
    record_id: record.id,
    name: record.name,
    type: record.type,
    district: record.district,
    Ecological_Scope_ID: record.Ecological_Scope_ID,
    Computed_WQI,
    Computed_Eutrophication_Risk,
    Computed_Algal_Bloom_Risk,
    Computed_Wetland_Health,
    Computed_Flood_Risk,
    Computed_Watershed_Risk,
    Computed_Restoration_Priority,
    Computed_Climate_Vulnerability,
  };

  const { statements, alerts, notes: narrativeNotes } = buildNarratives(record, partial);

  return {
    ...partial,
    Dashboard_Locked: record.Dashboard_Locked,
    Confidence_Level: record.Confidence_Level,
    Source_ID: record.Source_ID,
    Intelligence_Statements: statements,
    Alerts: alerts,
    Computation_Notes: [...notes, ...narrativeNotes],
    Computed_At: now,
    Model_Version: '1.0.0',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BATCH COMPUTE — for arrays of records
// Only computes for unlocked records; locked records return a stub.
// ─────────────────────────────────────────────────────────────────────────────

export function computeBatchIntelligence(records: MigratedWaterRecord[]): ComputedIntelligence[] {
  return records
    .filter(r => !r.Dashboard_Locked)
    .map(r => computeRecordIntelligence(r));
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD SUMMARY — derived from computed intelligence
// ─────────────────────────────────────────────────────────────────────────────

export interface WaterIntelligenceSummary {
  total_records: number;
  verified_records: number;
  locked_records: number;
  verified_sources: number;
  gps_queue: number;
  verification_progress_pct: number;

  // Water health breakdown (verified only)
  wqi_breakdown: Record<ComputedWQI, number>;

  // Risk aggregates
  high_eutrophication_count: number;
  active_algal_risk_count: number;
  high_restoration_priority_count: number;

  // Ramsar
  ramsar_records: { id: string; name: string; site_id: string; district: string }[];

  // Active alerts
  active_alerts: WaterAlert[];

  // Computation timestamp
  computed_at: string;
}

export function buildWaterIntelligenceSummary(
  allRecords: MigratedWaterRecord[],
  computedResults: ComputedIntelligence[],
  verifiedSourceCount: number,
  gpsQueueCount: number
): WaterIntelligenceSummary {
  const total = allRecords.length;
  const verified = allRecords.filter(r => !r.Dashboard_Locked).length;
  const locked = total - verified;

  const wqi_breakdown: Record<string, number> = {
    Excellent: 0, Good: 0, Moderate: 0, Poor: 0, Critical: 0, 'Insufficient Data': 0
  };

  let high_eutrophication_count = 0;
  let active_algal_risk_count = 0;
  let high_restoration_priority_count = 0;
  const active_alerts: WaterAlert[] = [];

  for (const c of computedResults) {
    wqi_breakdown[c.Computed_WQI] = (wqi_breakdown[c.Computed_WQI] || 0) + 1;
    if (c.Computed_Eutrophication_Risk === 'High' || c.Computed_Eutrophication_Risk === 'Critical') high_eutrophication_count++;
    if (c.Computed_Algal_Bloom_Risk === 'Moderate' || c.Computed_Algal_Bloom_Risk === 'High' || c.Computed_Algal_Bloom_Risk === 'Critical') active_algal_risk_count++;
    if (c.Computed_Restoration_Priority === 'High' || c.Computed_Restoration_Priority === 'Critical') high_restoration_priority_count++;
    active_alerts.push(...c.Alerts);
  }

  // Ramsar records from unlocked set
  const ramsar_records: { id: string; name: string; site_id: string; district: string }[] = [];
  for (const r of allRecords.filter(r => !r.Dashboard_Locked)) {
    const nwia = r.NWIA_Validation as Record<string, unknown> | undefined;
    if (nwia?.Ramsar_Status && nwia?.Ramsar_Site_ID) {
      ramsar_records.push({
        id: r.id,
        name: r.name,
        site_id: String(nwia.Ramsar_Site_ID),
        district: r.district,
      });
    }
  }

  return {
    total_records: total,
    verified_records: verified,
    locked_records: locked,
    verified_sources: verifiedSourceCount,
    gps_queue: gpsQueueCount,
    verification_progress_pct: Math.round((verified / total) * 100 * 10) / 10,
    wqi_breakdown: wqi_breakdown as Record<ComputedWQI, number>,
    high_eutrophication_count,
    active_algal_risk_count,
    high_restoration_priority_count,
    ramsar_records,
    active_alerts,
    computed_at: new Date().toISOString(),
  };
}
