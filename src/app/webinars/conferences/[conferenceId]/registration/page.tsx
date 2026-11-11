'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Award, CheckCircle2, Download, Calendar, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { ConferenceSubNav } from '@/components/webinars/ConferenceSubNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export default function ConferenceRegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('Certified Delegate');
  const [registered, setRegistered] = useState(false);
  const [passNumber, setPassNumber] = useState('');

  const params = useParams();
  const conferenceId = params?.conferenceId as string;
  const conference = CONFERENCES_DETAILED.find(c => c.id === conferenceId) || CONFERENCES_DETAILED[0];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'KEW-PASS-' + Math.floor(1000 + Math.random() * 9000);
    setPassNumber(code);
    setRegistered(true);
  };

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kashmir EcoWatch//Conference Event//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${conference.title}`,
      `DESCRIPTION:${conference.theme}`,
      `DTSTART:20270528T040000Z`,
      `DTEND:20270530T120000Z`,
      'LOCATION:Kashmir EcoWatch Virtual Conference Hall',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${conference.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Delegate Credential &amp; Pass Issuance"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: conference.shortTitle, href: `/webinars/conferences/${conference.id}` },
          { label: 'Registration' }
        ]}
        icon={<Award className="w-6 h-6 text-teal-400" />}
        title={`Delegate Pass Registration • ${conference.shortTitle}`}
        subtitle="Register for conference credentials, receive instant WebRTC virtual hall tokens, add multi-day parallel sessions to your calendar, and qualify for attendance certificates."
      />

      <WebinarNav />
      <ConferenceSubNav conference={conference} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {registered ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Delegate Accreditation Confirmed</h3>

            <div className="p-5 bg-slate-900/90 rounded-2xl border border-white/10 max-w-md mx-auto space-y-2 text-left">
              <div className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">Official Delegate Badge</div>
              <div className="text-lg font-bold text-white">{name}</div>
              <div className="text-xs text-slate-300">{institution}</div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Pass Serial:</span>
                <span className="text-emerald-300 font-bold">{passNumber}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownloadIcs}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Export Calendar Invitation (.ics)</span>
              </button>
              <Link
                href="/webinars/room/kew-conf-2027-cryo"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Launch Virtual Hall
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-5">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
              Accreditation Form (Free Admission for Academic Delegates)
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name (for Certificate)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. / Prof. / Scholar Name"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Institutional Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@university.edu"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Affiliation / Organization</label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. University of Kashmir / ICIMOD"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Delegate Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Certified Delegate">Certified Delegate (Access All Tracks + Q&A)</option>
                <option value="Student Researcher">Student / Graduate Researcher</option>
                <option value="Observer">Observer</option>
              </select>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Instant cryptographic pass generated.</span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
              >
                Issue Delegate Pass
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
