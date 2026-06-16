'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getEndemicSpecies } from '@/data/biodiversity-access';
import type { EndemismStatus, TaxonomicGroup } from '@/types/biodiversity';
import SourceVerificationBadge from '@/components/biodiversity/intelligence/SourceVerificationBadge';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EndemicSpeciesPage() {
  const [filterEndemism, setFilterEndemism] = useState<EndemismStatus | 'all'>('all');
  const [filterTaxon, setFilterTaxon] = useState<TaxonomicGroup | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const allEndemic = getEndemicSpecies();

  let filteredSpecies = allEndemic;

  if (filterEndemism !== 'all') {
    filteredSpecies = filteredSpecies.filter((s) => s.endemismStatus === filterEndemism);
  }

  if (filterTaxon !== 'all') {
    filteredSpecies = filteredSpecies.filter((s) => s.taxonomicGroup === filterTaxon);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredSpecies = filteredSpecies.filter(
      (s) =>
        s.commonName.toLowerCase().includes(query) ||
        s.scientificName.toLowerCase().includes(query) ||
        s.localName?.toLowerCase().includes(query)
    );
  }

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterEndemism, filterTaxon, searchQuery]);

  const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
  const paginatedSpecies = filteredSpecies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const endemismCounts = {
    'kashmir-endemic': allEndemic.filter((s) => s.endemismStatus === 'kashmir-endemic').length,
    'himalayan-endemic': allEndemic.filter((s) => s.endemismStatus === 'himalayan-endemic').length,
    'northwest-himalayan': allEndemic.filter((s) => s.endemismStatus === 'northwest-himalayan').length,
    'trans-himalayan': allEndemic.filter((s) => s.endemismStatus === 'trans-himalayan').length,
  };

  // Exact 8 KPIs to match Plants page layout
  const metrics = [
    { label: 'Total Endemic', value: allEndemic.length, icon: 'Shield' },
    { label: 'Validated Sources', value: 'High', icon: 'CheckCircle' },
    { label: 'Kashmir Endemic', value: endemismCounts['kashmir-endemic'], icon: 'MapPin' },
    { label: 'Himalayan Endemic', value: endemismCounts['himalayan-endemic'], icon: 'Mountain' },
    { label: 'NW Himalayan', value: endemismCounts['northwest-himalayan'], icon: 'Map' },
    { label: 'Active Sightings', value: '2.1K+', icon: 'Eye' },
    { label: 'Data Sources', value: 14, icon: 'Database' },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' },
  ];

  const filters = {
    habitats: ['Alpine meadows', 'Riverine forests', 'High-altitude scrub', 'Temperate forests'],
    districts: ['Kishtwar', 'Srinagar', 'Bandipora', 'Anantnag', 'Kupwara'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Endemic Species of Kashmir"
      subtitle="Unique species found only in the Kashmir region and the Himalayas. These species represent our natural heritage and require special conservation attention and strict intelligence monitoring."
      icon="MapPin"
      color="from-emerald-500 to-teal-700"
      species={[]}
      metrics={metrics}
      filters={filters}
    >
      <div className="space-y-8 pb-12">
        <Card className="glass-intense border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Filter Database</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Search Species</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Endemism Level</label>
              <select
                value={filterEndemism}
                onChange={(e) => setFilterEndemism(e.target.value as EndemismStatus | 'all')}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="all">All Endemic Levels</option>
                <option value="kashmir-endemic">Kashmir Endemic</option>
                <option value="himalayan-endemic">Himalayan Endemic</option>
                <option value="northwest-himalayan">Northwest Himalayan</option>
                <option value="trans-himalayan">Trans-Himalayan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Taxonomic Group</label>
              <select
                value={filterTaxon}
                onChange={(e) => setFilterTaxon(e.target.value as TaxonomicGroup | 'all')}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="all">All Groups</option>
                <option value="mammals">Mammals</option>
                <option value="birds">Birds</option>
                <option value="fish">Fish</option>
                <option value="plants">Plants</option>
                <option value="medicinal-plants">Medicinal Plants</option>
                <option value="reptiles-amphibians">Reptiles & Amphibians</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="space-y-6 mt-8">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              Active Database: {filteredSpecies.length} Target(s)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedSpecies.map((species, i) => (
              <motion.div key={species.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-emerald-500/30 transition-colors h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="p-5 border-b border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{species.commonName}</h3>
                        <span className={`px-2 py-1 text-[9px] font-bold uppercase rounded-sm ${
                          species.conservationStatus === 'CR' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          species.conservationStatus === 'EN' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                          species.conservationStatus === 'VU' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-white/10 text-slate-300 border border-white/10'
                        }`}>
                          {species.conservationStatus}
                        </span>
                      </div>
                      <div className="text-xs italic text-slate-500 mb-4">{species.scientificName}</div>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-[9px] font-medium rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                          {species.endemismStatus.replace('-', ' ')}
                        </span>
                        <span className="px-2 py-1 text-[9px] font-medium rounded-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                          {species.taxonomicGroup.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-black/20 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                        {species.description}
                      </p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                        <SourceVerificationBadge 
                          dataSource={species.dataSource} 
                          size="sm"
                        />
                        <Link 
                          href={`/biodiversity/${species.taxonomicGroup}/${species.slug}`}
                          className="text-[11px] font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 uppercase tracking-widest"
                        >
                          Intel File
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-center gap-4 mt-12">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isCurrentPage = page === currentPage;
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (!showPage) {
                      if (page === 2 || page === totalPages - 1) {
                        return <span key={page} className="text-slate-600 px-1">...</span>;
                      }
                      return null;
                    }

                    return (
                      <Button
                        key={page}
                        variant={isCurrentPage ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 p-0 ${
                          isCurrentPage 
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BiodiversityCategoryPage>
  );
}
