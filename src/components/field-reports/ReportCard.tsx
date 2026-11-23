'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FileText, Calendar, Download, ExternalLink, MapPin, Layers } from 'lucide-react';
import { FieldReport, ReportStatus, ReportType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ReportCardProps {
  report: FieldReport;
  index?: number;
}

const statusConfig: Record<ReportStatus, { label: string; color: string; bgColor: string }> = {
  reviewed: { label: 'Reviewed', color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/30' },
  'field-verified': { label: 'Field Verified', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/30' },
  preliminary: { label: 'Preliminary', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10 border-yellow-500/30' },
  'technical-assessment': { label: 'Technical Assessment', color: 'text-purple-400', bgColor: 'bg-purple-500/10 border-purple-500/30' },
  'monthly-bulletin': { label: 'Monthly Bulletin', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10 border-cyan-500/30' },
  archived: { label: 'Archived', color: 'text-slate-400', bgColor: 'bg-slate-500/10 border-slate-500/30' },
  restricted: { label: 'Restricted', color: 'text-red-400', bgColor: 'bg-red-500/10 border-red-500/30' },
};

const typeLabels: Record<ReportType, string> = {
  'field-survey': 'Field Survey',
  'technical-report': 'Technical Report',
  'monthly-bulletin': 'Monthly Bulletin',
  'risk-assessment': 'Risk Assessment',
  'environmental-impact': 'Environmental Impact',
  'species-survey': 'Species Survey',
  'wetland-assessment': 'Wetland Assessment',
  'seasonal-report': 'Seasonal Report',
};

export function ReportCard({ report, index = 0 }: ReportCardProps) {
  const router = useRouter();
  const status = statusConfig[report.status];
  const reportYear = new Date(report.date).getFullYear();
  const isArchived = report.status === 'archived' || reportYear <= 2024;
  const isRecent = reportYear >= 2026;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="h-full min-w-0"
    >
      <div
        className={`kew-card-shell group h-full ${
          isArchived ? 'opacity-80 hover:opacity-100' : ''
        }`}
      >
        {/* 1. ICON (top-left) + Status & Type Badges (top-right) */}
        <div className="kew-card-top-row">
          <div
            className={`kew-card-icon-box ${
              isArchived
                ? 'bg-slate-800 border-slate-700 text-slate-400'
                : 'bg-amber-950/60 border-amber-500/30 text-amber-400'
            }`}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <span className={`px-2 py-0.5 text-[11px] font-semibold border rounded-[4px] ${status.bgColor} ${status.color}`}>
              {status.label}
            </span>
            <Badge variant="outline" size="sm">
              {typeLabels[report.reportType]}
            </Badge>
            {isArchived && (
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-[4px]">
                Archive: {reportYear}
              </span>
            )}
            {isRecent && (
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-[4px]">
                Current
              </span>
            )}
            {report.visibility === 'restricted' && (
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-[4px]">
                Restricted
              </span>
            )}
          </div>
        </div>

        {/* 2. TITLE — full horizontal width */}
        <h3 className={`kew-card-title ${isArchived ? 'text-slate-300' : ''}`}>{report.title}</h3>

        {/* 3. KPI / Provenance Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 tabular-nums">
          <span className="font-medium text-slate-300 break-words">{report.source}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(report.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
          <span>•</span>
          <span>{report.pages} pages</span>
        </div>

        {/* 4. DESCRIPTION */}
        <p className="kew-card-desc">{report.summary}</p>

        {/* Districts & Modules */}
        <div className="space-y-2">
          {report.districts.length > 0 && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="flex gap-1.5 flex-wrap">
                {report.districts.slice(0, 3).map((district) => (
                  <span
                    key={district}
                    className="px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-300 rounded-[4px] border border-emerald-500/20"
                  >
                    {district}
                  </span>
                ))}
                {report.districts.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-slate-400">
                    +{report.districts.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {report.modules.length > 0 && (
            <div className="flex items-start gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex gap-1.5 flex-wrap">
                {report.modules.slice(0, 2).map((module) => (
                  <span
                    key={module}
                    className="px-2 py-0.5 text-xs bg-blue-500/10 text-blue-300 rounded-[4px] border border-blue-500/20"
                  >
                    {module}
                  </span>
                ))}
                {report.modules.length > 2 && (
                  <span className="px-2 py-0.5 text-xs text-slate-400">
                    +{report.modules.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. CTA — anchored near bottom */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-white/20 text-white h-9 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
            onClick={() => router.push(`/field-reports/${report.id}`)}
            icon={<ExternalLink className="w-4 h-4" />}
          >
            View Details
          </Button>
          {report.downloadUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white h-9 px-3 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
              icon={<Download className="w-4 h-4" />}
            >
              PDF
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
