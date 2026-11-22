'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { LEGAL_AID_PROVIDERS, LegalAidProvider } from '@/data/environmental-litigation-support';
import {
  Handshake,
  Search,
  Filter,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Shield,
  Info
} from 'lucide-react';

export function LegalAidModule() {
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProviders = LEGAL_AID_PROVIDERS.filter((p) => {
    if (regionFilter !== 'ALL') {
      if (regionFilter === 'JK' && !p.region.includes('Jammu') && !p.region.includes('Kashmir')) return false;
      if (regionFilter === 'INDIA' && !p.region.includes('India')) return false;
      if (regionFilter === 'PAKISTAN' && !p.region.includes('Pakistan') && !p.region.includes('Cross-Territory')) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.coverage.toLowerCase().includes(q) ||
        p.typeOfSupport.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[6px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Handshake className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Legal Aid, Pro Bono &amp; University Clinics Directory
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Verified statutory legal services authorities, voluntary pro bono counsel, public interest law groups, and academic clinics across the Himalayan basin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-[6px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
            {LEGAL_AID_PROVIDERS.length} Verified Providers
          </span>
        </div>
      </div>

      {/* Verification Notice Banner */}
      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <p className="text-slate-300 leading-relaxed text-[11px]">
          <strong>Independent Directory Notice:</strong> A resource appearing in this directory does not constitute a prior commitment to represent any specific petitioner or accept a case. Every legal aid authority or clinic reviews cases individually based on statutory means criteria and public merit.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Jurisdiction:
          </span>
          {[
            { id: 'ALL', label: 'All Providers' },
            { id: 'JK', label: 'J&K / Ladakh' },
            { id: 'INDIA', label: 'Pan-India (NALSA)' },
            { id: 'PAKISTAN', label: 'Pakistan / AJK / GB' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRegionFilter(tab.id)}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-medium whitespace-nowrap transition-colors ${
                regionFilter === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search providers or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProviders.map((provider) => (
          <Card
            key={provider.id}
            className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-indigo-400">
                  {provider.region}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                  {provider.feeStructure}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{provider.name}</h3>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] uppercase font-mono text-slate-500">Coverage &amp; Support:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{provider.typeOfSupport}</p>
              </div>

              <div className="space-y-1 text-xs bg-slate-950/60 p-2.5 rounded-md border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono text-amber-400">Eligibility Criteria:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{provider.eligibilityCriteria}</p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] uppercase font-mono text-rose-400">Limitations:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">{provider.limitations}</p>
              </div>
            </div>

            {/* Contact & Link Footer */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex flex-col gap-1 text-[11px] text-slate-400 font-mono">
                {provider.contactDetails.phone && (
                  <div className="flex items-center gap-1.5 truncate">
                    <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{provider.contactDetails.phone}</span>
                  </div>
                )}
                {provider.contactDetails.email && (
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{provider.contactDetails.email}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500 font-mono">
                  Verified: {provider.verifiedDate}
                </span>
                <a
                  href={provider.contactDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-medium border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
