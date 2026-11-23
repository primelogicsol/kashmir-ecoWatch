'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Camera,
  AlertTriangle,
  FileText,
  LucideIcon,
} from 'lucide-react';

export interface TypologyItem {
  id: string;
  label: string;
  count?: number;
  icon?: LucideIcon;
  color?: string; // 'emerald' | 'cyan' | 'sky' | 'rose' | 'amber' | 'indigo' | 'violet' | 'teal' | 'blue' | 'orange'
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
    active: 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/50 shadow-emerald-950/40',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25 hover:border-emerald-500/45',
  },
  cyan: {
    active: 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400/50 shadow-cyan-950/40',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/25 hover:border-cyan-500/45',
  },
  sky: {
    active: 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400/50 shadow-sky-950/40',
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/25 hover:border-sky-500/45',
  },
  blue: {
    active: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400/50 shadow-blue-950/40',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25 hover:border-blue-500/45',
  },
  rose: {
    active: 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400/50 shadow-rose-950/40',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/25 hover:border-rose-500/45',
  },
  amber: {
    active: 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400/50 shadow-amber-950/40',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25 hover:border-amber-500/45',
  },
  orange: {
    active: 'bg-orange-600 hover:bg-orange-500 text-white border-orange-400/50 shadow-orange-950/40',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/25 hover:border-orange-500/45',
  },
  indigo: {
    active: 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/50 shadow-indigo-950/40',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/25 hover:border-indigo-500/45',
  },
  violet: {
    active: 'bg-violet-600 hover:bg-violet-500 text-white border-violet-400/50 shadow-violet-950/40',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25 hover:border-violet-500/45',
  },
  teal: {
    active: 'bg-teal-600 hover:bg-teal-500 text-white border-teal-400/50 shadow-teal-950/40',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/25 hover:border-teal-500/45',
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
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || 'observe');

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

  const fieldRecordsHref =
    observeCategory === 'hazard'
      ? '/field-reports/hazard-intelligence'
      : '/trails-sightings/trail-field-records';

  return (
    <div className="space-y-8 my-8">
      {/* ── Focus Typologies & Sectors Filter Bar ─────────────────────── */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/55 backdrop-blur-md p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TypoIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{typologyTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {typologySubtitle}
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-white/10 shrink-0">
            Showing <strong className="text-emerald-400">{showingCount}</strong> of {totalCount} {entityLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {typologies.map((t) => {
            const isActive = activeTypology === t.id;
            const Icon = t.icon;
            const colorCfg = COLOR_CLASSES[t.color || 'emerald'] || COLOR_CLASSES.emerald;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTypology(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isActive
                    ? `${colorCfg.active} font-semibold shadow-lg`
                    : `bg-slate-950/60 border-white/10 text-slate-200 hover:text-white hover:bg-white/[0.06] hover:border-white/20`
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-white' : colorCfg.text}`} />}
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span className={`text-[11px] font-mono ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                    ({t.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Domain Intelligence Spotlight with Interactive Tabs ───────── */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="max-w-2xl">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <SpotIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{spotlightTitle}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {spotlightSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-slate-950/85 rounded-xl border border-white/10 flex-wrap self-start lg:self-auto">
            {allTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              const isObserve = tab.id === 'observe';

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all inline-flex items-center gap-1.5 ${
                    isSelected
                      ? isObserve
                        ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                        : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/35 font-semibold'
                      : isObserve
                        ? 'text-emerald-300 hover:text-white hover:bg-emerald-500/15'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {TabIcon && (
                    <TabIcon
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isObserve ? (isSelected ? 'text-white' : 'text-emerald-400') : ''
                      }`}
                    />
                  )}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded leading-none ${
                        isSelected && isObserve
                          ? 'bg-slate-950/40 text-emerald-100 border border-white/20'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Observe Action Bar — Fixed dark-mode contrast, valid Link buttons & responsive wrapping */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/85 border border-emerald-500/30 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {observeTitle}
                      </h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 whitespace-nowrap">
                        {observeBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {observeSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1 xl:pt-0">
                  {customObserveAction ? (
                    customObserveAction
                  ) : (
                    <>
                      <Link
                        href={`/submit-observation?category=${observeCategory}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-950/50 transition-colors whitespace-nowrap"
                      >
                        <Camera className="w-3.5 h-3.5 text-slate-950 flex-shrink-0" />
                        <span>Submit Observation</span>
                      </Link>
                      <Link
                        href="/report-issue"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-200 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        <span>Report Issue</span>
                      </Link>
                      <Link
                        href={fieldRecordsHref}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/15 hover:border-white/25 text-slate-200 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                        <span>Verified Field Records</span>
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
                      className={`p-4 rounded-xl bg-slate-950/75 border ${protoColor.border} transition-colors flex flex-col justify-between gap-3`}
                    >
                      <div>
                        <div className={`flex items-start gap-2 mb-2 ${protoColor.text}`}>
                          <ProtoIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <h6 className="font-semibold text-white text-xs leading-snug">
                            {proto.number}. {proto.title}
                          </h6>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {proto.desc}
                        </p>
                      </div>
                      <div className={`text-[10px] ${protoColor.text} font-mono bg-white/[0.03] px-2 py-1.5 rounded-md border border-white/10`}>
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
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
