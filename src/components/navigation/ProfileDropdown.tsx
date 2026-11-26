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
      className="kew-menu-surface kew-functional-overlay absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-[320px] rounded-2xl border z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Header Profile Badge */}
      <div className="kew-menu-top-header p-4 border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              {isLoggedIn && user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="kew-menu-title text-sm font-bold leading-tight">
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
            className="kew-menu-ghost-btn p-1 rounded-lg transition-colors"
            aria-label="Close profile menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="kew-menu-subcard mt-3 p-2.5 rounded-xl border flex items-center justify-between text-[11px]">
          <span className="kew-menu-desc">Affiliation:</span>
          <span className="kew-menu-title font-medium truncate ml-2">
            {isLoggedIn && user?.institution ? user.institution : (isLoggedIn && user?.district ? `${user.district} District` : 'Kashmir Scientific Consortium')}
          </span>
        </div>
      </div>

      {/* Action Links */}
      <div className="kew-menu-scroll p-2 space-y-1 text-xs max-h-[60dvh] overflow-y-auto overscroll-contain">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="kew-menu-item kew-menu-item--card kew-menu-item--active items-center gap-2.5"
        >
          <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="kew-menu-item-title font-bold leading-none">My Contributor Dashboard</p>
            <p className="kew-menu-item-desc text-[10px] mt-1">Telemetry, submissions & alerts</p>
          </div>
        </Link>

        {isLoggedIn && user?.role === 'administrator' && (
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="kew-menu-item kew-menu-item--card items-center gap-2.5"
          >
            <Shield className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <p className="kew-menu-item-title font-bold leading-none">Admin Command Center</p>
              <p className="kew-menu-item-desc text-[10px] mt-1">Authorized administrative access only</p>
            </div>
          </Link>
        )}

        <Link
          href="/contribute-data"
          onClick={onClose}
          className="kew-menu-item kew-menu-item--card items-center gap-2.5"
        >
          <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="kew-menu-item-title font-semibold leading-none">Deposit Research Data</p>
            <p className="kew-menu-item-desc text-[10px] mt-1">Upload surveys, telemetry or GIS layers</p>
          </div>
        </Link>

        <Link
          href="/submit-observation"
          onClick={onClose}
          className="kew-menu-item kew-menu-item--card items-center gap-2.5"
        >
          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
          <div>
            <p className="kew-menu-item-title font-semibold leading-none">Submit Field Observation</p>
            <p className="kew-menu-item-desc text-[10px] mt-1">Wildlife sightings with 5km masking</p>
          </div>
        </Link>

        <Link
          href="/citizen-science"
          onClick={onClose}
          className="kew-menu-item kew-menu-item--card items-center gap-2.5"
        >
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <p className="kew-menu-item-title font-semibold leading-none">Citizen Science Grid</p>
            <p className="kew-menu-item-desc text-[10px] mt-1">District volunteer verification network</p>
          </div>
        </Link>

        <Link
          href="/about/founder"
          onClick={onClose}
          className="kew-menu-item kew-menu-item--card items-center gap-2.5"
        >
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <p className="kew-menu-item-title font-semibold leading-none">Institutional Leadership</p>
            <p className="kew-menu-item-desc text-[10px] mt-1">Governance, stewardship & research record</p>
          </div>
        </Link>
      </div>

      {/* Footer Toggle (Sign in / Out) */}
      <div className="kew-menu-footer p-3 border-t flex items-center justify-between text-xs">
        <span className="kew-menu-desc text-[11px]">
          {isLoggedIn ? 'Authenticated Contributor' : 'Guest Mode'}
        </span>
        {isLoggedIn ? (
          <button
            onClick={() => { signOut(); onClose(); }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors text-[11px] font-medium"
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
