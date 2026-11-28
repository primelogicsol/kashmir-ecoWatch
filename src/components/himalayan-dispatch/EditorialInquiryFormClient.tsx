'use client';

import React, { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import type { BureauSlugId, EditorialInquiryCategory } from '@/types/himalayan-dispatch';

export function EditorialInquiryFormClient({
  category,
  kicker,
  heading,
  description,
  subjectLabel = 'Subject *',
  subjectPlaceholder = 'Brief summary of your inquiry',
  defaultSubject = '',
  messageLabel = 'Statement / Details *',
  messagePlaceholder = 'Provide clear factual context, relevant dates, or citation details...',
  showArticleUrlField = false,
  showPositionField = false,
  positionOptions = [],
  bureauId,
  submitLabel = 'Send Correspondence',
}: {
  category: EditorialInquiryCategory;
  kicker: string;
  heading: string;
  description: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  defaultSubject?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  showArticleUrlField?: boolean;
  showPositionField?: boolean;
  positionOptions?: string[];
  bureauId?: BureauSlugId;
  submitLabel?: string;
}) {
  const uid = useId();
  const { user, isLoggedIn } = useAuth();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [organizationOrLocation, setOrganizationOrLocation] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [relatedArticleUrl, setRelatedArticleUrl] = useState('');
  const [positionTitle, setPositionTitle] = useState(positionOptions[0] || '');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    trackingCode: string;
    accessCredential?: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      if (!senderName) setSenderName(user.name);
      if (!senderEmail) setSenderEmail(user.email);
      if (!organizationOrLocation && (user.institution || user.district)) {
        setOrganizationOrLocation(user.institution || user.district || '');
      }
    }
  }, [isLoggedIn, user, senderName, senderEmail, organizationOrLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          subject:
            showPositionField && positionTitle
              ? `${positionTitle} — ${subject || 'Appointment Inquiry'}`
              : subject,
          senderName,
          senderEmail,
          organizationOrLocation,
          relatedArticleUrl: showArticleUrlField ? relatedArticleUrl : undefined,
          positionTitle: showPositionField ? positionTitle : undefined,
          bureauId,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to submit form.');
      } else {
        setReceipt({
          trackingCode: data.trackingCode,
          accessCredential: data.accessCredential,
          message: data.message,
        });
      }
    } catch {
      setError('Network error while transmitting correspondence.');
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div
        className="hd-corr-form-surface p-6 sm:p-10 border space-y-5"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
          <span className="hd-kicker">LOGGED WITH HIMALAYAN DISPATCH</span>
        </div>
        <h3
          className="hd-font-display text-2xl sm:text-3xl font-semibold break-words"
          style={{ color: 'var(--hd-fg)' }}
        >
          Reference Number: {receipt.trackingCode}
        </h3>

        {receipt.accessCredential && (
          <div
            className="p-4 sm:p-5 border space-y-2"
            style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-corr-label">One-Time Secure Access Credential</span>
            </div>
            <code className="hd-font-sans block text-sm sm:text-base font-bold tracking-wider break-all">
              {receipt.accessCredential}
            </code>
            <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
              Save both your reference number and this private credential now. A reference number
              alone cannot authorize access to your thread.
            </p>
          </div>
        )}

        <p
          className="hd-font-body text-base leading-relaxed"
          style={{ color: 'var(--hd-fg-secondary)' }}
        >
          {receipt.message}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          {receipt.accessCredential && (
            <Link
              href={HD_ROUTES.contactTrack}
              className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.16em] uppercase"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-copper-solid)',
                color: '#F2EFE7',
              }}
            >
              <span>Track Correspondence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setReceipt(null);
              setMessage('');
            }}
            className="hd-kicker hover:underline cursor-pointer"
          >
            Submit Another Dispatch →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hd-corr-form-surface p-5 sm:p-8 lg:p-10 border space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      <div className="space-y-2 pb-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
        <p className="hd-kicker">{kicker}</p>
        <h3
          className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight"
          style={{ color: 'var(--hd-fg)' }}
        >
          {heading}
        </h3>
        <p
          className="hd-font-body text-sm sm:text-base leading-relaxed"
          style={{ color: 'var(--hd-fg-muted)' }}
        >
          {description}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="p-4 border text-sm hd-font-body"
          style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
        >
          {error}
        </div>
      )}

      {/* Top Row:
          - Mobile (< 768px): 1 column stacked (Full Name -> Correspondence Email -> Affiliation / Location)
          - Tablet (768px–1199px): 2 columns ([Full Name | Correspondence Email], then [Affiliation / Location] full width)
          - Large Desktop (>= 1200px): 3 columns ([Full Name | Correspondence Email | Affiliation / Location]) */}
      <div className="hd-corr-row-3">
        <div className="hd-corr-field">
          <label htmlFor={`${uid}-name`} className="hd-corr-label">
            Full Name *
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your full name"
            className="hd-corr-input"
          />
        </div>

        <div className="hd-corr-field">
          <label htmlFor={`${uid}-email`} className="hd-corr-label">
            Correspondence Email *
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            required
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="name@domain.org"
            className="hd-corr-input"
          />
        </div>

        <div className="hd-corr-field hd-corr-field--span-tablet">
          <label htmlFor={`${uid}-affiliation`} className="hd-corr-label">
            Affiliation / Location
          </label>
          <input
            id={`${uid}-affiliation`}
            type="text"
            value={organizationOrLocation}
            onChange={(e) => setOrganizationOrLocation(e.target.value)}
            placeholder="City, district, or institution"
            className="hd-corr-input"
          />
        </div>
      </div>

      {showPositionField && positionOptions.length > 0 && (
        <div className="hd-corr-row-full">
          <div className="hd-corr-field">
            <label htmlFor={`${uid}-position`} className="hd-corr-label">
              Editorial or Advisory Seat *
            </label>
            <select
              id={`${uid}-position`}
              value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)}
              className="hd-corr-select"
            >
              {positionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {showArticleUrlField && (
        <div className="hd-corr-row-full">
          <div className="hd-corr-field">
            <label htmlFor={`${uid}-article`} className="hd-corr-label">
              Article URL or Headline
            </label>
            <input
              id={`${uid}-article`}
              type="text"
              value={relatedArticleUrl}
              onChange={(e) => setRelatedArticleUrl(e.target.value)}
              placeholder="/himalayan-dispatch/issues/..."
              className="hd-corr-input"
            />
          </div>
        </div>
      )}

      {/* Subject: strictly 100% full width across all breakpoints */}
      <div className="hd-corr-row-full">
        <div className="hd-corr-field">
          <label htmlFor={`${uid}-subject`} className="hd-corr-label">
            {subjectLabel}
          </label>
          <input
            id={`${uid}-subject`}
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={subjectPlaceholder}
            className="hd-corr-input"
          />
        </div>
      </div>

      {/* Statement / Details: strictly 100% full width across all breakpoints */}
      <div className="hd-corr-row-full">
        <div className="hd-corr-field">
          <label htmlFor={`${uid}-message`} className="hd-corr-label">
            {messageLabel}
          </label>
          <textarea
            id={`${uid}-message`}
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={messagePlaceholder}
            className="hd-corr-textarea"
          />
        </div>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="hd-corr-submit-btn hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#F2EFE7] cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: 'var(--hd-copper-solid)' }}
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>{submitting ? 'Transmitting…' : submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
