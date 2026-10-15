'use client';

import React from 'react';
import Link from 'next/link';
import { 
  User, Shield, Upload, FileText, 
  Award, CheckCircle2, LogIn, LogOut,
  ExternalLink, Sparkles, BookOpen, Layers, X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();

  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-slate-200 animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Header Profile Badge */}
      <div className="p-4 border-b border-white/10 bg-slate-950/60">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              {isLoggedIn && user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                {isLoggedIn && user ? user.name : 'Guest Observer'}
              </h3>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5 capitalize">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isLoggedIn && user ? user.role : 'Public Open Access'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close profile menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Affiliation:</span>
          <span className="text-white font-medium truncate ml-2">
            {isLoggedIn && user?.institution ? user.institution : (isLoggedIn && user?.district ? `${user.district} District` : 'Kashmir Scientific Consortium')}
          </span>
        </div>
      </div>

      {/* Action Links */}
      <div className="p-2 space-y-1 text-xs">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-300 hover:text-emerald-200 transition-colors border border-emerald-500/20"
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <div>
            <p className="font-bold leading-none">My Contributor Dashboard</p>
            <p className="text-[10px] text-emerald-400/80 mt-1">Telemetry, submissions & alerts</p>
          </div>
        </Link>

        <Link
          href="/admin/dashboard"
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/15 text-purple-300 hover:text-purple-200 transition-colors border border-purple-500/20"
        >
          <Shield className="w-4 h-4 text-purple-400" />
          <div>
            <p className="font-bold leading-none">Admin Command Center</p>
            <p className="text-[10px] text-purple-400/80 mt-1">Review queue & observer grid</p>
          </div>
        </Link>

        <Link
          href="/contribute-data"
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
        >
          <Upload className="w-4 h-4 text-emerald-400" />
          <div>
            <p className="font-semibold leading-none">Deposit Research Data</p>
            <p className="text-[10px] text-slate-400 mt-1">Upload surveys, telemetry or GIS layers</p>
          </div>
        </Link>

        <Link
          href="/submit-observation"
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
        >
          <FileText className="w-4 h-4 text-sky-400" />
          <div>
            <p className="font-semibold leading-none">Submit Field Observation</p>
            <p className="text-[10px] text-slate-400 mt-1">Wildlife sightings with 5km masking</p>
          </div>
        </Link>

        <Link
          href="/citizen-science"
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <div>
            <p className="font-semibold leading-none">Citizen Science Grid</p>
            <p className="text-[10px] text-slate-400 mt-1">District volunteer verification network</p>
          </div>
        </Link>

        <Link
          href="/about/founder"
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <div>
            <p className="font-semibold leading-none">Founder Leadership</p>
            <p className="text-[10px] text-slate-400 mt-1">Credentials & 25-year career record</p>
          </div>
        </Link>
      </div>

      {/* Footer Toggle (Sign in / Out) */}
      <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400">
          {isLoggedIn ? 'Authenticated Contributor' : 'Guest Mode'}
        </span>
        {isLoggedIn ? (
          <button
            onClick={() => { signOut(); onClose(); }}
            className="text-slate-300 hover:text-white inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-[11px] font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={() => { onClose(); openAuthModal('signin'); }}
            className="text-white inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-[11px] font-semibold"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Join</span>
          </button>
        )}
      </div>
    </div>
  );
}
