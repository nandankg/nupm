// Telecom Department Forms Export
// Priority 1 - Daily Operations Forms (6/6 COMPLETE)

// ✅ COMPLETED FORMS
export { default as ChecklistAndPmDepotForm } from './ChecklistAndPmDepotForm';
export { default as ChecklistAndPmStationForm } from './ChecklistAndPmStationForm';
export { default as ChecklistAndPmOccbccForm } from './ChecklistAndPmOccbccForm';
export { default as CssShiftLogBookForm } from './CssShiftLogBookForm';
export { default as InstructionShiftLogBookForm } from './InstructionShiftLogBookForm';
export { default as RequisitionRegisterForm } from './RequisitionRegisterForm';

// ⏳ REMAINING FORMS (27/33):
// 
// Priority 2 - Administrative Core (10 forms):
// - AssetRegisterTelecomForm
// - AssuranceRegisterTelecomForm  
// - ContractorWorkDoneRegisterTelecomForm
// - DailyTransactionRegisterTelecomIssuesForm
// - DailyTransactionRegisterTelecomReceiptForm
// - FmtsForm
// - GatePassBookForm
// - InspectionRegisterTelecomForm
// - LedgerForm
// - LoanRegisterTelecomForm
//
// Priority 3 - PM Maintenance Schedules (12 forms):
// - PmDepotMonthlyForm
// - PmDepotQuarterlyForm
// - PmDepotHalfYearlyForm
// - PmDepotYearlyForm
// - PmOccBccMonthlyForm
// - PmOccBccQuarterlyForm
// - PmOccBccHalfYearlyForm
// - PmOccBccYearlyForm
// - PmStationMonthlyForm
// - PmStationQuarterlyForm
// - PmStationHalfYearlyForm
// - PmStationYearlyForm
//
// Priority 4 - Specialized Systems (5 forms):
// - OfficerColonyForm
// - TerEntryRegisterForm
// - UpsRoomEntryForm
// - SmpsSystemMaintenanceRecordForm
// - UpsSystemMaintenanceRecordForm

// Priority 1 Forms Export (for easy access)
export const Priority1Forms = {
  ChecklistAndPmDepotForm,
  ChecklistAndPmStationForm, 
  ChecklistAndPmOccbccForm,
  CssShiftLogBookForm,
  InstructionShiftLogBookForm,
  RequisitionRegisterForm
};

export default Priority1Forms;