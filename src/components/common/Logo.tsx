'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  variant?: 'expanded' | 'compact' | 'mobile';
  className?: string;
}

/**
 * Premium Logo Component for Kashmir EcoWatch
 * 
 * Variants:
 * - expanded: Full logo with mark and wordmark for hero state
 * - compact: Simplified logo for sticky header state
 * - mobile: Optimized logo for mobile header
 */
export function Logo({ variant = 'expanded', className }: LogoProps) {
  const logoConfig = {
    expanded: {
      containerClass: 'flex items-center',
      imgClass: 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain drop-shadow-lg',
      showWordmark: false,
      wordmarkClass: 'flex flex-col justify-center',
    },
    compact: {
      containerClass: 'flex items-center',
      imgClass: 'w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md',
      showWordmark: false,
      wordmarkClass: 'flex flex-col justify-center',
    },
    mobile: {
      containerClass: 'flex items-center',
      imgClass: 'w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-md',
      showWordmark: false,
      wordmarkClass: 'flex flex-col justify-center',
    },
  };

  const config = logoConfig[variant];

  return (
    <Link 
      href="/" 
      className={cn(
        'group relative transition-all duration-300',
        config.containerClass,
        className
      )}
    >
      {/* Logo Mark */}
      <img
        src="/kew_LOGO.png"
        alt="Kashmir EcoWatch"
        className={cn(
          config.imgClass,
          'transform group-hover:scale-105 transition-transform duration-300'
        )}
      />

      {/* Institutional Wordmark - Proportioned for Wide & 4K Displays */}
      {variant !== 'mobile' && (
        <div className="hidden xl:flex flex-col justify-center ml-3 select-none">
          <span className="text-sm 2xl:text-base font-bold text-white tracking-tight leading-tight whitespace-nowrap">
            Kashmir EcoWatch
          </span>
          <span className="text-[10px] 2xl:text-xs text-emerald-400 font-semibold tracking-wider uppercase whitespace-nowrap">
            Environmental Intelligence
          </span>
        </div>
      )}

      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-lg blur-xl" />
      </div>
    </Link>
  );
}
