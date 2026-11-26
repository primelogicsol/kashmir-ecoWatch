import React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'default' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const normalizedVariant = variant === 'default' ? 'primary' : variant;

  const baseStyles =
    'kew-cta inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 visited:text-current [&_svg]:shrink-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none text-center leading-snug break-words max-w-full select-none';

  const variants: Record<'primary' | 'secondary' | 'outline' | 'ghost', string> = {
    primary:
      'kew-cta-primary bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white border border-emerald-400/25 shadow-lg hover:shadow-xl',
    secondary:
      'kew-cta-secondary bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white border border-slate-600/80 shadow-md hover:shadow-lg',
    outline:
      'kew-cta-outline border-2 border-slate-400/75 hover:border-emerald-400 bg-slate-950/65 hover:bg-slate-900/90 active:bg-slate-950 text-slate-100 hover:text-emerald-300',
    ghost:
      'kew-cta-ghost bg-transparent hover:bg-slate-800/80 active:bg-slate-800 text-slate-200 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm gap-1.5',
    md: 'px-4 py-2 sm:px-5 sm:py-2.5 text-sm gap-2',
    lg: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base gap-2 rounded-md',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      data-kew-cta={normalizedVariant}
      aria-busy={isLoading || undefined}
      disabled={isDisabled}
      className={cn(baseStyles, variants[normalizedVariant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin flex-shrink-0"
        />
      ) : (
        icon && <span className="flex-shrink-0 inline-flex items-center">{icon}</span>
      )}
      {children}
    </button>
  );
}
