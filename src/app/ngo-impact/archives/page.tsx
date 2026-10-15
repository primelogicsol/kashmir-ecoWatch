'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { ngoRegistryData } from '@/data/ngo-impact';
import { 
  Archive, FileText, ChevronRight, CheckCircle, Search, Target, Building
} from 'lucide-react';
import Link from 'next/link';

export default function ArchivesPage() {
  const { filter } = useGlobalFilter();
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Extract completed projects as archive items
  const allProjects = useMemo(() => {
    return ngoRegistryData.flatMap(ngo => 
      ngo.projects.map(proj => ({ ...proj, ngoName: ngo.name, ngoSlug: ngo.slug }))
    );
  }, []);

  const completedProjects = allProjects.filter(p => p.end_date !== 'Ongoing');

  // Generate some mock historical reports to fill out the archive
  const historicalReports = [
    { id: 'rep-1', title: 'Annual Conservation Report 2025', type: 'Annual Report', year: '2025', entity: 'Kashmir Eco Watch' },
    { id: 'rep-2', title: 'Dal Lake Cleanup Verification', type: 'Verification Note', year: '2025', entity: 'SADA' },
    { id: 'rep-3', title: 'Bear Rescue Field Evidence', type: 'Field Photos', year: '2024', entity: 'Wildlife SOS' },
    { id: 'rep-4', title: 'Spring Restoration Impact', type: 'Project Report', year: '2024', entity: 'Earth Saviours' },
  ];

  // Combine projects and reports into a unified archive feed
  const archiveItems = [
    ...completedProjects.map(p => ({
      id: p.id,
      title: p.title,
      type: 'Completed Project',
      year: p.end_date.substring(0, 4), // Assuming format YYYY-MM
      entity: p.ngoName,
      desc: p.measurable_outputs,
      slug: `/ngo-impact/project/${p.slug}`
    })),
    ...historicalReports.map(r => ({
      id: r.id,
      title: r.title,
      type: r.type,
      year: r.year,
      entity: r.entity,
      desc: 'Historical evidence and documented impact.',
      slug: '#'
    }))
  ];

  const filteredData = useMemo(() => {
    return archiveItems.filter(item => {
      const matchSearch = filter.searchQuery === '' ||
        item.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        item.entity.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      const matchYear = selectedYear === 'all' || item.year === selectedYear;
      const matchType = selectedType === 'all' || item.type === selectedType;

      return matchSearch && matchYear && matchType;
    }).sort((a, b) => b.year.localeCompare(a.year));
  }, [filter.searchQuery, selectedYear, selectedType, archiveItems]);

  const uniqueYears = Array.from(new Set(archiveItems.map(i => i.year))).sort((a, b) => b.localeCompare(a));
  const uniqueTypes = Array.from(new Set(archiveItems.map(i => i.type))).sort();

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-6 text-xs text-slate-400">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2">
          <Link href="/ngo-impact" className="hover:text-white transition-colors">NGO Impact Registry</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-200 font-medium">Archives</span>
        </div>
      </div>

      <Heading
        label="Historical Data"
        title={
          <span className="flex items-center gap-4">
            <Archive className="w-8 h-8 text-amber-500" />
            Impact Archives
          </span>
        }
        subtitle="Explore completed projects, past reports, retired campaigns, and historical field evidence."
        align="left"
      />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-6">
        
        <GlobalFilterBar
          showScope={false}
          showDistrict={false}
          showSearch={true}
          searchPlaceholder="Search archives by title or organization..."
          extraFilters={
            <>
              <FilterSelect
                value={selectedYear}
                onChange={setSelectedYear}
                placeholder="All Years"
                options={uniqueYears.map(y => ({ value: y, label: y }))}
              />
              <FilterSelect
                value={selectedType}
                onChange={setSelectedType}
                placeholder="All Record Types"
                options={uniqueTypes.map(t => ({ value: t, label: t }))}
              />
            </>
          }
        />

        {filteredData.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center flex flex-col items-center">
            <Archive className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-200 mb-2">No records found</h3>
            <p className="text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item, idx) => (
              <Card key={`${item.id}-${idx}`} className="p-5 bg-slate-900 border-slate-800 hover:border-slate-700 cursor-pointer group flex flex-col h-full" onClick={() => { if(item.slug !== '#') window.location.href = item.slug; }}>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="mb-2 bg-slate-800 text-slate-300">
                    {item.type === 'Completed Project' ? <CheckCircle className="w-3 h-3 mr-1 inline" /> : <FileText className="w-3 h-3 mr-1 inline" />}
                    {item.type}
                  </Badge>
                  <span className="text-xs text-amber-400/80 font-bold bg-amber-900/20 px-2 py-1 rounded border border-amber-900/30">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-md font-bold text-slate-200 mb-2 group-hover:text-amber-400 transition-colors leading-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium">
                  <Building className="w-3 h-3" /> {item.entity}
                </div>
                <p className="text-sm text-slate-500 line-clamp-3 mt-auto">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
