'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  ShieldCheck, AlertTriangle, MapPin, Activity, Waves, TreePine,
  Droplets, Flame, Mountain, Wind, FlaskConical, CheckCircle2,
  TrendingUp, TrendingDown, Minus, ExternalLink, Info, Database,
  Zap, RefreshCw, Building2, CloudRain
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type ResilienceDomain =
  | 'Critical Infrastructure'
  | 'Water System'
  | 'Wastewater & Sanitation'
  | 'Solid Waste'
  | 'Flood Resilience'
  | 'Landslide Resilience'
  | 'Climate Extremes'
  | 'Forest Fire Resilience'
  | 'Ecosystem Recovery'
  | 'Community Preparedness'
  | 'Remote Area Access'
  | 'Restoration Readiness';

export type OperationalStatus = 'Stable' | 'Degraded' | 'At Risk' | 'Disrupted' | 'Under Restoration';
export type PriorityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type RiskExposure = 'Low' | 'Moderate' | 'High' | 'Extreme';
export type RecoveryCapacity = 'Strong' | 'Adequate' | 'Limited' | 'Critical Gap';

export interface ResilienceRecord {
  id: string;
  name: string;
  district: string;
  scope: string;
  resilienceDomain: ResilienceDomain;
  assetOrSystemType: string;
  operationalStatus: OperationalStatus;
  priorityLevel: PriorityLevel;
  riskExposure: RiskExposure;
  resilienceScore: number; // 0–100
  recoveryCapacity: RecoveryCapacity;
  serviceArea: string;
  keyStressors: string[];
  responseReadiness: 'High' | 'Moderate' | 'Low' | 'Absent';
  dataConfidence: 'High' | 'Medium' | 'Low' | 'Modelled';
  lastUpdated: string;
  notes: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — 30 resilience records across all scopes and domains
// ─────────────────────────────────────────────────────────────────────────────

const resilienceRegistry: ResilienceRecord[] = [
  // ── Kashmir Core ──────────────────────────────────────────────────────────
  {
    id: 'kew-er-001', name: 'Srinagar Urban Flood Resilience', district: 'Srinagar', scope: 'Kashmir Core',
    resilienceDomain: 'Flood Resilience', assetOrSystemType: 'Urban Flood Buffer System',
    operationalStatus: 'At Risk', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 28, recoveryCapacity: 'Critical Gap', serviceArea: 'Srinagar Metropolitan Area',
    keyStressors: ['Wetland encroachment', 'Drainage system overload', 'Rising flood peaks'],
    responseReadiness: 'Moderate', dataConfidence: 'High', lastUpdated: '2026-06-22',
    notes: 'Dal-Nigeen wetland complex has lost 30% buffer capacity since 1990. Urban drainage fails under 50mm/day rain events.',
  },
  {
    id: 'kew-er-002', name: 'Dal-Nigeen Lake Ecosystem Resilience', district: 'Srinagar', scope: 'Kashmir Core',
    resilienceDomain: 'Ecosystem Recovery', assetOrSystemType: 'Lacustrine Ecosystem',
    operationalStatus: 'Degraded', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 25, recoveryCapacity: 'Critical Gap', serviceArea: 'Dal-Nigeen Basin, 18 km²',
    keyStressors: ['Eutrophication', 'Encroachment', 'Macrophyte overgrowth', 'Sewage inflow'],
    responseReadiness: 'Moderate', dataConfidence: 'High', lastUpdated: '2026-06-20',
    notes: 'NLCP interventions ongoing. Lake depth reduced by 1.8m over 40 years. Recovery trajectory: 15–20 years under optimal conditions.',
  },
  {
    id: 'kew-er-003', name: 'Jhelum River Corridor Resilience', district: 'Srinagar', scope: 'Kashmir Core',
    resilienceDomain: 'Water System', assetOrSystemType: 'River Corridor System',
    operationalStatus: 'Degraded', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 32, recoveryCapacity: 'Limited', serviceArea: 'Jhelum valley, 3000+ km² catchment',
    keyStressors: ['Flood peak amplification', 'Sand mining', 'Floodplain encroachment'],
    responseReadiness: 'Low', dataConfidence: 'High', lastUpdated: '2026-06-19',
    notes: '2014 flood caused ₹1,700 crore in damages. River corridor encroachment ongoing. Flood forecasting system partially operational.',
  },
  {
    id: 'kew-er-004', name: 'Wular Wetland Buffer Resilience', district: 'Bandipora', scope: 'Kashmir Core',
    resilienceDomain: 'Ecosystem Recovery', assetOrSystemType: 'Floodplain Wetland Buffer',
    operationalStatus: 'Degraded', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 41, recoveryCapacity: 'Limited', serviceArea: 'Wular Lake basin, 189 km²',
    keyStressors: ['Sedimentation', 'Invasive Trapa', 'Agricultural encroachment'],
    responseReadiness: 'Moderate', dataConfidence: 'High', lastUpdated: '2026-06-18',
    notes: 'Wular is Asia\'s largest freshwater lake. Shrinking due to sedimentation from Jhelum. NWIA restoration programme active.',
  },
  {
    id: 'kew-er-005', name: 'Budgam Drainage Resilience', district: 'Budgam', scope: 'Kashmir Core',
    resilienceDomain: 'Wastewater & Sanitation', assetOrSystemType: 'Urban-Rural Drainage System',
    operationalStatus: 'At Risk', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 38, recoveryCapacity: 'Limited', serviceArea: 'Budgam district, 1,400 km²',
    keyStressors: ['Hokersar wetland stress', 'Drain blockages', 'Rapid urban growth'],
    responseReadiness: 'Low', dataConfidence: 'Medium', lastUpdated: '2026-06-15',
    notes: 'Drainage systems feeding Hokersar Ramsar site are partially blocked. Urban growth adding 15% load annually.',
  },
  {
    id: 'kew-er-006', name: 'Anantnag Water Source Resilience', district: 'Anantnag', scope: 'Kashmir Core',
    resilienceDomain: 'Water System', assetOrSystemType: 'Spring & River Source Network',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 60, recoveryCapacity: 'Adequate', serviceArea: 'Anantnag district, 3,574 km²',
    keyStressors: ['Spring discharge decline', 'Agricultural runoff', 'Climate variability'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-06-14',
    notes: 'Verinag spring and Lidder river system provide critical water security. Spring flow declined 18% in 20 years.',
  },
  {
    id: 'kew-er-007', name: 'Kupwara Snow Isolation Resilience', district: 'Kupwara', scope: 'Kashmir Core',
    resilienceDomain: 'Remote Area Access', assetOrSystemType: 'Winter Access & Supply Corridor',
    operationalStatus: 'Stable', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 52, recoveryCapacity: 'Adequate', serviceArea: '16 remote hamlets, Lolab-Keran valley',
    keyStressors: ['Avalanche road closures', 'Snow isolation', 'Supply chain disruption'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-06-10',
    notes: 'Keran and Lolab valley communities isolated up to 90 days annually. Emergency supply pre-positioning inadequate.',
  },
  {
    id: 'kew-er-008', name: 'Shopian Orchard Climate Resilience', district: 'Shopian', scope: 'Kashmir Core',
    resilienceDomain: 'Climate Extremes', assetOrSystemType: 'Horticultural Landscape System',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 56, recoveryCapacity: 'Adequate', serviceArea: 'South Kashmir apple belt, 32,000 ha',
    keyStressors: ['Late frost events', 'Hailstorm frequency', 'Shifted chill hours'],
    responseReadiness: 'Low', dataConfidence: 'Medium', lastUpdated: '2026-06-08',
    notes: 'Apple industry worth ₹8,000 crore annually. Chill hours declining 12% per decade. No formal crop insurance system.',
  },
  {
    id: 'kew-er-009', name: 'Baramulla Forest Fire Resilience', district: 'Baramulla', scope: 'Kashmir Core',
    resilienceDomain: 'Forest Fire Resilience', assetOrSystemType: 'Temperate Forest Fire System',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 62, recoveryCapacity: 'Adequate', serviceArea: 'Gulmarg-Baramulla forest zone, 680 km²',
    keyStressors: ['Dry spring conditions', 'Resin-rich pine fuel load', 'Limited fire tracks'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-06-06',
    notes: 'Gulmarg ecosystem at moderate fire risk. Fire line maintenance programme partially funded. MODIS alerting active.',
  },
  {
    id: 'kew-er-010', name: 'Pulwama Agricultural Soil Resilience', district: 'Pulwama', scope: 'Kashmir Core',
    resilienceDomain: 'Restoration Readiness', assetOrSystemType: 'Paddy Landscape System',
    operationalStatus: 'Degraded', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 40, recoveryCapacity: 'Limited', serviceArea: 'Pulwama rice belt, 25,000 ha',
    keyStressors: ['Waterlogging', 'Soil salinisation', 'Agrochemical runoff'],
    responseReadiness: 'Low', dataConfidence: 'High', lastUpdated: '2026-06-20',
    notes: 'Intensive paddy cultivation causing topsoil compaction. Restoration requires soil health intervention and crop rotation.',
  },

  // ── Trans-Divisional ───────────────────────────────────────────────────────
  {
    id: 'kew-er-011', name: 'NH-44 Landslide Corridor Resilience', district: 'Ramban', scope: 'Trans-Divisional',
    resilienceDomain: 'Landslide Resilience', assetOrSystemType: 'Critical Road Corridor',
    operationalStatus: 'At Risk', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 22, recoveryCapacity: 'Critical Gap', serviceArea: 'Jammu–Srinagar NH-44, 270 km critical zone',
    keyStressors: ['Geological instability', 'Monsoon saturation', 'Road widening debris'],
    responseReadiness: 'Moderate', dataConfidence: 'High', lastUpdated: '2026-06-21',
    notes: 'NH-44 blocked 90+ days/year. 40 black spots identified. NHDCIL slope stabilisation ongoing. Banihal tunnel reduces risk.',
  },
  {
    id: 'kew-er-012', name: 'Kishtwar Hydropower Corridor Resilience', district: 'Kishtwar', scope: 'Trans-Divisional',
    resilienceDomain: 'Critical Infrastructure', assetOrSystemType: 'Hydropower & Grid Corridor',
    operationalStatus: 'Stable', priorityLevel: 'Critical', riskExposure: 'High',
    resilienceScore: 55, recoveryCapacity: 'Adequate', serviceArea: 'Chenab basin, 7,500 MW installed capacity',
    keyStressors: ['Seismic zone IV exposure', 'Flash flood risk', 'Remote access constraints'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-06-15',
    notes: 'Pakal Dul and Kiru hydropower projects under construction. Seismic monitoring active. Emergency shutdown protocol exists.',
  },
  {
    id: 'kew-er-013', name: 'Ramban Critical Road Resilience', district: 'Ramban', scope: 'Trans-Divisional',
    resilienceDomain: 'Remote Area Access', assetOrSystemType: 'Mountain Road Network',
    operationalStatus: 'Disrupted', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 18, recoveryCapacity: 'Critical Gap', serviceArea: 'Banihal-Ramban zone, 80 km',
    keyStressors: ['Landslide frequency', 'Debris flow events', 'Construction zone instability'],
    responseReadiness: 'Low', dataConfidence: 'High', lastUpdated: '2026-06-22',
    notes: 'Highest disruption frequency on Jammu-Srinagar corridor. Road openable within 24–72 hours post event. Alternative air supply possible.',
  },
  {
    id: 'kew-er-014', name: 'Chenab River Flood Resilience', district: 'Doda', scope: 'Trans-Divisional',
    resilienceDomain: 'Flood Resilience', assetOrSystemType: 'River Flood Defence System',
    operationalStatus: 'At Risk', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 42, recoveryCapacity: 'Limited', serviceArea: 'Chenab valley, Doda-Kishtwar',
    keyStressors: ['Flash flood susceptibility', 'Upstream glacier melt', 'Narrow valley confinement'],
    responseReadiness: 'Low', dataConfidence: 'Medium', lastUpdated: '2026-06-12',
    notes: 'Chenab flash floods kill dozens annually. Limited early-warning coverage in upper reaches. Community preparedness low.',
  },
  {
    id: 'kew-er-015', name: 'Udhampur Forest Resilience', district: 'Udhampur', scope: 'Trans-Divisional',
    resilienceDomain: 'Forest Fire Resilience', assetOrSystemType: 'Chir Pine Forest System',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 60, recoveryCapacity: 'Adequate', serviceArea: 'Udhampur-Ramnagar forest zone, 450 km²',
    keyStressors: ['Dry season fire risk', 'Resin tapping pressure', 'Encroachment'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-06-05',
    notes: 'Chir pine forests at elevated fire risk April–June. Fire watchtower network partially operational.',
  },
  {
    id: 'kew-er-016', name: 'Leh Cold-Arid Water Resilience', district: 'Leh', scope: 'Trans-Divisional',
    resilienceDomain: 'Water System', assetOrSystemType: 'Glacial-Fed Water Supply System',
    operationalStatus: 'Stable', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 57, recoveryCapacity: 'Adequate', serviceArea: 'Leh town and Indus valley settlements',
    keyStressors: ['Glacier retreat', 'Reduced snowpack', 'Summer peak demand surge'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-06-10',
    notes: 'Leh water supply 70% glacier-dependent. Long-term trajectory: 30–50% supply reduction by 2060 under RCP 4.5.',
  },
  {
    id: 'kew-er-017', name: 'Kargil GLOF & Flash-Flood Resilience', district: 'Kargil', scope: 'Trans-Divisional',
    resilienceDomain: 'Flood Resilience', assetOrSystemType: 'GLOF Early Warning System',
    operationalStatus: 'At Risk', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 30, recoveryCapacity: 'Critical Gap', serviceArea: 'Suru valley and Zanskar corridor',
    keyStressors: ['Glacial lake expansion', 'GLOF events', 'Narrow gorge channels'],
    responseReadiness: 'Low', dataConfidence: 'Medium', lastUpdated: '2026-06-08',
    notes: '12 glacial lakes in danger zone identified. GLOF early warning system coverage: 3 of 12 lakes. Evacuation routes undefined.',
  },
  {
    id: 'kew-er-018', name: 'Poonch Community Resilience', district: 'Poonch', scope: 'Trans-Divisional',
    resilienceDomain: 'Community Preparedness', assetOrSystemType: 'Community Disaster Readiness',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 55, recoveryCapacity: 'Adequate', serviceArea: 'Poonch district, 1,674 km²',
    keyStressors: ['Flash flood exposure', 'Landslide risk', 'Limited health infrastructure'],
    responseReadiness: 'Moderate', dataConfidence: 'Low', lastUpdated: '2026-05-28',
    notes: 'Pir Panjal area communities have basic disaster awareness. First responder training incomplete.',
  },

  // ── Transboundary / Extended ───────────────────────────────────────────────
  {
    id: 'kew-er-019', name: 'Neelum Valley Ecosystem Resilience', district: 'Neelum', scope: 'Transboundary / Extended',
    resilienceDomain: 'Ecosystem Recovery', assetOrSystemType: 'Montane River Ecosystem',
    operationalStatus: 'Stable', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 62, recoveryCapacity: 'Adequate', serviceArea: 'Neelum valley, 3,621 km²',
    keyStressors: ['Hydropower construction impacts', 'Landslide frequency', 'Deforestation'],
    responseReadiness: 'Low', dataConfidence: 'Low', lastUpdated: '2026-06-01',
    notes: 'Neelum River ecosystem under dual stress from hydropower development and seismicity. Limited environmental monitoring capacity.',
  },
  {
    id: 'kew-er-020', name: 'Muzaffarabad Earthquake Resilience', district: 'Muzaffarabad', scope: 'Transboundary / Extended',
    resilienceDomain: 'Critical Infrastructure', assetOrSystemType: 'Urban Seismic Safety System',
    operationalStatus: 'Degraded', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 27, recoveryCapacity: 'Critical Gap', serviceArea: 'Muzaffarabad city and peri-urban zone',
    keyStressors: ['Active fault proximity', 'Building stock vulnerability', 'Post-2005 reconstruction gaps'],
    responseReadiness: 'Moderate', dataConfidence: 'Low', lastUpdated: '2026-05-25',
    notes: 'Located at epicentre of 2005 Mw 7.6 earthquake. Significant building stock remains pre-code. Fault monitoring limited.',
  },
  {
    id: 'kew-er-021', name: 'AJK Landslide Corridor Resilience', district: 'Hattian Bala', scope: 'Transboundary / Extended',
    resilienceDomain: 'Landslide Resilience', assetOrSystemType: 'Landslide Risk Zone',
    operationalStatus: 'At Risk', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 20, recoveryCapacity: 'Critical Gap', serviceArea: 'Hattian Bala-Jhelum valley road',
    keyStressors: ['2005 earthquake legacy slope failures', 'Monsoon saturation', 'Exposed regolith'],
    responseReadiness: 'Low', dataConfidence: 'Low', lastUpdated: '2026-05-20',
    notes: 'Hattian Bala Landslide (2005) formed Attabad-type dam lake. Slopes remain unstable. Monitoring absent.',
  },
  {
    id: 'kew-er-022', name: 'Gilgit River Flood Resilience', district: 'Gilgit', scope: 'Transboundary / Extended',
    resilienceDomain: 'Flood Resilience', assetOrSystemType: 'Glacial River Flood System',
    operationalStatus: 'Stable', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 50, recoveryCapacity: 'Adequate', serviceArea: 'Gilgit River confluence zone',
    keyStressors: ['GLOF from Karakoram glaciers', 'Rapid urbanisation on floodplain', 'Climate change'],
    responseReadiness: 'Moderate', dataConfidence: 'Low', lastUpdated: '2026-05-18',
    notes: 'Gilgit at confluence of Gilgit and Hunza rivers. GLOF risk elevated. NDMA early warning coverage moderate.',
  },
  {
    id: 'kew-er-023', name: 'Hunza-Attabad GLOF Resilience', district: 'Hunza', scope: 'Transboundary / Extended',
    resilienceDomain: 'Flood Resilience', assetOrSystemType: 'GLOF Barrier & Lake Management',
    operationalStatus: 'Stable', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 48, recoveryCapacity: 'Adequate', serviceArea: 'Hunza valley downstream, 80 km',
    keyStressors: ['Attabad Lake level fluctuation', 'Tunnel spillway capacity', 'Karakoram ice surge glaciers'],
    responseReadiness: 'Moderate', dataConfidence: 'Medium', lastUpdated: '2026-05-20',
    notes: 'Attabad lake formed by 2010 landslide. NDMA monitoring active. Spillway tunnel reduces but does not eliminate risk.',
  },
  {
    id: 'kew-er-024', name: 'Gilgit-Baltistan Forest Resilience', district: 'Ghizer', scope: 'Transboundary / Extended',
    resilienceDomain: 'Forest Fire Resilience', assetOrSystemType: 'Dry Temperate Forest System',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 65, recoveryCapacity: 'Adequate', serviceArea: 'Ghizer valley forest zone, 320 km²',
    keyStressors: ['Drought frequency increase', 'Juniper fuel accumulation', 'Limited fire suppression'],
    responseReadiness: 'Low', dataConfidence: 'Low', lastUpdated: '2026-05-15',
    notes: 'Dry temperate forests of Ghizer face increasing fire risk. Community-based firefighting absent.',
  },
  {
    id: 'kew-er-025', name: 'Skardu Alpine Water Resilience', district: 'Skardu', scope: 'Transboundary / Extended',
    resilienceDomain: 'Water System', assetOrSystemType: 'Alpine Glacial Water System',
    operationalStatus: 'Stable', priorityLevel: 'High', riskExposure: 'Moderate',
    resilienceScore: 70, recoveryCapacity: 'Strong', serviceArea: 'Skardu basin, Indus headwaters',
    keyStressors: ['Glacier retreat rate', 'Summer peak-flow timing shift', 'Population growth'],
    responseReadiness: 'Moderate', dataConfidence: 'Low', lastUpdated: '2026-05-10',
    notes: 'Baltoro and Biafo glaciers supply Indus headwaters. Water availability currently high but long-term trajectory declining.',
  },
  {
    id: 'kew-er-026', name: 'Diamer Landslide Resilience', district: 'Diamer', scope: 'Transboundary / Extended',
    resilienceDomain: 'Landslide Resilience', assetOrSystemType: 'Gorge Road & Slope System',
    operationalStatus: 'At Risk', priorityLevel: 'Critical', riskExposure: 'Extreme',
    resilienceScore: 25, recoveryCapacity: 'Critical Gap', serviceArea: 'KKH Diamer gorge section, 60 km',
    keyStressors: ['Steep Karakoram slopes', 'Monsoon intensity', 'Road widening destabilisation'],
    responseReadiness: 'Low', dataConfidence: 'Low', lastUpdated: '2026-05-08',
    notes: 'Diamer-KKH corridor subject to frequent rockfall and landslide. Diamer-Bhasha Dam construction adding slope stress.',
  },
  {
    id: 'kew-er-027', name: 'Kotli Wastewater Resilience', district: 'Kotli', scope: 'Transboundary / Extended',
    resilienceDomain: 'Wastewater & Sanitation', assetOrSystemType: 'District Sanitation System',
    operationalStatus: 'Degraded', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 33, recoveryCapacity: 'Limited', serviceArea: 'Kotli district, 1,862 km²',
    keyStressors: ['Absent STP infrastructure', 'Poonch river contamination', 'Urban wastewater discharge'],
    responseReadiness: 'Absent', dataConfidence: 'Low', lastUpdated: '2026-05-05',
    notes: 'Kotli district has no sewage treatment plant. 100% raw discharge to Poonch river. Downstream ecosystem impact severe.',
  },
  {
    id: 'kew-er-028', name: 'Mirpur Solid Waste Resilience', district: 'Mirpur', scope: 'Transboundary / Extended',
    resilienceDomain: 'Solid Waste', assetOrSystemType: 'Urban Solid Waste System',
    operationalStatus: 'Degraded', priorityLevel: 'Moderate', riskExposure: 'High',
    resilienceScore: 35, recoveryCapacity: 'Limited', serviceArea: 'Mirpur city, 450,000 population',
    keyStressors: ['Landfill saturation', 'Leachate to Mirpur Lake', 'No recycling infrastructure'],
    responseReadiness: 'Low', dataConfidence: 'Low', lastUpdated: '2026-04-30',
    notes: 'Mirpur landfill at 90% capacity. Leachate draining into Mirpur reservoir. Collection coverage 60% of urban area.',
  },
  {
    id: 'kew-er-029', name: 'AJK Remote Community Resilience', district: 'Neelum', scope: 'Transboundary / Extended',
    resilienceDomain: 'Community Preparedness', assetOrSystemType: 'Remote Mountain Community',
    operationalStatus: 'Stable', priorityLevel: 'High', riskExposure: 'High',
    resilienceScore: 44, recoveryCapacity: 'Limited', serviceArea: '120+ remote settlements, upper Neelum valley',
    keyStressors: ['Winter isolation', 'Single road access', 'Avalanche exposure'],
    responseReadiness: 'Low', dataConfidence: 'Low', lastUpdated: '2026-04-25',
    notes: 'Upper Neelum communities cut off 5–6 months annually. Supply pre-positioning critical. Helicopter landing pads absent.',
  },
  {
    id: 'kew-er-030', name: 'Hunza Alpine Restoration Readiness', district: 'Hunza', scope: 'Transboundary / Extended',
    resilienceDomain: 'Restoration Readiness', assetOrSystemType: 'Dryland Ecosystem Restoration',
    operationalStatus: 'Stable', priorityLevel: 'Moderate', riskExposure: 'Moderate',
    resilienceScore: 68, recoveryCapacity: 'Strong', serviceArea: 'Hunza valley dry slopes, 12,000 ha',
    keyStressors: ['Overgrazing', 'Fuelwood extraction', 'Limited native species nurseries'],
    responseReadiness: 'Moderate', dataConfidence: 'Low', lastUpdated: '2026-04-20',
    notes: 'Aga Khan Rural Support Programme running reforestation with native species. Community buy-in high. Seed bank needed.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const RESILIENCE_DOMAINS: ResilienceDomain[] = [
  'Critical Infrastructure', 'Water System', 'Wastewater & Sanitation', 'Solid Waste',
  'Flood Resilience', 'Landslide Resilience', 'Climate Extremes', 'Forest Fire Resilience',
  'Ecosystem Recovery', 'Community Preparedness', 'Remote Area Access', 'Restoration Readiness',
];

function getDomainIcon(domain: ResilienceDomain) {
  switch (domain) {
    case 'Critical Infrastructure': return Building2;
    case 'Water System': return Droplets;
    case 'Wastewater & Sanitation': return Waves;
    case 'Solid Waste': return RefreshCw;
    case 'Flood Resilience': return CloudRain;
    case 'Landslide Resilience': return Mountain;
    case 'Climate Extremes': return Wind;
    case 'Forest Fire Resilience': return Flame;
    case 'Ecosystem Recovery': return TreePine;
    case 'Community Preparedness': return ShieldCheck;
    case 'Remote Area Access': return MapPin;
    case 'Restoration Readiness': return FlaskConical;
    default: return Activity;
  }
}

function getDomainColor(domain: ResilienceDomain): string {
  const map: Record<ResilienceDomain, string> = {
    'Critical Infrastructure': 'from-blue-500 to-indigo-600',
    'Water System': 'from-cyan-500 to-teal-600',
    'Wastewater & Sanitation': 'from-teal-500 to-cyan-700',
    'Solid Waste': 'from-slate-500 to-gray-600',
    'Flood Resilience': 'from-sky-500 to-blue-600',
    'Landslide Resilience': 'from-orange-500 to-amber-600',
    'Climate Extremes': 'from-purple-500 to-violet-600',
    'Forest Fire Resilience': 'from-red-500 to-orange-600',
    'Ecosystem Recovery': 'from-emerald-500 to-green-600',
    'Community Preparedness': 'from-violet-500 to-purple-600',
    'Remote Area Access': 'from-amber-500 to-yellow-600',
    'Restoration Readiness': 'from-lime-500 to-emerald-600',
  };
  return map[domain] ?? 'from-slate-500 to-slate-600';
}

function getRiskBadgeVariant(risk: RiskExposure): 'success' | 'warning' | 'danger' | 'critical' {
  if (risk === 'Low') return 'success';
  if (risk === 'Moderate') return 'warning';
  if (risk === 'High') return 'danger';
  return 'critical';
}

function getPriorityBadgeVariant(p: PriorityLevel): 'success' | 'info' | 'warning' | 'critical' {
  if (p === 'Low') return 'success';
  if (p === 'Moderate') return 'info';
  if (p === 'High') return 'warning';
  return 'critical';
}

function getStatusBadgeVariant(s: OperationalStatus): 'success' | 'info' | 'warning' | 'danger' | 'critical' {
  if (s === 'Stable') return 'success';
  if (s === 'Under Restoration') return 'info';
  if (s === 'Degraded') return 'warning';
  if (s === 'At Risk') return 'danger';
  return 'critical';
}

function getScoreColor(score: number): string {
  if (score >= 65) return 'text-emerald-400';
  if (score >= 45) return 'text-amber-400';
  if (score >= 30) return 'text-orange-400';
  return 'text-red-400';
}

function getScoreBarColor(score: number): string {
  if (score >= 65) return 'bg-emerald-500';
  if (score >= 45) return 'bg-amber-500';
  if (score >= 30) return 'bg-orange-500';
  return 'bg-red-500';
}

function getCardTopGlow(priority: PriorityLevel): string {
  if (priority === 'Critical') return 'from-red-500 to-transparent';
  if (priority === 'High') return 'from-amber-500 to-transparent';
  if (priority === 'Moderate') return 'from-blue-500 to-transparent';
  return 'from-emerald-500 to-transparent';
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD COMPONENT — mirrors InfrastructureCard structure
// ─────────────────────────────────────────────────────────────────────────────

function ResilienceCard({ record, index }: { record: ResilienceRecord; index: number }) {
  const DomainIcon = getDomainIcon(record.resilienceDomain);
  const isCritical = record.priorityLevel === 'Critical';
  const isHigh = record.priorityLevel === 'High';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">

        {/* Top glow */}
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-10 pointer-events-none ${getCardTopGlow(record.priorityLevel)}`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-teal-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <DomainIcon className="w-3 h-3 flex-shrink-0" />
              {record.resilienceDomain}
            </p>
          </div>
          <Badge variant={getPriorityBadgeVariant(record.priorityLevel)} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {record.priorityLevel}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{record.district} · {record.scope}</span>
        </div>

        {/* Resilience Score bar */}
        <div className="bg-white/[0.03] rounded-lg p-2.5 border border-white/5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-slate-500">Resilience Score</span>
            <span className={`text-sm font-black ${getScoreColor(record.resilienceScore)}`}>{record.resilienceScore}<span className="text-[10px] font-normal text-slate-500">/100</span></span>
          </div>
          <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full ${getScoreBarColor(record.resilienceScore)} transition-all duration-700`}
              style={{ width: `${record.resilienceScore}%` }}
            />
          </div>
        </div>

        {/* Key data rows */}
        <div className="grid grid-cols-1 gap-1.5 text-[10px]">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Operational Status</span>
            <Badge variant={getStatusBadgeVariant(record.operationalStatus)} size="sm" className="text-[9px]">
              {record.operationalStatus}
            </Badge>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Risk Exposure</span>
            <Badge variant={getRiskBadgeVariant(record.riskExposure)} size="sm" className="text-[9px]">
              {record.riskExposure}
            </Badge>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Recovery Capacity</span>
            <span className={`font-medium text-right ml-2 truncate ${
              record.recoveryCapacity === 'Strong' ? 'text-emerald-400' :
              record.recoveryCapacity === 'Adequate' ? 'text-teal-400' :
              record.recoveryCapacity === 'Limited' ? 'text-amber-400' : 'text-red-400'
            }`}>{record.recoveryCapacity}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Service Area</span>
            <span className="text-slate-300 truncate ml-2 max-w-[120px] text-right">{record.serviceArea}</span>
          </div>
        </div>

        {/* Key stressors */}
        <div className="flex flex-wrap gap-1 mt-1">
          {record.keyStressors.slice(0, 3).map(s => (
            <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 truncate max-w-[110px]">{s}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <AlertTriangle className={`w-3 h-3 flex-shrink-0 mt-0.5 ${
              record.riskExposure === 'Extreme' ? 'text-red-400' :
              record.riskExposure === 'High' ? 'text-orange-400' :
              record.riskExposure === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
            }`} />
            <span className="line-clamp-2 leading-snug">{record.notes}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-slate-600">Updated {record.lastUpdated}</span>
            <span className="text-slate-600">Conf: {record.dataConfidence}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW COMPONENT — mirrors InfrastructureRow structure
// ─────────────────────────────────────────────────────────────────────────────

function ResilienceRow({ record, index }: { record: ResilienceRecord; index: number }) {
  const DomainIcon = getDomainIcon(record.resilienceDomain);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">

          {/* Name */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <DomainIcon className="w-3 h-3" /> {record.resilienceDomain} · {record.district}
            </div>
          </div>

          {/* Score */}
          <div className="w-28 hidden md:block">
            <div className="text-[10px] text-slate-500 mb-1">Resilience Score</div>
            <div className={`text-sm font-black ${getScoreColor(record.resilienceScore)}`}>
              {record.resilienceScore}<span className="text-[10px] font-normal text-slate-500">/100</span>
            </div>
          </div>

          {/* Risk */}
          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500 mb-1">Risk</div>
            <Badge variant={getRiskBadgeVariant(record.riskExposure)} size="sm" className="text-[10px]">{record.riskExposure}</Badge>
          </div>

          {/* Recovery */}
          <div className="w-28 hidden xl:block">
            <div className="text-[10px] text-slate-500 mb-1">Recovery Capacity</div>
            <span className={`text-xs font-medium ${
              record.recoveryCapacity === 'Strong' ? 'text-emerald-400' :
              record.recoveryCapacity === 'Adequate' ? 'text-teal-400' :
              record.recoveryCapacity === 'Limited' ? 'text-amber-400' : 'text-red-400'
            }`}>{record.recoveryCapacity}</span>
          </div>

          {/* Status */}
          <div className="w-32">
            <div className="text-[10px] text-slate-500 mb-1">Status</div>
            <Badge variant={getStatusBadgeVariant(record.operationalStatus)} size="sm" className="text-[10px]">
              {record.operationalStatus}
            </Badge>
          </div>

          {/* Priority */}
          <div className="w-20 hidden sm:block">
            <div className="text-[10px] text-slate-500 mb-1">Priority</div>
            <Badge variant={getPriorityBadgeVariant(record.priorityLevel)} size="sm" className="text-[10px]">{record.priorityLevel}</Badge>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<Info className="w-3 h-3" />}>
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 9;

export default function EnvironmentalResiliencePage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // ── KPIs ──────────────────────────────────────────────────────────────────

  const totalAssets = resilienceRegistry.length;
  const highRiskZones = resilienceRegistry.filter(r => r.riskExposure === 'Extreme' || r.riskExposure === 'High').length;
  const criticalPriority = resilienceRegistry.filter(r => r.priorityLevel === 'Critical').length;
  const stableCount = resilienceRegistry.filter(r => r.operationalStatus === 'Stable').length;
  const recoveryReadyCount = resilienceRegistry.filter(r => r.recoveryCapacity === 'Strong' || r.recoveryCapacity === 'Adequate').length;

  // ── Filters ───────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => {
    return resilienceRegistry.filter(r => {
      const matchSearch = filter.searchQuery === '' ||
        r.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        r.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        r.resilienceDomain.toLowerCase().includes(filter.searchQuery.toLowerCase());

      const matchScope = filter.scope === 'All' || r.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || r.district === filter.district;

      const matchDomain = domainFilter === 'all' || r.resilienceDomain === domainFilter;
      const matchStatus = statusFilter === 'all' || r.operationalStatus === statusFilter;
      const matchPriority = priorityFilter === 'all' || r.priorityLevel === priorityFilter;
      const matchRisk = riskFilter === 'all' || r.riskExposure === riskFilter;

      return matchSearch && matchScope && matchDistrict && matchDomain && matchStatus && matchPriority && matchRisk;
    });
  }, [filter, domainFilter, statusFilter, priorityFilter, riskFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [domainFilter, statusFilter, priorityFilter, riskFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return resilienceRegistry.filter(r => r.scope === filter.scope).length;
  }, [filter.scope]);

  React.useEffect(() => { setCurrentPage(1); }, [filter, domainFilter, statusFilter, priorityFilter, riskFilter]);

  // Critical priority records for intervention table
  const priorityInterventions = resilienceRegistry
    .filter(r => r.priorityLevel === 'Critical' || (r.priorityLevel === 'High' && r.riskExposure === 'Extreme'))
    .sort((a, b) => a.resilienceScore - b.resilienceScore)
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Heading
        label="Environmental Monitoring"
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">Environmental Resilience</span>
          </>}
        subtitle="Monitoring community, infrastructure, ecosystem, and hazard-response resilience across the Kashmir environmental region — absorption, response, and recovery capacity."
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Environmental Resilience' },
        ]}
      />

      {/* ── KPI STRIP ─────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={[
        { label: 'Resilience Assets',     value: totalAssets,        icon: 'ShieldCheck' },
        { label: 'High-Risk Zones',       value: highRiskZones,      icon: 'AlertTriangle', color: 'text-red-400' },
        { label: 'Critical Priority',     value: criticalPriority,   icon: 'Zap',           color: 'text-rose-400' },
        { label: 'Stable Systems',        value: stableCount,        icon: 'CheckCircle',   color: 'text-emerald-400' },
        { label: 'Recovery Ready',        value: recoveryReadyCount, icon: 'TrendingUp',    color: 'text-teal-400' },
        { label: 'Latest Update',         value: 'June 2026',        icon: 'Clock',         color: 'text-slate-400' },
      ]} iconColor="text-teal-500" />

      {/* ── FILTER BAR ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={domainFilter}
                onChange={setDomainFilter}
                placeholder="Resilience Domain"
                options={RESILIENCE_DOMAINS.map(d => ({ value: d, label: d }))}
              />
              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Operational Status"
                options={[
                  { value: 'Stable',             label: 'Stable'             },
                  { value: 'Degraded',           label: 'Degraded'           },
                  { value: 'At Risk',            label: 'At Risk'            },
                  { value: 'Disrupted',          label: 'Disrupted'          },
                  { value: 'Under Restoration',  label: 'Under Restoration'  },
                ]}
              />
              <FilterSelect
                value={priorityFilter}
                onChange={setPriorityFilter}
                placeholder="Priority Level"
                options={[
                  { value: 'Low',      label: 'Low Priority'      },
                  { value: 'Moderate', label: 'Moderate Priority' },
                  { value: 'High',     label: 'High Priority'     },
                  { value: 'Critical', label: 'Critical Priority' },
                ]}
              />
              <FilterSelect
                value={riskFilter}
                onChange={setRiskFilter}
                placeholder="Risk Exposure"
                options={[
                  { value: 'Low',      label: 'Low Risk'      },
                  { value: 'Moderate', label: 'Moderate Risk' },
                  { value: 'High',     label: 'High Risk'     },
                  { value: 'Extreme',  label: 'Extreme Risk'  },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setDomainFilter('all');
            setStatusFilter('all');
            setPriorityFilter('all');
            setRiskFilter('all');
          }}
        />
      </div>

      {/* ── SCOPE ROW ─────────────────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalAssets}
        entityLabel="resilience systems"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Systems')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── MAIN CARDS / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No resilience systems found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((record, idx) => (
                <ResilienceCard key={record.id} record={record} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((record, idx) => (
                <ResilienceRow key={record.id} record={record} index={idx} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
              <div className="text-sm text-slate-400">Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}</div>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          )}
        </div>
      </section>

      {/* ── REGIONAL RESILIENCE SUMMARY ───────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6 text-teal-400" />
              Regional Resilience Summary
            </h2>
            <p className="text-slate-400">Aggregate resilience score, high-risk count, and critical systems by scope</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'].map((scope, i) => {
              const scopeRecords = resilienceRegistry.filter(r => r.scope === scope);
              const avgScore = scopeRecords.length > 0
                ? Math.round(scopeRecords.reduce((a, r) => a + r.resilienceScore, 0) / scopeRecords.length)
                : 0;
              const critCount = scopeRecords.filter(r => r.priorityLevel === 'Critical').length;
              const extremeCount = scopeRecords.filter(r => r.riskExposure === 'Extreme').length;
              const stableC = scopeRecords.filter(r => r.operationalStatus === 'Stable').length;

              return (
                <motion.div key={scope} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="glass-intense border-white/10 p-5 hover:border-teal-500/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-white">{scope}</h3>
                      <span className={`text-2xl font-black ${getScoreColor(avgScore)}`}>{avgScore}</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-white/10 overflow-hidden mb-4">
                      <div className={`absolute inset-y-0 left-0 rounded-full ${getScoreBarColor(avgScore)}`} style={{ width: `${avgScore}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                      <div className="bg-white/5 rounded p-2">
                        <div className="text-slate-500 mb-0.5">Systems</div>
                        <div className="font-bold text-white">{scopeRecords.length}</div>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <div className="text-slate-500 mb-0.5">Critical</div>
                        <div className={`font-bold ${critCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{critCount}</div>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <div className="text-slate-500 mb-0.5">Extreme Risk</div>
                        <div className={`font-bold ${extremeCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{extremeCount}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Stable systems</span>
                      <span className="text-emerald-400 font-bold">{stableC} / {scopeRecords.length}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRIORITY INTERVENTION TABLE ───────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Zap className="w-6 h-6 text-rose-400" />
              Priority Intervention Register
            </h2>
            <p className="text-slate-400">Critical and extreme-risk resilience systems requiring urgent action — sorted by lowest resilience score</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">System / Area</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Domain</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Recovery</th>
                </tr>
              </thead>
              <tbody>
                {priorityInterventions.map((r, i) => {
                  const DIcon = getDomainIcon(r.resilienceDomain);
                  return (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-white text-xs">{r.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />{r.district} · {r.scope}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <DIcon className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                          <span className="truncate max-w-[120px]">{r.resilienceDomain}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-sm font-black ${getScoreColor(r.resilienceScore)}`}>{r.resilienceScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={getPriorityBadgeVariant(r.priorityLevel)} size="sm">{r.priorityLevel}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={getRiskBadgeVariant(r.riskExposure)} size="sm">{r.riskExposure}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={getStatusBadgeVariant(r.operationalStatus)} size="sm">{r.operationalStatus}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs font-medium ${
                          r.recoveryCapacity === 'Strong' ? 'text-emerald-400' :
                          r.recoveryCapacity === 'Adequate' ? 'text-teal-400' :
                          r.recoveryCapacity === 'Limited' ? 'text-amber-400' : 'text-red-400'
                        }`}>{r.recoveryCapacity}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* ── METHODOLOGY NOTE ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-intense border-teal-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FlaskConical className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Environmental Resilience Index — Methodology</h3>
                  <p className="text-xs text-slate-500 mb-4">Transparent weighted indicator framework · KEW Environmental Resilience Intelligence v1.0</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-teal-400 mb-2">Composite Resilience Score Formula</h4>
                      <div className="space-y-1.5 text-xs text-slate-400">
                        {[
                          { label: 'Hazard Exposure',               weight: '20%' },
                          { label: 'Infrastructure Reliability',     weight: '15%' },
                          { label: 'Ecosystem Buffer Capacity',      weight: '15%' },
                          { label: 'Water Security',                 weight: '15%' },
                          { label: 'Access Continuity',              weight: '10%' },
                          { label: 'Emergency Response Readiness',   weight: '10%' },
                          { label: 'Restoration Readiness',         weight: '10%' },
                          { label: 'Data Confidence Adjustment',     weight: '5%'  },
                        ].map(row => (
                          <div key={row.label} className="flex items-center gap-2">
                            <span className="text-teal-400 font-mono w-8 flex-shrink-0">{row.weight}</span>
                            <span className="text-slate-300">{row.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">Score Thresholds</h4>
                      <div className="space-y-1.5 text-xs mb-4">
                        {[
                          { label: 'Strong Resilience',    range: '≥ 65', color: 'text-emerald-400' },
                          { label: 'Adequate Resilience',  range: '45–64', color: 'text-amber-400' },
                          { label: 'Limited Resilience',   range: '30–44', color: 'text-orange-400' },
                          { label: 'Critical Gap',         range: '< 30',  color: 'text-red-400' },
                        ].map(g => (
                          <div key={g.label} className="flex items-center gap-3">
                            <span className={`font-bold w-36 ${g.color}`}>{g.label}</span>
                            <span className="text-slate-500">Score {g.range}</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-sm font-semibold text-violet-400 mb-2">Data Sources</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['NDMA', 'NWIA', 'JKPCC', 'CWC', 'NHDCIL', 'Forest Survey India', 'India-WRIS', 'Open-Meteo', 'MODIS FIRMS', 'GBIF', 'AKRSP', 'Field Surveys'].map(src => (
                          <span key={src} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">{src}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
                    <Database className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Current data uses curated mock values structured to accept live NDMA, CWC, MODIS, and NWIA API feeds when connected. Scores are expert-estimated based on available field reports and remote sensing.</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── CROSS-LINKS ───────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence Modules</h2>
            <p className="text-slate-400">Explore connected resilience and environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Critical Infrastructure',  href: '/environmental-monitoring/critical-infrastructure', desc: 'Dams, STPs, WTPs, landfills & capacity',     icon: Building2,    color: 'from-blue-500 to-indigo-600'   },
              { label: 'Hazard Intelligence',       href: '/hazard-intelligence',                             desc: 'Floods, fires, GLOFs & landslide risk',    icon: AlertTriangle, color: 'from-orange-500 to-red-600'     },
              { label: 'Water Systems',             href: '/water-systems',                                   desc: 'Lakes, rivers, wetlands & water health',   icon: Droplets,      color: 'from-cyan-500 to-teal-600'      },
              { label: 'Ecological Health',         href: '/environmental-monitoring/environmental-health',   desc: 'Ecosystem condition & habitat integrity',  icon: TreePine,      color: 'from-emerald-500 to-green-600'  },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
