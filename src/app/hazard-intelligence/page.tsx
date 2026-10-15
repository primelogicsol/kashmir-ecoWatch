'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
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
        label="Hazard Intelligence · Early Warning Network"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence' }
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">Hazard Intelligence</span>
          </>}
        subtitle="Multi-hazard monitoring covering floods, landslides, avalanches, earthquakes, GLOFs, and forest fires across the Western Himalayan ecological region"
        icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-red-600 to-amber-600 font-bold text-white"
              icon={<Map className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/dashboards')}
            >
              Explore Multi-Hazard Map
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<AlertTriangle className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/floods')}
            >
              Active Alert Registry
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/FLOODS.jpg',
          '/images/hazard-intelligence/LANDSLIDE.jpg',
          '/images/hazard-intelligence/AVA.webp',
          '/images/hazard-intelligence/June-18-Salt-Fire-9-Courtesy-of-Mescalero-Apache-Tribe.webp',
          '/images/hazard-intelligence/25851504_af_aspera.jpg',
          '/images/protected-network.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
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

      
      {/* ── Multi-Hazard Typologies & Early Warning Citizen Protocols ──────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Western Himalayan Hazard Typologies & Crisis Regimes"
          typologySubtitle="Select a geological, meteorological, or cryospheric hazard category to review real-time alerts across Kashmir and Ladakh."
          typologyIcon={AlertTriangle}
          typologies={[
            { id: 'all', label: 'All Hazard Domains', count: 8, icon: AlertTriangle, color: 'rose' },
            { id: 'floods', label: 'Riverine & Flash Floods', count: 41, icon: Waves, color: 'blue' },
            { id: 'landslides', label: 'Slope Instability & Debris Flows', count: 48, icon: Mountain, color: 'amber' },
            { id: 'avalanches', label: 'Alpine Snowpack & Avalanches', count: 18, icon: Snowflake, color: 'sky' },
            { id: 'earthquakes', label: 'Seismic Faults & Quakes', count: 12, icon: Activity, color: 'rose' },
            { id: 'glofs', label: 'Glacial Outburst Floods (GLOFs)', count: 18, icon: Droplets, color: 'teal' },
            { id: 'fires', label: 'Wildfires & Forest Hotspots', count: 6, icon: Flame, color: 'orange' },
          ]}
          activeTypology={hazardFilter}
          onSelectTypology={(id) => setHazardFilter(id)}
          showingCount={hazardFilter === 'all' ? 8 : 1}
          totalCount={8}
          entityLabel="hazard submodules"
          spotlightTitle="Multi-Hazard Early Warning & Cryospheric Risk Synthesis"
          spotlightSubtitle="Integrating USGS seismic sensors, GloFAS flood forecasts, IMD meteorological radars, and field observers across 44 Himalayan districts."
          tabs={[
            {
              id: 'landslide-corridors',
              label: 'NH-44 & Mountain Highway Slope Instability',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Critical Highway Chokepoint</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Ramban-Banihal NH-44 Sector</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Sheared Murree formation siltstones and Panjal volcanics subjected to continuous road widening cut-slopes trigger recurring rockfalls and mudslides at Panthyal, Mehar, and Cafeteria Morh.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Hazard Index: Critical during rainfall &gt; 25 mm/24h</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Trans-Himalayan Arterial</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Zoji La (NH-1) Pass Axis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Elevated at 3,528m connecting Kashmir to Ladakh. Prone to severe wind-slab avalanches and spring freeze-thaw rock detachment along steep serpentine cliffs near Gumri and Captain Morh.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Mitigation: 14.15 km all-weather Zoji La tunnel</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">High-Altitude Cryosphere</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Glacial Moraine Lake Outbursts</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Over 18 expanding proglacial lakes in Zanskar, Karakoram, and Upper Indus basin monitored via Sentinel-2 satellite imagery for moraine dam breaches and ice avalanche impact surges.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Early Warning: High-resolution satellite altimetry</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'seismic-faults',
              label: 'Seismic Hazards & Active Himalayan Faults',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Main Boundary Thrust (MBT) &amp; Kashmir Seismic Gap</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      The tectonic collision between the Indian and Eurasian plates creates immense strain accumulation. The 2005 Kashmir earthquake (M7.6) ruptured the Muzaffarabad fault; active monitoring tracks microseismicity in Chenab and Pir Panjal.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Seismic Zone: Zone V (Highest Seismic Vulnerability)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">River Jhelum Hydraulic Flood Routing</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Automated ultrasonic river gauges at Sangam (Anantnag), Ram Munshi Bagh (Srinagar), and Asham (Bandipora) provide continuous discharge hydrographs to detect impending flood stage exceedance (target &lt; 21 ft at Sangam).
                    </p>
                    <div className="text-[11px] text-blue-300 font-mono">Flood Stage Benchmark: 21.0 ft (Alert) | 23.0 ft (Danger)</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Disaster &amp; Hazard Early Warning Sentinel Network"
          observeSubtitle="Dispatch immediate crowd-sourced field alerts for flash floods, slope tension cracks, road blockages, or avalanche chutes."
          observeBadge="SDMA Disaster Protocol Active"
          protocols={[
            {
              number: '1',
              title: 'Slope Tension Crack & Subsidence Spotting',
              desc: 'Photograph newly emerging ground fractures or tilted telephone poles on mountain slopes indicating imminent landsliding.',
              benchmark: 'Geological Survey of India Landslide Warning Protocol',
              icon: Mountain,
              color: 'amber',
            },
            {
              number: '2',
              title: 'Rapid River Gauge Water Level Spotting',
              desc: 'Log and photograph river level markings on bridges or gauge poles during intense rainfall and cloudburst events.',
              benchmark: 'Central Water Commission (CWC) Flood Alert Standard',
              icon: Waves,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Avalanche Crown Fracture Observation',
              desc: 'Document visible fracture lines, shooting cracks in snowpack, or recent avalanche debris across backcountry ski and transit routes.',
              benchmark: 'Defence Geoinformatics Research Establishment (DGRE)',
              icon: Snowflake,
              color: 'sky',
            },
            {
              number: '4',
              title: 'Forest Smoke Plume & Thermal Hotspot Dispatch',
              desc: 'Report smoke plumes in pine forest ridges with GPS coordinates to mobilize local forest protection fire crews.',
              benchmark: 'Forest Survey of India Fire Alert Protocol',
              icon: Flame,
              color: 'rose',
            },
          ]}
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
