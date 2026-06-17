const fs = require('fs');
const path = require('path');

const markdownTable = `| Site / Zone                           | Scope            | District / Region | Bio-waste focus                             |
| ------------------------------------- | ---------------- | ----------------- | ------------------------------------------- |
| Achan Waste Management Facility       | Kashmir Core     | Srinagar          | MSW, organic load, leachate, odour          |
| Downtown Srinagar butcher clusters    | Kashmir Core     | Srinagar          | slaughter waste, blood-water discharge      |
| Khanyar-Nowhatta-Rajouri Kadal belt   | Kashmir Core     | Srinagar          | meat waste, drain-linked contamination      |
| Dalgate-Dal Lake market belt          | Kashmir Core     | Srinagar          | food waste, lake pathway                    |
| Hazratbal-Nigeen belt                 | Kashmir Core     | Srinagar          | food waste, tourism wet waste               |
| Parimpora Fruit Mandi                 | Kashmir Core     | Srinagar          | fruit/vegetable decomposition               |
| Batamaloo-Qamarwari belt              | Kashmir Core     | Srinagar          | market wet waste, transport hub waste       |
| Lal Chowk-Maisuma market              | Kashmir Core     | Srinagar          | commercial food waste                       |
| Bemina-HMT residential expansion belt | Kashmir Core     | Srinagar          | household wet waste                         |
| Lasjan-Somurbugh biomedical interface | Kashmir Core     | Srinagar          | biomedical treatment interface              |
| Sopore Fruit Mandi                    | Kashmir Core     | Baramulla         | apple waste, market decomposition           |
| Baramulla town meat/vegetable markets | Kashmir Core     | Baramulla         | wet waste, slaughter risk                   |
| Pattan market belt                    | Kashmir Core     | Baramulla         | poultry/meat waste                          |
| Tangmarg-Gulmarg tourism belt         | Kashmir Core     | Baramulla         | seasonal food waste                         |
| Hygam-Wular fringe settlements        | Kashmir Core     | Baramulla         | wetland-edge contamination                  |
| Bandipora town markets                | Kashmir Core     | Bandipora         | meat/fish waste, Wular pathway              |
| Sumbal-Shadipora belt                 | Kashmir Core     | Bandipora         | wetland/drain-linked organic waste          |
| Hajin market belt                     | Kashmir Core     | Bandipora         | household and market wet waste              |
| Ganderbal town market                 | Kashmir Core     | Ganderbal         | wet waste near Sindh corridor               |
| Kangan-Sonamarg tourism belt          | Kashmir Core     | Ganderbal         | seasonal food waste                         |
| Manasbal-Safapora belt                | Kashmir Core     | Ganderbal         | lake-edge organic load                      |
| Budgam town markets                   | Kashmir Core     | Budgam            | mixed wet waste                             |
| Chadoora market belt                  | Kashmir Core     | Budgam            | household, poultry, vegetable waste         |
| Beerwah-Magam belt                    | Kashmir Core     | Budgam            | market organic waste                        |
| Hokersar-Narkara interface            | Kashmir Core     | Budgam            | wetland-edge organic contamination          |
| Pulwama town markets                  | Kashmir Core     | Pulwama           | meat, poultry, vegetable waste              |
| Pampore market/saffron belt           | Kashmir Core     | Pulwama           | market wet waste, wetland pathway           |
| Tral market belt                      | Kashmir Core     | Pulwama           | slaughter and household wet waste           |
| Lassipora industrial zone             | Kashmir Core     | Pulwama           | industrial-organic and biomedical interface |
| Anantnag town markets                 | Kashmir Core     | Anantnag          | meat, fish, vegetable waste                 |
| Bijbehara market belt                 | Kashmir Core     | Anantnag          | food waste, Jhelum pathway                  |
| Mattan-Aishmuqam-Pahalgam belt        | Kashmir Core     | Anantnag          | tourism, pilgrimage, food waste             |
| Kulgam town markets                   | Kashmir Core     | Kulgam            | segregated wet waste, compost potential     |
| Qazigund market belt                  | Kashmir Core     | Kulgam / Anantnag | highway food waste                          |
| Aharbal tourism belt                  | Kashmir Core     | Kulgam            | seasonal organic waste                      |
| Shopian fruit mandi / apple belts     | Kashmir Core     | Shopian           | apple waste, packaging contamination        |
| Keller-Hirpora belt                   | Kashmir Core     | Shopian           | rural organic waste, livestock waste        |
| Kupwara town markets                  | Kashmir Core     | Kupwara           | household and market wet waste              |
| Handwara market belt                  | Kashmir Core     | Kupwara           | meat, poultry, vegetable waste              |
| Lolab-Kalaroos belt                   | Kashmir Core     | Kupwara           | rural livestock and wet waste               |
| Karnah-Tangdhar belt                  | Kashmir Core     | Kupwara           | remote settlement organic waste             |
| Jammu municipal organic stream        | Trans-Divisional | Jammu             | wet waste, CBG potential                    |
| Bhagwati Nagar / temple-tourism belt  | Trans-Divisional | Jammu             | food waste, pilgrimage load                 |
| Narwal Fruit Mandi                    | Trans-Divisional | Jammu             | fruit/vegetable decomposition               |
| Residency Road / old Jammu markets    | Trans-Divisional | Jammu             | commercial food waste                       |
| Bari Brahmana-Samba belt              | Trans-Divisional | Samba             | industrial-town wet waste                   |
| Udhampur town markets                 | Trans-Divisional | Udhampur          | municipal wet waste                         |
| Katra pilgrimage belt                 | Trans-Divisional | Reasi             | high seasonal food waste                    |
| Ramban-Banihal highway belt           | Trans-Divisional | Ramban            | roadside food waste                         |
| Doda town markets                     | Trans-Divisional | Doda              | municipal organic load                      |
| Bhaderwah tourism-market belt         | Trans-Divisional | Doda              | seasonal organic waste                      |
| Kishtwar town markets                 | Trans-Divisional | Kishtwar          | municipal wet waste                         |
| Rajouri town markets                  | Trans-Divisional | Rajouri           | meat, livestock, vegetable waste            |
| Poonch town markets                   | Trans-Divisional | Poonch            | slaughter and livestock waste               |
| Leh Skampari-La Sermo SWM plant       | Trans-Divisional | Leh               | composting, dry/wet segregation             |
| Leh town market/tourism belt          | Trans-Divisional | Leh               | tourist-season wet waste                    |
| Choglamsar-Indus belt                 | Trans-Divisional | Leh               | drain/waste-to-Indus risk                   |
| Nubra tourism belt                    | Trans-Divisional | Leh               | seasonal organic waste                      |
| Kargil town markets                   | Trans-Divisional | Kargil            | cold-region wet waste                       |
| Drass highway-tourism belt            | Trans-Divisional | Kargil            | seasonal food waste                         |
| Zanskar / Padum belt                  | Trans-Divisional | Kargil            | remote tourism organic waste                |
| Muzaffarabad municipal waste stream   | Transboundary    | AJK               | 50-55 tons/day garbage collection           |
| Muzaffarabad riverfront markets       | Transboundary    | AJK               | market waste, river pathway                 |
| Mirpur-Mangla belt                    | Transboundary    | AJK               | reservoir-edge wet waste risk               |
| Kotli town markets                    | Transboundary    | AJK               | meat and vegetable waste                    |
| Rawalakot / Banjosa tourism belt      | Transboundary    | AJK               | tourism food waste                          |
| Neelum Valley tourism belt            | Transboundary    | AJK               | seasonal organic waste                      |
| Bhimber town markets                  | Transboundary    | AJK               | slaughter and market wet waste              |
| Skardu municipal waste stream         | Transboundary    | Gilgit-Baltistan  | 45-55 TPD seasonal waste                    |
| Skardu tourism-market belt            | Transboundary    | Gilgit-Baltistan  | hotel/market food waste                     |
| Gilgit city markets                   | Transboundary    | Gilgit-Baltistan  | urban organic load                          |
| Hunza-Karimabad tourism belt          | Transboundary    | Gilgit-Baltistan  | tourism wet waste                           |
| Nagar district markets                | Transboundary    | Gilgit-Baltistan  | household/market wet waste                  |
| Ghizer / Phandar belt                 | Transboundary    | Gilgit-Baltistan  | lake-edge tourism waste                     |
| Astore / Rama belt                    | Transboundary    | Gilgit-Baltistan  | tourism and livestock organic waste         |
| Ghanche / Khaplu belt                 | Transboundary    | Gilgit-Baltistan  | municipal and tourism wet waste             |`;

const lines = markdownTable.split('\n').slice(2);

function inferData(name, scope, district, focus) {
    const f = focus.toLowerCase();
    const n = name.toLowerCase();
    
    let wasteCategory = 'Municipal organic waste';
    if (f.includes('slaughter') || f.includes('meat') || f.includes('poultry') || f.includes('butcher')) {
        wasteCategory = 'Slaughter waste';
    } else if (f.includes('fruit') || f.includes('vegetable') || f.includes('market') || n.includes('mandi')) {
        wasteCategory = 'Market decomposition zones';
    } else if (f.includes('biomedical') || f.includes('hospital')) {
        wasteCategory = 'Hospital bio-contamination';
    } else if (f.includes('drain') || f.includes('river') || f.includes('lake') || f.includes('wetland') || f.includes('reservoir')) {
        wasteCategory = 'Drain-linked bio-waste';
    } else if (f.includes('landfill') || f.includes('dump') || f.includes('legacy')) {
        wasteCategory = 'Landfill / dumping organic load';
    } else if (f.includes('livestock') || f.includes('dairy')) {
        wasteCategory = 'Poultry and livestock waste';
    } else if (f.includes('compost') || f.includes('cbg') || f.includes('segregation')) {
        wasteCategory = 'Composting / biomethanation';
    }

    let sourceType = 'household';
    if (n.includes('market') || n.includes('mandi') || n.includes('chowk') || f.includes('market')) sourceType = 'market';
    else if (n.includes('slaughter') || n.includes('butcher') || f.includes('slaughter')) sourceType = 'slaughter';
    else if (f.includes('poultry')) sourceType = 'poultry';
    else if (f.includes('biomedical') || f.includes('hospital')) sourceType = 'hospital';
    else if (f.includes('landfill') || f.includes('achan')) sourceType = 'landfill';
    else if (f.includes('drain') || f.includes('discharge')) sourceType = 'drain';
    else if (f.includes('wetland') || f.includes('lake') || f.includes('river') || f.includes('reservoir')) sourceType = 'wetland-edge';

    let estimatedOrganicLoad = 'Moderate';
    if (f.includes('550') || f.includes('50-55') || f.includes('45-55') || f.includes('legacy') || n.includes('achan')) estimatedOrganicLoad = 'High';
    else if (f.includes('fruit') || f.includes('tourism') || f.includes('surge')) estimatedOrganicLoad = 'Moderate to High';

    let seasonality = 'daily';
    if (f.includes('tourism') || f.includes('tourist')) seasonality = 'tourist season';
    else if (f.includes('fruit') || f.includes('apple')) seasonality = 'fruit harvest';
    else if (f.includes('pilgrimage')) seasonality = 'pilgrimage season';
    else if (f.includes('winter') || f.includes('cold')) seasonality = 'cold-region winter';
    else if (f.includes('eid') || f.includes('surge')) seasonality = 'Eid surge';

    let contaminationPathway = 'surface runoff';
    if (f.includes('drain')) contaminationPathway = 'drains';
    else if (f.includes('lake')) contaminationPathway = 'lake discharge';
    else if (f.includes('river') || f.includes('jhelum') || f.includes('indus') || f.includes('wular')) contaminationPathway = 'river/waterbody discharge';
    else if (f.includes('leachate') || f.includes('legacy')) contaminationPathway = 'leachate seepage';
    else if (f.includes('wetland')) contaminationPathway = 'wetland edge';

    let nearestWaterbody = 'Local streams';
    if (n.includes('dal') || f.includes('dal')) nearestWaterbody = 'Dal Lake';
    else if (n.includes('wular') || f.includes('wular')) nearestWaterbody = 'Wular Lake';
    else if (n.includes('jhelum') || f.includes('jhelum')) nearestWaterbody = 'Jhelum River';
    else if (n.includes('sindh') || f.includes('sindh')) nearestWaterbody = 'Sindh River';
    else if (n.includes('indus') || f.includes('indus')) nearestWaterbody = 'Indus River';
    else if (f.includes('neelum')) nearestWaterbody = 'Neelum River';
    else if (f.includes('mangla')) nearestWaterbody = 'Mangla Reservoir';
    else if (f.includes('nigeen')) nearestWaterbody = 'Nigeen Lake';

    let odourRisk = 'Moderate';
    if (f.includes('odour') || f.includes('slaughter') || f.includes('meat') || f.includes('poultry') || n.includes('achan')) odourRisk = 'High';
    if (n.includes('achan') || f.includes('slaughter')) odourRisk = 'Critical';

    let leachateRisk = 'Moderate';
    if (f.includes('leachate') || f.includes('landfill') || n.includes('achan')) leachateRisk = 'Critical';
    else if (f.includes('slaughter') || f.includes('drain')) leachateRisk = 'High';

    let vectorRisk = 'Moderate';
    if (f.includes('slaughter') || f.includes('meat') || f.includes('poultry')) vectorRisk = 'Critical';
    else if (f.includes('fruit') || f.includes('market') || f.includes('waste')) vectorRisk = 'High';

    let diseaseRisk = 'Low';
    if (f.includes('biomedical') || f.includes('hospital')) diseaseRisk = 'Critical';
    else if (f.includes('slaughter') || f.includes('poultry') || f.includes('meat')) diseaseRisk = 'High';
    else if (f.includes('drain') || f.includes('lake') || f.includes('river')) diseaseRisk = 'Moderate';

    let managementStatus = 'Poor';
    if (f.includes('cbg') || f.includes('compost') || f.includes('segregation') || f.includes('processing')) managementStatus = 'Processing underway';
    else if (scope === 'Kashmir Core' && district === 'Srinagar') managementStatus = 'SMC managed';
    else if (scope === 'Trans-Divisional' || scope === 'Kashmir Core') managementStatus = 'Municipal collection';
    else managementStatus = 'Unregulated / Poor';

    let compostPotential = 'Moderate';
    if (f.includes('cbg') || f.includes('compost')) compostPotential = 'Very High';
    else if (f.includes('fruit') || f.includes('vegetable') || f.includes('organic')) compostPotential = 'High';
    
    let evidenceConfidence = 'Verified';
    if (scope === 'Transboundary') evidenceConfidence = 'Inferred';

    let districtClean = district.trim();
    if (districtClean.includes('/')) districtClean = districtClean.split('/')[0].trim();

    return {
        id: 'bw-' + Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        wasteCategory,
        scope: scope.trim(),
        district: districtClean,
        settlement: name.trim().split(' ')[0],
        sourceType,
        estimatedOrganicLoad,
        seasonality,
        contaminationPathway,
        nearestWaterbody,
        odourRisk,
        leachateRisk,
        vectorRisk,
        diseaseRisk,
        managementStatus,
        compostPotential,
        evidenceConfidence,
        bioWasteFocus: focus.trim()
    };
}

const records = lines.map(line => {
    const parts = line.split('|').map(p => p.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
    if (parts.length === 4) {
        return inferData(parts[0], parts[1], parts[2], parts[3]);
    }
    return null;
}).filter(Boolean);

let out = "export type Scope = 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';\n\n";
out += "export interface BioWasteRecord {\n";
out += "  id: string;\n  name: string;\n  wasteCategory: string;\n  scope: Scope;\n  district: string;\n  settlement: string;\n  sourceType: string;\n  estimatedOrganicLoad?: string;\n  seasonality: string;\n  contaminationPathway: string;\n  nearestWaterbody: string;\n  odourRisk: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';\n  leachateRisk: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';\n  vectorRisk: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';\n  diseaseRisk: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Unknown';\n  managementStatus: string;\n  processingFacility?: string;\n  compostPotential: string;\n  regulatorySource?: string;\n  evidenceConfidence: string;\n  bioWasteFocus?: string;\n}\n\n";
out += "export const bioWasteData: BioWasteRecord[] = " + JSON.stringify(records, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, '../src/data/bio-waste.ts'), out);
console.log('Successfully generated bio-waste.ts with ' + records.length + ' records');
