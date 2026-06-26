'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import Link from 'next/link';
import {
  Leaf,
  Menu,
  X,
  Map,
  ChevronDown,
  Bell,
  Settings,
  User,
  Shield,
  Search,
  Droplet,
  Waves,
  Wind,
  Mountain,
  Thermometer,
  Fish,
  AlertTriangle,
  Hammer,
  Calendar,
  Footprints,
  Database,
  BarChart3,
  Book,
  Globe,
  Factory,
  Recycle,
  Upload,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrolledHeader } from '@/hooks/useScrolledHeader';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Protected Areas',         href: '/protected-network',        hasDropdown: true },
  { label: 'Biodiversity',            href: '/biodiversity',             hasDropdown: true },
  { label: 'Water Systems',           href: '/water-systems',            hasDropdown: true },
  { label: 'Environmental Monitoring',href: '/environmental-monitoring', hasDropdown: true },
  { label: 'Hazard Intelligence',     href: '/hazard-intelligence',      hasDropdown: true },
];

interface DropdownItem {
  name: string;
  href: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  isHeader?: boolean;
}

export function PremiumStickyHeader() {
  const { isScrolled, isCompact, scrollDirection } = useScrolledHeader({ threshold: 60, smoothTransition: true });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSubmenus, setExpandedMobileSubmenus] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobileSubmenus(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const getDropdownItems = (label: string): DropdownItem[] => {
    switch (label) {
      case 'Protected Areas':
        return [
          { name: '🗺️ Network Overview', href: '/protected-network', desc: 'Complete protected area system' },
          { name: '📍 Protected Area Atlas', href: '/protected-network/atlas', desc: 'Interactive GIS mapping' },
          { name: '── Protected Areas ──', href: '#', desc: '', isHeader: true },
          { name: 'National Parks', href: '/protected-network/national-parks', desc: 'Core conservation landscapes' },
          { name: 'Wildlife Sanctuaries', href: '/protected-network/wildlife-sanctuaries', desc: 'Protected habitats' },
          { name: 'Wetland Reserves', href: '/protected-network/wetland-reserves', desc: 'Marsh & bird conservation' },
          { name: 'Conservation Reserves', href: '/protected-network/conservation-reserves', desc: 'Community landscapes' },
          { name: 'Bird & Habitat Areas', href: '/protected-network/bird-and-habitat-areas', desc: 'Important bird areas' },
          { name: '── Ecological Intelligence ──', href: '#', desc: '', isHeader: true },
          { name: 'Species Intelligence Network', href: '/protected-network/species-intelligence', desc: 'Biological intelligence layer' },
          { name: 'Corridors and Connectivity', href: '/protected-network/corridors-and-connectivity', desc: 'Landscape linkages' },
          { name: 'Monitoring and Threat Intelligence', href: '/protected-network/monitoring-and-threats', desc: 'Conservation alerts' },
          { name: 'Research and Assessments', href: '/protected-network/reports-and-plans', desc: 'Scientific publications' },
          { name: 'Trails & Sightings', href: '/protected-network/trails-and-sightings', desc: 'Field observations' },
        ];
      case 'Biodiversity':
        return [
          { name: '📊 Overview', href: '/biodiversity/overview', desc: 'Module command center' },
          { name: '📊 Dashboards', href: '/biodiversity/dashboards', desc: 'Analytics & trends' },
          // Species Group
          { name: '── Species ──', href: '#', desc: '', isHeader: true },
          { name: 'Species Directory', href: '/biodiversity', desc: 'Browse complete database' },
          { name: 'Mammals', href: '/biodiversity/mammals', desc: 'Ungulates, carnivores & more' },
          { name: 'Birds', href: '/biodiversity/birds', desc: 'Resident & migratory species' },
          { name: 'Fish & Aquatic Life', href: '/biodiversity/fish', desc: 'Freshwater & aquatic biodiversity' },
          { name: 'Plants & Flora', href: '/biodiversity/plants', desc: 'Vascular plants & vegetation' },
          { name: 'Medicinal Flora', href: '/biodiversity/medicinal-plants', desc: 'Traditional medicinal plants' },
          { name: 'Priority & Threatened Species', href: '/biodiversity/threatened-species', desc: 'CR, EN, VU conservation taxa' },
          // Observation & Ecology Group
          { name: '── Observation & Ecology ──', href: '#', desc: '', isHeader: true },
          { name: 'Wildlife Sightings', href: '/biodiversity/wildlife-sightings', desc: 'Verified & community observations' },
          { name: 'Birding & Observation Hotspots', href: '/biodiversity/birding-hotspots', desc: 'Prime observation areas' },
          { name: 'Migration Windows', href: '/biodiversity/migration-windows', desc: 'Migratory bird timing' },
          { name: 'Pollinator Activity', href: '/biodiversity/pollinator-activity', desc: 'Pollinator watch periods' },
          { name: 'Phenology & Flowering Records', href: '/biodiversity/phenology-flowering', desc: 'Flowering & seasonal records' },
          { name: 'Forest Ecosystems', href: '/biodiversity/forest-ecosystems', desc: '10-module habitat intelligence layer' },
          { name: 'Habitat Signals', href: '/biodiversity/habitat-signals', desc: 'Habitat stress & transitions' },
          { name: 'Seasonal Species Activity', href: '/biodiversity/seasonal-activity', desc: 'Breeding & activity windows' },
          // Intelligence Group
          { name: '── Intelligence ──', href: '#', desc: '', isHeader: true },
          { name: 'District Biodiversity Profiles', href: '/biodiversity/district-profiles', desc: 'Regional intelligence' },
        ];
      case 'Water Systems':
        return [
          { name: '💧 Overview', href: '/water-systems', desc: 'Complete hydrological intelligence' },
          { name: 'Dashboards', href: '/water-systems/dashboards', desc: 'Analytics, trends & heatmaps' },
          { name: 'Lakes', href: '/water-systems/lakes', desc: 'Major, minor, urban & high-altitude lakes' },
          { name: 'Wetlands', href: '/water-systems/wetlands', desc: 'Marshes, floodplain & Ramsar wetlands' },
          { name: 'Rivers & Streams', href: '/water-systems/rivers', desc: 'Major rivers, tributaries & streams' },
          { name: 'Springs', href: '/water-systems/springs', desc: 'Perennial, seasonal & community springs' },
          { name: 'Watersheds', href: '/water-systems/watersheds', desc: 'Basins, catchments & hydrological units' },
          { name: 'Groundwater', href: '/water-systems/groundwater', desc: 'Aquifers, water levels & validation queues' },
          { name: 'Glaciers & Cryosphere', href: '/water-systems/glaciers', desc: 'Glaciers & snow-fed systems' },
          { name: 'Drinking Water Sources', href: '/water-systems/drinking-water-sources', desc: 'Spring & surface supply vulnerability' },
          { name: 'Water Quality', href: '/water-systems/water-quality', desc: 'Quality monitoring & trends' },
          { name: 'Aquatic Life & Fisheries', href: '/water-systems/fisheries', desc: 'Fish species & fishery management' },
          { name: 'Restoration & Rejuvenation', href: '/water-systems/restoration', desc: 'Conservation & restoration projects' },
          { name: 'Flood & Hydrological Risk', href: '/water-systems/flood-risk', desc: 'Flood zones & hazard assessment' },
        ];
      case 'Environmental Monitoring':
        return [
          { name: '🏗️ Overview', href: '/environmental-monitoring', desc: 'Environmental intelligence command center' },
          { name: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress heatmaps' },
          { name: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Dumping, landfill stress, open waste' },
          { name: 'Bio-Waste', href: '/environmental-monitoring/bio-waste', desc: 'Organic waste, decomposition zones' },
          { name: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow, outfalls, untreated discharge' },
          { name: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Contamination alerts, supply issues' },
          { name: 'Critical Infrastructure', href: '/environmental-monitoring/critical-infrastructure', desc: 'Reservoirs, utilities, waste assets' },
          { name: 'Air Pollution', href: '/environmental-monitoring/air-pollution', desc: 'AQI, particulate, smoke, burning' },
          { name: 'Environmental Health Signals', href: '/environmental-monitoring/environmental-health', desc: 'Odor, fish kill, stagnant water' },
          { name: 'Environmental Resilience', href: '/environmental-monitoring/environmental-resilience', desc: 'Resilience, recovery & stress capacity' },
          { name: 'SDG Monitoring', href: '/environmental-monitoring/sdg-monitoring', desc: 'Environmental UN SDG performance tracking' },
        ];
      case 'Hazard Intelligence':
        return [
          { name: '⚠️ Overview', href: '/hazard-intelligence', desc: 'Multi-hazard intelligence command center' },
          { name: '📊 Dashboards', href: '/hazard-intelligence/dashboards', desc: 'Risk dashboards, heatmaps & trends' },
          { name: '── Hazard Systems ──', href: '#', desc: '', isHeader: true },
          { name: 'Floods', href: '/hazard-intelligence/floods', desc: 'Riverine, urban & floodplain flooding' },
          { name: 'Flash Floods', href: '/hazard-intelligence/flash-floods', desc: 'Cloudburst & rapid runoff hazards' },
          { name: 'Landslides', href: '/hazard-intelligence/landslides', desc: 'Slope instability & mass movement' },
          { name: 'Avalanches', href: '/hazard-intelligence/avalanches', desc: 'Snow-slide monitoring & exposure' },
          { name: 'Algal Bloom Intelligence', href: '/hazard-intelligence/algal-bloom-intelligence', desc: 'Eutrophication & bloom risk monitoring' },
          { name: 'Earthquakes', href: '/hazard-intelligence/earthquakes', desc: 'Seismic activity & fault systems' },
          { name: 'GLOFs', href: '/hazard-intelligence/glofs', desc: 'Glacial lake outburst flood intelligence' },
          { name: 'Forest Fires', href: '/hazard-intelligence/forest-fires', desc: 'Wildfire occurrence & burn monitoring' },
        ];

      default:
        return [];
    }
  };

  const renderDropdownItems = (items: DropdownItem[]) => (
    <>
      {items.map((subitem) => (
        subitem.isHeader ? (
          <div key={subitem.name} className="px-4 py-1.5 bg-slate-800/30">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">{subitem.name.replace(/──/g, '').trim()}</span>
          </div>
        ) : (
          <Link
            key={subitem.name}
            href={subitem.href}
            onClick={() => { setActiveDropdown(null); setIsMobileMenuOpen(false); }}
            className="block px-3 py-1 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-medium">{subitem.name}</span>
            {subitem.desc && (
              <span className="block text-[10px] text-slate-500 mt-0.5">{subitem.desc}</span>
            )}
          </Link>
        )
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        // Expanded state (hero)
        !isScrolled && 'bg-transparent',
        // Transitioning state
        isScrolled && !isCompact && 'bg-slate-950/80 backdrop-blur-md border-b border-white/5',
        // Compact sticky state
        isCompact && 'bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/10'
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300 ease-out',
            // Height transitions
            !isCompact ? 'h-24 md:h-28' : 'h-16 md:h-18'
          )}
        >
          {/* Logo - Premium with variants */}
          <Logo variant={isCompact ? 'compact' : 'expanded'} />

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer',
                    activeDropdown === item.label
                      ? 'text-white bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-3 h-3 -ml-0.5 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Panel */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    {/* Dropdown Header */}
                    <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                      <div className="flex items-center gap-2">
                        {item.label === 'Protected Areas' && <Shield className="w-4 h-4 text-emerald-400" />}
                        {item.label === 'Biodiversity' && <Leaf className="w-4 h-4 text-emerald-400" />}
                        {item.label === 'Water Systems' && <Droplet className="w-4 h-4 text-sky-400" />}
                        {item.label === 'Environmental Monitoring' && <BarChart3 className="w-4 h-4 text-amber-400" />}
                        {item.label === 'Hazard Intelligence' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        {item.label === 'Field Intelligence' && <FileText className="w-4 h-4 text-orange-400" />}
                        {item.label === 'Seasonal Ecology' && <Calendar className="w-4 h-4 text-amber-400" />}
                        {item.label === 'Risk & Monitoring' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </span>
                      </div>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-2 max-h-[70vh] overflow-y-auto">
                      {renderDropdownItems(getDropdownItems(item.label))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Search toggle */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-48 px-3 py-1.5 pl-9 text-sm rounded-lg bg-slate-800/50 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-white/20 focus:bg-slate-800 transition-colors"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-slate-300 hover:text-white p-1.5"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Alerts */}
            <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white p-1.5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-1.5">
              <Settings className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-1.5">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isCompact ? 'hover:bg-white/10' : 'hover:bg-white/5'
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay and drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 w-[85%] sm:w-[75%] max-w-[320px] bg-slate-900 z-[51] lg:hidden shadow-2xl flex flex-col h-dvh border-r border-white/10"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Drawer header */}
              <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10">
                <Logo variant="mobile" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable menu content */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-4 space-y-0.5"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => {
                  const isExpanded = expandedMobileSubmenus.has(item.label);
                  return (
                    <div key={item.label} className="border-b border-white/5 last:border-0">
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => toggleMobileSubmenu(item.label)}
                            className="w-full flex items-center justify-between gap-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-sm font-medium"
                            aria-expanded={isExpanded}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                'w-5 h-5 transition-transform duration-200',
                                isExpanded && 'rotate-180'
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-2 mb-3 space-y-0.5">
                                  {renderDropdownItems(
                                    getDropdownItems(item.label).map(item => ({
                                      ...item,
                                      name: item.name.replace(/^[^\w\s]+\s*/u, '') // Strip leading emoji for mobile
                                    }))
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile search and actions */}
                <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-3 pl-11 rounded-lg bg-white/5 border border-white/10 outline-none text-sm text-white placeholder:text-slate-500 focus:border-white/20 focus:bg-white/10 transition-colors"
                    />
                    <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <Button className="w-full text-sm">Access Platform</Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
