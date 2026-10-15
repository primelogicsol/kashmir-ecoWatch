'use client';

import React from 'react';
import type { DistrictWaterIntelligence } from '@/data/hydrological-intelligence';

interface DistrictWaterCardProps {
  intelligence: DistrictWaterIntelligence;
}

const DistrictWaterCard: React.FC<DistrictWaterCardProps> = ({ intelligence }) => {
  const getHealthColor = (score: number) => {
    if (score >= 75) return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 60) return 'text-amber-300 bg-amber-500/10 border-amber-500/30';
    if (score >= 40) return 'text-orange-300 bg-orange-500/10 border-orange-500/30';
    return 'text-rose-300 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="glass-intense rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col h-full group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
          {intelligence.district}
        </h3>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${getHealthColor(intelligence.averageHealthScore)}`}>
          EHI {intelligence.averageHealthScore}
        </div>
      </div>

      {/* Water Body Counts */}
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        <WaterBodyCount label="Lakes" count={intelligence.waterBodies.lakes} color="bg-blue-500/20 text-blue-300 border border-blue-500/30" />
        <WaterBodyCount label="Wetlands" count={intelligence.waterBodies.wetlands} color="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" />
        <WaterBodyCount label="Rivers" count={intelligence.waterBodies.rivers} color="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" />
        <WaterBodyCount label="Springs" count={intelligence.waterBodies.springs} color="bg-purple-500/20 text-purple-300 border border-purple-500/30" />
        <WaterBodyCount label="Total" count={intelligence.waterBodies.total} color="bg-white/10 text-white border border-white/10" />
      </div>

      {/* Water Quality Status */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Water Quality Distribution</h4>
        <div className="flex h-2 rounded-full overflow-hidden bg-white/10">
          {renderQualityBar(intelligence.waterQualityStatus)}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <QualityLegend status="excellent" count={intelligence.waterQualityStatus.excellent} />
          <QualityLegend status="good" count={intelligence.waterQualityStatus.good} />
          <QualityLegend status="moderate" count={intelligence.waterQualityStatus.moderate} />
          <QualityLegend status="poor" count={intelligence.waterQualityStatus.poor} />
          <QualityLegend status="critical" count={intelligence.waterQualityStatus.critical} />
        </div>
      </div>

      {/* Critical Water Bodies */}
      {intelligence.criticalWaterBodies.length > 0 && (
        <div className="mb-4 p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
          <div className="text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
            <span>⚠️</span> Critical Water Bodies
          </div>
          <div className="text-[11px] text-slate-300 leading-relaxed">
            {intelligence.criticalWaterBodies.join(', ')}
          </div>
        </div>
      )}

      {/* Restoration */}
      {intelligence.restorationProjects > 0 && (
        <div className="mt-auto p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-300">Restoration Projects</div>
            {intelligence.restorationInvestments > 0 && (
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                Allocated: ₹{(intelligence.restorationInvestments / 1000).toFixed(1)}M
              </div>
            )}
          </div>
          <div className="text-lg font-bold font-mono text-emerald-400">
            {intelligence.restorationProjects}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components

const WaterBodyCount: React.FC<{
  label: string;
  count: number;
  color: string;
}> = ({ label, count, color }) => (
  <div className="text-center">
    <div className={`${color} rounded-lg py-1.5 mb-1`}>
      <div className="text-sm font-bold font-mono">{count}</div>
    </div>
    <div className="text-[9px] text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const renderQualityBar = (status: DistrictWaterIntelligence['waterQualityStatus']) => {
  const total =
    status.excellent + status.good + status.moderate + status.poor + status.critical;
  if (total === 0) return <div className="text-[10px] text-slate-500 w-full text-center">No data</div>;

  const getWidth = (count: number) => `${(count / total) * 100}%`;

  return (
    <>
      <div className="bg-emerald-500" style={{ width: getWidth(status.excellent) }} title="Excellent" />
      <div className="bg-teal-500" style={{ width: getWidth(status.good) }} title="Good" />
      <div className="bg-amber-500" style={{ width: getWidth(status.moderate) }} title="Moderate" />
      <div className="bg-orange-500" style={{ width: getWidth(status.poor) }} title="Poor" />
      <div className="bg-rose-500" style={{ width: getWidth(status.critical) }} title="Critical" />
    </>
  );
};

const QualityLegend: React.FC<{
  status: string;
  count: number;
}> = ({ status, count }) => {
  if (count === 0) return null;

  const colors: Record<string, string> = {
    excellent: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
    good: 'bg-teal-500/10 text-teal-300 border border-teal-500/20',
    moderate: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
    poor: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
    critical: 'bg-rose-500/10 text-rose-300 border border-rose-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
    </span>
  );
};

export default DistrictWaterCard;
