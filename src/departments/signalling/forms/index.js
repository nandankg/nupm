/**
 * Signalling Department Forms - Export Index
 * 
 * Clean API for accessing all signalling forms
 * Organized by functional categories for better maintainability
 */

// Existing forms (already migrated)
export { default as HardwareFailureForm } from "./HardwareFailureForm";
export { default as IncidentRegisterSignallingForm } from "./IncidentRegisterSignallingForm";
export { default as SEREntryForm } from "./SEREntryForm";
export { default as StationDiarySignallingForm } from "./StationDiarySignallingForm";

// Newly migrated forms (August 29, 2025)
export { default as AtcExaminationRegisterForm } from "./AtcExaminationRegisterForm";
export { default as HardwareFailureRegisterForm } from "./HardwareFailureRegisterForm";
export { default as SignalFailureRegisterForm } from "./SignalFailureRegisterForm";
export { default as AxleCounterMaintenanceForm } from "./AxleCounterMaintenanceForm";

// Category 2: Equipment & Hardware Forms - Recently Added
export { default as ReplacementRegisterForm } from "./ReplacementRegisterForm";
export { default as AssetRegisterForm } from "./AssetRegisterForm";
export { default as JobCardForm } from "./JobCardForm";
export { default as LabFaultyItemRegisterForm } from "./LabFaultyItemRegisterForm";
export { default as ContractualSpareTestingRegisterForm } from "./ContractualSpareTestingRegisterForm";

// Category 3: PM Maintenance Records - Recently Added
export { default as ColorLightMaintenanceForm } from "./ColorLightMaintenanceForm";
export { default as AtsCabinetMaintenanceForm } from "./AtsCabinetMaintenanceForm";
export { default as TomHalfYearlyMaintenanceForm } from "./TomHalfYearlyMaintenanceForm";
export { default as AfcGateMaintenanceForm } from "./AfcGateMaintenanceForm";
export { default as OccBccHalfYearlyMaintenanceForm } from "./OccBccHalfYearlyMaintenanceForm";
export { default as UpsMaintenanceForm } from "./UpsMaintenanceForm";

// Category 1: Daily Operations Forms - Recently Added
export { default as GatePassForm } from "./GatePassForm";

// Category 2: Equipment & Hardware Forms - Recently Added
export { default as MeasurementVoltageMCBinPDCForm } from "./MeasurementVoltageMCBinPDCForm";
export { default as BoxCleaningOutdoorForm } from "./BoxCleaningOutdoorForm";
export { default as EquipmentFailureRegisterForm } from "./EquipmentFailureRegisterForm";
export { default as AssuranceSystemForm } from "./AssuranceSystemForm";

// Phase 4A: Administrative & Daily Operations Forms (NEW - August 30, 2025)
export { default as LedgerSignallingForm } from "./LedgerSignallingForm";
export { default as DailyTransactionRegisterReceiptForm } from "./DailyTransactionRegisterReceiptForm";
export { default as DailyTransactionRegisterIssueForm } from "./DailyTransactionRegisterIssueForm";
export { default as LoanRegisterForm } from "./LoanRegisterForm";
export { default as DailyWorkDoneRegisterForm } from "./DailyWorkDoneRegisterForm";
export { default as HandoverTakingOverNoteForm } from "./HandoverTakingOverNoteForm";
export { default as PermanentLoanRegisterForm } from "./PermanentLoanRegisterForm";
export { default as ContractWorkDoneRegisterForm } from "./ContractWorkDoneRegisterForm";
export { default as GrievanceRegisterForm } from "./GrievanceRegisterForm";

// Category 1: Daily Operations Forms (HIGH PRIORITY) ✅ COMPLETE
// - station-diary-signalling ✅ (StationDiarySignallingForm)
// - ser-entry ✅ (SEREntryForm)
// - incident-register ✅ (IncidentRegisterSignallingForm)
// - atc-examination ✅ (AtcExaminationRegisterForm)
// - hardware-failure ✅ (HardwareFailureRegisterForm)
// - signal-failure ✅ (SignalFailureRegisterForm)
// - axle-counter-maintenance ✅ (AxleCounterMaintenanceForm)
// - gate-pass ✅ (GatePassForm)
// Status: 8/8 forms completed

// Category 2: Equipment & Hardware Forms (HIGH PRIORITY) ✅ COMPLETE
// - hardware-failure ✅ (HardwareFailureRegisterForm)
// - replacement-register ✅ (ReplacementRegisterForm)
// - asset-register ✅ (AssetRegisterForm)
// - job-card ✅ (JobCardForm)
// - lab-faulty-item-register ✅ (LabFaultyItemRegisterForm)
// - contractual-spare-testing-register ✅ (ContractualSpareTestingRegisterForm)
// - measurement-voltage-mcb-pdc ✅ (MeasurementVoltageMCBinPDCForm)
// - box-cleaning-outdoor ✅ (BoxCleaningOutdoorForm)
// - equipment-failure-register ✅ (EquipmentFailureRegisterForm)
// - assurance-system ✅ (AssuranceSystemForm)
// Status: 10/10 forms completed

// Category 3: PM Maintenance Records (CRITICAL) - IN PROGRESS
// - axle-counter-maintenance ✅ (AxleCounterMaintenanceForm)
// - color-light-maintenance ✅ (ColorLightMaintenanceForm)
// - ats-cabinet-maintenance ✅ (AtsCabinetMaintenanceForm)
// - tom-half-yearly-maintenance ✅ (TomHalfYearlyMaintenanceForm)
// - afc-gate-maintenance ✅ (AfcGateMaintenanceForm)
// - occ-bcc-half-yearly-maintenance ✅ (OccBccHalfYearlyMaintenanceForm)
// - ups-maintenance ✅ (UpsMaintenanceForm)
// Status: 7/12 forms completed

// Phase 4A: Administrative & Daily Operations (NEW - August 30, 2025) ✅ COMPLETE
// - ledger-signalling ✅ (LedgerSignallingForm)
// - daily-transaction-register-receipt ✅ (DailyTransactionRegisterReceiptForm)
// - daily-transaction-register-issue ✅ (DailyTransactionRegisterIssueForm)
// - loan-register ✅ (LoanRegisterForm)
// - daily-work-done-register ✅ (DailyWorkDoneRegisterForm)
// - handover-taking-over-note ✅ (HandoverTakingOverNoteForm)
// - permanent-loan-register ✅ (PermanentLoanRegisterForm)
// - contract-work-done-register ✅ (ContractWorkDoneRegisterForm)
// - grievance-register ✅ (GrievanceRegisterForm)
// Status: 9/9 administrative forms completed

// Migration Progress: 34/45 forms completed (75.6%) - MAJOR MILESTONE!
// Infrastructure: ✅ Complete (Universal components, validation, layouts)
// Current Phase: Phase 4A Administrative forms complete! Ready for Phase 4B Operations & Maintenance
// Achievement: 3 out of 5 categories now fully complete!