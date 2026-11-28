'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowRight,
  Download,
  FileText,
  Lock,
  LogOut,
  Paperclip,
  RefreshCw,
  Send,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import type { PublicCorrespondenceThreadView } from '@/lib/himalayan-dispatch-correspondence-types';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

function formatStatusLabel(status: string): string {
  switch (status) {
    case 'unread':
      return 'Received · Queued for Desk Review';
    case 'under_review':
      return 'Under Editorial Review';
    case 'assigned':
      return 'Assigned to Desk / Bureau';
    case 'awaiting_response':
      return 'Awaiting Correspondent Clarification / Evidence';
    case 'responded':
      return 'Editorial Response Issued';
    case 'resolved':
      return 'Resolved';
    case 'archived':
      return 'Archived';
    default:
      return status;
  }
}

export function CorrespondenceThreadClient({ reference }: { reference: string }) {
  const router = useRouter();
  const normalizedRef = decodeURIComponent(reference || '').trim().toUpperCase();

  const [loading, setLoading] = useState(true);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [thread, setThread] = useState<PublicCorrespondenceThreadView | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Inline credential unlock when visiting URL directly without active session cookie
  const [accessCredential, setAccessCredential] = useState('');
  const [unlocking, setUnlocking] = useState(false);

  // Follow-up reply composer
  const [replyBody, setReplyBody] = useState('');
  const [replyFiles, setReplyFiles] = useState<File[]>([]);
  const [sendingReply, setSendingReply] = useState(false);
  const [replyNotice, setReplyNotice] = useState<string | null>(null);

  const loadThread = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/himalayan-dispatch/correspondence/thread/${encodeURIComponent(normalizedRef)}`,
        { cache: 'no-store' }
      );
      const data = await res.json();
      if (res.status === 401 || data?.requiresAuthentication) {
        setRequiresAuth(true);
        setThread(null);
        setLoading(false);
        return;
      }
      if (!res.ok || !data?.success || !data?.thread) {
        setError(data?.error || 'Unable to load correspondence thread.');
        setLoading(false);
        return;
      }
      setRequiresAuth(false);
      setThread(data.thread);
    } catch {
      setError('Network error while retrieving private correspondence thread.');
    } finally {
      setLoading(false);
    }
  }, [normalizedRef]);

  useEffect(() => {
    loadThread();
  }, [loadThread]);

  async function handleInlineUnlock(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!accessCredential.trim()) {
      setError('Please enter your private access credential.');
      return;
    }
    setUnlocking(true);
    try {
      const res = await fetch('/api/himalayan-dispatch/correspondence/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: normalizedRef,
          accessCredential: accessCredential.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(
          data?.error ||
            'Invalid access credential. Correspondence is private; a reference number alone cannot authorize access.'
        );
        setUnlocking(false);
        return;
      }
      setAccessCredential('');
      await loadThread();
    } catch {
      setError('Unable to verify access credential.');
    } finally {
      setUnlocking(false);
    }
  }

  async function handleSignOutThread() {
    await fetch('/api/himalayan-dispatch/correspondence/track', { method: 'DELETE' }).catch(
      () => {}
    );
    setThread(null);
    setRequiresAuth(true);
    router.push(HD_ROUTES.contactTrack);
  }

  function handleReplyFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files || []);
    if (!incoming.length) return;
    const merged = [...replyFiles, ...incoming].slice(0, 3);
    for (const f of merged) {
      if (f.size > 5 * 1024 * 1024) {
        setError(`Attachment "${f.name}" exceeds the 5 MB security limit.`);
        e.target.value = '';
        return;
      }
    }
    setReplyFiles(merged);
    e.target.value = '';
  }

  async function handleSendReply(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setReplyNotice(null);
    if (replyBody.trim().length < 5) {
      setError('Please enter a follow-up message of at least 5 characters.');
      return;
    }

    setSendingReply(true);
    try {
      const formData = new FormData();
      formData.set('message', replyBody.trim());
      if (!thread?.isConfidential) {
        for (const f of replyFiles) {
          formData.append('attachments', f);
        }
      }

      const res = await fetch(
        `/api/himalayan-dispatch/correspondence/thread/${encodeURIComponent(normalizedRef)}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data?.error || 'Unable to post follow-up message.');
        setSendingReply(false);
        return;
      }

      setReplyBody('');
      setReplyFiles([]);
      setThread(data.thread);
      setReplyNotice('Your follow-up reply has been encrypted and delivered to the assigned desk.');
    } catch {
      setError('Network error while posting follow-up reply.');
    } finally {
      setSendingReply(false);
    }
  }

  if (loading) {
    return (
      <div
        className="p-10 border text-center hd-font-sans text-xs tracking-[0.18em] uppercase"
        style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
      >
        Verifying Private Thread Session…
      </div>
    );
  }

  if (requiresAuth || !thread) {
    return (
      <section
        className="max-w-2xl p-7 sm:p-10 border space-y-6"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">PRIVATE THREAD AUTHENTICATION REQUIRED</span>
          </div>
          <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
            Unlock Reference {normalizedRef}
          </h2>
          <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Correspondence is private. A reference number in the URL alone cannot authorize access.
            Enter your one-time Secure Access Credential below to view this thread.
          </p>
        </div>

        <form onSubmit={handleInlineUnlock} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="inline-thread-cred"
              className="hd-font-sans block text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              Secure access credential *
            </label>
            <input
              id="inline-thread-cred"
              type="password"
              required
              autoComplete="off"
              value={accessCredential}
              onChange={(e) => setAccessCredential(e.target.value)}
              placeholder="HDK-XXXX-XXXX-XXXX-XXXX"
              className="w-full px-4 py-3 border hd-font-sans text-sm tracking-wider uppercase focus:outline-none"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-fg)',
              }}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="p-3.5 border hd-font-body text-sm"
              style={{
                borderColor: '#B91C1C',
                backgroundColor: 'rgba(185, 28, 28, 0.08)',
              }}
            >
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={unlocking}
              className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-copper-solid)',
                color: '#F2EFE7',
              }}
            >
              <span>{unlocking ? 'UNLOCKING…' : 'UNLOCK PRIVATE THREAD'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href={HD_ROUTES.contactTrack}
              className="hd-font-sans text-xs font-semibold tracking-[0.15em] uppercase hover:underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              Switch Reference Number
            </Link>
          </div>
        </form>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      {/* Metadata & Status Header */}
      <section
        className="p-6 sm:p-9 border space-y-6"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--hd-rule)' }}>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="hd-kicker">{thread.referenceNumber}</span>
              <span
                className="hd-font-sans px-2.5 py-1 border text-[10px] font-semibold tracking-[0.15em] uppercase"
                style={{
                  borderColor: 'var(--hd-copper)',
                  color: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                {formatStatusLabel(thread.status)}
              </span>
              {thread.isConfidential && (
                <span
                  className="hd-font-sans px-2.5 py-1 border text-[10px] font-semibold tracking-[0.15em] uppercase"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  Restricted Source Protection Desk
                </span>
              )}
            </div>
            <h2 className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight">
              {thread.subject}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadThread}
              className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase hover:opacity-80"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleSignOutThread}
              className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase hover:opacity-80"
              style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Thread</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-sm hd-font-body">
          <div>
            <span className="hd-kicker block mb-1">CATEGORY</span>
            <span>{thread.categoryLabel}</span>
          </div>
          <div>
            <span className="hd-kicker block mb-1">ASSIGNED EDITORIAL DESK</span>
            <span>{thread.assignedDepartment}</span>
          </div>
          <div>
            <span className="hd-kicker block mb-1">REGIONAL FOCUS</span>
            <span>{thread.region}</span>
          </div>
          <div>
            <span className="hd-kicker block mb-1">LOGGED / UPDATED</span>
            <span>{new Date(thread.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        {thread.status === 'awaiting_response' && (
          <div
            className="p-4 border flex items-start gap-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg)',
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
            <p className="hd-font-body text-sm leading-relaxed">
              <strong>Editorial Clarification or Evidence Requested:</strong> The assigned desk has
              requested additional context or supporting documentation below. Use the reply form at
              the bottom of this thread to respond securely.
            </p>
          </div>
        )}
      </section>

      {/* Chronological Message History */}
      <section className="space-y-5" aria-label="Correspondence Message History">
        <h3 className="hd-kicker">CHRONOLOGICAL CORRESPONDENCE RECORD ({thread.messages.length})</h3>

        <div className="space-y-5">
          {thread.messages.map((msg) => {
            const isEditorial = msg.senderType === 'editorial_desk';
            return (
              <article
                key={msg.id}
                className="p-6 sm:p-8 border space-y-4"
                style={{
                  borderColor: isEditorial ? 'var(--hd-copper)' : 'var(--hd-rule-strong)',
                  backgroundColor: isEditorial ? 'var(--hd-bg-recessed)' : 'var(--hd-bg)',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="flex items-center gap-2.5">
                    {isEditorial && (
                      <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                    )}
                    <span className="hd-font-sans text-xs font-semibold tracking-[0.14em] uppercase">
                      {msg.senderLabel}
                    </span>
                    {msg.messageKind === 'evidence_request' && (
                      <span
                        className="hd-font-sans text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                        style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                      >
                        Information Request
                      </span>
                    )}
                  </div>
                  <time
                    className="hd-font-sans text-[11px] tracking-wider uppercase"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  >
                    {new Date(msg.createdAt).toLocaleString()}
                  </time>
                </div>

                <div className="hd-font-body text-base leading-relaxed whitespace-pre-wrap">
                  {msg.body}
                </div>

                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-kicker block">ENCRYPTED ATTACHMENTS</span>
                    <div className="flex flex-wrap gap-2.5">
                      {msg.attachments.map((att) => (
                        <a
                          key={att.id}
                          href={`/api/himalayan-dispatch/correspondence/attachment/${encodeURIComponent(
                            att.id
                          )}`}
                          className="hd-font-sans inline-flex items-center gap-2 px-3.5 py-2 border text-xs hover:opacity-85"
                          style={{
                            borderColor: 'var(--hd-rule-strong)',
                            backgroundColor: 'var(--hd-bg-elevated)',
                          }}
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                          <span>{att.filename}</span>
                          <span style={{ color: 'var(--hd-fg-muted)' }}>
                            ({Math.max(1, Math.round(att.sizeBytes / 1024))} KB)
                          </span>
                          <Download className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Correspondent Follow-Up Reply Composer */}
      <section
        className="p-6 sm:p-9 border space-y-6"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="space-y-1">
          <p className="hd-kicker">CONTINUE CORRESPONDENCE</p>
          <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold">
            Send Follow-Up Reply or Requested Clarification
          </h3>
        </div>

        <form onSubmit={handleSendReply} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="hd-thread-reply"
              className="hd-font-sans block text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              Your Reply to {thread.assignedDepartment} *
            </label>
            <textarea
              id="hd-thread-reply"
              rows={5}
              required
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Provide follow-up details, answers to editorial questions, or documentary references..."
              className="w-full px-4 py-3 border hd-font-body text-base leading-relaxed focus:outline-none"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-fg)',
              }}
            />
          </div>

          {!thread.isConfidential && (
            <div
              className="p-4 border space-y-2.5"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
            >
              <div className="flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.14em] uppercase">
                  Optional Supporting Files (Max 3 · PDF, JPEG, PNG, WEBP, TXT, CSV, JSON ≤ 5 MB)
                </span>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp,.txt,.csv,.json"
                onChange={handleReplyFiles}
                disabled={replyFiles.length >= 3}
                className="hd-font-sans text-xs"
              />
              {replyFiles.length > 0 && (
                <ul className="space-y-1.5 pt-1">
                  {replyFiles.map((f, idx) => (
                    <li
                      key={`${f.name}-${idx}`}
                      className="flex items-center justify-between text-xs px-3 py-1.5 border"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <span>
                        {f.name} ({Math.round(f.size / 1024)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyFiles((prev) => prev.filter((_, i) => i !== idx))}
                        className="inline-flex items-center gap-1 uppercase text-[10px]"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="p-3.5 border hd-font-body text-sm"
              style={{
                borderColor: '#B91C1C',
                backgroundColor: 'rgba(185, 28, 28, 0.08)',
              }}
            >
              {error}
            </div>
          )}

          {replyNotice && (
            <div
              className="p-3.5 border hd-font-body text-sm"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              {replyNotice}
            </div>
          )}

          <button
            type="submit"
            disabled={sendingReply}
            className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase disabled:opacity-50"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-copper-solid)',
              color: '#F2EFE7',
            }}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{sendingReply ? 'TRANSMITTING REPLY…' : 'SEND ENCRYPTED REPLY'}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
