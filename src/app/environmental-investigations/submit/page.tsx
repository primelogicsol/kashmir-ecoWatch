'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, PlusCircle, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import {
  detectKewSubmissionOrigin,
  KewEditorialConsiderationConsent,
} from '@/components/common/KewEditorialConsiderationConsent';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { INVESTIGATION_DOMAINS } from '@/data/environmental-investigations';
import { InvestigationDomainId } from '@/types/environmental-investigations';

export default function SubmitInvestigationPage() {
  const [title, setTitle] = useState('');
  const [domainId, setDomainId] = useState<InvestigationDomainId>('01-lakes-limnology');
  const [locationName, setLocationName] = useState('');
  const [district, setDistrict] = useState('Srinagar');
  const [temporalPeriod, setTemporalPeriod] = useState('2015–2026');
  const [issueDescription, setIssueDescription] = useState('');
  const [documentedSourcesProvided, setDocumentedSourcesProvided] = useState('');
  const [proposerName, setProposerName] = useState('');
  const [proposerEmail, setProposerEmail] = useState('');
  const [proposerAffiliation, setProposerAffiliation] = useState('');
  const [editorialConsent, setEditorialConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    trackingCode: string;
    opsTrackingId?: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/environmental-investigations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_proposal',
          title,
          domainId,
          locationName,
          districts: [district],
          temporalPeriod,
          issueDescription,
          documentedSourcesProvided,
          proposerName,
          proposerEmail,
          proposerAffiliation,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Submission failed');
      }

      // Also register in KEW Unified Operations Queue for central admin SLA tracking
      let opsTrackingId: string | undefined;
      try {
        const opsRes = await fetch('/api/operations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourcePage: '/environmental-investigations/submit',
            title: `[KEW-EIAI Proposal] ${title}`,
            category: 'Environmental Investigation Intake',
            priority: 'HIGH',
            ownerName: proposerName,
            ownerEmail: proposerEmail,
            organization: proposerAffiliation,
            district,
            details: `Location: ${locationName} (${temporalPeriod})\nDomain: ${domainId}\nIssue: ${issueDescription}\nSources: ${documentedSourcesProvided}`,
            originatingPlatform: detectKewSubmissionOrigin(),
            editorialConsiderationConsent: editorialConsent,
          }),
        });
        const opsJson = await opsRes.json();
        if (opsJson?.record?.trackingId) {
          opsTrackingId = opsJson.record.trackingId;
        }
      } catch {}

      setResult({
        trackingCode: json.proposal.trackingCode,
        opsTrackingId,
        message: json.message,
      });
    } catch (err: any) {
      setError(err?.message || 'Unable to submit proposal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI STAGE 01 DOCUMENTARY & SCIENTIFIC INTAKE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Submit Investigation' },
        ]}
        icon={<PlusCircle className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Propose an Environmental Investigation
            </span>
          </div>
        }
        subtitle="Submit a scientifically scoped investigation subject, archival audit report, EIA dossier, satellite observation, or official institutional clarification for formal KEW-EIAI review."
        images={['/images/biodiversity/biodiversity-field-camera-trap.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 max-w-4xl space-y-6">
        <Card className="border-emerald-500/30 bg-slate-900">
          <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">
                Documentary Evidence &amp; Right-of-Reply Intake Criteria
              </strong>
              KEW-EIAI initiates investigations based on verifiable scientific questions, published studies, statutory audits, judicial filings, or remote-sensing anomalies — not unsubstantiated allegations. Institutional representatives may also use this portal to submit official clarifications and technical reports.
            </div>
          </div>
        </Card>

        {result ? (
          <Card padding="lg" className="border-emerald-500/50 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6" />
              <span>Investigation Scoping Dossier Registered</span>
            </div>
            <p className="text-sm text-slate-200">{result.message}</p>
            <div className="p-3 bg-slate-950 rounded-lg border border-white/10 font-mono text-xs space-y-1">
              <div>
                KEW-EIAI Proposal Code:{' '}
                <strong className="text-emerald-400">{result.trackingCode}</strong>
              </div>
              {result.opsTrackingId && (
                <div>
                  Unified Admin Queue Ticket:{' '}
                  <strong className="text-cyan-400">{result.opsTrackingId}</strong>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/environmental-investigations/reports">
                <Button size="sm">Return to Investigation Portfolio</Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setTitle('');
                  setIssueDescription('');
                  setDocumentedSourcesProvided('');
                }}
              >
                Submit Another Dossier
              </Button>
            </div>
          </Card>
        ) : (
          <Card padding="lg">
            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              {error && (
                <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-300 rounded-sm text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-200 mb-1.5">
                  Proposed Investigation Subject / Intervention Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Doodhganga Riverbed Extraction, Filtration Plant Intake Turbidity & Floodway Incision"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">
                    Primary Investigation Domain *
                  </label>
                  <select
                    value={domainId}
                    onChange={(e) => setDomainId(e.target.value as InvestigationDomainId)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {INVESTIGATION_DOMAINS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.code}. {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">
                    Primary District / Sub-Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g., Budgam, Srinagar, Anantnag"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">
                    Historical / Temporal Period
                  </label>
                  <input
                    type="text"
                    value={temporalPeriod}
                    onChange={(e) => setTemporalPeriod(e.target.value)}
                    placeholder="e.g., 2010–2026"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1.5">
                  Watershed, Landscape or Specific Site Boundary *
                </label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g., Chadoora–Kralpora reach of Doodhganga sub-watershed"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1.5">
                  Scientific Scoping Question &amp; Observed Ecological / Institutional Issue *
                </label>
                <textarea
                  rows={4}
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="State the specific physical, hydrological, ecological, or regulatory mechanism requiring multidisciplinary investigation..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1.5">
                  Traceable Documentary Sources (DOIs, CAG Reports, NGT/Court Orders, DPRs, Satellite Dates) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={documentedSourcesProvided}
                  onChange={(e) => setDocumentedSourcesProvided(e.target.value)}
                  placeholder="List published papers, official audit/order references, or dataset links..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={proposerName}
                    onChange={(e) => setProposerName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={proposerEmail}
                    onChange={(e) => setProposerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">
                    Institution / Affiliation
                  </label>
                  <input
                    type="text"
                    value={proposerAffiliation}
                    onChange={(e) => setProposerAffiliation(e.target.value)}
                    placeholder="University, Agency, NGO, or Independent"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-white/15 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <KewEditorialConsiderationConsent
                id="submit-investigation-hd-consent"
                checked={editorialConsent}
                onChange={setEditorialConsent}
              />

              <div className="pt-2 flex justify-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Registering Scoping Dossier...' : 'Submit for Stage 01 Scoping Review'}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </main>
  );
}
