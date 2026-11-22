'use client';

import React from 'react';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

// ─── Shared KPI shape ─────────────────────────────────────────────────────────

export interface ModuleKpi {
  label: string;
  value: string | number;
  /** Lucide icon name, e.g. 'Shield', 'Leaf', 'Droplet' */
  icon: string;
  /** Optional tailwind text-color class for the value, e.g. 'text-emerald-400' */
  color?: string;
}

interface ModuleKpiStripProps {
  kpis: ModuleKpi[];
  /** Tailwind class for icon colour. Defaults to 'text-emerald-500' (matches national-parks). */
  iconColor?: string;
  className?: string;
}

/**
 * Standardised KPI strip — identical geometry/style to /protected-network/national-parks.
 *
 * Layout:  -mt-8 overlap · z-20 · glass-intense card · 3-4-8 responsive grid
 * Max items: 8 (extras silently dropped)
 */
export function ModuleKpiStrip({ kpis, iconColor = 'text-emerald-500', className }: ModuleKpiStripProps) {
  const items = kpis.slice(0, 8);

  const gridCols =
    items.length <= 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : items.length <= 6
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
      : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8';

  return (
    <div className={className || "container mx-auto px-3 sm:px-4 md:px-6 -mt-8 relative z-20 mb-6"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-intense border-white/10 p-2.5 sm:p-4 lg:p-5" padding="none">
          <div className={`grid ${gridCols} gap-2 sm:gap-3`}>
            {items.map((kpi, idx) => {
              const KpiIcon = (Icons as any)[kpi.icon] || Icons.Activity;
              const isLongVal = typeof kpi.value === 'string' && kpi.value.length > 7;
              return (
                <div key={idx} className="py-2 px-1 sm:px-2 lg:py-3 rounded-lg text-center min-w-0 flex flex-col justify-center">
                  <KpiIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor} mx-auto mb-1 flex-shrink-0`} />
                  <div
                    className={`${
                      isLongVal ? 'text-xs sm:text-sm lg:text-base' : 'text-sm sm:text-base lg:text-base xl:text-lg'
                    } font-bold tabular-nums leading-tight break-words ${
                      kpi.color || 'text-white'
                    }`}
                  >
                    {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-400 uppercase tracking-wide mt-1 leading-tight break-words">
                    {kpi.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
