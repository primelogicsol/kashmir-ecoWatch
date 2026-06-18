'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';

import {
  AlertTriangle, Waves, CloudRain, Mountain, Snowflake,
  Activity, Droplets, Flame, BarChart3, ChevronRight,
  Map, Eye, Shield, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ─── Submodules ──────────────────────────────────────────────────────────────

const submodules = [
  { name: 'Floods', href: '/hazard-intelligence/floods', icon: Waves, color: 'from-blue-500 to-cyan-600', status: '3 active alerts', statusColor: 'danger', desc: 'Riverine, urban and floodplain flood zone monitoring' },
  { name: 'Flash Floods', href: '/hazard-intelligence/flash-floods', icon: CloudRain, color: 'from-indigo-500 to-blue-600', status: '5 watch zones', statusColor: 'warning', desc: 'Rapid-onset flash flood early warning corridors' },
  { name: 'Landslides', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'from-amber-500 to-orange-600', status: '12 active sites', statusColor: 'danger', desc: 'Slope instability, debris flow and landslide registries' },
  { name: 'Avalanches', href: '/hazard-intelligence/avalanches', icon: Snowflake, color: 'from-cyan-500 to-sky-600', status: 'Season watch', statusColor: 'info', desc: 'Winter avalanche corridors and risk forecasting' },
  { name: 'Earthquakes', href: '/hazard-intelligence/earthquakes', icon: Activity, color: 'from-red-500 to-orange-600', status: '2 recent events', statusColor: 'warning', desc: 'Seismic activity, fault lines and microseismicity tracking' },
  { name: 'GLOFs', href: '/hazard-intelligence/glofs', icon: Droplets, color: 'from-teal-500 to-emerald-600', status: '4 GLOF risks', statusColor: 'warning', desc: 'Glacial lake outburst flood risk assessment' },
  { name: 'Forest Fires', href: '/hazard-intelligence/forest-fires', icon: Flame, color: 'from-orange-500 to-red-600', status: '6 hotspots', statusColor: 'danger', desc: 'Active fire detection, burn severity and forest loss' },
  { name: 'Dashboards', href: '/hazard-intelligence/dashboards', icon: BarChart3, color: 'from-violet-500 to-purple-600', status: 'Analytics', statusColor: 'default', desc: 'Multi-hazard analytics and district comparison' },
];

// ─── District Hazard Exposure ────────────────────────────────────────────────

const districtExposure = [
  { district: 'Srinagar', risk: 'Critical', hazards: 8, trend: 'worsening' as const },
  { district: 'Ramban', risk: 'Critical', hazards: 6, trend: 'worsening' as const },
  { district: 'Ganderbal', risk: 'High', hazards: 5, trend: 'stable' as const },
  { district: 'Muzaffarabad', risk: 'High', hazards: 7, trend: 'worsening' as const },
  { district: 'Baramulla', risk: 'Moderate', hazards: 4, trend: 'improving' as const },
  { district: 'Kishtwar', risk: 'High', hazards: 5, trend: 'stable' as const },
];

// ─── Recent Hazard Events ────────────────────────────────────────────────────

const recentEvents = [
  { type: 'Flash Flood', location: 'Chenab Gorge, Ramban', severity: 'Critical', time: '1h ago', verified: true },
  { type: 'Landslide', location: 'Srinagar–Leh Highway, Ganderbal', severity: 'High', time: '3h ago', verified: true },
  { type: 'Urban Flooding', location: 'Bemina–Padshahi Bagh, Srinagar', severity: 'High', time: '6h ago', verified: true },
  { type: 'GLOF Warning', location: 'Hunza River, Attabad Region', severity: 'Moderate', time: '12h ago', verified: false },
  { type: 'Forest Fire', location: 'Dachigam Buffer Zone, Srinagar', severity: 'High', time: '1d ago', verified: true },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function HazardIntelligenceOverview() {
  const router = useRouter();
  const [hazardFilter, setHazardFilter] = useState('all');

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence' }
        ]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">Hazard Intelligence</span>
          </>}
        subtitle="Multi-hazard monitoring covering floods, landslides, avalanches, earthquakes, GLOFs, and forest fires across the Western Himalayan ecological region"
        icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
      />

      <ModuleKpiStrip kpis={[
        { label: 'Active Hazards',      value: 34,     icon: 'AlertTriangle', color: 'text-red-400'     },
        { label: 'Flood Zones',         value: 36,     icon: 'Waves',         color: 'text-blue-400'    },
        { label: 'Landslide Sites',     value: 48,     icon: 'Mountain',      color: 'text-amber-400'   },
        { label: 'Seismic Events',      value: 12,     icon: 'Activity',      color: 'text-orange-400'  },
        { label: 'GLOF Risks',          value: 18,     icon: 'Droplets',      color: 'text-teal-400'    },
        { label: 'Fire Hotspots',       value: 6,      icon: 'Flame',         color: 'text-red-400'     },
        { label: 'Districts Monitored', value: 44,     icon: 'MapPin',        color: 'text-emerald-400' },
        { label: 'Last Updated',        value: 'Live', icon: 'Clock',         color: 'text-cyan-400'    },
      ]} />

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <FilterSelect
              value={hazardFilter}
              onChange={setHazardFilter}
              placeholder="All Hazard Types"
              options={[
                { value: 'floods',        label: 'Floods'         },
                { value: 'flash-floods',  label: 'Flash Floods'   },
                { value: 'landslides',    label: 'Landslides'     },
                { value: 'avalanches',    label: 'Avalanches'     },
                { value: 'earthquakes',   label: 'Earthquakes'    },
                { value: 'glofs',         label: 'GLOFs'          },
                { value: 'forest-fires',  label: 'Forest Fires'   },
              ]}
            />
          }
          extraActiveCount={hazardFilter !== 'all' ? 1 : 0}
          onExtraFiltersClear={() => setHazardFilter('all')}
        />
      </div>

      {/* Submodules Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Hazard Domains</h2>
            <p className="text-slate-400">Access all hazard intelligence submodules across the Western Himalayan ecology</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submodules.map((mod, i) => (
              <motion.div key={mod.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(mod.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <mod.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{mod.name}</h3>
                        <Badge variant={mod.statusColor as any} size="sm" className="text-xs">{mod.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-400">{mod.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Exposure + Recent Events */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* District Hazard Exposure */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                District Hazard Exposure
              </h2>
              <Card className="glass-intense border-white/10 p-5">
                <div className="space-y-3">
                  {districtExposure.map((d) => (
                    <div key={d.district} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          d.risk === 'Critical' ? 'bg-red-400' : d.risk === 'High' ? 'bg-orange-400' : d.risk === 'Moderate' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`} />
                        <span className="text-sm text-white font-medium">{d.district}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{d.hazards} hazards</span>
                        <span className={`text-[10px] ${
                          d.trend === 'worsening' ? 'text-red-400' : d.trend === 'improving' ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          {d.trend === 'worsening' ? '↗ Worsening' : d.trend === 'improving' ? '↘ Improving' : '→ Stable'}
                        </span>
                        <Badge variant={d.risk === 'Critical' ? 'critical' : d.risk === 'High' ? 'danger' : d.risk === 'Moderate' ? 'warning' : 'success'} size="sm">{d.risk}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Hazard Events */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Recent Hazard Events
              </h2>
              <Card className="glass-intense border-white/10 p-5">
                <div className="space-y-3">
                  {recentEvents.map((r, i) => (
                    <div key={i} className="py-2 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{r.type}</span>
                        <div className="flex items-center gap-2">
                          {r.verified && <Badge variant="success" size="sm" className="text-xs">Verified</Badge>}
                          <Badge variant={r.severity === 'Critical' ? 'critical' : r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">{r.severity}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Map className="w-3 h-3" />
                        <span>{r.location}</span>
                        <span className="text-slate-600">•</span>
                        <span>{r.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Multi-Hazard Exposure Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/hazard-intelligence/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-72 bg-gradient-to-br from-red-900/30 to-slate-900/50 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive multi-hazard exposure map with flood, landslide, seismic, and fire layers</p>
                <p className="text-slate-500 text-xs">Flood zones • Landslide sites • Fault lines • GLOF risk lakes • Active fire hotspots</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Escalation Notice */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-amber-500/20 p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Escalation to Risk & Monitoring</h3>
                <p className="text-sm text-slate-400">
                  When hazard events cross critical thresholds — major flood inundation, large landslides blocking highways,
                  significant seismic activity, GLOF breach warnings — they are escalated and mirrored into
                  the <span className="text-white font-medium">Risk & Monitoring</span> module for coordinated emergency response
                  across all Western Himalayan divisions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

    </main>
  );
}
