/**
 * AFC-Mainline Components - Clean Export API
 * Universal components for AFC-Mainline department forms
 */

export { default as UniversalAFCMainlineFormField } from './UniversalAFCMainlineFormField';
export { default as AFCMainlineFormLayout } from './AFCMainlineFormLayout';

// Re-export validation utilities for convenience
export { 
  validateField, 
  validateForm,
  fmtsBookValidation,
  pmLogbookHalfYearlyValidation,
  dailyChecklistMainlineValidation,
  dailyTransactionRegisterValidation,
  simpleAdministrativeValidation
} from '../validation/afcMainlineValidationSchemas';