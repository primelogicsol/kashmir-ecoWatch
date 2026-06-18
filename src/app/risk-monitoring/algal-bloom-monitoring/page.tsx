'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import {
  Waves, ArrowRight, Map, AlertTriangle, Activity, Droplets,
  TrendingUp, Filter, Layers, Eye, Leaf, Flower2, MapPin, Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { algalBloomData, getDistrictSummaries } from '@/data/algal-bloom';

const bloomFactors = [
  { factor: 'Nutrient Loading', contribution: '40%', description: 'Nitrogen and phosphorus from sewage and agriculture' },
  { factor: 'Water Temperature', contribution: '25%', description: 'Warmer waters accelerate algal growth' },
  { factor: 'Stagnant Conditions', contribution: '20%', description: 'Low water circulation in lakes' },
  { factor: 'Sunlight Exposure', contribution: '10%', description: 'Extended photoperiod in summer' },
  { factor: 'pH Changes', contribution: '5%', description: 'Alkaline conditions favor cyanobacteria' },
];

const seasonalRisk = [
  { season: 'Spring (Mar-May)', risk: 'Moderate', description: 'Warming begins, nutrient runoff from agriculture' },
  { season: 'Summer (Jun-Aug)', risk: 'Critical', description: 'Peak temperatures, optimal bloom conditions' },
  { season: 'Autumn (Sep-Nov)', risk: 'Moderate-High', description: 'Residual blooms, cooling begins' },
  { season: 'Winter (Dec-Feb)', risk: 'Low', description: 'Cold temperatures suppress algal growth' },
];

export default function AlgalBloomMonitoringPage() {
  const router = useRouter();
  
  const districtSummary = getDistrictSummaries();

  // Group by contributing watershed for Watershed Intelligence
  const watershedSummaries = React.useMemo(() => {
    const map: Record<string, {
      name: string;
      waterbodies: string[];
      pressure: 'Low' | 'Moderate' | 'Severe';
      inflows: Set<string>;
      criticalCount: number;
    }> = {};

    algalBloomData.forEach(r => {
      const wName = r.contributingWatershed;
      if (!map[wName]) {
        map[wName] = {
          name: wName,
          waterbodies: [],
          pressure: 'Low',
          inflows: new Set(),
          criticalCount: 0
        };
      }
      map[wName].waterbodies.push(r.waterbodyName);
      r.topInflowChannels.forEach(ch => map[wName].inflows.add(ch));
      if (r.riskLevel === 'Critical' || r.riskLevel === 'High') {
        map[wName].criticalCount++;
      }
      if (r.runoffPressureScore === 'Severe') {
        map[wName].pressure = 'Severe';
      } else if (r.runoffPressureScore === 'Moderate' && map[wName].pressure !== 'Severe') {
        map[wName].pressure = 'Moderate';
      }
    });

    return Object.values(map);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <Heading
        breadcrumbs={[{ label: 'Risk & Monitoring', href: '/risk-monitoring' }, { label: 'Pollution & Stress', href: '/risk-monitoring/pollution-stress' }, { label: 'Algal Bloom Monitoring' }]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Algal Bloom Risk & Monitoring</span>
          </>}
        subtitle="Eutrophication-prone lake and wetland monitoring for Kashmir's freshwater systems, linking bloom risk, cyanobacteria indicators, nutrient loading, oxygen stress, seasonal bloom windows, satellite signals, and field water-quality evidence."
        icon={<Waves className="w-6 h-6 text-emerald-400" />}
        label="Bloom Intelligence"
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl"
              onClick={() => router.push('/risk-monitoring/dashboards')}
            >
              <Activity className="w-5 h-5 mr-2" />
              View Bloom Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/risk-monitoring/pollution-stress')}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Back to Pollution & Stress
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/risk-monitoring')}
            >
              Overview
            </Button>
          </div>
        }
      />

      {/* Metrics Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-2">23</div>
              <div className="text-sm text-slate-400 mb-1">Priority Waterbodies</div>
              <div className="text-xs text-slate-500">Lakes & Wetlands</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">4</div>
              <div className="text-sm text-slate-400 mb-1">High-Alert Bloom Sites</div>
              <div className="text-xs text-red-400">Needs Verification</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">8</div>
              <div className="text-sm text-slate-400 mb-1">Eutrophication-Risk Sites</div>
              <div className="text-xs text-amber-400">Nutrient Sensitive</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">55%</div>
              <div className="text-sm text-slate-400 mb-1">Max Estimated Coverage</div>
              <div className="text-xs text-red-400">Satellite Extrapolated</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">Ready</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Status</div>
              <div className="text-xs text-emerald-400">Satellite + Field Validation</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Row */}
      <section className="py-8 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              <Filter className="w-3 h-3 mr-2" />
              All Status
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Active
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Developing
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Monitoring
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Low Risk
            </Badge>
          </div>
        </div>
      </section>

      {/* District Bloom Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Bloom Summary</h2>
            <p className="text-slate-400">Algal bloom activity and risk by district</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtSummary.map((item, index) => (
              <motion.div
                key={item.district}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.district}</h3>
                      <div className="text-xs text-slate-500">{item.waterbodies} waterbodies</div>
                    </div>
                    <Badge
                      variant={item.avgSeverity === 'Critical' ? 'danger' : 
                               item.avgSeverity === 'High' ? 'warning' : 'success'}
                      size="sm"
                    >
                      {item.avgSeverity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'worsening' ? 'text-red-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      item.trend === 'worsening' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {item.trend === 'worsening' ? 'Worsening' : 'Stable'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.activeBlooms} active blooms
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Bloom Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Bloom Records</h2>
            <p className="text-slate-400">Latest algal bloom monitoring data from Kashmir waterbodies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algalBloomData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">{record.waterbodyName}</h3>
                        <div className="text-xs text-slate-500 mt-0.5">{record.district}</div>
                      </div>
                      <Badge
                        variant={
                          record.riskLevel === 'Critical' ? 'danger' :
                          record.riskLevel === 'High' ? 'warning' :
                          record.riskLevel === 'Moderate' ? 'info' : 'success'
                        }
                        size="sm"
                      >
                        {record.riskLevel}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400 mb-3">{record.bloomStatus}</div>
                    
                    <div className="space-y-1.5 border-t border-white/5 pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Coverage</span>
                        <span className="text-emerald-400 font-medium">{record.surfaceCoveragePercent ? `${record.surfaceCoveragePercent}%` : 'TBD'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Dominant</span>
                        <span className="text-white truncate max-w-[140px] text-right" title={record.dominantTaxa}>{record.dominantTaxa}</span>
                      </div>
                      
                      {/* Watershed context */}
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Catchment</span>
                        <span className="text-slate-300 truncate max-w-[140px] text-right" title={record.contributingWatershed}>{record.contributingWatershed}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Runoff Pressure</span>
                        <span className={`font-semibold ${
                          record.runoffPressureScore === 'Severe' ? 'text-red-400' :
                          record.runoffPressureScore === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>{record.runoffPressureScore}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Top Inflows</span>
                        <span className="text-emerald-300 truncate max-w-[140px] text-right" title={record.topInflowChannels.join(', ')}>
                          {record.topInflowChannels.join(', ') || 'Springs'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs mt-3 pt-2 border-t border-white/5 text-slate-500">
                    <span>Evidence</span>
                    <span className="text-slate-400 truncate max-w-[140px] text-right" title={record.primaryEvidence}>{record.primaryEvidence || 'Literature-supported'}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Watershed Upstream Intelligence Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                Upstream Intelligence
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Contributing Watersheds & Runoff Pressure</h2>
            <p className="text-slate-400">
              Algal blooms are symptoms; watersheds are the cause. Upstream catchment runoff, agricultural discharge, 
              and inflow channels carry the nutrient loads that fuel lake and wetland eutrophication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watershedSummaries.map((w, index) => (
              <motion.div
                key={w.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 flex flex-col h-full hover:border-emerald-500/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 leading-snug">{w.name}</h3>
                      <p className="text-xs text-slate-500">
                        {w.waterbodies.length} connected {w.waterbodies.length === 1 ? 'waterbody' : 'waterbodies'}
                      </p>
                    </div>
                    <Badge
                      variant={
                        w.pressure === 'Severe' ? 'danger' :
                        w.pressure === 'Moderate' ? 'warning' : 'success'
                      }
                      size="sm"
                    >
                      {w.pressure} Pressure
                    </Badge>
                  </div>

                  <div className="space-y-3 flex-grow">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Monitored Lakes & Wetlands</div>
                      <div className="flex flex-wrap gap-1.5">
                        {w.waterbodies.map(wb => (
                          <Badge key={wb} variant="outline" className="border-white/5 bg-white/5 text-slate-300 text-[10px]">
                            {wb}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Top Inflow & Point Channels</div>
                      <p className="text-xs text-emerald-300/90 leading-relaxed font-medium">
                        {Array.from(w.inflows).join(', ') || 'Subsurface inflows / springs'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                    <span>Eutrophication Risk</span>
                    <span className={w.criticalCount > 0 ? 'text-red-400 font-semibold' : 'text-slate-400'}>
                      {w.criticalCount} High/Critical Sites
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloom Factors */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Bloom Formation Factors</h2>
            <p className="text-slate-400">Primary drivers of algal bloom development in Kashmir lakes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bloomFactors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-xs font-bold text-white mb-2">{factor.factor}</h3>
                  <div className="text-2xl font-bold text-emerald-400 mb-2">{factor.contribution}</div>
                  <p className="text-xs text-slate-400">{factor.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Risk Pattern */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Seasonal Bloom Risk Pattern</h2>
            <p className="text-slate-400">Algal bloom risk variation across seasons in Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalRisk.map((item, index) => (
              <motion.div
                key={item.season}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{item.season}</h3>
                  <p className="text-xs text-slate-400 mb-3">{item.description}</p>
                  <Badge
                    variant={
                      item.risk === 'Critical' ? 'danger' :
                      item.risk === 'High' ? 'warning' :
                      item.risk === 'Moderate-High' ? 'warning' :
                      item.risk === 'Moderate' ? 'info' : 'success'
                    }
                    size="sm"
                  >
                    {item.risk}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Panel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Algal Bloom Map Preview</h2>
                  <p className="text-sm text-slate-400">Waterbody bloom status, coverage, and risk layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-emerald-900/50 to-green-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive bloom monitoring map with satellite imagery overlay</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-600"
                    onClick={() => router.push('/risk-monitoring/dashboards')}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Open Full Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Cross-Link Card: Seasonal Ecology - Floral Bloom */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Link href="/seasonal-ecology/bloom-mapping">
            <Card className="glass-intense border-pink-500/30 hover:border-pink-500/50 transition-all cursor-pointer group overflow-hidden">
              <div className="relative p-6 md:p-8">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-slate-900/50" />
                <div className="absolute inset-0 bg-slate-900/50" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl">
                      <Flower2 className="w-5 h-5 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="border-pink-500/50 text-pink-400">
                        Related Intelligence
                      </Badge>
                      <Badge variant="success" size="sm">
                        Seasonal Ecology
                      </Badge>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      Explore Floral Bloom Zones & Flowering Landscapes
                    </h3>
                    <p className="text-slate-300 mb-4 max-w-3xl">
                      While algal blooms indicate water stress, floral blooms represent Kashmir's seasonal 
                      phenology and flowering cycles. Explore orchard bloom belts, alpine meadow flowering, 
                      medicinal plant zones, and pollinator-linked bloom timing across Kashmir's diverse ecosystems.
                    </p>
                    <div className="flex items-center gap-2 text-pink-400 font-medium">
                      <span>View Floral Bloom Mapping</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex flex-shrink-0 items-center">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/30 transition-all">
                      <ArrowRight className="w-6 h-6 text-pink-400" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Related Intelligence */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence</h2>
            <p className="text-slate-400">Cross-linked water quality and ecological monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/seasonal-ecology')}
            >
              <Leaf className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Seasonal Ecology
              </h3>
              <p className="text-xs text-slate-400">
                Seasonal drivers, lake seasonality, ecological timing
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <Droplets className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Eutrophication and nutrient loading linkage
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/fish-kill-monitoring')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Fish Kill Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Bloom-linked fish mortality events
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems')}
            >
              <Waves className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Systems
              </h3>
              <p className="text-xs text-slate-400">
                Comprehensive waterbody database
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
