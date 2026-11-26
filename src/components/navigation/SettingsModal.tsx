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
  themeMode: 'dark' | 'light' | 'system';
  highContrast: boolean;
  reducedMotion: boolean;
  defaultBasemap: 'dark' | 'satellite' | 'topo';
  compactMode: boolean;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  units: 'metric',
  refreshRate: '30s',
  themeMode: 'dark',
  highContrast: false,
  reducedMotion: false,
  defaultBasemap: 'dark',
  compactMode: false
};

function applyDocumentThemeMode(mode: 'dark' | 'light' | 'system') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const prefersLight =
    mode === 'system' &&
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
  if (mode === 'light' || prefersLight) {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }
}

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

      // Apply accessibility & theme classes to document root
      if (key === 'themeMode') {
        applyDocumentThemeMode(value as 'dark' | 'light' | 'system');
      }
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
      applyDocumentThemeMode('dark');
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
      className="kew-menu-surface kew-functional-overlay absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-[384px] rounded-2xl border z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="kew-menu-top-header p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="kew-menu-title text-sm font-bold leading-tight">Platform Preferences</h3>
            <p className="kew-menu-desc text-[11px]">Personalized telemetry & interface controls</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {savedNotification && (
            <span className="kew-menu-accent-text text-[10px] flex items-center gap-1 font-mono font-bold animate-pulse">
              <Check className="w-3 h-3" /> SAVED
            </span>
          )}
          <button
            onClick={onClose}
            className="kew-menu-ghost-btn p-1 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="kew-menu-scroll p-4 space-y-4 max-h-[min(380px,calc(100dvh-11rem))] overflow-y-auto overscroll-contain divide-y divide-[var(--kew-menu-border)] text-xs">
        
        {/* Measurement Units */}
        <div className="space-y-2 pt-2 first:pt-0">
          <div className="flex items-center justify-between">
            <span className="kew-menu-title font-bold flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
              Measurement Units
            </span>
            <span className="kew-menu-desc text-[10px] font-mono">Telemetry</span>
          </div>
          <p className="kew-menu-desc text-[11px]">Choose display format for temperatures, elevation, and river discharge.</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'metric', label: 'Metric (°C, m, m³/s)' },
              { id: 'imperial', label: 'Imperial (°F, ft, cfs)' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateSetting('units', opt.id as any)}
                className={`kew-menu-option-btn py-2 px-2.5 rounded-xl border text-center transition-all ${
                  settings.units === opt.id ? 'kew-menu-option-btn--selected' : ''
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
            <span className="kew-menu-title font-bold flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              Telemetry Polling Rate
            </span>
            <span className="kew-menu-desc text-[10px] font-mono">Sensors</span>
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
                className={`kew-menu-option-btn py-2 px-2 rounded-xl border text-center transition-all ${
                  settings.refreshRate === opt.id ? 'kew-menu-option-btn--selected' : ''
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
            <span className="kew-menu-title font-bold flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-amber-400" />
              Default Map Canvas
            </span>
            <span className="kew-menu-desc text-[10px] font-mono">Atlas</span>
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
                className={`kew-menu-option-btn py-2 px-2 rounded-xl border text-center transition-all ${
                  settings.defaultBasemap === opt.id ? 'kew-menu-option-btn--selected' : ''
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility & Visual Comfort */}
        <div className="space-y-3 pt-4">
          <span className="kew-menu-title font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            Accessibility & Display
          </span>

          {/* Theme Mode Selector (Dark / Light / System) */}
          <div className="space-y-1.5">
            <p className="kew-menu-title text-[11px] font-semibold">Color Theme Mode</p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'dark', label: 'Dark' },
                  { id: 'light', label: 'Light' },
                  { id: 'system', label: 'System' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updateSetting('themeMode', opt.id)}
                  className={`kew-menu-option-btn py-2 px-2 rounded-xl border text-center transition-all ${
                    settings.themeMode === opt.id ? 'kew-menu-option-btn--selected' : ''
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="kew-menu-subcard flex items-center justify-between p-2.5 rounded-xl border">
            <div>
              <p className="kew-menu-title font-semibold leading-tight">High Contrast Grayscale</p>
              <p className="kew-menu-desc text-[10px]">Boosts border and text visibility for field use</p>
            </div>
            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                settings.highContrast ? 'bg-purple-500' : 'bg-slate-700'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                settings.highContrast ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="kew-menu-subcard flex items-center justify-between p-2.5 rounded-xl border">
            <div>
              <p className="kew-menu-title font-semibold leading-tight">Reduce Motion</p>
              <p className="kew-menu-desc text-[10px]">Minimizes spring animations and transitions</p>
            </div>
            <button
              onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                settings.reducedMotion ? 'bg-purple-500' : 'bg-slate-700'
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
      <div className="kew-menu-footer p-3 border-t flex items-center justify-between text-xs">
        <span className="kew-menu-desc text-[11px]">Persisted locally in browser</span>
        <button
          onClick={resetDefaults}
          className="kew-menu-ghost-btn px-2 py-0.5 rounded inline-flex items-center gap-1 text-[11px] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </div>
  );
}
