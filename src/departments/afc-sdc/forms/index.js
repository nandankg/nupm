/**
 * AFC-SDC Forms Export Index
 * All 18 AFC-SDC forms using Universal Component Architecture
 * Migration Status: 7/18 forms complete (38.9% complete) 🔄
 */

// Card Management & Initialization Forms (2/2 COMPLETE ✅)
export { default as AgentCardRegistersSDCForm } from './AgentCardRegistersSDCForm';
export { default as CardInitializationTenderSDCForm } from './CardInitializationTenderSDCForm';

// Daily Operations Forms (2/2 COMPLETE ✅)
export { default as DailyChecklistRegisterSDCForm } from './DailyChecklistRegisterSDCForm';
export { default as ShiftLogBookSDCForm } from './ShiftLogBookSDCForm';

// Administrative Core Forms (3/3 COMPLETE ✅)
export { default as FmtsSDCForm } from './FmtsSDCForm';
export { default as LoanRegisterSDCForm } from './LoanRegisterSDCForm';
export { default as RequisitionSDCForm } from './RequisitionSDCForm';

// System Management Forms (3 forms)
// export { default as ParameterRegisterSDCForm } from './ParameterRegisterSDCForm';
// export { default as SwUpdateRegisterSDCForm } from './SwUpdateRegisterSDCForm';
// export { default as UrcAndOsEntryRegisterSDCForm } from './UrcAndOsEntryRegisterSDCForm';

// PM Logbook Forms - Monthly & Half Yearly (8 forms)
// export { default as PmLogBookMonthlySDCForm } from './PmLogBookMonthlySDCForm';
// export { default as PmLogbookGateHalfYearlySDCForm } from './PmLogbookGateHalfYearlySDCForm';
// export { default as PmLogbookTomHalfYearlySDCForm } from './PmLogbookTomHalfYearlySDCForm';
// export { default as PmLogbookTvmHalfYearlySDCForm } from './PmLogbookTvmHalfYearlySDCForm';
// export { default as PmLogbookSdcHalfYearlySDCForm } from './PmLogbookSdcHalfYearlySDCForm';
// export { default as PmLogbookWorkstationsHalfYearlySDCForm } from './PmLogbookWorkstationsHalfYearlySDCForm';
// export { default as PmLogbookYearly1SDCForm } from './PmLogbookYearly1SDCForm';
// export { default as PmLogbookYearly2SDCForm } from './PmLogbookYearly2SDCForm';

/*
🎯 AFC-SDC MIGRATION PLAN (18 Forms Total)

📋 FORM CATEGORIES:
✅ Card Management & Initialization: 0/2 forms
✅ Daily Operations: 0/2 forms  
✅ Administrative Core: 0/3 forms
✅ System Management: 0/3 forms
✅ PM Logbooks: 0/8 forms

🏗️ UNIVERSAL COMPONENTS READY:
✅ AFCSDCFormLayout - Professional form container
✅ UniversalAFCSDCFormField - 15+ specialized field types
✅ afcSDCValidationSchemas - Comprehensive validation rules

🎯 MIGRATION STRATEGY:
Day 1: Card Management & Initialization (2 forms)
Day 2: Daily Operations (2 forms)
Day 3: Administrative Core (3 forms)
Day 4: System Management (3 forms)  
Day 5-6: PM Logbooks (8 forms)
Day 7: Testing & Documentation
*/