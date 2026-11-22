'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import {
  FileEdit,
  Sparkles,
  Download,
  Copy,
  Check,
  AlertTriangle,
  Layers,
  MapPin,
  Scale,
  Calendar,
  FileCheck2,
  FileSpreadsheet
} from 'lucide-react';

export function DraftingStudioModule() {
  const [activeSection, setActiveSection] = useState<string>('synopsis');
  const [selectedAsset, setSelectedAsset] = useState<string>('dal-lake');
  const [copied, setCopied] = useState<boolean>(false);

  // Asset profiles with verified KEW scientific telemetry
  const ASSETS_DATA: Record<string, { name: string; region: string; baseline: string; respondents: string[]; statutes: string[] }> = {
    'dal-lake': {
      name: 'Dal Lake & Catchment Riparian Buffer',
      region: 'Srinagar, Kashmir Valley',
      baseline: 'Dissolved Oxygen: 4.2 mg/L; Fecal Coliform: 2,400 MPN/100mL; Shoreline Encroachment: 18.4% reduction since 1990.',
      respondents: [
        'J&K Lake Conservation and Management Authority (LCMA)',
        'Srinagar Municipal Corporation (SMC)',
        'J&K Pollution Control Committee (JKPCC)',
        'Principal Secretary, Housing & Urban Development Department'
      ],
      statutes: [
        'Section 24, Water (Prevention and Control of Pollution) Act 1974',
        'Wetlands (Conservation and Management) Rules 2017',
        'J&K Water Resources (Regulation and Management) Act 2010'
      ]
    },
    'doodh-ganga': {
      name: 'Doodh Ganga River & Flood Spill Channel',
      region: 'Budgam / Srinagar, Kashmir Valley',
      baseline: 'Untreated Municipal Outfalls: 13 direct drains; Heavy metals (Lead/Iron) elevated; Waste dumping at Chadoora and Natipora.',
      respondents: [
        'Municipal Committee Chadoora & Municipal Committee Budgam',
        'Srinagar Municipal Corporation (SMC)',
        'J&K Pollution Control Committee (JKPCC)',
        'Directorate of Urban Local Bodies Kashmir'
      ],
      statutes: [
        'Solid Waste Management Rules 2016 (Rules 15 & 16)',
        'Section 33A, Water (Prevention and Control of Pollution) Act 1974',
        'Orders of NGT in OA 241/2021 (Raja Muzaffar Bhat v. State of J&K)'
      ]
    },
    'tawi-river': {
      name: 'River Tawi Basin & Industrial Outfalls',
      region: 'Jammu District, Jammu Division',
      baseline: 'BOD: 9.8 mg/L near warehouse outfall; Coliform count exceedance; Untreated discharge from Bari Brahmana industrial estate.',
      respondents: [
        'Jammu Municipal Corporation (JMC)',
        'J&K Pollution Control Committee (JKPCC)',
        'J&K State Industrial Development Corporation (SIDCO)',
        'Principal Secretary, Industries & Commerce Department'
      ],
      statutes: [
        'Environment (Protection) Act 1986',
        'Water (Prevention and Control of Pollution) Act 1974',
        'CPCB Industrial Effluent Discharge Standards (General Discharge Limits)'
      ]
    },
    'hokersar-wetland': {
      name: 'Hokersar Ramsar Wetland Site #1570',
      region: 'Srinagar / Budgam',
      baseline: 'Siltation from Doodh Ganga flood spill; winter waterfowl habitat loss; illegal earth-filling on fringe compartments.',
      respondents: [
        'Department of Wildlife Protection, J&K',
        'J&K Wetland Authority / Forest Ecology & Environment Department',
        'Deputy Commissioner, Budgam & Deputy Commissioner, Srinagar'
      ],
      statutes: [
        'Ramsar Convention Statutory Commitments',
        'Wildlife (Protection) Act 1972 (Schedule Wetlands Protection)',
        'Wetlands (Conservation and Management) Rules 2017'
      ]
    }
  };

  const currentAsset = ASSETS_DATA[selectedAsset];

  const handleCopyDraft = () => {
    const draftText = `
BEFORE THE HON'BLE HIGH COURT OF JAMMU & KASHMIR AND LADAKH
AT SRINAGAR / JAMMU
WRIT PETITION (PUBLIC INTEREST LITIGATION) NO. _____ OF 2026

IN THE MATTER OF:
[Petitioner Name], Citizen / Pro Bono Publico
...PETITIONER

VERSUS

1. UT OF JAMMU & KASHMIR THROUGH PRINCIPAL SECRETARY,
   FOREST, ECOLOGY & ENVIRONMENT DEPARTMENT, CIVIL SECRETARIAT
2. ${currentAsset.respondents[0]}
3. ${currentAsset.respondents[1]}
4. J&K POLLUTION CONTROL COMMITTEE THROUGH ITS CHAIRMAN
...RESPONDENTS

MEMORANDUM OF WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA

1. SYNOPSIS & SUMMARY OF THE CASE:
The Petitioner approaches this Hon'ble Court seeking immediate judicial intervention to arrest the continuous ecological degradation, untreated effluent discharge, and statutory violations at ${currentAsset.name} (${currentAsset.region}).
Scientific baseline recorded by accredited monitoring demonstrates:
${currentAsset.baseline}

2. STATUTORY VIOLATIONS:
The Respondents have failed to execute statutory duties under:
${currentAsset.statutes.map((s) => ` - ${s}`).join('\n')}

3. PRAYERS FOR RELIEF:
Wherefore, it is most respectfully prayed that this Hon'ble Court may be pleased to:
 a) Issue a Writ of Mandamus directing Respondent No. 2 & 3 to plug all direct untreated outfalls into ${currentAsset.name} within a strict timeframe;
 b) Direct JKPCC to submit monthly water quality reports before this Court;
 c) Constitute an independent monitoring committee to verify compliance;
 d) Pass any other relief as deemed fit in the interest of environmental justice.

AND FOR THIS ACT OF KINDNESS, THE PETITIONER SHALL EVER PRAY.
    `.trim();

    navigator.clipboard.writeText(draftText).then(() => {
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
            <span className="p-1.5 rounded-[6px] bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileEdit className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              PIL Drafting Studio &amp; Evidence Assembler
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            A structured petition workspace that compiles source-supported pleadings and connects directly to KEW's verified GIS &amp; scientific telemetry for advocate review.
          </p>
        </div>

        <button
          onClick={handleCopyDraft}
          className="px-3 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 self-start md:self-auto cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Draft Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Assembled Draft</span>
            </>
          )}
        </button>
      </div>

      {/* Mandatory Advocate Review Warning */}
      <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-800/50 flex items-start gap-3 text-xs">
        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <span className="font-semibold text-amber-200">
            Professional Legal Review Strictly Mandatory
          </span>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            This studio provides structured draft outlines based on verified factual evidence. It does not provide legal advice, nor does it replace an enrolled Advocate. The jurisdiction, grounds, and prayers must be settled and signed by qualified legal counsel prior to formal filing.
          </p>
        </div>
      </div>

      {/* Asset Linker Strip */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Link Verified Environmental Asset &amp; Baseline Data
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">KEW Satellite &amp; Lab Data Attached</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'dal-lake', label: 'Dal Lake & Catchment', reg: 'Srinagar' },
            { id: 'doodh-ganga', label: 'Doodh Ganga River', reg: 'Budgam/Srinagar' },
            { id: 'tawi-river', label: 'River Tawi Basin', reg: 'Jammu' },
            { id: 'hokersar-wetland', label: 'Hokersar Ramsar Site', reg: 'Wetland' }
          ].map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset.id)}
              className={`p-2.5 rounded-md text-left border transition-all ${
                selectedAsset === asset.id
                  ? 'bg-emerald-950/70 border-emerald-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-semibold">{asset.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{asset.reg}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Drafting Workspace Navigation & Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Section Navigation */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Petition Structure (8 Sections)
          </h3>
          {[
            { id: 'synopsis', label: '1. Case Synopsis & Overview', icon: FileCheck2 },
            { id: 'chronology', label: '2. Chronology of Facts & Dates', icon: Calendar },
            { id: 'parties', label: '3. Array of Proper Respondents', icon: Scale },
            { id: 'grounds', label: '4. Legal Grounds of Challenge', icon: Scale },
            { id: 'prayers', label: '5. Specific Relief Sought', icon: Sparkles },
            { id: 'interim', label: '6. Urgent Interim Relief (IA)', icon: AlertTriangle },
            { id: 'affidavit', label: '7. Sworn Supporting Affidavit', icon: FileEdit },
            { id: 'annexures', label: '8. Chronological Annexure Index', icon: FileSpreadsheet }
          ].map((sec) => {
            const Icon = sec.icon;
            const isCurrent = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border ${
                  isCurrent
                    ? 'bg-purple-950/70 border-purple-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-purple-400' : 'text-slate-500'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section Editor & Content Display */}
        <div className="lg:col-span-8">
          <Card className="p-5 bg-slate-900/90 border-slate-800 rounded-lg space-y-4">
            {activeSection === 'synopsis' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 1: Case Synopsis</h4>
                  <span className="text-[10px] font-mono text-emerald-400">High Court Standard Format</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Brief summary of the public interest issue, ecological significance of {currentAsset.name}, administrative neglect, and the urgent necessity of writ jurisdiction.
                </p>
                <div className="p-3 bg-slate-950 rounded-md border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300 leading-relaxed">
                  <p className="text-emerald-400 font-semibold">// Assembled Synopsis Excerpt:</p>
                  <p>
                    "The Petitioner, a resident and environmental researcher, brings this petition under Article 226 to protect {currentAsset.name}. Despite statutory notifications under the Water Act 1974 and Wetland Rules 2017, the respondents have permitted untreated municipal sewage and unauthorized encroachments to degrade this vital Himalayan ecological asset..."
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'chronology' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 2: List of Dates &amp; Events</h4>
                  <span className="text-[10px] font-mono text-blue-400">Chronological Table</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="font-mono text-emerald-400 shrink-0">15.03.2024</span>
                    <span className="text-slate-300">
                      Baseline scientific water sampling indicates Dissolved Oxygen drop below standard 5.0 mg/L threshold.
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="font-mono text-emerald-400 shrink-0">10.06.2024</span>
                    <span className="text-slate-300">
                      Formal written representation submitted via Registered Speed Post to Chairman SPCB and Municipal Commissioner.
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="font-mono text-emerald-400 shrink-0">18.08.2024</span>
                    <span className="text-slate-300">
                      RTI response received confirming zero functional sewage treatment plants servicing the catchment outfalls.
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="font-mono text-amber-400 shrink-0">Current</span>
                    <span className="text-slate-300">
                      Failure of respondents to act necessitates approaching this Hon'ble Court.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'parties' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 3: Array of Respondents</h4>
                  <span className="text-[10px] font-mono text-indigo-400">Order I Rule 10 CPC</span>
                </div>
                <p className="text-slate-300">
                  Proper official designations for {currentAsset.name}:
                </p>
                <div className="space-y-1.5">
                  {currentAsset.respondents.map((resp, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-2">
                      <span className="text-emerald-400 font-mono font-bold">R-{i + 1}:</span>
                      <span className="text-slate-200">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'grounds' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 4: Legal Grounds</h4>
                  <span className="text-[10px] font-mono text-purple-400">Statutory Provisions</span>
                </div>
                <div className="space-y-2">
                  {currentAsset.statutes.map((stat, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-purple-400 font-semibold font-mono">GROUND {String.fromCharCode(65 + i)}:</span>
                      <p className="text-slate-300">
                        Violation of statutory mandate under <strong className="text-white">{stat}</strong>. The respondents have abdicated their public trust obligations to preserve the watercourse and surrounding ecology.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'prayers' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 5: Specific Relief Sought</h4>
                  <span className="text-[10px] font-mono text-amber-400">Enforceable Prayers</span>
                </div>
                <p className="text-slate-300">
                  Avoid general prayers like "protect the environment". Specify verifiable engineering directives:
                </p>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2 text-slate-300 font-mono text-[11px]">
                  <p>1. Direct Respondent No. 2 to commission interception &amp; diversion works within 6 months;</p>
                  <p>2. Direct Respondent No. 3 (JKPCC) to conduct fortnightly water testing and publish results on public dashboard;</p>
                  <p>3. Restrain any fresh construction within 200 meters of the watercourse buffer.</p>
                </div>
              </div>
            )}

            {activeSection === 'interim' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 6: Interim Relief Application (IA)</h4>
                  <span className="text-[10px] font-mono text-rose-400">Urgent Injunction</span>
                </div>
                <p className="text-slate-300">
                  Prayer for immediate stay to prevent irreversible ecological harm pending final hearing:
                </p>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                  "Ad-interim ex-parte direction restraining respondents from dumping solid waste or altering the wetland embankments until the next date of hearing."
                </div>
              </div>
            )}

            {activeSection === 'affidavit' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 7: Sworn Affidavit &amp; Verification</h4>
                  <span className="text-[10px] font-mono text-teal-400">Rule 817/RG Format</span>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300">
                  <p>"I, [Name], aged ___ years, do hereby solemnly affirm and state on oath as under:</p>
                  <p>1. That I am the petitioner and am conversant with the facts of the case.</p>
                  <p>2. That I have no personal motive, commercial interest, or private dispute with the respondents."</p>
                </div>
              </div>
            )}

            {activeSection === 'annexures' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="font-bold text-white text-sm">Section 8: Annexure Index &amp; Exhibits</h4>
                  <span className="text-[10px] font-mono text-sky-400">Certified Exhibits</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span className="text-emerald-400">Annexure P-1:</span>
                    <span className="text-slate-300">Georeferenced Site Map &amp; Sentinel-2 Satellite Transect</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span className="text-emerald-400">Annexure P-2:</span>
                    <span className="text-slate-300">Certified Laboratory Water Analysis Report (NABL)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span className="text-emerald-400">Annexure P-3:</span>
                    <span className="text-slate-300">Copy of Written Representation dated 10.06.2024 &amp; Postal Receipt</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
