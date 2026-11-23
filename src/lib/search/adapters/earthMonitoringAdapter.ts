// ─────────────────────────────────────────────────────────────────────────────
// EARTH & HUMAN IMPACT (EHII) + ENVIRONMENTAL MONITORING ADAPTER
// Indexes EHII 7 Systems, Satellite Change Detection Alerts (Tier 1 vs Tier 2),
// Loss & Recovery Ledger, Official CAAQMS vs CAMS Air Quality Stations,
// Noise, Transport, Plastic/Waste, Sewage/STPs, Critical Infrastructure & Networks
// ─────────────────────────────────────────────────────────────────────────────

import { ExcludedResourceRecord, SearchAdapterOutput, SearchDocument } from '../types';
import { enrichWithMultilingualLexicon, resolveSubregion } from '../multilingual-gazetteer';
import { EHII_SUBMODULES, REGIONAL_EARTH_SYSTEMS_INDICATORS } from '@/data/earth-human-impact';
import {
  AQUATIC_CRYOSPHERE_INDICATORS,
  PILOT_OBSERVATORIES,
  RECENT_AQUATIC_CANDIDATE_ALERTS,
  HIMALAYAN_LOSS_RECOVERY_LEDGER,
} from '@/data/aquatic-cryosphere-observatory';
import { GEOGRAPHIC_PILOT_STUDIES, SATELLITE_CHANGE_ALERTS } from '@/data/change-detection-observatory';
import { groundStationsRegistry, airQualityRegistry } from '@/data/air-quality-registry';
import { NOISE_MONITORING_STATIONS } from '@/data/noise-pollution';
import { TRAFFIC_POLLUTION_HOTSPOTS } from '@/data/transportation-pollution';
import { SATELLITE_PLASTIC_HOTSPOTS, RECYCLING_FACILITIES } from '@/data/plastic-pollution';
import { infrastructureData } from '@/data/critical-infrastructure';
import { stpData } from '@/data/stp-infrastructure';
import { monitoringRegistry } from '@/data/monitoring-registry';

export function buildEarthMonitoringIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];
  const excluded: ExcludedResourceRecord[] = [];

  // 1. EHII 7 Core Earth Systems Submodules & Regional Indicators
  for (const sm of EHII_SUBMODULES || []) {
    const lex = enrichWithMultilingualLexicon(`${sm.title} ${sm.subtitle} ${sm.focusSummary}`);
    documents.push({
      id: `ehii-system:${sm.slug}`,
      documentType: 'module_page',
      resultClass: 'module',
      domain: 'earth_human_impact',
      title: sm.title,
      subtitle: `${sm.badge} · ${sm.subtitle}`,
      description: sm.focusSummary,
      canonicalUrl: `/earth-human-impact/${sm.slug}`,
      parentModule: 'Earth & Human Impact (EHII)',
      subregion: 'Multi-Regional',
      tags: ['Earth Systems', sm.badge, ...sm.monitoringTechnologies, ...sm.keyPressureSignals.slice(0, 3)],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'ISFR, IMD, Landsat/Sentinel Multi-Temporal Earth Systems Baseline',
      trustBadge: 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Published Earth System Observatory',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: (sm.primaryMetrics || []).slice(0, 2).map((m) => ({ label: m.label, value: `${m.value} ${m.unit}`.trim() })),
      ctaLabel: 'Open Earth System',
      adapterId: 'earth-monitoring',
    });
  }

  for (const ind of REGIONAL_EARTH_SYSTEMS_INDICATORS || []) {
    const lex = enrichWithMultilingualLexicon(`${ind.name} ${ind.domain} ${ind.evidenceSource}`);
    documents.push({
      id: `ehii-ind:${ind.id}`,
      documentType: 'earth_indicator',
      resultClass: 'scientific_record',
      domain: 'earth_human_impact',
      title: ind.name,
      subtitle: `Earth System Indicator (${ind.domain}) · ${ind.status}`,
      description: `Baseline (${ind.baselinePeriod}): ${ind.baselineValue} ${ind.unit} → Current: ${ind.currentValue} ${ind.unit} (Threshold: ${ind.thresholdLimit} ${ind.unit}). Method: ${ind.measurementMethod}.`,
      canonicalUrl: '/earth-human-impact',
      parentModule: 'Earth & Human Impact (EHII)',
      subregion: 'Multi-Regional',
      tags: ['Earth System Indicator', ind.domain, ind.status],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: ind.evidenceSource,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: ind.status,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Current', value: `${ind.currentValue} ${ind.unit}`.trim() },
        { label: 'Baseline', value: `${ind.baselineValue} ${ind.unit}`.trim() },
      ],
      ctaLabel: 'Inspect EHII Indicator',
      adapterId: 'earth-monitoring',
    });
  }

  // 2. Aquatic & Cryosphere Indicators, Pilot Observatories + Loss & Recovery Ledger (1985–2026)
  for (const aci of AQUATIC_CRYOSPHERE_INDICATORS || []) {
    const lex = enrichWithMultilingualLexicon(`${aci.name} ${aci.category} ${aci.primaryIndicator} ${aci.scientificReference}`);
    const isPeerOrField =
      aci.validationLevel === 'Tier 3 Peer Audited' || aci.validationLevel === 'Tier 2 Field Verified';
    documents.push({
      id: `aquatic-ind:${aci.id}`,
      documentType: 'earth_indicator',
      resultClass: 'scientific_record',
      domain: 'earth_human_impact',
      title: `${aci.name} — ${aci.primaryIndicator}`,
      subtitle: `${aci.validationLevel} (${aci.baselinePeriod}) · ${aci.status}`,
      description: `Observed rate: ${aci.currentObservedRate} (uncertainty: ${aci.uncertaintyMargin}; baseline: ${aci.baselinePeriod}). Method: ${aci.observationMethod}.`,
      canonicalUrl: '/earth-human-impact/aquatic-cryosphere',
      parentModule: 'EHII · Aquatic & Cryosphere Change Observatory',
      subregion: 'Kashmir',
      tags: ['Aquatic & Cryosphere Indicator', aci.category, aci.primaryIndicator, aci.validationLevel, aci.status],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: aci.scientificReference,
      trustBadge: aci.validationLevel === 'Tier 3 Peer Audited' ? 'Peer-Reviewed / Institutional' : isPeerOrField ? 'Field Verified' : 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: '2026-01-01',
      verificationStatus: `${aci.validationLevel} (${aci.uncertaintyMargin})`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Observed Rate', value: aci.currentObservedRate },
        { label: 'Uncertainty', value: aci.uncertaintyMargin },
      ],
      ctaLabel: 'Open Change Indicator',
      adapterId: 'earth-monitoring',
    });
  }

  for (const po of PILOT_OBSERVATORIES || []) {
    const name = po.pilotName || (po as any).name || (po as any).title;
    if (!name) continue;
    const epochSummary = (po.monitoringEpochs || [])
      .map((ep) => {
        const vals = [
          ep.openWaterHa !== undefined ? `open water ${ep.openWaterHa.toLocaleString()} ha` : '',
          ep.wetlandBufferHa !== undefined ? `wetland buffer ${ep.wetlandBufferHa.toLocaleString()} ha` : '',
          ep.glacierAreaKm2 !== undefined ? `glacier area ${ep.glacierAreaKm2} km²` : '',
          ep.terminusPositionMeters !== undefined ? `terminus ${ep.terminusPositionMeters} m` : '',
          ep.springFlowLpm !== undefined ? `spring discharge ${ep.springFlowLpm} L/min` : '',
        ]
          .filter(Boolean)
          .join(', ');
        return `${ep.year} (${vals || ep.sensor})`;
      })
      .join(' → ');
    const findingsText = (po.keyFindings || []).join(' ');
    const lex = enrichWithMultilingualLexicon(`${name} ${po.location} ${findingsText}`);
    const firstYear = po.monitoringEpochs?.[0]?.year;
    const lastYear = po.monitoringEpochs?.[po.monitoringEpochs.length - 1]?.year || 2026;

    documents.push({
      id: `aquatic-obs:${po.id}`,
      documentType: 'earth_indicator',
      resultClass: 'scientific_record',
      domain: 'earth_human_impact',
      title: `${name} — Multi-Epoch Change Observatory`,
      subtitle: `${firstYear ? `${firstYear}–${lastYear}` : 'Multi-Decadal'} Satellite & Field Series · ${po.location}`,
      description: `${findingsText} Epochs: ${epochSummary}. Validation: ${po.fieldValidationMethod} Legal status: ${po.legalCadastralStatus}`,
      canonicalUrl: '/earth-human-impact/aquatic-cryosphere',
      parentModule: 'EHII · Aquatic & Cryosphere Change',
      subregion: resolveSubregion(po.location),
      district: po.location,
      tags: ['Change Detection', 'Multi-Epoch Observatory', ...(po.focalSystems || []), po.location].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: (po.satelliteEvidenceSources || []).slice(0, 2).join('; ') || 'Landsat Collection 2 & Copernicus Sentinel-1/2',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: `${lastYear}-01-01`,
      verificationStatus: `Multi-Epoch Satellite + dGPS/Bathymetric Validated (${firstYear || 1985}–${lastYear})`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        ...(firstYear ? [{ label: 'Epoch Span', value: `${firstYear}–${lastYear}` }] : []),
        ...(po.monitoringEpochs?.[po.monitoringEpochs.length - 1]?.openWaterHa !== undefined
          ? [{ label: `${lastYear} Open Water`, value: `${po.monitoringEpochs[po.monitoringEpochs.length - 1].openWaterHa?.toLocaleString()} ha` }]
          : []),
        ...(po.monitoringEpochs?.[po.monitoringEpochs.length - 1]?.glacierAreaKm2 !== undefined
          ? [{ label: `${lastYear} Ice Area`, value: `${po.monitoringEpochs[po.monitoringEpochs.length - 1].glacierAreaKm2} km²` }]
          : []),
      ].slice(0, 2),
      ctaLabel: 'Open Change Observatory',
      adapterId: 'earth-monitoring',
    });
  }

  for (const ca of RECENT_AQUATIC_CANDIDATE_ALERTS || []) {
    const subregion = resolveSubregion(ca.district);
    const lex = enrichWithMultilingualLexicon(`${ca.targetWaterbody} ${ca.category} Encroachment ${ca.district}`);
    const isConfirmed = ca.auditVerdict === 'Tier 2 Confirmed Encroachment' || ca.auditVerdict === 'Restoration Enforced';
    documents.push({
      id: `aquatic-alert:${ca.id}`,
      documentType: 'satellite_alert',
      resultClass: 'operational_intelligence',
      domain: 'earth_human_impact',
      title: `${ca.targetWaterbody} — ${ca.category} Change & Encroachment Detection`,
      subtitle: `${ca.auditVerdict} (${ca.candidateChangeAreaHa} ha) · ${ca.district}`,
      description: `${ca.summary} Sensor: ${ca.sensorSource} (${ca.detectionSignature}). Ground-truthing: ${ca.groundTruthingStatus}.`,
      canonicalUrl: '/earth-human-impact/aquatic-cryosphere/wetland-encroachment',
      parentModule: 'EHII · Wetland Encroachment & Change Alerts',
      subregion,
      district: ca.district,
      coordinates: Array.isArray(ca.coordinates)
        ? { lat: ca.coordinates[0], lng: ca.coordinates[1], precision: 'exact' }
        : undefined,
      tags: ['Wetland Encroachment', ca.targetWaterbody, ca.category, ca.district, ca.auditVerdict],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: ca.sensorSource,
      trustBadge: isConfirmed ? 'Field Verified' : 'Satellite-Derived',
      temporalNature: 'operational_feed',
      observationTimestamp: ca.firstDetectedDate,
      verificationStatus: `${ca.auditVerdict} · ${ca.groundTruthingStatus}`,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [{ label: 'Candidate Area', value: `${ca.candidateChangeAreaHa} ha` }],
      ctaLabel: 'Inspect Change Alert',
      adapterId: 'earth-monitoring',
    });
  }

  for (const lr of HIMALAYAN_LOSS_RECOVERY_LEDGER || []) {
    const name = lr.ecosystemDomain || (lr as any).assetName || (lr as any).name;
    if (!name) continue;
    const driversText = (lr.primaryDrivers || []).join(', ');
    const restText = (lr.restorationInterventions || []).join('; ');
    const lex = enrichWithMultilingualLexicon(`${name} ${driversText} ${restText} Loss Recovery`);
    documents.push({
      id: `ledger:${lr.id}`,
      documentType: 'earth_indicator',
      resultClass: 'scientific_record',
      domain: 'earth_human_impact',
      title: `${name} — Historical Loss & Recovery Ledger (${lr.baselineYear}–${lr.currentYear})`,
      subtitle: `Net Balance: ${lr.netEcosystemBalanceHa.toLocaleString()} ha (Gross Loss: ${lr.documentedGrossLossHa.toLocaleString()} ha · Active Recovery: ${lr.documentedActiveRecoveryHa.toLocaleString()} ha)`,
      description: `1985 baseline extent: ${lr.historicalExtentHa.toLocaleString()} ha; documented gross loss (1985–2026): ${lr.documentedGrossLossHa.toLocaleString()} ha; verified active recovery: ${lr.documentedActiveRecoveryHa.toLocaleString()} ha; net balance: ${lr.netEcosystemBalanceHa.toLocaleString()} ha (95% CI: ${lr.confidenceIntervalPct}%). Primary drivers: ${driversText}. Interventions: ${restText}.`,
      canonicalUrl: '/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger',
      parentModule: 'EHII · Loss & Recovery Ledger (1985–2026)',
      subregion: 'Kashmir',
      tags: ['Loss & Recovery Ledger', 'Historical Change', '1985-2026', name, lr.evidenceDossierRef].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: `KEW Multi-Decadal Landsat/Sentinel Archive (${lr.evidenceDossierRef})`,
      trustBadge: 'Satellite-Derived',
      temporalNature: 'historical_archive',
      observationTimestamp: `${lr.currentYear}-01-01`,
      verificationStatus: `Multi-Epoch Audited (${lr.confidenceIntervalPct}% CI)`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Gross Loss', value: `-${lr.documentedGrossLossHa.toLocaleString()} ha` },
        { label: 'Active Recovery', value: `+${lr.documentedActiveRecoveryHa.toLocaleString()} ha` },
      ],
      ctaLabel: 'Open 1985–2026 Ledger',
      adapterId: 'earth-monitoring',
    });
  }

  // 3. Central Satellite Change Detection Observatory (SCDO) Pilots & Two-Tier Alerts
  for (const gp of GEOGRAPHIC_PILOT_STUDIES || []) {
    const name = gp.title;
    if (!name) continue;
    const tsText = (gp.timeSeriesMetrics || [])
      .map(
        (m) =>
          `${m.year}: ${m.primaryClassLabel} ${m.primaryClassHectares.toLocaleString()} ha (${m.transformedLabel}: ${m.transformedHectares.toLocaleString()} ha)`
      )
      .join(' → ');
    const lex = enrichWithMultilingualLexicon(`${name} ${gp.subtitle} ${gp.dossierSummary} ${gp.district}`);
    const firstYr = gp.timeSeriesMetrics?.[0]?.year || 2015;
    const lastYr = gp.timeSeriesMetrics?.[gp.timeSeriesMetrics.length - 1]?.year || 2026;
    documents.push({
      id: `scdo-pilot:${gp.id}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'earth_human_impact',
      title: name,
      subtitle: `SCDO Multi-Sensor Pilot (${firstYr}–${lastYr}) · ${gp.district} (${gp.permanentEvidenceDossierId})`,
      description: `${gp.dossierSummary} Time-series: ${tsText}. Drivers: ${gp.primaryTransformationDriver}`,
      canonicalUrl: '/earth-human-impact/change-detection-observatory/historical-comparison',
      parentModule: 'Satellite Change Detection Observatory',
      subregion: resolveSubregion(gp.district),
      district: gp.district,
      coordinates: gp.coordinates ? { lat: gp.coordinates.lat, lng: gp.coordinates.lng, precision: 'centroid' } : undefined,
      tags: ['Satellite Change Observatory', 'Land-Use Change', gp.district, gp.permanentEvidenceDossierId].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: `USGS Landsat Collection 2, Copernicus Sentinel-1/2 & PlanetScope (${gp.permanentEvidenceDossierId})`,
      trustBadge: 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: `${lastYr}-09-01`,
      verificationStatus: 'Peer-Reviewed SCDO Pilot Study',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Window', value: `${firstYr}–${lastYr}` },
        ...(gp.timeSeriesMetrics?.length
          ? [
              {
                label: `${lastYr} Extent`,
                value: `${gp.timeSeriesMetrics[gp.timeSeriesMetrics.length - 1].primaryClassHectares.toLocaleString()} ha`,
              },
            ]
          : []),
      ],
      ctaLabel: 'View Historical Comparison',
      adapterId: 'earth-monitoring',
    });
  }

  for (const sa of SATELLITE_CHANGE_ALERTS || []) {
    const id = sa.alertId;
    if (!id) continue;
    // Exclude rejected/false-positive alerts from active evidentiary claims
    if (sa.status === 'Rejected / Corrected') {
      excluded.push({
        idOrRoute: `scdo-alert:${id}`,
        title: sa.title,
        reason: 'unpublished_draft',
        adapterId: 'earth-monitoring',
      });
      continue;
    }
    const isTier2 = sa.tier === 'Tier 2: Scientifically Verified Finding' || sa.status === 'Verified';
    const lex = enrichWithMultilingualLexicon(
      `${sa.title} ${sa.locationName} ${sa.district} ${sa.verifiedFindingSummary || sa.candidateChangeDescription}`
    );
    documents.push({
      id: `scdo-alert:${id}`,
      documentType: 'satellite_alert',
      resultClass: 'operational_intelligence',
      domain: 'earth_human_impact',
      title: `${sa.locationName} — ${sa.title}`,
      subtitle: `${sa.tier} (${sa.affectedAreaHectares} ha · ${sa.uncertaintyMargin}) · ${sa.district}`,
      description: `${sa.verifiedFindingSummary || sa.candidateChangeDescription} ${sa.scientificReviewNotes || ''} Sensor: ${sa.satelliteSensor}.`,
      canonicalUrl: '/earth-human-impact/change-detection-observatory/detection-alerts',
      parentModule: 'Satellite Change Detection Observatory',
      subregion: resolveSubregion(sa.district),
      district: sa.district,
      coordinates: sa.coordinates
        ? { lat: sa.coordinates.lat, lng: sa.coordinates.lng, precision: 'exact' }
        : undefined,
      tags: ['Satellite Alert', sa.category.replace(/_/g, ' '), sa.locationName, sa.district, sa.tier].filter(Boolean),
      synonyms: [id, ...lex.synonyms],
      multilingualTerms: lex.multilingual,
      source: `${sa.satelliteSensor} (${sa.permanentDossierRef})`,
      trustBadge: isTier2 ? 'Field Verified' : 'Satellite-Derived',
      temporalNature: 'operational_feed',
      observationTimestamp: sa.detectionDate,
      verificationStatus: `${sa.tier} (${sa.status} · ${sa.confidenceScorePct}% confidence)`,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [
        { label: 'Affected Area', value: `${sa.affectedAreaHectares} ha` },
        { label: 'Confidence', value: `${sa.confidenceScorePct}% (${sa.uncertaintyMargin})` },
      ],
      ctaLabel: 'Inspect Detection Alert',
      adapterId: 'earth-monitoring',
    });
  }

  // 4. Environmental Monitoring — Ground Truth CAAQMS vs Modeled CAMS Air Quality Stations
  for (const gs of groundStationsRegistry || []) {
    const subregion = resolveSubregion(gs.district, gs.country_or_region);
    documents.push({
      id: `aq-ground:${gs.id}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: `${gs.name} — ${gs.station_type} Air Quality Station`,
      subtitle: `Physical Ground Truth (${gs.operating_authority}) · ${gs.district}`,
      description: `Calibrated physical ground air-quality station operated by ${gs.operating_authority} (${gs.instrument}; standard: ${gs.reporting_standard}).`,
      canonicalUrl: '/environmental-monitoring/air-pollution',
      parentModule: 'Environmental Monitoring · Air Pollution',
      subregion,
      district: gs.district,
      coordinates: { lat: gs.lat, lng: gs.lng, precision: 'exact' },
      tags: ['Air Quality', 'AQI', 'PM2.5', 'CAAQMS', gs.station_type, gs.district, gs.operating_authority],
      synonyms: ['AQI Station', gs.operating_authority],
      source: gs.operating_authority,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'operational_feed',
      verificationStatus: `Physical Ground Truth (${gs.station_type})`,
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      ctaLabel: 'Open Air Quality Hub',
      adapterId: 'earth-monitoring',
    });
  }

  for (const ms of (airQualityRegistry as any[]) || []) {
    if (!ms?.id || ms.verification_status === 'Official CAAQMS Station') continue;
    const subregion = resolveSubregion(ms.district, ms.country_or_region);
    documents.push({
      id: `aq-grid:${ms.id}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: `${ms.name} — Atmospheric AQI & PM2.5 Grid Node`,
      subtitle: `${ms.verification_status} · ${ms.district}`,
      description: `Regional atmospheric simulation node (${ms.verification_status}) providing Copernicus CAMS / Open-Meteo PM2.5, PM10, NO2, and dual NAQI/US-AQI estimates where physical CAAQMS sensors are absent.`,
      canonicalUrl: '/environmental-monitoring/air-pollution',
      parentModule: 'Environmental Monitoring · Air Pollution',
      subregion,
      district: ms.district,
      coordinates: { lat: ms.lat, lng: ms.lng, precision: 'centroid' },
      tags: ['Air Quality', 'PM2.5', 'CAMS Reanalysis', ms.district],
      synonyms: ['AQI'],
      source: 'Copernicus CAMS & Open-Meteo Atmospheric Quality Reanalysis',
      trustBadge: 'Modelled / Reanalysis',
      temporalNature: 'operational_feed',
      verificationStatus: ms.verification_status,
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      ctaLabel: 'View Atmospheric Grid',
      adapterId: 'earth-monitoring',
    });
  }

  // Noise, Transport, Plastic, Critical Infrastructure, STPs & Monitoring Networks
  for (const ns of (NOISE_MONITORING_STATIONS as any[]) || []) {
    const name = ns.stationName || ns.name;
    if (!name) continue;
    documents.push({
      id: `noise:${ns.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: `${name} — Acoustic Noise Monitoring Station`,
      subtitle: `${ns.zoneCategory || 'Acoustic Zone'} · ${ns.district || ''}`,
      description: `Monitored acoustic Leq/Lden exposure point (${ns.zoneCategory || 'Urban/Silence Zone'}) evaluated against CPCB statutory daytime/nighttime decibel thresholds.`,
      canonicalUrl: '/environmental-monitoring/noise-pollution',
      parentModule: 'Environmental Monitoring · Noise Pollution',
      subregion: resolveSubregion(ns.district, ns.region),
      district: ns.district,
      tags: ['Noise Pollution', 'Acoustic Monitoring', ns.zoneCategory, ns.district].filter(Boolean),
      synonyms: ['Decibel Monitoring'],
      source: 'JKPCC / CPCB Acoustic Standards & KEW Noise Registry',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Statutory Zone Station',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Noise Module',
      adapterId: 'earth-monitoring',
    });
  }

  for (const tp of (TRAFFIC_POLLUTION_HOTSPOTS as any[]) || []) {
    const name = tp.corridorName || tp.name;
    if (!name) continue;
    documents.push({
      id: `transport:${tp.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: `${name} — Vehicular Emission & Congestion Hotspot`,
      subtitle: `Transportation Pollution · ${tp.district || ''}`,
      description: tp.summary || tp.description || 'High-density mountain/urban traffic emission corridor (NOx, BC, PM2.5, non-exhaust brake/tyre wear).',
      canonicalUrl: '/environmental-monitoring/transportation-pollution',
      parentModule: 'Environmental Monitoring · Transportation Pollution',
      subregion: resolveSubregion(tp.district, tp.region),
      district: tp.district,
      tags: ['Transportation Pollution', 'Vehicular Emissions', 'Black Carbon', tp.district].filter(Boolean),
      synonyms: [],
      source: 'RTO Fleet Inventories & KEW Emission Factor Model',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Evaluated Corridor Hotspot',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Transport Emissions',
      adapterId: 'earth-monitoring',
    });
  }

  for (const ph of (SATELLITE_PLASTIC_HOTSPOTS as any[]) || []) {
    const name = ph.siteName || ph.name;
    if (!name) continue;
    documents.push({
      id: `plastic:${ph.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: `${name} — Plastic & Riparian Waste Accumulation Hotspot`,
      subtitle: `Plastic Pollution Audit · ${ph.district || ''}`,
      description: ph.description || ph.summary || 'Documented riparian/lacustrine macro-plastic and solid-waste accumulation zone.',
      canonicalUrl: '/environmental-monitoring/plastic-pollution',
      parentModule: 'Environmental Monitoring · Plastic Pollution',
      subregion: resolveSubregion(ph.district, ph.region),
      district: ph.district,
      tags: ['Plastic Pollution', 'Solid Waste', 'Microplastics', ph.district].filter(Boolean),
      synonyms: [],
      source: 'ULB Audits, JKPCC & Sentinel-2 Optical Waste Screening',
      trustBadge: 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Documented Waste Hotspot',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Plastic Module',
      adapterId: 'earth-monitoring',
    });
  }

  for (const rf of (RECYCLING_FACILITIES as any[]) || []) {
    const name = rf.facilityName || rf.name;
    if (!name) continue;
    documents.push({
      id: `recycling:${rf.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'monitoring_station',
      resultClass: 'scientific_record',
      domain: 'environmental_monitoring',
      title: name,
      subtitle: `Material Recovery / Recycling Facility · ${rf.district || ''}`,
      description: rf.description || `Municipal/authorized plastic and solid waste recovery facility in ${rf.district || 'Western Himalaya'}.`,
      canonicalUrl: '/environmental-monitoring/plastic-pollution',
      parentModule: 'Environmental Monitoring · Waste Infrastructure',
      subregion: resolveSubregion(rf.district, rf.region),
      district: rf.district,
      tags: ['Recycling Facility', 'MRF', 'Waste Management', rf.district].filter(Boolean),
      synonyms: [],
      source: 'JKPCC & Urban Local Bodies Registry',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: rf.status || 'Registered Facility',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Waste Infrastructure',
      adapterId: 'earth-monitoring',
    });
  }

  for (const inf of (infrastructureData as any[]) || []) {
    const name = inf.name || inf.facilityName;
    if (!name) continue;
    documents.push({
      id: `infra:${inf.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'monitoring_station',
      resultClass: 'scientific_record',
      domain: 'environmental_monitoring',
      title: name,
      subtitle: `Critical Environmental Infrastructure (${inf.type || inf.category || 'Asset'}) · ${inf.district || ''}`,
      description: inf.description || inf.notes || `Monitored environmental utility / hydraulic infrastructure asset in ${inf.district || 'Western Himalaya'}.`,
      canonicalUrl: '/environmental-monitoring/critical-infrastructure',
      parentModule: 'Environmental Monitoring · Critical Infrastructure',
      subregion: resolveSubregion(inf.district, inf.scope),
      district: inf.district,
      coordinates:
        typeof inf.latitude === 'number' && typeof inf.longitude === 'number'
          ? { lat: inf.latitude, lng: inf.longitude, precision: 'exact' }
          : undefined,
      tags: ['Critical Infrastructure', inf.type, inf.district].filter(Boolean),
      synonyms: [],
      source: 'PHE / Jal Shakti, JKPDD, LCMA & Municipal Engineering Records',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: inf.status || 'Documented Asset',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Infrastructure Hub',
      adapterId: 'earth-monitoring',
    });
  }

  for (const stp of (stpData as any[]) || []) {
    const name = stp.name || stp.plantName;
    if (!name) continue;
    documents.push({
      id: `stp:${stp.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: name,
      subtitle: `Sewage Treatment Plant (${stp.capacityMld ? `${stp.capacityMld} MLD` : stp.technology || 'STP'}) · ${stp.district || ''}`,
      description: stp.notes || stp.description || `Wastewater treatment plant (${stp.technology || 'STP'}) monitored for BOD/COD compliance and receiving waterbody protection.`,
      canonicalUrl: '/environmental-monitoring/sewage-wastewater',
      parentModule: 'Environmental Monitoring · Sewage & Wastewater',
      subregion: resolveSubregion(stp.district, stp.scope),
      district: stp.district,
      tags: ['STP', 'Sewage Treatment Plant', 'Wastewater', stp.technology, stp.district].filter(Boolean),
      synonyms: ['Wastewater Plant'],
      source: 'LCMA, UEED, JKPCC & NGT Compliance Submissions',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: stp.status || 'Monitored STP',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Sewage Monitoring',
      adapterId: 'earth-monitoring',
    });
  }

  for (const net of monitoringRegistry || []) {
    documents.push({
      id: `mon-net:${net.id}`,
      documentType: 'monitoring_station',
      resultClass: 'operational_intelligence',
      domain: 'environmental_monitoring',
      title: net.name,
      subtitle: `Observation Network (${net.stationCount} Stations · ${net.cadence})`,
      description: `Coverage: ${net.coverage}. Source architecture: ${net.source} (${net.status}).`,
      canonicalUrl: `/monitoring-overview/${net.id}`,
      parentModule: 'Monitoring Networks Overview',
      subregion: 'Multi-Regional',
      districts: net.coverageDetails?.districts,
      tags: ['Monitoring Network', net.category, net.cadence, ...(net.coverageDetails?.districts || [])],
      synonyms: [],
      source: `KEW ${net.source} Observation Registry`,
      trustBadge: net.source === 'satellite-derived' ? 'Satellite-Derived' : 'Peer-Reviewed / Institutional',
      temporalNature: net.cadence === 'live' || net.cadence === 'hourly' ? 'operational_feed' : 'periodic_monitoring',
      verificationStatus: net.status,
      dataFreshness: net.cadence === 'live' ? 'live_telemetry' : 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Stations', value: String(net.stationCount) },
        { label: 'Cadence', value: net.cadence },
      ],
      ctaLabel: 'Open Network Dossier',
      adapterId: 'earth-monitoring',
    });
  }

  return {
    adapterId: 'earth-monitoring',
    adapterName: 'Earth & Human Impact (EHII), Satellite Change & Environmental Monitoring Adapter',
    documents,
    excluded,
    sourceHealthy: true,
  };
}
