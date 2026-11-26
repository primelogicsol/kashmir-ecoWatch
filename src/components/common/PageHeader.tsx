'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  actions?: React.ReactNode;
}

export function PageHeader({ icon, title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="kew-module-hero-surface w-full">
      <div className="kew-module-hero-inner container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full min-w-0"
        >
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-300 mb-4 min-w-0">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-4 h-4 shrink-0" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors break-words">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium break-words" aria-current="page">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Icon and Title */}
        <div className="flex flex-wrap items-center gap-2 mb-4 min-w-0">
          {icon}
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-300 break-words">
            KEW Protected Network
          </span>
        </div>
        <h1 className="w-full text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-[1.14] tracking-tight break-words">{title}</h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 mb-8 leading-relaxed max-w-[72ch] break-words">{subtitle}</p>

        {/* Actions */}
        {actions && <div className="flex flex-col sm:flex-row flex-wrap gap-4">{actions}</div>}
      </motion.div>
      </div>
    </div>
  );
}
