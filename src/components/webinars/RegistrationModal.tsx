'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Layers,
  QrCode,
  ShieldCheck,
  Video,
  X
} from 'lucide-react';
import { WebinarSession } from '@/data/webinars';
import { Button } from '@/components/ui/Button';

interface RegistrationModalProps {
  session: WebinarSession | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ session, isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    designation: 'Research Scholar',
    role: 'Delegate',
    requiresCertificate: true,
    acceptedConsent: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [delegateId, setDelegateId] = useState('');

  if (!isOpen || !session) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KEW-DEL-2027-${Math.floor(1000 + Math.random() * 9000)}`;
    setDelegateId(generatedId);
    setIsSubmitted(true);
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kashmir EcoWatch//Scientific Webinars//EN
BEGIN:VEVENT
SUMMARY:${session.title}
DESCRIPTION:${session.abstract}
DTSTART:${session.startDate.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${session.endDate.replace(/[-:]/g, '').split('.')[0]}Z
LOCATION:Kashmir EcoWatch Virtual Hall (${session.roomCode})
URL:http://localhost:3000/webinars/room/${session.id}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${session.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Scientific Delegate Accreditation</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
              Register for {session.type === 'conference' ? 'Conference' : 'Webinar'}
            </h3>

            <p className="text-xs text-slate-400 mb-6 line-clamp-2">
              {session.title}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name &amp; Academic Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Aabid Hussain / Er. Zehra Fatima"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institutional / University Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">University / Institute *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NIT Srinagar / SKUAST-K"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Academic Status / Role</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Faculty / Professor">Faculty / Professor</option>
                    <option value="Research Scholar (Ph.D./Postdoc)">Research Scholar (Ph.D./Postdoc)</option>
                    <option value="Postgraduate / Student">Postgraduate / Student</option>
                    <option value="Government / Technical Officer">Government / Technical Officer</option>
                    <option value="NGO / Conservation Practitioner">NGO / Conservation Practitioner</option>
                    <option value="Independent Researcher">Independent Researcher</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 space-y-2.5 border-t border-white/10">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.requiresCertificate}
                    onChange={(e) => setFormData({ ...formData, requiresCertificate: e.target.checked })}
                    className="mt-0.5 rounded border-white/20 text-teal-600 focus:ring-teal-500"
                  />
                  <span>Opt-in for Verifiable Certificate of Scientific Participation (requires &ge;75% session dwell time).</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-400 text-[11px]">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptedConsent}
                    onChange={(e) => setFormData({ ...formData, acceptedConsent: e.target.checked })}
                    className="mt-0.5 rounded border-white/20 text-teal-600 focus:ring-teal-500"
                  />
                  <span>I acknowledge that scientific proceedings and discussion will be recorded and published in the Kashmir EcoWatch Research Archive.</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="border-white/10 text-slate-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 shadow-md shadow-teal-500/20">
                  Confirm Registration
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">
              Delegate Registration Confirmed!
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Your official credentials have been recorded in the session registry.
            </p>

            {/* Delegate Pass Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/30 text-left mb-6 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div>
                  <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Kashmir EcoWatch Pass</div>
                  <div className="text-xs font-mono text-slate-300 font-bold">{delegateId}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified Delegate
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div><strong className="text-white">Delegate:</strong> {formData.fullName}</div>
                <div><strong className="text-white">Institution:</strong> {formData.institution}</div>
                <div><strong className="text-white">Event:</strong> {session.title}</div>
                <div><strong className="text-white">Schedule:</strong> {session.dateDisplay}</div>
                <div><strong className="text-white">Room Code:</strong> <span className="font-mono text-cyan-400">{session.roomCode}</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={handleDownloadCalendar}
                variant="outline"
                className="w-full sm:w-1/2 border-white/10 text-slate-300 hover:bg-white/5"
              >
                <Download className="w-4 h-4 mr-2 text-teal-400" />
                Add to Calendar (.ics)
              </Button>

              <a href={`/webinars/room/${session.id}`} className="w-full sm:w-1/2">
                <Button className="w-full bg-rose-600 hover:bg-rose-500 font-bold text-white shadow-md shadow-rose-600/30">
                  <Video className="w-4 h-4 mr-2" />
                  Enter Virtual Hall
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
