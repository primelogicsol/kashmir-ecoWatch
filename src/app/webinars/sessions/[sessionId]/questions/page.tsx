'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { MessageSquare, ThumbsUp, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { SESSIONS_DETAILED, SAMPLE_QNA_ITEMS, QnAItem } from '@/data/conference-system';

export default function SessionQuestionsPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const session = SESSIONS_DETAILED.find(s => s.id === sessionId) || SESSIONS_DETAILED[0];

  const [qnaList, setQnaList] = useState<QnAItem[]>(SAMPLE_QNA_ITEMS);
  const [newQuestion, setNewQuestion] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorAffiliation, setAuthorAffiliation] = useState('');

  const handleUpvote = (id: string) => {
    setQnaList(prev => prev.map(q => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const item: QnAItem = {
      id: 'qna-' + Date.now(),
      author: authorName.trim() || 'Delegate Scholar',
      affiliation: authorAffiliation.trim() || 'Visiting Scientist',
      question: newQuestion,
      upvotes: 1,
      isAnswered: false,
      timestamp: 'Just now'
    };
    setQnaList([item, ...qnaList]);
    setNewQuestion('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Peer-Moderated Technical Inquiries"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: session.roomCode, href: `/webinars/sessions/${session.id}` },
          { label: 'Q&A' }
        ]}
        icon={<MessageSquare className="w-6 h-6 text-teal-400" />}
        title={`Moderated Questions &amp; Dialogue • ${session.title}`}
        subtitle="Submit technical questions for keynote speakers, upvote priority inquiries from participating scientists, and review verified answers recorded by session chairs."
      />

      <WebinarNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href={`/webinars/sessions/${session.id}`}
            className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Session Overview</span>
          </Link>
          <span className="text-xs text-slate-400 font-mono">{qnaList.length} Questions Queued</span>
        </div>

        {/* Submit Form */}
        <form onSubmit={handlePost} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
          <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Ask a Technical Question</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Your Name (e.g. Dr. A. Mir)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <input
              type="text"
              required
              placeholder="Your Affiliation (e.g. NIT Srinagar)"
              value={authorAffiliation}
              onChange={(e) => setAuthorAffiliation(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <textarea
            rows={3}
            required
            placeholder="Type your scientific question for the speaker or moderator..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Moderation Queue</span>
            </button>
          </div>
        </form>

        {/* Questions list */}
        <div className="space-y-4">
          {qnaList.map(q => (
            <div key={q.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-white">{q.author}</div>
                  <div className="text-[11px] text-teal-400 font-mono">{q.affiliation} • {q.timestamp}</div>
                </div>
                <button
                  onClick={() => handleUpvote(q.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{q.upvotes}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{q.question}</p>

              {q.isAnswered && q.answer && (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-teal-500/20 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Answered by Session Faculty</span>
                  </div>
                  <div>{q.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
