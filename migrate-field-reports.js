const fs = require('fs');
const path = require('path');

const OLD_DIRS = [
  'monthly-bulletins', 'species-surveys', 'wetland-assessments', 'risk-assessments', 'technical-reports'
];

const NEW_MODULES = [
  {
    slug: 'protected-areas',
    title: 'Protected Areas',
    desc: 'Field intelligence from National Parks, Wildlife Sanctuaries, and Conservation Reserves. Anti-poaching patrols, habitat assessments, and corridor tracking.',
    icon: 'Shield',
    moduleFilter: 'Protected Areas',
    color1: 'from-emerald-500',
    color2: 'to-green-600',
    colorText: 'text-emerald-400',
    colorBorder: 'border-emerald-500/10'
  },
  {
    slug: 'biodiversity',
    title: 'Biodiversity',
    desc: 'Species population censuses, avian migration tracking, phenology records, and flora conservation surveys.',
    icon: 'PawPrint',
    moduleFilter: 'Biodiversity',
    color1: 'from-purple-500',
    color2: 'to-violet-600',
    colorText: 'text-purple-400',
    colorBorder: 'border-purple-500/10'
  },
  {
    slug: 'water-systems',
    title: 'Water Systems',
    desc: 'Water quality testing, lake trophic status monitoring, river discharge data, and groundwater recharge field studies.',
    icon: 'Droplets',
    moduleFilter: 'Water Systems',
    color1: 'from-blue-500',
    color2: 'to-cyan-600',
    colorText: 'text-blue-400',
    colorBorder: 'border-blue-500/10'
  },
  {
    slug: 'environmental-monitoring',
    title: 'Environmental Monitoring',
    desc: 'Air pollution indices, solid and bio-waste tracking, and sewage outfall field measurements.',
    icon: 'Activity',
    moduleFilter: 'Air & Noise Monitoring', // Wait, maybe 'Environmental Monitoring' or 'Air & Noise Monitoring' depending on data
    color1: 'from-cyan-500',
    color2: 'to-blue-600',
    colorText: 'text-cyan-400',
    colorBorder: 'border-cyan-500/10'
  },
  {
    slug: 'hazard-intelligence',
    title: 'Hazard Intelligence',
    desc: 'Avalanche exposure logs, landslide geotechnical assessments, GLOF monitoring, and flood vulnerability reports.',
    icon: 'AlertTriangle',
    moduleFilter: 'Risk & Monitoring', // Wait, maybe 'Hazard Intelligence' or 'Risk & Monitoring'
    color1: 'from-red-500',
    color2: 'to-orange-600',
    colorText: 'text-red-400',
    colorBorder: 'border-red-500/10'
  }
];

const basePath = path.join(__dirname, 'src/app/field-reports');

// Remove old directories
OLD_DIRS.forEach(dir => {
  const dirPath = path.join(basePath, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

// Create new directories and page.tsx
NEW_MODULES.forEach(mod => {
  const dirPath = path.join(basePath, mod.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pageContent = `'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, BarChart3, Clock, ExternalLink, Users,
  CloudRain, Droplets, Wind, Shield, PawPrint, Activity, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';
import { Heading } from '@/components/common/Heading';

export default function ${mod.title.replace(/\s+/g, '')}ReportsPage() {
  const router = useRouter();
  
  // Filter reports where the modules array contains a match
  // We'll just do a broad substring match for the module since the data labels might vary slightly
  const allReports = fieldReportsRegistry.filter(r => 
    r.modules.some(m => m.toLowerCase().includes('${mod.moduleFilter.toLowerCase()}') || m.toLowerCase().includes('${mod.title.toLowerCase()}')) ||
    r.title.toLowerCase().includes('${mod.title.toLowerCase()}')
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">${mod.title}</span><span className="block whitespace-nowrap bg-gradient-to-r ${mod.color1} ${mod.color2} bg-clip-text text-transparent">Field Reports</span></>}
        subtitle="${mod.desc}"
        icon={<${mod.icon} className="w-6 h-6 ${mod.colorText}" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Field Reports', href: '/field-reports' },
          { label: '${mod.title}' },
        ]}
      />

      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <Button variant="ghost" className="mb-6 text-slate-400 hover:text-white" onClick={() => router.push('/field-reports')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Field Reports
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allReports.length > 0 ? (
              allReports.map((report, idx) => (
                <ReportCard key={report.id} report={report} index={idx} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-300">No Reports Found</h3>
                <p className="text-slate-500 mt-2">Check back later for new ${mod.title} reports.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageContent, 'utf8');
});

// Update PremiumStickyHeader.tsx
const headerPath = path.join(__dirname, 'src/components/sections/PremiumStickyHeader.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');

const targetMenu = `          { name: '📊 Field Reports Overview', href: '/field-reports', desc: 'All field intelligence reports' },
          { name: '📁 Monthly Environmental Bulletins', href: '/field-reports/monthly-bulletins', desc: 'Monthly environmental bulletins' },
          { name: '🦋 Species Surveys', href: '/field-reports/species-surveys', desc: 'Wildlife and species surveys' },
          { name: '💧 Wetland Assessments', href: '/field-reports/wetland-assessments', desc: 'Wetland health reports' },
          { name: '⚠️ Risk Assessments', href: '/field-reports/risk-assessments', desc: 'Fire and hazard risk reports' },
          { name: '🔬 Technical Reports', href: '/field-reports/technical-reports', desc: 'Scientific and technical studies' },`;

const replacementMenu = `          { name: '📊 Field Reports Overview', href: '/field-reports', desc: 'All field intelligence reports' },
          { name: '🛡️ Protected Areas', href: '/field-reports/protected-areas', desc: 'Parks & sanctuary intelligence' },
          { name: '🐾 Biodiversity', href: '/field-reports/biodiversity', desc: 'Species & habitat reports' },
          { name: '💧 Water Systems', href: '/field-reports/water-systems', desc: 'Hydrological & quality field data' },
          { name: '🌬️ Environmental Monitoring', href: '/field-reports/environmental-monitoring', desc: 'Pollution & baseline field studies' },
          { name: '⚠️ Hazard Intelligence', href: '/field-reports/hazard-intelligence', desc: 'Geotechnical & extreme weather reports' },`;

headerContent = headerContent.replace(targetMenu, replacementMenu);
fs.writeFileSync(headerPath, headerContent, 'utf8');

console.log("Migration complete!");
