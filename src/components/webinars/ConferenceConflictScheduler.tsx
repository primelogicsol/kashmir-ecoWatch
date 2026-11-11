'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  Users, 
  Calendar,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { 
  CONFERENCES_DETAILED, 
  SESSIONS_DETAILED, 
  validateConferenceSchedule, 
  ScheduleConflictResult 
} from '@/data/conference-system';

export function ConferenceConflictScheduler() {
  const [selectedConfId, setSelectedConfId] = useState<string>('kew-conf-2027-cryo');
  const [sessionTitle, setSessionTitle] = useState<string>('');
  const [roomCode, setRoomCode] = useState<string>('CRYO-ROOM-A');
  const [date, setDate] = useState<string>('2027-05-28');
  const [startTime, setStartTime] = useState<string>('11:00');
  const [endTime, setEndTime] = useState<string>('12:00');
  const [speakersInput, setSpeakersInput] = useState<string>('Dr. M. Farooq');
  const [moderatorInput, setModeratorInput] = useState<string>('Prof. Elena Rostova');
  const [validationResult, setValidationResult] = useState<ScheduleConflictResult | null>(null);

  const currentConf = CONFERENCES_DETAILED.find(c => c.id === selectedConfId) || CONFERENCES_DETAILED[0];

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const speakerList = speakersInput.split(',').map(s => s.trim()).filter(Boolean);
    const result = validateConferenceSchedule(
      {
        conferenceId: selectedConfId,
        roomCode,
        date,
        startTime,
        endTime,
        speakerNames: speakerList,
        moderatorName: moderatorInput.trim() || undefined
      },
      SESSIONS_DETAILED,
      currentConf
    );
    setValidationResult(result);
  };

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Scheduling Intelligence & Conflict Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white">Conference Session Provisioning & Schedule Guard</h3>
          <p className="text-xs text-slate-300">
            Validates overlapping speaker assignments, virtual room double-bookings, moderator overlaps, and date boundary compliance.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono text-slate-400 block">Target Conference:</span>
          <select
            value={selectedConfId}
            onChange={(e) => {
              setSelectedConfId(e.target.value);
              setValidationResult(null);
            }}
            className="bg-slate-800 text-teal-300 border border-teal-500/30 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
          >
            {CONFERENCES_DETAILED.map(c => (
              <option key={c.id} value={c.id}>{c.shortTitle}</option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleValidate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">Proposed Session Title</label>
          <input
            type="text"
            required
            placeholder="e.g. UAV Photogrammetric Delineation of Supraglacial Ice Cliffs"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Virtual Hall / Room Code</label>
          <select
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-teal-200 focus:outline-none focus:border-amber-500"
          >
            {currentConf.tracks.map(t => (
              <option key={t.roomCode} value={t.roomCode}>{t.roomCode} ({t.name.split('·')[0]})</option>
            ))}
            <option value="CRYO-ROOM-E-OVERFLOW">CRYO-ROOM-E (Overflow Track)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Session Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">Valid Range: {currentConf.dates.display}</span>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Start Time (IST)</label>
          <input
            type="time"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">End Time (IST)</label>
          <input
            type="time"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Speaker(s) (Comma-separated)</label>
          <input
            type="text"
            required
            placeholder="e.g. Dr. M. Farooq, Prof. Elena Rostova"
            value={speakersInput}
            onChange={(e) => setSpeakersInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">Try typing &apos;Dr. M. Farooq&apos; between 09:30-10:30 to test conflict detection.</span>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Moderator / Chair</label>
          <input
            type="text"
            placeholder="e.g. Prof. Elena Rostova"
            value={moderatorInput}
            onChange={(e) => setModeratorInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="md:col-span-2 pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              // Pre-fill a known conflict to demonstrate intelligence
              setDate('2027-05-28');
              setStartTime('09:45');
              setEndTime('10:15');
              setRoomCode('CRYO-ROOM-A');
              setSpeakersInput('Dr. M. Farooq');
              setModeratorInput('Prof. Elena Rostova');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-mono"
          >
            Load Known Conflict Test Case
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
          >
            Run Conflict Engine Validation
          </button>
        </div>
      </form>

      {/* Validation Result Output */}
      {validationResult && (
        <div className={`p-4 rounded-xl border transition-all ${
          validationResult.valid 
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
        }`}>
          <div className="flex items-start gap-3">
            {validationResult.valid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-2 flex-1">
              <div className="font-bold text-sm">
                {validationResult.valid 
                  ? 'Verification Succeeded: Zero Schedule Conflicts Detected' 
                  : 'Schedule Validation Failed: Conflicts Must Be Resolved Before Publishing'}
              </div>

              {validationResult.errors.length > 0 && (
                <ul className="space-y-1 text-xs list-disc list-inside text-rose-300 font-mono">
                  {validationResult.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}

              {validationResult.warnings.length > 0 && (
                <ul className="space-y-1 text-xs list-disc list-inside text-amber-300 font-mono">
                  {validationResult.warnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              )}

              {validationResult.valid && (
                <p className="text-xs text-emerald-300">
                  Room reservation verified. Speaker availability confirmed with no overlapping commitments. Ready to lock into published scientific proceedings.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
