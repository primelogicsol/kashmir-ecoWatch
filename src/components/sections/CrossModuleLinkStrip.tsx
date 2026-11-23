// Cross-Module Link Strip Component
// Navigation to related modules (Protected Areas, Biodiversity, Water Systems, etc.)

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Shield, Leaf, Droplets, Calendar, AlertTriangle, Map,
  Building2, ArrowRight, Layers, Bird, Trees, Mountain
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export interface ModuleLink {
  id: string;
  module: string;
  label: string;
  description: string;
  route: string;
  icon: React.ElementType;
  color: string;
  count?: number;
  enabled: boolean;
}

interface CrossModuleLinkStripProps {
  context?: {
    district?: string;
    species?: string;
    protectedArea?: string;
    habitat?: string;
  };
}

const defaultModuleLinks: ModuleLink[] = [
  {
    id: 'protected-areas',
    module: 'Protected Areas',
    label: 'Protected Areas',
    description: 'National parks, wildlife sanctuaries, and conservation reserves',
    route: '/protected-areas',
    icon: Shield,
    color: 'from-amber-500 to-orange-600',
    count: 12,
    enabled: true
  },
  {
    id: 'biodiversity',
    module: 'Biodiversity',
    label: 'Species Database',
    description: 'Mammals, birds, plants, and medicinal species profiles',
    route: '/biodiversity',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600',
    count: 2452,
    enabled: true
  },
  {
    id: 'water-systems',
    module: 'Water Systems',
    label: 'Wetlands & Water Bodies',
    description: 'Lakes, wetlands, rivers, and aquatic ecosystems',
    route: '/water-systems',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    count: 456,
    enabled: true
  },
  {
    id: 'seasonal-ecology',
    module: 'Seasonal Ecology',
    label: 'Migration & Bloom Calendar',
    description: 'Seasonal events, migration windows, and phenology',
    route: '/seasonal-ecology',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600',
    enabled: true
  },
  {
    id: 'risk-monitoring',
    module: 'Risk & Monitoring',
    label: 'Risk Profiles',
    description: 'High-altitude risks, wildlife conflict, and hazards',
    route: '/risk-monitoring',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    enabled: true
  },
  {
    id: 'district-profiles',
    module: 'District Profiles',
    label: 'District Intelligence',
    description: 'Ecological profiles for all Kashmir districts',
    route: '/districts',
    icon: Building2,
    color: 'from-violet-500 to-purple-600',
    count: 20,
    enabled: true
  },
  {
    id: 'atlas',
    module: 'Atlas',
    label: 'Interactive Map',
    description: 'GIS layers, spatial analysis, and mapping tools',
    route: '/atlas',
    icon: Map,
    color: 'from-sky-500 to-blue-600',
    enabled: true
  },
];

export function CrossModuleLinkStrip({ context }: CrossModuleLinkStripProps) {
  const router = useRouter();
  
  // Customize links based on context
  const contextualLinks: ModuleLink[] = context 
    ? defaultModuleLinks.map(link => {
        // Add context-specific query params
        const params = new URLSearchParams();
        if (context.district) params.set('district', context.district);
        if (context.species) params.set('species', context.species);
        if (context.protectedArea) params.set('pa', context.protectedArea);
        if (context.habitat) params.set('habitat', context.habitat);
        
        const queryString = params.toString();
        return {
          ...link,
          route: queryString ? `${link.route}?${queryString}` : link.route
        };
      })
    : defaultModuleLinks;
  
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Cross-Module Network
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Related Intelligence</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">Explore connected ecological data across modules</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {contextualLinks.map((link, index) => {
            const Icon = link.icon;
            
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full min-w-0"
              >
                <div
                  role={link.enabled ? 'button' : undefined}
                  tabIndex={link.enabled ? 0 : undefined}
                  onClick={() => link.enabled && router.push(link.route)}
                  onKeyDown={(e) => {
                    if (link.enabled && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      router.push(link.route);
                    }
                  }}
                  className="kew-card-shell kew-card-shell--interactive group h-full relative"
                >
                  {/* 1. ICON (top-left) */}
                  <div className="kew-card-top-row">
                    <div className="kew-card-icon-box bg-slate-800/90 border-white/15 text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" size="sm" className="border-white/10 text-[10px] text-slate-300">
                      {link.module}
                    </Badge>
                  </div>

                  {/* 2. TITLE — full horizontal width */}
                  <h3 className="kew-card-title">{link.label}</h3>

                  {/* 3. KPI — below title */}
                  {link.count !== undefined && (
                    <div className="kew-card-kpi">
                      <span className="text-xl font-extrabold text-white tabular-nums">
                        {link.count.toLocaleString()}
                      </span>
                      <span className="kew-card-kpi-unit">entities</span>
                    </div>
                  )}

                  {/* 4. DESCRIPTION */}
                  <p className="kew-card-desc">{link.description}</p>

                  {/* 5. CTA — anchored near bottom */}
                  <div className="kew-card-cta">
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {!link.enabled && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                      <Badge variant="outline" size="sm" className="border-slate-600 text-slate-400">
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
