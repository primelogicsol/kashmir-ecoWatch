'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { FileText, CheckCircle2, ShieldCheck, Upload, AlertCircle } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { ConferenceSubNav } from '@/components/webinars/ConferenceSubNav';
import { CONFERENCES_DETAILED, ABSTRACT_SUBMISSIONS } from '@/data/conference-system';

export default function ConferenceAbstractsPage() {
  const [paperTitle, setPaperTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorAffiliation, setAuthorAffiliation] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const params = useParams();
  const conferenceId = params?.conferenceId as string;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId) || CONFERENCES_DETAILED[0];

  const myAbstracts = ABSTRACT_SUBMISSIONS.filter(a => a.conferenceId === conference.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Call for Papers &amp; Double-Blind Scientific Review"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Abstracts & CFP' }
        ]}
        icon={<FileText className="w-6 h-6 text-teal-400" />}
        title={`Call for Papers &amp; Scientific Abstracts • ${conference.shortTitle}`}
        subtitle="Submit original environmental research abstracts, track peer-review scores, and qualify accepted papers for presentation and publication in DOI-indexed proceedings."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Peer Review Governance Notice */}
        <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 font-mono font-bold text-teal-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Double-Blind Peer-Review Standards</span>
          </div>
          <p>
            In accordance with Kashmir EcoWatch publishing ethics, papers are described as &quot;peer-reviewed&quot; only after documented independent evaluation by at least two senior academic referees. Submissions are graded on novelty (10), methodology (10), and Western Himalayan environmental relevance (10).
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Abstract Successfully Submitted</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your paper &quot;{paperTitle}&quot; has been assigned tracking code <code className="text-teal-300 font-mono">ABS-2027-{Math.floor(100 + Math.random() * 900)}</code> and queued for reviewer assignment.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-teal-300 hover:bg-slate-700"
            >
              Submit Another Abstract
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-5">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
              Abstract Submission Dossier (Deadline: {conference.abstractDeadline || 'Rolling'})
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Parallel Track</label>
              <select
                value={selectedTrack || conference.tracks[0].id}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              >
                {conference.tracks.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Paper Title</label>
              <input
                type="text"
                required
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
                placeholder="e.g. Geodetic Differential Mass Balance of Kolahoi Glacier Terminus 2018–2027"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Lead Author / Presenter</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Dr. / Scholar Name"
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Institutional Affiliation</label>
                <input
                  type="text"
                  required
                  value={authorAffiliation}
                  onChange={(e) => setAuthorAffiliation(e.target.value)}
                  placeholder="e.g. Department of Earth Sciences, KU"
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Abstract Text (300 words max)</label>
              <textarea
                rows={5}
                required
                value={abstractText}
                onChange={(e) => setAbstractText(e.target.value)}
                placeholder="State research hypothesis, satellite sensors / field instruments used, empirical findings, and conservation implications..."
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Submissions undergo double-blind review.</span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
              >
                Submit Abstract for Review
              </button>
            </div>
          </form>
        )}

        {/* Accepted / Sample Abstracts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white">Accepted Conference Abstracts &amp; Review Status</h3>
          <div className="space-y-4">
            {myAbstracts.map(abs => (
              <div key={abs.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-teal-300">{abs.id}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {abs.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{abs.title}</h4>
                <div className="text-xs text-slate-400">
                  Authors: <span className="text-slate-200">{abs.authors.map(a => a.name).join(', ')}</span> ({abs.authors[0].affiliation})
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{abs.abstractText}</p>
                {abs.reviewerScores.length > 0 && (
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-xs text-slate-300">
                    <strong className="text-teal-400">Reviewer Evaluation:</strong> {abs.reviewerScores[0].comments} (Recommendation: {abs.reviewerScores[0].recommendation})
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
