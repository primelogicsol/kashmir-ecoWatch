'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Settings, X, CheckCircle2, Shield, AlertTriangle, 
  Mail, Smartphone, Radio, Droplets, Mountain, Flame, 
  Wind, MapPin, Waves, Sparkles, Send, Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface AlertPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'subscribe' | 'settings';
}

const DISTRICT_OPTIONS = [
  'All Districts',
  'Srinagar',
  'Ganderbal',
  'Baramulla',
  'Anantnag',
  'Budgam',
  'Pulwama',
  'Kupwara',
  'Bandipora',
  'Kulgam',
  'Shopian'
];

const TOPIC_OPTIONS = [
  { id: 'floods', label: 'Riverine Floods & Flash Floods', icon: Droplets, color: 'text-blue-400' },
  { id: 'wetlands', label: 'Wetland Stress & Eutrophication', icon: Waves, color: 'text-cyan-400' },
  { id: 'avalanches', label: 'Avalanches & Cryosphere GLOF', icon: Mountain, color: 'text-indigo-400' },
  { id: 'wildfires', label: 'Wildfires & Forest Biomass Burn', icon: Flame, color: 'text-amber-400' },
  { id: 'air_quality', label: 'Air Quality & Winter Smog AQI', icon: Wind, color: 'text-emerald-400' },
  { id: 'water_quality', label: 'Water Quality & Fish Mortality', icon: Shield, color: 'text-purple-400' },
];

export function AlertPreferencesModal({ isOpen, onClose, initialMode = 'subscribe' }: AlertPreferencesModalProps) {
  const [activeTab, setActiveTab] = useState<'subscribe' | 'settings'>(initialMode);
  
  // Subscription Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeSuccessMessage, setSubscribeSuccessMessage] = useState('');

  // Settings State
  const [channels, setChannels] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [severity, setSeverity] = useState<'all' | 'high_critical' | 'critical_only'>('high_critical');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'floods', 'wetlands', 'avalanches', 'wildfires', 'air_quality', 'water_quality'
  ]);
  const [frequency, setFrequency] = useState<'realtime' | 'daily' | 'weekly'>('realtime');
  const [isSaving, setIsSaving] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  // Load saved preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSub = localStorage.getItem('kew_alert_sub');
        if (savedSub) {
          const parsed = JSON.parse(savedSub);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.phone) setPhone(parsed.phone);
          if (parsed.district) setSelectedDistrict(parsed.district);
          setIsSubscribed(true);
        }

        const savedPrefs = localStorage.getItem('kew_alert_preferences');
        if (savedPrefs) {
          const parsed = JSON.parse(savedPrefs);
          if (parsed.channels) setChannels(parsed.channels);
          if (parsed.severity) setSeverity(parsed.severity);
          if (parsed.selectedTopics) setSelectedTopics(parsed.selectedTopics);
          if (parsed.frequency) setFrequency(parsed.frequency);
        }
      } catch (e) {
        console.error('Error loading alert preferences:', e);
      }
    }
  }, []);

  // Sync initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setSubscribeSuccessMessage('');
      setSettingsSavedMessage('');
    }
  }, [isOpen, initialMode]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Submit subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const data = {
        email: email.trim(),
        phone: phone.trim(),
        district: selectedDistrict,
        timestamp: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('kew_alert_sub', JSON.stringify(data));
      }
      setIsSubscribed(true);
      setIsSubmitting(false);
      setSubscribeSuccessMessage('Subscription confirmed! You will receive verified Kashmir EcoWatch alerts.');
      setTimeout(() => setSubscribeSuccessMessage(''), 5000);
    }, 600);
  };

  // Save Settings
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      const prefs = {
        channels,
        severity,
        selectedTopics,
        frequency,
        updatedAt: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('kew_alert_preferences', JSON.stringify(prefs));
      }
      setIsSaving(false);
      setSettingsSavedMessage('Preferences saved successfully to local telemetry registry.');
      setTimeout(() => setSettingsSavedMessage(''), 4000);
    }, 400);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-amber-600/30 via-red-600/20 to-slate-900 p-5 sm:p-6 border-b border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white shrink-0">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400">
                      Telemetry & Notification Core
                    </span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] px-2 py-0.2">
                      Live
                    </Badge>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Environmental Alerts
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Switches */}
            <div className="flex items-center gap-2 mt-5 p-1 bg-slate-950/60 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('subscribe')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'subscribe'
                    ? 'bg-gradient-to-r from-forest-600 to-forest-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Subscribe to Alerts</span>
                {isSubscribed && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-forest-600 to-forest-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Preferences</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 max-h-[70vh] overflow-y-auto">
            {activeTab === 'subscribe' ? (
              /* TAB 1: SUBSCRIBE */
              <div className="space-y-6">
                {isSubscribed && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-emerald-300 mb-0.5">Active Alert Subscription Registered</p>
                      <p className="text-slate-300">
                        Receiving alerts for <strong className="text-white">{selectedDistrict}</strong> via <strong className="text-white">{email || phone}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {subscribeSuccessMessage && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{subscribeSuccessMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.org or name@kashmir.in"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-forest-500/50 focus:ring-2 focus:ring-forest-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      WhatsApp / Mobile SMS <span className="text-slate-500 text-[10px] font-normal">(Optional for Critical SMS)</span>
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 (e.g. 94190XXXXX)"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-forest-500/50 focus:ring-2 focus:ring-forest-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      District of Primary Focus
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-forest-500/50 focus:ring-2 focus:ring-forest-500/20 transition-all appearance-none cursor-pointer"
                      >
                        {DISTRICT_OPTIONS.map(d => (
                          <option key={d} value={d} className="bg-slate-900 text-white">
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white font-semibold py-2.5 text-sm shadow-xl"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Activating Subscription...</span>
                        </div>
                      ) : isSubscribed ? (
                        'Update Alert Subscription'
                      ) : (
                        'Subscribe to Real-Time Alerts'
                      )}
                    </Button>
                  </div>
                </form>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  Alerts are verified through multi-source hydrological gauges, Copernicus satellite thermal feeds, and municipal telemetry. Zero spam. Unsubscribe anytime.
                </p>
              </div>
            ) : (
              /* TAB 2: SETTINGS & PREFERENCES */
              <div className="space-y-6">
                {settingsSavedMessage && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{settingsSavedMessage}</span>
                  </div>
                )}

                {/* Delivery Channels */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    Delivery Channels
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { key: 'email', label: 'Email Alerts', desc: 'Detailed situation reports' },
                      { key: 'push', label: 'Browser Push', desc: 'Instant desktop & mobile signals' },
                      { key: 'sms', label: 'SMS / WhatsApp', desc: 'Critical life-safety alerts' },
                    ].map(ch => {
                      const enabled = channels[ch.key as keyof typeof channels];
                      return (
                        <button
                          key={ch.key}
                          type="button"
                          onClick={() => setChannels(c => ({ ...c, [ch.key]: !enabled }))}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            enabled
                              ? 'bg-forest-500/15 border-forest-500/40 shadow-sm'
                              : 'bg-slate-950/60 border-white/5 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">{ch.label}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              enabled ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'
                            }`}>
                              {enabled && <Check className="w-2.5 h-2.5 text-slate-950" />}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 leading-tight block">{ch.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Minimum Severity Level */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Minimum Severity Threshold
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'critical_only', label: 'Critical Only', badge: 'RED ALERT', desc: 'Severe flash floods, avalanches' },
                      { id: 'high_critical', label: 'High & Critical', badge: 'RECOMMENDED', desc: 'Significant stress & warnings' },
                      { id: 'all', label: 'All Advisories', badge: 'ALL', desc: 'Includes seasonal notices & AQI' },
                    ].map(sev => (
                      <button
                        key={sev.id}
                        type="button"
                        onClick={() => setSeverity(sev.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          severity === sev.id
                            ? 'bg-amber-500/15 border-amber-500/40 text-white'
                            : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-wider block w-fit mb-1.5 text-amber-300">
                          {sev.badge}
                        </span>
                        <div className="text-xs font-bold mb-1 text-white">{sev.label}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{sev.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monitored Ecological Domains */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Monitored Hazard Domains
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TOPIC_OPTIONS.map(topic => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-white/10 border-white/20 text-white'
                              : 'bg-slate-950/40 border-white/5 text-slate-400 opacity-60 hover:opacity-90'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${topic.color} shrink-0`} />
                          <span className="text-xs font-medium flex-1">{topic.label}</span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-slate-600'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notification Frequency */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Notification Frequency
                  </h4>
                  <div className="flex gap-2">
                    {[
                      { id: 'realtime', label: 'Instant Real-Time' },
                      { id: 'daily', label: 'Daily Briefing (08:00 AM)' },
                      { id: 'weekly', label: 'Weekly Summary' },
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFrequency(f.id as any)}
                        className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                          frequency === f.id
                            ? 'bg-forest-500/20 border-forest-500/50 text-emerald-300'
                            : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-2 flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white font-semibold py-2.5 text-sm shadow-xl"
                  >
                    {isSaving ? 'Saving Preferences...' : 'Save Alert Preferences'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-white/20 text-slate-300 hover:text-white text-sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
