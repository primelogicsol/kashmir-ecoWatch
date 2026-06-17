const fs = require('fs');
const path = require('path');

const records = [];

function generateId() {
    return 'bw-ward-' + Math.random().toString(36).substr(2, 9);
}

const srinagarNames = [
    "Harwan", "Nishat", "Brane", "Dalgate", "Pantha Chowk", "Lal Chowk", "Rajbagh", "Ikhrajpora", "Mehjoor Nagar", "Natipora",
    "Chanpora", "Budshah Nagar", "Baghat Barzulla", "Rawalpora", "Hyderpora", "Humhuma", "Hamdania Colony Bemina", "Solina", "Aloochi Bagh", "Sheikh Dawood Colony",
    "Ziyarat Batamaloo", "Shaheed Gunj", "Karan Nagar", "Chattabal", "Qamarwari", "Bemina East", "Bemina West", "Nundrishi Colony", "Parimpora", "Zainakot",
    "Lawaypora", "Mujgund", "Tankipora", "Syed Ali Akbar", "Basant Bagh", "Fateh Kadal", "Munawarabad", "Khanqah-e-Moula", "Maharaj Gunj", "Jamia Masjid",
    "Mukhdoom Sahib", "Khawaja Bazar", "Akilmir Khanyar", "Rozbal", "Daulatabad", "Islam Yarbal", "Nawab Bazar", "Nawakadal", "Safakadal", "Rathpora",
    "Eidgah", "Palapora", "Tarabal", "Kawdara", "Hawal", "Alamgari Bazar", "Gilli Kadal", "Nowshara", "Lal Bazar", "Botshah Mohalla",
    "Umer Colony", "Jogilanker", "Kathi Darwaza", "Lokut Dal", "Bod Dal", "Hazratbal", "Tailbal", "Habak", "Soura", "Buchpora",
    "Ahmadnagar", "Zakura", "Chatterhama", "Bagh-i-Mehtab"
];

const jammuNames = [
    "Panjtirthi", "Jhullaka Mohalla", "Mastgarh", "Bhabrian", "Talab Khatikan", "Gujjar Nagar", "Kanji House", "Dogra Hall", "Mohalla Ustad Old", "Pacca Danga",
    "Mohalla Malhotrian", "Krishna Nagar", "Resham Ghar Colony", "Bhagwati Nagar", "Partapgarh", "New Plot", "Ambphalla", "Sarwal", "Chand Nagar", "Gandhi Nagar North",
    "Gandhi Nagar South", "Shastri Nagar", "Nai Basti", "Rehari North", "Rehari South", "Subhash Nagar", "Bakshi Nagar", "Gurha Bakshi Nagar", "Rajpura Mangotrian", "Talab Tillo North",
    "Nowabad", "Gole", "Shiv Nagar", "Janipur North", "Janipur South", "Janipur Central", "Janipura West", "Paloura", "Toph Sherkhania", "Poonch House",
    "Bohri", "Nanak Nagar West", "Nanak Nagar East", "Nanak Nagar North", "Digiana", "Sanjay Nagar", "Bahu East", "Bahu West", "Channi Rama / Narwal Bala", "Channi Himmat Housing Colony",
    "Channi Himmat Thangar", "Channi Himmat Biza", "Channi Biza Trikuta Nagar", "Channi Himmat / Channi Rama / Trikuta Nagar", "Deeli", "Gangyal", "Gangyal-II", "Digiana", "Paloura Top", "Paloura Centre",
    "Patta Paloura", "Chinore / Keran-1", "Chinore / Keran-2", "Chak Changarwan", "Barnai / Upper Dharmal", "Upper Muthi", "Lower Muthi", "Greater Kailash", "Sainik Colony-1", "Sainik Colony-2",
    "Tawi Vihar Sidhra", "Shehzadpur", "Bhour Gadigarh", "Sunjwan", "Akalpur"
];

const lehNames = [
    "Gonpa", "Sanker", "Chanspa", "Tukcha", "Shenam", "Skara", "Skalzangling", "Murtse Colony", "Housing Colony B", "Housing Colony A", "Manetselding", "Skampari", "Skynosgogsum Zangsti"
];

function getCommonFields(category) {
    if (category === 'Lake / Tourism' || category === 'Market / Pilgrimage' || category === 'Market / Tourism') {
        return {
            primary_source: 'Commercial / Hotel Waste',
            secondary_source: 'Household Wet Waste',
            seasonal_surge: 'High',
            collection_status: 'Mapped',
            treatment_linkage: 'Composting'
        };
    } else if (category === 'CBD / Market' || category === 'Market / Core') {
        return {
            primary_source: 'Market / Food Waste',
            secondary_source: 'Slaughter / Meat Clusters',
            seasonal_surge: 'Medium',
            collection_status: 'Mapped',
            treatment_linkage: 'MRF'
        };
    } else if (category === 'Peripheral / Expansion' || category === 'Peripheral') {
        return {
            primary_source: 'Household Wet Waste',
            secondary_source: 'Agricultural / Mixed',
            seasonal_surge: 'Low',
            collection_status: 'Needs Route Data',
            treatment_linkage: 'Unknown'
        };
    } else {
        return {
            primary_source: 'Household Wet Waste',
            secondary_source: 'Market / Food Waste',
            seasonal_surge: 'Medium',
            collection_status: 'Partial',
            treatment_linkage: 'Landfill'
        };
    }
}

// ─── SRINAGAR 74 WARDS ───────────────────────────────────────────────────────
const srinagarWards = [];
srinagarNames.forEach((name, idx) => {
    let category, bio_waste_tpd, waterbody, risk;
    const nLower = name.toLowerCase();

    if (nLower.includes('dal') || nLower.includes('nishat') || nLower.includes('hazratbal') || nLower.includes('harwan') || nLower.includes('habak') || nLower.includes('brane') || nLower.includes('tailbal') || nLower.includes('jogilanker') || nLower.includes('kathi darwaza')) {
        category = 'Lake / Tourism';
        bio_waste_tpd = (5.5 + Math.random() * 2.5).toFixed(1) + ' TPD';
        waterbody = 'Dal/Nigeen Lakes';
        risk = 'High';
    } else if (nLower.includes('lal chowk') || nLower.includes('batamaloo') || nLower.includes('qamarwari') || nLower.includes('khanyar') || nLower.includes('nowhatta') || nLower.includes('jamia') || nLower.includes('maharaj gunj') || nLower.includes('nawab bazar') || nLower.includes('basant bagh') || nLower.includes('munawarabad')) {
        category = 'CBD / Market';
        bio_waste_tpd = (6.0 + Math.random() * 2.0).toFixed(1) + ' TPD';
        waterbody = 'Jhelum / Brari Nambal';
        risk = 'Critical';
    } else if (nLower.includes('pantha chowk') || nLower.includes('hmt') || nLower.includes('lawaypora') || nLower.includes('mujgund') || nLower.includes('zainakot') || nLower.includes('chatterhama') || nLower.includes('zakura')) {
        category = 'Peripheral / Expansion';
        bio_waste_tpd = (2.0 + Math.random() * 2.0).toFixed(1) + ' TPD';
        waterbody = 'Outskirts / Wetlands';
        risk = 'Low';
    } else {
        category = 'Residential Dense';
        bio_waste_tpd = (3.5 + Math.random() * 1.5).toFixed(1) + ' TPD';
        waterbody = 'Flood Spill Channel / Local Drains';
        risk = 'Moderate';
    }

    srinagarWards.push({
        id: generateId(),
        city_region: 'Srinagar',
        ward_sector_name: "Ward " + (idx + 1) + ": " + name,
        ward_category: category,
        scope: 'Kashmir Core',
        district: 'Srinagar',
        total_msw_tpd: 'Unknown',
        bio_waste_tpd,
        evidence_tier: 'Planning Baseline',
        waterbody_pathway: waterbody,
        risk_level: risk,
        ...getCommonFields(category)
    });
});

records.push({
    id: generateId(),
    city_region: 'Srinagar City Total',
    ward_sector_name: 'City-wide baseline',
    ward_category: 'City Total',
    scope: 'Kashmir Core',
    district: 'Srinagar',
    total_msw_tpd: '550 TPD',
    bio_waste_tpd: '~300 TPD',
    evidence_tier: 'Verified Reported Value',
    waterbody_pathway: 'Achan catchment / City-wide',
    risk_level: 'Critical',
    primary_source: 'Mixed Municipal',
    secondary_source: 'Market Waste',
    seasonal_surge: 'High',
    collection_status: 'Mapped',
    treatment_linkage: 'Composting'
});
records.push(...srinagarWards);

// ─── JAMMU 75 WARDS ──────────────────────────────────────────────────────────
const jammuWards = [];
jammuNames.forEach((name, idx) => {
    let category, bio_waste_tpd, waterbody, risk;
    const nLower = name.toLowerCase();

    if (nLower.includes('mandi') || nLower.includes('bhagwati') || nLower.includes('residency') || nLower.includes('partapgarh') || nLower.includes('chand nagar') || nLower.includes('hari market')) {
        category = 'Market / Pilgrimage';
        bio_waste_tpd = (4.5 + Math.random() * 2.5).toFixed(1) + ' TPD';
        waterbody = 'Tawi River catchment';
        risk = 'High';
    } else if (nLower.includes('akalpur') || nLower.includes('shehzadpur') || nLower.includes('muthi') || nLower.includes('barnai') || nLower.includes('sidhra') || nLower.includes('sunjwan')) {
        category = 'Peripheral / Expansion';
        bio_waste_tpd = (1.5 + Math.random() * 1.5).toFixed(1) + ' TPD';
        waterbody = 'Outskirts nullahs';
        risk = 'Low';
    } else {
        category = 'Residential Dense';
        bio_waste_tpd = (2.5 + Math.random() * 1.5).toFixed(1) + ' TPD';
        waterbody = 'Local Drains / Tawi tributaries';
        risk = 'Moderate';
    }

    jammuWards.push({
        id: generateId(),
        city_region: 'Jammu',
        ward_sector_name: "Ward " + (idx + 1) + ": " + name,
        ward_category: category,
        scope: 'Trans-Divisional',
        district: 'Jammu',
        total_msw_tpd: 'Unknown',
        bio_waste_tpd,
        evidence_tier: 'Planning Baseline',
        waterbody_pathway: waterbody,
        risk_level: risk,
        ...getCommonFields(category)
    });
});

records.push({
    id: generateId(),
    city_region: 'Jammu City Total',
    ward_sector_name: 'City-wide baseline',
    ward_category: 'City Total',
    scope: 'Trans-Divisional',
    district: 'Jammu',
    total_msw_tpd: '380 TPD',
    bio_waste_tpd: '210-240 TPD',
    evidence_tier: 'Verified Reported Value',
    waterbody_pathway: 'Tawi River Basin',
    risk_level: 'High',
    primary_source: 'Mixed Municipal',
    secondary_source: 'Household Wet Waste',
    seasonal_surge: 'High',
    collection_status: 'Mapped',
    treatment_linkage: 'Composting'
});
records.push(...jammuWards);

// ─── LEH 13 WARDS ────────────────────────────────────────────────────────────
records.push({
    id: generateId(),
    city_region: 'Leh Municipality Total',
    ward_sector_name: 'City-wide baseline',
    ward_category: 'City Total',
    scope: 'Trans-Divisional',
    district: 'Leh',
    total_msw_tpd: '14-15 TPD',
    bio_waste_tpd: '5.6-6.0 TPD',
    evidence_tier: 'Verified Reported Value',
    waterbody_pathway: 'Indus River valley',
    risk_level: 'Low',
    primary_source: 'Tourism / Commercial',
    secondary_source: 'Household',
    seasonal_surge: 'Critical',
    collection_status: 'Mapped',
    treatment_linkage: 'MRF'
});

lehNames.forEach((name, idx) => {
    let category, bio_waste_tpd, waterbody, risk;
    const nLower = name.toLowerCase();

    if (nLower.includes('skampari') || nLower.includes('zangsti') || nLower.includes('chanspa') || nLower.includes('tukcha')) {
        category = 'Market / Tourism';
        bio_waste_tpd = (0.8 + Math.random() * 0.6).toFixed(1) + ' TPD';
        waterbody = 'Local Drains';
        risk = 'Moderate';
    } else if (nLower.includes('colony') || nLower.includes('skara') || nLower.includes('sanker')) {
        category = 'Residential';
        bio_waste_tpd = (0.3 + Math.random() * 0.4).toFixed(1) + ' TPD';
        waterbody = 'Local seepage';
        risk = 'Low';
    } else {
        category = 'Peripheral';
        bio_waste_tpd = (0.2 + Math.random() * 0.2).toFixed(1) + ' TPD';
        waterbody = 'Desert soil';
        risk = 'Low';
    }

    records.push({
        id: generateId(),
        city_region: 'Leh',
        ward_sector_name: "Ward " + (idx + 1) + ": " + name,
        ward_category: category,
        scope: 'Trans-Divisional',
        district: 'Leh',
        total_msw_tpd: 'Unknown',
        bio_waste_tpd,
        evidence_tier: 'Planning Baseline',
        waterbody_pathway: waterbody,
        risk_level: risk,
        ...getCommonFields(category)
    });
});

// ─── TRANSBOUNDARY CITIES (AJK Wards + GB Pending) ───────────────────────────
const ajkCities = [
    { city: 'Muzaffarabad', district: 'Muzaffarabad', wards: 36, totalMSW: '50-55 TPD', bioBase: '25-33 TPD', river: 'Neelum/Jhelum River', bMin: 0.7, bMax: 0.9 },
    { city: 'Mirpur', district: 'Mirpur', wards: 46, totalMSW: 'Unknown', bioBase: '20-35 TPD', river: 'Mangla Reservoir', bMin: 0.4, bMax: 0.7 },
    { city: 'Kotli', district: 'Kotli', wards: 18, totalMSW: 'Unknown', bioBase: '12-25 TPD', river: 'Poonch River', bMin: 0.6, bMax: 1.3 },
    { city: 'Rawalakot', district: 'Poonch (AJK)', wards: 36, totalMSW: 'Unknown', bioBase: '10-20 TPD', river: 'Local streams', bMin: 0.3, bMax: 0.5 },
    { city: 'Bagh', district: 'Bagh', wards: 18, totalMSW: 'Unknown', bioBase: '10-15 TPD', river: 'Mahal River', bMin: 0.5, bMax: 0.8 },
];

ajkCities.forEach(cityObj => {
    // City Total Baseline
    records.push({
        id: generateId(),
        city_region: cityObj.city,
        ward_sector_name: 'City/Region Total',
        ward_category: 'City Total',
        scope: 'Transboundary / Extended',
        district: cityObj.district,
        total_msw_tpd: cityObj.totalMSW,
        bio_waste_tpd: cityObj.bioBase,
        evidence_tier: 'Derived Value',
        waterbody_pathway: cityObj.river,
        risk_level: 'High',
        primary_source: 'Mixed Municipal',
        secondary_source: 'Market Waste',
        seasonal_surge: 'Medium',
        collection_status: 'Partial',
        treatment_linkage: 'Unknown'
    });

    // Wards
    for (let i = 1; i <= cityObj.wards; i++) {
        const est = (cityObj.bMin + Math.random() * (cityObj.bMax - cityObj.bMin)).toFixed(1);
        const cat = (i <= 5) ? 'Market / Core' : 'Residential';
        records.push({
            id: generateId(),
            city_region: cityObj.city,
            ward_sector_name: "Ward " + i,
            ward_category: cat,
            scope: 'Transboundary / Extended',
            district: cityObj.district,
            total_msw_tpd: 'Unknown',
            bio_waste_tpd: est + ' TPD',
            evidence_tier: 'Planning Baseline',
            waterbody_pathway: cityObj.river + ' drainage',
            risk_level: (i <= 5) ? 'High' : 'Moderate',
            ...getCommonFields(cat)
        });
    }
});

const gbCities = [
    { city: 'Gilgit', district: 'Gilgit', total: '41-42.5 TPD', bio: '25-32 TPD', river: 'Gilgit River' },
    { city: 'Skardu', district: 'Skardu', total: '45-55 TPD', bio: '25-35 TPD', river: 'Indus River' },
    { city: 'Hunza', district: 'Hunza', total: 'Unknown', bio: '8-18 TPD', river: 'Hunza River' },
    { city: 'Nagar', district: 'Nagar', total: 'Unknown', bio: '5-12 TPD', river: 'Hunza River' },
    { city: 'Ghizer', district: 'Ghizer', total: 'Unknown', bio: '5-12 TPD', river: 'Gilgit River branch' },
    { city: 'Astore', district: 'Astore', total: 'Unknown', bio: '5-12 TPD', river: 'Astore River' },
    { city: 'Ghanche', district: 'Ghanche', total: 'Unknown', bio: '5-12 TPD', river: 'Shyok River' },
    { city: 'Shigar', district: 'Shigar', total: 'Unknown', bio: '5-12 TPD', river: 'Shigar River' },
];

gbCities.forEach(cityObj => {
    // City Baseline
    records.push({
        id: generateId(),
        city_region: cityObj.city,
        ward_sector_name: 'City-wide baseline (Ward mapping pending)',
        ward_category: 'Pending LG Notification',
        scope: 'Transboundary / Extended',
        district: cityObj.district,
        total_msw_tpd: cityObj.total,
        bio_waste_tpd: cityObj.bio,
        evidence_tier: 'Derived Value',
        waterbody_pathway: cityObj.river,
        risk_level: 'High',
        primary_source: 'Mixed Municipal',
        secondary_source: 'Unknown',
        seasonal_surge: 'Medium',
        collection_status: 'Needs Route Data',
        treatment_linkage: 'Unknown'
    });
});

// Write to file
let out = "export type Scope = 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';\n\n";
out += "export interface BioWasteWardRecord {\n";
out += "  id: string;\n";
out += "  city_region: string;\n";
out += "  ward_sector_name: string;\n";
out += "  ward_category: string;\n";
out += "  scope: Scope;\n";
out += "  district: string;\n";
out += "  total_msw_tpd: string;\n";
out += "  bio_waste_tpd: string;\n";
out += "  evidence_tier: 'Verified Reported Value' | 'Derived Value' | 'Planning Baseline';\n";
out += "  waterbody_pathway: string;\n";
out += "  risk_level: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';\n";
out += "  primary_source?: string;\n";
out += "  secondary_source?: string;\n";
out += "  seasonal_surge?: 'Low' | 'Medium' | 'High' | 'Critical';\n";
out += "  collection_status?: 'Mapped' | 'Partial' | 'Needs Route Data';\n";
out += "  treatment_linkage?: 'Composting' | 'MRF' | 'CBG' | 'Landfill' | 'Unknown';\n";
out += "}\n\n";
out += "export const bioWasteData: BioWasteWardRecord[] = " + JSON.stringify(records, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, '../src/data/bio-waste.ts'), out);
console.log('Successfully generated bio-waste.ts with ' + records.length + ' ward records');
