'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { ngoRegistryData, NGOProject } from '@/data/ngo-impact';
import { 
  Target, MapPin, ShieldCheck, Leaf, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProjectCard } from '@/components/common/ProjectCard';

// Flatmap all projects and inject the NGO name
interface ProjectWithNGO extends NGOProject {
  ngoName: string;
  ngoSlug: string;
}

export default function NGOProjectsPage() {
  const { filter } = useGlobalFilter();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Flatten projects
  const allProjects: ProjectWithNGO[] = useMemo(() => {
    return ngoRegistryData.flatMap(ngo => 
      ngo.projects.map(proj => ({ ...proj, ngoName: ngo.name, ngoSlug: ngo.slug }))
    );
  }, []);

  // Derived Filter Logic
  const filteredData = useMemo(() => {
    return allProjects.filter(p => {
      const matchSearch = filter.searchQuery === '' ||
        p.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        p.ngoName.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        p.problem_addressed.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      const matchDistrict = filter.district === 'All' || p.location_district === filter.district;
      
      return matchSearch && matchDistrict;
    });
  }, [filter.searchQuery, filter.district, allProjects]);

  // KPIs
  const verifiedProjects = allProjects.filter(p => p.verification_status.includes('verified') || p.verification_status.includes('reviewed')).length;
  const ongoingProjects = allProjects.filter(p => p.end_date === 'Ongoing').length;
  
  const categories = new Set(allProjects.map(p => p.environmental_category));

  const metrics = [
    { label: 'Total Registered Projects', value: allProjects.length, icon: 'Target' },
    { label: 'Verified Outcomes', value: verifiedProjects, icon: 'ShieldCheck', color: 'text-emerald-400' },
    { label: 'Currently Active', value: ongoingProjects, icon: 'Clock', color: 'text-sky-400' },
    { label: 'Impact Categories', value: categories.size, icon: 'Leaf' },
  ];

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-6 text-xs text-slate-400">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2">
          <Link href="/ngo-impact" className="hover:text-white transition-colors">NGO Impact Registry</Link>
          <span className="text-slate-600 font-bold">&gt;</span>
          <span className="text-sky-400 font-medium">Projects</span>
        </div>
      </div>
      <Heading
        label="Project Registry"
        title={
          <span className="flex items-center gap-4">
            <Target className="w-8 h-8 text-sky-500" />
            Civil Society Projects
          </span>
        }
        subtitle="Explore specific environmental interventions, outcomes, and field projects executed by verified NGOs."
        align="left"
      />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-6">
        <ModuleKpiStrip kpis={metrics} />
        
        <GlobalFilterBar
          showScope={false}
          showDistrict={true}
          showSearch={true}
          searchPlaceholder="Search projects, challenges, or NGOs..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedData.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <ProjectCard project={proj} ngoName={proj.ngoName} ngoSlug={proj.ngoSlug} />
            </motion.div>
          ))}
          {paginatedData.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 rounded-xl border border-slate-800/50 border-dashed">
              <Target className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No projects found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
