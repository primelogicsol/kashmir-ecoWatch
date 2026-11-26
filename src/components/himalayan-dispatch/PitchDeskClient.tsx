'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { EditorialDepartment, EditorialDepartmentId } from '@/types/himalayan-dispatch';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export function PitchDeskClient({
  departments,
}: {
  departments: EditorialDepartment[];
}) {
  const { user, isLoggedIn } = useAuth();
  const [proposedHeadline, setProposedHeadline] = useState('');
  const [departmentId, setDepartmentId] = useState<EditorialDepartmentId>('longform-features');
  const [region, setRegion] = useState('');
  const [storySummary, setStorySummary] = useState('');
  const [reportingAccessAndSources, setReportingAccessAndSources] = useState('');
  const [estimatedWordCount, setEstimatedWordCount] = useState('3,000 words');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPortfolioUrl, setAuthorPortfolioUrl] = useState('');
  const [requiresSourceProtection, setRequiresSourceProtection] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ trackingCode: string; message: string } | null>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      if (!authorName) setAuthorName(user.name);
      if (!authorEmail) setAuthorEmail(user.email);
      if (!region && user.district) setRegion(user.district);
    }
  }, [isLoggedIn, user, authorName, authorEmail, region]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/himalayan-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposedHeadline,
          departmentId,
          region,
          storySummary,
          reportingAccessAndSources,
          estimatedWordCount,
          authorName,
          authorEmail,
          authorPortfolioUrl,
          requiresSourceProtection,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to submit pitch.');
      } else {
        setReceipt({
          trackingCode: data.trackingCode,
          message: data.message,
        });
      }
    } catch {
      setError('Network error while contacting the Commissioning Desk.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left 5 Cols: Commissioning Guidelines & Source Safety */}
        <div className="lg:col-span-5 space-y-6">
          <p className="hd-kicker">STAGE 01 · COMMISSIONING DESK</p>
          <h1
            className="hd-font-display text-4xl sm:text-5xl font-semibold leading-[1.03]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Pitch a Story to Himalayan Dispatch
          </h1>
          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            We commission deeply reported environmental narratives, field notebooks, monochrome and
            color photo essays, investigative dispatches, and cartographic essays rooted in the
            Western Himalayas.
          </p>

          <div
            className="p-6 border-l-2 space-y-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">CONFIDENTIAL SOURCE PROTOCOL</span>
            </div>
            <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Never paste sensitive whistleblower identities, raw leaked files, or unredacted
              coordinates of endangered taxa into a standard web form. Check the confidential
              channel box to request an encrypted Signal/PGP handoff with our Managing Editor.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <p className="hd-kicker">WHAT WE LOOK FOR</p>
            <ul className="space-y-2 hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
              <li>• Specific place, season, and human stakes—not broad topic overviews.</li>
              <li>• Primary field reporting paired with verifiable documentary or scientific anchors.</li>
              <li>• Original documentary photography with zero digital fabrication.</li>
            </ul>
          </div>

          <div
            className="p-5 border space-y-2"
            style={{
              borderColor: 'var(--hd-rule)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">SEEKING AN ONGOING NEWSROOM ROLE?</p>
            <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Submitting an independent story pitch is distinct from applying to become a
              regular reporter, district correspondent, or masthead contributor.
            </p>
            <Link
              href={HD_ROUTES.joinNewsroom}
              className="hd-kicker inline-block pt-1 hover:underline"
            >
              Apply via Join the Newsroom →
            </Link>
          </div>
        </div>

        {/* Right 7 Cols: Editorial Pitch Form */}
        <div className="lg:col-span-7">
          {receipt ? (
            <div
              className="p-8 sm:p-10 border space-y-5"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">PITCH LOGGED WITH COMMISSIONING DESK</span>
              </div>
              <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Docket Reference: {receipt.trackingCode}
              </h2>
              <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {receipt.message}
              </p>
              <div className="pt-3 flex flex-wrap gap-6">
                <Link href={HD_ROUTES.root} className="hd-kicker hover:underline">
                  ← Return to Current Edition
                </Link>
                <Link href={HD_ROUTES.forthcoming} className="hd-kicker hover:underline">
                  View Issue 02 Preview →
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 border space-y-6"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {error && (
                <div
                  className="p-4 border text-sm hd-font-body"
                  style={{
                    borderColor: 'var(--hd-copper)',
                    color: 'var(--hd-copper)',
                  }}
                >
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="hd-pitch-headline" className="hd-kicker block">
                  Working Headline *
                </label>
                <input
                  id="hd-pitch-headline"
                  type="text"
                  required
                  value={proposedHeadline}
                  onChange={(e) => setProposedHeadline(e.target.value)}
                  placeholder="e.g., Where the Last Karst Springs Still Feed Winter Orchards"
                  className="w-full px-4 py-3 border bg-transparent hd-font-display text-xl"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="hd-pitch-dept" className="hd-kicker block">
                    Department *
                  </label>
                  <select
                    id="hd-pitch-dept"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value as EditorialDepartmentId)}
                    className="w-full px-4 py-3 border hd-font-body text-sm"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg)',
                      color: 'var(--hd-fg)',
                    }}
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="hd-pitch-region" className="hd-kicker block">
                    Watershed / Subregion
                  </label>
                  <input
                    id="hd-pitch-region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="e.g., Sindh Basin, Zanskar, Pir Panjal"
                    className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="hd-pitch-summary" className="hd-kicker block">
                  Narrative Pitch &amp; Central Question *
                </label>
                <textarea
                  id="hd-pitch-summary"
                  rows={5}
                  required
                  value={storySummary}
                  onChange={(e) => setStorySummary(e.target.value)}
                  placeholder="Outline the story arc, why it matters now, and what distinguishes it from daily news coverage..."
                  className="w-full px-4 py-3 border bg-transparent hd-font-body text-base"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="hd-pitch-access" className="hd-kicker block">
                    Field Access &amp; Public Evidence Base
                  </label>
                  <input
                    id="hd-pitch-access"
                    type="text"
                    value={reportingAccessAndSources}
                    onChange={(e) => setReportingAccessAndSources(e.target.value)}
                    placeholder="Archival records, field visits, scientific studies"
                    className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="hd-pitch-length" className="hd-kicker block">
                    Proposed Scope / Format
                  </label>
                  <input
                    id="hd-pitch-length"
                    type="text"
                    value={estimatedWordCount}
                    onChange={(e) => setEstimatedWordCount(e.target.value)}
                    className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="hd-pitch-name" className="hd-kicker block">
                    Your Name *
                  </label>
                  <input
                    id="hd-pitch-name"
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="hd-pitch-email" className="hd-kicker block">
                    Email *
                  </label>
                  <input
                    id="hd-pitch-email"
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="hd-pitch-portfolio" className="hd-kicker block">
                    Clips / Portfolio URL
                  </label>
                  <input
                    id="hd-pitch-portfolio"
                    type="url"
                    value={authorPortfolioUrl}
                    onChange={(e) => setAuthorPortfolioUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                    style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requiresSourceProtection}
                  onChange={(e) => setRequiresSourceProtection(e.target.checked)}
                  className="mt-1"
                />
                <span className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                  This inquiry involves sensitive sources or investigative documents; request an
                  encrypted follow-up channel from the Managing Editor rather than sharing details here.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Filing Pitch…' : 'Transmit Pitch to Editors'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
