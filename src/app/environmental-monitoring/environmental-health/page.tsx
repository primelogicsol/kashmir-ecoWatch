'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import {
  Leaf, ChevronRight, AlertTriangle, Activity, MapPin, ExternalLink,
  Droplets, TreePine, Mountain, Wind, Waves, Shield, TrendingUp,
  TrendingDown, Minus, Database, FlaskConical, BarChart3, RefreshCw, Zap, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

// ─────────────────────────────────────────────────────────────────────────────
// DATA MODEL — Ecological Health Record
// Structured to accept real NDVI, land-cover, water-quality, and biodiversity
// feeds when available. Mock values set to realistic ecological ranges.
// ─────────────────────────────────────────────────────────────────────────────

export type StressLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type HealthGrade = 'Healthy' | 'Fair' | 'Stressed' | 'Degraded' | 'Critical';
export type EcosystemType = 'Alpine' | 'Sub-Alpine' | 'Temperate Forest' | 'Wetland' | 'Riverine' | 'Arid' | 'Grassland' | 'Agricultural';
export type RestorationPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface EcologicalHealthRecord {
  id: string;
  region: string;
  district: string;
  scope: string;
  ecosystemType: EcosystemType;
  // Composite index (0–100)
  healthIndex: number;
  healthGrade: HealthGrade;
  stressLevel: StressLevel;
  // Sub-indices (0–100)
  waterScore: number;
  vegetationScore: number;
  biodiversityScore: number;
  soilScore: number;
  // Risk flags
  hazardExposure: StressLevel;
  degradationRisk: StressLevel;
  // Restoration
  restorationPriority: RestorationPriority;
  // Meta
  dataConfidence: 'High' | 'Medium' | 'Low' | 'Modelled';
  dataSources: string[];
  trend: 'Improving' | 'Stable' | 'Declining';
  lastUpdated: string;
  notes: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA REGISTRY — 20 regional ecosystem units
// Replace with live NDVI / water-quality / biodiversity API feeds when ready.
// ─────────────────────────────────────────────────────────────────────────────

const ecologicalHealthRegistry: EcologicalHealthRecord[] = [
  {
    id: 'kew-eh-001', region: 'Srinagar', district: 'Srinagar', scope: 'Kashmir Core',
    ecosystemType: 'Wetland', healthIndex: 38, healthGrade: 'Degraded', stressLevel: 'Critical',
    waterScore: 32, vegetationScore: 44, biodiversityScore: 51, soilScore: 40,
    hazardExposure: 'High', degradationRisk: 'Critical', restorationPriority: 'Urgent',
    dataConfidence: 'High', dataSources: ['JKPCC', 'NWIA', 'Field Surveys'],
    trend: 'Declining', lastUpdated: '2026-06-20', notes: 'Dal Lake wetland complex under severe eutrophication and encroachment pressure.',
  },
  {
    id: 'kew-eh-002', region: 'Anantnag', district: 'Anantnag', scope: 'Kashmir Core',
    ecosystemType: 'Riverine', healthIndex: 55, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 58, vegetationScore: 60, biodiversityScore: 62, soilScore: 50,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['India-WRIS', 'Field Reports'],
    trend: 'Stable', lastUpdated: '2026-06-18', notes: 'Jhelum corridor showing moderate agricultural runoff stress.',
  },
  {
    id: 'kew-eh-003', region: 'Baramulla', district: 'Baramulla', scope: 'Kashmir Core',
    ecosystemType: 'Temperate Forest', healthIndex: 71, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 70, vegetationScore: 75, biodiversityScore: 73, soilScore: 68,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'High', dataSources: ['Forest Survey India', 'MODIS NDVI'],
    trend: 'Stable', lastUpdated: '2026-06-15', notes: 'Forest cover largely intact; localized deforestation along road corridors.',
  },
  {
    id: 'kew-eh-004', region: 'Kupwara', district: 'Kupwara', scope: 'Kashmir Core',
    ecosystemType: 'Sub-Alpine', healthIndex: 83, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 88, vegetationScore: 82, biodiversityScore: 85, soilScore: 80,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Sentinel-2 NDVI', 'WWF Field Data'],
    trend: 'Stable', lastUpdated: '2026-06-10', notes: 'High-altitude sub-alpine meadows in good condition; moderate livestock grazing pressure.',
  },
  {
    id: 'kew-eh-005', region: 'Pulwama', district: 'Pulwama', scope: 'Kashmir Core',
    ecosystemType: 'Agricultural', healthIndex: 44, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 40, vegetationScore: 55, biodiversityScore: 35, soilScore: 42,
    hazardExposure: 'Moderate', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'High', dataSources: ['JKPCC', 'Soil Health Cards'],
    trend: 'Declining', lastUpdated: '2026-06-22', notes: 'Intensive paddy agriculture causing soil compaction and waterway nutrient loading.',
  },
  {
    id: 'kew-eh-006', region: 'Budgam', district: 'Budgam', scope: 'Kashmir Core',
    ecosystemType: 'Wetland', healthIndex: 47, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 45, vegetationScore: 50, biodiversityScore: 55, soilScore: 44,
    hazardExposure: 'Moderate', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['NWIA', 'Remote Sensing'],
    trend: 'Declining', lastUpdated: '2026-06-17', notes: 'Hokersar wetland facing encroachment and nutrient enrichment stress.',
  },
  {
    id: 'kew-eh-007', region: 'Ganderbal', district: 'Ganderbal', scope: 'Kashmir Core',
    ecosystemType: 'Riverine', healthIndex: 62, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 65, vegetationScore: 60, biodiversityScore: 68, soilScore: 58,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['India-WRIS', 'Field Reports'],
    trend: 'Stable', lastUpdated: '2026-06-14', notes: 'Sindh River catchment in moderate health; sand mining impacts noted.',
  },
  {
    id: 'kew-eh-008', region: 'Shopian', district: 'Shopian', scope: 'Kashmir Core',
    ecosystemType: 'Agricultural', healthIndex: 52, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 55, vegetationScore: 58, biodiversityScore: 48, soilScore: 50,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled'],
    trend: 'Stable', lastUpdated: '2026-06-12', notes: 'Apple orchard region; pesticide runoff into tributaries detected.',
  },
  {
    id: 'kew-eh-009', region: 'Kulgam', district: 'Kulgam', scope: 'Kashmir Core',
    ecosystemType: 'Temperate Forest', healthIndex: 68, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 72, vegetationScore: 70, biodiversityScore: 65, soilScore: 66,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India', 'Field Reports'],
    trend: 'Improving', lastUpdated: '2026-06-08', notes: 'Recovery noted post Joint Forest Management interventions.',
  },
  {
    id: 'kew-eh-010', region: 'Bandipora', district: 'Bandipora', scope: 'Kashmir Core',
    ecosystemType: 'Wetland', healthIndex: 58, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 60, vegetationScore: 62, biodiversityScore: 70, soilScore: 50,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'High',
    dataConfidence: 'High', dataSources: ['NWIA', 'WWF Wular Survey'],
    trend: 'Declining', lastUpdated: '2026-06-19', notes: 'Wular Lake ecosystem under sedimentation and invasive species pressure.',
  },
  {
    id: 'kew-eh-011', region: 'Leh', district: 'Leh', scope: 'Trans-Divisional',
    ecosystemType: 'Arid', healthIndex: 77, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 72, vegetationScore: 65, biodiversityScore: 80, soilScore: 85,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Sentinel-2', 'WWF Snow Leopard Survey'],
    trend: 'Stable', lastUpdated: '2026-06-11', notes: 'Cold arid ecosystem largely intact; tourism pressure increasing.',
  },
  {
    id: 'kew-eh-012', region: 'Kargil', district: 'Kargil', scope: 'Trans-Divisional',
    ecosystemType: 'Alpine', healthIndex: 80, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 85, vegetationScore: 70, biodiversityScore: 82, soilScore: 83,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled', 'CWC Data'],
    trend: 'Stable', lastUpdated: '2026-05-30', notes: 'Glacial-fed alpine ecosystem; GLOF risk from glacier retreat noted.',
  },
  {
    id: 'kew-eh-013', region: 'Jammu', district: 'Jammu', scope: 'Trans-Divisional',
    ecosystemType: 'Agricultural', healthIndex: 42, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 38, vegetationScore: 48, biodiversityScore: 40, soilScore: 44,
    hazardExposure: 'High', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['JKPCC', 'CPCB Data'],
    trend: 'Declining', lastUpdated: '2026-06-21', notes: 'Tawi river facing industrial effluent and urban wastewater stress.',
  },
  {
    id: 'kew-eh-014', region: 'Udhampur', district: 'Udhampur', scope: 'Trans-Divisional',
    ecosystemType: 'Temperate Forest', healthIndex: 66, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 68, vegetationScore: 70, biodiversityScore: 65, soilScore: 62,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India'],
    trend: 'Stable', lastUpdated: '2026-06-05', notes: 'Mixed forest coverage with localized degradation from extraction.',
  },
  {
    id: 'kew-eh-015', region: 'Kathua', district: 'Kathua', scope: 'Trans-Divisional',
    ecosystemType: 'Riverine', healthIndex: 50, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 48, vegetationScore: 55, biodiversityScore: 52, soilScore: 46,
    hazardExposure: 'High', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['CWC', 'Field Reports'],
    trend: 'Declining', lastUpdated: '2026-06-16', notes: 'Ravi river floodplain impacted by industrial and agricultural discharges.',
  },
  {
    id: 'kew-eh-016', region: 'Samba', district: 'Samba', scope: 'Trans-Divisional',
    ecosystemType: 'Agricultural', healthIndex: 54, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 52, vegetationScore: 56, biodiversityScore: 50, soilScore: 58,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India', 'Soil Health Cards'],
    trend: 'Stable', lastUpdated: '2026-06-10', notes: 'Transitional agricultural-forest zone; moderate soil degradation from monoculture farming.',
  },
  {
    id: 'kew-eh-017', region: 'Reasi', district: 'Reasi', scope: 'Trans-Divisional',
    ecosystemType: 'Temperate Forest', healthIndex: 67, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 70, vegetationScore: 72, biodiversityScore: 65, soilScore: 63,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled', 'Forest Survey India'],
    trend: 'Stable', lastUpdated: '2026-06-07', notes: 'Chenab catchment forests largely intact; landslide-prone slopes require monitoring.',
  },
  {
    id: 'kew-eh-018', region: 'Doda', district: 'Doda', scope: 'Trans-Divisional',
    ecosystemType: 'Temperate Forest', healthIndex: 72, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 74, vegetationScore: 76, biodiversityScore: 70, soilScore: 68,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Medium',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled'],
    trend: 'Stable', lastUpdated: '2026-05-30', notes: 'High-altitude Doda forests show good cover; river corridors under seasonal flood stress.',
  },
  {
    id: 'kew-eh-019', region: 'Kishtwar', district: 'Kishtwar', scope: 'Trans-Divisional',
    ecosystemType: 'Sub-Alpine', healthIndex: 78, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 82, vegetationScore: 78, biodiversityScore: 76, soilScore: 75,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled', 'CWC Data'],
    trend: 'Stable', lastUpdated: '2026-05-25', notes: 'Kishtwar high-altitude ecosystem in good condition; glacial source rivers intact.',
  },
  {
    id: 'kew-eh-020', region: 'Ramban', district: 'Ramban', scope: 'Trans-Divisional',
    ecosystemType: 'Riverine', healthIndex: 48, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 45, vegetationScore: 52, biodiversityScore: 46, soilScore: 50,
    hazardExposure: 'High', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['CWC', 'Field Reports'],
    trend: 'Declining', lastUpdated: '2026-06-14', notes: 'Chenab riverbank heavily impacted by highway construction and landslide debris.',
  },
  {
    id: 'kew-eh-021', region: 'Rajouri', district: 'Rajouri', scope: 'Trans-Divisional',
    ecosystemType: 'Grassland', healthIndex: 58, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 55, vegetationScore: 62, biodiversityScore: 58, soilScore: 57,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled'],
    trend: 'Stable', lastUpdated: '2026-06-02', notes: 'Mixed grassland and scrub ecosystem; overgrazing pressure noted on upper slopes.',
  },
  {
    id: 'kew-eh-022', region: 'Poonch', district: 'Poonch', scope: 'Trans-Divisional',
    ecosystemType: 'Temperate Forest', healthIndex: 63, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 65, vegetationScore: 68, biodiversityScore: 62, soilScore: 60,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled', 'Forest Survey India'],
    trend: 'Stable', lastUpdated: '2026-05-28', notes: 'Pir Panjal range forests under moderate pressure; good riparian cover along Poonch river.',
  },
  {
    id: 'kew-eh-023', region: 'Muzaffarabad', district: 'Muzaffarabad', scope: 'Transboundary / Extended',
    ecosystemType: 'Temperate Forest', healthIndex: 70, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 75, vegetationScore: 72, biodiversityScore: 68, soilScore: 66,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled', 'AJK Forest Dept.'],
    trend: 'Stable', lastUpdated: '2026-06-01', notes: 'Neelum Valley temperate forests under logging and landslide pressure.',
  },
  {
    id: 'kew-eh-017', region: 'Rawalakot', district: 'Poonch (AJK)', scope: 'Transboundary / Extended',
    ecosystemType: 'Sub-Alpine', healthIndex: 74, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 78, vegetationScore: 75, biodiversityScore: 72, soilScore: 70,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled'],
    trend: 'Stable', lastUpdated: '2026-05-28', notes: 'Sub-alpine grasslands showing stable cover; limited ground data.',
  },
  {
    id: 'kew-eh-018', region: 'Gilgit', district: 'Gilgit', scope: 'Transboundary / Extended',
    ecosystemType: 'Alpine', healthIndex: 79, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 82, vegetationScore: 68, biodiversityScore: 84, soilScore: 80,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Low', dataSources: ['Aga Khan Development Network', 'Satellite'],
    trend: 'Stable', lastUpdated: '2026-05-25', notes: 'Karakoram range ecosystem; GLOF risk from glacial lake expansion.',
  },
  {
    id: 'kew-eh-019', region: 'Hunza', district: 'Hunza-Nagar', scope: 'Transboundary / Extended',
    ecosystemType: 'Alpine', healthIndex: 85, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 90, vegetationScore: 72, biodiversityScore: 88, soilScore: 84,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled'],
    trend: 'Stable', lastUpdated: '2026-05-20', notes: 'High-altitude ecosystem in excellent condition; minimal anthropogenic pressure.',
  },
  {
    id: 'kew-eh-020', region: 'Skardu', district: 'Skardu', scope: 'Transboundary / Extended',
    ecosystemType: 'Arid', healthIndex: 76, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 80, vegetationScore: 62, biodiversityScore: 80, soilScore: 82,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Low', dataSources: ['Satellite Modelled'],
    trend: 'Stable', lastUpdated: '2026-05-18', notes: 'Cold high-altitude desert ecosystem; increasing GLOF and flash-flood exposure.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getHealthGradient(grade: HealthGrade): string {
  const g: Record<HealthGrade, string> = {
    Healthy: 'from-emerald-500 to-green-600',
    Fair: 'from-teal-500 to-cyan-600',
    Stressed: 'from-amber-500 to-orange-600',
    Degraded: 'from-orange-500 to-red-600',
    Critical: 'from-red-600 to-rose-700',
  };
  return g[grade];
}

function getHealthBadgeVariant(grade: HealthGrade): 'success' | 'info' | 'warning' | 'danger' | 'critical' {
  const v: Record<HealthGrade, 'success' | 'info' | 'warning' | 'danger' | 'critical'> = {
    Healthy: 'success',
    Fair: 'info',
    Stressed: 'warning',
    Degraded: 'danger',
    Critical: 'critical',
  };
  return v[grade];
}

function getStressColor(stress: StressLevel): string {
  const c: Record<StressLevel, string> = {
    Low: 'text-emerald-400',
    Moderate: 'text-amber-400',
    High: 'text-orange-400',
    Critical: 'text-red-400',
  };
  return c[stress];
}

function getRestoPriorityBadge(priority: RestorationPriority): 'success' | 'info' | 'warning' | 'danger' {
  const v: Record<RestorationPriority, 'success' | 'info' | 'warning' | 'danger'> = {
    Low: 'success', Medium: 'info', High: 'warning', Urgent: 'danger',
  };
  return v[priority];
}

function getEcosystemIcon(type: EcosystemType) {
  switch (type) {
    case 'Alpine': case 'Sub-Alpine': return Mountain;
    case 'Temperate Forest': return TreePine;
    case 'Wetland': return Waves;
    case 'Riverine': return Droplets;
    case 'Arid': return Wind;
    case 'Grassland': case 'Agricultural': return Leaf;
    default: return Globe;
  }
}

function getTrendIcon(trend: 'Improving' | 'Stable' | 'Declining') {
  if (trend === 'Improving') return { icon: TrendingUp, cls: 'text-emerald-400' };
  if (trend === 'Declining') return { icon: TrendingDown, cls: 'text-red-400' };
  return { icon: Minus, cls: 'text-slate-400' };
}

function IndexBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${color} transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD COMPONENT — mirrors AirQualityCard structure
// ─────────────────────────────────────────────────────────────────────────────

const CONFIDENCE_CHIP: Record<string, string> = {
  'High':      'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Medium':    'text-cyan-400    bg-cyan-500/10    border-cyan-500/30',
  'Low':       'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'Modelled':  'text-violet-400  bg-violet-500/10  border-violet-500/30',
};

function EcologicalHealthCard({ record, index }: { record: EcologicalHealthRecord; index: number }) {
  const EcoIcon = getEcosystemIcon(record.ecosystemType);
  const trendMeta = getTrendIcon(record.trend);
  const TrendIcon = trendMeta.icon;
  const confChip = CONFIDENCE_CHIP[record.dataConfidence];
  const gradBadge = getHealthGradient(record.healthGrade);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      className="flex flex-col h-full"
    >
      <Card className="glass-intense border-white/10 p-5 flex flex-col h-full hover:border-white/20 transition-all group">
        {/* Header: Region + Health Index */}
        <div className="flex justify-between items-start mb-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
              {record.region}
            </h3>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{record.scope}</span>
            </div>
          </div>
          <Badge variant={getHealthBadgeVariant(record.healthGrade)} className="flex flex-col items-center justify-center px-3 py-1 flex-shrink-0">
            <span className="text-[10px] uppercase opacity-80 leading-tight">EHI</span>
            <span className="text-lg font-black leading-tight">{record.healthIndex}</span>
          </Badge>
        </div>

        {/* Data Confidence */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] w-full mb-3 ${confChip}`}>
          <Shield className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium truncate">Data Confidence: {record.dataConfidence}</span>
        </div>

        {/* Ecosystem type badge + Health grade */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradBadge} flex items-center justify-center flex-shrink-0`}>
            <EcoIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{record.ecosystemType}</div>
            <div className="text-[10px] text-slate-400">{record.healthGrade} Condition</div>
          </div>
        </div>

        {/* Sub-index bars */}
        <div className="space-y-2 mb-3">
          {[
            { label: 'Water', value: record.waterScore, color: 'bg-cyan-500' },
            { label: 'Vegetation', value: record.vegetationScore, color: 'bg-emerald-500' },
            { label: 'Biodiversity', value: record.biodiversityScore, color: 'bg-violet-500' },
            { label: 'Soil', value: record.soilScore, color: 'bg-amber-500' },
          ].map(sub => (
            <div key={sub.label}>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-slate-400">{sub.label}</span>
                <span className="text-slate-300 font-mono">{sub.value}</span>
              </div>
              <IndexBar value={sub.value} color={sub.color} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Stress Level</span>
            <span className={`font-bold ${getStressColor(record.stressLevel)}`}>{record.stressLevel}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Trend</span>
            <span className={`font-medium flex items-center gap-1 ${trendMeta.cls}`}>
              <TrendIcon className="w-3 h-3" /> {record.trend}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Restoration</span>
            <span className={`font-bold ${record.restorationPriority === 'Urgent' ? 'text-red-400' : record.restorationPriority === 'High' ? 'text-orange-400' : record.restorationPriority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {record.restorationPriority}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Updated</span>
            <span className="text-slate-400 font-mono">{record.lastUpdated}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW COMPONENT — mirrors AirQualityRow structure
// ─────────────────────────────────────────────────────────────────────────────

function EcologicalHealthRow({ record, index }: { record: EcologicalHealthRecord; index: number }) {
  const EcoIcon = getEcosystemIcon(record.ecosystemType);
  const trendMeta = getTrendIcon(record.trend);
  const TrendIcon = trendMeta.icon;
  const confChip = CONFIDENCE_CHIP[record.dataConfidence];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">
          {/* Region */}
          <div className="min-w-[160px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{record.region}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {record.district} · {record.scope}
            </div>
          </div>

          {/* Health Index */}
          <div className="w-28">
            <div className="text-[10px] text-slate-500 mb-1">Eco Health Index</div>
            <Badge variant={getHealthBadgeVariant(record.healthGrade)} size="sm" className="shadow-sm">
              <span className="text-xs font-bold">{record.healthIndex}</span>
              <span className="text-[10px] uppercase ml-1 opacity-80 truncate hidden sm:inline">{record.healthGrade}</span>
            </Badge>
          </div>

          {/* Ecosystem Type */}
          <div className="w-36 hidden md:flex items-center gap-2">
            <EcoIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-xs text-slate-300">{record.ecosystemType}</span>
          </div>

          {/* Sub-scores */}
          <div className="w-52 hidden md:flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Water</div>
              <div className="text-xs font-bold text-cyan-400">{record.waterScore}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Veg.</div>
              <div className="text-xs font-bold text-emerald-400">{record.vegetationScore}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Biodiv.</div>
              <div className="text-xs font-bold text-violet-400">{record.biodiversityScore}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Soil</div>
              <div className="text-xs font-bold text-amber-400">{record.soilScore}</div>
            </div>
          </div>

          {/* Confidence */}
          <div className="w-36 hidden lg:block">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${confChip}`}>
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium truncate">{record.dataConfidence} Confidence</span>
            </div>
          </div>

          {/* Stress */}
          <div className="w-20 hidden xl:block text-right">
            <div className="text-[10px] text-slate-500 mb-0.5">Stress</div>
            <div className={`text-xs font-bold ${getStressColor(record.stressLevel)}`}>{record.stressLevel}</div>
          </div>

          {/* Trend */}
          <div className="w-20 hidden sm:block text-right">
            <div className="text-[10px] text-slate-500 mb-0.5">Trend</div>
            <span className={`text-xs font-medium flex items-center justify-end gap-1 ${trendMeta.cls}`}>
              <TrendIcon className="w-3 h-3" /> {record.trend}
            </span>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<ChevronRight className="w-3 h-3" />}>
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

const ITEMS_PER_PAGE = 12;

const ECOSYSTEM_TYPES: EcosystemType[] = [
  'Alpine', 'Sub-Alpine', 'Temperate Forest', 'Wetland', 'Riverine', 'Arid', 'Grassland', 'Agricultural',
];

export default function EcologicalHealthPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [ecosystemFilter, setEcosystemFilter] = useState('all');
  const [stressFilter, setStressFilter] = useState('all');
  const [restoPriorityFilter, setRestoPriorityFilter] = useState('all');

  // ── KPI derivations ────────────────────────────────────────────────────────

  const totalUnits = ecologicalHealthRegistry.length;
  const avgHealthIndex = Math.round(
    ecologicalHealthRegistry.reduce((a, r) => a + r.healthIndex, 0) / totalUnits
  );
  const criticalCount = ecologicalHealthRegistry.filter(r => r.stressLevel === 'Critical').length;
  const highStressCount = ecologicalHealthRegistry.filter(r => r.stressLevel === 'High' || r.stressLevel === 'Critical').length;
  const urgentRestoCount = ecologicalHealthRegistry.filter(r => r.restorationPriority === 'Urgent').length;
  const criticalWatersheds = ecologicalHealthRegistry.filter(r =>
    (r.ecosystemType === 'Wetland' || r.ecosystemType === 'Riverine') && r.stressLevel !== 'Low'
  ).length;
  const decliningCount = ecologicalHealthRegistry.filter(r => r.trend === 'Declining').length;

  // ── Filter logic ───────────────────────────────────────────────────────────

  const filteredData = useMemo(() => ecologicalHealthRegistry.filter(r => {
    const matchSearch = filter.searchQuery === '' ||
      r.region.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      r.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      r.scope.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      r.ecosystemType.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchScope = filter.scope === 'All' || r.scope === filter.scope;
    const matchDistrict = filter.district === 'All' || r.district === filter.district;

    const matchEcosystem = ecosystemFilter === 'all' || r.ecosystemType === ecosystemFilter;
    const matchStress = stressFilter === 'all' || r.stressLevel === stressFilter;
    const matchResto = restoPriorityFilter === 'all' || r.restorationPriority === restoPriorityFilter;

    return matchSearch && matchScope && matchDistrict && matchEcosystem && matchStress && matchResto;
  }), [filter, ecosystemFilter, stressFilter, restoPriorityFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  React.useEffect(() => { setCurrentPage(1); }, [ecosystemFilter, stressFilter, restoPriorityFilter, filter]);

  // Urgent restoration records
  const urgentRestorationRecords = ecologicalHealthRegistry
    .filter(r => r.restorationPriority === 'Urgent' || r.restorationPriority === 'High')
    .sort((a, b) => a.healthIndex - b.healthIndex)
    .slice(0, 5);

  const extraActiveCount = [
    ecosystemFilter !== 'all',
    stressFilter !== 'all',
    restoPriorityFilter !== 'all',
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── Hero Heading ──────────────────────────────────────────────────────── */}
      <Heading
        label="Environmental Monitoring"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Ecological Health' }
        ]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Ecological Health</span>
          </>}
        subtitle="Ecosystem condition, environmental stress, and habitat integrity intelligence across all 20 KEW regional units — water, vegetation, biodiversity, soil, and hazard exposure indicators."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
      />

      {/* ── KPI Strip ─────────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={[
        { label: 'Regional Units',       value: totalUnits,         icon: 'MapPin'        },
        { label: 'Avg. Health Index',    value: avgHealthIndex,     icon: 'Activity',     color: 'text-emerald-400' },
        { label: 'High-Stress Zones',   value: highStressCount,    icon: 'AlertTriangle', color: 'text-orange-400' },
        { label: 'Critical Watersheds', value: criticalWatersheds, icon: 'Droplets',     color: 'text-red-400' },
        { label: 'Urgent Restoration',  value: urgentRestoCount,   icon: 'TrendingDown', color: 'text-rose-400' },
        { label: 'Declining Trend',     value: decliningCount,     icon: 'TrendingUp',   color: 'text-amber-400' },
      ]} iconColor="text-emerald-500" />

      {/* ── Filter Bar ────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <div className="flex flex-wrap gap-2">
              <FilterSelect
                value={ecosystemFilter}
                onChange={setEcosystemFilter}
                placeholder="All Ecosystem Types"
                options={ECOSYSTEM_TYPES.map(t => ({ value: t, label: t }))}
              />
              <FilterSelect
                value={stressFilter}
                onChange={setStressFilter}
                placeholder="All Stress Levels"
                options={[
                  { value: 'Low',      label: 'Low Stress'      },
                  { value: 'Moderate', label: 'Moderate Stress' },
                  { value: 'High',     label: 'High Stress'     },
                  { value: 'Critical', label: 'Critical Stress' },
                ]}
              />
              <FilterSelect
                value={restoPriorityFilter}
                onChange={setRestoPriorityFilter}
                placeholder="All Restoration Priorities"
                options={[
                  { value: 'Low',    label: 'Low Priority'    },
                  { value: 'Medium', label: 'Medium Priority' },
                  { value: 'High',   label: 'High Priority'   },
                  { value: 'Urgent', label: 'Urgent Priority' },
                ]}
              />
            </div>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => { setEcosystemFilter('all'); setStressFilter('all'); setRestoPriorityFilter('all'); }}
        />
      </div>

      {/* ── Scope Row ─────────────────────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalUnits}
        entityLabel="ecosystem units"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Units')}
        scopeCount={filter.scope === 'All' ? 0 : ecologicalHealthRegistry.filter(r => r.scope === filter.scope).length}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── Main Registry Section ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">

          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                20-Unit Ecological Health Registry
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Composite Ecological Health Index — water, vegetation, biodiversity, soil & hazard exposure
                <span className="ml-2 text-[10px] text-slate-500 font-mono border border-white/10 px-2 py-0.5 rounded">
                  Mock Data · Plug-in ready for NDVI / JKPCC / India-WRIS feeds
                </span>
              </p>
            </div>
          </motion.div>

          {/* Data display */}
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Leaf className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No units found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((r, i) => <EcologicalHealthCard key={r.id} record={r} index={i} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((r, i) => <EcologicalHealthRow key={r.id} record={r} index={i} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                Previous
              </Button>
              <div className="text-sm text-slate-400">
                Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}
              </div>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── District / Region Health Table ────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-teal-400" />
              Regional Ecosystem Condition Profiles
            </h2>
            <p className="text-slate-400">Composite health index, stress level, and restoration priority by district and scope</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Region / District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Scope</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">EHI</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Grade</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stress</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Restoration</th>
                </tr>
              </thead>
              <tbody>
                {ecologicalHealthRegistry
                  .sort((a, b) => a.healthIndex - b.healthIndex)
                  .map((r, i) => {
                    const trendMeta = getTrendIcon(r.trend);
                    const TrendIcon = trendMeta.icon;
                    return (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.02 }}
                        className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="text-white font-medium">{r.region}</span>
                          <div className="text-[10px] text-slate-500">{r.district}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-slate-400">{r.scope}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-sm font-black ${r.healthIndex < 50 ? 'text-red-400' : r.healthIndex < 65 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {r.healthIndex}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={getHealthBadgeVariant(r.healthGrade)} size="sm">{r.healthGrade}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs font-bold ${getStressColor(r.stressLevel)}`}>{r.stressLevel}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs font-medium flex items-center justify-center gap-1 ${trendMeta.cls}`}>
                            <TrendIcon className="w-3 h-3" /> {r.trend}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={getRestoPriorityBadge(r.restorationPriority)} size="sm">{r.restorationPriority}</Badge>
                        </td>
                      </motion.tr>
                    );
                  })}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* ── Restoration Priority Panel ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              Restoration Priority Sites
            </h2>
            <p className="text-slate-400">Ecosystems requiring urgent or high-priority intervention based on composite health scoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentRestorationRecords.map((r, i) => {
              const EcoIcon = getEcosystemIcon(r.ecosystemType);
              return (
                <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <Card className="glass-intense border-white/10 hover:border-rose-500/30 transition-all p-5 group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${getHealthGradient(r.healthGrade)} flex items-center justify-center flex-shrink-0`}>
                          <EcoIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">{r.region}</h3>
                          <p className="text-[10px] text-slate-500">{r.ecosystemType} · {r.scope}</p>
                        </div>
                      </div>
                      <Badge variant={getRestoPriorityBadge(r.restorationPriority)} size="sm">{r.restorationPriority} Priority</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">{r.notes}</p>
                    <div className="grid grid-cols-3 gap-2 text-[10px] mt-2">
                      <div className="bg-white/5 rounded p-1.5 text-center">
                        <div className="text-slate-500 mb-0.5">EHI</div>
                        <div className="font-bold text-rose-400">{r.healthIndex}</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5 text-center">
                        <div className="text-slate-500 mb-0.5">Stress</div>
                        <div className={`font-bold ${getStressColor(r.stressLevel)}`}>{r.stressLevel}</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5 text-center">
                        <div className="text-slate-500 mb-0.5">Confidence</div>
                        <div className="font-bold text-slate-300">{r.dataConfidence}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Methodology & Data Sources ────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-intense border-emerald-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FlaskConical className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Methodology & Scoring Model</h3>
                  <p className="text-xs text-slate-500 mb-4">Transparent weighted indicator framework — KEW Ecological Health Intelligence v1.0</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2">Composite EHI Formula</h4>
                      <div className="space-y-1.5 text-xs text-slate-400">
                        {[
                          { label: 'Water Condition', weight: '25%', src: 'JKPCC, NWIA, India-WRIS' },
                          { label: 'Vegetation / Forest Condition', weight: '20%', src: 'Sentinel-2 NDVI, Forest Survey India' },
                          { label: 'Biodiversity Condition', weight: '20%', src: 'WWF, GBIF, Field Surveys' },
                          { label: 'Soil Health', weight: '15%', src: 'Soil Health Card Scheme, ICAR' },
                          { label: 'Hazard Exposure', weight: '10%', src: 'KEW Hazard Intelligence' },
                          { label: 'Climate Stress', weight: '10%', src: 'Open-Meteo, IMD' },
                        ].map(row => (
                          <div key={row.label} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono w-8 flex-shrink-0">{row.weight}</span>
                            <span className="font-medium text-slate-300">{row.label}</span>
                            <span className="text-slate-600 ml-auto text-[9px] hidden md:block">{row.src}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-teal-400 mb-2">Health Grade Thresholds</h4>
                      <div className="space-y-1.5 text-xs">
                        {[
                          { grade: 'Healthy',  range: '≥ 75', color: 'text-emerald-400' },
                          { grade: 'Fair',     range: '60–74', color: 'text-teal-400' },
                          { grade: 'Stressed', range: '45–59', color: 'text-amber-400' },
                          { grade: 'Degraded', range: '30–44', color: 'text-orange-400' },
                          { grade: 'Critical', range: '< 30',  color: 'text-red-400' },
                        ].map(g => (
                          <div key={g.grade} className="flex items-center gap-3">
                            <span className={`font-bold w-16 ${g.color}`}>{g.grade}</span>
                            <span className="text-slate-500">EHI {g.range}</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-sm font-semibold text-violet-400 mb-2 mt-4">Data Sources Integrated</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['JKPCC', 'NWIA', 'India-WRIS', 'Forest Survey India', 'Sentinel-2', 'MODIS NDVI', 'GBIF', 'WWF', 'Open-Meteo', 'IMD', 'ICAR', 'Field Surveys'].map(src => (
                          <span key={src} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
                    <Database className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Current data layer uses curated mock values with realistic ecological ranges. Records are structured for direct NDVI, water-quality, and biodiversity API ingestion when live feeds are connected.</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Cross-links ───────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence Modules</h2>
            <p className="text-slate-400">Explore connected environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Water Systems', href: '/water-systems', desc: 'Lakes, rivers, wetlands & water health', icon: Droplets, color: 'from-cyan-500 to-teal-600' },
              { label: 'Protected Areas', href: '/protected-areas', desc: 'Wildlife sanctuaries & national parks', icon: Shield, color: 'from-emerald-500 to-green-600' },
              { label: 'Hazard Intelligence', href: '/hazard-intelligence', desc: 'Flood, fire, GLOF & landslide risk', icon: AlertTriangle, color: 'from-orange-500 to-red-600' },
              { label: 'Air Pollution', href: '/environmental-monitoring/air-pollution', desc: 'PM2.5, AQI & atmospheric quality', icon: Wind, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{link.label}</h3>
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
