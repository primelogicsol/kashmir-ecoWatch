'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Music,
  Feather,
  Film,
  Palette,
  Waves,
  Users,
  GraduationCap,
  Send,
} from 'lucide-react';

export interface EcoVoicesNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const ECOVOICES_NAV_ITEMS: EcoVoicesNavItem[] = [
  { id: 'premiere', label: 'Premiere', href: '/ecovoices#premiere', icon: Sparkles },
  { id: 'music', label: 'Music', href: '/ecovoices#music', icon: Music, badge: '6' },
  { id: 'poetry', label: 'Poetry', href: '/ecovoices#poetry', icon: Feather },
  { id: 'cinema', label: 'Cinema', href: '/ecovoices#cinema', icon: Film },
  { id: 'visual-arts', label: 'Visual Arts', href: '/ecovoices#visual-arts', icon: Palette },
  { id: 'soundscapes', label: 'Soundscapes', href: '/ecovoices#soundscapes', icon: Waves },
  { id: 'artists', label: 'Artists', href: '/ecovoices#artists', icon: Users },
  { id: 'classroom', label: 'Field Lessons', href: '/ecovoices#classroom', icon: GraduationCap },
];

interface EcoVoicesSubNavProps {
  activeSection?: string;
  onSelectSection?: (id: string) => void;
}

export function EcoVoicesSubNav({ activeSection, onSelectSection }: EcoVoicesSubNavProps) {
  const pathname = usePathname();
  const isHub = pathname === '/ecovoices';

  return (
    <nav
      aria-label="EcoVoices creative departments"
      className="sticky top-12 sm:top-14 xl:top-[78px] z-40 bg-[#060812]/90 backdrop-blur-2xl border-y border-amber-300/15 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 py-2.5 overflow-x-auto scrollbar-none">
          {/* Brand Crest */}
          <Link
            href="/ecovoices"
            className="flex items-center gap-2.5 shrink-0 pr-3 border-r border-amber-200/15 group"
          >
            <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.8)]" />
            <div className="leading-none">
              <span className="font-[family-name:var(--font-ecovoices-display)] text-[11px] tracking-[0.28em] text-amber-200 font-semibold block group-hover:text-amber-100 transition-colors">
                ECOVOICES
              </span>
              <span className="text-[9px] text-slate-400 tracking-wider uppercase hidden xl:block mt-0.5">
                Arts · Music · Expression
              </span>
            </div>
          </Link>

          {/* Department Links */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {ECOVOICES_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                (isHub && activeSection === item.id) ||
                (!isHub && item.id === 'music' && pathname.startsWith('/ecovoices/song'));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    if (isHub && onSelectSection) {
                      onSelectSection(item.id);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-300/15 text-amber-200 border border-amber-300/45 shadow-[0_0_20px_rgba(251,191,36,0.12)] font-semibold'
                      : 'text-slate-300/85 hover:text-amber-100 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-300/70'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-400/15 text-amber-200 border border-amber-300/25">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Submit CTA */}
          <Link
            href="/ecovoices#submit"
            onClick={() => {
              if (isHub && onSelectSection) {
                onSelectSection('submit');
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 hover:from-amber-200 hover:to-amber-100 text-slate-950 font-bold text-xs tracking-wide shrink-0 shadow-lg shadow-amber-500/15 transition-all"
          >
            <Send className="w-3 h-3" />
            <span>Submit Work</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
