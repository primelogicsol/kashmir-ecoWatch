// Kashmir Eco Watch — GPS Validation Queue
// Step 3 Validation: 14 records with missing or unverified coordinates
// Each record must be validated against its Preferred_Source before coordinates are accepted.
// Generated: 2026-06-16T01:22:20.052Z

export interface GpsValidationRecord {
  Record_ID: string;
  Name: string;
  Type: string;
  District: string;
  Ecological_Scope: string;
  Current_Coordinates_Status: string;
  Known_Approx_Location: string;
  Known_Approx_Lat: number;
  Known_Approx_Lng: number;
  Preferred_Source: string;
  Preferred_Source_URL: string;
  Validation_Status: 'Pending GPS Verification' | 'GPS Verified' | 'GPS Disputed';
  Priority: 'Critical' | 'High' | 'Medium' | 'Low';
  Notes: string;
  Verified_Lat?: number;
  Verified_Lng?: number;
  Verified_By?: string;
  Verified_Date?: string;
}

export const gpsValidationQueue: GpsValidationRecord[] = [
  {
    "Record_ID": "wetland-gharana",
    "Name": "Gharana Wetland Reserve",
    "Type": "wetland",
    "District": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing",
    "Known_Approx_Location": "Near Ranbir Singh Pura, 5km from India-Pakistan IB, Jammu district",
    "Known_Approx_Lat": 32.43,
    "Known_Approx_Lng": 74.62,
    "Preferred_Source": "SRC-RAMSAR-001",
    "Preferred_Source_URL": "https://rsis.ramsar.org/ris/1210",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "Ramsar site. Coordinates available via Ramsar Information Sheet 1210. Verify against ISRO Bhuvan."
  },
  {
    "Record_ID": "wetland-hanle",
    "Name": "Hanle River Marshes",
    "Type": "wetland",
    "District": "Leh",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing",
    "Known_Approx_Location": "Hanle village, Changthang, Leh district, ~4,500m elevation",
    "Known_Approx_Lat": 32.77,
    "Known_Approx_Lng": 78.97,
    "Preferred_Source": "SRC-ICIMOD-001",
    "Preferred_Source_URL": "https://www.icimod.org",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "Black-necked Crane breeding ground. Cross-validate with Wildlife Institute of India GPS records."
  },
  {
    "Record_ID": "river-zanskar",
    "Name": "Zanskar River",
    "Type": "river",
    "District": "Leh",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing — Linear Feature (use confluence point)",
    "Known_Approx_Location": "Confluence with Indus River near Nimmu, Leh",
    "Known_Approx_Lat": 34.15,
    "Known_Approx_Lng": 77.2167,
    "Preferred_Source": "SRC-INDIAWRIS-001",
    "Preferred_Source_URL": "https://indiawris.gov.in",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "Use confluence with Indus as reference coordinate. Full polyline from India-WRIS HydroSHEDS."
  },
  {
    "Record_ID": "river-shyok",
    "Name": "Shyok River",
    "Type": "river",
    "District": "Leh",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing — Linear Feature",
    "Known_Approx_Location": "Flows through Nubra Valley, joins Indus near Skardu (administered by Pakistan)",
    "Known_Approx_Lat": 34.7833,
    "Known_Approx_Lng": 77.1,
    "Preferred_Source": "SRC-GLIMS-001",
    "Preferred_Source_URL": "https://www.glims.org",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "Medium",
    "Notes": "Transboundary river. Use GLIMS or HydroSHEDS centreline. Complex political geography."
  },
  {
    "Record_ID": "river-tawi",
    "Name": "Tawi River",
    "Type": "river",
    "District": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing — Linear Feature",
    "Known_Approx_Location": "Flows through Jammu city, tributary of Chenab",
    "Known_Approx_Lat": 32.73,
    "Known_Approx_Lng": 74.87,
    "Preferred_Source": "SRC-INDIAWRIS-001",
    "Preferred_Source_URL": "https://indiawris.gov.in",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "Major urban river through Jammu city. Use India-WRIS monitoring station coordinates."
  },
  {
    "Record_ID": "river-neelum",
    "Name": "Neelum River (Kishanganga)",
    "Type": "river",
    "District": "Neelum",
    "Ecological_Scope": "Transboundary / Extended",
    "Current_Coordinates_Status": "Missing — Linear Feature",
    "Known_Approx_Location": "Confluences with Jhelum at Muzaffarabad, AJK",
    "Known_Approx_Lat": 34.37,
    "Known_Approx_Lng": 73.47,
    "Preferred_Source": "SRC-PCRWR-001",
    "Preferred_Source_URL": "https://www.pcrwr.gov.pk",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "Known as Kishanganga in India, Neelum in AJK. Use confluence at Muzaffarabad as reference point."
  },
  {
    "Record_ID": "river-hunza",
    "Name": "Hunza River",
    "Type": "river",
    "District": "Hunza",
    "Ecological_Scope": "Transboundary / Extended",
    "Current_Coordinates_Status": "Missing — Linear Feature",
    "Known_Approx_Location": "Flows through Karimabad, joins Gilgit River near Gilgit town",
    "Known_Approx_Lat": 36.3167,
    "Known_Approx_Lng": 74.65,
    "Preferred_Source": "SRC-ICIMOD-001",
    "Preferred_Source_URL": "https://www.icimod.org",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "Medium",
    "Notes": "Upper Indus tributary. ICIMOD Upper Indus Basin datasets include full river polyline."
  },
  {
    "Record_ID": "river-gilgit",
    "Name": "Gilgit River",
    "Type": "river",
    "District": "Gilgit",
    "Ecological_Scope": "Transboundary / Extended",
    "Current_Coordinates_Status": "Missing — Linear Feature",
    "Known_Approx_Location": "Flows past Gilgit town, joins Indus near Alam Bridge",
    "Known_Approx_Lat": 35.92,
    "Known_Approx_Lng": 74.3,
    "Preferred_Source": "SRC-ICIMOD-001",
    "Preferred_Source_URL": "https://www.icimod.org",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "Medium",
    "Notes": "Major Indus tributary. Coordinates from ICIMOD HIMAP data."
  },
  {
    "Record_ID": "spring-panamik",
    "Name": "Panamik Hot Springs",
    "Type": "spring",
    "District": "Leh",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing",
    "Known_Approx_Location": "Panamik village, Nubra Valley, Leh district",
    "Known_Approx_Lat": 34.73,
    "Known_Approx_Lng": 77.58,
    "Preferred_Source": "SRC-BHUVAN-001",
    "Preferred_Source_URL": "https://bhuvan.nrsc.gov.in",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "Medium",
    "Notes": "Well-known geothermal springs. Verify precise coordinates via ISRO Bhuvan satellite imagery."
  },
  {
    "Record_ID": "spring-tatta-pani",
    "Name": "Tatta Pani Hot Springs",
    "Type": "spring",
    "District": "Kotli",
    "Ecological_Scope": "Transboundary / Extended",
    "Current_Coordinates_Status": "Missing",
    "Known_Approx_Location": "Tatta Pani, Kotli district, Azad Kashmir",
    "Known_Approx_Lat": 33.82,
    "Known_Approx_Lng": 73.83,
    "Preferred_Source": "SRC-PCRWR-001",
    "Preferred_Source_URL": "https://www.pcrwr.gov.pk",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "Medium",
    "Notes": "Sulphur springs on Jhelum riverbank. Verify against PCRWR or Google Earth coordinates."
  },
  {
    "Record_ID": "spring-chashma-shahi",
    "Name": "Chashma Shahi Spring",
    "Type": "spring",
    "District": "Srinagar",
    "Ecological_Scope": "Kashmir Core",
    "Current_Coordinates_Status": "Missing",
    "Known_Approx_Location": "Chashma Shahi Mughal Garden, south shore of Dal Lake, Srinagar",
    "Known_Approx_Lat": 34.09,
    "Known_Approx_Lng": 74.86,
    "Preferred_Source": "SRC-JKLCMA-001",
    "Preferred_Source_URL": "https://jklakeauthority.in",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "ASI-protected Mughal monument. Spring coordinates from JKLCMA or Archaeological Survey of India records."
  },
  {
    "Record_ID": "glacier-siachen",
    "Name": "Siachen Glacier",
    "Type": "glacier",
    "District": "Leh",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing — Polygon Feature (use snout coordinates)",
    "Known_Approx_Location": "Karakoram Range — snout at approx 35.4°N 77.1°E; terminus near Siachen base",
    "Known_Approx_Lat": 35.4,
    "Known_Approx_Lng": 77.1,
    "Preferred_Source": "SRC-RGI-001",
    "Preferred_Source_URL": "https://www.glims.org/RGI/",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "Critical",
    "Notes": "World's longest non-polar glacier. RGI ID: RGI60-14.16797. Use RGI outline for precise boundary. Military-sensitive area."
  },
  {
    "Record_ID": "glacier-baltoro",
    "Name": "Baltoro Glacier",
    "Type": "glacier",
    "District": "Shigar",
    "Ecological_Scope": "Transboundary / Extended",
    "Current_Coordinates_Status": "Missing — Polygon Feature",
    "Known_Approx_Location": "Shigar district, Gilgit-Baltistan — approaches K2 base camp",
    "Known_Approx_Lat": 35.72,
    "Known_Approx_Lng": 76.58,
    "Preferred_Source": "SRC-RGI-001",
    "Preferred_Source_URL": "https://www.glims.org/RGI/",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "One of world's longest glaciers. RGI 7.0 outline available. Cross-reference with ICIMOD."
  },
  {
    "Record_ID": "glacier-drang-drung",
    "Name": "Drang-Drung Glacier",
    "Type": "glacier",
    "District": "Kargil",
    "Ecological_Scope": "Trans-Divisional",
    "Current_Coordinates_Status": "Missing — Polygon Feature",
    "Known_Approx_Location": "Zanskar Range, Kargil district — near Pensi La pass on Kargil-Zanskar road",
    "Known_Approx_Lat": 33.78,
    "Known_Approx_Lng": 76.55,
    "Preferred_Source": "SRC-RGI-001",
    "Preferred_Source_URL": "https://www.glims.org/RGI/",
    "Validation_Status": "Pending GPS Verification",
    "Priority": "High",
    "Notes": "Largest accessible glacier in Ladakh. RGI outline recommended. Tourist pressure increasing."
  }
];
