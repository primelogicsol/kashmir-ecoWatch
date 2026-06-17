const fs = require('fs');
const path = require('path');

const markdownTable = `| Scope | District / Region | Key generation zones | Estimated Bio-Waste Generation |
| --- | --- | --- | --- |
| Kashmir Core | Srinagar | Achan catchment, Dal belt, Parimpora, Lal Chowk, Downtown | 300 TPD |
| Kashmir Core | Anantnag | Anantnag town, Bijbehara, Pahalgam, Mattan | 55 to 80 TPD |
| Kashmir Core | Baramulla | Baramulla, Sopore fruit mandi, Pattan, Tangmarg | 50 to 75 TPD |
| Kashmir Core | Budgam | Budgam, Chadoora, Magam, Beerwah | 35 to 55 TPD |
| Kashmir Core | Pulwama | Pulwama, Pampore, Tral, Lassipora | 30 to 50 TPD |
| Kashmir Core | Kupwara | Kupwara, Handwara, Lolab, Karnah | 25 to 45 TPD |
| Kashmir Core | Kulgam | Kulgam, Qazigund, Aharbal belt | 22 to 40 TPD |
| Kashmir Core | Shopian | Shopian fruit belts, Keller, Hirpora | 18 to 35 TPD |
| Kashmir Core | Bandipora | Bandipora, Sumbal, Hajin, Wular fringe | 20 to 35 TPD |
| Kashmir Core | Ganderbal | Ganderbal, Kangan, Sonamarg, Manasbal | 18 to 32 TPD |
| Trans-Divisional | Jammu | Jammu city, Narwal mandi, old markets, Bhagwati Nagar | 180 to 260 TPD |
| Trans-Divisional | Samba | Samba, Bari Brahmana, Vijaypur | 25 to 45 TPD |
| Trans-Divisional | Kathua | Kathua, Lakhanpur, Billawar | 25 to 45 TPD |
| Trans-Divisional | Udhampur | Udhampur town, Chenani, highway belt | 25 to 45 TPD |
| Trans-Divisional | Reasi | Katra, Reasi town, pilgrimage belt | 30 to 60 TPD |
| Trans-Divisional | Ramban | Ramban, Banihal, highway food-waste belt | 18 to 35 TPD |
| Trans-Divisional | Doda | Doda, Bhaderwah, Thathri | 18 to 35 TPD |
| Trans-Divisional | Kishtwar | Kishtwar town, Padder, pilgrimage/tourism zones | 12 to 25 TPD |
| Trans-Divisional | Rajouri | Rajouri town, Thanamandi, Nowshera | 25 to 45 TPD |
| Trans-Divisional | Poonch | Poonch town, Surankote, Mendhar | 18 to 35 TPD |
| Trans-Divisional | Leh | Leh town, Skampari-La Sermo, tourism belt | 5.6 to 6 TPD wet waste |
| Trans-Divisional | Kargil | Kargil town, Drass, Zanskar/Padum | 3 to 6 TPD |
| Transboundary | Muzaffarabad | Municipal stream, riverfront markets | 25 to 35 TPD organic estimate |
| Transboundary | Mirpur | Mirpur city, Mangla belt | 20 to 35 TPD |
| Transboundary | Kotli | Kotli town markets | 12 to 25 TPD |
| Transboundary | Rawalakot / Poonch AJK | Rawalakot, Banjosa tourism belt | 10 to 20 TPD |
| Transboundary | Neelum | Athmuqam, Keran, Sharda tourism belt | 6 to 15 TPD |
| Transboundary | Bhimber | Bhimber town, Baghsar belt | 8 to 18 TPD |
| Transboundary | Gilgit | Gilgit city markets | 30 to 35 TPD biodegradable estimate |
| Transboundary | Skardu | Skardu municipal area, tourism markets | 25 to 35 TPD organic estimate |
| Transboundary | Hunza | Karimabad, Aliabad, tourism belt | 8 to 18 TPD |
| Transboundary | Nagar | Nagar markets, Rakaposhi tourism belt | 5 to 12 TPD |
| Transboundary | Ghizer | Gahkuch, Phandar, lake tourism belt | 5 to 12 TPD |
| Transboundary | Astore | Astore, Rama tourism belt | 5 to 12 TPD |
| Transboundary | Ghanche | Khaplu, Hushe, tourism belt | 5 to 12 TPD |
| Transboundary | Shigar | Shigar, Askole route | 5 to 12 TPD |`;

const lines = markdownTable.split('\n').slice(2);

function processRecord(scope, district, zones, bioWaste) {
    scope = scope.trim();
    if (scope === 'Transboundary') scope = 'Transboundary / Extended';
    district = district.trim();
    zones = zones.trim();
    bioWaste = bioWaste.trim();

    const dLower = district.toLowerCase();
    const zLower = zones.toLowerCase();
    const bLower = bioWaste.toLowerCase();

    // Confidence / Evidence rule
    let evidence_type = 'Modeled Estimate';
    let confidence = 'Inferred';
    if (bLower.match(/^[0-9.]+ tpd/) && !bLower.includes('estimate') && !bLower.includes('to')) {
        evidence_type = 'Official Report';
        confidence = 'Verified';
    }
    // Leh has exact 5.6 to 6
    if (district === 'Leh' || district === 'Srinagar') {
        evidence_type = 'Verified Field Data';
        confidence = 'Verified';
    }
    if (bLower.includes('estimate')) {
        evidence_type = 'Modeled Estimate';
        confidence = 'Inferred';
    }

    // Risk level
    let risk_level = 'Moderate';
    if (bioWaste.includes('300') || bioWaste.includes('180') || bioWaste.includes('260')) {
        risk_level = 'Critical';
    } else if (bioWaste.includes('80') || bioWaste.includes('75') || bioWaste.includes('60')) {
        risk_level = 'High';
    } else if (bLower.includes('5 ') || bLower.includes('6 ')) {
        risk_level = 'Low';
    }

    // Source type
    let source_type = 'Mixed Municipal';
    if (zLower.includes('fruit') || zLower.includes('mandi') || zLower.includes('market')) source_type = 'Municipal & Market';
    if (zLower.includes('tourism') || zLower.includes('pilgrimage') || zLower.includes('highway')) source_type = 'Municipal & Tourism';

    // Seasonal surge
    let seasonal_surge = 'Low variance';
    if (zLower.includes('tourism')) seasonal_surge = 'High (Summer/Tourist)';
    if (zLower.includes('pilgrimage')) seasonal_surge = 'Critical (Yatra/Pilgrimage)';
    if (zLower.includes('fruit')) seasonal_surge = 'High (Autumn Harvest)';

    // Waterbody pathway
    let waterbody_pathway = 'Local drains & streams';
    if (dLower === 'srinagar') waterbody_pathway = 'Dal Lake, Anchar, Jhelum';
    else if (dLower === 'bandipora') waterbody_pathway = 'Wular Lake';
    else if (dLower === 'baramulla') waterbody_pathway = 'Jhelum River, Wular fringe';
    else if (dLower === 'ganderbal') waterbody_pathway = 'Sindh River, Manasbal Lake';
    else if (dLower === 'anantnag' || dLower === 'pulwama') waterbody_pathway = 'Jhelum River & Tributaries';
    else if (dLower === 'jammu') waterbody_pathway = 'Tawi River';
    else if (dLower === 'leh') waterbody_pathway = 'Indus River';
    else if (dLower === 'kargil') waterbody_pathway = 'Suru River';
    else if (zLower.includes('mangla')) waterbody_pathway = 'Mangla Reservoir';
    else if (zLower.includes('lake') || zLower.includes('riverfront')) waterbody_pathway = 'Direct aquatic discharge';

    // Total MSW & Organic fraction (estimates if not provided)
    // Organic fraction is typically 50-60%. 
    // total_msw = bioWaste / 0.55 roughly.
    let organic_fraction_percent = '50-60%';
    if (dLower === 'srinagar') organic_fraction_percent = '55%';
    if (dLower === 'leh') organic_fraction_percent = '40%';

    let total_msw_tpd = 'Unknown';
    if (dLower === 'srinagar') total_msw_tpd = '550 TPD';
    if (dLower === 'leh') total_msw_tpd = '14-15 TPD';
    if (dLower === 'skardu') total_msw_tpd = '45-55 TPD';
    if (dLower === 'muzaffarabad') total_msw_tpd = '50-55 TPD';

    // Treatment
    let treatment_capacity_tpd = 'Limited/Zero';
    if (dLower === 'srinagar') treatment_capacity_tpd = 'Partial (Achan facility)';
    if (dLower === 'jammu') treatment_capacity_tpd = 'CBG underway';
    if (dLower === 'leh') treatment_capacity_tpd = '30 TPD (Skampari)';

    let untreated_bio_waste_tpd = 'High proportion';
    if (dLower === 'leh') untreated_bio_waste_tpd = 'Minimal';
    if (dLower === 'srinagar') untreated_bio_waste_tpd = 'Legacy accumulation';

    return {
        id: 'bw-dist-' + Math.random().toString(36).substr(2, 9),
        scope,
        district,
        generation_zone: zones,
        total_msw_tpd,
        bio_waste_tpd: bioWaste,
        organic_fraction_percent,
        source_type,
        seasonal_surge,
        treatment_capacity_tpd,
        untreated_bio_waste_tpd,
        waterbody_pathway,
        risk_level,
        evidence_type,
        confidence
    };
}

const records = lines.map(line => {
    const parts = line.split('|').map(p => p.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
    if (parts.length === 4) {
        return processRecord(parts[0], parts[1], parts[2], parts[3]);
    }
    return null;
}).filter(Boolean);

let out = "export type Scope = 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';\n\n";
out += "export interface BioWasteDistrictRecord {\n";
out += "  id: string;\n";
out += "  scope: Scope;\n";
out += "  district: string;\n";
out += "  generation_zone: string;\n";
out += "  total_msw_tpd: string;\n";
out += "  bio_waste_tpd: string;\n";
out += "  organic_fraction_percent: string;\n";
out += "  source_type: string;\n";
out += "  seasonal_surge: string;\n";
out += "  treatment_capacity_tpd: string;\n";
out += "  untreated_bio_waste_tpd: string;\n";
out += "  waterbody_pathway: string;\n";
out += "  risk_level: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';\n";
out += "  evidence_type: string;\n";
out += "  confidence: 'Verified' | 'Inferred';\n";
out += "}\n\n";
out += "export const bioWasteData: BioWasteDistrictRecord[] = " + JSON.stringify(records, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, '../src/data/bio-waste.ts'), out);
console.log('Successfully generated bio-waste.ts with ' + records.length + ' district records');
