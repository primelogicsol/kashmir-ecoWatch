'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  AlertOctagon,
  PhoneCall,
  ShieldAlert,
  Send,
  CheckCircle2,
  Lock,
  Info,
  AlertTriangle
} from 'lucide-react';
import { EMERGENCY_CONTACTS, KewRegion, ConflictCategory } from '@/data/human-wildlife-conflict';

export default function HwcReportPage() {
  const [formData, setFormData] = useState({
    incidentType: 'Crop & Orchard Damage' as ConflictCategory,
    region: 'Kashmir Valley' as KewRegion,
    district: '',
    generalLocation: '',
    approximateDate: new Date().toISOString().split('T')[0],
    approximateTime: 'Dusk (18:00 - 20:00)',
    speciesKnown: 'Asiatic Black Bear',
    description: '',
    humanInjuryReported: false,
    livestockLossReported: false,
    cropDamageReported: true,
    reporterCategory: 'Citizen Submission',
    reporterContact: '',
    consentAgreed: false
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentAgreed) {
      setSubmissionError('Please agree to the Sensitive Ecological Information & Verification Policy.');
      return;
    }
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await fetch('/api/protected-network/human-wildlife-conflict/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedTicket(data.ticketId);
      } else {
        setSubmissionError(data.error || 'Failed to submit report.');
      }
    } catch (err) {
      setSubmissionError('Network error while transmitting incident report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Community Coexistence Desk' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                ACTION DESK
              </span>
              <span>Community Coexistence & Incident Intake</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
              Submit an Incident Report & Emergency Directory
            </span>
          </>
        }
        subtitle="Structured citizen and community incident reporting, research intake, and direct directory to official wildlife rapid response squads."
        icon={<AlertOctagon className="w-6 h-6 text-amber-400" />}
      />

      <HwcSubNav />

      {/* Critical Safety Notice */}
      <div className="bg-red-950/40 border-b border-red-500/30 py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="text-red-200 font-bold uppercase tracking-wider">
                Emergency Wildlife Threat Protocol — Call Authorities First
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Kashmir EcoWatch is a scientific documentation platform, NOT an emergency dispatch or physical rescue unit.</strong> If a wild animal is currently present near your home, attacking livestock, or posing an imminent threat to human life, <strong className="text-amber-300">do not wait for an online report to be processed</strong>. Immediately contact your local Wildlife Protection Department Control Room below.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <Card className="glass-intense border-white/10 p-6 sm:p-8 rounded-lg space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Incident Documentation Intake Form</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Submitted reports are assigned to the Scientific Verification Panel, queued for field checking, and kept private until verified.
                </p>
              </div>

              {submittedTicket ? (
                <div className="bg-emerald-950/30 border border-emerald-500/40 p-6 rounded-lg space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Incident Report Successfully Queued</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your report has been logged under Tracking ID:{' '}
                    <strong className="text-emerald-300 font-mono text-sm">{submittedTicket}</strong>.
                    It will be cross-referenced with Wildlife Department dispatch logs before publication in the public registry.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({ ...formData, description: '' });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-[6px]"
                  >
                    Submit Another Report
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {submissionError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-red-300 text-xs">
                      {submissionError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Incident Type *</label>
                      <select
                        value={formData.incidentType}
                        onChange={(e) => setFormData({ ...formData, incidentType: e.target.value as ConflictCategory })}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Crop & Orchard Damage">Crop & Orchard Damage</option>
                        <option value="Livestock Depredation">Livestock Depredation</option>
                        <option value="Human Injury (Non-fatal)">Human Injury (Non-fatal)</option>
                        <option value="Human Fatality">Human Fatality</option>
                        <option value="Property & Apiary Damage">Property & Apiary Damage</option>
                        <option value="Non-conflict Encounter / Pre-emptive Alert">Non-conflict Encounter / Pre-emptive Alert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Region *</label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value as KewRegion })}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Kashmir Valley">Kashmir Valley</option>
                        <option value="Jammu">Jammu</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir</option>
                        <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">District *</label>
                      <input
                        type="text"
                        placeholder="e.g. Kupwara, Baramulla, Leh, Poonch"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Generalized Public Location *</label>
                      <input
                        type="text"
                        placeholder="e.g. Upper Handwara Orchard Belt (No house numbers)"
                        value={formData.generalLocation}
                        onChange={(e) => setFormData({ ...formData, generalLocation: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Approximate Date *</label>
                      <input
                        type="date"
                        value={formData.approximateDate}
                        onChange={(e) => setFormData({ ...formData, approximateDate: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Species Involved (If Known)</label>
                      <select
                        value={formData.speciesKnown}
                        onChange={(e) => setFormData({ ...formData, speciesKnown: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Asiatic Black Bear">Asiatic Black Bear</option>
                        <option value="Common Leopard">Common Leopard</option>
                        <option value="Snow Leopard">Snow Leopard</option>
                        <option value="Himalayan Brown Bear">Himalayan Brown Bear</option>
                        <option value="Himalayan Wolf">Himalayan Wolf</option>
                        <option value="Wild Boar">Wild Boar</option>
                        <option value="Unknown / Unidentified">Unknown / Unidentified</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Incident Narrative & Observed Evidence *</label>
                    <textarea
                      rows={4}
                      placeholder="Describe what occurred, time of day, direction of animal retreat, signs (tracks, claw marks, scat), and any response by local villagers..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Reporter Contact (Confidential)</label>
                    <input
                      type="text"
                      placeholder="Phone or email for verification team (Never displayed publicly)"
                      value={formData.reporterContact}
                      onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consentAgreed}
                      onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                      className="mt-1 accent-emerald-500"
                    />
                    <label htmlFor="consent" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer">
                      I understand that KEW is an open scientific platform and does not provide emergency physical dispatch. I consent to my report being reviewed by wildlife biologists under the Sensitive Ecological Information Policy.
                    </label>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-[6px] px-6 py-2.5 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Submit Incident for Verification'}</span>
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

          {/* Emergency Authority Directory */}
          <div>
            <Card className="glass-intense border-white/10 p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <PhoneCall className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Emergency Helplines</h3>
              </div>
              <p className="text-xs text-slate-400">
                Official Wildlife Protection Control Rooms across all jurisdictions:
              </p>

              <div className="space-y-4 text-xs divide-y divide-white/5">
                {EMERGENCY_CONTACTS.map((contact, i) => (
                  <div key={i} className="pt-3 space-y-1">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      {contact.region}
                    </div>
                    <div className="font-bold text-white text-xs">{contact.authorityName}</div>
                    <div className="text-[11px] text-slate-300">
                      Emergency:{' '}
                      <a href={`tel:${contact.emergencyControlRoom}`} className="text-amber-300 font-mono font-bold hover:underline">
                        {contact.emergencyControlRoom}
                      </a>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {contact.wildlifeHelpline}
                    </div>
                    <div className="text-[10px] text-slate-500 italic mt-0.5">
                      {contact.notes}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
