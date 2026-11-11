'use client';

import React, { useState } from 'react';
import {
  Globe2,
  Clock,
  Copy,
  Check,
  X,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  MAJOR_INTERNATIONAL_HUBS,
  convertEventInstant,
  getWorldwideComparison,
  srinagarTimeToUtcIso,
  calculateInternationalFairness,
  LocalizedEventTime
} from '@/lib/conference-timezone';

interface TimeZoneConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string; // YYYY-MM-DD
  defaultTime24?: string; // HH:mm
  eventTitle?: string;
}

export function TimeZoneConverterModal({
  isOpen,
  onClose,
  defaultDate = '2027-06-10',
  defaultTime24 = '18:00',
  eventTitle = 'Western Himalayan Environmental Research Session'
}: TimeZoneConverterModalProps) {
  const [eventDate, setEventDate] = useState(defaultDate);
  const [eventTime24, setEventTime24] = useState(defaultTime24);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Convert Srinagar wall-clock to UTC ISO
  const utcIso = srinagarTimeToUtcIso(eventDate, eventTime24);
  const worldwideTimes = getWorldwideComparison(utcIso);

  // Calculate international fairness for major research partners (US, UK, Switzerland, Japan, Australia)
  const internationalHubs = ['America/New_York', 'Europe/London', 'Europe/Zurich', 'Asia/Tokyo', 'Australia/Sydney'];
  const fairness = calculateInternationalFairness(utcIso, internationalHubs);

  // Copy worldwide schedule text
  const handleCopySchedule = () => {
    const text = [
      `Kashmir EcoWatch · Global Scientific Conference Schedule`,
      `Event: ${eventTitle}`,
      `Organizer Reference: Srinagar / India (Asia/Kolkata)`,
      `----------------------------------------------------`,
      ...worldwideTimes.map(
        t => `${t.city} (${t.country}): ${t.formattedDate}, ${t.formattedTime} [${t.timeZoneAbbr}] ${t.dayDifference !== 'same_day' ? `(${t.dayDifferenceLabel})` : ''}`
      ),
      `----------------------------------------------------`,
      `Times dynamically computed with IANA UTC synchronization.`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold uppercase border border-teal-500/40">
              <Globe2 className="w-3 h-3 text-teal-400" />
              <span>Global Time Zone Intelligence Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white leading-snug">
              Worldwide Event Schedule &amp; Time Zone Converter
            </h3>
            <p className="text-xs text-slate-300">
              {eventTitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Event Timing Inputs */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3">
          <div className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider">
            Organizer Official Schedule (Asia/Kolkata · IST)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-mono">Organizer Time Zone</label>
              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-teal-500/30 text-xs text-teal-300 font-semibold flex items-center gap-2">
                <span>🇮🇳</span>
                <span className="truncate">Srinagar / India (Asia/Kolkata)</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-mono">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-mono">Start Time (24-Hour)</label>
              <input
                type="time"
                value={eventTime24}
                onChange={(e) => setEventTime24(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Worldwide Schedule Grid (The 7 Major Hubs) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400 uppercase font-bold text-[11px]">
              Event Time Around The World (Auto-Converted)
            </span>
            <span className="text-[10px] font-mono text-teal-400">
              UTC Synchronized · DST Aware
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {worldwideTimes.map((loc) => {
              const isReference = loc.iana === 'Asia/Kolkata';

              return (
                <div
                  key={loc.iana}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isReference
                      ? 'bg-teal-950/40 border-teal-500/60 shadow-md shadow-teal-500/10'
                      : 'bg-slate-950/60 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>{loc.flag}</span>
                      <span>{loc.city}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {loc.timeZoneAbbr}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono truncate mb-2">
                    {loc.country} &bull; {loc.iana}
                  </div>

                  <div className="flex items-baseline justify-between pt-1 border-t border-white/5">
                    <div className="text-sm font-extrabold text-white font-mono">
                      {loc.formattedDate}, {loc.formattedTime}
                    </div>
                  </div>

                  {/* Day difference & convenience badge */}
                  <div className="flex items-center justify-between gap-1 pt-2 text-[10px] font-mono">
                    <span className={`px-1.5 py-0.5 rounded ${
                      loc.dayDifference === 'same_day'
                        ? 'bg-slate-800 text-slate-300'
                        : loc.dayDifference === 'previous_day'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {loc.dayDifferenceLabel}
                    </span>

                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      loc.convenienceRating === 'optimal'
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : loc.convenienceRating === 'acceptable'
                        ? 'text-teal-300 bg-teal-500/10'
                        : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}>
                      {loc.convenienceRating === 'optimal'
                        ? 'Working Hours'
                        : loc.convenienceRating === 'acceptable'
                        ? 'Extended Hours'
                        : 'Early / Late'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* International Fairness Optimizer Panel */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-teal-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>International Scheduling Fairness Optimizer</span>
            </span>
            <span className="font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Fairness Score: {fairness.score}% ({fairness.rating})
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {fairness.recommendation}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-mono">
            Converts automatically across all DST changes and leap years.
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopySchedule}
              className="bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs px-5 shadow-lg shadow-teal-500/20"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span>Worldwide Schedule Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span>Copy Worldwide Schedule</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/10 text-slate-300 hover:bg-white/5 text-xs"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
