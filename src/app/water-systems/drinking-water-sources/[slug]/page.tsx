'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import {
  drinkingWaterSources,
  toDrinkingWaterEntity,
} from '@/data/drinking-water-sources';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  Droplets,
  Wrench,
  AlertTriangle,
  Shield,
  Layers,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
} from 'lucide-react';

export default function DrinkingWaterSourceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const source = drinkingWaterSources.find(s => s.slug === slug);

  if (!source) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="max-w-xl text-3xl font-bold text-white mb-3">Drinking Water Source Not Found</h1>
          <p className="text-slate-400 mb-6">The requested drinking water facility or catchment could not be found.</p>
          <Link
            href="/water-systems/drinking-water-sources"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
          >
            Back to Directory
          </Link>
        </div>
      </main>
    );
  }

  const entity = toDrinkingWaterEntity(source);
  const relatedEntities = drinkingWaterSources
    .filter(s => s.id !== source.id && (s.district === source.district || s.type === source.type))
    .slice(0, 4)
    .map(toDrinkingWaterEntity);

  const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
    operational: { label: 'Operational', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    partial: { label: 'Partial Supply', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    'non-functional': { label: 'Non-Functional', icon: XCircle, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
    'under-upgrade': { label: 'Under Upgrade', icon: Wrench, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  };

  const qualityConfig: Record<string, { label: string; color: string }> = {
    safe: { label: 'Potable / Safe Quality', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    'at-risk': { label: 'At-Risk / Elevated Turbidity', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    contaminated: { label: 'Contaminated / Non-Potable', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
    unknown: { label: 'Monitoring Pending', color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  };

  const status = statusConfig[source.status] || statusConfig.operational;
  const quality = qualityConfig[source.waterQualityStatus] || qualityConfig.unknown;

  return (
    <WaterEntityDetailPageComponent
      entity={entity}
      relatedEntities={relatedEntities}
      color="from-blue-500 to-cyan-600"
      icon="Droplets"
      backRoute="/water-systems"
      listRoute="/water-systems/drinking-water-sources"
      extraSections={
        <section className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Operational & Infrastructure Card */}
            <Card className="glass-intense border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Facility Telemetry & Status</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Operational Status</span>
                  <Badge className={`${status.color} border text-xs flex items-center gap-1`}>
                    <status.icon className="w-3 h-3" />
                    <span>{status.label}</span>
                  </Badge>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Water Quality Standard</span>
                  <Badge className={`${quality.color} border text-xs`}>
                    {quality.label}
                  </Badge>
                </div>

                {source.capacity && (
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Design Treatment Capacity</span>
                    <span className="font-mono font-bold text-white">{source.capacity}</span>
                  </div>
                )}

                {source.populationServed && (
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Population Served</span>
                    <span className="font-mono font-bold text-purple-300">
                      {source.populationServed.toLocaleString()} residents
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Source Hydrogeology</span>
                  <span className="font-medium text-slate-200 text-right">{source.source}</span>
                </div>
              </div>
            </Card>

            {/* Infrastructure Details */}
            <Card className="glass-intense border-white/10 p-6 space-y-4 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Infrastructure & Transmission Engineering</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {source.infrastructure}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Key Operational & Environmental Challenges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {source.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {source.esroSource && (
                <div className="pt-3 border-t border-white/5 text-xs text-blue-400/80 italic flex items-center gap-1.5">
                  <span>Source Archive:</span>
                  <span className="text-slate-300">{source.esroSource}</span>
                </div>
              )}
            </Card>
          </div>
        </section>
      }
    />
  );
}
