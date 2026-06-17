const fs = require('fs');
const path = require('path');

const hydropowerDamReservoirInterfaces = [
  {
    id: "HCI-KC-001", name: "Kishanganga Dam", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Bandipora", river: "Kishanganga / Neelum", basin: "Jhelum Basin", priority: "Strategic Priority",
    designCapacity: "330 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High",
    serviceArea: "Jhelum Basin", riskExposure: "High", riskDrivers: "Geopolitical / Ecological / Transboundary flow sensitivity",
    sourceId: "SRC-NHPC-KISHANGANGA", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-KC-002", name: "Uri-I Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Baramulla", river: "Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "480 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Jhelum Basin",
    riskExposure: "High", riskDrivers: "Seismic / Flood / Strategic river corridor", sourceId: "SRC-NHPC-URI-I", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-KC-003", name: "Uri-II Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Baramulla", river: "Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "240 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Jhelum Basin",
    riskExposure: "High", riskDrivers: "Flood / Seismic / River corridor dependency", sourceId: "SRC-NHPC-URI-II", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-KC-004", name: "Uri-I Stage-II HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Baramulla", river: "Jhelum", basin: "Jhelum Basin", priority: "Under Construction / Expansion Priority",
    designCapacity: "240 MW", currentLoad: "Under Development", operationalStatus: "Under Tendering", efficiency: "N/A",
    serviceArea: "Jhelum Basin", riskExposure: "High", riskDrivers: "Shared barrage interface / Construction / River corridor sensitivity",
    sourceId: "SRC-NHPC-URI-I-STAGE-II", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-KC-005", name: "Lower Jhelum Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Baramulla", river: "Jhelum", basin: "Jhelum Basin", priority: "Operational Asset", designCapacity: "105 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Jhelum Basin",
    riskExposure: "Moderate", riskDrivers: "Flood / Aging infrastructure / Sedimentation", sourceId: "SRC-JKSPDC-LOWER-JHELUM", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-KC-006", name: "Upper Sindh Stage-I", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Ganderbal", river: "Sindh", basin: "Jhelum Basin", priority: "Operational Asset", designCapacity: "22.6 MW",
    currentLoad: "Snowmelt Dependent", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Sindh Sub-Basin",
    riskExposure: "Moderate", riskDrivers: "Snowmelt variability / Local flood exposure", sourceId: "SRC-JKSPDC-UPPER-SINDH-I", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-KC-007", name: "Upper Sindh Stage-II", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Ganderbal", river: "Sindh", basin: "Jhelum Basin", priority: "High Priority", designCapacity: "105 MW",
    currentLoad: "Snowmelt Dependent", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Sindh Sub-Basin",
    riskExposure: "Moderate", riskDrivers: "Snowmelt variability / Sediment / Flood exposure", sourceId: "SRC-JKSPDC-UPPER-SINDH-II", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-KC-008", name: "New Ganderbal HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Ganderbal", river: "Sindh", basin: "Jhelum Basin", priority: "High Priority", designCapacity: "93 MW",
    currentLoad: "Under Development", operationalStatus: "Under Construction / Development", efficiency: "N/A", serviceArea: "Sindh Sub-Basin",
    riskExposure: "Moderate", riskDrivers: "Construction / Snow-fed flow variability", sourceId: "SRC-JKSPDC-NEW-GANDERBAL", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-KC-009", name: "Ganderbal Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Ganderbal", river: "Sindh", basin: "Jhelum Basin", priority: "Legacy Asset", designCapacity: "15 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Sindh Sub-Basin",
    riskExposure: "Moderate", riskDrivers: "Legacy infrastructure / Local flood exposure", sourceId: "SRC-JKSPDC-GANDERBAL", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-KC-010", name: "Pahalgam Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Anantnag", river: "Lidder", basin: "Jhelum Basin", priority: "Local Operational Asset", designCapacity: "3 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Lidder Sub-Basin",
    riskExposure: "Moderate", riskDrivers: "Tourism pressure / Flash flood exposure", sourceId: "SRC-JKSPDC-PAHALGAM", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-KC-011", name: "Karnah Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Kashmir Core",
    district: "Kupwara", river: "Karnah / Kishanganga-linked local streams", basin: "Jhelum Basin", priority: "Local Operational Asset",
    designCapacity: "2 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate",
    serviceArea: "Kupwara / Karnah", riskExposure: "High", riskDrivers: "Border proximity / Mountain stream variability", sourceId: "SRC-JKSPDC-KARNAH", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-001", name: "Salal Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Reasi", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "690 MW",
    currentLoad: "Base Load / Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Seismic / Sedimentation / Strategic Chenab corridor", sourceId: "SRC-NHPC-SALAL", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-002", name: "Baglihar Stage-I", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Ramban", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "450 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Flood / Seismic / Strategic river control", sourceId: "SRC-JKSPDC-BAGLIHAR-I", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-003", name: "Baglihar Stage-II", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Ramban", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "450 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Flood / Seismic / Strategic river control", sourceId: "SRC-JKSPDC-BAGLIHAR-II", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-004", name: "Dulhasti Hydroelectric Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "390 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Seismic / Landslide / Chenab cascade dependency", sourceId: "SRC-NHPC-DULHASTI", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-005", name: "Dulhasti Stage-II", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Chenab", basin: "Chenab Basin", priority: "Expansion Priority", designCapacity: "260 MW",
    currentLoad: "Under Clearance", operationalStatus: "Under Clearance", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Shared dam interface / Construction / Seismic corridor", sourceId: "SRC-NHPC-DULHASTI-II", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-006", name: "Pakal Dul HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Marusudar / Chenab system", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "1000 MW",
    currentLoad: "Under Construction", operationalStatus: "Under Construction", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Storage / Seismic / Ecological / Strategic", sourceId: "SRC-CVPPPL-PAKAL-DUL", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-007", name: "Ratle HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "850 MW",
    currentLoad: "Under Construction", operationalStatus: "Under Construction", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Seismic / Landslide / Transboundary water sensitivity", sourceId: "SRC-CVPPPL-RATLE", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-008", name: "Kiru HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "624 MW",
    currentLoad: "Under Construction", operationalStatus: "Under Construction", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Seismic / Landslide / Construction exposure", sourceId: "SRC-CVPPPL-KIRU", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-009", name: "Kwar HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "540 MW",
    currentLoad: "Under Construction / Development", operationalStatus: "Under Construction / Development", efficiency: "N/A",
    serviceArea: "Chenab Basin", riskExposure: "High", riskDrivers: "Seismic / Landslide / River cascade dependency", sourceId: "SRC-CVPPPL-KWAR", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-010", name: "Sawalkote HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Ramban / Udhampur", river: "Chenab", basin: "Chenab Basin", priority: "Strategic Priority", designCapacity: "1856 MW",
    currentLoad: "Awaiting Sanction / Development", operationalStatus: "Awaiting Clearance", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Mega project / Seismic / Ecological / Displacement", sourceId: "SRC-NHPC-SAWALKOTE", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-011", name: "Kirthai-II HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Chenab", basin: "Chenab Basin", priority: "Future Strategic Asset", designCapacity: "820 MW",
    currentLoad: "Awaiting Clearance", operationalStatus: "Awaiting Clearance", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "High mountain / Seismic / Construction exposure", sourceId: "SRC-NHPC-KIRTHAI-II", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-012", name: "Bursar HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kishtwar", river: "Marusudar / Chenab system", basin: "Chenab Basin", priority: "Future Storage Priority", designCapacity: "800 MW",
    currentLoad: "Proposed / Clearance Stage", operationalStatus: "Proposed", efficiency: "N/A", serviceArea: "Chenab Basin",
    riskExposure: "High", riskDrivers: "Storage / Seismic / Ecological / Downstream regulation", sourceId: "SRC-NHPC-BURSAR", confidence: "Medium", dashboardLocked: true
  },
  {
    id: "HCI-TD-013", name: "Sewa-II HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kathua", river: "Sewa", basin: "Ravi Basin", priority: "High Priority", designCapacity: "120 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Ravi Basin",
    riskExposure: "Moderate", riskDrivers: "Seasonal flow / Mountain terrain", sourceId: "SRC-NHPC-SEWA-II", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-014", name: "Sewa-III HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kathua", river: "Sewa", basin: "Ravi Basin", priority: "Operational Asset", designCapacity: "9 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Ravi Basin",
    riskExposure: "Moderate", riskDrivers: "Seasonal flow / Local terrain exposure", sourceId: "SRC-JKSPDC-SEWA-III", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-015", name: "Chenani-I HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Udhampur", river: "Tawi / Chenani system", basin: "Chenab / Tawi interface", priority: "Operational Asset",
    designCapacity: "23.3 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate",
    serviceArea: "Udhampur", riskExposure: "Moderate", riskDrivers: "Legacy infrastructure / Mountain hydrology", sourceId: "SRC-JKSPDC-CHENANI-I", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-016", name: "Chenani-II HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Udhampur", river: "Tawi / Chenani system", basin: "Chenab / Tawi interface", priority: "Local Operational Asset",
    designCapacity: "2 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate",
    serviceArea: "Udhampur", riskExposure: "Moderate", riskDrivers: "Small hydropower / Seasonal flow", sourceId: "SRC-JKSPDC-CHENANI-II", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-017", name: "Chenani-III HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Udhampur", river: "Tawi / Chenani system", basin: "Chenab / Tawi interface", priority: "Local Operational Asset",
    designCapacity: "7.5 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate",
    serviceArea: "Udhampur", riskExposure: "Moderate", riskDrivers: "Small hydropower / Seasonal flow", sourceId: "SRC-JKSPDC-CHENANI-III", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-018", name: "Bhaderwah HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Doda", river: "Chenab tributary system", basin: "Chenab Basin", priority: "Local Operational Asset",
    designCapacity: "1 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate",
    serviceArea: "Doda / Bhaderwah", riskExposure: "Moderate", riskDrivers: "Mountain stream / Small hydropower", sourceId: "SRC-JKSPDC-BHADERWAH", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TD-019", name: "Nimoo Bazgo HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Leh", river: "Indus", basin: "Indus Basin", priority: "Strategic Priority", designCapacity: "45 MW",
    currentLoad: "Glacier-fed Seasonal", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Upper Indus / Ladakh",
    riskExposure: "High", riskDrivers: "Cold desert hydrology / Glacier-fed flow / Seismic", sourceId: "SRC-NHPC-NIMOO-BAZGO", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-020", name: "Chutak HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Kargil", river: "Suru", basin: "Indus Basin", priority: "Strategic Priority", designCapacity: "44 MW",
    currentLoad: "Glacier-fed Seasonal", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Suru / Kargil",
    riskExposure: "High", riskDrivers: "Glacier-fed flow / Cold desert / Sediment", sourceId: "SRC-NHPC-CHUTAK", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TD-021", name: "Stakna HEP", category: "Hydropower Dams / Reservoir Interfaces", scope: "Trans-Divisional",
    district: "Leh", river: "Indus", basin: "Indus Basin", priority: "Local Operational Asset", designCapacity: "4 MW",
    currentLoad: "Glacier-fed Seasonal", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Leh / Upper Indus",
    riskExposure: "Moderate", riskDrivers: "Cold desert hydrology / Seasonal flow", sourceId: "SRC-JKSPDC-STAKNA", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-001", name: "Neelum-Jhelum Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Muzaffarabad", river: "Neelum / Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "969 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational / Operationally Sensitive", efficiency: "High", serviceArea: "Jhelum Basin",
    riskExposure: "High", riskDrivers: "Tunnel / Seismic / Transboundary hydrology", sourceId: "SRC-WAPDA-NEELUM-JHELUM", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-002", name: "Mangla Dam", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Mirpur", river: "Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "1000+ MW",
    currentLoad: "Base Load / Storage Regulated", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Jhelum Basin / National Grid",
    riskExposure: "High", riskDrivers: "Large reservoir / Sedimentation / Seismic / Downstream dependency", sourceId: "SRC-WAPDA-MANGLA", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-003", name: "Karot Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Kotli / Rawalpindi interface", river: "Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "720 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Jhelum Cascade",
    riskExposure: "High", riskDrivers: "Cascade dependency / Seismic / Ecological", sourceId: "SRC-CPEC-KAROT", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-004", name: "Kohala Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Muzaffarabad / Bagh interface", river: "Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "1124 MW",
    currentLoad: "Under Development", operationalStatus: "Under Development", efficiency: "N/A", serviceArea: "Jhelum Cascade",
    riskExposure: "High", riskDrivers: "Large cascade project / Seismic / Ecological / Downstream flow", sourceId: "SRC-CPEC-KOHALA", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-005", name: "Azad Pattan Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Sudhnoti", river: "Jhelum", basin: "Jhelum Basin", priority: "Strategic Priority", designCapacity: "700 MW",
    currentLoad: "Under Development", operationalStatus: "Under Construction / Development", efficiency: "N/A", serviceArea: "Jhelum Cascade",
    riskExposure: "High", riskDrivers: "Run-of-river cascade / Seismic / Ecological", sourceId: "SRC-CPEC-AZAD-PATTAN", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-006", name: "Gulpur Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Kotli", river: "Poonch", basin: "Jhelum Basin", priority: "High Priority", designCapacity: "102 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Poonch / Jhelum Basin",
    riskExposure: "Moderate", riskDrivers: "River ecology / Seasonal flow / Local flood exposure", sourceId: "SRC-AJK-GULPUR", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-007", name: "Patrind Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Muzaffarabad / Abbottabad interface", river: "Kunhar / Jhelum system", basin: "Jhelum Basin", priority: "High Priority",
    designCapacity: "147 MW", currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "High", serviceArea: "Kunhar-Jhelum Interface",
    riskExposure: "Moderate", riskDrivers: "Tunnel / River diversion / Seasonal flow", sourceId: "SRC-AJK-PATRIND", confidence: "Medium", dashboardLocked: false
  },
  {
    id: "HCI-TB-008", name: "Mahal Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Bagh / Sudhnoti interface", river: "Jhelum", basin: "Jhelum Basin", priority: "Proposed Strategic Asset", designCapacity: "590 MW",
    currentLoad: "Proposed", operationalStatus: "Proposed", efficiency: "N/A", serviceArea: "Jhelum Cascade",
    riskExposure: "High", riskDrivers: "Cascade development / Seismic / Ecological", sourceId: "SRC-AJK-MAHAL", confidence: "Low", dashboardLocked: true
  },
  {
    id: "HCI-TB-009", name: "Chakothi-Hattian Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Hattian Bala", river: "Jhelum", basin: "Jhelum Basin", priority: "Proposed Strategic Asset", designCapacity: "500 MW",
    currentLoad: "Proposed", operationalStatus: "Proposed", efficiency: "N/A", serviceArea: "Jhelum Cascade",
    riskExposure: "High", riskDrivers: "Transboundary corridor / Seismic / Ecological", sourceId: "SRC-AJK-CHAKOTHI-HATTIAN", confidence: "Low", dashboardLocked: true
  },
  {
    id: "HCI-TB-010", name: "Diamer Basha Dam", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Diamer", river: "Indus", basin: "Upper Indus Basin", priority: "Strategic Priority", designCapacity: "4500 MW",
    currentLoad: "Under Construction", operationalStatus: "Under Construction", efficiency: "N/A", serviceArea: "Upper Indus Basin",
    riskExposure: "Critical", riskDrivers: "Mega dam / Seismic / Reservoir / Resettlement / Sedimentation", sourceId: "SRC-WAPDA-DIAMER-BASHA", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TB-011", name: "Bunji Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Astore / Gilgit interface", river: "Indus", basin: "Upper Indus Basin", priority: "Future Strategic Asset", designCapacity: "7100 MW",
    currentLoad: "Ready for Construction / Financing Pending", operationalStatus: "Proposed / Ready for Construction", efficiency: "N/A", serviceArea: "Upper Indus Basin",
    riskExposure: "Critical", riskDrivers: "Mega hydropower / Seismic / Karakoram hydrology / Financing uncertainty", sourceId: "SRC-WAPDA-BUNJI", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TB-012", name: "Satpara Dam", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Skardu", river: "Satpara Nullah / Satpara Lake", basin: "Upper Indus Basin", priority: "High Priority", designCapacity: "17.3 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Fully Operational", efficiency: "Moderate", serviceArea: "Skardu / Upper Indus",
    riskExposure: "High", riskDrivers: "Drinking water dependency / Lake interface / Basin contamination risk", sourceId: "SRC-WAPDA-SATPARA", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TB-013", name: "Basho Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Skardu", river: "Basho Lungma", basin: "Upper Indus Basin", priority: "High Priority", designCapacity: "40 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Under Development / Operational Phasing", efficiency: "N/A", serviceArea: "Skardu / Upper Indus",
    riskExposure: "High", riskDrivers: "Mountain nullah / Sediment / Glacier-snow hydrology", sourceId: "SRC-WAPDA-BASHO", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TB-014", name: "Harpo Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Skardu", river: "Harpo Nullah", basin: "Upper Indus Basin", priority: "High Priority", designCapacity: "34.5 MW",
    currentLoad: "Seasonal Flow", operationalStatus: "Partially Operational / Phase-II Under Construction", efficiency: "Moderate", serviceArea: "Skardu / Upper Indus",
    riskExposure: "High", riskDrivers: "Mountain nullah / Phased construction / Sediment", sourceId: "SRC-WAPDA-HARPO", confidence: "High", dashboardLocked: false
  },
  {
    id: "HCI-TB-015", name: "Shyok Dam Multipurpose Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Ghanche", river: "Shyok", basin: "Upper Indus Basin", priority: "Future Strategic Asset", designCapacity: "640 MW",
    currentLoad: "Proposed", operationalStatus: "Proposed", efficiency: "N/A", serviceArea: "Shyok / Upper Indus",
    riskExposure: "Critical", riskDrivers: "Glacier-fed basin / GLOF / Seismic / Strategic valley", sourceId: "SRC-WAPDA-SHYOK", confidence: "Medium", dashboardLocked: true
  },
  {
    id: "HCI-TB-016", name: "Attabad Lake Hydropower Project", category: "Hydropower Dams / Reservoir Interfaces", scope: "Transboundary / Extended",
    district: "Hunza", river: "Hunza River / Attabad Lake", basin: "Upper Indus Basin", priority: "High Priority", designCapacity: "54 MW",
    currentLoad: "Proposed / Development", operationalStatus: "Proposed", efficiency: "N/A", serviceArea: "Hunza / Upper Indus",
    riskExposure: "Critical", riskDrivers: "Landslide lake / Lake outburst / Mountain hazard", sourceId: "SRC-WAPDA-ATTABAD", confidence: "Medium", dashboardLocked: true
  }
];

const mappedHydro = hydropowerDamReservoirInterfaces.map(h => {
  return {
    id: h.id,
    asset_name: h.name,
    asset_type: h.category,
    scope: h.scope,
    division_region: h.scope === 'Transboundary / Extended' ? (h.district === 'Muzaffarabad' || h.district === 'Mirpur' || h.district === 'Kotli' || h.district.includes('Bagh') || h.district === 'Sudhnoti' || h.district === 'Hattian Bala' ? 'AJK' : 'GB') : (h.scope === 'Kashmir Core' ? 'Kashmir Valley' : (h.district === 'Leh' || h.district === 'Kargil' ? 'Ladakh' : 'Jammu')),
    district: h.district,
    city_or_authority: h.sourceId.split('-')[1] || 'Authority',
    ward_or_service_area: h.serviceArea,
    operator: h.sourceId.split('-')[1] || 'Authority',
    source_or_catchment: h.river + ' (' + h.basin + ')',
    design_capacity: h.designCapacity,
    current_load: h.currentLoad,
    utilization_percent: 'N/A',
    treatment_technology: 'Hydropower',
    operational_status: h.operationalStatus,
    treatment_efficiency: h.efficiency,
    management_efficiency: h.efficiency,
    risk_exposure: h.riskExposure + ' (' + h.riskDrivers + ')',
    receiving_waterbody: h.river,
    served_population: 'N/A',
    last_upgrade_year: 'N/A',
    priority_level: h.priority
  };
});

const fileContent = fs.readFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), 'utf8');

// The original file has an array `records` starting at `const records = [` and ending with `];`
// We will match the HYDROPOWER section specifically if possible.
// Actually, it's safer to just read the existing records array by evaluating the existing file, but let's just do a string replace:
// Find `    // ─── HYDROPOWER DAMS / RESERVOIRS ───` to the end of the array.
const startMarker = '    // ─── HYDROPOWER DAMS / RESERVOIRS ───';
const startIndex = fileContent.indexOf(startMarker);

if (startIndex === -1) {
  console.log("Could not find hydropower marker.");
  process.exit(1);
}

// Find the end of the records array which is `];` after the start marker
const endMarker = '];';
const endIndex = fileContent.indexOf(endMarker, startIndex);

const before = fileContent.substring(0, startIndex);
const after = fileContent.substring(endIndex + 2); // skip `];`

// Append mappedHydro to records
const hydroString = '    // ─── HYDROPOWER DAMS / RESERVOIRS ───\n' + mappedHydro.map(r => '    ' + JSON.stringify(r, null, 4)).join(',\n') + '\n];';

const newContent = before + hydroString + after;

fs.writeFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), newContent);
console.log("Successfully injected " + mappedHydro.length + " hydropower records into generate_critical_infrastructure_data.js");
