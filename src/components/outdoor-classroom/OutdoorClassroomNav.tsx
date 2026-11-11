'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  BookOpen, 
  Globe2, 
  Layers, 
  UserCheck, 
  Activity, 
  Award, 
  FileSpreadsheet,
  Calendar,
  Sparkles,
  Music
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/environmental-calendar/outdoor-classroom', label: 'Program Overview', icon: Compass },
  { href: '/environmental-calendar/ecovoices', label: 'EcoVoices (Music)', icon: Music },
  { href: '/environmental-calendar/outdoor-classroom/curriculum', label: 'Curriculum Library', icon: BookOpen },
  { href: '/environmental-calendar/outdoor-classroom/adopt-an-ecosystem', label: 'Adopt-an-Ecosystem', icon: Globe2 },
  { href: '/environmental-calendar/outdoor-classroom/field-learning-programs', label: '8 Field Programs', icon: Layers },
  { href: '/environmental-calendar/outdoor-classroom/institutional-registration', label: 'School Registration', icon: UserCheck },
  { href: '/environmental-calendar/outdoor-classroom/student-observations', label: 'Field Telemetry', icon: Activity },
  { href: '/environmental-calendar/outdoor-classroom/certificates', label: 'Certificates', icon: Award },
  { href: '/environmental-calendar/outdoor-classroom/annual-report', label: 'Annual Pilot Report', icon: FileSpreadsheet },
];

export function OutdoorClassroomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 md:top-[72px] z-40 bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top breadcrumb & badge strip */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Link href="/environmental-calendar" className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Environmental Calendar</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Outdoor Classroom (OD) Workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-semibold">
              ESRO / eIEN Kashmir Revival
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-400">
              20 Pilot Institutions • 10 Districts
            </span>
          </div>
        </div>

        {/* Scrollable Submenu links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-slate-800">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent hover:border-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
