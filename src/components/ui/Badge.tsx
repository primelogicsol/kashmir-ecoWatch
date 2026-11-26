import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'stable' | 'monitoring' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Badge({ children, variant = 'default', size = 'md', className, onClick }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-100 border border-white/10',
    secondary: 'bg-slate-700 text-slate-100 border border-white/10',
    success: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-950/80 text-amber-300 border border-amber-500/30',
    danger: 'bg-red-950/80 text-red-300 border border-red-500/30',
    info: 'bg-sky-950/80 text-sky-300 border border-sky-500/30',
    outline: 'bg-slate-950/50 border border-slate-500 text-slate-200',
    stable: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30',
    monitoring: 'bg-amber-950/80 text-amber-300 border border-amber-500/30',
    critical: 'bg-red-950/80 text-red-300 border border-red-500/30',
  };

  const sizes = {
    sm: 'text-[10px] xs:text-xs px-2 py-0.5 text-center leading-tight break-words',
    md: 'text-xs px-2.5 py-1 leading-tight break-words',
    lg: 'text-xs sm:text-sm px-3 py-1 sm:py-1.5 leading-snug break-words',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-sm max-w-full',
        variants[variant],
        sizes[size],
        className,
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity'
      )}
    >
      {children}
    </span>
  );
}
