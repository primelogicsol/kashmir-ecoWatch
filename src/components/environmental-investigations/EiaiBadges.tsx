'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import {
  EvidenceVerificationClass,
  InvestigationStatus,
} from '@/types/environmental-investigations';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileSearch,
  HelpCircle,
  Scale,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function InvestigationStatusBadge({
  status,
  label,
  className,
}: {
  status: InvestigationStatus;
  label?: string;
  className?: string;
}) {
  const config: Record<
    InvestigationStatus,
    { text: string; cls: string; Icon: React.ComponentType<{ className?: string }> }
  > = {
    published: {
      text: label || 'Published Investigation',
      cls: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40',
      Icon: CheckCircle2,
    },
    active_investigation: {
      text: label || 'Active Investigation',
      cls: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40',
      Icon: FileSearch,
    },
    scoping_review: {
      text: label || 'Scoping Review',
      cls: 'bg-amber-500/15 text-amber-300 border border-amber-500/40',
      Icon: Clock,
    },
    proposed: {
      text: label || 'Proposed Investigation',
      cls: 'bg-slate-700/60 text-slate-200 border border-white/15',
      Icon: HelpCircle,
    },
    archived: {
      text: label || 'Archived Record',
      cls: 'bg-slate-800 text-slate-400 border border-white/10',
      Icon: Clock,
    },
  };

  const item = config[status] || config.proposed;
  const Icon = item.Icon;

  return (
    <span
      className={cn(
        'kew-status-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-sm',
        item.cls,
        className
      )}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{item.text}</span>
    </span>
  );
}

export function EvidenceClassificationBadge({
  classification,
  className,
}: {
  classification: EvidenceVerificationClass;
  className?: string;
}) {
  const map: Record<
    EvidenceVerificationClass,
    { cls: string; Icon: React.ComponentType<{ className?: string }> }
  > = {
    Documented: {
      cls: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40',
      Icon: CheckCircle2,
    },
    'Provisionally Supported': {
      cls: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40',
      Icon: FileSearch,
    },
    Unverified: {
      cls: 'bg-amber-500/15 text-amber-300 border border-amber-500/40',
      Icon: AlertTriangle,
    },
    Unsupported: {
      cls: 'bg-red-500/15 text-red-300 border border-red-500/40',
      Icon: XCircle,
    },
    Conflicting: {
      cls: 'bg-purple-500/15 text-purple-300 border border-purple-500/40',
      Icon: Scale,
    },
  };

  const item = map[classification] || map.Unverified;
  const Icon = item.Icon;

  return (
    <Badge
      size="sm"
      className={cn('kew-status-badge gap-1 font-semibold', item.cls, className)}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{classification}</span>
    </Badge>
  );
}
