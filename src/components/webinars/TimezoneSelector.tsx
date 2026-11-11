'use client';

import React, { useState, useEffect } from 'react';
import { Globe2, ChevronDown, Check } from 'lucide-react';
import { MAJOR_INTERNATIONAL_HUBS, getBrowserTimeZone } from '@/lib/conference-timezone';

interface TimeZoneSelectorProps {
  selectedZone?: string;
  onSelectZone?: (zone: string) => void;
  selectedTimezone?: string;
  onSelectTimezone?: (zone: string) => void;
  compact?: boolean;
}

export function TimeZoneSelector({
  selectedZone,
  onSelectZone,
  selectedTimezone,
  onSelectTimezone,
  compact = false
}: TimeZoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [detectedZone, setDetectedZone] = useState('Asia/Kolkata');
  const currentSelected = selectedZone || selectedTimezone || 'Asia/Kolkata';

  useEffect(() => {
    const detected = getBrowserTimeZone();
    setDetectedZone(detected);
    // Check if user previously saved preference in localStorage
    const saved = localStorage.getItem('kew_conference_timezone');
    if (saved) {
      onSelectZone?.(saved);
      onSelectTimezone?.(saved);
    } else if (detected) {
      onSelectZone?.(detected);
      onSelectTimezone?.(detected);
    }
  }, []);

  const handleSelect = (iana: string) => {
    onSelectZone?.(iana);
    onSelectTimezone?.(iana);
    localStorage.setItem('kew_conference_timezone', iana);
    setIsOpen(false);
  };

  const currentHub = MAJOR_INTERNATIONAL_HUBS.find(h => h.iana === currentSelected);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-teal-500/40 text-xs text-slate-200 transition-colors shadow-sm"
      >
        <Globe2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span className="font-mono font-medium truncate max-w-[140px] sm:max-w-[180px]">
          {currentHub ? `${currentHub.flag} ${currentHub.city}` : (currentSelected?.split('/')[1] || currentSelected || 'Asia/Kolkata')}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-slate-900 border border-teal-500/40 shadow-2xl p-2 z-50 space-y-1 max-h-72 overflow-y-auto">
            <div className="px-2.5 py-1 text-[10px] font-mono text-slate-400 uppercase font-bold border-b border-white/5 flex items-center justify-between">
              <span>Select Your Time Zone</span>
              <span className="text-teal-400">Auto-Detected</span>
            </div>

            {MAJOR_INTERNATIONAL_HUBS.map((hub) => {
              const isSelected = hub.iana === currentSelected;
              const isBrowser = hub.iana === detectedZone;

              return (
                <button
                  key={hub.iana}
                  onClick={() => handleSelect(hub.iana)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors ${
                    isSelected
                      ? 'bg-teal-500/20 text-teal-300 font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{hub.flag}</span>
                    <div className="text-left truncate">
                      <div className="leading-snug truncate">{hub.city}</div>
                      <div className="text-[10px] font-mono text-slate-400 leading-tight">
                        {hub.country} &bull; {hub.iana}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isBrowser && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-teal-400 font-mono">
                        Local
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-400 ml-1" />}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export { TimeZoneSelector as TimezoneSelector };

