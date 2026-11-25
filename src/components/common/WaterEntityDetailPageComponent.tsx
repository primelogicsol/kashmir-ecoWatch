'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ScientificPublicationStandard } from '@/components/seo/ScientificPublicationStandard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';
import {
  MapPin, Droplet, Activity, ArrowRight, ChevronRight, TrendingUp,
  AlertTriangle, Book, FileText, Eye, Calendar, Thermometer,
  Wind, Leaf, Shield, Navigation as NavIcon, Ruler, Info,
  BarChart3, CheckCircle, Clock, Fish, Hammer, Mountain, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WaterEntity, WaterQualityData, HydrologicalData, FisheryData, FloodRiskData, RestorationData } from '@/data/water-systems';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

interface WaterEntityDetailPageProps {
  entity: WaterEntity;
  relatedEntities?: WaterEntity[];
  color: string;
  icon: keyof typeof import('lucide-react');
  backRoute: string;
  listRoute: string;
  tabs?: Array<{ id: string; label: string; icon: keyof typeof import('lucide-react'); content: React.ReactNode }>;
}

export function WaterEntityDetailPageComponent({
  entity,
  relatedEntities = [],
  color,
  icon: iconName,
  backRoute,
  listRoute,
  tabs,
}: WaterEntityDetailPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.Droplet;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const getQualityBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'success';
      case 'moderate': return 'warning';
      case 'poor': return 'warning';
      case 'critical': return 'danger';
      case 'data-deficient': return 'info';
      default: return 'default';
    }
  };

  const defaultTabs = [
    { id: 'overview', label: 'Overview', icon: Book, content: <OverviewTab entity={entity} /> },
    ...(entity.waterQuality ? [{ id: 'quality', label: 'Water Quality', icon: Thermometer, content: <WaterQualityTab waterQuality={entity.waterQuality} /> }] : []),
    ...(entity.hydrologicalData ? [{ id: 'hydrology', label: 'Hydrology', icon: BarChart3, content: <HydrologyTab hydrology={entity.hydrologicalData} type={entity.type} /> }] : []),
    ...(entity.fisheryData ? [{ id: 'fishery', label: 'Fisheries', icon: Fish, content: <FisheryTab fishery={entity.fisheryData} /> }] : []),
    ...(entity.floodRiskData ? [{ id: 'flood', label: 'Flood Risk', icon: AlertTriangle, content: <FloodRiskTab floodRisk={entity.floodRiskData} /> }] : []),
    ...(entity.restorationData ? [{ id: 'restoration', label: 'Restoration', icon: Hammer, content: <RestorationTab restoration={entity.restorationData} /> }] : []),
    { id: 'biodiversity', label: 'Biodiversity', icon: Activity, content: <BiodiversityTab biodiversity={entity.biodiversity || []} /> },
    { id: 'threats', label: 'Threats', icon: AlertTriangle, content: <ThreatsTab threats={entity.threats || []} /> },
    { id: 'related', label: 'Related', icon: MapPin, content: <RelatedTab relatedEntities={relatedEntities} color={color} /> },
  ];

  const activeTabs = tabs || defaultTabs;
  const activeTabContent = activeTabs.find(t => t.id === activeTab)?.content;

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-15`} />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href={backRoute} className="hover:text-white transition-colors">
                Water Systems
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={listRoute} className="hover:text-white transition-colors capitalize">
                {listRoute.split('/').pop()?.replace(/-/g, ' ')}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium" aria-current="page">{entity.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-900 ${color} text-white flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="info" size="lg">
                    {entity.category}
                  </Badge>
                  {entity.waterQuality && (
                    <Badge variant={getQualityBadge(entity.waterQuality.status)} size="lg">
                      {entity.waterQuality.status === 'data-deficient'
                        ? "DATA DEFICIENT: GEOTHERMAL SPRING, LAB VALIDATION REQUIRED"
                        : entity.waterQuality.status.toUpperCase()}
                    </Badge>
                  )}
                  {entity.floodRiskData && (
                    <Badge variant={entity.floodRiskData.riskLevel === 'critical' ? 'danger' : entity.floodRiskData.riskLevel === 'high' ? 'warning' : 'info'} size="lg">
                      {entity.floodRiskData.riskLevel.toUpperCase()} RISK
                    </Badge>
                  )}
                </div>
                <div className="mb-2.5 sm:mb-3"><KewBrandIdentity variant="eyebrow" /></div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight max-w-xl">
                  {entity.name}
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 max-w-3xl mb-6 leading-relaxed">
                  {entity.description}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Link href="/atlas">
                    <Button
                      className={`bg-gradient-to-r ${color}`}
                      icon={<MapPin className="w-5 h-5" />}
                    >
                      View on Map
                    </Button>
                  </Link>
                  <a href="#scientific-publication-standard">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white"
                      icon={<FileText className="w-5 h-5" />}
                    >
                      Scientific Assessment &amp; Citation
                    </Button>
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="glass-intense border-white/10 p-6 hidden lg:block">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">District</div>
                      <div className="text-lg font-bold text-white">{entity.district}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Elevation</div>
                      <div className="text-lg font-bold text-white">{entity.elevation}m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplet className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Watershed</div>
                      <div className="text-lg font-bold text-white text-xs">{entity.watershed}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { label: 'Elevation', value: `${entity.elevation}m`, icon: Ruler },
                { label: 'District', value: entity.district.split(' ')[0], icon: MapPin },
                { label: 'pH Level', value: entity.waterQuality?.pH.toFixed(1) || 'N/A', icon: Thermometer },
                { label: 'Dissolved O₂', value: `${entity.waterQuality?.dissolvedOxygen || 'N/A'} mg/L`, icon: Wind },
                { label: 'Quality', value: entity.waterQuality?.status || 'N/A', icon: CheckCircle },
                { label: 'Flood Risk', value: entity.hydrologicalData?.floodRisk || entity.floodRiskData?.riskLevel || 'N/A', icon: AlertTriangle },
                { label: 'Biodiversity', value: entity.biodiversity?.length || 0, icon: Activity },
                { label: 'Threats', value: entity.threats?.length || 0, icon: AlertTriangle },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {activeTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${color} text-white`
                    : 'glass-light border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {activeTabContent}
        </motion.div>

        <ScientificPublicationStandard
          archivalId={`KEW-HYDRO-${entity.slug.toUpperCase()}`}
          title={
            entity.slug === 'sheshnag-lake'
              ? 'Sheshnag Lake: Glacial Origin, Alpine Ecology and Environmental Sensitivity'
              : `${entity.name}: Hydrological, Limnological and Ecological Baseline Assessment`
          }
          disciplines={[
            'Limnology & Hydrology',
            entity.category || 'Aquatic Ecology',
            'Environmental Impact Assessment',
          ]}
          executiveSummary={entity.description}
          keyFindings={[
            `Situated at ${entity.elevation} m elevation within the ${entity.watershed} (${entity.district} District).`,
            ...(entity.waterQuality
              ? [
                  `Water quality baseline classified as "${entity.waterQuality.status}" (pH ${entity.waterQuality.pH}, Dissolved Oxygen ${entity.waterQuality.dissolvedOxygen} mg/L, Turbidity ${entity.waterQuality.turbidity} NTU, last verified ${entity.waterQuality.lastTested || '2026'}).`,
                ]
              : []),
            ...(entity.biodiversity && entity.biodiversity.length > 0
              ? [`Supports documented indicator taxa including ${entity.biodiversity.slice(0, 4).join(', ')}.`]
              : []),
            ...(entity.threats && entity.threats.length > 0
              ? [
                  `Primary anthropogenic & environmental stressors: ${entity.threats
                    .map((t) => t.replace(/-/g, ' '))
                    .join(', ')}.`,
                ]
              : []),
          ]}
          coordinates={
            entity.coordinates
              ? {
                  lat: entity.coordinates.lat,
                  lng: entity.coordinates.lng,
                  elevationM: entity.elevation,
                }
              : undefined
          }
          geographicScope={`${entity.district} District · ${entity.watershed} · Western Himalaya`}
          methodology="Multi-source hydro-ecological synthesis combining ISRO/SAC National Wetland Inventory (NWIA) spatial baselines, Sentinel-2 surface-water optical monitoring, SRTM elevation hydrography, and standard APHA physicochemical water quality parameters."
          dataSources={[
            'SAC/ISRO National Wetland Inventory & Assessment (NWIA) J&K Atlas',
            'Copernicus Sentinel-2 MultiSpectral Instrument (10m–20m optical series)',
            'Regional Pollution Control & Limnological Field Survey Archives',
            'Environment and Service Research Organization (ESRO) Historical Baselines (Est. 2004)',
          ]}
          limitations={
            entity.slug === 'sheshnag-lake'
              ? [
                  'Seasonal snow and lake-ice cover (~6 months/year, November–May) restricts field hydrochemical sampling to summer ablation windows.',
                  'Steep cirque shadow cast and slush-ice margins introduce ±10–20 m shoreline uncertainty in 10 m Sentinel-2 optical composites.',
                  'No direct cosmogenic nuclide (10Be) moraine exposure dating, basal sediment 14C chronology, or multibeam echo-sounder bathymetry has been published; lake age is geomorphologically inferred as Late Quaternary–Holocene and water-quality figures represent compiled regional literature baselines.',
                ]
              : [
                  'High-altitude and seasonal ice-cover intervals constrain winter in-situ grab sampling.',
                  'Optical satellite water-extent metrics carry ±10m shoreline boundary uncertainty in steep mountain cirques.',
                ]
          }
          references={
            entity.slug === 'sheshnag-lake'
              ? [
                  'Rashid, I., & Romshoo, S. A. (2013). Impact of anthropogenic activities on water quality of Lidder River in Kashmir Himalayas. Environmental Monitoring and Assessment, 185(6), 4705–4719. https://doi.org/10.1007/s10661-012-2898-0',
                  'Malik, M. I., & Bhat, M. S. (2014). Integrated approach for prioritizing watersheds for management: A study of Lidder Catchment of Kashmir Himalayas. Environmental Management, 54(6), 1267–1287. https://doi.org/10.1007/s00267-014-0361-4',
                  'Aziz, K., et al. (2024). Parametric Analysis of Lidder Basin Glaciers in Kashmir Himalayas using Multi-Source Data. 2024 IEEE International India Geoscience and Remote Sensing Symposium (InGARSS). https://doi.org/10.1109/ingarss61818.2024.10984064',
                  'Hajam, S. A., Bhat, S. U., & Pandit, A. K. (2008). Water quality analysis of Lidder Nalah in Kashmir Valley. Current World Environment, 3(2), 305–309. https://doi.org/10.12944/cwe.3.2.23',
                  'Space Applications Centre (SAC), ISRO (2010). National Wetland Atlas: Jammu and Kashmir (NWIA High-Altitude Wetland Code 1103). Ministry of Environment & Forests, Govt. of India, Ahmedabad.',
                ]
              : undefined
          }
          evidenceClassification={
            entity.slug === 'sheshnag-lake'
              ? {
                  measuredObservations: [
                    'Geographic centroid verified at 34.0936° N, 75.4967° E (34°05′37″N, 75°29′48″E) at ~3,590 m a.s.l. via NASA/USGS SRTM 30 m DEM and Copernicus Sentinel-2 MSI (10 m optical imagery).',
                    'Morphometry measures ~1.1 km length × ~0.7 km width; SAC/ISRO NWIA Class 1103 maps ~0.59 km² dry-season open-water surface within a ~38 km² upper glacial catchment feeding the East Lidder River.',
                  ],
                  documentedFindings: [
                    'Published Lidder headwater hydrochemistry (Rashid & Romshoo, 2013; Hajam et al., 2008) documents a cold-stenothermal oligotrophic baseline (summer reference values: pH ~7.6, DO ~9.7 mg/L, EC ~58 µS/cm, TDS ~44 mg/L, BOD ~0.9 mg/L).',
                    'Multi-source Lidder Basin glacier inventories (Aziz et al., 2024) document ongoing cryospheric recession across feeding cirque glaciers; Brown Trout (Salmo trutta fario) is documented as an introduced salmonid.',
                  ],
                  scientificInferences: [
                    'Cirque-trough over-deepening and terminal/recessional moraine impoundment indicate a Late Pleistocene (post-LGM) to Early Holocene glacial origin.',
                    'Low ionic buffering (EC < 65 µS/cm) indicates acute sensitivity to seasonal pilgrimage waste and equine nutrient runoff.',
                  ],
                  excludedUnverifiedClaims: [
                    'Exact numerical age claims are excluded because no direct cosmogenic 10Be moraine dating or basal sediment 14C chronology has been published.',
                    'Water-quality parameters are explicitly disclosed as compiled regional literature baselines rather than an unverified single-date laboratory grab sample.',
                  ],
                }
              : undefined
          }
          riskAssessment={
            entity.threats && entity.threats.length > 0
              ? `Requires sustained catchment buffer protection and seasonal monitoring against ${entity.threats
                  .map((t) => t.replace(/-/g, ' '))
                  .join(', ')}.`
              : undefined
          }
          canonicalPath={`${listRoute}/${entity.slug}`}
          datasetApiBasePath={`/api/datasets/water/${entity.slug}`}
          publishedDate={(entity.createdAt || '2026-06-18').split('T')[0]}
          revisedDate={(entity.updatedAt || '2026-11-25').split('T')[0]}
          authors={['KEW Western Himalayan Hydrology & Limnology Desk']}
          atlasHref="/atlas"
        />

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className={`bg-slate-900 ${color} border-0 p-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore More Water Systems</h3>
                <p className="text-white/80">Discover lakes, wetlands, rivers, and springs across Kashmir</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View All Water Bodies
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      
    </main>
  );
}

// Overview Tab
function OverviewTab({ entity }: { entity: WaterEntity }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{entity.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Type</div>
                <div className="text-white font-medium capitalize">{entity.type}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Category</div>
                <div className="text-white font-medium">{entity.category}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">District</div>
                <div className="text-white font-medium">{entity.district}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Watershed</div>
                <div className="text-white font-medium">{entity.watershed || 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Elevation</div>
                <div className="text-white font-medium">{entity.elevation}m</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Area/Length</div>
                <div className="text-white font-medium">
                  {entity.area ? `${entity.area} km²` : entity.length ? `${entity.length} km` : 'N/A'}
                </div>
              </div>
            </div>
          </Card>

          <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
            <h2 className="text-2xl font-bold text-white mb-4">Location</h2>
            <div className="relative h-64 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Interactive map view</p>
                <p className="text-slate-500 text-xs mt-1">
                  {entity.coordinates?.lat.toFixed(4)}, {entity.coordinates?.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {entity.area && (
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="text-sm text-slate-400">Area</span>
                  <span className="text-white font-medium">{entity.area} km²</span>
                </div>
              )}
              {entity.length && (
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="text-sm text-slate-400">Length</span>
                  <span className="text-white font-medium">{entity.length} km</span>
                </div>
              )}
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-sm text-slate-400">Elevation</span>
                <span className="text-white font-medium">{entity.elevation}m</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-sm text-slate-400">Biodiversity</span>
                <span className="text-white font-medium">{entity.biodiversity?.length || 0} species</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-sm text-slate-400">Threats</span>
                <span className="text-white font-medium">{entity.threats?.length || 0} identified</span>
              </div>
            </div>
          </Card>

          <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<FileText className="w-4 h-4" />}>
                View Conservation Report
              </Button>
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Eye className="w-4 h-4" />}>
                View Sightings
              </Button>
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<AlertTriangle className="w-4 h-4" />}>
                Report Issue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Water Quality Tab
function WaterQualityTab({ waterQuality }: { waterQuality: WaterQualityData }) {
  return (
    <div className="space-y-6">
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Water Quality Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'pH Level', value: waterQuality.pH ?? 'N/A', unit: '', status: waterQuality.pH == null ? 'neutral' : (waterQuality.pH >= 6.5 && waterQuality.pH <= 8.5 ? 'good' : 'warning') },
            { label: 'Dissolved Oxygen', value: waterQuality.dissolvedOxygen ?? 'N/A', unit: 'mg/L', status: waterQuality.dissolvedOxygen == null ? 'neutral' : (waterQuality.dissolvedOxygen >= 6 ? 'good' : 'warning') },
            { label: 'Turbidity', value: waterQuality.turbidity ?? 'N/A', unit: 'NTU', status: waterQuality.turbidity == null ? 'neutral' : (waterQuality.turbidity <= 5 ? 'good' : 'warning') },
            { label: 'Conductivity', value: waterQuality.conductivity ?? 'N/A', unit: 'μS/cm', status: 'neutral' },
            { label: 'Temperature', value: waterQuality.temperature ?? 'N/A', unit: '°C', status: 'neutral' },
            { label: 'Nitrates', value: waterQuality.nitrates ?? 'N/A', unit: 'mg/L', status: waterQuality.nitrates == null ? 'neutral' : (waterQuality.nitrates <= 1 ? 'good' : 'warning') },
            { label: 'Phosphates', value: waterQuality.phosphates ?? 'N/A', unit: 'mg/L', status: waterQuality.phosphates == null ? 'neutral' : (waterQuality.phosphates <= 0.1 ? 'good' : 'warning') },
            { label: 'BOD', value: waterQuality.biologicalOxygenDemand ?? 'N/A', unit: 'mg/L', status: waterQuality.biologicalOxygenDemand == null ? 'neutral' : (waterQuality.biologicalOxygenDemand <= 3 ? 'good' : 'warning') },
            { label: 'TDS', value: waterQuality.totalDissolvedSolids ?? 'N/A', unit: 'mg/L', status: 'neutral' },
            { label: 'Fecal Coliform', value: waterQuality.fecalColiform ?? 'N/A', unit: 'CFU/100mL', status: waterQuality.fecalColiform == null ? 'neutral' : (waterQuality.fecalColiform <= 200 ? 'good' : 'warning') },
          ].map((param, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">{param.label}</div>
              <div className="text-2xl font-bold text-white">
                {param.value} <span className="text-sm text-slate-500">{param.unit}</span>
              </div>
              <div className={`text-xs mt-2 capitalize ${
                param.status === 'good' ? 'text-emerald-400' : param.status === 'warning' ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {param.status === 'good' ? 'Within Range' : param.status === 'warning' ? 'Caution' : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-4">Quality Trends</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
            <div className="text-xs text-slate-500 uppercase mb-2">pH Trend</div>
            <div className={`text-lg font-bold ${
              waterQuality.trends?.pH === 'improving' ? 'text-emerald-400' :
              waterQuality.trends?.pH === 'declining' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {waterQuality.trends?.pH?.toUpperCase() || 'STABLE'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
            <div className="text-xs text-slate-500 uppercase mb-2">Oxygen Trend</div>
            <div className={`text-lg font-bold ${
              waterQuality.trends?.dissolvedOxygen === 'improving' ? 'text-emerald-400' :
              waterQuality.trends?.dissolvedOxygen === 'declining' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {waterQuality.trends?.dissolvedOxygen?.toUpperCase() || 'STABLE'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
            <div className="text-xs text-slate-500 uppercase mb-2">Turbidity Trend</div>
            <div className={`text-lg font-bold ${
              waterQuality.trends?.turbidity === 'improving' ? 'text-emerald-400' :
              waterQuality.trends?.turbidity === 'declining' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {waterQuality.trends?.turbidity?.toUpperCase() || 'STABLE'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Hydrology Tab
function HydrologyTab({ hydrology, type }: { hydrology: HydrologicalData; type: string }) {
  return (
    <div className="space-y-6">
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Hydrological Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hydrology.flowRate && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">Flow Rate</div>
              <div className="text-2xl font-bold text-white">{hydrology.flowRate} <span className="text-sm text-slate-500">m³/s</span></div>
            </div>
          )}
          {hydrology.discharge && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">Discharge</div>
              <div className="text-2xl font-bold text-white">{hydrology.discharge} <span className="text-sm text-slate-500">M m³/yr</span></div>
            </div>
          )}
          {hydrology.rechargeRate && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">Recharge Rate</div>
              <div className="text-2xl font-bold text-white">{hydrology.rechargeRate} <span className="text-sm text-slate-500">mm/yr</span></div>
            </div>
          )}
          {hydrology.waterLevel && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">Water Level</div>
              <div className="text-2xl font-bold text-white">{hydrology.waterLevel} <span className="text-sm text-slate-500">m</span></div>
            </div>
          )}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="text-xs text-slate-500 uppercase mb-1">Seasonal Variation</div>
            <div className="text-2xl font-bold text-white capitalize">{hydrology.seasonalVariation}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="text-xs text-slate-500 uppercase mb-1">Water Source</div>
            <div className="text-2xl font-bold text-white capitalize">{hydrology.source}</div>
          </div>
          {hydrology.drainageArea && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">Drainage Area</div>
              <div className="text-2xl font-bold text-white">{hydrology.drainageArea} <span className="text-sm text-slate-500">km²</span></div>
            </div>
          )}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="text-xs text-slate-500 uppercase mb-1">Flood Risk</div>
            <div className={`text-2xl font-bold capitalize ${
              hydrology.floodRisk === 'critical' ? 'text-red-400' :
              hydrology.floodRisk === 'high' ? 'text-orange-400' :
              hydrology.floodRisk === 'moderate' ? 'text-amber-400' : 'text-green-400'
            }`}>
              {hydrology.floodRisk}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Biodiversity Tab
function BiodiversityTab({ biodiversity }: { biodiversity: string[] }) {
  return (
    <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
      <h2 className="text-2xl font-bold text-white mb-6">Biodiversity</h2>
      {biodiversity.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {biodiversity.map((species, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
              </div>
              <Badge variant="info" size="sm">Present</Badge>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No biodiversity data available</p>
      )}
    </Card>
  );
}

// Threats Tab
function ThreatsTab({ threats }: { threats: string[] }) {
  return (
    <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
      <h2 className="text-2xl font-bold text-white mb-6">Threats</h2>
      {threats.length > 0 ? (
        <div className="space-y-4">
          {threats.map((threat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1 capitalize">{threat.replace(/-/g, ' ')}</h3>
                  <p className="text-sm text-slate-400">Environmental threat requiring attention</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No threats identified</p>
      )}
    </Card>
  );
}

// Fishery Tab
function FisheryTab({ fishery }: { fishery: FisheryData }) {
  return (
    <div className="space-y-6">
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Fishery Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm text-slate-500 uppercase mb-2">Fishery Type</div>
            <div className="text-xl font-bold text-white capitalize">{fishery.fisheryType}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 uppercase mb-2">Productivity</div>
            <div className="text-xl font-bold text-white capitalize">{fishery.productivity}</div>
          </div>
          {fishery.fishingSeason && (
            <div>
              <div className="text-sm text-slate-500 uppercase mb-2">Fishing Season</div>
              <div className="text-xl font-bold text-white">{fishery.fishingSeason}</div>
            </div>
          )}
          <div>
            <div className="text-sm text-slate-500 uppercase mb-2">Permits Required</div>
            <div className="text-xl font-bold text-white">{fishery.permits ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-4">Fish Species</h3>
        <div className="flex flex-wrap gap-2">
          {fishery.fishSpecies.map((species, idx) => (
            <Badge key={idx} variant="info" size="lg" className="capitalize">
              {species.replace(/-/g, ' ')}
            </Badge>
          ))}
        </div>

        {fishery.conservationMeasures && fishery.conservationMeasures.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-white mb-4 mt-6">Conservation Measures</h3>
            <div className="flex flex-wrap gap-2">
              {fishery.conservationMeasures.map((measure, idx) => (
                <Badge key={idx} variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400">
                  {measure.replace(/-/g, ' ')}
                </Badge>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// Flood Risk Tab
function FloodRiskTab({ floodRisk }: { floodRisk: FloodRiskData }) {
  return (
    <div className="space-y-6">
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Flood Risk Assessment</h2>
        
        <div className={`p-6 rounded-xl mb-6 ${
          floodRisk.riskLevel === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
          floodRisk.riskLevel === 'high' ? 'bg-orange-500/20 border border-orange-500/30' :
          floodRisk.riskLevel === 'moderate' ? 'bg-amber-500/20 border border-amber-500/30' :
          'bg-green-500/20 border border-green-500/30'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className={`w-8 h-8 ${
              floodRisk.riskLevel === 'critical' ? 'text-red-400' :
              floodRisk.riskLevel === 'high' ? 'text-orange-400' :
              floodRisk.riskLevel === 'moderate' ? 'text-amber-400' : 'text-green-400'
            }`} />
            <div>
              <div className="text-sm text-slate-400 uppercase">Risk Level</div>
              <div className={`text-3xl font-bold capitalize ${
                floodRisk.riskLevel === 'critical' ? 'text-red-400' :
                floodRisk.riskLevel === 'high' ? 'text-orange-400' :
                floodRisk.riskLevel === 'moderate' ? 'text-amber-400' : 'text-green-400'
              }`}>
                {floodRisk.riskLevel}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-400">Flood Type</div>
              <div className="text-white font-semibold capitalize">{floodRisk.floodType.replace(/-/g, ' ')}</div>
            </div>
            {floodRisk.vulnerablePopulation && (
              <div>
                <div className="text-sm text-slate-400">Vulnerable Population</div>
                <div className="text-white font-semibold">{floodRisk.vulnerablePopulation.toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-4">Affected Areas</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {floodRisk.affectedAreas.map((area, idx) => (
            <Badge key={idx} variant="outline" size="sm" className="border-white/20 text-white">
              {area}
            </Badge>
          ))}
        </div>

        {floodRisk.earlyWarningSystem && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-semibold text-white">Early Warning System</div>
                <div className="text-sm text-slate-400">Active monitoring and alert system in place</div>
              </div>
            </div>
          </div>
        )}

        <h3 className="text-lg font-bold text-white mb-4">Mitigation Measures</h3>
        <div className="flex flex-wrap gap-2">
          {floodRisk.mitigationMeasures.map((measure, idx) => (
            <Badge key={idx} variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 capitalize">
              {measure.replace(/-/g, ' ')}
            </Badge>
          ))}
        </div>

        {floodRisk.historicalEvents && floodRisk.historicalEvents.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-white mb-4 mt-6">Historical Flood Events</h3>
            <div className="space-y-3">
              {floodRisk.historicalEvents.map((event, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-white">{event.year}</span>
                    <Badge variant={event.severity === 'catastrophic' || event.severity === 'severe' ? 'danger' : 'warning'} size="sm">
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{event.impact}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// Restoration Tab
function RestorationTab({ restoration }: { restoration: RestorationData }) {
  return (
    <div className="space-y-6">
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Restoration Project</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm text-slate-500 uppercase mb-2">Project Type</div>
            <div className="text-xl font-bold text-white capitalize">{restoration.restorationType.replace(/-/g, ' ')}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 uppercase mb-2">Status</div>
            <Badge variant={restoration.status === 'completed' ? 'success' : restoration.status === 'ongoing' ? 'info' : 'default'} size="lg">
              {restoration.status.toUpperCase()}
            </Badge>
          </div>
          {restoration.startDate && (
            <div>
              <div className="text-sm text-slate-500 uppercase mb-2">Start Date</div>
              <div className="text-xl font-bold text-white">{new Date(restoration.startDate).toLocaleDateString()}</div>
            </div>
          )}
          {restoration.completionDate && (
            <div>
              <div className="text-sm text-slate-500 uppercase mb-2">Completion Date</div>
              <div className="text-xl font-bold text-white">{new Date(restoration.completionDate).toLocaleDateString()}</div>
            </div>
          )}
        </div>

        {restoration.areaTreated && (
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 mb-6">
            <div className="text-sm text-slate-500 uppercase mb-2">Area Treated</div>
            <div className="text-2xl font-bold text-white">{restoration.areaTreated} km²</div>
          </div>
        )}

        <h3 className="text-lg font-bold text-white mb-4">Implementing Agency</h3>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <div className="font-semibold text-white">{restoration.implementingAgency}</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-4">Objectives</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {restoration.objectives.map((obj, idx) => (
            <Badge key={idx} variant="outline" size="sm" className="border-blue-500/30 text-blue-400 capitalize">
              {obj.replace(/-/g, ' ')}
            </Badge>
          ))}
        </div>

        {restoration.outcomes && restoration.outcomes.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-white mb-4">Outcomes</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {restoration.outcomes.map((outcome, idx) => (
                <Badge key={idx} variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 capitalize">
                  {outcome.replace(/-/g, ' ')}
                </Badge>
              ))}
            </div>
          </>
        )}

        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-semibold text-white">Community Involvement</div>
              <div className="text-sm text-slate-400">{restoration.communityInvolvement ? 'Active community participation' : 'No community involvement recorded'}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Related Tab
function RelatedTab({ relatedEntities, color }: { relatedEntities: WaterEntity[]; color: string }) {
  const router = useRouter();
  
  return (
    <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
      <h2 className="text-2xl font-bold text-white mb-6">Related Water Bodies</h2>
      {relatedEntities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedEntities.slice(0, 6).map((related, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-800/50 border border-white/5 cursor-pointer hover:border-white/20 transition-all"
              onClick={() => router.push(`/water-systems/${related.type === 'river' || related.type === 'stream' ? 'rivers' : related.type === 'spring' ? 'springs' : related.type === 'wetland' ? 'wetlands' : 'lakes'}/${related.slug}`)}
            >
              <div className="space-y-2 mb-2">
                  <div className="kew-card-icon-box bg-cyan-500/15 border-cyan-500/30 text-cyan-400">
                    <Droplet className="w-5 h-5 " />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{related.name}</h3>
                </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>{related.district}</span>
                <span>{related.elevation}m</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No related water bodies found</p>
      )}
    </Card>
  );
}
