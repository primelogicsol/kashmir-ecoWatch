'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ExternalLink,
  Hand,
  HelpCircle,
  Layers,
  Lock,
  MessageSquare,
  Mic,
  MicOff,
  Presentation,
  Send,
  Sparkles,
  ThumbsUp,
  UserCheck,
  UserMinus,
  Users,
  X,
} from 'lucide-react';
import { WebinarSession } from '@/data/webinars';
import {
  HallChatMessage,
  HallParticipant,
  HallPoll,
  HallQuestionItem,
  InvitedProgramSpeaker,
  LinkedKewResource,
  RolePermissions,
  RoomAllocationConfig,
} from '@/types/virtual-hall';
import { getInitials } from './VirtualHallAvatar';
import { cn } from '@/lib/utils';

export type SidePanelTabId =
  | 'qna'
  | 'chat'
  | 'participants'
  | 'tracks'
  | 'resources'
  | 'polls'
  | 'notifications';

interface SidePanelProps {
  session: WebinarSession;
  activeTab: SidePanelTabId;
  onSelectTab: (tab: SidePanelTabId) => void;
  onClose: () => void;
  widthPx: number;
  onStartResize: (e: React.MouseEvent) => void;
  me: HallParticipant | null;
  permissions: RolePermissions;
  roomConfig: RoomAllocationConfig & { effectiveMaxInteractiveSpeakers?: number };
  counts: {
    connectedTotal: number;
    connectedDelegates: number;
    activeInteractivePublishers: number;
    waitingRoomCount: number;
    greenRoomCount: number;
  };
  participants: HallParticipant[];
  promotedDelegateIds: string[];
  invitedSpeakers: InvitedProgramSpeaker[];
  linkedResources: LinkedKewResource[];
  chatMessages: HallChatMessage[];
  qnaList: HallQuestionItem[];
  polls: HallPoll[];
  notifications: { id: string; time: string; text: string; tone?: 'info' | 'warn' | 'ok' }[];
  onSendChat: (channel: 'public' | 'speakers' | 'green_room', text: string) => Promise<void>;
  onSubmitQuestion: (question: string) => Promise<void>;
  onUpvoteQuestion: (itemId: string) => Promise<void>;
  onModerateQuestion: (
    itemId: string,
    op: 'approve' | 'dismiss' | 'answer' | 'highlight',
    answer?: string
  ) => Promise<void>;
  onVotePoll: (pollId: string, optionId: string) => Promise<void>;
  onCreatePoll: (question: string, options: string[]) => Promise<void>;
  onHostCommand: (command: string, payload?: Record<string, unknown>) => Promise<void>;
  onLaunchDeckOnStage: () => void;
}

export function VirtualHallSidePanel({
  session,
  activeTab,
  onSelectTab,
  onClose,
  widthPx,
  onStartResize,
  me,
  permissions,
  roomConfig,
  counts,
  participants,
  promotedDelegateIds,
  invitedSpeakers,
  linkedResources,
  chatMessages,
  qnaList,
  polls,
  notifications,
  onSendChat,
  onSubmitQuestion,
  onUpvoteQuestion,
  onModerateQuestion,
  onVotePoll,
  onCreatePoll,
  onHostCommand,
  onLaunchDeckOnStage,
}: SidePanelProps) {
  const [chatChannel, setChatChannel] = useState<'public' | 'speakers' | 'green_room'>('public');
  const [chatDraft, setChatDraft] = useState('');
  const [questionDraft, setQuestionDraft] = useState('');
  const [answerDraftById, setAnswerDraftById] = useState<Record<string, string>>({});
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOpts, setNewPollOpts] = useState('Yes — prioritize sensor network\nNo — focus on catchment policy\nRequires basin modeling');
  const [showPollCreator, setShowPollCreator] = useState(false);

  const connectedInHall = participants.filter((p) => p.presence === 'connected');
  const inGreenRoom = participants.filter((p) => p.presence === 'green_room');
  const inWaitingRoom = participants.filter((p) => p.presence === 'waiting_room');

  const tabs: { id: SidePanelTabId; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'qna', label: 'Q&A', icon: HelpCircle, badge: qnaList.length },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    {
      id: 'participants',
      label: 'People',
      icon: Users,
      badge: counts.connectedTotal + counts.waitingRoomCount,
    },
    { id: 'resources', label: 'Resources', icon: BookOpen, badge: linkedResources.length },
    { id: 'polls', label: 'Polls', icon: BarChart3, badge: polls.length },
    { id: 'tracks', label: 'Tracks', icon: Layers },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: inWaitingRoom.length || undefined },
  ];

  return (
    <aside
      style={{ width: `${widthPx}px` }}
      className="fixed inset-y-0 right-0 z-40 lg:z-20 max-w-[92vw] lg:static lg:max-w-none bg-[#0a1322] border-l border-slate-800/90 flex flex-col h-full shrink-0 shadow-2xl lg:shadow-none"
      aria-label="Conference interaction panel"
    >
      {/* Desktop Drag-Resize Handle */}
      <div
        onMouseDown={onStartResize}
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-1.5 -ml-0.5 cursor-col-resize hover:bg-teal-500/40 transition-colors z-30"
        title="Drag to resize panel"
      />

      {/* Compact Tab Strip */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-800 bg-[#070e1a] shrink-0 gap-1">
        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar flex-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={cn(
                  'px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-colors',
                  active
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {typeof t.badge === 'number' && t.badge > 0 && (
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-[9px] font-mono text-slate-300">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 shrink-0"
          aria-label="Close side panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TAB 1: MODERATED SCIENTIFIC Q&A */}
      {activeTab === 'qna' && (
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Moderated Scientific Q&amp;A</span>
            <span className="font-mono text-[10px] text-teal-300">
              {permissions.canModerateQnA ? 'Moderator Mode' : 'Verified Queue'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {qnaList.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                No questions submitted yet. Ask the session panel a question below.
              </div>
            )}
            {qnaList.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'p-3 rounded-xl border text-xs space-y-2',
                  item.isHighlightedOnStage
                    ? 'bg-teal-950/30 border-teal-400/50'
                    : 'bg-slate-950/70 border-slate-800'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-white">{item.authorName}</span>
                    <span className="text-[10px] text-slate-400 block">{item.authorAffiliation}</span>
                  </div>
                  <span
                    className={cn(
                      'text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0',
                      item.status === 'answered'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : item.status === 'approved'
                        ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                        : item.status === 'dismissed'
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    )}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-slate-200 leading-relaxed">{item.question}</p>

                {item.answer && (
                  <div className="p-2 rounded-lg bg-teal-950/40 border border-teal-500/25 text-[11px] text-teal-100">
                    <strong className="text-teal-300 block text-[10px] uppercase font-mono mb-0.5">
                      Response ({item.answeredBy || 'Chair'}):
                    </strong>
                    {item.answer}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                  <button
                    onClick={() => onUpvoteQuestion(item.id)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-200"
                  >
                    <ThumbsUp className="w-3 h-3 text-teal-400" />
                    <span>{item.upvotes}</span>
                  </button>

                  {permissions.canModerateQnA && (
                    <div className="flex items-center gap-1 flex-wrap">
                      {item.status === 'pending_moderation' && (
                        <button
                          onClick={() => onModerateQuestion(item.id, 'approve')}
                          className="px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 text-[10px] font-semibold"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => onModerateQuestion(item.id, 'highlight')}
                        className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-semibold',
                          item.isHighlightedOnStage
                            ? 'bg-teal-500 text-slate-950'
                            : 'bg-slate-800 text-teal-300 hover:bg-slate-700'
                        )}
                      >
                        {item.isHighlightedOnStage ? 'Unpin Stage' : 'Pin Stage'}
                      </button>
                      <button
                        onClick={() => onModerateQuestion(item.id, 'dismiss')}
                        className="px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 text-[10px]"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>

                {permissions.canModerateQnA && item.status !== 'answered' && (
                  <div className="flex gap-1.5 pt-1">
                    <input
                      type="text"
                      value={answerDraftById[item.id] || ''}
                      onChange={(e) =>
                        setAnswerDraftById((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      placeholder="Write official panel response..."
                      className="flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-white"
                    />
                    <button
                      onClick={async () => {
                        const txt = (answerDraftById[item.id] || '').trim();
                        if (!txt) return;
                        await onModerateQuestion(item.id, 'answer', txt);
                        setAnswerDraftById((prev) => ({ ...prev, [item.id]: '' }));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!questionDraft.trim()) return;
              await onSubmitQuestion(questionDraft.trim());
              setQuestionDraft('');
            }}
            className="p-2.5 border-t border-slate-800 bg-slate-950 flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={questionDraft}
              onChange={(e) => setQuestionDraft(e.target.value)}
              placeholder="Submit scientific question..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center"
              aria-label="Send question"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: CHAT */}
      {activeTab === 'chat' && (
        <div className="flex-1 min-h-0 flex flex-col">
          {permissions.canUseSpeakerBackchannel && (
            <div className="grid grid-cols-3 border-b border-slate-800 text-[11px] bg-slate-950/60 shrink-0">
              <button
                onClick={() => setChatChannel('public')}
                className={cn(
                  'py-1.5 font-semibold',
                  chatChannel === 'public' ? 'bg-slate-800 text-white' : 'text-slate-400'
                )}
              >
                Public Hall
              </button>
              <button
                onClick={() => setChatChannel('speakers')}
                className={cn(
                  'py-1.5 font-semibold',
                  chatChannel === 'speakers' ? 'bg-teal-950/80 text-teal-300' : 'text-slate-400'
                )}
              >
                Speakers
              </button>
              <button
                onClick={() => setChatChannel('green_room')}
                className={cn(
                  'py-1.5 font-semibold',
                  chatChannel === 'green_room' ? 'bg-indigo-950/80 text-indigo-300' : 'text-slate-400'
                )}
              >
                Green Room
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {chatMessages
              .filter((m) => m.channel === chatChannel)
              .map((m) => (
                <div key={m.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 text-[9px] font-mono uppercase">
                        {m.senderRole.replace('_', ' ')}
                      </span>
                      <span className="font-semibold text-white truncate">{m.senderName}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed break-words">{m.message}</p>
                </div>
              ))}
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!chatDraft.trim()) return;
              await onSendChat(chatChannel, chatDraft.trim());
              setChatDraft('');
            }}
            className="p-2.5 border-t border-slate-800 bg-slate-950 flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={chatDraft}
              onChange={(e) => setChatDraft(e.target.value)}
              placeholder={
                chatChannel === 'public'
                  ? 'Message session participants...'
                  : `Message ${chatChannel.replace('_', ' ')}...`
              }
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: PARTICIPANTS & HONEST ROSTER */}
      {activeTab === 'participants' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Phase I Capacity Bar */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Concurrent Delegates (Phase I)</span>
              <span className="font-mono font-bold text-teal-300">
                {counts.connectedDelegates} / {roomConfig.maxConcurrentDelegates}
              </span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (counts.connectedDelegates / Math.max(1, roomConfig.maxConcurrentDelegates)) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
              <span>
                Interactive Speakers: {counts.activeInteractivePublishers}/
                {roomConfig.effectiveMaxInteractiveSpeakers ?? roomConfig.maxInteractiveSpeakers}
              </span>
              <span>Total Connected: {counts.connectedTotal}</span>
            </div>
          </div>

          {/* Waiting Room (Host Admission Queue) */}
          {inWaitingRoom.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Waiting Room ({inWaitingRoom.length})
              </div>
              {inWaitingRoom.map((p) => (
                <div
                  key={p.peerId}
                  className="p-2.5 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-white truncate">{p.displayName}</div>
                    <div className="text-[10px] text-slate-400 truncate">{p.affiliation}</div>
                  </div>
                  {permissions.canAdmitOrRemove && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onHostCommand('admit_peer', { targetPeerId: p.peerId })}
                        className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1"
                      >
                        <UserCheck className="w-3 h-3" />
                        Admit
                      </button>
                      <button
                        onClick={() => onHostCommand('remove_peer', { targetPeerId: p.peerId })}
                        className="p-1 rounded bg-rose-950 text-rose-300"
                        title="Remove"
                      >
                        <UserMinus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Connected in Main Hall */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Connected in Virtual Hall ({connectedInHall.length})
            </div>
            {connectedInHall.map((p) => {
              const isYou = me?.peerId === p.peerId;
              const isPromoted = promotedDelegateIds.includes(p.peerId);
              return (
                <div
                  key={p.peerId}
                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-teal-500/30 text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {getInitials(p.displayName)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">
                          {p.displayName} {isYou ? '(You)' : ''}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {p.role.replace('_', ' ')} &bull; {p.affiliation}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {p.isHandRaised && <Hand className="w-3.5 h-3.5 text-amber-400" />}
                      {p.isAudioEnabled ? (
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <MicOff className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Host / Moderator Controls per participant */}
                  {(permissions.canMuteOthers || permissions.canSpotlight || permissions.canAdmitOrRemove) && (
                    <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-slate-800/70">
                      {permissions.canSpotlight && (
                        <button
                          onClick={() =>
                            onHostCommand('spotlight_peer', {
                              targetPeerId: roomConfig.spotlightPeerId === p.peerId ? null : p.peerId,
                            })
                          }
                          className={cn(
                            'px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1',
                            roomConfig.spotlightPeerId === p.peerId
                              ? 'bg-teal-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          )}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          {roomConfig.spotlightPeerId === p.peerId ? 'Unspotlight' : 'Spotlight'}
                        </button>
                      )}
                      {!isYou && permissions.canMuteOthers && p.isAudioEnabled && (
                        <button
                          onClick={() => onHostCommand('mute_peer', { targetPeerId: p.peerId })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px]"
                        >
                          Mute
                        </button>
                      )}
                      {!isYou && permissions.canAdmitOrRemove && p.role === 'delegate' && (
                        <button
                          onClick={() =>
                            onHostCommand(
                              isPromoted ? 'revoke_delegate_mic' : 'promote_delegate',
                              { targetPeerId: p.peerId }
                            )
                          }
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-[10px]"
                        >
                          {isPromoted ? 'Revoke Mic' : 'Allow Mic'}
                        </button>
                      )}
                      {!isYou && permissions.canAdmitOrRemove && (
                        <button
                          onClick={() => onHostCommand('remove_peer', { targetPeerId: p.peerId })}
                          className="px-2 py-0.5 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-[10px] ml-auto"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Backstage Green Room */}
          {inGreenRoom.length > 0 && permissions.canEnterGreenRoom && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Backstage Green Room ({inGreenRoom.length})
              </div>
              {inGreenRoom.map((p) => (
                <div
                  key={p.peerId}
                  className="p-2 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between"
                >
                  <span className="font-semibold text-indigo-100">{p.displayName}</span>
                  <span className="text-[10px] font-mono text-indigo-300">Backstage</span>
                </div>
              ))}
            </div>
          )}

          {/* Program Faculty (Strictly Distinguished as Invited / Not Connected) */}
          {invitedSpeakers.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Program Nominees (Not in Call)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  OFFLINE
                </span>
              </div>
              {invitedSpeakers.map((spk) => (
                <div
                  key={spk.id}
                  className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 opacity-80 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-slate-300 truncate">{spk.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{spk.institution}</div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-400 shrink-0">
                    {spk.invitationStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SCIENTIFIC RESOURCES & KEW INTELLIGENCE */}
      {activeTab === 'resources' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-teal-400">{session.discipline}</div>
            <div className="font-bold text-white leading-snug">{session.title}</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{session.abstract}</p>
          </div>

          {permissions.canShareScreen && (
            <button
              onClick={onLaunchDeckOnStage}
              className="w-full p-3 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-left flex items-center justify-between gap-2 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Presentation className="w-4 h-4 text-teal-300 shrink-0" />
                <div>
                  <div className="font-bold text-teal-200">Present Briefing Slides on Stage</div>
                  <div className="text-[10px] text-slate-400">
                    Load quantitative KEW Cryosphere &amp; Hydrology slide deck
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-teal-300">Launch &rarr;</span>
            </button>
          )}

          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold pt-1">
            Linked KEW Scientific Intelligence ({linkedResources.length})
          </div>

          {linkedResources.map((res) => (
            <div
              key={res.id}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/25">
                  {res.type}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{res.code}</span>
              </div>
              <div className="font-semibold text-white leading-snug">{res.title}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{res.summary}</p>
              <div className="pt-1 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 truncate">{res.authors}</span>
                {res.href === '#stage-deck' ? (
                  permissions.canShareScreen && (
                    <button
                      onClick={onLaunchDeckOnStage}
                      className="text-teal-400 hover:underline font-semibold shrink-0"
                    >
                      Open on Stage
                    </button>
                  )
                ) : (
                  <Link
                    href={res.href}
                    target="_blank"
                    className="text-teal-400 hover:underline font-semibold inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: INTERACTIVE SCIENTIFIC POLLS */}
      {activeTab === 'polls' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          {permissions.canManagePolls && (
            <div className="space-y-2">
              <button
                onClick={() => setShowPollCreator(!showPollCreator)}
                className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
              >
                {showPollCreator ? 'Cancel Poll Builder' : '+ Launch New Audience Poll'}
              </button>
              {showPollCreator && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const opts = newPollOpts
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean);
                    if (!newPollQuestion.trim() || opts.length < 2) return;
                    await onCreatePoll(newPollQuestion.trim(), opts);
                    setNewPollQuestion('');
                    setShowPollCreator(false);
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <input
                    type="text"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="Poll question..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <textarea
                    rows={3}
                    value={newPollOpts}
                    onChange={(e) => setNewPollOpts(e.target.value)}
                    placeholder="One option per line..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                  >
                    Publish Poll
                  </button>
                </form>
              )}
            </div>
          )}

          {polls.map((poll) => {
            const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
            const hasVoted = me ? poll.votedPeerIds.includes(me.peerId) : false;
            return (
              <div
                key={poll.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{poll.isOpen ? 'OPEN POLL' : 'CLOSED'}</span>
                  <span>{totalVotes} vote(s)</span>
                </div>
                <div className="font-semibold text-white leading-snug">{poll.question}</div>
                <div className="space-y-1.5">
                  {poll.options.map((opt) => {
                    const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    return (
                      <button
                        key={opt.id}
                        disabled={hasVoted || !poll.isOpen}
                        onClick={() => onVotePoll(poll.id, opt.id)}
                        className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:hover:bg-slate-900 border border-slate-800 relative overflow-hidden"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-teal-500/15 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                        <div className="relative flex items-center justify-between gap-2 text-[11px]">
                          <span className="text-slate-200">{opt.label}</span>
                          <span className="font-mono text-teal-300 shrink-0">
                            {opt.votes} ({pct}%)
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {hasVoted && (
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Vote recorded
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 6: SCIENTIFIC TRACKS (PHASE I HONEST SINGLE-TRACK ENFORCEMENT) */}
      {activeTab === 'tracks' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          <div className="p-2.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-[11px] text-teal-200">
            <strong>Phase I Active Allocation:</strong> {roomConfig.maxScientificTracks} active live track per conference. Parallel multi-track halls unlock in Phase IV SFU deployment.
          </div>

          {(session.tracks || []).map((t, index) => {
            const unlocked = index < roomConfig.maxScientificTracks;
            return (
              <div
                key={t.id}
                className={cn(
                  'p-3 rounded-xl border space-y-1.5',
                  unlocked
                    ? 'bg-slate-950/90 border-teal-500/40'
                    : 'bg-slate-950/40 border-slate-800/70 opacity-70'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-teal-300">{t.roomCode}</span>
                  {unlocked ? (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
                      ACTIVE PLENARY TRACK
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] font-mono inline-flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> PHASE IV ROADMAP
                    </span>
                  )}
                </div>
                <div className="font-semibold text-white">{t.name}</div>
                <p className="text-[11px] text-slate-400">{t.theme}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 7: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Session Activity &amp; Security Alerts
          </div>
          {notifications.length === 0 && (
            <div className="text-slate-500 py-6 text-center">No recent system alerts.</div>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                'p-2.5 rounded-xl border text-[11px]',
                n.tone === 'warn'
                  ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                  : n.tone === 'ok'
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300'
              )}
            >
              <div className="font-mono text-[9px] text-slate-500 mb-0.5">{n.time}</div>
              <div>{n.text}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
