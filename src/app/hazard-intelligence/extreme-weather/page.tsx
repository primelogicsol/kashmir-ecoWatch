'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { EXTREME_WEATHER_CATALOG } from '@/data/hazard-extreme-weather';
import {
  CloudRain, Snowflake, Zap, Thermometer, Wind, Eye,
  Droplets, AlertTriangle, BarChart3, ArrowRight, CheckCircle2, Layers
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function ExtremeWeatherHubPage() {
  const router = useRouter();
  const [phaseFilter, setPhaseFilter] = useState<'all' | 1 | 2 | 3>('all');

  const visibleModules =
    phaseFilter === 'all'
      ? EXTREME_WEATHER_CATALOG
      : EXTREME_WEATHER_CATALOG.filter((m) => m.rolloutPhase === phaseFilter);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Extreme Weather Systems"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Extreme Weather Systems' },
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block whitespace-normal break-words leading-[1.12] overflow-visible bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Extreme Weather Intelligence
            </span>
          </>
        }
        subtitle="12-module meteorological extreme event architecture powered by KEW's centralized ingestion engine across Kashmir, Jammu, Ladakh, Azad Kashmir, Gilgit, and Baltistan (Gilgit-Baltistan)."
        icon={<CloudRain className="w-6 h-6 text-cyan-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-white"
              icon={<CloudRain className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts')}
            >
              Launch Extreme Rainfall &amp; Cloudbursts (Live)
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard')}
            >
              Extreme Rainfall 8-Tab Dashboard
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-forest-fires-wildfire.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Architecture Scope', value: '12 Modules', icon: 'Layers', color: 'text-cyan-400' },
          { label: 'Validated Live Now', value: '1 Operational', icon: 'CheckCircle', color: 'text-emerald-400' },
          { label: 'Watersheds Active', value: '24 / 24', icon: 'MapPin', color: 'text-sky-400' },
          { label: 'Sub-Regions', value: 6, icon: 'Globe', color: 'text-teal-400' },
          { label: 'Ensemble Members', value: '31 (NOAA GEFS)', icon: 'BarChart3', color: 'text-indigo-400' },
          { label: 'Historical Baseline', value: 'ERA5-Land', icon: 'Database', color: 'text-purple-300' },
          { label: 'Shared Ingestion', value: 'Centralized', icon: 'Shield', color: 'text-amber-300' },
          { label: 'Fake Data Policy', value: 'Zero Tolerance', icon: 'AlertTriangle', color: 'text-rose-400' },
        ]}
        iconColor="text-cyan-400"
      />

      <section className="py-10 flex-1">
        <div className="container mx-auto px-6 space-y-8">
          <Card className="glass-intense border-cyan-500/25 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="success" size="sm">Phase 1 Anchor Operational</Badge>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Shared Extreme Weather Data Engine · Phased Validation Rollout
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-3xl">
                Module 01 (<strong>Extreme Rainfall &amp; Cloudbursts</strong>) is fully operational with real 168-hour NWP, 31-member GFS ensemble probabilities, ERA5-Land historical 7-day baselines, and RainViewer radar. Modules 02–12 display their planned specifications without synthetic or unverified placeholder data.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs shrink-0">
              {[
                { id: 'all' as const, label: 'All 12' },
                { id: 1 as const, label: 'Phase 1 (4)' },
                { id: 2 as const, label: 'Phase 2 (4)' },
                { id: 3 as const, label: 'Phase 3 (4)' },
              ].map((p) => (
                <button
                  key={String(p.id)}
                  type="button"
                  onClick={() => setPhaseFilter(p.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold ${
                    phaseFilter === p.id ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleModules.map((mod, idx) => {
              const isLive = mod.operationalStatus === 'OPERATIONAL';
              return (
                <motion.div
                  key={mod.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="flex"
                >
                  <Card
                    className={`glass-intense p-5 flex flex-col justify-between gap-4 w-full transition-all ${
                      isLive ? 'border-emerald-500/40 hover:border-emerald-400/70 shadow-lg shadow-emerald-950/20' : 'border-white/10 opacity-90'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          MODULE {String(mod.order).padStart(2, '0')} · PHASE {mod.rolloutPhase}
                        </span>
                        {isLive ? (
                          <Badge variant="success" size="sm" className="text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Validated Operational
                          </Badge>
                        ) : (
                          <Badge variant="outline" size="sm" className="text-[10px]">
                            Planned Rollout (—)
                          </Badge>
                        )}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">{mod.title}</h3>
                        <p className="text-[11px] text-sky-300 mt-0.5 font-mono truncate">{mod.principalSources}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {mod.mainIndicators.map((ind) => (
                          <span key={ind} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
                            {ind}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {mod.scientificLimitationNote}
                      </p>

                      <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                        {mod.connectedModules.map((cm) => (
                          <Link
                            key={cm.label}
                            href={cm.href}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 text-cyan-300"
                          >
                            {cm.label} →
                          </Link>
                        ))}
                      </div>
                    </div>

                    {isLive ? (
                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex-1"
                          onClick={() => router.push(mod.href)}
                        >
                          Open Module <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/15 text-xs text-slate-200"
                          onClick={() => router.push(mod.dashboardHref)}
                        >
                          8-Tab Dashboard
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                        <span>Route: /extreme-weather/{mod.slug}</span>
                        <span>Awaiting Validation</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="extreme-rainfall-cloudbursts" />
      </div>
    </main>
  );
}
