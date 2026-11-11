'use client';

import React, { useState } from 'react';
import { FileCheck2, CheckCircle2, ShieldCheck, UserCheck, Star } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { ABSTRACT_SUBMISSIONS, AbstractSubmission } from '@/data/conference-system';

export default function AdminAbstractsReviewPage() {
  const [abstracts, setAbstracts] = useState<AbstractSubmission[]>(ABSTRACT_SUBMISSIONS);

  const handleScore = (id: string, score: number) => {
    setAbstracts(prev => prev.map(abs => {
      if (abs.id === id) {
        return {
          ...abs,
          status: 'accepted',
          reviewerScores: [
            {
              reviewerName: 'KEW Senior Referee Panel',
              noveltyScore: score,
              methodologyScore: 9,
              relevanceScore: 10,
              recommendation: 'Accept',
              comments: 'Evaluated with high marks on empirical methodology and Western Himalayan water relevance.'
            }
          ]
        };
      }
      return abs;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Scientific Editorial Directorate"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Abstract Review' }
        ]}
        icon={<FileCheck2 className="w-6 h-6 text-amber-400" />}
        title="Double-Blind Abstract Review &amp; Referee Scoring"
        subtitle="Assign independent academic referees, record double-blind novelty and methodology scores, and make acceptance decisions for DOI proceedings."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="space-y-4">
          {abstracts.map(abs => (
            <div key={abs.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400">{abs.id}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  abs.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {abs.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{abs.title}</h3>
              <div className="text-xs text-slate-400">{abs.conferenceTitle} • {abs.trackName}</div>
              <p className="text-xs text-slate-300">{abs.abstractText}</p>

              {abs.reviewerScores.length > 0 ? (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-teal-500/20 text-xs text-slate-300">
                  <div className="font-bold text-teal-300">Referee Decision: {abs.reviewerScores[0].recommendation}</div>
                  <div>Novelty: {abs.reviewerScores[0].noveltyScore}/10 • Methodology: {abs.reviewerScores[0].methodologyScore}/10</div>
                  <div className="text-slate-400 mt-1 italic">&quot;{abs.reviewerScores[0].comments}&quot;</div>
                </div>
              ) : (
                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs text-slate-400">Record Referee Grade:</span>
                  <button
                    onClick={() => handleScore(abs.id, 9)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                  >
                    Accept Paper (Score: 9/10)
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
