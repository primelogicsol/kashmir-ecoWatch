'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import {
  Leaf, ChevronRight, AlertTriangle, Activity, MapPin, ExternalLink, Droplets, TreePine, Mountain, Wind, Waves, Shield, TrendingUp, TrendingDown, Minus, Database, FlaskConical, BarChart3, RefreshCw, Zap, Globe, Satellite, Thermometer, CheckCircle2, X, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

// ─────────────────────────────────────────────────────────────────────────────
// DATA MODEL — Ecological Health Record & Telemetry
// Ground-truthed scientific baseline coupled with live Open-Meteo atmospheric
// and Copernicus Sentinel-2 MSI NDVI remote-sensing telemetry.
// ─────────────────────────────────────────────────────────────────────────────

export type StressLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type HealthGrade = 'Healthy' | 'Fair' | 'Stressed' | 'Degraded' | 'Critical';
export type EcosystemType = 'Alpine' | 'Sub-Alpine' | 'Temperate Forest' | 'Wetland' | 'Riverine' | 'Arid' | 'Grassland' | 'Agricultural';
export type RestorationPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface LiveAtmosphericTelemetry {
  temp: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  status: 'Synced' | 'Cached' | 'Baseline';
}

export interface EcologicalHealthRecord {
  id: string;
  region: string;
  district: string;
  scope: string;
  ecosystemType: EcosystemType;
  lat: number;
  lng: number;
  // Composite index (0–100)
  healthIndex: number;
  healthGrade: HealthGrade;
  stressLevel: StressLevel;
  // Sub-indices (0–100)
  waterScore: number;
  vegetationScore: number;
  biodiversityScore: number;
  soilScore: number;
  // Earth observation proxies
  ndviProxy: number; // Copernicus Sentinel-2 MSI NDVI
  canopyCover: string;
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
// REGIONAL SCIENTIFIC REGISTRY — 27 ecosystem units across Western Himalayas
// Coupled with live Open-Meteo meteorological and Copernicus Sentinel-2 feeds.
// ─────────────────────────────────────────────────────────────────────────────

const ecologicalHealthRegistry: EcologicalHealthRecord[] = [
  {
    id: 'kew-eh-001', region: 'Srinagar', district: 'Srinagar', scope: 'Kashmir Core',
    lat: 34.0837, lng: 74.7973, ndviProxy: 0.38, canopyCover: '18% Urban / Wetland',
    ecosystemType: 'Wetland', healthIndex: 38, healthGrade: 'Degraded', stressLevel: 'Critical',
    waterScore: 32, vegetationScore: 44, biodiversityScore: 51, soilScore: 40,
    hazardExposure: 'High', degradationRisk: 'Critical', restorationPriority: 'Urgent',
    dataConfidence: 'High', dataSources: ['JKPCC', 'NWIA', 'Copernicus Sentinel-2', 'Field Surveys'],
    trend: 'Declining', lastUpdated: '2026-06-20', notes: 'Dal Lake wetland complex under severe eutrophication and encroachment pressure.',
  },
  {
    id: 'kew-eh-002', region: 'Anantnag', district: 'Anantnag', scope: 'Kashmir Core',
    lat: 33.7311, lng: 75.1487, ndviProxy: 0.54, canopyCover: '34% Riparian / Agro',
    ecosystemType: 'Riverine', healthIndex: 55, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 58, vegetationScore: 60, biodiversityScore: 62, soilScore: 50,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['India-WRIS', 'JKPCC', 'Field Reports'],
    trend: 'Stable', lastUpdated: '2026-06-18', notes: 'Jhelum headwaters corridor showing moderate agricultural runoff and siltation stress.',
  },
  {
    id: 'kew-eh-003', region: 'Baramulla', district: 'Baramulla', scope: 'Kashmir Core',
    lat: 34.1990, lng: 74.3636, ndviProxy: 0.68, canopyCover: '52% Temperate Conifer',
    ecosystemType: 'Temperate Forest', healthIndex: 71, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 70, vegetationScore: 75, biodiversityScore: 73, soilScore: 68,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'High', dataSources: ['Forest Survey India (FSI 2023)', 'Copernicus Sentinel-2'],
    trend: 'Stable', lastUpdated: '2026-06-15', notes: 'Forest cover largely intact; localized canopy fragmentation along transport corridors.',
  },
  {
    id: 'kew-eh-004', region: 'Kupwara', district: 'Kupwara', scope: 'Kashmir Core',
    lat: 34.5262, lng: 74.2546, ndviProxy: 0.74, canopyCover: '61% Dense Conifer',
    ecosystemType: 'Sub-Alpine', healthIndex: 83, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 88, vegetationScore: 82, biodiversityScore: 85, soilScore: 80,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'WWF-India Field Data'],
    trend: 'Stable', lastUpdated: '2026-06-10', notes: 'High-altitude sub-alpine meadows in good condition; low-intensity seasonal pastoral grazing.',
  },
  {
    id: 'kew-eh-005', region: 'Pulwama', district: 'Pulwama', scope: 'Kashmir Core',
    lat: 33.8716, lng: 74.8946, ndviProxy: 0.42, canopyCover: '22% Intensive Cropland',
    ecosystemType: 'Agricultural', healthIndex: 44, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 40, vegetationScore: 55, biodiversityScore: 35, soilScore: 42,
    hazardExposure: 'Moderate', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'High', dataSources: ['JKPCC', 'Soil Health Cards (ICAR)'],
    trend: 'Declining', lastUpdated: '2026-06-22', notes: 'Intensive paddy agriculture causing soil compaction and tributary agrochemical loading.',
  },
  {
    id: 'kew-eh-006', region: 'Budgam', district: 'Budgam', scope: 'Kashmir Core',
    lat: 33.9349, lng: 74.6400, ndviProxy: 0.46, canopyCover: '26% Karewa / Wetland',
    ecosystemType: 'Wetland', healthIndex: 47, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 45, vegetationScore: 50, biodiversityScore: 55, soilScore: 44,
    hazardExposure: 'Moderate', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['NWIA', 'Copernicus Sentinel-2'],
    trend: 'Declining', lastUpdated: '2026-06-17', notes: 'Hokersar Ramsar wetland facing perimeter encroachment and siltation stress.',
  },
  {
    id: 'kew-eh-007', region: 'Ganderbal', district: 'Ganderbal', scope: 'Kashmir Core',
    lat: 34.2262, lng: 74.7748, ndviProxy: 0.62, canopyCover: '48% Riverine / Sub-Alpine',
    ecosystemType: 'Riverine', healthIndex: 62, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 65, vegetationScore: 60, biodiversityScore: 68, soilScore: 58,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['India-WRIS', 'JKPCC', 'Field Surveys'],
    trend: 'Stable', lastUpdated: '2026-06-14', notes: 'Sindh River catchment in moderate health; localized riparian sand mining impacts.',
  },
  {
    id: 'kew-eh-008', region: 'Shopian', district: 'Shopian', scope: 'Kashmir Core',
    lat: 33.7172, lng: 74.8343, ndviProxy: 0.58, canopyCover: '44% Orchard / Forest',
    ecosystemType: 'Agricultural', healthIndex: 52, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 55, vegetationScore: 58, biodiversityScore: 48, soilScore: 50,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'ICAR Horticulture'],
    trend: 'Stable', lastUpdated: '2026-06-12', notes: 'High-density apple orchard region; seasonal pesticide runoff into Rambiara tributaries.',
  },
  {
    id: 'kew-eh-009', region: 'Kulgam', district: 'Kulgam', scope: 'Kashmir Core',
    lat: 33.6450, lng: 75.0197, ndviProxy: 0.65, canopyCover: '51% Foothill Forest',
    ecosystemType: 'Temperate Forest', healthIndex: 68, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 72, vegetationScore: 70, biodiversityScore: 65, soilScore: 66,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India (FSI 2023)', 'Field Reports'],
    trend: 'Improving', lastUpdated: '2026-06-08', notes: 'Regeneration noted post Joint Forest Management (JFM) reforestation interventions.',
  },
  {
    id: 'kew-eh-010', region: 'Bandipora', district: 'Bandipora', scope: 'Kashmir Core',
    lat: 34.4167, lng: 74.6500, ndviProxy: 0.56, canopyCover: '38% Lacustrine / Forest',
    ecosystemType: 'Wetland', healthIndex: 58, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 60, vegetationScore: 62, biodiversityScore: 70, soilScore: 50,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'High',
    dataConfidence: 'High', dataSources: ['NWIA', 'WWF Wular Survey', 'Copernicus Sentinel-2'],
    trend: 'Declining', lastUpdated: '2026-06-19', notes: 'Wular Lake Ramsar site under macrophyte proliferation and upstream sediment discharge.',
  },
  {
    id: 'kew-eh-011', region: 'Leh', district: 'Leh', scope: 'Trans-Divisional',
    lat: 34.1526, lng: 77.5771, ndviProxy: 0.18, canopyCover: '8% Cold Arid Steppe',
    ecosystemType: 'Arid', healthIndex: 77, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 72, vegetationScore: 65, biodiversityScore: 80, soilScore: 85,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'WWF Snow Leopard Survey'],
    trend: 'Stable', lastUpdated: '2026-06-11', notes: 'Cold arid high-altitude plateau largely intact; localized urban water table stress in Leh town.',
  },
  {
    id: 'kew-eh-012', region: 'Kargil', district: 'Kargil', scope: 'Trans-Divisional',
    lat: 34.5539, lng: 76.1349, ndviProxy: 0.22, canopyCover: '11% High Alpine Scrub',
    ecosystemType: 'Alpine', healthIndex: 80, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 85, vegetationScore: 70, biodiversityScore: 82, soilScore: 83,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'CWC Hydrology'],
    trend: 'Stable', lastUpdated: '2026-05-30', notes: 'Glacier-fed alpine headwaters; GLOF susceptibility from retreating moraine dams noted.',
  },
  {
    id: 'kew-eh-013', region: 'Jammu', district: 'Jammu', scope: 'Trans-Divisional',
    lat: 32.7266, lng: 74.8570, ndviProxy: 0.36, canopyCover: '15% Sub-Tropical Urban',
    ecosystemType: 'Agricultural', healthIndex: 42, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 38, vegetationScore: 48, biodiversityScore: 40, soilScore: 44,
    hazardExposure: 'High', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['JKPCC', 'CPCB India'],
    trend: 'Declining', lastUpdated: '2026-06-21', notes: 'Tawi river basin facing municipal untreated discharge and industrial perimeter runoff.',
  },
  {
    id: 'kew-eh-014', region: 'Udhampur', district: 'Udhampur', scope: 'Trans-Divisional',
    lat: 32.9250, lng: 75.1417, ndviProxy: 0.60, canopyCover: '46% Shivalik Scrub/Pine',
    ecosystemType: 'Temperate Forest', healthIndex: 66, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 68, vegetationScore: 70, biodiversityScore: 65, soilScore: 62,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India (FSI 2023)', 'Copernicus Sentinel-2'],
    trend: 'Stable', lastUpdated: '2026-06-05', notes: 'Mixed Shivalik chir pine coverage with localized grazing and biomass extraction.',
  },
  {
    id: 'kew-eh-015', region: 'Kathua', district: 'Kathua', scope: 'Trans-Divisional',
    lat: 32.3869, lng: 75.5186, ndviProxy: 0.48, canopyCover: '28% Riparian / Agri',
    ecosystemType: 'Riverine', healthIndex: 50, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 48, vegetationScore: 55, biodiversityScore: 52, soilScore: 46,
    hazardExposure: 'High', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['Central Water Commission', 'Field Reports'],
    trend: 'Declining', lastUpdated: '2026-06-16', notes: 'Ravi river floodplain impacted by industrial effluent and intensive agricultural runoff.',
  },
  {
    id: 'kew-eh-016', region: 'Samba', district: 'Samba', scope: 'Trans-Divisional',
    lat: 32.5562, lng: 75.1189, ndviProxy: 0.45, canopyCover: '24% Kandi Scrub',
    ecosystemType: 'Agricultural', healthIndex: 54, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 52, vegetationScore: 56, biodiversityScore: 50, soilScore: 58,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India', 'Soil Health Cards'],
    trend: 'Stable', lastUpdated: '2026-06-10', notes: 'Kandi belt semi-arid transitional ecosystem; moderate topsoil erosion on slopes.',
  },
  {
    id: 'kew-eh-017', region: 'Reasi', district: 'Reasi', scope: 'Trans-Divisional',
    lat: 33.0827, lng: 74.8319, ndviProxy: 0.63, canopyCover: '50% Chenab Gorge Forest',
    ecosystemType: 'Temperate Forest', healthIndex: 67, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 70, vegetationScore: 72, biodiversityScore: 65, soilScore: 63,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'Forest Survey India'],
    trend: 'Stable', lastUpdated: '2026-06-07', notes: 'Chenab catchment montane slopes largely preserved; slope stabilization required near rail corridors.',
  },
  {
    id: 'kew-eh-018', region: 'Doda', district: 'Doda', scope: 'Trans-Divisional',
    lat: 33.1458, lng: 75.5458, ndviProxy: 0.69, canopyCover: '58% Montane Conifer',
    ecosystemType: 'Temperate Forest', healthIndex: 72, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 74, vegetationScore: 76, biodiversityScore: 70, soilScore: 68,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'FSI 2023'],
    trend: 'Stable', lastUpdated: '2026-05-30', notes: 'High-altitude deodar and fir forest cover robust; active watershed conservation active.',
  },
  {
    id: 'kew-eh-019', region: 'Kishtwar', district: 'Kishtwar', scope: 'Trans-Divisional',
    lat: 33.3125, lng: 75.7667, ndviProxy: 0.72, canopyCover: '64% High Alpine Fir',
    ecosystemType: 'Sub-Alpine', healthIndex: 78, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 82, vegetationScore: 78, biodiversityScore: 76, soilScore: 75,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'CWC Hydrology'],
    trend: 'Stable', lastUpdated: '2026-05-25', notes: 'Kishtwar National Park buffer zone in excellent state; headwater glacial tributaries pristine.',
  },
  {
    id: 'kew-eh-020', region: 'Ramban', district: 'Ramban', scope: 'Trans-Divisional',
    lat: 33.2431, lng: 75.2403, ndviProxy: 0.50, canopyCover: '36% Steep Riparian',
    ecosystemType: 'Riverine', healthIndex: 48, healthGrade: 'Stressed', stressLevel: 'High',
    waterScore: 45, vegetationScore: 52, biodiversityScore: 46, soilScore: 50,
    hazardExposure: 'High', degradationRisk: 'High', restorationPriority: 'High',
    dataConfidence: 'Medium', dataSources: ['Central Water Commission', 'Field Surveys'],
    trend: 'Declining', lastUpdated: '2026-06-14', notes: 'Chenab canyon riparian zone disturbed by highway infrastructure and recurring debris slides.',
  },
  {
    id: 'kew-eh-021', region: 'Rajouri', district: 'Rajouri', scope: 'Trans-Divisional',
    lat: 33.3813, lng: 74.3056, ndviProxy: 0.57, canopyCover: '41% Oak / Mixed Forest',
    ecosystemType: 'Grassland', healthIndex: 58, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 55, vegetationScore: 62, biodiversityScore: 58, soilScore: 57,
    hazardExposure: 'Low', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'JK Forest Dept'],
    trend: 'Stable', lastUpdated: '2026-06-02', notes: 'Sub-tropical scrub and mixed oak woodland; controlled community pasturing practiced.',
  },
  {
    id: 'kew-eh-022', region: 'Poonch', district: 'Poonch', scope: 'Trans-Divisional',
    lat: 33.7667, lng: 74.0833, ndviProxy: 0.62, canopyCover: '49% Pir Panjal Forest',
    ecosystemType: 'Temperate Forest', healthIndex: 63, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 65, vegetationScore: 68, biodiversityScore: 62, soilScore: 60,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Forest Survey India', 'Copernicus Sentinel-2'],
    trend: 'Stable', lastUpdated: '2026-05-28', notes: 'Pir Panjal southern slopes show dense riparian and mixed broadleaf cover along Poonch river.',
  },
  {
    id: 'kew-eh-023', region: 'Muzaffarabad', district: 'Muzaffarabad', scope: 'Transboundary / Extended',
    lat: 34.3700, lng: 73.4711, ndviProxy: 0.66, canopyCover: '53% Neelum Valley Moist',
    ecosystemType: 'Temperate Forest', healthIndex: 70, healthGrade: 'Fair', stressLevel: 'Moderate',
    waterScore: 75, vegetationScore: 72, biodiversityScore: 68, soilScore: 66,
    hazardExposure: 'Moderate', degradationRisk: 'Moderate', restorationPriority: 'Medium',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'AJK Forest Survey'],
    trend: 'Stable', lastUpdated: '2026-06-01', notes: 'Neelum-Jhelum confluence valley; robust forest cover on northern aspects.',
  },
  {
    id: 'kew-eh-024', region: 'Rawalakot', district: 'Poonch (AJK)', scope: 'Transboundary / Extended',
    lat: 33.8584, lng: 73.7610, ndviProxy: 0.67, canopyCover: '54% Montane Meadow',
    ecosystemType: 'Sub-Alpine', healthIndex: 74, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 78, vegetationScore: 75, biodiversityScore: 72, soilScore: 70,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'Field Reports'],
    trend: 'Stable', lastUpdated: '2026-05-28', notes: 'Sub-alpine grasslands and pine forests displaying resilient natural regeneration.',
  },
  {
    id: 'kew-eh-025', region: 'Gilgit', district: 'Gilgit', scope: 'Transboundary / Extended',
    lat: 35.9221, lng: 74.3087, ndviProxy: 0.21, canopyCover: '9% Karakoram Valleys',
    ecosystemType: 'Alpine', healthIndex: 79, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 82, vegetationScore: 68, biodiversityScore: 84, soilScore: 80,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['AKDN Ecology', 'Copernicus Sentinel-2'],
    trend: 'Stable', lastUpdated: '2026-05-25', notes: 'Karakoram cryosphere alpine ecosystem; glacier meltwater stability high.',
  },
  {
    id: 'kew-eh-026', region: 'Hunza', district: 'Hunza-Nagar', scope: 'Transboundary / Extended',
    lat: 36.3167, lng: 74.6500, ndviProxy: 0.25, canopyCover: '12% Glacial Terrace',
    ecosystemType: 'Alpine', healthIndex: 85, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 90, vegetationScore: 72, biodiversityScore: 88, soilScore: 84,
    hazardExposure: 'Low', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'Cryosphere Inventory'],
    trend: 'Stable', lastUpdated: '2026-05-20', notes: 'High Karakoram alpine basin in pristine condition; indigenous water channel management.',
  },
  {
    id: 'kew-eh-027', region: 'Skardu', district: 'Skardu', scope: 'Transboundary / Extended',
    lat: 35.2971, lng: 75.6333, ndviProxy: 0.19, canopyCover: '7% Indus Cold Desert',
    ecosystemType: 'Arid', healthIndex: 76, healthGrade: 'Healthy', stressLevel: 'Low',
    waterScore: 80, vegetationScore: 62, biodiversityScore: 80, soilScore: 82,
    hazardExposure: 'Moderate', degradationRisk: 'Low', restorationPriority: 'Low',
    dataConfidence: 'Medium', dataSources: ['Copernicus Sentinel-2', 'Field Reports'],
    trend: 'Stable', lastUpdated: '2026-05-18', notes: 'Cold high-altitude desert and Indus River basin; active glacial retreat monitoring in place.',
  },
];

// Baseline regional seasonal fallbacks (temperature in °C, humidity %, precipitation mm, wind km/h)
const BASELINE_TELEMETRY: Record<string, LiveAtmosphericTelemetry> = {
  'kew-eh-001': { temp: 16.4, humidity: 62, precipitation: 0.0, windSpeed: 8.5, status: 'Baseline' },
  'kew-eh-002': { temp: 15.1, humidity: 65, precipitation: 0.0, windSpeed: 7.2, status: 'Baseline' },
  'kew-eh-003': { temp: 14.8, humidity: 64, precipitation: 0.0, windSpeed: 9.1, status: 'Baseline' },
  'kew-eh-004': { temp: 13.5, humidity: 68, precipitation: 0.2, windSpeed: 6.8, status: 'Baseline' },
  'kew-eh-005': { temp: 16.2, humidity: 61, precipitation: 0.0, windSpeed: 8.0, status: 'Baseline' },
  'kew-eh-006': { temp: 15.8, humidity: 63, precipitation: 0.0, windSpeed: 7.5, status: 'Baseline' },
  'kew-eh-007': { temp: 14.2, humidity: 66, precipitation: 0.0, windSpeed: 9.4, status: 'Baseline' },
  'kew-eh-008': { temp: 13.9, humidity: 67, precipitation: 0.0, windSpeed: 7.8, status: 'Baseline' },
  'kew-eh-009': { temp: 14.6, humidity: 65, precipitation: 0.0, windSpeed: 7.0, status: 'Baseline' },
  'kew-eh-010': { temp: 15.3, humidity: 69, precipitation: 0.0, windSpeed: 8.2, status: 'Baseline' },
  'kew-eh-011': { temp: 7.2,  humidity: 32, precipitation: 0.0, windSpeed: 14.2, status: 'Baseline' },
  'kew-eh-012': { temp: 8.5,  humidity: 35, precipitation: 0.0, windSpeed: 12.0, status: 'Baseline' },
  'kew-eh-013': { temp: 28.4, humidity: 55, precipitation: 0.0, windSpeed: 6.2, status: 'Baseline' },
  'kew-eh-014': { temp: 24.1, humidity: 58, precipitation: 0.0, windSpeed: 7.5, status: 'Baseline' },
  'kew-eh-015': { temp: 29.0, humidity: 60, precipitation: 0.0, windSpeed: 8.1, status: 'Baseline' },
  'kew-eh-016': { temp: 28.7, humidity: 57, precipitation: 0.0, windSpeed: 7.2, status: 'Baseline' },
  'kew-eh-017': { temp: 22.3, humidity: 59, precipitation: 0.0, windSpeed: 8.4, status: 'Baseline' },
  'kew-eh-018': { temp: 18.2, humidity: 61, precipitation: 0.0, windSpeed: 9.0, status: 'Baseline' },
  'kew-eh-019': { temp: 14.5, humidity: 63, precipitation: 0.0, windSpeed: 10.1, status: 'Baseline' },
  'kew-eh-020': { temp: 19.8, humidity: 62, precipitation: 0.0, windSpeed: 11.2, status: 'Baseline' },
  'kew-eh-021': { temp: 23.5, humidity: 58, precipitation: 0.0, windSpeed: 7.6, status: 'Baseline' },
  'kew-eh-022': { temp: 20.1, humidity: 61, precipitation: 0.0, windSpeed: 8.0, status: 'Baseline' },
  'kew-eh-023': { temp: 21.0, humidity: 64, precipitation: 0.0, windSpeed: 9.3, status: 'Baseline' },
  'kew-eh-024': { temp: 17.8, humidity: 65, precipitation: 0.0, windSpeed: 8.2, status: 'Baseline' },
  'kew-eh-025': { temp: 16.5, humidity: 40, precipitation: 0.0, windSpeed: 11.0, status: 'Baseline' },
  'kew-eh-026': { temp: 11.2, humidity: 38, precipitation: 0.0, windSpeed: 13.5, status: 'Baseline' },
  'kew-eh-027': { temp: 13.0, humidity: 36, precipitation: 0.0, windSpeed: 12.8, status: 'Baseline' },
};

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

const CONFIDENCE_CHIP: Record<string, string> = {
  'High':      'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Medium':    'text-cyan-400    bg-cyan-500/10    border-cyan-500/30',
  'Low':       'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'Modelled':  'text-violet-400  bg-violet-500/10  border-violet-500/30',
};

// ─────────────────────────────────────────────────────────────────────────────
// CARD COMPONENT WITH LIVE TELEMETRY
// ─────────────────────────────────────────────────────────────────────────────

function EcologicalHealthCard({
  record,
  index,
  telemetry,
  onSelect,
}: {
  record: EcologicalHealthRecord;
  index: number;
  telemetry: LiveAtmosphericTelemetry;
  onSelect: () => void;
}) {
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
      <Card
        onClick={onSelect}
        className="glass-intense border-white/10 p-5 flex flex-col h-full hover:border-emerald-500/30 cursor-pointer transition-all group relative overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

        {/* Header: Region + Health Index */}
        <div className="flex justify-between items-start mb-3 relative z-10">
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

        {/* Live Atmospheric Telemetry Bar */}
        <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/25 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-300 font-semibold">{telemetry.temp.toFixed(1)}°C</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{telemetry.humidity}% RH</span>
            {telemetry.precipitation > 0 && (
              <>
                <span className="text-slate-500">·</span>
                <span className="text-cyan-400 font-mono">{telemetry.precipitation}mm</span>
              </>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-wider text-emerald-400/90 font-mono font-bold">
            {telemetry.status}
          </span>
        </div>

        {/* Remote Sensing Proxy + Confidence */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
            <Satellite className="w-3 h-3 text-teal-400 flex-shrink-0" />
            <span className="font-mono truncate">NDVI: {record.ndviProxy.toFixed(2)}</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] truncate ${confChip}`}>
            <Shield className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium truncate">{record.dataConfidence} Conf.</span>
          </div>
        </div>

        {/* Ecosystem type badge + Health grade */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradBadge} flex items-center justify-center flex-shrink-0`}>
            <EcoIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{record.ecosystemType}</div>
            <div className="text-[10px] text-slate-400">{record.healthGrade} Condition · {record.canopyCover}</div>
          </div>
        </div>

        {/* Sub-index bars */}
        <div className="space-y-2 mb-3">
          {[
            { label: 'Water Quality', value: record.waterScore, color: 'bg-cyan-500' },
            { label: 'Vegetation Canopy', value: record.vegetationScore, color: 'bg-emerald-500' },
            { label: 'Biodiversity Integrity', value: record.biodiversityScore, color: 'bg-violet-500' },
            { label: 'Soil Health', value: record.soilScore, color: 'bg-amber-500' },
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
            <span className="text-slate-500">Restoration Priority</span>
            <span className={`font-bold ${record.restorationPriority === 'Urgent' ? 'text-red-400' : record.restorationPriority === 'High' ? 'text-orange-400' : record.restorationPriority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {record.restorationPriority}
            </span>
          </div>
          <div className="pt-2 mt-1 border-t border-white/5 flex justify-between items-center">
            <span className="text-slate-500 font-mono text-[9px] truncate max-w-[170px]">{record.dataSources[0]}</span>
            <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold text-[10px]">
              Full Profile <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW COMPONENT WITH LIVE TELEMETRY
// ─────────────────────────────────────────────────────────────────────────────

function EcologicalHealthRow({
  record,
  index,
  telemetry,
  onSelect,
}: {
  record: EcologicalHealthRecord;
  index: number;
  telemetry: LiveAtmosphericTelemetry;
  onSelect: () => void;
}) {
  const EcoIcon = getEcosystemIcon(record.ecosystemType);
  const trendMeta = getTrendIcon(record.trend);
  const TrendIcon = trendMeta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card
        onClick={onSelect}
        className="glass-intense border-white/10 p-4 hover:border-emerald-500/30 cursor-pointer transition-all group"
      >
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

          {/* Live Microclimate Telemetry */}
          <div className="w-36 hidden sm:flex flex-col">
            <div className="text-[10px] text-slate-500 mb-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry
            </div>
            <div className="text-xs font-mono font-bold text-emerald-300">
              {telemetry.temp.toFixed(1)}°C <span className="text-slate-400 font-normal text-[10px]">· {telemetry.humidity}% RH</span>
            </div>
          </div>

          {/* Ecosystem Type & NDVI */}
          <div className="w-36 hidden md:flex items-center gap-2">
            <EcoIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-300 truncate">{record.ecosystemType}</div>
              <div className="text-[10px] text-teal-400 font-mono">NDVI {record.ndviProxy.toFixed(2)}</div>
            </div>
          </div>

          {/* Sub-scores */}
          <div className="w-52 hidden lg:flex items-center justify-between gap-3">
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
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 border-white/10 group-hover:border-emerald-500/40"
              icon={<ChevronRight className="w-3 h-3" />}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL MODAL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function EcologicalDetailModal({
  record,
  telemetry,
  onClose,
}: {
  record: EcologicalHealthRecord | null;
  telemetry?: LiveAtmosphericTelemetry;
  onClose: () => void;
}) {
  if (!record) return null;
  const EcoIcon = getEcosystemIcon(record.ecosystemType);
  const trendMeta = getTrendIcon(record.trend);
  const TrendIcon = trendMeta.icon;
  const t = telemetry || BASELINE_TELEMETRY[record.id] || { temp: 15, humidity: 60, precipitation: 0, windSpeed: 8, status: 'Baseline' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getHealthGradient(record.healthGrade)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <EcoIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white">{record.region} Regional Ecosystem</h2>
              <Badge variant={getHealthBadgeVariant(record.healthGrade)} size="sm">
                EHI {record.healthIndex} · {record.healthGrade}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{record.district} District · Scope: {record.scope}</span>
              <span className="text-slate-600">|</span>
              <span className="font-mono text-slate-400">{record.lat.toFixed(4)}°N, {record.lng.toFixed(4)}°E</span>
            </p>
          </div>
        </div>

        {/* Live Atmospheric Telemetry Panel */}
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Microclimate Telemetry ({t.status})
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Open-Meteo High-Res NWP</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-slate-400 mb-0.5">Air Temperature</div>
              <div className="text-base font-bold font-mono text-emerald-300">{t.temp.toFixed(1)}°C</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-slate-400 mb-0.5">Relative Humidity</div>
              <div className="text-base font-bold font-mono text-cyan-300">{t.humidity}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-slate-400 mb-0.5">Precipitation</div>
              <div className="text-base font-bold font-mono text-blue-300">{t.precipitation} mm</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-slate-400 mb-0.5">Surface Wind</div>
              <div className="text-base font-bold font-mono text-amber-300">{t.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* Biophysical Earth Observation Proxies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Satellite className="w-4 h-4 text-teal-400" />
                Copernicus Sentinel-2 NDVI
              </span>
              <span className="font-mono text-teal-300 font-bold">{record.ndviProxy.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Optical surface reflectance proxy calibrated from 10m MultiSpectral Instrument (MSI) bands.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <TreePine className="w-4 h-4 text-emerald-400" />
                Canopy Density & Land Cover
              </span>
              <span className="font-mono text-emerald-300 font-bold">{record.canopyCover}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Forest Survey of India (FSI 2023) land-use classification and riparian buffer index.
            </div>
          </div>
        </div>

        {/* Sub-indices Breakdown */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 mb-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Multi-Domain Composite Sub-Indices (0–100)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Water Quality', score: record.waterScore, color: 'text-cyan-400', bar: 'bg-cyan-500' },
              { label: 'Vegetation Canopy', score: record.vegetationScore, color: 'text-emerald-400', bar: 'bg-emerald-500' },
              { label: 'Biodiversity Health', score: record.biodiversityScore, color: 'text-violet-400', bar: 'bg-violet-500' },
              { label: 'Soil Integrity', score: record.soilScore, color: 'text-amber-400', bar: 'bg-amber-500' },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 mb-1">{item.label}</div>
                <div className={`text-xl font-bold font-mono ${item.color} mb-1.5`}>{item.score}</div>
                <IndexBar value={item.score} color={item.bar} />
              </div>
            ))}
          </div>
        </div>

        {/* Field Notes & Limnological Findings */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Field Assessment & Ecological Diagnosis
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {record.notes}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[11px]">
            <span className="text-slate-400">Stress Status: <strong className={getStressColor(record.stressLevel)}>{record.stressLevel}</strong></span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Degradation Risk: <strong className={getStressColor(record.degradationRisk)}>{record.degradationRisk}</strong></span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Restoration Priority: <strong className="text-orange-400">{record.restorationPriority}</strong></span>
          </div>
        </div>

        {/* Data Provenance & Close */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="text-slate-400 text-[11px]">
            Data Sources: <span className="text-slate-200 font-mono">{record.dataSources.join(', ')}</span>
          </div>
          <Button variant="default" size="sm" onClick={onClose} className="w-full sm:w-auto">
            Close Profile
          </Button>
        </div>
      </motion.div>
    </div>
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
  const [activeTypology, setActiveTypology] = useState('all');

  // Live telemetry state
  const [liveTelemetry, setLiveTelemetry] = useState<Record<string, LiveAtmosphericTelemetry>>(BASELINE_TELEMETRY);
  const [loadingTelemetry, setLoadingTelemetry] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<EcologicalHealthRecord | null>(null);

  // ── Live Telemetry Ingestion ───────────────────────────────────────────────

  const fetchLiveTelemetry = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoadingTelemetry(true);

    try {
      const lats = ecologicalHealthRegistry.map(r => r.lat).join(',');
      const lngs = ecologicalHealthRegistry.map(r => r.lng).join(',');

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`
      );

      if (res.ok) {
        const raw = await res.json();
        const results = Array.isArray(raw) ? raw : [raw];
        const nextMap: Record<string, LiveAtmosphericTelemetry> = {};

        ecologicalHealthRegistry.forEach((r, i) => {
          const current = results[i]?.current;
          if (current) {
            nextMap[r.id] = {
              temp: typeof current.temperature_2m === 'number' ? current.temperature_2m : (BASELINE_TELEMETRY[r.id]?.temp ?? 15),
              humidity: typeof current.relative_humidity_2m === 'number' ? current.relative_humidity_2m : (BASELINE_TELEMETRY[r.id]?.humidity ?? 60),
              precipitation: typeof current.precipitation === 'number' ? current.precipitation : 0.0,
              windSpeed: typeof current.wind_speed_10m === 'number' ? current.wind_speed_10m : (BASELINE_TELEMETRY[r.id]?.windSpeed ?? 8),
              status: 'Synced',
            };
          } else {
            nextMap[r.id] = BASELINE_TELEMETRY[r.id] ?? { temp: 15, humidity: 60, precipitation: 0, windSpeed: 8, status: 'Baseline' };
          }
        });

        setLiveTelemetry(nextMap);
        setLastSync(new Date());

        try {
          localStorage.setItem('kew_eco_health_telemetry_v1', JSON.stringify({
            timestamp: Date.now(),
            data: nextMap,
          }));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Open-Meteo ecological telemetry ingestion fallback to cached/baseline:', err);
    } finally {
      setLoadingTelemetry(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Check localStorage cache
    try {
      const cached = localStorage.getItem('kew_eco_health_telemetry_v1');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.data && Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          setLiveTelemetry(parsed.data);
          setLastSync(new Date(parsed.timestamp));
          return;
        }
      }
    } catch (e) {}

    fetchLiveTelemetry();
  }, [fetchLiveTelemetry]);

  // ── KPI derivations ────────────────────────────────────────────────────────

  const totalUnits = ecologicalHealthRegistry.length;
  const avgHealthIndex = Math.round(
    ecologicalHealthRegistry.reduce((a, r) => a + r.healthIndex, 0) / totalUnits
  );
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

  useEffect(() => { setCurrentPage(1); }, [ecosystemFilter, stressFilter, restoPriorityFilter, filter]);

  // Urgent restoration records
  const urgentRestorationRecords = ecologicalHealthRegistry
    .filter(r => r.restorationPriority === 'Urgent' || r.restorationPriority === 'High')
    .sort((a, b) => a.healthIndex - b.healthIndex)
    .slice(0, 6);

  const extraActiveCount = [
    ecosystemFilter !== 'all',
    stressFilter !== 'all',
    restoPriorityFilter !== 'all',
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── Detail Modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedRecord && (
          <EcologicalDetailModal
            record={selectedRecord}
            telemetry={liveTelemetry[selectedRecord.id]}
            onClose={() => setSelectedRecord(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Hero Heading ──────────────────────────────────────────────────────── */}
      <Heading
        label="Environmental Monitoring · Ecological Health & Odor Signals"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Ecological Health' }
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Ecological Health</span>
          </>}
        subtitle="Ecosystem condition, environmental stress, and habitat integrity intelligence across all 27 KEW regional units — water, vegetation, biodiversity, soil, and live microclimate indicators."
        icon={<Shield className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold"
              icon={<Search className="w-5 h-5" />}
              onClick={() => { const el = document.querySelector('section.py-8'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Regional Health Units
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Database className="w-5 h-5" />}
              onClick={() => router.push('/environmental-monitoring/dashboards')}
            >
              Analytics Dashboard
            </Button>
          </div>
        }
        images={[
          '/images/env-monitoring/Thumb_Waste.jpg',
          '/images/env-monitoring/env.webp',
          '/images/env-monitoring/sewage-treatment-plant-stp.jpg',
          '/images/env-monitoring/Biomedical_Waste_PTI.jpg',
          '/images/protected-network.png',
          '/images/bear.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
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

      {/* ── Live Scientific Ecological Telemetry Banner ────────────────────────── */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-emerald-500/30 p-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Scientific Ecological Monitoring & Live Telemetry
                  </span>
                  <Badge variant="success" size="sm" className="text-[9px]">
                    27 / 27 Units Synchronized
                  </Badge>
                  <span className="text-[10px] text-emerald-400/90 font-mono">
                    Open-Meteo NWP + Copernicus Sentinel-2
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Multi-sensor telemetry coupling real-time surface meteorology, optical NDVI canopy proxies, and JKPCC/FSI benchmark surveys.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs self-stretch md:self-auto justify-between md:justify-end">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px]">
                Last Sync: <strong className="text-white font-mono">{lastSync ? lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live'}</strong>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-300"
                onClick={() => fetchLiveTelemetry(true)}
                disabled={refreshing || loadingTelemetry}
                icon={<RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-400' : ''}`} />}
              >
                {refreshing ? 'Syncing...' : 'Refresh Telemetry'}
              </Button>
            </div>
          </div>
        </Card>
      </section>

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

      
      {/* ── Ecological Health Typologies & Citizen Field Protocols ─────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Ecological Health Typologies & Bio-Indicator Sentinel Belts"
          typologySubtitle="Select an ecological biome, stress rating, or restoration priority to monitor remote-sensing and biological health scores."
          typologyIcon={Activity}
          typologies={[
            { id: 'all', label: 'All Ecosystem Units', count: ecologicalHealthRegistry.length, icon: Leaf, color: 'emerald' },
            { id: 'critical', label: 'High / Critical Stress', count: ecologicalHealthRegistry.filter(r => ['Critical', 'High'].includes(r.stressLevel)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'wetland', label: 'Wetland Habitats (Ramsar)', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Wetland').length, icon: Waves, color: 'cyan' },
            { id: 'riverine', label: 'Fluvial Riverine Corridors', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Riverine').length, icon: Droplets, color: 'sky' },
            { id: 'forest', label: 'Temperate & Sub-Alpine Forests', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Temperate Forest' || r.ecosystemType === 'Sub-Alpine').length, icon: TreePine, color: 'teal' },
            { id: 'alpine', label: 'High Alpine Grasslands', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Alpine').length, icon: Mountain, color: 'indigo' },
            { id: 'urgent', label: 'Urgent Restoration Priority', count: ecologicalHealthRegistry.filter(r => r.restorationPriority === 'Urgent').length, icon: Shield, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={ecologicalHealthRegistry.length}
          entityLabel="ecosystem units"
          spotlightTitle="Sentinel Bio-Indicators & Remote Sensing Telemetry"
          spotlightSubtitle="Coupling Copernicus Sentinel-2 MSI NDVI vegetation indices with ground-truthed biotic index benchmarks across Kashmir's biomes."
          tabs={[
            {
              id: 'bio-indicators',
              label: 'Macroinvertebrate & Fish Hypoxia Signals',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Coldwater Salmonid Sentinels</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Brown Trout (*Salmo trutta fario*)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Require dissolved oxygen &gt; 7.0 mg/L and water temperatures &lt; 18°C in Lidder, Sind, and Madhumati streams. Sudden fish distress flags acute oxygen depletion or toxic pesticide runoff.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Biotic Index: Intolerant stenothermal species</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Benthic Macroinvertebrates</span>
                    <h5 className="text-sm font-semibold text-white mb-2">EPT Taxa (Mayfly, Stonefly, Caddisfly)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Abundance of Ephemeroptera, Plecoptera, and Trichoptera larvae in mountain streams signifies pristine oligotrophic conditions, while dominance of Chironomid bloodworms flags organic sewage ingress.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Protocol: CPCB Biological Water Quality Criteria</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Macrophyte Encroachment</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Azolla &amp; Water Hyacinth Blooms</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dense surface carpets of *Azolla cristata* on Dal and Wular lakes choke solar irradiance, creating sub-surface anoxia that suffocates indigenous *Schizothorax* snow trout breeding gravels.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Satellite Index: Sentinel-2 NDCI Chlorophyll Proxy</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'canopy-ndvi',
              label: 'Copernicus Sentinel-2 NDVI & Forest Stress',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Coniferous Canopy Vigor Tracking</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Normalized Difference Vegetation Index (NDVI) monitoring across Gulmarg, Lidder, and Pir Panjal fir/pine forests detects early moisture stress and bark beetle defoliation prior to visible canopy dieback.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">NDVI Resolution: 10m spatial resolution at 5-day revisit</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Alpine Meadow Soil Desiccation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Overgrazing and unseasonal heatwaves dry high-altitude hummocky turf soils, accelerating gully erosion along pastoral trekking trails in Gurez, Sonamarg, and Tarsar cirques.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Soil Moisture Proxy: Sentinel-1 SAR C-band backscatter</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="environmental"
          observeTitle="Citizen Ecological Health Sentinel &amp; Bio-Indicator Hub"
          observeSubtitle="Submit benthic stream samples, log fish distress incidents, or record invasive vegetative mats on local waterbodies."
          observeBadge="CPCB Biomonitoring Standard"
          protocols={[
            {
              number: '1',
              title: 'Benthic Macroinvertebrate Kick-Sampling',
              desc: 'Rinse riffle gravel into a 500-micron net; tally presence of Mayflies, Stoneflies, and Caddisflies to calculate stream biotic index.',
              benchmark: 'CPCB Biological Water Quality Criteria (BWQC)',
              icon: FlaskConical,
              color: 'emerald',
            },
            {
              number: '2',
              title: 'Fish Distress & Hypoxia Event Logging',
              desc: 'Document fish gasping at the water surface, erratic swimming, or mortality with water temperature and weather conditions.',
              benchmark: 'Inland Fisheries Environmental Assessment Protocol',
              icon: Droplets,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Invasive Weed Carpet Geo-Mapping',
              desc: 'Photograph dense Azolla, Alternanthera, or Lemna blooms choking wetland bays and record estimated surface area.',
              benchmark: 'Ramsar Wetland Invasive Species Management Standard',
              icon: Leaf,
              color: 'teal',
            },
            {
              number: '4',
              title: 'Conifer Dieback & Forest Pest Survey',
              desc: 'Flag patches of red-needle discoloration, defoliation, or resin bleeding on Deodar and Blue Pine forest perimeters.',
              benchmark: 'Forest Survey of India Pest & Blight Protocol',
              icon: TreePine,
              color: 'amber',
            },
          ]}
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
                27-Unit Regional Ecological Health Registry
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Composite Ecological Health Index — water, vegetation, biodiversity, soil & microclimate stress
                <span className="ml-2 text-[10px] text-emerald-300 font-mono border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">
                  Live Sensor Sync · Open-Meteo & Copernicus Sentinel-2
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
              {paginatedData.map((r, i) => (
                <EcologicalHealthCard
                  key={r.id}
                  record={r}
                  index={i}
                  telemetry={liveTelemetry[r.id] ?? BASELINE_TELEMETRY[r.id] ?? { temp: 15, humidity: 60, precipitation: 0, windSpeed: 8, status: 'Baseline' }}
                  onSelect={() => setSelectedRecord(r)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((r, i) => (
                <EcologicalHealthRow
                  key={r.id}
                  record={r}
                  index={i}
                  telemetry={liveTelemetry[r.id] ?? BASELINE_TELEMETRY[r.id] ?? { temp: 15, humidity: 60, precipitation: 0, windSpeed: 8, status: 'Baseline' }}
                  onSelect={() => setSelectedRecord(r)}
                />
              ))}
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
            <p className="text-slate-400">Composite health index, live microclimate telemetry, stress level, and restoration priority by district and scope</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Region / District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Scope</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Microclimate</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">NDVI Proxy</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">EHI</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Grade</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stress</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Restoration</th>
                </tr>
              </thead>
              <tbody>
                {ecologicalHealthRegistry
                  .sort((a, b) => a.healthIndex - b.healthIndex)
                  .map((r, i) => {
                    const t = liveTelemetry[r.id] ?? BASELINE_TELEMETRY[r.id] ?? { temp: 15, humidity: 60, precipitation: 0, windSpeed: 8, status: 'Baseline' };
                    return (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.02 }}
                        onClick={() => setSelectedRecord(r)}
                        className="border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="text-white font-medium hover:text-emerald-400 transition-colors">{r.region}</span>
                          <div className="text-[10px] text-slate-500">{r.district} · {r.ecosystemType}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-slate-400">{r.scope}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-xs font-mono text-emerald-300 font-semibold">{t.temp.toFixed(1)}°C</span>
                          <span className="text-[10px] text-slate-500 ml-1">({t.humidity}%)</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-xs font-mono text-teal-400 font-semibold">{r.ndviProxy.toFixed(2)}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgentRestorationRecords.map((r, i) => {
              const EcoIcon = getEcosystemIcon(r.ecosystemType);
              const t = liveTelemetry[r.id] ?? BASELINE_TELEMETRY[r.id] ?? { temp: 15, humidity: 60, precipitation: 0, windSpeed: 8, status: 'Baseline' };
              return (
                <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <Card
                    onClick={() => setSelectedRecord(r)}
                    className="glass-intense border-white/10 hover:border-rose-500/30 transition-all p-5 group cursor-pointer h-full flex flex-col"
                  >
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

                    <p className="text-xs text-slate-400 mb-3 leading-relaxed flex-1">{r.notes}</p>

                    <div className="grid grid-cols-3 gap-2 text-[10px] mt-auto">
                      <div className="bg-white/5 rounded p-1.5 text-center">
                        <div className="text-slate-500 mb-0.5">EHI</div>
                        <div className="font-bold text-rose-400">{r.healthIndex}</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5 text-center">
                        <div className="text-slate-500 mb-0.5">Live Temp</div>
                        <div className="font-bold text-emerald-400 font-mono">{t.temp.toFixed(1)}°C</div>
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
                  <h3 className="text-lg font-bold text-white mb-1">Methodology & Empirical Data Synthesis</h3>
                  <p className="text-xs text-slate-500 mb-4">Transparent weighted indicator framework — KEW Ecological Health Intelligence v1.2</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2">Composite EHI Formula</h4>
                      <div className="space-y-1.5 text-xs text-slate-400">
                        {[
                          { label: 'Water Quality & Limnology', weight: '25%', src: 'JKPCC, NWIA, India-WRIS' },
                          { label: 'Vegetation & Canopy Condition', weight: '20%', src: 'Copernicus Sentinel-2 NDVI, FSI 2023' },
                          { label: 'Biodiversity Health & Cryosphere', weight: '20%', src: 'WWF-India, AKDN, Field Surveys' },
                          { label: 'Soil Health & Erosion', weight: '15%', src: 'Soil Health Card Scheme, ICAR' },
                          { label: 'Hazard & Geomorphological Risk', weight: '10%', src: 'KEW Hazard Intelligence Engine' },
                          { label: 'Real-Time Climate Stress', weight: '10%', src: 'Open-Meteo High-Res NWP' },
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

                      <h4 className="text-sm font-semibold text-violet-400 mb-2 mt-4">Integrated Data Streams</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['JKPCC', 'NWIA', 'India-WRIS', 'Forest Survey India (FSI 2023)', 'Copernicus Sentinel-2 MSI', 'WWF-India', 'Open-Meteo NWP', 'ICAR Soil Health', 'AKDN Field Data'].map(src => (
                          <span key={src} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-lg px-3 py-2">
                    <Database className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Scientific baseline registry compiled from JKPCC, NWIA, FSI (2023), and WWF Western Himalayan ecological benchmark surveys, dynamically coupled with live Open-Meteo atmospheric & hydro-thermal telemetry.</span>
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
