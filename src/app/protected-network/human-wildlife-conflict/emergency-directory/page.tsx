'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  PhoneCall,
  Phone,
  ShieldAlert,
  Search,
  Filter,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle,
  X,
  FileCheck,
  Info,
  ChevronRight,
  Send
} from 'lucide-react';
import {
  KewRegion,
  ContactVerificationStatus,
  WildlifeServiceCategory,
  DistrictEntry,
  WildlifeEmergencyContact,
  OFFICIAL_DISTRICTS,
  EMERGENCY_DIRECTORY_ENTRIES,
  getContactsForDistrict,
  getEmergencyDirectoryStats
} from '@/data/hwc-emergency-directory';

export default function HwcEmergencyDirectoryPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Reporting modal state
  const [reportingContact, setReportingContact] = useState<WildlifeEmergencyContact | null>(null);
  const [reportNote, setReportNote] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  // Available districts based on chosen region
  const availableDistricts = useMemo(() => {
    if (selectedRegion === 'All') return OFFICIAL_DISTRICTS;
    return OFFICIAL_DISTRICTS.filter((d) => d.region === selectedRegion);
  }, [selectedRegion]);

  // Handle region change (resets district if incompatible)
  const handleRegionChange = (newRegion: string) => {
    setSelectedRegion(newRegion);
    setSelectedDistrict('All');
  };

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return EMERGENCY_DIRECTORY_ENTRIES.filter((contact) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        contact.officeName.toLowerCase().includes(q) ||
        contact.authorityDepartment.toLowerCase().includes(q) ||
        contact.district.toLowerCase().includes(q) ||
        contact.coveredDistricts.some((cd) => cd.toLowerCase().includes(q)) ||
        contact.primaryPhoneNumber.toLowerCase().includes(q) ||
        contact.operationalNotes.toLowerCase().includes(q);

      const matchesRegion = selectedRegion === 'All' || contact.region === selectedRegion;
      const matchesDistrict =
        selectedDistrict === 'All' ||
        contact.district === selectedDistrict ||
        contact.coveredDistricts.includes(selectedDistrict);
      const matchesCategory = selectedCategory === 'All' || contact.serviceCategory === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || contact.verificationStatus === selectedStatus;

      return matchesSearch && matchesRegion && matchesDistrict && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedRegion, selectedDistrict, selectedCategory, selectedStatus]);

  // Fallback check if a specific district was selected but has zero direct results in current filter
  const selectedDistrictMeta = useMemo(() => {
    if (selectedDistrict === 'All') return null;
    return OFFICIAL_DISTRICTS.find((d) => d.districtName === selectedDistrict) || null;
  }, [selectedDistrict]);

  const regionalFallbacks = useMemo(() => {
    if (!selectedDistrictMeta) return [];
    const directFound = filteredContacts.filter(
      (c) => c.district === selectedDistrictMeta.districtName || c.coveredDistricts.includes(selectedDistrictMeta.districtName)
    );
    if (directFound.length > 0) return [];
    return EMERGENCY_DIRECTORY_ENTRIES.filter(
      (c) => c.region === selectedDistrictMeta.region && c.fallbackRegionalContactId === undefined
    );
  }, [selectedDistrictMeta, filteredContacts]);

  const stats = useMemo(() => getEmergencyDirectoryStats(), []);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportingContact(null);
      setReportSubmitted(false);
      setReportNote('');
    }, 2000);
  };

  const getStatusBadge = (status: ContactVerificationStatus) => {
    switch (status) {
      case 'Officially Published':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> Officially Published
          </span>
        );
      case 'Recently Confirmed':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-teal-500/20 text-teal-300 border border-teal-500/40 inline-flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" /> Recently Confirmed
          </span>
        );
      case 'Verification Pending':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" /> Verification Pending
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-500/20 text-slate-300 border border-slate-500/40">
            {status}
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / COMMUNITY SAFETY & RESPONSE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Emergency Directory' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-rose-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                WILDLIFE EMERGENCY
              </span>
              <span>Response &amp; Rescue Contacts</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Five-Region District Referral Directory
            </span>
          </>
        }
        subtitle="Searchable directory of verified wildlife control rooms, divisional warden desks, rapid rescue centers, and fallback administrative lines across 42 Western Himalayan districts."
        icon={<PhoneCall className="w-6 h-6 text-rose-400" />}
      />

      <HwcSubNav />

      {/* Statutory Emergency Disclaimer */}
      <div className="bg-rose-950/40 border-b border-rose-500/20 py-3 text-xs text-rose-200">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              <strong className="text-white">Statutory Referral Protocol:</strong> Kashmir EcoWatch is an independent ecological research platform and <em>does not operate emergency rescue squads or field capture teams</em>. In active predator intrusions threatening human life, immediately contact the appropriate government control room or civil police below.
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Civil Research Directory
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400">Regional Coverage</div>
            <div className="text-2xl font-bold text-white mt-1">5 Regions</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">Kashmir, Jammu, Ladakh, AJK, GB</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400">Administrative Districts</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.totalDistricts} Districts</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Official current registry mapped</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400">Response Outposts Ingested</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.totalContactRecords} Offices</div>
            <div className="text-[11px] text-rose-300 mt-0.5">{stats.controlRooms} Control Rooms · {stats.rescueCentres} Rescue Centers</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400">Standard Telephony</div>
            <div className="text-2xl font-bold text-white mt-1">E.164 Dial</div>
            <div className="text-[11px] text-teal-300 mt-0.5">One-tap mobile integration</div>
          </div>
        </div>

        {/* Filter & Search Dashboard */}
        <div className="bg-slate-900/80 border border-white/10 p-5 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="md:col-span-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search office, phone, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Regions (5 Regions)</option>
                <option value="Kashmir Valley">Kashmir Valley (10 Districts)</option>
                <option value="Jammu">Jammu (10 Districts)</option>
                <option value="Ladakh">Ladakh (2 Districts)</option>
                <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir (10 Districts)</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan (10 Districts)</option>
              </select>
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Districts ({availableDistricts.length})</option>
                {availableDistricts.map((d) => (
                  <option key={d.districtName} value={d.districtName}>
                    {d.districtName} {d.hasDirectContact ? '✓' : '(Fallback)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Service Categories</option>
                <option value="Wildlife Emergency Control Room">Emergency Control Rooms</option>
                <option value="Wildlife Division / Warden Office">Divisional / Warden Offices</option>
                <option value="Wildlife Rescue Centre">Rescue &amp; Rapid Squads</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs text-slate-400">
            <div>
              Showing <strong className="text-white">{filteredContacts.length}</strong> response entries
              {selectedDistrict !== 'All' && (
                <span> for district <strong className="text-emerald-400">{selectedDistrict}</strong></span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Verification Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-2 py-1 bg-slate-950 border border-white/10 rounded-[4px] text-[11px] text-slate-300"
                >
                  <option value="All">All Statuses</option>
                  <option value="Officially Published">Officially Published</option>
                  <option value="Recently Confirmed">Recently Confirmed</option>
                  <option value="Verification Pending">Verification Pending</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-[6px] border border-white/10">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold ${
                    viewMode === 'cards'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold ${
                    viewMode === 'table'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected District Notice (If no direct number exists) */}
        {selectedDistrictMeta && !selectedDistrictMeta.hasDirectContact && (
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-lg flex items-start gap-3 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-amber-200">
                No Direct District Office Published for {selectedDistrictMeta.districtName}
              </div>
              <p className="text-slate-300 leading-relaxed">
                Emergency calls in {selectedDistrictMeta.districtName} are serviced by the <strong>{selectedDistrictMeta.divisionJurisdiction}</strong>. See the verified regional fallback contacts below. Never attempt to confront an apex predator alone.
              </p>
            </div>
          </div>
        )}

        {/* Regional Fallback Cards if filtered out */}
        {regionalFallbacks.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Recommended Regional Fallback Contacts for {selectedDistrict}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regionalFallbacks.map((fb) => (
                <Card key={fb.id} className="glass-intense border-amber-500/30 p-5 rounded-lg space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono text-amber-300 uppercase">Regional Fallback Authority</div>
                      <h3 className="text-base font-bold text-white mt-0.5">{fb.officeName}</h3>
                      <div className="text-xs text-slate-400">{fb.authorityDepartment}</div>
                    </div>
                    {getStatusBadge(fb.verificationStatus)}
                  </div>

                  <div className="bg-slate-950 p-3 rounded-[6px] border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Primary Contact:</span>
                      <a
                        href={`tel:${fb.e164PhoneNumber}`}
                        className="text-emerald-400 font-mono font-bold text-sm hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        {fb.formattedDisplayNumber}
                      </a>
                    </div>
                    {fb.tollFreeHelpline && (
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                        <span className="text-slate-400">Toll-Free Helpline:</span>
                        <a href={`tel:${fb.tollFreeHelpline.replace(/[^0-9]/g, '')}`} className="text-amber-300 font-mono">
                          {fb.tollFreeHelpline}
                        </a>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {fb.operationalNotes}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Directory Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="glass-intense border-white/10 p-5 rounded-lg flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        {String(contact.region).includes('Azad Jammu') ? 'AJ&K' : contact.region} · {contact.district}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5 leading-snug">
                        {contact.officeName}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {contact.authorityDepartment}
                      </div>
                    </div>
                  </div>

                  {/* Status & Service Category */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {getStatusBadge(contact.verificationStatus)}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300 border border-white/10">
                      {contact.serviceCategory}
                    </span>
                  </div>

                  {/* Dialing Action Panel */}
                  <div className="bg-slate-950 p-3.5 rounded-[6px] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Primary Phone:</span>
                      <a
                        href={`tel:${contact.e164PhoneNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 border border-emerald-500/40 text-xs font-mono font-bold transition-all shadow-sm"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{contact.formattedDisplayNumber}</span>
                      </a>
                    </div>

                    {contact.alternatePhone && (
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
                        <span>Alternate:</span>
                        <a
                          href={`tel:${contact.alternatePhone.replace(/[^0-9+]/g, '')}`}
                          className="font-mono text-slate-300 hover:text-white"
                        >
                          {contact.alternatePhone}
                        </a>
                      </div>
                    )}

                    {contact.tollFreeHelpline && (
                      <div className="flex items-center justify-between text-xs text-amber-300 pt-1 border-t border-white/5">
                        <span>Toll-Free Helpline:</span>
                        <a
                          href={`tel:${contact.tollFreeHelpline.replace(/[^0-9]/g, '')}`}
                          className="font-mono font-bold hover:underline"
                        >
                          {contact.tollFreeHelpline}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Location & Operating Hours */}
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{contact.physicalLocation}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-[11px] leading-snug">{contact.operatingHours}</span>
                    </div>
                  </div>

                  {/* Operational Notes */}
                  <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-[6px] leading-relaxed">
                    {contact.operationalNotes}
                  </p>

                  {/* Coverage Scope */}
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500 block mb-0.5 font-mono">Jurisdiction Coverage:</span>
                    <span>{contact.coveredDistricts.join(', ')}</span>
                  </div>
                </div>

                {/* Footer with Source & Verification Date */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2 text-[10px]">
                  <div className="flex items-center justify-between text-slate-500 font-mono">
                    <span>Verified: {contact.lastDirectVerificationDate}</span>
                    <span>Source: {contact.sourcePublicationDate}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                    <a
                      href={contact.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-emerald-300 inline-flex items-center gap-1 truncate"
                      title={contact.sourceDocumentTitle}
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      <span className="truncate">{contact.sourceDocumentTitle}</span>
                    </a>

                    <button
                      onClick={() => setReportingContact(contact)}
                      className="text-slate-400 hover:text-amber-300 shrink-0 font-medium hover:underline"
                    >
                      Report Error
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Directory Table View (Desktop) */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto border border-white/10 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Region &amp; District</th>
                  <th className="p-3">Office Name / Dept</th>
                  <th className="p-3">Service Category</th>
                  <th className="p-3">Verified Contact Number</th>
                  <th className="p-3">Operating Hours</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-medium text-slate-300">
                      <div>{String(contact.region).includes('Azad Jammu') ? 'AJ&K' : contact.region}</div>
                      <div className="text-[10px] text-slate-500">{contact.district}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white font-bold">{contact.officeName}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{contact.authorityDepartment}</div>
                    </td>
                    <td className="p-3 text-slate-400">{contact.serviceCategory}</td>
                    <td className="p-3">
                      <a
                        href={`tel:${contact.e164PhoneNumber}`}
                        className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3 text-emerald-400" />
                        {contact.formattedDisplayNumber}
                      </a>
                      {contact.tollFreeHelpline && (
                        <div className="text-[10px] text-amber-300 font-mono mt-0.5">
                          Toll-Free: {contact.tollFreeHelpline}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-slate-300 text-[11px] max-w-[200px] truncate">
                      {contact.operatingHours}
                    </td>
                    <td className="p-3">{getStatusBadge(contact.verificationStatus)}</td>
                    <td className="p-3 text-right">
                      <a
                        href={contact.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Official</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Administration & Quality Control Protocol */}
        <section className="bg-slate-900/60 border border-white/10 p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Directory Quality Control &amp; Verification Protocol
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-400">
              Audit Standard ISO-22301
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-[6px] border border-white/5 space-y-1.5">
              <div className="font-bold text-white">1. Grounded Public Records</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Every telephone number is linked to a published government order, official district portal (.gov.pk / .nic.in), or institutional registry. Personal private numbers are strictly barred.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-[6px] border border-white/5 space-y-1.5">
              <div className="font-bold text-white">2. No Unsubstantiated "24/7" Claims</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Operating schedules accurately differentiate between standard office hours, evening shifts, and rapid response units. Numbers are never labeled 24/7 without verified around-the-clock staffing.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-[6px] border border-white/5 space-y-1.5">
              <div className="font-bold text-white">3. Complete District Fallback System</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                All 42 Western Himalayan districts are mapped. For districts pending direct single outposts, users are automatically directed to verified divisional control rooms.
              </p>
            </div>
          </div>
        </section>

        {/* Report Incorrect Number Modal */}
        {reportingContact && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/20 rounded-lg max-w-md w-full p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    CORRECTION SUBMISSION
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Report Contact Discrepancy
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {reportingContact.officeName} ({reportingContact.district})
                  </div>
                </div>
                <button
                  onClick={() => setReportingContact(null)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reportSubmitted ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-[6px] text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Report Received for Audit</div>
                  <p className="text-xs text-slate-300">
                    Thank you. Our regional directory administrator will verify the updated contact information against official records.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Current Logged Number:</label>
                    <input
                      type="text"
                      readOnly
                      value={reportingContact.primaryPhoneNumber}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-slate-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">
                      Correction Details or Updated Contact Number: <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Number out of service; new verified control room is 019X-XXXXXX per district order dated..."
                      value={reportNote}
                      onChange={(e) => setReportNote(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReportingContact(null)}
                      className="px-3 py-1.5 rounded-[6px] text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Correction</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
