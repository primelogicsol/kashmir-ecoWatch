import React, { useMemo } from 'react';
import { getProtectedAreaIntelligence, getDistrictIntelligence } from '@/data/intelligence-graph';
import { habitatSignalsData } from '@/data/habitat-signals';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Activity, TrendingUp, TrendingDown, Leaf, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface HabitatSignalsWidgetProps {
  entityId: string;
  entityType: 'protected-area' | 'district';
  className?: string;
}

export const HabitatSignalsWidget: React.FC<HabitatSignalsWidgetProps> = ({ entityId, entityType, className = '' }) => {
  // Pull intelligence to get linked habitats
  const intelligence = useMemo(() => {
    return entityType === 'protected-area' 
      ? getProtectedAreaIntelligence(entityId)
      : getDistrictIntelligence(entityId);
  }, [entityId, entityType]);

  // Find the exact signals related to this entity
  const signals = useMemo(() => {
    if ('insufficient_data' in intelligence) return [];
    
    if (entityType === 'protected-area' && 'protectedAreaName' in intelligence) {
      return habitatSignalsData.filter(h => 
        h.habitatName.includes(intelligence.protectedAreaName) || 
        intelligence.protectedAreaName.includes(h.habitatName) ||
        (intelligence.administrativeUnits && intelligence.administrativeUnits.includes(h.district))
      );
    } else if (entityType === 'district' && 'district' in intelligence) {
      return habitatSignalsData.filter(h => h.district === intelligence.district);
    }
    return [];
  }, [intelligence, entityType]);

  if ('insufficient_data' in intelligence || signals.length === 0) {
    return null; // Don't render if no signals exist for this entity
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Degraded': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Stable': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Recovering': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Worsening': return <TrendingDown className="w-3.5 h-3.5 text-rose-400" />;
      case 'Improving': return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Stable': return <Activity className="w-3.5 h-3.5 text-slate-400" />;
      default: return null;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Habitat Stress Signals</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {signals.slice(0, 4).map((signal, idx) => (
          <Card key={idx} className="bg-slate-900/50/80 border-white/5 hover:border-white/10 transition-colors p-4" padding="none">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-300">{signal.habitatName}</span>
                </div>
                <div className="text-[10px] text-slate-500">{signal.ecosystemType}</div>
              </div>
              <Badge variant="outline" className={`text-[10px] ${getStatusColor(signal.healthStatus)}`}>
                {signal.healthStatus}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 rounded bg-white/5">
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-semibold text-amber-200">{signal.activeSignals[0]?.name || 'Unknown Signal'}</div>
                  <div className="text-[10px] text-slate-400 leading-snug">{signal.activeSignals[0]?.description || 'No detailed impact recorded'}</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] px-1 pt-1">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Trend:</span>
                  {getTrendIcon(signal.trendDirection)}
                  <span className="text-slate-300">{signal.trendDirection}</span>
                </div>
                <div className="text-slate-500">
                  Source: <span className="text-white">{signal.validationSource}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
