'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  Trees,
  Camera,
  Upload,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export default function CitizenChinarWatchPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="04 · FIELD OBSERVATIONS & CITIZEN SCIENCE"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Citizen Chinar Watch & Observation Portal' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                COMMUNITY WATCH
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Citizen Chinar Watch & Observation Portal
            </span>
          </>
        }
        subtitle="Community-powered participatory arboriculture, illegal pruning and felling incident reporting, geo-referenced photo observations, and public guardianship verification desk."
        icon={<Camera className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/threats"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Threat Register</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chinar Overview Hub</span>
            </Link>
          </div>
        }
      />
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/80 border-white/10 p-6 rounded-lg space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                Submit a Field Chinar Observation / Incident Report
              </h2>
              <p className="text-xs text-slate-400">
                All submissions undergo scientific review by KEW arboricultural moderators before being merged into the public registry.
              </p>

              {submitted ? (
                <div className="p-4 rounded-[6px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Observation Registered Successfully</span>
                  </div>
                  <p>Your geotagged submission has been assigned tracking ID #CW-2026-0849 and queued for review.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-medium">District</label>
                      <select className="w-full bg-slate-950 border border-white/10 rounded-[6px] px-3 py-2 text-slate-200">
                        <option>Srinagar</option>
                        <option>Ganderbal</option>
                        <option>Budgam</option>
                        <option>Anantnag</option>
                        <option>Pulwama</option>
                        <option>Kulgam</option>
                        <option>Shopian</option>
                        <option>Baramulla</option>
                        <option>Bandipora</option>
                        <option>Kupwara</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1 font-medium">Observation Type</label>
                      <select className="w-full bg-slate-950 border border-white/10 rounded-[6px] px-3 py-2 text-slate-200">
                        <option>Heritage / Monumental Tree Sighting</option>
                        <option>Illegal Felling / Lopping Alert</option>
                        <option>Asphalt / Concrete Encasement Report</option>
                        <option>Fungal Heart Rot / Cavity Observation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">Location Details / Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Hazratbal shrine gate or along NH-44 Bijbehara"
                      className="w-full bg-slate-950 border border-white/10 rounded-[6px] px-3 py-2 text-slate-200 placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">Description &amp; Observed Tree Condition</label>
                    <textarea
                      rows={3}
                      placeholder="Describe tree circumference, crown health, visible threats or damage..."
                      className="w-full bg-slate-950 border border-white/10 rounded-[6px] px-3 py-2 text-slate-200 placeholder-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[6px] font-bold text-xs flex items-center gap-2 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Submit to Chinar Watch Network</span>
                  </button>
                </form>
              )}
            </Card>
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-4">
            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Citizen Reporting Guidelines
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provide accurate GPS location whenever possible. If reporting unauthorized tree cutting, note whether a written permit from the Divisional Commissioner is displayed on site.
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                Official Helpline: J&amp;K Forest Protection Force: <strong>1800-180-7045</strong>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
