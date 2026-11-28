'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  FileText,
  Lock,
  Paperclip,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import {
  CORRESPONDENCE_CATEGORIES,
  CORRESPONDENCE_REGIONS,
  type CorrespondenceCategoryId,
  type CorrespondenceRegion,
} from '@/lib/himalayan-dispatch-correspondence-types';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

interface SubmissionReceipt {
  referenceNumber: string;
  accessCredential: string;
  receivingDepartment: string;
  categoryLabel: string;
  createdAt: string;
}

export function EditorialCorrespondenceFormClient() {
  const [category, setCategory] = useState<CorrespondenceCategoryId>('general_inquiry');
  const [region, setRegion] = useState<CorrespondenceRegion>('Multi-Regional / Transboundary');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [relatedArticleUrl, setRelatedArticleUrl] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState(''); // Honeypot
  const [files, setFiles] = useState<File[]>([]);
  const [containsTier3HighRiskMaterial, setContainsTier3HighRiskMaterial] = useState(false);
  const [privacyConsentAccepted, setPrivacyConsentAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [copiedField, setCopiedField] = useState<'ref' | 'cred' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && CORRESPONDENCE_CATEGORIES.some((c) => c.id === catParam)) {
      setCategory(catParam as CorrespondenceCategoryId);
    }
    const regionParam = params.get('region');
    if (regionParam && CORRESPONDENCE_REGIONS.includes(regionParam as CorrespondenceRegion)) {
      setRegion(regionParam as CorrespondenceRegion);
    }
  }, []);

  const selectedSpec = useMemo(
    () =>
      CORRESPONDENCE_CATEGORIES.find((c) => c.id === category) || CORRESPONDENCE_CATEGORIES[0],
    [category]
  );

  const resolvedDepartmentLabel = useMemo(() => {
    if (
      category === 'regional_correspondence' &&
      region !== 'Multi-Regional / Transboundary' &&
      region !== 'International / Outside Region'
    ) {
      return `${region} Bureau Desk`;
    }
    return selectedSpec.receivingDepartment;
  }, [category, region, selectedSpec]);

  const isConfidential = category === 'confidential_communication';

  function handleFileSelection(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const incoming = Array.from(e.target.files || []);
    if (!incoming.length) return;
    const merged = [...files, ...incoming].slice(0, 3);
    for (const f of merged) {
      if (f.size > 5 * 1024 * 1024) {
        setError(`File "${f.name}" exceeds the 5 MB attachment limit.`);
        e.target.value = '';
        return;
      }
    }
    setFiles(merged);
    e.target.value = '';
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function copyValue(val: string, kind: 'ref' | 'cred') {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedField(kind);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (containsTier3HighRiskMaterial) {
      setError(
        'Highly sensitive Tier III source submissions via standard web forms are disabled. Do not upload raw whistleblower documents here; consult our Source Protection & Verification Standards for out-of-band procedures.'
      );
      return;
    }

    if (!privacyConsentAccepted) {
      setError(
        'Please confirm the Editorial Correspondence privacy, handling, and record-keeping notice before sending.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set('category', category);
      formData.set('region', region);
      formData.set('senderName', senderName.trim());
      formData.set('senderEmail', senderEmail.trim());
      formData.set('affiliation', affiliation.trim());
      formData.set('relatedArticleUrl', relatedArticleUrl.trim());
      formData.set('subject', subject.trim());
      formData.set('message', message.trim());
      formData.set('websiteUrl', websiteUrl);
      formData.set('privacyConsentAccepted', privacyConsentAccepted ? 'true' : 'false');
      formData.set(
        'containsTier3HighRiskMaterial',
        containsTier3HighRiskMaterial ? 'true' : 'false'
      );

      if (!isConfidential) {
        for (const f of files) {
          formData.append('attachments', f);
        }
      }

      const res = await fetch('/api/himalayan-dispatch/correspondence', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        setError(data?.error || 'Unable to transmit editorial correspondence.');
        setSubmitting(false);
        return;
      }

      setReceipt({
        referenceNumber: data.referenceNumber,
        accessCredential: data.accessCredential,
        receivingDepartment: data.receivingDepartment,
        categoryLabel: data.categoryLabel,
        createdAt: data.createdAt,
      });
      setSubmitting(false);
    } catch {
      setError('Network error while contacting the Editorial Correspondence Desk.');
      setSubmitting(false);
    }
  }

  if (receipt) {
    return (
      <section
        className="hd-corr-form-surface p-6 sm:p-10 border space-y-8"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="space-y-3 border-b pb-6" style={{ borderColor: 'var(--hd-rule)' }}>
          <p className="hd-kicker" style={{ color: 'var(--hd-copper)' }}>
            CORRESPONDENCE FORMALLY LOGGED · ENCRYPTED AT REST
          </p>
          <h2 className="hd-font-display text-2xl sm:text-4xl font-semibold">
            Save Your Private Correspondence Credentials
          </h2>
          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Your communication has been routed to{' '}
            <strong style={{ color: 'var(--hd-fg)' }}>{receipt.receivingDepartment}</strong> (
            {receipt.categoryLabel}). Retain both credentials below to review status updates,
            editorial responses, and requests for additional evidence.
          </p>
        </div>

        <div className="hd-corr-row-2">
          <div
            className="p-5 sm:p-6 border space-y-2 min-w-0"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }}
          >
            <span className="hd-corr-label">Correspondence Reference Number</span>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <code className="hd-font-sans text-base sm:text-xl font-bold tracking-wider break-all">
                {receipt.referenceNumber}
              </code>
              <button
                type="button"
                onClick={() => copyValue(receipt.referenceNumber, 'ref')}
                className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px] font-semibold tracking-[0.14em] uppercase"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                {copiedField === 'ref' ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            className="p-5 sm:p-6 border space-y-2 min-w-0"
            style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
          >
            <span className="hd-corr-label">One-Time Secure Access Credential</span>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <code className="hd-font-sans text-sm sm:text-lg font-bold tracking-wider break-all">
                {receipt.accessCredential}
              </code>
              <button
                type="button"
                onClick={() => copyValue(receipt.accessCredential, 'cred')}
                className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px] font-semibold tracking-[0.14em] uppercase shrink-0"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                {copiedField === 'cred' ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className="p-5 border flex items-start gap-3.5"
          style={{
            borderColor: 'var(--hd-rule)',
            backgroundColor: 'var(--hd-bg-recessed)',
          }}
        >
          <Lock className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--hd-copper)' }} />
          <p
            className="hd-font-body text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            <strong>Security Notice:</strong> Your Secure Access Credential is cryptographically
            hashed (<code>scrypt</code>) in our database and will never be shown again after you
            leave this screen. Correspondence is private—a reference number alone cannot authorize
            access.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2">
          <Link
            href={HD_ROUTES.contactThread(receipt.referenceNumber)}
            className="hd-corr-submit-btn hd-font-sans border text-xs font-semibold tracking-[0.16em] uppercase"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-copper-solid)',
              color: '#F2EFE7',
            }}
          >
            <span>OPEN PRIVATE CORRESPONDENCE THREAD</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>

          <Link
            href={HD_ROUTES.contact}
            className="hd-corr-submit-btn hd-font-sans border text-xs font-semibold tracking-[0.16em] uppercase"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <span>RETURN TO CONTACT DESK</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-start">
      {/* Main Form: Full width below 1280px so tablet & zoomed viewports never squeeze inputs */}
      <form
        onSubmit={handleSubmit}
        className="hd-corr-form-surface xl:col-span-8 p-5 sm:p-8 lg:p-10 border space-y-7"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
        noValidate
      >
        {/* Honeypot anti-automation field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="hd-corr-website">Website</label>
          <input
            id="hd-corr-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>

        {/* Category & Region Routing: 1-col on mobile (<768px), 2-col on >=768px where container >= 540px */}
        <div className="hd-corr-row-2">
          <div className="hd-corr-field">
            <label htmlFor="hd-corr-category" className="hd-corr-label">
              Correspondence Category *
            </label>
            <select
              id="hd-corr-category"
              value={category}
              onChange={(e) => {
                const next = e.target.value as CorrespondenceCategoryId;
                setCategory(next);
                if (next === 'confidential_communication') {
                  setFiles([]);
                }
              }}
              className="hd-corr-select"
            >
              {CORRESPONDENCE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="hd-corr-field">
            <label htmlFor="hd-corr-region" className="hd-corr-label">
              Regional Focus / Bureau Routing *
            </label>
            <select
              id="hd-corr-region"
              value={region}
              onChange={(e) => setRegion(e.target.value as CorrespondenceRegion)}
              className="hd-corr-select"
            >
              {CORRESPONDENCE_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Receiving Department Callout */}
        <div
          className="p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{
            borderColor: isConfidential ? 'var(--hd-copper)' : 'var(--hd-rule)',
            backgroundColor: 'var(--hd-bg)',
          }}
        >
          <div className="space-y-1 min-w-0">
            <span className="hd-corr-label">Receiving Editorial Department</span>
            <p className="hd-font-display text-xl sm:text-2xl font-semibold">
              {resolvedDepartmentLabel}
            </p>
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
              {selectedSpec.description}
            </p>
          </div>
          {isConfidential && (
            <span
              className="hd-font-sans px-3 py-1.5 border text-[10px] font-semibold tracking-[0.14em] uppercase self-start sm:self-center shrink-0"
              style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
            >
              Restricted Desk
            </span>
          )}
        </div>

        {/* Identity Row:
            - Mobile (< 768px): 1 column stacked (Full Name -> Correspondence Email -> Affiliation / Location)
            - Tablet (768px–1199px): 2 columns ([Full Name | Correspondence Email], then [Affiliation / Location] full width)
            - Large Desktop (>= 1200px & container >= 800px): 3 columns */}
        <div className="hd-corr-row-3">
          <div className="hd-corr-field">
            <label htmlFor="hd-corr-name" className="hd-corr-label">
              Full Name {isConfidential ? '(Optional)' : '*'}
            </label>
            <input
              id="hd-corr-name"
              type="text"
              required={!isConfidential}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={isConfidential ? 'Pseudonym or leave blank' : 'Your full name'}
              className="hd-corr-input"
            />
          </div>

          <div className="hd-corr-field">
            <label htmlFor="hd-corr-email" className="hd-corr-label">
              Correspondence Email {isConfidential ? '(Optional)' : '*'}
            </label>
            <input
              id="hd-corr-email"
              type="email"
              required={!isConfidential}
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder={
                isConfidential
                  ? 'Optional — thread works via credential'
                  : 'name@institution.org'
              }
              className="hd-corr-input"
            />
          </div>

          <div className="hd-corr-field hd-corr-field--span-tablet">
            <label htmlFor="hd-corr-affiliation" className="hd-corr-label">
              Affiliation / Location
            </label>
            <input
              id="hd-corr-affiliation"
              type="text"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="University, agency, or district"
              className="hd-corr-input"
            />
          </div>
        </div>

        {/* Optional Related Published Article URL (Full width) */}
        <div className="hd-corr-row-full">
          <div className="hd-corr-field">
            <label htmlFor="hd-corr-article" className="hd-corr-label">
              Related Published Dispatch URL (Optional)
            </label>
            <input
              id="hd-corr-article"
              type="url"
              value={relatedArticleUrl}
              onChange={(e) => setRelatedArticleUrl(e.target.value)}
              placeholder="https://dispatch.kashmir-ecowatch.com/..."
              className="hd-corr-input"
            />
          </div>
        </div>

        {/* Subject: strictly 100% full width across all breakpoints */}
        <div className="hd-corr-row-full">
          <div className="hd-corr-field">
            <label htmlFor="hd-corr-subject" className="hd-corr-label">
              Subject *
            </label>
            <input
              id="hd-corr-subject"
              type="text"
              required
              maxLength={240}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Concise summary of your inquiry, proposal, or request"
              className="hd-corr-input"
            />
          </div>
        </div>

        {/* Statement / Details: strictly 100% full width across all breakpoints */}
        <div className="hd-corr-row-full">
          <div className="hd-corr-field">
            <label htmlFor="hd-corr-message" className="hd-corr-label">
              Statement / Details *
            </label>
            <textarea
              id="hd-corr-message"
              required
              rows={7}
              maxLength={20000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isConfidential
                  ? 'Describe the general editorial domain and request an out-of-band secure channel. Do NOT paste raw whistleblower documents or identifying source secrets into this web form.'
                  : 'Write your full message, citation details, or institutional communication...'
              }
              className="hd-corr-textarea"
            />
          </div>
        </div>

        {/* Supporting File Attachments */}
        <div
          className="p-4 sm:p-5 border space-y-3 min-w-0"
          style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
        >
          <div className="flex items-center gap-2">
            <Paperclip className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-corr-label">
              Supporting Attachments (Optional · Max 3 Files · 5 MB Each)
            </span>
          </div>

          {isConfidential ? (
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
              File uploads are intentionally disabled on Restricted Confidential web requests so
              unredacted metadata is never transmitted over standard browser forms. Use this
              message only to coordinate an out-of-band secure handoff.
            </p>
          ) : (
            <>
              <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                Permitted formats: PDF, JPEG, PNG, WEBP, TXT, CSV, JSON. All uploads undergo
                magic-byte, executable, and malware screening and are encrypted at rest.
              </p>
              <div className="min-w-0 overflow-hidden">
                <input
                  id="hd-corr-files"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.txt,.csv,.json"
                  onChange={handleFileSelection}
                  disabled={files.length >= 3}
                  className="hd-font-sans text-xs max-w-full"
                />
              </div>
              {files.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {files.map((f, idx) => (
                    <li
                      key={`${f.name}-${idx}`}
                      className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border text-xs min-w-0"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <span className="inline-flex items-center gap-2 min-w-0 break-all">
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span>{f.name}</span>
                        <span style={{ color: 'var(--hd-fg-muted)' }}>
                          ({Math.round(f.size / 1024)} KB)
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider hover:opacity-80 shrink-0"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {/* Source Safety & Tier III Guardrail + Privacy Consent */}
        <div
          className="p-4 sm:p-5 border space-y-4 min-w-0"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-recessed)',
          }}
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--hd-copper)' }} />
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              <strong>Honest Security Disclosure:</strong> Submissions are transmitted over TLS and
              stored with AES-256-GCM encryption at rest, with access restricted to authorized
              Himalayan Dispatch desks. However, standard browser forms cannot guarantee
              network-level anonymity against a monitored device or workplace network.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={containsTier3HighRiskMaterial}
              onChange={(e) => setContainsTier3HighRiskMaterial(e.target.checked)}
              className="mt-1 shrink-0"
            />
            <span className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Check if this communication contains raw <strong>Tier III high-risk source material</strong>{' '}
              whose disclosure could expose a person to physical or legal harm (checking this
              prevents accidental web transmission and directs you to out-of-band Source Protection
              protocols).
            </span>
          </label>

          {containsTier3HighRiskMaterial && (
            <div
              className="p-4 border flex items-start gap-3"
              style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
              <div className="space-y-1.5 text-sm hd-font-body">
                <p className="font-semibold">
                  Standard Web Submission Paused for Source Safety
                </p>
                <p style={{ color: 'var(--hd-fg-secondary)' }}>
                  Do not submit raw Tier III whistleblower documents through standard browser
                  forms. Review our{' '}
                  <Link
                    href={HD_ROUTES.sourceProtection}
                    className="underline font-semibold"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    Source Protection &amp; Verification Standards
                  </Link>{' '}
                  first.
                </p>
              </div>
            </div>
          )}

          <label
            className="flex items-start gap-3 cursor-pointer pt-3 border-t"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <input
              type="checkbox"
              required
              checked={privacyConsentAccepted}
              onChange={(e) => setPrivacyConsentAccepted(e.target.checked)}
              className="mt-1 shrink-0"
            />
            <span className="hd-font-body text-sm leading-relaxed">
              I understand that this correspondence will be encrypted at rest and reviewed solely by
              authorized Himalayan Dispatch editorial staff in accordance with the Editorial
              Charter and Source Protection Standards. *
            </span>
          </label>
        </div>

        {error && (
          <div
            role="alert"
            className="p-4 border hd-font-body text-sm font-medium"
            style={{
              borderColor: '#B91C1C',
              backgroundColor: 'rgba(185, 28, 28, 0.08)',
              color: 'var(--hd-fg)',
            }}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting || containsTier3HighRiskMaterial}
            className="hd-corr-submit-btn hd-font-sans border text-xs font-semibold tracking-[0.16em] uppercase transition-opacity disabled:opacity-50"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-copper-solid)',
              color: '#F2EFE7',
            }}
          >
            <span>{submitting ? 'TRANSMITTING SECURELY…' : 'SEND CORRESPONDENCE'}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          <Link
            href={HD_ROUTES.contactTrack}
            className="hd-font-sans text-xs font-semibold tracking-[0.13em] uppercase hover:underline text-center sm:text-left"
            style={{ color: 'var(--hd-copper)' }}
          >
            Already have a reference number? Track correspondence →
          </Link>
        </div>
      </form>

      {/* Right Desk Routing Ledger (4 columns on >= 1280px, stacked cleanly below on mobile/tablet) */}
      <aside className="xl:col-span-4 space-y-6 min-w-0">
        <div
          className="p-5 sm:p-7 border space-y-4"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-recessed)',
          }}
        >
          <p className="hd-kicker">DEPARTMENTAL ROUTING DIRECTORY</p>
          <h2 className="hd-font-display text-2xl font-semibold">
            11 Editorial Correspondence Channels
          </h2>
          <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Every submission is assigned a non-sequential reference number and routed directly to
            the responsible editorial department:
          </p>

          <div className="divide-y pt-1" style={{ borderColor: 'var(--hd-rule)' }}>
            {CORRESPONDENCE_CATEGORIES.map((item) => {
              const active = item.id === category;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className="w-full text-left py-2.5 flex flex-wrap items-baseline justify-between gap-2 transition-opacity hover:opacity-85"
                >
                  <span
                    className="hd-font-body text-sm font-medium"
                    style={{ color: active ? 'var(--hd-copper)' : 'var(--hd-fg)' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="hd-font-sans text-[10px] tracking-[0.11em] uppercase"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  >
                    {item.receivingDepartment}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="p-5 sm:p-6 border space-y-3"
          style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
        >
          <p className="hd-kicker">ENVIRONMENTAL EVIDENCE &amp; DATA</p>
          <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Reporting pollution incidents, field sightings, datasets, or Sectoral EIA assessments?
            Use the established Kashmir EcoWatch participation infrastructure rather than general
            editorial mail.
          </p>
          <Link
            href={HD_ROUTES.contactEnvironmentalInfo}
            className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase hover:underline"
            style={{ color: 'var(--hd-copper)' }}
          >
            <span>Explore KEW Submission Options</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
