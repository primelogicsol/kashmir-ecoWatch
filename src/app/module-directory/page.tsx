'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, Shield, Droplet, Factory, AlertTriangle, Upload, Building2, Compass,
  ArrowRight, Grid3x3, Bird, Fish, Flower2, Mountain, Map, Calendar,
  Eye, TrendingUp, FileText, Bell, Phone, BookOpen, Users, Scale,
  Landmark, Gavel, ShieldCheck, HandCoins, Database, Scale as ScaleIcon,
  Accessibility, LandPlot, MapPin, Route, Waves, Flame, Zap,
  Droplets, TestTube, Factory as FactoryIcon, Trash2, Recycle,
  Wind, Thermometer, Info, Search, ListFilter, Activity, TreePine, Hammer, Wheat, Layers, Music, Sparkles, Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';

interface ModuleItem {
  name: string;
  route: string;
  description: string;
  icon?: React.ElementType;
}

interface ModuleGroup {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  gradient: string;
  modules: ModuleItem[];
}

const moduleGroups: ModuleGroup[] = [
  {
    id: 'environmental-investigations',
    title: 'Environmental Investigations & Accountability (KEW-EIAI)',
    description: 'Multidisciplinary 24-section scientific investigations examining ecological impacts, hydrological and geological evidence, and institutional responsibility across the Western Himalayas.',
    badge: 'KEW-EIAI',
    icon: Scale,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    modules: [
      { name: 'Module Home', route: '/environmental-investigations', description: 'Portfolio overview, live metrics & featured reports', icon: Scale },
      { name: 'Investigation Dashboard', route: '/environmental-investigations/dashboard', description: 'Intelligence & evidence cockpit', icon: TrendingUp },
      { name: 'Investigation Reports', route: '/environmental-investigations/reports', description: 'Scientific dossiers & scoping portfolio', icon: FileText },
      { name: 'Investigation Domains', route: '/environmental-investigations/domains', description: 'Lakes, cryosphere, Karewas, dams & governance', icon: Layers },
      { name: 'Scientific Disciplines', route: '/environmental-investigations/disciplines', description: 'Equations, methods & Himalayan literature', icon: BookOpen },
      { name: 'Evidence Registry', route: '/environmental-investigations/evidence', description: 'Claim-by-claim scientific verification matrix', icon: Database },
      { name: 'Investigation Atlas', route: '/environmental-investigations/atlas', description: 'Interactive GIS footprints & watersheds', icon: Map },
      { name: 'Institutional Accountability', route: '/environmental-investigations/accountability', description: 'Statutory responsibility matrix', icon: Landmark },
      { name: 'Asian & Global Case Studies', route: '/environmental-investigations/precedents', description: 'Comparative international restoration benchmarks', icon: Compass },
      { name: 'Recommendations Tracker', route: '/environmental-investigations/recommendations', description: 'Immediate, medium & long-term corrective actions', icon: ShieldCheck },
      { name: 'Investigation Methodology', route: '/environmental-investigations/methodology', description: 'Scientific standards & investigative workflow', icon: Info },
      { name: 'Submit Investigation', route: '/environmental-investigations/submit', description: 'Propose scoped study or official response', icon: Upload },
    ],
  },
  {
    id: 'sectoral-eia',
    title: 'Sectoral EIA Engine (SEIAE)',
    description: 'Cross-sector ecological intelligence evaluating how economic sectors transform Western Himalayan landscapes, watersheds, and ecosystems.',
    badge: 'Sectoral EIA Engine',
    icon: Activity,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    modules: [
      { name: 'SEIAE Portal Hub', route: '/sectoral-eia', description: 'Central intelligence command & architecture', icon: Layers },
      { name: 'Architecture & Overview', route: '/sectoral-eia/overview', description: 'Systemic architecture & SEA mandate', icon: BookOpen },
      { name: '9-Step Methodology', route: '/sectoral-eia/methodology', description: 'Standard operating assessment workflow', icon: ShieldCheck },
      { name: 'Tourism EIA Engine', route: '/sectoral-eia/sectors/tourism', description: 'Carrying capacity & alpine visitor pressure', icon: Compass },
      { name: 'Horticulture EIA Engine', route: '/sectoral-eia/sectors/horticulture', description: 'Orchard agrochemicals & Karewa aquifers', icon: TreePine },
      { name: 'Handicrafts EIA Engine', route: '/sectoral-eia/sectors/handicrafts', description: 'Artisanal lifecycle & dye wastewater effluents', icon: Hammer },
      { name: 'Agriculture EIA Engine', route: '/sectoral-eia/sectors/agriculture', description: 'Nutrient runoff, irrigation & soil health', icon: Wheat },
      { name: 'Submit Assessment', route: '/sectoral-eia/assessment/new', description: 'Enterprise & scientific intake wizard', icon: Upload },
      { name: 'Cumulative Impact Matrix', route: '/sectoral-eia/cumulative-impact', description: 'Multi-sector compounding stress convergence', icon: Activity },
      { name: 'Scenario Modeling', route: '/sectoral-eia/scenario-modeling', description: '2026-2035 predictive trajectory simulations', icon: TrendingUp },
      { name: 'GIS Impact Atlas', route: '/sectoral-eia/impact-atlas', description: 'Interactive spatial boundaries & cartography', icon: Map },
      { name: 'Mitigation Tracker', route: '/sectoral-eia/mitigation-tracker', description: 'Track verified reduction milestones', icon: ShieldCheck },
      { name: 'Scientific Reports', route: '/sectoral-eia/reports', description: 'Peer-reviewed assessment dossiers & monographs', icon: FileText },
    ],
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Intelligence',
    description: 'Complete species database, habitat monitoring, and ecological intelligence across Kashmir.',
    badge: 'Biodiversity',
    icon: Leaf,
    gradient: 'from-emerald-500 to-teal-600',
    modules: [
      { name: 'Species Directory', route: '/biodiversity', description: 'Complete biodiversity database', icon: Search },
      { name: 'Mammals', route: '/biodiversity/mammals', description: 'Ungulates, carnivores, primates', icon: Mountain },
      { name: 'Birds', route: '/biodiversity/birds', description: 'Resident and migratory species', icon: Bird },
      { name: 'Fish & Aquatic Life', route: '/biodiversity/fish', description: 'Freshwater and aquatic biodiversity', icon: Fish },
      { name: 'Plants & Flora', route: '/biodiversity/plants', description: 'Vascular plants and vegetation', icon: Flower2 },
      { name: 'Medicinal Flora', route: '/biodiversity/medicinal-plants', description: 'Traditional medicinal plants', icon: Leaf },
      { name: 'Threatened Species', route: '/biodiversity/threatened-species', description: 'CR, EN, VU conservation taxa', icon: Shield },
      { name: 'Wildlife Sightings', route: '/biodiversity/wildlife-sightings', description: 'Verified and community observations', icon: Eye },
      { name: 'Birding Hotspots', route: '/biodiversity/birding-hotspots', description: 'Prime observation areas', icon: MapPin },
      { name: 'Migration Windows', route: '/biodiversity/migration-windows', description: 'Migratory bird timing', icon: Calendar },
      { name: 'Pollinator Activity', route: '/biodiversity/pollinator-activity', description: 'Pollinator watch periods', icon: Leaf },
      { name: 'Phenology & Flowering', route: '/biodiversity/phenology-flowering', description: 'Seasonal flowering records', icon: Flower2 },
      { name: 'Habitat Signals', route: '/biodiversity/habitat-signals', description: 'Habitat stress and transitions', icon: FactoryIcon },
      { name: 'Seasonal Species Activity', route: '/biodiversity/seasonal-activity', description: 'Breeding and activity windows', icon: Calendar },
      { name: 'District Biodiversity Profiles', route: '/biodiversity/district-profiles', description: 'Regional intelligence', icon: Map },
      { name: 'Biodiversity Dashboards', route: '/biodiversity/dashboards', description: 'Analytics and trends', icon: TrendingUp },
      { name: 'Biodiversity Overview', route: '/biodiversity/overview', description: 'Module command center', icon: Info },
    ],
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    description: 'Protected area network, conservation landscapes, and habitat preservation intelligence.',
    badge: 'Protected Areas',
    icon: Shield,
    gradient: 'from-amber-500 to-orange-600',
    modules: [
      { name: 'Network Overview', route: '/protected-network', description: 'Complete protected area system', icon: Map },
      { name: 'Protected Area Atlas', route: '/protected-network/atlas', description: 'Interactive GIS mapping', icon: MapPin },
      { name: 'National Parks', route: '/protected-network/national-parks', description: 'Core conservation landscapes', icon: Mountain },
      { name: 'Wildlife Sanctuaries', route: '/protected-network/wildlife-sanctuaries', description: 'Protected habitats', icon: Leaf },
      { name: 'Wetland Reserves', route: '/protected-network/wetland-reserves', description: 'Marsh and bird conservation', icon: Droplets },
      { name: 'Conservation Reserves', route: '/protected-network/conservation-reserves', description: 'Community landscapes', icon: Users },
      { name: 'Bird & Habitat Areas', route: '/protected-network/bird-and-habitat-areas', description: 'Important bird areas', icon: Bird },
      { name: 'Species Intelligence', route: '/protected-network/species-intelligence', description: 'PA overlap and distribution', icon: Search },
      { name: 'Corridors and Connectivity', route: '/protected-network/corridors-and-connectivity', description: 'Landscape linkages', icon: Route },
      { name: 'Trails & Sightings', route: '/protected-network/trails-and-sightings', description: 'Field observations', icon: Eye },
      { name: 'Monitoring and Threat Intelligence', route: '/protected-network/monitoring-and-threats', description: 'Conservation alerts', icon: AlertTriangle },
      { name: 'Research and Assessments', route: '/protected-network/reports-and-plans', description: 'Scientific publications', icon: FileText },
    ],
  },
  {
    id: 'water-systems',
    title: 'Water Systems',
    description: 'Hydrological intelligence, water quality monitoring, and aquatic ecosystem management.',
    badge: 'Water Systems',
    icon: Droplet,
    gradient: 'from-cyan-500 to-blue-600',
    modules: [
      { name: 'Overview', route: '/water-systems', description: 'Complete hydrological intelligence', icon: Droplets },
      { name: 'Lakes', route: '/water-systems/lakes', description: 'Major, minor, urban and high-altitude lakes', icon: MapPin },
      { name: 'Wetlands', route: '/water-systems/wetlands', description: 'Marshes, floodplain and Ramsar wetlands', icon: Droplets },
      { name: 'Rivers & Streams', route: '/water-systems/rivers', description: 'Major rivers, tributaries and streams', icon: Waves },
      { name: 'Springs', route: '/water-systems/springs', description: 'Perennial, seasonal and community springs', icon: Droplet },
      { name: 'Watersheds', route: '/water-systems/watersheds', description: 'Basins, catchments and hydrological units', icon: Map },
      { name: 'Glaciers & Cryosphere', route: '/water-systems/glaciers', description: 'Glaciers and snow-fed systems', icon: Mountain },
      { name: 'Drinking Water Sources', route: '/water-systems/drinking-water-sources', description: 'Spring and surface supply vulnerability', icon: TestTube },
      { name: 'Water Quality', route: '/water-systems/water-quality', description: 'Quality monitoring and trends', icon: TestTube },
      { name: 'Algal Bloom Intelligence', route: '/hazard-intelligence/algal-bloom-intelligence', description: 'Eutrophication and bloom risk', icon: FactoryIcon },
      { name: 'Aquatic Life & Fisheries', route: '/water-systems/fisheries', description: 'Fish species and fishery management', icon: Fish },
      { name: 'Restoration & Rejuvenation', route: '/water-systems/restoration', description: 'Conservation and restoration projects', icon: Leaf },
      { name: 'Flood & Hydrological Risk', route: '/water-systems/flood-risk', description: 'Flood zones and hazard assessment', icon: AlertTriangle },
      { name: 'Water Systems Dashboards', route: '/water-systems/dashboards', description: 'Analytics, trends and heatmaps', icon: TrendingUp },
    ],
  },
  {
    id: 'environmental-monitoring',
    title: 'Environmental Monitoring',
    description: 'Environmental intelligence command center, pollution tracking, and infrastructure monitoring.',
    badge: 'Environmental Monitoring',
    icon: Factory,
    gradient: 'from-violet-500 to-purple-600',
    modules: [
      { name: 'Overview', route: '/environmental-monitoring', description: 'Environmental intelligence command center', icon: Info },
      { name: 'Solid Waste', route: '/environmental-monitoring/solid-waste', description: 'Dumping, landfill stress, open waste', icon: Trash2 },
      { name: 'Bio-Waste', route: '/environmental-monitoring/bio-waste', description: 'Organic waste, decomposition zones', icon: Recycle },
      { name: 'Sewage & Wastewater', route: '/environmental-monitoring/sewage-wastewater', description: 'Overflow, outfalls, untreated discharge', icon: Droplets },
      { name: 'Drinking Water', route: '/environmental-monitoring/drinking-water', description: 'Contamination alerts, supply issues', icon: TestTube },
      { name: 'Critical Infrastructure', route: '/environmental-monitoring/critical-infrastructure', description: 'Reservoirs, utilities, waste assets', icon: FactoryIcon },
      { name: 'Air Pollution', route: '/environmental-monitoring/air-pollution', description: 'AQI, particulate, smoke, burning', icon: Wind },
      { name: 'Environmental Health Signals', route: '/environmental-monitoring/environmental-health', description: 'Odor, fish kill, stagnant water', icon: Thermometer },
      { name: 'Environmental Resilience', route: '/environmental-monitoring/environmental-resilience', description: 'Resilience, recovery & stress capacity', icon: Bell },
      { name: 'SDG Monitoring', route: '/environmental-monitoring/sdg-monitoring', description: 'Environmental UN SDG performance tracking', icon: TrendingUp },
      { name: 'Environmental Monitoring Dashboards', route: '/environmental-monitoring/dashboards', description: 'District comparison and stress heatmaps', icon: TrendingUp },
    ],
  },
  {
    id: 'risk-monitoring',
    title: 'Risk & Monitoring',
    description: 'Risk intelligence command center, hazard monitoring, and emergency response tracking.',
    badge: 'Risk & Monitoring',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-rose-600',
    modules: [
      { name: 'Overview', route: '/risk-monitoring', description: 'Risk intelligence command center', icon: Info },
      { name: 'Hazard Risks', route: '/risk-monitoring/hazard-risks', description: 'Multi-hazard monitoring', icon: AlertTriangle },
      { name: 'Pollution Stress', route: '/environmental-monitoring', description: 'Environmental pollution', icon: FactoryIcon },
      { name: 'Biodiversity Risks', route: '/risk-monitoring/biodiversity-risks', description: 'Species and habitat threats', icon: Leaf },
      { name: 'Response & Operations', route: '/risk-monitoring/critical-infrastructure-response', description: 'Emergency response tracking', icon: Phone },
      { name: 'Live Alerts & Advisories', route: '/risk-monitoring/live-alerts-advisories', description: 'Real-time alert feed', icon: Bell },
      { name: 'Risk Updates', route: '/risk-updates', description: 'Historical risk documentation', icon: FileText },
      { name: 'Risk Dashboards', route: '/risk-monitoring/dashboards', description: 'Integrated risk analytics', icon: TrendingUp },
      { name: 'District Risk Profiles', route: '/risk-monitoring/district-risk-profiles', description: 'District-level risk intelligence', icon: Map },
      { name: 'Environmental Incident Risk', route: '/risk-monitoring/environmental-incident-risk', description: 'Incident aggregation', icon: AlertTriangle },
      { name: 'Flood & Flash Flood Risks', route: '/risk-monitoring/flood-flash-flood-risks', description: 'Flood monitoring', icon: Droplets },
      { name: 'Landslide & Slope Risks', route: '/risk-monitoring/landslide-slope-risks', description: 'Slope stability tracking', icon: Mountain },
      { name: 'Avalanche & Winter Risks', route: '/risk-monitoring/avalanche-winter-risks', description: 'Winter hazard monitoring', icon: Eye },
      { name: 'Forest Fire Risks', route: '/risk-monitoring/forest-fire-risks', description: 'Fire danger assessment', icon: Flame },
      { name: 'Glacier & Cryosphere Risks', route: '/risk-monitoring/glacier-cryosphere-risks', description: 'Glacial threat monitoring', icon: Mountain },
      { name: 'Hydrological Risks', route: '/risk-monitoring/hydrological-risks', description: 'River and basin risk tracking', icon: Waves },
      { name: 'Earthquake Risks', route: '/risk-monitoring/earthquake-risks', description: 'Seismic event monitoring', icon: Zap },
      { name: 'Shelters, Closures & Emergency Routes', route: '/risk-monitoring/shelters-closures-emergency-routes', description: 'Operational status', icon: Route },
      { name: 'Critical Infrastructure Response', route: '/risk-monitoring/critical-infrastructure-response', description: 'Infrastructure monitoring', icon: ShieldCheck },
    ],
  },
  {
    id: 'himalayan-dispatch',
    title: 'Himalayan Dispatch: Environmental Journalism & Magazine',
    description: 'Luxury digital environmental periodical dedicated to longform narrative reporting, documentary photography, data journalism, and scientific truth across the Western Himalayas.',
    badge: 'Himalayan Dispatch',
    icon: BookOpen,
    gradient: 'from-amber-600 via-orange-700 to-stone-800',
    modules: [
      { name: 'The Inaugural Issue', route: getKewToDispatchUrl('/'), description: 'Cover story, editorial folios & current issue', icon: BookOpen },
      { name: 'Coming Next (Issue 02)', route: getKewToDispatchUrl('/forthcoming'), description: 'Forthcoming editorial slate & previews', icon: Calendar },
      { name: 'Editorial Departments', route: getKewToDispatchUrl('/departments'), description: 'Cover stories, longform, field & data journalism', icon: Layers },
      { name: 'Journalists & Portfolios', route: getKewToDispatchUrl('/journalists'), description: 'Correspondents & documentary photographers', icon: Users },
      { name: 'Editorial Board', route: getKewToDispatchUrl('/editorial-board'), description: 'Governance, standards & scientific review', icon: ShieldCheck },
      { name: 'Edition Archive', route: getKewToDispatchUrl('/archive'), description: 'Permanent periodical folio archive', icon: Database },
      { name: 'Pitch a Story', route: getKewToDispatchUrl('/pitch'), description: 'Commissioning desk & source-protected intake', icon: Upload },
    ],
  },
  {
    id: 'webinars-conferences',
    title: 'Webinars & Conferences: Scientific Exchange & Knowledge Sharing',
    description: 'Academic symposiums, 104-event 2027–2028 scientific calendar, institutional partnerships, and published proceedings across Western Himalayan research disciplines.',
    badge: 'Webinars & Conferences',
    icon: Compass,
    gradient: 'from-teal-500 via-emerald-600 to-cyan-700',
    modules: [
      { name: 'Webinars & Conferences Hub', route: '/webinars', description: 'Overview, featured symposiums & registration', icon: Compass },
      { name: 'Flagship Conferences (8)', route: '/webinars/conferences', description: 'Multi-track Western Himalayan conferences', icon: Layers },
      { name: '2027–28 Scientific Calendar', route: '/webinars/calendar', description: '104 scheduled scientific webinars & events', icon: Calendar },
      { name: 'Upcoming Sessions', route: '/webinars/upcoming', description: 'Open registration & live symposium schedule', icon: Bell },
      { name: 'Host a Conference', route: '/webinars/host-a-conference', description: 'University & institutional symposium intake', icon: Upload },
      { name: 'Institutional Network', route: '/webinars/institution/verification', description: 'Partner university accreditation & registration', icon: Building2 },
      { name: 'Published Proceedings', route: '/webinars/proceedings', description: 'Abstracts, monographs & session papers', icon: FileText },
      { name: 'Past Event Archives', route: '/webinars/past-events', description: 'Recorded symposiums & verifiable certificates', icon: Award },
    ],
  },
  {
    id: 'ecovoices',
    title: 'EcoVoices: Environmental Arts, Music & Creative Expression',
    description: 'Dedicated creative platform communicating environmental consciousness through music, poetry, literature, visual arts, natural soundscapes, and cinematic storytelling.',
    badge: 'EcoVoices',
    icon: Music,
    gradient: 'from-amber-400 via-amber-500 to-indigo-600',
    modules: [
      { name: 'EcoVoices Hub', route: '/ecovoices', description: 'Premiere stage & six creative departments', icon: Sparkles },
      { name: 'Environmental Music', route: '/ecovoices#music', description: '6 Published SufiPulse USA × KEW master compositions', icon: Music },
      { name: 'Environmental Poetry', route: '/ecovoices#poetry', description: 'Mystical kalam, shruks & ecological verse', icon: BookOpen },
      { name: 'Environmental Cinema', route: '/ecovoices#cinema', description: 'Documentaries, short films & visual narratives', icon: Eye },
      { name: 'Environmental Art', route: '/ecovoices#visual-arts', description: 'Paintings, installations & ecological art', icon: Flower2 },
      { name: 'Sounds of Nature', route: '/ecovoices#soundscapes', description: 'Western Himalayan acoustic heritage & soundscapes', icon: Waves },
      { name: 'Creative Contributors', route: '/ecovoices#artists', description: '19 documented regional voices & SufiPulse pathways', icon: Users },
      { name: 'Submit Creative Work', route: '/ecovoices#submit', description: 'Open creative submission & editorial review gateway', icon: Upload },
    ],
  },
  {
    id: 'student-action-hub',
    title: 'Student Action Hub: Environmental Awareness, Education, Participation & Action',
    description: 'Official student participation platform uniting the 16-observance Environmental Calendar with the 8-stage Outdoor Classroom field science lifecycle across Kashmir schools and colleges.',
    badge: 'Student Action Hub',
    icon: Calendar,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    modules: [
      { name: 'Environmental Calendar', route: '/environmental-calendar', description: '16 UN & Western Himalayan observances & student action guides', icon: Calendar },
      { name: 'Program Overview', route: '/environmental-calendar/outdoor-classroom', description: '8-stage Outdoor Classroom experiential learning lifecycle', icon: Compass },
      { name: 'Curriculum Library', route: '/environmental-calendar/outdoor-classroom/curriculum', description: '5-tier teacher guides, syllabi & student worksheets', icon: BookOpen },
      { name: 'Adopt-an-Ecosystem', route: '/environmental-calendar/outdoor-classroom/adopt-an-ecosystem', description: '20 registered school observatory field sites across 10 districts', icon: MapPin },
      { name: '8 Field Programs', route: '/environmental-calendar/outdoor-classroom/field-learning-programs', description: 'Wetlands, forests, karst springs, cryosphere & urban ecology', icon: Layers },
      { name: 'School Registration', route: '/environmental-calendar/outdoor-classroom/institutional-registration', description: '100% tuition-free school & eco-club enrollment', icon: Building2 },
      { name: 'Field Telemetry', route: '/environmental-calendar/outdoor-classroom/student-observations', description: 'Supervised student environmental measurements & QA/QC logs', icon: Activity },
      { name: 'Certificates', route: '/environmental-calendar/outdoor-classroom/certificates', description: 'Cryptographically verifiable student competency credentials', icon: Award },
      { name: 'Annual Pilot Report', route: '/environmental-calendar/outdoor-classroom/annual-report', description: '2026 Phase 1 20-institution pilot synthesis & archive', icon: FileText },
    ],
  },
  {
    id: 'contribution-pathways',
    title: 'Contribution Pathways',
    description: 'Citizen science, data submission, and public participation programs.',
    badge: 'Contribution',
    icon: Upload,
    gradient: 'from-sky-500 to-indigo-600',
    modules: [
      { name: 'Report an Issue', route: '/report-issue', description: 'Environmental incident reporting', icon: AlertTriangle },
      { name: 'Submit a Sighting', route: '/submit-observation', description: 'Wildlife and species observation logging', icon: Eye },
      { name: 'Contribute Data', route: '/contribute-data', description: 'Dataset and research submission', icon: Database },
      { name: 'Citizen Science', route: '/citizen-science', description: 'Public participation programs', icon: Users },
      { name: 'Contribution Hub', route: '/contribute', description: 'Central contribution gateway', icon: Upload },
      { name: 'Contribution Guidelines', route: '/contribute-guidelines', description: 'Evidence standards and submission rules', icon: FileText },
    ],
  },
  {
    id: 'institutional-reference',
    title: 'Institutional & Reference',
    description: 'Platform governance, methodology, legal framework, and reference materials.',
    badge: 'Institutional',
    icon: Building2,
    gradient: 'from-slate-500 to-zinc-600',
    modules: [
      { name: 'About', route: '/about', description: 'Platform overview and direction', icon: Info },
      { name: 'Mission', route: '/about/mission', description: 'Platform purpose and vision', icon: TargetIcon },
      { name: 'Contact', route: '/about/contact', description: 'Contact and coordination', icon: Phone },
      { name: 'Partners', route: '/about/partners', description: 'Institutional engagement', icon: Users },
      { name: 'Governance', route: '/governance', description: 'Governance and scientific charter', icon: Landmark },
      { name: 'Support KEW', route: '/about/support-sponsorship', description: 'Institutional partnerships', icon: Users },
      { name: 'Data Sources', route: '/about/data-sources', description: 'Evidence origins and sourcing', icon: Database },
      { name: 'Methodology', route: '/about/methodology', description: 'Review logic and classification', icon: ScaleIcon },
      { name: 'Verification Model', route: '/about/verification', description: 'Confidence assessment framework', icon: ShieldCheck },
      { name: 'Privacy', route: '/privacy', description: 'Data handling and user privacy', icon: Shield },
      { name: 'Terms of Use', route: '/terms', description: 'Platform use and legal framework', icon: Gavel },
      { name: 'Accessibility', route: '/accessibility', description: 'Inclusive access statement', icon: Accessibility },
      { name: 'Library', route: '/library', description: 'Research and reference materials', icon: BookOpen },
      { name: 'Atlas', route: '/atlas', description: 'Ecological atlas and mapping', icon: Map },
      { name: 'Districts', route: '/districts', description: 'District profiles and intelligence', icon: MapPin },
    ],
  },
  {
    id: 'navigation-discovery',
    title: 'Navigation & Discovery',
    description: 'Platform navigation tools, live mapping, and historical records.',
    badge: 'Navigation',
    icon: Compass,
    gradient: 'from-teal-500 to-cyan-600',
    modules: [
      { name: 'Module Directory', route: '/module-directory', description: 'This page', icon: Grid3x3 },
      { name: 'Entity Explorer', route: '/entity-explorer', description: 'Browse and filter entities', icon: ListFilter },
      { name: 'Live Incident Map', route: '/live-incident-map', description: 'Real-time incident mapping', icon: Map },
      { name: 'Alert Archive', route: '/alert-archive', description: 'Historical alert records', icon: FileText },
    ],
  },
];

// Target icon component (since we need it but can't import it directly)
function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const totalModules = moduleGroups.reduce((acc, group) => acc + group.modules.length, 0);
const totalCategories = moduleGroups.length;
const contributionModules = moduleGroups.find(g => g.id === 'contribution-pathways')?.modules.length || 0;
const riskModules = moduleGroups.find(g => g.id === 'risk-monitoring')?.modules.length || 0;

export default function ModuleDirectoryPage() {
  const router = useRouter();
  const firstGroupRef = useRef<HTMLDivElement>(null);

  const scrollToModules = () => {
    firstGroupRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        label="Platform Modules"
        title={<>
            <KewBrandIdentity />
            <span className="block whitespace-normal break-words leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Module Directory</span>
          </>}
        subtitle="Complete system index of all Kashmir EcoWatch modules, intelligence layers, and operational pathways."
        icon={<Grid3x3 className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500"
              onClick={scrollToModules}
            >
              <Grid3x3 className="w-5 h-5 mr-2" />
              Browse All Modules
            </Button>
          </div>
        }
      />

      {/* Stats Strip */}
      <section className="py-12 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Modules', value: totalModules, icon: Grid3x3, color: 'text-violet-400' },
              { label: 'Categories', value: totalCategories, icon: ListFilter, color: 'text-emerald-400' },
              { label: 'Contribution Pathways', value: contributionModules, icon: Upload, color: 'text-sky-400' },
              { label: 'Risk Modules', value: riskModules, icon: AlertTriangle, color: 'text-red-400' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Groups */}
      {moduleGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          ref={groupIndex === 0 ? firstGroupRef : undefined}
          className={`py-16 ${groupIndex % 2 === 0 ? 'bg-slate-950' : 'bg-gradient-to-b from-slate-950 to-slate-900'}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-slate-900 ${group.gradient} flex items-center justify-center shadow-lg`}>
                  <group.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Badge variant="info" className="mb-1">{group.badge}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{group.title}</h2>
                </div>
              </div>
              <p className="text-slate-400 max-w-3xl text-lg">
                {group.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {group.modules.map((mod, modIndex) => {
                const Icon = mod.icon || Compass;
                return (
                  <motion.div
                    key={mod.route}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: modIndex * 0.03 }}
                    className="h-full min-w-0"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => router.push(mod.route)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && router.push(mod.route)}
                      className="kew-card-shell kew-card-shell--interactive group h-full"
                    >
                      <div className="kew-card-top-row">
                        <div className="kew-card-icon-box bg-slate-800/90 border-white/15 text-emerald-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" size="sm" className="text-[10px] border-white/10 text-slate-300">
                          {group.badge}
                        </Badge>
                      </div>
                      <h3 className="kew-card-title">{mod.name}</h3>
                      <p className="kew-card-desc">{mod.description}</p>
                      <div className="kew-card-cta">
                        <span>Open Module</span>
                        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

    </main>
  );
}
