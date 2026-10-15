'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  drinkingWaterSources, drinkingWaterStats,
  waterQualityChallenges, infrastructureData, policyRecommendations,
} from '@/data/drinking-water-sources';
import { WaterEntity } from '@/data/water-systems';
import {
  Droplet, Droplets, CloudRain, Database, Map,
  CheckCircle, XCircle, Clock, Wrench,
  Shield, AlertTriangle, Users, Activity,
  FileText, Beaker, ArrowRight, ExternalLink,
  Sparkles, Eye, Camera, CheckCircle2, Waves
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPopulation(pop: number): string {
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toString();
}

import {
  drinkingWaterEntities,
  toDrinkingWaterEntity,
} from '@/data/drinking-water-sources';

const entities: WaterEntity[] = drinkingWaterEntities;

const categories = Array.from(new Set(drinkingWaterSources.map(s =>
  s.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
))).sort();

const districts = Array.from(new Set(drinkingWaterSources.map(s => s.district))).filter(Boolean).sort();

// ─── Sub-module nav cards ─────────────────────────────────────────────────────

const SUB_PAGES = [
  {
    id: 'water-treatment',
    title: 'Water Treatment Plants',
    description: 'Treatment infrastructure, processes, and capacity across Kashmir',
    icon: Beaker,
    color: 'from-cyan-500 to-blue-600',
    route: '/water-systems/drinking-water-sources/water-treatment',
  },
  {
    id: 'distribution-network',
    title: 'Distribution Network',
    description: 'Pipeline infrastructure, storage, and non-revenue water analysis',
    icon: Droplets,
    color: 'from-indigo-500 to-purple-600',
    route: '/water-systems/drinking-water-sources/distribution-network',
  },
  {
    id: 'water-quality-testing',
    title: 'Water Quality Testing',
    description: 'Testing protocols, parameters, and contamination monitoring',
    icon: Beaker,
    color: 'from-teal-500 to-emerald-600',
    route: '/water-systems/drinking-water-sources/water-quality-testing',
  },
  {
    id: 'rainwater-harvesting',
    title: 'Rainwater Harvesting',
    description: 'Rainwater collection, recharge structures, and groundwater augmentation',
    icon: CloudRain,
    color: 'from-sky-500 to-blue-600',
    route: '/water-systems/drinking-water-sources/rainwater-harvesting',
  },
  {
    id: 'groundwater',
    title: 'Groundwater Intelligence',
    description: 'Aquifer mapping, water table monitoring, and tube well networks',
    icon: Database,
    color: 'from-amber-500 to-orange-600',
    route: '/water-systems/drinking-water-sources/groundwater',
  },
  {
    id: 'piped-water-supply',
    title: 'Piped Water Supply',
    description: 'PHED network coverage, supply monitoring, and service levels',
    icon: Droplets,
    color: 'from-green-500 to-emerald-600',
    route: '/water-systems/drinking-water-sources/piped-water-supply',
  },
];

const severityColors: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  High:     'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Medium:   'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low:      'text-green-400 bg-green-500/10 border-green-500/20',
};

// ─── Additional content rendered below the entity grid ───────────────────────

function AdditionalContent() {
  return (
    <>
      {/* Sub-module navigation */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          Drinking Water Sub-Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUB_PAGES.map((page, i) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={page.route} className="block h-full">
                <Card className="glass-intense border-white/10 p-5 h-full hover:border-white/20 transition-all group cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center flex-shrink-0`}>
                      <page.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{page.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{page.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300 transition-colors">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Water Quality Challenges */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Critical Water Quality Challenges
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Documented in the ESRO Environmental Impact Assessment Report for Jammu &amp; Kashmir
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {waterQualityChallenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">{challenge.title}</h3>
                    <Badge className={`${severityColors[challenge.severity]} border text-xs`}>
                      {challenge.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="text-slate-500">Affected: </span>
                      <span className="text-slate-300">{challenge.affectedSources}</span>
                    </div>
                    <div className="text-xs text-blue-400/70 italic border-l-2 border-blue-500/20 pl-2">
                      Source: {challenge.esroSource}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" />
          Drinking Water Infrastructure
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Current state of water treatment, distribution, and storage infrastructure
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Water Treatment Plants',
              icon: Beaker,
              description: infrastructureData.treatmentPlants.description,
              data: [
                { label: 'Total Plants',    value: infrastructureData.treatmentPlants.total.toString() },
                { label: 'Functional',      value: infrastructureData.treatmentPlants.functional.toString(),  color: 'text-emerald-400' },
                { label: 'Need Upgrade',    value: infrastructureData.treatmentPlants.needsUpgrade.toString(), color: 'text-amber-400' },
                { label: 'Non-Functional',  value: infrastructureData.treatmentPlants.nonFunctional.toString(), color: 'text-red-400' },
              ],
            },
            {
              title: 'Distribution Network',
              icon: Droplets,
              description: infrastructureData.distributionNetwork.description,
              data: [
                { label: 'Total Pipeline', value: `${infrastructureData.distributionNetwork.totalPipelineKm} km` },
                { label: 'Aging Pipeline', value: `${infrastructureData.distributionNetwork.agingPipelineKm} km`, color: 'text-amber-400' },
                { label: 'Leakage Rate',   value: infrastructureData.distributionNetwork.leakageRate,            color: 'text-red-400' },
              ],
            },
            {
              title: 'Storage Facilities',
              icon: Database,
              description: infrastructureData.storageFacilities.description,
              data: [
                { label: 'Total ESRs',     value: infrastructureData.storageFacilities.totalESRs.toString() },
                { label: 'Total Capacity', value: `${infrastructureData.storageFacilities.totalCapacityMld} MLD` },
              ],
            },
          ].map(({ title, icon: Icon, data, description }) => (
            <Card key={title} className="glass-intense border-white/10 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
              </div>
              <div className="space-y-3 mb-4">
                {data.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <span className={`text-sm font-bold ${item.color || 'text-white'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Policy Recommendations */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-400" />
            Policy Recommendations
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Priority actions based on ESRO environmental assessment findings
          </p>
          <div className="space-y-4">
            {policyRecommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'Critical' ? 'bg-red-500/20' :
                      rec.priority === 'High'     ? 'bg-orange-500/20' : 'bg-amber-500/20'
                    }`}>
                      <span className={`text-sm font-bold ${
                        rec.priority === 'Critical' ? 'text-red-400' :
                        rec.priority === 'High'     ? 'text-orange-400' : 'text-amber-400'
                      }`}>{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{rec.action}</h3>
                        <Badge className={`${severityColors[rec.priority]} border text-[10px]`}>{rec.priority}</Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">{rec.timeline}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">{rec.description}</p>
                      <p className="text-xs text-blue-400/60 italic">ESRO Basis: {rec.esroBasis}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DrinkingWaterSourcesPage() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'spring' | 'river' | 'groundwater' | 'operational' | 'safe' | 'atrisk'>('all');
  const [activeInsight, setActiveInsight] = React.useState<'intakes' | 'standards' | 'network' | 'observe'>('intakes');

  const stats = React.useMemo(() => ({
    totalSources: drinkingWaterSources.length,
    operational: drinkingWaterSources.filter(s => s.status === 'operational').length,
    partial: drinkingWaterSources.filter(s => s.status === 'partial').length,
    nonFunctional: drinkingWaterSources.filter(s => s.status === 'non-functional').length,
    underUpgrade: drinkingWaterSources.filter(s => s.status === 'under-upgrade').length,
    safe: drinkingWaterSources.filter(s => s.waterQualityStatus === 'safe').length,
    atRisk: drinkingWaterSources.filter(s => s.waterQualityStatus === 'at-risk').length,
    contaminated: drinkingWaterSources.filter(s => s.waterQualityStatus === 'contaminated').length,
    totalPopulationServed: drinkingWaterSources.reduce((sum, s) => sum + (s.populationServed || 0), 0),
  }), []);

  const displayedEntities = React.useMemo(() => {
    switch (activeTab) {
      case 'spring':
        return entities.filter(e => e.category.toLowerCase().includes('spring'));
      case 'river':
        return entities.filter(e => e.category.toLowerCase().includes('river') || e.category.toLowerCase().includes('stream') || e.category.toLowerCase().includes('surface'));
      case 'groundwater':
        return entities.filter(e => e.category.toLowerCase().includes('groundwater') || e.category.toLowerCase().includes('tube') || e.category.toLowerCase().includes('well'));
      case 'operational':
        return entities.filter(e => {
          const src = drinkingWaterSources.find(s => s.id === e.id);
          return src?.status === 'operational';
        });
      case 'safe':
        return entities.filter(e => {
          const src = drinkingWaterSources.find(s => s.id === e.id);
          return src?.waterQualityStatus === 'safe';
        });
      case 'atrisk':
        return entities.filter(e => {
          const src = drinkingWaterSources.find(s => s.id === e.id);
          return src?.waterQualityStatus === 'at-risk' || src?.waterQualityStatus === 'contaminated';
        });
      case 'all':
      default:
        return entities;
    }
  }, [activeTab]);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Drinking Water Sources"
      description="Authoritative directory of drinking water sources, treatment plants, gravity supply networks, sub-surface infiltration galleries, and community wellheads across Jammu & Kashmir, Ladakh, AJK, and Gilgit-Baltistan."
      icon="Droplets"
      color="from-blue-500 to-cyan-600"
      entities={displayedEntities}
      entityType="Water Sources"
      kpis={[
        { label: 'Total Sources',   value: stats.totalSources,                               icon: 'Droplet',       color: 'text-blue-400'    },
        { label: 'Operational',     value: stats.operational,                                icon: 'CheckCircle',   color: 'text-emerald-400' },
        { label: 'Partial Supply',  value: stats.partial,                                    icon: 'Clock',         color: 'text-amber-400'   },
        { label: 'Non-Functional',  value: stats.nonFunctional,                              icon: 'XCircle',       color: 'text-red-400'     },
        { label: 'Under Upgrade',   value: stats.underUpgrade,                               icon: 'Wrench',        color: 'text-sky-400'     },
        { label: 'Safe Quality',    value: stats.safe,                                       icon: 'Shield',        color: 'text-teal-400'    },
        { label: 'At Risk',         value: stats.atRisk,                                     icon: 'AlertTriangle', color: 'text-orange-400'  },
        { label: 'Contaminated',    value: stats.contaminated,                               icon: 'Activity',      color: 'text-rose-400'    },
        { label: 'Pop. Served',     value: formatPopulation(stats.totalPopulationServed),    icon: 'Users',         color: 'text-purple-400'  },
        { label: 'Districts Mapped',value: districts.length,                                 icon: 'MapPin'                                    },
      ]}
      filters={{
        categories,
        districts,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={e => `/water-systems/drinking-water-sources/${e.slug}`}
      getCategory={e => e.category}
      getSecondaryMetric={e => {
        const src = drinkingWaterSources.find(s => s.id === e.id);
        if (!src) return null;
        return src.populationServed
          ? { label: 'Pop. Served', value: formatPopulation(src.populationServed) }
          : null;
      }}
      renderAdditionalInfo={e => {
        const src = drinkingWaterSources.find(s => s.id === e.id);
        if (!src) return null;
        const statusColor: Record<string, string> = {
          operational:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
          partial:        'text-amber-400 bg-amber-500/10 border-amber-500/30',
          'non-functional': 'text-red-400 bg-red-500/10 border-red-500/30',
          'under-upgrade':  'text-blue-400 bg-blue-500/10 border-blue-500/30',
        };
        return (
          <Badge className={`${statusColor[src.status] || ''} border text-[10px]`}>
            {src.status.replace(/-/g, ' ')}
          </Badge>
        );
      }}
      renderAdditionalContent={() => <AdditionalContent />}
    >
      {/* ── Focus Categories Filter Bar ───────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-cyan-400" />
              Drinking Water Supply Typologies &amp; Schemes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter public water sources by raw intake typology, operational functionality, or potability safety.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-cyan-400">{displayedEntities.length}</strong> of {entities.length} sources
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Sources ({entities.length})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'spring' ? 'default' : 'outline'}
            onClick={() => setActiveTab('spring')}
            className={activeTab === 'spring' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <Droplet className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Natural Springs
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'river' ? 'default' : 'outline'}
            onClick={() => setActiveTab('river')}
            className={activeTab === 'river' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Surface River Intakes
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'groundwater' ? 'default' : 'outline'}
            onClick={() => setActiveTab('groundwater')}
            className={activeTab === 'groundwater' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <Database className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Groundwater Schemes
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'operational' ? 'default' : 'outline'}
            onClick={() => setActiveTab('operational')}
            className={activeTab === 'operational' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Fully Operational ({stats.operational})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'safe' ? 'default' : 'outline'}
            onClick={() => setActiveTab('safe')}
            className={activeTab === 'safe' ? 'bg-green-600 hover:bg-green-500 text-white font-medium shadow-lg shadow-green-950/40' : 'border-white/10 text-green-300 hover:text-white'}
          >
            <Shield className="w-3.5 h-3.5 mr-1 text-green-300" />
            Potable Safe ({stats.safe})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'atrisk' ? 'default' : 'outline'}
            onClick={() => setActiveTab('atrisk')}
            className={activeTab === 'atrisk' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-300" />
            At-Risk / Stressed ({stats.atRisk + stats.contaminated})
          </Button>
        </div>
      </div>

      {/* ── Drinking Water Intelligence & Field Observation Spotlight ──────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Drinking Water Potability &amp; Surveillance Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Major municipal treatment plants, BIS 10500 standards, distribution leakages, and citizen tap water monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('intakes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'intakes'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Major Treatment Plants
            </button>
            <button
              onClick={() => setActiveInsight('standards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'standards'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BIS 10500 Standards
            </button>
            <button
              onClick={() => setActiveInsight('network')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'network'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Distribution Networks
            </button>
            <button
              onClick={() => setActiveInsight('observe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeInsight === 'observe'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Eye className="w-3 h-3" />
              Observe Here (Tap Water Watch)
            </button>
          </div>
        </div>

        <motion.div layout className="space-y-4">
          {activeInsight === 'intakes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Apex Gravity Supply</span>
                <h5 className="text-sm font-semibold text-white mb-2">Rangil Water Treatment Plant</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Sourced directly from Sindh River via high-elevation canal, delivering pristine snowmelt water (45 MGD) to downtown Srinagar with ultra-low raw turbidity.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">Capacity: 45 MGD (Rapid Sand Filtration)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Heritage Urban Supply</span>
                <h5 className="text-sm font-semibold text-white mb-2">Nishat &amp; Harwan Waterworks</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Century-old intake fed by Dachigam mountain catchments and Marsar overflow, supplying civil lines and medical institutes in Srinagar.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">Status: Upgraded with SCADA Chlorination</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">South Basin Treatment</span>
                <h5 className="text-sm font-semibold text-white mb-2">Doodh Ganga &amp; Sukhnag Plants</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Provides potable water for uptown Srinagar and Budgam towns, challenged during autumn low flows by riverbed sand mining turbidity.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">Priority: Silt Trap Pre-Settling Upgrades</div>
              </div>
            </div>
          )}

          {activeInsight === 'standards' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Turbidity</span>
                <h5 className="text-sm font-semibold text-white mb-2">&lt; 1.0 NTU</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Permissible limit under BIS 10500. Turbidity above 5 NTU impedes chlorine disinfection and protects pathogens from ultraviolet light.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Free Residual Chlorine</span>
                <h5 className="text-sm font-semibold text-white mb-2">0.2 – 0.5 mg/L</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Required at consumer tap end to ensure residual bactericidal protection against pipeline cross-contamination and sewage ingress.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">E. coli / Coliforms</span>
                <h5 className="text-sm font-semibold text-white mb-2">0 per 100 mL</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero tolerance in treated potable supplies. Any detection mandates immediate boil-water notices and network super-chlorination.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Total Dissolved Solids</span>
                <h5 className="text-sm font-semibold text-white mb-2">&lt; 500 mg/L</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Acceptable palatability threshold. Kashmiri mountain surface waters typically range between 90–220 ppm TDS.
                </p>
              </div>
            </div>
          )}

          {activeInsight === 'network' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Aging Galvanized Pipelines</span>
                <h5 className="text-sm font-semibold text-white mb-2">Non-Revenue Water (38% Leakage)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Decades-old galvanized iron and cast-iron distribution pipes suffer internal encrustation, tuberculation, and joint leaks, allowing suction of trench wastewater during pressure drops.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Winter Freeze-Thaw Vulnerability</span>
                <h5 className="text-sm font-semibold text-white mb-2">Sub-Zero Pipe Ruptures</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  During Chillai Kalan (-8°C), un-insulated shallow-buried pipes freeze and burst, leaving thousands of households reliant on tanker deliveries and open spring ice holes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">JJM Village Piped Supply</span>
                <h5 className="text-sm font-semibold text-white mb-2">Jal Jeevan Mission Rollout</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Modernizing rural hamlets with high-density polyethylene (HDPE) lines connected directly to spring catchment chambers with solar-powered UV disinfection.
                </p>
              </div>
            </div>
          )}

          {activeInsight === 'observe' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/60 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Consumer Tap Water &amp; Supply Watch Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-cyan-500/40 text-cyan-300">
                        Potable Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit tap water test strip results, report sewage-contaminated tap water, pipeline burst road washouts, or supply cuts.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Tap Water Test
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Contaminated Tap
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                      Water Quality Logs
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <Beaker className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. DPD Chlorine Colorimetric Test</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Dissolve a DPD-1 tablet in a 10 mL tap sample. Compare magenta pink intensity against color disk. Faint pink confirms safe residual disinfection (0.2–0.5 ppm).
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-cyan-300/80 font-mono">
                    Protocol: DPD Free Chlorine Colorimetry
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Sewage Odor &amp; Turbidity</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Immediately report brown-tinted or sulphurous sewage-smelling tap water. Signals cross-contamination with broken road storm drains during supply depressurization.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Emergency: Cross-Connection Alert
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Droplets className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Main Pipeline Leakage Alert</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Document clean water spurting through pavement cracks or creating roadside waterlogging. Leaks waste millions of liters and erode macadam foundations.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Action: Jal Shakti Leakage Work Order
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <Clock className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Daily Supply Hours Log</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Record actual morning and evening supply pressure hours in your neighborhood. Helps document unserved tail-end habitations experiencing persistent water poverty.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Equity: Piped Water Reliability Index
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </WaterEntityListingPage>
  );
}
