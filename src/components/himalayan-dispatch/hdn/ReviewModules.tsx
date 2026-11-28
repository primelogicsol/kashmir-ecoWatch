'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ExternalLink, FileCheck2, ShieldCheck } from 'lucide-react';
import { HDN_ROUTES } from '@/lib/hdn/routes';
import { toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import type { HdnScientificReviewRecord } from '@/types/hdn-newsroom';

export function HdnScientificReviewDashboardView({
  subview = 'dashboard',
}: {
  subview?: 'dashboard' | 'assignments' | 'history' | 'references';
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/reviews', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d.success && setData(d));
  }, []);

  if (!data) return <p className="text-xs text-slate-500">Loading Scientific Review Workspace…</p>;

  const reviews: HdnScientificReviewRecord[] = data.reviews || [];
  const eligible = data.eligibleManuscripts || [];
  const refs = data.kewObservatoryReferences || [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          STAGE 08 · INDEPENDENT SCIENTIFIC &amp; TECHNICAL PEER REVIEW
        </p>
        <h1 className="text-2xl font-bold">
          {subview === 'history'
            ? 'Completed Scientific Review Archive'
            : subview === 'references'
              ? 'KEW Scientific Observatory & Literature Baselines'
              : 'Scientific Review Workspace'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Evaluates empirical hydrological, cryospheric, statistical, and geospatial assertions. Confidential journalistic source identities are strictly isolated from this workspace.
        </p>
      </div>

      {subview === 'references' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {refs.map((r: any) => (
            <div key={r.code} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs">
              <div className="font-mono text-[10px] text-[#8C3125] font-bold">{r.code}</div>
              <div className="font-bold text-sm">{r.observatoryLabel}</div>
              <p className="text-slate-500">{r.summary}</p>
              <a
                href={toKewPlatformUrl(r.observatoryHref)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#8C3125] font-semibold underline"
              >
                <span>Open KEW Observatory</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      ) : subview === 'history' ? (
        <div className="space-y-3">
          {reviews.filter((r) => r.status === 'completed').length === 0 ? (
            <p className="text-xs text-slate-500">No completed reviews recorded yet.</p>
          ) : (
            reviews
              .filter((r) => r.status === 'completed')
              .map((r) => (
                <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-white text-xs space-y-1">
                  <div className="font-bold text-sm">{r.manuscriptTitle}</div>
                  <div>
                    Reviewer: {r.assignedReviewerName} · Verdict:{' '}
                    <strong className="uppercase">{r.recommendation}</strong> · Completed{' '}
                    {r.completedAt?.slice(0, 10)}
                  </div>
                  <p className="text-slate-500">{r.methodologicalComments}</p>
                </div>
              ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Manuscripts Assigned or Eligible for Technical Review ({eligible.length})
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {eligible.map((m: any) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase text-slate-500">
                    {m.bureauId} · {m.departmentId} · {m.wordCount} words
                  </div>
                  <div className="font-bold text-sm">{m.headline}</div>
                  <div className="text-slate-500">
                    Status: {m.scientificReviewCompleted ? `Verified by ${m.scientificReviewedBy}` : 'Awaiting Technical Assessment'}
                  </div>
                </div>
                <Link
                  href={HDN_ROUTES.reviewDetail(m.id)}
                  className="px-4 py-2 rounded-lg bg-[#8C3125] text-white font-semibold shrink-0 text-center"
                >
                  Open Technical Review →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HdnIndividualReviewWorkspaceView({ targetId }: { targetId: string }) {
  const [ms, setMs] = useState<any>(null);
  const [methodology, setMethodology] = useState('');
  const [statStatus, setStatStatus] = useState<'verified' | 'not_applicable' | 'revision_needed'>('verified');
  const [geoStatus, setGeoStatus] = useState<'verified' | 'not_applicable' | 'revision_needed'>('verified');
  const [uncertainty, setUncertainty] = useState('');
  const [refsText, setRefsText] = useState('');
  const [coiDeclared, setCoiDeclared] = useState(false);
  const [coiDetails, setCoiDetails] = useState('No financial, institutional, or personal conflict of interest.');
  const [recommendation, setRecommendation] =
    useState<'approve' | 'minor_revisions' | 'major_revisions' | 'reject'>('approve');
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/reviews?id=${encodeURIComponent(targetId)}`,
      { credentials: 'include' }
    );
    const d = await res.json();
    if (d.success) {
      setMs(d.manuscript);
      if (d.review) {
        setMethodology(d.review.methodologicalComments || '');
        setStatStatus(d.review.statisticalVerificationStatus || 'verified');
        setGeoStatus(d.review.geospatialVerificationStatus || 'verified');
        setUncertainty(d.review.uncertaintyAssessment || '');
        setRefsText((d.review.supportingReferences || []).join('\n'));
        setRecommendation(d.review.recommendation || 'approve');
      }
    } else {
      setError(d.error || 'Unable to open review packet.');
    }
  }, [targetId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSubmit = async (completeReview: boolean) => {
    if (!ms) return;
    setError(null);
    const res = await fetch('/api/himalayan-dispatch/hdn/reviews', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        manuscriptId: ms.id,
        methodologicalComments: methodology,
        statisticalVerificationStatus: statStatus,
        geospatialVerificationStatus: geoStatus,
        uncertaintyAssessment: uncertainty,
        supportingReferences: refsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        conflictOfInterestDeclared: coiDeclared,
        conflictOfInterestDetails: coiDetails,
        recommendation,
        completeReview,
      }),
    });
    const d = await res.json();
    if (!res.ok || !d.success) {
      setError(d.error || 'Review submission denied.');
    } else {
      setNotice(
        completeReview
          ? `Completed Stage 08 Scientific Review (${recommendation.toUpperCase()}).`
          : 'Saved draft scientific review notes.'
      );
    }
  };

  if (!ms) return <p className="text-xs text-slate-500">{error || 'Loading sanitized manuscript…'}</p>;

  return (
    <div className="space-y-6">
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs flex items-center gap-2 text-amber-900">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          <strong>Source-Protection Isolation Active:</strong> Confidential journalistic source
          records and private reporter correspondence are automatically stripped from this scientific
          review packet.
        </span>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}
      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sanitized Manuscript Reader */}
        <div className="lg:col-span-7 p-6 rounded-xl border border-slate-200 bg-white space-y-4">
          <div className="text-[10px] font-mono uppercase text-slate-500">{ms.dateline}</div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">{ms.headline}</h1>
          <p className="font-serif italic text-base text-slate-600">{ms.standfirst}</p>
          <div className="space-y-4 pt-4 border-t border-slate-200 font-serif text-sm leading-relaxed">
            {(ms.blocks || []).map((b: any) => (
              <div key={b.id} className="space-y-2">
                {b.heading && <h2 className="font-bold text-base">{b.heading}</h2>}
                {b.bodyText && <p className="whitespace-pre-wrap">{b.bodyText}</p>}
                {b.equationLatex && (
                  <div className="p-2.5 rounded bg-slate-100 font-mono text-xs">
                    Equation: {b.equationLatex}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Structured Technical Assessment Form */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 bg-white space-y-3.5 text-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Technical &amp; Methodological Assessment
          </h2>

          <div>
            <label className="block font-semibold mb-1">Methodological &amp; Claim Assessment *</label>
            <textarea
              rows={4}
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              placeholder="Evaluate physical mechanisms, station/satellite interpretation, and claim accuracy…"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-semibold mb-1">Statistical Check</label>
              <select
                value={statStatus}
                onChange={(e) => setStatStatus(e.target.value as typeof statStatus)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-transparent"
              >
                <option value="verified">Verified</option>
                <option value="not_applicable">Not Applicable</option>
                <option value="revision_needed">Revision Needed</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Geospatial Check</label>
              <select
                value={geoStatus}
                onChange={(e) => setGeoStatus(e.target.value as typeof geoStatus)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-transparent"
              >
                <option value="verified">Verified</option>
                <option value="not_applicable">Not Applicable</option>
                <option value="revision_needed">Revision Needed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Scientific Uncertainty Assessment</label>
            <textarea
              rows={2}
              value={uncertainty}
              onChange={(e) => setUncertainty(e.target.value)}
              placeholder="Note confidence intervals, sensor limitations, or required qualifications…"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Supporting Literature / DOIs (1 per line)</label>
            <textarea
              rows={2}
              value={refsText}
              onChange={(e) => setRefsText(e.target.value)}
              placeholder="https://doi.org/10...."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent font-mono"
            />
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={coiDeclared}
                onChange={(e) => setCoiDeclared(e.target.checked)}
              />
              <span>Declare potential conflict of interest</span>
            </label>
            <input
              value={coiDetails}
              onChange={(e) => setCoiDetails(e.target.value)}
              className="w-full px-3 py-1.5 rounded border border-slate-300 bg-transparent"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Scientific Review Recommendation</label>
            <select
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value as typeof recommendation)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent font-semibold"
            >
              <option value="approve">Approve Scientific Claims</option>
              <option value="minor_revisions">Request Minor Technical Revisions</option>
              <option value="major_revisions">Request Major Methodological Revisions</option>
              <option value="reject">Unsubstantiated — Recommend Rejection</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => void handleSubmit(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 font-semibold cursor-pointer"
            >
              Save Progress
            </button>
            <button
              type="button"
              onClick={() => void handleSubmit(true)}
              className="flex-1 py-2 rounded-lg bg-[#8C3125] text-white font-semibold cursor-pointer"
            >
              Sign &amp; Complete Scientific Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
