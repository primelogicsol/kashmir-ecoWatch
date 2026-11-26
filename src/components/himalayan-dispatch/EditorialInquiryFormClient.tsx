'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
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
  submitLabel = 'Transmit to Desk',
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
  const [receipt, setReceipt] = useState<{ trackingCode: string; message: string } | null>(null);

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
          subject: showPositionField && positionTitle ? `${positionTitle} — ${subject || 'Appointment Inquiry'}` : subject,
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
        className="p-8 sm:p-10 border space-y-4"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--hd-copper)' }} />
          <span className="hd-kicker">LOGGED WITH HIMALAYAN DISPATCH</span>
        </div>
        <h3 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
          Reference Number: {receipt.trackingCode}
        </h3>
        <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
          {receipt.message}
        </p>
        <button
          type="button"
          onClick={() => {
            setReceipt(null);
            setMessage('');
          }}
          className="hd-kicker hover:underline cursor-pointer pt-1"
        >
          Submit Another Dispatch →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-10 border space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      <div className="space-y-2 pb-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
        <p className="hd-kicker">{kicker}</p>
        <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
          {heading}
        </h3>
        <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
          {description}
        </p>
      </div>

      {error && (
        <div
          className="p-4 border text-sm hd-font-body"
          style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className="hd-kicker block">Full Name *</label>
          <input
            type="text"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
            style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
          />
        </div>
        <div className="space-y-1.5">
          <label className="hd-kicker block">Correspondence Email *</label>
          <input
            type="email"
            required
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
            style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
          />
        </div>
        <div className="space-y-1.5">
          <label className="hd-kicker block">Affiliation / Location</label>
          <input
            type="text"
            value={organizationOrLocation}
            onChange={(e) => setOrganizationOrLocation(e.target.value)}
            placeholder="City, district, or institution"
            className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
            style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
          />
        </div>
      </div>

      {showPositionField && positionOptions.length > 0 && (
        <div className="space-y-1.5">
          <label className="hd-kicker block">Editorial or Advisory Seat *</label>
          <select
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 border hd-font-body text-sm"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg)',
              color: 'var(--hd-fg)',
            }}
          >
            {positionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className={showArticleUrlField ? 'space-y-1.5' : 'sm:col-span-2 space-y-1.5'}>
          <label className="hd-kicker block">{subjectLabel}</label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={subjectPlaceholder}
            className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
            style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
          />
        </div>

        {showArticleUrlField && (
          <div className="space-y-1.5">
            <label className="hd-kicker block">Article URL or Headline</label>
            <input
              type="text"
              value={relatedArticleUrl}
              onChange={(e) => setRelatedArticleUrl(e.target.value)}
              placeholder="/himalayan-dispatch/issues/..."
              className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
              style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
            />
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="hd-kicker block">{messageLabel}</label>
        <textarea
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={messagePlaceholder}
          className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
          style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer disabled:opacity-50"
        style={{ backgroundColor: 'var(--hd-copper-solid)' }}
      >
        <Send className="w-3.5 h-3.5" />
        <span>{submitting ? 'Transmitting…' : submitLabel}</span>
      </button>
    </form>
  );
}
