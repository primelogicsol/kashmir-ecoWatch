'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Camera, AlertTriangle, FileText, CheckCircle2, 
  ExternalLink, ArrowRight, ShieldCheck, Eye, LucideIcon 
} from 'lucide-react';

export interface TypologyItem {
  id: string;
  label: string;
  count?: number;
  icon?: LucideIcon;
  color?: string; // 'emerald' | 'cyan' | 'sky' | 'rose' | 'amber' | 'indigo' | 'violet' | 'teal'
}

export interface SpotlightTab {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string;
  content: React.ReactNode;
}

export interface ProtocolItem {
  number: string;
  title: string;
  desc: string;
  benchmark: string;
  icon: LucideIcon;
  color?: string;
}

export interface EnvironmentalObserveSpotlightProps {
  // Typology Bar
  typologyTitle: string;
  typologySubtitle: string;
  typologyIcon: LucideIcon;
  typologies: TypologyItem[];
  activeTypology: string;
  onSelectTypology: (id: string) => void;
  showingCount: number;
  totalCount: number;
  entityLabel?: string;

  // Spotlight Header
  spotlightTitle: string;
  spotlightSubtitle: string;
  spotlightIcon?: LucideIcon;
  tabs: SpotlightTab[];

  // Observe Section
  observeCategory?: string; // query param for submit-observation
  observeTitle?: string;
  observeSubtitle?: string;
  observeBadge?: string;
  protocols: ProtocolItem[];

  // Optional custom action buttons
  customObserveAction?: React.ReactNode;
}

const COLOR_CLASSES: Record<string, { active: string; text: string; bg: string; border: string }> = {
  emerald: {
    active: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
  },
  cyan: {
    active: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950/40',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
  },
  sky: {
    active: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-950/40',
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20 hover:border-sky-500/40',
  },
  rose: {
    active: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 hover:border-rose-500/40',
  },
  amber: {
    active: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
  },
  indigo: {
    active: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20 hover:border-indigo-500/40',
  },
  violet: {
    active: 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/40',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
  },
  teal: {
    active: 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/40',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20 hover:border-teal-500/40',
  },
};

export function EnvironmentalObserveSpotlight({
  typologyTitle,
  typologySubtitle,
  typologyIcon: TypoIcon,
  typologies,
  activeTypology,
  onSelectTypology,
  showingCount,
  totalCount,
  entityLabel = 'entities',
  spotlightTitle,
  spotlightSubtitle,
  spotlightIcon: SpotIcon = Sparkles,
  tabs,
  observeCategory = 'environmental',
  observeTitle = 'Citizen Environmental Surveillance & Field Network',
  observeSubtitle = 'Contribute verified ground-truth observations, track compliance violations, or report hazards directly to the Kashmir EcoWatch registry.',
  observeBadge = 'Active In Kashmir Core & Basins',
  protocols,
  customObserveAction,
}: EnvironmentalObserveSpotlightProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || 'tab-0');

  const allTabs = [
    ...tabs,
    {
      id: 'observe',
      label: 'Observe Here (Field Protocols)',
      icon: Camera,
      badge: 'Citizen Science',
      content: null,
    },
  ];

  return (
    <div className="space-y-8 my-8">
      {/* ── Focus Typologies & Sectors Filter Bar ─────────────────────── */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TypoIcon className="w-5 h-5 text-emerald-400" />
              {typologyTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {typologySubtitle}
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-emerald-400">{showingCount}</strong> of {totalCount} {entityLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {typologies.map((t) => {
            const isActive = activeTypology === t.id;
            const Icon = t.icon;
            const colorCfg = COLOR_CLASSES[t.color || 'emerald'] || COLOR_CLASSES.emerald;

            return (
              <Button
                key={t.id}
                size="sm"
                variant={isActive ? 'default' : 'outline'}
                onClick={() => onSelectTypology(t.id)}
                className={
                  isActive
                    ? `${colorCfg.active} font-medium shadow-lg`
                    : `border-white/10 ${colorCfg.text} hover:text-white hover:bg-white/5`
                }
              >
                {Icon && <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-white' : colorCfg.text}`} />}
                {t.label}
                {t.count !== undefined && (
                  <span className={`ml-1.5 text-[11px] ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                    ({t.count})
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* ── Domain Intelligence Spotlight with Interactive Tabs ───────── */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <SpotIcon className="w-4 h-4 text-emerald-400" />
              {spotlightTitle}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {spotlightSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            {allTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              const isObserve = tab.id === 'observe';

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? isObserve
                        ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isObserve
                        ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                        : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {TabIcon && <TabIcon className={`w-3.5 h-3.5 ${isObserve ? (isSelected ? 'text-white' : 'text-emerald-400') : ''}`} />}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-1">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'observe' ? (
            <motion.div
              key="observe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Observe Action Bar */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{observeTitle}</span>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-300">
                        {observeBadge}
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {observeSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {customObserveAction ? (
                    customObserveAction
                  ) : (
                    <>
                      <Link href={`/submit-observation?category=${observeCategory}`}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                          <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                          Submit Observation
                        </Button>
                      </Link>
                      <Link href="/report-issue">
                        <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                          Report Issue
                        </Button>
                      </Link>
                      <Link href="/trails-sightings/trail-field-records">
                        <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                          <FileText className="w-3.5 h-3.5 mr-1 text-teal-400" />
                          Verified Field Records
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* 4 Standard Field Protocols */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {protocols.map((proto) => {
                  const ProtoIcon = proto.icon;
                  const protoColor = COLOR_CLASSES[proto.color || 'emerald'] || COLOR_CLASSES.emerald;

                  return (
                    <div
                      key={proto.number}
                      className={`p-3.5 rounded-xl bg-slate-950/70 border ${protoColor.border} transition-colors flex flex-col justify-between`}
                    >
                      <div>
                        <div className={`flex items-center gap-2 mb-2 ${protoColor.text}`}>
                          <ProtoIcon className="w-4 h-4 flex-shrink-0" />
                          <h6 className="font-semibold text-white text-xs">{proto.number}. {proto.title}</h6>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                          {proto.desc}
                        </p>
                      </div>
                      <div className={`text-[10px] ${protoColor.text} font-mono bg-white/[0.02] p-1.5 rounded border border-white/5`}>
                        {proto.benchmark}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {tabs.find((t) => t.id === activeTab)?.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
