'use client';

import React from 'react';
import Image from 'next/image';
import { Heading } from '@/components/common/Heading';
import { 
  GraduationCap, Award, Briefcase, Shield, Map, 
  Globe, Users, Microscope, BookOpen, Activity, 
  Droplets, Server, Compass, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function FounderPage() {
  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '600+', label: 'Technical Teams Led' },
    { value: '50+', label: 'Certifications' }
  ];

  const education = [
    {
      degree: 'PhD',
      field: 'Environmental Geospatial Information Science',
      desc: 'Earth Observation & Spatial-Temporal Modeling',
      icon: Microscope,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      degree: 'Master of Science',
      field: 'Environmental Sciences',
      desc: 'Core academic credential in environmental studies',
      icon: Globe,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      degree: 'Post Graduate',
      field: 'Computer Applications',
      desc: 'Software and systems architecture',
      icon: Server,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      degree: 'Post Graduate',
      field: 'Disaster Management',
      desc: 'Hazard assessment and resilience planning',
      icon: Shield,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    }
  ];

  const expertise = [
    {
      title: 'Emergency & Disaster Management',
      icon: Activity,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
      items: [
        'FEMA Advanced Professional Series (APS)',
        'National Response Framework (IS-800D)',
        'National Incident Management System (IS-700B)',
        'Incident Command System (IS-800C, IS-200, IS-100)',
        'Texas A&M Disaster Management for Water Utilities',
        'CBRNE Medical Services & High-Yield Explosive',
        'Oil Spill Contingency & Response (OSRL)'
      ]
    },
    {
      title: 'Water Systems & Critical Infrastructure',
      icon: Droplets,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      items: [
        'AWWA Utility Risk & Resilience Certificate',
        'AWWA Emergency Planning & Cybersecurity',
        'EPA VSAT Vulnerability Analysis',
        'EPA NPDES & Storm Water Pollution Prevention',
        'World Bank Water Supply & Sanitation Reform',
        'Water Corporation Australia Auditing',
        'Dams Sector Crisis Management (IS-870A)'
      ]
    },
    {
      title: 'Geospatial Science & Remote Sensing',
      icon: Map,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      items: [
        'NASA ARSET: Remote Sensing for HABs',
        'GIS Specialist (IS-103) & Applications (IS-922A)',
        'Geospatial Information Infrastructure (IS-63B)',
        'Critical Infrastructure Security (IS-913A)',
        'UC Davis CEQA Assessment',
        'EPA EnviroAtlas & EJ Screen'
      ]
    },
    {
      title: 'Global Policy, Environment & Health',
      icon: Globe,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      items: [
        'United Nations: 15 Courses in Water Security & Climate Resilience',
        'International Water Law & Policy (Univ. of Geneva)',
        'Infectious Disease Epidemiology & Management (Tulane)',
        'Nuclear Security Threats & Risks (IAEA)',
        'Drones & Autonomous Systems in Emergency Management'
      ]
    }
  ];

  const academia = [
    { period: '2001-2009', title: 'Disaster Risk Governance', org: 'Central University of Kashmir' },
    { period: '2004-2009', title: 'Public Policy & Public Participation', org: 'Govt. College for Women, Srinagar' },
    { period: '2005-2009', title: 'Environmental Hazards & Disaster Management', org: 'Institute of Public Administration & Rural Development' },
    { period: '2008-2009', title: 'Applications of Geospatial Technologies', org: 'Govt. College for Women, Srinagar' }
  ];

  const projects = [
    { year: '2005', title: 'Post-Disaster Assessment Survey of Kashmir (Earthquake 2005)', desc: 'Remote-sensing based damage assessment under the aegis of the Planning Commission of India.' },
    { year: '2007', title: 'Monitoring of Harmful Algal Blooms in Fresh Waters', desc: 'In association with the Directorate of Environment, Ecology and Remote Sensing, Govt of Kashmir.' },
    { year: '2001-2002', title: 'Monitoring of Climate Change in Kashmir', desc: 'Regional climate monitoring and baseline assessment.' }
  ];

  const visionRoles = [
    { title: 'Platform Vision & Direction', desc: 'Strategic direction, institutional partnerships, and long-term vision for Kashmir EcoWatch as a public-interest environmental intelligence platform.' },
    { title: 'Scientific Integrity Oversight', desc: 'Ensuring all environmental data, analysis, and reporting meet rigorous scientific standards with transparent methodology drawn from 25+ years of FEMA, EPA, and UN-certified expertise.' },
    { title: 'Critical Infrastructure Resilience', desc: 'Applying FEMA APS certification, IS-913A/921A infrastructure security training, and AWWA Utility Risk & Resilience Certificate to Kashmir water infrastructure protection.' },
    { title: 'Emergency Response Coordination', desc: 'Leveraging 600+ multi-disciplinary team leadership experience for Kashmir environmental emergency preparedness.' }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Dr. Fayaz Ahmad Khan</span>
          </>}
        subtitle="Honorary Director & Founder"
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
          
          {/* Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">Overview</h2>
            <h3 className="text-3xl font-black text-white mb-6">Professional Profile</h3>
            
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl relative">
                <Image 
                  src="/images/founder-profile.jpg"
                  alt="Dr. Fayaz Ahmad Khan"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light mb-6">
                  Dr. Fayaz Ahmad Khan is a Kashmiri-American environmental scientist, remote sensing specialist, and SaaS platform architect with over 25 years of progressive experience leading teams in water sector resilience and critical infrastructure protection.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  He has supported and led 600+ multi-disciplinary technical teams as part of large-scale national flagship disaster and emergency programs. His expertise spans complex national water policy, disaster risk mainstreaming, and geospatial vulnerability assessment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <div className="mb-20">
            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">Education</h2>
            <h3 className="text-3xl font-black text-white mb-6">Education & Academic Qualifications</h3>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Core academic credentials in geospatial science, environmental studies, computer applications, and disaster management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, idx) => (
                <div key={idx} className={`glass-panel p-8 rounded-2xl border ${edu.bg} flex gap-6 items-start`}>
                  <edu.icon className={`w-8 h-8 ${edu.color} shrink-0`} />
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-wider ${edu.color} mb-1`}>{edu.degree}</h4>
                    <h5 className="text-xl font-bold text-white mb-2">{edu.field}</h5>
                    <p className="text-sm text-slate-400">{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-20">
            <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">Expertise</h2>
            <h3 className="text-3xl font-black text-white mb-6">Core Competencies & Certifications</h3>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Strategic capabilities and operational readiness validated through more than 50 advanced credentials and high-level institutional engagements with FEMA, the United Nations, EPA, NASA, and the World Bank.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {expertise.map((exp, idx) => (
                <div key={idx} className={`glass-panel p-8 sm:p-10 rounded-3xl border ${exp.bg} flex flex-col h-full hover:shadow-2xl hover:shadow-${exp.color.split('-')[1]}-500/10 transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl bg-slate-950/50 border border-white/5 shadow-inner`}>
                      <exp.icon className={`w-8 h-8 ${exp.color}`} />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">{exp.title}</h4>
                  </div>
                  <ul className="space-y-4 flex-1 flex flex-col justify-start">
                    {exp.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-900/40 transition-colors border border-transparent hover:border-white/5">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${exp.color} opacity-80`} />
                        <span className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Impact */}
          <div className="mb-20">
            <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">Regional Impact</h2>
            <h3 className="text-3xl font-black text-white mb-10">Kashmir Connection — Academic & Consultancy</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-400" /> Academic Teaching (2001-2009)
                </h4>
                <div className="space-y-6">
                  {academia.map((item, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 to-transparent rounded-l-2xl" />
                      <div className="text-xs font-bold text-purple-400 mb-2 tracking-wider">{item.period}</div>
                      <h5 className="text-lg font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-400">{item.org}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-sky-400" /> Key Consultancy Projects
                </h4>
                <div className="space-y-6">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500/50 to-transparent rounded-l-2xl" />
                      <div className="text-xs font-bold text-sky-400 mb-2 tracking-wider">{proj.year}</div>
                      <h5 className="text-lg font-bold text-white mb-2">{proj.title}</h5>
                      <p className="text-sm text-slate-300 leading-relaxed">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div>
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">Vision</h2>
            <h3 className="text-3xl font-black text-white mb-6">Strategic Role at Kashmir EcoWatch</h3>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Dr. Khan's multidisciplinary expertise directly supports the platform's mission to provide credible, science-based environmental intelligence for Kashmir.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visionRoles.map((role, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-2xl border border-emerald-500/10 bg-emerald-950/5">
                  <h4 className="text-lg font-bold text-emerald-300 mb-3">{role.title}</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          </div>
        </div>
      </section>
    </main>
  );
}
