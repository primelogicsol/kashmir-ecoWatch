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
  ShieldCheck, Calendar
} from 'lucide-react';

export default function FounderPage() {
  const [activeCertTab, setActiveCertTab] = useState<'fema' | 'un' | 'epa' | 'geospatial' | 'specialized'>('fema');

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
      degree: "Master's Degree (M.Sc.)",
      period: '1999 – 2001',
      field: 'Environmental Sciences',
      institution: 'School for Environmental Science, University of Jammu, India',
      specialization: 'Specialization: Environmental Disaster Management',
      icon: Microscope,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      degree: 'Post-Graduate Qualification',
      period: 'Advanced Professional',
      field: 'Environmental Geospatial Information Science',
      institution: 'Earth Observation & Spatial-Temporal Vulnerability Modeling',
      specialization: 'Focus: High-altitude mountain hydrology and satellite remote sensing',
      icon: Map,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      degree: 'Graduate Diploma',
      period: 'Systems Architecture',
      field: 'Computer Applications (GDCA)',
      institution: 'Database Architecture & Software Systems',
      specialization: 'Hands-on in SQL Server, GIS spatial databases, and digital architectures',
      icon: Server,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      degree: 'Professional Diploma',
      period: 'Communications Engineering',
      field: 'Digital Communications',
      institution: 'Emergency Communications & Public Information Networks',
      specialization: 'Crisis warning dissemination, single-objective worksheets & public outreach',
      icon: Shield,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    }
  ];

  // Career History Timeline
  const career = [
    {
      role: 'Drought Engagement Coordinator AGPA (Tenure Based)',
      org: 'California State Water Resources Control Board, Office of Public Participation',
      location: 'Sacramento, California, USA',
      period: 'Sept 2021 – Jan 2022',
      badge: 'State Government Leadership',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      points: [
        'Assisted in reviewing and executing the strategic drought management public engagement plan for water resilience.',
        'Led outreach to Environmental Justice (EJ) communities, Disadvantaged Communities (DACs), and Native American Tribal Governments.',
        'Translated complex water resilience regulations into plain-language educational material for diverse stakeholders.',
        'Supported the Safe and Affordable Funding for Equity and Resilience (SAFER) program and tribal affairs initiatives.'
      ]
    },
    {
      role: 'Senior Program Manager — Critical Water Infrastructure Resilience',
      org: 'Ministry of Rural Drinking Water, Government of India',
      location: 'National HQ, New Delhi & 7 States',
      period: '2013 – 2019',
      badge: 'National Flagship Disaster Program',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
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
      org: 'WEMTEP KransuQb Disaster Management Center',
      location: 'Regional Center, India',
      period: '2009 – 2013',
      badge: 'Operational Resilience & Training',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      points: [
        'Developed comprehensive operational framework for water resilience awareness generation, R&D, and community participation.',
        'Trained annually 150 participants at the state level as "Master Trainers" and 2,000 at the district level in "Training of Trainers" modules.',
        'Authored emergency response and Continuity of Operations Plans (COOP) for critical municipal water utilities.',
        'Drafted and audited cyber security policies and procedures for water utilities conducted through sanitary surveys.'
      ]
    },
    {
      role: 'Guest & Visiting Lecturer (Academic Faculty)',
      org: 'Ministry of Human Resources Development, Government of India & Premier Universities',
      location: 'Kashmir & New Delhi, India',
      period: '2001 – 2009',
      badge: 'Academic Teaching & Research',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      points: [
        'Central University of Kashmir (2001–2009): Disaster Risk Governance and Disaster Management.',
        'Govt. College for Women, Srinagar (2004–2009): Public Policy and Public Participation in Disaster Management.',
        'Institute of Public Administration & Rural Development (2005–2009): Hazard Zonation Maps, Early Warning Systems, and Critical Water Infrastructure Resilience.',
        'Govt. College for Women, Srinagar (2008–2009): Applications of Geospatial Technologies in Disaster Management.',
        'ISRO EDUSAT / GSAT-3 Satellite Platform (2006–2007): Environmental Policy, Governance and Sustainable Development via satellite tele-education.'
      ]
    },
    {
      role: 'Lead Environmental Consultant — Independent Advisory',
      org: 'National & State Environmental Programs',
      location: 'Kashmir, New Delhi, Rajasthan',
      period: '2001 – 2016',
      badge: 'Consultancy & Field Assessments',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      points: [
        '2005: Post-Disaster Assessment Survey of Kashmir (Earthquake 2005) using Remote Sensing under the aegis of the Planning Commission of India.',
        '2007: Monitoring of Harmful Algal Blooms (HABs) in fresh waters of Kashmir with Directorate of Environment, Ecology and Remote Sensing, Govt. of Kashmir.',
        '2001–2002: Regional baseline monitoring of Climate Change in Kashmir.',
        '2003–2004 & 2007: Environmental Impact Assessment (EIA) & Environmental Management Plan (EMP) for Uri-II (240 MW Hydroelectric Project) with NHPC.',
        '2017–2019: Smart Energy-System Models for water and wastewater utilities under Kota Smart City Project (Ministry of Power).'
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
        'Planning Commission of India 2005 Post-Disaster Satellite Remote Sensing Assessment',
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
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Award className="w-5 h-5 text-emerald-400" />}
        label="Honorary Director & Founder Profile"
        title="Western Himalayan Dr. Fayaz Ahmad Khan"
        subtitle="Kashmiri-American environmental scientist, SaaS platform architect, and disaster resilience professional with 25+ years of progressive leadership."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Founder Leadership' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#career"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Professional Work History</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#credentials"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/40 font-semibold text-sm transition-all duration-300 backdrop-blur-md"
            >
              <span>50+ Certifications</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </a>
            <Link
              href="/about/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Contact Dr. Khan</span>
            </Link>
          </div>
        }
      />

      {/* ─── Macro Executive Stats Banner ───────────────────────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-10 mb-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xl"
            >
              <span className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${item.color}`}>
                {item.value}
              </span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">{item.label}</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Main Content Container ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ─── Section 1: Executive Profile & Professional Summary ──────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Executive Summary</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              A Life Dedicated to Water Resilience & Science
            </h2>

            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Photo and Badges */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl relative mb-4 bg-slate-800">
                    <Image
                      src="/images/founder-profile.jpg"
                      alt="Dr. Fayaz Ahmad Khan"
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
                      Dr. Fayaz Ahmad Khan is a seasoned environmental emergency specialist and SaaS platform architect with <strong className="text-white font-semibold">over 25 years of progressive and diverse professional experience</strong> in water sector resilience, critical water infrastructure protection, and disaster risk mainstreaming.
                    </p>
                    <p>
                      Throughout his distinguished career, Dr. Khan has supported and led <strong className="text-white">600+ multi-disciplinary technical teams</strong> spreading across seven states of India as part of large-scale national disaster and emergency water security programs under the Ministry of Rural Drinking Water, Government of India.
                    </p>
                    <p>
                      In the United States, Dr. Khan served as Drought Engagement Coordinator with the <strong className="text-white">California State Water Resources Control Board</strong> in Sacramento, advancing public participation, tribal affairs, and the SAFER drinking water initiative for disadvantaged and Environmental Justice (EJ) communities during acute drought emergencies.
                    </p>
                    <p>
                      Dr. Khan holds the coveted <strong className="text-emerald-400">Federal Emergency Management Agency (FEMA) Advanced Professional Series (APS) Certification</strong>, along with high-level accreditations across 15 United Nations water security courses, US EPA vulnerability frameworks, AWWA water resilience certifications, and NASA ARSET remote sensing programs.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {['FEMA APS Certified', 'UN OCHA / UNEP FEAT 2.0', 'US EPA EJScreen & VSATWeb', 'AWWA Resilience Specialist', 'NASA ARSET Remote Sensing', 'UC Davis CEQA Certified'].map((badge, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-300 font-medium">
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
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
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
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border w-fit ${item.badgeColor}`}>
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
                    <p className="text-sm font-semibold text-emerald-300 mb-1">
                      {item.org}
                    </p>
                    <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.location}</span>
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

        {/* ─── Section 4: 50+ Multi-Agency Certifications Explorer ───────────────── */}
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
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border bg-slate-950/60 text-white`}>
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
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Map className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Kashmir Connection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Landmark Kashmir Research & Field Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mb-8">
              Pioneering remote sensing assessments, limnological studies, and climate monitoring across the Kashmir Himalayas over two decades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  year: '2005',
                  title: 'Post-Disaster Remote Sensing Survey — Kashmir Earthquake 2005',
                  org: 'Under the aegis of the Planning Commission of India',
                  desc: 'Executed comprehensive satellite remote sensing damage assessments across affected mountain terrain following the catastrophic 7.6 magnitude Kashmir earthquake.',
                  tag: 'Satellite GIS',
                  color: 'text-rose-400'
                },
                {
                  year: '2007',
                  title: 'Monitoring Harmful Algal Blooms in Fresh Waters of Kashmir',
                  org: 'Directorate of Environment, Ecology and Remote Sensing, Govt. of Kashmir',
                  desc: 'Pioneered early limnological and satellite-assisted tracking of cyanobacteria and algal bloom outbreaks across Dal, Wular, and freshwater wetland systems.',
                  tag: 'Limnology',
                  color: 'text-emerald-400'
                },
                {
                  year: '2001 – 2002',
                  title: 'Baseline Monitoring of Climate Change in Kashmir',
                  org: 'Directorate of Environment & Forest Research Collaborations',
                  desc: 'Established early empirical baselines tracking seasonal temperature shifts, snowfall anomalies, and phenological signals across the Kashmir Valley.',
                  tag: 'Climate Science',
                  color: 'text-sky-400'
                },
                {
                  year: '2003 – 2004 & 2007',
                  title: 'Uri-II (240 MW) Hydroelectric Project EIA & EMP Monitoring',
                  org: 'National Hydroelectric Power Corporation (NHPC)',
                  desc: 'Executed Environmental Impact Assessment (EIA) and subsequent Environmental Management Plan (EMP) monitoring along the Jhelum River gorge drainage basin.',
                  tag: 'Hydro Impact',
                  color: 'text-amber-400'
                }
              ].map((proj, idx) => (
                <div key={idx} className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 bg-slate-900/40 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-base font-black ${proj.color}`}>{proj.year}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 uppercase">
                        {proj.tag}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">{proj.title}</h3>
                    <p className="text-xs font-semibold text-slate-400 mb-3">{proj.org}</p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{proj.desc}</p>
                  </div>
                </div>
              ))}
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
                Dr. Khan’s Role at Kashmir EcoWatch
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

        {/* ─── Section 8: Connect & Explore Further ──────────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Institutional Collaboration</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Connect with Dr. Fayaz Ahmad Khan
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                For academic research partnerships, water resilience collaborations, emergency management consultations, or platform inquiries.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/about/contact"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
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
