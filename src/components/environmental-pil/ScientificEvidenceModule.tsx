'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import {
  SCIENTIFIC_EVIDENCE_STANDARDS,
  ScientificEvidenceStandard
} from '@/data/environmental-litigation-support';
import {
  FlaskConical,
  Microscope,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
  Database
} from 'lucide-react';
import Link from 'next/link';

export function ScientificEvidenceModule() {
  const [selectedStandard, setSelectedStandard] = useState<ScientificEvidenceStandard>(
    SCIENTIFIC_EVIDENCE_STANDARDS[0]
  );
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  const handleCopyChainOfCustody = () => {
    const template = `
================================================================================
KASHMIR ECOWATCH (KEW) - ENVIRONMENTAL EVIDENCE CHAIN OF CUSTODY LOG
================================================================================
CASE / PETITION IDENTIFIER: __________________________________________________
SAMPLING LOCATION NAME: _______________________________________________________
GPS COORDINATES: LAT: ___° ___' ___" N | LONG: ___° ___' ___" E (WGS 84)
ELEVATION: _____ METERS MSL | ACCURACY: ± ___ METERS

1. SAMPLE COLLECTION METADATA:
 - Date & Time Collected: ____ / ____ / 2026 at ____:____ IST
 - Parameter Target: [ ] Water Quality  [ ] Air Filter  [ ] Noise Log  [ ] Soil Sample
 - Sample Collection Method: Standard IS / CPCB Protocol Number: _________________
 - Container Type: Sterilized Amber Glass (1L) / Teflon Filter / Continuous Digital Log
 - Preservation Technique: Field Chilled at 4°C with Ice Packs / Acidified to pH < 2

2. FIELD OFFICER & SAMPLER DETAILS:
 - Sampler Name & Designation: ________________________________________________
 - Organization / Affiliation: _________________________________________________
 - Neutral Witness Present: _________________________ Signature: ________________

3. LABORATORY CUSTODY RELINQUISHMENT & RECEIPT:
 - Relinquished By (Signature): ______________________ Date/Time: _______________
 - Received at Lab By (Signature): ___________________ Date/Time: _______________
 - Testing Laboratory Name: ___________________________________________________
 - NABL Accreditation Certificate No: ________________ Valid Till: ______________
 - Testing Method Employed (APHA / IS / CPCB): ________________________________

4. FORENSIC ADMISSIBILITY CERTIFICATE (SECTION 65B IEA / SECTION 63 BSA 2023):
"I hereby certify that the electronic telemetry, GPS geotags, and laboratory test
results attached hereto were generated using certified hardware in normal working
condition without unauthorized digital tampering or data interpolation."
Signature of Lab Director / Authorized Signatory: ______________________________
================================================================================
    `.trim();

    navigator.clipboard.writeText(template).then(() => {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[6px] bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Expert &amp; Scientific Evidence Integration
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Admissibility criteria under Section 45 Evidence Act, NABL / ISO 17025 laboratory protocols, satellite remote sensing provenance, and forensic chain of custody.
          </p>
        </div>

        <button
          onClick={handleCopyChainOfCustody}
          className="px-3 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 self-start md:self-auto cursor-pointer transition-colors"
        >
          {copiedTemplate ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Template Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Chain of Custody Log</span>
            </>
          )}
        </button>
      </div>

      {/* Admissibility Standards Warning Banner */}
      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <p className="text-slate-300 leading-relaxed text-[11px]">
          <strong>Judicial Evidentiary Standard:</strong> Environmental courts (NGT and High Courts) routinely reject citizen petitions relying solely on uncalibrated consumer sensors or unverified social media photographs. Evidence packages must maintain a strict chain of custody, accredited laboratory certifications (NABL / ISO 17025), and calibrated satellite imagery.
        </p>
      </div>

      {/* Domain Standards Selector & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Domain Cards List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Scientific Domains ({SCIENTIFIC_EVIDENCE_STANDARDS.length})
          </h3>

          <div className="space-y-2">
            {SCIENTIFIC_EVIDENCE_STANDARDS.map((std) => {
              const isSelected = selectedStandard.category === std.category;
              return (
                <div
                  key={std.category}
                  onClick={() => setSelectedStandard(std)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-950/70 border-teal-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <h4 className="text-xs font-bold text-white">{std.category}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">{std.parameter}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Domain Inspector */}
        <div className="lg:col-span-8">
          <Card className="p-5 bg-slate-900/90 border-slate-800 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-teal-400">
                  SCIENTIFIC DOMAIN
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{selectedStandard.category}</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">NABL / ISO Admissible</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-md bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                  Monitored Parameters
                </span>
                <p className="font-semibold text-white">{selectedStandard.parameter}</p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-teal-400 font-semibold">
                  Standard Testing Methodology
                </span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                  {selectedStandard.standardMethod}
                </p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold">
                  Court Admissibility Requirement
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedStandard.admissibilityRequirement}</p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold">
                  Chain of Custody &amp; Forensic Protocol
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedStandard.chainOfCustodyProtocol}</p>
              </div>

              <div className="p-3 rounded-md bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold">
                  KEW Live Integration Source
                </span>
                <p className="text-emerald-300 font-medium">{selectedStandard.kewDataSource}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* KEW Telemetry & Evidence Packages Gateway */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          Direct Cross-Links to KEW Environmental Telemetry
        </h3>
        <p className="text-xs text-slate-400">
          Export verified baseline datasets, exceedance logs, and satellite indices directly from KEW monitoring portals into your evidence annexures:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <Link
            href="/environmental-monitoring/transportation-pollution"
            className="p-3 rounded-md bg-slate-950 border border-slate-800 hover:border-emerald-500 text-xs transition-colors group"
          >
            <div className="font-semibold text-white group-hover:text-emerald-400">Transportation &amp; Air</div>
            <div className="text-[10px] text-slate-500 mt-0.5">PM2.5, NOx &amp; VAHAN Fleet</div>
          </Link>

          <Link
            href="/environmental-monitoring/noise-pollution"
            className="p-3 rounded-md bg-slate-950 border border-slate-800 hover:border-emerald-500 text-xs transition-colors group"
          >
            <div className="font-semibold text-white group-hover:text-emerald-400">Noise &amp; Acoustics</div>
            <div className="text-[10px] text-slate-500 mt-0.5">LAeq, DNPBS &amp; Silence Zones</div>
          </Link>

          <Link
            href="/resources/environmental-pil?tab=gis-atlas"
            className="p-3 rounded-md bg-slate-950 border border-slate-800 hover:border-emerald-500 text-xs transition-colors group"
          >
            <div className="font-semibold text-white group-hover:text-emerald-400">Judicial GIS Atlas</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Sentinel-2 Wetland Transects</div>
          </Link>

          <Link
            href="/resources/environmental-pil?tab=research-open-data"
            className="p-3 rounded-md bg-slate-950 border border-slate-800 hover:border-emerald-500 text-xs transition-colors group"
          >
            <div className="font-semibold text-white group-hover:text-emerald-400">Open Data Export</div>
            <div className="text-[10px] text-slate-500 mt-0.5">JSON / CSV Archive Records</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
