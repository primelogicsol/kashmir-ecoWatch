'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, ArrowRight, AlertTriangle, Clock, RotateCw, Radio, Globe, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <Badge variant="danger" size="sm" className="bg-red-500/20 text-red-300 border border-red-500/40">CRITICAL</Badge>;
    case 'high':
      return <Badge variant="warning" size="sm" className="bg-orange-500/20 text-orange-300 border border-orange-500/40">HIGH</Badge>;
    case 'moderate':
      return <Badge variant="info" size="sm" className="bg-amber-500/20 text-amber-300 border border-amber-500/40">MODERATE</Badge>;
    default:
      return <Badge variant="success" size="sm" className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">LOW RISK</Badge>;
  }
};

function formatAlertTime(isoStr: string) {
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export default function LiveAlertsAdvisoriesPage() {
  const router = useRouter();
  const { alerts, isLoading, isLive, lastUpdated, refetch } = useLiveAlerts();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={
          <>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Live Alerts & Advisories
            </span>
          </>
        }
        subtitle="Real-time hazard telemetry streams, hydrological discharge alarms, seismic updates, and mountain corridor advisories"
        icon={<Bell className="w-6 h-6 text-emerald-400" />}
        label="Telemetry Observatory"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RotateCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Updating...' : 'Sync APIs'}
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400"
              onClick={() => router.push('/risk-monitoring')}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Risk Command Center
            </Button>
          </div>
        }
      />

      {/* Stream status ribbon */}
      <div className="bg-slate-900/90 border-y border-emerald-500/30 px-4 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              Live Telemetry: USGS · GloFAS Hydrology · Open-Meteo CAMS
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            {lastUpdated && (
              <span>Last Synced: <span className="text-white font-mono">{new Date(lastUpdated).toLocaleTimeString()}</span></span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
              {alerts.length} Active Feeds
            </span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {alerts.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`glass-intense p-5 border transition-all ${
                    a.severity === 'critical'
                      ? 'border-red-500/50 bg-red-950/10'
                      : a.severity === 'high'
                      ? 'border-orange-500/40 bg-orange-950/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          a.severity === 'critical'
                            ? 'bg-red-500/20 text-red-400'
                            : a.severity === 'high'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-white">{a.title}</h3>
                          {getSeverityBadge(a.severity)}
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                            {a.district}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                          {a.summary || (a as any).description}
                        </p>

                        {(a.updates?.[0]?.note || (a as any).liveMetric || a.cause) && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
                            <span>{a.updates?.[0]?.note || (a as any).liveMetric || a.cause}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                          <span className="text-slate-400">Source: <strong className="text-emerald-300 font-medium">{a.issuedBy || a.source}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatAlertTime(a.updated || a.issued || (a as any).timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 text-xs"
                        onClick={() => router.push(a.relatedModulePath || (a as any).actionUrl || '/risk-monitoring')}
                      >
                        Explore Telemetry
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
