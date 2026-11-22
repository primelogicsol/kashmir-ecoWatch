'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  FileSpreadsheet,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  HeartHandshake,
  PawPrint,
  ChevronRight,
  X,
  FileText,
  Info,
  CheckCircle2,
  Lock
} from 'lucide-react';
import {
  INCIDENT_REGISTRY,
  HwcIncidentRecord,
  KewRegion,
  ConflictCategory,
  VerificationStatus
} from '@/data/human-wildlife-conflict';

export default function HwcIncidentRegistryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVerification, setSelectedVerification] = useState<string>('All');
  const [selectedIncident, setSelectedIncident] = useState<HwcIncidentRecord | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredIncidents = useMemo(() => {
    return INCIDENT_REGISTRY.filter((inc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inc.id.toLowerCase().includes(q) ||
        inc.generalLocation.toLowerCase().includes(q) ||
        inc.species.commonName.toLowerCase().includes(q) ||
        inc.species.scientificName.toLowerCase().includes(q) ||
        inc.category.toLowerCase().includes(q) ||
        inc.investigationSummary.toLowerCase().includes(q);

      const matchesRegion = selectedRegion === 'All' || inc.region === selectedRegion;
      const matchesSpecies = selectedSpecies === 'All' || inc.species.commonName === selectedSpecies;
      const matchesCategory = selectedCategory === 'All' || inc.category === selectedCategory;
      const matchesVerification =
        selectedVerification === 'All' || inc.verificationStatus.startsWith(selectedVerification);

      return matchesSearch && matchesRegion && matchesSpecies && matchesCategory && matchesVerification;
    });
  }, [searchQuery, selectedRegion, selectedSpecies, selectedCategory, selectedVerification]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Incident Registry' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                REGISTRY
              </span>
              <span>Human–Wildlife Conflict</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Verified Incident Database & Investigation Logs
            </span>
          </>
        }
        subtitle="Searchable repository of investigated human–wildlife encounters, livestock depredations, agricultural crop damages, and community response outcomes across five Himalayan regions."
        icon={<FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      {/* Sensitive Data Notice */}
      <div className="bg-slate-900/80 border-b border-white/5 py-2.5 text-xs text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Sensitive Ecological Information Standard:</strong> In compliance with IUCN SSC Guidelines, private victim identities and precise nest/den GPS coordinates are withheld. Public coordinates represent generalized ~10km grid centroids.
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Filter & Search Bar */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search incident ID, species, location, summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Regions (5)</option>
                <option value="Kashmir Valley">Kashmir Valley</option>
                <option value="Jammu">Jammu</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              </select>
            </div>

            {/* Species Filter */}
            <div>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Species</option>
                <option value="Asiatic Black Bear">Asiatic Black Bear</option>
                <option value="Common Leopard">Common Leopard</option>
                <option value="Snow Leopard">Snow Leopard</option>
                <option value="Himalayan Brown Bear">Himalayan Brown Bear</option>
                <option value="Himalayan Wolf">Himalayan Wolf</option>
                <option value="Rhesus Macaque">Rhesus Macaque</option>
              </select>
            </div>

            {/* Verification Status Filter */}
            <div>
              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Verification Levels</option>
                <option value="Verified">Verified (Official)</option>
                <option value="Corroborated">Corroborated</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
            <div>
              Showing <strong className="text-white">{filteredIncidents.length}</strong> of{' '}
              {INCIDENT_REGISTRY.length} documented incidents
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">View Mode:</span>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-semibold ${
                  viewMode === 'cards' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-semibold ${
                  viewMode === 'table' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Incidents Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents.map((inc) => (
              <Card
                key={inc.id}
                className="glass-intense border-white/10 p-5 rounded-lg flex flex-col justify-between hover:border-emerald-500/40 transition-all cursor-pointer group"
                onClick={() => setSelectedIncident(inc)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-300 transition-colors">
                      {inc.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 border border-white/10 text-slate-300">
                      {inc.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : inc.region}
                    </span>
                  </div>

                  <div>
                    <div className="mb-1">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-[3px] border ${
                        inc.recordType === 'Illustrative Reference Case (Simulation)'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {inc.recordType || 'Field-Verified Case'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {inc.species.commonName}
                    </h3>
                    <div className="text-xs text-slate-400 italic font-mono">{inc.species.scientificName}</div>
                    <div className="text-xs text-amber-400 font-semibold mt-1">
                      {inc.category}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{inc.generalLocation} ({inc.district})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span>{inc.occurrenceDate} · {inc.occurrenceTimeWindow}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {inc.investigationSummary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {inc.verificationStatus.split(' ')[0]}
                  </span>
                  <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Incidents Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto border border-white/10 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Incident ID</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Region / District</th>
                  <th className="p-3">Species</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Outcome</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-mono font-bold text-slate-300">{inc.id}</td>
                    <td className="p-3 text-slate-400 whitespace-nowrap">{inc.occurrenceDate}</td>
                    <td className="p-3 text-white font-medium">{inc.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : inc.region} · {inc.district}</td>
                    <td className="p-3 text-emerald-300 font-semibold">{inc.species.commonName}</td>
                    <td className="p-3 text-amber-300">{inc.category}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{inc.wildlifeOutcome}</td>
                    <td className="p-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                        {inc.verificationStatus.split(' ')[0]}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-emerald-400 hover:text-white font-semibold">View →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detailed Incident Drawer / Modal */}
        {selectedIncident && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    {selectedIncident.id} · {selectedIncident.region}
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    {selectedIncident.species.commonName} Interaction
                  </h2>
                  <div className="text-xs italic text-slate-400 font-mono">
                    {selectedIncident.species.scientificName} · IUCN: {selectedIncident.species.iucnStatus}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Occurrence Time:</span>
                  <span className="text-white font-medium">{selectedIncident.occurrenceDate} · {selectedIncident.occurrenceTimeWindow}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Generalized Location:</span>
                  <span className="text-white font-medium">{selectedIncident.generalLocation} ({selectedIncident.district})</span>
                </div>
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Conflict Category:</span>
                  <span className="text-amber-300 font-semibold">{selectedIncident.category}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Wildlife Outcome:</span>
                  <span className="text-emerald-300 font-medium">{selectedIncident.wildlifeOutcome}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Investigation Summary</h4>
                <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-[6px] border border-white/5 leading-relaxed">
                  {selectedIncident.investigationSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Evidence &amp; Provenance</h4>
                <div className="space-y-1.5 text-xs text-slate-300 bg-white/5 p-3 rounded-[6px]">
                  <div><strong className="text-slate-400">Record Type:</strong> <span className={selectedIncident.recordType === 'Illustrative Reference Case (Simulation)' ? 'text-amber-300 font-medium' : 'text-emerald-300 font-medium'}>{selectedIncident.recordType || 'Historical Reference Record'}</span></div>
                  <div><strong className="text-slate-400">Audit Methodology:</strong> {selectedIncident.auditVerificationMethodology || 'Departmental wildlife conflict register triangulation'}</div>
                  <div><strong className="text-slate-400">Classification:</strong> {selectedIncident.evidenceClassification}</div>
                  <div><strong className="text-slate-400">Verification Status:</strong> {selectedIncident.verificationStatus}</div>
                  <div><strong className="text-slate-400">Reporter Category:</strong> {selectedIncident.reporterCategory}</div>
                  <div><strong className="text-slate-400">Source:</strong> {selectedIncident.sourceProvenance}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Mitigation Follow-Up</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-emerald-300 bg-emerald-950/20 p-3 rounded-[6px] border border-emerald-500/20">
                  {selectedIncident.mitigationApplied.map((mit, i) => (
                    <li key={i}>{mit}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => setSelectedIncident(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-[6px]"
                >
                  Close Dossier
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
