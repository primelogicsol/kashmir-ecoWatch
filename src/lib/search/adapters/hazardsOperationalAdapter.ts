// ─────────────────────────────────────────────────────────────────────────────
// HAZARD INTELLIGENCE & OPERATIONAL OBSERVATIONS ADAPTER
// Indexes Atmospheric Systems (WD, Monsoon, Jet Stream), Extreme Weather,
// Floods, Flash Floods, Landslides, Avalanches, Earthquakes, GLOFs,
// Forest Fires, Algal Blooms, Official Alerts (/alerts/[id]) & Risk Updates
// ─────────────────────────────────────────────────────────────────────────────

import { SearchAdapterOutput, SearchDocument, TrustClassification } from '../types';
import { enrichWithMultilingualLexicon, resolveSubregion } from '../multilingual-gazetteer';
import { WD_CORRIDOR_STATIONS, HISTORICAL_WD_RECORDS } from '@/data/hazard-western-disturbances';
import { MONSOON_CORRIDOR_STATIONS, HISTORICAL_MONSOON_RECORDS } from '@/data/hazard-monsoon-dynamics';
import { JET_CIRCULATION_SECTORS, HISTORICAL_CIRCULATION_RECORDS } from '@/data/hazard-jet-stream-circulation';
import {
  EXTREME_WEATHER_CATALOG,
  EXTREME_RAINFALL_WATERSHEDS,
  HISTORICAL_CLOUDBURST_RECORDS,
} from '@/data/hazard-extreme-weather';
import { floodZoneRegistry } from '@/data/hazard-floods';
import { flashFloodData } from '@/data/hazard-flash-floods';
import { landslideData, roadCorridorsData, officialBulletinsData } from '@/data/hazard-landslides';
import { avalancheData } from '@/data/hazard-avalanches';
import { earthquakeData } from '@/data/hazard-earthquakes';
import { glofRegistry } from '@/data/hazard-glofs';
import { forestFireRegistry, HISTORICAL_FOREST_FIRE_ARCHIVE } from '@/data/hazard-forest-fires';
import { primaryMonitoredWaterbodies, bloomEarlyWarningAlerts } from '@/data/algal-bloom-intelligence-hub';
import { alertRegistry } from '@/data/alert-registry';
import { riskUpdates } from '@/data/risk-updates-intelligence';

export function buildHazardsOperationalIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];

  // 1. Atmospheric Systems — Western Disturbances Stations & Historical Events
  for (const st of (WD_CORRIDOR_STATIONS as any[]) || []) {
    const subregion = resolveSubregion(st.district, st.subRegion);
    const lex = enrichWithMultilingualLexicon(`${st.name} Western Disturbance ${st.district}`);
    documents.push({
      id: `wd-station:${st.id}`,
      documentType: 'atmospheric_station',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: `${st.name} — Western Disturbance Synoptic Corridor`,
      subtitle: `Atmospheric Monitoring Node · ${st.district} (${st.elevation_m}m)`,
      description: `Orographic Western Disturbance forecast and rain/snow phase monitoring node (${st.orographic_zone || 'Western Himalaya'}) coupled with ${subregion} winter precipitation and avalanche triggers.`,
      canonicalUrl: '/hazard-intelligence/atmospheric-systems/western-disturbances/dashboard',
      parentModule: 'Hazard Intelligence · Western Disturbances',
      subregion,
      geographicScope: st.scope,
      district: st.district,
      coordinates: { lat: st.latitude, lng: st.longitude, precision: 'exact' },
      tags: ['Western Disturbances', 'Snowfall Forecast', st.district, st.orographic_zone].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Open-Meteo ECMWF/GFS NWP & IMD/PMD Synoptic Guidance',
      trustBadge: 'Modelled / Reanalysis',
      temporalNature: 'forecast',
      verificationStatus: 'Operational NWP Grid Node',
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      metrics: [{ label: 'Elevation', value: `${st.elevation_m}m` }],
      ctaLabel: 'Open WD Dashboard',
      adapterId: 'hazards-operational',
    });
  }

  for (const ev of (HISTORICAL_WD_RECORDS as any[]) || []) {
    const id = ev.id || ev.eventCode || ev.title || ev.period;
    if (!id) continue;
    documents.push({
      id: `wd-hist:${String(id).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'hazard_event',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ev.title || ev.name || `Historical Western Disturbance Event (${ev.period || ev.year})`,
      subtitle: `Historical Synoptic Archive · ${ev.period || ev.date || ''}`,
      description: ev.impacts || ev.summary || ev.description || 'Documented extreme Western Disturbance snowfall and synoptic trough event.',
      canonicalUrl: '/hazard-intelligence/atmospheric-systems/western-disturbances',
      parentModule: 'Hazard Intelligence · Western Disturbances',
      subregion: 'Multi-Regional',
      tags: ['Western Disturbances', 'Historical Weather Event', 'Blizzard', 'Heavy Snow'],
      synonyms: ['WD Archive'],
      source: ev.source || 'IMD / ERA5 Reanalysis Historical Archive',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'historical_archive',
      observationTimestamp: ev.date || ev.period,
      verificationStatus: 'Historical Reanalysis Verified',
      dataFreshness: 'historical_archive',
      accessClassification: 'public',
      ctaLabel: 'View Historical Event',
      adapterId: 'hazards-operational',
    });
  }

  // 2. Monsoon Dynamics & Jet Stream Sectors
  for (const st of (MONSOON_CORRIDOR_STATIONS as any[]) || []) {
    const subregion = resolveSubregion(st.district, st.subRegion);
    documents.push({
      id: `monsoon-node:${st.id}`,
      documentType: 'atmospheric_station',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: `${st.name} — Monsoon Moisture & Orographic Spillover Node`,
      subtitle: `${st.exposureRegime} · ${st.district}`,
      description: `Tracks monsoon moisture incursion, 7-day ERA5 rainfall anomalies, and coupled ${(st.coupledHazards || []).join(', ')} triggers across ${st.exposedSystem || st.district}.`,
      canonicalUrl: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics/dashboard',
      parentModule: 'Hazard Intelligence · Monsoon Dynamics',
      subregion,
      geographicScope: st.scope,
      district: st.district,
      coordinates: { lat: st.latitude, lng: st.longitude, precision: 'exact' },
      tags: ['Monsoon Dynamics', st.exposureRegime, st.district, ...(st.coupledHazards || [])],
      synonyms: ['SW Monsoon', 'ERA5 Rainfall'],
      source: 'ERA5 Reanalysis & Open-Meteo Moisture Diagnostics',
      trustBadge: 'Modelled / Reanalysis',
      temporalNature: 'operational_feed',
      verificationStatus: 'Operational Reanalysis Node',
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      ctaLabel: 'Open Monsoon Dashboard',
      adapterId: 'hazards-operational',
    });
  }

  for (const ev of (HISTORICAL_MONSOON_RECORDS as any[]) || []) {
    const id = ev.id || ev.title || ev.year;
    if (!id) continue;
    documents.push({
      id: `monsoon-hist:${String(id).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'hazard_event',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ev.title || ev.name || `Historical Monsoon Flood & Rainfall Event (${ev.year || ''})`,
      subtitle: `Historical Monsoon Archive · ${ev.period || ev.year || ''}`,
      description: ev.impacts || ev.summary || ev.description || 'Documented monsoon-WD interaction extreme flood event in the Western Himalaya.',
      canonicalUrl: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics',
      parentModule: 'Hazard Intelligence · Monsoon Dynamics',
      subregion: 'Multi-Regional',
      tags: ['Monsoon Flood', 'September 2014', '2010 Leh Cloudburst', 'Historical Flood'],
      synonyms: [],
      source: ev.source || 'IMD, CWC & ERA5 Synoptic Reconstruction',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'historical_archive',
      verificationStatus: 'Historical Event Record',
      dataFreshness: 'historical_archive',
      accessClassification: 'public',
      ctaLabel: 'View Monsoon Archive',
      adapterId: 'hazards-operational',
    });
  }

  for (const js of (JET_CIRCULATION_SECTORS as any[]) || []) {
    const subregion = resolveSubregion(js.district, js.subRegion);
    documents.push({
      id: `jet-sector:${js.id}`,
      documentType: 'atmospheric_station',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: `${js.name} — 250 hPa Jet Stream & 500 hPa Geopotential Sector`,
      subtitle: `Upper-Air Circulation Node · ${js.district}`,
      description: `${js.circulationRole}. Coupled with ${(js.coupledModules || []).join(', ')}.`,
      canonicalUrl: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation/dashboard',
      parentModule: 'Hazard Intelligence · Jet Stream & Circulation',
      subregion,
      geographicScope: js.scope,
      district: js.district,
      coordinates: { lat: js.latitude, lng: js.longitude, precision: 'exact' },
      tags: ['Jet Stream', 'Subtropical Westerly Jet', '250 hPa', '500 hPa Trough', js.district],
      synonyms: ['SWJ', 'Blocking Ridge'],
      source: 'GFS / ECMWF Pressure-Level Upper-Air Telemetry',
      trustBadge: 'Modelled / Reanalysis',
      temporalNature: 'operational_feed',
      verificationStatus: 'Upper-Air Grid Diagnostics',
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      ctaLabel: 'Open Jet Stream Workbench',
      adapterId: 'hazards-operational',
    });
  }

  for (const hc of (HISTORICAL_CIRCULATION_RECORDS as any[]) || []) {
    const id = hc.id || hc.title || hc.period;
    if (!id) continue;
    documents.push({
      id: `jet-hist:${String(id).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'hazard_event',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: hc.title || hc.name,
      subtitle: `Upper-Air Synoptic Case · ${hc.period || hc.year || ''}`,
      description: hc.summary || hc.impacts || hc.description || 'Historical Subtropical Westerly Jet / blocking ridge anomaly.',
      canonicalUrl: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation',
      parentModule: 'Hazard Intelligence · Jet Stream & Circulation',
      subregion: 'Multi-Regional',
      tags: ['Jet Stream', 'Blocking Ridge', 'Historical Circulation'],
      synonyms: [],
      source: 'ERA5 Upper-Air Climatology',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'historical_archive',
      verificationStatus: 'Reanalysis Verified',
      dataFreshness: 'historical_archive',
      accessClassification: 'public',
      ctaLabel: 'Inspect Case',
      adapterId: 'hazards-operational',
    });
  }

  // 3. Extreme Weather Catalog, Watersheds & Historical Cloudbursts
  for (const ew of EXTREME_WEATHER_CATALOG || []) {
    const isOp = ew.operationalStatus === 'OPERATIONAL';
    const lex = enrichWithMultilingualLexicon(`${ew.title} ${ew.mainIndicators.join(' ')}`);
    documents.push({
      id: `extreme-weather:${ew.slug}`,
      documentType: 'module_page',
      resultClass: 'module',
      domain: 'hazard_intelligence',
      title: ew.title,
      subtitle: isOp ? 'Extreme Weather · Operational Module' : `Extreme Weather · Phase ${ew.rolloutPhase} Architecture`,
      description: `${ew.mainIndicators.join(' · ')}. Sources: ${ew.principalSources}. Note: ${ew.scientificLimitationNote}`,
      canonicalUrl: isOp ? ew.href : '/hazard-intelligence/extreme-weather',
      parentModule: 'Hazard Intelligence · Extreme Weather Systems',
      subregion: 'Multi-Regional',
      tags: ['Extreme Weather', ew.shortLabel, ...ew.mainIndicators],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: ew.principalSources,
      trustBadge: isOp ? 'Modelled / Reanalysis' : 'Platform Module',
      temporalNature: isOp ? 'forecast' : 'reference',
      verificationStatus: isOp ? 'Operational Nowcast & Ensemble' : `Planned Phase ${ew.rolloutPhase} Module`,
      dataFreshness: isOp ? 'live_telemetry' : 'static_module',
      accessClassification: 'public',
      ctaLabel: isOp ? 'Open Operational Module' : 'View Rollout Architecture',
      adapterId: 'hazards-operational',
    });
  }

  for (const w of (EXTREME_RAINFALL_WATERSHEDS as any[]) || []) {
    const subregion = resolveSubregion(w.district, w.subRegion);
    documents.push({
      id: `rain-ws:${w.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: `${w.name} — Extreme Rainfall & Cloudburst Watch Basin`,
      subtitle: `31-Member Ensemble & NWP Catchment · ${w.district || subregion}`,
      description: `Monitored steep-gradient Himalayan catchment for 1h/24h extreme precipitation, CAPE convective instability, and downstream flash-flood coupling.`,
      canonicalUrl: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard',
      parentModule: 'Hazard Intelligence · Extreme Rainfall & Cloudbursts',
      subregion,
      district: w.district,
      watershed: w.riverBasin || w.name,
      coordinates:
        typeof w.latitude === 'number' && typeof w.longitude === 'number'
          ? { lat: w.latitude, lng: w.longitude, precision: 'centroid' }
          : undefined,
      tags: ['Extreme Rainfall', 'Cloudburst Watch', w.district, w.riverBasin].filter(Boolean),
      synonyms: ['Cloudburst Basin'],
      source: 'GFS 31-Member Ensemble, Open-Meteo NWP & ERA5',
      trustBadge: 'Modelled / Reanalysis',
      temporalNature: 'forecast',
      verificationStatus: 'Ensemble Monitored Catchment',
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      ctaLabel: 'Open Ensemble Dashboard',
      adapterId: 'hazards-operational',
    });
  }

  for (const cb of (HISTORICAL_CLOUDBURST_RECORDS as any[]) || []) {
    const id = cb.id || cb.title || cb.location;
    if (!id) continue;
    const subregion = resolveSubregion(cb.district, cb.subRegion);
    const lex = enrichWithMultilingualLexicon(`${cb.title || cb.location} Cloudburst ${cb.district || ''}`);
    documents.push({
      id: `cloudburst-hist:${String(id).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'hazard_event',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: cb.title || `${cb.location} Cloudburst / Extreme Downpour (${cb.date || cb.year || ''})`,
      subtitle: `Historical Cloudburst Archive · ${cb.district || subregion}`,
      description: cb.summary || cb.impacts || cb.description || 'Documented Western Himalayan cloudburst / extreme convective rainfall event.',
      canonicalUrl: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts',
      parentModule: 'Hazard Intelligence · Extreme Rainfall & Cloudbursts',
      subregion,
      district: cb.district,
      tags: ['Cloudburst', 'Historical Disaster', 'Flash Flood', cb.district].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: cb.source || 'IMD, NDMA & Peer-Reviewed Hydrometeorological Archive',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'historical_archive',
      observationTimestamp: cb.date || String(cb.year || ''),
      verificationStatus: 'Documented Historical Event',
      dataFreshness: 'historical_archive',
      accessClassification: 'public',
      ctaLabel: 'Inspect Event Record',
      adapterId: 'hazards-operational',
    });
  }

  // 4. Eight Core Hazard Domain Registries
  for (const fz of floodZoneRegistry || []) {
    const subregion = resolveSubregion(fz.district, fz.scope);
    const lex = enrichWithMultilingualLexicon(`${fz.name} ${fz.river_system} Flood ${fz.district}`);
    documents.push({
      id: `flood:${fz.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: fz.name,
      subtitle: `${fz.flood_type} Flood Zone (${fz.risk_level} Risk) · ${fz.district}`,
      description: `River system: ${fz.river_system}. Last major event: ${fz.last_major_event} (${fz.recurrence_interval} return interval). At-risk assets: ${fz.infrastructure_at_risk}.`,
      canonicalUrl: '/hazard-intelligence/floods',
      parentModule: 'Hazard Intelligence · Floods',
      subregion,
      geographicScope: fz.scope,
      district: fz.district,
      watershed: `${fz.river_system} Basin`,
      coordinates: { lat: fz.latitude, lng: fz.longitude, precision: 'centroid' },
      tags: ['Flood Zone', `${fz.flood_type} Flood`, fz.river_system, fz.district, fz.risk_level],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'CWC, J&K Irrigation & Flood Control, WAPDA & Sentinel-1 SAR Floodplain Mapping',
      trustBadge: fz.verification_status === 'Verified' ? 'Field Verified' : 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      verificationStatus: fz.verification_status,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [
        { label: 'Risk', value: fz.risk_level },
        { label: 'River', value: fz.river_system },
      ],
      ctaLabel: 'Open Flood Intelligence',
      adapterId: 'hazards-operational',
    });
  }

  for (const ff of flashFloodData || []) {
    const subregion = resolveSubregion(ff.district, ff.scope);
    documents.push({
      id: `flash-flood:${ff.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ff.name,
      subtitle: `Flash Flood Catchment (${ff.trigger_type}) · ${ff.district}`,
      description: `Steep stream corridor (${ff.nallah_stream}, ${ff.catchment_area_sqkm} km² catchment at ${ff.elevation_m}m; lead response time ~${ff.response_time_hrs}h).`,
      canonicalUrl: '/hazard-intelligence/flash-floods',
      parentModule: 'Hazard Intelligence · Flash Floods',
      subregion,
      geographicScope: ff.scope,
      district: ff.district,
      watershed: ff.nallah_stream,
      coordinates: { lat: ff.latitude, lng: ff.longitude, precision: 'centroid' },
      tags: ['Flash Flood', ff.trigger_type, ff.nallah_stream, ff.district, ff.risk_level],
      synonyms: [ff.nallah_stream],
      source: 'SDMA, IMD, CWC & ICIMOD Flash Flood Susceptibility Inventory',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'operational_feed',
      verificationStatus: ff.verification_status,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [
        { label: 'Trigger', value: ff.trigger_type },
        { label: 'Catchment', value: `${ff.catchment_area_sqkm} km²` },
      ],
      ctaLabel: 'Open Flash Floods',
      adapterId: 'hazards-operational',
    });
  }

  for (const ls of (landslideData as any[]) || []) {
    const subregion = resolveSubregion(ls.district, ls.scope);
    documents.push({
      id: `landslide:${ls.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ls.name,
      subtitle: `${ls.slide_type || 'Landslide'} Susceptibility (${ls.susceptibility || ls.risk_level || 'High'}) · ${ls.district}`,
      description:
        ls.description ||
        `Documented slope instability zone along ${ls.corridor || ls.district} triggered primarily by ${ls.primary_trigger || 'intense rainfall and freeze-thaw'}.`,
      canonicalUrl: '/hazard-intelligence/landslides',
      parentModule: 'Hazard Intelligence · Landslides',
      subregion,
      geographicScope: ls.scope,
      district: ls.district,
      coordinates:
        typeof ls.latitude === 'number' && typeof ls.longitude === 'number'
          ? { lat: ls.latitude, lng: ls.longitude, precision: 'exact' }
          : undefined,
      tags: ['Landslide', ls.slide_type, ls.corridor, ls.district].filter(Boolean),
      synonyms: [ls.corridor].filter(Boolean),
      source: 'Geological Survey of India (GSI Bhusanket), BRO & NASA LHASA 2.0',
      trustBadge: ls.verification_status === 'Official GSI Record' ? 'Peer-Reviewed / Institutional' : 'Field Verified',
      temporalNature: 'operational_feed',
      verificationStatus: ls.verification_status || 'Documented Slope Zone',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'Open Landslide Module',
      adapterId: 'hazards-operational',
    });
  }

  for (const rc of (roadCorridorsData as any[]) || []) {
    const name = rc.corridorName || rc.name;
    if (!name) continue;
    documents.push({
      id: `road-corridor:${rc.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'corridor',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: `${name} — Strategic Mountain Transit & Slope Hazard Corridor`,
      subtitle: `${rc.highwayCode || 'Mountain Highway'} · ${rc.operationalStatus || 'Monitored'}`,
      description:
        rc.summary ||
        `Strategic Himalayan highway corridor monitored for shooting stones, debris flows, snow avalanches, and official traffic advisories.`,
      canonicalUrl: '/hazard-intelligence/landslides',
      parentModule: 'Hazard Intelligence · Landslides & Transit',
      subregion: resolveSubregion(Array.isArray(rc.districts) ? rc.districts.join(', ') : rc.district, rc.scope),
      tags: ['Highway Corridor', rc.highwayCode, 'Slope Stability', 'Traffic Advisory'].filter(Boolean),
      synonyms: [rc.highwayCode, 'NH-44', 'NH-1', 'Mughal Road', 'Karakoram Highway'].filter((x) => name.includes(x) || rc.highwayCode === x),
      source: 'J&K Traffic Police, BRO, NHA & GSI Slope Inventory',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'operational_feed',
      verificationStatus: rc.operationalStatus || 'Monitored Corridor',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'Check Corridor Status',
      adapterId: 'hazards-operational',
    });
  }

  for (const ob of (officialBulletinsData as any[]) || []) {
    const id = ob.id || ob.title;
    if (!id) continue;
    documents.push({
      id: `agency-bulletin:${String(id).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'official_alert',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ob.title || `${ob.agency} Slope & Weather Bulletin`,
      subtitle: `Source-Attributed Agency Bulletin · ${ob.agency || 'Official Agency'}`,
      description: ob.summary || ob.advisoryText || 'Source-attributed official geological/meteorological bulletin.',
      canonicalUrl: '/hazard-intelligence/landslides',
      parentModule: 'Hazard Intelligence · Official Agency Bulletins',
      subregion: resolveSubregion(ob.district, ob.region),
      district: ob.district,
      tags: ['Official Warning', ob.agency, ob.district].filter(Boolean),
      synonyms: [],
      source: ob.agency || 'Official Disaster Management Authority',
      sourceUrl: ob.sourceUrl,
      trustBadge: 'Official Warning',
      temporalNature: 'operational_feed',
      observationTimestamp: ob.issuedAt || ob.date,
      verificationStatus: ob.status || 'Official Agency Attribution',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'View Agency Bulletin',
      adapterId: 'hazards-operational',
    });
  }

  for (const av of avalancheData || []) {
    const subregion = resolveSubregion(av.district, av.scope);
    documents.push({
      id: `avalanche:${av.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: av.name,
      subtitle: `${av.avalanche_type} Avalanche Chute (${av.elevation_m}m, ${av.slope_angle_deg}°) · ${av.district}`,
      description: `High-altitude avalanche path on ${av.road_or_pass} (${av.aspect} aspect, season ${av.season}; ${av.historical_events_count} documented events).`,
      canonicalUrl: '/hazard-intelligence/avalanches',
      parentModule: 'Hazard Intelligence · Avalanches',
      subregion,
      geographicScope: av.scope,
      district: av.district,
      coordinates: { lat: av.latitude, lng: av.longitude, precision: 'exact' },
      tags: ['Avalanche', `${av.avalanche_type} Avalanche`, av.road_or_pass, av.district, av.risk_level],
      synonyms: [av.road_or_pass],
      source: 'DGRE (DRDO), SDMA & Open-Meteo Cryospheric Snowpack Telemetry',
      trustBadge: 'Field Verified',
      temporalNature: 'operational_feed',
      verificationStatus: av.verification_status,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [
        { label: 'Elevation', value: `${av.elevation_m}m` },
        { label: 'Slope', value: `${av.slope_angle_deg}°` },
      ],
      ctaLabel: 'Open Avalanche Module',
      adapterId: 'hazards-operational',
    });
  }

  for (const eq of earthquakeData || []) {
    const subregion = resolveSubregion(eq.district, eq.scope);
    documents.push({
      id: `seismic:${eq.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: eq.name,
      subtitle: `Seismic ${eq.zone_classification} · ${eq.fault_system} (${eq.district})`,
      description: `Tectonic fault sector (${eq.fault_system}, max recorded M${eq.magnitude_max_recorded}, last major event: ${eq.last_significant_event}, ${eq.seismic_gap_status}).`,
      canonicalUrl: '/hazard-intelligence/earthquakes',
      parentModule: 'Hazard Intelligence · Earthquakes',
      subregion,
      geographicScope: eq.scope,
      district: eq.district,
      coordinates: { lat: eq.latitude, lng: eq.longitude, precision: 'centroid' },
      tags: ['Earthquake', 'Seismic Fault', eq.zone_classification, eq.fault_system, eq.district],
      synonyms: [eq.fault_system, '2005 Kashmir Earthquake'],
      source: 'USGS ComCat, NCS India, EMSC & BIS Seismic Zonation',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'operational_feed',
      verificationStatus: eq.verification_status,
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      metrics: [
        { label: 'Zone', value: eq.zone_classification },
        { label: 'Max Mag', value: `M${eq.magnitude_max_recorded}` },
      ],
      ctaLabel: 'Open Seismic Telemetry',
      adapterId: 'hazards-operational',
    });
  }

  for (const gl of glofRegistry || []) {
    const subregion = resolveSubregion(gl.district, gl.scope);
    const lex = enrichWithMultilingualLexicon(`${gl.name} ${gl.glacial_lake_name} ${gl.glacier_source} GLOF`);
    documents.push({
      id: `glof:${gl.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: gl.name,
      subtitle: `GLOF Watch (${gl.dam_type}-Dammed, ${gl.risk_level} Risk) · ${gl.district}`,
      description: `Glacial lake ${gl.glacial_lake_name} fed by ${gl.glacier_source} (${gl.lake_area_sqkm} km², ~${gl.volume_estimate_mcm} MCM at ${gl.elevation_m}m). Downstream exposure: ${gl.downstream_exposure}.`,
      canonicalUrl: '/hazard-intelligence/glofs',
      parentModule: 'Hazard Intelligence · GLOFs',
      subregion,
      geographicScope: gl.scope,
      district: gl.district,
      coordinates:
        typeof gl.latitude === 'number' && typeof gl.longitude === 'number'
          ? { lat: gl.latitude, lng: gl.longitude, precision: 'exact' }
          : undefined,
      tags: ['GLOF', 'Glacial Lake Outburst Flood', gl.glacial_lake_name, gl.glacier_source, gl.district, gl.risk_level],
      synonyms: [gl.glacial_lake_name, gl.glacier_source, ...lex.synonyms],
      multilingualTerms: lex.multilingual,
      source: 'NDMA / CWC Glacial Lake Inventory, ICIMOD HKH & Sentinel-2 Optical Audit',
      trustBadge: gl.verification_status === 'Field Verified' ? 'Field Verified' : 'Satellite-Derived',
      temporalNature: 'operational_feed',
      lastUpdated: gl.last_assessment,
      verificationStatus: gl.verification_status,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [
        { label: 'Lake Area', value: `${gl.lake_area_sqkm} km²` },
        { label: 'Elevation', value: `${gl.elevation_m}m` },
      ],
      ctaLabel: 'Open GLOF Intelligence',
      adapterId: 'hazards-operational',
    });
  }

  // Forest Fire Archive Dedicated Tab + Historical Wildfire Outbreak Events (2016–2025)
  documents.push({
    id: 'forest-fire-archive:hub',
    documentType: 'dashboard_tab',
    resultClass: 'module',
    domain: 'hazard_intelligence',
    title: 'Forest Fire Archive & Satellite Burn-Scar Ledger (2016–2026)',
    subtitle: 'Hazard Intelligence · Forest Fires Historical Archive Tab',
    description:
      'Multi-year Western Himalayan historical forest fire outbreak archive and 32-division chronological fire ledger integrating FSI SNPP-VIIRS, NASA FIRMS MODIS/VIIRS, and Sentinel-2 ΔNBR burn-scar audits.',
    canonicalUrl: '/hazard-intelligence/forest-fires?tab=archive',
    parentModule: 'Hazard Intelligence · Forest Fires',
    subregion: 'Multi-Regional',
    tags: ['Forest Fire Archive', 'Wildfire Archive', 'Burn Scar', 'FSI SNPP-VIIRS', 'NASA FIRMS'],
    synonyms: ['Forest Fire Archive', 'Historical Forest Fires', 'Wildfire History'],
    source: 'Forest Survey of India (FSI), NASA FIRMS & Territorial Forest Divisions',
    trustBadge: 'Peer-Reviewed / Institutional',
    temporalNature: 'historical_archive',
    verificationStatus: 'Published Historical Hazard Archive',
    dataFreshness: 'historical_archive',
    accessClassification: 'public',
    ctaLabel: 'Open Forest Fire Archive',
    adapterId: 'hazards-operational',
  });

  for (const hff of HISTORICAL_FOREST_FIRE_ARCHIVE || []) {
    const lex = enrichWithMultilingualLexicon(`${hff.title} ${hff.districts.join(' ')} Forest Fire Wildfire`);
    documents.push({
      id: `forest-fire-hist:${hff.id}`,
      documentType: 'hazard_event',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: hff.title,
      subtitle: `Historical Forest Fire Archive (${hff.period}) · ~${hff.estimatedAffectedAreaHa.toLocaleString()} ha (${hff.subregion})`,
      description: `${hff.meteorologicalDriver} Ecological impact: ${hff.ecologicalImpact} Fuel complex: ${hff.dominantSpecies}. Uncertainty: ${hff.uncertaintyNote}.`,
      canonicalUrl: '/hazard-intelligence/forest-fires?tab=archive',
      parentModule: 'Hazard Intelligence · Forest Fire Archive',
      subregion: hff.subregion,
      geographicScope: hff.scope,
      district: hff.districts[0],
      districts: hff.districts,
      tags: ['Forest Fire Archive', 'Historical Wildfire', hff.fireRegime, ...hff.districts, String(hff.year)],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: hff.sourceCitation,
      trustBadge:
        hff.verificationStatus === 'FSI & Forest Dept Verified'
          ? 'Peer-Reviewed / Institutional'
          : 'Satellite-Derived',
      temporalNature: 'historical_archive',
      observationTimestamp: `${hff.year}-05-01`,
      verificationStatus: `${hff.verificationStatus} (${hff.uncertaintyNote})`,
      dataFreshness: 'historical_archive',
      accessClassification: 'public',
      metrics: [
        { label: 'Burn Area', value: `~${hff.estimatedAffectedAreaHa.toLocaleString()} ha` },
        { label: 'Period', value: hff.period },
      ],
      ctaLabel: 'Inspect Archive Event',
      adapterId: 'hazards-operational',
    });
  }

  for (const ff of forestFireRegistry || []) {
    const subregion = resolveSubregion(ff.district, ff.scope);
    const lex = enrichWithMultilingualLexicon(`${ff.name} Forest Fire ${ff.district}`);
    documents.push({
      id: `forest-fire:${ff.id}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ff.name,
      subtitle: `${ff.forest_type} Fire Risk Zone (${ff.risk_level}) · ${ff.district}`,
      description: `Forest fire monitoring zone (${ff.area_vulnerable_hectares.toLocaleString()} ha vulnerable; peak season ${ff.fire_season}; last fire event: ${ff.last_fire_event}; detection: ${ff.detection_method}).`,
      canonicalUrl: '/hazard-intelligence/forest-fires',
      parentModule: 'Hazard Intelligence · Forest Fires',
      subregion,
      geographicScope: ff.scope,
      district: ff.district,
      coordinates: { lat: ff.latitude, lng: ff.longitude, precision: 'centroid' },
      tags: ['Forest Fire', 'Wildfire', `${ff.forest_type} Forest`, ff.district, ff.risk_level],
      synonyms: ['MODIS FIRMS', 'VIIRS Fire', ...lex.synonyms],
      multilingualTerms: lex.multilingual,
      source: 'NASA FIRMS (MODIS/VIIRS), FSI Forest Fire Alert System & Territorial Forest Divisions',
      trustBadge: ff.verification_status === 'Field Verified' ? 'Field Verified' : 'Satellite-Derived',
      temporalNature: 'operational_feed',
      observationTimestamp: ff.last_fire_event,
      verificationStatus: ff.verification_status,
      dataFreshness: 'live_telemetry',
      accessClassification: 'public',
      metrics: [
        { label: 'Vulnerable', value: `${ff.area_vulnerable_hectares.toLocaleString()} ha` },
        { label: 'Season', value: ff.fire_season },
      ],
      ctaLabel: 'Open Forest Fire Hub',
      adapterId: 'hazards-operational',
    });
  }

  // Algal Bloom Monitored Waterbodies & Early Warning Alerts
  for (const wb of (primaryMonitoredWaterbodies as any[]) || []) {
    const name = wb.name || wb.waterbodyName;
    if (!name) continue;
    const subregion = resolveSubregion(wb.district, wb.region || wb.scope);
    documents.push({
      id: `algal:${wb.id || wb.waterbodyId || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'hazard_zone',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: `${name} — Eutrophication & Algal Bloom Optical Monitoring`,
      subtitle: `Sentinel-2 NDCI & Cyanotoxin Surveillance · ${wb.district || subregion}`,
      description:
        wb.summary ||
        wb.ecologicalNotes ||
        `Multi-tier trophic state, Sentinel-2 NDCI chlorophyll-a proxy, STP nutrient load, and cyanotoxin safety monitoring for ${name}.`,
      canonicalUrl: '/hazard-intelligence/algal-bloom-intelligence',
      parentModule: 'Hazard Intelligence · Algal Bloom Intelligence',
      subregion,
      district: wb.district,
      coordinates:
        typeof wb.latitude === 'number' && typeof wb.longitude === 'number'
          ? { lat: wb.latitude, lng: wb.longitude, precision: 'centroid' }
          : undefined,
      tags: ['Algal Bloom', 'Eutrophication', 'Cyanobacteria', 'NDCI', name, wb.district].filter(Boolean),
      synonyms: [name, 'Harmful Algal Bloom', 'HAB'],
      source: 'Copernicus Sentinel-2 MSI, JKPCC, LCMA & University of Kashmir Limnology',
      trustBadge: 'Satellite-Derived',
      temporalNature: 'operational_feed',
      verificationStatus: wb.bloomClassification || wb.trophicState || 'Multi-Source Monitored',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'Open Algal Bloom Hub',
      adapterId: 'hazards-operational',
    });
  }

  for (const ba of (bloomEarlyWarningAlerts as any[]) || []) {
    const id = ba.alertId || ba.id;
    if (!id) continue;
    documents.push({
      id: `bloom-alert:${id}`,
      documentType: 'official_alert',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ba.headline || `${ba.waterbodyName} — Algal Bloom Early Warning`,
      subtitle: `Bloom Advisory · ${ba.district || ''}`,
      description: ba.summary || ba.advisoryNote || 'Harmful algal bloom / eutrophication early warning record.',
      canonicalUrl: '/hazard-intelligence/algal-bloom-intelligence',
      parentModule: 'Hazard Intelligence · Algal Bloom Intelligence',
      subregion: resolveSubregion(ba.district, ba.region),
      district: ba.district,
      tags: ['Algal Bloom Alert', ba.waterbodyName, ba.district].filter(Boolean),
      synonyms: [],
      source: ba.issuingSource || 'KEW Algal Bloom Early Warning Engine',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'operational_feed',
      observationTimestamp: ba.issuedAt,
      verificationStatus: ba.validationStatus || 'Evaluated Bloom Signal',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'Inspect Bloom Alert',
      adapterId: 'hazards-operational',
    });
  }

  // 5. Canonical Alert Registry -> /alerts/[id] (NO legacy generic routing!)
  for (const al of alertRegistry || []) {
    const subregion = resolveSubregion(al.district);
    const trust: TrustClassification =
      al.source === 'institutional'
        ? 'Official Warning'
        : al.source === 'expert-verified'
        ? 'Field Verified'
        : 'KEW Scientific Assessment';
    documents.push({
      id: `alert:${al.id}`,
      documentType: 'official_alert',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: al.title,
      subtitle: `${al.severity.toUpperCase()} ${al.category.toUpperCase()} Alert (${al.status}) · ${al.district}`,
      description: `${al.summary} Affected area: ${al.affectedArea}. Issued by: ${al.issuedBy}.`,
      canonicalUrl: `/alerts/${al.id}`,
      parentModule: 'Environmental Alerts & Advisories',
      subregion,
      district: al.district,
      tags: ['Alert', al.category, al.severity, al.status, al.district, al.affectedArea].filter(Boolean),
      synonyms: [al.corridor || ''].filter(Boolean),
      source: al.issuedBy,
      trustBadge: trust,
      temporalNature: al.status === 'expired' || al.status === 'resolved' ? 'historical_archive' : 'operational_feed',
      observationTimestamp: al.issued,
      lastUpdated: al.updated,
      verificationStatus: `${al.source} (${al.status})`,
      dataFreshness: al.status === 'active' ? 'recent_operational' : 'historical_archive',
      accessClassification: 'public',
      metrics: [
        { label: 'Severity', value: al.severity.toUpperCase() },
        { label: 'Status', value: al.status.toUpperCase() },
      ],
      ctaLabel: 'Open Alert Record',
      adapterId: 'hazards-operational',
    });
  }

  // 6. Risk Intelligence Updates -> /risk-updates/[id]
  for (const ru of (riskUpdates as any[]) || []) {
    if (!ru?.id) continue;
    const dists = ru.geography?.districts || (ru.district ? [ru.district] : []);
    const subregion = resolveSubregion(dists.join(', '));
    documents.push({
      id: `risk-update:${ru.id}`,
      documentType: 'risk_update',
      resultClass: 'operational_intelligence',
      domain: 'hazard_intelligence',
      title: ru.title,
      subtitle: `Situational Risk Assessment (${ru.severity?.toUpperCase() || 'MONITORING'}) · ${dists.slice(0, 3).join(', ') || 'Western Himalaya'}`,
      description: ru.summary || ru.executiveSummary || 'Cross-system situational hazard outlook and preparedness briefing.',
      canonicalUrl: `/risk-updates/${ru.id}`,
      parentModule: 'Hazard Intelligence · Situational Risk Updates',
      subregion,
      district: dists[0],
      districts: dists.length ? dists : undefined,
      watershed: ru.geography?.basins?.join(', '),
      tags: ['Risk Update', ru.hazardType, ru.severity, ...dists].filter(Boolean),
      synonyms: ru.geography?.corridors || [],
      source: 'KEW Multi-Hazard Situational Synthesis',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: ru.status === 'archived' ? 'historical_archive' : 'operational_feed',
      lastUpdated: ru.updatedAt || ru.publishedAt,
      verificationStatus: `KEW Situational Assessment (${ru.status || 'active'})`,
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'Read Risk Briefing',
      adapterId: 'hazards-operational',
    });
  }

  return {
    adapterId: 'hazards-operational',
    adapterName: 'Atmospheric, Extreme Weather, 9 Hazard Domains, Alerts & Risk Updates Adapter',
    documents,
    excluded: [],
    sourceHealthy: true,
  };
}
