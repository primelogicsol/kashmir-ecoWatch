'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import * as Icons from 'lucide-react';

interface MetricItem {
  label: string;
  value: string | number;
  icon?: keyof typeof Icons | React.ComponentType<any>;
  sub?: string;
  color?: string;
}

export function LiveMetricsBar({ metrics }: { metrics: MetricItem[] }) {
  const defaultIcons: (keyof typeof Icons)[] = [
    'Activity', 'Shield', 'MapPin', 'Eye', 'Target', 'Info', 'BarChart3', 'TrendingUp'
  ];

  // Pad to exactly 8 items
  const padded = [...metrics];
  while (padded.length < 8) {
    padded.push({
      label: 'Monitoring',
      value: '—',
      icon: defaultIcons[padded.length]
    });
  }
  const finalMetrics = padded.slice(0, 8);

  return (
    <div className="container mx-auto px-6 -mt-8 relative z-20 mb-12">
      <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
          {finalMetrics.map((stat, idx) => {
            let IconComp: any = Icons.Activity;
            
            if (stat.icon) {
              if (typeof stat.icon === 'string') {
                IconComp = (Icons as any)[stat.icon] || Icons.Activity;
              } else {
                IconComp = stat.icon;
              }
            } else {
               // Assign a stable default icon if missing
               IconComp = (Icons as any)[defaultIcons[idx]] || Icons.Activity;
            }

            return (
              <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                <IconComp className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
