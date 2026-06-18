'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPopulation(pop: number): string {
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toString();
}

/** Maps DrinkingWaterSource → WaterEntity so WaterEntityListingPage can render it. */
function toWaterEntity(s: typeof drinkingWaterSources[0]): WaterEntity {
  const qualityMap: Record<string, string> = {
    safe: 'excellent',
    'at-risk': 'moderate',
    contaminated: 'critical',
    unknown: 'data-deficient',
  };
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    type: 'spring',
    category: s.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: s.description,
    district: s.district,
    elevation: 0,
    verificationStatus: 'verified',
    createdAt: s.lastUpdated,
    updatedAt: s.lastUpdated,
    waterQuality: {
      pH: 7,
      dissolvedOxygen: 8,
      turbidity: 5,
      status: qualityMap[s.waterQualityStatus] || 'data-deficient',
    } as any,
    conservationStatus: s.status,
    threats: s.challenges,
  } as unknown as WaterEntity;
}

const entities: WaterEntity[] = drinkingWaterSources.map(toWaterEntity);

const categories = Array.from(new Set(drinkingWaterSources.map(s =>
  s.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
))).sort();

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
  const stats = drinkingWaterStats;

  return (
    <WaterEntityListingPage
      title="Western Himalayan Drinking Water Sources"
      description="Comprehensive monitoring and intelligence for Kashmir's drinking water sources — springs, river intakes, groundwater schemes, piped supply, and treatment networks. Sourced from the ESRO/eIEN Kashmir environmental archive."
      icon="Droplets"
      color="from-blue-500 to-cyan-600"
      entities={entities}
      entityType="Water Sources"
      kpis={[
        { label: 'Total Sources',   value: stats.totalSources,                               icon: 'Droplet'        },
        { label: 'Operational',     value: stats.operational,                                icon: 'CheckCircle',   color: 'text-emerald-400' },
        { label: 'Partial',         value: stats.partial,                                    icon: 'Clock',         color: 'text-amber-400'  },
        { label: 'Non-Functional',  value: stats.nonFunctional,                              icon: 'XCircle',       color: 'text-red-400'    },
        { label: 'Under Upgrade',   value: stats.underUpgrade,                               icon: 'Wrench',        color: 'text-blue-400'   },
        { label: 'Safe Quality',    value: stats.safe,                                       icon: 'Shield',        color: 'text-emerald-400' },
        { label: 'At Risk',         value: stats.atRisk,                                     icon: 'AlertTriangle', color: 'text-orange-400' },
        { label: 'Pop. Served',     value: formatPopulation(stats.totalPopulationServed),    icon: 'Users',         color: 'text-purple-400' },
      ]}
      filters={{ categories }}
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
    />
  );
}
