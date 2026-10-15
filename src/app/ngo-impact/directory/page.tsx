'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { ngoRegistryData, NGORecord } from '@/data/ngo-impact';
import { 
  Building, MapPin, ShieldCheck, Search, Users, ArrowRight, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { NGOCard } from '@/components/common/NGOCard';



export default function NGODirectoryPage() {
  const { filter } = useGlobalFilter();
  
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [selectedFocus, setSelectedFocus] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); // newest, verified, most-active
  
  const allFocusAreas = new Set<string>();
  ngoRegistryData.forEach(ngo => ngo.focus_areas.forEach(f => allFocusAreas.add(f)));

  const filteredData = useMemo(() => {
    return ngoRegistryData.filter(ngo => {
      // Search
      const matchSearch = filter.searchQuery === '' ||
        ngo.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        ngo.mission_summary.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      // District
      const matchDistrict = filter.district === 'All' || ngo.operating_districts.includes(filter.district) || ngo.headquarters === filter.district;
      
      // Verification
      const isVerified = ngo.verification_status.includes('verified') || ngo.verification_status.includes('reviewed');
      const matchVerification = selectedVerification === 'all' || 
                               (selectedVerification === 'Verified' && isVerified) ||
                               (selectedVerification === 'Unverified' && !isVerified);
                               
      // Focus Area
      const matchFocus = selectedFocus === 'all' || ngo.focus_areas.includes(selectedFocus);

      return matchSearch && matchDistrict && matchVerification && matchFocus;
    }).sort((a, b) => {
      if (sortOrder === 'newest') return b.founded_year - a.founded_year; // Approximation
      if (sortOrder === 'verified') {
        const aV = a.verification_status.includes('verified') ? 1 : 0;
        const bV = b.verification_status.includes('verified') ? 1 : 0;
        return bV - aV;
      }
      if (sortOrder === 'most-active') {
        return b.projects.length - a.projects.length;
      }
      return 0;
    });
  }, [filter.searchQuery, filter.district, selectedVerification, selectedFocus, sortOrder]);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-6 text-xs text-slate-400">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2">
          <Link href="/ngo-impact" className="hover:text-white transition-colors">NGO Impact Registry</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-400 font-medium">Directory</span>
        </div>
      </div>

      <Heading
        label="Organization Directory"
        title={
          <span className="flex items-center gap-4">
            <Building className="w-8 h-8 text-emerald-500" />
            Verified NGO Directory
          </span>
        }
        subtitle="Browse the complete database of civil society organizations actively protecting the region's environment."
        align="left"
      />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-6">
        
        <GlobalFilterBar
          showScope={false}
          showDistrict={true}
          showSearch={true}
          searchPlaceholder="Search NGO name or mission..."
          extraFilters={
            <>
              <FilterSelect
                value={selectedFocus}
                onChange={setSelectedFocus}
                placeholder="All Focus Areas"
                options={Array.from(allFocusAreas).map(c => ({ value: c, label: c }))}
              />
              <FilterSelect
                value={selectedVerification}
                onChange={setSelectedVerification}
                placeholder="Verification Status"
                options={[{value: 'Verified', label: 'Verified'}, {value: 'Unverified', label: 'Unverified'}]}
              />
              <FilterSelect
                value={sortOrder}
                onChange={setSortOrder}
                placeholder="Sort By"
                options={[
                  {value: 'newest', label: 'Sort: Newest'}, 
                  {value: 'verified', label: 'Sort: Verified First'},
                  {value: 'most-active', label: 'Sort: Most Active'}
                ]}
              />
            </>
          }
        />

        {filteredData.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center flex flex-col items-center">
            <Search className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-200 mb-2">No organizations found</h3>
            <p className="text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map(ngo => (
              <NGOCard key={ngo.id} record={ngo} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
