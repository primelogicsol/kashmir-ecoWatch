'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InsightPanel } from '@/types';
import {
  FALLBACK_BASELINE_TELEMETRY,
  type BaselineTelemetryData,
} from '@/lib/telemetry/getBaselineTelemetry';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  AlertTriangle,
  Flower,
  PawPrint,
  Wind,
  Droplets,
  MapPin,
  Calendar,
  Clock,
  Bell,
  Activity,
  TrendingUp,
  ExternalLink,
  Settings,
  Mountain,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertPreferencesModal } from '@/components/alerts/AlertPreferencesModal';

const statusConfig: Record<string, { color: string; glow: string; icon: React.ReactNode }> = {
  critical: { 
    color: 'bg-red-500', 
    glow: 'shadow-red-500/50',
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  warning: { 
    color: 'bg-amber-500', 
    glow: 'shadow-amber-500/50',
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  normal: { 
    color: 'bg-emerald-500', 
    glow: 'shadow-emerald-500/50',
    icon: <Activity className="w-4 h-4" /> 
  },
  info: { 
    color: 'bg-blue-500', 
    glow: 'shadow-blue-500/50',
    icon: <Activity className="w-4 h-4" /> 
  },
};

const iconConfig: Record<string, React.ComponentType<{ className?: string }>> = {
  'wetland-stress': Droplets,
  'bloom-activity': Flower,
  'wildlife-sightings': PawPrint,
  'air-quality': Wind,
  'spring-vulnerability': Droplets,
  'cryosphere-watch': Mountain,
};

export interface ExpandableLivePanelsProps {
  initialData?: BaselineTelemetryData;
}

export function ExpandableLivePanels({
  initialData = FALLBACK_BASELINE_TELEMETRY,
}: ExpandableLivePanelsProps = {}) {
  const router = useRouter();

  // 1. Live Panels State: pre-populated from server-rendered ISR baseline telemetry
  const [panels, setPanels] = useState<InsightPanel[]>(() => initialData.panels);
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 2. All cards opened by default per user specification
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    initialData.panels.forEach(panel => {
      initial[panel.id] = true;
    });
    return initial;
  });
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warning'>('all');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertModalMode, setAlertModalMode] = useState<'subscribe' | 'settings'>('subscribe');

  // Connect to external public model APIs (Open-Meteo CAMS & /api/alerts/live) while preserving static baselines honestly
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const classifyAqiLabel = (aqi: number) =>
      aqi > 200
        ? 'Very Unhealthy'
        : aqi > 150
          ? 'Unhealthy'
          : aqi > 100
            ? 'Unhealthy for Sensitive Groups'
            : aqi > 50
              ? 'Moderate'
              : 'Good';

    async function syncLiveApiFeeds() {
      try {
        const [alertsRes, airRes] = await Promise.allSettled([
          fetch('/api/alerts/live', { signal: controller.signal }),
          fetch(
            'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=34.0837,33.7311,34.1990&longitude=74.7973,75.1487,74.3636&current=pm10,pm2_5,us_aqi&timezone=UTC',
            { signal: controller.signal }
          )
        ]);

        if (!isMounted) return;

        let liveAlerts: any[] = [];
        if (alertsRes.status === 'fulfilled' && alertsRes.value.ok) {
          const json = await alertsRes.value.json();
          if (json?.source === 'live-api' && Array.isArray(json.alerts)) {
            liveAlerts = json.alerts;
          }
        }

        let camsPoints: Array<{ aqi: number; pm25: number; pm10: number; timeIso: string }> | null = null;
        if (airRes.status === 'fulfilled' && airRes.value.ok) {
          const airJson = await airRes.value.json();
          const arr = Array.isArray(airJson) ? airJson : [airJson];
          if (arr.length === 3 && arr.every((entry) => entry?.current && typeof entry.current.us_aqi === 'number')) {
            camsPoints = arr.map((entry) => ({
              aqi: Math.round(entry.current.us_aqi),
              pm25: Math.round((entry.current.pm2_5 ?? 0) * 10) / 10,
              pm10: Math.round((entry.current.pm10 ?? 0) * 10) / 10,
              timeIso: entry.current.time ? `${entry.current.time}Z` : new Date().toISOString(),
            }));
          }
        }

        const zojilaAlert = liveAlerts.find(a => a.id === 'live-avalanche-zojila' || a.category === 'avalanche');
        const jhelumAlert = liveAlerts.find(a => a.id === 'live-flood-jhelum' || a.id === 'live-river-jhelum' || a.category === 'flood');
        const jhelumDischargeVal = jhelumAlert?.guidance?.actions?.[0]
          ?.replace('Modeled Discharge (GloFAS v4): ', '')
          ?.replace('Current Live Discharge: ', '')
          ?.replace('Discharge Level: ', '') || null;

        setPanels(prev => prev.map(panel => {
          // Card 1: Air Quality Signals -> Real multi-point Open-Meteo CAMS 11 km model grid (zero synthetic offsets)
          if (panel.id === 'air-quality') {
            if (camsPoints) {
              const [sgr, ang, brm] = camsPoints;
              const maxAqi = Math.max(sgr.aqi, ang.aqi, brm.aqi);
              return {
                ...panel,
                description: 'Copernicus CAMS (~11 km gridded atmospheric model via Open-Meteo) — non-regulatory model screening',
                status: maxAqi > 100 ? 'critical' : maxAqi > 50 ? 'warning' : 'normal',
                items: [
                  {
                    id: 'aq-1',
                    title: `Srinagar Grid — ${classifyAqiLabel(sgr.aqi)} US AQI (${sgr.aqi}) · PM2.5 ${sgr.pm25} µg/m³ (CAMS 11 km Model)`,
                    location: 'Srinagar Basin Grid (34.08°N, 74.80°E)',
                    timestamp: new Date(sgr.timeIso),
                    severity: sgr.aqi > 100 ? 'high' : sgr.aqi > 50 ? 'medium' : 'low',
                    isLive: true,
                  },
                  {
                    id: 'aq-2',
                    title: `Anantnag Grid — ${classifyAqiLabel(ang.aqi)} US AQI (${ang.aqi}) · PM2.5 ${ang.pm25} µg/m³ (CAMS 11 km Model)`,
                    location: 'Anantnag South Grid (33.73°N, 75.15°E)',
                    timestamp: new Date(ang.timeIso),
                    severity: ang.aqi > 100 ? 'high' : ang.aqi > 50 ? 'medium' : 'low',
                    isLive: true,
                  },
                  {
                    id: 'aq-3',
                    title: `Baramulla Grid — ${classifyAqiLabel(brm.aqi)} US AQI (${brm.aqi}) · PM10 ${brm.pm10} µg/m³ (CAMS 11 km Model)`,
                    location: 'Baramulla Gateway Grid (34.20°N, 74.36°E)',
                    timestamp: new Date(brm.timeIso),
                    severity: brm.aqi > 100 ? 'high' : brm.aqi > 50 ? 'medium' : 'low',
                    isLive: true,
                  },
                ]
              };
            }
            return {
              ...panel,
              description: 'Historical winter inversion & valley particulate reference baselines (2024)',
              items: panel.items.map(it => ({ ...it, isLive: false })),
            };
          }

          // Card 2: Glacial Lake & Cryosphere Watch -> NWP pass screening + published satellite glaciology baselines
          if (panel.id === 'cryosphere-watch') {
            return {
              ...panel,
              description: 'Published satellite glaciology inventories paired with Open-Meteo NWP pass screening',
              items: [
                zojilaAlert
                  ? {
                      id: 'cryo-1',
                      title: zojilaAlert.title,
                      location: zojilaAlert.affectedArea || 'Zoji La & Dras Sector, Kargil',
                      timestamp: new Date(zojilaAlert.updated),
                      severity: zojilaAlert.severity === 'critical' || zojilaAlert.severity === 'high' ? 'high' : 'medium',
                      isLive: true,
                    }
                  : {
                      id: 'cryo-1',
                      title: 'Zoji La Pass (3,528 m) — High-Altitude Cryosphere Corridor Baseline (2023)',
                      location: 'Zoji La & Dras Sector, Kargil',
                      timestamp: new Date('2023-11-15'),
                      severity: 'medium',
                      isLive: false,
                    },
                {
                  id: 'cryo-2',
                  title: 'Kolahoi Glacier — ~23% Area Retreat Since 1962 (Published Remote-Sensing Baseline, 2021)',
                  location: 'Lidder Headwaters, Anantnag',
                  timestamp: new Date('2021-06-15'),
                  severity: 'high',
                  isLive: false,
                },
                {
                  id: 'cryo-3',
                  title: 'Thajiwas & Sonamarg Glacial Tarns — ISRO SAC Inventory Baseline (2011)',
                  location: 'Sonamarg Alpine Ridge, Ganderbal',
                  timestamp: new Date('2011-05-01'),
                  severity: 'medium',
                  isLive: false,
                },
              ]
            };
          }

          // Card 3: Wetland Stress Watch -> GloFAS v4 modeled discharge + statutory Ramsar/NWIA baselines
          if (panel.id === 'wetland-stress') {
            return {
              ...panel,
              description: 'Statutory Ramsar / ISRO NWIA wetland baselines & Copernicus GloFAS v4 (~5 km) modeled discharge',
              items: [
                jhelumAlert && jhelumDischargeVal
                  ? {
                      id: 'wet-1',
                      title: `Jhelum Basin (GloFAS v4 ~5 km Model) — Modeled Discharge: ${jhelumDischargeVal}`,
                      location: 'Jhelum Basin & Hokersar Ramsar Wetland',
                      timestamp: new Date(jhelumAlert.updated),
                      severity: jhelumAlert.severity === 'critical' || jhelumAlert.severity === 'high' ? 'high' : 'low',
                      isLive: true,
                    }
                  : {
                      id: 'wet-1',
                      title: 'Hokersar Wetland (Ramsar #1570) — Siltation & Inflow Audit Baseline (2025)',
                      location: 'Srinagar / Budgam District',
                      timestamp: new Date('2025-03-01'),
                      severity: 'high',
                      isLive: false,
                    },
                {
                  id: 'wet-2',
                  title: 'Shallabugh Wetland — Ramsar Site #2488 Statutory Baseline (1,675 ha, 2022)',
                  location: 'Ganderbal & Srinagar District',
                  timestamp: new Date('2022-06-08'),
                  severity: 'medium',
                  isLive: false,
                },
                {
                  id: 'wet-3',
                  title: 'Mirgund Wetland Conservation Reserve — ISRO NWIA Statutory Baseline (2011)',
                  location: 'Baramulla / Budgam District',
                  timestamp: new Date('2011-05-01'),
                  severity: 'medium',
                  isLive: false,
                },
              ]
            };
          }

          // Card 4: Algal Bloom Activity -> Static Sentinel-2 & Statutory Audit Baselines (NEVER stamped live)
          if (panel.id === 'bloom-activity') {
            return {
              ...panel,
              description: 'Archived Sentinel-2 MSI NDCI retrievals & published limnological / CAG audit baselines',
              items: [
                {
                  id: 'bloom-1',
                  title: 'Dal Lake — Eutrophic Nutrient Enrichment & Macrophyte Audit Baseline (2025)',
                  location: 'Dal Lake, Srinagar',
                  timestamp: new Date('2025-03-15'),
                  severity: 'medium',
                  isLive: false,
                },
                {
                  id: 'bloom-2',
                  title: 'Anchar Lake — Hypereutrophic Urban Inflow Literature Baseline (2024)',
                  location: 'Anchar Basin, Srinagar',
                  timestamp: new Date('2024-09-01'),
                  severity: 'high',
                  isLive: false,
                },
                {
                  id: 'bloom-3',
                  title: 'Manasbal Lake — Monomictic Deep-Basin Limnological Baseline (2024)',
                  location: 'Manasbal, Ganderbal',
                  timestamp: new Date('2024-08-15'),
                  severity: 'low',
                  isLive: false,
                },
              ]
            };
          }

          // Card 5: Wildlife Baselines -> Statutory Census & Published Survey Records (NEVER stamped live)
          if (panel.id === 'wildlife-sightings') {
            return {
              ...panel,
              title: 'Statutory Wildlife Census Baselines',
              description: 'Published wildlife population censuses and protected-area range assessments (non-live)',
              items: [
                {
                  id: 'wild-1',
                  title: 'Hangul Population Census: 289 Individuals — J&K Wildlife Protection Dept. (2023)',
                  location: 'Dachigam National Park, Srinagar',
                  timestamp: new Date('2023-03-25'),
                  severity: 'low',
                  isLive: false,
                },
                {
                  id: 'wild-2',
                  title: 'Snow Leopard Range Assessment — WII SPAI Trans-Himalayan Report (2024)',
                  location: 'Ladakh, Kishtwar & Gurez High-Alpine Envelope',
                  timestamp: new Date('2024-01-30'),
                  severity: 'low',
                  isLive: false,
                },
                {
                  id: 'wild-3',
                  title: 'Western Tragopan Sanctuary Survey — Kazinag & Limber Baseline (2022)',
                  location: 'Limber & Kazinag, Baramulla',
                  timestamp: new Date('2022-11-15'),
                  severity: 'low',
                  isLive: false,
                },
              ]
            };
          }

          // Card 6: Spring Vulnerability -> Published Hydrogeological Literature Baselines (NEVER stamped live)
          if (panel.id === 'spring-vulnerability') {
            return {
              ...panel,
              description: 'Published karst hydrogeology & spring discharge studies across southern Kashmir (non-live)',
              items: [
                {
                  id: 'spr-1',
                  title: 'Kokernag Karst Spring — Published Hydrogeological Discharge Study (2022)',
                  location: 'Brengi Valley, Anantnag District',
                  timestamp: new Date('2022-09-01'),
                  severity: 'medium',
                  isLive: false,
                },
                {
                  id: 'spr-2',
                  title: 'Verinag Spring (Jhelum Source) — Historical Recession Benchmark (2021)',
                  location: 'Pir Panjal Foothills, Anantnag',
                  timestamp: new Date('2021-08-15'),
                  severity: 'high',
                  isLive: false,
                },
                {
                  id: 'spr-3',
                  title: 'Achabal Karst Spring — Seasonal Aquifer Recharge Literature Baseline (2022)',
                  location: 'Kothar Basin, Anantnag',
                  timestamp: new Date('2022-09-01'),
                  severity: 'medium',
                  isLive: false,
                },
              ]
            };
          }

          return panel;
        }));

        if (camsPoints || liveAlerts.length > 0) {
          setIsLiveTelemetry(true);
          setLastSynced(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
        }
      } catch {
        // Retain baseline data gracefully without fabricating timestamps
      }
    }

    syncLiveApiFeeds();
    const intervalId = setInterval(syncLiveApiFeeds, 120000);
    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(intervalId);
    };
  }, []);

  const togglePanel = (id: string) => {
    setExpandedPanels(prev => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  const areAllExpanded = panels.every(p => expandedPanels[p.id] ?? true);

  const toggleAll = () => {
    const nextVal = !areAllExpanded;
    const nextState: Record<string, boolean> = {};
    panels.forEach(p => {
      nextState[p.id] = nextVal;
    });
    setExpandedPanels(nextState);
  };

  const getSeverityBadge = (severity?: string) => {
    if (!severity) return null;
    const config: Record<string, { variant: 'danger' | 'warning' | 'info'; label: string }> = {
      high: { variant: 'danger', label: 'HIGH' },
      medium: { variant: 'warning', label: 'MEDIUM' },
      low: { variant: 'info', label: 'LOW' },
    };
    return (
      <Badge variant={config[severity]?.variant || 'info'} size="sm" className="text-xs px-2 py-0.5 whitespace-nowrap flex-shrink-0">
        {config[severity]?.label}
      </Badge>
    );
  };

  const formatItemProvenanceDate = (date: Date | string, isLive?: boolean) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (!isLive) {
      const year = Number.isNaN(d.getTime()) ? 'Baseline' : d.getUTCFullYear();
      return `Baseline (${year})`;
    }
    if (!hasMounted || Number.isNaN(d.getTime())) return 'Model cycle';
    const diffMs = Math.max(0, Date.now() - d.getTime());
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 2) return 'Current cycle';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const filteredPanels = panels.filter(panel => {
    if (activeTab === 'all') return true;
    if (activeTab === 'critical') return panel.status === 'critical';
    if (activeTab === 'warning') return panel.status === 'warning';
    return true;
  });

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 signal-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
                External Model Feeds &amp; Statutory Baselines (0 KEW Sensors)
              </span>
            </div>

            {/* Provenance-Transparent External API Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-[4px] bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 w-max">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isLiveTelemetry
                  ? `Live Feed Active · CAMS · GloFAS${lastSynced ? ` · ${lastSynced}` : ''}`
                  : 'Baseline Telemetry Verified · Auto-updating'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                Environmental Synthesis &amp; Screening Panels
              </h2>
              <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Separating external gridded atmospheric/hydrological model feeds (Copernicus CAMS ~11 km &amp; GloFAS v4 ~5 km) from published statutory censuses and archival research baselines.
              </p>
            </div>

            {/* Filter tabs and Expand/Collapse toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm p-1 glass-light rounded-lg border border-white/10 w-full sm:w-max">
                {[
                  { id: 'all', label: 'All Feeds' },
                  { id: 'critical', label: 'Critical' },
                  { id: 'warning', label: 'Warnings' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-forest-500/20 text-forest-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={toggleAll}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 glass-light transition-colors"
              >
                {areAllExpanded ? 'Collapse All Cards' : 'Expand All Cards'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-6 gap-4 sm:gap-5 items-stretch">
          {filteredPanels.map((panel, index) => {
            const status = statusConfig[panel.status];
            const IconComponent = iconConfig[panel.id] || Activity;
            const isExpanded = expandedPanels[panel.id] ?? true;

            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full flex flex-col"
              >
                <Card
                  className={`glass-light border transition-all duration-500 overflow-hidden h-full flex flex-col justify-between ${
                    isExpanded
                      ? 'border-forest-500/30 shadow-lg shadow-forest-500/10'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                  padding="none"
                >
                  {/* Panel header */}
                  <div
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-white/[0.02] transition-colors rounded-xl min-h-[92px]"
                    onClick={() => togglePanel(panel.id)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Icon with status */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg ${status.glow}`}>
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${status.color} border-2 border-slate-900 signal-pulse`} />
                      </div>

                      {/* Title and meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white break-words flex-1">
                            {panel.title}
                          </h3>
                          <Badge
                            variant={panel.status === 'critical' ? 'danger' : panel.status === 'warning' ? 'warning' : 'info'}
                            size="sm"
                            className="text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0"
                          >
                            {panel.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs flex flex-wrap items-center gap-2 text-slate-500">
                          <span>{panel.items.length} indicators</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {panel.items.some((it) => it.isLive)
                              ? 'External Model Feed'
                              : 'Historical / Statutory Baseline'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg glass-light border border-white/10 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ml-2 ${isExpanded && 'rotate-180'}`}>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    </div>
                  </div>

                  {/* Panel content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                      >
                        <div className="border-t border-white/5" />
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                            {panel.description}
                          </p>

                          {/* Items list */}
                          <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-start">
                            {panel.items.map((item, idx) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 hover:border-forest-500/30 transition-all cursor-pointer min-h-[74px] flex items-center"
                              >
                                <div className="flex items-start justify-between gap-2 py-1 w-full">
                                  {/* Severity indicator */}
                                  <div className="flex-shrink-0 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      item.severity === 'high' ? 'bg-red-500 signal-pulse' :
                                      item.severity === 'medium' ? 'bg-amber-500' :
                                      'bg-emerald-500'
                                    }`} />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2 flex-wrap">
                                      <h4 className="text-sm flex-1 min-w-0 break-words font-semibold text-white group-hover:text-forest-300 transition-colors">
                                        {item.title}
                                      </h4>
                                      <div className="flex items-center gap-1.5 flex-shrink-0">
                                        {item.isLive ? (
                                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                            MODEL FEED
                                          </span>
                                        ) : (
                                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-medium text-slate-300">
                                            Historical / Statutory Baseline
                                          </span>
                                        )}
                                        {getSeverityBadge(item.severity)}
                                      </div>
                                    </div>
                                    <div className="text-xs flex flex-wrap gap-2 text-slate-500">
                                      {item.location && (
                                        <div className="flex items-center gap-1 min-w-0 flex-[1_1_100%] sm:flex-[1_1_auto]">
                                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                          <span className="break-words">{item.location}</span>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                        <span className="whitespace-nowrap">{formatItemProvenanceDate(item.timestamp, item.isLive)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action */}
                                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 group-hover:text-forest-400 transition-colors flex-shrink-0" />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* View all link */}
                          <div className="mt-auto pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <button
                              onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
                              className="text-xs mt-3 block text-right font-medium text-forest-400 hover:text-forest-300 transition-colors group w-full"
                            >
                              View All {panel.title.toLowerCase()}
                              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:border-forest-400 w-full sm:w-auto text-xs sm:text-sm"
                              icon={<TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                              onClick={() => router.push('/risk-monitoring/dashboards')}
                            >
                              Analytics
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom action strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-12 glass-light rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10"
        >
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg flex-shrink-0">
                <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                  Configure Alert Preferences
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Set up custom notifications for critical environmental events and monitoring anomalies
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:border-forest-400 w-full sm:w-auto text-xs sm:text-sm"
                icon={<Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                onClick={() => {
                  setAlertModalMode('settings');
                  setIsAlertModalOpen(true);
                }}
              >
                Settings
              </Button>
              <Button
                className="bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white w-full sm:w-auto text-xs sm:text-sm shadow-lg shadow-forest-600/20"
                icon={<Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                onClick={() => {
                  setAlertModalMode('subscribe');
                  setIsAlertModalOpen(true);
                }}
              >
                Subscribe to Alerts
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Alert Preferences & Subscription Modal */}
      <AlertPreferencesModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        initialMode={alertModalMode}
      />
    </section>
  );
}
