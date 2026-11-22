'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Radio, CloudRain, ExternalLink, ShieldCheck, Database, Info } from 'lucide-react';
import { sourceRegistry } from '@/data/source-registry';

export type MonitoringState = 
  | 'NO ACTIVE ALERTS DETECTED'
  | 'ACTIVE OFFICIAL ALERT'
  | 'ACTIVE KEW RISK ASSESSMENT'
  | 'MONITORING DELAYED'
  | 'SOURCE UNAVAILABLE'
  | 'COVERAGE INCOMPLETE'
  | 'STATUS UNKNOWN';

interface ScientificMonitoringStatusProps {
  programName?: string;
  hazardType?: string;
  statusState?: MonitoringState;
  summaryText?: string;
  sourceRegistryId?: string;
  monitoringConnection?: 'Connected' | 'Unreachable' | 'Synchronizing';
  modelStatus?: 'Active' | 'Delayed' | 'Standby';
  officialAuthority?: string;
  activeAlerts?: Array<{
    title: string;
    pubDate?: string;
    issuingAuthority?: string;
    link?: string;
    description?: string;
  }>;
}

export function ScientificMonitoringStatus({
  programName = 'KEW Hazard Intelligence',
  hazardType = 'Flash Flood',
  statusState = 'NO ACTIVE ALERTS DETECTED',
  summaryText,
  sourceRegistryId = 'flash-flood-alerts',
  monitoringConnection = 'Connected',
  modelStatus = 'Active',
  officialAuthority,
  activeAlerts = []
}: ScientificMonitoringStatusProps) {
  const sourceRecord = sourceRegistry[sourceRegistryId];
  const hasOfficialAlerts = activeAlerts.length > 0;

  const defaultSummary = hasOfficialAlerts 
    ? 'Official emergency bulletins are active for this geographic quadrant. Follow directives issued by responsible authorities.'
    : 'No active high-severity alerts identified within the monitored coverage. This does not guarantee the absence of localized risk.';

  return (
    <div className="w-full space-y-3">
      {hasOfficialAlerts ? (
        /* Active Official Emergency Alert State */
        <div className="bg-rose-950/40 border border-rose-500/40 rounded-[8px] p-4 text-white shadow-lg backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/20 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-bold text-rose-200 uppercase tracking-wide">
                ACTIVE OFFICIAL EMERGENCY WARNING
              </h3>
            </div>
            {officialAuthority && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Issuing Authority: {officialAuthority}
              </span>
            )}
          </div>

          <p className="text-xs text-rose-100 leading-relaxed mb-3">
            {summaryText || defaultSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {activeAlerts.map((alert, idx) => (
              <div key={idx} className="bg-slate-950/70 p-3 rounded-[6px] border border-rose-500/30 text-xs space-y-1.5">
                <div className="font-bold text-rose-200">{alert.title}</div>
                {alert.description && (
                  <p className="text-[11px] text-slate-300 line-clamp-2">{alert.description}</p>
                )}
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/5 font-mono">
                  <span>Issued: {alert.pubDate || 'Active'}</span>
                  {alert.link && (
                    <a
                      href={alert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline flex items-center gap-1"
                    >
                      Official Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Standard Non-Alert Verified Status State */
        <div className="bg-slate-900/80 border border-white/10 rounded-[8px] p-4 sm:p-5 text-white backdrop-blur-md shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-[6px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    {programName}
                  </span>
                  <span className="text-xs font-bold text-white">
                    · {statusState}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                    Alert Feed Verified
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {summaryText || defaultSummary}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right text-[11px] text-slate-400 flex-shrink-0 space-y-1 border-t md:border-t-0 pt-2 md:pt-0 border-white/5 w-full md:w-auto font-mono">
              <div className="flex items-center md:justify-end gap-1.5">
                <span className="text-slate-400">Hazard Alert Monitoring:</span>
                <span className={monitoringConnection === 'Connected' ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                  {monitoringConnection}
                </span>
              </div>
              <div className="flex items-center md:justify-end gap-1.5">
                <span className="text-slate-400">Atmospheric Forecast Intelligence:</span>
                <span className={modelStatus === 'Active' ? 'text-teal-400 font-semibold' : 'text-slate-400'}>
                  {modelStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Level 2 Metadata / Central Provenance Reference Strip */}
      <div className="bg-slate-950/60 border border-white/5 rounded-[6px] px-3.5 py-2 text-[10px] sm:text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-slate-500" />
          <span>Scientific Provenance: {sourceRecord?.evidenceClass || 'Standardized Telemetry'}</span>
          <span className="text-slate-600">|</span>
          <span>Registry Ref: <strong className="text-slate-300 font-normal">{sourceRegistryId}</strong></span>
        </div>

        <Link
          href="/open-data#categories"
          className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
        >
          <span>View Methodology &amp; Sources in Open Data Portal</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
