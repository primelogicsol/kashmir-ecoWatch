'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  PlusCircle,
  ShieldCheck,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';
import {
  EventModeId,
  INSTITUTION_TYPE_OPTIONS,
  InstitutionTypeOption,
} from '@/types/virtual-hall';

const OTHER_INSTITUTION_VALUE = '__other_custom__';

interface SelectablePartnerOption {
  id: string;
  name: string;
  category: string;
  domain: string;
  website: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
}

export default function HostAConferencePage() {
  const [partnerOptions, setPartnerOptions] = useState<SelectablePartnerOption[]>(() =>
    VERIFIED_INSTITUTIONS.map((inst) => ({
      id: inst.id,
      name: inst.name,
      category: inst.category,
      domain: inst.domain,
      website: inst.website,
      contactName: inst.authorizedRep.name,
      contactTitle: inst.authorizedRep.title,
      contactEmail: inst.authorizedRep.email,
    }))
  );
  const [selectedInst, setSelectedInst] = useState<string>(VERIFIED_INSTITUTIONS[0].id);

  // Dynamic Custom Institution Entry Fields (shown when "Other Institution (Custom Entry)" is selected)
  const [customInstName, setCustomInstName] = useState('');
  const [customInstType, setCustomInstType] = useState<InstitutionTypeOption>('Environmental NGO');
  const [customInstTypeOther, setCustomInstTypeOther] = useState('');
  const [customCountry, setCustomCountry] = useState('');
  const [customCityRegion, setCustomCityRegion] = useState('');
  const [customWebsite, setCustomWebsite] = useState('');
  const [customRepName, setCustomRepName] = useState('');
  const [customContactEmail, setCustomContactEmail] = useState('');

  // Event Application Fields (preserved)
  const [eventMode, setEventMode] = useState<EventModeId>('scientific_conference');
  const [confTitle, setConfTitle] = useState('');
  const [startDate, setStartDate] = useState('2027-06-15');
  const [endDate, setEndDate] = useState('2027-06-16');
  const [requestedDelegates, setRequestedDelegates] = useState(10);
  const [requestedSpeakers, setRequestedSpeakers] = useState(2);
  const [requestedTracks] = useState(1);
  const [scope, setScope] = useState('');
  const [funding, setFunding] = useState('Non-commercial academic hosting ($0 KEW platform fee).');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<{
    id: string;
    institutionName: string;
    verificationStatus: string;
    isCustomInstitution: boolean;
    conferenceTitle: string;
    allocatedDelegates: number;
    allocatedSpeakers: number;
    allocatedTracks: number;
    reviewNotes?: string;
    capped: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [phaseLimits, setPhaseLimits] = useState({ delegates: 10, speakers: 2, tracks: 1 });

  const isCustomInstitution = selectedInst === OTHER_INSTITUTION_VALUE;

  useEffect(() => {
    fetch('/api/webinars/admin?scope=public', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (d?.capacityProfile) {
          setPhaseLimits({
            delegates: d.capacityProfile.maxConcurrentDelegates,
            speakers: d.capacityProfile.maxInteractiveSpeakers,
            tracks: d.capacityProfile.maxScientificTracks,
          });
        }
        if (Array.isArray(d?.selectablePartnerInstitutions) && d.selectablePartnerInstitutions.length > 0) {
          setPartnerOptions(d.selectablePartnerInstitutions);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const instObj =
      partnerOptions.find((i) => i.id === selectedInst) || partnerOptions[0];

    const payload = isCustomInstitution
      ? {
          action: 'submit_hosting_application',
          isCustomInstitution: true,
          institutionId: OTHER_INSTITUTION_VALUE,
          institutionName: customInstName.trim(),
          institutionTypeSelection: customInstType,
          customInstitutionType: customInstType === 'Other' ? customInstTypeOther.trim() : undefined,
          institutionCategory:
            customInstType === 'Other' ? customInstTypeOther.trim() : customInstType,
          country: customCountry.trim(),
          cityRegion: customCityRegion.trim(),
          website: customWebsite.trim(),
          contactName: customRepName.trim(),
          contactTitle: 'Authorized Representative',
          contactEmail: customContactEmail.trim(),
          conferenceTitle: confTitle,
          eventMode,
          proposedStart: startDate,
          proposedEnd: endDate,
          requestedDelegates,
          requestedSpeakers,
          requestedTracks,
          scientificScope: scope,
          fundingDisclosure: funding,
        }
      : {
          action: 'submit_hosting_application',
          isCustomInstitution: false,
          institutionId: instObj.id,
          institutionName: instObj.name,
          institutionCategory: instObj.category,
          domain: instObj.domain,
          website: instObj.website,
          contactName: instObj.contactName,
          contactTitle: instObj.contactTitle,
          contactEmail: instObj.contactEmail,
          conferenceTitle: confTitle,
          eventMode,
          proposedStart: startDate,
          proposedEnd: endDate,
          requestedDelegates,
          requestedSpeakers,
          requestedTracks,
          scientificScope: scope,
          fundingDisclosure: funding,
        };

    try {
      const res = await fetch('/api/webinars/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Submission failed.');
      } else {
        setSubmittedRecord({
          id: data.record.id,
          institutionName: data.record.institutionName,
          verificationStatus: data.record.verificationStatus,
          isCustomInstitution: Boolean(data.record.isCustomInstitution),
          conferenceTitle: data.record.conferenceTitle,
          allocatedDelegates: data.record.allocatedDelegates,
          allocatedSpeakers: data.record.allocatedSpeakers,
          allocatedTracks: data.record.allocatedTracks,
          reviewNotes: data.record.reviewNotes,
          capped: Boolean(data.cappedToPhaseCeiling),
        });
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Free Collaborative Scientific Hosting • $0 Platform Fee"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Host a Conference' },
        ]}
        icon={<Building2 className="w-6 h-6 text-teal-400" />}
        title="Host a Free Scientific Event on Kashmir EcoWatch"
        subtitle="Universities, research institutions, environmental NGOs, government departments, scientific societies, educational institutions, community organizations, and independent research groups can apply to host events at $0 cost."
      />

      <WebinarNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Free Hosting + Phase I Operational Allocation Policy */}
        <div className="bg-slate-900 border border-teal-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free Institutional Hosting • $0 Platform Charges</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-teal-500/15 border border-teal-500/30 text-[11px] font-mono text-teal-200">
              Phase I Verified Ceiling Active
            </span>
          </div>

          <h2 className="text-xl font-bold text-white">
            Zero Commercial Tiers — Conservative, Verified Phase I Resource Allocation
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kashmir EcoWatch provides its Virtual Scientific Hall, moderated Q&amp;A, consent-based archival recording, and linked scientific proceedings infrastructure <strong className="text-white">completely free of charge ($0)</strong>. Under our Phase I operational governance, each approved event receives up to <strong className="text-teal-300">{phaseLimits.delegates} concurrent delegates</strong>, <strong className="text-teal-300">{phaseLimits.speakers} interactive speakers</strong>, <strong className="text-teal-300">{phaseLimits.tracks} live track</strong>, and <strong className="text-teal-300">1 GB private archival recording storage</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
              <div className="text-[10px] text-slate-400">Hosting Fee</div>
              <div className="text-base font-bold text-emerald-400">$0 Free</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
              <div className="text-[10px] text-slate-400">Delegates / Hall</div>
              <div className="text-base font-bold text-white">{phaseLimits.delegates} Max</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
              <div className="text-[10px] text-slate-400">Live Speakers</div>
              <div className="text-base font-bold text-white">{phaseLimits.speakers} Max</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
              <div className="text-[10px] text-slate-400">Active Tracks</div>
              <div className="text-base font-bold text-white">{phaseLimits.tracks} Track</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
              <div className="text-[10px] text-slate-400">Recording Quota</div>
              <div className="text-base font-bold text-teal-300">1.0 GB</div>
            </div>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Applying from a new institution? Select <strong className="text-teal-300">Other Institution (Custom Entry)</strong> below to submit both in one step, or inspect:</span>
            <Link href="/webinars/institution/verification" className="text-teal-400 hover:underline font-semibold">
              Institutional Verification Directory &rarr;
            </Link>
          </div>
        </div>

        {submittedRecord ? (
          <div className="bg-emerald-950/35 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-4">
            <CheckCircle2 className="w-11 h-11 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Hosting Proposal Persisted for Review</h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              Application <code className="text-teal-300 font-mono font-bold">{submittedRecord.id}</code> for{' '}
              <strong className="text-white">&quot;{submittedRecord.conferenceTitle}&quot;</strong> under{' '}
              <strong className="text-teal-200">{submittedRecord.institutionName}</strong> has entered the KEW Institutional Hosting Lifecycle (<strong className="text-emerald-300">$0 Hosting Fee</strong>).
            </p>
            {submittedRecord.isCustomInstitution && (
              <div className="max-w-lg mx-auto p-3 rounded-xl bg-amber-950/40 border border-amber-500/35 text-xs text-amber-200">
                Institutional Status: <strong>Pending Verification</strong> — KEW Secretariat will verify institutional credentials before authorizing live event hosting.
              </div>
            )}
            <div className="max-w-lg mx-auto p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-slate-300 font-mono">
              Allocated Ceiling: {submittedRecord.allocatedDelegates} Delegates • {submittedRecord.allocatedSpeakers} Speakers • {submittedRecord.allocatedTracks} Track • 1 GB Storage
              {submittedRecord.capped && (
                <div className="text-amber-300 text-[11px] mt-1">
                  Note: {submittedRecord.reviewNotes}
                </div>
              )}
            </div>
            <div className="pt-3 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/webinars/institution/verification"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
              >
                View Institutional Verification Directory
              </Link>
              <button
                onClick={() => setSubmittedRecord(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                Submit Another Event
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6"
          >
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-teal-400" />
              <span>Free Scientific Event Hosting Application</span>
            </h3>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="applying-partner-institution"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Applying Partner Institution
                </label>
                <select
                  id="applying-partner-institution"
                  value={selectedInst}
                  onChange={(e) => {
                    setSelectedInst(e.target.value);
                    setErrorMsg(null);
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-teal-200"
                >
                  {partnerOptions.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} ({inst.category})
                    </option>
                  ))}
                  <option value={OTHER_INSTITUTION_VALUE}>
                    Other Institution (Custom Entry)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="scientific-event-mode"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Scientific Event Mode (8 Modes)
                </label>
                <select
                  id="scientific-event-mode"
                  value={eventMode}
                  onChange={(e) => setEventMode(e.target.value as EventModeId)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                >
                  <option value="scientific_conference">1. Scientific Conference</option>
                  <option value="specialist_webinar">2. Specialist Webinar</option>
                  <option value="scientific_podcast">3. Scientific Podcast (2-Speaker Studio)</option>
                  <option value="applied_workshop">4. Applied Workshop (Up to 3 Interactive)</option>
                  <option value="scientific_symposium">5. Scientific Symposium</option>
                  <option value="expert_panel">6. Expert Panel</option>
                  <option value="environmental_education">7. Environmental Education</option>
                  <option value="institutional_event">8. Institutional Event</option>
                </select>
              </div>

              {/* Dynamically Displayed Fields for Unregistered / Custom Institutions */}
              {isCustomInstitution && (
                <div className="sm:col-span-2 p-5 sm:p-6 rounded-2xl bg-slate-950/75 border border-teal-500/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-teal-400" />
                      <h4 className="text-sm font-bold text-white">New Institution Details</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono uppercase text-amber-300">
                      Status on Submission: Pending Verification
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="custom-inst-name"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        Full Institution Name <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="custom-inst-name"
                        type="text"
                        required
                        value={customInstName}
                        onChange={(e) => setCustomInstName(e.target.value)}
                        placeholder="e.g. Himalayan Cryosphere & Watershed Research Society"
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className={customInstType === 'Other' ? '' : 'sm:col-span-2'}>
                      <label
                        htmlFor="custom-inst-type"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        Institution Type <span className="text-teal-400">*</span>
                      </label>
                      <select
                        id="custom-inst-type"
                        required
                        value={customInstType}
                        onChange={(e) => setCustomInstType(e.target.value as InstitutionTypeOption)}
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      >
                        {INSTITUTION_TYPE_OPTIONS.map((typeOpt) => (
                          <option key={typeOpt} value={typeOpt}>
                            {typeOpt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {customInstType === 'Other' && (
                      <div>
                        <label
                          htmlFor="custom-inst-type-other"
                          className="block text-xs font-medium text-slate-300 mb-1"
                        >
                          Custom Institution Type <span className="text-teal-400">*</span>
                        </label>
                        <input
                          id="custom-inst-type-other"
                          type="text"
                          required
                          value={customInstTypeOther}
                          onChange={(e) => setCustomInstTypeOther(e.target.value)}
                          placeholder="Specify institution category..."
                          className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="custom-inst-country"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        Country <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="custom-inst-country"
                        type="text"
                        required
                        value={customCountry}
                        onChange={(e) => setCustomCountry(e.target.value)}
                        placeholder="e.g. India"
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="custom-inst-city-region"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        City / Region <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="custom-inst-city-region"
                        type="text"
                        required
                        value={customCityRegion}
                        onChange={(e) => setCustomCityRegion(e.target.value)}
                        placeholder="e.g. Srinagar, Jammu & Kashmir"
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="custom-inst-website"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        Official Website (if available)
                      </label>
                      <input
                        id="custom-inst-website"
                        type="text"
                        value={customWebsite}
                        onChange={(e) => setCustomWebsite(e.target.value)}
                        placeholder="https://example.org (optional for community or emerging research groups)"
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="custom-inst-rep"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        Authorized Representative <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="custom-inst-rep"
                        type="text"
                        required
                        value={customRepName}
                        onChange={(e) => setCustomRepName(e.target.value)}
                        placeholder="Full name & designation of authorized coordinator"
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="custom-inst-email"
                        className="block text-xs font-medium text-slate-300 mb-1"
                      >
                        Institutional Contact Email <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="custom-inst-email"
                        type="email"
                        required
                        value={customContactEmail}
                        onChange={(e) => setCustomContactEmail(e.target.value)}
                        placeholder="coordinator@institution.org"
                        className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      New institutions require verification before free event hosting can be authorized. Your institutional details and event proposal will be submitted together without duplicate data entry.
                    </span>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Proposed Event Title</label>
                <input
                  type="text"
                  required
                  value={confTitle}
                  onChange={(e) => setConfTitle(e.target.value)}
                  placeholder="e.g. Lidder Basin Glacio-Hydrological Monitoring Workshop"
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Requested Concurrent Delegates (Phase I Max: {phaseLimits.delegates})
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={requestedDelegates}
                  onChange={(e) => setRequestedDelegates(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Requested Interactive Speakers (Phase I Max: {phaseLimits.speakers})
                </label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={requestedSpeakers}
                  onChange={(e) => setRequestedSpeakers(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Scientific Scope &amp; Objectives</label>
                <textarea
                  rows={3}
                  required
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder="Describe the research questions, datasets, speakers, and intended ecological outputs..."
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Non-Commercial Governance &amp; Funding Disclosure</label>
                <input
                  type="text"
                  required
                  value={funding}
                  onChange={(e) => setFunding(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[11px] text-slate-400">
                Platform Hosting Charge: <strong className="text-emerald-400">$0.00 (Free Institutional Policy)</strong>
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Free Hosting Application'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
