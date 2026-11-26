'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  GraduationCap, Award, Briefcase, Shield, Map,
  Globe, Users, Microscope, BookOpen, Activity,
  Droplets, Server, Compass, CheckCircle2, ArrowRight,
  ExternalLink, Mail, Phone, MapPin, Sparkles, FileText,
  BadgeCheck, ChevronRight, Layers, Flame, Landmark, Building2,
  ShieldCheck, Calendar, Lock, Brain, BarChart3, Code, Cloud,
  Feather, Palette, Search, ChevronDown, ChevronUp, Filter, Info, FolderArchive
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function FounderPage() {
  const [activeCertTab, setActiveCertTab] = useState<'fema' | 'un' | 'epa' | 'geospatial' | 'specialized'>('fema');
  const [projectFilterCategory, setProjectFilterCategory] = useState<string>('All');
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');
  const [projectDisplayMode, setProjectDisplayMode] = useState<'all' | 'featured'>('all');

  // Executive Stats
  const stats = [
    { value: '25+', label: 'Years Experience', sub: 'Environmental Science & Disaster Resilience', color: 'text-emerald-400' },
    { value: '600+', label: 'Technical Teams Led', sub: 'Across 7 Indian states in flagship water programs', color: 'text-sky-400' },
    { value: '50+', label: 'Federal & UN Certifications', sub: 'FEMA APS, UN, US EPA, AWWA, NASA', color: 'text-amber-400' },
    { value: '15', label: 'UN Accreditations', sub: 'Water security, IWRM & freshwater monitoring', color: 'text-purple-400' },
    { value: '2005', label: 'Landmark Satellite Survey', sub: 'Post-Earthquake remote sensing assessment', color: 'text-rose-400' },
    { value: '100%', label: 'Non-Commercial Mission', sub: 'Knowledge Return System for Kashmir', color: 'text-teal-400' },
  ];

  // Degrees and Education
  const education = [
    {
      degree: 'Doctor of Philosophy (Ph.D.)',
      period: 'Doctoral Degree',
      field: 'Environmental Geospatial Information Sc.',
      institution: 'Advanced Environmental Geospatial Systems and Disaster Governance',
      specialization: 'Focus: High-altitude mountain hydrology, disaster risk reduction, and watershed resilience',
      icon: GraduationCap,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      degree: 'Master of Science (M.Sc.)',
      period: 'Post-Graduate Master',
      field: 'Environmental Science',
      institution: 'Advanced Environmental Studies and Hazard Risk Assessment Management',
      specialization: 'Focus: Multi-hazard mitigation frameworks, watershed dynamics, and disaster resilience',
      icon: Microscope,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      degree: 'Master of Science (M.Sc.)',
      period: 'Post-Graduate Master',
      field: 'Environmental Science and Technology',
      institution: 'Advanced Environmental Engineering and Ecological Technology',
      specialization: 'Focus: Water quality engineering, remediation technologies, and aquatic ecosystem dynamics',
      icon: Droplets,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      degree: 'Post-Graduate Qualification',
      period: 'Advanced Professional',
      field: 'Geospatial Science and Remote Sensing',
      institution: 'Satellite Earth Observation Systems and Vulnerability Modeling',
      specialization: 'Focus: High-altitude mountain hydrology, spatial observation, and satellite remote sensing',
      icon: Map,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      degree: 'Graduate Computer Diploma',
      period: 'Systems Architecture',
      field: 'Computer Applications and Systems',
      institution: 'Enterprise Database Systems Architecture and Software Engineering',
      specialization: 'Focus: Hands-on SQL Server operations, spatial geodatabases, and digital infrastructure',
      icon: Server,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      degree: 'Professional Communications',
      period: 'Emergency Engineering',
      field: 'Digital Communications and Networks',
      institution: 'Emergency Warning Infrastructure and Communications Systems',
      specialization: 'Focus: Crisis warning dissemination, multi-agency networks, and public emergency outreach',
      icon: Shield,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      degree: 'Advanced Specialization',
      period: 'Computational Intelligence',
      field: 'Environmental Data and AI Decisions',
      institution: 'Applied Machine Learning and Predictive Decision Support Systems',
      specialization: 'Focus: Data-driven environmental modeling, predictive telemetry, and AI decision systems',
      icon: Brain,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      degree: 'Specialized Qualification',
      period: 'Quantitative Analytics',
      field: 'Environmental Data and Informatics',
      institution: 'Advanced Statistical Analysis and Environmental Sensor Telemetry',
      specialization: 'Focus: Time-series ecological telemetry, spatial analytics, and watershed data processing',
      icon: BarChart3,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      degree: 'Post-Graduate Master',
      period: 'Software Engineering',
      field: 'Enterprise Software and Systems',
      institution: 'Distributed Cloud Architecture and Managed Application Platforms',
      specialization: 'Focus: Full-stack web development, microservice architectures, cybersecurity, and critical infrastructure digital systems',
      icon: Code,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      degree: 'Advanced Specialization',
      period: 'Critical Infrastructure',
      field: 'Critical Infrastructure & Resilience',
      institution: 'Mission-Critical Infrastructure Operations and Enterprise Cloud Hubs',
      specialization: 'Focus: Lifeline utility networks, critical infrastructure protection, and mission-critical cloud resilience',
      icon: Building2,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    }
  ];

  // Career History Timeline
  const career = [
    {
      role: 'Critical Infrastructure Resilience & Emergency Management Specialist',
      org: '[Entity Masked — Emergency & Critical Infrastructure Sector]',
      location: '[Location Restricted — Maryland, USA]',
      period: '2022 – Present',
      badge: 'US Resilience & Sensitive Infrastructure Security',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      isMasked: true,
      points: [
        'Conducted advanced vulnerability assessments, threat mitigation modeling, and operational resilience evaluations for high-consequence critical infrastructure under the National Infrastructure Protection Plan (NIPP) and FEMA Advanced Professional Series (APS) standards.',
        'Engineered all-hazard emergency management, incident command architectures (ICS/NIMS), and Continuity of Operations Plans (COOP) for lifeline utility sectors and complex regional operational environments.',
        'Directed sensitive risk assessments and protective security counter-measures for critical dams, bulk water systems, and municipal utility networks against insider threats and physical-cyber disruption vectors.',
        'Coordinated multi-agency emergency preparedness protocols, disaster mitigation planning, and integration of high-reliability public alert & warning mechanisms (IPAWS) across inter-governmental response frameworks.'
      ]
    },
    {
      role: 'Drought Engagement Coordinator',
      org: '[Entity Masked — State Water Resources Control Board, Office of Public Participation]',
      location: '[Location Restricted — California, USA]',
      period: '2019 – 2022',
      badge: 'State Government Leadership',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      isMasked: true,
      points: [
        'Assisted in reviewing and executing the strategic drought management public engagement plan for water resilience.',
        'Led outreach to Environmental Justice (EJ) communities, Disadvantaged Communities (DACs), and Native American Tribal Governments.',
        'Translated complex water resilience regulations into plain-language educational material for diverse stakeholders.',
        'Supported the Safe and Affordable Funding for Equity and Resilience (SAFER) program and tribal affairs initiatives.'
      ]
    },
    {
      role: 'Smart City Program Manager — IoT Telemetry & Urban Environmental Intelligence',
      org: '[Entity Masked — National Smart Cities Mission / Urban Technology Framework]',
      location: '[Location Restricted — Regional Urban Center, India]',
      period: '2017 – 2019',
      badge: 'Smart City Mission & Urban IoT Systems',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      isMasked: true,
      points: [
        'Architected end-to-end IoT sensor architectures for municipal solid waste telemetry, automated smart bin routing, and fill-level geotracking across metropolitan sectors.',
        'Directed advanced smart water metering networks (AMI/AMR), non-revenue water (NRW) loss detection algorithms, and hydraulic transient pressure monitoring.',
        'Engineered distributed ambient noise monitoring arrays and real-time acoustic telemetry grids integrated with municipal environmental compliance dashboards.',
        'Supervised continuous ambient air quality monitoring systems (CAAQMS) measuring PM2.5, PM10, NOx, and SOx, establishing automated urban decision-support alerting.'
      ]
    },
    {
      role: 'Senior Program Manager — Critical Water Infrastructure Resilience',
      org: '[Entity Masked — Ministry of Rural Drinking Water / National Water Authority]',
      location: '[Location Restricted — New Delhi & 7 States]',
      period: '2013 – 2017',
      badge: 'National Flagship Disaster Program',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      isMasked: true,
      points: [
        'Supported and led 600+ multi-disciplinary technical teams spreading across seven states of India.',
        'Administrated national public policy engagement plans, information education & communication (IEC), and capacity building in water resilience.',
        'Directed disaster resilience governance for critical water infrastructure protection, climate resilience action plans, and all-hazard security.',
        'Supervised National Water Quality Monitoring & Surveillance, the National Sub-Mission on Arsenic and Fluoride, and the National Programme on Repair, Renovation and Restoration (RRR) of Water Bodies.',
        'Led management and implementation of GIS-Based Water Infrastructure Asset Indexing and Network Mapping.'
      ]
    },
    {
      role: 'Program Manager — Water Resilience & Disaster Management',
      org: '[Entity Masked — Regional Disaster Management & Resilience Center]',
      location: '[Location Restricted — Regional Center, India]',
      period: '2011 – 2013',
      badge: 'Operational Resilience & Training',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      isMasked: true,
      points: [
        'Developed comprehensive operational framework for water resilience awareness generation, R&D, and community participation.',
        'Trained annually 150 participants at the state level as "Master Trainers" and 2,000 at the district level in "Training of Trainers" modules.',
        'Authored emergency response and Continuity of Operations Plans (COOP) for critical municipal water utilities.',
        'Drafted and audited cyber security policies and procedures for water utilities conducted through sanitary surveys.'
      ]
    },
    {
      role: 'Guest & Visiting Lecturer (Academic Faculty)',
      org: '[Entity Masked — Ministry of Human Resources Development & Academic Consortium]',
      location: '[Location Restricted — Kashmir & Regional Institutions]',
      period: '2001 – 2011',
      badge: 'Academic Teaching & Research',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      isMasked: true,
      points: [
        'Regional Central University (2001–2011): Academic instruction and curriculum design in Disaster Risk Governance and Disaster Management.',
        'Premier Women’s Higher Education Institution (2004–2009): Faculty lecturer in Public Policy and Public Participation in Disaster Management.',
        'State Institute of Public Administration (2005–2009): Advanced executive training in Hazard Zonation Maps, Early Warning Systems, and Critical Water Infrastructure Resilience.',
        'Department of Earth Science (2008–2009): Applications of Geospatial Technologies & GIS in Mountain Disaster Management.',
        'National Space Agency Satellite Tele-Education Platform (2006–2007): Broadcast series on Environmental Policy, Governance, and Sustainable Mountain Development.'
      ]
    },
    {
      role: 'Lead Environmental Consultant — Independent Advisory',
      org: '[Entity Masked — National & State Environmental Programs]',
      location: '[Location Restricted — Regional Project Basins]',
      period: '2001 – 2023',
      badge: 'Consultancy & Field Assessments',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      isMasked: true,
      points: [
        '2023: Kashmir EcoWatch — Conceptualization and development of the platform architecture, data telemetry pipelines, and high-altitude Himalayan environmental observatory framework.',
        '2017–2019: Smart Energy-System Models for municipal water and wastewater utilities under regional urban smart grid initiatives.',
        '2007: Monitoring of Harmful Algal Blooms (HABs) in regional freshwater lakes and aquatic wetland ecosystems.',
        '2005: Post-Disaster Damage Assessment Survey (Earthquake 2005) utilizing satellite remote sensing and geospatial damage modeling.',
        '2004: Founded ESRO (Environment and Service Research Organization) in Kashmir, spearheading regional field studies, wetland audits, and environmental education that laid the foundation for Kashmir EcoWatch.',
        '2003–2004 & 2007: Comprehensive Environmental Impact Assessment (EIA) and Environmental Management Plan (EMP) for major 240 MW mountain hydroelectric infrastructure.',
        '2001–2002: Regional baseline ecological monitoring of climate change vulnerabilities and seasonal alpine shifts.'
      ]
    }
  ];

  // Polymath Dimensions: Sufi Philosophy, Craft Revival, Software Technology & Observatory Stewardship
  const polymathDimensions = [
    {
      domain: 'Sufi Literature, Philosophy & Philanthropy',
      title: 'Sufi Writer & Thinker (Pen Name: Dr. Zarf-e-Noori)',
      tagline: 'Exploring Science, Society, and Sufism',
      period: 'Lifelong Calling & Active Ecosystem',
      badge: 'Spiritual Humanism & Civic Consciousness',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      icon: Feather,
      ecosystem: [
        { name: 'SufiPulse USA', role: 'Global Sufi thought, literary journalism & cultural dialogue', url: 'https://www.sufipulse.com' },
        { name: 'Sufi Science Center USA', role: 'Harmonizing empirical scientific inquiry with inner spiritual consciousness', url: 'https://sufisciencecenter.info/' },
        { name: 'Dr. Kumar Foundation USA', role: 'Philanthropic sponsorship, humanitarian advocacy & civic uplift', url: 'https://dkf.sufisciencecenter.info/' },
        { name: 'SufiTube USA & Studio USA', role: 'Digital video broadcast, multimedia archives & contemplative arts production', url: 'https://www.sufipulse.com' },
        { name: 'SufiPulse Radio USA', role: 'Global audio streaming of Sufi poetry, meditative discourse & discourse', url: 'https://www.sufipulse.com' },
        { name: 'Interfaith Peace Bridge USA', role: 'Multi-faith ecumenical bridge-building and inter-religious concord', url: 'https://ifpb.sufisciencecenter.info/' },
        { name: 'Purple Soul USA', role: 'Mindfulness, soul consciousness & holistic spiritual wellness', url: 'https://purplesoul.shop/' }
      ],
      points: [
        'Prolific philosophical writings and spiritual literature under the literary pen name "Dr. Zarf-e-Noori".',
        'Exploring the unified confluence of empirical earth sciences, social equity, and mystical Kashmir Sufi philosophy.',
        'Founded and stewarded global cultural outreach networks championing universal love, compassion, and communal harmony.',
        'Spearheaded philanthropic programs bridging diaspora communities with indigenous Himalayan civilizational wisdom.'
      ]
    },
    {
      domain: 'Cultural Heritage & Craft Connoisseurship',
      title: 'Himalayan Artisanal Revivalist & Craft Collector',
      tagline: 'Preserving Kashmir’s Civilizational Material Heritage',
      period: 'Cultural Preservation & Ethical Trade',
      badge: 'Living Heritage & Artisan Justice',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: Palette,
      ecosystem: [
        { name: 'Craftlore USA', role: 'Documenting rare artisanal lineages, oral histories, and master artisan genealogies', url: 'https://www.craftlore.org/' },
        { name: 'Kashmir Hamadan Craft Revival Foundation', role: 'Protecting authentic Hamadani Sufi artisanal craft forms', url: 'https://www.khcrf.org/' },
        { name: 'ArtStay USA', role: 'Immersive cultural living, artisan residencies & ethical heritage tourism', url: 'https://kashmirartstay.com/' },
        { name: 'DKC B2B Connect USA', role: 'Global institutional and wholesale bridges for master Kashmiri craftspeople', url: 'https://b2b.dekoshurcrafts.com/' },
        { name: 'De Koshur Crafts USA', role: 'Direct artisan-to-consumer digital commerce ensuring fair living wages', url: 'https://dekoshurcrafts.com/' }
      ],
      points: [
        'Curated landmark collections and documented endangered techniques of Kashmiri Pashmina, Sozni, walnut carving, and papier-mâché.',
        'Established fair-wage economic corridors and sustainable livelihood architectures for traditional craft guilds.',
        'Architected modern direct-to-consumer e-commerce frameworks eliminating predatory middlemen and cultural appropriation.',
        'Spearheading international institutional recognition for authentic GI-tagged Kashmiri handcrafts in global markets.'
      ]
    },
    {
      domain: 'Enterprise Technology & Cloud Systems',
      title: 'Technologist & Enterprise Software Architect',
      tagline: 'Sustainable Digital Infrastructure & Intelligent SaaS Platforms',
      period: 'Enterprise Innovation & CSR Backing',
      badge: 'Software Architecture & Digital Delivery',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      icon: Code,
      ecosystem: [
        { name: 'Prime Logic Solutions USA', role: 'Enterprise software development, cloud infrastructure & KEW CSR developer', url: 'https://primelogicsol.com' },
        { name: 'Environmental Intelligence OS', role: 'Sovereign environmental operating system for state and federal compliance' },
        { name: 'Smart Water Platform', role: 'Hydrological digital twin modeling, smart metering (AMI/AMR), and loss reduction' },
        { name: 'IoT Telemetry Architecture', role: 'Municipal solid waste, ambient noise grids, and urban air quality sensor fabrics' }
      ],
      points: [
        'Architected scalable enterprise software architectures spanning full-stack web systems, cloud infrastructure, and zero-trust delivery.',
        'Engineered specialized software platforms for environmental compliance, regulatory workflow automation, and utility management.',
        'Championed the Corporate Social Responsibility (CSR) pledge that engineered and continuously maintains Kashmir EcoWatch gratis.',
        'Pioneered sensor integration combining low-power IoT telemetry with distributed GIS dashboards for real-time decision making.'
      ]
    }
  ];

  // Comprehensive Categorized Certifications
  const certificationTabs = {
    fema: {
      title: 'Federal Emergency Management Agency (FEMA)',
      badge: 'FEMA APS Certified',
      icon: Shield,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
      items: [
        'Advanced Professional Series (APS) Certification — Complete Credential',
        'IS-553A: Coordination between Water Utilities & Emergency Agencies',
        'IS-1024: Water / Wastewater Treatment Emergency Considerations',
        'IS-800D: National Response Framework (NRF)',
        'IS-700B: National Incident Management System (NIMS)',
        'IS-860C: National Infrastructure Protection Plan (NIPP)',
        'IS-800C, IS-200, IS-100: Incident Command System (ICS) for Initial Response & Command',
        'IS-63B: Geospatial Information Infrastructure',
        'IS-103: Geospatial Information System Specialist',
        'IS-922A: Applications of GIS for Emergency Management',
        'IS-913A: Critical Infrastructure Security and Resilience',
        'IS-921A: Implementing Infrastructure Security & Resilience',
        'IS-915: Protecting Critical Infrastructure Against Insider Threats',
        'IS-870A & IS-871A: Dams Sector Crisis Management & Security Awareness',
        'IS-253A: Environmental & Historic Preservation Review',
        'IS-727: Flood-plains Management & Protection of Wetlands',
        'IS-162: Hazard Mitigation Floodplain Management in Disaster Operations',
        'IS-271A: Anticipating Hazard Weather & Community Risk',
        'IS-329: Mitigation Planning for States',
        'IS-0251: Integrated Public Alert & Warning System (IPAWS) for Administrators',
        'WebEOC Emergency Management Software — Fundamentals & Command Systems'
      ]
    },
    un: {
      title: 'United Nations Organization (UNO) Accreditations',
      badge: '15 Specialized UN Courses',
      icon: Globe,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      items: [
        'UN OCHA / UNEP Environmental Emergencies Centre: FEAT 2.0 (The Flash Environmental Assessment Tool)',
        'Climate Resilient Emergency Water Supply Planning',
        'Global Water Security & Transboundary Freshwater Management',
        'Water Resilient Infrastructure & Sustainable Cities',
        'Integrated Water Resource Management (IWRM) Methodologies',
        'Effectiveness & Compliance of Multilateral Environmental Agreements (MEAs)',
        'Climate Resilient Water Safety Planning (WSP)',
        'International Environmental Law & Environmental Governance',
        'International Legal Framework on Freshwater Resources',
        'Need Assessment for Refugee Emergencies & Humanitarian Relief',
        'WASH (Water, Sanitation and Hygiene) Interventions in Emergency Response',
        'Freshwater Quality Monitoring with Biota & Particulate Matter',
        'Freshwater Quality Monitoring Programme Design & Metric Standardization',
        'Quality Assurance (QA/QC) for Freshwater Quality Monitoring',
        'Water Quality Monitoring in Rivers & Lakes',
        'Water Quality Monitoring & Assessment of Subterranean Groundwater Aquifers'
      ]
    },
    epa: {
      title: 'US EPA, AWWA & Infrastructure Resilience',
      badge: 'Utility Resilience Certified',
      icon: Droplets,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      items: [
        'American Water Works Association (AWWA): Utility Risk and Resilience Certificate Program',
        'AWIA: America’s Water Infrastructure Act of 2018 Compliance',
        'AWWA EL262: Risk & Resilience of Water and Wastewater Systems',
        'AWWA EL264: Emergency Planning & Cybersecurity in the Water Sector',
        'AWWA EL261: Security Practices for Water Utility Operations & Management',
        'US EPA: VSATWeb 2.0/3.0 — Vulnerability Self-Assessment Tool for Water Sector',
        'US EPA: EJScreen (Environmental Justice Screening and Mapping Tool) & EnviroAtlas',
        'US EPA: Risk Assessment & Emergency Response Plan (ERP) Architecture',
        'US EPA: Water / Wastewater All Hazards Boot Camp Training',
        'US EPA: NPDES (National Pollutant Discharge Elimination System)',
        'US EPA: Climate Change Impacts on Water Resources & Antidegradation Policy',
        'US EPA: Storm Water Pollution Prevention Plan (SWPPP) Compliance',
        'Texas A&M Engineering Extension Service (TEEX): Disaster Management for Water & Wastewater Utilities',
        'UC Davis Continuing & Professional Education: CEQA (California Environmental Quality Assessment)'
      ]
    },
    geospatial: {
      title: 'Earth Observation, Remote Sensing & NASA Tools',
      badge: 'NASA ARSET & GIS Specialist',
      icon: Map,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      items: [
        'NASA ARSET: Applied Remote Sensing Training on Harmful Algal Blooms (HABs)',
        'NASA Earth Data Tools to Monitor Cyanobacteria & Limnological Transitions',
        'Geospatial Information System Specialist (FEMA IS-103 & IS-922A)',
        'Geospatial Information Infrastructure (FEMA IS-63B)',
        'GIS-based Water Infrastructure Asset Indexing & Multi-Basin Network Mapping',
        'National Post-Disaster Satellite Remote Sensing Damage Assessment (2005)',
        'ArcGIS, Satellite Imagery Processing, and Digital Elevation Model (DEM) Extraction',
        'High-Resolution Mountain Hazard Susceptibility Mapping (GLOF, Avalanches, Debris Flows)'
      ]
    },
    specialized: {
      title: 'Global Health, Hazmat, OSRL & Specialized Security',
      badge: 'Multi-Agency International',
      icon: Activity,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      items: [
        'National Emergency Response & Recovery Training Center: CBRNE Medical Services (Chemical, Biological, Radiological, Nuclear & High Yield Explosive)',
        'International Atomic Energy Agency (IAEA): Nuclear Security Threats & Risks',
        'Tulane University: Bioterrorism Preparedness & Emerging Infectious Diseases',
        'Tulane University: Infectious Disease Epidemiology, Public Health Surveillance & Transmission Dynamics',
        'University of Maryland Global Campus: Drones & Autonomous Systems in Emergency Management',
        'Oil Spill Response Limited (OSRL): OSCP Oil Spill Contingency Planning & Management',
        'OSRL: OSRA Oil Spill Response Actions, Termination and Demobilization',
        'University of Geneva: Water Resources Management & Policy, International Water Law',
        'University of Alabama: Environmental Sampling & Monitoring in a Disaster, Disaster Sanitation',
        'World Bank Group: Water Footprint Concept & Designing, Water Supply & Sanitation Utility Reform',
        'Water Corporation Australia: Water Auditing for Non-Residential Facilities & Irrigation Efficiency'
      ]
    }
  };

  // Professional Memberships
  const memberships = [
    { name: 'International Association of Emergency Managers (IAEM)', icon: Shield },
    { name: 'UNEP / OCHA Environmental Emergencies Centre', icon: Globe },
    { name: 'United Nations Office for Disaster Risk Reduction (UNDRR)', icon: Activity },
    { name: 'American Water Works Association (AWWA)', icon: Droplets },
    { name: 'Asian Disaster Reduction Center (ADRC)', icon: Map },
    { name: 'Disaster Recovery Institute International (DRII)', icon: Building2 },
    { name: 'Asian Association of Environmental Professionals (AAEP)', icon: Award },
    { name: 'International Association for Disaster Preparedness & Response', icon: ShieldCheck }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Institutional Leadership Hero Surface ──────────────────────────────── */}
      <section className="kew-module-hero-surface relative bg-slate-950 border-b border-white/10 overflow-hidden">
        {/* Subtle institutional grid & ambient gradient (No deer or dramatic photo) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        
        <div className="kew-module-hero-inner container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-medium">Institutional Leadership</span>
          </nav>

          {/* Super-title Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>ABOUT KASHMIR ECOWATCH / LEADERSHIP</span>
          </div>

          {/* Main Heading */}
          <div className="mb-2.5 sm:mb-3"><KewBrandIdentity variant="eyebrow" /></div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4 break-words">
            Institutional Leadership &amp; Scientific Stewardship
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm sm:text-base md:text-lg font-semibold text-emerald-300/90 mb-4 tracking-wide">
            Environmental Governance · Scientific Integrity · Ecological Responsibility
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
            Advancing independent environmental research, geospatial intelligence, disaster resilience and scientific collaboration across the Western Himalaya through responsible institutional leadership and open environmental knowledge.
          </p>

          {/* Two Contextual Navigation Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#founder-governance"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
            >
              <span>Explore Institutional Leadership</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#kashmir-connection"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-emerald-500/30 font-semibold text-xs sm:text-sm transition-all duration-200"
            >
              <Map className="w-4 h-4 text-emerald-400" />
              <span>Research &amp; Field Legacy</span>
            </a>
          </div>

        </div>
      </section>

      {/* ─── Main Content Container ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-12 sm:mt-16">

        {/* ─── Section 1: Executive Profile & Professional Summary ──────────────── */}
        <section id="founder-governance" className="relative scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Founder &amp; Scientific Directorate</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              A Life Dedicated to Water Resilience &amp; Science
            </h2>

            {/* Founder Milestone Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-lg border border-white/10 bg-slate-900/60 flex flex-col justify-between"
                >
                  <span className={`text-xl sm:text-2xl font-black tracking-tight mb-1 ${item.color}`}>
                    {item.value}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white leading-snug">{item.label}</p>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Photo and Badges */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl relative mb-4 bg-slate-800">
                    <Image
                      src="/images/founder-profile.jpg"
                      alt="Mr. Fayaz Ahmad Khan"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Fayaz Ahmad Khan</h3>
                  <p className="text-xs text-emerald-400 font-semibold mb-4">
                    Environmental Emergency Professional & Scientist
                  </p>

                  <div className="w-full p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-left text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Loudoun County, VA, USA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                      <a href="tel:+19166990091" className="hover:text-emerald-400 transition-colors">+1 916 699 0091</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      <a href="mailto:fayaz@kashmir-ecowatch.com" className="truncate hover:text-emerald-400 transition-colors">fayaz@kashmir-ecowatch.com</a>
                    </div>
                  </div>
                </div>

                {/* Narrative Bio */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                    <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed">
                      Mr. Khan is a seasoned environmental emergency specialist and SaaS platform architect with <strong className="text-white font-semibold">over 25 years of progressive and diverse professional experience</strong> in water sector resilience, critical water infrastructure protection, and disaster risk mainstreaming.
                    </p>
                    <p>
                      Throughout his distinguished career, Mr. Khan has supported and led <strong className="text-white">600+ multi-disciplinary technical teams</strong> spreading across seven states as part of large-scale national disaster and emergency water security programs under a designated <strong className="text-white">[Entity Masked — National Water & Critical Infrastructure Authority]</strong>.
                    </p>
                    <p>
                      In the United States, Mr. Khan served as Drought Engagement Coordinator within a designated <strong className="text-white">[Entity Masked — State Water Resources Control Agency]</strong> in California, advancing public participation, tribal affairs, and the SAFER drinking water initiative for disadvantaged and Environmental Justice (EJ) communities during acute drought emergencies.
                    </p>
                    <p>
                      Mr. Khan holds the coveted <strong className="text-emerald-400">Federal Emergency Management Agency (FEMA) Advanced Professional Series (APS) Certification</strong>, along with high-level accreditations across 15 United Nations water security courses, US EPA vulnerability frameworks, AWWA water resilience certifications, and NASA ARSET remote sensing programs.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {['FEMA APS Certified', 'UN OCHA / UNEP FEAT 2.0', 'US EPA EJScreen & VSATWeb', 'AWWA Resilience Specialist', 'NASA ARSET Remote Sensing', 'UC Davis CEQA Certified'].map((badge, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-[4px] bg-slate-800 border border-white/10 text-slate-300 font-medium">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Education & Academic Credentials ───────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Academic Background</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-8">
              Education & Academic Credentials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`glass-panel p-7 sm:p-8 rounded-3xl border ${edu.bg} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                        <edu.icon className={`w-6 h-6 ${edu.color}`} />
                      </div>
                      <span className="text-[11px] font-mono px-3 py-1 rounded-[4px] bg-white/5 border border-white/10 text-slate-300">
                        {edu.period}
                      </span>
                    </div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${edu.color} mb-1`}>
                      {edu.degree}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                      {edu.field}
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {edu.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Professional Work History Timeline ──────────────────────── */}
        <section id="career" className="scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Chronology</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Professional Work History & Leadership
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl mb-12">
              A 25-year track record spanning state environmental governance in California, national drinking water infrastructure programs across India, and academic lecturing in Kashmir.
            </p>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-sky-500 before:to-slate-800">
              {career.map((item, idx) => (
                <div key={idx} className="relative pl-12 md:pl-20">
                  {/* Timeline Node */}
                  <div className="absolute left-2 md:left-6 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 shadow-md shadow-emerald-500/50" />

                  <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/50 hover:border-emerald-500/30 transition-all shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-[4px] border w-fit ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {item.role}
                    </h3>
                    <p className={`text-sm font-semibold mb-1 flex items-center gap-1.5 ${item.isMasked ? 'text-rose-400 font-mono text-xs' : 'text-emerald-300'}`}>
                      {item.isMasked && <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                      <span>{item.org}</span>
                    </p>
                    <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className={item.isMasked ? 'font-mono text-[11px] text-slate-500' : ''}>{item.location}</span>
                    </p>

                    <ul className="space-y-2.5 pt-4 border-t border-white/10">
                      {item.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Polymath Dimensions — Philosophy, Craft Revival & Software Systems ─── */}
        <section id="polymath" className="scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Polymath Dimensions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Science, Spirit, Craft & Technology
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl mb-12">
              Harmonizing 25 years of empirical environmental science with spiritual literature under pen name Dr. Zarf-e-Noori, Himalayan artisanal craft revival, and enterprise SaaS engineering.
            </p>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-amber-500 before:to-sky-500">
              {polymathDimensions.map((item, idx) => (
                <div key={idx} className="relative pl-12 md:pl-20">
                  {/* Timeline Node */}
                  <div className="absolute left-2 md:left-6 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-400 shadow-md shadow-purple-500/50" />

                  <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/50 hover:border-purple-500/30 transition-all shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-[4px] border w-fit ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <item.icon className="w-3.5 h-3.5 text-purple-400" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-purple-300 mb-2">
                      {item.domain} — <span className="italic text-slate-400 font-normal">"{item.tagline}"</span>
                    </p>

                    {/* Ecosystem Hub Grid */}
                    <div className="my-5 p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Active Ecosystem & Strategic Initiatives:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {item.ecosystem.map((eco, eIdx) => (
                          <div key={eIdx} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 font-bold text-white">
                                <span>{eco.name}</span>
                                {eco.url && (
                                  <a 
                                    href={eco.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-0.5"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                              <p className="text-slate-400 text-[11px] leading-tight mt-0.5">{eco.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Core Operational Impacts */}
                    <ul className="space-y-2.5 pt-4 border-t border-white/10">
                      {item.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 5: 50+ Multi-Agency Certifications Explorer ───────────────── */}
        <section id="credentials" className="scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Technical Rigor</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  50+ Federal & International Certifications
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click across categories to inspect verified credentials from FEMA, UN, EPA, NASA, and AWWA.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl overflow-x-auto max-w-full">
                {[
                  { id: 'fema', label: 'FEMA APS' },
                  { id: 'un', label: 'United Nations' },
                  { id: 'epa', label: 'US EPA / AWWA' },
                  { id: 'geospatial', label: 'NASA / GIS' },
                  { id: 'specialized', label: 'Hazmat & Health' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCertTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCertTab === tab.id
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Cert Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCertTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`glass-panel p-8 sm:p-10 rounded-3xl border ${certificationTabs[activeCertTab].bg} bg-slate-900/60 shadow-2xl`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-[4px] border bg-slate-950/60 text-white`}>
                    {certificationTabs[activeCertTab].badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {certificationTabs[activeCertTab].title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {certificationTabs[activeCertTab].items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-white/5">
                      <BadgeCheck className={`w-4 h-4 shrink-0 mt-0.5 ${certificationTabs[activeCertTab].color}`} />
                      <span className="text-xs sm:text-sm text-slate-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Section 5: Landmark Kashmir Fieldwork & Research Projects ─────────── */}
        <section id="kashmir-connection" className="scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Map className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Kashmir Connection</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Landmark Kashmir Research & Field Projects
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-3xl mt-1">
                  Chronological registry of 17 foundational field investigations, environmental impact assessments, geospatial inventories, and climate studies executed in the Kashmir Himalayas (2001–2007).
                </p>
              </div>

              {/* View Mode Toggle: All 17 vs Curated Featured */}
              <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-900 border border-white/10 shrink-0 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setProjectDisplayMode('all')}
                  className={`px-3 py-1 rounded-sm text-xs font-semibold transition-all ${
                    projectDisplayMode === 'all'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All 17 Chronological
                </button>
                <button
                  type="button"
                  onClick={() => setProjectDisplayMode('featured')}
                  className={`px-3 py-1 rounded-sm text-xs font-semibold transition-all ${
                    projectDisplayMode === 'featured'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Featured Landmark (6)
                </button>
              </div>
            </div>


            {/* Interactive Filter and Search Bar */}
            <div className="p-3 sm:p-4 rounded-lg bg-slate-900/60 border border-white/10 mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                {[
                  { id: 'All', label: 'All Projects (17)' },
                  { id: 'Water & Limnology', label: 'Water & Limnology (4)' },
                  { id: 'EIA & Industry', label: 'EIA & Industry (4)' },
                  { id: 'Geospatial & GIS', label: 'Geospatial & GIS (3)' },
                  { id: 'Wildlife & Habitats', label: 'Wildlife (2)' },
                  { id: 'Waste Management', label: 'Waste Streams (2)' },
                  { id: 'Tourism Sustainability', label: 'Tourism & Ecology (2)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProjectFilterCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-sm text-xs font-medium whitespace-nowrap transition-all ${
                      projectFilterCategory === cat.id
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px] md:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by keyword, topic, year..."
                  value={projectSearchQuery}
                  onChange={(e) => setProjectSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs bg-slate-950 border border-white/10 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

            </div>

            {/* ─── 17 Projects Grid ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  id: 1,
                  year: '2001 – 2002',
                  tag: 'Climate Science',
                  category: 'Geospatial & GIS',
                  title: 'Baseline Monitoring of Climate Change in Kashmir',
                  org: '[Regional Ecological Research & Forest Consortium]',
                  desc: 'Established early empirical baselines tracking seasonal temperature shifts, snowfall anomalies, and phenological signals across the Kashmir Valley.',
                  color: 'text-sky-400',
                  featured: true
                },
                {
                  id: 2,
                  year: '2003 – 2004 & 2007',
                  tag: 'Hydro Impact',
                  category: 'EIA & Industry',
                  title: 'Uri-II (240 MW) Hydroelectric Project EIA & EMP Monitoring',
                  org: '[National Hydroelectric Power Authority]',
                  desc: 'Executed Environmental Impact Assessment (EIA) and subsequent Environmental Management Plan (EMP) monitoring along the Jhelum River gorge drainage basin.',
                  color: 'text-amber-400',
                  featured: true
                },
                {
                  id: 3,
                  year: '2004',
                  tag: 'Aquatic Ecology',
                  category: 'Water & Limnology',
                  title: 'Mechanical Deweeding and Its Ecological Impact on Dal Lake',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Assessed ecological impacts of mechanical deweeding on aquatic vegetation, sediment disturbance, nutrient cycling, and water quality across Dal Lake.',
                  color: 'text-teal-400',
                  featured: false
                },
                {
                  id: 4,
                  year: '2004 – 2005',
                  tag: 'Environmental Assessment',
                  category: 'Water & Limnology',
                  title: 'Environmental Degradation of the Dal Lake Hinterland',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Investigated land-use changes, wastewater discharge, encroachment, and ecological degradation affecting Dal Lake\'s surrounding catchment and freshwater ecosystems.',
                  color: 'text-emerald-400',
                  featured: false
                },
                {
                  id: 5,
                  year: '2004 – 2006',
                  tag: 'Geospatial Wetlands',
                  category: 'Geospatial & GIS',
                  title: 'Digital Inventory and GIS Mapping of Kashmir Wetlands',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Developed geospatial inventories of Kashmir\'s lakes and wetlands using satellite imagery, GIS classification, and ecological assessment of changing wetland boundaries.',
                  color: 'text-sky-400',
                  featured: true
                },
                {
                  id: 6,
                  year: '2005',
                  tag: 'Satellite GIS',
                  category: 'Geospatial & GIS',
                  title: 'Post-Disaster Remote Sensing Survey — Kashmir Earthquake 2005',
                  org: '[Designated National Planning & Reconstruction Authority]',
                  desc: 'Executed comprehensive satellite remote sensing damage assessments across affected mountain terrain following the catastrophic 7.6 magnitude Kashmir earthquake.',
                  color: 'text-rose-400',
                  featured: true
                },
                {
                  id: 7,
                  year: '2005',
                  tag: 'Tourism EIA',
                  category: 'EIA & Industry',
                  title: 'Environmental Impact Assessment of the Gulmarg Gondola',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Evaluated environmental impacts of gondola infrastructure, tourism development, vegetation disturbance, and landscape modification within the ecologically sensitive Gulmarg mountain ecosystem.',
                  color: 'text-amber-400',
                  featured: false
                },
                {
                  id: 8,
                  year: '2005',
                  tag: 'Lake Sedimentation',
                  category: 'Water & Limnology',
                  title: 'Assessment of Dal Lake Settling Basins and Sediment Dynamics',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Examined sediment accumulation, catchment runoff, nutrient deposition, and settling basin performance influencing Dal Lake\'s water quality and ecological health.',
                  color: 'text-teal-300',
                  featured: false
                },
                {
                  id: 9,
                  year: '2005 – 2006',
                  tag: 'Waste Management',
                  category: 'Waste Management',
                  title: 'Solid Waste Generation and Management in Kashmir Division',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Assessed municipal solid waste generation, collection systems, disposal practices, and associated environmental pressures across urban and rural Kashmir Division.',
                  color: 'text-rose-400',
                  featured: false
                },
                {
                  id: 10,
                  year: '2005 – 2006',
                  tag: 'Wildlife Ecology',
                  category: 'Wildlife & Habitats',
                  title: 'Assessment of Human–Wildlife Conflict in Kashmir',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Investigated human–wildlife interactions, habitat encroachment, forest-edge settlements, and emerging conflict patterns affecting communities and wildlife conservation across Kashmir.',
                  color: 'text-emerald-300',
                  featured: false
                },
                {
                  id: 11,
                  year: '2006',
                  tag: 'Biomedical Waste',
                  category: 'Waste Management',
                  title: 'Biomedical Waste Generation and Management in Kashmir Division',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Investigated healthcare waste generation, segregation, treatment, disposal infrastructure, and environmental health risks associated with medical facilities across Kashmir Division.',
                  color: 'text-red-400',
                  featured: false
                },
                {
                  id: 12,
                  year: '2006',
                  tag: 'Industrial Ecology',
                  category: 'EIA & Industry',
                  title: 'Cement Industry Emissions and Their Impact on Kashmir Saffron',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Assessed cement-industry emissions, particulate deposition, soil contamination pathways, and potential impacts on saffron cultivation across Kashmir\'s traditional agricultural landscapes.',
                  color: 'text-amber-300',
                  featured: false
                },
                {
                  id: 13,
                  year: '2006 – 2007',
                  tag: 'Cumulative EIA',
                  category: 'EIA & Industry',
                  title: 'Cumulative Environmental Impacts of Hydropower Dams in Kashmir',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Examined cumulative hydrological alteration, river fragmentation, sediment transport, and ecosystem impacts associated with hydropower development across Kashmir\'s river basins.',
                  color: 'text-cyan-400',
                  featured: false
                },
                {
                  id: 14,
                  year: '2006 – 2007',
                  tag: 'Wildlife GIS',
                  category: 'Wildlife & Habitats',
                  title: 'Digital Mapping of Kashmir Wildlife Corridors',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Mapped wildlife movement corridors, habitat connectivity, forest fragmentation, and ecological passage networks using satellite remote sensing and GIS technologies.',
                  color: 'text-green-400',
                  featured: false
                },
                {
                  id: 15,
                  year: '2007',
                  tag: 'Limnology',
                  category: 'Water & Limnology',
                  title: 'Monitoring Harmful Algal Blooms in Fresh Waters of Kashmir',
                  org: '[State Directorate of Environment & Remote Sensing]',
                  desc: 'Pioneered early limnological and satellite-assisted tracking of cyanobacteria and algal bloom outbreaks across Dal, Wular, and freshwater wetland systems.',
                  color: 'text-emerald-400',
                  featured: true
                },
                {
                  id: 16,
                  year: '2007',
                  tag: 'Tourism Ecology',
                  category: 'Tourism Sustainability',
                  title: 'Environmental Impacts of Tourism and Allied Services in Kashmir',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Evaluated environmental pressures from tourism infrastructure, accommodation services, transportation, waste generation, and recreational activities across Kashmir\'s major destinations.',
                  color: 'text-yellow-400',
                  featured: false
                },
                {
                  id: 17,
                  year: '2007',
                  tag: 'Tourism Sustainability',
                  category: 'Tourism Sustainability',
                  title: 'Assessment of Tourism Carrying Capacity in Kashmir',
                  org: '[Environment and Service Research Organization (ESRO)]',
                  desc: 'Assessed tourism carrying capacity, visitor pressure, ecological sensitivity, infrastructure limitations, and sustainable destination management across Kashmir\'s principal tourism landscapes.',
                  color: 'text-orange-400',
                  featured: true
                }
              ]
                .filter(p => {
                  if (projectDisplayMode === 'featured' && !p.featured) return false;
                  if (projectFilterCategory !== 'All' && p.category !== projectFilterCategory) return false;
                  const q = projectSearchQuery.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    p.title.toLowerCase().includes(q) ||
                    p.desc.toLowerCase().includes(q) ||
                    p.tag.toLowerCase().includes(q) ||
                    p.year.toLowerCase().includes(q) ||
                    p.org.toLowerCase().includes(q)
                  );
                })
                .map((proj) => (
                  <div
                    key={proj.id}
                    className="glass-panel p-5 sm:p-6 rounded-lg border border-white/10 bg-slate-900/50 flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className={`text-xs sm:text-sm font-black font-mono ${proj.color}`}>
                          {proj.year}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-slate-300 uppercase tracking-wider">
                          {proj.tag}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug group-hover:text-emerald-300 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-emerald-400/90 mb-2.5 font-mono">
                        {proj.org}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Ref #{String(proj.id).padStart(2, '0')} · {proj.category}</span>
                      <span className="text-emerald-400/80">Archival Record</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Bottom Citation & Indexing Note */}
            <div className="mt-8 p-4 rounded-lg bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>17 Landmark Kashmir Research &amp; Field Studies Cataloged (2001–2007)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Environment and Service Research Organization (ESRO) Historical Series
              </span>
            </div>

          </div>
        </section>

        {/* ─── Section 6: Institutional Memberships & Global Standing ───────────── */}
        <section>
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Professional Networks</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Institutional Memberships & Standing
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {memberships.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center gap-3">
                  <m.icon className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium leading-snug">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 7: Strategic Role at Kashmir EcoWatch ────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Founder Stewardship</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Mr. Khan’s Role at Kashmir EcoWatch
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                How 25 years of multi-agency disaster preparedness and water governance shapes the architecture of KEW.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Architect of the Knowledge Return System',
                  desc: 'Championing the repatriation of Western Himalayan ecological datasets back to local researchers, youth, and communities without commercial barriers.',
                  icon: Compass,
                  color: 'text-emerald-400'
                },
                {
                  title: 'Scientific Integrity & Verification Oversight',
                  desc: 'Ensuring that every telemetry pipeline and citizen science record adheres to international FAIR data principles and rigorous QA/QC standards.',
                  icon: ShieldCheck,
                  color: 'text-sky-400'
                },
                {
                  title: 'Water Sector & Critical Infrastructure Resilience',
                  desc: 'Applying AWWA, FEMA, and US EPA methodologies to model drinking water aquifers, spring-sheds, and dam security across Kashmir.',
                  icon: Droplets,
                  color: 'text-blue-400'
                },
                {
                  title: 'Emergency Preparedness & Early Warning Telemetry',
                  desc: 'Designing real-time hazard modules for avalanches, GLOFs, earthquakes, and flash floods to safeguard vulnerable mountain populations.',
                  icon: Activity,
                  color: 'text-rose-400'
                }
              ].map((role, idx) => (
                <div key={idx} className="glass-panel p-7 rounded-2xl border border-white/10 bg-slate-900/50 flex gap-5 items-start">
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/10 shrink-0 mt-1">
                    <role.icon className={`w-6 h-6 ${role.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{role.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 8: The Founder's Purpose & Diaspora Knowledge Return ─────── */}
        <section id="founders-purpose" className="scroll-mt-24">
          <div className="max-w-3xl mx-auto p-8 sm:p-12 md:p-16 rounded-lg bg-slate-900/60 border border-white/10 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                The Founder&apos;s Purpose
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              Giving Back to the Land Where the Journey Began
            </h2>

            <p className="text-sm sm:text-base font-semibold text-emerald-300/90 mb-8 leading-snug">
              A Diaspora Commitment to Environmental Knowledge, Scientific Responsibility and the Western Himalaya
            </p>

            {/* Editorial Essay Column */}
            <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              
              <p>
                The founder of Kashmir EcoWatch is no longer a citizen or state subject of the region that this platform serves. His professional life and responsibilities are now based in the United States. He holds no governmental position, exercises no public authority, and does not seek political representation or institutional influence in the Western Himalaya.
              </p>

              <p className="text-slate-200 font-medium">
                Yet Kashmir remains the place where his relationship with environmental science first took shape.
              </p>

              <p>
                Its mountains, forests, rivers, wetlands and changing seasons were not merely subjects of academic study. They were the landscapes through which he developed an enduring curiosity about the natural world and an appreciation for the delicate relationship between human communities and their environment.
              </p>

              <p>
                Over subsequent decades, his professional journey carried him beyond Kashmir, into environmental research, water resilience, geospatial technologies, disaster preparedness and scientific systems development.
              </p>

              {/* Central Knowledge-Return Typographic Blockquote */}
              <div className="my-8 pl-5 sm:pl-7 border-l-2 border-emerald-400 py-1 bg-emerald-500/[0.03] rounded-r-lg">
                <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                  Kashmir gave him the beginnings of his environmental knowledge. Kashmir EcoWatch represents his commitment to returning that knowledge.
                </p>
              </div>

              <p>
                The platform was conceived as an independent, non-commercial contribution from the diaspora, using accumulated scientific experience and digital capabilities to make environmental information, ecological research and hazard intelligence more accessible to the communities, researchers, students and institutions of the Western Himalaya.
              </p>

              <p>
                It is not an attempt to reclaim citizenship, authority, professional standing or influence in a region where he no longer resides or works.
              </p>

              <p className="text-slate-200 font-medium">
                It is an expression of gratitude.
              </p>

              <p>
                A belief that knowledge acquired through one&apos;s birthplace should not become inaccessible to that birthplace simply because life has taken its people elsewhere.
              </p>

              <p>
                Kashmir EcoWatch therefore stands on a principle of <strong className="text-white font-semibold">knowledge return rather than personal recognition</strong>, connecting scientific experience gained abroad with the environmental needs of the region where that intellectual journey began.
              </p>

              <p>
                Its purpose is to serve the Western Himalaya through open environmental knowledge, independent scientific inquiry, collaborative research and public-interest ecological intelligence, without distinction of political boundaries, nationality or institutional affiliation.
              </p>

              <p>
                The founder&apos;s contribution is not defined by where he lives today, what citizenship he holds, or whether he possesses any official standing in the region.
              </p>

              <p>
                It is defined by a continuing responsibility toward the landscapes that first inspired his understanding of environmental science.
              </p>

              {/* Callout Statement */}
              <div className="p-4 sm:p-5 rounded-md bg-slate-950/80 border border-white/10 my-6">
                <p className="text-sm sm:text-base font-bold text-emerald-300 leading-snug text-center">
                  He may no longer belong to Kashmir through citizenship or residence. But his commitment to its environment does not depend on either.
                </p>
              </div>

            </div>

            {/* Restrained Institutional Footer */}
            <div className="mt-10 pt-6 border-t border-white/10 text-center">
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-400 font-semibold">
                Knowledge Returned · Responsibility Continued · Recognition Unnecessary
              </p>
            </div>

          </div>
        </section>

        {/* ─── Section 9: Connect & Explore Further ──────────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-slate-900 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Institutional Collaboration</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Connect with Mr. Khan
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                For academic research partnerships, water resilience collaborations, emergency management consultations, or platform inquiries.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/about/contact"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Institutional Message</span>
                </Link>
                <Link
                  href="/about/methodology"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/30 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Read Scientific Methodology</span>
                </Link>
                <Link
                  href="/about/mission"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all flex items-center gap-2"
                >
                  <span>Our 2026–2030 Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
