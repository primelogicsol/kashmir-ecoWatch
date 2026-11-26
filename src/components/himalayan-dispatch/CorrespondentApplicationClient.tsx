'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Search, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { KASHMIR_TEN_DISTRICTS, REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import type { PublicApplicationStatusSummary } from '@/types/himalayan-dispatch';

export function CorrespondentApplicationClient() {
  const { user, isLoggedIn } = useAuth();
  const [activeMode, setActiveMode] = useState<'apply' | 'track'>('apply');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBureau, setSelectedBureau] = useState('kashmir');
  const [kashmirDistrict, setKashmirDistrict] = useState('Srinagar');
  const [customSubregion, setCustomSubregion] = useState('');
  const [correspondentTier, setCorrespondentTier] = useState<
    'district-correspondent' | 'environmental-reporter' | 'investigative-journalist'
  >('district-correspondent');
  const [languages, setLanguages] = useState('English, Kashmiri, Urdu');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [professionalBackground, setProfessionalBackground] = useState('');
  const [motivationStatement, setMotivationStatement] = useState('');
  const [credentialFile, setCredentialFile] = useState<File | null>(null);
  const [charterAccepted, setCharterAccepted] = useState(false);
  const [publicPortfolioConsent, setPublicPortfolioConsent] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ referenceNumber: string; message: string } | null>(null);

  // Lookup state
  const [lookupRef, setLookupRef] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [statusData, setStatusData] = useState<PublicApplicationStatusSummary | null>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      if (!fullName) setFullName(user.name);
      if (!email) setEmail(user.email);
      if (!lookupEmail) setLookupEmail(user.email);
    }
  }, [isLoggedIn, user, fullName, email, lookupEmail]);

  const bureauObj =
    REGIONAL_REPORTING_BUREAUS.find((b) => b.id === selectedBureau) ||
    REGIONAL_REPORTING_BUREAUS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const locationStr =
        selectedBureau === 'kashmir'
          ? `${bureauObj.name} · ${kashmirDistrict}`
          : `${bureauObj.name} · ${customSubregion || bureauObj.coveredUnits[0]}`;

      const fd = new FormData();
      fd.append('fullName', fullName);
      fd.append('email', email);
      fd.append('locationOrDistrict', locationStr);
      if (selectedBureau === 'kashmir') fd.append('kashmirDistrict', kashmirDistrict);
      fd.append('roleCategoryId', correspondentTier);
      fd.append('preferredDepartmentId', 'field-reports');
      fd.append('engagementBasis', 'voluntary_editorial_fellow');
      fd.append('professionalBackground', professionalBackground);
      fd.append('portfolioUrl', portfolioUrl);
      fd.append('motivationStatement', motivationStatement);
      fd.append('languages', languages);
      fd.append('charterAccepted', String(charterAccepted));
      fd.append('nonEmploymentAcknowledged', 'true');
      fd.append('publicPortfolioConsent', String(publicPortfolioConsent));
      if (credentialFile) fd.append('credentialFile', credentialFile);

      const res = await fetch('/api/himalayan-dispatch/applications', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to submit correspondent application.');
      } else {
        setReceipt({
          referenceNumber: data.referenceNumber,
          message: data.message,
        });
      }
    } catch {
      setError('Network error while filing correspondent application.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupLoading(true);
    setLookupError(null);
    try {
      const res = await fetch(
        `/api/himalayan-dispatch/applications?ref=${encodeURIComponent(
          lookupRef
        )}&email=${encodeURIComponent(lookupEmail)}`
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLookupError(data.error || 'Application not found.');
        setStatusData(null);
      } else {
        setStatusData(data.summary);
      }
    } catch {
      setLookupError('Unable to query application status.');
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-6 border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
        <button
          type="button"
          onClick={() => setActiveMode('apply')}
          className="hd-font-sans text-xs font-semibold tracking-[0.2em] uppercase pb-2 cursor-pointer"
          style={{
            color: activeMode === 'apply' ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
            borderBottom: activeMode === 'apply' ? '2px solid var(--hd-copper)' : 'none',
          }}
        >
          01 · Submit Correspondent Application
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('track')}
          className="hd-font-sans text-xs font-semibold tracking-[0.2em] uppercase pb-2 cursor-pointer"
          style={{
            color: activeMode === 'track' ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
            borderBottom: activeMode === 'track' ? '2px solid var(--hd-copper)' : 'none',
          }}
        >
          02 · Check Application Status (HD-APP-…)
        </button>
      </div>

      {activeMode === 'apply' ? (
        receipt ? (
          <div
            className="p-8 sm:p-10 border space-y-4"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">CORRESPONDENT APPLICATION FILED</span>
            </div>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold">
              Reference Number: {receipt.referenceNumber}
            </h2>
            <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {receipt.message}
            </p>
            <div className="pt-2 flex flex-wrap gap-6">
              <button
                type="button"
                onClick={() => {
                  setLookupRef(receipt.referenceNumber);
                  setLookupEmail(email);
                  setActiveMode('track');
                }}
                className="hd-kicker hover:underline cursor-pointer"
              >
                Open Live Application Tracker →
              </button>
              <Link href={HD_ROUTES.contributorGuidelines} className="hd-folio-meta hover:underline">
                Review Contributor Guidelines
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 border space-y-6"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            {error && (
              <div className="p-4 border text-sm hd-font-body" style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}>
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="hd-kicker block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="hd-kicker block">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="hd-kicker block">Regional Bureau *</label>
                <select
                  value={selectedBureau}
                  onChange={(e) => setSelectedBureau(e.target.value)}
                  className="w-full px-3.5 py-2.5 border hd-font-body text-sm"
                  style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)', color: 'var(--hd-fg)' }}
                >
                  {REGIONAL_REPORTING_BUREAUS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.operationalStatus === 'in_establishment' ? 'In Establishment' : 'Established Desk'})
                    </option>
                  ))}
                </select>
              </div>

              {selectedBureau === 'kashmir' ? (
                <div className="space-y-1.5">
                  <label className="hd-kicker block">Kashmir Valley District *</label>
                  <select
                    value={kashmirDistrict}
                    onChange={(e) => setKashmirDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 border hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)', color: 'var(--hd-fg)' }}
                  >
                    {KASHMIR_TEN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="hd-kicker block">District / Valley *</label>
                  <input
                    type="text"
                    required
                    value={customSubregion}
                    onChange={(e) => setCustomSubregion(e.target.value)}
                    placeholder={`e.g., ${bureauObj.coveredUnits.slice(0, 2).join(' or ')}`}
                    className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="hd-kicker block">Correspondent Track *</label>
                <select
                  value={correspondentTier}
                  onChange={(e) => setCorrespondentTier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border hd-font-body text-sm"
                  style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)', color: 'var(--hd-fg)' }}
                >
                  <option value="district-correspondent">District Correspondent</option>
                  <option value="environmental-reporter">Regional Environmental Reporter</option>
                  <option value="investigative-journalist">Regional Investigative Correspondent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="hd-kicker block">Published Clips / Portfolio URL *</label>
                <input
                  type="url"
                  required
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="hd-kicker block">Field Reporting Languages *</label>
                <input
                  type="text"
                  required
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="hd-kicker block">Reporting Credentials &amp; Watershed Familiarity *</label>
              <textarea
                rows={4}
                required
                value={professionalBackground}
                onChange={(e) => setProfessionalBackground(e.target.value)}
                placeholder="Summarize your environmental, district, or investigative reporting background (minimum 40 characters)..."
                className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="hd-kicker block">Proposed Regional Coverage Priorities (Next 6 Months) *</label>
              <textarea
                rows={4}
                required
                value={motivationStatement}
                onChange={(e) => setMotivationStatement(e.target.value)}
                placeholder="Which specific watersheds, forests, hazards, or communities in your bureau require sustained reporting?"
                className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
              />
            </div>

            <div className="p-4 border space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <label className="hd-kicker flex items-center gap-2 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Optional CV / Writing Sample Upload (Stored in Private Non-Public Vault)</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setCredentialFile(e.target.files?.[0] || null)}
                className="text-xs hd-font-sans"
              />
              <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                <Lock className="w-3 h-3 inline mr-1" />
                Credential files are stored strictly outside public web directories and reviewed only by authorized editors.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={charterAccepted}
                onChange={(e) => setCharterAccepted(e.target.checked)}
                className="mt-1"
              />
              <span className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                I affirm adherence to the{' '}
                <Link href={HD_ROUTES.editorialCharter} className="underline">
                  Himalayan Dispatch Editorial Charter
                </Link>
                , primary-source verification rules, and independent non-employment contributor terms. *
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publicPortfolioConsent}
                onChange={(e) => setPublicPortfolioConsent(e.target.checked)}
                className="mt-1"
              />
              <span className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                Upon formal approval, publish my correspondent portfolio under /himalayan-dispatch/journalists.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: 'var(--hd-copper-solid)' }}
            >
              <span>{submitting ? 'Filing Application…' : 'Submit Correspondent Application'}</span>
            </button>
          </form>
        )
      ) : (
        <div
          className="p-6 sm:p-10 border space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
        >
          <form onSubmit={handleLookup} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="hd-kicker block">Reference Number *</label>
              <input
                type="text"
                required
                value={lookupRef}
                onChange={(e) => setLookupRef(e.target.value)}
                placeholder="HD-APP-2026-0101"
                className="w-full px-3.5 py-2.5 border bg-transparent hd-font-sans text-sm"
                style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
              />
            </div>
            <div className="space-y-1.5">
              <label className="hd-kicker block">Registered Email *</label>
              <input
                type="email"
                required
                value={lookupEmail}
                onChange={(e) => setLookupEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
              />
            </div>
            <button
              type="submit"
              disabled={lookupLoading}
              className="hd-font-sans inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
              style={{ backgroundColor: 'var(--hd-copper-solid)' }}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{lookupLoading ? 'Checking…' : 'Verify Status'}</span>
            </button>
          </form>

          {lookupError && (
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-copper)' }}>
              {lookupError}
            </p>
          )}

          {statusData && (
            <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="hd-kicker">{statusData.referenceNumber}</span>
                <span className="hd-folio-meta">STATUS: {statusData.status}</span>
              </div>
              <h3 className="hd-font-display text-2xl font-semibold">
                {statusData.fullName} — {statusData.roleCategoryTitle}
              </h3>
              <p className="hd-folio-meta">{statusData.locationOrDistrict}</p>
              {statusData.applicantFacingNote && (
                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {statusData.applicantFacingNote}
                </p>
              )}
              {statusData.workspaceAccessCode && (
                <div className="p-4 border-l-2 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
                  <p className="hd-kicker">WORKSPACE ACCESS ACTIVATED</p>
                  <p className="hd-font-sans text-xs">
                    Access Code: <strong>{statusData.workspaceAccessCode}</strong> — Sign in at{' '}
                    <Link href={HD_ROUTES.journalistSignIn} className="underline">
                      Journalist Sign In
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
