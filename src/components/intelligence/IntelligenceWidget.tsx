import React, { useMemo } from 'react';
import { 
  getSpeciesIntelligence, 
  getProtectedAreaIntelligence,
  getHabitatIntelligence,
  getDistrictIntelligence,
  getWaterSystemIntelligence,
  ScoreOutput
} from '@/data/intelligence-graph';
import { IntelligenceScoreCard } from './IntelligenceScoreCard';
import { motion } from 'framer-motion';
import { Network, ExternalLink, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export type EntityType = 'species' | 'protected-area' | 'habitat' | 'district' | 'water-system';

interface IntelligenceWidgetProps {
  entityId: string;
  entityType: EntityType;
  className?: string;
}

export const IntelligenceWidget: React.FC<IntelligenceWidgetProps> = ({ entityId, entityType, className = '' }) => {
  const intelligence = useMemo(() => {
    switch (entityType) {
      case 'species': return getSpeciesIntelligence(entityId);
      case 'protected-area': return getProtectedAreaIntelligence(entityId);
      case 'habitat': return getHabitatIntelligence(entityId);
      case 'district': return getDistrictIntelligence(entityId);
      case 'water-system': return getWaterSystemIntelligence(entityId);
      default: return { insufficient_data: true };
    }
  }, [entityId, entityType]);

  if ('insufficient_data' in intelligence && intelligence.insufficient_data) {
    return (
      <div className={`p-6 rounded-xl border border-white/5 bg-black/20 flex flex-col items-center justify-center text-center ${className}`}>
        <Network className="w-8 h-8 text-slate-600 mb-3" />
        <h3 className="text-sm font-semibold text-white mb-1">Intelligence Network Unlinked</h3>
        <p className="text-xs text-slate-400 max-w-sm">Insufficient cross-module data exists to construct an ecological intelligence profile for this entity.</p>
      </div>
    );
  }

  // Type assertions for rendering
  const isPA = entityType === 'protected-area';
  const isSpecies = entityType === 'species';
  const isWater = entityType === 'water-system';

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Banner */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30">
          <Network className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Ecological Intelligence Network
            <Badge variant="outline" className="bg-violet-500/10 text-violet-300 border-violet-500/30 text-[10px] uppercase tracking-widest">Live Graph</Badge>
          </h2>
          <p className="text-xs text-slate-400">Auto-generated multi-dimensional insight from 8 linked biodiversity systems.</p>
        </div>
      </div>

      {/* Primary Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {isPA && 'protectedAreaHealthScore' in intelligence && (
          <IntelligenceScoreCard 
            title="Protected Area Health" 
            scoreData={intelligence.protectedAreaHealthScore as ScoreOutput | null} 
          />
        )}
        {isSpecies && 'speciesIntelligenceScore' in intelligence && (
          <IntelligenceScoreCard 
            title="Species Resilience Score" 
            scoreData={intelligence.speciesIntelligenceScore as ScoreOutput | null} 
          />
        )}
        
        {'ecosystemRiskScore' in intelligence && (
          <IntelligenceScoreCard 
            title="Ecosystem Risk Score" 
            scoreData={intelligence.ecosystemRiskScore as ScoreOutput | null} 
          />
        )}
        {'conservationPriorityScore' in intelligence && (
          <IntelligenceScoreCard 
            title="Conservation Priority" 
            scoreData={intelligence.conservationPriorityScore as ScoreOutput | null} 
          />
        )}
      </div>

      {/* Network Insights & Cross-links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Stats Panel */}
        <Card className="bg-slate-900/50/80 border-white/10" padding="md">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Graph Linkages</h4>
          <div className="space-y-3">
            {isPA && 'speciesCount' in intelligence && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Species Recorded</span>
                <span className="text-white font-mono">{intelligence.speciesCount}</span>
              </div>
            )}
            {isPA && 'sightingsCount' in intelligence && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Observation Records</span>
                <span className="text-white font-mono">{intelligence.sightingsCount}</span>
              </div>
            )}
            {'habitatTypes' in intelligence && Array.isArray(intelligence.habitatTypes) && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Habitat Ecosystems</span>
                <span className="text-white font-mono">{intelligence.habitatTypes.length}</span>
              </div>
            )}
            {'migrationEvents' in intelligence && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Migration Events</span>
                <span className="text-white font-mono">{intelligence.migrationEvents}</span>
              </div>
            )}
            {isWater && 'waterQualityStatus' in intelligence && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Water Quality</span>
                <span className="text-white font-mono">{intelligence.waterQualityStatus}</span>
              </div>
            )}
            {isWater && 'dependentMigrationWindows' in intelligence && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Migration Sites</span>
                <span className="text-white font-mono">{intelligence.dependentMigrationWindows}</span>
              </div>
            )}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="bg-violet-950/20 border-violet-500/20 md:col-span-2" padding="md">
          <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Synthesized Insights
          </h4>
          <div className="space-y-2">
            {'insights' in intelligence && Array.isArray(intelligence.insights) && intelligence.insights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                <p>{insight}</p>
              </div>
            ))}
          </div>

          {'warnings' in intelligence && Array.isArray(intelligence.warnings) && intelligence.warnings.length > 0 && (
            <div className="mt-4 pt-4 border-t border-violet-500/20 space-y-2">
              {intelligence.warnings.map((warn, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-amber-300/80">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <p>{warn}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
