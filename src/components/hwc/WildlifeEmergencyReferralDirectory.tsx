'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  Phone,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  X,
  Search,
  Building2,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EMERGENCY_DIRECTORY_ENTRIES } from '@/data/hwc-emergency-directory';

interface QuickContact {
  id: string;
  region: string;
  label: string;
  jurisdiction: string;
  displayNumber: string;
  telNumber: string;
  verificationBadge: string;
  lastVerified: string;
}

const QUICK_CONTACTS: QuickContact[] = [
  {
    id: 'kashmir-central',
    region: 'Kashmir Valley',
    label: 'Kashmir Central Control',
    jurisdiction: 'Srinagar · Budgam · Ganderbal',
    displayNumber: '0194-2452026',
    telNumber: '+911942452026',
    verificationBadge: 'Officially Published',
    lastVerified: 'DWP Order 2024 / Ref 2026',
  },
  {
    id: 'toll-free',
    region: 'J&K UT Wide',
    label: 'Toll-Free Control',
    jurisdiction: 'All J&K Forest & Wildlife Ranges',
    displayNumber: '1800-180-7177',
    telNumber: '18001807177',
    verificationBadge: 'Toll-Free Emergency',
    lastVerified: 'Statutory Wildlife Line',
  },
  {
    id: 'jammu-division',
    region: 'Jammu',
    label: 'Jammu Wildlife Control',
    jurisdiction: 'Manda Hills · Chenab & Pir Panjal',
    displayNumber: '0191-2544575',
    telNumber: '+911912544575',
    verificationBadge: 'Officially Published',
    lastVerified: 'DWP Order 2024 / Ref 2026',
  },
  {
    id: 'ladakh-ut',
    region: 'Ladakh',
    label: 'Ladakh Wildlife Rescue',
    jurisdiction: 'Leh & Kargil Wildlife Ranges',
    displayNumber: '01982-252171',
    telNumber: '+911982252171',
    verificationBadge: 'Officially Published',
    lastVerified: 'UT Administration 2026',
  },
];

export function WildlifeEmergencyReferralDirectory() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [directorySearch, setDirectorySearch] = useState('');

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredDirectory = EMERGENCY_DIRECTORY_ENTRIES.filter((c) => {
    if (!directorySearch) return true;
    const q = directorySearch.toLowerCase();
    return (
      c.district.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.officeName.toLowerCase().includes(q) ||
      c.formattedDisplayNumber.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <section className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-5 sm:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* ── 1. HEADER ZONE ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-amber-400 px-2 py-0.5 rounded-[4px] bg-amber-950/60 border border-amber-500/30">
                  Referral Directory
                </span>
                <span className="text-[10px] font-mono text-amber-300/80">Statutory Response Contacts</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight mt-0.5">
                Wildlife Emergency Referral Directory
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 max-w-md sm:text-right">
            Immediate official wildlife-response contacts for rapid reporting of dangerous encounters.
          </p>
        </div>

        {/* ── 2. QUICK REGIONAL CONTACT GRID (4 Cards) ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
          {QUICK_CONTACTS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/40 rounded-[6px] p-3.5 flex flex-col justify-between transition-all group hover:shadow-lg hover:shadow-amber-950/30"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400/90 tracking-wider truncate">
                    {item.label}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-[4px] bg-white/5 border border-white/10 text-slate-400 shrink-0">
                    {item.verificationBadge}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mb-2">
                  {item.jurisdiction}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                {/* Large Bold Phone Number */}
                <div className="text-base sm:text-lg font-mono font-bold text-white tracking-wide mb-2 group-hover:text-amber-300 transition-colors">
                  {item.displayNumber}
                </div>

                {/* Actions: Tap-to-call & Copy */}
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${item.telNumber}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-[11px] font-bold transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.displayNumber)}
                    className="p-1.5 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy phone number"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="text-[9px] font-mono text-slate-500 mt-2 flex items-center justify-between">
                  <span>Verified: {item.lastVerified}</span>
                  {copiedId === item.id && (
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. NOTICE PANEL ─────────────────────────────────────────────── */}
        <div className="bg-slate-950/80 border border-amber-500/25 rounded-[6px] p-3 sm:p-3.5 flex items-start gap-2.5 my-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-slate-300">
            <strong className="text-amber-300 font-semibold">Important Notice: </strong>
            Kashmir EcoWatch is an independent scientific research and referral platform, not an emergency dispatcher. Active wildlife encounters should be reported directly to the appropriate official department control room above.
          </div>
        </div>

        {/* ── 4. CTA ROW ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-amber-500/20">
          <div className="text-[11px] text-slate-400">
            Jurisdiction covers 42 districts across Kashmir, Jammu, Ladakh, AJK &amp; Gilgit-Baltistan.
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Link
              href="/protected-network/human-wildlife-conflict/report"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[6px] bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 text-center"
            >
              <span>View All Official Authority Helplines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDirectoryOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[6px] border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs font-semibold transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Open Emergency Directory</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 5. FULL 42-DISTRICT MODAL (When "Open Emergency Directory" clicked) ── */}
      {isDirectoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Official Wildlife Emergency Referral Directory
                  </h3>
                  <div className="text-[11px] text-slate-400">
                    District-level statutory control rooms across 5 Western Himalayan regions
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDirectoryOpen(false)}
                className="p-1.5 rounded-[4px] text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-3 bg-slate-900 border-b border-white/5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by district name, region, or office (e.g. Srinagar, Baramulla, Leh)..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Modal Directory List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-white/5 space-y-3">
              {filteredDirectory.length > 0 ? (
                filteredDirectory.map((c) => (
                  <div key={c.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{c.district}</span>
                        <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-500/30">
                          {c.region}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 px-1 rounded bg-white/5">
                          {c.serviceCategory}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">{c.officeName}</div>
                      <div className="text-[10px] text-slate-400">{c.physicalLocation} · {c.operatingHours}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white">{c.formattedDisplayNumber}</span>
                      <a
                        href={`tel:${c.e164PhoneNumber}`}
                        className="px-2.5 py-1 rounded-[4px] bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-500">
                  No emergency directory entries match &ldquo;{directorySearch}&rdquo;.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Notice: Kashmir EcoWatch is not an emergency dispatcher.</span>
              <button
                type="button"
                onClick={() => setIsDirectoryOpen(false)}
                className="px-3 py-1 rounded-[4px] bg-white/10 text-white hover:bg-white/20 text-xs"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
