'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Award,
  Building2,
  Calendar,
  FileText,
  Layers,
  PlusCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function WebinarNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Hub Overview', href: '/webinars', icon: Sparkles },
    { label: 'Conferences (8)', href: '/webinars/conferences', icon: Layers },
    { 
      label: '2027–28 Calendar', 
      href: '/webinars/calendar', 
      icon: Calendar,
      badge: '104 Events',
      badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
    },
    { label: 'Upcoming', href: '/webinars/upcoming', icon: Calendar },
    { label: 'Host a Conference', href: '/webinars/host-a-conference', icon: PlusCircle },
    { label: 'Institutional Network', href: '/webinars/institution/verification', icon: Building2 },
    { 
      label: 'Virtual Hall', 
      href: '/webinars/room/kew-conf-2027-cryo', 
      icon: Video,
      badge: 'Demo',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
    },
    { label: 'Proceedings', href: '/webinars/proceedings', icon: FileText },
    { label: 'Past Archives', href: '/webinars/past-events', icon: Award },
    { label: 'Super Admin', href: '/webinars/admin', icon: ShieldCheck }
  ];

  return (
    <div className="sticky top-16 md:top-[72px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/webinars' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border',
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-sm shadow-teal-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-teal-400' : 'text-slate-400')} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={cn('text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full', link.badgeColor)}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/webinars/admin"
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border',
                pathname.startsWith('/webinars/admin')
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Super Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
