'use client';

import React from 'react';
import type { LakeHealthScorecard, HealthClassification } from '@/data/hydrological-intelligence';

interface LakeHealthScorecardProps {
  scorecard: LakeHealthScorecard;
  compact?: boolean;
}

const LakeHealthScorecardComponent: React.FC<LakeHealthScorecardProps> = ({
  scorecard,
  compact = false,
}) => {
  const getClassificationColor = (classification: HealthClassification) => {
    const colors = {
      excellent: 'from-emerald-500 to-green-600',
      good: 'from-teal-500 to-emerald-600',
      fair: 'from-amber-500 to-yellow-600',
      poor: 'from-orange-500 to-red-600',
      critical: 'from-red-600 to-rose-800',
    };
    return colors[classification];
  };

  const getClassificationBadgeColor = (classification: HealthClassification) => {
    const colors = {
      excellent: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      good: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
      fair: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      poor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      critical: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    };
    return colors[classification];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-teal-400';
    if (score >= 60) return 'text-amber-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-rose-400';
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-teal-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  if (compact) {
    return (
      <div className="glass-intense rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all group">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
            {scorecard.lakeName}
          </h3>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${getClassificationBadgeColor(
              scorecard.classification
            )}`}
          >
            {scorecard.classification}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center px-3 py-2 rounded-xl bg-white/5 border border-white/5 flex-shrink-0">
            <div className={`text-2xl font-black ${getScoreColor(scorecard.overallScore)} font-mono`}>
              {scorecard.overallScore}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Score</div>
          </div>

          <div className="flex-1 space-y-2">
            <ComponentBar label="Water Quality" score={scorecard.componentScores.waterQuality} />
            <ComponentBar label="Trophic State" score={scorecard.componentScores.trophicState} />
            <ComponentBar label="Biodiversity" score={scorecard.componentScores.biodiversity} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-intense rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getClassificationColor(scorecard.classification)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{scorecard.lakeName}</h2>
            <p className="text-white/80 text-sm mt-1">Limnological & Lake Health Assessment</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black font-mono">{scorecard.overallScore}</div>
            <div className="text-white/80 text-xs uppercase tracking-wider">Index / 100</div>
          </div>
        </div>
      </div>

      {/* Classification Badge */}
      <div className="p-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Health Classification</span>
          <span
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${getClassificationBadgeColor(
              scorecard.classification
            )}`}
          >
            {scorecard.classification.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Component Scores */}
      <div className="p-6">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Component Sub-Indices</h3>
        <div className="space-y-4">
          <ComponentBar
            label="Water Quality"
            score={scorecard.componentScores.waterQuality}
            description="Based on WQI and limnological parameters"
          />
          <ComponentBar
            label="Trophic State"
            score={scorecard.componentScores.trophicState}
            description={`Trophic Level: ${scorecard.trophicState || 'Normal'}`}
          />
          <ComponentBar
            label="Biodiversity"
            score={scorecard.componentScores.biodiversity}
            description="Aquatic species richness and habitat integrity"
          />
          <ComponentBar
            label="Hydrology"
            score={scorecard.componentScores.hydrology}
            description="Inflow-outflow and water balance stability"
          />
          <ComponentBar
            label="Threat Pressure"
            score={scorecard.componentScores.threatPressure}
            description="Inverse anthropogenic threat impact score"
          />
        </div>
      </div>

      {/* Trends */}
      <div className="p-6 bg-white/5 border-t border-white/10">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Multi-Season Trends</h3>
        <div className="grid grid-cols-3 gap-3">
          <TrendIndicator label="Overall" trend={scorecard.trends.overall} />
          <TrendIndicator label="Water Quality" trend={scorecard.trends.waterQuality} />
          <TrendIndicator label="Trophic State" trend={scorecard.trends.trophicState} />
        </div>
      </div>

      {/* Metadata */}
      <div className="p-4 bg-slate-950/60 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
        <span>Last Assessment: {new Date(scorecard.lastAssessment).toLocaleDateString()}</span>
        {scorecard.wqi && (
          <span className="font-mono text-emerald-400">WQI: {scorecard.wqi}</span>
        )}
      </div>
    </div>
  );
};

// Helper Components

const ComponentBar: React.FC<{
  label: string;
  score: number;
  description?: string;
}> = ({ label, score, description }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-teal-400';
    if (score >= 60) return 'text-amber-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-rose-400';
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-teal-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-300">{label}</span>
        <span className={`text-xs font-mono font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(score)} transition-all duration-500 rounded-full`}
          style={{ width: `${score}%` }}
        />
      </div>
      {description && <div className="text-[10px] text-slate-500 mt-1">{description}</div>}
    </div>
  );
};

const TrendIndicator: React.FC<{
  label: string;
  trend: 'improving' | 'stable' | 'declining';
}> = ({ label, trend }) => {
  const config = {
    improving: { icon: '↑', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-500/20' },
    stable: { icon: '→', color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-500/20' },
    declining: { icon: '↓', color: 'text-rose-400', bg: 'bg-rose-500/10 border border-rose-500/20' },
  };

  const { icon, color, bg } = config[trend];

  return (
    <div className={`${bg} rounded-xl p-3 text-center`}>
      <div className={`text-lg font-bold ${color}`}>{icon}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{label}</div>
      <div className={`text-[10px] font-bold ${color} capitalize`}>{trend}</div>
    </div>
  );
};

export default LakeHealthScorecardComponent;
