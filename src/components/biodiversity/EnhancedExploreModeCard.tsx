import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface EnhancedExploreModeCardProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count?: number;
  countLabel?: string;
  color: string;
  delay?: number;
}

export function EnhancedExploreModeCard({
  label,
  description,
  icon: Icon,
  href,
  count,
  countLabel = 'entities',
  delay = 0,
}: EnhancedExploreModeCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="h-full min-w-0"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(href)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(href);
          }
        }}
        className="kew-card-shell kew-card-shell--interactive group h-full"
      >
        {/* 1. ICON (top-left) */}
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* 2. TITLE — full horizontal width */}
        <h3 className="kew-card-title">{label}</h3>

        {/* 3. KPI */}
        {count !== undefined && (
          <div className="kew-card-kpi">
            <span className="kew-card-kpi-value">{count.toLocaleString()}</span>
            <span className="kew-card-kpi-unit">{countLabel}</span>
          </div>
        )}

        {/* 4. DESCRIPTION */}
        <p className="kew-card-desc">{description}</p>

        {/* 5. CTA — anchored near bottom */}
        <div className="kew-card-cta">
          <span>Explore {label}</span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
