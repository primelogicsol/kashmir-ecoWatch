'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  Scale,
  ShieldCheck,
  Lock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  HelpCircle,
  Layers
} from 'lucide-react';

export default function HwcMethodologyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Methodology' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                STANDARDS
              </span>
              <span>Scientific Data Governance</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              Scientific Methodology & Sensitive Data Standards
            </span>
          </>
        }
        subtitle="Verification taxonomy, coordinate generalization standards, ethical handling of human casualties, and compliance with the IUCN SSC Guidelines on Human-Wildlife Conflict."
        icon={<Scale className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Section 1: IUCN SSC Alignment */}
        <Card className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <Scale className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">
              1. Alignment with IUCN SSC Guidelines on Human-Wildlife Conflict & Coexistence (2023)
            </h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kashmir EcoWatch structures all conflict intelligence according to the global principles established by the IUCN Species Survival Commission (SSC) Human-Wildlife Conflict & Coexistence Specialist Group. The foundational tenets governing KEW-HWC include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-white/5 space-y-1">
              <strong className="text-white block font-mono text-[11px] text-emerald-400">Principle A: Understanding Social Context</strong>
              <p className="text-slate-400 leading-relaxed">
                Conflict is fundamentally shaped by social, historical, and economic realities between community groups and government authorities, not solely by animal behavior. Interventions must address local grievances, compensation delays, and livelihoods.
              </p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-white/5 space-y-1">
              <strong className="text-white block font-mono text-[11px] text-amber-400">Principle B: Zero Unvalidated Risk Scoring</strong>
              <p className="text-slate-400 leading-relaxed">
                KEW strictly rejects publishing unvalidated "live attack prediction scores" or village danger ratings. Unsubstantiated alarmist scoring causes community panic, invites retaliatory poaching, and undermines conservation ethics.
              </p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-white/5 space-y-1">
              <strong className="text-white block font-mono text-[11px] text-cyan-400">Principle C: Prioritizing Non-Lethal Coexistence</strong>
              <p className="text-slate-400 leading-relaxed">
                Technical deterrence (predator-proof corrals, solar fencing, bear-proof waste management) must be prioritized over lethal removal or indiscriminate trapping, ensuring species survival alongside community safety.
              </p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-white/5 space-y-1">
              <strong className="text-white block font-mono text-[11px] text-purple-400">Principle D: Multi-Stakeholder Ownership</strong>
              <p className="text-slate-400 leading-relaxed">
                Solutions must be co-designed with affected farming communities, pastoralists, and forest departments to ensure sustained maintenance and long-term local stewardship.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 2: Verification Taxonomy */}
        <Card className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">
              2. Scientific Verification & Evidence Classification Hierarchy
            </h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every record in the KEW Incident Registry is classified according to a five-tier evidence standard to prevent fabricated claims and ensure data transparency:
          </p>
          <div className="space-y-2 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] shrink-0">
                Level-1
              </span>
              <div>
                <strong className="text-white">Direct Physical / Veterinary Examination:</strong> Official post-incident investigation by Wildlife Protection Department staff, forensic veterinarians, or certified field biologists verifying claw/bite marks, hair samples, or necropsy results.
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-[4px] bg-teal-500/20 text-teal-300 font-mono font-bold text-[10px] shrink-0">
                Level-2
              </span>
              <div>
                <strong className="text-white">High-Resolution Camera Trap / Forensics:</strong> Time-stamped camera-trap imagery, thermal telemetry, or high-definition photographic evidence substantiating individual animal presence at the encounter site.
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-[4px] bg-blue-500/20 text-blue-300 font-mono font-bold text-[10px] shrink-0">
                Level-3
              </span>
              <div>
                <strong className="text-white">Official Department Dispatch Log:</strong> Verified entry in the range emergency dispatch register, hospital trauma registry, or municipal wildlife response team dispatch log.
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px] shrink-0">
                Level-4
              </span>
              <div>
                <strong className="text-white">Credible Multi-Witness / Village Committee Log:</strong> Corroborated report attested by village panchayat leaders, pastoralist cooperatives (e.g. SNT), or multi-party community observers.
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-[4px] bg-slate-700 text-slate-300 font-mono font-bold text-[10px] shrink-0">
                Level-5
              </span>
              <div>
                <strong className="text-white">Unverified Community Submission:</strong> Initial public notification queued for independent investigation; tagged as "Under Review" and kept private from public GIS layers until corroborated.
              </div>
            </div>
          </div>
        </Card>

        {/* Section 3: Sensitive Ecological Information Standard */}
        <Card className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">
              3. KEW Sensitive Ecological Information Policy (Coordinate Fuzzing & Privacy)
            </h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            To prevent retaliatory killings of threatened predators (e.g., snow leopards, bears, wolves) and protect the dignity and privacy of affected farming families, KEW enforces multi-layered data protection:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
            <li>
              <strong className="text-white">Coordinate Fuzzing:</strong> All publicly accessible GIS layers, APIs, and exports map raw GPS coordinates to a standard 0.1° (~10km) landscape polygon centroid. Precise GPS coordinates are permanently restricted to authenticated wildlife researchers and official forest authorities.
            </li>
            <li>
              <strong className="text-white">Zero Victim Identification:</strong> Victim names, exact street addresses, and private telephone numbers are stripped prior to ingestion into the database.
            </li>
            <li>
              <strong className="text-white">Den & Nest Concealment:</strong> Locations of active breeding dens, maternal caves, or diurnal bedding sites are strictly prohibited from public presentation.
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
