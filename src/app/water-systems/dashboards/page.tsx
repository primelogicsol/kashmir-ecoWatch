'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart3, Map, TrendingUp, Droplet, Waves, Thermometer,
  Activity, ArrowRight, Eye, Database, AlertTriangle, LineChart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';

const dashboardModules = [
  {
    title: 'Water Quality Dashboard',
    description: 'Real-time water quality parameters across lakes, rivers, and springs with trend analysis',
    icon: Droplet,
    color: 'from-cyan-500 to-blue-600',
    metrics: ['pH Levels', 'Dissolved Oxygen', 'Turbidity', 'Contaminants'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
    route: '/dashboards/water-quality',
  },
  {
    title: 'Hydrological Monitoring',
    description: 'Flow rates, water levels, and discharge monitoring across all water systems',
    icon: Waves,
    color: 'from-blue-500 to-indigo-600',
    metrics: ['Flow Velocity', 'Discharge Rate', 'Water Level', 'Seasonal Variation'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
  {
    title: 'Lake Health Scorecard',
    description: 'Comprehensive health assessment of all Kashmir lakes with multi-metric scoring',
    icon: Thermometer,
    color: 'from-emerald-500 to-teal-600',
    metrics: ['Trophic State', 'Biodiversity Index', 'Pollution Load', 'Recovery Rate'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
  {
    title: 'Algal Bloom Intelligence',
    description: 'Early warning and monitoring of harmful algal blooms across water bodies',
    icon: Activity,
    color: 'from-amber-500 to-orange-600',
    metrics: ['Chlorophyll-a', 'Cyanobacteria', ' bloom Risk', 'Toxin Levels'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
  {
    title: 'Flood Risk & Forecasting',
    description: 'Real-time flood risk assessment with water level monitoring and forecast models',
    icon: AlertTriangle,
    color: 'from-red-500 to-rose-600',
    metrics: ['Risk Zones', 'Water Level', 'Precipitation', 'Forecast Window'],
    status: 'Beta' as const,
    statusVariant: 'warning' as const,
  },
  {
    title: 'Watershed Intelligence',
    description: 'Catchment-scale analysis of water availability, quality, and ecological health',
    icon: Map,
    color: 'from-green-500 to-emerald-600',
    metrics: ['Catchment Area', 'Runoff Volume', 'Groundwater Recharge', 'Land Use'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
];

const performanceMetrics = [
  { label: 'Monitoring Stations', value: '234', trend: '+12', icon: Database },
  { label: 'Daily Samples', value: '1,847', trend: '+8%', icon: BarChart3 },
  { label: 'Active Alerts', value: '7', trend: '-3', icon: AlertTriangle },
  { label: 'Data Points', value: '2.4M', trend: '+15%', icon: LineChart },
];

const districtWaterStress = [
  { district: 'Srinagar', stress: 78, status: 'High' as const, aqi: 187, waterQuality: 'Poor' as const },
  { district: 'Anantnag', stress: 62, status: 'Moderate' as const, aqi: 142, waterQuality: 'Moderate' as const },
  { district: 'Baramulla', stress: 48, status: 'Low' as const, aqi: 98, waterQuality: 'Good' as const },
  { district: 'Pulwama', stress: 71, status: 'High' as const, aqi: 156, waterQuality: 'Poor' as const },
  { district: 'Budgam', stress: 52, status: 'Moderate' as const, aqi: 118, waterQuality: 'Moderate' as const },
  { district: 'Ganderbal', stress: 45, status: 'Low' as const, aqi: 76, waterQuality: 'Good' as const },
  { district: 'Kupwara', stress: 38, status: 'Low' as const, aqi: 64, waterQuality: 'Good' as const },
  { district: 'Shopian', stress: 42, status: 'Low' as const, aqi: 71, waterQuality: 'Good' as const },
];

const subPageLinks = [
  { label: 'Lakes', href: '/water-systems/lakes', icon: Waves },
  { label: 'Rivers', href: '/water-systems/rivers', icon: Droplet },
  { label: 'Springs', href: '/water-systems/springs', icon: Thermometer },
  { label: 'Groundwater', href: '/water-systems/groundwater', icon: Map },
  { label: 'Water Quality', href: '/water-systems/water-quality', icon: Activity },
  { label: 'Flood Monitoring', href: '/water-systems/flood-monitoring', icon: AlertTriangle },
  { label: 'Wetlands', href: '/water-systems/wetlands', icon: Waves },
  { label: 'Conservation Areas', href: '/water-systems/conservation-areas', icon: Database },
];

export default function WaterSystemsDashboardsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        label="Water Systems Analytics"
        title="Western Himalayan Water Dashboards"
        subtitle="Real-time analytics, trends, and heatmaps for hydrological monitoring, water quality tracking, and aquatic ecosystem health across Kashmir."
        icon={<BarChart3 className="w-6 h-6 text-cyan-400" />}
        breadcrumbs={[{ label: 'Water Systems', href: '/water-systems' }, { label: 'Dashboards' }]}
        gridOverlay
        actions={
          <>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 text-white"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/dashboards/water-quality')}
            >
              Open Water Quality Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white"
              icon={<Database className="w-5 h-5" />}
              onClick={() => router.push('/water-systems/lakes')}
            >
              Lake Health Scorecard
            </Button>
          </>
        }
      />

      <ModuleKpiStrip kpis={[
        { label: 'Monitoring Stations', value: 234,     icon: 'Database',      color: 'text-cyan-400'    },
        { label: 'Daily Samples',       value: 1847,    icon: 'BarChart3',     color: 'text-blue-400'    },
        { label: 'Active Alerts',       value: 7,       icon: 'AlertTriangle', color: 'text-amber-400'   },
        { label: 'Data Points (M)',     value: '2.4M',  icon: 'LineChart',     color: 'text-purple-400'  },
        { label: 'Water Bodies',        value: 580,     icon: 'Droplet'                                  },
        { label: 'Quality Sites',       value: 47,      icon: 'Activity'                                 },
        { label: 'Districts Covered',   value: 10,      icon: 'MapPin'                                   },
        { label: 'Reports This Month',  value: 124,     icon: 'FileText',      color: 'text-emerald-400' },
      ]} />

      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Available Dashboards</h2>
              <p className="text-sm text-slate-400">Real-time analytics and monitoring dashboards for all water systems</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardModules.map((dash, idx) => (
              <motion.div
                key={dash.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className="glass border-white/10 h-full hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  onClick={() => dash.route && router.push(dash.route)}
                  padding="md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${dash.color}`}>
                      <dash.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={dash.statusVariant} size="sm">
                      {dash.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{dash.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{dash.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dash.metrics.map((metric) => (
                      <span key={metric}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-white/10" padding="md">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Map className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">District Water Stress Index</h2>
                <p className="text-sm text-slate-400">Composite water stress scores across Kashmir districts</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-slate-400 font-medium">District</th>
                    <th className="text-right py-3 text-slate-400 font-medium">Stress Index</th>
                    <th className="text-right py-3 text-slate-400 font-medium">Status</th>
                    <th className="text-right py-3 text-slate-400 font-medium">AQI</th>
                    <th className="text-right py-3 text-slate-400 font-medium">Water Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {districtWaterStress.map((d) => (
                    <tr key={d.district} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-white font-medium">{d.district}</td>
                      <td className="py-3 text-right tabular-nums">
                        <span className={`${d.stress > 60 ? 'text-red-400' : d.stress > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {d.stress}/100
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Badge variant={d.stress > 60 ? 'danger' : d.stress > 50 ? 'warning' : 'success'} size="sm">
                          {d.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-right text-white tabular-nums">{d.aqi}</td>
                      <td className="py-3 text-right">
                        <Badge variant={d.waterQuality === 'Good' ? 'success' : d.waterQuality === 'Moderate' ? 'warning' : 'danger'} size="sm">
                          {d.waterQuality}
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          </Card>
        </motion.div>
      </div>

      {/* Export / Share */}
      <section className="container mx-auto px-6 pb-16">
        <Card className="glass-intense border-white/10 bg-gradient-to-r from-cyan-900/20 to-blue-900/20" padding="lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Export & Share Analytics</h3>
              <p className="text-sm text-slate-400">Download water data reports and share insights</p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => alert('Export feature coming soon')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Export PDF Report
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => alert('Export feature coming soon')}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => alert('Share feature coming soon')}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Share Dashboard
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Sub-page links */}
      <section className="container mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-slate-600 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Explore Water Systems</h2>
            <p className="text-sm text-slate-400">Navigate to specialized water pages</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {subPageLinks.map((link, idx) => (
            <motion.button
              key={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => router.push(link.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-left group"
            >
              <link.icon className="w-5 h-5 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-white">{link.label}</div>
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

    </main>
  );
}
