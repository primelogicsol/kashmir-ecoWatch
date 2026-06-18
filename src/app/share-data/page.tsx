'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  MapPin, ArrowRight, CheckCircle, 
  Leaf, Shield, Database, Upload, Droplets, Flame, Cloud, Activity, Beaker, Globe, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';

const dataDomains = [
  { id: 'biodiversity', label: 'Biodiversity & Species', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'water', label: 'Water Resources', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'hazards', label: 'Hazard Intelligence', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 'earth-systems', label: 'Earth Systems', icon: Cloud, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { id: 'environmental-monitoring', label: 'Environmental Monitoring', icon: Activity, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { id: 'protected-areas', label: 'Protected Network', icon: Shield, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
];

const subCategories: Record<string, { id: string, label: string }[]> = {
  biodiversity: [
    { id: 'mammal', label: 'Mammal Sighting' },
    { id: 'bird', label: 'Bird Sighting' },
    { id: 'plant', label: 'Plant/Flora Record' },
    { id: 'invasive', label: 'Invasive Species' }
  ],
  water: [
    { id: 'quality', label: 'Water Quality Reading' },
    { id: 'flow', label: 'Stream Flow Change' },
    { id: 'lake-level', label: 'Lake Level Observation' },
    { id: 'algal-bloom', label: 'Algal Bloom Sighting' }
  ],
  hazards: [
    { id: 'flash-flood', label: 'Flash Flood' },
    { id: 'landslide', label: 'Landslide/Avalanche' },
    { id: 'forest-fire', label: 'Forest Fire' },
    { id: 'pollution', label: 'Pollution/Spill' }
  ],
  'earth-systems': [
    { id: 'snowpack', label: 'Snowpack Level' },
    { id: 'phenology', label: 'Seasonal Phenology (Budburst/Fall)' },
    { id: 'soil', label: 'Soil Moisture/Erosion' }
  ],
  'environmental-monitoring': [
    { id: 'air-quality', label: 'Air Quality Observation' },
    { id: 'noise-pollution', label: 'Noise Pollution Log' },
    { id: 'waste-dumping', label: 'Illegal Waste Dumping' },
    { id: 'deforestation', label: 'Deforestation/Logging' }
  ],
  'protected-areas': [
    { id: 'habitat-change', label: 'Habitat Change' },
    { id: 'violation', label: 'Potential Violation' },
    { id: 'infrastructure', label: 'Infrastructure Status' }
  ]
};

const precisionLevels = [
  { id: 'exact', label: 'Exact (GPS)' },
  { id: 'approximate', label: 'Approximate (< 1km)' },
  { id: 'general', label: 'General Region' }
];

const domainMethodologies: Record<string, { id: string, label: string }[]> = {
  biodiversity: [
    { id: 'visual-transect', label: 'Visual Transect / Point Count' },
    { id: 'camera-trap', label: 'Camera Trap' },
    { id: 'acoustic', label: 'Acoustic Monitoring' },
    { id: 'track-sign', label: 'Track & Sign Analysis' },
    { id: 'specimen', label: 'Specimen Collection' },
    { id: 'casual', label: 'Casual Observation' }
  ],
  water: [
    { id: 'grab-sample', label: 'Grab Sample' },
    { id: 'in-situ-sensor', label: 'In-Situ Sensor Reading' },
    { id: 'flow-meter', label: 'Flow Meter Reading' },
    { id: 'visual-estimate', label: 'Visual Estimate' }
  ],
  hazards: [
    { id: 'field-survey', label: 'Field Survey / Visual' },
    { id: 'drone-aerial', label: 'Drone / Aerial Assessment' },
    { id: 'satellite', label: 'Satellite Inference' },
    { id: 'community-report', label: 'Community Report' }
  ],
  'earth-systems': [
    { id: 'manual-measurement', label: 'Manual Measurement (Probe/Ruler)' },
    { id: 'automated-weather-station', label: 'Automated Weather Station' },
    { id: 'soil-sensor', label: 'Soil Sensor Node' },
    { id: 'visual-phenology', label: 'Visual Phenology Observation' }
  ],
  'environmental-monitoring': [
    { id: 'air-quality-sensor', label: 'Air Quality Sensor' },
    { id: 'decibel-meter', label: 'Decibel/Sound Meter' },
    { id: 'visual-audit', label: 'Visual Audit / Inspection' }
  ],
  'protected-areas': [
    { id: 'patrol-log', label: 'Ranger Patrol Log' },
    { id: 'citizen-report', label: 'Citizen Report' },
    { id: 'drone-surveillance', label: 'Drone Surveillance' },
    { id: 'remote-sensing', label: 'Remote Sensing' }
  ]
};

const domainEquipmentPlaceholders: Record<string, string> = {
  biodiversity: 'e.g., DSLR Camera, Bushnell Trap, Binoculars, Naked Eye',
  water: 'e.g., YSI ProDSS, Secchi Disk, Flow Probe',
  hazards: 'e.g., DJI Drone, Handheld GPS, Naked Eye',
  'earth-systems': 'e.g., Snow Probe, Soil Moisture Meter, AWS',
  'environmental-monitoring': 'e.g., PurpleAir Sensor, Sound Level Meter',
  'protected-areas': 'e.g., Patrol GPS, Body Cam, Drone'
};

const scientificSteps = [
  { num: 1, label: 'Protocol' },
  { num: 2, label: 'Spatiotemporal' },
  { num: 3, label: 'Metrics' },
  { num: 4, label: 'Evidence & Attribution' }
];

export default function ShareDataPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  
  // 1. Protocol
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  
  // 2. Spatiotemporal
  const [observationDate, setObservationDate] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [locationPrecision, setLocationPrecision] = useState('exact');
  const [habitatType, setHabitatType] = useState('');
  
  // 3. Common Methodology 
  const [observationMethod, setObservationMethod] = useState('');
  const [equipmentUsed, setEquipmentUsed] = useState('');
  const [description, setDescription] = useState('');
  const [weatherConditions, setWeatherConditions] = useState('');

  // 3. Content-Aware Scientific Metrics (Domain Specific)
  // Biodiversity
  const [bioCount, setBioCount] = useState('');
  const [bioLifeStage, setBioLifeStage] = useState('');
  const [bioBehavior, setBioBehavior] = useState('');
  // Water
  const [waterParameter, setWaterParameter] = useState('');
  const [waterValue, setWaterValue] = useState('');
  const [waterUnit, setWaterUnit] = useState('');
  // Hazards
  const [hazardSeverity, setHazardSeverity] = useState('');
  const [hazardImpactArea, setHazardImpactArea] = useState('');
  // Earth Systems
  const [earthTrend, setEarthTrend] = useState('');
  const [earthMeasurement, setEarthMeasurement] = useState('');
  
  // 4. Evidence & Attribution
  const [photos, setPhotos] = useState<File[]>([]);
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [agreeToDarwinCore, setAgreeToDarwinCore] = useState(false);
  
  // Submission
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoordinates(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
        (error) => console.log('Geolocation failed:', error)
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const generateSubmissionId = () => {
    const d = new Date();
    const prefix = selectedDomain ? selectedDomain.substring(0, 3).toUpperCase() : 'DAT';
    return `KEW-${prefix}-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${Math.floor(Math.random()*9000+1000)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmissionId(generateSubmissionId());
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <section className="relative pt-20 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
                <h1 className="max-w-xl text-4xl font-bold text-white mb-4">Scientific Record Initialized</h1>
                <p className="text-slate-400 text-lg">
                  Your environmental intelligence record has been successfully integrated into the Kashmir EcoWatch platform.
                </p>
              </div>

              <Card className="glass-intense border-white/10 p-6 mb-6">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Record UUID</div>
                  <div className="text-3xl font-mono font-bold text-white mb-4">{submissionId}</div>
                  <p className="text-sm text-slate-400">
                    This data will be routed to the appropriate verification pipeline. It aligns with our Open Data parameters.
                  </p>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  Submit Another Record
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'} className="border-white/10 text-white hover:bg-white/5">
                  Return Home
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Share Data</span>
        </>}
        subtitle="Submit structured, content-aware scientific intelligence to the unified environmental network."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            
            {/* Scientific Progress Bar */}
            <div className="mb-12 relative">
              <div className="absolute left-0 top-5 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full z-0 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
              </div>
              <div className="flex justify-between relative z-10">
                {scientificSteps.map(step => (
                  <div key={step.num} className="flex flex-col items-center gap-3 w-24">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                        ${step.num <= currentStep ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-900 text-slate-500 border-2 border-slate-800'}`}
                    >
                      {step.num}
                    </div>
                    <div className={`text-[10px] sm:text-xs text-center font-semibold uppercase tracking-wider ${step.num <= currentStep ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                
                <AnimatePresence mode="wait">
                  {/* STEP 1: PROTOCOL */}
                  {currentStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">Domain & Protocol</h2>
                      </div>
                      <p className="text-sm text-slate-400 mb-8">Select the primary scientific domain and specific classification for this data record.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {dataDomains.map(domain => (
                          <button
                            key={domain.id}
                            type="button"
                            onClick={() => {
                              setSelectedDomain(domain.id);
                              setSelectedSubCategory('');
                            }}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left
                              ${selectedDomain === domain.id 
                                ? `${domain.bg} ${domain.border} ring-1 ring-${domain.color.split('-')[1]}-500` 
                                : 'bg-slate-900/50 border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                          >
                            <div className={`mt-1 w-10 h-10 shrink-0 rounded-lg bg-slate-950/50 flex items-center justify-center border border-white/5`}>
                              <domain.icon className={`w-5 h-5 ${domain.color}`} />
                            </div>
                            <div>
                              <div className="font-bold text-white mb-1">{domain.label}</div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {selectedDomain && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Observation Protocol</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {subCategories[selectedDomain].map(sub => (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => setSelectedSubCategory(sub.id)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left
                                  ${selectedSubCategory === sub.id 
                                    ? 'bg-emerald-500/20 border-emerald-500/50 text-white' 
                                    : 'bg-slate-900/50 border-white/5 text-slate-300 hover:border-white/20'}`}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end pt-6 border-t border-white/10">
                        <Button type="button" disabled={!selectedDomain || !selectedSubCategory} onClick={() => setCurrentStep(2)} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                          Continue to Spatiotemporal <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: SPATIOTEMPORAL */}
                  {currentStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">Spatiotemporal Context</h2>
                      </div>
                      <p className="text-sm text-slate-400 mb-8">Establish the precise geographic and temporal parameters of this record.</p>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Date & Time <span className="text-red-400">*</span></label>
                            <input 
                              type="datetime-local" required value={observationDate} onChange={(e) => setObservationDate(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Spatial Precision</label>
                            <select 
                              value={locationPrecision} onChange={(e) => setLocationPrecision(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                            >
                              {precisionLevels.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider flex justify-between items-center">
                            <span>WGS84 Coordinates / Location <span className="text-red-400">*</span></span>
                            <button type="button" onClick={getLocation} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 normal-case tracking-normal">
                              <MapPin className="w-3 h-3" /> Auto-Locate
                            </button>
                          </label>
                          <input 
                            type="text" required placeholder="e.g. 34.083700, 74.797300" value={coordinates} onChange={(e) => setCoordinates(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Habitat / Site Context</label>
                          <input 
                            type="text" placeholder="e.g. Alpine Meadow, Riparian Zone, Urban Periphery" value={habitatType} onChange={(e) => setHabitatType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
                        <Button type="button" variant="ghost" onClick={() => setCurrentStep(1)} className="text-slate-400 hover:text-white">Back</Button>
                        <Button type="button" disabled={!observationDate || !coordinates} onClick={() => setCurrentStep(3)} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                          Continue to Methodology <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CONTENT AWARE METHODOLOGY & METRICS */}
                  {currentStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <Beaker className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">Content-Aware Metrics</h2>
                      </div>
                      <p className="text-sm text-slate-400 mb-8">
                        Provide specific measurements related to <strong>{dataDomains.find(d => d.id === selectedDomain)?.label}</strong>.
                      </p>

                      <div className="space-y-8">
                        
                        {/* DYNAMIC METRIC INJECTION */}
                        {selectedDomain === 'biodiversity' && (
                          <div className="bg-emerald-950/20 p-5 rounded-xl border border-emerald-500/20 space-y-4">
                            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2"><Leaf className="w-4 h-4" /> Taxonomic & Population Data</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Population Count / Estimate</label>
                                <input type="number" placeholder="e.g. 1, 5, ~20" value={bioCount} onChange={(e) => setBioCount(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 focus:border-emerald-500 outline-none text-white text-sm" />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Life Stage / Sex</label>
                                <select value={bioLifeStage} onChange={(e) => setBioLifeStage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 focus:border-emerald-500 outline-none text-white text-sm">
                                  <option value="">Select...</option><option value="adult-male">Adult Male</option><option value="adult-female">Adult Female</option><option value="juvenile">Juvenile/Cub/Fledgling</option><option value="unknown">Unknown</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-400 mb-1 block">Observed Behavior</label>
                              <input type="text" placeholder="e.g. Foraging, Resting, Mating Call" value={bioBehavior} onChange={(e) => setBioBehavior(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 focus:border-emerald-500 outline-none text-white text-sm" />
                            </div>
                          </div>
                        )}

                        {selectedDomain === 'water' && (
                          <div className="bg-blue-950/20 p-5 rounded-xl border border-blue-500/20 space-y-4">
                            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2"><Droplets className="w-4 h-4" /> Hydrological Parameters</h3>
                            <div>
                              <label className="text-xs font-semibold text-slate-400 mb-1 block">Measurement Type</label>
                              <select value={waterParameter} onChange={(e) => setWaterParameter(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-blue-500/30 focus:border-blue-500 outline-none text-white text-sm">
                                <option value="">Select Parameter...</option><option value="ph">pH Level</option><option value="do">Dissolved Oxygen (DO)</option><option value="turbidity">Turbidity</option><option value="flow">Stream Flow Rate</option><option value="depth">Water Depth</option>
                              </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Metric Value</label>
                                <input type="number" placeholder="e.g. 7.5" value={waterValue} onChange={(e) => setWaterValue(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-blue-500/30 focus:border-blue-500 outline-none text-white text-sm" />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Scientific Unit</label>
                                <input type="text" placeholder="e.g. mg/L, NTU, m³/s" value={waterUnit} onChange={(e) => setWaterUnit(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-blue-500/30 focus:border-blue-500 outline-none text-white text-sm" />
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedDomain === 'hazards' && (
                          <div className="bg-orange-950/20 p-5 rounded-xl border border-orange-500/20 space-y-4">
                            <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2"><Flame className="w-4 h-4" /> Hazard Characteristics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Estimated Severity</label>
                                <select value={hazardSeverity} onChange={(e) => setHazardSeverity(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-orange-500/30 focus:border-orange-500 outline-none text-white text-sm">
                                  <option value="">Select...</option><option value="low">Low (Monitoring)</option><option value="moderate">Moderate (Local Impact)</option><option value="high">High (Severe Impact)</option><option value="critical">Critical (Emergency)</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Estimated Area Affected</label>
                                <input type="text" placeholder="e.g. 2 Hectares, 500 meters of road" value={hazardImpactArea} onChange={(e) => setHazardImpactArea(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-orange-500/30 focus:border-orange-500 outline-none text-white text-sm" />
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedDomain === 'earth-systems' && (
                          <div className="bg-sky-950/20 p-5 rounded-xl border border-sky-500/20 space-y-4">
                            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2"><Cloud className="w-4 h-4" /> Earth System Metrics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Measurement / Phenomenon</label>
                                <input type="text" placeholder="e.g. Snow Depth (cm), Soil Moisture" value={earthMeasurement} onChange={(e) => setEarthMeasurement(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-sky-500/30 focus:border-sky-500 outline-none text-white text-sm" />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">Observed Trend</label>
                                <select value={earthTrend} onChange={(e) => setEarthTrend(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-sky-500/30 focus:border-sky-500 outline-none text-white text-sm">
                                  <option value="">Select...</option><option value="increasing">Increasing / Rising</option><option value="stable">Stable / Normal</option><option value="decreasing">Decreasing / Falling</option><option value="anomalous">Highly Anomalous</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* General Methodology (Always shown, but content-aware) */}
                        <div className="pt-4 border-t border-white/5 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Methodology Protocol</label>
                              <select 
                                value={observationMethod} onChange={(e) => setObservationMethod(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-white/30 outline-none text-white text-sm"
                              >
                                <option value="">Select Method...</option>
                                {selectedDomain && domainMethodologies[selectedDomain]?.map(m => (
                                  <option key={m.id} value={m.id}>{m.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Equipment/Sensor</label>
                              <input 
                                type="text" 
                                placeholder={selectedDomain ? domainEquipmentPlaceholders[selectedDomain] : 'Equipment used...'} 
                                value={equipmentUsed} 
                                onChange={(e) => setEquipmentUsed(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-white/30 outline-none text-white text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Qualitative Scientific Notes <span className="text-red-400">*</span></label>
                            <textarea 
                              required rows={4} placeholder="Provide necessary scientific context, anomalies, or environmental correlations..." value={description} onChange={(e) => setDescription(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm resize-none"
                            />
                          </div>
                        </div>
                        
                      </div>

                      <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
                        <Button type="button" variant="ghost" onClick={() => setCurrentStep(2)} className="text-slate-400 hover:text-white">Back</Button>
                        <Button type="button" disabled={!description} onClick={() => setCurrentStep(4)} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                          Continue to Evidence <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: EVIDENCE & ATTRIBUTION */}
                  {currentStep === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <Database className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">Evidence & Attribution</h2>
                      </div>
                      <p className="text-sm text-slate-400 mb-8">Attach verifying media and confirm data licensing.</p>
                      
                      <div className="space-y-6 mb-8">
                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Photographic / Sensor Evidence</label>
                          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors">
                            <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />
                            <Camera className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                            <p className="text-white text-sm font-medium mb-1">Upload visual evidence or logs</p>
                            <p className="text-slate-500 text-xs">JPG, PNG, CSV up to 15MB</p>
                            
                            {photos.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {photos.map((p, i) => <Badge key={i} variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{p.name}</Badge>)}
                              </div>
                            )}
                          </div>
                        </div>

                        <Card className="bg-slate-900/50 border-white/5 p-4 rounded-xl">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-900 text-emerald-500 focus:ring-emerald-500" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                            <div>
                              <div className="text-sm font-medium text-white">Anonymize Attribution</div>
                              <div className="text-xs text-slate-400">Exclude personally identifiable information from public datasets.</div>
                            </div>
                          </label>
                        </Card>

                        {!isAnonymous && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Investigator / Observer Name <span className="text-red-400">*</span></label>
                              <input type="text" required={!isAnonymous} value={contributorName} onChange={(e) => setContributorName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Institutional Email <span className="text-red-400">*</span></label>
                              <input type="email" required={!isAnonymous} value={contributorEmail} onChange={(e) => setContributorEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" />
                            </div>
                          </div>
                        )}

                        <Card className="bg-sky-950/20 border-sky-500/20 p-5 rounded-xl">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-sky-500/30 bg-slate-900 text-sky-500 focus:ring-sky-500" checked={agreeToDarwinCore} onChange={(e) => setAgreeToDarwinCore(e.target.checked)} />
                            <div>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-sky-400 mb-1">Data Standard Alignment</h4>
                              <p className="text-sm text-slate-300 leading-relaxed">
                                I confirm this data meets the necessary quality thresholds and authorize its structuring under Darwin Core (DwC) or equivalent open scientific schema for the Kashmir EcoWatch Intelligence Hub.
                              </p>
                            </div>
                          </label>
                        </Card>
                      </div>

                      <div className="flex justify-between pt-6 border-t border-white/10">
                        <Button type="button" variant="ghost" onClick={() => setCurrentStep(3)} className="text-slate-400 hover:text-white">Back</Button>
                        <Button type="submit" disabled={isSubmitting || !agreeToDarwinCore || (!isAnonymous && (!contributorName || !contributorEmail))} className="bg-emerald-600 hover:bg-emerald-500 text-white min-w-[150px]">
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Committing
                            </span>
                          ) : 'Commit to Database'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Card>

          </div>
        </div>
      </section>
    </main>
  );
}
