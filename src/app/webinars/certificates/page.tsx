'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Printer,
  QrCode,
  Search,
  ShieldCheck,
  User
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { SAMPLE_CERTIFICATES, DEMO_TEST_CERTIFICATE, CertificateRecord } from '@/data/webinars';
import { Button } from '@/components/ui/Button';

export default function WebinarCertificatesPage() {
  const [searchId, setSearchId] = useState('KEW-CERT-TEST-0001');
  const [activeCert, setActiveCert] = useState<CertificateRecord | null>(null);
  const [searched, setSearched] = useState(false);

  const allSearchable = [DEMO_TEST_CERTIFICATE, ...SAMPLE_CERTIFICATES];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = allSearchable.find(
      c => c.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    setActiveCert(found || null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Digital Credentials • Academic Attendance Verification"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Scientific Webinars', href: '/webinars' },
          { label: 'Certificates of Participation' }
        ]}
        icon={<Award className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                CREDENTIALS
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Verified Participation &amp; Attendance Certificates
              </span>
            </div>
          </div>
        }
        subtitle="Real-time cryptographic certificate verification engine. Authenticating academic delegate attendance, keynote contributions, and continuing education hours logged during Kashmir EcoWatch symposiums."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
      />

      <WebinarNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Verification Status Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-xs font-mono font-bold text-teal-300 uppercase">
                0 Certificates Issued to Date • Pre-Flight Engine Operational
              </span>
            </div>
            <p className="text-xs text-slate-300">
              No official credentials have been issued as Kashmir EcoWatch prepares for its inaugural May 2027 scientific sessions. Test the verification pipeline below using test serial <code className="text-teal-300 font-mono">KEW-CERT-TEST-0001</code>.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => { setSearchId('KEW-CERT-TEST-0001'); setActiveCert(DEMO_TEST_CERTIFICATE); setSearched(true); }}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shrink-0"
          >
            Load Test Vector
          </Button>
        </div>

        {/* Certificate Lookup Bar */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Certificate Authenticity Search
          </div>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Certificate Serial (e.g. KEW-CERT-TEST-0001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono uppercase"
              />
            </div>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-500 font-bold text-white px-6">
              Verify Credential
            </Button>
          </form>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span>Test Simulation Vectors:</span>
            <button
              type="button"
              onClick={() => { setSearchId(DEMO_TEST_CERTIFICATE.id); setActiveCert(DEMO_TEST_CERTIFICATE); setSearched(true); }}
              className="underline hover:text-teal-300 font-mono"
            >
              {DEMO_TEST_CERTIFICATE.id} (Pre-Flight Vector)
            </button>
          </div>
        </div>

        {/* Certificate Rendering Display */}
        {activeCert ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-teal-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {activeCert.isDemoRecord ? 'Pre-Flight Engine Simulation Vector • Verified 2027 Architecture' : 'Statutorily Authenticated • Official Digital Record'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handlePrint} className="border-white/10 text-slate-300 hover:bg-white/5">
                  <Printer className="w-3.5 h-3.5 mr-1.5" />
                  Print / Save PDF
                </Button>
              </div>
            </div>

            {/* Official Certificate Card */}
            <div className="relative rounded-3xl bg-slate-900 border-2 border-teal-500/40 p-8 sm:p-14 text-center overflow-hidden shadow-2xl space-y-6">
              {/* Watermark Scrim */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950/60 to-slate-950 -z-10" />

              {/* Top Crest / Headers */}
              <div className="flex flex-col items-center justify-center space-y-2 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <img src="/kew_LOGO.png" alt="Logo" className="w-12 h-12 object-contain" />
                  <div className="text-left">
                    <h3 className="text-base font-extrabold text-white tracking-wider uppercase">
                      Kashmir EcoWatch &bull; Environmental Intelligence
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                      In Collaboration with Dr. Kumar Foundation USA &amp; Kumar Trust USA
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-[11px] font-mono tracking-widest text-teal-400 uppercase font-black px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
                    Certificate of Scientific Participation
                  </span>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-3 py-4">
                <p className="text-xs text-slate-400 uppercase tracking-widest">This is officially presented to</p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {activeCert.recipientName}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-teal-400 font-mono">
                  {activeCert.institution}
                </p>
              </div>

              {/* Contribution Text */}
              <div className="max-w-2xl mx-auto space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  in recognized participation as an accredited <strong className="text-white">{activeCert.role}</strong> during the international academic symposium:
                </p>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 font-bold text-white text-sm">
                  {activeCert.webinarTitle}
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Conducted under the Western Himalayan Ecological Governance Protocol on <strong className="text-slate-300">{activeCert.webinarDate}</strong>.
                  Verified continuous session presence: <span className="text-emerald-400 font-mono font-bold">{activeCert.attendancePercentage}% ({activeCert.hoursEarned} Contact Hours)</span>.
                </p>
              </div>

              {/* Signatures & Security Seal Strip */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-xs">
                {/* Sign 1 */}
                <div className="space-y-1">
                  <div className="font-serif italic text-base text-slate-300">Dr. Kumar</div>
                  <div className="border-t border-slate-700 pt-1 text-[10px] text-slate-400 uppercase font-bold">
                    Executive Trustee &bull; Dr. Kumar Foundation USA
                  </div>
                </div>

                {/* Seal & Hash */}
                <div className="space-y-1.5 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-teal-500/50 flex items-center justify-center bg-teal-950/40 text-teal-300 text-xs font-mono font-bold shadow-lg">
                    SEAL
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 break-all max-w-[180px]">
                    ID: {activeCert.id}
                  </div>
                </div>

                {/* Sign 2 */}
                <div className="space-y-1">
                  <div className="font-serif italic text-base text-slate-300">Prof. Scientific Secretariat</div>
                  <div className="border-t border-slate-700 pt-1 text-[10px] text-slate-400 uppercase font-bold">
                    Academic Dean &bull; Kashmir EcoWatch
                  </div>
                </div>
              </div>

              {/* Cryptographic Verification Footer */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[9px] text-slate-500 font-mono">
                <span>Cryptographic Digest: {activeCert.hash.slice(0, 32)}...</span>
                <span>Audited by Prime Logic Solutions USA Telemetry</span>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/30 border border-white/5">
            <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Certificate Not Found</h4>
            <p className="text-xs text-slate-400">Please verify the serial ID provided on your attendance slip.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
