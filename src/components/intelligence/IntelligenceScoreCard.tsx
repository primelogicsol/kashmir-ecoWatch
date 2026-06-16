import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScoreOutput } from '@/data/intelligence-graph';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, AlertTriangle, AlertCircle, Info, Database, Activity } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  scoreData: ScoreOutput | null;
  className?: string;
}

export const IntelligenceScoreCard: React.FC<ScoreCardProps> = ({ title, scoreData, className = '' }) => {
  if (!scoreData) {
    return (
      <Card className={`bg-slate-900/50/50 border-white/5 p-5 ${className}`} padding="none">
        <div className="flex items-center gap-3 text-slate-400">
          <Activity className="w-5 h-5 text-slate-500" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
            <p className="text-xs">Insufficient data for confidence scoring.</p>
          </div>
        </div>
      </Card>
    );
  }

  const getBandColor = (band: ScoreOutput['scoreBand']) => {
    switch (band) {
      case 'Excellent / Very High': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Stable / High': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'Moderate': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'High Concern': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case 'High': return 'text-emerald-400';
      case 'Medium': return 'text-amber-400';
      case 'Low': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <Card className={`border border-white/10 bg-slate-900/50 flex flex-col overflow-hidden shadow-xl shadow-black/20 ${className}`} padding="none">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-white text-base mb-1">{title}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-[10px] ${getBandColor(scoreData.scoreBand)}`}>
              {scoreData.scoreBand}
            </Badge>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <CheckCircle2 className={`w-3 h-3 ${getConfidenceColor(scoreData.confidenceLevel)}`} />
              {scoreData.confidenceLevel} Confidence
            </span>
          </div>
        </div>
        
        {/* Big Score */}
        <div className="text-right">
          <div className="text-3xl font-black text-white leading-none tracking-tighter">
            {scoreData.finalScore}
            <span className="text-sm font-normal text-slate-500">/100</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {scoreData.explanation}
        </p>

        {/* Component Scores */}
        <div className="space-y-2 mb-4">
          {Object.entries(scoreData.componentScores).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="flex items-center gap-2 w-1/2">
                <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    className={`h-full ${val >= 80 ? 'bg-emerald-500' : val >= 60 ? 'bg-sky-500' : val >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  />
                </div>
                <span className="text-white font-medium w-6 text-right">{val}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-auto space-y-2 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <Database className="w-3 h-3 text-violet-400" />
            <span>Sources: {scoreData.dataSourcesUsed.join(', ')}</span>
          </div>
          
          {scoreData.missingDataWarnings.length > 0 && (
            <div className="flex items-start gap-1.5 text-[10px] text-amber-400/80 bg-amber-500/10 p-2 rounded-md border border-amber-500/20">
              <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
              <span>{scoreData.missingDataWarnings.join(' • ')}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
