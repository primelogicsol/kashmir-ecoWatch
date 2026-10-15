'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, X, Check, RotateCcw, 
  Eye, Monitor, Gauge, Map, Sparkles
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PlatformSettings {
  units: 'metric' | 'imperial';
  refreshRate: '30s' | '5m' | 'manual';
  highContrast: boolean;
  reducedMotion: boolean;
  defaultBasemap: 'dark' | 'satellite' | 'topo';
  compactMode: boolean;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  units: 'metric',
  refreshRate: '30s',
  highContrast: false,
  reducedMotion: false,
  defaultBasemap: 'dark',
  compactMode: false
};

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);
  const [savedNotification, setSavedNotification] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kew_user_settings');
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  }, []);

  const updateSetting = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      localStorage.setItem('kew_user_settings', JSON.stringify(updated));
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2000);

      // Apply accessibility classes to document body
      if (key === 'highContrast') {
        if (value) document.documentElement.classList.add('high-contrast');
        else document.documentElement.classList.remove('high-contrast');
      }
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem('kew_user_settings', JSON.stringify(DEFAULT_SETTINGS));
      document.documentElement.classList.remove('high-contrast');
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2000);
    } catch (e) {
      console.error('Failed to reset settings:', e);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-slate-200 animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Platform Preferences</h3>
            <p className="text-[11px] text-slate-400">Personalized telemetry & interface controls</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {savedNotification && (
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono font-bold animate-pulse">
              <Check className="w-3 h-3" /> SAVED
            </span>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto divide-y divide-white/5 text-xs">
        
        {/* Measurement Units */}
        <div className="space-y-2 pt-2 first:pt-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
              Measurement Units
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Telemetry</span>
          </div>
          <p className="text-[11px] text-slate-400">Choose display format for temperatures, elevation, and river discharge.</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'metric', label: 'Metric (°C, m, m³/s)' },
              { id: 'imperial', label: 'Imperial (°F, ft, cfs)' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateSetting('units', opt.id as any)}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  settings.units === opt.id
                    ? 'bg-sky-500/20 border-sky-500/40 text-sky-200 font-bold'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-white/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Refresh Cadence */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              Telemetry Polling Rate
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Sensors</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '30s', label: 'Live (30s)' },
              { id: '5m', label: '5 Min' },
              { id: 'manual', label: 'Manual' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateSetting('refreshRate', opt.id as any)}
                className={`py-2 px-2 rounded-xl border text-center transition-all ${
                  settings.refreshRate === opt.id
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-bold'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-white/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Default Geospatial Basemap */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-amber-400" />
              Default Map Canvas
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Atlas</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'Dark Canvas' },
              { id: 'satellite', label: 'Satellite' },
              { id: 'topo', label: 'Topography' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateSetting('defaultBasemap', opt.id as any)}
                className={`py-2 px-2 rounded-xl border text-center transition-all ${
                  settings.defaultBasemap === opt.id
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-200 font-bold'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-white/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility & Visual Comfort */}
        <div className="space-y-3 pt-4">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            Accessibility & Display
          </span>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-white/5">
            <div>
              <p className="font-semibold text-white leading-tight">High Contrast Grayscale</p>
              <p className="text-[10px] text-slate-400">Boosts border and text visibility for field use</p>
            </div>
            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                settings.highContrast ? 'bg-purple-500' : 'bg-slate-800'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                settings.highContrast ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-white/5">
            <div>
              <p className="font-semibold text-white leading-tight">Reduce Motion</p>
              <p className="text-[10px] text-slate-400">Minimizes spring animations and transitions</p>
            </div>
            <button
              onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                settings.reducedMotion ? 'bg-purple-500' : 'bg-slate-800'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                settings.reducedMotion ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500">Persisted locally in browser</span>
        <button
          onClick={resetDefaults}
          className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-[11px] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </div>
  );
}
