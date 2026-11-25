'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { PIL_READINESS_CHECKLIST_DATA, ChecklistItem } from '@/data/environmental-litigation-support';
import {
  ListChecks,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export function FilingChecklistModule() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({ 'chk-1': true, 'chk-4': true });
  const [copied, setCopied] = useState<boolean>(false);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kew_pil_checklist_state');
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save on change
  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('kew_pil_checklist_state', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem('kew_pil_checklist_state');
    } catch {
      // Ignore
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = PIL_READINESS_CHECKLIST_DATA.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Copy checklist to clipboard
  const handleCopyChecklist = () => {
    const textLines = [
      '# KEW ENVIRONMENTAL PIL READINESS CHECKLIST (5 HIMALAYAN REGIONS)',
      `Status: ${completedCount} of ${totalCount} Factors Reviewed (${percentage}% Complete)`,
      '',
      ...PIL_READINESS_CHECKLIST_DATA.map((item, idx) => {
        const isDone = !!checkedItems[item.id];
        return `[${isDone ? 'X' : ' '}] ${idx + 1}. ${item.title} (${item.category})\n    Statute: ${item.statutoryBasis}\n    Notes: ${item.regionalNotes}\n    Mandatory Docs: ${item.mandatoryDocuments.join(', ')}\n`;
      }),
      'Generated from Kashmir EcoWatch (https://kashmir-ecowatch.com/resources/environmental-pil)'
    ].join('\n');

    navigator.clipboard.writeText(textLines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[6px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ListChecks className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              PIL Resource &amp; Procedural Readiness Checklist
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            A comprehensive, jurisdiction-specific 12-factor readiness assessment incorporating High Court of J&amp;K and Ladakh PIL Rules 2010/2021.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleCopyChecklist}
            className="px-3 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Checklist Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copy Checklist</span>
              </>
            )}
          </button>

          <button
            onClick={resetAll}
            className="px-2.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
            title="Reset Checklist"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Readiness Progress Bar Card */}
      <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">PIL Readiness Score</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-blue-400">
              {completedCount} of {totalCount} reviewed
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Readiness Status:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-[4px] border ${
                percentage === 100
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : percentage >= 50
                  ? 'bg-blue-950 text-blue-400 border-blue-800'
                  : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}
            >
              {percentage === 100
                ? 'Filing-Ready'
                : percentage >= 50
                ? 'Pre-Litigation In Progress'
                : 'Initial Evidence Gathering'}
            </span>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              percentage === 100 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-amber-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          General readiness checklist only. Court-specific filing requirements and statutory eligibility must be verified by an enrolled advocate before submission.
        </p>
      </Card>

      {/* J&K High Court PIL Rule Callout */}
      <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <span className="font-semibold text-white">
            Special Statutory Requirement: High Court of J&amp;K and Ladakh PIL Rules (Gazette No. 817/RG)
          </span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The J&amp;K High Court requires detailed mandatory disclosures: (a) petitioner’s identity, occupation, and annual income; (b) specific averment of zero personal profit; (c) disclosure of any earlier litigation filed; and (d) proof of prior written representation served on respondents.
          </p>
        </div>
      </div>

      {/* Checklist Items Accordion / Cards */}
      <div className="space-y-3">
        {PIL_READINESS_CHECKLIST_DATA.map((item, index) => {
          const isChecked = !!checkedItems[item.id];
          const isExpanded = !!expandedItems[item.id];

          return (
            <div
              key={item.id}
              className={`rounded-lg border transition-all ${
                isChecked
                  ? 'bg-slate-900/40 border-slate-800/80'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="p-3.5 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    title={isChecked ? 'Mark Incomplete' : 'Mark Complete'}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-950 text-slate-400 border border-slate-800">
                        FACTOR {index + 1}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">{item.category}</span>
                    </div>
                    <h3
                      className={`text-xs sm:text-sm font-semibold transition-colors ${
                        isChecked ? 'text-slate-400 line-through' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(item.id)}
                  className="p-1 rounded-[4px] hover:bg-slate-800 text-slate-400 transition-colors"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded Factor Details */}
              {isExpanded && (
                <div className="px-3.5 pb-4 pt-1 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-950/40">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider">
                      Regional Note &amp; Precedent
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.regionalNotes}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-blue-400 tracking-wider">
                      Mandatory Documents
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {item.mandatoryDocuments.map((doc, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-purple-400 tracking-wider">
                      Quality Standard &amp; Law
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.qualityStandard}</p>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">Statute: {item.statutoryBasis}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
