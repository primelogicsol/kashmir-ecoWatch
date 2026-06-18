'use client';

import React, { useState, useRef } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Camera, MapPin, Calendar, Eye, ArrowRight, CheckCircle, 
  Users, Target, Binoculars, Leaf, Map, Shield, Route, 
  Layers, Search, TrendingUp, FileCheck, Database, Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';

const observationCategories = [
  { id: 'wildlife', label: 'Wildlife / Animals', icon: '🦌' },
  { id: 'plants', label: 'Trees / Plants', icon: '🌳' },
  { id: 'water', label: 'Water / Springs', icon: '💧' },
  { id: 'weather', label: 'Extreme Weather', icon: '⛈️' },
  { id: 'pollution', label: 'Pollution / Waste', icon: '🗑️' },
  { id: 'community', label: 'Community Action', icon: '🤝' },
];

const habitatTypes = [
  { id: 'forest', label: 'Forest' },
  { id: 'wetland', label: 'Wetland' },
  { id: 'grassland', label: 'Grassland' },
  { id: 'alpine', label: 'Alpine/Meadow' },
  { id: 'river-stream', label: 'River/Stream' },
  { id: 'lake-pond', label: 'Lake/Pond' },
  { id: 'agricultural', label: 'Agricultural' },
  { id: 'urban', label: 'Urban/Suburban' },
  { id: 'other', label: 'Other' },
];

const confidenceLevels = [
  { id: 'certain', label: 'Certain', description: 'Confident in species identification', color: 'from-emerald-500 to-teal-500' },
  { id: 'probable', label: 'Probable', description: 'Likely correct, minor uncertainty', color: 'from-blue-500 to-cyan-500' },
  { id: 'possible', label: 'Possible', description: 'Some uncertainty, needs verification', color: 'from-amber-500 to-orange-500' },
  { id: 'uncertain', label: 'Uncertain', description: 'Low confidence, expert review needed', color: 'from-red-500 to-pink-500' },
];

const observationMethods = [
  { id: 'direct', label: 'Direct Observation' },
  { id: 'heard', label: 'Heard (Call/Sound)' },
  { id: 'photographed', label: 'Photographed' },
  { id: 'tracks', label: 'Tracks/Signs' },
  { id: 'inferred', label: 'Inferred Evidence' },
];

const workflowSteps = [
  { icon: FileCheck, label: 'Received', description: 'Observation logged and acknowledged', color: 'text-blue-400' },
  { icon: Search, label: 'Under Review', description: 'Initial screening and classification', color: 'text-amber-400' },
  { icon: Layers, label: 'Context Checked', description: 'Cross-referenced with existing records', color: 'text-purple-400' },
  { icon: Eye, label: 'Expert Review', description: 'Species expert verification where needed', color: 'text-orange-400' },
  { icon: Database, label: 'Published', description: 'Added to biodiversity records', color: 'text-emerald-400' },
];

// Helper to generate sighting reference ID
function generateSightingId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `SIGHT-${year}${month}${day}-${random}`;
}

export default function SubmitSightingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [speciesName, setSpeciesName] = useState('');
  const [dateObserved, setDateObserved] = useState('');
  const [locationText, setLocationText] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [locationPrecision, setLocationPrecision] = useState<'exact' | 'approximate'>('exact');
  const [description, setDescription] = useState('');
  const [countObserved, setCountObserved] = useState('');
  const [confidence, setConfidence] = useState<string>('probable');
  const [behaviorObserved, setBehaviorObserved] = useState('');
  const [habitatType, setHabitatType] = useState<string>('');
  const [observationMethod, setObservationMethod] = useState<string>('direct');
  const [photos, setPhotos] = useState<File[]>([]);
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  
  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [sightingId, setSightingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !speciesName || !dateObserved || !locationText || !description) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate sighting reference ID
    const newSightingId = generateSightingId();
    setSightingId(newSightingId);
    
    // Simulate async submission (replace with actual API call when backend is ready)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoordinates(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
        (error) => {
          // Silently fail - user can enter manually
          console.log('Geolocation failed:', error);
        }
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Success screen
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950"><section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-3xl"
            >
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
                <h1 className="max-w-xl text-4xl font-bold text-white mb-4">Observation Received</h1>
                <p className="text-slate-400 text-lg">
                  Thank you! Your observation has been logged and will be reviewed by the Kashmir EcoWatch team.
                </p>
              </div>

              {/* Sighting Reference Card */}
              <Card className="glass-intense border-white/10 p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Observation Reference ID</div>
                  <div className="text-3xl font-mono font-bold text-white mb-4">{sightingId}</div>
                  <p className="text-sm text-slate-400">
                    Keep this reference handy if you need to follow up or provide more details.
                  </p>
                </div>
              </Card>

              {/* What Happens Next */}
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">What Happens Next</h3>
                <div className="space-y-3 mb-4">
                  {workflowSteps.map((step, idx) => (
                    <div key={step.label} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0`}>
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{step.label}</div>
                        <div className="text-xs text-slate-400">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Approved sightings may contribute to <span className="text-white font-medium">Biodiversity</span>, 
                  <span className="text-white font-medium"> Wildlife Sightings</span>, 
                  <span className="text-white font-medium"> District Biodiversity Profiles</span>, and related conservation intelligence layers.
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {contributorEmail && 'You may be contacted if additional information or clarification is needed.'}
                  Sensitive species locations may be generalized for public display.
                </p>
              </Card>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                <Button onClick={() => window.location.reload()}>
                  Submit Another Observation
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/biodiversity')}>
                  Explore Biodiversity Hub
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
      </main>
    );
  }

  // Main form
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Contribute', href: '/contribute' }, { label: 'Submit Observation' }]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Community Reporting</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Submit Observation</span>
          </>}
        subtitle="An easy-to-use platform for students, citizens, journalists, and communities to report wildlife, environmental conditions, and community events."
        icon={<Camera className="w-6 h-6 text-emerald-400" />}
        label="Community Hub"
      />

      {/* How Sightings Are Handled */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">How Your Reports Help</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Whether you are a student noticing unusual weather, a community reporting pollution, or a local observing wildlife, your simple reports provide crucial "eyes on the ground" for our environmental intelligence network.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <Route className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p>
                    Approved sightings may contribute to <span className="text-white font-medium">Biodiversity</span>, 
                    <span className="text-white font-medium"> Wildlife Sightings</span>, 
                    <span className="text-white font-medium"> District Biodiversity Profiles</span>, and related 
                    <span className="text-white font-medium"> conservation intelligence layers</span>.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-400 mt-3">
                  <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300">
                    Sensitive species and vulnerable habitats may not be displayed with exact public location.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                {/* Species Category */}

                <div className="mb-8">
                    <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">What did you observe?</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {observationCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2
                            ${selectedCategory === cat.id 
                              ? 'bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/50' 
                              : 'bg-slate-900/50 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <span className={`text-xs font-semibold ${selectedCategory === cat.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {cat.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Title or Name of Observation <span className="text-red-400">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Black Bear, Fallen Chinar Tree, Contaminated Stream..." 
                      value={speciesName} 
                      onChange={(e) => setSpeciesName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                    />
                  </div>

                {/* Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date Observed <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      value={dateObserved}
                      onChange={(e) => setDateObserved(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="District or area"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Coordinates & Location Precision */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-3 mb-3">
                    <Map className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-white mb-2">
                        GPS Coordinates (Optional)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Latitude, Longitude"
                          value={coordinates}
                          onChange={(e) => setCoordinates(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleGetCurrentLocation}
                          className="px-3 py-2 rounded-lg bg-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/20 transition-colors whitespace-nowrap"
                        >
                          Get Location
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="locationPrecision"
                        value="exact"
                        checked={locationPrecision === 'exact'}
                        onChange={(e) => setLocationPrecision(e.target.value as 'exact' | 'approximate')}
                        className="w-4 h-4 rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-white">Exact Location</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="locationPrecision"
                        value="approximate"
                        checked={locationPrecision === 'approximate'}
                        onChange={(e) => setLocationPrecision(e.target.value as 'exact' | 'approximate')}
                        className="w-4 h-4 rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-white">Approximate Location</span>
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    • Exact location preferred for accuracy • Approximate location accepted if unsure • Sensitive records may have generalized public coordinates
                  </p>
                </div>

                {/* Observation Method (moved to later or integrated below) */}

                {/* Habitat Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">
                    <Leaf className="w-4 h-4 inline mr-1" />
                    Habitat Type
                  </label>
                  <select
                    value={habitatType}
                    onChange={(e) => setHabitatType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="" className="bg-slate-800">Select habitat type (optional)</option>
                    {habitatTypes.map((habitat) => (
                      <option key={habitat.id} value={habitat.id} className="bg-slate-800">{habitat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Details / Description <span className="text-red-400">*</span></label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Describe what you saw in your own words. E.g., 'Noticed a strange smell near the river' or 'Saw a flock of birds heading north'."
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm resize-none"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Count / Amount (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 5 birds, 10 bags of trash, 1 tree" 
                            value={countObserved} 
                            onChange={(e) => setCountObserved(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Context / Action (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Flying, burning, dumping" 
                            value={behaviorObserved} 
                            onChange={(e) => setBehaviorObserved(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                          />
                        </div>
                      </div>

                {/* Photo Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">
                    <Camera className="w-4 h-4 inline mr-1" />
                    Photo Evidence (Optional)
                  </label>
                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Drag and drop photos or click to upload</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP — max 10MB per file</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  {photos.length > 0 && (
                    <div className="mt-2 text-sm text-emerald-400">{photos.length} file(s) selected</div>
                  )}
                  <div className="mt-2 text-xs text-slate-500 space-y-1">
                    <p>• Clear, recent images help with species identification and review</p>
                    <p>• Photo evidence may support verification priority</p>
                    <p>• Some evidence may remain restricted or internal for sensitive species</p>
                  </div>
                </div>

                {/* Contributor Info */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="How you'd like to be credited"
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="For follow-up if clarification needed"
                      value={contributorEmail}
                      onChange={(e) => setContributorEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="text-center pt-2">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting || !selectedCategory || !speciesName || !dateObserved || !locationText || !description}
                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white min-w-[200px]"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Submitting...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                Submit Observation <ArrowRight className="w-4 h-4" />
                              </span>
                            )}
                          </Button>
                        </div>
              </form>
            </Card>

            {/* What Happens Next */}
            <Card className="glass-intense border-white/10 p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                What Happens After Submission
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {workflowSteps.map((step, idx) => (
                  <div key={step.label} className="flex flex-col items-start gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{step.label}</div>
                      <div className="text-xs text-slate-400">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Links */}
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <Link href="/biodiversity" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Explore Biodiversity Hub <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/biodiversity/wildlife-sightings" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                View Wildlife Sightings <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/contribute" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Other Contribution Paths <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
