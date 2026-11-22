'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import {
  HelpCircle, Shield, Database, Users, Globe, BookOpen, Map,
  CheckCircle2, ArrowRight, Activity, Droplets, Mountain,
  Sparkles, Compass, Layers, Eye, Cpu, Award, GraduationCap,
  ExternalLink, Heart, AlertTriangle, FileText, ChevronRight,
  Flame, Wind, Binary, Landmark, Building2, Trees, Search,
  Lock, ShieldAlert, Check, Clock, Phone, Mail
} from 'lucide-react';

interface QuestionItem {
  id: number;
  sectionId: string;
  sectionTitle: string;
  sectionNumber: string;
  question: string;
  answer: string[];
  moduleName?: string;
  moduleHref?: string;
  highlightTag?: string;
}

const qnaCatalog: QuestionItem[] = [
  // ─── 01. ABOUT & INSTITUTIONAL GOVERNANCE (6 Qs) ──────────────────────
  {
    id: 1,
    sectionId: 'section-governance',
    sectionNumber: '01',
    sectionTitle: 'About & Institutional Governance',
    question: 'What is Kashmir EcoWatch and who maintains it?',
    highlightTag: 'Institutional Identity',
    moduleName: 'About the Platform',
    moduleHref: '/about',
    answer: [
      'Kashmir EcoWatch (KEW) is a non-commercial, diaspora-supported environmental research and intelligence initiative dedicated to ecological knowledge, scientific monitoring, environmental assessment, and disaster resilience across the Western Himalaya.',
      'The platform brings together environmental science, geospatial technologies, satellite observations, research documentation, scientific analysis, and community participation to improve access to regional environmental information.',
      'Its institutional stewardship is supported by Dr. Kumar Foundation USA and Kumar Trust USA, as identified in published institutional materials. Digital development and engineering maintenance are provided by Prime Logic Solutions USA through its Corporate Social Responsibility initiative.',
      'KEW is not a government regulatory authority, and its scientific assessments are independent analytical evaluations rather than statutory determinations or official emergency instructions.'
    ]
  },
  {
    id: 2,
    sectionId: 'section-governance',
    sectionNumber: '01',
    sectionTitle: 'About & Institutional Governance',
    question: 'Why is it termed a Knowledge Return System?',
    highlightTag: 'Knowledge Return',
    moduleName: 'Founder Leadership',
    moduleHref: '/about/founder',
    answer: [
      'The Knowledge Return System expresses a commitment to making scientific knowledge, professional experience, research methods, and environmental information accessible to the region where the initiative\'s founder first developed his interest in environmental science.',
      'Although the founder now lives and works in the United States and is no longer a citizen or state subject of the region, his commitment to its environmental wellbeing continues through independent scientific and philanthropic contributions.',
      'Knowledge Return is not a claim of political authority or territorial entitlement.',
      'It is a commitment to sharing accumulated expertise, developing accessible environmental intelligence, supporting local research, and contributing to the ecological understanding of the Western Himalaya.'
    ]
  },
  {
    id: 3,
    sectionId: 'section-governance',
    sectionNumber: '01',
    sectionTitle: 'About & Institutional Governance',
    question: 'Is Kashmir EcoWatch affiliated with any government or political institution?',
    highlightTag: 'Independence & Neutrality',
    moduleName: 'Governance & Ethos',
    moduleHref: '/about/governance',
    answer: [
      'Kashmir EcoWatch operates as an independent, public-interest environmental initiative with no governmental or political affiliation.',
      'Its scientific coverage encompasses ecosystems across different administrative and political jurisdictions. That geographic coverage does not imply governmental recognition, authorization, institutional partnership, or political representation.',
      'Where KEW uses government-published observations, official reports, or scientific datasets, those materials retain their original institutional attribution.',
      'The use of an external dataset establishes documented provenance, not institutional endorsement of KEW by the originating agency.'
    ]
  },
  {
    id: 4,
    sectionId: 'section-governance',
    sectionNumber: '01',
    sectionTitle: 'About & Institutional Governance',
    question: 'What is the relationship between Alamdar\'s ecological philosophy and KEW?',
    highlightTag: 'Alamdar Ethos',
    moduleName: 'Alamdar Ethical Maxim',
    moduleHref: '/about/governance#maxim-section',
    answer: [
      'Kashmir EcoWatch draws ethical inspiration from the ecological teachings associated with Sheikh Noor-ud-Din Wali, Alamdar-e-Kashmir.',
      'The maxim "Ann Poshi Teli Yeli Wan Poshi" expresses the fundamental relationship between forest protection and human nourishment.',
      'KEW interprets this traditional wisdom as a moral foundation for environmental responsibility, watershed protection, biodiversity conservation, and intergenerational stewardship.',
      'All environmental findings and metrics published by KEW remain strictly grounded in empirical observations, verified methodology, and data-quality standards.'
    ]
  },
  {
    id: 5,
    sectionId: 'section-governance',
    sectionNumber: '01',
    sectionTitle: 'About & Institutional Governance',
    question: 'What geographic areas does Kashmir EcoWatch cover?',
    highlightTag: 'Geographic Scope',
    moduleName: 'Regional Scope Notice',
    moduleHref: '/geographic-scope',
    answer: [
      'KEW\'s scientific monitoring perimeter covers the Kashmir Valley, Jammu, Ladakh, Azad Jammu and Kashmir, and Gilgit-Baltistan.',
      'The platform examines shared mountain systems, river basins, wetlands, forests, glaciers, biodiversity, and environmental hazards across this interconnected terrain.',
      'Actual observation coverage varies according to sensor availability, satellite passes, monitoring infrastructure, and open scientific data access.',
      'A region displayed on a platform map indicates ecosystem coverage; it does not represent continuous in-situ ground monitoring where physical sensors are absent.'
    ]
  },
  {
    id: 6,
    sectionId: 'section-governance',
    sectionNumber: '01',
    sectionTitle: 'About & Institutional Governance',
    question: 'Why does Kashmir EcoWatch extend beyond the Kashmir Valley to the wider Western Himalaya?',
    highlightTag: 'Ecology Beyond Borders',
    moduleName: 'Geographic Scope',
    moduleHref: '/geographic-scope',
    answer: [
      "Kashmir EcoWatch's geographical vision is rooted in both ecological science and the spiritual heritage of Kashmir.",
      "For centuries, Kashmir's Sufi and Rishi traditions have emphasized the relationship between humanity, nature, compassion, and the sanctity of the living world. The spiritual influence associated with Kashmir's saints has never been confined to modern political or administrative boundaries.",
      "The mountains, valleys, forests, rivers, glaciers, and sacred landscapes of the wider Western Himalaya form an interconnected natural and cultural environment. These are landscapes through which generations of spiritual seekers, scholars, pastoral communities, and ordinary people have travelled, lived, contemplated, and developed enduring relationships with nature.",
      "Spiritual responsibility recognizes no political boundaries, and ecological systems do not stop at administrative borders.",
      "Kashmir Valley, Jammu, Ladakh, Azad Jammu and Kashmir, and Gilgit-Baltistan are governed through different political and administrative arrangements. Yet their mountain ecosystems, watersheds, biodiversity, climatic processes, and environmental hazards are interconnected.",
      "A changing glacier, degrading forest, polluted river, threatened species, or emerging natural hazard cannot always be understood or effectively addressed within a single administrative jurisdiction.",
      "Kashmir EcoWatch therefore approaches the wider Western Himalaya as an interconnected ecological region requiring scientific cooperation, shared environmental knowledge, and collective responsibility.",
      "This geographical commitment is inspired by the universal ethical outlook of Kashmir's spiritual traditions, particularly the ecological wisdom associated with Sheikh Noor-ud-Din Wali, Alamdar-e-Kashmir.",
      "It does not represent a political or territorial claim, disregard existing jurisdictions, or seek to impose a single administrative identity upon the region.",
      "Rather, it recognizes that different governments, institutions, researchers, and communities can contribute to protecting shared ecosystems while respecting their respective jurisdictions.",
      "The saints taught responsibility beyond divisions. Environmental science demonstrates interdependence beyond borders. Kashmir EcoWatch brings these principles together in service of the Western Himalaya.",
      "Different jurisdictions. Interconnected ecosystems. Shared ecological responsibility."
    ]
  },

  // ─── 02. SCIENTIFIC INTEGRITY & ENVIRONMENTAL INTELLIGENCE (5 Qs) ───
  {
    id: 7,
    sectionId: 'section-integrity',
    sectionNumber: '02',
    sectionTitle: 'Scientific Integrity & Environmental Intelligence',
    question: 'How does the platform ensure scientific accuracy and neutrality?',
    highlightTag: 'Data Integrity',
    moduleName: 'Open Data Portal',
    moduleHref: '/open-data',
    answer: [
      'Kashmir EcoWatch\'s scientific integrity framework enforces source verification, documented methods, data-quality classification, transparent limitations, and independent interpretation.',
      'Every environmental measurement published on KEW retains its original timestamp, physical units, observation location, uncertainty bounds, and primary source provenance.',
      'KEW maintains a strict functional distinction between direct ground measurements, satellite observations, model-derived estimates, analytical forecasts, and citizen-submitted observations.',
      'The platform enforces scientific neutrality by separating empirical evidence from opinion, avoiding institutional or political assertions, and explicitly documenting technical limitations.',
      'While no environmental monitoring network can guarantee complete observational completeness, KEW communicates verified baseline data, documents methodological provenance, and explicitly marks confidence levels and analytical uncertainty.'
    ]
  },
  {
    id: 8,
    sectionId: 'section-integrity',
    sectionNumber: '02',
    sectionTitle: 'Scientific Integrity & Environmental Intelligence',
    question: 'Does Kashmir EcoWatch operate its own monitoring stations?',
    highlightTag: 'Observation Provenance',
    moduleName: 'Air Quality Stations',
    moduleHref: '/environmental-monitoring/air-pollution',
    answer: [
      'KEW integrates environmental data from available observation systems, geospatial datasets, scientific reports, and research-based monitoring networks.',
      'All observations originating from external monitoring networks (such as CPCB, IMD, or international satellite feeds) are identified with their original producer attribution. KEW does not represent third-party equipment as proprietary infrastructure.',
      'KEW documents whether an observation derives from remote sensing, external ground stations, research-grade field instruments, or collaborative partner feeds.',
      'The presence of a monitoring station on a KEW dashboard indicates data integration, not institutional ownership or statutory control.'
    ]
  },
  {
    id: 9,
    sectionId: 'section-integrity',
    sectionNumber: '02',
    sectionTitle: 'Scientific Integrity & Environmental Intelligence',
    question: 'What does Live, Recent, Estimated, or Verified mean?',
    highlightTag: 'Telemetry Classification',
    moduleName: 'Early Warning Center',
    moduleHref: '/alerts',
    answer: [
      'Live indicates an automated or continuously updated data feed with a documented telemetry timestamp. It does not imply instantaneous sensor sampling at the exact second of page load.',
      'Recent designates observations recorded within an established temporal window (typically the preceding 24 to 72 hours).',
      'Estimated identifies values generated through numerical models, satellite reflectance algorithms, or interpolation methods rather than direct ground sensors.',
      'Verified applies exclusively to records that have passed multi-point quality assurance, calibration verification, or expert scientific review.',
      'KEW systematically tags historical, delayed, or unverified records to prevent analytical misinterpretation.',
      'Every telemetry value displayed across KEW includes its timestamp, methodology, and confidence status.'
    ]
  },
  {
    id: 10,
    sectionId: 'section-integrity',
    sectionNumber: '02',
    sectionTitle: 'Scientific Integrity & Environmental Intelligence',
    question: 'Are KEW hazard warnings official government warnings?',
    highlightTag: 'Hazard Disclaimer',
    moduleName: 'Hazard Intelligence',
    moduleHref: '/hazard-intelligence',
    answer: [
      'No. KEW hazard assessments are independent scientific analytics, not official civil defense or statutory government warnings.',
      'KEW provides analytical risk modeling, scientific observations, and aggregated official bulletins. The platform maintains a strict visual and functional separation between independent hazard intelligence and statutory government alerts.',
      'Whenever official warnings are referenced, KEW preserves the issuing agency\'s identity, publication timestamp, jurisdiction, and validity period.',
      'KEW analytical products do not replace emergency orders or evacuation directives issued by disaster management authorities.',
      'During active emergencies, citizens and agencies must rely on official disaster management authorities and designated civil defense channels.'
    ]
  },
  {
    id: 11,
    sectionId: 'section-integrity',
    sectionNumber: '02',
    sectionTitle: 'Scientific Integrity & Environmental Intelligence',
    question: 'How does KEW distinguish scientific observations from environmental predictions?',
    highlightTag: 'Forecasting vs. Ground Truth',
    moduleName: 'Algal Bloom Intelligence',
    moduleHref: '/hazard-intelligence/algal-bloom-intelligence',
    answer: [
      'An observation represents empirical data captured by in-situ sensors, satellite instruments, or standardized laboratory analysis.',
      'A prediction represents a modeled projection derived from hydrodynamic, meteorological, or geophysical algorithms.',
      'Satellite-derived products are categorized as indirect remote-sensing retrievals rather than direct surface measurements.',
      'KEW explicitly publishes the evidence type, modeling horizon (24h/48h/72h), algorithmic assumptions, and uncertainty bounds for every forecasting module.',
      'Forecasts are explicitly distinguished from verified occurrences across all user interfaces.'
    ]
  },

  // ─── 03. SCIENTIFIC DATA, RESEARCH & ACCESS (5 Qs) ───────────────────
  {
    id: 12,
    sectionId: 'section-research',
    sectionNumber: '03',
    sectionTitle: 'Scientific Data, Research & Access',
    question: 'How can researchers and institutions use and cite KEW data?',
    highlightTag: 'Academic Citation',
    moduleName: 'Research Library',
    moduleHref: '/research-library',
    answer: [
      'Researchers can access and use KEW\'s open scientific resources under Creative Commons and FAIR (Findable, Accessible, Interoperable, Reusable) data principles, subject to specific dataset attribution requirements.',
      'Standard KEW citation format requires the dataset title, primary observation provider, KEW analytical version, access timestamp, and DOI or stable URI.',
      'Platform users cite original data providers for baseline observations and KEW for composite indices or modeling layers.',
      'Dataset documentation and quality flags accompany every downloadable dataset to ensure rigorous academic and policy application.',
      'Sensitive wildlife and rare botanical occurrence records remain subject to controlled academic access protocols.'
    ]
  },
  {
    id: 13,
    sectionId: 'section-research',
    sectionNumber: '03',
    sectionTitle: 'Scientific Data, Research & Access',
    question: 'Is all environmental data freely downloadable?',
    highlightTag: 'Open Data Limits',
    moduleName: 'Open Data Commons',
    moduleHref: '/open-data',
    answer: [
      'KEW\'s non-commercial knowledge-sharing mission supports broad public access to environmental information.',
      'However, data distribution is governed by conservation safety, licensing restrictions, and personal privacy.',
      'While public environmental indicators, air quality metrics, and general water quality data are openly downloadable, fine-scale endangered wildlife locations, private landholder details, and restricted third-party datasets are protected.',
      'KEW publishes all non-sensitive environmental datasets in standard open formats (CSV, GeoJSON) while clearly documenting access conditions for restricted tiers.',
      'Open environmental science is balanced with ecological prudence: data that poses risks to endangered species is safeguarded by design.'
    ]
  },
  {
    id: 14,
    sectionId: 'section-research',
    sectionNumber: '03',
    sectionTitle: 'Scientific Data, Research & Access',
    question: 'Where can users find the original data sources and methodologies?',
    highlightTag: 'Methodological Transparency',
    moduleName: 'EIA Reports & Methodology',
    moduleHref: '/sectoral-eia/reports',
    answer: [
      'The Open Data Portal and Sectoral EIA directories serve as KEW\'s public repository for dataset documentation, methodological notes, update cadences, and source provenance.',
      'Each scientific monitoring module links directly to its underlying metadata record and primary data sources.',
      'The metadata index clearly distinguishes original data collectors from KEW\'s analytical layers and geospatial visualizations.',
      'Third-party intellectual property and agency attributions are displayed prominently within individual dashboard widgets.'
    ]
  },
  {
    id: 15,
    sectionId: 'section-research',
    sectionNumber: '03',
    sectionTitle: 'Scientific Data, Research & Access',
    question: 'Can institutions collaborate with KEW on research?',
    highlightTag: 'Institutional Partnerships',
    moduleName: 'Research Partners',
    moduleHref: '/become-research-partner',
    answer: [
      'KEW collaborates with academic institutions, university faculties, conservation trusts, and independent scientists on environmental monitoring, model validation, and ecological research.',
      'Collaborative partnerships operate under defined scientific scopes, mutual data-sharing terms, and peer-review protocols.',
      'Prospective institutional partners submit research proposals through the Research Partner Portal, which undergo scientific evaluation by KEW\'s coordination team.',
      'Formal collaboration agreements define data governance, publication rights, methodological transparency, and joint conservation objectives.'
    ]
  },
  {
    id: 16,
    sectionId: 'section-research',
    sectionNumber: '03',
    sectionTitle: 'Scientific Data, Research & Access',
    question: 'Can KEW information be used in environmental impact assessments?',
    highlightTag: 'EIA Regulatory Baseline',
    moduleName: 'Sectoral EIA Engine',
    moduleHref: '/sectoral-eia',
    answer: [
      'KEW datasets and environmental profiles serve as supplementary baseline evidence for environmental screening, academic studies, and preliminary impact scoping across the Western Himalaya.',
      'Data fitness depends on spatial resolution, monitoring cadence, and the specific statutory requirements of the jurisdiction in question.',
      'KEW analytical outputs do not replace statutory on-site environmental impact assessments, certified laboratory analyses, or formal public hearings mandated by law.',
      'Project proponents, consultants, and researchers remain legally and professionally responsible for verifying data suitability for their regulatory submissions.'
    ]
  },

  // ─── 04. ENDANGERED WILDLIFE, ECOLOGICAL SECURITY & ANTI-POACHING (8 Qs) ─
  {
    id: 17,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'How does Kashmir EcoWatch safeguard sensitive and endangered wildlife from poaching?',
    highlightTag: 'Anti-Poaching Protocol',
    moduleName: 'Species Intelligence',
    moduleHref: '/protected-network/species-intelligence',
    answer: [
      'Protecting vulnerable wildlife requires more than identifying species on maps. Environmental information can unintentionally expose nesting sites, dens, breeding grounds, migration bottlenecks, rare plant populations, or locations targeted by illegal wildlife trade.',
      'KEW enforces an Anti-Poaching Wildlife Masking Protocol: ecological data is published only at the spatial resolution necessary for regional conservation analysis, preventing the pinpointing of vulnerable populations.',
      'All wildlife occurrence records undergo automated and manual sensitivity screening prior to public release.',
      'For IUCN Red List and regionally threatened species (including the Hangul, Snow Leopard, Markhor, and Musk Deer), precise coordinates are withheld and replaced with 10–25 km generalized spatial grids.',
      'This obfuscation is enforced across all GIS layers, vector tiles, API responses, map popups, public downloads, and visual media.',
      'Security is implemented at the database and API query layer, ensuring high-resolution coordinates are never transmitted to client browsers.'
    ]
  },
  {
    id: 18,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'Will KEW publicly display exact locations of endangered species?',
    highlightTag: 'Coordinate Generalization',
    moduleName: 'Protected Network',
    moduleHref: '/protected-network',
    answer: [
      'No. KEW never publishes fine-scale GPS coordinates, active denning sites, nesting trees, or mineral licks for threatened or commercially targeted wildlife.',
      'The public interface presents aggregated habitat suitability models, watershed-level presence indicators, and generalized grid zones.',
      'Generalized map grids explicitly indicate spatial uncertainty and do not represent point sightings at polygon centroids.',
      'Masking criteria encompass both formal IUCN/Wildlife Protection Act categories and localized exploitation risks (such as rare high-altitude medicinal herbs).'
    ]
  },
  {
    id: 19,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'Can poachers use wildlife maps, satellite imagery, or citizen observations to locate animals?',
    highlightTag: 'Wildlife Crime Prevention',
    moduleName: 'Threat Monitoring',
    moduleHref: '/protected-network/monitoring-and-threats',
    answer: [
      'Yes, if environmental platforms fail to sanitize spatial data.',
      'A scientifically useful wildlife database can create significant conservation risks when precise locations, observation times, photographs, or repeated movement patterns are publicly accessible.',
      'To prevent wildlife crime and targeted poaching, KEW treats spatial precision as a controlled security parameter.',
      'KEW audits all public data products—including timestamp clustering, road proximity indices, and image backgrounds—to prevent poachers from triangulating animal movements.',
      'The platform provides legitimate researchers and citizens with meaningful conservation metrics while withholding the tactical telemetry poachers exploit.'
    ]
  },
  {
    id: 20,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'How are sensitive wildlife observations submitted by citizens protected?',
    highlightTag: 'Citizen Data Scrubbing',
    moduleName: 'Submit Observation',
    moduleHref: '/submit-observation',
    answer: [
      'Citizen submissions involving sensitive fauna or flora enter an isolated quarantine pipeline rather than publishing directly to public dashboards.',
      'Raw GPS coordinates, contributor personal identities, and high-resolution field photos are encrypted in secure storage with restricted administrative access.',
      'Species identification and conservation risk are verified before any public representation is generated.',
      'When approved for public view, the record is automatically stripped of EXIF data, generalized to regional grid cells, and decoupled from the contributor\'s identity.',
      'Contributors receive automated confirmation explaining that spatial precision has been generalized in accordance with KEW Anti-Poaching Standards.'
    ]
  },
  {
    id: 21,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'Can researchers obtain exact coordinates for legitimate conservation work?',
    highlightTag: 'Controlled Research Access',
    moduleName: 'Research Access Desk',
    moduleHref: '/about/contact',
    answer: [
      'Accredited university researchers, registered conservation biologists, and wildlife management departments can request high-resolution ecological data for documented scientific projects.',
      'Data release requires institutional credential verification, a defined research methodology, ethical review, and written compliance with non-disclosure standards.',
      'Authorized researchers sign a formal Data Use Agreement prohibiting third-party redistribution, publication of raw coordinates, or commercial use.',
      'Data access is strictly bounded to the geographical quadrant and timeframe essential to the approved study.',
      'All access requests undergo case-by-case evaluation by KEW\'s data governance committee.'
    ]
  },
  {
    id: 22,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'How does KEW protect wildlife photographs and camera-trap records?',
    highlightTag: 'EXIF & Metadata Stripping',
    moduleName: 'Wildlife Sightings',
    moduleHref: '/biodiversity/wildlife-sightings',
    answer: [
      'Photographs can inadvertently reveal precise wildlife locations through embedded EXIF data, device identifiers, and recognizable terrain features.',
      'KEW processes all public imagery through an automated metadata scrubber that strips GPS tags, camera serial numbers, and capture timestamps.',
      'Unsanitized master files are isolated in restricted storage and never exposed through public Content Delivery Networks (CDNs).',
      'Where landscape landmarks in a photograph could disclose an active nest or den, KEW crops the image, delays publication, or publishes only close-up anatomical views.',
      'This maintains scientific authenticity while strictly safeguarding delicate breeding and wintering habitats.'
    ]
  },
  {
    id: 23,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'What happens if wildlife data have already been exposed publicly?',
    highlightTag: 'Incident Remediation',
    moduleName: 'Report Issue Desk',
    moduleHref: '/report-issue',
    answer: [
      'KEW operates an Incident Remediation Protocol triggered immediately upon identification of any sensitive data exposure.',
      'The compromised record is instantly unindexed, removed from public APIs, and purged from edge caches within 15 minutes.',
      'Security triage evaluates map tiles, database exports, and social distribution to ensure complete sanitization.',
      'Where exposure involves critically endangered species, KEW notifies relevant wildlife protection officials and data custodians.',
      'A formal incident log documents the root cause, remediation steps, and technical enhancements implemented to prevent recurrence.',
      'KEW notes that while platform records are purged immediately, third-party offline copies cannot be retrospectively rescinded.'
    ]
  },
  {
    id: 24,
    sectionId: 'section-wildlife',
    sectionNumber: '04',
    sectionTitle: 'Endangered Wildlife, Ecological Security & Anti-Poaching',
    question: 'How does KEW balance open science with endangered-species protection?',
    highlightTag: 'Ethical Science Balance',
    moduleName: 'Protected Corridors',
    moduleHref: '/protected-network/corridors-and-connectivity',
    answer: [
      'KEW balances open environmental science with strict species security by practicing "Open by Default, Protected by Necessity."',
      'Non-sensitive environmental indicators—such as air quality, hydrology, forest cover changes, and non-threatened floral distributions—are completely open.',
      'Vulnerable biodiversity data is managed according to international conservation protocols (including GBIF sensitivity guidelines).',
      'KEW provides the scientific community with robust macro-level models, habitat connectivity corridors, and trend indices without publishing the vulnerable point data that threatens species survival.'
    ]
  },

  // ─── 05. PUBLIC PARTICIPATION & INSTITUTIONAL RESPONSIBILITY (5 Qs) ─
  {
    id: 25,
    sectionId: 'section-participation',
    sectionNumber: '05',
    sectionTitle: 'Public Participation & Institutional Responsibility',
    question: 'How can citizens contribute environmental observations?',
    highlightTag: 'Citizen Science',
    moduleName: 'Join Citizen Science',
    moduleHref: '/join-citizen-science',
    answer: [
      'Citizens contribute environmental observations through KEW\'s dedicated Citizen Science Portal and field reporting tools.',
      'Submissions cover local water pollution, wetland encroachments, forest degradation, air quality anomalies, and seasonal phenology.',
      'All incoming public submissions are tagged as "Unverified Citizen Observation" until validated against satellite imagery, field reports, or peer observations.',
      'KEW safety protocols strictly prohibit volunteers from trespassing, disturbing wildlife, or entering hazardous landslide, flood, or avalanche zones to gather data.'
    ]
  },
  {
    id: 26,
    sectionId: 'section-participation',
    sectionNumber: '05',
    sectionTitle: 'Public Participation & Institutional Responsibility',
    question: 'Can NGOs and local organizations contribute research and environmental data?',
    highlightTag: 'NGO Data Intake',
    moduleName: 'Data Contributor Portal',
    moduleHref: '/become-data-contributor',
    answer: [
      'Non-governmental organizations, grassroot conservation trusts, and community watchdog groups integrate field data with KEW through the Data Contributor Program.',
      'KEW requires all contributing organizations to provide methodology notes, sampling dates, instrument calibration standards, and licensing permissions.',
      'The platform maintains strict independence: organization-submitted claims are published with explicit attribution and remain distinct from KEW\'s independent environmental indices.'
    ]
  },
  {
    id: 27,
    sectionId: 'section-participation',
    sectionNumber: '05',
    sectionTitle: 'Public Participation & Institutional Responsibility',
    question: 'How does KEW handle misinformation or disputed environmental findings?',
    highlightTag: 'Scientific Corrections',
    moduleName: 'Report Disputed Finding',
    moduleHref: '/report-issue',
    answer: [
      'KEW maintains a formal Scientific Correction and Dispute Protocol to address data discrepancies, model calibration updates, or emerging evidence.',
      'When a published metric is questioned by researchers, agencies, or citizens, KEW\'s technical secretariat conducts an empirical re-evaluation against raw datasets and primary sensors.',
      'All substantive corrections include a public errata note, version update, and change log to maintain full scientific auditability.',
      'Inquiries are resolved solely on the basis of empirical evidence, verified methodology, and data provenance, free from institutional or political pressure.'
    ]
  },
  {
    id: 28,
    sectionId: 'section-participation',
    sectionNumber: '05',
    sectionTitle: 'Public Participation & Institutional Responsibility',
    question: 'How does KEW protect personal information from citizen science participants?',
    highlightTag: 'Privacy & Contributor Protection',
    moduleName: 'Volunteer Engagement',
    moduleHref: '/get-involved/volunteer',
    answer: [
      'KEW practices strict data minimization: contributor personal information is collected solely for submission verification and emergency follow-up.',
      'Public observation dashboards decouple contributor identities, phone numbers, and email addresses from published field findings.',
      'Access to contributor contact records is restricted to authenticated platform administrators.',
      'KEW adheres to international data privacy standards and allows contributors to request complete deletion of their personal records at any time.'
    ]
  },
  {
    id: 29,
    sectionId: 'section-participation',
    sectionNumber: '05',
    sectionTitle: 'Public Participation & Institutional Responsibility',
    question: 'What is Kashmir EcoWatch\'s long-term environmental mission?',
    highlightTag: 'Enduring Himalayan Mission',
    moduleName: 'Institutional Mission',
    moduleHref: '/about/mission',
    answer: [
      'Kashmir EcoWatch exists to build an enduring, independent repository of environmental knowledge for the Western Himalaya.',
      'The long-term mission integrates continuous satellite and ground monitoring, open scientific research, climate education, hazard intelligence, and transboundary knowledge return.',
      'KEW measures its impact not by data volume, but by observational accuracy, scientific neutrality, accessibility, and the responsible protection of vulnerable Himalayan ecosystems.',
      'Its permanent guiding covenant is the return of knowledge in service of the landscapes, rivers, and living communities that inspire its stewardship.'
    ]
  },

  // ─── 06. MILITARY & GEOSPATIAL DATA PROTECTION (8 Qs) ─────────────────
  {
    id: 30,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'How does Kashmir EcoWatch protect military installations and security-sensitive locations?',
    highlightTag: 'Defense Facility Exclusion',
    moduleName: 'Geospatial Scope',
    moduleHref: '/geographic-scope',
    answer: [
      'Kashmir EcoWatch maintains a strict security-conscious framework across its Western Himalayan environmental intelligence systems.',
      'The platform\'s institutional geospatial publication policy prohibits the intentional disclosure, identification, or mapping of military installations, defense infrastructure, and restricted security facilities.',
      'Identifiable defense features are systematically excluded from public environmental visualizations, or masked where they appear incidentally in field photography, analytical overlays, and platform publications.',
      'KEW\'s mandate is exclusively ecological research, watershed monitoring, natural hazard intelligence, and public-interest environmental science. The platform does not engage in military intelligence or defense infrastructure mapping.'
    ]
  },
  {
    id: 31,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'Does KEW mask military facilities appearing in satellite imagery and photographs?',
    highlightTag: 'Imagery Masking Policy',
    moduleName: 'Change Detection',
    moduleHref: '/change-detection',
    answer: [
      'Yes. KEW\'s publication protocol requires the masking or exclusion of identifiable military installations and security-sensitive facilities from all platform-curated visual media.',
      'This safeguard applies to KEW-published satellite composites, aerial photography, field documentation, remote-sensing models, and PDF research exports.',
      'Editorial review inspects visible structures, identifiable landmarks, image captions, coordinate watermarks, and embedded metadata prior to publication.',
      'This protection is an internal publication safeguard applied to KEW-managed media; it does not claim technical control over third-party, independently hosted commercial satellite imagery streams or global map tile servers.'
    ]
  },
  {
    id: 32,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'Does KEW publish the exact coordinates of military or restricted security installations?',
    highlightTag: 'Coordinate Omission',
    moduleName: 'Open Data Portal',
    moduleHref: '/open-data',
    answer: [
      'No. KEW\'s public data governance policy strictly prohibits the publication of precise geographic coordinates identifying military facilities or restricted defense compounds.',
      'Platform GIS databases focus strictly on environmental indicators: watershed boundaries, forest cover classifications, geological hazard zones, and ecological habitats.',
      'Where an environmental study area borders a restricted zone, spatial data is generalized or restricted before public release.',
      'These exclusions are enforced across map vector layers, GIS attributes, downloadable datasets, and public API endpoints.'
    ]
  },
  {
    id: 33,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'How does KEW protect civilian settlements near military and restricted areas?',
    highlightTag: 'Civilian-Defense Decoupling',
    moduleName: 'Hazard Intelligence',
    moduleHref: '/hazard-intelligence',
    answer: [
      'Civilian settlements, mountain roads, drinking water sources, agricultural lands, and river valleys frequently exist adjacent to defense infrastructure in mountain frontier regions.',
      'KEW\'s data policy separates legitimate civilian environmental reporting from restricted infrastructure details.',
      'The platform monitors ecological conditions—such as drinking water purity, slope instability, and flood risks—directly affecting local communities without detailing military perimeters or compromising regional security.',
      'Environmental monitoring is never used as a pretext for identifying security-sensitive facilities.'
    ]
  },
  {
    id: 34,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'Does the masking policy apply to interactive maps, GIS layers, APIs, and downloadable datasets?',
    highlightTag: 'Cross-Channel Enforcement',
    moduleName: 'Open Data Commons',
    moduleHref: '/open-data',
    answer: [
      'Yes. KEW\'s geospatial security policy applies uniformly across all public digital interfaces.',
      'This encompasses interactive vector maps, satellite viewers, downloadable GeoJSON and CSV datasets, REST API responses, PDF scientific reports, and citizen science observation feeds.',
      'A location is never considered protected merely by visual blurring on a web canvas if underlying coordinates remain exposed in data payloads.',
      'Protection is enforced at the database query and API serialization layers before data reaches the client.'
    ]
  },
  {
    id: 35,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'Can researchers request unrestricted access to security-sensitive geospatial information?',
    highlightTag: 'Restricted Access Protocol',
    moduleName: 'Research Access Desk',
    moduleHref: '/about/contact',
    answer: [
      'No. Kashmir EcoWatch does not collect, hold, or distribute defense intelligence or restricted military site coordinates.',
      'Accredited researchers may request legitimate scientific datasets subject to institutional credentials, defined environmental research purposes, and data governance agreements.',
      'Academic research access does not grant exemptions for security-restricted geographic areas or proprietary defense infrastructure.',
      'KEW provides environmental evidence rather than defense intelligence.'
    ]
  },
  {
    id: 36,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'How does KEW respond when security-sensitive information is identified in published material?',
    highlightTag: 'Security Incident Protocol',
    moduleName: 'Report Issue Desk',
    moduleHref: '/report-issue',
    answer: [
      'Identifications of potentially security-sensitive features in published materials trigger immediate operational review under KEW\'s Geospatial Security Protocol.',
      'The affected media, map tile, or dataset is quarantined within 15 minutes, unindexed from public APIs, and removed from edge content caches.',
      'The technical review verifies the asset across all distribution channels, applies necessary redactions, and permanently logs the corrective action taken.',
      'KEW notes the realistic operational limitation that data previously copied or cached by independent third parties cannot be retrospectively altered.'
    ]
  },
  {
    id: 37,
    sectionId: 'section-defense-security',
    sectionNumber: '06',
    sectionTitle: 'Military, Security-Sensitive Locations & Geospatial Data Protection',
    question: 'Does KEW\'s security policy limit legitimate environmental monitoring?',
    highlightTag: 'Balanced Scientific Mandate',
    moduleName: 'Environmental Monitoring',
    moduleHref: '/environmental-monitoring',
    answer: [
      'No. The policy protects sensitive security facilities while fully preserving rigorous environmental science and early hazard warnings.',
      'KEW monitors air quality, watershed health, glacial retreat, forest density, biodiversity habitats, and natural disaster risks without identifying restricted defense locations.',
      'Where high spatial precision could create security or conservation vulnerabilities, scientifically validated spatial aggregation and regional grid models provide complete environmental intelligence while eliminating security disclosure risks.',
      'Kashmir EcoWatch\'s permanent institutional mandate is environmental intelligence, not military intelligence.'
    ]
  },

  // ─── 07. REGIONAL & INTERNATIONAL SCIENTIFIC PARTICIPATION (13 Qs) ───
  {
    id: 38,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can researchers, scientists and environmentalists living outside the Western Himalaya participate in Kashmir EcoWatch?',
    highlightTag: 'Global Scientific Scope',
    moduleName: 'Become Research Partner',
    moduleHref: '/become-research-partner',
    answer: [
      'Yes. Kashmir EcoWatch actively welcomes scientific interest and professional contributions from researchers, environmental scientists, conservation specialists, geographers, climate scientists, ecologists, hydrologists, disaster-risk professionals, and qualified scholars living anywhere in the world.',
      'The platform\'s geographical focus is the Western Himalaya, but its scientific mission is international in outlook and collaboration standards.',
      'A researcher\'s place of residence, citizenship, nationality, or country of employment does not determine the value of their scientific contribution.',
      'Participation is guided strictly by scientific relevance, professional integrity, research quality, and respect for the communities and mountain ecosystems being studied.'
    ]
  },
  {
    id: 39,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'What opportunities are available to researchers and environmentalists living within the Western Himalaya?',
    highlightTag: 'Local Scientific Leadership',
    moduleName: 'Contributors Portal',
    moduleHref: '/about/contributors',
    answer: [
      'Researchers, scientists, environmental professionals, and knowledgeable local residents across Kashmir Valley, Jammu, Ladakh, Azad Jammu and Kashmir, and Gilgit-Baltistan are foundational scientific partners in Kashmir EcoWatch\'s mission.',
      'Their local ecological knowledge, field observations, environmental documentation, and university research provide essential context for regional assessments.',
      'Participation encompasses environmental observations, biodiversity documentation, watershed hydrology studies, alpine ecological transects, research contributions, and community environmental education.',
      'KEW operates on the core principle that meaningful environmental intelligence requires rooted local knowledge working alongside advanced remote-sensing methods.'
    ]
  },
  {
    id: 40,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can members of the Kashmiri and Western Himalayan diaspora contribute to KEW?',
    highlightTag: 'Diaspora Knowledge Return',
    moduleName: 'Founder Leadership',
    moduleHref: '/about/founder',
    answer: [
      'Yes. Kashmir EcoWatch recognizes the diaspora as an important source of scientific expertise, professional experience, international research connections, and philanthropic support.',
      'Individuals living abroad contribute environmental knowledge, technical data engineering, research collaboration, scientific mentoring, modeling workflows, and institutional development.',
      'This operationalizes the platform\'s Knowledge Return philosophy: expertise acquired internationally is shared back with the regions where personal, cultural, or intellectual connections originated.',
      'Diaspora participation serves to support and elevate local scientific leadership, establishing co-equal partnerships rather than external management.'
    ]
  },
  {
    id: 41,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Must a researcher be a citizen, permanent resident or state subject of the region to participate?',
    highlightTag: 'Universal Access Principles',
    moduleName: 'Governance & Ethos',
    moduleHref: '/about/governance',
    answer: [
      'No. Kashmir EcoWatch does not use citizenship, domicile, nationality, or state-subject status as a condition for scientific participation.',
      'Its institutional mission is based on environmental responsibility, scientific competence, ethical conduct, and legitimate research objectives.',
      'Researchers from different countries and jurisdictions can contribute to appropriately authorized scientific activities.',
      'However, field access, protected-area research, biological specimen collection, and regulated environmental sampling remain subject to applicable laws, statutory permits, and local administrative requirements.',
      'Participation in KEW does not confer special legal authorization or bypass statutory regulatory requirements.'
    ]
  },
  {
    id: 42,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can scientists and institutions from different political jurisdictions collaborate on shared ecological research?',
    highlightTag: 'Transboundary Ecology',
    moduleName: 'Geographic Scope Notice',
    moduleHref: '/geographic-scope',
    answer: [
      'Kashmir EcoWatch actively supports scientific cooperation addressing environmental processes that extend across administrative and political boundaries.',
      'Shared research interests encompass Himalayan cryosphere dynamics, Indus basin hydrology, high-altitude biodiversity corridors, climate trends, environmental pollution, and transboundary natural hazards.',
      'Collaboration operates with strict respect for applicable laws, institutional responsibilities, data-sharing restrictions, and the security of participating researchers.',
      'KEW\'s role is purely environmental and scientific. Geographic research coverage reflects ecological reality and carries no political or territorial implications.'
    ]
  },
  {
    id: 43,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'How does KEW ensure that local researchers receive recognition for their contributions?',
    highlightTag: 'Fair Attribution & Co-Authorship',
    moduleName: 'Research Library',
    moduleHref: '/research-library',
    answer: [
      'Kashmir EcoWatch enforces fair attribution, research transparency, and respect for original scientific work as foundational institutional principles.',
      'Research contributions are credited according to their actual intellectual, scientific, and technical significance.',
      'Original field investigators, regional faculty, community knowledge holders, and dataset producers retain full attribution, copyright, and citation credit.',
      'Scientific authorship reflects substantive scientific contributions rather than institutional seniority, nationality, or funding status.',
      'Formal research agreements define publication rights, data ownership, attribution, and collaboration responsibilities prior to commencing joint work.'
    ]
  },
  {
    id: 44,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can independent researchers participate without university or institutional affiliation?',
    highlightTag: 'Independent Scientific Research',
    moduleName: 'Become Research Partner',
    moduleHref: '/become-research-partner',
    answer: [
      'Yes. Independent scholars, retired researchers, experienced environmental practitioners, and qualified field naturalists contribute directly to KEW\'s scientific repositories.',
      'Formal university tenure is not the sole measure of scientific competence or observational validity.',
      'Contributions intended for scientific publication or environmental assessment undergo standardized methodological documentation, provenance review, and empirical verification.',
      'Access to sensitive datasets or restricted ecological locations remains subject to credential verification and data governance protocols.'
    ]
  },
  {
    id: 45,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can students and early-career researchers participate in KEW?',
    highlightTag: 'Early-Career Mentorship',
    moduleName: 'Volunteer Programs',
    moduleHref: '/get-involved/volunteer',
    answer: [
      'Kashmir EcoWatch actively supports students and early-career researchers as future stewards of Western Himalayan environmental science.',
      'Relevant participation encompasses supervised environmental observations, ecological data analysis, GIS mapping, scientific literature synthesis, climate time-series interpretation, and biodiversity documentation.',
      'Research participation operates under faculty supervision, ethical guidelines, and applicable institutional permissions.',
      'KEW safety protocols strictly prohibit students from conducting hazardous field investigations, entering restricted zones, or collecting sensitive wildlife telemetry without authorized oversight.'
    ]
  },
  {
    id: 46,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'How can international experts contribute without physically visiting the Western Himalaya?',
    highlightTag: 'Remote Scientific Collaboration',
    moduleName: 'Open Data Portal',
    moduleHref: '/open-data',
    answer: [
      'International experts contribute remotely through satellite remote sensing, GIS analysis, scientific peer review, methodology development, hydrodynamic modeling, climate analysis, and collaborative research publications.',
      'Remote participation is especially active in tracking glacial surge velocities, alpine snowpack variations, land-cover changes, and long-term ecological data trends.',
      'Remote modeling is treated as a complementary analytical tool that enriches, but never substitutes for, verified ground-truth data from regional field teams.',
      'KEW maintains a balance between international computational methods and locally grounded observational evidence.'
    ]
  },
  {
    id: 47,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can environmental NGOs, conservation groups and universities become research partners?',
    highlightTag: 'Institutional Affiliation',
    moduleName: 'CSR & Institutional Collaborations',
    moduleHref: '/about/csr-collaborations',
    answer: [
      'Kashmir EcoWatch welcomes scientific collaboration proposals from universities, conservation trusts, research laboratories, academic departments, and non-governmental environmental organizations.',
      'Proposed partnerships are evaluated according to scientific objectives, institutional capacity, research ethics, and applicable statutory requirements.',
      'Active collaboration domains include wetland hydrology restoration, wildlife corridor connectivity, disaster risk reduction modeling, and open environmental data infrastructure.',
      'Partnership status is formalized through specific memoranda defining mutual data-sharing responsibilities, publication rights, and deliverable schedules.'
    ]
  },
  {
    id: 48,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Can researchers contribute information from all five Western Himalayan regions?',
    highlightTag: 'Pan-Himalayan Scope',
    moduleName: 'Geographic Scope Notice',
    moduleHref: '/geographic-scope',
    answer: [
      'Yes. KEW\'s geographic mission encompasses the Kashmir Valley, Jammu, Ladakh, Azad Jammu and Kashmir, and Gilgit-Baltistan.',
      'Environmental observations and research contributions from across these five regions deepen regional understanding of interconnected mountain watersheds.',
      'All contributions undergo geographic verification, metadata documentation, responsible handling, and compliance with applicable statutory regulations.',
      'Scientific information is evaluated strictly on the basis of empirical evidence, data provenance, and ecological relevance, independent of political jurisdictions.'
    ]
  },
  {
    id: 49,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'Does participation in KEW require agreement with a particular religion, spiritual philosophy or political position?',
    highlightTag: 'Nonsectarian Scientific Inclusivity',
    moduleName: 'Governance & Ethos',
    moduleHref: '/about/governance',
    answer: [
      'No. Kashmir EcoWatch is an inclusive, nonsectarian environmental knowledge initiative.',
      'Although its ethical foundation draws inspiration from Kashmir\'s indigenous Sufi and Rishi traditions of revering the natural world, participation requires no religious belief, spiritual affiliation, political stance, or cultural conformity.',
      'Scientific collaboration is grounded in empirical evidence, peer review, professional ethics, mutual respect, and ecological stewardship.',
      'The institution welcomes researchers, scholars, and citizens of all cultural, religious, national, and professional backgrounds in service of Himalayan conservation.'
    ]
  },
  {
    id: 50,
    sectionId: 'section-participation-intl',
    sectionNumber: '07',
    sectionTitle: 'Regional & International Scientific Participation',
    question: 'How can researchers, scientists, environmentalists and diaspora professionals join Kashmir EcoWatch?',
    highlightTag: 'Engagement Portals',
    moduleName: 'Contact Desk',
    moduleHref: '/about/contact',
    answer: [
      'Interested researchers and institutions connect with KEW through dedicated scientific participation channels:',
      '• Become a Research Partner (/become-research-partner): For joint university, laboratory, and institutional research studies.',
      '• Become a Data Contributor (/become-data-contributor): For integrating scientific datasets, field archives, and monitoring records.',
      '• Citizen Science Portal (/join-citizen-science): For submitting localized environmental observations and seasonal phenology.',
      '• Volunteer & Fellowship Network (/get-involved/volunteer): For remote GIS modeling, scientific peer review, and educational outreach.',
      '• Institutional Contact Desk (/about/contact): For formal research inquiries, data agreements, and academic collaboration.',
      '"The Western Himalaya defines the environmental mission. Scientific responsibility defines participation. Neither knowledge nor commitment is confined by borders."'
    ]
  }
];

export default function QuestionsAndAnswersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<number[]>([1, 7, 12, 17, 25, 30, 38]); // Lead of each of 7 sections open by default

  // Macro Stats matching Contact & About
  const macroStats = [
    { value: '50', label: 'Authoritative Q&As', sub: 'Complete institutional clarity', icon: HelpCircle, color: 'text-emerald-400' },
    { value: '7', label: 'Governance Pillars', sub: 'From ethos to international science', icon: Shield, color: 'text-sky-400' },
    { value: '100%', label: 'Non-Commercial Mission', sub: 'Knowledge return for Kashmir', icon: Heart, color: 'text-rose-400' },
    { value: 'Masked', label: 'Anti-Poaching Standard', sub: '10–25km obfuscated GPS grids', icon: Lock, color: 'text-amber-400' },
    { value: 'Secure', label: 'Defense Facility Exclusion', sub: 'Zero military tactical data', icon: ShieldAlert, color: 'text-orange-400' },
    { value: 'Global', label: 'Universal Participation', sub: 'Open to researchers worldwide', icon: Globe, color: 'text-teal-400' },
  ];

  const sections = [
    { id: 'all', label: 'All Questions', count: 50 },
    { id: 'section-governance', label: '01. Governance & Ethos', count: 6 },
    { id: 'section-integrity', label: '02. Scientific Integrity', count: 5 },
    { id: 'section-research', label: '03. Data & Research Access', count: 5 },
    { id: 'section-wildlife', label: '04. Wildlife Security & Anti-Poaching', count: 8 },
    { id: 'section-participation', label: '05. Public Participation', count: 5 },
    { id: 'section-defense-security', label: '06. Defense & Geospatial Security', count: 8 },
    { id: 'section-participation-intl', label: '07. International Science', count: 13 },
  ];

  const filteredQna = useMemo(() => {
    return qnaCatalog.filter((item) => {
      const matchesSection = activeSection === 'all' || item.sectionId === activeSection;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.some(a => a.toLowerCase().includes(q)) ||
        (item.highlightTag && item.highlightTag.toLowerCase().includes(q)) ||
        item.sectionTitle.toLowerCase().includes(q);
      return matchesSection && matchesSearch;
    });
  }, [activeSection, searchQuery]);

  const toggleAccordion = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setExpandedIds(filteredQna.map(item => item.id));
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      
      {/* ─── Hero Surface (Identical Architectural Rigor to Contact Page) ─────── */}
      <Heading 
        icon={<HelpCircle className="w-5 h-5 text-emerald-400" />}
        label="Questions & Answers · Frequently Asked Questions"
        title="Understanding Kashmir EcoWatch"
        subtitle="Answers to 50 authoritative questions across seven institutional pillars: governance, scientific methodology, research data access, wildlife security, public participation, defense facility exclusion, and international scientific cooperation across the Western Himalaya."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'KEW Q&A' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <a
              href="#section-governance"
              onClick={() => setActiveSection('section-governance')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <span>01. Governance</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="#section-wildlife"
              onClick={() => setActiveSection('section-wildlife')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-white border border-rose-500/30 font-semibold text-xs transition-all"
            >
              <ShieldAlert className="w-3 h-3 text-rose-400" />
              <span>04. Wildlife Security</span>
            </a>
            <a
              href="#section-defense-security"
              onClick={() => setActiveSection('section-defense-security')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 hover:text-white border border-orange-500/30 font-semibold text-xs transition-all"
            >
              <Lock className="w-3 h-3 text-orange-400" />
              <span>06. Defense Security</span>
            </a>
            <a
              href="#section-participation-intl"
              onClick={() => setActiveSection('section-participation-intl')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 hover:text-white border border-teal-500/30 font-semibold text-xs transition-all"
            >
              <Globe className="w-3 h-3 text-teal-400" />
              <span>07. International Science</span>
            </a>
          </div>
        }
      />

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pt-8 max-w-7xl">
        
        {/* ─── Macro Stats Banner (6 Compact Responsive Cards) ────────────────── */}
        <section className="relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {macroStats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-[8px] border border-white/10 bg-slate-900/60 p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className={`text-xl sm:text-2xl font-black ${stat.color} font-mono tracking-tight`}>
                    {stat.value}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{stat.label}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Search & Category Filter Navigation Bar ────────────────────────── */}
        <section className="p-4 sm:p-6 rounded-[8px] bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search across all 50 questions (e.g. diaspora, researchers, military, poaching, citation, transboundary)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-[6px] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse All Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleExpandAll}
                className="px-3 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="px-3 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Section Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                }`}
              >
                <span>{sec.label}</span>
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded ${activeSection === sec.id ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {sec.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ─── Question & Answer Accordion List ─────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>Showing {filteredQna.length} of 50 Questions</span>
            <span>Ref: KEW-QA-2026-V3</span>
          </div>

          {filteredQna.length === 0 ? (
            <div className="p-12 text-center rounded-[8px] bg-slate-900/40 border border-white/5 space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No questions matched your search</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No entries found for &ldquo;{searchQuery}&rdquo;. Try another term such as &ldquo;diaspora&rdquo;, &ldquo;researchers&rdquo;, &ldquo;military&rdquo;, &ldquo;poaching&rdquo;, or &ldquo;Alamdar&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveSection('all'); }}
                className="px-4 py-2 rounded-[6px] bg-emerald-600 text-white text-xs font-semibold"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredQna.map((item) => {
                const isExpanded = expandedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    id={item.sectionId}
                    className={`rounded-[8px] border transition-all ${
                      isExpanded
                        ? 'border-emerald-500/40 bg-slate-900/80 shadow-md'
                        : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Accordion Question Trigger Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                        {/* Number Badge */}
                        <span className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] flex items-center justify-center font-mono font-bold text-xs ${
                          isExpanded
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-white/5 border border-white/10 text-slate-400'
                        }`}>
                          {item.id < 10 ? `0${item.id}` : item.id}
                        </span>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                              Section {item.sectionNumber} · {item.sectionTitle}
                            </span>
                            {item.highlightTag && (
                              <span className="text-[9px] font-mono px-2 py-0.2 rounded-[4px] bg-white/5 text-slate-400 border border-white/10">
                                {item.highlightTag}
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white leading-snug break-words">
                            {item.question}
                          </h3>
                        </div>
                      </div>

                      <div className={`shrink-0 mt-1 p-1 rounded transition-transform duration-200 ${isExpanded ? 'rotate-90 text-emerald-400' : 'text-slate-500'}`}>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </button>

                    {/* Accordion Answer Content */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-white/5 space-y-3">
                        <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                          {item.answer.map((paragraph, pIdx) => (
                            <p key={pIdx} className="break-words">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Associated Scientific Module Link */}
                        {item.moduleName && item.moduleHref && (
                          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="text-slate-500 text-[11px] font-mono">
                              Corresponding KEW Scientific Area:
                            </span>
                            <Link
                              href={item.moduleHref}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                            >
                              <span>Explore {item.moduleName}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── Institutional Integrity Covenant ─────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-[8px] bg-slate-900/60 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono block">
                Scientific Neutrality &amp; Evidence Standards
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Have a Specific Institutional or Research Inquiry?
              </h3>
            </div>

            <Link
              href="/about/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
            >
              <span>Submit Scientific Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kashmir EcoWatch maintains open channels for academic researchers, university departments, community observers, and environmental conservation organizations. If your inquiry involves peer review, data sharing agreements, or conservation coordinate verification, our secretariat reviews all submissions under a standard &lt;24h triage protocol.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <Link
              href="/about/founder"
              className="px-3.5 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 font-medium transition-colors"
            >
              Founder Leadership
            </Link>
            <Link
              href="/about/governance"
              className="px-3.5 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 font-medium transition-colors"
            >
              Governance &amp; Alamdar Ethos
            </Link>
            <Link
              href="/about/contributors"
              className="px-3.5 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 font-medium transition-colors"
            >
              Contributors &amp; Reviewers
            </Link>
            <Link
              href="/about/support-sponsorship"
              className="px-3.5 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 font-medium transition-colors"
            >
              Support &amp; Sponsorship
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
