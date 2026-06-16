import {
  RiskLevel,
  WaterQualityStatus,
  VulnerabilityLevel
} from '@/types/hydrology';

/**
 * 1. Water Quality Index Model
 * Outputs: Excellent | Good | Moderate | Poor | Critical
 */
export function calculateWaterQualityIndex(
  pH: number | null,
  do_mgL: number | null,
  bod: number | null,
  cod: number | null,
  turbidity: number | null,
  nitrate: number | null,
  fecalColiform: number | null
): WaterQualityStatus {
  let score = 100;
  
  if (pH && (pH < 6.5 || pH > 8.5)) score -= 15;
  if (do_mgL && do_mgL < 5.0) score -= 25;
  if (bod && bod > 3.0) score -= 20;
  if (turbidity && turbidity > 10.0) score -= 10;
  if (nitrate && nitrate > 45) score -= 20;
  if (fecalColiform && fecalColiform > 500) score -= 30;

  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Moderate';
  if (score >= 30) return 'Poor';
  return 'Critical';
}

/**
 * 2. Eutrophication Risk Model
 */
export function calculateEutrophicationRisk(
  totalPhosphorus: number | null,
  totalNitrogen: number | null,
  chlorophyll_a: number | null,
  sewagePressure: boolean,
  waterResidenceTimeDays: number
): RiskLevel {
  let riskScore = 0;

  if (totalPhosphorus && totalPhosphorus > 0.05) riskScore += 3;
  if (totalNitrogen && totalNitrogen > 1.5) riskScore += 2;
  if (chlorophyll_a && chlorophyll_a > 10) riskScore += 3;
  if (sewagePressure) riskScore += 3;
  if (waterResidenceTimeDays > 30) riskScore += 2;

  if (riskScore >= 10) return 'Critical';
  if (riskScore >= 7) return 'High';
  if (riskScore >= 5) return 'Moderate';
  if (riskScore >= 3) return 'Watch';
  return 'Low';
}

/**
 * 3. Algal Bloom Risk Model
 */
export function calculateAlgalBloomRisk(
  ndci: number | null,
  fai: number | null,
  chlorophyll_a: number | null,
  waterTemp: number | null,
  lowFlowStagnation: boolean
): RiskLevel {
  let riskScore = 0;

  if (ndci && ndci > 0.2) riskScore += 3;
  if (fai && fai > 0.05) riskScore += 2;
  if (chlorophyll_a && chlorophyll_a > 15) riskScore += 3;
  if (waterTemp && waterTemp > 20) riskScore += 2;
  if (lowFlowStagnation) riskScore += 2;

  if (riskScore >= 9) return 'Critical';
  if (riskScore >= 7) return 'High';
  if (riskScore >= 5) return 'Moderate';
  if (riskScore >= 3) return 'Watch';
  return 'Low';
}

/**
 * 4. Spring Vulnerability Model
 */
export function calculateSpringVulnerability(
  dischargeTrend: 'Declining' | 'Stable' | 'Increasing',
  seasonality: 'Perennial' | 'Seasonal',
  dryingHistory: boolean,
  communityDependence: 'High' | 'Moderate' | 'Low',
  landUseChange: boolean
): VulnerabilityLevel {
  let riskScore = 0;

  if (dischargeTrend === 'Declining') riskScore += 3;
  if (seasonality === 'Seasonal') riskScore += 2;
  if (dryingHistory) riskScore += 3;
  if (communityDependence === 'High') riskScore += 2;
  if (landUseChange) riskScore += 2;

  if (riskScore >= 9) return 'Critical';
  if (riskScore >= 7) return 'High';
  if (riskScore >= 5) return 'Moderate';
  return 'Low';
}

/**
 * 5. Wetland Health Index
 */
export function calculateWetlandHealthIndex(
  waterAreaChange: 'Shrinking' | 'Stable' | 'Expanding',
  vegetationCondition: 'Degraded' | 'Moderate' | 'Healthy',
  pollutionRisk: RiskLevel,
  encroachment: boolean
): 'Healthy' | 'Moderate' | 'Degraded' | 'Critical' {
  let score = 100;

  if (waterAreaChange === 'Shrinking') score -= 30;
  if (vegetationCondition === 'Degraded') score -= 30;
  if (vegetationCondition === 'Moderate') score -= 15;
  if (pollutionRisk === 'High' || pollutionRisk === 'Critical') score -= 30;
  if (encroachment) score -= 30;

  if (score >= 80) return 'Healthy';
  if (score >= 50) return 'Moderate';
  if (score >= 20) return 'Degraded';
  return 'Critical';
}

/**
 * 6. Watershed Risk Index
 */
export function calculateWatershedRisk(
  forestCoverPercent: number,
  slope: 'Steep' | 'Moderate' | 'Flat',
  erosionRisk: 'High' | 'Moderate' | 'Low',
  floodHistory: boolean
): RiskLevel {
  let score = 0;

  if (forestCoverPercent < 20) score += 3;
  else if (forestCoverPercent < 40) score += 2;

  if (slope === 'Steep') score += 2;
  if (erosionRisk === 'High') score += 3;
  if (floodHistory) score += 2;

  if (score >= 8) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Moderate';
  return 'Low';
}

/**
 * 7. Flood Risk Model
 */
export function calculateFloodRisk(
  historicalFloods: boolean,
  floodplainOccupation: 'High' | 'Moderate' | 'Low',
  wetlandLoss: boolean,
  drainageCapacity: 'Poor' | 'Adequate' | 'Good'
): RiskLevel {
  let score = 0;

  if (historicalFloods) score += 3;
  if (floodplainOccupation === 'High') score += 3;
  if (floodplainOccupation === 'Moderate') score += 1;
  if (wetlandLoss) score += 2;
  if (drainageCapacity === 'Poor') score += 3;

  if (score >= 9) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Moderate';
  return 'Low';
}

/**
 * 8. Glacier Vulnerability Model
 */
export function calculateGlacierVulnerability(
  glacierRetreatRate: 'High' | 'Moderate' | 'Low',
  downstreamDependency: 'High' | 'Moderate' | 'Low',
  glofRisk: RiskLevel
): VulnerabilityLevel {
  let score = 0;

  if (glacierRetreatRate === 'High') score += 4;
  if (glacierRetreatRate === 'Moderate') score += 2;
  
  if (downstreamDependency === 'High') score += 3;
  if (downstreamDependency === 'Moderate') score += 1;

  if (glofRisk === 'Critical' || glofRisk === 'High') score += 4;

  if (score >= 9) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 3) return 'Moderate';
  return 'Low';
}

/**
 * 9. Restoration Priority Model
 */
export function calculateRestorationPriority(
  degradationSeverity: RiskLevel,
  communityDependence: 'High' | 'Moderate' | 'Low',
  biodiversityValue: 'High' | 'Moderate' | 'Low'
): RiskLevel {
  let score = 0;

  if (degradationSeverity === 'Critical') score += 4;
  else if (degradationSeverity === 'High') score += 3;
  else if (degradationSeverity === 'Moderate') score += 1;

  if (communityDependence === 'High') score += 3;
  if (biodiversityValue === 'High') score += 3;

  if (score >= 8) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Moderate';
  return 'Low';
}

/**
 * 10. Groundwater Stress Model
 */
export function calculateGroundwaterStress(
  extractionTrend: 'High' | 'Moderate' | 'Low',
  rechargeTrend: 'Declining' | 'Stable' | 'Increasing',
  qualityRisk: RiskLevel
): 'Critical' | 'Stressed' | 'Watch' | 'Sustainable' {
  let score = 0;

  if (extractionTrend === 'High') score += 4;
  else if (extractionTrend === 'Moderate') score += 2;

  if (rechargeTrend === 'Declining') score += 3;

  if (qualityRisk === 'Critical' || qualityRisk === 'High') score += 3;

  if (score >= 8) return 'Critical';
  if (score >= 5) return 'Stressed';
  if (score >= 3) return 'Watch';
  return 'Sustainable';
}
