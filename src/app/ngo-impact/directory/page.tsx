'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { ngoRegistryData, NGORecord } from '@/data/ngo-impact';
import { 
  Building, MapPin, ShieldCheck, Search, Users, ArrowRight, ChevronRight, Target
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NGOCard } from '@/components/common/NGOCard';

export default function NGODirectoryPage() {
  const router = useRouter();
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
      <Heading
        label="Civil Society Network · Organization Directory"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'NGO Impact', href: '/ngo-impact' },
          { label: 'Directory' }
        ]}
        icon={<Building className="w-6 h-6 text-emerald-400" />}
        title={<>
          <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
            <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
            <span>Western Himalayan</span>
          </span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Verified NGO Directory</span>
        </>}
        subtitle="Browse the complete database of civil society organizations, grassroots foundations, and volunteer groups actively protecting the region's environment."
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-500 font-bold text-white"
              icon={<Target className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/projects')}
            >
              Civil Society Projects
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<ShieldCheck className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/submit')}
            >
              Submit NGO Profile
            </Button>
          </div>
        }
        images={[
          '/images/ngo-module/community.jpg',
          '/images/ngo-module/field_work.jpg',
          '/images/ngo-module/lake_clean.jpg',
          '/images/protected-network.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
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
