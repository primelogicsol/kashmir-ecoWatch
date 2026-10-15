'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, TrendingUp, Award, AlertTriangle, Leaf, Droplet,
  ArrowRight, Shield, Activity, ChevronDown, ChevronUp, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DistrictScorecard {
  name: string;
  slug: string;
  ecologicalScore: number;
  riskLevel: 'Low' | 'Low-Moderate' | 'Moderate' | 'Moderate-High' | 'High';
  wetlands: number;
  protectedAreas: number;
  speciesCount: number;
  trend: 'improving' | 'stable' | 'declining';
  strength: string;
  challenge: string;
  route: string;
  forestCoverPct: number;
}

// Authoritative empirical baseline synthesized from KEW ecological registry
// (wetlandsData, protected-network, masterForestDatabase, and species distribution records)
const KASHMIR_VALLEY_DISTRICTS: DistrictScorecard[] = [
  {
    name: 'Kupwara',
    slug: 'kupwara',
    ecologicalScore: 83,
    riskLevel: 'Low',
    wetlands: 2,
    protectedAreas: 2,
    speciesCount: 534,
    trend: 'stable',
    strength: 'Dense Forest Cover (43.3%)',
    challenge: 'Remote Border Corridor Access',
    route: '/biodiversity/district/kupwara',
    forestCoverPct: 43.3,
  },
  {
    name: 'Ganderbal',
    slug: 'ganderbal',
    ecologicalScore: 82,
    riskLevel: 'Low-Moderate',
    wetlands: 1,
    protectedAreas: 3,
    speciesCount: 489,
    trend: 'stable',
    strength: 'Highest Forest Cover (59%) & Alpine Lakes',
    challenge: 'Sind Basin Tourism Waste',
    route: '/biodiversity/district/ganderbal',
    forestCoverPct: 59.0,
  },
  {
    name: 'Anantnag',
    slug: 'anantnag',
    ecologicalScore: 80,
    riskLevel: 'Moderate',
    wetlands: 2,
    protectedAreas: 4,
    speciesCount: 734,
    trend: 'stable',
    strength: 'Overa-Aru Sanctuary & Lidder Catchment',
    challenge: 'Human-Wildlife Conflict Pressure',
    route: '/biodiversity/district/anantnag',
    forestCoverPct: 27.0,
  },
  {
    name: 'Baramulla',
    slug: 'baramulla',
    ecologicalScore: 76,
    riskLevel: 'Moderate',
    wetlands: 5,
    protectedAreas: 6,
    speciesCount: 676,
    trend: 'improving',
    strength: 'Wular Ramsar Wetland Ecosystem',
    challenge: 'Agricultural Runoff & Silt Influx',
    route: '/biodiversity/district/baramulla',
    forestCoverPct: 28.0,
  },
  {
    name: 'Bandipora',
    slug: 'bandipora',
    ecologicalScore: 75,
    riskLevel: 'Moderate',
    wetlands: 5,
    protectedAreas: 3,
    speciesCount: 599,
    trend: 'improving',
    strength: 'Wular Shoreline & Gurez Alpine Meadow',
    challenge: 'Watershed Siltation & Encroachment',
    route: '/biodiversity/district/bandipora',
    forestCoverPct: 31.0,
  },
  {
    name: 'Kulgam',
    slug: 'kulgam',
    ecologicalScore: 74,
    riskLevel: 'Moderate',
    wetlands: 1,
    protectedAreas: 2,
    speciesCount: 549,
    trend: 'stable',
    strength: 'Veshav River Catchment & Aharbal Forest',
    challenge: 'Riverbed Quarrying & Flash Floods',
    route: '/biodiversity/district/kulgam',
    forestCoverPct: 43.0,
  },
  {
    name: 'Budgam',
    slug: 'budgam',
    ecologicalScore: 73,
    riskLevel: 'Moderate',
    wetlands: 2,
    protectedAreas: 3,
    speciesCount: 563,
    trend: 'stable',
    strength: 'Hokersar Wetland & Tosamaidan Pastures',
    challenge: 'Brick Kiln Emissions & Karewa Levelling',
    route: '/biodiversity/district/budgam',
    forestCoverPct: 23.0,
  },
  {
    name: 'Srinagar',
    slug: 'srinagar',
    ecologicalScore: 72,
    riskLevel: 'Moderate-High',
    wetlands: 3,
    protectedAreas: 6,
    speciesCount: 892,
    trend: 'declining',
    strength: 'Highest Species (892) & Dachigam NP',
    challenge: 'Dal Lake Urban Pressure & Eutrophication',
    route: '/biodiversity/district/srinagar',
    forestCoverPct: 21.0,
  },
  {
    name: 'Shopian',
    slug: 'shopian',
    ecologicalScore: 71,
    riskLevel: 'Moderate',
    wetlands: 1,
    protectedAreas: 1,
    speciesCount: 444,
    trend: 'stable',
    strength: 'Pir Panjal Coniferous Belt (34%)',
    challenge: 'Intensive Orchard Chemical Runoff',
    route: '/biodiversity/district/shopian',
    forestCoverPct: 34.0,
  },
  {
    name: 'Pulwama',
    slug: 'pulwama',
    ecologicalScore: 69,
    riskLevel: 'Moderate-High',
    wetlands: 7,
    protectedAreas: 10,
    speciesCount: 378,
    trend: 'declining',
    strength: 'Extensive Wetland Sanctuary Network (7)',
    challenge: 'Industrial Conversion & Habitat Fragmentation',
    route: '/biodiversity/district/pulwama',
    forestCoverPct: 13.0,
  },
];

export function DistrictIntelligenceStrip() {
  const router = useRouter();
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  // Dynamically calculate superlatives from empirical district database
  const superlatives = useMemo(() => {
    const highestScore = KASHMIR_VALLEY_DISTRICTS.reduce(
      (prev, curr) => (curr.ecologicalScore > prev.ecologicalScore ? curr : prev),
      KASHMIR_VALLEY_DISTRICTS[0]
    );

    const mostBiodiverse = KASHMIR_VALLEY_DISTRICTS.reduce(
      (prev, curr) => (curr.speciesCount > prev.speciesCount ? curr : prev),
      KASHMIR_VALLEY_DISTRICTS[0]
    );

    const mostImproved =
      KASHMIR_VALLEY_DISTRICTS.find((d) => d.trend === 'improving') ||
      KASHMIR_VALLEY_DISTRICTS[0];

    const highestRisk = KASHMIR_VALLEY_DISTRICTS.reduce(
      (prev, curr) => (curr.ecologicalScore < prev.ecologicalScore ? curr : prev),
      KASHMIR_VALLEY_DISTRICTS[0]
    );

    return [
      {
        label: 'Highest Ecological Score',
        district: highestScore.name,
        score: highestScore.ecologicalScore,
        icon: Award,
        color: 'text-emerald-400',
      },
      {
        label: 'Most Biodiversity-Rich',
        district: mostBiodiverse.name,
        count: mostBiodiverse.speciesCount,
        icon: Activity,
        color: 'text-purple-400',
      },
      {
        label: 'Most Improved',
        district: mostImproved.name,
        trend: 'improving',
        icon: TrendingUp,
        color: 'text-blue-400',
      },
      {
        label: 'Highest Risk',
        district: highestRisk.name,
        risk: `${highestRisk.riskLevel} (${highestRisk.ecologicalScore})`,
        icon: AlertTriangle,
        color: 'text-red-400',
      },
    ];
  }, []);

  const visibleDistricts = showAllDistricts
    ? KASHMIR_VALLEY_DISTRICTS
    : KASHMIR_VALLEY_DISTRICTS.slice(0, 6);

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full signal-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
                Regional Intelligence
              </span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-[10px] sm:text-xs text-slate-300">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Verified Empirical Baseline · 10 Valley Districts</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                District Ecological Scorecards
              </h2>
              <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Compare ecological health, biodiversity richness, risk levels,
                and conservation status across Kashmir's districts.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:self-end">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:border-blue-400 w-full sm:w-auto text-xs sm:text-sm"
                icon={<Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                onClick={() => router.push('/districts')}
              >
                View All Districts
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Superlatives Strip - scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10 overflow-x-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">{/* responsive-md-fix */}
            {superlatives.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-3 sm:p-4 rounded-xl text-center h-full hover:border-white/20 transition-all">{/* responsive-md-fix */}
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color} mx-auto mb-2 sm:mb-3`} />
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1 sm:mb-2 leading-tight line-clamp-2">{item.label}</div>
                  <div className="text-base sm:text-lg font-bold text-white mb-1 truncate">{item.district}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                    {'score' in item && `${item.score} score`}
                    {'count' in item && `${item.count} species`}
                    {'trend' in item && 'Improving'}
                    {'risk' in item && item.risk}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* District Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* responsive-md-fix */}
          {visibleDistricts.map((district, index) => (
            <motion.div
              key={district.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
            >
              <Card className="glass-intense border-white/10 hover:border-blue-500/30 transition-all p-4 sm:p-5 rounded-xl group cursor-pointer h-full flex flex-col justify-between">{/* responsive-md-fix */}
                <div>
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {district.name}
                      </h3>
                      <div className="text-xs text-slate-500">Kashmir Core District</div>
                    </div>
                    <Badge
                      variant={
                        district.ecologicalScore >= 80 ? 'success' :
                        district.ecologicalScore >= 70 ? 'warning' : 'danger'
                      }
                      size="sm"
                      className="text-xl sm:text-2xl font-bold"
                    >
                      Score: {district.ecologicalScore}
                    </Badge>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm mb-3 sm:mb-4 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5">{/* responsive-md-fix */}
                    <div className="flex flex-col items-center text-center">
                      <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 mx-auto mb-1" />
                      <div className="text-base sm:text-lg font-bold text-white">{district.wetlands}</div>
                      <div className="text-[10px] sm:text-xs text-slate-500">Wetlands</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mx-auto mb-1" />
                      <div className="text-base sm:text-lg font-bold text-white">{district.protectedAreas}</div>
                      <div className="text-[10px] sm:text-xs text-slate-500">Protected</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-base sm:text-lg font-bold text-white">{district.speciesCount}</div>
                      <div className="text-[10px] sm:text-xs text-slate-500">Species</div>
                    </div>
                  </div>

                  {/* Trend & Risk */}
                  <div className="flex flex-wrap gap-2 items-center text-xs mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-white/5">{/* responsive-md-fix */}
                    <TrendingUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      district.trend === 'improving' ? 'text-emerald-400' :
                      district.trend === 'declining' ? 'text-red-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-[10px] sm:text-xs font-medium ${
                      district.trend === 'improving' ? 'text-emerald-400' :
                      district.trend === 'declining' ? 'text-red-400' : 'text-slate-300'
                    }`}>
                      {district.trend === 'improving' ? 'Improving' :
                       district.trend === 'declining' ? 'Declining' : 'Stable'}
                    </span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{district.riskLevel} Risk</span>
                    {district.forestCoverPct && (
                      <>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-emerald-400/90">{district.forestCoverPct}% Forest</span>
                      </>
                    )}
                  </div>

                  {/* Strength & Challenge */}
                  <div className="space-y-1.5 text-xs mb-3 sm:mb-4">{/* responsive-md-fix */}
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-[10px] sm:text-xs text-slate-400 shrink-0">Strength:</span>
                      <span className="text-[10px] sm:text-xs text-white truncate" title={district.strength}>
                        {district.strength}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="text-[10px] sm:text-xs text-slate-400 shrink-0">Challenge:</span>
                      <span className="text-[10px] sm:text-xs text-white truncate" title={district.challenge}>
                        {district.challenge}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-sm py-2 mt-2 rounded-lg border-white/20 text-white hover:border-blue-400 group-hover:bg-blue-500/10"
                  onClick={() => router.push(district.route)}
                >{/* responsive-md-fix */}
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse Toggle for all 10 Valley Districts */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllDistricts(!showAllDistricts)}
            className="text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800"
            icon={showAllDistricts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          >
            {showAllDistricts
              ? 'Show Top 6 Districts'
              : `Show All 10 Kashmir Core Districts (${KASHMIR_VALLEY_DISTRICTS.length})`}
          </Button>
        </div>
      </div>
    </section>
  );
}
