'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import {
  AlertTriangle, Activity, Bell, TrendingUp, ArrowRight,
  Shield, Mountain, Droplets, Waves, Flame, Zap, MapPin, Clock,
  AlertCircle, Eye, FileText, Phone, RotateCw, Radio, Globe, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';
import {
  districtRiskProfiles,
  hazardCategorySummaries,
  advisories,
  recentIncidents,
  riskDashboardStats,
  criticalInfrastructure
} from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const submodules = [
  { id: 'live-alerts', name: 'Live Alerts', icon: Bell, color: 'from-red-500 to-rose-600', route: '/risk-monitoring/live-alerts-advisories', desc: 'Critical alerts & warnings' },
  { id: 'hazard-risks', name: 'Hazard Risks', icon: AlertTriangle, color: 'from-orange-500 to-red-600', route: '/risk-monitoring/hazard-risks', desc: 'Umbrella hazard classification' },
  { id: 'flood-flash-flood', name: 'Flood & Flash Flood', icon: Droplets, color: 'from-blue-500 to-cyan-600', route: '/risk-monitoring/flood-flash-flood', desc: 'River overflow & inundation watch' },
  { id: 'landslide-slope', name: 'Landslide & Slope', icon: Mountain, color: 'from-amber-500 to-orange-600', route: '/risk-monitoring/landslide-slope', desc: 'Slope instability & road risk' },
  { id: 'avalanche-winter', name: 'Avalanche & Winter', icon: Eye, color: 'from-slate-400 to-blue-600', route: '/risk-monitoring/avalanche-winter', desc: 'Avalanche exposure & winter access' },
  { id: 'earthquake', name: 'Earthquake', icon: Zap, color: 'from-purple-500 to-indigo-600', route: '/risk-monitoring/earthquake', desc: 'Seismic exposure & readiness' },
  { id: 'forest-fire', name: 'Forest Fire', icon: Flame, color: 'from-orange-500 to-red-600', route: '/risk-monitoring/forest-fire', desc: 'Active fires & fire-prone zones' },
  { id: 'glacier-cryosphere', name: 'Glacier & Cryosphere', icon: Mountain, color: 'from-cyan-500 to-blue-600', route: '/risk-monitoring/glacier-cryosphere', desc: 'Glacier-linked environmental risk' },
  { id: 'hydrological-risk', name: 'Hydrological Risk', icon: Waves, color: 'from-teal-500 to-cyan-600', route: '/risk-monitoring/hydrological-risk', desc: 'Water system instability & overflow' },
  { id: 'environmental-incident-risk', name: 'Environmental Incident Risk', icon: AlertCircle, color: 'from-red-600 to-rose-700', route: '/risk-monitoring/environmental-incident-risk', desc: 'Pollution emergencies & escalation' },
  { id: 'district-risk-profiles', name: 'District Risk Profiles', icon: MapPin, color: 'from-emerald-500 to-green-600', route: '/risk-monitoring/district-risk-profiles', desc: 'District-wise operational risk' },
  { id: 'critical-infrastructure-response', name: 'Critical Infrastructure & Response', icon: Shield, color: 'from-violet-500 to-purple-600', route: '/risk-monitoring/critical-infrastructure-response', desc: 'Emergency facilities & response nodes' },
  { id: 'shelters-closures-emergency-routes', name: 'Shelters, Closures & Routes', icon: FileText, color: 'from-indigo-500 to-blue-600', route: '/risk-monitoring/shelters-closures-emergency-routes', desc: 'Safe routes & operational mobility' },
  { id: 'dashboards', name: 'Dashboards', icon: TrendingUp, color: 'from-pink-500 to-rose-600', route: '/risk-monitoring/dashboards', desc: 'Live risk & incident dashboards' },
];

const getSeverityColor = (severity: AlertSeverity | string) => {
  switch (severity) {
    case AlertSeverity.CRITICAL:
    case 'critical':
      return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' };
    case AlertSeverity.SERIOUS:
    case 'serious':
    case 'high':
      return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' };
    case AlertSeverity.MODERATE:
    case 'moderate':
      return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' };
    default:
      return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' };
  }
};

const getLiveSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <Badge variant="danger" size="sm" className="bg-red-500/20 text-red-300 border border-red-500/40">CRITICAL</Badge>;
    case 'high':
      return <Badge variant="warning" size="sm" className="bg-orange-500/20 text-orange-300 border border-orange-500/40">HIGH</Badge>;
    case 'moderate':
      return <Badge variant="info" size="sm" className="bg-amber-500/20 text-amber-300 border border-amber-500/40">MODERATE</Badge>;
    default:
      return <Badge variant="success" size="sm" className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">NORMAL</Badge>;
  }
};

const getRiskLevelBadge = (level: string) => {
  switch (level) {
    case 'critical': return <Badge variant="danger" size="sm">Critical</Badge>;
    case 'high': return <Badge variant="warning" size="sm">High</Badge>;
    case 'moderate': return <Badge variant="info" size="sm">Moderate</Badge>;
    case 'low': return <Badge variant="success" size="sm">Low</Badge>;
    default: return null;
  }
};

function formatAlertTime(isoStr: string) {
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export default function RiskMonitoringOverviewPage() {
  const router = useRouter();
  const { alerts, isLoading, isLive, lastUpdated, refetch } = useLiveAlerts();

  // Prioritize critical and high alerts from live API
  const priorityLiveAlerts = alerts
    .filter(a => a.severity === 'critical' || a.severity === 'high' || a.severity === 'moderate')
    .slice(0, 4);

  // Derive dynamic live advisories with real emergency guidance from live alerts stream
  const liveAdvisories = alerts
    .filter(a => a.guidance && a.guidance.actions && a.guidance.actions.length > 0)
    .slice(0, 4);

  // Derive recent real live incidents & sensor detections from telemetry
  const liveIncidents = alerts.slice(0, 5);

  const criticalCount = alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length;
  const uniqueDistricts = Array.from(new Set(alerts.map(a => a.district))).filter(Boolean).length;

  // Dynamically augment district risk status with real-time live alert counts from API
  const topDistricts = districtRiskProfiles.map(district => {
    // Count real-time live alerts currently active in this district from live API stream
    const liveAlertsForDistrict = alerts.filter(a => 
      a.district.toLowerCase() === district.district.toLowerCase() ||
      (district.district === 'Baramulla' && a.district.toLowerCase() === 'gulmarg')
    );
    
    const liveAlertCount = liveAlertsForDistrict.length;
    const hasLiveCritical = liveAlertsForDistrict.some(a => a.severity === 'critical' || a.severity === 'high');

    // Dynamic risk level elevating if live critical telemetry is detected
    const dynamicRiskLevel = hasLiveCritical 
      ? 'critical' 
      : liveAlertCount > 0 
      ? (district.riskLevel === 'low' ? 'moderate' : district.riskLevel)
      : district.riskLevel;

    return {
      ...district,
      activeAlerts: liveAlertCount > 0 ? liveAlertCount : district.activeAlerts,
      riskLevel: dynamicRiskLevel,
      hasLiveSensor: liveAlertCount > 0,
    };
  }).sort((a, b) => {
    const order = { critical: 0, high: 1, moderate: 2, low: 3 };
    return order[a.riskLevel] - order[b.riskLevel];
  }).slice(0, 8);

  // Dynamically compute real-time hazard category metrics from live API alerts stream
  const dynamicHazardSummaries = hazardCategorySummaries.map(h => {
    // Map hazardCategorySummary ID to AlertCategory
    const categoryMatches: Record<string, string[]> = {
      'flood-flash-flood': ['flood'],
      'landslide-slope': ['landslide'],
      'avalanche-winter': ['avalanche'],
      'earthquake': ['earthquake'],
      'forest-fire': ['fire'],
      'glacier-cryosphere': ['avalanche'],
      'hydrological-risk': ['flood'],
      'environmental-incident': ['air-quality', 'heatwave', 'storm']
    };

    const targetCategories = categoryMatches[h.id] || [];
    const liveAlertsForHazard = alerts.filter(a => targetCategories.includes(a.category));
    const liveCount = liveAlertsForHazard.length;
    const hasLiveCritical = liveAlertsForHazard.some(a => a.severity === 'critical' || a.severity === 'high');

    return {
      ...h,
      activeAlerts: liveCount > 0 ? liveCount : h.activeAlerts,
      riskLevel: hasLiveCritical ? 'critical' : (liveCount > 0 ? 'high' : h.riskLevel),
      hasLiveFeed: liveCount > 0,
      liveTelemetryCount: liveCount
    };
  });

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <Heading
        title={
          <>
            <span className="block whitespace-nowrap">Western Himalayan</span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Risk & Monitoring</span>
          </>
        }
        subtitle="Live environmental telemetry, seismic hazard streams, hydrological discharge forecasts, and operational risk across Jammu & Kashmir"
        icon={<AlertTriangle className="w-6 h-6 text-emerald-400" />}
        label="Command Center"
        images={[
          '/images/hazard-intelligence/FLOODS.jpg',
          '/images/hazard-intelligence/LANDSLIDE.jpg',
          '/images/hazard-intelligence/AVA.webp',
          '/images/protected-network.png',
        ]}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-xl"
              onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
            >
              <Bell className="w-5 h-5 mr-2" />
              View Live Alerts ({alerts.length})
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/risk-monitoring/district-risk-profiles')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              District Risk
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/report-issue')}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report Hazard
            </Button>
          </div>
        }
      />

      {/* Real-Time Telemetry Stream Command Bar */}
      <div className="bg-slate-900/90 border-y border-emerald-500/30 px-4 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              Live Telemetry Stream Active
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3 h-3 text-emerald-400" />
              USGS Seismic · GloFAS Hydrology · Open-Meteo CAMS AQI · Ramban Geotech
            </span>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-slate-400 hidden sm:inline">
                Synced: <span className="text-white font-mono">{new Date(lastUpdated).toLocaleTimeString()}</span>
              </span>
            )}
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all font-medium disabled:opacity-50"
            >
              <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Syncing...' : 'Refresh Telemetry'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Active Alerts Ribbon */}
      {priorityLiveAlerts.length > 0 && (
        <section className="py-8 border-b border-red-500/20 bg-red-950/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
                <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                  Live Active Environmental Alerts ({priorityLiveAlerts.length})
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  REAL API STREAM
                </span>
              </div>
              <button
                onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
                className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
              >
                <span>View full alert matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {priorityLiveAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card
                    className="glass-intense border-red-500/30 p-4 cursor-pointer hover:border-red-500/60 hover:bg-red-950/30 transition-all flex flex-col justify-between h-full"
                    onClick={() => router.push(alert.relatedModulePath || '/risk-monitoring/live-alerts-advisories')}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        {getLiveSeverityBadge(alert.severity)}
                        <span className="text-xs text-slate-400 font-medium truncate">{alert.district}</span>
                      </div>

                      <h3 className="text-sm font-semibold text-white mb-1.5 line-clamp-1">{alert.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-3 mb-3">{alert.summary || (alert as any).description}</p>
                    </div>

                    <div>
                      {(alert.updates?.[0]?.note || (alert as any).liveMetric || alert.cause) && (
                        <div className="mb-2.5 px-2 py-1.5 rounded bg-black/50 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
                          <span className="truncate">{alert.updates?.[0]?.note || (alert as any).liveMetric || alert.cause}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                        <span className="truncate max-w-[140px] text-slate-300 font-medium">{alert.issuedBy || alert.source}</span>
                        <div className="flex items-center gap-1 text-slate-400 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{formatAlertTime(alert.updated || alert.issued || (alert as any).timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Status Board - Key Metrics */}
      <section className="py-12 border-y border-white/5 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Live Alerts', value: alerts.length, icon: Bell, color: 'text-red-400', sub: 'Open-Meteo & USGS' },
              { label: 'Critical & High', value: criticalCount, icon: AlertTriangle, color: 'text-red-500', sub: 'Elevated Risk' },
              { label: 'Monitored Districts', value: uniqueDistricts || 10, icon: MapPin, color: 'text-blue-400', sub: 'Kashmir Valley & Passes' },
              { label: 'Live Telemetry Feeds', value: `${alerts.length} Feeds`, icon: Radio, color: 'text-emerald-400', sub: 'Real-time sensors' },
              { label: 'Active Advisories', value: liveAdvisories.length, icon: FileText, color: 'text-amber-400', sub: 'Real-time guidance' },
            ].map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="text-center"
              >
                <metric.icon className={`w-6 h-6 ${metric.color} mx-auto mb-2`} />
                <div className="text-3xl font-bold text-white mb-0.5">{metric.value}</div>
                <div className="text-xs font-semibold text-slate-300">{metric.label}</div>
                <div className="text-[11px] text-slate-400">{metric.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hazard Category Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Hazard Category Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dynamicHazardSummaries.map((hazard, idx) => (
              <motion.div
                key={hazard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 p-5 cursor-pointer transition-all flex flex-col justify-between h-full"
                  onClick={() => router.push(hazard.route)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{hazard.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-xs font-semibold ${hazard.hasLiveFeed ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {hazard.activeAlerts} {hazard.hasLiveFeed ? 'live alerts' : 'active alerts'}
                          </span>
                          {hazard.hasLiveFeed && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          )}
                        </div>
                      </div>
                    </div>
                    {getRiskLevelBadge(hazard.riskLevel)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{hazard.districts.length} districts</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${hazard.trend === 'increasing' ? 'text-red-400' : hazard.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                      <span>{hazard.trend}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Risk Status Board */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">District Risk Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dominant Hazards</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topDistricts.map((district, idx) => (
                  <tr
                    key={district.district}
                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => router.push('/risk-monitoring/district-risk-profiles')}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-white flex items-center gap-2">
                      <span>{district.district}</span>
                      {district.hasLiveSensor && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          LIVE
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{getRiskLevelBadge(district.riskLevel)}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-200">
                      <span className={district.hasLiveSensor ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                        {district.activeAlerts} {district.hasLiveSensor ? 'active' : ''}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400">{district.dominantHazards.slice(0, 2).join(', ')}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                        <span className={`text-xs ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`}>
                          {district.riskTrend}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Active Advisories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Active Advisories</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                LIVE HAZARD GUIDANCE
              </span>
            </div>
            <button
              onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              <span>View all advisories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveAdvisories.map((adv, idx) => (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-amber-500/40 p-5 cursor-pointer transition-all h-full flex flex-col justify-between"
                  onClick={() => router.push(adv.relatedModulePath || '/risk-monitoring')}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={adv.severity === 'critical' || adv.guidance.urgency === 'urgent' ? 'danger' : 'warning'}
                          size="sm"
                        >
                          {adv.guidance.urgency === 'urgent' ? 'WARNING' : 'ADVISORY'}
                        </Badge>
                        <span className="text-xs text-slate-400 font-medium">{adv.district}</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-mono">REAL-TIME</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{adv.title}</h3>
                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">{adv.guidance.summary || adv.summary}</p>
                    
                    {adv.guidance.actions && adv.guidance.actions.length > 0 && (
                      <div className="space-y-1 mb-3 bg-black/30 p-2.5 rounded border border-white/5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Recommended Response:</span>
                        {adv.guidance.actions.slice(0, 2).map((act: string, aIdx: number) => (
                          <div key={aIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-amber-400 text-xs leading-none mt-0.5">•</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span className="truncate max-w-[200px] text-slate-400">By: {adv.issuedBy}</span>
                    <span>Valid: {formatAlertTime(adv.expires)}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents & Operational Telemetry */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Live Environmental Incidents & Telemetry</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-medium">
                REAL API DETECTIONS
              </span>
            </div>
            <button
              onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
              className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
            >
              <span>View telemetry logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {liveIncidents.map((incident, idx) => {
              const severityColors = getSeverityColor(incident.severity);
              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className={`glass-intense border-l-4 ${severityColors.border} p-4 hover:bg-white/[0.03] transition-all cursor-pointer`}
                    onClick={() => router.push(incident.relatedModulePath || '/risk-monitoring')}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-sm font-bold text-white">{incident.title}</h3>
                          <Badge variant={incident.severity === 'critical' || incident.severity === 'high' ? 'danger' : 'warning'} size="sm">
                            {incident.status.toUpperCase()}
                          </Badge>
                          <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-medium">
                            {incident.district}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-2 leading-relaxed">{incident.summary}</p>
                        
                        {incident.updates?.[0]?.note && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{incident.updates[0].note}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center gap-1 text-xs text-slate-400 flex-shrink-0">
                        <span className="text-slate-400 font-medium">{incident.issuedBy}</span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatAlertTime(incident.issued || incident.updated)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links to All Submodules */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Risk Intelligence Submodules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {submodules.map((mod, idx) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 p-5 cursor-pointer transition-all group"
                  onClick={() => router.push(mod.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center flex-shrink-0`}>
                      <mod.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{mod.name}</h3>
                      <p className="text-xs text-slate-400">{mod.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-medium text-red-400 group-hover:text-red-300 transition-colors">
                    <span>Access Module</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 relative overflow-hidden">
            {/* Gradient overlay */}
            
            <div className="absolute inset-0 bg-slate-900/50" />
            
            <div className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                    <Phone className="w-5 h-5 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Report a Hazard or Emergency</h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                  Help improve risk monitoring by reporting hazards, incidents, and emergency situations in your area
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                    onClick={() => router.push('/report-issue')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Report Emergency
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
                  >
                    <Bell className="w-5 h-5 mr-2" />
                    View All Alerts
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/submit-observation')}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Submit a Sighting
                  </Button>
                </div>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>

      
    </main>
  );
}
