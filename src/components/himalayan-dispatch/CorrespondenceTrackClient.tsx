'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

interface KewStatusSummary {
  trackingId: string;
  sourcePageLabel: string;
  managementCenterLabel: string;
  status: string;
  priority: string;
  updatedAt: string;
}

export function CorrespondenceTrackClient() {
  const router = useRouter();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [accessCredential, setAccessCredential] = useState('');
  const [showCredential, setShowCredential] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [kewDetectedId, setKewDetectedId] = useState<string | null>(null);
  const [kewLookupResult, setKewLookupResult] = useState<KewStatusSummary | null>(null);
  const [kewLookupError, setKewLookupError] = useState<string | null>(null);
  const [kewLoading, setKewLoading] = useState(false);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setKewDetectedId(null);
    setKewLookupResult(null);
    setKewLookupError(null);

    const refClean = referenceNumber.trim().toUpperCase();
    const credClean = accessCredential.trim();

    if (!refClean) {
      setError('Please enter your correspondence reference number.');
      return;
    }

    // Detect KEW environmental tracking prefix even before credential check
    if (
      refClean.startsWith('KEW-') ||
      refClean.startsWith('SEIAE-') ||
      refClean.startsWith('KEI-') ||
      refClean.startsWith('SIGHT-')
    ) {
      setKewDetectedId(refClean);
      await handleKewStatusLookup(refClean);
      return;
    }

    if (!credClean) {
      setError(
        'Correspondence is private. Both your reference number and secure access credential are required.'
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/himalayan-dispatch/correspondence/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: refClean,
          accessCredential: credClean,
        }),
      });
      const data = await res.json();

      if (data?.isKewEnvironmentalReference && data?.kewTrackingId) {
        setKewDetectedId(data.kewTrackingId);
        setLoading(false);
        await handleKewStatusLookup(data.kewTrackingId);
        return;
      }

      if (!res.ok || !data?.success) {
        setError(
          data?.error ||
            'Invalid correspondence reference number or access credential. A reference number alone cannot authorize access.'
        );
        setLoading(false);
        return;
      }

      router.push(HD_ROUTES.contactThread(data.referenceNumber));
    } catch {
      setError('Network error while verifying correspondence credentials.');
      setLoading(false);
    }
  }

  async function handleKewStatusLookup(trackingId: string) {
    setKewLoading(true);
    setKewLookupError(null);
    try {
      const res = await fetch(
        `/api/operations?trackingId=${encodeURIComponent(trackingId)}`
      );
      const json = await res.json();
      if (!res.ok || !json?.success || !json?.data) {
        setKewLookupError(
          json?.error ||
            `No active Kashmir EcoWatch operations ticket found for ${trackingId}.`
        );
      } else {
        setKewLookupResult({
          trackingId: json.data.trackingId,
          sourcePageLabel: json.data.sourcePageLabel,
          managementCenterLabel: json.data.managementCenterLabel,
          status: json.data.status,
          priority: json.data.priority,
          updatedAt: json.data.updatedAt,
        });
      }
    } catch {
      setKewLookupError('Unable to reach Kashmir EcoWatch operations status endpoint.');
    } finally {
      setKewLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Left 7 Columns: Credential Authentication Gate */}
      <section
        className="lg:col-span-7 p-7 sm:p-10 border space-y-8"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="space-y-2 border-b pb-6" style={{ borderColor: 'var(--hd-rule)' }}>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">CRYPTOGRAPHIC THREAD VERIFICATION</span>
          </div>
          <p
            className="hd-font-body text-base leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Correspondence is private. A reference number alone cannot authorize access.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label
              htmlFor="hd-track-ref"
              className="hd-font-sans block text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              Correspondence reference number *
            </label>
            <input
              id="hd-track-ref"
              type="text"
              required
              autoComplete="off"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="HDC-2026-XXXXXXXX"
              className="w-full px-4 py-3.5 border hd-font-sans text-sm tracking-wider uppercase focus:outline-none"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-fg)',
              }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="hd-track-cred"
              className="hd-font-sans block text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              Secure access credential *
            </label>
            <div className="relative">
              <input
                id="hd-track-cred"
                type={showCredential ? 'text' : 'password'}
                required
                autoComplete="off"
                value={accessCredential}
                onChange={(e) => setAccessCredential(e.target.value)}
                placeholder="HDK-XXXX-XXXX-XXXX-XXXX"
                className="w-full pl-4 pr-12 py-3.5 border hd-font-sans text-sm tracking-wider uppercase focus:outline-none"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowCredential((v) => !v)}
                aria-label={showCredential ? 'Hide credential' : 'Show credential'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:opacity-80"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                {showCredential ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="p-4 border hd-font-body text-sm"
              style={{
                borderColor: '#B91C1C',
                backgroundColor: 'rgba(185, 28, 28, 0.08)',
                color: 'var(--hd-fg)',
              }}
            >
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="hd-font-sans w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 border text-xs font-semibold tracking-[0.18em] uppercase transition-opacity disabled:opacity-50"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-copper-solid)',
                color: '#F2EFE7',
              }}
            >
              <span>{loading ? 'VERIFYING CREDENTIALS…' : 'ACCESS CORRESPONDENCE'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* KEW Environmental Reference Reuse Panel (Non-Duplicative) */}
        {kewDetectedId && (
          <div
            className="p-5 sm:p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg)',
            }}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker" style={{ color: 'var(--hd-copper)' }}>
                KASHMIR ECOWATCH ENVIRONMENTAL SUBMISSION DETECTED
              </span>
            </div>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Reference <code>{kewDetectedId}</code> belongs to the established Kashmir EcoWatch
              operations infrastructure. Status is queried directly from KEW without duplicating
              records:
            </p>
            {kewLoading && (
              <p className="hd-font-sans text-xs uppercase tracking-wider">
                Querying Kashmir EcoWatch Operations…
              </p>
            )}
            {kewLookupResult && (
              <div
                className="p-4 border space-y-1.5 text-sm hd-font-body"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <p>
                  <strong>Tracking ID:</strong> {kewLookupResult.trackingId}
                </p>
                <p>
                  <strong>KEW Facility:</strong> {kewLookupResult.sourcePageLabel} (
                  {kewLookupResult.managementCenterLabel})
                </p>
                <p>
                  <strong>Operational Status:</strong> {kewLookupResult.status} · Priority:{' '}
                  {kewLookupResult.priority}
                </p>
                <p className="text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                  Last Updated: {new Date(kewLookupResult.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
            {kewLookupError && (
              <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                {kewLookupError}
              </p>
            )}
            <div className="pt-1">
              <a
                href={toKewPlatformUrl('/contribute')}
                className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:underline"
                style={{ color: 'var(--hd-copper)' }}
              >
                <span>Open Kashmir EcoWatch Participation Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Right 5 Columns: Privacy, Credential Recovery & KEW Guidance */}
      <aside className="lg:col-span-5 space-y-6">
        <div
          className="p-6 sm:p-7 border space-y-3.5"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-recessed)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
            <h2 className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase">
              Zero-Enumeration Privacy Design
            </h2>
          </div>
          <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Every editorial correspondence thread uses a non-sequential reference number paired with
            a salted <code>scrypt</code> credential hash. Neither search engines nor third parties
            holding a reference code alone can inspect your messages, status, or attachments.
          </p>
        </div>

        <div
          className="p-6 sm:p-7 border space-y-3.5"
          style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
            <h2 className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase">
              Lost Access Credential Guidance
            </h2>
          </div>
          <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Because private access credentials are stored strictly as one-way cryptographic hashes,
            our newsroom cannot retrieve a lost credential in plaintext. If you misplaced your
            credential, send a new message referencing your original <code>HDC-2026-…</code> code
            from the same verified contact email so the receiving desk can link your inquiry.
          </p>
          <Link
            href={HD_ROUTES.contactMessage}
            className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:underline"
            style={{ color: 'var(--hd-copper)' }}
          >
            <span>Send New Editorial Message</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
