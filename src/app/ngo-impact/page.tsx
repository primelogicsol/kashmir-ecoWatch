'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ngoRegistryData, NGORecord, NGOProject } from '@/data/ngo-impact';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { 
  Users, Target, MapPin, Building, ShieldCheck, Globe, Activity, Shield,
  Search, Leaf, Droplet, Wind, Recycle, Book, Heart, FileText, CheckCircle, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NGOCard } from '@/components/common/NGOCard';
import { ProjectCard } from '@/components/common/ProjectCard';






export default function NGOImpactLandingPage() {
  const { filter } = useGlobalFilter();
  const router = useRouter();

  // Local Filters
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [selectedFocus, setSelectedFocus] = useState('all');
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('all');

  // KPI Calculations
  const verifiedCount = ngoRegistryData.filter(d => d.verification_status.includes('reviewed') || d.verification_status.includes('verified')).length;
  const allProjects = ngoRegistryData.flatMap(n => n.projects);
  const activeProjects = allProjects.filter(p => p.end_date === 'Ongoing').length;
  const completedProjects = allProjects.filter(p => p.end_date !== 'Ongoing').length;
  
  const allDistricts = new Set<string>();
  ngoRegistryData.forEach(ngo => ngo.operating_districts.forEach(d => allDistricts.add(d)));
  
  const allFocusAreas = new Set<string>();
  ngoRegistryData.forEach(ngo => ngo.focus_areas.forEach(f => allFocusAreas.add(f)));

  // Mock values for UI requirements
  const volunteersEngaged = 4500;
  const peopleBenefited = 120000;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── 2. 8 KPI CARDS ──────────────────────────────────────────────────────────
  const metrics = [
    { label: 'Registered NGOs',      value: ngoRegistryData.length, icon: 'Building2' },
    { label: 'Verified NGOs',        value: verifiedCount,          icon: 'ShieldCheck', color: 'text-emerald-400' },
    { label: 'Active Projects',      value: activeProjects,         icon: 'Target',      color: 'text-sky-400' },
    { label: 'Completed Projects',   value: completedProjects,      icon: 'CheckCircle' },
    { label: 'Districts Covered',    value: allDistricts.size,      icon: 'MapPin',      color: 'text-amber-400' },
    { label: 'Environmental Themes', value: allFocusAreas.size,     icon: 'Leaf' },
    { label: 'Volunteers Engaged',   value: volunteersEngaged,      icon: 'Users',       color: 'text-purple-400' },
    { label: 'People Benefited',     value: '120k+',                icon: 'Heart',       color: 'text-pink-400' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-20">
      
      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────────── */}
      <Heading
        label="Civil Society Network"
        icon={<Users className="w-6 h-6 text-emerald-400" />}
        title={
          <>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span className="text-slate-400">Kashmir</span>
            </span>
            <span className="block leading-[1.12] pb-2 overflow-visible whitespace-nowrap bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              NGO Impact Registry
            </span>
          </>
        }
        subtitle="A centralized registry uniting grassroots organizations, civil society groups, and volunteers dedicated to protecting the ecology of Jammu & Kashmir."
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button onClick={() => scrollToSection('ngos')} size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 text-white" icon={<Search className="w-5 h-5" />}>Explore NGOs</Button>
            <Button onClick={() => scrollToSection('projects')} size="lg" variant="outline" className="border-white/20 text-white" icon={<Target className="w-5 h-5" />}>View Projects</Button>
            <Button onClick={() => router.push('/ngo-impact/submit')} size="lg" variant="outline" className="border-white/20 text-white" icon={<Shield className="w-5 h-5" />}>Submit NGO</Button>
          </div>
        }
        images={['/images/ngo-module/community.jpg', '/images/ngo-module/field_work.jpg', '/images/ngo-module/lake_clean.jpg']}
        overlayClassName="bg-gradient-to-b from-slate-950/85 via-slate-900/65 to-slate-950/85"
      />

      {/* ─── 2. 8 KPI CARDS (ModuleKpiStrip) ────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} />

      <div className="container mx-auto px-6 max-w-[1600px] flex flex-col gap-16 mt-8">
        
        {/* ─── 3. SEARCH & FILTERS ────────────────────────────────────────────────── */}
        <section id="ngos" className="relative z-40">
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
                  value={selectedProjectStatus}
                  onChange={setSelectedProjectStatus}
                  placeholder="Project Status"
                  options={[{value: 'Active', label: 'Active Projects'}, {value: 'Completed', label: 'Completed Projects'}]}
                />
              </>
            }
          />
        </section>

        
        {/* ── NGO Focus Typologies & Citizen Field Protocols ───────────────── */}
        <div>
          <EnvironmentalObserveSpotlight
            typologyTitle="Civil Society Focus Typologies & Conservation Guilds"
            typologySubtitle="Select a grassroots intervention theme, verified NGO status, or volunteer program across Kashmir's civil society network."
            typologyIcon={Users}
            typologies={[
              { id: 'all', label: 'All Organizations', count: ngoRegistryData.length, icon: Users, color: 'emerald' },
              { id: 'verified', label: 'Verified & Audited NGOs', count: ngoRegistryData.filter(d => d.verification_status.includes('verified') || d.verification_status.includes('reviewed')).length, icon: ShieldCheck, color: 'teal' },
              { id: 'lakes', label: 'Lake & Wetland Conservation', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('water') || f.toLowerCase().includes('lake') || f.toLowerCase().includes('wetland'))).length, icon: Droplet, color: 'cyan' },
              { id: 'waste', label: 'Solid Waste & Cleanups', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('waste') || f.toLowerCase().includes('pollution'))).length, icon: Recycle, color: 'amber' },
              { id: 'forest', label: 'Forests & Reforestation', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('forest') || f.toLowerCase().includes('biodiversity') || f.toLowerCase().includes('tree'))).length, icon: Leaf, color: 'emerald' },
              { id: 'climate', label: 'Climate Education & Advocacy', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('climate') || f.toLowerCase().includes('education') || f.toLowerCase().includes('youth'))).length, icon: Book, color: 'violet' },
            ]}
            activeTypology={selectedFocus === 'all' ? 'all' : selectedFocus.toLowerCase().includes('water') ? 'lakes' : selectedFocus.toLowerCase().includes('waste') ? 'waste' : selectedFocus.toLowerCase().includes('forest') ? 'forest' : 'all'}
            onSelectTypology={(id) => {
              if (id === 'all') setSelectedFocus('all');
              else if (id === 'lakes') setSelectedFocus('Water Conservation');
              else if (id === 'waste') setSelectedFocus('Solid Waste');
              else if (id === 'forest') setSelectedFocus('Forest Conservation');
            }}
            showingCount={ngoRegistryData.length}
            totalCount={ngoRegistryData.length}
            entityLabel="registered NGOs"
            spotlightTitle="Grassroots Environmental Impact & Volunteer Mobilization"
            spotlightSubtitle="Documenting certified environmental NGOs, lake restoration volunteer brigades, community afforestation, and public action."
            tabs={[
              {
                id: 'lake-cleanups',
                label: 'Community Lake Cleanups & De-Weeding Drives',
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                      <span className="text-xs font-bold text-cyan-400 block mb-1">Grassroots Water Action</span>
                      <h5 className="text-sm font-semibold text-white mb-2">Dal Lake &amp; Anchar Youth Volunteer Coalitions</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Student environmental clubs and shikarawallas conduct weekend plastic retrieval drives, extracting 12+ tons of floating polyethylene and PET bottles from interior lake channels.
                      </p>
                      <div className="text-[11px] text-cyan-300 font-mono">Volunteer Metric: 2,400+ citizen hours logged</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                      <span className="text-xs font-bold text-emerald-400 block mb-1">Reforestation Drives</span>
                      <h5 className="text-sm font-semibold text-white mb-2">Community Springshed &amp; Native Afforestation</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Plantation of indigenous deodar, walnut, and willow saplings in degraded sub-catchments to restore vanishing village drinking springs and mitigate mudslides.
                      </p>
                      <div className="text-[11px] text-emerald-300 font-mono">Saplings Planted: 85,000+ with 88% survival rate</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                      <span className="text-xs font-bold text-violet-400 block mb-1">Alpine Mountain Ethics</span>
                      <h5 className="text-sm font-semibold text-white mb-2">High-Altitude Leave-No-Trace Campaigns</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Trekking associations partner to evacuate plastic litter and metal cans from high alpine meadows (Kashmir Great Lakes trail, Tarsar-Marsar, Kolahoi basecamp).
                      </p>
                      <div className="text-[11px] text-violet-300 font-mono">High-Altitude Waste Evacuated: 6.8 MT safely disposed</div>
                    </div>
                  </div>
                ),
              },
              {
                id: 'verification-audit',
                label: 'NGO Governance & Field Verification Standards',
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                      <h5 className="text-sm font-semibold text-white mb-2">Transparent Field Audit Protocol</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Every partner organization featured in the KEW directory undergoes rigorous field verification: verifying 12A/80G status, auditing geotagged project impact reports, and confirming local community beneficiary feedback.
                      </p>
                      <div className="text-[11px] text-teal-300 font-mono">Governance: 100% verified grassroots impact documentation</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                      <h5 className="text-sm font-semibold text-white mb-2">Student &amp; Youth Eco-Clubs</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Over 140 school and college environmental clubs across Kashmir receive educational toolkits, field water-testing vials, and training on citizen biodiversity documenting.
                      </p>
                      <div className="text-[11px] text-amber-300 font-mono">Youth Network: Active in all 10 Kashmir valley districts</div>
                    </div>
                  </div>
                ),
              },
            ]}
            observeCategory="community"
            observeTitle="Citizen Volunteer Action &amp; Community Project Verification"
            observeSubtitle="Submit reports on completed cleanup drives, audit sapling survival rates, or nominate grassroots conservation leaders."
            observeBadge="Civil Society Impact Active"
            protocols={[
              {
                number: '1',
                title: 'Volunteer Cleanup Brand & Weight Audit',
                desc: 'Weigh collected trash by plastic type (PET, multi-layer packaging) and tally corporate producer brands for accountability.',
                benchmark: 'Break Free From Plastic Global Brand Audit Protocol',
                icon: Recycle,
                color: 'amber',
              },
              {
                number: '2',
                title: 'Community Tree Sapling Survival Check',
                desc: 'Inspect community plantation sites at 6-month and 12-month intervals to record sapling height, browsing damage, and survival %.',
                benchmark: 'MoEFCC National Afforestation & Eco-Development Board',
                icon: Leaf,
                color: 'emerald',
              },
              {
                number: '3',
                title: 'Local Waterbody Guardian Observation',
                desc: 'Adopt a local pond, spring, or canal section; perform monthly water clarity checks and report illegal dumping encroachment.',
                benchmark: 'WASH Community Scorecard Protocol',
                icon: Droplet,
                color: 'cyan',
              },
              {
                number: '4',
                title: 'Wildlife Rescue & Injured Fauna Alert',
                desc: 'Report distressed migratory waterfowl, injured Hangul, or human-wildlife encounters to rapid NGO response units.',
                benchmark: 'Wildlife Protection Act 1972 Rescue Standard',
                icon: Heart,
                color: 'rose',
              },
            ]}
          />
        </div>


        {/* ─── 4. FEATURED NGOs ─────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Building className="w-6 h-6 text-emerald-400"/> Featured Organizations</h2>
            <Button variant="ghost" className="text-emerald-400 hover:bg-emerald-400/10" onClick={() => router.push('/ngo-impact/directory')}>View All NGOs <ArrowRight className="w-4 h-4 ml-2"/></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ngoRegistryData.slice(0, 4).map(ngo => (
              <NGOCard key={ngo.id} record={ngo} />
            ))}
          </div>
        </section>

        {/* ─── 5. FEATURED PROJECTS ─────────────────────────────────────────────── */}
        <section id="projects">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Target className="w-6 h-6 text-sky-400"/> High-Impact Projects</h2>
            <Button variant="ghost" className="text-sky-400 hover:bg-sky-400/10" onClick={() => router.push('/ngo-impact/projects')}>View All Projects <ArrowRight className="w-4 h-4 ml-2"/></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.slice(0, 3).map(proj => (
              <ProjectCard key={proj.id} project={proj} ngoName={ngoRegistryData.find(n => n.projects.some(p => p.id === proj.id))?.name || 'Unknown'} />
            ))}
          </div>
        </section>

        {/* ─── 6. ENVIRONMENTAL FOCUS AREAS ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Explore by Focus Area</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: 'Wetlands', icon: Droplet, color: 'text-cyan-400' },
              { label: 'Forests', icon: Leaf, color: 'text-emerald-400' },
              { label: 'Wildlife', icon: Heart, color: 'text-amber-400' },
              { label: 'Water', icon: Activity, color: 'text-blue-400' },
              { label: 'Waste', icon: Recycle, color: 'text-orange-400' },
              { label: 'Climate', icon: Wind, color: 'text-purple-400' },
              { label: 'Biodiversity', icon: Globe, color: 'text-green-400' },
              { label: 'Education', icon: Book, color: 'text-pink-400' },
            ].map((theme, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-800 cursor-pointer transition-colors group">
                <theme.icon className={`w-8 h-8 mb-3 ${theme.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-semibold text-slate-300">{theme.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 7. RECENT NGO ACTIVITIES & 8. IMPACT DASHBOARD ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <section className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Field Activities</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
              <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-800"></div>
              <div className="space-y-6 relative">
                {[
                  { action: 'Cleanup Drive', location: 'Dal Lake', time: '2 days ago', color: 'bg-cyan-500' },
                  { action: 'Plantation Work', location: 'Shopian', time: '1 week ago', color: 'bg-emerald-500' },
                  { action: 'Wildlife Rescue', location: 'Dachigam', time: '2 weeks ago', color: 'bg-amber-500' },
                  { action: 'Field Survey', location: 'Wular Lake', time: '1 month ago', color: 'bg-blue-500' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-4 h-4 rounded-full mt-1 border-4 border-slate-900 ${item.color} relative z-10`} />
                    <div>
                      <h4 className="text-slate-200 font-bold">{item.action}</h4>
                      <p className="text-sm text-slate-400">{item.location} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Aggregated Impact Dashboard</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { val: '1,250', label: 'Tons of Waste Removed', icon: Recycle, color: 'text-orange-400' },
                { val: '45,000', label: 'Trees Planted', icon: Leaf, color: 'text-emerald-400' },
                { val: '14', label: 'Water Bodies Restored', icon: Droplet, color: 'text-cyan-400' },
                { val: '120', label: 'Schools Reached', icon: Book, color: 'text-pink-400' },
                { val: '38', label: 'Reports Published', icon: FileText, color: 'text-slate-300' },
                { val: '4,500', label: 'Volunteers Mobilized', icon: Users, color: 'text-purple-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                  <stat.icon className={`w-8 h-8 mb-3 ${stat.color} opacity-80`} />
                  <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ─── 9. REPORTS & EVIDENCE ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2"><FileText className="w-6 h-6 text-slate-300"/> Reports & Evidence</h2>
            <Button variant="ghost" className="text-slate-300 hover:bg-slate-800" onClick={() => router.push('/ngo-impact/archives')}>Browse Archives <ArrowRight className="w-4 h-4 ml-2"/></Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Annual Conservation Report 2025', type: 'Annual Report' },
              { title: 'Dal Lake Cleanup Verification', type: 'Verification Note' },
              { title: 'Bear Rescue Field Evidence', type: 'Field Photos' },
              { title: 'Spring Restoration Impact', type: 'Project Report' },
            ].map((rep, i) => (
              <Card key={i} className="p-4 bg-slate-900 border-slate-800 hover:border-slate-700 cursor-pointer group">
                <FileText className="w-8 h-8 text-slate-600 mb-3 group-hover:text-emerald-400 transition-colors" />
                <Badge variant="secondary" className="mb-2 text-[10px]">{rep.type}</Badge>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white">{rep.title}</h4>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── 10. CALL TO ACTION ───────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to make a verified impact?</h2>
          <p className="text-emerald-100/80 max-w-2xl mx-auto mb-8 text-lg">
            Join the Kashmir Eco Watch network. Whether you are an established NGO looking for accreditation, or a volunteer ready to deploy, the ecosystem needs you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => router.push('/ngo-impact/submit')} size="lg" className="bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400">Register Your NGO</Button>
            <Button onClick={() => router.push('/ngo-impact/submit')} size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">Submit Project</Button>
            <Button onClick={() => router.push('/get-involved/volunteer')} size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">Become a Partner</Button>
            <Button onClick={() => router.push('/get-involved/volunteer')} size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">Volunteer</Button>
          </div>
        </section>

      </div>
    </main>
  );
}
