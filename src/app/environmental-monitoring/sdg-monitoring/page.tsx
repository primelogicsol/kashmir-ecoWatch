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
  Droplets, Zap, Building2, RefreshCw, Wind, Waves, TreePine,
  Handshake, TrendingUp, TrendingDown, Minus, AlertTriangle,
  MapPin, FlaskConical, Info, Database, Target, CheckCircle2,
  Activity, BarChart3, Globe, Leaf, Mountain, ShieldCheck, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type SDGStatus   = 'On Track' | 'At Risk' | 'Off Track' | 'Critical';
export type SDGTrend    = 'Improving' | 'Stable' | 'Declining';
export type SDGPriority = 'Low' | 'Moderate' | 'High' | 'Critical';
export type SDGConfidence = 'High' | 'Medium' | 'Low' | 'Modelled';

export interface SDGIndicator {
  id: string;
  goalNumber: number;
  goalName: string;
  indicatorCode: string;
  indicatorName: string;
  scope: string;
  district: string;
  category: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progressPercent: number;
  status: SDGStatus;
  trend: SDGTrend;
  priority: SDGPriority;
  confidence: SDGConfidence;
  source: string;
  lastUpdated: string;
  notes: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SDG GOAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const SDG_GOALS = [
  { number: 6,  name: 'Clean Water & Sanitation',             color: 'from-blue-500 to-cyan-600',      textColor: 'text-blue-400',    icon: Droplets  },
  { number: 7,  name: 'Affordable & Clean Energy',            color: 'from-yellow-500 to-amber-600',   textColor: 'text-yellow-400',  icon: Zap       },
  { number: 11, name: 'Sustainable Cities & Communities',     color: 'from-orange-500 to-amber-700',   textColor: 'text-orange-400',  icon: Building2 },
  { number: 12, name: 'Responsible Consumption',              color: 'from-amber-600 to-yellow-800',   textColor: 'text-amber-400',   icon: RefreshCw },
  { number: 13, name: 'Climate Action',                       color: 'from-emerald-600 to-green-800',  textColor: 'text-emerald-400', icon: Wind      },
  { number: 14, name: 'Life Below Water (Freshwater)',        color: 'from-sky-500 to-blue-700',       textColor: 'text-sky-400',     icon: Waves     },
  { number: 15, name: 'Life on Land',                         color: 'from-lime-500 to-green-600',     textColor: 'text-lime-400',    icon: TreePine  },
  { number: 17, name: 'Partnerships for Environmental Action',color: 'from-indigo-600 to-blue-900',    textColor: 'text-indigo-400',  icon: Handshake },
];

const ENVIRONMENTAL_THEMES = [
  'Water Resources','Climate','Air Quality','Biodiversity','Forests',
  'Wetlands','Protected Areas','Waste Management','Renewable Energy',
  'Land Cover','Environmental Governance','Restoration',
];

// ─────────────────────────────────────────────────────────────────────────────
// MOCK INDICATOR DATA — 44 indicators across all scopes
// ─────────────────────────────────────────────────────────────────────────────

const sdgIndicators: SDGIndicator[] = [
  // SDG 6
  { id:'kew-sdg-001', goalNumber:6,  goalName:'Clean Water & Sanitation',      indicatorCode:'6.3.2',  indicatorName:'Water bodies with good ambient quality',     scope:'Kashmir Core',           district:'Srinagar',     category:'Water Resources',       currentValue:28,   targetValue:80,  unit:'%',                  progressPercent:35, status:'Critical',  trend:'Declining',  priority:'Critical', confidence:'High',    source:'JKPCC/NWIA',            lastUpdated:'2026-06-20', notes:'Dal Lake and Jhelum urban stretch fail good water quality criteria due to sewage and eutrophication.' },
  { id:'kew-sdg-002', goalNumber:6,  goalName:'Clean Water & Sanitation',      indicatorCode:'6.1.1',  indicatorName:'Population using safely managed drinking water',scope:'Kashmir Core',          district:'Kupwara',      category:'Water Resources',       currentValue:58,   targetValue:95,  unit:'%',                  progressPercent:61, status:'At Risk',   trend:'Improving',  priority:'High',     confidence:'Medium',  source:'JKPHE/PHE Dept',        lastUpdated:'2026-06-10', notes:'Remote hamlets in Lolab and Keran still relying on unprotected springs.' },
  { id:'kew-sdg-003', goalNumber:6,  goalName:'Clean Water & Sanitation',      indicatorCode:'6.6.1',  indicatorName:'Change in extent of water-related ecosystems',scope:'Kashmir Core',           district:'Bandipora',    category:'Wetlands',              currentValue:-18,  targetValue:0,   unit:'% change 2000',      progressPercent:30, status:'Off Track', trend:'Declining',  priority:'Critical', confidence:'High',    source:'NWIA/Satellite',        lastUpdated:'2026-06-18', notes:'Wular Lake has shrunk 18% since 2000 due to sedimentation and encroachment.' },
  { id:'kew-sdg-004', goalNumber:6,  goalName:'Clean Water & Sanitation',      indicatorCode:'6.3.1',  indicatorName:'Proportion of wastewater safely treated',    scope:'Trans-Divisional',       district:'Jammu',        category:'Water Resources',       currentValue:32,   targetValue:80,  unit:'%',                  progressPercent:40, status:'Off Track', trend:'Stable',     priority:'High',     confidence:'High',    source:'JKPCC/CPCB',           lastUpdated:'2026-06-21', notes:'Tawi river receives significant untreated wastewater from Jammu city STPs at partial capacity.' },
  { id:'kew-sdg-005', goalNumber:6,  goalName:'Clean Water & Sanitation',      indicatorCode:'6.5.1',  indicatorName:'Integrated water resources management score', scope:'Transboundary / Extended',district:'Gilgit',       category:'Water Resources',       currentValue:45,   targetValue:75,  unit:'IWRM score',         progressPercent:60, status:'At Risk',   trend:'Improving',  priority:'Moderate', confidence:'Low',     source:'AKDN/Satellite',        lastUpdated:'2026-05-25', notes:'GB IWRM framework under development. Aga Khan coordination improving basin management.' },
  { id:'kew-sdg-038', goalNumber:6,  goalName:'Clean Water & Sanitation',      indicatorCode:'6.4.1',  indicatorName:'Water-use efficiency score',                 scope:'Kashmir Core',           district:'Budgam',       category:'Water Resources',       currentValue:42,   targetValue:70,  unit:'Score /100',         progressPercent:60, status:'At Risk',   trend:'Stable',     priority:'High',     confidence:'Medium',  source:'JKPCC/NWIA',           lastUpdated:'2026-06-15', notes:'Agricultural irrigation dominates water use. Drip irrigation adoption below 5%.' },
  // SDG 7
  { id:'kew-sdg-006', goalNumber:7,  goalName:'Affordable & Clean Energy',     indicatorCode:'7.2.1',  indicatorName:'Renewable energy share in total energy mix', scope:'Kashmir Core',           district:'Srinagar',     category:'Renewable Energy',      currentValue:65,   targetValue:80,  unit:'%',                  progressPercent:81, status:'At Risk',   trend:'Improving',  priority:'Moderate', confidence:'High',    source:'JKPDD/Power Dept',      lastUpdated:'2026-06-15', notes:'Hydropower dominates. Solar expanding under PM-KUSUM. Coal dependence in winter months.' },
  { id:'kew-sdg-007', goalNumber:7,  goalName:'Affordable & Clean Energy',     indicatorCode:'7.1.1',  indicatorName:'Population with access to electricity',      scope:'Trans-Divisional',       district:'Kargil',       category:'Renewable Energy',      currentValue:72,   targetValue:100, unit:'%',                  progressPercent:72, status:'At Risk',   trend:'Improving',  priority:'High',     confidence:'Medium',  source:'LAHDC/Power Dept',      lastUpdated:'2026-06-08', notes:'Remote Zanskar communities still off-grid. Micro-hydro installations progressing.' },
  { id:'kew-sdg-008', goalNumber:7,  goalName:'Affordable & Clean Energy',     indicatorCode:'7.3.1',  indicatorName:'Energy intensity (primary energy)',          scope:'Trans-Divisional',       district:'Leh',          category:'Renewable Energy',      currentValue:0.52, targetValue:0.35,unit:'MJ/USD',             progressPercent:67, status:'At Risk',   trend:'Improving',  priority:'Moderate', confidence:'Low',     source:'LAHDC/Modelled',        lastUpdated:'2026-05-30', notes:'Leh transitioning to solar. High energy intensity due to cold climate heating demand.' },
  { id:'kew-sdg-043', goalNumber:7,  goalName:'Affordable & Clean Energy',     indicatorCode:'7.1.2',  indicatorName:'Population using clean fuels for cooking',   scope:'Transboundary / Extended',district:'Neelum',       category:'Renewable Energy',      currentValue:32,   targetValue:90,  unit:'%',                  progressPercent:35, status:'Critical',  trend:'Improving',  priority:'High',     confidence:'Low',     source:'AJK Survey/Modelled',   lastUpdated:'2026-04-25', notes:'Majority of Neelum valley residents burn wood for heating and cooking. Deforestation severe.' },
  // SDG 11
  { id:'kew-sdg-010', goalNumber:11, goalName:'Sustainable Cities & Communities',indicatorCode:'11.6.2',indicatorName:'Annual mean PM2.5 in urban areas',          scope:'Kashmir Core',           district:'Srinagar',     category:'Air Quality',           currentValue:58,   targetValue:25,  unit:'µg/m³',              progressPercent:43, status:'Off Track', trend:'Declining',  priority:'Critical', confidence:'High',    source:'CPCB/SAFAR',           lastUpdated:'2026-06-22', notes:'Srinagar winter PM2.5 frequently exceeds 150 µg/m³ due to biomass burning and vehicles.' },
  { id:'kew-sdg-012', goalNumber:11, goalName:'Sustainable Cities & Communities',indicatorCode:'11.7.1',indicatorName:'Urban green space per capita',               scope:'Kashmir Core',           district:'Anantnag',     category:'Land Cover',            currentValue:8.2,  targetValue:15,  unit:'m²/person',          progressPercent:55, status:'At Risk',   trend:'Stable',     priority:'Moderate', confidence:'Medium',  source:'Sentinel-2/LULC',      lastUpdated:'2026-06-12', notes:'Urban sprawl in Anantnag reducing per-capita green space. Riverfront parks under development.' },
  { id:'kew-sdg-013', goalNumber:11, goalName:'Sustainable Cities & Communities',indicatorCode:'11.5.1',indicatorName:'Deaths from disasters per 100,000 population',scope:'Trans-Divisional',      district:'Ramban',       category:'Climate',               currentValue:12.4, targetValue:3,   unit:'deaths/100k',        progressPercent:24, status:'Critical',  trend:'Declining',  priority:'Critical', confidence:'High',    source:'NDMA/SDMA J&K',        lastUpdated:'2026-06-14', notes:'NH-44 landslide fatality rate highest in region. Disaster risk reduction investment inadequate.' },
  { id:'kew-sdg-041', goalNumber:11, goalName:'Sustainable Cities & Communities',indicatorCode:'11.3.1',indicatorName:'Land consumption vs population growth ratio', scope:'Trans-Divisional',      district:'Samba',        category:'Land Cover',            currentValue:2.8,  targetValue:1.0, unit:'Ratio',              progressPercent:36, status:'Off Track', trend:'Declining',  priority:'Moderate', confidence:'Medium',  source:'ISRO LULC/Census',     lastUpdated:'2026-06-10', notes:'Samba urbanisation consuming agricultural and forest land at 2.8x population growth rate.' },
  // SDG 12
  { id:'kew-sdg-014', goalNumber:12, goalName:'Responsible Consumption',       indicatorCode:'12.4.2', indicatorName:'Hazardous waste generated and treated',     scope:'Kashmir Core',           district:'Pulwama',      category:'Waste Management',      currentValue:15,   targetValue:80,  unit:'% treated',          progressPercent:19, status:'Critical',  trend:'Stable',     priority:'Critical', confidence:'Medium',  source:'JKPCC/SPCB',           lastUpdated:'2026-06-22', notes:'Agrochemical and pesticide waste from paddy farming largely untreated. No hazardous waste facility.' },
  { id:'kew-sdg-015', goalNumber:12, goalName:'Responsible Consumption',       indicatorCode:'12.5.1', indicatorName:'Municipal solid waste recycling rate',       scope:'Kashmir Core',           district:'Srinagar',     category:'Waste Management',      currentValue:8,    targetValue:40,  unit:'%',                  progressPercent:20, status:'Critical',  trend:'Improving',  priority:'High',     confidence:'High',    source:'SMC/Urban Local Bodies',lastUpdated:'2026-06-20', notes:'Srinagar recycling rate 8%. 1,200 TPD generated daily. Landfill at capacity.' },
  { id:'kew-sdg-042', goalNumber:12, goalName:'Responsible Consumption',       indicatorCode:'12.3.1', indicatorName:'Food loss index (crop production losses)',    scope:'Kashmir Core',           district:'Shopian',      category:'Waste Management',      currentValue:28,   targetValue:12,  unit:'% crop lost',        progressPercent:43, status:'Off Track', trend:'Stable',     priority:'Moderate', confidence:'Low',     source:'SKUAST/Agri Dept',     lastUpdated:'2026-05-15', notes:'Apple and pear losses at farm gate and transport significant. Cold chain infrastructure inadequate.' },
  // SDG 13
  { id:'kew-sdg-018', goalNumber:13, goalName:'Climate Action',                indicatorCode:'13.1.1', indicatorName:'Climate-related disaster risk index',        scope:'Kashmir Core',           district:'Srinagar',     category:'Climate',               currentValue:68,   targetValue:35,  unit:'Risk index /100',    progressPercent:51, status:'At Risk',   trend:'Declining',  priority:'High',     confidence:'High',    source:'NDMA/ClimateCast',     lastUpdated:'2026-06-22', notes:'Urban flood risk rising with changing precipitation patterns and wetland loss.' },
  { id:'kew-sdg-019', goalNumber:13, goalName:'Climate Action',                indicatorCode:'13.3.2', indicatorName:'Glacier mass balance change',               scope:'Trans-Divisional',       district:'Leh',          category:'Climate',               currentValue:-0.72,targetValue:-0.2,unit:'m w.e./year',         progressPercent:28, status:'Critical',  trend:'Declining',  priority:'Critical', confidence:'High',    source:'GSI/ICIMOD/Sentinel-2', lastUpdated:'2026-06-10', notes:'Himalayan glaciers losing 0.72m water equivalent annually. Acceleration observed post-2010.' },
  { id:'kew-sdg-021', goalNumber:13, goalName:'Climate Action',                indicatorCode:'13.1.2', indicatorName:'Mean surface temperature anomaly',          scope:'Transboundary / Extended',district:'Hunza',        category:'Climate',               currentValue:1.8,  targetValue:1.5, unit:'°C above baseline',  progressPercent:55, status:'At Risk',   trend:'Declining',  priority:'High',     confidence:'Medium',  source:'Pakistan Met/ERA5',    lastUpdated:'2026-05-20', notes:'Karakoram warming at 1.8°C above baseline. Accelerating glacier loss in Hunza valley.' },
  { id:'kew-sdg-040', goalNumber:13, goalName:'Climate Action',                indicatorCode:'13.1.3', indicatorName:'Local disaster risk reduction strategy adoption',scope:'Trans-Divisional',    district:'Poonch',       category:'Climate',               currentValue:25,   targetValue:70,  unit:'% districts',        progressPercent:36, status:'Off Track', trend:'Improving',  priority:'High',     confidence:'Medium',  source:'SDMA J&K/NDMA',        lastUpdated:'2026-05-28', notes:'Poonch and Rajouri DRR strategies in draft. Pir Panjal range communities highly exposed.' },
  // SDG 14
  { id:'kew-sdg-023', goalNumber:14, goalName:'Life Below Water (Freshwater)', indicatorCode:'14.1.1a',indicatorName:'Lake eutrophication index (freshwater)',     scope:'Kashmir Core',           district:'Srinagar',     category:'Wetlands',              currentValue:78,   targetValue:30,  unit:'Index /100',         progressPercent:22, status:'Critical',  trend:'Declining',  priority:'Critical', confidence:'High',    source:'NWIA/JKPCC',           lastUpdated:'2026-06-20', notes:'Dal Lake in hypereutrophic state. Phosphorus loading exceeds restoration capacity.' },
  { id:'kew-sdg-024', goalNumber:14, goalName:'Life Below Water (Freshwater)', indicatorCode:'14.2.1', indicatorName:'Proportion of ecosystems under sound management',scope:'Kashmir Core',        district:'Bandipora',    category:'Wetlands',              currentValue:34,   targetValue:70,  unit:'%',                  progressPercent:49, status:'Off Track', trend:'Stable',     priority:'High',     confidence:'High',    source:'Wetland Authority J&K', lastUpdated:'2026-06-18', notes:'Wular and Manasbal lakes have management plans but enforcement capacity is limited.' },
  { id:'kew-sdg-025', goalNumber:14, goalName:'Life Below Water (Freshwater)', indicatorCode:'14.4.1', indicatorName:'Fish stocks within biologically sustainable levels',scope:'Kashmir Core',     district:'Ganderbal',    category:'Biodiversity',          currentValue:42,   targetValue:80,  unit:'%',                  progressPercent:52, status:'At Risk',   trend:'Declining',  priority:'High',     confidence:'Medium',  source:'JKFFA/Field Surveys',  lastUpdated:'2026-06-14', notes:'Kashmir trout populations declining due to habitat degradation and illegal netting in Sindh.' },
  { id:'kew-sdg-044', goalNumber:14, goalName:'Life Below Water (Freshwater)', indicatorCode:'14.3.1', indicatorName:'Mean freshwater pH (river headwaters)',      scope:'Trans-Divisional',       district:'Leh',          category:'Water Resources',       currentValue:7.2,  targetValue:7.6, unit:'pH',                 progressPercent:75, status:'At Risk',   trend:'Declining',  priority:'Moderate', confidence:'Medium',  source:'CWC/CPCB Mountain',    lastUpdated:'2026-06-05', notes:'Indus headwaters showing slight acidification trend. Mining effluent contribution under investigation.' },
  // SDG 15
  { id:'kew-sdg-027', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.1.1', indicatorName:'Forest area as proportion of total land area',scope:'Kashmir Core',          district:'Baramulla',    category:'Forests',               currentValue:52,   targetValue:65,  unit:'%',                  progressPercent:80, status:'At Risk',   trend:'Stable',     priority:'Moderate', confidence:'High',    source:'FSI/MODIS',            lastUpdated:'2026-06-15', notes:'Forest cover holding but localized deforestation along road corridors and tourist zones noted.' },
  { id:'kew-sdg-028', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.1.2', indicatorName:'Protected area coverage of terrestrial ecosystems',scope:'Kashmir Core',      district:'Kupwara',      category:'Protected Areas',       currentValue:22,   targetValue:30,  unit:'%',                  progressPercent:73, status:'At Risk',   trend:'Stable',     priority:'Moderate', confidence:'High',    source:'WPD J&K/WDPA',         lastUpdated:'2026-06-10', notes:'Dachigam, Kishtwar HP, and Hirpora WLS provide core protection. Buffer zones under pressure.' },
  { id:'kew-sdg-029', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.3.1', indicatorName:'Proportion of land that is degraded',        scope:'Kashmir Core',           district:'Pulwama',      category:'Land Cover',            currentValue:28,   targetValue:10,  unit:'%',                  progressPercent:36, status:'Off Track', trend:'Declining',  priority:'High',     confidence:'High',    source:'ISRO LULC/Soil Cards', lastUpdated:'2026-06-22', notes:'Intensive paddy cultivation and waterlogging causing soil degradation in Pulwama.' },
  { id:'kew-sdg-030', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.4.1', indicatorName:'Coverage of protected mountain ecosystems',  scope:'Trans-Divisional',       district:'Leh',          category:'Protected Areas',       currentValue:38,   targetValue:40,  unit:'%',                  progressPercent:95, status:'On Track',  trend:'Stable',     priority:'Low',      confidence:'High',    source:'WII/WDPA',             lastUpdated:'2026-06-10', notes:'Hemis National Park and Changthang WLS provide good alpine coverage. Tourism management critical.' },
  { id:'kew-sdg-031', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.5.1', indicatorName:'Red List Index of species survival',         scope:'Trans-Divisional',       district:'Kishtwar',     category:'Biodiversity',          currentValue:0.72, targetValue:0.85,unit:'RLI 0-1',            progressPercent:85, status:'On Track',  trend:'Improving',  priority:'Low',      confidence:'Medium',  source:'WII/IUCN',             lastUpdated:'2026-06-01', notes:'Snow leopard and Hangul populations showing modest recovery under Project Snow Leopard.' },
  { id:'kew-sdg-032', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.2.1', indicatorName:'Sustainable forest management progress',     scope:'Transboundary / Extended',district:'Ghizer',       category:'Forests',               currentValue:38,   targetValue:70,  unit:'SFM score /100',     progressPercent:54, status:'At Risk',   trend:'Stable',     priority:'Moderate', confidence:'Low',     source:'AKRSP/Satellite',      lastUpdated:'2026-05-15', notes:'Community forest management in Ghizer showing positive signs but enforcement limited.' },
  { id:'kew-sdg-033', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.4.2', indicatorName:'Mountain Green Cover Index (NDVI)',          scope:'Transboundary / Extended',district:'Hunza',        category:'Restoration',           currentValue:0.31, targetValue:0.40,unit:'NDVI',               progressPercent:78, status:'At Risk',   trend:'Improving',  priority:'Moderate', confidence:'Medium',  source:'Sentinel-2/MODIS',     lastUpdated:'2026-05-20', notes:'NDVI recovering on rehabilitated slopes under AKRSP programme. Overgrazing remains a pressure.' },
  { id:'kew-sdg-034', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.9.1', indicatorName:'Progress towards national biodiversity targets',scope:'Kashmir Core',         district:'Shopian',      category:'Biodiversity',          currentValue:44,   targetValue:80,  unit:'Score /100',         progressPercent:55, status:'At Risk',   trend:'Stable',     priority:'Moderate', confidence:'Medium',  source:'WPD J&K/GBIF',         lastUpdated:'2026-06-08', notes:'Shopian ecosystem stress from intensive horticulture. Pollinator decline documented.' },
  { id:'kew-sdg-039', goalNumber:15, goalName:'Life on Land',                  indicatorCode:'15.6.1', indicatorName:'Benefit-sharing access legislation score',   scope:'Kashmir Core',           district:'Kulgam',       category:'Biodiversity',          currentValue:30,   targetValue:70,  unit:'Score /100',         progressPercent:43, status:'Off Track', trend:'Stable',     priority:'Low',      confidence:'Low',     source:'MoEFCC/Bio Boards',    lastUpdated:'2026-05-20', notes:'J&K Biodiversity Board partially functional. Community benefit sharing mechanisms weak.' },
  // SDG 17
  { id:'kew-sdg-035', goalNumber:17, goalName:'Partnerships for Environmental Action',indicatorCode:'17.6.1',indicatorName:'Environmental data sharing partnerships',scope:'Kashmir Core',          district:'Srinagar',     category:'Environmental Governance',currentValue:4,    targetValue:12,  unit:'partnerships',       progressPercent:33, status:'Off Track', trend:'Improving',  priority:'Moderate', confidence:'Medium',  source:'KEW Platform/JKPCC',   lastUpdated:'2026-06-22', notes:'JKPCC, NWIA, Forest Survey India, and Wildlife Protection Dept sharing data with KEW.' },
  { id:'kew-sdg-036', goalNumber:17, goalName:'Partnerships for Environmental Action',indicatorCode:'17.14.1',indicatorName:'Environmental policy coherence score', scope:'Trans-Divisional',       district:'Jammu',        category:'Environmental Governance',currentValue:38,   targetValue:75,  unit:'Score /100',         progressPercent:51, status:'At Risk',   trend:'Stable',     priority:'Moderate', confidence:'Low',     source:'MoEFCC/Policy Review', lastUpdated:'2026-05-30', notes:'J&K environmental governance improving post-UT formation but cross-department gaps remain.' },
  { id:'kew-sdg-037', goalNumber:17, goalName:'Partnerships for Environmental Action',indicatorCode:'17.7.1',indicatorName:'Green technology transfer score',       scope:'Transboundary / Extended',district:'Muzaffarabad', category:'Environmental Governance',currentValue:18,   targetValue:50,  unit:'Score /100',         progressPercent:36, status:'Off Track', trend:'Stable',     priority:'Moderate', confidence:'Low',     source:'AJK EPA/UN Reports',   lastUpdated:'2026-05-01', notes:'Limited green technology transfer to AJK. Mobile environmental monitoring equipment absent.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DISTRICT SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

const districtSummary = [
  { district:'Srinagar',     scope:'Kashmir Core',           sdgScore:38, trend:'Declining'  as SDGTrend, critical:4, atRisk:3, onTrack:0 },
  { district:'Pulwama',      scope:'Kashmir Core',           sdgScore:34, trend:'Declining'  as SDGTrend, critical:3, atRisk:2, onTrack:0 },
  { district:'Bandipora',    scope:'Kashmir Core',           sdgScore:42, trend:'Stable'     as SDGTrend, critical:2, atRisk:3, onTrack:0 },
  { district:'Ganderbal',    scope:'Kashmir Core',           sdgScore:50, trend:'Stable'     as SDGTrend, critical:1, atRisk:3, onTrack:1 },
  { district:'Kupwara',      scope:'Kashmir Core',           sdgScore:55, trend:'Improving'  as SDGTrend, critical:0, atRisk:4, onTrack:1 },
  { district:'Anantnag',     scope:'Kashmir Core',           sdgScore:52, trend:'Stable'     as SDGTrend, critical:0, atRisk:3, onTrack:1 },
  { district:'Baramulla',    scope:'Kashmir Core',           sdgScore:60, trend:'Stable'     as SDGTrend, critical:0, atRisk:3, onTrack:2 },
  { district:'Budgam',       scope:'Kashmir Core',           sdgScore:47, trend:'Stable'     as SDGTrend, critical:1, atRisk:3, onTrack:0 },
  { district:'Shopian',      scope:'Kashmir Core',           sdgScore:49, trend:'Stable'     as SDGTrend, critical:0, atRisk:4, onTrack:1 },
  { district:'Kulgam',       scope:'Kashmir Core',           sdgScore:45, trend:'Stable'     as SDGTrend, critical:0, atRisk:3, onTrack:0 },
  { district:'Jammu',        scope:'Trans-Divisional',       sdgScore:40, trend:'Stable'     as SDGTrend, critical:2, atRisk:2, onTrack:0 },
  { district:'Ramban',       scope:'Trans-Divisional',       sdgScore:28, trend:'Declining'  as SDGTrend, critical:3, atRisk:1, onTrack:0 },
  { district:'Leh',          scope:'Trans-Divisional',       sdgScore:64, trend:'Improving'  as SDGTrend, critical:1, atRisk:2, onTrack:2 },
  { district:'Kargil',       scope:'Trans-Divisional',       sdgScore:58, trend:'Improving'  as SDGTrend, critical:0, atRisk:3, onTrack:1 },
  { district:'Kishtwar',     scope:'Trans-Divisional',       sdgScore:66, trend:'Improving'  as SDGTrend, critical:0, atRisk:2, onTrack:2 },
  { district:'Poonch',       scope:'Trans-Divisional',       sdgScore:44, trend:'Stable'     as SDGTrend, critical:1, atRisk:2, onTrack:0 },
  { district:'Samba',        scope:'Trans-Divisional',       sdgScore:42, trend:'Declining'  as SDGTrend, critical:0, atRisk:3, onTrack:0 },
  { district:'Muzaffarabad', scope:'Transboundary / Extended',sdgScore:38, trend:'Stable'    as SDGTrend, critical:1, atRisk:3, onTrack:0 },
  { district:'Neelum',       scope:'Transboundary / Extended',sdgScore:42, trend:'Stable'    as SDGTrend, critical:1, atRisk:3, onTrack:0 },
  { district:'Hunza',        scope:'Transboundary / Extended',sdgScore:60, trend:'Improving' as SDGTrend, critical:0, atRisk:3, onTrack:2 },
  { district:'Gilgit',       scope:'Transboundary / Extended',sdgScore:52, trend:'Stable'    as SDGTrend, critical:0, atRisk:3, onTrack:1 },
  { district:'Ghizer',       scope:'Transboundary / Extended',sdgScore:48, trend:'Stable'    as SDGTrend, critical:0, atRisk:3, onTrack:1 },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getStatusVariant(s: SDGStatus): 'success'|'info'|'warning'|'danger'|'critical' {
  if (s === 'On Track')  return 'success';
  if (s === 'At Risk')   return 'warning';
  if (s === 'Off Track') return 'danger';
  return 'critical';
}
function getPriorityVariant(p: SDGPriority): 'success'|'info'|'warning'|'critical' {
  if (p === 'Low')      return 'success';
  if (p === 'Moderate') return 'info';
  if (p === 'High')     return 'warning';
  return 'critical';
}
function getTrendIcon(t: SDGTrend) {
  if (t === 'Improving') return <TrendingUp  className="w-3 h-3 text-emerald-400" />;
  if (t === 'Declining') return <TrendingDown className="w-3 h-3 text-red-400"     />;
  return <Minus className="w-3 h-3 text-slate-400" />;
}
function getProgColor(p: number) {
  if (p >= 75) return 'bg-emerald-500';
  if (p >= 50) return 'bg-amber-500';
  if (p >= 30) return 'bg-orange-500';
  return 'bg-red-500';
}
function getProgText(p: number) {
  if (p >= 75) return 'text-emerald-400';
  if (p >= 50) return 'text-amber-400';
  if (p >= 30) return 'text-orange-400';
  return 'text-red-400';
}
function getSDGMeta(n: number) { return SDG_GOALS.find(g => g.number === n) ?? SDG_GOALS[0]; }

// ─────────────────────────────────────────────────────────────────────────────
// CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function SDGCard({ record, index }: { record: SDGIndicator; index: number }) {
  const meta     = getSDGMeta(record.goalNumber);
  const GoalIcon = meta.icon;
  const isCrit   = record.status === 'Critical' || record.priority === 'Critical';
  const isHigh   = record.priority === 'High';

  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3, delay:Math.min(index*0.04, 0.5) }} className="h-full">
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-10 pointer-events-none ${
          isCrit ? 'from-red-500 to-transparent' : isHigh ? 'from-amber-500 to-transparent' : 'from-blue-500 to-transparent'
        }`} />

        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center flex-shrink-0 shadow`}>
              <span className="text-[9px] font-black text-white">SDG{record.goalNumber}</span>
            </div>
            <div className="min-w-0">
              <h3 className={`text-xs font-bold ${meta.textColor} truncate`}>{record.goalName}</h3>
              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><GoalIcon className="w-3 h-3 flex-shrink-0" />{record.category}</p>
            </div>
          </div>
          <Badge variant={getPriorityVariant(record.priority)} size="sm" className="flex-shrink-0 text-[10px]">{record.priority}</Badge>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-bold text-white leading-snug">{record.indicatorName}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{record.district} · {record.indicatorCode}</p>
        </div>

        <div className="bg-white/[0.03] rounded-lg p-2.5 border border-white/5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-slate-500">Progress to Target</span>
            <span className={`text-sm font-black ${getProgText(record.progressPercent)}`}>{record.progressPercent}<span className="text-[10px] font-normal text-slate-500">%</span></span>
          </div>
          <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
            <div className={`absolute inset-y-0 left-0 rounded-full ${getProgColor(record.progressPercent)} transition-all duration-700`} style={{ width:`${record.progressPercent}%` }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-600 mt-1">
            <span>Current: {record.currentValue} {record.unit}</span>
            <span>Target: {record.targetValue} {record.unit}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 text-[10px]">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Status</span>
            <Badge variant={getStatusVariant(record.status)} size="sm" className="text-[9px]">{record.status}</Badge>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Trend</span>
            <span className="flex items-center gap-1">{getTrendIcon(record.trend)}<span className="text-slate-300">{record.trend}</span></span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Source</span>
            <span className="text-slate-400 truncate ml-2 max-w-[120px] text-right">{record.source}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 text-[10px] text-slate-500 leading-snug line-clamp-2">{record.notes}</div>
        <div className="flex justify-between text-[9px] text-slate-600">
          <span>Updated {record.lastUpdated}</span>
          <span>Conf: {record.confidence}</span>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function SDGRow({ record, index }: { record: SDGIndicator; index: number }) {
  const meta = getSDGMeta(record.goalNumber);
  return (
    <motion.div initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
      transition={{ duration:0.2, delay:Math.min(index*0.02, 0.4) }}>
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[220px] flex-1 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center flex-shrink-0 shadow`}>
              <span className="text-[9px] font-black text-white">SDG{record.goalNumber}</span>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold text-white group-hover:text-green-300 transition-colors line-clamp-1">{record.indicatorName}</span>
              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{record.district} · {record.category}</div>
            </div>
          </div>
          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500 mb-1">Progress</div>
            <div className={`text-sm font-black ${getProgText(record.progressPercent)}`}>{record.progressPercent}<span className="text-[10px] font-normal text-slate-500">%</span></div>
          </div>
          <div className="w-36 hidden xl:block">
            <div className="text-[10px] text-slate-500 mb-0.5">Current / Target</div>
            <div className="text-xs text-slate-300 truncate">{record.currentValue} / {record.targetValue} {record.unit}</div>
          </div>
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Status</div>
            <Badge variant={getStatusVariant(record.status)} size="sm" className="text-[10px]">{record.status}</Badge>
          </div>
          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500 mb-1">Trend</div>
            <div className="flex items-center gap-1">{getTrendIcon(record.trend)}<span className="text-xs text-slate-300">{record.trend}</span></div>
          </div>
          <div className="w-20 hidden sm:block">
            <div className="text-[10px] text-slate-500 mb-1">Priority</div>
            <Badge variant={getPriorityVariant(record.priority)} size="sm" className="text-[10px]">{record.priority}</Badge>
          </div>
          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<Info className="w-3 h-3" />}>Details</Button>
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

export default function SDGMonitoringPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [goalFilter,   setGoalFilter]   = useState('all');
  const [themeFilter,  setThemeFilter]  = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode,     setViewMode]     = useState<'grid'|'list'>('grid');
  const [currentPage,  setCurrentPage]  = useState(1);

  // KPIs
  const overallScore     = useMemo(() => Math.round(sdgIndicators.reduce((a,r) => a+r.progressPercent,0) / sdgIndicators.length), []);
  const onTrackCount     = sdgIndicators.filter(r => r.status === 'On Track').length;
  const improvingCount   = sdgIndicators.filter(r => r.trend === 'Improving').length;
  const criticalCount    = sdgIndicators.filter(r => r.status === 'Critical' || r.priority === 'Critical').length;
  const districtsMeeting = districtSummary.filter(d => d.sdgScore >= 60).length;

  // Filtered data
  const filteredData = useMemo(() => sdgIndicators.filter(r => {
    const matchSearch   = filter.searchQuery === '' || r.indicatorName.toLowerCase().includes(filter.searchQuery.toLowerCase()) || r.district.toLowerCase().includes(filter.searchQuery.toLowerCase());
    const matchScope    = filter.scope === 'All' || r.scope === filter.scope;
    const matchDistrict = filter.district === 'All' || r.district === filter.district;
    const matchGoal     = goalFilter   === 'all' || r.goalNumber === Number(goalFilter);
    const matchTheme    = themeFilter  === 'all' || r.category === themeFilter;
    const matchStatus   = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchScope && matchDistrict && matchGoal && matchTheme && matchStatus;
  }), [filter, goalFilter, themeFilter, statusFilter]);

  const totalPages    = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage-1)*ITEMS_PER_PAGE, currentPage*ITEMS_PER_PAGE);
  const extraActive   = [goalFilter, themeFilter, statusFilter].filter(f => f !== 'all').length;
  const scopeCount    = useMemo(() => filter.scope === 'All' ? 0 : sdgIndicators.filter(r => r.scope === filter.scope).length, [filter.scope]);

  React.useEffect(() => { setCurrentPage(1); }, [filter, goalFilter, themeFilter, statusFilter]);

  // Per-SDG aggregates
  const sdgAgg = useMemo(() => SDG_GOALS.map(g => {
    const recs = sdgIndicators.filter(r => r.goalNumber === g.number);
    const avg  = recs.length > 0 ? Math.round(recs.reduce((a,r) => a+r.progressPercent,0)/recs.length) : 0;
    const crit = recs.filter(r => r.status === 'Critical').length;
    const ok   = recs.filter(r => r.status === 'On Track').length;
    const imp  = recs.filter(r => r.trend === 'Improving').length;
    const dec  = recs.filter(r => r.trend === 'Declining').length;
    const trend: SDGTrend = imp > dec ? 'Improving' : dec > 0 ? 'Declining' : 'Stable';
    return { ...g, avg, crit, ok, total:recs.length, trend };
  }), []);

  const priorityItems = sdgIndicators.filter(r => r.status === 'Critical' || (r.status === 'Off Track' && r.priority === 'High')).sort((a,b) => a.progressPercent - b.progressPercent).slice(0,8);
  const strongest     = [...sdgAgg].sort((a,b) => b.avg - a.avg).slice(0,3);
  const weakest       = [...sdgAgg].sort((a,b) => a.avg - b.avg).slice(0,3);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* HERO */}
      <Heading
        label="Environmental Monitoring"
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Environmental SDG Monitoring</span>
        </>}
        subtitle="Tracking environmental sustainability, climate resilience, biodiversity, water security, and ecosystem performance against UN Sustainable Development Goals across the Western Himalayan Region."
        icon={<Globe className="w-6 h-6 text-green-400" />}
        breadcrumbs={[
          { label: 'Home', href:'/' },
          { label: 'Environmental Monitoring', href:'/environmental-monitoring' },
          { label: 'SDG Monitoring' },
        ]}
      />

      {/* KPI STRIP */}
      <ModuleKpiStrip kpis={[
        { label:'Overall SDG Score',        value:`${overallScore}%`,   icon:'Target',        color:getProgText(overallScore) },
        { label:'Districts Meeting Targets', value:districtsMeeting,    icon:'MapPin',        color:'text-emerald-400'        },
        { label:'Indicators Improving',      value:improvingCount,      icon:'TrendingUp',    color:'text-teal-400'           },
        { label:'Requiring Action',          value:criticalCount,       icon:'AlertTriangle', color:'text-red-400'            },
        { label:'On Track',                  value:onTrackCount,        icon:'CheckCircle',   color:'text-green-400'          },
        { label:'Latest Update',             value:'June 2026',         icon:'Clock',         color:'text-slate-400'          },
      ]} iconColor="text-green-500" />

      {/* FILTER BAR */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={<>
            <FilterSelect value={goalFilter} onChange={setGoalFilter} placeholder="SDG Goal"
              options={SDG_GOALS.map(g => ({ value:String(g.number), label:`SDG ${g.number}: ${g.name}` }))} />
            <FilterSelect value={themeFilter} onChange={setThemeFilter} placeholder="Environmental Theme"
              options={ENVIRONMENTAL_THEMES.map(t => ({ value:t, label:t }))} />
            <FilterSelect value={statusFilter} onChange={setStatusFilter} placeholder="Indicator Status"
              options={[{value:'On Track',label:'On Track'},{value:'At Risk',label:'At Risk'},{value:'Off Track',label:'Off Track'},{value:'Critical',label:'Critical'}]} />
          </>}
          extraActiveCount={extraActive}
          onExtraFiltersClear={() => { setGoalFilter('all'); setThemeFilter('all'); setStatusFilter('all'); }}
        />
      </div>

      {/* SCOPE ROW */}
      <ModuleScopeRow filteredCount={filteredData.length} totalCount={sdgIndicators.length}
        entityLabel="SDG indicators" viewMode={viewMode} onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Indicators')} scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)} />

      {/* CARDS / LIST */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Globe className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No indicators found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((r,idx) => <SDGCard key={r.id} record={r} index={idx} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((r,idx) => <SDGRow key={r.id} record={r} index={idx} />)}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage===1}>Previous</Button>
              <div className="text-sm text-slate-400">Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}</div>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} disabled={currentPage===totalPages}>Next</Button>
            </div>
          )}
        </div>
      </section>

      {/* SDG GOAL OVERVIEW */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><Target className="w-6 h-6 text-green-400" />SDG Goal Performance Overview</h2>
            <p className="text-slate-400">Aggregate regional progress across all 8 monitored environmental SDGs</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sdgAgg.map((g,i) => {
              const GoalIcon = g.icon;
              return (
                <motion.div key={g.number} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}>
                  <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all cursor-pointer group" onClick={() => setGoalFilter(String(g.number))}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center shadow flex-shrink-0`}>
                        <GoalIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">SDG {g.number}</div>
                        <div className="text-xs font-bold text-white group-hover:text-green-300 transition-colors line-clamp-1">{g.name}</div>
                      </div>
                    </div>
                    <div className="flex items-end justify-between mb-2">
                      <span className={`text-3xl font-black ${getProgText(g.avg)}`}>{g.avg}%</span>
                      <div className="flex items-center gap-1">{getTrendIcon(g.trend)}<span className="text-[10px] text-slate-500">{g.trend}</span></div>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
                      <div className={`absolute inset-y-0 left-0 rounded-full ${getProgColor(g.avg)}`} style={{ width:`${g.avg}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">{g.total} indicators</span>
                      <span className={g.crit > 0 ? 'text-red-400 font-bold' : 'text-emerald-400'}>{g.crit > 0 ? `${g.crit} critical` : `${g.ok} on track`}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DISTRICT TABLE */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><BarChart3 className="w-6 h-6 text-blue-400" />District Sustainability Performance</h2>
            <p className="text-slate-400">Environmental SDG Index rankings — sorted by score</p>
          </motion.div>
          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['District','Scope','SDG Score','Trend','Critical','At Risk','On Track','Status'].map(h => (
                    <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider ${h === 'District' || h === 'Scope' ? 'text-left' : 'text-center'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...districtSummary].sort((a,b) => b.sdgScore - a.sdgScore).map((d,i) => (
                  <motion.tr key={d.district} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.2, delay:i*0.02 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4"><div className="font-medium text-white text-xs flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-500" />{d.district}</div></td>
                    <td className="py-3 px-4"><span className="text-[10px] text-slate-400">{d.scope}</span></td>
                    <td className="py-3 px-4 text-center"><span className={`text-sm font-black ${getProgText(d.sdgScore)}`}>{d.sdgScore}</span></td>
                    <td className="py-3 px-4 text-center"><div className="flex items-center justify-center gap-1">{getTrendIcon(d.trend)}<span className="text-[10px] text-slate-400">{d.trend}</span></div></td>
                    <td className="py-3 px-4 text-center"><span className={d.critical>0?'text-red-400 font-bold text-sm':'text-slate-500 text-xs'}>{d.critical}</span></td>
                    <td className="py-3 px-4 text-center"><span className={d.atRisk>0?'text-amber-400 font-medium text-sm':'text-slate-500 text-xs'}>{d.atRisk}</span></td>
                    <td className="py-3 px-4 text-center"><span className={d.onTrack>0?'text-emerald-400 font-medium text-sm':'text-slate-500 text-xs'}>{d.onTrack}</span></td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={d.sdgScore>=65?'success':d.sdgScore>=50?'warning':d.sdgScore>=35?'danger':'critical'} size="sm">
                        {d.sdgScore>=65?'Good':d.sdgScore>=50?'Fair':d.sdgScore>=35?'Poor':'Critical'}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* PRIORITY INTERVENTIONS */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-red-400" />Priority Intervention Register</h2>
            <p className="text-slate-400">Critical and off-track indicators requiring urgent action — sorted by lowest progress</p>
          </motion.div>
          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Indicator','SDG','Progress','Current / Target','Status','Priority','Conf.'].map(h => (
                    <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider ${h==='Indicator'?'text-left':h==='Current / Target'?'text-left hidden md:table-cell':'text-center'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {priorityItems.map((r,i) => {
                  const meta = getSDGMeta(r.goalNumber);
                  return (
                    <motion.tr key={r.id} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                      transition={{ duration:0.2, delay:i*0.03 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4">
                        <div className="text-xs font-medium text-white">{r.indicatorName}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-2.5 h-2.5" />{r.district} · {r.indicatorCode}</div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center mx-auto`}>
                          <span className="text-[9px] font-black text-white">SDG{r.goalNumber}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center"><span className={`text-sm font-black ${getProgText(r.progressPercent)}`}>{r.progressPercent}%</span></td>
                      <td className="py-3 px-4 hidden md:table-cell"><span className="text-xs text-slate-300">{r.currentValue} / {r.targetValue} {r.unit}</span></td>
                      <td className="py-3 px-4 text-center"><Badge variant={getStatusVariant(r.status)} size="sm">{r.status}</Badge></td>
                      <td className="py-3 px-4 text-center"><Badge variant={getPriorityVariant(r.priority)} size="sm">{r.priority}</Badge></td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs font-medium ${r.confidence==='High'?'text-emerald-400':r.confidence==='Medium'?'text-amber-400':'text-slate-400'}`}>{r.confidence}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* INTELLIGENCE SUMMARY */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><Activity className="w-6 h-6 text-violet-400" />Environmental Intelligence Summary</h2>
            <p className="text-slate-400">Automated analysis of regional SDG performance patterns and recommended priority interventions</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-intense border-emerald-500/20 p-5">
              <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Strongest Performing SDGs</h3>
              <div className="space-y-3">
                {strongest.map(g => {
                  const GoalIcon = g.icon;
                  return (
                    <div key={g.number} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center flex-shrink-0`}><GoalIcon className="w-4 h-4 text-white" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-white truncate">SDG {g.number}: {g.name}</span>
                          <span className={`text-xs font-black ml-2 ${getProgText(g.avg)}`}>{g.avg}%</span>
                        </div>
                        <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className={`absolute inset-y-0 left-0 rounded-full ${getProgColor(g.avg)}`} style={{ width:`${g.avg}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="glass-intense border-red-500/20 p-5">
              <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Weakest Performing SDGs</h3>
              <div className="space-y-3">
                {weakest.map(g => {
                  const GoalIcon = g.icon;
                  return (
                    <div key={g.number} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center flex-shrink-0`}><GoalIcon className="w-4 h-4 text-white" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-white truncate">SDG {g.number}: {g.name}</span>
                          <span className={`text-xs font-black ml-2 ${getProgText(g.avg)}`}>{g.avg}%</span>
                        </div>
                        <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className={`absolute inset-y-0 left-0 rounded-full ${getProgColor(g.avg)}`} style={{ width:`${g.avg}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="glass-intense border-amber-500/20 p-5">
              <h3 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Emerging Environmental Risks</h3>
              <div className="space-y-2">
                {[
                  { risk:'Accelerating glacier retreat across Leh, Kargil, Hunza',             sdg:'SDG 13', severity:'Critical' },
                  { risk:'Dal Lake hypereutrophication beyond restoration threshold',            sdg:'SDG 14', severity:'Critical' },
                  { risk:'PM2.5 winter episodes exceeding WHO limits by 6x in Srinagar',        sdg:'SDG 11', severity:'Critical' },
                  { risk:'NH-44 landslide fatality rate rising with climate change',            sdg:'SDG 11', severity:'Critical' },
                  { risk:'Fuelwood dependence driving deforestation in AJK Neelum valley',     sdg:'SDG 7',  severity:'High'     },
                ].map((r,i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-white/5 last:border-0">
                    <Badge variant={r.severity==='Critical'?'critical':'danger'} size="sm" className="flex-shrink-0 text-[9px] mt-0.5">{r.severity}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-snug">{r.risk}</p>
                      <span className="text-[10px] text-slate-500">{r.sdg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-intense border-violet-500/20 p-5">
              <h3 className="text-sm font-bold text-violet-400 mb-4 flex items-center gap-2"><Leaf className="w-4 h-4" />Recommended Priority Interventions</h3>
              <div className="space-y-2">
                {[
                  { action:'Accelerate Dal Lake STP completion and wetland buffer enforcement', sdg:'SDG 6 / 14', type:'Urgent'   },
                  { action:'Expand GLOF early-warning to all 12 at-risk glacial lakes',        sdg:'SDG 13',     type:'Urgent'   },
                  { action:'Deploy clean cooking fuel programme across AJK Neelum valley',     sdg:'SDG 7',      type:'Urgent'   },
                  { action:'Fast-track NH-44 slope stabilisation at 40 black-spots',           sdg:'SDG 11',     type:'Urgent'   },
                  { action:'Launch NDVI-based forest degradation monitoring for GB',           sdg:'SDG 15',     type:'High'     },
                ].map((r,i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-white/5 last:border-0">
                    <Badge variant={r.type==='Urgent'?'critical':'danger'} size="sm" className="flex-shrink-0 text-[9px] mt-0.5">{r.type}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-snug">{r.action}</p>
                      <span className="text-[10px] text-slate-500">{r.sdg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <Card className="glass-intense border-green-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FlaskConical className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Environmental SDG Index — Methodology</h3>
                  <p className="text-xs text-slate-500 mb-4">Kashmir EcoWatch · SDG Intelligence Platform v1.0 · Aligned to UN IAEG-SDGs global indicator framework</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Scoring Formula</h4>
                      <div className="space-y-1.5 text-xs text-slate-400">
                        {[
                          { k:'Progress %',      v:'(Current ÷ Target) × 100 — inverted where lower is better' },
                          { k:'Trend adj.',      v:'Improving +10 pts · Stable 0 · Declining −10 pts'          },
                          { k:'Confidence adj.', v:'High ×1.0 · Medium ×0.9 · Low ×0.8 · Modelled ×0.7'       },
                          { k:'Status bands',    v:'Critical <30 · Off Track 30–49 · At Risk 50–74 · OK ≥75'   },
                        ].map(row => (
                          <div key={row.k} className="flex gap-2">
                            <span className="text-green-400 font-mono flex-shrink-0 w-24">{row.k}</span>
                            <span className="text-slate-300">{row.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Monitored SDGs</h4>
                      <div className="space-y-1 text-xs">
                        {SDG_GOALS.map(g => (
                          <div key={g.number} className={`flex items-center gap-2 ${g.textColor}`}>
                            <span className="font-bold w-8 flex-shrink-0">SDG {g.number}</span>
                            <span className="text-slate-400">{g.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-violet-400 mb-2">Data Sources</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['JKPCC','NWIA','CWC','CPCB','NDMA','FSI','MODIS','Sentinel-2','GBIF','ICIMOD','IUCN','WPD J&K','ISRO LULC','JKPDD','AKDN','AJK EPA','Pakistan Met','LAHDC','WWF','MoEFCC','ERA5','Open-Meteo'].map(src => (
                          <span key={src} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">{src}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
                    <Database className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Expert-curated mock values structured to accept live KEW API feeds without schema changes. Indicators aligned to UN SDG global indicator framework (IAEG-SDGs) adapted for Western Himalayan regional context.</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related KEW Intelligence Modules</h2>
            <p className="text-slate-400">Explore underlying datasets powering the SDG indicators</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Ecological Health',        href:'/environmental-monitoring/environmental-health',     desc:'EHI, vegetation & biodiversity',    icon:TreePine,   color:'from-emerald-500 to-green-600'  },
              { label:'Environmental Resilience', href:'/environmental-monitoring/environmental-resilience', desc:'Recovery & stress capacity',         icon:ShieldCheck,color:'from-teal-500 to-cyan-600'      },
              { label:'Critical Infrastructure',  href:'/environmental-monitoring/critical-infrastructure',  desc:'Dams, STPs, WTPs, landfills',       icon:Building2,  color:'from-blue-500 to-indigo-600'    },
              { label:'Hazard Intelligence',      href:'/hazard-intelligence',                               desc:'Floods, fires, GLOFs, landslides',  icon:Mountain,   color:'from-orange-500 to-red-600'     },
            ].map((link,i) => (
              <motion.div key={link.label} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3, delay:i*0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-green-300 transition-colors">{link.label}</h3>
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
