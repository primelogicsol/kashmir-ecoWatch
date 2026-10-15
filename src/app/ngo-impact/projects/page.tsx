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
  Target, MapPin, ShieldCheck, Leaf, Clock, Building
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@/components/common/ProjectCard';

// Flatmap all projects and inject the NGO name
interface ProjectWithNGO extends NGOProject {
  ngoName: string;
  ngoSlug: string;
}

export default function NGOProjectsPage() {
  const router = useRouter();
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
      <Heading
        label="Civil Society Network · Project Registry"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'NGO Impact', href: '/ngo-impact' },
          { label: 'Projects' }
        ]}
        icon={<Target className="w-6 h-6 text-sky-400" />}
        title={<>
          <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
            <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
            <span>Western Himalayan</span>
          </span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">Civil Society Projects</span>
        </>}
        subtitle="Explore specific environmental interventions, ecological outcomes, and verified field restoration projects executed across Jammu & Kashmir."
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-sky-600 to-blue-600 font-bold text-white"
              icon={<Building className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/directory')}
            >
              NGO Directory
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<ShieldCheck className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/submit')}
            >
              Submit Project Evidence
            </Button>
          </div>
        }
        images={[
          '/images/ngo-module/field_work.jpg',
          '/images/ngo-module/lake_clean.jpg',
          '/images/ngo-module/community.jpg',
          '/images/protected-network.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
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
