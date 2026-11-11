/**
 * Kashmir EcoWatch: Outdoor Classroom (OD) Framework
 * Complete Five-Tier Teacher Implementation Guides & Student Field Sheets
 * 
 * Formal Western Himalayan Field Science Documentation
 * Aligned with JKBOSE, CBSE, Higher Education, and NEP 2020 Experiential Learning Standards.
 */

export interface TierTeacherGuide {
  tierId: string;
  tierName: string;
  courseCode: string;
  targetAudience: string;
  ageBracket: string;
  academicAlignment: string[];
  pedagogicalObjectives: string[];
  equipmentKit: {
    item: string;
    ratio: string;
    description: string;
  }[];
  itineraryTimeline: {
    time: string;
    phase: string;
    activity: string;
    facultyRole: string;
  }[];
  safetyDirectives: string[];
  statutoryPermits: string[];
  assessmentGradingRubric: {
    criterion: string;
    weight: string;
    description: string;
  }[];
  dataSubmissionProtocol: string[];
}

export interface TierStudentFieldSheet {
  tierId: string;
  tierName: string;
  sheetCode: string;
  targetGrades: string;
  title: string;
  subtitle: string;
  instructions: string[];
  headerFields: {
    label: string;
    placeholder: string;
  }[];
  diagnosticsSection: {
    title: string;
    parameters: {
      name: string;
      unit: string;
      normalRange: string;
      notes: string;
    }[];
  };
  censusSection: {
    title: string;
    columns: string[];
    sampleRows: {
      commonName: string;
      kashmiriName: string;
      scientificName: string;
      typicalHabitat: string;
    }[];
  };
  oralHistorySection: {
    title: string;
    elderPrompts: string[];
    documentationGuidelines: string;
  };
  sketchSection: {
    title: string;
    guidelines: string;
  };
  certificationSection: {
    teacherSignoffText: string;
    stampFieldText: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. TEACHER IMPLEMENTATION GUIDES (ALL 5 TIERS)
// ─────────────────────────────────────────────────────────────────────────────

export const TIER_TEACHER_GUIDES: Record<string, TierTeacherGuide> = {
  foundation: {
    tierId: 'foundation',
    tierName: 'Foundation Tier',
    courseCode: 'JK-OD-FND-608',
    targetAudience: 'Classes 6–8 (Middle School)',
    ageBracket: '11–13 Years',
    academicAlignment: [
      'JKBOSE Class 6–8 General Science (Ecosystems, Water Cycle, Habitat Diversity)',
      'CBSE Middle School Environmental Studies (Hands-on Nature Observation)',
      'NEP 2020 Experiential & Outdoor Pedagogical Framework'
    ],
    pedagogicalObjectives: [
      'Transition students from textbook diagrams to physical Western Himalayan ecosystems.',
      'Train sensory observation: listening for waterfowl calls, feeling soil textures, observing leaf venation.',
      'Instill empirical habits through systematic field journaling with date, time, weather, and sketches.',
      'Foster intergenerational respect through structured interviews with local elders about landscape changes.'
    ],
    equipmentKit: [
      { item: '8x42 Compact Binoculars', ratio: '1 pair per 4 students', description: 'Rubber-armored, weather-resistant optical glasses for waterfowl and canopy birding.' },
      { item: 'A5 Hardcover Nature Journals & 2B Pencils', ratio: '1 set per student', description: 'Acid-free unlined paper for field sketching, note-taking, and leaf rubbings.' },
      { item: 'Dual Liquid Thermometers (Air & Water)', ratio: '1 pair per group of 5', description: 'Alcohol-based protective casing thermometers (-10°C to +50°C).' },
      { item: 'Hand Lenses & Soil Testing Rulers', ratio: '1 per 2 students', description: '10x optical magnification hand lenses for examining bark lichens and soil grain sizes.' }
    ],
    itineraryTimeline: [
      { time: '09:00 - 09:20', phase: 'Arrival & Safety Muster', activity: 'Buddy pair check, perimeter boundary orientation, weather verification.', facultyRole: 'Confirm attendance, distribute binoculars, enforce shoreline perimeter.' },
      { time: '09:20 - 10:20', phase: 'Visual Bird & Flora Transect', activity: 'Walk 500m shoreline transect, log 5 bird species and 3 tree species.', facultyRole: 'Demonstrate bird key usage and guide species sketching.' },
      { time: '10:20 - 10:50', phase: 'Soil & Water Diagnostics', activity: 'Record air/water temperatures and conduct the hand-feel soil texture test.', facultyRole: 'Supervise water sampling; ensure no wading past ankle depth.' },
      { time: '10:50 - 11:20', phase: 'Elder Oral History Circle', activity: 'Group interview with village elder on historic water freeze and bird flocks.', facultyRole: 'Facilitate respectful dialogue; verify students record notes in Kashmiri/English.' },
      { time: '11:20 - 11:45', phase: 'Journal Review & Wrap-up', activity: 'Students complete sketches, buddy review journals, teacher signs field sheets.', facultyRole: 'Inspect journals, sign off sheets, perform final Leave No Trace site sweep.' }
    ],
    safetyDirectives: [
      'Mandatory 1 faculty supervisor or certified teacher per 8 students.',
      'Strict 3-meter shoreline safety barrier: no student steps into water without faculty presence.',
      'Mandatory student buddy pairs: buddies must remain within eye contact at all times.',
      'Emergency first-aid kit, hydration supply, and teacher whistle required on site.'
    ],
    statutoryPermits: [
      'Institutional Principal authorization letter on school letterhead.',
      'Signed parental/guardian consent and medical release form for each student.',
      'Department of Wildlife Protection academic intimation letter for protected sanctuaries.'
    ],
    assessmentGradingRubric: [
      { criterion: 'Nature Journal Completeness', weight: '30%', description: 'Clear entries for date, weather, air/water temperatures, and habitat characteristics.' },
      { criterion: 'Species Observation Accuracy', weight: '30%', description: 'Accurate sketches and identification of at least 3 bird and 2 plant species with local names.' },
      { criterion: 'Field Safety & Buddy Adherence', weight: '20%', description: 'Strict compliance with buddy system, safety perimeters, and Leave No Trace rules.' },
      { criterion: 'Oral History Synthesis', weight: '20%', description: 'Thoughtful transcription of elder recollections comparing past and present conditions.' }
    ],
    dataSubmissionProtocol: [
      'Faculty logs into the Kashmir EcoWatch Outdoor Classroom teacher portal.',
      'Batch upload anonymized student bird counts and temperature logs (e.g. STU-FND-001 to 030).',
      'Attach 3 selected student nature journal sketch scans for school portfolio citation.'
    ]
  },

  intermediate: {
    tierId: 'intermediate',
    tierName: 'Intermediate Tier',
    courseCode: 'JK-OD-INT-910',
    targetAudience: 'Classes 9–10 (Secondary School)',
    ageBracket: '14–15 Years',
    academicAlignment: [
      'JKBOSE Classes 9–10 Science (Natural Resources, Water Chemistry, Forest Ecology)',
      'CBSE Secondary Environmental Science Curriculum',
      'National Green Corps (NGC) Eco-Club Action Framework'
    ],
    pedagogicalObjectives: [
      'Train students in digital multi-parameter environmental telemetry (pH, EC, TDS).',
      'Introduce quantitative ecological sampling: tree DBH forestry measurements and Secchi transparency.',
      'Analyze seasonal water level changes and karst spring discharge dynamics.',
      'Understand statutory conservation frameworks under the Wildlife Protection Act 1972.'
    ],
    equipmentKit: [
      { item: 'Digital Multi-Parameter Water Pen', ratio: '1 pen per 5 students', description: 'Waterproof digital sensor measuring pH, Electrical Conductivity (µS/cm), and TDS (ppm).' },
      { item: 'Standard 20cm Secchi Disk', ratio: '1 per group', description: 'Calibrated black-and-white disc with 5-meter marked measuring cord for water clarity.' },
      { item: '30m Fiberglass Measuring Tape & DBH Calipers', ratio: '1 set per 5 students', description: 'Forestry measuring tape for tree girth and 10m riparian buffer transects.' },
      { item: 'Handheld GPS / Geotagging Smartphone', ratio: '1 per group', description: 'Logging latitude/longitude coordinates (WGS84 datum) and elevation.' }
    ],
    itineraryTimeline: [
      { time: '09:00 - 09:30', phase: 'Sensor Calibration Check', activity: 'Buffer solution check (pH 7.00), GPS waypoint lock, task assignment.', facultyRole: 'Verify sensor calibration and review numerical data entry guidelines.' },
      { time: '09:30 - 10:45', phase: 'Limnological & Waterway Diagnostics', activity: 'Deploy Secchi disk, log pH, EC, water temperature at 3 distinct sampling stations.', facultyRole: 'Ensure duplicate readings and oversee shikara or shoreline security.' },
      { time: '10:45 - 11:30', phase: 'Riparian Forest DBH Transect', activity: 'Measure girth of 10 Chinar, Willow, or Poplar trees; compute DBH = Girth / π.', facultyRole: 'Guide tape placement at 1.37m breast height and verify calculations.' },
      { time: '11:30 - 12:15', phase: 'Elder Oral History on Spring Yields', activity: 'Interview local Mirab (water bailiff) or village elder on spring discharge shifts.', facultyRole: 'Moderate interview; prompt discussion on irrigation canal shifts.' },
      { time: '12:15 - 13:00', phase: 'Data Synthesis & Sign-off', activity: 'Calculate mean values, identify anomalies, supervising teacher audit.', facultyRole: 'Review plausibility bounds; approve data batch for portal upload.' }
    ],
    safetyDirectives: [
      'Mandatory life vests for any shikara or boat-based water testing on lakes.',
      'No contact with stagnant outfall drain water without nitrile protective gloves.',
      'Strict adherence to forest trail boundaries to prevent sudden wildlife encounters.',
      'Designated student safety captain in each 5-member team.'
    ],
    statutoryPermits: [
      'School Administrative Approval letter with approved student roster.',
      'Signed parental consent and health clearance for field diagnostic work.',
      'Wetland Authority (WUCMA / LCMA) notification for sampling inside protected lake zones.'
    ],
    assessmentGradingRubric: [
      { criterion: 'Instrumental Diagnostic Precision', weight: '25%', description: 'Accurate sensor operation, calibrated pH/EC values, and duplicate consistency.' },
      { criterion: 'Forestry DBH Calculations', weight: '25%', description: 'Correct circumference to DBH conversion and basal canopy cover estimation.' },
      { criterion: 'Analytical Interpretation', weight: '25%', description: 'Plausible explanation of Secchi clarity vs eutrophication and runoff indicators.' },
      { criterion: 'Elder Historical Narrative Synthesis', weight: '25%', description: 'Structured documentation comparing current telemetry with historic water levels.' }
    ],
    dataSubmissionProtocol: [
      'Upload verified readings to Kashmir EcoWatch Field Telemetry Feed.',
      'Include site code (e.g. KEW-OD-LAK-002), GPS coordinates, and water quality parameters.',
      'Submit batch for institutional certification credit.'
    ]
  },

  advanced: {
    tierId: 'advanced',
    tierName: 'Advanced Tier',
    courseCode: 'JK-OD-ADV-1112',
    targetAudience: 'Classes 11–12 (Higher Secondary)',
    ageBracket: '16–17 Years',
    academicAlignment: [
      'JKBOSE Higher Secondary Environmental Science / Chemistry / Biology Syllabi',
      'CBSE Classes 11–12 Ecology & Environmental Chemistry Curriculum',
      'Department of School Education Science Talent & Olympiad Framework'
    ],
    pedagogicalObjectives: [
      'Conduct rigorous chemical limnology: Dissolved Oxygen (Winkler titration) and nutrient assays.',
      'Execute quadrat vegetation sampling and calculate community diversity indexes.',
      'Correlate ground-truth telemetry with multi-epoch satellite change detection rasters.',
      'Evaluate statutory Environmental Impact Assessment (EIA) mandates in Western Himalayan basins.'
    ],
    equipmentKit: [
      { item: 'Portable Dissolved Oxygen Chemical Test Kit', ratio: '1 kit per 5 students', description: 'Azide-modified Winkler method reagents, titrator syringes, and manganese sulfate bottles.' },
      { item: 'Soil & Water NPK Chemical Colorimeter', ratio: '1 set per team', description: 'Colorimetric comparator discs for Nitrate-Nitrogen (0-10 ppm) and Orthophosphate (0-5 ppm).' },
      { item: '1m × 1m Folding Aluminum Quadrats', ratio: '2 per group', description: 'Divided into 100 sub-squares for alpine meadow and wetland macrophyte coverage.' },
      { item: 'Offline GIS Tablet with Sentinel-2 Overlays', ratio: '1 per group', description: 'Preloaded with NDVI and MNDWI satellite rasters for ground-truthing spatial change.' }
    ],
    itineraryTimeline: [
      { time: '08:30 - 09:15', phase: 'Pre-Tour Scientific Briefing', activity: 'Formulate hypotheses on nutrient loading, review Winkler chemical protocol.', facultyRole: 'Deliver safety and reagent handling protocol; check personal protective equipment.' },
      { time: '09:15 - 11:00', phase: 'Multi-Point Chemical Titration', activity: 'Collect bottom & surface water samples, fix DO on site, perform colorimetric assays.', facultyRole: 'Supervise chemical handling and verify titration end-point starch indicators.' },
      { time: '11:00 - 12:15', phase: 'Quadrat Macrophyte Survey', activity: 'Deploy 5 quadrats along littoral zone; calculate Trapa natans vs open water ratio.', facultyRole: 'Assist with botanical keys and statistical frequency calculations.' },
      { time: '12:15 - 13:00', phase: 'Satellite Raster Ground-Truthing', activity: 'Compare observed weed mats and shoreline encroachment with Sentinel-2 rasters.', facultyRole: 'Guide spatial cross-validation and error documentation.' },
      { time: '13:00 - 14:00', phase: 'Oral History & Capstone Synthesis', activity: 'Interview elder on 40-year paddy-to-orchard conversion; compile research paper.', facultyRole: 'Audit research methodology and sign off on peer-reviewed submission batch.' }
    ],
    safetyDirectives: [
      'Mandatory chemical splash goggles and nitrile gloves during Winkler titration.',
      'Strict chemical neutralization and waste collection: zero chemical reagent dumped into water.',
      'High-altitude sun and cold protection (minimum 1.5L water, UV sunglasses, thermal layers).',
      'Faculty mentor must carry certified first-aid kit and emergency rescue beacon contact.'
    ],
    statutoryPermits: [
      'Formal academic research entry permit from J&K Wildlife Protection Department.',
      'Institutional laboratory hazardous material disposal protocol compliance certificate.',
      'Parental informed consent including emergency medical contact and insurance details.'
    ],
    assessmentGradingRubric: [
      { criterion: 'Chemical Titration Precision (DO/BOD)', weight: '25%', description: 'Accurate titration technique, duplicate margin within ±0.2 mg/L, correct calculations.' },
      { criterion: 'Ecological Quadrat Analysis', weight: '25%', description: 'Accurate calculation of species frequency, density, and Simpson diversity index.' },
      { criterion: 'Satellite Raster Correlation', weight: '25%', description: 'Rigorous ground-truth comparison against Sentinel-2 NDVI/MNDWI spatial rasters.' },
      { criterion: 'Scientific Monograph Quality', weight: '25%', description: 'Structured research paper presentation with abstract, data tables, and conservation policy recommendations.' }
    ],
    dataSubmissionProtocol: [
      'Data submitted under EcoWatch Peer-Review Open Science Tier.',
      'Requires supervising faculty signature and laboratory reagent batch certification.',
      'Qualifies participating students for the Advanced Western Himalayan Field Scholar Certificate.'
    ]
  },

  undergraduate: {
    tierId: 'undergraduate',
    tierName: 'Undergraduate Tier',
    courseCode: 'JK-OD-UG-COL',
    targetAudience: 'Degree Colleges & University Students',
    ageBracket: '18–22 Years',
    academicAlignment: [
      'University of Kashmir / Cluster University B.Sc. Environmental Science Syllabus',
      'National Assessment and Accreditation Council (NAAC) Institutional Outreach Mandate',
      'National Green Tribunal (NGT) Environmental Audit & Public Science Framework'
    ],
    pedagogicalObjectives: [
      'Design landscape-scale catchment research and long-term limnological monitoring stations.',
      'Execute benthic macroinvertebrate sampling and calculate Biological Monitoring Working Party (BMWP) and EPT indexes.',
      'Perform hydrological streamflow gauging using velocity-area methods and flume profiling.',
      'Publish peer-reviewed open datasets to the Kashmir EcoWatch Himalayan Research Repository.'
    ],
    equipmentKit: [
      { item: 'Acoustic / Mechanical Current Flow Meter', ratio: '1 per group', description: 'Digital electromagnetic stream velocity sensor (0.01 - 5.0 m/s range) with wading rod.' },
      { item: 'Benthic Macroinvertebrate Kick-Net (500µm)', ratio: '1 per group', description: 'Heavy-duty D-frame net with 500-micron nitex mesh for riffle stream sampling.' },
      { item: 'Field Multiparameter Probe Sonde', ratio: '1 per group', description: 'Optical DO, turbidity (NTU), conductivity, and depth sensor with Bluetooth telemetry.' },
      { item: 'Specimen Preservation & Field Microscopes', ratio: '1 kit per team', description: '70% ethanol sample vials, sorting trays, forceps, and field dissecting stereomicroscopes.' }
    ],
    itineraryTimeline: [
      { time: '08:00 - 09:00', phase: 'Transect Station Reconnaissance', activity: 'Establish stream gauging cross-section, measure channel geometry and slope.', facultyRole: 'Oversee channel safety, determine hydraulic section, assign sampling stations.' },
      { time: '09:00 - 11:30', phase: 'Hydrological Gauging & Sonde Profiling', activity: 'Log stream velocity across 10 verticals; record multiparameter sonde profiles.', facultyRole: 'Verify velocity-area discharge calculation Q = ∑(w_i × d_i × v_i).' },
      { time: '11:30 - 13:30', phase: 'Benthic Kick-Net Bioindicator Survey', activity: 'Collect 3-minute kick samples in riffles; sort and identify Ephemeroptera, Plecoptera, Trichoptera.', facultyRole: 'Confirm family-level taxonomic identification; compute EPT and BMWP index scores.' },
      { time: '13:30 - 14:30', phase: 'Point-Source Effluent & Outfall Audit', activity: 'Map municipal and agricultural drainage outfalls, document chemical plumes.', facultyRole: 'Guide compliance auditing against NGT environmental flow standards.' },
      { time: '14:30 - 16:00', phase: 'Data Validation & Ledger Publishing', activity: 'Input statistical data into open repository, assign citable DOI identifier.', facultyRole: 'Perform final peer review and authorize open science platform publishing.' }
    ],
    safetyDirectives: [
      'Mandatory swift-water wading safety gear (waders with wading belt, non-slip footwear).',
      'No wading in water velocities exceeding 1.2 m/s or depths above mid-thigh.',
      'Hydrological safety observer stationed upstream to watch for sudden discharge surges.',
      'Full biological sample preservation compliance under national biodiversity rules.'
    ],
    statutoryPermits: [
      'University / College Departmental Research Authorization.',
      'Fisheries Department permission for non-destructive macroinvertebrate sampling.',
      'Irrigation & Flood Control Department intimation for streamflow gauging stations.'
    ],
    assessmentGradingRubric: [
      { criterion: 'Hydraulic Discharge Precision', weight: '25%', description: 'Correct cross-sectional velocity profiling, depth calibration, and discharge calculation.' },
      { criterion: 'Benthic Bioindicator Taxonomy', weight: '25%', description: 'Accurate family-level macroinvertebrate classification and BMWP water quality rating.' },
      { criterion: 'Catchment Stressor Assessment', weight: '25%', description: 'Methodological mapping of pollution outfalls and correlation with biological metrics.' },
      { criterion: 'Open Data Monograph Publication', weight: '25%', description: 'Publication of clean, standardized metadata and findings to the EcoWatch public portal.' }
    ],
    dataSubmissionProtocol: [
      'Data published under Kashmir EcoWatch Open Research License (CC BY-SA 4.0).',
      'Generates a permanent research DOI citation for college department annual reports.',
      'Qualifies undergraduates for the Limnological & Forest Research Investigator Distinction.'
    ]
  },

  'research-mentor': {
    tierId: 'research-mentor',
    tierName: 'Research Mentor & Faculty Tier',
    courseCode: 'KEW-OD-FAC-GUIDE',
    targetAudience: 'School Educators, College Faculty & Research Scientists',
    ageBracket: 'Professional Mentors',
    academicAlignment: [
      'J&K Higher Education Faculty Research & Extension Guidelines',
      'Department of School Education Teacher Professional Development Standards',
      'UGC / AICTE Community Engagement & Environmental Fieldwork Norms'
    ],
    pedagogicalObjectives: [
      'Lead institutional field safety, risk management, and statutory permit acquisitions.',
      'Supervise instrument calibration and uphold Quality Assurance / Quality Control (QA/QC) standards.',
      'Ensure strict child data privacy compliance through cryptographic student PII anonymization.',
      'Bridge school cohorts with academic research departments and co-author regional ecological monographs.'
    ],
    equipmentKit: [
      { item: 'Certified Calibration Buffer Standards', ratio: '1 set per institution', description: 'NIST-traceable buffer standards (pH 4.01, 7.00, 10.01; EC 1413 µS/cm) for instrument verification.' },
      { item: 'Faculty Emergency Field Dispatch Kit', ratio: '1 per lead mentor', description: 'Comprehensive medical trauma kit, satellite rescue beacon, emergency contact registry, and thermal bivy.' },
      { item: 'Master Telemetry Audit Console', ratio: '1 per faculty', description: 'Secure web credentials for auditing and approving student observations on Kashmir EcoWatch.' },
      { item: 'Oral History Audio / Video Archive Recorder', ratio: '1 per institution', description: 'High-fidelity directional microphone and audio recorder for archival elder narratives.' }
    ],
    itineraryTimeline: [
      { time: 'Pre-Tour (T-7 Days)', phase: 'Statutory Clearances & Risk Audit', activity: 'File sanctuary entry permits, collect guardian consent forms, audit student buddy assignments.', facultyRole: 'Sign legal declarations and conduct pre-field safety briefing with students.' },
      { time: 'Pre-Tour (T-1 Day)', phase: 'Laboratory Calibration & QA/QC', activity: 'Calibrate all digital pens and chemical test kits against reference standards; log calibration certificates.', facultyRole: 'Reject faulty or drifting sensors; confirm reagent expiry dates.' },
      { time: 'Tour Execution', phase: 'Fieldwork Leadership & Safety Supervision', activity: 'Direct transect distribution, enforce water perimeters, monitor weather shifts and cold exposure.', facultyRole: 'Oversee student safety, handle unexpected logistics, coordinate with local rangers.' },
      { time: 'Post-Tour (T+2 Days)', phase: 'Telemetry Verification & Plausibility Audit', activity: 'Review student provisional submissions on the portal; flag mathematical or spatial outliers.', facultyRole: 'Approve verified records; recommend students for competency certification.' },
      { time: 'Post-Tour (T+7 Days)', phase: 'Institutional Synthesis & Ledger Entry', activity: 'File institutional tour report with EcoWatch board; update school Eco-Club leaderboard ranking.', facultyRole: 'Publish school report and distribute official verified student diplomas.' }
    ],
    safetyDirectives: [
      'Lead mentor retains absolute veto authority to cancel or abort study tours upon severe weather alerts.',
      'Must maintain real-time communications with local police, SDRF, and nearest Primary Health Centre.',
      'Strict Zero Minor PII Exposure: All public observation logs must use anonymized tokens (STU-xxx).',
      'Mandatory Leave No Trace site inspection before vacating any natural habitat.'
    ],
    statutoryPermits: [
      'Standing MoU or Institutional Registration Agreement with Kashmir EcoWatch.',
      'Chief Wildlife Warden research authorization for protected wetlands and national parks.',
      'Institutional safety indemnity bond and school management committee (SMC) approval.'
    ],
    assessmentGradingRubric: [
      { criterion: 'Institutional Safety Compliance', weight: '30%', description: 'Zero safety incidents, 100% guardian consent collection, and strict perimeter enforcement.' },
      { criterion: 'Scientific QA/QC Rigor', weight: '30%', description: 'Instrument calibration adherence and accurate identification/correction of student data errors.' },
      { criterion: 'Pedagogical Mentorship Impact', weight: '20%', description: 'Effective student guidance, inclusive cohort participation, and encouragement of female scientists.' },
      { criterion: 'Open Data Contribution', weight: '20%', description: 'Timely validation of institutional field batches and submission to the open Himalayan ledger.' }
    ],
    dataSubmissionProtocol: [
      'Faculty mentor acts as the formal institutional gatekeeper on the platform.',
      'Approved batches are cryptographically signed by the faculty lead prior to ledger ingestion.',
      'Bestows eligibility for the Kashmir EcoWatch Science Mentor Fellowship & Annual Citation.'
    ]
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. STUDENT FIELD INVESTIGATION SHEETS (ALL 5 TIERS)
// ─────────────────────────────────────────────────────────────────────────────

export const TIER_STUDENT_FIELD_SHEETS: Record<string, TierStudentFieldSheet> = {
  foundation: {
    tierId: 'foundation',
    tierName: 'Foundation Tier',
    sheetCode: 'SFS-FND-2026',
    targetGrades: 'Classes 6–8 (Middle School)',
    title: 'Student Field Investigation Sheet',
    subtitle: 'Sensory Observation, Waterbird Census & Botanical Sketch Log',
    instructions: [
      'Fill in all header details in pencil before beginning field observations.',
      'Work closely with your assigned student buddy. Never cross the shoreline safety flags.',
      'Use 8x42 binoculars to identify at least 3 bird species. Note their color, bill shape, and behavior.',
      'Record water and air temperatures carefully. Touch the soil to test its texture.',
      'Listen respectfully during the elder oral history interview and write down their exact words.'
    ],
    headerFields: [
      { label: 'Student Full Name', placeholder: 'e.g. Faizan Ahmad Wani' },
      { label: 'Anonymized Token ID', placeholder: 'e.g. STU-SRI-042' },
      { label: 'School / Institution', placeholder: 'e.g. DPS Srinagar' },
      { label: 'Assigned Student Buddy', placeholder: 'e.g. Sahil Mir' },
      { label: 'Ecosystem Study Site', placeholder: 'e.g. Hokersar Wetland (KEW-OD-WET-001)' },
      { label: 'Date of Observation', placeholder: 'DD / MM / YYYY' },
      { label: 'Current Weather', placeholder: 'Sunny / Overcast / Breezy / Light Rain' }
    ],
    diagnosticsSection: {
      title: 'Station Diagnostics: Physical Environment',
      parameters: [
        { name: 'Air Temperature', unit: '°C', normalRange: '8.0 – 22.0 °C', notes: 'Hold thermometer in shade, 1m above ground. Wait 2 minutes.' },
        { name: 'Water Temperature', unit: '°C', normalRange: '6.0 – 16.0 °C', notes: 'Submerge thermometer 10cm beneath surface. Read while submerged.' },
        { name: 'Water Transparency', unit: 'Visual', normalRange: 'Clear / Slightly Murky / Muddy', notes: 'Look down into water: Can you see the wetland bottom?' },
        { name: 'Soil Texture Feel Test', unit: 'Texture Class', normalRange: 'Sandy / Silty / Clayey', notes: 'Rub a moist pinch between thumb and forefinger: Gritty, smooth, or sticky?' }
      ]
    },
    censusSection: {
      title: 'Biodiversity Census: Waterfowl & Common Trees',
      columns: ['Common Name', 'Kashmiri Local Name', 'Scientific Name', 'Count', 'Habitat / Activity'],
      sampleRows: [
        { commonName: 'Mallard Duck', kashmiriName: 'Niluj', scientificName: 'Anas platyrhynchos', typicalHabitat: 'Feeding in open water channels' },
        { commonName: 'Common Teal', kashmiriName: 'Kank', scientificName: 'Anas crecca', typicalHabitat: 'Resting in shallow reeds' },
        { commonName: 'Grey Heron', kashmiriName: 'Braag', scientificName: 'Ardea cinerea', typicalHabitat: 'Standing motionless along marsh border' },
        { commonName: 'Oriental Plane (Chinar)', kashmiriName: 'Booni', scientificName: 'Platanus orientalis', typicalHabitat: 'High shoreline embankment' },
        { commonName: 'Weeping Willow', kashmiriName: 'Veer', scientificName: 'Salix babylonica', typicalHabitat: 'Marsh edge with roots submerged' }
      ]
    },
    oralHistorySection: {
      title: 'Intergenerational Dialogue: Village Elder Interview',
      elderPrompts: [
        'Name & Estimated Age of Elder: _____________________________ | Village: _____________________________',
        'Question 1: "When you were our age, how high did the water reach in this marsh during summer?"',
        'Question 2: "Did this wetland freeze completely in winter so people could walk across it? When did you last see that?"',
        'Question 3: "What birds or fish used to be abundant here that are rarely seen today?"'
      ],
      documentationGuidelines: 'Write down the elder’s answers using their own words. Note any Kashmiri terms they use for seasons, birds, or plants.'
    },
    sketchSection: {
      title: 'Field Observation Sketch',
      guidelines: 'Draw a detailed sketch of one bird species or tree leaf observed today. Label the bill, feathers, or leaf margins.'
    },
    certificationSection: {
      teacherSignoffText: 'I certify that the student conducted these observations safely under faculty supervision.',
      stampFieldText: 'Supervising Teacher Signature & School Eco-Club Seal'
    }
  },

  intermediate: {
    tierId: 'intermediate',
    tierName: 'Intermediate Tier',
    sheetCode: 'SFS-INT-2026',
    targetGrades: 'Classes 9–10 (Secondary School)',
    title: 'Student Field Investigation Sheet',
    subtitle: 'Multi-Parameter Limnology, Forestry DBH Transect & Hydrological Survey',
    instructions: [
      'Verify digital pen calibration in pH 7.00 buffer before taking first reading.',
      'Take measurements at 3 distinct sampling stations. Record values in triplicate and compute the average.',
      'Measure tree circumference at exactly 1.37m (breast height). Compute DBH = Circumference / 3.1416.',
      'Deploy the Secchi disk slowly until the black-and-white pattern vanishes. Record depth in centimeters.',
      'Ensure all GPS coordinates are recorded using the WGS84 decimal degree format.'
    ],
    headerFields: [
      { label: 'Student Full Name', placeholder: 'e.g. Zehra Fatima' },
      { label: 'Student Token ID', placeholder: 'e.g. STU-BAR-017' },
      { label: 'Institution / High School', placeholder: 'e.g. GGMHSS Baramulla' },
      { label: 'Ecosystem Site Code', placeholder: 'e.g. KEW-OD-LAK-002 (Wular Basin)' },
      { label: 'GPS Coordinates', placeholder: '34.331° N, 74.562° E' },
      { label: 'Elevation Above MSL', placeholder: '1,578 meters' },
      { label: 'Date & Time of Sampling', placeholder: 'DD / MM / YYYY at HH:MM' }
    ],
    diagnosticsSection: {
      title: 'Quantitative Limnological Diagnostics (3-Station Composite)',
      parameters: [
        { name: 'Water Temperature', unit: '°C', normalRange: '8.0 – 18.0 °C', notes: 'Digital thermistor probe reading at 20cm depth.' },
        { name: 'pH (Hydrogen Ion Conc.)', unit: 'pH Units', normalRange: '7.2 – 8.6 pH', notes: 'Digital pen. Values >8.8 indicate high photosynthetic algal activity.' },
        { name: 'Electrical Conductivity', unit: 'µS/cm', normalRange: '180 – 450 µS/cm', notes: 'Elevated EC indicates dissolved ionic salts or sewage outfall.' },
        { name: 'Total Dissolved Solids (TDS)', unit: 'ppm / mg/L', normalRange: '110 – 300 ppm', notes: 'Calculated by conductivity pen.' },
        { name: 'Secchi Disk Transparency', unit: 'Centimeters (cm)', normalRange: '45 – 180 cm', notes: 'Average of depth of disappearance and depth of reappearance.' }
      ]
    },
    censusSection: {
      title: 'Riparian Forest Stand & Tree Girth (DBH) Transect',
      columns: ['Tree #', 'Species Name', 'Circumference at 1.37m (cm)', 'Calculated DBH (cm)', 'Canopy Cover %', 'Regeneration Notes'],
      sampleRows: [
        { commonName: 'Tree 01: Oriental Plane', kashmiriName: 'Booni', scientificName: 'Circumference = 345 cm', typicalHabitat: 'DBH = 109.8 cm | Canopy: 85%' },
        { commonName: 'Tree 02: Weeping Willow', kashmiriName: 'Veer', scientificName: 'Circumference = 120 cm', typicalHabitat: 'DBH = 38.2 cm | Canopy: 60%' },
        { commonName: 'Tree 03: White Willow', kashmiriName: 'Badaam Veer', scientificName: 'Circumference = 95 cm', typicalHabitat: 'DBH = 30.2 cm | Canopy: 50%' },
        { commonName: 'Tree 04: Black Poplar', kashmiriName: 'Phres', scientificName: 'Circumference = 140 cm', typicalHabitat: 'DBH = 44.5 cm | Canopy: 65%' },
        { commonName: 'Tree 05: River Alder', kashmiriName: 'Kunz', scientificName: 'Circumference = 80 cm', typicalHabitat: 'DBH = 25.5 cm | Canopy: 40%' }
      ]
    },
    oralHistorySection: {
      title: 'Hydrological Oral History: Water Bailiff (Mirab) / Elder Dialogue',
      elderPrompts: [
        'Informant Name & Role: _________________________________________ | Age: ______ | Village: __________________',
        'Prompt 1: "How many weeks earlier is the spring snowmelt runoff occurring now compared to 30 years ago?"',
        'Prompt 2: "Have local irrigation canals (*Kuhls*) experienced mid-summer drying in recent seasons?"',
        'Prompt 3: "What changes have you noticed in the fish catch (*Schizothorax* / *Chush*) in this river stretch?"'
      ],
      documentationGuidelines: 'Document specific seasonal calendars (e.g. shifts from *Veth* to *Har*) and changes in water management practices.'
    },
    sketchSection: {
      title: 'Riparian Buffer Cross-Section Profile',
      guidelines: 'Draw a lateral cross-section diagram showing: River Channel → Shoreline Reed Bed → Willow Grove → Agricultural/Road Boundary.'
    },
    certificationSection: {
      teacherSignoffText: 'I have checked the instrument calibration records and verified the mathematical accuracy of the DBH calculations.',
      stampFieldText: 'Lead Science Faculty Signature & Accreditation Badge'
    }
  },

  advanced: {
    tierId: 'advanced',
    tierName: 'Advanced Tier',
    sheetCode: 'SFS-ADV-2026',
    targetGrades: 'Classes 11–12 (Higher Secondary)',
    title: 'Student Field Research Dossier',
    subtitle: 'Chemical Limnology, Dissolved Oxygen Titration, Quadrat Ecology & GIS Ground-Truthing',
    instructions: [
      'Wear chemical splash goggles and nitrile gloves during all reagent handling.',
      'Fix dissolved oxygen immediately upon sample collection using Manganese Sulfate and Alkaline Potassium Iodide.',
      'Record titrant volume to the nearest 0.05 mL using the micro-titrator syringe.',
      'Deploy 1m × 1m quadrats along an elevation gradient; calculate species percentage cover.',
      'Compare on-ground weed and open-water boundaries with Sentinel-2 NDVI raster maps.'
    ],
    headerFields: [
      { label: 'Lead Student Investigator', placeholder: 'e.g. Muneeb Ul Haq' },
      { label: 'Investigator Token ID', placeholder: 'e.g. STU-ANA-009' },
      { label: 'Higher Secondary School / College', placeholder: 'e.g. GDC Khanabal' },
      { label: 'Ecosystem Site & Code', placeholder: 'e.g. Overa-Aru Glacial Catchment (KEW-OD-MNT-005)' },
      { label: 'GPS Datum & Accuracy', placeholder: 'WGS84 ± 2.5 meters' },
      { label: 'Elevation (Meters MSL)', placeholder: '2,420 m' },
      { label: 'Sampling Transect ID', placeholder: 'TRANSECT-ARU-01' }
    ],
    diagnosticsSection: {
      title: 'Chemical Limnology & Nutrient Assay Data Matrix',
      parameters: [
        { name: 'Dissolved Oxygen (DO)', unit: 'mg/L (ppm)', normalRange: '6.5 – 11.5 mg/L', notes: 'Azide-modified Winkler titration method. Titrate with 0.025N Sodium Thiosulfate.' },
        { name: 'Water Temperature', unit: '°C', normalRange: '4.0 – 14.0 °C', notes: 'Recorded simultaneously with DO sample bottle filling.' },
        { name: 'Oxygen Saturation %', unit: 'Percentage %', normalRange: '80 – 105 %', notes: 'Calculated using temperature-DO solubility nomograph.' },
        { name: 'Nitrate-Nitrogen (NO3-N)', unit: 'mg/L', normalRange: '0.1 – 2.5 mg/L', notes: 'Cadmium reduction / colorimetric comparator test.' },
        { name: 'Orthophosphate (PO4-P)', unit: 'mg/L', normalRange: '0.02 – 0.35 mg/L', notes: 'Ascorbic acid method. Values >0.1 indicate progressive eutrophication.' },
        { name: 'Carlson Trophic State Index', unit: 'TSI Score (0-100)', normalRange: '40 – 65 TSI', notes: 'Computed from Secchi depth: TSI(SD) = 60 - 14.41 ln(SD in meters).' }
      ]
    },
    censusSection: {
      title: 'Vegetation Quadrat Sampling: Community Composition & Diversity',
      columns: ['Quadrat #', 'Dominant Plant Species', 'Botanical Family', 'Cover % (0-100%)', 'Trophic Stratum', 'Phenological State'],
      sampleRows: [
        { commonName: 'Quadrat 1 (Subalpine)', kashmiriName: 'Himalayan Blue Pine', scientificName: 'Pinus wallichiana', typicalHabitat: 'Cover: 45% | Overstory | Seedling stage' },
        { commonName: 'Quadrat 2 (Understory)', kashmiriName: 'Himalayan Birch', scientificName: 'Betula utilis (Burza)', typicalHabitat: 'Cover: 30% | Mid-canopy | Bark peeling' },
        { commonName: 'Quadrat 3 (Ground flora)', kashmiriName: 'Himalayan Belladonna', scientificName: 'Atropa acuminata', typicalHabitat: 'Cover: 15% | Herbaceous layer | Flowering' },
        { commonName: 'Quadrat 4 (Riparian edge)', kashmiriName: 'Himalayan Knotweed', scientificName: 'Persicaria nepalensis', typicalHabitat: 'Cover: 25% | Ground cover | Vegetative' },
        { commonName: 'Quadrat 5 (Degraded fringe)', kashmiriName: 'Stinging Nettle', scientificName: 'Urtica dioica (Soi)', typicalHabitat: 'Cover: 35% | Disturbed ground | Fruiting' }
      ]
    },
    oralHistorySection: {
      title: 'Landscape Transformation Oral Archive: 40-Year Retrospective',
      elderPrompts: [
        'Informant Identity & Heritage: ________________________________ | Age: ______ | Occupation: Traditional Shepherd / Farmer',
        'Research Question 1: "What was the extent of snow cover on this slope in November during the 1980s versus today?"',
        'Research Question 2: "When did the conversion from traditional paddy / alpine pasture to commercial orchards / tourism structures begin here?"',
        'Research Question 3: "Have migratory wildlife routes (Hangul / Black Bear) shifted closer to the village? Why?"'
      ],
      documentationGuidelines: 'Correlate elder testimony with multi-decadal Landsat satellite data to identify land-use land-cover (LULC) inflection points.'
    },
    sketchSection: {
      title: 'Satellite Ground-Truth Verification Map',
      guidelines: 'Sketch observed boundaries of forest canopy loss, wetland infilling, or construction vs the pre-loaded satellite raster.'
    },
    certificationSection: {
      teacherSignoffText: 'I confirm that chemical reagents were safely handled and neutralized, and the data meets academic research standards.',
      stampFieldText: 'Faculty Research Mentor Signature & University Department Seal'
    }
  },

  undergraduate: {
    tierId: 'undergraduate',
    tierName: 'Undergraduate Tier',
    sheetCode: 'SFS-UG-COL-2026',
    targetGrades: 'Degree Colleges & University Students',
    title: 'Undergraduate Field Research Dossier',
    subtitle: 'Stream Hydrometry, Benthic Macroinvertebrate Bioindicators (BMWP/EPT) & Catchment EIA',
    instructions: [
      'Calibrate electromagnetic flow meter in zero-velocity water prior to transect profiling.',
      'Divide stream channel into at least 10 vertical intervals; measure velocity at 0.6 of total depth.',
      'Perform standardized 3-minute kick-net sampling across riffle and pool microhabitats.',
      'Preserve macroinvertebrate voucher specimens in 70% ethanol for laboratory stereomicroscopy.',
      'Log all point-source municipal and agricultural drainage outfalls with differential GPS.'
    ],
    headerFields: [
      { label: 'Principal Student Researcher', placeholder: 'e.g. Asif Rashid Lone' },
      { label: 'Institutional Affiliation', placeholder: 'e.g. Cluster University Srinagar / SP College' },
      { label: 'Degree Program / Semester', placeholder: 'B.Sc. Environmental Science, Semester V' },
      { label: 'Catchment & Stream ID', placeholder: 'Sindh River Basin / Station SR-04' },
      { label: 'GPS Waypoint Coordinates', placeholder: '34.2892° N, 74.7714° E' },
      { label: 'Wetted Channel Width (m)', placeholder: '14.8 meters' },
      { label: 'Hydraulic Reach Classification', placeholder: 'Gravel-bed Riffle / High Gradient' }
    ],
    diagnosticsSection: {
      title: 'Hydrometric Streamflow & Sonde Water Quality Profiling',
      parameters: [
        { name: 'Mean Stream Velocity', unit: 'm/s', normalRange: '0.45 – 1.85 m/s', notes: 'Area-weighted velocity across 10 cross-section verticals.' },
        { name: 'Cross-Sectional Area (A)', unit: 'm²', normalRange: '6.5 – 22.0 m²', notes: 'Calculated: A = ∑(w_i × d_i).' },
        { name: 'Calculated Discharge (Q)', unit: 'm³/s (Cumecs)', normalRange: '3.5 – 35.0 m³/s', notes: 'Discharge formula: Q = ∑(w_i × d_i × v_i).' },
        { name: 'Optical Turbidity', unit: 'NTU', normalRange: '2.5 – 45.0 NTU', notes: 'Nephelometric Turbidity Units via multiparameter sonde.' },
        { name: 'Specific Electrical Cond. (SEC)', unit: 'µS/cm @ 25°C', normalRange: '140 – 380 µS/cm', notes: 'Temperature-compensated conductivity.' },
        { name: 'Biological EPT Ratio', unit: 'Index (0-100%)', normalRange: '60 – 95 % (Clean)', notes: '% Ephemeroptera + Plecoptera + Trichoptera in total benthic count.' }
      ]
    },
    censusSection: {
      title: 'Benthic Macroinvertebrate Bioindicator Census & BMWP Scoring',
      columns: ['Order / Family', 'Tolerance Value', 'Common Name', 'Individual Count', 'BMWP Score', 'Indicator Quality Class'],
      sampleRows: [
        { commonName: 'Ephemeroptera: Heptageniidae', kashmiriName: 'Flatheaded Mayfly', scientificName: 'Riffle clinger', typicalHabitat: 'Count: 28 | BMWP: 10 | Class: Excellent (High DO)' },
        { commonName: 'Plecoptera: Perlidae', kashmiriName: 'Stonefly Nymph', scientificName: 'Predator / Clean water', typicalHabitat: 'Count: 14 | BMWP: 10 | Class: Pristine cold water' },
        { commonName: 'Trichoptera: Hydropsychidae', kashmiriName: 'Net-spinning Caddisfly', scientificName: 'Filter feeder', typicalHabitat: 'Count: 22 | BMWP: 8 | Class: Moderate to High DO' },
        { commonName: 'Diptera: Chironomidae', kashmiriName: 'Bloodworm / Midge', scientificName: 'Burrower / Detritivore', typicalHabitat: 'Count: 12 | BMWP: 2 | Class: Tolerant to organic stress' },
        { commonName: 'Odonata: Gomphidae', kashmiriName: 'Clubtail Dragonfly Nymph', scientificName: 'Burrowing predator', typicalHabitat: 'Count: 6 | BMWP: 8 | Class: Clean stream banks' }
      ]
    },
    oralHistorySection: {
      title: 'Traditional Ecological Knowledge (TEK) & Irrigation Water Governance',
      elderPrompts: [
        'Informant: Traditional Water Bailiff (*Mirab*) / Canal Head: _____________________________ | Village: __________________',
        'Technical Prompt 1: "What was the traditional rotational water allocation rule (*Wara-Bandi*) used along this stream?"',
        'Technical Prompt 2: "How has the summer stream depth changed over your 40-year tenure as water bailiff?"',
        'Technical Prompt 3: "Have illegal sand-mining or riverbed extraction operations altered the river channel morphology here?"'
      ],
      documentationGuidelines: 'Synthesize oral customary water rights with current statutory Water Resources Regulatory Authority (JKWRRA) rules.'
    },
    sketchSection: {
      title: 'Hydrometric Cross-Section & Flow Velocity Isovel Diagram',
      guidelines: 'Plot stream bed depth profile and draw velocity contours (isovels) across the 10 sampling verticals.'
    },
    certificationSection: {
      teacherSignoffText: 'I certify that hydrometric profiling and benthic taxonomy comply with NGT and academic research standards.',
      stampFieldText: 'Department Head / Faculty Research Guide Signature & College Seal'
    }
  },

  'research-mentor': {
    tierId: 'research-mentor',
    tierName: 'Research Mentor & Faculty Tier',
    sheetCode: 'SFS-FAC-AUDIT-2026',
    targetGrades: 'Professional Mentors & Research Scientists',
    title: 'Faculty Stewardship & QA/QC Audit Dossier',
    subtitle: 'Institutional Risk Assessment, Instrument QA/QC Validation & Telemetry Verification',
    instructions: [
      'Complete pre-tour safety audit and verify 100% guardian consent collection prior to departure.',
      'Perform dual calibration checks on all student test pens using certified buffer standards.',
      'Enforce cryptographic minor privacy protocol: confirm student names are mapped to tokens (STU-xxx).',
      'Audit student data entry for numerical outliers (e.g. pH <5.0 or >9.5; DO >14 mg/L at ambient temperature).',
      'Sign off on verified batches to authorize public ingestion into the Kashmir EcoWatch open repository.'
    ],
    headerFields: [
      { label: 'Lead Faculty Mentor Name', placeholder: 'e.g. Dr. Tariq Ahmad Mir' },
      { label: 'Faculty Designation & Dept', placeholder: 'Senior Lecturer, Environmental Science' },
      { label: 'Institution Code', placeholder: 'KEW-SCH-2026-001' },
      { label: 'District & Tehsil', placeholder: 'Srinagar / Zone Batamaloo' },
      { label: 'Adopted Ecosystem Site Code', placeholder: 'KEW-OD-WET-001' },
      { label: 'Student Cohort Size', placeholder: '28 Students (14 Buddy Pairs)' },
      { label: 'Tour Execution Date', placeholder: 'DD / MM / YYYY' }
    ],
    diagnosticsSection: {
      title: 'Quality Assurance & Quality Control (QA/QC) Calibration Log',
      parameters: [
        { name: 'pH Meter Calibration (Buffer 7.00)', unit: 'Reading @ 25°C', normalRange: '6.98 – 7.02 pH', notes: 'Calibrated with NIST-traceable standard buffer solution.' },
        { name: 'pH Meter Calibration (Buffer 4.01)', unit: 'Reading @ 25°C', normalRange: '3.99 – 4.03 pH', notes: 'Acid slope calibration verified.' },
        { name: 'EC Meter Calibration (1413 µS/cm)', unit: 'Reading @ 25°C', normalRange: '1390 – 1430 µS/cm', notes: 'Conductivity cell constant verified.' },
        { name: 'Dissolved Oxygen Zero-Check', unit: 'mg/L in Sodium Sulfite', normalRange: '0.00 – 0.05 mg/L', notes: 'Zero-oxygen calibration test for optical probes.' },
        { name: 'Duplicate Sample Variance', unit: 'Relative % Difference', normalRange: '< 5.0 % Variance', notes: 'Calculated between duplicate student readings at same station.' }
      ]
    },
    censusSection: {
      title: 'Institutional Cohort Roster & PII Anonymization Masking Key',
      columns: ['Student Name (Private Institutional Record)', 'Assigned Public Token ID', 'Curriculum Tier', 'Assigned Diagnostic Station', 'Buddy Partner Token', 'Parental Consent Verified'],
      sampleRows: [
        { commonName: 'Faizan Ahmad Wani', kashmiriName: 'STU-SRI-042', scientificName: 'Foundation Tier (Class 8)', typicalHabitat: 'Station 1: Water Temp & pH | Buddy: STU-SRI-043 | Consent: YES' },
        { commonName: 'Sahil Mir', kashmiriName: 'STU-SRI-043', scientificName: 'Foundation Tier (Class 8)', typicalHabitat: 'Station 1: Waterbird Census | Buddy: STU-SRI-042 | Consent: YES' },
        { commonName: 'Zehra Fatima', kashmiriName: 'STU-BAR-017', scientificName: 'Intermediate Tier (Class 10)', typicalHabitat: 'Station 2: Forestry DBH | Buddy: STU-BAR-018 | Consent: YES' },
        { commonName: 'Muneeb Ul Haq', kashmiriName: 'STU-ANA-009', scientificName: 'Advanced Tier (Class 12)', typicalHabitat: 'Station 3: Winkler DO Titration | Buddy: STU-ANA-010 | Consent: YES' },
        { commonName: 'Asif Rashid Lone', kashmiriName: 'STU-SRI-UG-01', scientificName: 'Undergraduate (B.Sc.)', typicalHabitat: 'Station 4: Streamflow Hydrometry | Buddy: STU-SRI-UG-02 | Consent: YES' }
      ]
    },
    oralHistorySection: {
      title: 'Faculty Oral History Ethics & Archival Consent Verification',
      elderPrompts: [
        'Did the elder provide voluntary verbal consent for their oral recollections to be deposited in the public archive? [ YES / NO ]',
        'Has the recording been archived in the institution’s environmental library under secure backup? [ YES / NO ]',
        'Key Pedagogical Insight: "How did the elder’s narrative shift students’ understanding of historical climate baselines?"'
      ],
      documentationGuidelines: 'Ensure that no sensitive personal family details are published; preserve traditional ecological wisdom.'
    },
    sketchSection: {
      title: 'Faculty Tour Safety Perimeter & Evacuation Plan Diagram',
      guidelines: 'Sketch primary sampling stations, faculty muster station, shoreline boundary flags, and emergency vehicular egress route.'
    },
    certificationSection: {
      teacherSignoffText: 'I hereby certify that all data submitted in this batch has been audited for scientific plausibility and complies with child safety laws.',
      stampFieldText: 'Institutional Principal & Faculty Mentor Co-Signatures with Official Seal'
    }
  }
};
