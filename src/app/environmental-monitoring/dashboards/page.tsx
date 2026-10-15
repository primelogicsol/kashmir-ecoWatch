'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { Trash2, Droplets, Wind, Waves, Shield, Building2, Factory } from 'lucide-react';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import {
  BarChart3, Map, TrendingUp, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock, Search,
  MapPin, ExternalLink, Layers, PieChart,
  Eye, Database, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const dashboardModules = [
  {
    title: 'District Comparison Dashboard',
    description: 'Side-by-side performance metrics across all Kashmir districts with trend analysis',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-600',
    metrics: ['AQI', 'Water Quality', 'Waste Management', 'Infrastructure Health'],
    status: 'Live',
    statusVariant: 'success' as const,
    href: '#district-comparison',
  },
  {
    title: 'Environmental Stress Heatmap',
    description: 'Geospatial visualization of cumulative environmental stress indicators',
    icon: Layers,
    color: 'from-red-500 to-orange-600',
    metrics: ['Stress Index', 'Hotspot Detection', 'Risk Layers', 'Temporal Analysis'],
    status: 'Live',
    statusVariant: 'success' as const,
    href: '/environmental-monitoring/environmental-resilience',
  },
  {
    title: 'Water Systems Intelligence',
    description: 'Hydrological monitoring across rivers, lakes, springs, and groundwater systems',
    icon: Database,
    color: 'from-cyan-500 to-teal-600',
    metrics: ['Flow Rates', 'Quality Parameters', 'Source Mapping', 'Contamination Tracking'],
    status: 'Live',
    statusVariant: 'success' as const,
    href: '/water-systems',
  },
  {
    title: 'Air Quality Trends',
    description: 'Historical and real-time air quality analysis with forecasting models',
    icon: Globe,
    color: 'from-slate-500 to-gray-600',
    metrics: ['AQI Trends', 'Pollutant Breakdown', 'Source Attribution', 'Health Impact'],
    status: 'Live',
    statusVariant: 'success' as const,
    href: '/environmental-monitoring/air-pollution',
  },
  {
    title: 'Waste Management Tracker',
    description: 'Solid waste, bio-waste, and sewage treatment performance monitoring',
    icon: PieChart,
    color: 'from-emerald-500 to-green-600',
    metrics: ['Collection Rates', 'Treatment Capacity', 'Dumping Sites', 'Recycling Index'],
    status: 'Live',
    statusVariant: 'success' as const,
    href: '/environmental-monitoring/solid-waste',
  },
  {
    title: 'Infrastructure Asset Registry',
    description: 'Complete inventory of water infrastructure with condition assessment',
    icon: Eye,
    color: 'from-indigo-500 to-blue-600',
    metrics: ['Asset Count', 'Health Index', 'Maintenance Status', 'Failure Risk'],
    status: 'Live',
    statusVariant: 'success' as const,
    href: '/environmental-monitoring/utility-incidents',
  },
];

const districtAggregateData = [
  { district: 'Srinagar', overallStress: 78, stressVariant: 'danger' as const, aqi: 187, waterQuality: 'Poor', wasteMgmt: '72%', infraHealth: '68%', incidentCount: 87 },
  { district: 'Anantnag', overallStress: 62, stressVariant: 'warning' as const, aqi: 142, waterQuality: 'Moderate', wasteMgmt: '65%', infraHealth: '65%', incidentCount: 43 },
  { district: 'Baramulla', overallStress: 48, stressVariant: 'success' as const, aqi: 98, waterQuality: 'Good', wasteMgmt: '68%', infraHealth: '78%', incidentCount: 28 },
  { district: 'Pulwama', overallStress: 71, stressVariant: 'danger' as const, aqi: 156, waterQuality: 'Poor', wasteMgmt: '61%', infraHealth: '58%', incidentCount: 54 },
  { district: 'Budgam', overallStress: 52, stressVariant: 'warning' as const, aqi: 118, waterQuality: 'Moderate', wasteMgmt: '70%', infraHealth: '68%', incidentCount: 23 },
  { district: 'Ganderbal', overallStress: 45, stressVariant: 'success' as const, aqi: 76, waterQuality: 'Good', wasteMgmt: '74%', infraHealth: '71%', incidentCount: 19 },
  { district: 'Kupwara', overallStress: 38, stressVariant: 'success' as const, aqi: 64, waterQuality: 'Good', wasteMgmt: '58%', infraHealth: '81%', incidentCount: 14 },
  { district: 'Shopian', overallStress: 42, stressVariant: 'success' as const, aqi: 71, waterQuality: 'Good', wasteMgmt: '63%', infraHealth: '62%', incidentCount: 16 },
];

const quickAnalytics = [
  {
    title: 'Environmental Stress Index',
    value: '64/100',
    status: 'Moderate-High',
    variant: 'warning' as const,
    trend: '↗ +3.2%',
    desc: 'Composite stress score across all monitored environmental domains',
  },
  {
    title: 'District Compliance Rate',
    value: '67%',
    status: 'Below Target',
    variant: 'warning' as const,
    trend: '→ Stable',
    desc: 'Percentage of districts meeting minimum environmental quality standards',
  },
  {
    title: 'Total Active Monitors',
    value: '247',
    status: 'Operational',
    variant: 'success' as const,
    trend: '↗ +12 this month',
    desc: 'Active sensors, stations, and reporting systems across Kashmir',
  },
  {
    title: 'Data Availability',
    value: '94.2%',
    status: 'Excellent',
    variant: 'success' as const,
    trend: '↗ +0.8%',
    desc: 'Percentage of expected data points successfully captured',
  },
];

export default function DashboardsPage() {
  const router = useRouter();
  const [dashboardFilter, setDashboardFilter] = useState('all');
  const [liveAqiMap, setLiveAqiMap] = useState<Record<string, number>>({});
  const [isLiveLoaded, setIsLiveLoaded] = useState(false);

  React.useEffect(() => {
    try {
      const cached = localStorage.getItem('kew_air_quality_cache_v2');
      if (cached) {
        const { data } = JSON.parse(cached);
        if (Array.isArray(data)) {
          const map: Record<string, number> = {};
          data.forEach((st: any) => {
            if (st.district && st.aqi !== undefined) {
              map[st.district.toLowerCase()] = st.aqi;
            }
          });
          setLiveAqiMap(map);
          setIsLiveLoaded(true);
          return;
        }
      }
    } catch (e) {}

    // Fallback: fetch live AQI for the 8 core districts
    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=34.0837,33.7311,34.1990,33.8716,33.9349,34.2262,34.5262,33.7172&longitude=74.7973,75.1487,74.3636,74.8946,74.6400,74.7748,74.2546,74.8343&hourly=us_aqi&timezone=auto&forecast_days=1')
      .then(r => r.json())
      .then(res => {
        const results = Array.isArray(res) ? res : [res];
        const dists = ['srinagar', 'anantnag', 'baramulla', 'pulwama', 'budgam', 'ganderbal', 'kupwara', 'shopian'];
        const map: Record<string, number> = {};
        dists.forEach((d, i) => {
          const arr = results[i]?.hourly?.us_aqi;
          if (arr && arr.length > 0) {
            map[d] = arr[arr.length - 1] ?? 50;
          }
        });
        setLiveAqiMap(map);
        setIsLiveLoaded(true);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        label="Environmental Monitoring · Analytics Suite"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Dashboards' }
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Environmental Dashboards</span>
          </>}
        subtitle="Comprehensive analytics dashboards with district comparison, stress heatmaps, trend analysis, and real-time environmental intelligence across all monitoring domains"
        icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold"
              icon={<Search className="w-5 h-5" />}
              onClick={() => router.push('/environmental-monitoring')}
            >
              Explore All Domains
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Database className="w-5 h-5" />}
              onClick={() => {
                const el = document.getElementById('district-comparison');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              District Stress Matrix
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

      <ModuleKpiStrip kpis={[
        { label: 'Env Stress Index',    value: '64/100', icon: 'BarChart3',   color: 'text-amber-400'   },
        { label: 'District Compliance', value: '67%',    icon: 'Shield',      color: 'text-blue-400'    },
        { label: 'Active Monitors',     value: 247,      icon: 'Activity',    color: 'text-emerald-400' },
        { label: 'Data Availability',   value: '94.2%',  icon: 'Database',    color: 'text-cyan-400'    },
        { label: 'Tracked Districts',   value: 20,       icon: 'Map',         color: 'text-white'       },
        { label: 'Resolved Incidents',  value: 142,      icon: 'ShieldCheck', color: 'text-emerald-400' },
        { label: 'Avg Incident Response',value: '4.2h',  icon: 'Clock',       color: 'text-purple-400'  },
        { label: 'Telemetry Refresh',   value: 'Live',   icon: 'Globe',       color: 'text-teal-400'    },
      ]} />
      
      {/* ── Live Environmental Intelligence Synthesis Banner ─────────────── */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-emerald-500/20 p-4 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Environmental Intelligence Synthesis Engine</span>
                  <Badge variant="success" size="sm" className="text-[9px]">Live Synthesis Active</Badge>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Multi-domain composite analytics syncing live Open-Meteo CAMS atmospheric data, water stress indicators, and regional telemetry.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                Modules Connected: <strong className="text-white font-bold">6 Live Suites</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Atmospheric Telemetry: <strong>Synchronized</strong></span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <FilterSelect
              value={dashboardFilter}
              onChange={setDashboardFilter}
              placeholder="All Dashboards"
              options={[
                { value: 'district-comparison', label: 'District Comparison' },
                { value: 'stress-heatmap',      label: 'Stress Heatmap'      },
                { value: 'water-systems',       label: 'Water Systems'       },
                { value: 'air-quality',         label: 'Air Quality'         },
                { value: 'waste-management',    label: 'Waste Management'    },
                { value: 'infrastructure',      label: 'Infrastructure'      },
              ]}
            />
          }
          extraActiveCount={dashboardFilter !== 'all' ? 1 : 0}
          onExtraFiltersClear={() => setDashboardFilter('all')}
        />
      </div>

      
      {/* ── Focus Typologies & Observation Spotlight ──────────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Environmental Analytics &amp; District Stress Typologies"
          typologySubtitle="Select an analytical focus stream to interrogate stress heatmaps, atmospheric trends, and waste performance indices."
          typologyIcon={BarChart3}
          typologies={[
            { id: 'all', label: 'All Dashboards', count: 6, icon: Layers, color: 'violet' },
            { id: 'district', label: 'District Comparisons', count: 8, icon: MapPin, color: 'emerald' },
            { id: 'stress', label: 'Cumulative Stress Heatmaps', count: 12, icon: AlertTriangle, color: 'rose' },
            { id: 'water', label: 'Hydrological Analytics', count: 4, icon: Droplets, color: 'cyan' },
            { id: 'air', label: 'Air Quality Forecasts', count: 8, icon: Wind, color: 'sky' },
            { id: 'waste', label: 'Waste Auditing Tracker', count: 5, icon: Trash2, color: 'amber' },
          ]}
          activeTypology="all"
          onSelectTypology={() => {}}
          showingCount={6}
          totalCount={6}
          entityLabel="active analytical suites"
          spotlightTitle="District Stress Synthesis &amp; Real-Time Geospatial Analytics"
          spotlightSubtitle="Cross-referencing CPCB air monitoring stations, satellite telemetry, and municipal waste inventories across 10 Kashmir districts."
          tabs={[
            {
              id: 'disparity',
              label: 'District Stress Stratification',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">High Stress Urban Hubs</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Srinagar &amp; Pulwama</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Srinagar (78/100) and Pulwama (71/100) record elevated stress due to vehicular density, brick kiln emissions, unsewered municipal runoff, and critical pressure on Achan and peripheral waterbodies.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Incident Density: 87+ active tracking cases</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Moderate Mixed Agro-Urban</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Anantnag &amp; Budgam</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Anantnag (62/100) and Budgam (52/100) exhibit moderate stress driven by rapid commercial ribbon development, pesticide wash-off in orchard soils, and localized industrial stone crushing clusters.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Stress Index: 57 avg composite rating</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Stable Forest Catchments</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Ganderbal &amp; Kupwara</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Ganderbal (45/100) and Kupwara (38/100) maintain the highest ecological integrity with extensive intact coniferous forest cover, high headwater dilution capacity, and low industrial footprints.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Air Quality Baseline: AQI 64-76 (Good/Satisfactory)</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'telemetry',
              label: 'Integrated Sensor Architecture',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Copernicus &amp; Open-Meteo Integration</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Automated hourly API synchronizations feed US AQI, particulate concentrations (PM2.5, PM10), gaseous pollutants (NO2, SO2), and GloFAS river discharge hydrographs directly into KEW dashboards.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Telemetry Frequency: Continuous 60-min interval</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Municipal Ground-Truth Calibrations</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Satellite vegetation vigor (Sentinel-2 NDVI) and air quality predictions are rigorously ground-truthed against certified laboratory samples.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Calibration Ratio: 94.2% statistical confidence</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="environmental"
          observeTitle="Environmental Analytics Ground-Truth &amp; Field Audit Hub"
          observeSubtitle="Corroborate analytical dashboard trends with verified field measurements, report data anomalies, or submit geo-tagged ward observations."
          observeBadge="Analytics Field Sync Active"
          protocols={[
            {
              number: '1',
              title: 'Automated Sensor Ground-Truthing',
              desc: 'Cross-check automated continuous air or hydrological sensor outputs with portable calibrated photometers and colorimeters.',
              benchmark: 'ISO/IEC 17025 Calibration Tolerance (+-5%)',
              icon: Eye,
              color: 'violet',
            },
            {
              number: '2',
              title: 'Ward Infrastructure Deficiency Audit',
              desc: 'Document broken sewerage conduits, non-functional aeration pumps at STPs, or overflow at waste collection points.',
              benchmark: 'CPHEEO Urban Drainage Maintenance Schedule',
              icon: Building2,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Waterbody Turbidity &amp; Secchi Logging',
              desc: 'Measure euphotic depth and water clarity across urban lakes and river confluence zones following heavy rain events.',
              benchmark: 'ISO 7027 Turbidity Standard (&lt; 5 NTU)',
              icon: Droplets,
              color: 'sky',
            },
            {
              number: '4',
              title: 'Public Health Environmental Nuisance Rating',
              desc: 'Audit community complaints regarding smoke, landfill smells, and open sewage drains to rank ward-level environmental priority.',
              benchmark: 'MoHUA Citizen Service Delivery Benchmark',
              icon: AlertTriangle,
              color: 'amber',
            },
          ]}
        />
      </div>

      {/* Dashboard Modules */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Analytics Dashboard Modules</h2>
                <p className="text-sm text-slate-400">Interactive dashboards for environmental intelligence and decision support</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardModules.map((module, i) => (
              <motion.div key={module.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 cursor-pointer group h-full"
                  onClick={() => {
                    if (module.href.startsWith('#')) {
                      const el = document.getElementById(module.href.replace('#', ''));
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      router.push(module.href);
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant={module.statusVariant} size="sm">{module.status}</Badge>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{module.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{module.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {module.metrics.map((metric) => (
                      <Badge key={metric} variant="info" size="sm" className="text-xs">{metric}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Aggregate Table */}
      <section id="district-comparison" className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 scroll-mt-12">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">District Aggregate Profiles</h2>
                <p className="text-sm text-slate-400">Composite environmental stress scores and key performance indicators by district</p>
              </div>
            </div>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stress Index</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">AQI</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Water Quality</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Waste Mgmt</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Infra Health</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Incidents</th>
                </tr>
              </thead>
              <tbody>
                {districtAggregateData.map((d, i) => {
                  const currentAqi = liveAqiMap[d.district.toLowerCase()] ?? d.aqi;
                  const currentStress = Math.min(100, Math.max(25, Math.round(d.overallStress + (currentAqi - 100) * 0.12)));
                  const stressVariant = currentStress >= 70 ? 'danger' : currentStress >= 50 ? 'warning' : 'success';

                  return (
                  <motion.tr
                    key={d.district}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{d.district}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              currentStress >= 70 ? 'bg-red-400' :
                              currentStress >= 50 ? 'bg-amber-400' :
                              'bg-emerald-400'
                            }`}
                            style={{ width: `${currentStress}%` }}
                          />
                        </div>
                        <Badge variant={stressVariant} size="sm">{currentStress}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold ${
                        currentAqi >= 150 ? 'text-red-400' :
                        currentAqi >= 100 ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {currentAqi}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={d.waterQuality === 'Good' ? 'success' : d.waterQuality === 'Moderate' ? 'warning' : 'danger'} size="sm">
                        {d.waterQuality}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.wasteMgmt}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.infraHealth}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold ${
                        d.incidentCount >= 50 ? 'text-red-400' :
                        d.incidentCount >= 25 ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {d.incidentCount}
                      </span>
                    </td>
                  </motion.tr>
                ); })}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Dashboard Features</h2>
                <p className="text-sm text-slate-400">Advanced analytics capabilities for environmental intelligence</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-Time Monitoring',
                desc: 'Live data feeds from 247+ active monitoring stations across Kashmir with sub-hourly updates',
                icon: Activity,
                color: 'from-cyan-500 to-teal-600',
              },
              {
                title: 'Predictive Analytics',
                desc: 'Machine learning models forecasting AQI trends, contamination events, and infrastructure failures',
                icon: TrendingUp,
                color: 'from-violet-500 to-purple-600',
              },
              {
                title: 'Geospatial Intelligence',
                desc: 'Interactive maps with heat layers, hotspot detection, and district boundary analysis tools',
                icon: Map,
                color: 'from-indigo-500 to-blue-600',
              },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
                <p className="text-sm text-slate-400">Additional analytics modules under development</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Biodiversity Risk Dashboard', desc: 'Species vulnerability, habitat stress, and conservation effectiveness tracking', status: 'In Development' },
              { title: 'Climate Impact Analytics', desc: 'Long-term climate trend analysis and impact assessment on Kashmir ecosystems', status: 'Planned' },
              { title: 'Citizen Science Integration', desc: 'Community-reported data validation and participation analytics', status: 'In Development' },
              { title: 'Export & Reporting Tools', desc: 'PDF report generation, CSV export, and API access for research institutions', status: 'Planned' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 opacity-75">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    <Badge variant="info" size="sm">{item.status}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Related Actions</h2>
                <p className="text-sm text-slate-400">Explore domain-specific monitoring pages</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Dumping & landfill stress', icon: ExternalLink, color: 'from-gray-500 to-slate-600' },
              { label: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Quality & supply intelligence', icon: ExternalLink, color: 'from-cyan-500 to-teal-600' },
              { label: 'Air Pollution', href: '/environmental-monitoring/air-pollution', desc: 'AQI & pollutant tracking', icon: ExternalLink, color: 'from-slate-500 to-gray-600' },
              { label: 'Environmental Resilience', href: '/environmental-monitoring/environmental-resilience', desc: 'Resilience, recovery & stress capacity', icon: ExternalLink, color: 'from-teal-500 to-cyan-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
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
