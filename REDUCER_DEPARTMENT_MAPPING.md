# 🗺️ **DETAILED REDUCER DEPARTMENT MAPPING**
## **Complete Migration Map: 209 Reducers → Department Architecture**

---

## 📊 **Migration Overview**
- **Current**: 209 reducer files across 10 directories
- **Target**: 35-50 consolidated slice files across 7 departments
- **Reduction**: 75% fewer files, 60-70% less duplicate code

---

## 🏗️ **SIGNALLING DEPARTMENT**
### **Target Structure:**
```
src/departments/signalling/redux/
├── maintenanceSlice.js     # PM logs, equipment maintenance
├── safetySlice.js          # Incidents, drills, safety registers
├── systemSlice.js          # Signal systems, equipment status
└── inspectionSlice.js      # Inspections, testing, compliance
```

### **Migrating Reducers (45+ files → 4 slices):**

#### **→ maintenanceSlice.js (PM & Equipment Maintenance)**
```yaml
From rajiv/:
  - PMLogBook3Reducer.jsx
  - PMLogBookMainLine3Reducer.jsx
  - PMsheetMonthlyDepotReducer.jsx (duplicate)
  - PMSheetDepotQuartForm2Reducer.jsx
  - PMSheetDepotQuartForm22Reducer.jsx

From satya/:
  - PMLogBookTVMReducer.jsx
  - PMMainlineReducer.jsx
  - MonthlyCabinetRecordReducer.jsx
  - BoxCleaningRecordReducer.jsx

From monika/:
  - PmLogBookReducer.jsx
  - PmLogBookMainlineReducer.jsx
  - MaintenanceReducer.jsx
  - EarlyReducer.jsx

From pinki/:
  - PMsheetMonthlyDepotReducer.jsx
  - BoxCleaningOutdoorReducer.jsx

From akshra/:
  - PmloogbookReducer.jsx
  - PmsheetReducer.jsx

From manshi/:
  - Pmlog6Reducer.jsx
  - PmlogMaintainReducer.jsx
  - Pmsheetoccbcchalfyearlyreducer.jsx

From chanchal/:
  - Pm_logbook_half_yearly_other_mainline_Reducer.jsx
  - PmFolUpReducer.jsx

From isha/:
  - PM8reducer.jsx
  - PMLBM9REducer.jsx
  - PREVENTIVEMAINTENACE_CC_CCHSReducer.jsx
  - FilterReplacementReducer.jsx
  - FanRackReducer.jsx

From store/:
  - HalfYearlyMaintenanceFormReducer.jsx

Root level:
  - PmSheetReducer.jsx
  - Update_Check_List_PM_occ_bcc_Red.jsx
  - ESPQuarterlyMaintananceSignalReducer.jsx
  - DepotyearlyReducer.jsx
```

#### **→ safetySlice.js (Incidents & Safety Operations)**
```yaml
From multiple directories (IncidentRegisterSignalsReducer.jsx appears 6+ times):
  - akshra/IncidentRegisterSignalsReducer.jsx
  - chanchal/IncidentRegisterSignalsReducer.jsx (disabled in store)
  - isha/IncidentAccidentRegReducer.jsx
  - manshi/IncidentRegisterSignalsReducer.jsx
  - monika/IncidentRegisterSignalsReducer.jsx
  - pinki/IncidentRegisterSignalsReducer.jsx
  - satya/IncidentRegisterSignalsReducer.jsx (disabled)

From various directories (Drill reducers):
  - akshra/EmefiremandrillReducer.jsx
  - chanchal/ManPoiOpeDrillReducer.jsx
  - chanchal/PASDrillReducer.jsx
  - isha/ESPDRILLReducer.jsx
  - manshi/EtsDrillReducer.jsx
  - rajiv/LiftRescueDrillReducer.jsx
  - satya/FacpDrillReducer.jsx
  - store/EscalatorDrillReducer.jsx
  - store/NightAfcGateDrillReducer.jsx

Root level safety:
  - FirstAidRegisterReducer.jsx
  - IncidentAccidentRegReducer.jsx
  - LatsVduDrillReducer.jsx

Additional safety reducers:
  - pinki/IncidentAccidentReportReducer.jsx
  - monika/FirstAidRegisterReducer.jsx (disabled)
```

#### **→ systemSlice.js (Signal Systems & Equipment)**
```yaml
Equipment & System Status:
  - ColorLightSignalMainlineReducer.jsx
  - pinki/SignalFailureReducer.jsx
  - pinki/HardwareFailureReducer.jsx
  - satya/EquipmentFailureRegisterReducer.jsx
  - chanchal/EquFaiRegReducer.jsx
  - chanchal/FailureReportReducer.jsx
  - isha/AxleCounterReducer.jsx
  - pinki/AxleCounterResetRegisterReducer.jsx

System Configuration:
  - pinki/ATSReducer.jsx
  - isha/DeviceApplicationSoftwareReducer.jsx
  - satya/SwUpdateRegisterReducer.jsx
  - chanchal/MeasurementVoltageMCBinPDCReducer.jsx

Testing & Parameters:
  - isha/ContractualSpareTestingReducer.jsx
  - pinki/AtcExaminationReducer.jsx
  - pinki/ParameterReducer.jsx (if signalling-related)
```

#### **→ inspectionSlice.js (Inspections & Compliance)**
```yaml
Inspection Activities:
  - monika/InspactionReducer.jsx
  - rajiv/QuarterlyTrainInspection.jsx
  - satya/TrainIdReducer.jsx
  - store/TrainIdRecordRegReducer.jsx

Documentation & Records:
  - monika/DocumentManagementReducer.jsx
  - monika/HandoverrecordReducer.jsx
  - pinki/HandingTakingNoteReducer.jsx
```

---

## 📡 **TELECOM DEPARTMENT**
### **Target Structure:**
```
src/departments/telecom/redux/
├── systemSlice.js          # System monitoring, performance
├── maintenanceSlice.js     # Equipment maintenance, repairs  
├── administrativeSlice.js  # Documentation, training, admin
└── networkSlice.js         # Network operations, connectivity
```

### **Migrating Reducers (35+ files → 4 slices):**

#### **→ systemSlice.js (System Monitoring)**
```yaml
System Monitoring:
  - rajiv/DailyTelecomCheckListReducer.jsx
  - manshi/DailyTelecomReducer.jsx
  - monika/DailyTelecomMainReducer.jsx
  - akshra/ChecklistReducer.jsx
  - monika/DailycheckReducer.jsx

Performance & Status:
  - isha/SMPSSYSTEMMAINTENANCERECORDReducer.jsx
  - rajiv/SMPSReducer.jsx
  - monika/DCSReducer.jsx
  - monika/EKTReducer.jsx

Voltage & Technical:
  - chanchal/MeasurementVoltageMCBinPDCReducer.jsx (if telecom)
```

#### **→ maintenanceSlice.js (Equipment Maintenance)**
```yaml
Equipment Repairs:
  - monika/peetyrepairReducer.jsx
  - monika/HandlingRegisterReducer.jsx
  - chanchal/LineDefectReducer.jsx
  - monika/LineDefectReducer.jsx (disabled)

SMPS & Power:
  - isha/SMPSSYSTEMMAINTENANCERECORDReducer.jsx
  - rajiv/SMPSReducer.jsx

Lift & Escalator:
  - rajiv/LiftRescueDrillReducer.jsx
  - rajiv/OperationLiftRescueReducer.jsx
  - manshi/LiftRescue1Reducer.jsx
  - manshi/LiftRescue2Reducer.jsx
  - manshi/LiftRescue3Reducer.jsx (implied)
  - monika/EscalatorReducer.jsx
```

#### **→ administrativeSlice.js (Admin & Documentation)**
```yaml
Training & Personnel:
  - rajiv/CBTTrainingReducer.jsx
  - isha/AttendanceReducer.jsx
  - akshra/BiodataRegReducer.jsx
  - akshra/BiodataoccReducer.jsx

Library & Documentation:
  - monika/LibraryBookReducer.jsx
  - monika/DocumentManagementReducer.jsx

Loans & Admin:
  - isha/LoanregReducer.jsx
  - akshra/LoanregTelecomReducer.jsx
```

#### **→ networkSlice.js (Network Operations)**
```yaml
Network Connectivity:
  - satya/CrewControlCcapReducer.jsx
  - isha/ControlTakenOverReducer.jsx

System Integration:
  - chanchal/ComRecRegReducer.jsx
  - satya/CSSShiftLogReducer.jsx
```

---

## 🚅 **OPERATION DEPARTMENT**
### **Target Structure:**
```
src/departments/operation/redux/
├── stationSlice.js         # Station operations, diary
├── trafficSlice.js         # Traffic management, possession
├── safetySlice.js          # Safety operations, incidents
└── personnelSlice.js       # Staff management, shifts
```

### **Migrating Reducers (25+ files → 4 slices):**

#### **→ stationSlice.js (Station Operations)**
```yaml
Station Management:
  - rajiv/OperationStationDiaryReducer.jsx
  - chanchal/StationDiaryReducer.jsx
  - chanchal/DailyWorkReducer.jsx
  - monika/OfficerReducer.jsx

Entry/Exit Management:
  - rajiv/SDCEntryExitReducer.jsx
  - akshra/InoutReducer.jsx
  - manshi/In_OutReducer.jsx
  - UPSRoomEntryRegReducer.jsx

Gate Operations:
  - chanchal/GateReducer.jsx
  - GatePassReducer.jsx
```

#### **→ trafficSlice.js (Traffic & Possession)**
```yaml
Traffic Management:
  - satya/TrainIdReducer.jsx
  - store/TrainIdRecordRegReducer.jsx
  - rajiv/QuarterlyTrainInspection.jsx

Possession & Work:
  - manshi/PossesionReducer.jsx
  - chanchal/PreMainWorkReducer.jsx
  - manshi/ManualPointReducer.jsx
  - chanchal/ManPoiOpeDrillReducer.jsx
```

#### **→ safetySlice.js (Operational Safety)**
```yaml
Safety Operations:
  - FirstAidRegisterReducer.jsx
  - IncidentAccidentRegReducer.jsx
  - Various drill reducers (operation-specific)
```

#### **→ personnelSlice.js (Staff Management)**
```yaml
Personnel Management:
  - isha/AttendanceReducer.jsx
  - satya/ShiftLogBookReducer.jsx
  - monika/HandoverrecordReducer.jsx
```

---

## 💰 **FINANCE DEPARTMENT**
### **Target Structure:**
```
src/departments/finance/redux/
├── budgetSlice.js          # Budget allotments & approvals
├── transactionSlice.js     # Payments, receipts, ledgers
├── auditSlice.js           # Auditing, compliance
└── reportSlice.js          # Financial reporting
```

### **Migrating Reducers (15+ files → 4 slices):**

#### **→ budgetSlice.js (Budget Management)**
```yaml
Budget Operations:
  - manshi/BudgetAllotmentReducer.jsx
  - pinki/BudgetAllotmentReducer.jsx
  - store/BudgetAllotmentReducer.jsx
  - store/BudgetRegisterPaymentReducer.jsx

Honorarium & Payments:
  - HonorariumRegReducer.jsx
  - ListHonorariumReducer.jsx
  - manshi/HonorariumReducer.jsx
```

#### **→ transactionSlice.js (Transactions & Records)**
```yaml
Financial Transactions:
  - store/LedgerReducer.jsx
  - store/StationEarningReducer.jsx
  - isha/DailyReceiptRedeucer.jsx
  - OutstandRecRegReducer.jsx

Cash Management:
  - rajiv/FoundReceivedCashReducer.jsx
  - FoundReceiveArtReducer.jsx
  - isha/FoundForeignCurrencyReducer.jsx

Loans & Credits:
  - LoanRegisterReducer.jsx
  - isha/LoanregReducer.jsx
  - akshra/LoanregTelecomReducer.jsx
  - rajiv/ImprestRegReducer.jsx
```

#### **→ auditSlice.js (Audit & Compliance)**
```yaml
Audit Operations:
  - chanchal/ClaimRegReducer.jsx
  - chanchal/AssuRegReducer.jsx

Police & Legal:
  - PoliceCtdRegReducer.jsx
  - rajiv/PoliceCustodyRegReducer.jsx
```

#### **→ reportSlice.js (Financial Reporting)**
```yaml
Reporting & Analysis:
  - Various financial report generators
  - Performance analytics
```

---

## 🎫 **AFC-MAINLINE DEPARTMENT**
### **Target Structure:**
```
src/departments/afc-mainline/redux/
├── gateSlice.js            # Gate operations & maintenance
├── preventiveSlice.js      # Preventive maintenance
└── systemSlice.js          # AFC system management
```

### **Migrating Reducers (15+ files → 3 slices):**

#### **→ gateSlice.js (Gate Operations)**
```yaml
Gate Management:
  - rajiv/AFCMonthlyReducer.jsx
  - AfcPreventReducer.jsx
  - AfcPreAnnexureBReducer.jsx
  - CentCompPreReducer.jsx

Gate Drills:
  - chanchal/AfcGateDrillReducer.jsx
  - akshra/AfcGateDrillReducer.jsx
  - store/NightAfcGateDrillReducer.jsx
```

#### **→ preventiveSlice.js (Preventive Maintenance)**
```yaml
AFC Maintenance:
  - manshi/Afc_preventionReducer.jsx
  - pinki/AfcPreventiveReducer.jsx
  - satya/AfcPreventiveMaintenanceReducer.jsx
  - isha/AFCHALFMONTLYReducer.jsx
  - isha/AFCPREVENTIVEMAINTENANCECHECKLISTtvmhalfyearlyREducer.jsx
```

#### **→ systemSlice.js (AFC Systems)**
```yaml
System Management:
  - TER_Entry_Reducer.jsx
  - Various AFC system components
```

---

## 🎯 **AFC-SDC DEPARTMENT**
### **Target Structure:**
```
src/departments/afc-sdc/redux/
├── systemSlice.js          # SDC system operations
├── cardSlice.js            # Card management & initialization
├── parameterSlice.js       # Parameter configuration
└── maintenanceSlice.js     # SDC maintenance operations
```

### **Migrating Reducers (10+ files → 4 slices):**

#### **→ cardSlice.js (Card Management)**
```yaml
Card Operations:
  - pinki/AgentCardReducer.jsx
  - rajiv/CardInitializationReducer.jsx
  - chanchal/CSCInitRegReducer.jsx
  - isha/CSCInitializationDetailRegisterReducer.jsx
  - store/CardRefundReducer.jsx
  - akshra/AgentissueReducer.jsx
```

#### **→ parameterSlice.js (Parameter Management)**
```yaml
Parameter Configuration:
  - pinki/ParameterReducer.jsx
  - store/ParameterReducer.jsx (disabled)
```

#### **→ systemSlice.js (SDC Systems)**
```yaml
System Operations:
  - pinki/FMTSReducer.jsx
  - Various SDC-specific system components
```

#### **→ maintenanceSlice.js (SDC Maintenance)**
```yaml
Maintenance Operations:
  - pinki/PMLogBookSDCReducer.jsx
  - pinki/PMLogBookReducerSDC.jsx
```

---

## 🏪 **AFC-STORE DEPARTMENT**
### **Target Structure:**
```
src/departments/afc-store/redux/
├── inventorySlice.js       # Inventory management
├── transactionSlice.js     # Store transactions
└── assetSlice.js           # Asset management
```

### **Migrating Reducers (25+ files → 3 slices):**

#### **→ inventorySlice.js (Inventory Management)**
```yaml
Stock Management:
  - pinki/StockMovementRegisterReducer.jsx
  - pinki/DeadStockReducer.jsx
  - store/DailyIssueReducer.jsx
  - store/RequisitionReducer.jsx
  - store/RequisitionSlipReducer.jsx

Material Distribution:
  - manshi/MaterialDistributionReducer.jsx
  - pinki/MaterialDistributionReducer.jsx (disabled)
  - pinki/MaterialDistributionTraineeReducer.jsx
  - satya/LabMaterialTransactionReducer.jsx

DTR Operations:
  - store/DtrReceiptStoreReducer.jsx
  - store/DtrIssueStoreReducer.jsx
  - akshra/DtrregReducer.jsx
  - akshra/DtrleftsideReducer.jsx
  - akshra/DtrsignalsissueReducer.jsx
  - akshra/DtrsignalsreceiptsReducer.jsx
```

#### **→ assetSlice.js (Asset Management)**
```yaml
Asset Operations:
  - store/AssetRegisterReducer.jsx
  - store/AssetregistersignalReducer.jsx
  - store/ActivityLogReducer.jsx
```

#### **→ transactionSlice.js (Store Transactions)**
```yaml
Transaction Management:
  - Various store transaction components
```

---

## 🌐 **SHARED/COMMON SLICES**
### **Target Structure:**
```
src/departments/shared/redux/
├── authSlice.js            # Authentication (existing)
├── uiSlice.js             # UI state management
├── commonSlice.js         # Common CRUD operations
└── utilitySlice.js        # Utility functions
```

### **Migrating Reducers:**

#### **→ authSlice.js (Authentication)**
```yaml
Existing:
  - AuthReducer.jsx (already modern)
```

#### **→ uiSlice.js (UI State)**
```yaml
UI Management:
  - RedirectReducer.jsx
  - Various modal and alert states
```

#### **→ commonSlice.js (Common Operations)**
```yaml
Common Functionality:
  - redux/tableDataSlice.jsx (already modern)
  - Common CRUD patterns
  - Shared form states
```

---

## 🍻 **MISCELLANEOUS/UTILITIES**
### **Reducers to Handle Separately:**

#### **Consumables & Refreshments**
```yaml
To be moved to appropriate departments or utilities:
  - manshi/ConsumableReducer.jsx → Store/Inventory
  - satya/TeaCoffeeReducer.jsx → Common/Utilities
  - store/TeaCofeesReducer.jsx → Common/Utilities
```

#### **Contractor & External**
```yaml
To be moved to appropriate departments:
  - manshi/ContractorReducer.jsx → Finance/Contracts
  - isha/EstimateLOAReducer.jsx → Finance/Estimates
  - isha/GrievanceReducer.jsx → HR/Personnel
```

---

## 📊 **CONSOLIDATION SUMMARY**

### **Before Migration:**
- **Total Files**: 209 reducer files
- **Directory Structure**: 10 developer-based directories
- **Duplicate Logic**: ~80% code duplication
- **Store Config**: 420+ lines, 200+ imports

### **After Migration:**
- **Total Files**: 35-50 slice files (75% reduction)
- **Directory Structure**: 7 department-based directories + shared
- **Duplicate Logic**: ~20% code duplication (60% reduction)
- **Store Config**: ~150 lines, 30-40 imports (65% reduction)

### **Key Benefits:**
- **✅ Maintainability**: Single source of truth per department
- **✅ Scalability**: Easy to add new forms/functionality
- **✅ Performance**: Smaller bundles, faster builds
- **✅ Developer Experience**: Clearer structure, better organization
- **✅ Consistency**: Uniform patterns across departments

---

**This mapping provides a complete roadmap for migrating all 209 reducers into a modern, maintainable, department-based architecture that will significantly improve the UPMRC application's state management system.**