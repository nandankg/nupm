// Telecom Department Forms Export
// Priority 1 - Daily Operations Forms (6/6 COMPLETE) ✅
// Priority 2 - Administrative Core Forms (10/10 COMPLETE) ✅
// Priority 3 - PM Maintenance Schedules Forms (12/12 COMPLETE) ✅

// ✅ PRIORITY 1 FORMS (Daily Operations)
export { default as ChecklistAndPmDepotForm } from './ChecklistAndPmDepotForm';
export { default as ChecklistAndPmStationForm } from './ChecklistAndPmStationForm';
export { default as ChecklistAndPmOccbccForm } from './ChecklistAndPmOccbccForm';
export { default as CssShiftLogBookForm } from './CssShiftLogBookForm';
export { default as InstructionShiftLogBookForm } from './InstructionShiftLogBookForm';
export { default as RequisitionRegisterForm } from './RequisitionRegisterForm';

// ✅ PRIORITY 2 FORMS (Administrative Core)
export { default as AssetRegisterTelecomForm } from './AssetRegisterTelecomForm';
export { default as AssuranceRegisterTelecomForm } from './AssuranceRegisterTelecomForm';
export { default as ContractorWorkDoneRegisterTelecomForm } from './ContractorWorkDoneRegisterTelecomForm';
export { default as DailyTransactionRegisterTelecomIssuesForm } from './DailyTransactionRegisterTelecomIssuesForm';
export { default as DailyTransactionRegisterTelecomReceiptForm } from './DailyTransactionRegisterTelecomReceiptForm';
export { default as FmtsForm } from './FmtsForm';
export { default as GatePassBookForm } from './GatePassBookForm';
export { default as InspectionRegisterTelecomForm } from './InspectionRegisterTelecomForm';
export { default as LedgerForm } from './LedgerForm';
export { default as LoanRegisterTelecomForm } from './LoanRegisterTelecomForm';

// ✅ PRIORITY 3 FORMS (PM Maintenance Schedules)
export { default as PmDepotMonthlyForm } from './PmDepotMonthlyForm';
export { default as PmDepotQuarterlyForm } from './PmDepotQuarterlyForm';
export { default as PmDepotHalfYearlyForm } from './PmDepotHalfYearlyForm';
export { default as PmDepotYearlyForm } from './PmDepotYearlyForm';
export { default as PmOccBccMonthlyForm } from './PmOccBccMonthlyForm';
export { default as PmOccBccQuarterlyForm } from './PmOccBccQuarterlyForm';
export { default as PmOccBccHalfYearlyForm } from './PmOccBccHalfYearlyForm';
export { default as PmOccBccYearlyForm } from './PmOccBccYearlyForm';
export { default as PmStationMonthlyForm } from './PmStationMonthlyForm';
export { default as PmStationQuarterlyForm } from './PmStationQuarterlyForm';
export { default as PmStationHalfYearlyForm } from './PmStationHalfYearlyForm';
export { default as PmStationYearlyForm } from './PmStationYearlyForm';

// ⏳ REMAINING FORMS (5/33):
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

// Priority 2 Forms Export (for easy access)
export const Priority2Forms = {
  AssetRegisterTelecomForm,
  AssuranceRegisterTelecomForm,
  ContractorWorkDoneRegisterTelecomForm,
  DailyTransactionRegisterTelecomIssuesForm,
  DailyTransactionRegisterTelecomReceiptForm,
  FmtsForm,
  GatePassBookForm,
  InspectionRegisterTelecomForm,
  LedgerForm,
  LoanRegisterTelecomForm
};

// Priority 3 Forms Export (for easy access)
export const Priority3Forms = {
  PmDepotMonthlyForm,
  PmDepotQuarterlyForm,
  PmDepotHalfYearlyForm,
  PmDepotYearlyForm,
  PmOccBccMonthlyForm,
  PmOccBccQuarterlyForm,
  PmOccBccHalfYearlyForm,
  PmOccBccYearlyForm,
  PmStationMonthlyForm,
  PmStationQuarterlyForm,
  PmStationHalfYearlyForm,
  PmStationYearlyForm
};

export default Priority1Forms;